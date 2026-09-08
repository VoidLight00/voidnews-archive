// Weekly article helpers — resolve published posts by slug.
import { getWeek, weeks, type Post } from "./data";

export function isEditorialWeek(slug: string): boolean {
  return getWeek(slug) !== undefined;
}

interface EditorialPostMeta {
  post: Post;
  companyName: string;
  companyColor: string;
  weekSlug: string;
  weekPeriod: string;
}

export function getEditorialPost(
  weekSlug: string,
  postSlug: string
): EditorialPostMeta | null {
  const week = getWeek(weekSlug);
  if (!week) return null;
  for (const company of week.companies) {
    for (const post of company.posts) {
      if (post.slug === postSlug) {
        return {
          post,
          companyName: company.name,
          companyColor: company.color,
          weekSlug: week.slug,
          weekPeriod: week.period,
        };
      }
    }
  }
  return null;
}

export function getAllEditorialPostParams(): { slug: string; postSlug: string }[] {
  const out: { slug: string; postSlug: string }[] = [];
  for (const week of weeks) {
    const weekSlug = week.slug;
    for (const company of week.companies) {
      for (const post of company.posts) {
        if (post.slug) out.push({ slug: weekSlug, postSlug: post.slug });
      }
    }
  }
  return out;
}

// 같은 week 내 인접 post (prev/next) — 같은 회사 안에서 우선, 없으면 전체에서
export function getAdjacentPosts(weekSlug: string, postSlug: string) {
  const week = getWeek(weekSlug);
  if (!week) return { prev: null, next: null };
  const flat: { post: Post; companyName: string; companyColor: string }[] = [];
  for (const company of week.companies) {
    for (const post of company.posts) {
      if (post.slug) flat.push({ post, companyName: company.name, companyColor: company.color });
    }
  }
  const idx = flat.findIndex((x) => x.post.slug === postSlug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: flat[idx - 1] ?? null,
    next: flat[idx + 1] ?? null,
  };
}

export function listEditorialCards(weekSlug: string) {
  const week = getWeek(weekSlug);
  if (!week) return [];
  const out: {
    post: Post;
    companyName: string;
    companyColor: string;
  }[] = [];
  for (const company of week.companies) {
    for (const post of company.posts) {
      if (post.slug) out.push({ post, companyName: company.name, companyColor: company.color });
    }
  }
  return out;
}
