// voidnews-archive Supabase — anon (browser + RLS-bound server) client
// 브라우저와 서버 양쪽에서 사용 가능. RLS 정책 안에서만 읽기.
// service_role key 가 필요한 경우 lib/supabase-server.ts 의 createServerClient() 사용.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL 환경변수가 비어 있습니다.");
if (!anonKey) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY 환경변수가 비어 있습니다.");

export const supabase: SupabaseClient = createClient(url, anonKey, {
  auth: { persistSession: false },
});

// ============================================================
// Typed helpers — 빌드 타임 read 패턴
// ============================================================
export type WeeklyRow = {
  slug: string;
  year: number;
  week: number;
  period: string;
  total_posts: number;
  intro: string | null;
  closing: string | null;
  meta: Record<string, unknown>;
};

export type ABRow = {
  slug: string;
  volume: number;
  title: string;
  theme: string | null;
  period: string;
  covered_weeks: string[];
  announce_date: string | null;
  intro: string | null;
  closing: string | null;
  meta: Record<string, unknown>;
};

export type PostRow = {
  id: string;
  slug: string | null;
  kind: "weekly" | "ab_highlight" | "ab_editor_pick" | "ab_demo";
  weekly_slug: string | null;
  ab_slug: string | null;
  rank: number | null;
  tier: "hero" | "feature" | "normal" | "discovery" | null;
  date: string | null;
  platform: string | null;
  category: string | null;
  title: string;
  deck: string | null;
  summary: string | null;
  content: string | null;
  source_url: string | null;
  official_url: string | null;
  backup_urls: { label: string; url: string }[];
  thumbnail: { src: string; alt: string } | null;
  images: { src: string; alt: string; caption?: string }[];
  gallery_images: { src: string; alt: string; caption?: string }[];
  video_url: string | null;
  threads_embed_url: string | null;
  tags: string[];
  featured: boolean;
  read_minutes: number | null;
  source_company: string | null;
  key_quote: string | null;
  editorial: string | null;
  meta: Record<string, unknown>;
};

export type I18nRow = {
  id: string;
  entity_type: "post" | "weekly" | "ab" | "ui_label";
  entity_id: string;
  field: string;
  locale: "ko" | "en";
  value: string;
  source: string;
  confidence: number | null;
  reviewed: boolean;
};

/** 헬퍼: 빌드 타임에 모든 weekly editions 가져오기. */
export async function fetchAllWeeklies(): Promise<WeeklyRow[]> {
  const { data, error } = await supabase
    .from("weekly_editions")
    .select("*")
    .order("year", { ascending: false })
    .order("week", { ascending: false });
  if (error) throw error;
  return (data ?? []) as WeeklyRow[];
}

/** 헬퍼: 빌드 타임에 모든 AB editions 가져오기. */
export async function fetchAllABEditions(): Promise<ABRow[]> {
  const { data, error } = await supabase
    .from("ab_editions")
    .select("*")
    .order("announce_date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ABRow[];
}

/** 헬퍼: 특정 weekly 의 모든 카드. */
export async function fetchPostsByWeekly(weeklySlug: string): Promise<PostRow[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("weekly_slug", weeklySlug)
    .order("rank", { ascending: true, nullsFirst: false });
  if (error) throw error;
  return (data ?? []) as PostRow[];
}

/** 헬퍼: 특정 AB edition 의 모든 카드 (highlight + editor's pick). */
export async function fetchPostsByAB(abSlug: string): Promise<PostRow[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("ab_slug", abSlug)
    .order("rank", { ascending: true, nullsFirst: false });
  if (error) throw error;
  return (data ?? []) as PostRow[];
}

/** 헬퍼: 빌드 타임 i18n lookup. */
export async function fetchI18n(
  entityType: I18nRow["entity_type"],
  entityIds: string[],
  locale: I18nRow["locale"]
): Promise<Map<string, Record<string, string>>> {
  if (entityIds.length === 0) return new Map();
  const { data, error } = await supabase
    .from("i18n_translations")
    .select("entity_id,field,value")
    .eq("entity_type", entityType)
    .eq("locale", locale)
    .in("entity_id", entityIds);
  if (error) throw error;
  const map = new Map<string, Record<string, string>>();
  for (const row of data ?? []) {
    const r = row as { entity_id: string; field: string; value: string };
    if (!map.has(r.entity_id)) map.set(r.entity_id, {});
    map.get(r.entity_id)![r.field] = r.value;
  }
  return map;
}
