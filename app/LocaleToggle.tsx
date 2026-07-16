"use client";

import { useLocale } from "./LocaleProvider";

export default function LocaleToggle() {
  const { locale, setLocale } = useLocale();
  const next = locale === "ko" ? "en" : "ko";
  const label = locale === "ko" ? "KO" : "EN";
  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={`Switch language to ${next.toUpperCase()}`}
      className="mono"
      style={{
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "6px 10px",
        border: "1px solid var(--border)",
        borderRadius: 999,
        background: "var(--card)",
        color: "var(--text)",
        cursor: "pointer",
        minWidth: 56,
        textAlign: "center",
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}
