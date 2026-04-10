"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  // 초기 상태 동기화 (inline script가 이미 설정한 값을 읽음)
  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") ||
      "dark") as Theme;
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("voidnews-theme", next);
    } catch {
      // ignore (private mode 등)
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={isDark ? "Light mode" : "Dark mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--mono)",
        fontSize: 12,
        color: "var(--muted)",
        background: "transparent",
        border: "1px solid var(--border2)",
        borderRadius: 2,
        padding: "4px 10px",
        cursor: "pointer",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        lineHeight: 1,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span style={{ fontSize: 13 }}>{isDark ? "☀" : "☾"}</span>
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
