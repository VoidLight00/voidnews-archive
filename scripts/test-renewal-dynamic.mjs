#!/usr/bin/env node
// test-renewal-dynamic.mjs — 리뉴얼 화면 중 정적 HTML 게이트가 못 보는 클라이언트 상태 시험
//
// 왜: 회사별 모아보기 PostCard 라벨, AB 하이라이트 상세·추천 모달 라벨, w21 편집형 카드, w43 Claude Duet 기사의
// R5 중립 문구, 헤더 '구독' 링크는 브라우저에서 화면을 바꾼 뒤에만 나타납니다. test-renewal-ui.mjs와 함께
// npm run test:renewal로 돕니다.
//
// 사용: node scripts/test-renewal-dynamic.mjs [--url <주소>] [--out <폴더>]
//   기본 주소: VOIDNEWS_TEST_URL, 없으면 http://127.0.0.1:3142(정적 out/을 띄운 주소)
// 결과: <out>/dynamic/renewal-dynamic.json과 스크린숏(기본 out = _workspace/renewal/ui)
// 종료 코드: 0 통과 · 1 실패 · 2 실행 오류(Playwright·자료 없음)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTsModule } from './lib/renewal-gate-kit.mjs';

// Playwright를 불러오지 못하면 화면 실패(1)와 구분되도록 실행 오류(2)로 끝냅니다.
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch (error) {
  console.error(`CRASH Playwright를 불러오지 못했습니다(${error.message}). 상위 폴더나 이 저장소에 playwright를 설치한 뒤 다시 실행하십시오.`);
  process.exit(2);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const BASE = arg('--url', process.env.VOIDNEWS_TEST_URL ?? 'http://127.0.0.1:3142').replace(/\/+$/, '');
const OUT = path.join(path.resolve(arg('--out', path.join(ROOT, '_workspace/renewal/ui'))), 'dynamic');
const SHOTS = path.join(OUT, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });
const ALLOWED = new Set([new URL(BASE).hostname, '127.0.0.1', 'cdn.jsdelivr.net']);
// 회사 아카이브 카드 수는 고정하지 않고 lib/data.ts의 그 주 글 수에서 계산합니다. 매일 자동 게시가 w44에 카드를 더해도
// 시험이 코드 변경 없이 실패하지 않게 하려는 것입니다(2026-11-01 재검토 N1). 시험할 사이트와 같은 커밋에서 실행합니다.
const ARCHIVE_WEEK = '2026-w44';
const archiveData = loadTsModule(path.join(ROOT, 'lib/data.ts')).getWeek(ARCHIVE_WEEK);
if (!archiveData) {
  console.error(`CRASH lib/data.ts에 ${ARCHIVE_WEEK}가 없습니다.`);
  process.exit(2);
}
const ARCHIVE_POSTS = archiveData.companies.reduce((sum, company) => sum + company.posts.length, 0);
const failures = [];
const log = [];
const ok = (id, cond, detail) => {
  log.push({ id, pass: Boolean(cond), detail });
  console.log(`${cond ? 'PASS' : 'FAIL'}[${id}] ${typeof detail === 'string' ? detail : JSON.stringify(detail).slice(0, 400)}`);
  if (!cond) failures.push(id);
};

const badgeInfo = (root) => root.evaluateAll((els) => els.map((b) => {
  const img = b.querySelector('img');
  const r = img ? img.getBoundingClientRect() : { width: 0, height: 0 };
  return {
    text: b.textContent.trim(),
    visible: b.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }),
    imgW: Math.round(r.width), imgH: Math.round(r.height),
    loaded: img ? img.complete && img.naturalWidth > 0 : false,
  };
}));

