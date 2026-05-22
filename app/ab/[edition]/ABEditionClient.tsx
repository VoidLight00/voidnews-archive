"use client";

import { useEffect, useCallback, useRef, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick, ABDemoCard } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";

/* ────────── URL 자동 링크화 ──────────
   stripMarkdown 후 평문 안에 남아있는 http(s) URL을
   클릭 가능한 <a>로 변환. 카드 외부에서 상위 onClick으로
   모달이 열리는 걸 막기 위해 stopPropagation. */
declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

const URL_MATCH_REGEX = /^https?:\/\/[^\s)\]]+$/;

function renderRichText(text: string): ReactNode {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*\n]+?\*\*|https?:\/\/[^\s)\]]+)/g);

  return parts.map((part, i) => {
    if (!part) return null;
    if (URL_MATCH_REGEX.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            color: "var(--accent)",
            textDecoration: "underline",
            wordBreak: "break-all",
          }}
        >
          {part}
        </a>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "var(--text)", fontWeight: 800 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

type SourceLink = { label: string; url: string; primary?: boolean };

function collectSourceLinks({
  officialUrl,
  source,
  backupUrls,
}: {
  officialUrl?: string;
  source?: string;
  backupUrls?: { label: string; url: string }[];
}): SourceLink[] {
  const links: SourceLink[] = [];
  const seen = new Set<string>();
  const add = (link: SourceLink) => {
    if (!link.url || seen.has(link.url)) return;
    seen.add(link.url);
    links.push(link);
  };

  const officialLabel = backupUrls?.find((link) => link.url === officialUrl)?.label || "공식 링크";
  if (officialUrl) add({ label: officialLabel, url: officialUrl, primary: true });
  if (source) add({ label: "SOURCE", url: source });
  for (const link of backupUrls || []) add(link);

  return links;
}

function SourceButton({ link }: { link: SourceLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "var(--mono)",
        fontSize: 12,
        color: link.primary ? "#000" : "var(--accent)",
        background: link.primary ? "var(--accent)" : "transparent",
        border: link.primary ? "1px solid var(--accent)" : "1px solid var(--border2)",
        padding: "8px 14px",
        borderRadius: 2,
        textDecoration: "none",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {link.label} →
    </a>
  );
}

/* ════════════════════════════════════════════════════════════
   유틸 컴포넌트
═══════════════════════════════════════════════════════════════ */

function RankBadge({ rank, tier }: { rank: number; tier: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        color: "var(--muted)",
      }}
    >
      <span
        style={{
          border: "1px solid var(--border2)",
          borderRadius: 2,
          padding: "2px 8px",
        }}
      >
        #{String(rank).padStart(2, "0")}
      </span>
      <span
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--dim)",
        }}
      >
        {tier}
      </span>
    </span>
  );
}

function CompanyTag({ name }: { name: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        color: "var(--muted)",
      }}
    >
      {name}
    </span>
  );
}

function TagList({ tags, limit = 8 }: { tags?: string[]; limit?: number }) {
  if (!tags || tags.length === 0) return null;
  return (
    <>
      {tags.slice(0, limit).map((tag) => (
        <span
          key={tag}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--dim)",
          }}
        >
          #{tag}
        </span>
      ))}
    </>
  );
}

function ThumbnailPreview({
  image,
  tone = "accent",
}: {
  image?: { src: string; alt: string; caption?: string };
  tone?: "accent" | "gold";
}) {
  if (!image) return null;
  const color = tone === "gold" ? "var(--gold)" : "var(--accent)";
  return (
    <figure
      style={{
        marginTop: 16,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
        borderRadius: 4,
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          aspectRatio: "16 / 9",
          objectFit: "cover",
        }}
      />
      {image.caption && (
        <figcaption
          style={{
            borderTop: `1px solid ${color}`,
            padding: "8px 10px",
            fontFamily: "var(--mono)",
            fontSize: 11,
            lineHeight: 1.5,
            color: "var(--muted)",
          }}
        >
          {stripMarkdown(image.caption)}
        </figcaption>
      )}
    </figure>
  );
}

