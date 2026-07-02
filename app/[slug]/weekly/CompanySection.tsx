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
import { getCompanySectionId } from "./shared";
import { PostCard } from "./PostCard";

export function CompanySection({
  company,
  startIndex,
  defaultYear,
  onPostClick,
  bookmarks,
  onBookmark,
  readPosts,
  searchQuery,
  collapsed,
  onToggleCollapsed,
}: {
  company: Company;
  startIndex: number;
  defaultYear: number;
  onPostClick: (post: Post, companyName: string) => void;
  bookmarks: Set<string>;
  onBookmark: (title: string) => void;
  readPosts: Set<string>;
  searchQuery: string;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}) {
  return (
    <section id={getCompanySectionId(company.name)} style={{ marginBottom: 48, scrollMarginTop: 150 }}>
      <button
        onClick={onToggleCollapsed}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: collapsed ? 12 : 18,
          padding: "22px 0 14px",
          borderTop: "1px solid var(--rule)",
          background: "none",
          border: "none",
          borderTopWidth: 1,
          borderTopStyle: "solid",
          borderTopColor: "var(--rule)",
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: company.color,
            flexShrink: 0,
            boxShadow: `0 0 0 3px ${company.color}22`,
          }}
        />
        <h2
          className="serif"
          style={{
            fontSize: "clamp(20px, 2.2vw, 26px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text-strong)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {company.name}
        </h2>
        <span
          className="mono"
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: company.color,
            border: `1px solid ${company.color}55`,
            background: `${company.color}10`,
            padding: "3px 10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: 999,
          }}
        >
          {String(company.posts.length).padStart(2, "0")} items
        </span>
        <span
          aria-hidden
          style={{
            marginLeft: "auto",
            color: "var(--muted)",
            display: "inline-flex",
            alignItems: "center",
            transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {!collapsed && (
        <div className="tc-article-grid tc-company-grid">
          {company.posts.map((post, index) => (
            <PostCard
              key={`${post.title}-${index}`}
              index={startIndex + index}
              companyName={company.name}
              companyColor={company.color}
              post={post}
              defaultYear={defaultYear}
              onClick={() => onPostClick(post, company.name)}
              bookmarked={bookmarks.has(post.title)}
              onBookmark={() => onBookmark(post.title)}
              read={readPosts.has(post.title)}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </section>
  );
}
