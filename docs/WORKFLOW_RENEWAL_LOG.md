# VoidNews 워크플로우 리뉴얼 작업 로그

## 작업 기준

- 시작: 2026-09-20 18:21 KST
- 사용자 요청: 뉴스 수집부터 검증·선정·사이트·발표 대본까지 개선 기획문서를 작성하고 그 문서에 따라 구현·검증합니다. 프로젝트에 작업 로그를 남깁니다.
- 상태: 최소 갱신 로컬 구현·검증 완료 — 운영 호출/배포/브라우저 및 절감률은 미검증
- 기획문서: `docs/WORKFLOW_RENEWAL_PLAN.md` (작성·상태 갱신됨, 내부 운영문서)
- 원칙: 기존 캐시·호출 예산·부분 수정 기능 재사용. 기존 기사·이미지·옵시디언 본문 보존. 외부 발행·유료 운영 호출·새 브라우저 설치 없음. 검증 결과 없이 완료 처리하지 않음.
- 범위: 프로젝트와 `~/.claude/skills/voidnews-briefing-pipeline`의 관련 실행 코드·계약. 전역 권한·설정 변경 없음.

## 2026-09-20

### 시작 및 사전 확인

- 프로젝트 `CLAUDE.md`, `AGENTS.md`를 읽었습니다.
- 프로젝트 `git status --short` 결과 출력 없음, 종료코드 0: 작업 시작 시 프로젝트 작업 트리는 깨끗했습니다. 홈 리포 및 전역 스킬의 상태와는 별개입니다.
- 기존 `docs/improvements.ledger.json`과 생성 문서 `docs/IMPROVEMENTS.md`의 존재를 확인했습니다. 기존 원장은 구조를 읽은 뒤 정식 도구로 갱신하며 생성 문서를 직접 수정하지 않습니다.
- 앞선 정적 감사에서 확인한 개선 후보: 작업별 공통 후보 목록 반복 전달, 정적 HTML과 모델용 본문 미분리, 감사 원장과 모델 입력 혼합, 후보 단계 조기 장문 생성, 호출 수 예산과 실제 토큰 사용량 계측의 구분.
- 위 후보의 실제 수정 범위와 합격 조건은 기획문서에서 확정합니다. 절감률은 미측정이며 보장하지 않습니다.

### 변경 파일

- `docs/WORKFLOW_RENEWAL_LOG.md`: 신규 작업 로그.

### 검증 상태

- 구현 테스트: 아직 미실행.
- 운영 사이트·브라우저: 미실행. 이번 단계에서 공개 화면은 변경하지 않았습니다.
- 배포·커밋·외부 업로드: 미실행.

### 다음 작업

1. 관련 실행 코드와 기존 테스트·개선 원장 구조 확인.
2. 기획문서에 요구사항·변경 범위·검증 방법·복구 방법 정의.
3. 기획에 따른 구현과 단계별 테스트, 결과를 이 로그에 추가.
4. 완료·미완료·운영 미검증 범위를 분리하여 보고.

### 단계 1 — 기획과 구현

- `docs/WORKFLOW_RENEWAL_PLAN.md`를 내부 문서로 작성했습니다. 별도 외부 게시를 하지 않습니다.
- 변경 전 8파일을 `_workspace/workflow-renewal-before/`에 복사했습니다(복사 명령 exit 0). 추가 게이트 수정 전 원문은 읽고 변경했습니다.
- 하네스 변경: `scripts/plan_collection_lanes.py`(무손실 seed 배정/감사/해시), `scripts/collection_cache.py`(raw 원본·HTML 본문 분리), `scripts/routing_budget.py`(실측 usage 입력), `scripts/merge_luna_shards.py`(모델 입력 추가), `scripts/workflow_contract.py`(신규 편집 검사 결속), `scripts/workflow_renewal_selftest.py`(신규 로컬 fixture), `scripts/collection_routing_selftest.py`(DNS 모킹·새 계약), `gates/check_collection_routing.py`, `gates/verify_collection_routing.sh`, `SKILL.md`.
- 프로젝트 변경: `scripts/vgrok-fetch.mjs`(--compact opt-in, import-safe), `scripts/test-vgrok-compact.mjs`(신규 API 없는 fixture).
- 기존 `01_collected_sources.json` 계약과 Grok 기본 6-section 형식을 유지합니다. 새 rawSnapshot은 static 응답 바이트이며 렌더 DOM이라고 표시하지 않습니다. 기존 v2 캐시에는 과거 원본이 없을 수 있습니다.

