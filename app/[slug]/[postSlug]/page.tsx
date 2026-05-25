import { notFound } from "next/navigation";
import {
  getAdjacentPosts,
  getAllEditorialPostParams,
  getEditorialPost,
  isEditorialWeek,
  listEditorialCards,
} from "@/lib/editorial";
import { getArticleCache } from "@/lib/article-cache";
import PostDetail from "../editorial/PostDetail";

export async function generateStaticParams() {
  return getAllEditorialPostParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; postSlug: string }>;
}) {
  const { slug, postSlug } = await params;
  const meta = getEditorialPost(slug, postSlug);
  if (!meta) return {};
  return {
    title: `${meta.post.title} — VoidNews ${slug}`,
    description: meta.post.summary ?? meta.post.title,
    openGraph: {
      title: meta.post.title,
      description: meta.post.summary ?? "",
      images: meta.post.thumbnail ? [{ url: meta.post.thumbnail.src }] : undefined,
    },
  };
}

export default async function EditorialPostPage({
  params,
}: {
  params: Promise<{ slug: string; postSlug: string }>;
}) {
  const { slug, postSlug } = await params;
  if (!isEditorialWeek(slug)) notFound();
  const meta = getEditorialPost(slug, postSlug);
  if (!meta) notFound();

  const { prev, next } = getAdjacentPosts(slug, postSlug);
  const article = getArticleCache(postSlug);

  // 같은 회사 다른 글 6개 추천
  const all = listEditorialCards(slug);
  const related = all
    .filter(
      (item) =>
        item.companyName === meta.companyName &&
        item.post.slug !== postSlug
    )
    .slice(0, 6);

  return (
    <PostDetail
      meta={meta}
      prev={prev}
      next={next}
      weekSlug={slug}
      article={article}
      related={related}
    />
  );
}
