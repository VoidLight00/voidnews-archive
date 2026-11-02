// 작성 주체 판정(리뉴얼 계획 R3·3절, R24). 데이터 파일(lib/weeks/*.ts 등)의 기존 글은 고치지 않습니다.
//
//   사람 작성 목록에 있으면                      → 표시 없음
//   그 밖에는                                   → AI 작성('피움 작성 · AI')
//   주간 카드이고 게시기 표식(autoPublished)이
//   있거나 표식 도입 전 게시기 목록에 있으면      → AI 작성 + 게시기 판정(autoPublished: true)
//
// 게시기 판정은 출처 기록이며 화면에 그리지 않습니다. '자동 게시' 표시는 2026-11-02 사용자 요청으로 쓰지 않습니다
// (scripts/check-ai-author-label.mjs가 다시 그리면 실패합니다).
// 표식(R24, 2026-11-01): 매일 게시 작업(daily_publish.py)이 카드에 autoPublished: true를 쓰고
// scripts/emit-weeks.mjs가 그대로 옮깁니다. 사이트가 날짜로 추측하지 않으므로, AB 실행이 넣은 사람 검토 카드는
// 검토 목록 없이도 게시기 판정을 받지 않습니다. 이전 규칙(verifiedAt >= 2026-10-22, 검토 목록 제외)은 재검증
// 날짜만 바뀌어도 판정이 달라지는 한계가 있었습니다.
// 표식이 빠지면 판정도 경고 없이 빠지고, 빌드 게이트는 누가 카드를 올렸는지 모릅니다. 그래서 게시기가
// 커밋 전에 새 카드마다 표식을 확인하고 없으면 게시를 멈춥니다(daily_publish.py check_markers, FAIL[daily:marker]).

/** 구조화 데이터와 RSS에 쓰는 AI 작성자 이름(계획 3.2절). */
export const AI_AUTHOR_NAME = "피움(VoidNews AI)";

/** AI 작성과 판정 기준을 설명하는 안내 페이지(R12). 페이지가 생기면 경로를 넣어 기사 바이라인에서 연결합니다. */
export const AI_GUIDE_PATH: string | null = null;

/**
 * 표식을 쓰기 전에 매일 게시 작업이 올린 주간 카드 11건입니다(커밋 cb50cda·ee1005f·bfab11d). 형식: '주차 slug/카드 slug'.
 * 이전 날짜 규칙이 게시기 카드로 판정한 카드와 같으며, 데이터 파일을 고치지 않으려고 목록으로 둡니다. 새 카드는 넣지 않습니다.
 */
export const LEGACY_AUTO_PUBLISHED: ReadonlySet<string> = new Set([
  "2026-w44/google-deepmind-announces-gemini-4-carbon",
  "2026-w44/google-deepmind-genie-4-world-simulation",
  "2026-w44/ibm-granite-switch-4-1-1",
  "2026-w44/nvidia-nemotron-3-5-transcribe-granary-v2",
  "2026-w43/anthropic-claude-duet-research-preview",
  "2026-w43/elevenlabs-realtime-translation-alpha",
  "2026-w43/elevenlabs-eleven-realtime-mini-max",
  "2026-w43/hugging-face-torchtpu-native-pytorch-tpu-support",
  "2026-w43/ibm-granite-speech-transcription-translation-updates",
  "2026-w43/1password-for-agents-personal-ai-agent-login",
  "2026-w43/microsoft-ai-mai-dxo-medical-superintelligence",
]);

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
  /** 게시기 표식(Post.autoPublished). 매일 게시 작업이 사람 검토 없이 올린 카드에만 true입니다. 화면에는 그리지 않습니다. */
  autoPublished?: boolean;
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
  const marked = subject.autoPublished === true || LEGACY_AUTO_PUBLISHED.has(key);
  return { ai: true, autoPublished: weekly && marked };
}
