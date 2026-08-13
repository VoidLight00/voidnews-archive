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

### VN-SRC-01 — 예약값만 있고 레지스트리 행이 없어 소스가 매 run 조용히 누락 (2026-07-30)

**증상**: 사용자가 지정한 두 수집 소스(텔레그램 AI 레이더 → 옵시디언 `AI레이더/`, Choi 카톡방)가 2026-07b에 이어 2026-07c 초기 레인 설계에서도 빠졌다. 사용자 지적으로 발견.

**원인**: `seed-schema.md`·`source-ledger-schema.md`·`SKILL.md`에 `kakao-room`/`telegram-radar`가 **"예약값"이라는 산문**으로만 존재했고, HARD 커버리지 게이트(`check_curator_coverage.sh`)가 읽는 유일한 SSoT인 `references/curator-channels.json`에는 해당 행이 **없었다**. 게이트는 레지스트리에 있는 채널만 검사하므로, 등록되지 않은 소스는 누락돼도 exit 0이 나온다 — 안전망이 있다고 믿었으나 검사 대상 자체가 없었다.

**담당 에이전트**: `voidbrief-collector` (레인 설계), conductor (게이트 배선)

**수정**: `curator-channels.json`에 `telegram-obsidian-ai-radar`, `kakao-choi-room` 2행 추가(등록 후 `verify_curator_channels.sh` exit 0, channels=85). 이제 두 소스는 매 run `01_curator_coverage.json`에 행이 없으면 커버리지 게이트가 exit 2로 차단한다.

**재발 방지 규칙**: **`discoveredVia` 열거값을 새로 만들 때는 같은 변경에서 `curator-channels.json`에 행을 추가한다.** 레지스트리에 없는 값은 강제되지 않는 산문이다. `seed-schema.md`에 이 규칙을 명시했다.

### VN-SRC-03 — 생성형 미디어 publisher 축이 없어 Seedance 2.5를 통째로 누락 (2026-08-13)

**증상**: 2026-08a(07-31~08-12) 수집·검증·사이트 게이트가 통과했지만 영상·이미지·음성·3D 생성 모델 축이 lane/registry/official matrix 어디에도 없어, 창 안 Luma의 Seedance 2.5 지원(08-06), Luma Scenes(08-11), Higgsfield Cinema Studio 4.0(08-12)을 발견하지 못했다.

**원인**: `curator-channels.json` 85개와 `official-source-matrix.md`가 범용 LLM·코딩·연구·커뮤니티 중심으로 구성됐고, 생성형 미디어 공식 publisher 집합이 0개였다. 게이트는 등록된 집합의 완전성만 검사하므로 레지스트리 공백을 100% 통과시켰다.

**수정**: ByteDance Seed·Luma·Higgsfield·MiniMax·Kling·Qwen·Hunyuan·Midjourney·Runway·Pika·Adobe Firefly·BFL·Stability·Ideogram·Suno·ElevenLabs·Cartesia·Hume·Meshy·Tripo·World Labs 공식 채널 21개를 registry에 추가하고 official source matrix와 콘텐츠 인벤토리에 영상/이미지 및 음성/3D 축을 추가했다. registry gate 실측: channels=106, duplicate=0, identityVerified=all.

**재발 방지 규칙**: 편집 범주를 새로 다룰 때는 개별 사건만 보강하지 말고 공식 publisher 집합을 같은 변경에서 registry와 matrix에 등록한다. 제품 페이지에 기능은 있으나 게시일이 없으면 날짜를 추정하지 않으며, 통합 서비스의 지원 시작일과 원개발사 출시일을 혼동하지 않는다.

### VN-GATE-01 — 커버리지 게이트 2종이 같은 산출물에 상충하는 규격을 요구 (2026-07-30)

**증상**: 2026-07c 수집에서 `check_curator_coverage.sh`는 exit 0인데 `check_video_coverage.sh`가 `FAIL[ghost-id]`로 exit 2. 같은 `01_curator_coverage.json`을 두 게이트가 읽는데, 전자는 **모든 플랫폼**(youtube/x/web) 채널 행을 요구하고 후자는 **YouTube 외 행을 전부 ghost**로 판정했다.

**원인**: `check_video_coverage.py:compare()`가 `registry_ids`를 YouTube 채널로만 만들고 `set(rows) - registry_ids`를 ghost로 처리했다. 2026-07b에서는 대부분 채널의 `addedAt`이 run 종료일(07-20) 이후라 커버리지 행이 17개뿐이었고, 그중 비-YouTube 행이 적어 잠복했다.

