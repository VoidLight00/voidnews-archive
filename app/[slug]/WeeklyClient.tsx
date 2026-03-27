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
const MAX_RECENT_SEARCHES = 5;

function getReadStorageKey(title: string) {
  return `${READ_STORAGE_PREFIX}${title}`;
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
      style={{ fontSize: 12, color: "var(--dim)", fontVariantNumeric: "tabular-nums" }}
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
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 7px",
        borderRadius: 4,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
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
              <p style={{ fontSize: 10, color: "#555", margin: 0 }}>{data?.hostname || url}</p>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#C0C0C0",
                  margin: 0,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                }}
              >
                {data?.title || url}
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
  post,
  defaultYear,
  onClick,
  bookmarked,
  onBookmark,
  read,
  searchQuery,
}: {
  post: Post;
  defaultYear: number;
  onClick: () => void;
  bookmarked: boolean;
  onBookmark: () => void;
  read: boolean;
  searchQuery: string;
}) {
  const [copied, setCopied] = useState(false);
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
    <div
      id={`post-${post.title.slice(0, 20)}`}
      className="post-card"
      onClick={onClick}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        cursor: "pointer",
        position: "relative",
        opacity: read ? 0.7 : 1,
        transition: "opacity 0.15s, border-color 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <PlatformBadge platform={post.platform} />
        <PostDateLabel date={post.date} defaultYear={defaultYear} />
        {hasDetail && (
          <span
            className="detail-hint"
            style={{
              marginLeft: "auto",
              fontSize: 10,
              color: "#555",
              letterSpacing: "0.05em",
              transition: "color 0.15s",
            }}
          >
            자세히 보기 →
          </span>
        )}
        <div style={{ display: "flex", gap: 4, marginLeft: hasDetail ? 8 : "auto" }} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleCopy}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              color: copied ? "#E87040" : "#444",
              padding: "2px 4px",
              lineHeight: 1,
            }}
            title="포스팅 링크 복사"
          >
            {copied ? "✓" : "🔗"}
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
              fontSize: 13,
              color: bookmarked ? "#F5B942" : "#444",
              padding: "2px 4px",
              lineHeight: 1,
            }}
            title={bookmarked ? "북마크 해제" : "북마크"}
          >
            {bookmarked ? "★" : "☆"}
          </button>
        </div>
      </div>

      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text)", fontWeight: 500, margin: 0 }}>
        {highlightText(post.title, searchQuery)}
        {read && (
          <span style={{ marginLeft: 6, fontSize: 11, color: "#78C97C", verticalAlign: "middle" }} title="읽음">
            ●
          </span>
        )}
      </p>

      {post.summary && (
        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
          {highlightText(post.summary, searchQuery)}
        </p>
      )}

      {post.source && <CardLinkPreview url={post.source} />}
    </div>
  );
}

