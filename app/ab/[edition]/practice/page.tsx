import { notFound } from "next/navigation";
import { getAllEditionSlugs, getEdition, getEditionHref } from "@/lib/ab/data";
import { rehearsal2026_08b } from "@/lib/ab/rehearsal-2026-08b";
import PracticeClient from "./PracticeClient";

export async function generateStaticParams() {
  return getAllEditionSlugs().filter((slug) => slug === "2026-08b" || slug === "2026-08-27").map((edition) => ({ edition }));
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }) {
  const { edition } = await params;
  const data = getEdition(edition);
  if (!data || data.slug !== "2026-08b") return {};
  return {
    title: `모바일 발표 연습 — ${data.title}`,
    description: "AI&Beyond 최종 6장과 발표 대본을 카드별로 맞춘 모바일 연습 모드",
    alternates: { canonical: `${getEditionHref(data)}/practice/` },
  };
}

export default async function PracticePage({ params }: { params: Promise<{ edition: string }> }) {
  const { edition } = await params;
  const data = getEdition(edition);
  if (!data || data.slug !== "2026-08b") notFound();

  return <PracticeClient steps={rehearsal2026_08b} editionHref={getEditionHref(data)} />;
}
