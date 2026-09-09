// Local rendering regression checks; OG responses are deterministic fixtures, not live provenance evidence.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const baseURL = process.env.VOIDNEWS_TEST_URL ?? 'http://127.0.0.1:3142';
const ko = '편집 제작 이미지 · 공식 이미지 아님';
const en = 'Editorially created image · Not an official image';
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('https://api.microlink.io/**', route => route.fulfill({ json: {
    status: 'success', data: { title: 'Fixture source preview', image: { url: 'https://example.com/source-preview.svg' } },
  } }));
  await page.route('https://example.com/source-preview.svg', route => route.fulfill({
    contentType: 'image/svg+xml',
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="450"><rect width="720" height="450" fill="gray"/></svg>',
  }));
  const routes = [
    ['/2026-w30/', 1],
    ['/ab/2026-07b/', 2],
    ['/2026-w30/kimi-20260716-kimi-k3/', 1],
    ['/ab/2026-07b/kimi-k3-frontier-alternative/', 1],
    ['/ab/2026-07b/solgate-gpt-5-6-routing-gateway/', 1],
  ];
  for (const [path, count] of routes) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(baseURL + path);
      assert.equal(response.status(), 200);
      await page.locator('[data-image-disclosure]').first().waitFor();
      assert.equal(await page.locator('[data-image-disclosure]').count(), count);
      for (const label of await page.locator('[data-image-disclosure]').all()) {
        await label.scrollIntoViewIfNeeded();
        assert.ok(await label.isVisible());
        assert.equal(await label.textContent(), ko);
        assert.ok(await label.evaluate(el => el.scrollWidth <= el.clientWidth), 'Disclosure must not truncate');
      }
      await page.getByRole('button', { name: 'Switch language to EN', exact: true }).click();
      await page.waitForFunction(text => [...document.querySelectorAll('[data-image-disclosure]')].every(el => el.textContent === text), en);
      await page.getByRole('button', { name: 'Switch language to KO', exact: true }).click();
      console.log(`PASS disclosure + locale ${path} ${width}px`);
    }
  }
  // Broken explicit AB media advances to a source OG preview without retaining an editorial label.
  await page.route('**/og-cache/**', route => route.abort());
  await page.goto(baseURL + '/ab/2026-07b/');
  const frame = page.locator('.tc-source-thumb').filter({ has: page.locator('img[alt="Kimi K3 2.8T MoE and 1M context"]') });
  // Scroll every frame to activate deferred previews, including missing-image cards.
  for (const thumb of await page.locator('.tc-source-thumb').all()) await thumb.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelectorAll('img[src="https://example.com/source-preview.svg"]').length > 0);
  assert.ok(await page.getByText('출처 링크 미리보기 · OG 이미지', { exact: true }).count() > 0);
  await page.waitForFunction(() => !document.querySelector('[data-image-disclosure]'));
  assert.equal(await frame.count(), 0);
  console.log('PASS AB broken/missing explicit images use clearly labeled source OG fallback');
  // Failed OG image terminates at a text fallback rather than a broken image/retry loop.
  await page.route('https://example.com/source-preview.svg', route => route.abort());
  await page.reload();
  for (const thumb of await page.locator('.tc-source-thumb').all()) await thumb.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => !document.querySelector('.tc-source-thumb img'));
  assert.ok(await page.getByText('이미지 미리보기를 제공하지 못했습니다', { exact: true }).count() > 0);
  assert.equal(await page.getByText('출처 이미지 없음', { exact: true }).count(), 0);
  console.log('PASS failed OG terminates at text fallback');
  await page.evaluate(() => localStorage.clear());
  await page.route('https://api.microlink.io/**', route => route.fulfill({ json: {
    status: 'success', data: { image: { url: 'javascript:alert(1)' } },
  } }));
  await page.reload();
  for (const thumb of await page.locator('.tc-source-thumb').all()) await thumb.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => !document.querySelector('.tc-source-thumb img'));
  assert.equal(await page.locator('img[src^="javascript:"]').count(), 0);
  assert.deepEqual(errors, []);
  console.log('PASS unsafe OG rejected; unknown assets receive no editorial claim; no runtime errors');
} finally {
  await browser.close();
}
