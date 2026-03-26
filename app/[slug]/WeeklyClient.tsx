"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import type { WeeklyData, Post, Company } from "@/lib/data";
import { getWeekList } from "@/lib/data";

// ── 플랫폼 배지 ─────────────────────────────────
function PlatformBadge({ platform }: { platform: Post["platform"] }) {
  const map: Record<string, { bg: string; color: string }> = {
    X:           { bg: "#18181B", color: "#E4E4E7" },
    Threads:     { bg: "#1A1A2E", color: "#A78BFA" },
    "X+Threads": { bg: "#1A2A2E", color: "#60A5FA" },
  };
  const s = map[platform] || map.X;
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 600,
      padding: "2px 7px", borderRadius: 4, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
      {platform}
    </span>
  );
}

// ── 링크 버튼 ────────────────────────────────────
function LinkBtn({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="link-btn"
      style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12,
        fontWeight: 600, color: "#E87040", textDecoration: "none", padding: "4px 10px",
        border: "1px solid #E87040", borderRadius: 4 }}>
      {label} ↗
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

  // Twitter oEmbed fetch
  useEffect(() => {
    if (!xUrl) return;
    setXLoading(true);
    fetch(`https://publish.twitter.com/oembed?url=${encodeURIComponent(xUrl)}&dnt=1&theme=dark&hide_thread=false`)
      .then(r => r.json())
      .then(d => { setXHtml(d.html); setXLoading(false); })
      .catch(() => setXLoading(false));
  }, [xUrl]);

  // Twitter widget 렌더링
  useEffect(() => {
    if (!xHtml || !xRef.current) return;
    xRef.current.innerHTML = xHtml;
    // Twitter widget script 로드 or reload
    const w = window as any;
    if (w.twttr?.widgets) {
      w.twttr.widgets.load(xRef.current);
    } else {
      const s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, [xHtml]);

  // Threads embed script 로드
  useEffect(() => {
    if (!threadsUrl || !thRef.current) return;
    thRef.current.innerHTML = `<blockquote class="text-post-media" data-url="${threadsUrl}"><a href="${threadsUrl}" target="_blank">Threads에서 보기</a></blockquote>`;
    const w = window as any;
    if (w.instgrm?.Embeds) {
      w.instgrm.Embeds.process();
    } else {
      const existing = document.getElementById("threads-embed-script");
      if (!existing) {
        const s = document.createElement("script");
        s.id = "threads-embed-script";
        s.src = "https://www.threads.net/embed.js";
        s.async = true;
        s.onload = () => { (window as any).instgrm?.Embeds?.process?.(); };
        document.head.appendChild(s);
      } else {
        setTimeout(() => (window as any).instgrm?.Embeds?.process?.(), 500);
      }
    }
  }, [threadsUrl, tab]);

  if (!xUrl && !threadsUrl) return null;

  return (
    <div style={{ marginBottom: 24 }}>
      {/* 탭 */}
      {xUrl && threadsUrl && (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={() => setTab("x")}
            style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, cursor: "pointer", border: "1px solid",
              borderColor: tab === "x" ? "#E87040" : "#333",
              background: tab === "x" ? "#E8704022" : "transparent",
              color: tab === "x" ? "#E87040" : "#555" }}>
            X 포스트
          </button>
          <button onClick={() => setTab("threads")}
            style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, cursor: "pointer", border: "1px solid",
              borderColor: tab === "threads" ? "#A78BFA" : "#333",
              background: tab === "threads" ? "#A78BFA22" : "transparent",
              color: tab === "threads" ? "#A78BFA" : "#555" }}>
            Threads 포스트
          </button>
        </div>
      )}

      {/* X 임베드 */}
      {(tab === "x" || !threadsUrl) && xUrl && (
        <div>
          {xLoading && (
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "20px 16px",
              display: "flex", alignItems: "center", gap: 10, color: "#555", fontSize: 13 }}>
              <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span> 불러오는 중...
            </div>
          )}
          <div ref={xRef} style={{ borderRadius: 12, overflow: "hidden" }} />
          {!xHtml && !xLoading && (
            <a href={xUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", background: "#111", border: "1px solid #222", borderRadius: 12,
                padding: "16px", color: "#4A9EFF", fontSize: 13, textDecoration: "none" }}>
              🐦 X에서 원문 보기 ↗
            </a>
          )}
        </div>
      )}

      {/* Threads 임베드 */}
      {(tab === "threads" || !xUrl) && threadsUrl && (
        <div ref={thRef} style={{ borderRadius: 12, overflow: "hidden" }} />
      )}
    </div>
  );
}

