#!/usr/bin/env node
// w21/w22 weekly TS 파일을 읽어 각 post에 short hash slug + readMinutes 자동 주입
// id 기반이 아니라 (date|title) 기반 stable 8-char SHA1 hash + publisher kebab prefix
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const REPO = path.resolve(import.meta.dirname, "..");
const TARGETS = [
  path.join(REPO, "lib/weeks/2026-w21.ts"),
  path.join(REPO, "lib/weeks/2026-w22.ts"),
];

function shortHash(input) {
  return crypto.createHash("sha1").update(input).digest("hex").slice(0, 8);
}

function kebab(s) {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

function estimateReadMinutes(text) {
  if (!text) return 1;
  const words = text.replace(/\s+/g, " ").trim().split(" ").length;
  const minutes = Math.max(1, Math.round(words / 220));
  return minutes;
}

// 단순 TS 파싱: post block 단위로 라인 그룹 → 필드 추출 → slug 주입
function processFile(file) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split("\n");
  const out = [];
  let inPost = false;
  let buffer = [];
  let depth = 0;
  let postCount = 0;
  let injectedCount = 0;

  function flushPost() {
    const blockStr = buffer.join("\n");
    // 이미 slug 있으면 그대로
    if (/\bslug:\s*"/.test(blockStr)) {
      out.push(...buffer);
      buffer = [];
      return;
    }
    const titleMatch = blockStr.match(/title:\s*"([^"]+)"/);
    const dateMatch = blockStr.match(/date:\s*"([^"]+)"/);
    const summaryMatch = blockStr.match(/summary:\s*"([^"]*)"/);
    const contentMatch = blockStr.match(/content:\s*"([^"]*)"/);
    if (!titleMatch) {
      out.push(...buffer);
      buffer = [];
      return;
    }
    const title = titleMatch[1];
    const date = dateMatch ? dateMatch[1] : "";
    const summary = summaryMatch ? summaryMatch[1] : "";
    const content = contentMatch ? contentMatch[1] : "";
    const hashSeed = `${date}|${title}`;
    const slug = `${kebab(title) || "post"}-${shortHash(hashSeed)}`;
    const readMin = estimateReadMinutes(content || summary);
    // 마지막 닫는 `},` 직전 줄에 slug + readMinutes 삽입
    // 마지막 줄(`        },`) 찾기
    const lastIdx = buffer.length - 1;
    for (let i = lastIdx; i >= 0; i--) {
      if (/^\s*},?$/.test(buffer[i])) {
        const indentMatch = buffer[i - 1]?.match(/^(\s+)/);
        const indent = indentMatch ? indentMatch[1] : "          ";
        buffer.splice(
          i,
          0,
          `${indent}slug: "${slug}",`,
          `${indent}readMinutes: ${readMin},`
        );
        injectedCount++;
        break;
      }
    }
    out.push(...buffer);
    buffer = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inPost) {
      // post block 시작 감지: `        {` 정확히 8칸 들여쓰기 후 `{`
      if (/^\s{8}\{\s*$/.test(line)) {
        inPost = true;
        depth = 1;
        buffer = [line];
        postCount++;
      } else {
        out.push(line);
      }
    } else {
      buffer.push(line);
      // depth 추적
      for (const ch of line) {
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
      }
      if (depth === 0) {
        inPost = false;
        flushPost();
      }
    }
  }
  fs.writeFileSync(file, out.join("\n"));
  console.log(`✓ ${path.basename(file)}: ${postCount} posts scanned, ${injectedCount} slugs injected`);
}

for (const file of TARGETS) {
  processFile(file);
}
