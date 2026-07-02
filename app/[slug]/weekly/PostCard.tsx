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
import { renderRichText, PostDateLabel, PlatformBadge, highlightText, getPostLink, formatIntelIndex } from "./shared";
import { TweetEmbed, isXPostUrl, getOfficialTweetUrl } from "./previews";
import { SourceThumbnail, estimateReadTime, getCompanyShortName } from "./feed";

export function PostCard({
  index,
  companyName,
  companyColor,
  post,
  defaultYear,
  onClick,
  bookmarked,
  onBookmark,
  read,
  searchQuery,
}: {
  index: number;
  companyName: string;
  companyColor: string;
  post: Post;
  defaultYear: number;
  onClick: () => void;
  bookmarked: boolean;
  onBookmark: () => void;
  read: boolean;
  searchQuery: string;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const hasDetail = !!(post.content || post.source || post.xUrl || post.threadsUrl);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const postUrl = getPostLink(post.title);
    if (!postUrl) return;

    navigator.clipboard.writeText(postUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <article
      id={`post-${post.title.slice(0, 20)}`}
      className="article-card tc-feed-card"
      onClick={() => {
        if (!hasDetail) return;
        setExpanded((current) => !current);
        onClick();
      }}
      style={{
        cursor: hasDetail ? "pointer" : "default",
        opacity: read ? 0.78 : 1,
        borderTop: expanded ? `2px solid ${companyColor}` : `2px solid transparent`,
      }}
    >
      <SourceThumbnail post={post} companyColor={companyColor} variant="card" />

      <div className="tc-feed-body" style={{ padding: "15px 15px 14px", gap: 10 }}>
        <div className="tc-feed-meta mono">
          <span style={{ color: companyColor, fontWeight: 800 }}>{getCompanyShortName(companyName)}</span>
          <span aria-hidden>·</span>
          <PlatformBadge platform={post.platform} />
          <span aria-hidden>·</span>
          <PostDateLabel date={post.date} defaultYear={defaultYear} />
          <span aria-hidden>·</span>
          <span>{estimateReadTime(post)} min read</span>
          {read && (
            <>
              <span aria-hidden>·</span>
              <span style={{ color: "var(--gold)", fontWeight: 800 }}>읽음</span>
            </>
          )}
        </div>

        <h3 className="tc-feed-title serif article-card-title">
          {highlightText(post.title, searchQuery)}
        </h3>

        {post.deck && (
          <p
            className="serif article-card-deck"
            style={{
              margin: "6px 0 8px 0",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-soft, var(--text))",
              letterSpacing: "-0.01em",
              fontStyle: "normal",
            }}
          >
            {highlightText(stripMarkdown(post.deck), searchQuery)}
          </p>
        )}

        {(post.summary || post.content) && (
          <p className="tc-feed-summary">
            {highlightText(stripMarkdown(post.summary || post.content || ""), searchQuery)}
          </p>
        )}

        <div className="tc-feed-footer mono">
          <span>#{formatIntelIndex(index)}</span>
          <div
            style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCopy}
              aria-label="포스팅 링크 복사"
              title="포스팅 링크 복사"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: copied ? "var(--accent)" : "var(--muted)",
                padding: 0,
                lineHeight: 1,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark();
              }}
              aria-label={bookmarked ? "북마크 해제" : "북마크"}
              title={bookmarked ? "북마크 해제" : "북마크"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: bookmarked ? "var(--gold)" : "var(--muted)",
                padding: 0,
                lineHeight: 1,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            {hasDetail && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded((current) => !current);
                  onClick();
                }}
                className="mono"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 10,
                  color: expanded ? "var(--accent)" : "var(--accent)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontWeight: 800,
                }}
              >
                {expanded ? "접기 ↑" : "자세히 보기 →"}
              </button>
            )}
          </div>
        </div>

        {expanded && (post.content || post.summary) && (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 2,
              padding: "10px 12px",
            }}
          >
            <p
              className="mono"
              style={{
                fontSize: 10,
                color: "var(--dim)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Content
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--text)",
                lineHeight: 1.75,
                whiteSpace: "pre-line",
                margin: 0,
              }}
            >
              {searchQuery.trim()
                ? highlightText(stripMarkdown(post.content || post.summary || ""), searchQuery)
                : renderRichText(post.content || post.summary || "")}
            </p>
          </div>
        )}

        {expanded && (getOfficialTweetUrl(post) || post.xUrl) && (
          <div onClick={(e) => e.stopPropagation()}>
            <TweetEmbed xUrl={(getOfficialTweetUrl(post) || post.xUrl)!} expanded={expanded} />
          </div>
        )}

        {expanded && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }} onClick={(e) => e.stopPropagation()}>
            {getOfficialTweetUrl(post) && (
              <a
                href={getOfficialTweetUrl(post)}
                target="_blank"
                rel="noopener noreferrer"
                className="mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "6px 12px",
                  background: "var(--accent)",
                  border: "1px solid var(--accent)",
                  borderRadius: 999,
                }}
              >
                공식 원문 →
              </a>
            )}
            {post.officialUrl && !isXPostUrl(post.officialUrl) && (
              <a href={post.officialUrl} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10.5, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", padding: "6px 12px", border: "1px solid var(--accent)", borderRadius: 999 }}>
                공식 링크 →
              </a>
            )}
            {post.source && post.source !== post.officialUrl && !isXPostUrl(post.source) && (
              <a href={post.source} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10.5, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", padding: "6px 12px", border: "1px solid var(--accent)", borderRadius: 999 }}>
                출처 →
              </a>
            )}
            {post.backupUrls?.map(({ label, url }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", padding: "6px 12px", border: "1px solid var(--border2)", borderRadius: 999 }}>
                {label} →
              </a>
            ))}
            {post.xUrl && (
              <a href={post.xUrl} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 700, color: "var(--text)", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", padding: "6px 12px", background: "var(--surface-2)", border: "1px solid var(--border2)", borderRadius: 999 }}>
                <span aria-hidden style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 800 }}>X</span>
                My post →
              </a>
            )}
            {post.threadsUrl && (
              <a href={post.threadsUrl} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 700, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", padding: "6px 12px", background: "transparent", border: "1px solid var(--gold)", borderRadius: 999 }}>
                Threads →
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
