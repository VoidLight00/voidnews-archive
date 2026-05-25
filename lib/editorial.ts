// Editorial route 전용 헬퍼 — w21/w22의 post를 slug로 lookup
import { getWeek, weeks, type Post, type WeeklyData } from "./data";

// w21·w22 editorial nested route (`/2026-wNN/[postSlug]/page.tsx`)
export const EDITORIAL_WEEKS = ["2026-w21", "2026-w22"] as const;
export type EditorialWeekSlug = (typeof EDITORIAL_WEEKS)[number];

export function isEditorialWeek(slug: string): slug is EditorialWeekSlug {
  return (EDITORIAL_WEEKS as readonly string[]).includes(slug);
}

export interface EditorialPostMeta {
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
  for (const weekSlug of EDITORIAL_WEEKS) {
    const week = getWeek(weekSlug);
    if (!week) continue;
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
