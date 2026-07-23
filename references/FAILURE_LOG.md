# VoidNews AB 실패 기록 + 회귀 방지 (SSoT)

VoidNews AI Briefing 하네스가 과거에 실제로 틀렸던 사례를 보존하고, **각 사례가 다음 빌드/실행에서 자동으로 재검사되도록** 한다.
키노트 명제 "기억 = 다음 실행의 조건"을 코드로 구현한 것.

## 동작 방식

- 머신 체크는 `references/regressions.json`에 선언한다.
- `scripts/check-regressions.mjs`가 그 선언을 읽어 `lib/`·`app/`에 회귀를 검사한다.
- `package.json`의 `prebuild`가 `check-slugs && check-regressions && check-card-content`로 체이닝되고, `postbuild`가 `check-render-leaks`로 체이닝되어, **매 `npm run build`(Vercel CI 포함) 때마다** 과거 회귀가 자동 재검사된다.
- 회귀 1건이라도 발견되면 `process.exit(1)`로 빌드를 차단한다.

## 머신 게이트 인벤토리 (HARD)

| 게이트 | 시점 | 검사 | 차단 |
|---|---|---|---|
| `check-slugs.mjs` | prebuild | 비-ASCII slug | exit 1 |
| `check-regressions.mjs` | prebuild | `regressions.json` grep 회귀 | exit 1 |
| `check-card-content.mjs` | prebuild | 미지원 마크다운(h5/h6·`![img]`·`---`) → raw 노출 / 본문 풍부도(WARN) | exit 1 |
| `check-render-leaks.mjs` | postbuild | 빌드된 `out/**/*.html` `<article>` 본문의 raw 마크다운(`##`·`**`·백틱) 누수 | exit 1 |
| `verify-publish-ready.mjs` | publish | 썸네일/broken image + 위 2개 재확인 | exit 2 |

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

