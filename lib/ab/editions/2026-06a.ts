import type { ABEdition } from "../data";

// 2026-06a — 격주 AB 발표 (2026-05-26 ~ 2026-06-04)
// 자동 생성: verified.json(51 items, all live) 기반 결정론 변환. 본문은 공식 출처 요약+핵심 사실.

export const edition2026_06a: ABEdition = {
  "slug": "2026-06a",
  "volume": 5,
  "title": "Claude Opus 4.8·Gemini 3.5 Flash·Vera Rubin·Rosalind — 프런티어 모델과 AI 팩토리가 같은 열흘에 굳다",
  "theme": "2026-05-26 ~ 2026-06-04 — Anthropic Claude Opus 4.8과 Google Gemini 3.5 Flash가 같은 구간에 프런티어 모델을 갱신하고, NVIDIA Vera Rubin·RTX Spark가 에이전트를 굴리는 하드웨어를 책상과 데이터센터 양쪽으로 내리고, OpenAI Rosalind Biodefense가 모델을 안전·과학 영역으로 넓힌 열흘",
  "period": "2026-05-26 ~ 2026-06-04",
  "coveredWeeks": [
    "2026-w22",
    "2026-w23"
  ],
  "announceDate": "2026-06-04",
  "intro": "이번 열흘은 한 회사의 단일 발표가 아니라, 네 흐름이 동시에 굳어진 구간이다.\n\n첫째, 프런티어 모델이 같은 주에 갱신됐다. Anthropic은 Claude Opus 4.8을 가격 동결로 공개했고, Google은 I/O 2026 흐름의 Gemini 3.5 Flash를 행동하는 모델로 내놨다.\n\n둘째, 에이전트를 굴리는 하드웨어가 양쪽으로 내려왔다. NVIDIA는 Vera Rubin을 풀 프로덕션에 넣고, RTX Spark·DGX Station으로 개인 책상까지 1조 파라미터급 추론을 끌어내렸다.\n\n셋째, 코딩 에이전트가 운영체제 안으로 더 깊이 들어갔다. OpenAI Codex는 Windows Computer Use와 AWS 정식 제공으로 실행 표면을 넓혔고, Microsoft는 Copilot 전반을 작업 인지형으로 재설계했다.\n\n넷째, 모델이 과학·안전 영역으로 확장됐다. OpenAI Rosalind Biodefense, Anthropic Glasswing 150개 조직 확대, 에르되시 난제 자동 증명이 같은 구간에 나왔다.",
  "closing": "한 줄로 묶으면, 이번 열흘 사이 AI는 \"같은 주에 프런티어 모델을 갱신하고, 그 모델을 굴릴 하드웨어를 책상까지 내리며, 과학과 안전으로 영역을 넓히는\" 단계로 굳었다.\n\n직접 써보고 추천하는 오픈소스 도구로는 Spice(에이전트 위 의사결정 층), mem9(에이전트 장기 기억), PrismML Bonsai 4B(브라우저 이미지 모델), YouTube MCP(영상 연구 소스), agent-workspace-linux(에이전트 격리 데스크톱), avai(호스트 보안 텔레메트리)를 골라뒀다.\n\n— VoidLight",
  "coreFlow": [
    "프런티어 모델이 같은 주에 갱신됐다: Claude Opus 4.8과 Gemini 3.5 Flash가 가격·성능 양쪽에서 기준선을 다시 그었다.",
    "에이전트를 굴리는 하드웨어가 데이터센터(Vera Rubin)와 책상(RTX Spark·DGX Station) 양쪽으로 동시에 내려왔다.",
    "코딩 에이전트와 모델이 운영체제·과학·안전 영역으로 확장되며 적용 표면이 넓어졌다."
  ],
  "highlights": [
    {
      "rank": 1,
      "tier": "hero",
      "post": {
        "date": "5/28",
        "platform": "X+Threads",
        "title": "Anthropic, Claude Opus 4.8 공식 공개",
        "deck": "Anthropic이 가장 강력한 일반 공개 모델 Claude Opus 4.8을 발표했다.",
        "summary": "Anthropic이 가장 강력한 일반 공개 모델 Claude Opus 4.8을 발표했다. 가격은 Opus 4.7과 동일하게 유지하면서 코딩·에이전트·지식 작업 전반에서 프런티어 성능을 기록했다. Claude Code에 dynamic workflows가 붙어 대규모 작업을 더 잘 다룬다.",
        "content": "Anthropic이 가장 강력한 일반 공개 모델 Claude Opus 4.8을 발표했다. 가격은 Opus 4.7과 동일하게 유지하면서 코딩·에이전트·지식 작업 전반에서 프런티어 성능을 기록했다. Claude Code에 dynamic workflows가 붙어 대규모 작업을 더 잘 다룬다.\n\n## 핵심 사실\n\n- 가격은 입력 100만 토큰당 5달러, 출력 100만 토큰당 25달러로 Opus 4.7과 동일\n- Claude API·Amazon Bedrock·Vertex AI에서 기본 1M 토큰 컨텍스트 지원, 최대 출력 128k 토큰\n- effort 파라미터가 전 표면에서 기본값 high로 설정되고 prompt caching 최소 캐시 길이는 1,024토큰\n- Super-Agent 벤치마크에서 유일하게 전 케이스를 끝까지 완료, Online-Mind2Web 84%로 GPT-5.5 상회\n- Legal Agent Benchmark 최고 점수 기록, all-pass 기준 10%를 처음 돌파\n- fast mode는 2.5배 속도에 기존 대비 3배 저렴, API 모델명은 claude-opus-4-8\n- Claude Code에 dynamic workflows가 추가되어 대규모 작업 처리 개선\n\n출처: anthropic.com",
        "source": "https://www.anthropic.com/news/claude-opus-4-8",
        "officialUrl": "https://www.anthropic.com/news/claude-opus-4-8",
        "slug": "claude-opus-4-8",
        "tags": [
          "Anthropic",
          "모델 출시"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "Anthropic"
    },
    {
      "rank": 2,
      "tier": "hero",
      "post": {
        "date": "5/19",
        "platform": "X+Threads",
        "title": "Gemini 3.5 Flash 출시: 행동하는 프런티어 모델 (I/O 2026)",
        "deck": "Google가 I/O 2026에서 Gemini 3.5 패밀리의 첫 모델인 3.5 Flash…",
        "summary": "Google가 I/O 2026에서 Gemini 3.5 패밀리의 첫 모델인 3.5 Flash를 정식 출시했다. 직전 세대인 3.1 Pro를 코딩·에이전트 벤치마크에서 앞서며 즉시 전 세계 배포됐다.",
        "content": "Google가 I/O 2026에서 Gemini 3.5 패밀리의 첫 모델인 3.5 Flash를 정식 출시했다. 직전 세대인 3.1 Pro를 코딩·에이전트 벤치마크에서 앞서며 즉시 전 세계 배포됐다.\n\n## 핵심 사실\n\n- Terminal-Bench 2.1 76.2%, GDPval-AA 1656 Elo, MCP Atlas 83.6%, CharXiv 추론 84.2% 기록\n- Gemini 앱·Search AI Mode, Gemini API(AI Studio/Android Studio), Antigravity, Gemini Enterprise에 즉시 제공\n- 상위 모델 3.5 Pro는 내부 사용 중이며 다음 달(6월) 출시 예정으로 발표\n- Ultra 구독료를 월 250달러에서 200달러로 인하\n\n출처: blog.google",
        "source": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
        "officialUrl": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
        "slug": "gemini-3-5",
        "tags": [
          "Google DeepMind",
          "AI 모델"
        ]
      },
      "sourceWeek": "2026-w21",
      "sourceCompany": "Google DeepMind"
    },
    {
      "rank": 3,
      "tier": "hero",
      "post": {
        "date": "6/1",
        "platform": "X+Threads",
        "title": "OpenAI, Rosalind Biodefense 프로그램 공개",
        "deck": "OpenAI가 게이트형 생명과학 모델 GPT-Rosalind 접근권을 후원해 팬데믹 대비·…",
        "summary": "OpenAI가 게이트형 생명과학 모델 GPT-Rosalind 접근권을 후원해 팬데믹 대비·바이오보안 도구를 짓게 하는 Rosalind Biodefense를 공개했다. 개발자 트랙과 정부 트랙 두 갈래로 방어적 가속을 표방한다.",
        "content": "OpenAI가 게이트형 생명과학 모델 GPT-Rosalind 접근권을 후원해 팬데믹 대비·바이오보안 도구를 짓게 하는 Rosalind Biodefense를 공개했다. 개발자 트랙과 정부 트랙 두 갈래로 방어적 가속을 표방한다.\n\n## 핵심 사실\n\n- 검증된 외부 개발자에게 GPT-Rosalind 접근 비용을 OpenAI가 부담하는 개발자 트랙을 운영\n- 정부 트랙은 조기경보·발병 대응·진단·의료대응책 개발 워크플로에 동일 접근을 확장\n- Johns Hopkins APL, CEPI, Lawrence Livermore National Lab 등이 초기 협력기관으로 참여\n- 공개 전 백악관과 연방기관에 접근 방식을 브리핑했고 전 세계 지원자에게 개방\n- GPT-Rosalind는 4월 공개된 생명과학용 추론 모델로 단백질·유전체·질병 생물학 추론에 특화\n\n출처: openai.com",
        "source": "https://openai.com/index/strengthening-societal-resilience-with-rosalind-biodefense/",
        "officialUrl": "https://openai.com/index/strengthening-societal-resilience-with-rosalind-biodefense/",
        "slug": "strengthening-societal-resilience-with-rosalind-biodefe",
        "tags": [
          "OpenAI",
          "Rosalind / Biosecurity"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "OpenAI"
    },
    {
      "rank": 4,
      "tier": "hero",
      "post": {
        "date": "5/31",
        "platform": "X+Threads",
        "title": "NVIDIA·Microsoft, 개인 AI 에이전트용 윈도우 PC 'RTX Spark' 공개",
        "deck": "NVIDIA와 Microsoft가 GTC Taipei at COMPUTEX 2026에서 개…",
        "summary": "NVIDIA와 Microsoft가 GTC Taipei at COMPUTEX 2026에서 개인 AI 에이전트를 온디바이스로 구동하는 새 슈퍼칩 RTX Spark를 발표했다. 윈도우 노트북과 소형 데스크톱을 에이전트가 직접 작업을 수행하는 컴퓨터로 재정의한다.",
        "content": "NVIDIA와 Microsoft가 GTC Taipei at COMPUTEX 2026에서 개인 AI 에이전트를 온디바이스로 구동하는 새 슈퍼칩 RTX Spark를 발표했다. 윈도우 노트북과 소형 데스크톱을 에이전트가 직접 작업을 수행하는 컴퓨터로 재정의한다.\n\n## 핵심 사실\n\n- Blackwell RTX GPU(6,144 CUDA 코어, 5세대 FP4 Tensor Core)와 20코어 Grace CPU 결합, AI 연산 1 페타플롭\n- 최대 128GB 통합 메모리로 120B 파라미터 모델과 100만 토큰 컨텍스트를 로컬 실행\n- 에이전트를 안전하게 격리하는 OpenShell 런타임과 윈도우 보안 프리미티브 적용\n- ASUS·Dell·HP·Lenovo·Microsoft Surface·MSI 등에서 2026년 가을 출시\n\n출처: nvidianews.nvidia.com",
        "source": "https://nvidianews.nvidia.com/news/nvidia-microsoft-windows-pcs-agents-rtx-spark",
        "officialUrl": "https://nvidianews.nvidia.com/news/nvidia-microsoft-windows-pcs-agents-rtx-spark",
        "slug": "nvidia-microsoft-windows-pcs-agents-rtx-spark",
        "tags": [
          "NVIDIA",
          "agentic-infra"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "NVIDIA"
    },
    {
      "rank": 5,
      "tier": "hero",
      "post": {
        "date": "5/31",
        "platform": "X+Threads",
        "title": "NVIDIA Vera Rubin 풀 프로덕션 진입, 에이전틱 AI 팩토리 본격 가동",
        "deck": "NVIDIA가 차세대 랙스케일 플랫폼 Vera Rubin을 전면 양산 단계로 전환한다고 발…",
        "summary": "NVIDIA가 차세대 랙스케일 플랫폼 Vera Rubin을 전면 양산 단계로 전환한다고 발표했다. 추론·검색·도구 사용 중심의 에이전틱 AI 워크로드를 위한 AI 팩토리 엔진으로 포지셔닝했다.",
        "content": "NVIDIA가 차세대 랙스케일 플랫폼 Vera Rubin을 전면 양산 단계로 전환한다고 발표했다. 추론·검색·도구 사용 중심의 에이전틱 AI 워크로드를 위한 AI 팩토리 엔진으로 포지셔닝했다.\n\n## 핵심 사실\n\n- Vera Rubin NVL72(36 Vera CPU + 72 Rubin GPU)를 포함해 다섯 종 목적형 랙을 단일 슈퍼컴퓨터로 통합\n- 이전 세대 Grace Blackwell 대비 스케일 환경에서 에이전트 처리량 10배 향상\n- 150곳 이상 생태계 파트너가 30개국 350여 공장에서 양산 준비 중\n- Vera Rubin 양산 출하는 2026년 가을 시작 예정\n\n출처: nvidianews.nvidia.com",
        "source": "https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory",
        "officialUrl": "https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory",
        "slug": "vera-rubin-full-production-agentic-ai-factory",
        "tags": [
          "NVIDIA",
          "datacenter"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "NVIDIA"
    },
    {
      "rank": 6,
      "tier": "feature",
      "post": {
        "date": "6/2",
        "platform": "X+Threads",
        "title": "Anthropic, Project Glasswing 약 150개 조직으로 확대",
        "deck": "Anthropic이 핵심 소프트웨어 보안 이니셔티브 Project Glasswing을 약 …",
        "summary": "Anthropic이 핵심 소프트웨어 보안 이니셔티브 Project Glasswing을 약 150개 신규 조직으로 확대했다. Claude Mythos Preview를 활용해 취약점을 탐지하며 전력·수도·의료·통신 등 핵심 인프라 분야를 포괄한다.",
        "content": "Anthropic이 핵심 소프트웨어 보안 이니셔티브 Project Glasswing을 약 150개 신규 조직으로 확대했다. Claude Mythos Preview를 활용해 취약점을 탐지하며 전력·수도·의료·통신 등 핵심 인프라 분야를 포괄한다.\n\n## 핵심 사실\n\n- 15개국 이상에 분포한 약 150개 신규 파트너 조직 추가, 초기 코호트는 약 50개 조직\n- 초기 파트너들에서 high·critical 등급 취약점 1만 건 이상 발견\n- 취약점 탐지는 Claude Mythos Preview, Claude Security 제품은 Opus 4.8 등 공개 모델 사용\n- 향후 6~12개월 내 다른 AI 기업들도 Mythos급 모델을 보유할 것으로 전망\n\n출처: anthropic.com",
        "source": "https://www.anthropic.com/news/expanding-project-glasswing",
        "officialUrl": "https://www.anthropic.com/news/expanding-project-glasswing",
        "slug": "expanding-project-glasswing",
        "tags": [
          "Anthropic",
          "보안 이니셔티브"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "Anthropic"
    },
    {
      "rank": 7,
      "tier": "feature",
      "post": {
        "date": "5/29",
        "platform": "X+Threads",
        "title": "Anthropic, Mythos-class 모델 몇 주 내 확대 공식 예고",
        "deck": "Anthropic이 Opus 4.8 발표 말미에서 Project Glasswing의 Cla…",
        "summary": "Anthropic이 Opus 4.8 발표 말미에서 Project Glasswing의 Claude Mythos Preview를 언급하며 Mythos-class 모델을 모든 고객에게 몇 주 내(coming weeks) 가져올 수 있을 것으로 기대한다고 밝혔다. Mythos 1이라는 제품명이 확정된 것은 아니며, 현재 공식 확인된 것은 Mythos-class·Claude Mythos Preview·몇 주 내 확대 기대다. 별도로 Opus 4.8/Sonnet 4.8/Mythos 1 모델명 루머가 함께 돌았으나 4.8 외 명칭은 미확정이다.",
        "content": "Anthropic이 Opus 4.8 발표 말미에서 Project Glasswing의 Claude Mythos Preview를 언급하며 Mythos-class 모델을 모든 고객에게 몇 주 내(coming weeks) 가져올 수 있을 것으로 기대한다고 밝혔다. Mythos 1이라는 제품명이 확정된 것은 아니며, 현재 공식 확인된 것은 Mythos-class·Claude Mythos Preview·몇 주 내 확대 기대다. 별도로 Opus 4.8/Sonnet 4.8/Mythos 1 모델명 루머가 함께 돌았으나 4.8 외 명칭은 미확정이다.\n\n## 핵심 사실\n\n- Opus 4.8 발표 본문에서 Mythos-class 모델의 coming weeks 확대 기대를 공식 언급\n- Mythos 1 제품명 확정 아님, 공식 확인된 것은 Mythos-class·Claude Mythos Preview\n- Claude가 일상 작업·코딩·고난도 추론·보안 분석용 모델 라인업으로 분화하는 흐름\n- Sonnet 4.8·Mythos 1 등 추가 모델명은 루머 단계로 공식 발표되지 않음\n\n> 이 항목은 공식 확정 발표가 아니라 예고·정황 단계의 정보다. 확정 시 갱신한다.\n\n출처: anthropic.com",
        "source": "https://www.anthropic.com/news/claude-opus-4-8",
        "officialUrl": "https://www.anthropic.com/news/claude-opus-4-8",
        "slug": "claude-opus-4-8-2",
        "tags": [
          "Anthropic",
          "AI 모델"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "Anthropic"
    },
    {
      "rank": 8,
      "tier": "feature",
      "post": {
        "date": "5/19",
        "platform": "X+Threads",
        "title": "Gemini Omni 공개: 모든 입력을 영상으로 생성·편집하는 모델",
        "deck": "Google가 텍스트·이미지·오디오·영상을 입력으로 받아 고해상도 영상을 생성하고 대화형으…",
        "summary": "Google가 텍스트·이미지·오디오·영상을 입력으로 받아 고해상도 영상을 생성하고 대화형으로 편집하는 Gemini Omni를 공개했다. 첫 모델 Omni Flash가 구독 등급별로 배포를 시작했다.",
        "content": "Google가 텍스트·이미지·오디오·영상을 입력으로 받아 고해상도 영상을 생성하고 대화형으로 편집하는 Gemini Omni를 공개했다. 첫 모델 Omni Flash가 구독 등급별로 배포를 시작했다.\n\n## 핵심 사실\n\n- 첫 모델 Gemini Omni Flash가 Gemini 앱·Google Flow에서 AI Plus/Pro/Ultra 구독자에게 글로벌 배포\n- YouTube Shorts Remix와 YouTube Create 앱에서 18세 이상 사용자에게 무료 제공\n- 클립당 최대 10초, 네이티브 오디오 동반, 전 생성물에 SynthID 워터마크 적용\n- 오디오/음성 편집 기능과 개발자 API는 추후 단계적 제공 예정\n\n출처: blog.google",
        "source": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/",
        "officialUrl": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/",
        "slug": "gemini-omni",
        "tags": [
          "Google DeepMind",
          "생성형 영상"
        ]
      },
      "sourceWeek": "2026-w21",
      "sourceCompany": "Google DeepMind"
    },
    {
      "rank": 9,
      "tier": "feature",
      "post": {
        "date": "5/29",
        "platform": "X+Threads",
        "title": "OpenAI Codex, Windows에 Computer Use 도입 (v26.527)",
        "deck": "맥 전용이던 Codex의 화면 제어(Computer Use)가 Windows로 확대되어 에…",
        "summary": "맥 전용이던 Codex의 화면 제어(Computer Use)가 Windows로 확대되어 에이전트가 데스크톱 앱을 직접 보고 클릭하고 입력한다. ChatGPT 모바일에서 Windows 작업을 원격으로 시작·확인·조정하는 기능도 함께 열렸다.",
        "content": "맥 전용이던 Codex의 화면 제어(Computer Use)가 Windows로 확대되어 에이전트가 데스크톱 앱을 직접 보고 클릭하고 입력한다. ChatGPT 모바일에서 Windows 작업을 원격으로 시작·확인·조정하는 기능도 함께 열렸다.\n\n## 핵심 사실\n\n- Codex 앱 v26.527에서 Windows Computer Use가 추가되어 그래픽 앱을 사람처럼 조작\n- Windows에서는 포그라운드 전용으로, 작업 중 활성 데스크톱 세션을 점유(맥의 백그라운드 병렬 실행과 차이)\n- @computer로 전체 데스크톱 접근, @Paint처럼 특정 앱으로 범위를 제한 가능\n- iOS·Android ChatGPT 또는 맥 Codex에서 Windows 작업을 원격으로 시작·조정 가능\n- 출시 시점 EEA·영국·스위스는 Computer Use 제외, Profile 사용량·토큰 통계 화면 추가\n- 같은 날 Codex CLI 0.135.0에서 진단·Vim 편집·권한 프로필 작업 흐름도 정비\n\n출처: developers.openai.com",
        "source": "https://developers.openai.com/codex/app/computer-use",
        "officialUrl": "https://developers.openai.com/codex/app/computer-use",
        "slug": "computer-use",
        "tags": [
          "OpenAI",
          "Codex / Agent"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "OpenAI"
    },
    {
      "rank": 10,
      "tier": "feature",
      "post": {
        "date": "5/28",
        "platform": "X+Threads",
        "title": "GPT-5.5 Instant 응답 스타일 업데이트와 Canvas의 쓰기·코드 블록 전환",
        "deck": "OpenAI가 GPT-5.5 Instant의 응답을 더 읽기 쉽고 자연스럽게 다듬으며, G…",
        "summary": "OpenAI가 GPT-5.5 Instant의 응답을 더 읽기 쉽고 자연스럽게 다듬으며, GPT-5.5 Instant·Thinking에서 Canvas를 제거하고 쓰기 블록·코드 블록을 채팅 응답 안으로 통합했다. 사용성 변경이라 별도 블로그 없이 릴리스 노트로만 고지됐다.",
        "content": "OpenAI가 GPT-5.5 Instant의 응답을 더 읽기 쉽고 자연스럽게 다듬으며, GPT-5.5 Instant·Thinking에서 Canvas를 제거하고 쓰기 블록·코드 블록을 채팅 응답 안으로 통합했다. 사용성 변경이라 별도 블로그 없이 릴리스 노트로만 고지됐다.\n\n## 핵심 사실\n\n- GPT-5.5 Instant가 과도한 불릿·장문을 줄이고 더 자연스러운 톤으로 개편\n- GPT-5.5 Instant·Thinking에서 Canvas가 빠지고 쓰기·코드 작업이 채팅 내 writing/code 블록으로 대체\n- 유료 사용자는 일정 기간 레거시 모델을 통해 Canvas를 계속 사용 가능\n- 리서치 리드 Michelle Pokras는 sycophancy·factuality·다국어 성능 개선을 사유로 제시\n- 함께 o3는 2026-08-26, GPT-4.5는 2026-06-27 ChatGPT에서 은퇴 예고\n\n출처: help.openai.com",
        "source": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
        "officialUrl": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
        "slug": "6825453-chatgpt-release-notes",
        "tags": [
          "OpenAI",
          "ChatGPT / Model"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "OpenAI"
    },
    {
      "rank": 11,
      "tier": "feature",
      "post": {
        "date": "6/1",
        "platform": "X+Threads",
        "title": "OpenAI 프런티어 모델·Codex, AWS에서 정식 제공",
        "deck": "OpenAI의 GPT-5.5·GPT-5.4와 Codex가 Amazon Bedrock에서 정…",
        "summary": "OpenAI의 GPT-5.5·GPT-5.4와 Codex가 Amazon Bedrock에서 정식(GA) 제공되어, AWS 기업이 기존 보안·거버넌스 환경 안에서 OpenAI를 바로 쓸 수 있게 됐다. 4월 제한 프리뷰 한 달 만의 정식 전환이다.",
        "content": "OpenAI의 GPT-5.5·GPT-5.4와 Codex가 Amazon Bedrock에서 정식(GA) 제공되어, AWS 기업이 기존 보안·거버넌스 환경 안에서 OpenAI를 바로 쓸 수 있게 됐다. 4월 제한 프리뷰 한 달 만의 정식 전환이다.\n\n## 핵심 사실\n\n- GPT-5.5·GPT-5.4와 Codex가 Amazon Bedrock에서 일반 가용(GA)으로 전환\n- Codex App·CLI·VS Code/JetBrains/Xcode IDE 연동을 Bedrock 위에서 사용 가능\n- 가격은 OpenAI 1차 API와 동일하며 사용량이 AWS 약정에 합산(GPT-5.5 입력 $5/출력 $30 per 1M)\n- 추론은 Bedrock의 Responses API 경유로, IAM·VPC 격리·암호화 등 AWS 보안 통제 적용\n- 사이버 방어 제품군 Daybreak(Codex Security 포함)도 향후 AWS 제공 예고\n\n출처: openai.com",
        "source": "https://openai.com/index/openai-frontier-models-and-codex-are-now-available-on-aws/",
        "officialUrl": "https://openai.com/index/openai-frontier-models-and-codex-are-now-available-on-aws/",
        "slug": "openai-frontier-models-and-codex-are-now-available-on-a",
        "tags": [
          "OpenAI",
          "Enterprise / Cloud"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "OpenAI"
    },
    {
      "rank": 12,
      "tier": "feature",
      "post": {
        "date": "5/26",
        "platform": "X+Threads",
        "title": "OpenAI 추론 모델, 80년 묵은 에르되시 단위거리 추측 반례 제시",
        "deck": "OpenAI가 5월 20일, 내부 추론 모델이 80년 가까이 열려 있던 Erdős의 평면 …",
        "summary": "OpenAI가 5월 20일, 내부 추론 모델이 80년 가까이 열려 있던 Erdős의 평면 단위거리 추측을 반례로 깼다고 공개했다. 검색으로 답을 찾은 것이 아니라 기존에 알려지지 않은 연결고리를 찾아 새 증명 방향을 제시한 사례다. AI가 문제 풀이를 넘어 새 발견 영역으로 진입하는 장면이다.",
        "content": "OpenAI가 5월 20일, 내부 추론 모델이 80년 가까이 열려 있던 Erdős의 평면 단위거리 추측을 반례로 깼다고 공개했다. 검색으로 답을 찾은 것이 아니라 기존에 알려지지 않은 연결고리를 찾아 새 증명 방향을 제시한 사례다. AI가 문제 풀이를 넘어 새 발견 영역으로 진입하는 장면이다.\n\n## 핵심 사실\n\n- OpenAI 내부 추론 모델이 80년 가까이 미해결이던 Erdős 평면 단위거리 추측의 반례를 제시\n- 검색이 아니라 알려지지 않은 연결고리를 찾아 새 증명 방향을 제시한 발견형 사례\n- Google DeepMind AlphaProof Nexus의 에르되시 형식증명과는 별개의 OpenAI 독립 성과\n\n출처: openai.com",
        "source": "https://openai.com/index/model-disproves-discrete-geometry-conjecture/",
        "officialUrl": "https://openai.com/index/model-disproves-discrete-geometry-conjecture/",
        "slug": "model-disproves-discrete-geometry-conjecture",
        "tags": [
          "OpenAI",
          "AI 연구"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "OpenAI"
    },
    {
      "rank": 13,
      "tier": "feature",
      "post": {
        "date": "5/28",
        "platform": "X+Threads",
        "title": "Microsoft 365 Copilot 새 디자인 공개: 프롬프트 입력창을 작업 인지형 워크스페이스로 전환",
        "deck": "마이크로소프트가 Microsoft 365 Copilot 앱과 Word/Excel/Power…",
        "summary": "마이크로소프트가 Microsoft 365 Copilot 앱과 Word/Excel/PowerPoint/Outlook 전반의 Copilot 진입점을 재설계해 정적 프롬프트 입력창을 작업 인지형 워크스페이스로 바꿨다. 개별 기능 나열에서 연결된 경험으로의 전환을 표방한다.",
        "content": "마이크로소프트가 Microsoft 365 Copilot 앱과 Word/Excel/PowerPoint/Outlook 전반의 Copilot 진입점을 재설계해 정적 프롬프트 입력창을 작업 인지형 워크스페이스로 바꿨다. 개별 기능 나열에서 연결된 경험으로의 전환을 표방한다.\n\n## 핵심 사실\n\n- 프롬프트 입력 영역을 확장형 작업 워크스페이스로 재구성하고 좌측 내비게이션으로 에이전트·대화 이력을 정리\n- 로딩 속도 50% 이상 단축, 복잡한 프롬프트 응답 시간 약 10% 개선\n- 이메일·파일·채팅·회의에서 끌어오는 Work IQ 지능 레이어를 결합\n- Word·Excel·PowerPoint·Outlook에 일관된 단일 Copilot 진입점 제공\n\n출처: microsoft.com",
        "source": "https://www.microsoft.com/en-us/microsoft-365/blog/2026/05/28/introducing-a-new-design-for-microsoft-365-copilot/",
        "officialUrl": "https://www.microsoft.com/en-us/microsoft-365/blog/2026/05/28/introducing-a-new-design-for-microsoft-365-copilot/",
        "slug": "introducing-a-new-design-for-microsoft-365-copilot",
        "tags": [
          "Microsoft",
          "제품/UX 개편"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "Microsoft"
    },
    {
      "rank": 14,
      "tier": "feature",
      "post": {
        "date": "5/20",
        "platform": "X+Threads",
        "title": "Cohere, 첫 완전 오픈소스 모델 Command A+를 Apache 2.0으로 공개",
        "deck": "Cohere가 자사 첫 완전 오픈소스 모델 Command A+를 Apache 2.0으로 공…",
        "summary": "Cohere가 자사 첫 완전 오픈소스 모델 Command A+를 Apache 2.0으로 공개했다. 218B 파라미터 중 25B만 활성화되는 희소 MoE로, H100 2장에서 구동되며 에이전트 워크플로우와 RAG·다국어 처리를 겨냥했다.",
        "content": "Cohere가 자사 첫 완전 오픈소스 모델 Command A+를 Apache 2.0으로 공개했다. 218B 파라미터 중 25B만 활성화되는 희소 MoE로, H100 2장에서 구동되며 에이전트 워크플로우와 RAG·다국어 처리를 겨냥했다.\n\n## 핵심 사실\n\n- 5월 20일 공개, Cohere가 OSI 승인 Apache 2.0을 채택한 첫 모델로 상업적 사용·수정·재배포가 자유로움\n- 디코더 전용 희소 MoE 218B 파라미터에 토큰당 25B 활성(128개 중 8개 expert), QAD로 H100 2장 구동을 노림\n- 48개 언어·이미지 입력·128K 컨텍스트를 지원하고 BF16·FP8·W4A4 양자화 가중치를 Hugging Face에 함께 공개\n- 외부 도구 결과를 문장 단위 grounding span으로 출처에 직접 연결하는 네이티브 인용 생성이 기업용 차별점\n- Artificial Analysis Intelligence Index 37로 오픈 모델 중 상위지만, 심층 에이전트 코딩은 DeepSeek·GLM·MiniMax 최신 세대에 뒤진다는 평가\n\n출처: cohere.com",
        "source": "https://cohere.com/blog/command-a-plus",
        "officialUrl": "https://cohere.com/blog/command-a-plus",
        "slug": "command-a-plus",
        "tags": [
          "Cohere",
          "Open Weight Model"
        ]
      },
      "sourceWeek": "2026-w21",
      "sourceCompany": "Cohere"
    },
    {
      "rank": 15,
      "tier": "feature",
      "post": {
        "date": "6/1",
        "platform": "X+Threads",
        "title": "MiniMax, 오픈웨이트 프런티어 코딩 모델 M3 공개… SWE-Bench Pro 59.0%",
        "deck": "MiniMax가 프런티어급 코딩·100만 토큰 컨텍스트·네이티브 멀티모달을 한 모델에 결합…",
        "summary": "MiniMax가 프런티어급 코딩·100만 토큰 컨텍스트·네이티브 멀티모달을 한 모델에 결합한 오픈웨이트 M3를 공개했다. 자체 측정 SWE-Bench Pro 59.0%로 GPT-5.5·Gemini 3.1 Pro를 앞선다고 밝혔으나 벤치마크는 자가 보고다.",
        "content": "MiniMax가 프런티어급 코딩·100만 토큰 컨텍스트·네이티브 멀티모달을 한 모델에 결합한 오픈웨이트 M3를 공개했다. 자체 측정 SWE-Bench Pro 59.0%로 GPT-5.5·Gemini 3.1 Pro를 앞선다고 밝혔으나 벤치마크는 자가 보고다.\n\n## 핵심 사실\n\n- 6월 1일 공개, MiniMax Sparse Attention(MSA)로 100만 토큰 컨텍스트에서 디코딩 15배·프리필 9배 가속을 주장\n- 자체 측정 SWE-Bench Pro 59.0%(GPT-5.5 58.6%·Gemini 3.1 Pro 54.2%), Terminal-Bench 2.1 66.0%, OSWorld-Verified 70.0% 제시\n- API는 즉시 제공되나 가중치와 기술 보고서는 공개 후 약 10일 내 Hugging Face·GitHub 배포로 예고\n- 벤치마크는 Claude Code 등 자체 스캐폴딩·자가 인프라로 측정됐고, 비교 기준이 신형 Opus 4.8이 아닌 4.7이라 독립 검증 전까지 해석에 주의\n- 가격은 입력 0.6·출력 2.40달러(첫 주 50% 할인)로 미국 프런티어 모델의 8~20% 수준\n\n출처: minimax.io",
        "source": "https://www.minimax.io/blog/minimax-m3",
        "officialUrl": "https://www.minimax.io/blog/minimax-m3",
        "slug": "minimax-m3",
        "tags": [
          "MiniMax",
          "Open Weight Model / Benchmark"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "MiniMax"
    },
    {
      "rank": 16,
      "tier": "feature",
      "post": {
        "date": "5/26",
        "platform": "X+Threads",
        "title": "Figure, Catalyst Brands와 휴머노이드 물류 배치 계약 체결",
        "deck": "Figure가 JCPenney·Aéropostale·Brooks Brothers를 운영하는…",
        "summary": "Figure가 JCPenney·Aéropostale·Brooks Brothers를 운영하는 Catalyst Brands와 휴머노이드 로봇을 물류망에 배치하는 상업 계약을 체결했다. 네바다 리노 물류센터에서 시작해 분배·물류의 고강도 반복 작업을 자동화한다.",
        "content": "Figure가 JCPenney·Aéropostale·Brooks Brothers를 운영하는 Catalyst Brands와 휴머노이드 로봇을 물류망에 배치하는 상업 계약을 체결했다. 네바다 리노 물류센터에서 시작해 분배·물류의 고강도 반복 작업을 자동화한다.\n\n## 핵심 사실\n\n- Catalyst Brands의 네바다주 리노 물류센터를 첫 배치 거점으로 선정\n- 다브랜드 포트폴리오 전반에 유연하게 투입 가능한 차세대 Figure 로봇 활용\n- Brookfield가 양사 모두에 투자한 첫 상업적 연결 사례\n- 반복 작업은 로봇이 맡고 인력은 고부가 업무로 전환하는 구조\n\n출처: figure.ai",
        "source": "https://www.figure.ai/news/figure-signs-agreement-with-catalyst-brands",
        "officialUrl": "https://www.figure.ai/news/figure-signs-agreement-with-catalyst-brands",
        "slug": "figure-signs-agreement-with-catalyst-brands",
        "tags": [
          "Figure",
          "robotics"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "Figure"
    },
    {
      "rank": 17,
      "tier": "feature",
      "post": {
        "date": "5/27",
        "platform": "X+Threads",
        "title": "IBM·Artificial Analysis, 기업 IT 에이전트 벤치마크 ITBench-AA 공개… 프런티어 모델 전원 50% 미만",
        "deck": "IBM과 Artificial Analysis가 기업 IT 운영(SRE)에 특화된 첫 에이전…",
        "summary": "IBM과 Artificial Analysis가 기업 IT 운영(SRE)에 특화된 첫 에이전트 벤치마크 ITBench-AA를 공개했다. 쿠버네티스 장애를 로그·의존성·근본 원인까지 진단하는 과제에서 모든 프런티어 모델이 50%를 넘지 못했다.",
        "content": "IBM과 Artificial Analysis가 기업 IT 운영(SRE)에 특화된 첫 에이전트 벤치마크 ITBench-AA를 공개했다. 쿠버네티스 장애를 로그·의존성·근본 원인까지 진단하는 과제에서 모든 프런티어 모델이 50%를 넘지 못했다.\n\n## 핵심 사실\n\n- 5월 27일 Hugging Face 블로그로 공개, SRE 과제 59개(공개 40·비공개 19)로 구성\n- Claude Opus 4.7가 47%로 1위, GPT-5.5 46%, Qwen3.7 Max 42%, 오픈웨이트 1위는 GLM-5.1 40%\n- 턴 수가 많다고 정답률이 오르지 않음: GPT-5.5는 평균 31턴 46%인 반면 Gemini 3.1 Pro는 83턴에 30%\n- 오픈웨이트 Gemma 4 31B는 과제당 0.14달러로 37% 기록, 과제당 최대 5.38달러 모델 대비 비용 효율 두드러짐\n- 단일 모델로 기업 IT 에이전트 전 영역을 커버하기 어렵다는 점이 드러나, 사고 유형·중요도별 라우팅이 아키텍처 1차 결정 요소로 부상\n\n출처: huggingface.co",
        "source": "https://huggingface.co/blog/ibm-research/itbench-aa",
        "officialUrl": "https://huggingface.co/blog/ibm-research/itbench-aa",
        "slug": "itbench-aa",
        "tags": [
          "IBM Software Innovation Lab / Artificial Analysis",
          "Benchmark / Agent"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "IBM Software Innovation Lab / Artificial Analysis"
    },
    {
      "rank": 18,
      "tier": "feature",
      "post": {
        "date": "5/31",
        "platform": "X+Threads",
        "title": "NVIDIA, 윈도우용 DGX Station 발표… 책상 위 1조 파라미터 AI 슈퍼컴퓨터",
        "deck": "NVIDIA가 GB300 Grace Blackwell Ultra 슈퍼칩 기반의 데스크사이드…",
        "summary": "NVIDIA가 GB300 Grace Blackwell Ultra 슈퍼칩 기반의 데스크사이드 AI 슈퍼컴퓨터 DGX Station for Windows를 공개했다. 윈도우 환경에서 최대 1조 파라미터 모델을 로컬 실행하도록 설계됐다.",
        "content": "NVIDIA가 GB300 Grace Blackwell Ultra 슈퍼칩 기반의 데스크사이드 AI 슈퍼컴퓨터 DGX Station for Windows를 공개했다. 윈도우 환경에서 최대 1조 파라미터 모델을 로컬 실행하도록 설계됐다.\n\n## 핵심 사실\n\n- GB300 Grace Blackwell Ultra 슈퍼칩, 748GB 코히어런트 메모리, FP4 20 페타플롭\n- ConnectX-8 SuperNIC로 최대 800Gb/s 네트워킹, 여러 DGX Station 연결 지원\n- 에이전트를 샌드박스로 격리하는 오픈소스 OpenShell 런타임 탑재\n- ASUS·Dell·GIGABYTE·HP·MSI·Supermicro에서 2026년 4분기 출시 예정\n\n출처: nvidianews.nvidia.com",
        "source": "https://nvidianews.nvidia.com/news/nvidia-dgx-station-for-windows-puts-a-trillion-parameter-ai-supercomputer-on-every-enterprise-desk",
        "officialUrl": "https://nvidianews.nvidia.com/news/nvidia-dgx-station-for-windows-puts-a-trillion-parameter-ai-supercomputer-on-every-enterprise-desk",
        "slug": "nvidia-dgx-station-for-windows-puts-a-trillion-paramete",
        "tags": [
          "NVIDIA",
          "datacenter"
        ]
      },
      "sourceWeek": "2026-w22",
      "sourceCompany": "NVIDIA"
    },
    {
      "rank": 19,
      "tier": "feature",
      "post": {
        "date": "5/20",
        "platform": "X+Threads",
        "title": "Agent Executor(AX) 오픈소스화: 분산 에이전트 실행 런타임",
        "deck": "Google가 장시간 실행되는 에이전트 워크플로우를 위한 오픈소스 분산 런타임 Agent …",
        "summary": "Google가 장시간 실행되는 에이전트 워크플로우를 위한 오픈소스 분산 런타임 Agent Executor(AX)를 Apache 2.0으로 공개했다. 이벤트 로그와 스냅샷으로 중단 후 재개·자동 복구·감사·궤적 분기를 프레임워크와 모델에 무관하게 제공한다.",
        "content": "Google가 장시간 실행되는 에이전트 워크플로우를 위한 오픈소스 분산 런타임 Agent Executor(AX)를 Apache 2.0으로 공개했다. 이벤트 로그와 스냅샷으로 중단 후 재개·자동 복구·감사·궤적 분기를 프레임워크와 모델에 무관하게 제공한다.\n\n## 핵심 사실\n\n- 5월 20일 GitHub google/ax v0.1.0과 Google Cloud 블로그로 동시 공개, 라이선스는 Apache 2.0\n- 단일 컨트롤러를 통한 durable execution으로 정전·HITL 확인 등 중단 이후에도 실행을 자동 재개\n- secure-by-design 샌드박스 격리, single-writer 세션 일관성, 클라이언트 재접속 backfill, 체크포인트 기반 trajectory branching 제공\n- LangChain·ADK·CrewAI·A2A 등 어떤 하네스에도 붙는 harness-agnostic 설계이며 Kubernetes 네이티브 지원\n- 같은 날 GKE 팀과 함께 K8s 위 에이전트 워크로드 계층 Agent Substrate도 공개, 초기 개발 단계라 외부 PR은 일시 중단\n\n출처: github.com",
        "source": "https://github.com/google/ax",
        "officialUrl": "https://github.com/google/ax",
        "slug": "google-19",
        "tags": [
          "Google",
          "AI 인프라"
        ]
      },
      "sourceWeek": "2026-w21",
      "sourceCompany": "Google"
    },
    {
      "rank": 20,
      "tier": "feature",
      "post": {
        "date": "5/21",
        "platform": "X+Threads",
        "title": "AlphaProof Nexus, 수십 년 묵은 에르되시 난제 9개를 자동 증명",
        "deck": "DeepMind의 AlphaProof Nexus가 미해결 에르되시 난제 9개와 OEIS 추…",
        "summary": "DeepMind의 AlphaProof Nexus가 미해결 에르되시 난제 9개와 OEIS 추측 44개를 기계 검증 가능한 형식 증명으로 풀었다. Gemini 3.1 Pro와 Lean 증명 검증기를 결합한 방식이다.",
        "content": "DeepMind의 AlphaProof Nexus가 미해결 에르되시 난제 9개와 OEIS 추측 44개를 기계 검증 가능한 형식 증명으로 풀었다. Gemini 3.1 Pro와 Lean 증명 검증기를 결합한 방식이다.\n\n## 핵심 사실\n\n- 353개 미해결 에르되시 난제 중 9개, 492개 OEIS 추측 중 44개를 자동 증명\n- 이 중 2개는 56년간 미해결 상태였으며 문제당 추론 비용은 수백 달러 수준\n- 모든 증명은 Lean 4.27 형식 검증기로 엔드투엔드 검증, Lean 코드와 가독 증명을 GitHub에 공개\n- Demis Hassabis는 이 시스템이 여전히 AGI가 아니라고 선을 그음\n\n출처: arxiv.org",
        "source": "https://arxiv.org/abs/2605.22763",
        "officialUrl": "https://arxiv.org/abs/2605.22763",
        "slug": "google-deepmind-20",
        "tags": [
          "Google DeepMind",
          "AI 연구"
        ]
      },
      "sourceWeek": "2026-w21",
      "sourceCompany": "Google DeepMind"
    }
  ],
  "editorsPicks": [
    {
      "title": "Spice: 에이전트 실행 위에 의사결정 층을 분리한 오픈소스 런타임",
      "slug": "spice",
      "deck": "AI 에이전트 자동화에서 자주 빠지는 조각은 실행보다 먼저 무엇을 왜 해야 하는지 정하는 …",
      "category": "AI 에이전트",
      "sourceUrl": "https://github.com/Dyalwayshappy/Spice",
      "sourceLabel": "github.com",
      "summary": "AI 에이전트 자동화에서 자주 빠지는 조각은 실행보다 먼저 무엇을 왜 해야 하는지 정하는 의사결정 층이다. Spice는 그 층을 따로 떼어낸 오픈소스 런타임이다.",
      "body": "AI 에이전트 자동화에서 자주 빠지는 조각은 실행보다 먼저 무엇을 왜 해야 하는지 정하는 의사결정 층이다. Spice는 그 층을 따로 떼어낸 오픈소스 런타임이다.\n\n## 핵심 사실\n\n- 에이전트 자동화에서 실행보다 먼저 무엇을 왜 할지 정하는 의사결정 층을 분리\n- 그 의사결정 층을 별도 오픈소스 런타임으로 구현한 프로젝트\n\n출처: github.com",
      "tags": [
        "Spice",
        "AI 에이전트"
      ],
      "tier": "feature"
    },
    {
      "title": "PingCAP mem9: 에이전트 메모리는 저장소가 아니라 판단 시스템",
      "slug": "how-we-built-mem9-agent-memory-product",
      "deck": "AI 에이전트를 오래 쓸 때 가장 답답한 부분은 기억이다.",
      "category": "AI 에이전트",
      "sourceUrl": "https://www.pingcap.com/blog/how-we-built-mem9-agent-memory-product/",
      "sourceLabel": "pingcap.com",
      "summary": "AI 에이전트를 오래 쓸 때 가장 답답한 부분은 기억이다. 매번 같은 맥락을 다시 설명해야 하고 중요한 정보는 잊고 불필요한 것은 다시 끌고 온다. PingCAP이 mem9을 만들며 정리한 핵심은 에이전트 메모리가 저장소가 아니라 판단 시스템이라는 점이다.",
      "body": "AI 에이전트를 오래 쓸 때 가장 답답한 부분은 기억이다. 매번 같은 맥락을 다시 설명해야 하고 중요한 정보는 잊고 불필요한 것은 다시 끌고 온다. PingCAP이 mem9을 만들며 정리한 핵심은 에이전트 메모리가 저장소가 아니라 판단 시스템이라는 점이다.\n\n## 핵심 사실\n\n- PingCAP이 에이전트 메모리 제품 mem9 구축 경험을 공식 블로그에 공개\n- 에이전트 메모리는 단순 저장소가 아니라 무엇을 기억·회수할지 판단하는 시스템이라는 결론\n\n출처: pingcap.com",
      "tags": [
        "PingCAP",
        "AI 에이전트"
      ],
      "tier": "feature"
    },
    {
      "title": "PrismML Bonsai Image 4B: 브라우저 WebGPU에서 도는 ternary 이미지 모델",
      "slug": "prismml-102",
      "deck": "이미지 AI가 클라우드 앱에서 사용자 기기 쪽으로 내려오고 있다.",
      "category": "이미지 생성",
      "sourceUrl": "https://prismml.com/",
      "sourceLabel": "prismml.com",
      "summary": "이미지 AI가 클라우드 앱에서 사용자 기기 쪽으로 내려오고 있다. PrismML이 Bonsai Image 4B 계열을 공개했는데, 1-bit/ternary로 가중치를 극단적으로 줄여 이미지 생성 모델을 가볍게 만들고 WebGPU에서도 구동하는 방향이다.",
      "body": "이미지 AI가 클라우드 앱에서 사용자 기기 쪽으로 내려오고 있다. PrismML이 Bonsai Image 4B 계열을 공개했는데, 1-bit/ternary로 가중치를 극단적으로 줄여 이미지 생성 모델을 가볍게 만들고 WebGPU에서도 구동하는 방향이다.\n\n## 핵심 사실\n\n- 1-bit/ternary로 가중치를 극단적으로 줄여 이미지 생성 모델을 경량화\n- 브라우저 WebGPU에서도 구동하는 온디바이스 이미지 생성 방향\n\n출처: prismml.com",
      "tags": [
        "PrismML",
        "이미지 생성"
      ],
      "tier": "feature"
    },
    {
      "title": "YouTube MCP: 에이전트가 영상·자막을 연구 소스로 호출하는 오픈소스",
      "slug": "youtube-mcp",
      "deck": "AI 에이전트가 YouTube도 연구 자료로 다루기 시작했다.",
      "category": "AI 에이전트",
      "sourceUrl": "https://github.com/ZeroPointRepo/youtube-mcp",
      "sourceLabel": "github.com",
      "summary": "AI 에이전트가 YouTube도 연구 자료로 다루기 시작했다. Show HN에 올라온 YouTube MCP는 에이전트가 영상 검색·자막·채널 최신 업로드를 도구처럼 호출하게 해주는 오픈소스다. MCP(모델 컨텍스트 프로토콜)는 AI에 외부 도구를 연결하는 표준 방식이다.",
      "body": "AI 에이전트가 YouTube도 연구 자료로 다루기 시작했다. Show HN에 올라온 YouTube MCP는 에이전트가 영상 검색·자막·채널 최신 업로드를 도구처럼 호출하게 해주는 오픈소스다. MCP(모델 컨텍스트 프로토콜)는 AI에 외부 도구를 연결하는 표준 방식이다.\n\n## 핵심 사실\n\n- 에이전트가 영상 검색·자막·채널 최신 업로드를 도구처럼 호출하는 오픈소스 MCP 서버\n- MCP(모델 컨텍스트 프로토콜)는 AI에 외부 도구를 연결하는 표준 방식\n\n출처: github.com",
      "tags": [
        "ZeroPointRepo",
        "AI 에이전트"
      ],
      "tier": "feature"
    },
    {
      "title": "agent-workspace-linux: AI 에이전트 전용 격리 Linux 데스크톱",
      "slug": "agent-workspace-linux",
      "deck": "AI에게 실제 화면을 맡기는 것이 불안하다면 전용 컴퓨터를 따로 주는 방식이 대안이다.",
      "category": "AI 에이전트",
      "sourceUrl": "https://github.com/agent-sh/agent-workspace-linux",
      "sourceLabel": "github.com",
      "summary": "AI에게 실제 화면을 맡기는 것이 불안하다면 전용 컴퓨터를 따로 주는 방식이 대안이다. agent-workspace-linux는 AI 에이전트가 별도의 숨겨진 Linux 데스크톱을 조작하게 해주는 오픈소스다. MCP로 연결되며 사용자의 마우스·키보드·브라우저 세션은 건드리지 않는 구조다.",
      "body": "AI에게 실제 화면을 맡기는 것이 불안하다면 전용 컴퓨터를 따로 주는 방식이 대안이다. agent-workspace-linux는 AI 에이전트가 별도의 숨겨진 Linux 데스크톱을 조작하게 해주는 오픈소스다. MCP로 연결되며 사용자의 마우스·키보드·브라우저 세션은 건드리지 않는 구조다.\n\n## 핵심 사실\n\n- AI 에이전트가 별도 숨겨진 Linux 데스크톱을 조작하게 해주는 오픈소스\n- MCP로 연결되며 사용자 마우스·키보드·브라우저 세션은 건드리지 않는 격리 구조\n\n출처: github.com",
      "tags": [
        "agent-sh",
        "AI 에이전트"
      ],
      "tier": "feature"
    },
    {
      "title": "avai: 호스트 텔레메트리를 LLM이 분류하는 오픈소스 보안 도구",
      "slug": "avai",
      "deck": "avai는 macOS/Linux의 프로세스, USB, 브라우저 확장, 네트워크 흐름 같은 …",
      "category": "AI 보안",
      "sourceUrl": "https://github.com/iklobato/avai",
      "sourceLabel": "github.com",
      "summary": "avai는 macOS/Linux의 프로세스, USB, 브라우저 확장, 네트워크 흐름 같은 흔적을 모으고 LLM이 위험 신호를 분류하는 오픈소스다. 보안팀이 없는 1인 개발자나 소규모 팀에 유용하다.",
      "body": "avai는 macOS/Linux의 프로세스, USB, 브라우저 확장, 네트워크 흐름 같은 흔적을 모으고 LLM이 위험 신호를 분류하는 오픈소스다. 보안팀이 없는 1인 개발자나 소규모 팀에 유용하다.\n\n## 핵심 사실\n\n- macOS/Linux의 프로세스·USB·브라우저 확장·네트워크 흐름을 수집해 LLM이 위험 신호를 분류\n- 보안팀이 없는 1인 개발자·소규모 팀을 겨냥한 오픈소스\n\n출처: github.com",
      "tags": [
        "iklobato",
        "AI 보안"
      ],
      "tier": "feature"
    }
  ]
};