function EditorialImageFrame({
  image,
  label,
  tone = "accent",
  priority = false,
}: {
  image?: { src: string; alt: string; caption?: string };
  label: string;
  tone?: "accent" | "gold";
  priority?: boolean;
}) {
  const color = tone === "gold" ? "var(--gold)" : "var(--accent)";
  const safeLabel = stripMarkdown(label);

  return (
    <div
      className="tc-source-thumb tc-source-thumb--card"
      style={{
        borderBottom: `1px solid ${color}`,
        background: `radial-gradient(circle at 24% 18%, ${color}33 0%, transparent 42%), linear-gradient(135deg, var(--surface-2), var(--card))`,
      }}
    >
      {image ? (
        <img
          src={image.src}
          alt={stripMarkdown(image.alt || safeLabel)}
          loading={priority ? "eager" : "lazy"}
          width={720}
          height={450}
        />
      ) : (
        <div className="tc-source-fallback">
          <span className="mono" style={{ color, fontWeight: 800 }}>VOIDNEWS</span>
          <span className="mono">{safeLabel}</span>
        </div>
      )}
      {image && <span className="tc-source-domain mono">{safeLabel}</span>}
    </div>
  );
}

function ImageGallery({
  images,
  tone = "gold",
}: {
  images?: { src: string; alt: string; caption?: string }[];
  tone?: "accent" | "gold";
}) {
  if (!images || images.length === 0) return null;
  const color = tone === "gold" ? "var(--gold)" : "var(--accent)";
  return (
    <div style={{ marginTop: 24 }}>
      <div
        style={{
          fontFamily: "var(--mono)",
          marginBottom: 10,
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color,
        }}
      >
        ▾ Visual Brief
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {images.map((image) => (
          <ThumbnailPreview key={image.src} image={image} tone={tone} />
        ))}
      </div>
    </div>
  );
}

function getXStatusUrl(item: ABHighlight) {
  const links = [
    item.post.officialUrl,
    item.post.source,
    ...(item.post.backupUrls || []).map((link) => link.url),
  ].filter(Boolean) as string[];

  return links.find((url) => /https?:\/\/(x|twitter)\.com\/[^/]+\/status\//.test(url));
}

function XPostEmbed({ url }: { url?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url || !ref.current) return;

    const loadEmbed = () => window.twttr?.widgets?.load(ref.current || undefined);
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );

    if (existingScript) {
      loadEmbed();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = loadEmbed;
    document.body.appendChild(script);
  }, [url]);

  if (!url) return null;

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      style={{
        marginTop: 18,
        padding: "12px 0",
        borderTop: "1px solid var(--border2)",
        borderBottom: "1px solid var(--border2)",
      }}
    >
      <blockquote className="twitter-tweet" data-dnt="true" data-theme="dark">
        <a href={url}>{url}</a>
      </blockquote>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   모달 컴포넌트
═══════════════════════════════════════════════════════════════ */

type ModalContent = { kind: "pick"; item: ABEditorPick };

