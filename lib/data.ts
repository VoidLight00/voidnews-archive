import { week15 } from "./weeks/2026-w15";
import { week16 } from "./weeks/2026-w16";
import { week17 } from "./weeks/2026-w17";
import { week18 } from "./weeks/2026-w18";
import { week19 } from "./weeks/2026-w19";
import { week20 } from "./weeks/2026-w20";
import { week21 } from "./weeks/2026-w21";
import { week22 } from "./weeks/2026-w22";
import { week23 } from "./weeks/2026-w23";
import { week24 } from "./weeks/2026-w24";
import { week25 } from "./weeks/2026-w25";
import { week26 } from "./weeks/2026-w26";
import { week27 } from "./weeks/2026-w27";
import { week28 } from "./weeks/2026-w28";
import { week13 } from "./weeks/2026-w13";
import { week12 } from "./weeks/2026-w12";

export interface MediaImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Post {
  date: string;
  platform: "X" | "Threads" | "X+Threads";
  title: string;
  featured?: boolean;
  deck?: string;         // 카드 grid 노출용 sub-headline (title 밑 1줄, 50자 내외)
  summary?: string;      // 한줄 요약 (카드)
  content?: string;      // 전문 / 포스팅 본문
  source?: string;       // 원본 소스 URL (블로그/기사)
  officialUrl?: string;  // 공식 계정 트윗/게시글 URL (이미지·영상 포함)
  backupUrls?: { label: string; url: string }[]; // 보조 공식 링크 (벤치마크·문서·콘솔 등)
  threadsUrl?: string;   // 현님 Threads 포스팅
  xUrl?: string;         // 현님 X 포스팅
  thumbnail?: MediaImage;
  images?: MediaImage[];
  tags?: string[];
  slug?: string;         // 영문 short hash slug — w21/w22 editorial route 전용 (/[week]/[postSlug])
  readMinutes?: number;  // 예상 읽기 시간 (분) — editorial card byline 표시용
  // 메인 hero 카드 전용 — PostDetail에서 영상/임베드 재생
  videoUrl?: string;          // YouTube embed URL (예: https://www.youtube.com/embed/xxx)
  videoSrc?: string;          // 로컬 mp4 경로 — <video>로 카드 내 인라인 재생
  videoPoster?: string;       // 영상 썸네일
  videoClips?: { src: string; poster?: string; title?: string; sourceUrl?: string; durationSec?: number }[]; // 여러 영상 갤러리 (카드 내 각각 인라인 재생)
  threadsEmbedUrl?: string;   // Threads 게시물 iframe embed URL
  galleryImages?: { src: string; alt: string; caption?: string }[]; // 본문 중간 inline 이미지
}

export interface Company {
  name: string;
  color: string;
  posts: Post[];
}

export interface WeeklyData {
  week: number;
  year: number;
  slug: string;
  period: string;
  totalPosts: number;
  companies: Company[];
}

export const weeks: WeeklyData[] = [
  week28,
  week27,
  week26,
  week25,
  week24,
  week23,
  week22,
  week21,
  week20,
  week19,
  week18,
  week17,
  week16,
  week15,
  week13,
  week12,
];

// weekDateLabel 은 lib/week-label.ts 로 이동 — 서버 코드 편의를 위해 재수출만 유지.
// 클라이언트 컴포넌트는 "@/lib/week-label" 에서 직접 import 할 것 (weeks 번들 유입 방지).
export { weekDateLabel, type WeekListItem } from "./week-label";

export function getWeek(slug: string): WeeklyData | undefined {
  return weeks.find((w) => w.slug === slug);
}

export function getLatestSlug(): string {
  return weeks[0].slug;
}

export function getAllSlugs(): string[] {
  return weeks.map((w) => w.slug);
}

export function getWeekList() {
  return weeks.map(w => ({ slug: w.slug, week: w.week, year: w.year, period: w.period })).reverse();
}
