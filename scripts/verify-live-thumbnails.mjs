#!/usr/bin/env node
// Live thumbnail verification — production URL 의 모든 AB edition + weekly 페이지에서
// img src 를 추출하고 실제 HTTP 200 + content-type=image/* 인지 검증
//
// usage:
//   node scripts/verify-live-thumbnails.mjs                            # production
//   node scripts/verify-live-thumbnails.mjs --base http://localhost:3000  # local
//
// 출력: _workspace/abqa/<timestamp>/{report.md, broken.json, all.json}
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const BASE = (args.includes("--base") ? args[args.indexOf("--base") + 1] : "https://voidnews-archive.vercel.app").replace(/\/$/, "");

const TS = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const OUT = path.join(REPO, `_workspace/abqa/${TS}-live-thumbs`);
fs.mkdirSync(OUT, { recursive: true });

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Version/17.5 Safari/605.1.15";
const CONCURRENCY = 10;
const FETCH_TIMEOUT_MS = 15000;

// 검증 대상 페이지
const TARGETS = [
  "/ab/2026-04a/",
  "/ab/2026-04b/",
  "/ab/2026-04c/",
  "/ab/2026-05a/",
  "/ab/2026-05b/",
  "/2026-w15/", "/2026-w16/", "/2026-w17/", "/2026-w18/", "/2026-w19/",
  "/2026-w20/", "/2026-w21/", "/2026-w22/",
];

async function withTimeout(promise, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return { result: await promise(ctrl.signal), aborted: false };
  } catch (e) {
    return { result: null, aborted: true, error: String(e) };
  } finally {
    clearTimeout(t);
  }
}

// 🚨 Production-blocker patterns — 응답 자체가 Vercel 보호 화면이면 즉시 fail.
// 일반 사용자가 사이트 콘텐츠를 못 봄. 단순 status=200 이 아니라 응답 title/body 까지 검사.
const VERCEL_GATE_PATTERNS = [
  /<title>\s*Vercel Security Checkpoint\s*<\/title>/i,
  /<title>\s*Authentication Required\s*<\/title>/i,
  /vercel\.com\/sso-api/i,
  /_vercel_sso_nonce/i,
  /__vercel_protection_bypass/i,
];

function detectVercelGate(html) {
  if (!html) return null;
  const head = html.slice(0, 20_000);
  for (const re of VERCEL_GATE_PATTERNS) {
    const m = head.match(re);
    if (m) return m[0].slice(0, 80);
  }
  return null;
}

async function fetchPage(url) {
  const { result, error } = await withTimeout((signal) =>
    fetch(url, { headers: { "User-Agent": UA }, signal, redirect: "follow" }), FETCH_TIMEOUT_MS);
  if (!result) return { status: 0, html: "", error };
  const html = await result.text();
  const gate = detectVercelGate(html);
  return { status: result.status, html, gate };
}

function extractImgSrcs(html, baseUrl) {
  // <img ... src="..."> + style="background-image:url(...)" + <source srcset>
  const out = new Set();
  for (const m of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) out.add(m[1]);
  for (const m of html.matchAll(/<img\b[^>]*\bsrcset=["']([^"']+)["']/gi)) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (u) out.add(u);
    }
  }
  for (const m of html.matchAll(/background-image:\s*url\(["']?([^"')]+)["']?\)/gi)) out.add(m[1]);
  for (const m of html.matchAll(/<source\b[^>]*\bsrcset=["']([^"']+)["']/gi)) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (u) out.add(u);
    }
  }
  // 절대 URL 정규화 (next/image 의 /_next/image?url= 도 처리)
  const normalized = new Set();
  for (const raw of out) {
    try {
      let url = raw;
      // Next.js image optimizer wrapper — 실제 underlying src 추출
      if (url.includes("/_next/image") && url.includes("url=")) {
        const inner = new URL(url, baseUrl).searchParams.get("url");
        if (inner) url = inner;
      }
      const abs = new URL(url, baseUrl).toString();
      // skip data: + svg+xml inline + favicons/icons (검증 대상 아님)
      if (abs.startsWith("data:")) continue;
      if (/\/favicon\.|\/apple-touch-icon|\/_next\/static/.test(abs)) continue;
      normalized.add(abs);
    } catch {}
  }
  return [...normalized];
}

