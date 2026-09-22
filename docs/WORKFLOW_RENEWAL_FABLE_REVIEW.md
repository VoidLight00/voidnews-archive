# VoidNews 워크플로우 리뉴얼 독립 검토

## 검토자·범위

- 요청 모델: **Fable**
- 실제 실행 모델: **telemetry 확인 불가(미확인)**. 이 문서는 독립 모델 신원을 스스로 증명하지 않습니다.
- 타 모델 fallback: 사용하지 않았습니다.
- 검토 범위: 변경 전 백업과 현재 로컬 하네스 구현, 관련 fixture·게이트. 기획문서의 자기보고는 탐색 포인터로만 사용했습니다.
- 독립 rubric은 소스 본문을 읽기 전에 `_workspace/workflow-renewal-fable-review/FROZEN_RUBRIC.md`에 고정했습니다.
- deterministic baseline benchmark 파일은 기다리거나 읽지 않았습니다.
- 실제 LLM 비용, 브라우저 성능, 사이트 UX, 운영 API 호출은 측정하지 않았습니다.

## 결론

리뉴얼은 **명백한 로컬 개선**입니다. 200개 seed 절단 제거, raw 응답 보존, usage의 unknown/null 구분, 감사 원장과 모델 projection 분리, 편집 파일 결속은 변경 전보다 낫습니다. 다만 현재 상태를 운영 적용 준비 완료로 보기는 어렵습니다. 핵심 이유는 새 slim projection이 실제 verifier 소비자에 연결되지 않았고, 편집 최신성 검사가 opt-in이며, curator 경로 배정과 HTML evidence 추출에 독립 반례가 확인됐기 때문입니다.

## 모델 평가 점수

이 점수는 테스트 통과율이 아니라 고정 rubric에 따른 모델 평가입니다.

| 평가축 | 변경 전 | 현재 | Delta |
|---|---:|---:|---:|
| 로컬 워크플로우 구현 품질 | 43/100 | 71/100 | +28 |
| 운영 적용 준비도 | 36/100 | 55/100 | +19 |

### 로컬 워크플로우 구현 품질 상세

| 차원 | 배점 | 변경 전 | 현재 | 판단 |
|---|---:|---:|---:|---|
| 정확성·계약 준수 | 20 | 9 | 14 | seed 무손실·hash 결속은 개선됐지만 curator 경로 기반 배정이 구현되지 않았습니다. |
| 정보 보존·추적 가능성 | 15 | 5 | 11 | raw bytes와 감사 원장이 추가됐지만 nested hidden HTML에서 숨김 텍스트가 evidence로 누출됩니다. |
| 비용 효율 설계 | 15 | 6 | 10 | 반복 seed 전달은 줄었으나 미배정 seed가 단일 seed-review에 집중되고 실제 토큰 절감은 미측정입니다. |
| 검증·반례 내성 | 20 | 9 | 14 | 기존 selftest는 통과하지만 독립 반례 4개 중 3개가 실패했습니다. |
| 실제 소비자 연결 | 15 | 7 | 7 | 새 projection 생성·검증은 있으나 실제 verifier 소비 코드 연결을 찾지 못했습니다. |
| 계측·관측 가능성 | 10 | 3 | 10 | provider usage 누락을 unknown/null로 보존하는 구현은 명확합니다. |
| 유지보수성·격리 | 5 | 4 | 5 | 오프라인 fixture와 작은 계약 함수로 분리돼 있습니다. |
| 합계 | 100 | **43** | **71** | **+28** |

### 운영 적용 준비도 상세

