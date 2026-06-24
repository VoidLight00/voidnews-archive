#!/usr/bin/env node
// HARD gate (VN006): no two published cards may share the same canonical
// officialUrl/source. Catches accidental duplicate events across weeks/editions.
// exit 0 = clean, exit 2 = duplicate official URLs found.
//
// Product-identity note: legitimately-separate events have different official
// URLs, so keying on canonical URL never false-positives the OpenAI-/goal vs
// Claude-/goal case (see references/product-identity-dedupe.md).
//
// Usage:
//   node scripts/verify-no-duplicates.mjs [--scope ab|weeks|all] [--warn]
//   node scripts/verify-no-duplicates.mjs --update-baseline   # accept current dups as legacy
//
// Generic index/landing URLs (release-notes, /news, changelog) legitimately back
// multiple distinct cards, so they are allow-listed. Remaining specific-article
// dups are checked against scripts/known-duplicates-baseline.json: only dups NOT
// in the baseline fail the build (regression style), so legacy debt is tracked
// without breaking every build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const scope = argv.includes("--scope") ? (argv[argv.indexOf("--scope") + 1] || "all") : "all";
const warnOnly = argv.includes("--warn");
const updateBaseline = argv.includes("--update-baseline");
const BASELINE_FILE = path.join(ROOT, "scripts/known-duplicates-baseline.json");

// generic index pages that legitimately back many distinct events
const GENERIC = [
  /\/news\/?$/, /release-notes/, /\/changelog/, /chatgpt-release-notes/,
  /\/index\/?$/, /\/blog\/?$/, /help\.openai\.com/,
];
const isGeneric = (c) => GENERIC.some((re) => re.test(c));

function evalModuleObject(file) {
  let src = fs.readFileSync(file, "utf8")
    .split("\n").filter((l) => !/^\s*import\s/.test(l)).join("\n");
  const m = src.match(/export\s+const\s+[A-Za-z0-9_]+\s*(?::[^=]+)?=\s*/);
  if (!m) return null;
  let body = src.slice(m.index + m[0].length).trim();
  if (body.endsWith(";")) body = body.slice(0, -1);
  try { return eval("(" + body + ")"); } catch { return null; }
}

function canon(u) {
  if (!u || typeof u !== "string") return "";
  try {
    const p = new URL(u);
    let host = p.host.toLowerCase().replace(/^www\./, "");
    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      const v = p.searchParams.get("v") || p.pathname.replace(/^\//, "");
      return "yt:" + v;
    }
    return (host + p.pathname.replace(/\/+$/, "")).toLowerCase();
  } catch { return u.toLowerCase(); }
}

const seen = new Map(); // canon -> [{title, where}]
function addPost(p, where) {
  for (const u of [p.officialUrl, p.source]) {
    const c = canon(u);
    if (!c || c === "yt:") continue;
    if (!seen.has(c)) seen.set(c, []);
    const arr = seen.get(c);
    if (!arr.find((x) => x.where === where && x.title === p.title)) {
      arr.push({ title: p.title, where });
    }
    break; // one canonical key per card (prefer officialUrl)
  }
}

if (scope === "all" || scope === "weeks") {
  const dir = path.join(ROOT, "lib/weeks");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts"))) {
    const wk = evalModuleObject(path.join(dir, f));
    if (!wk) continue;
    for (const co of wk.companies || [])
      for (const p of co.posts || []) addPost(p, `${wk.slug}/${co.name}`);
  }
}
if (scope === "all" || scope === "ab") {
  const dir = path.join(ROOT, "lib/ab/editions");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts"))) {
    const ed = evalModuleObject(path.join(dir, f));
    if (!ed) continue;
    for (const h of ed.highlights || []) if (h.post) addPost(h.post, `${ed.slug}`);
  }
}

// editions intentionally re-surface weekly cards; only flag dups WITHIN weeks or
// WITHIN editions, not weekly<->edition reuse. Generic landing URLs allow-listed.
const dups = [];
for (const [c, arr] of seen) {
  if (isGeneric(c)) continue;
  const weekHits = arr.filter((x) => /^\d{4}-w\d+\//.test(x.where));
  const edHits = arr.filter((x) => /^\d{4}-\d{2}[a-z]$/.test(x.where));
  if (weekHits.length > 1) dups.push({ canon: c, kind: "weeks", hits: weekHits });
  if (edHits.length > 1) dups.push({ canon: c, kind: "editions", hits: edHits });
}

if (updateBaseline) {
  const baseline = [...new Set(dups.map((d) => d.canon))].sort();
  fs.writeFileSync(BASELINE_FILE, JSON.stringify({ accepted: baseline, note: "legacy duplicate officialUrls accepted as tech debt; new dups outside this list fail the build" }, null, 2) + "\n");
  console.log(`[verify-no-duplicates] baseline written: ${baseline.length} accepted dups -> ${path.relative(ROOT, BASELINE_FILE)}`);
  process.exit(0);
}

let accepted = new Set();
if (fs.existsSync(BASELINE_FILE)) {
  try { accepted = new Set(JSON.parse(fs.readFileSync(BASELINE_FILE, "utf8")).accepted || []); } catch {}
}
const newDups = dups.filter((d) => !accepted.has(d.canon));

if (dups.length) {
  console.error(`[verify-no-duplicates] ${dups.length} specific-article dup(s) total; ${accepted.size} accepted(legacy); ${newDups.length} NEW (scope=${scope})`);
  for (const d of newDups.slice(0, 40)) {
    console.error(`  NEW [${d.kind}] ${d.canon}`);
    for (const h of d.hits) console.error(`      - ${h.where} :: ${h.title}`);
  }
}
if (newDups.length === 0) {
  console.log(`[verify-no-duplicates] OK — scope=${scope}, ${seen.size} unique URLs, 0 new duplicates (${accepted.size} legacy accepted)`);
  process.exit(0);
}
process.exit(warnOnly ? 0 : 2);
