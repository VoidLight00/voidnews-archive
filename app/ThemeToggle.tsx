"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

// 저장 키와 값은 기존 방문자의 선택을 그대로 잇기 위해 바꾸지 않습니다.
// app/layout.tsx의 첫 화면 초기화 스크립트도 같은 키를 읽습니다.
const STORAGE_KEY = "voidnews-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const OPTIONS: ReadonlyArray<{ value: Theme; label: string }> = [
  { value: "light", label: "라이트" },
  { value: "dark", label: "다크" },
];

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null; // 저장소가 막히면 시스템 설정을 따릅니다.
  }
}

function writeStoredTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // 저장소가 막히면 선택을 이 화면의 메모리에만 둡니다.
  }
}

function getDarkQuery(): MediaQueryList | null {
  try {
    return window.matchMedia(DARK_QUERY);
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function ThemeToggle() {
  // null = 하이드레이션 전. 이때 눌린 모양은 globals.css가 data-theme으로 보여 줍니다.
  const [theme, setTheme] = useState<Theme | null>(null);
  const manualRef = useRef(false);

  useEffect(() => {
    const stored = readStoredTheme();
    const query = getDarkQuery();
    manualRef.current = stored !== null;
    const initial: Theme = stored ?? (query?.matches ? "dark" : "light");
    applyTheme(initial);
    setTheme(initial);
    if (!query) return;

    // 수동 선택 전에는 시스템 변경을 바로 따르고, 수동 선택 뒤에는 덮어쓰지 않습니다.
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (manualRef.current) return;
      const next: Theme = event.matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", onSystemChange);
      return () => query.removeEventListener("change", onSystemChange);
    }
    query.addListener(onSystemChange); // Safari 13 이하
    return () => query.removeListener(onSystemChange);
  }, []);

  const choose = (next: Theme) => {
    manualRef.current = true;
    applyTheme(next);
    setTheme(next);
    writeStoredTheme(next);
  };

  return (
    <div
      className="vn-theme-toggle"
      role="group"
      aria-label="화면 테마"
      data-ready={theme ? "" : undefined}
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className="vn-theme-btn"
          data-theme-option={option.value}
          aria-pressed={theme === option.value}
          onClick={() => choose(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
