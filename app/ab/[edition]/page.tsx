import { notFound } from "next/navigation";
import { getAllEditionSlugs, getEdition } from "@/lib/ab/data";
import ABEditionClient from "./ABEditionClient";

export async function generateStaticParams() {
  return getAllEditionSlugs().map((edition) => ({ edition }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition } = await params;
  const data = getEdition(edition);
  if (!data) return {};
  return {
    title: `VoidNews AB — ${data.title} (${data.slug})`,
    description: `${data.theme} · ${data.highlights.length}개 엄선 · 발표일 ${data.announceDate}`,
  };
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition } = await params;
  const data = getEdition(edition);
  if (!data) notFound();

  return <ABEditionClient data={data} />;
}
