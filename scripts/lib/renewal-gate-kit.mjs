// renewal-gate-kit.mjs — 리뉴얼 게이트(계획 R1~R6) 공용 도구
//
// 왜: 게이트 6개가 같은 TS 로더, TSX 구문 트리, 빌드 HTML 해석기, 실패 보고 형식을 씁니다.
// 스크립트마다 따로 두면 해석 규칙이 갈라져 같은 HTML을 게이트마다 다르게 읽게 됩니다.
// npm 의존성을 늘리지 않으려고 HTML 해석기는 React 서버 렌더 출력(태그를 모두 닫고 속성 값을 따옴표로
// 감싸며 '<'·'>'를 이스케이프하는 형식)에 맞춘 작은 해석기로 둡니다.
//
// 종료 코드 계약(모든 리뉴얼 게이트 공통): 0 통과 · 1 위반 · 2 입력 오류(파일 없음, out/ 없음, 해석 실패)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const requireFromKit = createRequire(import.meta.url);

export class InputError extends Error {}

// ── 인자 ─────────────────────────────────────────────────────────────
// --root <dir>  원본을 읽을 저장소 루트(함정 시험이 임시 사본을 넘깁니다). 기본은 이 저장소입니다.
// --html        빌드 HTML(out/)을 검사합니다. 없으면 원본 검사입니다.
// --out <dir>   --html일 때 읽을 빌드 폴더. 기본은 <root>/out입니다.
// 그 밖의 '--이름 값' 쌍은 options에 그대로 담습니다(게이트별 추가 인자).
export function parseArgs(argv) {
  const opts = { root: REPO_ROOT, html: false, out: null, options: {} };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--html") { opts.html = true; continue; }
    if (!arg.startsWith("--") || i + 1 >= argv.length) throw new InputError(`알 수 없는 인자이거나 값이 없습니다: ${arg}`);
    const value = argv[++i];
    if (arg === "--root") opts.root = path.resolve(value);
    else if (arg === "--out") opts.out = path.resolve(value);
    else opts.options[arg.slice(2)] = value;
  }
  opts.out = opts.out ?? path.join(opts.root, "out");
  return opts;
}

// ── 보고 ─────────────────────────────────────────────────────────────
// FAIL[<게이트>:<코드>] 줄은 함정 자체시험(check-renewal-gates.selftest.mjs)이 읽는 기계용 표식입니다.
const SHOW_PER_CODE = 12;

export function createReporter(gate) {
  const failures = new Map();
  const notes = [];
  return {
    fail(code, detail) {
      if (!failures.has(code)) failures.set(code, []);
      failures.get(code).push(detail);
    },
    note(line) { notes.push(line); },
    get failed() { return failures.size > 0; },
    finish(passSummary) {
      for (const line of notes) console.log(`  ${line}`);
      if (!failures.size) {
        console.log(`PASS[${gate}] ${passSummary}`);
        return 0;
      }
      let total = 0;
      for (const [code, details] of failures) {
        total += details.length;
        for (const detail of details.slice(0, SHOW_PER_CODE)) console.error(`FAIL[${gate}:${code}] ${detail}`);
        if (details.length > SHOW_PER_CODE) console.error(`FAIL[${gate}:${code}] … 외 ${details.length - SHOW_PER_CODE}건`);
      }
      console.error(`FAIL[${gate}] 위반 ${total}건(${[...failures.keys()].join(", ")})`);
      return 1;
    },
  };
}

/**
 * 게이트 본문을 실행하고 종료 코드 계약(0·1·2)을 정합니다.
 * process.exit() 대신 exitCode를 씁니다. macOS에서 파이프 출력은 비동기라 바로 끝내면 FAIL 줄이 잘릴 수 있습니다.
 */
export function runGate(gate, main) {
  try {
    process.exitCode = main(parseArgs(process.argv.slice(2)));
  } catch (error) {
    const input = error instanceof InputError;
    console.error(`FAIL[${gate}:${input ? "input" : "crash"}] ${input ? error.message : error?.stack ?? error}`);
    process.exitCode = 2;
  }
}

