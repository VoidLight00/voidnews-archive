import Link from "next/link";
import type { Post } from "@/lib/data";
import styles from "./editorial.module.css";

interface PostCardProps {
  post: Post;
  weekSlug: string;
  companyName: string;
  companyColor: string;
}

function formatDate(date: string): string {
  // 입력: "5/22" 또는 "2026-05-22"
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

export default function PostCard({ post, weekSlug, companyName, companyColor }: PostCardProps) {
  if (!post.slug) return null;
  const href = `/${weekSlug}/${post.slug}/`;
  const dateText = formatDate(post.date);
  const readText = post.readMinutes ? `${post.readMinutes} min read` : "1 min read";
  const pillLabel = companyName.toUpperCase();

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.cardLink} aria-label={post.title} />
      <Link href={href} className={styles.cover}>
        {post.thumbnail?.src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={post.thumbnail.src}
            alt={post.thumbnail.alt ?? post.title}
            className={styles.coverImage}
            loading="lazy"
          />
        ) : (
          <div className={styles.coverPlaceholder}>{companyName}</div>
        )}
        <span
          className={styles.pill}
          style={{ ["--pill-color" as string]: companyColor }}
        >
          {pillLabel}
        </span>
      </Link>
      <div className={styles.meta}>
        {dateText} · {readText}
      </div>
      <h2 className={styles.headline}>
        <Link href={href}>{post.title}</Link>
      </h2>
      {post.summary ? <p className={styles.dek}>{post.summary}</p> : null}
      <Link href={href} className={styles.cta}>
        Read more →
      </Link>
    </article>
  );
}