| 차원 | 배점 | 변경 전 | 현재 | 판단 |
|---|---:|---:|---:|---|
| end-to-end 운영 경로 완결성 | 20 | 8 | 10 | 생성 경로는 늘었지만 신규 projection·receipt의 실제 운영 소비가 닫히지 않았습니다. |
| 안전한 기본값·opt-in 경계 | 15 | 7 | 8 | compact는 opt-in이라 안전하나 editorial binding도 opt-in이라 파일이 둘 다 없으면 우회됩니다. |
| 실패 처리·회복성 | 15 | 6 | 9 | fail-closed 검사와 hash stale 거절은 개선됐으나 seed-review 과부하를 제어하지 않습니다. |
| 운영 검증 신뢰도 | 15 | 7 | 10 | master selftest는 강해졌지만 실제 run의 새 소비 경로를 검증하지 않습니다. |
| 비용·용량 통제 | 15 | 6 | 9 | 호출 예산과 usage를 분리했지만 seed-review workload와 token budget은 제한하지 않습니다. |
| 관측·감사 가능성 | 10 | 2 | 8 | raw/hash/usage 상태는 개선됐으나 rendered evidence와 static raw의 관계가 충분히 강제되지 않습니다. |
| 배포·소비자 호환성 | 10 | 0 | 1 | 공개 데이터 불변은 확인됐지만 운영 소비자 전환·배포·브라우저는 미검증입니다. |
| 합계 | 100 | **36** | **55** | **+19** |

## 주요 근거와 감점

### 1. Seed 배정은 URL 도메인만 보고 curator 경로를 보지 않습니다 — 중요

- 현재 `seed_matches`는 `url`, `officialCandidateUrl`, domain allowlist, registry URL prefix만 검사합니다: `~/.claude/skills/voidnews-briefing-pipeline/scripts/plan_collection_lanes.py:13-26`.
- `discoveredVia` 또는 curator registry id를 기준으로 배정하지 않으므로 URL이 없는 curator seed는 `seed-review`로 갑니다: 같은 파일 `:29-48`.
- 독립 fixture에서 `discoveredVia: curator-a`인 URL 없는 seed가 `curator-web-01`이 아니라 `seed-review`로 배정돼 실패했습니다.
- 영향: seed-review 과부하, 잘못된 담당 lane, 모델 입력량 증가 가능성. 실제 비용 증가는 미측정입니다.
- 감점: 정확성 -4, 비용 효율 -3, 운영 용량 통제 -3.

### 2. HTML 원문은 보존되지만 evidence 추출기가 nested hidden tag에서 누출됩니다 — 중요

- raw bytes를 0600 파일로 보존하고 hash/byte count를 기록하는 구현은 좋은 개선입니다: `~/.claude/skills/voidnews-briefing-pipeline/scripts/collection_cache.py:52-64`, `:335-380`.
- 그러나 hidden stack 종료 로직이 `self.hidden[:self.hidden.index(tag)]`를 사용합니다: 같은 파일 `:30-36`. 동일 태그가 중첩되면 안쪽 종료에서 바깥 숨김 상태까지 제거합니다.
- 독립 fixture `<script>outer<script>inner</script>LEAK</script><article>fact</article>`에서 evidence가 `LEAK fact`가 됐습니다.
- 변경 전에는 HTML 전체 앞 12,000자를 evidence로 사용했으므로 더 나빴습니다(`_workspace/workflow-renewal-before/.../collection_cache.py:317-333`). 현재는 개선됐지만 “script/style/head 제외” 계약을 완전히 만족하지 않습니다.
- 영향: 모델 근거에 script 텍스트가 혼입될 수 있습니다. raw 원본 자체는 유실되지 않았습니다.
- 감점: 정보 보존·근거 정확성 -4, 검증 -2.

### 3. Usage unknown→0 문제는 제대로 해결됐습니다 — 강점

- 공급자 usage가 없으면 네 필드 모두 `null`, status=`unknown`입니다: `~/.claude/skills/voidnews-briefing-pipeline/scripts/routing_budget.py:29-38`.
- 0은 유효한 관측값으로 유지하고 bool/음수/실수/문자열은 거절합니다.
- 독립 fixture에서도 unknown이 0으로 변환되지 않는 것을 확인했습니다.
- 단, `vgrok-fetch.mjs`의 결과 usage가 `routing_budget.py finish --usage-json`으로 자동 전달되는 conductor 코드 경로는 확인하지 못했습니다. 계측 자료구조의 정확성과 운영 자동 연결은 별개입니다.

