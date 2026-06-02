#!/usr/bin/env node
// scripts/check-regressions.mjs — VoidNews AB 회귀 검사기
// references/regressions.json 의 머신체크를 실행해 과거 결함이 재발했는지 본다.
// 기억 = 다음 실행의 조건. prebuild 에 체이닝되어 매 빌드마다 자동 재검사된다.
// Exit 1 — 회귀 1건 이상 발견. 빌드 차단.

import { readFileSync, existsSync, globSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SPEC = join(ROOT, "references", "regressions.json");

if (!existsSync(SPEC)) {
  console.log(`[check-regressions] references/regressions.json 없음 — 건너뜀(통과)`);
  process.exit(0);
}

const spec = JSON.parse(readFileSync(SPEC, "utf-8"));
const checks = Array.isArray(spec.checks) ? spec.checks : [];

function filesFor(globs) {
  const out = new Set();
  for (const g of globs) {
    for (const f of globSync(g, { cwd: ROOT, absolute: true })) out.add(f);
  }
  return [...out];
}

function findMatches(files, patterns, useRegex) {
  const hits = [];
  for (const file of files) {
    const src = readFileSync(file, "utf-8");
    const lines = src.split("\n");
    for (const pat of patterns) {
      const test = useRegex ? new RegExp(pat) : null;
      for (let i = 0; i < lines.length; i++) {
        const hit = useRegex ? test.test(lines[i]) : lines[i].includes(pat);
        if (hit) {
          hits.push({ file: file.replace(ROOT + "/", ""), line: i + 1, pat, text: lines[i].trim().slice(0, 120) });
        }
      }
    }
  }
  return hits;
}

let regressions = [];

for (const c of checks) {
  const files = filesFor(c.globs || []);
  if (c.type === "grep_absent") {
    const hits = findMatches(files, c.patterns || [], !!c.regex);
    if (hits.length) regressions.push({ check: c, hits });
  } else if (c.type === "grep_present_min") {
    const hits = findMatches(files, c.patterns || [], !!c.regex);
    const min = c.min ?? 1;
    if (hits.length < min) {
      regressions.push({ check: c, hits, shortfall: `${hits.length}/${min}` });
    }
  } else {
    console.error(`[check-regressions] 알 수 없는 type: ${c.type} (${c.id}) — 무시`);
  }
}

console.log(`[check-regressions] ${checks.length}개 회귀체크 실행`);

if (regressions.length === 0) {
  console.log(`[check-regressions] ✓ 회귀 0건`);
  process.exit(0);
}

console.error(`\n[check-regressions] ✗ ${regressions.length}개 회귀 재발:\n`);
for (const r of regressions) {
  console.error(`  [${r.check.id}] ${r.check.title} (담당: ${r.check.owner || "?"})`);
  if (r.shortfall) console.error(`    부족: ${r.shortfall}`);
  for (const h of r.hits.slice(0, 8)) {
    console.error(`    ${h.file}:${h.line}  «${h.pat}»  ${h.text}`);
  }
  console.error(``);
}
console.error(`[check-regressions] FAILURE_LOG의 과거 결함이 재발했습니다. references/FAILURE_LOG.md 참조 후 수정하세요.`);
process.exit(1);
