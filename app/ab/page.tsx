import Link from "next/link";
import { getEditionList } from "@/lib/ab/data";

export const metadata = {
  title: "VoidNews — AB 멤버십 발표",
  description: "격주 AB 멤버십 발표 섹션. 핵심 신호와 발표 자료를 정리한 브리핑 아카이브.",
};

function formatVolume(volume: number) {
  return `VOL.${String(volume).padStart(2, "0")}`;
}

export default function ABIndexPage() {
  const list = getEditionList();
  const featured = list[0];
  const rest = list.slice(1);

  return (
    <main className="ab-page-shell ab-index-page">
      <header className="ab-index-hero">
        <div className="ab-shell-inner">
          <Link href="/" className="ab-backlink">
            <span aria-hidden>←</span>
            <span>VoidNews Weekly</span>
          </Link>

          <div className="ab-hero-grid">
            <div className="ab-hero-copy">
              <p className="ab-kicker">AB Members Briefing</p>
              <h1 className="ab-display-title">AI 흐름을 발표 가능한 단위로 압축합니다.</h1>
              <p className="ab-hero-deck">
                격주로 쌓이는 모델, 에이전트, 개발 도구, 산업 신호를 한 번에 읽을 수 있도록 정리한 발표용 아카이브입니다.
              </p>
            </div>

            <aside className="ab-index-panel" aria-label="AB 브리핑 운영 기준">
              <div>
                <span className="ab-panel-label">Cadence</span>
                <strong>Biweekly</strong>
              </div>
              <div>
                <span className="ab-panel-label">Scope</span>
                <strong>{list.length} editions</strong>
              </div>
              <div>
                <span className="ab-panel-label">Use</span>
                <strong>Presentation-ready</strong>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section className="ab-index-content" aria-label="AB 브리핑 회차 목록">
        <div className="ab-shell-inner">
          {list.length === 0 ? (
            <p className="ab-empty-state">발표 회차가 아직 없습니다.</p>
          ) : (
            <>
              {featured && (
                <Link href={`/ab/${featured.slug}`} className="ab-featured-edition">
                  <div className="ab-featured-meta">
                    <span className="ab-pill ab-pill--filled">{formatVolume(featured.volume)}</span>
                    <span>Latest brief</span>
                    <span>{featured.period}</span>
                  </div>

                  <div className="ab-featured-grid">
                    <div>
                      <h2>{featured.title}</h2>
                      <p>발표일 {featured.announceDate} · {featured.highlightCount}개 핵심 카드</p>
                    </div>
                    <span className="ab-arrow-link">브리핑 열기 →</span>
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <div className="ab-archive-block">
                  <div className="ab-section-heading">
                    <span>Archive</span>
                    <span aria-hidden />
                  </div>

                  <ol className="ab-edition-list">
                    {rest.map((edition) => (
                      <li key={edition.slug}>
                        <Link href={`/ab/${edition.slug}`} className="ab-edition-row">
                          <span className="ab-edition-volume">{formatVolume(edition.volume)}</span>
                          <span className="ab-edition-title">{edition.title}</span>
                          <span className="ab-edition-meta">
                            {edition.announceDate} · {edition.highlightCount} cards
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
