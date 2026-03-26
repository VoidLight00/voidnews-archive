"use client";

import { useState, useMemo } from "react";
import type { WeeklyData, Post, Company } from "@/lib/data";

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

// ── 상세 모달 ────────────────────────────────────
function PostModal({ post, companyColor, onClose }: { post: Post; companyColor: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000,
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        backdropFilter: "blur(4px)", padding: "0 0 0 0" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "16px 16px 0 0",
          width: "100%", maxWidth: 680, maxHeight: "85vh", overflowY: "auto",
          padding: "28px 28px 40px", position: "relative" }}
      >
        {/* 닫기 핸들 */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#333" }} />
        </div>

        {/* 헤더 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <PlatformBadge platform={post.platform} />
          <span style={{ fontSize: 12, color: "#555", fontVariantNumeric: "tabular-nums" }}>
            {post.date}
          </span>
        </div>

        {/* 제목 */}
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#F0F0F0", lineHeight: 1.4,
          marginBottom: 16, letterSpacing: "-0.01em" }}>
          {post.title}
        </h2>

        {/* 한줄 요약 */}
        {post.summary && (
          <p style={{ fontSize: 14, color: "#888", marginBottom: 20, lineHeight: 1.6,
            paddingLeft: 12, borderLeft: `3px solid ${companyColor}` }}>
            {post.summary}
          </p>
        )}

        {/* 전문 */}
        {post.content && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 8,
            padding: "16px 18px", marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#555", letterSpacing: "0.1em",
              textTransform: "uppercase", marginBottom: 10 }}>
              포스팅 내용
            </p>
            <p style={{ fontSize: 14, color: "#B0B0B0", lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {post.content}
            </p>
          </div>
        )}

        {/* 원본 소스 */}
        {post.source && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              원본 소스
            </p>
            <a href={post.source} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: "#4A9EFF", wordBreak: "break-all", textDecoration: "none" }}>
              {post.source}
            </a>
          </div>
        )}

        {/* 링크 */}
        {(post.threadsUrl || post.xUrl) && (
          <div>
            <p style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              포스팅 링크
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {post.threadsUrl && <LinkBtn href={post.threadsUrl} label="Threads에서 보기" />}
              {post.xUrl && <LinkBtn href={post.xUrl} label="X에서 보기" />}
            </div>
          </div>
        )}

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 20, right: 20, background: "#222",
            border: "none", color: "#888", fontSize: 18, cursor: "pointer",
            width: 32, height: 32, borderRadius: "50%", display: "flex",
            alignItems: "center", justifyContent: "center" }}>
          ×
        </button>
      </div>
    </div>
  );
}

