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

export const BOOKMARKS_STORAGE_KEY = "voidnews-bookmarks";
export const READ_STORAGE_PREFIX = "voidnews-read:";
export const RECENT_SEARCHES_STORAGE_KEY = "voidnews-recent-searches";
export const VIEW_MODE_STORAGE_KEY = "voidnews-view-mode";
export const SORT_ORDER_STORAGE_KEY = "voidnews-sort-order";
export const STATS_ACTION_STORAGE_KEY = "voidnews-stats-action";
export const MAX_RECENT_SEARCHES = 5;
export const OG_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;
export const OG_FAILURE_CACHE_TTL_MS = 1000 * 60 * 60 * 6;

export function getReadStorageKey(title: string) {
  return `${READ_STORAGE_PREFIX}${title}`;
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.length > 30 ? `${url.slice(0, 30)}…` : url;
  }
}

export function getCompanySectionId(name: string) {
  return `company-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
}

export function formatIntelIndex(index: number) {
  return String(index).padStart(3, "0");
}

export function renderIntelBar(value: number, max: number, width = 20) {
  const filled = max > 0 ? Math.round((value / max) * width) : 0;
  return `${"█".repeat(filled)}${"░".repeat(Math.max(0, width - filled))}`;
}

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightText(text: string, query: string): ReactNode {
  const trimmed = query.trim();
  if (!trimmed) return text;

  const regex = new RegExp(`(${escapeRegExp(trimmed)})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;
    const matched = part.toLowerCase() === trimmed.toLowerCase();
    return matched ? (
      <mark
        key={`${part}-${index}`}
        style={{
          background: "var(--accent)",
          color: "var(--ink)",
          borderRadius: "var(--radius-xs)",
          padding: "0 3px",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }}
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
}

export function renderRichText(text: string): ReactNode {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*\n]+?\*\*)/g);

  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} style={{ color: "var(--text-strong)", fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export function buildUrlWithParams(pathname: string, params: URLSearchParams) {
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function getPostLink(postTitle: string) {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  params.set("post", postTitle);
  return `${window.location.origin}${buildUrlWithParams(window.location.pathname, params)}`;
}

export function parsePostDate(rawDate: string, defaultYear: number) {
  const trimmed = rawDate.trim();
  if (!trimmed) return null;

  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2}):(\d{2}))?$/);
  if (isoMatch) {
    const [, year, month, day, hour = "0", minute = "0"] = isoMatch;
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  }

  const monthNameMatch = trimmed.match(
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2})(?:,\s*(\d{4}))?(?:\s+(\d{1,2}):(\d{2}))?$/i
  );
  if (monthNameMatch) {
    const monthMap = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    } as const;
    const [, monthName, day, year = String(defaultYear), hour = "0", minute = "0"] = monthNameMatch;
    return new Date(Number(year), monthMap[monthName.slice(0, 3).toLowerCase() as keyof typeof monthMap], Number(day), Number(hour), Number(minute));
  }

  const numericMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})(?:\s+(\d{1,2}):(\d{2}))?$/);
  if (numericMatch) {
    const [, month, day, hour = "0", minute = "0"] = numericMatch;
    return new Date(defaultYear, Number(month) - 1, Number(day), Number(hour), Number(minute));
  }

  return null;
}

export function formatAbsoluteDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatRelativeTime(date: Date) {
  const diffMs = Date.now() - date.getTime();
  if (Number.isNaN(diffMs)) return null;

  const diffMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));
  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}일 전`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks}주 전`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}개월 전`;

  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears}년 전`;
}

export function upsertRecentSearches(entries: string[], query: string) {
  const trimmed = query.trim();
  if (!trimmed) return entries;
  const next = [...entries.filter((item) => item !== trimmed), trimmed];
  return next.slice(-MAX_RECENT_SEARCHES);
}

export function PostDateLabel({ date, defaultYear }: { date: string; defaultYear: number }) {
  const parsed = parsePostDate(date, defaultYear);
  const relative = parsed ? formatRelativeTime(parsed) : null;
  const absolute = parsed ? formatAbsoluteDate(parsed) : date;

  return (
    <span
      style={{
        fontSize: 11,
        color: "var(--muted)",
        fontVariantNumeric: "tabular-nums",
        fontFamily: "var(--mono)",
        letterSpacing: "0.04em",
      }}
      title={absolute}
    >
      {relative || date}
    </span>
  );
}

export type SelectedPostState = {
  companyName: string;
  title: string;
};

export type ModalNavigation = {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  positionLabel: string;
};

export type ViewDensity = "compact" | "comfortable";
export type SortOrder = "latest" | "oldest" | "company";
export type StatsActionMode = "filter" | "scroll";

// ── 플랫폼 배지 ─────────────────────────────────
export function PlatformBadge({ platform }: { platform: Post["platform"] }) {
  return (
    <span
      style={{
        background: "transparent",
        color: "var(--muted)",
        fontSize: 11,
        fontWeight: 600,
        padding: 0,
        borderRadius: 0,
        letterSpacing: "0.08em",
        whiteSpace: "nowrap",
        fontFamily: "var(--mono)",
        textTransform: "uppercase",
      }}
    >
      {platform}
    </span>
  );
}

// ── 링크 버튼 ────────────────────────────────────
export function LinkBtn({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-btn mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--accent)",
        textDecoration: "none",
        padding: "6px 12px",
        border: "1px solid var(--accent)",
        borderRadius: "var(--radius-xs)",
      }}
    >
      {label} ↗
    </a>
  );
}
