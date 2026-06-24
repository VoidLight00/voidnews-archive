// Extract published AB weekly + edition posts from TS object-literal files.
// Strategy: strip `import type ...` lines and the `export const <name>: <Type> =`
// prefix, then eval the remaining object literal (valid JS for both quoted and
// unquoted-key styles). Emits one JSONL record per post with provenance.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const SITE = path.join(os.homedir(), "projects/voidnews-archive");
const WEEKS_DIR = path.join(SITE, "lib/weeks");
const ED_DIR = path.join(SITE, "lib/ab/editions");

function evalModuleObject(file) {
  let src = fs.readFileSync(file, "utf8");
  // drop import lines
  src = src
    .split("\n")
    .filter((l) => !/^\s*import\s/.test(l))
    .join("\n");
  // strip `export const NAME: TYPE =` -> keep RHS; also handle `export const NAME =`
  const m = src.match(/export\s+const\s+[A-Za-z0-9_]+\s*(?::[^=]+)?=\s*/);
  if (!m) throw new Error("no export const in " + file);
  let body = src.slice(m.index + m[0].length);
  // remove trailing `;` and any trailing `export ...` after the object
  body = body.trim();
  if (body.endsWith(";")) body = body.slice(0, -1);
  // eslint-disable-next-line no-eval
  const obj = eval("(" + body + ")");
  return obj;
}

function mdToISO(md, year) {
  // md like "6/8" or "5/28"
  if (!md || typeof md !== "string") return null;
  const mm = md.match(/(\d{1,2})\/(\d{1,2})/);
  if (!mm) return null;
  const M = String(parseInt(mm[1], 10)).padStart(2, "0");
  const D = String(parseInt(mm[2], 10)).padStart(2, "0");
  return `${year}-${M}-${D}`;
}

const out = [];

// ---- Weeklies ----
for (const f of fs.readdirSync(WEEKS_DIR).filter((x) => x.endsWith(".ts")).sort()) {
  const file = path.join(WEEKS_DIR, f);
  let wk;
  try {
    wk = evalModuleObject(file);
  } catch (e) {
    console.error("WEEK FAIL", f, e.message);
    continue;
  }
  const year = wk.year || 2026;
  for (const co of wk.companies || []) {
    for (const p of co.posts || []) {
      out.push({
        store: "ab-weekly",
        file: f,
        slug: wk.slug,
        weekNum: wk.week,
        period: wk.period || "",
        company: co.name || "",
        date: mdToISO(p.date, year),
        rawDate: p.date || "",
        title: p.title || "",
        deck: p.deck || "",
        summary: p.summary || "",
        officialUrl: p.officialUrl || "",
        source: p.source || "",
        backupUrls: (p.backupUrls || []).map((b) => b.url).filter(Boolean),
        tags: p.tags || [],
        postSlug: p.slug || "",
        featured: !!p.featured,
        threadsUrl: p.threadsUrl || "",
        xUrl: p.xUrl || "",
      });
    }
  }
}

// ---- Editions ----
for (const f of fs.readdirSync(ED_DIR).filter((x) => x.endsWith(".ts")).sort()) {
  const file = path.join(ED_DIR, f);
  let ed;
  try {
    ed = evalModuleObject(file);
  } catch (e) {
    console.error("EDITION FAIL", f, e.message);
    continue;
  }
  for (const h of ed.highlights || []) {
    const p = h.post || {};
    out.push({
      store: "ab-edition",
      file: f,
      slug: ed.slug,
      edition: ed.slug,
      period: ed.period || "",
      company: h.sourceCompany || "",
      sourceWeek: h.sourceWeek || "",
      tier: h.tier || "",
      rank: h.rank,
      date: mdToISO(p.date, 2026),
      rawDate: p.date || "",
      title: p.title || "",
      deck: p.deck || "",
      summary: p.summary || "",
      officialUrl: p.officialUrl || "",
      source: p.source || "",
      backupUrls: (p.backupUrls || []).map((b) => b.url).filter(Boolean),
      tags: p.tags || [],
      postSlug: p.slug || "",
    });
  }
}

const OUTDIR = process.argv[2];
fs.writeFileSync(path.join(OUTDIR, "ts_items.jsonl"), out.map((o) => JSON.stringify(o)).join("\n") + "\n");
const byStore = out.reduce((a, o) => ((a[o.store] = (a[o.store] || 0) + 1), a), {});
console.error("TS extracted:", out.length, JSON.stringify(byStore));
