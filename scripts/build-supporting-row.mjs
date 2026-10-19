// Bind Weekly cards that share an already-audited rolling page (changelog, release notes) to
// docs/redesign/BACKFILL-INTEGRATION.json supportingRows: hash-bound raw HTML, a DOM-bound date,
// and quotations re-checked against the stored bytes. Run it AFTER the card text is final:
// contentSha256 binds the runtime post.
//
// usage: node scripts/build-supporting-row.mjs --spec <spec.json>
// spec: { "runId": "...", "dir": "references/backfill-evidence/<YYYYMMDD>-<label>",
//         "rows": [{ "week", "slug", "url", "html": "<downloaded raw html>", "date": "YYYY-MM-DD",
//                    "mode": "month-day" | "date-heading", "feature": "<section text>", "quote": "<entry text>",
//                    "anchor": "<URL as printed in the HTML, when the card URL has a #fragment>" }] }
//
// Promoted to the repo on 2026-10-19 from run 20261006-065837 (10a, build_supporting_row.mjs, one card,
// month-day only). Do not copy into run folders.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { loadRuntime, normalize, sha, hashObject, content } from "./check-backfill-integration.mjs";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const ROOT = path.resolve(import.meta.dirname, "..");
const MANIFEST = path.join(ROOT, "docs/redesign/BACKFILL-INTEGRATION.json");
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const specPath = process.argv[process.argv.indexOf("--spec") + 1];
if (!process.argv.includes("--spec") || !specPath) { console.error("usage: --spec <spec.json>"); process.exit(2); }
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const collapse = (v) => v.replace(/\s+/g, " ").trim();
const visible = (n) => collapse(n?.textContent || "");

function selectorFor(node) {
  const parts = [];
  for (let cur = node; cur && cur.tagName; cur = cur.parentNode) {
    const parent = cur.parentNode;
    if (!parent || !parent.tagName) { parts.unshift(`${cur.tagName.toLowerCase()}:nth-of-type(1)`); break; }
    const same = parent.childNodes.filter((c) => c.tagName === cur.tagName);
    parts.unshift(`${cur.tagName.toLowerCase()}:nth-of-type(${same.indexOf(cur) + 1})`);
  }
  return parts.join(" > ");
}

function deepest(dom, text) {
  const hits = dom.querySelectorAll("p, li").filter((el) => visible(el).includes(text));
  return hits.find((el) => !hits.some((other) => other !== el && other.parentNode && el.querySelectorAll("*").includes(other))) || null;
}

function precedingHeading(node, pattern) {
  for (let x = node; x && x.parentNode && x.parentNode.tagName; x = x.parentNode) {
    const sibs = x.parentNode.childNodes.filter((n) => n.tagName);
    for (let k = sibs.indexOf(x) - 1; k >= 0; k -= 1) {
      if (/^H[1-6]$/.test(sibs[k].tagName)) return pattern.test(visible(sibs[k])) ? { heading: sibs[k], branch: x } : null;
    }
  }
  return null;
}

function monthDay(dom, section, r) {
  const badgesIn = (n) => n.querySelectorAll("*").filter((x) => /^[A-Za-z]{3,9}\s+\d{1,2}$/.test(visible(x))
    && !x.childNodes.some((c) => c.tagName && visible(c) === visible(x)));
  let entry = null;
  for (let cur = section.parentNode; cur && cur.tagName && cur.tagName !== "BODY"; cur = cur.parentNode) {
    const n = badgesIn(cur).length;
    if (n === 1) entry = cur; else if (n > 1) break;
  }
  if (!entry) throw new Error(`${r.slug}: entry with a single day badge not found`);
  const badge = badgesIn(entry)[0];
  const [, mon, day] = r.date.split("-");
  const want = `${MONTHS[Number(mon) - 1].slice(0, 3)} ${Number(day)}`;
  if (visible(badge) !== want) throw new Error(`${r.slug}: badge ${visible(badge)} != ${want}`);
  const found = precedingHeading(entry, /^[A-Za-z]+,?\s+\d{4}$/);
  if (!found) throw new Error(`${r.slug}: month heading not found`);
  return { entry, dc: { mode: "month-day", heading: { selector: selectorFor(found.heading), text: visible(found.heading) },
    entrySelector: selectorFor(entry), sectionSelector: selectorFor(section), day: { selector: selectorFor(badge), text: visible(badge) } } };
}

