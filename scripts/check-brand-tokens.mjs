#!/usr/bin/env node
// check-brand-tokens.mjs — 브랜드 색 토큰과 대비 HARD 게이트(리뉴얼 계획 R2, REQUIREMENTS R20)
//
// 왜: 강조색이 주황 2종·금색·녹색으로 갈라져 있었고, 라이트 강조 글자 4.36:1, 주황 면 위 글자 4.09:1,
// --dim 2.77:1처럼 WCAG 기준에 못 미쳤습니다. 강조 역할 토큰은 VOIDLIGHT 원색(잉크·종이·데이지 주황)만
// 참조하고, 두 테마의 글자 4.5:1·컨트롤 경계와 초점 3:1을 숫자로 지켜야 합니다. 이전 강조색 hex가 다시
// 들어오거나 토큰 하나를 옛 값으로 되돌리면 실패합니다.
//
// 사용: node scripts/check-brand-tokens.mjs [--root <dir>]   (원본 검사만 있습니다. prebuild에서 돕니다.)
// 종료 코드: 0 통과 · 1 위반 · 2 입력 오류
import {
  blend, contrast, createReporter, cssDeclarations, listFiles, parseCssRules, parseHex, readText, resolveToken, runGate,
} from "./lib/renewal-gate-kit.mjs";

const GATE = "brand-tokens";
const CSS = "app/globals.css";
// 계획 2.1절 R2: 원색 토큰과 값
const BRAND = {
  "--brand-ink": "#0f0f10",
  "--brand-paper": "#ffffff",
  "--brand-orange": "#f5a623",
  "--brand-orange-hover": "#d98e12",
  "--brand-orange-light": "#ffb845",
  "--on-brand": "#1a1a1a",
};
const BRAND_HEX = new Set(Object.values(BRAND));
// 강조 역할 토큰이 테마별로 가져야 할 원색(계획 R2 표)
const ACCENT_ROLES = {
  light: { "--accent": "#0f0f10", "--accent-fill": "#f5a623", "--accent-fill-hover": "#d98e12", "--on-accent": "#1a1a1a", "--focus-ring": "#0f0f10" },
  dark: { "--accent": "#f5a623", "--accent-fill": "#f5a623", "--accent-fill-hover": "#d98e12", "--on-accent": "#1a1a1a", "--focus-ring": "#f5a623" },
};
const ALIASES = ["--gold", "--kicker"]; // 두 번째 강조색 제거: var(--accent) 별칭이어야 합니다
const NEUTRAL_HERO = ["--hero-from", "--hero-to", "--hero-accent"];
const OLD_ACCENTS = ["#e8703f", "#c5491a", "#c9a94c", "#947415", "#28d28b", "#20e6a0", "#0fb879", "#54d39f"];
// [글자·선, 바탕, 최소 대비] 본문 4.5:1, 컨트롤 경계·초점 3:1(계획 R2 수용 검사)
const PAIRS = [
  ...["--text", "--text-soft", "--muted", "--dim", "--accent"].flatMap((fg) => ["--bg", "--surface", "--card"].map((bg) => [fg, bg, 4.5])),
  ["--on-accent", "--accent-fill", 4.5],
  ["--on-accent", "--accent-fill-hover", 4.5],
  ["--text", "--accent-soft@--bg", 4.5],
  ["--text", "--accent-soft@--card", 4.5],
  ["--muted", "--accent-soft@--card", 4.5],
  ...["--border2", "--focus-ring"].flatMap((fg) => ["--bg", "--surface", "--card"].map((bg) => [fg, bg, 3])),
];

function themeTokens(rules, report) {
  const light = new Map();
  for (const rule of rules.filter((item) => item.prelude === ":root")) for (const [k, v] of cssDeclarations(rule.body)) light.set(k, v);
  const darkRule = rules.find((item) => item.prelude === ':root[data-theme="dark"]');
  if (!light.size) report.fail("theme-block", `${CSS}: 라이트 토큰(:root) 블록이 없습니다`);
  if (!darkRule) report.fail("theme-block", `${CSS}: 다크 토큰(:root[data-theme="dark"]) 블록이 없습니다`);
  const dark = new Map(light);
  for (const [k, v] of cssDeclarations(darkRule?.body ?? "")) dark.set(k, v);
  return { light, dark };
}

