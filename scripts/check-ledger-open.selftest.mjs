#!/usr/bin/env node
// ledger.mjs verify 의 pending 2차 집계 자체시험. 실제 원장은 건드리지 않는다:
// ledger.mjs 를 임시 트리에 복사하고 그 트리의 docs/improvements.ledger.json 으로 돌린다.
// 종료: 0=전부 기대대로, 2=어긋남.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const T = fs.mkdtempSync(path.join(os.tmpdir(), "ledger-open-"));
fs.mkdirSync(path.join(T, "scripts"));
fs.mkdirSync(path.join(T, "docs"));
fs.copyFileSync(path.join(ROOT, "scripts", "ledger.mjs"), path.join(T, "scripts", "ledger.mjs"));

const entry = (id, date, status, kind = "manual") => ({
  id, date, status, source: "t", category: "t", request: `${id} request`, files: [], commit: null, evidence: { kind }, notes: "",
});
const run = (entries) => {
  fs.writeFileSync(path.join(T, "docs", "improvements.ledger.json"), JSON.stringify({ updated: "x", entries }));
  const r = spawnSync("node", [path.join(T, "scripts", "ledger.mjs"), "verify"], {
    encoding: "utf8", env: { ...process.env, LEDGER_TODAY: "2026-10-19" },
  });
  return { rc: r.status, out: (r.stdout || "") + (r.stderr || "") };
};

const cases = [
  ["T1 104일 pending 이 보인다", [entry("IMP-0010", "2026-07-07", "pending")], 0,
    ["WARN[ledger:stale-pending] IMP-0010 104일", "open 1 (oldest IMP-0010 104일, >30일 1건)"]],
  ["T2 30일 이하는 경고 없음", [entry("IMP-0001", "2026-10-01", "in_progress")], 0,
    ["open 1 (oldest IMP-0001 18일, >30일 0건)"], ["WARN[ledger:stale-pending]"]],
  ["T3 evidence 없는 applied 가 보인다", [entry("IMP-0016", "2026-07-10", "applied")], 0,
    ["evidence 없음 1건 (IMP-0016)"]],
  ["T4 pending 0 건", [], 0, ["open 0 (oldest —, >30일 0건)"]],
];
let fails = 0;
for (const [name, entries, wantRc, want, wantAbsent = []] of cases) {
  const { rc, out } = run(entries);
  const ok = rc === wantRc && want.every((t) => out.includes(t)) && wantAbsent.every((t) => !out.includes(t));
  console.log(`${ok ? "OK  " : "FAIL"} ${name}: rc=${rc}`);
  if (!ok) { fails++; console.log(out.replace(/^/gm, "     ")); }
}
fs.rmSync(T, { recursive: true, force: true });
console.log(`${fails ? "FAIL" : "PASS"}[ledger-open-selftest] ${cases.length - fails}/${cases.length}`);
process.exit(fails ? 2 : 0);
