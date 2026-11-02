#!/usr/bin/env node
// check-ai-author-label.mjs — AI 작성 표시 HARD 게이트(리뉴얼 계획 R3·3절, REQUIREMENTS R21)
//
// 왜: 방문자가 카드와 기사를 AI가 썼는지 알 수 있어야 합니다.
// 라벨은 데이터가 아니라 lib/authorship.ts 규칙으로 붙으므로, 매일 게시 작업이 카드를 더해도
// 이 게이트는 계속 통과해야 하고(계획 5.5절), 표시 위치 하나가 빠지면 실패해야 합니다.
// '자동 게시'라는 표현은 쓰지 않습니다(2026-11-02 사용자 요청). 이전에는 규칙 대상 카드에 반드시 붙여야 했지만,
// 이제 라벨·사전·AuthorBadge 어디에든 다시 나타나면 실패합니다. 게시기 표식은 출처 기록으로만 판정합니다.
//
// 원본 검사(prebuild): i18n 라벨 2개와 금지 표현, 판정 규칙의 경계값, AuthorBadge의 그림 계약과 금지 표현,
//   계획 R3 표의 표시 위치 12곳(구성요소 9개 파일, 발표 하이라이트 포함)이 AuthorBadge를 그리는지 확인합니다.
// 빌드 검사(--html, postbuild): 주간 페이지의 카드마다 라벨 1개('피움 작성 · AI' 그대로, '자동 게시' 없음),
//   기사 상세마다 48px 바이라인 1개, AB 카드·기사의 라벨, 발표 하이라이트(featured 글)마다 라벨을 확인합니다.
//   --data <json>  주간 데이터 대신 읽을 자료({ weeks: [{ slug, posts: [{ slug, title, autoPublished }] }] }, 함정 시험용)
// 종료 코드: 0 통과 · 1 위반 · 2 입력 오류(out/ 없음 포함)
import fs from "node:fs";
import path from "node:path";
import {
  InputError, createReporter, findAll, findFunction, hasAttr, hasClass, innerText, jsxAttributes, jsxOpenings,
  loadTsModule, parseSource, readPage, readText, requireOut, runGate, stringPieces,
} from "./lib/renewal-gate-kit.mjs";

const GATE = "ai-author-label";
const LABELS = {
  ko: { pium: "피움 작성 · AI" },
  en: { pium: "Written by Pium · AI" },
};
// 쓰지 않는 표현(2026-11-02 사용자 요청). 사전·AuthorBadge의 문자열과 빌드 라벨에서 찾습니다. 기사 본문은 보지 않습니다.
const FORBIDDEN = /자동\s*게시|auto-?published/i;
const AVATAR = "/brand/pium.svg";
// 계획 R3 표의 표시 위치: [파일, 그 안의 구성요소 함수, 필요한 크기(없으면 24px 기본값)]
const LOCATIONS = [
  ["app/[slug]/weekly/feed.tsx", "TopStoriesSection"],
  ["app/[slug]/weekly/feed.tsx", "FeedArticleCard"],
  ["app/[slug]/weekly/PostCard.tsx", "PostCard"],
  ["app/[slug]/weekly/PostModal.tsx", "PostModal"],
  ["app/[slug]/editorial/PostCard.tsx", "PostCard"],
  ["app/ab/[edition]/components/cards.tsx", "HighlightArticle"],
  ["app/ab/[edition]/components/cards.tsx", "DemoCard"],
  ["app/ab/[edition]/components/cards.tsx", "EditorPickCard"],
  ["app/ab/[edition]/components/PickModal.tsx", "PickModal"],
  ["app/ab/[edition]/components/HighlightDetail.tsx", "HighlightDetail"],
  ["app/[slug]/editorial/PostDetail.tsx", "PostDetail", "48"],
  // 발표 하이라이트도 AI가 쓴 요약·본문을 그대로 보여 주고 sitemap에 있습니다(2026-11-01 독립 검토 지적).
  ["app/presentation/[slug]/page.tsx", "PresentationPage"],
];
const BADGE_IMPORT = "@/app/components/AuthorBadge";

// ── 원본 ─────────────────────────────────────────────────────────────

