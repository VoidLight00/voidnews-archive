#!/usr/bin/env node
// test-renewal-ui.selftest.mjs — 줄바꿈 금지 위치 검사(forbiddenBreaks)가 WebKit 전용 결함을 종류별로 잡는지 확인합니다.
//
// 왜: 2026-11-01 Aislop 감사에서 /privacy/·/newsletter/의 줄바꿈 결함 13건이 WebKit(아이폰의 모든 브라우저가 쓰는 Safari
// 엔진)에서만 나왔고 Chromium에서는 0건이었습니다. 리뉴얼 브라우저 시험은 Chromium만 돌렸으므로 이런 결함은 시험을 통과한
// 채 공개될 수 있었습니다. 첫 자체시험은 '주소의 점' 한 종류만 증명했다는 검토 지적에 따라, 지금은 세 단계로 확인합니다.
//   1) 대조: 고친 /privacy/ 그대로 → 두 엔진 모두 0건이어야 합니다(오탐 없음).
//   2) 실제 회귀: 호스트 이름의 영어 구간을 풀어 한국어 문장에 되돌림 → WebKit은 inDotted 1건 이상, Chromium은 0건.
//   3) 종류별 표본: 사이트와 같은 글꼴·줄바꿈 규칙의 문단을 너비 120~340px로 넣음 → WebKit은 afterOpen·inDotted·
//      dotParticle을 각각 1건 이상 잡아야 하고, Chromium은 afterOpen·inDotted가 0건이어야 합니다. 'Inc.|의'(dotParticle)는
//      2026-11-01 측정에서 Chromium도 끊으므로 Chromium 쪽 개수는 따지지 않습니다.
// '%' 앞, '@' 옆, 인라인 요소 경계(acrossNodes)는 같은 측정에서 두 엔진 모두 끊지 않아 함정으로 증명하지 못했습니다.
// 검사 규칙은 남겨 두고, 이 세 종류는 미검증으로 봅니다.
//
// 사용: node scripts/test-renewal-ui.selftest.mjs [--url <주소>]   (기본: VOIDNEWS_TEST_URL, 없으면 http://127.0.0.1:3142)
// 종료 코드: 0 기대대로 동작 · 1 기대와 다름 · 2 실행 오류
import { analyzePage } from './lib/renewal-ui-page.mjs';
import { launchEngine } from './lib/playwright-engine.mjs';

const crash = (error) => { console.error('CRASH', error); process.exit(2); };
process.on('uncaughtException', crash);
process.on('unhandledRejection', crash);
// page.evaluate has no timeout of its own; stop a hung engine instead of waiting forever.
setTimeout(() => crash(new Error('self-test did not finish in 10 minutes')), 600_000).unref();
const i = process.argv.indexOf('--url');
const BASE = (i > 0 && process.argv[i + 1] ? process.argv[i + 1] : process.env.VOIDNEWS_TEST_URL ?? 'http://127.0.0.1:3142').replace(/\/+$/, '');
const WIDTHS = [320, 375, 768, 1280];
const SAMPLES = {
  afterOpen: '이번 개편은 글꼴(Pretendard)과 설정(밀도·정렬)을 바꾸고, 주제는 ‘트렌드’와 「국정ON」입니다.',
  inDotted: '원문은 storage.googleapis.com과 i.ytimg.com에 그대로 남아 있습니다.',
  dotParticle: '이전받는 곳은 Amazon Web Services, Inc.의 미국 서버입니다.',
};
const unwrapHosts = () => {
  const spans = [...document.querySelectorAll('main span[lang="en"]')];
  spans.forEach((span) => span.replaceWith(span.textContent));
  document.body.normalize();
  return spans.length;
};
const addSamples = (samples) => {
  const host = document.createElement('section');
  host.id = 'kind-samples';
  for (const [kind, text] of Object.entries(samples)) {
    for (let w = 120; w <= 340; w += 2) {
      const p = document.createElement('p');
      p.lang = 'ko';
      p.dataset.sample = kind;
      p.style.cssText = `width:${w}px;margin:0 0 4px;font-size:16px;line-height:1.6;word-break:keep-all;overflow-wrap:anywhere`;
      p.textContent = text;
      host.append(p);
    }
  }
  document.querySelector('main').append(host);
  return host.children.length;
};
const count = (list) => list.reduce((m, f) => ({ ...m, [f.kind]: (m[f.kind] || 0) + 1 }), {});

const playwright = await import('playwright');
const failures = [];
const expect = (ok, what, detail) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${what}${ok ? '' : ' ' + JSON.stringify(detail).slice(0, 400)}`);
  if (!ok) failures.push(what);
};

for (const engine of ['webkit', 'chromium']) {
  const { browser, build } = await launchEngine(playwright, engine);
  console.log(`ENGINE ${engine} ${browser.version()} build=${build} base=${BASE}`);
  try {
    const context = await browser.newContext({ viewport: { width: 375, height: 900 }, locale: 'ko-KR' });
    await context.route('**/*', (route) => {
      const host = new URL(route.request().url()).hostname;
      return [new URL(BASE).hostname, 'cdn.jsdelivr.net'].includes(host) ? route.continue() : route.abort();
    });
    const page = await context.newPage();
    page.setDefaultTimeout(60_000);
    const load = async () => {
      await page.goto(`${BASE}/privacy/`, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { await document.fonts.ready; });
    };
    const sweep = async () => {
      const found = [];
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        await page.waitForTimeout(80);
        found.push(...(await page.evaluate(analyzePage, {})).forbiddenBreaks);
      }
      return found;
    };
    // 1) control
    await load();
    const control = await sweep();
    expect(control.length === 0, `${engine} control: fixed /privacy/ has 0 forbidden breaks`, control.slice(0, 3));
    // 2) real regression
    const unwrapped = await page.evaluate(unwrapHosts);
    if (!unwrapped) throw new Error('host-name trap changed nothing: no main span[lang="en"] on /privacy/');
    const trap = count(await sweep());
    if (engine === 'webkit') expect((trap.inDotted || 0) > 0, `webkit host-name trap (${unwrapped} spans unwrapped): inDotted ${trap.inDotted || 0}`, trap);
    else expect(Object.keys(trap).length === 0, `chromium host-name trap (${unwrapped} spans unwrapped): 0 forbidden breaks`, trap);
    // 3) kind samples, measured at one viewport so the sample widths stay fixed
    await load();
    await page.setViewportSize({ width: 1280, height: 900 });
    const added = await page.evaluate(addSamples, SAMPLES);
    const samples = (await page.evaluate(analyzePage, {})).forbiddenBreaks.filter((f) => f.el.includes('section#kind-samples'));
    const kinds = count(samples);
    if (engine === 'webkit') {
      for (const kind of Object.keys(SAMPLES)) expect((kinds[kind] || 0) > 0, `webkit samples (${added} paragraphs): ${kind} ${kinds[kind] || 0}`, kinds);
    } else {
      expect(!kinds.afterOpen && !kinds.inDotted, `chromium samples (${added} paragraphs): afterOpen ${kinds.afterOpen || 0}, inDotted ${kinds.inDotted || 0} (dotParticle ${kinds.dotParticle || 0} allowed)`, kinds);
    }
    await context.close();
  } finally {
    await browser.close();
  }
}
console.log(failures.length ? `RESULT FAIL (${failures.length})` : 'RESULT PASS (the check catches each WebKit-only kind, with no false hit on the fixed page)');
process.exit(failures.length ? 1 : 0);
