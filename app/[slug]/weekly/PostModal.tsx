"use client";

import {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { Company, Post, WeeklyData } from "@/lib/data";
import { stripMarkdown } from "@/lib/md";
import { renderRichText, PostDateLabel, PlatformBadge, LinkBtn, highlightText, getPostLink, type ModalNavigation } from "./shared";
import { LinkPreview, EmbedPreview, getOfficialTweetUrl } from "./previews";

export function PostModal({
  post,
  defaultYear,
  companyColor,
  bookmarked,
  onToggleBookmark,
  onClose,
  navigation,
}: {
  post: Post;
  defaultYear: number;
  companyColor: string;
  bookmarked: boolean;
  onToggleBookmark: () => void;
  onClose: () => void;
  navigation: ModalNavigation;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef<number | null>(null);
  const titleId = `post-modal-title-${post.title.replace(/[^a-zA-Z0-9가-힣]+/g, "-").replace(/^-+|-+$/g, "")}`;
  const navBtnStyle = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "var(--mono)",
    padding: "11px 16px",
    borderRadius: "var(--radius-xs)",
    border: "1px solid var(--border2)",
    background: "var(--surface)",
    color: "var(--text)",
    cursor: "pointer",
  } as const;

  useEffect(() => {
    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.focus();
    return () => previousActiveElement?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--overlay-bg)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartYRef.current = e.touches[0]?.clientY ?? null;
        }}
        onTouchEnd={(e) => {
          const startY = touchStartYRef.current;
          const endY = e.changedTouches[0]?.clientY ?? null;
          touchStartYRef.current = null;
          if (startY == null || endY == null) return;
          if (e.currentTarget.scrollTop > 4) return;
          if (endY - startY >= 50) onClose();
        }}
        style={{
          background: "var(--card)",
          border: "1px solid var(--border2)",
          borderBottom: "none",
          borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
          width: "100%",
          maxWidth: 700,
          maxHeight: "86vh",
          overflowY: "auto",
          padding: "26px clamp(20px, 4vw, 34px) 44px",
          position: "relative",
          boxShadow: "0 -24px 60px rgba(0,0,0,0.34)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <div
            style={{
              width: 48,
              height: 4,
              borderRadius: "var(--radius-pill)",
              background: "var(--border2)",
            }}
          />
        </div>

        <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 8 }}>
          <button
            onClick={onToggleBookmark}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border2)",
              color: bookmarked ? "var(--gold)" : "var(--muted)",
              fontSize: 16,
              cursor: "pointer",
              width: 34,
              height: 34,
              borderRadius: "var(--radius-xs)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={bookmarked ? "북마크 해제" : "북마크"}
          >
            {bookmarked ? "★" : "☆"}
          </button>
          <button
            onClick={onClose}
            aria-label="닫기"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border2)",
              color: "var(--muted)",
              fontSize: 18,
              cursor: "pointer",
              width: 34,
              height: 34,
              borderRadius: "var(--radius-xs)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <PlatformBadge platform={post.platform} />
          <PostDateLabel date={post.date} defaultYear={defaultYear} />
        </div>

        <h2
          id={titleId}
          className="serif"
          style={{
            fontSize: "clamp(23px, 2.6vw, 31px)",
            fontWeight: 700,
            color: "var(--text-strong)",
            lineHeight: 1.12,
            marginBottom: 18,
            letterSpacing: "-0.03em",
            paddingRight: 84,
          }}
        >
          {post.title}
        </h2>

        {post.summary && (
          <p
            className="serif"
            style={{
              fontSize: "clamp(15px, 1.4vw, 17px)",
              color: "var(--text-soft)",
              marginBottom: 22,
              lineHeight: 1.6,
              paddingLeft: 16,
              borderBottom: `2px solid ${companyColor}`,
              letterSpacing: "-0.01em",
            }}
          >
            {stripMarkdown(post.summary)}
          </p>
        )}

        <EmbedPreview
          officialUrl={getOfficialTweetUrl(post)}
          xUrl={post.xUrl}
          threadsUrl={post.threadsUrl}
        />

        {post.thumbnail && (
          <figure style={{ margin: "0 0 20px", border: "1px solid var(--border)", borderRadius: "var(--radius-xs)", overflow: "hidden", background: "var(--card)" }}>
            <img src={post.thumbnail.src} alt={post.thumbnail.alt} style={{ display: "block", width: "100%", objectFit: "cover" }} />
            {post.thumbnail.caption && (
              <figcaption style={{ padding: "10px 12px", fontSize: 12, color: "var(--muted)", borderTop: "1px solid var(--border)", lineHeight: 1.6 }}>
                {stripMarkdown(post.thumbnail.caption)}
              </figcaption>
            )}
          </figure>
        )}

        {post.source && <LinkPreview url={post.source} />}

        {post.images && post.images.length > 0 && (
          <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
            {post.images.map((image) => (
              <figure key={image.src} style={{ margin: 0, border: "1px solid var(--border)", borderRadius: "var(--radius-xs)", overflow: "hidden", background: "var(--card)" }}>
                <img src={image.src} alt={image.alt} loading="lazy" style={{ display: "block", width: "100%", objectFit: "cover" }} />
                {image.caption && (
                  <figcaption style={{ padding: "10px 12px", fontSize: 12, color: "var(--muted)", borderTop: "1px solid var(--border)", lineHeight: 1.6 }}>
                    {stripMarkdown(image.caption)}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {post.content && (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderLeft: "2px solid var(--rule)",
              borderRadius: "var(--radius-xs)",
              padding: "18px 20px",
              marginBottom: 20,
            }}
          >
            <p
              className="mono"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--muted)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              포스팅 내용
            </p>
            <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{renderRichText(post.content || "")}</p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 24,
            paddingTop: 16,
            borderTop: "1px solid var(--border)",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={navigation.onPrev}
            disabled={!navigation.hasPrev}
            style={{
              ...navBtnStyle,
              opacity: navigation.hasPrev ? 1 : 0.35,
              cursor: navigation.hasPrev ? "pointer" : "default",
            }}
          >
            ← 이전
          </button>
          <span style={{ fontSize: 12, color: "var(--dim)", fontVariantNumeric: "tabular-nums" }}>{navigation.positionLabel}</span>
          <button
            onClick={navigation.onNext}
            disabled={!navigation.hasNext}
            style={{
              ...navBtnStyle,
              opacity: navigation.hasNext ? 1 : 0.35,
              cursor: navigation.hasNext ? "pointer" : "default",
            }}
          >
            다음 →
          </button>
        </div>
      </div>
    </div>
  );
}
