// 운영자 연결 링크를 한 곳에서 정의합니다(리뉴얼 계획 R1).
// 헤더와 바닥글은 이 파일만 읽습니다. 주소를 바꿀 때는 이 파일 한 곳만 고칩니다.
// 주소는 공식 포트폴리오(voidlight.kr)와 GitHub 로그인 계정에서 확인한 값입니다(2026-11-01).

export type ChannelId =
  | "github"
  | "x"
  | "threads"
  | "kakao-group"
  | "kakao-direct"
  | "email"
  | "portfolio";

export interface Channel {
  /** 헤더 선택과 게이트 대조에 쓰는 고정 식별자입니다. */
  readonly id: ChannelId;
  /** 바닥글 '연결' 묶음의 화면 라벨입니다. */
  readonly label: string;
  readonly href: string;
  /** 링크의 접근 가능한 이름(aria-label)입니다. */
  readonly accessibleName: string;
  /** true면 새 탭으로 열고 rel="noopener noreferrer"를 붙입니다. 메일 링크는 false입니다. */
  readonly newTab: boolean;
}

/** 운영자 채널 7개. 바닥글은 이 순서대로 모두 보여 줍니다. */
export const CHANNELS: readonly Channel[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/VoidLight00",
    accessibleName: "GitHub 프로필, 새 탭",
    newTab: true,
  },
  {
    id: "x",
    label: "X @VoidLight_Hyeon",
    href: "https://x.com/VoidLight_Hyeon",
    accessibleName: "X 프로필, 새 탭",
    newTab: true,
  },
  {
    id: "threads",
    label: "Threads @voidlight00",
    href: "https://www.threads.com/@voidlight00",
    accessibleName: "Threads 프로필, 새 탭",
    newTab: true,
  },
  {
    id: "kakao-group",
    label: "카카오톡 그룹챗",
    href: "https://open.kakao.com/o/gugo7tCh",
    accessibleName: "카카오톡 그룹챗, 새 탭",
    newTab: true,
  },
  {
    id: "kakao-direct",
    label: "카카오 일대일 문의",
    href: "https://open.kakao.com/o/srSlAiLd",
    accessibleName: "카카오 일대일 문의, 새 탭",
    newTab: true,
  },
  {
    id: "email",
    label: "이메일",
    href: "mailto:icthyeon00@gmail.com",
    accessibleName: "이메일 보내기",
    newTab: false,
  },
  {
    id: "portfolio",
    label: "voidlight.kr",
    href: "https://voidlight.kr",
    accessibleName: "voidlight.kr 포트폴리오, 새 탭",
    newTab: true,
  },
];

/**
 * 헤더에 두는 채널과 짧은 라벨입니다. 이 순서대로 그립니다.
 * 480px 이하에서는 헤더에서 숨기고 바닥글 '연결' 묶음으로 대신합니다(app/globals.css `.site-nav-ext`).
 */
export const HEADER_CHANNELS: ReadonlyArray<{ readonly id: ChannelId; readonly label: string }> = [
  { id: "x", label: "X" },
  { id: "threads", label: "Threads" },
  { id: "github", label: "GitHub" },
];

export function getChannel(id: ChannelId): Channel {
  const channel = CHANNELS.find((item) => item.id === id);
  if (!channel) throw new Error(`lib/site-links.ts: unknown channel id "${id}"`);
  return channel;
}

/** 링크 요소에 펼칠 속성입니다. 새 탭 링크에만 target과 rel을 붙입니다. */
export function channelLinkProps(channel: Channel): {
  href: string;
  "aria-label": string;
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  const base = { href: channel.href, "aria-label": channel.accessibleName };
  return channel.newTab ? { ...base, target: "_blank", rel: "noopener noreferrer" } : base;
}

/** 바닥글 '안내' 묶음의 사이트 안 링크입니다. */
export const GUIDE_LINKS: ReadonlyArray<{ readonly id: string; readonly label: string; readonly href: string }> = [
  { id: "tos", label: "이용약관", href: "/tos/" },
  { id: "rss", label: "RSS", href: "/rss.xml" },
  { id: "ai-txt", label: "ai.txt", href: "/.well-known/ai.txt" },
];
