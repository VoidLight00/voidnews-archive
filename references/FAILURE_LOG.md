# VoidNews AB 실패 기록 + 회귀 방지 (SSoT)

VoidNews AI Briefing 하네스가 과거에 실제로 틀렸던 사례를 보존하고, **각 사례가 다음 빌드/실행에서 자동으로 재검사되도록** 한다.
키노트 명제 "기억 = 다음 실행의 조건"을 코드로 구현한 것.

## 동작 방식

- 머신 체크는 `references/regressions.json`에 선언한다.
- `scripts/check-regressions.mjs`가 그 선언을 읽어 `lib/`·`app/`에 회귀를 검사한다.
- `package.json`의 `prebuild`가 `check-slugs && check-regressions`로 체이닝되어, **매 `npm run build` 때마다** 과거 회귀가 자동 재검사된다.
- 회귀 1건이라도 발견되면 `process.exit(1)`로 빌드를 차단한다.

## 규칙 승격 경로 (발견 → 영구 회귀체크)

QA(`voidbrief-qa-auditor`)나 사용자가 새 결함을 발견하면:
1. 아래에 `### VN0NN` 항목을 추가한다(증상·원인·담당 에이전트).
2. 머신 검사 가능하면 `references/regressions.json`에 항목을 추가한다(`grep_absent` / `grep_present_min`).
3. 다음 빌드부터 사람이 기억하지 않아도 `check-regressions.mjs`가 자동 재검사한다.
4. publish-ready 자체의 coverage(썸네일/deck)는 `scripts/verify-publish-ready.mjs`가 별도로 강제한다.

---

## 회귀 항목

### VN001 — 내부 큐레이션 메모가 공개 카드 본문에 노출 (2026-05)
- 증상: "Tier S+A 후보 풀", "사용자가 top10 선정 후" 같은 진행자 인터널 문구가 사이트 카드에 새어 나감.
- 원인: 작업 메모를 그대로 summary/content에 복사.
- 담당: `voidbrief-copy-editor` (Phase 6). 머신체크: `regressions.json` VN001 (grep_absent).

### VN002 — non-ASCII slug로 Vercel 정적 라우트 404 (2026-05-28, Grok Build 카드)
- 증상: 한글이 들어간 slug가 Next.js 16 static export에서 404.
- 원인: slug에 비-ASCII 문자.
- 담당: `voidbrief-site-writer` (Phase 5). 머신체크: `scripts/check-slugs.mjs` (이미 prebuild HARD, exit 1). 본 로그는 출처 기록용.

### VN003 — 카드 썸네일 미해결을 산문 판정으로 통과 (2026-06-02 보강)
- 증상: `_workspace/thumbnails/missing.json`에 항목이 남아 있어도 에이전트가 publish-ready로 판정.
- 원인: Phase 7 게이트가 코드 exit가 아닌 에이전트 자기보고(SOFT).
- 담당: `voidbrief-qa-auditor` (Phase 7). 머신체크: `scripts/verify-publish-ready.mjs` (missing.json 비어있지 않으면 exit 2, HARD).
