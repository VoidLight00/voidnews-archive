#!/usr/bin/env node
// check-horizontal-accent.mjs — 컬러 가로 accent line 금지 HARD 게이트
//
// 왜: 카드·섹션 위아래에 컬러 가로 막대를 두는 건 좌측 세로 스트라이프와 같은
// 부류의 AI 티다. 2026-08-13 AB VIP 카드에서 --gold 3px 가로줄로 재발했고, 그때는
// 산문 규칙만 있어서 컴포넌트를 새로 만들 때마다 되살아났다.
// 2026-11-01 리뉴얼 검토에서 2px 기준만 보던 이 게이트가 1px 회사색 선, hover 때
// border-bottom-color만 바꾸는 선, ::after로 그린 2px 막대를 놓친 것이 드러나 규칙을 넓혔다
// (사용자 규칙: 색 있는 장식 가로선은 굵기와 관계없이 금지).
//
// 캐논 게이트(~/.claude/qa-canon/no_horizontal_accent_gate.sh)와 같은 목적의 규칙을
// 리포 안에 자체 구현한다. 캐논을 shell out 하면 Vercel 빌더에 그 경로가 없어
// exit 127 로 배포가 막힌다(FAILURE_LOG VN-CI-01 과 같은 함정).
//
// 차단(FAIL[horizontal-accent:코드]):
//   side-border  border-top/bottom(·block-start/end) 단축 속성의 색이 강조 계열(굵기 무관, 1px 포함)
//   side-color   border-top/bottom-color 로 강조색을 칠하는 경우(hover 전환 포함)
//   pseudo-bar   ::before/::after 의 높이 8px 이하 막대 배경이 강조 계열
//   tailwind     border-b-2/4/8 · border-t-* 와 amber·yellow·gold·accent 유틸 조합
//   double-rule  색과 관계없이 double 테두리(신문형 이중선, 사용자 규칙이 이름으로 금지)
// 강조 계열: var(--gold|accent|accent-fill|kicker|brand-orange*|pill-color), 템플릿 변수
//   ${…accent…}·${…color…}, JS 값의 따옴표 밖 맨 변수(color·company.color 등), 채도가 있는 hex·rgb(채널 차이 24 이상).
// 허용: 무채색 hairline(--rule, --border, --border2, 회색 hex), transparent, hr, accent-color,
//   text-decoration 밑줄, 모든 변을 감싸는 border 단축 속성(알약·칩 외곽선).
// 속성 값만 잘라 판정하고, JS 삼항식처럼 값이 다음 줄로 이어지면 최대 4줄을 이어 읽는다.
//
// 사용: node scripts/check-horizontal-accent.mjs [--root <dir>]
// exit 0 = 통과, 1 = 위반
import fs from "node:fs";
import path from "node:path";

const GATE = "horizontal-accent";
const argRoot = process.argv.indexOf("--root");
const ROOT = argRoot >= 0 && process.argv[argRoot + 1]
  ? path.resolve(process.argv[argRoot + 1])
  : path.resolve(import.meta.dirname, "..");
const SCAN = ["app", "components", "lib"].map((d) => path.join(ROOT, d)).filter((d) => fs.existsSync(d));
const EXT = new Set([".tsx", ".ts", ".jsx", ".css"]);
const SKIP = new Set(["node_modules", ".next", "_workspace", ".git"]);

const ACCENT_VAR = /var\(--(gold|accent|accent-fill(-hover)?|kicker|brand-orange(-[a-z]+)?|pill-color)[,)]|\$\{[a-zA-Z.]*([aA]ccent|[cC]olor)[a-zA-Z]*\}/;
const HEX = /#([0-9a-fA-F]{3,8})\b/g;
const RGB = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/g;
const SIDE_BORDER = /border(-(top|bottom|block-start|block-end|block)|Top|Bottom|Block(Start|End)?)\s*:/;
const SIDE_COLOR = /border(-(top|bottom|block-start|block-end)-color|(Top|Bottom|Block(Start|End)?)Color)\s*:/;
const TW_BORDER = /border-(b|t)-(2|4|8)(?![0-9])/;
const DOUBLE = /border[\w-]*\s*:[^;]*\bdouble\b|\bborder-double\b/;
const TW_ACCENT = /(amber|yellow)-\d|gold|accent/;

