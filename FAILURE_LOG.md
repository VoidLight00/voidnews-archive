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
