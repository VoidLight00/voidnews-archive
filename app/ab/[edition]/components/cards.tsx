"use client";

import { useEffect, useCallback, useRef, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick, ABDemoCard } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";
import { displayPost } from "@/lib/i18n";
import { useLocale } from "@/app/LocaleProvider";
import { renderRichText } from "./richtext";
import { SectionEyebrow, TagList } from "./bits";
import { SourceAuditStrip } from "./source";
import { EditorialImageFrame } from "./media";
import { HighlightDetail } from "./HighlightDetail";
import type { ModalContent } from "./PickModal";

/* ════════════════════════════════════════════════════════════
   카드 컴포넌트 (클릭 가능)
═══════════════════════════════════════════════════════════════ */

export function HighlightArticle({
  item,
  expanded,
  onToggle,
  editionSlug,
}: {
  item: ABHighlight;
  expanded: boolean;
  onToggle: (rank: number) => void;
  editionSlug: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const d = displayPost(item.post, locale); // 표시 전용 — slug/route/identity는 원본 유지
  const accent = item.tier === "hero" ? "var(--accent)" : "var(--muted)";
  const image = item.post.thumbnail ?? item.post.images?.[0];
  const detailId = `ab-highlight-detail-${item.rank}`;
  // w22 패턴 — slug 있으면 카드 클릭 시 nested route 로 이동
  const nestedHref = item.post.slug ? `/ab/${editionSlug}/${item.post.slug}/` : null;

  const onCardClick = () => {
    if (nestedHref && typeof window !== "undefined") {
      window.location.href = nestedHref;
      return;
    }
    onToggle(item.rank);
  };

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
        borderColor: expanded || item.tier === "hero" ? "var(--accent)" : "var(--border)",
        boxShadow: expanded ? "0 6px 24px -12px var(--overlay-bg)" : "none",
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={nestedHref ? undefined : expanded}
        aria-controls={nestedHref ? undefined : detailId}
        aria-label={nestedHref
          ? `${stripMarkdown(item.post.title)} 상세 페이지 열기`
          : `${stripMarkdown(item.post.title)} ${expanded ? "접기" : "펼치기"}`}
        onClick={onCardClick}
        onKeyDown={(e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          onCardClick();
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
            <span style={{ color: accent, fontWeight: 800 }}>{item.sourceCompany}</span>
            <span aria-hidden>·</span>
            <span>{item.post.date}</span>
            <span aria-hidden>·</span>
            <span style={{ textTransform: "uppercase", letterSpacing: "0.14em" }}>{item.tier}</span>
            <span aria-hidden>·</span>
            <span style={{ color: "var(--dim)" }}>#{String(item.rank).padStart(2, "0")}</span>
          </div>

          <h2 className="tc-feed-title serif">{stripMarkdown(d.title)}</h2>

          {d.deck && (
            <p
              className="serif"
              style={{
                margin: "2px 0 4px 0",
                fontSize: 14.5,
                lineHeight: 1.5,
                color: "var(--text-soft)",
                letterSpacing: "-0.005em",
                fontStyle: "italic",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {stripMarkdown(d.deck)}
            </p>
          )}

          {item.keyQuote && (
            <blockquote
              style={{
                margin: 0,
                borderBottom: `2px solid ${accent}`,
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
            {stripMarkdown(d.summary || d.content || "")}
          </p>

          <SourceAuditStrip input={item.post} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <TagList tags={item.post.tags} limit={6} />
          </div>

          <div className="tc-feed-footer mono">
            <span>#{String(item.rank).padStart(2, "0")}</span>
            <span>{expanded ? "접기 ↑" : "자세히 보기 →"}</span>
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

export function DemoCard({ item }: { item: ABDemoCard }) {
  return (
    <article
      style={{
        border: "1px solid var(--border2)",
        borderBottom: "3px solid var(--gold)",
        background: "color-mix(in srgb, var(--card), var(--surface) 22%)",
        borderRadius: "var(--radius-xs)",
        padding: "clamp(22px, 4vw, 34px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <SectionEyebrow label={`실전 사례 · ${item.category}`} tone="gold" />
      </div>

      <h2
        className="serif"
        style={{
          marginTop: 16,
          maxWidth: "22ch",
          fontSize: "clamp(24px, 4vw, 38px)",
          fontWeight: 700,
          letterSpacing: "-0.035em",
          lineHeight: 1.08,
          color: "var(--text-strong)",
        }}
      >
        {stripMarkdown(item.title)}
      </h2>

      {item.subtitle && (
        <p
          className="serif"
          style={{
            marginTop: 10,
            maxWidth: "60ch",
            fontSize: "var(--text-lg)",
            fontStyle: "italic",
            lineHeight: 1.5,
            color: "var(--muted)",
          }}
        >
          {stripMarkdown(item.subtitle)}
        </p>
      )}

      {item.videoSrc && (
        <video
          controls
          playsInline
          preload="metadata"
          poster={item.videoPoster}
          style={{
            marginTop: 18,
            width: "100%",
            maxHeight: 520,
            borderRadius: "var(--radius-xs)",
            border: "1px solid var(--border2)",
            background: "#000",
            display: "block",
          }}
        >
          <source src={item.videoSrc} type="video/mp4" />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>
      )}

      {item.workflow && (
        <p
          style={{
            fontFamily: "var(--mono)",
            marginTop: 16,
            border: "1px solid color-mix(in srgb, var(--gold), var(--border) 45%)",
            background: "var(--surface)",
            borderRadius: "var(--radius-xs)",
            padding: "11px 14px",
            fontSize: 12,
            letterSpacing: "0.02em",
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
          maxWidth: "62ch",
          fontSize: "var(--text-md)",
          lineHeight: 1.75,
          color: "var(--muted)",
        }}
      >
        {stripMarkdown(item.summary)}
      </p>

      <p
        style={{
          marginTop: 14,
          maxWidth: "62ch",
          whiteSpace: "pre-wrap",
          fontSize: "var(--text-base)",
          lineHeight: 1.85,
          color: "var(--text)",
        }}
      >
        {renderRichText(item.body)}
      </p>

      <div
        style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: "1px solid var(--border)",
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
            color: "var(--ink)",
            padding: "0 18px",
            borderRadius: "var(--radius-xs)",
            textDecoration: "none",
            fontWeight: 800,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          {item.label || "사례 열기 →"}
        </a>
      </div>
    </article>
  );
}

export function EditorPickCard({
  item,
  onOpen,
  editionSlug,
}: {
  item: ABEditorPick;
  onOpen: (c: ModalContent) => void;
  editionSlug: string;
}) {
  const image = item.thumbnail ?? item.images?.[0];
  const nestedHref = item.slug ? `/ab/${editionSlug}/${item.slug}/` : null;

  const onCardActivate = () => {
    if (nestedHref && typeof window !== "undefined") {
      window.location.href = nestedHref;
      return;
    }
    onOpen({ kind: "pick", item });
  };

  return (
    <article
      onClick={onCardActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onCardActivate();
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

        {item.deck && (
          <p
            className="serif"
            style={{
              margin: "2px 0 4px 0",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-soft)",
              letterSpacing: "-0.005em",
              fontStyle: "italic",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {stripMarkdown(item.deck)}
          </p>
        )}

        {item.subtitle && <p className="tc-feed-summary">{stripMarkdown(item.subtitle)}</p>}

        <p className="tc-feed-summary">{stripMarkdown(item.summary)}</p>

        <SourceAuditStrip input={{ officialUrl: item.sourceUrl, source: item.sourceUrl, tags: item.tags }} tone="gold" />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <TagList tags={item.tags} limit={5} />
        </div>

        <div className="tc-feed-footer mono">
          <span>{item.sourceLabel || "출처"}</span>
          <span>자세히 보기 →</span>
        </div>
      </div>
    </article>
  );
}
