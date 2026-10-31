#!/usr/bin/env node
// check-renewal-gates.selftest.mjs — 리뉴얼 게이트 함정 자체시험(계획 5.5절·6.2절, REQUIREMENTS R19~R24)
//
// 왜: 게이트가 '측정 없이 통과'하면 위반을 들고도 빌드가 지나갑니다(FAILURE_LOG VN-GATE-04와 같은 함정).
// 함정마다 저장소 사본이나 기준 HTML 사이트를 한 곳만 고친 뒤 해당 게이트를 별도 프로세스로 실행해,
// exit 1과 기대한 FAIL[게이트:코드] 표식이 나오는지 확인합니다. 고치지 않은 사본(대조군)은 exit 0이어야
// 하므로, 함정이 '사본이 깨져서' 실패한 것이 아니라 고친 한 곳 때문에 실패했다는 것도 함께 증명합니다.
// 함정이 exit 1이 아니면 게이트 자체를 실패로 보고 빌드를 막습니다(계획 5.5절).
//
// 설정: scripts/fixtures/renewal-traps/manifest.json, 함정: scripts/fixtures/renewal-traps/traps/*.json(자동 발견)
// 종료 코드: 0 통과 · 1 함정 미검출·대조군 실패·낡은 함정 · 2 설정 오류
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { REPO_ROOT } from "./lib/renewal-gate-kit.mjs";
import { POSTBUILD_GATES } from "./run-postbuild-gates.mjs";

const GATE = "renewal-selftest";
const DIR = path.join(REPO_ROOT, "scripts/fixtures/renewal-traps");
const PARALLEL = Math.max(1, Math.min(4, os.availableParallelism?.() ?? 2));
const TIMEOUT_MS = 120_000;

class SetupError extends Error {}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    throw new SetupError(`${path.relative(REPO_ROOT, file)}을 읽지 못했습니다 (${error.message})`);
  }
}

function loadTraps(manifest) {
  const dir = path.join(DIR, "traps");
  const traps = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort().map((name) => readJson(path.join(dir, name)));
  for (const trap of traps) {
    const ok = typeof trap.id === "string" && manifest.checks.includes(trap.check) && ["source", "html"].includes(trap.mode)
      && Array.isArray(trap.mutate) && trap.mutate.length > 0 && /^FAIL\[[a-z-]+:[a-z-]+\]$/.test(trap.expect ?? "");
    if (!ok) throw new SetupError(`함정 ${trap.id ?? "(id 없음)"}의 형식이 계약과 다릅니다(check·mode·mutate·expect)`);
    if (trap.mode === "html" && !manifest.htmlChecks.includes(trap.check)) throw new SetupError(`함정 ${trap.id}: ${trap.check}에는 빌드 검사가 없습니다`);
  }
  if (new Set(traps.map((trap) => trap.id)).size !== traps.length) throw new SetupError("함정 id가 겹칩니다");
  return traps;
}

/**
 * 게이트마다 함정이 1개 이상, 빌드 검사가 있는 게이트는 빌드 함정도 1개 이상 있어야 합니다.
 * postbuild 실행기의 게이트 목록과 함정 설정의 htmlChecks가 어긋나면 한쪽만 시험하게 되므로 실패로 봅니다.
 */
function coverageProblems(manifest, traps) {
  const problems = [];
  if ([...POSTBUILD_GATES].sort().join(",") !== [...manifest.htmlChecks].sort().join(",")) {
    problems.push(`run-postbuild-gates.mjs 목록(${POSTBUILD_GATES.join(", ")})과 manifest.json htmlChecks가 다릅니다`);
  }
  for (const check of manifest.checks) if (!traps.some((trap) => trap.check === check)) problems.push(`${check}에 함정이 없습니다`);
  for (const check of manifest.htmlChecks) if (!traps.some((trap) => trap.check === check && trap.mode === "html")) problems.push(`${check}에 빌드 HTML 함정이 없습니다`);
  return problems;
}

/** 원본 함정용 사본: app/ 전체와 lib/ 최상위 파일(데이터 폴더 lib/weeks·lib/ab는 넣지 않습니다). */
function prepareBase(mode, manifest, dest) {
  if (mode === "html") {
    fs.cpSync(path.join(DIR, manifest.htmlSite), dest, { recursive: true });
    return;
  }
  fs.cpSync(path.join(REPO_ROOT, "app"), path.join(dest, "app"), { recursive: true });
  fs.mkdirSync(path.join(dest, "lib"), { recursive: true });
  for (const entry of fs.readdirSync(path.join(REPO_ROOT, "lib"), { withFileTypes: true })) {
    if (entry.isFile()) fs.copyFileSync(path.join(REPO_ROOT, "lib", entry.name), path.join(dest, "lib", entry.name));
  }
}