### 단계 2 — 첫 로컬 검사

- `bash ~/.claude/skills/voidnews-briefing-pipeline/gates/verify_collection_routing.sh --stage selftest`: exit 0. 기존 routing selftest와 신규 unittest 5개 통과(이후 6개로 보강).
- `node scripts/test-vgrok-compact.mjs`: exit 0. 기본/선택 compact/4개 인용 추출 검증, 외부 API 없음.
- 실측 토큰/절감률: unknown. 테스트는 전달 내용과 계약 검증이지 실제 모델 호출 비용 측정이 아닙니다.
- 운영 UI/사이트 브라우저: 미실행, 공개 lib/public 미수정이므로 배포·화면 성공을 주장하지 않습니다.

### 단계 3 — 결속 보강과 종료 검사

- `plan_collection_lanes.py`, `check_collection_routing.py`: seed 감사 해시·전체 배정 키·job별 실제 후보 대조를 preverify에 배선했습니다. 원본 threads 및 Grok 파일 내용 해시를 plannerInputHash에 포함했습니다.
- `workflow_contract.py`, `workflow_renewal_selftest.py`: 실제 로컬 검사 실행(run-check) 전후 입력 해시와 exit를 보존하며 실패/변경 입력에서 봉인을 거절합니다. 수동 작성 receipt는 암호학적 서명이 아니며, 승인 증명으로 사용하지 않습니다.
- `merge_luna_shards.py`: 기존 snapshot 메타에 rawSnapshot/evidenceExtraction을 추가해 원본 경로를 감사 정본에서도 추적합니다.
- routing master selftest 재실행: exit 0(기존 routing + 신규 unittest 6개). Grok compact Node fixture 재실행: exit 0.
- `bash ~/.claude/qa-canon/close.sh /Users/voidlight/projects/voidnews-archive`: exit 0. 로그 `_workspace/workflow-renewal-close.log`. 기존 79건 출처 이미지 미해결 상태를 인정하는 검사도 그대로 통과했으며 이번 변경에서 이 문제를 해결했다고 주장하지 않습니다.
- `git diff --exit-code -- lib public`: exit 0. `git diff --check`: exit 0.

### 단계 4 — 정식 개선 원장

- `scripts/ledger.mjs add`: exit 0, IMP-0041 verified 등록. evidence는 routing master selftest와 Node compact fixture의 실제 exit입니다. 토큰 절감/운영 성능/배포는 검증 범위에서 제외했습니다.
- `scripts/ledger.mjs render`: exit 0, `docs/IMPROVEMENTS.md` 정식 재생성. 직접 편집하지 않았습니다.
- `scripts/ledger.mjs verify`: exit 0. 로그 `_workspace/workflow-renewal-ledger.log`.
- 추가 변경 파일: `docs/improvements.ledger.json`, `docs/IMPROVEMENTS.md`. 커밋·push·배포·사이트 lib/public·옵시디언·전역 권한/설정 변경 없음.

### 미완 및 운영 한계

- 실제 입력/출력/cache 토큰 및 비용 절감률 unknown. API 실행 없음.
- 새 slim 입력 소비 전환은 하네스 계약과 생성/검증까지이며 모든 외부 실행자 강제 전환은 아님.
- 편집 decision/receipt는 opt-in 최신성 계약입니다. 실제 발표안 승인이나 운영 검사 결과로 대체하지 않습니다.
- HTML 본문 추출은 HTMLParser 보수적 텍스트 투영입니다. 기존 캐시의 과거 원본 복구·렌더 DOM 보존·CSS 가시성/기사 의미 영역 판정은 구현하지 않았습니다.
- 공개 UI 불변이므로 운영 브라우저·배포 검사는 수행하지 않았습니다.

### 최종 재실행 (원장 등록·마지막 코드 보강 이후)

