import fs from "node:fs";
import path from "node:path";

// 데일리 브리핑(REQUIREMENTS R30). 맥미니 07:25 뉴스레터 작업이 만든 데일리 호를 /newsletter/daily/<날짜>/에 싣습니다.
// 08:30 daily_publish.py가 렌더 검사를 통과한 호만 lib/daily/<날짜>.json으로 옮기고, 형식은 scripts/check-daily-issues.mjs가 막습니다.
// 주소 규칙은 뉴스레터 렌더러의 RSS 항목 링크(/newsletter/{edition}/{date})와 같습니다.

export interface DailySource {
  publisher: string;
  title: string;
  date: string;
  url: string;
  tier: string;
}

export interface DailyItem {
  headline: string;
  summary: string;
  category: string;
  sources: DailySource[];
}

export interface DailyIssue {
  edition: "daily";
  date: string;
  author: { name: string; kind: string };
  items: DailyItem[];
}

const DIR = path.join(process.cwd(), "lib", "daily");
const FILE = /^\d{4}-\d{2}-\d{2}\.json$/;

/** 오래된 순입니다. 파일 이름이 날짜라 이름순이 곧 날짜순입니다. */
export function getDailyIssues(): DailyIssue[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((name) => FILE.test(name))
    .sort()
    .map((name) => JSON.parse(fs.readFileSync(path.join(DIR, name), "utf8")) as DailyIssue);
}

const LABEL = new Intl.DateTimeFormat("ko-KR", { dateStyle: "full", timeZone: "UTC" });

/** "2026-11-06" → "2026년 11월 6일 금요일". 날짜만 있는 값이라 UTC 자정으로 읽어 하루가 밀리지 않게 합니다. */
export function dailyDateLabel(date: string): string {
  return LABEL.format(new Date(`${date}T00:00:00Z`));
}
