"use client";

import { useEffect, useCallback, useRef, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick, ABDemoCard } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";
import { SectionEyebrow } from "./bits";
import { useLocale } from "@/app/LocaleProvider";
import { ImageDisclosure } from "@/app/components/ImageDisclosure";
import { isSafeImageUrl, useOGData } from "@/app/[slug]/weekly/previews";

export function ThumbnailPreview({
  image,
  tone = "accent",
}: {
  image?: { src: string; alt: string; caption?: string };
  tone?: "accent" | "gold";
}) {
  const { locale } = useLocale();
  if (!image) return null;
  const color = tone === "gold" ? "var(--gold)" : "var(--accent)";
  return (
    <figure
      style={{
        marginTop: 16,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
        borderRadius: "var(--radius-xs)",
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
      <ImageDisclosure src={image.src} locale={locale} />
      {image.caption && (
        <figcaption
          style={{
            borderTop: `1px solid ${color}`,
            padding: "8px 10px",
            fontFamily: "var(--mono)",
            fontSize: 11,
            lineHeight: 1.5,
            color: "var(--muted)",
          }}
        >
          {stripMarkdown(image.caption)}
        </figcaption>
      )}
    </figure>
  );
}

export function EditorialImageFrame({
  image,
  label,
  tone = "accent",
  priority = false,
  sourceUrl = "",
  images = [],
}: {
  image?: { src: string; alt: string; caption?: string };
  label: string;
  tone?: "accent" | "gold";
  priority?: boolean;
  sourceUrl?: string;
  images?: { src: string; alt: string; caption?: string }[];
}) {
  const { locale } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(priority);
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const explicit = [image, ...images].find((candidate) =>
    candidate && isSafeImageUrl(candidate.src) && !failedSources.includes(candidate.src));
  const { data, loading } = useOGData(sourceUrl, visible && !explicit && /^https:\/\//i.test(sourceUrl));
  const ogSrc = data?.image;
  const src = explicit?.src || (isSafeImageUrl(ogSrc) && !failedSources.includes(ogSrc!) ? ogSrc : undefined);
  useEffect(() => {
    if (visible || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { rootMargin: "420px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);
  const color = tone === "gold" ? "var(--gold)" : "var(--accent)";
  const safeLabel = stripMarkdown(label);

  return (
    <div
      ref={ref}
      className="tc-source-thumb tc-source-thumb--card"
      style={{
        borderBottom: `1px solid ${color}`,
        background: `radial-gradient(circle at 24% 18%, ${color}33 0%, transparent 42%), linear-gradient(135deg, var(--surface-2), var(--card))`,
      }}
    >
      {src ? (
        <img
          src={src}
          ref={(element) => {
            // An SSR image can fail before hydration attaches onError.
            if (element?.complete && element.naturalWidth === 0) {
              setFailedSources((sources) => sources.includes(src) ? sources : [...sources, src]);
            }
          }}
          onError={() => setFailedSources((sources) => [...sources, src])}
          alt={stripMarkdown(explicit?.alt || data?.title || safeLabel)}
          loading={priority ? "eager" : "lazy"}
          width={720}
          height={450}
        />
      ) : (
        <div className="tc-source-fallback">
          <span className="mono" style={{ color, fontWeight: 800 }}>VOIDNEWS</span>
          <span className="mono">{loading
            ? (locale === "ko" ? "이미지를 불러오는 중" : "Loading image")
            : (locale === "ko" ? "출처 이미지 없음" : "No source image")}</span>
        </div>
      )}
      <ImageDisclosure src={src} locale={locale} overlay />
      {src && <span className="tc-source-domain mono">{explicit ? safeLabel
        : (locale === "ko" ? "출처 링크 미리보기 · OG 이미지" : "Source link preview · OG image")}</span>}
    </div>
  );
}

export function ImageGallery({
  images,
  tone = "gold",
}: {
  images?: { src: string; alt: string; caption?: string }[];
  tone?: "accent" | "gold";
}) {
  if (!images || images.length === 0) return null;
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ marginBottom: 12 }}>
        <SectionEyebrow label="Visual brief" tone={tone} />
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {images.map((image) => (
          <ThumbnailPreview key={image.src} image={image} tone={tone} />
        ))}
      </div>
    </div>
  );
}

export function getXStatusUrl(item: ABHighlight) {
  const links = [
    item.post.officialUrl,
    item.post.source,
    ...(item.post.backupUrls || []).map((link) => link.url),
  ].filter(Boolean) as string[];

  return links.find((url) => /https?:\/\/(x|twitter)\.com\/[^/]+\/status\//.test(url));
}

export function XPostEmbed({ url }: { url?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url || !ref.current) return;

    const loadEmbed = () => window.twttr?.widgets?.load(ref.current || undefined);
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );

    if (existingScript) {
      loadEmbed();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = loadEmbed;
    document.body.appendChild(script);
  }, [url]);

  if (!url) return null;

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      style={{
        marginTop: 18,
        padding: "12px 0",
        borderTop: "1px solid var(--border2)",
        borderBottom: "1px solid var(--border2)",
      }}
    >
      <blockquote className="twitter-tweet" data-dnt="true" data-theme="dark">
        <a href={url}>{url}</a>
      </blockquote>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   모달 컴포넌트
═══════════════════════════════════════════════════════════════ */
