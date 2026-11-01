#!/usr/bin/env node
// check-staged-editions.mjs 자체시험. 임시 git 저장소에 인덱스 상태를 만들고, 함정은 exit 2, 대조군은 exit 0이어야 합니다.
// git으로 저장소를 만들어야 해서 빌드 때는 돌리지 않습니다(run-all-gates.mjs RUN_SCOPED). 커밋 직전 검사를 고친 뒤 직접 실행합니다.
// 검사는 하위 폴더(lib/)에서 실행합니다. 2026-11-02 전에는 git ls-files가 실행 위치 기준 경로를 내서 모든 파일이 없다고 판정했습니다.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

const HERE = import.meta.dirname;
const write = (dir, rel, body) => {
  fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
  fs.writeFileSync(path.join(dir, rel), body);
};
const git = (dir, ...args) => execFileSync("git", ["-c", "user.name=selftest", "-c", "user.email=selftest@example.com", ...args], { cwd: dir, stdio: "pipe" });

function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "staged-editions-"));
  for (const f of ["check-staged-editions.mjs", "lib/ab-editions.mjs"]) write(dir, `scripts/${f}`, fs.readFileSync(path.join(HERE, f)));
  write(dir, "lib/ab/data.ts", 'import { a } from "./editions/2026-01a";\n');
  write(dir, "lib/ab/editions/2026-01a.ts", 'export const a = { image: "/source-media/x/a.webp" };\n');
  write(dir, "public/source-media/x/a.webp", "x");
  write(dir, "references/approved-editions.json", JSON.stringify({ editions: ["2026-01a"] }));
  git(dir, "init", "-q");
  git(dir, "add", "-A");
  git(dir, "commit", "-qm", "base");
  // 새 회차 2026-01b를 작업 트리에 준비합니다. 아래 시험마다 stage하는 파일만 다릅니다.
  write(dir, "lib/ab/data.ts", 'import { a } from "./editions/2026-01a";\nimport { b } from "./editions/2026-01b";\n');
  write(dir, "lib/ab/editions/2026-01b.ts", "export const b = { image: '/source-media/y/b.webp?v=2' };\n");
  write(dir, "public/source-media/y/b.webp", "x");
  write(dir, "references/approved-editions.json", JSON.stringify({ editions: ["2026-01a", "2026-01b"] }));
  return dir;
}

const ALL = ["lib/ab/data.ts", "lib/ab/editions/2026-01b.ts", "public/source-media/y/b.webp", "references/approved-editions.json"];
const cases = [
  ["대조군: 새 회차·승인 목록·이미지를 모두 stage(--expect 앞뒤 공백)", 0, ALL, ["--expect", " 2026-01b "]],
  ["함정: 승인 목록 파일을 stage하지 않음", 2, ALL.filter((f) => !f.startsWith("references/")), []],
  ["함정: 회차 파일을 stage하지 않음", 2, ALL.filter((f) => !f.includes("/editions/")), []],
  ["함정: 회차가 참조하는 이미지(작은따옴표·?v=)를 stage하지 않음", 2, ALL.filter((f) => !f.startsWith("public/")), []],
  ["함정: 새로 등록되는 회차가 승인받은 회차와 다름", 2, ALL, ["--expect", "2026-09z"]],
];

let bad = 0;
for (const [name, want, files, args] of cases) {
  const dir = fixture();
  git(dir, "add", "--", ...files);
  const r = spawnSync(process.execPath, [path.join(dir, "scripts/check-staged-editions.mjs"), ...args], { cwd: path.join(dir, "lib"), encoding: "utf8" });
  fs.rmSync(dir, { recursive: true, force: true });
  const ok = r.status === want;
  if (!ok) bad++;
  const why = ok ? "" : `\n      ${((r.stderr || r.stdout || "").trim().split("\n")[0] || "").slice(0, 160)}`;
  console.log(`  ${ok ? "✓" : "✗"} ${name} → exit ${r.status === null ? "crash" : r.status} (기대 ${want})${why}`);
}
const traps = cases.filter((c) => c[1] === 2).length;
if (bad) {
  console.error(`FAIL[staged-editions-selftest] ${bad}건이 기대와 다릅니다.`);
  process.exit(2);
}
console.log(`PASS[staged-editions-selftest] 함정 ${traps}개 exit 2, 대조군 ${cases.length - traps}개 exit 0`);
