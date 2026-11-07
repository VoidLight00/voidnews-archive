#!/usr/bin/env node
// GitHub Trending(오늘) 화면을 읽어 lib/trending/<date>.json 스냅숏을 쓴다(R31).
// GitHub 은 트렌딩 API 를 제공하지 않으므로 공개 화면 HTML 을 읽는다. 구조가 바뀌어 5개 미만을 읽으면 쓰지 않고 실패한다.
// 사용: node scripts/collect-github-trending.mjs [--date YYYY-MM-DD] [--out <file>] [--html <저장된 화면>]
//       [--archive <Wayback 시각 YYYYMMDDhhmmss>]  지난 날짜는 인터넷 아카이브에 저장된 실제 화면으로 채우고 그 주소를 archive 에 남긴다
// 종료 코드: 0 저장, 1 읽기·형식 실패, 2 인자 오류
import fs from "node:fs";
import path from "node:path";

export const SOURCE = "https://github.com/trending?since=daily";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15";

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
    e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : ENTITIES[e.toLowerCase()] ?? m);
const text = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const int = (s) => (s == null ? null : Number(s.replace(/,/g, "")));

// 링크 안에 아이콘(svg)이 숫자 앞에 있으므로 링크 글자 전체에서 숫자를 읽는다
const linkNumber = (block, href) => {
  const inner = block.match(new RegExp(`href="${href}"[^>]*>([\\s\\S]*?)</a>`))?.[1];
  const m = inner && text(inner).match(/^[\d,]+$/);
  return m ? int(m[0]) : null;
};

export function parseTrending(html) {
  const blocks = html.match(/<article class="Box-row">[\s\S]*?<\/article>/g) ?? [];
  return blocks.map((b, i) => {
    const repo = b.match(/<h2[^>]*>\s*<a[^>]*href="\/([^"/]+\/[^"/]+)"/)?.[1] ?? null;
    const esc = repo?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const desc = b.match(/<p class="col-9[^"]*">([\s\S]*?)<\/p>/)?.[1];
    return {
      rank: i + 1,
      repo,
      url: repo ? `https://github.com/${repo}` : null,
      description: desc ? text(desc).slice(0, 400) : "",
      language: b.match(/itemprop="programmingLanguage">([^<]+)</)?.[1].trim() ?? null,
      stars: repo ? linkNumber(b, `/${esc}/stargazers`) : null,
      forks: repo ? linkNumber(b, `/${esc}/forks`) : null,
      starsToday: int(b.match(/([\d,]+) stars? today/)?.[1]),
    };
  });
}

export function problems(repos) {
  const bad = repos.filter((r) => !r.repo || !Number.isInteger(r.stars) || !Number.isInteger(r.starsToday) || !Number.isInteger(r.forks));
  return [
    ...(repos.length < 5 ? [`저장소 ${repos.length}개만 읽었습니다(5개 이상 필요, 화면 구조 변경 의심)`] : []),
    ...bad.map((r) => `${r.rank}위 ${r.repo ?? "(이름 없음)"}: 이름·별·포크·오늘 별 중 읽지 못한 값이 있습니다`),
  ];
}

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
}

async function main() {
  const ts = arg("--archive");
  if (ts && !/^\d{14}$/.test(ts)) {
    console.error(`아카이브 시각 형식이 틀렸습니다: ${ts}`);
    process.exit(2);
  }
  const at = ts ? new Date(`${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}T${ts.slice(8, 10)}:${ts.slice(10, 12)}:${ts.slice(12)}Z`) : new Date();
  const archive = ts ? `https://web.archive.org/web/${ts}/https://github.com/trending` : undefined;
  const date = arg("--date") ?? at.toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    console.error(`날짜 형식이 틀렸습니다: ${date}`);
    process.exit(2);
  }
  const out = arg("--out") ?? path.join("lib/trending", `${date}.json`);
  let html;
  if (arg("--html")) {
    html = fs.readFileSync(arg("--html"), "utf8");
  } else {
    const res = await fetch(ts ? `https://web.archive.org/web/${ts}id_/https://github.com/trending` : SOURCE, { headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.8" }, signal: AbortSignal.timeout(30_000) });
    if (!res.ok) {
      console.error(`FAIL[trending:fetch] HTTP ${res.status} ${archive ?? SOURCE}`);
      process.exit(1);
    }
    html = await res.text();
  }
  const repos = parseTrending(html);
  const errs = problems(repos);
  if (errs.length) {
    console.error(`FAIL[trending:parse] ${errs.join(" / ")}`);
    process.exit(1);
  }
  const snap = { date, collectedAt: at.toISOString(), source: SOURCE, ...(archive && { archive }), repos };
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(snap, null, 1) + "\n");
  console.log(`PASS[trending] ${date} 저장소 ${repos.length}개 → ${out}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error(`FAIL[trending] ${e.message}`);
    process.exit(1);
  });
}
