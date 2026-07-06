#!/usr/bin/env node
// Build gate: improvement ledger의 applied/verified 항목 evidence를 실측한다.
// run-all-gates가 자동 발견. BUILD_GATES 등록 시 매 빌드 fail-closed 강제 —
// 한 번 "적용됨"으로 기록된 개선이 되돌려지면 build가 exit≠0으로 막는다.
// read-only(렌더/쓰기 없음). MD 갱신은 `node scripts/ledger.mjs render`로 명시 수행.
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const warn = process.argv.includes("--warn");
const r = spawnSync("node", [path.join(ROOT, "scripts", "ledger.mjs"), "verify", ...(warn ? ["--warn"] : [])], {
  cwd: ROOT,
  stdio: "inherit",
});
process.exit(warn ? 0 : r.status ?? 1);
