#!/usr/bin/env node
// AB edition 카드(highlights[].post + editorsPicks[])에 OG 썸네일을 자동 주입.
// 1) public/og-cache/_manifest.json 에서 URL → file 인덱스를 만들어 1차 매칭
// 2) 매칭 안 되는 URL은 fetch + OG 추출 + 이미지 다운로드 + 캐시 등록 후 매칭
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const REPO = path.resolve(import.meta.dirname, "..");
const CACHE_DIR = path.join(REPO, "public/og-cache");
const MANIFEST = path.join(CACHE_DIR, "_manifest.json");
const TARGETS = [
  path.join(REPO, "lib/ab/editions/2026-05b.ts"),
];
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";
const HTML_TIMEOUT_MS = 8000;
const IMG_TIMEOUT_MS = 12000;

fs.mkdirSync(CACHE_DIR, { recursive: true });
const manifest = fs.existsSync(MANIFEST)
  ? JSON.parse(fs.readFileSync(MANIFEST, "utf8"))
  : {};

function buildUrlIndex() {
  const idx = new Map();
  for (const [, v] of Object.entries(manifest)) {
    if (v?.file && v?.url) idx.set(v.url, v.file);
  }
  return idx;
}

async function safeFetch(url, ms, asBuffer = false) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html,image/*,*/*" },
      signal: ctrl.signal,
      redirect: "follow",
    });
    clearTimeout(t);
    if (!res.ok) return null;
    return asBuffer ? Buffer.from(await res.arrayBuffer()) : await res.text();
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
  if (ct?.includes("gif")) return "gif";
  const p = (new URL(fallbackUrl).pathname || "").toLowerCase();
  for (const e of ["png", "webp", "jpg", "jpeg", "svg", "gif"])
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

async function processFile(file) {
  const urlIndex = buildUrlIndex();
  let src = fs.readFileSync(file, "utf8");

  // 모든 { … } 블록을 라인 단위 brace 추적으로 찾고,
  // 그 안에서 (officialUrl|sourceUrl) + title 을 추출. 이미 thumbnail 가 있으면 skip.
  const lines = src.split("\n");
  const out = [];
  const stack = [];
  let bufStart = -1;
  let injected = 0,
    skipped = 0,
    fetched = 0,
    failed = 0;

  // 두 패스 작업이 복잡하므로 in-place transform 대신
  // 전체 본문에 대해 regex 기반 1-pass 처리:
  // 1) 각 카드 단위: officialUrl 또는 sourceUrl, title 추출
  // 2) 같은 카드에 thumbnail 가 이미 있으면 skip
  // 3) 없으면 url 매칭 → file → 닫는 `}` 직전에 thumbnail 라인 삽입

  // 카드 경계: 최상위 highlights/editorsPicks 항목은 6 spaces { 시작과 6 spaces }, 끝.
  // 단, highlights[].post 도 같이 있으므로 가장 가까운 closing brace 를 찾아야 함.
  // 안전한 방법: title 라인 위치에서 시작해서, 그 라인의 들여쓰기와 같은 들여쓰기의 } 까지 캡처.

  const newLines = [];
  for (let i = 0; i < lines.length; i++) {
    newLines.push(lines[i]);
  }

  // pass 2: 각 title 위치마다 가장 가까운 enclosing { ... } 윈도우 탐색
  // 알고리즘: title 라인부터 backward 로 brace 균형이 +1 인 라인을 찾는다 (start).
  //          forward 로 brace 균형이 -1 인 라인을 찾는다 (end).
  const titleRe = /^(\s*)title:\s*"([^"]+)"/;
  const ops = [];
  function countBraces(s) {
    let opens = 0,
      closes = 0,
      inStr = false,
      esc = false,
      strCh = "";
    for (const ch of s) {
      if (esc) {
        esc = false;
        continue;
      }
      if (ch === "\\") {
        esc = true;
        continue;
      }
      if (inStr) {
        if (ch === strCh) inStr = false;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        inStr = true;
        strCh = ch;
        continue;
      }
      if (ch === "{") opens++;
      else if (ch === "}") closes++;
    }
    return { opens, closes };
  }
  for (let i = 0; i < newLines.length; i++) {
    const m = newLines[i].match(titleRe);
    if (!m) continue;
    const indent = m[1];
    const title = m[2];

    // backward: enclosing { 찾기 (depth = 1 누적되는 라인)
    let startIdx = -1;
    let bal = 0;
    for (let j = i - 1; j >= 0; j--) {
      const { opens, closes } = countBraces(newLines[j]);
      bal += closes - opens; // 위로 갈수록 +1 되는 게 enclosing open
      if (bal < 0) {
        startIdx = j;
        break;
      }
    }
    // forward: matching } 찾기
    let endIdx = -1;
    let depth = 1;
    for (let j = i + 1; j < newLines.length; j++) {
      const { opens, closes } = countBraces(newLines[j]);
      depth += opens - closes;
      if (depth === 0) {
        endIdx = j;
        break;
      }
    }
    if (startIdx === -1 || endIdx === -1) continue;
    const window = newLines.slice(startIdx, endIdx + 1).join("\n");
    // 이미 thumbnail 가 있으면 skip
    if (/\bthumbnail:\s*\{/.test(window)) {
      skipped++;
      continue;
    }
    const url =
      (window.match(/officialUrl:\s*"([^"]+)"/) || [])[1] ||
      (window.match(/sourceUrl:\s*"([^"]+)"/) || [])[1] ||
      (window.match(/source:\s*"([^"]+)"/) || [])[1];
    if (!url) continue;
    ops.push({ startIdx, endIdx, indent, title, url });
  }

  // 같은 windowEnd 가 부모/자식으로 중복될 수 있어서 가장 안쪽(짙은 들여쓰기) 우선
  ops.sort((a, b) => b.indent.length - a.indent.length);
  const claimed = new Set();
  const filtered = [];
  for (const op of ops) {
    if (claimed.has(op.endIdx)) continue;
    claimed.add(op.endIdx);
    filtered.push(op);
  }

  // 매칭 / fetch
  for (const op of filtered) {
    let file = urlIndex.get(op.url);
    if (!file) {
      console.log(`  fetching OG: ${op.url}`);
      file = await downloadAndCache(op.url, op.title);
      if (file) fetched++;
      else {
        failed++;
        console.log(`    ✗ no OG: ${op.title}`);
        continue;
      }
    }
    op.file = file;
    op.alt = op.title;
  }

  // 라인 삽입은 endIdx 큰 것부터 (역순) — 라인 번호 보존
  filtered.sort((a, b) => b.endIdx - a.endIdx);
  for (const op of filtered) {
    if (!op.file) continue;
    const closingLine = newLines[op.endIdx];
    const m = closingLine.match(/^(\s*)\}/);
    const closeIndent = m ? m[1] : "";
    const fieldIndent = closeIndent + "  ";
    const block = [
      `${fieldIndent}thumbnail: {`,
      `${fieldIndent}  src: "/og-cache/${op.file}",`,
      `${fieldIndent}  alt: "${esc(op.alt)}",`,
      `${fieldIndent}},`,
    ];
    newLines.splice(op.endIdx, 0, ...block);
    injected++;
  }

  fs.writeFileSync(file, newLines.join("\n"));
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(
    `✓ ${path.basename(file)}: injected=${injected} skipped=${skipped} fetched=${fetched} failed=${failed}`
  );
}

for (const f of TARGETS) await processFile(f);
