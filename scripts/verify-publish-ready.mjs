#!/usr/bin/env node
// scripts/verify-publish-ready.mjs — VoidNews AB publish-ready HARD 게이트
// Phase 7 의 publish-ready 판정을 에이전트 산문이 아니라 종료코드로 강제한다(SOFT→HARD).
//
// 검사:
//   A. _workspace/thumbnails/missing.json 의 missing[] 가 비어있지 않으면  → exit 2 (썸네일 미해결)
//   B. lib/**/*.ts 의 thumbnail.src(로컬 "/..." 경로)가 public/ 에 실제로 없으면 → exit 2 (broken image)
//   C. deck 커버리지(카드 대비 deck 필드) → 리포트. --strict 일 때만 부족분 exit 3.
//
// 종료코드: 0 = publish-ready, 2 = 썸네일/이미지 HARD 실패, 3 = strict deck 부족.
// 사용: node scripts/verify-publish-ready.mjs [--strict] [--scope ab|weeks|all] [--run <run_id>]

import { readFileSync, existsSync, globSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const args = process.argv.slice(2);
const STRICT = args.includes("--strict");
const scopeIdx = args.indexOf("--scope");
const SCOPE = scopeIdx !== -1 ? args[scopeIdx + 1] : "all";
const runIdx = args.indexOf("--run");
const RUN = runIdx !== -1 ? args[runIdx + 1] : null;

const fail = [];   // HARD (exit 2)
const strictFail = []; // exit 3 (strict only)
const notes = [];

// ---- A. missing.json ----
const missingPath = join(ROOT, "_workspace", "thumbnails", "missing.json");
if (existsSync(missingPath)) {
  try {
    const m = JSON.parse(readFileSync(missingPath, "utf-8"));
    const list = Array.isArray(m.missing) ? m.missing : [];
    const scoped = list.filter((x) => {
      if (SCOPE === "ab") return /editions|ab/i.test(x.file || "");
      if (SCOPE === "weeks") return /w\d|weeks/i.test(x.file || "");
      return true;
    });
    if (scoped.length) {
      fail.push(`썸네일 미해결 ${scoped.length}건 (missing.json):`);
      for (const x of scoped.slice(0, 10)) fail.push(`    - ${x.file}: ${x.title || x.url} [${x.reason || "?"}]`);
    } else {
      notes.push(`missing.json: 미해결 0건 (scope=${SCOPE})`);
    }
  } catch (e) {
    fail.push(`missing.json 파싱 실패: ${e.message}`);
  }
} else {
  notes.push("missing.json 없음 — 썸네일 주입이 아직 안 돌았거나 0건");
}

// ---- 문자열 제거(중괄호 안전 스캔용) ----
function stripStrings(s) {
  let out = "";
  let i = 0;
  const n = s.length;
  let q = null; // ' " `
  while (i < n) {
    const c = s[i];
    if (q) {
      if (c === "\\") { out += "  "; i += 2; continue; }
      if (c === q) { q = null; out += " "; i++; continue; }
      out += c === "\n" ? "\n" : " ";
      i++;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") { q = c; out += " "; i++; continue; }
    out += c;
    i++;
  }
  return out;
}

// thumbnail/deck 위치는 원본에서, 중괄호 매칭은 stripped 에서.
function libFiles() {
  const globs = [];
  if (SCOPE === "ab" || SCOPE === "all") globs.push("lib/ab/editions/*.ts");
  if (SCOPE === "weeks" || SCOPE === "all") globs.push("lib/weeks/*.ts");
  const set = new Set();
  for (const g of globs) for (const f of globSync(g, { cwd: ROOT, absolute: true })) set.add(f);
  return [...set];
}

// ---- B. thumbnail.src 로컬 파일 실존 ----
let thumbSrcChecked = 0, brokenSrc = [];
const SRC_RE = /thumbnail\s*:\s*\{[^}]*?\bsrc\s*:\s*["'`]([^"'`]+)["'`]/gs;
for (const f of libFiles()) {
  const src = readFileSync(f, "utf-8");
  let m;
  SRC_RE.lastIndex = 0;
  while ((m = SRC_RE.exec(src)) !== null) {
    const url = m[1];
    if (!url.startsWith("/")) continue; // 외부 URL 은 스킵
    thumbSrcChecked++;
    const localPath = join(ROOT, "public", url.replace(/^\//, ""));
    if (!existsSync(localPath)) {
      brokenSrc.push({ file: f.replace(ROOT + "/", ""), src: url });
    }
  }
}
if (brokenSrc.length) {
  fail.push(`broken thumbnail src ${brokenSrc.length}건 (public/ 에 파일 없음):`);
  for (const b of brokenSrc.slice(0, 10)) fail.push(`    - ${b.file}: ${b.src}`);
} else {
  notes.push(`thumbnail.src 로컬 파일: ${thumbSrcChecked}개 전부 실존`);
}

// ---- C. deck 커버리지 (카드=post 단위 추정) ----
// 카드 식별: stripped 소스에서 'slug' 키를 가진 객체를 카드로 보고, 같은 객체 레벨에 deck 가 있는지 본다.
// 구조가 editions(post:{})/weeks(posts:[]) 로 달라 정확 매칭 대신 보수적 카운트:
// 카드 수 ≈ summary 키 수(에디션/위크 최상위엔 summary 없음, 카드마다 summary 있음).
let totalCards = 0, deckCount = 0;
for (const f of libFiles()) {
  const src = readFileSync(f, "utf-8");
  totalCards += (src.match(/^\s*summary\s*:/gm) || []).length;
  deckCount += (src.match(/^\s*deck\s*:/gm) || []).length;
}
const deckGap = Math.max(0, totalCards - deckCount);
if (totalCards > 0) {
  const pct = Math.round((deckCount / totalCards) * 100);
  notes.push(`deck 커버리지: ${deckCount}/${totalCards} (${pct}%) · 미보유 카드 ${deckGap}`);
  if (deckGap > 0) {
    const line = `deck 누락 카드 ${deckGap}개 (커버리지 ${pct}%)`;
    if (STRICT) strictFail.push(line);
    else notes.push(`  (deck 미보유는 현재 비차단. --strict 시 차단. backfill 권장)`);
  }
}

// ---- D. 카드 본문 렌더 안전성 (VN-RENDER-LEAK 재확인) ----
// 소스 게이트(check-card-content)는 항상, 빌드 산출물 게이트(check-render-leaks)는 out/ 존재 시 재실행한다.
{
  const r1 = spawnSync(process.execPath, [join(__dirname, "check-card-content.mjs")], { cwd: ROOT, encoding: "utf-8" });
  if (r1.status !== 0) {
    fail.push("카드 본문 미지원 마크다운 (check-card-content):");
    for (const ln of (r1.stdout + r1.stderr).split("\n").filter((l) => /—|미지원/.test(l)).slice(0, 8)) fail.push(`    ${ln.trim()}`);
  } else {
    notes.push("카드 본문 렌더 안전성(check-card-content): 미지원 마크다운 0");
  }
  if (existsSync(join(ROOT, "out"))) {
    const r2 = spawnSync(process.execPath, [join(__dirname, "check-render-leaks.mjs")], { cwd: ROOT, encoding: "utf-8" });
    if (r2.status !== 0) {
      fail.push("빌드 HTML raw 마크다운 누수 (check-render-leaks):");
      for (const ln of (r2.stdout + r2.stderr).split("\n").filter((l) => /\[|—/.test(l) && /html|raw|heading|code|bold/i.test(l)).slice(0, 8)) fail.push(`    ${ln.trim()}`);
    } else {
      notes.push("빌드 HTML 렌더 누수(check-render-leaks): raw 마크다운 0");
    }
  } else {
    notes.push("out/ 없음 — check-render-leaks 생략(빌드 후 postbuild 에서 강제됨)");
  }
}

// ---- E. 수집 출처 완전성 (VN005) — --run 지정 시 HARD ----
// 임시 수집 스크립트가 official-source-matrix + discovery(TestingCatalog/큐레이터) 단계를
// 우회했는지 산출물 증거로 검증. run_id 가 주어진 publish 흐름에서만 강제(증거 디렉토리 필요).
if (RUN) {
  const collDir = join(ROOT, "_workspace", "oneway", RUN, "content");
  if (!existsSync(collDir)) {
    fail.push(`수집 출처 게이트(VN005): 수집 디렉토리 없음 _workspace/oneway/${RUN}/content`);
  } else {
    const rp = spawnSync(process.execPath, [join(__dirname, "check-collection-provenance.mjs"), collDir], { cwd: ROOT, encoding: "utf-8" });
    if (rp.status !== 0) {
      fail.push("수집 출처 완전성 미통과 (check-collection-provenance, VN005):");
      for (const ln of (rp.stdout + rp.stderr).split("\n").filter((l) => /✗|누락|없다/.test(l)).slice(0, 8)) fail.push(`    ${ln.trim()}`);
    } else {
      notes.push(`수집 출처 완전성(VN005, run=${RUN}): 매트릭스+discovery 증거 확인`);
    }
  }
} else {
  notes.push("VN005 수집 출처 게이트: --run 미지정 → 생략 (수집 검증은 run_id 흐름에서 강제)");
}

// ---- 결과 ----
console.log(`[verify-publish-ready] scope=${SCOPE} strict=${STRICT}`);
for (const n of notes) console.log(`  · ${n}`);

if (fail.length) {
  console.error(`\n[verify-publish-ready] ✗ HARD FAIL — publish 차단:`);
  for (const f of fail) console.error(`  ${f}`);
  process.exit(2);
}
if (strictFail.length) {
  console.error(`\n[verify-publish-ready] ✗ STRICT FAIL:`);
  for (const f of strictFail) console.error(`  ${f}`);
  process.exit(3);
}
console.log(`\n[verify-publish-ready] ✓ publish-ready (HARD 검사 통과)`);
process.exit(0);
