#!/usr/bin/env node
// Read-only final provenance gate. Run from any directory; never regenerates approvals.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');
export const sha = value => createHash('sha256').update(value).digest('hex');
export const read = file => fs.readFileSync(path.resolve(root, file), 'utf8');
export const json = file => JSON.parse(read(file));
export function normalize(value) {
  const url = new URL(value);
  url.hash = '';
  for (const key of [...url.searchParams.keys()]) {
    if (/^utm_|^(fbclid|gclid)$/.test(key)) url.searchParams.delete(key);
  }
  url.searchParams.sort();
  url.pathname = url.pathname.replace(/\/+$/, '') || '/';
  return url.toString().replace(/\/$/, '');
}
export function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(
    Object.keys(value).sort().map(key => [key, stable(value[key])])
  );
  return value;
}
export const content = ({ thumbnail: ignored, ...post }) => post;
export const hashObject = value => sha(JSON.stringify(stable(value)));
export function loadRuntime() {
  const cache = new Map();
  function load(file) {
    const absolute = path.resolve(root, file);
    if (cache.has(absolute)) return cache.get(absolute).exports;
    const module = { exports: {} };
    cache.set(absolute, module);
    const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
    }).outputText;
    const localRequire = name => {
      if (!name.startsWith('.')) return require(name);
      const target = path.resolve(path.dirname(absolute), name);
      return load(fs.existsSync(target + '.ts') ? target + '.ts' : target);
    };
    vm.runInNewContext(code, { module, exports: module.exports, require: localRequire }, { filename: absolute });
    return module.exports;
  }
  const weeks = load('lib/data.ts').weeks;
  const editions = load('lib/ab/data.ts').editions;
  const posts = weeks.flatMap(week => week.companies.flatMap(company =>
    company.posts.map(post => ({ week: week.slug, company: company.name, post }))));
  return { weeks, editions, posts };
}
export function urlsIn(value) {
  if (typeof value === 'string') return /^https?:\/\/\S+$/.test(value) ? [normalize(value)] : [];
  if (!value || typeof value !== 'object') return [];
  return Object.values(value).flatMap(urlsIn);
}
const collapse = value => value.replace(/\s+/g, ' ').trim();
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
export const validDay = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const validTimestamp = value => typeof value === 'string'
  && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)
  && validDay(value.slice(0, 10)) && Number.isFinite(Date.parse(value));
const rowKey = row => `${row.week}/${row.slug ?? row.post?.slug}`;
const sourceOf = post => normalize(post.source || post.officialUrl || 'https://invalid.local');

// Existing flat expectedCounts remains valid. Missing object uses the original contract;
// a supplied object must specify every audited week and newBackfill, never inferred from rows.
export function expectedCounts(manifest, check) {
  const counts = manifest.expectedCounts === undefined
    ? { '2026-w35': 24, '2026-w36': 23, '2026-w37': 5, newBackfill: 41 }
    : manifest.expectedCounts;
  const weeks = Object.fromEntries(Object.entries(counts).filter(([key]) => /^\d{4}-w\d{2}$/.test(key)));
  check(Object.keys(counts).every(key => key in weeks || ['total', 'newBackfill'].includes(key)), 'unknown expectedCounts field');
  check(['2026-w35', '2026-w36', '2026-w37'].every(week => week in weeks), 'expectedCounts missing original audited weeks');
  check(Object.values(counts).every(value => Number.isSafeInteger(value) && value >= 0), 'invalid expectedCounts integer');
  const sum = Object.values(weeks).reduce((total, value) => total + value, 0);
  const total = counts.total ?? sum;
  check(total === sum && total === counts.newBackfill + 11, 'expectedCounts total/week/backfill mismatch');
  return { weeks, total, newBackfill: counts.newBackfill };
}

