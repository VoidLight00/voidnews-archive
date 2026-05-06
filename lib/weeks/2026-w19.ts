import type { WeeklyData } from "../data";

export const week19: WeeklyData = {
  "week": 19,
  "year": 2026,
  "slug": "2026-w19",
  "period": "5/04 ~ 5/10",
  "totalPosts": 12,
  "companies": [
    {
      "name": "Anthropic / Claude",
      "color": "#E87040",
      "posts": [
        {
          "date": "5/05",
          "platform": "X",
          "title": "Anthropic Claude Financial Services Agents — 10개 분석가 워크플로우 템플릿 패키징",
          "summary": "Pitch builder, Meeting preparer, Earnings reviewer, Model builder, Market researcher, Valuation reviewer, GL reconciler, Month-end closer, Statement auditor, KYC screener — 10개 reference architecture(skills + connectors + subagents)를 Claude Code 플러그인 또는 Managed Agent로 배포. Excel→PowerPoint→Outlook 전 흐름이 single context로 연결. 월스트리트 1년차 analyst grunt work를 24/7 자동화.",
          "content": "이게 뭐예요?\nAnthropic이 금융권을 위한 Claude Financial Services Agents를 발표했습니다. Pitch builder, Earnings reviewer, Market researcher, KYC screener처럼 금융 분석가가 반복하는 10개 업무 흐름을 Skills, connectors, subagents 구조로 패키징한 것입니다.\n\n왜 중요해요?\n이번 회차의 핵심입니다. AI가 단순히 질문에 답하는 단계가 아니라 '직무 단위 워크플로우'를 제품처럼 묶기 시작했습니다. 수강생에게는 앞으로 AI 교육도 '프롬프트 몇 개'가 아니라 '내 직무를 어떤 에이전트 묶음으로 재설계할 것인가'로 바뀐다는 신호입니다.\n\n오늘 바로 해볼 것\n본인 업무를 10개 반복 흐름으로 쪼개보세요. 예를 들어 강사는 강의안 작성, 예제 제작, 과제 피드백, 홍보 문안, 수강생 Q&A처럼 나눌 수 있습니다. Anthropic의 금융 예시는 다른 직무에도 그대로 이식할 수 있는 템플릿입니다.",
          "source": "https://www.anthropic.com/news/finance-agents",
          "officialUrl": "https://www.anthropic.com/news/finance-agents",
          "backupUrls": [
            {
              "label": "X 원문",
              "url": "https://x.com/claudeai/status/2051679629488865498"
            },
            {
              "label": "claude.com",
              "url": "https://claude.com/solutions/financial-services#finance-agents"
            },
            {
              "label": "fortune.com",
              "url": "https://fortune.com/2026/05/05/anthropic-wall-street-financial-services-agents-jamie-dimon/"
            },
            {
              "label": "theregister.com",
              "url": "https://www.theregister.com/2026/05/05/anthropic_unleashes_finance_agents_claude/"
            }
          ],
          "tags": [
            "에이전트자동화",
            "공식",
            "anthropic"
          ],
          "featured": true
        }
      ]
    },
    {
      "name": "Google / DeepMind",
      "color": "#4285F4",
      "posts": [
        {
          "date": "5/04",
          "platform": "X",
          "title": "Project Mariner discontinued — 24/7 Gemini Agent로 흡수",
          "summary": "Google IO 2024 발표 웹브라우징 에이전트 Project Mariner가 2026-05-04 정식 discontinued. 핵심 인력·기능은 Gemini 3 Pro/Flash의 Computer Use와 Gemini Agent 제품으로 흡수 — 'Computer Use' 기능이 별도 프로토타입에서 메인 모델 내장으로 전환되는 구조 변화.",
          "content": "이게 뭐예요?\nGoogle IO 2024 발표 웹브라우징 에이전트 Project Mariner가 2026-05-04 정식 discontinued. 핵심 인력·기능은 Gemini 3 Pro/Flash의 Computer Use와 Gemini Agent 제품으로 흡수 — 'Computer Use' 기능이 별도 프로토타입에서 메인 모델 내장으로 전환되는 구조 변화.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 도구릴리스 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\nWikipedia 페이지가 명시적으로 'Project Mariner was discontinued on May 4, 2026' 기재. 영상은 'shutdown'으로 표현하지만 실제로는 후속 Gemini Agent로 통합 evolution.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://en.wikipedia.org/wiki/Project_Mariner",
          "officialUrl": "https://en.wikipedia.org/wiki/Project_Mariner",
          "backupUrls": [
            {
              "label": "Google 공식",
              "url": "https://deepmind.google/models/project-mariner/"
            },
            {
              "label": "thenextweb.com",
              "url": "https://thenextweb.com/news/google-cloud-next-ai-agents-agentic-era"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "google"
          ]
        },
        {
          "date": "5/05",
          "platform": "X",
          "title": "Pomelli Catalogs — 제품 URL 일괄 입력으로 캠페인·AI 포토슛 자동 생성",
          "summary": "Google Labs Pomelli이 Catalogs 출시 — 매장 URL 한 번으로 전체 인벤토리를 ingest, 제품별 맞춤 마케팅 캠페인 + Nano Banana 기반 스튜디오급 product photoshoot 자동 생성. 글로벌 무료. SMB 대상 'free growth lever' 포지셔닝.",
          "content": "이게 뭐예요?\nGoogle Labs Pomelli이 Catalogs 출시 — 매장 URL 한 번으로 전체 인벤토리를 ingest, 제품별 맞춤 마케팅 캠페인 + Nano Banana 기반 스튜디오급 product photoshoot 자동 생성. 글로벌 무료. SMB 대상 'free growth lever' 포지셔닝.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 워크플로우 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\nPhotoshoot 기능은 2026-02 선공개. 이번 업데이트는 Catalogs 추가가 핵심. 미국·캐나다·호주·뉴질랜드·EEA·UK·스위스 가용. testingcatalog가 사전 leak.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://x.com/PomelliByGoogle/status/2051693177053340073",
          "officialUrl": "https://x.com/PomelliByGoogle/status/2051693177053340073",
          "backupUrls": [
            {
              "label": "Google 공식",
              "url": "https://blog.google/innovation-and-ai/models-and-research/google-labs/pomelli-photoshoot/"
            },
            {
              "label": "TestingCatalog",
              "url": "https://www.testingcatalog.com/google-tests-catalog-and-website-generation-for-pomelli-experiment/"
            },
            {
              "label": "Google 공식",
              "url": "https://labs.google.com/pomelli/about"
            }
          ],
          "tags": [
            "워크플로우",
            "공식",
            "google"
          ]
        },
        {
          "date": "5/05",
          "platform": "X",
          "title": "NotebookLM Mind Maps 업데이트 — 커스텀 프롬프트, 이름 변경/공유, 부드러운 노드 전환",
          "summary": "Mind Map 3대 업그레이드 — (1) 사용자 프롬프트로 맵 방향 조정, (2) 인스턴트 rename·share, (3) 노드 간 매끄러운 transition. 단순 시각화에서 'interactive thinking surface'로 격상.",
          "content": "이게 뭐예요?\nMind Map 3대 업그레이드 — (1) 사용자 프롬프트로 맵 방향 조정, (2) 인스턴트 rename·share, (3) 노드 간 매끄러운 transition. 단순 시각화에서 'interactive thinking surface'로 격상.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 워크플로우 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\n공식 NotebookLM X 계정이 1차 출처. 동시기에 Play Books 소스 통합 테스트도 진행 중(testingcatalog 보도).\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://x.com/NotebookLM/status/2051715594697977870",
          "officialUrl": "https://x.com/NotebookLM/status/2051715594697977870",
          "backupUrls": [
            {
              "label": "Google 공식",
              "url": "https://support.google.com/notebooklm/answer/16070070"
            },
            {
              "label": "jetstream.blog",
              "url": "https://jetstream.blog/2026/05/06/google-notebooklm-mind-map-major-power-up/"
            }
          ],
          "tags": [
            "워크플로우",
            "공식",
            "google"
          ]
        },
        {
          "date": "5/05",
          "platform": "X",
          "title": "Google AI Studio — Nano Banana 통합 + 비주얼 에디트 툴 리디자인",
          "summary": "AI Studio에서 앱을 빌드하는 동안 Nano Banana(Gemini 2.5/3 Image)가 자동으로 커스텀 이미지 에셋을 생성·삽입. 새 비주얼 에디트 툴은 컴포넌트 업데이트, 앱 어노테이션, 에셋 실시간 swap을 지원 — 'code-first'에서 'visual-first AI dev environment'로 전환.",
          "content": "이게 뭐예요?\nAI Studio에서 앱을 빌드하는 동안 Nano Banana(Gemini 2.5/3 Image)가 자동으로 커스텀 이미지 에셋을 생성·삽입. 새 비주얼 에디트 툴은 컴포넌트 업데이트, 앱 어노테이션, 에셋 실시간 swap을 지원 — 'code-first'에서 'visual-first AI dev environment'로 전환.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 워크플로우 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\nNano Banana 자체는 2025-08 공개된 Gemini 2.5 Flash Image. 이번 업데이트는 AI Studio 안에서의 통합·UX 강화. 영상 description의 GoogleAIStudio X 링크가 1차 출처.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://x.com/GoogleAIStudio/status/2051679127824998762",
          "officialUrl": "https://x.com/GoogleAIStudio/status/2051679127824998762",
          "backupUrls": [
            {
              "label": "Google 공식",
              "url": "https://deepmind.google/models/gemini-image/"
            },
            {
              "label": "Google 공식",
              "url": "https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/"
            }
          ],
          "tags": [
            "워크플로우",
            "공식",
            "google"
          ]
        },
        {
          "date": "5/05",
          "platform": "X",
          "title": "Gemma 4 Multi-Token Prediction (MTP) drafters — 추론 최대 3배 가속",
          "summary": "Gemma 4 패밀리에 MTP drafter 추가 — 경량 drafter가 미래 토큰을 병렬 예측하고 target 모델이 단일 forward pass로 검증하는 speculative decoding. KV 캐시 공유로 컨텍스트 재계산 제거. 출력 품질 손실 0, 최대 3배 속도. Apache 2.0 라이선스 유지, HuggingFace/Kaggle 가중치 + transformers/MLX/vLLM/SGLang/Ollama 지원.",
          "content": "이게 뭐예요?\nGemma 4 패밀리에 MTP drafter 추가 — 경량 drafter가 미래 토큰을 병렬 예측하고 target 모델이 단일 forward pass로 검증하는 speculative decoding. KV 캐시 공유로 컨텍스트 재계산 제거. 출력 품질 손실 0, 최대 3배 속도. Apache 2.0 라이선스 유지, HuggingFace/Kaggle 가중치 + transformers/MLX/vLLM/SGLang/Ollama 지원.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 도구릴리스 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\nEdge용 E2B/E4B 모델은 embedder 클러스터링 추가 가속. on-device·실시간 음성 응용에 직접 효과. dense 모델에서 효과 큼, 26B MoE는 batch 1에서 제한적이라는 외부 분석도 존재.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/",
          "officialUrl": "https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/",
          "backupUrls": [
            {
              "label": "Google 공식",
              "url": "https://ai.google.dev/gemma/docs/mtp/mtp"
            },
            {
              "label": "X 원문",
              "url": "https://x.com/googleaidevs/status/2051694573798224039"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "google"
          ]
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "5/05",
          "platform": "X",
          "title": "OpenAI GPT-5.5 Instant — ChatGPT 신규 기본 모델로 롤아웃",
          "summary": "영국 AI Security Institute(AISI) 공식 평가 — GPT-5.5가 Expert 난이도 사이버 태스크에서 71.4% 통과율로 Claude Mythos Preview(68.6%)를 처음으로 추월. 32-step 'The Last Ones' 엔드투엔드 시뮬레이션을 완수한 두 번째 모델(GPT-5.5는 10회 중 2회, Mythos는 10회 중 3회). rust_vm 리버스엔지니어링 태스크는 GPT-5.5가 11분·$1.73에 풂 — 인간 전문가는 약 12시간 소요.",
          "content": "이게 뭐예요?\nOpenAI가 GPT-5.5 Instant를 ChatGPT의 새 기본 모델로 롤아웃했다는 소식입니다. 사용자가 별도 설정을 의식하지 않아도, 같은 ChatGPT가 이전보다 다른 품질과 성향으로 응답할 수 있다는 뜻입니다.\n\n왜 중요해요?\n수강생이 가장 체감하기 쉬운 변화입니다. 어제 만든 프롬프트가 오늘 다르게 작동할 수 있고, 기본 모델 교체는 교육 자료·업무 자동화·코딩 워크플로우 전체에 영향을 줍니다.\n\n오늘 바로 해볼 것\n자주 쓰는 프롬프트 3개를 다시 실행해 보세요. 답변 길이, 추론 방식, 환각 감소, 개인화 정도가 어떻게 바뀌었는지 비교하면 모델 업데이트의 실제 체감을 잡을 수 있습니다.",
          "source": "https://openai.com/index/gpt-5-5-instant/",
          "officialUrl": "https://openai.com/index/gpt-5-5-instant/",
          "backupUrls": [
            {
              "label": "TechCrunch",
              "url": "https://techcrunch.com/2026/05/05/openai-releases-gpt-5-5-instant-a-new-default-model-for-chatgpt/"
            },
            {
              "label": "the-decoder.com",
              "url": "https://the-decoder.com/chatgpt-update-rolls-out-gpt-5-5-instant-with-fewer-hallucinations-and-more-personalized-answers/"
            },
            {
              "label": "X 원문",
              "url": "https://x.com/OpenAI/status/2051709033414025647"
            },
            {
              "label": "x.ai",
              "url": "https://x.ai/api"
            },
            {
              "label": "artificialanalysis.ai",
              "url": "https://artificialanalysis.ai/articles/xai-launches-grok-4-3-with-improved-agentic-performance-and-lower-pricing"
            },
            {
              "label": "venturebeat.com",
              "url": "https://venturebeat.com/technology/xai-launches-grok-4-3-at-an-aggressively-low-price-and-a-new-fast-powerful-voice-cloning-suite"
            },
            {
              "label": "docs.x.ai",
              "url": "https://docs.x.ai/developers/models"
            },
            {
              "label": "aisi.gov.uk",
              "url": "https://www.aisi.gov.uk/blog/our-evaluation-of-openais-gpt-5-5-cyber-capabilities"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "openai",
            "community",
            "anthropic"
          ],
          "featured": true
        }
      ]
    },
    {
      "name": "커뮤니티 / 오픈소스",
      "color": "#6B7280",
      "posts": [
        {
          "date": "5/04",
          "platform": "X",
          "title": "Jocoletter — 매일 아침 핵심 AI 뉴스 요약 뉴스레터 시작",
          "summary": "주간 영상은 길고 일간 AI 뉴스는 너무 많다는 갭에 맞춰, 매일 아침 핵심만 정리하는 뉴스레터형 AI 정보 서비스로 진입",
          "content": "이게 뭐예요?\n주간 영상은 길고 일간 AI 뉴스는 너무 많다는 갭에 맞춰, 매일 아침 핵심만 정리하는 뉴스레터형 AI 정보 서비스로 진입한 사례입니다.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 수익화사례 흐름에 속합니다. 수강생 입장에서는 AI 뉴스 큐레이션이 영상·뉴스레터·컨설팅으로 묶이는 콘텐츠 비즈니스 확장 사례로 보면 됩니다.\n\n조금 더 풀어보면\n주간 영상과 보완 관계를 만들고, AX 컨설팅·바이브 코딩 부트캠프와 연결되는 자체 콘텐츠 생태계로 확장하는 흐름입니다.\n\n주의·확인 포인트\n커뮤니티 항목입니다. 커뮤니티 기반 항목입니다. 재현성, 라이선스, 유지보수 상태를 직접 확인한 뒤 실무에 쓰는 것이 좋습니다.",
          "source": "https://jocoletter.jocoding.io/",
          "officialUrl": "https://jocoletter.jocoding.io/",
          "tags": [
            "수익화사례",
            "커뮤니티",
            "community"
          ]
        },
        {
          "date": "5/04",
          "platform": "X",
          "title": "대신콜 — AI 에이전트가 회식·예약 전화 대신해 주는 콜비아 베타",
          "summary": "여러 식당에 자동 전화·자리 확인 후 결과만 사용자에게 전달 — '전화 공포'를 가진 사용자에게 AI 에이전트 위임 형 콜비아 서비스",
          "content": "이게 뭐예요?\n여러 식당에 자동 전화·자리 확인 후 결과만 사용자에게 전달 — '전화 공포'를 가진 사용자에게 AI 에이전트 위임 형 콜비아 서비스\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 수익화사례 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\n사전 신청자 초기 크레딧 증정. 친구 통화 대리도 가능\n\n주의·확인 포인트\n커뮤니티 항목입니다. 커뮤니티 기반 항목입니다. 재현성, 라이선스, 유지보수 상태를 직접 확인한 뒤 실무에 쓰는 것이 좋습니다.",
          "source": "https://delegate-call.pages.dev/",
          "officialUrl": "https://delegate-call.pages.dev/",
          "tags": [
            "수익화사례",
            "커뮤니티",
            "community"
          ]
        },
        {
          "date": "5/04",
          "platform": "X",
          "title": "AgentWatch — Claude Code/Codex 에이전트 모니터링 + Apple Watch 알람 솔루션 (출시 임박)",
          "summary": "Claude Code/Codex 실행 중 macOS notch에 상태 표시, 종료 시 스마트폰/Apple Watch 알림. 워치에서 원격 승인, 멀티 에이전트·멀티 세션 동시 조작. 사전 예약자 출시 후 1개월 무료 쿠폰.",
          "content": "이게 뭐예요?\nClaude Code/Codex 실행 중 macOS notch에 상태 표시, 종료 시 스마트폰/Apple Watch 알림. 워치에서 원격 승인, 멀티 에이전트·멀티 세션 동시 조작. 사전 예약자 출시 후 1개월 무료 쿠폰.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 에이전트자동화 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\n커뮤니티 기반 자체 서비스. 대기자 한 달 무료 쿠폰 + 다음 주 출시 예정. WebSocket 릴레이로 데스크탑↔모바일 연결 | Digital Software Solutions, LLC 운영. 공식 사이트는 7일 trial 회원가입 형태입니다. agent-watch.com과 동일 서비스로 추정되나, 운영 주체와 최신 가격은 공식 사이트에서 재확인하는 편이 안전합니다.\n\n주의·확인 포인트\n커뮤니티 항목입니다. 커뮤니티 기반 항목입니다. 재현성, 라이선스, 유지보수 상태를 직접 확인한 뒤 실무에 쓰는 것이 좋습니다.",
          "source": "https://www.agentwatch.tools/",
          "officialUrl": "https://www.agentwatch.tools/",
          "backupUrls": [
            {
              "label": "testflight.apple.com",
              "url": "https://testflight.apple.com/join/4g5V7v6M"
            },
            {
              "label": "agent-watch.com",
              "url": "https://agent-watch.com/"
            }
          ],
          "tags": [
            "에이전트자동화",
            "커뮤니티",
            "community"
          ]
        },
        {
          "date": "5/05",
          "platform": "X",
          "title": "Perplexity Computer for Professional Finance — Morningstar/PitchBook/Daloopa/Carbon Arc 라이선스 데이터 + 35개 금융 워크플로우",
          "summary": "Anthropic 발표와 같은 날 Perplexity가 Computer for Professional Finance 출시 — Morningstar·PitchBook·Daloopa·Carbon Arc 라이선스 데이터를 직접 연결, 35개 finance workflow(tearsheet, equity comparison, annotated chart 등) 내장. Excel 안에서도 작동. AI agents 금융 자동화 경쟁 본격화.",
          "content": "이게 뭐예요?\nAnthropic 발표와 같은 날 Perplexity가 Computer for Professional Finance 출시 — Morningstar·PitchBook·Daloopa·Carbon Arc 라이선스 데이터를 직접 연결, 35개 finance workflow(tearsheet, equity comparison, annotated chart 등) 내장. Excel 안에서도 작동. AI agents 금융 자동화 경쟁 본격화.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 에이전트자동화 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\n영상 description의 perplexity_ai 트윗 ID(2051698428288090213)와 검색결과 ID(2051693893473935372)가 다름 — 동일 launch 보도가 여러 트윗으로 게재. Anthropic vs Perplexity의 동시 launch 타이밍이 핵심 신호.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://x.com/perplexity_ai/status/2051693893473935372",
          "officialUrl": "https://x.com/perplexity_ai/status/2051693893473935372",
          "backupUrls": [
            {
              "label": "perplexity.ai",
              "url": "https://www.perplexity.ai/hub/blog/computer-at-work"
            },
            {
              "label": "perplexity.ai",
              "url": "https://www.perplexity.ai/enterprise/use-cases/finance"
            },
            {
              "label": "trendingtopics.eu",
              "url": "https://www.trendingtopics.eu/anthropic-and-perplexity-race-to-automate-finance-with-ai-tools-shake-up-financial-stocks/"
            }
          ],
          "tags": [
            "에이전트자동화",
            "공식",
            "community"
          ]
        },
        {
          "date": "5/05",
          "platform": "X",
          "title": "Subquadratic 'SubQ' — 12M token 컨텍스트, 풀 sub-quadratic sparse attention 첫 frontier 모델",
          "summary": "Meta 전 Generative AI 헤드 Alex Whedon이 CTO인 Subquadratic이 $29M 시드와 함께 SubQ 공개. SSA(Subquadratic Sparse Attention)로 컨텍스트 길이에 선형 스케일 — 1M 토큰에서 Flash Attention 대비 50배 빠르고 50배 저렴, 12M 토큰에서 컴퓨트 ~1000배 절감 주장. 연구 모델은 12M, 프로덕션 API는 1M 컨텍스트.",
          "content": "이게 뭐예요?\nMeta 전 Generative AI 헤드 Alex Whedon이 CTO인 Subquadratic이 $29M 시드와 함께 SubQ 공개. SSA(Subquadratic Sparse Attention)로 컨텍스트 길이에 선형 스케일 — 1M 토큰에서 Flash Attention 대비 50배 빠르고 50배 저렴, 12M 토큰에서 컴퓨트 ~1000배 절감 주장. 연구 모델은 12M, 프로덕션 API는 1M 컨텍스트.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 도구릴리스 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\n공식 발표일 2026-05-05. 영상은 'sub quadratic' 발음 기준이라 회사명을 SubQ로 부르나 실제 회사명은 Subquadratic, 모델명이 SubQ. SubQ Code(코딩 에이전트) + SubQ Search(딥리서치) 동시 공개. 벤치마크 검증은 진행중 — 일부 외부 평가자는 클레임에 신중 입장.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://subq.ai/introducing-subq",
          "officialUrl": "https://subq.ai/introducing-subq",
          "backupUrls": [
            {
              "label": "siliconangle.com",
              "url": "https://siliconangle.com/2026/05/05/subquadratic-launches-29m-bring-12m-token-context-windows-ai/"
            },
            {
              "label": "thenewstack.io",
              "url": "https://thenewstack.io/subquadratic-12-million-context-window/"
            },
            {
              "label": "subq.ai",
              "url": "https://subq.ai/how-ssa-makes-long-context-practical"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "community"
          ]
        }
      ]
    }
  ]
};