### 4. Slim projection은 생성·결속되지만 실제 소비자가 연결되지 않았습니다 — 중요

- `01_verifier_input.json`은 감사 원장의 hash와 함께 생성됩니다: `~/.claude/skills/voidnews-briefing-pipeline/scripts/merge_luna_shards.py:88-94`.
- projection 내용과 감사 원장 일치를 검증합니다: `~/.claude/skills/voidnews-briefing-pipeline/scripts/workflow_contract.py:16-22`.
- 그러나 관련 하네스에서 `01_verifier_input` 참조는 SKILL 설명, 생성기, 검증기, selftest뿐이었습니다. 실제 verifier 실행기가 이 파일을 입력으로 읽는 코드 근거는 찾지 못했습니다.
- SKILL에는 “verifier 기본 입력”이라고 적혀 있으나 산문 계약입니다: `~/.claude/skills/voidnews-briefing-pipeline/SKILL.md:364-370`.
- 따라서 바이트 감소 산출물은 존재하지만 운영 모델 입력 절감은 미입증입니다.
- 감점: 실제 소비자 연결 -8, 운영 완결성 -6, 배포 호환성 -4.

### 5. 편집 최신성 검사는 존재하지만 opt-in 우회가 가능합니다 — 중요

- receipt는 입력·결정·검사결과 hash와 실제 exit 0을 결속하며 stale 변경을 거절합니다: `~/.claude/skills/voidnews-briefing-pipeline/scripts/workflow_contract.py:25-64`, `:78-95`.
- 그러나 postrank 게이트는 decision 또는 receipt 파일이 존재할 때만 검사를 실행합니다: `~/.claude/skills/voidnews-briefing-pipeline/gates/verify_collection_routing.sh:69-75`.
- 둘 다 만들지 않으면 freshness 결속 없이 ranker identity만 검사합니다. 독립 정적 반례가 이 조건을 검출했습니다.
- 기획문서가 이를 “선택적”이라고 명시하므로 구현-문서 불일치는 아니지만, 운영 최신성 우회 위험은 남습니다.
- 감점: 안전 기본값 -4, 운영 검증 -2.

### 6. Compact 인용 기준은 기본과 동일하지만 의미적 품질은 미검증입니다

- compact prompt도 최소 4개 실제 인용을 요구합니다: `/Users/voidlight/projects/voidnews-archive/scripts/vgrok-fetch.mjs:52-55`.
- 기본·compact 모두 동일한 `MIN_CITATION_COUNT=4`와 동일 판정식을 사용합니다: 같은 파일 `:24-25`, `:287-305`.
- 따라서 “compact에서 기준을 낮춤”은 확인되지 않았습니다.
- 다만 판정은 `inline >= 4 OR absolute URL >= 4`입니다. 네 개 인용이 네 개 독립 주장/공식 출처를 의미하는지, compact 후보 형식이 후속 verifier에 충분한지는 API 미호출이라 미측정입니다.

### 7. 변경 전 대비 확인된 개선

- 200개 절단 제거: 변경 전 `compact_seeds(..., max_items=200)` 및 `rows[:max_items]` (`_workspace/workflow-renewal-before/.../plan_collection_lanes.py:38-41`) → 현재 전체 보존 (`~/.claude/skills/voidnews-briefing-pipeline/scripts/plan_collection_lanes.py:77-80`).
- 모든 seed를 모든 lane에 반복 전달하던 구조에서 배정 기반 job으로 변경: 현재 `assign_seeds` (`:29-48`).
- 정적 HTML 원문 바이트 보존과 본문 projection 분리: 현재 `collection_cache.py:43-64`, `:335-380`.
- usage 계측 추가: 현재 `routing_budget.py:29-38`, `:84-92`.
- 감사 원장과 모델 입력 분리·hash 결속: 현재 `merge_luna_shards.py:90-94`, `workflow_contract.py:16-22`.
- compact를 opt-in으로 제한하고 기본 6-section 경로 유지: `vgrok-fetch.mjs:40`, `:52-96`, `:154-159`.

