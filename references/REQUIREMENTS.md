# VoidNews AB Harness — REQUIREMENTS (SSoT)

이 파일이 `/AB` 하네스(`voidnews-briefing-pipeline`)의 **단일 진실 계약**이다. SKILL.md는 실행 절차, 이 파일은 "무엇을 반드시 만족해야 하는가"의 번호 계약. 각 요구는 가능한 한 코드 게이트(exit code)에 매핑한다. 산문으로만 적힌 항목(SOFT)은 그렇게 명시한다.

판정 규칙: **선언≠증거.** SOFT 항목도 완료 보고 시 실측(grep/exit/파일 존재)을 첨부한다.

## R1 — 수집 (Collection)

| ID | 요구 | 검증 | 담당 |
|---|---|---|---|
| R1.1 | 날짜 범위 내 공식 출처 우선 수집 | `01_collected_sources.json` 존재 + official 비율 | voidbrief-collector |
| R1.2 | Phase 1A vGrok Grok-first 선행, 실패 시 collector 폴백 | RUN_MANIFEST.grok | voidbrief-grok-fetcher |
| R1.3 | TestingCatalog radar 선행 + 공식 URL 추출 | `01_official_source_matrix_check.json` | voidbrief-collector |
| R1.4 | **threads 봇 데이터(source_archive.sqlite/content_archive.json) 정식 ingest** | `01b_threads_ingest.json` 존재, seed에 `discoveredVia:threads-archive` | **voidbrief-threads-ingest (Phase 1B)** |
| R1.5 | 수집 출처 provenance 증거 필수 | `check-collection-provenance.mjs` exit 0 (HARD) · regressions VN005 | voidbrief-qa-auditor |

## R2 — 검증·중복 (Verification & Dedupe)

| ID | 요구 | 검증 | 담당 |
|---|---|---|---|
| R2.1 | 모든 인용 URL HTTP/도메인/날짜 독립 재검증 (vGrok 본문 포함) | `02_verified_sources.json` | voidbrief-source-verifier |
| R2.2 | 제품정체성 기준 중복 병합 (publisher/namespace/officialEventId) | `references/product-identity-dedupe.md` | voidbrief-source-verifier |
| R2.3 | **동일 officialUrl 카드 중복 0 (신규)** | `verify-no-duplicates.mjs` exit 2 on new dup (HARD) · baseline=legacy | voidbrief-site-writer |
| R2.4 | 루머·삭제·날짜 밖 항목은 본문 카드 미승격 | `02_risk_flags.json` | voidbrief-source-verifier |

## R3 — 커버리지 (Coverage)

| ID | 요구 | 검증 | 담당 |
|---|---|---|---|
| R3.1 | 요구 날짜 범위 종료일 직전 공백 차단 (tail-window) | `check-date-coverage.mjs` exit 2 (HARD) | voidbrief-conductor |
| R3.2 | 내부 interior 공백(연속 N일) 감지 | `check-date-coverage.mjs --max-interior-gap` | voidbrief-conductor |
| R3.3 | 필수 publisher 매트릭스 충족 | `01_official_source_matrix_check.json` | voidbrief-collector |
| R3.4 | **큐레이터 16채널 전수 방문(discovery-only) + 발견사건 공식 1차 출처 승격** | `check_curator_coverage.sh <run>/01_curator_coverage.json` exit 2 (HARD, Phase1 직후) · 레지스트리 무결성 `verify_curator_channels.sh` exit 1 | voidbrief-collector |

## R4 — 사이트 산출 (Site Output)

| ID | 요구 | 검증 | 담당 |
|---|---|---|---|
| R4.1 | ASCII slug만 (정적 라우트 404 방지) | `check-slugs.mjs` exit 1 (HARD, prebuild) · VN002 | voidbrief-site-writer |
| R4.2 | deck 필드 커버리지 (신규 edition 100%) | `verify-publish-ready.mjs --strict` exit 3 | voidbrief-site-writer |
| R4.3 | thumbnail 로컬 실존 + missing.json 비어있음 | `verify-publish-ready.mjs` exit 2 (HARD) · VN003 | voidbrief-site-writer |
| R4.4 | 카드 본문 마크다운 raw 노출 금지 | `check-card-content.mjs`(prebuild)+`check-render-leaks.mjs`(postbuild) exit 1 · VN-RENDER-LEAK | renderer |