const spread = (channels) => Math.max(...channels) - Math.min(...channels);
function hasChroma(text) {
  for (const m of text.matchAll(HEX)) {
    let h = m[1];
    if (h.length <= 4) h = [...h.slice(0, 3)].map((c) => c + c).join("");
    if (spread([0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))) >= 24) return true;
  }
  for (const m of text.matchAll(RGB)) if (spread(m.slice(1, 4).map(Number)) >= 24) return true;
  return false;
}
const isAccent = (text) => ACCENT_VAR.test(text) || hasChroma(text);
// JS 스타일 객체에서는 따옴표 밖의 맨 변수(color, company.color, accentColor)도 강조 계열로 본다.
// 리뉴얼 전 발표 페이지의 borderBottomColor: color 가 템플릿 문자열이 아니어서 빠져나갔다.
const COLOR_IDENT = /\b[\w$.]*(?:[cC]olor|[aA]ccent)\w*/;
const isAccentValue = (value, js) => isAccent(value) || (js && COLOR_IDENT.test(value.replace(/"[^"]*"|'[^']*'|`[^`]*`/g, "")));

/** 값이 다음 줄로 이어지는 경우(줄이 ?·:·(·&&·||·+ 로 끝나거나 다음 줄이 ?·: 로 시작)만 최대 4줄을 이어 붙인다. */
function statement(lines, i) {
  let text = lines[i];
  for (let k = 1; k <= 4 && i + k < lines.length; k++) {
    const next = lines[i + k].trim();
    if (!/([?:(+]|&&|\|\|)$/.test(text.trimEnd()) && !/^[?:]/.test(next)) break;
    text += ` ${next}`;
  }
  return text;
}

/** 속성 이름 뒤의 값만 잘라 낸다. 따옴표 안은 그대로 두고, 바깥의 쉼표·세미콜론·닫는 괄호에서 멈춘다. */
function valueAfter(text, re) {
  const m = re.exec(text);
  if (!m) return "";
  let depth = 0;
  let quote = null;
  let out = "";
  for (const ch of text.slice(m.index + m[0].length)) {
    if (quote) {
      out += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    else if (ch === "(" || ch === "{") depth++;
    else if (ch === ")" || ch === "}") {
      if (depth === 0) break;
      depth--;
    } else if ((ch === "," || ch === ";") && depth === 0) break;
    out += ch;
  }
  return out;
}

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(path.extname(e.name))) yield p;
  }
}

const hits = [];
let files = 0;
const hit = (code, rel, line, text) => hits.push(`FAIL[${GATE}:${code}] ${rel}:${line}: ${text.trim().slice(0, 110)}`);

for (const root of SCAN) {
  for (const file of walk(root)) {
    files++;
    const rel = path.relative(ROOT, file);
    const src = fs.readFileSync(file, "utf8");
    const lines = src.split("\n");
    const js = !file.endsWith(".css");
    lines.forEach((line, i) => {
      if (SIDE_COLOR.test(line) && isAccentValue(valueAfter(statement(lines, i), SIDE_COLOR), js)) return hit("side-color", rel, i + 1, line);
      if (SIDE_BORDER.test(line) && isAccentValue(valueAfter(statement(lines, i), SIDE_BORDER), js)) return hit("side-border", rel, i + 1, line);
      if (DOUBLE.test(line)) return hit("double-rule", rel, i + 1, line);
      if (TW_BORDER.test(line) && TW_ACCENT.test(line)) hit("tailwind", rel, i + 1, line);
    });
    if (!file.endsWith(".css")) continue;
    for (const m of src.matchAll(/([^{};]*::?(before|after)[^{};]*)\{([^}]*)\}/g)) {
      const body = m[3];
      const height = body.match(/(^|[;\s])(height|block-size)\s*:\s*(\d+(\.\d+)?)px/);
      const background = body.match(/background(-color)?\s*:[^;]*/);
      if (height && Number(height[3]) <= 8 && background && isAccent(background[0])) {
        const selector = m[1].split("\n").filter((l) => /::?(before|after)/.test(l)).pop() ?? m[1];
        const line = src.slice(0, m.index + m[1].lastIndexOf(selector.trim())).split("\n").length;
        hit("pseudo-bar", rel, line, selector);
      }
    }
  }
}

if (hits.length) {
  for (const h of hits) console.error(h);
  console.error(`FAIL[${GATE}] 컬러 가로 accent line ${hits.length}건 (스캔 ${files}파일)`);
  console.error("  → 선을 지우거나 무채색 1px hairline(var(--border)/var(--border2))으로 바꾸고, 강조는 점·라벨·배경 틴트로 표현하십시오.");
  process.exit(1);
}
console.log(`PASS[${GATE}] 컬러 가로 accent line 0건 (${files} files scanned)`);