// Structured dates are parsed from real DOM text, never concatenated into a quote.
// Selectors must resolve uniquely in the hash-bound raw HTML. The entry boundary
// prevents borrowing a date or feature from another release in the same document.
export function checkDateComponents(event, text, check) {
  const { parse } = require('next/dist/compiled/node-html-parser');
  const dom = parse(text);
  const c = event.evidence.dateComponents;
  const unique = selector => {
    const nodes = nonempty(selector) ? dom.querySelectorAll(selector) : [];
    check(nodes.length === 1, `dateComponents selector not unique: ${selector}`);
    return nodes.length === 1 ? nodes[0] : null;
  };
  const heading = unique(c.heading?.selector);
  const entry = unique(c.entrySelector);
  const section = unique(c.sectionSelector);
  const within = (node, ancestor) => node && ancestor && (node === ancestor || within(node.parentNode, ancestor));
  const visible = node => collapse(node?.textContent || '');
  if (!heading || !entry || !section) return;
  check(visible(heading) === c.heading.text && (c.mode === 'bounded-entry' || /^H[1-6]$/.test(heading.tagName)), 'dateComponents heading text/tag mismatch');
  check(within(section, entry), 'dateComponents section outside entry');
  check(visible(section).includes(event.section), 'dateComponents section identity mismatch');
  check(!entry.querySelector('script, style') && !section.closest('script, style'), 'dateComponents non-content DOM');
  const siblings = heading.parentNode.childNodes.filter(node => node.tagName);
  const branch = siblings.find(node => within(entry, node));
  const start = siblings.indexOf(heading), end = siblings.indexOf(branch);
  if (['entry-time', 'bounded-entry'].includes(c.mode)) check(within(heading, entry), 'dateComponents heading outside timed entry');
  else check(start >= 0 && end > start && !siblings.slice(start + 1, end).some(node => /^H[1-6]$/.test(node.tagName)), 'dateComponents crossed heading boundary');
  // Publishers append private-use icon-font glyphs to heading anchor links.
  // Exact heading.text above still binds the glyph; only calendar parsing omits it.
  const calendarHeading = visible(heading).replace(/[-]+$/, '').trim();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let year, month, day;
  if (c.mode === 'bounded-entry') {
    const dateNode = unique(c.day?.selector);
    const copies = (c.responsiveDates || []).map(copy => ({ node: unique(copy.selector), text: copy.text }));
    const dates = [{ node: dateNode, text: c.day?.text }, ...copies];
    check(entry.tagName === 'ARTICLE' || (entry.tagName === 'DIV' && nonempty(entry.id)), 'dateComponents unbounded release entry');
    check(heading.parentNode === dateNode?.parentNode && heading.parentNode !== entry, 'dateComponents date/title not in one header');
    if (entry.tagName === 'DIV') {
      check(heading.parentNode.tagName === 'HEADER' && heading.parentNode.parentNode === entry && copies.length === 0, 'dateComponents release header boundary mismatch');
      check(!entry.querySelector('div[id]'), 'dateComponents entry contains nested release identities');
    } else {
      check(entry.getAttribute('aria-label') === visible(heading) && !entry.querySelector('article'), 'dateComponents article title/boundary mismatch');
      check(entry.querySelectorAll('time').length === dates.length, 'dateComponents undeclared responsive dates');
      check(dates.every(({ node }) => node?.tagName === 'TIME'), 'dateComponents responsive date is not TIME');
      for (const { node } of dates) check(node?.parentNode.querySelectorAll('h1,h2,h3,h4,h5,h6').some(h => visible(h) === visible(heading)), 'dateComponents responsive title mismatch');
    }
    check(new Set(dates.map(({ node }) => node)).size === dates.length, 'dateComponents duplicate responsive selector');
    const parseCalendar = value => {
      if (validDay(value)) return value;
      const parts = value.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
      const index = months.findIndex(name => name === parts?.[1] || name.slice(0, 3) === parts?.[1]);
      return `${parts?.[3]}-${String(index + 1).padStart(2, '0')}-${String(parts?.[2]).padStart(2, '0')}`;
    };
    for (const { node, text: quoted } of dates) {
      check(within(node, entry) && visible(node) === quoted, 'dateComponents scoped date text mismatch');
      check(parseCalendar(visible(node)) === event.publisherDate, 'dateComponents responsive/scoped date mismatch');
    }
    [year, month, day] = parseCalendar(visible(dateNode)).split('-');
  } else if (c.mode === 'entry-time') {
    const time = unique(c.day?.selector);
    check(['LI', 'ARTICLE'].includes(entry.tagName), 'dateComponents timed entry must be li/article');
    check(time?.tagName === 'TIME' && within(time, entry) && visible(time) === c.day?.text, 'dateComponents time outside entry/text mismatch');
    check(entry.querySelectorAll('time').length === 1 && !entry.querySelector('li time, article time'), 'dateComponents timed entry spans multiple events');
    check(validDay(visible(time)), 'dateComponents invalid time calendar date');
    [year, month, day] = visible(time).split('-');
  } else if (c.mode === 'month-day') {
    const match = calendarHeading.match(/^([A-Za-z]+),?\s+(\d{4})$/);
    const badge = unique(c.day?.selector);
    check(within(badge, entry) && visible(badge) === c.day?.text, 'dateComponents day outside entry/text mismatch');
    const badges = entry.querySelectorAll('*').filter(node => /^[A-Za-z]{3,9}\s+\d{1,2}$/.test(visible(node))
      && !node.childNodes.some(child => child.tagName && visible(child) === visible(node)));
    check(badges.length === 1 && badges[0] === badge, 'dateComponents entry spans multiple day badges');
    const parts = visible(badge).match(/^([A-Za-z]+)\s+(\d{1,2})$/);
    year = match?.[2]; month = months.indexOf(match?.[1]) + 1; day = parts?.[2];
    check(month > 0 && parts?.[1].slice(0, 3) === match?.[1].slice(0, 3), 'dateComponents month/day badge mismatch');
  } else {
    check(c.mode === 'date-heading', 'dateComponents unknown mode');
    const match = calendarHeading.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
    year = match?.[3]; month = months.indexOf(match?.[1]) + 1; day = match?.[2];
  }
  const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  check(validDay(date) && date === event.publisherDate, 'dateComponents parsed day mismatch');
  check(nonempty(event.evidence.sectionQuote) && visible(section).includes(collapse(event.evidence.sectionQuote)), 'dateComponents section quotation missing');
  check(Array.isArray(event.evidence.quotes) && event.evidence.quotes.length > 0, 'dateComponents missing body quotations');
  for (const quote of event.evidence.quotes || []) check(nonempty(quote) && visible(entry).includes(collapse(quote)), 'dateComponents quotation outside entry');
}

// A genuine fetch receipt is the alternative when a page has no self URL.
// It binds the requested URL to these exact response bytes, not merely a title.
export function checkSourceReference(row, files, check, readText = read) {
  const evidence = row.event.evidence;
  const ref = evidence.sourceReference;
  if (!ref) return false;
  check(files.has(ref.path), `${row.slug}: unbound source request log`);
  const receipt = atPointer(JSON.parse(readText(ref.path)), ref.pointer);
  check(receipt?.status === 200 && validTimestamp(receipt?.retrievedAt), `${row.slug}: invalid source request status/time`);
  check(normalize(receipt.url) === row.normalizedUrl && normalize(receipt.url) === normalize(evidence.sourceUrl), `${row.slug}: source request URL mismatch`);
  const requested = new URL(receipt.url), final = new URL(receipt.finalUrl);
  check(requested.protocol === 'https:' && final.protocol === 'https:' && requested.origin === final.origin, `${row.slug}: unreviewed source redirect`);
  check(files.has(evidence.path) && /^[a-f0-9]{64}$/.test(receipt.sha256)
    && receipt.sha256 === sha(readText(evidence.path)), `${row.slug}: source response hash mismatch`);
  return true;
}

