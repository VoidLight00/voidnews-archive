#!/usr/bin/env node
// Gate: lib/ 데이터의 모든 /og-cache/ 이미지 참조가 public/ 실파일로 존재하는지 검사.
// 2026-07-07 exhaustive 프로덕션 감사가 /2026-w22/ 등에서 404 broken 이미지(HEAD-absent
// dangling 참조)를 확정 → 재발 방지 영구 가드. run-all-gates 자동 발견 + BUILD_GATES 배선.
// dangling 있으면 exit 2(fail-closed). --warn 이면 report만 exit 0.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const warn = process.argv.includes("--warn");

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(fp));
    else if (e.name.endsWith(".ts")) out.push(fp);
  }
  return out;
}

const refRe = /\/og-cache\/[^"'`\\]+?\.(?:png|jpe?g|webp)/g;
const dangling = [];
const seen = new Set();
for (const fp of walk(path.join(ROOT, "lib"))) {
  const s = fs.readFileSync(fp, "utf8");
  for (const m of s.matchAll(refRe)) {
    const ref = m[0];
    const key = ref + "@" + fp;
    if (seen.has(key)) continue;
    seen.add(key);
    if (!fs.existsSync(path.join(ROOT, "public", ref))) {
      dangling.push({ ref, file: path.relative(ROOT, fp) });
    }
  }
}

if (dangling.length) {
  console.error(`[check-dangling-thumbs] ${dangling.length} dangling og-cache ref(s) — public 파일 없음:`);
  for (const d of dangling) console.error(`  ✗ ${d.ref}  (${d.file})`);
  if (!warn) process.exit(2);
} else {
  console.log("[check-dangling-thumbs] ✓ 모든 og-cache 참조가 public 파일로 존재");
}
