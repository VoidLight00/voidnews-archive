// AB 발표 섹션 — 격주 멤버십 브리핑
// Weekly 아카이브와 분리된 큐레이션 레이어.
// 엄선된 5-10개 항목을 발표 모드로 보여주는 한 페이지.

import type { Post } from "../data";

export type HighlightTier = "hero" | "feature" | "normal";

export interface ABHighlight {
  rank: number;
  tier: HighlightTier;

  // 데이터 소스: Weekly archive의 post를 인라인 복제
  // (Next.js 정적 빌드 안정성을 위해 참조 대신 실제 값을 넣음)
  post: Post;

  // 해당 원본의 주차 슬러그 (백링크용)
  sourceWeek: string;
  sourceCompany: string;

  // 큐레이터 편집 노트 — 왜 이게 뽑혔는가
  editorial?: string;

  // 핵심 인용 (카드 상단 강조)
  keyQuote?: string;
}

export interface ABEditorPick {
  title: string;
  subtitle?: string;
  category: string; // "AI 데이터 인프라", "개발 도구" 등 자유 분류
  sourceUrl: string; // 시작/랜딩 URL
  sourceLabel?: string; // 버튼 텍스트 (기본 "시작하기 →")
  summary: string; // 한 줄 요약
  body: string; // 풍부한 본문 (마크다운 허용 — 줄바꿈은 \n)
  editorial?: string; // 큐레이터 맥락 (왜 이걸 넣었는지)
  tags?: string[];
  tier?: HighlightTier; // 기본 feature
}

export interface ABEdition {
  slug: string; // "2026-04a"
  volume: number; // 1-based
  title: string;
  theme: string; // 부제
  period: string; // "2026-04-06 ~ 2026-04-12"
  coveredWeeks: string[]; // ["2026-w15"]
  announceDate: string; // "2026-04-10"

  intro: string;
  closing: string;

  highlights: ABHighlight[];

  // 큐레이터가 직접 엄선한 도구·자료 (VIP 트윗 아님)
  editorsPicks?: ABEditorPick[];
}

import { edition2026_04a } from "./editions/2026-04a";

export const editions: ABEdition[] = [edition2026_04a];

export function getEdition(slug: string): ABEdition | undefined {
  return editions.find((e) => e.slug === slug);
}

export function getAllEditionSlugs(): string[] {
  return editions.map((e) => e.slug);
}

export function getEditionList() {
  return editions.map((e) => ({
    slug: e.slug,
    volume: e.volume,
    title: e.title,
    period: e.period,
    announceDate: e.announceDate,
    highlightCount: e.highlights.length,
  }));
}