**수정**: ghost 판정 기준을 **전체 레지스트리 id**로 바꿨다(백업 `.bak.20260730`). ghost의 원래 의도(레지스트리에 없는 조작된 id 검출)는 유지된다. `check_video_coverage_selftest.sh` 6개 픽스처 전부 설계대로 통과(complete=0, 나머지=2) — 무회귀 실증.

**부수 발견 — `promoted:<item-id>` 형식 드리프트**: 수집기들이 `decision`에 근거 id를 덧붙여(`promoted:anthropic-20260724-claude-opus-5`) 게이트의 `valid_decision`(정확히 `promoted` 또는 `skipped:<사유>`)을 21건 위반했다. 병합기가 `promoted`로 정규화하고 id는 `promotedItemIds`에 보존하도록 처리했다. **LANE_BRIEF에 형식을 명시해도 에이전트는 정보를 덧붙인다 — 계약 검사는 수집기가 아니라 병합/게이트 층에서 해야 한다.**

### VN-SRC-02 — 큐레이터 아카이브를 '발견 불가'로 오판해 9일치 누락 (2026-07-31)

**증상**: 2026-07c 수집에서 `baeksang.dev/daily`(한국어 데일리 큐레이션)를 `status: ok`로 기록했으나 `httpNote`에 "per-day archive (07-21~07-29) not discoverable from this page"라고 적고 **최신호(07-30) 하나만** 읽었다. 창 안 10개 이슈 중 9개가 미확인 상태로 통과했다.

**실측 반증**: `/daily/archive` HTTP 200, `/daily/2026-07-21` ~ `/daily/2026-07-30` **전부 HTTP 200**. 발견 불가가 아니라 수집기가 인덱스 페이지만 보고 단정한 것이다. 전수 재수집 결과 고유 story 87건, 외부 원문 링크 107건(기존 수집 24 / 미수집 83).

**왜 치명적이었나**: 미수집 83건 중 `openai.com/index/*` 공식 글 3건(07-23×2, 07-29×1)이 있었다. openai.com은 이 run 내내 Cloudflare 403으로 직접 열거가 막혀 있었고, **백상이 그 도메인을 우회할 유일한 발견 경로였다.** 큐레이터 축 누락이 곧 공식 축 누락으로 번지는 구조다.

**담당 에이전트**: `voidbrief-collector` (web-newsletters 레인)

**재발 방지 규칙**: 큐레이터/뉴스레터 소스는 **인덱스 1페이지가 아니라 날짜 창 전체를 열거**해야 한다. `checked[]`에 `itemsInWindow`만 적지 말고 **확인한 날짜 리스트(daysCovered)** 를 남기고, 창 일수와 개수가 다르면 게이트가 FAIL한다. "발견 불가"로 적을 때는 시도한 URL 패턴과 각각의 HTTP 코드를 함께 남긴다 — 단정은 증거가 아니다.

**산출물**: `_workspace/ab/20260730-ab-20260721-20260730/01d_baeksang_backfill.json`, `01d_baeksang_gap.json`

### VN-GATE-02 — 커버리지 집계가 호스트 단위라 없는 수확을 만들어냄 (2026-07-31)

**증상**: `check_curator_coverage.sh`가 exit 0(85/85, 수확 686건)으로 통과했는데, 그중 **X 37채널이 전부 `itemsFound: 9 / visited-harvested`** 로 기록돼 있었다. 실제로는 37채널 전 채널이 3경로 차단으로 **0건**이었다. 게이트가 "수확했다"고 통과시킨 값이 허구였다.

**원인**: 병합기가 `discoveredVia`를 **호스트 단위**(`x.com`)로 집계한 뒤 `found = max(found, item_hosts[host])`로 채널 행에 부여했다. `x.com`을 언급한 항목 9건이 그 호스트를 공유하는 **37채널 전부에 복제**됐다. `threads.com`·`youtube.com`처럼 다중 채널이 한 호스트를 쓰는 모든 플랫폼에 같은 결함이 있었다.

**수정**: 집계 키를 호스트가 아니라 **채널 URL 접두**로 바꿨다(`via_hits()`). 재병합 결과 X 36채널이 `visited-blocked-http` 0건으로 교정됐고, 전체 수확합이 **686 → 358**로 내려갔다(686이 부풀려진 값이었다). zeroHarvest 25 → 61이 정직한 수치다.

