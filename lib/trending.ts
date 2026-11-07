import fs from "node:fs";
import path from "node:path";

// GitHub 트렌딩 스냅숏(lib/trending/YYYY-MM-DD.json)을 읽어 화면용 행을 만든다(REQUIREMENTS R31).
// 스냅숏은 매일 08:30 게시(daily_publish.py)가 scripts/collect-github-trending.mjs 로 쓰고 check-trending.mjs 가 검사한다.
// 순위 변동·NEW·추세선은 최근 WINDOW 일의 스냅숏끼리 비교한 실제 값이다. 값을 보간하거나 지어내지 않는다.

export interface TrendingRepo {
  rank: number;
  repo: string;
  url: string;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  starsToday: number;
}

export interface TrendingSnapshot {
  date: string;
  collectedAt: string;
  source: string;
  archive?: string;
  repos: TrendingRepo[];
}

// none: 비교할 전날 기록이 없음 · new: 최근 기록에 처음 등장 · back: 전날엔 없고 그전에 있었음
export type TrendingStatus = "none" | "new" | "back" | "up" | "down" | "same";

export interface TrendingRow extends TrendingRepo {
  status: TrendingStatus;
  move: number; // 전날보다 오른 계단 수(내리면 음수)
  history: number[]; // 기록이 있는 날의 전체 별 수, 오래된 날부터
}

export interface TrendingBoardData {
  date: string;
  collectedAt: string;
  source: string;
  previousDate: string | null;
  archivedDates: string[];
  rows: TrendingRow[];
}

const WINDOW = 8;
const DIR = path.join(process.cwd(), "lib", "trending");

export function getTrending(): TrendingBoardData | null {
  const names = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((n) => /^\d{4}-\d{2}-\d{2}\.json$/.test(n)).sort() : [];
  if (!names.length) return null;
  const snaps = names.slice(-WINDOW).map((n) => JSON.parse(fs.readFileSync(path.join(DIR, n), "utf8")) as TrendingSnapshot);
  const latest = snaps[snaps.length - 1];
  const prev = snaps.length > 1 ? snaps[snaps.length - 2] : null;
  const prevRank = new Map(prev?.repos.map((r) => [r.repo, r.rank]) ?? []);
  const seenBefore = new Set(snaps.slice(0, -1).flatMap((s) => s.repos.map((r) => r.repo)));

  const rows = latest.repos.map((r): TrendingRow => {
    const before = prevRank.get(r.repo);
    const move = before === undefined ? 0 : before - r.rank;
    const status: TrendingStatus = !prev
      ? "none"
      : before === undefined
        ? seenBefore.has(r.repo) ? "back" : "new"
        : move > 0 ? "up" : move < 0 ? "down" : "same";
    const history = snaps.flatMap((s) => s.repos.filter((x) => x.repo === r.repo).map((x) => x.stars));
    return { ...r, status, move, history };
  });

  return {
    date: latest.date,
    collectedAt: latest.collectedAt,
    source: latest.source,
    previousDate: prev?.date ?? null,
    archivedDates: snaps.filter((s) => s.archive).map((s) => s.date),
    rows,
  };
}

export function trendingTimeLabel(iso: string): string {
  return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Seoul" }).format(new Date(iso));
}
