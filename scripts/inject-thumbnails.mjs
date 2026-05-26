#!/usr/bin/env node
// 통합 thumbnail injector — AB editions + weekly files 동시 처리
// - lib/weeks/*.ts + lib/ab/editions/*.ts 자동 탐색
// - public/og-cache/_manifest.json URL → file 인덱스로 1차 매칭
// - 매칭 안 되는 URL은 OG fetch + 이미지 다운로드 + 캐시 등록
// - bot-차단 도메인(openai.com SPA / x.ai / t.me)은 _workspace/thumbnails/fallback-map.json 으로 수동 매핑
// - 누락분은 _workspace/thumbnails/missing.json 으로 보고 (다음 회차 QA 게이트 입력)
//
// usage:
//   node scripts/inject-thumbnails.mjs               # 전체 자동
//   node scripts/inject-thumbnails.mjs --only ab     # AB editions 만
//   node scripts/inject-thumbnails.mjs --only weeks  # weekly 만
//   node scripts/inject-thumbnails.mjs --dry-run     # 변경 없이 리포트만
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const REPO = path.resolve(import.meta.dirname, "..");
const CACHE_DIR = path.join(REPO, "public/og-cache");
const MANIFEST = path.join(CACHE_DIR, "_manifest.json");
const WORKSPACE = path.join(REPO, "_workspace/thumbnails");
const FALLBACK_MAP = path.join(WORKSPACE, "fallback-map.json");
const MISSING_REPORT = path.join(WORKSPACE, "missing.json");

const args = process.argv.slice(2);
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1] : "all";
const DRY = args.includes("--dry-run");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";
const HTML_TIMEOUT_MS = 8000;
const IMG_TIMEOUT_MS = 12000;

fs.mkdirSync(CACHE_DIR, { recursive: true });
fs.mkdirSync(WORKSPACE, { recursive: true });

const manifest = fs.existsSync(MANIFEST)
  ? JSON.parse(fs.readFileSync(MANIFEST, "utf8"))
  : {};

// fallback-map.json: { "domain-or-url-prefix": "filename-in-og-cache" }
// 예: { "openai.com/index/work-with-codex": "gpt-5-3-codex-...png" }
const fallbackMap = fs.existsSync(FALLBACK_MAP)
  ? JSON.parse(fs.readFileSync(FALLBACK_MAP, "utf8"))
  : {
      "openai.com/index/work-with-codex":
        "gpt-5-3-codex-is-now-the-base-model-for--d3b67286.png",
      "openai.com/index/introducing-the-codex-app":
        "openai-codex-goal-mode-generally-availab-62cd0085.png",
      "openai.com/index/openai-on-aws":
        "gpt-5-3-codex-is-now-the-base-model-for--d3b67286.png",
      "x.ai/news/grok-build":
        "grok-build-0-1-now-available-on-vercel-a-b7c5d45d.png",
      "t.me/cokacdir": "cokacdir-telegram-fallback.png",
    };
if (!fs.existsSync(FALLBACK_MAP) && !DRY) {
  fs.writeFileSync(FALLBACK_MAP, JSON.stringify(fallbackMap, null, 2));
}

function buildUrlIndex() {
  const idx = new Map();
  for (const [, v] of Object.entries(manifest)) {
    if (v?.file && v?.url) idx.set(v.url, v.file);
  }
  return idx;
}

function findFallback(url) {
  for (const [pattern, file] of Object.entries(fallbackMap)) {
    if (url.includes(pattern)) return file;
  }
  return null;
}

async function safeFetch(url, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,image/*,*/*",
      },
      signal: ctrl.signal,
      redirect: "follow",
    });
    clearTimeout(t);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    clearTimeout(t);
    return null;
  }
}

