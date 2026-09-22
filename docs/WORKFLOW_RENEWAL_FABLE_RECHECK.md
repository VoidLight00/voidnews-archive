# VoidNews 워크플로우 리뉴얼 Stage 2 독립 재검토

## 신원·범위

- 요청 모델: **Fable**
- 실제 실행 모델: **telemetry 확인 불가(미확인)**. 독립 모델 신원을 스스로 증명하지 않습니다.
- 타 모델 fallback: 사용하지 않았습니다.
- 원 평가 파일·점수·반례는 수정하지 않았습니다.
- 최초에 고정한 rubric `_workspace/workflow-renewal-fable-review/FROZEN_RUBRIC.md`를 그대로 적용했습니다.
- 외부 API, 브라우저, 패키지 설치, build, 생산 데이터 수정은 수행하지 않았습니다.
- Stage 2 문서의 주장은 코드와 독립 로컬 fixture로 다시 확인했습니다.

## 점수 이력과 Stage 2 판정

모델 평가 점수이며 객관 테스트 통과율과 다릅니다.

| 시점 | 로컬 워크플로우 구현 품질 | 운영 적용 준비도 | 비고 |
|---|---:|---:|---|
| 변경 전 | 43/100 | 36/100 | 원 평가에 기록된 과거 점수 |
| Stage 1 | 71/100 | 55/100 | 원 평가에 기록된 과거 점수, 수정하지 않음 |
| **Stage 2 현재** | **88/100** | **78/100** | 고정 rubric 재평가 |
| Stage 2 대 Stage 1 | **+17** | **+23** | 후속 보강 효과 |

### Stage 2 로컬 워크플로우 구현 품질

| 차원 | 배점 | 점수 | 근거·감점 |
|---|---:|---:|---|
| 정확성·계약 준수 | 20 | 18 | 정확 registry provenance 배정과 정책별 단계 계약이 구현됐습니다. HTML5 전체 오류복구는 범위 밖입니다. |
| 정보 보존·추적 가능성 | 15 | 14 | raw 원문·audit hash·slim lineage가 유지되고 nested template이 숨겨집니다. 렌더 DOM 원본 보존은 아닙니다. |
| 비용 효율 설계 | 15 | 13 | review 100항목 분할과 lane 수 예산 반영을 확인했습니다. 제한 단위가 토큰/byte가 아니라 항목+Grok 참조 수입니다. |
| 검증·반례 내성 | 20 | 19 | 독립 6개 반례와 기존 10개 selftest가 모두 통과했습니다. 실제 외부 소비 품질 테스트는 없습니다. |
| 실제 소비자 연결 | 15 | 11 | slim JSON을 로컬 consumer stdin으로 실제 전달하고 hash/exit를 단계 게이트가 검사합니다. 운영 conductor 전체 연결은 아닙니다. |
| 계측·관측 가능성 | 10 | 8 | consumption hash/exit와 기존 usage 상태가 기록됩니다. provider telemetry 자동 연결은 없습니다. |
| 유지보수성·격리 | 5 | 5 | 새 정책이 명시적이고 legacy run과 격리되며 오프라인 재현 가능합니다. |
| 합계 | 100 | **88** | 양호, 우수 경계 미만 |

### Stage 2 운영 적용 준비도

| 차원 | 배점 | 점수 | 근거·감점 |
|---|---:|---:|---|
| end-to-end 운영 경로 완결성 | 20 | 15 | bound-v1의 local consume→postverify→postrank 경로는 닫혔으나 실제 conductor 기본 경로는 미연결입니다. |
| 안전한 기본값·opt-in 경계 | 15 | 12 | bound-v1에서는 fail-closed입니다. 다만 정책 미지정 legacy run은 호환을 위해 opt-in 동작을 유지합니다. |
| 실패 처리·회복성 | 15 | 13 | stale input, failed consumer, 누락 receipt, budget ceiling을 거절합니다. 악의적 로컬 파일 작성자는 방어하지 않습니다. |
| 운영 검증 신뢰도 | 15 | 14 | 단계 게이트가 정책 검사를 실제 호출하며 독립 fixture가 성공·실패 경로를 실행했습니다. 외부 verifier 의미 품질은 미검증입니다. |
| 비용·용량 통제 | 15 | 13 | review shard 수가 호출·retry budget에 포함되고 ceiling 초과가 차단됩니다. token/byte 상한은 없습니다. |
| 관측·감사 가능성 | 10 | 8 | 소비 입력 hash, exit, stdout/stderr hash가 남습니다. 실제 LLM 전달 telemetry는 없습니다. |
| 배포·소비자 호환성 | 10 | 3 | legacy 호환은 유지되지만 운영 conductor, 배포, 브라우저, 실제 모델 consumer는 확인하지 않았습니다. |
| 합계 | 100 | **78** | 제한 적용 가능, 전체 운영 기본 적용 전 배선 필요 |