function checkLabelsAndRule(root, report) {
  const { t } = loadTsModule(path.join(root, "lib/i18n.ts"));
  for (const [locale, want] of Object.entries(LABELS)) {
    if (t(locale, "author.pium") !== want.pium) report.fail("label-text", `lib/i18n.ts ${locale} author.pium = ${JSON.stringify(t(locale, "author.pium"))} — 기대 ${JSON.stringify(want.pium)}`);
  }
  const i18n = "lib/i18n.ts";
  for (const piece of stringPieces(parseSource(i18n, readText(root, i18n)))) {
    if (FORBIDDEN.test(piece.text)) report.fail("label-text", `${i18n}: 쓰지 않는 표현 ${JSON.stringify(piece.text)}(2026-11-02 사용자 요청)`);
  }
  const authorship = loadTsModule(path.join(root, "lib/authorship.ts"));
  if (authorship.AI_AUTHOR_NAME !== "피움(VoidNews AI)") report.fail("rule", `AI_AUTHOR_NAME = ${JSON.stringify(authorship.AI_AUTHOR_NAME)}`);
  // 판정 규칙의 경계값(R3·R24). 규칙을 바꾸면 이 표를 같은 커밋에서 고칩니다.
  // 게시기 표식 판정(autoPublished)은 출처 기록이며 화면에 그리지 않습니다. 표식이나 표식 도입 전 목록으로만 정합니다.
  const cases = [
    [{ scope: "2026-w44", slug: "rule-probe", title: "probe", autoPublished: true }, true, true],
    [{ scope: "2026-w44", slug: "rule-probe", title: "probe", autoPublished: false }, true, false],
    [{ scope: "2026-w44", slug: "rule-probe", title: "probe" }, true, false],
    [{ scope: "2026-w44", slug: "ibm-granite-switch-4-1-1", title: "legacy" }, true, true],
    [{ scope: "2026-w43", slug: "exa-3-0-search-launch", title: "Exa" }, true, false],
    [{ scope: "ab", slug: "rule-probe", title: "probe", autoPublished: true }, true, false],
  ];
  for (const [subject, ai, auto] of cases) {
    const got = authorship.getAuthorship(subject);
    if (got.ai !== ai || got.autoPublished !== auto) report.fail("rule", `getAuthorship(${JSON.stringify(subject)}) = ${JSON.stringify(got)} — 기대 ai ${ai}, 게시기 표식 ${auto}`);
  }
  for (const key of authorship.HUMAN_WRITTEN ?? []) {
    const cut = key.lastIndexOf("/");
    const got = authorship.getAuthorship({ scope: key.slice(0, cut), slug: key.slice(cut + 1), title: key.slice(cut + 1) });
    if (got.ai) report.fail("rule", `사람 작성 목록의 ${key}에 AI 표시가 붙습니다`);
  }
}

function checkBadge(root, report) {
  const rel = "app/components/AuthorBadge.tsx";
  const source = parseSource(rel, readText(root, rel));
  const strings = stringPieces(source).map((piece) => piece.text);
  const pieces = new Set(strings);
  for (const needed of ["data-ai-author", "author.pium", AVATAR]) {
    if (!pieces.has(needed)) report.fail("badge", `${rel}: '${needed}'가 없습니다`);
  }
  for (const text of strings) if (FORBIDDEN.test(text) || text === "author.autoPublished") report.fail("badge", `${rel}: 쓰지 않는 표현 ${JSON.stringify(text)}`);
  const openings = jsxOpenings(source);
  const images = openings.filter((item) => item.tag === "img").map((item) => jsxAttributes(item.node));
  if (!images.some((attrs) => attrs.alt?.text === "")) report.fail("badge", `${rel}: 라벨 옆 피움 그림은 장식이라 alt=""여야 합니다(계획 3.3절 6항)`);
  if (openings.some((item) => Object.hasOwn(jsxAttributes(item.node), "data-auto-published"))) {
    report.fail("badge", `${rel}: '자동 게시' 표시(data-auto-published)를 그립니다 — 2026-11-02부터 쓰지 않습니다`);
  }
}

