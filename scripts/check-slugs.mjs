#!/usr/bin/env node
// scripts/check-slugs.mjs — slug ASCII-only lint
// Reason: Next.js 16 static export + non-ASCII route segment 가 Vercel 정적 파일 매칭에
// 실패하여 404 를 반환하는 사례 (2026-05-28 Grok Build 카드) 가 발생함. 재발 방지.
// Exit 1 — 비-ASCII slug 발견. 빌드 차단.

import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const TARGETS = [
  "lib/ab/editions/*.ts",
  "lib/weeks/*.ts",
  "lib/data.ts",
];

const SLUG_KEY_RE = /\b(slug|postSlug)\s*:\s*"([^"]+)"/g;
const RESERVED_RE = /^[a-z0-9\-]+$/i;

let totalScanned = 0;
let violations = [];

for (const pattern of TARGETS) {
  const files = globSync(pattern, { cwd: ROOT, absolute: true });
  for (const file of files) {
    const src = readFileSync(file, "utf-8");
    let m;
    SLUG_KEY_RE.lastIndex = 0;
    while ((m = SLUG_KEY_RE.exec(src)) !== null) {
      totalScanned++;
      const key = m[1];
      const value = m[2];
      const lineNo = src.slice(0, m.index).split("\n").length;
      const relPath = file.replace(ROOT + "/", "");

      if (!RESERVED_RE.test(value)) {
        violations.push({
          file: relPath,
          line: lineNo,
          key,
          value,
          reason: hasNonAscii(value)
            ? "non-ASCII (한글/유니코드)"
            : "허용 안 된 문자 (a-z 0-9 - 만 허용)",
        });
      }
    }
  }
}

function hasNonAscii(s) {
  for (const c of s) {
    if (c.codePointAt(0) > 127) return true;
  }
  return false;
}

console.log(`[check-slugs] scanned ${totalScanned} slug fields across ${TARGETS.join(", ")}`);

if (violations.length === 0) {
  console.log(`[check-slugs] ✓ all slugs are ASCII-only`);
  process.exit(0);
}

console.error(`\n[check-slugs] ✗ ${violations.length} violation(s):\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}`);
  console.error(`    ${v.key} = "${v.value}"`);
  console.error(`    reason: ${v.reason}`);
  console.error(``);
}
console.error(
  `[check-slugs] Next.js 16 static export does not reliably serve routes with non-ASCII segments on Vercel.`
);
console.error(
  `[check-slugs] Replace each slug with ASCII-only (a-z 0-9 -). Optionally keep an 8-char hash suffix for uniqueness.`
);
process.exit(1);