// ── 상세 모달 ────────────────────────────────────
function PostModal({ post, companyColor, onClose }: { post: Post; companyColor: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000,
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        backdropFilter: "blur(4px)" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "16px 16px 0 0",
          width: "100%", maxWidth: 680, maxHeight: "85vh", overflowY: "auto",
          padding: "28px 28px 40px", position: "relative" }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#333" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <PlatformBadge platform={post.platform} />
          <span style={{ fontSize: 12, color: "#555", fontVariantNumeric: "tabular-nums" }}>{post.date}</span>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#F0F0F0", lineHeight: 1.4, marginBottom: 16, letterSpacing: "-0.01em" }}>
          {post.title}
        </h2>
        {post.summary && (
          <p style={{ fontSize: 14, color: "#888", marginBottom: 20, lineHeight: 1.6, paddingLeft: 12, borderLeft: `3px solid ${companyColor}` }}>
            {post.summary}
          </p>
        )}

        {/* 🔑 공식 게시글 임베드 */}
        <EmbedPreview xUrl={post.xUrl} threadsUrl={post.threadsUrl} />

        {post.content && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 8, padding: "16px 18px", marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>포스팅 내용</p>
            <p style={{ fontSize: 14, color: "#B0B0B0", lineHeight: 1.8, whiteSpace: "pre-line" }}>{post.content}</p>
          </div>
        )}
        {post.source && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>원본 소스</p>
            <a href={post.source} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: "#4A9EFF", wordBreak: "break-all", textDecoration: "none" }}>
              {post.source}
            </a>
          </div>
        )}
        <button onClick={onClose}
          style={{ position: "absolute", top: 20, right: 20, background: "#222", border: "none",
            color: "#888", fontSize: 18, cursor: "pointer", width: 32, height: 32,
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          ×
        </button>
      </div>
    </div>
  );
}

// ── 포스트 카드 ──────────────────────────────────
function PostCard({ post, companyColor, onClick, bookmarked, onBookmark }: {
  post: Post; companyColor: string; onClick: () => void;
  bookmarked: boolean; onBookmark: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const hasDetail = !!(post.content || post.source);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="post-card" onClick={onClick}
      style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8,
        padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10,
        cursor: "pointer", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <PlatformBadge platform={post.platform} />
        <span style={{ fontSize: 12, color: "var(--dim)", fontVariantNumeric: "tabular-nums" }}>{post.date}</span>
        {hasDetail && (
          <span className="detail-hint" style={{ marginLeft: "auto", fontSize: 10, color: "#555", letterSpacing: "0.05em", transition: "color 0.15s" }}>
            자세히 보기 →
          </span>
        )}
        {/* 북마크 + 공유 버튼 */}
        <div style={{ display: "flex", gap: 4, marginLeft: hasDetail ? 8 : "auto" }} onClick={e => e.stopPropagation()}>
          <button onClick={handleCopy}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13,
              color: copied ? "#E87040" : "#444", padding: "2px 4px", lineHeight: 1 }}
            title="링크 복사">
            {copied ? "✓" : "🔗"}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onBookmark(); }}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13,
              color: bookmarked ? "#F5B942" : "#444", padding: "2px 4px", lineHeight: 1 }}
            title={bookmarked ? "북마크 해제" : "북마크"}>
            {bookmarked ? "★" : "☆"}
          </button>
        </div>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text)", fontWeight: 500 }}>{post.title}</p>
      {post.summary && (
        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{post.summary}</p>
      )}
      {(post.threadsUrl || post.xUrl) && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} onClick={e => e.stopPropagation()}>
          {post.threadsUrl && <LinkBtn href={post.threadsUrl} label="Threads" />}
          {post.xUrl && <LinkBtn href={post.xUrl} label="X" />}
        </div>
      )}
    </div>
  );
}

