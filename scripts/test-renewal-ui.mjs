#!/usr/bin/env node
// test-renewal-ui.mjs — 리뉴얼 화면 브라우저 시험(계획 5.5·6.3·6.5절, REQUIREMENTS R19·R21·R24)
//
// 왜: 빌드 HTML 게이트는 정적 문자열만 봅니다. 테마 버튼의 aria-pressed·새로고침 뒤 유지·시스템 설정 추종,
// 좁은 화면의 가로 넘침·한국어 어절 분리·영문 단어 분리, 계산된 색의 글자 대비, 480px 이하 헤더 링크 숨김은
// 실제 브라우저에서만 확인됩니다. 2026-11-01까지는 세션 스크래치 스크립트로만 돌려 다시 증명할 수 없었으므로
// (독립 검토 지적) 저장소로 옮겼습니다. 동적 상태(모달·편집형 카드)는 test-renewal-dynamic.mjs가 봅니다.
//
// 사용: node scripts/test-renewal-ui.mjs [--url <주소>] [--extended] [--only home,w44] [--tag run1] [--out <폴더>]
//   --url       시험할 사이트(기본: VOIDNEWS_TEST_URL, 없으면 http://127.0.0.1:3142 = 정적 out/을 띄운 주소)
//   --extended  계획 6.3절 추가 경로(w43·w18·w21·Duet·AB·약관)와 860px 너비
//   --trap-css  불러온 뒤 CSS를 끼워 넣어, 알려진 결함이 있으면 이 시험이 실패하는지 확인합니다
// 결과: <out>/<tag>/renewal-ui.json과 스크린숏(기본 out = _workspace/renewal/ui, git 제외 폴더)
// 외부 접속: 시험 대상 주소와 글꼴 CDN만 허용하고 나머지(X 위젯·링크 미리보기)는 막아 다른 서비스를 부르지 않습니다.
// 기대값(최신 회차, 운영자 링크)은 이 저장소의 lib/data.ts·lib/site-links.ts에서 읽으므로, 시험할 사이트와 같은 커밋에서 실행합니다.
// 회차·글 수를 시험에 고정하면 매일 자동 게시가 카드를 더하는 순간 코드 변경 없이 실패합니다(2026-11-01 재검토 N1).
// 종료 코드: 0 통과 · 1 실패 · 2 실행 오류
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTsModule } from './lib/renewal-gate-kit.mjs';
import { analyzePage } from './lib/renewal-ui-page.mjs';

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
const BASE = arg('--url', arg('--base', process.env.VOIDNEWS_TEST_URL ?? 'http://127.0.0.1:3142')).replace(/\/+$/, '');
const TAG = arg('--tag', 'run1');
const LOG_DIR = path.join(path.resolve(arg('--out', path.join(ROOT, '_workspace/renewal/ui'))), TAG);
const SHOTS = path.join(LOG_DIR, 'shots');
const ONLY = arg('--only', '');
// Trap mode: inject CSS after load to prove a check fails when a known defect is present.
const TRAP_CSS = arg('--trap-css', '');
fs.mkdirSync(SHOTS, { recursive: true });

const BASE_ROUTES = [
  { id: 'home', path: '/', neutralizeRedirect: true, kind: 'page' },
  { id: 'w44', path: '/2026-w44/', kind: 'weekly' },
  { id: 'article', path: '/2026-w44/google-deepmind-announces-gemini-4-carbon/', kind: 'article' },
  { id: 'newsletter', path: '/newsletter/', kind: 'page' },
  { id: 'privacy', path: '/privacy/', kind: 'page' },
];
// Plan 6.3 adds these routes and the 860px width (just above the old 820px header breakpoint).
const EXTENDED_ROUTES = [
  { id: 'w43', path: '/2026-w43/', kind: 'weekly' },
  { id: 'w18', path: '/2026-w18/', kind: 'weekly' },
  { id: 'w21', path: '/2026-w21/', kind: 'weekly' },
  { id: 'duet', path: '/2026-w43/anthropic-claude-duet-research-preview/', kind: 'article' },
  { id: 'ab', path: '/ab/', kind: 'page' },
  { id: 'ab10b', path: '/ab/2026-10b/', kind: 'page' },
  { id: 'tos', path: '/tos/', kind: 'page' },
];
const EXTENDED = argv.includes('--extended');
const ROUTES = (EXTENDED ? EXTENDED_ROUTES : BASE_ROUTES).filter((r) => !ONLY || ONLY.split(',').includes(r.id));
const WIDTHS = EXTENDED ? [320, 375, 768, 860, 1280] : [320, 375, 768, 1280];
const THEMES = ['light', 'dark'];

