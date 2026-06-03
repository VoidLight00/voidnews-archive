# VoidNews AB 실패 기록 + 회귀 방지 (SSoT)

VoidNews AI Briefing 하네스가 과거에 실제로 틀렸던 사례를 보존하고, **각 사례가 다음 빌드/실행에서 자동으로 재검사되도록** 한다.
키노트 명제 "기억 = 다음 실행의 조건"을 코드로 구현한 것.

## 동작 방식

- 머신 체크는 `references/regressions.json`에 선언한다.
- `scripts/check-regressions.mjs`가 그 선언을 읽어 `lib/`·`app/`에 회귀를 검사한다.
- `package.json`의 `prebuild`가 `check-slugs && check-regressions && check-card-content`로 체이닝되고, `postbuild`가 `check-render-leaks`로 체이닝되어, **매 `npm run build`(Vercel CI 포함) 때마다** 과거 회귀가 자동 재검사된다.
- 회귀 1건이라도 발견되면 `process.exit(1)`로 빌드를 차단한다.

## 머신 게이트 인벤토리 (HARD)

| 게이트 | 시점 | 검사 | 차단 |
|---|---|---|---|
| `check-slugs.mjs` | prebuild | 비-ASCII slug | exit 1 |
| `check-regressions.mjs` | prebuild | `regressions.json` grep 회귀 | exit 1 |
| `check-card-content.mjs` | prebuild | 미지원 마크다운(h5/h6·`![img]`·`---`) → raw 노출 / 본문 풍부도(WARN) | exit 1 |
| `check-render-leaks.mjs` | postbuild | 빌드된 `out/**/*.html` `<article>` 본문의 raw 마크다운(`##`·`**`·백틱) 누수 | exit 1 |
| `verify-publish-ready.mjs` | publish | 썸네일/broken image + 위 2개 재확인 | exit 2 |

## 규칙 승격 경로 (발견 → 영구 회귀체크)

QA(`voidbrief-qa-auditor`)나 사용자가 새 결함을 발견하면:
1. 아래에 `### VN0NN` 항목을 추가한다(증상·원인·담당 에이전트).
2. 머신 검사 가능하면 `references/regressions.json`에 항목을 추가한다(`grep_absent` / `grep_present_min`).
3. 다음 빌드부터 사람이 기억하지 않아도 `check-regressions.mjs`가 자동 재검사한다.
4. publish-ready 자체의 coverage(썸네일/deck)는 `scripts/verify-publish-ready.mjs`가 별도로 강제한다.

---

## 회귀 항목

### VN001 — 내부 큐레이션 메모가 공개 카드 본문에 노출 (2026-05)
- 증상: "Tier S+A 후보 풀", "사용자가 top10 선정 후" 같은 진행자 인터널 문구가 사이트 카드에 새어 나감.
- 원인: 작업 메모를 그대로 summary/content에 복사.
- 담당: `voidbrief-copy-editor` (Phase 6). 머신체크: `regressions.json` VN001 (grep_absent).

### VN002 — non-ASCII slug로 Vercel 정적 라우트 404 (2026-05-28, Grok Build 카드)
- 증상: 한글이 들어간 slug가 Next.js 16 static export에서 404.
- 원인: slug에 비-ASCII 문자.
- 담당: `voidbrief-site-writer` (Phase 5). 머신체크: `scripts/check-slugs.mjs` (이미 prebuild HARD, exit 1). 본 로그는 출처 기록용.

### VN003 — 카드 썸네일 미해결을 산문 판정으로 통과 (2026-06-02 보강)
- 증상: `_workspace/thumbnails/missing.json`에 항목이 남아 있어도 에이전트가 publish-ready로 판정.
- 원인: Phase 7 게이트가 코드 exit가 아닌 에이전트 자기보고(SOFT).
- 담당: `voidbrief-qa-auditor` (Phase 7). 머신체크: `scripts/verify-publish-ready.mjs` (missing.json 비어있지 않으면 exit 2, HARD).

### VN-RENDER-LEAK — 카드 본문 마크다운이 화면에 raw로 노출 (2026-06-03)
- 증상: 상세 페이지·발표 페이지·카드 목록에서 `### 소제목`, 불릿 `- `, 번호 `1.`, 인라인 `` `code` ``, summary 백틱이 HTML로 변환되지 않고 글자 그대로 노출. 특히 "리드 문장 + 불릿"이 빈 줄 없이 한 블록일 때 광범위하게 발생(2026-04a·w15·w16 등 다수 카드).
- 원인: (1) `PostDetail.tsx renderMarkdown`이 `## h2`와 "블록 전체가 리스트"인 경우만 처리 — `###`/`####` 미지원, mixed 블록(리드+불릿) 미처리, 인라인 백틱 미처리. (2) `articleDek`/officialExcerpt가 renderInline을 안 거침. (3) `presentation/[slug] renderRichText`가 `**bold**`만 처리. (4) `summary` 필드에 백틱이 들어가 평문 출력처(카드/메타/dek)에서 raw 노출.
- 해결: `renderMarkdown`을 **라인 단위 파서**로 재작성(h2~h4·불릿·번호·인용·인라인 `**`/`` ` ``/`[]()` 처리, mixed 블록 분리). dek·official 발췌도 `renderInline`. `presentation`의 `renderRichText`도 라인 파서로 교체. summary 백틱 제거.
- 담당: 렌더러(`PostDetail`/`presentation`), 작성(`voidbrief-site-writer`). 머신체크: `scripts/check-card-content.mjs`(prebuild, 미지원 마크다운 → exit 1) + `scripts/check-render-leaks.mjs`(postbuild, 빌드 HTML raw 누수 → exit 1). 둘 다 HARD. **renderMarkdown에 새 문법을 추가하면 게이트가 자동으로 통과/실패를 동기화** — 렌더러가 처리 못 하는 문법만 빌드 HTML에 남아 검출되기 때문.
