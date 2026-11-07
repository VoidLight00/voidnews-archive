import type { Metadata } from "next";
import ThemeToggle from "./ThemeToggle";
import TodayStamp from "./TodayStamp";
import LocaleToggle from "./LocaleToggle";
import { LocaleProvider } from "./LocaleProvider";
import { getLatestSlug, getWeekList } from "@/lib/data";
import {
  CHANNELS,
  GUIDE_LINKS,
  HEADER_CHANNELS,
  SUBSCRIBE_LINK,
  channelLinkProps,
  getChannel,
} from "@/lib/site-links";
import "./globals.css";
import "./runway.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://voidnews-archive.vercel.app"),
  title: "VoidNews Archive",
  description: "AI 뉴스 주간 포스팅 아카이브 by @voidlight00",
  alternates: {
    // canonical은 라우트별 generateMetadata에서 지정 — 전역 상속 시 전 페이지가 홈을 정본 선언하는 SEO 결함
    types: { "application/rss+xml": "/rss.xml" }, // 피드 리더 자동 발견
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "ai-training": "no",
    noai: "true",
    noimageai: "true",
  },
  openGraph: {
    title: "VoidNews Archive",
    description: "AI 뉴스 주간 포스팅 아카이브",
    siteName: "VoidNews",
  },
};

// 운영자 채널 7개, 바닥글 안내 링크, 구독 링크는 lib/site-links.ts 한 곳에서 정의합니다(리뉴얼 계획 R1·R4).

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 첫 화면을 그리기 전에 테마를 정합니다. 저장값(voidnews-theme)이 'light'·'dark'이면 그 값을,
  // 그 밖에는 시스템 설정(prefers-color-scheme)을 씁니다. 저장소와 matchMedia 접근은 모두
  // try/catch로 감싸므로, 막힌 브라우저에서도 본문이 읽히고 globals.css의 세 겹 선택자가 동작합니다.
  // 이후 시스템 변경 추종과 수동 선택 저장은 app/ThemeToggle.tsx가 맡습니다.
  const themeInit = `
(function(){var d=document.documentElement,t=null;try{var s=window.localStorage.getItem('voidnews-theme');if(s==='light'||s==='dark'){t=s;}}catch(e){}if(!t){try{t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}catch(e){t='light';}}d.setAttribute('data-theme',t);})();
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
        <LocaleProvider>
        <a href="#main-content" className="vn-skip-link">본문으로 바로가기</a>
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
            <span className="site-masthead-meta" style={{ display: "inline-flex", gap: 14, color: "var(--dim)" }}>
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
                  href="/newsletter/daily/"
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
                  Daily
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
              {/* X·Threads·GitHub — 480px 이하에서는 숨기고 바닥글 '연결' 묶음으로 대신합니다. */}
              {HEADER_CHANNELS.map(({ id, label }) => (
                <a
                  key={id}
                  {...channelLinkProps(getChannel(id))}
                  className="mono site-nav-ext"
                  style={{
                    color: "var(--muted)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
              <a href={SUBSCRIBE_LINK.href} className="site-nav-subscribe">
                {SUBSCRIBE_LINK.label}
              </a>
              <span aria-hidden style={{ width: 1, height: 18, background: "var(--border)" }} />
              <LocaleToggle />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {children}

        {/* Footer colophon — '연결' 7개와 '안내' 링크는 lib/site-links.ts에서 읽습니다. */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--surface)",
            marginTop: 64,
          }}
        >
          <div className="site-footer-inner">
            <div className="site-footer-brand">
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
              <p className="mono site-footer-meta" style={{ color: "var(--muted)" }}>
                Edited by VOIDLIGHT · Seoul · 2026
              </p>
              <p className="mono site-footer-meta" style={{ marginTop: 4 }}>
                An AI intelligence archive — fair use, source-linked.
              </p>
            </div>
            <div className="site-footer-nav">
              <nav aria-labelledby="site-footer-channels" className="site-footer-group">
                <p id="site-footer-channels" className="site-footer-label">연결</p>
                <ul className="site-footer-links">
                  {CHANNELS.map((channel) => (
                    <li key={channel.id}>
                      <a {...channelLinkProps(channel)}>{channel.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-labelledby="site-footer-guide" className="site-footer-group">
                <p id="site-footer-guide" className="site-footer-label">안내</p>
                <ul className="site-footer-links">
                  {GUIDE_LINKS.map((link) => (
                    <li key={link.id}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="site-footer-note">
                내용 정정과 제보는 이메일이나 카카오 일대일 문의로 받습니다.
              </p>
              <p className="mono site-footer-meta site-footer-legal">
                © 2026 VoidLight · No AI training · 무단 전재 및 AI 학습 금지 · 한국 저작권법 제136조
              </p>
            </div>
          </div>
        </footer>
        {/* X 위젯 스크립트는 X 게시물을 보여 주는 컴포넌트(previews.tsx, media.tsx XPostEmbed)가 필요할 때만 불러옵니다.
            모든 화면에서 부르면 X 게시물이 없는 처리방침·구독 안내 화면에서도 방문자 접속 정보가 X로 갑니다. */}
        </LocaleProvider>
      </body>
    </html>
  );
}
