export interface Post {
  date: string;
  platform: "X" | "Threads" | "X+Threads";
  title: string;
  threadsUrl?: string;
  xUrl?: string;
}

export interface Company {
  name: string;
  color: string;
  posts: Post[];
}

export interface WeeklyData {
  week: number;
  year: number;
  slug: string; // "2026-w13"
  period: string;
  totalPosts: number;
  companies: Company[];
}

export const COMPANY_COLORS: Record<string, string> = {
  "Anthropic / Claude": "#E87040",
  "OpenAI": "#10A37F",
  "Google / DeepMind": "#4285F4",
  "Cursor": "#8B5CF6",
  "xAI / Grok": "#9CA3AF",
  "Meta": "#1877F2",
  "Midjourney / Luma / ElevenLabs": "#EC4899",
  "GitHub Copilot": "#24292E",
  "카카오": "#FAE100",
  "기타": "#6B7280",
};

export const weeks: WeeklyData[] = [
  {
    week: 13,
    year: 2026,
    slug: "2026-w13",
    period: "3/20 ~ 3/26",
    totalPosts: 44,
    companies: [
      {
        name: "Anthropic / Claude",
        color: "#E87040",
        posts: [
          { date: "3/26 20:41", platform: "Threads", title: "아티클 공유 — \"한국이 AI를 가장 잘 쓰고도 패배할 수 있는 이유\" (스레드 5개)", threadsUrl: "https://www.threads.com/@voidlight00/post/DWWKE-Fj-6k" },
          { date: "3/26 19:56", platform: "Threads", title: "Claude Code Tips & Tricks 스레드 5개 — CLAUDE.md, /resume, 서브에이전트, MCP", threadsUrl: "https://www.threads.com/@voidlight00/post/DWWE2Hhj0s2" },
          { date: "3/26 18:09", platform: "Threads", title: "Claude Code Auto Mode 심층 분석 스레드 7개 — 2단계 분류기, 3등급 행동, 성능 수치", threadsUrl: "https://www.threads.com/@voidlight00/post/DWV4mTpjwO5" },
          { date: "3/26 15:25", platform: "Threads", title: "Claude Code auto mode 공개 — AI 분류기 기반 안전한 자동 승인 시스템", threadsUrl: "https://www.threads.com/@voidlight00/post/DWVma6fj1O1" },
          { date: "3/26 13:26", platform: "X+Threads", title: "Claudian — Obsidian에 Claude Code 임베딩 플러그인 (스레드 5개)", threadsUrl: "https://www.threads.com/@voidlight00/post/DWVZ2fYDwOg", xUrl: "https://x.com/VoidLight_Hyeon/status/2037022613424468120" },
          { date: "3/25 19:37", platform: "Threads", title: "Anthropic 하네스 구조 스레드 7개 — 생성자/평가자/기획자 3인조, 문맥 불안 해결", threadsUrl: "https://www.threads.com/@voidlight00/post/DWTdz_Gj4cA" },
          { date: "3/25 14:25", platform: "X+Threads", title: "Claude Code Auto Mode — 권한 자동 판단 + AI 세이프가드, 승인 피로 없는 자율 실행", threadsUrl: "https://www.threads.com/@voidlight00/post/DWS6YXrj-qq" },
          { date: "3/25 07:23", platform: "Threads", title: "Anthropic Engineering Blog — 멀티에이전트 하네스로 장기 앱 개발", threadsUrl: "https://www.threads.com/@voidlight00/post/DWSKa44EwJQ" },
          { date: "3/25 02:00", platform: "X", title: "ai-dream 스레드 7개 — AI 에이전트 메모리 정리, 렘수면 컨셉, 오픈소스", xUrl: "https://x.com/VoidLight_Hyeon/status/2036489042725081337" },
          { date: "3/24 23:33", platform: "Threads", title: "Claude 10배 학습 프롬프트 10종", threadsUrl: "https://www.threads.com/@voidlight00/post/DWRUSzND55k" },
          { date: "3/24 15:51", platform: "X+Threads", title: "Claude Code Channels — 텔레그램/디스코드 통합" },
          { date: "3/24 15:23", platform: "X+Threads", title: "Anthropic Phone Use — 스마트폰 자율 제어 에이전트 개발 중", threadsUrl: "https://www.threads.com/@voidlight00/post/DWQdAQ7D1zH" },
          { date: "3/24 09:17", platform: "X+Threads", title: "Claude Computer Use (macOS) — 화면 직접 조작 에이전트", threadsUrl: "https://www.threads.com/@voidlight00/post/DWPzYNED4y_" },
          { date: "3/24 07:18", platform: "X+Threads", title: "Anthropic Science Blog 런칭 — 연구 논문 공개 채널", threadsUrl: "https://www.threads.com/@voidlight00/post/DWQdAQ7D1zH" },
          { date: "3/22 22:38", platform: "Threads", title: "Claude Code Skills 트리거 — 자동화 스킬 시스템" },
        ],
      },
      {
        name: "OpenAI",
        color: "#10A37F",
        posts: [
          { date: "3/25 05:22", platform: "X+Threads", title: "OpenAI Sora 중단 — 앱/API/ChatGPT 비디오 기능 종료, 최신 모델 'Spud' 훈련 완료", threadsUrl: "https://www.threads.com/@voidlight00/post/DWR8staE_tA" },
          { date: "3/24 13:17", platform: "X+Threads", title: "ChatGPT Library 탭 추가 — 생성 이미지 전용 갤러리 기능" },
          { date: "3/24 03:17", platform: "X+Threads", title: "Astral 인수 + ChatGPT/Codex 통합 — Python 패키지 생태계 장악" },
          { date: "3/23 21:17", platform: "X+Threads", title: "GPT-5.4 mini 출시 — 경량 고속 모델, API 공개" },
          { date: "3/21 02:58", platform: "X", title: "Codex for Students — 학생 무료 코딩 에이전트 프로그램" },
        ],
      },
      {
        name: "Google / DeepMind",
        color: "#4285F4",
        posts: [
          { date: "3/26 10:57", platform: "Threads", title: "DeepMind Lyria 3 Pro — 3분 음악 생성 시대, 프로 퀄리티 AI 작곡", threadsUrl: "https://www.threads.com/@voidlight00/post/DWVH56bj902" },
          { date: "3/25 06:49", platform: "Threads", title: "DeepMind x Agile Robots — 로봇 공학 AI 협업 발표", threadsUrl: "https://www.threads.com/@voidlight00/post/DWSGgURE3h7" },
          { date: "3/25 03:01", platform: "Threads", title: "Gemini 3.1 Flash-Lite — 초경량 고속 모델 출시", threadsUrl: "https://www.threads.com/@voidlight00/post/DWRsU8Fj_Xc" },
          { date: "3/23 13:17", platform: "X", title: "Google Stitch 업데이트 — Text-to-UI 생성 도구 기능 확장" },
          { date: "3/21 00:58", platform: "X", title: "AI Studio full-stack vibe coding — 백엔드/프론트 동시 생성 데모" },
        ],
      },
      {
        name: "Cursor",
        color: "#8B5CF6",
        posts: [
          { date: "3/26 06:54", platform: "Threads", title: "Cursor 클라우드 에이전트 자체 인프라 — 코드와 실행이 프라이빗 네트워크 내에 유지", threadsUrl: "https://www.threads.com/@voidlight00/post/DWUry1Gk0zD" },
          { date: "3/24 22:45", platform: "Threads", title: "Cursor Instant Grep 출시 — 코드베이스 실시간 검색 엔진 내장", threadsUrl: "https://www.threads.com/@voidlight00/post/DWRP2QxD7QI" },
          { date: "3/20 14:51", platform: "X+Threads", title: "Cursor Composer 2 출시 — 멀티파일 에이전트 편집 대폭 강화" },
        ],
      },
      {
        name: "xAI / Grok",
        color: "#9CA3AF",
        posts: [
          { date: "3/24 03:20", platform: "X+Threads", title: "xAI Terafab 발표 — 테라급 AI 팹 인프라 비전 공개 (재게시)" },
          { date: "3/22 17:07", platform: "X+Threads", title: "xAI Terafab 발표 — 자체 AI 반도체 제조 시설 계획" },
        ],
      },
      {
        name: "Meta",
        color: "#1877F2",
        posts: [
          { date: "3/26 14:58", platform: "Threads", title: "Meta + Arm AGI CPU 협력 — AI 인프라 맞춤형 CPU 2배 성능", threadsUrl: "https://www.threads.com/@voidlight00/post/DWVjjxpD2Sz" },
          { date: "3/25 03:07", platform: "Threads", title: "Meta + Arm CPU 파트너십 — 데이터센터 AI 워크로드 최적화", threadsUrl: "https://www.threads.com/@voidlight00/post/DWRtqYkj5gi" },
        ],
      },
      {
        name: "Midjourney / Luma / ElevenLabs",
        color: "#EC4899",
        posts: [
          { date: "3/25 22:52", platform: "X+Threads", title: "Luma Uni-1 출시 — 생각과 픽셀 생성을 동시에 수행하는 새로운 멀티모달 모델", threadsUrl: "https://www.threads.com/@voidlight00/post/DWT0x0Lj2wG" },
          { date: "3/25 18:48", platform: "X+Threads", title: "Midjourney V8 출시 — 5배 빠른 속도, 2K 네이티브, 향상된 텍스트/SREF", threadsUrl: "https://www.threads.com/@voidlight00/post/DWT7NYIj2E3" },
          { date: "3/20 14:52", platform: "X+Threads", title: "ElevenLabs Music Marketplace — AI 음악 거래 플랫폼 오픈" },
        ],
      },
      {
        name: "기타",
        color: "#6B7280",
        posts: [
          { date: "3/25 16:47", platform: "X+Threads", title: "카카오 Kanana-o API 베타 — 9.8B 옴니 모델, Agentic AI 특화, Apache 2.0", threadsUrl: "https://www.threads.com/@voidlight00/post/DWTLA81j3Vo", xUrl: "https://x.com/VoidLight_Hyeon/status/2036711028122386634" },
          { date: "3/24 22:50", platform: "Threads", title: "GitHub Copilot + Figma MCP 통합 — 디자인 → 코드 에이전트 파이프라인", threadsUrl: "https://www.threads.com/@voidlight00/post/DWRQJZVD0O1" },
          { date: "3/26 07:17", platform: "X+Threads", title: "ARC-AGI-3 벤치마크 공개 — AGI 측정 새 기준점", threadsUrl: "https://www.threads.com/@voidlight00/post/DWVRfebjz5Q" },
          { date: "3/20 22:58", platform: "X+Threads", title: "Google Workspace AI 통합 — Gemini 전 제품 내장 발표" },
          { date: "3/20 14:49", platform: "X+Threads", title: "Perplexity Computer 헬스케어 연동 — 의료 데이터 AI 에이전트" },
        ],
      },
    ],
  },
  {
    week: 12,
    year: 2026,
    slug: "2026-w12",
    period: "3/17 ~ 3/19",
    totalPosts: 14,
    companies: [
      {
        name: "Anthropic / Claude",
        color: "#E87040",
        posts: [
          { date: "3/19 19:00", platform: "X+Threads", title: "Claude Code 데스크탑 프리뷰 — 네이티브 앱 형태로 출시 예고" },
          { date: "3/19 18:30", platform: "X", title: "Anthropic 81K 직원 대규모 조사 — AI 안전성 연구 확대" },
          { date: "3/18 21:09", platform: "X+Threads", title: "Claw-Eval 벤치마크 — Claude 성능 자체 평가 지표 공개" },
          { date: "3/18", platform: "X", title: "Claude Code Skills 트리거 시스템 — 자동화 워크플로우" },
          { date: "3/18", platform: "X", title: "Claude Dispatch (Cowork) — 원격 에이전트 제어 프레임워크" },
        ],
      },
      {
        name: "Perplexity",
        color: "#6B7280",
        posts: [
          { date: "3/17 03:25", platform: "X+Threads", title: "Perplexity Comet + Computer 기능 — 브라우저 에이전트 확장" },
          { date: "3/17 01:22", platform: "X+Threads", title: "Perplexity Computer 안드로이드 출시 — 모바일 에이전트 정식 공개" },
        ],
      },
      {
        name: "기타",
        color: "#6B7280",
        posts: [
          { date: "3/22 19:05", platform: "X", title: "Mistral Forge 엔터프라이즈 — 기업용 파인튜닝 플랫폼 출시" },
          { date: "3/17 13:00", platform: "X+Threads", title: "Mistral Small 4 (119B, Apache 2.0) — 오픈소스 최강 경량 모델" },
          { date: "3/17 05:21", platform: "X+Threads", title: "xAI Grok TTS API — 5가지 음성 합성 API 공개" },
          { date: "3/19", platform: "X+Threads", title: "LTX-Video 2.3 — 고품질 AI 비디오 생성 모델 업데이트" },
          { date: "3/19", platform: "X+Threads", title: "Visa CLI + AI 에이전트 결제 — 에이전트 자율 결제 인프라" },
          { date: "3/19 18:50", platform: "X+Threads", title: "NVIDIA 오픈 모델 데이터셋 공개 — 학습 데이터 오픈소스화" },
          { date: "3/18", platform: "X+Threads", title: "ChatGPT 모델 셀렉터 업데이트 — UI 대폭 개선" },
        ],
      },
    ],
  },
];

export function getWeek(slug: string): WeeklyData | undefined {
  return weeks.find((w) => w.slug === slug);
}

export function getLatestSlug(): string {
  return weeks[0].slug;
}

export function getAllSlugs(): string[] {
  return weeks.map((w) => w.slug);
}
