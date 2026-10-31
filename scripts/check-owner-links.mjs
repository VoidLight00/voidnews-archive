#!/usr/bin/env node
// check-owner-links.mjs — 운영자 연결 링크 HARD 게이트(리뉴얼 계획 R1, REQUIREMENTS R19)
//
// 왜: 사용자 요청은 '아래 연결(sns, 깃허브, 트위터, 스레드, 카카오톡 등)을 내 것으로 변경'입니다.
// 주소 한 글자가 바뀌거나 링크 하나가 빠져도 화면에서는 눈에 띄지 않으므로, 허용 목록 7개를
// 이 파일에 고정하고 원본과 빌드 결과를 모두 대조합니다. 계정을 바꿀 때는 lib/site-links.ts와
// 아래 EXPECTED를 같은 커밋에서 함께 고칩니다(주소는 공식 포트폴리오 voidlight.kr에서 확인한 값).
//
// 사용:
//   node scripts/check-owner-links.mjs                 원본 검사(prebuild, run-all-gates.mjs)
//   node scripts/check-owner-links.mjs --html [--out <dir>]
//                                                      빌드 HTML 검사(postbuild, run-postbuild-gates.mjs)
//   --root <dir>  다른 저장소 사본을 검사합니다(함정 자체시험용).
// 종료 코드: 0 통과 · 1 위반 · 2 입력 오류(out/ 없음 포함)
import path from "node:path";
import {
  createReporter, findAll, hasClass, innerText, jsxAttributes, jsxOpenings, lineOf, loadTsModule,
  parseSource, readPage, readText, requireOut, runGate, stringPieces, typescript, walkAst,
} from "./lib/renewal-gate-kit.mjs";

const GATE = "owner-links";

/** 계획 2.1절 R1 표. 순서도 계약입니다(바닥글은 이 순서대로 보여 줍니다). */
const EXPECTED = [
  { id: "github", label: "GitHub", href: "https://github.com/VoidLight00", accessibleName: "GitHub 프로필, 새 탭", newTab: true },
  { id: "x", label: "X @VoidLight_Hyeon", href: "https://x.com/VoidLight_Hyeon", accessibleName: "X 프로필, 새 탭", newTab: true },
  { id: "threads", label: "Threads @voidlight00", href: "https://www.threads.com/@voidlight00", accessibleName: "Threads 프로필, 새 탭", newTab: true },
  { id: "kakao-group", label: "카카오톡 그룹챗", href: "https://open.kakao.com/o/gugo7tCh", accessibleName: "카카오톡 그룹챗, 새 탭", newTab: true },
  { id: "kakao-direct", label: "카카오 일대일 문의", href: "https://open.kakao.com/o/srSlAiLd", accessibleName: "카카오 일대일 문의, 새 탭", newTab: true },
  { id: "email", label: "이메일", href: "mailto:icthyeon00@gmail.com", accessibleName: "이메일 보내기", newTab: false },
  { id: "portfolio", label: "voidlight.kr", href: "https://voidlight.kr", accessibleName: "voidlight.kr 포트폴리오, 새 탭", newTab: true },
];
/** 헤더에는 X·Threads·GitHub만 이 순서와 짧은 라벨로 둡니다. */
const HEADER_EXPECTED = [["x", "X"], ["threads", "Threads"], ["github", "GitHub"]].map(([id, label]) => ({
  ...EXPECTED.find((channel) => channel.id === id),
  label,
}));
const EXTERNAL = /^(https?:|mailto:)/i;
// layout.tsx에 운영자 주소가 직접 적히면 lib/site-links.ts 한 곳 정의가 깨집니다.
const OWNER_HOSTS = /(^|[/.@])(x\.com|twitter\.com|threads\.com|threads\.net|github\.com|open\.kakao\.com|voidlight\.kr)\b|mailto:/i;
const ALLOWED_SCRIPT_HOSTS = /platform\.twitter\.com\/widgets\.js/;