// 기대 링크는 lib/site-links.ts(바닥글·헤더의 단일 출처)에서 읽습니다. 목록을 여기에 다시 적지 않습니다.
const siteLinks = loadTsModule(path.join(ROOT, 'lib/site-links.ts'));
const EXPECTED_CHANNELS = siteLinks.CHANNELS.map((channel) => [channel.href, channel.label]);
const EXPECTED_HEADER = siteLinks.HEADER_CHANNELS.map(({ id, label }) => [siteLinks.getChannel(id).href, label]);
const LATEST_PATH = `/${loadTsModule(path.join(ROOT, 'lib/data.ts')).getLatestSlug()}/`;

// Page-initiated loads allowed: the site origin and the font CDN (jsDelivr Pretendard) that the layout loads.
// Everything else (X widgets, link previews) is blocked so this check calls no other service.
const ALLOWED_HOSTS = new Set([new URL(BASE).hostname, '127.0.0.1', 'localhost', 'cdn.jsdelivr.net']);

const failures = [];
const notes = [];
const results = [];
const fail = (where, what, detail) => {
  failures.push({ where, what, detail });
  console.log(`FAIL[${where}] ${what}${detail === undefined ? '' : ' ' + JSON.stringify(detail).slice(0, 600)}`);
};
const pass = (where, what) => console.log(`PASS[${where}] ${what}`);

async function prepareContext(browser, { width, colorScheme, javaScriptEnabled = true, initScript }) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    colorScheme,
    reducedMotion: 'reduce',
    javaScriptEnabled,
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
  });
  if (initScript) await context.addInitScript(initScript);
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.protocol === 'data:' || url.protocol === 'blob:') return route.continue();
    if (!ALLOWED_HOSTS.has(url.hostname)) return route.abort();
    return route.continue();
  });
  return context;
}

async function neutralizeHomeRedirect(page) {
  // "/" runs location.replace() to the latest issue. To inspect "/" itself, the test replaces
  // that one statement with a no-op comment in the served HTML. Nothing else changes.
  await page.route(`${BASE}/`, async (route) => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const response = await route.fetch();
    const body = await response.text();
    const replaced = body.replace(/location\.replace\("\/[^"]+\/"\);/, '/*redirect-neutralized-for-test*/');
    if (replaced === body) throw new Error('home redirect statement not found');
    await route.fulfill({ response, body: replaced });
  });
}

async function settle(page) {
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running'), null, { timeout: 5000 }).catch(() => {});
}

async function waitReady(page) {
  await page.waitForSelector('.vn-theme-toggle[data-ready]', { state: 'attached', timeout: 15000 });
  await settle(page);
}

async function themeState(page) {
  return page.evaluate(() => {
    const buttons = [...document.querySelectorAll('.vn-theme-btn')].map((b) => ({
      option: b.dataset.themeOption,
      text: b.textContent.trim(),
      type: b.getAttribute('type'),
      pressed: b.getAttribute('aria-pressed'),
    }));
    const bg = getComputedStyle(document.body).backgroundColor;
    let stored = null;
    try { stored = localStorage.getItem('voidnews-theme'); } catch { stored = 'THROWS'; }
    return { dataTheme: document.documentElement.getAttribute('data-theme'), buttons, bodyBg: bg, stored };
  });
}

function expectTheme(where, state, theme) {
  const light = state.buttons.find((b) => b.option === 'light');
  const dark = state.buttons.find((b) => b.option === 'dark');
  const ok = state.dataTheme === theme && light && dark
    && light.pressed === String(theme === 'light') && dark.pressed === String(theme === 'dark')
    && light.type === 'button' && dark.type === 'button' && light.text === '라이트' && dark.text === '다크';
  if (!ok) fail(where, `theme expected ${theme}`, state);
  return ok;
}

