#!/usr/bin/env node
// HARD 게이트: 영문판(en 필드) 커버리지 강제 — fail-closed
//
// 규칙:
//  R1. 2026-w29 이상 신규 주차: 모든 post에 en.title + en.summary 필수 (누락 = exit 2 → 빌드 차단)
//  R2. 모든 주차 공통: en 필드가 존재하면 스키마 유효성(객체·비어있지 않은 문자열) 검사
//  R3. legacy(2026-w28 이하)는 en 부재 허용 — 백필은 ledger 항목으로 추적
//  R4. 게이트 실행 시 내장 selftest가 먼저 돌아 차단 능력을 매번 자체 증명한다
//
// 소비처: run-all-gates.mjs가 파일명 패턴(check-*.mjs)으로 자동 발견 → 매 빌드 실행.
// 사이트 렌더는 lib/i18n.ts displayPost가 en 필드를 소비한다.
// 사용: node scripts/check-i18n-coverage.mjs [--selftest]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WEEKS_DIR = path.join(ROOT, "lib", "weeks");
const CUTOFF = { year: 2026, week: 29 }; // 이 주차부터 en 필수

const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

// 순수 검사 함수 — selftest가 직접 검증한다
function checkWeek(weekData, { requireEn }) {
  const violations = [];
  for (const company of weekData.companies ?? []) {
    for (const post of company.posts ?? []) {
      const id = `${weekData.slug ?? "?"} :: ${(post.title ?? "(no title)").slice(0, 44)}`;
      if (post.en !== undefined) {
        if (typeof post.en !== "object" || post.en === null || Array.isArray(post.en)) {
          violations.push(`${id} — en 필드가 객체가 아님`);
          continue;
        }
        for (const k of ["title", "deck", "summary", "content"]) {
          if (post.en[k] !== undefined && !isNonEmptyString(post.en[k])) {
            violations.push(`${id} — en.${k}가 빈 문자열/비문자열`);
          }
        }
      }
      if (requireEn) {
        if (!post.en || !isNonEmptyString(post.en?.title)) violations.push(`${id} — en.title 누락 (w${CUTOFF.week}+ 필수)`);
        if (!post.en || !isNonEmptyString(post.en?.summary)) violations.push(`${id} — en.summary 누락 (w${CUTOFF.week}+ 필수)`);
      }
    }
  }
  return violations;
}

function selftest() {
  const mk = (posts) => ({ slug: "selftest", companies: [{ name: "T", color: "#000", posts }] });
  const full = { title: "제목", en: { title: "Title", summary: "Summary" } };
  const missing = { title: "제목" };
  const empty = { title: "제목", en: { title: "" } };
  const cases = [
    [checkWeek(mk([full]), { requireEn: true }).length === 0, "en 완비 post는 통과해야 함"],
    [checkWeek(mk([missing]), { requireEn: true }).length === 2, "en 부재는 title+summary 2건 위반이어야 함"],
    [checkWeek(mk([missing]), { requireEn: false }).length === 0, "legacy는 en 부재를 허용해야 함"],
    [checkWeek(mk([empty]), { requireEn: false }).length >= 1, "빈 en.title은 위반이어야 함"],
  ];
  const failed = cases.filter(([ok]) => !ok);
  for (const [, name] of failed) console.error(`FAIL[i18n-coverage:selftest] ${name}`);
  return failed.length === 0;
}

async function main() {
  if (!selftest()) {
    console.error("FAIL[i18n-coverage] selftest 실패 — 게이트 자체가 깨짐");
    process.exit(2);
  }
  if (process.argv.includes("--selftest")) {
    console.log("PASS[i18n-coverage:selftest] 4/4");
    process.exit(0);
  }

  const allTs = fs.readdirSync(WEEKS_DIR).filter((f) => f.endsWith(".ts"));
  const files = allTs.filter((f) => /^\d{4}-w\d+\.ts$/.test(f)).sort();
  let checked = 0;
  let required = 0;
  const violations = [];

  // fail-closed: 패턴 밖 파일명(예: 2026-w29-extra.ts)으로 게이트를 침묵 우회하는 경로 차단 (round4 finding)
  for (const f of allTs) {
    if (!files.includes(f)) violations.push(`${f} — 주차 파일명 패턴(YYYY-wNN.ts) 위반 — 게이트 우회 불가`);
  }

  for (const f of files) {
    const m = f.match(/^(\d{4})-w(\d+)\.ts$/);
    const year = Number(m[1]);
    const week = Number(m[2]);
    const requireEn = year > CUTOFF.year || (year === CUTOFF.year && week >= CUTOFF.week);
    // Node 24 native type stripping — 주차 파일은 type-only import뿐이라 안전
    const mod = await import(pathToFileURL(path.join(WEEKS_DIR, f)).href);
    const weekData = Object.values(mod).find((v) => v && typeof v === "object" && Array.isArray(v.companies));
    if (!weekData) {
      violations.push(`${f} — WeeklyData export를 찾지 못함`);
      continue;
    }
    checked += 1;
    if (requireEn) required += 1;
    violations.push(...checkWeek(weekData, { requireEn }));
  }

  if (violations.length > 0) {
    for (const v of violations) console.error(`FAIL[i18n-coverage] ${v}`);
    console.error(`FAIL[i18n-coverage] ${violations.length}건 — en 필드를 채우거나 스키마를 고쳐야 빌드 가능`);
    process.exit(2);
  }
  console.log(`PASS[i18n-coverage] weeks=${checked} (en 필수 대상=${required}) violations=0`);
}

main().catch((e) => {
  // fail-closed: 게이트 자체 오류도 차단으로 처리
  console.error(`FAIL[i18n-coverage] 게이트 실행 오류: ${e?.message ?? e}`);
  process.exit(2);
});