// ── 원본 ─────────────────────────────────────────────────────────────

function checkSiteLinks(root, report) {
  const links = loadTsModule(path.join(root, "lib/site-links.ts"));
  const channels = Array.isArray(links.CHANNELS) ? links.CHANNELS : [];
  if (channels.length !== EXPECTED.length) report.fail("channel", `lib/site-links.ts CHANNELS ${channels.length}개 — 기대 ${EXPECTED.length}개`);
  EXPECTED.forEach((want, index) => {
    const got = channels[index] ?? {};
    for (const key of ["id", "label", "href", "accessibleName", "newTab"]) {
      if (got[key] !== want[key]) report.fail("channel", `CHANNELS[${index}].${key} = ${JSON.stringify(got[key])} — 기대 ${JSON.stringify(want[key])}`);
    }
    const props = typeof links.channelLinkProps === "function" ? links.channelLinkProps(want) : {};
    const ok = props.href === want.href && props["aria-label"] === want.accessibleName
      && (want.newTab ? props.target === "_blank" && props.rel === "noopener noreferrer" : props.target === undefined);
    if (!ok) report.fail("link-props", `channelLinkProps(${want.id}) = ${JSON.stringify(props)}`);
  });
  const header = (links.HEADER_CHANNELS ?? []).map((item) => `${item.id}:${item.label}`).join(",");
  const wantHeader = HEADER_EXPECTED.map((item) => `${item.id}:${item.label}`).join(",");
  if (header !== wantHeader) report.fail("header-channels", `HEADER_CHANNELS = ${header} — 기대 ${wantHeader}`);
}

function elementOf(opening) {
  const ts = typescript();
  return ts.isJsxOpeningElement(opening) ? opening.parent : opening;
}

