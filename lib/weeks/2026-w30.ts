import type { WeeklyData } from "../data";

// 2026-w30 (7/16 ~ 7/22)
// AB workspace의 normalized/ranked 산출물과 Gemini 3.6 Flash post-window 보강을 반영.

export const week30: WeeklyData = {
  week: 30,
  year: 2026,
  slug: "2026-w30",
  period: "7/16 ~ 7/22",
  totalPosts: 15,
  companies: [
    {
      name: "Google",
      color: "#4285F4",
      posts: [
        {
          date: "7/16",
          platform: "X+Threads",
          title: "NotebookLM, Gemini Notebook으로 이름 바꾸고 클라우드 컴퓨터 탑재",
          featured: true,
          deck: "출처 기반 코드 실행과 데이터 분석을 노트북별 보안 환경에서 처리합니다.",
          summary: "Google이 NotebookLM을 Gemini Notebook으로 바꾸고 각 노트북에 코드 실행·출처 기반 데이터 분석용 보안 클라우드 컴퓨터를 제공하며 Gemini 앱과 동기화합니다.",
          source: "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
          officialUrl: "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
          backupUrls: [],
          tags: ["Google", "AI 제품", "Gemini Notebook"],
          slug: "google-20260716-gemini-notebook",
          en: {
            title: "NotebookLM becomes Gemini Notebook and adds a cloud computer",
            deck: "Each notebook gets a secure environment for source-grounded code execution and data analysis.",
            summary: "Google is renaming NotebookLM to Gemini Notebook, adding a secure cloud computer to each notebook for code execution and source-grounded data analysis, and syncing it with the Gemini app."
          }
        },
        {
          date: "7/21",
          platform: "X+Threads",
          title: "Google, Gemini 3.6 Flash 정식 출시",
          featured: false,
          deck: "빠른 대량 처리 모델이 코딩·컴퓨터 사용·지식 업무를 강화하고 가격을 낮췄습니다.",
          summary: "Google이 속도·비용·대량 에이전트 실행의 균형에 초점을 둔 Gemini 3.6 Flash를 Stable로 출시했습니다. Gemini API는 Stable이지만 GitHub Copilot은 Preview 정책과 점진적 롤아웃 상태입니다. 공개 벤치마크 수치는 Google 발표 또는 발표가 인용한 평가의 조건부 수치로 읽어야 합니다.",
          source: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/",
          officialUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/",
          backupUrls: [
            { label: "Google AI for Developers model card", url: "https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash" },
            { label: "GitHub Copilot availability", url: "https://github.blog/changelog/2026-07-21-gemini-3-6-flash-is-now-available-in-github-copilot/" },
            { label: "Artificial Analysis", url: "https://artificialanalysis.ai/models/gemini-3-6-flash" }
          ],
          tags: ["Google", "Gemini", "프런티어 모델", "에이전트"],
          slug: "google-20260721-gemini-3-6-flash",
          en: {
            title: "Google releases Gemini 3.6 Flash",
            deck: "The high-throughput model improves coding, computer use, and knowledge work while lowering cost.",
            summary: "Google has released Gemini 3.6 Flash as a Stable model focused on the balance of speed, cost, and high-volume agent execution. The Gemini API is Stable, while GitHub Copilot remains subject to Preview policy and gradual rollout. Published benchmark figures should be read with their Google-announcement or cited-evaluation conditions."
          }
        }
      ]
    },
    {
      name: "LM Studio",
      color: "#6B5BFF",
      posts: [
        {
          date: "7/16",
          platform: "X+Threads",
          title: "LM Studio Bionic, 오픈 모델에 코딩·문서 에이전트 연결",
          featured: true,
          deck: "로컬·클라우드 모델로 코드와 PDF·문서·스프레드시트를 다룹니다.",
          summary: "LM Studio가 오픈 모델용 코딩·문서 에이전트 Bionic을 공개했습니다. 로컬·클라우드 모델, 코드베이스 수정, 문서·PDF·스프레드시트 처리, 로컬 Voxtral 음성 전사를 지원합니다.",
          source: "https://lmstudio.ai/blog/introducing-lm-studio-bionic",
          officialUrl: "https://lmstudio.ai/blog/introducing-lm-studio-bionic",
          backupUrls: [],
          tags: ["LM Studio", "에이전트"],
          slug: "lmstudio-20260716-bionic",
          en: {
            title: "LM Studio Bionic connects open models to coding and document agents",
            deck: "It works with local and cloud models across code, PDFs, documents, and spreadsheets.",
            summary: "LM Studio introduced Bionic, a coding and document agent for open models. It supports local and cloud models, codebase edits, document, PDF, and spreadsheet handling, plus local Voxtral transcription."
          }
        }
      ]
    },
    {
      name: "Moonshot AI",
      color: "#16A085",
      posts: [
        {
          date: "7/16",
          platform: "X+Threads",
          title: "Moonshot AI, 2.8T MoE 모델 Kimi K3 공개",
          featured: true,
          deck: "전체 가중치는 7월 27일 공개 예정이며 라이선스는 아직 명시되지 않았습니다.",
          summary: "Moonshot AI가 2.8T MoE, 네이티브 비전, 100만 토큰 컨텍스트를 내세운 Kimi K3를 발표했습니다. 전체 가중치는 7월 27일까지 공개 예정이며, 구체적인 라이선스는 발표문에 명시되지 않았습니다.",
          source: "https://www.kimi.com/blog/kimi-k3",
          officialUrl: "https://www.kimi.com/blog/kimi-k3",
          backupUrls: [],
          tags: ["Moonshot AI", "프런티어 모델", "Kimi"],
          slug: "kimi-20260716-kimi-k3",
          en: {
            title: "Moonshot AI unveils the 2.8T-MoE Kimi K3",
            deck: "Full weights are due by July 27, while the license remains unspecified.",
            summary: "Moonshot AI announced Kimi K3, citing a 2.8T MoE architecture, native vision, and a one-million-token context window. Full weights are expected by July 27, and the announcement does not specify a license."
          }
        }
      ]
    },
    {
      name: "OpenAI",
      color: "#10A37F",
      posts: [
        {
          date: "7/16",
          platform: "X+Threads",
          title: "Codex CLI 0.144.5, 위험 명령 탐지 확대",
          featured: false,
          deck: "강제 rm 변형을 더 넓게 막고 거부 이유를 명확히 표시합니다.",
          summary: "Codex CLI가 강제 rm 변형 탐지를 넓히고 위험 명령 거부 이유를 더 명확히 표시하도록 수정됐습니다.",
          source: "https://github.com/openai/codex/releases/tag/rust-v0.144.5",
          officialUrl: "https://github.com/openai/codex/releases/tag/rust-v0.144.5",
          backupUrls: [],
          tags: ["OpenAI", "AI 보안", "Codex"],
          slug: "openai-codex-20260716-0-144-5",
          en: {
            title: "Codex CLI 0.144.5 broadens dangerous-command detection",
            deck: "It catches more forced-rm variants and makes rejection reasons clearer.",
            summary: "Codex CLI now detects a broader set of forced-rm variants and explains rejected dangerous commands more clearly."
          }
        },
        {
          date: "7/18",
          platform: "X+Threads",
          title: "Codex CLI 0.144.6, GPT-5.6 컨텍스트 창 정정",
          featured: false,
          deck: "Sol·Terra·Luna 지침을 갱신하고 컨텍스트를 27만2천 토큰으로 바로잡았습니다.",
          summary: "Codex가 GPT-5.6 Sol·Terra·Luna 번들 지침을 갱신하고 컨텍스트 창을 272,000토큰으로 바로잡은 핫픽스입니다.",
          source: "https://github.com/openai/codex/releases/tag/rust-v0.144.6",
          officialUrl: "https://github.com/openai/codex/releases/tag/rust-v0.144.6",
          backupUrls: [],
          tags: ["OpenAI", "개발 도구", "Codex"],
          slug: "openai-codex-20260718-0-144-6",
          en: {
            title: "Codex CLI 0.144.6 corrects the GPT-5.6 context window",
            deck: "It updates Sol, Terra, and Luna guidance and corrects context to 272,000 tokens.",
            summary: "This Codex hotfix updates bundled guidance for GPT-5.6 Sol, Terra, and Luna and corrects the context window to 272,000 tokens."
          }
        }
      ]
    },
    {
      name: "Anthropic",
      color: "#E87040",
      posts: [
        {
          date: "7/17",
          platform: "X+Threads",
          title: "Claude Code 2.1.212, 백그라운드 fork와 루프 상한 추가",
          featured: false,
          deck: "대화를 별도 세션으로 복사하고 검색·서브에이전트 폭주를 제한합니다.",
          summary: "대화를 새 백그라운드 세션으로 복사하는 /fork, WebSearch·서브에이전트 세션 한도, 장기 MCP 호출 자동 백그라운드화를 추가하고 계획 모드·worktree 경계 문제를 수정했습니다.",
          source: "https://github.com/anthropics/claude-code/releases/tag/v2.1.212",
          officialUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.212",
          backupUrls: [],
          tags: ["Anthropic", "개발 도구", "Claude Code"],
          slug: "claude-code-20260717-2-1-212",
          en: {
            title: "Claude Code 2.1.212 adds background forking and loop limits",
            deck: "It copies a conversation to a separate session and constrains runaway search and subagents.",
            summary: "Claude Code adds /fork for copying a conversation into a new background session, limits for WebSearch and subagent sessions, and automatic backgrounding for long MCP calls, while fixing plan-mode and worktree-boundary issues."
          }
        },
        {
          date: "7/18",
          platform: "X+Threads",
          title: "Claude Code 2.1.214, 권한 우회 차단과 장기 작업 heartbeat",
          featured: false,
          deck: "여러 권한 검사 우회를 막고 장기 실행 상태를 드러내는 신호를 추가했습니다.",
          summary: "경로 allow 규칙·PowerShell·파일 디스크립터 리다이렉션·초장문 명령의 권한 우회를 막고, EndConversation 도구와 장기 작업 heartbeat를 추가한 보안 중심 릴리스입니다.",
          source: "https://github.com/anthropics/claude-code/releases/tag/v2.1.214",
          officialUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.214",
          backupUrls: [],
          tags: ["Anthropic", "AI 보안", "Claude Code"],
          slug: "claude-code-20260718-2-1-214",
          en: {
            title: "Claude Code 2.1.214 blocks permission bypasses and adds long-task heartbeats",
            deck: "It closes several authorization-check bypasses and surfaces signals for long-running work.",
            summary: "This security-focused release blocks authorization bypasses involving path allow rules, PowerShell, file-descriptor redirection, and extremely long commands, while adding the EndConversation tool and long-task heartbeats."
          }
        },
        {
          date: "7/19",
          platform: "X+Threads",
          title: "Claude Code, verify·code-review 스킬 자동 실행 중단",
          featured: false,
          deck: "두 검증 스킬은 사용자가 명시적으로 호출할 때만 실행하도록 바뀌었습니다.",
          summary: "Claude가 /verify와 /code-review 스킬을 자율 실행하지 않고 사용자가 명시적으로 호출할 때만 실행하도록 동작을 바꿨습니다.",
          source: "https://github.com/anthropics/claude-code/releases/tag/v2.1.215",
          officialUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.215",
          backupUrls: [],
          tags: ["Anthropic", "개발 도구", "Claude Code"],
          slug: "claude-code-20260719-2-1-215",
          en: {
            title: "Claude Code stops auto-running verify and code-review skills",
            deck: "The two verification skills now run only when a user explicitly invokes them.",
            summary: "Claude no longer runs the /verify and /code-review skills autonomously; they now run only when the user explicitly invokes them."
          }
        }
      ]
    },
    {
      name: "Cursor",
      color: "#000000",
      posts: [
        {
          date: "7/20",
          platform: "X+Threads",
          title: "Cursor, agent-swarm model economics",
          featured: false,
          deck: "SQLite 재구축 실험으로 에이전트 스웜 하네스의 운영 비용과 안정성을 비교했습니다.",
          summary: "Cursor가 Rust 기반 SQLite 재구축 실험을 통해 새 에이전트 스웜 하네스의 성능·안정성·비용 효율 개선을 발표했습니다. 성능과 비용 수치는 Cursor 공식 발표의 보고값으로 읽어야 합니다.",
          source: "https://cursor.com/ko/blog/agent-swarm-model-economics",
          officialUrl: "https://cursor.com/ko/blog/agent-swarm-model-economics",
          backupUrls: [],
          tags: ["Cursor", "개발 도구"],
          slug: "cursor-20260720-agent-swarm-economics",
          en: {
            title: "Cursor examines agent-swarm model economics",
            deck: "A SQLite reconstruction experiment compares the operating cost and reliability of an agent-swarm harness.",
            summary: "Cursor reports performance, reliability, and cost-efficiency improvements from a new agent-swarm harness through a Rust-based SQLite reconstruction experiment. Its performance and cost figures are reported in Cursor's own announcement."
          }
        }
      ]
    },
    {
      name: "LG AI연구원",
      color: "#A50034",
      posts: [
        {
          date: "7/20",
          platform: "X+Threads",
          title: "LG·유네스코, 글로벌 AI 윤리 MOOC 프로젝트 시작",
          featured: false,
          deck: "대학·연구기관과 책임 있는 AI 개발·활용 교육 생태계를 만듭니다.",
          summary: "LG AI연구원과 유네스코가 올바른 AI 개발·활용 생태계를 위한 글로벌 AI 윤리 MOOC 프로젝트를 시작했습니다.",
          source: "https://www.lg.co.kr/media/release/30361",
          officialUrl: "https://www.lg.co.kr/media/release/30361",
          backupUrls: [],
          tags: ["LG AI연구원", "한국 AI"],
          slug: "lgai-20260720-unesco-ai-ethics-mooc",
          en: {
            title: "LG and UNESCO launch a global AI ethics MOOC project",
            deck: "It brings universities and research institutions together around responsible AI education.",
            summary: "LG AI Research and UNESCO have started a global AI ethics MOOC project to build an ecosystem for responsible AI development and use."
          }
        }
      ]
    },
    {
      name: "LangChain",
      color: "#1C3C3C",
      posts: [
        {
          date: "7/20",
          platform: "X+Threads",
          title: "LangChain, agent-trace 평가용 IssueBench 소개",
          featured: false,
          deck: "에이전트 trace에서 이슈를 찾고 묶는 과정을 15개 synthetic task로 평가합니다.",
          summary: "LangChain이 에이전트 trace의 이슈 탐지·분류·그룹화를 평가하는 내부 벤치마크 IssueBench를 소개했습니다. 공개된 성능 수치는 해당 공식 발표의 보고값으로 읽어야 합니다.",
          source: "https://www.langchain.com/blog/issuebench-how-we-evaluate-engine",
          officialUrl: "https://www.langchain.com/blog/issuebench-how-we-evaluate-engine",
          backupUrls: [],
          tags: ["LangChain", "에이전트"],
          slug: "langchain-20260720-issuebench",
          en: {
            title: "LangChain introduces IssueBench for agent-trace evaluation",
            deck: "It evaluates finding and grouping issues in agent traces with 15 synthetic tasks.",
            summary: "LangChain introduced IssueBench, an internal benchmark for detecting, categorizing, and grouping issues in agent traces. Published performance figures should be read as figures reported in the official announcement."
          }
        }
      ]
    },
    {
      name: "LG전자",
      color: "#A50034",
      posts: [
        {
          date: "7/16",
          platform: "X+Threads",
          title: "LG 퓨리케어 얼음정수기, AI 음성과 맞춤 출수 적용",
          featured: false,
          deck: "말로 물과 얼음을 받고 사용 패턴에 맞춘 온도·출수량을 제안합니다.",
          summary: "LG전자가 AI 음성인식·사용 패턴 기반 맞춤 출수·씽큐 연동 AI홈 허브 기능을 탑재한 냉동얼음정수기를 공개했습니다.",
          source: "https://www.lg.co.kr/media/release/30350",
          officialUrl: "https://www.lg.co.kr/media/release/30350",
          backupUrls: [],
          tags: ["LG전자", "피지컬 AI"],
          slug: "lge-20260716-puricare-ai-ice-water",
          en: {
            title: "LG PuriCare ice water purifier adds AI voice and personalized dispensing",
            deck: "It takes water and ice requests by voice and suggests temperature and volume from use patterns.",
            summary: "LG Electronics introduced an ice water purifier with AI voice recognition, personalized dispensing based on usage patterns, and ThinQ-connected AI-home-hub features."
          }
        }
      ]
    },
    {
      name: "Feyn Labs",
      color: "#4F46E5",
      posts: [
        {
          date: "7/16",
          platform: "X+Threads",
          title: "Feyn, 데이터베이스를 먼저 살피는 text-to-SQL 모델 SQRL 공개",
          featured: false,
          deck: "쿼리 작성 전 데이터베이스를 살피는 text-to-SQL 모델군을 공개했습니다.",
          summary: "Feyn Labs가 쿼리 생성 전 데이터베이스를 살피는 text-to-SQL 모델군 SQRL을 소개했습니다. 공개된 성능 수치는 해당 공식 발표의 보고값으로 읽어야 합니다.",
          source: "https://usefeyn.com/blog/sqrl-asks-the-database-first/",
          officialUrl: "https://usefeyn.com/blog/sqrl-asks-the-database-first/",
          backupUrls: [],
          tags: ["Feyn Labs", "AI 인프라"],
          slug: "feyn-20260716-sqrl-text-to-sql",
          en: {
            title: "Feyn unveils SQRL, database-aware text-to-SQL models",
            deck: "The model family examines the database before writing a query.",
            summary: "Feyn Labs introduced SQRL, a text-to-SQL model family designed to inspect the database before generating a query. Published performance figures should be read as figures reported in the official announcement."
          }
        }
      ]
    },
    {
      name: "LG유플러스",
      color: "#E6007E",
      posts: [
        {
          date: "7/16",
          platform: "X+Threads",
          title: "LG유플러스, AI 시대 정보보호백서 발간",
          featured: false,
          deck: "AI 보안관제와 정보보호 거버넌스 강화 성과를 공개했습니다.",
          summary: "LG유플러스가 AI 기반 보안관제와 정보보호 거버넌스 강화 성과를 담은 정보보호백서 2025를 발간했습니다.",
          source: "https://www.lg.co.kr/media/release/30349",
          officialUrl: "https://www.lg.co.kr/media/release/30349",
          backupUrls: [],
          tags: ["LG유플러스", "AI 보안"],
          slug: "lguplus-20260716-ai-security-whitepaper",
          en: {
            title: "LG U+ publishes an information-security white paper for the AI era",
            deck: "It reports advances in AI security monitoring and information-security governance.",
            summary: "LG U+ published its Information Security White Paper 2025, covering AI-based security monitoring and efforts to strengthen information-security governance."
          }
        }
      ]
    }
  ]
};
