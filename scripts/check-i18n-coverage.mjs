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
        // 필드 패리티 (round5 N3): ko 원본에 deck/content가 있으면 en도 동반 — 무음 ko/en 혼합 렌더 차단
        if (isNonEmptyString(post.deck) && !isNonEmptyString(post.en?.deck)) violations.push(`${id} — deck 있는데 en.deck 누락 (w${CUTOFF.week}+ 필드 패리티)`);
        if (isNonEmptyString(post.content) && !isNonEmptyString(post.en?.content)) violations.push(`${id} — content 있는데 en.content 누락 (w${CUTOFF.week}+ 필드 패리티)`);
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
  const partial = { title: "제목", deck: "덱", content: "본문", en: { title: "Title", summary: "Summary" } };
  const cases = [
    [checkWeek(mk([full]), { requireEn: true }).length === 0, "en 완비 post는 통과해야 함"],
    [checkWeek(mk([missing]), { requireEn: true }).length === 2, "en 부재는 title+summary 2건 위반이어야 함"],
    [checkWeek(mk([missing]), { requireEn: false }).length === 0, "legacy는 en 부재를 허용해야 함"],
    [checkWeek(mk([empty]), { requireEn: false }).length >= 1, "빈 en.title은 위반이어야 함"],
    [checkWeek(mk([partial]), { requireEn: true }).length === 2, "deck/content 있는데 en.deck/en.content 없으면 패리티 2건 위반이어야 함"],
    [checkWeek(mk([partial]), { requireEn: false }).length === 0, "legacy는 패리티를 강제하지 않아야 함"],
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
    console.log("PASS[i18n-coverage:selftest] 6/6");
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

  // registry 교차검증 (round5 N2 + round6 잔존 지적): 주차 파일 ↔ lib/data.ts의
  // ① import 문 ② weeks 배열 멤버십까지 양방향 일치 강제. import만 있고 배열에 없으면
  // 여전히 사이트·sitemap·RSS에 조용히 누락되므로 둘 다 fail-closed.
  const dataTs = fs.readFileSync(path.join(ROOT, "lib", "data.ts"), "utf8");
  const importsByFile = new Map(
    [...dataTs.matchAll(/import\s*\{\s*(\w+)\s*\}\s*from\s*"\.\/weeks\/(\d{4}-w\d+)"/g)].map((m) => [`${m[2]}.ts`, m[1]])
  );
  const weeksArrayMatch = dataTs.match(/export const weeks\s*:[^=]*=\s*\[([\s\S]*?)\]/);
  if (!weeksArrayMatch) {
    violations.push("lib/data.ts — export const weeks 배열을 찾지 못함 (registry 검증 불가)");
  }
  const arrayMembers = new Set(
    (weeksArrayMatch?.[1] ?? "").split(",").map((s) => s.trim()).filter(Boolean)
  );
  for (const f of files) {
    const ident = importsByFile.get(f);
    if (!ident) {
      violations.push(`${f} — lib/data.ts에 미등록 (import 누락) — 사이트에 노출되지 않는 유령 주차`);
    } else if (!arrayMembers.has(ident)) {
      violations.push(`${f} — import는 있으나 weeks 배열에 미등록 (${ident}) — 여전히 유령 주차`);
    }
  }
  for (const [impFile] of importsByFile) {
    if (!files.includes(impFile)) violations.push(`lib/data.ts가 존재하지 않는 주차 import: ${impFile}`);
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
