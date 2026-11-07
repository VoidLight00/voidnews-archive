import type { Metadata } from "next";
import { getTrending, trendingTimeLabel } from "@/lib/trending";
import TrendingBoard from "./TrendingBoard";
import styles from "./trending.module.css";

// GitHub 트렌딩 전체 화면(REQUIREMENTS R31). 매일 08:30 게시가 저장한 GitHub Trending(오늘) 순위를 그대로 싣는다.

export const metadata: Metadata = {
  title: "GitHub 트렌딩 · VoidNews Archive",
  description: "GitHub Trending 오늘 순위와 저장소별 별 증가량, 순위 변동을 매일 정리합니다.",
  alternates: { canonical: "/trending/" },
};

const short = (d: string) => `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`;

export default function TrendingPage() {
  const data = getTrending();

  return (
    <main id="main-content" lang="ko" className={styles.page} data-trending-page="">
      <header className={styles.head}>
        <p className={styles.kicker}>GitHub Trending</p>
        <h1 className={styles.title}>오늘의 GitHub 트렌딩</h1>
        <p className={styles.lede}>
          GitHub Trending의 오늘 순위를 매일 한 번 저장합니다. 숫자는 저장한 시점의 값이고, 순위 변동과 NEW 표시는 전날 기록과 비교한 결과입니다.
        </p>
        {data ? <p className={styles.stamp}>{trendingTimeLabel(data.collectedAt)} 기준 · 저장소 {data.rows.length}개</p> : null}
      </header>

      {data ? (
        <TrendingBoard rows={data.rows} variant="full" label="GitHub 트렌딩 저장소" />
      ) : (
        <p className={styles.empty}>아직 저장한 트렌딩 기록이 없습니다.</p>
      )}

      {data ? (
        <section className={styles.note} aria-label="출처와 기준">
          <p>
            출처: <a href={data.source} target="_blank" rel="noopener noreferrer">GitHub Trending(오늘)<span className={styles.srOnly}>, 새 탭</span></a>.
            {data.previousDate ? ` 순위 변동은 ${short(data.previousDate)} 기록과 비교했습니다.` : " 비교할 전날 기록이 아직 없습니다."}
            {" "}추세선은 최근 8일 가운데 순위에 있었던 날의 전체 별 수를 이은 선입니다.
          </p>
          {data.archivedDates.length ? (
            <p>
              {data.archivedDates.map(short).join(", ")} 기록은 인터넷 아카이브(Wayback Machine)에 저장된 GitHub Trending 화면에서 가져왔습니다.
            </p>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}
