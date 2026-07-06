import { notFound } from "next/navigation";
import {
  getABPost,
  getAllABPostParams,
  getAdjacentABPosts,
  listABCards,
} from "@/lib/ab/post-routes";
import { getArticleCache } from "@/lib/article-cache";
import { newsArticleLd, breadcrumbLd } from "@/lib/jsonld";
import PostDetail from "@/app/[slug]/editorial/PostDetail";

// Edition slug 별 accent color — companyColor 자리에 사용
const ACCENT_BY_KIND = {
  highlight: "#1B365D",
  editor_pick: "#B8860B",
  demo: "#4A5568",
} as const;

export async function generateStaticParams() {
  return getAllABPostParams().map((p) => ({
    edition: p.edition,
    postSlug: p.postSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ edition: string; postSlug: string }>;
}) {
  const { edition, postSlug } = await params;
  const meta = getABPost(edition, postSlug);
  if (!meta) return {};
  return {
    title: `${meta.post.title} — VoidNews AB ${edition}`,
    description: meta.post.summary ?? meta.post.deck ?? meta.post.title,
    alternates: { canonical: `/ab/${edition}/${postSlug}/` },
    openGraph: {
      title: meta.post.title,
      description: meta.post.summary ?? meta.post.deck ?? "",
      images: meta.post.thumbnail ? [{ url: meta.post.thumbnail.src }] : undefined,
    },
  };
}

export default async function ABPostPage({
  params,
}: {
  params: Promise<{ edition: string; postSlug: string }>;
}) {
  const { edition, postSlug } = await params;
  const meta = getABPost(edition, postSlug);
  if (!meta) notFound();

  const { prev, next } = getAdjacentABPosts(edition, postSlug);
  const article = getArticleCache(postSlug);

  // PostDetail props 어댑트 — weekly schema 에 맞춰 변환
  const sectionLabel =
    meta.kind === "highlight"
      ? meta.sourceCompany ?? "AB Highlight"
      : meta.category ?? (meta.kind === "editor_pick" ? "Editor's Pick" : "Demo");
  const sectionColor = ACCENT_BY_KIND[meta.kind];

  const adaptedMeta = {
    post: meta.post,
    companyName: sectionLabel,
    companyColor: sectionColor,
    weekSlug: `ab/${edition}`,
    weekPeriod: meta.editionPeriod,
    threeLineSummary: meta.threeLineSummary,
  };

  const adaptedPrev = prev
    ? {
        post: {
          date: "",
          platform: "X+Threads" as const,
          title: prev.title,
          slug: prev.slug,
        },
        companyName: ACCENT_BY_KIND[prev.kind] ? sectionLabel : "AB",
        companyColor: ACCENT_BY_KIND[prev.kind],
      }
    : null;
  const adaptedNext = next
    ? {
        post: {
          date: "",
          platform: "X+Threads" as const,
          title: next.title,
          slug: next.slug,
        },
        companyName: ACCENT_BY_KIND[next.kind] ? sectionLabel : "AB",
        companyColor: ACCENT_BY_KIND[next.kind],
      }
    : null;

  // 같은 edition 의 다른 카드 6장 추천 (자기 자신 제외)
  const all = listABCards(edition);
  const related = all
    .filter((c) => c.post.slug !== postSlug)
    .slice(0, 6)
    .map((c) => ({
      post: c.post,
      companyName: sectionLabel,
      companyColor: ACCENT_BY_KIND[c.kind],
    }));

  const ld = newsArticleLd({
    title: meta.post.title,
    description: meta.post.summary ?? meta.post.deck ?? undefined,
    imageSrc: meta.post.thumbnail?.src,
    path: `/ab/${edition}/${postSlug}/`,
    datePublished: meta.post.date || meta.editionPeriod,
    yearHint: Number(edition.slice(0, 4)) || undefined,
    section: sectionLabel,
  });
  const crumbs = breadcrumbLd([
    { name: "VoidNews", path: "/" },
    { name: "AB 발표", path: "/ab/" },
    { name: edition, path: `/ab/${edition}/` },
    { name: meta.post.title, path: `/ab/${edition}/${postSlug}/` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: crumbs }} />
      <PostDetail
        meta={adaptedMeta}
        prev={adaptedPrev}
        next={adaptedNext}
        weekSlug={`ab/${edition}`}
        article={article}
        related={related}
      />
    </>
  );
}
