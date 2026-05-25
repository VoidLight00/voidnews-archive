import { notFound } from "next/navigation";
import { getAllSlugs, getWeek, weeks } from "@/lib/data";
import WeeklyClient from "./WeeklyClient";
import EditorialWeeklyClient from "./editorial/EditorialWeeklyClient";

// 사용자 결정: w21·w22 모두 editorial 스타일 적용 (TestingCatalog 풀 페이지 라우팅)
const EDITORIAL_SLUGS = new Set(["2026-w21", "2026-w22"]);

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getWeek(slug);
  if (!data) return {};
  return {
    title: `VoidNews — Week ${data.week} (${data.period})`,
    description: `AI 뉴스 주간 포스팅 정리 ${data.period} · 총 ${data.totalPosts}건`,
  };
}

export default async function WeekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getWeek(slug);
  if (!data) notFound();

  const latestWeek = weeks[0];
  const currentIdx = weeks.findIndex((w) => w.slug === slug);
  const prevWeek = weeks[currentIdx + 1]
    ? { slug: weeks[currentIdx + 1].slug, week: weeks[currentIdx + 1].week }
    : undefined;
  const nextWeek = weeks[currentIdx - 1]
    ? { slug: weeks[currentIdx - 1].slug, week: weeks[currentIdx - 1].week }
    : undefined;

  if (EDITORIAL_SLUGS.has(slug)) {
    return (
      <EditorialWeeklyClient
        data={data}
        prevWeek={prevWeek}
        nextWeek={nextWeek}
        latestWeek={{ slug: latestWeek.slug, week: latestWeek.week }}
      />
    );
  }

  return (
    <WeeklyClient
      data={data}
      prevWeek={prevWeek}
      nextWeek={nextWeek}
      latestWeek={{ slug: latestWeek.slug, week: latestWeek.week }}
    />
  );
}
