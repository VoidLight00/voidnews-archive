import Link from "next/link";
import { getEditionList } from "@/lib/ab/data";

export const metadata = {
  title: "VoidNews — AB 멤버십 발표",
  description: "격주 AB 멤버십 발표 섹션. VIP 큐레이션에서 엄선한 핵심 브리핑.",
};

export default function ABIndexPage() {
  const list = getEditionList();

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
          padding: "40px 24px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--muted)",
              textDecoration: "none",
              letterSpacing: "0.08em",
            }}
          >
            ← VOIDNEWS
          </Link>
          <h1
            style={{
              fontFamily: "var(--mono)",
              marginTop: 24,
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}
          >
            AB <span style={{ color: "var(--accent)" }}>BRIEFING</span>
          </h1>
          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            격주 멤버십 발표 섹션 · VIP 큐레이션에서 엄선한 한 페이지 브리핑
          </p>
        </div>
      </header>

      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {list.length === 0 ? (
            <p
              style={{
                fontFamily: "var(--mono)",
                color: "var(--muted)",
                fontSize: 13,
              }}
            >
              발표 회차가 아직 없습니다.
            </p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {list.map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/ab/${e.slug}`}
                    style={{
                      display: "block",
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      padding: 24,
                      borderRadius: 2,
                      textDecoration: "none",
                      color: "var(--text)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      <span
                        style={{
                          background: "var(--accent)",
                          color: "#000",
                          padding: "3px 8px",
                          borderRadius: 2,
                          fontWeight: 700,
                        }}
                      >
                        VOL. {String(e.volume).padStart(2, "0")}
                      </span>
                      <span>{e.slug}</span>
                      <span style={{ color: "var(--dim)" }}>·</span>
                      <span>{e.period}</span>
                      <span style={{ color: "var(--dim)" }}>·</span>
                      <span>{e.highlightCount} HIGHLIGHTS</span>
                    </div>
                    <h2
                      style={{
                        marginTop: 14,
                        fontSize: 22,
                        fontWeight: 600,
                        lineHeight: 1.25,
                        color: "var(--text)",
                      }}
                    >
                      {e.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--mono)",
                        marginTop: 8,
                        fontSize: 11,
                        color: "var(--dim)",
                      }}
                    >
                      발표일 · {e.announceDate}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
