import assert from 'node:assert/strict';
import fs from 'node:fs';
import { selectSourceImage, selectSourceImages, imageContentType } from './lib/source-image.mjs';

const relatedCard = '<div class="snap-start"><a href="/index/other-story/"><img alt="Other story — Card image" src="/other.jpg"></a></div>';

const base = 'https://publisher.example/news/story';
const og = '<meta content="/share.jpg" property="og:image">';
const cases = [
  ['top article before OG', `${og}<nav><img src="/nav.jpg"></nav><article><h1>Story</h1><img src="/top.jpg"><img src="/later.jpg"></article>`, '/top.jpg'],
  ['article header hero', `${og}<article><header><h1>Story</h1><img src="/top.jpg"></header></article>`, '/top.jpg'],
  ['skip global logo', `${og}<header><img src="/brand.jpg"></header><main><img src="/hero.jpg"><h1>Story</h1></main>`, '/hero.jpg'],
  ['ignore avatar and related cards', `${og}<main><h1>Story</h1><img class="avatar" src="/author.jpg"><aside><img src="/aside.jpg"></aside><div class="related"><img src="/related.jpg"></div><img src="/top.jpg"></main>`, '/top.jpg'],
  ['lazy loading', `${og}<main><h1>Story</h1><img src="data:image/gif;base64,x" data-src="../top.jpg"></main>`, '/top.jpg'],
  ['responsive resolution', `${og}<main><h1>Story</h1><img src="/small.jpg" srcset="/medium.jpg 600w, /top.jpg 1200w"></main>`, '/top.jpg'],
  ['picture source', `${og}<article><h1>Story</h1><picture><source srcset="/top.webp 1200w"><img src="/fallback.jpg"></picture></article>`, '/top.webp'],
  ['hidden and tracking', `${og}<main><h1>Story</h1><div hidden><img src="/hidden.jpg"></div><img width="1" height="1" src="/track.gif"><img src="/top.jpg"></main>`, '/top.jpg'],
  ['background hero', `${og}<main><h1>Story</h1><div style="background-image:url('/top.jpg')"></div></main>`, '/top.jpg'],
  ['share fallback', `${og}<main><h1>Story</h1><p>No photo</p></main>`, '/share.jpg'],
  ['no story context does not pick site art', `${og}<img src="/site.jpg">`, '/share.jpg'],
  ['private image blocked', `${og}<main><h1>Story</h1><img src="https://127.0.0.1/a.jpg"></main>`, '/share.jpg'],
  ['non-https blocked', `${og}<main><h1>Story</h1><img src="javascript:alert(1)"></main>`, '/share.jpg'],
  ['relative entity decoding', `${og}<main><h1>Story</h1><img src="/top.jpg?w=1200&amp;q=80"></main>`, '/top.jpg?w=1200&q=80'],
  ['empty HTML attributes', `${og}<main style><h1>Story</h1><img class style src="/top.jpg"></main>`, '/top.jpg'],
  ['video hero uses poster not media', `${og}<main><h1>Atlas</h1><video src="/hero.mp4" poster="/hero.jpg"></video></main>`, '/hero.jpg'],
  ['video without poster is not an image', `${og}<main><h1>Atlas</h1><video src="/hero.mp4"></video><img src="/top.jpg"></main>`, '/top.jpg'],
  ['decorative heading glyphs excluded', `${og}<main><h1>Images <img src="/letter-glyph.jpg"></h1><img src="/example.jpg"></main>`, '/example.jpg'],
  ['media URL in image attribute rejected', `${og}<main><h1>Atlas</h1><img src="/hero.mp4"></main>`, '/share.jpg'],
  ['avatar CDN excluded', `${og}<main><h1>Story</h1><img src="https://cdn-avatars.huggingface.co/v1/production/uploads/face.jpg"><img src="/top.jpg"></main>`, '/top.jpg'],
  ['byline images excluded', `${og}<main><h1>Story</h1><div class="article-authors"><img src="/person.jpg"></div><img src="/top.jpg"></main>`, '/top.jpg'],
  ['related card in article is not the hero', `${og}<article><h1>Story</h1><p>No image</p>${relatedCard}</article>`, '/share.jpg'],
  ['own article image remains before related card', `${og}<article><h1>Story</h1><img src="/top.jpg">${relatedCard}</article>`, '/top.jpg'],
  ['real illustration with card in alt stays', `${og}<article><h1>Story</h1><img alt="Card image architecture" src="/architecture.jpg">${relatedCard}</article>`, '/architecture.jpg'],
  ['article image in a figure stays', `${og}<article><h1>Story</h1><figure><img src="/method.jpg"></figure>${relatedCard}</article>`, '/method.jpg'],
  ['article hero linked to its own URL stays', `${og}<article><h1>Story</h1><a href="/news/story"><img src="/hero.jpg"></a>${relatedCard}</article>`, '/hero.jpg'],
  ['linked article elsewhere is excluded', `${og}<article><h1>Story</h1><a href="/news/other"><img src="/other.jpg"></a></article>`, '/share.jpg'],
  ['image linked to its own file stays', `${og}<article><h1>Story</h1><a href="/assets/chart.png?raw=1"><img src="/assets/chart.png"></a></article>`, '/assets/chart.png'],
  ['GitHub blob link to the same image stays', `${og}<article><h1>Repo</h1><a href="/org/repo/blob/main/assets/perf.png"><img src="/org/repo/raw/main/assets/perf.png"></a></article>`, '/org/repo/raw/main/assets/perf.png'],
  ['article with title in separate page header', `${og}<header><h1>Research</h1></header><article><img src="/method.jpg"></article>`, '/method.jpg'],
  ['global logo layout class must not hide the article', `${og}<body class="post-template is-head-left-logo"><main><h1>Story</h1><img src="/top.jpg"></main></body>`, '/top.jpg'],
  ['aria-hidden is not visually hidden', `${og}<main><h1>Research</h1><img aria-hidden="true" width="2400" height="1000" src="/hero.jpg"></main>`, '/hero.jpg'],
];
for (const [label,html,expected] of cases) assert.equal(selectSourceImage(html,base)?.image,new URL(expected,base).href,label);
assert.equal(selectSourceImage('<main><h1>Story</h1></main>',base),null);
const candidates=selectSourceImages(`${og}<main><h1>Story</h1><img src="/top.jpg"></main>`,base).candidates;
assert.deepEqual(candidates.map(x=>x.kind),['source-first-image','source-share-preview']);
assert.deepEqual(selectSourceImages(`${og}<main><h1>Story</h1><img src="/broken.jpg"><img src="/usable.jpg"></main>`,base).candidates.map(x=>x.image), ['/broken.jpg','/usable.jpg','/share.jpg'].map(x=>new URL(x,base).href), 'Other article images remain ahead of OG when the first image cannot be fetched');
assert.deepEqual(selectSourceImages(`${og}<article><h1>Story</h1><img src="/top.jpg">${relatedCard}</article>`,base).candidates.map(x=>x.image), ['/top.jpg','/share.jpg'].map(x=>new URL(x,base).href), 'Related article images must not become fallback candidates');
const openaiHtml = new URL('../references/backfill-evidence/20260922-w37-completion/source-cache/src-url-b8a75fb67d8179220690.html', import.meta.url);
const openaiImages = selectSourceImages(fs.readFileSync(openaiHtml, 'utf8'), 'https://openai.com/index/introducing-gpt-live-1-in-the-api/').candidates;
assert.ok(openaiImages.length > 0, 'Saved OpenAI page must yield article imagery');
assert.ok(openaiImages.every(x => !/Card image|Card cover|Art card/i.test(x.alt)), 'Unrelated OpenAI news cards are not article image candidates');
assert.equal(imageContentType(Buffer.from('RIFF0000WEBP'), 'application/octet-stream'), 'image/webp');
assert.equal(imageContentType(Buffer.from('<html>no image</html>'), 'image/png'), null);
assert.equal(imageContentType(Buffer.from('RIFF0000WEBP'), 'text/html'), null);
assert.equal(selectSourceImage(`${og}<meta property="og:title" content="Source title">`,base).title,'Source title');
assert.equal(imageContentType(Buffer.from('0000ftypavif0000'), 'image/avif'),'image/avif');
for (const name of ['inject-thumbnails.mjs','inject-ab-thumbnails.mjs','prefetch-og.mjs']) {
  assert.match(fs.readFileSync(new URL(name,import.meta.url),'utf8'),/selectSourceImage/,`${name} must use shared source-first policy`);
}
console.log(`PASS[source_image_policy] ${cases.length+11} checks; first article image precedes OG; unsafe/decorative images excluded`);
