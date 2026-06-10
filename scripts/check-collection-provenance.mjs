#!/usr/bin/env node
// check-collection-provenance.mjs
// VN005 방어: 주간/AB 수집 실행이 "공식 출처 매트릭스 + discovery(TestingCatalog/큐레이터) 단계"를
// 실제로 거쳤는지 산출물 증거로 검증한다. 증거 파일이 없으면 fail-closed.
//
// 사용:
//   node scripts/check-collection-provenance.mjs <collection-dir>
//     예: node scripts/check-collection-provenance.mjs _workspace/oneway/20260610-w24/content
//
// 통과 조건 (모두 충족):
//   1) <dir>/_source_matrix_check.json 존재
//   2) 그 안에 publishers[] (필수 publisher 매트릭스 점검 결과)
//   3) discovery 단계 기록: discoveryChecked 에 TestingCatalog 포함 (또는 명시적 skip 사유)
//   4) collect-*.json 이 1개 이상 존재 (실제 수집 수행 증거)
//
// 이 게이트는 "출처를 표시했나"가 아니라 "수집 파이프라인이 매트릭스를 통과했나"를 본다.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
if (!dir) {
  console.error("[check-collection-provenance] 사용법: node scripts/check-collection-provenance.mjs <collection-dir>");
  process.exit(2);
}
if (!existsSync(dir)) {
  console.error(`[check-collection-provenance] ✗ 디렉토리 없음: ${dir}`);
  process.exit(1);
}

const fail = [];
const warn = [];

// 1) collect-*.json 존재 (수집 수행 증거)
const collects = readdirSync(dir).filter((f) => /^collect-.*\.json$/.test(f));
if (collects.length === 0) fail.push("collect-*.json 이 없다 — 수집이 실행되지 않았거나 다른 경로에 있음");

// 2) 매트릭스 점검 산출물 존재 — 정식 하네스명(01_official_source_matrix_check.json)과
//    임시 수집용 단축명(_source_matrix_check.json) 둘 다 인식한다.
const matrixNames = ["01_official_source_matrix_check.json", "_source_matrix_check.json"];
const matrixPath = matrixNames.map((n) => join(dir, n)).find((p) => existsSync(p));
if (!matrixPath) {
  fail.push(`매트릭스 점검 산출물이 없다 (${matrixNames.join(" 또는 ")}) — 공식 출처 매트릭스 점검 단계가 누락됨`);
} else {
  let m;
  try { m = JSON.parse(readFileSync(matrixPath, "utf-8")); }
  catch { fail.push("_source_matrix_check.json 파싱 실패"); }
  if (m) {
    // 3) publishers 매트릭스
    if (!Array.isArray(m.publishers) || m.publishers.length === 0)
      fail.push("_source_matrix_check.json.publishers[] 가 비어 있다 — publisher별 필수 출처 점검 안 됨");
    // 4) discovery 단계 (TestingCatalog 등 radar)
    const disc = m.discoveryChecked || m.discovery || [];
    const discStr = JSON.stringify(disc).toLowerCase();
    const skipReason = m.discoverySkipReason || "";
    if (!/testingcatalog/.test(discStr) && !skipReason) {
      fail.push("discovery 단계 증거 없음 — TestingCatalog 등 radar 소스를 훑었다는 기록(discoveryChecked)도, 명시적 skip 사유(discoverySkipReason)도 없다");
    }
    if (skipReason) warn.push(`discovery skip 선언됨: "${skipReason}" (사람이 의도한 skip인지 확인)`);
    // 5) 한국 큐레이터 레이더 (조코딩 등) — soft
    if (!/조코딩|jocoding|youtube|큐레이터|curator/.test(discStr) && !skipReason)
      warn.push("한국 큐레이터/YouTube radar 점검 흔적 없음 (soft)");
  }
}

// 보고
console.log(`[check-collection-provenance] 검사: ${dir}`);
console.log(`  collect 파일: ${collects.length}개 | matrix-check: ${existsSync(matrixPath) ? "있음" : "없음"}`);
for (const w of warn) console.log(`  ⚠︎ ${w}`);
if (fail.length) {
  console.error(`[check-collection-provenance] ✗ FAIL ${fail.length}건 — 수집 출처 완전성 게이트 미통과:`);
  for (const f of fail) console.error(`    - ${f}`);
  console.error("  → 정식 voidnews-briefing-pipeline 하네스를 쓰거나, 임시 수집도 _source_matrix_check.json 을 남겨야 한다.");
  process.exit(1);
}
console.log("[check-collection-provenance] ✓ 수집 출처 완전성 게이트 통과");
process.exit(0);