/** 고칠 문자열이 대상 파일에 정확히 1번 있어야 합니다. 아니면 함정이 낡은 것입니다. */
function mutate(base, edits) {
  for (const edit of edits) {
    const file = path.join(base, edit.file);
    const text = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
    const count = text.split(edit.find).length - 1;
    if (count !== 1) return `${edit.file}에서 고칠 문자열이 ${count}번 나옵니다(1번이어야 합니다) — 원본이 바뀌었으면 함정을 함께 고치십시오`;
    fs.writeFileSync(file, text.replace(edit.find, () => edit.replace));
  }
  return null;
}

function argsFor(job, manifest, base) {
  if (job.mode === "source") return ["--root", base];
  const extra = (manifest.htmlArgs[job.check] ?? []).map((arg) => arg.replaceAll("{site}", base));
  return ["--html", "--out", path.join(base, "out"), ...extra];
}

function runNode(script, args) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(REPO_ROOT, "scripts", script), ...args], { cwd: REPO_ROOT, stdio: ["ignore", "pipe", "pipe"] });
    const chunks = [];
    const timer = setTimeout(() => child.kill("SIGKILL"), TIMEOUT_MS);
    child.stdout.on("data", (chunk) => chunks.push(chunk));
    child.stderr.on("data", (chunk) => chunks.push(chunk));
    child.on("error", (error) => { clearTimeout(timer); resolve({ code: null, output: String(error) }); });
    child.on("close", (code) => { clearTimeout(timer); resolve({ code, output: Buffer.concat(chunks).toString("utf8") }); });
  });
}

async function runJob(job, manifest) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), "vn-renewal-trap-"));
  try {
    prepareBase(job.mode, manifest, base);
    const stale = job.mutate ? mutate(base, job.mutate) : null;
    if (stale) return { ...job, ok: false, detail: `낡은 함정: ${stale}` };
    const { code, output } = await runNode(job.check, argsFor(job, manifest, base));
    const ok = code === job.exit && (!job.expect || output.includes(job.expect));
    const firstFail = output.split("\n").find((line) => line.startsWith("FAIL[")) ?? "";
    return { ...job, ok, code, detail: ok ? job.expect ?? "PASS" : `exit ${code}(기대 ${job.exit}) ${job.expect ? `· ${job.expect} ${output.includes(job.expect) ? "있음" : "없음"}` : ""} · ${firstFail.slice(0, 160)}` };
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
}

async function runPool(jobs, manifest) {
  const results = new Array(jobs.length);
  let next = 0;
  const worker = async () => {
    while (next < jobs.length) {
      const index = next++;
      results[index] = await runJob(jobs[index], manifest);
    }
  };
  await Promise.all(Array.from({ length: Math.min(PARALLEL, jobs.length) }, worker));
  return results;
}

async function main() {
  const manifest = readJson(path.join(DIR, "manifest.json"));
  const traps = loadTraps(manifest);
  const coverage = coverageProblems(manifest, traps);
  const controls = [
    ...manifest.checks.map((check) => ({ id: `control-source:${check}`, check, mode: "source", exit: 0 })),
    ...manifest.htmlChecks.map((check) => ({ id: `control-html:${check}`, check, mode: "html", exit: 0 })),
  ];
  const results = await runPool([...controls, ...traps.map((trap) => ({ ...trap, exit: 1 }))], manifest);
  for (const result of results) console.log(`  ${result.ok ? "✓" : "✗"} ${result.id} → exit ${result.code ?? "-"} ${result.detail}`);
  for (const problem of coverage) console.error(`FAIL[${GATE}:coverage] ${problem}`);
  const failed = results.filter((result) => !result.ok);
  for (const result of failed) console.error(`FAIL[${GATE}:${result.exit === 0 ? "control" : "trap"}] ${result.id}: ${result.detail}`);
  if (failed.length || coverage.length) {
    console.error(`FAIL[${GATE}] 대조군·함정 ${results.length}개 중 ${failed.length}개 실패, 함정 누락 ${coverage.length}건`);
    return 1;
  }
  console.log(`PASS[${GATE}] 대조군 ${controls.length}개 exit 0, 함정 ${traps.length}개 모두 exit 1과 기대 표식(게이트 ${manifest.checks.length}개)`);
  return 0;
}

main().then((code) => { process.exitCode = code; }, (error) => {
  console.error(`FAIL[${GATE}:${error instanceof SetupError ? "setup" : "crash"}] ${error?.stack ?? error}`);
  process.exitCode = 2;
});
