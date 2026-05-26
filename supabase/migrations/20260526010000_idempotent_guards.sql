-- voidnews-archive — enum/policy 멱등 가드
-- create type / create policy 는 IF NOT EXISTS 미지원이라 do $$ block 으로 감싼다.
-- 재실행 안전성을 위한 추가 마이그레이션.

do $$
begin
  if not exists (select 1 from pg_type where typname = 'post_tier') then
    create type public.post_tier as enum ('hero', 'feature', 'normal', 'discovery');
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'post_kind') then
    create type public.post_kind as enum ('weekly', 'ab_highlight', 'ab_editor_pick', 'ab_demo');
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'locale') then
    create type public.locale as enum ('ko', 'en');
  end if;
end $$;

-- policy 재실행 안전 (drop + recreate)
drop policy if exists "anon read weekly" on public.weekly_editions;
create policy "anon read weekly" on public.weekly_editions
  for select to anon using (true);

drop policy if exists "anon read ab" on public.ab_editions;
create policy "anon read ab" on public.ab_editions
  for select to anon using (true);

drop policy if exists "anon read posts" on public.posts;
create policy "anon read posts" on public.posts
  for select to anon using (true);

drop policy if exists "anon read i18n" on public.i18n_translations;
create policy "anon read i18n" on public.i18n_translations
  for select to anon using (true);
