import type { WeeklyData } from "../data";

// 2026-09-14~20 전 구간. 표시 시각은 한국시간(KST)이며, 발행처가 날짜만 제공한 항목은 날짜만 표시합니다.
export const week38: WeeklyData = {
  "week": 38,
  "year": 2026,
  "slug": "2026-w38",
  "period": "9/14 ~ 9/20",
  "totalPosts": 63,
  "companies": [
    {
      "name": "Google",
      "color": "#4285F4",
      "posts": [
        {
          "date": "9/17",
          "platform": "Web",
          "title": "구글, Gemini API에 Antigravity Agent 09-2026 배포",
          "deck": "구버전은 10월 5일 종료되고 파일 편집 방식이 바뀝니다",
          "summary": "구글 Gemini API 체인지로그에 Antigravity Agent 09-2026 업데이트가 올라왔습니다. antigravity-preview-09-2026이 5월 프리뷰를 대체하며, 도구 호출 파라미터가 snake_case에서 PascalCase로, 파일 편집 방식이 전체 재작성에서 줄 단위 교체로 바뀝니다.",
          "content": "구글 Gemini API의 공식 체인지로그에 'Antigravity Agent 09-2026' 항목이 올라왔습니다. 새 모델 antigravity-preview-09-2026이 기존 antigravity-preview-05-2026을 대체하고, 5월 프리뷰는 사용 중단 상태가 됩니다.\n\n이번 업데이트로 도구 호출 파라미터 표기 방식이 snake_case에서 PascalCase로 바뀌고, 파일을 수정하는 방식도 전체 파일을 다시 쓰는 대신 줄 범위를 지정해 교체하는 방식으로 바뀝니다. 기존 antigravity-preview-05-2026을 쓰던 개발자는 API 호출 코드를 손봐야 할 수 있습니다.\n\n구버전인 antigravity-preview-05-2026은 2026년 10월 5일 서비스가 종료될 예정이며, 구글은 이 일정을 별도 지원 종료 페이지에서 추적하고 있다고 밝혔습니다.",
          "source": "https://ai.google.dev/gemini-api/docs/changelog",
          "officialUrl": "https://ai.google.dev/gemini-api/docs/changelog",
          "verifiedAt": "2026-09-22",
          "slug": "gemini-api-antigravity-agent-09-2026",
          "tags": [
            "AI",
            "2026-w38",
            "Google",
            "Devtools"
          ],
          "en": {
            "title": "Google adds Antigravity Agent 09-2026 to the Gemini API changelog",
            "deck": "The old preview retires October 5, and file editing changes",
            "summary": "Google's Gemini API changelog lists an Antigravity Agent 09-2026 entry: antigravity-preview-09-2026 replaces the May preview, tool-call parameters move from snake_case to PascalCase, and file edits switch from full rewrites to line-range replacements.",
            "content": "Google's official Gemini API changelog added an 'Antigravity Agent 09-2026' entry. The new model antigravity-preview-09-2026 replaces the existing antigravity-preview-05-2026, which is now deprecated.\n\nWith this update, tool-call parameter naming switches from snake_case to PascalCase, and file editing moves from rewriting an entire file to replacing specific line ranges. Developers still using antigravity-preview-05-2026 may need to adjust their API calls.\n\nThe older antigravity-preview-05-2026 model is scheduled to shut down on October 5, 2026, and Google says it is tracking that timeline on a separate deprecations page."
          }
        },
        {
          "date": "9/17",
          "platform": "Web",
          "title": "구글, SDK 자동 생성 도구 오픈소스로 공개",
          "deck": "Speakeasy와 함께 API 클라이언트 생성기를 공개했습니다",
          "summary": "구글이 API 플랫폼 Speakeasy와 협력해 OpenAPI 기반 코드 생성 도구 모음을 AGPLv3 라이선스로 오픈소스 공개했습니다. 여러 언어로 타입 안정성을 갖춘 SDK를 자동 생성하고 SSE 스트리밍도 지원합니다.",
          "content": "구글이 API 플랫폼 기업 Speakeasy와 손잡고 OpenAPI 명세 기반 코드 생성 도구 모음을 오픈소스로 공개했다고 개발자 블로그를 통해 밝혔습니다. 라이선스는 AGPLv3를 택해, 이 도구로 만든 파생 서비스도 소스코드 공개 의무를 지도록 했습니다.\n\n이 도구는 하나의 API 명세로부터 여러 프로그래밍 언어의 클라이언트 SDK를 결정적으로(같은 입력이면 항상 같은 출력이 나오도록) 생성합니다. 엄격한 타입 지정과 SSE(서버 전송 이벤트) 스트리밍 지원을 갖춰, 팀이 CI 파이프라인 안에서 클라이언트 라이브러리를 자동으로 만들어낼 수 있다고 구글은 설명했습니다.\n\n비공개 사내 도구로 SDK를 관리해 온 기업들에게는 코드 생성기 자체를 오픈소스로 들여다보고 손볼 수 있게 됐다는 의미가 있습니다.",
          "source": "https://developers.googleblog.com/why-client-sdk-generation-belongs-in-the-open/",
          "officialUrl": "https://developers.googleblog.com/why-client-sdk-generation-belongs-in-the-open/",
          "verifiedAt": "2026-09-22",
          "slug": "google-speakeasy-open-source-sdk-generation",
          "tags": [
            "AI",
            "2026-w38",
            "Google",
            "Open Source"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/4c1c367716a1.png",
            "alt": "Copy of why client SDK generation belongs in the open"
          },
          "en": {
            "title": "Google open-sources an SDK-generation toolkit built with Speakeasy",
            "deck": "A shared code generator for API client libraries, released under AGPLv3",
            "summary": "Google partnered with API platform Speakeasy to open-source an OpenAPI-based code generation suite under the AGPLv3 license. It deterministically generates typed client SDKs in multiple languages and supports SSE streaming.",
            "content": "Google's developer blog said the company partnered with API platform company Speakeasy to open-source a suite of OpenAPI-based code generation tools. It chose the AGPLv3 license, meaning derivative services built on the tool also carry a source-disclosure obligation.\n\nThe toolkit deterministically generates client SDKs in multiple programming languages from a single API specification — the same input always produces the same output. Google says it supports strict typing and SSE (server-sent events) streaming, letting teams generate client libraries automatically inside CI pipelines.\n\nFor companies that have maintained SDK generation as a closed internal tool, this means the generator itself can now be inspected and modified as open source."
          }
        },
        {
          "date": "9/16",
          "platform": "Web",
          "title": "구글, 에이전트 이상행동 탐지 기능 프라이빗 프리뷰",
          "deck": "OWASP 기준에 맞춰 에이전트의 이상 행동을 걸러냅니다",
          "summary": "구글이 Gemini Enterprise Agent Platform의 'Agent Anomaly Detection' 기능을 프라이빗 프리뷰로 공개했습니다. OpenTelemetry 트레이스를 분석해 통계 기반 탐지와 LLM 추론을 결합, OWASP Agentic Top 10 기준에 맞춰 이상 행동을 걸러냅니다.",
          "content": "구글이 Gemini Enterprise Agent Platform에 새로운 감시 계층인 'Agent Anomaly Detection'을 프라이빗 프리뷰로 내놨습니다. 하루 전인 9월 15일 발표한 제로 트러스트 에이전트 방어 체계 소개 글에서 예고했던 세 가지 장치 중 하나가 실제로 프리뷰 단계에 들어간 것입니다.\n\n이 기능은 에이전트 실행 과정에서 남는 OpenTelemetry 트레이스를 분석 대상으로 삼습니다. 가벼운 통계 기반 스캔과 LLM 기반의 심층 추론을 함께 적용해, OWASP Agentic Top 10에서 정의한 유형의 이상 행동을 식별하도록 설계됐다고 구글은 설명했습니다.\n\n프라이빗 프리뷰 단계이므로 일반 사용자가 바로 켤 수 있는 기능은 아니며, 구글이 신청받은 기업 고객을 대상으로 먼저 검증할 것으로 보입니다.",
          "source": "https://developers.googleblog.com/agent-anomaly-detection-now-in-private-preview-on-the-gemini-enterprise-agent-platform/",
          "officialUrl": "https://developers.googleblog.com/agent-anomaly-detection-now-in-private-preview-on-the-gemini-enterprise-agent-platform/",
          "verifiedAt": "2026-09-22",
          "slug": "gemini-enterprise-agent-anomaly-detection",
          "tags": [
            "AI",
            "2026-w38",
            "Google",
            "Security"
          ],
          "backupUrls": [
            {
              "label": "제로 트러스트 에이전트 방어 체계 개요",
              "url": "https://developers.googleblog.com/build-zero-trust-ai-agents-that-judge-intent-not-just-syntax/"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/eaf952b4303e.jpg",
            "alt": "Blog_Banner_3"
          },
          "en": {
            "title": "Google puts Agent Anomaly Detection into private preview",
            "deck": "The oversight layer screens agent behavior against the OWASP Agentic Top 10",
            "summary": "Google put 'Agent Anomaly Detection' into private preview on the Gemini Enterprise Agent Platform. It analyzes OpenTelemetry traces, combining statistical scanning with LLM-based reasoning to flag behavior aligned with the OWASP Agentic Top 10.",
            "content": "Google put a new oversight layer called Agent Anomaly Detection into private preview on the Gemini Enterprise Agent Platform. It is one of three defenses previewed the day before, on September 15, in a post describing Google's zero-trust approach to AI agents — now actually shipping in preview form.\n\nThe feature analyzes OpenTelemetry traces generated while agents run. Google says it combines lightweight statistical scanning with deeper LLM-based reasoning to identify anomalies aligned with the OWASP Agentic Top 10 categories.\n\nBecause it is a private preview, it is not something general users can turn on immediately; Google is expected to validate it first with enterprise customers who request access."
          }
        },
        {
          "date": "9/15",
          "platform": "Web",
          "title": "구글, Gemini CLI v0.60.0 배포",
          "deck": "웹 요청 검증과 MCP 인증 보안을 강화한 정기 업데이트입니다",
          "summary": "구글이 오픈소스 Gemini CLI의 v0.60.0을 배포했습니다. 웹 요청 유틸리티의 대상 검증과 연결 라우팅을 개선하고, MCP OAuth 인증 과정에서 RFC 9207 발급자 식별을 강제하는 보안 수정이 포함됐습니다.",
          "content": "구글이 오픈소스 커맨드라인 도구 Gemini CLI의 v0.60.0을 GitHub 릴리스로 배포했습니다. 이번 버전은 웹 요청 유틸리티에서 목적지 검증과 연결 라우팅 로직을 개선하는 수정을 담았습니다.\n\n또한 MCP(Model Context Protocol) OAuth 인증 흐름에서 RFC 9207 발급자 식별을 강제하도록 바꿔, 인증 서버를 혼동시키는 방식의 공격 가능성을 줄였습니다. 새 기능 추가보다는 보안·안정성 개선에 초점을 맞춘 정기 유지보수 릴리스입니다.",
          "source": "https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0",
          "officialUrl": "https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0",
          "verifiedAt": "2026-09-22",
          "slug": "gemini-cli-v0-60-0-release",
          "tags": [
            "AI",
            "2026-w38",
            "Google",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/4ae67c4f126c.png",
            "alt": "Release Release v0.60.0 · google-gemini/gemini-cli"
          },
          "en": {
            "title": "Google ships Gemini CLI v0.60.0",
            "deck": "A routine update that tightens web-request validation and MCP auth security",
            "summary": "Google released v0.60.0 of the open-source Gemini CLI. It improves destination validation and connection routing in the web-fetch utility, and enforces RFC 9207 issuer identification in the MCP OAuth flow.",
            "content": "Google published v0.60.0 of the open-source Gemini CLI as a GitHub release. The version includes fixes that improve destination validation and connection routing in the tool's web-fetch utility.\n\nIt also enforces RFC 9207 issuer identification in the MCP (Model Context Protocol) OAuth flow, reducing the risk of attacks that try to confuse the authorization server about which server issued a token. This is a routine maintenance release focused on security and stability rather than new features."
          }
        },
        {
          "date": "9/15",
          "platform": "Web",
          "title": "구글, Gemini Notebook에 학습 도구 추가",
          "deck": "인터랙티브 학습 개요와 숏폼 오디오로 공부를 돕습니다",
          "summary": "구글이 Gemini Notebook에 새로운 학습 도구를 추가했습니다. 요약과 인포그래픽·퀴즈·플래시카드를 묶은 '인터랙티브 학습 개요', 모바일 오디오 레코더, 80개 이상 언어로 나오는 숏폼 영상 요약이 새로 생겼습니다.",
          "content": "구글이 자사 블로그를 통해 Gemini Notebook에 추가된 학습 도구를 소개했습니다. 가장 큰 변화는 Reports 항목 아래 새로 생긴 '인터랙티브 학습 개요'로, 요약문과 함께 인포그래픽·퀴즈·플래시카드 같은 스튜디오 결과물을 한데 엮어 보여줍니다.\n\n이 밖에도 새로운 형식의 퀴즈, 강의를 그 자리에서 녹음할 수 있는 모바일 오디오 레코더, 80개 이상 언어로 제공되는 숏폼 영상 요약(Short Video Overviews)이 추가됐습니다.\n\n이번 소식은 원래 검증되지 않은 스레드(Threads) 게시물을 근거로 9월 21일 발표로 알려졌으나, 구글 공식 블로그의 실제 게시일은 9월 15일로 확인돼 이 날짜로 정정해 표시합니다.",
          "source": "https://blog.google/innovation-and-ai/products/gemini-notebook/new-study-tools-september-2026/",
          "officialUrl": "https://blog.google/innovation-and-ai/products/gemini-notebook/new-study-tools-september-2026/",
          "verifiedAt": "2026-09-22",
          "slug": "gemini-notebook-study-tools-update",
          "tags": [
            "AI",
            "2026-w38",
            "Google",
            "Media"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/72945569f5b6.webp",
            "alt": "Text \"Supercharge your study sessions\" above the Gemini Notebook logo, all next to various windows of Gemini Notebook being used for studying"
          },
          "en": {
            "title": "Google adds new study tools to Gemini Notebook",
            "deck": "Interactive learning overviews and short audio recording help with studying",
            "summary": "Google added new study tools to Gemini Notebook: an 'Interactive Learning Overview' that combines summaries with infographics, quizzes and flashcards; a mobile audio recorder; and Short Video Overviews in more than 80 languages.",
            "content": "Google's own blog described new study tools added to Gemini Notebook. The biggest addition is the 'Interactive Learning Overview' under Reports, which weaves a summary together with studio outputs like infographics, quizzes, and flashcards.\n\nThe update also adds new quiz formats, a mobile audio recorder for capturing lectures on the spot, and Short Video Overviews available in more than 80 languages.\n\nThis item was originally reported as a September 21 announcement based on an unverified Threads post, but Google's own blog carries a September 15 publish date, which is corrected and used here."
          }
        },
        {
          "date": "9/15",
          "platform": "Web",
          "title": "Google, AI의 사회적 추론 검증하는 시뮬레이션 Fuse 공개",
          "deck": "12개 모델 모두 사용자를 거친 추론에서 더 쉽게 흔들렸습니다",
          "summary": "구글 연구진이 AI 비서가 사용자를 거쳐 다른 상대의 속마음을 추론하는 상황을 검증 가능하게 시험하는 프레임워크 Fuse를 공개했습니다. 12개 언어모델을 시험한 결과 모두 사용자 없이 직접 추론할 때보다 사용자를 거친 추론에서 더 자주 틀렸고, 사용자가 편향된 방식으로 설명하면 쉽게 휩쓸렸습니다.",
          "content": "구글 연구진이 2026년 9월 15일 논문으로 Fuse라는 시뮬레이션 프레임워크를 공개했습니다. Fuse는 AI 비서가 '사용자'라는 중개자를 거쳐 화면에 보이지 않는 '대상' 에이전트의 속마음을 추론하도록 만들고, 정답을 미리 정해 둬 채점이 가능하게 설계했습니다. 24,000건의 사람 평가로 이 채점 방식 자체를 검증했습니다.\n\nFuse로 12개 언어모델을 시험한 결과, 모델들은 대상과 직접 대화할 때보다 사용자를 거쳐 간접적으로 추론할 때 정확도가 낮았습니다. 사용자가 편향된 방식으로 상황을 설명하면 모델이 쉽게 그 방향으로 쏠렸고, 대화를 길게 끈다고 정확도가 꾸준히 오르지도 않았습니다.\n\n이 결과는 실험실 시뮬레이션에서 나온 것이라 실제 서비스에서 똑같은 크기로 나타난다는 뜻은 아닙니다. 구글은 Fuse 코드와 21,000개 예시로 구성된 데이터셋을 함께 공개했습니다.",
          "source": "https://arxiv.org/abs/2609.17496",
          "officialUrl": "https://arxiv.org/abs/2609.17496",
          "verifiedAt": "2026-09-22",
          "slug": "google-fuse-verifiable-social-reasoning",
          "tags": [
            "AI",
            "2026-w38",
            "Google",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face daily papers listing",
              "url": "https://huggingface.co/papers/2609.17496"
            }
          ],
          "en": {
            "title": "Google introduces Fuse to verifiably test AI social reasoning",
            "deck": "All 12 models were more easily swayed reasoning through a user",
            "summary": "Google introduced Fuse, a simulation framework that lets researchers verifiably score how well an assistant infers a hidden target agent's motive through a user intermediary. Testing 12 LLMs, the authors found user-mediated reasoning was harder than direct reasoning and models were swayed by biased framing.",
            "content": "Google researchers published a paper on September 15, 2026 introducing Fuse, a simulation framework. Fuse has an assistant infer the hidden motive of an unseen \"target\" agent by going through a \"user\" intermediary, with a predetermined ground truth so the task can be scored, and the scoring method itself was validated with a 24,000-item human study.\n\nTesting 12 language models with Fuse, the authors found accuracy was lower for this user-mediated reasoning than for reasoning directly with the target, models were easily swayed when the user described the situation with a biased framing, and letting the conversation run longer did not reliably raise accuracy.\n\nBecause the results come from a simulated setup, they do not establish that the same gap appears at the same scale in real deployed products. Google released the Fuse code along with a 21,000-example dataset."
          }
        },
        {
          "date": "9/15",
          "platform": "Web",
          "title": "구글, 제로 트러스트 AI 에이전트 방어 체계 공개",
          "deck": "의도까지 판단하는 3중 방어로 에이전트 오남용을 막습니다",
          "summary": "구글이 Gemini Enterprise Agent Platform에서 에이전트의 문법이 아니라 의도를 판단하는 런타임 방어 체계를 소개했습니다. 프롬프트를 걸러내는 Model Armor, 도구 호출 의도를 평가하는 Semantic Governance Policies, 다중 턴 악용을 잡아내는 Agent Anomaly Detection을 함께 제시했습니다.",
          "content": "구글이 Gemini Enterprise Agent Platform을 대상으로 한 런타임 거버넌스 체계를 개발자 블로그에서 소개했습니다. 이번 글의 핵심은 에이전트에게 들어오는 요청을 문법적으로만 걸러내지 않고, 그 뒤에 있는 의도까지 판단하도록 방어선을 설계했다는 점입니다.\n\n구글이 제시한 세 가지 방어 장치는 프롬프트 단계에서 위험 신호를 걸러내는 Model Armor, 에이전트가 도구를 호출하려는 의도 자체를 평가하는 Semantic Governance Policies, 그리고 한 번의 요청이 아니라 여러 턴에 걸쳐 이어지는 공격 패턴을 잡아내는 Agent Anomaly Detection입니다.\n\n이 가운데 Agent Anomaly Detection은 하루 뒤인 9월 16일 별도 발표를 통해 프라이빗 프리뷰로 공개됐습니다.",
          "source": "https://developers.googleblog.com/build-zero-trust-ai-agents-that-judge-intent-not-just-syntax/",
          "officialUrl": "https://developers.googleblog.com/build-zero-trust-ai-agents-that-judge-intent-not-just-syntax/",
          "verifiedAt": "2026-09-22",
          "slug": "google-gemini-enterprise-zero-trust-agents",
          "tags": [
            "AI",
            "2026-w38",
            "Google",
            "Security"
          ],
          "backupUrls": [
            {
              "label": "Agent Anomaly Detection 프리뷰 발표",
              "url": "https://developers.googleblog.com/agent-anomaly-detection-now-in-private-preview-on-the-gemini-enterprise-agent-platform/"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/9d9c1bd60f8c.jpg",
            "alt": "banner (2)"
          },
          "en": {
            "title": "Google outlines a zero-trust defense system for AI agents",
            "deck": "Three layered defenses judge intent, not just request syntax",
            "summary": "Google described runtime governance for the Gemini Enterprise Agent Platform designed to judge an agent request's intent, not just its syntax. It combines Model Armor for prompt screening, Semantic Governance Policies for tool-intent evaluation, and Agent Anomaly Detection for multi-turn exploits.",
            "content": "Google's developer blog described a runtime governance system for the Gemini Enterprise Agent Platform. The central idea is that defenses should judge the intent behind a request to an agent, not just screen it syntactically.\n\nGoogle presented three defenses: Model Armor, which screens prompts for risk signals; Semantic Governance Policies, which evaluate the intent behind an agent's tool calls; and Agent Anomaly Detection, which looks for attack patterns that unfold across multiple turns rather than a single request.\n\nOf the three, Agent Anomaly Detection entered private preview the next day, September 16, via a separate announcement."
          }
        }
      ]
    },
    {
      "name": "Alibaba Qwen",
      "color": "#615CED",
      "posts": [
        {
          "date": "9/20",
          "platform": "Web",
          "title": "Alibaba Qwen, 통합 이미지 생성·편집 모델 Qwen-Image-2.1 공개",
          "deck": "투명 배경과 최대 10장 참조 편집, 2K 해상도를 지원합니다",
          "summary": "Alibaba Qwen팀이 텍스트 기반 이미지 생성과 편집을 하나로 합친 70억 파라미터 모델 Qwen-Image-2.1을 공개했습니다. 투명 배경 출력과 최대 10장까지 참조하는 편집, 2K 해상도를 지원하며 허깅페이스와 모델스코프에 가중치를 함께 올렸습니다.",
          "content": "Alibaba의 Qwen팀이 2026년 9월 20일 Qwen-Image-2.1을 오픈소스로 공개했습니다. 70억 파라미터 규모의 시각 생성 부분(32개 싱글스트림 DiT 레이어)을 갖춘 통합 텍스트-이미지 생성·편집 모델로, 배경을 투명하게 남기는 RGBA 출력, 최대 10장의 이미지를 동시에 참조하는 편집, 2K 해상도 지원이 새 기능으로 들어갔습니다.\n\n가중치는 같은 날 허깅페이스와 모델스코프에 함께 공개됐고, Diffusers·ComfyUI·vLLM-Omni·SGLang·LightX2V가 출시 당일부터 지원을 붙였습니다. 공식 안내는 깃허브 저장소의 README 갱신 기록으로 확인되며, 같은 날짜의 블로그 글은 자바스크립트로 렌더링되는 방식이라 원문 HTML만으로는 게시 시각을 직접 확인하지 못했습니다.\n\n이번 발표는 모델 구조와 지원 도구를 알리는 공식 자료 기준이며, 실제 이미지 품질이나 다른 모델 대비 우위는 이 발표문만으로는 확인되지 않습니다.\n\n함께 지원을 붙인 도구들의 성격도 서로 다릅니다. Diffusers와 ComfyUI는 개인 개발자나 크리에이터가 직접 이미지를 생성할 때 즐겨 쓰는 인터페이스이고, vLLM-Omni와 SGLang은 서버에서 여러 요청을 한꺼번에 처리하는 추론 엔진이라 서비스 운영자들이 주로 씁니다.",
          "source": "https://github.com/QwenLM/Qwen-Image-2.1",
          "officialUrl": "https://github.com/QwenLM/Qwen-Image-2.1",
          "verifiedAt": "2026-09-22",
          "slug": "qwen-image-2-1-open-weights",
          "tags": [
            "AI",
            "2026-w38",
            "Alibaba Qwen",
            "Media"
          ],
          "backupUrls": [
            {
              "label": "README raw source with dated News section",
              "url": "https://raw.githubusercontent.com/QwenLM/Qwen-Image-2.1/main/README.md"
            },
            {
              "label": "Qwen official blog post (client-rendered, date unverifiable from raw HTML)",
              "url": "https://qwen.ai/blog?id=qwen-image-2.1"
            },
            {
              "label": "HuggingFace 모델 카드",
              "url": "https://huggingface.co/Qwen/Qwen-Image-2.1"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/5fa1b8c62a68.png",
            "alt": "GitHub - QwenLM/Qwen-Image-2.1: Qwen's most powerful open-source image generation model"
          },
          "en": {
            "title": "Alibaba Qwen open-sources unified image model Qwen-Image-2.1",
            "deck": "Adds transparent backgrounds and up to 10-image reference edits",
            "summary": "Alibaba's Qwen team open-sourced Qwen-Image-2.1, a unified 7B-parameter text-to-image generation and editing model with native transparency, up to 10-image reference editing, and 2K resolution support, with day-0 tooling integrations.",
            "content": "Alibaba's Qwen team open-sourced Qwen-Image-2.1 on September 20, 2026. It is a unified text-to-image generation and editing model with a 7-billion-parameter visual generation component (32 single-stream DiT layers), adding native transparent (RGBA) output, multi-reference editing across up to 10 images, and 2K resolution support.\n\nWeights were released the same day on both Hugging Face and ModelScope, with day-0 integration support from Diffusers, ComfyUI, vLLM-Omni, SGLang, and LightX2V. The official announcement is confirmed through the GitHub repository's README update history; a same-day blog post is client-side rendered, so its publish time could not be verified directly from the raw HTML.\n\nThis report is based on the model's architecture and tooling as officially described; actual image quality or standing relative to other models is not established by the announcement alone.\n\nThe supporting tools serve different audiences. Diffusers and ComfyUI are interfaces individual developers and creators typically use to generate images directly, while vLLM-Omni and SGLang are inference engines that handle many simultaneous requests, aimed at people running a service."
          }
        },
        {
          "date": "9/18",
          "platform": "Web",
          "title": "Alibaba Qwen, 컴퓨터 사용 에이전트 평가할 RecreationWorld 공개",
          "deck": "겉모습만 흉내내는지 실제로 작동하는지를 구분해 채점합니다",
          "summary": "Alibaba Qwen팀이 컴퓨터 사용 에이전트가 겉모습만 흉내내는지 실제로 작동하게 만드는지 구분해 채점하는 RecreationWorld와 250개 과제 RecreationBench를 공개했습니다. 가장 잘한 GPT-6 Astra도 전체 점수는 58.1%였지만 모든 프로그램 검사를 통과한 과제는 2.8%에 그쳤습니다.",
          "content": "Alibaba의 Qwen팀이 2026년 9월 18일 논문으로 RecreationWorld를 공개했습니다. 우분투·맥OS·윈도우·안드로이드·웹 다섯 개 운영체제를 아우르며, 컴퓨터 사용 에이전트가 실행 중인 참조 애플리케이션을 GUI 조작과 코딩으로 그대로 재현하도록 시켜 학습·평가하는 환경입니다. 참조 앱을 정답 기준으로 삼아 겉모습이 아니라 실제 동작이 맞는지 프로그램으로 확인합니다.\n\n함께 낸 250개 과제 RecreationBench 평가에서 가장 좋은 성적을 낸 GPT-6 Astra는 전체 점수 58.1%를 받았지만, 정작 모든 프로그램 검사를 통과한 과제는 2.8%에 그쳤습니다. 저자들은 이 차이가 겉으로만 비슷하게 흉내내는 것과 실제로 기능이 맞게 작동하는 것 사이의 간극을 보여준다고 설명합니다.\n\n이 결과는 RecreationBench 250개 과제에서 나온 것이며, 이 벤치마크가 다루지 않는 다른 유형의 컴퓨터 사용 작업에서도 같은 간극이 나타난다는 것을 보여주지는 않습니다.",
          "source": "https://arxiv.org/abs/2609.22000",
          "officialUrl": "https://arxiv.org/abs/2609.22000",
          "verifiedAt": "2026-09-22",
          "slug": "alibaba-qwen-recreationworld",
          "tags": [
            "AI",
            "2026-w38",
            "Alibaba Qwen",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face daily papers listing",
              "url": "https://huggingface.co/papers/2609.22000"
            }
          ],
          "en": {
            "title": "Alibaba Qwen's RecreationWorld tests real function, not just imitation",
            "deck": "Scores whether agents truly work, not just look right",
            "summary": "Alibaba's Qwen team's RecreationWorld tests whether computer-use agents functionally reproduce, not just visually imitate, a reference app. The top model scored 58.1% overall on RecreationBench but fully passed all tests on just 2.8% of tasks.",
            "content": "Alibaba's Qwen team published a paper on September 18, 2026 introducing RecreationWorld, an environment spanning five operating systems, Ubuntu, macOS, Windows, Android, and Web, where computer-use agents recreate the behavior of a running reference application through both GUI interaction and coding. The reference app serves as a ground-truth oracle, so recreation is checked programmatically for actual functional correctness rather than surface appearance.\n\nOn the accompanying 250-task RecreationBench evaluation, the top-scoring model, GPT-6 Astra, reached 58.1% overall, but fully passed all programmatic correctness tests on only 2.8% of tasks. The authors say this gap illustrates the difference between imitating something's look and actually reproducing its function.\n\nThe finding is specific to RecreationBench's 250 tasks and does not show that the same-sized gap appears for other kinds of computer-use work outside this benchmark."
          }
        }
      ]
    },
    {
      "name": "Anki",
      "color": "#2793E6",
      "posts": [
        {
          "date": "9/14",
          "platform": "Web",
          "title": "Anki 26.09, 에디터 취약점 2건 수정한 보안 업데이트 배포",
          "deck": "취약점으로 인한 로컬 파일 접근을 막았으니 바로 업데이트하세요",
          "summary": "메모 암기 앱 Anki가 26.09 버전을 내면서 에디터에서 발생할 수 있던 파일 접근 취약점 두 건을 고쳤습니다. 제작진은 공지에서 최대한 빨리 업데이트할 것을 권했고, 오래된 가져오기·내보내기 모듈도 정리했습니다.",
          "content": "플래시카드 학습 앱 Anki가 2026년 9월 14일 26.09 버전을 배포했습니다. 릴리스 노트는 이번 업데이트에 중요한 보안 수정이 포함되어 있다며 사용자에게 최대한 빨리 올릴 것을 권했습니다.\n\n고쳐진 문제는 두 가지입니다. 하나는 에디터에서 노트를 볼 때 로컬 파일을 읽을 수 있었던 취약점이고, 다른 하나는 에디터의 이미지 열기 메뉴가 파일 확장자를 검증하지 않아 생기던 문제입니다. 두 건 모두 제보를 받아 이번 버전에서 막았습니다.\n\n이와 함께 예전부터 쓰이던 anki.importing과 anki.exporting 모듈을 더 이상 권장하지 않는다고 표시했습니다. Anki는 NOASSERTION 라이선스로 공개되어 있고 깃허브에서 31,406개의 별을 받았습니다.\n\n두 취약점 중 로컬 파일 읽기 문제는 이용자 caleblee789의 제보를 받아 고쳤다고 릴리스 노트에 밝혔습니다. Anki는 앱 안의 업데이트 확인 기능으로도 새 버전을 받을 수 있습니다.\n\n폐지 예고가 붙은 두 모듈은 애드온 제작자가 노트를 가져오고 내보내는 기능을 만들 때 쓰던 것이라, 이번 변화는 일반 사용자보다 애드온 개발자에게 더 직접적인 영향을 줍니다.",
          "source": "https://github.com/ankitects/anki/releases/tag/26.09",
          "officialUrl": "https://github.com/ankitects/anki/releases/tag/26.09",
          "verifiedAt": "2026-09-22",
          "slug": "anki-26-09-security-fixes",
          "tags": [
            "AI",
            "2026-w38",
            "Anki",
            "Security"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/ankitects/anki"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/b5f141a8743c.png",
            "alt": "Release 26.09 · ankitects/anki"
          },
          "en": {
            "title": "Anki 26.09 patches two editor file-access vulnerabilities",
            "deck": "Patches a local file-access flaw, so update right away",
            "summary": "Anki 26.09 patches two editor-related file-access vulnerabilities the release notes call important security fixes, and deprecates the legacy anki.importing and anki.exporting modules.",
            "content": "Flashcard app Anki shipped version 26.09 on September 14, 2026. The release notes describe important security fixes and urge users to upgrade as soon as possible.\n\nTwo issues were fixed. Notes could allow reading local files when viewed in the editor, and the editor's \"Open image\" context-menu action did not validate a file's extension, both reported by outside users and closed in this release.\n\nThe release also marks the older anki.importing and anki.exporting modules as deprecated. Anki is released under a NOASSERTION license and has 31,406 stars on GitHub.\n\nThe release notes credit user caleblee789 for reporting the local file-reading issue. Anki users can also fetch the new version through the app's built-in update check.\n\nThe two deprecated modules are what add-on developers have used to build import and export features, so this change affects add-on authors more directly than everyday users."
          }
        }
      ]
    },
    {
      "name": "Anthropic",
      "color": "#E87040",
      "posts": [
        {
          "date": "9/19",
          "platform": "Web",
          "title": "Claude Code, v2.1.271~278 연속 릴리스",
          "deck": "원격 세션과 AGENTS.md 지원을 포함한 8개 버전 업데이트입니다",
          "summary": "Claude Code가 9월 14일부터 19일까지 v2.1.271부터 v2.1.278까지 여덟 개 버전을 연속으로 냈습니다. 원격 세션 fast mode, CLAUDE.md가 없을 때 AGENTS.md를 대신 읽는 기능, 메모리 부족 경고, 프록시 게이트웨이 회귀 수정 등이 포함됐습니다.",
          "content": "Claude Code가 9월 14일 v2.1.271부터 9월 19일 v2.1.278까지 여덟 개 버전을 연속으로 릴리스했습니다.\n\nv2.1.271은 클라우드·자체 호스팅 러너의 Claude Code Remote 세션에 fast mode를 추가하고 전체 화면 /config 패널에 마우스 지원을 넣었습니다. v2.1.272와 v2.1.273은 버그 수정과 안정성 개선, LLM 게이트웨이용 요청 헤더(요청 클래스, 에이전트 타입, 도구 실행 시간, 컨텍스트 압축 정보) 추가를 담았습니다.\n\nv2.1.274는 메모리 사용량이 임계 수준일 때 눈에 띄는 경고와 복구 절차를 보여주고, MCP 서버 연결 대기 시간을 CLAUDE_CODE_MCP_STARTUP_WAIT_MS로 설정할 수 있게 했습니다. v2.1.275는 Claude 앱 게이트웨이 로그인 시 로그인 계정을 표시하고 자격 증명 저장 전 확인 절차를 추가했으며, 현재 턴을 중단하는 send-now 단축키(ctrl+enter)와 대기 중인 메시지 관리 기능을 넣었습니다.\n\nv2.1.276은 ANTHROPIC_BASE_URL이 프록시나 게이트웨이를 가리킬 때 모든 요청이 실패하던 v2.1.275의 회귀 버그를 고쳤습니다. v2.1.277은 프로젝트에 CLAUDE.md가 없으면 AGENTS.md를 대신 읽는 기능과 Claude 앱 게이트웨이 프록시 경계 설정을 추가했습니다. v2.1.278은 Claude API·Enterprise 사용자와 Bedrock·Vertex·Foundry·게이트웨이 환경에서 auto 모드 기본값을 서버 측 분류기로 바꿔 분류기 관련 과금 부담을 줄였습니다.",
          "source": "https://github.com/anthropics/claude-code/releases/tag/v2.1.278",
          "officialUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.278",
          "verifiedAt": "2026-09-22",
          "slug": "claude-code-v2-1-271-278",
          "tags": [
            "AI",
            "2026-w38",
            "Anthropic",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "Claude Code v2.1.271 릴리스 노트",
              "url": "https://github.com/anthropics/claude-code/releases/tag/v2.1.271"
            },
            {
              "label": "Claude Code v2.1.272 릴리스 노트",
              "url": "https://github.com/anthropics/claude-code/releases/tag/v2.1.272"
            },
            {
              "label": "Claude Code v2.1.273 릴리스 노트",
              "url": "https://github.com/anthropics/claude-code/releases/tag/v2.1.273"
            },
            {
              "label": "Claude Code v2.1.274 릴리스 노트",
              "url": "https://github.com/anthropics/claude-code/releases/tag/v2.1.274"
            },
            {
              "label": "Claude Code v2.1.275 릴리스 노트",
              "url": "https://github.com/anthropics/claude-code/releases/tag/v2.1.275"
            },
            {
              "label": "Claude Code v2.1.276 릴리스 노트",
              "url": "https://github.com/anthropics/claude-code/releases/tag/v2.1.276"
            },
            {
              "label": "Claude Code v2.1.277 릴리스 노트",
              "url": "https://github.com/anthropics/claude-code/releases/tag/v2.1.277"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/f890a9d215d4.png",
            "alt": "Release v2.1.278 · anthropics/claude-code"
          },
          "en": {
            "title": "Claude Code ships eight straight releases, v2.1.271-278",
            "deck": "Remote session speed, AGENTS.md fallback, and more across eight builds",
            "summary": "Claude Code shipped eight consecutive versions from v2.1.271 on September 14 through v2.1.278 on September 19, adding remote session fast mode, an AGENTS.md fallback when CLAUDE.md is missing, a critical-memory warning, and a fix for a proxy-gateway regression.",
            "content": "Claude Code released eight consecutive versions between v2.1.271 on September 14 and v2.1.278 on September 19.\n\nv2.1.271 added fast mode to Claude Code Remote sessions on cloud and self-hosted runners and mouse support to the fullscreen /config panel. v2.1.272 and v2.1.273 brought bug fixes and reliability work, plus new request headers for LLM gateways covering request class, agent type, tool durations, and context compaction.\n\nv2.1.274 added a visible warning when memory usage becomes critical, with recovery steps, and a configurable CLAUDE_CODE_MCP_STARTUP_WAIT_MS timeout for MCP server connections. v2.1.275 showed the signed-in account during Claude apps gateway sign-in with a confirmation step before saving credentials, plus a send-now key (ctrl+enter) that interrupts the current turn and queued-message management.\n\nv2.1.276 fixed a regression from v2.1.275 in which every request failed when ANTHROPIC_BASE_URL pointed at a proxy or gateway. v2.1.277 added AGENTS.md support as fallback project instructions when CLAUDE.md is absent, along with Claude apps gateway proxy boundary configuration. v2.1.278 changed auto mode to default to the server-side classifier for Claude API and Enterprise users and on Bedrock, Vertex, Foundry, and gateways, reducing classifier overhead charges."
          }
        },
        {
          "date": "9/18",
          "platform": "Web",
          "title": "Anthropic·액센츄어, 프런티어 AI 독립 평가 협력",
          "deck": "5년간 10억 달러 이상을 함께 투자해 평가 역량을 키웁니다",
          "summary": "Anthropic이 액센츄어와 프런티어 AI 독립 평가를 위한 파트너십을 발표했습니다. 두 회사는 향후 5년간 이 분야 역량 구축에 각각 최소 10억 달러를 투자할 계획이라고 밝혔습니다.",
          "content": "Anthropic이 액센츄어와 파트너십을 맺고 프런티어 AI 시스템에 대한 독립적인 평가에 나선다고 발표했습니다.\n\n이는 Anthropic이 최근 밝힌, 안전 프로세스에 제3자 평가자를 두겠다는 방침의 일환입니다. Anthropic과 액센츄어는 향후 5년간 이 영역의 역량을 키우는 데 각각 최소 10억 달러를 투자할 계획이라고 설명했습니다.\n\n이번 발표는 파트너십 체결과 투자 규모를 전달하는 내용이며, 구체적인 평가 방법론이나 세부 일정은 이번 발표문 범위 밖입니다.",
          "source": "https://www.anthropic.com/news/accenture-embedded-evaluation",
          "officialUrl": "https://www.anthropic.com/news/accenture-embedded-evaluation",
          "verifiedAt": "2026-09-22",
          "slug": "anthropic-accenture-embedded-evaluation",
          "tags": [
            "AI",
            "2026-w38",
            "Anthropic",
            "Research"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/18b3c70b6298.jpg",
            "alt": " Partnering with Accenture on embedded evaluation"
          },
          "en": {
            "title": "Anthropic partners with Accenture on evaluating frontier AI",
            "deck": "Both plan to invest over $1 billion in evaluation over five years",
            "summary": "Anthropic announced a partnership with Accenture on independent evaluation of frontier AI, with both companies expecting to invest at least $1 billion over five years to build capacity in this area.",
            "content": "Anthropic announced a partnership with Accenture focused on independent evaluation of frontier AI systems.\n\nThe partnership is part of Anthropic's recently stated commitment to embed third-party evaluators in its safety process. Anthropic and Accenture said they each expect to invest at least $1 billion over the next five years to build capacity in this area.\n\nThe announcement conveys the partnership and investment scale; detailed evaluation methodology or timelines are outside its scope."
          }
        },
        {
          "date": "9/18",
          "platform": "Web",
          "title": "Anthropic, 컴플라이언스 API에 크롬 세션 기록 추가",
          "deck": "엔터프라이즈 베타로 Claude in Chrome 대화도 조회합니다",
          "summary": "Anthropic의 컴플라이언스 API 로컬 세션 엔드포인트가 이제 Claude in Chrome 세션의 대화 기록도 반환합니다. 기존 컴플라이언스 액세스 키와 권한 범위를 갖춘 Claude Enterprise 조직 대상 베타 기능입니다.",
          "content": "Anthropic이 컴플라이언스 API 로컬 세션 엔드포인트의 기능을 확장했습니다.\n\n이제 이 엔드포인트는 Claude in Chrome 세션의 대화 기록도 함께 반환합니다. Claude Enterprise 조직이 기존에 갖고 있는 컴플라이언스 액세스 키와 read:compliance_user_data 권한 범위로 이용할 수 있는 베타 기능입니다.\n\n이번 변경은 플랫폼 릴리스 노트에 게시된 기능 업데이트이며, 대상은 Claude Enterprise 조직으로 한정됩니다.",
          "source": "https://platform.claude.com/docs/en/release-notes/overview",
          "officialUrl": "https://platform.claude.com/docs/en/release-notes/overview",
          "verifiedAt": "2026-09-22",
          "slug": "anthropic-compliance-api-chrome-transcripts",
          "tags": [
            "AI",
            "2026-w38",
            "Anthropic",
            "Security"
          ],
          "en": {
            "title": "Anthropic adds Claude in Chrome transcripts to Compliance API",
            "deck": "Beta feature for Enterprise orgs with existing compliance access",
            "summary": "Anthropic's Compliance API local session endpoints now also return transcripts of Claude in Chrome sessions, available in beta to Claude Enterprise organizations with an existing Compliance Access Key and scope.",
            "content": "Anthropic expanded its Compliance API local session endpoints.\n\nThe endpoints now also return transcripts of Claude in Chrome sessions. This is a beta feature available to Claude Enterprise organizations that already hold a Compliance Access Key with the read:compliance_user_data scope.\n\nThe change is a feature update posted in the platform release notes and is limited to Claude Enterprise organizations."
          }
        },
        {
          "date": "9/17",
          "platform": "Web",
          "title": "Anthropic, Claude로 생체분자 모델링 속도 개선",
          "deck": "오픈소스 도구 30여 개를 최적화해 평균 4배가량 빨라졌습니다",
          "summary": "Anthropic이 Claude를 활용해 과학자들이 쓰는 오픈소스 생체분자 모델링 도구 30여 개를 최적화해 평균 약 4배 속도 향상을 이끌어냈다고 밝혔습니다. 대형 생체분자 시스템을 위한 저메모리 모드도 새로 만들었습니다.",
          "content": "Anthropic이 Claude가 생체분자 모델링 분야에 기여한 사례를 소개했습니다.\n\nClaude Science 안에서 Claude는 과학자들이 단백질 등 생체분자를 예측·설계할 때 쓰는 오픈소스 모델 30여 개를 약 4주 만에 최적화해, 평균 약 4배의 속도 향상을 만들어냈다고 회사는 설명했습니다. 대형 생체분자 시스템을 다루기 위한 저메모리 모드도 새로 마련했습니다.\n\nAnthropic은 최적화한 코드를 오픈소스로 공개하고, Adaptyv Bio와 함께 최대 100만 달러 규모의 Claude 크레딧을 지원하는 단백질 설계 경진대회를 공동 주최한다고 밝혔습니다. 이는 회사가 보고한 자체 성과이며, 독립적인 재현 검증 결과는 아닙니다.",
          "source": "https://www.anthropic.com/research/claude-uplifts-biomolecular-modeling",
          "officialUrl": "https://www.anthropic.com/research/claude-uplifts-biomolecular-modeling",
          "verifiedAt": "2026-09-22",
          "slug": "anthropic-claude-biomolecular-modeling",
          "tags": [
            "AI",
            "2026-w38",
            "Anthropic",
            "Research"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/555c635cbce1.webp",
            "alt": "Chart showing Claude's kernel optimization"
          },
          "en": {
            "title": "Anthropic uses Claude to speed up biomolecular modeling",
            "deck": "Optimizing 30-plus open-source tools for roughly a 4x speedup",
            "summary": "Anthropic said Claude optimized more than 30 open-source biomolecular modeling tools used by scientists, achieving roughly a 4x average speedup and a new low-memory mode for large biomolecular systems.",
            "content": "Anthropic described how Claude has contributed to biomolecular modeling.\n\nWithin Claude Science, Claude optimized more than 30 open-source models that scientists use to predict and design biomolecules like proteins, in under four weeks, achieving a roughly 4x average speedup, the company said. It also built a new low-memory mode for large biomolecular systems.\n\nAnthropic is open-sourcing the optimized code and co-sponsoring a protein design competition with Adaptyv Bio, backed by up to $1 million in Claude credits. These are results the company reported itself, not an independently reproduced verification."
          }
        },
        {
          "date": "9/16",
          "platform": "Web",
          "title": "Anthropic, Claude Cowork를 채팅과 하나로 통합",
          "deck": "짧은 질문부터 장시간 위임 작업까지 한 화면에서 처리합니다",
          "summary": "Anthropic이 별도 제품이던 Claude Cowork를 메인 Claude 채팅 인터페이스와 하나로 합쳤습니다. 짧은 질문과 정오까지 마감인 보고서 같은 장시간 위임 작업을 한 곳에서 오가며 처리할 수 있습니다.",
          "content": "Anthropic이 Claude Cowork와 Claude 채팅 인터페이스를 하나의 Claude로 통합했다고 발표했습니다.\n\n이번 통합으로 사용자는 간단한 질문과 정오 마감 보고서 작성처럼 오래 걸리는 위임 작업을 같은 화면에서 오가며 처리할 수 있습니다. Anthropic은 노트북을 닫은 뒤에도 위임한 작업이 계속 이어진다고 설명했습니다.\n\n이는 두 개로 나뉘어 있던 제품 경험을 하나로 합치는 변화이며, 이번 발표는 통합 사실과 사용 방식을 전달하는 내용입니다.",
          "source": "https://claude.com/blog/cowork-is-now-claude",
          "officialUrl": "https://claude.com/blog/cowork-is-now-claude",
          "verifiedAt": "2026-09-22",
          "slug": "claude-cowork-chat-merge",
          "tags": [
            "AI",
            "2026-w38",
            "Anthropic",
            "Agents"
          ],
          "backupUrls": [
            {
              "label": "TestingCatalog 보도",
              "url": "https://www.testingcatalog.com/claude-merges-cowork-and-chat-into-one-experience/"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/332f1b9a77f5.svg",
            "alt": "Claude Cowork and chat are now one Claude | Claude by Anthropic"
          },
          "en": {
            "title": "Anthropic merges Claude Cowork into the main Claude chat",
            "deck": "Quick questions and long handed-off work now live in one place",
            "summary": "Anthropic merged Claude Cowork, previously a separate product, into the main Claude chat interface, letting users move between quick questions and longer handed-off work, like a noon-deadline report, in one place.",
            "content": "Anthropic announced that Claude Cowork and the main Claude chat interface are now merged into one Claude.\n\nWith the merge, users can move between quick questions and longer handed-off work, such as a report due at noon, in the same interface. Anthropic said handed-off work keeps going even after a user closes their laptop.\n\nThis consolidates what had been two separate product experiences, and the announcement conveys the merge and how it works."
          }
        }
      ]
    },
    {
      "name": "Apple",
      "color": "#555555",
      "posts": [
        {
          "date": "9/18",
          "platform": "Web",
          "title": "Apple, UI 조작·탐색 통합한 시각 에이전트 MintAct 공개",
          "deck": "따로 훈련하던 세 기능을 한 모델에 합쳐도 성능은 유지됩니다",
          "summary": "Apple이 UI 인식, 여러 단계 화면 탐색, 도구 사용을 한 모델로 합친 시각 에이전트 MintAct를 논문으로 공개했습니다. 2B, 4B, 8B 세 크기 모두 영역별 전문 모델과 비슷한 성능을 유지하면서 OSWorld-Verified에서 48.9점을 받아 비슷한 크기 모델 중 최고 점수를 냈다고 밝혔습니다.",
          "content": "Apple이 2026년 9월 18일 논문으로 MintAct를 공개했습니다. 그동안 UI 요소 인식, 모바일·데스크톱·웹을 넘나드는 여러 단계 탐색, 화면을 보고 도구를 쓰는 작업을 각각 따로 훈련하던 것과 달리, MintAct는 2B·4B·8B 세 크기의 비전-언어 모델 하나로 이 세 영역을 함께 다룹니다.\n\n논문은 공유 강화학습 인프라로 여러 영역을 동시에 훈련한 결과, MintAct가 영역별 전문 모델과 비슷한 성능을 유지하면서 OSWorld-Verified 벤치마크에서 48.9점을 받았고, 이는 비슷한 크기의 모델 중 가장 높은 점수라고 보고합니다.\n\n이 결과는 OSWorld-Verified를 포함한 논문이 다룬 벤치마크에 한정된 것으로, 훨씬 큰 모델과 직접 비교했을 때도 앞선다는 뜻은 아닙니다.",
          "source": "https://arxiv.org/abs/2609.22083",
          "officialUrl": "https://arxiv.org/abs/2609.22083",
          "verifiedAt": "2026-09-22",
          "slug": "apple-mintact",
          "tags": [
            "AI",
            "2026-w38",
            "Apple",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face daily papers listing",
              "url": "https://huggingface.co/papers/2609.22083"
            }
          ],
          "en": {
            "title": "Apple's MintAct unifies UI grounding, navigation, and tool use",
            "deck": "One model now does what three specialists used to",
            "summary": "Apple's MintAct unifies UI grounding, multi-step navigation, and visual tool use in one 2B-8B vision-language model family, matching specialist performance and scoring 48.9 on OSWorld-Verified, state-of-the-art among comparably sized models.",
            "content": "Apple published a paper on September 18, 2026 introducing MintAct. Where UI-element grounding, multi-step navigation across mobile, desktop, and web, and visual tool use had typically been trained as separate specialist models, MintAct unifies all three in a single family of 2B, 4B, and 8B vision-language models.\n\nThe paper reports that training across these domains with a shared reinforcement-learning infrastructure lets MintAct match specialist-model performance while reaching 48.9 on the OSWorld-Verified benchmark, which the authors describe as state-of-the-art among comparably sized models.\n\nThe result is specific to OSWorld-Verified and the other benchmarks covered in the paper, and does not establish that MintAct outperforms much larger models."
          }
        }
      ]
    },
    {
      "name": "AutoClip",
      "color": "#EA580C",
      "posts": [
        {
          "date": "9/20",
          "platform": "Web",
          "title": "AutoClip Desktop 1.3, 로컬 모델과 MCP 서버 지원 추가",
          "deck": "명령줄과 MCP로 다른 도구에서도 자동 클립 생성을 부를 수 있습니다",
          "summary": "영상 자동 클립 생성 도구 AutoClip Desktop이 1.3.0에서 독립 실행형 CLI와 커서·클로드용 MCP 서버를 추가했습니다. Ollama·LM Studio 로컬 모델 지원과 도우인·샤오홍슈·쇼츠용 세로형 내보내기도 새로 붙었습니다.",
          "content": "zhouxiaoka의 AutoClip Desktop이 2026년 9월 20일 1.3.0을 냈습니다. 데스크톱 앱과 별도로 쓸 수 있는 autoclip 명령줄 도구가 새로 생겨, 한 줄 명령으로 영상을 넣고 클립을 만들 수 있습니다.\n\n클립·작업·프로젝트 도구를 노출하는 MCP 서버(autoclip mcp)도 추가돼 커서와 클로드 같은 도구에서 바로 불러 쓸 수 있고, Ollama·LM Studio 프리셋을 통한 로컬 모델 지원도 들어갔습니다. 내보내기 쪽에서는 도우인·샤오홍슈·쇼츠를 겨냥한 세로형(9:16) 프리셋과 빌리빌리를 겨냥한 가로형 내보내기를 함께 지원합니다. MIT 라이선스이며 별 8,403개를 받았습니다.",
          "source": "https://github.com/zhouxiaoka/autoclip/releases/tag/v1.3.0",
          "officialUrl": "https://github.com/zhouxiaoka/autoclip/releases/tag/v1.3.0",
          "verifiedAt": "2026-09-22",
          "slug": "autoclip-desktop-1-3-0",
          "tags": [
            "AI",
            "2026-w38",
            "AutoClip",
            "Media"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/zhouxiaoka/autoclip"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/ab4bdaeac57a.png",
            "alt": "Release AutoClip Desktop v1.3.0 · zhouxiaoka/autoclip"
          },
          "en": {
            "title": "AutoClip Desktop 1.3 adds a CLI and MCP server",
            "deck": "Command line and MCP let other tools trigger auto-clipping",
            "summary": "AutoClip Desktop v1.3.0 adds a standalone CLI and an MCP server for tools like Cursor and Claude, local-model support via Ollama and LM Studio, and vertical export presets for Douyin, Xiaohongshu, and Shorts.",
            "content": "zhouxiaoka's AutoClip Desktop shipped v1.3.0 on September 20, 2026. A new standalone autoclip command-line tool lets users produce a clip with a single command, separately from the desktop app.\n\nAn MCP server (autoclip mcp) exposing clip, job, and project tools was also added, letting tools like Cursor and Claude call it directly, alongside local-model support via Ollama and LM Studio presets. On the export side, it supports vertical (9:16) presets aimed at Douyin, Xiaohongshu, and Shorts, alongside horizontal export for Bilibili. The project is MIT-licensed with 8,403 GitHub stars."
          }
        }
      ]
    },
    {
      "name": "Camofox",
      "color": "#0891B2",
      "posts": [
        {
          "date": "9/14",
          "platform": "Web",
          "title": "camofox-browser 1.16, 가짜 위치 정보 기본값 제거",
          "deck": "직접 접속에서도 위치를 속이지 않고 창 정리도 확실해졌습니다",
          "summary": "AI 에이전트용 브라우저 camofox-browser가 1.16.0에서 직접 접속 세션에 박혀 있던 샌프란시스코 위치·시간대 기본값을 없앴습니다. 윈도우 종료 시 남던 브라우저 프로세스 정리 문제도 고쳤고 OpenClaw 플러그인을 최신 API에 맞췄습니다.",
          "content": "jo-inc가 만든 camofox-browser가 2026년 9월 14일 1.16.0을 냈습니다. 이번 버전은 프록시를 쓰지 않는 직접 브라우저 세션에서 위치·언어·시간대가 샌프란시스코/영어(미국)/로스앤젤레스로 고정되어 있던 기본값을 없앴습니다.\n\n윈도우에서 종료할 때 브라우저 프로세스 트리가 고아 상태로 남던 문제도 고쳤고, 함께 제공하는 OpenClaw 플러그인을 현재 플러그인 API에 맞춰 갱신했습니다. 인증이 필요한 PDF를 이미 보고 있는 에이전트가 별도 요청 없이 바로 저장할 수 있게 하는 개선도 포함됩니다. MIT 라이선스로 공개되어 있고 별 11,144개를 받았습니다.",
          "source": "https://github.com/jo-inc/camofox-browser/releases/tag/v1.16.0",
          "officialUrl": "https://github.com/jo-inc/camofox-browser/releases/tag/v1.16.0",
          "verifiedAt": "2026-09-22",
          "slug": "camofox-browser-1-16-0",
          "tags": [
            "AI",
            "2026-w38",
            "Camofox",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/jo-inc/camofox-browser"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/fd7dcc6a7024.png",
            "alt": "Release v1.16.0 — Stop claiming a location you do not have · jo-inc/camofox-browser"
          },
          "en": {
            "title": "camofox-browser 1.16 removes a fake default location",
            "deck": "Direct sessions no longer fake a location, and cleanup is solid",
            "summary": "camofox-browser v1.16.0 removes a hardcoded San Francisco location/timezone default from direct browser sessions, fixes orphaned processes left after a Windows shutdown, and updates its bundled OpenClaw plugin.",
            "content": "jo-inc's camofox-browser shipped v1.16.0 on September 14, 2026. The release removes a hardcoded San Francisco / en-US / America-Los_Angeles identity default that direct, non-proxy browser sessions were reporting.\n\nIt also fixes Windows shutdown leaving orphaned browser process trees behind, and updates the bundled OpenClaw plugin for the current plugin API. An agent already viewing an authenticated PDF can now save it directly instead of triggering an unrelated fetch flow. The project is MIT-licensed and has 11,144 GitHub stars."
          }
        }
      ]
    },
    {
      "name": "Cline",
      "color": "#F97316",
      "posts": [
        {
          "date": "9/17",
          "platform": "Web",
          "title": "cline 4.1.19, 이미지 인식 못 하는 모델에 경고 표시 추가",
          "deck": "이미지를 못 읽는 모델에 보낼 때 조용히 무시하지 않습니다",
          "summary": "AI 코딩 에이전트 cline이 4.1.19에서 이미지를 읽지 못하는 모델에 파일을 보내면 경고를 띄우도록 바꿨습니다. 토큰이 많은 디스어셈블리·압축 코드에서 컨텍스트 압축이 잘못 걸리던 버그도 고쳤습니다.",
          "content": "cline이 2026년 9월 17일 4.1.19를 냈습니다. 이번 버전은 이미지를 읽을 수 없는 모델에 이미지를 첨부해 보내면 조용히 무시하는 대신 경고 배지를 띄우고, 이미지 지원 모델로 바꿀 수 있는 버튼을 함께 보여줍니다. 이전에는 썸네일이 정상으로 보였지만 실제로는 전송 직전 텍스트 안내로 대체되고 있었습니다.\n\n디스어셈블리나 압축된 소스코드처럼 토큰이 빽빽한 내용에서 컨텍스트 압축이 잘못 걸리던 버그도 고쳤고, 확장 프로그램의 로고와 아이콘도 새로 바꿨습니다. Apache-2.0 라이선스로 공개되어 있고 별 68,995개를 받았습니다.",
          "source": "https://github.com/cline/cline/releases/tag/v4.1.19",
          "officialUrl": "https://github.com/cline/cline/releases/tag/v4.1.19",
          "verifiedAt": "2026-09-22",
          "slug": "cline-4-1-19",
          "tags": [
            "AI",
            "2026-w38",
            "Cline",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/cline/cline"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/d349343a09f4.png",
            "alt": "Release v4.1.19 · cline/cline"
          },
          "en": {
            "title": "cline 4.1.19 now warns before silently dropping unreadable images",
            "deck": "No more silently dropping images a model cannot read",
            "summary": "cline v4.1.19 now warns instead of silently dropping images sent to a model that cannot read them, and fixes a context-compaction bug that misfired on token-dense content like disassembly.",
            "content": "cline shipped v4.1.19 on September 17, 2026. Instead of silently discarding an image sent to a model that cannot read it, the extension now flags it with a warning badge on the thumbnail and offers a button to switch to an image-capable model. Previously the thumbnail looked normal even though the image was quietly replaced with a text placeholder right before sending.\n\nThe release also fixes a context-compaction bug that misfired on token-dense content such as disassembly or minified source code, and refreshes the extension's logo and icons. cline is Apache-2.0 licensed with 68,995 GitHub stars."
          }
        }
      ]
    },
    {
      "name": "Cohere",
      "color": "#6B7280",
      "posts": [
        {
          "date": "9/16",
          "platform": "Web",
          "title": "Cohere·Aleph Alpha, 초대서양 주권 AI 협약 체결",
          "deck": "캐나다·독일에 본사와 연구소를 유지한 채 하나로 운영합니다",
          "summary": "Cohere와 Aleph Alpha가 초대서양 주권 AI 기업이 되는 협약을 체결했습니다. 통합된 회사는 Cohere라는 이름으로 전 세계에 서비스하되 캐나다와 독일에 본사와 연구소, 리더십을 유지합니다.",
          "content": "Cohere와 Aleph Alpha가 협약을 맺고 최초의 초대서양 주권 AI 기업으로 결합한다고 발표했습니다.\n\n통합된 회사는 전 세계적으로 Cohere라는 이름으로 사업을 이어가지만, 캐나다와 독일 양국에 본사와 연구개발 센터, 리더십 역할을 유지한다고 밝혔습니다. 또한 Schwarz Group과의 파트너십을 확대해 STACKIT에서 주권 AI를 제공하기로 했습니다.\n\n이번 발표는 두 회사의 결합 방침과 지역별 거점 유지 계획을 전달하는 내용이며, 통합 완료 시점이나 세부 조건은 이번 발표문 범위를 넘어서지 않습니다.",
          "source": "https://cohere.com/blog/cohere-and-aleph-alpha-sign-agreement",
          "officialUrl": "https://cohere.com/blog/cohere-and-aleph-alpha-sign-agreement",
          "verifiedAt": "2026-09-22",
          "slug": "cohere-aleph-alpha-transatlantic-ai",
          "tags": [
            "AI",
            "2026-w38",
            "Cohere",
            "Models"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/575c44eec842.png",
            "alt": "Cohere and Aleph Alpha"
          },
          "en": {
            "title": "Cohere and Aleph Alpha agree to a transatlantic sovereign AI tie-up",
            "deck": "Headquarters and research stay rooted in both Canada and Germany",
            "summary": "Cohere and Aleph Alpha signed an agreement to combine into the first transatlantic sovereign AI company, operating globally as Cohere while keeping headquarters, R&D centers, and leadership roles in both Canada and Germany.",
            "content": "Cohere and Aleph Alpha announced an agreement to combine into what they describe as the first transatlantic sovereign AI company.\n\nThe combined company will operate globally under the Cohere name while remaining rooted in both Canada and Germany, with headquarters, R&D centers, and leadership roles in each country, according to the announcement. The companies are also expanding a partnership with Schwarz Group to deliver sovereign AI on STACKIT.\n\nThe announcement conveys the companies' plan to combine and to keep dual regional bases; the closing timeline and detailed terms are outside the scope of this announcement."
          }
        }
      ]
    },
    {
      "name": "Colibri",
      "color": "#0D9488",
      "posts": [
        {
          "date": "9/20",
          "platform": "Web",
          "title": "colibri 1.12.0, 텍스트 생성 없이 답을 채점하는 Brio 모드 추가",
          "deck": "정해진 보기 중 답을 고르는 질문을 빠르게 채점합니다",
          "summary": "LLM 평가 도구 colibri가 1.12.0에서 정해진 보기 중 하나를 텍스트 생성 없이 로그확률로 채점하는 Brio 모드를 추가했습니다. 이전 버전 이후 81개의 풀 리퀘스트가 반영됐고 대시보드와 랜딩 페이지도 새로 디자인됐습니다.",
          "content": "JustVugg의 colibri가 2026년 9월 20일 1.12.0을 냈습니다. v1.11.0 이후 81개의 풀 리퀘스트가 반영된 릴리스로, 가장 눈에 띄는 변화는 Brio 모드입니다.\n\nBrio 모드는 모델에 텍스트를 새로 생성하게 하는 대신, 정해진 답안 후보 목록을 주고 각 후보의 로그확률을 계산해 점수를 매기는 방식입니다. 지원하는 아홉 개 엔진 모두에서 쓸 수 있습니다. 이와 함께 대시보드와 랜딩 페이지를 새로 디자인했고, 500 오류를 내거나 로케일 문제로 멈추던 자잘한 실패들도 여럿 고쳤습니다. Apache-2.0 라이선스이며 별 36,916개를 받았습니다.",
          "source": "https://github.com/JustVugg/colibri/releases/tag/v1.12.0",
          "officialUrl": "https://github.com/JustVugg/colibri/releases/tag/v1.12.0",
          "verifiedAt": "2026-09-22",
          "slug": "colibri-1-12-0-brio-mode",
          "tags": [
            "AI",
            "2026-w38",
            "Colibri",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/JustVugg/colibri"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/20d094f998e1.png",
            "alt": "Release colibri 1.12.0 · JustVugg/colibri"
          },
          "en": {
            "title": "colibri 1.12.0 adds Brio mode to score answers without generating text",
            "deck": "Scores multiple-choice answers fast, without generating text",
            "summary": "colibri v1.12.0 adds Brio mode, which scores a fixed set of answer options by log-probability instead of generating text, across all nine supported engines, alongside a redesigned dashboard.",
            "content": "JustVugg's colibri shipped v1.12.0 on September 20, 2026. The release rolls up 81 pull requests since v1.11.0, and its headline addition is Brio mode.\n\nInstead of having a model generate new text, Brio mode hands it a fixed set of answer options and scores them by their log-probabilities, and it works across all nine supported engines. The release also redesigns the dashboard and landing page and fixes a number of small failures that used to return a 500 error or hang on a locale issue. colibri is Apache-2.0 licensed with 36,916 GitHub stars."
          }
        }
      ]
    },
    {
      "name": "DeepSeek",
      "color": "#2563EB",
      "posts": [
        {
          "date": "9/17",
          "platform": "Web",
          "title": "DeepSeek, KV 캐시 대폭 줄인 V4.1-Flash 논문 공개",
          "deck": "GPU 상주 캐시를 이전 버전의 약 4분의 1로 줄였다고 밝혔습니다",
          "summary": "DeepSeek이 KV 캐시 용량을 크게 줄인 5,520억 파라미터 멀티모달 모델 DeepSeek-V4.1-Flash를 논문으로 공개했습니다. GPU 메모리에 계속 올려두는 캐시는 이전 버전의 약 4분의 1, SSD·호스트 메모리에 두는 캐시는 약 8분의 1로 줄였다고 밝혔습니다.",
          "content": "DeepSeek-AI가 2026년 9월 17일 논문으로 DeepSeek-V4.1-Flash를 공개했습니다. 5,520억 파라미터 규모의 멀티모달 Mixture-of-Experts 모델로, 최대 100만 토큰 컨텍스트를 지원하며 디코드 시 16억, 프리필 시 8억 파라미터만 활성화하는 causal encoder-decoder 구조를 씁니다.\n\n논문은 레이어를 넘나드는 KV 캐시 재사용과 FP4 캐싱을 결합해, GPU 메모리에 항상 올려두는 캐시 용량을 토큰당 약 890바이트로 줄였다고 보고합니다. 이는 이전 버전인 DeepSeek-V4-Flash의 약 4분의 1이고, SSD나 호스트 메모리에 두는 지속 캐시는 약 8분의 1 수준이라고 밝혔습니다. 사전학습에는 45조 토큰 규모의 멀티모달 말뭉치를 썼습니다.\n\n이런 절감 효과는 논문 저자들이 자체 비교한 수치이며, 다른 조건의 서비스 환경에서도 같은 비율로 재현된다는 뜻은 아닙니다. 가중치는 Hugging Face에 공개됐습니다.\n\nKV 캐시는 모델이 앞서 처리한 토큰들의 계산 결과를 저장해 두는 메모리 공간으로, 대화가 길어지고 컨텍스트가 커질수록 함께 늘어나 서버를 운영하는 비용에 직접 영향을 줍니다. 이 캐시를 줄이는 기술일수록 같은 하드웨어로 더 많은 사용자의 요청을 동시에 처리할 여지가 커집니다.",
          "source": "https://arxiv.org/abs/2609.19969",
          "officialUrl": "https://arxiv.org/abs/2609.19969",
          "verifiedAt": "2026-09-22",
          "slug": "deepseek-v4-1-flash",
          "tags": [
            "AI",
            "2026-w38",
            "DeepSeek",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face daily papers listing",
              "url": "https://huggingface.co/papers/2609.19969"
            }
          ],
          "en": {
            "title": "DeepSeek-V4.1-Flash reports a sharply smaller KV cache",
            "deck": "Same performance, a quarter of the cache, the paper says",
            "summary": "DeepSeek-AI's DeepSeek-V4.1-Flash, a 552B-parameter multimodal MoE model, reports cutting its always-in-HBM KV cache footprint to about a quarter of its predecessor's while claiming comparable or better performance.",
            "content": "DeepSeek-AI published a paper on September 17, 2026 introducing DeepSeek-V4.1-Flash, a 552-billion-parameter multimodal Mixture-of-Experts model. It supports up to a 1M-token context and uses a causal encoder-decoder architecture that activates only 16B parameters at decode and 8B at prefill.\n\nThe paper reports that combining cross-layer KV cache reuse with FP4 KV caching cuts the always-in-HBM KV cache footprint to about 890 bytes per token, roughly a quarter of the prior DeepSeek-V4-Flash, and the persistent (SSD/host-memory) KV cache to about an eighth. Pretraining used a 45-trillion-token multimodal corpus.\n\nThese reduction figures come from the authors' own comparison and do not establish that the same ratio holds in every deployment condition. Checkpoints have been released on Hugging Face.\n\nA KV cache is the memory that stores computations for tokens a model has already processed; it grows as conversations and context get longer, directly affecting the cost of running the model on a server. Cutting this cache means the same hardware can handle more simultaneous requests."
          }
        }
      ]
    },
    {
      "name": "Hume AI",
      "color": "#F97316",
      "posts": [
        {
          "date": "9/17",
          "platform": "Web",
          "title": "Hume AI, 음성 모델 17종의 지시 따르기 능력 리더보드 공개",
          "deck": "구글과 ElevenLabs가 항목별로 다른 강점을 보였습니다",
          "summary": "Hume AI가 음성 모델 17종의 지시 따르기 능력을 평가하는 두 번째 리더보드를 공개했습니다. 목소리 디자인, 말투 조정, 역할 맞춤, 인라인 태그 처리를 사람 평가 수만 건으로 채점한 결과 구글과 ElevenLabs가 항목별로 다른 강점을 보였습니다.",
          "content": "Hume AI가 2026년 9월 17일 새 리더보드를 공개했습니다. 앞서 낸 목소리 재현 리더보드와 달리, 이번에는 17개 TTS 모델이 방향 지시를 얼마나 잘 따르는지를 봅니다. 목소리 디자인, 말투·전달 방식 수정, 역할에 맞는 목소리, 인라인 태그 처리 네 영역을 다룹니다.\n\n채점은 LLM 판정에만 기대지 않고 수만 건의 사람 평가를 모아 이뤄졌습니다. 결과에서 목소리 디자인과 역할 맞춤은 ElevenLabs v3가, 어조·감정 관련 음성 지시는 구글 Gemini 3.1 Flash가 앞섰습니다. 어느 한 모델이 모든 영역을 독차지하지는 않았습니다.",
          "source": "https://www.hume.ai/blog/introducing-the-hume-voice-controllability-leaderboard",
          "officialUrl": "https://www.hume.ai/blog/introducing-the-hume-voice-controllability-leaderboard",
          "verifiedAt": "2026-09-22",
          "slug": "hume-voice-controllability-leaderboard",
          "tags": [
            "AI",
            "2026-w38",
            "Hume AI",
            "Voice"
          ],
          "en": {
            "title": "Hume AI's new leaderboard scores voice models on following instructions",
            "deck": "Google and ElevenLabs each led different categories",
            "summary": "Hume AI's new leaderboard scores 17 TTS models on how well they follow voice-design and delivery instructions, using tens of thousands of human judgments. ElevenLabs v3 and Google's Gemini 3.1 Flash each led different categories.",
            "content": "Hume AI published a new leaderboard on September 17, 2026. Unlike its earlier voice-replication leaderboard, this one measures how well 17 TTS models follow directional instructions, across four areas: voice design, delivery/tone modification, role fit, and inline tags.\n\nScoring relies on tens of thousands of human judgments rather than LLM-judge scoring alone. ElevenLabs v3 led on voice design and role fit, while Google's Gemini 3.1 Flash led on tone- and emotion-related voice instructions. No single model dominated every category."
          }
        }
      ]
    },
    {
      "name": "LangChain",
      "color": "#6B7280",
      "posts": [
        {
          "date": "9/20",
          "platform": "Web",
          "title": "LangChain, 'Jev'를 평가자로 쓰는 방법 공개",
          "deck": "LangSmith에서 에이전트 품질을 자동으로 채점합니다",
          "summary": "LangChain이 'Jev' 모델을 자동 평가자로 활용해 LangSmith에서 에이전트 품질을 채점하는 'Jev-as-a-Judge' 방법론을 소개했습니다. 사흘 전 소개한 에이전트 하네스 구축 튜토리얼에 이어 같은 모델을 평가 용도로 확장한 사례입니다.",
          "content": "LangChain이 'Jev-as-a-Judge'라는 이름의 에이전트 평가 방법론을 블로그를 통해 소개했습니다. 이번에는 Jev 모델을 에이전트 실행 구성 요소가 아니라, LangSmith 안에서 다른 에이전트의 출력물을 채점하는 자동 평가자로 씁니다.\n\nLangChain은 지난 9월 18일 Jev를 에이전트 하네스에 통합하는 튜토리얼을 먼저 소개한 바 있는데, 이번 글은 같은 모델을 평가 용도로 확장한 후속 편에 해당합니다. 사람이 일일이 채점하기 번거로운 에이전트 품질 평가를 Jev가 대신 판단하도록 하는 구조입니다.\n\n이는 LangChain이 자체적으로 소개한 방법론으로, Jev를 평가자로 썼을 때의 정확도나 사람 평가와의 일치율 같은 구체적인 검증 수치는 이번 발표에 포함되지 않았습니다.",
          "source": "https://www.langchain.com/blog/jev-agent-evals-langsmith",
          "officialUrl": "https://www.langchain.com/blog/jev-agent-evals-langsmith",
          "verifiedAt": "2026-09-22",
          "slug": "langchain-jev-as-a-judge-evals",
          "tags": [
            "AI",
            "2026-w38",
            "LangChain",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "Jev 활용 에이전트 하네스 구축법",
              "url": "https://www.langchain.com/blog/building-a-harness-with-jev"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/8601d2640a59.png",
            "alt": "Can Jev Be a Better Agent Evaluator?"
          },
          "en": {
            "title": "LangChain describes using 'Jev' as a judge for agent evals",
            "deck": "LangSmith automates agent-quality scoring with the same model",
            "summary": "LangChain introduced 'Jev-as-a-Judge,' a methodology that uses the Jev model as an automated evaluator to score agent quality inside LangSmith — a follow-up to its harness tutorial from three days earlier that used the same model.",
            "content": "LangChain's blog introduced an agent-evaluation methodology called 'Jev-as-a-Judge.' Here, the Jev model is not used as an agent-loop component but as an automated evaluator inside LangSmith, scoring the output of other agents.\n\nLangChain previously published a tutorial on September 18 about integrating Jev into an agent harness; this post is a follow-up that extends the same model to an evaluation role. The idea is to let Jev judge agent quality in cases that would otherwise require tedious manual scoring.\n\nThis is a methodology LangChain introduced itself, and the announcement does not include verification figures such as Jev's accuracy as a judge or its agreement rate with human evaluators."
          }
        },
        {
          "date": "9/18 09:15",
          "platform": "Web",
          "title": "LangChain, 'Jev' 활용 에이전트 하네스 구축법 공개",
          "deck": "빠른 판단을 맡기는 보조 모델을 에이전트 루프에 넣습니다",
          "summary": "LangChain이 외부 모델 'Jev'(TypeSafe AI의 'System One' 모델로 소개됨)를 에이전트 하네스에 통합하는 방법을 다룬 튜토리얼을 공개했습니다. 빠르고 구조화된 결정을 내리는 보조 구성 요소로 에이전트 루프에 넣는 방식을 설명합니다.",
          "content": "LangChain이 'Jev'라는 모델을 활용해 에이전트 하네스를 구축하는 방법을 다룬 튜토리얼을 블로그에 올렸습니다. 이 글에서 Jev는 TypeSafe AI가 만든 'System One' 모델로 소개되는데, LangChain이 직접 개발한 모델이 아니라 외부 모델을 자사 프레임워크에 접목하는 사례입니다.\n\nLangChain은 Jev를 빠르고 구조화된 판단을 내리는 보조 구성 요소로 자리매김시켜, 에이전트 루프 안에서 느리지만 정교한 추론을 담당하는 대형 모델과 역할을 나눠 맡기는 방식을 소개합니다. 어떤 상황에서 어느 모델에 판단을 맡길지 나누는 설계가 글의 핵심입니다.\n\n이는 LangChain이 작성한 튜토리얼 성격의 글로, Jev나 TypeSafe AI가 자체적으로 발표한 성능 지표가 함께 검증된 것은 아닙니다.\n\n게시 메타데이터의 2026년 9월 18일 00:15 UTC를 한국시간 09:15로 변환해 표시했습니다.",
          "source": "https://www.langchain.com/blog/building-a-harness-with-jev",
          "officialUrl": "https://www.langchain.com/blog/building-a-harness-with-jev",
          "verifiedAt": "2026-09-22",
          "slug": "langchain-jev-harness-guide",
          "tags": [
            "AI",
            "2026-w38",
            "LangChain",
            "Agents"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/2abc35ae1ba4.png",
            "alt": "What Is Jev? A Guide to TypeSafe AI’s System One Model"
          },
          "en": {
            "title": "LangChain publishes a guide to building an agent harness with Jev",
            "deck": "A fast decision-making model gets slotted into the agent loop",
            "summary": "LangChain published a tutorial on integrating an outside model called 'Jev' — introduced as TypeSafe AI's 'System One' model — into an agent harness, positioning it as a fast, structured decision-making component.",
            "content": "LangChain's blog published a tutorial on building an agent harness using a model called 'Jev.' The post introduces Jev as TypeSafe AI's 'System One' model — an outside model being integrated into LangChain's framework, not something LangChain built itself.\n\nLangChain positions Jev as a fast, structured decision-making component, splitting responsibilities in the agent loop between Jev and a larger, slower model that handles more elaborate reasoning. The core of the post is that design choice — which model handles which kind of decision.\n\nThis is a tutorial-style post written by LangChain, and it does not include independently verified performance figures for Jev or TypeSafe AI.\n\nThe publisher's datePublished value, September 18, 2026 at 00:15 UTC, is displayed here as 09:15 KST."
          }
        },
        {
          "date": "9/17",
          "platform": "Web",
          "title": "LangChain, 생명과학 전용 하네스 'Deep Life Sci' 공개",
          "deck": "Deep Agents를 과학 연구 워크플로에 맞게 확장했습니다",
          "summary": "LangChain이 생명과학 분야 전용 에이전트 하네스 'Deep Life Sci'를 소개했습니다. 기존 Deep Agents 프레임워크를 과학 연구 워크플로에 맞춰 확장한 결과물입니다.",
          "content": "LangChain이 생명과학 분야 전용 에이전트 하네스 'Deep Life Sci'를 블로그를 통해 소개했습니다. 범용 에이전트 프레임워크인 Deep Agents를 생명과학 연구자들이 쓰는 특유의 워크플로에 맞게 확장한 결과물이라고 설명합니다.\n\nLangChain은 이 하네스가 문헌 검색, 실험 데이터 정리, 가설 검증 같은 연구 단계별 작업을 에이전트가 나눠 맡도록 구조화했다고 밝혔습니다. 다만 이는 LangChain이 직접 소개한 프레임워크 설계 글로, 특정 연구 기관이 실제로 도입해 얻은 성과 수치가 함께 제시된 것은 아닙니다.\n\n범용 프레임워크를 도메인별로 특화하는 흐름은 LangChain이 최근 몇 주간 이어온 시리즈의 하나로, 헬스케어에 이어 생명과학 분야로 적용 범위를 넓힌 사례입니다.",
          "source": "https://www.langchain.com/blog/agent-harness-life-sciences",
          "officialUrl": "https://www.langchain.com/blog/agent-harness-life-sciences",
          "verifiedAt": "2026-09-22",
          "slug": "langchain-deep-life-sci-harness",
          "tags": [
            "AI",
            "2026-w38",
            "LangChain",
            "Agents"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/959edb81a847.png",
            "alt": "Building an Agent Harness for Life Sciences: Introducing Deep Life Sci"
          },
          "en": {
            "title": "LangChain introduces Deep Life Sci, an agent harness for life sciences",
            "deck": "Deep Agents extended to fit scientific research workflows",
            "summary": "LangChain introduced Deep Life Sci, a specialized agent harness for life sciences, extending its general-purpose Deep Agents framework to fit scientific research workflows.",
            "content": "LangChain's blog introduced Deep Life Sci, a specialized agent harness for life sciences, describing it as an extension of the general-purpose Deep Agents framework built to fit workflows specific to life sciences researchers.\n\nLangChain says the harness structures work so agents can split tasks such as literature search, experimental data organization, and hypothesis testing across a research pipeline. This is LangChain's own framework-design writeup, though, and it is not accompanied by outcome figures from a research institution that has actually deployed it.\n\nSpecializing a general framework by domain has been a recurring theme in LangChain's posts over recent weeks, following a healthcare-focused piece with this expansion into life sciences."
          }
        },
        {
          "date": "9/17",
          "platform": "Web",
          "title": "LangChain, Included Health 연합 에이전트 사례 공개",
          "deck": "LangGraph와 Deep Agents로 헬스케어 상담을 나눠 처리합니다",
          "summary": "LangChain이 헬스케어 내비게이션 스타트업 Included Health가 LangGraph와 Deep Agents로 여러 전문 에이전트를 연합해 운영한 사례를 소개했습니다. LangChain이 직접 작성한 고객 사례 글입니다.",
          "content": "LangChain은 헬스케어 내비게이션 업체 Included Health가 LangGraph와 Deep Agents를 활용해 '연합 에이전트 (federated agents)' 구조를 구축한 사례를 블로그에 소개했습니다. 여러 전문 영역을 맡는 에이전트를 하나의 상담 흐름 안에서 나눠 운영하는 방식이라고 설명합니다.\n\nIncluded Health는 LangChain의 고객사이며, 이 글은 LangChain이 직접 작성한 도입 사례입니다. 구체적인 처리 건수나 정확도 같은 수치는 공개되지 않았고, 아키텍처 설계 방식에 초점을 맞춘 기술 해설에 가깝습니다.",
          "source": "https://www.langchain.com/blog/how-included-health-built-federated-agents-for-healthcare-navigation-with-deep-agents-and-langgraph",
          "officialUrl": "https://www.langchain.com/blog/how-included-health-built-federated-agents-for-healthcare-navigation-with-deep-agents-and-langgraph",
          "verifiedAt": "2026-09-22",
          "slug": "langchain-included-health-federated-agents",
          "tags": [
            "AI",
            "2026-w38",
            "LangChain",
            "Agents"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/fd1a37df8e2f.png",
            "alt": "How Included Health Built Federated Healthcare Agents with LangGraph and Deep Agents"
          },
          "en": {
            "title": "LangChain describes Included Health's federated healthcare agents",
            "deck": "Specialist agents split up navigation work using LangGraph and Deep Agents",
            "summary": "LangChain described how healthcare-navigation startup Included Health used LangGraph and Deep Agents to run a 'federated agents' setup with multiple specialist agents. This is LangChain's own customer account.",
            "content": "LangChain's blog described how healthcare-navigation company Included Health built a 'federated agents' architecture using LangGraph and Deep Agents, splitting specialist work across multiple agents within a single navigation flow.\n\nIncluded Health is a LangChain customer, and this post is LangChain's own account of the deployment. No specific throughput or accuracy figures were disclosed; the piece reads more as a technical explainer of the architecture than a performance report."
          }
        },
        {
          "date": "9/14 22:00",
          "platform": "Web",
          "title": "LangChain, 헬스케어 에이전트 확장 사례 공개",
          "deck": "제약·의료 3개사 사례로 본 에이전트 확장의 교훈",
          "summary": "LangChain이 제약사 Madrigal Pharmaceuticals, 의료 스타트업 Abridge, 헬스케어 조직 Vizient의 사례를 바탕으로 에이전트를 헬스케어 현장에 확장하며 얻은 교훈을 정리했습니다. 세 조직 모두 LangChain 고객사이며, 회사가 직접 소개한 사례입니다.",
          "content": "LangChain은 제약사 Madrigal Pharmaceuticals, 의료 AI 스타트업 Abridge, 헬스케어 그룹구매 조직 Vizient의 사례를 묶어 헬스케어·생명과학 분야에서 에이전트를 확장할 때 얻은 교훈을 블로그에 정리했습니다.\n\n세 조직 모두 LangChain의 고객사로, 이번 글은 LangChain이 직접 소개한 도입 사례입니다. 구체적인 처리량이나 정확도 수치는 공개되지 않았고, 조직마다 다른 방식으로 에이전트를 도입했다는 정성적 교훈에 초점을 맞췄습니다.\n\n게시 메타데이터의 2026년 9월 14일 13:00 UTC를 한국시간 22:00으로 변환해 표시했습니다.",
          "source": "https://www.langchain.com/blog/scaling-agents-in-healthcare-life-sciences-lessons-from-madrigal-pharmaceuticals-abridge-and-vizient",
          "officialUrl": "https://www.langchain.com/blog/scaling-agents-in-healthcare-life-sciences-lessons-from-madrigal-pharmaceuticals-abridge-and-vizient",
          "verifiedAt": "2026-09-22",
          "slug": "langchain-healthcare-life-sciences-agents",
          "tags": [
            "AI",
            "2026-w38",
            "LangChain",
            "Agents"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/5b300ad4b52a.png",
            "alt": "Scaling Agents in Healthcare & Life Sciences: Lessons from Madrigal Pharmaceuticals, Abridge, and Vizient"
          },
          "en": {
            "title": "LangChain shares lessons from scaling agents in healthcare and life sciences",
            "deck": "Three customer stories on what changes when agents move into clinical settings",
            "summary": "LangChain drew on cases from pharmaceutical company Madrigal Pharmaceuticals, health-tech startup Abridge, and healthcare group Vizient to summarize lessons learned scaling agents in healthcare and life sciences. All three are LangChain customers, and this is LangChain's own account.",
            "content": "LangChain combined cases from pharmaceutical company Madrigal Pharmaceuticals, health-tech startup Abridge, and healthcare group-purchasing organization Vizient into a blog post summarizing lessons learned scaling agents in healthcare and life sciences.\n\nAll three organizations are LangChain customers, and this post is LangChain's own account of their deployments. No specific throughput or accuracy figures were disclosed; the piece focuses on qualitative lessons about how each organization approached adoption differently.\n\nThe publisher's datePublished value, September 14, 2026 at 13:00 UTC, is displayed here as 22:00 KST."
          }
        },
        {
          "date": "9/14 10:07",
          "platform": "Web",
          "title": "LangChain, 내부 '페이드 미디어 에이전트' 구조 공개",
          "deck": "광고 캠페인 운영을 맡기는 에이전트를 어떻게 설계했는지 설명합니다",
          "summary": "LangChain이 자사 내부에서 쓰는 '페이드 미디어 에이전트'의 기술 구조를 블로그에 공개했습니다. 광고 캠페인 운영과 관련한 반복 작업을 자동으로 처리하도록 설계한 사례 글로, 새 제품 출시 소식은 아닙니다.",
          "content": "LangChain은 자사 블로그에서 내부적으로 사용하는 '페이드 미디어 에이전트'의 아키텍처를 소개했습니다. 이 에이전트는 광고 캠페인 집행과 관련한 반복 작업을 자동으로 처리하도록 설계됐다고 회사는 설명했습니다.\n\nLangChain이 직접 밝힌 자사 활용 사례이며, 제3자가 독립적으로 성능을 검증한 결과는 아닙니다. 새로운 제품이나 기능 출시가 아니라 기존 도구를 어떻게 조합해 만들었는지 보여주는 기술 해설 글에 가깝습니다.\n\n게시 메타데이터의 2026년 9월 14일 01:07 UTC를 한국시간 10:07로 변환해 표시했습니다.",
          "source": "https://www.langchain.com/blog/paid-media-agent",
          "officialUrl": "https://www.langchain.com/blog/paid-media-agent",
          "verifiedAt": "2026-09-22",
          "slug": "langchain-paid-media-agent-architecture",
          "tags": [
            "AI",
            "2026-w38",
            "LangChain",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/f5215ebfc6cc.png",
            "alt": "How We Built LangChain’s Paid Media Agent"
          },
          "en": {
            "title": "LangChain publishes the architecture behind its internal Paid Media Agent",
            "deck": "A look at how LangChain designed the agent that runs its ad-campaign work",
            "summary": "LangChain published a technical writeup describing the architecture of its internally used 'Paid Media Agent.' The company says the agent was built to automate recurring ad-campaign tasks; this is not a new product launch.",
            "content": "LangChain's blog described the architecture of its internally used Paid Media Agent. The company says the agent was designed to automate recurring tasks tied to running ad campaigns.\n\nThis is LangChain's own account of an internal use case, not a result independently verified by a third party. It is not a new product or feature launch, but rather a technical explainer of how the company assembled existing building blocks.\n\nThe publisher's datePublished value, September 14, 2026 at 01:07 UTC, is displayed here as 10:07 KST."
          }
        }
      ]
    },
    {
      "name": "LibreChat",
      "color": "#059669",
      "posts": [
        {
          "date": "9/15",
          "platform": "Web",
          "title": "LibreChat, GPT-6 Astra 지원과 에이전트 API 추가한 RC 배포",
          "deck": "코딩 에이전트를 직접 붙이는 실험 기능이 처음 들어갔습니다",
          "summary": "오픈소스 챗 플랫폼 LibreChat이 0.8.8-rc3 릴리스 후보에서 코딩 에이전트를 직접 붙일 수 있는 실험 기능과 GPT-6 Astra 모델 지원을 추가했습니다. 에이전트·스킬을 관리하는 API와 대화 추적 뷰어도 새로 생겼습니다.",
          "content": "danny-avila가 이끄는 LibreChat이 2026년 9월 15일 0.8.8-rc3을 냈습니다. 이 버전은 아직 정식 출시 전 릴리스 후보(RC)로, 확장 가능한 코딩 에이전트를 직접 연결하는 실험적인 Bring-Your-Own-Machine 기능을 시험해 볼 수 있게 했습니다.\n\nGPT-6 Astra 모델 지원과 넓어진 컨텍스트 사용량 표시가 추가됐고, 에이전트와 스킬을 코드로 관리할 수 있는 CRUD API, 대화 흐름을 살펴보는 트레이스 뷰어도 새로 생겼습니다. 파일을 텍스트로 대신 보여주는 폴백, 통합된 아티팩트 표시줄 같은 화면 개선도 포함됩니다. MIT 라이선스이며 별 44,598개를 받았습니다.",
          "source": "https://github.com/danny-avila/LibreChat/releases/tag/v0.8.8-rc3",
          "officialUrl": "https://github.com/danny-avila/LibreChat/releases/tag/v0.8.8-rc3",
          "verifiedAt": "2026-09-22",
          "slug": "librechat-0-8-8-rc3",
          "tags": [
            "AI",
            "2026-w38",
            "LibreChat",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/danny-avila/LibreChat"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/0f4bdba77d71.png",
            "alt": "Release v0.8.8-rc3 · danny-avila/LibreChat"
          },
          "en": {
            "title": "LibreChat's release candidate adds GPT-6 Astra support and an agent API",
            "deck": "An experimental way to attach coding agents lands for the first time",
            "summary": "LibreChat's v0.8.8-rc3 release candidate adds experimental Bring-Your-Own-Machine support for coding agents, GPT-6 Astra model support, and a CRUD API for managing agents and skills.",
            "content": "LibreChat, led by danny-avila, shipped v0.8.8-rc3 on September 15, 2026. This is a pre-release release candidate rather than a stable build, and it lets users try an experimental Bring-Your-Own-Machine feature for attaching scalable coding agents directly.\n\nIt adds GPT-6 Astra model support with expanded context-usage display, a CRUD API for managing agents and skills in code, and a conversation trace viewer. Smaller interface improvements include a text fallback for files and a unified artifact display row. The project is MIT-licensed with 44,598 GitHub stars."
          }
        }
      ]
    },
    {
      "name": "Meta",
      "color": "#0866FF",
      "posts": [
        {
          "date": "9/15",
          "platform": "Web",
          "title": "Meta, AI 강화 구독 서비스 'Meta One' 출시",
          "deck": "페이스북·인스타그램·왓츠앱 전반에서 AI 사용량을 늘립니다",
          "summary": "Meta가 페이스북, 인스타그램, 왓츠앱, Meta AI 전반에 걸친 새 구독 서비스 Meta One을 공개했습니다. AI 사용량 확대, 표현 기능 강화, 크리에이터·비즈니스용 도구를 하나의 구독으로 묶었습니다.",
          "content": "Meta가 새로운 구독 서비스 Meta One을 공개했습니다. 페이스북, 인스타그램, 왓츠앱, Meta AI에 걸쳐 제공되는 단일 구독 상품입니다.\n\n회사 설명에 따르면 Meta One 구독자는 더 늘어난 AI 사용량과 향상된 표현 기능, 크리에이터·비즈니스를 위한 새로운 도구에 접근할 수 있습니다. 여러 앱에 흩어져 있던 프리미엄 기능을 하나의 요금제로 묶었다는 점이 특징입니다.\n\n구체적인 국가별 출시 일정이나 가격 구조는 이번 발표문에 포함된 범위 안에서만 확인됩니다. 이 카드는 Meta의 공식 발표 내용을 그대로 전달하며, 별도의 성능 비교나 만족도 조사 결과는 담고 있지 않습니다.",
          "source": "https://about.fb.com/news/2026/09/introducing-meta-one-subscription-service-more-features-ai/",
          "officialUrl": "https://about.fb.com/news/2026/09/introducing-meta-one-subscription-service-more-features-ai/",
          "verifiedAt": "2026-09-22",
          "slug": "meta-one-subscription-launch",
          "tags": [
            "AI",
            "2026-w38",
            "Meta",
            "Media"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/e44feaf2abf4.jpg",
            "alt": "Introducing Meta One: A Subscription Service With More Features and AI to Create, Connect, and Stand Out"
          },
          "en": {
            "title": "Meta launches AI-boosted subscription service Meta One",
            "deck": "More AI usage across Facebook, Instagram, and WhatsApp",
            "summary": "Meta introduced Meta One, a new subscription service spanning Facebook, Instagram, WhatsApp, and Meta AI that bundles expanded AI usage, enhanced expression features, and new tools for creators and businesses.",
            "content": "Meta introduced a new subscription service called Meta One, a single subscription spanning Facebook, Instagram, WhatsApp, and Meta AI.\n\nAccording to the company, Meta One subscribers get expanded AI usage limits, enhanced expression features, and new tools for creators and businesses. It bundles premium features that were previously scattered across separate apps into one plan.\n\nSpecific country rollout timing or pricing structure is limited to what this announcement covers. This card conveys Meta's official announcement as stated and does not include independent performance comparisons or satisfaction survey results."
          }
        }
      ]
    },
    {
      "name": "Microsoft",
      "color": "#0078D4",
      "posts": [
        {
          "date": "9/17",
          "platform": "Web",
          "title": "Microsoft, 증류 모델이 답을 길게 늘어놓는 원인 규명",
          "deck": "종료 신호를 하나로 묶었더니 불필요한 장문 답변이 줄었습니다",
          "summary": "마이크로소프트 연구진이 증류로 학습한 학생 모델이 답을 필요 이상으로 길게 내는 원인을 논문으로 분석했습니다. 학생과 교사 모델이 서로 다른 종료 토큰에 멈춤 확률을 싣는 것이 원인 중 하나였고, 이 토큰들을 하나의 신호로 묶으면 문제가 줄었습니다.",
          "content": "마이크로소프트 연구진이 2026년 9월 17일 논문으로 온폴리시 증류에서 답이 길어지는 현상을 분석했습니다. 학생 모델과 교사 모델이 기능적으로는 같은 역할을 하는 서로 다른 종료(EOS) 토큰에 멈춤 확률을 나눠 싣는 경우가 있는데, 이 불일치가 학생이 선호하던 멈춤 신호를 억누르면서도 교사가 선호하는 다른 토큰으로 확실히 넘어가지 못하게 만든다고 설명합니다.\n\n연구진은 기능적으로 같은 종료 토큰들을 하나의 공유 멈춤 신호로 묶어 처리하면 Qwen3, Llama, Gemma 세 모델 계열 모두에서 이런 답 길이 부풀림이 줄어든다는 것을 보였고, 이 방법을 구현한 코드를 공개했습니다.\n\n이 결과는 세 모델 계열에서 확인된 것으로, 다른 구조의 모델이나 다른 증류 설정에도 그대로 적용되는지는 이 논문만으로 확인되지 않습니다.",
          "source": "https://arxiv.org/abs/2609.20511",
          "officialUrl": "https://arxiv.org/abs/2609.20511",
          "verifiedAt": "2026-09-22",
          "slug": "microsoft-eos-token-distillation",
          "tags": [
            "AI",
            "2026-w38",
            "Microsoft",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face daily papers listing",
              "url": "https://huggingface.co/papers/2609.20511"
            }
          ],
          "en": {
            "title": "Microsoft traces why distilled models write overly long answers",
            "deck": "Unifying stop signals cut unnecessarily long answers",
            "summary": "Microsoft researchers trace excessive response length in on-policy-distilled student models to mismatched EOS tokens between student and teacher, and show that treating equivalent tokens as one stop signal reduces the effect across Qwen3, Llama, and Gemma.",
            "content": "Microsoft researchers published a paper on September 17, 2026 studying why student models produced by on-policy distillation sometimes generate excessively long responses. Student and teacher models can place stopping probability on different but functionally equivalent end-of-sequence (EOS) tokens, and this mismatch can suppress the student's preferred stop signal without reliably transferring to the teacher's preferred alternative.\n\nThe authors show that treating these functionally equivalent EOS tokens as one shared stopping signal reduces this length inflation across the Qwen3, Llama, and Gemma model families, and they release an implementation of the fix.\n\nThe result is confirmed across these three model families; the paper does not establish that it carries over unchanged to other architectures or distillation setups."
          }
        },
        {
          "date": "9/16",
          "platform": "Web",
          "title": "Microsoft, 프런티어 모델도 절반 못 푸는 BI 벤치마크 공개",
          "deck": "도구를 붙인 BI-Agent는 정확도를 최대 40%p 끌어올렸습니다",
          "summary": "마이크로소프트 연구진이 실제 비즈니스 인텔리전스 대시보드를 바탕으로 만든 새 벤치마크 BI-Bench를 공개했습니다. 최상위 언어모델도 정답률이 50%를 밑돌았고, 도구를 붙이고 추가 학습을 거친 BI-Agent는 정답률을 최대 40퍼센트포인트까지 끌어올렸습니다.",
          "content": "마이크로소프트 리서치가 2026년 9월 16일 논문으로 BI-Bench와 BI-Agent를 공개했습니다. BI-Bench는 실제 비즈니스 인텔리전스 대시보드를 바탕으로 만든 벤치마크로, 모델이 필요한 표를 찾고 데이터를 합치고 변환한 뒤 질문에 답하는 전 과정을 평가합니다.\n\n논문은 최상위권 언어모델도 이 벤치마크에서 정답률 50%를 넘지 못했다고 보고합니다. 반면 도구를 함께 쓰도록 만든 BI-Agent 시스템은 별도 훈련 없이도 정확도를 최대 40퍼센트포인트 끌어올렸고, 추가로 후속 학습까지 거치면 최대 30퍼센트포인트를 더 높였다고 밝혔습니다.\n\n이 수치는 BI-Bench가 다루는 실제 대시보드 유형에 한정된 결과이며, 모든 종류의 비즈니스 데이터 업무에 그대로 적용된다는 뜻은 아닙니다.",
          "source": "https://arxiv.org/abs/2609.20886",
          "officialUrl": "https://arxiv.org/abs/2609.20886",
          "verifiedAt": "2026-09-22",
          "slug": "microsoft-bi-agent-bi-bench",
          "tags": [
            "AI",
            "2026-w38",
            "Microsoft",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face daily papers listing",
              "url": "https://huggingface.co/papers/2609.20886"
            }
          ],
          "en": {
            "title": "Microsoft's BI-Bench shows frontier models missing half of real BI questions",
            "deck": "A tool-augmented BI-Agent raised accuracy by up to 40 points",
            "summary": "Microsoft Research's BI-Bench, built from real BI dashboards, finds frontier LLMs score under 50% accuracy on end-to-end business-intelligence questions. A tool-augmented BI-Agent system is reported to raise accuracy by up to 40 percentage points.",
            "content": "Microsoft Research published a paper on September 16, 2026 introducing BI-Bench and BI-Agent. BI-Bench is a benchmark built from real business-intelligence dashboards that evaluates the full pipeline of finding the right tables, joining and transforming data, and then answering a question.\n\nThe paper reports that even top-tier language models score below 50% accuracy on it. A tool-augmented BI-Agent system, by contrast, is reported to raise accuracy by up to 40 percentage points on vanilla models, with a further post-training step adding up to 30 more percentage points.\n\nThese figures are specific to the real-world dashboards BI-Bench draws on, and do not establish that the same gains carry over to every kind of business-data task."
          }
        },
        {
          "date": "9/16",
          "platform": "Web",
          "title": "VS Code 1.138, 데브 컨테이너 에이전트 세션 지원",
          "deck": "코파일럿·챗GPT 구독 중 선택 가능한 Codex 지원도 넓혔습니다",
          "summary": "Visual Studio Code 1.138이 로컬 폴더의 Dev Container 안에서 에이전트가 동작하는 기능을 추가했습니다. Codex 지원도 넓혀 사용자가 GitHub Copilot 구독과 ChatGPT 구독 중 하나를 선택할 수 있습니다.",
          "content": "Visual Studio Code 1.138이 배포됐습니다.\n\n가장 큰 변화는 Dev Container 안에서 에이전트 세션을 실행할 수 있게 된 점입니다. 에이전트가 로컬 폴더의 Dev Container 내부에서 직접 동작할 수 있습니다. Codex 지원도 확대돼 사용자가 GitHub Copilot 구독과 ChatGPT 구독 중 원하는 쪽을 선택해 쓸 수 있습니다.\n\n이 밖에 여러 에이전트를 병렬로 다룰 때 필요한 세션 관리, 풀 리퀘스트 생성, 음성 모드 관련 개선도 포함됐습니다.",
          "source": "https://code.visualstudio.com/updates/v1_138",
          "officialUrl": "https://code.visualstudio.com/updates/v1_138",
          "verifiedAt": "2026-09-22",
          "slug": "vscode-1-138-dev-containers-codex",
          "tags": [
            "AI",
            "2026-w38",
            "Microsoft",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "GitHub 릴리스",
              "url": "https://github.com/microsoft/vscode/releases/tag/1.138.0"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/7fe40e9a23b2.webp",
            "alt": "Screenshot showing the Use Dev Container action for a folder in the workspace picker."
          },
          "en": {
            "title": "VS Code 1.138 adds agent sessions inside Dev Containers",
            "deck": "Expanded Codex support lets users pick Copilot or ChatGPT",
            "summary": "Visual Studio Code 1.138 lets agents operate inside a local folder's Dev Container and expands Codex support so users can choose between a GitHub Copilot subscription or a ChatGPT subscription.",
            "content": "Visual Studio Code 1.138 has shipped.\n\nThe headline change lets agents operate inside a local folder's Dev Container. Codex support was also expanded so users can choose between a GitHub Copilot subscription or a ChatGPT subscription.\n\nThe release also includes session management, pull request creation, and voice mode improvements for working with multiple agents in parallel."
          }
        }
      ]
    },
    {
      "name": "Midjourney",
      "color": "#6B7280",
      "posts": [
        {
          "date": "9/16",
          "platform": "Web",
          "title": "Midjourney, 한국어 인터페이스 추가하고 에디터 개선",
          "deck": "번역 자원봉사도 함께 모집하며 편의 기능을 늘렸습니다",
          "summary": "Midjourney가 9월 16일 알파 체인지로그에서 한국어 인터페이스를 새로 추가하고 더 많은 언어 번역 자원봉사자를 모집한다고 밝혔습니다. v8.2 에디터의 프롬프트 바, 초안 배치 미리보기, 폴더 기능도 함께 개선됐습니다.",
          "content": "Midjourney가 2026년 9월 16일자 알파 체인지로그에서 한국어를 새 인터페이스 언어로 추가했다고 밝히고, 추가 언어 번역을 도와줄 자원봉사자를 모집한다고 알렸습니다.\n\nv8.2 이미지 에디터에는 맥락에 맞는 프롬프트 바, 초안 배치 그리드 미리보기, 업스케일을 대신하는 Enhance 옵션, 기존 폴더가 없어도 되는 폴더 기능이 추가됐습니다. 모바일·태블릿 화면 최적화와 함께 애니메이트 기능과 키보드 탐색이 다시 정상 작동하도록 고친 버그 수정도 포함됩니다.\n\n이번 소식은 정식 릴리스 노트가 아니라 알파 체인지로그를 통해 공지됐으며, 기능들이 아직 테스트 단계에 있다는 점도 함께 밝혔습니다.",
          "source": "https://updates.midjourney.com/alpha-changelog-9-16-26/",
          "officialUrl": "https://updates.midjourney.com/alpha-changelog-9-16-26/",
          "verifiedAt": "2026-09-22",
          "slug": "midjourney-alpha-changelog-0916",
          "tags": [
            "AI",
            "2026-w38",
            "Midjourney",
            "Media"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/e18e794290a9.jpg",
            "alt": "Alpha Changelog - 9/16/26"
          },
          "en": {
            "title": "Midjourney adds a Korean interface and editor upgrades",
            "deck": "Also recruiting translation volunteers alongside editor upgrades",
            "summary": "Midjourney added Korean as a new interface language and is recruiting volunteer translators for more languages, alongside several v8.2 editor improvements and mobile optimizations.",
            "content": "Midjourney's alpha changelog for September 16, 2026 says Korean has been added as a new interface language, and the company is looking for volunteers to translate into additional languages.\n\nThe v8.2 image editor gains a contextual prompt bar, draft-batch grid previews, an Enhance option that replaces Upscale, and folder operations that no longer require a pre-existing folder. The update also includes mobile and tablet optimizations and bug fixes restoring the Animate feature and keyboard navigation.\n\nThis update was announced through the alpha changelog rather than a stable-release note, and the company noted the features are still in testing."
          }
        }
      ]
    },
    {
      "name": "Mistral",
      "color": "#FA5310",
      "posts": [
        {
          "date": "9/16",
          "platform": "Web",
          "title": "Mistral·Mozilla, 파이어폭스에 AI 탑재 협력",
          "deck": "개방형·다국어 AI를 프라이버시 지키며 브라우저에 넣습니다",
          "summary": "Mistral과 Mozilla가 파트너십을 맺고 개방형이고 프라이버시를 지키는 다국어 AI를 파이어폭스 브라우징 경험에 넣기로 했습니다. 사용자가 이미 머무는 브라우저 안에 AI 기능을 제공하는 것이 목표입니다.",
          "content": "Mistral과 Mozilla가 파트너십을 발표했습니다. 개방형이고 프라이버시를 지키는 다국어 AI를 파이어폭스의 브라우징 경험에 들여오는 것이 목표입니다.\n\n두 회사는 사용자가 이미 브라우징하고 있는 공간에 AI 기능을 두면서도 프라이버시를 유지하는 방향을 강조했습니다. 온디바이스 방식의 AI 기능을 포함한다고 설명했습니다.\n\n이번 발표는 협력 관계 체결 사실을 전달하며, 구체적인 기능 출시 일정은 이번 발표문에 명시되지 않았습니다.",
          "source": "https://mistral.ai/news/mistral-x-mozilla",
          "officialUrl": "https://mistral.ai/news/mistral-x-mozilla",
          "verifiedAt": "2026-09-22",
          "slug": "mistral-mozilla-firefox-ai",
          "tags": [
            "AI",
            "2026-w38",
            "Mistral",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/20279966e9dc.webp",
            "alt": "Mistral x Mozilla: Private, Multilingual AI Browsing"
          },
          "en": {
            "title": "Mistral and Mozilla team up to bring AI into Firefox",
            "deck": "Open, private, multilingual AI arrives where people already browse",
            "summary": "Mistral and Mozilla partnered to bring open, private, and multilingual AI into Firefox's browsing experience, aiming to put AI capabilities where users already browse while preserving privacy.",
            "content": "Mistral and Mozilla announced a partnership aimed at bringing open, privacy-preserving, multilingual AI into Firefox's browsing experience.\n\nThe two companies emphasized placing AI capabilities where users already browse while preserving privacy, including on-device AI capabilities.\n\nThe announcement conveys the partnership itself; a specific feature rollout timeline was not stated."
          }
        }
      ]
    },
    {
      "name": "NAVER",
      "color": "#6B7280",
      "posts": [
        {
          "date": "9/18",
          "platform": "Web",
          "title": "네이버클라우드, 국방 AX 협력 모델 제시",
          "deck": "군 관계자 550명에게 주권 AI 4단계 모델을 설명했습니다",
          "summary": "네이버클라우드가 군 관계자 약 550명 앞에서 '군이 AI 통제권을 갖고 민간 기술로 신속하게 전력화한다'는 국방 AI 협력 모델을 발표했습니다. 민간 역량 결집부터 폐쇄망 연동, 실전 검증, 현장 엔지니어를 통한 지속 개선까지 4단계로 구성됩니다.",
          "content": "네이버클라우드가 국방 분야를 위한 주권 AI(Sovereign AI) 협력 모델을 제시했다고 밝혔습니다. 약 550명의 국방 관계자를 대상으로 한 자리에서 나온 발표로, 핵심 메시지는 '군이 AI에 대한 통제권을 유지하면서도 민간 기술을 활용해 빠르게 전력화한다'는 것입니다.\n\n네이버클라우드가 설명한 협력 모델은 네 단계로 구성됩니다. 민간의 AI 전문성을 모으고, 이를 폐쇄망 안에서 안전하게 연동하며, 실제 작전 영역에서 성과를 검증하고, 마지막으로 현장에 배치된 엔지니어를 통해 성능을 지속적으로 개선하는 흐름입니다.\n\n이는 네이버클라우드가 협력 모델의 틀을 제시한 단계로, 실제 국방 부문 도입이나 계약 체결 여부까지 이번 발표에 포함된 것은 아닙니다.",
          "source": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034674",
          "officialUrl": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034674",
          "verifiedAt": "2026-09-22",
          "slug": "naver-cloud-defense-ai-partnership",
          "tags": [
            "AI",
            "2026-w38",
            "네이버",
            "Korea"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/e60a5db7a8da.jpg",
            "alt": "네이버클라우드, 국방 AX 협력 모델 제시 \"군이 AI 통제권 갖고 민간기술로 신속 전력화\""
          },
          "en": {
            "title": "NAVER Cloud presents a sovereign-AI defense partnership model",
            "deck": "A four-stage framework was pitched to 550 military officials",
            "summary": "NAVER Cloud presented a defense-AI cooperation model — 'the military keeps control of AI while using private-sector technology for rapid deployment' — to roughly 550 defense officials, built around a four-stage sovereign-AI framework.",
            "content": "NAVER Cloud said it presented a sovereign-AI cooperation model for the defense sector. The presentation was made to roughly 550 defense officials, and its core message is that the military should retain control over AI while using private-sector technology to field it quickly.\n\nThe cooperation model NAVER Cloud described has four stages: aggregating private-sector AI expertise, connecting it securely inside closed networks, validating results in real operational domains, and continuously improving performance through engineers deployed in the field.\n\nThis is the stage at which NAVER Cloud proposed the framework; the announcement does not cover whether any actual defense-sector deployment or contract has followed."
          }
        },
        {
          "date": "9/17",
          "platform": "Web",
          "title": "네이버지도, 대화형 '플레이스 에이전트' 출시",
          "deck": "말로 조건을 걸면 장소 찾기부터 예약까지 이어줍니다",
          "summary": "네이버지도가 자연어로 여러 조건을 걸어 장소를 찾고 예약까지 연결하는 대화형 AI 기능 '플레이스 에이전트'를 출시했습니다. '용인 한식당 주차 넉넉한 곳'처럼 일상적인 말투의 검색어를 이해합니다.",
          "content": "네이버지도가 대화형 AI 검색 기능 '플레이스 에이전트'를 출시했다고 발표했습니다. 이용자가 평소 말투 그대로 여러 조건을 한 문장에 담아 물어도 장소를 찾아주는 기능입니다.\n\n네이버가 제시한 예시 질의는 '용인 한식당 주차 넉넉한 곳'입니다. 지역, 업종, 주차 여건 같은 여러 조건이 뒤섞인 문장이라도 플레이스 에이전트가 이를 해석해 장소 데이터와 리뷰를 바탕으로 추천을 내놓고, 예약 연동까지 이어준다고 회사는 설명했습니다.\n\n국내 1위 지도 서비스에 대화형 에이전트가 실제로 탑재돼 예약까지 연결되는 사례로, 한국 이용자가 매일 쓰는 서비스에 AI가 어떤 방식으로 들어오고 있는지 보여줍니다.",
          "source": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034667",
          "officialUrl": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034667",
          "verifiedAt": "2026-09-22",
          "slug": "naver-map-place-agent",
          "tags": [
            "AI",
            "2026-w38",
            "네이버",
            "Korea"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/46f301fa3ce4.png",
            "alt": "일상 대화로 장소 찾고 예약까지 한번에…네이버지도, ‘플레이스 에이전트’ 출시"
          },
          "en": {
            "title": "NAVER Map launches 'Place Agent,' a conversational search feature",
            "deck": "Natural-language, multi-condition queries lead straight to a reservation",
            "summary": "NAVER Map launched 'Place Agent,' a conversational AI feature that parses natural-language, multi-condition queries and connects users to reservations. NAVER's own example is a Korean-language query for 'a Korean restaurant in Yongin with ample parking.'",
            "content": "NAVER announced the launch of 'Place Agent,' a conversational AI search feature in NAVER Map. It is designed to find places even when a user phrases several conditions in a single, everyday sentence.\n\nNAVER's example query is roughly 'a Korean restaurant in Yongin with ample parking.' The company says Place Agent parses mixed conditions like location, cuisine type, and parking availability, returns recommendations backed by place data and reviews, and connects directly into reservations.\n\nAs a case of a conversational agent actually shipping inside the country's leading map service, with a direct path to booking, it shows how AI is being integrated into a service Korean users touch daily."
          }
        },
        {
          "date": "9/17",
          "platform": "Web",
          "title": "네이버쇼핑, AI 쇼핑 에이전트에 배송일 추천 추가",
          "deck": "원하는 도착일에 맞는 상품을 골라 추천합니다",
          "summary": "네이버가 'AI 쇼핑 에이전트'에 배송 마감 시간과 실제 도착일을 분석해 원하는 날짜에 받을 수 있는 상품을 추천하는 기능을 더했습니다. 6월 출시 이후 대화량은 60%, 거래액은 82% 늘었다고 네이버는 밝혔습니다.",
          "content": "네이버가 자사 쇼핑 앱의 'AI 쇼핑 에이전트'에 배송일 기반 추천 기능을 추가했다고 발표했습니다. 이용자가 상품마다 배송 예정일을 일일이 확인하지 않아도, 원하는 시점에 받아볼 수 있는 상품을 에이전트가 먼저 걸러 보여주는 방식입니다.\n\n이를 위해 에이전트는 상품별 배송 마감 시간과 실제 도착일 데이터를 함께 분석합니다. 예를 들어 내일까지 받고 싶다는 조건을 걸면, 지금 주문했을 때 정말 내일 도착 가능한 상품만 추려 추천하는 식이라고 회사는 설명했습니다.\n\n네이버는 지난 6월 AI 쇼핑 에이전트를 출시한 이후 9월까지 대화량이 60%, 거래액이 82% 늘었다고 밝혔습니다. 이 수치는 네이버가 자체 집계해 공개한 것으로, 독립된 기관이 검증한 결과는 아닙니다.",
          "source": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034666",
          "officialUrl": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034666",
          "verifiedAt": "2026-09-22",
          "slug": "naver-shopping-ai-agent-delivery",
          "tags": [
            "AI",
            "2026-w38",
            "네이버",
            "Korea"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/6a86f9659753.png",
            "alt": "\"내일 도착 상품으로 알아서 추천\"... 네이버 쇼핑앱 ‘AI 쇼핑 에이전트’ 배송 특화 기능 고도화"
          },
          "en": {
            "title": "NAVER Shopping adds delivery-date-aware recommendations to its AI agent",
            "deck": "The agent surfaces items that can actually arrive by your target date",
            "summary": "NAVER added a feature to its 'AI Shopping Agent' that analyzes delivery cutoffs and actual arrival dates to recommend products that can arrive by a desired date. NAVER says conversation volume rose 60% and transaction value rose 82% since the agent's June launch.",
            "content": "NAVER announced a delivery-date-aware recommendation feature for the 'AI Shopping Agent' in its shopping app. Instead of checking each item's shipping timeline manually, users can let the agent filter for products that can arrive by a desired date.\n\nTo do this, the agent analyzes each product's delivery cutoff time alongside actual arrival-date data. For example, if a user asks for something to arrive by tomorrow, the company says the agent narrows results to items that can genuinely make that deadline if ordered now.\n\nNAVER said conversation volume rose 60% and transaction value rose 82% between the AI Shopping Agent's June launch and September. These figures are NAVER's own internal tally and have not been verified by an independent party."
          }
        },
        {
          "date": "9/16",
          "platform": "Web",
          "title": "네이버, 첫 'AI 안전성 보고서' 발간",
          "deck": "위험 110종 분류 체계로 서비스 적용 현황을 공개했습니다",
          "summary": "네이버가 자사 AI 안전성 프레임워크 'ASF 2.0'이 실제 서비스에 어떻게 적용됐는지 담은 첫 'AI Safety Progress Report'를 발간했습니다. AI 서비스 위험을 110개 유형으로 분류한 N-ARTI 체계와, 무해성과 유용성을 함께 평가하는 도구 N-ASET을 소개했습니다.",
          "content": "네이버가 자사의 AI 안전성 프레임워크 'ASF 2.0'을 실제 서비스에 어떻게 적용하고 있는지 담은 첫 'AI Safety Progress Report'를 발간했다고 밝혔습니다. 국내 대형 AI 서비스 기업이 안전성 거버넌스 체계를 정량적 지표와 함께 공개한 사례로 꼽힙니다.\n\n보고서에는 AI 서비스에서 나타날 수 있는 위험을 110개 세부 유형으로 나눈 위험 분류 체계 'N-ARTI', 그리고 AI 응답의 무해성과 유용성을 함께 평가해 안전성과 서비스 품질의 균형을 재는 평가 도구 'N-ASET'이 소개됐습니다.\n\n네이버가 자체적으로 공개한 보고서인 만큼 수치와 평가 기준 자체도 네이버가 설계한 것입니다. 다만 국내에서 AI 안전성 논의가 이제 막 구체화되는 상황에서, 대형 서비스 기업이 위험 분류와 평가 방법을 공개했다는 점 자체가 참고할 만한 선례입니다.",
          "source": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034662",
          "officialUrl": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034662",
          "verifiedAt": "2026-09-22",
          "slug": "naver-ai-safety-progress-report",
          "tags": [
            "AI",
            "2026-w38",
            "네이버",
            "Korea"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/3c35d80870b9.jpg",
            "alt": "네이버, ‘AI 안전성 체계’ 적용 사례 공개... ‘AI Safety Progress Report’ 첫 발간"
          },
          "en": {
            "title": "NAVER publishes its first AI Safety Progress Report",
            "deck": "A 110-category risk taxonomy backs up the company's safety claims",
            "summary": "NAVER published its first 'AI Safety Progress Report,' describing how its 'ASF 2.0' safety framework is applied across live services. It introduces N-ARTI, a taxonomy covering 110 AI service risk categories, and N-ASET, an evaluation tool that scores AI responses on both harmlessness and usefulness.",
            "content": "NAVER said it published its first 'AI Safety Progress Report,' describing how its 'ASF 2.0' safety framework is applied across live services. It is notable as a case of a major Korean AI service company disclosing its safety governance framework together with quantitative metrics.\n\nThe report introduces N-ARTI, a risk taxonomy that breaks AI service risks into 110 specific categories, and N-ASET, an evaluation tool that scores AI responses on both harmlessness and usefulness to balance safety against service quality.\n\nBecause NAVER published this report itself, the metrics and evaluation criteria are also NAVER's own design. Still, at a moment when AI-safety discussion in Korea is only beginning to take concrete shape, a major service company disclosing its risk taxonomy and evaluation method is itself a notable precedent."
          }
        }
      ]
    },
    {
      "name": "NVIDIA",
      "color": "#76B900",
      "posts": [
        {
          "date": "9/17",
          "platform": "Web",
          "title": "NVIDIA, 토큰 사용량 45% 줄인 에이전트 하네스 SoL-Pi 공개",
          "deck": "같은 성능을 내면서 API 비용은 약 3분의 1 줄었습니다",
          "summary": "엔비디아가 에이전트 하네스의 토큰 사용량을 줄이는 SoL-Pi를 논문으로 공개했습니다. 51개 과제로 구성된 EdgeBench에서 기존 하네스와 비슷한 성능을 내면서 기록된 토큰 사용량은 45~49%, API 비용은 약 3분의 1 줄었다고 밝혔습니다.",
          "content": "엔비디아 연구진이 2026년 9월 17일 논문으로 SoL-Pi를 공개했습니다. 여러 환경에서 자동 연구 루프를 반복 실행해 얻은 결과를 바탕으로, 실행 방식·컨텍스트 압축·관찰 처리·위임 읽기 네 가지 하네스 레벨 기법을 묶은 시스템입니다.\n\n51개 과제로 구성된 EdgeBench 평가에서 SoL-Pi는 GPT-5.6 Sol과 Opus 5 두 모델 모두에서 기존 참조 하네스인 Pi와 비슷한 성능을 유지하면서, 기록된 토큰 사용량은 44.7~49.0%, API 비용은 약 3분의 1 줄었다고 보고합니다.\n\n이 수치는 EdgeBench 51개 과제와 이 두 모델 조합에서 나온 결과로, 다른 과제나 다른 모델 조합에서도 같은 폭의 절감이 재현되는지는 이 논문만으로 확인되지 않습니다.",
          "source": "https://arxiv.org/abs/2609.20519",
          "officialUrl": "https://arxiv.org/abs/2609.20519",
          "verifiedAt": "2026-09-22",
          "slug": "nvidia-sol-pi-harness",
          "tags": [
            "AI",
            "2026-w38",
            "NVIDIA",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face daily papers listing",
              "url": "https://huggingface.co/papers/2609.20519"
            }
          ],
          "en": {
            "title": "NVIDIA's SoL-Pi harness cuts agent token usage sharply",
            "deck": "Same performance, roughly a third off the API bill",
            "summary": "NVIDIA's SoL-Pi harness matches a reference harness's performance on the 51-task EdgeBench evaluation while cutting recorded token usage by roughly 45-49% and API cost by about a third.",
            "content": "NVIDIA researchers published a paper on September 17, 2026 introducing SoL-Pi, a harness-layer system combining four mechanisms, action execution, context compaction, observation handling, and delegated reading, developed by running automated research loops repeatedly across many environments.\n\nOn its 51-task EdgeBench evaluation, SoL-Pi is reported to match the performance of a reference harness called Pi across both GPT-5.6 Sol and Opus 5, while reducing recorded token traffic by 44.7-49.0% and API cost by roughly a third.\n\nThese figures come from EdgeBench's 51 tasks and this particular model pairing; the paper does not establish that the same reduction holds for other tasks or model combinations."
          }
        },
        {
          "date": "9/16",
          "platform": "Web",
          "title": "NVIDIA, 깃 기반 공유 기억으로 협업하는 AI 연구팀 실험 Agora 공개",
          "deck": "지시도 계획도 없이 12일간 스스로 협업해 결과를 냈습니다",
          "summary": "엔비디아 연구진이 여러 언어모델이 깃 저장소를 공유 기억처럼 써서 서로의 결과 위에 이어 작업하게 하는 시스템 Agora를 공개했습니다. 지시나 중앙 계획 없이 13개 에이전트가 12일간 작업해 목표로 삼은 참조 모델과의 격차 62%를 좁혔습니다.",
          "content": "엔비디아 연구진이 2026년 9월 16일 논문으로 Agora를 공개했습니다. Agora는 여러 에이전트의 연구 결과를 append-only 깃 DAG 형태로 저장해, 따로 실행되는 언어모델들이 서로의 작업을 이어받아 발전시킬 수 있게 하는 시스템입니다.\n\n시연에서는 할당된 과제나 중앙 계획자 없이 13개의 언어모델 워커가 Agora를 통해 약 12일간 신경망 가중치 이전 문제를 다뤘습니다. 이들은 1,703건의 기여를 남겼고, 평가 지표를 3.39에서 1.899 bits per byte로 낮춰 학습된 GPT-2 124M 모델과의 격차 62%를 좁혔다고 보고합니다.\n\n이 결과는 특정 가중치 이전 과제 하나에서 나온 것으로, 다른 종류의 연구 문제에서도 같은 정도로 협업이 이뤄진다는 것을 보여주지는 않습니다.",
          "source": "https://arxiv.org/abs/2609.18094",
          "officialUrl": "https://arxiv.org/abs/2609.18094",
          "verifiedAt": "2026-09-22",
          "slug": "nvidia-agora-git-shared-memory",
          "tags": [
            "AI",
            "2026-w38",
            "NVIDIA",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face daily papers listing",
              "url": "https://huggingface.co/papers/2609.18094"
            }
          ],
          "en": {
            "title": "NVIDIA's Agora lets LLM workers collaborate through shared Git memory",
            "deck": "Twelve days, no plan, no instructions, still real progress",
            "summary": "NVIDIA's Agora lets independently running LLM workers collaborate through a shared Git-based memory. In a demo with no assigned tasks or planner, 13 workers closed 62% of the gap to a trained reference model over about 12 days.",
            "content": "NVIDIA researchers published a paper on September 16, 2026 introducing Agora, a system that stores multi-agent research contributions as an append-only Git DAG so that independently running language models can build on each other's work.\n\nIn a demonstration, 13 LLM workers with no assigned tasks and no central planner used Agora over roughly 12 days to work on a neural-network weight-transfer problem. They published 1,703 contributions and lowered an evaluator score from 3.39 to 1.899 bits per byte, closing 62% of the gap to a trained GPT-2 124M reference model.\n\nThe result comes from this one weight-transfer task, and does not show that the same degree of unsupervised collaboration would emerge on other kinds of research problems."
          }
        },
        {
          "date": "9/15",
          "platform": "Web",
          "title": "NVIDIA 젠슨 황, 드림포스서 세일즈포스와 함께",
          "deck": "이제 모든 걸 알고 뭐든 할 수 있다는 메시지를 전했습니다",
          "summary": "NVIDIA 창업자 겸 CEO 젠슨 황이 세일즈포스의 드림포스 컨퍼런스에 등장해 마크 베니오프 CEO와 함께 무대에 올랐습니다. 그는 이제 모든 것을 알고 무엇이든 할 수 있다는 메시지를 전했습니다.",
          "content": "NVIDIA 창업자 겸 CEO 젠슨 황이 세일즈포스의 연례 컨퍼런스 드림포스에 참석해 마크 베니오프 세일즈포스 CEO와 함께 무대에 올랐습니다.\n\n젠슨 황은 이 자리에서 이제 모든 것을 알고 무엇이든 할 수 있다는 메시지를 전했습니다. NVIDIA 공식 블로그는 이를 두 회사의 협업을 상징하는 발언으로 소개했습니다.\n\n이 카드는 NVIDIA가 공개한 컨퍼런스 등장 소식을 전달하며, 구체적인 신제품 발표나 수치는 포함하지 않습니다.",
          "source": "https://blogs.nvidia.com/blog/jensen-huang-dreamforce/",
          "officialUrl": "https://blogs.nvidia.com/blog/jensen-huang-dreamforce/",
          "verifiedAt": "2026-09-22",
          "slug": "nvidia-jensen-huang-dreamforce",
          "tags": [
            "AI",
            "2026-w38",
            "NVIDIA",
            "Agents"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/38bc70bfb2fc.jpg",
            "alt": "‘Now We Can Know Everything and Do Anything,’ Jensen Huang Says at Dreamforce"
          },
          "en": {
            "title": "NVIDIA's Jensen Huang joins Salesforce on the Dreamforce stage",
            "deck": "\"Now we can know everything and do anything,\" he said",
            "summary": "NVIDIA founder and CEO Jensen Huang appeared at Salesforce's Dreamforce conference alongside Salesforce CEO Marc Benioff, delivering the message that companies can now know everything and do anything.",
            "content": "NVIDIA founder and CEO Jensen Huang joined Salesforce's annual Dreamforce conference, appearing on stage with Salesforce CEO Marc Benioff.\n\nAt the event, Huang delivered the message that \"now we can know everything and do anything.\" NVIDIA's official blog framed the remark as symbolizing the two companies' collaboration.\n\nThis card conveys the conference appearance NVIDIA announced and does not include specific product launches or figures."
          }
        }
      ]
    },
    {
      "name": "Ollama",
      "color": "#111827",
      "posts": [
        {
          "date": "9/19 09:02",
          "platform": "Web",
          "title": "Ollama, v0.34.3 릴리스 후보(rc1) 공개",
          "deck": "리눅스용 MLX 지원을 포함한 플랫폼별 빌드입니다",
          "summary": "Ollama가 v0.34.3의 릴리스 후보(rc1)를 GitHub에 배포했습니다. macOS·리눅스(MLX 지원 포함)·윈도 설치 파일을 함께 제공하는 플랫폼별 빌드입니다.",
          "content": "Ollama가 다음 정식 버전인 v0.34.3의 릴리스 후보(rc1)를 GitHub 릴리스로 공개했습니다. 정식 배포 전에 미리 검증해볼 수 있도록 내놓는 프리릴리스 빌드입니다.\n\n이번 릴리스 후보에는 macOS용 패키지, MLX 지원을 포함한 리눅스용 패키지, 윈도 설치 스크립트가 함께 포함됐습니다. Apple Silicon에서 MLX 가속을 쓰는 사용자를 겨냥한 리눅스 빌드가 새로 포함된 점이 눈에 띕니다.\n\n릴리스 후보 단계이므로 안정성 검증을 원하는 이용자만 먼저 설치해보는 것이 안전하며, 정식 버전은 이후 별도로 나올 예정입니다.\n\n게시 메타데이터의 2026년 9월 19일 00:02 UTC를 한국시간 09:02로 변환해 표시했습니다.",
          "source": "https://github.com/ollama/ollama/releases/tag/v0.34.3-rc1",
          "officialUrl": "https://github.com/ollama/ollama/releases/tag/v0.34.3-rc1",
          "verifiedAt": "2026-09-22",
          "slug": "ollama-v0-34-3-rc1",
          "tags": [
            "AI",
            "2026-w38",
            "Ollama",
            "Open Source"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/9bb2319abe9f.png",
            "alt": "Release v0.34.3 · ollama/ollama"
          },
          "en": {
            "title": "Ollama publishes the v0.34.3-rc1 release candidate",
            "deck": "Platform builds include a Linux package with MLX support",
            "summary": "Ollama published a release candidate (rc1) for v0.34.3 on GitHub, with platform packages for macOS, Linux (including MLX support), and Windows installers.",
            "content": "Ollama published a release candidate, rc1, for the upcoming v0.34.3 as a GitHub release — a pre-release build meant for testing ahead of the stable version.\n\nThe release candidate includes a macOS package, a Linux package with MLX support, and a Windows installer script. Notably, the Linux build now targets users running MLX acceleration on Apple Silicon.\n\nBecause this is a release candidate, only users comfortable testing pre-release stability should install it first; a stable version is expected to follow separately.\n\nThe publisher's datePublished value, September 19, 2026 at 00:02 UTC, is displayed here as 09:02 KST."
          }
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "9/18",
          "platform": "Web",
          "title": "OpenAI, Codex CLI 0.155.1 배포",
          "deck": "추론 요약 기본값을 되돌려 일부 제공자의 요청 거부를 막았습니다",
          "summary": "OpenAI가 Codex Rust CLI를 v0.155.1로 업데이트해 새 로컬 TUI 세션의 추론 요약 기본값을 다시 비활성으로 되돌렸습니다. 추론 요약을 지원하지 않는 일부 제공자가 요청을 거부하던 문제를 해결한 버그 수정 릴리스입니다.",
          "content": "OpenAI가 Codex Rust CLI v0.155.1을 배포했습니다.\n\n새로 시작하는 로컬 TUI 세션에서 추론 요약(reasoning summary) 설정을 기본값인 비활성 상태로 되돌렸습니다. 이전 버전에서 추론 요약이 기본 활성화되면서, 이 기능을 지원하지 않는 일부 제공자가 요청 자체를 거부하는 문제가 있었습니다.\n\n이번 릴리스는 해당 회귀를 바로잡는 버그 수정이며, 새 기능 추가 없이 기존 동작을 복원하는 데 초점을 맞췄습니다.",
          "source": "https://github.com/openai/codex/releases/tag/rust-v0.155.1",
          "officialUrl": "https://github.com/openai/codex/releases/tag/rust-v0.155.1",
          "verifiedAt": "2026-09-22",
          "slug": "openai-codex-rust-0-155-1",
          "tags": [
            "AI",
            "2026-w38",
            "OpenAI",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/038d5388eba3.png",
            "alt": "Release 0.155.1 · openai/codex"
          },
          "en": {
            "title": "OpenAI ships Codex CLI v0.155.1",
            "deck": "Reverts a reasoning-summary default that some providers were rejecting",
            "summary": "OpenAI updated the Codex Rust CLI to v0.155.1, restoring the disabled-by-default reasoning summary setting for new local TUI sessions. The fix addresses request rejections from providers that do not support reasoning summaries.",
            "content": "OpenAI released Codex Rust CLI v0.155.1.\n\nNew local TUI sessions now leave the reasoning summary setting disabled by default again. In the prior version, reasoning summaries were enabled by default, which caused some providers that do not support them to reject requests outright.\n\nThis release is a bug fix that restores the earlier behavior without adding new features."
          }
        },
        {
          "date": "9/18",
          "platform": "Web",
          "title": "OpenAI, 파이썬 SDK 3.14~3.16 연속 업데이트",
          "deck": "에이전트 세션 설정과 웹훅 관리 기능이 새로 추가됐습니다",
          "summary": "OpenAI가 9월 14일부터 18일까지 openai-python SDK를 v3.14.0에서 v3.16.2까지 여섯 차례 업데이트했습니다. 에이전트 세션 모델 설정과 오디오 미니 모델 선택지, 웹훅 엔드포인트 관리를 추가하고 스트림 오류 처리와 재시도 한도 검증 등 버그를 고쳤습니다.",
          "content": "OpenAI가 오픈소스 파이썬 SDK인 openai-python을 9월 14일 v3.14.0부터 9월 18일 v3.16.2까지 여섯 차례 업데이트했습니다.\n\nv3.14.0은 스트림을 읽는 중 발생하는 오류를 표준화하고 벡터 스토어 파일 폴링에 상한을 뒀습니다. v3.14.1은 재시도 한도를 검증하고 애플리케이션 오류를 보존하도록 고쳤으며 StreamAlreadyConsumed 오류 메시지의 오타를 바로잡았습니다.\n\nv3.15.0은 에이전트 세션의 모델 설정과 오디오 미니 모델 선택지를 추가했습니다. 같은 날 나온 v3.16.0은 웹훅 엔드포인트 관리 기능을 넣고 MCP connector_id를 지원 종료 예정으로 표시했습니다. 이어진 v3.16.1은 처음 사용할 때 관련 없는 API 리소스까지 불러오던 문제를 없앴고, v3.16.2는 parse_response에서 TextFormatT 매개변수화를 제거해 메모리 누수를 고쳤습니다.",
          "source": "https://github.com/openai/openai-python/releases/tag/v3.16.2",
          "officialUrl": "https://github.com/openai/openai-python/releases/tag/v3.16.2",
          "verifiedAt": "2026-09-22",
          "slug": "openai-python-sdk-3-14-to-3-16",
          "tags": [
            "AI",
            "2026-w38",
            "OpenAI",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "openai-python v3.14.0 릴리스 노트",
              "url": "https://github.com/openai/openai-python/releases/tag/v3.14.0"
            },
            {
              "label": "openai-python v3.14.1 릴리스 노트",
              "url": "https://github.com/openai/openai-python/releases/tag/v3.14.1"
            },
            {
              "label": "openai-python v3.15.0 릴리스 노트",
              "url": "https://github.com/openai/openai-python/releases/tag/v3.15.0"
            },
            {
              "label": "openai-python v3.16.0 릴리스 노트",
              "url": "https://github.com/openai/openai-python/releases/tag/v3.16.0"
            },
            {
              "label": "openai-python v3.16.1 릴리스 노트",
              "url": "https://github.com/openai/openai-python/releases/tag/v3.16.1"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/54dc90386cac.png",
            "alt": "Release v3.16.2 · openai/openai-python"
          },
          "en": {
            "title": "OpenAI Python SDK moves from v3.14 to v3.16 in five days",
            "deck": "New agent session settings and webhook management land across six builds",
            "summary": "OpenAI updated its openai-python SDK six times between v3.14.0 on September 14 and v3.16.2 on September 18, adding agent session model settings, audio-mini model choices, and webhook endpoint management while fixing stream error handling and retry-limit validation.",
            "content": "OpenAI updated its open-source openai-python SDK six times between v3.14.0 on September 14 and v3.16.2 on September 18.\n\nv3.14.0 normalized errors raised while reading streams and bounded vector store file polling. v3.14.1 fixed retry-limit validation, preserved application errors, and corrected a typo in the StreamAlreadyConsumed error message.\n\nv3.15.0 added agent session model settings and audio-mini model choices. The same-day v3.16.0 added webhook endpoint management and deprecated the MCP connector_id. The following v3.16.1 stopped loading unrelated API resources on first use, and v3.16.2 fixed a memory leak by dropping TextFormatT parameterization in parse_response."
          }
        },
        {
          "date": "9/16",
          "platform": "Web",
          "title": "OpenAI, 스폰서 에이전트 등 광고 도구 공개",
          "deck": "허브스팟·쇼피파이 연동으로 마케터용 기능을 넓혔습니다",
          "summary": "OpenAI가 새로운 AI 기반 광고 경험을 소개했습니다. 스폰서 에이전트, 마케터용 도구, 허브스팟·쇼피파이 연동을 포함합니다.",
          "content": "OpenAI가 새로운 AI 기반 광고 경험을 공개했습니다.\n\n핵심은 스폰서 에이전트(Sponsored Agents)와 마케터를 위한 도구, 그리고 허브스팟·쇼피파이와의 연동입니다. 광고주와 마케터가 OpenAI 플랫폼 안에서 캠페인을 다루는 범위를 넓히는 방향입니다.\n\n이 발표는 새로 선보이는 광고 관련 기능의 개요를 전달하는 내용이며, 구체적인 요금이나 출시 지역은 명시되지 않았습니다.",
          "source": "https://openai.com/index/reimagining-advertising-with-ai",
          "officialUrl": "https://openai.com/index/reimagining-advertising-with-ai",
          "verifiedAt": "2026-09-22",
          "slug": "openai-advertising-sponsored-agents",
          "tags": [
            "AI",
            "2026-w38",
            "OpenAI",
            "Agents"
          ],
          "backupUrls": [
            {
              "label": "OpenAI 뉴스 RSS 피드",
              "url": "https://openai.com/news/rss.xml"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/71e26ee7e07e.webp",
            "alt": "How to connect AI usage to business value — art card"
          },
          "en": {
            "title": "OpenAI unveils Sponsored Agents and other ad tools",
            "deck": "HubSpot and Shopify integrations expand marketer features",
            "summary": "OpenAI introduced new AI-powered advertising experiences, including Sponsored Agents, tools for marketers, and integrations with HubSpot and Shopify.",
            "content": "OpenAI introduced new AI-powered advertising experiences.\n\nThe centerpiece is Sponsored Agents, along with tools for marketers and integrations with HubSpot and Shopify. The changes expand how advertisers and marketers can manage campaigns within OpenAI's platform.\n\nThe announcement outlines the new advertising features and does not specify pricing or launch regions."
          }
        },
        {
          "date": "9/16",
          "platform": "Web",
          "title": "OpenAI 경제 리서치, 근로자의 새 업무 활용법 조사",
          "deck": "AI로 생긴 반복적인 새 업무 유형을 데이터로 짚었습니다",
          "summary": "OpenAI의 새 경제 리서치가 근로자들이 기존 업무 범위를 넘어 AI를 어떻게 활용하는지, 그리고 어떤 새로운 활동이 반복적인 업무로 자리 잡는지를 보여줍니다.",
          "content": "OpenAI가 새로운 경제 리서치 결과를 공개했습니다.\n\n이번 리서치는 근로자들이 기존 직무 범위를 넘어서 AI를 활용하는 방식과, 그런 활용 중 어떤 것이 반복적으로 자리 잡은 업무 활동이 되는지를 살펴봤습니다.\n\n이 카드는 OpenAI가 소개한 리서치 개요를 전달하며, 세부 방법론과 수치는 원문에서 확인할 수 있습니다.",
          "source": "https://openai.com/index/unlocking-new-ways-of-working",
          "officialUrl": "https://openai.com/index/unlocking-new-ways-of-working",
          "verifiedAt": "2026-09-22",
          "slug": "openai-economic-research-new-ways-of-working",
          "tags": [
            "AI",
            "2026-w38",
            "OpenAI",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "OpenAI 뉴스 RSS 피드",
              "url": "https://openai.com/news/rss.xml"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/b91b2390af7d.webp",
            "alt": "Building shared standards for the next phase of AI - art card"
          },
          "en": {
            "title": "OpenAI research tracks new ways workers use AI",
            "deck": "Looks at which AI-enabled tasks become recurring work",
            "summary": "New OpenAI economic research shows how workers use AI beyond their traditional roles and which of those new activities become recurring parts of their work.",
            "content": "OpenAI published new economic research findings.\n\nThe research looked at how workers use AI beyond the scope of their traditional roles, and which of those uses become recurring parts of their work.\n\nThis card conveys the research overview OpenAI presented; detailed methodology and figures are available in the original report."
          }
        },
        {
          "date": "9/15",
          "platform": "Web",
          "title": "OpenAI, API 키 생성 거버넌스 통제 추가",
          "deck": "조직·프로젝트 단위로 신규 키 발급 범위를 제한합니다",
          "summary": "OpenAI가 API 변경 로그에 API 키 생성 거버넌스 통제 기능을 추가했다고 밝혔습니다. 관리자는 서비스 계정 키만 허용하거나 사용자 소유 프로젝트 키만 허용하거나 신규 키 생성 자체를 막을 수 있습니다.",
          "content": "OpenAI 개발자 문서의 API 변경 로그에 조직·프로젝트 단위 API 키 생성 거버넌스 통제 기능이 추가됐습니다.\n\n관리자는 세 가지 방식 중 하나를 선택할 수 있습니다. 서비스 계정 키만 생성을 허용하거나, 사용자 소유 프로젝트 키만 허용하거나, 신규 API 키 생성 자체를 비활성화하는 방식입니다. 기존에 발급된 키는 이 설정의 영향을 받지 않습니다.\n\n이번 업데이트는 조직 차원의 키 관리와 보안 통제를 강화하려는 조치로, 새 기능을 소개하는 변경 로그 항목입니다.",
          "source": "https://developers.openai.com/api/docs/changelog",
          "officialUrl": "https://developers.openai.com/api/docs/changelog",
          "verifiedAt": "2026-09-22",
          "slug": "openai-api-key-governance-controls",
          "tags": [
            "AI",
            "2026-w38",
            "OpenAI",
            "Security"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/04eae3b805a4.png",
            "alt": "Changelog | OpenAI API"
          },
          "en": {
            "title": "OpenAI adds API key creation governance controls",
            "deck": "Admins can now limit who is allowed to create new keys",
            "summary": "OpenAI's API changelog now lists API key creation governance controls at the organization and project level, letting admins allow only service-account keys, allow only user-owned project keys, or disable new key creation entirely.",
            "content": "OpenAI's developer changelog now includes API key creation governance controls at the organization and project level.\n\nAdministrators can choose one of three modes: allow only service-account key creation, allow only user-owned project keys, or disable all new API key creation. Existing keys are unaffected by this setting.\n\nThis update is aimed at strengthening organization-level key management and security controls, presented as a changelog entry introducing the new feature."
          }
        },
        {
          "date": "9/14",
          "platform": "Web",
          "title": "OpenAI, Fyxer 사례로 신뢰받는 AI 비서 소개",
          "deck": "파인튜닝과 메모리로 사용자 말투에 맞춘 이메일을 씁니다",
          "summary": "OpenAI가 고객 사례 페이지에서 이메일 관리 스타트업 Fyxer를 소개했습니다. Fyxer는 OpenAI 모델과 파인튜닝, 메모리, 실사용자 피드백을 결합해 받은편지함을 정리하고 각 사용자의 말투로 이메일 초안을 씁니다.",
          "content": "OpenAI가 고객 사례로 이메일 관리 스타트업 Fyxer의 활용 방식을 소개했습니다.\n\nFyxer는 OpenAI 모델을 기반으로 파인튜닝과 메모리, 실사용자 피드백을 결합해 받은편지함을 정리하고 이메일 초안을 씁니다. 초안은 사용자마다 다른 말투를 반영하도록 설계됐다고 설명합니다.\n\n이 글은 OpenAI가 공개한 고객 사례이며 도입 기업의 자체 설명을 바탕으로 합니다. 별도의 독립 검증 결과는 포함하지 않았습니다.",
          "source": "https://openai.com/index/fyxer",
          "officialUrl": "https://openai.com/index/fyxer",
          "verifiedAt": "2026-09-22",
          "slug": "fyxer-openai-executive-assistant",
          "tags": [
            "AI",
            "2026-w38",
            "OpenAI",
            "Agents"
          ],
          "backupUrls": [
            {
              "label": "OpenAI 뉴스 RSS 피드",
              "url": "https://openai.com/news/rss.xml"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/71a0d72b4afb.webp",
            "alt": "Higgsfield AI customer story art card"
          },
          "en": {
            "title": "OpenAI spotlights Fyxer as a trusted AI executive assistant",
            "deck": "Fine-tuning and memory help it draft email in each user's voice",
            "summary": "OpenAI published a customer story on email-management startup Fyxer, which combines OpenAI models with fine-tuning, memory, and real user feedback to organize inboxes and draft email in each user's own voice.",
            "content": "OpenAI published a customer story describing how email-management startup Fyxer uses its models.\n\nFyxer combines OpenAI models with fine-tuning, memory, and real user feedback to organize inboxes and draft emails. The drafts are designed to reflect each user's own voice.\n\nThis is a customer story OpenAI published, based on the adopting company's own account, and does not include independent verification results."
          }
        }
      ]
    },
    {
      "name": "OpenSpec",
      "color": "#4338CA",
      "posts": [
        {
          "date": "9/17",
          "platform": "Web",
          "title": "OpenSpec 1.13.1, 미검토 저장소 실행 시 보안 취약점 차단",
          "deck": "낯선 저장소를 열어도 설정 파일이 지시를 주입할 수 없습니다",
          "summary": "OpenSpec이 1.13.1에서 검토하지 않은 저장소를 열었을 때 설정 파일이 에이전트 지시에 끼어들 수 있던 취약점을 막았습니다. npmrc를 통한 업데이트 확인 우회도 차단하고 openspec status에 다음 할 일을 알려주는 안내를 추가했습니다.",
          "content": "Fission-AI의 OpenSpec이 2026년 9월 17일 1.13.1을 냈습니다. 이번 버전은 '하드닝된 CLI, 더 안전한 아카이브'라는 제목대로, 아직 검토하지 않은 저장소를 클론해서 실행할 때의 안전성을 높이는 데 초점을 맞췄습니다.\n\nconfig.yaml 값이 에이전트 지시에 끼어들 수 있던 경로를 막았고, .npmrc를 이용해 업데이트 확인 요청을 다른 곳으로 돌리던 우회 경로도 차단했습니다. 여기에 openspec status 명령에 다음에 무엇을 하면 되는지 알려주는 안내 줄을 추가했습니다. MIT 라이선스이며 별 69,788개를 받았습니다.",
          "source": "https://github.com/Fission-AI/OpenSpec/releases/tag/v1.13.1",
          "officialUrl": "https://github.com/Fission-AI/OpenSpec/releases/tag/v1.13.1",
          "verifiedAt": "2026-09-22",
          "slug": "openspec-1-13-1",
          "tags": [
            "AI",
            "2026-w38",
            "OpenSpec",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/Fission-AI/OpenSpec"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/cc1900169cb2.png",
            "alt": "Release v1.13.1 - Hardened CLI, safer archives · Fission-AI/OpenSpec"
          },
          "en": {
            "title": "OpenSpec 1.13.1 closes an instruction-injection path in unreviewed clones",
            "deck": "Config files can no longer inject instructions into agents",
            "summary": "OpenSpec v1.13.1 closes a config-injection path and an .npmrc-based update-check redirect that could affect freshly cloned, unreviewed repositories, and adds next-step guidance to its status command.",
            "content": "Fission-AI's OpenSpec shipped v1.13.1 on September 17, 2026, titled \"Hardened CLI, safer archives,\" focused on making it safer to run OpenSpec against a repository you have not yet reviewed.\n\nIt closes a path where a config.yaml value could inject directives into agent instructions, and blocks a redirection route that used .npmrc to hijack the update-check request. The release also adds a \"Next:\" guidance line to the openspec status command. The project is MIT-licensed with 69,788 GitHub stars."
          }
        }
      ]
    },
    {
      "name": "Orca",
      "color": "#1D4ED8",
      "posts": [
        {
          "date": "9/20",
          "platform": "Web",
          "title": "orca 1.4.206, 컴퓨터 간 에이전트 세션 검색 기능 추가",
          "deck": "다른 컴퓨터에서 작업한 세션도 검색해서 이어갈 수 있습니다",
          "summary": "AI 코딩 어시스턴트 orca가 1.4.206에서 여러 컴퓨터에 걸친 에이전트 세션 기록을 패널과 CLI에서 검색하는 기능을 추가했습니다. OpenCode 2 지원, 재시작 후 채팅 세션 재연결, OMP를 통한 소스 컨트롤 AI 생성도 새로 붙었습니다.",
          "content": "stablyai의 orca가 2026년 9월 20일 1.4.206을 냈습니다. 이번 버전은 패널과 명령줄 도구인 orca search에서 여러 컴퓨터에 걸친 에이전트 세션 기록을 검색할 수 있게 했습니다.\n\nOpenCode 2 하네스 지원이 추가됐고, orca를 재시작해도 이전 채팅 세션에 다시 연결할 수 있게 됐습니다. OMP를 통해 커밋 메시지 같은 소스 컨트롤 관련 내용을 AI가 생성하는 기능도 새로 들어갔습니다. 릴리스 노트는 착지된 PR이 실제 배포까지 보통 48~72시간 걸린다고 안내합니다. MIT 라이선스이며 별 74,873개를 받았습니다.",
          "source": "https://github.com/stablyai/orca/releases/tag/v1.4.206",
          "officialUrl": "https://github.com/stablyai/orca/releases/tag/v1.4.206",
          "verifiedAt": "2026-09-22",
          "slug": "orca-1-4-206",
          "tags": [
            "AI",
            "2026-w38",
            "Orca",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/stablyai/orca"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/a04a6327f6d2.png",
            "alt": "Release v1.4.206 · stablyai/orca"
          },
          "en": {
            "title": "orca 1.4.206 adds cross-machine agent session search",
            "deck": "Search agent sessions from any of your computers",
            "summary": "orca v1.4.206 adds cross-machine agent session-history search from its panel and CLI, OpenCode 2 support, session reconnection after a restart, and AI-generated source-control content via OMP.",
            "content": "stablyai's orca shipped v1.4.206 on September 20, 2026. The release lets users search agent session history across multiple computers from both the panel and the orca search command-line tool.\n\nIt adds OpenCode 2 harness support, lets chat sessions reconnect after an orca restart, and adds AI-generated source-control content (such as commit messages) through OMP. The release notes note that a landed PR typically takes 48-72 hours to reach a release. orca is MIT-licensed with 74,873 GitHub stars."
          }
        }
      ]
    },
    {
      "name": "Perplexity",
      "color": "#7C3AED",
      "posts": [
        {
          "date": "9/15",
          "platform": "Web",
          "title": "Crusoe·Perplexity, 다년 AI 인프라 파트너십 체결",
          "deck": "Perplexity가 Crusoe GPU 클러스터에서 모델을 학습·서빙합니다",
          "summary": "AI 인프라 기업 Crusoe와 검색 엔진 Perplexity가 다년간 파트너십을 맺었다고 Crusoe 뉴스룸을 통해 발표했습니다. Perplexity는 Crusoe의 NVIDIA GB300 NVL72 클러스터에서 프런티어 모델을 학습·서빙하고, Crusoe는 약 1,800명 임직원에게 Perplexity Enterprise Pro·Max를 도입합니다.",
          "content": "AI 인프라 기업 Crusoe와 검색 엔진 Perplexity가 다년간 파트너십을 체결했다고 Crusoe가 자사 뉴스룸을 통해 발표했습니다. 이 소식은 Perplexity의 공식 채널이 아니라 Crusoe 쪽 발표로 처음 확인됐습니다.\n\n발표에 따르면 Perplexity는 Crusoe가 구축한 NVIDIA GB300 NVL72 클러스터와 NVIDIA InfiniBand 네트워크에서 프런티어 모델을 학습하고, 이를 Crusoe의 매니지드 추론 서비스를 통해 상용 서비스로 제공할 계획입니다. 학습부터 서빙까지 모델 생애주기 전체를 한 인프라 위에서 처리하는 구조입니다.\n\n반대급부로 Crusoe는 약 1,800명 규모의 자사 임직원에게 Perplexity의 엔터프라이즈용 Pro·Max 플랜을 도입하기로 했습니다. 두 회사가 서로의 서비스를 맞바꿔 쓰는 상호 파트너십인 셈입니다.\n\n이 소식은 처음 2026년 9월 16일로 보도됐으나, Crusoe 뉴스룸 원문에는 9월 15일 자로 게시돼 있어 이 날짜를 기준으로 표시했습니다.",
          "source": "https://www.crusoe.ai/resources/newsroom/crusoe-perplexity-partnership",
          "officialUrl": "https://www.crusoe.ai/resources/newsroom/crusoe-perplexity-partnership",
          "verifiedAt": "2026-09-22",
          "slug": "perplexity-crusoe-ai-infrastructure-partnership",
          "tags": [
            "AI",
            "2026-w38",
            "Perplexity",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/51553d8e4282.jpg",
            "alt": "A black rectangular card with a thin white outline displays the white logos for \"Crusoe\" and \"Perplexity\" separated by a vertical divider, centered over a colorful, grainy abstract background of dark blue and warm orange gradient hues."
          },
          "en": {
            "title": "Crusoe and Perplexity announce a multi-year AI infrastructure partnership",
            "deck": "Perplexity will train and serve models on Crusoe's GPU clusters",
            "summary": "AI infrastructure company Crusoe and search engine Perplexity announced a multi-year partnership via Crusoe's own newsroom. Perplexity will train and serve frontier models on Crusoe's NVIDIA GB300 NVL72 clusters, while Crusoe adopts Perplexity Enterprise Pro/Max for roughly 1,800 employees.",
            "content": "AI infrastructure company Crusoe and search engine Perplexity announced a multi-year partnership, first confirmed through Crusoe's own newsroom rather than an official Perplexity channel.\n\nAccording to the announcement, Perplexity will train frontier models on Crusoe's NVIDIA GB300 NVL72 clusters and NVIDIA InfiniBand network, then serve them in production through Crusoe's Managed Inference service — covering the full model lifecycle, from training to serving, on a single infrastructure stack.\n\nIn return, Crusoe will adopt Perplexity's Enterprise Pro/Max plans for its roughly 1,800 employees, making this a reciprocal partnership in which each company becomes a customer of the other's product.\n\nThe news was first reported on September 16, 2026, but Crusoe's own newsroom post carries a September 15 date, which is used here."
          }
        }
      ]
    },
    {
      "name": "RustFS",
      "color": "#CE422B",
      "posts": [
        {
          "date": "9/16",
          "platform": "Web",
          "title": "RustFS, S3 호환 오브젝트 스토리지 정식 1.0 출시",
          "deck": "오랜 릴리스 후보 기간을 끝내고 정식 버전으로 올라섰습니다",
          "summary": "러스트로 작성된 S3 호환 오브젝트 스토리지 RustFS가 오랜 릴리스 후보 기간을 마치고 정식 1.0.0을 냈습니다. 이번 버전은 힐링·복구 로직과 릴리스 브랜치 점검 절차를 다듬은 안정화 릴리스입니다.",
          "content": "RustFS가 2026년 9월 16일 정식 1.0.0을 냈습니다. RustFS는 러스트로 작성된 오픈소스 S3 호환 오브젝트 스토리지 시스템으로, 오랫동안 이어진 1.0.0-rc와 프리뷰 빌드를 마치고 이번에 처음으로 릴리스 후보 딱지를 뗐습니다.\n\n이번 릴리스에는 MRF(Metadata Recovery File) 매니페스트의 CAS 레거시 전환을 다루는 힐링 테스트 보강, CI에서 릴리스 브랜치 점검을 켜고 테스트 임포트를 손본 변경 등 릴리스 준비 과정을 다지는 작업이 다수 포함됐습니다.\n\n정식 버전으로 올라섰다는 것은 API와 저장 형식이 이제부터는 이전 버전과의 호환을 우선한다는 뜻이며, 실제 운영 환경에 놓기 전 안정성이 어느 정도인지는 이번 릴리스 노트만으로 확인되지 않습니다. Apache-2.0 라이선스로 공개되어 있고 별 33,602개를 받았습니다.\n\nS3 호환이라는 것은 아마존 웹서비스가 만든 스토리지 API 규격을 그대로 따른다는 뜻으로, 이 규격에 맞춰 만들어진 기존 프로그램을 코드 수정 없이 RustFS로 그대로 연결할 수 있다는 의미입니다.\n\n오브젝트 스토리지는 사진이나 로그처럼 크기가 제각각인 데이터를 파일 단위로 저장하고 꺼내 쓰는 방식으로, 웹 서비스가 업로드된 파일이나 백업을 보관할 때 흔히 씁니다.",
          "source": "https://github.com/rustfs/rustfs/releases/tag/1.0.0",
          "officialUrl": "https://github.com/rustfs/rustfs/releases/tag/1.0.0",
          "verifiedAt": "2026-09-22",
          "slug": "rustfs-1-0-0",
          "tags": [
            "AI",
            "2026-w38",
            "RustFS",
            "Open Source"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/rustfs/rustfs"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/b7a8ae2c0bc3.png",
            "alt": "Release RustFS 1.0.0 · rustfs/rustfs"
          },
          "en": {
            "title": "RustFS reaches a stable 1.0 for its S3-compatible object storage",
            "deck": "Ends a long release-candidate run with a stable tag",
            "summary": "RustFS, a Rust-built S3-compatible object storage system, published its first stable 1.0.0 release after a long run of release candidates, mainly hardening healing tests and CI release checks.",
            "content": "RustFS reached its 1.0.0 stable release on September 16, 2026. RustFS is an open-source, Rust-built S3-compatible object storage system, and this release ends a long run of 1.0.0-rc and preview builds, the project's first time shedding its release-candidate label.\n\nThis release is largely release-hardening work: added healing-test coverage for the MRF (Metadata Recovery File) manifest's CAS legacy transition, release-branch checks enabled in CI, and repaired test imports.\n\nReaching a stable 1.0.0 tag signals that the project now prioritizes backward compatibility for its API and storage format going forward; the release notes alone do not establish how it performs under real production load. RustFS is Apache-2.0 licensed and has 33,602 GitHub stars.\n\nBeing S3-compatible means RustFS follows the storage API conventions Amazon Web Services created, so existing software written against that API can generally connect to RustFS without code changes.\n\nObject storage stores and retrieves data of varying sizes, like photos or logs, as discrete files, and web services commonly use it to hold uploaded files or backups."
          }
        }
      ]
    },
    {
      "name": "SK텔레콤",
      "color": "#EA002C",
      "posts": [
        {
          "date": "9/20 09:00",
          "platform": "Web",
          "title": "SK텔레콤, '두 더 굿 AI' 전략으로 사회공헌 11개 사업 공개",
          "deck": "보이스피싱 탐지 등 실사용 AI로 사회적 가치를 추구합니다",
          "summary": "SK텔레콤이 '코리아 소셜밸류 페스타'에서 AI 경쟁력과 신뢰성·안전성을 함께 추구하는 '두 더 굿 AI' 전략을 발표하고, 보이스피싱 탐지·금융사기 방지 등 AI 기반 사회공헌 사업 11개를 공개했습니다.",
          "content": "SK텔레콤이 '코리아 소셜밸류 페스타'에서 '두 더 굿 AI(DO THE GOOD AI)' 전략을 발표했습니다. AI 기술 경쟁력을 높이는 동시에 AI의 신뢰성과 안전성을 확보하고, 사회에 긍정적으로 기여하는 지속가능경영을 추진하겠다는 뜻을 담았다고 회사는 설명했습니다.\n\n이 자리에서 SK텔레콤은 실제로 운영 중인 AI 기반 사회공헌 사업 11개를 소개했습니다. 보이스피싱 탐지, 금융사기 방지, 취약계층 돌봄 서비스 등이 포함되며, 모두 이미 서비스 단계에 있는 사업이라고 회사는 밝혔습니다.\n\n국내 최대 통신사가 AI 윤리·안전성과 관련한 사업을 구체적인 사례로 정리해 공개한 자리로, 국내 AI 신뢰성 논의에서 참고할 수 있는 사례를 보여줍니다.\n\n게시 메타데이터에 표기된 2026년 9월 20일 09:00(한국시간, 원문 기준)을 그대로 표시했습니다.",
          "source": "https://news.sktelecom.com/231074",
          "officialUrl": "https://news.sktelecom.com/231074",
          "verifiedAt": "2026-09-22",
          "slug": "skt-do-the-good-ai-sustainability",
          "tags": [
            "AI",
            "2026-w38",
            "SK텔레콤",
            "Korea"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/ec0c54c9e706.jpg",
            "alt": "SKT, 선한 AI로 지속가능 미래 연결한다 - SK텔레콤 뉴스룸SK텔레콤 뉴스룸"
          },
          "en": {
            "title": "SK Telecom outlines 11 social-value AI initiatives under 'DO THE GOOD AI'",
            "deck": "Voice-phishing detection is among the AI tools already in service",
            "summary": "SK Telecom presented its 'DO THE GOOD AI' strategy at the Korea Social Value Festa, pairing AI competitiveness with trustworthiness and safety, and disclosed 11 AI-based social-value initiatives including voice-phishing detection and financial-fraud prevention.",
            "content": "SK Telecom presented its 'DO THE GOOD AI' strategy at the Korea Social Value Festa. The company said the strategy pairs building AI competitiveness with ensuring AI's trustworthiness and safety, and pursuing sustainable management that contributes positively to society.\n\nAt the event, SK Telecom introduced 11 AI-based social-value initiatives already running in production, including voice-phishing detection, financial-fraud prevention, and care services for vulnerable populations.\n\nAs Korea's largest telecom operator laying out concrete AI-ethics and safety-related initiatives, this gives a reference point for domestic discussion of AI trustworthiness.\n\nThe publisher's stated datePublished, September 20, 2026 at 09:00 (already in KST in the source), is displayed as-is."
          }
        }
      ]
    },
    {
      "name": "Superpowers",
      "color": "#9333EA",
      "posts": [
        {
          "date": "9/19",
          "platform": "Web",
          "title": "superpowers 6.4.1, 세션 진단 스킬과 신규 하네스 지원 추가",
          "deck": "세션 기록을 되짚어 무엇이 잘못됐는지 알려주는 스킬이 생겼습니다",
          "summary": "Claude용 스킬 모음 superpowers가 6.4.1에서 세션 기록을 살펴 무엇이 잘못됐는지 짚어주는 diagnosing-superpowers 스킬을 추가했습니다. executing-plans는 서브에이전트 방식 대신 네이티브 실행으로 다시 짰고 OpenCode 2.0, Muse, Qwen Code 세 하네스 지원도 새로 붙였습니다.",
          "content": "obra의 superpowers가 2026년 9월 19일 6.4.1을 냈습니다. 예정됐던 6.4.0은 실제로 배포되지 않았고, 이번 6.4.1이 관련 변경을 담은 첫 릴리스입니다.\n\n새로 추가된 diagnosing-superpowers 스킬은 세션 기록을 되짚어 어디서 무엇이 잘못됐는지 설명해 줍니다. 기존에 서브에이전트가 개발을 진행하던 executing-plans 스킬은 네이티브 실행 방식으로 다시 짰고, OpenCode 2.0, Muse, Qwen Code 세 가지 에이전트 하네스 지원이 새로 붙었습니다. 다듬는 중인 proving-it-works-with-a-movie 스킬은 이번 릴리스에서 보류하고 이후 버전에서 다시 낼 예정이라고 밝혔습니다. MIT 라이선스이며 별 289,796개를 받았습니다.",
          "source": "https://github.com/obra/superpowers/releases/tag/v6.4.1",
          "officialUrl": "https://github.com/obra/superpowers/releases/tag/v6.4.1",
          "verifiedAt": "2026-09-22",
          "slug": "superpowers-6-4-1",
          "tags": [
            "AI",
            "2026-w38",
            "Superpowers",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/obra/superpowers"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/b6c6c9bffd41.png",
            "alt": "Release v6.4.1 · obra/superpowers"
          },
          "en": {
            "title": "superpowers 6.4.1 adds a session-diagnosis skill and new harness support",
            "deck": "A new skill traces sessions to explain what went wrong",
            "summary": "superpowers v6.4.1 adds a diagnosing-superpowers skill that inspects session transcripts to explain failures, rebuilds executing-plans around native execution, and adds support for three new agent harnesses.",
            "content": "obra's superpowers shipped v6.4.1 on September 19, 2026. The planned v6.4.0 was never actually released, making v6.4.1 the first release carrying these changes.\n\nA new diagnosing-superpowers skill inspects session transcripts to explain what went wrong. The executing-plans skill, which previously had a subagent drive development, has been rebuilt around native execution, and support was added for three new agent harnesses: OpenCode 2.0, Muse, and Qwen Code. A separate proving-it-works-with-a-movie skill is being held back for further cleanup and will return in a later release. The project is MIT-licensed with 289,796 GitHub stars."
          }
        }
      ]
    },
    {
      "name": "TencentCloud",
      "color": "#0052D9",
      "posts": [
        {
          "date": "9/14",
          "platform": "Web",
          "title": "TencentCloud Octop, 멀티에이전트 AI 비서 1.0 정식 출시",
          "deck": "0.9 프리GA를 거쳐 안정 버전에 들어선 셀프호스팅 AI 비서입니다",
          "summary": "TencentCloud가 만든 셀프호스팅 멀티에이전트 AI 비서 Octop이 정식 버전 1.0.0을 냈습니다. 여러 0.9대 프리GA 빌드를 거친 뒤 나온 첫 정식 출시이며, 로그인 화면 문구를 바꾸고 백업·음성 인식 관련 문제를 고쳤습니다.",
          "content": "TencentCloud가 개발한 Octop이 2026년 9월 14일 정식 버전 1.0.0을 내놓았습니다. Octop은 여러 사용자가 함께 쓰는 멀티에이전트 AI 비서를 직접 서버에 설치해 운영하는 오픈소스 프로젝트로, 이번 릴리스는 여러 차례의 0.9대 프리GA 빌드를 거친 뒤 나온 첫 정식(GA) 버전입니다.\n\n이번 버전에서는 업데이트 확인 기본값을 안정 버전만 보도록 바꾸고, 원하면 프리릴리스까지 포함해서 확인할 수 있는 옵션을 추가했습니다. 로그인 화면과 브라우저 탭 제목에 쓰이던 문구도 새로 다듬었습니다.\n\n수정 항목으로는 백업 목록이 대용량 아카이브를 다룰 때마다 tar 파일 전체를 다시 스캔하던 문제를 없앴고, 텐센트 클라우드 음성 인식이 실패했을 때 뜨는 안내 문구를 중국어 화면 기준으로 현지화했습니다. 프로젝트는 MIT 라이선스로 공개되어 있고, 깃허브에서 4,532개의 별을 받은 상태입니다.\n\n다운로드 페이지에는 윈도우용 데스크톱 설치 파일이 64비트와 ARM64 두 가지 아키텍처로 준비되어 있어, 자신의 컴퓨터 구조에 맞는 쪽을 받으면 됩니다.\n\n새로 바뀐 로그인 화면 문구는 '당신을 이해하고 돕고 함께 성장하는 지능형 동반자'라는 뜻의 중국어 슬로건입니다.",
          "source": "https://github.com/TencentCloud/Octop/releases/tag/v1.0.0",
          "officialUrl": "https://github.com/TencentCloud/Octop/releases/tag/v1.0.0",
          "verifiedAt": "2026-09-22",
          "slug": "octop-1-0-0-ga",
          "tags": [
            "AI",
            "2026-w38",
            "TencentCloud",
            "Agents"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/TencentCloud/Octop"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/0932148fc59c.png",
            "alt": "Release v1.0.0 · TencentCloud/Octop"
          },
          "en": {
            "title": "TencentCloud's Octop reaches its 1.0 multi-agent AI assistant release",
            "deck": "Its first stable release after a run of 0.9.x pre-GA builds",
            "summary": "TencentCloud's self-hosted, multi-user multi-agent AI assistant Octop reached its 1.0.0 general-availability release, its first stable build after a run of 0.9.x pre-GA versions. The update fixes a backup-scanning performance issue and localizes a Chinese-language error message.",
            "content": "TencentCloud's Octop reached version 1.0.0 on September 14, 2026. Octop is an open-source, self-hosted multi-agent AI assistant that teams run on their own servers, and this release is the project's first general-availability (GA) build after a series of 0.9.x pre-GA builds.\n\nThe update-check default now looks only at stable releases, with an option to include pre-releases if you want them. The login screen and browser-tab title copy were also refreshed.\n\nOn the fix side, the backup list no longer rescans an entire tar archive every time it handles a large backup, and the error message shown when Tencent Cloud's speech recognition fails has been localized for the Chinese-language interface. The project is released under the MIT license and has 4,532 stars on GitHub.\n\nThe download page offers Windows desktop installers for both 64-bit and ARM64 architectures, so users can pick the one matching their machine.\n\nThe new login-screen copy is a Chinese-language slogan that translates roughly to \"the intelligent companion that understands you, helps you, and grows with you.\""
          }
        }
      ]
    },
    {
      "name": "TradingAgents",
      "color": "#0F766E",
      "posts": [
        {
          "date": "9/18",
          "platform": "Web",
          "title": "TradingAgents 0.5, 백테스트 데이터 시점 왜곡 차단",
          "deck": "미래 정보가 과거 판단에 섞이지 않도록 시점을 고정합니다",
          "summary": "멀티에이전트 트레이딩 프레임워크 TradingAgents가 0.5.0에서 백테스트 전 과정에 시점 고정을 적용했습니다. SEC EDGAR 재무 데이터를 원래 신고 시점 그대로 제공하고 내부자 신고·예측 시장 데이터도 날짜 범위를 제한해 미래 정보가 과거 판단에 섞이지 않게 했습니다.",
          "content": "TauricResearch의 TradingAgents가 2026년 9월 18일 0.5.0을 냈습니다. 이번 버전은 프레임워크 전체의 날짜가 들어가는 경로에 시점 무결성(point-in-time integrity)을 적용해, 특정 시점을 기준으로 그 시점에 알 수 있었던 정보만 보이도록 만드는 데 초점을 맞췄습니다.\n\n별도 API 키 없이 쓸 수 있는 SEC EDGAR 재무 데이터를 신고 당시 원문 그대로 제공하고, 내부자 신고와 예측 시장 데이터도 조회 날짜 범위를 제한했습니다. 이렇게 하면 과거 특정 날짜를 기준으로 백테스트를 돌릴 때 그 이후에 나온 정보가 끼어들어 결과를 부풀리는 문제를 막을 수 있습니다. Apache-2.0 라이선스이며 별 107,997개를 받았습니다.",
          "source": "https://github.com/TauricResearch/TradingAgents/releases/tag/v0.5.0",
          "officialUrl": "https://github.com/TauricResearch/TradingAgents/releases/tag/v0.5.0",
          "verifiedAt": "2026-09-22",
          "slug": "tradingagents-0-5-0",
          "tags": [
            "AI",
            "2026-w38",
            "TradingAgents",
            "Agents"
          ],
          "backupUrls": [
            {
              "label": "repo homepage",
              "url": "https://github.com/TauricResearch/TradingAgents"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/4383e600011e.png",
            "alt": "Release TradingAgents v0.5.0 · TauricResearch/TradingAgents"
          },
          "en": {
            "title": "TradingAgents 0.5 blocks future data from leaking into backtests",
            "deck": "Backtests can no longer see information from the future",
            "summary": "TradingAgents v0.5.0 applies point-in-time data integrity across the framework, serving SEC EDGAR fundamentals as originally filed and date-bounding insider and prediction-market data so backtests cannot see future information.",
            "content": "TauricResearch's TradingAgents shipped v0.5.0 on September 18, 2026, focused on applying point-in-time integrity across every dated path in the framework, so that a given historical date only shows information that would have actually been available at that time.\n\nKeyless, opt-in SEC EDGAR fundamentals are now served exactly as originally filed, and insider-filing and prediction-market data are date-bounded as well. This is meant to stop backtests run against a past date from being contaminated by information that only appeared later. The project is Apache-2.0 licensed with 107,997 GitHub stars."
          }
        }
      ]
    },
    {
      "name": "TypeSafe AI",
      "color": "#F97316",
      "posts": [
        {
          "date": "9/15",
          "platform": "Web",
          "title": "TypeSafe AI, 신속 판정 모델 Jev 공개",
          "deck": "모호한 질문을 구조화된 확률로 바꿔 에이전트 결과를 검증합니다",
          "summary": "TypeSafe AI가 새 모델 Jev를 공개했습니다. 모호한 질문과 요구사항을 구조화된 확률로 빠르고 저렴하게 바꿔, AI 에이전트가 내놓은 결과물을 검증하는 데 쓸 수 있도록 설계했습니다.",
          "content": "TypeSafe AI가 System One Models와 함께 새 모델 Jev를 발표했습니다.\n\n회사 설명에 따르면 Jev는 모호한 질문이나 요구사항을 구조화된 확률로 바꾸는 모델입니다. 이 과정을 빠르고 저렴하게 처리해, AI 에이전트가 만든 결과물을 사람 대신 빠르게 점검하는 용도로 쓸 수 있다고 밝혔습니다.\n\n공식 블로그 공개 시점은 9월 15일이며, Every.to의 Vibe Check 코너와 TestingCatalog가 후속 보도로 이를 다뤘습니다. 구체적인 벤치마크 수치나 가격 정책은 이번 발표 범위에 포함되지 않았습니다.",
          "source": "https://typesafe.ai/blog/introducing-system-one-models-and-jev",
          "officialUrl": "https://typesafe.ai/blog/introducing-system-one-models-and-jev",
          "verifiedAt": "2026-09-22",
          "slug": "typesafe-ai-jev-launch",
          "tags": [
            "AI",
            "2026-w38",
            "TypeSafe AI",
            "Models"
          ],
          "backupUrls": [
            {
              "label": "Every.to Vibe Check 보도",
              "url": "https://every.to/vibe-check/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds"
            },
            {
              "label": "TestingCatalog 보도",
              "url": "https://www.testingcatalog.com/icymtypesafe-ai-launches-jev-for-structured-ai-decisions/"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/939d90974970.png",
            "alt": "Introducing System One Models & Jev - TypeSafe AI Blog"
          },
          "en": {
            "title": "TypeSafe AI unveils Jev, a fast-judgment model",
            "deck": "Turns fuzzy questions into structured probabilities to check agent work",
            "summary": "TypeSafe AI introduced Jev, a new model designed to convert fuzzy questions and requirements into structured probabilities quickly and cheaply, so it can check an AI agent's output.",
            "content": "TypeSafe AI announced a new model called Jev alongside its System One Models.\n\nAccording to the company, Jev turns fuzzy questions or requirements into structured probabilities. It says this happens quickly and cheaply enough to serve as a fast check on output produced by AI agents, in place of manual review.\n\nThe official blog post was published on September 15, with follow-up coverage from Every.to's Vibe Check column and TestingCatalog. Specific benchmark figures or pricing were not included in the announcement."
          }
        }
      ]
    },
    {
      "name": "Vercel",
      "color": "#000000",
      "posts": [
        {
          "date": "9/18",
          "platform": "Web",
          "title": "Vercel, 지출 관리 기능 엔터프라이즈 요금제로 확대",
          "deck": "예산 초과 시 배포를 자동으로 멈출 수 있습니다",
          "summary": "Vercel이 지출 관리(Spend Management) 기능을 엔터프라이즈 Flexible Commitment 요금제까지 확대했습니다. 예산과 이메일·웹훅 알림을 설정하고, 필요하면 프로덕션 배포를 자동으로 멈추는 옵션도 고를 수 있습니다.",
          "content": "Vercel이 자사 체인지로그를 통해 지출 관리(Spend Management) 기능을 엔터프라이즈 Flexible Commitment 요금제 고객까지 확대했다고 밝혔습니다. 기존에는 지원되지 않던 요금제 구간에도 예산 관리 도구가 열린 것입니다.\n\n이 기능을 켜면 팀은 지출 예산을 설정하고, 예산에 다가서거나 초과했을 때 이메일과 웹훅으로 알림을 받을 수 있습니다. 원한다면 예산 초과 시 프로덕션 배포를 자동으로 멈추는 옵션도 선택할 수 있어, 예상치 못한 과금을 사전에 막는 안전장치로 쓸 수 있습니다.",
          "source": "https://vercel.com/changelog",
          "officialUrl": "https://vercel.com/changelog",
          "verifiedAt": "2026-09-22",
          "slug": "vercel-spend-management-enterprise-flexible",
          "tags": [
            "AI",
            "2026-w38",
            "Vercel",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/6e693b1d6d79.png",
            "alt": "Changelog - Vercel"
          },
          "en": {
            "title": "Vercel extends Spend Management to Enterprise Flexible Commitment plans",
            "deck": "Teams can now pause production deploys automatically past a budget",
            "summary": "Vercel's own changelog says Spend Management now covers Enterprise Flexible Commitment plans, letting teams set budgets with email and webhook alerts, and optionally pause production deployments when a budget is exceeded.",
            "content": "Vercel's changelog said Spend Management now extends to Enterprise teams on Flexible Commitment plans, a pricing tier that previously did not support the budget tool.\n\nWith it enabled, teams can set a spending budget and receive email and webhook alerts as they approach or exceed it. They can also choose to have production deployments automatically paused once the budget is exceeded, giving teams a safeguard against unexpected charges."
          }
        }
      ]
    },
    {
      "name": "xAI",
      "color": "#111111",
      "posts": [
        {
          "date": "9/18",
          "platform": "Web",
          "title": "xAI, 음성 인식 모델 Grok Voice Transcribe 2.0 공개",
          "deck": "이전 버전보다 정확도와 비용 효율을 높였다고 밝혔습니다",
          "summary": "xAI가 새로운 음성 인식 모델 Grok Voice Transcribe 2.0을 공개했습니다. 회사는 이전 버전보다 정확도와 비용 효율이 뛰어나다고 설명했습니다.",
          "content": "xAI가 음성을 텍스트로 바꾸는 새 모델 Grok Voice Transcribe 2.0을 출시했습니다.\n\n회사는 이전 버전과 비교해 정확도와 비용 효율 면에서 앞선다고 설명했습니다. 구체적인 벤치마크 수치는 이번 발표문에 포함되지 않았으며, 이는 xAI가 밝힌 자체 평가입니다.\n\n이 모델은 xAI의 음성 인식 라인업을 잇는 후속 버전으로 공개됐습니다.",
          "source": "https://x.ai/news/grok-voice-transcribe-2",
          "officialUrl": "https://x.ai/news/grok-voice-transcribe-2",
          "verifiedAt": "2026-09-22",
          "slug": "grok-voice-transcribe-2",
          "tags": [
            "AI",
            "2026-w38",
            "xAI",
            "Voice"
          ],
          "backupUrls": [
            {
              "label": "TestingCatalog 보도",
              "url": "https://www.testingcatalog.com/spacexai-says-grok-voice-transcribe-2-doubles-accuracy/"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/ce5bc80f837d.webp",
            "alt": "Introducing Grok Voice Transcribe 2.0"
          },
          "en": {
            "title": "xAI introduces speech-to-text model Grok Voice Transcribe 2.0",
            "deck": "The company says accuracy and cost efficiency both improved",
            "summary": "xAI released Grok Voice Transcribe 2.0, a new speech-to-text model the company says delivers better accuracy and cost efficiency than its predecessor.",
            "content": "xAI launched Grok Voice Transcribe 2.0, a new speech-to-text model.\n\nThe company said it improves on accuracy and cost efficiency compared with the previous version. Specific benchmark figures were not included in the announcement, and this is xAI's own stated assessment.\n\nThe model was introduced as the next version in xAI's speech-recognition lineup."
          }
        },
        {
          "date": "9/16",
          "platform": "Web",
          "title": "xAI, 코딩 도구 Grok Build에 메모리 기능 추가",
          "deck": "세션이 끝나면 규칙과 결정을 기록해 다음 작업에 불러옵니다",
          "summary": "xAI가 코딩 어시스턴트 Grok Build에 지속되는 메모리 기능을 추가했습니다. 매 턴이 끝나면 백그라운드에서 내용을 검토해 관례와 결정, 프로젝트 정보를 기록하고, 이후 세션이 관련 코드를 건드리기 전에 이를 불러옵니다.",
          "content": "xAI가 코딩 어시스턴트 Grok Build에 세션 간 지속되는 메모리 기능을 추가했습니다.\n\n이제 Grok Build는 관례, 결정 사항, 프로젝트 정보를 세션을 넘어 이어갑니다. 매 턴이 끝나면 백그라운드에서 그 내용을 검토해 지속적인 메모를 기록하고, 이후 세션은 관련 코드를 건드리기 전에 그 메모를 먼저 읽습니다.\n\n이 과정은 현재 진행 중인 세션을 방해하지 않고 백그라운드에서 이뤄진다고 xAI는 설명했습니다.",
          "source": "https://x.ai/news/grok-build-memory",
          "officialUrl": "https://x.ai/news/grok-build-memory",
          "verifiedAt": "2026-09-22",
          "slug": "grok-build-memory-across-sessions",
          "tags": [
            "AI",
            "2026-w38",
            "xAI",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "TestingCatalog 보도",
              "url": "https://www.testingcatalog.com/icyimi-grok-build-adds-memory-across-coding-sessions/"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/4aba0dda70da.webp",
            "alt": "Memory in Grok Build"
          },
          "en": {
            "title": "xAI adds persistent memory to coding tool Grok Build",
            "deck": "Notes from finished turns get read back before related edits",
            "summary": "xAI added persistent memory to its Grok Build coding assistant. After each turn, Grok reviews it in the background and records notes on conventions, decisions, and project facts, which later sessions read before touching related code.",
            "content": "xAI added memory that persists across sessions to its Grok Build coding assistant.\n\nGrok Build now carries conventions, decisions, and project facts across sessions. After each completed turn, it reviews the turn in the background and records durable notes, which later sessions read before touching related code.\n\nxAI said this happens in the background without interrupting the session currently in progress."
          }
        }
      ]
    },
    {
      "name": "Xiaomi",
      "color": "#FF6900",
      "posts": [
        {
          "date": "9/18",
          "platform": "Web",
          "title": "샤오미 MiMo팀, 코드 저장소로 코딩 에이전트 학습 환경 자동 생성",
          "deck": "이슈 트래커 없이 코드 자체에서 학습 문제를 자동으로 만듭니다",
          "summary": "샤오미 MiMo팀 소속으로 보이는 연구진이 이슈 트래커나 커밋 기록 없이 오픈소스 코드 저장소 자체에서 코딩 에이전트용 강화학습 문제를 자동으로 만드는 CodeMidas를 논문으로 공개했습니다. 이렇게 만든 5,545개 과제로 MiMo-V2.5를 학습시키자 다섯 개 코딩 벤치마크 모두에서 점수가 올랐습니다.",
          "content": "CodeMidas를 소개하는 논문이 2026년 9월 18일 공개됐습니다. 저자들은 논문에서 자체 모델 'MiMo-V2.5'를 언급하는데, MiMo는 샤오미의 언어모델 브랜드로 이 표기를 근거로 샤오미 MiMo팀 연구로 정리했습니다. 다만 논문 자체에 소속을 명시한 각주는 없어 소속 표기는 논문 내용을 통해 추정한 것입니다.\n\nCodeMidas는 이슈 트래커나 커밋 기록에 기대지 않고, 3,185개의 오픈소스 코드 저장소에서 곧바로 코딩 에이전트용 강화학습 훈련 환경을 만들어내는 에이전트 파이프라인입니다. 이렇게 만들어진 5,545개 과제로 MiMo-V2.5를 GRPO 방식으로 학습시킨 결과, 다섯 개 코딩 벤치마크 전부에서 성능이 올랐다고 보고합니다. 이슈 수정 벤치마크인 DeepSWE에서 11.7퍼센트포인트, 프로그램 전체 작성 벤치마크 ProgramBench에서 17퍼센트포인트, 터미널 작업 벤치마크 Terminal-Bench v2.1에서 8.5퍼센트포인트가 올랐다고 밝혔습니다.\n\n이 향상 폭은 MiMo-V2.5라는 특정 모델과 이 다섯 벤치마크에서 나온 것으로, 다른 모델에 CodeMidas 데이터를 적용해도 같은 폭으로 오른다는 것을 보여주지는 않습니다.",
          "source": "https://arxiv.org/abs/2609.22068",
          "officialUrl": "https://arxiv.org/abs/2609.22068",
          "verifiedAt": "2026-09-22",
          "slug": "xiaomi-mimo-codemidas",
          "tags": [
            "AI",
            "2026-w38",
            "Xiaomi",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face daily papers listing",
              "url": "https://huggingface.co/papers/2609.22068"
            }
          ],
          "en": {
            "title": "Xiaomi's MiMo team turns code repos directly into RL training tasks",
            "deck": "Training tasks are generated straight from code, no issue tracker needed",
            "summary": "A paper attributed to Xiaomi's MiMo team (based on the authors' self-referenced MiMo-V2.5 model rather than an explicit affiliation footnote) introduces CodeMidas, which turns open-source code directly into RL training tasks and reports gains across five coding benchmarks.",
            "content": "A paper introducing CodeMidas was published on September 18, 2026. The authors' abstract refers to their own model as \"MiMo-V2.5,\" and since MiMo is Xiaomi's LLM brand, this report attributes the work to Xiaomi's MiMo team on that basis; the paper itself carries no explicit affiliation footnote, so the attribution is inferred rather than stated outright.\n\nCodeMidas is an agentic pipeline that turns open-source codebases directly into reinforcement-learning training environments for coding agents, without relying on issue trackers or commit histories. Training MiMo-V2.5 with GRPO on the resulting 5,545-task dataset, drawn from 3,185 codebases, reportedly improves performance across all five coding benchmarks tested: +11.7 points on the issue-repair benchmark DeepSWE, +17 points on the whole-program-construction benchmark ProgramBench, and +8.5 points on the terminal-work benchmark Terminal-Bench v2.1.\n\nThese gains are specific to the MiMo-V2.5 model and these five benchmarks, and do not show that applying CodeMidas data to other models would produce the same-sized improvement."
          }
        }
      ]
    }
  ]
};
