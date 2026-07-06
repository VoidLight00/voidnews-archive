// NewsArticle JSON-LD 빌더 — 뉴스 상세 페이지 리치 결과 자격용.
// 값이 없는 필드는 넣지 않는다(검색엔진이 빈 값을 싫어함).
const SITE = "https://voidnews-archive.vercel.app";
const PUBLISHER = {
  "@type": "Organization",
  name: "VoidNews Archive",
  url: SITE,
};

interface NewsArticleInput {
  title: string;
  description?: string;
  imageSrc?: string;
  path: string; // 앞에 "/" 포함, 뒤 trailing slash 포함
  datePublished?: string; // "M/D" 또는 "YYYY-MM-DD" — year 힌트와 합쳐 정규화
  yearHint?: number; // "M/D" 형식일 때 연도 보충 (데이터에 연도가 없음)
  section?: string;
}

// 데이터의 날짜가 "5/11"(연도 없음) 또는 "2026-06-11" 혼재.
// 완전한 YYYY-MM-DD로 정규화 가능할 때만 반환, 아니면 undefined(잘못된 날짜 주입 방지).
function toIsoDate(raw?: string, yearHint?: number): string | undefined {
  if (!raw) return undefined;
  const iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
  const md = raw.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (md && yearHint) return `${yearHint}-${md[1].padStart(2, "0")}-${md[2].padStart(2, "0")}`;
  return undefined;
}

export function newsArticleLd(input: NewsArticleInput): string {
  const url = `${SITE}${input.path}`;
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.title.slice(0, 110),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    publisher: PUBLISHER,
  };
  if (input.description) ld.description = input.description;
  if (input.imageSrc) {
    ld.image = [input.imageSrc.startsWith("http") ? input.imageSrc : `${SITE}${input.imageSrc}`];
  }
  const iso = toIsoDate(input.datePublished, input.yearHint);
  if (iso) ld.datePublished = iso;
  if (input.section) ld.articleSection = input.section;
  return JSON.stringify(ld);
}

// BreadcrumbList — Home > 상위 > 현재. 각 crumb는 {name, path("/"~"/")}.
export function breadcrumbLd(crumbs: { name: string; path: string }[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  });
}