// ── 파일 ─────────────────────────────────────────────────────────────
export function readText(root, rel) {
  const file = path.join(root, rel);
  try {
    return fs.readFileSync(file, "utf8");
  } catch (error) {
    throw new InputError(`파일을 읽지 못했습니다: ${rel} (${error.code ?? error.message})`);
  }
}

/** root 아래 dirs에서 확장자가 맞는 파일의 상대 경로를 정렬해 돌려줍니다. */
export function listFiles(root, dirs, extensions) {
  const out = [];
  for (const dir of dirs) {
    const base = path.join(root, dir);
    if (!fs.existsSync(base)) continue;
    for (const rel of fs.readdirSync(base, { recursive: true })) {
      if (extensions.some((ext) => rel.endsWith(ext))) out.push(path.join(dir, rel).split(path.sep).join("/"));
    }
  }
  return out.sort();
}

// ── TypeScript ───────────────────────────────────────────────────────
let tsModule = null;
export function typescript() {
  if (!tsModule) tsModule = requireFromKit("typescript");
  return tsModule;
}

/** lib/*.ts 같은 TS 모듈을 CommonJS로 바꿔 불러옵니다(타입 검사 없이 변환만 합니다). */
export function loadTsModule(file) {
  const ts = typescript();
  // Node 버전에 따라 .ts 처리기가 이미 있을 수 있어 매번 이 변환기로 덮어씁니다.
  requireFromKit.extensions[".ts"] = (module, filename) => {
    const source = fs.readFileSync(filename, "utf8");
    const options = { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true };
    module._compile(ts.transpileModule(source, { compilerOptions: options, fileName: filename }).outputText, filename);
  };
  try {
    return requireFromKit(file);
  } catch (error) {
    throw new InputError(`TS 모듈을 불러오지 못했습니다: ${file} (${error.message})`);
  }
}

export function parseSource(rel, text) {
  const ts = typescript();
  const kind = rel.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  return ts.createSourceFile(rel, text, ts.ScriptTarget.Latest, true, kind);
}

/** 구문 트리를 앞에서부터 모두 방문합니다. */
export function walkAst(node, visit) {
  const ts = typescript();
  const stack = [node];
  while (stack.length) {
    const current = stack.pop();
    visit(current);
    const children = [];
    ts.forEachChild(current, (child) => { children.push(child); });
    for (let i = children.length - 1; i >= 0; i -= 1) stack.push(children[i]);
  }
}

/** 이름으로 함수(선언 또는 화살표 함수를 담은 const)를 찾습니다. */
export function findFunction(sourceFile, name) {
  const ts = typescript();
  let found = null;
  walkAst(sourceFile, (node) => {
    if (found) return;
    if (ts.isFunctionDeclaration(node) && node.name?.text === name) found = node;
    else if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name && node.initializer) found = node.initializer;
  });
  return found;
}

/** JSX 여는 태그와 자기 닫는 태그를 이름과 함께 모읍니다. */
export function jsxOpenings(node) {
  const ts = typescript();
  const out = [];
  walkAst(node, (current) => {
    if (ts.isJsxOpeningElement(current) || ts.isJsxSelfClosingElement(current)) {
      out.push({ node: current, tag: current.tagName.getText() });
    }
  });
  return out;
}

/** JSX 속성을 이름 → { text(문자열 값), expression(중괄호 식 원문) }으로 돌려줍니다. 펼침 속성은 '...'에 모읍니다. */
export function jsxAttributes(opening) {
  const ts = typescript();
  const attrs = { "...": [] };
  for (const prop of opening.attributes.properties) {
    if (ts.isJsxSpreadAttribute(prop)) { attrs["..."].push(prop.expression.getText()); continue; }
    const name = prop.name.getText();
    const init = prop.initializer;
    if (!init) attrs[name] = { text: null, expression: "true" };
    else if (ts.isStringLiteral(init)) attrs[name] = { text: init.text, expression: null };
    else attrs[name] = { text: null, expression: init.expression ? init.expression.getText() : "" };
  }
  return attrs;
}

/** 소스에 적힌 문자열 조각(문자열, 템플릿 조각, JSX 글자)을 위치와 함께 모읍니다. 주석은 들어가지 않습니다. */
export function stringPieces(sourceFile) {
  const ts = typescript();
  const out = [];
  walkAst(sourceFile, (node) => {
    let text = null;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) text = node.text;
    else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) text = node.text;
    else if (ts.isJsxText(node)) text = node.text;
    if (text === null || !text.trim()) return;
    const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    out.push({ text, line: line + 1, kind: ts.SyntaxKind[node.kind] });
  });
  return out;
}

