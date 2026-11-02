"use client";

import { useLocale } from "@/app/LocaleProvider";
import { getAuthorship, type AuthorshipSubject } from "@/lib/authorship";
import { t, type Locale } from "@/lib/i18n";
import styles from "./AuthorBadge.module.css";

// 피움 작성 표시(리뉴얼 계획 R3·3.3절).
// - 그림은 /brand/pium.svg 원본 색을 두 테마에서 그대로 씁니다. 원형으로 자르거나 색을 바꾸지 않습니다.
// - 크기는 24px의 정수배만 씁니다: 카드·모달 24px, 기사 바이라인 48px.
// - 그림은 장식이라 alt를 비우고, 글자 라벨('피움 작성 · AI')을 항상 함께 둡니다.
// - 카드 전체가 링크인 자리에는 링크를 넣지 않습니다. href는 기사 바이라인에서 안내 페이지가 있을 때만 넘깁니다.
// - data-ai-author는 라벨 수를 세는 검사가 읽습니다.
// - '자동 게시' 표시는 쓰지 않습니다(2026-11-02 사용자 요청). 게시기 표식(autoPublished)은 출처 기록으로만 남고
//   lib/authorship.ts가 판정하지만, 화면에는 그리지 않습니다. 다시 그리면 check-ai-author-label.mjs가 실패합니다.

export type AuthorBadgeSize = 24 | 48;
/** muted: 보조 글자색 · inherit: 놓인 줄의 글자색(어두운 히어로) · strong: 기사 바이라인 */
export type AuthorBadgeTone = "muted" | "inherit" | "strong";

const AVATAR_SRC = "/brand/pium.svg";

export function AuthorBadge({
  subject,
  size = 24,
  tone = "muted",
  locale,
  href,
  id,
}: {
  subject: AuthorshipSubject;
  size?: AuthorBadgeSize;
  tone?: AuthorBadgeTone;
  locale?: Locale;
  href?: string;
  id?: string;
}) {
  const context = useLocale();
  const { ai } = getAuthorship(subject);
  if (!ai) return null;
  const lang = locale ?? context.locale;
  const body = (
    <>
      {/* 장식 그림이라 낮은 우선순위로 받습니다. React가 히어로 이미지와 함께 미리 받기 목록에 올리지 않게 합니다. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={AVATAR_SRC} alt="" width={size} height={size} className={styles.avatar} decoding="async" fetchPriority="low" />
      <span className={styles.text}>{t(lang, "author.pium")}</span>
    </>
  );
  const shared = { id, className: styles.badge, "data-ai-author": "pium", "data-size": size, "data-tone": tone };
  return href ? (
    <a href={href} {...shared}>
      {body}
    </a>
  ) : (
    <span {...shared}>{body}</span>
  );
}