function HighlightDetail({ item }: { item: ABHighlight }) {
  const sourceLinks = collectSourceLinks(item.post);
  const xStatusUrl = getXStatusUrl(item);

  return (
    <div
      style={{
        marginTop: 18,
        paddingTop: 18,
        borderTop: "1px solid var(--border2)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--accent)",
        }}
      >
        ▾ Detail Brief
      </div>

      <p
        style={{
          marginTop: 14,
          whiteSpace: "pre-wrap",
          fontSize: 14,
          lineHeight: 1.9,
          color: "var(--text)",
        }}
      >
        {renderRichText(item.post.content || item.post.summary || "")}
      </p>

      <ImageGallery images={item.post.images} tone="accent" />
      <XPostEmbed url={xStatusUrl} />

      {item.editorial && (
        <aside
          style={{
            marginTop: 24,
            borderTop: "1px solid var(--border)",
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              marginBottom: 8,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            ▾ 생각해볼 점
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: "var(--muted)",
            }}
          >
            {stripMarkdown(item.editorial)}
          </p>
        </aside>
      )}

      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: "1px solid var(--border)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
          <TagList tags={item.post.tags} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end" }}>
          {sourceLinks.map((link) => (
            <SourceButton key={link.url} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PickModal({
  item,
  onClose,
}: {
  item: ABEditorPick;
  onClose: () => void;
}) {
  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <div
        style={{
          fontFamily: "var(--mono)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 11,
        }}
      >
        <span
          style={{
            background: "var(--gold)",
            color: "#000",
            padding: "3px 8px",
            borderRadius: 2,
            fontWeight: 700,
          }}
        >
          PICK
        </span>
        <span style={{ color: "var(--muted)" }}>{item.category}</span>
      </div>

      <h2
        style={{
          marginTop: 16,
          fontSize: "clamp(22px, 4vw, 36px)",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "var(--text)",
        }}
      >
        {stripMarkdown(item.title)}
      </h2>
      {item.subtitle && (
        <p
          style={{
            fontFamily: "var(--mono)",
            marginTop: 4,
            fontSize: 14,
            color: "var(--muted)",
          }}
        >
          {stripMarkdown(item.subtitle)}
        </p>
      )}

      <p
        style={{
          fontFamily: "var(--mono)",
          marginTop: 20,
          borderLeft: "2px solid var(--gold)",
          paddingLeft: 14,
          fontSize: 14,
          color: "var(--text)",
          lineHeight: 1.7,
        }}
      >
        {stripMarkdown(item.summary)}
      </p>

      <p
        style={{
          marginTop: 20,
          whiteSpace: "pre-wrap",
          fontSize: 14,
          lineHeight: 1.9,
          color: "var(--text)",
        }}
      >
        {renderRichText(item.body)}
      </p>

      <ImageGallery images={item.images} tone="gold" />

      {item.editorial && (
        <aside
          style={{
            marginTop: 24,
            borderTop: "1px solid var(--border)",
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              marginBottom: 8,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            ▾ 생각해볼 점
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)" }}>
            {stripMarkdown(item.editorial)}
          </p>
        </aside>
      )}

      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: "1px solid var(--border)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
          <TagList tags={item.tags} />
        </div>
        {item.guideUrl && (
          <a
            href={item.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              background: "transparent",
              color: "var(--gold)",
              border: "1px solid var(--gold)",
              padding: "7px 14px",
              borderRadius: 2,
              textDecoration: "none",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {item.guideLabel || "설치 가이드 →"}
          </a>
        )}
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            background: "var(--gold)",
            color: "#000",
            padding: "8px 16px",
            borderRadius: 2,
            textDecoration: "none",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {item.sourceLabel || "시작하기 →"}
        </a>
      </div>
    </div>
  );
}

function Modal({
  content,
  onClose,
}: {
  content: ModalContent;
  onClose: () => void;
}) {
  // Esc 키 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    // 모달 열려있을 때 body 스크롤 잠금
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const borderColor = "var(--gold)";

  return (
    /* 오버레이 */
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "var(--overlay-bg)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        // 모바일: 바텀시트처럼 bottom에서 올라옴
        // 데스크톱: 중앙 모달
        padding: 0,
      }}
    >
      {/* 모달 패널 */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "var(--bg)",
          border: `2px solid ${borderColor}`,
          borderRadius: "8px 8px 0 0",
          width: "100%",
          maxWidth: 760,
          maxHeight: "92dvh",
          overflowY: "auto",
          padding: "28px 24px 40px",
          // 데스크톱에서는 중앙 정렬
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          aria-label="닫기"
          style={{
            position: "sticky",
            top: 0,
            float: "right",
            marginLeft: 12,
            marginBottom: 8,
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            color: "var(--muted)",
            fontFamily: "var(--mono)",
            fontSize: 12,
            padding: "4px 10px",
            cursor: "pointer",
            zIndex: 10,
            letterSpacing: "0.08em",
          }}
        >
          ESC ✕
        </button>

        <PickModal item={content.item} onClose={onClose} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   카드 컴포넌트 (클릭 가능)
═══════════════════════════════════════════════════════════════ */

function HighlightArticle({
  item,
  expanded,
  onToggle,
}: {
  item: ABHighlight;
  expanded: boolean;
  onToggle: (rank: number) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const accent = item.tier === "hero" ? "var(--accent)" : "var(--muted)";
  const image = item.post.thumbnail ?? item.post.images?.[0];
  const detailId = `ab-highlight-detail-${item.rank}`;

  useEffect(() => {
    if (!expanded) return;
    cardRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [expanded]);

  return (
    <article
      ref={cardRef}
      role="listitem"
      className="tc-feed-card"
      style={{
        gridColumn: item.tier === "hero" ? "1 / -1" : undefined,
        borderColor: expanded || item.tier === "hero" ? "var(--accent)" : "var(--border)",
        boxShadow: expanded ? "0 18px 60px rgba(0, 0, 0, 0.28)" : "none",
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-controls={detailId}
        aria-label={`${stripMarkdown(item.post.title)} ${expanded ? "접기" : "펼치기"}`}
        onClick={() => onToggle(item.rank)}
        onKeyDown={(e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          onToggle(item.rank);
        }}
        style={{
          display: "flex",
          width: "100%",
          minWidth: 0,
          flexDirection: "column",
          padding: 0,
          border: 0,
          background: "transparent",
          color: "inherit",
          textAlign: "left",
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <EditorialImageFrame
          image={image}
          label={item.sourceCompany}
          tone="accent"
          priority={item.tier === "hero"}
        />

        <div className="tc-feed-body">
          <div className="tc-feed-meta mono">
            <span style={{ color: accent, fontWeight: 800 }}>{String(item.rank).padStart(2, "0")}</span>
            <span aria-hidden>·</span>
            <span>{item.sourceCompany}</span>
            <span aria-hidden>·</span>
            <span>{item.post.date}</span>
            <span aria-hidden>·</span>
            <span>{item.tier}</span>
          </div>

          <h2 className="tc-feed-title serif">{stripMarkdown(item.post.title)}</h2>

          {item.keyQuote && (
            <blockquote
              style={{
                margin: 0,
                borderLeft: `2px solid ${accent}`,
                paddingLeft: 10,
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--text)",
              }}
            >
              &ldquo;{stripMarkdown(item.keyQuote)}&rdquo;
            </blockquote>
          )}

          <p className="tc-feed-summary">
            {stripMarkdown(item.post.summary || item.post.content || "")}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <TagList tags={item.post.tags} limit={6} />
          </div>

          <div className="tc-feed-footer mono">
            <span>#{String(item.rank).padStart(2, "0")}</span>
            <span>{expanded ? "Close ↑" : "Read more →"}</span>
          </div>
        </div>
      </div>

      <div
        id={detailId}
        role="region"
        aria-label={`${stripMarkdown(item.post.title)} 상세 내용`}
        hidden={!expanded}
        style={{ padding: expanded ? "0 14px 16px" : 0 }}
      >
        {expanded && <HighlightDetail item={item} />}
      </div>
    </article>
  );
}

function DemoCard({ item }: { item: ABDemoCard }) {
  return (
    <article
      style={{
        border: "1px solid var(--border2)",
        borderLeft: "4px solid var(--gold)",
        background: "linear-gradient(145deg, rgba(255, 209, 102, 0.11), rgba(0,229,255,0.06))",
        borderRadius: 12,
        padding: "clamp(20px, 4vw, 34px)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--gold)",
        }}
      >
        <span>GPT-5.5 실전</span>
        <span style={{ color: "var(--dim)" }}>·</span>
        <span style={{ color: "var(--muted)" }}>{item.category}</span>
      </div>

      <h2
        style={{
          marginTop: 12,
          fontSize: "clamp(24px, 4vw, 38px)",
          fontWeight: 760,
          letterSpacing: "-0.035em",
          lineHeight: 1.12,
          color: "var(--text)",
        }}
      >
        {stripMarkdown(item.title)}
      </h2>

      {item.subtitle && (
        <p
          style={{
            marginTop: 10,
            fontSize: "clamp(15px, 2vw, 17px)",
            lineHeight: 1.7,
            color: "var(--text)",
          }}
        >
          {stripMarkdown(item.subtitle)}
        </p>
      )}

      {item.workflow && (
        <p
          style={{
            fontFamily: "var(--mono)",
            marginTop: 16,
            border: "1px solid rgba(255, 209, 102, 0.45)",
            background: "rgba(0, 0, 0, 0.18)",
            borderRadius: 999,
            padding: "10px 14px",
            fontSize: 12,
            lineHeight: 1.6,
            color: "var(--gold)",
          }}
        >
          {stripMarkdown(item.workflow)}
        </p>
      )}

      <p
        style={{
          marginTop: 18,
          fontSize: 15,
          lineHeight: 1.9,
          color: "var(--muted)",
        }}
      >
        {stripMarkdown(item.summary)}
      </p>

      <p
        style={{
          marginTop: 14,
          whiteSpace: "pre-wrap",
          fontSize: 14,
          lineHeight: 1.9,
          color: "var(--text)",
        }}
      >
        {renderRichText(item.body)}
      </p>

      <div
        style={{
          marginTop: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <TagList tags={item.tags} limit={6} />
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="궁합방 데모 새 창에서 열기"
          style={{
            fontFamily: "var(--mono)",
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
            fontSize: 12,
            background: "var(--gold)",
            color: "#000",
            padding: "0 18px",
            borderRadius: 999,
            textDecoration: "none",
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          {item.label || "DEMO 열기 →"}
        </a>
      </div>
    </article>
  );
}

function EditorPickCard({
  item,
  onOpen,
}: {
  item: ABEditorPick;
  onOpen: (c: ModalContent) => void;
}) {
  const image = item.thumbnail ?? item.images?.[0];

  return (
    <article
      onClick={() => onOpen({ kind: "pick", item })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen({ kind: "pick", item });
      }}
      className="tc-feed-card"
      style={{
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <EditorialImageFrame image={image} label={item.category} tone="gold" />

      <div className="tc-feed-body">
        <div className="tc-feed-meta mono">
          <span style={{ color: "var(--gold)", fontWeight: 800 }}>참고 자료</span>
          <span aria-hidden>·</span>
          <span>{item.category}</span>
          {item.tier && (
            <>
              <span aria-hidden>·</span>
              <span>{item.tier}</span>
            </>
          )}
        </div>

        <h3 className="tc-feed-title serif">{stripMarkdown(item.title)}</h3>

        {item.subtitle && <p className="tc-feed-summary">{stripMarkdown(item.subtitle)}</p>}

        <p className="tc-feed-summary">{stripMarkdown(item.summary)}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <TagList tags={item.tags} limit={5} />
        </div>

        <div className="tc-feed-footer mono">
          <span>{item.sourceLabel || "Source"}</span>
          <span>Read more →</span>
        </div>
      </div>
    </article>
  );
}

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

      <main
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          color: "var(--text)",
          fontFamily: "var(--sans)",
        }}
      >
        {/* ───── Header ───── */}
        <header
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "clamp(40px, 6vw, 64px) clamp(16px, 3vw, 32px) clamp(32px, 5vw, 48px)",
            background:
              "linear-gradient(180deg, var(--surface-2) 0%, var(--bg) 100%)",
          }}
        >
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
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

            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
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
                Vol. {String(data.volume).padStart(2, "0")}
              </span>
              <span
                className="mono"
                style={{
                  fontSize: 10.5,
                  color: "var(--muted)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {data.period}
              </span>
              <span aria-hidden style={{ color: "var(--dim)" }}>·</span>
              <span
                className="mono"
                style={{
                  fontSize: 10.5,
                  color: "var(--muted)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                VoidLight Letter · Members-only
              </span>
            </div>

            <h1
              className="headline serif"
              style={{
                marginTop: 22,
                fontSize: "clamp(34px, 6.5vw, 68px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
              }}
            >
              {data.title}
            </h1>
            <p
              className="deck"
              style={{
                marginTop: 18,
                fontSize: "clamp(15px, 1.7vw, 20px)",
                lineHeight: 1.55,
                maxWidth: "62ch",
              }}
            >
              {data.theme}
            </p>
            <hr className="rule-double" style={{ marginTop: 36 }} />
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
              <span>Opening</span>
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
                Main card section
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
                3주 동안 가장 바이럴한 AI 흐름 10개
              </h2>
              <p
                className="deck"
                style={{
                  marginTop: 10,
                  maxWidth: "62ch",
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                카드를 누르면 발표용 상세 설명, 공식 출처, X/Twitter 게시글이 카드 안에서 바로 펼쳐집니다.
              </p>
            </div>
            <div
              role="list"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                gap: "clamp(14px, 2.4vw, 22px)",
                alignItems: "start",
              }}
            >
              {highlights.map((h) => (
                <HighlightArticle
                  key={h.rank}
                  item={h}
                  expanded={expandedRank === h.rank}
                  onToggle={toggleHighlight}
                />
              ))}
            </div>
          </div>
        </section>

        {data.demoCards && data.demoCards.length > 0 && (
          <section
            style={{
              padding:
                "clamp(28px, 5vw, 42px) clamp(16px, 3vw, 32px) clamp(20px, 4vw, 28px)",
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
                  Demo build
                </span>
                <h2
                  className="serif"
                  style={{
                    marginTop: 10,
                    fontSize: "clamp(22px, 3.2vw, 30px)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    color: "var(--text-strong)",
                    lineHeight: 1.12,
                  }}
                >
                  GPT-5.5가 실제 서비스 제작으로 이어진 사례
                </h2>
              </div>
              <div style={{ display: "grid", gap: 16 }}>
                {data.demoCards.map((demo) => (
                  <DemoCard key={demo.url} item={demo} />
                ))}
              </div>
            </div>
          </section>
        )}

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
                  직접 써보고 추천드리는 오픈소스와 도구
                </h2>
                <p
                  className="deck"
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    lineHeight: 1.55,
                    maxWidth: "60ch",
                  }}
                >
                  발표자가 실제로 써봤거나 직접 깎아본 도구 중, 작업 시스템에 바로 연결되는 추천 목록.
                </p>
              </div>
              <div
                style={{
                  maxWidth: 760,
                }}
              >
                {data.editorsPicks.map((pick, i) => (
                  <EditorPickCard key={i} item={pick} onOpen={openModal} />
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
              <span>Closing</span>
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
              <span style={{ color: "var(--dim)" }}>Covered weeks</span>
              {data.coveredWeeks.map((w) => (
                <Link
                  key={w}
                  href={`/${w}`}
                  style={{
                    color: "var(--text)",
                    textDecoration: "none",
                    border: "1px solid var(--border2)",
                    padding: "3px 9px",
                    borderRadius: 999,
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
