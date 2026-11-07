#!/usr/bin/env node
// check-daily-issues.selftest.mjs — 데일리 브리핑 게이트가 '측정 없이 통과'하지 않는지 매 빌드 증명합니다(R30).
// 대조군 2개(정상 호, 빈 폴더)는 exit 0, 함정 6개는 exit 1이어야 합니다.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const GATE = path.join(path.dirname(fileURLToPath(import.meta.url)), "check-daily-issues.mjs");
const good = () => ({
  edition: "daily",
  date: "2026-11-06",
  author: { name: "VoidNews AI", kind: "ai" },
  items: [
    {
      headline: "구글, Gemini Omni 1.2 Flash 공개",
      summary: "구글이 영상 길이를 최대 15초로 늘린 모델을 공개했습니다.",
      category: "모델",
      sources: [{ publisher: "Google", title: "Gemini Omni 1.2 Flash", date: "2026-11-05", url: "https://blog.google/x", tier: "official" }],
    },
  ],
});
const cases = [
  ["control-good", 0, (d) => d],
  ["control-empty", 0, null],
  ["trap-internal-key", 1, (d) => ({ ...d, registry_requests: ["https://example.com"] })],
  ["trap-date-mismatch", 1, (d) => ({ ...d, date: "2026-11-05" })],
  ["trap-no-items", 1, (d) => ({ ...d, items: [] })],
  ["trap-http-source", 1, (d) => ({ ...d, items: [{ ...d.items[0], sources: [{ ...d.items[0].sources[0], url: "http://blog.google/x" }] }] })],
  ["trap-curator-tier", 1, (d) => ({ ...d, items: [{ ...d.items[0], sources: [{ ...d.items[0].sources[0], tier: "curator" }] }] })],
  ["trap-auto-label", 1, (d) => ({ ...d, items: [{ ...d.items[0], summary: "자동 게시된 소식입니다." }] })],
];

let failed = 0;
for (const [name, want, make] of cases) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "daily-issues-"));
  if (make) fs.writeFileSync(path.join(dir, "2026-11-06.json"), JSON.stringify(make(good())));
  const r = spawnSync("node", [GATE, "--dir", dir], { encoding: "utf8" });
  fs.rmSync(dir, { recursive: true, force: true });
  if (r.status !== want) {
    console.error(`FAIL[daily-issues-selftest] ${name}: exit ${r.status}, 기대 ${want}\n${r.stdout}${r.stderr}`);
    failed += 1;
  }
}
if (failed) process.exit(1);
console.log(`PASS[daily-issues-selftest] 대조군 2개 exit 0, 함정 ${cases.length - 2}개 exit 1을 확인했습니다.`);
