#!/usr/bin/env python3
"""Fail-closed YouTube upload coverage checker for VoidNews curator runs."""

from __future__ import annotations

import argparse
import json
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any

ATOM_NS = "http://www.w3.org/2005/Atom"
YT_NS = "http://www.youtube.com/xml/schemas/2015"
NS = {"atom": ATOM_NS, "yt": YT_NS}
DECISIONS = ("promoted", "skipped:")
USER_AGENT = "VoidNewsRadar/1.0 (+local coverage gate)"


class CoverageError(Exception):
    """Expected validation or fetch failure."""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", required=True)
    parser.add_argument("--end", required=True)
    parser.add_argument("--coverage", required=True)
    parser.add_argument("--registry", required=True)
    parser.add_argument("--fixture-dir")
    return parser.parse_args()


def parse_day(value: str, label: str) -> date:
    try:
        return date.fromisoformat(value)
    except ValueError as exc:
        raise CoverageError(f"FAIL[date] {label} invalid: {value}") from exc


def read_json(path: Path, label: str) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise CoverageError(f"FAIL[{label}] cannot read {path}: {exc}") from exc
    if not isinstance(value, dict):
        raise CoverageError(f"FAIL[{label}] top-level object required: {path}")
    return value


def youtube_channels(registry: dict[str, Any]) -> list[dict[str, Any]]:
    channels = [row for row in registry.get("channels", []) if row.get("platform") == "youtube"]
    if not channels:
        raise CoverageError("FAIL[registry] YouTube channels=0")
    for row in channels:
        channel_id = row.get("channelId")
        if not isinstance(channel_id, str) or not channel_id.startswith("UC"):
            raise CoverageError(f"FAIL[registry] invalid channelId: {row.get('id')}")
    return channels


def fixture_path(fixture_dir: Path, channel: dict[str, Any]) -> Path:
    return fixture_dir / f"{channel['id']}.xml"


def fetch_feed(channel: dict[str, Any], fixture_dir: Path | None) -> bytes:
    if fixture_dir:
        path = fixture_path(fixture_dir, channel)
        try:
            return path.read_bytes()
        except OSError as exc:
            raise CoverageError(f"FAIL[rss-fetch] {channel['id']}: {exc}") from exc
    url = channel.get("rssUrl") or (
        "https://www.youtube.com/feeds/videos.xml?channel_id=" + channel["channelId"]
    )
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.read()
    except Exception as exc:
        raise CoverageError(f"FAIL[rss-fetch] {channel['id']}: {exc}") from exc


def parse_published(value: str) -> datetime:
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).astimezone(timezone.utc)
    except ValueError as exc:
        raise CoverageError(f"FAIL[rss-parse] invalid published: {value}") from exc


def parse_feed(raw: bytes, channel: dict[str, Any], start: date, end: date) -> list[dict[str, str]]:
    try:
        root = ET.fromstring(raw)
    except ET.ParseError as exc:
        raise CoverageError(f"FAIL[rss-parse] {channel['id']}: {exc}") from exc
    videos: list[dict[str, str]] = []
    for entry in root.findall("atom:entry", NS):
        video_id = entry.findtext("yt:videoId", default="", namespaces=NS).strip()
        title = entry.findtext("atom:title", default="", namespaces=NS).strip()
        published = entry.findtext("atom:published", default="", namespaces=NS).strip()
        if not video_id or not published:
            raise CoverageError(f"FAIL[rss-parse] {channel['id']}: entry missing videoId/published")
        published_at = parse_published(published)
        if start <= published_at.date() <= end:
            videos.append({"videoId": video_id, "title": title, "published": published})
    return videos


def coverage_rows(
    coverage: dict[str, Any], start: date, end: date
) -> dict[str, dict[str, Any]]:
    if coverage.get("schemaVersion") != 2:
        raise CoverageError("FAIL[coverage-schema] schemaVersion must be 2")
    date_range = coverage.get("dateRange")
    expected_range = {"start": start.isoformat(), "end": end.isoformat()}
    if date_range != expected_range:
        raise CoverageError(
            f"FAIL[coverage-schema] dateRange expected={expected_range} actual={date_range}"
        )
    rows = coverage.get("coverage")
    if not isinstance(rows, list):
        raise CoverageError("FAIL[coverage-schema] coverage[] required")
    indexed: dict[str, dict[str, Any]] = {}
    for row in rows:
        channel_id = row.get("id") if isinstance(row, dict) else None
        if not channel_id or channel_id in indexed:
            raise CoverageError(f"FAIL[coverage-schema] duplicate/invalid channel id: {channel_id}")
        indexed[channel_id] = row
    return indexed


