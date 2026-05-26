-- voidnews-archive init schema
-- 4개 핵심 테이블: weekly_editions, ab_editions, posts, i18n_translations
-- Public read-only via RLS (anon). 쓰기는 service_role 만.

-- ============================================================
-- 1. weekly_editions — 주간 archive
-- ============================================================
create table if not exists public.weekly_editions (
  slug text primary key,                    -- "2026-w22"
  year int not null,
  week int not null,
  period text not null,                     -- "2026-05-22 ~ 2026-05-28"
  total_posts int not null default 0,
  intro text,
  closing text,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists weekly_editions_year_week_idx
  on public.weekly_editions(year desc, week desc);

-- ============================================================
-- 2. ab_editions — AI & Beyond 격주 발표
-- ============================================================
create table if not exists public.ab_editions (
  slug text primary key,                    -- "2026-05b"
  volume int not null,
  title text not null,
  theme text,
  period text not null,
  covered_weeks text[] default '{}',
  announce_date date,
  intro text,
  closing text,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists ab_editions_announce_idx
  on public.ab_editions(announce_date desc);

-- ============================================================
-- 3. posts — 카드 1장 = 1 row. weekly + AB 모두 참조 가능.
-- ============================================================
create type public.post_tier as enum ('hero', 'feature', 'normal', 'discovery');
create type public.post_kind as enum ('weekly', 'ab_highlight', 'ab_editor_pick', 'ab_demo');

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique,                         -- editorial route /[week]/[postSlug]
  kind public.post_kind not null,
  weekly_slug text references public.weekly_editions(slug) on delete cascade,
  ab_slug text references public.ab_editions(slug) on delete cascade,
  rank int,                                 -- AB highlight 순위
  tier public.post_tier,
  date text,                                -- "5/19" 짧은 표기
  platform text,                            -- "X" | "Threads" | "X+Threads"
  category text,                            -- editor's pick category
  title text not null,
  deck text,                                -- 카드 grid sub-headline (50자 내외)
  summary text,
  content text,
  source_url text,
  official_url text,
  backup_urls jsonb default '[]'::jsonb,
  thumbnail jsonb,                          -- { src, alt }
  images jsonb default '[]'::jsonb,
  gallery_images jsonb default '[]'::jsonb,
  video_url text,
  threads_embed_url text,
  tags text[] default '{}',
  featured boolean default false,
  read_minutes int,
  source_company text,
  key_quote text,
  editorial text,                           -- 큐레이터 한 줄 의도
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists posts_weekly_idx on public.posts(weekly_slug);
create index if not exists posts_ab_idx on public.posts(ab_slug);
create index if not exists posts_kind_idx on public.posts(kind);
create index if not exists posts_tags_idx on public.posts using gin(tags);

-- ============================================================
-- 4. i18n_translations — 카드/페이지 텍스트 KO/EN 번역
-- ============================================================
create type public.locale as enum ('ko', 'en');

create table if not exists public.i18n_translations (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,                -- "post" | "weekly" | "ab" | "ui_label"
  entity_id text not null,                  -- post.id or slug
  field text not null,                      -- "title" | "deck" | "summary" | "content" | ...
  locale public.locale not null,
  value text not null,
  source text default 'manual',             -- "manual" | "vgrok" | "deepl" | "gpt"
  confidence numeric(3,2),                  -- 0.00 ~ 1.00 (자동 번역 신뢰도)
  reviewed boolean default false,           -- 사람이 검수 완료
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (entity_type, entity_id, field, locale)
);
create index if not exists i18n_lookup_idx
  on public.i18n_translations(entity_type, entity_id, locale);

-- ============================================================
-- updated_at triggers
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists weekly_editions_updated on public.weekly_editions;
create trigger weekly_editions_updated before update on public.weekly_editions
  for each row execute function public.set_updated_at();

drop trigger if exists ab_editions_updated on public.ab_editions;
create trigger ab_editions_updated before update on public.ab_editions
  for each row execute function public.set_updated_at();

drop trigger if exists posts_updated on public.posts;
create trigger posts_updated before update on public.posts
  for each row execute function public.set_updated_at();

drop trigger if exists i18n_updated on public.i18n_translations;
create trigger i18n_updated before update on public.i18n_translations
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security — anon public read-only
-- ============================================================
alter table public.weekly_editions enable row level security;
alter table public.ab_editions enable row level security;
alter table public.posts enable row level security;
alter table public.i18n_translations enable row level security;

-- anon read
create policy "anon read weekly" on public.weekly_editions
  for select to anon using (true);
create policy "anon read ab" on public.ab_editions
  for select to anon using (true);
create policy "anon read posts" on public.posts
  for select to anon using (true);
create policy "anon read i18n" on public.i18n_translations
  for select to anon using (true);

-- service_role 은 RLS bypass 기본 (정책 불필요)

comment on schema public is 'voidnews-archive — Next.js 16 정적 사이트의 빌드 타임 read source. 모든 쓰기는 service_role.';