// ── 회사 섹션 ────────────────────────────────────
function CompanySection({
  company,
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
    <section style={{ marginBottom: 40 }}>
      <button
        onClick={onToggleCollapsed}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: collapsed ? 0 : 16,
          paddingLeft: 14,
          borderLeft: `4px solid ${company.color}`,
          background: "none",
          borderTop: "none",
          borderRight: "none",
          borderBottom: "none",
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
        }}
      >
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", letterSpacing: "0.02em", margin: 0 }}>
          {company.name}
        </h2>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: company.color,
            background: `${company.color}18`,
            padding: "2px 8px",
            borderRadius: 20,
          }}
        >
          {company.posts.length}건
        </span>
        <span
          style={{
            marginLeft: "auto",
            color: "#444",
            fontSize: 14,
            transform: collapsed ? "rotate(-90deg)" : "none",
            transition: "transform 0.2s",
          }}
        >
          ▾
        </span>
      </button>

      {!collapsed && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {company.posts.map((post, index) => (
            <PostCard
              key={`${post.title}-${index}`}
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
  onCompanyClick,
}: {
  companies: Company[];
  onCompanyClick: (name: string) => void;
}) {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const max = Math.max(...companies.map((c) => c.posts.length));
  const total = companies.reduce((sum, company) => sum + company.posts.length, 0);

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "22px 24px",
        marginBottom: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
        <h3
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--muted)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          회사별 분포 <span style={{ fontSize: 10, color: "#444", fontWeight: 400 }}>(클릭 → 필터)</span>
        </h3>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap" }}>총 {total}건</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {companies.map((company) => {
          const ratio = total > 0 ? (company.posts.length / total) * 100 : 0;
          const visible = hoveredCompany === company.name;

          return (
            <div
              key={company.name}
              onClick={() => onCompanyClick(company.name)}
              onMouseEnter={() => setHoveredCompany(company.name)}
              onMouseLeave={() => setHoveredCompany(null)}
              style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", position: "relative" }}
              title={company.name}
            >
              <span
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  minWidth: 80,
                  maxWidth: 160,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.name}
              </span>

              <div style={{ flex: 1, position: "relative" }}>
                {visible && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 16,
                      background: "#0F0F0F",
                      border: "1px solid #2C2C2C",
                      borderRadius: 8,
                      padding: "6px 8px",
                      fontSize: 11,
                      color: "#E8E8E8",
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
                    }}
                  >
                    {company.posts.length}건 · {ratio.toFixed(1)}%
                  </div>
                )}
                <div style={{ background: "var(--border)", borderRadius: 4, height: 8, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${max > 0 ? (company.posts.length / max) * 100 : 0}%`,
                      height: "100%",
                      background: company.color,
                      borderRadius: 4,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>

              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", width: 24, textAlign: "right" }}>
                {company.posts.length}
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
        background: "color-mix(in srgb, var(--card) 92%, #E87040 8%)",
        border: "1px solid color-mix(in srgb, var(--border) 70%, #E87040 30%)",
        borderLeft: "5px solid #E87040",
        borderRadius: 12,
        padding: "18px 20px",
        marginBottom: 18,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: "#111",
            background: "#E87040",
            borderRadius: 999,
            padding: "5px 10px",
            letterSpacing: "0.04em",
          }}
        >
          ⭐ 하이라이트
        </span>
        <span style={{ fontSize: 12, color: company.color, fontWeight: 700 }}>{company.name}</span>
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
      });
  }, [bookmarkFilter, bookmarkSet, companyFilter, data.companies, deferredSearch, hideReadFilter, platformFilter, readSet]);

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
  const readFilteredCount = filteredCompanies.reduce(
    (sum, company) => sum + company.posts.filter((post) => readSet.has(post.title)).length,
    0
  );
  const readProgressPercent = totalFiltered > 0 ? Math.round((readFilteredCount / totalFiltered) * 100) : 0;
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

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 96px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          {prevWeek ? (
            <a
              href={`/${prevWeek.slug}`}
              style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
              title="이전 주차 (←)"
            >
              ← W{prevWeek.week}
            </a>
          ) : (
            <div />
          )}

          <WeekDropdown currentSlug={data.slug} currentWeek={data.week} />

          {nextWeek ? (
            <a
              href={`/${nextWeek.slug}`}
              style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
              title="다음 주차 (→)"
            >
              W{nextWeek.week} →
            </a>
          ) : (
            <div />
          )}
        </div>

        <div style={{ marginBottom: 28, marginTop: 24 }}>
          <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
            {data.year} · Week {data.week}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
              <rect width="32" height="32" rx="8" fill="#E87040" />
              <text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="800" fontFamily="Arial, sans-serif">
                V
              </text>
            </svg>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.2, margin: 0 }}>
              VoidNews — Week {data.week}
            </h1>
          </div>
          <p style={{ fontSize: 15, color: "var(--muted)", margin: 0 }}>
            {data.period} &nbsp;·&nbsp;
            <span style={{ color: "#E87040", fontWeight: 700 }}>{data.totalPosts}건</span> 포스팅
          </p>
        </div>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "16px 18px",
            marginBottom: 18,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text)", fontWeight: 700 }}>
              {readFilteredCount} / {totalFiltered} 읽음 ({readProgressPercent}%)
            </p>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>현재 필터 기준 읽기 진행률</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: "var(--border)", overflow: "hidden" }}>
            <div
              style={{
                width: `${readProgressPercent}%`,
                height: "100%",
                background: "#E87040",
                borderRadius: 999,
                transition: "width 0.2s ease",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          <button
            onClick={() => setCollapsedCompanies(visibleCompanyNames)}
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: "7px 12px",
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--text)",
              cursor: "pointer",
            }}
          >
            전체 접기 ▲
          </button>
          <button
            onClick={() =>
              setCollapsedCompanies((prev) => prev.filter((companyName) => !visibleCompanyNames.includes(companyName)))
            }
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: "7px 12px",
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--text)",
              cursor: "pointer",
            }}
          >
            전체 펼치기 ▼
          </button>
        </div>

        <div style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <input
              id="search-input"
              type="text"
              placeholder="포스팅 검색... ( / 단축키)"
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
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "10px 14px",
                color: "var(--text)",
                fontSize: 14,
                outline: "none",
                width: "100%",
              }}
            />
            {showRecentSearches && recentSearches.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  background: "#161616",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: 8,
                  zIndex: 30,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.28)",
                }}
              >
                <p style={{ fontSize: 11, color: "var(--muted)", margin: "2px 6px 8px" }}>최근 검색어</p>
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
                        fontSize: 13,
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
                        fontSize: 16,
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

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            {["all", "X", "Threads"].map((platform) => (
              <button
                key={platform}
                onClick={() => setPlatformFilter(platform)}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: 20,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  flexShrink: 0,
                  borderColor: platformFilter === platform ? "#E87040" : "var(--border)",
                  background: platformFilter === platform ? "#E87040" : "transparent",
                  color: platformFilter === platform ? "#000" : "var(--muted)",
                }}
              >
                {platform === "all" ? "전체" : platform}
              </button>
            ))}

            <div style={{ width: 1, background: "var(--border)", alignSelf: "stretch" }} />

            <button
              onClick={() => setBookmarkFilter((prev) => !prev)}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: 20,
                border: "1px solid",
                cursor: "pointer",
                flexShrink: 0,
                borderColor: bookmarkFilter ? "#F5B942" : "var(--border)",
                background: bookmarkFilter ? "#F5B94222" : "transparent",
                color: bookmarkFilter ? "#F5B942" : "var(--muted)",
              }}
            >
              {bookmarkFilter ? "★" : "☆"} 북마크 {bookmarks.length > 0 ? `(${bookmarks.length})` : ""}
            </button>
            {bookmarks.length > 0 && (
              <button
                onClick={exportBookmarks}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: 20,
                  border: "1px solid #E87040",
                  cursor: "pointer",
                  flexShrink: 0,
                  background: bookmarksCopied ? "#E87040" : "transparent",
                  color: bookmarksCopied ? "#111" : "#E87040",
                }}
              >
                {bookmarksCopied ? "복사됨 ✓" : "내보내기 ↓"}
              </button>
            )}

            <button
              onClick={() => setHideReadFilter((prev) => !prev)}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: 20,
                border: "1px solid",
                cursor: "pointer",
                flexShrink: 0,
                borderColor: hideReadFilter ? "#78C97C" : "var(--border)",
                background: hideReadFilter ? "#78C97C22" : "transparent",
                color: hideReadFilter ? "#78C97C" : "var(--muted)",
              }}
            >
              읽음 숨기기 {readPosts.length > 0 ? `(${readPosts.length})` : ""}
            </button>
          </div>

          <div className="filter-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", flexWrap: "nowrap" }}>
            <button
              onClick={() => setCompanyFilter("all")}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: 20,
                border: "1px solid",
                cursor: "pointer",
                flexShrink: 0,
                borderColor: companyFilter === "all" ? "#E87040" : "var(--border)",
                background: companyFilter === "all" ? "#E87040" : "transparent",
                color: companyFilter === "all" ? "#000" : "var(--muted)",
              }}
            >
              전체 회사
            </button>
            {data.companies.map((company) => (
              <button
                key={company.name}
                onClick={() => setCompanyFilter(companyFilter === company.name ? "all" : company.name)}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: 20,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  flexShrink: 0,
                  borderColor: companyFilter === company.name ? company.color : "var(--border)",
                  background: companyFilter === company.name ? `${company.color}22` : "transparent",
                  color: companyFilter === company.name ? company.color : "var(--muted)",
                }}
              >
                {company.name.split(" /")[0]}
              </button>
            ))}
          </div>

          {isFiltering && (
            <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>
              {totalFiltered}건 검색됨
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
                  color: "#E87040",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                필터 초기화
              </button>
            </p>
          )}
        </div>

        {highlightedEntry && (
          <div style={{ marginBottom: 6 }}>
            <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 10px" }}>
              이 주의 하이라이트
            </p>
            <HighlightCard
              company={highlightedEntry.company}
              post={highlightedEntry.post}
              onOpen={() => openPost(highlightedEntry.post, highlightedEntry.company.name)}
            />
          </div>
        )}

        <StatsBar companies={data.companies} onCompanyClick={(name) => setCompanyFilter(companyFilter === name ? "all" : name)} />

        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <CompanySection
              key={company.name}
              company={company}
              defaultYear={data.year}
              onPostClick={openPost}
              bookmarks={bookmarkSet}
              onBookmark={toggleBookmark}
              readPosts={readSet}
              searchQuery={search}
              collapsed={collapsedSet.has(company.name)}
              onToggleCollapsed={() => toggleCompanyCollapsed(company.name)}
            />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>🔍</p>
            <p>검색 결과가 없습니다</p>
          </div>
        )}

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: "#333", textAlign: "center", letterSpacing: "0.05em" }}>
            ⌨️ &nbsp;
            <kbd style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 3, padding: "1px 5px", fontSize: 10 }}>
              /
            </kbd>{" "}
            검색 &nbsp;·&nbsp;
            <kbd style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 3, padding: "1px 5px", fontSize: 10 }}>
              ←
            </kbd>
            <kbd style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 3, padding: "1px 5px", fontSize: 10 }}>
              →
            </kbd>{" "}
            모달 열림 시 포스팅 이동 / 기본 주차 이동 &nbsp;·&nbsp;
            <kbd style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 3, padding: "1px 5px", fontSize: 10 }}>
              ESC
            </kbd>{" "}
            닫기
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
