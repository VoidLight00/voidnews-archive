---
name: voidnews-briefing-pipeline
description: VoidNews AI & Beyond 날짜 범위 브리핑 전용 오케스트레이터. `/AB`, "AI 정보 몇일부터 몇일까지 정리", "AB 발표안", "VoidNews 주간/격주 브리핑", "메인 발표안 추천", "사이트에 반영", "옵시디언 대본까지", "이전 결과 기반 수정", "재실행", "resume", "status", "publish" 요청을 받으면 반드시 사용한다. 날짜 범위 기반 AI 뉴스 수집·출처 검증·정규화·랭킹·발표안 협의·voidnews-archive 데이터 작성·옵시디언 자료 작성·QA·배포 게이트를 병렬 에이전트로 처리한다.
---

# VoidNews AI Briefing Pipeline

`/AB` 명령의 메인 오케스트레이터. 사용자가 날짜 범위만 주면 AI 뉴스 원천을 수집하고, 공식 출처 중심으로 검증·정규화한 뒤, VoidNews 사이트와 발표 자료에 들어갈 구조화된 산출물을 만든다.

## 기본 경로

- 사이트: `~/projects/voidnews-archive`
- 작업 루트: `~/projects/voidnews-archive/_workspace/ab/<run_id>/`
- 옵시디언 출력: `~/Documents/암흑물질/200-참고-자료/2026년 AI 정보/VoidNews AB/<VOL>/`
- run_id: `YYYYMMDD-HHMMSS-ab-<start>-<end>` 예: `20260514-213000-ab-20260501-20260514`

## 실행 모드

| 모드 | 트리거 | 쓰기 범위 |
|------|--------|----------|
| (default `new`) | `/AB <YYYY-MM-DD> <YYYY-MM-DD> [edition]` — mode 키워드 생략 | new와 동일 |
| `plan` | 발표안 추천만 요청 | `_workspace`만 작성 |
| `new` | 새 날짜 범위 브리핑 | 승인 전 `_workspace`, 승인 후 사이트/옵시디언 |
| `resume` | 기존 run_id 이어서 (`/AB <run_id>` 단독도 resume으로 자동 판정) | 누락 phase만 |
| `status` | 진행상태 확인 | 읽기 전용 |
| `qa` | 검증만 재실행 | QA 리포트 |
| `publish` | 배포 요청 | 사용자 승인 후 git push/Vercel 확인 |
| `consolidate` | 전 run + published 아카이브 + threads 봇 데이터를 단일 중복제거 마스터로 통합 | `_workspace/ab/<run_id>/` (CONSOLIDATED_MASTER.json + CONSOLIDATED_LIST.md). 사이트/옵시디언 미수정 |

**모드 자동 판정 규칙**: 첫 인자가 `YYYY-MM-DD` 패턴이면 `new`, 첫 인자가 `\d{8}-\d{6}-ab-` run_id 패턴이면 `resume`, `consolidate`/`통합`/`정리 목록`/`중복 없이 합쳐`/`다 합쳐` 키워드면 `consolidate`, 그 외 키워드면 해당 모드. 날짜가 없으면 `AskUserQuestion`으로 시작일, 종료일, 회차명을 받는다. 기본 회차명은 최근 AB edition 다음 번호를 추론하되, 사용자가 확인해야 한다.

## 에이전트 팀

