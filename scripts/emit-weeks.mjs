#!/usr/bin/env node
// Emit lib/weeks/<slug>.ts from an AB run's normalized cards (IMP-0010, promoted 2026-10-19).
//
// Existing weeks are loaded through the repository's own TypeScript and round-tripped, so every
// already-published post keeps its exact field values. New posts are merged into the matching
// company or appended as a new company. Write mode re-reads what it wrote and fails closed if any
// pre-existing post changed — a silent edit to published copy is the failure mode this guards against.
//
// Run folders used to carry a copy of this file with a hand-edited WEEKS table and verifiedAt date.
// Both are now derived: weeks are ISO weeks of each card's weekSlug, the collection end is
// 03_normalized_items.json `collectedThrough`. Headers: an existing header is kept unless it is a
// "Partial week" header, which is regenerated from the current collection end.
//
// usage: node scripts/emit-weeks.mjs --run <run dir> [--check]
//   --check  writes nothing. exit 0 when every week file already equals what this run would emit,
//            exit 2 with the weeks that would change. (The run-local copies documented --check but
//            ignored it and wrote the files.)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = process.env.EMIT_WEEKS_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(ROOT, "package.json"));
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText,
    filename,
  );

const args = process.argv.slice(2);
const argOf = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1]; };
const RUN = argOf("--run");
const CHECK = args.includes("--check");
if (!RUN) { console.error("usage: node scripts/emit-weeks.mjs --run <run dir> [--check]"); process.exit(3); }

const norm = JSON.parse(fs.readFileSync(path.join(RUN, "03_normalized_items.json"), "utf8"));
const through = norm.collectedThrough || norm.dateRange?.end;
if (!/^\d{4}-\d{2}-\d{2}$/.test(through || "")) {
  console.error("FAIL[emit-weeks:no-collection-end] 03_normalized_items.json has no collectedThrough/dateRange.end");
  process.exit(2);
}
const thumbPath = path.join(RUN, "03_thumbnails.json");
const thumbs = fs.existsSync(thumbPath) ? JSON.parse(fs.readFileSync(thumbPath, "utf8")).map : {};

// Cards held out of this deployment for a publishing-contract reason, recorded with
// their reason in 03_deferred.json so the hold is visible rather than a silent drop.
const deferPath = path.join(RUN, "03_deferred.json");
const deferred = fs.existsSync(deferPath) ? JSON.parse(fs.readFileSync(deferPath, "utf8")) : { deferred: [], deferredWeeks: [] };
const deferredIds = new Set((deferred.deferred || []).map((d) => d.id));
const deferredWeeks = new Set((deferred.deferredWeeks || []).map((d) => d.weekSlug));

// ── ISO week helpers (UTC, so the local timezone never shifts a day) ──
const DAY = 864e5;
const utc = (iso) => new Date(`${iso}T00:00:00Z`);
const isoDate = (d) => d.toISOString().slice(0, 10);
const md = (d) => `${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
function isoWeekMonday(year, week) {
  const jan4 = Date.UTC(year, 0, 4);
  const jan4Dow = (new Date(jan4).getUTCDay() + 6) % 7; // Mon=0
  return new Date(jan4 - jan4Dow * DAY + (week - 1) * 7 * DAY);
}
const span = (a, b) => (a.getUTCMonth() === b.getUTCMonth() ? `${md(a)}~${b.getUTCDate()}` : `${md(a)}~${md(b)}`);
const TAIL = "표시 시각은 한국시간(KST)이며, 발행처가 날짜만 제공한 항목은 날짜만 표시합니다.";

function weekMeta(slug) {
  const m = /^(\d{4})-w(\d{1,2})$/.exec(slug);
  if (!m) throw new Error(`FAIL[emit-weeks:bad-week-slug] ${slug}`);
  const year = Number(m[1]);
  const week = Number(m[2]);
  const mon = isoWeekMonday(year, week);
  const sun = new Date(mon.getTime() + 6 * DAY);
  const end = utc(through);
  const full = end >= sun;
  const monIso = isoDate(mon);
  const sunPart = mon.getUTCMonth() === sun.getUTCMonth() ? String(sun.getUTCDate()) : md(sun);
  const header = full
    ? `// ${monIso}~${sunPart} 전 구간. ${TAIL}`
    : `// Partial week: ${through}까지 수집한 구간만 담았습니다. ${span(new Date(end.getTime() + DAY), sun)}은 다음 수집에서 채웁니다. ${TAIL}`;
  return { year, week, varName: `week${week}`, period: `${md(mon)} ~ ${md(sun)}`, header };
}