## 객관 테스트 결과

객관 테스트 종료코드와 위 모델 점수는 서로 다른 지표입니다.

| 테스트 | Exit | 결과 |
|---|---:|---|
| 기존 routing master selftest | 0 | PASS. 기존 routing selftest + renewal unittest 실행 |
| 기존 Node compact fixture | 0 | PASS. API 호출 없음 |
| 독립 반례 suite | 1 | 4개 중 1 PASS, 3 FAIL |

독립 반례 상세:

1. `usage unknown is not zero` — PASS
2. `nested hidden HTML does not leak` — FAIL (`LEAK fact`)
3. `curator path-only seed assignment` — FAIL (`seed-review`로 잘못 배정)
4. `postrank binding is not optional` — FAIL (파일 부재 시 conditional bypass)

실행 파일과 로그:

- `_workspace/workflow-renewal-fable-review/independent_counterexamples.py`
- `_workspace/workflow-renewal-fable-review/counterexamples.log`
- `_workspace/workflow-renewal-fable-review/existing-selftest.log`
- `_workspace/workflow-renewal-fable-review/vgrok-test.log`

이 반례 suite는 현재 코드만 대상으로 했습니다. 변경 전·현재 코드를 같은 fixture로 실행한 deterministic baseline 결과라고 표현하지 않습니다.

## 미측정·미확인

- 실제 LLM input/output/cache token 및 비용
- compact 전후 실제 품질·지연·절감률
- 브라우저 렌더 성능과 사이트 UX
- 운영 API/CCR 호출 성공
- 실제 conductor가 provider usage를 finish에 자동 전달하는지
- 실제 verifier가 `01_verifier_input.json`을 기본 입력으로 소비하는지
- seed-review의 실제 건수·토큰·지연 상한
- Crawl4AI rendered evidence와 static raw snapshot을 운영 감사자가 올바르게 해석하는지
- 배포·운영 URL·모바일 화면

## 운영 적용 전 미해결 우선순위

1. **P0:** 실제 verifier invocation이 `01_verifier_input.json`을 소비하도록 코드 경로를 배선하고, audit detail lookup을 source id로 검증하는 end-to-end fixture가 필요합니다.
2. **P0:** HTML hidden stack을 올바른 LIFO 방식으로 처리하고 nested script/style/template 반례를 회귀 테스트에 추가해야 합니다.
3. **P1:** `discoveredVia`/registry id 기반 curator lane 배정 규칙을 구현하고 seed-review의 최대 건수·분할 정책을 둬야 합니다.
4. **P1:** editorial decision을 사용하는 운영 모드에서는 receipt 부재를 postrank HARD 실패로 만들거나, 적용 대상 여부를 manifest에 명시해 우회를 구분해야 합니다.
5. **P1:** provider usage 자동 전달 경로와 `unknown/partial/measured` 집계를 실제 run fixture로 검증해야 합니다.
6. **P2:** compact 인용을 단순 개수 외에 후보별 claim↔URL 결속으로 검사해야 합니다.

## 최종 판정

- **로컬 구현:** 조건부 양호. 변경 전보다 크게 개선됐으나 독립 반례 3건이 남아 있습니다.
- **운영 적용:** 파일럿 이전 보강 필요. 신규 산출물의 실제 소비자 연결과 freshness 강제가 확인되기 전에는 운영 비용 절감 또는 end-to-end 준비 완료를 주장하면 안 됩니다.
