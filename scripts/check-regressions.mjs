#!/usr/bin/env node
// scripts/check-regressions.mjs — VoidNews AB 회귀 검사기
// references/regressions.json 의 머신체크를 실행해 과거 결함이 재발했는지 본다.
// 기억 = 다음 실행의 조건. prebuild 에 체이닝되어 매 빌드마다 자동 재검사된다.
//
// fail-closed 계약 (2026-10-18 신설, gates/count_gate.sh:7 "측정 없는 통과 금지" 이식).
// 그 전까지 아래 5개 경로가 전부 exit 0 이었다 — 게이트가 통과를 선언하면서 실제로는
// 아무것도 재지 않았다. 실측으로 재현한 뒤 닫았다(FAILURE_LOG VN-GATE-04).
//   R1 spec 파일 없음                      → exit 1 (이전: "건너뜀(통과)")
//   R2 checks 가 배열이 아니거나 비어 있음  → exit 1 (최상위 키 오타가 여기 걸린다)
//   R3 알 수 없는 type                     → exit 1 (이전: console 경고 후 무시)
//   R4 glob 이 0개 파일 매치               → exit 1 (allowMissing:true 선언 시만 SKIP)
//   R5 실행한 체크 수 != 선언한 체크 수     → exit 1
//
// Exit 1 — 회귀 1건 이상 발견, 또는 위 계약 위반. 빌드 차단.

import { readFileSync, existsSync, globSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, relative } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.CHECK_REGRESSIONS_ROOT || join(__dirname, "..");
const SPEC = join(ROOT, "references", "regressions.json");

const specErrors = [];
const KNOWN_TYPES = new Set(["grep_absent", "grep_present_min"]);

// R1 — spec 부재는 통과가 아니라 실패다. 기억 층이 통째로 사라진 상태이기 때문이다.
if (!existsSync(SPEC)) {
  console.error(`[check-regressions] FAIL[R1] references/regressions.json 없음 — 회귀 기억 층 부재는 통과가 아닙니다`);
  process.exit(1);
}

let spec;
try {
  spec = JSON.parse(readFileSync(SPEC, "utf-8"));
} catch (e) {
  console.error(`[check-regressions] FAIL[R1] references/regressions.json 파싱 실패: ${e.message}`);
  process.exit(1);
}

// R2 — 최상위 키 오타("check")나 빈 배열이 조용히 0건 실행으로 빠지던 경로.
const checks = Array.isArray(spec.checks) ? spec.checks : null;
if (checks === null) {
  console.error(`[check-regressions] FAIL[R2] 최상위 'checks' 가 배열이 아닙니다 (발견된 키: ${Object.keys(spec).join(", ") || "없음"})`);
  process.exit(1);
}
if (checks.length === 0) {
  console.error(`[check-regressions] FAIL[R2] 'checks' 가 비어 있습니다 — 0건 실행은 통과가 아닙니다`);
  process.exit(1);
}

function filesFor(globs) {
  const out = new Set();
  for (const g of globs) {
    // node 24 의 fs.globSync 는 absolute:true 를 무시하고 상대 경로를 돌려준다(실측 v24.14.0).
    // 그래서 ROOT 와 process.cwd() 가 다르면 readFileSync 가 엉뚱한 곳을 열어 ENOENT 로 죽었다.
    // 리포 루트에서 실행할 때만 우연히 맞던 잠복 결함이라 resolve 로 고정한다.
    for (const f of globSync(g, { cwd: ROOT })) out.add(resolve(ROOT, f));
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
          hits.push({ file: relative(ROOT, file), line: i + 1, pat, text: lines[i].trim().slice(0, 120) });
        }
      }
    }
  }
  return hits;
}

const regressions = [];
const skipped = [];
let executed = 0;

for (const c of checks) {
  const id = c.id || "(id 없음)";

  // R3 — 모르는 type 을 무시하면 그 체크는 영원히 돌지 않는다.
  if (!KNOWN_TYPES.has(c.type)) {
    specErrors.push(`FAIL[R3] ${id}: 알 수 없는 type '${c.type}' (허용: ${[...KNOWN_TYPES].join(", ")})`);
    continue;
  }

  const files = filesFor(c.globs || []);

  // R4 — 대상 파일이 0개면 grep_absent 는 공허하게 통과한다.
  // allowMissing 을 명시한 체크만 SKIP 으로 인정하고, 그 사실을 출력에 남긴다.
  // (VN009 의 _workspace/thumbnails/fallback-map.json 은 gitignore 대상이라
  //  CI 패리티 트리에서 정상적으로 부재한다 — 그 경우만 선언으로 허용한다.)
  if (files.length === 0) {
    if (c.allowMissing === true) {
      skipped.push(`${id} (allowMissing: 대상 0개 — ${JSON.stringify(c.globs || [])})`);
      continue;
    }
    specErrors.push(`FAIL[R4] ${id}: glob 이 0개 파일 매치 — ${JSON.stringify(c.globs || [])} (의도된 부재면 allowMissing:true 를 선언하십시오)`);
    continue;
  }

  executed += 1;

  if (c.type === "grep_absent") {
    const hits = findMatches(files, c.patterns || [], !!c.regex);
    if (hits.length) regressions.push({ check: c, hits });
  } else if (c.type === "grep_present_min") {
    const hits = findMatches(files, c.patterns || [], !!c.regex);
    const min = c.min ?? 1;
    if (hits.length < min) {
      regressions.push({ check: c, hits, shortfall: `${hits.length}/${min}` });
    }
  }
}

// R5 — 실행 + 명시 SKIP 의 합이 선언 수와 같아야 한다. 어긋나면 어딘가가 조용히 빠졌다.
if (specErrors.length === 0 && executed + skipped.length !== checks.length) {
  specErrors.push(`FAIL[R5] 선언 ${checks.length}건 중 실행 ${executed} + 건너뜀 ${skipped.length} — 합이 맞지 않습니다`);
}

if (specErrors.length) {
  console.error(`\n[check-regressions] ✗ 명세 계약 위반 ${specErrors.length}건:\n`);
  for (const e of specErrors) console.error(`  ${e}`);
  console.error(`\n[check-regressions] 회귀 검사가 '측정 없이 통과'하는 것을 막기 위한 계약입니다 (gates/count_gate.sh 와 동일 원칙).`);
  process.exit(1);
}

for (const s of skipped) console.log(`[check-regressions] SKIP ${s}`);
console.log(`[check-regressions] ${executed}개 회귀체크 실행 (선언 ${checks.length} · 건너뜀 ${skipped.length})`);

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
