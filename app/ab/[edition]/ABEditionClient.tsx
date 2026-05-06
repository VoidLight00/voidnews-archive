"use client";

import { useEffect, useCallback, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";

/* ────────── URL 자동 링크화 ──────────
   stripMarkdown 후 평문 안에 남아있는 http(s) URL을
   클릭 가능한 <a>로 변환. 카드 외부에서 상위 onClick으로
   모달이 열리는 걸 막기 위해 stopPropagation. */
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
  const medal =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
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
      {medal && <span style={{ fontSize: 18 }}>{medal}</span>}
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

/* ════════════════════════════════════════════════════════════
   모달 컴포넌트
═══════════════════════════════════════════════════════════════ */

type ModalContent =
  | { kind: "highlight"; item: ABHighlight }
  | { kind: "pick"; item: ABEditorPick };

function HighlightModal({
  item,
  onClose,
}: {
  item: ABHighlight;
  onClose: () => void;
}) {
  const sourceLinks = collectSourceLinks(item.post);
  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <RankBadge rank={item.rank} tier={item.tier} />
        <CompanyTag name={item.sourceCompany} />
      </div>

      <h2
        style={{
          marginTop: 20,
          fontSize: "clamp(22px, 4vw, 36px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          color: "var(--text)",
        }}
      >
        {stripMarkdown(item.post.title)}
      </h2>

      {item.keyQuote && (
        <blockquote
          style={{
            fontFamily: "var(--mono)",
            marginTop: 20,
            borderLeft: "4px solid var(--accent)",
            paddingLeft: 16,
            fontSize: 15,
            fontStyle: "italic",
            color: "var(--text)",
            lineHeight: 1.6,
          }}
        >
          &ldquo;{stripMarkdown(item.keyQuote)}&rdquo;
        </blockquote>
      )}

      <p
        style={{
          marginTop: 20,
          whiteSpace: "pre-wrap",
          fontSize: 14,
          lineHeight: 1.9,
          color: "var(--text)",
        }}
      >
        {renderRichText(item.post.content || "")}
      </p>

      <ImageGallery images={item.post.images} tone="accent" />

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

      {/* Footer */}
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
          🛠 PICK
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

  const borderColor =
    content.kind === "highlight" &&
    content.item.tier === "hero"
      ? "var(--accent)"
      : content.kind === "pick"
      ? "var(--gold)"
      : "var(--border)";

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

        {content.kind === "highlight" ? (
          <HighlightModal item={content.item} onClose={onClose} />
        ) : (
          <PickModal item={content.item} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   카드 컴포넌트 (클릭 가능)
═══════════════════════════════════════════════════════════════ */

function HeroCard({
  item,
  onOpen,
}: {
  item: ABHighlight;
  onOpen: (c: ModalContent) => void;
}) {
  return (
    <article
      onClick={() => onOpen({ kind: "highlight", item })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          onOpen({ kind: "highlight", item });
      }}
      style={{
        border: "2px solid var(--accent)",
        background: "var(--card)",
        padding: "clamp(20px, 4vw, 32px)",
        borderRadius: 2,
        cursor: "pointer",
        transition: "border-color 0.15s, transform 0.15s",
        WebkitTapHighlightColor: "transparent",
      }}
      onPointerEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--accent-hover, #ff9060)";
      }}
      onPointerLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <RankBadge rank={item.rank} tier={item.tier} />
        <CompanyTag name={item.sourceCompany} />
      </div>

      <h2
        style={{
          marginTop: 20,
          fontSize: "clamp(22px, 4vw, 40px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "var(--text)",
        }}
      >
        {stripMarkdown(item.post.title)}
      </h2>

      {item.keyQuote && (
        <blockquote
          style={{
            fontFamily: "var(--mono)",
            marginTop: 20,
            borderLeft: "4px solid var(--accent)",
            paddingLeft: 16,
            fontSize: 14,
            fontStyle: "italic",
            color: "var(--muted)",
            lineHeight: 1.5,
          }}
        >
          &ldquo;{stripMarkdown(item.keyQuote)}&rdquo;
        </blockquote>
      )}

      <ThumbnailPreview image={item.post.thumbnail} />

      <p
        style={{
          marginTop: 20,
          whiteSpace: "pre-wrap",
          fontSize: 14,
          lineHeight: 1.8,
          color: "var(--text)",
          // 미리보기: 3줄만 표시
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {stripMarkdown(item.post.content)}
      </p>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <TagList tags={item.post.tags} limit={5} />
        </div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--accent)",
          }}
        >
          탭하여 전체 보기 →
        </span>
      </div>
    </article>
  );
}

