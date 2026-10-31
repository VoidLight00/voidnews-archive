#!/usr/bin/env node
// check-official-labels.mjs — '공식' 출처 문구 HARD 게이트(리뉴얼 계획 R5, REQUIREMENTS R23)
//
// 왜: 발견 전용(큐레이터 X 계정·커뮤니티)·보도·영상 계층 링크에 '공식 링크', '공식 원문' 같은 문구가 붙으면
// 제3자 기사가 공식 발표처럼 보입니다. 화면 문구는 lib/source-tier.ts의 계층 판정(sourceLabel)만 정하고,
// 그 판정을 거치지 않는 '공식' 문구가 소스에 다시 생기면 실패해야 합니다(계획 R5 최소안).
// 데이터에 적힌 보조 링크 라벨(backupUrls.label, AB sourceLabel)은 데이터 정정 사안이라(계획 7절) 이 게이트가
// 막지 않으며, 코드가 만드는 문구(SOURCE_LABELS의 official 묶음)만 판정합니다.
//
// 원본 검사(prebuild): 중립 계층 문구에 '공식'·'Official'이 없는지, 계획 R5의 계층 표본이 맞는 문구 묶음을
//   받는지, app/·lib/의 문자열에 official 묶음 문구가 직접 적히지 않았는지, 출처 링크 구성요소가 sourceLabel을
//   부르는지 확인합니다.
// 빌드 검사(--html, postbuild): 모든 페이지의 외부 링크 중 중립 계층 주소에 official 묶음 문구가 붙은 링크가
//   0개인지 확인하고, 데이터 라벨에 '공식'이 들어간 중립 계층 링크는 정정 후보로 보고만 합니다.
// 판정기(Python)와 JS 판정의 1,531건 대조는 판정기가 있는 기기에서만 도는
// `node scripts/sync-source-registry.mjs --check`가 맡습니다.
// 종료 코드: 0 통과 · 1 위반 · 2 입력 오류(out/ 없음 포함)
import path from "node:path";
import {
  createReporter, findAll, listFiles, loadTsModule, parseSource, readPage, readText, requireOut, runGate,
  stringPieces, textPieces,
} from "./lib/renewal-gate-kit.mjs";

const GATE = "official-labels";
const NEUTRAL = ["discovery-only", "press", "media"];
const OFFICIAL_WORD = /공식|official/i;
// 계획 R5 표의 계층 표본. TestingCatalog 6건 가운데 두 형식과 보도·영상·포럼, 공식 대조군입니다.
// 세 번째 값은 계층과 다른 문구 묶음을 기대할 때만 적습니다. 매체 계층이라도 재생 주소가 아닌 도움말 페이지는
// '영상'이 아니라 원문 링크 문구입니다(2026-11-01 검토: 2026-w22 Gemini in Chrome 기사의 help.youtube.com).
const SAMPLES = [
  ["https://x.com/testingcatalog/status/2049896926997369194", "discovery-only"],
  ["https://www.testingcatalog.com/claude-duet", "discovery-only"],
  ["https://forum.cursor.com/t/x/1", "discovery-only"],
  ["https://techcrunch.com/2026/01/01/x/", "press"],
  ["https://www.cnbc.com/2026/01/01/x.html", "press"],
  ["https://www.bloomberg.com/news/articles/x", "press"],
  ["https://www.youtube.com/watch?v=h-pNWy7v_qc", "media"],
  ["https://youtu.be/h-pNWy7v_qc", "media"],
  ["https://help.youtube.com/hc/en-us/articles/1", "media", "discovery-only"],
  ["https://www.youtube.com/@OpenAI", "media", "discovery-only"],
  ["https://openai.com/index/x/", "official"],
];
// 출처 링크를 그리는 구성요소(계획 R5 대상 파일). 모두 sourceLabel()로 문구를 받아야 합니다.
const TIER_CALLERS = [
  "app/[slug]/weekly/PostCard.tsx",
  "app/[slug]/editorial/PostDetail.tsx",
  "app/ab/[edition]/components/source.tsx",
  "app/[slug]/weekly/previews.tsx",
  "app/presentation/[slug]/page.tsx",
];

const normalizeLabel = (text) => text.replace(/[→↗↑↓←]/g, "").replace(/\s+/g, " ").trim();

function officialLabelSet(labels) {
  const out = new Set();
  for (const locale of Object.keys(labels)) for (const value of Object.values(labels[locale].official ?? {})) out.add(normalizeLabel(value));
  return out;
}

// ── 원본 ─────────────────────────────────────────────────────────────

function checkLabelTable(labels, report) {
  for (const locale of ["ko", "en"]) {
    const groups = labels[locale] ?? {};
    const fields = Object.keys(groups.official ?? {});
    if (fields.length < 8) report.fail("official-group", `SOURCE_LABELS.${locale}.official 칸 ${fields.length}개 — 8개여야 합니다`);
    for (const field of fields) {
      if (!OFFICIAL_WORD.test(groups.official[field])) report.fail("official-group", `SOURCE_LABELS.${locale}.official.${field}에 '공식' 문구가 없습니다`);
    }
    for (const group of NEUTRAL) {
      for (const field of fields) {
        const value = groups[group]?.[field];
        if (typeof value !== "string" || !value.trim()) report.fail("neutral-group", `SOURCE_LABELS.${locale}.${group}.${field}가 비었습니다`);
        else if (OFFICIAL_WORD.test(value)) report.fail("neutral-group", `SOURCE_LABELS.${locale}.${group}.${field} = '${value}' — 중립 계층에 '공식' 문구`);
      }
    }
  }
}

