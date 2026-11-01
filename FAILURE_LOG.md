# VoidNews 배포 종료 실패 기록

기존 결함 정본: `references/FAILURE_LOG.md`.

| date | id | symptom | root cause | fix | gate added |
|---|---|---|---|---|---|
| 2026-09-09 | RESUME-001 | 영문판 검사와 IMP-0019가 실행 오류로 배포를 차단 | 현재 Node 24 배포판의 내장 TypeScript 로딩 비활성화 | 기존 프로젝트 TypeScript로 주간 모듈을 변환하고 구문 오류와 실행 오류는 그대로 실패 처리 | content_gate.sh |
| 2026-09-09 | RESUME-002 | 652px 화면에서 로고·상단 메뉴 단어가 두 줄로 깨짐 | 헤더 전환 지점 640px와 강제 단어 분절 | 820px 두 행 배치 및 라벨 줄바꿈 금지 | test-browse-ui.mjs |

| 2026-09-09 | VN-IMAGE-01 | Source image parser failed on a bare style attribute | HTML boolean attributes may have null values | Normalize attribute values before classification | check-source-image-policy.mjs empty-attribute case |

| 2026-09-09 | VIP-RESELECT-01 | 주요 모델 발표가 빠지고 연동 소식이 VIP 중심으로 선정됨 | 미공개 초안을 기발표 중복으로 처리하고 발표 활용도 검토 부족 | 실제 게시된 회차만 비교하고 지정 6개 본편에 적용법·시연 제안·공식 근거 연결 | check-ab-2026-09a.mjs |
| 2026-09-09 | VIP-REUSE-01 | 주간 기사의 정상적인 AB 해설 재사용이 중복으로 차단됨 | 동일 사건 재해설을 별도 날짜의 사건만 허용하는 경로로 검사 | 검증된 주간 행과 AB 본문·URL 위치를 해시로 결속하는 재사용 경로 및 26개 검증 사례 추가 | check-backfill-integration.mjs |
| 2026-09-09 | VN-IMAGE-02 | 공식 글의 영상 파일·제목 장식이 대표 이미지 후보가 됨 | 영상 src와 poster 미구분 및 제목 내부 장식 미제외 | 영상 정지 이미지 우선, 영상 확장자·제목 내부 장식 제외 | check-source-image-policy.mjs |
| 2026-09-09 | PM-20260909-01 | Weekly 수집 실패를 출처 이미지 부재로 표시 | 오래된 누락 목록과 실제 이미지·화면 검사의 부재 | 현재 기사·근거·파일 해시 결속 및 실패 상태 분리 | check-weekly-source-images.mjs, test-weekly-images-ui.mjs |
| 2026-09-09 | VN-IMAGE-03 | 로컬에서는 열리던 기존 이미지 32개가 운영 서버에서 404 | 파일명의 한글 정규화 차이를 Mac 파일 조회가 숨김 | 동일 바이트 영문 파일명과 32개 경로 교체, 실제 디렉터리 이름 대조 | test-weekly-source-images.mjs Unicode and case traps |
| 2026-09-09 | VN-ASTRA-01 | 설정 예시 뒤 순서가 다시 시작하고 화면에서 목록 번호가 보이지 않음 | Markdown 시작 번호 미보존과 기본 스타일의 목록 기호 제거 | 시작 번호 보존, 본문 숫자·글머리 표시, 긴 설정 문구 줄바꿈 | Astra 실제 화면에서 1·2·3·4 순서와 computed list style 검사 |
| 2026-09-09 | VN-READER-01 | 공개 본문에 발표자 준비 지시와 작성 중 고지가 노출됨 | 독자용 설명과 발표 준비 기록의 분리 부족 | 46곳 방문자 중심 교정, 모델별 입력·결과 자료 분리 | check-ab-2026-09a.mjs 문구·모델 검사 및 실제 화면 검사 |
| 2026-09-23 | VN-IMAGE-04 | openai.com 기사에서 선택기가 관련 기사 카드(“… — Card cover/Card image/Art card”)를 첫 이미지로 고름. 운영 중인 w37 GPT-Live-1 카드가 다른 기사(광고 관련) 표지를 쓰고 있음 | source_image.py 가 본문 밖 추천 글 카드를 기사 상단 이미지와 구분하지 못함 | 2026-09b 9장은 후보를 직접 대조해 선택. w37 카드 교체는 백필 원장 결속 때문에 별도 승인 후 진행 | check-ab-2026-09b.mjs 가 Card image/cover/Art card 후보를 차단(AB 한정). 선택기 자체 수정은 미완 |
| 2026-09-23 | VN-IMAGE-05 | 원본 이미지 2장(1.34MB·2.25MB)이 og-cache 1MB 한도(IMP-0002/0037)를 넘어 빌드 차단 | 원본 바이트 보존 규칙과 용량 한도가 충돌 | 공식 이미지 서버의 WebP 변환본, 저장소 공유 이미지로 대체하고 사유를 SOURCES.json 에 기록 | verify-improvements.mjs (find public/og-cache -size +1M = 0) |
| 2026-09-23 | PM-20260923-01 | 발표 대본이 공식 원문 순서·벤치마크 설명 없이 작성돼 매 회차 실제 발표와 어긋남 | 발표자가 보는 공식 원문 순서라는 기준 데이터와 그것을 강제하는 게이트가 없었음 | 원문 순서 추출 후 대본 재작성, 공용 빌드·검증 도구로 이전 | ~/.claude/skills/voidnews-briefing-pipeline/gates/verify_speaker_script.py, scripts/source_walk.py |
| 2026-09-23 | VN-IMAGE-04 후속 | w37 GPT-Live-1 운영 카드의 잘못된 썸네일 교체 | 관련 글 카드를 기사 이미지로 선택한 선택기 결함 | 기사 상단 이미지로 교체, 조사 기록에 supersedes 보존 | check-weekly-source-images.mjs (선택기 자체 수정은 미완) |
| 2026-10-06 | PM-20261006-01 | 발표 대본이 게이트를 통과하고도 무대에서 읽히지 않고 펜·화면이 실제와 어긋남 | 게이트가 가독성을 검사하지 않았고 펜·화면을 실제 사용 환경(Aside·터치)에서 시험하지 않음 | S8 게이트와 stage_view.py(한 화면씩 큰 글자, 포인터 펜, 찾을 글자, 실제 화면 1장) 신설 | ~/.claude/skills/voidnews-briefing-pipeline/scripts/stage_view.py verify |
| 2026-11-01 | VN-DEPLOY-01 | 리뉴얼 첫 Vercel 미리보기 빌드가 Error로 끝남(승격 전 중단, 운영 영향 없음). 함정 자체시험의 HTML 대조군 4개가 "빌드 폴더에 HTML이 없습니다"로 실패 | .vercelignore의 앞 슬래시 없는 out·.next·_workspace 규칙이 루트 빌드 결과뿐 아니라 scripts/fixtures/renewal-traps/html-site/out/까지 업로드에서 뺌. 로컬 빌드는 파일이 있어 통과 | 세 규칙을 /out·/.next·/_workspace로 루트에 고정. git archive 사본으로 재현(이전 규칙 흉내 rc=1, 14개 실패)과 수정 확인(rc=0, 함정 27개 검출) | scripts/check-renewal-gates.selftest.mjs(배포 빌더에서도 prebuild로 실행) |
| 2026-11-01 | VN-TEST-01 | /privacy/·/newsletter/의 줄바꿈 결함 13건(호스트 이름이 점에서 끊기고 여는 괄호가 줄 끝에 남음)이 리뉴얼 브라우저 시험을 통과함. Aislop 감사에서 처음 발견 | 시험이 Chromium만 실행함. WebKit 26은 한국어 keep-all 문단 안의 호스트 이름을 점에서 끊고, 같은 위치를 lang="en" 구간으로 감싸면 끊지 않음(조사가 바로 붙으면 감싸도 끊음). 기존 어절·영문 분리 검사는 문장부호 경계의 줄바꿈을 실패로 보지 않음 | 호스트 이름을 <span lang="en">으로 감쌈(d7f341c). 시험에 WebKit 실행(설치된 가장 새 WebKit 빌드로 대체 실행)과 줄바꿈 금지 위치 검사를 추가. 보정은 한 번 실행한 측정이며 정기 시험에 들어 있지 않음: 호스트 이름을 한국어 문장에 되돌린 사본을 300~430px 27개 너비에서 재서 WebKit 65건, Chromium 0건, 기존 검사 0건. 정기 자체시험: 고친 /privacy/ 두 엔진 0건, 호스트 함정 12구간을 풀면 WebKit inDotted 9건·Chromium 0건, 종류별 표본 WebKit afterOpen 134·inDotted 94·dotParticle 7건, Chromium afterOpen·inDotted 0건(dotParticle 7건은 Chromium도 끊어 허용). 검사 규칙을 하나씩 망가뜨린 변이 M1(여는 괄호 규칙 무효)·M2(dotParticle 제거)·M3(줄 판정 끔)은 모두 exit 1 | test-renewal-ui.mjs --engine webkit, test-renewal-ui.selftest.mjs |
