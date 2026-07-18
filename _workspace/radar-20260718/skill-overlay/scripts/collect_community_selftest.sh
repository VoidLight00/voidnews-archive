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

python3 - "$REF/config.json" "$TMP/disabled-config.json" <<'PY'
import json, sys
source_path, target_path = sys.argv[1], sys.argv[2]
config = json.load(open(source_path, encoding="utf-8"))
config["reddit"] = {
    **config["reddit"],
    "enabled": False,
    "disabledReason": "HTTP 403 2026-07-18",
}
with open(target_path, "w", encoding="utf-8") as handle:
    json.dump(config, handle, ensure_ascii=False, indent=2)
    handle.write("\n")
PY

python3 "$DIR/collect_community.py" \
  --start 2026-07-13 --end 2026-07-18 \
  --config "$TMP/disabled-config.json" --fixture-dir "$REF/fail" \
  --out "$TMP/disabled.json"
disabled_rc=$?

python3 - "$TMP/ok.json" "$TMP/fail.json" "$TMP/disabled.json" "$ok_rc" "$fail_rc" "$disabled_rc" <<'PY'
import json, sys
ok_path, fail_path, disabled_path = sys.argv[1:4]
ok_rc, fail_rc, disabled_rc = map(int, sys.argv[4:7])
ok = json.load(open(ok_path, encoding="utf-8"))
fail = json.load(open(fail_path, encoding="utf-8"))
disabled = json.load(open(disabled_path, encoding="utf-8"))
errors = []
if ok_rc != 0: errors.append(f"ok expected=0 actual={ok_rc}")
if fail_rc != 2: errors.append(f"fail expected=2 actual={fail_rc}")
if disabled_rc != 0: errors.append(f"disabled expected=0 actual={disabled_rc}")
if len(ok.get("seeds", [])) != 3: errors.append(f"ok seeds expected=3 actual={len(ok.get('seeds', []))}")
if ok.get("failures"): errors.append("ok failures must be empty")
if len(fail.get("failures", [])) != 1: errors.append("fail fixture must record one failure")
if disabled.get("failures"): errors.append("disabled Reddit must not record failures")
disabled_sources = [source for source in disabled.get("sources", []) if source.get("id", "").startswith("reddit:")]
if len(disabled_sources) != 2: errors.append(f"disabled sources expected=2 actual={len(disabled_sources)}")
for source in disabled_sources:
    if source.get("status") != "disabled": errors.append(f"source not disabled: {source.get('id')}")
    if source.get("disabledReason") != "HTTP 403 2026-07-18": errors.append(f"disabled reason missing: {source.get('id')}")
required = {"id", "title", "url", "discoveredVia", "discoveredAt", "score", "officialCandidateUrl"}
for seed in ok.get("seeds", []):
    missing = required - set(seed)
    if missing: errors.append(f"seed missing={sorted(missing)}")
if errors:
    print("FAIL[community-selftest] " + "; ".join(errors))
    sys.exit(2)
print(
    "PASS[community-selftest] success_exit=0 fail_closed_exit=2 disabled_exit=0 "
    "seeds=3 failures_recorded=1 disabled_sources=2 disabled_reason=HTTP_403_2026-07-18"
)
PY
