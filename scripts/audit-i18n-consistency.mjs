#!/usr/bin/env node
// 사이트 텍스트 데이터 전수 audit — 한글/영어 일관성 점검
// 4축 검사:
//   1. mojibake (깨진 UTF-8 → Latin-1 오역) — "ì", "ã", "â", "ï¿½", "â€" 등
//   2. UI label 영어 잔존 (한국어 사이트인데 영어 chrome 라벨)
//   3. 영어 고유명사 잘못된 한국어 음역 (예: "오픈에이아이" → OpenAI 원문 유지 권장)
//   4. 한·영 혼재 카드 일관성 — title 영어/summary 한국어 등 비일관 패턴
//
// usage:
//   node scripts/audit-i18n-consistency.mjs
//   → _workspace/audit/i18n-consistency.json + .md 보고서
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..");
const WORKSPACE = path.join(REPO, "_workspace/audit");
fs.mkdirSync(WORKSPACE, { recursive: true });

const TARGETS = [
  ...fs.readdirSync(path.join(REPO, "lib/weeks")).filter((f) => f.endsWith(".ts")).map((f) => `lib/weeks/${f}`),
  ...fs.readdirSync(path.join(REPO, "lib/ab/editions")).filter((f) => f.endsWith(".ts")).map((f) => `lib/ab/editions/${f}`),
];

