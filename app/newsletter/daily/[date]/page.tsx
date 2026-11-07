import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorBadge } from "@/app/components/AuthorBadge";
import { dailyDateLabel, getDailyIssues } from "@/lib/daily";
import styles from "../daily.module.css";

// 데일리 브리핑 한 호(REQUIREMENTS R30). 구성은 오늘의 소식 목차 → 소식별 요약·출처 → 이전·다음 호입니다.
// AI가 쓴 호라서 머리에 피움 작성 라벨을 붙입니다(R21, check-ai-author-label.mjs의 표시 위치).

export const dynamicParams = false;

export function generateStaticParams() {
  return getDailyIssues().map(({ date }) => ({ date }));
}

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }): Promise<Metadata> {
  const { date } = await params;
  const issue = getDailyIssues().find((x) => x.date === date);
  if (!issue) return {};
  const rest = issue.items.length - 1;
  return {
    title: `데일리 브리핑 ${date} · VoidNews Archive`,
    description: rest > 0 ? `${issue.items[0].headline} 외 ${rest}건` : issue.items[0].headline,
    alternates: { canonical: `/newsletter/daily/${date}/` },
  };
}

export default async function DailyIssuePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const issues = getDailyIssues();
  const at = issues.findIndex((x) => x.date === date);
  if (at < 0) notFound();
  const issue = issues[at];
  const prev = issues[at - 1];
  const next = issues[at + 1];

  return (
    <main id="main-content" lang="ko" className={styles.page} data-daily-issue={date}>
      <p className={styles.crumb}>
        <a href="/newsletter/daily/">데일리 브리핑</a>
      </p>
      <header className={styles.head}>
        <p className={styles.kicker}>Daily Briefing</p>
        <h1 className={styles.title}>{dailyDateLabel(date)}</h1>
        <div className={styles.byline}>
          <AuthorBadge subject={{ scope: "daily", slug: date, title: `데일리 브리핑 ${date}` }} locale="ko" />
          <span className={styles.bylineMeta}>소식 {issue.items.length}건 · 공식 출처 기준</span>
        </div>
      </header>

      <nav className={styles.toc} aria-labelledby="daily-toc-title">
        <h2 id="daily-toc-title" className={styles.tocTitle}>
          오늘의 소식
        </h2>
        <ol className={styles.tocList}>
          {issue.items.map((item, k) => (
            <li key={k}>
              <a href={`#item-${k + 1}`}>{item.headline}</a>
            </li>
          ))}
        </ol>
      </nav>

      <ol className={styles.items}>
        {issue.items.map((item, k) => (
          <li key={k} id={`item-${k + 1}`} className={styles.item} data-daily-item="">
            <article aria-labelledby={`item-${k + 1}-title`}>
              <p className={styles.itemMeta}>
                <span className={styles.itemNumber}>{String(k + 1).padStart(2, "0")}</span>
                <span className={styles.itemCategory}>{item.category}</span>
              </p>
              <h2 id={`item-${k + 1}-title`} className={styles.itemTitle}>
                {item.headline}
              </h2>
              <p className={styles.itemSummary}>{item.summary}</p>
              <p className={styles.sourcesLabel}>출처</p>
              <ul className={styles.sources}>
                {item.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} className={styles.sourceLink}>
                      {source.publisher} · {source.title}
                    </a>
                    <span className={styles.sourceDate}> ({source.date})</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      <nav className={styles.pager} aria-label="다른 날짜의 데일리 브리핑">
        {prev ? (
          <a href={`/newsletter/daily/${prev.date}/`} rel="prev" className={styles.pagerLink}>
            <span className={styles.pagerHint}>이전 호</span>
            {dailyDateLabel(prev.date)}
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a href={`/newsletter/daily/${next.date}/`} rel="next" className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className={styles.pagerHint}>다음 호</span>
            {dailyDateLabel(next.date)}
          </a>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
