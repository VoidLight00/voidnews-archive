import { weeks } from "@/lib/data";
import { weekDateLabel } from "@/lib/week-label";
import { editions } from "@/lib/ab/data";

const BASE = "https://voidnews-archive.vercel.app";

// output: "export" — 빌드 시점에 out/rss.xml 정적 파일로 생성된다.
export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// "6/22 ~ 6/28" + year → 종료일 Date (주간 발행 기준일)
function weekEndDate(period: string, year: number): Date {
  const end = (period.split("~").pop() || "").trim();
  const [m, d] = end.split("/").map((x) => parseInt(x, 10));
  return new Date(Date.UTC(year, (m || 1) - 1, d || 1, 9)); // 09:00 UTC ≈ 18:00 KST
}

type FeedItem = { title: string; link: string; description: string; date: Date };

export async function GET() {
  const weeklyItems: FeedItem[] = weeks.map((w) => ({
    title: `VoidNews Weekly — ${w.year}년 ${weekDateLabel(w.period)}`,
    link: `${BASE}/${w.slug}/`,
    description: `AI 뉴스 ${w.totalPosts}건 — ${w.companies.map((c) => c.name).join(" · ")}`,
    date: weekEndDate(w.period, w.year),
  }));

  const abItems: FeedItem[] = editions.map((e) => ({
    title: `AB Vol.${e.volume} — ${e.title}`,
    link: `${BASE}/ab/${e.slug}/`,
    description: e.theme || e.intro.slice(0, 160),
    date: new Date(`${e.announceDate}T09:00:00Z`),
  }));

  const items = [...weeklyItems, ...abItems].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>VoidNews — AI 뉴스 아카이브</title>
    <link>${BASE}/</link>
    <description>AI 뉴스 주간 포스팅 아카이브와 격주 AB 브리핑 by @voidlight00</description>
    <language>ko</language>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${esc(i.link)}</link>
      <guid isPermaLink="true">${esc(i.link)}</guid>
      <description>${esc(i.description)}</description>
      <pubDate>${i.date.toUTCString()}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
