#!/usr/bin/env node
// HARD gate (VN007): detect coverage gaps near the END of a requested date range.
// The failure it prevents: a run declares "... ~ 2026-06-18" but the newest
// collected item is 2026-06-10, silently dropping a week of recent news while
// every other gate passes.
//
// Usage:
//   node scripts/check-date-coverage.mjs --items <file.json> --start YYYY-MM-DD --end YYYY-MM-DD
//        [--max-tail-gap N=4] [--max-interior-gap N=10] [--warn]
//
// --items file may be:
//   * a CONSOLIDATED_MASTER.json (uses spine_events[].date)
//   * an array of {date}
//   * {items:[{date}]} / {officialVerifiedItems:[{date}]} (collector output)
import fs from "node:fs";

const argv = process.argv.slice(2);
const opt = (k, d) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : d);
const itemsFile = opt("--items");
const start = opt("--start");
const end = opt("--end");
const maxTailGap = parseInt(opt("--max-tail-gap", "4"), 10);
const maxInteriorGap = parseInt(opt("--max-interior-gap", "10"), 10);
const warnOnly = argv.includes("--warn");

if (!itemsFile || !start || !end) {
  console.error("usage: check-date-coverage.mjs --items <file> --start YYYY-MM-DD --end YYYY-MM-DD");
  process.exit(64);
}

const raw = JSON.parse(fs.readFileSync(itemsFile, "utf8"));
let pool = [];
if (Array.isArray(raw)) pool = raw;
else if (raw.spine_events) pool = raw.spine_events;
else if (raw.items) pool = raw.items;
else if (raw.officialVerifiedItems) pool = raw.officialVerifiedItems;
else pool = [];

const dateRe = /(\d{4})-(\d{2})-(\d{2})/;
const dates = pool
  .map((x) => (typeof x === "string" ? x : x.date || x.date_max || ""))
  .map((s) => (s && dateRe.test(s) ? s.match(dateRe)[0] : null))
  .filter(Boolean)
  .filter((d) => d >= start && d <= end)
  .sort();

const toN = (d) => { const [y, m, dd] = d.split("-").map(Number); return Date.UTC(y, m - 1, dd) / 86400000; };
const fromN = (n) => new Date(n * 86400000).toISOString().slice(0, 10);

if (dates.length === 0) {
  console.error(`[check-date-coverage] FAIL — 0 items in range ${start}..${end}`);
  process.exit(warnOnly ? 0 : 2);
}

const sN = toN(start), eN = toN(end);
const newest = toN(dates[dates.length - 1]);
const oldest = toN(dates[0]);
const tailGap = eN - newest;     // days between newest item and range end
const headGap = oldest - sN;     // days between range start and oldest item

// largest interior empty run
const present = new Set(dates.map(toN));
let maxRun = 0, cur = 0, runEnd = null;
for (let n = sN; n <= eN; n++) {
  if (present.has(n)) { cur = 0; }
  else { cur++; if (cur > maxRun) { maxRun = cur; runEnd = n; } }
}

const problems = [];
if (tailGap > maxTailGap)
  problems.push(`TAIL gap ${tailGap}d: newest item ${fromN(newest)} but range ends ${end} (max ${maxTailGap})`);
if (maxRun > maxInteriorGap)
  problems.push(`INTERIOR gap ${maxRun}d empty run ending ${fromN(runEnd)} (max ${maxInteriorGap})`);

console.log(`[check-date-coverage] range ${start}..${end} | items ${dates.length} | span ${fromN(oldest)}..${fromN(newest)} | headGap ${headGap}d tailGap ${tailGap}d maxInteriorGap ${maxRun}d`);
if (problems.length === 0) {
  console.log("[check-date-coverage] OK");
  process.exit(0);
}
for (const p of problems) console.error("  GAP: " + p);
process.exit(warnOnly ? 0 : 2);
