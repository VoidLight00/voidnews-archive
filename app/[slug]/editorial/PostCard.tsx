"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/data";
import styles from "./editorial.module.css";

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

const OG_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const OG_FAIL_TTL_MS = 1000 * 60 * 60 * 24;

function useFallbackOg(url: string | undefined, enabled: boolean) {
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled || !url) return;
    let cancelled = false;
    const key = `voidnews-edit-og:v1:${url}`;
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as { image: string | null; expiresAt: number };
        if (parsed.expiresAt > Date.now()) {
          setImage(parsed.image);
          return;
        }
      }
    } catch {}
    fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const img =
          d.status === "success"
            ? d.data?.screenshot?.url || d.data?.image?.url || null
            : null;
        const safe = typeof img === "string" && img.startsWith("https://") ? img : null;
        setImage(safe);
        try {
          window.localStorage.setItem(
            key,
            JSON.stringify({
              image: safe,
              expiresAt: Date.now() + (safe ? OG_TTL_MS : OG_FAIL_TTL_MS),
            })
          );
        } catch {}
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [url, enabled]);
  return image;
}

export default function PostCard({ post, weekSlug, companyName, companyColor }: PostCardProps) {
  if (!post.slug) return null;
  const href = `/${weekSlug}/${post.slug}/`;
  const dateText = formatDateKo(post.date);
  const readText = post.readMinutes ? `${post.readMinutes}분 읽기` : "1분 읽기";
  const pillLabel = companyName.toUpperCase();
  const staticImg = post.thumbnail?.src || post.images?.[0]?.src || null;
  const fallback = useFallbackOg(post.officialUrl || post.source, !staticImg);
  const coverSrc = staticImg ?? fallback;

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.cardLink} aria-label={post.title} />
      <Link href={href} className={styles.cover}>
        {coverSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={coverSrc}
            alt={post.thumbnail?.alt ?? post.title}
            className={styles.coverImage}
            loading="lazy"
          />
        ) : (
          <div className={styles.coverPlaceholder}>
            <span className={styles.coverPlaceholderTag}>{companyName}</span>
            <span className={styles.coverPlaceholderHint}>이미지 준비 중</span>
          </div>
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
        자세히 보기 <span aria-hidden>→</span>
      </Link>
    </article>
  );
}
