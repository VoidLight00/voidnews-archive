import type { Metadata } from "next";
import Script from "next/script";
import ThemeToggle from "./ThemeToggle";
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
  // 플리커 방지: body 렌더 전에 localStorage의 테마를 즉시 적용
  const themeInit = `
(function(){try{var t=localStorage.getItem('voidnews-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();
`;

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen" style={{ background: "var(--bg)" }}>
        {/* Navbar */}
        <header
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "0 24px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            background: "var(--header-bg)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a
              href="/"
              style={{
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text)",
                textDecoration: "none",
              }}
            >
              VOID<span style={{ color: "#E87040" }}>NEWS</span>
            </a>
            <nav style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <a
                href="/"
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  textDecoration: "none",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Weekly
              </a>
              <a
                href="/ab"
                style={{
                  fontSize: 12,
                  color: "#E87040",
                  textDecoration: "none",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "1px solid #E87040",
                  padding: "4px 8px",
                  borderRadius: 2,
                }}
              >
                AB ▸
              </a>
            </nav>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a
              href="https://www.threads.com/@voidlight00"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--muted)", fontSize: 13, textDecoration: "none" }}
            >
              Threads
            </a>
            <a
              href="https://x.com/VoidLight_Hyeon"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--muted)", fontSize: 13, textDecoration: "none" }}
            >
              X
            </a>
            <ThemeToggle />
          </div>
        </header>
        {children}
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