const browser = await chromium.launch();
try {
  for (const theme of ['light', 'dark']) {
    for (const width of [375, 1280]) {
      const tag = `${theme}@${width}`;
      const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: 'reduce', locale: 'ko-KR' });
      await context.route('**/*', (r) => (ALLOWED.has(new URL(r.request().url()).hostname) ? r.continue() : r.abort()));
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(`${page.url()} ${e.message}`));
      const ready = () => page.waitForSelector('.vn-theme-toggle[data-ready]', { state: 'attached', timeout: 15000 });

      // 1) w44 company archive: expand one company, every PostCard shows one visible 24px badge.
      await page.goto(`${BASE}/${ARCHIVE_WEEK}/`, { waitUntil: 'networkidle' });
      await ready();
      const archive = page.locator('section[aria-label="회사 아카이브"]');
      const headers = archive.locator('section > button[aria-expanded="false"]');
      const nHeaders = await headers.count();
      for (let i = 0; i < nHeaders; i += 1) await archive.locator('section > button[aria-expanded="false"]').first().click();
      const cards = archive.locator('article.article-card');
      // Badges render after the click; give their avatar images time to decode before measuring.
      await page.waitForFunction(() => [...document.querySelectorAll('section[aria-label="회사 아카이브"] [data-ai-author="pium"] img')]
        .every((img) => img.complete && img.naturalWidth > 0), null, { timeout: 10000 }).catch(() => {});
      const nCards = await cards.count();
      const perCard = await cards.evaluateAll((els) => els.map((el) => [...el.querySelectorAll('[data-ai-author="pium"]')].filter((b) => b.checkVisibility()).length));
      const archBadges = await badgeInfo(archive.locator('[data-ai-author="pium"]'));
      ok(`archive-postcard ${tag}`, nCards === ARCHIVE_POSTS && perCard.every((n) => n === 1) && archBadges.every((b) => b.visible && b.loaded && b.imgW === 24 && b.text.startsWith('피움 작성 · AI')), { nHeaders, nCards, expected: ARCHIVE_POSTS, perCard, badges: archBadges });
      if (width === 375) await cards.first().screenshot({ path: path.join(SHOTS, `dyn-archive-postcard-${theme}-0375.png`) });

      // 2) header '구독' goes to /newsletter/
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.locator('header a.site-nav-subscribe').click();
      await page.waitForURL((u) => u.pathname === '/newsletter/', { timeout: 10000 }).catch(() => {});
      ok(`subscribe-nav ${tag}`, new URL(page.url()).pathname === '/newsletter/', page.url());

      // 3) AB 2026-04b: expand a highlight (HighlightDetail badge), open a pick modal (PickModal badge).
      // 2026-04c has slug-less highlights (expand in place) and slug-less picks (open a modal).
      await page.goto(`${BASE}/ab/2026-04c/`, { waitUntil: 'networkidle' });
      await ready();
      const detailId = await page.locator('[role="button"][aria-expanded="false"]').first().getAttribute('aria-controls');
      const hl = page.locator(`[role="button"][aria-controls="${detailId}"]`);
      await hl.click();
      const detail = page.locator(`#${detailId}`);
      await detail.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      const detailBadges = await badgeInfo(detail.locator('[data-ai-author="pium"]'));
      ok(`ab-highlight-detail ${tag}`, (await hl.getAttribute('aria-expanded')) === 'true' && detailBadges.length === 1 && detailBadges[0].visible && detailBadges[0].imgW === 24 && detailBadges[0].loaded, { detailBadges });
      if (width === 375) await detail.screenshot({ path: path.join(SHOTS, `dyn-ab-highlight-detail-${theme}-0375.png`) });
      const pick = page.locator('article.tc-feed-card[role="button"]').first();
      const hasPick = await pick.count();
      if (hasPick) {
        await pick.scrollIntoViewIfNeeded();
        await pick.click();
        const dialog = page.locator('[role="dialog"]').first();
        await dialog.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
        const modalBadges = await badgeInfo(dialog.locator('[data-ai-author="pium"]'));
        ok(`ab-pick-modal ${tag}`, (await dialog.count()) === 1 && modalBadges.length >= 1 && modalBadges.every((b) => b.visible && b.imgW === 24 && b.loaded), { modalBadges });
        if (width === 375) await dialog.screenshot({ path: path.join(SHOTS, `dyn-ab-pick-modal-${theme}-0375.png`) });
        await page.keyboard.press('Escape');
      } else {
        ok(`ab-pick-modal ${tag}`, false, 'no slug-less pick card found to open a modal');
      }

      // 4) w21 editorial cards: one visible badge per card.
      await page.goto(`${BASE}/2026-w21/`, { waitUntil: 'networkidle' });
      await ready();
      const w21 = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('[data-weekly-card]')];
        return { cards: cards.length, withBadge: cards.filter((c) => c.querySelector('[data-ai-author="pium"]')).length, overflow: document.documentElement.scrollWidth > innerWidth };
      });
      const w21Badges = await badgeInfo(page.locator('[data-weekly-card] [data-ai-author="pium"]'));
      const visibleW21 = w21Badges.filter((b) => b.visible);
      ok(`w21-editorial ${tag}`, w21.cards > 0 && w21.withBadge === w21.cards && !w21.overflow && visibleW21.every((b) => b.imgW === 24), { ...w21, visibleBadges: visibleW21.length });

      // 5) w43 Claude Duet article: TestingCatalog source shown with neutral wording, no '공식'.
      await page.goto(`${BASE}/2026-w43/anthropic-claude-duet-research-preview/`, { waitUntil: 'networkidle' });
      await ready();
      const duet = await page.evaluate(() => {
        const links = [...document.querySelectorAll('a[href*="testingcatalog.com"]')].map((a) => {
          const box = a.closest('section, aside, div') || a.parentElement;
          return { text: a.textContent.trim(), around: (box?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160), visible: a.checkVisibility() };
        });
        const main = document.querySelector('main') || document.body;
        const officialMentions = [...main.querySelectorAll('*')].filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && /공식/.test(n.textContent))).map((el) => el.textContent.trim().slice(0, 60));
        return { links, officialMentions, h1: document.querySelector('h1')?.textContent.trim() };
      });
      ok(`duet-neutral ${tag}`, duet.links.length > 0 && duet.links.every((l) => !/공식/.test(l.text) && !/공식/.test(l.around)), duet);
      if (width === 375) {
        const target = page.locator('a[href*="testingcatalog.com"]').first();
        await target.scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(SHOTS, `dyn-duet-source-${theme}-0375.png`) });
      }
      ok(`page-errors ${tag}`, errors.length === 0, errors);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
fs.writeFileSync(path.join(OUT, 'renewal-dynamic.json'), JSON.stringify({ base: BASE, failures, log }, null, 2));
console.log(failures.length ? `RESULT FAIL ${failures.length}` : 'RESULT PASS');
process.exit(failures.length ? 1 : 0);
