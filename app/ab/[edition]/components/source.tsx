"use client";

import { useEffect, useCallback, useRef, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick, ABDemoCard } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";

export type SourceLink = { label: string; url: string; primary?: boolean };

export type SourceAuditInput = {
  officialUrl?: string;
  source?: string;
  backupUrls?: { label: string; url: string }[];
  tags?: string[];
  date?: string;
  verifiedAt?: string;
  communityDiscovery?: { platform: "hn" | "reddit"; score: number };
};

export function communityDiscoveryLabel(discovery: { platform: "hn" | "reddit"; score: number }): string {
  return `${discovery.platform === "hn" ? "HN" : "Reddit"} ${discovery.score}점 경유`;
}

export function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function inferReleaseScope(input: SourceAuditInput): string {
  const text = [...(input.tags || []), input.source || "", input.officialUrl || ""].join(" ").toLowerCase();
  if (/preview|research|beta|early/.test(text)) return "Preview / Beta";
  if (/api|developer|docs|github/.test(text)) return "API / 개발자";
  if (/enterprise|kpmg|dell|aws|bedrock/.test(text)) return "엔터프라이즈";
  if (/mobile|android|ios|app/.test(text)) return "웹 / 모바일";
  return "공개 발표";
}

export function buildSourceAudit(input: SourceAuditInput) {
  const primaryUrl = input.officialUrl || input.source || input.backupUrls?.[0]?.url;
  const host = primaryUrl ? hostnameOf(primaryUrl) : "출처 대기";
  return {
    status: input.officialUrl ? "공식 발표" : "보조 검증",
    scope: inferReleaseScope(input),
    source: input.officialUrl ? `공식 · ${host}` : `확인 · ${host}`,
    checked: input.verifiedAt ? `확인일 ${input.verifiedAt}` : null,
  };
}

export function SourceAuditStrip({ input, tone = "accent" }: { input: SourceAuditInput; tone?: "accent" | "gold" }) {
  const audit = buildSourceAudit(input);
  return (
    <dl className={`ab-source-audit ab-source-audit--${tone}`} aria-label="검증 메타">
      <div><dt>상태</dt><dd>{audit.status}</dd></div>
      <div><dt>범위</dt><dd>{audit.scope}</dd></div>
      <div><dt>출처</dt><dd>{audit.source}</dd></div>
      {audit.checked ? <div><dt>확인</dt><dd>{audit.checked}</dd></div> : null}
      {input.communityDiscovery ? (
        <div><dt>발견</dt><dd>{communityDiscoveryLabel(input.communityDiscovery)}</dd></div>
      ) : null}
    </dl>
  );
}

export function collectSourceLinks({
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

export function SourceButton({ link }: { link: SourceLink }) {
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
