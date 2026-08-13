import type { WeeklyData } from "../data";

// 2026-w31 (7/27 ~ 8/2)
// 7/27~7/30: AB run 20260730-ab-20260721-20260730 (edition 2026-07c) 산출물.
// 7/31~8/2 : AB run 20260812-075051-ab-20260731-20260812 (edition 2026-08a) 산출물.
//            officialUrl 은 수집 단계에서 직접 fetch 해 본문·발행일을 확인했다.

export const week31: WeeklyData = {
  week: 31,
  year: 2026,
  slug: "2026-w31",
  period: "7/27 ~ 8/2",
  totalPosts: 29,
  companies: [
    {
      name: "Model Context Protocol",
      color: "#3B5BDB",
      posts: [
        {
          date: "7/28",
          platform: "X+Threads",
          title: "MCP 새 스펙, 세션을 없애고 완전 스테이트리스로 전환",
          featured: true,
          deck: "세션 ID와 initialize 핸드셰이크가 사라져 서버 배포가 단순해집니다.",
          summary: "MCP 2026-07-28 스펙이 Mcp-Session-Id와 initialize 핸드셰이크를 제거해 프로토콜을 스테이트리스로 바꿨습니다. HTTP GET과 resources/subscribe는 단일 스트림 subscriptions/listen으로 통합되고, 서버가 클라이언트에 요청을 거는 방식은 클라이언트 재시도 기반으로 대체됩니다. Roots·Sampling·Logging은 12개월 폐기 정책과 함께 deprecated 처리됐습니다.",
          source: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
          officialUrl: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["MCP", "에이전트", "프로토콜"],
          slug: "mcp-20260728-stateless-spec",
          en: {
            title: "The new MCP spec drops sessions and goes fully stateless",
            deck: "Removing session IDs and the initialize handshake simplifies server deployment.",
            summary: "The MCP 2026-07-28 specification removes Mcp-Session-Id and the initialize handshake, making the protocol stateless. HTTP GET and resources/subscribe are consolidated into a single subscriptions/listen stream, and server-initiated requests are replaced by a client-retry model. Roots, Sampling and Logging are deprecated under a new 12-month deprecation policy."
          },
          thumbnail: {
            src: "/og-cache/mcp-새-스펙-세션을-없애고-완전-스테이트리스로-전환-9fd08a9c.png",
            alt: "MCP 새 스펙, 세션을 없애고 완전 스테이트리스로 전환",
          },
        }
      ]
    },
    {
      name: "NVIDIA",
      color: "#76B900",
      posts: [
        {
          date: "7/27",
          platform: "X+Threads",
          title: "일리야 서츠케버의 SSI, NVIDIA와 장기 파트너십 체결",
          featured: true,
          deck: "차세대 Vera Rubin 플랫폼을 공급받아 연산 능력이 약 10배 늘어납니다.",
          summary: "NVIDIA가 일리야 서츠케버가 이끄는 Safe Superintelligence(SSI)에 투자하고 차세대 Vera Rubin 컴퓨팅 플랫폼을 공급하는 장기 전략 파트너십을 발표했습니다. SSI의 연산 능력은 약 10배 확대될 전망입니다. 기존 투자자로는 a16z, DST Global, Greenoaks, Sequoia Capital이 있습니다.",
          source: "https://nvidianews.nvidia.com/news/ilya-sutskevers-safe-superintelligence-inc-and-nvidia-announce-long-term-strategic-partnership",
          officialUrl: "https://nvidianews.nvidia.com/news/ilya-sutskevers-safe-superintelligence-inc-and-nvidia-announce-long-term-strategic-partnership",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["NVIDIA", "SSI", "인프라"],
          slug: "nvidia-20260727-ssi-partnership",
          en: {
            title: "Ilya Sutskever's SSI signs a long-term partnership with NVIDIA",
            deck: "Access to the next-generation Vera Rubin platform expands its compute roughly tenfold.",
            summary: "NVIDIA announced a long-term strategic partnership with Safe Superintelligence, the lab led by Ilya Sutskever, investing in the company and supplying its next-generation Vera Rubin computing platform. SSI's compute capacity is expected to grow about tenfold. Existing investors include a16z, DST Global, Greenoaks and Sequoia Capital."
          },
          thumbnail: {
            src: "/og-cache/일리야-서츠케버의-ssi-nvidia와-장기-파트너십-체결-da53b5bc.jpg",
            alt: "일리야 서츠케버의 SSI, NVIDIA와 장기 파트너십 체결",
          },
        }
      ]
    },
    {
      name: "Moonshot AI",
      color: "#16A085",
      posts: [
        {
          date: "7/27",
          platform: "X+Threads",
          title: "Kimi K3 오픈웨이트 공개 — 2.8T MoE에 100만 토큰 컨텍스트",
          featured: true,
          deck: "허깅페이스에 가중치가 올라가며 프런티어급 오픈 모델 경쟁이 다시 붙었습니다.",
          summary: "문샷AI의 오픈웨이트 멀티모달 모델 Kimi K3 가중치가 허깅페이스에 공개됐습니다. 총 2.8조 파라미터(활성 1,040억)의 MoE 구조에 100만 토큰 컨텍스트를 지원하며, 모델 카드 기준 GPQA Diamond 93.5, Terminal-Bench 2.1 88.3을 기록했다고 밝혔습니다. 벤치마크 수치는 제작사 발표 기준입니다.",
          source: "https://huggingface.co/moonshotai/Kimi-K3",
          officialUrl: "https://huggingface.co/moonshotai/Kimi-K3",
          verifiedAt: "2026-07-31",
          backupUrls: [
            { label: "Moonshot 포럼 공지", url: "https://forum.moonshot.ai/t/kimi-k3-is-here-our-most-capable-model/480" }
          ],
          tags: ["Moonshot AI", "오픈웨이트", "Kimi K3"],
          slug: "moonshotai-20260727-kimi-k3-open-weights",
          en: {
            title: "Kimi K3 open weights land — 2.8T MoE with a 1M-token context",
            deck: "The weights arriving on Hugging Face reopen the frontier-scale open model race.",
            summary: "Moonshot AI published the weights for Kimi K3, its open-weight multimodal model, on Hugging Face. The MoE architecture totals 2.8 trillion parameters with 104 billion active and supports a 1M-token context. The model card reports GPQA Diamond 93.5 and Terminal-Bench 2.1 88.3; those figures are the vendor's own."
          },
          thumbnail: {
            src: "/og-cache/kimi-k3-오픈웨이트-공개-2-8t-moe에-100만-토큰-컨텍스트-b605e00b.png",
            alt: "Kimi K3 오픈웨이트 공개 — 2.8T MoE에 100만 토큰 컨텍스트",
          },
        }
      ]
    },
    {
      name: "Anthropic",
      color: "#E87040",
      posts: [
        {
          date: "7/28",
          platform: "X+Threads",
          title: "Anthropic, Claude가 찾아낸 암호학적 취약점 두 건 공개",
          featured: true,
          deck: "포스트양자 서명 결함과 축소 라운드 AES 지문 알고리즘을 모델이 발견했습니다.",
          summary: "Anthropic이 Claude Mythos Preview가 발견한 암호학 결과 두 건을 공개했습니다. 하나는 포스트양자 서명 알고리즘의 대칭성 결함(HAWK 공격)으로 약 60시간 작업에 키 강도를 절반으로 낮췄고, 다른 하나는 축소 라운드 AES를 겨냥한 새 지문 알고리즘(Möbius Bridge)으로 기존 대비 200~800배 빠릅니다. 상용 시스템에 대한 실질적 영향은 없다고 밝혔습니다.",
          source: "https://www.anthropic.com/research/discovering-cryptographic-weaknesses",
          officialUrl: "https://www.anthropic.com/research/discovering-cryptographic-weaknesses",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["Anthropic", "보안", "연구"],
          slug: "anthropic-20260728-cryptographic-weaknesses",
          en: {
            title: "Anthropic publishes two cryptographic weaknesses found by Claude",
            deck: "The model surfaced a post-quantum signature flaw and a reduced-round AES distinguisher.",
            summary: "Anthropic published two cryptography results discovered by Claude Mythos Preview. The first is a symmetry flaw in a post-quantum signature scheme (the HAWK attack) that halved key strength with roughly 60 hours of work; the second is a new distinguisher against reduced-round AES (Möbius Bridge) that runs 200-800x faster than prior methods. Anthropic says neither has practical impact on deployed systems."
          },
          thumbnail: {
            src: "/og-cache/anthropic-claude가-찾아낸-암호학적-취약점-두-건-공개-ef07e834.png",
            alt: "Anthropic, Claude가 찾아낸 암호학적 취약점 두 건 공개",
          },
        },
        {
          date: "7/27",
          platform: "X+Threads",
          title: "Cognizant, Claude 파트너 네트워크 최상위 등급으로 격상",
          featured: false,
          deck: "제조·생명과학·보험 기업에 Claude를 배치하는 파트너십이 확대됐습니다.",
          summary: "Anthropic과 Cognizant가 파트너십을 확대해 Cognizant를 Claude Partner Network의 Global Premier Partner로 격상했습니다. Cognizant 직원 3만 명 이상이 Claude 교육을 이수했고, Flowsource와 Neuro AI Engineering 등 자체 플랫폼에 Claude를 결합해 제조·생명과학·보험 고객사에 배치합니다.",
          source: "https://www.anthropic.com/news/cognizant-anthropic",
          officialUrl: "https://www.anthropic.com/news/cognizant-anthropic",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["Anthropic", "엔터프라이즈"],
          slug: "anthropic-20260727-cognizant-partnership",
          en: {
            title: "Cognizant is promoted to the top tier of the Claude Partner Network",
            deck: "The expanded partnership targets manufacturing, life sciences and insurance deployments.",
            summary: "Anthropic and Cognizant expanded their partnership, elevating Cognizant to Global Premier Partner in the Claude Partner Network. More than 30,000 Cognizant employees have completed Claude training, and the firm is embedding Claude in its own platforms such as Flowsource and Neuro AI Engineering for manufacturing, life sciences and insurance clients."
          },
          thumbnail: {
            src: "/og-cache/cognizant-claude-파트너-네트워크-최상위-등급으로-격상-2b0c9d29.jpg",
            alt: "Cognizant, Claude 파트너 네트워크 최상위 등급으로 격상",
          },
        }
      ]
    },
    {
      name: "GitHub",
      color: "#24292F",
      posts: [
        {
          date: "7/29",
          platform: "X+Threads",
          title: "Copilot 코드 리뷰, 에이전트 스킬과 MCP 지원을 정식 출시",
          featured: false,
          deck: "팀의 SKILL.md와 MCP 서버를 코드 리뷰 단계에서 그대로 씁니다.",
          summary: "GitHub이 Copilot 코드 리뷰에서 팀의 SKILL.md 기반 에이전트 스킬과 MCP 서버 연결을 정식 출시했습니다. 이슈 트래커나 문서 시스템 같은 외부 컨텍스트를 리뷰에 끌어올 수 있고, 모든 MCP 도구 호출은 읽기 전용으로 제한됩니다.",
          source: "https://github.blog/changelog/2026-07-29-copilot-code-review-agent-skills-and-mcp-now-generally-available/",
          officialUrl: "https://github.blog/changelog/2026-07-29-copilot-code-review-agent-skills-and-mcp-now-generally-available/",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["GitHub", "Copilot", "MCP"],
          slug: "github-20260729-copilot-review-skills-mcp",
          en: {
            title: "Copilot code review ships agent skills and MCP support",
            deck: "Your team's SKILL.md files and MCP servers now apply during review.",
            summary: "GitHub made agent skills based on a team's SKILL.md files and MCP server connections generally available in Copilot code review. Reviews can pull in external context such as issue trackers or documentation systems, and every MCP tool call is restricted to read-only."
          },
          thumbnail: {
            src: "/og-cache/copilot-코드-리뷰-에이전트-스킬과-mcp-지원을-정식-출시-eb80ec1c.jpg",
            alt: "Copilot 코드 리뷰, 에이전트 스킬과 MCP 지원을 정식 출시",
          },
        },
        {
          date: "7/28",
          platform: "X+Threads",
          title: "GitHub Copilot에 xAI Grok 4.5 추가",
          featured: false,
          deck: "최대 50만 토큰 컨텍스트와 세 단계 추론 강도를 지원합니다.",
          summary: "xAI의 추론 모델 Grok 4.5가 GitHub Copilot 모델 목록에 정식 추가됐습니다. 최대 50만 토큰 컨텍스트와 텍스트·이미지 입력, 저·중·고 세 단계 추론 강도를 지원하며, GitHub은 VS Code와 Copilot CLI의 터미널 기반 작업에서 강한 성능을 보였다고 밝혔습니다.",
          source: "https://github.blog/changelog/2026-07-28-grok-4-5-is-now-available-in-github-copilot/",
          officialUrl: "https://github.blog/changelog/2026-07-28-grok-4-5-is-now-available-in-github-copilot/",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["GitHub", "Copilot", "xAI"],
          slug: "github-20260728-grok-45-copilot",
          en: {
            title: "xAI's Grok 4.5 arrives in GitHub Copilot",
            deck: "It supports up to a 500K-token context and three reasoning-effort levels.",
            summary: "xAI's reasoning model Grok 4.5 is now available in the GitHub Copilot model picker. It supports up to a 500,000-token context, text and image input, and low, medium and high reasoning effort. GitHub says it performed strongly on terminal-based coding work in VS Code and Copilot CLI."
          },
          thumbnail: {
            src: "/og-cache/github-copilot에-xai-grok-4-5-추가-83b582fa.png",
            alt: "GitHub Copilot에 xAI Grok 4.5 추가",
          },
        }
      ]
    },
    {
      name: "OpenAI",
      color: "#10A37F",
      posts: [
        {
          date: "7/27",
          platform: "X+Threads",
          title: "OpenAI Agents SDK, 프로그래매틱 툴 콜링 도입",
          featured: false,
          deck: "모델이 자바스크립트를 짜서 여러 툴 호출을 스스로 엮습니다.",
          summary: "OpenAI Agents SDK(Python) 0.19.0이 프로그래매틱 툴 콜링을 추가했습니다. 호환되는 Responses 모델이 자바스크립트를 생성해 여러 툴 호출을 직접 조율하는 방식으로, 툴별 호출자 제한 설정도 함께 제공됩니다.",
          source: "https://github.com/openai/openai-agents-python/releases/tag/v0.19.0",
          officialUrl: "https://github.com/openai/openai-agents-python/releases/tag/v0.19.0",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["OpenAI", "에이전트", "SDK"],
          slug: "openai-20260727-agents-sdk-programmatic-tools",
          en: {
            title: "The OpenAI Agents SDK adds programmatic tool calling",
            deck: "The model writes JavaScript to orchestrate several tool calls on its own.",
            summary: "OpenAI Agents SDK for Python 0.19.0 introduced programmatic tool calling, where a compatible Responses model generates JavaScript that orchestrates multiple tool calls directly. The release also adds per-tool caller restrictions."
          },
          thumbnail: {
            src: "/og-cache/openai-agents-sdk-프로그래매틱-툴-콜링-도입-e69ced4f.png",
            alt: "OpenAI Agents SDK, 프로그래매틱 툴 콜링 도입",
          },
        },
        {
          date: "7/29",
          platform: "X+Threads",
          title: "Codex CLI 0.146.0 — 세션 이름 지정과 에이전트 플러그인",
          featured: false,
          deck: "스레드를 이름으로 관리하고 워크스페이스 플러그인을 배포할 수 있습니다.",
          summary: "Codex CLI 0.146.0이 출시됐습니다. /new와 /clear로 세션에 이름을 붙이고 스레드를 고정하거나 사이드 대화를 관리할 수 있으며, Agent Plugins 매니페스트와 워크스페이스 플러그인 게시를 지원합니다. 페이지네이션 스레드 포크와 WebSocket 기반 원격 Code Mode 호스트 연결도 추가됐습니다.",
          source: "https://github.com/openai/codex/releases/tag/rust-v0.146.0",
          officialUrl: "https://github.com/openai/codex/releases/tag/rust-v0.146.0",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["OpenAI", "Codex", "CLI"],
          slug: "openai-20260729-codex-cli-0-146-0",
          en: {
            title: "Codex CLI 0.146.0 adds named sessions and agent plugins",
            deck: "Threads can be named and pinned, and workspace plugins can be published.",
            summary: "Codex CLI 0.146.0 shipped. /new and /clear can name sessions, pin threads and manage side conversations, and the release supports an Agent Plugins manifest plus publishing workspace plugins. It also adds paginated thread forking and WebSocket-based remote Code Mode host connections."
          },
          thumbnail: {
            src: "/og-cache/codex-cli-0-146-0-세션-이름-지정과-에이전트-플러그인-b08301f7.png",
            alt: "Codex CLI 0.146.0 — 세션 이름 지정과 에이전트 플러그인",
          },
        }
      ]
    },
    {
      name: "Microsoft AI",
      color: "#0078D4",
      posts: [
        {
          date: "7/27",
          platform: "X+Threads",
          title: "마이크로소프트, 보안 특화 모델 MAI-Cyber-1-Flash 공개",
          featured: false,
          deck: "다중 에이전트 시스템 MDASH에 붙여 취약점 탐지 비용을 절반으로 줄였습니다.",
          summary: "마이크로소프트가 코드 취약점 탐지와 완화에 특화된 MAI-Cyber-1-Flash를 다중 에이전트 시스템 MDASH에 결합해 공개했습니다. CyberGym 벤치마크에서 96% 정확도를 기록했고, 기존 MDASH 최고 구성 대비 비용을 50% 줄였다고 밝혔습니다. 성능 수치는 제작사 발표 기준입니다.",
          source: "https://microsoft.ai/news/introducing-mai-cyber-1-flash-inside-mdash/",
          officialUrl: "https://microsoft.ai/news/introducing-mai-cyber-1-flash-inside-mdash/",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["Microsoft", "보안", "에이전트"],
          slug: "microsoft-20260727-mai-cyber-1-flash",
          en: {
            title: "Microsoft introduces MAI-Cyber-1-Flash, a security-focused model",
            deck: "Paired with the MDASH multi-agent system, it halves vulnerability-hunting cost.",
            summary: "Microsoft introduced MAI-Cyber-1-Flash, a model specialised for detecting and mitigating code vulnerabilities, running inside its MDASH multi-agent system. The company reports 96% accuracy on the CyberGym benchmark and a 50% cost reduction versus the previous best MDASH configuration. The figures are the vendor's own."
          },
          thumbnail: {
            src: "/og-cache/마이크로소프트-보안-특화-모델-mai-cyber-1-flash-공개-a906cb2f.png",
            alt: "마이크로소프트, 보안 특화 모델 MAI-Cyber-1-Flash 공개",
          },
        }
      ]
    },
    {
      name: "삼성전자",
      color: "#1428A0",
      posts: [
        {
          date: "7/30",
          platform: "X+Threads",
          title: "삼성전자, AI 메모리 수요로 2분기 사상 최대 실적",
          featured: true,
          deck: "영업이익 89.5조원, 매출 171.5조원으로 분기 최고 기록을 세웠습니다.",
          summary: "삼성전자가 2026년 2분기 영업이익 89.5조원(전년 대비 1,814% 증가)과 매출 171.5조원을 발표해 분기 최고 기록을 세웠습니다. AI 서버용 메모리 수요와 HBM4 생산 확대가 디바이스솔루션 부문 실적을 이끌었다고 설명했습니다.",
          source: "https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2026_2Q_conference_eng.pdf",
          officialUrl: "https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2026_2Q_conference_eng.pdf",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["삼성전자", "반도체", "실적"],
          slug: "samsung-20260730-q2-2026-earnings",
          en: {
            title: "Samsung posts record Q2 results on AI memory demand",
            deck: "Operating profit of 89.5tn won and revenue of 171.5tn won set quarterly highs.",
            summary: "Samsung Electronics reported second-quarter 2026 operating profit of 89.5 trillion won, up 1,814% year on year, on revenue of 171.5 trillion won — both quarterly records. The company attributed the Device Solutions result to AI server memory demand and expanded HBM4 production."
          },
          thumbnail: {
            src: "/og-cache/삼성전자-fms-2026서-zhbm-목업-첫-공개-bebae1c0.jpg",
            alt: "삼성전자, AI 메모리 수요로 2분기 사상 최대 실적",
          },
        }
      ]
    },
    {
      name: "SK하이닉스",
      color: "#EA002C",
      posts: [
        {
          date: "7/29",
          platform: "X+Threads",
          title: "SK하이닉스, 영업이익률 76%로 2분기 최대 실적",
          featured: false,
          deck: "HBM4 양산을 시작했고 HBM4E 샘플도 주요 고객사에 나갔습니다.",
          summary: "SK하이닉스가 2026년 2분기 매출 79.3조원(전년 대비 257% 증가), 영업이익 60.5조원(557% 증가), 영업이익률 76%를 발표했습니다. 차세대 HBM4 양산을 시작했고 HBM4E 샘플을 주요 고객사에 출하했으며, 상반기 누적 매출이 처음으로 100조원을 넘었습니다.",
          source: "https://news.skhynix.com/en/q2-2026-business-results/",
          officialUrl: "https://news.skhynix.com/en/q2-2026-business-results/",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["SK하이닉스", "HBM", "실적"],
          slug: "skhynix-20260729-q2-2026-results",
          en: {
            title: "SK hynix posts a record quarter at a 76% operating margin",
            deck: "HBM4 entered mass production and HBM4E samples shipped to key customers.",
            summary: "SK hynix reported second-quarter 2026 revenue of 79.3 trillion won, up 257% year on year, and operating profit of 60.5 trillion won, up 557%, for a 76% operating margin. The company began mass production of next-generation HBM4, shipped HBM4E samples to major customers, and passed 100 trillion won in first-half revenue for the first time."
          },
          thumbnail: {
            src: "/og-cache/sk하이닉스-영업이익률-76-로-2분기-최대-실적-7c9e8abd.jpg",
            alt: "SK하이닉스, 영업이익률 76%로 2분기 최대 실적",
          },
        }
      ]
    },
    {
      name: "SK텔레콤",
      color: "#EA002C",
      posts: [
        {
          date: "7/29",
          platform: "X+Threads",
          title: "SKT, 독자 파운데이션 모델 2세대 'A.X K2' 공개",
          featured: false,
          deck: "산업 현장과 생활 서비스로 자체 모델 적용을 넓힙니다.",
          summary: "SK텔레콤이 독자 AI 파운데이션 모델의 2차 버전 'A.X K2'를 공개했습니다. 산업 현장과 국민 일상 전반으로 AI 확산을 지원하는 것을 목표로 한다고 밝혔습니다.",
          source: "https://news.sktelecom.com/228501",
          officialUrl: "https://news.sktelecom.com/228501",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["SK텔레콤", "파운데이션 모델", "소버린 AI"],
          slug: "sktelecom-20260729-ax-k2",
          en: {
            title: "SK Telecom unveils A.X K2, its second-generation foundation model",
            deck: "The carrier is widening its own model's reach into industry and consumer services.",
            summary: "SK Telecom unveiled A.X K2, the second version of its in-house AI foundation model. The company says the model is aimed at spreading AI across industrial sites and everyday consumer services."
          },
          thumbnail: {
            src: "/og-cache/skt-독자-파운데이션-모델-2세대-a-x-k2-공개-5c50b84f.jpg",
            alt: "SKT, 독자 파운데이션 모델 2세대 'A.X K2' 공개",
          },
        }
      ]
    },
    {
      name: "크래프톤",
      color: "#F05A22",
      posts: [
        {
          date: "7/29",
          platform: "X+Threads",
          title: "크래프톤, 음성 파운데이션 모델 'Raon-Speech' 공개",
          featured: false,
          deck: "30B 이하 공개 음성 모델 가운데 한국어 종합 성능 1위를 기록했습니다.",
          summary: "크래프톤이 SK텔레콤의 A.X K2 Light 20B-A3B 텍스트 백본에 자체 개발한 AuT 음성 인코더와 Mimi 계열 오디오 코덱을 결합한 음성 파운데이션 모델 'A.X K2 Raon-Speech'(21.2B, 활성 3.5B)를 허깅페이스에 공개했습니다. 30B 이하 공개 음성 언어모델 중 한국어 종합 1위, 영어 3위를 기록했다고 밝혔습니다.",
          source: "https://github.com/krafton-ai/Raon-Speech",
          officialUrl: "https://github.com/krafton-ai/Raon-Speech",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["크래프톤", "음성 AI", "오픈웨이트"],
          slug: "krafton-20260729-raon-speech",
          en: {
            title: "KRAFTON releases Raon-Speech, a speech foundation model",
            deck: "It ranks first in Korean among open speech models under 30B parameters.",
            summary: "KRAFTON published A.X K2 Raon-Speech (21.2B total, 3.5B active) on Hugging Face, combining SK Telecom's A.X K2 Light 20B-A3B text backbone with KRAFTON's own AuT speech encoder and a Mimi-style audio codec. The company reports first place in overall Korean performance and third in English among open speech language models under 30B parameters."
          },
          thumbnail: {
            src: "/og-cache/크래프톤-음성-파운데이션-모델-raon-speech-공개-2f90f60b.png",
            alt: "크래프톤, 음성 파운데이션 모델 'Raon-Speech' 공개",
          },
        }
      ]
    },
    {
      name: "카카오",
      color: "#FEE500",
      posts: [
        {
          date: "7/28",
          platform: "X+Threads",
          title: "카카오, 경량 언어모델 카나나-2 네 종을 오픈소스로 공개",
          featured: false,
          deck: "상업적 활용까지 허용하는 자체 라이선스로 온디바이스 모델을 풀었습니다.",
          summary: "카카오가 Kanana-2-1.3B와 Kanana-2-3B의 base·instruct 네 종을 허깅페이스에 공개했습니다. 상업적 활용까지 허용하는 '카나나 오픈 라이선스'를 적용했고, 한국어 특화 토크나이저로 처리 효율을 30% 이상 개선했다고 밝혔습니다.",
          source: "https://www.kakaocorp.com/page/detail/12089",
          officialUrl: "https://www.kakaocorp.com/page/detail/12089",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["카카오", "오픈소스", "sLM"],
          slug: "kakao-20260728-kanana-2-open-source",
          en: {
            title: "Kakao open-sources four Kanana-2 lightweight language models",
            deck: "The in-house licence permits commercial use of the on-device models.",
            summary: "Kakao released four on-device language models — Kanana-2-1.3B and Kanana-2-3B in base and instruct variants — on Hugging Face under its own Kanana Open License, which permits commercial use. The company says a Korean-specialised tokenizer improved processing efficiency by more than 30%."
          },
          thumbnail: {
            src: "/og-cache/카카오-경량-언어모델-카나나-2-네-종을-오픈소스로-공개-db7f84bf.png",
            alt: "카카오, 경량 언어모델 카나나-2 네 종을 오픈소스로 공개",
          },
        }
      ]
    },
    {
      name: "Atlassian",
      color: "#0052CC",
      posts: [
        {
          date: "7/29",
          platform: "X+Threads",
          title: "아틀라시안 Forge LLM API 정식 출시",
          featured: false,
          deck: "데이터를 아틀라시안 신뢰 경계 밖으로 내보내지 않고 앱에 LLM을 붙입니다.",
          summary: "아틀라시안이 Forge LLM API를 모든 개발자 대상으로 정식 출시했습니다. 아틀라시안 신뢰 경계 안에서 데이터 반출 없이 앱에 LLM을 연결하는 단일 API이며, 이 API를 쓰는 앱은 'Runs on Atlassian' 인증 요건을 충족할 수 있습니다.",
          source: "https://www.atlassian.com/blog/development/forge-llms-api-is-now-ga-heres-how-you-can-build-ai-native-apps-on-atlassian",
          officialUrl: "https://www.atlassian.com/blog/development/forge-llms-api-is-now-ga-heres-how-you-can-build-ai-native-apps-on-atlassian",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["Atlassian", "개발자 도구", "API"],
          slug: "atlassian-20260729-forge-llm-api-ga",
          en: {
            title: "Atlassian's Forge LLMs API reaches general availability",
            deck: "Apps can call an LLM without moving data outside Atlassian's trust boundary.",
            summary: "Atlassian made its Forge LLMs API generally available to all developers. It is a single API for attaching an LLM to an app without moving data outside Atlassian's trust boundary, and apps built on it can meet the requirements for 'Runs on Atlassian' certification."
          },
          thumbnail: {
            src: "/og-cache/아틀라시안-forge-llm-api-정식-출시-cc1f29b1.png",
            alt: "아틀라시안 Forge LLM API 정식 출시",
          },
        }
      ]
    },
    {
      name: "Cursor",
      color: "#000000",
      posts: [
        {
          date: "7/28",
          platform: "X+Threads",
          title: "커서, 인도 개발자용 저가 요금제 'Cursor Start' 출시",
          featured: false,
          deck: "월 649루피에 Grok 4.5와 클라우드 에이전트를 포함합니다.",
          summary: "Cursor가 인도 개발자를 대상으로 월 649루피의 지역 요금제 Cursor Start를 출시했습니다. Grok 4.5 사용, 클라우드 에이전트, iOS 원격 제어 접근이 포함됩니다.",
          source: "https://cursor.com/blog/cursor-start-india",
          officialUrl: "https://cursor.com/blog/cursor-start-india",
          verifiedAt: "2026-07-31",
          backupUrls: [],
          tags: ["Cursor", "요금제", "개발자 도구"],
          slug: "cursor-20260728-cursor-start-india",
          en: {
            title: "Cursor launches Cursor Start, a low-cost plan for Indian developers",
            deck: "At ₹649 a month it bundles Grok 4.5 and cloud agents.",
            summary: "Cursor introduced Cursor Start, a regional plan for developers in India priced at ₹649 per month. It includes access to Grok 4.5, cloud agents and iOS remote control."
          },
          thumbnail: {
            src: "/og-cache/커서-인도-개발자용-저가-요금제-cursor-start-출시-695f902a.png",
            alt: "커서, 인도 개발자용 저가 요금제 'Cursor Start' 출시",
          },
        }
      ]
    },
    {
      name: "OpenAI",
      color: "#10A37F",
      posts: [
        {
          date: "7/31",
          platform: "X+Threads",
          title: "Codex에서 GPT-5.4 계열 8월 31일 종료",
          deck: "8월 31일 이후로는 gpt-5.6-terra와 luna로 갈아타야 합니다.",
          summary: "OpenAI가 Codex에서 GPT-5.4와 GPT-5.4 mini를 2026년 8월 31일에 종료한다고 공지했어요. 대체 모델로 gpt-5.4는 gpt-5.6-terra로, gpt-5.4-mini는 gpt-5.6-luna로 교체하라고 안내했어요. 이 종료는 ChatGPT 계정으로 로그인한 Codex 사용자에게 적용되고, API 키로 인증한 Codex 세션과 OpenAI API에서는 두 모델을 계속 쓸 수 있어요. 워크스페이스 기본값, 커스텀 에이전트, 예약 작업에 남은 모델 지정을 미리 바꿔야 해요.",
          source: "https://learn.chatgpt.com/docs/changelog",
          officialUrl: "https://learn.chatgpt.com/docs/changelog",
          verifiedAt: "2026-08-12",
          backupUrls: [
            { label: "리다이렉트 원본 경로", url: "https://developers.openai.com/codex/changelog/" },
          ],
          tags: ["codex", "deprecation", "developer", "model-retirement"],
          slug: "openai-20260731-gpt-54-and-gpt-54-mini-retire-from-codex-on",
          en: {
            title: "GPT-5.4 and GPT-5.4 mini retire from Codex on August 31",
            deck: "After August 31 you move to gpt-5.6-terra and gpt-5.6-luna.",
            summary: "OpenAI announced GPT-5.4 and GPT-5.4 mini retire from Codex on August 31, 2026. Users should replace gpt-5.4 with gpt-5.6-terra and gpt-5.4-mini with gpt-5.6-luna. The retirement applies to Codex users signed in with ChatGPT; both models remain available on the OpenAI API and for API-key-authenticated Codex sessions.",
          },
          thumbnail: {
            src: "/og-cache/codex에서-gpt-5-4-계열-8월-31일-종료-996eadce.png",
            alt: "Codex에서 GPT-5.4 계열 8월 31일 종료",
          },
        },
        {
          date: "7/31",
          platform: "X+Threads",
          title: "OpenAI, AI 인프라 가치 기준 제시",
          deck: "규모가 아니라 무엇을 가능하게 하느냐로 재자는 주장입니다.",
          summary: "OpenAI가 AI 인프라의 가치를 규모가 아니라 그것이 가능하게 하는 결과로 봐야 한다는 입장을 밝혔어요. 더 뛰어난 지능을 더 많은 사람에게 더 낮은 비용으로 제공하는 것이 기준이라는 설명이에요. 구체적인 기가와트 용량이나 투자 금액 수치는 이 글에서 확인되지 않았어요.",
          source: "https://openai.com/index/building-abundant-intelligence",
          officialUrl: "https://openai.com/index/building-abundant-intelligence",
          verifiedAt: "2026-08-12",
          backupUrls: [],
          tags: ["infrastructure", "policy", "compute", "essay"],
          slug: "openai-20260731-building-abundant-intelligence",
          en: {
            title: "Building abundant intelligence",
            deck: "Judge infrastructure by what it enables, not by how big it is.",
            summary: "OpenAI argued that AI infrastructure is valuable not for its scale but for what it enables: more capable intelligence, available to more people, at lower cost. No specific gigawatt capacity or investment figures were confirmed on the page.",
          },
        },
        {
          date: "8/1",
          platform: "X+Threads",
          title: "Astra 내부 버전, 수학·이론전산 10개 난제 해결",
          featured: true,
          deck: "논증을 Lean으로 형식화했고 토큰 비용은 약 2천 달러였습니다.",
          summary: "OpenAI가 차기 모델 Astra의 내부 버전으로 기하학, 부호이론, 군론, 양자 복잡도 등에서 10개의 진전을 얻었다고 발표했어요. 각 논증은 Lean 인증서로 형식화했고, 해답을 찾는 데 필요한 토큰은 Sol API 요금 기준 약 2,000달러 수준이었다고 밝혔어요. 모두 벤더 자체 발표 수치예요. 동시에 과학자·수학자 10만 명에게 최상위 ChatGPT 모델을 무료 제공하는 ChatGPT for Academic Researchers도 함께 공개했어요.",
          source: "https://openai.com/index/ten-advances-in-mathematics",
          officialUrl: "https://openai.com/index/ten-advances-in-mathematics",
          verifiedAt: "2026-08-12",
          backupUrls: [
            { label: "buildfastwithai 요약", url: "https://www.buildfastwithai.com/blogs/ai-news-today-august-2-2026" },
          ],
          tags: ["research", "mathematics", "astra", "lean", "formal-proof"],
          slug: "openai-20260801-ten-advances-in-mathematics-and-theoretical",
          en: {
            title: "Ten advances in mathematics and theoretical computer science",
            deck: "Each argument was formalized in Lean, at roughly $2,000 of tokens.",
            summary: "OpenAI announced ten advances across mathematics and theoretical computer science achieved by an internal version of Astra, with each argument formalized in a Lean certificate. OpenAI says the tokens needed would cost roughly $2,000 at Sol API rates. It also launched ChatGPT for Academic Researchers, giving 100,000 scientists and mathematicians free access.",
          },
        },
      ],
    },
    {
      name: "Google",
      color: "#4285F4",
      posts: [
        {
          date: "7/31",
          platform: "X+Threads",
          title: "7월 Gemini Drop, macOS 음성 지원",
          deck: "맥에서 활성 창에 대고 말하면 쓰고 고치고 요약합니다.",
          summary: "구글이 2026년 7월 31일 7월 Gemini Drop을 공개했어요. macOS에서 활성 창에 대고 말해 작성·편집·요약하는 음성 기능, Gemini Spark의 전 세계 확대, Gemini 3.6 Flash와 3.5 Flash-Lite 제공, 이미지에 자기 아바타 추가, Dropbox·Zillow Rentals·Viator 연동이 포함돼요. 개인 맞춤 이미지 생성은 미국 전체 사용자에게 열렸어요.",
          source: "https://blog.google/products-and-platforms/products/gemini/gemini-drop-july-2026/",
          officialUrl: "https://blog.google/products-and-platforms/products/gemini/gemini-drop-july-2026/",
          verifiedAt: "2026-08-12",
          backupUrls: [
            { label: "blog.google 공식 RSS(발행일 근거)", url: "https://blog.google/rss/" },
          ],
          tags: ["Google", "Gemini", "제품업데이트", "macOS"],
          slug: "google-20260731-july-2026-gemini-drop-macos-voice-global-spa",
          en: {
            title: "July 2026 Gemini Drop: macOS voice, global Spark, new Flash models",
            deck: "On macOS you speak to the active window to write, edit and summarize.",
            summary: "On July 31, 2026 Google published the July Gemini Drop. It includes speaking to Gemini on macOS to create, edit and summarize in any active window; Gemini Spark going global; Gemini 3.6 Flash and Gemini 3.5 Flash-Lite; adding your own avatar to images; and app links for Dropbox, Zillow Rentals and Viator. Personalized image generation rolled out to all US users.",
          },
          thumbnail: {
            src: "/og-cache/7월-gemini-drop-macos-음성-지원-bae1b04e.png",
            alt: "7월 Gemini Drop, macOS 음성 지원",
          },
        },
      ],
    },
    {
      name: "Y Combinator",
      color: "#FF6600",
      posts: [
        {
          date: "7/31",
          platform: "X+Threads",
          title: "YC, 멀티플레이어 에이전트 하네스 qm 오픈소스 공개",
          featured: true,
          deck: "방마다 메모리·권한·샌드박스가 나뉘고 에이전트는 갈아 낄 수 있습니다.",
          summary: "Y Combinator가 업무용 멀티플레이어 에이전트 하네스 qm을 MIT 라이선스로 공개했어요. Slack과 웹에서 쓰고, 사람과 방(room)마다 메모리, 파일, 키체인, 권한, cron, 웹앱, 샌드박스 환경이 분리돼요. Pi, OpenCode, Codex, Claude Code를 바꿔 끼울 수 있어 특정 벤더에 묶이지 않아요. GitHub API 실측으로 첫 릴리스 v0.1.2가 2026년 7월 31일에 나왔고, 8월 12일 기준 별 13,095개, 포크 1,527개예요.",
          source: "https://github.com/yc-software/qm",
          officialUrl: "https://github.com/yc-software/qm",
          verifiedAt: "2026-08-12",
          backupUrls: [
            { label: "qm.ycombinator.com", url: "https://qm.ycombinator.com/" },
          ],
          tags: ["오픈소스", "에이전트하네스", "YC", "Slack", "MIT"],
          slug: "y-combinator-20260731-y-combinator-open-sources-qm-a-multiplayer-a",
          en: {
            title: "Y Combinator open sources qm, a multiplayer agent harness for work",
            deck: "Rooms get their own memory and permissions; the agent underneath is swappable.",
            summary: "Y Combinator released qm, a multiplayer agent harness for work in Slack and on the web, under MIT. Each person and room gets scoped memory, files, keychain, permissions, crons, web apps, and sandboxes, and deployments can swap between Pi, OpenCode, Codex, or Claude Code. First release v0.1.2 landed 2026-07-31; the repo has 13,095 stars and 1,527 forks.",
          },
          thumbnail: {
            src: "/og-cache/yc-멀티플레이어-에이전트-하네스-qm-오픈소스-공개-85332718.png",
            alt: "YC, 멀티플레이어 에이전트 하네스 qm 오픈소스 공개",
          },
        },
      ],
    },
    {
      name: "DeepSeek",
      color: "#4D6BFE",
      posts: [
        {
          date: "7/31",
          platform: "X+Threads",
          title: "딥시크 V4-Flash-0731 정식 공개",
          featured: true,
          deck: "MIT 가중치에 1M 컨텍스트, 출력 100만 토큰이 0.28달러입니다.",
          summary: "2026년 7월 31일 DeepSeek이 V4-Flash의 정식판 DeepSeek-V4-Flash-0731을 공개했어요. 아키텍처와 크기는 프리뷰와 같고 사후학습만 다시 했는데, 벤더 자체 수치로 Terminal Bench 2.1 82.7, DeepSWE 54.4, Toolathlon-Verified 70.3을 보고했어요. 가중치는 MIT 라이선스로 Hugging Face에 올라왔고, 컨텍스트 1M·최대 출력 384K, 공식 가격은 100만 입력 토큰 $0.14(캐시 미스)·$0.0028(캐시 히트)·출력 $0.28이에요. 독립 평가인 Artificial Analysis 기준으로는 Intelligence Index 52, Agentic Index 48.4로 집계됐어요.",
          source: "https://api-docs.deepseek.com/updates",
          officialUrl: "https://api-docs.deepseek.com/updates",
          verifiedAt: "2026-08-12",
          backupUrls: [
            { label: "Hugging Face 모델카드 (MIT, 벤치마크 표)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731" },
            { label: "DeepSeek 공식 가격·컨텍스트 표", url: "https://api-docs.deepseek.com/quick_start/pricing" },
            { label: "Artificial Analysis 독립 평가", url: "https://artificialanalysis.ai/models/deepseek-v4-flash" },
          ],
          tags: ["DeepSeek", "open-weights", "MIT", "agentic", "1M-context"],
          slug: "deepseek-20260731-deepseek-v4-flash-0731-official-release",
          en: {
            title: "DeepSeek-V4-Flash-0731 Official Release",
            deck: "MIT weights, a 1M context, and output at $0.28 per million tokens.",
            summary: "On 2026-07-31 DeepSeek shipped DeepSeek-V4-Flash-0731, the official (public beta) release of V4-Flash. Same architecture and size as the preview, re-post-trained only. Vendor-reported: Terminal Bench 2.1 82.7, NL2Repo 54.2, Cybergym 76.7, DeepSWE 54.4, Toolathlon-Verified 70.3. Weights on Hugging Face under MIT. Official docs list 1M context, 384K max output, $0.14/$0.28 per 1M input(cache miss)/output tokens. Independent Artificial Analysis: Intelligence Index 52, Agentic Index 48.4.",
          },
          thumbnail: {
            src: "/og-cache/딥시크-v4-flash-0731-정식-공개-916a2975.jpg",
            alt: "딥시크 V4-Flash-0731 정식 공개",
          },
        },
      ],
    },
    {
      name: "LG AI연구원",
      color: "#A50034",
      posts: [
        {
          date: "7/31",
          platform: "X+Threads",
          title: "LG, 7500억 파라미터 K-엑사원 2.0 공개",
          featured: true,
          deck: "국내 최대 750B를 Apache 2.0으로 풀어 상업 사용을 열었습니다.",
          summary: "LG AI연구원이 7월 31일 과기정통부 주관 독자 AI 파운데이션 모델 프로젝트의 2차수 모델 K-엑사원 2.0을 허깅페이스에 공개했어요. 파라미터는 750B(7,500억 개)로 1차수 모델 236B 대비 3배 이상 커졌고, 라이선스는 Apache 2.0으로 전환해 상업적 사용이 가능해요. 벤더 자체 수치로 24개 벤치마크 평균 70.1점(1차수 63.3점), OpenAI-MRCR 94.4점, Ko-LongBench 89.6점을 제시했어요.",
          source: "https://www.lgresearch.ai/blog/view?seq=677",
          officialUrl: "https://www.lgresearch.ai/blog/view?seq=677",
          verifiedAt: "2026-08-12",
          backupUrls: [
            { label: "LG AI Research (English)", url: "https://www.lgresearch.ai/blog/view?seq=678" },
            { label: "뉴스1 보도", url: "https://www.news1.kr/industry/general-industry/6244944" },
          ],
          tags: ["LLM", "오픈웨이트", "독자AI파운데이션모델", "한국", "EXAONE"],
          slug: "lg-ai-20260731-lg-ai-research-releases-k-exaone-20-a-750b-p",
          en: {
            title: "LG AI Research releases K-EXAONE 2.0, a 750B-parameter open-weight model",
            deck: "Korea's largest open model at 750B, relicensed to Apache 2.0.",
            summary: "On July 31, LG AI Research released K-EXAONE 2.0 on Hugging Face as the second-phase model of Korea's government-led sovereign AI foundation model project. At 750B parameters it is more than 3x the first-phase 236B model, and the license was switched to Apache 2.0 for commercial use. Vendor-reported figures: 70.1 average across 24 benchmarks (vs 63.3 for phase one), 94.4 on OpenAI-MRCR, 89.6 on Ko-LongBench.",
          },
          thumbnail: {
            src: "/og-cache/lg-7500억-파라미터-k-엑사원-2-0-공개-ebe5e80b.png",
            alt: "LG, 7500억 파라미터 K-엑사원 2.0 공개",
          },
        },
      ],
    },
    {
      name: "SK텔레콤",
      color: "#EA002C",
      posts: [
        {
          date: "7/31",
          platform: "X+Threads",
          title: "SKT, 피지컬 AI 스타트업 8곳과 협력",
          deck: "가우스랩스·RLWRLD 등 8곳과 제조·물류 공동 실증을 논의했습니다.",
          summary: "SK텔레콤이 7월 31일 피지컬 AI 스타트업 8곳과 로보틱스 생태계 강화를 위해 협력한다고 밝혔어요. 참여 기업은 가우스랩스, RLWRLD, 마키나락스, CMES로보틱스, 위로보틱스, 유일로보틱스, 컨피그인텔리전스, 홀리데이로보틱스예요. 제조·물류·서비스 분야의 공동 실증 방식과 SK그룹의 AI 반도체·AI 데이터센터·디지털 트윈·AI 모델 역량을 결합하는 방안을 논의했어요.",
          source: "https://news.sktelecom.com/228643",
          officialUrl: "https://news.sktelecom.com/228643",
          verifiedAt: "2026-08-12",
          backupUrls: [
            { label: "SKT 뉴스룸 보도자료 목록", url: "https://news.sktelecom.com/category/press-center/%EB%B3%B4%EB%8F%84%EC%9E%90%EB%A3%8C" },
          ],
          tags: ["피지컬AI", "로보틱스", "SK텔레콤", "생태계"],
          slug: "sk-20260731-sk-telecom-partners-with-eight-physical-ai-s",
          en: {
            title: "SK Telecom partners with eight physical AI startups on robotics",
            deck: "Eight robotics startups join SKT for joint trials in manufacturing and logistics.",
            summary: "On July 31, SK Telecom announced collaboration with eight physical AI startups to strengthen the robotics ecosystem: Gauss Labs, RLWRLD, MakinaRocks, CMES Robotics, WIRobotics, Yuil Robotics, Config Intelligence and Holiday Robotics. Talks covered joint demonstrations in manufacturing, logistics and services, and combining SK Group's AI semiconductor, AI data center, digital twin and AI model capabilities with the startups' physical AI technology.",
          },
          thumbnail: {
            src: "/og-cache/skt-피지컬-ai-스타트업-8곳과-협력-c69080fb.jpg",
            alt: "SKT, 피지컬 AI 스타트업 8곳과 협력",
          },
        },
      ],
    },
    {
      name: "European Commission",
      color: "#003399",
      posts: [
        {
          date: "8/2",
          platform: "X+Threads",
          title: "EU AI법 투명성 의무 8월 2일 시행",
          featured: true,
          deck: "챗봇은 사람이 아님을 알리고 딥페이크는 표시해야 합니다.",
          summary: "유럽연합 집행위원회가 2026년 8월 2일부터 AI Office와 회원국 당국이 AI법 집행을 시작한다고 2026년 7월 31일 공지했어요. 같은 날부터 챗봇 등 대화형 AI는 사용자에게 사람이 아님을 알려야 하고, 딥페이크는 표시해야 하며, AI 생성·변형 콘텐츠에는 기계 판독 가능한 표식을 넣어야 해요. 집행위는 투명성 실무규약에 180개 이상 조직이 서명했다고 밝혔어요.",
          source: "https://digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august",
          officialUrl: "https://digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august",
          verifiedAt: "2026-08-12",
          backupUrls: [
            { label: "EC Press corner IP/26/1714 (fetch 시 본문 미반환)", url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1714" },
            { label: "European Commission news — Safer and more transparent AI (2026-08-02)", url: "https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en" },
            { label: "AI Act Service Desk 시행 타임라인", url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act" },
          ],
          tags: ["규제", "EU", "AI법", "투명성", "딥페이크"],
          slug: "european-commissio-20260802-commission-starts-enforcing-ai-act-rules-and",
          en: {
            title: "Commission Starts Enforcing AI Act Rules and New Transparency Requirements on 2 August",
            deck: "Chatbots must say they are AI, and deepfakes must be labelled.",
            summary: "The European Commission announced on July 31, 2026 that from August 2, 2026 its AI Office together with national authorities begins enforcing the AI Act. Transparency rules taking effect require chatbots to disclose they are AI, deepfakes to be labelled, and AI-generated or altered content to carry machine-readable marks. Over 180 organizations have signed the Code of Practice on transparency.",
          },
          thumbnail: {
            src: "/og-cache/anthropic-dxc와-다년-글로벌-얼라이언스-은행-항공-등-규제산업-22518c7f.png",
            alt: "EU AI법 투명성 의무 8월 2일 시행",
          },
        },
      ],
    },
    {
      name: "Reuters",
      color: "#FF8000",
      posts: [
        {
          date: "7/31",
          platform: "X+Threads",
          title: "AI 헤지펀드 7월 포트폴리오 67% 하락",
          deck: "한 달에 67% 빠졌지만 연초 대비로는 여전히 80% 위입니다.",
          summary: "전 오픈AI 연구원 레오폴드 아셴브레너가 운용하는 헤지펀드 Situational Awareness의 포트폴리오 가치가 2026년 7월 한 달간 67% 하락했다고 로이터가 2026년 7월 31일 보도했어요. 이 펀드는 같은 주에 주식 포트폴리오 대부분을 켄 그리핀의 시타델에 매각하고 공모주식 포지션을 대부분 청산했어요. 다만 연초 대비로는 여전히 80% 상승 상태예요.",
          source: "https://wtvbam.com/2026/07/31/situational-awareness-portfolio-sinks-67-in-july-on-ai-stock-rout-letter-shows/",
          officialUrl: "https://wtvbam.com/2026/07/31/situational-awareness-portfolio-sinks-67-in-july-on-ai-stock-rout-letter-shows/",
          verifiedAt: "2026-08-12",
          backupUrls: [
            { label: "Investing.com (Reuters 원문)", url: "https://www.investing.com/news/stock-market-news/situational-awareness-portfolio-sinks-67-in-july-on-ai-stock-rout-letter-shows-4828944" },
            { label: "US News (Reuters 전재)", url: "https://money.usnews.com/investing/news/articles/2026-07-31/situational-awareness-portfolio-sinks-67-in-july-on-ai-stock-rout-letter-shows" },
            { label: "Bloomberg — 7월 헤지펀드 타격 (2026-08-05)", url: "https://www.bloomberg.com/news/articles/2026-08-05/hedge-funds-take-big-hit-in-july-after-bruising-ai-selloff" },
          ],
          tags: ["금융", "AI버블", "헤지펀드", "주식시장"],
          slug: "reuters-20260731-situational-awareness-portfolio-sinks-67-in",
          en: {
            title: "Situational Awareness' Portfolio Sinks 67% in July on AI Stock Rout",
            deck: "Down 67% in a month, yet still up 80% on the year.",
            summary: "Reuters reported on July 31, 2026 that the portfolio value of Leopold Aschenbrenner's hedge fund Situational Awareness fell 67% in July amid an AI stock rout. The fund sold the bulk of its stock portfolio to Ken Griffin's Citadel that week and unwound most of its public equities portfolio, though it remains up 80% in 2026.",
          },
          thumbnail: {
            src: "/og-cache/ai-헤지펀드-7월-포트폴리오-67-하락-60a00fd9.jpg",
            alt: "AI 헤지펀드 7월 포트폴리오 67% 하락",
          },
        },
      ],
    },
    {
      name: "Fortune",
      color: "#B91C1C",
      posts: [
        {
          date: "7/31",
          platform: "X+Threads",
          title: "AI 숨은 차입 1.65조 달러, 채권 973% 급증",
          deck: "4년 만에 8배로 불었고 채권 발행은 연중 973.7% 늘었습니다.",
          summary: "포춘이 2026년 7월 31일 보도에서, 미국 빅테크의 장부 밖 '숨은 부채'가 4년 만에 8배 늘어 1조 6500억 달러에 이르렀다고 전했어요. S&P 글로벌 집계로 하이퍼스케일러와 엔비디아 등 관련 기업이 2026년 들어 발행한 채권은 2250억 달러이고 연간 4000억 달러 페이스인데, 이는 연중 기준 973.7% 증가예요. 무디스는 약 1조 2000억 달러의 장부 밖 약정을 지적했고 그중 8200억 달러 이상이 건설 중인 데이터센터라고 봤어요.",
          source: "https://fortune.com/2026/07/31/ai-debt-hypescalers-capex-capital-spending-hidden-borrowing-bond-issuance/",
          officialUrl: "https://fortune.com/2026/07/31/ai-debt-hypescalers-capex-capital-spending-hidden-borrowing-bond-issuance/",
          verifiedAt: "2026-08-12",
          backupUrls: [
            { label: "Nikkei Asia 원 분석 (2026-07 초, 창 밖)", url: "https://asia.nikkei.com/business/technology/five-us-tech-giants-hidden-debts-soar-to-1.65tn-on-opaque-ai-funding" },
            { label: "Yahoo Finance 전재", url: "https://finance.yahoo.com/technology/ai/articles/nearly-1-000-surge-ai-162106339.html" },
          ],
          tags: ["금융", "AI버블", "데이터센터", "회계", "부채"],
          slug: "fortune-20260731-ai-debt-orgy-hidden-borrowing-explodes-to-16",
          en: {
            title: "AI Debt Orgy: Hidden Borrowing Explodes to $1.65 Trillion",
            deck: "Eight times larger in four years, with bond issuance up 973.7% through midyear.",
            summary: "Fortune reported on July 31, 2026 that hidden debt at U.S. tech giants has exploded by 8x in four years to $1.65 trillion. S&P Global calculated hyperscalers and related entities like Nvidia issued $225 billion in bonds so far in 2026, on pace for $400 billion for the full year — a 973.7% jump through midyear. Moody's flagged roughly $1.2 trillion in off-balance-sheet arrangements, with over $820 billion attributed to data centers still under construction.",
          },
          thumbnail: {
            src: "/og-cache/ai-숨은-차입-1-65조-달러-채권-973-급증-23ae2b80.jpg",
            alt: "AI 숨은 차입 1.65조 달러, 채권 973% 급증",
          },
        },
      ],
    },    {
      name: "ByteDance Seed",
      color: "#325AB4",
      posts: [
        {
          date: "7/31",
          platform: "X+Threads",
          title: "시댄스 2.5, 30초 영상을 오디오까지 한 번에 뽑는다",
          featured: true,
          deck: "짧은 조각을 이어붙이지 않고 단일 생성으로 30초를 만듭니다.",
          summary: "ByteDance Seed가 7월 31일 Seedance 2.5를 공개했어요. 30초 분량 이야기를 한 번의 생성으로 만들도록 설계한 오디오·비디오 결합 모델이고, 두 번까지 이어붙여 더 긴 영상으로 확장할 수 있어요. 레퍼런스 영상의 의도와 프레이밍, 촬영 어법까지 읽어 단순 모션 전이를 넘어선다고 밝혔고 편집 지시 수용 범위도 넓혔다고 해요. 전부 벤더 자체 설명이에요.",
          content: `**무엇이 나왔나**\nByteDance Seed가 7월 31일 **Seedance 2.5**를 공개했습니다. 공식 소개 문구는 "30초 스토리텔링을 위해 만든 차세대 오디오·비디오 결합 생성 모델"입니다.\n\n**핵심은 단일 생성입니다**\n30초짜리를 3초 조각 열 개로 만들어 붙이는 방식이 아니라 **한 번의 생성으로** 뽑습니다. 필요하면 두 번까지 이어 확장할 수 있습니다. 공식 설명으로는 움직임이 더 매끄럽고 일관되며 화면이 더 사실적입니다.\n\n이어붙이기에서 생기는 인물·조명·카메라 불일치가 구조적으로 사라지는 접근입니다.\n\n**레퍼런스와 편집**\n레퍼런스 영상을 더 정확히 이해한다고 밝혔습니다. 의도와 프레이밍, 영화적 어법까지 읽어 **단순 모션 전이를 넘어 창의적 해석으로** 간다는 표현을 썼습니다. 편집은 더 안정적이고, 오디오·비주얼 편집 요청을 더 넓게 받습니다.\n\n**날짜를 정확히 봐야 합니다**\n이 창에 Seedance 2.5 관련 사건이 세 번 있습니다.\n- **7/31** ByteDance Seed 공식 블로그 원 출시\n- **8/6** Luma가 자사 제품에 탑재\n- **8/7** 개발자 API 공개(2차 자료)\n\n통합 서비스 탑재일과 원개발사 출시일은 별개 사건입니다. Luma 소식만 보면 원 출시를 놓칩니다.\n\n**직접 확인할 것**\n제품 페이지에는 게시일이 없고 스펙만 있습니다. 날짜 근거는 공식 블로그 인덱스입니다. 도입 검토하실 때 해상도·요금·지역 제한은 별도로 확인하십시오 — 같은 창에서 MiniMax H3가 라이선스로 한국을 제외한 사례가 있습니다.`,
          source: "https://seed.bytedance.com/en/seedance2_5",
          officialUrl: "https://seed.bytedance.com/en/seedance2_5",
          verifiedAt: "2026-08-13",
          backupUrls: [
            { label: "ByteDance Seed 공식 블로그 인덱스 (게시일 Jul 31, 2026 근거)", url: "https://seed.bytedance.com/en/blog" },
            { label: "Seed 모델 목록", url: "https://seed.bytedance.com/en/models" },
          ],
          tags: ["ByteDance", "Seedance", "영상 생성", "생성형 미디어"],
          slug: "bytedance-20260731-seedance-2-5",
          en: {
            title: "Seedance 2.5 generates 30 seconds of video with audio in one pass",
            deck: "A single generation rather than short clips stitched together.",
            summary: "ByteDance Seed introduced Seedance 2.5 on July 31, an audio-video joint generation model built for 30-second storytelling in a single generation, extendable twice for longer pieces. The company says it reads a reference video's intention, framing and cinematic language rather than merely transferring motion, and accepts a wider range of editing requests. All figures are the vendor's own.",
            content: `**What shipped**\nByteDance Seed introduced **Seedance 2.5** on July 31. The official line: "a next-generation audio-video joint generation model, built for 30-second storytelling with precise reference control and powerful editing capabilities."\n\n**Single-pass is the point**\nRather than assembling ten three-second clips, it creates "videos up to 30 seconds in a single generation, with the option to extend twice for richer, more complete storytelling." Motion is "smoother and more consistent," and visuals "more realistic," per the company.\n\nThat approach structurally removes the character, lighting and camera drift that stitching introduces.\n\n**Reference and editing**\nThe model "understands reference videos more precisely — capturing the intention, framing, and cinematic language to go beyond motion transfer into creative interpretation." Editing is described as more reliable across a wider range of audio and visual requests.\n\n**Read the dates carefully**\nThree separate events sit in this window: the ByteDance Seed launch post on July 31, Luma shipping it inside its own product on August 6, and the developer API on August 7 per secondary sources. An integration date is not a launch date.\n\n**What to check**\nThe product page carries specs but no publication date; the date evidence is the official blog index. Verify resolution, pricing and territorial limits separately — MiniMax H3 excluded Korea by licence in this same window.`
          },
        }
      ]
    },
  ],
};
