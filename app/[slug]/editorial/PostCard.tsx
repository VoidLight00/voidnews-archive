"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/data";
import styles from "./editorial.module.css";
import { isSafeImageUrl } from "../weekly/previews";

interface PostCardProps {
  post: Post;
  weekSlug: string;
  companyName: string;
  companyColor: string;
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

export default function PostCard({ post, weekSlug, companyName, companyColor }: PostCardProps) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const cover = [post.thumbnail, ...(post.images || [])].find(image => image?.src && isSafeImageUrl(image.src) && !failedSources.includes(image.src));
  const coverSrc = cover?.src;
  useEffect(() => {
    const image = imageRef.current;
    if (coverSrc && image?.complete && image.naturalWidth === 0) {
      setFailedSources(sources => sources.includes(coverSrc) ? sources : [...sources, coverSrc]);
    }
  }, [coverSrc]);
  if (!post.slug) return null;
  const href = `/${weekSlug}/${post.slug}/`;
  const dateText = formatDateKo(post.date);
  const readText = post.readMinutes ? `${post.readMinutes}분 읽기` : "1분 읽기";
  const pillLabel = companyName.toUpperCase();

  return (
    <article className={styles.card} data-weekly-card>
      <Link href={href} className={styles.cardLink} aria-label={post.title} />
      <Link href={href} className={styles.cover} data-weekly-source-thumbnail>
        {coverSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            ref={imageRef}
            src={coverSrc}
            alt={cover?.alt ?? post.title}
            className={styles.coverImage}
            loading="lazy"
            onError={() => setFailedSources(sources => [...sources, coverSrc])}
          />
        ) : (
          <div className={styles.coverPlaceholder} data-weekly-image-fallback>
            <span className={styles.coverPlaceholderTag}>{companyName}</span>
            <span className={styles.coverPlaceholderHint}>이미지 미리보기를 제공하지 못했습니다</span>
          </div>
        )}
        <span
          className={styles.pill}
          style={{ ["--pill-color" as string]: companyColor }}
        >
          {pillLabel}
        </span>
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.meta}>
          {dateText} · {readText}
        </div>
        <h2 className={styles.headline}>
          <Link href={href}>{post.title}</Link>
        </h2>
        {post.summary ? <p className={styles.dek}>{post.summary}</p> : null}
        <Link href={href} className={styles.cta}>
          자세히 보기 <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