### VN-RENDER-LEAK — 카드 본문 마크다운이 화면에 raw로 노출 (2026-06-03)
- 증상: 상세 페이지·발표 페이지·카드 목록에서 `### 소제목`, 불릿 `- `, 번호 `1.`, 인라인 `` `code` ``, summary 백틱이 HTML로 변환되지 않고 글자 그대로 노출. 특히 "리드 문장 + 불릿"이 빈 줄 없이 한 블록일 때 광범위하게 발생(2026-04a·w15·w16 등 다수 카드).
- 원인: (1) `PostDetail.tsx renderMarkdown`이 `## h2`와 "블록 전체가 리스트"인 경우만 처리 — `###`/`####` 미지원, mixed 블록(리드+불릿) 미처리, 인라인 백틱 미처리. (2) `articleDek`/officialExcerpt가 renderInline을 안 거침. (3) `presentation/[slug] renderRichText`가 `**bold**`만 처리. (4) `summary` 필드에 백틱이 들어가 평문 출력처(카드/메타/dek)에서 raw 노출.
- 해결: `renderMarkdown`을 **라인 단위 파서**로 재작성(h2~h4·불릿·번호·인용·인라인 `**`/`` ` ``/`[]()` 처리, mixed 블록 분리). dek·official 발췌도 `renderInline`. `presentation`의 `renderRichText`도 라인 파서로 교체. summary 백틱 제거.
- 담당: 렌더러(`PostDetail`/`presentation`), 작성(`voidbrief-site-writer`). 머신체크: `scripts/check-card-content.mjs`(prebuild, 미지원 마크다운 → exit 1) + `scripts/check-render-leaks.mjs`(postbuild, 빌드 HTML raw 누수 → exit 1). 둘 다 HARD. **renderMarkdown에 새 문법을 추가하면 게이트가 자동으로 통과/실패를 동기화** — 렌더러가 처리 못 하는 문법만 빌드 HTML에 남아 검출되기 때문.

### VN005 — 임시 수집 스크립트가 하네스의 discovery/매트릭스 단계를 우회 (2026-06-10, w24)
- 증상: w24 수집이 OpenAI/NVIDIA/Google 등 공식 사이트만 직접 때려 36건을 모았으나, 정식 하네스에 명시된 **TestingCatalog radar 선행 훑기 + 한국 큐레이터(조코딩 등) discovery 단계**를 거치지 않음. 그 결과 그 주의 leak·비공식·맥락 정보를 놓쳤을 가능성. 산출물엔 흔적이 없어 "100% 공식 출처"로 조용히 통과됨.
- 원인 (5-why): (1) collect.js에 discovery 단계 미기재 → (2) 정식 `voidbrief-collector`를 안 쓰고 즉석 스크립트로 대체 → (3) AUP 차단 회피를 위해 fresh 세션에서 collector 로직을 **기억으로 재작성** → (4) 재작성 시 `official-source-matrix.md`의 discovery 2단 구조와 QA 게이트를 누락 → (5) **근본: 임시 파이프라인에 수집-완전성 게이트가 아예 없어 검증 기회 자체가 없었음** (QA가 빠뜨린 게 아니라 QA를 우회).
- 해결: (a) `scripts/check-collection-provenance.mjs` 신설 — 수집 디렉토리에 `_source_matrix_check.json`(publishers 매트릭스 + discoveryChecked[TestingCatalog]) 증거가 없으면 exit 1. (b) `regressions.json` VN005로 임시 collect 스크립트가 official-source-matrix/TestingCatalog discovery를 빠뜨렸는지 grep. (c) CLAUDE.full 하네스 라우팅에 "정식 하네스가 있으면 임시 스크립트로 대체 금지, 불가피하면 게이트까지 포팅" 규칙 추가(메모리 [[reference_harness_no_adhoc_bypass]]).
- 담당: `voidbrief-collector`(수집), `voidbrief-qa-auditor`(검증). 머신체크: `scripts/check-collection-provenance.mjs`(수집 후 HARD, exit 1) + `regressions.json` VN005. **재발 방지 핵심: 다음에 누가 임시 수집을 또 짜도, provenance 게이트가 없으면 그 산출물은 사이트 반영 전에 차단된다.**

### VN006 — 같은 officialUrl 카드 중복이 자기보고로만 막힘 (2026-06-20, soundness 감사)
- 증상: 동일 공식 발표가 여러 주차/edition에 별도 카드로 중복 등재돼도 "중복 없이"가 LLM 판단(SOFT)으로만 보장. 실측 결과 published 데이터에 동일 officialUrl 중복 21건(특정 기사 기준) 존재.
- 원인: dedup이 normalizer/verifier 에이전트 안에만 있고 exit-code 게이트가 없었음.
- 해결: `scripts/verify-no-duplicates.mjs`(HARD, 신규 dup → exit 2). generic 인덱스 URL(release-notes/news/changelog)은 allowlist, 기존 21건은 `scripts/known-duplicates-baseline.json`에 legacy로 baseline. `run-all-gates.mjs`(=prebuild) 상시 실행. 회귀 테스트: baseline에서 1건 제거 시 exit 2 실증.
- 담당: `voidbrief-site-writer`. 머신체크: `verify-no-duplicates.mjs`(prebuild HARD) + `regressions.json` VN006(배선 메타가드).
- 잔여 tech debt: baseline의 21건 중 일부(PaddleOCR 3.5, higher-limits-spacex 등)는 실제 중복 카드 — 추후 site 정리 대상. 나머지(io-2026 keynote 다중 발표 등)는 한 발표 다중 카드로 정상.

### VN007 — 범위 종료일 직전 커버리지 공백 무검출 (2026-06-20, soundness 감사)
- 증상: run이 "~ 2026-06-18"을 선언해도 실제 최신 수집물이 2026-06-09에서 끊겨 6/10~6/18 한 주가 통째로 누락되는데, 모든 기존 HARD 게이트는 통과. (이번 consolidate 작업에서 실측: tail gap 9일)
- 원인: date-rules는 "시작·종료 포함"만 명시, day-by-day/tail-window 커버리지 게이트 부재.
- 해결: `scripts/check-date-coverage.mjs`(HARD, tail gap > max → exit 2, interior 연속공백도 감지). consolidate-runs.mjs가 자동 호출. 실증: 범위 6/18→exit2, 6/10→exit0.
- 담당: `voidbrief-conductor`. 머신체크: `check-date-coverage.mjs`(consolidate/run HARD) + `regressions.json` VN007(배선 메타가드).

### VN008 — threads 봇 수집 데이터가 정식 ingest 경로 없이 누락 (2026-06-20, soundness 감사)
- 증상: `~/threads-automation`이 상시 모은 source_archive.sqlite(482) + content_archive.json(96)이 AB 하네스에 정식 phase/agent로 들어오지 않아, 매 run마다 사람이 안 챙기면 한국·실시간 소스가 통째로 누락. 과거엔 `04_cokacdir_publish_addendum.json` 같은 ad-hoc crosscheck만 존재.
- 원인: 봇과 AB가 별도 repo라 ingest 계약이 없었음.
- 해결: `voidbrief-threads-ingest`(Phase 1B) 에이전트 신설(read-only sqlite, role 분류, `discoveredVia:threads-archive`). consolidate 경로는 `scripts/consolidate/extract_collected.py`가 결정론으로 동일 ingest 수행.
- 담당: `voidbrief-threads-ingest`. 머신체크: `regressions.json` VN008(ingest 경로 배선 메타가드).

### VN-COLLECT-01 — routine 수집까지 Opus 고정으로 토큰·중복 fetch 낭비 (2026-07-22)
- 증상: 공식 URL 순회·큐레이터 탐색·짧은 메타데이터 추출까지 모든 agent가 Opus를 사용하고 전체 원장을 반복 전달함.
- 원인: phase별 모델 경계, lane ownership, cache-aware deterministic fetch, policy-pinned resume 계약 부재.
- 해결: legacy 경로 보존 + Luna URL discovery/Terra verify·normalize/Sol rank·plan shadow 경로, URL-only lossless merge, staged preverify/postverify gate.
- 담당: `voidbrief-conductor`, `voidbrief-luna-collector`, `voidbrief-source-verifier`. 머신체크: `~/.claude/skills/voidnews-briefing-pipeline/gates/verify_collection_routing.sh`.
