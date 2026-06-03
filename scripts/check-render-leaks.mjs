#!/usr/bin/env node
// scripts/check-render-leaks.mjs — VoidNews AB 렌더 누수 게이트 (빌드 산출물 레벨)
// postbuild 에 체이닝되어 next build 직후 자동 실행된다. Exit 1 = 빌드 실패 = 배포 차단(HARD).
//
// 빌드된 out/**/*.html 의 <article> 본문에서, 화면에 그대로 노출된 raw 마크다운을 찾는다.
// 핵심: renderMarkdown 이 처리하는 문법은 HTML 로 변환되어 visible 텍스트에 안 남고,
//       처리 못 하는(=버그) 문법만 raw 로 남는다. 따라서 이 게이트는 renderMarkdown 구현과
//       자동으로 동기화된다 — 렌더러에 문법을 추가하면 통과, 빠뜨리면 자동 FAIL.
// 배경: 2026-06-03 ###/불릿/백틱이 raw 노출된 회귀(references/FAILURE_LOG.md VN-RENDER-LEAK).

import { readFileSync, globSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const OUT = join(ROOT, "out");
if (!existsSync(OUT)) {
  console.log(`[check-render-leaks] out/ 없음 — 빌드 산출물 없음, 건너뜀(통과)`);
  process.exit(0);
}

// visible 텍스트 추출: <article> 우선, script/style/svg 제거, 태그 제거, 엔티티 단순화
function visibleArticleText(html) {
  // <head> 안 메타/타이틀(SEO, 화면 비표시)은 검사 대상이 아니다.
  const body = html.replace(/<head[\s\S]*?<\/head>/gi, " ");
  const segs = [...body.matchAll(/<article[\s\S]*?<\/article>/gi)].map((m) => m[0]);
  const scope = segs.length ? segs.join("\n") : body;
  return scope
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ");
}

// raw 마크다운 누수 패턴 (visible 텍스트 기준, 오탐 최소화)
const LEAK_RULES = [
  { id: "heading", re: /(^|\s)#{2,6}\s+\S/, desc: "raw heading (## ~ ######)" },
  { id: "bold", re: /\*\*[^\s*][^*]*\*\*/, desc: "raw **bold**" },
  { id: "code", re: /`[^`\n]{2,}`/, desc: "raw `code` backtick" },
];

const files = globSync("**/*.html", { cwd: OUT }).map((f) => join(OUT, f));
const leaks = [];

for (const f of files) {
  const html = readFileSync(f, "utf-8");
  const text = visibleArticleText(html);
  for (const rule of LEAK_RULES) {
    const m = text.match(rule.re);
    if (m) {
      const idx = m.index ?? 0;
      const snippet = text.slice(Math.max(0, idx - 10), idx + 50).replace(/\s+/g, " ").trim();
      leaks.push({ file: f.replace(OUT + "/", ""), rule: rule.desc, snippet });
    }
  }
}

console.log(`[check-render-leaks] ${files.length}개 빌드 페이지 검사`);

if (leaks.length === 0) {
  console.log(`[check-render-leaks] ✓ raw 마크다운 누수 0`);
  process.exit(0);
}

console.error(`\n[check-render-leaks] ✗ ${leaks.length}건 raw 마크다운 노출:\n`);
for (const l of leaks.slice(0, 30)) {
  console.error(`  ${l.file}\n     [${l.rule}]  …${l.snippet}…`);
}
console.error(`\n[check-render-leaks] PostDetail.tsx renderMarkdown 이 이 문법을 처리하도록 보강하세요.`);
console.error(`[check-render-leaks] references/FAILURE_LOG.md VN-RENDER-LEAK 참조.`);
process.exit(1);
