#!/bin/bash
# Proves complete fixture exits 0 and one-missing fixture exits 2.
set -u
DIR="$(cd "$(dirname "$0")" && pwd)"
FIX="$DIR/fixtures/video-coverage"
CHECK="$DIR/check_video_coverage.py"
COMMON=(
  "$CHECK"
  --start 2026-07-01
  --end 2026-07-18
  --registry "$FIX/registry.json"
  --fixture-dir "$FIX"
)

python3 "${COMMON[@]}" --coverage "$FIX/coverage-complete.json"
complete_rc=$?
set +e
python3 "${COMMON[@]}" --coverage "$FIX/coverage-missing.json"
missing_rc=$?
python3 "${COMMON[@]}" --coverage "$FIX/coverage-invalid-fields.json"
fields_rc=$?
python3 "${COMMON[@]}" --coverage "$FIX/coverage-invalid-range.json"
range_rc=$?
python3 "${COMMON[@]}" --coverage "$FIX/coverage-mismatched-title.json"
title_rc=$?
python3 "${COMMON[@]}" --coverage "$FIX/coverage-mismatched-published.json"
published_rc=$?
set -e

if [ "$complete_rc" -ne 0 ]; then
  echo "FAIL[selftest] complete expected=0 actual=$complete_rc"
  exit 2
fi
if [ "$missing_rc" -ne 2 ]; then
  echo "FAIL[selftest] missing expected=2 actual=$missing_rc"
  exit 2
fi
if [ "$fields_rc" -ne 2 ]; then
  echo "FAIL[selftest] invalid-fields expected=2 actual=$fields_rc"
  exit 2
fi
if [ "$range_rc" -ne 2 ]; then
  echo "FAIL[selftest] invalid-range expected=2 actual=$range_rc"
  exit 2
fi
if [ "$title_rc" -ne 2 ]; then
  echo "FAIL[selftest] mismatched-title expected=2 actual=$title_rc"
  exit 2
fi
if [ "$published_rc" -ne 2 ]; then
  echo "FAIL[selftest] mismatched-published expected=2 actual=$published_rc"
  exit 2
fi
echo "PASS[video-coverage-selftest] complete=0 missing=2 invalid-fields=2 invalid-range=2 mismatched-title=2 mismatched-published=2"
exit 0
