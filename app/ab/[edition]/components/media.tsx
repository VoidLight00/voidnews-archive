"use client";

import { useEffect, useCallback, useRef, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick, ABDemoCard } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";
import { SectionEyebrow } from "./bits";

export function ThumbnailPreview({
  image,
  tone = "accent",
}: {
  image?: { src: string; alt: string; caption?: string };
  tone?: "accent" | "gold";
}) {
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
}: {
  image?: { src: string; alt: string; caption?: string };
  label: string;
  tone?: "accent" | "gold";
  priority?: boolean;
}) {
  const color = tone === "gold" ? "var(--gold)" : "var(--accent)";
  const safeLabel = stripMarkdown(label);

  return (
    <div
      className="tc-source-thumb tc-source-thumb--card"
      style={{
        borderBottom: `1px solid ${color}`,
        background: `radial-gradient(circle at 24% 18%, ${color}33 0%, transparent 42%), linear-gradient(135deg, var(--surface-2), var(--card))`,
      }}
    >
      {image ? (
        <img
          src={image.src}
          alt={stripMarkdown(image.alt || safeLabel)}
          loading={priority ? "eager" : "lazy"}
          width={720}
          height={450}
        />
      ) : (
        <div className="tc-source-fallback">
          <span className="mono" style={{ color, fontWeight: 800 }}>VOIDNEWS</span>
          <span className="mono">{safeLabel}</span>
        </div>
      )}
      {image && <span className="tc-source-domain mono">{safeLabel}</span>}
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
