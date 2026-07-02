"use client";

import { useEffect, useCallback, useRef, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick, ABDemoCard } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";
import { HighlightArticle, DemoCard, EditorPickCard } from "./components/cards";
import { Modal, type ModalContent } from "./components/PickModal";

/* ════════════════════════════════════════════════════════════
   메인 클라이언트 컴포넌트
═══════════════════════════════════════════════════════════════ */

export default function ABEditionClient({ data }: { data: ABEdition }) {
  const [modal, setModal] = useState<ModalContent | null>(null);
  const [expandedRank, setExpandedRank] = useState<number | null>(null);
  const openModal = useCallback((c: ModalContent) => setModal(c), []);
  const closeModal = useCallback(() => setModal(null), []);
  const toggleHighlight = useCallback((rank: number) => {
    setExpandedRank((current) => (current === rank ? null : rank));
  }, []);

  const highlights = [...data.highlights].sort((a, b) => a.rank - b.rank);

  return (
    <>
      {/* ───── 모달 ───── */}
      {modal && <Modal content={modal} onClose={closeModal} />}

      {/* ───── AB 메인 grid 스타일 오버라이드 (스코프: .ab-edition-grid 내부만) ───── */}
      <style>{`
        .ab-edition-grid {
          gap: clamp(18px, 2.1vw, 30px);
        }
        .ab-edition-grid .tc-feed-card {
          border-radius: 0;
          background: color-mix(in srgb, var(--card), var(--surface) 18%);
          transition:
            transform 0.18s ease,
            border-color 0.18s ease,
            background 0.18s ease;
        }
        .ab-edition-grid .tc-feed-card:hover {
          transform: translateY(-2px);
          border-color: var(--text);
          background: var(--card-hover);
          box-shadow: none;
        }
        .ab-edition-grid .tc-source-thumb--card {
          aspect-ratio: 16 / 10;
          border-bottom: 1px solid var(--border);
        }
        .ab-edition-grid .tc-source-thumb img {
          filter: grayscale(0.16) saturate(0.9) contrast(1.04);
        }
        .ab-edition-grid .tc-feed-body {
          gap: 11px;
          padding: clamp(18px, 1.8vw, 24px);
        }
        .ab-edition-grid .tc-feed-meta {
          font-size: 10px;
          letter-spacing: 0.14em;
          gap: 7px;
          color: var(--muted);
          margin-bottom: 2px;
        }
        .ab-edition-grid .tc-feed-title {
          font-size: clamp(19px, 1.65vw, 24px);
          line-height: 1.18;
          letter-spacing: -0.03em;
          font-weight: 680;
          color: var(--text-strong, var(--text));
          margin: 4px 0 2px;
          text-decoration: none;
          -webkit-line-clamp: 3;
        }
        .ab-edition-grid .tc-feed-summary {
          font-size: 13.5px;
          line-height: 1.58;
          color: var(--muted);
          -webkit-line-clamp: 3;
        }
        .ab-edition-grid .tc-feed-footer {
          border-top: 1px solid var(--border);
          margin-top: 4px;
          padding-top: 12px;
          font-size: 10px;
          letter-spacing: 0.16em;
        }
      `}</style>

      <main className="ab-page-shell">
        {/* ───── Header ───── */}
        <header className="ab-index-hero">
          <div className="ab-shell-inner" style={{ maxWidth: 1120 }}>
            <nav
              aria-label="Breadcrumb"
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--muted)",
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
                VoidNews
              </Link>
              <span style={{ color: "var(--dim)" }}>/</span>
              <Link href="/ab" style={{ color: "var(--muted)", textDecoration: "none" }}>
                AB Briefing
              </Link>
              <span style={{ color: "var(--dim)" }}>/</span>
              <span style={{ color: "var(--text)" }}>{data.slug}</span>
            </nav>

            <div className="ab-hero-grid" style={{ alignItems: "start" }}>
              <div className="ab-hero-copy">
                <p className="ab-kicker" style={{ color: "var(--gold)" }}>
                  VoidLight Letter · {data.period}
                </p>
                <h1 className="ab-display-title" style={{ maxWidth: "15ch" }}>{data.title}</h1>
                <p className="ab-hero-deck" style={{ color: "var(--text-soft)", maxWidth: "46ch" }}>
                  {data.theme}
                </p>
              </div>

              <aside className="ab-index-panel" aria-label="이번 호 메타데이터">
                <div>
                  <span className="ab-panel-label">Edition</span>
                  <strong>VOL.{String(data.volume).padStart(2, "0")}</strong>
                </div>
                <div>
                  <span className="ab-panel-label">Published</span>
                  <strong>{data.announceDate}</strong>
                </div>
                <div>
                  <span className="ab-panel-label">Cards</span>
                  <strong>{data.highlights.length} highlights</strong>
                </div>
              </aside>
            </div>

            {data.coreFlow && data.coreFlow.length > 0 ? (
              <section className="ab-core-flow" aria-label="이번 호 핵심 흐름">
                <span className="ab-core-flow__label mono">이번 호 핵심 흐름</span>
                <ol>
                  {data.coreFlow.map((flow, index) => (
                    <li key={flow}>
                      <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                      <p>{flow}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
          </div>
        </header>

        {/* ───── Intro ───── */}
        <section
          style={{
            padding: "clamp(34px, 6vw, 54px) clamp(16px, 3vw, 32px)",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="divider-label" aria-hidden style={{ marginBottom: 18 }}>
              <span>여는 글</span>
            </div>
            <p
              className="serif dropcap"
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "clamp(17px, 2.3vw, 20px)",
                lineHeight: 1.78,
                color: "var(--text)",
                margin: 0,
              }}
            >
              {stripMarkdown(data.intro)}
            </p>
          </div>
        </section>

        {/* ───── Highlights ───── */}
        <section
          style={{
            padding: "0 clamp(16px, 3vw, 32px) clamp(28px, 5vw, 40px)",
          }}
        >
          <div style={{ maxWidth: 1440, margin: "0 auto" }}>
            <div
              style={{
                borderTop: "3px double var(--rule)",
                paddingTop: 28,
                marginBottom: 22,
              }}
            >
              <span className="kicker" style={{ color: "var(--accent)" }}>
                핵심 브리핑 카드
              </span>
              <h2
                className="serif"
                style={{
                  marginTop: 10,
                  fontSize: "clamp(24px, 3.4vw, 34px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "var(--text-strong)",
                  lineHeight: 1.1,
                }}
              >
                핵심 흐름을 발표 순서대로 읽습니다
              </h2>
              <p
                className="deck"
                style={{
                  marginTop: 10,
                  maxWidth: "62ch",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--text-soft)",
                }}
              >
                카드를 열면 발표용 설명, 검증 출처, 관련 게시글을 같은 맥락 안에서 확인할 수 있습니다.
              </p>
            </div>
            <div role="list" className="tc-article-grid ab-edition-grid">
              {highlights.map((h) => (
                <HighlightArticle
                  key={h.rank}
                  item={h}
                  expanded={expandedRank === h.rank}
                  onToggle={toggleHighlight}
                  editionSlug={data.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {data.editorsPicks && data.editorsPicks.length > 0 && (
          <section
            style={{
              padding:
                "clamp(32px, 5vw, 48px) clamp(16px, 3vw, 32px) clamp(24px, 4vw, 32px)",
            }}
          >
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <div
                style={{
                  borderTop: "3px double var(--rule)",
                  paddingTop: 28,
                  marginBottom: 22,
                }}
              >
                <span className="kicker" style={{ color: "var(--gold)" }}>
                  Editor&apos;s toolkit
                </span>
                <h2
                  className="serif"
                  style={{
                    marginTop: 10,
                    fontSize: "clamp(22px, 3.2vw, 28px)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    color: "var(--text-strong)",
                    lineHeight: 1.12,
                  }}
                >
                  실무에 바로 연결되는 도구와 참고 자료
                </h2>
                <p
                  className="deck"
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    lineHeight: 1.55,
                    maxWidth: "60ch",
                    color: "var(--text-soft)",
                  }}
                >
                  발표자가 검토한 도구 중 작업 흐름에 붙이기 쉬운 자료만 따로 정리했습니다.
                </p>
              </div>
              <div className="tc-article-grid ab-edition-grid">
                {data.editorsPicks.map((pick, i) => (
                  <EditorPickCard key={i} item={pick} onOpen={openModal} editionSlug={data.slug} />
                ))}
              </div>
            </div>
          </section>
        )}

        {data.demoCards && data.demoCards.length > 0 && (
          <section
            style={{
              padding:
                "clamp(32px, 5vw, 48px) clamp(16px, 3vw, 32px) clamp(24px, 4vw, 32px)",
            }}
          >
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <div
                style={{
                  borderTop: "3px double var(--rule)",
                  paddingTop: 28,
                  marginBottom: 22,
                }}
              >
                <span className="kicker" style={{ color: "var(--gold)" }}>
                  Demo showcase
                </span>
                <h2
                  className="serif"
                  style={{
                    marginTop: 10,
                    fontSize: "clamp(22px, 3.2vw, 28px)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    color: "var(--text-strong)",
                    lineHeight: 1.12,
                  }}
                >
                  실전 데모 — 영상으로 바로 보기
                </h2>
              </div>
              <div style={{ display: "grid", gap: 20 }}>
                {data.demoCards.map((card, i) => (
                  <DemoCard key={i} item={card} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ───── Closing ───── */}
        <section
          style={{
            padding:
              "clamp(32px, 5vw, 48px) clamp(16px, 3vw, 32px) clamp(48px, 8vw, 72px)",
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              borderTop: "3px double var(--rule)",
              paddingTop: 36,
            }}
          >
            <div className="divider-label" aria-hidden style={{ marginBottom: 16 }}>
              <span>마무리</span>
            </div>
            <p
              className="serif"
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "clamp(15px, 2vw, 17px)",
                lineHeight: 1.85,
                color: "var(--text)",
                margin: 0,
              }}
            >
              {stripMarkdown(data.closing)}
            </p>
          </div>
        </section>

        {/* ───── Footer ───── */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--surface)",
            padding: "28px clamp(16px, 3vw, 32px)",
          }}
        >
          <div
            className="mono"
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 12,
              fontSize: 10.5,
              color: "var(--muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ color: "var(--dim)" }}>다룬 주차</span>
              {data.coveredWeeks.map((w) => (
                <Link
                  key={w}
                  href={`/${w}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 28,
                    color: "var(--text)",
                    textDecoration: "none",
                    border: "1px solid var(--border2)",
                    padding: "0 11px",
                    borderRadius: "var(--radius-pill)",
                    transition: "border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
                  }}
                >
                  {w}
                </Link>
              ))}
            </div>
            <Link
              href="/ab"
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span aria-hidden>←</span> AB 발표 목록
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
