// AB 발표 2회차 — 2026-04b (Volume 2)
// 2026-04-13 ~ 2026-04-23 기간의 핵심 공식 발표 12건 + 추천 항목 1건
// 발표일: 2026-04-23 (목)

import type { ABEdition } from "../data";

export const edition2026_04b: ABEdition = {
  slug: "2026-04b",
  volume: 2,
  title: "Opus 4.7·GPT Image 2.0·Cloud Next — 한 주에 쏟아진 공식 발표",
  theme:
    "2026년 4월 후반기 — Anthropic·OpenAI·Google·중국 오픈소스가 같은 주에 내놓은 공식 릴리스와, 그 사이를 파고든 '구스 벤치마크'",
  period: "2026-04-13 ~ 2026-04-23",
  coveredWeeks: ["2026-w16"],
  announceDate: "2026-04-23",

  intro:
    "이번 2주는 거대 AI 제품이 \"같은 주에 겹쳐서\" 터진 기이한 집중의 주간이었습니다.\n\nAnthropic은 Opus 4.7 + Claude Design + Claude Code 재설계를 연달아 던졌고, OpenAI는 Arena 1위를 새로 쓴 GPT Image 2.0을 내놓았으며, Google은 Cloud Next '26에서 Gemini App for Mac을 포함한 대형 업데이트를 쏟아냈습니다.\n\n거기에 중국 오픈소스 양강(Kimi K2.6 1T MoE, Qwen3.6 Dense+MoE 동시 공개)과 한국 커뮤니티의 Gemma 튜닝본(SuperGemma4), 그리고 3D 월드·아바타 생성까지 — \"어느 한 회사의 독점 주도\"가 아니라 \"전선 전체가 한꺼번에 움직인\" 구간이었습니다.\n\n그 한복판에 개인적으로 좋아하는 마블 캐릭터 '구스(Goose)'를 덕테이프로 감싼 실사 프롬프트로 이번 GPT Image 2.0을 직접 테스트해봤고, 결과는 이 브리핑의 hero 카드로 정리합니다.",

  closing:
    "이번 브리핑의 핵심 메시지는 세 줄로 정리됩니다.\n\n1. **이미지 생성 새 1위** — GPT Image 2.0이 Arena 1512점으로 전임 대비 +271점. 텍스트 렌더링·한국어 비라틴 문자·가상 캐릭터 재현까지 약점을 동시에 돌파.\n\n2. **오픈소스 모델 경쟁의 질적 변화** — Kimi K2.6 (1T MoE, Modified MIT) · Qwen3.6 (Dense+MoE 병렬) · SuperGemma4 (한국 커뮤니티 튜닝본). 이제 오픈소스는 \"규모\"가 아니라 \"조합\"으로 움직입니다.\n\n3. **실용 도구가 마지막 손익분기점** — GPT-5.5가 이번 주 출시 예정(Polymarket 4/23 92%)이지만, 결국 수강생이 써보는 건 CodeBurn 같은 실전 대시보드. 토큰·비용을 숫자로 관리하지 않으면 모델 질주의 비용은 고스란히 사용자가 떠안습니다.\n\n다음 2주는 GPT-5.5 공식 출시 후 Anthropic·Google의 즉각 대응과, 오픈소스 진영이 이 속도를 따라가는지를 볼 차례입니다.\n\n— VoidLight",

  highlights: [
    /* ═══════════ HERO — GPT Image 2.0 + 구스 벤치마크 ═══════════ */
    {
      rank: 1,
      tier: "hero",
      post: {
        date: "4/22",
        platform: "X",
        title:
          'GPT Image 2.0 (gpt-image-2) 출시 — Arena 1512점 1위 + "구스 벤치마크" 통과',
        summary:
          "Text-to-Image Arena 2026-04-19 기준 1512±8점으로 1위. 전임 gpt-image-1.5 대비 +271, 2위 Gemini 3.1 Flash Image 대비 +242. 텍스트·UI·한국어 비라틴 문자 렌더링 동시 돌파.",
        content:
          '🧪 구스 벤치마크(Goose Benchmark): 제가 좋아하는 마블 캐릭터 "구스(Goose)"를 덕테이프로 감싼 실사 이미지 테스트. Captain Marvel에 등장하는 Flerken(외계 고양이)이라는 가상 생물인데, GPT Image 2.0이 처음으로 실사 스타일로 정확히 표현해냈습니다. 실존하지 않는 상상의 매개체일수록 AI 이미지 모델이 취약해지는 약점을 일부러 겨냥한 프롬프트였는데, 이번 모델이 그 한계를 제대로 돌파했습니다.\n\n── 출시 개요 ──\nChatGPT + Codex 전 사용자 공개. 2K 해상도, 텍스트·아이콘·UI 요소 렌더링 강화로 메뉴판·인포그래픽 수준 텍스트 이미지 실사용 가능. 한국어·일본어·힌디어·벵골어 등 비라틴 문자 렌더링 개선. 웹 검색 + 다중 이미지 생성 지원.\n\n── Text-to-Image Arena 리더보드 (2026-04-19) ──\n1위 gpt-image-2 (medium) — 1512±8 / 15,127 votes\n2위 Gemini 3.1 Flash Image — 1270±5 / +242\n3위 Gemini 3 Pro Image 2K — 1244±4 / +268\n4위 gpt-image-1.5 high-fidelity (전임) — 1241±4 / +271\n5위 Gemini 3 Pro Image — 1232±5 / +280\n\n공식 벤치마크 아카이브: https://arena.ai/leaderboard/text-to-image',
        officialUrl:
          "https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/",
        source:
          "https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/",
        backupUrls: [
          { label: "Arena 벤치마크", url: "https://arena.ai/leaderboard/text-to-image" },
          { label: "OpenAI 공식", url: "https://openai.com/index/images-2-0/" },
          { label: "GPT Image 2.0 아카이브 (제작)", url: "https://gptimage2-0.vercel.app/" },
        ],
        tags: ["OpenAI", "이미지생성", "Arena1위", "구스벤치마크", "한국어렌더링"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "OpenAI",
      keyQuote: "구스 벤치마크 통과 — Arena 1512점으로 전임 대비 +271",
      editorial:
        '이번 회차의 중심축. 공식 벤치마크 수치(Arena 1위, +271)만으로도 충분하지만, 진짜 신호는 "가상 캐릭터 재현"이라는 AI 이미지 모델의 오래된 약점을 돌파했다는 점. 마블 구스처럼 존재하지 않는 매개체일수록 모델이 취약했는데, GPT Image 2.0이 그 한계를 정리했습니다. 수강생이 당장 ChatGPT에서 써볼 수 있는 범용 공개 모델로 이 수준이 나온 건 "이미지 생성 시장이 완전히 재편됐다"는 선언에 가깝습니다.',
    },

    /* ═══════════ FEATURE — Anthropic 한 주 독주 ═══════════ */
    {
      rank: 2,
      tier: "feature",
      post: {
        date: "4/16",
        platform: "X",
        title:
          "Claude Opus 4.7 정식 출시 — Agentic Coding step-change + xhigh/task budget/1M ctx/2576px 비전",
        summary:
          "현존 가장 강력한 generally-available 모델. 1M 토큰 컨텍스트·128k 출력·$5/$25 가격 동결. xhigh 노력 수준, task budget 베타, /ultrareview 슬래시 커맨드.",
        content:
          "현존 가장 강력한 generally-available 모델 (API ID: claude-opus-4-7). 1M 토큰 컨텍스트·128k 출력·$5/$25 가격 동결. xhigh 노력 수준, task budget 베타, /ultrareview 슬래시 커맨드, 2576px 고해상도 비전. 공식 SWE-Bench 수치 미기재(서드파티 리더보드 기준 87.6% 루머).",
        officialUrl: "https://www.anthropic.com/news/claude-opus-4-7",
        source: "https://www.anthropic.com/news/claude-opus-4-7",
        backupUrls: [
          { label: "X 공식 게시글", url: "https://x.com/claudeai/status/2044785261393977612" },
          { label: "Anthropic 공식", url: "https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7" },
        ],
        tags: ["Anthropic", "Opus4.7", "AgenticCoding", "xhigh"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "Anthropic / Claude",
      keyQuote: "1M 토큰 · xhigh · task budget · /ultrareview",
      editorial:
        "생태계 기반 모델. 가격은 4.6과 동일 동결인데 토크나이저 변경으로 동일 입력 토큰 생성량 1.3~1.45배 증가 → 실질 세션 비용 약 +37%. 기존 프롬프트·자동화 전부 재조정 필요. xhigh와 task budget은 장시간 agentic 작업을 감독 없이 맡기기 위한 '토큰 예산 계약'의 시작.",
    },
    {
      rank: 3,
      tier: "feature",
      post: {
        date: "4/17",
        platform: "X",
        title:
          "Claude Design 공개 — 프롬프트로 프로토타입·슬라이드·원페이지 생성 + Claude Code 핸드오프",
        summary:
          "Anthropic Labs의 첫 상용 제품. 대화형으로 프로토타입·슬라이드·원페이저 생성. Figma 주가 -7.28%, Adobe 동반 하락.",
        content:
          "Anthropic Labs 첫 상용 제품. Opus 4.7 비전 모델 구동으로 대화형 프로토타입·슬라이드·원페이저 생성. 디자이너 없이 파운더·PM·마케터가 시각 자산 제작. 프롬프트 → 커스텀 슬라이더·인라인 편집·코멘트 → Canva·PDF·PPTX·HTML·Claude Code 핸드오프. Pro·Max·Team·Enterprise 리서치 프리뷰. Figma 주가 -7.28%, Adobe 동반 하락으로 시장 임팩트 즉시 확인.",
        officialUrl: "https://www.anthropic.com/news/claude-design-anthropic-labs",
        source: "https://www.anthropic.com/news/claude-design-anthropic-labs",
        backupUrls: [
          { label: "X 공식 게시글", url: "https://x.com/claudeai/status/2045156267690213649" },
        ],
        tags: ["Anthropic", "디자인AI", "Figma흔들림", "프로토타입"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "Anthropic / Claude",
      keyQuote: "Figma 주가 -7.28% · Adobe 동반 하락",
      editorial:
        "디자이너 없는 1인 창업자·PM·강사가 시각 자산 스택을 통째로 건너뛸 수 있게 된 순간. 수강생 중 디자인 외주 비용으로 월 수십만원 쓰는 분은 즉시 리서치 프리뷰 신청 가치 있음. 팀 디자인 시스템 학습은 아직 반복이 필요하지만, Canva·PPTX·HTML·Claude Code 핸드오프가 다 되는 워크플로우는 경쟁 제품 대비 완성도가 다름.",
    },
    {
      rank: 4,
      tier: "feature",
      post: {
        date: "4/20",
        platform: "X",
        title:
          "Kimi K2.6 (Moonshot) — 1T MoE 멀티모달 + Agent Swarm 300 sub-agents (Modified MIT, 4/20)",
        summary:
          "1T 총 파라미터 / 32B activated, 384 전문가 MoE. K2.5 대비 SWE-Bench Pro +7.9, BrowseComp Agent Swarm +11.4. 신규 Agent Swarm 300 sub-agents + 4000 coordinated steps.",
        content:
          "Moonshot AI 플래그십. 1T 총 파라미터 / 32B activated, 384 전문가(토큰당 8개 선택) MoE. MoonViT 비전 인코더(400M) 네이티브 멀티모달, 256K 컨텍스트.\n\n── K2.5 대비 개선 ──\nSWE-Bench Pro 58.6 (+7.9)\nHLE w/tools 54.0 (+3.8)\nBrowseComp Agent Swarm 86.3 (+11.4)\nAIME 2026 96.4\n\n── 신규 역량 ──\nAgent Swarm 300 sub-agents · 4000 coordinated steps, 24/7 자율 백그라운드 실행.\n\nModified MIT 라이선스 오픈소스.",
        officialUrl: "https://huggingface.co/moonshotai/Kimi-K2.6",
        source: "https://huggingface.co/moonshotai/Kimi-K2.6",
        backupUrls: [
          { label: "Moonshot 공식", url: "https://moonshot.cn/" },
          { label: "GitHub", url: "https://github.com/MoonshotAI" },
        ],
        tags: ["Moonshot", "Kimi", "오픈소스", "MoE", "AgentSwarm"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "Moonshot AI",
      keyQuote: "1T 파라미터 · 300 sub-agents · Modified MIT",
      editorial:
        "오픈소스 플래그십의 질이 바뀌는 중. K2.6은 단순히 크기가 아니라 'Agent Swarm 300 sub-agents'라는 오케스트레이션 자체를 무기로 들고 나왔음. Claude Opus 4.7의 xhigh+task budget과 직접적으로 대응되는 전략.",
    },

    /* ═══════════ NORMAL — 나머지 공식 발표 ═══════════ */
    {
      rank: 5,
      tier: "normal",
      post: {
        date: "4/14",
        platform: "X",
        title:
          "Claude Code 데스크탑 앱 재설계 — 멀티 세션 사이드바 + 통합 터미널 + Diff 뷰어",
        summary:
          "병렬 에이전트 작업을 위한 재설계. 멀티 세션 사이드바, 통합 터미널·파일 에디터, 드래그 앤 드롭 레이아웃, 대규모 변경에 최적화된 Diff 뷰어. Mac·Linux 정식, Windows 설치 가능.",
        content:
          "Claude Code 데스크탑 앱 병렬 작업 최적화 재설계. 멀티 세션 사이드바로 동시 태스크 관리, 통합 터미널·파일 에디터, 드래그 앤 드롭 워크스페이스 레이아웃, 대규모 변경 성능 최적화 Diff 뷰어. Mac 정식 (SSH 지원 확장), Linux 지원, Windows 설치 방식 제공.",
        officialUrl: "https://claude.com/blog/claude-code-desktop-redesign",
        source: "https://claude.com/blog/claude-code-desktop-redesign",
        backupUrls: [
          { label: "X 공식 게시글", url: "https://x.com/claudeai/status/2044131493966909862" },
        ],
        tags: ["Anthropic", "ClaudeCode", "데스크탑", "멀티세션"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "Anthropic / Claude",
      editorial:
        "여러 에이전트를 동시에 돌리는 UX가 표준으로 자리 잡음. 이제 '한 번에 한 작업'이 아니라 '여러 세션 병렬'이 기본 전제.",
    },
    {
      rank: 6,
      tier: "normal",
      post: {
        date: "4/17",
        platform: "X",
        title: "Gemini App for Mac 출시 — 네이티브 데스크탑 앱 (Option+Space 단축키)",
        summary:
          "네이티브 macOS 앱 정식 출시. Option+Space 단축키로 어디서든 Gemini 호출. 텍스트·음성·이미지 지원.",
        content:
          "Gemini가 이제 네이티브 macOS 앱으로 제공. 'bringing the Gemini app to macOS as a native desktop experience'. Option+Space 전역 단축키로 Mac 어디서든 즉시 호출. Gemini 3.1 Pro 구동, 텍스트·음성·이미지 입력 지원.",
        officialUrl: "https://blog.google/innovation-and-ai/products/gemini-app/gemini-app-now-on-mac-os/",
        source: "https://blog.google/innovation-and-ai/products/gemini-app/gemini-app-now-on-mac-os/",
        backupUrls: [
          { label: "X 공식 게시글", url: "https://x.com/GeminiApp/status/2044445911716090212" },
        ],
        tags: ["Google", "Gemini", "Mac앱", "Option+Space"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "Google / DeepMind",
      editorial:
        "ChatGPT 데스크탑 앱에 Google이 대응하는 시점. Option+Space 단축키 UX는 Spotlight와 같은 전역 호출 패턴을 차용한 것.",
    },
    {
      rank: 7,
      tier: "normal",
      post: {
        date: "4/19",
        platform: "X",
        title:
          "GPT-5.5 (코드네임 Spud) 출시 임박 — Polymarket 4/23 92%, 이번주 내 출시 예정",
        summary:
          "Polymarket 예측 시장: 4/23 옵션 92%, 4/30 98%, 6/30 99%. 총 거래량 $932k. Spud 코드네임 사전학습 3/24 완료 루머.",
        content:
          'Polymarket "GPT-5.5 released by...?" 이벤트 (2026-04-22 기준):\n\n- 4/23 옵션 92%\n- 4/30 옵션 98%\n- 6/30 옵션 99%\n- 총 거래량 $932,331\n\nSpud 코드네임 사전학습 3/24 완료 루머. 이번 주 내 공식 출시 가능성 매우 높음.',
        officialUrl: "https://polymarket.com/event/gpt-5pt5-released-by",
        source: "https://polymarket.com/event/gpt-5pt5-released-by",
        tags: ["OpenAI", "GPT-5.5", "Spud", "Polymarket", "유출루머"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "OpenAI",
      editorial:
        "발표 후 이틀 내 공식 출시될 수 있음. 시장은 이미 확신. 다음 격주 브리핑이 아니라 이번 주말에 세션 열릴 수도.",
    },
    {
      rank: 8,
      tier: "normal",
      post: {
        date: "4/16",
        platform: "X",
        title:
          "Qwen3.6-35B-A3B 오픈소스 (Apache 2.0) — Agentic Coding MoE",
        summary:
          "Qwen3.6 시리즈 MoE 모델, 35B 파라미터. Apache-2.0 오픈소스. Agentic Coding 특화.",
        content:
          "Qwen3.6-35B-A3B: 35B 파라미터 MoE (activated 3B), Apache-2.0. Agentic Coding 특화. 같은 날 공개된 Dense 27B(i54)와 함께 Qwen3.6 라인업 형성. Hugging Face Hub·ModelScope 동시 공개.",
        officialUrl: "https://github.com/QwenLM/Qwen3.6",
        source: "https://github.com/QwenLM/Qwen3.6",
        backupUrls: [
          { label: "X 공식 게시글", url: "https://x.com/kimmonismus/status/2044780695361290347" },
          { label: "HuggingFace", url: "https://huggingface.co/Qwen/Qwen3.6-35B-A3B" },
        ],
        tags: ["Alibaba", "Qwen", "오픈소스", "MoE", "Apache2.0"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "Alibaba / Qwen",
      editorial:
        "Qwen3.6 라인업의 MoE 변형. 다음 카드의 Dense 27B와 함께 '같은 시리즈 · 다른 아키텍처' 병렬 출시 전략의 첫 사례.",
    },
    {
      rank: 9,
      tier: "normal",
      post: {
        date: "4/22",
        platform: "X",
        title:
          "Qwen3.6-27B Dense — SWE-Bench Verified 77.2%, 262K 컨텍스트 (Apache-2.0, 4/22)",
        summary:
          "Qwen3.6 Dense 27B (hidden 5120, 64 layers). SWE-Bench Verified 77.2%, AIME26 94.1%, GPQA 87.8%. FP8 변형 동시 공개.",
        content:
          "Qwen3.6 시리즈 Dense 27B 모델. 262K 토큰 네이티브 컨텍스트, Agentic Coding + Thinking Preservation + 비전-언어 통합.\n\n── 벤치마크 ──\nSWE-Bench Verified 77.2%\nTerminal-Bench 2.0 59.3%\nAIME26 94.1%\nGPQA Diamond 87.8%\n\nApache-2.0 오픈소스. FP8 변형 동시 공개.",
        officialUrl: "https://huggingface.co/Qwen/Qwen3.6-27B",
        source: "https://huggingface.co/Qwen/Qwen3.6-27B",
        backupUrls: [
          { label: "GitHub", url: "https://github.com/QwenLM/Qwen3.6" },
          { label: "HuggingFace FP8", url: "https://huggingface.co/Qwen/Qwen3.6-27B-FP8" },
        ],
        tags: ["Alibaba", "Qwen", "오픈소스", "Dense", "Apache2.0"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "Alibaba / Qwen",
      editorial:
        "같은 날 MoE 35B와 Dense 27B를 동시에 공개. SWE-Bench Verified 77.2%는 주요 클로즈드 모델과 격차를 좁힌 수치. 로컬·엣지 배포 관점에선 Dense가 더 실용적.",
    },
    {
      rank: 10,
      tier: "normal",
      post: {
        date: "4/15",
        platform: "X",
        title:
          "SuperGemma4-26B Uncensored — 한국 개발자(Jiunsong)의 Gemma 4 튜닝본",
        summary:
          "한국 개발자 Jiunsong이 Gemma 4 26B를 MLX 4bit로 uncensored 튜닝. HuggingFace 공개.",
        content:
          "google/gemma-4-26B-A4B-it 기반. Jiunsong이 올린 uncensored 튜닝 + MLX 4-bit 양자화 (약 13GB). Apple Silicon 로컬 실행에 최적화. 한국 커뮤니티 모델로 의미.",
        officialUrl: "https://huggingface.co/Jiunsong/supergemma4-26b-uncensored-mlx-4bit-v2",
        source: "https://huggingface.co/Jiunsong/supergemma4-26b-uncensored-mlx-4bit-v2",
        backupUrls: [
          { label: "X 공식 게시글", url: "https://x.com/Jiunsong/status/2044562038749183245" },
        ],
        tags: ["한국", "Gemma4", "Uncensored", "MLX", "로컬AI"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "한국·커뮤니티",
      editorial:
        "오픈소스 플래그십(Qwen·Kimi) 뒤에 '한국 커뮤니티의 튜닝본'이라는 층이 생기고 있음. Apple Silicon 로컬 실행 전제로 튜닝된 것도 포인트.",
    },
    {
      rank: 11,
      tier: "normal",
      post: {
        date: "4/15",
        platform: "X",
        title:
          "NVIDIA Lyra 2.0 — 단일 이미지로 탐험 가능한 3D 월드 생성",
        summary:
          '"Lyra 2.0: Explorable Generative 3D Worlds". 단일 이미지 → 탐험 가능한 3D 환경. long·complex environments 지원.',
        content:
          '"Lyra 2.0: Explorable Generative 3D Worlds". 단일 이미지 입력으로 long·complex environments와 large camera trajectories 지원하는 탐험형 3D 월드 생성. NVIDIA Research SIL 랩 프로젝트, arXiv 논문 공개.',
        officialUrl: "https://research.nvidia.com/labs/sil/projects/lyra2/",
        source: "https://research.nvidia.com/labs/sil/projects/lyra2/",
        backupUrls: [
          { label: "X 공식 게시글", url: "https://x.com/NVIDIAAIDev/status/2044445645109436672" },
        ],
        tags: ["NVIDIA", "3D월드", "이미지투3D", "연구"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "NVIDIA",
      editorial:
        "HY-World 2.0 (Tencent), Lyra 2.0 (NVIDIA) 등 '단일 이미지 → 3D 월드' 카테고리가 같은 주에 경쟁적으로 공개됨. 게임·시뮬레이션·로봇학습 데이터 생성으로 이어질 축.",
    },
    {
      rank: 12,
      tier: "normal",
      post: {
        date: "4/8",
        platform: "X",
        title:
          "HeyGen Avatar V + Seedance 2.0 통합 — 15초 녹음으로 스튜디오 아바타",
        summary:
          '"The most realistic AI avatar model in the world". 15초 녹음·프로 장비 없이 스튜디오 품질 비디오 생성. ByteDance Seedance 2.0 통합.',
        content:
          '"Announcing Avatar V: The most realistic AI avatar model in the world". 15초 녹음으로 스튜디오 품질 아바타 비디오 생성. 프로 카메라·스튜디오 조명·제작진 불필요. ByteDance Seedance 2.0과 통합되어 페어링 시 향상된 비디오 워크플로우 제공.',
        officialUrl: "https://www.heygen.com/blog/announcing-avatar-v",
        source: "https://www.heygen.com/blog/announcing-avatar-v",
        backupUrls: [
          { label: "X 공식 게시글", url: "https://x.com/heygen_official/status/2042985920183920401" },
        ],
        tags: ["HeyGen", "AI아바타", "비디오", "Seedance"],
      },
      sourceWeek: "2026-w16",
      sourceCompany: "HeyGen",
      editorial:
        "강사·콘텐츠 크리에이터 대상 도구. 15초 녹음만으로 스튜디오 품질이 나온다는 주장이 사실이면, 영상 기반 교육/마케팅 시장의 진입 장벽이 또 내려감.",
    },
  ],

  editorsPicks: [
    {
      title: "CodeBurn — Claude Code·Codex·Cursor 토큰/비용 TUI 대시보드",
      subtitle: "내가 직접 써본 툴",
      category: "개발자 도구",
      sourceUrl: "https://github.com/AgentSeal/codeburn",
      sourceLabel: "GitHub 보기 →",
      guideUrl: "https://www.threads.com/@kk_fe_1/post/DXI9Potk_gx",
      guideLabel: "소개 Threads 게시글 →",
      summary:
        "활동별(대화/코딩/탐색/디버깅)·프로젝트별·모델별로 토큰 사용량을 분해하는 오픈소스 TUI. 클릭 한 번으로 '내 토큰이 어디로 샜는지' 확인.",
      body:
        '## 왜 이걸 Editor\'s Pick으로?\n\nModel 경쟁이 치열해질수록 **"내가 정확히 어디에 토큰/비용을 쓰고 있는지"**를 수치로 보지 않으면, 모델 질주의 비용은 고스란히 사용자가 떠안게 됩니다.\n\nCodeBurn은 그 질문에 TUI 대시보드로 답합니다:\n\n- **활동별 분해**: 대화 63% · 코딩 16% · 탐색 15% · 디버깅 4% (실제 수치 예시)\n- **프로젝트별 비용**: 각 프로젝트에 얼마나 썼는지 개별 집계\n- **모델별 분리**: Sonnet 4 / Haiku / Opus 각각의 사용량\n- **Daily Activity 그래프**: 일별 사용 패턴 시각화\n- **도구별 사용량**: MCP 서버·플러그인·Playwright 등 개별 도구별 토큰\n- **Claude Code + Codex + Cursor 호환**\n\n인사이트 한 줄: **"대화가 63%"** — 실제 코딩보다 프롬프트/응답 대화에 토큰이 더 쓰인다는 사실. 프롬프트 최적화가 비용 절감의 핵심이라는 의미입니다.\n\n## claude-dashboard와의 차이\n\n- **claude-dashboard**: 상태바용 (실시간 현재 사용량)\n- **CodeBurn**: 사후 분석용 (어디에 얼마나 썼는지 리포트)\n\n두 개를 함께 쓰면 "지금 쓰고 있는 것 + 지금까지 쓴 것" 양쪽을 다 봄.\n\n## 기본 정보\n\n- MIT License · 3.3k★ · 332 commits\n- 최신 v0.8.8 (2026-04-22, menubar release)\n- Python 설치, 터미널에서 실행',
      editorial:
        '이번 회차의 마지막을 **"직접 써본 도구"**로 닫는 것은 의도된 구성입니다. 거대 모델 출시와 Arena 점수 싸움의 한복판에서, 수강생이 다음 주 월요일에 실제로 써볼 도구는 결국 이 레벨의 실전 유틸리티입니다.',
      tags: ["Claude Code", "토큰관리", "비용분석", "TUI", "오픈소스"],
      tier: "feature",
    },
  ],
};
