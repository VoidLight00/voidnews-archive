#!/usr/bin/env bash
# voidnews-archive — Vercel deploy 전후 git sync 게이트
# vercel deploy --prod 가 만든 deployment 가 GitHub webhook auto-deploy 로 덮어쓰여
# alias 가 옛 commit 의 코드를 가리키는 문제를 사전 차단한다.
#
# 검사 항목:
# 1. uncommitted changes 있는데 vercel project 가 git source 연결돼 있음 → 위험
# 2. local HEAD commit != production deployment commit → 알림
# 3. 발견 시 exit 2 (CI/스크립트가 fail 로 감지)
# set -e 사용 X — conditional expression 이 0 반환하면 트랩되어 exit code 망가짐
cd "$(dirname "$0")/.."

VERCEL_TOKEN_FILE="$HOME/Library/Application Support/com.vercel.cli/auth.json"
VERCEL_PROJECT_JSON=".vercel/project.json"

if [ ! -f "$VERCEL_PROJECT_JSON" ]; then
  echo "✓ .vercel/project.json 없음 — git sync 게이트 건너뜀"
  exit 0
fi

# 1. local git status
DIRTY=$(git status --porcelain | wc -l | tr -d ' ')
LOCAL_SHA=$(git rev-parse HEAD)
LOCAL_SHA_SHORT=$(git rev-parse --short HEAD)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
UNPUSHED=$(git log "@{u}.." --oneline 2>/dev/null | wc -l | tr -d ' ' || echo 0)

echo "=== local ==="
echo "  branch: $BRANCH @ $LOCAL_SHA_SHORT"
echo "  dirty files: $DIRTY"
echo "  unpushed commits: $UNPUSHED"

# 2. production deployment commit
if [ ! -f "$VERCEL_TOKEN_FILE" ]; then
  echo "⚠ Vercel CLI auth.json 없음 — production commit 비교 건너뜀"
  exit 0
fi

TOKEN=$(python3 -c "import json; print(json.load(open('$VERCEL_TOKEN_FILE'))['token'])" 2>/dev/null || echo "")
PROJECT_ID=$(python3 -c "import json; print(json.load(open('$VERCEL_PROJECT_JSON'))['projectId'])" 2>/dev/null || echo "")
TEAM_ID=$(python3 -c "import json; print(json.load(open('$VERCEL_PROJECT_JSON')).get('orgId',''))" 2>/dev/null || echo "")

if [ -z "$TOKEN" ] || [ -z "$PROJECT_ID" ]; then
  echo "⚠ Vercel auth/project 정보 부족 — production commit 비교 건너뜀"
  exit 0
fi

PROD_INFO=$(curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.vercel.com/v6/deployments?projectId=$PROJECT_ID&teamId=$TEAM_ID&limit=1&state=READY&target=production" \
  | python3 -c "
import sys, json
d = json.load(sys.stdin)
dep = d.get('deployments', [{}])[0]
sha = dep.get('meta', {}).get('githubCommitSha', '')
url = dep.get('url', '')
print(f'{sha[:7]}|{url}')
" 2>/dev/null || echo "|")

PROD_SHA=$(echo "$PROD_INFO" | cut -d'|' -f1)
PROD_URL=$(echo "$PROD_INFO" | cut -d'|' -f2)

echo "=== production ==="
echo "  alias deployment: $PROD_URL"
echo "  commit: $PROD_SHA"

# 3. 게이트 판정
EXIT=0
echo ""
echo "=== gate verdict ==="

if [ "$DIRTY" -gt 0 ]; then
  echo "🚨 P0 — uncommitted changes ($DIRTY files). GitHub webhook 이 매번 옛 commit 으로 alias 덮어씌움."
  echo "       해결: git add -A && git commit -m '...' && git push origin $BRANCH"
  EXIT=2
fi

if [ "$UNPUSHED" -gt 0 ]; then
  echo "🟡 WARN — local 에 unpushed commits $UNPUSHED 개. push 안 하면 GitHub auto-deploy 가 옛 코드 사용."
  echo "       해결: git push origin $BRANCH"
  [ $EXIT -lt 1 ] && EXIT=1
fi

if [ -n "$PROD_SHA" ] && [ "$PROD_SHA" != "$(echo $LOCAL_SHA_SHORT | cut -c1-7)" ]; then
  echo "🟡 WARN — production commit ($PROD_SHA) ≠ local HEAD ($(echo $LOCAL_SHA_SHORT | cut -c1-7))."
  echo "       원인: local 'vercel deploy --prod' 결과를 GitHub auto-deploy 가 덮어씀."
  echo "       해결: git push origin $BRANCH 후 30-60s 대기, 또는 'vercel deploy --prod --force' 후 'vercel alias set ...'"
  [ $EXIT -lt 1 ] && EXIT=1
fi

if [ $EXIT -eq 0 ]; then
  echo "✓ git sync OK — local HEAD == production commit, no uncommitted/unpushed."
fi

exit $EXIT
