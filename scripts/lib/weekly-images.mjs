import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import ts from 'typescript';
import { imageContentType } from './source-image.mjs';

const require = createRequire(import.meta.url);
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename);
export const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
export const sourceUrl = post => post.officialUrl || post.source || post.xUrl || post.threadsUrl || post.backupUrls?.[0]?.url || '';
export const imageKey = item => `${item.week}|${item.title}|${item.sourceUrl}`;
export function collectWeeklyImages(root = process.cwd()) {
  return fs.readdirSync(path.join(root, 'lib/weeks')).filter(name => name.endsWith('.ts')).sort().flatMap(name => {
    const dataTarget = `lib/weeks/${name}`;
    const week = Object.values(require(path.join(root, dataTarget))).find(value => value?.companies && value?.slug);
    if (!week) return [];
    return week.companies.flatMap((company, ci) => company.posts.map((post, pi) => ({ week: week.slug, title: post.title, sourceUrl: sourceUrl(post), dataTarget, dataPath: `companies[${ci}].posts[${pi}]`, post, images: [post.thumbnail, ...(post.images || [])].filter(image => image?.src) })));
  });
}
export function validateWeeklyImages(items, ledger, root = process.cwd()) {
  const failures = [], unresolved = [], available = [];
  if (ledger?.version !== 1 || !Array.isArray(ledger?.records)) return { failures: ['Missing or invalid committed source image audit'], unresolved, available };
  const records = new Map();
  for (const entry of ledger.records) {
    if (records.has(entry.key)) failures.push(`Duplicate audit record: ${entry.key}`);
    records.set(entry.key, entry);
  }
  const itemKeys = new Set(items.map(imageKey));
  for (const key of records.keys()) if (!itemKeys.has(key)) failures.push(`Stale audit identity: ${key}`);
  for (const repair of [...(ledger.existingFormatRepairs || []), ...(ledger.existingPathRepairs || [])]) {
    if (!items.some(item => item.images.some(image => image.src === repair.newSrc))) failures.push(`Image repair is not attached: ${repair.newSrc}`);
    if (items.some(item => item.images.some(image => image.src === repair.src))) failures.push(`Old incorrect image path is still used: ${repair.src}`);
    try { if (sha256(fs.readFileSync(path.join(root, 'public', repair.newSrc))) !== repair.sha256) failures.push(`Image repair changed original bytes: ${repair.newSrc}`); }
    catch { failures.push(`Image repair file missing: ${repair.newSrc}`); }
  }
  const checkedFiles = new Set(), directoryEntries = new Map();
  for (const item of items) {
    const key = imageKey(item), audit = records.get(key);
    for (const image of item.images) {
      if (image.src.startsWith('/') && !image.src.startsWith('//')) {
        const file = path.resolve(root, 'public', `.${image.src}`);
        if (!file.startsWith(path.resolve(root, 'public') + path.sep)) { failures.push(`Unsafe image path: ${key}`); continue; }
        if (checkedFiles.has(file)) continue;
        checkedFiles.add(file);
        try {
          const directory = path.dirname(file);
          if (!directoryEntries.has(directory)) directoryEntries.set(directory, fs.readdirSync(directory));
          if (!directoryEntries.get(directory).includes(path.basename(file))) failures.push(`Image filename differs in case or Unicode normalization: ${image.src}`);
          const type = imageContentType(fs.readFileSync(file), file.endsWith('.svg') ? 'image/svg+xml' : 'application/octet-stream');
          if (!type) failures.push(`Invalid image bytes: ${image.src}`);
          if (file.endsWith('.svg') && type !== 'image/svg+xml') failures.push(`Raster image mislabeled as SVG: ${image.src}`);
        }
        catch { failures.push(`Missing image file: ${image.src}`); }
      } else if (!/^https:\/\//.test(image.src)) failures.push(`Unsafe image URL: ${image.src}`);
    }
    if (!audit) {
      if (!item.images.length) failures.push(`Unaudited missing image: ${key}`);
      continue;
    }
    if (!audit.checkedAt || !audit.reason || !Array.isArray(audit.evidence) || !audit.evidence.length) failures.push(`Missing source audit evidence: ${key}`);
    if (audit.status === 'available') {
      available.push(key);
      if (!item.images.some(image => image.src === audit.publicPath)) failures.push(`Found source image is not attached: ${key}`);
      try { if (sha256(fs.readFileSync(path.join(root, 'public', audit.publicPath))) !== audit.sha256) failures.push(`Source image bytes changed: ${key}`); }
      catch { failures.push(`Audited source image missing: ${key}`); }
      if (!/^https:\/\//.test(audit.imageUrl || '') || !['source-first-image', 'source-share-preview'].includes(audit.selectionKind)) failures.push(`Invalid source image provenance: ${key}`);
    } else if (['fetch-failed', 'source-unresolved', 'no-meaningful-image-verified', 'needs-manual-review'].includes(audit.status)) {
      unresolved.push({ key, status: audit.status });
      if (audit.status === 'no-meaningful-image-verified' && !audit.evidence.some(e => e.kind === 'source-review' && e.httpStatus === 200 && e.reviewedArticle === true)) failures.push(`Image absence lacks a reviewed normal article: ${key}`);
    } else failures.push(`Unknown image audit state: ${key}`);
  }
  return { failures, unresolved, available, checkedFiles: checkedFiles.size };
}
