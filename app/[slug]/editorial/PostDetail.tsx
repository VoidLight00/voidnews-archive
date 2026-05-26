"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/data";
import { type ArticleCacheEntry } from "@/lib/article-cache";
import { extractGlossaryHits, type GlossaryEntry } from "@/lib/glossary";
import { useLocale } from "@/app/LocaleProvider";
import { isKoreanText } from "@/lib/i18n";
import styles from "./editorial.module.css";

interface PostDetailProps {
  meta: {
    post: Post;
    companyName: string;
    companyColor: string;
    weekSlug: string;
    weekPeriod: string;
    threeLineSummary?: string[];
  };
  prev: { post: Post; companyName: string; companyColor: string } | null;
  next: { post: Post; companyName: string; companyColor: string } | null;
  weekSlug: string;
  article: ArticleCacheEntry | null;
  related: { post: Post; companyName: string; companyColor: string }[];
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

function formatDateEn(date: string): string {
  const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [y, mo, d] = date.split("-");
    return `${parseInt(d, 10)} ${m[parseInt(mo, 10) - 1]} ${y}`;
  }
  const [mo, d] = date.split("/");
  if (mo && d) return `${parseInt(d, 10)} ${m[parseInt(mo, 10) - 1]} 2026`;
  return date;
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function inferReleaseScope(post: Post): string {
  const text = [...(post.tags || []), post.source || "", post.officialUrl || ""].join(" ").toLowerCase();
  if (/preview|research|beta|early/.test(text)) return "Preview / Beta";
  if (/api|developer|docs|github/.test(text)) return "API / Developer";
  if (/enterprise|kpmg|dell|aws|bedrock/.test(text)) return "Enterprise";
  if (/mobile|android|ios|app/.test(text)) return "Web / Mobile";
  return "공개 발표";
}

function renderMarkdown(content: string) {
  const blocks = content.split(/\n\n+/);
  return blocks.map((block, idx) => {
    const t = block.trim();
    if (!t) return null;
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
    if (/^##\s+/.test(t)) return <h2 key={idx}>{t.replace(/^##\s+/, "")}</h2>;
    if (/^\*\*[^*]+\*\*$/.test(t)) return <h2 key={idx}>{t.replace(/^\*\*|\*\*$/g, "")}</h2>;
    // **bold** 토큰을 React node 로 안전하게 분할 (dangerouslySetInnerHTML XSS 위험 제거)
    const parts = t.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    return (
      <p key={idx}>
        {parts.map((part, pi) => {
          const m = part.match(/^\*\*([^*]+)\*\*$/);
          return m ? <strong key={pi}>{m[1]}</strong> : <span key={pi}>{part}</span>;
        })}
      </p>
    );
  });
}

function categoryLabel(c: GlossaryEntry["category"], locale: "ko" | "en"): string {
  const koMap = { model: "모델", agent: "에이전트", infra: "인프라", interface: "인터페이스", security: "보안", process: "운영", ml: "머신러닝", web: "웹", developer: "개발" } as const;
  const enMap = { model: "Model", agent: "Agent", infra: "Infra", interface: "Interface", security: "Security", process: "Process", ml: "ML", web: "Web", developer: "Dev" } as const;
  return locale === "ko" ? koMap[c] : enMap[c];
}

export default function PostDetail({ meta, prev, next, weekSlug, article, related }: PostDetailProps) {
  const { post, companyName, companyColor, weekPeriod, threeLineSummary } = meta;
  const { locale, t } = useLocale();
  const [activeLang, setActiveLang] = useState<"ko" | "en">(locale);

  // 자동 분류: 한국어 본문 / 영문 본문
  const koContent = isKoreanText(post.content) ? post.content : null;
  const koSummary = isKoreanText(post.summary) ? post.summary : null;
  const enContent = !isKoreanText(post.content) ? post.content : null;
  const enSummary = !isKoreanText(post.summary) ? post.summary : null;

  const paragraphs = article?.paragraphs ?? [];
  const officialDescription = article?.description ?? null;
  const officialTitle = article?.title ?? null;
  const headings = article?.headings ?? [];
  const quotes = article?.quotes ?? [];

  const officialHost = post.officialUrl ? hostnameOf(post.officialUrl) : null;

  const fullText = [
    post.title, post.summary ?? "", post.content ?? "",
    officialDescription ?? "", paragraphs.join(" "),
    quotes.join(" "), (headings ?? []).map((h) => h.text).join(" "),
    (post.tags ?? []).join(" "),
  ].join("\n");
  const glossaryHits = extractGlossaryHits(fullText);

  const dateStr = activeLang === "ko" ? formatDateKo(post.date) : formatDateEn(post.date);
  const readStr = post.readMinutes
    ? activeLang === "ko" ? `${post.readMinutes}분 읽기` : `${post.readMinutes} min read`
    : null;

  // 한국어 탭 내용 (summary는 header에서 dek로 표시되므로 본문은 content만)
  const koBody = (
    <>
      {koContent ? <div className={styles.articleBody}>{renderMarkdown(koContent)}</div> : null}
      {!koSummary && !koContent ? (
        <p className={styles.langFallback}>{t("detail.lang.koUnavailable")}</p>
      ) : null}
    </>
  );

  // 영문 탭 내용 — 사용자 작성 영문 content 우선, 없으면 article-cache의 paragraphs
  const enBody = (
    <>
      {enContent ? <div className={styles.articleBody}>{renderMarkdown(enContent)}</div> : null}
      {!enContent && (officialDescription || paragraphs.length > 0) ? (
        <section className={styles.officialExcerpt}>
          <div className={styles.officialExcerptHead}>
            <span className={styles.officialExcerptLabel}>{t("detail.officialExcerpt")}</span>
            {officialHost ? <span className={styles.officialExcerptHost}>{officialHost}</span> : null}
          </div>
          {officialDescription ? <p className={styles.officialDescription}>{officialDescription}</p> : null}
          {paragraphs.slice(0, 6).map((p, i) => (
            <p key={i} className={styles.officialParagraph}>{p}</p>
          ))}
          {quotes.slice(0, 2).map((q, i) => (
            <blockquote key={i} className={styles.officialQuote}>{q}</blockquote>
          ))}
          {headings.length > 0 ? (
            <div className={styles.officialOutline}>
              <strong>{t("detail.officialOutline")}</strong>
              <ul>
                {headings.map((h, i) => <li key={i} data-level={h.level}>{h.text}</li>)}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}
      {!enSummary && !enContent && !officialDescription && paragraphs.length === 0 ? (
        <p className={styles.langFallback}>{t("detail.lang.enUnavailable")}</p>
      ) : null}
    </>
  );

  return (
    <main className={styles.shell}>
      <div className={styles.containerArticle}>
        <article className={styles.article}>
          <Link href={`/${weekSlug}/`} className={styles.backLink}>
            ← {weekSlug} ({weekPeriod})
          </Link>

          <div className={styles.articleKicker}>
            <span
              className={styles.pill}
              style={{ position: "static", ["--pill-color" as string]: companyColor }}
            >
              {companyName.toUpperCase()}
            </span>
          </div>

          <h1 className={styles.articleTitle}>{post.title}</h1>

          {(activeLang === "ko" ? koSummary : enSummary) ? (
            <p className={styles.articleDek}>
              {activeLang === "ko" ? koSummary : enSummary}
            </p>
          ) : null}

          <div className={styles.articleMeta}>
            <span className={styles.articleMetaByline}>VoidLight</span>
            <span className={styles.articleMetaSep} aria-hidden>·</span>
            <span>{dateStr}</span>
            {readStr ? (
              <>
                <span className={styles.articleMetaSep} aria-hidden>·</span>
                <span>{readStr}</span>
              </>
            ) : null}
          </div>

          {post.videoUrl ? (
            <figure className={styles.articleHero}>
              <div className={styles.videoFrame}>
                <iframe
                  src={post.videoUrl}
                  title={post.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <figcaption>
                {activeLang === "ko" ? "공식 영상" : "Official video"}
              </figcaption>
            </figure>
          ) : post.thumbnail?.src ? (
            <figure className={styles.articleHero}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.thumbnail.src} alt={post.thumbnail.alt ?? post.title} />
              {officialHost ? (
                <figcaption>{activeLang === "ko" ? `출처 · ${officialHost}` : `Source · ${officialHost}`}</figcaption>
              ) : null}
            </figure>
          ) : null}

          {threeLineSummary && threeLineSummary.length > 0 ? (
            <section className={styles.quickSummary} aria-label={activeLang === "ko" ? "3줄 요약" : "Three-line summary"}>
              <span className={styles.quickSummaryLabel}>{activeLang === "ko" ? "3줄 요약" : "Three-line summary"}</span>
              <ol>
                {threeLineSummary.map((line, index) => (
                  <li key={`${index}-${line}`}>{line}</li>
                ))}
              </ol>
            </section>
          ) : null}

          {weekSlug.startsWith("ab/") ? (
            <dl className={styles.sourceAudit} aria-label="검증 메타">
              <div><dt>상태</dt><dd>{post.officialUrl ? "공식 발표" : "보조 검증"}</dd></div>
              <div><dt>범위</dt><dd>{inferReleaseScope(post)}</dd></div>
              <div><dt>출처</dt><dd>{officialHost ? `공식 · ${officialHost}` : "출처 대기"}</dd></div>
              <div><dt>확인</dt><dd>확인일 2026-05-27</dd></div>
            </dl>
          ) : null}

          {/* Bilingual language tabs */}
          <div className={styles.langTabs} role="tablist" aria-label="Language">
            <button
              type="button"
              role="tab"
              aria-selected={activeLang === "ko"}
              onClick={() => setActiveLang("ko")}
              className={`${styles.langTab} ${activeLang === "ko" ? styles.langTabActive : ""}`}
            >
              {t("detail.lang.ko")}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeLang === "en"}
              onClick={() => setActiveLang("en")}
              className={`${styles.langTab} ${activeLang === "en" ? styles.langTabActive : ""}`}
            >
              {t("detail.lang.en")}
            </button>
          </div>

          {/* 본문 (탭 선택 언어) */}
          {activeLang === "ko" ? koBody : enBody}

          {/* Gallery — 본문 중간 inline 이미지 */}
          {post.galleryImages && post.galleryImages.length > 0 ? (
            <section className={styles.gallery}>
              {post.galleryImages.map((g, i) => (
                <figure key={i} className={styles.galleryItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.alt} loading="lazy" />
                  {g.caption ? <figcaption>{g.caption}</figcaption> : null}
                </figure>
              ))}
            </section>
          ) : null}

          {/* Threads embed (큐레이터 글 / 영상 재생) */}
          {post.threadsEmbedUrl ? (
            <section className={styles.threadsBlock}>
              <h3 className={styles.threadsTitle}>
                {activeLang === "ko" ? "큐레이터 스레드" : "Curator's Thread"}
              </h3>
              <div className={styles.threadsFrame}>
                <iframe
                  src={post.threadsEmbedUrl}
                  title="Threads post"
                  loading="lazy"
                  allowTransparency
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </section>
          ) : null}

          {/* 공식 출처 reference 카드 */}
          {(post.officialUrl || (post.backupUrls && post.backupUrls.length > 0)) ? (
            <section className={styles.referenceBlock}>
              <h3 className={styles.referenceTitle}>{t("detail.references")}</h3>
              {post.officialUrl ? (
                <a href={post.officialUrl} target="_blank" rel="noreferrer" className={styles.referenceMain}>
                  <span className={styles.referenceMainLabel}>{t("detail.referenceMain")}</span>
                  <span className={styles.referenceMainTitle}>{officialTitle || post.title}</span>
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

          {/* 관련 글 (같은 회사 다른 글) */}
          {related.length > 0 ? (
            <section className={styles.related}>
              <h3 className={styles.relatedTitle}>{t("detail.related")}</h3>
              <div className={styles.relatedGrid}>
                {related.map((r) =>
                  r.post.slug ? (
                    <Link key={r.post.slug} href={`/${weekSlug}/${r.post.slug}/`} className={styles.relatedCard}>
                      <span className={styles.relatedCardMeta}>
                        <span className={styles.relatedCardDot} style={{ background: r.companyColor }} />
                        {r.companyName}
                      </span>
                      <span className={styles.relatedCardTitle}>{r.post.title}</span>
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          ) : null}

          {/* prev/next */}
          <nav className={styles.adjacentNav}>
            {prev?.post.slug ? (
              <Link href={`/${weekSlug}/${prev.post.slug}/`} className={styles.adjLink}>
                <span className={styles.adjLabel}>← {t("detail.prev")}</span>
                <span className={styles.adjTitle}>{prev.post.title}</span>
              </Link>
            ) : <span />}
            {next?.post.slug ? (
              <Link href={`/${weekSlug}/${next.post.slug}/`} className={styles.adjLink}>
                <span className={styles.adjLabel}>{t("detail.next")} →</span>
                <span className={styles.adjTitle}>{next.post.title}</span>
              </Link>
            ) : <span />}
          </nav>

          {/* (맨 아래) 전문 용어 사전 */}
          {glossaryHits.length > 0 ? (
            <section className={styles.glossary}>
              <header className={styles.glossaryHead}>
                <h3 className={styles.glossaryTitle}>{t("detail.glossary")}</h3>
                <span className={styles.glossarySub}>{t("detail.glossarySub")} · {glossaryHits.length}</span>
              </header>
              <dl className={styles.glossaryList}>
                {glossaryHits.map((g) => (
                  <div key={g.term} className={styles.glossaryItem}>
                    <dt>
                      <span className={styles.glossaryTerm}>{g.term}</span>
                      <span className={styles.glossaryKo}>{activeLang === "ko" ? g.ko : g.term}</span>
                      <span className={styles.glossaryCategory}>{categoryLabel(g.category, activeLang)}</span>
                    </dt>
                    <dd>{g.description}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
        </article>
      </div>
    </main>
  );
}