// A quoted, contiguous section binds the date and feature to the same stored source.
// Merely naming a group or inventing an event id cannot authorize a repeated URL.
export function checkEventEvidence(row, files, check, readText = read) {
  const event = row.event;
  const evidence = event?.evidence;
  check(nonempty(event?.id) && validDay(event?.publisherDate) && nonempty(event?.section), `${row.slug}: missing/invalid dated section identity`);
  if (!evidence) { check(false, `${row.slug}: missing event evidence`); return; }
  check(files.has(evidence.path) && row.evidence.some(item => item.path === evidence.path), `${row.slug}: event evidence not row/hash-bound`);
  check(normalize(evidence.sourceUrl) === row.normalizedUrl, `${row.slug}: event evidence source mismatch`);
  const text = readText(evidence.path);
  const requestBound = checkSourceReference(row, files, check, readText);
  check(text.includes(evidence.sourceUrl) || requestBound, `${row.slug}: event source anchor missing`);
  if (row.publication) check(event.publisherDate === row.publication.publisherDate, `${row.slug}: event/publication day mismatch`);
  if (evidence.dateComponents !== undefined) {
    check(row.evidence.some(item => item.path === evidence.path && item.kind === 'raw-article-html'), `${row.slug}: dateComponents requires raw HTML evidence`);
    checkDateComponents(event, text, check);
    return;
  }
  check(nonempty(evidence.dateQuote) && nonempty(evidence.sectionQuote), `${row.slug}: missing event date/section quotation`);
  const quotes = evidence.quotes;
  check(Array.isArray(quotes) && quotes.length > 0 && quotes.every(nonempty), `${row.slug}: missing event body quotations`);
  if (!Array.isArray(quotes) || !nonempty(evidence.dateQuote) || !nonempty(evidence.sectionQuote)) return;
  check(collapse(evidence.dateQuote).includes(event.publisherDate), `${row.slug}: event date not quoted as publisher calendar date`);
  check(collapse(evidence.sectionQuote).includes(collapse(event.section || '')), `${row.slug}: event section not quoted`);
  check(quotes.some(quote => nonempty(quote) && collapse(quote).includes(collapse(evidence.dateQuote))
    && collapse(quote).includes(collapse(evidence.sectionQuote))), `${row.slug}: event date and section not in one quotation`);
  for (const quote of [...quotes, evidence.dateQuote, evidence.sectionQuote]) {
    check(nonempty(quote) && collapse(text).includes(collapse(quote)), `${row.slug}: event quotation not found`);
  }
  if (row.publication) check(event.publisherDate === row.publication.publisherDate, `${row.slug}: event/publication day mismatch`);
}

export function checkSourceGroups(manifest, runtime, files, check, readText = read) {
  const allRows = [...manifest.rows, ...(manifest.supportingRows || [])];
  const ids = allRows.filter(row => row.event?.id).map(row => row.event.id);
  check(new Set(ids).size === ids.length, 'duplicate event identity');
  for (const url of new Set(allRows.map(row => row.normalizedUrl))) {
    const rows = allRows.filter(row => row.normalizedUrl === url);
    const matches = runtime.posts.filter(item => sourceOf(item.post) === url);
    const grouped = rows.length > 1 || matches.length > 1 || rows.some(row => row.sharedSourceGroup !== undefined);
    if (!grouped) continue;
    check(matches.length === rows.length && matches.every(item => rows.some(row => rowKey(row) === rowKey(item))), `shared source has uncovered runtime posts: ${url}`);
    const group = rows[0].sharedSourceGroup;
    check(nonempty(group) && rows.every(row => row.sharedSourceGroup === group), `shared source group missing/mismatched: ${url}`);
    check(!allRows.some(row => row.sharedSourceGroup === group && row.normalizedUrl !== url), `shared group spans different sources: ${group}`);
    const sections = rows.map(row => `${row.event?.publisherDate}/${collapse(row.event?.section || '').toLowerCase()}`);
    check(new Set(sections).size === rows.length, `duplicate source date/section: ${url}`);
    for (const row of rows) checkEventEvidence(row, files, check, readText);
  }
}

