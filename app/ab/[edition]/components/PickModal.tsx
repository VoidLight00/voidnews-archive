"use client";

import { useEffect, useCallback, useRef, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { ABEdition, ABHighlight, ABEditorPick, ABDemoCard } from "@/lib/ab/data";
import { stripMarkdown } from "@/lib/md";
import { renderRichText } from "./richtext";
import { SectionEyebrow, TagList } from "./bits";
import { ImageGallery } from "./media";

export type ModalContent = { kind: "pick"; item: ABEditorPick };

export function PickModal({
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
          borderBottom: "2px solid var(--gold)",
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
            borderBottom: "2px solid var(--gold)",
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

export function Modal({
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