// Field order mirrors the shape already used across lib/weeks/*.ts.
const FIELD_ORDER = [
  "date", "platform", "title", "featured", "deck", "summary", "content", "source",
  // thumbnail must precede `en`: verify_thumbnail_policy.sh chunks cards by every
  // `"title":` occurrence, so an `en.title` that is followed by the thumbnail gets
  // paired with it and the English title is compared against a Korean slug filename.
  "officialUrl", "verifiedAt", "slug", "tags", "backupUrls", "thumbnail", "en",
];

function buildPost(card) {
  const post = {
    date: card.date,
    platform: card.platform || "Web",
    title: card.title,
    deck: card.deck,
    summary: card.summary,
    content: card.content,
    source: card.source || card.officialUrl,
    officialUrl: card.officialUrl,
    verifiedAt: card.verifiedAt || through,
    slug: card.slug,
    tags: card.tags,
  };
  if (Array.isArray(card.backupUrls) && card.backupUrls.length) {
    post.backupUrls = card.backupUrls.filter((b) => b && b.url).map((b) => ({ label: b.label || "관련 자료", url: b.url }));
    if (!post.backupUrls.length) delete post.backupUrls;
  }
  post.en = { title: card.en?.title, deck: card.en?.deck, summary: card.en?.summary, content: card.en?.content };
  for (const k of Object.keys(post.en)) if (post.en[k] === undefined) delete post.en[k];
  const t = thumbs[card.id];
  if (t && t.status === "available" && t.src) {
    post.thumbnail = { src: t.src, alt: t.alt || card.title };
    // test-weekly-browse binds every share-preview audit record to this field.
    if (t.selectionKind === "source-share-preview") post.thumbnail.provenance = "source-share-preview";
  }
  return post;
}

function dateKey(value) {
  const m = /^\s*(\d{1,2})\/(\d{1,2})(?:\s+(\d{1,2}):(\d{2}))?/.exec(value || "");
  if (!m) return 0;
  return Number(m[1]) * 1e6 + Number(m[2]) * 1e4 + Number(m[3] || 0) * 100 + Number(m[4] || 0);
}

// Key order is a formatting detail, not content. The drift guard must compare values,
// or it reports a false positive on every re-emitted post and stops being informative.
function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function ordered(obj) {
  const out = {};
  for (const k of FIELD_ORDER) if (obj[k] !== undefined) out[k] = obj[k];
  for (const k of Object.keys(obj)) if (!(k in out)) out[k] = obj[k];
  return out;
}

function loadWeek(file, slug) {
  if (!fs.existsSync(file)) return { existing: null, header: null };
  delete require.cache[require.resolve(file)];
  const existing = Object.values(require(file)).find((v) => v?.companies && v?.slug === slug) || null;
  const header = fs.readFileSync(file, "utf8").split("\n").find((l) => l.startsWith("// ")) || null;
  return { existing, header };
}

