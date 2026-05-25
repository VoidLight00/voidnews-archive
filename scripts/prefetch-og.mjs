#!/usr/bin/env node
// OG image 빌드 타임 prefetch — fetch + AbortController + 강제 6s timeout
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..");
const CACHE_DIR = path.join(REPO, "public/og-cache");
const MANIFEST = path.join(CACHE_DIR, "_manifest.json");
const TARGETS = [
  path.join(REPO, "lib/weeks/2026-w21.ts"),
  path.join(REPO, "lib/weeks/2026-w22.ts"),
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";
const HTML_TIMEOUT_MS = 7000;
const IMG_TIMEOUT_MS = 10000;
const CONCURRENCY = 6;

fs.mkdirSync(CACHE_DIR, { recursive: true });
let manifest = {};
if (fs.existsSync(MANIFEST)) {
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {}
}

async function safeFetch(url, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,image/*,*/*" },
      signal: ctrl.signal,
      redirect: "follow",
    });
    clearTimeout(t);
    return res;
  } catch {
    clearTimeout(t);
    return null;
  }
}

function extractOg(html, baseUrl) {
  if (!html) return null;
  const slice = html.slice(0, 200_000); // <head>만 봐도 충분
  const find = (prop) => {
    const re = new RegExp(
      `<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`,
      "i"
    );
    return (slice.match(re) || [])[1] || null;
  };
  const findRev = (prop) => {
    const re = new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`,
      "i"
    );
    return (slice.match(re) || [])[1] || null;
  };
  let image =
    find("og:image") ||
    find("og:image:url") ||
    find("twitter:image") ||
    findRev("og:image") ||
    findRev("twitter:image");
  if (image) {
    try { image = new URL(image, baseUrl).toString(); } catch {}
  }
  return { image, title: find("og:title") || find("twitter:title"), description: find("og:description") };
}

function extractPosts(file) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split("\n");
  const blocks = [];
  let depth = 0, buffer = [], inPost = false;
  for (const line of lines) {
    if (!inPost && /^\s{8}\{\s*$/.test(line)) {
      inPost = true; depth = 1; buffer = [line]; continue;
    }
    if (inPost) {
      buffer.push(line);
      for (const ch of line) { if (ch === "{") depth++; else if (ch === "}") depth--; }
      if (depth === 0) {
        inPost = false;
        const txt = buffer.join("\n");
        const slug = (txt.match(/slug:\s*"([^"]+)"/) || [])[1];
        const url = (txt.match(/officialUrl:\s*"([^"]+)"/) || [])[1] || (txt.match(/source:\s*"([^"]+)"/) || [])[1];
        if (slug && url) blocks.push({ slug, url });
      }
    }
  }
  return blocks;
}

const ext = (url) => {
  try {
    const p = new URL(url).pathname.toLowerCase();
    if (p.endsWith(".png")) return "png";
    if (p.endsWith(".webp")) return "webp";
    if (p.endsWith(".gif")) return "gif";
    if (p.endsWith(".svg")) return "svg";
  } catch {}
  return "jpg";
};

const posts = TARGETS.flatMap(extractPosts);
console.log(`Found ${posts.length} posts`);

const queue = posts.slice();
let fetched = 0, skipped = 0, failed = 0, processed = 0;

async function processOne(p) {
  processed++;
  const existing = manifest[p.slug];
  if (existing?.file && fs.existsSync(path.join(CACHE_DIR, existing.file))) {
    skipped++; return;
  }
  const res = await safeFetch(p.url, HTML_TIMEOUT_MS);
  if (!res || !res.ok) {
    manifest[p.slug] = { url: p.url, image: null, status: res?.status ?? 0, ts: Date.now() };
    failed++; return;
  }
  let html;
  try { html = await Promise.race([
    res.text(),
    new Promise((_, rej) => setTimeout(() => rej(new Error("read-timeout")), 5000)),
  ]); } catch { html = null; }
  const og = extractOg(html, res.url || p.url);
  if (!og?.image) {
    manifest[p.slug] = { url: p.url, image: null, status: res.status, ts: Date.now() };
    failed++; return;
  }
  const file = `${p.slug}.${ext(og.image)}`;
  const dest = path.join(CACHE_DIR, file);
  const imgRes = await safeFetch(og.image, IMG_TIMEOUT_MS);
  if (!imgRes || !imgRes.ok) {
    manifest[p.slug] = { url: p.url, image: og.image, file: null, ts: Date.now() };
    failed++; return;
  }
  const ct = imgRes.headers.get("content-type") || "";
  if (!ct.startsWith("image/")) {
    manifest[p.slug] = { url: p.url, image: og.image, file: null, ts: Date.now() };
    failed++; return;
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  fs.writeFileSync(dest, buf);
  manifest[p.slug] = {
    url: p.url,
    image: og.image,
    title: og.title || null,
    description: og.description || null,
    file,
    bytes: buf.length,
    ts: Date.now(),
  };
  fetched++;
}

async function worker() {
  while (queue.length) {
    const p = queue.shift();
    try {
      await processOne(p);
    } catch (e) {
      failed++;
      manifest[p.slug] = { url: p.url, image: null, error: String(e).slice(0, 120), ts: Date.now() };
    }
    if (processed % 10 === 0) console.log(`progress ${processed}/${posts.length} (fetched ${fetched} skipped ${skipped} failed ${failed})`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`done — fetched: ${fetched}, skipped: ${skipped}, failed: ${failed}, total: ${posts.length}`);
process.exit(0);
