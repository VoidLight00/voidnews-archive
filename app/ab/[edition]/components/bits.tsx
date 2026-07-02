"use client";

import { useEffect, useCallback, useRef, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick, ABDemoCard } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";

export function SectionEyebrow({
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

export function RankBadge({ rank, tier }: { rank: number; tier: string }) {
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

export function CompanyTag({ name }: { name: string }) {
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

export function TagList({ tags, limit = 8 }: { tags?: string[]; limit?: number }) {
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
