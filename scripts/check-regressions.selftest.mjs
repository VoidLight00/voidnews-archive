#!/usr/bin/env node
// scripts/check-regressions.selftest.mjs — 회귀 검사기가 '측정 없이 통과'하지 않는지 증명한다.
//
// 왜: 2026-10-18 실측에서 check-regressions.mjs 는 아래 5개 손상 명세를 전부 exit 0 으로
// 통과시켰다. 게이트가 실패할 수 없으면 게이트가 아니다(FAILURE_LOG VN-GATE-04).
// 이 자체시험은 각 함정이 이제 non-zero 로 막히는지, 그리고 정상 명세는 여전히 통과하는지를
// 종료코드로 증명한다. 자기보고가 아니라 실행 결과로 판정한다.
//
// usage: node scripts/check-regressions.selftest.mjs
// exit 0 — 모든 함정이 차단되고 정상 명세는 통과
// exit 1 — 함정 중 하나라도 통과했거나 정상 명세가 막혔다

import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GATE = join(__dirname, "check-regressions.mjs");

// expectToken 이 핵심이다. 종료코드만 보면 크래시가 '기대한 실패'로 위장된다 —
// 실제로 2026-10-18 1차 자체시험에서 케이스 H 가 ENOENT 크래시로 죽으면서 OK 로 찍혔다.
// 그래서 모든 케이스가 사유 토큰까지 맞아야 통과로 센다.
const CASES = [
  {
    name: "A 명세 파일 없음",
    spec: null,
    files: {},
    expect: "fail",
    expectToken: "FAIL[R1]",
    why: "회귀 기억 층이 통째로 사라진 상태는 통과가 아니다",
  },
  {
    name: "B checks 빈 배열",
    spec: { checks: [] },
    files: {},
    expect: "fail",
    expectToken: "FAIL[R2]",
    why: "0건 실행은 통과가 아니다",
  },
  {
    name: "C 최상위 키 오타 (check)",
    spec: { check: [{ id: "X", type: "grep_absent", globs: ["src/*.ts"], patterns: ["bad"] }] },
    files: { "src/a.ts": "ok\n" },
    expect: "fail",
    expectToken: "FAIL[R2]",
    why: "오타 하나로 기억 층 전체가 조용히 비활성화되면 안 된다",
  },
  {
    name: "D 알 수 없는 type",
    spec: { checks: [{ id: "X", title: "t", type: "grep_absetn", globs: ["src/*.ts"], patterns: ["bad"] }] },
    files: { "src/a.ts": "ok\n" },
    expect: "fail",
    expectToken: "FAIL[R3]",
    why: "모르는 type 을 무시하면 그 체크는 영원히 돌지 않는다",
  },
  {
    name: "E glob 0파일 (allowMissing 미선언)",
    spec: { checks: [{ id: "X", title: "t", type: "grep_absent", globs: ["nope/*.ts"], patterns: ["bad"] }] },
    files: { "src/a.ts": "ok\n" },
    expect: "fail",
    expectToken: "FAIL[R4]",
    why: "대상이 0개인 grep_absent 는 공허하게 통과한다",
  },
  {
    name: "F glob 0파일 + allowMissing 선언",
    spec: { checks: [{ id: "X", title: "t", type: "grep_absent", globs: ["nope/*.ts"], patterns: ["bad"], allowMissing: true }] },
    files: { "src/a.ts": "ok\n" },
    expect: "pass",
    expectToken: "SKIP X",
    why: "의도된 부재는 선언하면 SKIP 으로 인정한다 (gitignore 대상 등)",
  },
  {
    name: "G 정상 명세 · 회귀 없음",
    spec: { checks: [{ id: "X", title: "t", type: "grep_absent", globs: ["src/*.ts"], patterns: ["forbidden"] }] },
    files: { "src/a.ts": "clean content\n" },
    expect: "pass",
    expectToken: "회귀 0건",
    why: "정상 경로는 막히면 안 된다",
  },
  {
    name: "H 정상 명세 · 회귀 적발",
    spec: { checks: [{ id: "X", title: "t", type: "grep_absent", globs: ["src/*.ts"], patterns: ["forbidden"] }] },
    files: { "src/a.ts": "this line is forbidden\n" },
    expect: "fail",
    expectToken: "회귀 재발",
    why: "진짜 회귀는 여전히 잡아야 한다",
  },
  {
    name: "I ROOT 가 cwd 와 다를 때도 파일을 연다",
    spec: { checks: [{ id: "X", title: "t", type: "grep_present_min", globs: ["src/*.ts"], patterns: ["marker"], min: 1 }] },
    files: { "src/a.ts": "has marker here\n" },
    expect: "pass",
    expectToken: "회귀 0건",
    why: "globSync 의 absolute:true 가 무시되어 상대 경로로 readFileSync 하던 결함(ENOENT) 재발 방지",
  },
];

let failures = 0;
// 크래시 흔적. 어느 케이스에서든 나오면 그 케이스는 '검사'가 아니라 '사고'다.
const CRASH = /node:(fs|internal)|ENOENT|Thrown at|at ModuleJob\.run/;

for (const c of CASES) {
  const root = mkdtempSync(join(tmpdir(), "cr-selftest-"));
  try {
    mkdirSync(join(root, "references"), { recursive: true });
    if (c.spec !== null) {
      writeFileSync(join(root, "references", "regressions.json"), JSON.stringify(c.spec, null, 2));
    }
    for (const [rel, body] of Object.entries(c.files)) {
      const abs = join(root, rel);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, body);
    }

    // cwd 를 리포 밖으로 두어 ROOT 해석이 실제로 독립인지 함께 증명한다.
    const r = spawnSync("node", [GATE], {
      cwd: tmpdir(),
      env: { ...process.env, CHECK_REGRESSIONS_ROOT: root },
      encoding: "utf-8",
    });
    const code = r.status ?? 1;
    const out = `${r.stdout || ""}${r.stderr || ""}`;
    const got = code === 0 ? "pass" : "fail";

    const codeOk = got === c.expect;
    const tokenOk = out.includes(c.expectToken);
    const noCrash = !CRASH.test(out);
    const ok = codeOk && tokenOk && noCrash;
    if (!ok) failures += 1;

    console.log(`${ok ? "  OK " : "  XX "} ${c.name}: 기대=${c.expect}/«${c.expectToken}» 실제=${got}(exit ${code})`);
    if (!ok) {
      const miss = [
        codeOk ? null : "종료코드 불일치",
        tokenOk ? null : `사유 토큰 «${c.expectToken}» 없음`,
        noCrash ? null : "크래시 흔적",
      ].filter(Boolean).join(" · ");
      const firstLine = out.trim().split("\n").find((l) => l.trim()) || "";
      console.log(`       불일치: ${miss}\n       이유: ${c.why}\n       출력: ${firstLine.slice(0, 140)}`);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

if (failures) {
  console.error(`\nFAIL[check-regressions-selftest] ${failures}/${CASES.length} 케이스 불일치`);
  process.exit(1);
}
console.log(`\nPASS[check-regressions-selftest] ${CASES.length}/${CASES.length} — 손상 명세 5종 차단, 정상 명세 통과, 진짜 회귀 적발`);
process.exit(0);
