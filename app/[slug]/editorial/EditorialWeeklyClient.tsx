"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { WeeklyData } from "@/lib/data";
import { weekDateLabel } from "@/lib/data";
import PostCard from "./PostCard";
import styles from "./editorial.module.css";

interface Props {
  data: WeeklyData;
  prevWeek?: { slug: string; week: number; period: string };
  nextWeek?: { slug: string; week: number; period: string };
  latestWeek: { slug: string; week: number; period: string };
}

const ALL = "__all__";

export default function EditorialWeeklyClient({
  data,
  prevWeek,
  nextWeek,
  latestWeek,
}: Props) {
  const [companyFilter, setCompanyFilter] = useState<string>(ALL);
  const [query, setQuery] = useState<string>("");

  const companies = data.companies.map((c) => ({
    name: c.name,
    color: c.color,
    count: c.posts.length,
  }));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.companies
      .filter((c) => companyFilter === ALL || c.name === companyFilter)
      .map((c) => ({
        ...c,
        posts: c.posts.filter((p) => {
          if (!q) return true;
          return (
            p.title.toLowerCase().includes(q) ||
            (p.summary ?? "").toLowerCase().includes(q) ||
            (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
          );
        }),
      }))
      .filter((c) => c.posts.length > 0);
  }, [data.companies, companyFilter, query]);

  const totalShown = filtered.reduce((sum, c) => sum + c.posts.length, 0);

  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.kicker}>VoidNews · {weekDateLabel(data.period)}</div>
          <h1 className={styles.title}>{data.period} AI 정리</h1>
          <p className={styles.subtitle}>
            공식 출처 우선 · 총 {data.totalPosts}건 · 회사별 분류 + 카드 그리드
          </p>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              ← 전체 주차
            </Link>
            {prevWeek ? (
              <Link href={`/${prevWeek.slug}/`} className={styles.navLink}>
                ← {weekDateLabel(prevWeek.period)}
              </Link>
            ) : null}
            {nextWeek ? (
              <Link href={`/${nextWeek.slug}/`} className={styles.navLink}>
                {weekDateLabel(nextWeek.period)} →
              </Link>
            ) : null}
            {latestWeek.slug !== data.slug ? (
              <Link href={`/${latestWeek.slug}/`} className={styles.navLink}>
                최신 · {weekDateLabel(latestWeek.period)}
              </Link>
            ) : null}
            <Link href="/ab/2026-05b/" className={styles.navLink}>
              AB 2026-05b 발표
            </Link>
          </nav>
        </header>

        {/* 검색 + 회사 필터 */}
        <section className={styles.controls}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="제목·요약·태그에서 검색"
            className={styles.search}
            aria-label="포스트 검색"
          />
          <div className={styles.chipRow} role="tablist" aria-label="회사 필터">
            <button
              type="button"
              className={`${styles.chip} ${companyFilter === ALL ? styles.chipActive : ""}`}
              onClick={() => setCompanyFilter(ALL)}
              role="tab"
              aria-selected={companyFilter === ALL}
            >
              전체 <span className={styles.chipCount}>{data.totalPosts}</span>
            </button>
            {companies.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`${styles.chip} ${companyFilter === c.name ? styles.chipActive : ""}`}
                onClick={() => setCompanyFilter(c.name)}
                role="tab"
                aria-selected={companyFilter === c.name}
                style={{ ["--chip-color" as string]: c.color }}
              >
                <span className={styles.chipDot} style={{ background: c.color }} />
                {c.name}
                <span className={styles.chipCount}>{c.count}</span>
              </button>
            ))}
          </div>
          <div className={styles.controlsMeta}>
            보여진 카드 <strong>{totalShown}</strong> / 전체 {data.totalPosts}
          </div>
        </section>

        {filtered.length === 0 ? (
          <div className={styles.emptyState}>일치하는 카드가 없습니다.</div>
        ) : (
          filtered.map((company) => (
            <section key={company.name} className={styles.companySection}>
              <header className={styles.companyHead}>
                <span
                  className={styles.companyDot}
                  style={{ background: company.color }}
                />
                <span className={styles.companyName}>{company.name}</span>
                <span className={styles.companyRule} aria-hidden />
                <span className={styles.companyCount}>{company.posts.length}건</span>
              </header>
              <div className={styles.grid}>
                {company.posts.map((post) =>
                  post.slug ? (
                    <PostCard
                      key={post.slug}
                      post={post}
                      weekSlug={data.slug}
                      companyName={company.name}
                      companyColor={company.color}
                    />
                  ) : null
                )}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
