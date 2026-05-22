import Link from "next/link";
import { getEditionList } from "@/lib/ab/data";

export const metadata = {
  title: "VoidNews — AB 멤버십 발표",
  description: "격주 AB 멤버십 발표 섹션. VIP 큐레이션에서 엄선한 핵심 브리핑.",
};

export default function ABIndexPage() {
  const list = getEditionList();
  const featured = list[0];
  const rest = list.slice(1);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--sans)",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "56px clamp(16px, 3vw, 32px) 40px",
          background:
            "linear-gradient(180deg, var(--surface-2) 0%, var(--bg) 100%)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Link
            href="/"
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--muted)",
              textDecoration: "none",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span aria-hidden>←</span> VoidNews Weekly
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 24,
              marginBottom: 14,
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                color: "var(--gold)",
                background: "var(--accent-soft)",
                border: "1px solid var(--gold)",
                padding: "4px 10px",
                borderRadius: 999,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Members-only · VIP
            </span>
            <span
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Curated brief · Biweekly
            </span>
          </div>

          <h1
            className="headline serif"
            style={{
              fontSize: "clamp(44px, 7vw, 84px)",
              lineHeight: 0.98,
              margin: "0 0 16px",
              letterSpacing: "-0.04em",
            }}
          >
            AB Briefing<span style={{ color: "var(--accent)" }}>.</span>
          </h1>

          <p
            className="deck"
            style={{
              fontSize: "clamp(15px, 1.55vw, 19px)",
              lineHeight: 1.5,
              maxWidth: "60ch",
              marginBottom: 4,
            }}
          >
            격주로 한 페이지에 응축한 AI 산업 큐레이션. 한 주의 흐름에서 의사결정에 직접 영향을 주는 신호만 선별합니다.
          </p>
          <hr className="rule" style={{ marginTop: 36 }} />
        </div>
      </header>

      <section style={{ padding: "48px clamp(16px, 3vw, 32px) 16px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {list.length === 0 ? (
            <p
              className="mono"
              style={{
                color: "var(--muted)",
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              발표 회차가 아직 없습니다.
            </p>
          ) : (
            <>
              {featured && (
                <Link
                  href={`/ab/${featured.slug}`}
                  className="curated-shell rise-in"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "var(--text)",
                    padding: "32px 32px 30px",
                    marginBottom: 36,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                      marginBottom: 18,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        color: "var(--ink)",
                        background: "var(--gold)",
                        padding: "5px 12px",
                        borderRadius: 999,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                      }}
                    >
                      Vol. {String(featured.volume).padStart(2, "0")}
                    </span>
                    <span
                      className="kicker"
                      style={{ color: "var(--accent)" }}
                    >
                      Latest brief
                    </span>
                    <span aria-hidden style={{ color: "var(--dim)" }}>·</span>
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      {featured.period}
                    </span>
                    <span aria-hidden style={{ color: "var(--dim)" }}>·</span>
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      {featured.highlightCount} highlights
                    </span>
                  </div>

                  <h2
                    className="headline serif"
                    style={{
                      fontSize: "clamp(28px, 4.4vw, 44px)",
                      lineHeight: 1.04,
                      letterSpacing: "-0.025em",
                      margin: "0 0 18px",
                      maxWidth: "30ch",
                    }}
                  >
                    {featured.title}
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <p
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: "var(--dim)",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        margin: 0,
                      }}
                    >
                      발표일 · {featured.announceDate}
                    </p>
                    <span
                      className="mono"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 11,
                        color: "var(--accent)",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        borderBottom: "1px solid var(--accent)",
                        paddingBottom: 2,
                      }}
                    >
                      Open the brief
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <>
                  <div className="divider-label" aria-hidden style={{ marginBottom: 20 }}>
                    <span>Archive</span>
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {rest.map((e) => (
                      <li key={e.slug}>
                        <Link
                          href={`/ab/${e.slug}`}
                          className="article-card"
                          style={{
                            display: "block",
                            padding: "20px 22px",
                            textDecoration: "none",
                            color: "var(--text)",
                            height: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              flexWrap: "wrap",
                              marginBottom: 14,
                            }}
                          >
                            <span
                              className="mono"
                              style={{
                                fontSize: 10.5,
                                fontWeight: 800,
                                color: "var(--ink)",
                                background: "var(--accent)",
                                padding: "3px 9px",
                                borderRadius: 999,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                              }}
                            >
                              Vol. {String(e.volume).padStart(2, "0")}
                            </span>
                            <span
                              className="mono"
                              style={{
                                fontSize: 10.5,
                                color: "var(--muted)",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                              }}
                            >
                              {e.period}
                            </span>
                          </div>
                          <h3
                            className="article-card-title serif"
                            style={{
                              fontSize: 19,
                              fontWeight: 700,
                              letterSpacing: "-0.02em",
                              lineHeight: 1.25,
                              color: "var(--text-strong)",
                              margin: "0 0 14px",
                            }}
                          >
                            {e.title}
                          </h3>
                          <div
                            className="mono"
                            style={{
                              fontSize: 10.5,
                              color: "var(--dim)",
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 10,
                            }}
                          >
                            <span>발표 {e.announceDate}</span>
                            <span style={{ color: "var(--muted)" }}>
                              {e.highlightCount} highlights
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
