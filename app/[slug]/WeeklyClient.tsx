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
import { getWeekList } from "@/lib/data";
import { stripMarkdown } from "@/lib/md";

const BOOKMARKS_STORAGE_KEY = "voidnews-bookmarks";
const READ_STORAGE_PREFIX = "voidnews-read:";
const RECENT_SEARCHES_STORAGE_KEY = "voidnews-recent-searches";
const VIEW_MODE_STORAGE_KEY = "voidnews-view-mode";
const SORT_ORDER_STORAGE_KEY = "voidnews-sort-order";
const STATS_ACTION_STORAGE_KEY = "voidnews-stats-action";
const MAX_RECENT_SEARCHES = 5;
const OG_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const OG_FAILURE_CACHE_TTL_MS = 1000 * 60 * 60 * 6;

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

function renderRichText(text: string): ReactNode {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*\n]+?\*\*)/g);

  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} style={{ color: "var(--text)", fontWeight: 800 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
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

type ViewDensity = "compact" | "comfortable";
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

function TweetEmbed({ xUrl, expanded }: { xUrl: string; expanded: boolean }) {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded || !tweetRef.current) return;

    tweetRef.current.innerHTML = `<blockquote class="twitter-tweet" data-theme="dark"><a href="${xUrl}"></a></blockquote>`;

    const twitterWindow = window as Window & {
      twttr?: { widgets?: { load: (element?: HTMLElement) => void } };
    };

    twitterWindow.twttr?.widgets?.load(tweetRef.current);
  }, [expanded, xUrl]);

  return <div ref={tweetRef} style={{ margin: "4px 0", minHeight: 120 }} />;
}

// ── OG 링크 프리뷰 ───────────────────────────────
interface OGData {
  title?: string;
  description?: string;
  image?: string;
  hostname?: string;
}

interface CachedOGData {
  data: OGData | null;
  expiresAt: number;
}

function isSafeImageUrl(url?: string) {
  if (!url) return false;
  if (url.startsWith("/") && !url.startsWith("//")) return true;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

function useOGData(url: string, enabled: boolean) {
  const [data, setData] = useState<OGData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || !url) return;
    let cancelled = false;
    const cacheKey = `voidnews-og:v3:${url}`;
    const hostname = (() => {
      try {
        return new URL(url).hostname.replace(/^www\./, "");
      } catch {
        return url;
      }
    })();

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as CachedOGData;
        if (parsed.expiresAt > Date.now()) {
          setData(parsed.data);
          return;
        }
      }
    } catch {}

    setLoading(true);
    fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const screenshotUrl = d.status === "success" ? d.data.screenshot?.url : undefined;
        const imageUrl = d.status === "success" ? d.data.image?.url : undefined;
        const safeImage = isSafeImageUrl(screenshotUrl) ? screenshotUrl : isSafeImageUrl(imageUrl) ? imageUrl : undefined;
        const og: OGData | null =
          d.status === "success"
            ? {
                title: d.data.title,
                description: d.data.description,
                image: safeImage,
                hostname,
              }
            : null;
        setData(og);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              data: og,
              expiresAt: Date.now() + (og ? OG_CACHE_TTL_MS : OG_FAILURE_CACHE_TTL_MS),
            } satisfies CachedOGData)
          );
        } catch {}
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ data: null, expiresAt: Date.now() + OG_FAILURE_CACHE_TTL_MS } satisfies CachedOGData)
          );
        } catch {}
      });

    return () => {
      cancelled = true;
    };
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
            background: "var(--card)",
            display: "flex",
            minHeight: 72,
            transition: "border-color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
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
                  background: "var(--surface)",
                  borderRadius: 4,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ height: 10, background: "var(--surface)", borderRadius: 3, width: "60%" }} />
                <div style={{ height: 9, background: "var(--surface)", borderRadius: 3, width: "85%" }} />
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
            <span style={{ fontSize: 12, color: "var(--dim)" }}>↗</span>
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
          border: "1px solid var(--border)",
          borderRadius: 10,
          overflow: "hidden",
          background: "var(--card)",
          marginBottom: 20,
          display: "flex",
          height: 90,
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
        }}
      >
        <div style={{ width: 90, height: 66, background: "var(--surface)", borderRadius: 4, flexShrink: 0 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ height: 12, background: "var(--surface)", borderRadius: 4, width: "70%" }} />
          <div style={{ height: 10, background: "var(--surface)", borderRadius: 4, width: "90%" }} />
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
          background: "var(--card)",
          display: "flex",
          transition: "border-color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
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
          <p style={{ fontSize: 11, color: "var(--dim)", margin: 0 }}>{data?.hostname}</p>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--text)",
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
                color: "var(--dim)",
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
          <span style={{ fontSize: 14, color: "var(--dim)" }}>↗</span>
        </div>
      </div>
    </a>
  );
}

