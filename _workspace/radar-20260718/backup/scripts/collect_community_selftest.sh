#!/bin/bash
# Proves fixture parsing and fail-closed source failure behavior.
set -u
DIR="$(cd "$(dirname "$0")" && pwd)"
REF="$DIR/../references/fixtures/community"
TMP="${TMPDIR:-/tmp}/voidnews-community-selftest-$$"
mkdir -p "$TMP"
trap 'rm -rf "$TMP"' EXIT

python3 "$DIR/collect_community.py" \
  --start 2026-07-13 --end 2026-07-18 \
  --config "$REF/config.json" --fixture-dir "$REF/ok" \
  --out "$TMP/ok.json"
ok_rc=$?

set +e
python3 "$DIR/collect_community.py" \
  --start 2026-07-13 --end 2026-07-18 \
  --config "$REF/config.json" --fixture-dir "$REF/fail" \
  --out "$TMP/fail.json"
fail_rc=$?
set -e

python3 - "$TMP/ok.json" "$TMP/fail.json" "$ok_rc" "$fail_rc" <<'PY'
import json, sys
ok_path, fail_path, ok_rc, fail_rc = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
ok = json.load(open(ok_path, encoding="utf-8"))
fail = json.load(open(fail_path, encoding="utf-8"))
errors = []
if ok_rc != 0: errors.append(f"ok expected=0 actual={ok_rc}")
if fail_rc != 2: errors.append(f"fail expected=2 actual={fail_rc}")
if len(ok.get("seeds", [])) != 3: errors.append(f"ok seeds expected=3 actual={len(ok.get('seeds', []))}")
if ok.get("failures"): errors.append("ok failures must be empty")
if len(fail.get("failures", [])) != 1: errors.append("fail fixture must record one failure")
required = {"id", "title", "url", "discoveredVia", "discoveredAt", "score", "officialCandidateUrl"}
for seed in ok.get("seeds", []):
    missing = required - set(seed)
    if missing: errors.append(f"seed missing={sorted(missing)}")
if errors:
    print("FAIL[community-selftest] " + "; ".join(errors))
    sys.exit(2)
print("PASS[community-selftest] success_exit=0 fail_closed_exit=2 seeds=3 failures_recorded=1")
PY