**교훈**: 게이트가 exit 0을 냈다고 값이 참인 건 아니다. **집계 키가 대상보다 거칠면 게이트는 통과하면서 거짓을 통과시킨다.** 커버리지 수치는 그 채널에 고유한 식별자(URL·handle)로만 귀속한다. 이 결함은 신규 게이트(`check_block_staleness`)를 시험하다 X 행의 `itemsFound=9`가 눈에 걸려 발견됐다 — 게이트를 늘리면 기존 게이트의 거짓 통과도 같이 드러난다.

### VN-CI-01 — 하네스 스코프 evidence 가 Vercel 빌드를 막음 (2026-08-13)

**증상**: 로컬 `npm run build` 8/8 게이트 통과 후 push 했는데 Vercel 프로덕션 빌드가
22초 만에 실패. `verify-improvements.mjs` FAIL exit 2, ledger 6건이 REGRESSED.
IMP-0023·0024·0026·0027·0028 은 actual=127, IMP-0025 는 actual=1.

**원인**: 그 6건은 하네스(스킬) 쪽 개선이라 evidence 명령이
`bash ~/.claude/skills/voidnews-briefing-pipeline/...` 를 실행한다. 스킬 디렉토리는
작성 머신에만 있고 Vercel 빌더에는 없어 `sh` 가 exit 127(command not found)을 낸다.
실제 회귀가 아닌데 배포가 막혔고, 로컬에서는 경로가 존재해 통과하므로 잠복했다.

**수정**: `ledger.mjs` 에 환경 인식을 넣었다. evidence cmd 가 `~/.claude/skills/` 를
참조하는데 그 루트가 없는 환경이면 `skipped(harness-scope)` 로 분리하고 회귀로 세지
않는다. 경로가 있는 머신에서는 그대로 실측한다. 자체검증: CI 시뮬(HOME 격리)에서
6 skipped·16 verified·exit 0, 리포 범위 항목을 일부러 깨면 같은 환경에서 exit 2.

**재발 방지 규칙**: 리포 게이트의 evidence 는 리포 상대경로만 쓴다. 하네스 산출물을
근거로 삼아야 하면 그 사실이 명령 자체에 드러나게 두고(`~/.claude/skills/` 접두사),
검증기가 환경별로 분기하게 한다. "로컬에서 통과했으니 CI 도 통과한다"는 가정 금지.

### VN-DESIGN-02 — 컬러 가로 accent line 재발 (2026-08-13)

**증상**: AB VIP 카드(/ab/2026-08a) 하단에 `--gold` 3px 가로 막대. 좌측 세로 스트라이프와
같은 부류의 AI 티인데, 세로줄만 HARD 게이트가 있고 가로줄은 산문 규칙뿐이라 컴포넌트를
새로 만들 때마다 되살아났다. 사이트 전수 스캔에서 8건 더 발견(editorial CSS 6, PostModal 1,
globals.css 1).

**원인**: 규칙이 코드가 아니라 문서에만 있었다. `no_vertical_stripe_gate.sh` 는 있었지만
가로 방향 대응물이 없었다.

**수정**: `scripts/check-horizontal-accent.mjs` 신설 후 BUILD_GATES 등록(9개로 증가).
2px 이상 border-top/bottom 중 색이 accent 계열(--gold/--accent/--kicker/${accent}/
${companyColor}/amber·yellow/hex)이면 차단, 1px 중립 hairline·hr·accent-color 는 허용.
캐논 사본 `~/.claude/qa-canon/no_horizontal_accent_gate.sh` 도 같이 뒀다.
자체검증: 위반 주입 exit 2, 복원 exit 0.

**재발 방지 규칙**: 디자인 금지 규칙은 산문으로 끝내지 않는다. 세로/가로처럼 대칭인
규칙은 한쪽만 게이트로 만들면 다른 쪽으로 새어 나온다. 그리고 리포 게이트는 캐논
스크립트를 shell out 하지 말고 자체 구현한다 — `~/.claude` 는 CI 에 없다(VN-CI-01).

### VN-DESIGN-03 — AB 하이라이트 썸네일 전량 누락 (2026-08-13)

**증상**: VIP 카드 이미지 영역이 실제 썸네일 대신 "VOIDNEWS+회사명" 플레이스홀더로 렌더.
08a·07c 하이라이트의 `thumbnail` 필드가 각각 0개였다.

**원인**: `inject-thumbnails.mjs` 가 AB 파일에서 `indent <= 4` 인 title 을 "회차 제목"으로
보고 건너뛰었는데, top-level 의 `const x = post({ title: ... })` 도 같은 들여쓰기라 함께
걸러졌다. 주차 파일은 카드가 깊게 중첩돼 있어 이 버그가 드러나지 않았다.