async function measureFocus(page) {
  // Keyboard: focus the locale button, Tab to '라이트', Space; Tab to '다크', Enter.
  const res = {};
  await page.locator('header button[aria-label^="Switch language"]').focus();
  await page.keyboard.press('Tab');
  res.afterTab1 = await page.evaluate(() => ({
    option: document.activeElement?.dataset?.themeOption ?? null,
    focusVisible: document.activeElement?.matches(':focus-visible') ?? false,
    outline: (() => { const cs = getComputedStyle(document.activeElement); return `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`; })(),
  }));
  await page.keyboard.press('Space');
  await settle(page);
  res.afterSpace = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  await page.keyboard.press('Tab');
  res.afterTab2 = await page.evaluate(() => ({
    option: document.activeElement?.dataset?.themeOption ?? null,
    focusVisible: document.activeElement?.matches(':focus-visible') ?? false,
    outline: (() => { const cs = getComputedStyle(document.activeElement); return `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`; })(),
  }));
  await page.keyboard.press('Enter');
  await settle(page);
  res.afterEnter = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  // Focus ring contrast against the header background, measured in the current theme.
  res.ringContrast = await page.evaluate(() => {
    const el = document.activeElement;
    const parse = (s) => { const m = s.match(/^rgba?\(([^)]+)\)$/); if (!m) return null; const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
    const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
    const blend = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
    let layers = []; let n = el.parentElement;
    while (n) { const c = parse(getComputedStyle(n).backgroundColor); if (c && c.a > 0) { layers.push(c); if (c.a >= 0.999) break; } n = n.parentElement; }
    let base = { r: 255, g: 255, b: 255, a: 1 }; for (let i = layers.length - 1; i >= 0; i -= 1) base = blend(layers[i], base);
    const ring = parse(getComputedStyle(el).outlineColor);
    if (!ring) return null;
    const x = lum(ring); const y = lum(base);
    return Math.round(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)) * 100) / 100;
  });
  return res;
}

function checkStatic(where, width, routeId, a, kind) {
  // overflow
  if (a.overflow.docScrollWidth > width || a.overflow.bodyScrollWidth > width) fail(where, 'horizontal overflow', a.overflow);
  // korean
  if (a.korean.midWord.length) fail(where, `Korean mid-word breaks: ${a.korean.midWord.length}`, a.korean.midWord.slice(0, 6));
  if (a.latinSplit.length) fail(where, `short Latin words split: ${a.latinSplit.length}`, a.latinSplit.slice(0, 6));
  // pium image sizes
  for (const p of a.pium.piums) {
    if (!p.visible) continue;
    if (!p.complete || p.natural <= 0) fail(where, 'pium image not loaded', p);
    if (p.w < 24 || Math.abs(p.w / 24 - Math.round(p.w / 24)) > 0.01 || Math.abs(p.w - p.h) > 0.5) fail(where, 'pium size not a 24px multiple', p);
  }
  // badges
  if (kind === 'weekly') {
    if (!a.pium.cards.length) fail(where, 'no [data-weekly-card] found');
    a.pium.cards.forEach((c, i) => { if (c.badges !== 1 || c.visibleBadges !== 1) fail(where, `card ${i} badge count`, c); });
    for (const b of a.pium.badges) {
      if (!b.visible || !b.imgVisible || b.imgW !== 24) fail(where, 'card badge not visible at 24px', b);
      if (!b.text.startsWith('피움 작성 · AI')) fail(where, 'badge label text', b);
      if (b.right > width) fail(where, 'badge beyond viewport', b);
    }
  }
  if (kind === 'article') {
    const by = a.pium.badges.filter((b) => b.size === '48');
    if (by.length !== 1) fail(where, `byline badge count ${by.length}`);
    for (const b of by) {
      if (!b.visible || !b.imgVisible || b.imgW !== 48) fail(where, 'byline badge not visible at 48px', b);
      if (!b.text.startsWith('피움 작성 · AI')) fail(where, 'byline label text', b);
    }
  }
  // header
  if (a.header.ext.length !== 3) fail(where, `header .site-nav-ext count ${a.header.ext.length}`);
  const extOrder = a.header.ext.map((e) => [e.href, e.text]);
  if (JSON.stringify(extOrder) !== JSON.stringify(EXPECTED_HEADER)) fail(where, 'header links/order', extOrder);
  for (const e of a.header.ext) {
    if (e.target !== '_blank' || e.rel !== 'noopener noreferrer') fail(where, 'header link target/rel', e);
    if (width <= 480 && (e.visible || e.display !== 'none')) fail(where, 'header link should be hidden at <=480px', e);
    if (width > 480 && !e.visible) fail(where, 'header link should be visible at >480px', e);
  }
  const extHrefs = a.header.headerExternal.map((h) => h.href).sort();
  if (JSON.stringify(extHrefs) !== JSON.stringify(EXPECTED_HEADER.map((h) => h[0]).sort())) fail(where, 'header external link set', extHrefs);
  if (!a.header.subscribe || !a.header.subscribe.visible || a.header.subscribe.href !== '/newsletter/' || a.header.subscribe.right > width) fail(where, 'subscribe link', a.header.subscribe);
  if (a.header.themeButtons.length !== 2) fail(where, `theme buttons ${a.header.themeButtons.length}`);
  for (const b of a.header.themeButtons) if (!b.visible || b.clipped || b.right > width || b.left < 0) fail(where, 'theme button visibility/clip', b);
  if (a.header.brokenNavLabels.length) fail(where, 'header label wraps', a.header.brokenNavLabels);
  // footer
  const ch = a.footer.channels.map((c) => [c.href, c.text]);
  if (JSON.stringify(ch) !== JSON.stringify(EXPECTED_CHANNELS)) fail(where, 'footer channels', ch);
  for (const c of a.footer.channels) {
    if (!c.visible || c.right > width) fail(where, 'footer channel not visible/in viewport', c);
    const mail = c.href.startsWith('mailto:');
    if (mail ? (c.target !== null) : (c.target !== '_blank' || c.rel !== 'noopener noreferrer')) fail(where, 'footer target/rel', c);
  }
  const fext = [...new Set(a.footer.footerExternal)].sort();
  if (JSON.stringify(fext) !== JSON.stringify(EXPECTED_CHANNELS.map((c) => c[0]).sort()) || a.footer.footerExternal.length !== 7) fail(where, 'footer external link set', a.footer.footerExternal);
}

