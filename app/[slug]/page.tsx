import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getWeek, weeks, type Post, type Company } from "@/lib/data";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getWeek(slug);
  if (!data) return {};
  return {
    title: `VoidNews — Week ${data.week} (${data.period})`,
    description: `AI 뉴스 주간 포스팅 정리 ${data.period} · 총 ${data.totalPosts}건`,
  };
}

function PlatformBadge({ platform }: { platform: Post["platform"] }) {
  const styles: Record<string, { bg: string; color: string }> = {
    "X": { bg: "#18181B", color: "#E4E4E7" },
    "Threads": { bg: "#1A1A2E", color: "#A78BFA" },
    "X+Threads": { bg: "#1A1F2E", color: "#60A5FA" },
  };
  const s = styles[platform] || styles["X"];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 4,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      {platform}
    </span>
  );
}

function LinkButton({ href, label }: { href: string; label: string }) {
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

function PostCard({ post }: { post: Post }) {
  const hasLinks = post.threadsUrl || post.xUrl;
  return (
    <div
      className="post-card"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <PlatformBadge platform={post.platform} />
        <span style={{ fontSize: 12, color: "var(--dim)", fontVariantNumeric: "tabular-nums" }}>
          {post.date}
        </span>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text)", fontWeight: 400 }}>
        {post.title}
      </p>
      {hasLinks && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {post.threadsUrl && <LinkButton href={post.threadsUrl} label="Threads" />}
          {post.xUrl && <LinkButton href={post.xUrl} label="X" />}
        </div>
      )}
    </div>
  );
}

function CompanySection({ company }: { company: Company }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          paddingLeft: 14,
          borderLeft: `4px solid ${company.color}`,
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", letterSpacing: "0.02em" }}>
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
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {company.posts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </div>
    </section>
  );
}

function StatsBar({ companies }: { companies: Company[] }) {
  const max = Math.max(...companies.map((c) => c.posts.length));
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "24px 28px",
        marginBottom: 48,
      }}
    >
      <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
        회사별 분포
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {companies.map((c) => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "var(--muted)", width: 160, flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {c.name}
            </span>
            <div style={{ flex: 1, background: "var(--border)", borderRadius: 4, height: 8, overflow: "hidden" }}>
              <div
                style={{
                  width: `${(c.posts.length / max) * 100}%`,
                  height: "100%",
                  background: c.color,
                  borderRadius: 4,
                  transition: "width 0.5s ease",
                }}
              />
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

export default async function WeekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getWeek(slug);
  if (!data) notFound();

  const currentIdx = weeks.findIndex((w) => w.slug === slug);
  const prevWeek = weeks[currentIdx + 1];
  const nextWeek = weeks[currentIdx - 1];

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 96px" }}>
      {/* Week navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        {prevWeek ? (
          <Link href={`/${prevWeek.slug}`} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            ← W{prevWeek.week}
          </Link>
        ) : <div />}
        {nextWeek ? (
          <Link href={`/${nextWeek.slug}`} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            W{nextWeek.week} →
          </Link>
        ) : <div />}
      </div>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
          {data.year} · Week {data.week}
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: 10, lineHeight: 1.2 }}>
          VoidNews — Week {data.week}
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted)" }}>
          {data.period} &nbsp;·&nbsp;
          <span style={{ color: "#E87040", fontWeight: 700 }}>{data.totalPosts}건</span> 포스팅
        </p>
      </div>

      {/* Stats */}
      <StatsBar companies={data.companies} />

      {/* Company sections */}
      {data.companies.map((company) => (
        <CompanySection key={company.name} company={company} />
      ))}

      {/* Footer */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32, textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "var(--dim)" }}>
          by{" "}
          <a href="https://www.threads.com/@voidlight00" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", textDecoration: "none" }}>
            @voidlight00
          </a>{" "}
          &nbsp;·&nbsp;{" "}
          <a href="https://x.com/VoidLight_Hyeon" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", textDecoration: "none" }}>
            @VoidLight_Hyeon
          </a>
        </p>
      </div>
    </main>
  );
}
