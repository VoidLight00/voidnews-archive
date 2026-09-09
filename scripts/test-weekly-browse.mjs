import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename);
const { getWeeklyBrowseItems } = require('../lib/weekly-browse.ts');
const { weeks } = require('../lib/data.ts');
const { getAllEditorialPostParams, getEditorialPost } = require('../lib/editorial.ts');
const routes = getAllEditorialPostParams();
const posts = weeks.flatMap(week => week.companies.flatMap(company => company.posts));
assert.equal(routes.length, posts.length);
assert.equal(new Set(routes.map(route => `${route.slug}/${route.postSlug}`)).size, routes.length);
for (const route of routes) {
  assert.match(route.postSlug, /^[a-z0-9-]+$/);
  assert.ok(getEditorialPost(route.slug, route.postSlug));
}
for (const post of posts) {
  assert.ok(post.summary?.trim(), `Missing summary: ${post.title}`);
  assert.match(post.summary, /[가-힣]/, `Missing Korean summary: ${post.title}`);
}
for (const week of weeks) {
  const items = getWeeklyBrowseItems(week);
  assert.equal(items[0].count, week.companies.reduce((sum, company) => sum + company.posts.length, 0));
  assert.equal(items.length, week.companies.length + 1);
}
const future = { slug: '2099-w01', week: 1, year: 2099, period: '1/1 ~ 1/7', totalPosts: 999, companies: [{ name: 'Future Company / 미래 기업', color: '#555', posts: [{ title: 'Fixture only', date: '1/1', platform: 'X' }] }] };
assert.deepEqual(getWeeklyBrowseItems(future), [{ id: 'all', label: '전체 소식', count: 1 }, { id: 'Future Company / 미래 기업', label: 'Future Company', count: 1 }]);
future.companies[0].posts.push({ title: 'Second fixture', date: '1/2', platform: 'X' });
assert.equal(getWeeklyBrowseItems(future)[0].count, 2);
assert.deepEqual(getWeeklyBrowseItems({ ...future, companies: [] }), [{ id: 'all', label: '전체 소식', count: 0 }]);
// Explicit preview provenance must render a visible disclosure, never inferred from a path.
require.extensions['.tsx'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText, filename);
const { imageDisclosure, ImageDisclosure } = require('../app/components/ImageDisclosure.tsx');
const { renderToStaticMarkup } = require('react-dom/server');
const { createElement } = require('react');
assert.equal(imageDisclosure('/source-images/unknown.png'), null);
assert.equal(imageDisclosure(undefined, 'ko', 'source-share-preview'), null);
assert.match(imageDisclosure('/og-cache/kimi-k3-editorial.svg'), /편집 제작/);
for (const locale of ['ko', 'en']) {
  const markup = renderToStaticMarkup(createElement(ImageDisclosure, { src: '/source-images/fixture.png', provenance: 'source-share-preview', locale }));
  assert.equal(markup, '', 'Source preview audit metadata must not add a visible label');
}
const { createHash } = await import('node:crypto');
const evidenceRecords = ['source-image-evidence.json', 'BACKFILL-IMAGE-EVIDENCE.json']
  .flatMap(name => JSON.parse(fs.readFileSync(new URL(`../docs/redesign/${name}`, import.meta.url), 'utf8')).records)
  .filter(record => record.postSlug && record.disposition === 'accepted-source-preview');
const previews = posts.filter(post => post.thumbnail?.provenance === 'source-share-preview');
const currentImageEvidence = JSON.parse(fs.readFileSync(new URL('../references/weekly-source-image-audit.json', import.meta.url), 'utf8')).records.filter(record => record.status === 'available' && record.selectionKind === 'source-share-preview');
const currentPreviewPairs = currentImageEvidence.map(record => {
  const week = weeks.find(week => week.slug === record.week);
  const post = week?.companies.flatMap(company => company.posts).find(post => post.title === record.title);
  assert.ok(post, `Audited preview post exists: ${record.key}`);
  assert.equal(post.thumbnail?.provenance, 'source-share-preview');
  assert.equal(post.officialUrl || post.source || post.xUrl || post.threadsUrl || '', record.sourceUrl);
  assert.equal(post.thumbnail.src, record.publicPath);
  const bytes = fs.readFileSync(new URL(`../public${record.publicPath}`, import.meta.url));
  assert.equal(bytes.length, record.byteSize);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), record.sha256);
  return { record, post };
});
const legacyPreviews = previews.filter(post => !currentPreviewPairs.some(pair => pair.post === post));
assert.ok(evidenceRecords.length > 0, 'Preview evidence must not be empty');
assert.equal(new Set(evidenceRecords.map(record => record.postSlug)).size, evidenceRecords.length, 'Duplicate preview evidence');
assert.deepEqual(new Set(legacyPreviews.map(post => post.slug)), new Set(evidenceRecords.map(record => record.postSlug)), 'Legacy preview posts and evidence must correspond in both directions');
assert.equal(previews.length, evidenceRecords.length + currentPreviewPairs.length, 'Every preview must have exactly one legacy or current evidence record');
for (const post of legacyPreviews) {
  const record = evidenceRecords.find(record => record.postSlug === post.slug);
  assert.equal(record.sourceUrl, post.source);
  assert.equal(record.localPublicPath, post.thumbnail.src);
  assert.equal(record.visualInspectionPerformed, false);
  assert.equal(record.firstArticleImageVerified, false);
  assert.equal(record.reuseRightsVerified, false);
  assert.match(record.sha256, /^[a-f0-9]{64}$/);
  assert.match(record.localPublicPath, /^\/source-images\/[a-f0-9]{64}\.(?:png|jpg|jpeg|webp|gif|avif)$/);
  assert.equal(record.localPublicPath.split('/').at(-1).split('.')[0], record.sha256);
  const imageBytes = fs.readFileSync(new URL(`../public${record.localPublicPath}`, import.meta.url));
  assert.equal(imageBytes.length, record.byteLength, `Image size mismatch: ${post.slug}`);
  assert.equal(createHash('sha256').update(imageBytes).digest('hex'), record.sha256, `Image hash mismatch: ${post.slug}`);
}
assert.equal(posts.find(post => post.slug === 'ollama-20260821-v0-33-rc2').thumbnail, undefined);
console.log(`PASS ${weeks.length} real issues and future/empty issue fixtures; counts use posts, not stale totalPosts; ${previews.length} explicit preview disclosures matched one-to-one with source/path/hash evidence`);
