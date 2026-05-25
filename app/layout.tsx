import type { Metadata } from "next";
import Script from "next/script";
import ThemeToggle from "./ThemeToggle";
import TodayStamp from "./TodayStamp";
import { getLatestSlug, getWeekList } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoidNews Archive",
  description: "AI 뉴스 주간 포스팅 아카이브 by @voidlight00",
  openGraph: {
    title: "VoidNews Archive",
    description: "AI 뉴스 주간 포스팅 아카이브",
    siteName: "VoidNews",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Anti-flicker: apply stored theme before body paints
  const themeInit = `
(function(){try{var t=localStorage.getItem('voidnews-theme')||'light';if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){document.documentElement.setAttribute('data-theme','light');}})();
`;

  const latestSlug = getLatestSlug();
  const weeks = getWeekList();
  const latest = weeks.find((week) => week.slug === latestSlug);
  const issueLabel = latest
    ? `VOL. ${String(latest.year).slice(-2)}.${String(latest.week).padStart(2, "0")}`
    : "ARCHIVE";

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* Pretendard Variable — 한글·영문 디스플레이 폰트 (editorial UI 전용) */}
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-screen" style={{ background: "var(--bg)" }}>
        {/* Masthead — date stamp + issue label */}
        <div
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: "0.16em",
            color: "var(--muted)",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              maxWidth: 1480,
              margin: "0 auto",
              padding: "8px clamp(16px, 3vw, 32px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <TodayStamp />
            <span style={{ display: "inline-flex", gap: 14, color: "var(--dim)" }}>
              <span style={{ color: "var(--gold)" }}>{issueLabel}</span>
              <span aria-hidden>·</span>
              <span>AI Intelligence Weekly</span>
              <span aria-hidden>·</span>
              <span>Seoul</span>
            </span>
          </div>
        </div>

        {/* Primary nav — sticky publication header */}
        <header
          className="nav-shadow"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "var(--header-bg)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            className="site-nav-row"
            style={{
              maxWidth: 1480,
              margin: "0 auto",
              padding: "0 clamp(16px, 3vw, 32px)",
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div className="site-nav-main" style={{ display: "flex", gap: 28, alignItems: "center", minWidth: 0 }}>
              <a
                href={`/${latestSlug}`}
                aria-label="VoidNews 최신호"
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 4,
                  textDecoration: "none",
                  color: "var(--text)",
                }}
              >
                <span
                  className="serif"
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    color: "var(--text-strong)",
                  }}
                >
                  VoidNews
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    paddingLeft: 4,
                  }}
                >
                  Archive
                </span>
              </a>

              <nav
                aria-label="Primary"
                className="site-nav-links scroll-hide"
                style={{
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                  paddingLeft: 12,
                  borderLeft: "1px solid var(--border)",
                  height: 28,
                }}
              >
                <a
                  href={`/${latestSlug}`}
                  className="mono"
                  style={{
                    fontSize: 11.5,
                    color: "var(--text)",
                    textDecoration: "none",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "6px 10px",
                    borderRadius: 2,
                  }}
                >
                  Weekly
                </a>
                <a
                  href="/ab"
                  className="mono"
                  style={{
                    fontSize: 11.5,
                    color: "var(--text)",
                    textDecoration: "none",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "6px 10px",
                    borderRadius: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  AB Briefing
                  <span
                    aria-hidden
                    style={{
                      fontSize: 9,
                      color: "var(--accent)",
                      border: "1px solid var(--accent)",
                      padding: "1px 5px",
                      borderRadius: 999,
                      letterSpacing: "0.14em",
                    }}
                  >
                    VIP
                  </span>
                </a>
              </nav>
            </div>

            <div className="site-nav-social" style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <a
                href="https://www.threads.com/@voidlight00"
                target="_blank"
                rel="noopener noreferrer"
                className="mono"
                style={{
                  color: "var(--muted)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Threads
              </a>
              <a
                href="https://x.com/VoidLight_Hyeon"
                target="_blank"
                rel="noopener noreferrer"
                className="mono"
                style={{
                  color: "var(--muted)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                X
              </a>
              <span aria-hidden style={{ width: 1, height: 18, background: "var(--border)" }} />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {children}

        {/* Footer colophon */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--surface)",
            marginTop: 64,
          }}
        >
          <div
            style={{
              maxWidth: 1480,
              margin: "0 auto",
              padding: "32px clamp(16px, 3vw, 32px)",
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                className="serif"
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--text-strong)",
                  letterSpacing: "-0.02em",
                  marginBottom: 6,
                }}
              >
                VoidNews
              </p>
              <p
                className="mono"
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Edited by VOIDLIGHT · Seoul · 2026
              </p>
            </div>
            <div
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--dim)",
                textAlign: "right",
              }}
            >
              <p>An AI intelligence archive — fair use, source-linked.</p>
              <p style={{ marginTop: 4 }}>
                <a
                  href="https://www.threads.com/@voidlight00"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--muted)", textDecoration: "none" }}
                >
                  @voidlight00
                </a>
                <span style={{ margin: "0 8px", color: "var(--dim)" }}>·</span>
                <a
                  href="https://x.com/VoidLight_Hyeon"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--muted)", textDecoration: "none" }}
                >
                  @VoidLight_Hyeon
                </a>
              </p>
            </div>
          </div>
        </footer>

        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
