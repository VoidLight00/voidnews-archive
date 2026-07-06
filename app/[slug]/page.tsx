import { notFound } from "next/navigation";
import { getAllSlugs, getWeek, getWeekList, weeks, weekDateLabel } from "@/lib/data";
import WeeklyClient from "./WeeklyClient";
import EditorialWeeklyClient from "./editorial/EditorialWeeklyClient";

// 사용자 결정:
// - w21: editorial 카드 그리드 UI (TestingCatalog 스타일)
// - w22: 기존 w20 스타일(WeeklyClient) 외관 + 카드 클릭 시 nested route 풀 페이지 이동 (모달 비활성화)
const EDITORIAL_SLUGS = new Set(["2026-w21"]);
const NESTED_ROUTE_SLUGS = new Set(["2026-w21", "2026-w22"]);

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getWeek(slug);
  if (!data) return {};
  return {
    title: `VoidNews — ${weekDateLabel(data.period)} (${data.period})`,
    description: `AI 뉴스 주간 포스팅 정리 ${data.period} · 총 ${data.totalPosts}건`,
    alternates: { canonical: `/${slug}/` },
  };
}

export default async function WeekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getWeek(slug);
  if (!data) notFound();

  const latestWeek = weeks[0];
  const currentIdx = weeks.findIndex((w) => w.slug === slug);
  const prevWeek = weeks[currentIdx + 1]
    ? { slug: weeks[currentIdx + 1].slug, week: weeks[currentIdx + 1].week, period: weeks[currentIdx + 1].period }
    : undefined;
  const nextWeek = weeks[currentIdx - 1]
    ? { slug: weeks[currentIdx - 1].slug, week: weeks[currentIdx - 1].week, period: weeks[currentIdx - 1].period }
    : undefined;

  if (EDITORIAL_SLUGS.has(slug)) {
    return (
      <EditorialWeeklyClient
        data={data}
        prevWeek={prevWeek}
        nextWeek={nextWeek}
        latestWeek={{ slug: latestWeek.slug, week: latestWeek.week, period: latestWeek.period }}
      />
    );
  }

  const nestedRoutePrefix = NESTED_ROUTE_SLUGS.has(slug) ? `/${slug}` : undefined;

  return (
    <WeeklyClient
      data={data}
      prevWeek={prevWeek}
      nextWeek={nextWeek}
      latestWeek={{ slug: latestWeek.slug, week: latestWeek.week, period: latestWeek.period }}
      weekList={getWeekList()}
      nestedRoutePrefix={nestedRoutePrefix}
    />
  );
}
