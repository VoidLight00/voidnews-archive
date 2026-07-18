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

- 상태: 병렬 조사 중

## WP-4 — 카카오 AI방 knowhow 설계

- 상태: 대기
