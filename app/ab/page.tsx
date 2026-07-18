import Link from "next/link";
import { getEditionList } from "@/lib/ab/data";

export const metadata = {
  title: "VoidNews — AB 멤버십 발표",
  description: "격주 AB 멤버십 발표 섹션. 핵심 신호와 발표 자료를 정리한 브리핑 아카이브.",
  alternates: { canonical: "/ab/" },
};

function formatVolume(volume: number) {
  return `VOL.${String(volume).padStart(2, "0")}`;
}

export default function ABIndexPage() {
  const list = getEditionList();
  const featured = list[0];
  const rest = list.slice(1);

  // 패널 지표 — getEditionList()가 돌려주는 실제 데이터에서만 파생한다.
  const totalCards = list.reduce((sum, edition) => sum + edition.highlightCount, 0);
  const latestPeriod = featured?.period ?? "준비 중";

  return (
    <main className="ab-page-shell ab-index-page">
      <header className="ab-index-hero">
        <div className="ab-shell-inner">
          <Link href="/" className="ab-backlink rise-in">
            <span aria-hidden>←</span>
            <span>VoidNews Weekly</span>
          </Link>

          <div className="ab-hero-grid">
            <div className="ab-hero-copy rise-in" style={{ animationDelay: "60ms" }}>
              <p className="ab-kicker">AB Members Briefing</p>
              <h1 className="ab-display-title">AI 흐름을 발표 가능한 단위로 압축합니다.</h1>
              <p className="ab-hero-deck">
                격주로 쌓이는 모델, 에이전트, 개발 도구, 산업 신호를 한 번에 읽을 수 있도록 정리한 발표용 아카이브입니다.
              </p>
            </div>

            <aside
              className="ab-index-panel rise-in"
              style={{ animationDelay: "120ms" }}
              aria-label="AB 브리핑 운영 기준"
            >
              <div>
                <span className="ab-panel-label">Cadence</span>
                <strong>격주 발행</strong>
                {featured?.nextEditionDate && (
                  <span style={{ display: "block", marginTop: 4, fontSize: 11, color: "var(--muted)" }}>
                    다음 호 {featured.nextEditionDate} 예정
                  </span>
                )}
              </div>
              <div>
                <span className="ab-panel-label">Editions</span>
                <strong>{list.length}호 누적</strong>
              </div>
              <div>
                <span className="ab-panel-label">Curated</span>
                <strong>{totalCards}개 카드</strong>
              </div>
              <div>
                <span className="ab-panel-label">Latest</span>
                <strong style={{ fontSize: "var(--text-sm)", letterSpacing: "0.04em" }}>
                  {latestPeriod}
                </strong>
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
                <Link
                  href={featured.href}
                  className="ab-featured-edition rise-in"
                  style={{ animationDelay: "160ms" }}
                  aria-label={`최신호 ${formatVolume(featured.volume)} ${featured.title} 브리핑 열기`}
                >
                  <div className="ab-featured-meta">
                    <span className="ab-pill ab-pill--filled">{formatVolume(featured.volume)}</span>
                    <span>Latest brief</span>
                    <span aria-hidden>·</span>
                    <span>{featured.period}</span>
                  </div>

                  <div className="ab-featured-grid">
                    <div>
                      <h2>{featured.title}</h2>
                      <p>
                        발표일 {featured.announceDate}
                        <span aria-hidden style={{ margin: "0 8px", color: "var(--dim)" }}>
                          ·
                        </span>
                        핵심 카드 {featured.highlightCount}개
                      </p>
                    </div>
                    <span className="ab-arrow-link" style={{ color: "var(--accent)" }}>
                      브리핑 열기 →
                    </span>
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <div className="ab-archive-block">
                  <div className="ab-section-heading">
                    <span>Archive · {rest.length}</span>
                    <span aria-hidden />
                  </div>

                  <ol className="ab-edition-list">
                    {rest.map((edition) => (
                      <li key={edition.href}>
                        <Link href={edition.href} className="ab-edition-row">
                          <span className="ab-edition-volume">{formatVolume(edition.volume)}</span>
                          <span className="ab-edition-title">{edition.title}</span>
                          <span className="ab-edition-meta">
                            {edition.period}
                            <span aria-hidden style={{ margin: "0 6px", color: "var(--dim)" }}>
                              ·
                            </span>
                            {edition.highlightCount} cards
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