function checkLocations(root, report) {
  const parsed = new Map();
  for (const [rel, fn, size] of LOCATIONS) {
    if (!parsed.has(rel)) {
      const text = readText(root, rel);
      parsed.set(rel, parseSource(rel, text));
      if (!new RegExp(`import\\s*\\{[^}]*\\bAuthorBadge\\b[^}]*\\}\\s*from\\s*["']${BADGE_IMPORT}["']`).test(text)) {
        report.fail("location", `${rel}: AuthorBadge를 ${BADGE_IMPORT}에서 가져오지 않습니다`);
      }
    }
    const body = findFunction(parsed.get(rel), fn);
    if (!body) { report.fail("location", `${rel}: 표시 위치 ${fn}을 찾지 못했습니다`); continue; }
    const badges = jsxOpenings(body).filter((item) => item.tag === "AuthorBadge").map((item) => jsxAttributes(item.node));
    if (!badges.length) report.fail("location", `${rel} ${fn}: AuthorBadge를 그리지 않습니다(계획 R3 표시 위치)`);
    for (const attrs of badges) {
      const got = attrs.size?.expression ?? attrs.size?.text ?? "24";
      if (!["24", "48"].includes(got)) report.fail("location", `${rel} ${fn}: 피움 크기 ${got} — 24px의 정수배(24·48)만 씁니다`);
      if (size && got !== size) report.fail("location", `${rel} ${fn}: 바이라인 크기 ${got} — 기대 ${size}`);
    }
  }
}

// ── 빌드 HTML ─────────────────────────────────────────────────────────

function loadWeeks(root, dataFile) {
  if (dataFile) {
    try {
      return JSON.parse(fs.readFileSync(dataFile, "utf8")).weeks;
    } catch (error) {
      throw new InputError(`--data 파일을 읽지 못했습니다: ${dataFile} (${error.message})`);
    }
  }
  const { weeks } = loadTsModule(path.join(root, "lib/data.ts"));
  return weeks.map((week) => ({
    slug: week.slug,
    posts: week.companies.flatMap((company) => company.posts.map(({ slug, title, autoPublished, featured }) => ({ slug, title, autoPublished: autoPublished === true, featured: Boolean(featured) }))),
  }));
}

/** 카드 주소에서 [주차, 글]을 읽습니다. slug가 없는 글은 /주차?post=제목 형식이라 제목으로 찾습니다(feed.tsx getPostIssueHref). */
function cardTarget(card, week) {
  const anchor = card.tag === "a" ? card : findAll(card, (el) => el.tag === "a" && el.attrs.href)[0];
  try {
    const url = new URL(anchor?.attrs.href ?? "", "https://local.invalid");
    const [weekSlug, slug] = decodeURIComponent(url.pathname).split("/").filter(Boolean);
    const title = url.searchParams.get("post");
    const post = weekSlug !== week.slug ? undefined : slug ? week.posts.find((item) => item.slug === slug) : week.posts.find((item) => !item.slug && item.title === title);
    return { label: `${weekSlug}/${slug ?? title}`, post };
  } catch {
    return { label: anchor?.attrs.href ?? "(주소 없음)", post: undefined };
  }
}

/** 라벨 요소 하나가 계약('피움 작성 · AI' 그대로, '자동 게시' 없음, 피움 그림)과 맞는지 보고 문제 목록을 돌려줍니다. */
function badgeProblems(badge, sizes) {
  const problems = [];
  const text = innerText(badge);
  if (findAll(badge, (el) => hasAttr(el, "data-auto-published")).length || FORBIDDEN.test(text)) {
    problems.push(["auto", `'자동 게시' 표시가 있습니다('${text}') — 2026-11-02부터 쓰지 않습니다`]);
  }
  if (!Object.values(LABELS).some((l) => l.pium === text)) problems.push(["text", `라벨 글자 '${text}'`]);
  const img = findAll(badge, (el) => el.tag === "img")[0];
  const width = Number(img?.attrs.width);
  if (!img || !img.attrs.src?.endsWith(AVATAR) || img.attrs.alt !== "" || !sizes.includes(width)) {
    problems.push(["avatar", `피움 그림 ${img ? `src=${img.attrs.src} alt=${JSON.stringify(img.attrs.alt)} width=${img.attrs.width}` : "없음"}`]);
  }
  return problems;
}

