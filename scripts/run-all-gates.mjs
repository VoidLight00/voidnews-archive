#!/usr/bin/env node
// Subgate auto-discovery + fail-closed OR aggregation (extensibility axis).
// Replaces the hardcoded prebuild chain so a newly added check-*/verify-*
// script can never be silently forgotten: build-time gates run with their
// configured args; any UNCONFIGURED gate is surfaced (warn) instead of skipped.
//
// A gate "passes" only on exit 0. Any non-zero (incl. crash) = fail-closed.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPTS = path.join(ROOT, "scripts");

// build-time HARD gates (run on every `next build` via prebuild)
const BUILD_GATES = {
  "check-ab-2026-09a.mjs": [],
  "check-ab-2026-09b.mjs": [],
  "check-source-image-policy.mjs": [],
  "check-weekly-source-images.mjs": [],
  "check-backfill-integration.mjs": [],
  "check-slugs.mjs": [],
  "check-regressions.mjs": [],
  // 회귀 검사기가 '측정 없이 통과'하지 않는지 매 빌드 증명한다(손상 명세 5종 함정).
  // 2026-10-18 실측에서 그 5종이 전부 exit 0 이었다 — FAILURE_LOG VN-GATE-04.
  "check-regressions.selftest.mjs": [],
  "check-card-content.mjs": [],
  "verify-no-duplicates.mjs": ["--scope", "all"],
  "verify-improvements.mjs": [],
  "check-ledger-open.selftest.mjs": [], // pending 2차 집계(나이·evidence 없는 applied)가 계속 보이는지
  "check-emit-weeks.selftest.mjs": [], // IMP-0010 주간 생성기: --check 무쓰기·멱등·drift 감시
  "check-dangling-thumbs.mjs": [],
  "check-i18n-coverage.mjs": [], // w29+ 신규 주차 en 필드 필수 — 영문판 회귀 차단
  "verify-07a-closure.mjs": [], // 2026-07a GA/KO·EN/manifest/report closure 회귀 차단
  "check-horizontal-accent.mjs": [],
  // 공식 채널 영상만 허용 + fluent-korean 편집 규칙.
  // 인자 없음 = 전 회차 검사. 면제는 references/editorial-tone-legacy.json 에 기록된 건만이며,
  // 고쳐져 사라진 legacy 항목은 래칫이 실패시킨다(FAILURE_LOG VN-TONE-01).
  // 2026-10-18 이전에는 여기 회차 목록이 하드코딩돼 있어서 ① 회차마다 손으로 한 줄 추가해야 했고
  // ② 그 목록 밖 과거 회차의 위반 24건이 매 빌드 조용히 통과했다.
  "check-editorial-tone.mjs": [],
};
// gates that are run-scoped (need a run dir / range) — NOT run at build time
const RUN_SCOPED = new Set([
  "check-vip-preview.mjs",
  "verify-publish-ready.mjs",      // publish-time, needs --scope/--run
  "check-date-coverage.mjs",       // consolidate/run, needs --items/--start/--end
  "check-collection-provenance.mjs", // post-collection, needs --run
  "check-render-leaks.mjs",        // postbuild (scans built HTML)
  "verify-live-thumbnails.mjs",    // live network check (not at build time)
  "verify-site-release.mjs",       // mandatory after deployment; requires the actual --url and runs the master plus browser checks
  "run-all-gates.mjs",
]);

const discovered = fs.readdirSync(SCRIPTS)
  .filter((f) => /^(check|verify)-.*\.mjs$/.test(f));

let failed = 0;
const results = [];

for (const f of discovered) {
  if (RUN_SCOPED.has(f)) { results.push([f, "skip(run-scoped)"]); continue; }
  if (!(f in BUILD_GATES)) {
    // unconfigured new gate: run with --warn, but a non-zero exit still FAILS the build.
    // (round5 N1: 미등록 게이트의 exit 2가 failed에 합산되지 않아 fail-open이던 결함 — fail-closed로 전환)
    const r = spawnSync("node", [path.join(SCRIPTS, f), "--warn"], { stdio: "inherit" });
    const ok = r.status === 0;
    if (!ok) failed++;
    results.push([f, ok ? "DISCOVERED(unconfigured) PASS" : `DISCOVERED(unconfigured) FAIL exit ${r.status === null ? "crash" : r.status}`]);
    console.error(`[run-all-gates] ⚠️ new gate '${f}' is not in BUILD_GATES — add it with proper args.`);
    continue;
  }
  const r = spawnSync("node", [path.join(SCRIPTS, f), ...BUILD_GATES[f]], { stdio: "inherit" });
  const ok = r.status === 0;
  if (!ok) failed++;
  results.push([f, ok ? "PASS" : `FAIL exit ${r.status === null ? "crash" : r.status}`]);
}

console.log("\n[run-all-gates] summary:");
for (const [f, s] of results) console.log(`  ${s.startsWith("PASS") || s.startsWith("skip") ? "✓" : "✗"} ${f}: ${s}`);
if (failed) {
  console.error(`\n[run-all-gates] ${failed} gate(s) failed — build blocked.`);
  process.exit(1);
}
console.log(`\n[run-all-gates] all ${Object.keys(BUILD_GATES).length} build gates passed.`);
