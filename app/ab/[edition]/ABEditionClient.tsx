"use client";

import { useEffect, useCallback, useRef, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick, ABDemoCard } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";

/* ────────── URL 자동 링크화 ──────────
   stripMarkdown 후 평문 안에 남아있는 http(s) URL을
   클릭 가능한 <a>로 변환. 카드 외부에서 상위 onClick으로
   모달이 열리는 걸 막기 위해 stopPropagation. */
declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

const URL_MATCH_REGEX = /^https?:\/\/[^\s)\]]+$/;

function renderRichText(text: string): ReactNode {
  if (!text) return null;
  // 마크다운 헤딩(## ~ ######) 라인을 굵은 소제목으로 변환 — 원시 마크다운 노출(VN-RENDER-LEAK) 방지
  text = text.replace(/^#{1,6}[ \t]+(.+)$/gm, "**$1**");
  const parts = text.split(/(\*\*[^*\n]+?\*\*|https?:\/\/[^\s)\]]+)/g);

  return parts.map((part, i) => {
    if (!part) return null;
    if (URL_MATCH_REGEX.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            color: "var(--accent)",
            textDecoration: "underline",
            wordBreak: "break-all",
          }}
        >
          {part}
        </a>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "var(--text)", fontWeight: 800 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

type SourceLink = { label: string; url: string; primary?: boolean };

type SourceAuditInput = {
  officialUrl?: string;
  source?: string;
  backupUrls?: { label: string; url: string }[];
  tags?: string[];
  date?: string;
};

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function inferReleaseScope(input: SourceAuditInput): string {
  const text = [...(input.tags || []), input.source || "", input.officialUrl || ""].join(" ").toLowerCase();
  if (/preview|research|beta|early/.test(text)) return "Preview / Beta";
  if (/api|developer|docs|github/.test(text)) return "API / 개발자";
  if (/enterprise|kpmg|dell|aws|bedrock/.test(text)) return "엔터프라이즈";
  if (/mobile|android|ios|app/.test(text)) return "웹 / 모바일";
  return "공개 발표";
}

function buildSourceAudit(input: SourceAuditInput) {
  const primaryUrl = input.officialUrl || input.source || input.backupUrls?.[0]?.url;
  const host = primaryUrl ? hostnameOf(primaryUrl) : "출처 대기";
  return {
    status: input.officialUrl ? "공식 발표" : "보조 검증",
    scope: inferReleaseScope(input),
    source: input.officialUrl ? `공식 · ${host}` : `확인 · ${host}`,
    checked: "확인일 2026-05-26",
  };
}

function SourceAuditStrip({ input, tone = "accent" }: { input: SourceAuditInput; tone?: "accent" | "gold" }) {
  const audit = buildSourceAudit(input);
  return (
    <dl className={`ab-source-audit ab-source-audit--${tone}`} aria-label="검증 메타">
      <div><dt>상태</dt><dd>{audit.status}</dd></div>
      <div><dt>범위</dt><dd>{audit.scope}</dd></div>
      <div><dt>출처</dt><dd>{audit.source}</dd></div>
      <div><dt>확인</dt><dd>{audit.checked}</dd></div>
    </dl>
  );
}

function collectSourceLinks({
  officialUrl,
  source,
  backupUrls,
}: {
  officialUrl?: string;
  source?: string;
  backupUrls?: { label: string; url: string }[];
}): SourceLink[] {
  const links: SourceLink[] = [];
  const seen = new Set<string>();
  const add = (link: SourceLink) => {
    if (!link.url || seen.has(link.url)) return;
    seen.add(link.url);
    links.push(link);
  };

  const officialLabel = backupUrls?.find((link) => link.url === officialUrl)?.label || "공식 링크";
  if (officialUrl) add({ label: officialLabel, url: officialUrl, primary: true });
  if (source) add({ label: "출처", url: source });
  for (const link of backupUrls || []) add(link);

  return links;
}

function SourceButton({ link }: { link: SourceLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "var(--mono)",
        fontSize: 12,
        minHeight: 44,
        display: "inline-flex",
        alignItems: "center",
        color: link.primary ? "var(--ink)" : "var(--accent)",
        background: link.primary ? "var(--accent)" : "transparent",
        border: link.primary ? "1px solid var(--accent)" : "1px solid var(--border2)",
        padding: "0 16px",
        borderRadius: "var(--radius-xs)",
        textDecoration: "none",
        fontWeight: 700,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        transition: "border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
      }}
    >
      {link.label} →
    </a>
  );
}

