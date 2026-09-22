# 워크플로우 최종 마감

내부 운영문서입니다. 공개·업로드하지 않습니다. 로컬 구현·시험은 마감했으며 실제 유료 모델과 운영 실행 실측은 승인 대기/미완으로 분리합니다. 기존 Fable 점수 88/78은 재채점하지 않았습니다.

## 원 기획 요구사항 최종 대조

| 요구 | 구현 | 시험 결과 | 운영 상태 |
|---|---|---|---|
| WR1 관련 seed 배정·무손실 감사 | 정확 registry id/URL 배정, 미배정 review 항목·UTF8 상한 분할, 단일 과대 보류, 감사/예산 | master 및 benchmark 206후보 보존 통과 | 실제 모델 lane 실행 미측정 |
| WR2 원본/본문 분리 | raw 바이트·해시 보존, HTMLParser evidence, 기존 merge 계약 | raw/HTML/304/template 및 benchmark 통과 | 기존 cache 원본 복구·CSS/DOM 완전성 범위 밖 |
| WR3 실제 usage/unknown | provider 응답→정규화→요청별 usage→budget finish; 누락 unknown | mock partial/0/measured/unknown·실패 통과 | live/native Agent 자동 telemetry 미연결 |
| WR4 모델 입력/감사 분리 | slim projection 검증·로컬 runner stdin 소비·소비 hash | mock process 실제 JSON 소비 통과 | 외부 LLM 소비 미측정 |
| WR5 Grok compact | 명시 opt-in, 기본 6-section/4인용 기준 유지 | Node fixture 및 benchmark 기본 hash 동일 | 실제 생성 품질·비용 미측정 |
| WR6 편집 결정/입력/최신 검사 | bound-v1 신규 shadow, 입력·출력·receipt 해시, 단계 게이트 | stale/failed/absent 정책 회귀 통과 | 기존 legacy 정책 보존; 실제 사용자 승인 의미 없음 |

## 마감에서 찾은 로컬 연결 누락과 수정

source-verifier agent 정식 출력은 `02_verified_sources.json`, `02_risk_flags.json`입니다. 기존 공용 runner는 provider text까지만 저장했습니다. 이를 마감 패스에서 수정했습니다. 이제 provider text는 sources/riskFlags JSON이어야 하며 모든 입력 id를 정확히 한 번 포함하고 official/checkLevel/confidence/riskFlags 필드를 갖춰야 합니다. runner가 두 정식 파일을 생성하고 소비 기록에 출력 해시를 결속합니다. 출력 변경은 postverify에서 거절합니다. 로컬 schema/lineage 검증이며 source-verifier의 실제 출처 검증 판단을 가짜로 생성하지 않습니다. mock 결과는 official=false/unverified입니다.

## 최종 실행 결과

- `bash ~/.claude/skills/voidnews-briefing-pipeline/gates/verify_collection_routing.sh --stage selftest`: exit 0. 기존 routing selftest + renewal unittest **10개** + Stage3 unittest **4개**.
- `python3 _workspace/workflow-renewal-fable-recheck/recheck_counterexamples.py`: exit 0, 독립 Stage2 **6개**.
- `node scripts/test-vgrok-compact.mjs`: 이전/최종 close evidence에서 exit 0.
- `node scripts/ledger.mjs verify`: exit 0, `final-ledger.log`.
- `bash ~/.claude/qa-canon/close.sh /Users/voidlight/projects/voidnews-archive`: exit 0, `final-close.log`.
- 원 benchmark 스크립트를 같은 깊이의 별도 `_workspace/workflow-renewal-final-benchmark/`에 복사하여 현재 코드로 재실행: exit 0. 이전 **7/20·35점**, 현재 **20/20·100점**. before score gate exit **1**, after exit **0**. 이 수치는 고정 로컬 목표 계약 점수이며 Fable 모델평가 88/78과 다릅니다.
- 병합 비채점 supplement: exit 0, 양쪽 merge exit 0. 실제 모델 호출이 아닌 산출물 비교입니다.
- 저장 운영 seed benchmark의 planner는 양쪽 모두 기존 입력 failures 5건 때문에 exit 2입니다. 최종 benchmark 성공을 운영 수집 성공으로 해석하지 않습니다.

증거는 `_workspace/workflow-renewal-stage3/final-{master,recheck,ledger,close}.log`, `_workspace/workflow-renewal-final-benchmark/results.json`, `before/result.json`, `after/result.json`, `supplement-results.json`에 있습니다. 원 benchmark/raw/점수를 덮어쓰지 않았습니다.

## 실제 사용할 CLI

아래는 실행 예시이며 실행 성공을 보장하는 문구가 아닙니다. RUN은 성공한 planner와 merge 산출물이 있는 새 로컬 작업 경로로 지정해야 합니다.

