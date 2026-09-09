#!/usr/bin/env bash
set -euo pipefail
ROOT="${1:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$ROOT"
npm run test:archive
node scripts/test-weekly-source-images.mjs
node scripts/check-backfill-integration.mjs --self-test
node --no-experimental-strip-types scripts/check-i18n-coverage.mjs
