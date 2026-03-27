"use client";

import {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Company, Post, WeeklyData } from "@/lib/data";
import { getWeekList } from "@/lib/data";

const BOOKMARKS_STORAGE_KEY = "voidnews-bookmarks";
const READ_STORAGE_PREFIX = "voidnews-read:";
const RECENT_SEARCHES_STORAGE_KEY = "voidnews-recent-searches";
const VIEW_MODE_STORAGE_KEY = "voidnews-view-mode";
const SORT_ORDER_STORAGE_KEY = "voidnews-sort-order";
const STATS_ACTION_STORAGE_KEY = "voidnews-stats-action";
const MAX_RECENT_SEARCHES = 5;

function getReadStorageKey(title: string) {
  return `${READ_STORAGE_PREFIX}${title}`;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.length > 30 ? `${url.slice(0, 30)}…` : url;
  }
}

function getCompanySectionId(name: string) {
  return `company-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
}

function formatIntelIndex(index: number) {
  return String(index).padStart(3, "0");
}

function renderIntelBar(value: number, max: number, width = 20) {
  const filled = max > 0 ? Math.round((value / max) * width) : 0;
  return `${"█".repeat(filled)}${"░".repeat(Math.max(0, width - filled))}`;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, query: string): ReactNode {
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
          background: "#E87040",
          color: "#111",
          borderRadius: 4,
          padding: "0 2px",
        }}
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
}

function buildUrlWithParams(pathname: string, params: URLSearchParams) {
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function getPostLink(postTitle: string) {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  params.set("post", postTitle);
  return `${window.location.origin}${buildUrlWithParams(window.location.pathname, params)}`;
}

function parsePostDate(rawDate: string, defaultYear: number) {
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

function formatAbsoluteDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatRelativeTime(date: Date) {
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

function upsertRecentSearches(entries: string[], query: string) {
  const trimmed = query.trim();
  if (!trimmed) return entries;
  const next = [...entries.filter((item) => item !== trimmed), trimmed];
  return next.slice(-MAX_RECENT_SEARCHES);
}

function PostDateLabel({ date, defaultYear }: { date: string; defaultYear: number }) {
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

type SelectedPostState = {
  companyName: string;
  title: string;
};

type ModalNavigation = {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  positionLabel: string;
};

type ViewMode = "list" | "grid";
type SortOrder = "latest" | "oldest" | "company";
type StatsActionMode = "filter" | "scroll";

// ── 플랫폼 배지 ─────────────────────────────────
function PlatformBadge({ platform }: { platform: Post["platform"] }) {
  const map: Record<string, { bg: string; color: string }> = {
    X: { bg: "#18181B", color: "#E4E4E7" },
    Threads: { bg: "#1A1A2E", color: "#A78BFA" },
    "X+Threads": { bg: "#1A2A2E", color: "#60A5FA" },
  };
  const s = map[platform] || map.X;
  return (
    <span
      style={{
        background: "transparent",
        color: s.color,
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
function LinkBtn({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: 600,
        color: "#E87040",
        textDecoration: "none",
        padding: "4px 10px",
        border: "1px solid #E87040",
        borderRadius: 4,
      }}
    >
      {label} ↗
    </a>
  );
}

// ── OG 링크 프리뷰 ───────────────────────────────
interface OGData {
  title?: string;
  description?: string;
  image?: string;
  hostname?: string;
}

function useOGData(url: string, enabled: boolean) {
  const [data, setData] = useState<OGData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || !url) return;
    const cacheKey = `voidnews-og:${url}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setData(JSON.parse(cached));
        return;
      }
    } catch {}

    setLoading(true);
    fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.status === "success") {
          const og: OGData = {
            title: d.data.title,
            description: d.data.description,
            image: d.data.image?.url || d.data.screenshot?.url,
            hostname: (() => {
              try {
                return new URL(url).hostname.replace(/^www\./, "");
              } catch {
                return url;
              }
            })(),
          };
          setData(og);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(og));
          } catch {}
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [url, enabled]);

  return { data, loading };
}

// 카드용 작은 OG 프리뷰 (Intersection Observer lazy load)
function CardLinkPreview({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { data, loading } = useOGData(url, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} onClick={(e) => e.stopPropagation()}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          style={{
            border: "1px solid #1e1e1e",
            borderRadius: 8,
            overflow: "hidden",
            background: "#0c0c0c",
            display: "flex",
            minHeight: 72,
            transition: "border-color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e1e1e")}
        >
          {loading && (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 52,
                  background: "#1a1a1a",
                  borderRadius: 4,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ height: 10, background: "#1a1a1a", borderRadius: 3, width: "60%" }} />
                <div style={{ height: 9, background: "#1a1a1a", borderRadius: 3, width: "85%" }} />
              </div>
            </div>
          )}
          {!loading && data?.image && (
            <img
              src={data.image}
              alt=""
              style={{ width: 80, objectFit: "cover", flexShrink: 0 }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          {!loading && (
            <div
              style={{
                padding: "10px 12px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 3,
                minWidth: 0,
              }}
            >
              <p style={{ fontSize: 10, color: "var(--dim)", margin: 0 }}>{extractDomain(url)}</p>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text)",
                  margin: 0,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                }}
              >
                {data?.title || extractDomain(url)}
              </p>
            </div>
          )}
          <div style={{ padding: "10px 10px 10px 0", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 12, color: "#333" }}>↗</span>
          </div>
        </div>
      </a>
    </div>
  );
}