function emitWeek(slug, cards) {
  const meta = weekMeta(slug);
  const file = path.join(ROOT, "lib/weeks", `${slug}.ts`);
  const { existing, header: oldHeader } = loadWeek(file, slug);
  const header = oldHeader && !oldHeader.startsWith("// Partial week") ? oldHeader : meta.header;

  const companies = new Map();
  const preexisting = [];
  if (existing) {
    for (const c of existing.companies) {
      companies.set(c.name, { name: c.name, color: c.color, posts: [...c.posts] });
      for (const p of c.posts) preexisting.push({ company: c.name, title: p.title, json: stableStringify(p) });
    }
  }
  // Idempotent: re-running must not append a second copy of a card that is already
  // in the file. Re-emitting the same run twice produced 73 posts in a 43-post week
  // before this guard existed.
  const presentSlugs = new Set();
  for (const c of companies.values()) for (const p of c.posts) if (p.slug) presentSlugs.add(p.slug);
  let reAdded = 0;
  for (const card of cards) {
    if (presentSlugs.has(card.slug)) { reAdded += 1; continue; }
    if (!companies.has(card.company)) companies.set(card.company, { name: card.company, color: card.companyColor, posts: [] });
    companies.get(card.company).posts.push(buildPost(card));
    presentSlugs.add(card.slug);
  }

  const names = [...companies.keys()];
  const existingNames = existing ? existing.companies.map((c) => c.name) : [];
  const addedNames = names.filter((n) => !existingNames.includes(n)).sort((a, b) => a.localeCompare(b, "en"));
  const orderedNames = existing
    ? [...existingNames, ...addedNames]
    : ["Google", ...names.filter((n) => n !== "Google").sort((a, b) => a.localeCompare(b, "en"))].filter((n) => names.includes(n));
  const finalCompanies = orderedNames.map((n) => {
    const c = companies.get(n);
    return { name: c.name, color: c.color, posts: [...c.posts].sort((a, b) => dateKey(b.date) - dateKey(a.date)).map(ordered) };
  });
  const total = finalCompanies.reduce((n, c) => n + c.posts.length, 0);
  const data = { week: meta.week, year: meta.year, slug, period: meta.period, totalPosts: total, companies: finalCompanies };
  const body = `import type { WeeklyData } from "../data";\n\n${header}\nexport const ${meta.varName}: WeeklyData = ${JSON.stringify(data, null, 2)};\n`;
  const row = { slug, file: `lib/weeks/${slug}.ts`, added: cards.length - reAdded, alreadyPresent: reAdded, preexisting: preexisting.length, totalPosts: total, companies: finalCompanies.length };

  if (CHECK) {
    const current = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
    return { ...row, wouldChange: current !== body, missing: current === null, drift: [] };
  }
  fs.writeFileSync(file, body);
  // Re-read and prove no published post was altered.
  const back = loadWeek(file, slug).existing;
  const backIndex = new Map();
  for (const c of back.companies) for (const p of c.posts) backIndex.set(`${c.name}|${p.title}`, stableStringify(p));
  const drift = preexisting.filter((p) => backIndex.get(`${p.company}|${p.title}`) !== p.json);
  return { ...row, drift: drift.map((d) => d.title) };
}

const slugs = [...new Set(norm.items.map((i) => i.weekSlug))].sort();
const report = [];
for (const slug of slugs) {
  if (deferredWeeks.has(slug)) { report.push({ slug, skipped: "week deferred (see 03_deferred.json)" }); continue; }
  const cards = norm.items.filter((i) => i.weekSlug === slug && !deferredIds.has(i.id));
  if (!cards.length) { report.push({ slug, skipped: "no cards" }); continue; }
  report.push(emitWeek(slug, cards));
}

let failed = 0;
for (const r of report) {
  if (r.skipped) { console.log(`SKIP ${r.slug}: ${r.skipped}`); continue; }
  if (r.drift.length) { failed++; console.log(`FAIL[drift] ${r.slug}: ${r.drift.length} published post(s) changed: ${r.drift.slice(0, 3).join(" | ")}`); }
  if (CHECK && r.wouldChange) {
    failed++;
    console.log(`FAIL[emit-weeks:check] ${r.slug}: ${r.missing ? "file missing" : `file differs (+${r.added} card(s) not yet emitted, or order/header drift)`}`);
  }
  console.log(`${r.slug}: +${r.added} new (${r.alreadyPresent} already present), ${r.preexisting} preserved, totalPosts=${r.totalPosts}, companies=${r.companies}`);
}
const mode = CHECK ? "check" : "write";
console.log(failed ? `FAIL[emit-weeks:${mode}] ${failed} week(s)` : CHECK ? "PASS[emit-weeks:check] every week file equals this run's emission" : "PASS[emit-weeks] no published post altered");
process.exit(failed ? 2 : 0);
