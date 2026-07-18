#!/usr/bin/env python3
"""Collect deterministic Hacker News and Reddit discovery seeds."""

from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.parse
import urllib.request
from datetime import date, datetime, time as day_time, timezone
from pathlib import Path
from typing import Any, Callable

FetchJson = Callable[[str, str], dict[str, Any]]


class CollectorError(Exception):
    """Expected configuration or parsing failure."""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", required=True)
    parser.add_argument("--end", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--config", default=str(Path(__file__).parents[1] / "references/community-sources.json"))
    parser.add_argument("--fixture-dir")
    parser.add_argument("--hn-min-score", type=int)
    parser.add_argument("--reddit-min-score", type=int)
    return parser.parse_args()


def parse_day(value: str, label: str) -> date:
    try:
        return date.fromisoformat(value)
    except ValueError as exc:
        raise CollectorError(f"{label} must be YYYY-MM-DD: {value}") from exc


def read_object(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise CollectorError(f"cannot read JSON {path}: {exc}") from exc
    if not isinstance(value, dict):
        raise CollectorError(f"top-level object required: {path}")
    return value


def iso_timestamp(value: int | float) -> str:
    return datetime.fromtimestamp(value, tz=timezone.utc).isoformat().replace("+00:00", "Z")


def in_window(timestamp: int | float, start: date, end: date) -> bool:
    published = datetime.fromtimestamp(timestamp, tz=timezone.utc).date()
    return start <= published <= end


def official_candidate(url: str) -> str | None:
    host = (urllib.parse.urlparse(url).hostname or "").lower()
    community_hosts = {
        "news.ycombinator.com",
        "www.reddit.com",
        "reddit.com",
        "old.reddit.com",
        "arxiv.org",
        "youtube.com",
        "www.youtube.com",
    }
    return url if host and host not in community_hosts else None


def dedupe(seeds: list[dict[str, Any]]) -> list[dict[str, Any]]:
    indexed: dict[tuple[str, str], dict[str, Any]] = {}
    for seed in seeds:
        key = (seed["discoveredVia"], seed["id"])
        current = indexed.get(key)
        if current is None or seed["score"] > current["score"]:
            indexed = {**indexed, key: seed}
    return sorted(indexed.values(), key=lambda row: (-row["score"], row["discoveredAt"], row["id"]))


def make_live_fetcher(user_agent: str) -> FetchJson:
    def fetch(url: str, source_id: str) -> dict[str, Any]:
        request = urllib.request.Request(url, headers={"User-Agent": user_agent, "Accept": "application/json"})
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8", "replace"))

    return fetch


def make_fixture_fetcher(fixture_dir: Path) -> FetchJson:
    def fetch(_url: str, source_id: str) -> dict[str, Any]:
        safe_name = source_id.replace(":", "-") + ".json"
        return read_object(fixture_dir / safe_name)

    return fetch


def collect_hn(
    config: dict[str, Any], start: date, end: date, fetch: FetchJson, sleep_seconds: float
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    seeds: list[dict[str, Any]] = []
    fetched = 0
    minimum = int(config["minimumScore"])
    start_ts = int(datetime.combine(start, day_time.min, timezone.utc).timestamp())
    end_ts = int(datetime.combine(end, day_time.max, timezone.utc).timestamp())
    for keyword_index, keyword in enumerate(config["keywords"]):
        max_pages = int(config.get("maxPagesPerKeyword", 1))
        for page in range(max_pages):
            params = {
                "query": keyword,
                "tags": "story",
                "numericFilters": f"created_at_i>={start_ts},created_at_i<={end_ts},points>={minimum}",
                "hitsPerPage": int(config.get("hitsPerPage", 100)),
                "page": page,
            }
            url = config["endpoint"] + "?" + urllib.parse.urlencode(params)
            payload = fetch(url, f"hn-{keyword_index}-{page}")
            hits = payload.get("hits")
            if not isinstance(hits, list):
                raise CollectorError(f"HN response missing hits[] for keyword {keyword} page {page}")
            fetched += len(hits)
            for hit in hits:
                timestamp = hit.get("created_at_i")
                score = int(hit.get("points") or 0)
                title = str(hit.get("title") or "").strip()
                object_id = str(hit.get("objectID") or "").strip()
                if not object_id or not title or timestamp is None or score < minimum:
                    continue
                if not in_window(timestamp, start, end):
                    continue
                source_item_url = f"https://news.ycombinator.com/item?id={object_id}"
                url_value = str(hit.get("url") or source_item_url)
                seeds.append(
                    {
                        "id": f"community-hn-{object_id}",
                        "title": title,
                        "url": url_value,
                        "discoveredVia": "community-hn",
                        "discoveredAt": iso_timestamp(timestamp),
                        "score": score,
                        "officialCandidateUrl": official_candidate(url_value),
                        "source": "hn",
                        "sourceItemUrl": source_item_url,
                        "author": str(hit.get("author") or ""),
                        "matchedKeywords": [keyword],
                        "commentCount": int(hit.get("num_comments") or 0),
                    }
                )
            available_pages = int(payload.get("nbPages") or 1)
            if page + 1 >= available_pages:
                break
            if sleep_seconds:
                time.sleep(sleep_seconds)
        if sleep_seconds and keyword_index + 1 < len(config["keywords"]):
            time.sleep(sleep_seconds)
    selected = dedupe(seeds)
    return selected, {"id": "hn", "status": "ok", "itemsFetched": fetched, "itemsSelected": len(selected)}


def reddit_item(child: dict[str, Any], subreddit: str, start: date, end: date, minimum: int) -> dict[str, Any] | None:
    data = child.get("data") if isinstance(child, dict) else None
    if not isinstance(data, dict):
        return None
    timestamp = data.get("created_utc")
    score = int(data.get("score") or 0)
    title = str(data.get("title") or "").strip()
    item_id = str(data.get("id") or "").strip()
    if timestamp is None or score < minimum or not title or not item_id or not in_window(timestamp, start, end):
        return None
    permalink = str(data.get("permalink") or "")
    source_item_url = "https://www.reddit.com" + permalink if permalink.startswith("/") else permalink
    url_value = str(data.get("url_overridden_by_dest") or data.get("url") or source_item_url)
    return {
        "id": f"community-reddit-{item_id}",
        "title": title,
        "url": url_value,
        "discoveredVia": "community-reddit",
        "discoveredAt": iso_timestamp(timestamp),
        "score": score,
        "officialCandidateUrl": official_candidate(url_value),
        "source": "reddit",
        "sourceItemUrl": source_item_url,
        "community": subreddit,
        "author": str(data.get("author") or ""),
        "commentCount": int(data.get("num_comments") or 0),
    }


def collect_reddit(
    config: dict[str, Any], start: date, end: date, fetch: FetchJson, sleep_seconds: float
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    seeds: list[dict[str, Any]] = []
    statuses: list[dict[str, Any]] = []
    minimum = int(config["minimumScore"])
    for index, subreddit in enumerate(config["subreddits"]):
        source_id = f"reddit:{subreddit}"
        url = config["endpointPattern"].format(subreddit=urllib.parse.quote(subreddit))
        payload = fetch(url, source_id)
        children = payload.get("data", {}).get("children")
        if not isinstance(children, list):
            raise CollectorError(f"Reddit response missing data.children[]: {subreddit}")
        selected = [item for child in children if (item := reddit_item(child, subreddit, start, end, minimum))]
        seeds.extend(selected)
        statuses.append(
            {
                "id": source_id,
                "status": "ok",
                "itemsFetched": len(children),
                "itemsSelected": len(selected),
            }
        )
        if sleep_seconds and index + 1 < len(config["subreddits"]):
            time.sleep(sleep_seconds)
    return dedupe(seeds), statuses


def collect(args: argparse.Namespace) -> tuple[dict[str, Any], int]:
    start = parse_day(args.start, "start")
    end = parse_day(args.end, "end")
    if start > end:
        raise CollectorError("start must be <= end")
    config = read_object(Path(args.config))
    hn_config = {**config["hn"]}
    reddit_config = {**config["reddit"]}
    if args.hn_min_score is not None:
        hn_config = {**hn_config, "minimumScore": args.hn_min_score}
    if args.reddit_min_score is not None:
        reddit_config = {**reddit_config, "minimumScore": args.reddit_min_score}
    fixture_dir = Path(args.fixture_dir) if args.fixture_dir else None
    fetch = make_fixture_fetcher(fixture_dir) if fixture_dir else make_live_fetcher(config["userAgent"])
    sleep_seconds = 0.0 if fixture_dir else float(config.get("requestSleepSeconds", 1.0))
    seeds: list[dict[str, Any]] = []
    statuses: list[dict[str, Any]] = []
    failures: list[dict[str, str]] = []
    try:
        hn_seeds, hn_status = collect_hn(hn_config, start, end, fetch, sleep_seconds)
        seeds.extend(hn_seeds)
        statuses.append(hn_status)
    except Exception as exc:
        failures.append({"source": "hn", "error": f"{type(exc).__name__}: {exc}"})
        statuses.append({"id": "hn", "status": "failed", "error": failures[-1]["error"]})
    for subreddit in reddit_config["subreddits"]:
        single_config = {**reddit_config, "subreddits": [subreddit]}
        try:
            reddit_seeds, reddit_statuses = collect_reddit(single_config, start, end, fetch, sleep_seconds)
            seeds.extend(reddit_seeds)
            statuses.extend(reddit_statuses)
        except Exception as exc:
            source = f"reddit:{subreddit}"
            failures.append({"source": source, "error": f"{type(exc).__name__}: {exc}"})
            statuses.append({"id": source, "status": "failed", "error": failures[-1]["error"]})
    generated_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    payload = {
        "schemaVersion": 1,
        "dateRange": {"start": start.isoformat(), "end": end.isoformat()},
        "generatedAt": generated_at,
        "seeds": dedupe(seeds),
        "sources": statuses,
        "failures": failures,
    }
    return payload, 2 if failures else 0


def main() -> int:
    args = parse_args()
    out = Path(args.out)
    try:
        payload, exit_code = collect(args)
    except Exception as exc:
        payload = {
            "schemaVersion": 1,
            "dateRange": {"start": args.start, "end": args.end},
            "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            "seeds": [],
            "sources": [],
            "failures": [{"source": "collector", "error": f"{type(exc).__name__}: {exc}"}],
        }
        exit_code = 2
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    counts = {
        "seeds": len(payload["seeds"]),
        "sources": len(payload["sources"]),
        "failures": len(payload["failures"]),
    }
    marker = "PASS" if exit_code == 0 else "FAIL"
    print(
        f"{marker}[community-collector] seeds={counts['seeds']} "
        f"sources={counts['sources']} failures={counts['failures']}"
    )
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