- routing master selftest exit 0. `_workspace/workflow-renewal-selftest.log`에 기존 수집 검사 및 신규 6개 unittest 결과를 보존했습니다. seed 감사 변조와 slim 입력 해시 변조의 거절도 검사했습니다.
- Grok compact fixture exit 0.
- repository close exit 0. `_workspace/workflow-renewal-close.log` 최신 결과이며 IMP-0041의 evidence도 다시 실행됐습니다.
- `git diff --check` exit 0, `git diff --exit-code -- lib public` exit 0.
- 해당 단계 프로젝트 상태는 문서 4개·Grok 스크립트 2개만 변경/추가였습니다. 하네스 파일은 위 목록대로 별도 홈 리포 범위에 있습니다.

### Stage 2 — 독립 검토 후 보강

- 원 독립 검토·benchmark·counterexamples를 읽고 코드 변경 전 `_workspace/workflow-renewal-hardening/source-hashes-before.json`에 123파일 해시를 기록했습니다(exit 0).
- 원 script 중첩 반례는 HTML raw-text 의미상 LEAK가 본문인 것을 HTMLParser 이벤트·설치된 lxml 문서 파서로 확인했습니다. 이 실제 본문을 삭제하지 않고, 유효한 nested template 누출 사례를 보강했습니다. 브라우저 실행은 하지 않았습니다.
- 변경 하네스 파일: `scripts/collection_cache.py`, `scripts/plan_collection_lanes.py`, `scripts/workflow_contract.py`, `scripts/workflow_renewal_selftest.py`, `gates/verify_collection_routing.sh`, `SKILL.md`.
- 정확한 registry id provenance 배정, seed-review 100개 무손실 분할·예산 연결, 새 명시 bound-v1 run 정책, 실제 stdin slim 소비 어댑터·단계별 검사 구현입니다. 기존 run의 정책 미지정 호환성은 보존합니다.
- 새 내부 문서: `docs/WORKFLOW_RENEWAL_HARDENING.md`. 원 평가/점수/benchmark raw 수정 없음.
- routing master selftest exit 0(기존 수집+unittest 10개), Grok fixture exit 0, repository close exit 0. 로그는 `_workspace/workflow-renewal-hardening/` 아래입니다.
- 원 독립 counterexamples 그대로 재실행 exit 1(3 PASS/1 FAIL): 남은 script 사례는 부당한 삭제를 기대하므로 그대로 보존했습니다. 원 log를 덮어쓰지 않고 `independent-rerun.log`에 기록했습니다.
- 전 운영 모델 소비자 연결은 미완입니다. 새 정책 run의 로컬 계약만 검사하며 공급자 usage 없는 곳은 unknown을 유지합니다. 외부 호출·배포·공개 데이터 변경 없음.

### Stage 3 — Fable 재검토 잔여 실제 적용

- 구현 전에 `WORKFLOW_RENEWAL_FABLE_RECHECK.md`와 실제 /AB command·conductor·SKILL 경로를 조사했습니다. 실행형 conductor는 없으며 markdown 지시였습니다. 130파일 해시와 기존 소스 백업을 `_workspace/workflow-renewal-stage3/`에 기록했습니다(exit 0).
- `docs/WORKFLOW_RENEWAL_STAGE3.md`에 기획·요구 매핑·실제 연결 수준·한계를 작성했습니다.
- 신규 `scripts/workflow_stage3_selftest.py`를 먼저 실행: RED exit 1. 기존 구현에 review_bytes/runner가 없어 실패했습니다. `red.log` 보존.
- `plan_collection_lanes.py`: 실제 직렬화 UTF8 64KiB 기본 review 상한, 항목 경계 무손실 분할, 단일 과대 실패 marker, 전 jobs jobInputBytes, 감사 크기 검증, planner 실패 stale 방지.
- 신규 `scripts/workflow_runner.py`: new bound-v1 shadow manifest exclusive 생성, legacy 보존, verify claim→slim stdin→Grok/Anthropic 응답 shape 정규화→실제 usage finish→policy 검사. provider 명령 실패도 failed finish·실패 소비 기록으로 진행 차단. native Agent 사용량은 추정하지 않습니다.
- `SKILL.md` 신규 Luna shadow 정식 단계가 공용 runner를 호출하도록 연결했습니다. topic radar인 vgrok-fetch를 verifier로 가장하지 않았습니다.
- `gates/verify_collection_routing.sh`: Stage3 unittest를 기존 master selftest에 배선했습니다.
- master GREEN exit 0(기존 routing+renewal 10개+stage3 3개), Stage2 독립 recheck exit 0(6개), Node Grok fixture exit 0. 모두 `_workspace/workflow-renewal-stage3/`에 별도 로그입니다.
- 정식 ledger add IMP-0042 verified exit 0, render exit 0. `docs/improvements.ledger.json`, `docs/IMPROVEMENTS.md` 변경. verified는 mock/local 계약 범위입니다.
- 최종 close exit 0(`close.log`), IMP-0042 evidence도 실제 실행했습니다.
- 실제 API/자격증명/네트워크/과금 모델·배포·생산 데이터·옵시디언 실행/변경 없음. 실 토큰/비용 절감 및 전체 native Agent 소비 경로는 미측정/미연결입니다.