function FeatureCard({
  item,
  onOpen,
}: {
  item: ABHighlight;
  onOpen: (c: ModalContent) => void;
}) {
  return (
    <article
      onClick={() => onOpen({ kind: "highlight", item })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          onOpen({ kind: "highlight", item });
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        background: "var(--card)",
        padding: "clamp(16px, 3vw, 24px)",
        borderRadius: 2,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        minHeight: 200,
      }}
      onPointerEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
      }}
      onPointerLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <RankBadge rank={item.rank} tier={item.tier} />
        <CompanyTag name={item.sourceCompany} />
      </div>

      <h3
        style={{
          marginTop: 14,
          fontSize: "clamp(17px, 2.5vw, 20px)",
          fontWeight: 600,
          lineHeight: 1.3,
          color: "var(--text)",
        }}
      >
        {stripMarkdown(item.post.title)}
      </h3>

      {item.keyQuote && (
        <p
          style={{
            fontFamily: "var(--mono)",
            marginTop: 10,
            borderLeft: "2px solid var(--accent)",
            paddingLeft: 10,
            fontSize: 12,
            fontStyle: "italic",
            color: "var(--muted)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          &ldquo;{stripMarkdown(item.keyQuote)}&rdquo;
        </p>
      )}

      <p
        style={{
          marginTop: 12,
          fontSize: 13,
          lineHeight: 1.75,
          color: "var(--muted)",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {stripMarkdown(item.post.content)}
      </p>

      <ThumbnailPreview image={item.post.thumbnail} />

      <div
        style={{
          marginTop: "auto",
          paddingTop: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--accent)",
          }}
        >
          탭하여 전체 보기 →
        </span>
      </div>
    </article>
  );
}

function NormalCard({
  item,
  onOpen,
}: {
  item: ABHighlight;
  onOpen: (c: ModalContent) => void;
}) {
  return (
    <article
      onClick={() => onOpen({ kind: "highlight", item })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          onOpen({ kind: "highlight", item });
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        background: "var(--card)",
        padding: "clamp(14px, 2.5vw, 20px)",
        borderRadius: 2,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        minHeight: 140,
      }}
      onPointerEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
      }}
      onPointerLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <RankBadge rank={item.rank} tier={item.tier} />
        <CompanyTag name={item.sourceCompany} />
      </div>

      <h3
        style={{
          marginTop: 10,
          fontSize: "clamp(15px, 2.2vw, 17px)",
          fontWeight: 600,
          lineHeight: 1.35,
          color: "var(--text)",
        }}
      >
        {stripMarkdown(item.post.title)}
      </h3>

      <p
        style={{
          marginTop: 8,
          fontSize: 13,
          lineHeight: 1.7,
          color: "var(--muted)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {stripMarkdown(item.post.content)}
      </p>

      <ThumbnailPreview image={item.post.thumbnail} />

      <div
        style={{
          marginTop: "auto",
          paddingTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--dim)",
          }}
        >
          →
        </span>
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
  return (
    <article
      onClick={() => onOpen({ kind: "pick", item })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen({ kind: "pick", item });
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        borderLeft: "4px solid var(--gold)",
        borderTop: "1px solid var(--border)",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--card)",
        padding: "clamp(16px, 3vw, 24px)",
        borderRadius: 2,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        minHeight: 180,
      }}
      onPointerEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderTopColor = "var(--gold)";
        (e.currentTarget as HTMLElement).style.borderRightColor = "var(--gold)";
        (e.currentTarget as HTMLElement).style.borderBottomColor =
          "var(--gold)";
      }}
      onPointerLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderTopColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.borderRightColor =
          "var(--border)";
        (e.currentTarget as HTMLElement).style.borderBottomColor =
          "var(--border)";
      }}
    >
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
          🛠 PICK
        </span>
        <span style={{ color: "var(--muted)" }}>{item.category}</span>
      </div>

      <h3
        style={{
          marginTop: 12,
          fontSize: "clamp(18px, 3vw, 22px)",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "var(--text)",
        }}
      >
        {stripMarkdown(item.title)}
      </h3>

      <p
        style={{
          fontFamily: "var(--mono)",
          marginTop: 10,
          borderLeft: "2px solid var(--gold)",
          paddingLeft: 10,
          fontSize: 13,
          color: "var(--text)",
          lineHeight: 1.6,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {stripMarkdown(item.summary)}
      </p>

      <ThumbnailPreview image={item.thumbnail || item.images?.[0]} tone="gold" />

      <div
        style={{
          marginTop: "auto",
          paddingTop: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <TagList tags={item.tags} limit={3} />
        </div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--gold)",
          }}
        >
          탭하여 전체 보기 →
        </span>
      </div>
    </article>
  );
}

