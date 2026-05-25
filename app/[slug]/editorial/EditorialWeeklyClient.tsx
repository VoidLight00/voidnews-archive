import Link from "next/link";
import type { WeeklyData } from "@/lib/data";
import PostCard from "./PostCard";
import styles from "./editorial.module.css";

interface Props {
  data: WeeklyData;
  prevWeek?: { slug: string; week: number };
  nextWeek?: { slug: string; week: number };
  latestWeek: { slug: string; week: number };
}

export default function EditorialWeeklyClient({ data, prevWeek, nextWeek, latestWeek }: Props) {
  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.kicker}>VoidNews · Week {data.week}</div>
          <h1 className={styles.title}>
            {data.period} AI 정리
          </h1>
          <p className={styles.subtitle}>
            공식 출처 우선, 총 {data.totalPosts}건 — 회사별 분류 + 카드 그리드
          </p>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              ← 전체 주차
            </Link>
            {prevWeek ? (
              <Link href={`/${prevWeek.slug}/`} className={styles.navLink}>
                Week {prevWeek.week}
              </Link>
            ) : null}
            {nextWeek ? (
              <Link href={`/${nextWeek.slug}/`} className={styles.navLink}>
                Week {nextWeek.week} →
              </Link>
            ) : null}
            {latestWeek.slug !== data.slug ? (
              <Link href={`/${latestWeek.slug}/`} className={styles.navLink}>
                Latest (W{latestWeek.week})
              </Link>
            ) : null}
            <Link href="/ab/2026-05b/" className={styles.navLink}>
              AB 2026-05b 발표
            </Link>
          </nav>
        </header>

        {data.companies.map((company) => (
          <section key={company.name} className={styles.companySection}>
            <header className={styles.companyHead}>
              <span
                className={styles.companyDot}
                style={{ background: company.color }}
              />
              <span className={styles.companyName}>{company.name}</span>
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
        ))}
      </div>
    </main>
  );
}
