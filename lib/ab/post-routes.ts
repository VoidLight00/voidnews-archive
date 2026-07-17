// AB editions nested route 헬퍼 — /ab/<edition>/<postSlug>/
// editorial.ts 패턴 그대로 — AB highlights + editorsPicks + demoCards 모두 slug 있으면 lookup 가능.
import { editions, getEdition, type ABEdition, type ABHighlight, type ABEditorPick, type ABDemoCard } from "./data";
import type { Post } from "../data";

export interface ABPostMeta {
  post: Post;                     // PostDetail 호환
  kind: "highlight" | "editor_pick" | "demo";
  editionSlug: string;
  editionTitle: string;
  editionPeriod: string;
  editionAnnounceDate: string; // JSON-LD datePublished fallback — 기간 시작일 오염 방지(round5 N5)
  /** highlight 의 rank/sourceCompany — 가능한 경우 */
  rank?: number;
  sourceCompany?: string;
  /** editor's pick / demo 의 category */
  category?: string;
  threeLineSummary?: string[];
}

function splitThreeLineSummary(text?: string): string[] {
  if (!text) return [];
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?。])\s+|\s+—\s+|\s+-\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 3);
}

/** ABEditorPick → Post 호환 어댑터 */
function adaptEditorPickToPost(item: ABEditorPick): Post {
  return {
    date: "",
    platform: "X+Threads",
    title: item.title,
    summary: item.summary,
    content: item.body,
    source: item.sourceUrl,
    officialUrl: item.sourceUrl,
    backupUrls: item.guideUrl ? [{ label: item.guideLabel || "가이드 →", url: item.guideUrl }] : undefined,
    thumbnail: item.thumbnail,
    images: item.images,
    tags: item.tags,
    slug: item.slug,
    deck: item.deck,
  };
}

/** ABDemoCard → Post 호환 어댑터 */
function adaptDemoCardToPost(item: ABDemoCard): Post {
  return {
    date: "",
    platform: "X+Threads",
    title: item.title,
    summary: item.summary,
    content: item.body + (item.workflow ? `\n\n**워크플로**\n\n${item.workflow}` : ""),
    source: item.url,
    officialUrl: item.url,
    tags: item.tags,
    slug: item.slug,
    deck: item.deck,
  };
}

export function getABPost(
  editionSlug: string,
  postSlug: string
): ABPostMeta | null {
  const ed = getEdition(editionSlug);
  if (!ed) return null;
  // highlights
  for (const h of ed.highlights ?? []) {
    if (h.post.slug === postSlug) {
      return {
        post: h.post,
        kind: "highlight",
        editionSlug: ed.slug,
        editionTitle: ed.title,
        editionPeriod: ed.period,
        editionAnnounceDate: ed.announceDate,
        rank: h.rank,
        sourceCompany: h.sourceCompany,
        threeLineSummary: splitThreeLineSummary(h.post.summary || h.post.deck || h.post.content),
      };
    }
  }
  // editor's picks
  for (const p of ed.editorsPicks ?? []) {
    if (p.slug === postSlug) {
      return {
        post: adaptEditorPickToPost(p),
        kind: "editor_pick",
        editionSlug: ed.slug,
        editionTitle: ed.title,
        editionPeriod: ed.period,
        editionAnnounceDate: ed.announceDate,
        category: p.category,
        threeLineSummary: splitThreeLineSummary(p.summary || p.deck || p.body),
      };
    }
  }
  // demo cards
  for (const d of ed.demoCards ?? []) {
    if (d.slug === postSlug) {
      return {
        post: adaptDemoCardToPost(d),
        kind: "demo",
        editionSlug: ed.slug,
        editionTitle: ed.title,
        editionPeriod: ed.period,
        editionAnnounceDate: ed.announceDate,
        category: d.category,
        threeLineSummary: splitThreeLineSummary(d.summary || d.deck || d.body),
      };
    }
  }
  return null;
}

export function getAllABPostParams(): { edition: string; postSlug: string }[] {
  const out: { edition: string; postSlug: string }[] = [];
  for (const ed of editions) {
    for (const h of ed.highlights ?? []) {
      if (h.post.slug) out.push({ edition: ed.slug, postSlug: h.post.slug });
    }
    for (const p of ed.editorsPicks ?? []) {
      if (p.slug) out.push({ edition: ed.slug, postSlug: p.slug });
    }
    for (const d of ed.demoCards ?? []) {
      if (d.slug) out.push({ edition: ed.slug, postSlug: d.slug });
    }
  }
  return out;
}

export function getAdjacentABPosts(editionSlug: string, postSlug: string) {
  const ed = getEdition(editionSlug);
  if (!ed) return { prev: null, next: null };
  const flat: { slug: string; title: string; titleEn?: string; kind: ABPostMeta["kind"] }[] = [];
  for (const h of ed.highlights ?? []) {
    if (h.post.slug) flat.push({ slug: h.post.slug, title: h.post.title, titleEn: h.post.en?.title, kind: "highlight" });
  }
  for (const p of ed.editorsPicks ?? []) {
    if (p.slug) flat.push({ slug: p.slug, title: p.title, kind: "editor_pick" });
  }
  for (const d of ed.demoCards ?? []) {
    if (d.slug) flat.push({ slug: d.slug, title: d.title, kind: "demo" });
  }
  const idx = flat.findIndex((x) => x.slug === postSlug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: flat[idx - 1] ?? null,
    next: flat[idx + 1] ?? null,
  };
}

export function listABCards(editionSlug: string) {
  const ed = getEdition(editionSlug);
  if (!ed) return [];
  const out: { post: Post; kind: ABPostMeta["kind"] }[] = [];
  for (const h of ed.highlights ?? []) {
    if (h.post.slug) out.push({ post: h.post, kind: "highlight" });
  }
  for (const p of ed.editorsPicks ?? []) {
    if (p.slug) out.push({ post: adaptEditorPickToPost(p), kind: "editor_pick" });
  }
  for (const d of ed.demoCards ?? []) {
    if (d.slug) out.push({ post: adaptDemoCardToPost(d), kind: "demo" });
  }
  return out;
}
