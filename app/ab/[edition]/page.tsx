import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEditionSlugs, getEdition } from "@/lib/ab/data";
import type { ABHighlight, ABEditorPick } from "@/lib/ab/data";

export async function generateStaticParams() {
  return getAllEditionSlugs().map((edition) => ({ edition }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition } = await params;
  const data = getEdition(edition);
  if (!data) return {};
  return {
    title: `VoidNews AB — ${data.title} (${data.slug})`,
    description: `${data.theme} · ${data.highlights.length}개 엄선 · 발표일 ${data.announceDate}`,
  };
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition } = await params;
  const data = getEdition(edition);
  if (!data) notFound();

  const hero = data.highlights.find((h) => h.tier === "hero");
  const features = data.highlights.filter((h) => h.tier === "feature");
  const normals = data.highlights.filter((h) => h.tier === "normal");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--sans)",
      }}
    >
      {/* ───── Header ───── */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "40px 24px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--muted)",
              display: "flex",
              gap: 10,
              alignItems: "center",
              letterSpacing: "0.08em",
            }}
          >
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
              VOIDNEWS
            </Link>
            <span style={{ color: "var(--dim)" }}>/</span>
            <Link href="/ab" style={{ color: "var(--muted)", textDecoration: "none" }}>
              AB BRIEFING
            </Link>
            <span style={{ color: "var(--dim)" }}>/</span>
            <span style={{ color: "var(--text)" }}>{data.slug}</span>
          </div>

          <div
            style={{
              fontFamily: "var(--mono)",
              marginTop: 28,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
              fontSize: 11,
              letterSpacing: "0.06em",
            }}
          >
            <span
              style={{
                background: "var(--accent)",
                color: "#000",
                padding: "3px 8px",
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              VOL. {String(data.volume).padStart(2, "0")}
            </span>
            <span style={{ color: "var(--muted)" }}>{data.period}</span>
            <span style={{ color: "var(--dim)" }}>·</span>
            <span style={{ color: "var(--muted)" }}>발표일 {data.announceDate}</span>
            <span style={{ color: "var(--dim)" }}>·</span>
            <span style={{ color: "var(--muted)" }}>
              {data.highlights.length} HIGHLIGHTS
              {data.editorsPicks && data.editorsPicks.length > 0
                ? ` + ${data.editorsPicks.length} PICK`
                : ""}
            </span>
          </div>

          <h1
            style={{
              marginTop: 14,
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            {data.title}
          </h1>
          <p
            style={{
              marginTop: 12,
              fontFamily: "var(--mono)",
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            {data.theme}
          </p>
        </div>
      </header>

      {/* ───── Intro ───── */}
      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            ▾ Opening
          </div>
          <p
            style={{
              marginTop: 16,
              whiteSpace: "pre-wrap",
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--text)",
            }}
          >
            {data.intro}
          </p>
        </div>
      </section>

      {/* ───── Hero ───── */}
      {hero && (
        <section style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
          <div style={{ maxWidth: 960, width: "100%" }}>
            <HeroCard item={hero} />
          </div>
        </section>
      )}

      {/* ───── Features ───── */}
      {features.length > 0 && (
        <section style={{ padding: "24px" }}>
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              display: "grid",
              gap: 20,
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            }}
          >
            {features.map((h) => (
              <FeatureCard key={h.rank} item={h} />
            ))}
          </div>
        </section>
      )}

      {/* ───── Normals ───── */}
      {normals.length > 0 && (
        <section style={{ padding: "24px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 16,
              }}
            >
              ▾ More Highlights
            </div>
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
            >
              {normals.map((h) => (
                <NormalCard key={h.rank} item={h} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── Editor's Pick ───── */}
      {data.editorsPicks && data.editorsPicks.length > 0 && (
        <section style={{ padding: "48px 24px 24px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div
              style={{
                borderTop: "1px solid var(--border2)",
                paddingTop: 28,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                🛠 Editor&apos;s Pick
              </div>
              <h2
                style={{
                  fontFamily: "var(--mono)",
                  marginTop: 8,
                  fontSize: 20,
                  fontWeight: 600,
                  color: "var(--text)",
                }}
              >
                VoidLight 엄선 — 직접 써본 도구·자료
              </h2>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  marginTop: 4,
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                VIP 트윗 트랙과 별개로, 큐레이터가 직접 검증한 인프라/도구
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              }}
            >
              {data.editorsPicks.map((pick, i) => (
                <EditorPickCard key={i} item={pick} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── Closing ───── */}
      <section style={{ padding: "48px 24px 72px" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            borderTop: "1px solid var(--border)",
            paddingTop: 40,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            ▾ Closing
          </div>
          <p
            style={{
              marginTop: 16,
              whiteSpace: "pre-wrap",
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--text)",
            }}
          >
            {data.closing}
          </p>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 12,
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--muted)",
          }}
        >
          <div>
            커버 주차:{" "}
            {data.coveredWeeks.map((w) => (
              <Link
                key={w}
                href={`/${w}`}
                style={{
                  margin: "0 4px",
                  color: "var(--muted)",
                  textDecoration: "underline",
                }}
              >
                {w}
              </Link>
            ))}
          </div>
          <div>
            <Link
              href="/ab"
              style={{ color: "var(--muted)", textDecoration: "none" }}
            >
              ← AB 발표 목록
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ════════════════════════════════════════════════════════════
   카드 컴포넌트 (inline style)
═══════════════════════════════════════════════════════════════ */

function RankBadge({ rank, tier }: { rank: number; tier: string }) {
  const medal =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        color: "var(--muted)",
      }}
    >
      {medal && <span style={{ fontSize: 18 }}>{medal}</span>}
      <span
        style={{
          border: "1px solid var(--border2)",
          borderRadius: 2,
          padding: "2px 8px",
        }}
      >
        #{String(rank).padStart(2, "0")}
      </span>
      <span
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--dim)",
        }}
      >
        {tier}
      </span>
    </span>
  );
}

function CompanyTag({ name }: { name: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        color: "var(--muted)",
      }}
    >
      {name}
    </span>
  );
}

function TagList({ tags, limit = 8 }: { tags?: string[]; limit?: number }) {
  if (!tags || tags.length === 0) return null;
  return (
    <>
      {tags.slice(0, limit).map((tag) => (
        <span
          key={tag}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--dim)",
          }}
        >
          #{tag}
        </span>
      ))}
    </>
  );
}

function OriginalLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        marginLeft: "auto",
        fontFamily: "var(--mono)",
        fontSize: 11,
        color: "var(--accent)",
        textDecoration: "none",
      }}
    >
      원문 →
    </a>
  );
}

