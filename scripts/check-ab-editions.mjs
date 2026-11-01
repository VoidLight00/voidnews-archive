#!/usr/bin/env node
// AB 회차 등록 게이트(빌드 전). 사용자 결정(2026-11-01): "빌드 게이트+승인 목록".
// 사용: node scripts/check-ab-editions.mjs [--root <dir>]   실패 exit 2
//
//   1. lib/ab/data.ts가 등록한 회차는 모두 references/approved-editions.json(게시 승인을 받은 회차)에 있어야 합니다.
//      게시 승인 전 로컬 QA 빌드만 VN_AB_DRAFT_EDITIONS=<slug>[,<slug>]로 지정한 회차를 경고로 통과시킵니다.
//      Vercel 미리보기와 맥미니 자동 게시 빌드는 이 값을 쓰지 않으므로 항상 엄격합니다.
//   2. 등록 회차 파일이 있고, 그 파일과 data.ts가 참조하는 로컬 이미지·영상(/source-media/, /threads-assets/ 등)이
//      public/ 아래에 있어야 합니다. check-dangling-thumbs.mjs는 /og-cache/만 봅니다.
// 2026-10a는 등록 줄만 있고 내용 파일이 미추적이어서, 다음 AB 게시에 섞여 배포 빌드가 깨지거나 승인 없이 공개될 수
// 있었습니다. 커밋 상태로 빌드하는 Vercel·맥미니에서 이 게이트가 실패하면 운영으로 승격되지 않습니다.
// 커밋 직전 인덱스 대조(작업 트리에만 있고 stage하지 않은 파일)는 scripts/check-staged-editions.mjs가 합니다.
import fs from "node:fs";
import path from "node:path";
import { assetRefs, registeredEditions } from "./lib/ab-editions.mjs";

const i = process.argv.indexOf("--root");
const ROOT = i === -1 ? path.resolve(import.meta.dirname, "..") : path.resolve(process.argv[i + 1] || ".");
const fail = (token, msg) => {
  console.error(`FAIL[ab-editions:${token}] ${msg}`);
  process.exit(2);
};
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

let approved;
try {
  approved = JSON.parse(read("references/approved-editions.json")).editions;
} catch (e) {
  fail("list", `references/approved-editions.json을 읽지 못했습니다: ${String(e.message).split("\n")[0]}`);
}
if (!Array.isArray(approved) || approved.length === 0 || !approved.every((s) => typeof s === "string" && s)) {
  fail("list", "editions는 회차 slug 문자열 배열이어야 합니다.");
}

let dataTs;
try {
  dataTs = read("lib/ab/data.ts");
} catch (e) {
  fail("parse", `lib/ab/data.ts를 읽지 못했습니다: ${String(e.message).split("\n")[0]}`);
}
const registered = registeredEditions(dataTs);
if (registered.length === 0) fail("parse", "lib/ab/data.ts에서 회차 import를 찾지 못했습니다.");

// Vercel·CI 빌드에는 초안 허용 값을 적용하지 않습니다. 환경 변수가 잘못 설정되어도 승인 없이 공개되지 않게 합니다.
const hosted = Boolean(process.env.VERCEL || process.env.CI);
const drafts = hosted ? [] : (process.env.VN_AB_DRAFT_EDITIONS || "").split(",").map((s) => s.trim()).filter(Boolean);
if (hosted && process.env.VN_AB_DRAFT_EDITIONS) console.warn("WARN[ab-editions:draft] Vercel·CI 빌드라 VN_AB_DRAFT_EDITIONS를 무시합니다.");
const unapproved = registered.filter((s) => !approved.includes(s));
const blocked = unapproved.filter((s) => !drafts.includes(s));
if (blocked.length) {
  fail("unapproved", `게시 승인 목록에 없는 회차가 등록되어 있습니다: ${blocked.join(", ")}. ` +
    "게시 승인을 받으면 references/approved-editions.json에 추가하고, 아니면 lib/ab/data.ts 등록을 빼십시오. " +
    "승인 전 로컬 QA 빌드라면 VN_AB_DRAFT_EDITIONS=<회차>를 붙여 다시 실행합니다(승인 목록을 미리 고치지 않습니다).");
}

// macOS는 대소문자를 구분하지 않아 existsSync가 A.webp와 a.webp를 같은 파일로 봅니다. 그러면 로컬 빌드는 통과하고
// Vercel(Linux) 빌드만 실패해 매일 게시가 미리보기 단계에서 멈춥니다. 그래서 폴더 목록의 이름과 정확히 비교합니다.
// 한글 이름은 git이 NFC로 저장하므로 NFC로 맞춰 비교합니다.
const listing = new Map();
const namesIn = (dir) => {
  if (!listing.has(dir)) {
    let names = null;
    try { names = new Set(fs.readdirSync(dir).map((n) => n.normalize("NFC"))); } catch { /* 폴더 없음 */ }
    listing.set(dir, names);
  }
  return listing.get(dir);
};
const existsExact = (rel) => {
  let dir = ROOT;
  for (const seg of rel.split("/").filter(Boolean)) {
    if (!namesIn(dir)?.has(seg.normalize("NFC"))) return false;
    dir = path.join(dir, seg);
  }
  return true;
};
const missing = [];
const scan = (rel, src) => {
  for (const p of assetRefs(src)) if (!existsExact(`public${p}`)) missing.push(`public${p} (${rel})`);
};
scan("lib/ab/data.ts", dataTs);
for (const slug of registered) {
  const rel = `lib/ab/editions/${slug}.ts`;
  if (!existsExact(rel)) { missing.push(`${rel} (등록됨)`); continue; }
  scan(rel, read(rel));
}
if (missing.length) fail("missing", `참조한 파일이 없습니다 ${missing.length}개:\n  ${missing.slice(0, 30).join("\n  ")}`);

if (unapproved.length) console.warn(`WARN[ab-editions:draft] 게시 승인 전 초안으로 통과: ${unapproved.join(", ")} (VN_AB_DRAFT_EDITIONS)`);
console.log(`PASS[ab-editions] 등록 ${registered.length}개(승인 목록 ${registered.length - unapproved.length}, 초안 허용 ${unapproved.length}), 회차 파일과 참조 이미지·영상이 모두 있습니다.`);
