#!/usr/bin/env node
// 각 post officialUrl에서 article 본문 정확히 추출.
// AI 환각 0 — 공식 본문을 그대로 영문 인용으로 저장. PostDetail이 한국어 인트로 + 영문 인용 + 한국어 용어 사전으로 렌더.

import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..");
const ARTICLE_DIR = path.join(REPO, "public/article-cache");
const MANIFEST = path.join(ARTICLE_DIR, "_manifest.json");
const TARGETS = [
  path.join(REPO, "lib/weeks/2026-w21.ts"),
  path.join(REPO, "lib/weeks/2026-w22.ts"),
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";
const TIMEOUT = 8000;
const CONCURRENCY = 6;
const MAX_PARAGRAPHS = 6;
const MIN_PARAGRAPH_LEN = 40;
const MAX_PARAGRAPH_LEN = 800;

fs.mkdirSync(ARTICLE_DIR, { recursive: true });
let manifest = {};
if (fs.existsSync(MANIFEST)) {
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {}
}

async function safeFetch(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,*/*" },
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

function decode(html) {
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#(\d+);/g, (_, n) => {
      try { return String.fromCharCode(parseInt(n, 10)); } catch { return ""; }
    });
}

function stripTags(html) {
  return decode(
    html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function extractMain(html) {
  // 우선 <article> 또는 <main> 추출
  const articleMatch =
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
    html.match(/<div[^>]+class=["'][^"']*(post-content|article-content|entry-content|prose)[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<\/(?:section|article|main)>/i);
  if (articleMatch) return articleMatch[1];
  return html;
}

function extractParagraphs(html) {
  const body = extractMain(html);
  const paragraphs = [];
  const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = pRe.exec(body)) && paragraphs.length < MAX_PARAGRAPHS * 3) {
    const text = stripTags(m[1]);
    if (text.length < MIN_PARAGRAPH_LEN || text.length > MAX_PARAGRAPH_LEN) continue;
    // 메뉴/푸터/저작권 노이즈 제외
    if (/cookie|subscribe|©|all rights reserved/i.test(text)) continue;
    if (text.split(/\s+/).length < 6) continue;
    paragraphs.push(text);
    if (paragraphs.length >= MAX_PARAGRAPHS) break;
  }
  return paragraphs;
}

function extractQuotes(html) {
  const out = [];
  const bqRe = /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi;
  let m;
  while ((m = bqRe.exec(html)) && out.length < 2) {
    const text = stripTags(m[1]);
    if (text.length > 20 && text.length < 400) out.push(text);
  }
  return out;
}

function extractHeadings(html) {
  const body = extractMain(html);
  const out = [];
  const hRe = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = hRe.exec(body)) && out.length < 6) {
    const text = stripTags(m[2]);
    if (text.length > 3 && text.length < 200) out.push({ level: parseInt(m[1], 10), text });
  }
  return out;
}

function extractMeta(html, key) {
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`, "i");
  const m = html.match(re);
  return m ? decode(m[1]) : null;
}

function extractPosts(file) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split("\n");
  const blocks = [];
  let depth = 0, buffer = [], inPost = false;
  for (const line of lines) {
    if (!inPost && /^\s{8}\{\s*$/.test(line)) { inPost = true; depth = 1; buffer = [line]; continue; }
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

const posts = TARGETS.flatMap(extractPosts);
console.log(`Found ${posts.length} posts to fetch`);

let fetched = 0, skipped = 0, failed = 0, processed = 0;
const queue = posts.slice();

async function processOne(p) {
  processed++;
  if (manifest[p.slug]?.fetchedAt && manifest[p.slug]?.paragraphs?.length) {
    skipped++; return;
  }
  const res = await safeFetch(p.url);
  if (!res || !res.ok) {
    manifest[p.slug] = { url: p.url, status: res?.status ?? 0, error: "fetch-failed" };
    failed++; return;
  }
  let html;
  try { html = await Promise.race([res.text(), new Promise((_, r) => setTimeout(() => r(new Error("read-timeout")), 5000))]); }
  catch { html = null; }
  if (!html) {
    manifest[p.slug] = { url: p.url, status: res.status, error: "read-timeout" };
    failed++; return;
  }
  const paragraphs = extractParagraphs(html);
  const headings = extractHeadings(html);
  const quotes = extractQuotes(html);
  const ogTitle = extractMeta(html, "og:title") || extractMeta(html, "twitter:title");
  const ogDescription = extractMeta(html, "og:description") || extractMeta(html, "twitter:description") || extractMeta(html, "description");
  manifest[p.slug] = {
    url: p.url,
    finalUrl: res.url || p.url,
    status: res.status,
    title: ogTitle,
    description: ogDescription,
    paragraphs,
    headings,
    quotes,
    fetchedAt: Date.now(),
  };
  if (paragraphs.length === 0 && !ogDescription) failed++;
  else fetched++;
}

async function worker() {
  while (queue.length) {
    const p = queue.shift();
    try { await processOne(p); }
    catch (e) {
      failed++;
      manifest[p.slug] = { url: p.url, error: String(e).slice(0, 200) };
    }
    if (processed % 10 === 0) {
      console.log(`progress ${processed}/${posts.length} (fetched ${fetched} skipped ${skipped} failed ${failed})`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`done — fetched: ${fetched}, skipped: ${skipped}, failed: ${failed}, total: ${posts.length}`);
process.exit(0);
