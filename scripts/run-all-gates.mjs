#!/usr/bin/env node
// Subgate auto-discovery + fail-closed OR aggregation (extensibility axis).
// Replaces the hardcoded prebuild chain so a newly added check-*/verify-*
// script can never be silently forgotten: build-time gates run with their
// configured args; any UNCONFIGURED gate is surfaced (warn) instead of skipped.
//
// A gate "passes" only on exit 0. Any non-zero (incl. crash) = fail-closed.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPTS = path.join(ROOT, "scripts");

// build-time HARD gates (run on every `next build` via prebuild)
const BUILD_GATES = {
  "check-ab-2026-09a.mjs": [],
  "check-ab-2026-09b.mjs": [],
  "check-source-image-policy.mjs": [],
  "check-weekly-source-images.mjs": [],
  "check-backfill-integration.mjs": [],
  "check-slugs.mjs": [],
  "check-regressions.mjs": [],
  // 회귀 검사기가 '측정 없이 통과'하지 않는지 매 빌드 증명한다(손상 명세 5종 함정).
  // 2026-10-18 실측에서 그 5종이 전부 exit 0 이었다 — FAILURE_LOG VN-GATE-04.
  "check-regressions.selftest.mjs": [],
  "check-card-content.mjs": [],
  "verify-no-duplicates.mjs": ["--scope", "all"],
  "verify-improvements.mjs": [],
  "check-ledger-open.selftest.mjs": [], // pending 2차 집계(나이·evidence 없는 applied)가 계속 보이는지
  "check-emit-weeks.selftest.mjs": [], // IMP-0010 주간 생성기: --check 무쓰기·멱등·drift 감시
  "check-dangling-thumbs.mjs": [],
  "check-ab-editions.mjs": [], // AB 등록 회차 ⊆ 게시 승인 목록(references/approved-editions.json) + 참조 이미지·영상 실재(2026-11-01, 10a)
  "check-ab-editions.selftest.mjs": [], // 위 게이트의 함정 6개 exit 2, 대조군 2개 exit 0
  "check-i18n-coverage.mjs": [], // w29+ 신규 주차 en 필드 필수 — 영문판 회귀 차단
  "verify-07a-closure.mjs": [], // 2026-07a GA/KO·EN/manifest/report closure 회귀 차단
  "check-horizontal-accent.mjs": [],
  // 공식 채널 영상만 허용 + fluent-korean 편집 규칙.
  // 인자 없음 = 전 회차 검사. 면제는 references/editorial-tone-legacy.json 에 기록된 건만이며,
  // 고쳐져 사라진 legacy 항목은 래칫이 실패시킨다(FAILURE_LOG VN-TONE-01).
  // 2026-10-18 이전에는 여기 회차 목록이 하드코딩돼 있어서 ① 회차마다 손으로 한 줄 추가해야 했고
  // ② 그 목록 밖 과거 회차의 위반 24건이 매 빌드 조용히 통과했다.
  "check-editorial-tone.mjs": [],
  // 리뉴얼 계획 R1~R6 원본 계약(REQUIREMENTS R19~R24). 인자 없음 = 원본 검사.
  // 같은 스크립트의 --html(빌드 HTML) 검사는 postbuild의 run-postbuild-gates.mjs가 돌립니다.
  "check-owner-links.mjs": [],
  "check-brand-tokens.mjs": [],
  "check-ai-author-label.mjs": [],
  "check-daily-issues.mjs": [], // 데일리 브리핑 자료 형식·출처·내부 기록 경계(R30, 2026-11-07)
  "check-daily-issues.selftest.mjs": [], // 위 게이트의 함정 6개 exit 1, 대조군 2개 exit 0
  "check-trending.mjs": [], // GitHub 트렌딩 스냅숏 형식·주소·숫자(R31, 2026-11-08)
  "check-trending.selftest.mjs": [], // 수집기 해석 6건과 위 게이트의 함정 9개 exit 1, 대조군 2개 exit 0
  "check-newsletter-consent.mjs": [],
  "check-official-labels.mjs": [],
  "check-theme-contract.mjs": [],
  // 위 6개 게이트의 함정 17개가 매 빌드 exit 1인지(대조군 10개는 exit 0) 별도 프로세스로 증명합니다.
  // 함정이 통과하면 게이트 자체가 실패로 봅니다(계획 5.5절). 함정: scripts/fixtures/renewal-traps/traps/*.json
  "check-renewal-gates.selftest.mjs": [],
};
// gates that are run-scoped (need a run dir / range) — NOT run at build time
const RUN_SCOPED = new Set([
  "check-vip-preview.mjs",
  "verify-publish-ready.mjs",      // publish-time, needs --scope/--run
  "check-date-coverage.mjs",       // consolidate/run, needs --items/--start/--end
  "check-collection-provenance.mjs", // post-collection, needs --run
  "check-render-leaks.mjs",        // postbuild (scans built HTML)
  "verify-live-thumbnails.mjs",    // live network check (not at build time)
  "verify-site-release.mjs",       // mandatory after deployment; requires the actual --url and runs the master plus browser checks
  "check-staged-editions.mjs",     // pre-commit: reads the git index; the AB publish step runs it right after staging
  "check-staged-editions.selftest.mjs", // builds throwaway git repos; run it by hand after changing check-staged-editions.mjs
  "run-all-gates.mjs",
  "run-postbuild-gates.mjs",       // postbuild: 리뉴얼 게이트 --html 검사(out/ 없으면 실패). 이름이 check-/verify-가 아니라 발견되지 않지만 위치를 밝혀 둡니다.
]);

const discovered = fs.readdirSync(SCRIPTS)
  .filter((f) => /^(check|verify)-.*\.mjs$/.test(f));

let failed = 0;
const results = [];

for (const f of discovered) {
  if (RUN_SCOPED.has(f)) { results.push([f, "skip(run-scoped)"]); continue; }
  if (!(f in BUILD_GATES)) {
    // unconfigured new gate: run with --warn, but a non-zero exit still FAILS the build.
    // (round5 N1: 미등록 게이트의 exit 2가 failed에 합산되지 않아 fail-open이던 결함 — fail-closed로 전환)
    const r = spawnSync("node", [path.join(SCRIPTS, f), "--warn"], { stdio: "inherit" });
    const ok = r.status === 0;
    if (!ok) failed++;
    results.push([f, ok ? "DISCOVERED(unconfigured) PASS" : `DISCOVERED(unconfigured) FAIL exit ${r.status === null ? "crash" : r.status}`]);
    console.error(`[run-all-gates] ⚠️ new gate '${f}' is not in BUILD_GATES — add it with proper args.`);
    continue;
  }
  const r = spawnSync("node", [path.join(SCRIPTS, f), ...BUILD_GATES[f]], { stdio: "inherit" });
  const ok = r.status === 0;
  if (!ok) failed++;
  results.push([f, ok ? "PASS" : `FAIL exit ${r.status === null ? "crash" : r.status}`]);
}

console.log("\n[run-all-gates] summary:");
for (const [f, s] of results) console.log(`  ${s.startsWith("PASS") || s.startsWith("skip") ? "✓" : "✗"} ${f}: ${s}`);
if (failed) {
  console.error(`\n[run-all-gates] ${failed} gate(s) failed — build blocked.`);
  process.exit(1);
}
console.log(`\n[run-all-gates] all ${Object.keys(BUILD_GATES).length} build gates passed.`);