## 원 script 반례 재판정

원 반례:

```html
<script>outer<script>inner</script>LEAK</script><article>fact</article>
```

이 반례는 **부당했습니다**.

HTML의 `script` 내용은 raw text입니다. 내부 문자열 `<script>`는 중첩 start tag 이벤트가 아니며 첫 `</script>`가 script 요소를 종료합니다. 따라서 뒤의 `LEAK`는 파서 관점에서 본문 텍스트입니다. 독립 테스트에서 Python `HTMLParser` 이벤트를 직접 기록해 다음을 확인했습니다.

- script 내부 데이터: `outer<script>inner`
- 첫 `</script>` 이후 데이터: `LEAK`
- 현재 evidence: `LEAK fact`

따라서 `LEAK`를 제거하라는 원 기대값은 정보 보존을 오히려 해칩니다. 브라우저를 실행한 결과가 아니라 HTML raw-text 파싱 의미에 따른 판정입니다.

### 원 점수에 미친 영향

원 Stage 1의 71/55는 과거 평가 스냅샷으로 유지합니다. 다만 반례가 부당했으므로 당시 다음 감점 중 **로컬 구현 품질 약 3점은 근거가 약했습니다**.

- 정보 보존·근거 정확성 감점 일부
- 검증·반례 내성 감점 일부

이를 사후 보정한 가상 Stage 1 점수는 약 74/100이 될 수 있으나 공식 과거 점수를 바꾸지 않습니다. 운영 점수 55에는 실질 영향이 없습니다. Stage 2 점수 상승은 이 정정만으로 부여하지 않았으며, 아래 실제 보강과 신규 실행 결과를 근거로 했습니다.

## 유효한 HTML 반례와 보강

유효한 중첩 비표시 영역은 다음 `template` 사례입니다.

```html
<template>outer<template>inner</template>HIDDEN</template><article>fact</article>
```

- Stage 1 구현은 첫 동일 태그 위치를 잘라 바깥 template scope를 조기 종료할 수 있었습니다.
- Stage 2는 가장 안쪽 동일 태그 index를 찾아 LIFO로 닫습니다: `~/.claude/skills/voidnews-briefing-pipeline/scripts/collection_cache.py:23-42`.
- 독립 실행 결과 evidence가 정확히 `fact`였습니다.
- 공식 selftest에도 script raw-text와 nested template을 함께 고정했습니다: `~/.claude/skills/voidnews-briefing-pipeline/scripts/workflow_renewal_selftest.py:41-45`.

완전한 HTML5 parser나 CSS visibility·기사 본문 의미 추출기라는 뜻은 아닙니다.

## Stage 2 구현 검토

### 1. 정확한 registry `discoveredVia` 연결

- seed provenance가 문자열이면 단일 목록으로 정규화합니다.
- job의 `registryRows.id`와 `registryIds` 양쪽에 있는 정확한 id만 등록 provenance로 인정합니다: `~/.claude/skills/voidnews-briefing-pipeline/scripts/plan_collection_lanes.py:13-18`.
- URL/domain 경로는 별도로 유지됩니다: 같은 파일 `:19-31`.
- 독립 fixture 결과:
  - `curator-a` → `curator-web-01`
  - `curator-a-suffix` → `seed-review`
- 임의 prefix나 비슷한 이름을 잘못 배정하지 않았습니다. 공식성 인증이 아니라 routing hint라는 경계도 유지됩니다.

### 2. Seed-review 분할과 예산

- 미배정 seed와 Grok 파일 참조를 하나의 work 목록으로 만든 뒤 기본 100개 단위로 분할합니다: `plan_collection_lanes.py:34-60`.
- audit 검증은 전체 Grok 경로의 유실·중복과 각 review lane 크기를 검사합니다: 같은 파일 `:95-121`.
- 분할 뒤 전체 job 수를 `base_requests`, `routineRetryReserve` 계산에 사용합니다: 같은 파일 `:195-227`.
- 독립 실행에서 미배정 seed 205개가 review lane 3개로 나뉘었고 전체 job은 기본 lane 3개를 합쳐 6개였습니다.
- 계산된 `absoluteMax=33`, ceiling 32에서는 planner가 exit 2로 실패했습니다.
- 남은 한계: 100은 항목+Grok 파일 참조 개수이며 실제 prompt byte/token 상한이 아닙니다. 한 항목의 장문 metadata가 크면 workload를 충분히 제한하지 못합니다.

### 3. `bound-v1` 정책과 실제 로컬 소비