**수정**: 들여쓰기 대신 회차 객체에만 있는 키(`highlights`/`editorsPicks`/`coveredWeeks`/
`announceDate`)로 판별하게 바꿨다. 재실행 결과 08a 7건·07c 11건 주입, 08a 하이라이트 5장
전부 썸네일 확보(missing 0).

**재발 방지 규칙**: 구조 판별에 들여쓰기를 쓰지 않는다. 같은 깊이에 다른 의미의 노드가
오면 조용히 누락된다. 고유 키로 판별한다.

### VN-DESIGN-04 — 도메인 폴백 썸네일이 다른 버전·다른 회사 이미지를 붙임 (2026-08-13)

**증상**: 사용자가 "시댄스 2.0 올라가있는데 2.5 소개 아니니?" 로 지적. Seedance 2.5 카드에
Seedance **2.0** 이미지가 붙어 있었다. 전수 대조 결과 25개 카드가 주제 불일치 이미지였다.
`liquid.ai` 카드에 `deepgrove` 이미지처럼 **회사 자체가 다른** 경우도 있었다.

**원인**: 봇 차단 도메인 대응으로 넣은 `fallback-map.json` 의 **도메인 단위 매핑**.
"빈 것보다 낫다"고 판단해 브랜드만 맞으면 붙였는데, 같은 제품의 다른 버전이나 다른 회사
이미지는 빈 것보다 나쁘다. 카드가 틀린 그림을 사실처럼 달게 된다.

**수정**: 주제 불일치 폴백 7종(seed.bytedance.com, liquid.ai/blog, research.meta.ai/blog,
meta.com, code.claude.com/docs, deepmind.google/blog, openai.com/index)을 제거하고 그것이
붙인 썸네일 25개를 카드에서 뺐다. 프록시로 실제 OG 재수집(3건 성공), 나머지는 플레이스홀더로
두고 thumb baseline 에 승인 등록했다.

**재발 방지 규칙**: 폴백 매핑은 **경로 단위**로만 만든다(`openai.com/index/<slug>`).
도메인 단위 폴백은 같은 도메인의 서로 다른 사건에 같은 그림을 붙이므로 금지한다.
빈 썸네일은 결함이지만, 틀린 썸네일은 오보다.

### VN-DESIGN-05 — 봇차단 도메인 OG 수집 경로 확립 (2026-08-13)

**증상**: VN-DESIGN-04 로 도메인 폴백을 걷어낸 뒤 이번 회차 20개 카드가 플레이스홀더로
남았다. openai.com 14, seed.bytedance.com 3, deepmind/liquid/meta 각 1.

**원인**: 기존 두 경로가 모두 막혔다. ① 직접 fetch — Cloudflare 403 또는 og 태그 없는
JS 셸 200. ② 텍스트 프록시(r.jina.ai) — 초반엔 통했으나 반복 호출로 레이트리밋,
17건 연속 전부 실패. RSS(openai.com/news/rss.xml)에는 이미지 필드가 없다(ctfassets 0건).

**수정**: 로컬 헤드리스 브라우저로 전환했다. playwright 파이썬 패키지는 있으나 번들
chromium 빌드 번호가 어긋나(1200 기대, 1208/1228/1234 보유) `channel="chrome"` 으로
시스템 Chrome 을 썼다. 첫 시도는 1/17 — 같은 컨텍스트의 연속 요청을 Cloudflare 가
차단했다. **URL 마다 새 컨텍스트 + 9초 간격**으로 바꾸자 11/15 성공. openai.com 14건
전부 확보.

og 태그가 아예 없는 페이지(seed.bytedance.com 제품/블로그, meta.com, liquid.ai)는
브라우저로도 못 잡는다. Seedance·SeedRealtime 은 공식 블로그 인덱스의 기사 이미지
(lf3-static.bytednsdoc.com)를 제목-이미지 쌍으로 파싱해 붙였다.

결과: 08a 하이라이트 6/6, w31 29/29, w32 41/42, w33 31/32.

**재발 방지 규칙**: 봇차단 도메인 OG 수집 순서는 ①직접 fetch ②텍스트 프록시
③헤드리스 브라우저(컨텍스트 격리 + 간격) ④공식 인덱스의 기사 이미지 파싱 이다.
프록시를 연타하지 않는다 — 레이트리밋에 걸리면 그 세션 내내 못 쓴다.