// ── X URL 공식계정 판별 ──────────────────────────
function isXPostUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+/.test(url);
}

function getOfficialTweetUrl(post: Pick<Post, "officialUrl" | "source" | "backupUrls">): string | undefined {
  if (post.officialUrl && isXPostUrl(post.officialUrl)) return post.officialUrl;
  if (post.source && isXPostUrl(post.source)) return post.source;
  return post.backupUrls?.find((link) => isXPostUrl(link.url))?.url;
}

// ── 임베드 프리뷰 (X / Threads) ──────────────────
function EmbedPreview({
  officialUrl,
  xUrl,
  threadsUrl,
}: {
  officialUrl?: string;
  xUrl?: string;
  threadsUrl?: string;
}) {
  const hasOfficial = !!officialUrl;
  const initialTab = hasOfficial ? "official" : xUrl ? "x" : "threads";
  const [tab, setTab] = useState<"official" | "x" | "threads">(initialTab as "official" | "x" | "threads");
  const officialRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<HTMLDivElement>(null);
  const thRef = useRef<HTMLDivElement>(null);
  const [officialHtml, setOfficialHtml] = useState<string | null>(null);
  const [officialLoading, setOfficialLoading] = useState(false);
  const [xHtml, setXHtml] = useState<string | null>(null);
  const [xLoading, setXLoading] = useState(false);

  // 공식 트윗 로드
  useEffect(() => {
    if (!officialUrl) return;
    setOfficialLoading(true);
    fetch(`https://publish.twitter.com/oembed?url=${encodeURIComponent(officialUrl)}&dnt=1&theme=dark&hide_thread=false`)
      .then((r) => r.json())
      .then((d) => { setOfficialHtml(d.html); setOfficialLoading(false); })
      .catch(() => setOfficialLoading(false));
  }, [officialUrl]);

  useEffect(() => {
    if (!officialHtml || !officialRef.current) return;
    officialRef.current.innerHTML = officialHtml;
    const w = window as Window & { twttr?: { widgets?: { load: (el?: HTMLElement) => void } } };
    if (w.twttr?.widgets) { w.twttr.widgets.load(officialRef.current); }
    else {
      const s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, [officialHtml]);

  // 내 X 포스팅 로드
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
    const w = window as Window & { instgrm?: { Embeds?: { process?: () => void } } };
    if (w.instgrm?.Embeds) { w.instgrm.Embeds.process?.(); }
    else {
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

  if (!officialUrl && !xUrl && !threadsUrl) return null;

  const tabBtnStyle = (active: boolean, color: string) => ({
    fontSize: 11,
    fontWeight: 700,
    padding: "5px 12px",
    borderRadius: 2,
    cursor: "pointer" as const,
    border: "1px solid",
    borderColor: active ? color : "var(--border2)",
    background: active ? `${color}22` : "transparent",
    color: active ? color : "var(--dim)",
    fontFamily: "var(--mono)",
    letterSpacing: "0.06em",
  });

  const loadingPlaceholder = (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, padding: "20px 16px", display: "flex", alignItems: "center", gap: 10, color: "var(--dim)", fontSize: 13 }}>
      불러오는 중...
    </div>
  );

  return (
    <div style={{ marginBottom: 24 }}>
      {/* 탭 헤더 */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {officialUrl && (
          <button onClick={() => setTab("official")} style={tabBtnStyle(tab === "official", "#22C55E")}>
            공식 원문
          </button>
        )}
        {xUrl && (
          <button onClick={() => setTab("x")} style={tabBtnStyle(tab === "x", "#E87040")}>
            𝕏 내 포스팅
          </button>
        )}
        {threadsUrl && (
          <button onClick={() => setTab("threads")} style={tabBtnStyle(tab === "threads", "#A78BFA")}>
            Threads 내 포스팅
          </button>
        )}
      </div>

      {/* 공식 원문 탭 */}
      {tab === "official" && officialUrl && (
        <div>
          {officialLoading && loadingPlaceholder}
          <div ref={officialRef} style={{ borderRadius: 8, overflow: "hidden" }} />
          {!officialHtml && !officialLoading && (
            <a href={officialUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", background: "var(--card)", border: "1px solid #1a3a1a", borderRadius: 8, padding: "16px", color: "#22C55E", fontSize: 13, textDecoration: "none" }}>
              공식 계정 원문 보기 ↗
            </a>
          )}
        </div>
      )}

      {/* 내 X 포스팅 탭 */}
      {tab === "x" && xUrl && (
        <div>
          {xLoading && loadingPlaceholder}
          <div ref={xRef} style={{ borderRadius: 8, overflow: "hidden" }} />
          {!xHtml && !xLoading && (
            <a href={xUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, padding: "16px", color: "#4A9EFF", fontSize: 13, textDecoration: "none" }}>
              𝕏 X에서 보기 ↗
            </a>
          )}
        </div>
      )}

      {/* 내 Threads 포스팅 탭 */}
      {tab === "threads" && threadsUrl && (
        <div ref={thRef} style={{ borderRadius: 8, overflow: "hidden" }} />
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef<number | null>(null);
  const titleId = `post-modal-title-${post.title.replace(/[^a-zA-Z0-9가-힣]+/g, "-").replace(/^-+|-+$/g, "")}`;
  const navBtnStyle = {
    fontSize: 13,
    fontWeight: 700,
    padding: "10px 14px",
    borderRadius: 10,
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
          background: "var(--card-hover)",
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
              background: "var(--card-hover)",
              border: "none",
              color: bookmarked ? "#F5B942" : "var(--muted)",
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
              background: "var(--card-hover)",
              border: "none",
              color: "var(--muted)",
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
          id={titleId}
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "var(--text)",
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
              color: "var(--muted)",
              marginBottom: 20,
              lineHeight: 1.6,
              paddingLeft: 12,
              borderLeft: `3px solid ${companyColor}`,
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
          <figure style={{ margin: "0 0 20px", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", background: "var(--card)" }}>
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
              <figure key={image.src} style={{ margin: 0, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", background: "var(--card)" }}>
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
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "16px 18px",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--dim)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              포스팅 내용
            </p>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{renderRichText(post.content || "")}</p>
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
              <span style={{ color: "var(--gold)", fontWeight: 800 }}>Read</span>
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
                {expanded ? "Close ↑" : "Read more →"}
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
                Source →
              </a>
            )}
            {post.backupUrls?.map(({ label, url }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", padding: "6px 12px", border: "1px solid var(--border2)", borderRadius: 999 }}>
                {label} →
              </a>
            ))}
            {post.xUrl && (
              <a href={post.xUrl} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 700, color: "#F4F4F5", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", padding: "6px 12px", background: "#0a0a0d", border: "1px solid #2F3136", borderRadius: 999 }}>
                <span aria-hidden style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 800 }}>X</span>
                My post →
              </a>
            )}
            {post.threadsUrl && (
              <a href={post.threadsUrl} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 700, color: "#E9D5FF", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", padding: "6px 12px", background: "#1d1230", border: "1px solid #8B5CF6", borderRadius: 999 }}>
                Threads →
              </a>
            )}
          </div>
        )}
      </div>
    </article>
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
        padding: "20px 20px 18px",
        marginBottom: 28,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span className="kicker" style={{ color: "var(--kicker)" }}>By the numbers</span>
          <span aria-hidden style={{ width: 24, height: 1, background: "var(--rule)" }} />
          <h3
            className="serif"
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--text-strong)",
              letterSpacing: "-0.015em",
              margin: 0,
            }}
          >
            Distribution by company
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <button
            onClick={onToggleActionMode}
            className="chip"
            style={
              actionMode === "filter"
                ? undefined
                : {
                    color: "var(--accent)",
                    borderColor: "var(--accent)",
                  }
            }
            title={actionMode === "filter" ? "클릭 시 섹션 스크롤로 전환" : "클릭 시 회사 필터로 전환"}
          >
            {actionMode === "filter" ? "Filter mode" : "Scroll mode"}
          </button>
          <span
            className="mono"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--gold)",
              whiteSpace: "nowrap",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {String(total).padStart(2, "0")} total
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