async function checkImage(url) {
  const { result, error, aborted } = await withTimeout((signal) =>
    fetch(url, { method: "GET", headers: { "User-Agent": UA, Accept: "image/*,*/*" }, signal, redirect: "follow" }), FETCH_TIMEOUT_MS);
  if (!result) return { url, ok: false, status: 0, reason: aborted ? "timeout" : error };
  const ct = result.headers.get("content-type") || "";
  const cl = Number(result.headers.get("content-length") || 0);
  // URL 경로에 이미지 확장자가 있으면 content-type 관대하게 (GCS application/octet-stream 케이스)
  const pathHasImageExt = /\.(png|webp|jpe?g|gif|svg|avif|ico)(\?|$)/i.test(url);
  const isImage =
    /^image\//i.test(ct) ||
    /svg|png|webp|jpe?g|gif|avif/i.test(ct) ||
    (pathHasImageExt && cl > 500); // 확장자 + 의미있는 바이트
  return {
    url,
    ok: result.ok && isImage,
    status: result.status,
    contentType: ct,
    bytes: cl,
    reason: !result.ok ? `http-${result.status}` : !isImage ? `not-image:${ct}` : null,
  };
}

async function parallelMap(items, worker, concurrency = CONCURRENCY) {
  const out = new Array(items.length);
  let i = 0;
  async function run() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await worker(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
  return out;
}

async function main() {
  console.log(`base: ${BASE}`);
  console.log(`pages: ${TARGETS.length}`);
  const all = [];
  const broken = [];
  const summary = [];

  let gateDetected = null;
  for (const route of TARGETS) {
    const pageUrl = BASE + route;
    const { status, html, error, gate } = await fetchPage(pageUrl);
    if (gate) {
      gateDetected = gate;
      summary.push({ route, status, error: `vercel-gate:${gate}`, imgs: 0, broken: 0 });
      console.log(`🚨 ${route} — Vercel protection gate detected: "${gate}" (사용자가 사이트 콘텐츠 못 봄)`);
      continue;
    }
    if (status !== 200) {
      summary.push({ route, status, error, imgs: 0, broken: 0 });
      console.log(`✗ ${route} — page status ${status}`);
      continue;
    }
    const srcs = extractImgSrcs(html, pageUrl);
    const results = await parallelMap(srcs, checkImage);
    const bad = results.filter((r) => !r.ok);
    summary.push({ route, status: 200, imgs: srcs.length, broken: bad.length });
    for (const r of results) {
      all.push({ route, ...r });
      if (!r.ok) broken.push({ route, ...r });
    }
    console.log(`${bad.length === 0 ? "✓" : "⚠"} ${route} — ${srcs.length} imgs, ${bad.length} broken`);
  }

  // Reports
  fs.writeFileSync(path.join(OUT, "all.json"), JSON.stringify(all, null, 2));
  fs.writeFileSync(path.join(OUT, "broken.json"), JSON.stringify(broken, null, 2));

  const md = [];
  md.push(`# Live Thumbnail Verification — ${BASE}`);
  md.push(`Generated: ${new Date().toISOString()}\n`);
  md.push(`## Summary\n`);
  md.push("| Route | Page status | Imgs | Broken |");
  md.push("|---|---|---|---|");
  for (const s of summary) {
    const flag = s.status !== 200 ? "🔴" : s.broken > 0 ? "🟡" : "✓";
    md.push(`| ${flag} ${s.route} | ${s.status} | ${s.imgs ?? "-"} | ${s.broken ?? "-"} |`);
  }
  md.push("");
  if (broken.length) {
    md.push(`## 🔴 Broken images (${broken.length})\n`);
    for (const b of broken.slice(0, 80)) {
      md.push(`- **${b.route}** — \`${b.url}\``);
      md.push(`  → ${b.reason} (status ${b.status}${b.contentType ? `, content-type ${b.contentType}` : ""})`);
    }
    if (broken.length > 80) md.push(`\n_+${broken.length - 80} more_`);
  } else {
    md.push(`✓ all images load successfully`);
  }
  const mdPath = path.join(OUT, "report.md");
  fs.writeFileSync(mdPath, md.join("\n"));

  console.log(`\n${broken.length === 0 ? "✓" : "⚠"} total broken: ${broken.length}`);
  if (gateDetected) {
    console.log(`\n🚨 CRITICAL — Vercel protection gate (${gateDetected}) 발견. 일반 사용자가 사이트 못 봄.`);
    console.log(`   원인 후보: ssoProtection / passwordProtection / Attack Challenge Mode`);
    console.log(`   조치: TOKEN=$(...) ; curl -X PATCH https://api.vercel.com/v9/projects/<id>?teamId=<team> \\`);
    console.log(`         -d '{"ssoProtection": null}' -H "Authorization: Bearer $TOKEN"`);
    console.log(`         후 'vercel deploy --prod --force' 로 alias 갱신.`);
    process.exitCode = 2;
  }
  console.log(`  report: ${mdPath}`);
}

await main();
