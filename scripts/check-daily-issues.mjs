#!/usr/bin/env node
// check-daily-issues.mjs — 데일리 브리핑 자료(lib/daily/*.json) HARD 게이트 (REQUIREMENTS R30)
//
// 왜: 맥미니 08:30 매일 게시(daily_publish.py)가 07:25 뉴스레터 데일리 호를 사람 검토 없이 운영에 옮깁니다.
// 형식이 어긋나거나 내부 기록(registry_requests 같은 레지스트리 요청 메모)이 섞이면 그대로 공개되므로 빌드에서 멈춥니다.
//
// 검사: 파일 이름 = date · edition "daily" · author.kind "ai" · 최상위 키는 edition·date·author·items만 ·
//   소식 1~10개 · headline·summary·category는 비어 있지 않은 글자 · 출처 1개 이상, 출처마다 https 주소와 tier "official" ·
//   '자동 게시' 표현 없음(R21, 2026-11-02 사용자 요청).
// 사용: node scripts/check-daily-issues.mjs [--dir <폴더>]
// 종료 코드: 0 통과(호가 없어도 통과) · 1 위반 · 2 입력 오류(폴더를 읽지 못함)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const at = process.argv.indexOf("--dir");
const DIR = at > 0 ? path.resolve(process.argv[at + 1] ?? "") : path.join(ROOT, "lib", "daily");
const KEYS = ["author", "date", "edition", "items"];
const FORBIDDEN = /자동\s*게시|auto-?published/i;
const text = (v) => typeof v === "string" && v.trim().length > 0;

function problems(name, issue) {
  const out = [];
  const date = name.replace(/\.json$/, "");
  const extra = Object.keys(issue).filter((k) => !KEYS.includes(k));
  if (extra.length) out.push(`허용하지 않은 최상위 키 ${extra.join(", ")}`);
  if (issue.date !== date) out.push(`date ${issue.date}가 파일 이름 ${date}와 다릅니다`);
  if (issue.edition !== "daily") out.push(`edition이 daily가 아닙니다(${issue.edition})`);
  if (issue.author?.kind !== "ai") out.push("author.kind가 ai가 아닙니다");
  const items = Array.isArray(issue.items) ? issue.items : [];
  if (items.length < 1 || items.length > 10) out.push(`소식 수 ${items.length}개(1~10개여야 합니다)`);
  items.forEach((item, i) => {
    for (const k of ["headline", "summary", "category"]) if (!text(item?.[k])) out.push(`소식 ${i + 1} ${k} 없음`);
    const sources = Array.isArray(item?.sources) ? item.sources : [];
    if (!sources.length) out.push(`소식 ${i + 1} 출처 없음`);
    sources.forEach((s, j) => {
      if (!/^https:\/\/[^\s]+$/.test(s?.url ?? "")) out.push(`소식 ${i + 1} 출처 ${j + 1} 주소가 https가 아닙니다`);
      if (s?.tier !== "official") out.push(`소식 ${i + 1} 출처 ${j + 1} tier ${s?.tier}(official만 싣습니다)`);
      if (!text(s?.publisher) || !text(s?.title)) out.push(`소식 ${i + 1} 출처 ${j + 1} 발행처·제목 없음`);
    });
  });
  if (FORBIDDEN.test(JSON.stringify(issue))) out.push("'자동 게시' 표현이 있습니다");
  return out;
}

let names;
try {
  names = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((n) => n.endsWith(".json")).sort() : [];
} catch (e) {
  console.error(`FAIL[daily-issues] 폴더를 읽지 못했습니다: ${DIR} ${e.message}`);
  process.exit(2);
}
let bad = 0;
for (const name of names) {
  let found;
  if (!/^\d{4}-\d{2}-\d{2}\.json$/.test(name)) found = ["파일 이름이 YYYY-MM-DD.json이 아닙니다"];
  else {
    try {
      found = problems(name, JSON.parse(fs.readFileSync(path.join(DIR, name), "utf8")));
    } catch (e) {
      found = [`JSON을 읽지 못했습니다: ${e.message}`];
    }
  }
  for (const p of found) console.error(`FAIL[daily-issues] ${name}: ${p}`);
  bad += found.length ? 1 : 0;
}
if (bad) process.exit(1);
console.log(`PASS[daily-issues] 데일리 호 ${names.length}개의 형식·출처·내부 기록 경계를 확인했습니다.`);
