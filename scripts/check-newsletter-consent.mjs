#!/usr/bin/env node
// check-newsletter-consent.mjs — 구독 고지·동의 안내 HARD 게이트(리뉴얼 계획 R4·4.4절, REQUIREMENTS R22)
//
// 왜: 구독 안내는 개인정보 보호법 제15조·제22조와 정보통신망법 제50조의 고지 항목을 담아야 하고,
// 사이트는 이메일 주소를 직접 받지 않는다는 결정(계획 4.2절)을 지켜야 합니다. 문구 하나가 빠지거나
// 미리 체크된 동의 칸이 생기면 법적 고지가 깨지므로 원본과 빌드 결과를 모두 대조합니다.
// 문구를 확정본으로 바꿀 때(계획 4.4절 '사용자 확인 뒤 확정')는 아래 표를 같은 커밋에서 고칩니다.
//
// 원본 검사(prebuild): app/newsletter/page.tsx의 고지 4항목·광고성 정보 수신 동의·만 14세·위탁과 국외 이전,
//   app/privacy/page.tsx의 12항목, 두 페이지의 checked 속성 0개, app/ 전체의 이메일 입력칸·form action 0개,
//   구독 폼 주소 검사 함수(https만 허용), 코드가 직접 부르는 외부 주소가 처리방침 11항 목록에 있는지 확인합니다.
// 빌드 검사(--html, postbuild): 같은 항목을 out/newsletter/·out/privacy/에서 확인하고, 모든 페이지에서
//   이메일 입력칸과 form action이 0개인지, 폼 주소가 비었을 때 외부 구독 링크가 0개인지, 모든 페이지의
//   iframe·script·link 외부 호스트가 처리방침 11항 목록에 있고 외부 이미지가 있으면 '기사 원문 이미지' 항목이 있는지 확인합니다.
//   --form-url <주소>  lib/site-links.ts 대신 쓸 구독 폼 주소(빈 문자열 = 미설정, 함정 시험용)
// 종료 코드: 0 통과 · 1 위반 · 2 입력 오류(out/ 없음 포함)
import fs from "node:fs";
import path from "node:path";
import {
  InputError, createReporter, findAll, hasAttr, jsxAttributes, jsxOpenings, listFiles, loadTsModule,
  parseHtml, parseSource, readText, requireOut, runGate,
} from "./lib/renewal-gate-kit.mjs";

const GATE = "newsletter-consent";
const NEWSLETTER = "app/newsletter/page.tsx";
const PRIVACY = "app/privacy/page.tsx";
// [표식 값, 머리글, 반드시 들어갈 문구, 굵게 표시할 문구(개인정보 처리 방법에 관한 고시 제4조)]
const NOTICE_ITEMS = [
  ["purpose", "수집·이용 목적", ["뉴스레터(광고성 정보 포함) 발송"], "뉴스레터(광고성 정보 포함) 발송"],
  ["items", "수집 항목", ["이메일 주소"], null],
  ["retention", "보유·이용 기간", ["해지하면 지체 없이 파기합니다"], "해지하면 지체 없이 파기합니다"],
  ["refusal", "동의를 거부할 권리와 불이익", ["동의를 거부하실 수 있습니다", "뉴스레터를 받으실 수 없습니다"], null],
];
const SECTIONS = [
  ["data-consent-ads", ["광고성 정보(이메일) 수신 동의", "수신거부"], "광고성 정보가 포함될 수 있습니다"],
  ["data-consent-age", ["만 14세 미만은 구독하실 수 없습니다"], null],
  ["data-consent-transfer", ["스티비 주식회사", "Amazon Web Services, Inc.", "미국"], null],
];
const PRIVACY_ITEMS = [
  ["purpose", ["뉴스레터(광고성 정보 포함) 발송"]],
  ["items", ["이메일 주소"]],
  ["retention", ["지체 없이 파기"]],
  ["destruction", ["파기 절차", "삭제"]],
  ["entrustment", ["처리 위탁", "스티비 주식회사"]],
  ["transfer", ["이전 항목", "이전 국가", "이전 시기와 방법", "이전받는 자", "이용 목적과 보유 기간", "거부 방법과 효과", "미국", "Amazon Web Services, Inc."]],
  ["rights", ["열람", "정정", "삭제", "처리정지", "수신거부"]],
  ["officer", ["개인정보 보호책임자"]],
  ["children", ["만 14세 미만"]],
  ["browser-storage", ["브라우저"]],
  ["external-services", ["외부 서비스"]],
  ["effective-date", ["시행"]],
];
const PRIVACY_LINK = /href=(\{PRIVACY_PATH\}|"\/privacy\/")/;
const EXTERNAL = /^(https?:|mailto:)/i;