function contrastFailures(where, a) {
  const bad = a.contrast.samples.filter((s) => !s.decorative && s.ratio < s.need);
  return bad.map((s) => ({ where, ...s }));
}

async function main() {
  const browser = await chromium.launch();
  const contrastRuns = [];
  const allContrastFails = [];
  const koreanForced = [];
  const koreanPunct = [];
  const latinForced = [];
  const latinClamped = [];
  const keepAllMissing = [];
  try {
    // A) first visit follows system, buttons switch theme, reload keeps manual choice, all static checks.
    for (const route of ROUTES) {
      for (const width of WIDTHS) {
        for (const theme of THEMES) {
          const where = `${route.id}@${width}/${theme}`;
          const context = await prepareContext(browser, { width, colorScheme: theme });
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', (e) => errors.push(e.message));
          if (route.neutralizeRedirect) await neutralizeHomeRedirect(page);
          const resp = await page.goto(BASE + route.path, { waitUntil: 'networkidle' });
          if (!resp || resp.status() !== 200) fail(where, `HTTP ${resp && resp.status()}`);
          if (new URL(page.url()).pathname !== route.path) fail(where, `unexpected URL ${page.url()}`);
          await waitReady(page);
          if (TRAP_CSS) await page.addStyleTag({ content: TRAP_CSS });
          const first = await themeState(page);
          if (first.stored !== null) fail(where, 'storage not empty on first visit', first);
          if (expectTheme(where, first, theme)) pass(where, `first visit follows system (${theme})`);
          // static checks in the system theme
          const a1 = await page.evaluate(analyzePage, {});
          checkStatic(where, width, route.id, a1, route.kind);
          koreanForced.push(...a1.korean.forced.map((f) => ({ where, ...f })));
          koreanPunct.push(...a1.korean.punctBreak.map((f) => ({ where, ...f })));
          latinForced.push(...a1.latinForced.map((f) => ({ where, ...f })));
          latinClamped.push(...a1.latinClamped.map((f) => ({ where, ...f })));
          keepAllMissing.push(...a1.korean.keepAllMissing.map((f) => ({ where, ...f })));
          contrastRuns.push({ where, route: route.id, width, theme, via: 'system', tokenPairs: a1.contrast.tokenPairs, samples: a1.contrast.samples, themeButtons: a1.themeButtonsContrast });
          allContrastFails.push(...contrastFailures(where, a1));
          const base = `${route.id}-${String(width).padStart(4, '0')}-${theme}`;
          await page.screenshot({ path: path.join(SHOTS, `${base}-top.png`) });
          if (width === 320 || width === 1280) {
            await page.locator('footer').scrollIntoViewIfNeeded();
            await page.locator('footer').screenshot({ path: path.join(SHOTS, `${base}-footer.png`) });
          }
          if ((route.id === 'newsletter' || route.id === 'privacy') && (width === 320 || width === 1280)) {
            await page.screenshot({ path: path.join(SHOTS, `${base}-full.png`), fullPage: true });
          }
          if (route.kind === 'article') {
            const by = page.locator('[data-ai-author="pium"][data-size="48"]');
            await by.scrollIntoViewIfNeeded();
            await by.screenshot({ path: path.join(SHOTS, `${base}-byline.png`) });
          }
          if (route.kind === 'weekly' && await page.locator('.tc-feed-card').count()) {
            const card = page.locator('.tc-feed-card').first();
            await card.scrollIntoViewIfNeeded();
            await card.screenshot({ path: path.join(SHOTS, `${base}-feedcard.png`) });
          }
          // switch to the other theme with the button
          const other = theme === 'light' ? 'dark' : 'light';
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.locator(`header .vn-theme-btn[data-theme-option="${other}"]`).click();
          await settle(page);
          const s2 = await themeState(page);
          if (expectTheme(where, s2, other) && s2.stored === other) pass(where, `button switched to ${other} and stored it`);
          else if (s2.stored !== other) fail(where, 'manual choice not stored', s2);
          const a2 = await page.evaluate(analyzePage, {});
          contrastRuns.push({ where, route: route.id, width, theme: other, via: 'button', tokenPairs: a2.contrast.tokenPairs, samples: a2.contrast.samples, themeButtons: a2.themeButtonsContrast });
          allContrastFails.push(...contrastFailures(`${where}->${other}`, a2));
          if (a2.overflow.docScrollWidth > width) fail(`${where}->${other}`, 'horizontal overflow after switch', a2.overflow);
          // reload keeps the manual choice even though the system scheme says otherwise
          await page.reload({ waitUntil: 'networkidle' });
          if (new URL(page.url()).pathname !== route.path) fail(where, `unexpected URL after reload ${page.url()}`);
          await waitReady(page);
          const s3 = await themeState(page);
          if (expectTheme(`${where} reload`, s3, other)) pass(where, `reload kept manual ${other}`);
          // switch back with the button
          await page.locator(`header .vn-theme-btn[data-theme-option="${theme}"]`).click();
          await settle(page);
          const s4 = await themeState(page);
          if (expectTheme(`${where} back`, s4, theme)) pass(where, `button switched back to ${theme}`);
          if (errors.length) fail(where, 'page errors', errors);
          results.push({ where, overflow: a1.overflow, korean: { nodes: a1.korean.nodes, multiLine: a1.korean.multiLine, midWord: a1.korean.midWord.length, forced: a1.korean.forced.length }, badges: a1.pium.badges.length, piums: a1.pium.piums.length, footer: a1.footer.channels.length, headerExtVisible: a1.header.ext.filter((e) => e.visible).length });
          await context.close();
        }
      }
    }

    // B) real "/" behaviour: redirects to the latest issue when JavaScript runs.
    {
      const context = await prepareContext(browser, { width: 375, colorScheme: 'light' });
      const page = await context.newPage();
      await page.goto(BASE + '/', { waitUntil: 'networkidle' });
      await page.waitForURL((u) => u.pathname === LATEST_PATH, { timeout: 10000 }).catch(() => {});
      if (new URL(page.url()).pathname === LATEST_PATH) pass('home', `JS redirect to ${LATEST_PATH}`);
      else fail('home', `JS redirect landed on ${page.url()}`);
      await context.close();
    }

    // C) No JavaScript: CSS layers follow the system, body readable, theme buttons hidden.
    for (const theme of THEMES) {
      for (const route of ROUTES) {
        const where = `nojs:${route.id}/${theme}`;
        const context = await prepareContext(browser, { width: 375, colorScheme: theme, javaScriptEnabled: false });
        const page = await context.newPage();
        await page.goto(BASE + route.path, { waitUntil: 'load' });
        const st = await page.evaluate(() => ({
          dataTheme: document.documentElement.getAttribute('data-theme'),
          bg: getComputedStyle(document.body).backgroundColor,
          text: getComputedStyle(document.body).color,
          toggleDisplay: getComputedStyle(document.querySelector('.vn-theme-toggle')).display,
          h1: document.querySelector('h1')?.textContent?.trim().slice(0, 30) ?? null,
          scroll: document.documentElement.scrollWidth,
        }));
        const darkBg = st.bg === 'rgb(15, 15, 16)';
        const lightBg = st.bg === 'rgb(255, 255, 255)';
        if (st.dataTheme !== null) fail(where, 'data-theme set without JS', st);
        if ((theme === 'dark' && !darkBg) || (theme === 'light' && !lightBg)) fail(where, 'no-JS theme does not follow system', st);
        else pass(where, `no-JS follows system (${st.bg})`);
        if (st.toggleDisplay !== 'none') fail(where, 'theme buttons shown without JS', st);
        if (st.scroll > 375) fail(where, 'no-JS overflow', st);
        if (route.id === 'w44' || route.id === 'home') await page.screenshot({ path: path.join(SHOTS, `nojs-${route.id}-0375-${theme}.png`) });
        await context.close();
      }
    }

    // D) Theme behaviour details on /2026-w44/ at 375px (plan 6.5 items 3, 4, 6, 7, 9).
    {
      const where = 'theme-behaviour';
      const context = await prepareContext(browser, { width: 375, colorScheme: 'light' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(BASE + '/2026-w44/', { waitUntil: 'networkidle' });
      await waitReady(page);
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForFunction(() => document.documentElement.getAttribute('data-theme') === 'dark', null, { timeout: 5000 }).catch(() => {});
      if (expectTheme(`${where} system->dark before manual`, await themeState(page), 'dark')) pass(where, 'follows system change before manual choice');
      await page.locator('header .vn-theme-btn[data-theme-option="light"]').click();
      await page.emulateMedia({ colorScheme: 'light' });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForTimeout(300);
      if (expectTheme(`${where} manual light kept`, await themeState(page), 'light')) pass(where, 'manual light kept after system change');
      const focus = await measureFocus(page);
      notes.push({ where: 'keyboard', focus });
      if (focus.afterTab1.option !== 'light' || !focus.afterTab1.focusVisible || focus.afterSpace !== 'light') fail(where, 'keyboard Tab/Space on 라이트', focus);
      else pass(where, 'Tab reaches 라이트, Space selects it, focus visible');
      if (focus.afterTab2.option !== 'dark' || !focus.afterTab2.focusVisible || focus.afterEnter !== 'dark') fail(where, 'keyboard Tab/Enter on 다크', focus);
      else pass(where, 'Tab reaches 다크, Enter selects it, focus visible');
      if (focus.ringContrast === null || focus.ringContrast < 3) fail(where, 'focus ring contrast < 3', focus);
      else pass(where, `focus ring contrast ${focus.ringContrast} (dark theme)`);
      await page.locator('header .vn-theme-btn[data-theme-option="dark"]').screenshot({ path: path.join(SHOTS, 'theme-buttons-focus-dark-0375.png') });
      if (errors.length) fail(where, 'page errors', errors);
      await context.close();
    }
    {
      // light-theme focus ring
      const where = 'theme-focus-light';
      const context = await prepareContext(browser, { width: 1280, colorScheme: 'light' });
      const page = await context.newPage();
      await page.goto(BASE + '/2026-w44/', { waitUntil: 'networkidle' });
      await waitReady(page);
      await page.locator('header button[aria-label^="Switch language"]').focus();
      await page.keyboard.press('Tab');
      const ring = await page.evaluate(() => { const cs = getComputedStyle(document.activeElement); return { option: document.activeElement.dataset.themeOption, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}` }; });
      notes.push({ where, ring });
      if (ring.option !== 'light' || !ring.outline.startsWith('solid 2px rgb(15, 15, 16)')) fail(where, 'light focus ring', ring);
      else pass(where, `light focus ring ${ring.outline}`);
      await page.locator('header .vn-theme-toggle').screenshot({ path: path.join(SHOTS, 'theme-buttons-focus-light-1280.png') });
      await context.close();
    }
    {
      // invalid stored value follows the system without errors
      const where = 'theme-invalid-stored';
      const context = await prepareContext(browser, { width: 375, colorScheme: 'dark', initScript: () => { try { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('voidnews-theme', 'blue'); sessionStorage.setItem('seeded', '1'); } } catch {} } });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(BASE + '/2026-w44/', { waitUntil: 'networkidle' });
      await waitReady(page);
      if (expectTheme(where, await themeState(page), 'dark') && !errors.length) pass(where, "stored 'blue' ignored, follows system dark");
      if (errors.length) fail(where, 'page errors', errors);
      await context.close();
    }
    {
      // storage throws: buttons still work; after reload the system wins
      const where = 'theme-storage-throws';
      const context = await prepareContext(browser, {
        width: 375,
        colorScheme: 'light',
        initScript: () => {
          const boom = () => { throw new DOMException('blocked', 'SecurityError'); };
          Object.defineProperty(window, 'localStorage', { configurable: true, get: boom });
        },
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(BASE + '/2026-w44/', { waitUntil: 'networkidle' });
      await waitReady(page);
      const s0 = await themeState(page);
      await page.locator('header .vn-theme-btn[data-theme-option="dark"]').click();
      await settle(page);
      const s1 = await themeState(page);
      await page.reload({ waitUntil: 'networkidle' });
      await waitReady(page);
      const s2 = await themeState(page);
      const ok = expectTheme(`${where} initial`, s0, 'light') & expectTheme(`${where} click`, s1, 'dark') & expectTheme(`${where} reload`, s2, 'light');
      if (ok && !errors.length) pass(where, 'storage throws: click works, reload follows system');
      if (errors.length) fail(where, 'page errors', errors);
      await context.close();
    }
    {
      // header boundary at 480/481px
      for (const width of [480, 481]) {
        const where = `header-boundary@${width}`;
        const context = await prepareContext(browser, { width, colorScheme: 'light' });
        const page = await context.newPage();
        await page.goto(BASE + '/2026-w44/', { waitUntil: 'networkidle' });
        await waitReady(page);
        const ext = await page.evaluate(() => [...document.querySelectorAll('header .site-nav-ext')].map((a) => a.checkVisibility()));
        const hiddenExpected = width <= 480;
        if (ext.length !== 3 || ext.some((v) => v === hiddenExpected)) fail(where, 'header ext visibility', ext);
        else pass(where, hiddenExpected ? '3 header links hidden' : '3 header links visible');
        const sw = await page.evaluate(() => document.documentElement.scrollWidth);
        if (sw > width) fail(where, 'overflow', sw);
        await page.screenshot({ path: path.join(SHOTS, `header-boundary-${width}-light.png`), clip: { x: 0, y: 0, width, height: 160 } });
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  // ---- contrast summary ----
  // Accent labels: the elements whose colour is --accent in the dark theme (unique orange there).
  // The same element ids are then read in the light run of the same session, where --accent is ink.
  const accentIds = new Map();
  for (const run of contrastRuns) {
    if (run.theme !== 'dark') continue;
    const ids = accentIds.get(run.where) || new Set();
    for (const s of run.samples) if (s.cat.split('|').includes('--accent')) ids.add(s.id);
    accentIds.set(run.where, ids);
  }
  const roleOf = (run, s) => {
    if ((accentIds.get(run.where) || new Set()).has(s.id)) return 'accent-label';
    const cats = s.cat.split('|');
    if (cats.includes('--muted')) return 'muted';
    if (cats.includes('--dim')) return 'dim';
    if (cats.includes('--on-accent')) return 'on-accent';
    if (cats.some((c) => c === '--text' || c === '--text-strong' || c === '--text-soft')) return 'body-text';
    if (cats.includes('--red')) return 'red';
    return 'other';
  };
  const summary = {};
  for (const run of contrastRuns) {
    for (const s of run.samples) {
      if (s.decorative) continue;
      s.role = roleOf(run, s);
      const key = `${run.theme}|${s.role}|${s.unknownBg ? 'over-image-or-gradient' : 'solid-bg'}`;
      const cur = summary[key] || { theme: run.theme, role: s.role, bgKind: s.unknownBg ? 'over-image-or-gradient' : 'solid-bg', n: 0, min: Infinity, max: 0, worst: null, below: 0, colors: {} };
      cur.n += 1;
      if (s.ratio < s.need) cur.below += 1;
      if (s.ratio > cur.max) cur.max = s.ratio;
      const pair = `${s.fg} on ${s.bg}`;
      cur.colors[pair] = Math.min(cur.colors[pair] ?? Infinity, s.ratio);
      if (s.ratio < cur.min) { cur.min = s.ratio; cur.worst = { where: run.where, via: run.via, el: s.el, text: s.text, fg: s.fg, bg: s.bg, size: s.size, weight: s.weight, unknownBg: s.unknownBg }; }
      summary[key] = cur;
    }
  }
  const tokenPairsByTheme = {};
  for (const run of contrastRuns) tokenPairsByTheme[run.theme] = run.tokenPairs;
  const themeBtnByTheme = {};
  for (const run of contrastRuns) themeBtnByTheme[run.theme] = run.themeButtons;
  const uniqueFails = [];
  const seen = new Set();
  for (const run of contrastRuns) {
    for (const s of run.samples) {
      if (s.decorative || s.ratio >= s.need) continue;
      const k = `${run.route}|${run.theme}|${s.el}|${s.text}|${s.fg}|${s.bg}`;
      if (seen.has(k)) continue;
      seen.add(k);
      uniqueFails.push({ where: run.where, theme: run.theme, via: run.via, ...s });
    }
  }
  if (allContrastFails.length !== contrastRuns.reduce((n, r) => n + r.samples.filter((s) => !s.decorative && s.ratio < s.need).length, 0)) {
    console.log('WARN contrast failure tallies differ between the two counting paths');
  }
  // Renewal-scope roles must pass; company-colour text ('other') is plan item R15 (P1) and only reported.
  for (const f of uniqueFails) {
    if (['body-text', 'muted', 'dim', 'accent-label', 'on-accent'].includes(f.role) && !f.unknownBg) {
      fail(`contrast:${f.where}`, `${f.role} ${f.ratio} < ${f.need}`, { el: f.el, text: f.text, fg: f.fg, bg: f.bg });
    }
  }
  const report = {
    tag: TAG,
    base: BASE,
    finishedAt: new Date().toISOString(),
    failures,
    notes,
    results,
    contrastSummary: Object.values(summary).sort((x, y) => (x.theme + x.role + x.bgKind).localeCompare(y.theme + y.role + y.bgKind)),
    tokenPairsByTheme,
    themeButtonsContrast: themeBtnByTheme,
    contrastFailuresUnique: uniqueFails.map((f) => ({ ...f, role: f.role })),
    koreanForcedBreaks: koreanForced,
    koreanPunctuationBreaks: koreanPunct,
    latinForcedBreaks: latinForced,
    latinClampedBreaks: latinClamped,
    keepAllMissing,
  };
  const file = path.join(LOG_DIR, 'renewal-ui.json');
  fs.writeFileSync(file, JSON.stringify(report, null, 2));
  console.log(`\ntoken pairs (computed colours):`);
  for (const theme of THEMES) console.log(`  ${theme}: ${JSON.stringify(tokenPairsByTheme[theme])}`);
  console.log(`theme buttons (border/fill vs header bg): ${JSON.stringify(themeBtnByTheme)}`);
  console.log(`\ncontrast summary by role (non-decorative text, all routes x widths):`);
  for (const s of report.contrastSummary) console.log(`  ${s.theme.padEnd(5)} ${s.role.padEnd(12)} ${s.bgKind.padEnd(22)} n=${String(s.n).padStart(5)} min=${s.min} max=${s.max} below=${s.below} worst=${s.worst ? `${s.worst.fg} on ${s.worst.bg} "${s.worst.text}"` : '-'}`);
  console.log(`unique contrast failures: ${uniqueFails.length} (roles: ${JSON.stringify(uniqueFails.reduce((m, f) => { m[f.role] = (m[f.role] || 0) + 1; return m; }, {}))})`);
  console.log(`Latin: plain-word splits are failures above; forced (overlong joined token) ${latinForced.length}; hidden by line-clamp ${latinClamped.length}`);
  console.log(`Korean: mid-word breaks are failures above; punctuation-boundary breaks ${koreanPunct.length}; forced (overlong unit) breaks ${koreanForced.length}; keep-all missing ${keepAllMissing.length}`);
  console.log(`report: ${file}`);
  console.log(failures.length ? `RESULT FAIL (${failures.length} failures)` : 'RESULT PASS');
  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error('CRASH', error);
  process.exit(2);
});
