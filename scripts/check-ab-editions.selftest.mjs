#!/usr/bin/env node
// check-ab-editions.mjs 자체시험(빌드마다 실행). 함정은 exit 2, 대조군은 exit 0이어야 합니다.
// 함정이 통과하면 게이트가 사고를 못 막는 상태이므로 이 시험이 빌드를 실패시킵니다.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const GATE = path.join(import.meta.dirname, "check-ab-editions.mjs");
const write = (dir, rel, body) => {
  fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
  fs.writeFileSync(path.join(dir, rel), body);
};
const approve = (list) => (dir) => write(dir, "references/approved-editions.json", JSON.stringify({ editions: list }));
const remove = (rel) => (dir) => fs.rmSync(path.join(dir, rel));

function fixture(mutate) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ab-editions-"));
  write(dir, "lib/ab/data.ts", 'import { a } from "./editions/2026-01a";\nimport { b } from "./editions/2026-01b";\n');
  write(dir, "lib/ab/editions/2026-01a.ts", 'export const a = { image: "/source-media/x/a.webp" };\n');
  write(dir, "lib/ab/editions/2026-01b.ts", 'export const b = { video: "/threads-assets/y/clip%2001.mp4" };\n');
  write(dir, "public/source-media/x/a.webp", "x");
  write(dir, "public/threads-assets/y/clip 01.mp4", "x");
  approve(["2026-01a", "2026-01b"])(dir);
  mutate(dir);
  return dir;
}

const cases = [
  ["대조군: 등록 회차 모두 승인, 파일 모두 있음", 0, () => {}, ""],
  ["함정: 승인 목록에 없는 회차 등록(10a 사고)", 2, approve(["2026-01a"]), ""],
  ["대조군: 같은 회차를 초안으로 지정한 로컬 QA 빌드", 0, approve(["2026-01a"]), "2026-01b"],
  ["함정: 다른 회차만 초안으로 지정", 2, approve(["2026-01a"]), "2026-09z"],
  ["함정: 회차가 참조하는 영상이 없음(mp4 삭제)", 2, remove("public/threads-assets/y/clip 01.mp4"), ""],
  ["함정: 회차가 참조하는 이미지가 없음", 2, remove("public/source-media/x/a.webp"), ""],
  ["함정: 등록된 회차 파일이 없음", 2, remove("lib/ab/editions/2026-01b.ts"), ""],
  ["함정: 승인 목록 파일이 깨짐", 2, (dir) => write(dir, "references/approved-editions.json", "{"), ""],
];

let bad = 0;
for (const [name, want, mutate, drafts] of cases) {
  const dir = fixture(mutate);
  const r = spawnSync(process.execPath, [GATE, "--root", dir], {
    env: { ...process.env, VN_AB_DRAFT_EDITIONS: drafts },
    encoding: "utf8",
  });
  fs.rmSync(dir, { recursive: true, force: true });
  const ok = r.status === want;
  if (!ok) bad++;
  console.log(`  ${ok ? "✓" : "✗"} ${name} → exit ${r.status === null ? "crash" : r.status} (기대 ${want})`);
}
const traps = cases.filter((c) => c[1] === 2).length;
if (bad) {
  console.error(`FAIL[ab-editions-selftest] ${bad}건이 기대와 다릅니다.`);
  process.exit(2);
}
console.log(`PASS[ab-editions-selftest] 함정 ${traps}개 exit 2, 대조군 ${cases.length - traps}개 exit 0`);