### 최종 마감 패스

- 원 기획 WR1~WR6와 단계별 상태를 `docs/WORKFLOW_RENEWAL_FINAL.md`에 대조했습니다. 운영 승인 대기/미완은 로컬 구현 완료와 분리했습니다. 전체 사이트 감사 문서에는 쓰지 않았습니다.
- 실제 source-verifier 출력 조사 후 runner가 `02_verified_sources.json`, `02_risk_flags.json`을 생성하도록 연결했습니다. 모든 input id 보존·필수 판정 필드 검사·출력 해시 결속을 추가했습니다. 변경: `scripts/workflow_runner.py`, `scripts/workflow_contract.py`, `scripts/workflow_stage3_selftest.py`, `SKILL.md`.
- 최종 master exit 0: 기존 routing + renewal 10개 + stage3 4개. Stage2 독립 6개 recheck exit 0.
- 원 benchmark를 별도 `_workspace/workflow-renewal-final-benchmark/`로 복사해 현재 소스로 재측정: benchmark exit 0, before 7/20(35점) gate exit 1, after 20/20(100점) gate exit 0. supplement exit 0. 원 88/78 모델평가 재채점/상향 없음.
- 운영 seed 입력의 기존 failures 5건으로 before/after planner exit 2도 결과에 유지했습니다. 운영 수집 완료라고 주장하지 않습니다.
- 최종 ledger verify exit 0, close exit 0. 증거 `final-ledger.log`, `final-close.log`; 실패·unknown 회귀는 `final-master.log`.
- live provider adapter/native Agent usage 및 유료 모델·운영 실측은 미완/승인 대기입니다. 외부 호출·배포·공개 콘텐츠 변경 없음.

### 최신 요청 반영 — 모델 역할 비용 정책

- `/AB`의 자동 Grok-first와 SKILL legacy 기본값 불일치를 실제 확인하고 최소 수정했습니다. 신규 discovery haiku / fetch-cache-merge 코드 / verifier-normalizer sonnet / 선정·발표안·대본 opus, Grok 기본 disabled로 통일했습니다.
- 변경 파일: `~/.claude/commands/AB.md`, `~/.claude/agents/voidbrief-conductor.md`, `~/.claude/agents/voidbrief-source-verifier.md`, `~/.claude/agents/voidbrief-normalizer.md`, 하네스 `SKILL.md`, `scripts/workflow_runner.py`, `scripts/workflow_stage3_selftest.py`, 이 LOG 및 FINAL.
- 요청별 role map과 Grok false를 runner 신규 manifest에 기록하며 기존 resume와 shadow 금지를 유지합니다. verifier의 출력 계약 보강은 유지합니다.
- 관련 local master 1회 exit 0: 기존 routing+renewal 10개+stage3 5개. 증거 `requested-model-policy.log`. 반복 benchmark·외부 호출·전역 모델설정 수정 없음. 실제 effective model과 비용 절감은 미측정입니다.
- 후속 호환성 검토에서 기본 new를 shadow로 바꾼 회귀를 확인하고 즉시 수정했습니다. production new/plan=legacy-v1·승인후 사이트 작성 유지, 명시 Luna shadow만 bound runner입니다. 저비용 검색은 기존 collector haiku/discovery-only로 적용하고 사실 판정은 sonnet verifier에 남겼습니다. AB:49, conductor:42~43, SKILL:53~57, collector:4/21에 반영했습니다. FINAL도 교정했습니다.
- 기본 경로/승인경계 회귀 검사 추가 후 관련 master 1회 exit 0(기존 routing+renewal10+stage3 6), `production-policy-regression.log`. 모델명은 requested alias이며 actual 미확인입니다. 점수 재평가·benchmark 재실행 없음.






