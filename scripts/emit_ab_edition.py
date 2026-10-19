#!/usr/bin/env python3
"""AB 회차 파일 lib/ab/editions/<slug>.ts 를 Weekly 카드에서 만든다 (IMP-0010 후반, 2026-10-19 승격).

회차마다 run 폴더에 이 스크립트를 새로 쓰면서 라인업·편집 문구를 코드 안에 적었다.
이제 내용은 run 폴더의 spec JSON 에 두고 코드는 이 파일 하나만 쓴다.

사용: python3 scripts/emit_ab_edition.py --spec <run>/edition-spec.json [--check]
  --check  아무것도 쓰지 않는다. 회차 파일과 lib/ab/data.ts 등록이 이 spec 의 산출과 같으면 exit 0, 다르면 exit 2.
spec: {"edition": {slug, volume, title, theme, period, coveredWeeks[{slug,period}], announceDate, nextEditionDate,
                   intro, closing, coreFlow, modelWatchSection},
       "highlights": [{"slug", "tier", "editorial"}], "modelWatch": [{"slug", "category", "tags"}]}
  카드는 coveredWeeks 의 lib/weeks/<slug>.ts 에서 slug 로 찾는다. 회차 파일 등록은 editions 배열 맨 앞에 넣는다.
환경: EMIT_AB_ROOT (기본: 이 파일의 상위 폴더 = 리포 루트)
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path

SITE = Path(os.environ.get("EMIT_AB_ROOT") or Path(__file__).resolve().parent.parent)


def fail(token: str, msg: str) -> "NoReturn":  # noqa: F821
    print(f"FAIL[emit-ab-edition:{token}] {msg}")
    sys.exit(2)


def load_week(slug: str) -> dict:
    path = SITE / "lib/weeks" / f"{slug}.ts"
    if not path.is_file():
        fail("no-week", f"{path} 없음")
    m = re.search(r"=\s*(\{.*\});?\s*$", path.read_text(encoding="utf-8"), re.S)
    if not m:
        fail("week-shape", f"{path} 에서 객체 리터럴을 찾지 못함")
    return json.loads(m.group(1))


def canon(url: str) -> str:
    return re.sub(r"^https?://(www\.)?", "", url.split("#")[0].split("?")[0]).rstrip("/").lower()


def build(spec: dict) -> tuple[str, str, list[str]]:
    ed = dict(spec["edition"])
    posts: dict[str, tuple[str, str, dict]] = {}  # slug -> (week, company, post)
    for wk in ed["coveredWeeks"]:
        for c in load_week(wk["slug"])["companies"]:
            for p in c["posts"]:
                posts.setdefault(p["slug"], (wk["slug"], c["name"], p))

    # 백필 장부(BACKFILL-INTEGRATION.json)에 이미 있는 공용 출처를 AB 사본에서 다시 쓰면 check-backfill-integration 이
    # AB 증거 행을 요구한다. Weekly 카드는 그대로 두고 AB 사본의 backupUrls 에서만 뺀다(게이트는 완화하지 않는다).
    ledger_doc = json.loads((SITE / "docs/redesign/BACKFILL-INTEGRATION.json").read_text(encoding="utf-8"))
    ledger = {canon(r["normalizedUrl"]) for r in ledger_doc["rows"] + ledger_doc.get("supportingRows", []) if r.get("normalizedUrl")}
    notes = []
    for _w, _c, p in posts.values():
        keep = [b for b in p.get("backupUrls", []) if canon(b["url"] if isinstance(b, dict) else b) not in ledger]
        if len(keep) != len(p.get("backupUrls", [])):
            notes.append(f"drop AB backup (ledger source): {p['slug']} {len(p['backupUrls']) - len(keep)}")
            p["backupUrls"] = keep

    def find(slug: str):
        if slug not in posts:
            fail("no-card", f"{slug} 가 coveredWeeks {[w['slug'] for w in ed['coveredWeeks']]} 에 없음")
        return posts[slug]

    ed["highlights"], ed["modelWatch"] = [], []
    for rank, h in enumerate(spec["highlights"], 1):
        week, company, p = find(h["slug"])
        ed["highlights"].append({"rank": rank, "tier": h["tier"], "post": p, "sourceWeek": week,
                                 "sourceCompany": company, "editorial": h["editorial"]})
    for m in spec["modelWatch"]:
        _week, _company, p = find(m["slug"])
        if "thumbnail" not in p:
            fail("no-thumbnail", f"{m['slug']} 카드에 thumbnail 없음 (modelWatch 는 썸네일 필수)")
        ed["modelWatch"].append({"title": p["title"], "slug": m["slug"], "deck": p["deck"], "category": m["category"],
                                 "sourceUrl": p["officialUrl"] if p.get("officialUrl") else p["source"],
                                 "sourceLabel": "공식 발표", "summary": p["summary"], "body": p["content"],
                                 "tags": m["tags"], "tier": "normal", "thumbnail": p["thumbnail"]})
    # 원래 스크립트가 쓰던 키 순서를 지킨다: 메타 → highlights → modelWatch
    order = [k for k in spec["edition"] if k not in ("highlights", "modelWatch")] + ["highlights", "modelWatch"]
    ed = {k: ed[k] for k in order}
    var = "edition" + ed["slug"].replace("-", "_")
    body = f'import type {{ ABEdition }} from "../data";\n\nexport const {var}: ABEdition = ' + json.dumps(ed, ensure_ascii=False, indent=2) + ";\n"
    return var, body, notes


def register(data_ts: str, var: str, slug: str) -> str:
    if re.search(rf"\b{var}\b", data_ts):
        return data_ts
    imp = re.search(r'^import \{ edition\w+ \} from "\./editions/[^"]+";$', data_ts, re.M)
    arr = "export const editions: ABEdition[] = ["
    if not imp or arr not in data_ts:
        fail("register", "lib/ab/data.ts 에서 회차 import 줄이나 editions 배열을 찾지 못함")
    data_ts = data_ts[:imp.start()] + f'import {{ {var} }} from "./editions/{slug}";\n' + data_ts[imp.start():]
    return data_ts.replace(arr, f"{arr}{var}, ", 1)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--spec", required=True)
    ap.add_argument("--check", action="store_true")
    a = ap.parse_args()
    spec = json.loads(Path(a.spec).read_text(encoding="utf-8"))
    var, body, notes = build(spec)
    slug = spec["edition"]["slug"]
    out = SITE / "lib/ab/editions" / f"{slug}.ts"
    data_path = SITE / "lib/ab/data.ts"
    data_ts = data_path.read_text(encoding="utf-8")
    new_data = register(data_ts, var, slug)
    for n in notes:
        print(n)
    if a.check:
        diffs = []
        if not out.is_file():
            diffs.append(f"{out.name} 없음")
        elif out.read_text(encoding="utf-8") != body:
            diffs.append(f"{out.name} 이 spec 산출과 다름 (spec 밖에서 손으로 고쳤거나 Weekly 카드가 바뀜)")
        if new_data != data_ts:
            diffs.append(f"lib/ab/data.ts 에 {var} 미등록")
        for d in diffs:
            print(f"FAIL[emit-ab-edition:check] {d}")
        print(f"{'FAIL' if diffs else 'PASS'}[emit-ab-edition:check] {slug} highlights={len(spec['highlights'])} modelWatch={len(spec['modelWatch'])}")
        return 2 if diffs else 0
    out.write_text(body, encoding="utf-8")
    if new_data != data_ts:
        data_path.write_text(new_data, encoding="utf-8")
    print(f"PASS[emit-ab-edition] wrote {out.relative_to(SITE)} ({len(body)} bytes) highlights={len(spec['highlights'])} "
          f"modelWatch={len(spec['modelWatch'])} registered={var in new_data}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
