#!/usr/bin/env node
// check-trending.mjs — GitHub 트렌딩 스냅숏(lib/trending/*.json) HARD 게이트 (REQUIREMENTS R31)
//
// 왜: 맥미니 08:30 게시가 GitHub Trending 화면을 읽은 값을 사람 검토 없이 운영에 올립니다. 화면 구조가 바뀌어
// 값이 어긋나거나 엉뚱한 주소가 들어가면 그대로 공개되므로 빌드에서 멈춥니다.
//
// 검사: 파일 이름 = date · 최상위 키는 date·collectedAt·source·repos만 · source 는 GitHub Trending(오늘) 주소 ·
//   collectedAt 은 날짜로 읽힘 · archive(선택)는 인터넷 아카이브의 GitHub Trending 저장 화면 주소 · 저장소 5~25개 · rank 1부터 차례 · repo 는 owner/name, url 은 https://github.com/<repo> ·
//   repo 중복 없음 · stars·forks·starsToday 는 0 이상의 정수, starsToday ≤ stars · '자동 게시' 표현 없음(R21).
// 사용: node scripts/check-trending.mjs [--dir <폴더>]
// 종료 코드: 0 통과(스냅숏이 없어도 통과) · 1 위반 · 2 입력 오류(폴더를 읽지 못함)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SOURCE } from "./collect-github-trending.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const at = process.argv.indexOf("--dir");
const DIR = at > 0 ? path.resolve(process.argv[at + 1] ?? "") : path.join(ROOT, "lib", "trending");
const KEYS = ["archive", "collectedAt", "date", "repos", "source"];
const FORBIDDEN = /자동\s*게시|auto-?published/i;
const count = (v) => Number.isInteger(v) && v >= 0;

function problems(name, snap) {
  const out = [];
  const extra = Object.keys(snap).filter((k) => !KEYS.includes(k));
  if (extra.length) out.push(`허용하지 않은 최상위 키 ${extra.join(", ")}`);
  if (snap.date !== name.replace(/\.json$/, "")) out.push(`date ${snap.date}가 파일 이름과 다릅니다`);
  if (snap.source !== SOURCE) out.push(`source가 ${SOURCE}가 아닙니다`);
  if (Number.isNaN(Date.parse(snap.collectedAt))) out.push("collectedAt을 날짜로 읽지 못했습니다");
  if (snap.archive !== undefined && !/^https:\/\/web\.archive\.org\/web\/\d{14}\/https:\/\/github\.com\/trending$/.test(snap.archive))
    out.push(`archive ${snap.archive}가 인터넷 아카이브의 GitHub Trending 주소가 아닙니다`);
  const repos = Array.isArray(snap.repos) ? snap.repos : [];
  if (repos.length < 5 || repos.length > 25) out.push(`저장소 수 ${repos.length}개(5~25개여야 합니다)`);
  const seen = new Set();
  repos.forEach((r, i) => {
    const who = `${i + 1}번째 ${r?.repo ?? "(이름 없음)"}`;
    if (r?.rank !== i + 1) out.push(`${who} rank ${r?.rank}(${i + 1}이어야 합니다)`);
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(r?.repo ?? "")) out.push(`${who} repo가 owner/name 형식이 아닙니다`);
    else if (r.url !== `https://github.com/${r.repo}`) out.push(`${who} url ${r.url}이 저장소 주소와 다릅니다`);
    if (seen.has(r?.repo)) out.push(`${who} 중복`);
    seen.add(r?.repo);
    for (const k of ["stars", "forks", "starsToday"]) if (!count(r?.[k])) out.push(`${who} ${k}가 0 이상의 정수가 아닙니다`);
    if (count(r?.stars) && count(r?.starsToday) && r.starsToday > r.stars) out.push(`${who} 오늘 별 ${r.starsToday}이 전체 별 ${r.stars}보다 많습니다`);
    if (typeof r?.description !== "string" || r.description.length > 400) out.push(`${who} description이 400자 이하 글자가 아닙니다`);
    if (r?.language !== null && typeof r?.language !== "string") out.push(`${who} language가 글자나 null이 아닙니다`);
  });
  if (FORBIDDEN.test(JSON.stringify(snap))) out.push("'자동 게시' 표현이 있습니다");
  return out;
}

let names;
try {
  names = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((n) => n.endsWith(".json")).sort() : [];
} catch (e) {
  console.error(`FAIL[trending] 폴더를 읽지 못했습니다: ${DIR} ${e.message}`);
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
  if (found.length) {
    bad += 1;
    console.error(`FAIL[trending] ${name}: ${found.slice(0, 6).join(" / ")}`);
  }
}
if (bad) process.exit(1);
console.log(`PASS[trending] 스냅숏 ${names.length}개 형식·주소·숫자 통과`);
