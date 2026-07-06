#!/usr/bin/env node
// Improvement Ledger — voidnews 개선/지시 이력의 SSoT(JSON) + 검증 + MD 렌더.
// "적용됨(applied/verified)" 항목은 evidence 체크를 달고, verify가 그것을 실제로
// 실행해 종료코드로 판정한다(선언≠증거). MD는 JSON에서 생성 — drift 없음.
//
// 사용:
//   node scripts/ledger.mjs add --source user-instruction --category seo \
//        --request "..." --status applied --files a.ts,b.ts --commit HEAD \
//        --evidence-count "grep -rc X app | ..." --op eq --value 0 --notes "..."
//   node scripts/ledger.mjs set-status IMP-0009 verified
//   node scripts/ledger.mjs verify [--warn]     # applied/verified 항목 evidence 실측
//   node scripts/ledger.mjs render              # docs/IMPROVEMENTS.md 재생성
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEDGER = path.join(ROOT, "docs", "improvements.ledger.json");
const MD = path.join(ROOT, "docs", "IMPROVEMENTS.md");

const STATUSES = ["pending", "in_progress", "applied", "verified", "wontfix"];
const load = () => JSON.parse(fs.readFileSync(LEDGER, "utf8"));
const save = (d) => fs.writeFileSync(LEDGER, JSON.stringify(d, null, 2) + "\n");

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const k = argv[i].slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
      a[k] = v;
    }
  }
  return a;
}

function nextId(entries) {
  const n = entries.reduce((m, e) => Math.max(m, Number(e.id.split("-")[1]) || 0), 0);
  return `IMP-${String(n + 1).padStart(4, "0")}`;
}

// evidence 실행: {kind:"exit0"|"count", cmd, op?, value?} → {pass, actual}
function runEvidence(ev) {
  if (!ev || ev.kind === "manual") return { pass: true, actual: "manual" };
  const r = spawnSync("sh", ["-c", ev.cmd], { cwd: ROOT, encoding: "utf8" });
  if (ev.kind === "exit0") return { pass: r.status === 0, actual: `exit ${r.status}` };
  if (ev.kind === "count") {
    const nums = (r.stdout || "").trim().split(/\s+/).filter((x) => /^-?\d+$/.test(x));
    const actual = Number(nums[nums.length - 1]);
    const ops = { eq: actual === ev.value, gte: actual >= ev.value, lte: actual <= ev.value };
    return { pass: !!ops[ev.op], actual };
  }
  return { pass: false, actual: "unknown-kind" };
}

function cmdAdd(args) {
  const d = load();
  const evidence = args["evidence-count"]
    ? { kind: "count", cmd: args["evidence-count"], op: args.op || "eq", value: Number(args.value) }
    : args["evidence-exit0"]
    ? { kind: "exit0", cmd: args["evidence-exit0"] }
    : { kind: "manual" };
  const entry = {
    id: nextId(d.entries),
    date: args.date || new Date().toISOString().slice(0, 10),
    source: args.source || "user-instruction",
    category: args.category || "misc",
    request: args.request || "",
    status: STATUSES.includes(args.status) ? args.status : "pending",
    files: args.files ? String(args.files).split(",") : [],
    commit: args.commit || null,
    evidence,
    notes: args.notes || "",
  };
  d.entries.push(entry);
  d.updated = entry.date;
  save(d);
  console.log(`added ${entry.id} (${entry.status})`);
}

function cmdSetStatus(id, status) {
  if (!STATUSES.includes(status)) { console.error(`bad status: ${status}`); process.exit(1); }
  const d = load();
  const e = d.entries.find((x) => x.id === id);
  if (!e) { console.error(`no such id: ${id}`); process.exit(1); }
  e.status = status;
  save(d);
  console.log(`${id} -> ${status}`);
}

function cmdVerify(warn) {
  const d = load();
  const checked = d.entries.filter((e) => ["applied", "verified"].includes(e.status) && e.evidence && e.evidence.kind !== "manual");
  let failed = 0;
  for (const e of checked) {
    const { pass, actual } = runEvidence(e.evidence);
    if (!pass) failed++;
    console.log(`  ${pass ? "✓" : "✗"} ${e.id} [${e.status}] ${e.category} — actual=${actual}${pass ? "" : "  REGRESSED: " + e.request.slice(0, 60)}`);
  }
  console.log(`[ledger] verified ${checked.length} applied/verified entries, ${failed} regressed`);
  if (failed && !warn) process.exit(2);
}

function cmdRender() {
  const d = load();
  const byStatus = (s) => d.entries.filter((e) => e.status === s);
  const row = (e) =>
    `| ${e.id} | ${e.date} | ${e.category} | ${e.request.replace(/\|/g, "\\|")} | ${e.files.join("<br>") || "—"} | ${e.commit || "—"} |`;
  const section = (title, s) => {
    const rows = byStatus(s);
    if (!rows.length) return "";
    return `\n## ${title} (${rows.length})\n\n| ID | 날짜 | 분류 | 요청/개선 | 파일 | 커밋 |\n|---|---|---|---|---|---|\n${rows.map(row).join("\n")}\n`;
  };
  const md =
    `# VoidNews 개선 이력 (Improvements Ledger)\n\n` +
    `> SSoT는 \`docs/improvements.ledger.json\`. 이 파일은 \`node scripts/ledger.mjs render\`로 자동 생성됨 — 직접 수정 금지.\n` +
    `> 마지막 갱신: ${d.updated} · 총 ${d.entries.length}건\n` +
    `>\n> \`applied\`/\`verified\` 항목은 evidence 체크를 달고 있으며 \`node scripts/ledger.mjs verify\`가 실측한다(선언≠증거).\n` +
    section("검증됨 (verified)", "verified") +
    section("적용됨 (applied)", "applied") +
    section("진행 중 (in_progress)", "in_progress") +
    section("대기 (pending)", "pending") +
    section("보류 (wontfix)", "wontfix");
  fs.mkdirSync(path.dirname(MD), { recursive: true });
  fs.writeFileSync(MD, md);
  console.log(`rendered ${MD} (${d.entries.length} entries)`);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === "add") cmdAdd(parseArgs(rest));
else if (cmd === "set-status") cmdSetStatus(rest[0], rest[1]);
else if (cmd === "verify") cmdVerify(rest.includes("--warn"));
else if (cmd === "render") cmdRender();
else { console.error("usage: ledger.mjs add|set-status|verify [--warn]|render"); process.exit(1); }
