"use client";

import { useEffect, useCallback, useRef, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick, ABDemoCard } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";
import { renderRichText } from "./richtext";
import { SectionEyebrow, TagList } from "./bits";
import { collectSourceLinks, SourceButton } from "./source";
import { ImageGallery, XPostEmbed, getXStatusUrl } from "./media";

export function HighlightDetail({ item }: { item: ABHighlight }) {
  const sourceLinks = collectSourceLinks(item.post);
  const xStatusUrl = getXStatusUrl(item);

  return (
    <div
      style={{
        marginTop: 18,
        paddingTop: 18,
        borderTop: "1px solid var(--border2)",
      }}
    >
      <SectionEyebrow label="Detail brief" tone="accent" />

      <p
        style={{
          marginTop: 16,
          maxWidth: "62ch",
          whiteSpace: "pre-wrap",
          fontSize: "var(--text-base)",
          lineHeight: 1.85,
          color: "var(--text)",
        }}
      >
        {renderRichText(item.post.content || item.post.summary || "")}
      </p>

      {item.post.videoSrc && (
        <video
          controls
          playsInline
          preload="metadata"
          poster={item.post.videoPoster}
          style={{
            marginTop: 18,
            width: "100%",
            maxHeight: 520,
            borderRadius: "var(--radius-xs)",
            border: "1px solid var(--border2)",
            background: "#000",
            display: "block",
          }}
        >
          <source src={item.post.videoSrc} type="video/mp4" />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>
      )}

      {item.post.videoClips && item.post.videoClips.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <div style={{ marginBottom: 10 }}>
            <SectionEyebrow label={`원본 X 개발자 데모 ${item.post.videoClips.length}편 · 영상마다 원본 트윗 링크`} tone="accent" />
          </div>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            }}
          >
            {item.post.videoClips.map((clip, ci) => (
              <figure key={ci} style={{ margin: 0 }}>
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={clip.poster}
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                    borderRadius: "var(--radius-xs)",
                    border: "1px solid var(--border2)",
                    background: "#000",
                    display: "block",
                  }}
                >
                  <source src={clip.src} type="video/mp4" />
                </video>
                <figcaption
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    lineHeight: 1.45,
                    color: "var(--text-soft)",
                  }}
                >
                  {clip.sourceUrl && (
                    <a
                      href={clip.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-block",
                        color: "var(--accent)",
                        fontWeight: 700,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      @{clip.sourceUrl.split("/").filter(Boolean).pop()} · 원본 X 트윗 →
                    </a>
                  )}
                  {clip.title && (
                    <span style={{ display: "block", marginTop: 2 }}>{stripMarkdown(clip.title)}</span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      <ImageGallery images={item.post.images} tone="accent" />
      <XPostEmbed url={xStatusUrl} />

      {item.editorial && (
        <aside
          style={{
            marginTop: 24,
            borderBottom: "2px solid var(--accent)",
            paddingLeft: 16,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <SectionEyebrow label="생각해볼 점" tone="accent" />
          </div>
          <p
            className="serif"
            style={{
              maxWidth: "60ch",
              fontSize: "var(--text-base)",
              fontStyle: "italic",
              lineHeight: 1.7,
              color: "var(--text-soft)",
            }}
          >
            {stripMarkdown(item.editorial)}
          </p>
        </aside>
      )}

      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: "1px solid var(--border)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
          <TagList tags={item.post.tags} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end" }}>
          {sourceLinks.map((link) => (
            <SourceButton key={link.url} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}
