import type { Metadata } from "next";
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
  return (
    <html lang="ko">
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
            background: "var(--header-bg, rgba(10,10,10,0.95))",
            backdropFilter: "blur(8px)",
            zIndex: 100,
          }}
        >
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
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
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
          </div>
        </header>
        {children}
        {/* Twitter/X 위젯 (트윗 임베드 + 영상) */}
        <script async src="https://platform.twitter.com/widgets.js" crossOrigin="anonymous" />
      </body>
    </html>
  );
}
