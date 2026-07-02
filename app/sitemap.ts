import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/data";
import { getAllEditorialPostParams } from "@/lib/editorial";
import { getAllEditionSlugs } from "@/lib/ab/data";
import { getAllABPostParams } from "@/lib/ab/post-routes";

const BASE = "https://voidnews-archive.vercel.app";

// output: "export" 필수 설정 — 빌드 시점 정적 생성 명시
export const dynamic = "force-static";

// 정적 export 라 빌드 시점에 한 번 생성된다. 라우트 인벤토리는 각 페이지의
// generateStaticParams 가 쓰는 함수를 그대로 재사용 — 페이지와 sitemap 이 어긋날 수 없다.
export default function sitemap(): MetadataRoute.Sitemap {
  const weekly = getAllSlugs().map((slug) => ({
    url: `${BASE}/${slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const editorialPosts = getAllEditorialPostParams().map(({ slug, postSlug }) => ({
    url: `${BASE}/${slug}/${postSlug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const editions = getAllEditionSlugs().map((edition) => ({
    url: `${BASE}/ab/${edition}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const abPosts = getAllABPostParams().map(({ edition, postSlug }) => ({
    url: `${BASE}/ab/${edition}/${postSlug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const presentations = getAllSlugs().map((slug) => ({
    url: `${BASE}/presentation/${slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.3,
  }));

  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/ab/`, changeFrequency: "weekly", priority: 0.9 },
    ...weekly,
    ...editions,
    ...editorialPosts,
    ...abPosts,
    ...presentations,
    { url: `${BASE}/tos/`, changeFrequency: "yearly", priority: 0.1 },
  ];
}
