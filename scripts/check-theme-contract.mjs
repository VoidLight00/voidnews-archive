#!/usr/bin/env node
// check-theme-contract.mjs — 라이트·다크 테마 전환 계약 HARD 게이트(리뉴얼 계획 R6·6.5절, REQUIREMENTS R24)
//
// 왜: 이전 단일 토글은 type·aria-pressed가 없었고, 저장값이 없으면 운영체제와 무관하게 라이트,
// JavaScript가 꺼지면 다크였습니다. 두 버튼·눌림 상태·시스템 설정 추종·저장소 예외 처리·CSS 세 겹 선택자 중
// 하나만 빠져도 화면은 여전히 그려져 눈으로는 놓치기 쉬우므로 정적 계약으로 고정합니다.
// 실제 전환·새로고침·저장소 차단 동작은 브라우저 시험(계획 6.5절 10항목)이 따로 확인합니다.
//
// 확인: app/ThemeToggle.tsx 버튼 2개('라이트'·'다크')의 type="button"·aria-pressed, 저장 키와 허용값 검사,
//   저장소 접근의 try/catch, prefers-color-scheme 조회와 변경 추종 / app/layout.tsx 첫 화면 초기화 스크립트의
//   허용값 검사·시스템 설정·try/catch·<head> 주입 / app/globals.css 세 겹 선택자와 color-scheme, 다크 두 겹의 같은 값
// 사용: node scripts/check-theme-contract.mjs [--root <dir>]   (원본 검사만 있습니다. prebuild에서 돕니다.)
// 종료 코드: 0 통과 · 1 위반 · 2 입력 오류
import {
  createReporter, cssDeclarations, findFunction, jsxAttributes, jsxOpenings, parseCssRules, parseSource, readText,
  runGate, stringPieces, typescript, walkAst,
} from "./lib/renewal-gate-kit.mjs";

const GATE = "theme-contract";
const TOGGLE = "app/ThemeToggle.tsx";
const LAYOUT = "app/layout.tsx";
const CSS = "app/globals.css";
const STORAGE_KEY = "voidnews-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const OPTIONS = [["light", "라이트"], ["dark", "다크"]];

/** localStorage·sessionStorage 접근이 모두 try 블록 안에 있는지 확인하고, 접근 수를 돌려줍니다. */
function storageInsideTry(sourceFile, where, report) {
  const ts = typescript();
  let accesses = 0;
  walkAst(sourceFile, (node) => {
    if (!ts.isIdentifier(node) || !["localStorage", "sessionStorage"].includes(node.text)) return;
    accesses += 1;
    let guarded = false;
    for (let child = node, parent = node.parent; parent; child = parent, parent = parent.parent) {
      if (ts.isTryStatement(parent) && parent.tryBlock === child) { guarded = true; break; }
    }
    if (!guarded) report.fail("storage-try", `${where}:${sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1} ${node.text} 접근이 try/catch 밖에 있습니다`);
  });
  return accesses;
}

function optionObjects(sourceFile) {
  const ts = typescript();
  const found = [];
  walkAst(sourceFile, (node) => {
    if (!ts.isObjectLiteralExpression(node)) return;
    const props = Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).map((p) => [p.name.getText(), ts.isStringLiteral(p.initializer) ? p.initializer.text : null]));
    if (props.value && props.label) found.push(`${props.value}:${props.label}`);
  });
  return found;
}

