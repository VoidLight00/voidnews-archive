"use client";

import { useLocale } from "@/app/LocaleProvider";

export type BrowseItem = { id: string; label: string; count: number; href?: string };

type Props = {
  items: BrowseItem[];
  selected?: string;
  onSelect?: (id: string) => void;
  title?: string;
  description?: string;
};

export default function BrowseGrid({ items, selected, onSelect, title, description }: Props) {
  const { locale } = useLocale();
  const heading = title ?? (locale === "ko" ? "관심 있는 소식부터" : "Explore this issue");
  const intro = description ?? (locale === "ko" ? "회사를 선택해 이번 호를 둘러보세요." : "Browse this issue by company.");
  if (!items.length) return null;
  return (
    <section className="vn-browse" aria-label={heading}>
      <div className="vn-section-heading">
        <h2>{heading}</h2>
        <p>{intro}</p>
      </div>
      <div className="vn-browse-grid">
        {items.map((item) => {
          const label = item.id === "all" && locale === "en" ? "All news" : item.label;
          const content = <><span className="vn-browse-initial" aria-hidden>{label.slice(0, 2)}</span><span className="vn-browse-copy"><strong>{label}</strong><span>{locale === "ko" ? `${item.count}개 소식` : `${item.count} ${item.count === 1 ? "story" : "stories"}`}</span></span><span className="vn-browse-arrow" aria-hidden>{item.href ? "↗" : "→"}</span></>;
          return item.href ? (
            <a key={item.id} href={item.href} className="vn-browse-card">{content}</a>
          ) : (
            <button key={item.id} type="button" className="vn-browse-card" aria-pressed={selected === item.id} onClick={() => onSelect?.(item.id)}>{content}</button>
          );
        })}
      </div>
    </section>
  );
}