/* 에디토리얼 섹션 라벨 — mono eyebrow, 장식 글리프 없이 hairline 룰로 구획 */
function SectionEyebrow({
  label,
  tone = "accent",
}: {
  label: string;
  tone?: "accent" | "gold" | "muted";
}) {
  const color = tone === "gold" ? "var(--gold)" : tone === "muted" ? "var(--muted)" : "var(--accent)";
  return (
    <div
      className="mono"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color,
      }}
    >
      <span>{label}</span>
      <span aria-hidden style={{ flex: 1, borderTop: "1px solid var(--rule)" }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   유틸 컴포넌트
═══════════════════════════════════════════════════════════════ */

function RankBadge({ rank, tier }: { rank: number; tier: string }) {
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

function ThumbnailPreview({
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

function EditorialImageFrame({
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

function ImageGallery({
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

function getXStatusUrl(item: ABHighlight) {
  const links = [
    item.post.officialUrl,
    item.post.source,
    ...(item.post.backupUrls || []).map((link) => link.url),
  ].filter(Boolean) as string[];

  return links.find((url) => /https?:\/\/(x|twitter)\.com\/[^/]+\/status\//.test(url));
}

function XPostEmbed({ url }: { url?: string }) {
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

type ModalContent = { kind: "pick"; item: ABEditorPick };

function HighlightDetail({ item }: { item: ABHighlight }) {
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
            <SectionEyebrow label={`데모 영상 ${item.post.videoClips.length}편 · 카드에서 바로 재생`} tone="accent" />
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
                {clip.title && (
                  <figcaption
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "var(--text-soft)",
                    }}
                  >
                    {stripMarkdown(clip.title)}
                    {clip.sourceUrl && (
                      <>
                        {" "}
                        <a
                          href={clip.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ color: "var(--accent)", textDecoration: "none", whiteSpace: "nowrap" }}
                        >
                          원본 →
                        </a>
                      </>
                    )}
                  </figcaption>
                )}
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
            borderLeft: "2px solid var(--accent)",
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

function PickModal({
  item,
  onClose,
}: {
  item: ABEditorPick;
  onClose: () => void;
}) {
  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <div
        className="mono"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            background: "var(--gold)",
            color: "var(--ink)",
            padding: "3px 9px",
            borderRadius: "var(--radius-xs)",
            fontWeight: 800,
            letterSpacing: "0.16em",
          }}
        >
          Pick
        </span>
        <span style={{ color: "var(--muted)" }}>{item.category}</span>
      </div>

      <h2
        className="serif"
        style={{
          marginTop: 18,
          maxWidth: "20ch",
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 700,
          letterSpacing: "-0.035em",
          lineHeight: 1.06,
          color: "var(--text-strong)",
        }}
      >
        {stripMarkdown(item.title)}
      </h2>
      {item.subtitle && (
        <p
          className="serif"
          style={{
            marginTop: 8,
            fontSize: "var(--text-lg)",
            fontStyle: "italic",
            lineHeight: 1.45,
            color: "var(--muted)",
          }}
        >
          {stripMarkdown(item.subtitle)}
        </p>
      )}

      <p
        style={{
          marginTop: 22,
          maxWidth: "62ch",
          borderLeft: "2px solid var(--gold)",
          paddingLeft: 16,
          fontSize: "var(--text-md)",
          color: "var(--text)",
          lineHeight: 1.6,
        }}
      >
        {stripMarkdown(item.summary)}
      </p>

      <p
        style={{
          marginTop: 20,
          maxWidth: "62ch",
          whiteSpace: "pre-wrap",
          fontSize: "var(--text-base)",
          lineHeight: 1.85,
          color: "var(--text)",
        }}
      >
        {renderRichText(item.body)}
      </p>

      <ImageGallery images={item.images} tone="gold" />

      {item.editorial && (
        <aside
          style={{
            marginTop: 24,
            borderLeft: "2px solid var(--gold)",
            paddingLeft: 16,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <SectionEyebrow label="생각해볼 점" tone="gold" />
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
          <TagList tags={item.tags} />
        </div>
        {item.guideUrl && (
          <a
            href={item.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              minHeight: 44,
              display: "inline-flex",
              alignItems: "center",
              background: "transparent",
              color: "var(--gold)",
              border: "1px solid var(--gold)",
              padding: "0 16px",
              borderRadius: "var(--radius-xs)",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {item.guideLabel || "설치 가이드 →"}
          </a>
        )}
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
            background: "var(--gold)",
            color: "var(--ink)",
            padding: "0 18px",
            borderRadius: "var(--radius-xs)",
            textDecoration: "none",
            fontWeight: 800,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          {item.sourceLabel || "시작하기 →"}
        </a>
      </div>
    </div>
  );
}

function Modal({
  content,
  onClose,
}: {
  content: ModalContent;
  onClose: () => void;
}) {
  // Esc 키 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    // 모달 열려있을 때 body 스크롤 잠금
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    /* 오버레이 */
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "var(--overlay-bg)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        // 모바일: 바텀시트처럼 bottom에서 올라옴
        // 데스크톱: 중앙 모달
        padding: 0,
      }}
    >
      {/* 모달 패널 */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "var(--bg)",
          border: "1px solid var(--border2)",
          borderTop: "3px solid var(--gold)",
          borderRadius: "var(--radius-xs) var(--radius-xs) 0 0",
          boxShadow: "0 -1px 0 var(--border)",
          width: "100%",
          maxWidth: 760,
          maxHeight: "92dvh",
          overflowY: "auto",
          padding: "clamp(24px, 4vw, 36px) clamp(20px, 3vw, 32px) clamp(36px, 5vw, 48px)",
          // 데스크톱에서는 중앙 정렬
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          aria-label="닫기"
          style={{
            position: "sticky",
            top: 0,
            float: "right",
            marginLeft: 12,
            marginBottom: 8,
            minHeight: 32,
            background: "var(--card)",
            border: "1px solid var(--border2)",
            borderRadius: "var(--radius-xs)",
            color: "var(--muted)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            fontWeight: 700,
            padding: "5px 11px",
            cursor: "pointer",
            zIndex: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            transition: "color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
          }}
        >
          Esc ✕
        </button>

        <PickModal item={content.item} onClose={onClose} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   카드 컴포넌트 (클릭 가능)
═══════════════════════════════════════════════════════════════ */

function HighlightArticle({
  item,
  expanded,
  onToggle,
  editionSlug,
}: {
  item: ABHighlight;
  expanded: boolean;
  onToggle: (rank: number) => void;
  editionSlug: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const accent = item.tier === "hero" ? "var(--accent)" : "var(--muted)";
  const image = item.post.thumbnail ?? item.post.images?.[0];
  const detailId = `ab-highlight-detail-${item.rank}`;
  // w22 패턴 — slug 있으면 카드 클릭 시 nested route 로 이동
  const nestedHref = item.post.slug ? `/ab/${editionSlug}/${item.post.slug}/` : null;

  const onCardClick = () => {
    if (nestedHref && typeof window !== "undefined") {
      window.location.href = nestedHref;
      return;
    }
    onToggle(item.rank);
  };

  useEffect(() => {
    if (!expanded) return;
    cardRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [expanded]);

  return (
    <article
      ref={cardRef}
      role="listitem"
      className="tc-feed-card"
      style={{
        borderColor: expanded || item.tier === "hero" ? "var(--accent)" : "var(--border)",
        boxShadow: expanded ? "0 6px 24px -12px var(--overlay-bg)" : "none",
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={nestedHref ? undefined : expanded}
        aria-controls={nestedHref ? undefined : detailId}
        aria-label={nestedHref
          ? `${stripMarkdown(item.post.title)} 상세 페이지 열기`
          : `${stripMarkdown(item.post.title)} ${expanded ? "접기" : "펼치기"}`}
        onClick={onCardClick}
        onKeyDown={(e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          onCardClick();
        }}
        style={{
          display: "flex",
          width: "100%",
          minWidth: 0,
          flexDirection: "column",
          padding: 0,
          border: 0,
          background: "transparent",
          color: "inherit",
          textAlign: "left",
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <EditorialImageFrame
          image={image}
          label={item.sourceCompany}
          tone="accent"
          priority={item.tier === "hero"}
        />

        <div className="tc-feed-body">
          <div className="tc-feed-meta mono">
            <span style={{ color: accent, fontWeight: 800 }}>{item.sourceCompany}</span>
            <span aria-hidden>·</span>
            <span>{item.post.date}</span>
            <span aria-hidden>·</span>
            <span style={{ textTransform: "uppercase", letterSpacing: "0.14em" }}>{item.tier}</span>
            <span aria-hidden>·</span>
            <span style={{ color: "var(--dim)" }}>#{String(item.rank).padStart(2, "0")}</span>
          </div>

          <h2 className="tc-feed-title serif">{stripMarkdown(item.post.title)}</h2>

          {item.post.deck && (
            <p
              className="serif"
              style={{
                margin: "2px 0 4px 0",
                fontSize: 14.5,
                lineHeight: 1.5,
                color: "var(--text-soft)",
                letterSpacing: "-0.005em",
                fontStyle: "italic",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {stripMarkdown(item.post.deck)}
            </p>
          )}

          {item.keyQuote && (
            <blockquote
              style={{
                margin: 0,
                borderLeft: `2px solid ${accent}`,
                paddingLeft: 10,
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--text)",
              }}
            >
              &ldquo;{stripMarkdown(item.keyQuote)}&rdquo;
            </blockquote>
          )}

          <p className="tc-feed-summary">
            {stripMarkdown(item.post.summary || item.post.content || "")}
          </p>

          <SourceAuditStrip input={item.post} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <TagList tags={item.post.tags} limit={6} />
          </div>

          <div className="tc-feed-footer mono">
            <span>#{String(item.rank).padStart(2, "0")}</span>
            <span>{expanded ? "접기 ↑" : "자세히 보기 →"}</span>
          </div>
        </div>
      </div>

      <div
        id={detailId}
        role="region"
        aria-label={`${stripMarkdown(item.post.title)} 상세 내용`}
        hidden={!expanded}
        style={{ padding: expanded ? "0 14px 16px" : 0 }}
      >
        {expanded && <HighlightDetail item={item} />}
      </div>
    </article>
  );
}

function DemoCard({ item }: { item: ABDemoCard }) {
  return (
    <article
      style={{
        border: "1px solid var(--border2)",
        borderLeft: "3px solid var(--gold)",
        background: "color-mix(in srgb, var(--card), var(--surface) 22%)",
        borderRadius: "var(--radius-xs)",
        padding: "clamp(22px, 4vw, 34px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <SectionEyebrow label={`실전 사례 · ${item.category}`} tone="gold" />
      </div>

      <h2
        className="serif"
        style={{
          marginTop: 16,
          maxWidth: "22ch",
          fontSize: "clamp(24px, 4vw, 38px)",
          fontWeight: 700,
          letterSpacing: "-0.035em",
          lineHeight: 1.08,
          color: "var(--text-strong)",
        }}
      >
        {stripMarkdown(item.title)}
      </h2>

      {item.subtitle && (
        <p
          className="serif"
          style={{
            marginTop: 10,
            maxWidth: "60ch",
            fontSize: "var(--text-lg)",
            fontStyle: "italic",
            lineHeight: 1.5,
            color: "var(--muted)",
          }}
        >
          {stripMarkdown(item.subtitle)}
        </p>
      )}

      {item.videoSrc && (
        <video
          controls
          playsInline
          preload="metadata"
          poster={item.videoPoster}
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
          <source src={item.videoSrc} type="video/mp4" />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>
      )}

      {item.workflow && (
        <p
          style={{
            fontFamily: "var(--mono)",
            marginTop: 16,
            border: "1px solid color-mix(in srgb, var(--gold), var(--border) 45%)",
            background: "var(--surface)",
            borderRadius: "var(--radius-xs)",
            padding: "11px 14px",
            fontSize: 12,
            letterSpacing: "0.02em",
            lineHeight: 1.6,
            color: "var(--gold)",
          }}
        >
          {stripMarkdown(item.workflow)}
        </p>
      )}

      <p
        style={{
          marginTop: 18,
          maxWidth: "62ch",
          fontSize: "var(--text-md)",
          lineHeight: 1.75,
          color: "var(--muted)",
        }}
      >
        {stripMarkdown(item.summary)}
      </p>

      <p
        style={{
          marginTop: 14,
          maxWidth: "62ch",
          whiteSpace: "pre-wrap",
          fontSize: "var(--text-base)",
          lineHeight: 1.85,
          color: "var(--text)",
        }}
      >
        {renderRichText(item.body)}
      </p>

      <div
        style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <TagList tags={item.tags} limit={6} />
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="궁합방 데모 새 창에서 열기"
          style={{
            fontFamily: "var(--mono)",
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
            fontSize: 12,
            background: "var(--gold)",
            color: "var(--ink)",
            padding: "0 18px",
            borderRadius: "var(--radius-xs)",
            textDecoration: "none",
            fontWeight: 800,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          {item.label || "사례 열기 →"}
        </a>
      </div>
    </article>
  );
}

function EditorPickCard({
  item,
  onOpen,
  editionSlug,
}: {
  item: ABEditorPick;
  onOpen: (c: ModalContent) => void;
  editionSlug: string;
}) {
  const image = item.thumbnail ?? item.images?.[0];
  const nestedHref = item.slug ? `/ab/${editionSlug}/${item.slug}/` : null;

  const onCardActivate = () => {
    if (nestedHref && typeof window !== "undefined") {
      window.location.href = nestedHref;
      return;
    }
    onOpen({ kind: "pick", item });
  };

  return (
    <article
      onClick={onCardActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onCardActivate();
      }}
      className="tc-feed-card"
      style={{
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <EditorialImageFrame image={image} label={item.category} tone="gold" />

      <div className="tc-feed-body">
        <div className="tc-feed-meta mono">
          <span style={{ color: "var(--gold)", fontWeight: 800 }}>참고 자료</span>
          <span aria-hidden>·</span>
          <span>{item.category}</span>
          {item.tier && (
            <>
              <span aria-hidden>·</span>
              <span>{item.tier}</span>
            </>
          )}
        </div>

        <h3 className="tc-feed-title serif">{stripMarkdown(item.title)}</h3>

        {item.deck && (
          <p
            className="serif"
            style={{
              margin: "2px 0 4px 0",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-soft)",
              letterSpacing: "-0.005em",
              fontStyle: "italic",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {stripMarkdown(item.deck)}
          </p>
        )}

        {item.subtitle && <p className="tc-feed-summary">{stripMarkdown(item.subtitle)}</p>}

        <p className="tc-feed-summary">{stripMarkdown(item.summary)}</p>

        <SourceAuditStrip input={{ officialUrl: item.sourceUrl, source: item.sourceUrl, tags: item.tags }} tone="gold" />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <TagList tags={item.tags} limit={5} />
        </div>

        <div className="tc-feed-footer mono">
          <span>{item.sourceLabel || "출처"}</span>
          <span>자세히 보기 →</span>
        </div>
      </div>
    </article>
  );
}

/* ════════════════════════════════════════════════════════════
   메인 클라이언트 컴포넌트
═══════════════════════════════════════════════════════════════ */

export default function ABEditionClient({ data }: { data: ABEdition }) {
  const [modal, setModal] = useState<ModalContent | null>(null);
  const [expandedRank, setExpandedRank] = useState<number | null>(null);
  const openModal = useCallback((c: ModalContent) => setModal(c), []);
  const closeModal = useCallback(() => setModal(null), []);
  const toggleHighlight = useCallback((rank: number) => {
    setExpandedRank((current) => (current === rank ? null : rank));
  }, []);

  const highlights = [...data.highlights].sort((a, b) => a.rank - b.rank);

  return (
    <>
      {/* ───── 모달 ───── */}
      {modal && <Modal content={modal} onClose={closeModal} />}

      {/* ───── AB 메인 grid 스타일 오버라이드 (스코프: .ab-edition-grid 내부만) ───── */}
      <style>{`
        .ab-edition-grid {
          gap: clamp(18px, 2.1vw, 30px);
        }
        .ab-edition-grid .tc-feed-card {
          border-radius: 0;
          background: color-mix(in srgb, var(--card), var(--surface) 18%);
          transition:
            transform 0.18s ease,
            border-color 0.18s ease,
            background 0.18s ease;
        }
        .ab-edition-grid .tc-feed-card:hover {
          transform: translateY(-2px);
          border-color: var(--text);
          background: var(--card-hover);
          box-shadow: none;
        }
        .ab-edition-grid .tc-source-thumb--card {
          aspect-ratio: 16 / 10;
          border-bottom: 1px solid var(--border);
        }
        .ab-edition-grid .tc-source-thumb img {
          filter: grayscale(0.16) saturate(0.9) contrast(1.04);
        }
        .ab-edition-grid .tc-feed-body {
          gap: 11px;
          padding: clamp(18px, 1.8vw, 24px);
        }
        .ab-edition-grid .tc-feed-meta {
          font-size: 10px;
          letter-spacing: 0.14em;
          gap: 7px;
          color: var(--muted);
          margin-bottom: 2px;
        }
        .ab-edition-grid .tc-feed-title {
          font-size: clamp(19px, 1.65vw, 24px);
          line-height: 1.18;
          letter-spacing: -0.03em;
          font-weight: 680;
          color: var(--text-strong, var(--text));
          margin: 4px 0 2px;
          text-decoration: none;
          -webkit-line-clamp: 3;
        }
        .ab-edition-grid .tc-feed-summary {
          font-size: 13.5px;
          line-height: 1.58;
          color: var(--muted);
          -webkit-line-clamp: 3;
        }
        .ab-edition-grid .tc-feed-footer {
          border-top: 1px solid var(--border);
          margin-top: 4px;
          padding-top: 12px;
          font-size: 10px;
          letter-spacing: 0.16em;
        }
      `}</style>

      <main className="ab-page-shell">
        {/* ───── Header ───── */}
        <header className="ab-index-hero">
          <div className="ab-shell-inner" style={{ maxWidth: 1120 }}>
            <nav
              aria-label="Breadcrumb"
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--muted)",
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
                VoidNews
              </Link>
              <span style={{ color: "var(--dim)" }}>/</span>
              <Link href="/ab" style={{ color: "var(--muted)", textDecoration: "none" }}>
                AB Briefing
              </Link>
              <span style={{ color: "var(--dim)" }}>/</span>
              <span style={{ color: "var(--text)" }}>{data.slug}</span>
            </nav>

            <div className="ab-hero-grid" style={{ alignItems: "start" }}>
              <div className="ab-hero-copy">
                <p className="ab-kicker" style={{ color: "var(--gold)" }}>
                  VoidLight Letter · {data.period}
                </p>
                <h1 className="ab-display-title" style={{ maxWidth: "15ch" }}>{data.title}</h1>
                <p className="ab-hero-deck" style={{ color: "var(--text-soft)", maxWidth: "46ch" }}>
                  {data.theme}
                </p>
              </div>

              <aside className="ab-index-panel" aria-label="이번 호 메타데이터">
                <div>
                  <span className="ab-panel-label">Edition</span>
                  <strong>VOL.{String(data.volume).padStart(2, "0")}</strong>
                </div>
                <div>
                  <span className="ab-panel-label">Published</span>
                  <strong>{data.announceDate}</strong>
                </div>
                <div>
                  <span className="ab-panel-label">Cards</span>
                  <strong>{data.highlights.length} highlights</strong>
                </div>
              </aside>
            </div>

            {data.coreFlow && data.coreFlow.length > 0 ? (
              <section className="ab-core-flow" aria-label="이번 호 핵심 흐름">
                <span className="ab-core-flow__label mono">이번 호 핵심 흐름</span>
                <ol>
                  {data.coreFlow.map((flow, index) => (
                    <li key={flow}>
                      <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                      <p>{flow}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
          </div>
        </header>

        {/* ───── Intro ───── */}
        <section
          style={{
            padding: "clamp(34px, 6vw, 54px) clamp(16px, 3vw, 32px)",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="divider-label" aria-hidden style={{ marginBottom: 18 }}>
              <span>여는 글</span>
            </div>
            <p
              className="serif dropcap"
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "clamp(17px, 2.3vw, 20px)",
                lineHeight: 1.78,
                color: "var(--text)",
                margin: 0,
              }}
            >
              {stripMarkdown(data.intro)}
            </p>
          </div>
        </section>

        {/* ───── Highlights ───── */}
        <section
          style={{
            padding: "0 clamp(16px, 3vw, 32px) clamp(28px, 5vw, 40px)",
          }}
        >
          <div style={{ maxWidth: 1440, margin: "0 auto" }}>
            <div
              style={{
                borderTop: "3px double var(--rule)",
                paddingTop: 28,
                marginBottom: 22,
              }}
            >
              <span className="kicker" style={{ color: "var(--accent)" }}>
                핵심 브리핑 카드
              </span>
              <h2
                className="serif"
                style={{
                  marginTop: 10,
                  fontSize: "clamp(24px, 3.4vw, 34px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "var(--text-strong)",
                  lineHeight: 1.1,
                }}
              >
                핵심 흐름을 발표 순서대로 읽습니다
              </h2>
              <p
                className="deck"
                style={{
                  marginTop: 10,
                  maxWidth: "62ch",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--text-soft)",
                }}
              >
                카드를 열면 발표용 설명, 검증 출처, 관련 게시글을 같은 맥락 안에서 확인할 수 있습니다.
              </p>
            </div>
            <div role="list" className="tc-article-grid ab-edition-grid">
              {highlights.map((h) => (
                <HighlightArticle
                  key={h.rank}
                  item={h}
                  expanded={expandedRank === h.rank}
                  onToggle={toggleHighlight}
                  editionSlug={data.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {data.editorsPicks && data.editorsPicks.length > 0 && (
          <section
            style={{
              padding:
                "clamp(32px, 5vw, 48px) clamp(16px, 3vw, 32px) clamp(24px, 4vw, 32px)",
            }}
          >
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <div
                style={{
                  borderTop: "3px double var(--rule)",
                  paddingTop: 28,
                  marginBottom: 22,
                }}
              >
                <span className="kicker" style={{ color: "var(--gold)" }}>
                  Editor&apos;s toolkit
                </span>
                <h2
                  className="serif"
                  style={{
                    marginTop: 10,
                    fontSize: "clamp(22px, 3.2vw, 28px)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    color: "var(--text-strong)",
                    lineHeight: 1.12,
                  }}
                >
                  실무에 바로 연결되는 도구와 참고 자료
                </h2>
                <p
                  className="deck"
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    lineHeight: 1.55,
                    maxWidth: "60ch",
                    color: "var(--text-soft)",
                  }}
                >
                  발표자가 검토한 도구 중 작업 흐름에 붙이기 쉬운 자료만 따로 정리했습니다.
                </p>
              </div>
              <div className="tc-article-grid ab-edition-grid">
                {data.editorsPicks.map((pick, i) => (
                  <EditorPickCard key={i} item={pick} onOpen={openModal} editionSlug={data.slug} />
                ))}
              </div>
            </div>
          </section>
        )}

        {data.demoCards && data.demoCards.length > 0 && (
          <section
            style={{
              padding:
                "clamp(32px, 5vw, 48px) clamp(16px, 3vw, 32px) clamp(24px, 4vw, 32px)",
            }}
          >
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <div
                style={{
                  borderTop: "3px double var(--rule)",
                  paddingTop: 28,
                  marginBottom: 22,
                }}
              >
                <span className="kicker" style={{ color: "var(--gold)" }}>
                  Demo showcase
                </span>
                <h2
                  className="serif"
                  style={{
                    marginTop: 10,
                    fontSize: "clamp(22px, 3.2vw, 28px)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    color: "var(--text-strong)",
                    lineHeight: 1.12,
                  }}
                >
                  실전 데모 — 영상으로 바로 보기
                </h2>
              </div>
              <div style={{ display: "grid", gap: 20 }}>
                {data.demoCards.map((card, i) => (
                  <DemoCard key={i} item={card} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ───── Closing ───── */}
        <section
          style={{
            padding:
              "clamp(32px, 5vw, 48px) clamp(16px, 3vw, 32px) clamp(48px, 8vw, 72px)",
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              borderTop: "3px double var(--rule)",
              paddingTop: 36,
            }}
          >
            <div className="divider-label" aria-hidden style={{ marginBottom: 16 }}>
              <span>마무리</span>
            </div>
            <p
              className="serif"
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "clamp(15px, 2vw, 17px)",
                lineHeight: 1.85,
                color: "var(--text)",
                margin: 0,
              }}
            >
              {stripMarkdown(data.closing)}
            </p>
          </div>
        </section>

        {/* ───── Footer ───── */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--surface)",
            padding: "28px clamp(16px, 3vw, 32px)",
          }}
        >
          <div
            className="mono"
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 12,
              fontSize: 10.5,
              color: "var(--muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ color: "var(--dim)" }}>다룬 주차</span>
              {data.coveredWeeks.map((w) => (
                <Link
                  key={w}
                  href={`/${w}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 28,
                    color: "var(--text)",
                    textDecoration: "none",
                    border: "1px solid var(--border2)",
                    padding: "0 11px",
                    borderRadius: "var(--radius-pill)",
                    transition: "border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
                  }}
                >
                  {w}
                </Link>
              ))}
            </div>
            <Link
              href="/ab"
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span aria-hidden>←</span> AB 발표 목록
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