// Only the matching RSS item, never another item's body or the whole feed, can
// substantiate fullContent. This is a feed-body scope, not proof of HTML capture.
export function checkRssContent(row, evidence, text, check) {
  if (evidence.fullContent === undefined) {
    check(row.policy.fullArticleCached === false, `${row.slug}: RSS is not a full article`);
    return;
  }
  const full = evidence.fullContent;
  check(full?.scope === 'feed-content:encoded', `${row.slug}: invalid feed fullContent scope`);
  check(normalize(full.itemUrl) === row.normalizedUrl, `${row.slug}: feed item source mismatch`);
  const items = [...text.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map(match => match[1]);
  const matching = items.filter(item => [...item.matchAll(/<link\b[^>]*>([\s\S]*?)<\/link>/gi)].some(match => {
    const link = match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim().replace(/&amp;/g, '&');
    return sourceOf({ source: link }) === row.normalizedUrl;
  }));
  check(matching.length === 1, `${row.slug}: fullContent needs one matching RSS item`);
  const bodies = [...(matching[0] || '').matchAll(/<content:encoded\b[^>]*>([\s\S]*?)<\/content:encoded>/gi)];
  check(bodies.length === 1 && nonempty(bodies[0][1].replace(/<!\[CDATA\[|\]\]>/g, '')), `${row.slug}: missing content:encoded body`);
  check(Array.isArray(full.quotes) && full.quotes.length > 0 && full.quotes.every(nonempty), `${row.slug}: missing feed body quotations`);
  for (const quote of full.quotes || []) check(nonempty(quote) && collapse(bodies[0]?.[1] || '').includes(collapse(quote)), `${row.slug}: quotation outside matching feed body`);
  check(row.policy.evidenceScope === 'feed-content:encoded', `${row.slug}: feed fullContent scope not disclosed`);
}

const atPointer = (object, pointer) => pointer.split('/').filter(Boolean).reduce((v, key) => v?.[key.replace(/~1/g, '/').replace(/~0/g, '~')], object);
export function urlOccurrences(object, url, pointer = '') {
  if (typeof object === 'string') return /^https?:\/\/\S+$/.test(object) && normalize(object) === url ? [pointer] : [];
  if (!object || typeof object !== 'object') return [];
  return Object.entries(object).flatMap(([key, value]) => urlOccurrences(value, url, `${pointer}/${key.replace(/~/g, '~0').replace(/\//g, '~1')}`));
}
export const ledgerOnlyDisclosure = row => row.classification === 'supporting-runtime'
  && row.policy.datePrecisionDisclosure?.location === 'ledger-only'
  && row.policy.datePrecisionDisclosure?.reason === 'preexisting out-of-scope article; no invented timestamp';

export function checkAbSupporting(manifest, runtime, files, check, readText = read) {
  // Preserve the original baseline exemption; shared baseline URLs are audited
  // when they also participate in a newly reconciled source group.
  const auditedUrls = new Set(manifest.rows.filter(row => row.classification !== 'preexisting-baseline').map(row => row.normalizedUrl));
  const rows = [...manifest.rows, ...(manifest.supportingRows || [])].filter(row => auditedUrls.has(row.normalizedUrl));
  const supporting = manifest.abSupportingRows || [];
  const covered = new Set();
  const identities = new Set(rows.map(row => row.event?.id).filter(Boolean));
  for (const row of supporting) {
    const label = `${row.edition}${row.pointer}`;
    const editions = runtime.editions.filter(edition => edition.slug === row.edition);
    check(editions.length === 1, `AB supporting edition correspondence: ${label}`);
    const post = atPointer(editions[0], row.pointer);
    check(post && hashObject(content(post)) === row.contentSha256, `AB supporting content hash mismatch: ${label}`);
    check(normalize(row.sourceUrl) === row.normalizedUrl && row.sourceId === `src-url-${sha(row.normalizedUrl).slice(0, 20)}`, `AB supporting source mismatch: ${label}`);
    check(nonempty(row.sharedSourceGroup) && rows.some(item => item.normalizedUrl === row.normalizedUrl && item.sharedSourceGroup === row.sharedSourceGroup), `AB supporting unrelated group: ${label}`);
    const occurrences = urlOccurrences(post, row.normalizedUrl);
    check(occurrences.length > 0 && hashObject([...occurrences].sort()) === hashObject([...(row.urlPointers || [])].sort()), `AB supporting URL occurrence mismatch: ${label}`);
    for (const pointer of occurrences) {
      const key = `${row.edition}${row.pointer}${pointer}`;
      check(!covered.has(key), `duplicate AB supporting occurrence: ${key}`);
      covered.add(key);
    }
    check(!identities.has(row.event?.id), `AB duplicate event identity: ${label}`);
    identities.add(row.event?.id);
    checkEventEvidence(row, files, check, readText);
    check(validDay(row.publication?.publisherDate) && row.publication?.precision === 'publisher-date-only'
      && !row.publication.sourceTimestamp && !row.publication.kstTimestamp && !row.publication.kstDate, `AB event invalid calendar precision: ${label}`);
    check(row.policy?.status === 'accepted-primary-evidence' && row.evidence.some(e => e.kind === 'raw-article-html'), `AB missing primary event policy/evidence: ${label}`);
    check(row.joinReferences?.length > 0, `AB missing event mapping: ${label}`);
    for (const ref of row.joinReferences || []) check(files.has(ref.path) && urlsIn(atPointer(JSON.parse(readText(ref.path)), ref.pointer)).includes(row.normalizedUrl), `AB unbound/mismatched ledger: ${label}`);
    for (const evidence of row.evidence) {
      check(files.has(evidence.path), `AB unbound evidence: ${label}`);
      const text = readText(evidence.path);
      if (evidence.expectedOriginalSha256) check(sha(text) === evidence.expectedOriginalSha256, `AB original evidence hash mismatch: ${label}`);
      if (evidence.urlAnchor) check(text.includes(evidence.urlAnchor), `AB source anchor missing: ${label}`);
      for (const quote of evidence.quotes || []) check(nonempty(quote) && collapse(text).includes(collapse(quote)), `AB quotation missing: ${label}`);
    }
    for (const other of rows.filter(item => item.normalizedUrl === row.normalizedUrl)) {
      checkEventEvidence(other, files, check, readText);
      check(!(other.event?.publisherDate === row.event?.publisherDate && collapse(other.event?.section || '').toLowerCase() === collapse(row.event?.section || '').toLowerCase()), `AB duplicate date/feature: ${label}`);
    }
  }
  for (const url of new Set(rows.map(row => row.normalizedUrl))) {
    for (const edition of runtime.editions) {
      for (const pointer of urlOccurrences(edition, url)) check(covered.has(`${edition.slug}${pointer}`), `source already in AB registry without event coverage: ${edition.slug}${pointer}`);
    }
  }
}

// This backfill's explicit publication window is not the whole registered week.
// Exact instants use the Korean calendar; date-only evidence keeps publisher day.
export function checkPublicationWindow(row, post, check) {
  if (row.classification !== 'new-backfill') return;
  const publication = row.publication || {};
  const exact = publication.precision === 'timestamp-with-timezone';
  const day = exact ? publication.kstDate : publication.publisherDate;
  check(validDay(day) && day >= '2026-08-26' && day <= '2026-09-08', `${row.slug}: publication outside backfill window 2026-08-26..2026-09-08`);
  const display = typeof post.date === 'string' ? post.date.match(/^(\d{1,2})\/(\d{1,2})(?:\s+(\d{1,2}):(\d{2}))?$/) : null;
  check(Boolean(display) && validDay(day) && Number(display[1]) === Number(day.slice(5, 7))
    && Number(display[2]) === Number(day.slice(8, 10)), `${row.slug}: display date differs from publication day`);
  if (exact) {
    check(validTimestamp(publication.sourceTimestamp), `${row.slug}: null/invalid source timestamp`);
    if (display?.[3] !== undefined && validTimestamp(publication.sourceTimestamp)) {
      const kst = new Date(Date.parse(publication.sourceTimestamp) + 9 * 3600000).toISOString();
      check(Number(display[3]) === Number(kst.slice(11, 13)) && Number(display[4]) === Number(kst.slice(14, 16)), `${row.slug}: display time differs from publication instant`);
    }
  } else check(display?.[3] === undefined, `${row.slug}: date-only display invents time`);
}

export function validate(manifest, runtime = loadRuntime()) {
  const failures = [];
  const check = (ok, message) => { if (!ok) failures.push(message); };
  const expected = expectedCounts(manifest, check);
  const current = runtime.posts.filter(row => row.week in expected.weeks);
  const files = new Map(manifest.files.map(file => [file.path, file]));
  check(files.size === manifest.files.length, 'duplicate evidence paths');
  for (const file of manifest.files) {
    const absolute = path.resolve(root, file.path);
    check(!path.isAbsolute(file.path) && absolute.startsWith(root + path.sep), `non-durable path: ${file.path}`);
    try { check(sha(fs.readFileSync(absolute)) === file.sha256, `evidence hash mismatch: ${file.path}`); }
    catch { check(false, `missing evidence: ${file.path}`); }
  }
  const baseline = json(manifest.baseline.path);
  check(files.has(manifest.baseline.path), 'baseline not hash-bound');
  check(baseline.posts.length === 11, 'original baseline must have 11 posts');
  // The legacy snapshot is week35; URL reuse must not turn a new event into baseline.
  const baselineRows = new Map(baseline.posts.map(post => [`2026-w35/${post.slug}`, post]));
  check(baselineRows.size === 11, 'duplicate baseline snapshot identity');
  const keys = manifest.rows.map(rowKey);
  check(new Set(keys).size === keys.length, 'duplicate manifest row');
  check([...baselineRows.keys()].every(key => keys.includes(key)), 'original baseline row missing');
  check(manifest.rows.length === expected.total && current.length === expected.total, `expected ${expected.total} manifest/runtime rows`);
  check(current.every(item => keys.includes(rowKey(item))), 'uncovered runtime row');
  check(manifest.rows.filter(row => row.classification === 'new-backfill').length === expected.newBackfill, `expected ${expected.newBackfill} backfill rows`);
  check(manifest.rows.filter(row => row.classification === 'preexisting-baseline').length === 11, 'expected 11 baseline rows');
  checkSourceGroups(manifest, runtime, files, check);
  checkAbSupporting(manifest, runtime, files, check);
  for (const [week, count] of Object.entries(expected.weeks)) {
    const rows = current.filter(row => row.week === week);
    check(rows.length === count && manifest.rows.filter(row => row.week === week).length === count, `${week}: expected ${count}, got ${rows.length}`);
    check(hashObject(rows.map(row => ({ company: row.company, post: content(row.post) }))) === manifest.weekContentHashes[week], `${week}: non-thumbnail content drift`);
  }
  const supporting = manifest.supportingRows || [];
  const allRows = [...manifest.rows, ...supporting];
  check(new Set(allRows.map(rowKey)).size === allRows.length, 'duplicate supporting/manifest identity');
  for (const row of supporting) {
    check(!(row.week in expected.weeks), `${row.slug}: supporting row inside audited weeks`);
    check(row.classification === 'supporting-runtime' && nonempty(row.sharedSourceGroup), `${row.slug}: invalid supporting classification/group`);
    check(manifest.rows.some(item => item.normalizedUrl === row.normalizedUrl && item.sharedSourceGroup === row.sharedSourceGroup), `${row.slug}: supporting row unrelated to audited source`);
  }
  const eventIds = new Set();
  for (const row of allRows) {
    const found = runtime.posts.filter(item => item.week === row.week && item.post.slug === row.slug);
    check(found.length === 1, `runtime correspondence: ${row.week}/${row.slug}`);
    if (found.length !== 1) continue;
    const post = found[0].post;
    const url = normalize(post.source || post.officialUrl);
    check(url === row.normalizedUrl && normalize(row.sourceUrl) === url, `${row.slug}: source URL mismatch`);
    check(row.sourceId === `src-url-${sha(url).slice(0, 20)}`, `${row.slug}: unstable URL identity`);
    check(hashObject(content(post)) === row.contentSha256, `${row.slug}: content hash mismatch`);
    check((supporting.includes(row) ? 'supporting-runtime' : baselineRows.has(rowKey(row)) ? 'preexisting-baseline' : 'new-backfill') === row.classification, `${row.slug}: baseline classification drift`);
    if (row.classification === 'preexisting-baseline') {
      const original = baselineRows.get(rowKey(row));
      if (!original) continue;
      check(sourceOf(original) === url, `${row.slug}: baseline source drift`);
      check(hashObject(content(original)) === row.baselineContentSha256, `${row.slug}: baseline snapshot mismatch`);
      const changed = Object.keys({ ...content(original), ...content(post) }).filter(key => hashObject(original[key] ?? null) !== hashObject(post[key] ?? null));
      check(hashObject(changed.sort()) === hashObject(row.baselineChangedFields), `${row.slug}: baseline revision not disclosed`);
      continue;
    }
    check(['accepted-publisher-announcement', 'accepted-publisher-date-only', 'accepted-limited-rss-provenance', 'accepted-primary-evidence'].includes(row.policy.status), `${row.slug}: unresolved policy ${row.policy.status}`);
    check(row.evidence.some(item => ['raw-article-html', 'raw-rss', 'raw-release-api', 'partial-webfetch-extract'].includes(item.kind)), `${row.slug}: no durable primary evidence`);
    check(row.joinReferences.length > 0 && row.evidence.length > 0, `${row.slug}: missing mapping`);
    for (const ref of row.joinReferences) {
      check(files.has(ref.path), `${row.slug}: unbound collection/ledger ${ref.path}`);
      const object = ref.pointer.split('/').filter(Boolean).reduce((v, key) => v?.[key], json(ref.path));
      check(object && urlsIn(object).includes(url), `${row.slug}: collection/ledger URL join missing at ${ref.path}#${ref.pointer}`);
    }
    for (const evidence of row.evidence) {
      check(files.has(evidence.path), `${row.slug}: unbound evidence ${evidence.path}`);
      const text = read(evidence.path);
      if (evidence.urlAnchor) check(text.includes(evidence.urlAnchor), `${row.slug}: evidence URL anchor missing`);
      for (const quote of evidence.quotes || []) check(collapse(text).includes(collapse(quote)), `${row.slug}: quotation not found in ${evidence.path}`);
      if (evidence.kind === 'raw-rss') checkRssContent(row, evidence, text, check);
      else check(evidence.fullContent === undefined, `${row.slug}: feed scope on non-RSS evidence`);
      if (evidence.expectedOriginalSha256) check(sha(text) === evidence.expectedOriginalSha256, `${row.slug}: original snapshot hash mismatch`);
    }
    const date = row.publication;
    checkPublicationWindow(row, post, check);
    check(validDay(date.publisherDate), `${row.slug}: invalid publisher date`);
    check(['publisher-date-only', 'timestamp-with-timezone'].includes(date.precision), `${row.slug}: unsupported date precision`);
    if (date.precision === 'publisher-date-only') {
      check(!date.kstDate && !date.kstTimestamp && !date.sourceTimestamp, `${row.slug}: invented KST precision`);
      check(!/\d:\d/.test(post.date), `${row.slug}: date-only article has a display time`);
      check(ledgerOnlyDisclosure(row) || /publisher|게시|발행|현지|날짜|공식/.test(post.content + JSON.stringify(post.en)), `${row.slug}: missing date disclosure`);
    } else {
      const valid = validTimestamp(date.sourceTimestamp) && validTimestamp(date.kstTimestamp) && validDay(date.kstDate);
      check(valid, `${row.slug}: missing/invalid exact publication metadata`);
      check(Date.parse(date.sourceTimestamp) === Date.parse(date.kstTimestamp), `${row.slug}: invalid KST conversion`);
      if (valid) check(new Date(Date.parse(date.sourceTimestamp) + 9 * 3600000).toISOString().slice(0, 10) === date.kstDate, `${row.slug}: incorrect KST day`);
    }
    check(Boolean(row.event.id) && !eventIds.has(row.event.id), `${row.slug}: duplicate/missing event identity`);
    eventIds.add(row.event.id);
    const matches = runtime.posts.filter(item => normalize(item.post.source || item.post.officialUrl || 'https://invalid.local') === url);
    check(matches.length === 1 || nonempty(row.sharedSourceGroup), `${row.slug}: duplicate source in full weekly registry`);
    // AB occurrences are checked exhaustively by checkAbSupporting, including backup links.
    const title = post.title.replace(/\s+/g, '').toLowerCase();
    check(runtime.posts.filter(item => item.post.title.replace(/\s+/g, '').toLowerCase() === title).length === 1, `${row.slug}: duplicate event title`);
  }
  for (const id of ['src-sep02-08-01', 'src-sep02-08-03', 'src-sep02-08-06', 'src-sep02-08-15']) {
    const row = manifest.rows.find(item => item.legacySourceIds.includes(id));
    check(row?.policy.status === 'accepted-publisher-announcement' && row.policy.supersedes?.includes('claim-unresolved'), `${id}: stale claim not reconciled`);
    check(row?.evidence.some(item => item.kind === 'normalized-article-extract' && item.quotes?.length), `${id}: confirmation quotes missing`);
  }
  for (const hold of manifest.heldSources) {
    const matches = runtime.posts.filter(item => sourceOf(item.post) === normalize(hold.normalizedUrl));
    if (hold.scope !== 'event') {
      check(hold.scope === undefined || hold.scope === 'url', `invalid hold scope: ${hold.scope}`);
      check(matches.length === 0, `held source published: ${hold.normalizedUrl}`);
      continue;
    }
    // Event holds are opt-in and evidence-bound. Unmapped runtime posts still fail closed.
    checkEventEvidence({ ...hold, slug: hold.event?.id, evidence: hold.evidence || [] }, files, check);
    for (const item of matches) {
      const row = allRows.find(candidate => rowKey(candidate) === rowKey(item));
      check(Boolean(row), `event-held source has uncovered runtime post: ${rowKey(item)}`);
      if (!row) continue;
      checkEventEvidence(row, files, check);
      check(row.event?.id !== hold.event?.id && !(row.event?.publisherDate === hold.event?.publisherDate
        && collapse(row.event?.section || '').toLowerCase() === collapse(hold.event?.section || '').toLowerCase()), `held event published: ${hold.event?.id}`);
    }
  }
  return { status: failures.length ? 'FAIL' : 'PASS', failures, counts: { current: current.length, baseline: baseline.posts.length, backfill: manifest.rows.filter(row => row.classification === 'new-backfill').length, evidenceFiles: files.size, registryWeeks: runtime.weeks.length, registryEditions: runtime.editions.length }, limitations: manifest.limitations };
}
// In-memory fixtures only; --self-test never edits weekly data, evidence or manifests.
export async function selfTest() {
  const { default: assert } = await import('node:assert/strict');
  const url = 'https://example.test/changelog';
  const body = `${url}\n2026-09-01 Feature A ships.\n2026-09-02 Feature B ships.`;
  const rows = ['A', 'B'].map((feature, index) => {
    const day = `2026-09-0${index + 1}`;
    return { week: '2026-w36', slug: feature, normalizedUrl: url, sharedSourceGroup: 'changelog',
      evidence: [{ path: 'fixture.txt' }], publication: { publisherDate: day },
      event: { id: feature, publisherDate: day, section: `Feature ${feature}`, evidence: {
        path: 'fixture.txt', sourceUrl: url, dateQuote: day, sectionQuote: `Feature ${feature}`,
        quotes: [`${day} Feature ${feature} ships.`]
      } } };
  });
  const runtime = { posts: rows.map(row => ({ week: row.week, post: { slug: row.slug, source: url } })) };
  const files = new Map([['fixture.txt', {}]]);
  const failuresFor = operation => {
    const failures = [];
    operation((ok, message) => { if (!ok) failures.push(message); });
    return failures;
  };
  const grouped = (fixture, registry = runtime) => failuresFor(check =>
    checkSourceGroups({ rows: fixture }, registry, files, check, () => body));
  assert.deepEqual(grouped(rows), []);
  const corrupt = change => [rows[0], change(structuredClone(rows[1]))];
  assert(grouped(corrupt(row => ({ ...row, event: { ...row.event, id: 'A' } }))).some(message => message.includes('duplicate event')));
  assert(grouped(corrupt(row => ({ ...row, sharedSourceGroup: undefined }))).some(message => message.includes('group missing')));
  assert(grouped(corrupt(row => ({ ...row, event: { ...row.event, publisherDate: '2026-02-30' } }))).some(message => message.includes('invalid dated')));
  assert(grouped(corrupt(row => ({ ...row, event: { ...row.event, evidence: { ...row.event.evidence, sourceUrl: 'https://other.test' } } }))).some(message => message.includes('source mismatch')));
  assert(grouped(corrupt(row => ({ ...row, event: { ...row.event, evidence: { ...row.event.evidence, quotes: ['invented'] } } }))).some(message => message.includes('quotation not found')));
  assert(grouped(rows, { posts: [...runtime.posts, { week: '2026-w34', post: { slug: 'unmapped', source: url } }] }).some(message => message.includes('uncovered')));
  const feedRow = { slug: 'feed', normalizedUrl: url, policy: { fullArticleCached: true, evidenceScope: 'feed-content:encoded' } };
  const evidence = { fullContent: { scope: 'feed-content:encoded', itemUrl: url, quotes: ['Full feature body.'] } };
  const feed = `<rss><item><link>${url}</link><content:encoded><![CDATA[Full feature body.]]></content:encoded></item></rss>`;
  assert.deepEqual(failuresFor(check => checkRssContent(feedRow, evidence, feed, check)), []);
  assert(failuresFor(check => checkRssContent(feedRow, {}, feed, check)).length);
  assert(failuresFor(check => checkRssContent(feedRow, evidence, feed.replace(url, 'https://other.test'), check)).length);
  assert(failuresFor(check => checkRssContent(feedRow, evidence, feed.replace('Full feature body.', 'Summary only.'), check)).length);
  assert.deepEqual(failuresFor(check => expectedCounts({}, check)), []);
  assert(failuresFor(check => expectedCounts({ expectedCounts: { '2026-w35': 24, newBackfill: 13 } }, check)).length);
  assert.equal(validDay('2026-02-30'), false);
  assert.equal(validTimestamp('2026-09-01T00:00:00'), false);
  const html = '<main><h3>September, 2026</h3><article id="a"><span id="d">Sep 3</span><p id="s">Feature A ships.</p></article><h3>August, 2026</h3><article id="b"><span>Aug 3</span><p id="other">Feature B ships.</p></article></main>';
  const dated = { publisherDate: '2026-09-03', section: 'Feature A', evidence: {
    sectionQuote: 'Feature A', quotes: ['Feature A ships.'], dateComponents: {
      mode: 'month-day', heading: { selector: 'h3:first-child', text: 'September, 2026' },
      day: { selector: '#d', text: 'Sep 3' }, entrySelector: '#a', sectionSelector: '#s'
    }
  } };
  const domFailures = (event, source = html) => failuresFor(check => checkDateComponents(event, source, check));
  assert.deepEqual(domFailures(dated), []);
  assert(domFailures({ ...dated, publisherDate: '2026-09-04' }).length);
  const componentCase = delta => ({ ...dated, evidence: { ...dated.evidence, dateComponents: { ...dated.evidence.dateComponents, ...delta } } });
  assert(domFailures(componentCase({ sectionSelector: '#other' })).length);
  assert(domFailures(componentCase({ entrySelector: '#b' })).length);
  assert(domFailures(componentCase({ heading: { selector: 'h3', text: 'September, 2026' } })).length);
  assert(domFailures({ ...dated, evidence: { ...dated.evidence, quotes: ['Feature B ships.'] } }).length);
  assert(domFailures(dated, html.replace('Sep 3', 'Sep 30')).length);
  const headingDate = componentCase({ mode: 'date-heading', heading: { selector: 'h3:first-child', text: 'September 03, 2026' } });
  assert.deepEqual(domFailures(headingDate, html.replace('September, 2026', 'September 03, 2026')), []);
  const iconDate = { ...headingDate, evidence: { ...headingDate.evidence, dateComponents: {
    ...headingDate.evidence.dateComponents, heading: { selector: 'h3:first-child', text: 'September 03, 2026' }
  } } };
  assert.deepEqual(domFailures(iconDate, html.replace('September, 2026', 'September 03, 2026')), []);
  assert(domFailures(iconDate, html.replace('September, 2026', 'September 03, 2026 changed')).length);
  assert.deepEqual(failuresFor(check => checkSourceGroups({ rows: [rows[0]], supportingRows: [rows[1]] }, runtime, files, check, () => body)), []);
  const timedHtml = '<ul><li id="entry"><time>2026-07-31</time><h3>Feature A</h3><article>Feature A ships.</article></li><li id="elsewhere"><time>2026-08-01</time><h3>Feature B</h3></li></ul>';
  const timed = { publisherDate: '2026-07-31', section: 'Feature A', evidence: {
    sectionQuote: 'Feature A', quotes: ['Feature A ships.'], dateComponents: {
      mode: 'entry-time', heading: { selector: '#entry h3', text: 'Feature A' },
      day: { selector: '#entry time', text: '2026-07-31' }, entrySelector: '#entry', sectionSelector: '#entry h3'
    }
  } };
  assert.deepEqual(domFailures(timed, timedHtml), []);
  assert(domFailures(timed, timedHtml.replace('2026-07-31', '2026-02-30')).length);
  assert(domFailures(timed, timedHtml.replace('<article>', '<time>2026-08-01</time><article>')).length);
  assert(domFailures({ ...timed, evidence: { ...timed.evidence, dateComponents: {
    ...timed.evidence.dateComponents, day: { selector: '#elsewhere time', text: '2026-08-01' }
  } } }, timedHtml).length);
  const boundedHtml = '<article aria-label="Feature A"><div id="desktop"><time>Sep 1, 2026</time><h2>Feature A</h2></div><div id="mobile"><time>Sep 1, 2026</time><h2>Feature A</h2></div><p>Feature A ships.</p></article>';
  const bounded = { publisherDate: '2026-09-01', section: 'Feature A', evidence: {
    sectionQuote: 'Feature A', quotes: ['Feature A ships.'], dateComponents: {
      mode: 'bounded-entry', heading: { selector: '#desktop h2', text: 'Feature A' },
      day: { selector: '#desktop time', text: 'Sep 1, 2026' }, entrySelector: 'article', sectionSelector: '#desktop h2',
      responsiveDates: [{ selector: '#mobile time', text: 'Sep 1, 2026' }]
    }
  } };
  assert.deepEqual(domFailures(bounded, boundedHtml), []);
  assert(domFailures(bounded, boundedHtml.replace('id="mobile"><time>Sep 1', 'id="mobile"><time>Sep 2')).length);
  assert(domFailures({ ...bounded, evidence: { ...bounded.evidence, dateComponents: { ...bounded.evidence.dateComponents, responsiveDates: [] } } }, boundedHtml).length);
  assert(domFailures(bounded, boundedHtml.replace('aria-label="Feature A"', 'aria-label="Different event"')).length);
  assert(domFailures(bounded, boundedHtml.replace('<p>', '<article>Other event</article><p>')).length);
  const historicalPolicy = { datePrecisionDisclosure: { location: 'ledger-only', reason: 'preexisting out-of-scope article; no invented timestamp' } };
  assert(ledgerOnlyDisclosure({ classification: 'supporting-runtime', policy: historicalPolicy }));
  assert(!ledgerOnlyDisclosure({ classification: 'new-backfill', policy: historicalPolicy }));
  assert(!ledgerOnlyDisclosure({ classification: 'supporting-runtime', policy: { datePrecisionDisclosure: { location: 'ledger-only', reason: 'skip' } } }));
  const abPost = { slug: 'old-event', title: 'Old event', backupUrls: [{ url }] };
  const ab = { ...rows[1], edition: 'old-edition', pointer: '/highlights/0/post',
    urlPointers: ['/backupUrls/0/url'], sourceUrl: url, sourceId: `src-url-${sha(url).slice(0, 20)}`,
    contentSha256: hashObject(content(abPost)), policy: { status: 'accepted-primary-evidence' },
    publication: { publisherDate: '2026-09-02', precision: 'publisher-date-only' },
    evidence: [{ path: 'fixture.txt', kind: 'raw-article-html' }], joinReferences: [{ path: 'ledger.json', pointer: '' }] };
  const abRuntime = { editions: [{ slug: 'old-edition', highlights: [{ post: abPost }] }] };
  const abFiles = new Map([...files, ['ledger.json', {}]]);
  const abFailures = (support, registry = abRuntime) => failuresFor(check => checkAbSupporting(
    { rows: [rows[0]], abSupportingRows: support }, registry, abFiles, check,
    path => path === 'ledger.json' ? JSON.stringify({ url }) : body));
  assert.deepEqual(abFailures([ab]), []);
  assert(abFailures([]).length);
  assert(abFailures([{ ...ab, contentSha256: 'wrong' }]).length);
  assert(abFailures([{ ...ab, urlPointers: [] }]).length);
  assert(abFailures([{ ...ab, event: rows[0].event }]).length);
  assert(abFailures([ab], { editions: [...abRuntime.editions, { slug: 'unmapped-edition', url }] }).length);
  const requestRow = { slug: 'request', normalizedUrl: url, event: { evidence: {
    sourceUrl: url, path: 'raw.html', sourceReference: { path: 'request.json', pointer: '/requestLogs/0' }
  } } };
  const receipt = { url, finalUrl: `${url}/stable`, status: 200, retrievedAt: '2026-09-08T12:00:00Z', sha256: sha('<p>No canonical URL</p>') };
  const requestFailures = (record, bound = new Map([['raw.html', {}], ['request.json', {}]])) => failuresFor(check =>
    checkSourceReference(requestRow, bound, check, path => path === 'request.json' ? JSON.stringify({ requestLogs: [record] }) : '<p>No canonical URL</p>'));
  assert.deepEqual(requestFailures(receipt), []);
  assert(requestFailures({ ...receipt, url: 'https://different.test' }).length);
  assert(requestFailures({ ...receipt, sha256: '0'.repeat(64) }).length);
  assert(requestFailures({ ...receipt, status: 404 }).length);
  assert(requestFailures({ ...receipt, retrievedAt: '2026-09-08' }).length);
  assert(requestFailures({ ...receipt, finalUrl: 'https://different.test' }).length);
  assert(requestFailures(receipt, new Map([['raw.html', {}]])).length);
  const windowRow = { slug: 'window', classification: 'new-backfill', publication: {
    precision: 'timestamp-with-timezone', sourceTimestamp: '2026-09-08T14:59:00Z', kstDate: '2026-09-08' } };
  const windowFailures = (row = windowRow, display = '9/08 23:59') => failuresFor(check => checkPublicationWindow(row, { date: display }, check));
  assert.deepEqual(windowFailures(), []);
  assert(windowFailures({ ...windowRow, publication: { ...windowRow.publication, sourceTimestamp: '2026-09-08T15:00:00Z', kstDate: '2026-09-09' } }, '9/09 00:00').length);
  assert(windowFailures({ ...windowRow, publication: { ...windowRow.publication, sourceTimestamp: '1970-01-01T00:00:00Z', kstDate: '1970-01-01' } }, '1/01 09:00').length);
  assert(windowFailures(windowRow, '9/07 23:59').length);
  assert(windowFailures(windowRow, '9/08 22:59').length);
  assert(windowFailures({ ...windowRow, publication: { ...windowRow.publication, sourceTimestamp: null } }).length);
  const dateOnlyWindow = { ...windowRow, publication: { precision: 'publisher-date-only', publisherDate: '2026-08-26' } };
  assert.deepEqual(windowFailures(dateOnlyWindow, '8/26'), []);
  assert(windowFailures(dateOnlyWindow, '8/26 00:00').length);
  assert(windowFailures({ ...dateOnlyWindow, publication: { ...dateOnlyWindow.publication, publisherDate: '2026-08-25' } }, '8/25').length);
  assert.deepEqual(windowFailures({ ...dateOnlyWindow, classification: 'supporting-runtime' }, '1/01'), []);
  return { status: 'PASS', fixtures: 61 };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.includes('--self-test')) {
      process.stdout.write(JSON.stringify(await selfTest()) + '\n');
    } else {
    const manifestPath = process.argv.slice(2).find(argument => !argument.startsWith('--'));
    const result = validate(json(manifestPath || 'docs/redesign/BACKFILL-INTEGRATION.json'));
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    process.exitCode = result.status === 'PASS' ? 0 : 1;
    }
  } catch (error) {
    process.stderr.write(`FAIL[backfill-integration] ${error.message}\n`);
    process.exitCode = 1;
  }
}