## R5 — 카피·톤 (Copy & Tone)

| ID | 요구 | 검증 | 담당 |
|---|---|---|---|
| R5.1 | 내부 큐레이션 메모 노출 금지 | `regressions.json` VN001 (grep_absent, HARD) | voidbrief-copy-editor |
| R5.2 | AI 티 자기지칭 문구 금지 | `regressions.json` VN004 (HARD) | voidbrief-copy-editor |

## R6 — 통합 (Consolidate · 신규)

| ID | 요구 | 검증 | 담당 |
|---|---|---|---|
| R6.1 | 전 run + published + 봇 데이터를 단일 마스터로 통합 | `_workspace/ab/<run>/CONSOLIDATED_MASTER.json` | consolidate-runs.mjs |
| R6.2 | 봇 데이터 100% 반영 (흡수/단독/잡음 분류, 손실 0) | master.counts 봇 카운트 합 = 입력 봇 건수 | consolidate-runs.mjs |
| R6.3 | 결과 중복 없음 자체검증 | `render_list.py` dup violations=0 + R2.3 게이트 | consolidate-runs.mjs |

## R7 — 회복·기억 (Recovery & Memory)

| ID | 요구 | 검증 | 담당 |
|---|---|---|---|
| R7.1 | resume로 누락 phase만 재실행 | RUN_MANIFEST 기반 | voidbrief-conductor |
| R7.2 | **게이트 실패 시 자동 재시도 폐루프 (FAIL[gate]→담당 반송→re-gate ≤3)** | conductor 루프 토큰 | voidbrief-conductor |
| R7.3 | 신규 결함 → FAILURE_LOG + regressions 자동 승격 | `references/FAILURE_LOG.md` + `references/regressions.json` (site repo) | voidbrief-qa-auditor |

## R8 — 배포 안전 (Publish Safety)

| ID | 요구 | 검증 | 담당 |
|---|---|---|---|
| R8.1 | push 전 build + verify-publish-ready exit 0 | Phase 8 HARD 게이트 2종 | voidbrief-publisher |
| R8.2 | 외부 push/배포는 사용자 명시 승인 후만 | 승인 게이트 + qa-publish-gate 훅 | voidbrief-publisher |

---

## 게이트 인덱스 (run-all-gates.mjs가 자동 발견)

| 스크립트 | 성격 | 시점 | exit |
|---|---|---|---|
| `check-slugs.mjs` | HARD | prebuild | 1 |
| `check-regressions.mjs` | HARD | prebuild | 1 |
| `check-card-content.mjs` | HARD | prebuild | 1 |
| `verify-no-duplicates.mjs` | HARD | prebuild | 2 (신규 dup) |
| `check-render-leaks.mjs` | HARD | postbuild | 1 |
| `verify-publish-ready.mjs` | HARD | publish | 2/3 |
| `check-collection-provenance.mjs` | HARD | 수집 후/run | 1 |
| `check-date-coverage.mjs` | HARD | consolidate/run | 2 |
| `check_curator_coverage.sh` | HARD | 수집 직후(Phase1) | 2 |
| `verify_curator_channels.sh` | HARD | 레지스트리 변경 시 | 1 |

신규 `scripts/check-*.mjs` / `verify-*.mjs`는 `run-all-gates.mjs`가 glob으로 자동 합류시킨다(하드코딩 배선 누락 방지, 확장성 축).
**큐레이터 게이트 2종(`.sh`)은 사이트 빌드가 아니라 run phase용**이라 `run-all-gates`(빌드 prebuild) 자동발견 대상이 아니다. 위치는 `~/.claude/skills/voidnews-briefing-pipeline/references/`, conductor가 Phase1 직후 직접 호출한다(R3.4·conductor 폐루프).
