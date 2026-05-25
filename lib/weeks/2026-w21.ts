import type { WeeklyData } from "../data";

// 2026-w21 (5/15 ~ 5/21)
// 자동 생성: 4라운드 수집 + 5차 prune 기반 archive
// 주차 기준 목~수 (5/15 목 = 새 주차 시작)

export const week21: WeeklyData = {
  week: 21,
  year: 2026,
  slug: "2026-w21",
  period: "5/15 ~ 5/21",
  totalPosts: 63,
  companies: [
    {
      name: "OpenAI",
      color: "#10A37F",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "AdventHealth advances whole-person care with OpenAI",
          summary: "",
          officialUrl: "https://openai.com/index/adventhealth",
          source: "https://openai.com/index/adventhealth",
          tags: ["ChatGPT for Healthcare", "공식"],
          slug: "adventhealth-advances-whole-person-care--54bdd59c",
          readMinutes: 1,
        },
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Codex rust-v0.133.0",
          summary: "",
          officialUrl: "https://github.com/openai/codex/releases/tag/rust-v0.133.0",
          source: "https://github.com/openai/codex/releases/tag/rust-v0.133.0",
          tags: ["Codex CLI", "Goals", "공식", "hero후보"],
          featured: true,
          slug: "codex-rust-v0-133-0-184c8422",
          readMinutes: 1,
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "An OpenAI model has disproved a central conjecture in discrete geometry",
          summary: "",
          officialUrl: "https://openai.com/index/model-disproves-discrete-geometry-conjecture",
          source: "https://openai.com/index/model-disproves-discrete-geometry-conjecture",
          tags: ["OpenAI Research", "Math", "공식"],
          slug: "an-openai-model-has-disproved-a-central--73dee1f9",
          readMinutes: 1,
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "The next phase of OpenAI’s Education for Countries",
          summary: "",
          officialUrl: "https://openai.com/index/the-next-phase-of-education-for-countries",
          source: "https://openai.com/index/the-next-phase-of-education-for-countries",
          tags: ["Education for Countries", "Global Affairs", "공식"],
          slug: "the-next-phase-of-openai-s-education-for-b2b66ea4",
          readMinutes: 1,
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "How Ramp engineers accelerate code review with Codex",
          summary: "",
          officialUrl: "https://openai.com/index/ramp",
          source: "https://openai.com/index/ramp",
          tags: ["Codex", "GPT-5.5", "enterprise adoption", "공식"],
          slug: "how-ramp-engineers-accelerate-code-revie-dfe54bb2",
          readMinutes: 1,
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "OpenAI Cookbook commit: Macro evals cookbook",
          summary: "",
          officialUrl: "https://github.com/openai/openai-cookbook/commit/0075904c509819f8d746794001a7a27066258956",
          source: "https://github.com/openai/openai-cookbook/commit/0075904c509819f8d746794001a7a27066258956",
          tags: ["OpenAI Cookbook", "evals", "공식"],
          slug: "openai-cookbook-commit-macro-evals-cookb-d9bf2d74",
          readMinutes: 1,
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Introducing OpenAI for Singapore",
          summary: "",
          officialUrl: "https://openai.com/index/introducing-openai-for-singapore",
          source: "https://openai.com/index/introducing-openai-for-singapore",
          tags: ["OpenAI for Singapore", "Global Affairs", "공식"],
          slug: "introducing-openai-for-singapore-39fd4877",
          readMinutes: 1,
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Advancing content provenance for a safer, more transparent AI ecosystem",
          summary: "",
          officialUrl: "https://openai.com/index/advancing-content-provenance",
          source: "https://openai.com/index/advancing-content-provenance",
          tags: ["Safety", "Content provenance", "공식"],
          slug: "advancing-content-provenance-for-a-safer-7ce118d8",
          readMinutes: 1,
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Codex rust-v0.132.0",
          summary: "",
          officialUrl: "https://github.com/openai/codex/releases/tag/rust-v0.132.0",
          source: "https://github.com/openai/codex/releases/tag/rust-v0.132.0",
          tags: ["Codex CLI", "Python SDK auth", "공식"],
          slug: "codex-rust-v0-132-0-7e22537d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/codex-rust-v0-132-0-7e22537d.jpg",
            alt: "Codex rust-v0.132.0",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "OpenAI and Dell partner to bring Codex to hybrid and on-premise enterprise environments",
          summary: "",
          officialUrl: "https://openai.com/index/dell-codex-enterprise-partnership",
          source: "https://openai.com/index/dell-codex-enterprise-partnership",
          tags: ["Codex", "Dell", "enterprise deployment", "공식"],
          slug: "openai-and-dell-partner-to-bring-codex-t-9d5c4fff",
          readMinutes: 1,
        },
        {
          date: "5/16",
          platform: "X+Threads",
          title: "OpenAI and Malta partner to bring ChatGPT Plus to all citizens",
          summary: "",
          officialUrl: "https://openai.com/index/malta-chatgpt-plus-partnership",
          source: "https://openai.com/index/malta-chatgpt-plus-partnership",
          tags: ["ChatGPT Plus", "Malta", "Global Affairs", "공식"],
          slug: "openai-and-malta-partner-to-bring-chatgp-e74cfa1e",
          readMinutes: 1,
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "A new personal finance experience in ChatGPT",
          summary: "",
          officialUrl: "https://openai.com/index/personal-finance-chatgpt",
          source: "https://openai.com/index/personal-finance-chatgpt",
          tags: ["ChatGPT", "Personal finance", "공식"],
          slug: "a-new-personal-finance-experience-in-cha-4f6e31bb",
          readMinutes: 1,
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "Databricks brings GPT-5.5 to enterprise agent workflows",
          summary: "",
          officialUrl: "https://openai.com/index/databricks",
          source: "https://openai.com/index/databricks",
          tags: ["GPT-5.5", "Databricks", "agents", "공식"],
          slug: "databricks-brings-gpt-5-5-to-enterprise--6719cd72",
          readMinutes: 1,
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "How sales teams use Codex",
          summary: "",
          officialUrl: "https://openai.com/academy/codex-for-work/how-sales-teams-use-codex",
          source: "https://openai.com/academy/codex-for-work/how-sales-teams-use-codex",
          tags: ["Codex for Work", "Sales", "공식"],
          slug: "how-sales-teams-use-codex-43467e2c",
          readMinutes: 1,
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "How business operations teams use Codex",
          summary: "",
          officialUrl: "https://openai.com/academy/codex-for-work/how-business-operations-teams-use-codex",
          source: "https://openai.com/academy/codex-for-work/how-business-operations-teams-use-codex",
          tags: ["Codex for Work", "Business operations", "공식"],
          slug: "how-business-operations-teams-use-codex-14e2778d",
          readMinutes: 1,
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "How data science teams use Codex",
          summary: "",
          officialUrl: "https://openai.com/academy/codex-for-work/how-data-science-teams-use-codex",
          source: "https://openai.com/academy/codex-for-work/how-data-science-teams-use-codex",
          tags: ["Codex for Work", "Data science", "공식"],
          slug: "how-data-science-teams-use-codex-f9d62a00",
          readMinutes: 1,
        },
        {
          date: "5/14",
          platform: "X+Threads",
          title: "Codex in the ChatGPT mobile app (iOS / Android)",
          summary: "OpenAI가 ChatGPT 모바일 앱(iOS/Android)에 Codex 원격 제어를 추가했다. 폰이 코드 편집기가 되는 게 아니라, Mac·devbox·원격 환경에서 돌아가는 Codex 세션을 원격으로 보고 승인·지시하는 컨트롤 표면이 된다. 같은 주에 Hooks GA, Programmatic access tokens, HIPAA-compliant Codex, Remote SSH GA도 같이 풀렸다.",
content: `**이게 뭐예요?**\n\n2026년 5월 14일 OpenAI가 ChatGPT 모바일 앱(iOS/Android)에 Codex를 통합한다고 발표했습니다. 폰이 IDE가 되는 게 아니라, **이미 돌아가고 있는 Codex 세션을 폰에서 원격으로 조작하는 컨트롤 표면**입니다.\n\n**무엇이 달라졌나?**\n\n- 사용 흐름: Mac의 Codex 앱 → QR 스캔으로 폰 연결 → 출력·승인·새 지시를 폰에서 실시간\n- 모든 ChatGPT 플랜(Free 포함)에서 프리뷰로 제공\n- 폰에서 보이는 것: 터미널 출력, 스크린샷, diff, 테스트 결과, 승인 요청\n- 파일·자격증명·로컬 설정은 Codex가 돌아가는 PC에 그대로 머무름 (모바일은 컨트롤만)\n- 첫 출시 시점에는 macOS Codex 데스크탑 앱에만 연결 가능 (Windows는 \"곧\" 예정)\n\n**같은 주 풀린 묶음 (\"Codex가 어디서나 돈다\"의 완성)**\n\n- Hooks GA — 이벤트 기반 자동 실행\n- Programmatic access tokens (Business/Enterprise) — CI 파이프라인에서 Codex 사용\n- HIPAA-compliant Codex — ChatGPT Enterprise 의료 워크스페이스\n- Remote SSH GA — Codex가 사내 원격 개발 환경에 직접 접속\n\n**왜 중요한가요?**\n\nCodex 주간 사용자 400만 명 + 이번 모바일 추가로 \"코딩 에이전트를 들고 다니는 시대\"가 시작됩니다. OpenAI 공식 인용: *\"Codex가 노트북, devbox, 원격 환경에서 일을 하는 동안 어디서나 흐름을 놓치지 않게 한다.\"* Virgin Atlantic, Cisco, Notion, Rakuten이 이미 프로덕션 도입.\n\n**읽을 때 볼 점**\n\n- 모바일은 코드 작성용이 아니라 \"승인/검토/지시\" 용도\n- Mac 우선, Windows 미정 — 사내 표준 OS가 Windows면 도입 시점 늦어짐\n- Accenture, Capgemini, PwC와 새 Codex Labs 파트너십도 동시기 발표",,
          officialUrl: "https://openai.com/index/`,
          source: "https://openai.com/index/",
          tags: ["Codex", "ChatGPT mobile", "Codex Mac app", "Hooks", "Remote SSH", "공식", "hero후보"],
          featured: true,
          slug: "codex-in-the-chatgpt-mobile-app-ios-andr-13026e4d",
          readMinutes: 5,
        },
      ],
    },
    {
      name: "Google",
      color: "#4285F4",
      posts: [
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Gemini Omni — 텍스트·이미지·오디오·영상을 입력으로 받는 영상 생성·편집 통합 모델",
          summary: "Google이 I/O 2026에서 Gemini Omni를 공개했다. 영상을 단순 생성하는 모델이 아니라 \"추론하는 영상 모델\"로, 시네마틱 줌·배경 교체·등장인물 일관성 유지를 대화형으로 처리한다. 첫 모델 Gemini Omni Flash는 5/19부터 전 세계 Google AI Plus·Pro·Ultra 구독자, Google Flow, YouTube Shorts(무료)에서 즉시 사용 가능.",
          content: "**이게 뭐예요?**\n\nGemini Omni는 Google이 2026년 5월 19일 I/O 2026에서 공개한 새 영상 모델 패밀리입니다. DeepMind CEO Demis Hassabis는 이걸 \"어떤 입력에서든 무엇이든 만들 수 있는 새 모델\"이라고 소개했고, Google은 기존 Veo 라인을 핵심 Gemini 시스템 안으로 통합했다고 설명했습니다. 첫 모델은 **Gemini Omni Flash**입니다.\n\n**무엇이 달라졌나?**\n\n- 입력: 텍스트 + 이미지 + 오디오 + 영상 (멀티모달 입력)\n- 출력: 약 10초짜리 짧은 영상 클립 + 동기화된 오디오\n- \"영상을 만드는 모델\"이 아니라 \"영상을 만드는 추론 모델\" — 맥락, 물리, 의도를 이해해서 다중 턴 편집을 처음부터 다시 생성하지 않고 유지\n- 등장 인물·배경·움직임을 편집 후에도 일관되게 유지 (기존 AI 영상 모델의 약점)\n- 아키텍처: Gemini의 추론 엔진 + Veo의 렌더링 + DeepMind의 Genie 월드 시뮬레이션 + Nano Banana 이미지 편집 레이어 결합\n\n**왜 중요한가요?**\n\nOmni는 별도 제품이 아니라 Gemini 앱·Google Flow·YouTube Shorts·검색에 바로 들어가는 것이 핵심입니다. ByteDance Seedance 2.0이 공개 벤치마크 1위이고 Kling 3.0이 중국 시장을 잡고 있는데, Google의 차별점은 모델 단독 품질이 아니라 \"이미 사용 중인 제품에 통합되어 있다\"는 배포 우위입니다. 또 \"대화형 영상 편집\"이 새 패러다임을 만듭니다 — 시네마틱 줌, 배경 교체를 프롬프트 한 줄로 처리.\n\n**가격·접근**\n\n- YouTube Shorts / YouTube Create: 무료\n- Google AI Plus: 월 $7.99\n- AI Pro: 월 $19.99\n- AI Ultra: 월 $99.99 / $199.99\n- 개발자·기업 API는 \"수주 안에 공개 예정\"\n\n**읽을 때 볼 점**\n\n- Flash 클립 10초 제한은 모델 한계가 아니라 컴퓨트 수요 분산을 위한 배포 결정 (Google DeepMind 제품 책임자 Nicole Brichtova)\n- 모든 영상에 SynthID 비가시 워터마크 + C2PA Content Credentials 강제 — API 플래그로 제거 불가\n- 음성·대사 \"교체\" 편집은 의도적으로 막아둠. Google이 \"가장 위험한 기능\"으로 정의\n- 발표 동시기에 Gemini 3.5 Flash, Gemini Spark agent도 같이 공개됨 (agentic Gemini 흐름의 일부)",
          officialUrl: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
          source: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
          backupUrls: [
            { label: "Google I/O 2026 — agentic Gemini era keynote", url: "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/" },
            { label: "Google AI Studio — Gemini Omni 사용", url: "https://aistudio.google.com" },
            { label: "Decrypt — 'Simulate the World' 분석", url: "https://decrypt.co/368393/google-unveils-gemini-omni-next-gen-ai-video-builder-simulate-world" },
            { label: "TechTimes — 가장 위험한 기능을 막아둔 이유", url: "https://www.techtimes.com/articles/316859/20260519/google-launches-gemini-omni-video-model-holds-back-its-riskiest-feature.htm" },
            { label: "Crypto Briefing — 멀티모달 입력 정리", url: "https://cryptobriefing.com/google-gemini-omni-ai-video-generation/" },
            { label: "큐레이터 스레드 (@choi.openai)", url: "https://www.threads.com/@choi.openai/post/DYuVvqtj8Av" },
          ],
          tags: ["Google DeepMind", "Gemini Omni", "video generation", "multimodal", "Veo", "Genie", "Nano Banana", "공식", "hero"],
          featured: true,
          slug: "gemini-omni-google-io-2026-video-model",
          readMinutes: 5,
          thumbnail: {
            src: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Geminiapp_Bento_hero.width-1600.format-webp.webp",
            alt: "Gemini Omni 공식 hero",
            caption: "Google AI / Gemini app",
          },
          videoUrl: "https://www.youtube.com/embed/GfTDA_TbVQI",
          videoPoster: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Geminiapp_Bento_hero.width-1600.format-webp.webp",
          threadsEmbedUrl: "https://www.threads.com/embed/@choi.openai/post/DYuVvqtj8Av/",
          galleryImages: [
            {
              src: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/IOCollection_social.width-2000.format-webp.webp",
              alt: "Google I/O 2026 컬렉션",
              caption: "Google I/O 2026 — Gemini Omni가 공개된 키노트 컬렉션",
            },
            {
              src: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_Spark_Partners.width-2000.format-webp.webp",
              alt: "Gemini Spark 파트너",
              caption: "함께 발표된 Gemini Spark 에이전트 파트너 (Omni와 같은 agentic 흐름)",
            },
          ],
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "A new experiment brings better group meetings to Google Beam",
          summary: "Google described a Google Beam experiment for more natural hybrid group meetings using HP Dimension immersive displays and spatial audio.",
          officialUrl: "https://blog.google/innovation-and-ai/models-and-research/google-research/google-beam-group-meetings/",
          source: "https://blog.google/innovation-and-ai/models-and-research/google-research/google-beam-group-meetings/",
          tags: ["Google Beam", "Google Research", "공식"],
          slug: "a-new-experiment-brings-better-group-mee-01decd7a",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/a-new-experiment-brings-better-group-mee-01decd7a.png",
            alt: "A new experiment brings better group meetings to Google Beam",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "I/O 2026: Welcome to the agentic Gemini era",
          summary: "Sundar Pichai가 직접 정리한 Google I/O 2026 개요. Gemini 3.5 Flash, Gemini Spark, agentic Search, TPU 8세대, Gemini Omni, SynthID 확장이 한 자리에서 발표됐다.",
          content: `**이게 뭐예요?**

Google CEO Sundar Pichai가 2026년 5월 19일 I/O 2026 키노트에서 발표한 AI 스택 전체 개요입니다. 단일 제품 발표가 아니라 \"Gemini를 운영체제로 만든다\"는 방향성 선언에 가깝습니다.

**무엇이 달라졌나?**

- 모델: Gemini 3.5 Flash 출시 (속도/비용 최적)
- 앱: Gemini app이 \"24시간 능동적인 도우미\"로 재정의
- 에이전트: Gemini Spark (장기 실행 개인 에이전트), Daily Brief
- 영상: Gemini Omni (텍스트·이미지·오디오·영상 통합 영상 모델)
- 검색: agentic Search — 검색이 결과 페이지가 아니라 작업 실행 인터페이스로
- 인프라: TPU 8세대 발표
- 안전: SynthID 워터마크가 비디오·음성까지 확장
- 개발자: Managed Agents in Gemini API, Antigravity 2.0, Google AI Studio 모바일 빌드

**왜 중요한가요?**

이번 I/O는 \"기능 추가\"가 아니라 \"제품 카테고리 재정의\"입니다. 검색은 더 이상 링크 목록이 아니고, 챗봇은 더 이상 단발 응답기가 아니며, 영상 모델은 별도 도구가 아니라 Gemini 안에 통합됩니다. OpenAI Codex의 모바일/Skills 확장, Anthropic Claude Code Agent View와 같은 흐름 — \"AI가 작업 환경 전체를 운영한다\"는 패러다임 전환의 가장 큰 단일 묶음입니다.

**읽을 때 볼 점**

- I/O 발표는 데모와 실제 일반 제공 시점이 다릅니다 (Gemini Omni Flash만 5/19 즉시, 나머지 일부는 \"수주 안에\")
- Antigravity 2.0은 별도 카드로 분리된 \"개발자 키노트\" 결과물입니다
- SynthID 확장은 의무 + 비가시 워터마크라 사용자가 끌 수 없습니다`,
          officialUrl: "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/",
          source: "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/",
          tags: ["Gemini", "Search", "Workspace", "Cloud", "Android", "TPU", "공식", "hero후보"],
          featured: true,
          slug: "i-o-2026-welcome-to-the-agentic-gemini-e-4283a2bd",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/i-o-2026-welcome-to-the-agentic-gemini-e-4283a2bd.png",
            alt: "I/O 2026: Welcome to the agentic Gemini era",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "The Gemini app becomes more agentic, delivering proactive, 24/7 help",
          summary: "Google announced more proactive Gemini app experiences, Daily Brief, Omni video generation, Spark agent functions, and macOS improvements.",
          officialUrl: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
          source: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
          tags: ["Gemini app", "Gemini 3.5 Flash", "Omni", "Daily Brief", "Spark", "공식"],
          slug: "the-gemini-app-becomes-more-agentic-deli-8bec6d8c",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/the-gemini-app-becomes-more-agentic-deli-8bec6d8c.jpg",
            alt: "The Gemini app becomes more agentic, delivering proactive, 24/7 help",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Introducing Managed Agents in the Gemini API",
          summary: "Google이 Gemini API에 Managed Agents(프리뷰)를 공개했다. 개발자가 직접 에이전트 런타임을 운영하지 않고도, Antigravity 기반 에이전트를 보안 클라우드 Linux 샌드박스에서 실행할 수 있다. 도구 호출·다단계 실행·실패 복구·관측이 API 한 번으로 처리된다.",
          content: `**이게 뭐예요?**

Google이 2026년 5월 19일 I/O 2026에서 **Managed Agents in the Gemini API**를 프리뷰로 공개했습니다. 개발자가 에이전트 인프라를 직접 운영하지 않고 Gemini API 한 번으로 \"진짜 에이전트\"를 실행하는 서비스입니다.

**무엇이 달라졌나?**

- 런타임: **Antigravity 2.0** 기반의 보안 클라우드 Linux 샌드박스
- 개발자가 책임 안 지는 영역: 도구 호출, 다단계 실행, 실패 복구, 로깅·관측, 격리
- 개발자가 정의하는 것: 작업 목표, 사용 가능한 도구, 권한 정책
- AI Studio, Vertex AI에서 바로 호출 가능

**왜 중요한가요?**

에이전트를 만드는 회사들이 가장 많이 막히는 단계는 \"모델 호출\"이 아니라 \"안전한 실행 환경 구축\"입니다. AWS Lambda가 서버 운영을 추상화한 것처럼, Managed Agents는 **에이전트 런타임을 추상화**합니다. Anthropic의 Managed Agents, OpenAI의 Codex Skills/Automations와 같은 흐름 — 빅3 모두 \"에이전트 = 호스팅 서비스\"로 수렴.

**읽을 때 볼 점**

- 프리뷰 단계 — SLA, 가격, 동시성 한도는 정식 GA에서 다시 확인 필요
- 샌드박스가 \"Linux\"라는 사실은 의도적: 임의 shell·파일시스템 접근을 허용한다는 의미
- I/O 2026 \"Developer highlights\"의 한 축 (Antigravity 2.0, AI Studio 모바일 빌드와 묶음)`,
          officialUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/managed-agents-gemini-api/",
          source: "https://blog.google/innovation-and-ai/technology/developers-tools/managed-agents-gemini-api/",
          tags: ["Gemini API", "Managed Agents", "Antigravity", "공식", "hero후보"],
          featured: true,
          slug: "introducing-managed-agents-in-the-gemini-ac0ae172",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/introducing-managed-agents-in-the-gemini-ac0ae172.png",
            alt: "Introducing Managed Agents in the Gemini API",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Bring any idea to life: Google AI Studio at I/O 2026",
          summary: "Google announced AI Studio updates for Workspace integration, Android app building, mobile pre-registration, Antigravity export, and no-cost deployment.",
          officialUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-studio-io-2026/",
          source: "https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-studio-io-2026/",
          tags: ["Google AI Studio", "Android", "Workspace", "Antigravity", "공식"],
          slug: "bring-any-idea-to-life-google-ai-studio--66d64068",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/bring-any-idea-to-life-google-ai-studio--66d64068.png",
            alt: "Bring any idea to life: Google AI Studio at I/O 2026",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Building the agentic future: Developer highlights from I/O 2026",
          summary: "Google summarized I/O 2026 developer announcements around Antigravity 2.0, Gemini API Managed Agents, AI Studio integrations, and Build with Gemini XPRIZE Hackathon.",
          officialUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/",
          source: "https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/",
          tags: ["Antigravity 2.0", "Gemini API", "Managed Agents", "Google AI Studio", "공식"],
          slug: "building-the-agentic-future-developer-hi-c8b5b49d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/building-the-agentic-future-developer-hi-c8b5b49d.png",
            alt: "Building the agentic future: Developer highlights from I/O 2026",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "NVIDIA and Google Cloud Empower the Next Wave of AI Builders",
          summary: "",
          officialUrl: "https://blogs.nvidia.com/blog/google-cloud-developer-community-ai-builders/",
          source: "https://blogs.nvidia.com/blog/google-cloud-developer-community-ai-builders/",
          tags: ["NVIDIA AI platform", "Google Cloud", "Gemma", "Nemotron", "공식"],
          slug: "nvidia-and-google-cloud-empower-the-next-639e55a0",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nvidia-and-google-cloud-empower-the-next-639e55a0.jpg",
            alt: "NVIDIA and Google Cloud Empower the Next Wave of AI Builders",
          },
        },
      ],
    },
    {
      name: "Anthropic / Claude",
      color: "#E87040",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Anthropic Claude for Small Business",
          summary: "",
          officialUrl: "https://www.anthropic.com/news/claude-for-small-business",
          source: "https://www.anthropic.com/news/claude-for-small-business",
          tags: ["Claude", "SMB", "go-to-market", "공식"],
          slug: "anthropic-claude-for-small-business-3b7ab7f2",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/anthropic-claude-for-small-business-3b7ab7f2.jpg",
            alt: "Anthropic Claude for Small Business",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Widening the conversation on frontier AI",
          summary: "Anthropic described work to broaden frontier AI discussions with religion, philosophy, culture, and civil society experts.",
          officialUrl: "https://www.anthropic.com/news/widening-conversation-ai",
          source: "https://www.anthropic.com/news/widening-conversation-ai",
          tags: ["AI safety", "governance", "Claude values", "공식"],
          slug: "widening-the-conversation-on-frontier-ai-e122375d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/widening-the-conversation-on-frontier-ai-e122375d.jpg",
            alt: "Widening the conversation on frontier AI",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "KPMG integrates Claude across its core business and workforce of more than 276,000 in strategic alliance",
          summary: "KPMG announced Claude integration across core business workflows and a 276,000+ workforce through a strategic alliance with Anthropic.",
          officialUrl: "https://www.anthropic.com/news/anthropic-kpmg",
          source: "https://www.anthropic.com/news/anthropic-kpmg",
          tags: ["Claude", "Enterprise AI", "Managed Agents", "Claude Code", "공식"],
          slug: "kpmg-integrates-claude-across-its-core-b-e02f19cc",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/kpmg-integrates-claude-across-its-core-b-e02f19cc.jpg",
            alt: "KPMG integrates Claude across its core business and workforce of more than 276,000 in strategic alliance",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Anthropic acquires Stainless",
          summary: "Anthropic acquired Stainless to strengthen Claude developer experience, SDK generation, CLI and MCP-connected tooling.",
          officialUrl: "https://www.anthropic.com/news/anthropic-acquires-stainless",
          source: "https://www.anthropic.com/news/anthropic-acquires-stainless",
          tags: ["Claude Platform", "Stainless", "SDK", "MCP", "공식"],
          slug: "anthropic-acquires-stainless-c7a48d62",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/anthropic-acquires-stainless-c7a48d62.jpg",
            alt: "Anthropic acquires Stainless",
          },
        },
        {
          date: "5/11",
          platform: "X+Threads",
          title: "Claude Code Agent View (Research Preview)",
          summary: "Anthropic이 Claude Code 2.1.139부터 모든 병렬 세션을 한 화면에서 관리하는 Agent View를 Research Preview로 공개했다. 이후 `claude agents --cwd <path>`와 pinned background sessions 같은 후속 업데이트가 같은 주에 추가되며 5월 15일 이후에도 영향이 이어졌다.",
          officialUrl: "https://www.anthropic.com/news",
          source: "https://www.anthropic.com/news",
          tags: ["Claude Code", "Agent View", "multi-agent CLI", "공식"],
          slug: "claude-code-agent-view-research-preview-1cd2fb14",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/claude-code-agent-view-research-preview-1cd2fb14.jpg",
            alt: "Claude Code Agent View (Research Preview)",
          },
        },
      ],
    },
    {
      name: "NVIDIA",
      color: "#76B900",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "NVIDIA GTC Taipei at COMPUTEX: Live Updates on What's Next in AI",
          summary: "",
          officialUrl: "https://blogs.nvidia.com/blog/nvidia-gtc-taipei-computex-2026-news/",
          source: "https://blogs.nvidia.com/blog/nvidia-gtc-taipei-computex-2026-news/",
          tags: ["NVIDIA AI", "GTC Taipei", "COMPUTEX", "Jetson Thor", "공식"],
          slug: "nvidia-gtc-taipei-at-computex-live-updat-03bdec81",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nvidia-gtc-taipei-at-computex-live-updat-03bdec81.jpg",
            alt: "NVIDIA GTC Taipei at COMPUTEX: Live Updates on What's Next in AI",
          },
        },
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Building Token-Metered AI Services on Telco AI Factories",
          summary: "",
          officialUrl: "https://developer.nvidia.com/blog/building-token-metered-ai-services-on-telco-ai-factories/",
          source: "https://developer.nvidia.com/blog/building-token-metered-ai-services-on-telco-ai-factories/",
          tags: ["NVIDIA Telco AI", "AI Factory", "NIM", "NeMo", "공식"],
          slug: "building-token-metered-ai-services-on-te-434cbec0",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/building-token-metered-ai-services-on-te-434cbec0.webp",
            alt: "Building Token-Metered AI Services on Telco AI Factories",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "NVIDIA Announces Financial Results for First Quarter Fiscal 2027",
          summary: "NVIDIA가 2026년 회계연도 Q1(FY27 Q1) 실적을 발표했다. 매출 816억 달러(전년 대비 +85%), Data Center 매출 752억 달러(+92%) — 모두 분기 최고치 경신. 'AI factory 수요'라는 narrative의 첫 정량 증거.",
          content: `**이게 뭐예요?**

NVIDIA가 2026년 5월 20일 회계 분기 Q1 FY27 실적을 공식 발표했습니다.

**핵심 수치 (공식 발표)**

- **총 매출 816억 달러** — 전년 동기 대비 **+85%**, 분기 사상 최고
- **Data Center 매출 752억 달러** — 전년 동기 대비 **+92%**, 역시 분기 최고
- 전체 매출 중 데이터센터 비중 ≈ 92%

**무엇이 달라졌나?**

- 데이터센터가 전체 매출의 거의 모두 — \"NVIDIA = AI 인프라 회사\"라는 정체성이 수치로 굳어짐
- Blackwell 출하가 본격 매출에 반영
- 같은 주 발표 Vera CPU 첫 출하 + GTC Taipei + Dell AI Factory 확장과 한 묶음

**왜 중요한가요?**

시장은 한동안 \"AI 인프라 투자가 거품인가\"를 물었지만, 이번 분기는 \"수요가 공급을 추월한다\"의 실증입니다. Jensen Huang 인용: *\"Demand is going parabolic — utterly parabolic.\"* 같은 흐름의 정량 근거가 OpenAI/Anthropic의 컴퓨트 계약(SpaceX 등)과 맞물려 산업 전체 capex 사이클을 정당화합니다.

**읽을 때 볼 점**

- 분기 가이던스, 마진, 중국 매출 비중 등은 별도 IR 자료에서 확인 필요
- AI 거품론은 매출이 아니라 \"이익 지속성\"으로 옮겨감 (전력·공급망)
- \"AI factory\" 표현은 NVIDIA의 마케팅 프레임 — 모든 데이터센터가 AI factory는 아님",AI factory 수요\"라는 narrative의 첫 정량 증거.`,
          officialUrl: "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-first-quarter-fiscal-2027",
          source: "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-first-quarter-fiscal-2027",
          tags: ["NVIDIA Data Center", "AI factories", "Blackwell", "공식", "hero후보"],
          featured: true,
          slug: "nvidia-announces-financial-results-for-f-b2ddd86c",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/nvidia-announces-financial-results-for-f-b2ddd86c.jpg",
            alt: "NVIDIA Announces Financial Results for First Quarter Fiscal 2027",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Mastering Agentic Techniques: AI Agent Customization",
          summary: "",
          officialUrl: "https://developer.nvidia.com/blog/mastering-agentic-techniques-ai-agent-customization/",
          source: "https://developer.nvidia.com/blog/mastering-agentic-techniques-ai-agent-customization/",
          tags: ["NVIDIA NeMo", "Agentic AI", "Nemotron", "공식"],
          slug: "mastering-agentic-techniques-ai-agent-cu-18dc78b2",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/mastering-agentic-techniques-ai-agent-cu-18dc78b2.webp",
            alt: "Mastering Agentic Techniques: AI Agent Customization",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Add a Specialized Deep Research Skill to Agent Harnesses",
          summary: "",
          officialUrl: "https://developer.nvidia.com/blog/add-a-specialized-deep-research-skill-to-agent-harnesses/",
          source: "https://developer.nvidia.com/blog/add-a-specialized-deep-research-skill-to-agent-harnesses/",
          tags: ["NVIDIA AI-Q", "NeMo Agent Toolkit", "agent harness", "공식"],
          slug: "add-a-specialized-deep-research-skill-to-4d486b31",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/add-a-specialized-deep-research-skill-to-4d486b31.webp",
            alt: "Add a Specialized Deep Research Skill to Agent Harnesses",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "NVIDIA-Verified Agent Skills Provide Capability Governance for AI Agents",
          summary: "",
          officialUrl: "https://developer.nvidia.com/blog/nvidia-verified-agent-skills-provide-capability-governance-for-ai-agents/",
          source: "https://developer.nvidia.com/blog/nvidia-verified-agent-skills-provide-capability-governance-for-ai-agents/",
          tags: ["NVIDIA Agent Skills", "agent governance", "공식"],
          slug: "nvidia-verified-agent-skills-provide-cap-e84a94b7",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nvidia-verified-agent-skills-provide-cap-e84a94b7.webp",
            alt: "NVIDIA-Verified Agent Skills Provide Capability Governance for AI Agents",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Mastering Agentic Techniques: AI Agent Evaluation",
          summary: "",
          officialUrl: "https://developer.nvidia.com/blog/mastering-agentic-techniques-ai-agent-evaluation/",
          source: "https://developer.nvidia.com/blog/mastering-agentic-techniques-ai-agent-evaluation/",
          tags: ["NVIDIA NeMo Agent Toolkit", "agent evaluation", "공식"],
          slug: "mastering-agentic-techniques-ai-agent-ev-8987f06f",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/mastering-agentic-techniques-ai-agent-ev-8987f06f.webp",
            alt: "Mastering Agentic Techniques: AI Agent Evaluation",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "NVIDIA CEO Jensen Huang at Dell Technologies World: Demand Is Going Parabolic, Utterly Parabolic",
          summary: "",
          officialUrl: "https://blogs.nvidia.com/blog/dell-technologies-agent-enterprise-ai/",
          source: "https://blogs.nvidia.com/blog/dell-technologies-agent-enterprise-ai/",
          tags: ["Dell AI Factory with NVIDIA", "Vera Rubin", "enterprise agentic AI", "공식"],
          slug: "nvidia-ceo-jensen-huang-at-dell-technolo-e58f42c0",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nvidia-ceo-jensen-huang-at-dell-technolo-e58f42c0.jpg",
            alt: "NVIDIA CEO Jensen Huang at Dell Technologies World: Demand Is Going Parabolic, Utterly Parabolic",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Vera Arrives: NVIDIA's First CPU Built for Agents Lands at Top AI Labs",
          summary: "NVIDIA의 첫 에이전트 전용 CPU 'Vera'가 첫 출하됐다. Anthropic, OpenAI, SpaceXAI, Oracle Cloud Infrastructure가 첫 수령자. Vera는 Vera Rubin NVL72 시스템의 CPU 절반으로, GPU가 추론을 돌리는 동안 도구 호출·오케스트레이션·샌드박싱·분석·장기 컨텍스트 상태 관리 같은 CPU-heavy 에이전트 작업을 전담한다.",
          content: `**이게 뭐예요?**

NVIDIA가 2026년 5월 18일 첫 에이전트 워크로드 전용 CPU **Vera**의 첫 출하를 발표했습니다. Anthropic, OpenAI, SpaceXAI, Oracle Cloud Infrastructure가 첫 수령자입니다.

**무엇이 달라졌나?**

- Vera는 단독 CPU가 아니라 **Vera Rubin NVL72** 시스템의 핵심 절반
- Rubin GPU(추론용) + Vera CPU(에이전트 오케스트레이션) + BlueField-4 + Spectrum-X + MGX 폼팩터
- Vera가 담당하는 \"에이전트 CPU 작업\":
  - tool calling (LLM이 외부 도구를 호출할 때)
  - orchestration (여러 모델/단계 조율)
  - sandboxing (안전 격리)
  - analytics (실행 결과 분석)
  - long-context state management (긴 대화 상태 유지)

**왜 중요한가요?**

그동안 \"AI 인프라 = GPU\"였는데, NVIDIA는 \"에이전트 시대에는 GPU만으로는 부족하다 — CPU도 에이전트 전용으로 다시 설계해야 한다\"고 주장합니다. 첫 수령자가 Anthropic/OpenAI/SpaceXAI라는 사실 자체가 \"frontier 랩이 다 같이 줄 서서 받았다\"는 시장 신호입니다.

**읽을 때 볼 점**

- 공급 수량·구체 사양·가격은 미공개 (\"top AI labs\"라는 표현만)
- 같은 주 NVIDIA Q1 FY27 실적과 묶어 보면 흐름이 일관: \"AI factory 수요가 parabolic\"이라는 Jensen Huang 발언 ↔ 첫 출하 + 752억$ Data Center 매출
- Dell Technologies World 키노트에서 함께 발표 (Dell AI Factory with NVIDIA 확장)",Vera\"가 첫 출하됐다. Anthropic, OpenAI, SpaceXAI, Oracle Cloud Infrastructure가 첫 수령자. Vera는 Vera Rubin NVL72 시스템의 CPU 절반으로, GPU가 추론을 돌리는 동안 도구 호출·오케스트레이션·샌드박싱·분석·장기 컨텍스트 상태 관리 같은 CPU-heavy 에이전트 작업을 전담한다.`,
          officialUrl: "https://blogs.nvidia.com/blog/vera-cpu-delivery/",
          source: "https://blogs.nvidia.com/blog/vera-cpu-delivery/",
          tags: ["NVIDIA Vera CPU", "Vera Rubin NVL72", "agentic AI infrastructure", "공식", "hero후보"],
          featured: true,
          slug: "vera-arrives-nvidia-s-first-cpu-built-fo-2dd68315",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/vera-arrives-nvidia-s-first-cpu-built-fo-2dd68315.jpg",
            alt: "Vera Arrives: NVIDIA's First CPU Built for Agents Lands at Top AI Labs",
          },
        },
      ],
    },
    {
      name: "GitHub",
      color: "#181717",
      posts: [
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Auto model selection now routes based on your task in VS Code",
          summary: "GitHub Copilot in VS Code now routes to models based on task type through auto model selection.",
          officialUrl: "https://github.blog/changelog/2026-05-20-auto-model-selection-now-routes-based-on-your-task-in-vs-code",
          source: "https://github.blog/changelog/2026-05-20-auto-model-selection-now-routes-based-on-your-task-in-vs-code",
          tags: ["GitHub Copilot", "VS Code", "model routing", "공식"],
          slug: "auto-model-selection-now-routes-based-on-cd41cce4",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/auto-model-selection-now-routes-based-on-cd41cce4.png",
            alt: "Auto model selection now routes based on your task in VS Code",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Easily apply Copilot code review feedback with Copilot cloud agent",
          summary: "GitHub improved Copilot cloud agent so it can help apply code review feedback.",
          officialUrl: "https://github.blog/changelog/2026-05-19-easily-apply-copilot-code-review-feedback-with-copilot-cloud-agent",
          source: "https://github.blog/changelog/2026-05-19-easily-apply-copilot-code-review-feedback-with-copilot-cloud-agent",
          tags: ["GitHub Copilot cloud agent", "code review", "공식", "hero후보"],
          featured: true,
          slug: "easily-apply-copilot-code-review-feedbac-4683c903",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/easily-apply-copilot-code-review-feedbac-4683c903.jpg",
            alt: "Easily apply Copilot code review feedback with Copilot cloud agent",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Gemini 3.5 Flash is generally available for GitHub Copilot",
          summary: "Gemini 3.5 Flash became generally available in GitHub Copilot.",
          officialUrl: "https://github.blog/changelog/2026-05-19-gemini-3-5-flash-is-generally-available-for-github-copilot",
          source: "https://github.blog/changelog/2026-05-19-gemini-3-5-flash-is-generally-available-for-github-copilot",
          tags: ["GitHub Copilot", "models", "공식"],
          slug: "gemini-3-5-flash-is-generally-available--4d91d7f1",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/gemini-3-5-flash-is-generally-available--4d91d7f1.png",
            alt: "Gemini 3.5 Flash is generally available for GitHub Copilot",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "One-click fixes for failing Actions with Copilot cloud agent",
          summary: "GitHub added one-click Copilot cloud agent fixes for failing GitHub Actions workflows.",
          officialUrl: "https://github.blog/changelog/2026-05-18-one-click-fixes-for-failing-actions-with-copilot-cloud-agent",
          source: "https://github.blog/changelog/2026-05-18-one-click-fixes-for-failing-actions-with-copilot-cloud-agent",
          tags: ["GitHub Actions", "Copilot cloud agent", "공식", "hero후보"],
          featured: true,
          slug: "one-click-fixes-for-failing-actions-with-e02c868a",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/one-click-fixes-for-failing-actions-with-e02c868a.png",
            alt: "One-click fixes for failing Actions with Copilot cloud agent",
          },
        },
        {
          date: "5/17",
          platform: "X+Threads",
          title: "GPT-5.3-Codex is now the base model for Copilot Business and Enterprise",
          summary: "GitHub changed the base model for Copilot Business and Enterprise to GPT-5.3-Codex.",
          officialUrl: "https://github.blog/changelog/2026-05-17-gpt-5-3-codex-is-now-the-base-model-for-copilot-business-and-enterprise",
          source: "https://github.blog/changelog/2026-05-17-gpt-5-3-codex-is-now-the-base-model-for-copilot-business-and-enterprise",
          tags: ["GitHub Copilot Business", "GitHub Copilot Enterprise", "공식"],
          slug: "gpt-5-3-codex-is-now-the-base-model-for--d3b67286",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/gpt-5-3-codex-is-now-the-base-model-for--d3b67286.png",
            alt: "GPT-5.3-Codex is now the base model for Copilot Business and Enterprise",
          },
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "Copilot Memory supports user preferences for Pro, Pro+ users",
          summary: "GitHub added user preference support to Copilot Memory for Pro and Pro+ users.",
          officialUrl: "https://github.blog/changelog/2026-05-15-copilot-memory-supports-user-preferences-for-pro-pro-users",
          source: "https://github.blog/changelog/2026-05-15-copilot-memory-supports-user-preferences-for-pro-pro-users",
          tags: ["GitHub Copilot Memory", "공식"],
          slug: "copilot-memory-supports-user-preferences-785b4e51",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/copilot-memory-supports-user-preferences-785b4e51.png",
            alt: "Copilot Memory supports user preferences for Pro, Pro+ users",
          },
        },
      ],
    },
    {
      name: "Cursor / Anysphere",
      color: "#374151",
      posts: [
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Improvements to Cursor Automations",
          summary: "Cursor added Automations to the Agents Window and introduced multi-repository/no-repository automation templates.",
          officialUrl: "https://cursor.com/changelog/05-20-26",
          source: "https://cursor.com/changelog/05-20-26",
          tags: ["Cursor Automations", "Agents Window", "공식"],
          slug: "improvements-to-cursor-automations-4b9e0ee2",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/improvements-to-cursor-automations-4b9e0ee2.png",
            alt: "Improvements to Cursor Automations",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Cursor in Jira",
          summary: "Cursor added Jira integration so users can mention @Cursor or assign issues to run the cloud agent and receive PR links.",
          officialUrl: "https://cursor.com/changelog/05-19-26",
          source: "https://cursor.com/changelog/05-19-26",
          tags: ["Cursor cloud agent", "Jira", "공식"],
          slug: "cursor-in-jira-57aa0e15",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/cursor-in-jira-57aa0e15.png",
            alt: "Cursor in Jira",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Composer 2.5",
          summary: "Cursor Composer 2.5 improved long-running work, instruction following, and collaboration.",
          officialUrl: "https://cursor.com/changelog/composer-2-5",
          source: "https://cursor.com/changelog/composer-2-5",
          tags: ["Cursor Composer", "공식"],
          slug: "composer-2-5-3507df22",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/composer-2-5-3507df22.png",
            alt: "Composer 2.5",
          },
        },
      ],
    },
    {
      name: "Microsoft",
      color: "#00BCF2",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Plan Before You Build: Introducing the Plan agent in Visual Studio",
          summary: "Microsoft introduced a Visual Studio Plan agent for creating, editing, and sharing implementation plans before building.",
          officialUrl: "https://devblogs.microsoft.com/visualstudio/plan-before-you-build-introducing-the-plan-agent-in-visual-studio/",
          source: "https://devblogs.microsoft.com/visualstudio/plan-before-you-build-introducing-the-plan-agent-in-visual-studio/",
          tags: ["Visual Studio", "Copilot", "Plan agent", "공식"],
          slug: "plan-before-you-build-introducing-the-pl-6e7d2f7a",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/plan-before-you-build-introducing-the-pl-6e7d2f7a.webp",
            alt: "Plan Before You Build: Introducing the Plan agent in Visual Studio",
          },
        },
      ],
    },
    {
      name: "xAI / Grok",
      color: "#1D1D1F",
      posts: [
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Grok Build — xAI의 터미널 기반 parallel coding agent (early beta)",
          summary: "xAI가 5/14 공개한 Grok Build CLI/TUI는 풀스크린 터미널 UI, 최대 8개 parallel sub-agent, Plan Mode, 131K~2M 컨텍스트를 지원한다. SuperGrok Heavy 구독자(월 $300, 프로모션 $99) 전용 early beta.",
          content: "**이게 뭐예요?**\n\nGrok Build는 xAI가 2026년 5월 14일 early beta로 공개한 터미널 기반 AI 코딩 에이전트입니다. CLI와 TUI(Terminal User Interface) 양쪽으로 동작하며, 자연어 명령으로 계획→검색→코드 작성/편집→실행→테스트까지 자동화합니다.\n\n설치는 한 줄: `curl -fsSL https://x.ai/cli/install.sh | bash`\n\n**주요 기능 (공식 검증)**\n\n- **TUI**: 풀스크린, 마우스 지원, Vim-like 단축키, 실시간 diff, 멀티 창\n- **Plan Mode**: 작업 계획을 먼저 제시, 개발자가 수정·승인 후 실행 (안전 중심)\n- **Parallel Sub-agent**: 최대 8개 에이전트 동시 독립 작업\n- **컨텍스트**: 131K~2M 토큰 범위 (자료별 편차)\n- Git 통합 / 멀티 파일 편집 / Shell 실행 / X 실시간 검색\n\n**접근성·가격**\n\n현재 SuperGrok Heavy 구독자 전용 early beta. 월 $300, 6개월 프로모션 시 $99. 일반·무료 Grok 사용자는 사용 불가. (x.ai/news/grok-build-cli)\n\n**Claude Code · Codex CLI와의 비교 (해외 리뷰 기준)**\n\n| 항목 | Grok Build | Claude Code | Codex CLI |\n|---|---|---|---|\n| 인터페이스 | Terminal-first TUI (최고 평가) | Terminal + IDE | Terminal shell |\n| 병렬 에이전트 | 최대 8개 (강점) | 1~2개 | 제한적 |\n| Plan Mode | 그래프 + 직접 편집 | 선형 텍스트 | 기본 |\n| 실행 속도 | 가장 빠름 | 계획에서 상대적 느림 | 중간 |\n| Reasoning / 코드 품질 | 빠른 실행 중심 | 가장 우수 (deep reasoning) | 중간~좋음 |\n| 대형 코드베이스 | 모듈러 프로젝트 강함 | monorepo / legacy 최고 | 중간 |\n| SWE-Bench (참고) | ~51% | ~57% | ~54% |\n| Best For | 빠른 prototyping, 대형 리팩토링 | 복잡한 refactoring, 코드 품질 | OpenAI 생태계, 가성비 |\n\n출처: eigent.ai/blog/grok-build-cli, rejoicehub.com (2026.5)\n\n**현재 평가 · 한계**\n\n- 긍정: \"지금까지 본 AI CLI 중 최고의 TUI\", \"parallel agent로 대형 작업 속도가 압도적\" (LinkedIn day-one beta review, X 사용자 후기)\n- 한계: early beta 단계, 접근성 제한, 일부 reasoning depth에서 Claude Code에 뒤처진다는 의견 다수\n- 업데이트: xAI 팀이 매일 패치·기능 추가\n\n**한 줄 요약**\n\nGrok Build는 터미널 중심의 강력한 parallel agentic 코딩 도구로, TUI와 속도에서 차별점을 보이지만, 아직 early beta이며 복잡한 reasoning에서는 Claude Code가 앞선다는 평가가 지배적입니다.",
          officialUrl: "https://x.ai/news/grok-build-cli",
          source: "https://docs.x.ai/developers/release-notes",
          backupUrls: [
            { label: "xAI 공식 — Grok Build CLI 발표", url: "https://x.ai/news/grok-build-cli" },
            { label: "xAI 공식 — x.ai/cli (설치 / 다운로드)", url: "https://x.ai/cli" },
            { label: "xAI Release Notes (Grok Build 0.1 entry)", url: "https://docs.x.ai/developers/release-notes" },
            { label: "Grok Build 0.1 model docs", url: "https://docs.x.ai/developers/models/grok-build-0.1" },
            { label: "eigent.ai — Grok Build vs Claude Code vs Codex CLI", url: "https://eigent.ai/blog/grok-build-cli" },
            { label: "rejoicehub — Grok Build vs Claude Code vs Codex CLI", url: "https://rejoicehub.com/blogs/grok-build-vs-claude-code-vs-codex-cli" },
            { label: "Vercel AI Gateway — Grok Build 0.1 추가", url: "https://vercel.com/changelog/grok-build-0-1-now-available-on-vercel-ai-gateway" },
          ],
          tags: ["xAI", "Grok Build", "CLI", "TUI", "parallel agent", "Plan Mode", "공식", "hero후보"],
          featured: true,
          slug: "grok-build-0-1-added-to-xai-release-note-1de20131",
          readMinutes: 4,
          thumbnail: {
            src: "/og-cache/grok-build-0-1-added-to-xai-release-note-1de20131.jpg",
            alt: "Grok Build 0.1 added to xAI release notes",
          },
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "Grok Model Retirement on May 15, 2026",
          summary: "",
          officialUrl: "https://docs.x.ai/developers/migration/may-15-retirement",
          source: "https://docs.x.ai/developers/migration/may-15-retirement",
          tags: ["xAI API", "Grok Models", "공식"],
          slug: "grok-model-retirement-on-may-15-2026-9ba2517f",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/grok-model-retirement-on-may-15-2026-9ba2517f.jpg",
            alt: "Grok Model Retirement on May 15, 2026",
          },
        },
      ],
    },
    {
      name: "Vercel",
      color: "#000000",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Qwen 3.7 Max now available on Vercel AI Gateway",
          summary: "Vercel added Qwen 3.7 Max to AI Gateway.",
          officialUrl: "https://vercel.com/changelog/qwen-3-7-max-now-available-on-vercel-ai-gateway",
          source: "https://vercel.com/changelog/qwen-3-7-max-now-available-on-vercel-ai-gateway",
          tags: ["Vercel AI Gateway", "Qwen", "공식"],
          slug: "qwen-3-7-max-now-available-on-vercel-ai--ea436015",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/qwen-3-7-max-now-available-on-vercel-ai--ea436015.png",
            alt: "Qwen 3.7 Max now available on Vercel AI Gateway",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Chat SDK now includes AI SDK tools",
          summary: "Vercel added chat/ai and createChatTools(chat) to connect AI agents and SDK actions more easily.",
          officialUrl: "https://vercel.com/changelog/chat-sdk-now-includes-ai-sdk-tools",
          source: "https://vercel.com/changelog/chat-sdk-now-includes-ai-sdk-tools",
          tags: ["Vercel Chat SDK", "AI SDK", "공식"],
          slug: "chat-sdk-now-includes-ai-sdk-tools-fbff1453",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/chat-sdk-now-includes-ai-sdk-tools-fbff1453.png",
            alt: "Chat SDK now includes AI SDK tools",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Grok Build 0.1 now available on Vercel AI Gateway",
          summary: "Vercel added xAI's agentic coding model Grok Build 0.1 to AI Gateway.",
          officialUrl: "https://vercel.com/changelog/grok-build-0-1-now-available-on-vercel-ai-gateway",
          source: "https://vercel.com/changelog/grok-build-0-1-now-available-on-vercel-ai-gateway",
          tags: ["Vercel AI Gateway", "xAI", "agentic coding", "공식"],
          slug: "grok-build-0-1-now-available-on-vercel-a-b7c5d45d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/grok-build-0-1-now-available-on-vercel-a-b7c5d45d.png",
            alt: "Grok Build 0.1 now available on Vercel AI Gateway",
          },
        },
      ],
    },
    {
      name: "Krea",
      color: "#FF3B82",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Krea 2 LoRA training is here",
          summary: "소수 이미지에서 스타일/캐릭터/오브젝트를 학습하는 LoRA를 Krea 2에 직접 학습·강도 조절·다중 LoRA 스택까지 지원.",
          officialUrl: "https://www.krea.ai/release-notes/krea-2-lora-training-is-here",
          source: "https://www.krea.ai/release-notes/krea-2-lora-training-is-here",
          tags: ["Krea 2", "LoRA training", "multi-LoRA stacking", "공식"],
          slug: "krea-2-lora-training-is-here-17d6e9dc",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/krea-2-lora-training-is-here-17d6e9dc.webp",
            alt: "Krea 2 LoRA training is here",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Krea 2 deep dive",
          summary: "Krea 2 스타일 레퍼런스·무드보드·프롬프트 사용법을 정리한 공식 가이드.",
          officialUrl: "https://www.krea.ai/release-notes/krea-2-deep-dive",
          source: "https://www.krea.ai/release-notes/krea-2-deep-dive",
          tags: ["Krea 2", "style references", "moodboard", "공식"],
          slug: "krea-2-deep-dive-91a631fa",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/krea-2-deep-dive-91a631fa.webp",
            alt: "Krea 2 deep dive",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Krea 2 is live for everyone",
          summary: "Krea가 2026년 5월 18일 Krea 2를 전체 사용자에게 공개했다. 5/15 K2 Pro 우선 공개 → 5/18 전체 공개 → 5/19 deep dive → 5/21 LoRA training까지 일주일 안에 풀린 스타일 제어 중심 이미지 파운데이션 모델. 한 주 동안 모든 가입자에게 무제한 Krea 2 생성을 제공.",
          content: `**이게 뭐예요?**

2026년 5월 18일 Krea가 **Krea 2**를 모든 사용자에게 공개했습니다. Krea가 처음부터 직접 학습한 **첫 자체 파운데이션 이미지 모델**입니다.

**한 주 동안의 출시 흐름**

- 5/15: K2 Pro 우선 공개 (Pro 구독자)
- 5/15: Cannes Film Festival에서 실시간 데모
- 5/18: 전체 사용자 공개 + **한 주간 무제한 생성**
- 5/19: deep dive 가이드 (스타일 레퍼런스, 무드보드, 프롬프트 사용법)
- 5/21: **LoRA training 출시** — 소수 이미지에서 스타일/캐릭터/오브젝트 학습

**무엇이 달라졌나?**

Krea가 표현한 핵심: 대부분의 이미지 모델은 무엇(what)을 그릴지 잘 알지만, Krea 2는 어떻게(how) 보이는지에 집중한다. 일러스트, 애니메이션, 포토리얼 사이의 스타일 통제가 핵심 차별점. LoRA training은 다중 LoRA stacking + 강도 조절 지원.

**왜 중요한가요?**

Midjourney·SD·FLUX가 주도하던 이미지 모델 시장에 Krea가 스타일 일관성이라는 좁고 깊은 축으로 정면 진입했습니다. 같은 흐름의 Gemini Omni(영상 분야)와 비슷한 패러다임 — 생성 자체보다 편집·일관성·통제로 무게 중심이 이동.

**읽을 때 볼 점**

- 오픈소스 풍문(5/21 Reddit/X)은 Krea 공식 release notes에 발표 없음 — 풍문 단계로만 취급
- 무제한 생성 프로모션은 한 주 한정
- LoRA training UX는 사용자 학습 곡선이 있음 — Krea 자체 가이드(deep dive) 필수`,
          officialUrl: "https://www.krea.ai/release-notes/krea-2-is-live-for-everyone",
          source: "https://www.krea.ai/release-notes/krea-2-is-live-for-everyone",
          tags: ["Krea 2", "공식"],
          slug: "krea-2-is-live-for-everyone-b5dfeabe",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/krea-2-is-live-for-everyone-b5dfeabe.webp",
            alt: "Krea 2 is live for everyone",
          },
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "K2 is now available for Pro",
          summary: "Krea 2가 Pro 가입자에게 공개됐다. 일러스트, 애니메이션, 포토리얼 사이의 스타일 통제가 핵심.",
          officialUrl: "https://www.krea.ai/release-notes/k2-is-now-available-for-pro",
          source: "https://www.krea.ai/release-notes/k2-is-now-available-for-pro",
          tags: ["Krea 2", "image foundation model", "공식"],
          slug: "k2-is-now-available-for-pro-4a1a33b6",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/k2-is-now-available-for-pro-4a1a33b6.png",
            alt: "K2 is now available for Pro",
          },
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "Krea at Cannes Film Festival",
          summary: "Krea 공동창업자 Diego Rodriguez가 미국관에서 작곡가 Roahn Hylton과 함께 실시간 비주얼 생성 시연.",
          officialUrl: "https://www.krea.ai/release-notes/krea-at-cannes-film-festival",
          source: "https://www.krea.ai/release-notes/krea-at-cannes-film-festival",
          tags: ["Krea 2", "real-time generation", "film", "공식"],
          slug: "krea-at-cannes-film-festival-d09a5965",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/krea-at-cannes-film-festival-d09a5965.png",
            alt: "Krea at Cannes Film Festival",
          },
        },
      ],
    },
    {
      name: "Meta",
      color: "#0866FF",
      posts: [
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Our AI Wearables Are Changing the Game for Disabled People",
          summary: "",
          officialUrl: "https://about.fb.com/news/2026/05/meta-ai-wearables-changing-the-game-for-disabled-people/",
          source: "https://about.fb.com/news/2026/05/meta-ai-wearables-changing-the-game-for-disabled-people/",
          tags: ["Meta AI wearables", "AI glasses", "accessibility", "공식"],
          slug: "our-ai-wearables-are-changing-the-game-f-e1466393",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/our-ai-wearables-are-changing-the-game-f-e1466393.jpg",
            alt: "Our AI Wearables Are Changing the Game for Disabled People",
          },
        },
      ],
    },
    {
      name: "Hugging Face / 모델",
      color: "#FFD21E",
      posts: [
        {
          date: "5/18",
          platform: "X+Threads",
          title: "The Open Agent Leaderboard",
          summary: "IBM Research introduced an Open Agent Leaderboard on the Hugging Face Blog for evaluating agents.",
          officialUrl: "https://huggingface.co/blog/ibm-research/open-agent-leaderboard",
          source: "https://huggingface.co/blog/ibm-research/open-agent-leaderboard",
          tags: ["agent evaluation", "leaderboard", "공식"],
          slug: "the-open-agent-leaderboard-4aacdb26",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/the-open-agent-leaderboard-4aacdb26.png",
            alt: "The Open Agent Leaderboard",
          },
        },
      ],
    },
    {
      name: "오픈소스 / 도구",
      color: "#6B7280",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Nutlope/hallmark — anti-AI-slop 디자인 가이드를 코드 스킬로 패키지화한 오픈소스. 사용자가 찾던 '오픈소스 공유할 만한' 후보.",
          summary: "anti-AI-slop 디자인 가이드를 코드 스킬로 패키지화한 오픈소스. 사용자가 찾던 '오픈소스 공유할 만한' 후보.",
          officialUrl: "https://github.com/Nutlope/hallmark",
          source: "https://github.com/Nutlope/hallmark",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "nutlope-hallmark-anti-ai-slop-디자인-가이드를-코-4fabea9d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nutlope-hallmark-anti-ai-slop-디자인-가이드를-코-4fabea9d.jpg",
            alt: "Nutlope/hallmark — anti-AI-slop 디자인 가이드를 코드 스킬로 패키지화한 오픈소스. 사용자가 찾던 '오픈소스 공유할 만한' 후보.",
          },
        },
        {
          date: "5/21",
          platform: "X+Threads",
          title: "YC Diana Hu — AI-native company 구성 방식",
          summary: "YC 파트너 관점에서 AI-native 회사가 갖춰야 할 구조.",
          officialUrl: "https://www.youtube.com/watch?v=EN7frwQIbKc",
          source: "https://www.youtube.com/watch?v=EN7frwQIbKc",
          tags: ["실전 팁", "공식"],
          slug: "yc-diana-hu-ai-native-company-구성-방식-85b5079d",
          readMinutes: 1,
        },
      ],
    },
  ],
};
