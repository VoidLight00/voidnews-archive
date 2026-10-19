#!/usr/bin/env python3
"""scripts/prune_workspace.py 자체시험. 임시 리포·임시 산출물·임시 휴지통만 쓴다 (실제 _workspace·~/.Trash 무관)."""
from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / "prune_workspace.py"


def put(p: Path, data: bytes | str) -> None:
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_bytes(data if isinstance(data, bytes) else data.encode())


def main() -> int:
    ok = []
    with tempfile.TemporaryDirectory() as tmp:
        t = Path(tmp)
        repo, deliver, trash = t / "repo", t / "reports", t / "trash"
        ws = repo / "_workspace"
        stamps = [f"2026-10-0{d}T00-00-00-000Z" for d in range(1, 10)]
        for i, st in enumerate(stamps):  # 1~7 PASS, 8 FAIL, 9 RUNNING
            status = "PASS" if i < 7 else ("FAIL" if i == 7 else "RUNNING")
            put(ws / "release" / st / "result.json", json.dumps({"status": status}))
        put(ws / "release" / "ship-x" / "snapshot" / "big.bin", b"x" * 10)
        put(ws / "ab" / "r-speaker-script" / "shot-dup.png", b"PNGDUP")
        put(ws / "ab" / "r-speaker-script" / "shot-unique.png", b"PNGUNIQUE")
        put(ws / "ab" / "r-speaker-script" / "tool.py", b"print(1)")
        put(deliver / "2026-10x" / "copy.png", b"PNGDUP")
        env = {**os.environ, "PRUNE_REPO": str(repo), "PRUNE_DELIVERABLES": str(deliver), "PRUNE_TRASH": str(trash)}

        def call(*args):
            p = subprocess.run([sys.executable, str(SCRIPT), *args], capture_output=True, env=env)
            return p.returncode, (p.stdout + p.stderr).decode("utf-8", "replace")

        rc, out = call("--keep-pass", "5", "--include", "release/ship-x/snapshot")
        plans = sorted(ws.glob("prune-plan-*.json"))
        items = json.loads(plans[-1].read_text())["items"] if plans else []
        paths = {i["path"] for i in items}
        ok.append(("T1 PASS 7개 중 오래된 2개만, FAIL·RUNNING 보존",
                   rc == 0 and {f"release/{stamps[0]}", f"release/{stamps[1]}"} <= paths
                   and not any(st in p for st in stamps[2:] for p in paths), out))
        ok.append(("T2 산출물에 사본 있는 캡처만, 유일본·스크립트 제외",
                   "ab/r-speaker-script/shot-dup.png" in paths and "ab/r-speaker-script/shot-unique.png" not in paths
                   and not any(p.endswith(".py") for p in paths), out))
        ok.append(("T3 계획만으로는 아무것도 안 옮김", (ws / "release" / stamps[0]).exists() and not trash.exists(), out))

        if not plans:
            print("FAIL T1 계획 파일이 만들어지지 않음\n     " + out)
            return 2
        put(ws / "ab" / "r-speaker-script" / "shot-dup.png", b"PNGDUP-CHANGED")
        rc, out = call("--apply", str(plans[-1]))
        ok.append(("T4 계획 뒤 바뀐 대상 → exit 2, 하나도 안 옮김",
                   rc == 2 and "FAIL[prune:drift]" in out and (ws / "release" / stamps[0]).exists() and not trash.exists(), out))

        put(ws / "ab" / "r-speaker-script" / "shot-dup.png", b"PNGDUP")
        for p in ws.glob("prune-plan-*.json"):
            p.unlink()
        call("--keep-pass", "5", "--include", "release/ship-x/snapshot")
        plan = sorted(ws.glob("prune-plan-*.json"))[-1]
        rc, out = call("--apply", str(plan))
        moved = list(trash.rglob("result.json"))
        ok.append(("T5 실행 → 휴지통으로 이동(되돌림 가능), 보존 대상은 그대로",
                   rc == 0 and not (ws / "release" / stamps[0]).exists() and len(moved) == 2
                   and (ws / "release" / stamps[7]).exists() and (ws / "ab" / "r-speaker-script" / "shot-unique.png").exists()
                   and not (ws / "release" / "ship-x" / "snapshot").exists(), out))

        rc, out = call("--include", "../../etc")
        ok.append(("T6 _workspace 밖 --include → exit 3", rc == 3 and "FAIL[prune:include]" in out, out))
    for name, passed, out in ok:
        print(f"{'OK  ' if passed else 'FAIL'} {name}")
        if not passed:
            print("     " + out.strip().replace("\n", "\n     "))
    good = all(p for _, p, _ in ok)
    print(f"{'PASS' if good else 'FAIL'}[prune-selftest] {sum(p for _, p, _ in ok)}/{len(ok)}")
    return 0 if good else 2


if __name__ == "__main__":
    raise SystemExit(main())
