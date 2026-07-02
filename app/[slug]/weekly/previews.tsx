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
import { OG_CACHE_TTL_MS, OG_FAILURE_CACHE_TTL_MS, extractDomain } from "./shared";

export function TweetEmbed({ xUrl, expanded }: { xUrl: string; expanded: boolean }) {
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
export interface OGData {
  title?: string;
  description?: string;
  image?: string;
  hostname?: string;
}

export interface CachedOGData {
  data: OGData | null;
  expiresAt: number;
}

export function isSafeImageUrl(url?: string) {
  if (!url) return false;
  if (url.startsWith("/") && !url.startsWith("//")) return true;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

export function useOGData(url: string, enabled: boolean) {
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
export function CardLinkPreview({ url }: { url: string }) {
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
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xs)",
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
export function LinkPreview({ url }: { url: string }) {
  const { data, loading } = useOGData(url, true);

  if (loading) {
    return (
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
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
        <div style={{ width: 90, height: 66, background: "var(--surface)", borderRadius: 2, flexShrink: 0 }} />
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
          border: "1px solid var(--border2)",
          borderRadius: "var(--radius-sm)",
          overflow: "hidden",
          background: "var(--card)",
          display: "flex",
          transition: "border-color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
      >
        {data?.image && (
          <img
            src={data.image}
            alt={data?.title || ""}
            style={{ width: "clamp(96px, 28vw, 140px)", height: 100, objectFit: "cover", flexShrink: 0 }}
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
export function isXPostUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+/.test(url);
}

export function getOfficialTweetUrl(post: Pick<Post, "officialUrl" | "source" | "backupUrls">): string | undefined {
  if (post.officialUrl && isXPostUrl(post.officialUrl)) return post.officialUrl;
  if (post.source && isXPostUrl(post.source)) return post.source;
  return post.backupUrls?.find((link) => isXPostUrl(link.url))?.url;
}

// ── 임베드 프리뷰 (X / Threads) ──────────────────
export function EmbedPreview({
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

  const tabBtnStyle = (
    active: boolean,
    role: { color: string; tint: string; border: string }
  ) => ({
    fontSize: 11,
    fontWeight: 700,
    padding: "6px 13px",
    borderRadius: "var(--radius-xs)",
    cursor: "pointer" as const,
    border: "1px solid",
    borderColor: active ? role.border : "var(--border2)",
    background: active ? role.tint : "transparent",
    color: active ? role.color : "var(--dim)",
    fontFamily: "var(--mono)",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  });

  const officialRole = { color: "var(--accent)", tint: "var(--accent-soft)", border: "var(--accent)" };
  const myXRole = { color: "var(--text-strong)", tint: "var(--surface-2)", border: "var(--border2)" };
  const threadsRole = { color: "var(--gold)", tint: "var(--surface-2)", border: "var(--gold)" };

  const loadingPlaceholder = (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xs)", padding: "20px 16px", display: "flex", alignItems: "center", gap: 10, color: "var(--dim)", fontSize: 13, fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>
      불러오는 중...
    </div>
  );

  return (
    <div style={{ marginBottom: 24 }}>
      {/* 탭 헤더 */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {officialUrl && (
          <button onClick={() => setTab("official")} style={tabBtnStyle(tab === "official", officialRole)}>
            공식 원문
          </button>
        )}
        {xUrl && (
          <button onClick={() => setTab("x")} style={tabBtnStyle(tab === "x", myXRole)}>
            𝕏 내 포스팅
          </button>
        )}
        {threadsUrl && (
          <button onClick={() => setTab("threads")} style={tabBtnStyle(tab === "threads", threadsRole)}>
            Threads 내 포스팅
          </button>
        )}
      </div>

      {/* 공식 원문 탭 */}
      {tab === "official" && officialUrl && (
        <div>
          {officialLoading && loadingPlaceholder}
          <div ref={officialRef} style={{ borderRadius: "var(--radius-xs)", overflow: "hidden" }} />
          {!officialHtml && !officialLoading && (
            <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="mono"
              style={{ display: "block", background: "var(--card)", border: "1px solid var(--accent)", borderRadius: "var(--radius-xs)", padding: "14px 16px", color: "var(--accent)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none" }}>
              공식 계정 원문 보기 ↗
            </a>
          )}
        </div>
      )}

      {/* 내 X 포스팅 탭 */}
      {tab === "x" && xUrl && (
        <div>
          {xLoading && loadingPlaceholder}
          <div ref={xRef} style={{ borderRadius: "var(--radius-xs)", overflow: "hidden" }} />
          {!xHtml && !xLoading && (
            <a href={xUrl} target="_blank" rel="noopener noreferrer" className="mono"
              style={{ display: "block", background: "var(--card)", border: "1px solid var(--border2)", borderRadius: "var(--radius-xs)", padding: "14px 16px", color: "var(--text-strong)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none" }}>
              𝕏 X에서 보기 ↗
            </a>
          )}
        </div>
      )}

      {/* 내 Threads 포스팅 탭 */}
      {tab === "threads" && threadsUrl && (
        <div ref={thRef} style={{ borderRadius: "var(--radius-xs)", overflow: "hidden" }} />
      )}
    </div>
  );
}
