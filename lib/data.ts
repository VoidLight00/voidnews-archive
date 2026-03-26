export interface Post {
  date: string;
  platform: "X" | "Threads" | "X+Threads";
  title: string;
  summary?: string;      // 한줄 요약 (카드)
  content?: string;      // 전문 / 포스팅 본문
  source?: string;       // 원본 소스 URL
  threadsUrl?: string;
  xUrl?: string;
  tags?: string[];
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
          {
            date: "3/26 20:41", platform: "Threads",
            title: "\"한국이 AI를 가장 잘 쓰고도 패배할 수 있는 이유\" 아티클 공유",
            summary: "한국의 AI 활용 역설 — 사용률은 높지만 구조적 패배 가능성을 분석한 아티클",
            content: "ethancho12의 서브스택 아티클 공유 스레드 5개.\n\nAI를 가장 잘 쓰면서도 패배하는 역설 — 한국의 구조적 문제를 분석.\n도구를 쓰는 능력보다 '어떤 문제를 푸는가'가 더 중요하다는 관점.",
            source: "https://ethancho12.substack.com/p/ai-d53",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWWKE-Fj-6k",
          },
          {
            date: "3/26 19:56", platform: "Threads",
            title: "Claude Code Tips & Tricks 심층 스레드 5개",
            summary: "CLAUDE.md 활용법, /resume, 서브에이전트, MCP 핵심 팁 정리",
            content: "원본: post-training.aitinkerers.org\n\n핵심 팁 5가지:\n1. CLAUDE.md — 프로젝트별 컨텍스트 파일\n2. /resume — 세션 재개로 컨텍스트 유지\n3. 서브에이전트 분기 — 병렬 작업 처리\n4. MCP 연동 — 외부 도구 직접 접근\n5. 권한 모드 bypassPermissions 활용",
            source: "https://post-training.aitinkerers.org/p/claude-code-tips-and-tricks",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWWE2Hhj0s2",
          },
          {
            date: "3/26 18:09", platform: "Threads",
            title: "Claude Code Auto Mode 심층 분석 스레드 7개",
            summary: "2단계 분류기, 3등급 행동 체계, 승인 피로 해결 메커니즘 완전 분석",
            content: "Auto Mode의 내부 작동 원리 7개 스레드로 분석.\n\n핵심 구조:\n- 1단계: 행동 안전성 분류기 (safe/moderate/dangerous)\n- 2단계: 컨텍스트 기반 재분류\n- 3등급: 자동승인 / 단순확인 / 명시적승인\n\n성능: 95% 작업 자동 처리, 승인 요청 83% 감소\nAI 세이프가드로 위험 행동 필터링",
            source: "https://x.com/AnthropicAI/status/2036944806317088921",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWV4mTpjwO5",
          },
          {
            date: "3/26 15:25", platform: "Threads",
            title: "Claude Code auto mode 정식 공개",
            summary: "AI 분류기 기반 안전한 자동 승인 — 승인 피로 없는 자율 실행 시스템",
            content: "Claude Code auto mode 출시.\n\n- AI 분류기가 각 행동의 위험도를 실시간 판단\n- 안전한 행동은 자동 승인, 위험한 행동만 확인 요청\n- 승인 피로(approval fatigue) 대폭 감소\n- claude --auto 플래그로 활성화",
            source: "https://claude.com/blog/auto-mode",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVma6fj1O1",
          },
          {
            date: "3/26 13:26", platform: "X+Threads",
            title: "Claudian — Obsidian에 Claude Code 임베딩 플러그인",
            summary: "Obsidian 노트에 Claude Code를 직접 내장 — 노트 작성 중 AI 코딩 에이전트 실행",
            content: "tom_doerr의 Claudian 플러그인 소개 스레드 5개.\n\nObsidian 볼트 안에서 Claude Code를 직접 실행.\n- 노트 내 코드 블록 실행\n- 파일 탐색 및 수정\n- MCP 연동\n\n지식 관리 + AI 코딩의 결합.",
            source: "https://x.com/tom_doerr/status/2036564539748049212",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVZ2fYDwOg",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037022613424468120",
          },
          {
            date: "3/25 19:37", platform: "Threads",
            title: "Anthropic 하네스 구조 심층 스레드 7개",
            summary: "생성자/평가자/기획자 3인조 멀티에이전트 아키텍처 완전 분석",
            content: "Anthropic Engineering Blog의 하네스 구조 심층 분석.\n\n3인조 체계:\n- 생성자(Generator): 코드/콘텐츠 생성\n- 평가자(Evaluator): 품질 검증\n- 기획자(Planner): 전략 수립 및 조율\n\n문맥 불안(context anxiety) 해결:\n- 각 에이전트가 독립적 컨텍스트 유지\n- 공유 메모리로 협업\n- 실패 시 자동 재시도 로직",
            source: "https://anthropic.com/engineering/harness-design-for-long-running-application-development",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWTdz_Gj4cA",
          },
          {
            date: "3/25 14:25", platform: "X+Threads",
            title: "Claude Code Auto Mode 공식 출시",
            summary: "권한 자동 판단 + AI 세이프가드 — 승인 없이 안전하게 자율 실행",
            source: "https://claude.com/blog/auto-mode",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWS6YXrj-qq",
          },
          {
            date: "3/25 07:23", platform: "Threads",
            title: "Anthropic Engineering Blog — 멀티에이전트 하네스로 장기 앱 개발",
            summary: "장기 실행 앱 개발을 위한 멀티에이전트 하네스 설계 공식 블로그",
            source: "https://x.com/AnthropicAI/status/2036481033621623056",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWSKa44EwJQ",
          },
          {
            date: "3/25 02:00", platform: "X",
            title: "ai-dream — AI 에이전트 메모리 정리 (렘수면 컨셉) 오픈소스",
            summary: "에이전트가 렘수면처럼 기억을 정리·압축하는 메모리 아키텍처 직접 구현",
            content: "직접 개발한 ai-dream 공개 스레드 7개.\n\n컨셉: AI 에이전트의 기억을 인간의 렘수면처럼 정리\n- 단기 기억 → 장기 기억 압축\n- 중요도 기반 필터링\n- 벡터 임베딩으로 의미 보존\n\nGitHub: VoidLight00/ai-dream\nApache 2.0 오픈소스",
            source: "https://github.com/VoidLight00/ai-dream",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2036489042725081337",
          },
          {
            date: "3/24 23:33", platform: "Threads",
            title: "Claude 10배 학습 프롬프트 10종 큐레이션",
            summary: "Claude로 학습 효율을 극대화하는 검증된 프롬프트 10가지 정리",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRUSzND55k",
          },
          {
            date: "3/24 15:51", platform: "X+Threads",
            title: "Claude Code Channels — 텔레그램/디스코드 통합 발표",
            summary: "Claude Code와 메시징 플랫폼 직접 연동 — 채널에서 코딩 에이전트 제어",
          },
          {
            date: "3/24 15:23", platform: "X+Threads",
            title: "Anthropic Phone Use — 스마트폰 자율 제어 에이전트 개발 중",
            summary: "Computer Use에 이은 Phone Use — AI가 스마트폰을 직접 제어하는 에이전트",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWQdAQ7D1zH",
          },
          {
            date: "3/24 09:17", platform: "X+Threads",
            title: "Claude Computer Use (macOS) 데모",
            summary: "Claude가 macOS 화면을 직접 보고 클릭·입력하는 컴퓨터 제어 에이전트",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWPzYNED4y_",
          },
          {
            date: "3/24 07:18", platform: "X+Threads",
            title: "Anthropic Science Blog 공식 런칭",
            summary: "Anthropic의 연구 논문·기술 블로그 공식 채널 오픈",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWQdAQ7D1zH",
          },
          {
            date: "3/22 22:38", platform: "Threads",
            title: "Claude Code Skills 트리거 시스템",
            summary: "특정 조건에서 자동으로 스킬을 불러오는 트리거 기반 자동화 시스템",
          },
        ],
      },
      {
        name: "OpenAI",
        color: "#10A37F",
        posts: [
          {
            date: "3/25 05:22", platform: "X+Threads",
            title: "OpenAI Sora 서비스 중단",
            summary: "Sora 앱/API/ChatGPT 비디오 기능 전면 종료 — 차세대 모델 'Spud' 훈련 완료",
            content: "OpenAI가 Sora 서비스를 전면 중단.\n\n중단 범위:\n- Sora 독립 앱\n- Sora API\n- ChatGPT 내 비디오 생성 기능\n\n공식 이유: 차세대 비디오 모델 'Spud' 훈련 완료로 전환 준비.\n기존 Sora 대비 대폭 향상된 품질과 속도 예상.",
            source: "https://x.com/soraofficialapp/status/2036532672824922489",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWR8staE_tA",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2036538807177322904",
          },
          {
            date: "3/24 13:17", platform: "X+Threads",
            title: "ChatGPT Library 탭 신규 추가",
            summary: "AI 생성 이미지 전용 갤러리 탭 — ChatGPT 내 이미지 히스토리 관리",
            content: "ChatGPT에 Library 탭 추가.\n\n기능:\n- DALL-E로 생성한 이미지 전체 보관\n- 날짜/프롬프트 기반 검색\n- 생성 이미지 재편집 및 변형\n- 갤러리 뷰로 한눈에 확인",
          },
          {
            date: "3/24 03:17", platform: "X+Threads",
            title: "OpenAI, Astral 인수 + Codex 통합 발표",
            summary: "Python 패키지 관리 도구 Astral 인수 — ChatGPT/Codex와 Python 생태계 통합",
            content: "OpenAI가 Astral(uv, ruff 개발사) 인수 발표.\n\nAstral의 주요 도구:\n- uv: 초고속 Python 패키지 관리자\n- ruff: 초고속 Python 린터\n\nChatGPT/Codex 에이전트가 Python 환경을 자동으로 설정하는 워크플로우 강화 예상.",
          },
          {
            date: "3/23 21:17", platform: "X+Threads",
            title: "GPT-5.4 mini 출시",
            summary: "경량 고속 모델 GPT-5.4 mini API 공개 — 저비용 추론 특화",
          },
          {
            date: "3/21 02:58", platform: "X",
            title: "Codex for Students 프로그램 출시",
            summary: "학생 대상 무료 AI 코딩 에이전트 — 교육 목적 Codex 접근권 제공",
          },
        ],
      },
      {
        name: "Google / DeepMind",
        color: "#4285F4",
        posts: [
          {
            date: "3/26 10:57", platform: "Threads",
            title: "DeepMind Lyria 3 Pro — AI 음악 생성 새 시대",
            summary: "3분 길이 프로 퀄리티 음악 생성 — Lyria 3 Pro로 음악 창작의 한계 돌파",
            content: "Google DeepMind의 Lyria 3 Pro 출시.\n\n주요 스펙:\n- 최대 3분 길이 고품질 음악 생성\n- 장르/분위기/악기 세밀한 제어\n- 전문가 수준 믹싱 품질\n- YouTube Music 크리에이터 도구 통합\n\n기존 Lyria 2 대비 표현력 3배 향상.",
            source: "https://x.com/GoogleDeepMind/status/2036836176233918707",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVH56bj902",
          },
          {
            date: "3/25 06:49", platform: "Threads",
            title: "DeepMind x Agile Robots 협업 발표",
            summary: "로봇 AI 연구 협업 — DeepMind 알고리즘 + Agile Robots 하드웨어 결합",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWSGgURE3h7",
          },
          {
            date: "3/25 03:01", platform: "Threads",
            title: "Gemini 3.1 Flash-Lite 출시",
            summary: "초경량 고속 Gemini 모델 — 모바일/엣지 환경 특화 추론",
            content: "Gemini 3.1 Flash-Lite 공개.\n\n특징:\n- 기존 Flash 대비 50% 빠른 추론\n- 모바일 온디바이스 실행 최적화\n- 멀티모달 (텍스트+이미지)\n- API 비용 대폭 인하",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRsU8Fj_Xc",
          },
          {
            date: "3/23 13:17", platform: "X",
            title: "Google Stitch 업데이트",
            summary: "Text-to-UI 생성 도구 기능 확장 — 음성 입력, 컴포넌트 라이브러리 추가",
          },
          {
            date: "3/21 00:58", platform: "X",
            title: "AI Studio full-stack vibe coding 데모",
            summary: "Gemini로 프론트엔드+백엔드 동시 생성 — full-stack 앱 바이브 코딩 시연",
          },
        ],
      },
      {
        name: "Cursor",
        color: "#8B5CF6",
        posts: [
          {
            date: "3/26 06:54", platform: "Threads",
            title: "Cursor 클라우드 에이전트 자체 인프라 지원",
            summary: "코드와 실행이 프라이빗 네트워크 내에서 완결 — 외부 유출 없는 보안 에이전트",
            content: "Cursor가 자체 클라우드 에이전트 인프라 발표.\n\n핵심:\n- 코드 실행 환경이 고객의 프라이빗 네트워크 내에 유지\n- 외부 API 호출 없이 완결된 에이전트 실행\n- 엔터프라이즈 보안 요구사항 충족\n- SOC2 / GDPR 준수",
            source: "https://cursor.com",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWUry1Gk0zD",
          },
          {
            date: "3/24 22:45", platform: "Threads",
            title: "Cursor Instant Grep 출시",
            summary: "코드베이스 실시간 검색 내장 엔진 — grep보다 빠른 의미론적 코드 검색",
            content: "Cursor에 Instant Grep 기능 통합.\n\n- 코드베이스 전체 실시간 인덱싱\n- 심볼/함수/클래스 즉시 검색\n- 의미론적 검색 (이름 몰라도 기능으로 검색)\n- 검색 결과에서 바로 편집",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRP2QxD7QI",
          },
          {
            date: "3/20 14:51", platform: "X+Threads",
            title: "Cursor Composer 2 출시",
            summary: "멀티파일 에이전트 편집 대폭 강화 — 대규모 리팩토링 자동화",
            content: "Cursor Composer 2 메이저 업데이트.\n\n개선사항:\n- 멀티파일 동시 편집 안정성 향상\n- 대규모 리팩토링 자동 계획 수립\n- 의존성 자동 추적 및 업데이트\n- 실행 취소/재실행 히스토리 강화",
          },
        ],
      },
      {
        name: "xAI / Grok",
        color: "#9CA3AF",
        posts: [
          {
            date: "3/24 03:20", platform: "X+Threads",
            title: "xAI Terafab 발표 (재공유)",
            summary: "테라급 AI 제조 인프라 — xAI 자체 반도체 팹 비전 재공유",
          },
          {
            date: "3/22 17:07", platform: "X+Threads",
            title: "xAI Terafab 최초 발표",
            summary: "자체 AI 반도체 제조 시설 계획 공개 — 수십억 달러 규모 팹 건설 비전",
            content: "Elon Musk의 xAI가 Terafab 발표.\n\n비전:\n- 자체 AI 칩 설계 및 제조\n- TSMC 의존도 탈피\n- 2027년 첫 생산 목표\n- Grok 전용 최적화 아키텍처\n\nNVIDIA H100 대비 10배 에너지 효율 목표",
          },
        ],
      },
      {
        name: "Meta",
        color: "#1877F2",
        posts: [
          {
            date: "3/26 14:58", platform: "Threads",
            title: "Meta + Arm AGI CPU 협력 심층 분석",
            summary: "AGI 워크로드 전용 CPU 공동 개발 — 기존 대비 2배 성능, AI 추론 특화",
            content: "Meta와 Arm이 AGI 특화 CPU 공동 개발 발표.\n\n주요 스펙:\n- AI 추론 전용 명령어셋 설계\n- 기존 Arm CPU 대비 2배 성능\n- 에너지 효율 40% 향상\n- Meta 데이터센터 우선 적용\n\n2025년 하반기 첫 실리콘 타겟.",
            source: "https://x.com/Meta_Engineers/status/2036494803723043156",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVjjxpD2Sz",
          },
          {
            date: "3/25 03:07", platform: "Threads",
            title: "Meta + Arm CPU 파트너십 발표",
            summary: "데이터센터 AI 워크로드 최적화 CPU 협력 — 클라우드 AI 인프라 독립화",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRtqYkj5gi",
          },
        ],
      },
      {
        name: "이미지 / 영상 / 음악",
        color: "#EC4899",
        posts: [
          {
            date: "3/25 22:52", platform: "X+Threads",
            title: "Luma Uni-1 출시 — 생각과 픽셀을 동시에",
            summary: "추론과 이미지 생성을 단일 패스로 처리하는 새로운 멀티모달 아키텍처",
            content: "Luma AI의 Uni-1 모델 공개.\n\n혁신:\n- Thinking과 Image Generation을 단일 모델에서 동시 처리\n- 추론 과정에서 시각적 표현 생성\n- 텍스트-이미지 일관성 대폭 향상\n- 멀티턴 이미지 편집 지원",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWT0x0Lj2wG",
          },
          {
            date: "3/25 18:48", platform: "X+Threads",
            title: "Midjourney V8 출시",
            summary: "5배 빠른 속도, 2K 네이티브 해상도, SREF 강화 — AI 이미지 생성의 새 기준",
            content: "Midjourney V8 정식 출시.\n\n주요 업그레이드:\n- 생성 속도 5배 향상\n- 2K 네이티브 해상도 지원\n- 텍스트 렌더링 정확도 대폭 향상\n- SREF(Style Reference) 기능 강화\n- 프롬프트 이해도 전반적 개선\n- 인물 일관성(Character Reference) 개선",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWT7NYIj2E3",
          },
          {
            date: "3/20 14:52", platform: "X+Threads",
            title: "ElevenLabs Music Marketplace 오픈",
            summary: "AI 생성 음악 거래 플랫폼 — 크리에이터가 AI 음악을 판매하는 마켓플레이스",
          },
        ],
      },
      {
        name: "기타",
        color: "#6B7280",
        posts: [
          {
            date: "3/25 16:47", platform: "X+Threads",
            title: "카카오 Kanana-o API 베타 공개",
            summary: "9.8B 옴니 모델, Agentic AI 특화, Apache 2.0 오픈소스 — 한국형 AI API",
            content: "카카오의 Kanana-o 모델 API 베타 공개.\n\n스펙:\n- 파라미터: 9.8B\n- 멀티모달 옴니 아키텍처\n- Agentic 작업 특화 (도구 사용, 계획 수립)\n- 라이선스: Apache 2.0 오픈소스\n\nAPI 엔드포인트: api-omni.kanana.ai",
            source: "https://api-omni.kanana.ai/",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWTLA81j3Vo",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2036711028122386634",
          },
          {
            date: "3/24 22:50", platform: "Threads",
            title: "GitHub Copilot + Figma MCP 통합",
            summary: "Figma 디자인에서 코드로 — MCP 통해 디자인 토큰 직접 읽는 Copilot 에이전트",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRQJZVD0O1",
          },
          {
            date: "3/26 07:17", platform: "X+Threads",
            title: "ARC-AGI-3 벤치마크 공개",
            summary: "AGI 측정 새 기준점 — 기존 ARC-AGI보다 어렵고 다양한 추론 평가 체계",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVRfebjz5Q",
          },
          {
            date: "3/20 22:58", platform: "X+Threads",
            title: "Google Workspace AI 전 제품 통합",
            summary: "Gemini가 Gmail, Docs, Sheets, Meet 전체에 내장 — AI 워크스페이스 완성",
          },
          {
            date: "3/20 14:49", platform: "X+Threads",
            title: "Perplexity Computer 헬스케어 연동",
            summary: "의료 데이터베이스와 연결된 AI 에이전트 — 증상 분석 및 의료 정보 검색",
          },
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
          { date: "3/19 19:00", platform: "X+Threads", title: "Claude Code 데스크탑 프리뷰 공개", summary: "네이티브 앱 형태의 Claude Code — 터미널 없이 데스크탑에서 코딩 에이전트 실행" },
          { date: "3/19 18:30", platform: "X", title: "Anthropic 81K 직원 조사 발표", summary: "81,000명 대상 AI 사용 패턴 연구 — 생산성 영향 정량 분석" },
          { date: "3/18 21:09", platform: "X+Threads", title: "Claw-Eval 벤치마크 공개", summary: "Claude 성능 자체 평가 지표 — 실제 코딩 작업 기반 벤치마크" },
          { date: "3/18", platform: "X", title: "Claude Code Skills 트리거 시스템", summary: "특정 조건에서 자동으로 스킬을 불러오는 트리거 자동화" },
          { date: "3/18", platform: "X", title: "Claude Dispatch (Cowork) 원격 제어", summary: "원격에서 Claude 에이전트를 지휘하는 Dispatch 프레임워크" },
        ],
      },
      {
        name: "기타",
        color: "#6B7280",
        posts: [
          { date: "3/17 03:25", platform: "X+Threads", title: "Perplexity Comet + Computer 기능 확장", summary: "브라우저 에이전트 Comet에 Computer Use 기능 통합" },
          { date: "3/17 01:22", platform: "X+Threads", title: "Perplexity Computer 안드로이드 출시", summary: "모바일 에이전트 정식 공개 — 안드로이드 화면 자율 제어" },
          { date: "3/22 19:05", platform: "X", title: "Mistral Forge 엔터프라이즈 출시", summary: "기업용 파인튜닝 플랫폼 — 프라이빗 Mistral 모델 구축 서비스" },
          { date: "3/17 13:00", platform: "X+Threads", title: "Mistral Small 4 (119B, Apache 2.0)", summary: "오픈소스 최강 경량 모델 — Apache 2.0으로 자유롭게 활용 가능" },
          { date: "3/17 05:21", platform: "X+Threads", title: "xAI Grok TTS API 5가지 음성 공개", summary: "Grok 기반 텍스트-음성 변환 API — 5가지 음성 스타일 선택 가능" },
          { date: "3/19", platform: "X+Threads", title: "LTX-Video 2.3 업데이트", summary: "고품질 AI 비디오 생성 모델 — 해상도 및 일관성 대폭 개선" },
          { date: "3/19", platform: "X+Threads", title: "Visa CLI + AI 에이전트 결제 인프라", summary: "에이전트가 직접 결제하는 시대 — Visa API로 자율 결제 가능" },
          { date: "3/19 18:50", platform: "X+Threads", title: "NVIDIA 오픈 모델 데이터셋 공개", summary: "학습 데이터 오픈소스화 — AI 연구 생태계 기여" },
          { date: "3/18", platform: "X+Threads", title: "ChatGPT 모델 셀렉터 UI 개선", summary: "더 직관적인 모델 선택 인터페이스 — GPT-4o/4/3.5 전환 간소화" },
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
