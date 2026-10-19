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
#
# 2026-10-18 (FAILURE_LOG VN-SYNC-01): 이 게이트는 호출자가 0개였고, 근거를 못 구하는
# 세 갈래(.vercel/project.json 없음 · auth.json 없음 · token/project 부족)가 전부 exit 0 이었다.
# "확인할 수 없음"을 "정상"으로 보고하던 구조다. 이제 근거 없음은 비영으로 끝내고,
# Vercel 미설정 환경(CI 패리티 트리·새 클론)만 --allow-unconfigured 로 명시 SKIP 한다.
cd "$(dirname "$0")/.."

ALLOW_UNCONFIGURED=0
for a in "$@"; do
  case "$a" in
    --allow-unconfigured) ALLOW_UNCONFIGURED=1 ;;
    --warn) ALLOW_UNCONFIGURED=1 ;;
  esac
done

# 근거를 구하지 못한 경우의 단일 종료 경로. 조용히 통과하지 않는다.
no_evidence() { # $1=사유 토큰  $2=설명
  if [ "$ALLOW_UNCONFIGURED" -eq 1 ]; then
    echo "SKIP[git-sync:$1] $2 — --allow-unconfigured 로 통과시킵니다(배포 검증 아님)"
    exit 0
  fi
  echo "FAIL[git-sync:$1] $2" >&2
  echo "  배포 동기화를 확인할 근거가 없습니다. 확인 불가는 정상이 아닙니다." >&2
  echo "  Vercel 미설정 환경이라면 --allow-unconfigured 를 명시하십시오." >&2
  exit 2
}

VERCEL_TOKEN_FILE="$HOME/Library/Application Support/com.vercel.cli/auth.json"
VERCEL_PROJECT_JSON=".vercel/project.json"

if [ ! -f "$VERCEL_PROJECT_JSON" ]; then
  no_evidence "no-project" ".vercel/project.json 없음"
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
  no_evidence "no-auth" "Vercel CLI auth.json 없음 — production commit 을 비교할 수 없음"
fi

TOKEN=$(python3 -c "import json; print(json.load(open('$VERCEL_TOKEN_FILE'))['token'])" 2>/dev/null || echo "")
PROJECT_ID=$(python3 -c "import json; print(json.load(open('$VERCEL_PROJECT_JSON'))['projectId'])" 2>/dev/null || echo "")
TEAM_ID=$(python3 -c "import json; print(json.load(open('$VERCEL_PROJECT_JSON')).get('orgId',''))" 2>/dev/null || echo "")

if [ -z "$TOKEN" ] || [ -z "$PROJECT_ID" ]; then
  no_evidence "no-credentials" "Vercel token 또는 projectId 를 읽지 못함"
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

if [ -z "$PROD_SHA" ]; then
  no_evidence "no-prod-commit" "production 배포의 commit 을 조회하지 못함(API 응답 비었음)"
fi

if [ "$PROD_SHA" != "$(echo $LOCAL_SHA_SHORT | cut -c1-7)" ]; then
  echo "🟡 WARN — production commit ($PROD_SHA) ≠ local HEAD ($(echo $LOCAL_SHA_SHORT | cut -c1-7))."
  echo "       원인: local 'vercel deploy --prod' 결과를 GitHub auto-deploy 가 덮어씀."
  echo "       해결: git push origin $BRANCH 후 30-60s 대기, 또는 'vercel deploy --prod --force' 후 'vercel alias set ...'"
  [ $EXIT -lt 1 ] && EXIT=1
fi

if [ $EXIT -eq 0 ]; then
  echo "PASS[git-sync] local HEAD($(echo $LOCAL_SHA_SHORT | cut -c1-7)) == production commit($PROD_SHA) · dirty 0 · unpushed 0"
fi

exit $EXIT
