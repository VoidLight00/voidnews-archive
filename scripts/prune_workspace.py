#!/usr/bin/env python3
"""_workspace 정리 계획·실행 (2026-10-19, 자동화 감사 6단계).

기본은 계획만 세운다(dry-run). 실행은 그 계획 파일로만 하며, 실행 직전에 대상이 계획과 같은지
(크기·sha256) 다시 대조한다. 지우지 않고 ~/.Trash/voidnews-prune-<시각>/ 로 옮기므로 휴지통을 비우기 전까지 되돌릴 수 있다.

대상 (이것 말고는 건드리지 않는다)
  receipts  _workspace/release/<ISO 시각>/ 영수증 중 status=PASS 이면서 최신 --keep-pass 개 밖의 것.
            FAIL·RUNNING·result.json 없음은 진단 기록이라 보존한다.
  captures  _workspace/ab/*-speaker-script/ 의 이미지 중 ~/projects/voidnews-reports 또는 인계 폴더에
            바이트 동일 사본이 있는 것. 유일본 이미지와 스크립트는 보존한다.
  named     --include <_workspace 기준 경로> 로 명시한 것만 (예: release/ship-20260920/snapshot).

사용: python3 scripts/prune_workspace.py [--keep-pass 5] [--include release/ship-20260920/snapshot]
      python3 scripts/prune_workspace.py --apply <_workspace/prune-plan-*.json>
종료: 0=정상, 2=계획과 실제가 다름(실행 거부), 3=인자 오류.
"""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import re
import shutil
import sys
from pathlib import Path

REPO = Path(os.environ.get("PRUNE_REPO") or Path(__file__).resolve().parent.parent)
WS = REPO / "_workspace"
IMG = {".png", ".jpg", ".jpeg", ".webp"}
STAMP = re.compile(r"^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z$")
# 시험용으로만 바꾼다 (PRUNE_DELIVERABLES 는 콜론 구분, PRUNE_TRASH 는 휴지통 대신 쓸 폴더)
DELIVERABLES = [Path(x) for x in os.environ["PRUNE_DELIVERABLES"].split(":")] if os.environ.get("PRUNE_DELIVERABLES") \
    else [Path.home() / "projects/voidnews-reports", Path.home() / "Documents/ChatGPT/AB/발표대본"]
TRASH = Path(os.environ.get("PRUNE_TRASH") or Path.home() / ".Trash")


def sha(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def fingerprint(p: Path) -> dict:
    """파일은 sha256, 폴더는 (상대경로·크기) 목록의 sha256. 실행 직전 대조용."""
    if p.is_file():
        return {"kind": "file", "bytes": p.stat().st_size, "sha256": sha(p)}
    rows = sorted(f"{f.relative_to(p)}\t{f.stat().st_size}" for f in p.rglob("*") if f.is_file())
    return {"kind": "dir", "bytes": sum(int(r.rsplit("\t", 1)[1]) for r in rows), "files": len(rows),
            "sha256": hashlib.sha256("\n".join(rows).encode()).hexdigest()}


def receipts(keep: int) -> list[dict]:
    rel = WS / "release"
    passes = []
    for d in sorted(rel.iterdir()) if rel.is_dir() else []:
        if not (d.is_dir() and STAMP.match(d.name)):
            continue
        try:
            status = json.loads((d / "result.json").read_text(encoding="utf-8")).get("status")
        except (OSError, ValueError):
            status = None
        if status == "PASS":
            passes.append(d)
    return [{"section": "receipts", "path": str(d.relative_to(WS)), "why": f"PASS 영수증, 최신 {keep}개 밖"}
            for d in passes[:-keep] if keep >= 0] if len(passes) > keep else []


def captures() -> list[dict]:
    idx = set()
    for base in DELIVERABLES:
        if base.is_dir():
            idx |= {sha(p) for p in base.rglob("*") if p.is_file() and p.suffix.lower() in IMG}
    out = []
    for d in sorted((WS / "ab").glob("*-speaker-script")):
        for p in sorted(d.rglob("*")):
            if p.is_file() and p.suffix.lower() in IMG and sha(p) in idx:
                out.append({"section": "captures", "path": str(p.relative_to(WS)), "why": "발표 산출물에 바이트 동일 사본 있음"})
    return out


def plan(args) -> int:
    items = receipts(args.keep_pass) + captures()
    for inc in args.include or []:
        p = WS / inc
        if not p.exists() or WS.resolve() not in p.resolve().parents:  # /var → /private/var 같은 링크도 같은 기준으로
            print(f"FAIL[prune:include] {inc} 없음 또는 _workspace 밖")
            return 3
        items.append({"section": "named", "path": inc, "why": "사용자가 --include 로 명시"})
    for it in items:
        it.update(fingerprint(WS / it["path"]))
    total = sum(i["bytes"] for i in items)
    by = {}
    for i in items:
        by.setdefault(i["section"], [0, 0])
        by[i["section"]][0] += 1
        by[i["section"]][1] += i["bytes"]
    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    out = WS / f"prune-plan-{stamp}.json"
    out.write_text(json.dumps({"createdAt": stamp, "keepPass": args.keep_pass, "items": items}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    for sec, (n, b) in by.items():
        print(f"  {sec:9} {n:5}건 {b / 1e6:8.1f}MB")
    print(f"PLAN[prune] {len(items)}건 {total / 1e6:.1f}MB → {out.relative_to(REPO)} (아직 아무것도 옮기지 않음)")
    print(f"  실행: python3 scripts/prune_workspace.py --apply {out.relative_to(REPO)}")
    return 0


def apply(plan_path: Path) -> int:
    doc = json.loads(plan_path.read_text(encoding="utf-8"))
    drift = []
    for it in doc["items"]:
        p = WS / it["path"]
        if not p.exists():
            drift.append(f"{it['path']} 없음")
            continue
        now = fingerprint(p)
        if now["sha256"] != it["sha256"] or now["bytes"] != it["bytes"]:
            drift.append(f"{it['path']} 계획 뒤 바뀜")
    if drift:
        for d in drift[:20]:
            print(f"FAIL[prune:drift] {d}")
        print(f"FAIL[prune] 계획과 실제가 {len(drift)}건 다름 → 실행 거부. 계획을 다시 세우세요")
        return 2
    trash = TRASH / f"voidnews-prune-{doc['createdAt']}"
    for it in doc["items"]:
        dest = trash / it["path"]
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(WS / it["path"]), str(dest))
    print(f"PASS[prune] {len(doc['items'])}건 {sum(i['bytes'] for i in doc['items']) / 1e6:.1f}MB → {trash} (휴지통을 비우기 전까지 되돌릴 수 있음)")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--keep-pass", type=int, default=5)
    ap.add_argument("--include", action="append")
    ap.add_argument("--apply")
    a = ap.parse_args()
    if a.apply:
        return apply(Path(a.apply))
    return plan(a)


if __name__ == "__main__":
    sys.exit(main())