def valid_decision(value: Any) -> bool:
    return value == DECISIONS[0] or (
        isinstance(value, str) and value.startswith(DECISIONS[1]) and bool(value[len(DECISIONS[1]) :].strip())
    )


def compare(
    channels: list[dict[str, Any]],
    feeds: dict[str, list[dict[str, str]]],
    coverage: dict[str, Any],
    start: date,
    end: date,
) -> tuple[list[str], int]:
    rows = coverage_rows(coverage, start, end)
    registry_ids = {row["id"] for row in channels}
    ghost = sorted(set(rows) - registry_ids)
    failures = [f"FAIL[ghost-id] {channel_id}" for channel_id in ghost]
    total = 0
    for channel in channels:
        channel_key = channel["id"]
        expected = feeds[channel_key]
        total += len(expected)
        row = rows.get(channel_key)
        if row is None:
            failures.append(f"FAIL[channel-missing] {channel_key}")
            continue
        videos = row.get("videos")
        if not isinstance(videos, list):
            failures.append(f"FAIL[coverage-schema] {channel_key} videos[] required")
            continue
        decisions: dict[str, dict[str, Any]] = {}
        for item in videos:
            video_id = item.get("videoId") if isinstance(item, dict) else None
            if not video_id or video_id in decisions:
                failures.append(f"FAIL[coverage-schema] {channel_key} duplicate/invalid videoId: {video_id}")
                continue
            title = item.get("title")
            published = item.get("published")
            if not isinstance(title, str) or not title.strip():
                failures.append(
                    f"FAIL[coverage-schema] {channel_key}/{video_id} title required"
                )
            if not isinstance(published, str) or not published.strip():
                failures.append(
                    f"FAIL[coverage-schema] {channel_key}/{video_id} published required"
                )
            else:
                try:
                    parse_published(published)
                except CoverageError:
                    failures.append(
                        f"FAIL[coverage-schema] {channel_key}/{video_id} published invalid: {published}"
                    )
            decisions[video_id] = item
        for video in expected:
            decision = decisions.get(video["videoId"])
            if decision is None:
                failures.append(
                    "FAIL[video-missing] "
                    f"{channel_key}/{video['videoId']}/{video['title']}"
                )
                continue
            if decision.get("title") != video["title"]:
                failures.append(
                    "FAIL[coverage-mismatch] "
                    f"{channel_key}/{video['videoId']} title"
                )
            try:
                observed_time = parse_published(video["published"])
                recorded_time = parse_published(decision["published"])
                if recorded_time != observed_time:
                    failures.append(
                        "FAIL[coverage-mismatch] "
                        f"{channel_key}/{video['videoId']} published"
                    )
            except (CoverageError, KeyError):
                pass
            if not valid_decision(decision.get("decision")):
                failures.append(
                    "FAIL[video-missing] "
                    f"{channel_key}/{video['videoId']}/{video['title']}"
                )
    return failures, total


def main() -> int:
    args = parse_args()
    try:
        start = parse_day(args.start, "start")
        end = parse_day(args.end, "end")
        if start > end:
            raise CoverageError("FAIL[date] start must be <= end")
        registry = read_json(Path(args.registry), "registry")
        coverage = read_json(Path(args.coverage), "coverage")
        channels = youtube_channels(registry)
        fixture_dir = Path(args.fixture_dir) if args.fixture_dir else None
        feeds = {
            row["id"]: parse_feed(fetch_feed(row, fixture_dir), row, start, end)
            for row in channels
        }
        failures, total = compare(channels, feeds, coverage, start, end)
        if failures:
            print("\n".join(failures))
            print(f"FAIL[video-coverage] channels={len(channels)} videos={total} missing={len(failures)}")
            return 2
        print(f"PASS[video-coverage] channels={len(channels)} videos={total}")
        return 0
    except CoverageError as exc:
        print(str(exc))
        return 2
    except Exception as exc:
        print(f"FAIL[internal] {type(exc).__name__}: {exc}")
        return 2


if __name__ == "__main__":
    sys.exit(main())
