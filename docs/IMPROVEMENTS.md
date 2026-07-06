# VoidNews 개선 이력 (Improvements Ledger)

> SSoT는 `docs/improvements.ledger.json`. 이 파일은 `node scripts/ledger.mjs render`로 자동 생성됨 — 직접 수정 금지.
> 마지막 갱신: 2026-07-07 · 총 17건
>
> `applied`/`verified` 항목은 evidence 체크를 달고 있으며 `node scripts/ledger.mjs verify`가 실측한다(선언≠증거).

## 검증됨 (verified) (8)

| ID | 날짜 | 분류 | 요청/개선 | 파일 | 커밋 |
|---|---|---|---|---|---|
| IMP-0001 | 2026-07-07 | seo | canonical이 전 라우트에서 홈('/')으로 자기선언되던 결함(약 220 URL) 제거 → 라우트별 self-canonical | app/layout.tsx<br>app/[slug]/page.tsx<br>app/[slug]/[postSlug]/page.tsx<br>app/ab/page.tsx<br>app/ab/[edition]/page.tsx<br>app/ab/[edition]/[postSlug]/page.tsx<br>app/presentation/[slug]/page.tsx<br>app/tos/page.tsx | 5aa9c35 |
| IMP-0002 | 2026-07-07 | perf | 22.5MB 썸네일 포함 1MB 초과 이미지 17건 최적화 (JPG 재압축, PNG→webp) | public/og-cache/ | 5aa9c35 |
| IMP-0003 | 2026-07-07 | design | 세로줄(좌측 색 스트라이프 ≥3px) 재유입분 제거 — 영구 금지 규칙 | app/presentation/[slug]/page.tsx<br>app/[slug]/weekly/PostModal.tsx<br>app/[slug]/editorial/editorial.module.css | 5aa9c35 |
| IMP-0004 | 2026-07-07 | seo | 홈 '/'이 빈 __next_error__ 셸(redirect-only)이라 크롤러 백지 → 실콘텐츠 렌더 | app/page.tsx | 5aa9c35 |
| IMP-0005 | 2026-07-07 | seo | 뉴스 아카이브인데 JSON-LD 구조화 데이터 0건 → NewsArticle + BreadcrumbList 주입 | lib/jsonld.ts<br>app/[slug]/[postSlug]/page.tsx<br>app/ab/[edition]/[postSlug]/page.tsx | 5aa9c35 |
| IMP-0006 | 2026-06-30 | design | 좌측 컬러 세로 스트라이프 전면 제거 (AI slop) | app/[slug]/editorial/editorial.module.css | 5bd725f |
| IMP-0007 | 2026-07-02 | feature | RSS 2.0 피드 신설 (/rss.xml) | app/rss.xml/route.ts | d91804b |
| IMP-0008 | 2026-07-02 | feature | sitemap.xml 정적 생성 (229 URL) | app/sitemap.ts | 59bec3c |

## 적용됨 (applied) (3)

| ID | 날짜 | 분류 | 요청/개선 | 파일 | 커밋 |
|---|---|---|---|---|---|
| IMP-0015 | 2026-07-07 | content | dangling 썸네일 6건(ibm-granite 등) — HEAD에도 없는 기존 broken 참조. 재수집 또는 참조 제거 | lib/weeks/2026-w22.ts<br>lib/weeks/2026-w21.ts<br>scripts/check-dangling-thumbs.mjs | — |
| IMP-0016 | 2026-07-07 | ab-data | AB 2026-07a 2주 수집을 오늘(07-07)까지 확장 + AI Search 큐레이터 영상 promote-to-official, 중복 제거 | _workspace/ab/20260703-142555-ab-20260625-20260708/ | — |
| IMP-0017 | 2026-07-06 | ab-data | AI Search 유튜브 영상(qtzzN8w2TvU) promote-to-official — 채널은 이미 레지스트리 등록됨, 영상 18 공식링크 마이닝→6 승격/6 교차검증/그외 radar·병합 | _workspace/ab/20260703-142555-ab-20260625-20260708/01c_curator_video_ingest.json | — |

## 대기 (pending) (6)

| ID | 날짜 | 분류 | 요청/개선 | 파일 | 커밋 |
|---|---|---|---|---|---|
| IMP-0009 | 2026-07-07 | feature | 전역 검색 부재 — 449 포스트 전체 검색(빌드타임 인덱스 + UI). 데이터는 lib/data.ts에 이미 정적 | — | — |
| IMP-0010 | 2026-07-07 | infra | AB run → lib/weeks 정방향 자동 생성기 부재 (격주 수동 반영) | — | — |
| IMP-0011 | 2026-07-07 | infra | 죽은 코드 제거: lib/supabase.ts·supabase-server.ts(importer 0), 미사용 의존성 2, tailwind 유틸 실사용 0 | — | — |
| IMP-0012 | 2026-07-07 | feature | 딥링크 레지스트리 w21·w22 하드코딩 → w23~w26 확장. 단 w23~w26 slug 필드 0개(주입 선행 필요) | lib/editorial.ts | — |
| IMP-0013 | 2026-07-07 | feature | i18n 실효화 — LocaleToggle 적용처 PostDetail 1곳뿐, nav·툴바 하드코딩 | — | — |
| IMP-0014 | 2026-07-07 | perf | next/image 0건 — 빌드타임 이미지 최적화 파이프라인. output:export라 커스텀 loader 필요 | — | — |