/** TSX와 HTML을 같은 규칙으로 읽도록 공백·주석·스크립트를 정리합니다. */
function normalizeMarkup(text, html) {
  let out = text;
  if (html) out = out.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<!--[\s\S]*?-->/g, "");
  else out = out.replace(/\{" "\}/g, " ");
  return out.replace(/\s+/g, " ");
}

function segments(text, marker) {
  const out = [];
  let from = text.indexOf(marker);
  while (from >= 0) {
    out.push(from);
    from = text.indexOf(marker, from + marker.length);
  }
  return out;
}

/** 표식에서 끝 표시까지의 조각입니다. 표식이 정확히 1개가 아니면 null입니다. */
function section(text, marker, end, report, where) {
  const found = segments(text, marker);
  if (found.length !== 1) { report.fail("notice-item", `${where}: ${marker} ${found.length}개 — 1개여야 합니다`); return null; }
  const stop = text.indexOf(end, found[0]);
  return text.slice(found[0], stop < 0 ? text.length : stop);
}

function requirePhrases(piece, phrases, where, report) {
  for (const phrase of phrases) if (!piece.includes(phrase)) report.fail("notice-item", `${where}: '${phrase}' 문구가 없습니다`);
}

function requireStrong(piece, phrase, where, report) {
  const bold = [...piece.matchAll(/<strong>([^<]*)<\/strong>/g)].some((m) => m[1].includes(phrase));
  if (!bold) report.fail("notice-bold", `${where}: '${phrase}'를 <strong>으로 굵게 표시해야 합니다(고시 제4조)`);
}

function inspectNewsletter(text, where, report) {
  for (const [id, heading, phrases, bold] of NOTICE_ITEMS) {
    const piece = section(text, `data-consent-item="${id}"`, "</tr>", report, `${where} 고지 '${heading}'`);
    if (piece === null) continue;
    requirePhrases(piece, [heading, ...phrases], `${where} 고지 '${heading}'`, report);
    if (bold) requireStrong(piece, bold, `${where} 고지 '${heading}'`, report);
  }
  for (const [marker, phrases, bold] of SECTIONS) {
    const piece = section(text, marker, "</section>", report, `${where} ${marker}`);
    if (piece === null) continue;
    requirePhrases(piece, phrases, `${where} ${marker}`, report);
    if (bold) requireStrong(piece, bold, `${where} ${marker}`, report);
    if (marker === "data-consent-transfer" && !PRIVACY_LINK.test(piece)) report.fail("notice-item", `${where}: 위탁·국외 이전 안내에 개인정보 처리방침 링크가 없습니다`);
  }
  if (segments(text, "data-newsletter-state").length !== 1) report.fail("subscribe-state", `${where}: data-newsletter-state 구역이 1개가 아닙니다`);
}

function inspectPrivacy(text, where, html, report) {
  const order = [...text.matchAll(/data-privacy-item="([a-z-]+)"/g)].map((m) => m[1]);
  const want = PRIVACY_ITEMS.map(([id]) => id);
  if (order.join(",") !== want.join(",")) report.fail("privacy-item", `${where}: 처리방침 항목 순서 ${order.join(",")} — 기대 ${want.join(",")}`);
  for (const [id, phrases] of PRIVACY_ITEMS) {
    // 원본은 표 행을 파일 위쪽 배열에 두므로 파일 전체에서, 빌드 HTML은 해당 항목 구역 안에서 찾습니다.
    const piece = html ? section(text, `data-privacy-item="${id}"`, "</section>", report, `${where} ${id}`) : text;
    if (piece === null) continue;
    for (const phrase of phrases) if (!piece.includes(phrase)) report.fail("privacy-item", `${where} ${id}: '${phrase}' 문구가 없습니다`);
  }
}

// ── 원본 ─────────────────────────────────────────────────────────────

function checkSourceForms(root, report) {
  for (const rel of listFiles(root, ["app"], [".tsx", ".jsx"])) {
    const source = parseSource(rel, readText(root, rel));
    for (const { node, tag } of jsxOpenings(source)) {
      const attrs = jsxAttributes(node);
      const line = source.getLineAndCharacterOfPosition(node.getStart()).line + 1;
      if ((rel === NEWSLETTER || rel === PRIVACY) && (attrs.checked || attrs.defaultChecked)) report.fail("checked", `${rel}:${line} <${tag}>에 checked 속성이 있습니다 — 동의 칸은 기본 해제여야 합니다`);
      if (tag === "form" && attrs.action) report.fail("email-form", `${rel}:${line} <form action>이 있습니다 — 사이트는 이메일을 직접 받지 않습니다`);
      if (tag === "input" && (attrs.type?.text === "email" || attrs.name?.text === "email" || attrs.type?.expression === '"email"')) {
        report.fail("email-form", `${rel}:${line} 이메일 입력칸이 있습니다 — 구독 신청은 스티비 폼에서만 받습니다`);
      }
    }
  }
}