### 메인 세션 재검증

- 구현 담당 종료 후 메인 세션에서 `git diff --check`, `git diff --exit-code -- lib public`, Node compact fixture, routing master selftest를 순차 재실행했습니다. 전체 명령 exit 0.
- Node: `PASS[vgrok-compact] default/opt-in/citations; no API calls; token savings unknown`.
- Routing: 기존 selftest PASS, 신규 unittest 6개 OK, `PASS[collection-routing-master] stage=selftest subgates=2`.
- 이 검증은 로컬 기능과 공개 데이터 불변을 확인합니다. 모든 운영 소비자 연결·실제 토큰 절감·사이트 전체 감사 완료를 뜻하지 않습니다.

### 변경 전후 정량 평가 착수

- 사용자 요청으로 백업된 변경 전 코드와 현재 코드를 동일 입력에서 비교하는 독립 벤치마크를 시작했습니다. 기준은 결과 확인 전에 고정하며 실제 전달 바이트·후보 보존·검사 성공을 측정합니다. 실제 토큰·과금과 혼동하지 않습니다.
- 별도로 Agent `model: fable`을 명시해 독립 검토를 호출했습니다. 요청 모델과 실제 실행 모델의 확인 수준은 구분하며 다른 모델로 대체하지 않습니다.
- 예정 산출물: `docs/WORKFLOW_RENEWAL_BENCHMARK.md`, `docs/WORKFLOW_RENEWAL_FABLE_REVIEW.md`. 아직 결과 미수신이며 점수는 미확정입니다.
- 모델 평가 점수와 결정론 테스트 점수를 분리하고, 운영 연결·실제 비용·사이트 체감 성능의 미측정을 명시합니다.

### 승인된 커밋·배포 실행 — 2026-09-20

- 사용자의 커밋·배포 승인 범위에서 기존 GitHub PUBLIC 저장소와 Vercel 프로젝트 연결을 읽기 전용으로 확인했습니다. main 병합·강제 갱신·홈 리포 push는 하지 않았습니다.
- 사이트 코드 두 파일(`scripts/vgrok-fetch.mjs`, `scripts/test-vgrok-compact.mjs`)만 커밋했습니다. SHA `bf62ecb6481b204851d7e48dc8a939c98a6f0da6`, branch `feature/runway-renewal-20260908-150208`. push exit 0, `git ls-remote` SHA 일치 확인.
- 내부문서 `docs/WORKFLOW_RENEWAL*.md`, `docs/VOIDNEWS_FULL_AUDIT.md` 및 내부 하네스·문서 참조를 포함하는 `docs/improvements.ledger.json`, `docs/IMPROVEMENTS.md`는 로컬 보존·커밋 제외했습니다. 원장을 삭제하거나 검사를 완화하지 않았습니다.
- 전역 AB/voidbrief/briefing-pipeline 변경은 홈 리포 main과 다른 세션의 공유 상태 때문에 브랜치 변경·커밋·push를 보류했습니다. 사이트 커밋이나 Vercel 산출물이 이 로컬 하네스를 배포하는 것은 아닙니다.
- compact 테스트, npm run build, repository master, close, secrets, commit gate, vercel build --prod 모두 exit 0. 로그는 `_workspace/release/ship-20260920/`에 있습니다.
- 첫 로컬 브라우저 검사는 exit 1: output:export 프로젝트에 next start를 사용하여 서버가 종료됐습니다. 소스·검사를 바꾸지 않고 out 정적 서버로 재실행하여 exit 0. 최종 증거 `_workspace/release/2026-09-20T11-09-51-983Z/result.json`: master, browse-and-mobile, image-disclosure-and-failure, ab-reader-and-supplements, all-weekly-images 모두 exit 0.
- 실제 `.vercel/output` 11,736파일 공개경계 검사 exit 1. 기존 두 public manifest(`threads-assets/anthropic-stainless-20260521/manifest.json`, `threads-assets/google-antigravity-20260521/manifest.json`)에 실제 홈 절대경로가 포함되어 있습니다. Vercel 생성 `builds.json`에도 CLI 로컬 경로가 있습니다. 증거 `ship-20260920/output-boundary.json`.
- 위 공개경계 실패로 외부 업로드 전에 중단했습니다. 기존 public 본문·manifest를 임의로 수정하지 않았으며 배포 성공을 주장하지 않습니다. 신규 deployment ID 없음, 운영 주소 대상 신규 배포 후 검사는 미실행입니다.
- 읽기 전용으로 확인한 기존 운영 배포는 `dpl_8cAhTS2kTafJRhT4a7G2PTS61UrK`, Ready, `https://voidnews-archive-nyuqt7w61-voidlight.vercel.app`, 운영 별칭 `https://voidnews-archive.vercel.app`입니다. 이번 변경의 새 배포가 아닙니다.

