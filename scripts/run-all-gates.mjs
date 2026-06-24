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
  "check-slugs.mjs": [],
  "check-regressions.mjs": [],
  "check-card-content.mjs": [],
  "verify-no-duplicates.mjs": ["--scope", "all"],
};
// gates that are run-scoped (need a run dir / range) — NOT run at build time
const RUN_SCOPED = new Set([
  "verify-publish-ready.mjs",      // publish-time, needs --scope/--run
  "check-date-coverage.mjs",       // consolidate/run, needs --items/--start/--end
  "check-collection-provenance.mjs", // post-collection, needs --run
  "check-render-leaks.mjs",        // postbuild (scans built HTML)
  "verify-live-thumbnails.mjs",    // live network check (not at build time)
  "run-all-gates.mjs",
]);

const discovered = fs.readdirSync(SCRIPTS)
  .filter((f) => /^(check|verify)-.*\.mjs$/.test(f));

let failed = 0;
const results = [];

for (const f of discovered) {
  if (RUN_SCOPED.has(f)) { results.push([f, "skip(run-scoped)"]); continue; }
  if (!(f in BUILD_GATES)) {
    // unconfigured new gate: surface it (warn) so it can't be silently dropped
    const r = spawnSync("node", [path.join(SCRIPTS, f), "--warn"], { stdio: "inherit" });
    results.push([f, `DISCOVERED(unconfigured) exit ${r.status}`]);
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