function checkWeeklyPage(outDir, rel, week, ctx, report) {
  const cards = findAll(readPage(outDir, rel), (el) => hasAttr(el, "data-weekly-card"));
  if (!cards.length) report.fail("coverage", `${rel}: 카드 표식(data-weekly-card)이 없습니다`);
  cards.forEach((card, index) => {
    const { label, post } = cardTarget(card, week);
    const where = `${rel} 카드 ${index + 1}(${label})`;
    if (!post) { report.fail("card-unknown", `${where}: 주소가 이 주차의 글과 맞지 않습니다`); return; }
    const expected = ctx.getAuthorship({ scope: week.slug, slug: post.slug, title: post.title, autoPublished: post.autoPublished });
    const badges = findAll(card, (el) => hasAttr(el, "data-ai-author"));
    ctx.cards += 1;
    if (badges.length !== (expected.ai ? 1 : 0)) { report.fail("card-label", `${where}: 라벨 ${badges.length}개 — 기대 ${expected.ai ? 1 : 0}개`); return; }
    if (!badges.length) return;
    ctx.labels += 1;
    for (const [code, detail] of badgeProblems(badges[0], [24])) report.fail(`card-${code}`, `${where}: ${detail}`);
  });
}

function checkArticlePage(outDir, rel, subject, ctx, report) {
  const expected = ctx.getAuthorship(subject);
  const bylines = findAll(readPage(outDir, rel), (el) => hasAttr(el, "data-ai-author") && el.attrs["data-size"] === "48");
  ctx.articles += 1;
  if (bylines.length !== (expected.ai ? 1 : 0)) { report.fail("byline", `${rel}: 48px 바이라인 라벨 ${bylines.length}개 — 기대 ${expected.ai ? 1 : 0}개`); return; }
  if (!bylines.length) return;
  for (const [code, detail] of badgeProblems(bylines[0], [48])) report.fail(`byline-${code}`, `${rel}: ${detail}`);
}

function checkAbEditionPage(outDir, rel, ctx, report) {
  const cards = findAll(readPage(outDir, rel), (el) => el.tag === "article" && hasClass(el, "tc-feed-card"));
  let labeled = 0;
  for (const card of cards) {
    const badges = findAll(card, (el) => hasAttr(el, "data-ai-author"));
    if (badges.length > 1) report.fail("ab-card-label", `${rel}: AB 카드 하나에 라벨 ${badges.length}개`);
    if (badges.length) labeled += 1;
    for (const badge of badges) {
      for (const [code, detail] of badgeProblems(badge, [24])) report.fail(`ab-card-${code}`, `${rel}: ${detail}`);
    }
  }
  if (labeled < cards.length - ctx.humanAb) report.fail("ab-card-label", `${rel}: AB 카드 ${cards.length}개 중 라벨 ${labeled}개`);
  ctx.abCards += cards.length;
}

/** 발표 페이지: 하이라이트 블록 수 = 데이터의 featured 글 수, 블록마다 제목으로 글을 찾아 규칙대로 라벨 0·1개. */
function checkPresentationPage(outDir, rel, week, ctx, report) {
  const featured = week.posts.filter((post) => post.featured);
  const blocks = findAll(readPage(outDir, rel), (el) => hasAttr(el, "data-presentation-highlight"));
  if (blocks.length !== featured.length) report.fail("presentation-coverage", `${rel}: 하이라이트 ${blocks.length}개 — 데이터의 featured 글 ${featured.length}개`);
  blocks.forEach((block, index) => {
    const heading = findAll(block, (el) => el.tag === "h2")[0];
    const title = heading ? innerText(heading).trim() : "";
    const where = `${rel} 하이라이트 ${index + 1}(${title || "제목 없음"})`;
    const post = featured.find((item) => item.title === title);
    if (!post) { report.fail("presentation-unknown", `${where}: 제목이 이 주차의 featured 글과 맞지 않습니다`); return; }
    const expected = ctx.getAuthorship({ scope: week.slug, slug: post.slug, title: post.title, autoPublished: post.autoPublished });
    const badges = findAll(block, (el) => hasAttr(el, "data-ai-author"));
    ctx.highlights += 1;
    if (badges.length !== (expected.ai ? 1 : 0)) { report.fail("presentation-label", `${where}: 라벨 ${badges.length}개 — 기대 ${expected.ai ? 1 : 0}개`); return; }
    for (const badge of badges) for (const [code, detail] of badgeProblems(badge, [24])) report.fail(`presentation-${code}`, `${where}: ${detail}`);
  });
}

