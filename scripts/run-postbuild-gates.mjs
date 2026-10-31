#!/usr/bin/env node
// run-postbuild-gates.mjs — 빌드 HTML(out/)을 보는 리뉴얼 게이트 실행기(계획 5.5절, REQUIREMENTS R19·R21~R23)
//
// 왜: prebuild 시점에는 out/이 없거나 이전 빌드 결과라서, 화면 결과를 보는 게이트는 next build 뒤에 돌아야 합니다.
// package.json postbuild는 기존 check-render-leaks.mjs 다음에 이 실행기를 부릅니다. 기존 검사와 달리 out/이 없으면
// 통과로 넘기지 않고 실패합니다. 게이트는 각자 별도 프로세스로 돌고, 하나라도 0이 아니면(충돌 포함) 빌드를 막습니다.
// run-all-gates.mjs의 RUN_SCOPED에 이 파일 이름을 적어 prebuild 실행 대상이 아님을 밝힙니다.
//
// 사용: node scripts/run-postbuild-gates.mjs [--out <dir>]
// 종료 코드: 0 통과 · 1 게이트 실패 또는 out/ 없음
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPTS = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPTS, "..");

/** 빌드 HTML 모드(--html)가 있는 리뉴얼 게이트. 함정 설정(fixtures/renewal-traps/manifest.json htmlChecks)과 같아야 합니다. */
export const POSTBUILD_GATES = [
  "check-owner-links.mjs",
  "check-ai-author-label.mjs",
  "check-newsletter-consent.mjs",
  "check-official-labels.mjs",
];

function outDir(argv) {
  const index = argv.indexOf("--out");
  return index >= 0 && argv[index + 1] ? path.resolve(argv[index + 1]) : path.join(ROOT, "out");
}

function main(argv) {
  const out = outDir(argv);
  const pages = fs.existsSync(out) ? fs.readdirSync(out, { recursive: true }).filter((rel) => rel.endsWith(".html")) : [];
  if (!pages.length) {
    const shown = out.startsWith(`${ROOT}${path.sep}`) ? path.relative(ROOT, out) : out;
    console.error(`FAIL[postbuild:out-missing] ${shown}에 빌드 HTML이 없습니다 — next build 뒤에 실행하십시오.`);
    return 1;
  }
  const results = POSTBUILD_GATES.map((gate) => {
    const run = spawnSync(process.execPath, [path.join(SCRIPTS, gate), "--html", "--out", out], { cwd: ROOT, stdio: "inherit" });
    return [gate, run.status === 0 ? "PASS" : `FAIL exit ${run.status ?? "crash"}`];
  });
  console.log(`\n[run-postbuild-gates] 빌드 HTML ${pages.length}개:`);
  for (const [gate, status] of results) console.log(`  ${status === "PASS" ? "✓" : "✗"} ${gate}: ${status}`);
  const failed = results.filter(([, status]) => status !== "PASS").length;
  if (failed) {
    console.error(`\n[run-postbuild-gates] ${failed}개 게이트 실패 — 빌드를 막습니다.`);
    return 1;
  }
  console.log(`\n[run-postbuild-gates] 리뉴얼 화면 게이트 ${POSTBUILD_GATES.length}개 통과`);
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exitCode = main(process.argv.slice(2));
