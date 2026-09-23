import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import ts from 'typescript';
import assert from 'node:assert/strict';

// 2026-09b VIP: 본편 6 · 추가로 보면 좋을 뉴스 1 · 공개 도구 2.
// 순서·출처 이미지 해시·주장 경계(자체 발표 수치, 비상업 라이선스, 도구 접근 범위)를 종료코드로 강제한다.
const root = path.resolve(import.meta.dirname, '..');
const source = fs.readFileSync(path.join(root, 'lib/ab/editions/2026-09b.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS }, reportDiagnostics: true });
assert.ok(!compiled.diagnostics?.some(d => d.category === ts.DiagnosticCategory.Error), 'edition syntax');
const exports = {};
vm.runInNewContext(compiled.outputText, { exports }, { timeout: 2000 });
const e = exports.edition2026_09b;
const ledger = JSON.parse(fs.readFileSync(path.join(root, 'docs/vip/20260924/SOURCES.json'), 'utf8'));
assert.equal(e.slug, '2026-09b');
assert.equal(e.announceDate, '2026-09-24');
assert.equal(e.period, '2026-09-10 ~ 2026-09-23');
assert.equal(e.highlights.length, 6);
assert.equal(e.modelWatch.length, 1);
assert.equal(e.editorsPicks.length, 2);
assert.equal(e.modelWatchSection?.title, '추가로 보면 좋을 뉴스');

const ordered = [/Opus 5\.5/, /GPT-6 Sol/, /GPT-Live-1/, /Jev/, /Grok 4\.7/, /Qwen-Image-2\.1/];
const primaryHosts = ['www.anthropic.com', 'openai.com', 'openai.com', 'typesafe.ai', 'x.ai', 'github.com'];
const imageByPath = new Map(ledger.images.map(i => [i.publicPath, i]));
const used = new Set();
const image = value => {
  assert.ok(value?.src && value.alt && value.caption, 'image needs path, alt, caption');
  const proof = imageByPath.get(value.src);
  assert.ok(proof, `every image must have source evidence: ${value.src}`);
  const bytes = fs.readFileSync(path.join(root, 'public', value.src));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), proof.sha256, value.src);
  assert.equal(bytes.length, proof.byteSize);
  assert.equal(proof.originalBytesUnedited, true);
  assert.ok(proof.width >= 240 && proof.height >= 120);
  assert.ok(['source-first-image', 'source-share-preview'].includes(proof.selectionKind));
  if (proof.selectionKind === 'source-share-preview') assert.equal(value.provenance, 'source-share-preview');
  assert.doesNotMatch(proof.alt + proof.url, /Card image|Card cover|Art card/i, 'related-article cards are not article images');
  used.add(value.src);
};

for (const [index, highlight] of e.highlights.entries()) {
  const p = highlight.post;
  assert.equal(highlight.rank, index + 1);
  assert.match(p.title, ordered[index]);
  assert.ok(p.content.length >= 1000, `substantive body: ${p.slug}`);
  assert.ok((p.content.match(/\*\*[^*]+\*\*/g) ?? []).length >= 4, `sections: ${p.slug}`);
  assert.equal(new URL(p.officialUrl).hostname, primaryHosts[index]);
  assert.equal(p.source, p.officialUrl);
  assert.ok(p.releaseScope?.length > 5, 'reviewed availability');
  const proof = ledger.stories.find(s => s.slug === p.slug);
  assert.equal(proof?.officialUrl, p.officialUrl, `ledger story: ${p.slug}`);
  assert.equal(proof?.date, p.date);
  assert.match(p.content, /실습|해볼 과제|확인 기준/);
  assert.ok(p.en?.title && p.en?.summary && p.en?.content, `English: ${p.slug}`);
  assert.ok(!p.videoUrl, 'no unofficial video');
  image(p.thumbnail);
}

// 같은 날 나온 두 모델은 별도 카드다.
const [opus, sol, live, jev, grok, qwen] = e.highlights.map(h => h.post);
assert.notEqual(opus.slug, sol.slug);
assert.doesNotMatch(opus.title, /Sol|Luna/);
assert.doesNotMatch(sol.title, /Opus/);
assert.match(opus.content, /4달러/);
assert.match(opus.content, /20달러/);
assert.match(opus.content, /Anthropic이 공개한 수치|Anthropic 발표 수치|자체 평가/);
assert.match(sol.content, /2달러/);
assert.match(sol.content, /0\.1달러/);
assert.match(sol.content, /OpenAI의 설명|OpenAI 발표 수치|OpenAI가 밝힌/);
assert.match(live.content, /전화|SIP/);
assert.match(jev.content, /판정|채점/);
assert.match(jev.content, /TypeSafe AI의 설명|TypeSafe AI가 밝힌|회사 발표/);
assert.match(grok.content, /xAI의 설명|xAI가 밝힌|xAI 발표/);
assert.match(grok.content, /Copilot/);
assert.match(qwen.content, /비상업/);
assert.match(qwen.en.content, /non-commercial/i);
assert.doesNotMatch(qwen.title + qwen.deck, /오픈소스/, 'research-license weights are not open source');

const cowork = e.modelWatch[0];
assert.equal(new URL(cowork.sourceUrl).hostname, 'claude.com');
assert.ok(cowork.body.length >= 400);
image(cowork.thumbnail);

const toolHosts = ['github.com', 'github.com'];
for (const [i, p] of e.editorsPicks.entries()) {
  assert.equal(new URL(p.sourceUrl).hostname, toolHosts[i]);
  assert.ok(p.body.length >= 800, `tool body: ${p.slug}`);
  assert.ok(p.guideUrl.includes('LICENSE'));
  assert.match(p.body, /권한|접근 범위/);
  assert.ok(p.tags.includes('MIT'));
  image(p.thumbnail);
}
assert.match(e.editorsPicks[0].title, /Graft/);
assert.match(e.editorsPicks[1].title, /AuK/);
assert.match(e.editorsPicks[1].body, /한국어/, 'AuK must state Korean support status');

assert.equal(used.size, imageByPath.size, 'every ledger image is used and vice versa');
const publicCopy = JSON.stringify(e);
assert.doesNotMatch(publicCopy, /발표용 제안 시연|리허설|발표 전에 확인|발표 전 확인|브리핑 작성 중|작성한 시연안|preparing this briefing|vendor-claim|caveat|gate1/i, 'visitor-facing copy only');
assert.doesNotMatch(publicCopy, /\/Users\/|chatId|authorId|roomId|톡괴비|카톡방|TBD|TODO|lorem ipsum/i);
console.log(`PASS[ab-2026-09b] 6 ordered stories, 1 sub story, 2 MIT tools, ${used.size} source images, claim boundaries`);
