// 작성 주체 판정(리뉴얼 계획 R3·3절). 데이터 파일(lib/weeks/*.ts 등)은 바꾸지 않고 이 규칙만으로 판정합니다.
//
//   사람 작성 목록에 있으면                      → 표시 없음
//   그 밖에는                                   → AI 작성('피움 작성 · AI')
//   주간 카드이고 verifiedAt >= "2026-10-22"이며
//   검토 목록에 없으면                           → AI 작성 + '자동 게시'
//
// 근거: verifiedAt이 2026-10-22 이후인 주간 카드는 12건입니다. 그중 11건은 매일 자동 게시 커밋
// cb50cda·ee1005f·bfab11d가 넣은 카드이고, exa-3-0-search-launch 1건은 AB 회차 교체 커밋 229e144에서
// 사람이 검토해 넣은 카드입니다.
// 한계: AB 실행이 앞으로 주간 카드를 넣으면 검토 목록에 올리기 전까지 '자동 게시'로 보입니다. 표시가 빠지는
// 것보다 남는 쪽이 안전하다고 판단했습니다. 게시기가 카드에 명시적 표식을 쓰게 되면(R24) 이 날짜 규칙을 바꿉니다.

/** 구조화 데이터와 RSS에 쓰는 AI 작성자 이름(계획 3.2절). */
export const AI_AUTHOR_NAME = "피움(VoidNews AI)";

/** 이 날짜 이후에 확인된 주간 카드는 매일 자동 게시가 사람 검토 없이 올린 카드로 봅니다. */
export const AUTO_PUBLISH_SINCE = "2026-10-22";

/** AI 작성과 판정 기준을 설명하는 안내 페이지(R12). 페이지가 생기면 경로를 넣어 기사 바이라인에서 연결합니다. */
export const AI_GUIDE_PATH: string | null = null;

/** 사람이 검토하고 올린 주간 카드입니다. 형식: '주차 slug/카드 slug'. */
export const REVIEWED_WEEKLY_CARDS: ReadonlySet<string> = new Set(["2026-w43/exa-3-0-search-launch"]);

/**
 * 사람이 처음부터 쓴 글입니다. 사용자 확인을 받은 항목만 넣습니다.
 * 형식: 주간은 '주차 slug/카드 slug', AB는 'ab/카드 slug'(slug가 없으면 제목).
 */
export const HUMAN_WRITTEN: ReadonlySet<string> = new Set<string>([]);

export interface AuthorshipSubject {
  /** 주간 카드·기사는 주차 slug("2026-w43"), AB 카드·기사는 "ab"입니다. */
  scope: string;
  slug?: string;
  title: string;
  verifiedAt?: string;
}

export interface Authorship {
  ai: boolean;
  autoPublished: boolean;
}

const WEEKLY_SCOPE = /^\d{4}-w\d{2}$/;

/** 기사 경로의 상위 조각("2026-w43", "ab/2026-10b")을 판정 범위로 바꿉니다. */
export function authorshipScope(weekSlug: string): string {
  return weekSlug === "ab" || weekSlug.startsWith("ab/") ? "ab" : weekSlug;
}

export function authorshipKey(subject: AuthorshipSubject): string {
  return `${subject.scope}/${subject.slug || subject.title}`;
}

export function getAuthorship(subject: AuthorshipSubject): Authorship {
  const key = authorshipKey(subject);
  if (HUMAN_WRITTEN.has(key)) return { ai: false, autoPublished: false };
  const weekly = WEEKLY_SCOPE.test(subject.scope);
  const recent = typeof subject.verifiedAt === "string" && subject.verifiedAt >= AUTO_PUBLISH_SINCE;
  return { ai: true, autoPublished: weekly && recent && !REVIEWED_WEEKLY_CARDS.has(key) };
}
