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
const BASE_DATA = 'import { a } from "./editions/2026-01a";\nimport { b } from "./editions/2026-01b";\n';
const edition = (body) => (dir) => write(dir, "lib/ab/editions/2026-01a.ts", `export const a = ${body};\n`);
const register = (line) => (dir) => write(dir, "lib/ab/data.ts", BASE_DATA + line + "\n");

function fixture(mutate) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ab-editions-"));
  write(dir, "lib/ab/data.ts", BASE_DATA);
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
  // 2026-11-02 검토 추가: 대소문자·따옴표·쿼리·인코딩·주석·@/ 경로·호스팅 빌드의 초안 값
  ["함정: 대소문자만 다른 이미지 참조(macOS는 통과, Vercel은 실패)", 2, edition('{ image: "/source-media/x/A.webp" }'), ""],
  ["함정: 작은따옴표와 ?v= 쿼리로 참조한 이미지가 없음", 2, edition("{ image: '/source-media/x/none.webp?v=2' }"), ""],
  ["대조군: %2B로 인코딩한 경로와 다른 사이트(//) 이미지", 0, (dir) => {
    edition('{ image: "/source-media/x/C%2B%2B.webp", cdn: "//cdn.example.com/x.png" }')(dir);
    write(dir, "public/source-media/x/C++.webp", "x");
  }, ""],
  ["대조군: 주석 처리한 미승인 회차 import", 0, register('// import { z } from "./editions/2026-09z";'), ""],
  ["함정: @/ 경로로 등록한 미승인 회차", 2, (dir) => {
    register('import { z } from "@/lib/ab/editions/2026-09z";')(dir);
    write(dir, "lib/ab/editions/2026-09z.ts", "export const z = {};\n");
  }, ""],
  ["함정: Vercel 빌드에 초안 값이 설정됨", 2, approve(["2026-01a"]), "2026-01b", { VERCEL: "1" }],
];

let bad = 0;
for (const [name, want, mutate, drafts, hostEnv = {}] of cases) {
  const dir = fixture(mutate);
  // 이 자체시험은 Vercel 빌드에서도 돌므로 VERCEL·CI를 지우고 시험마다 명시합니다. 그대로 물려받으면 초안 대조군이 exit 2가 됩니다.
  const { VERCEL, CI, ...env } = process.env;
  const r = spawnSync(process.execPath, [GATE, "--root", dir], {
    env: { ...env, ...hostEnv, VN_AB_DRAFT_EDITIONS: drafts },
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