/* ════════════════════════════════════════════════════════════
   메인 클라이언트 컴포넌트
═══════════════════════════════════════════════════════════════ */

export default function ABEditionClient({ data }: { data: ABEdition }) {
  const [modal, setModal] = useState<ModalContent | null>(null);
  const openModal = useCallback((c: ModalContent) => setModal(c), []);
  const closeModal = useCallback(() => setModal(null), []);

  const hero = data.highlights.find((h) => h.tier === "hero");
  const features = data.highlights.filter((h) => h.tier === "feature");
  const normals = data.highlights.filter((h) => h.tier === "normal");

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
            padding: "clamp(24px, 5vw, 40px) clamp(16px, 4vw, 24px)",
          }}
        >
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--muted)",
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
                letterSpacing: "0.08em",
              }}
            >
              <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
                VOIDNEWS
              </Link>
              <span style={{ color: "var(--dim)" }}>/</span>
              <Link href="/ab" style={{ color: "var(--muted)", textDecoration: "none" }}>
                AB BRIEFING
              </Link>
              <span style={{ color: "var(--dim)" }}>/</span>
              <span style={{ color: "var(--text)" }}>{data.slug}</span>
            </div>

            <div
              style={{
                fontFamily: "var(--mono)",
                marginTop: 24,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
                fontSize: 11,
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
                VOL. {String(data.volume).padStart(2, "0")}
              </span>
              <span style={{ color: "var(--muted)" }}>{data.period}</span>
              <span style={{ color: "var(--dim)" }}>·</span>
              <span style={{ color: "var(--muted)" }}>발표일 {data.announceDate}</span>
              <span style={{ color: "var(--dim)" }}>·</span>
              <span style={{ color: "var(--muted)" }}>
                {data.highlights.length} HIGHLIGHTS
                {data.editorsPicks && data.editorsPicks.length > 0
                  ? ` + ${data.editorsPicks.length} PICK`
                  : ""}
              </span>
            </div>

            <h1
              style={{
                marginTop: 14,
                fontSize: "clamp(24px, 5vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--text)",
              }}
            >
              {data.title}
            </h1>
            <p
              style={{
                marginTop: 12,
                fontFamily: "var(--mono)",
                fontSize: 13,
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              {data.theme}
            </p>
          </div>
        </header>

        {/* ───── Intro ───── */}
        <section
          style={{
            padding: "clamp(32px, 6vw, 48px) clamp(16px, 4vw, 24px)",
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              ▾ Opening
            </div>
            <p
              style={{
                marginTop: 16,
                whiteSpace: "pre-wrap",
                fontSize: "clamp(14px, 2vw, 16px)",
                lineHeight: 1.9,
                color: "var(--text)",
              }}
            >
              {stripMarkdown(data.intro)}
            </p>
          </div>
        </section>

        {/* ───── Hero ───── */}
        {hero && (
          <section
            style={{
              padding: "0 clamp(16px, 4vw, 24px) clamp(24px, 4vw, 32px)",
            }}
          >
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
              <HeroCard item={hero} onOpen={openModal} />
            </div>
          </section>
        )}

        {/* ───── Features ───── */}
        {features.length > 0 && (
          <section
            style={{
              padding: "0 clamp(16px, 4vw, 24px) clamp(24px, 4vw, 32px)",
            }}
          >
            <div
              style={{
                maxWidth: 960,
                margin: "0 auto",
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              }}
            >
              {features.map((h) => (
                <FeatureCard key={h.rank} item={h} onOpen={openModal} />
              ))}
            </div>
          </section>
        )}

        {/* ───── Normals ───── */}
        {normals.length > 0 && (
          <section
            style={{
              padding: "0 clamp(16px, 4vw, 24px) clamp(24px, 4vw, 32px)",
            }}
          >
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 14,
                }}
              >
                ▾ More Highlights
              </div>
              <div
                style={{
                  display: "grid",
                  gap: 12,
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                }}
              >
                {normals.map((h) => (
                  <NormalCard key={h.rank} item={h} onOpen={openModal} />
                ))}
              </div>
            </div>
          </section>
        )}

        {data.editorsPicks && data.editorsPicks.length > 0 && (
          <section
            style={{
              padding:
                "clamp(32px, 5vw, 48px) clamp(16px, 4vw, 24px) clamp(24px, 4vw, 32px)",
            }}
          >
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
              <div
                style={{
                  borderTop: "1px solid var(--border2)",
                  paddingTop: 28,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                  }}
                >
                  🛠 실전 참고 자료
                </div>
                <h2
                  style={{
                    fontFamily: "var(--mono)",
                    marginTop: 8,
                    fontSize: "clamp(17px, 3vw, 20px)",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  메인 흐름을 이해하는 데 도움이 되는 자료
                </h2>
                <p
                  style={{
                    fontFamily: "var(--mono)",
                    marginTop: 4,
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  발표 본문에서 다루는 흐름을 더 깊게 확인할 수 있는 원문과 도구
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: 16,
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
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
              "clamp(32px, 5vw, 48px) clamp(16px, 4vw, 24px) clamp(48px, 8vw, 72px)",
          }}
        >
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              borderTop: "1px solid var(--border)",
              paddingTop: 40,
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
              ▾ Closing
            </div>
            <p
              style={{
                marginTop: 16,
                whiteSpace: "pre-wrap",
                fontSize: "clamp(14px, 2vw, 16px)",
                lineHeight: 1.9,
                color: "var(--text)",
              }}
            >
              {stripMarkdown(data.closing)}
            </p>
          </div>
        </section>

        {/* ───── Footer ───── */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "28px clamp(16px, 4vw, 24px)",
          }}
        >
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 12,
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            <div>
              커버 주차:{" "}
              {data.coveredWeeks.map((w) => (
                <Link
                  key={w}
                  href={`/${w}`}
                  style={{
                    margin: "0 4px",
                    color: "var(--muted)",
                    textDecoration: "underline",
                  }}
                >
                  {w}
                </Link>
              ))}
            </div>
            <div>
              <Link href="/ab" style={{ color: "var(--muted)", textDecoration: "none" }}>
                ← AB 발표 목록
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