function dateHeading(dom, section, r) {
  const found = precedingHeading(section, /^[A-Za-z]+\s+\d{1,2},?\s+\d{4}/);
  if (!found) throw new Error(`${r.slug}: date heading not found`);
  const [y, m, d] = r.date.split("-");
  if (!visible(found.heading).startsWith(`${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`)) throw new Error(`${r.slug}: heading ${visible(found.heading)} != ${r.date}`);
  return { entry: found.branch, dc: { mode: "date-heading", heading: { selector: selectorFor(found.heading), text: visible(found.heading) },
    entrySelector: selectorFor(found.branch), sectionSelector: selectorFor(section) } };
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const runtime = loadRuntime();
const invRel = `${spec.dir}/approved-additions.json`;
const inventory = { purpose: "Approved additions: Weekly cards whose source is a shared rolling page.", runId: spec.runId, rows: [] };
const written = new Set([invRel]);
const built = [];
for (const r of spec.rows) {
  const url = normalize(r.url);
  const peers = [...manifest.rows, ...(manifest.supportingRows || [])].filter((x) => x.normalizedUrl === url && !(x.week === r.week && x.slug === r.slug));
  const group = peers.find((x) => x.sharedSourceGroup)?.sharedSourceGroup;
  if (!group) throw new Error(`${r.slug}: no audited row with a sharedSourceGroup for ${url}`);
  const sourceId = `src-url-${sha(url).slice(0, 20)}`;
  const anchor = r.anchor || r.url;
  const cacheRel = `${spec.dir}/source-cache/${sourceId}.html`;
  fs.mkdirSync(path.join(ROOT, spec.dir, "source-cache"), { recursive: true });
  fs.copyFileSync(r.html, path.join(ROOT, cacheRel));
  written.add(cacheRel);
  const dom = parse(fs.readFileSync(path.join(ROOT, cacheRel), "utf8"));
  const section = deepest(dom, r.feature);
  if (!section) throw new Error(`${r.slug}: feature text not found`);
  const { entry, dc } = r.mode === "month-day" ? monthDay(dom, section, r) : dateHeading(dom, section, r);
  if (!visible(entry).includes(collapse(r.quote))) throw new Error(`${r.slug}: quote not inside entry`);
  if (!fs.readFileSync(path.join(ROOT, cacheRel), "utf8").includes(anchor)) throw new Error(`${r.slug}: anchor ${anchor} not in HTML`);
  for (const s of [dc.heading.selector, dc.entrySelector, dc.sectionSelector, dc.day?.selector].filter(Boolean)) {
    if (dom.querySelectorAll(s).length !== 1) throw new Error(`${r.slug}: selector not unique: ${s}`);
  }
  const found = runtime.posts.filter((p) => p.week === r.week && p.post.slug === r.slug);
  if (found.length !== 1) throw new Error(`${r.slug}: runtime posts ${found.length}`);
  inventory.rows.push({ slug: r.slug, week: r.week, company: found[0].company, title: found[0].post.title, publisherDate: r.date, url: r.url, cache: cacheRel });
  built.push({
    week: r.week, company: found[0].company, slug: r.slug, sourceUrl: r.url, normalizedUrl: url, sourceId,
    legacySourceIds: [], classification: "supporting-runtime", contentSha256: hashObject(content(found[0].post)),
    joinReferences: [{ path: invRel, pointer: `/rows/${inventory.rows.length - 1}` }],
    evidence: [{ path: cacheRel, kind: "raw-article-html", urlAnchor: anchor }],
    publication: { precision: "publisher-date-only", publisherDate: r.date },
    policy: { status: "accepted-primary-evidence", fullArticleCached: true, evidenceScope: "cached-primary-source",
      datePrecisionDisclosure: { location: "ledger-only", reason: "rolling page prints a calendar day only; no invented timestamp" } },
    sharedSourceGroup: group,
    event: { id: `${r.week.slice(5)}-shared-${r.slug}`, publisherDate: r.date, section: r.feature,
      evidence: { path: cacheRel, sourceUrl: anchor, sectionQuote: r.feature, quotes: [r.quote], dateComponents: dc } },
  });
}
fs.writeFileSync(path.join(ROOT, invRel), JSON.stringify(inventory, null, 2) + "\n");
const keys = new Set(built.map((b) => `${b.week}/${b.slug}`));
manifest.supportingRows = [...(manifest.supportingRows || []).filter((x) => !keys.has(`${x.week}/${x.slug}`)), ...built];
const files = new Map(manifest.files.map((f) => [f.path, f]));
for (const rel of written) files.set(rel, { path: rel, sha256: sha(fs.readFileSync(path.join(ROOT, rel))) });
manifest.files = [...files.values()];
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
for (const b of built) console.log(`PASS[supporting-row] ${b.week}/${b.slug} ${b.event.evidence.dateComponents.mode} group=${b.sharedSourceGroup}`);