function checkFormUrlGuard(root, report) {
  const { resolveNewsletterFormUrl } = loadTsModule(path.join(root, "lib/site-links.ts"));
  const cases = [["", null], ["   ", null], ["http://example.com/form", null], ["javascript:alert(1)", null], ["https://example.com/form", "https://example.com/form"]];
  for (const [input, want] of cases) {
    const got = resolveNewsletterFormUrl(input);
    if (got !== want) report.fail("form-url", `resolveNewsletterFormUrl(${JSON.stringify(input)}) = ${JSON.stringify(got)} — 기대 ${JSON.stringify(want)}`);
  }
}

// ── 빌드 HTML ─────────────────────────────────────────────────────────

function readRaw(outDir, rel, report) {
  const file = path.join(outDir, rel);
  if (!fs.existsSync(file)) { report.fail("page-missing", `${rel}가 빌드에 없습니다`); return null; }
  return fs.readFileSync(file, "utf8");
}

function expectedFormUrl(opts) {
  const { resolveNewsletterFormUrl } = loadTsModule(path.join(opts.root, "lib/site-links.ts"));
  return Object.hasOwn(opts.options, "form-url") ? resolveNewsletterFormUrl(opts.options["form-url"]) : resolveNewsletterFormUrl();
}

function checkSubscribeState(document, formUrl, report) {
  const main = findAll(document, (el) => el.tag === "main")[0];
  if (!main) { report.fail("subscribe-state", "newsletter/index.html: <main>이 없습니다"); return; }
  if (findAll(main, (el) => hasAttr(el, "checked")).length) report.fail("checked", "newsletter/index.html: checked 속성이 있습니다");
  const state = findAll(main, (el) => hasAttr(el, "data-newsletter-state"))[0]?.attrs["data-newsletter-state"];
  const external = findAll(main, (el) => el.tag === "a" && EXTERNAL.test(el.attrs.href ?? ""));
  if (state !== (formUrl ? "open" : "closed")) report.fail("subscribe-state", `newsletter/index.html: 구독 상태 ${state} — 폼 주소 ${formUrl ? "있음(open)" : "없음(closed)"}`);
  if (!formUrl) {
    if (external.length) report.fail("subscribe-link", `newsletter/index.html: 폼 주소가 비었는데 외부 링크 ${external.length}개(${external[0].attrs.href})`);
    if (!findAll(main, (el) => el.tag === "a" && el.attrs.href === "/rss.xml").length) report.fail("subscribe-state", "newsletter/index.html: 준비 중 상태에 RSS 링크가 없습니다");
    return;
  }
  const ok = external.length === 1 && external[0].attrs.href === formUrl && external[0].attrs.target === "_blank" && hasAttr(external[0], "data-newsletter-subscribe");
  if (!ok) report.fail("subscribe-link", `newsletter/index.html: 외부 링크는 스티비 구독 버튼 1개(${formUrl}, 새 탭)여야 합니다 — ${external.map((a) => a.attrs.href).join(", ")}`);
}

function checkSiteForms(outDir, pages, report) {
  for (const rel of pages) {
    const html = fs.readFileSync(path.join(outDir, rel), "utf8").replace(/<script\b[\s\S]*?<\/script>/gi, " ");
    if (/<form\b[^>]*\saction\s*=/i.test(html)) report.fail("email-form", `${rel}: <form action>이 있습니다`);
    if (/<input\b[^>]*\s(type\s*=\s*"email"|name\s*=\s*"email")/i.test(html)) report.fail("email-form", `${rel}: 이메일 입력칸이 있습니다`);
  }
}

