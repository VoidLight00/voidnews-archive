// Local integration checks. Requires Playwright and a running development server.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import fs from 'node:fs';
import ts from 'typescript';

const fixtureSource = fs.readFileSync(new URL('../lib/weeks/2026-w35.ts', import.meta.url), 'utf8');
const fixtureModule = { exports: {} };
new Function('exports', ts.transpileModule(fixtureSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(fixtureModule.exports);
const expectedPosts = fixtureModule.exports.week35.companies.reduce((count, company) => count + company.posts.length, 0);

const baseURL = process.env.VOIDNEWS_TEST_URL ?? 'http://127.0.0.1:3142';
const browser = await chromium.launch();
const errors = [];
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push({ url: page.url(), message: error.message }));

  // A static build must hydrate even when opened months later in another timezone.
  for (const timezoneId of ['Asia/Seoul', 'America/Los_Angeles']) {
    const clockPage = await browser.newPage({ timezoneId });
    const clockErrors = [];
    clockPage.on('pageerror', error => clockErrors.push(error.message));
    try {
      await clockPage.clock.install({ time: new Date('2027-01-01T00:00:00Z') });
      await clockPage.goto(`${baseURL}/2026-w37/`, { waitUntil: 'networkidle' });
      const dates = await clockPage.locator('.tc-feed-card span[title]').allTextContents();
      assert.ok(dates.length > 0, 'The clock regression must exercise date labels');
      assert.ok(dates.every(date => /^\d+개월 전$/.test(date)), 'Relative dates must update after hydration');
      assert.deepEqual(clockErrors, [], `Hydration must survive build/browser clock drift (${timezoneId})`);
      console.log(`PASS clock-drift hydration ${timezoneId}`);
    } finally {
      await clockPage.close();
    }
  }
  for (const route of ['/2026-w35/', '/2026-w36/', '/2026-w37/', '/ab/2026-08b/']) {
    for (const width of [1440, 1024, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        columns: getComputedStyle(document.querySelector('.vn-browse-grid')).gridTemplateColumns.split(' ').length,
      }));
      assert.ok(layout.scrollWidth <= width, `${route}: overflow at ${width}`);
      assert.equal(layout.columns, width === 1440 ? 4 : width === 1024 ? 3 : 1);
      console.log(`PASS ${route} ${width}px`);
    }
  }
  const anchors = await page.locator('.vn-browse a').evaluateAll(links => links.map(link => link.getAttribute('href')));
  for (const anchor of anchors) {
    await page.locator(`.vn-browse a[href="${anchor}"]`).click();
    assert.equal(await page.evaluate(() => location.hash), anchor);
    assert.equal(await page.locator(anchor).count(), 1);
  }
  await page.getByRole('button', { name: 'Switch language to EN', exact: true }).click();
  assert.equal(await page.locator('.vn-browse h2').textContent(), 'Explore this edition');
  await page.getByRole('button', { name: 'Switch language to KO', exact: true }).click();
  await page.goto(`${baseURL}/2026-w35/`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.tc-feed-card').count(), expectedPosts - 1, 'All non-featured posts must appear in the feed');
  const company = page.locator('.vn-browse-card').filter({ hasText: 'OpenAI' }).first();
  await company.click();
  assert.equal(await company.getAttribute('aria-pressed'), 'true');
  const details = page.locator('.vn-advanced-filters');
  await details.locator('summary').click();
  assert.notEqual(await details.getAttribute('open'), null);
  await page.getByRole('button', { name: 'Switch language to EN', exact: true }).click();
  assert.equal(await page.locator('.vn-browse h2').textContent(), 'Explore this issue');
  await page.getByRole('button', { name: 'Switch language to KO', exact: true }).click();
  await page.goto(`${baseURL}/2026-w35/`, { waitUntil: 'networkidle' });
  const card = page.locator('.tc-feed-card').first();
  const articlePath = await card.getAttribute('href');
  assert.match(articlePath, /^\/2026-w35\/[^/?]+\/$/);
  await card.click();
  await page.waitForURL(url => url.pathname === articlePath);
  assert.equal(await page.locator('h1').count(), 1);
  await page.goto(`${baseURL}/2026-w35/`, { waitUntil: 'networkidle' });
  const title = await page.locator('.tc-hero-title').textContent();
  const heroPath = await page.locator('.tc-hero-card').getAttribute('href');
  await page.goto(`${baseURL}/2026-w35/?post=${encodeURIComponent(title)}`);
  await page.waitForURL(url => url.pathname === heroPath);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://voidnews-archive.vercel.app${heroPath}`);
  console.log('PASS independent article navigation, legacy redirect, and canonical');
  assert.deepEqual(errors, []);
  console.log('PASS navigation anchors, locale controls, company selection, advanced filters, and page errors');
} finally {
  await browser.close();
}