### 배포 차단 해소 및 실운영 검증 완료

- 위 중단 이후 동일 승인 범위의 최소 보안 수정을 진행했습니다. 두 public manifest 전체와 app/lib/scripts 참조를 읽어 사용하지 않는 제작 경로 필드임을 확인했습니다. 12개 asset의 local_path 및 public_repo_path/public_path 총 24필드만 제거했습니다. 기사·공식 URL·이미지 원본 바이트 변경 없음.
- fix 커밋 `0df993fef6a6e86ff1e69963a81bbff8559616d7`, 동일 feature 브랜치 push exit 0 및 원격 SHA 일치. 기존 Git 이력의 경로 문자열 삭제나 main 병합은 하지 않았습니다.
- 공개 커밋만 독립 로컬 clone한 `ship-20260920/snapshot`에서 검증했습니다. 최초 fresh build는 로컬 provenance 근거 부재로 실패하여 기존 정본 manifest에 해시 결속된 492개 증거만 _workspace에 원형 복원했습니다. 중복 baseline 변경·재생성·게이트 제외 없음. 이어 node_modules 외부 symlink를 Turbopack이 거절하여 설치된 의존성의 독립 사본으로 해결했습니다. 이후 npm run build/master/close/local verify:site/vercel build 모두 exit 0.
- 공개 서빙 경계를 정정합니다. 공식 https://vercel.com/docs/build-output-api/primitives 는 `.vercel/output/static`만 정적 공개경로로 규정하며 외부 파일은 방문자에게 제공하지 않는다고 명시합니다. `builds.json`은 CLI 메타데이터이며 삭제·조작하지 않았습니다. 전체 11,736파일 secrets 검사 및 static 공개 경로·내부문서 검사 PASS. functions 없음. 실제 소스 git diff 없음. `snapshot-output-boundary.json` 보존.
- 최초 prebuilt 배포는 Vercel api-upload-free 5000요청 제한으로 exit 1. CLI 공식 안내 `--archive=tgz`로 동일 산출물 압축 재전송하여 exit 0. 권한·요금제·게이트를 우회하지 않았습니다. 로그 `deploy.log`, `deploy-archive.log` 보존.
- 신규 운영 배포 `dpl_KtJXwVNwnzuf1hyrgoPqCzF8FbKU`, Ready, `https://voidnews-archive-cslpevipp-voidlight.vercel.app`. 운영 별칭 `https://voidnews-archive.vercel.app` 연결 실측. deploy_health exit 0 HTTP 200.
- 운영 `npm run verify:site -- --url https://voidnews-archive.vercel.app` exit 0. master/browse-and-mobile/image-disclosure-and-failure/ab-reader-and-supplements/all-weekly-images 모두 exit 0. 증거 `ship-20260920/snapshot/_workspace/release/2026-09-20T11-26-21-777Z/result.json`.
- 운영 두 manifest HTTP 200, 로컬 안전본 바이트와 일치, 6개 asset씩 보존 및 경로 필드 없음. `/builds.json`, `/.vercel/output/builds.json`, `/docs/WORKFLOW_RENEWAL_LOG.md` HTTP 404. 증거 `production-boundary.json`.
- 내부 문서·로컬 개선 원장·전역 하네스는 앞서 명시한 대로 커밋/배포 제외입니다. 새 사이트 배포가 로컬 모델 역할 하네스의 원격 배포나 실제 토큰 절감 측정을 의미하지 않습니다. 기존 79건 출처 이미지 미해결 범위도 해결했다고 주장하지 않습니다.