| 에이전트 | 역할 | 주요 산출물 |
|---------|------|------------|
| `voidbrief-conductor` | 실행 모드 판정, phase 게이트, run manifest 관리 | `RUN_MANIFEST.json`, `FINAL_REPORT.md` |
| `voidbrief-grok-fetcher` | **Phase 1A Radar Grok-first** — vGrok(CCR @ http://127.0.0.1:3456 → Grok 4.3) 호출, 마스터 템플릿 v3.0 기반 6-section 출처-인용 본문 생성, X/Twitter 실시간 정보 강점 활용 | `_workspace/grok/<run_id>/<topic-slug>.json` |
| `voidbrief-collector` | **Phase 1 Radar 폴백** — 날짜 범위 AI 뉴스 원천 수집 (Grok 실패 시 자동 활성화) | `01_collected_sources.json` |
| `voidbrief-threads-ingest` | **Phase 1B 봇 ingest** — threads-automation 봇의 source_archive.sqlite(read-only)+content_archive를 날짜필터해 collector 시드로 주입 | `01b_threads_ingest.json` |
| `voidbrief-source-verifier` | 공식성·링크·루머·중복 검증 | `02_verified_sources.json`, `02_risk_flags.json` |
| `voidbrief-normalizer` | 사이트 `Post`/AB 후보 스키마로 정규화 | `03_normalized_items.json` |
| `voidbrief-ranker` | 중요도·공식성·발표 적합도 랭킹 | `04_ranked_items.json` |
| `voidbrief-presentation-planner` | 메인 발표안 2~3개 추천 | `05_presentation_options.md` |
| `voidbrief-site-writer` | Weekly/AB TypeScript 데이터 작성 | `06_site_patch_report.md` |
| `voidbrief-copy-editor` | AI 티 제거·학생 친화 톤 정리 | `07_copy_review.md` |
| `voidbrief-script-writer` | 발표 대본과 진행 멘트 작성 | `08_script.md` |
| `voidbrief-obsidian-archivist` | 옵시디언 정본 노트/보조자료 저장 | `09_obsidian_manifest.json` |
| `voidbrief-qa-auditor` | 빌드·링크·데이터 shape·UI 문구 검증 | `10_qa_report.md` |
| `voidbrief-publisher` | 승인 후 GitHub/Vercel 배포 확인 | `11_publish_report.md` |

모든 Agent 호출은 `model: "opus"`를 명시한다.

## Phase 흐름

### Phase 0 — 컨텍스트 확인

1. `~/projects/voidnews-archive/CLAUDE.md`, `package.json`, `lib/data.ts`, `lib/weeks`, `lib/ab/data.ts`, `lib/ab/editions`를 읽는다.
2. 기존 `_workspace/ab/<run_id>`가 있으면 `RUN_MANIFEST.json`으로 완료 phase를 확인한다.
3. `plan/status` 모드는 사이트와 옵시디언을 수정하지 않는다.
4. Next.js 16 프로젝트이므로, 코드 수정 전 프로젝트 CLAUDE.md의 Next.js 규칙을 확인한다.

### Phase 1A — vGrok Radar (Grok-first hook)

**모든 신규 토픽 수집의 첫 단계는 vGrok이다.** `voidbrief-grok-fetcher` 에이전트가 `scripts/vgrok-fetch.mjs`를 통해 Claude Code Router(CCR @ `http://127.0.0.1:3456`)로 라우팅된 Grok 4.3을 호출한다. 마스터 템플릿 v3.0(스킬: `grok-template-v3`)을 그대로 사용하며, 6-section 출처-인용 본문을 생성한다.

호출 인터페이스:
```bash
node scripts/vgrok-fetch.mjs \
  --topic "<주제>" \
  --style 1 --lang ko \
  --compare "<경쟁 제품>" \
  --emphasis "<강조 포인트>" \
  --date "$(date +%F)" \
  --out _workspace/grok/<run_id>/<topic-slug>.json
```

각 호출 결과는 `_workspace/grok/<run_id>/<topic-slug>.json`에 보존하고, `RUN_MANIFEST.json.grok`에 `usedGrok`, `successCount`, `fallbackCount`, `failures[]`를 누적한다.

**폴백 트리거 (exit 1 또는 ok=false):**

| 트리거 | 의미 | 동작 |
|---|---|---|
| `ccr-health-failed` | localhost:3456 응답 없음 | 즉시 Phase 1 collector로 폴백 |
| `vgrok-call-failed:<err>` | CCR 4xx/5xx, timeout, 네트워크 오류 | 즉시 Phase 1 collector로 폴백 |
| `insufficient-citations` | inline 인용/URL 모두 4개 미만 | 해당 토픽만 collector로 폴백 |
| `low-verification-ratio` | 실재 URL 비율 < 50% (strict 모드만) | 해당 토픽만 collector로 폴백 |

폴백이 발생해도 vGrok이 만든 부분 본문은 `_workspace/grok/<run_id>/<topic-slug>.json`에 그대로 보존하여 verifier가 교차 검증 자료로 사용할 수 있게 한다.

**한국 청자 가중치 (Phase 1A 필수 주입):** 모든 vGrok 호출 프롬프트에 `한국 청자 가중치: 한국 기업/매체/사용자 관점이 의미 있으면 별도 항목으로 다룰 것` 줄을 항상 포함한다. 누락 시 grok-fetcher가 자동 거부한다.

### Phase 1 — 수집 팬아웃 (폴백 + 보강)

Phase 1A vGrok이 ok=true로 반환한 토픽은 collector가 검증·보강 모드로만 진행한다(공식 URL 추가, 한국어 매체 매핑, TestingCatalog radar 매칭). Phase 1A가 폴백을 트리거한 토픽은 collector가 단독 수집한다.

`voidbrief-collector`를 병렬 수집자로 실행한다. 기본 수집축:
- TestingCatalog는 날짜 범위 수집의 선행 RAG/radar 단계로 먼저 훑는다. 각 글에서 연결된 공식 사이트, 공식 X/Twitter, GitHub, docs/changelog 링크를 추출해 `extractedOfficialUrls`와 `extractedOfficialXUrls`로 보존하고, TestingCatalog URL 자체는 `discoveredVia` 또는 `backupUrls`로만 둔다.
- OpenAI, Anthropic, Google DeepMind, xAI, Meta, Microsoft/GitHub, Perplexity, DeepSeek 등 공식 블로그·문서·X·YouTube
- `references/official-source-matrix.md`의 publisher별 필수 공식 출처. Anthropic은 Claude Code changelog, Claude Platform release notes, Anthropic Research, 공식 X/YouTube를 제품 네임스페이스별로 분리해 확인한다.
- Hacker News, Simon Willison, The Decoder 등 2차 참고는 radar/discovery 신호로만 사용하고, 공식 원문을 찾으면 backup URL로 낮춘다.
- **큐레이터 채널(상시 들름):** `references/curator-channels.json`의 YouTube 9 + X 7 + web 1 채널을 매 run 무조건 훑는다(`references/collector-seeds.md`의 "큐레이터 채널" 섹션). **discovery-only** — 큐레이터에서 발견한 사건은 반드시 공식 1차 출처로 승격해 가져오고, 큐레이터 링크는 `discoveredVia: "curator-youtube"|"curator-x"|"curator-web"`로만 보존(출처/backup 금지). 공식 1차 출처를 못 찾으면 `needs_review:true`+risk flag.
- collector는 `01_curator_coverage.json`을 **스키마 v2**로 기록한다. 최상위는 `schemaVersion: 2`, `dateRange: {start, end}`, `coverage[]`이고, YouTube 채널 행은 창 안 업로드 전수를 `videos[]`에 `{videoId, title, published, decision}`으로 남긴다. `decision`은 정확히 `promoted` 또는 비어 있지 않은 사유가 붙은 `skipped:<사유>`여야 한다. 창 안 영상 하나라도 결정 기록이 없으면 수집 완료가 아니다.
- **게이트 3종(HARD), 절대경로로 호출:** ① 레지스트리 무결성 `bash ~/.claude/skills/voidnews-briefing-pipeline/references/verify_curator_channels.sh` exit 0 ② 방문 커버리지 `bash ~/.claude/skills/voidnews-briefing-pipeline/references/check_curator_coverage.sh <run>/01_curator_coverage.json` exit 0 ③ 영상 전수 결정 커버리지 `bash ~/.claude/skills/voidnews-briefing-pipeline/references/check_video_coverage.sh --start <YYYY-MM-DD> --end <YYYY-MM-DD> --coverage <run>/01_curator_coverage.json` exit 0. 어느 하나라도 실패하면 conductor 폐루프가 collector를 재호출한다.
- 사용자가 준 URL/텍스트/이미지는 수집 후보의 최우선 입력으로 보존

출력은 `01_collected_sources.json`과 `01_official_source_matrix_check.json`이다. 각 항목은 날짜, 제목, 원문 URL, 출처 유형, 제품 네임스페이스, 요약, 원문 excerpt, 수집 신뢰도, discovery 경로, 추출된 공식 후보 URL을 포함한다.

### Phase 1B — threads 봇 데이터 ingest (정식 경로)

**봇이 상시 모은 데이터를 매 run에 자동 합류시킨다.** `voidbrief-threads-ingest`가 `~/threads-automation/data/threads/source_archive.sqlite`(read-only)와 `content_archive.json`을 run 날짜 범위로 필터해 collector 후보 시드(`01b_threads_ingest.json`)를 만든다. 이 단계가 없으면 봇이 모은 한국·실시간 소스가 사람이 안 챙기면 누락된다(FAILURE_LOG VN008).

- official/공식 도메인 → 본후보 승격. rumor/youtube 반응 → 공식 이벤트의 `backupUrls`·coverage로 연결(별도 카드 금지, `product-identity-dedupe` 적용). HN/Reddit/digest → community-radar 집계만.
- 모든 seed에 `discoveredVia: "threads-archive"` 태깅 → provenance 추적(check-collection-provenance 정합).
- 원본 sqlite write 금지, chatId/authorId/토큰 등 비밀값 출력 금지.

### Phase 2 — 출처 검증

`voidbrief-source-verifier`가 공식 출처 우선순위를 부여한다. TestingCatalog에서 추출한 공식 사이트·공식 X·GitHub·docs/changelog 후보를 먼저 검증하고, 검증된 공식 URL이 있으면 TestingCatalog와 다른 2차 출처는 `backupUrls`로 낮춘다. 공식 출처가 없거나 루머·삭제·비공식 주장·날짜 범위 밖 항목이면 본문 카드로 승격하지 않고 risk flag로 보낸다.

**vGrok 본문 100% 재검증:** Phase 1A에서 ok=true로 들어온 vGrok 본문도 verifier가 모든 인용 URL을 다시 검증한다. vGrok이 "verified"라고 표시한 URL이라도 verifier는 독립적으로 HTTP status, 도메인 매칭, 날짜 일치, claim ↔ 근거 연결을 확인한다. vGrok 본문은 검증되기 전까지 어떤 사이트/옵시디언 산출물에도 직접 인용하지 않는다.

중복 검수는 `references/product-identity-dedupe.md`를 따른다. 키워드가 같아도 publisher, product namespace, official event id가 다르면 별도 사건이다. 예: OpenAI Codex `/goal`과 Claude Code `/goal`은 중복 병합 금지, `agent-goal-loop` 트렌드 클러스터로만 연결한다.

### Phase 3 — 정규화와 RAG식 인덱싱

`voidbrief-normalizer`가 `Post`, `ABHighlight`, `ABEditorPick` 후보로 변환한다. 이 하네스의 RAG는 벡터 검색만이 아니라 source ledger + normalized card + weekly/edition index 구조다.

점수 산식은 `references/scoring.md`를 따른다. 원문 본문을 임의로 과장하지 말고, 모든 판단 근거를 source id로 연결한다.

### Phase 4 — 랭킹과 발표안 추천

`voidbrief-ranker`가 중요도·발표 적합도·학생 이해도·실전 적용도를 기준으로 Top 후보를 만든다. `voidbrief-presentation-planner`는 2~3개 메인 발표안을 제안한다.

사이트 아카이브와 발표 후보를 분리한다. 공식 changelog/release note 기반 업데이트는 발표용 점수가 낮아도 Weekly normal 후보에 남긴다. 발표안은 올라간 정보 중에서 고르는 별도 단계이며, 아카이브 후보를 발표 적합도만으로 삭제하지 않는다.

**Gate 1 — 발표안 협의:**
사이트/옵시디언 작성 전, 사용자에게 발표안 옵션과 추천안을 보여주고 승인을 받는다. 사용자가 수정하면 Phase 4만 재실행한다.

### Phase 4.5 — HTML 발표 보고서 자동 생성 (랭킹 직후, 항상)

**랭킹(`04_ranked_items.json`)이 나오면 채팅 산문으로 보고하지 말고 곧바로 HTML 보고서를 생성한다.** 사용자 고정 요구(2026-07-07): AB 결과물은 채팅이 아니라 정리된 HTML로 본다. 재사용 생성기를 호출한다:

```bash
python3 ~/.claude/skills/voidnews-briefing-pipeline/scripts/gen_ab_report.py \
  --run ~/projects/voidnews-archive/_workspace/ab/<run_id> --edition <edition>
# 캐논 경로 출력: ~/projects/voidnews-reports/<edition>/index.html
# ★ HARD 게이트 — 이 exit 0 전에는 run을 완료로 보고하지 않는다:
bash ~/.claude/skills/voidnews-briefing-pipeline/gates/verify_ab_report.sh <edition>; echo "EXIT=$?"
open ~/projects/voidnews-reports/<edition>/index.html
```

- **캐논 저장 경로:** `~/projects/voidnews-reports/<edition>/index.html` (기본 경로, 자동 저장·누적). `_workspace`가 아니라 여기다.
- **섹션(고정 규격, `feedback_ab_curation_rubric`):** ① 발표 Top10(메인5+보강5) ② 화제(바이럴) 순위(buzz 렌즈 내림차순) ③ 전체 순위(raw 점수 desc, Top10 픽 ★, 🔥 buzz) ④ 주차별 ⑤ research-radar ⑥ 부록(수집 방식·채널).
- **디자인:** 따뜻한 종이+테라코타 단일 강조, 자체완결 단일 HTML, 세로줄 금지 게이트 exit0 필수.
- 생성기는 03/04 JSON만 읽으므로 어떤 run/edition에도 재사용된다(구·신 스키마·buzz 유무 자동 처리).

**HARD 게이트 `gates/verify_ab_report.sh <edition>` (fail-closed, exit 2=차단).** R1 보고서 존재 · R2 자체완결 · R3 5섹션(발표 Top10/바이럴/전체 순위/주차별/radar) · R4 비어있지 않음 · R5 세로줄 exit0. **AB run은 이 게이트 exit 0 없이는 완료로 보고 금지.** 채팅 산문만 내고 HTML을 안 만드는 것은 규격 위반이다(VN 실패 사례 — FAILURE_LOG 참조). 실패 시 FAIL[verify_ab_report:Rn] 토큰 파싱 → gen 재실행 → re-gate(≤3회).

### Phase 5 — 사이트 데이터 작성

승인 후 `voidbrief-site-writer`가 실제 파일을 수정한다.
- Weekly: `lib/weeks/<YYYY-wNN>.ts`
- AB edition: `lib/ab/editions/<YYYY-MMx>.ts`
- 필요 시 `lib/data.ts`, `lib/ab/data.ts` 등록
- 이미지가 있으면 `public/ab/<edition>/...` 아래에 배치 제안 또는 기존 경로 연결

기존 `Post` 필드 의미를 바꾸지 않는다. `officialUrl`, `source`, `backupUrls`, `featured`, `images`, `thumbnail`, `tags`를 일관되게 채운다.

**필수 카드 필드 (publish-ready 게이트):**
- `en` — **영문판 (2026-w29부터 HARD 필수)**. 모든 Weekly post에 `en: { title, deck, summary, content }`를 함께 작성한다(`en.title`+`en.summary` 필수, ko에 `deck`/`content`가 있으면 `en.deck`/`en.content`도 필수 — 필드 패리티). 한국어 원문과 사실 동일 — 번역이지 재작성이 아니다. `scripts/check-i18n-coverage.mjs`(BUILD_GATES)가 w29+ 주차에서 en.title/en.summary 누락 시 exit 2로 **빌드 자체를 차단**하므로, 산문 준수가 아니라 게이트가 강제한다. 사이트 렌더는 `lib/i18n.ts displayPost`가 소비.
- `deck` — title 밑 1줄 sub-headline (50자 내외). normalizer 단계에서 summary 첫 구절을 자동 추출하거나 vGrok 본문에서 추출. 비어 있으면 qa-auditor가 fail.
- `thumbnail` — 카드 grid 노출용 OG 이미지. site-writer가 파일 작성 직후 다음 명령을 **자동 실행**한다.
  ```bash
  node scripts/inject-thumbnails.mjs --only ab   # 또는 --only weeks
  ```
  이 스크립트는 `public/og-cache/_manifest.json` URL 인덱스로 1차 매칭 → 실패 시 OG fetch + 다운로드 + 캐시 등록 → 그래도 실패 시 `_workspace/thumbnails/fallback-map.json`의 도메인 매핑 (bot-차단 도메인용) → 모두 실패하면 `_workspace/thumbnails/missing.json`에 기록한다.
- 카드의 enclosing brace 직전 라인에 콤마가 빠져 있으면 injector가 자동 추가한다 (JS object literal 안전).

### Phase 6 — 카피·대본·옵시디언

`voidbrief-copy-editor`는 공개 사이트 문구에서 내부 지시문과 AI 티를 제거한다. 금지 예시는 `references/contracts.md`를 따른다.

`voidbrief-script-writer`는 겸손하지만 전문적인 발표 대본을 만들고, `voidbrief-obsidian-archivist`는 신규 노트만 생성한다. 암흑물질 볼트의 `## 목차`는 반드시 `[[#헤딩|별칭]]` 위키링크 형식이다.

### Phase 7 — QA

`voidbrief-qa-auditor`가 다음을 확인한다.
- `npm --prefix ~/projects/voidnews-archive run build` (prebuild에서 `check-slugs` + `check-regressions`가 자동 실행 → 과거 회귀/금지어/내부메모 재발 시 빌드 자체가 exit 1)
- **publish-ready 판정은 산문이 아니라 게이트 스크립트의 종료코드로만 한다 (SOFT 금지):**
  ```bash
  node ~/projects/voidnews-archive/scripts/verify-publish-ready.mjs --scope <ab|weeks|all>
  ```
  - exit 0 → publish-ready=true. exit 2 → 썸네일 미해결(missing.json) 또는 broken thumbnail src 존재 → publish 차단. exit 3 → (--strict) deck 부족.
  - 이 스크립트가 `_workspace/thumbnails/missing.json` 비어있음 + 모든 `thumbnail.src` 로컬 파일 실존을 강제한다. 에이전트가 "thumbnail 있다"고 자기보고로 통과시키지 않는다.
- Weekly/AB/presentation route 데이터 shape
- 공식 링크와 백업 링크 존재
- **deck 필드** — title 밑 1줄 sub-headline. 커버리지는 verify-publish-ready.mjs가 리포트하며, 신규 edition은 `--strict`로 100% 요구한다.
- `01_official_source_matrix_check.json` 기준 필수 공식 출처 확인 완료
- `product-identity-dedupe` 기준 제품명 혼동·잘못된 중복 병합 없음
- AI 티 금지 문구 부재
- 내부 큐레이션 메모 노출 부재 (예: "Tier S+A 후보 풀", "사용자가 top10 선정 후", "후보 풀")
- Next.js 16 route 규칙 위반 없음
- 브라우저 확인이 필요한 UI 변경은 dev server와 실제 페이지 확인

### Phase 8 — 배포

`publish` 또는 사용자 명시 승인 후에만 `voidbrief-publisher`가 진행한다. **push 직전 HARD 게이트 2개를 통과해야 한다:**
```bash
npm --prefix ~/projects/voidnews-archive run build            # prebuild: check-slugs + check-regressions
node ~/projects/voidnews-archive/scripts/verify-publish-ready.mjs --scope all
```
둘 중 하나라도 exit≠0이면 push/Vercel 배포를 진행하지 않는다(코드 차단). 외부 배포는 반드시 사용자 승인 게이트도 통과해야 한다.

## consolidate 모드 — cross-run 통합 마스터 인덱스

여러 run에 흩어진 산출물 + published 주간/edition 아카이브 + threads 봇 데이터를 **하나의 중복제거 마스터**로 합친다. run 격리로 인한 중복·누락을 해소하는 모드.

```bash
node ~/projects/voidnews-archive/scripts/consolidate-runs.mjs --start <YYYY-MM-DD> --end <YYYY-MM-DD> [--run <run_id>]
```

결정론 파이프라인(`scripts/consolidate/`):
1. `extract_ts.mjs` — published 주간/edition 카드 추출 (TS object literal eval, 따옴표/무따옴표 키 혼합 처리).
2. `extract_collected.py` — AB run JSON + **threads sqlite/content_archive** 정규화 추출 (Phase 1B와 동일 ingest).
3. `dedupe.py` — canonical URL + 제품정체성 + 샤프엔티티·날짜 매칭. 봇 영상/루머를 공식 이벤트로 흡수, 봇 단독은 토픽/잡음 분류. **무손실**(드롭 없음).
4. `render_list.py` — `CONSOLIDATED_LIST.md`(publisher별 그룹, provenance 뱃지, 봇 출처 표시) + 동일 officialUrl 중복 0 자체검증.
5. HARD 게이트: `verify-no-duplicates.mjs`(신규 중복 exit 2) + `check-date-coverage.mjs`(tail-window 공백 exit 2).

산출: `_workspace/ab/<run_id>/CONSOLIDATED_MASTER.json`(spine_events + bot_only_topical + bot_only_noise_radar + counts) + `CONSOLIDATED_LIST.md`. 사이트/옵시디언은 수정하지 않는다(승인 후 별도 `new`/`publish`).

봇 데이터는 ① 이벤트 흡수 ② 봇 단독 토픽 ③ 레이더 잡음 으로 100% 반영하며, 손실 없음을 `counts`로 검증한다(REQUIREMENTS R6).

## 데이터 전달 규칙

- 모든 phase 산출물은 `_workspace/ab/<run_id>/`에 저장한다.
- 각 JSON 항목은 안정적인 `id`를 가진다: `<source>-<YYYYMMDD>-<slug>`.
- 판단 근거는 `sourceIds` 배열로 연결한다.
- 상충 정보는 삭제하지 않고 `conflicts`에 남긴다.
- 실패한 링크·미검증 루머는 본문 카드로 승격하지 않는다.

## 에러 핸들링

- 수집 실패: 실패 URL과 이유를 `failures.jsonl`에 기록하고 나머지로 진행한다.
- 공식 출처 부재: item은 `needs_review: true`로 두고 메인 발표 후보에서 감점한다.
- 빌드 실패: 배포 중단, `10_qa_report.md`에 원인과 수정 대상 파일을 기록한다.
- 사용자 승인 전 사이트/옵시디언 본문 수정이 발생했으면 즉시 보고하고 변경을 되돌릴지 확인한다.

## 기억 — 실패→규칙 자동 승격 (회귀 방지)

QA나 사용자가 **새 결함**(내부메모 노출, AI 티, 잘못된 slug, broken 이미지 등)을 발견하면 고치고 끝내지 않는다:
1. **`~/projects/voidnews-archive/references/FAILURE_LOG.md`** (site repo, 스킬 디렉토리 아님)에 `### VN0NN` 항목을 추가(증상·원인·담당 에이전트).
2. 머신 검사 가능하면 **`~/projects/voidnews-archive/references/regressions.json`**에 `grep_absent`/`grep_present_min` 체크를 추가한다. 새 게이트를 추가했으면 그 게이트가 배선에서 빠지지 않게 `grep_present_min` 메타가드도 같이 건다(VN005~VN008 예시).
3. `prebuild`가 **`run-all-gates.mjs`**(check-slugs + check-regressions + check-card-content + verify-no-duplicates)를 매 빌드 실행하므로, 다음 실행부터 사람 기억 없이 자동 재검사된다(기억=다음 실행의 조건). 신규 `scripts/check-*.mjs`/`verify-*.mjs`는 run-all-gates가 glob으로 자동 발견한다(배선 누락 방지).
4. 단순 누락(coverage)은 `verify-publish-ready.mjs`가 publish 시, 날짜 공백은 `check-date-coverage.mjs`가 consolidate/run 시 강제한다.

요구사항 정본은 `~/projects/voidnews-archive/references/REQUIREMENTS.md`(VN-R1~R8). 각 R항목이 위 게이트 중 하나에 매핑된다.

## 개선 이력 자동 로그 (Improvement Ledger)

**voidnews 관련 사용자 지시·개선·수정은 매 run 자동으로 `docs/improvements.ledger.json`에 기록한다.** 목적: 다음 세션이 "전에 말한 개선이 실제로 적용됐는지"를 산문이 아니라 evidence 종료코드로 확인할 수 있게 함.

- 새 run이 사용자 지시로 사이트/데이터를 바꾸면 conductor가 완료 직전 한 줄 append:
  ```bash
  node ~/projects/voidnews-archive/scripts/ledger.mjs add \
    --source ab-run --category ab-data --status applied \
    --request "<사용자 지시 요약>" --files "<바뀐 파일>" --commit "<sha 또는 HEAD>" \
    --evidence-count "<grep/파일존재 실측 커맨드>" --op eq --value 0 --notes "<run_id>"
  node ~/projects/voidnews-archive/scripts/ledger.mjs render   # docs/IMPROVEMENTS.md 갱신
  ```
- `status: applied|verified` 항목은 `evidence`(grep count 또는 exit0)를 **반드시** 달아야 한다. `scripts/verify-improvements.mjs`가 `run-all-gates`(prebuild)에 배선돼 매 빌드 실측 → 개선이 되돌려지면 build가 exit≠0으로 막는다(자기강제). 아직 안 한 개선은 `status: pending` + `evidence:{kind:"manual"}`.
- MD(`docs/IMPROVEMENTS.md`)는 JSON SSoT에서 `render`로만 생성 — 직접 수정 금지(drift 방지).
- 이 ledger는 FAILURE_LOG(결함→회귀가드)와 상보적이다: FAILURE_LOG는 "재발 금지", ledger는 "요청→적용 추적".

## 회복 — 게이트 실패 자동 재시도 폐루프

게이트가 exit≠0을 내면 사람이 다시 부를 때까지 멈추지 않는다. conductor가 다음 루프를 돈다(최대 3회):

1. 실패 게이트의 stderr에서 `FAIL[<gate>]`/exit code와 위반 항목을 파싱한다.
2. 해당 게이트의 담당 에이전트(REQUIREMENTS 표의 owner)에게 위반 항목만 전달해 자동 반송한다.
3. 담당이 수정하면 같은 게이트를 **재실행(re-gate)**한다.
4. 3회 안에 통과하면 진행, 못 통과하면 `10_qa_report.md`에 미해결로 남기고 사용자에게 보고한다(여기서만 사람 개입).

이 폐루프가 없으면 자동화 레벨이 L5(감독)에 묶인다. 폐루프 적용 시 L6.

## 테스트 시나리오

정상 흐름:
```text
/AB plan 2026-05-01 2026-05-14 VOL.04
```
수집·검증·랭킹 후 `05_presentation_options.md`까지 생성하고 사이트 파일은 수정하지 않는다.

전체 흐름:
```text
/AB new 2026-05-01 2026-05-14 VOL.04
```
발표안 승인 후 Weekly/AB 데이터, 옵시디언 대본, QA 리포트까지 만든다.

부분 재실행:
```text
/AB resume 20260514-213000-ab-20260501-20260514
```
`RUN_MANIFEST.json`을 읽고 실패·미완료 phase만 재실행한다.

near-miss:
- 단일 YouTube 링크로 카드 한 장 생성 → 기존 `voidnews-pipeline` 사용
- Threads 게시글 작성/발행 → `threads-swarm-pipeline` 사용
- 옵시디언 볼트 리뉴얼 → `vault-renewal-pipeline` 사용
