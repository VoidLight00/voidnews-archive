# Radar Phase 2 구현 상태

## 현재 요약

- 상태: WP-5 완료 (2026-07-18), WP-6 대기.
- 브랜치: `feature/radar-layer`; push/deploy 없음.
- 경계 준수: 카카오 DB 접근 0, 옵시디언 쓰기 0, 외부 게시 0.

## WP-5 — Reddit 403 대응

- 상태: 완료 (2026-07-18)
- 지정된 접근 전략을 순서대로 실측했다. 서술형 User-Agent, `api.reddit.com`, `old.reddit.com` 모두 5/5 HTTP 403이었고, sleep 증가와 최대 3회 backoff도 각 소스 3/3 HTTP 403이었다.
- 우회나 브라우저 위장 없이 `community-sources.json`에서 Reddit을 `enabled: false`로 명시 비활성화하고 `disabledReason: "HTTP 403 2026-07-18"`을 기록했다.
- collector는 명시 비활성 Reddit 5개를 `status: disabled`와 사유로 출력하며 실패로 집계하지 않는다. 활성 소스의 fetch/parse 실패는 기존처럼 exit 2로 fail-closed다.
- 수정 전 라이브 스킬 파일 3개를 `backup/`에 복사했고, `skill-overlay/`와 라이브 스킬의 SHA-256 불일치는 0개다.
- fixture selftest에 명시 비활성 경로를 추가했다. 정상 fixture exit 0, 활성 Reddit 누락 fixture exit 2, 명시 비활성 fixture exit 0을 한 러너에서 검증했다.
- 실 API 스모크 범위: 2026-07-12~2026-07-18. HN seeds=91, Reddit seeds=0, disabled Reddit sources=5, failures=0, collector exit 0.

### WP-5 증거

```text
STAGE1_DESCRIPTIVE_UA_HTTP_403=5/5
STAGE2_API_REDDIT_HTTP_403=5/5
STAGE3_OLD_REDDIT_HTTP_403=5/5
STAGE4_BACKOFF_HTTP_403=15/15
PASS[community-selftest] success_exit=0 fail_closed_exit=2 disabled_exit=0 seeds=3 failures_recorded=1 disabled_sources=2 disabled_reason=HTTP_403_2026-07-18
WP5_SELFTEST_EXIT=0
WP5_PYCOMPILE_EXIT=0
PASS[community-collector] seeds=91 sources=6 failures=0
WP5_LIVE_SEEDS=91
WP5_LIVE_HN=91
WP5_LIVE_REDDIT=0
WP5_LIVE_FAILURES=0
WP5_LIVE_DISABLED=5
WP5_LIVE_DISABLED_REASONS=HTTP 403 2026-07-18
WP5_LIVE_EXIT=0
WP5_OVERLAY_LIVE_FILES=3
WP5_OVERLAY_LIVE_MISMATCHES=0
```

### WP-5 변경 파일

- `_workspace/radar-20260718/skill-overlay/scripts/collect_community.py`
- `_workspace/radar-20260718/skill-overlay/scripts/collect_community_selftest.sh`
- `_workspace/radar-20260718/skill-overlay/references/community-sources.json`
- `_workspace/radar-20260718/backup/scripts/collect_community.py`
- `_workspace/radar-20260718/backup/scripts/collect_community_selftest.sh`
- `_workspace/radar-20260718/backup/references/community-sources.json`
- `_workspace/radar-20260718/wp5-live-community-seeds.json`
- `_workspace/radar-20260718/STATUS2.md`
