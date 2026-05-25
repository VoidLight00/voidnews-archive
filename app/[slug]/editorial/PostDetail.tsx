import Link from "next/link";
import type { Post } from "@/lib/data";
import { getArticleCache } from "@/lib/article-cache";
import { extractGlossaryHits, type GlossaryEntry } from "@/lib/glossary";
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

function formatDateKo(date: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [, m, d] = date.split("-");
    return `${parseInt(m, 10)}월 ${parseInt(d, 10)}일`;
  }
  const [m, d] = date.split("/");
  if (m && d) return `${parseInt(m, 10)}월 ${parseInt(d, 10)}일`;
  return date;
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function renderMarkdown(content: string) {
  // 단순 마크다운: 빈 줄로 단락, **bold**, ## heading, | table |
  const blocks = content.split(/\n\n+/);
  return blocks.map((block, idx) => {
    const t = block.trim();
    if (!t) return null;
    // table
    if (/^\|.*\|/.test(t)) {
      const lines = t.split("\n").filter((l) => l.trim().startsWith("|"));
      if (lines.length >= 2) {
        const headerCells = lines[0].split("|").slice(1, -1).map((c) => c.trim());
        const bodyRows = lines.slice(2).map((row) => row.split("|").slice(1, -1).map((c) => c.trim()));
        return (
          <table key={idx} className={styles.articleTable}>
            <thead>
              <tr>{headerCells.map((c, i) => <th key={i}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri}>{row.map((c, ci) => <td key={ci}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        );
      }
    }
    // heading
    if (/^##\s+/.test(t)) {
      return <h2 key={idx}>{t.replace(/^##\s+/, "")}</h2>;
    }
    if (/^\*\*[^*]+\*\*$/.test(t)) {
      return <h2 key={idx}>{t.replace(/^\*\*|\*\*$/g, "")}</h2>;
    }
    // bold inline
    const html = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return <p key={idx} dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

function categoryLabel(c: GlossaryEntry["category"]): string {
  return ({
    model: "모델",
    agent: "에이전트",
    infra: "인프라",
    interface: "인터페이스",
    security: "보안",
    process: "운영",
    ml: "머신러닝",
    web: "웹",
    developer: "개발",
  } as const)[c];
}

export default function PostDetail({ meta, prev, next, weekSlug }: PostDetailProps) {
  const { post, companyName, companyColor, weekPeriod } = meta;
  const article = post.slug ? getArticleCache(post.slug) : null;
  const hasContent = !!post.content;
  const paragraphs = article?.paragraphs ?? [];
  const officialDescription = article?.description ?? null;
  const officialTitle = article?.title ?? null;
  const headings = article?.headings ?? [];
  const quotes = article?.quotes ?? [];

  // 용어 사전: post content + article paragraphs 합쳐서 매칭
  const fullText = [
    post.title,
    post.summary ?? "",
    post.content ?? "",
    officialDescription ?? "",
    paragraphs.join(" "),
    quotes.join(" "),
    (headings ?? []).map((h) => h.text).join(" "),
    (post.tags ?? []).join(" "),
  ].join("\n");
  const glossaryHits = extractGlossaryHits(fullText);

  const officialHost = post.officialUrl ? hostnameOf(post.officialUrl) : null;

  return (
    <main className={styles.shell}>
      <div className={styles.containerArticle}>
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
            <span>{formatDateKo(post.date)}</span>
            {post.readMinutes ? <span>· {post.readMinutes}분 읽기</span> : null}
          </div>

          <h1 className={styles.articleTitle}>{post.title}</h1>

          {post.summary ? (
            <p className={styles.articleLede}>{post.summary}</p>
          ) : null}

          {post.thumbnail?.src ? (
            <figure className={styles.articleHero}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.thumbnail.src} alt={post.thumbnail.alt ?? post.title} />
              {officialHost ? (
                <figcaption>출처 · {officialHost}</figcaption>
              ) : null}
            </figure>
          ) : null}

          {/* (1) 사용자가 직접 작성한 풍부한 content (Grok Build 등) */}
          {hasContent ? (
            <div className={styles.articleBody}>{renderMarkdown(post.content!)}</div>
          ) : null}

          {/* (2) 공식 본문 발췌 — 영문 그대로 인용 (환각 0) */}
          {!hasContent && (officialDescription || paragraphs.length > 0) ? (
            <section className={styles.officialExcerpt}>
              <div className={styles.officialExcerptHead}>
                <span className={styles.officialExcerptLabel}>공식 본문 발췌</span>
                {officialHost ? (
                  <span className={styles.officialExcerptHost}>{officialHost}</span>
                ) : null}
              </div>
              {officialDescription ? (
                <p className={styles.officialDescription}>{officialDescription}</p>
              ) : null}
              {paragraphs.slice(0, 5).map((p, i) => (
                <p key={i} className={styles.officialParagraph}>{p}</p>
              ))}
              {quotes.length > 0 ? (
                <blockquote className={styles.officialQuote}>{quotes[0]}</blockquote>
              ) : null}
              {headings.length > 0 ? (
                <details className={styles.officialOutline}>
                  <summary>본문 헤딩 / 섹션 보기</summary>
                  <ul>
                    {headings.map((h, i) => (
                      <li key={i} data-level={h.level}>{h.text}</li>
                    ))}
                  </ul>
                </details>
              ) : null}
              <p className={styles.officialNote}>
                ※ 이 발췌는 공식 페이지 영문 본문을 그대로 인용한 것입니다.
                요약·번역으로 인한 왜곡을 방지하기 위해 원문을 유지합니다.
                정확한 한국어 풀이는 아래 <strong>전문 용어 사전</strong>을 참고하세요.
              </p>
            </section>
          ) : null}

          {/* (3) 전문 용어 사전 — 본문에서 등장한 용어만 자동 매칭 */}
          {glossaryHits.length > 0 ? (
            <section className={styles.glossary}>
              <header className={styles.glossaryHead}>
                <h3 className={styles.glossaryTitle}>전문 용어 사전</h3>
                <span className={styles.glossarySub}>
                  본문에 등장한 {glossaryHits.length}개 용어 · 비개발자 친화 한국어 풀이
                </span>
              </header>
              <dl className={styles.glossaryList}>
                {glossaryHits.map((g) => (
                  <div key={g.term} className={styles.glossaryItem}>
                    <dt>
                      <span className={styles.glossaryTerm}>{g.term}</span>
                      <span className={styles.glossaryKo}>{g.ko}</span>
                      <span className={styles.glossaryCategory}>{categoryLabel(g.category)}</span>
                    </dt>
                    <dd>{g.description}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {/* (4) 공식 출처 reference 카드 */}
          {(post.officialUrl || (post.backupUrls && post.backupUrls.length > 0)) ? (
            <section className={styles.referenceBlock}>
              <h3 className={styles.referenceTitle}>공식 출처</h3>
              {post.officialUrl ? (
                <a
                  href={post.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.referenceMain}
                >
                  <span className={styles.referenceMainLabel}>공식 원문 보기</span>
                  <span className={styles.referenceMainTitle}>
                    {officialTitle || post.title}
                  </span>
                  <span className={styles.referenceMainHost}>{officialHost ?? ""} →</span>
                </a>
              ) : null}
              {post.backupUrls && post.backupUrls.length > 0 ? (
                <ul className={styles.referenceBackups}>
                  {post.backupUrls.map((b, i) => (
                    <li key={i}>
                      <a href={b.url} target="_blank" rel="noreferrer">
                        <span className={styles.referenceBackupLabel}>{b.label}</span>
                        <span className={styles.referenceBackupHost}>{hostnameOf(b.url)} →</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ) : null}

          {/* (5) prev/next nav */}
          <nav className={styles.adjacentNav}>
            {prev?.post.slug ? (
              <Link href={`/${weekSlug}/${prev.post.slug}/`} className={styles.adjLink}>
                <span className={styles.adjLabel}>← 이전</span>
                <span className={styles.adjTitle}>{prev.post.title}</span>
              </Link>
            ) : <span />}
            {next?.post.slug ? (
              <Link href={`/${weekSlug}/${next.post.slug}/`} className={styles.adjLink}>
                <span className={styles.adjLabel}>다음 →</span>
                <span className={styles.adjTitle}>{next.post.title}</span>
              </Link>
            ) : <span />}
          </nav>
        </article>
      </div>
    </main>
  );
}
