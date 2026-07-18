// AB 발표 섹션 — 격주 멤버십 브리핑
// Weekly 아카이브와 분리된 큐레이션 레이어.
// 엄선된 5-10개 항목을 발표 모드로 보여주는 한 페이지.

import type { MediaImage, Post } from "../data";

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
  slug?: string; // nested route /ab/<edition>/<slug>/
  deck?: string; // 카드 grid title 밑 1줄 sub-headline
  subtitle?: string;
  category: string; // "AI 데이터 인프라", "개발 도구" 등 자유 분류
  sourceUrl: string; // 시작/랜딩 URL
  sourceLabel?: string; // 버튼 텍스트 (기본 "시작하기 →")
  // 보조 가이드 링크 (공식 문서 외, 큐레이터가 직접 작성한 한국어 가이드 등)
  guideUrl?: string;
  guideLabel?: string; // 기본 "설치 가이드 →"
  summary: string; // 한 줄 요약
  body: string; // 풍부한 본문 (마크다운 허용 — 줄바꿈은 \n)
  editorial?: string; // 큐레이터 맥락 (왜 이걸 넣었는지)
  thumbnail?: MediaImage;
  images?: MediaImage[];
  tags?: string[];
  tier?: HighlightTier; // 기본 feature
}

export interface ABDemoCard {
  title: string;
  slug?: string;
  deck?: string;
  subtitle?: string;
  category: string;
  url: string;
  label?: string;
  summary: string;
  body: string;
  workflow?: string;
  tags?: string[];
  videoSrc?: string;     // 로컬 mp4 경로 (예: /threads-assets/.../demos.mp4) — <video>로 직접 재생
  videoPoster?: string;  // 영상 썸네일 (poster)
}

export type ABSource = "youtube" | "x" | "web" | "community-hn" | "community-reddit";
export type ABSourceCounts = Partial<Record<ABSource, number>>;

export interface ABEdition {
  slug: string; // "2026-04a"
  volume: number; // 1-based
  title: string;
  theme: string; // 부제
  period: string; // "2026-04-06 ~ 2026-04-12"
  coveredWeeks: string[]; // ["2026-w15"]
  announceDate: string; // "2026-04-10"
  dateSlug?: string; // 안정된 날짜 기반 URL — 기본은 announceDate, 다른 날짜가 필요할 때만 지정
  sourceCounts?: ABSourceCounts; // 해당 회차 수집 실측이 있을 때만 공개
  nextEditionDate?: string; // 격주 cadence 기준 다음 회차 예정일

  intro: string;
  closing: string;
  coreFlow?: string[];

  highlights: ABHighlight[];

  // 큐레이터가 직접 엄선한 도구·자료 (VIP 트윗 아님)
  editorsPicks?: ABEditorPick[];

  // 발표자가 직접 만든 실전 데모·사례 카드
  demoCards?: ABDemoCard[];
}

import { edition2026_04a } from "./editions/2026-04a";
import { edition2026_04b } from "./editions/2026-04b";
import { edition2026_04c } from "./editions/2026-04c";
import { edition2026_05a } from "./editions/2026-05a";
import { edition2026_05b } from "./editions/2026-05b";
import { edition2026_06a } from "./editions/2026-06a";
import { edition2026_06b } from "./editions/2026-06b";
import { edition2026_07a } from "./editions/2026-07a";

export const editions: ABEdition[] = [edition2026_07a, edition2026_06b, edition2026_06a, edition2026_05b, edition2026_05a, edition2026_04c, edition2026_04b, edition2026_04a];

// 날짜 URL은 announceDate가 기본이라 과거 회차 데이터 수정 없이 전 회차가 날짜로 접근된다.
function dateSlugOf(edition: ABEdition): string {
  return edition.dateSlug ?? edition.announceDate;
}

export function getEdition(slug: string): ABEdition | undefined {
  return editions.find((edition) => edition.slug === slug || dateSlugOf(edition) === slug);
}

export function getAllEditionSlugs(): string[] {
  return editions.flatMap((edition) => [edition.slug, dateSlugOf(edition)]);
}

export function getEditionHref(edition: ABEdition): string {
  return `/ab/${dateSlugOf(edition)}`;
}

const SOURCE_LABELS: Record<ABSource, string> = {
  youtube: "YT",
  x: "X",
  web: "Web",
  "community-hn": "HN",
  "community-reddit": "Reddit",
};

export function formatSourceCounts(counts: ABSourceCounts): string {
  return (Object.keys(SOURCE_LABELS) as ABSource[])
    .filter((key) => counts[key] != null)
    .map((key) => `${SOURCE_LABELS[key]} ${counts[key]}`)
    .join(" · ");
}

export function getEditionList() {
  return editions.map((e) => ({
    href: getEditionHref(e),
    volume: e.volume,
    title: e.title,
    period: e.period,
    announceDate: e.announceDate,
    nextEditionDate: e.nextEditionDate,
    highlightCount: e.highlights.length,
  }));
}
