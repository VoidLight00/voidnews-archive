#!/usr/bin/env node
// scripts/emit-weeks.mjs 자체시험. 실제 lib/weeks 는 건드리지 않는다:
// 생성기를 임시 트리에 복사하고(EMIT_WEEKS_ROOT) node_modules 만 링크한다.
// 함정: --check 가 쓰지 않음 · 쓰기 후 --check 멱등 · 미반영 카드 적발 · Partial 머리 주석 재생성과
// 사용자 주석 보존 · 게시된 글을 바꾸는 변형 생성기를 drift 감시가 잡음. 종료: 0=전부 기대대로, 2=어긋남.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = fs.readFileSync(path.join(ROOT, "scripts", "emit-weeks.mjs"), "utf8");
const T = fs.mkdtempSync(path.join(os.tmpdir(), "emit-weeks-"));
fs.mkdirSync(path.join(T, "lib", "weeks"), { recursive: true });
fs.mkdirSync(path.join(T, "scripts"));
fs.mkdirSync(path.join(T, "run"));
fs.writeFileSync(path.join(T, "package.json"), "{}");
fs.symlinkSync(path.join(ROOT, "node_modules"), path.join(T, "node_modules"));
fs.writeFileSync(path.join(T, "scripts", "emit-weeks.mjs"), SRC);
const WEEK = path.join(T, "lib", "weeks", "2026-w41.ts");

const card = (slug, date) => ({
  id: slug, slug, weekSlug: "2026-w41", company: "Acme", companyColor: "#000", date, title: `${slug} 제목`,
  deck: "d", summary: "s", content: "c", officialUrl: `https://acme.example/${slug}`, tags: ["t"], en: { title: "e" },
});
const setRun = (through, cards) =>
  fs.writeFileSync(path.join(T, "run", "03_normalized_items.json"), JSON.stringify({ collectedThrough: through, items: cards }));
const emit = (script, ...extra) => {
  const r = spawnSync("node", [path.join(T, "scripts", script), "--run", path.join(T, "run"), ...extra], {
    encoding: "utf8", env: { ...process.env, EMIT_WEEKS_ROOT: T },
  });
  return { rc: r.status, out: (r.stdout || "") + (r.stderr || "") };
};

const results = [];
const expect = (name, ok, out = "") => { results.push(ok); console.log(`${ok ? "OK  " : "FAIL"} ${name}`); if (!ok) console.log(out.replace(/^/gm, "     ")); };

setRun("2026-10-06", [card("a", "10/5 09:00")]);
let r = emit("emit-weeks.mjs", "--check");
expect("T1 --check: 파일 없음 → exit 2, 쓰기 0", r.rc === 2 && r.out.includes("file missing") && !fs.existsSync(WEEK), r.out);

r = emit("emit-weeks.mjs");
const head = () => fs.readFileSync(WEEK, "utf8").split("\n")[2];
expect("T2 쓰기 + Partial 머리 주석(10/7~11)", r.rc === 0 && head().startsWith("// Partial week: 2026-10-06까지") && head().includes("10/7~11은"), r.out + head());

r = emit("emit-weeks.mjs", "--check");
expect("T3 쓰기 직후 --check 멱등 → exit 0", r.rc === 0 && r.out.includes("PASS[emit-weeks:check]"), r.out);

setRun("2026-10-11", [card("a", "10/5 09:00"), card("b", "10/9 10:00")]);
r = emit("emit-weeks.mjs", "--check");
expect("T4 미반영 카드 1장 적발 → exit 2", r.rc === 2 && r.out.includes("+1 card(s) not yet emitted"), r.out);

r = emit("emit-weeks.mjs");
expect("T5 주차 완성 시 Partial 주석 → 전 구간 주석", r.rc === 0 && head() === "// 2026-10-05~11 전 구간. 표시 시각은 한국시간(KST)이며, 발행처가 날짜만 제공한 항목은 날짜만 표시합니다.", head());

fs.writeFileSync(WEEK, fs.readFileSync(WEEK, "utf8").replace(/^\/\/ 2026-10-05~11 전 구간\..*$/m, "// 사람이 쓴 설명 주석"));
r = emit("emit-weeks.mjs");
expect("T6 사람이 쓴 머리 주석은 보존", r.rc === 0 && head() === "// 사람이 쓴 설명 주석", head());

const MUT_FROM = ".sort((a, b) => dateKey(b.date) - dateKey(a.date)).map(ordered)";
if (SRC.split(MUT_FROM).length !== 2) {
  expect("T7 변형 생성기 만들기(치환 지점 1곳)", false, `치환 지점 ${SRC.split(MUT_FROM).length - 1}곳`);
} else {
  fs.writeFileSync(path.join(T, "scripts", "mutant.mjs"),
    SRC.replace(MUT_FROM, ".sort((a, b) => dateKey(b.date) - dateKey(a.date)).map((p) => { const { tags, ...rest } = ordered(p); return rest; })"));
  r = emit("mutant.mjs");
  expect("T7 게시된 글의 필드를 지우는 변형 생성기 → FAIL[drift]", r.rc === 2 && r.out.includes("FAIL[drift] 2026-w41"), r.out);
}

fs.rmSync(T, { recursive: true, force: true });
const pass = results.every(Boolean);
console.log(`${pass ? "PASS" : "FAIL"}[emit-weeks-selftest] ${results.filter(Boolean).length}/${results.length}`);
process.exit(pass ? 0 : 2);