// ── 회사 섹션 ────────────────────────────────────
function CompanySection({ company, onPostClick, bookmarks, onBookmark }: {
  company: Company;
  onPostClick: (post: Post, color: string) => void;
  bookmarks: string[];
  onBookmark: (title: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <section style={{ marginBottom: 40 }}>
      <button onClick={() => setCollapsed(!collapsed)}
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: collapsed ? 0 : 16,
          paddingLeft: 14, borderLeft: `4px solid ${company.color}`,
          background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", letterSpacing: "0.02em" }}>{company.name}</h2>
        <span style={{ fontSize: 12, fontWeight: 600, color: company.color,
          background: `${company.color}18`, padding: "2px 8px", borderRadius: 20 }}>
          {company.posts.length}건
        </span>
        <span style={{ marginLeft: "auto", color: "#444", fontSize: 14,
          transform: collapsed ? "rotate(-90deg)" : "none", transition: "transform 0.2s" }}>
          ▾
        </span>
      </button>
      {!collapsed && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {company.posts.map((post, i) => (
            <PostCard key={i} post={post} companyColor={company.color}
              onClick={() => onPostClick(post, company.color)}
              bookmarked={bookmarks.includes(post.title)}
              onBookmark={() => onBookmark(post.title)} />
          ))}
        </div>
      )}
    </section>
  );
}