// 모달용 큰 OG 프리뷰
function LinkPreview({ url }: { url: string }) {
  const { data, loading } = useOGData(url, true);

  if (loading) {
    return (
      <div
        style={{
          border: "1px solid #222",
          borderRadius: 10,
          overflow: "hidden",
          background: "#111",
          marginBottom: 20,
          display: "flex",
          height: 90,
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
        }}
      >
        <div style={{ width: 90, height: 66, background: "#1a1a1a", borderRadius: 4, flexShrink: 0 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ height: 12, background: "#1a1a1a", borderRadius: 4, width: "70%" }} />
          <div style={{ height: 10, background: "#1a1a1a", borderRadius: 4, width: "90%" }} />
        </div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block", marginBottom: 20 }}
    >
      <div
        style={{
          border: "1px solid #2a2a2a",
          borderRadius: 10,
          overflow: "hidden",
          background: "#0e0e0e",
          display: "flex",
          transition: "border-color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#444")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
      >
        {data?.image && (
          <img
            src={data.image}
            alt={data?.title || ""}
            style={{ width: 140, height: 100, objectFit: "cover", flexShrink: 0 }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        )}
        <div
          style={{
            padding: "12px 14px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
            minWidth: 0,
          }}
        >
          <p style={{ fontSize: 11, color: "#555", margin: 0 }}>{data?.hostname}</p>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#E0E0E0",
              margin: 0,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
            }}
          >
            {data?.title || url}
          </p>
          {data?.description && (
            <p
              style={{
                fontSize: 11,
                color: "#666",
                margin: 0,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
              }}
            >
              {data.description}
            </p>
          )}
        </div>
        <div style={{ padding: "12px 12px 12px 0", display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 14, color: "#444" }}>↗</span>
        </div>
      </div>
    </a>
  );
}

// ── 임베드 프리뷰 (X / Threads) ──────────────────
function EmbedPreview({ xUrl, threadsUrl }: { xUrl?: string; threadsUrl?: string }) {
  const [tab, setTab] = useState<"x" | "threads">(xUrl ? "x" : "threads");
  const xRef = useRef<HTMLDivElement>(null);
  const thRef = useRef<HTMLDivElement>(null);
  const [xHtml, setXHtml] = useState<string | null>(null);
  const [xLoading, setXLoading] = useState(false);

  useEffect(() => {
    if (!xUrl) return;
    setXLoading(true);
    fetch(`https://publish.twitter.com/oembed?url=${encodeURIComponent(xUrl)}&dnt=1&theme=dark&hide_thread=false`)
      .then((r) => r.json())
      .then((d) => {
        setXHtml(d.html);
        setXLoading(false);
      })
      .catch(() => setXLoading(false));
  }, [xUrl]);

  useEffect(() => {
    if (!xHtml || !xRef.current) return;
    xRef.current.innerHTML = xHtml;
    const w = window as Window & {
      twttr?: { widgets?: { load: (el?: HTMLElement) => void } };
    };
    if (w.twttr?.widgets) {
      w.twttr.widgets.load(xRef.current);
    } else {
      const s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, [xHtml]);

  useEffect(() => {
    if (!threadsUrl || !thRef.current) return;
    thRef.current.innerHTML = `<blockquote class="text-post-media" data-url="${threadsUrl}"><a href="${threadsUrl}" target="_blank">Threads에서 보기</a></blockquote>`;
    const w = window as Window & {
      instgrm?: { Embeds?: { process?: () => void } };
    };
    if (w.instgrm?.Embeds) {
      w.instgrm.Embeds.process?.();
    } else {
      const existing = document.getElementById("threads-embed-script");
      if (!existing) {
        const s = document.createElement("script");
        s.id = "threads-embed-script";
        s.src = "https://www.threads.net/embed.js";
        s.async = true;
        s.onload = () => {
          (window as Window & { instgrm?: { Embeds?: { process?: () => void } } }).instgrm?.Embeds?.process?.();
        };
        document.head.appendChild(s);
      } else {
        setTimeout(() => {
          (window as Window & { instgrm?: { Embeds?: { process?: () => void } } }).instgrm?.Embeds?.process?.();
        }, 500);
      }
    }
  }, [threadsUrl, tab]);

  if (!xUrl && !threadsUrl) return null;

  return (
    <div style={{ marginBottom: 24 }}>
      {xUrl && threadsUrl && (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button
            onClick={() => setTab("x")}
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 20,
              cursor: "pointer",
              border: "1px solid",
              borderColor: tab === "x" ? "#E87040" : "#333",
              background: tab === "x" ? "#E8704022" : "transparent",
              color: tab === "x" ? "#E87040" : "#555",
            }}
          >
            X 포스트
          </button>
          <button
            onClick={() => setTab("threads")}
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 20,
              cursor: "pointer",
              border: "1px solid",
              borderColor: tab === "threads" ? "#A78BFA" : "#333",
              background: tab === "threads" ? "#A78BFA22" : "transparent",
              color: tab === "threads" ? "#A78BFA" : "#555",
            }}
          >
            Threads 포스트
          </button>
        </div>
      )}

      {(tab === "x" || !threadsUrl) && xUrl && (
        <div>
          {xLoading && (
            <div
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: 12,
                padding: "20px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "#555",
                fontSize: 13,
              }}
            >
              <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span>
              불러오는 중...
            </div>
          )}
          <div ref={xRef} style={{ borderRadius: 12, overflow: "hidden" }} />
          {!xHtml && !xLoading && (
            <a
              href={xUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "#111",
                border: "1px solid #222",
                borderRadius: 12,
                padding: "16px",
                color: "#4A9EFF",
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              🐦 X에서 원문 보기 ↗
            </a>
          )}
        </div>
      )}

      {(tab === "threads" || !xUrl) && threadsUrl && (
        <div ref={thRef} style={{ borderRadius: 12, overflow: "hidden" }} />
      )}
    </div>
  );
}

