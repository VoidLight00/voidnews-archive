#!/usr/bin/env node
// check-trending.selftest.mjs — 수집기 해석과 check-trending.mjs 가 실제로 잡는지 증명한다(R31).
// 해석: 실제 화면 표본 6줄을 정확히 읽고, 별 링크가 빠진 화면은 problems()가 잡아야 한다.
// 게이트: 대조군은 exit 0, 함정 9개는 각각 exit 1 이어야 한다. 하나라도 어긋나면 exit 1.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseTrending, problems, SOURCE } from "./collect-github-trending.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const fails = [];
const expect = (ok, msg) => ok || fails.push(msg);

const html = fs.readFileSync(path.join(HERE, "fixtures/github-trending-sample.html"), "utf8");
const repos = parseTrending(html);
expect(repos.length === 6, `표본 6줄 중 ${repos.length}줄만 읽었습니다`);
const first = repos[0] ?? {};
expect(first.repo === "vercel-labs/agent-browser" && first.stars === 46595 && first.forks === 3192 && first.starsToday === 180,
  `1위 값이 다릅니다: ${JSON.stringify(first)}`);
expect(repos[1]?.starsToday === 2088 && repos[1]?.language === "JavaScript", `2위 값이 다릅니다: ${JSON.stringify(repos[1])}`);
expect(problems(repos).length === 0, `정상 표본에서 문제를 보고했습니다: ${problems(repos)}`);
const broken = parseTrending(html.replace(/href="\/vercel-labs\/agent-browser\/stargazers"/, 'href="/x"'));
expect(problems(broken).length === 1, "별 링크가 빠진 화면을 잡지 못했습니다");
expect(problems(repos.slice(0, 4)).length === 1, "4줄만 읽은 화면을 잡지 못했습니다");

const good = { date: "2026-11-08", collectedAt: "2026-11-07T23:30:00.000Z", source: SOURCE, repos };
const traps = {
  wrongDate: { ...good, date: "2026-11-07" },
  extraKey: { ...good, note: "internal" },
  badArchive: { ...good, archive: "https://example.com/web/20261101083540/https://github.com/trending" },
  httpUrl: { ...good, repos: repos.map((r, i) => (i ? r : { ...r, url: `http://github.com/${r.repo}` })) },
  otherUrl: { ...good, repos: repos.map((r, i) => (i ? r : { ...r, url: "https://example.com/" })) },
  todayOverTotal: { ...good, repos: repos.map((r, i) => (i ? r : { ...r, starsToday: r.stars + 1 })) },
  duplicate: { ...good, repos: [...repos.slice(0, 5), { ...repos[0], rank: 6 }] },
  tooFew: { ...good, repos: repos.slice(0, 4) },
  autoLabel: { ...good, repos: repos.map((r, i) => (i ? r : { ...r, description: "자동 게시 표본" })) },
};
const gate = path.join(HERE, "check-trending.mjs");
const run = (snap) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "trending-"));
  fs.writeFileSync(path.join(dir, "2026-11-08.json"), JSON.stringify(snap));
  const rc = spawnSync(process.execPath, [gate, "--dir", dir], { encoding: "utf8" }).status;
  fs.rmSync(dir, { recursive: true, force: true });
  return rc;
};
expect(run(good) === 0, "대조군이 통과하지 못했습니다");
expect(run({ ...good, archive: "https://web.archive.org/web/20261101083540/https://github.com/trending" }) === 0, "아카이브 대조군이 통과하지 못했습니다");
for (const [name, snap] of Object.entries(traps)) expect(run(snap) === 1, `함정 ${name}을 잡지 못했습니다`);

if (fails.length) {
  for (const f of fails) console.error(`FAIL[trending-selftest] ${f}`);
  process.exit(1);
}
console.log(`PASS[trending-selftest] 해석 6건, 대조군 2개 exit 0, 함정 ${Object.keys(traps).length}개 exit 1`);