function pickOgImage(html, baseUrl) {
  if (!html) return null;
  const head = html.slice(0, 200_000);
  const m = (prop) =>
    (head.match(
      new RegExp(
        `<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`,
        "i"
      )
    ) || [])[1] ||
    (head.match(
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`,
        "i"
      )
    ) || [])[1];
  let img =
    m("og:image") || m("og:image:url") || m("twitter:image") || m("twitter:image:src");
  if (!img) return null;
  try {
    img = new URL(img, baseUrl).toString();
  } catch {}
  return img;
}

function safeSlug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function extFromContentType(ct, fallbackUrl) {
  if (ct?.includes("png")) return "png";
  if (ct?.includes("webp")) return "webp";
  if (ct?.includes("jpeg") || ct?.includes("jpg")) return "jpg";
  if (ct?.includes("svg")) return "svg";
  const p = (new URL(fallbackUrl).pathname || "").toLowerCase();
  for (const e of ["png", "webp", "jpg", "jpeg", "svg"])
    if (p.endsWith("." + e)) return e === "jpeg" ? "jpg" : e;
  return "jpg";
}

async function downloadAndCache(pageUrl, title) {
  const html = await safeFetch(pageUrl, HTML_TIMEOUT_MS);
  if (!html) return null;
  const imgUrl = pickOgImage(html, pageUrl);
  if (!imgUrl) return null;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), IMG_TIMEOUT_MS);
  let buf, ct;
  try {
    const res = await fetch(imgUrl, {
      headers: { "User-Agent": UA, Accept: "image/*,*/*" },
      signal: ctrl.signal,
      redirect: "follow",
    });
    clearTimeout(t);
    if (!res.ok) return null;
    ct = res.headers.get("content-type") || "";
    buf = Buffer.from(await res.arrayBuffer());
  } catch {
    clearTimeout(t);
    return null;
  }
  const hash = crypto.createHash("md5").update(pageUrl).digest("hex").slice(0, 8);
  const ext = extFromContentType(ct, imgUrl);
  const file = `${safeSlug(title || "card")}-${hash}.${ext}`;
  fs.writeFileSync(path.join(CACHE_DIR, file), buf);
  manifest[`${safeSlug(title || "card")}-${hash}`] = {
    url: pageUrl,
    image: imgUrl,
    file,
    ts: Date.now(),
  };
  return file;
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function countBraces(s) {
  let opens = 0, closes = 0, inStr = false, esc = false, strCh = "";
  for (const ch of s) {
    if (esc) { esc = false; continue; }
    if (ch === "\\") { esc = true; continue; }
    if (inStr) { if (ch === strCh) inStr = false; continue; }
    if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strCh = ch; continue; }
    if (ch === "{") opens++;
    else if (ch === "}") closes++;
  }
  return { opens, closes };
}

async function processFile(file, kind) {
  const urlIndex = buildUrlIndex();
  let src = fs.readFileSync(file, "utf8");
  const lines = src.split("\n");

  // 모든 title 위치 → enclosing { ... } 윈도우 추출
  const titleRe = /^(\s*)title:\s*"([^"]+)"/;
  const candidates = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(titleRe);
    if (!m) continue;
    const indent = m[1];
    // SKIP top-level edition title (indent <= 4)
    if (kind === "ab" && indent.length <= 4) continue;
    // backward: enclosing {
    let bal = 0, startIdx = -1;
    for (let j = i - 1; j >= 0; j--) {
      const { opens, closes } = countBraces(lines[j]);
      bal += closes - opens;
      if (bal < 0) { startIdx = j; break; }
    }
    // forward: matching }
    let depth = 1, endIdx = -1;
    for (let j = i + 1; j < lines.length; j++) {
      const { opens, closes } = countBraces(lines[j]);
      depth += opens - closes;
      if (depth === 0) { endIdx = j; break; }
    }
    if (startIdx === -1 || endIdx === -1) continue;
    const window = lines.slice(startIdx, endIdx + 1).join("\n");
    candidates.push({ startIdx, endIdx, indent, title: m[2], window });
  }

  // 가장 안쪽 카드 우선 (dedup by endIdx)
  candidates.sort((a, b) => b.indent.length - a.indent.length);
  const claimed = new Set();
  const cards = [];
  for (const c of candidates) {
    if (claimed.has(c.endIdx)) continue;
    claimed.add(c.endIdx);
    cards.push(c);
  }

  const missing = [];
  const newLines = [...lines];
  const ops = [];
  let injected = 0, skipped = 0, fetched = 0, fellback = 0;

  for (const c of cards) {
    if (/\bthumbnail:\s*\{/.test(c.window)) { skipped++; continue; }
    const url =
      (c.window.match(/officialUrl:\s*"([^"]+)"/) || [])[1] ||
      (c.window.match(/sourceUrl:\s*"([^"]+)"/) || [])[1] ||
      (c.window.match(/source:\s*"([^"]+)"/) || [])[1];
    if (!url) {
      missing.push({ file: path.basename(file), title: c.title, reason: "no-url" });
      continue;
    }
    let cached = urlIndex.get(url);
    if (!cached) {
      // fetch attempt
      if (!DRY) {
        console.log(`  fetching: ${url}`);
        cached = await downloadAndCache(url, c.title);
        if (cached) fetched++;
      }
    }
    if (!cached) {
      const fb = findFallback(url);
      if (fb && fs.existsSync(path.join(CACHE_DIR, fb))) {
        cached = fb;
        fellback++;
      }
    }
    if (!cached) {
      missing.push({ file: path.basename(file), title: c.title, url, reason: "no-og-or-fallback" });
      continue;
    }
    ops.push({ endIdx: c.endIdx, file: cached, alt: c.title });
    injected++;
  }

  if (!DRY) {
    ops.sort((a, b) => b.endIdx - a.endIdx);
    for (const op of ops) {
      const closingLine = newLines[op.endIdx];
      const m = closingLine.match(/^(\s*)\}/);
      const closeIndent = m ? m[1] : "";
      const fieldIndent = closeIndent + "  ";
      // 이전 라인이 콤마/중괄호로 끝나지 않으면 콤마 추가 (JS object literal 안전)
      const prevIdx = op.endIdx - 1;
      if (prevIdx >= 0) {
        const prev = newLines[prevIdx].trimEnd();
        if (prev && !/[,{[]$/.test(prev)) {
          newLines[prevIdx] = newLines[prevIdx].trimEnd() + ",";
        }
      }
      const block = [
        `${fieldIndent}thumbnail: {`,
        `${fieldIndent}  src: "/og-cache/${op.file}",`,
        `${fieldIndent}  alt: "${esc(op.alt)}",`,
        `${fieldIndent}},`,
      ];
      newLines.splice(op.endIdx, 0, ...block);
    }
    fs.writeFileSync(file, newLines.join("\n"));
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  }

  console.log(
    `${DRY ? "[dry] " : ""}✓ ${path.basename(file)} (${kind}): injected=${injected} skipped=${skipped} fetched=${fetched} fallback=${fellback} missing=${missing.length}`
  );
  return missing;
}

async function main() {
  const targets = [];
  if (ONLY === "all" || ONLY === "weeks") {
    const wd = path.join(REPO, "lib/weeks");
    if (fs.existsSync(wd))
      for (const f of fs.readdirSync(wd).filter((x) => x.endsWith(".ts")))
        targets.push({ file: path.join(wd, f), kind: "weekly" });
  }
  if (ONLY === "all" || ONLY === "ab") {
    const ad = path.join(REPO, "lib/ab/editions");
    if (fs.existsSync(ad))
      for (const f of fs.readdirSync(ad).filter((x) => x.endsWith(".ts")))
        targets.push({ file: path.join(ad, f), kind: "ab" });
  }

  const allMissing = [];
  for (const t of targets) {
    const m = await processFile(t.file, t.kind);
    allMissing.push(...m);
  }

  if (!DRY) {
    fs.writeFileSync(
      MISSING_REPORT,
      JSON.stringify({ generatedAt: new Date().toISOString(), missing: allMissing }, null, 2)
    );
  }

  if (allMissing.length > 0) {
    console.log(`\n⚠ ${allMissing.length} cards missing thumbnail. See ${MISSING_REPORT}`);
    console.log(`   ↳ add fallback to ${FALLBACK_MAP} and re-run`);
  } else {
    console.log(`\n✓ all cards have thumbnails`);
  }
}

await main();
