#!/usr/bin/env node
// AB 회차 등록과 커밋 대상(git 인덱스)이 맞는지 커밋 직전에 확인합니다.
// 사용: node scripts/check-staged-editions.mjs [--expect <slug>[,<slug>...]]
//
// 2026-11-01: 작업 트리에는 2026-10a 내용 파일과 이미지가 있어 로컬 빌드가 통과했지만, 커밋에는
// 등록 줄(lib/ab/data.ts)만 들어가면 배포 빌드가 TS2307로 실패합니다. 반대로 lib/ab/editions/*.ts를
// glob으로 stage하면 승인되지 않은 회차가 함께 공개됩니다. 그래서 작업 트리가 아니라 인덱스를 봅니다.
//   1. 인덱스의 lib/ab/data.ts가 import하는 ./editions/<slug>마다 lib/ab/editions/<slug>.ts가 인덱스에 있어야 합니다.
//   2. 그 회차 파일이 참조하는 로컬 이미지·영상(/source-media/... 등)이 public/ 아래 인덱스에 있어야 합니다.
//   3. --expect를 주면 이번 커밋에서 새로 등록되는 회차가 정확히 그 목록이어야 합니다.
// 빌드 때는 돌리지 않습니다(run-all-gates.mjs RUN_SCOPED). AB 게시 단계에서 stage 직후 실행합니다.
import { execFileSync } from "node:child_process";

const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const fail = (token, msg) => {
  console.error(`FAIL[staged-editions:${token}] ${msg}`);
  process.exit(2);
};
const editionSlugs = (src) => [...src.matchAll(/from\s+["']\.\/editions\/([^"']+)["']/g)].map((m) => m[1]);
const ASSET = /"(\/[^"\s]+\.(?:png|jpe?g|webp|gif|avif|svg|mp4|webm))"/gi;

const i = process.argv.indexOf("--expect");
const expect = i === -1 ? null : (process.argv[i + 1] || "").split(",").filter(Boolean);
if (expect && expect.length === 0) fail("usage", "--expect 뒤에 회차 slug가 필요합니다.");

let staged, committed, indexed;
try {
  staged = editionSlugs(git("show", ":lib/ab/data.ts"));
  committed = editionSlugs(git("show", "HEAD:lib/ab/data.ts"));
  indexed = new Set(git("ls-files", "-z").split("\0"));
} catch (e) {
  fail("git", `인덱스를 읽지 못했습니다: ${String(e.message).split("\n")[0]}`);
}
if (staged.length === 0) fail("parse", "인덱스의 lib/ab/data.ts에서 회차 import를 찾지 못했습니다.");

const missing = [];
for (const slug of staged) {
  const file = `lib/ab/editions/${slug}.ts`;
  if (!indexed.has(file)) { missing.push(`${file} (등록됨, 인덱스에 없음)`); continue; }
  for (const [, ref] of git("show", `:${file}`).matchAll(ASSET)) {
    let p;
    try { p = decodeURI(ref); } catch { p = ref; }
    if (!indexed.has(`public${p}`)) missing.push(`public${p} (${slug} 참조)`);
  }
}
if (missing.length) fail("missing", `커밋 대상에 빠진 파일 ${missing.length}개:\n  ${missing.join("\n  ")}`);

const added = staged.filter((s) => !committed.includes(s));
if (expect && [...added].sort().join(",") !== [...expect].sort().join(",")) {
  fail("unexpected", `새로 등록되는 회차 [${added.join(", ") || "없음"}] ≠ 승인된 회차 [${expect.join(", ")}]`);
}
console.log(`PASS[staged-editions] 등록 ${staged.length}개 모두 인덱스에 있음 · 새 회차: ${added.join(", ") || "없음"}`);
