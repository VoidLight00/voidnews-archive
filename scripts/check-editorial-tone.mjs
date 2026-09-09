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
 * 사용: node scripts/check-editorial-tone.mjs [editions...]
 *       인자가 없으면 lib/ab/editions/ 전체를 검사합니다.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const EDITION_DIR = "lib/ab/editions";
const REGISTRY = "references/official-video-channels.json";

const registry = JSON.parse(readFileSync(REGISTRY, "utf8"));
const videoChannel = registry.videos ?? {};
const channels = registry.channels ?? {};
const blocked = registry.blocked ?? {};

const targets = process.argv.slice(2).length
  ? process.argv.slice(2).map((n) => (n.endsWith(".ts") ? n : join(EDITION_DIR, `${n}.ts`)))
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

for (const f of findings) console.error(`FAIL[${f.rule}] ${f.file}:${f.line} ${f.detail}`);
if (stale.length) console.log(`참고: 레지스트리에만 있고 본문에 없는 영상 ${stale.length}개 — ${stale.join(", ")}`);

if (findings.length) {
  const byRule = findings.reduce((a, f) => ((a[f.rule] = (a[f.rule] ?? 0) + 1), a), {});
  console.error(`\n검사 ${targets.length}개 파일, 위반 ${findings.length}건: ${JSON.stringify(byRule)}`);
  process.exit(1);
}
console.log(`PASS 검사 ${targets.length}개 파일, 영상 ${seenVideos.size}개 전부 등록된 공식·언론 채널입니다.`);
