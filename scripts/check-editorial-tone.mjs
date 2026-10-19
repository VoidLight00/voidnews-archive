#!/usr/bin/env node
/**
 * AB 공개 본문 편집 게이트 (HARD, 종료코드로 판정)
 *
 * 1. 참고 영상은 references/official-video-channels.json 에 official 또는 press 로
 *    등록된 채널만 허용합니다. 미등록 영상은 통과시키지 않습니다(fail-closed).
 * 2. 한국어 본문은 fluent-korean 을 따릅니다. 원문자 나열, 첫째·둘째·셋째 나열,
 *    자리만 가리키는 라벨형 소제목을 차단합니다.
 *    엠대시(—)는 2026-04a 부터 이어진 이 사이트의 제목·본문 관례이므로
 *    이 게이트에서 판정하지 않습니다. 정비하려면 전 회차를 한 번에 다뤄야 합니다.
 *
 * 3. 레거시 래칫 (2026-10-18 신설, FAILURE_LOG VN-TONE-01).
 *    그 전까지 이 게이트는 run-all-gates.mjs 가 넘기는 하드코딩 회차 목록
 *    ["2026-09a","2026-09b","2026-10a"] 만 검사했고, references/editorial-tone-legacy.json
 *    은 기록만 되고 아무도 읽지 않았다. 그래서 전 회차 24건(ordinal-list 17 · circled-number 5
 *    · video-non-official 1 · label-heading 1)이 매 빌드 통과했고, 과거 회차에 새 위반이
 *    생겨도 영원히 보이지 않았다. 이제 **항상 전 회차를 검사**하고 legacy 에 기록된 건만
 *    면제한다. 고쳐서 사라진 legacy 항목은 실패시켜 원장이 실제와 어긋나지 않게 한다(래칫).
 *
 * 사용: node scripts/check-editorial-tone.mjs [editions...]
 *       인자가 없으면 lib/ab/editions/ 전체를 검사합니다(게이트 기본값).
 *       --update-legacy  현재 측정값으로 legacy 원장을 다시 씁니다(명시적 의도가 있을 때만).
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const EDITION_DIR = "lib/ab/editions";
const REGISTRY = "references/official-video-channels.json";
const LEGACY = "references/editorial-tone-legacy.json";

const registry = JSON.parse(readFileSync(REGISTRY, "utf8"));
const videoChannel = registry.videos ?? {};
const channels = registry.channels ?? {};
const blocked = registry.blocked ?? {};

const argv = process.argv.slice(2).filter((a) => a !== "--warn");
const UPDATE_LEGACY = argv.includes("--update-legacy");
const explicit = argv.filter((a) => !a.startsWith("--"));

const targets = explicit.length
  ? explicit.map((n) => (n.endsWith(".ts") ? n : join(EDITION_DIR, `${n}.ts`)))
  : readdirSync(EDITION_DIR).filter((f) => f.endsWith(".ts")).map((f) => join(EDITION_DIR, f));

/** 라벨형 소제목: 내용을 말하지 않고 자리만 가리키는 정형 문구 */
const LABEL_HEADING = [
  /^이번 (변화|소식)가? .*(이유|중요)/,
  /^(어디서|어떻게|무엇을|왜) .*(나요|까요)\?*$/,
  /^.*(해|써|들어|비교해) ?보세요$/,
  /^(세|네|다섯|여러) 가지 .*/,
  /^.*(하는 방법|하는 이유|보는 방법|판단하는 기준)$/,
];

const findings = [];
const seenVideos = new Set();

for (const file of targets) {
  const src = readFileSync(file, "utf8");
  const name = file.split("/").pop();
  const at = (idx) => src.slice(0, idx).split("\n").length;

  // ── 1. 영상 채널 ────────────────────────────────────────────
  for (const m of src.matchAll(/youtube\.com\/(?:watch\?v=|embed\/)([A-Za-z0-9_-]{11})/g)) {
    const id = m[1];
    seenVideos.add(id);
    const channel = videoChannel[id];
    if (!channel) {
      findings.push({ file: name, line: at(m.index), rule: "video-unregistered",
        detail: `영상 ${id} 이 레지스트리에 없습니다. 채널을 실측해 ${REGISTRY} 에 등록해야 합니다.` });
      continue;
    }
    if (blocked[channel]) {
      findings.push({ file: name, line: at(m.index), rule: "video-non-official",
        detail: `영상 ${id} 의 채널이 ${blocked[channel]} 입니다. 공식 채널 영상만 첨부합니다.` });
      continue;
    }
    const entry = channels[channel];
    if (!entry) {
      findings.push({ file: name, line: at(m.index), rule: "video-channel-unknown",
        detail: `영상 ${id} 의 채널 ${channel} 이 channels 에 없습니다.` });
      continue;
    }
    if (!["official", "press"].includes(entry.grade)) {
      findings.push({ file: name, line: at(m.index), rule: "video-grade",
        detail: `영상 ${id} 의 채널 등급이 ${entry.grade} 입니다.` });
    }
    if (entry.grade === "press" && !entry.reason) {
      findings.push({ file: name, line: at(m.index), rule: "video-press-no-reason",
        detail: `press 등급 채널 ${channel} 에 사유가 없습니다.` });
    }
  }

  // ── 2. 원문자·서수 나열 ─────────────────────────────────────
  for (const m of src.matchAll(/[①②③④⑤]/g)) {
    findings.push({ file: name, line: at(m.index), rule: "circled-number",
      detail: `원문자로 항목을 나열합니다: ${m[0]}` });
  }
  for (const m of src.matchAll(/(첫째|둘째|셋째|넷째),/g)) {
    findings.push({ file: name, line: at(m.index), rule: "ordinal-list",
      detail: `서수로 항목을 나열합니다: ${m[1]}` });
  }

  // ── 3. 라벨형 소제목 ────────────────────────────────────────
  for (const m of src.matchAll(/\*\*([^*\n]{2,40})\*\*/g)) {
    const head = m[1].trim();
    if (LABEL_HEADING.some((re) => re.test(head))) {
      findings.push({ file: name, line: at(m.index), rule: "label-heading",
        detail: `소제목이 내용을 말하지 않고 자리만 가리킵니다: ${head}` });
    }
  }
}

