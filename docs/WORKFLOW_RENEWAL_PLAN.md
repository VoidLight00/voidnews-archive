# VoidNews 워크플로우 리뉴얼 기획

내부 운영문서입니다. 외부 게시·업로드하지 않습니다.

## 범위와 원칙

기존 프로젝트와 briefing 하네스를 최소 변경합니다. 공개 lib/public 데이터, 옵시디언, 배포, 외부 API, 패키지 설치, 커밋은 범위 밖입니다. 캐시 존재·파일 중복 제거·바이트 감소를 실제 토큰 절감으로 부르지 않습니다. 실제 호출의 사용량이 없으면 unknown입니다.

## 요구사항과 실행 계획

| ID | 변경 계약 | 상태 | 검증 |
|---|---|---|---|
| WR1 | 모든 seed 원본을 감사 파일에 보존하고 URL 도메인/큐레이터 경로에 따라 lane에 배정합니다. 불일치는 별도 seed-review lane과 미배정 목록으로 추적합니다. 200개 절단을 제거합니다. | 로컬 구현·검증 | collection routing selftest + renewal selftest |
| WR2 | 원본 응답 바이트를 비공개 캐시 파일에 보존합니다. HTMLParser로 script/style/head를 제외한 본문을 별도 evidence에 추출합니다. 기존 evidence/excerpt 소비 계약은 유지합니다. | 로컬 구현·검증 | raw bytes/hash/HTML/304 fixture |
| WR3 | finish에 선택적 공급자 usage JSON 입력을 추가합니다. 입력/출력/cache-read/cache-write는 관측한 정수만 기록하며 누락은 null/unknown입니다. | 로컬 구현·검증 | 0/누락/음수/bool/부분 usage fixture |
| WR4 | 01_collected_sources 감사원장은 유지하고 provenance·중복 metadata 없는 별도 모델 입력을 생성합니다. 모델 입력은 원장의 해시·source id에 결속합니다. | 로컬 구현·검증 | merge fixture / stale hash rejection |
| WR5 | Grok 기본 6-section 계약을 유지합니다. --compact에서만 짧은 후보 형식과 작은 출력 상한을 적용합니다. text/citations/verification/usage 외부 shape는 유지합니다. | 로컬 구현·검증 | import-safe Node fixture, 실제 API 호출 없음 |
| WR6 | 기존 jobInputHash·보고서 상태 검사를 재사용할 수 있게 파일 해시 기반 편집 결정 및 검사 영수증 계약을 추가합니다. 입력/결정 변경 시 최신성 검사를 실패시킵니다. 자동 사용자 승인/발행 의미는 부여하지 않습니다. | 로컬 구현·검증 | tamper/stale/nonzero/missing fixture |

## 조사 결과와 호환성

plan_collection_lanes는 모든 lane에 threads/community 전체를 반복 전달하며 compact_seeds는 200개를 조용히 자릅니다. collection_cache evidence는 HTML 앞 12,000자이고 merge는 그 앞 1,200자를 excerpt로 씁니다. merge 감사원장에는 후보 metadata와 provenance가 포함됩니다. routing_budget는 호출 수만 제한합니다. Grok은 text/citations/verification/usage를 반환하며 4개 인용 기준을 사용합니다. 새 compact는 이 기준을 낮추지 않습니다. 기존 보고서의 픽/상태 게이트와 별개로 재사용 가능한 결정-입력-검사 결속을 추가하되 기존 run은 강제 마이그레이션하지 않습니다.

## 검증 커맨드

- `python3 ~/.claude/skills/voidnews-briefing-pipeline/scripts/collection_routing_selftest.py`
- `bash ~/.claude/skills/voidnews-briefing-pipeline/gates/verify_collection_routing.sh --stage selftest`
- `node scripts/test-vgrok-compact.mjs`
- `bash ~/.claude/qa-canon/close.sh /Users/voidlight/projects/voidnews-archive`

각 실행의 실제 종료코드는 WORKFLOW_RENEWAL_LOG에 기록합니다. 기존 무관 실패는 수정하지 않습니다. 이번 작업은 운영 사이트·브라우저 검증이나 배포 성공을 주장하지 않습니다.

## 롤백

변경 전 파일은 작업용 백업에 보존합니다. 이번 파일만 백업과 비교해 복구하며 git reset/전체 checkout은 사용하지 않습니다. 새 run 산출물은 삭제 대신 보존합니다. 기존 cache schema v2는 유지하고 새 필드는 추가형입니다. compact는 플래그를 제거하면 기존 동작입니다. 새 편집 계약은 명시적 seal/check 경로에서만 사용합니다.

## 미구현·운영 검증 한계

실제 모델 호출별 usage 자동 수집·절감률 A/B 실험, 전체 conductor 단계 자동 재실행, 편집 승인 UI, 모든 모델 소비자의 새 slim 입력 전환은 이번 범위에 포함하지 않습니다. 새 계약의 로컬 fixture 검증과 운영 적용은 구별합니다. 편집 receipt는 파일 결속·exit 기록이지 검사 명령 자체의 의미적 충분성이나 사용자 승인 증거가 아닙니다. 기존 v2 캐시 원문 복구·재추출은 하지 않으며 다음 실제 fetch부터 raw 보존이 적용됩니다. HTMLParser는 보수적인 태그 제거이며 기사 영역 의미 추출기나 브라우저 CSS 가시성 판정기가 아닙니다.

## 최종 로컬 판정

기존 routing selftest와 신규 6개 unittest를 묶은 하네스 master selftest exit 0, Node compact fixture exit 0, repository close exit 0을 확인했습니다. 정식 개선 원장 IMP-0041의 verified는 이 로컬 계약 범위만 뜻합니다. 운영 사이트 브라우저·API·배포 검증은 미실행입니다. 실행 기록과 close 로그 위치는 WORKFLOW_RENEWAL_LOG를 참조합니다.