// ── 통계 바 ──────────────────────────────────────
function StatsBar({ companies, onCompanyClick }: {
  companies: Company[];
  onCompanyClick: (name: string) => void;
}) {
  const max = Math.max(...companies.map(c => c.posts.length));
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12,
      padding: "22px 24px", marginBottom: 40 }}>
      <h3 style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.12em",
        textTransform: "uppercase", marginBottom: 18 }}>
        회사별 분포 <span style={{ fontSize: 10, color: "#444", fontWeight: 400 }}>(클릭 → 필터)</span>
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {companies.map(c => (
          <div key={c.name} onClick={() => onCompanyClick(c.name)}
            style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
            title={c.name}>
            <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 80, maxWidth: 160, flexShrink: 0,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {c.name}
            </span>
            <div style={{ flex: 1, background: "var(--border)", borderRadius: 4, height: 8, overflow: "hidden" }}>
              <div style={{ width: `${(c.posts.length / max) * 100}%`, height: "100%",
                background: c.color, borderRadius: 4, transition: "width 0.3s" }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", width: 24, textAlign: "right" }}>
              {c.posts.length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 주차 드롭다운 ────────────────────────────────
function WeekDropdown({ currentSlug, currentWeek }: { currentSlug: string; currentWeek: number }) {
  const [open, setOpen] = useState(false);
  const weekList = getWeekList();

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)}
        style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6,
          padding: "4px 12px", color: "var(--text)", fontSize: 13, fontWeight: 700,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
        W{currentWeek} <span style={{ fontSize: 10, color: "var(--muted)" }}>▾</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 99 }} />
          <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%",
            transform: "translateX(-50%)", background: "#1a1a1a", border: "1px solid #333",
            borderRadius: 8, padding: 8, zIndex: 100, minWidth: 120,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
            {weekList.map(w => (
              <a key={w.slug} href={`/${w.slug}`}
                style={{ display: "block", padding: "6px 14px", fontSize: 13, fontWeight: 600,
                  color: w.slug === currentSlug ? "#E87040" : "var(--muted)",
                  textDecoration: "none", borderRadius: 4,
                  background: w.slug === currentSlug ? "#E8704018" : "transparent" }}
                onClick={() => setOpen(false)}>
                {w.year} W{w.week}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── 메인 컴포넌트 ────────────────────────────────
export default function WeeklyClient({ data, prevWeek, nextWeek }: {
  data: WeeklyData;
  prevWeek?: { slug: string; week: number };
  nextWeek?: { slug: string; week: number };
}) {
  const [selectedPost, setSelectedPost] = useState<{ post: Post; color: string } | null>(null);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [bookmarkFilter, setBookmarkFilter] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // localStorage 북마크 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem("voidnews-bookmarks");
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {}
  }, []);

  const toggleBookmark = useCallback((title: string) => {
    setBookmarks(prev => {
      const next = prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title];
      try { localStorage.setItem("voidnews-bookmarks", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // 키보드 단축키
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement;
      const inInput = active?.tagName === "INPUT" || active?.tagName === "TEXTAREA";

      if (e.key === "Escape") {
        setSelectedPost(null);
      } else if (e.key === "/" && !inInput) {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      } else if (e.key === "ArrowLeft" && !inInput && prevWeek) {
        window.location.href = `/${prevWeek.slug}`;
      } else if (e.key === "ArrowRight" && !inInput && nextWeek) {
        window.location.href = `/${nextWeek.slug}`;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prevWeek, nextWeek]);

  // 필터링
  const filteredCompanies = useMemo(() => {
    return data.companies
      .map(company => ({
        ...company,
        posts: company.posts.filter(post => {
          const q = search.toLowerCase();
          const matchSearch = !q ||
            post.title.toLowerCase().includes(q) ||
            (post.summary || "").toLowerCase().includes(q) ||
            (post.content || "").toLowerCase().includes(q);
          const matchPlatform = platformFilter === "all" || post.platform === platformFilter || post.platform.includes(platformFilter);
          const matchBookmark = !bookmarkFilter || bookmarks.includes(post.title);
          return matchSearch && matchPlatform && matchBookmark;
        })
      }))
      .filter(c => {
        if (companyFilter !== "all" && c.name !== companyFilter) return false;
        return c.posts.length > 0;
      });
  }, [data.companies, search, platformFilter, companyFilter, bookmarkFilter, bookmarks]);

  const totalFiltered = filteredCompanies.reduce((sum, c) => sum + c.posts.length, 0);
  const isFiltering = search || platformFilter !== "all" || companyFilter !== "all" || bookmarkFilter;

  return (
    <>
      {selectedPost && (
        <PostModal post={selectedPost.post} companyColor={selectedPost.color}
          onClose={() => setSelectedPost(null)} />
      )}

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 96px" }}>

        {/* 주차 네비 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          {prevWeek ? (
            <a href={`/${prevWeek.slug}`} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
              title="이전 주차 (←)">
              ← W{prevWeek.week}
            </a>
          ) : <div />}

          <WeekDropdown currentSlug={data.slug} currentWeek={data.week} />

          {nextWeek ? (
            <a href={`/${nextWeek.slug}`} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
              title="다음 주차 (→)">
              W{nextWeek.week} →
            </a>
          ) : <div />}
        </div>

        {/* 헤더 */}
        <div style={{ marginBottom: 40, marginTop: 24 }}>
          <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
            {data.year} · Week {data.week}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
              <rect width="32" height="32" rx="8" fill="#E87040"/>
              <text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="800" fontFamily="Arial, sans-serif">V</text>
            </svg>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.2 }}>
              VoidNews — Week {data.week}
            </h1>
          </div>
          <p style={{ fontSize: 15, color: "var(--muted)" }}>
            {data.period} &nbsp;·&nbsp;
            <span style={{ color: "#E87040", fontWeight: 700 }}>{data.totalPosts}건</span> 포스팅
          </p>
        </div>

        {/* 검색 + 필터 */}
        <div style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <input id="search-input" type="text" placeholder="포스팅 검색... ( / 단축키)"
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: "var(--card)", border: "1px solid var(--border)",
              borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 14,
              outline: "none", width: "100%" }} />

          {/* 플랫폼 필터 */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            {["all", "X", "Threads"].map(p => (
              <button key={p} onClick={() => setPlatformFilter(p)}
                style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20,
                  border: "1px solid", cursor: "pointer", transition: "all 0.15s", flexShrink: 0,
                  borderColor: platformFilter === p ? "#E87040" : "var(--border)",
                  background: platformFilter === p ? "#E87040" : "transparent",
                  color: platformFilter === p ? "#000" : "var(--muted)" }}>
                {p === "all" ? "전체" : p}
              </button>
            ))}
            <div style={{ width: 1, background: "var(--border)", alignSelf: "stretch" }} />
            {/* 북마크 필터 */}
            <button onClick={() => setBookmarkFilter(!bookmarkFilter)}
              style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20,
                border: "1px solid", cursor: "pointer", flexShrink: 0,
                borderColor: bookmarkFilter ? "#F5B942" : "var(--border)",
                background: bookmarkFilter ? "#F5B94222" : "transparent",
                color: bookmarkFilter ? "#F5B942" : "var(--muted)" }}>
              {bookmarkFilter ? "★" : "☆"} 북마크 {bookmarks.length > 0 ? `(${bookmarks.length})` : ""}
            </button>
          </div>

          {/* 회사 필터 - 가로 스크롤 */}
          <div className="filter-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", flexWrap: "nowrap" }}>
            <button onClick={() => setCompanyFilter("all")}
              style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20,
                border: "1px solid", cursor: "pointer", flexShrink: 0,
                borderColor: companyFilter === "all" ? "#E87040" : "var(--border)",
                background: companyFilter === "all" ? "#E87040" : "transparent",
                color: companyFilter === "all" ? "#000" : "var(--muted)" }}>
              전체 회사
            </button>
            {data.companies.map(c => (
              <button key={c.name} onClick={() => setCompanyFilter(companyFilter === c.name ? "all" : c.name)}
                style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20,
                  border: "1px solid", cursor: "pointer", transition: "all 0.15s", flexShrink: 0,
                  borderColor: companyFilter === c.name ? c.color : "var(--border)",
                  background: companyFilter === c.name ? `${c.color}22` : "transparent",
                  color: companyFilter === c.name ? c.color : "var(--muted)" }}>
                {c.name.split(" /")[0]}
              </button>
            ))}
          </div>

          {isFiltering && (
            <p style={{ fontSize: 12, color: "var(--muted)" }}>
              {totalFiltered}건 검색됨
              <button onClick={() => { setSearch(""); setPlatformFilter("all"); setCompanyFilter("all"); setBookmarkFilter(false); }}
                style={{ marginLeft: 12, fontSize: 11, color: "#E87040", background: "none", border: "none", cursor: "pointer" }}>
                필터 초기화
              </button>
            </p>
          )}
        </div>

        {/* 통계 */}
        <StatsBar companies={data.companies}
          onCompanyClick={(name) => setCompanyFilter(companyFilter === name ? "all" : name)} />

        {/* 회사 섹션 */}
        {filteredCompanies.length > 0 ? filteredCompanies.map(company => (
          <CompanySection key={company.name} company={company}
            onPostClick={(post, color) => setSelectedPost({ post, color })}
            bookmarks={bookmarks}
            onBookmark={toggleBookmark} />
        )) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>🔍</p>
            <p>검색 결과가 없습니다</p>
          </div>
        )}

        {/* 단축키 힌트 */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: "#333", textAlign: "center", letterSpacing: "0.05em" }}>
            ⌨️ &nbsp; <kbd style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 3, padding: "1px 5px", fontSize: 10 }}>/</kbd> 검색 &nbsp;·&nbsp;
            <kbd style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 3, padding: "1px 5px", fontSize: 10 }}>←</kbd>
            <kbd style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 3, padding: "1px 5px", fontSize: 10 }}>→</kbd> 주차 이동 &nbsp;·&nbsp;
            <kbd style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 3, padding: "1px 5px", fontSize: 10 }}>ESC</kbd> 닫기
          </p>
        </div>

        {/* 푸터 */}
        <div style={{ paddingTop: 8, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--dim)" }}>
            by{" "}
            <a href="https://www.threads.com/@voidlight00" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--muted)", textDecoration: "none" }}>@voidlight00</a>
            {" "}&nbsp;·&nbsp;{" "}
            <a href="https://x.com/VoidLight_Hyeon" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--muted)", textDecoration: "none" }}>@VoidLight_Hyeon</a>
          </p>
        </div>
      </main>
    </>
  );
}