// ── 외부 서비스 목록 대조(처리방침 11항, 2026-11-01 독립 검토 지적) ──────────────
// 처리방침은 공개 의무 문서라, 목록이 실제 호출과 다르면 그 자체로 결함입니다.
// 코드가 직접 부르는 주소(fetch, script·iframe src)는 원본에서, 데이터가 만드는 임베드·이미지 주소는
// 빌드 HTML에서 모읍니다. 이미지 원본 호스트는 기사마다 달라 '기사 원문 이미지' 항목 하나로 묶습니다.
const CODE_HOST = /(?:fetch\(\s*|\.src\s*=\s*|src=\{?\s*)[`'"]https:\/\/([a-z0-9.-]+)/g;
const IMAGE_CATEGORY = "기사 원문 이미지";

function checkSourceHosts(root, report) {
  const privacy = readText(root, PRIVACY);
  for (const rel of listFiles(root, ["app", "lib"], [".ts", ".tsx"])) {
    for (const m of readText(root, rel).matchAll(CODE_HOST)) {
      if (!privacy.includes(m[1])) report.fail("external-host", `${rel}: 코드가 ${m[1]}에 접속하는데 ${PRIVACY} 외부 서비스 목록에 없습니다`);
    }
  }
}

function pageHosts(html) {
  const embeds = new Set();
  const images = new Set();
  for (const tag of html.matchAll(/<(iframe|script|link|img|source)\b([^>]*)>/gi)) {
    const name = tag[1].toLowerCase();
    const attrs = tag[2];
    const rel = (attrs.match(/\brel="([^"]*)"/i)?.[1] ?? "").toLowerCase();
    if (name === "link" && /canonical|alternate|icon|manifest/.test(rel)) continue;
    const image = name === "img" || name === "source" || (name === "link" && /\bas="image"/i.test(attrs));
    for (const url of attrs.matchAll(/\b(?:src|href|srcset)="([^"]*)"/gi)) {
      for (const part of url[1].split(",")) {
        const host = part.trim().match(/^(?:https?:)?\/\/([a-z0-9.-]+)/i)?.[1]?.toLowerCase();
        if (host) (image ? images : embeds).add(host);
      }
    }
  }
  return { embeds, images };
}

function checkPageHosts(outDir, pages, privacy, report) {
  const listed = section(privacy, 'data-privacy-item="external-services"', "</section>", report, "privacy/index.html external-services");
  if (listed === null) return;
  const missing = new Map();
  let imagePages = 0;
  for (const rel of pages) {
    const { embeds, images } = pageHosts(fs.readFileSync(path.join(outDir, rel), "utf8"));
    for (const host of embeds) if (!listed.includes(host) && !missing.has(host)) missing.set(host, rel);
    if (images.size) imagePages += 1;
  }
  for (const [host, rel] of missing) report.fail("external-host", `${rel}: ${host}에 접속하는데 처리방침 외부 서비스 목록에 없습니다`);
  if (imagePages && !listed.includes(IMAGE_CATEGORY)) report.fail("external-host", `외부 이미지를 쓰는 페이지 ${imagePages}개 — 처리방침에 '${IMAGE_CATEGORY}' 항목이 없습니다`);
}

function checkBuilt(opts, report) {
  const pages = requireOut(opts.out);
  const newsletter = readRaw(opts.out, "newsletter/index.html", report);
  if (newsletter !== null) {
    inspectNewsletter(normalizeMarkup(newsletter, true), "newsletter/index.html", report);
    checkSubscribeState(parseHtml(newsletter), expectedFormUrl(opts), report);
  }
  const privacy = readRaw(opts.out, "privacy/index.html", report);
  if (privacy !== null) {
    inspectPrivacy(normalizeMarkup(privacy, true), "privacy/index.html", true, report);
    if (findAll(parseHtml(privacy), (el) => hasAttr(el, "checked")).length) report.fail("checked", "privacy/index.html: checked 속성이 있습니다");
    checkPageHosts(opts.out, pages, normalizeMarkup(privacy, true), report);
  }
  checkSiteForms(opts.out, pages, report);
  return pages.length;
}

runGate(GATE, (opts) => {
  const report = createReporter(GATE);
  if (opts.html) {
    const pages = checkBuilt(opts, report);
    return report.finish(`구독 안내와 처리방침의 필수 항목이 빌드 HTML에 있고, 빌드 페이지 ${pages}개에 이메일 입력칸·form action이 없습니다.`);
  }
  if (!fs.existsSync(path.join(opts.root, NEWSLETTER))) throw new InputError(`${NEWSLETTER}가 없습니다`);
  inspectNewsletter(normalizeMarkup(readText(opts.root, NEWSLETTER), false), NEWSLETTER, report);
  inspectPrivacy(normalizeMarkup(readText(opts.root, PRIVACY), false), PRIVACY, false, report);
  checkSourceForms(opts.root, report);
  checkFormUrlGuard(opts.root, report);
  checkSourceHosts(opts.root, report);
  return report.finish("구독 고지 4항목·광고성 정보 수신 동의·만 14세·위탁과 국외 이전, 처리방침 12항목, checked 0개, 이메일 입력칸·form action 0개를 확인했습니다.");
});
