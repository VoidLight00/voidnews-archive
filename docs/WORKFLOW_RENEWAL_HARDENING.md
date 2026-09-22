# 워크플로우 후속 보강

내부 운영문서입니다. 외부 게시하지 않습니다. 원 독립 평가·점수·benchmark raw는 측정 당시 스냅샷으로 유지하며 이 문서는 별도 후속 변경입니다.

## 변경 전 고정

`_workspace/workflow-renewal-hardening/source-hashes-before.json`에 소스 및 원 검토/benchmark 파일 123개 SHA-256을 기록한 뒤 수정했습니다. 기존 비교 점수와 raw를 갱신하지 않았습니다.

## 반례 타당성 구분

독립 반례의 `<script>outer<script>inner</script>LEAK</script>`는 HTML script raw-text 규칙에서 첫 `</script>`가 script를 끝내므로 LEAK는 본문 텍스트입니다. 표준 라이브러리 HTMLParser 이벤트로 안쪽 `<script>`가 start 이벤트가 아니라 문자열인 것을 확인했고, 이미 설치된 lxml HTML 문서 파서도 `<body>LEAK<article>fact</article></body>`로 해석했습니다. 따라서 이 문자열을 무조건 삭제하는 것은 본문 보존을 해칩니다. 실제 브라우저를 실행하지 않았으며 HTML 파서 의미로 확인했습니다.

반면 `<template>outer<template>inner</template>HIDDEN</template><article>fact</article>`는 유효한 중첩 비표시 영역 반례입니다. 기존 동일 태그 첫 위치 종료를 마지막 위치 종료로 바꾸어 안쪽 template이 닫혀도 바깥 영역을 유지합니다. 두 사례 모두 회귀 테스트에 포함했습니다. CSS visibility·기사 의미 영역·완전한 HTML5 오류복구 구현은 아닙니다.

## 구현

- `collection_cache.py`: 중첩 hidden scope의 가장 안쪽 동일 태그부터 종료합니다.
- `plan_collection_lanes.py`: discoveredVia는 활성 registryRows와 registryIds 양쪽에 존재하는 정확한 id에만 매핑합니다. 임의 접두사/미등록 이름은 매칭하지 않습니다. 이는 라우팅 힌트이지 공식성 인증이 아닙니다.
- seed-review의 후보+Grok 파일 참조 합계를 기본 100개로 분할합니다. 모두 감사 배정에 남기고 분할 lane 수를 기존 기본 호출·재시도 예산 계산에 포함합니다. Grok 참조 유실/중복 및 review 크기도 감사 검사합니다. 토큰/본문 바이트 상한은 아닙니다.
- `workflow_contract.py`: 명시적인 새 run 정책 `RUN_MANIFEST.workflowRenewalPolicy=bound-v1`을 추가합니다. preverify는 slim 결속, postverify는 실제 로컬 소비 어댑터의 입력 해시/exit, postrank는 manifest·normalized·ranked 결속 receipt가 필수입니다. 기존 run 정책 미지정은 기존 opt-in 호환성을 유지합니다.
- `consume-verifier`는 slim JSON을 지정된 로컬 소비자 stdin에 실제 전달하고 종료코드와 입력 해시를 기록합니다. 모델 호출은 하지 않습니다. 전 소비자 연결·검증 판단 품질·사용자 승인을 입증하지 않습니다.
- `verify_collection_routing.sh`는 각 실제 단계에서 위 정책 검사를 실행하며 기존 selftest 진입점을 유지합니다.

## 실행 증거

- routing master selftest: exit 0. 기존 수집 테스트와 신규/기존 unittest 합계 10개. `_workspace/workflow-renewal-hardening/selftest.log`.
- Grok compact fixture: exit 0. API 호출 없음.
- repository close: exit 0. `_workspace/workflow-renewal-hardening/close.log`.
- 원 독립 반례를 수정하지 않고 재실행: exit 1, 4개 중 3개 통과. 남은 실패는 앞서 설명한 script 의미를 잘못 전제한 사례입니다. `_workspace/workflow-renewal-hardening/independent-rerun.log`.
- 원 정적 postrank 조건문 반례의 통과는 모든 run에 무조건 최신성을 강제했다는 뜻이 아닙니다. 별도 실행 테스트로 기존 미지정 호환/명시 정책 누락 실패/소비 입력 검증/오래된 소비 해시 실패를 확인했습니다.
- 205개 미배정 후보는 기본 3 lane + review 3 lane = 6 lane, 호출 상한 33으로 계산됩니다. ceiling 32에서는 실제 planner exit 2를 확인했습니다.

## 남는 미연결·한계

운영 conductor 전체가 consume-verifier를 사용하는 것은 아닙니다. 새 정책을 명시 적용한 run에서 로컬 전달 계약을 강제할 수 있도록 했습니다. receipt/소비 로그는 서명이 아닌 로컬 파일 계약이며 악의적인 로컬 파일 작성자를 방어하지 않습니다. 외부 LLM에 실제 전달했는지와 응답 의미가 충분한지는 미측정입니다. provider telemetry 자동 연결 및 실제 입력/출력/cache 토큰·비용 절감률은 unknown입니다. 공개 사이트 lib/public·옵시디언·배포·운영 브라우저는 변경/실행하지 않았습니다.
