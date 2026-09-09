import type { MediaImage } from "@/lib/data";

// Only audited local assets belong here. Unknown images receive no provenance claim.
const editorialAssets = new Set([
  "/og-cache/kimi-k3-editorial.svg",
  "/og-cache/solgate-private-editorial.svg",
]);

export function imageDisclosure(src?: string, locale: "ko" | "en" = "ko", provenance?: MediaImage["provenance"]) {
  if (!src) return null;
  if (!editorialAssets.has(src)) return null;
  return locale === "ko"
    ? "편집 제작 이미지 · 공식 이미지 아님"
    : "Editorially created image · Not an official image";
}

export function ImageDisclosure({
  src,
  locale = "ko",
  overlay = false,
  provenance,
}: {
  src?: string;
  locale?: "ko" | "en";
  overlay?: boolean;
  provenance?: MediaImage["provenance"];
}) {
  const label = imageDisclosure(src, locale, provenance);
  if (!label) return null;
  return (
    <span
      data-image-disclosure={provenance === "source-share-preview" ? provenance : "editorial"}
      style={{
        display: "block",
        fontSize: 12,
        lineHeight: 1.5,
        padding: "6px 10px",
        color: "var(--text)",
        background: "var(--card)",
        ...(overlay ? { position: "absolute", top: 10, left: 10, right: 10, zIndex: 3 } : {}),
      }}
    >
      {label}
    </span>
  );
}