// 1. Mojibake detection patterns
const MOJIBAKE_RE = /[ìãâïÂÃ][-ÿ�]|â€[œ™˜"']|�|ï¿½/g;

// 2. UI chrome 영어 잔존 — 페이지 라우트가 한국어 사이트인 경우 의심
const ENGLISH_UI_LABELS = [
  /\bRead more\b/g,
  /\bView all\b/g,
  /\bEdit\b(?!or)/g,
  /\bBack to\b/g,
  /\bPublished\b/g,
  /\bDraft\b/g,
  /\bSee details\b/g,
  /\bShow more\b/g,
];

// 3. 영문 원문 유지 권장 (잘못된 음역 의심)
const KOREAN_TRANSLITERATIONS = [
  { wrong: /오픈에이아이/g, correct: "OpenAI" },
  { wrong: /앤트로픽/g, correct: "Anthropic" },
  { wrong: /구글 딥마인드/g, correct: "Google DeepMind" },
  { wrong: /엔비디아/g, correct: "NVIDIA", allow: true }, // 보편적 한글 표기 OK
  { wrong: /엑스에이아이/g, correct: "xAI" },
  { wrong: /클로드 코드/g, correct: "Claude Code" },
];

// 4. 한·영 혼재 검출 — Hangul ratio 분석
const HANGUL_RE = /[가-힣]/g;
const ENGLISH_WORD_RE = /\b[a-zA-Z]{4,}\b/g;

function detectLanguageMix(text) {
  if (!text) return { lang: "empty", hangulRatio: 0 };
  const h = (text.match(HANGUL_RE) || []).length;
  const e = (text.match(ENGLISH_WORD_RE) || []).join("").length;
  const total = h + e;
  if (total === 0) return { lang: "neutral", hangulRatio: 0 };
  const ratio = h / total;
  if (ratio > 0.85) return { lang: "ko", hangulRatio: ratio };
  if (ratio < 0.15) return { lang: "en", hangulRatio: ratio };
  return { lang: "mixed", hangulRatio: ratio };
}

const findings = {
  mojibake: [],
  englishUiLabels: [],
  badTransliterations: [],
  inconsistentCards: [],
  summary: {},
};

for (const rel of TARGETS) {
  const abs = path.join(REPO, rel);
  const src = fs.readFileSync(abs, "utf8");
  const lines = src.split("\n");

  // 1. Mojibake — line-by-line
  for (let i = 0; i < lines.length; i++) {
    const matches = lines[i].match(MOJIBAKE_RE);
    if (matches) {
      findings.mojibake.push({
        file: rel,
        line: i + 1,
        sample: lines[i].slice(0, 150),
        pattern: [...new Set(matches)].slice(0, 5).join(" "),
      });
    }
  }

  // 2. English UI labels (in string values, not in keys)
  for (const re of ENGLISH_UI_LABELS) {
    const allMatches = [...src.matchAll(new RegExp(re.source, "g"))];
    for (const m of allMatches) {
      const lineNum = src.slice(0, m.index).split("\n").length;
      const line = lines[lineNum - 1];
      // skip if obviously inside a URL or code comment
      if (line.includes("http://") || line.includes("https://") || line.trim().startsWith("//")) continue;
      findings.englishUiLabels.push({ file: rel, line: lineNum, match: m[0], context: line.trim().slice(0, 120) });
    }
  }

  // 3. Bad transliterations
  for (const { wrong, correct, allow } of KOREAN_TRANSLITERATIONS) {
    if (allow) continue;
    const matches = [...src.matchAll(new RegExp(wrong.source, "g"))];
    for (const m of matches) {
      const lineNum = src.slice(0, m.index).split("\n").length;
      findings.badTransliterations.push({
        file: rel,
        line: lineNum,
        wrong: m[0],
        suggested: correct,
        context: lines[lineNum - 1]?.trim().slice(0, 120),
      });
    }
  }

  // 4. Card consistency — title ↔ summary 언어 일치 검사 (highlight/post 카드만)
  const cardRe = /title:\s*"([^"]+)"[\s\S]{0,2000}?summary:\s*"((?:[^"\\]|\\.)*)"/g;
  let cm;
  while ((cm = cardRe.exec(src))) {
    const title = cm[1];
    const summary = cm[2].replace(/\\"/g, '"').replace(/\\n/g, " ");
    const tl = detectLanguageMix(title);
    const sl = detectLanguageMix(summary);
    if (tl.lang !== sl.lang && tl.lang !== "neutral" && sl.lang !== "neutral") {
      const lineNum = src.slice(0, cm.index).split("\n").length;
      findings.inconsistentCards.push({
        file: rel,
        line: lineNum,
        titleLang: tl.lang,
        summaryLang: sl.lang,
        titleSample: title.slice(0, 80),
        summarySample: summary.slice(0, 80),
      });
    }
  }
}

findings.summary = {
  mojibake: findings.mojibake.length,
  englishUiLabels: findings.englishUiLabels.length,
  badTransliterations: findings.badTransliterations.length,
  inconsistentCards: findings.inconsistentCards.length,
};

const jsonPath = path.join(WORKSPACE, "i18n-consistency.json");
fs.writeFileSync(jsonPath, JSON.stringify(findings, null, 2));

// markdown report
const md = [];
md.push("# i18n Consistency Audit");
md.push(`Generated: ${new Date().toISOString()}\n`);
md.push("## Summary\n");
md.push("| 카테고리 | 발견 수 | 심각도 |");
md.push("|---|---|---|");
md.push(`| Mojibake (깨진 한글) | ${findings.mojibake.length} | ${findings.mojibake.length > 0 ? "🔴 critical" : "✓"} |`);
md.push(`| 영어 UI 라벨 잔존 | ${findings.englishUiLabels.length} | ${findings.englishUiLabels.length > 0 ? "🟡 review" : "✓"} |`);
md.push(`| 잘못된 한글 음역 | ${findings.badTransliterations.length} | ${findings.badTransliterations.length > 0 ? "🟡 review" : "✓"} |`);
md.push(`| 카드 언어 불일치 (title ≠ summary) | ${findings.inconsistentCards.length} | ${findings.inconsistentCards.length > 0 ? "🟡 review" : "✓"} |`);
md.push("");

if (findings.mojibake.length) {
  md.push("## 🔴 Mojibake (즉시 수정 필요)\n");
  for (const f of findings.mojibake.slice(0, 30)) {
    md.push(`- **${f.file}:${f.line}** — pattern: \`${f.pattern}\``);
    md.push(`  \`\`\`\n  ${f.sample}\n  \`\`\``);
  }
  if (findings.mojibake.length > 30) md.push(`\n_+${findings.mojibake.length - 30} more_`);
  md.push("");
}

if (findings.englishUiLabels.length) {
  md.push("## 🟡 영어 UI 라벨\n");
  for (const f of findings.englishUiLabels.slice(0, 30)) {
    md.push(`- **${f.file}:${f.line}** — \`${f.match}\` → ${f.context}`);
  }
  if (findings.englishUiLabels.length > 30) md.push(`\n_+${findings.englishUiLabels.length - 30} more_`);
  md.push("");
}

if (findings.badTransliterations.length) {
  md.push("## 🟡 잘못된 한글 음역\n");
  for (const f of findings.badTransliterations.slice(0, 30)) {
    md.push(`- **${f.file}:${f.line}** — \`${f.wrong}\` → \`${f.suggested}\``);
    md.push(`  ${f.context}`);
  }
  md.push("");
}

if (findings.inconsistentCards.length) {
  md.push("## 🟡 카드 언어 불일치\n");
  for (const f of findings.inconsistentCards.slice(0, 30)) {
    md.push(`- **${f.file}:${f.line}** — title=${f.titleLang} / summary=${f.summaryLang}`);
    md.push(`  - title: ${f.titleSample}`);
    md.push(`  - summary: ${f.summarySample}`);
  }
  if (findings.inconsistentCards.length > 30) md.push(`\n_+${findings.inconsistentCards.length - 30} more_`);
}

const mdPath = path.join(WORKSPACE, "i18n-consistency.md");
fs.writeFileSync(mdPath, md.join("\n"));

console.log(`✓ audit complete`);
console.log(`  mojibake: ${findings.mojibake.length}`);
console.log(`  englishUiLabels: ${findings.englishUiLabels.length}`);
console.log(`  badTransliterations: ${findings.badTransliterations.length}`);
console.log(`  inconsistentCards: ${findings.inconsistentCards.length}`);
console.log(`\n  JSON: ${jsonPath}`);
console.log(`  Report: ${mdPath}`);
