import type { WeeklyData } from "../data";

// 2026-w29 (7/9 ~ 7/15)
// Source: AB normalized and ranked artifacts. Posts are archive-rank ordered within their company group.

export const week29: WeeklyData = {
  "week": 29,
  "year": 2026,
  "slug": "2026-w29",
  "period": "7/9 ~ 7/15",
  "totalPosts": 35,
  "companies": [
    {
      "name": "GitHub / Microsoft",
      "color": "#5E5CE6",
      "posts": [
        {
          "date": "7/9",
          "platform": "X+Threads",
          "title": "GitHub Copilot, GPT-5.6 3종 단계적 제공",
          "deck": "Sol·Terra·Luna가 IDE·CLI·클라우드 에이전트로 순차 확대된다.",
          "summary": "GitHub Copilot이 GPT-5.6 3종을 IDE·CLI·클라우드 에이전트·모바일에 단계적으로 제공합니다.",
          "source": "https://github.blog/changelog/2026-07-09-openais-gpt-5-6-sol-terra-and-luna-are-now-available-in-github-copilot",
          "officialUrl": "https://github.blog/changelog/2026-07-09-openais-gpt-5-6-sol-terra-and-luna-are-now-available-in-github-copilot",
          "backupUrls": [],
          "tags": [
            "GitHub",
            "개발 도구",
            "Copilot"
          ],
          "slug": "github-20260709-gpt56-copilot",
          "en": {
            "title": "GitHub Copilot begins phased availability of three GPT-5.6 models",
            "deck": "Sol, Terra, and Luna are expanding in stages across IDEs, CLI, and cloud agents.",
            "summary": "GitHub Copilot is making the three GPT-5.6 models available in stages across IDEs, CLI, cloud agents, and mobile."
          },
          "featured": true
        },
        {
          "date": "7/10",
          "platform": "X+Threads",
          "title": "GitHub, 코드 스캔 경고를 고치는 에이전트 공개 프리뷰",
          "deck": "경고 분석부터 수정·재검증·초안 PR까지 이어가되 인간 검토를 남긴다.",
          "summary": "Copilot이 CodeQL·외부 코드 스캔 경고를 분석하고 수정·재검증한 뒤 draft PR을 만드는 공개 프리뷰입니다.",
          "source": "https://github.blog/changelog/2026-07-10-agentic-autofix-for-code-scanning-alerts-in-public-preview",
          "officialUrl": "https://github.blog/changelog/2026-07-10-agentic-autofix-for-code-scanning-alerts-in-public-preview",
          "backupUrls": [],
          "tags": [
            "GitHub",
            "AI 보안",
            "Copilot"
          ],
          "slug": "github-20260710-agentic-autofix",
          "en": {
            "title": "GitHub previews an agent that fixes code-scanning alerts",
            "deck": "It carries work from alert analysis through a fix, revalidation, and a draft PR, while retaining human review.",
            "summary": "In public preview, Copilot analyzes CodeQL and third-party code-scanning alerts, fixes and revalidates them, then creates a draft pull request."
          },
          "featured": true
        },
        {
          "date": "7/10",
          "platform": "X+Threads",
          "title": "CodeQL 2.26, AI 시스템 프롬프트 인젝션 탐지",
          "deck": "주요 GenAI API의 시스템 지시 오염 경로를 정적 분석 범위에 넣었다.",
          "summary": "CodeQL이 OpenAI·Anthropic·Google GenAI API의 프롬프트 인젝션 sink를 넓히고 시스템 프롬프트 오염 쿼리를 추가했습니다.",
          "source": "https://github.blog/changelog/2026-07-10-codeql-2-26-0-adds-kotlin-2-4-0-support-and-ai-prompt-injection-detection",
          "officialUrl": "https://github.blog/changelog/2026-07-10-codeql-2-26-0-adds-kotlin-2-4-0-support-and-ai-prompt-injection-detection",
          "backupUrls": [],
          "tags": [
            "GitHub",
            "AI 보안"
          ],
          "slug": "github-20260710-codeql-2-26",
          "en": {
            "title": "CodeQL 2.26 adds AI system-prompt injection detection",
            "deck": "Static analysis now covers paths that can contaminate system instructions in major GenAI APIs.",
            "summary": "CodeQL expands prompt-injection sinks for OpenAI, Anthropic, and Google GenAI APIs and adds queries for system-prompt contamination."
          }
        },
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "Copilot 앱에서 커밋 전 보안 검토를 실행한다",
          "deck": "/security-review가 고신뢰 취약점과 수정 방향을 우선 제시한다.",
          "summary": "Copilot 앱에서 /security-review로 커밋 전 변경의 고신뢰 취약점을 우선순위·수정 가이드와 함께 점검합니다.",
          "source": "https://github.blog/changelog/2026-07-14-security-reviews-now-available-in-the-github-copilot-app",
          "officialUrl": "https://github.blog/changelog/2026-07-14-security-reviews-now-available-in-the-github-copilot-app",
          "backupUrls": [],
          "tags": [
            "GitHub",
            "AI 보안",
            "Copilot"
          ],
          "slug": "github-20260714-security-review-app",
          "en": {
            "title": "Run a pre-commit security review in the Copilot app",
            "deck": "/security-review prioritizes high-confidence vulnerabilities and suggests remediation.",
            "summary": "The Copilot app can use /security-review to check pre-commit changes for high-confidence vulnerabilities, with priorities and remediation guidance."
          }
        },
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "JetBrains Copilot, BYOK와 Claude 에이전트 확장",
          "deck": "OpenAI 호환 엔드포인트 연결과 Claude 에이전트 제공자를 프리뷰한다.",
          "summary": "JetBrains Copilot이 OpenAI 호환 BYOK 엔드포인트, Claude agent provider, 로컬 샌드박스와 디버거 스킬을 확장했습니다.",
          "source": "https://github.blog/changelog/2026-07-14-github-copilot-for-jetbrains-expands-byok-capabilities",
          "officialUrl": "https://github.blog/changelog/2026-07-14-github-copilot-for-jetbrains-expands-byok-capabilities",
          "backupUrls": [],
          "tags": [
            "GitHub",
            "개발 도구",
            "Copilot"
          ],
          "slug": "github-20260714-jetbrains-byok",
          "en": {
            "title": "JetBrains Copilot expands BYOK and Claude agent support",
            "deck": "It previews OpenAI-compatible endpoints and Claude agent providers.",
            "summary": "GitHub Copilot for JetBrains expands OpenAI-compatible BYOK endpoints, Claude agent providers, local sandboxes, and debugger skills."
          }
        },
        {
          "date": "7/9",
          "platform": "X+Threads",
          "title": "Copilot이 처음 보는 저장소의 개요를 만든다",
          "deck": "저장소 목적과 기술, 기여 방법을 요약하고 README 초안도 생성한다.",
          "summary": "처음 보는 저장소에서 목적·기술·기여 방법을 Copilot이 요약하고 README가 없으면 초안을 만들 수 있습니다.",
          "source": "https://github.blog/changelog/2026-07-09-ask-copilot-for-a-repository-overview",
          "officialUrl": "https://github.blog/changelog/2026-07-09-ask-copilot-for-a-repository-overview",
          "backupUrls": [],
          "tags": [
            "GitHub",
            "개발 도구",
            "Copilot"
          ],
          "slug": "github-20260709-repository-overview",
          "en": {
            "title": "Copilot creates an overview of an unfamiliar repository",
            "deck": "It summarizes purpose, technology, and contribution steps, and can draft a README.",
            "summary": "For an unfamiliar repository, Copilot can summarize its purpose, technologies, and contribution steps, and draft a README if one is missing."
          }
        }
      ]
    },
    {
      "name": "네이버",
      "color": "#03C75A",
      "posts": [
        {
          "date": "7/15",
          "platform": "X+Threads",
          "title": "네이버 AI탭 1천만 사용자, 검색에서 실행으로 확장",
          "deck": "질의 증가와 함께 구매·예약까지 잇는 에이전틱 검색을 예고했다.",
          "summary": "네이버 AI탭 이용자가 1천만 명에 도달했고 구매·예약 실행까지 잇는 에이전틱 검색으로 확장됩니다.",
          "source": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034477",
          "officialUrl": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034477",
          "backupUrls": [],
          "tags": [
            "네이버",
            "한국 AI"
          ],
          "slug": "naver-20260715-ai-tab",
          "en": {
            "title": "Naver AI Tab reaches 10 million users and expands from search to action",
            "deck": "Growing query volume points toward agentic search that connects to purchases and reservations.",
            "summary": "Naver says AI Tab has reached 10 million users and will expand into agentic search that connects searches with purchases and reservations."
          },
          "featured": true
        },
        {
          "date": "7/13",
          "platform": "X+Threads",
          "title": "네이버, ICML 2026에서 AI 풀스택 연구 6편 공개",
          "deck": "안전성·모델 병합·에이전트·3D와 Seoul World Model을 함께 선보였다.",
          "summary": "네이버가 서울 ICML 2026에서 안전성·모델 병합·에이전트 워크플로·3D·소버린 의료평가 논문 6편과 Seoul World Model을 공개했습니다.",
          "source": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034468",
          "officialUrl": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034468",
          "backupUrls": [],
          "tags": [
            "네이버",
            "한국 AI"
          ],
          "slug": "naver-20260713-icml-ai-fullstack",
          "en": {
            "title": "Naver presents six AI full-stack research papers at ICML 2026",
            "deck": "Safety, model merging, agents, 3D, and the Seoul World Model appear together.",
            "summary": "At ICML 2026 in Seoul, Naver presented six papers spanning safety, model merging, agent workflows, 3D, and sovereign medical evaluation, alongside the Seoul World Model."
          }
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "7/9",
          "platform": "X+Threads",
          "title": "GPT-5.6 Sol·Terra·Luna, 앱과 API 롤아웃 시작",
          "deck": "7월 9일 ChatGPT·Codex·API에서 단계적 제공이 시작됐다.",
          "summary": "OpenAI는 7월 9일 GPT-5.6 Sol·Terra·Luna의 ChatGPT·Codex·API 롤아웃을 시작했다. 공식 X와 GitHub 공식 changelog가 단계적 제공을 확인하며, GA 완료로 표현하지 않는다.",
          "source": "https://openai.com/index/gpt-5-6/",
          "officialUrl": "https://openai.com/index/gpt-5-6/",
          "backupUrls": [
            {
              "url": "https://x.com/OpenAI/status/2075271421149020426",
              "label": "공식 X (출시 원문)"
            },
            {
              "url": "https://github.blog/changelog/2026-07-09-openais-gpt-5-6-sol-terra-and-luna-are-now-available-in-github-copilot",
              "label": "GitHub 공식 changelog (Copilot rollout)"
            }
          ],
          "tags": [
            "OpenAI",
            "프런티어 모델"
          ],
          "slug": "openai-20260709-gpt-5-6-ga",
          "en": {
            "title": "GPT-5.6 Sol, Terra, and Luna begin rolling out in apps and APIs",
            "deck": "The July 9 staged rollout began across ChatGPT, Codex, and the API.",
            "summary": "OpenAI began a phased rollout across ChatGPT, Codex, and the API on July 9; this is not completed general availability."
          }
        },
        {
          "date": "7/9",
          "platform": "X+Threads",
          "title": "Codex CLI 0.144.0, 쓰기 승인과 MCP 인증 보강",
          "deck": "쓰기 작업만 승인받는 모드와 MCP 대화형 인증 흐름을 추가했다.",
          "summary": "Codex 0.144.0은 쓰기 작업만 승인받는 앱 승인 모드, MCP 대화형 인증, 호스트 제공 인증, Ultra 고동시성 사용량 경고를 추가했습니다.",
          "source": "https://github.com/openai/codex/releases/tag/rust-v0.144.0",
          "officialUrl": "https://github.com/openai/codex/releases/tag/rust-v0.144.0",
          "backupUrls": [],
          "tags": [
            "OpenAI",
            "개발 도구",
            "Codex"
          ],
          "slug": "openai-codex-20260709-0-144-0",
          "en": {
            "title": "Codex CLI 0.144.0 improves write approvals and MCP authentication",
            "deck": "It adds a write-only approval mode and interactive MCP authentication.",
            "summary": "Codex 0.144.0 adds an approval mode that requests approval only for writes, interactive and host-provided MCP authentication, and high-concurrency usage warnings for Ultra."
          }
        }
      ]
    },
    {
      "name": "Thinking Machines Lab",
      "color": "#111827",
      "posts": [
        {
          "date": "7/15",
          "platform": "X+Threads",
          "title": "Thinking Machines, 975B 오픈웨이트 모델 Inkling 공개",
          "deck": "전체 가중치는 공개됐지만 구체적인 라이선스명은 발표문에 없었다.",
          "summary": "Thinking Machines Lab이 975B 총·41B 활성 MoE 기반의 Inkling을 오픈웨이트로 공개했다. 전체 가중치 배포는 확인됐지만 구체 라이선스명이 없어 오픈소스나 자유로운 이용 조건으로 단정하지 않는다.",
          "source": "https://thinkingmachines.ai/news/introducing-inkling/",
          "officialUrl": "https://thinkingmachines.ai/news/introducing-inkling/",
          "backupUrls": [],
          "tags": [
            "Thinking Machines Lab",
            "프런티어 모델",
            "Inkling"
          ],
          "slug": "thinking-machines-20260715-inkling",
          "en": {
            "title": "Thinking Machines releases Inkling, a 975B open-weights model",
            "deck": "All weights are available, but the announcement does not name a specific license.",
            "summary": "The model is released as open weights, but the announcement names no specific license; it is not characterized as open source or freely usable."
          }
        }
      ]
    },
    {
      "name": "SK텔레콤",
      "color": "#3617CE",
      "posts": [
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "SKT, 피지컬 AI용 AI-RAN 선도망 실증",
          "deck": "인천·판교·평택에서 로봇·물류·휴머노이드 서비스를 시험한다.",
          "summary": "SKT가 삼성전자·에릭슨·노키아 등과 AI-RAN 선도망을 구축하고 순찰로봇·자율물류·휴머노이드 서비스를 실증합니다.",
          "source": "https://news.sktelecom.com/227797",
          "officialUrl": "https://news.sktelecom.com/227797",
          "backupUrls": [],
          "tags": [
            "SK텔레콤",
            "한국 AI"
          ],
          "slug": "sktelecom-20260714-ai-ran",
          "en": {
            "title": "SKT pilots an AI-RAN lead network for physical AI",
            "deck": "Robotics, logistics, and humanoid services are being piloted in Incheon, Pangyo, and Pyeongtaek.",
            "summary": "SKT is piloting the lead network for patrol robots, autonomous logistics, and humanoid services; this is a demonstration, not broad commercial deployment."
          }
        },
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "SKT, A.X K2 산업 적용 컨소시엄 확대",
          "deck": "제조·모빌리티·보안·바이오로 소버린 기반모델 적용 범위를 넓힌다.",
          "summary": "SKT 독파모 정예팀이 SK AX·테크노매트릭스를 더하고 A.X K2를 산업·공공·국방·제조·모빌리티·보안·바이오에 확장합니다.",
          "source": "https://news.sktelecom.com/227799",
          "officialUrl": "https://news.sktelecom.com/227799",
          "backupUrls": [],
          "tags": [
            "SK텔레콤",
            "한국 AI"
          ],
          "slug": "sktelecom-20260714-ax-k2-consortium",
          "en": {
            "title": "SKT expands the A.X K2 industrial-application consortium",
            "deck": "It broadens sovereign foundation-model use across manufacturing, mobility, security, and biotech.",
            "summary": "SKT is expanding A.X K2 across industry, public services, defense, manufacturing, mobility, security, and biotech."
          }
        }
      ]
    },
    {
      "name": "Research",
      "color": "#6B7280",
      "posts": [
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "Harness Handbook, 에이전트 동작을 하네스 코드에 연결한다",
          "deck": "행동 중심 지도와 점진적 공개로 구현 위치 탐색을 돕는다.",
          "summary": "에이전트 하네스의 동작을 코드 위치에 연결하는 Harness Handbook과 점진적 공개 방식을 제안해 계획·구현 위치 탐색을 돕습니다.",
          "source": "https://arxiv.org/abs/2607.13285",
          "officialUrl": "https://arxiv.org/abs/2607.13285",
          "backupUrls": [],
          "tags": [
            "Research",
            "연구·논문"
          ],
          "slug": "arxiv-20260714-harness-handbook",
          "en": {
            "title": "Harness Handbook links agent behavior to harness code",
            "deck": "Behavior-centered maps and progressive disclosure help locate planning and implementation points.",
            "summary": "The paper connects agent-harness behavior to code locations; reported results are the authors’ claims."
          }
        },
        {
          "date": "7/9",
          "platform": "X+Threads",
          "title": "장기 터미널 에이전트 46개 과제, 중간 진척까지 평가",
          "deck": "최종 성공뿐 아니라 세부 과제의 부분 점수와 진행도를 측정한다.",
          "summary": "46개 장기 터미널 작업을 세부 하위 과제로 나눠 최종 성공뿐 아니라 중간 진척과 부분 점수를 평가하는 벤치마크입니다.",
          "source": "https://arxiv.org/abs/2607.08964",
          "officialUrl": "https://arxiv.org/abs/2607.08964",
          "backupUrls": [],
          "tags": [
            "Research",
            "연구·논문"
          ],
          "slug": "arxiv-20260709-long-horizon-terminal-bench",
          "en": {
            "title": "A 46-task benchmark measures progress by long-horizon terminal agents",
            "deck": "It scores intermediate progress and partial credit as well as final success.",
            "summary": "The benchmark measures progress and partial credit across 46 long-horizon terminal tasks; reported results are author-reported."
          }
        }
      ]
    },
    {
      "name": "Meta AI",
      "color": "#0668E1",
      "posts": [
        {
          "date": "7/9",
          "platform": "X+Threads",
          "title": "Meta, Muse Spark 1.1과 Model API 공개 프리뷰",
          "deck": "1M 컨텍스트와 MCP·병렬 서브에이전트를 에이전틱 작업에 연결했다.",
          "summary": "Meta가 에이전틱 코딩·컴퓨터 사용·멀티모달 추론용 Muse Spark 1.1을 Meta AI Thinking 모드와 Model API 공개 프리뷰로 제공합니다.",
          "source": "https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/",
          "officialUrl": "https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/",
          "backupUrls": [],
          "tags": [
            "Meta AI",
            "프런티어 모델"
          ],
          "slug": "meta-20260709-muse-spark-1-1",
          "en": {
            "title": "Meta previews Muse Spark 1.1 and the Model API",
            "deck": "A 1M-token context window, MCP, and parallel subagents are connected for agentic work.",
            "summary": "Meta is offering Muse Spark 1.1 for agentic coding, computer use, and multimodal reasoning through Meta AI Thinking mode and a public-preview Model API."
          }
        }
      ]
    },
    {
      "name": "Mistral AI",
      "color": "#F54E42",
      "posts": [
        {
          "date": "7/9",
          "platform": "X+Threads",
          "title": "Mistral Studio, 프롬프트와 스킬을 거버넌스 자산으로",
          "deck": "버전·승인·롤백·감사 기록을 묶고 스킬을 MCP 서버로 제공한다.",
          "summary": "Mistral Studio가 프롬프트·스킬 버전, 소유권, 승인, 롤백, 감사기록과 MCP 제공을 하나의 거버넌스 계층으로 묶었습니다.",
          "source": "https://mistral.ai/news/manage-prompts-and-skills-in-studio/",
          "officialUrl": "https://mistral.ai/news/manage-prompts-and-skills-in-studio/",
          "backupUrls": [],
          "tags": [
            "Mistral AI",
            "AI 인프라"
          ],
          "slug": "mistral-20260709-studio-prompts-skills",
          "en": {
            "title": "Mistral Studio makes prompts and skills governed assets",
            "deck": "It combines versioning, approvals, rollbacks, audit logs, and MCP-delivered skills.",
            "summary": "Mistral Studio brings prompt and skill versions, ownership, approvals, rollbacks, audit logs, and MCP delivery into one governance layer."
          }
        }
      ]
    },
    {
      "name": "SK텔레콤 / SK바이오팜",
      "color": "#3617CE",
      "posts": [
        {
          "date": "7/15",
          "platform": "X+Threads",
          "title": "SKT·SK바이오팜, AI로 ROR1 후보 2종 확보",
          "deck": "회사 발표 기준 초기 연구를 약 5개월로 줄였고 바이오 LLM은 검토 단계다.",
          "summary": "AI로 ROR1 결합 바인더 후보 2종을 확보해 통상 1~2년인 초기 연구를 약 5개월로 줄였다고 발표했습니다.",
          "source": "https://news.sktelecom.com/227875",
          "officialUrl": "https://news.sktelecom.com/227875",
          "backupUrls": [],
          "tags": [
            "SK텔레콤",
            "한국 AI"
          ],
          "slug": "sktelecom-20260715-ai-drug-discovery",
          "en": {
            "title": "SKT and SK Biopharm identify two AI-assisted ROR1 candidates",
            "deck": "The companies say early research was reduced to about five months; the bio LLM remains under review.",
            "summary": "The companies announced two ROR1-binding candidate molecules discovered with AI, saying early research was reduced from the usual one to two years to about five months."
          }
        }
      ]
    },
    {
      "name": "Anthropic",
      "color": "#E87040",
      "posts": [
        {
          "date": "7/9",
          "platform": "X+Threads",
          "title": "UST, Claude Code를 반도체·제조 검증에 적용",
          "deck": "직원 2만 명 교육과 함께 하드웨어 검증 주기 단축 사례를 공개했다.",
          "summary": "UST가 반도체·자동차·제조·통신·임베디드 검증에 Claude와 Claude Code를 적용하고 전 세계 직원 2만 명을 교육합니다.",
          "source": "https://www.anthropic.com/news/ust-claude",
          "officialUrl": "https://www.anthropic.com/news/ust-claude",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "산업 AI"
          ],
          "slug": "anthropic-20260709-ust-physical-ai",
          "en": {
            "title": "UST applies Claude Code to semiconductor and manufacturing validation",
            "deck": "The case study pairs shorter hardware-validation cycles with training for 20,000 employees.",
            "summary": "UST is applying Claude and Claude Code to validation in semiconductors, automotive, manufacturing, telecommunications, and embedded systems, while training 20,000 employees globally."
          }
        },
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "Claude Code 2.1.210, worktree 격리와 주입 방어 강화",
          "deck": "서브에이전트의 본체 저장소 변경을 막고 간접 프롬프트 인젝션을 보강했다.",
          "summary": "격리 worktree 서브에이전트의 본체 저장소 변경을 막고 간접 프롬프트 인젝션 방어를 강화했습니다.",
          "source": "https://github.com/anthropics/claude-code/releases/tag/v2.1.210",
          "officialUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.210",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "AI 보안",
            "Claude Code"
          ],
          "slug": "claude-code-20260714-2-1-210",
          "en": {
            "title": "Claude Code 2.1.210 strengthens worktree isolation and injection defenses",
            "deck": "It blocks isolated-worktree subagents from changing the main repository and improves indirect prompt-injection defenses.",
            "summary": "The release prevents isolated-worktree subagents from modifying the main repository and strengthens defenses against indirect prompt injection."
          }
        },
        {
          "date": "7/15",
          "platform": "X+Threads",
          "title": "Claude Code 2.1.211, 승인 위조와 결과 조작 경계 수정",
          "deck": "서브에이전트 스트리밍을 더하고 권한 미리보기·완료 판정 방어를 강화했다.",
          "summary": "서브에이전트 텍스트를 stream-json으로 전달하는 옵션을 추가하고 승인 메시지 시각 위조·훅 ask 무시·에이전트 결과 조작 문제를 수정했습니다.",
          "source": "https://github.com/anthropics/claude-code/releases/tag/v2.1.211",
          "officialUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.211",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "AI 보안",
            "Claude Code"
          ],
          "slug": "claude-code-20260715-2-1-211",
          "en": {
            "title": "Claude Code 2.1.211 fixes approval spoofing and result-tampering boundaries",
            "deck": "It adds subagent streaming and hardens preview and completion-decision defenses.",
            "summary": "The release adds an option to send subagent text through stream-json and fixes issues involving visual approval-message spoofing, ignored hook asks, and agent-result tampering."
          }
        },
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "Anthropic, 미국 K-12 교사용 Claude 공개",
          "deck": "검증된 교사에게 1년 무료로 제공하고 교사 데이터 학습 제외를 명시했다.",
          "summary": "미국 K-12 교사에게 수업 설계·자료 차별화·학생 데이터 분석·반복 업무 자동화를 제공하는 교사용 Claude를 공개했습니다.",
          "source": "https://www.anthropic.com/news/claude-for-teachers",
          "officialUrl": "https://www.anthropic.com/news/claude-for-teachers",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "AI 교육"
          ],
          "slug": "anthropic-20260714-claude-for-teachers",
          "en": {
            "title": "Anthropic launches Claude for US K-12 teachers",
            "deck": "Verified teachers receive a year of free access, and teacher data is excluded from training.",
            "summary": "Anthropic launched Claude for US K-12 teachers for lesson planning, differentiated materials, student-data analysis, and administrative automation."
          }
        },
        {
          "date": "7/9",
          "platform": "X+Threads",
          "title": "Claude의 로봇 제어, 고수준 계획과 직접 조작 사이의 간극",
          "deck": "12개 모델 평가에서 직접 조작 최고 완수율은 5.5%에 그쳤다.",
          "summary": "12개 모델을 다양한 로봇 몸체·제어 인터페이스에서 평가한 연구로, 고수준 제어는 개선됐지만 직접 토크 제어와 조작은 여전히 취약했습니다.",
          "source": "https://www.anthropic.com/research/claude-plays-robotics",
          "officialUrl": "https://www.anthropic.com/research/claude-plays-robotics",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "피지컬 AI"
          ],
          "slug": "anthropic-20260709-claude-plays-robotics",
          "en": {
            "title": "Claude robotics study finds a gap between high-level plans and direct control",
            "deck": "Across 12 models, the best direct-manipulation completion rate was only 5.5%.",
            "summary": "A study across 12 models, robot embodiments, and control interfaces finds that high-level control has improved, while direct torque control and manipulation remain weak."
          }
        },
        {
          "date": "7/15",
          "platform": "X+Threads",
          "title": "Claude API, 대화 중간 시스템 메시지 일반 제공",
          "deck": "별도 베타 헤더 없이 API·Bedrock·Google Cloud에서 사용할 수 있다.",
          "summary": "대화 중간 시스템 메시지가 Fable 5·Mythos 5·Opus 4.8의 API, Bedrock, Google Cloud에서 별도 베타 헤더 없이 제공됩니다.",
          "source": "https://platform.claude.com/docs/en/release-notes/overview",
          "officialUrl": "https://platform.claude.com/docs/en/release-notes/overview",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "AI 인프라"
          ],
          "slug": "anthropic-platform-20260715-mid-conversation-system",
          "en": {
            "title": "Claude API makes mid-conversation system messages generally available",
            "deck": "They can be used without a beta header through the API, Bedrock, and Google Cloud.",
            "summary": "Mid-conversation system messages are available without a beta header through the API, Bedrock, and Google Cloud."
          }
        },
        {
          "date": "7/13",
          "platform": "X+Threads",
          "title": "Claude의 가치 표현은 모델과 언어에 따라 달랐다",
          "deck": "30만 건 넘는 익명 대화를 분석했지만 차이의 원인은 확정하지 않았다.",
          "summary": "30만 건 이상의 익명 대화를 분석해 모델·언어별 가치 표현 차이를 네 축으로 정리했습니다.",
          "source": "https://www.anthropic.com/research/claude-values-models-languages",
          "officialUrl": "https://www.anthropic.com/research/claude-values-models-languages",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "AI 연구"
          ],
          "slug": "anthropic-20260713-claude-values-languages",
          "en": {
            "title": "Claude value expression varied by model and language",
            "deck": "The analysis covers more than 300,000 anonymized conversations but does not establish the cause of the differences.",
            "summary": "An analysis of more than 300,000 anonymized conversations organizes differences in value expression across models and languages into four dimensions."
          }
        },
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "Claude Code 2.1.208, 접근성과 장기 세션 안정성 보강",
          "deck": "스크린리더 모드와 메모리 개선, 치명적 명령 방어를 함께 담았다.",
          "summary": "스크린리더 모드, 프로세스 래퍼, 대규모 세션 메모리·성능 개선과 치명적 명령 탐지 보강이 포함된 대형 릴리스입니다.",
          "source": "https://github.com/anthropics/claude-code/releases/tag/v2.1.208",
          "officialUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.208",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "개발 도구",
            "Claude Code"
          ],
          "slug": "claude-code-20260714-2-1-208",
          "en": {
            "title": "Claude Code 2.1.208 improves accessibility and long-session stability",
            "deck": "Screen-reader mode, memory work, and dangerous-command defenses arrive together.",
            "summary": "This large release includes screen-reader mode, a process wrapper, memory and performance improvements for large sessions, and stronger dangerous-command detection."
          }
        },
        {
          "date": "7/9",
          "platform": "X+Threads",
          "title": "Claude가 사용 습관을 돌아보는 회고 기능을 열었다",
          "deck": "1·3·6·12개월 사용 패턴과 AI 협업 방식을 요약하는 베타 기능이다.",
          "summary": "Claude 사용 패턴을 1·3·6·12개월 단위로 요약하고 AI 협업 역량과 휴식 패턴을 돌아보는 베타 기능입니다.",
          "source": "https://www.anthropic.com/news/reflect-with-claude",
          "officialUrl": "https://www.anthropic.com/news/reflect-with-claude",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "AI 제품"
          ],
          "slug": "anthropic-20260709-reflect-with-claude",
          "en": {
            "title": "Claude opens a reflection feature for reviewing usage habits",
            "deck": "The beta summarizes one-, three-, six-, and twelve-month patterns and ways of collaborating with AI.",
            "summary": "This beta feature summarizes Claude usage patterns over one, three, six, and twelve months, including AI-collaboration capabilities and rest patterns."
          }
        },
        {
          "date": "7/11",
          "platform": "X+Threads",
          "title": "Claude Code 2.1.207, auto mode 기본화와 주입 경계 수정",
          "deck": "클라우드 제공자의 auto mode 진입을 단순화하고 플러그인 입력을 강화했다.",
          "summary": "Bedrock·Vertex·Foundry에서 auto mode opt-in이 사라졌고, 플러그인 옵션의 shell injection 경계를 강화했습니다.",
          "source": "https://github.com/anthropics/claude-code/releases/tag/v2.1.207",
          "officialUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.207",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "개발 도구",
            "Claude Code"
          ],
          "slug": "claude-code-20260711-2-1-207",
          "en": {
            "title": "Claude Code 2.1.207 makes auto mode the default and fixes injection boundaries",
            "deck": "It simplifies auto-mode entry for cloud providers and hardens plugin inputs.",
            "summary": "The release removes the auto-mode opt-in for Bedrock, Vertex, and Foundry and strengthens shell-injection boundaries for plugin options."
          }
        },
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "Claude Enterprise, 사용자 관리 Admin API 베타",
          "deck": "멤버·초대·그룹·역할 관리를 API로 자동화할 수 있게 됐다.",
          "summary": "Claude Enterprise 조직의 멤버·초대·그룹·역할을 관리하는 Admin API 베타가 열렸습니다.",
          "source": "https://platform.claude.com/docs/en/release-notes/overview",
          "officialUrl": "https://platform.claude.com/docs/en/release-notes/overview",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "AI 인프라"
          ],
          "slug": "anthropic-platform-20260714-admin-api-users",
          "en": {
            "title": "Claude Enterprise opens a beta Admin API for user management",
            "deck": "Memberships, invitations, groups, and roles can now be automated through the API.",
            "summary": "A beta Admin API is available to manage Claude Enterprise organization members, invitations, groups, and roles."
          }
        },
        {
          "date": "7/10",
          "platform": "X+Threads",
          "title": "Claude Dreams, Fable 5와 Sonnet 5 지원",
          "deck": "Managed Agents 연구 프리뷰가 두 최신 Claude 모델을 지원한다.",
          "summary": "Managed Agents의 Dreams 연구 프리뷰가 Claude Fable 5와 Sonnet 5를 지원합니다.",
          "source": "https://platform.claude.com/docs/en/release-notes/overview",
          "officialUrl": "https://platform.claude.com/docs/en/release-notes/overview",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "에이전트"
          ],
          "slug": "anthropic-platform-20260710-dreams-fable-sonnet",
          "en": {
            "title": "Claude Dreams adds Fable 5 and Sonnet 5 support",
            "deck": "The Managed Agents research preview supports the two latest Claude models.",
            "summary": "The Managed Agents research preview called Dreams now supports Claude Fable 5 and Sonnet 5."
          }
        },
        {
          "date": "7/10",
          "platform": "X+Threads",
          "title": "Claude Code 2.1.206, worktree와 MCP 안정성 개선",
          "deck": "외부 worktree 진입 확인과 MCP 타임아웃 처리를 바로잡았다.",
          "summary": "외부 worktree 진입 확인, MCP 타임아웃 준수, 로그인·백그라운드 세션·모델 선택 오류를 다수 수정했습니다.",
          "source": "https://github.com/anthropics/claude-code/releases/tag/v2.1.206",
          "officialUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.206",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "개발 도구",
            "Claude Code"
          ],
          "slug": "claude-code-20260710-2-1-206",
          "en": {
            "title": "Claude Code 2.1.206 improves worktree and MCP stability",
            "deck": "It fixes confirmation for entering external worktrees and MCP timeout handling.",
            "summary": "The release fixes external-worktree entry confirmation, MCP timeout compliance, and several login, background-session, and model-selection issues."
          }
        },
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "Anthropic, 캐나다 AI 연구에 1천만 캐나다달러 지원",
          "deck": "8개 기관에 연구비와 Claude·API 접근을 제공한다.",
          "summary": "Anthropic이 캐나다 8개 연구기관에 1천만 캐나다달러와 Claude 접근을 지원합니다.",
          "source": "https://www.anthropic.com/news/canadian-ai-research",
          "officialUrl": "https://www.anthropic.com/news/canadian-ai-research",
          "backupUrls": [],
          "tags": [
            "Anthropic",
            "AI 산업"
          ],
          "slug": "anthropic-20260714-canadian-ai-research",
          "en": {
            "title": "Anthropic commits C$10 million to Canadian AI research",
            "deck": "Eight institutions receive research funding and access to Claude and the API.",
            "summary": "Anthropic is providing C$10 million and Claude access to eight Canadian research institutions."
          }
        }
      ]
    },
    {
      "name": "네이버 커넥트재단",
      "color": "#03C75A",
      "posts": [
        {
          "date": "7/14",
          "platform": "X+Threads",
          "title": "네이버, 장애 학생 맞춤형 AI 교육 콘텐츠 개발",
          "deck": "국립특수교육원과 콘텐츠를 만들고 8월부터 교사 프로그램을 운영한다.",
          "summary": "국립특수교육원과 장애 학생용 AI·디지털 교수학습 콘텐츠를 만들고 8월부터 교사 AI 활용 프로그램을 운영합니다.",
          "source": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034471",
          "officialUrl": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034471",
          "backupUrls": [],
          "tags": [
            "네이버 커넥트재단",
            "한국 AI"
          ],
          "slug": "naver-20260714-special-education-ai",
          "en": {
            "title": "Naver develops tailored AI learning content for students with disabilities",
            "deck": "It is producing content with the National Institute of Special Education and starts teacher programs in August.",
            "summary": "With the National Institute of Special Education, Naver is developing AI and digital teaching-and-learning content for students with disabilities and will begin teacher AI-use programs in August."
          }
        }
      ]
    },
    {
      "name": "Cursor",
      "color": "#111827",
      "posts": [
        {
          "date": "7/10",
          "platform": "X+Threads",
          "title": "Cursor 3.11, Side Chats와 전체 대화 검색 추가",
          "deck": "병렬 보조 대화와 에이전트 기록 검색이 장기 코딩 흐름을 잇는다.",
          "summary": "병렬 보조 대화를 유지하는 Side Chats, 전체 에이전트 기록 검색, 원격·다중 저장소 선택과 클라우드 에이전트 훅을 추가했습니다.",
          "source": "https://cursor.com/changelog/side-chat",
          "officialUrl": "https://cursor.com/changelog/side-chat",
          "backupUrls": [],
          "tags": [
            "Cursor",
            "개발 도구"
          ],
          "slug": "cursor-20260710-3-11",
          "en": {
            "title": "Cursor 3.11 adds Side Chats and full conversation search",
            "deck": "Parallel support chats and searchable agent history support longer coding workflows.",
            "summary": "Cursor added Side Chats for parallel support conversations, full agent-history search, remote and multi-repository selection, and cloud-agent hooks."
          }
        }
      ]
    },
    {
      "name": "Samsung Electronics",
      "color": "#1428A0",
      "posts": [
        {
          "date": "7/10",
          "platform": "X+Threads",
          "title": "삼성 AI 구독클럽, 블루패스 전문 케어 서비스 소개",
          "deck": "설치부터 사용·A/S까지 제품별 전문 케어를 묶었다.",
          "summary": "삼성전자가 AI 구독클럽의 설치·사용·A/S 전 과정 전문 케어인 블루패스 서비스를 소개했습니다.",
          "source": "https://news.samsung.com/kr/%ec%b9%b4%eb%93%9c%eb%89%b4%ec%8a%a4-%ec%9a%b0%eb%a6%ac%ec%a7%91-%ea%b0%80%ec%a0%84%ec%9d%84-%eb%8a%98-%ec%b5%9c%ec%83%81%ec%9c%bc%eb%a1%9c-ai-%ea%b5%ac%eb%8f%85%ed%81%b4%eb%9f%bd",
          "officialUrl": "https://news.samsung.com/kr/%ec%b9%b4%eb%93%9c%eb%89%b4%ec%8a%a4-%ec%9a%b0%eb%a6%ac%ec%a7%91-%ea%b0%80%ec%a0%84%ec%9d%84-%eb%8a%98-%ec%b5%9c%ec%83%81%ec%9c%bc%eb%a1%9c-ai-%ea%b5%ac%eb%8f%85%ed%81%b4%eb%9f%bd",
          "backupUrls": [],
          "tags": [
            "Samsung Electronics",
            "한국 AI"
          ],
          "slug": "samsung-20260710-ai-subscription-bluepass",
          "en": {
            "title": "Samsung AI Subscription Club introduces Blue Pass specialist care",
            "deck": "It bundles product-specific support from installation through use and after-sales service.",
            "summary": "Samsung Electronics introduced Blue Pass, a specialist-care service for the AI Subscription Club covering installation, use, and after-sales service."
          }
        }
      ]
    }
  ]
};