// ── 상세 모달 ────────────────────────────────────
function PostModal({
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
  const touchStartYRef = useRef<number | null>(null);
  const navBtnStyle = {
    fontSize: 13,
    fontWeight: 700,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #333",
    background: "#1C1C1C",
    color: "#DDD",
    cursor: "pointer",
  } as const;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
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
          background: "#161616",
          border: "1px solid #2a2a2a",
          borderRadius: "16px 16px 0 0",
          width: "100%",
          maxWidth: 680,
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "28px 28px 40px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 56,
              height: 6,
              borderRadius: 999,
              background: "#5A5A5A",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
            }}
          />
        </div>

        <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 8 }}>
          <button
            onClick={onToggleBookmark}
            style={{
              background: "#222",
              border: "none",
              color: bookmarked ? "#F5B942" : "#888",
              fontSize: 18,
              cursor: "pointer",
              width: 32,
              height: 32,
              borderRadius: "50%",
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
            style={{
              background: "#222",
              border: "none",
              color: "#888",
              fontSize: 18,
              cursor: "pointer",
              width: 32,
              height: 32,
              borderRadius: "50%",
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
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#F0F0F0",
            lineHeight: 1.4,
            marginBottom: 16,
            letterSpacing: "-0.01em",
            paddingRight: 80,
          }}
        >
          {post.title}
        </h2>

        {post.summary && (
          <p
            style={{
              fontSize: 14,
              color: "#888",
              marginBottom: 20,
              lineHeight: 1.6,
              paddingLeft: 12,
              borderLeft: `3px solid ${companyColor}`,
            }}
          >
            {post.summary}
          </p>
        )}

        <EmbedPreview xUrl={post.xUrl} threadsUrl={post.threadsUrl} />

        {post.source && <LinkPreview url={post.source} />}

        {post.content && (
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: 8,
              padding: "16px 18px",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#555",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              포스팅 내용
            </p>
            <p style={{ fontSize: 14, color: "#B0B0B0", lineHeight: 1.8, whiteSpace: "pre-line" }}>{post.content}</p>
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
            borderTop: "1px solid #242424",
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
          <span style={{ fontSize: 12, color: "#666", fontVariantNumeric: "tabular-nums" }}>{navigation.positionLabel}</span>
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

// ── 포스트 카드 ──────────────────────────────────
function PostCard({
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
  const sourceDomain = post.source ? extractDomain(post.source) : "—";

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
    <div
      id={`post-${post.title.slice(0, 20)}`}
      className="intel-card"
      onClick={() => { if (hasDetail) { setExpanded(e => !e); onClick(); } }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        cursor: hasDetail ? "pointer" : "default",
        position: "relative",
        opacity: read ? 0.7 : 1,
        borderLeftColor: expanded ? "var(--accent)" : undefined,
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }}>
          <span style={{ color: "var(--gold)" }}>{formatIntelIndex(index)}</span>
          <span style={{ color: "var(--dim)" }}>[</span>
          <PlatformBadge platform={post.platform} />
          <span style={{ color: "var(--dim)" }}>]</span>
          <PostDateLabel date={post.date} defaultYear={defaultYear} />
          <span style={{ color: "var(--dim)" }}>---</span>
          <span style={{ color: companyColor, whiteSpace: "nowrap" }}>{companyName.toUpperCase()}</span>
        </div>
      </div>

      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 10 }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.45,
            color: "var(--text)",
            margin: 0,
          }}
        >
          {highlightText(post.title, searchQuery)}
          {read && (
            <span
              style={{ marginLeft: 8, fontSize: 10, color: "var(--gold)", verticalAlign: "middle", fontFamily: "var(--mono)" }}
              title="읽음"
            >
              READ
            </span>
          )}
        </p>

        {post.summary && (
          <p
            style={{
              fontSize: 12,
              color: "var(--muted)",
              lineHeight: 1.65,
              margin: 0,
              paddingLeft: 10,
              borderLeft: `2px solid ${companyColor}40`,
            }}
          >
            {highlightText(post.summary, searchQuery)}
          </p>
        )}

        {/* 펼쳐진 상태: 전체 상세 정보 */}
        {expanded && post.content && (
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 2,
            padding: "10px 12px",
          }}>
            <p style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "var(--dim)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}>
              CONTENT
            </p>
            <p style={{
              fontSize: 12,
              color: "var(--text)",
              lineHeight: 1.75,
              whiteSpace: "pre-line",
              margin: 0,
            }}>
              {highlightText(post.content, searchQuery)}
            </p>
          </div>
        )}

        {/* 소스 + 플랫폼 링크 (펼쳐진 상태만) */}
        {expanded && (<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }} onClick={e => e.stopPropagation()}>
          {post.source && (
            <a href={post.source} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontFamily: "var(--mono)", fontSize: 10,
                color: "var(--accent)", letterSpacing: "0.06em",
                textDecoration: "none", padding: "4px 8px",
                border: "1px solid var(--accent)30",
                borderRadius: 2,
              }}>
              SOURCE ↗
            </a>
          )}
          {post.xUrl && (
            <a href={post.xUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontFamily: "var(--mono)", fontSize: 10,
                color: "#E4E4E7", letterSpacing: "0.06em",
                textDecoration: "none", padding: "4px 8px",
                background: "#18181B", borderRadius: 2,
              }}>
              X POST ↗
            </a>
          )}
          {post.threadsUrl && (
            <a href={post.threadsUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontFamily: "var(--mono)", fontSize: 10,
                color: "#A78BFA", letterSpacing: "0.06em",
                textDecoration: "none", padding: "4px 8px",
                background: "#1A1A2E", borderRadius: 2,
              }}>
              THREADS ↗
            </a>
          )}
        </div>)}

      </div>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "var(--dim)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {sourceDomain}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleCopy}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              color: copied ? "var(--accent)" : "var(--muted)",
              padding: 0,
              lineHeight: 1,
              fontFamily: "var(--mono)",
            }}
            title="포스팅 링크 복사"
          >
            🔗
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              color: bookmarked ? "var(--gold)" : "var(--muted)",
              padding: 0,
              lineHeight: 1,
              fontFamily: "var(--mono)",
            }}
            title={bookmarked ? "북마크 해제" : "북마크"}
          >
            ★
          </button>
          {hasDetail && (
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: expanded ? "var(--gold)" : "var(--muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "color 0.12s",
              }}
            >
              {expanded ? "CLOSE ↑" : "EXPAND ↓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── 회사 섹션 ────────────────────────────────────
function CompanySection({
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
  viewMode,
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
  viewMode: ViewMode;
}) {
  return (
    <section id={getCompanySectionId(company.name)} style={{ marginBottom: 40, scrollMarginTop: 150 }}>
      <button
        onClick={onToggleCollapsed}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: collapsed ? 0 : 14,
          padding: "14px 0 0",
          borderLeft: "none",
          borderTop: "1px solid var(--border)",
          background: "none",
          borderRight: "none",
          borderBottom: "none",
          borderInline: "none",
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
        }}
      >
        <span style={{ width: 3, height: 18, background: company.color, flexShrink: 0 }} />
        <h2
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "0.08em",
            margin: 0,
            fontFamily: "var(--mono)",
            textTransform: "uppercase",
          }}
        >
          {company.name}
        </h2>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: company.color,
            background: `${company.color}14`,
            padding: "3px 8px",
            border: `1px solid ${company.color}30`,
            fontFamily: "var(--mono)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          [{company.posts.length} ITEMS]
        </span>
        <span
          style={{
            marginLeft: "auto",
            color: "var(--dim)",
            fontSize: 12,
            transform: collapsed ? "rotate(-90deg)" : "none",
            transition: "transform 0.2s",
            fontFamily: "var(--mono)",
          }}
        >
          ▾
        </span>
      </button>

      {!collapsed && (
        <div
          style={
            viewMode === "grid"
              ? {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 6,
                }
              : { display: "flex", flexDirection: "column", gap: 6 }
          }
        >
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

// ── 통계 바 ──────────────────────────────────────
function StatsBar({
  companies,
  actionMode,
  onCompanyClick,
  onCompanyScroll,
  onToggleActionMode,
}: {
  companies: Company[];
  actionMode: StatsActionMode;
  onCompanyClick: (name: string) => void;
  onCompanyScroll: (name: string) => void;
  onToggleActionMode: () => void;
}) {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const max = Math.max(...companies.map((c) => c.posts.length));
  const total = companies.reduce((sum, company) => sum + company.posts.length, 0);

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 2,
        padding: "18px 16px",
        marginBottom: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <h3
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: 0,
            fontFamily: "var(--mono)",
          }}
        >
          INTELLIGENCE DISTRIBUTION
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <button
            onClick={onToggleActionMode}
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: actionMode === "filter" ? "var(--muted)" : "var(--accent)",
              border: "1px solid var(--border)",
              background: "transparent",
              borderRadius: 2,
              padding: "5px 10px",
              cursor: "pointer",
              fontFamily: "var(--mono)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
            title={actionMode === "filter" ? "클릭 시 섹션 스크롤로 전환" : "클릭 시 회사 필터로 전환"}
          >
            {actionMode === "filter" ? "FILTER" : "SCROLL"}
          </button>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", whiteSpace: "nowrap", fontFamily: "var(--mono)" }}>
            {String(total).padStart(2, "0")} TOTAL
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {companies.map((company) => {
          const ratio = total > 0 ? (company.posts.length / total) * 100 : 0;
          const visible = hoveredCompany === company.name;
          const bar = renderIntelBar(company.posts.length, max);

          return (
            <div
              key={company.name}
              onClick={() => (actionMode === "filter" ? onCompanyClick(company.name) : onCompanyScroll(company.name))}
              onMouseEnter={() => setHoveredCompany(company.name)}
              onMouseLeave={() => setHoveredCompany(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(120px, 160px) 30px minmax(0, 1fr)",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                position: "relative",
                fontFamily: "var(--mono)",
                fontSize: 11,
              }}
              title={company.name}
            >
              <span
                style={{
                  color: "var(--muted)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {company.name}
              </span>
              <span style={{ width: 30, textAlign: "right", color: company.color, fontWeight: 700 }}>
                {company.posts.length}
              </span>
              <span style={{ color: visible ? "var(--text)" : "var(--dim)", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden" }}>
                <span style={{ color: company.color }}>{bar.slice(0, bar.indexOf("░") === -1 ? bar.length : bar.indexOf("░"))}</span>
                <span style={{ color: "var(--dim)" }}>{bar.slice(bar.indexOf("░") === -1 ? bar.length : bar.indexOf("░"))}</span>
                <span style={{ marginLeft: 10, color: "var(--muted)" }}>{ratio.toFixed(1)}%</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HighlightCard({
  company,
  post,
  onOpen,
}: {
  company: Company;
  post: Post;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      style={{
        width: "100%",
        textAlign: "left",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderLeft: "3px solid var(--accent)",
        borderRadius: 2,
        padding: "18px 20px",
        marginBottom: 18,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--accent)",
            letterSpacing: "0.08em",
            fontFamily: "var(--mono)",
          }}
        >
          ▌ THIS WEEK'S LEAD
        </span>
        <span style={{ fontSize: 11, color: company.color, fontWeight: 700, fontFamily: "var(--mono)", letterSpacing: "0.06em" }}>
          {company.name.toUpperCase()}
        </span>
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.5, color: "var(--text)", fontWeight: 700, margin: "0 0 8px" }}>{post.title}</p>
      {post.summary && <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{post.summary}</p>}
    </button>
  );
}

// ── 주차 드롭다운 ────────────────────────────────
function WeekDropdown({ currentSlug, currentWeek }: { currentSlug: string; currentWeek: number }) {
  const [open, setOpen] = useState(false);
  const weekList = getWeekList();

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 6,
          padding: "4px 12px",
          color: "var(--text)",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        W{currentWeek} <span style={{ fontSize: 10, color: "var(--muted)" }}>▾</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: 8,
              padding: 8,
              zIndex: 100,
              minWidth: 120,
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            {weekList.map((week) => (
              <a
                key={week.slug}
                href={`/${week.slug}`}
                style={{
                  display: "block",
                  padding: "6px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: week.slug === currentSlug ? "#E87040" : "var(--muted)",
                  textDecoration: "none",
                  borderRadius: 4,
                  background: week.slug === currentSlug ? "#E8704018" : "transparent",
                }}
                onClick={() => setOpen(false)}
              >
                {week.year} W{week.week}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── 메인 컴포넌트 ────────────────────────────────
export default function WeeklyClient({
  data,
  prevWeek,
  nextWeek,
}: {
  data: WeeklyData;
  prevWeek?: { slug: string; week: number };
  nextWeek?: { slug: string; week: number };
}) {
  const [selectedPost, setSelectedPost] = useState<SelectedPostState | null>(null);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [bookmarkFilter, setBookmarkFilter] = useState(false);
  const [hideReadFilter, setHideReadFilter] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [readPosts, setReadPosts] = useState<string[]>([]);
  const [collapsedCompanies, setCollapsedCompanies] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [bookmarksCopied, setBookmarksCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [statsActionMode, setStatsActionMode] = useState<StatsActionMode>("filter");
  const urlReadyRef = useRef(false);
  const pendingPostFromUrlRef = useRef<string | null>(null);
  const searchBlurTimeoutRef = useRef<number | null>(null);

  const companiesByName = useMemo(() => {
    return new Map(data.companies.map((company) => [company.name, company]));
  }, [data.companies]);

  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks]);
  const readSet = useMemo(() => new Set(readPosts), [readPosts]);
  const collapsedSet = useMemo(() => new Set(collapsedCompanies), [collapsedCompanies]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {}

    try {
      const storedRecentSearches = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
      if (storedRecentSearches) setRecentSearches(JSON.parse(storedRecentSearches));
    } catch {}

    try {
      const storedViewMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY) as ViewMode | null;
      if (storedViewMode === "list" || storedViewMode === "grid") setViewMode(storedViewMode);
    } catch {}

    try {
      const storedSortOrder = localStorage.getItem(SORT_ORDER_STORAGE_KEY) as SortOrder | null;
      if (storedSortOrder === "latest" || storedSortOrder === "oldest" || storedSortOrder === "company") {
        setSortOrder(storedSortOrder);
      }
    } catch {}

    try {
      const storedStatsAction = localStorage.getItem(STATS_ACTION_STORAGE_KEY) as StatsActionMode | null;
      if (storedStatsAction === "filter" || storedStatsAction === "scroll") setStatsActionMode(storedStatsAction);
    } catch {}

    try {
      const storedReadPosts = data.companies.flatMap((company) =>
        company.posts
          .filter((post) => localStorage.getItem(getReadStorageKey(post.title)))
          .map((post) => post.title)
      );
      setReadPosts(storedReadPosts);
    } catch {}

    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") ?? "";
    const initialPost = params.get("post");

    if (initialQuery) setSearch(initialQuery);
    if (initialPost) pendingPostFromUrlRef.current = initialPost;
    urlReadyRef.current = true;
  }, [data.companies]);

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode);
    } catch {}
  }, [viewMode]);

  useEffect(() => {
    try {
      localStorage.setItem(SORT_ORDER_STORAGE_KEY, sortOrder);
    } catch {}
  }, [sortOrder]);

  useEffect(() => {
    try {
      localStorage.setItem(STATS_ACTION_STORAGE_KEY, statsActionMode);
    } catch {}
  }, [statsActionMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (search.trim().length < 3) return;

    const timeoutId = window.setTimeout(() => {
      setRecentSearches((prev) => {
        const next = upsertRecentSearches(prev, search);
        try {
          localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    return () => {
      if (searchBlurTimeoutRef.current) {
        window.clearTimeout(searchBlurTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const pendingTitle = pendingPostFromUrlRef.current;
    if (!pendingTitle) return;

    for (const company of data.companies) {
      const post = company.posts.find((item) => item.title === pendingTitle);
      if (post) {
        setSelectedPost({ companyName: company.name, title: post.title });
        pendingPostFromUrlRef.current = null;
        return;
      }
    }

    pendingPostFromUrlRef.current = null;
  }, [data.companies]);

  const syncUrlState = useCallback((nextSearch: string, nextSelectedPost: SelectedPostState | null) => {
    if (typeof window === "undefined" || !urlReadyRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const trimmedSearch = nextSearch.trim();

    if (trimmedSearch) {
      params.set("q", trimmedSearch);
    } else {
      params.delete("q");
    }

    if (nextSelectedPost?.title) {
      params.set("post", nextSelectedPost.title);
    } else {
      params.delete("post");
    }

    const nextUrl = buildUrlWithParams(window.location.pathname, params);
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (nextUrl !== currentUrl) {
      window.history.pushState({}, "", nextUrl);
    }
  }, []);

  useEffect(() => {
    syncUrlState(search, selectedPost);
  }, [search, selectedPost, syncUrlState]);

  const markAsRead = useCallback((title: string) => {
    setReadPosts((prev) => {
      if (prev.includes(title)) return prev;
      const next = [...prev, title];
      try {
        localStorage.setItem(getReadStorageKey(title), "1");
      } catch {}
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((title: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title];
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const openPost = useCallback(
    (post: Post, companyName: string) => {
      markAsRead(post.title);
      setSelectedPost({ companyName, title: post.title });
    },
    [markAsRead]
  );

  const toggleCompanyCollapsed = useCallback((companyName: string) => {
    setCollapsedCompanies((prev) =>
      prev.includes(companyName) ? prev.filter((item) => item !== companyName) : [...prev, companyName]
    );
  }, []);

  const saveRecentSearch = useCallback((query: string) => {
    if (query.trim().length < 1) return;
    setRecentSearches((prev) => {
      const next = upsertRecentSearches(prev, query);
      try {
        localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const removeRecentSearch = useCallback((query: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((item) => item !== query);
      try {
        localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      const inInput = active?.tagName === "INPUT" || active?.tagName === "TEXTAREA";

      if (e.key === "Escape") {
        setSelectedPost(null);
        return;
      }

      if (e.key === "/" && !inInput) {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
        return;
      }

      if (selectedPost && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        const company = companiesByName.get(selectedPost.companyName);
        const visibleCompany = filteredCompaniesRef.current.find((item) => item.name === selectedPost.companyName);
        const posts = visibleCompany?.posts ?? company?.posts ?? [];
        const currentIndex = posts.findIndex((post) => post.title === selectedPost.title);
        if (currentIndex === -1) return;

        if (e.key === "ArrowLeft" && currentIndex > 0) {
          const prevPost = posts[currentIndex - 1];
          markAsRead(prevPost.title);
          setSelectedPost({ companyName: selectedPost.companyName, title: prevPost.title });
        }

        if (e.key === "ArrowRight" && currentIndex < posts.length - 1) {
          const nextPost = posts[currentIndex + 1];
          markAsRead(nextPost.title);
          setSelectedPost({ companyName: selectedPost.companyName, title: nextPost.title });
        }
        return;
      }

      if (inInput) return;

      if (e.key === "ArrowLeft" && prevWeek) {
        window.location.href = `/${prevWeek.slug}`;
      } else if (e.key === "ArrowRight" && nextWeek) {
        window.location.href = `/${nextWeek.slug}`;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [companiesByName, markAsRead, nextWeek, prevWeek, selectedPost]);

  const filteredCompanies = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    const getCompanySortValue = (company: Company, mode: SortOrder) => {
      const timestamps = company.posts
        .map((post) => parsePostDate(post.date, data.year)?.getTime() ?? null)
        .filter((value): value is number => value !== null);

      if (timestamps.length === 0) return 0;
      return mode === "oldest" ? Math.min(...timestamps) : Math.max(...timestamps);
    };

    return data.companies
      .map((company) => ({
        ...company,
        posts: company.posts.filter((post) => {
          const matchSearch =
            !query ||
            post.title.toLowerCase().includes(query) ||
            (post.summary || "").toLowerCase().includes(query) ||
            (post.content || "").toLowerCase().includes(query);
          const matchPlatform =
            platformFilter === "all" || post.platform === platformFilter || post.platform.includes(platformFilter);
          const matchBookmark = !bookmarkFilter || bookmarkSet.has(post.title);
          const matchRead = !hideReadFilter || !readSet.has(post.title);
          return matchSearch && matchPlatform && matchBookmark && matchRead;
        }),
      }))
      .filter((company) => {
        if (companyFilter !== "all" && company.name !== companyFilter) return false;
        return company.posts.length > 0;
      })
      .sort((a, b) => {
        if (sortOrder === "company") {
          return a.name.localeCompare(b.name, "ko");
        }

        const aValue = getCompanySortValue(a, sortOrder);
        const bValue = getCompanySortValue(b, sortOrder);
        const diff = sortOrder === "oldest" ? aValue - bValue : bValue - aValue;
        return diff || a.name.localeCompare(b.name, "ko");
      });
  }, [
    bookmarkFilter,
    bookmarkSet,
    companyFilter,
    data.companies,
    data.year,
    deferredSearch,
    hideReadFilter,
    platformFilter,
    readSet,
    sortOrder,
  ]);

  const filteredCompaniesRef = useRef<Company[]>(filteredCompanies);
  useEffect(() => {
    filteredCompaniesRef.current = filteredCompanies;
  }, [filteredCompanies]);

  const selectedCompany = selectedPost ? companiesByName.get(selectedPost.companyName) ?? null : null;
  const selectedPostData = selectedCompany?.posts.find((post) => post.title === selectedPost?.title) ?? null;

  const modalNavigation = useMemo<ModalNavigation>(() => {
    if (!selectedPost) {
      return {
        hasPrev: false,
        hasNext: false,
        onPrev: () => {},
        onNext: () => {},
        positionLabel: "",
      };
    }

    const visibleCompany = filteredCompanies.find((company) => company.name === selectedPost.companyName);
    const sourceCompany = visibleCompany ?? companiesByName.get(selectedPost.companyName) ?? null;
    const posts = sourceCompany?.posts ?? [];
    const currentIndex = posts.findIndex((post) => post.title === selectedPost.title);
    const total = posts.length;

    return {
      hasPrev: currentIndex > 0,
      hasNext: currentIndex >= 0 && currentIndex < total - 1,
      onPrev: () => {
        if (currentIndex <= 0) return;
        const prevPost = posts[currentIndex - 1];
        markAsRead(prevPost.title);
        setSelectedPost({ companyName: selectedPost.companyName, title: prevPost.title });
      },
      onNext: () => {
        if (currentIndex === -1 || currentIndex >= total - 1) return;
        const nextPost = posts[currentIndex + 1];
        markAsRead(nextPost.title);
        setSelectedPost({ companyName: selectedPost.companyName, title: nextPost.title });
      },
      positionLabel: currentIndex >= 0 && total > 0 ? `${currentIndex + 1} / ${total}` : "현재 필터 밖 포스팅",
    };
  }, [companiesByName, filteredCompanies, markAsRead, selectedPost]);

  const totalFiltered = filteredCompanies.reduce((sum, company) => sum + company.posts.length, 0);
  const visibleCompanyNames = filteredCompanies.map((company) => company.name);
  const companyStartIndex = useMemo(() => {
    let running = 1;
    return new Map(
      filteredCompanies.map((company) => {
        const start = running;
        running += company.posts.length;
        return [company.name, start];
      })
    );
  }, [filteredCompanies]);
  const readFilteredCount = filteredCompanies.reduce(
    (sum, company) => sum + company.posts.filter((post) => readSet.has(post.title)).length,
    0
  );
  const readProgressBar = renderIntelBar(readFilteredCount, Math.max(totalFiltered, 1));
  const highlightedEntry = useMemo(() => {
    for (const company of data.companies) {
      const featuredPost = company.posts.find((post) => post.featured);
      if (featuredPost) {
        return { company, post: featuredPost };
      }
    }

    const topCompany = [...data.companies]
      .sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name))[0];
    if (!topCompany?.posts[0]) return null;
    return { company: topCompany, post: topCompany.posts[0] };
  }, [data.companies]);
  const isFiltering =
    search.trim().length > 0 || platformFilter !== "all" || companyFilter !== "all" || bookmarkFilter || hideReadFilter;

  const exportBookmarks = useCallback(() => {
    const grouped = data.companies
      .map((company) => ({
        company,
        posts: company.posts.filter((post) => bookmarkSet.has(post.title)),
      }))
      .filter((entry) => entry.posts.length > 0);

    if (grouped.length === 0) return;

    const markdown = [
      "# VoidNews 북마크",
      "",
      ...grouped.flatMap(({ company, posts }) => [
        `## ${company.name}`,
        ...posts.flatMap((post) => [
          `- **${post.title}** (${post.date})`,
          `  ${post.summary || post.content?.split("\n")[0] || "요약 없음"}`,
          `  링크: ${post.source || post.xUrl || post.threadsUrl || getPostLink(post.title)}`,
          "",
        ]),
      ]),
    ].join("\n");

    navigator.clipboard.writeText(markdown).then(() => {
      setBookmarksCopied(true);
      window.setTimeout(() => setBookmarksCopied(false), 1600);
    });
  }, [bookmarkSet, data.companies]);

  const scrollToCompany = useCallback((companyName: string) => {
    const section = document.getElementById(getCompanySectionId(companyName));
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {selectedPostData && selectedCompany && (
        <PostModal
          post={selectedPostData}
          defaultYear={data.year}
          companyColor={selectedCompany.color}
          bookmarked={bookmarkSet.has(selectedPostData.title)}
          onToggleBookmark={() => toggleBookmark(selectedPostData.title)}
          onClose={() => setSelectedPost(null)}
          navigation={modalNavigation}
        />
      )}

      <main
        style={{
          maxWidth: viewMode === "grid" ? 1040 : 720,
          margin: "0 auto",
          padding: "40px 20px 96px",
          transition: "max-width 0.2s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          {prevWeek ? (
            <a
              href={`/${prevWeek.slug}`}
              style={{ fontSize: 12, color: "var(--muted)", textDecoration: "none", fontFamily: "var(--mono)" }}
              title="이전 주차 (←)"
            >
              ← W{prevWeek.week}
            </a>
          ) : (
            <div />
          )}

          <WeekDropdown currentSlug={data.slug} currentWeek={data.week} />

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {nextWeek ? (
              <a
                href={`/${nextWeek.slug}`}
                style={{ fontSize: 12, color: "var(--muted)", textDecoration: "none", fontFamily: "var(--mono)" }}
                title="다음 주차 (→)"
              >
                W{nextWeek.week} →
              </a>
            ) : (
              <div />
            )}
          </div>
        </div>

        <div style={{ marginBottom: 24, marginTop: 20 }}>
          <p
            style={{
              fontSize: 11,
              color: "var(--gold)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 10,
              fontFamily: "var(--mono)",
            }}
          >
            {data.year} · Week {data.week}
          </p>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              lineHeight: 1.1,
              margin: "0 0 10px",
            }}
          >
            VOIDNEWS // WEEK {String(data.week).padStart(2, "0")} BRIEFING
          </h1>
          <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
            {data.period} · <span style={{ color: "var(--accent)", fontWeight: 700 }}>{data.totalPosts}</span> intelligence items archived
          </p>
        </div>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 2,
            padding: "14px 16px",
            marginBottom: 18,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "var(--text)",
              fontFamily: "var(--mono)",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              overflowX: "auto",
            }}
          >
            [{readProgressBar}]&nbsp;&nbsp;{readFilteredCount} / {totalFiltered} READ
          </p>
        </div>

        <div
          style={{
            position: "sticky",
            top: 56,
            zIndex: 40,
            background: "rgba(8,8,8,0.94)",
            paddingTop: 12,
            paddingBottom: 12,
            marginBottom: 32,
            borderBottom: "1px solid var(--border)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: "1 1 280px", minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    padding: "10px 12px",
                  }}
                >
                  <span style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: 14, flexShrink: 0 }}>{">"}</span>
                  <input
                    id="search-input"
                    type="text"
                    placeholder="SEARCH INTELLIGENCE..."
                    value={search}
                    onFocus={() => {
                      if (searchBlurTimeoutRef.current) window.clearTimeout(searchBlurTimeoutRef.current);
                      setShowRecentSearches(true);
                    }}
                    onBlur={() => {
                      searchBlurTimeoutRef.current = window.setTimeout(() => setShowRecentSearches(false), 120);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveRecentSearch(search);
                    }}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      startTransition(() => {
                        setSearch(nextValue);
                      });
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--text)",
                      fontSize: 13,
                      outline: "none",
                      width: "100%",
                      fontFamily: "var(--mono)",
                      letterSpacing: "0.04em",
                    }}
                  />
                </div>
                {showRecentSearches && recentSearches.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      right: 0,
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 2,
                      padding: 8,
                      zIndex: 30,
                      boxShadow: "0 16px 40px rgba(0,0,0,0.28)",
                    }}
                  >
                    <p style={{ fontSize: 11, color: "var(--muted)", margin: "2px 6px 8px", fontFamily: "var(--mono)" }}>RECENT SEARCHES</p>
                    {[...recentSearches].reverse().slice(0, 3).map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                          borderRadius: 8,
                        }}
                      >
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            if (searchBlurTimeoutRef.current) window.clearTimeout(searchBlurTimeoutRef.current);
                            setSearch(item);
                            setShowRecentSearches(false);
                          }}
                          style={{
                            flex: 1,
                            textAlign: "left",
                            background: "transparent",
                            border: "none",
                            color: "var(--text)",
                            padding: "10px 8px",
                            cursor: "pointer",
                            fontSize: 12,
                            fontFamily: "var(--mono)",
                          }}
                        >
                          {item}
                        </button>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => removeRecentSearch(item)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--muted)",
                            cursor: "pointer",
                            fontSize: 14,
                            padding: "6px 8px",
                            lineHeight: 1,
                          }}
                          title="최근 검색어 삭제"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0, flexWrap: "wrap" }}>
                <button
                  onClick={() => setViewMode((prev) => (prev === "list" ? "grid" : "list"))}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "10px 12px",
                    borderRadius: 2,
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    color: "var(--text)",
                    cursor: "pointer",
                    minWidth: 82,
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.06em",
                  }}
                  title={viewMode === "list" ? "그리드 보기" : "리스트 보기"}
                >
                  {viewMode === "list" ? "GRID" : "LIST"}
                </button>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                    padding: "10px 12px",
                    color: "var(--text)",
                    fontSize: 11,
                    fontWeight: 600,
                    outline: "none",
                    cursor: "pointer",
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                  aria-label="정렬"
                >
                  <option value="latest">LATEST</option>
                  <option value="oldest">OLDEST</option>
                  <option value="company">COMPANY</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {["all", "X", "Threads"].map((platform) => (
                <button
                  key={platform}
                  onClick={() => setPlatformFilter(platform)}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "5px 12px",
                    borderRadius: 2,
                    border: "1px solid",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    flexShrink: 0,
                    borderColor: platformFilter === platform ? "var(--accent)" : "var(--border)",
                    background: platformFilter === platform ? "var(--accent)" : "transparent",
                    color: platformFilter === platform ? "#000" : "var(--muted)",
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {platform === "all" ? "ALL" : platform.toUpperCase()}
                </button>
              ))}

              <span style={{ color: "var(--dim)", fontSize: 12, fontFamily: "var(--mono)" }}>//</span>

              <button
                onClick={() => setBookmarkFilter((prev) => !prev)}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: 2,
                  border: "1px solid",
                  cursor: "pointer",
                  flexShrink: 0,
                  borderColor: bookmarkFilter ? "var(--gold)" : "var(--border)",
                  background: bookmarkFilter ? "#C8A84B16" : "transparent",
                  color: bookmarkFilter ? "var(--gold)" : "var(--muted)",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.06em",
                }}
              >
                ★ BOOKMARKS {bookmarks.length > 0 ? `(${bookmarks.length})` : ""}
              </button>
              <button
                onClick={() => setHideReadFilter((prev) => !prev)}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: 2,
                  border: "1px solid",
                  cursor: "pointer",
                  flexShrink: 0,
                  borderColor: hideReadFilter ? "var(--red)" : "var(--border)",
                  background: hideReadFilter ? "#CC330016" : "transparent",
                  color: hideReadFilter ? "var(--red)" : "var(--muted)",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.06em",
                }}
              >
                HIDE READ {readPosts.length > 0 ? `(${readPosts.length})` : ""}
              </button>
              <button
                onClick={() =>
                  setCollapsedCompanies((prev) =>
                    visibleCompanyNames.every((companyName) => prev.includes(companyName))
                      ? prev.filter((companyName) => !visibleCompanyNames.includes(companyName))
                      : [...new Set([...prev, ...visibleCompanyNames])]
                  )
                }
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: 2,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text)",
                  cursor: "pointer",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.06em",
                }}
              >
                {visibleCompanyNames.every((companyName) => collapsedSet.has(companyName)) ? "EXPAND ALL" : "COLLAPSE ALL"}
              </button>

              {bookmarks.length > 0 && (
                <button
                  onClick={exportBookmarks}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "5px 12px",
                    borderRadius: 2,
                    border: "1px solid var(--accent)",
                    cursor: "pointer",
                    flexShrink: 0,
                    background: bookmarksCopied ? "var(--accent)" : "transparent",
                    color: bookmarksCopied ? "#111" : "#E87040",
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {bookmarksCopied ? "COPIED" : "EXPORT ↓"}
                </button>
              )}
            </div>

            <div className="scroll-hide" style={{ display: "flex", gap: 8, overflowX: "auto", flexWrap: "nowrap" }}>
              <button
                onClick={() => setCompanyFilter("all")}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: 2,
                  border: "1px solid",
                  cursor: "pointer",
                  flexShrink: 0,
                  borderColor: companyFilter === "all" ? "var(--accent)" : "var(--border)",
                  background: companyFilter === "all" ? "var(--accent)" : "transparent",
                  color: companyFilter === "all" ? "#000" : "var(--muted)",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.06em",
                }}
              >
                ALL COMPANIES
              </button>
              {data.companies.map((company) => (
                <button
                  key={company.name}
                  onClick={() => setCompanyFilter(companyFilter === company.name ? "all" : company.name)}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "5px 12px",
                    borderRadius: 2,
                    border: "1px solid",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    flexShrink: 0,
                    borderColor: companyFilter === company.name ? company.color : "var(--border)",
                    background: companyFilter === company.name ? `${company.color}22` : "transparent",
                    color: companyFilter === company.name ? company.color : "var(--muted)",
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {company.name.split(" /")[0].toUpperCase()}
                </button>
              ))}
            </div>

            {isFiltering && (
              <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>
                {String(totalFiltered).padStart(2, "0")} MATCHES
                <button
                  onClick={() => {
                    setSearch("");
                    setPlatformFilter("all");
                    setCompanyFilter("all");
                    setBookmarkFilter(false);
                    setHideReadFilter(false);
                  }}
                  style={{
                    marginLeft: 12,
                    fontSize: 11,
                    color: "var(--accent)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--mono)",
                  }}
                >
                  RESET FILTERS
                </button>
              </p>
            )}
          </div>
        </div>

        {highlightedEntry && (
          <div style={{ marginBottom: 6 }}>
            <HighlightCard
              company={highlightedEntry.company}
              post={highlightedEntry.post}
              onOpen={() => openPost(highlightedEntry.post, highlightedEntry.company.name)}
            />
          </div>
        )}

        <StatsBar
          companies={filteredCompanies}
          actionMode={statsActionMode}
          onCompanyClick={(name) => setCompanyFilter(companyFilter === name ? "all" : name)}
          onCompanyScroll={scrollToCompany}
          onToggleActionMode={() =>
            setStatsActionMode((prev) => (prev === "filter" ? "scroll" : "filter"))
          }
        />

        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <CompanySection
              key={company.name}
              company={company}
              startIndex={companyStartIndex.get(company.name) ?? 1}
              defaultYear={data.year}
              onPostClick={openPost}
              bookmarks={bookmarkSet}
              onBookmark={toggleBookmark}
              readPosts={readSet}
              searchQuery={search}
              collapsed={collapsedSet.has(company.name)}
              onToggleCollapsed={() => toggleCompanyCollapsed(company.name)}
              viewMode={viewMode}
            />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)", fontFamily: "var(--mono)" }}>
            <p style={{ fontSize: 12, marginBottom: 12 }}>NO MATCHING INTELLIGENCE</p>
            <p style={{ fontSize: 11, color: "var(--dim)" }}>ADJUST QUERY PARAMETERS</p>
          </div>
        )}

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: "var(--dim)", textAlign: "center", letterSpacing: "0.05em", fontFamily: "var(--mono)" }}>
            ⌨️ &nbsp;
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 5px", fontSize: 10 }}>
              /
            </kbd>{" "}
            SEARCH &nbsp;·&nbsp;
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 5px", fontSize: 10 }}>
              ←
            </kbd>
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 5px", fontSize: 10 }}>
              →
            </kbd>{" "}
            NAVIGATE &nbsp;·&nbsp;
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 5px", fontSize: 10 }}>
              ESC
            </kbd>{" "}
            CLOSE
          </p>
        </div>

        <div style={{ paddingTop: 8, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--dim)" }}>
            by{" "}
            <a
              href="https://www.threads.com/@voidlight00"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--muted)", textDecoration: "none" }}
            >
              @voidlight00
            </a>
            {" "}&nbsp;·&nbsp;{" "}
            <a
              href="https://x.com/VoidLight_Hyeon"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--muted)", textDecoration: "none" }}
            >
              @VoidLight_Hyeon
            </a>
          </p>
        </div>

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed",
              right: 20,
              bottom: 80,
              zIndex: 50,
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "none",
              background: "#E87040",
              color: "#111",
              fontSize: 22,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 12px 28px rgba(232,112,64,0.28)",
            }}
            title="맨 위로"
          >
            ↑
          </button>
        )}
      </main>
    </>
  );
}
