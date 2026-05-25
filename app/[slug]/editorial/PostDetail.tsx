import Link from "next/link";
import type { Post } from "@/lib/data";
import styles from "./editorial.module.css";

interface PostDetailProps {
  meta: {
    post: Post;
    companyName: string;
    companyColor: string;
    weekSlug: string;
    weekPeriod: string;
  };
  prev: { post: Post; companyName: string; companyColor: string } | null;
  next: { post: Post; companyName: string; companyColor: string } | null;
  weekSlug: string;
}

function formatDate(date: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [y, m, d] = date.split("-");
    return `${parseInt(d, 10)} ${monthName(parseInt(m, 10))} ${y}`;
  }
  const [m, d] = date.split("/");
  if (m && d) return `${parseInt(d, 10)} ${monthName(parseInt(m, 10))} 2026`;
  return date;
}
function monthName(m: number): string {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
    Math.max(0, Math.min(11, m - 1))
  ];
}

// 매우 단순 한국어 친화 마크다운 — **bold** 만 처리
function renderContent(content: string) {
  const paragraphs = content.split(/\n\n+/);
  return paragraphs.map((para, idx) => {
    const isHead = /^\*\*[^*]+\*\*$/.test(para.trim());
    if (isHead) {
      const text = para.trim().replace(/^\*\*|\*\*$/g, "");
      return <h2 key={idx}>{text}</h2>;
    }
    const html = para.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return <p key={idx} dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

export default function PostDetail({ meta, prev, next, weekSlug }: PostDetailProps) {
  const { post, companyName, companyColor, weekPeriod } = meta;
  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <article className={styles.article}>
          <Link href={`/${weekSlug}/`} className={styles.backLink}>
            ← {weekSlug} ({weekPeriod})
          </Link>

          <div className={styles.articleMeta}>
            <span
              className={styles.pill}
              style={{
                position: "static",
                ["--pill-color" as string]: companyColor,
              }}
            >
              {companyName.toUpperCase()}
            </span>
            <span>{formatDate(post.date)}</span>
            {post.readMinutes ? <span>· {post.readMinutes} min read</span> : null}
          </div>

          <h1 className={styles.articleTitle}>{post.title}</h1>
          {post.summary ? <p className={styles.articleSummary}>{post.summary}</p> : null}

          {post.thumbnail?.src ? (
            <div className={styles.articleHero}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.thumbnail.src} alt={post.thumbnail.alt ?? post.title} />
            </div>
          ) : null}

          <div className={styles.articleBody}>
            {post.content ? renderContent(post.content) : <p>{post.summary}</p>}
          </div>

          {(post.officialUrl || (post.backupUrls && post.backupUrls.length > 0)) ? (
            <div className={styles.linksBlock}>
              <h3 className={styles.linksTitle}>Official references</h3>
              <ul className={styles.linksList}>
                {post.officialUrl ? (
                  <li>
                    <a href={post.officialUrl} target="_blank" rel="noreferrer">
                      → 공식 출처
                    </a>
                  </li>
                ) : null}
                {(post.backupUrls ?? []).map((b, idx) => (
                  <li key={idx}>
                    <a href={b.url} target="_blank" rel="noreferrer">
                      → {b.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <nav className={styles.adjacentNav}>
            {prev?.post.slug ? (
              <Link href={`/${weekSlug}/${prev.post.slug}/`} className={styles.adjLink}>
                <span className={styles.adjLabel}>← 이전</span>
                <span className={styles.adjTitle}>{prev.post.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next?.post.slug ? (
              <Link href={`/${weekSlug}/${next.post.slug}/`} className={styles.adjLink}>
                <span className={styles.adjLabel}>다음 →</span>
                <span className={styles.adjTitle}>{next.post.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </div>
    </main>
  );
}
