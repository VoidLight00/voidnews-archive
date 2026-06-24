#!/usr/bin/env node
// `/AB consolidate` engine entry. Merges every AB run workspace + published
// weekly/edition archive + threads-automation bot collection into one
// deduped master, then runs the dedupe HARD gates.
//
// Pipeline (deterministic):
//   1. extract_ts.mjs        published weekly + edition posts -> ts_items.jsonl
//   2. extract_collected.py  AB run JSON + threads sqlite/content -> collected_items.jsonl
//   3. dedupe.py             product-identity dedupe + bot-coverage folding -> CONSOLIDATED_MASTER.json
//   4. render_list.py        human-readable CONSOLIDATED_LIST.md + self dup-check
//   5. verify-no-duplicates  + check-date-coverage  HARD gates
//
// Usage:
//   node scripts/consolidate-runs.mjs --start 2026-04-06 --end 2026-06-18 [--run <run_id>]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SC = path.join(ROOT, "scripts/consolidate");
const argv = process.argv.slice(2);
const opt = (k, d) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : d);
const start = opt("--start", "2026-04-06");
const end = opt("--end", new Date().toISOString().slice(0, 10));
const runId = opt("--run", `${end.replace(/-/g, "")}-consolidate-ab-${start.replace(/-/g, "")}-${end.replace(/-/g, "")}`);
const RUN = path.join(ROOT, "_workspace/ab", runId);
const EX = path.join(RUN, "extract");
fs.mkdirSync(EX, { recursive: true });

const sh = (cmd, args) => {
  process.stderr.write(`\n$ ${cmd} ${args.join(" ")}\n`);
  execFileSync(cmd, args, { stdio: "inherit" });
};

sh("node", [path.join(SC, "extract_ts.mjs"), EX]);
sh("python3", [path.join(SC, "extract_collected.py"), EX]);
sh("python3", [path.join(SC, "dedupe.py"), RUN]);
sh("python3", [path.join(SC, "render_list.py"), RUN]);

let failed = false;
for (const [cmd, args] of [
  ["node", [path.join(ROOT, "scripts/verify-no-duplicates.mjs"), "--scope", "all"]],
  ["node", [path.join(ROOT, "scripts/check-date-coverage.mjs"), "--items", path.join(RUN, "CONSOLIDATED_MASTER.json"), "--start", start, "--end", end]],
]) {
  try { sh(cmd, args); } catch { failed = true; }
}

console.log(`\nconsolidate run: ${path.relative(os.homedir(), RUN)}`);
console.log(`  master: CONSOLIDATED_MASTER.json`);
console.log(`  list:   CONSOLIDATED_LIST.md`);
if (failed) {
  console.error("\n[consolidate] one or more HARD gates failed (see above). master/list are written; fix gaps/dups before publish.");
  process.exit(2);
}
console.log("[consolidate] OK — all HARD gates passed");