// ── 레지스트리 위생: 쓰이지 않는 등록 항목 ────────────────────
const stale = Object.keys(videoChannel).filter((id) => !seenVideos.has(id));

// ── 레거시 래칫 ───────────────────────────────────────────────
// 줄 번호는 본문을 고치면 밀리므로 키에 넣지 않는다. (파일, 규칙, 상세)의 개수로 센다.
const key = (f) => `${f.file}\u0000${f.rule}\u0000${f.detail}`;

if (UPDATE_LEGACY) {
  const byEdition = {};
  for (const f of findings) {
    (byEdition[f.file] ??= { count: 0, items: [] }).items.push({ rule: f.rule, file: f.file, line: f.line, detail: f.detail });
    byEdition[f.file].count += 1;
  }
  const prev = existsSync(LEGACY) ? JSON.parse(readFileSync(LEGACY, "utf8")) : {};
  writeFileSync(LEGACY, JSON.stringify({
    note: prev.note ?? "과거 회차에 남아 있는 편집 규칙 위반입니다. 게이트는 전 회차를 검사하고 이 목록만 면제합니다. 과거 본문을 고치면 이미 게시된 문장이 바뀌므로 별도 승인 후 정비합니다.",
    measuredAt: new Date().toISOString().slice(0, 10),
    gate: "scripts/check-editorial-tone.mjs",
    total: findings.length,
    byEdition,
  }, null, 2) + "\n");
  console.log(`[check-editorial-tone] legacy 원장 갱신: ${findings.length}건`);
  process.exit(0);
}

const budget = new Map();
let legacyTotal = 0;
if (existsSync(LEGACY)) {
  const legacy = JSON.parse(readFileSync(LEGACY, "utf8"));
  for (const ed of Object.values(legacy.byEdition ?? {})) {
    for (const it of ed.items ?? []) {
      const k = `${it.file}\u0000${it.rule}\u0000${it.detail}`;
      budget.set(k, (budget.get(k) ?? 0) + 1);
      legacyTotal += 1;
    }
  }
}

const live = [];
const consumed = new Map();
for (const f of findings) {
  const k = key(f);
  const left = budget.get(k) ?? 0;
  if (left > 0) {
    budget.set(k, left - 1);
    consumed.set(k, (consumed.get(k) ?? 0) + 1);
  } else {
    live.push(f);
  }
}
// 래칫: 남은 예산 = 고쳐졌거나 사라진 legacy 항목. 원장이 실제보다 큰 상태를 막는다.
const unmatched = [...budget.entries()].filter(([, n]) => n > 0);

for (const f of live) console.error(`FAIL[${f.rule}] ${f.file}:${f.line} ${f.detail}`);
if (stale.length) console.log(`참고: 레지스트리에만 있고 본문에 없는 영상 ${stale.length}개 — ${stale.join(", ")}`);

let bad = false;
if (live.length) {
  const byRule = live.reduce((a, f) => ((a[f.rule] = (a[f.rule] ?? 0) + 1), a), {});
  console.error(`\n[check-editorial-tone] 신규 위반 ${live.length}건: ${JSON.stringify(byRule)}`);
  bad = true;
}
if (unmatched.length) {
  const n = unmatched.reduce((a, [, c]) => a + c, 0);
  console.error(`\n[check-editorial-tone] FAIL[legacy-ratchet] 원장에 있으나 본문에서 사라진 항목 ${n}건 — 고쳤다면 원장에서 빼십시오.`);
  for (const [k, c] of unmatched.slice(0, 10)) {
    const [file, rule, detail] = k.split("\u0000");
    console.error(`  ${file} «${rule}» ${detail} (x${c})`);
  }
  console.error(`  일괄 갱신: node scripts/check-editorial-tone.mjs --update-legacy`);
  bad = true;
}
if (bad) process.exit(1);

const exempt = [...consumed.values()].reduce((a, b) => a + b, 0);
console.log(
  `PASS 검사 ${targets.length}개 파일 · 신규 위반 0 · 레거시 면제 ${exempt}/${legacyTotal}건 · ` +
  `영상 ${seenVideos.size}개 전부 등록된 공식·언론 채널입니다.`
);