/** 토큰을 불투명 색으로 풀어 줍니다. '--a@--b'는 반투명 --a를 --b 위에 겹친 색입니다. 풀 수 없으면 null입니다. */
function colorOf(tokens, ref) {
  const [top, under] = ref.split("@");
  const color = parseHex(resolveToken(tokens, top) ?? "");
  if (!color) return null;
  if (!under) return color.a === 1 ? color : null;
  const base = parseHex(resolveToken(tokens, under) ?? "");
  return base && base.a === 1 ? blend(color, base) : null;
}

function checkTheme(name, tokens, report) {
  for (const [token, want] of Object.entries(BRAND)) {
    if ((tokens.get(token) ?? "").toLowerCase() !== want) report.fail("brand-primitive", `${name} ${token} = ${tokens.get(token)} — 기대 ${want}`);
  }
  for (const [token, want] of Object.entries(ACCENT_ROLES[name])) {
    const got = (resolveToken(tokens, token) ?? "").toLowerCase();
    if (got !== want) report.fail("accent-role", `${name} ${token} → ${got || "(풀리지 않음)"} — 기대 ${want}`);
    if (!BRAND_HEX.has(got)) report.fail("accent-role", `${name} ${token} → ${got} — 브랜드 원색이 아닙니다`);
  }
  const soft = parseHex(resolveToken(tokens, "--accent-soft") ?? "");
  if (!soft || soft.a === 1 || `#${[soft.r, soft.g, soft.b].map((c) => c.toString(16).padStart(2, "0")).join("")}` !== BRAND["--brand-orange"]) {
    report.fail("accent-role", `${name} --accent-soft = ${resolveToken(tokens, "--accent-soft")} — 데이지 주황의 반투명 틴트여야 합니다`);
  }
  for (const alias of ALIASES) if ((tokens.get(alias) ?? "").replace(/\s+/g, "") !== "var(--accent)") report.fail("accent-alias", `${name} ${alias} = ${tokens.get(alias)} — var(--accent) 별칭이어야 합니다`);
  for (const token of NEUTRAL_HERO) {
    const c = parseHex(resolveToken(tokens, token) ?? "");
    if (!c || Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b) > 16) report.fail("hero-neutral", `${name} ${token} = ${resolveToken(tokens, token)} — 히어로는 중립색이어야 합니다`);
  }
  let measured = 0;
  for (const [fg, bg, min] of PAIRS) {
    const a = colorOf(tokens, fg);
    const b = colorOf(tokens, bg);
    if (!a || !b) { report.fail("contrast", `${name} ${fg} / ${bg}: 색을 풀지 못해 대비를 잴 수 없습니다`); continue; }
    measured += 1;
    const ratio = contrast(a, b);
    if (ratio < min) report.fail("contrast", `${name} ${fg} / ${bg} = ${ratio.toFixed(2)}:1 — 기준 ${min}:1`);
  }
  return measured;
}

function checkOldAccents(root, report) {
  const pattern = new RegExp(`(${OLD_ACCENTS.join("|")})(?![0-9a-f])`, "gi");
  const files = [...listFiles(root, ["app"], [".css", ".ts", ".tsx"]), ...listFiles(root, ["lib"], [".ts"]).filter((rel) => rel.split("/").length === 2)];
  for (const rel of files) {
    readText(root, rel).split("\n").forEach((line, index) => {
      for (const match of line.matchAll(pattern)) report.fail("old-accent", `${rel}:${index + 1} 이전 강조색 ${match[1]} — 브랜드 토큰(var(--accent) 등)을 쓰십시오`);
    });
  }
  return files.length;
}

runGate(GATE, (opts) => {
  const report = createReporter(GATE);
  const { light, dark } = themeTokens(parseCssRules(readText(opts.root, CSS)), report);
  const measured = checkTheme("light", light, report) + checkTheme("dark", dark, report);
  const scanned = checkOldAccents(opts.root, report);
  return report.finish(`두 테마 강조 토큰이 브랜드 원색만 쓰고, 대비 ${measured}쌍이 기준을 넘고, 파일 ${scanned}개에 이전 강조색 hex가 없습니다.`);
});
