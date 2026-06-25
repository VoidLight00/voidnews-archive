import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { getAllSlugs, getWeek } from "@/lib/data";
import type { Post } from "@/lib/data";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getWeek(slug);
  if (!data) return {};
  return {
    title: `발표용 하이라이트 — Week ${data.week} (${data.period})`,
    description: `AI & Beyond 격주 발표 큐레이션 ${data.period}`,
  };
}

type FeaturedEntry = { company: string; color: string; post: Post };

function formatTag(tag: string): string {
  return tag;
}

function stripInlineMarkdown(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1");
}

// 인라인 토큰(**bold** / `code` / [link])을 편집형 토큰 스타일로 렌더
function renderInlineSlide(text: string, keyPrefix: string) {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return tokens.map((tok, i) => {
    const key = `${keyPrefix}-${i}`;
    const b = tok.match(/^\*\*([^*]+)\*\*$/);
    if (b)
      return (
        <strong key={key} style={{ fontWeight: 700, color: "var(--text-strong)" }}>
          {b[1]}
        </strong>
      );
    const c = tok.match(/^`([^`]+)`$/);
    if (c)
      return (
        <code
          key={key}
          className="mono"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xs)",
            padding: "1px 5px",
            fontSize: "0.86em",
            color: "var(--text)",
          }}
        >
          {c[1]}
        </code>
      );
    const l = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (l)
      return (
        <a
          key={key}
          href={l[2]}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "var(--accent)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            textDecorationThickness: "1px",
          }}
        >
          {l[1]}
        </a>
      );
    return <span key={key}>{tok}</span>;
  });
}

// 라인 단위 마크다운 파서 — ##/### 소제목, 불릿, 번호, 인용, 인라인 토큰 처리
function renderRichText(text: string) {
  if (!text) return null;
  const lines = text.split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (!t) {
      out.push(<div key={`sp-${i}`} style={{ height: "var(--space-xs)" }} aria-hidden />);
      i++;
      continue;
    }
    let m;
    if ((m = t.match(/^#{2,4}\s+(.*)$/))) {
      out.push(
        <h4
          key={`h-${i}`}
          className="serif"
          style={{
            marginTop: "var(--space-md)",
            marginBottom: "var(--space-2xs)",
            fontWeight: 650,
            fontSize: "var(--text-md)",
            letterSpacing: "-0.02em",
            color: "var(--text-strong)",
          }}
        >
          {renderInlineSlide(m[1], `h-${i}`)}
        </h4>
      );
      i++;
      continue;
    }
    if ((m = t.match(/^\*\*([^*]+)\*\*$/))) {
      out.push(
        <h4
          key={`hb-${i}`}
          className="serif"
          style={{
            marginTop: "var(--space-md)",
            marginBottom: "var(--space-2xs)",
            fontWeight: 650,
            fontSize: "var(--text-md)",
            letterSpacing: "-0.02em",
            color: "var(--text-strong)",
          }}
        >
          {m[1]}
        </h4>
      );
      i++;
      continue;
    }
    if ((m = t.match(/^[-*]\s+(.*)$/))) {
      out.push(
        <div key={`b-${i}`} style={{ display: "flex", gap: "10px", paddingLeft: "2px" }}>
          <span aria-hidden style={{ color: "var(--accent)", flexShrink: 0 }}>
            —
          </span>
          <span>{renderInlineSlide(m[1], `b-${i}`)}</span>
        </div>
      );
      i++;
      continue;
    }
    if ((m = t.match(/^(\d+)\.\s+(.*)$/))) {
      out.push(
        <div key={`o-${i}`} style={{ display: "flex", gap: "10px", paddingLeft: "2px" }}>
          <span
            className="mono"
            style={{ color: "var(--dim)", fontWeight: 700, flexShrink: 0 }}
          >
            {m[1]}.
          </span>
          <span>{renderInlineSlide(m[2], `o-${i}`)}</span>
        </div>
      );
      i++;
      continue;
    }
    if (/^>\s?/.test(t)) {
      out.push(
        <blockquote
          key={`q-${i}`}
          className="serif"
          style={{
            borderLeft: "2px solid var(--border2)",
            paddingLeft: "var(--space-md)",
            fontStyle: "italic",
            color: "var(--muted)",
          }}
        >
          {renderInlineSlide(t.replace(/^>\s?/, ""), `q-${i}`)}
        </blockquote>
      );
      i++;
      continue;
    }
    out.push(<p key={`p-${i}`}>{renderInlineSlide(t, `p-${i}`)}</p>);
    i++;
  }
  return out;
}

type PresentationLink = { label: string; url: string; primary?: boolean };

function isXUrl(url: string): boolean {
  return url.includes("x.com/") || url.includes("twitter.com/");
}

function isVideoUrl(url: string): boolean {
  return url.includes("youtube.com/") || url.includes("youtu.be/");
}

function labelForUrl(url: string, fallback: string): string {
  if (isVideoUrl(url)) return "영상 보기";
  if (isXUrl(url)) return "X 원문";
  return fallback;
}

function collectPresentationLinks(post: Post, slug: string): PresentationLink[] {
  const links: PresentationLink[] = [];
  const seen = new Set<string>();
  const add = (link: PresentationLink) => {
    if (!link.url || seen.has(link.url)) return;
    seen.add(link.url);
    links.push(link);
  };

  add({ label: "상세 카드", url: `/${slug}?post=${encodeURIComponent(post.title)}`, primary: true });
  if (post.officialUrl) {
    add({ label: labelForUrl(post.officialUrl, "공식 원문"), url: post.officialUrl, primary: true });
  }
  if (post.source) {
    add({ label: labelForUrl(post.source, "자료 원문"), url: post.source });
  }
  for (const link of post.backupUrls || []) add(link);

  return links;
}

function SourceButtons({ post, slug }: { post: Post; slug: string }) {
  const links = collectPresentationLinks(post, slug);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
      {links.map((link) => {
        const external = !link.url.startsWith("/");
        return (
          <a
            key={link.url}
            href={link.url}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              minHeight: "38px",
              padding: "0 14px",
              borderRadius: "var(--radius-xs)",
              fontFamily: "var(--mono)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background var(--dur-fast), border-color var(--dur-fast), color var(--dur-fast)",
              ...(link.primary
                ? {
                    color: "var(--ink)",
                    background: "var(--accent)",
                    border: "1px solid var(--accent)",
                  }
                : {
                    color: "var(--text)",
                    background: "transparent",
                    border: "1px solid var(--border2)",
                  }),
            }}
          >
            {link.label}
            <span aria-hidden>↗</span>
          </a>
        );
      })}
    </div>
  );
}

export default async function PresentationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getWeek(slug);
  if (!data) notFound();

  const featured: FeaturedEntry[] = [];
  for (const company of data.companies) {
    for (const post of company.posts) {
      if (post.featured) {
        featured.push({ company: company.name, color: company.color, post });
      }
    }
  }

  if (featured.length === 0) {
    return (
      <main className="ab-page-shell" style={{ display: "grid", placeItems: "center", padding: "var(--space-2xl) var(--gutter)" }}>
        <div className="ab-shell-inner" style={{ maxWidth: "52ch", textAlign: "center", display: "grid", gap: "var(--space-md)" }}>
          <p className="kicker">AI &amp; Beyond · Week {data.week}</p>
          <h1 className="headline" style={{ fontSize: "var(--text-2xl)" }}>
            이 회차에는 발표 하이라이트가 아직 없습니다
          </h1>
          <p className="deck" style={{ fontStyle: "normal" }}>
            전체 아카이브에서 이번 회차 AI 소식을 확인할 수 있습니다.
          </p>
          <div>
            <Link
              href={`/${slug}`}
              className="ab-arrow-link"
              style={{ color: "var(--accent)" }}
            >
              <span aria-hidden>←</span>
              <span>주간 아카이브로</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="ab-page-shell">
      <div
        className="ab-shell-inner"
        style={{ paddingTop: "clamp(36px, 6vw, 64px)", paddingBottom: "clamp(56px, 9vw, 96px)" }}
      >
        {/* Masthead */}
        <header
          className="rise-in"
          style={{
            borderBottom: "1px solid var(--border)",
            paddingBottom: "clamp(28px, 5vw, 44px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <p className="kicker">AI &amp; Beyond · Week {data.week}</p>
            <Link href={`/${slug}`} className="ab-arrow-link">
              <span>전체 아카이브</span>
              <span aria-hidden>→</span>
            </Link>
          </div>

          <h1
            className="headline serif"
            style={{
              marginTop: "clamp(20px, 3vw, 32px)",
              maxWidth: "16ch",
              fontSize: "var(--text-3xl)",
              fontWeight: 720,
              letterSpacing: "-0.05em",
              lineHeight: 0.98,
            }}
          >
            목요일 발표 큐레이션
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "var(--space-md)",
              fontFamily: "var(--mono)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            <span style={{ color: "var(--text-strong)" }}>{data.period}</span>
            <span aria-hidden style={{ color: "var(--dim)" }}>
              ·
            </span>
            <span>Top {featured.length}</span>
            <span aria-hidden style={{ color: "var(--dim)" }}>
              ·
            </span>
            <span style={{ color: "var(--gold)" }}>공식 출처 교차검증</span>
          </div>
        </header>

        {/* Featured editorial cards */}
        <section
          aria-label="발표 하이라이트"
          style={{ marginTop: "clamp(28px, 5vw, 48px)", display: "grid", gap: "clamp(20px, 3vw, 32px)" }}
        >
          {featured.map(({ company, color, post }, idx) => (
            <article
              key={post.title}
              className="article-card rise-in"
              style={{
                borderLeft: "3px solid",
                borderBottomColor: color,
                padding: "clamp(22px, 3.4vw, 36px)",
                animationDelay: `${Math.min(idx, 6) * 50}ms`,
              }}
            >
              {/* Byline row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  flexWrap: "wrap",
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                <span
                  style={{
                    color: "var(--dim)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span aria-hidden style={{ color: "var(--border2)" }}>
                  /
                </span>
                <span style={{ color: "var(--text-strong)" }}>{company}</span>
                <span aria-hidden style={{ color: "var(--dim)" }}>
                  ·
                </span>
                <time>{post.date}</time>
              </div>

              <h2
                className="article-card-title serif"
                style={{
                  marginTop: "var(--space-sm)",
                  fontSize: "var(--text-xl)",
                  fontWeight: 650,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.12,
                  color: "var(--text-strong)",
                  textDecorationColor: "transparent",
                }}
              >
                {post.title}
              </h2>

              {post.summary && (
                <p
                  className="deck serif"
                  style={{
                    marginTop: "var(--space-sm)",
                    maxWidth: "var(--measure)",
                    fontStyle: "normal",
                    fontSize: "var(--text-md)",
                    color: "var(--text-soft)",
                    lineHeight: 1.55,
                  }}
                >
                  {stripInlineMarkdown(post.summary)}
                </p>
              )}

              {post.thumbnail && (
                <figure
                  style={{
                    marginTop: "var(--space-lg)",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-xs)",
                    background: "var(--surface)",
                  }}
                >
                  <img
                    src={post.thumbnail.src}
                    alt={post.thumbnail.alt}
                    loading="lazy"
                    style={{
                      display: "block",
                      width: "100%",
                      aspectRatio: "16 / 9",
                      objectFit: "cover",
                      borderBottom: "1px solid var(--accent)",
                    }}
                  />
                  {post.thumbnail.caption && (
                    <figcaption
                      style={{
                        borderTop: "1px solid var(--border)",
                        padding: "8px 14px",
                        fontSize: "var(--text-xs)",
                        lineHeight: 1.5,
                        color: "var(--dim)",
                      }}
                    >
                      {stripInlineMarkdown(post.thumbnail.caption)}
                    </figcaption>
                  )}
                </figure>
              )}

              {post.content && (
                <div
                  style={{
                    marginTop: "var(--space-lg)",
                    padding: "clamp(16px, 2.4vw, 22px)",
                    background: "color-mix(in srgb, var(--surface), var(--bg) 24%)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-xs)",
                    display: "grid",
                    gap: "6px",
                    fontSize: "var(--text-base)",
                    lineHeight: 1.75,
                    color: "var(--text)",
                  }}
                >
                  {renderRichText(post.content)}
                </div>
              )}

              {post.images && post.images.length > 0 && (
                <div
                  style={{
                    marginTop: "var(--space-lg)",
                    display: "grid",
                    gap: "var(--space-sm)",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                  }}
                >
                  {post.images.map((image) => (
                    <figure
                      key={image.src}
                      style={{
                        overflow: "hidden",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-xs)",
                        background: "var(--surface)",
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        style={{
                          display: "block",
                          width: "100%",
                          aspectRatio: "16 / 9",
                          objectFit: "cover",
                        }}
                      />
                      {image.caption && (
                        <figcaption
                          style={{
                            borderTop: "1px solid var(--border)",
                            padding: "7px 12px",
                            fontSize: "var(--text-xs)",
                            lineHeight: 1.5,
                            color: "var(--dim)",
                          }}
                        >
                          {stripInlineMarkdown(image.caption)}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}

              <div style={{ marginTop: "var(--space-lg)" }}>
                <SourceButtons post={post} slug={slug} />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div
                  style={{
                    marginTop: "var(--space-md)",
                    paddingTop: "var(--space-md)",
                    borderTop: "1px solid var(--rule)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {post.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="chip" style={{ cursor: "default" }}>
                      {formatTag(tag)}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>

        {/* Colophon footer */}
        <footer
          style={{
            marginTop: "clamp(48px, 8vw, 80px)",
            paddingTop: "var(--space-xl)",
            borderTop: "3px double var(--rule)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <Link href={`/${slug}`} className="ab-arrow-link">
            <span aria-hidden>←</span>
            <span>전체 {data.totalPosts}건 아카이브</span>
          </Link>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--dim)",
            }}
          >
            VoidNews · Thursday Briefing
          </span>
        </footer>
      </div>
    </main>
  );
}