- `RUN_MANIFEST.workflowRenewalPolicy=bound-v1`을 명시하면 preverify에서 audit/slim projection 결속을 검사합니다: `~/.claude/skills/voidnews-briefing-pipeline/scripts/workflow_contract.py:67-81`.
- postverify부터 `02_verifier_consumption.json`의 input path/hash/exit 0을 강제합니다: 같은 파일 `:78-81`.
- `consume_verifier`는 `01_verifier_input.json` bytes를 지정된 로컬 command의 stdin으로 실제 전달하고 전후 hash와 exit를 기록합니다: 같은 파일 `:89-100`.
- postrank에서는 receipt가 manifest, normalized, ranked 파일을 모두 결속해야 합니다: 같은 파일 `:82-86`.
- 모든 collection stage가 가장 먼저 policy-check를 실행합니다: `~/.claude/skills/voidnews-briefing-pipeline/gates/verify_collection_routing.sh:52-75`.

독립 실행에서 다음을 확인했습니다.

1. slim JSON만 stdin으로 전달되는 consumer 성공
2. postverify policy-check 성공
3. manifest+normalized+ranked receipt가 있는 postrank 성공
4. ranked 파일 변조 뒤 postrank 실패
5. consumer exit 7 기록 및 postverify 실패

이는 **실제 로컬 process 소비 계약**의 증거입니다. 실제 LLM verifier에 전달됐거나 검증 결과의 의미가 충분하다는 증거는 아닙니다.

### 4. Legacy 호환성과 opt-in 경계

- 정책이 없으면 기존 run은 호환 경로를 유지합니다: `workflow_contract.py:67-76`.
- 정책이 `bound-v1`이면 단계별 파일 누락·stale 상태가 fail-closed입니다.
- Stage 1의 “모든 run에서 파일 부재로 우회된다”는 결함은 명시 정책 run에 대해서 해결됐습니다.
- 그러나 운영 conductor가 새 run manifest에 bound-v1을 기본 설정하지 않으면 legacy 경로로 남습니다. 따라서 운영 전체의 최신성 강제 완료로 평가하지 않았습니다.

## 객관 테스트 결과

| 실행 | Exit | 결과 |
|---|---:|---|
| Stage 2 독립 반례 6개 | 0 | 6/6 PASS |
| routing master selftest | 0 | PASS, 공식 renewal unittest 포함 |
| vGrok compact fixture | 0 | PASS, 외부 API 호출 없음 |

독립 반례 구성:

1. script raw-text 원 반례의 기대값 오류 확인
2. 유효한 nested template 숨김 확인
3. exact registry provenance와 suffix 거절
4. review 3분할·retry 예산·ceiling 32 실패
5. bound-v1 slim 소비·receipt·ranked stale 거절
6. consumer nonzero exit와 postverify 거절

실행 파일·로그:

- `_workspace/workflow-renewal-fable-recheck/recheck_counterexamples.py`
- `_workspace/workflow-renewal-fable-recheck/recheck-counterexamples.log`
- `_workspace/workflow-renewal-fable-recheck/master-selftest.log`
- `_workspace/workflow-renewal-fable-recheck/vgrok-fixture.log`

## 남는 미연결·감점 항목

1. **운영 conductor 미연결:** 전체 conductor가 `workflowRenewalPolicy=bound-v1`을 설정하고 `consume-verifier`를 호출하는 기본 코드 경로는 확인되지 않았습니다.
2. **실제 모델 소비 미측정:** 로컬 stdin consumer는 검증했지만 외부 LLM에 slim projection이 전달됐는지는 확인하지 않았습니다.
3. **provider usage 자동 연결 미구현:** unknown/partial/measured 자료구조는 있으나 실제 공급자 응답에서 routing ledger까지 자동 연결되는 end-to-end 경로는 확인하지 않았습니다.
4. **review 제한 단위:** 항목 수 제한이며 byte/token 제한이 아닙니다.
5. **HTML 추출 범위:** HTMLParser 기반 보수적 projection이며 CSS visibility, DOM 렌더 결과, 기사 의미 영역을 판정하지 않습니다.
6. **로컬 receipt 신뢰 경계:** hash와 exit 결속이지 서명이나 사용자 승인 증거가 아닙니다.
7. **운영 검증 미실행:** 실제 LLM 비용, 브라우저 성능, 사이트 UX, 배포, 운영 API, 모바일 화면은 미측정입니다.

## 최종 판정

- **로컬 워크플로우 구현 품질 88/100:** Stage 1의 핵심 결함을 구체적인 정책·소비 어댑터·분할 예산·반례 fixture로 보강했습니다. 독립 반례 6개가 모두 통과했습니다.
- **운영 적용 준비도 78/100:** `bound-v1`을 명시한 로컬 run은 제한 적용 가능한 수준입니다. 다만 운영 conductor 기본 배선과 실제 LLM/provider telemetry가 연결되기 전에는 전체 운영 적용 완료나 비용 절감 실증을 주장하면 안 됩니다.
