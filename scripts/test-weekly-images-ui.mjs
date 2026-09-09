import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { collectWeeklyImages } from './lib/weekly-images.mjs';

const baseURL = process.env.VOIDNEWS_TEST_URL || 'http://127.0.0.1:3142';
const output = process.env.VOIDNEWS_IMAGE_TEST_OUTPUT || '_workspace/abqa/20260909-weekly-images/browser-local.json';
const posts = collectWeeklyImages(), weeks = [...new Set(posts.map(p => p.week))], results = [];
const browser = await chromium.launch();
try {
  for (const week of weeks) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      const response = await page.goto(`${baseURL}/${week}/`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, week);
      const expected = posts.filter(p => p.week === week), withImage = expected.filter(p => p.images.length);
      assert.equal(await page.locator('[data-weekly-card]').count(), expected.length, `${week} current post count`);
      await page.locator('[data-weekly-source-thumbnail] img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
      await page.waitForFunction(count => {
        const images = [...document.querySelectorAll('[data-weekly-source-thumbnail] img')];
        return images.length === count && images.every(image => image.complete && image.naturalWidth > 0);
      }, withImage.length, { timeout: 45000 });
      const images = await page.locator('[data-weekly-source-thumbnail] img').evaluateAll(images => images.map(image => ({ src: image.getAttribute('src'), width: image.naturalWidth, height: image.naturalHeight, display: getComputedStyle(image).display, visibility: getComputedStyle(image).visibility })));
      const expectedSources = withImage.map(p => p.images[0].src).sort();
      assert.deepEqual(images.map(image => image.src).sort(), expectedSources, `${week} source image mapping`);
      assert.ok(images.every(image => image.display !== 'none' && image.visibility === 'visible'), `${week} image visibility`);
      const fallbackCount = await page.locator('[data-weekly-image-fallback]').count();
      assert.equal(fallbackCount, expected.length - withImage.length, `${week} documented preview limitations`);
      assert.equal(await page.getByText('출처 이미지 없음', { exact: true }).count(), 0, `${week} forbidden absence inference`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${week} horizontal overflow`);
      assert.deepEqual(errors, [], `${week} page errors`);
      const result = { week, width: 1440, posts: expected.length, loadedImages: images.length, documentedPreviewLimitations: fallbackCount, pageErrors: errors.length };
      results.push(result);
      console.log(`PASS ${JSON.stringify(result)}`);
      if (week === '2026-w37') await page.screenshot({ path: output.replace('.json', '-w37.png'), fullPage: true });
    } catch (error) {
      const images = await page.locator('[data-weekly-source-thumbnail] img').evaluateAll(images => images.map(image => ({ src: image.getAttribute('src'), complete: image.complete, width: image.naturalWidth }))).catch(() => []);
      const visibleSources = new Set(images.map(image => image.src));
      const missing = posts.filter(post => post.week === week && post.images.length && !visibleSources.has(post.images[0].src)).map(post => ({ title: post.title, src: post.images[0].src }));
      fs.writeFileSync(output, JSON.stringify({ status: 'FAIL', baseURL, failedWeek: week, error: error.message, missing, incomplete: images.filter(image => !image.complete || !image.width), results }, null, 2));
      console.error(`FAIL weekly images ${week}: ${JSON.stringify({ missing, incomplete: images.filter(image => !image.complete || !image.width) })}`);
      throw error;
    } finally { await page.close(); }
  }
  for (const width of [1024, 820, 652, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    try {
      await page.goto(`${baseURL}/2026-w37/`, { waitUntil: 'networkidle' });
      await page.locator('[data-weekly-source-thumbnail] img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
      await page.waitForFunction(() => [...document.querySelectorAll('[data-weekly-source-thumbnail] img')].length === 13 && [...document.querySelectorAll('[data-weekly-source-thumbnail] img')].every(image => image.complete && image.naturalWidth > 0));
      const hero = await page.locator('.tc-source-thumb--hero img').evaluate(image => ({ opacity: getComputedStyle(image).opacity, blend: getComputedStyle(image).mixBlendMode }));
      assert.deepEqual(hero, { opacity: '1', blend: 'normal' }, 'The source image must remain visible against the light background');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      results.push({ week: '2026-w37', width, loadedImages: 13, heroVisible: true });
    } finally { await page.close(); }
  }
  const failurePage = await browser.newPage();
  await failurePage.route('**/source-media/**', route => route.abort());
  await failurePage.goto(`${baseURL}/2026-w37/`, { waitUntil: 'networkidle' });
  await failurePage.locator('[data-weekly-source-thumbnail] img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
  await failurePage.waitForFunction(() => document.querySelectorAll('[data-weekly-image-fallback]').length === 13);
  assert.equal(await failurePage.getByText('출처 이미지 없음', { exact: true }).count(), 0);
  assert.equal(await failurePage.getByText('이미지 미리보기를 제공하지 못했습니다', { exact: true }).count(), 13);
  const previewRequests = await failurePage.evaluate(() => performance.getEntriesByType('resource').filter(entry => entry.name.includes('api.microlink.io')).length);
  assert.equal(previewRequests, 0, 'Weekly must not depend on third-party preview requests');
  results.push({ scenario: 'image-network-failure', accuratelyLabelled: 13, falseAbsenceLabels: 0, thirdPartyPreviewRequests: 0 });
  await failurePage.close();
  const editorialFailurePage = await browser.newPage();
  await editorialFailurePage.route('**/*', route => route.request().resourceType() === 'image' ? route.abort() : route.continue());
  await editorialFailurePage.goto(`${baseURL}/2026-w21/`, { waitUntil: 'networkidle' });
  await editorialFailurePage.locator('[data-weekly-source-thumbnail] img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
  const editorialCount = posts.filter(post => post.week === '2026-w21').length;
  await editorialFailurePage.waitForFunction(count => document.querySelectorAll('[data-weekly-image-fallback]').length === count, editorialCount);
  assert.equal(await editorialFailurePage.getByText('이미지 미리보기를 제공하지 못했습니다', { exact: true }).count(), editorialCount);
  results.push({ scenario: 'editorial-image-network-failure', accuratelyLabelled: editorialCount });
  await editorialFailurePage.close();
  fs.writeFileSync(output, JSON.stringify({ status: 'PASS', baseURL, checks: results.length, results }, null, 2));
  console.log(`PASS weekly images UI: ${results.length} checks`);
} finally { await browser.close(); }