function checkPages(root, outDir, dataFile, report) {
  const pages = new Set(requireOut(outDir));
  const authorship = loadTsModule(path.join(root, "lib/authorship.ts"));
  const human = [...(authorship.HUMAN_WRITTEN ?? [])];
  const ctx = { getAuthorship: authorship.getAuthorship, humanAb: human.filter((key) => key.startsWith("ab/")).length, cards: 0, labels: 0, articles: 0, abCards: 0, highlights: 0 };
  // 표식 도입 전 목록(R24)의 키가 실제 주간 카드를 가리키는지 봅니다. 오타가 있으면 그 카드의 게시기 판정(출처 기록)이 조용히 빠집니다.
  // 함정 시험의 가상 자료(--data)에는 실제 카드가 없으므로 건너뜁니다. 원본 함정 사본에는 lib/weeks가 없어 이 검사를 빌드 단계에 둡니다.
  if (!dataFile) {
    const keys = new Set(loadWeeks(root, null).flatMap((week) => week.posts.map((post) => `${week.slug}/${post.slug || post.title}`)));
    const legacy = [...(authorship.LEGACY_AUTO_PUBLISHED ?? [])];
    if (!legacy.length) report.fail("legacy", "LEGACY_AUTO_PUBLISHED가 비어 있습니다 — 표식 도입 전 게시기 카드의 출처 기록이 빠집니다");
    for (const key of legacy) if (!keys.has(key)) report.fail("legacy", `LEGACY_AUTO_PUBLISHED의 ${key}에 해당하는 주간 카드가 없습니다`);
  }
  for (const week of loadWeeks(root, dataFile)) {
    const rel = `${week.slug}/index.html`;
    if (!pages.has(rel)) { report.fail("coverage", `${rel}: 주간 페이지가 빌드에 없습니다`); continue; }
    checkWeeklyPage(outDir, rel, week, ctx, report);
    // 기사 상세는 slug가 있는 글만 만들어집니다(app/[slug]/[postSlug]). slug가 있는데 페이지가 없으면 빌드 결과가 깨진 것입니다.
    for (const post of week.posts.filter((item) => item.slug)) {
      const subject = { scope: week.slug, slug: post.slug, title: post.title, autoPublished: post.autoPublished };
      const article = `${week.slug}/${post.slug}/index.html`;
      if (!pages.has(article)) { report.fail("coverage", `${article}: 기사 상세가 빌드에 없습니다`); continue; }
      checkArticlePage(outDir, article, subject, ctx, report);
    }
    const presentation = `presentation/${week.slug}/index.html`;
    if (pages.has(presentation)) checkPresentationPage(outDir, presentation, week, ctx, report);
    else if (week.posts.some((post) => post.featured)) report.fail("coverage", `${presentation}: 발표 페이지가 빌드에 없습니다`);
  }
  for (const rel of pages) {
    const parts = rel.split("/");
    if (parts[0] !== "ab" || parts.at(-1) !== "index.html") continue;
    if (parts.length === 3) checkAbEditionPage(outDir, rel, ctx, report);
    if (parts.length === 4) checkArticlePage(outDir, rel, { scope: "ab", slug: parts[2], title: parts[2] }, ctx, report);
  }
  if (!ctx.cards || !ctx.articles) report.fail("coverage", `검사한 카드 ${ctx.cards}개 · 기사 ${ctx.articles}개 — 측정 없이 통과하지 않습니다`);
  report.note(`주간 카드 ${ctx.cards}개 · 라벨 ${ctx.labels}개 · 기사 ${ctx.articles}개 · AB 카드 ${ctx.abCards}개 · 발표 하이라이트 ${ctx.highlights}개`);
}

runGate(GATE, (opts) => {
  const report = createReporter(GATE);
  if (opts.html) {
    checkPages(opts.root, opts.out, opts.options.data ? path.resolve(opts.options.data) : null, report);
    return report.finish("빌드 페이지의 카드·기사 라벨이 lib/authorship.ts 규칙과 같고 '자동 게시' 표시가 없습니다.");
  }
  checkLabelsAndRule(opts.root, report);
  checkBadge(opts.root, report);
  checkLocations(opts.root, report);
  return report.finish(`라벨 2개와 금지 표현, 판정 규칙 경계값, AuthorBadge 계약, 표시 위치 ${LOCATIONS.length}곳을 확인했습니다.`);
});
