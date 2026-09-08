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
export function validate(manifest) {
  const failures = [];
  const check = (ok, message) => { if (!ok) failures.push(message); };
  const runtime = loadRuntime();
  const current = runtime.posts.filter(row => ['2026-w35', '2026-w36', '2026-w37'].includes(row.week));
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
  const baseUrls = new Set(baseline.posts.map(post => normalize(post.source || post.officialUrl)));
  const keys = manifest.rows.map(row => `${row.week}/${row.slug}`);
  check(new Set(keys).size === keys.length, 'duplicate manifest row');
  check(new Set(manifest.rows.map(row => row.normalizedUrl)).size === 52, 'expected 52 distinct source URLs');
  check(manifest.rows.length === 52 && current.length === 52, 'expected 52 manifest/runtime rows');
  check(manifest.rows.filter(row => row.classification === 'new-backfill').length === 41, 'expected 41 backfill rows');
  for (const [week, count] of Object.entries({ '2026-w35': 24, '2026-w36': 23, '2026-w37': 5 })) {
    const rows = current.filter(row => row.week === week);
    check(rows.length === count, `${week}: expected ${count}, got ${rows.length}`);
    check(hashObject(rows.map(row => ({ company: row.company, post: content(row.post) }))) === manifest.weekContentHashes[week], `${week}: non-thumbnail content drift`);
  }
  const eventIds = new Set();
  for (const row of manifest.rows) {
    const found = current.filter(item => item.week === row.week && item.post.slug === row.slug);
    check(found.length === 1, `runtime correspondence: ${row.week}/${row.slug}`);
    if (found.length !== 1) continue;
    const post = found[0].post;
    const url = normalize(post.source || post.officialUrl);
    check(url === row.normalizedUrl, `${row.slug}: source URL mismatch`);
    check(row.sourceId === `src-url-${sha(url).slice(0, 20)}`, `${row.slug}: unstable URL identity`);
    check(hashObject(content(post)) === row.contentSha256, `${row.slug}: content hash mismatch`);
    check((baseUrls.has(url) ? 'preexisting-baseline' : 'new-backfill') === row.classification, `${row.slug}: baseline classification drift`);
    if (row.classification === 'preexisting-baseline') {
      const original = baseline.posts.find(item => normalize(item.source || item.officialUrl) === url);
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
      if (evidence.kind === 'raw-rss') check(row.policy.fullArticleCached === false, `${row.slug}: RSS is not a full article`);
      if (evidence.expectedOriginalSha256) check(sha(text) === evidence.expectedOriginalSha256, `${row.slug}: original snapshot hash mismatch`);
    }
    const date = row.publication;
    if (date.precision === 'publisher-date-only') {
      check(!date.kstDate && !date.kstTimestamp && !date.sourceTimestamp, `${row.slug}: invented KST precision`);
      check(!/\d:\d/.test(post.date), `${row.slug}: date-only article has a display time`);
      check(/publisher|게시|발행|현지|날짜|공식/.test(post.content + JSON.stringify(post.en)), `${row.slug}: missing date disclosure`);
    } else {
      check(Boolean(date.sourceTimestamp && date.kstTimestamp && date.kstDate), `${row.slug}: missing exact publication metadata`);
      check(Date.parse(date.sourceTimestamp) === Date.parse(date.kstTimestamp), `${row.slug}: invalid KST conversion`);
      check(new Date(Date.parse(date.sourceTimestamp) + 9 * 3600000).toISOString().slice(0, 10) === date.kstDate, `${row.slug}: incorrect KST day`);
    }
    check(Boolean(row.event.id) && !eventIds.has(row.event.id), `${row.slug}: duplicate/missing event identity`);
    eventIds.add(row.event.id);
    const matches = runtime.posts.filter(item => normalize(item.post.source || item.post.officialUrl || 'https://invalid.local') === url);
    check(matches.length === 1, `${row.slug}: duplicate source in full weekly registry`);
    const abMatches = runtime.editions.filter(edition => urlsIn(edition).includes(url));
    check(abMatches.length === 0, `${row.slug}: source already in AB registry`);
    const title = post.title.replace(/\s+/g, '').toLowerCase();
    check(runtime.posts.filter(item => item.post.title.replace(/\s+/g, '').toLowerCase() === title).length === 1, `${row.slug}: duplicate event title`);
  }
  for (const id of ['src-sep02-08-01', 'src-sep02-08-03', 'src-sep02-08-06', 'src-sep02-08-15']) {
    const row = manifest.rows.find(item => item.legacySourceIds.includes(id));
    check(row?.policy.status === 'accepted-publisher-announcement' && row.policy.supersedes?.includes('claim-unresolved'), `${id}: stale claim not reconciled`);
    check(row?.evidence.some(item => item.kind === 'normalized-article-extract' && item.quotes?.length), `${id}: confirmation quotes missing`);
  }
  for (const hold of manifest.heldSources) {
    check(!runtime.posts.some(item => normalize(item.post.source || item.post.officialUrl || 'https://invalid.local') === hold.normalizedUrl), `held source published: ${hold.normalizedUrl}`);
  }
  return { status: failures.length ? 'FAIL' : 'PASS', failures, counts: { current: current.length, baseline: baseline.posts.length, backfill: manifest.rows.filter(row => row.classification === 'new-backfill').length, evidenceFiles: files.size, registryWeeks: runtime.weeks.length, registryEditions: runtime.editions.length }, limitations: manifest.limitations };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const manifestPath = process.argv.slice(2).find(argument => !argument.startsWith('--'));
    const result = validate(json(manifestPath || 'docs/redesign/BACKFILL-INTEGRATION.json'));
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    process.exitCode = result.status === 'PASS' ? 0 : 1;
  } catch (error) {
    process.stderr.write(`FAIL[backfill-integration] ${error.message}\n`);
    process.exitCode = 1;
  }
}
