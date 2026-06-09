// robust-fetch.mjs — insane-search 철학의 최소 로컬 PoC (읽기 전용, API키 불필요)
// RAG fact-check/수집이 403/WAF로 막힌 공식 출처를 읽도록 fallback 에스컬레이션.
// Phase 0 직접(브라우저 UA) → Phase 1 Jina Reader(r.jina.ai 공개 reader) → 실패 보고.
// 외부에 우리 콘텐츠를 게시하지 않음. 공개 페이지 본문만 read.
//
// 사용: node scripts/robust-fetch.mjs <url> [--excerpt]
//   import 사용: import { robustFetch } from "./robust-fetch.mjs"; await robustFetch(url)

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

async function tryFetch(url, opts = {}) {
  const ctl = AbortSignal.timeout(opts.timeout || 15000);
  const r = await fetch(url, {
    redirect: "follow",
    signal: ctl,
    headers: { "user-agent": UA, "accept": "text/html,application/xhtml+xml,*/*", "accept-language": "en,ko;q=0.8", ...(opts.headers || {}) },
  });
  const text = await r.text();
  return { status: r.status, length: text.length, text };
}

// Phase 1: Jina Reader — 공개 read proxy, 마크다운 반환, 많은 403/JS 페이지 우회
async function viaJina(url, opts = {}) {
  const jurl = "https://r.jina.ai/" + url;
  const r = await tryFetch(jurl, { ...opts, headers: { "x-return-format": "markdown" } });
  return r;
}

function looksBlocked(res) {
  if (!res) return true;
  if (res.status >= 400) return true;
  if (res.length < 600) return true; // 빈/차단 스텁 의심
  if (/just a moment|enable javascript|access denied|attention required|cf-browser-verification|captcha/i.test(res.text.slice(0, 2000))) return true;
  return false;
}

export async function robustFetch(url, opts = {}) {
  const trail = [];
  // Phase 0 — direct
  try {
    const d = await tryFetch(url, opts);
    trail.push({ phase: "direct", status: d.status, length: d.length });
    if (!looksBlocked(d)) return { ok: true, via: "direct", status: d.status, length: d.length, text: d.text, trail };
  } catch (e) {
    trail.push({ phase: "direct", error: String(e).slice(0, 60) });
  }
  // Phase 1 — Jina Reader fallback
  try {
    const j = await viaJina(url, opts);
    trail.push({ phase: "jina", status: j.status, length: j.length });
    if (!looksBlocked(j)) return { ok: true, via: "jina", status: j.status, length: j.length, text: j.text, trail };
  } catch (e) {
    trail.push({ phase: "jina", error: String(e).slice(0, 60) });
  }
  // Phase 2 — headless browser render (로컬 chromium). 강한 차단(OpenAI 등)용.
  // playwright 미설치 시 자동 skip. opts.browser === false 면 비활성.
  if (opts.browser !== false) {
    try {
      const b = await viaBrowser(url, opts);
      trail.push({ phase: "browser", status: b.status, length: b.length });
      if (!looksBlocked(b)) return { ok: true, via: "browser", status: b.status, length: b.length, text: b.text, trail };
      return { ok: false, via: "browser-blocked", status: b.status, length: b.length, text: b.text, trail };
    } catch (e) {
      trail.push({ phase: "browser", error: String(e).slice(0, 80) });
    }
  }
  return { ok: false, via: "all-failed", trail };
}

async function viaBrowser(url, opts = {}) {
  let chromium;
  try { ({ chromium } = await import("playwright")); }
  catch { return { status: 0, length: 0, text: "", skipped: "playwright-not-installed" }; }
  const b = await chromium.launch();
  try {
    const ctx = await b.newContext({ userAgent: UA, viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    const resp = await p.goto(url, { waitUntil: "domcontentloaded", timeout: opts.timeout || 45000 });
    await p.waitForTimeout(2200);
    const text = await p.evaluate(() => document.body ? document.body.innerText : "");
    return { status: resp ? resp.status() : 0, length: text.length, text };
  } finally { await b.close(); }
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  const showExcerpt = process.argv.includes("--excerpt");
  if (!url) { console.error("usage: node scripts/robust-fetch.mjs <url> [--excerpt]"); process.exit(1); }
  const r = await robustFetch(url);
  console.log(JSON.stringify({ url, ok: r.ok, via: r.via, status: r.status, length: r.length, trail: r.trail }, null, 1));
  if (showExcerpt && r.text) console.log("\n--- excerpt ---\n" + r.text.replace(/\s+/g, " ").slice(0, 600));
}