function HeroCard({ item }: { item: ABHighlight }) {
  return (
    <article
      style={{
        border: "2px solid var(--accent)",
        background: "var(--card)",
        padding: 32,
        borderRadius: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <RankBadge rank={item.rank} tier={item.tier} />
        <CompanyTag name={item.sourceCompany} />
      </div>

      <h2
        style={{
          marginTop: 20,
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "var(--text)",
        }}
      >
        {item.post.title}
      </h2>

      {item.keyQuote && (
        <blockquote
          style={{
            fontFamily: "var(--mono)",
            marginTop: 24,
            borderLeft: "4px solid var(--accent)",
            paddingLeft: 16,
            fontSize: 16,
            fontStyle: "italic",
            color: "var(--text)",
            lineHeight: 1.5,
          }}
        >
          &ldquo;{item.keyQuote}&rdquo;
        </blockquote>
      )}

      <p
        style={{
          marginTop: 24,
          whiteSpace: "pre-wrap",
          fontSize: 14,
          lineHeight: 1.8,
          color: "var(--text)",
        }}
      >
        {item.post.content}
      </p>

      {item.editorial && (
        <aside
          style={{
            marginTop: 28,
            borderTop: "1px solid var(--border)",
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              marginBottom: 8,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            ▾ Editor&apos;s Note
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: "var(--muted)",
            }}
          >
            {item.editorial}
          </p>
        </aside>
      )}

      <div
        style={{
          marginTop: 28,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 14,
        }}
      >
        <TagList tags={item.post.tags} />
        <OriginalLink url={item.post.officialUrl || item.post.source || "#"} />
      </div>
    </article>
  );
}

function FeatureCard({ item }: { item: ABHighlight }) {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        background: "var(--card)",
        padding: 24,
        borderRadius: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <RankBadge rank={item.rank} tier={item.tier} />
        <CompanyTag name={item.sourceCompany} />
      </div>

      <h3
        style={{
          marginTop: 16,
          fontSize: 20,
          fontWeight: 600,
          lineHeight: 1.25,
          color: "var(--text)",
        }}
      >
        {item.post.title}
      </h3>

      {item.keyQuote && (
        <blockquote
          style={{
            fontFamily: "var(--mono)",
            marginTop: 14,
            borderLeft: "2px solid var(--accent)",
            paddingLeft: 12,
            fontSize: 13,
            fontStyle: "italic",
            color: "var(--muted)",
            lineHeight: 1.5,
          }}
        >
          &ldquo;{item.keyQuote}&rdquo;
        </blockquote>
      )}

      <p
        style={{
          marginTop: 14,
          whiteSpace: "pre-wrap",
          fontSize: 13,
          lineHeight: 1.8,
          color: "var(--text)",
        }}
      >
        {item.post.content}
      </p>

      {item.editorial && (
        <aside
          style={{
            marginTop: 14,
            borderTop: "1px solid var(--border)",
            paddingTop: 14,
          }}
        >
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.75,
              color: "var(--muted)",
            }}
          >
            {item.editorial}
          </p>
        </aside>
      )}

      <div
        style={{
          marginTop: "auto",
          paddingTop: 14,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TagList tags={item.post.tags} limit={4} />
        <OriginalLink url={item.post.officialUrl || item.post.source || "#"} />
      </div>
    </article>
  );
}

function NormalCard({ item }: { item: ABHighlight }) {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        background: "var(--card)",
        padding: 20,
        borderRadius: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <RankBadge rank={item.rank} tier={item.tier} />
        <CompanyTag name={item.sourceCompany} />
      </div>

      <h3
        style={{
          marginTop: 12,
          fontSize: 16,
          fontWeight: 600,
          lineHeight: 1.35,
          color: "var(--text)",
        }}
      >
        {item.post.title}
      </h3>

      <p
        style={{
          marginTop: 12,
          whiteSpace: "pre-wrap",
          fontSize: 13,
          lineHeight: 1.75,
          color: "var(--muted)",
        }}
      >
        {item.post.content}
      </p>

      {item.editorial && (
        <aside
          style={{
            marginTop: 12,
            borderTop: "1px solid var(--border)",
            paddingTop: 12,
          }}
        >
          <p
            style={{
              fontSize: 11,
              lineHeight: 1.7,
              color: "var(--dim)",
            }}
          >
            {item.editorial}
          </p>
        </aside>
      )}

      <div
        style={{
          marginTop: "auto",
          paddingTop: 12,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TagList tags={item.post.tags} limit={3} />
        <OriginalLink url={item.post.officialUrl || item.post.source || "#"} />
      </div>
    </article>
  );
}

function EditorPickCard({ item }: { item: ABEditorPick }) {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        borderLeft: "4px solid var(--gold)",
        borderTop: "1px solid var(--border)",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--card)",
        padding: 24,
        borderRadius: 2,
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 11,
        }}
      >
        <span
          style={{
            background: "var(--gold)",
            color: "#000",
            padding: "3px 8px",
            borderRadius: 2,
            fontWeight: 700,
          }}
        >
          🛠 PICK
        </span>
        <span style={{ color: "var(--muted)" }}>{item.category}</span>
      </div>

      <h3
        style={{
          marginTop: 14,
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.2,
          color: "var(--text)",
        }}
      >
        {item.title}
      </h3>
      {item.subtitle && (
        <p
          style={{
            fontFamily: "var(--mono)",
            marginTop: 4,
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          {item.subtitle}
        </p>
      )}

      <p
        style={{
          fontFamily: "var(--mono)",
          marginTop: 14,
          borderLeft: "2px solid var(--gold)",
          paddingLeft: 12,
          fontSize: 13,
          color: "var(--text)",
          lineHeight: 1.6,
        }}
      >
        {item.summary}
      </p>

      <p
        style={{
          marginTop: 14,
          whiteSpace: "pre-wrap",
          fontSize: 13,
          lineHeight: 1.8,
          color: "var(--text)",
        }}
      >
        {item.body}
      </p>

      {item.editorial && (
        <aside
          style={{
            marginTop: 14,
            borderTop: "1px solid var(--border)",
            paddingTop: 14,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              marginBottom: 6,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            ▾ Editor&apos;s Note
          </div>
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.75,
              color: "var(--muted)",
            }}
          >
            {item.editorial}
          </p>
        </aside>
      )}

      <div
        style={{
          marginTop: "auto",
          paddingTop: 14,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TagList tags={item.tags} limit={5} />
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: "auto",
            fontFamily: "var(--mono)",
            fontSize: 12,
            background: "var(--gold)",
            color: "#000",
            padding: "6px 12px",
            borderRadius: 2,
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          {item.sourceLabel || "시작하기 →"}
        </a>
      </div>
    </article>
  );
}
