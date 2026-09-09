import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { imageContentType } from './lib/source-image.mjs';

const root=path.resolve(process.argv[2] || '_workspace/vip-publish-20260909/deploy/.vercel/output/static');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const evidence=JSON.parse(fs.readFileSync(path.join(root,'evidence.json'),'utf8'));
assert.equal((html.match(/data-news=/g)||[]).length,6);
assert.equal((html.match(/data-oss=/g)||[]).length,2);
assert.equal((html.match(/class="source-hero reading"/g)||[]).length,6);
assert.equal(evidence.news.length,6);
assert.equal(evidence.openSource.length,2);
assert.match(html,/name="robots"[^>]+noindex|noindex[^>]+name="robots"/);
assert.match(html,/href="evidence.json"[^>]+id="evidence-download"|id="evidence-download"[^>]+href="evidence.json"/);
for(const item of evidence.news) {
  const image=item.image;
  assert.ok(['source-first-image','source-share-preview'].includes(image.kind));
  assert.equal(image.selectionPolicy,'source-top-image-v1');
  assert.equal(image.sourceUrl,item.primaryUrl);
  assert.match(image.localPath,/^assets\/news-\d+\.(png|jpg|webp|svg|gif)$/);
  const bytes=fs.readFileSync(path.join(root,image.localPath));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),image.sha256);
  assert.equal(imageContentType(bytes,image.contentType),image.contentType);
  assert.ok(html.includes(`src="${image.localPath}"`));
  assert.ok(html.includes(item.primaryUrl));
}
for(const name of ['index.html','evidence.json']) {
  const body=fs.readFileSync(path.join(root,name),'utf8');
  assert.doesNotMatch(body,/\/Users\/|_workspace|\/tmp\/|localhost|127\.0\.0\.1|file:\/\//);
  assert.doesNotMatch(body,/(?:sk-[A-Za-z0-9_-]{30,}|ghp_[A-Za-z0-9]{30,}|Bearer\s+[A-Za-z0-9_.-]{20,})/);
}
assert.equal(fs.readdirSync(path.join(root,'assets')).length,6);
console.log('PASS[vip_preview] 6 news + 2 tools; 6 image hashes/content types; public paths, sources, download and noindex verified');
