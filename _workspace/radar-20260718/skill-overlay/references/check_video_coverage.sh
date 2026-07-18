#!/bin/bash
# YouTube curator upload decision coverage gate. exit 0=PASS, exit 2=FAIL.
set -u
DIR="$(cd "$(dirname "$0")" && pwd)"
START=""
END=""
COVERAGE=""
FIXTURE_DIR=""

while [ "$#" -gt 0 ]; do
  case "$1" in
    --start) START="${2:-}"; shift 2 ;;
    --end) END="${2:-}"; shift 2 ;;
    --coverage) COVERAGE="${2:-}"; shift 2 ;;
    --fixture-dir) FIXTURE_DIR="${2:-}"; shift 2 ;;
    *) echo "FAIL[usage] unknown argument: $1"; exit 2 ;;
  esac
done

if [ -z "$START" ] || [ -z "$END" ] || [ -z "$COVERAGE" ]; then
  echo "FAIL[usage] check_video_coverage.sh --start YYYY-MM-DD --end YYYY-MM-DD --coverage <json> [--fixture-dir <dir>]"
  exit 2
fi

ARGS=(
  "$DIR/check_video_coverage.py"
  --start "$START"
  --end "$END"
  --coverage "$COVERAGE"
  --registry "$DIR/curator-channels.json"
)
if [ -n "$FIXTURE_DIR" ]; then
  ARGS+=(--fixture-dir "$FIXTURE_DIR")
fi
python3 "${ARGS[@]}"
rc=$?
exit "$rc"
