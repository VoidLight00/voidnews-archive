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
import { weekDateLabel, type WeekListItem } from "@/lib/week-label";

export function WeekDropdown({
  currentSlug,
  currentPeriod,
  weekList,
}: {
  currentSlug: string;
  currentPeriod: string;
  weekList: WeekListItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="mono"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border2)",
          borderRadius: 999,
          padding: "6px 14px",
          color: "var(--text)",
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {weekDateLabel(currentPeriod)}
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.15s" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
          <div
            role="listbox"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--surface)",
              border: "1px solid var(--border2)",
              borderRadius: 4,
              padding: 6,
              zIndex: 100,
              minWidth: 140,
              boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
            }}
          >
            {weekList.map((week) => {
              const active = week.slug === currentSlug;
              return (
                <a
                  key={week.slug}
                  href={`/${week.slug}`}
                  className="mono"
                  style={{
                    display: "block",
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: active ? "var(--accent)" : "var(--muted)",
                    textDecoration: "none",
                    borderRadius: 2,
                    background: active ? "var(--accent-soft)" : "transparent",
                  }}
                  onClick={() => setOpen(false)}
                >
                  {weekDateLabel(week.period)}
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
