// 마크다운 문법 스트립 — 플레인 텍스트 렌더용
// 사용처: Weekly / AB 섹션의 post.content, editorial, keyQuote 등
//
// 제거 대상:
//   **bold**, *italic*, __bold__, _italic_, `code`, ### 헤딩
//   [text](url) 링크
//   --- 이후의 답글/멘션 블록
//   인라인 @멘션 답글 줄
//   연속된 빈 줄 3개 이상

export function stripMarkdown(text: string | undefined | null): string {
  if (!text) return "";

  // 1) 답글/댓글 블록 제거 (--- 이후 @멘션 / 답변:)
  const commentBlockRegex = /\n*---\s*\n([\s\S]*?(@\w|답변:|답글:)[\s\S]*?)$/;
  let cleaned = text.replace(commentBlockRegex, "");

  // 2) 인라인 @멘션 답글 줄 제거
  cleaned = cleaned
    .split("\n")
    .filter(
      (line) =>
        !/^[-\s]*@\w+.*[:：]/.test(line) &&
        !/voidlight00\s*(답변|답글)/.test(line)
    )
    .join("\n");

  return (
    cleaned
      // 이미지/링크: ![alt](url) / [text](url) → text만
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      // 볼드/이탤릭
      .replace(/\*\*\*(.+?)\*\*\*/g, "$1") // ***bold italic***
      .replace(/\*\*(.+?)\*\*/g, "$1") // **bold**
      .replace(/(?<![*\w])\*(?!\*)([^*\n]+?)\*(?!\*)/g, "$1") // *italic* (단어 중간 제외)
      .replace(/___(.+?)___/g, "$1") // ___bold italic___
      .replace(/__(.+?)__/g, "$1") // __bold__
      .replace(/(?<![_\w])_(?!_)([^_\n]+?)_(?!_)/g, "$1") // _italic_
      // 헤딩
      .replace(/^#{1,6}\s+/gm, "")
      // 인라인/블록 코드
      .replace(/```[\s\S]*?```/g, (block) =>
        block.replace(/```[^\n]*\n?|```/g, "")
      )
      .replace(/`{1,3}([^`\n]+)`{1,3}/g, "$1")
      // 인용 부호
      .replace(/^>\s?/gm, "")
      // 남은 별표·언더스코어 쌍 (잘못 매칭된 잔재 정리)
      .replace(/\*{2,}/g, "")
      .replace(/_{2,}/g, "")
      // 연속 빈 줄 정리
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}