function checkToggle(root, report) {
  const text = readText(root, TOGGLE);
  const source = parseSource(TOGGLE, text);
  const options = optionObjects(source);
  const wanted = OPTIONS.map(([value, label]) => `${value}:${label}`);
  if (options.join(",") !== wanted.join(",")) report.fail("buttons", `${TOGGLE}: 테마 선택지 ${options.join(",") || "없음"} — 기대 ${wanted.join(",")}(버튼 2개)`);
  const buttons = jsxOpenings(source).filter((item) => item.tag === "button");
  if (!buttons.length) report.fail("buttons", `${TOGGLE}: <button>이 없습니다`);
  for (const { node } of buttons) {
    const attrs = jsxAttributes(node);
    if (attrs.type?.text !== "button") report.fail("button-type", `${TOGGLE}: <button>에 type="button"이 없습니다`);
    if (!attrs["aria-pressed"]) report.fail("aria-pressed", `${TOGGLE}: <button>에 aria-pressed가 없습니다(선택 상태를 색으로만 알리면 안 됩니다)`);
  }
  const pieces = new Set(stringPieces(source).map((piece) => piece.text));
  if (!pieces.has(STORAGE_KEY)) report.fail("storage-key", `${TOGGLE}: 저장 키 '${STORAGE_KEY}'가 없습니다(기존 방문자 선택 유지)`);
  if (!pieces.has(DARK_QUERY) || !/\bmatchMedia\(/.test(text)) report.fail("prefers-color-scheme", `${TOGGLE}: matchMedia('${DARK_QUERY}') 조회가 없습니다`);
  if (!/addEventListener\(\s*["']change["']/.test(text)) report.fail("prefers-color-scheme", `${TOGGLE}: 시스템 설정 변경(change)을 따르지 않습니다`);
  const guard = findFunction(source, "isTheme")?.getText() ?? "";
  if (!/===\s*"light"/.test(guard) || !/===\s*"dark"/.test(guard)) report.fail("allowed-values", `${TOGGLE}: 저장값을 'light'·'dark'로만 받는 검사(isTheme)가 없습니다`);
  if (!storageInsideTry(source, TOGGLE, report)) report.fail("storage-try", `${TOGGLE}: 저장소 접근을 찾지 못했습니다`);
}

function checkInitScript(root, report) {
  const layout = parseSource(LAYOUT, readText(root, LAYOUT));
  const script = stringPieces(layout).find((piece) => piece.text.includes(STORAGE_KEY));
  if (!script) { report.fail("init-script", `${LAYOUT}: 저장 키를 읽는 첫 화면 초기화 스크립트가 없습니다`); return; }
  const where = `${LAYOUT}:${script.line} 초기화 스크립트`;
  const js = parseSource("theme-init.js", script.text);
  if (!script.text.includes(DARK_QUERY) || !/matchMedia\(/.test(script.text)) report.fail("init-script", `${where}: 저장값이 없을 때 prefers-color-scheme을 따르지 않습니다`);
  if (!/===\s*'light'\s*\|\|\s*\w+\s*===\s*'dark'/.test(script.text)) report.fail("init-script", `${where}: 저장값 허용 검사('light'·'dark')가 없습니다`);
  if (!/setAttribute\(\s*'data-theme'/.test(script.text)) report.fail("init-script", `${where}: data-theme을 정하지 않습니다`);
  if (!storageInsideTry(js, where, report)) report.fail("storage-try", `${where}: 저장소 접근을 찾지 못했습니다`);
  const head = jsxOpenings(layout).find((item) => item.tag === "head");
  const injected = head && jsxOpenings(head.node.parent).some((item) => item.tag === "script" && jsxAttributes(item.node).dangerouslySetInnerHTML);
  if (!injected) report.fail("init-script", `${LAYOUT}: 초기화 스크립트를 <head> 안에서 첫 화면 전에 실행하지 않습니다`);
}

function checkCssLayers(root, report) {
  const rules = parseCssRules(readText(root, CSS));
  const declarations = (rule) => (rule ? cssDeclarations(rule.body) : new Map());
  const light = rules.find((rule) => rule.prelude === ":root");
  const media = rules.find((rule) => /^@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)$/.test(rule.prelude));
  const system = media?.children?.find((rule) => rule.prelude === ':root:not([data-theme="light"])');
  const chosen = rules.find((rule) => rule.prelude === ':root[data-theme="dark"]');
  const layers = [[":root", light, "light"], ['@media (prefers-color-scheme: dark) :root:not([data-theme="light"])', system, "dark"], [':root[data-theme="dark"]', chosen, "dark"]];
  for (const [label, rule, scheme] of layers) {
    if (!rule) { report.fail("css-layers", `${CSS}: ${label} 블록이 없습니다`); continue; }
    if (declarations(rule).get("color-scheme") !== scheme) report.fail("css-layers", `${CSS}: ${label}에 color-scheme: ${scheme}이 없습니다`);
  }
  const a = declarations(system);
  const b = declarations(chosen);
  const differ = [...new Set([...a.keys(), ...b.keys()])].filter((key) => a.get(key) !== b.get(key));
  if (system && chosen && differ.length) report.fail("css-layers", `${CSS}: 다크 두 겹의 값이 다릅니다(${differ.slice(0, 6).join(", ")}) — 시스템 다크와 선택한 다크가 같아야 합니다`);
}

runGate(GATE, (opts) => {
  const report = createReporter(GATE);
  checkToggle(opts.root, report);
  checkInitScript(opts.root, report);
  checkCssLayers(opts.root, report);
  return report.finish("두 버튼(type·aria-pressed), 저장 키·허용값, 저장소 try/catch, prefers-color-scheme 추종, <head> 초기화, CSS 세 겹 선택자를 확인했습니다.");
});