```bash
SKILL="$HOME/.claude/skills/voidnews-briefing-pipeline"
# 먼저 기존 planner 명령을 실행하고 exit 0인지 확인합니다.
# 신규 Luna shadow에만 사용; 기존 manifest가 있으면 거절합니다.
python3 "$SKILL/scripts/workflow_runner.py" new --run "$RUN"
# 기존 fetch/merge 및 preverify gate를 통과시킨 뒤 사용합니다.
# provider adapter는 slim JSON을 stdin으로 읽고 JSON 응답을 stdout으로 반환해야 합니다.
# 외부 API를 호출하는 adapter라면 별도 과금/전송 승인 전 실행하지 않습니다.
python3 "$SKILL/scripts/workflow_runner.py" verify --run "$RUN" \
  --request-id verify-001 --command python3 /absolute/path/to/approved_local_adapter.py
# 실제 정규화/랭킹/편집 결정 생성 후 의미 있는 로컬 검사를 결속합니다.
python3 "$SKILL/scripts/workflow_contract.py" run-check --run "$RUN" \
  --input RUN_MANIFEST.json --input 03_normalized_items.json --input 04_ranked_items.json \
  --command python3 /absolute/path/to/local_editorial_check.py
python3 "$SKILL/scripts/workflow_contract.py" seal --run "$RUN" \
  --input RUN_MANIFEST.json --input 03_normalized_items.json --input 04_ranked_items.json
bash "$SKILL/gates/verify_collection_routing.sh" --stage postrank --run "$RUN"
```

실제로 존재하는 무과금 검증 명령은 master selftest입니다. 위 approved_local_adapter.py/local_editorial_check.py는 배포한 파일이 아니라 운영자가 승인·구현한 실제 명령으로 교체해야 하는 자리입니다. 이 빈 연결을 live provider 완료로 보고하지 않습니다. Grok radar CLI는 verifier adapter가 아니므로 그대로 끼워 넣지 않습니다.

## 최신 사용자 요청: 단계별 모델 비용 정책 적용

최종 요청에 따라 신규 기본 경로는 저비용 discovery haiku, 코드 fetch/cache/merge, 검증·정규화 sonnet, 선정·발표안·대본 opus로 통일했습니다. 검증 안전 기준은 변경하지 않았습니다. `/AB` 49행, conductor 42·45행, SKILL 57·70행, source-verifier/normalizer frontmatter 4행, runner 26행의 manifest까지 반영했습니다. Grok은 기본 disabled/usedGrok=false이며 명시 `--with-grok`와 과금/외부 전송 승인 때만 호출합니다. production new/plan 기본은 legacy-v1으로 유지하며 승인 후 사이트 작성 흐름을 보존합니다. 저비용 discovery는 기존 collector의 haiku 요청으로 적용합니다. Luna shadow+bound-v1은 명시 선택 때만 적용합니다. 기존 resume 정책과 명시 shadow의 사이트 금지는 유지합니다. 전역 모델 설정은 수정하지 않았습니다.

정책 변경 후 관련 로컬 master **1회** 재실행 exit 0: routing+renewal 10개+Stage3 **5개**. 증거 `_workspace/workflow-renewal-stage3/requested-model-policy.log`. benchmark를 추가 재실행하지 않았습니다. 요청 모델 설정이며 실제 effective model/비용 절감 telemetry는 unknown입니다.

## 남은 외부 승인 및 미완

1. 실제 provider transport adapter와 source-verifier 모델 실행: 미완/외부 전송·과금 승인 대기.
2. native Agent invocation의 usage 수집: 미연결, unknown 유지.
3. 실제 모델 결과 의미 품질, token/cache/cost 절감, 운영 지연: 미측정.
4. 운영 사이트·브라우저·배포: 이번 공개 데이터 변경 없음, 미실행. 전체 사이트 감사 문서는 다른 담당 소유로 수정하지 않았습니다.
5. HTML CSS/DOM 의미 완전성·로컬 receipt 서명·사용자 승인 증명은 범위 밖입니다.

## 롤백

초기 변경 전: `_workspace/workflow-renewal-before/`. Stage3 전: `_workspace/workflow-renewal-stage3/backup/`, 해시 `hashes-before.json`. 필요한 개별 파일만 비교·복원하고 전체 git reset/기존 run 삭제는 하지 않습니다. compact 플래그 제거는 기존 기본 형식으로 복귀합니다. 기존 legacy manifest는 애초 변경하지 않았습니다. 새 run의 bound 정책을 중간 해제하지 말고 새 작업 경로에서 명시 정책으로 다시 시작합니다.
