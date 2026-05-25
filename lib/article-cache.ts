// Build-time article cache reader — public/article-cache/_manifest.json 에서
// 공식 본문 발췌(영문 단락 + 헤딩 + 인용 + og 메타)를 server component에서 직접 import.
// 환각 0 — AI가 본문을 새로 만들지 않고 공식 발췌만 그대로 인용.
import fs from "node:fs";
import path from "node:path";

export interface ArticleCacheEntry {
  url: string;
  finalUrl?: string;
  status?: number;
  title?: string | null;
  description?: string | null;
  paragraphs?: string[];
  headings?: { level: number; text: string }[];
  quotes?: string[];
  fetchedAt?: number;
  error?: string;
}

let cache: Record<string, ArticleCacheEntry> | null = null;

function loadManifest(): Record<string, ArticleCacheEntry> {
  if (cache) return cache;
  const file = path.join(process.cwd(), "public/article-cache/_manifest.json");
  if (!fs.existsSync(file)) {
    cache = {};
    return cache;
  }
  try {
    cache = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, ArticleCacheEntry>;
  } catch {
    cache = {};
  }
  return cache;
}

export function getArticleCache(slug: string): ArticleCacheEntry | null {
  const manifest = loadManifest();
  return manifest[slug] ?? null;
}
