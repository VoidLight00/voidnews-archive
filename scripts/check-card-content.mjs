#!/usr/bin/env node
// scripts/check-card-content.mjs — VoidNews AB 카드 본문 품질/렌더 안전성 게이트 (소스 레벨)
// prebuild 에 체이닝되어 매 빌드마다 자동 재검사된다. Exit 1 = 빌드 차단(HARD).
//
// 검사:
//   A. 미지원 마크다운 (HARD FAIL) — PostDetail.tsx renderMarkdown 이 못 다루는 문법.
//      렌더 시 화면에 raw 로 노출된다(2026-06-03 회귀, references/FAILURE_LOG.md VN-RENDER-LEAK).
//      · h5/h6 (#####, ######)  · 이미지 ![alt](url)  · 수평선 ---
//      (### / 불릿 / 번호 / 인용 / 인라인 code·bold·link 는 라인 단위 파서가 처리하므로 안전.)
//   B. 본문 풍부도 (WARN) — content/body 가 MIN_WARN 미만이면 보강 권고. 과거 단신 카드가 많아
//      차단하지 않고 경고만 한다. 신규 카드 작성 시 이 경고를 0 으로 만드는 것이 목표.
//   C. heading 위생 (WARN) — ## 제목이 마침표로 끝나면 명사구 위반 권고.

import { readFileSync, globSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const MIN_WARN = 1000; // 본문 풍부도 권고선
const GLOBS = ["lib/ab/editions/*.ts", "lib/weeks/*.ts"];

// content / body 필드 값(문자열 리터럴)을 추출. 큰따옴표/백틱 모두 대응.
function extractBodies(src, file) {
  const out = [];
  const re = /\b(content|body)\s*:\s*("(?:[^"\\]|\\.)*"|`[^`]*`)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const raw = m[2];
    let value;
    if (raw[0] === '"') {
      try { value = JSON.parse(raw); }
      catch { value = raw.slice(1, -1).replace(/\\n/g, "\n").replace(/\\"/g, '"'); }
    } else {
      value = raw.slice(1, -1); // 백틱: 실제 개행 그대로
    }
    const line = src.slice(0, m.index).split("\n").length;
    out.push({ field: m[1], value, line, file });
  }
  return out;
}

// renderMarkdown 이 처리하지 못해 raw 로 노출될 미지원 문법만 찾는다.
function findUnsupported(content) {
  const issues = [];
  if (/(^|\n)\s*#{5,6}\s/.test(content)) issues.push("미지원 heading h5/h6 (#####+)");
  if (/!\[[^\]]*\]\([^)]*\)/.test(content)) issues.push("미지원 이미지 ![..](..)");
  if (/(^|\n)\s*---+\s*(\n|$)/.test(content)) issues.push("미지원 수평선 ---");
  return issues;
}

const fail = [];
const warnShort = [];
const warnHead = [];
let bodyCount = 0;

const files = new Set();
for (const g of GLOBS) for (const f of globSync(g, { cwd: ROOT, absolute: true })) files.add(f);

for (const file of [...files]) {
  const rel = file.replace(ROOT + "/", "");
  const src = readFileSync(file, "utf-8");
  for (const b of extractBodies(src, rel)) {
    bodyCount++;
    const where = `${rel}:${b.line} (${b.field})`;
    for (const u of findUnsupported(b.value)) fail.push(`${where} — ${u}`);
    if (b.value.length < MIN_WARN) warnShort.push({ where, len: b.value.length });
    for (const h of b.value.match(/^##\s+.*[다요음함됨니다]\.\s*$/gm) || [])
      warnHead.push(`${where} — 마침표 heading: "${h.trim().slice(0, 44)}"`);
  }
}

console.log(`[check-card-content] ${bodyCount}개 본문 검사 (content/body)`);
if (warnShort.length) {
  warnShort.sort((a, b) => a.len - b.len);
  console.warn(`  ⚠︎ 본문 풍부도 권고 ${warnShort.length}건 (<${MIN_WARN}자) — 최단 5건:`);
  for (const w of warnShort.slice(0, 5)) console.warn(`     ${w.where} ${w.len}자`);
}
for (const w of warnHead.slice(0, 10)) console.warn(`  ⚠︎ ${w}`);

if (fail.length === 0) {
  console.log(`[check-card-content] ✓ 미지원 마크다운 0 (렌더 누수 없음)${warnShort.length ? ` · 풍부도 권고 ${warnShort.length}` : ""}`);
  process.exit(0);
}

console.error(`\n[check-card-content] ✗ ${fail.length}건 차단 (미지원 마크다운 → 화면 raw 노출):\n`);
for (const f of fail) console.error(`  ${f}`);
console.error(`\n[check-card-content] renderMarkdown 지원 문법으로 바꾸거나 렌더러를 보강하세요. references/FAILURE_LOG.md VN-RENDER-LEAK 참조.`);
process.exit(1);