type TopStoryEntry = {
  company: Company;
  post: Post;
  issueIndex: number;
};

function estimateReadTime(post: Post) {
  const text = [post.title, post.summary, post.content].filter(Boolean).join(" ");
  const normalizedLength = stripMarkdown(text).replace(/\s+/g, " ").trim().length;
  return Math.max(1, Math.ceil(normalizedLength / 420));
}

function getPostSortTime(post: Post, defaultYear: number) {
  return parsePostDate(post.date, defaultYear)?.getTime() ?? 0;
}

function getPostIssueHref(issueSlug: string, postTitle: string) {
  const params = new URLSearchParams({ post: postTitle });
  return `/${issueSlug}?${params.toString()}`;
}

function getCompanyShortName(name: string) {
  return name.split(" /")[0];
}

function getPostSourceUrl(post: Post) {
  return post.officialUrl || post.source || post.xUrl || post.threadsUrl || post.backupUrls?.[0]?.url || "";
}

function getPostPrimaryImage(post: Post) {
  return post.thumbnail ?? post.images?.[0] ?? null;
}

function SourceThumbnail({
  post,
  companyColor,
  variant,
  priority = false,
}: {
  post: Post;
  companyColor: string;
  variant: "hero" | "card";
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const explicitImage = getPostPrimaryImage(post);
  const sourceUrl = getPostSourceUrl(post);
  const [visible, setVisible] = useState(priority);
  const { data, loading } = useOGData(sourceUrl, visible && !explicitImage && !!sourceUrl);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const explicitImageSrc = isSafeImageUrl(explicitImage?.src) ? explicitImage?.src : "";
  const imageSrc = explicitImageSrc || data?.image || "";
  const visibleImageSrc = imageSrc && failedSrc !== imageSrc ? imageSrc : "";
  const imageAlt = explicitImage?.alt || data?.title || `${post.title} 출처 이미지`;
  const domain = sourceUrl ? extractDomain(sourceUrl) : "source";

  useEffect(() => {
    if (priority || visible) return;
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "420px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [priority, visible]);

  return (
    <div
      ref={ref}
      className={`tc-source-thumb tc-source-thumb--${variant}`}
      style={{
        background: `radial-gradient(circle at 22% 18%, ${companyColor}35 0%, transparent 42%), linear-gradient(135deg, var(--surface-2), var(--card))`,
      }}
    >
      {visibleImageSrc ? (
        <img
          src={visibleImageSrc}
          alt={imageAlt}
          loading={priority ? "eager" : "lazy"}
          width={variant === "hero" ? 1440 : 640}
          height={variant === "hero" ? 720 : 400}
          onError={() => setFailedSrc(visibleImageSrc)}
        />
      ) : (
        <div className="tc-source-fallback">
          <span className="mono">{loading ? "Loading source image" : domain}</span>
        </div>
      )}
      <span className="tc-source-domain mono">{domain}</span>
    </div>
  );
}

function handleArticleClick(event: MouseEvent<HTMLAnchorElement>, onOpen: () => void) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  onOpen();
}

function TopStoriesSection({
  stories,
  issueSlug,
  onOpenStory,
}: {
  stories: TopStoryEntry[];
  issueSlug: string;
  onOpenStory: (post: Post, companyName: string) => void;
}) {
  if (stories.length === 0) return null;

  const [lead, ...secondary] = stories.slice(0, 3);
  const href = getPostIssueHref(issueSlug, lead.post.title);

  return (
    <section className="tc-hero-section rise-in" aria-label="Featured story">
      <a
        href={href}
        className="tc-hero-card"
        onClick={(event) => handleArticleClick(event, () => onOpenStory(lead.post, lead.company.name))}
        aria-label={`${lead.post.title} 기사 열기`}
      >
        <SourceThumbnail post={lead.post} companyColor={lead.company.color} variant="hero" priority />
        <div className="tc-hero-shade" />
        <div className="tc-hero-content">
          <div className="tc-hero-labels mono">
            <span>slide 1 of {Math.max(1, stories.slice(0, 3).length)}</span>
            <span>featured story</span>
          </div>
          <h1 className="tc-hero-title serif">{lead.post.title}</h1>
          {lead.post.summary && (
            <p className="tc-hero-summary">{stripMarkdown(lead.post.summary)}</p>
          )}
          <div className="tc-hero-meta mono">
            <span style={{ color: lead.company.color }}>{getCompanyShortName(lead.company.name)}</span>
            <span aria-hidden>·</span>
            <span>{lead.post.date}</span>
            <span aria-hidden>·</span>
            <span>{estimateReadTime(lead.post)} min read</span>
            <span aria-hidden>·</span>
            <span>Read post →</span>
          </div>
        </div>
        {secondary.length > 0 && (
          <div className="tc-hero-dots" aria-hidden>
            {[lead, ...secondary].map((entry, index) => (
              <span
                key={`${entry.company.name}-${entry.post.title}`}
                style={{
                  background: index === 0 ? "var(--text-strong)" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        )}
      </a>
    </section>
  );
}

type FeedStoryEntry = TopStoryEntry;

function FeedArticleCard({
  entry,
  issueSlug,
  defaultYear,
  index,
  onOpen,
}: {
  entry: FeedStoryEntry;
  issueSlug: string;
  defaultYear: number;
  index: number;
  onOpen: () => void;
}) {
  const { company, post } = entry;
  const href = getPostIssueHref(issueSlug, post.title);

  return (
    <a
      href={href}
      className="tc-feed-card"
      onClick={(event) => handleArticleClick(event, onOpen)}
      aria-label={`${post.title} 기사 열기`}
    >
      <SourceThumbnail post={post} companyColor={company.color} variant="card" />
      <div className="tc-feed-body">
        <div className="tc-feed-meta mono">
          <span style={{ color: company.color, fontWeight: 800 }}>{getCompanyShortName(company.name)}</span>
          <span aria-hidden>·</span>
          <PostDateLabel date={post.date} defaultYear={defaultYear} />
          <span aria-hidden>·</span>
          <span>{estimateReadTime(post)} min read</span>
        </div>
        <h2 className="tc-feed-title serif">{post.title}</h2>
        {(post.summary || post.content) && (
          <p className="tc-feed-summary">{stripMarkdown(post.summary || post.content || "")}</p>
        )}
        <div className="tc-feed-footer mono">
          <span>#{String(index).padStart(2, "0")}</span>
          <span>Read more →</span>
        </div>
      </div>
    </a>
  );
}

function ChronologicalFeed({
  stories,
  issueSlug,
  defaultYear,
  onOpenStory,
}: {
  stories: FeedStoryEntry[];
  issueSlug: string;
  defaultYear: number;
  onOpenStory: (post: Post, companyName: string) => void;
}) {
  if (stories.length === 0) return null;

  return (
    <section className="tc-feed-section" aria-label="Latest articles">
      <div className="tc-section-heading">
        <span className="mono">Latest AI News</span>
        <span aria-hidden />
      </div>
      <div className="tc-article-grid">
        {stories.map((entry, index) => (
          <FeedArticleCard
            key={`${entry.company.name}-${entry.post.title}`}
            entry={entry}
            issueSlug={issueSlug}
            defaultYear={defaultYear}
            index={index + 1}
            onOpen={() => onOpenStory(entry.post, entry.company.name)}
          />
        ))}
      </div>
    </section>
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
        aria-haspopup="listbox"
        aria-expanded={open}
        className="mono"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border2)",
          borderRadius: 999,
          padding: "6px 14px",
          color: "var(--text)",
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        W{String(currentWeek).padStart(2, "0")}
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.15s" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
          <div
            role="listbox"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--surface)",
              border: "1px solid var(--border2)",
              borderRadius: 4,
              padding: 6,
              zIndex: 100,
              minWidth: 140,
              boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
            }}
          >
            {weekList.map((week) => {
              const active = week.slug === currentSlug;
              return (
                <a
                  key={week.slug}
                  href={`/${week.slug}`}
                  className="mono"
                  style={{
                    display: "block",
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: active ? "var(--accent)" : "var(--muted)",
                    textDecoration: "none",
                    borderRadius: 2,
                    background: active ? "var(--accent-soft)" : "transparent",
                  }}
                  onClick={() => setOpen(false)}
                >
                  {week.year} · W{String(week.week).padStart(2, "0")}
                </a>
              );
            })}
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
  latestWeek,
  // editorial nested route 옵션 — 카드 클릭 시 모달 대신 `${nestedRoutePrefix}/${post.slug}/` 풀 페이지 이동
  nestedRoutePrefix,
}: {
  data: WeeklyData;
  prevWeek?: { slug: string; week: number };
  nextWeek?: { slug: string; week: number };
  latestWeek: { slug: string; week: number };
  nestedRoutePrefix?: string;
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
  const [viewDensity, setViewDensity] = useState<ViewDensity>("comfortable");
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
      const storedViewDensity = localStorage.getItem(VIEW_MODE_STORAGE_KEY) as ViewDensity | null;
      if (storedViewDensity === "compact" || storedViewDensity === "comfortable") setViewDensity(storedViewDensity);
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
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewDensity);
    } catch {}
  }, [viewDensity]);

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
      // nested route 분기 — slug + prefix 있으면 모달 대신 풀 페이지로 이동
      if (nestedRoutePrefix && post.slug && typeof window !== "undefined") {
        window.location.href = `${nestedRoutePrefix.replace(/\/$/, "")}/${post.slug}/`;
        return;
      }
      setSelectedPost({ companyName, title: post.title });
    },
    [markAsRead, nestedRoutePrefix]
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
  const isLatestWeek = data.slug === latestWeek.slug;

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
  const isFiltering =
    search.trim().length > 0 || platformFilter !== "all" || companyFilter !== "all" || bookmarkFilter || hideReadFilter;
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
  const topStories = useMemo<TopStoryEntry[]>(() => {
    const sourceCompanies = isFiltering ? filteredCompanies : data.companies;
    const entries = sourceCompanies.flatMap((company) =>
      company.posts.map((post) => ({ company, post }))
    );

    return [
      ...entries.filter((entry) => entry.post.featured),
      ...entries.filter((entry) => !entry.post.featured),
    ]
      .slice(0, 3)
      .map((entry, index) => ({
        company: entry.company,
        post: entry.post,
        issueIndex: index + 1,
      }));
  }, [data.companies, filteredCompanies, isFiltering]);
  const feedStories = useMemo<FeedStoryEntry[]>(() => {
    const featuredTitles = new Set(topStories.map((entry) => entry.post.title));
    const entries = filteredCompanies.flatMap((company) =>
      company.posts
        .filter((post) => !featuredTitles.has(post.title))
        .map((post) => ({ company, post }))
    );

    return entries
      .sort((a, b) => {
        if (sortOrder === "company") {
          const companyDiff = a.company.name.localeCompare(b.company.name, "ko");
          if (companyDiff !== 0) return companyDiff;
        }

        const aTime = getPostSortTime(a.post, data.year);
        const bTime = getPostSortTime(b.post, data.year);
        const diff = sortOrder === "oldest" ? aTime - bTime : bTime - aTime;
        return diff || a.post.title.localeCompare(b.post.title, "ko");
      })
      .map((entry, index) => ({
        company: entry.company,
        post: entry.post,
        issueIndex: index + 1,
      }));
  }, [data.year, filteredCompanies, sortOrder, topStories]);

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
        data-card-density={viewDensity}
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "40px clamp(16px, 3vw, 32px) 96px",
        }}
      >
        <section className="tc-issue-strip" aria-label="Issue navigation">
          <div className="tc-issue-meta mono">
            <span>VoidNews Weekly</span>
            <span aria-hidden>·</span>
            <span>Issue {data.year} · W{String(data.week).padStart(2, "0")}</span>
            <span aria-hidden>·</span>
            <span>{data.period}</span>
            <span aria-hidden>·</span>
            <span>{String(data.totalPosts).padStart(2, "0")} posts</span>
          </div>

          <div className="tc-issue-actions">
            {isLatestWeek ? (
              <span className="tc-current-pill mono">Current Issue</span>
            ) : (
              <a href={`/${latestWeek.slug}`} className="tc-current-link mono">
                Back to Current · W{latestWeek.week}
              </a>
            )}
            {prevWeek ? (
              <a href={`/${prevWeek.slug}`} className="tc-week-link mono" title="이전 주차 (←)">
                ← W{prevWeek.week}
              </a>
            ) : null}
            <WeekDropdown currentSlug={data.slug} currentWeek={data.week} />
            {nextWeek ? (
              <a href={`/${nextWeek.slug}`} className="tc-week-link mono" title="다음 주차 (→)">
                W{nextWeek.week} →
              </a>
            ) : null}
          </div>
        </section>

        <TopStoriesSection
          stories={topStories}
          issueSlug={data.slug}
          onOpenStory={openPost}
        />


        <div className="tc-progress-row" aria-label="Reading progress">
          <div className="mono">
            <span>Reading progress</span>
            <span aria-hidden>//</span>
            <strong>{readFilteredCount} / {totalFiltered}</strong>
          </div>
          <p className="mono">[{readProgressBar}]</p>
        </div>

        <div
          style={{
            position: "sticky",
            top: 64,
            zIndex: 40,
            background: "var(--header-bg)",
            padding: "14px 16px",
            marginBottom: 32,
            border: "1px solid var(--border)",
            borderRadius: 2,
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
                  onClick={() => setViewDensity((prev) => (prev === "comfortable" ? "compact" : "comfortable"))}
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
                  title={viewDensity === "comfortable" ? "작은 카드 보기" : "기본 카드 보기"}
                >
                  {viewDensity === "comfortable" ? "COMPACT" : "COMFY"}
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
                  className={`chip${platformFilter === platform ? " chip-active" : ""}`}
                >
                  {platform === "all" ? "All" : platform}
                </button>
              ))}

              <span aria-hidden style={{ color: "var(--dim)", fontSize: 12, fontFamily: "var(--mono)" }}>
                //
              </span>

              <button
                onClick={() => setBookmarkFilter((prev) => !prev)}
                className="chip"
                style={
                  bookmarkFilter
                    ? {
                        borderColor: "var(--gold)",
                        color: "var(--gold)",
                        background: "#C8A84B12",
                      }
                    : undefined
                }
              >
                <span aria-hidden style={{ fontSize: 12, lineHeight: 1 }}>★</span>
                Bookmarks
                {bookmarks.length > 0 ? ` · ${bookmarks.length}` : ""}
              </button>
              <button
                onClick={() => setHideReadFilter((prev) => !prev)}
                className="chip"
                style={
                  hideReadFilter
                    ? {
                        borderColor: "var(--red)",
                        color: "var(--red)",
                        background: "#CC330012",
                      }
                    : undefined
                }
              >
                Hide read
                {readPosts.length > 0 ? ` · ${readPosts.length}` : ""}
              </button>
              <button
                onClick={() =>
                  setCollapsedCompanies((prev) =>
                    visibleCompanyNames.every((companyName) => prev.includes(companyName))
                      ? prev.filter((companyName) => !visibleCompanyNames.includes(companyName))
                      : [...new Set([...prev, ...visibleCompanyNames])]
                  )
                }
                className="chip"
              >
                {visibleCompanyNames.every((companyName) => collapsedSet.has(companyName)) ? "Expand all" : "Collapse all"}
              </button>

              {bookmarks.length > 0 && (
                <button
                  onClick={exportBookmarks}
                  className="chip"
                  style={{
                    borderColor: "var(--accent)",
                    color: bookmarksCopied ? "var(--ink)" : "var(--accent)",
                    background: bookmarksCopied ? "var(--accent)" : "transparent",
                  }}
                >
                  {bookmarksCopied ? "Copied" : "Export"}
                  <span aria-hidden>↓</span>
                </button>
              )}
            </div>

            <div className="divider-label" aria-hidden>
              <span>By company</span>
            </div>

            <div className="scroll-hide" style={{ display: "flex", gap: 8, overflowX: "auto", flexWrap: "nowrap" }}>
              <button
                onClick={() => setCompanyFilter("all")}
                className={`chip${companyFilter === "all" ? " chip-active" : ""}`}
              >
                All companies
              </button>
              {data.companies.map((company) => {
                const active = companyFilter === company.name;
                return (
                  <button
                    key={company.name}
                    onClick={() => setCompanyFilter(active ? "all" : company.name)}
                    className="chip"
                    style={
                      active
                        ? {
                            color: "var(--ink)",
                            background: company.color,
                            borderColor: company.color,
                          }
                        : {
                            color: "var(--muted)",
                          }
                    }
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 999,
                        background: company.color,
                        display: "inline-block",
                      }}
                    />
                    {company.name.split(" /")[0]}
                  </button>
                );
              })}
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

        <ChronologicalFeed
          stories={feedStories}
          issueSlug={data.slug}
          defaultYear={data.year}
          onOpenStory={openPost}
        />

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
          <section aria-label="Company archive" style={{ marginBottom: 48 }}>
            <div className="divider-label" style={{ marginBottom: 16 }}>
              <span>Company archive</span>
            </div>
            {filteredCompanies.map((company) => (
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
              />
            ))}
          </section>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <p className="serif" style={{ fontSize: 22, color: "var(--text)", marginBottom: 8, fontStyle: "italic" }}>
              No matching intelligence
            </p>
            <p className="mono" style={{ fontSize: 11, color: "var(--dim)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Adjust query parameters
            </p>
          </div>
        )}

        <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 26, marginBottom: 16 }}>
          <p
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--dim)",
              textAlign: "center",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Shortcuts &nbsp;·&nbsp;
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 6px", fontSize: 10 }}>
              /
            </kbd>{" "}
            Search &nbsp;·&nbsp;
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 6px", fontSize: 10 }}>
              ←
            </kbd>
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 6px", fontSize: 10, marginLeft: 4 }}>
              →
            </kbd>{" "}
            Navigate &nbsp;·&nbsp;
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 6px", fontSize: 10 }}>
              Esc
            </kbd>{" "}
            Close
          </p>
        </div>

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="맨 위로"
            title="맨 위로"
            style={{
              position: "fixed",
              right: 24,
              bottom: 32,
              zIndex: 50,
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid var(--accent)",
              background: "var(--accent)",
              color: "var(--ink)",
              cursor: "pointer",
              boxShadow: "0 14px 28px rgba(0,0,0,0.28)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        )}
      </main>
    </>
  );
}