// ── 포스트 카드 ──────────────────────────────────
function PostCard({ post, companyColor, onClick }: {
  post: Post; companyColor: string; onClick: () => void
}) {
  const hasDetail = !!(post.content || post.source);
  return (
    <div
      className="post-card"
      onClick={onClick}
      style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8,
        padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10,
        cursor: "pointer", position: "relative" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <PlatformBadge platform={post.platform} />
        <span style={{ fontSize: 12, color: "var(--dim)", fontVariantNumeric: "tabular-nums" }}>
          {post.date}
        </span>
        {hasDetail && (
          <span style={{ marginLeft: "auto", fontSize: 10, color: "#444", letterSpacing: "0.05em" }}>
            자세히 보기 →
          </span>
        )}
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text)", fontWeight: 500 }}>
        {post.title}
      </p>
      {post.summary && (
        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
          {post.summary}
        </p>
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
function CompanySection({ company, onPostClick }: {
  company: Company; onPostClick: (post: Post, color: string) => void
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <section style={{ marginBottom: 40 }}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: collapsed ? 0 : 16,
          paddingLeft: 14, borderLeft: `4px solid ${company.color}`,
          background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
      >
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", letterSpacing: "0.02em" }}>
          {company.name}
        </h2>
        <span style={{ fontSize: 12, fontWeight: 600, color: company.color,
          background: `${company.color}18`, padding: "2px 8px", borderRadius: 20 }}>
          {company.posts.length}건
        </span>
        <span style={{ marginLeft: "auto", color: "#444", fontSize: 14, transform: collapsed ? "rotate(-90deg)" : "none", transition: "transform 0.2s" }}>
          ▾
        </span>
      </button>
      {!collapsed && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {company.posts.map((post, i) => (
            <PostCard key={i} post={post} companyColor={company.color}
              onClick={() => onPostClick(post, company.color)} />
          ))}
        </div>
      )}
    </section>
  );
}

// ── 통계 바 ──────────────────────────────────────
function StatsBar({ companies }: { companies: Company[] }) {
  const max = Math.max(...companies.map(c => c.posts.length));
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12,
      padding: "22px 24px", marginBottom: 40 }}>
      <h3 style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.12em",
        textTransform: "uppercase", marginBottom: 18 }}>
        회사별 분포
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {companies.map(c => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "var(--muted)", width: 160, flexShrink: 0,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {c.name}
            </span>
            <div style={{ flex: 1, background: "var(--border)", borderRadius: 4, height: 8, overflow: "hidden" }}>
              <div style={{ width: `${(c.posts.length / max) * 100}%`, height: "100%",
                background: c.color, borderRadius: 4 }} />
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

  // 필터링된 데이터
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
          return matchSearch && matchPlatform;
        })
      }))
      .filter(c => {
        if (companyFilter !== "all" && c.name !== companyFilter) return false;
        return c.posts.length > 0;
      });
  }, [data.companies, search, platformFilter, companyFilter]);

  const totalFiltered = filteredCompanies.reduce((sum, c) => sum + c.posts.length, 0);

  return (
    <>
      {/* 모달 */}
      {selectedPost && (
        <PostModal post={selectedPost.post} companyColor={selectedPost.color}
          onClose={() => setSelectedPost(null)} />
      )}

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 96px" }}>

        {/* 주차 네비 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          {prevWeek ? (
            <a href={`/${prevWeek.slug}`} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
              ← W{prevWeek.week}
            </a>
          ) : <div />}
          {nextWeek ? (
            <a href={`/${nextWeek.slug}`} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
              W{nextWeek.week} →
            </a>
          ) : <div />}
        </div>

        {/* 헤더 */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.15em",
            textTransform: "uppercase", marginBottom: 10 }}>
            {data.year} · Week {data.week}
          </p>
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em",
            color: "var(--text)", marginBottom: 10, lineHeight: 1.2 }}>
            VoidNews — Week {data.week}
          </h1>
          <p style={{ fontSize: 15, color: "var(--muted)" }}>
            {data.period} &nbsp;·&nbsp;
            <span style={{ color: "#E87040", fontWeight: 700 }}>{data.totalPosts}건</span> 포스팅
          </p>
        </div>

        {/* 검색 + 필터 */}
        <div style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            placeholder="포스팅 검색..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: "var(--card)", border: "1px solid var(--border)",
              borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 14,
              outline: "none", width: "100%" }}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {/* 플랫폼 필터 */}
            {["all", "X", "Threads"].map(p => (
              <button key={p}
                onClick={() => setPlatformFilter(p)}
                style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20,
                  border: "1px solid", cursor: "pointer", transition: "all 0.15s",
                  borderColor: platformFilter === p ? "#E87040" : "var(--border)",
                  background: platformFilter === p ? "#E87040" : "transparent",
                  color: platformFilter === p ? "#000" : "var(--muted)" }}>
                {p === "all" ? "전체" : p}
              </button>
            ))}
            <div style={{ width: 1, background: "var(--border)", margin: "0 4px" }} />
            {/* 회사 필터 */}
            <button
              onClick={() => setCompanyFilter("all")}
              style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20,
                border: "1px solid", cursor: "pointer",
                borderColor: companyFilter === "all" ? "#E87040" : "var(--border)",
                background: companyFilter === "all" ? "#E87040" : "transparent",
                color: companyFilter === "all" ? "#000" : "var(--muted)" }}>
              전체 회사
            </button>
            {data.companies.map(c => (
              <button key={c.name}
                onClick={() => setCompanyFilter(companyFilter === c.name ? "all" : c.name)}
                style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20,
                  border: "1px solid", cursor: "pointer", transition: "all 0.15s",
                  borderColor: companyFilter === c.name ? c.color : "var(--border)",
                  background: companyFilter === c.name ? `${c.color}22` : "transparent",
                  color: companyFilter === c.name ? c.color : "var(--muted)" }}>
                {c.name.split(" /")[0]}
              </button>
            ))}
          </div>
          {(search || platformFilter !== "all" || companyFilter !== "all") && (
            <p style={{ fontSize: 12, color: "var(--muted)" }}>
              {totalFiltered}건 검색됨
              <button onClick={() => { setSearch(""); setPlatformFilter("all"); setCompanyFilter("all"); }}
                style={{ marginLeft: 12, fontSize: 11, color: "#E87040", background: "none",
                  border: "none", cursor: "pointer" }}>
                필터 초기화
              </button>
            </p>
          )}
        </div>

        {/* 통계 */}
        <StatsBar companies={data.companies} />

        {/* 회사 섹션 */}
        {filteredCompanies.length > 0 ? filteredCompanies.map(company => (
          <CompanySection key={company.name} company={company}
            onPostClick={(post, color) => setSelectedPost({ post, color })} />
        )) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>🔍</p>
            <p>검색 결과가 없습니다</p>
          </div>
        )}

        {/* 푸터 */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32, textAlign: "center" }}>
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