export function lineOf(sourceFile, node) {
  return sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
}

// ── CSS ──────────────────────────────────────────────────────────────
function matchBrace(css, open, end) {
  let depth = 0;
  for (let i = open; i < end; i += 1) {
    if (css[i] === "{") depth += 1;
    else if (css[i] === "}" && --depth === 0) return i;
  }
  return end;
}

function parseRuleList(css, start, end) {
  const rules = [];
  let i = start;
  while (i < end) {
    const open = css.indexOf("{", i);
    if (open < 0 || open >= end) break;
    const semi = css.indexOf(";", i);
    if (semi >= 0 && semi < open) { i = semi + 1; continue; } // @import 같은 문장
    const close = matchBrace(css, open, end);
    const prelude = css.slice(i, open).replace(/\s+/g, " ").trim();
    rules.push(/^@(media|supports|layer)\b/.test(prelude)
      ? { prelude, children: parseRuleList(css, open + 1, close) }
      : { prelude, body: css.slice(open + 1, close) });
    i = close + 1;
  }
  return rules;
}

/** CSS를 규칙 목록으로 바꿉니다. @media·@supports·@layer는 children에 안쪽 규칙을 담습니다. */
export function parseCssRules(text) {
  const css = text.replace(/\/\*[\s\S]*?\*\//g, "");
  return parseRuleList(css, 0, css.length);
}

/** 규칙 본문의 선언을 Map(이름 → 값)으로 돌려줍니다. 뒤에 나온 선언이 이깁니다. */
export function cssDeclarations(body) {
  const out = new Map();
  for (const part of body.split(";")) {
    const colon = part.indexOf(":");
    if (colon > 0 && !part.includes("{")) out.set(part.slice(0, colon).trim(), part.slice(colon + 1).trim());
  }
  return out;
}

/** var(--이름) 참조를 따라가 최종 값을 돌려줍니다. 순환하거나 없으면 null입니다. */
export function resolveToken(tokens, name, seen = new Set()) {
  if (seen.has(name) || !tokens.has(name)) return null;
  seen.add(name);
  const value = tokens.get(name);
  const ref = /^var\(\s*(--[\w-]+)\s*(?:,\s*(.+))?\)$/.exec(value);
  if (!ref) return value;
  return resolveToken(tokens, ref[1], seen) ?? ref[2]?.trim() ?? null;
}

// ── 색 ───────────────────────────────────────────────────────────────
/** #rgb·#rrggbb·#rrggbbaa를 {r,g,b,a}로 바꿉니다. 그 밖의 값은 null입니다. */
export function parseHex(value) {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(String(value).trim());
  if (!match) return null;
  let hex = match[1].toLowerCase();
  if (hex.length === 3) hex = hex.split("").map((ch) => ch + ch).join("");
  const channel = (index) => parseInt(hex.slice(index, index + 2), 16);
  return { r: channel(0), g: channel(2), b: channel(4), a: hex.length === 8 ? channel(6) / 255 : 1 };
}

function luminance({ r, g, b }) {
  const linear = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/** 반투명 색을 바탕색 위에 겹친 불투명 색입니다. */
export function blend(top, bottom) {
  const mix = (a, b) => Math.round(a * top.a + b * (1 - top.a));
  return { r: mix(top.r, bottom.r), g: mix(top.g, bottom.g), b: mix(top.b, bottom.b), a: 1 };
}

/** WCAG 2 대비 비율. */
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// ── 빌드 HTML ─────────────────────────────────────────────────────────
export function requireOut(outDir) {
  if (!fs.existsSync(outDir) || !fs.statSync(outDir).isDirectory()) {
    throw new InputError(`빌드 폴더가 없습니다: ${outDir} — npm run build 뒤에 실행하십시오(없으면 통과로 넘기지 않습니다).`);
  }
  const pages = listFiles(outDir, ["."], [".html"]).map((rel) => rel.replace(/^\.\//, ""));
  if (!pages.length) throw new InputError(`빌드 폴더에 HTML이 없습니다: ${outDir}`);
  return pages;
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
export function decodeEntities(text) {
  if (!text.includes("&")) return text;
  return text.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (whole, body) => {
    if (body[0] === "#") {
      const code = body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    return ENTITIES[body.toLowerCase()] ?? whole;
  });
}

const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const RAW_CLOSE = { script: /<\/script\s*>/gi, style: /<\/style\s*>/gi };
const OPEN_TAG = /<([a-zA-Z][a-zA-Z0-9:-]*)([^>]*?)(\/?)>/y;
const ATTRIBUTE = /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function parseAttributes(raw) {
  const attrs = {};
  for (const match of raw.matchAll(ATTRIBUTE)) {
    attrs[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attrs;
}

function closeElement(current, tag) {
  for (let node = current; node && node.parent; node = node.parent) {
    if (node.tag === tag) return node.parent;
  }
  return current; // 짝 없는 닫는 태그는 무시합니다.
}

/** HTML을 { tag, attrs, children, parent } 트리로 바꿉니다. script·style 내용과 주석은 버립니다. */
export function parseHtml(html) {
  const root = { tag: "#document", attrs: {}, children: [], parent: null };
  let current = root;
  let i = 0;
  const pushText = (text) => { if (text) current.children.push({ text: decodeEntities(text) }); };
  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt < 0) { pushText(html.slice(i)); break; }
    pushText(html.slice(i, lt));
    if (html.startsWith("<!--", lt)) {
      const end = html.indexOf("-->", lt + 4);
      i = end < 0 ? html.length : end + 3;
      continue;
    }
    const next = html[lt + 1];
    if (next === "!" || next === "?" || next === "/") {
      const end = html.indexOf(">", lt);
      if (next === "/") current = closeElement(current, html.slice(lt + 2, end < 0 ? html.length : end).trim().toLowerCase());
      i = end < 0 ? html.length : end + 1;
      continue;
    }
    OPEN_TAG.lastIndex = lt;
    const match = OPEN_TAG.exec(html);
    if (!match) { pushText("<"); i = lt + 1; continue; }
    const tag = match[1].toLowerCase();
    const node = { tag, attrs: parseAttributes(match[2]), children: [], parent: current };
    current.children.push(node);
    i = OPEN_TAG.lastIndex;
    if (RAW_CLOSE[tag]) {
      const close = RAW_CLOSE[tag];
      close.lastIndex = i;
      const found = close.exec(html);
      i = found ? found.index + found[0].length : html.length;
    } else if (!match[3] && !VOID_TAGS.has(tag)) {
      current = node;
    }
  }
  return root;
}

/** 앞에서부터 모든 요소를 방문합니다(재귀 없이). */
export function forEachElement(node, visit) {
  const stack = [...node.children].reverse();
  while (stack.length) {
    const current = stack.pop();
    if (!current.tag) continue;
    visit(current);
    for (let i = current.children.length - 1; i >= 0; i -= 1) stack.push(current.children[i]);
  }
}

export function findAll(node, predicate) {
  const out = [];
  forEachElement(node, (element) => { if (predicate(element)) out.push(element); });
  return out;
}

export const hasAttr = (element, name) => Object.hasOwn(element.attrs, name);
export const hasClass = (element, cls) => (element.attrs.class ?? "").split(/\s+/).includes(cls);

/** 요소 안의 글자 조각을 문서 순서대로 돌려줍니다. 주석으로 나뉜 조각은 따로 남습니다. */
export function textPieces(node) {
  const out = [];
  const stack = [...node.children].reverse();
  while (stack.length) {
    const current = stack.pop();
    if (current.text !== undefined) { out.push(current.text); continue; }
    for (let i = current.children.length - 1; i >= 0; i -= 1) stack.push(current.children[i]);
  }
  return out;
}

export const normalizeSpace = (text) => text.replace(/\s+/g, " ").trim();
export const innerText = (node) => normalizeSpace(textPieces(node).join(""));

export function readPage(outDir, rel) {
  try {
    return parseHtml(fs.readFileSync(path.join(outDir, rel), "utf8"));
  } catch (error) {
    throw new InputError(`빌드 HTML을 읽지 못했습니다: ${rel} (${error.code ?? error.message})`);
  }
}
