# 워크플로우 Stage 3

내부 운영문서입니다. 기존 평가·점수·benchmark raw는 변경하지 않습니다.

## 잔여 1~4 기반 계획

1. review 작업을 UTF-8 실제 직렬화 크기로 분할합니다. 기본 64 KiB는 모델 한도 추정이 아니라 로컬 작업 봉투의 보수적 크기 정책입니다. 토큰 환산하지 않습니다. 항목은 자르지 않으며 단일 항목도 넘으면 명시 실패합니다. 모든 job 파일 바이트를 측정하고 감사합니다.
2. 실제 진입점 조사: `/AB`는 markdown command→briefing SKILL→markdown conductor입니다. 별도 실행형 conductor가 있다는 근거는 없습니다. 기존 planner/merge/budget/contract CLI를 호출하는 최소 로컬 공용 실행기를 스킬 정식 절차에 연결합니다. 기존 legacy manifest는 재작성하지 않습니다.
3. 신규 run만 bound-v1로 생성하고 기존 collectionRouting 정책·shadow 금지를 유지합니다. 로컬 provider command에 slim만 stdin으로 넘기고 응답 usage를 budget finish로 전달합니다. 기존 Grok JSON `text/usage` 및 Anthropic Messages `content/usage` 응답 shape를 지원합니다.
4. 외부 LLM 소비는 이번에는 mock 응답으로만 검증합니다. 실제 API·과금·자격 증명 읽기·네트워크 호출은 하지 않습니다. native Agent 사용량을 얻을 수 없으면 unknown입니다.

## 테스트 계획

신규 RED fixture→구현→GREEN. 한글 바이트 경계, 다항목 무손실 분할, 단일 과대 항목 거절, 전체 jobs 바이트, 신규/legacy 정책 경계, shadow 사이트 금지, slim 소비와 실제 provider usage 연결, provider 실패·누락 usage를 검사합니다. routing master, stage2 독립 recheck, Node Grok fixture, close를 다시 실행합니다.

## 변경 전 보존

`_workspace/workflow-renewal-stage3/hashes-before.json` 및 `backup/`에 현재 해시/코드 130파일을 저장했습니다.

## 구현과 요구사항 매핑

| 잔여 | 실제 변경 | 연결 수준 |
|---|---|---|
| 1 conductor | SKILL Phase 1 신규 Luna shadow 공용 경로→workflow_runner.py new/verify | 문서 정식 진입점에서 호출하도록 명시, 실제 실행형 local CLI 구현·실행 검사 |
| 2 slim 소비 | runner verify→claim→슬림 stdin→응답 검증→소비 기록→policy-check | mock process가 JSON을 실제 읽음; 외부 모델 전달 미측정 |
| 3 usage | Grok text/usage·Anthropic content/usage shape→허용 usage 필드→요청별 파일→routing_budget finish | provider 응답 mock으로 0/partial/measured/unknown·실패 보존 검증 |
| 4 크기 | serialized_job UTF-8 실제 파일 크기→항목 경계 review_batches→jobInputBytes→audit | 기본 65536 bytes/100항목, 두 조건 만족·단일 과대 실패·전체 job 측정 |

공용 runner에는 new/verify만 존재하며 publish/site 동작은 없습니다. 신규 Luna run의 collectionRouting.shadow=true와 기존 policyVersion을 보존합니다. 이미 존재하는 manifest는 exclusive 생성으로 거절하고 legacy verify도 변경 없이 거절합니다. planner 실패 marker가 있으면 stale plan으로 새 run을 시작하지 않습니다. 실패 provider는 invocation state=failed로 닫고 이전 성공 소비 기록을 실패로 바꿔 postverify 진행을 차단합니다.

64 KiB의 근거는 작업 파일 크기의 명시적인 로컬 관리 정책입니다. 어떤 모델 context/최적 비용을 실측해 선정한 숫자가 아니며 기본값 조정은 옵션으로 가능합니다. 모든 jobs는 크기를 측정하지만 크기 제한은 review lane에 적용합니다. Grok 파일 참조의 JSON 크기는 그 파일 본문 전체 크기를 뜻하지 않습니다. 원본 항목/입력 파일을 잘라내지 않습니다.

## 테스트 실측

- 구현 전 신규 fixture: RED exit 1, `red.log`(review_bytes 미지원, runner 미존재).
- 구현 후 master selftest: exit 0. 기존 routing, renewal unittest 10개, stage3 unittest 3개.
- Stage2 독립 recheck: exit 0, 6개 통과. 원본 검사/로그를 수정하지 않고 `stage2-recheck.log`에 새 결과 저장.
- Node Grok fixture: exit 0.
- 정식 개선원장 IMP-0042 add/render: 각각 exit 0. evidence는 mock/local master 검사에 한정합니다.
- 최종 repository close: exit 0, `close.log`. 원장의 신규 evidence도 재실행됐습니다.
- 로그 위치: `_workspace/workflow-renewal-stage3/`.

## 실제 운영 연결 수준과 미측정

기존 Grok 코드는 topic radar용이며 verifier stdin을 받지 않습니다. 이를 억지로 verifier로 호출하지 않았고 동일 응답 shape만 adapter가 소비하도록 했습니다. runner의 provider 명령은 승인된 로컬 adapter argv이며 외부 API transport·자격 증명 읽기를 내장하지 않습니다. native Agent 도구는 subprocess가 아니므로 자동 계측/전달을 주장하지 않습니다. 공급자 usage가 없으면 unknown이며 실제 과금 모델 호출은 별도 승인 전 금지입니다. 모든 운영 conductor 실행이 이 경로를 썼다는 telemetry는 없습니다.

HTML CSS/DOM 완전성, 서명, 사용자 승인 증명, 모델 의미적 검증 품질은 범위 밖입니다. 생산 lib/public·옵시디언·배포·커밋은 변경하지 않았습니다.
