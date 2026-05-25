#!/usr/bin/env node
// public/og-cache/_manifest.json 을 읽어 w21/w22 weekly의 각 post에 thumbnail/images 자동 주입
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..");
const CACHE_DIR = path.join(REPO, "public/og-cache");
const MANIFEST = path.join(CACHE_DIR, "_manifest.json");
const TARGETS = [
  path.join(REPO, "lib/weeks/2026-w21.ts"),
  path.join(REPO, "lib/weeks/2026-w22.ts"),
];

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function processFile(file) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split("\n");
  const out = [];
  let inPost = false, buffer = [], depth = 0;
  let injected = 0, skipped = 0, missing = 0;

  function flush() {
    const txt = buffer.join("\n");
    const slug = (txt.match(/slug:\s*"([^"]+)"/) || [])[1];
    if (!slug) { out.push(...buffer); buffer = []; return; }
    // 이미 thumbnail 있으면 skip
    if (/\bthumbnail:\s*\{/.test(txt)) {
      skipped++; out.push(...buffer); buffer = []; return;
    }
    const meta = manifest[slug];
    if (!meta?.file) {
      missing++; out.push(...buffer); buffer = []; return;
    }
    // title from buffer
    const title = (txt.match(/title:\s*"([^"]+)"/) || [])[1] || "card cover";
    const lastIdx = buffer.length - 1;
    for (let i = lastIdx; i >= 0; i--) {
      if (/^\s*\},?\s*$/.test(buffer[i])) {
        const indent = (buffer[i - 1]?.match(/^(\s+)/) || ["", "          "])[1];
        buffer.splice(
          i,
          0,
          `${indent}thumbnail: {`,
          `${indent}  src: "/og-cache/${meta.file}",`,
          `${indent}  alt: "${esc(title)}",`,
          `${indent}},`
        );
        injected++;
        break;
      }
    }
    out.push(...buffer);
    buffer = [];
  }

  for (const line of lines) {
    if (!inPost && /^\s{8}\{\s*$/.test(line)) {
      inPost = true; depth = 1; buffer = [line]; continue;
    }
    if (inPost) {
      buffer.push(line);
      for (const ch of line) { if (ch === "{") depth++; else if (ch === "}") depth--; }
      if (depth === 0) { inPost = false; flush(); }
    } else {
      out.push(line);
    }
  }
  fs.writeFileSync(file, out.join("\n"));
  console.log(`✓ ${path.basename(file)}: injected=${injected} skipped=${skipped} missing(no-og)=${missing}`);
}

for (const f of TARGETS) processFile(f);
