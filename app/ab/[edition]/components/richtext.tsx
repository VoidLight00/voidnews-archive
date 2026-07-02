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

export const URL_MATCH_REGEX = /^https?:\/\/[^\s)\]]+$/;

export function renderRichText(text: string): ReactNode {
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
