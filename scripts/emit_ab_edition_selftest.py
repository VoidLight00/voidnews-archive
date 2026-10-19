#!/usr/bin/env python3
"""scripts/emit_ab_edition.py 자체시험. 실제 lib/ 는 건드리지 않는다 (EMIT_AB_ROOT 임시 트리).

빌드 게이트(run-all-gates)는 python 을 쓰지 않으므로 여기에 두고 SKILL.md Phase 5 에서 호출한다.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / "emit_ab_edition.py"
DATA_TS = ('import type { ABEdition } from "./types";\nimport { edition2026_09b } from "./editions/2026-09b";\n\n'
           "export const editions: ABEdition[] = [edition2026_09b];\n")


def tree(root: Path) -> Path:
    post = lambda s, th=True: {"slug": s, "title": f"{s} 제목", "deck": "d", "summary": "s", "content": "c",
                               "officialUrl": f"https://e.com/{s}", "backupUrls": [{"label": "x", "url": "https://dup.example/a"}],
                               **({"thumbnail": {"src": "/t.png", "alt": "a"}} if th else {})}
    week = {"slug": "2026-w40", "companies": [{"name": "Acme", "posts": [post("a"), post("b"), post("nothumb", False)]}]}
    for rel, text in {
        "lib/weeks/2026-w40.ts": "export const week40 = " + json.dumps(week) + ";\n",
        "docs/redesign/BACKFILL-INTEGRATION.json": json.dumps({"rows": [{"normalizedUrl": "https://dup.example/a"}]}),
        "lib/ab/data.ts": DATA_TS,
    }.items():
        (root / rel).parent.mkdir(parents=True, exist_ok=True)
        (root / rel).write_text(text, encoding="utf-8")
    (root / "lib/ab/editions").mkdir(parents=True, exist_ok=True)  # 실제 리포처럼 회차 폴더는 이미 있다
    return root


def spec(root: Path, highlight: str = "a", watch: str = "b") -> Path:
    p = root / "spec.json"
    p.write_text(json.dumps({"edition": {"slug": "2026-10x", "title": "t", "coveredWeeks": [{"slug": "2026-w40", "period": "p"}]},
                             "highlights": [{"slug": highlight, "tier": "hero", "editorial": "e"}],
                             "modelWatch": [{"slug": watch, "category": "c", "tags": ["t"]}]}), encoding="utf-8")
    return p


def call(root: Path, spec_path: Path, *extra: str) -> tuple[int, str]:
    p = subprocess.run([sys.executable, str(SCRIPT), "--spec", str(spec_path), *extra], capture_output=True,
                       env={**os.environ, "EMIT_AB_ROOT": str(root)})
    return p.returncode, (p.stdout + p.stderr).decode("utf-8", "replace")


def main() -> int:
    ok = []
    with tempfile.TemporaryDirectory() as tmp:
        root = tree(Path(tmp))
        out = root / "lib/ab/editions/2026-10x.ts"
        data = root / "lib/ab/data.ts"
        rc, txt = call(root, spec(root), "--check")
        ok.append(("T1 --check: 회차 파일 없음 → exit 2, 쓰기 0", rc == 2 and not out.exists() and data.read_text() == DATA_TS, txt))
        rc, txt = call(root, spec(root))
        body = out.read_text(encoding="utf-8") if out.exists() else ""
        ok.append(("T2 쓰기: 파일 생성·맨 앞 등록·장부 출처 backup 제거",
                   rc == 0 and "edition2026_10x, edition2026_09b" in data.read_text() and "dup.example" not in body
                   and '"sourceWeek": "2026-w40"' in body, txt))
        rc, txt = call(root, spec(root))
        ok.append(("T3 재실행: 등록 중복 없음", rc == 0 and data.read_text().count("edition2026_10x") == 2, data.read_text()))
        rc, txt = call(root, spec(root), "--check")
        ok.append(("T4 쓰기 직후 --check → exit 0", rc == 0 and "PASS[emit-ab-edition:check]" in txt, txt))
        out.write_text(body.replace('"tier": "hero"', '"tier": "feature"'), encoding="utf-8")
        rc, txt = call(root, spec(root), "--check")
        ok.append(("T5 spec 밖 손 수정 → exit 2", rc == 2 and "spec 산출과 다름" in txt, txt))
        before = out.read_text(encoding="utf-8")
        rc, txt = call(root, spec(root, highlight="ghost"))
        ok.append(("T6 없는 카드 → FAIL[no-card], 쓰기 0", rc == 2 and "FAIL[emit-ab-edition:no-card] ghost" in txt and out.read_text() == before, txt))
        rc, txt = call(root, spec(root, watch="nothumb"))
        ok.append(("T7 modelWatch 썸네일 없음 → FAIL[no-thumbnail]", rc == 2 and "FAIL[emit-ab-edition:no-thumbnail]" in txt, txt))
    for name, passed, txt in ok:
        print(f"{'OK  ' if passed else 'FAIL'} {name}")
        if not passed:
            print("     " + txt.strip().replace("\n", "\n     "))
    good = all(p for _, p, _ in ok)
    print(f"{'PASS' if good else 'FAIL'}[emit-ab-edition-selftest] {sum(p for _, p, _ in ok)}/{len(ok)}")
    return 0 if good else 2


if __name__ == "__main__":
    raise SystemExit(main())
