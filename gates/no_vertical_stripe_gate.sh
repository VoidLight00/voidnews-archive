#!/usr/bin/env bash
# Inspect first-party UI and static assets; downloaded source evidence is not UI.
set -euo pipefail
ROOT="${1:-$(cd "$(dirname "$0")/.." && pwd)}"
for target in app public; do
  [ -d "$ROOT/$target" ] || { printf 'FAIL[stripe]: missing %s\n' "$target" >&2; exit 1; }
done
bash "$(dirname "$0")/lib/no_vertical_stripe.sh" "$ROOT/app" "$ROOT/public"
