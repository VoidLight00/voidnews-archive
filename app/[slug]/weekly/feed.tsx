"use client";

import {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { Company, Post, WeeklyData } from "@/lib/data";
import { stripMarkdown } from "@/lib/md";
import { displayPost } from "@/lib/i18n";
import { useLocale } from "@/app/LocaleProvider";
import { PostDateLabel, parsePostDate, extractDomain } from "./shared";
import { useOGData, isSafeImageUrl } from "./previews";
import { ImageDisclosure } from "@/app/components/ImageDisclosure";

export type TopStoryEntry = {
  company: Company;
  post: Post;
  issueIndex: number;
};

export function estimateReadTime(post: Post) {
  const text = [post.title, post.summary, post.content].filter(Boolean).join(" ");
  const normalizedLength = stripMarkdown(text).replace(/\s+/g, " ").trim().length;
  return Math.max(1, Math.ceil(normalizedLength / 420));
}

export function getPostSortTime(post: Post, defaultYear: number) {
  return parsePostDate(post.date, defaultYear)?.getTime() ?? 0;
}

export function getPostIssueHref(issueSlug: string, postTitle: string, postSlug?: string) {
  if (postSlug) return `/${issueSlug}/${postSlug}/`;
  const params = new URLSearchParams({ post: postTitle });
  return `/${issueSlug}?${params.toString()}`;
}

export function getCompanyShortName(name: string) {
  return name.split(" /")[0];
}

export function getPostSourceUrl(post: Post) {
  return post.officialUrl || post.source || post.xUrl || post.threadsUrl || post.backupUrls?.[0]?.url || "";
}

export function getPostPrimaryImage(post: Post) {
  return post.thumbnail ?? post.images?.[0] ?? null;
}

export function SourceThumbnail({
  post,
  companyColor,
  variant,
  priority = false,
}: {
  post: Post;
  companyColor: string;
  variant: "hero" | "card";
  priority?: boolean;
}) {
  const { locale } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const sourceUrl = getPostSourceUrl(post);
  const [visible, setVisible] = useState(priority);
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const explicitImage = [post.thumbnail, ...(post.images ?? [])]
    .find((image) => image && isSafeImageUrl(image.src) && !failedSources.includes(image.src));
  const explicitImageSrc = explicitImage?.src ?? "";
  const { data, loading } = useOGData(sourceUrl, visible && !explicitImageSrc && !!sourceUrl);
  const imageSrc = explicitImageSrc || data?.image || "";
  const visibleImageSrc = imageSrc && !failedSources.includes(imageSrc) ? imageSrc : "";
  const imageAlt = explicitImage?.alt || data?.title || `${post.title} 출처 이미지`;
  const domain = sourceUrl ? extractDomain(sourceUrl) : "source";

  useEffect(() => {
    if (priority || visible) return;
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "420px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [priority, visible]);

  return (
    <div
      ref={ref}
      className={`tc-source-thumb tc-source-thumb--${variant}`}
      style={{
        background: `radial-gradient(circle at 22% 18%, ${companyColor}35 0%, transparent 42%), linear-gradient(135deg, var(--surface-2), var(--card))`,
      }}
    >
      {visibleImageSrc ? (
        <img
          src={visibleImageSrc}
          alt={imageAlt}
          loading={priority ? "eager" : "lazy"}
          width={variant === "hero" ? 1440 : 640}
          height={variant === "hero" ? 720 : 400}
          onError={() => setFailedSources((sources) => [...sources, visibleImageSrc])}
        />
      ) : (
        <div className="tc-source-fallback">
          <span className="mono">{loading ? "이미지를 불러오는 중" : "출처 이미지 없음"}</span>
        </div>
      )}
      <ImageDisclosure src={visibleImageSrc} provenance={visibleImageSrc === explicitImage?.src ? explicitImage.provenance : undefined} locale={locale} overlay />
      <span className="tc-source-domain mono">{domain}</span>
    </div>
  );
}

export function handleArticleClick(event: MouseEvent<HTMLAnchorElement>, onOpen: () => void) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  onOpen();
}

export function TopStoriesSection({
  stories,
  issueSlug,
  onOpenStory,
}: {
  stories: TopStoryEntry[];
  issueSlug: string;
  onOpenStory: (post: Post, companyName: string) => void;
}) {
  const { locale } = useLocale();
  if (stories.length === 0) return null;

  const lead = stories[0];
  const leadD = displayPost(lead.post, locale);
  const href = getPostIssueHref(issueSlug, lead.post.title, lead.post.slug);

  return (
    <section className="tc-hero-section rise-in" aria-label="메인 기사">
      <a
        href={href}
        className="tc-hero-card"
        onClick={(event) => handleArticleClick(event, () => onOpenStory(lead.post, lead.company.name))}
        aria-label={`${lead.post.title} 기사 열기`}
      >
        <SourceThumbnail post={lead.post} companyColor={lead.company.color} variant="hero" priority />
        <div className="tc-hero-shade" />
        <div className="tc-hero-content">
          <div className="tc-hero-labels mono">
            <span>{locale === "ko" ? "이번 호 대표 기사" : "Featured story"}</span>
          </div>
          <h1 className="tc-hero-title serif">{leadD.title}</h1>
          {leadD.summary && (
            <p className="tc-hero-summary">{stripMarkdown(leadD.summary)}</p>
          )}
          <div className="tc-hero-meta mono">
            <span style={{ color: lead.company.color }}>{getCompanyShortName(lead.company.name)}</span>
            <span aria-hidden>·</span>
            <span>{lead.post.date}</span>
            <span aria-hidden>·</span>
            <span>{estimateReadTime(lead.post)} min read</span>
            <span aria-hidden>·</span>
            <span>포스트 보기 →</span>
          </div>
        </div>
      </a>
    </section>
  );
}

export type FeedStoryEntry = TopStoryEntry;

export function FeedArticleCard({
  entry,
  issueSlug,
  defaultYear,
  index,
  onOpen,
}: {
  entry: FeedStoryEntry;
  issueSlug: string;
  defaultYear: number;
  index: number;
  onOpen: () => void;
}) {
  const { company, post } = entry;
  const { locale } = useLocale();
  const d = displayPost(post, locale);
  const href = getPostIssueHref(issueSlug, post.title, post.slug);

  return (
    <a
      href={href}
      className="tc-feed-card"
      onClick={(event) => handleArticleClick(event, onOpen)}
      aria-label={`${post.title} 기사 열기`}
    >
      <SourceThumbnail post={post} companyColor={company.color} variant="card" />
      <div className="tc-feed-body">
        <div className="tc-feed-meta mono">
          <span style={{ color: company.color, fontWeight: 800 }}>{getCompanyShortName(company.name)}</span>
          <span aria-hidden>·</span>
          <PostDateLabel date={post.date} defaultYear={defaultYear} />
          <span aria-hidden>·</span>
          <span>{estimateReadTime(post)} min read</span>
        </div>
        <h2 className="tc-feed-title serif">{d.title}</h2>
        {(d.summary || d.content) && (
          <p className="tc-feed-summary">{stripMarkdown(d.summary || d.content || "")}</p>
        )}
        <div className="tc-feed-footer mono">
          <span>#{String(index).padStart(2, "0")}</span>
          <span>자세히 보기 →</span>
        </div>
      </div>
    </a>
  );
}

export function ChronologicalFeed({
  stories,
  issueSlug,
  defaultYear,
  onOpenStory,
}: {
  stories: FeedStoryEntry[];
  issueSlug: string;
  defaultYear: number;
  onOpenStory: (post: Post, companyName: string) => void;
}) {
  if (stories.length === 0) return null;

  return (
    <section className="tc-feed-section" aria-label="Latest articles">
      <div className="tc-section-heading">
        <span className="mono">최신 AI 뉴스</span>
        <span aria-hidden />
      </div>
      <div className="tc-article-grid">
        {stories.map((entry, index) => (
          <FeedArticleCard
            key={`${entry.company.name}-${entry.post.title}`}
            entry={entry}
            issueSlug={issueSlug}
            defaultYear={defaultYear}
            index={index + 1}
            onOpen={() => onOpenStory(entry.post, entry.company.name)}
          />
        ))}
      </div>
    </section>
  );
}
