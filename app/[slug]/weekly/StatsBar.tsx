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
import { renderIntelBar, type StatsActionMode } from "./shared";

export function StatsBar({
  companies,
  actionMode,
  onCompanyClick,
  onCompanyScroll,
  onToggleActionMode,
}: {
  companies: Company[];
  actionMode: StatsActionMode;
  onCompanyClick: (name: string) => void;
  onCompanyScroll: (name: string) => void;
  onToggleActionMode: () => void;
}) {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const max = Math.max(...companies.map((c) => c.posts.length));
  const total = companies.reduce((sum, company) => sum + company.posts.length, 0);

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 2,
        padding: "20px 20px 18px",
        marginBottom: 28,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span className="kicker" style={{ color: "var(--kicker)" }}>숫자로 보는</span>
          <span aria-hidden style={{ width: 24, height: 1, background: "var(--rule)" }} />
          <h3
            className="serif"
            style={{
              fontSize: "clamp(17px, 1.6vw, 20px)",
              fontWeight: 700,
              color: "var(--text-strong)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            회사별 포스팅 분포
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <button
            onClick={onToggleActionMode}
            className="chip"
            style={
              actionMode === "filter"
                ? undefined
                : {
                    color: "var(--accent)",
                    borderColor: "var(--accent)",
                  }
            }
            title={actionMode === "filter" ? "클릭 시 섹션 스크롤로 전환" : "클릭 시 회사 필터로 전환"}
          >
            {actionMode === "filter" ? "필터 모드" : "스크롤 모드"}
          </button>
          <span
            className="mono"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--gold)",
              whiteSpace: "nowrap",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {String(total).padStart(2, "0")} total
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {companies.map((company) => {
          const ratio = total > 0 ? (company.posts.length / total) * 100 : 0;
          const visible = hoveredCompany === company.name;
          const bar = renderIntelBar(company.posts.length, max);

          return (
            <div
              key={company.name}
              onClick={() => (actionMode === "filter" ? onCompanyClick(company.name) : onCompanyScroll(company.name))}
              onMouseEnter={() => setHoveredCompany(company.name)}
              onMouseLeave={() => setHoveredCompany(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(120px, 160px) 30px minmax(0, 1fr)",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                position: "relative",
                fontFamily: "var(--mono)",
                fontSize: 11,
              }}
              title={company.name}
            >
              <span
                style={{
                  color: "var(--muted)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {company.name}
              </span>
              <span style={{ width: 30, textAlign: "right", color: company.color, fontWeight: 700 }}>
                {company.posts.length}
              </span>
              <span style={{ color: visible ? "var(--text)" : "var(--dim)", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden" }}>
                <span style={{ color: company.color }}>{bar.slice(0, bar.indexOf("░") === -1 ? bar.length : bar.indexOf("░"))}</span>
                <span style={{ color: "var(--dim)" }}>{bar.slice(bar.indexOf("░") === -1 ? bar.length : bar.indexOf("░"))}</span>
                <span style={{ marginLeft: 10, color: "var(--muted)" }}>{ratio.toFixed(1)}%</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
