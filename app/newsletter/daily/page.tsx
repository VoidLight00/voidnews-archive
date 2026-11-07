import type { Metadata } from "next";
import { dailyDateLabel, getDailyIssues } from "@/lib/daily";
import styles from "./daily.module.css";

// 데일리 브리핑 목록(REQUIREMENTS R30). 최신 호가 위에 옵니다.

export const metadata: Metadata = {
  title: "데일리 브리핑 · VoidNews Archive",
  description: "공식 발표를 중심으로 매일 정리하는 VoidNews 데일리 브리핑의 지난 호 목록입니다.",
  alternates: { canonical: "/newsletter/daily/" },
};

export default function DailyArchivePage() {
  const issues = [...getDailyIssues()].reverse();

  return (
    <main id="main-content" lang="ko" className={styles.page} data-daily-archive="">
      <header className={styles.head}>
        <p className={styles.kicker}>Daily Briefing</p>
        <h1 className={styles.title}>데일리 브리핑</h1>
        <p className={styles.lede}>공식 발표를 중심으로 매일 AI 소식을 정리합니다. 모든 소식에 원문 출처를 함께 적습니다.</p>
      </header>

      {issues.length === 0 ? (
        <p className={styles.empty}>아직 게시한 데일리 브리핑이 없습니다.</p>
      ) : (
        <ol className={styles.archive} aria-label="지난 호">
          {issues.map((issue) => (
            <li key={issue.date}>
              <a href={`/newsletter/daily/${issue.date}/`} className={styles.archiveItem} data-daily-link={issue.date}>
                <span className={styles.archiveDate}>{dailyDateLabel(issue.date)}</span>
                <span className={styles.archiveLead}>{issue.items[0].headline}</span>
                <span className={styles.archiveMeta}>소식 {issue.items.length}건</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
