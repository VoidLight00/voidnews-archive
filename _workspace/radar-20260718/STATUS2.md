# Radar Phase 2 구현 상태

## 현재 요약

- 상태: WP-5·WP-6 완료 (2026-07-18), WP-7 진행.
- 브랜치: `feature/radar-layer`; push/deploy 없음.
- 경계 준수: 카카오 DB 접근 0, 옵시디언 쓰기 0, 외부 게시 0.

## WP-6 — baeksang 묶음 A 이식 (사이트 반영)

- 상태: 완료 (2026-07-18)
- ① 날짜 고정 URL: `dateSlug ?? announceDate` 기본값으로 전 8회차 날짜 URL 정적 생성(과거 회차 데이터 소급 수정 0). slug URL은 그대로 동작, canonical과 sitemap은 날짜 URL 단일화.
- ② 호수+날짜 동시 표기: 회차 페이지 kicker `VOL.NN · period`, 인덱스 아카이브 행 `VOL + period`.
- ③ 출처별 수집 건수: `sourceCounts` optional 필드 + 회차 패널 Seeds 블록(데이터 있는 회차만 렌더 — 현재 실측치 있는 회차 없음, 07-12~18 수집분은 차기 회차용).
- ④ 공식 1차 링크 라벨: 기존 구현 확인으로 충족 — SourceAuditStrip "공식 발표"/"공식 · host", collectSourceLinks primary 필드로 backupUrls와 시각 구분(filled 버튼).
- ⑤ HN/Reddit 원 점수 병기: `Post.communityDiscovery` + SourceAuditStrip·PostDetail "발견 · HN N점 경유" 행(데이터 있는 카드만).
- ⑥ cadence 표시: 인덱스 패널 "격주 발행" 하단 "다음 호 2026-07-23 예정"(`nextEditionDate`, 최신 회차만).
- 스키마는 전부 additive optional. 기존 회차 데이터 값 수정 0. `getEditionList()`가 slug를 더 이상 반환하지 않아 깨질 뻔한 `app/page.tsx`·`app/ab/page.tsx`의 `e.slug` 참조를 `href`로 교체.

### WP-6 증거

```text
WP6_BUILD_EXIT=0            # prebuild run-all-gates(ledger verify 포함) + postbuild check-render-leaks 통과
WP6_STRIPE_APP_EXIT=0
WP6_STRIPE_LIB_EXIT=0
WP6_INTERNAL_LEAK_FILES=0   # out/ab/ 에서 WP-*/PLAN2/STATUS2/_workspace/radar-20260718 grep 0
WP6_DATE_URL_STATIC=16paths # /ab/[edition] 8회차 × slug+날짜 URL
WP6_SITEMAP_DATE_ONLY=1     # sitemap에 2026-07-09 1회, /ab/2026-07a/ 0회
WP6_CANONICAL=date-url      # slug/날짜 페이지 모두 canonical=/ab/2026-07-09/
```

### WP-6 변경 파일

- `lib/ab/data.ts`, `lib/data.ts`, `lib/ab/editions/2026-07a.ts`
- `app/ab/page.tsx`, `app/page.tsx`, `app/sitemap.ts`
- `app/ab/[edition]/page.tsx`, `app/ab/[edition]/ABEditionClient.tsx`, `app/ab/[edition]/components/source.tsx`
- `app/[slug]/editorial/PostDetail.tsx`

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
