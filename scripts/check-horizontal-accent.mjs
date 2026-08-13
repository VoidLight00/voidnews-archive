#!/usr/bin/env node
// check-horizontal-accent.mjs — 컬러 가로 accent line 금지 HARD 게이트
//
// 왜: 카드·섹션 위아래에 굵은 컬러 가로 막대를 두는 건 좌측 세로 스트라이프와 같은
// 부류의 AI 티다. 2026-08-13 AB VIP 카드에서 --gold 3px 가로줄로 재발했고, 그때는
// 산문 규칙만 있어서 컴포넌트를 새로 만들 때마다 되살아났다.
//
// 캐논 게이트(~/.claude/qa-canon/no_horizontal_accent_gate.sh)와 같은 규칙을
// 리포 안에 자체 구현한다. 캐논을 shell out 하면 Vercel 빌더에 그 경로가 없어
// exit 127 로 배포가 막힌다(FAILURE_LOG VN-CI-01 과 같은 함정).
//
// 차단: border-top/bottom 이 2px 이상이면서 색이 accent 계열
//       (var(--gold) / var(--accent) / var(--kicker) / ${accent} / ${companyColor}
//        / amber·yellow 유틸 / 하드코딩 hex)
// 허용: 1px, 중립색(--rule, --border, --border2), transparent, hr, accent-color
//
// exit 0 = 통과, 2 = 위반
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SCAN = ["app", "components", "lib"].map((d) => path.join(ROOT, d)).filter((d) => fs.existsSync(d));
const EXT = new Set([".tsx", ".ts", ".jsx", ".css"]);
const SKIP = new Set(["node_modules", ".next", "_workspace", ".git"]);

const ACCENT = /var\(--(gold|accent|kicker)\)|\$\{[a-zA-Z]*[aA]ccent[a-zA-Z]*\}|\$\{[a-zA-Z]*[cC]olor\}|#[0-9a-fA-F]{3,8}/;
const JS_BORDER = /border(Bottom|Top)\s*:\s*[`"'][^`"']*?(\d+)px\s+(solid|double|dashed)/;
const CSS_BORDER = /border-(bottom|top)\s*:\s*(\d+)px\s+(solid|double|dashed)/;
const TW_BORDER = /border-(b|t)-(2|4|8)(?![0-9])/;
const TW_ACCENT = /(amber|yellow)-\d|gold|accent/;

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(path.extname(e.name))) yield p;
  }
}

const hits = [];
let files = 0;
for (const root of SCAN) {
  for (const file of walk(root)) {
    files++;
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      const rel = path.relative(ROOT, file);
      let m = line.match(JS_BORDER) || line.match(CSS_BORDER);
      if (m && Number(m[2]) >= 2 && ACCENT.test(line)) {
        hits.push(`${rel}:${i + 1}: ${line.trim().slice(0, 110)}`);
        return;
      }
      if (TW_BORDER.test(line) && TW_ACCENT.test(line)) {
        hits.push(`${rel}:${i + 1}: ${line.trim().slice(0, 110)}`);
      }
    });
  }
}

if (hits.length) {
  console.error(`FAIL[check-horizontal-accent] 컬러 가로 accent line ${hits.length}건 (스캔 ${files}파일)`);
  for (const h of hits) console.error(`  ${h}`);
  console.error("  → 1px 중립 hairline(var(--rule)/var(--border2))으로 바꾸거나 점·라벨·배경 틴트를 쓰십시오.");
  process.exit(2);
}
console.log(`[check-horizontal-accent] ✓ 컬러 가로 accent line 0건 (${files} files scanned)`);
