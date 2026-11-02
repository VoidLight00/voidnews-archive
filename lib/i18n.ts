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
    "common.filter.platform": "플랫폼 필터",
    "platform.all": "모든 플랫폼",
    "platform.X": "X 게시물",
    "platform.Threads": "Threads 게시물",
    "platform.X+Threads": "X 및 Threads 게시물",
    "platform.Web": "웹 페이지 (Web)",
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
    "detail.related": "관련 글",
    "detail.glossary": "이 글에 나오는 전문 용어",
    "detail.glossarySub": "본문에 등장한 용어를 한국어로 풀이했습니다 · 비개발자 친화",
    "detail.prev": "이전",
    "detail.next": "다음",
    // AI 작성 표시(리뉴얼 계획 R3)
    "author.pium": "피움 작성 · AI",
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
    "common.filter.platform": "Platform filter",
    "platform.all": "All platforms",
    "platform.X": "X post",
    "platform.Threads": "Threads post",
    "platform.X+Threads": "X and Threads post",
    "platform.Web": "Web page",
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
    "detail.related": "Related",
    "detail.glossary": "Glossary",
    "detail.glossarySub": "Plain-language explanations of terms in this article",
    "detail.prev": "Previous",
    "detail.next": "Next",
    "author.pium": "Written by Pium · AI",
    "locale.switch": "Lang",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof (typeof messages)["ko"];

export function t(locale: Locale, key: MessageKey): string {
  return messages[locale]?.[key] ?? messages.ko[key] ?? key;
}

// 출처 링크 문구(리뉴얼 계획 R5). 'official' 묶음은 기존 문구 그대로이고, 뉴스레터 판정기 기준으로
// 발견 전용(discovery-only)·보도(press)·매체(media) 계층인 링크만 '공식'을 뺀 문구를 씁니다.
// 등록부에 없는 주소와 1차 연구·벤치마크·보관 계층은 'official' 묶음을 유지합니다(최소안, 엄격안은 R25).
// 화면은 이 표를 직접 읽지 않고 lib/source-tier.ts의 sourceLabel()로만 읽습니다.
export type SourceLabelGroup = "official" | "discovery-only" | "press" | "media";
export type SourceLabelField =
  | "link" // 공식 링크 버튼
  | "original" // 공식 원문 버튼·탭
  | "view" // 상세 참고 블록의 대표 링크
  | "accountView" // X 임베드를 불러오지 못했을 때의 대체 링크
  | "heading" // 상세 참고 블록 제목
  | "headingWithReading" // 보충 자료가 있는 상세의 참고 블록 제목
  | "host" // '공식 · 호스트'의 앞부분
  | "status"; // AB 검증 메타의 상태

export const SOURCE_LABELS: Record<Locale, Record<SourceLabelGroup, Record<SourceLabelField, string>>> = {
  ko: {
    official: { link: "공식 링크", original: "공식 원문", view: "공식 원문 보기", accountView: "공식 계정 원문 보기", heading: "공식 출처", headingWithReading: "공식 출처와 참고 자료", host: "공식", status: "공식 발표" },
    "discovery-only": { link: "원문 링크", original: "원문 링크", view: "원문 보기", accountView: "원문 보기", heading: "출처", headingWithReading: "출처와 참고 자료", host: "원문", status: "보조 검증" },
    press: { link: "보도 기사", original: "보도 기사", view: "보도 기사", accountView: "보도 기사", heading: "출처", headingWithReading: "출처와 참고 자료", host: "보도", status: "보조 검증" },
    media: { link: "영상", original: "영상", view: "영상", accountView: "영상", heading: "출처", headingWithReading: "출처와 참고 자료", host: "영상", status: "보조 검증" },
  },
  en: {
    official: { link: "Official link", original: "Official post", view: "View official source", accountView: "View the official post", heading: "Official sources", headingWithReading: "Official sources and further reading", host: "Official", status: "Official announcement" },
    "discovery-only": { link: "Original link", original: "Original link", view: "View original", accountView: "View original", heading: "Sources", headingWithReading: "Sources and further reading", host: "Original", status: "Secondary check" },
    press: { link: "News report", original: "News report", view: "News report", accountView: "News report", heading: "Sources", headingWithReading: "Sources and further reading", host: "Press", status: "Secondary check" },
    media: { link: "Video", original: "Video", view: "Video", accountView: "Video", heading: "Sources", headingWithReading: "Sources and further reading", host: "Video", status: "Secondary check" },
  },
};

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
