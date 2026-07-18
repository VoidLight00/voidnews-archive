# Radar 통합층 구현 상태

## WP-1 — 전수 커버리지 매트릭스 게이트

- 상태: 완료 (2026-07-18)
- 브랜치: `feature/radar-layer`
- 백업: `backup/SKILL.md`, `backup/references/curator-channels.json`, `backup/references/verify_curator_channels.sh`
- 레지스트리: YouTube 9개 `channelId` 및 `rssUrl` 실측 추가, v1.2. RSS feed 제목 대조 9/9.
- 수집 계약: `01_curator_coverage.json` schemaVersion 2, YouTube `videos[]` 전수에 `promoted` 또는 `skipped:<사유>` 결정 필수.
- 신규 게이트: `check_video_coverage.sh` + Python checker. RSS fetch/parse 실패, 스키마 오류, 미결정 영상 모두 exit 2.
- fixture selftest: 완전 기록 기대 exit 0 / 1건 누락 기대 exit 2를 재현했고 runner exit 0.
- 실 API 스모크 범위: 2026-07-12~2026-07-18. channels=9, videos=25, gate exit 0.
- 추가 검증: curator registry gate exit 0 (`channels=17`, YouTube 9/X 7/web 1), Python compile exit 0.

### WP-1 증거

```text
PASS[video-coverage-selftest] complete=0 missing=2
SELFTEST_EXIT=0
PASS[video-coverage] channels=9 videos=25
LIVE_GATE_EXIT=0
REGISTRY_EXIT=0
PYCOMPILE_EXIT=0
```

## WP-2 — 통합 시드 스키마 + 커뮤니티 어댑터

- 상태: 완료 (2026-07-18)
- 시드 계약: 필수 7필드와 `community-hn`, `community-reddit`, `kakao-room`, `telegram-radar` 열거값을 `seed-schema.md`에 정의.
- 수집기: HN Algolia `search_by_date` + Reddit `top.json?t=week`, 명시적 User-Agent와 요청 간 1초 sleep, 설정 파일 분리.
- fixture selftest: 성공 fixture exit 0/seeds=3, Reddit 1소스 누락 fixture가 실패 기록 후 exit 2. runner exit 0.
- 실 API 스모크 범위: 2026-07-12~2026-07-18. HN seeds=91, Reddit 5개 소스는 HTTP 403 Blocked. 전체 collector는 실패를 숨기지 않고 exit 2, failures=5로 fail-closed 동작 확인.
- Python compile exit 0.

### WP-2 증거

```text
PASS[community-selftest] success_exit=0 fail_closed_exit=2 seeds=3 failures_recorded=1
COMMUNITY_SELFTEST_EXIT=0
COMMUNITY_PYCOMPILE_EXIT=0
COMMUNITY_LIVE_SEEDS=91
COMMUNITY_LIVE_HN=91
COMMUNITY_LIVE_REDDIT=0
COMMUNITY_LIVE_FAILURES=5
COMMUNITY_LIVE_EXIT=2
```

## WP-3 — baeksang.dev 기능 카탈로그

- 상태: 완료 (2026-07-18)
- robots.txt 확인 후 허용 경로만 방문. 총 8페이지로 상한 15 이하.
- `/daily`, `/daily/archive`, 날짜판 5개(2026-07-14~18)를 패턴 분석하고 픽셀·selector는 복제하지 않음.
- 사용자 선택용 체크박스 기능 22개. 각 항목에 정의, VoidNews 이식 형태, 난이도 S/M/L, 기대 효용 포함.
- 문서 lines=199, checkboxes=22, 필수 구조 게이트 exit 0.

### WP-3 증거

```text
BAEKSANG_LINES=199
BAEKSANG_CHECKBOXES=22
BAEKSANG_DOC_GATE_EXIT=0
NO_VERTICAL_STRIPE_EXIT=0
```

## WP-4 — 카카오 AI방 knowhow 설계

- 상태: 완료 (2026-07-18)
- 설계만 작성했으며 kakao-harness 실행, DB 접근, 코드 작성, 옵시디언 쓰기는 하지 않음.
- 기존 canonical normalize, sink contract, room backfill plan/approve/apply, requestHash 결속을 재사용하는 두 갈래 흐름(비공개 신규 노트 + `kakao-room` AB seed)을 명시.
- 신규 컴포넌트 7개와 HARD 게이트 10종, 원본 DB/외부 LLM/옵시디언/AB seed/media 승인 지점을 명시.
- 문서 lines=225, H2=10, 필수 목차 누락=0, 문서 게이트 exit 0.

### WP-4 증거

```text
KAKAO_DESIGN_LINES=225
KAKAO_DESIGN_H2=10
KAKAO_DESIGN_MISSING=0
KAKAO_DESIGN_GATE_EXIT=0
KAKAO_BOUNDARY_GREP_EXIT=0
```