/** layout.tsx의 header·footer가 lib/site-links.ts 목록을 펼쳐 그리는지 확인합니다. */
function checkLayout(root, report) {
  const rel = "app/layout.tsx";
  const source = parseSource(rel, readText(root, rel));
  const ts = typescript();
  const regions = { header: ["HEADER_CHANNELS.map", "channelLinkProps(getChannel("], footer: ["CHANNELS.map", "channelLinkProps(channel)"] };
  for (const [tag, [mapCall, spread]] of Object.entries(regions)) {
    const openings = jsxOpenings(source).filter((item) => item.tag === tag);
    if (openings.length !== 1) { report.fail(`${tag}-source`, `${rel}: <${tag}> ${openings.length}개 — 1개여야 합니다`); continue; }
    const region = elementOf(openings[0].node);
    let mapped = false;
    walkAst(region, (node) => {
      if (!ts.isCallExpression(node) || node.expression.getText() !== mapCall) return;
      mapped ||= jsxOpenings(node).some(({ node: a, tag: name }) => name === "a" && jsxAttributes(a)["..."].some((s) => s.startsWith(spread)));
    });
    if (!mapped) report.fail(`${tag}-source`, `${rel}: <${tag}> 안에서 ${mapCall}(…)이 ${spread}…)를 펼친 <a>를 그리지 않습니다`);
    for (const { node: a, tag: name } of jsxOpenings(region)) {
      const href = name === "a" ? jsxAttributes(a).href : null;
      const literal = href?.text ?? href?.expression?.replace(/^[`"']|[`"']$/g, "");
      if (href && EXTERNAL.test(literal ?? "")) report.fail("hardcoded-link", `${rel}:${lineOf(source, a)} <${tag}> 안의 외부 링크가 직접 적혀 있습니다: ${literal}`);
    }
  }
  for (const piece of stringPieces(source)) {
    if (OWNER_HOSTS.test(piece.text) && !ALLOWED_SCRIPT_HOSTS.test(piece.text)) {
      report.fail("hardcoded-link", `${rel}:${piece.line} 운영자 주소는 lib/site-links.ts에만 둡니다: ${piece.text.trim().slice(0, 80)}`);
    }
  }
}

// ── 빌드 HTML ─────────────────────────────────────────────────────────

const relTokens = (a) => new Set((a.attrs.rel ?? "").split(/\s+/).filter(Boolean));

function compareLinks(page, where, anchors, expected, report) {
  const got = anchors.map((a) => a.attrs.href);
  const want = expected.map((item) => item.href);
  for (const href of want) if (!got.includes(href)) report.fail(`${where}-missing`, `${page}: ${where}에 ${href} 링크가 없습니다`);
  for (const href of got) if (!want.includes(href)) report.fail(`${where}-extra`, `${page}: ${where}에 허용 목록 밖 외부 링크 ${href}`);
  if (got.length !== want.length) report.fail(`${where}-count`, `${page}: ${where} 외부 링크 ${got.length}개 — 기대 ${want.length}개`);
  if (got.length === want.length && got.every((href) => want.includes(href)) && got.join(" ") !== want.join(" ")) {
    report.fail(`${where}-order`, `${page}: ${where} 링크 순서 ${got.join(", ")}`);
  }
  for (const a of anchors) {
    const item = expected.find((candidate) => candidate.href === a.attrs.href);
    if (!item) continue;
    const rel = relTokens(a);
    const problems = [];
    if (innerText(a) !== item.label) problems.push(`라벨 '${innerText(a)}'(기대 '${item.label}')`);
    if (a.attrs["aria-label"] !== item.accessibleName) problems.push(`aria-label '${a.attrs["aria-label"] ?? ""}'`);
    if (item.newTab && (a.attrs.target !== "_blank" || !rel.has("noopener") || !rel.has("noreferrer"))) problems.push("새 탭·rel 누락");
    if (!item.newTab && a.attrs.target === "_blank") problems.push("메일 링크가 새 탭으로 열림");
    if (problems.length) report.fail(`${where}-attr`, `${page}: ${item.href} — ${problems.join(", ")}`);
  }
}

function siteRegion(document, tag, marker) {
  return findAll(document, (el) => el.tag === tag && findAll(el, (child) => hasClass(child, marker)).length > 0);
}

function checkPages(outDir, report) {
  const pages = requireOut(outDir);
  let footerLinks = 0;
  for (const page of pages) {
    const document = readPage(outDir, page);
    const headers = siteRegion(document, "header", "site-nav-row");
    const footers = siteRegion(document, "footer", "site-footer-inner");
    if (headers.length !== 1) report.fail("header-element", `${page}: 사이트 헤더(.site-nav-row를 품은 header) ${headers.length}개`);
    if (footers.length !== 1) report.fail("footer-element", `${page}: 사이트 바닥글(.site-footer-inner를 품은 footer) ${footers.length}개`);
    const external = (region) => findAll(region, (el) => el.tag === "a" && EXTERNAL.test(el.attrs.href ?? ""));
    if (headers.length === 1) compareLinks(page, "header", external(headers[0]), HEADER_EXPECTED, report);
    if (footers.length === 1) {
      const anchors = external(footers[0]);
      footerLinks += anchors.length;
      compareLinks(page, "footer", anchors, EXPECTED, report);
    }
  }
  return { pages: pages.length, footerLinks };
}

runGate(GATE, (opts) => {
  const report = createReporter(GATE);
  if (opts.html) {
    const { pages, footerLinks } = checkPages(opts.out, report);
    return report.finish(`빌드 페이지 ${pages}개의 헤더 외부 링크가 X·Threads·GitHub, 바닥글 외부 링크가 운영자 계정 7개와 같습니다(바닥글 링크 ${footerLinks}개 확인).`);
  }
  checkSiteLinks(opts.root, report);
  checkLayout(opts.root, report);
  return report.finish("lib/site-links.ts의 채널 7개와 헤더 3개가 허용 목록과 같고, app/layout.tsx의 헤더·바닥글이 이 목록만 펼쳐 그립니다.");
});