function checkSamples(tier, labels, report) {
  const fields = Object.keys(labels.ko?.official ?? {});
  for (const [url, want, wantGroup = NEUTRAL.includes(want) ? want : "official"] of SAMPLES) {
    const got = tier.classifySource(url).tier;
    if (got !== want) report.fail("tier-sample", `classifySource(${url}).tier = ${got} — 기대 ${want}`);
    const group = tier.sourceLabelGroup(url);
    if (group !== wantGroup) report.fail("tier-sample", `sourceLabelGroup(${url}) = ${group} — 기대 ${wantGroup}`);
    if (!NEUTRAL.includes(wantGroup)) continue;
    for (const locale of ["ko", "en"]) for (const field of fields) {
      const text = tier.sourceLabel(url, field, locale);
      if (OFFICIAL_WORD.test(text)) report.fail("tier-sample", `sourceLabel(${url}, ${field}, ${locale}) = '${text}'`);
    }
  }
}

function checkBypass(root, official, report) {
  const files = [...listFiles(root, ["app"], [".ts", ".tsx"]), ...listFiles(root, ["lib"], [".ts"]).filter((rel) => rel.split("/").length === 2)];
  for (const rel of files.filter((file) => file !== "lib/i18n.ts")) {
    for (const piece of stringPieces(parseSource(rel, readText(root, rel)))) {
      const text = normalizeLabel(piece.text);
      const hostPrefix = /^(공식|Official) ·/.test(piece.text.trim());
      if (official.has(text) || hostPrefix) {
        report.fail("bypass", `${rel}:${piece.line} '${piece.text.trim()}' — 출처 문구는 lib/source-tier.ts sourceLabel()로만 정합니다`);
      }
    }
  }
  for (const rel of TIER_CALLERS) {
    const text = readText(root, rel);
    if (!/import\s*\{[^}]*\bsourceLabel\b[^}]*\}\s*from\s*["']@\/lib\/source-tier["']/.test(text) || !/\bsourceLabel\(/.test(text)) {
      report.fail("tier-call", `${rel}: 출처 링크 문구를 sourceLabel()로 받지 않습니다`);
    }
  }
}

// ── 빌드 HTML ─────────────────────────────────────────────────────────

function checkPages(root, outDir, tier, official, report) {
  const pages = requireOut(outDir);
  let anchors = 0;
  let neutral = 0;
  const candidates = new Map();
  for (const rel of pages) {
    for (const a of findAll(readPage(outDir, rel), (el) => el.tag === "a" && /^https?:/i.test(el.attrs.href ?? ""))) {
      anchors += 1;
      if (!NEUTRAL.includes(tier.classifySource(a.attrs.href).tier)) continue;
      neutral += 1;
      const texts = [...textPieces(a), a.attrs["aria-label"] ?? ""].map(normalizeLabel);
      const hit = texts.find((text) => official.has(text));
      if (hit) report.fail("neutral-wording", `${rel}: ${a.attrs.href} 링크에 '${hit}' — 이 주소는 ${tier.classifySource(a.attrs.href).tier} 계층입니다`);
      // 데이터에 적힌 라벨('X 공식 게시글' 등)은 막지 않고 정정 후보로만 모읍니다(계획 7절, lib/weeks는 승인 뒤 수정).
      const dataLabel = texts.find((text) => text && !official.has(text) && OFFICIAL_WORD.test(text));
      if (!hit && dataLabel) candidates.set(`${a.attrs.href} '${dataLabel}'`, rel);
    }
  }
  if (!anchors) report.fail("coverage", "외부 링크를 하나도 찾지 못했습니다 — 측정 없이 통과하지 않습니다");
  report.note(`빌드 페이지 ${pages.length}개 · 외부 링크 ${anchors}개 · 중립 계층 링크 ${neutral}개`);
  if (candidates.size) {
    report.note(`데이터 라벨에 '공식'이 들어간 중립 계층 링크 ${candidates.size}개(정정 후보, 빌드는 막지 않음):`);
    for (const [link, rel] of candidates) report.note(`  ${rel}: ${link}`);
  }
}

runGate(GATE, (opts) => {
  const report = createReporter(GATE);
  const { SOURCE_LABELS } = loadTsModule(path.join(opts.root, "lib/i18n.ts"));
  const tier = loadTsModule(path.join(opts.root, "lib/source-tier.ts"));
  const official = officialLabelSet(SOURCE_LABELS);
  if (opts.html) {
    checkPages(opts.root, opts.out, tier, official, report);
    return report.finish("발견 전용·보도·영상 계층 주소에 '공식' 출처 문구가 붙은 링크가 0개입니다.");
  }
  checkLabelTable(SOURCE_LABELS, report);
  checkSamples(tier, SOURCE_LABELS, report);
  checkBypass(opts.root, official, report);
  return report.finish(`중립 계층 문구, 계층 표본 ${SAMPLES.length}개, 판정 함수를 거치지 않는 '공식' 문구 0건, 출처 구성요소 ${TIER_CALLERS.length}개의 sourceLabel 사용을 확인했습니다.`);
});
