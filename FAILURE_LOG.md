# VoidNews 배포 종료 실패 기록

기존 결함 정본: `references/FAILURE_LOG.md`.

| date | id | symptom | root cause | fix | gate added |
|---|---|---|---|---|---|
| 2026-09-09 | RESUME-001 | 영문판 검사와 IMP-0019가 실행 오류로 배포를 차단 | 현재 Node 24 배포판의 내장 TypeScript 로딩 비활성화 | 기존 프로젝트 TypeScript로 주간 모듈을 변환하고 구문 오류와 실행 오류는 그대로 실패 처리 | content_gate.sh |
| 2026-09-09 | RESUME-002 | 652px 화면에서 로고·상단 메뉴 단어가 두 줄로 깨짐 | 헤더 전환 지점 640px와 강제 단어 분절 | 820px 두 행 배치 및 라벨 줄바꿈 금지 | test-browse-ui.mjs |

| 2026-09-09 | VN-IMAGE-01 | Source image parser failed on a bare style attribute | HTML boolean attributes may have null values | Normalize attribute values before classification | check-source-image-policy.mjs empty-attribute case |
