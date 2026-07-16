// 단순 i18n 메시지 + Locale 타입
// API 키 없이 정적 번역만 — 사이트 UI 라벨, 발표 시점에 다국어 노출

export type Locale = "ko" | "en";

export const DEFAULT_LOCALE: Locale = "ko";

const messages = {
  ko: {
    // 헤더
    "site.kicker": "보이드뉴스",
    "site.archive": "아카이브",
    "nav.weekly": "주간",
    "nav.ab": "AB 브리핑",
    "nav.threads": "스레드",
    "nav.x": "X",
    // 본문 공용
    "common.readMore": "자세히 보기",
    "common.minRead": "분 읽기",
    "common.allWeeks": "전체 주차",
    "common.weekN": "주차",
    "common.latest": "최신호",
    "common.search": "제목·요약·태그에서 검색",
    "common.filter.all": "전체",
    "common.shownCount": "보여진 카드",
    "common.totalCount": "전체",
    "common.empty": "일치하는 카드가 없습니다.",
    "common.companyPostsSuffix": "건",
    // PostDetail
    "detail.back": "주차로 돌아가기",
    "detail.lang.ko": "한국어",
    "detail.lang.en": "ENGLISH",
    "detail.lang.koUnavailable": "이 글의 한국어 본문은 아직 준비되지 않았습니다. 영문 원문을 확인해 주세요.",
    "detail.lang.enUnavailable": "English version is not yet available. Please refer to the original source.",
    "detail.officialExcerpt": "공식 본문 발췌",
    "detail.officialOutline": "본문 헤딩",
    "detail.references": "공식 출처",
    "detail.referenceMain": "공식 원문 보기",
    "detail.related": "관련 글",
    "detail.glossary": "이 글에 나오는 전문 용어",
    "detail.glossarySub": "본문에 등장한 용어를 한국어로 풀이했습니다 · 비개발자 친화",
    "detail.prev": "이전",
    "detail.next": "다음",
    // 언어 토글
    "locale.switch": "언어",
  },
  en: {
    // header
    "site.kicker": "VoidNews",
    "site.archive": "Archive",
    "nav.weekly": "Weekly",
    "nav.ab": "AB Briefing",
    "nav.threads": "Threads",
    "nav.x": "X",
    // common
    "common.readMore": "Read more",
    "common.minRead": "min read",
    "common.allWeeks": "All weeks",
    "common.weekN": "Week",
    "common.latest": "Latest",
    "common.search": "Search title, summary, tags",
    "common.filter.all": "All",
    "common.shownCount": "Showing",
    "common.totalCount": "of",
    "common.empty": "No matching cards.",
    "common.companyPostsSuffix": "items",
    // PostDetail
    "detail.back": "Back to week",
    "detail.lang.ko": "한국어",
    "detail.lang.en": "ENGLISH",
    "detail.lang.koUnavailable": "Korean version is not yet available. Please refer to the original.",
    "detail.lang.enUnavailable": "English source body is not available.",
    "detail.officialExcerpt": "Official excerpt",
    "detail.officialOutline": "Headings",
    "detail.references": "Official sources",
    "detail.referenceMain": "View official source",
    "detail.related": "Related",
    "detail.glossary": "Glossary",
    "detail.glossarySub": "Plain-language explanations of terms in this article",
    "detail.prev": "Previous",
    "detail.next": "Next",
    "locale.switch": "Lang",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof (typeof messages)["ko"];

export function t(locale: Locale, key: MessageKey): string {
  return messages[locale]?.[key] ?? messages.ko[key] ?? key;
}

// 한글 포함 여부 → 본문이 한국어인지 영문인지 자동 감지
export function isKoreanText(text: string | null | undefined): boolean {
  if (!text) return false;
  return /[가-힣]/.test(text);
}

// 표시용 필드 선택 — en 필드가 있으면 영문, 없으면 한국어 폴백.
// 구조적 타입이라 Post 외에도 동일 shape면 사용 가능. identity(원본 title 키)는 호출부가 유지한다.
export interface DisplayFields {
  title: string;
  deck?: string;
  summary?: string;
  content?: string;
}

export function displayPost<
  T extends DisplayFields & { en?: Partial<DisplayFields> }
>(post: T, locale: Locale): DisplayFields {
  if (locale !== "en" || !post.en) {
    return { title: post.title, deck: post.deck, summary: post.summary, content: post.content };
  }
  return {
    title: post.en.title ?? post.title,
    deck: post.en.deck ?? post.deck,
    summary: post.en.summary ?? post.summary,
    content: post.en.content ?? post.content,
  };
}
