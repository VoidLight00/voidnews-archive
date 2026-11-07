import { getTrending, trendingTimeLabel } from "@/lib/trending";
import TrendingBoard from "./TrendingBoard";
import styles from "./trending.module.css";

// 주간 화면 옆의 작은 트렌딩 위젯(REQUIREMENTS R31). 오늘 별이 가장 많이 늘어난 5개를 보여 준다.
// 서버 구성요소라서 주간 화면(page.tsx)이 만들어 WeeklyClient 의 자리(aside)로 넘긴다.
export default function TrendingWidget() {
  const data = getTrending();
  if (!data) return null;
  return (
    <aside className={styles.widget} aria-labelledby="trending-widget-title" lang="ko" data-trending-widget="">
      <div className={styles.widgetHead}>
        <p className={styles.kicker}>Trending</p>
        <h2 id="trending-widget-title" className={styles.widgetTitle}>오늘 급증한 GitHub 저장소</h2>
        <p className={styles.stamp}>GitHub Trending · {trendingTimeLabel(data.collectedAt)} 기준</p>
      </div>
      <TrendingBoard rows={data.rows} variant="compact" label="오늘 별 증가순 상위 5개" />
      <a className={styles.more} href="/trending/">
        전체 순위 보기 <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
