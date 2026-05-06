import type { WeeklyData } from "../data";

export const week17: WeeklyData = {
  "week": 17,
  "year": 2026,
  "slug": "2026-w17",
  "period": "4/20 ~ 4/26",
  "totalPosts": 8,
  "companies": [
    {
      "name": "Anthropic / Claude",
      "color": "#E87040",
      "posts": [
        {
          "date": "4/23",
          "platform": "X",
          "title": "Anthropic Claude Code Quality 포스트모템 — 3월 4일~4월 20일 3개 변경이 6주간 품질 저하 유발",
          "summary": "(1) 3/4 reasoning effort high→medium 변경, 4/7 원복. (2) 3/26 1시간 idle 세션의 thinking을 매 턴 삭제하는 캐시 버그, 4/10 수정. (3) 4/16 verbosity 축소 system prompt가 코딩 품질 저하, 4/20 원복. v2.1.116으로 모두 해결, 4/23 사용량 한도 리셋.",
          "content": "이게 뭐예요?\n(1) 3/4 reasoning effort high→medium 변경, 4/7 원복. (2) 3/26 1시간 idle 세션의 thinking을 매 턴 삭제하는 캐시 버그, 4/10 수정. (3) 4/16 verbosity 축소 system prompt가 코딩 품질 저하, 4/20 원복. v2.1.116으로 모두 해결, 4/23 사용량 한도 리셋.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 도구릴리스 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\n구독자 입장에서 '클로드가 멍청해진 것 같다'는 체감이 사실로 확인됨. 컴퓨팅 비용 절감 의혹은 추측 단계. Anthropic이 harness/operating instruction 변경이 모델 체감 성능에 직결됨을 공식 인정.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://www.anthropic.com/engineering/april-23-postmortem",
          "officialUrl": "https://www.anthropic.com/engineering/april-23-postmortem",
          "backupUrls": [
            {
              "label": "venturebeat.com",
              "url": "https://venturebeat.com/technology/mystery-solved-anthropic-reveals-changes-to-claudes-harnesses-and-operating-instructions-likely-caused-degradation"
            },
            {
              "label": "fortune.com",
              "url": "https://fortune.com/2026/04/24/anthropic-engineering-missteps-claude-code-performance-decline-user-backlash/"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "anthropic"
          ]
        },
        {
          "date": "4/25",
          "platform": "X",
          "title": "Anthropic Project Deal — Claude가 직원 대신 사내 마켓플레이스에서 협상·매매 (186 deals, $4K+)",
          "summary": "SF 사무실 1주 실험: 각자 $100 예산, Claude가 시스템 프롬프트로 인터뷰해 협상 에이전트 생성. Slack 채널에서 인간 개입 없이 186건 거래·총 $4,000+ 체결. 참가자 절반은 미래에 유료로도 쓰겠다고 응답.",
          "content": "이게 뭐예요?\nSF 사무실 1주 실험: 각자 $100 예산, Claude가 시스템 프롬프트로 인터뷰해 협상 에이전트 생성. Slack 채널에서 인간 개입 없이 186건 거래·총 $4,000+ 체결. 참가자 절반은 미래에 유료로도 쓰겠다고 응답.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 에이전트자동화 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\n결정적 발견: Opus 에이전트가 Haiku보다 평균 2건 더 많은 deal 성사 + 더 좋은 가격. 그런데 사용자는 이 차이를 인지하지 못함('공정해 보였다'). agent-on-agent commerce의 법·정책 프레임 미비 경고.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://www.anthropic.com/features/project-deal",
          "officialUrl": "https://www.anthropic.com/features/project-deal",
          "backupUrls": [
            {
              "label": "X 원문",
              "url": "https://x.com/AnthropicAI/status/2047728360818696302"
            },
            {
              "label": "TechCrunch",
              "url": "https://techcrunch.com/2026/04/25/anthropic-created-a-test-marketplace-for-agent-on-agent-commerce/"
            },
            {
              "label": "unite.ai",
              "url": "https://www.unite.ai/anthropics-project-deal-lets-claude-agents-trade-real-goods/"
            }
          ],
          "tags": [
            "에이전트자동화",
            "공식",
            "anthropic"
          ]
        }
      ]
    },
    {
      "name": "DeepSeek",
      "color": "#2563EB",
      "posts": [
        {
          "date": "4/24",
          "platform": "X",
          "title": "DeepSeek-V4 Preview 오픈소스 공개 — 1.6T MoE / 1M context, V3.2 대비 27% inference FLOPs",
          "summary": "Pro 1.6T(49B active) + Flash 284B(13B active) 둘 다 1M context. CSA+HCA 하이브리드 어텐션으로 1M context에서 V3.2 대비 inference FLOPs 27%, KV cache 10%. Codeforces 1위, BAS-AI 'Open-Weight Vibe Code' 1위. API 75% 할인 이벤트 진행.",
          "content": "이게 뭐예요?\nDeepSeek-V4 Preview는 1.6T MoE와 1M context를 내세운 오픈소스 모델 소식입니다. 초대형 컨텍스트와 MoE 구조로 장문·코딩·에이전트 작업을 겨냥합니다.\n\n왜 중요해요?\n오픈소스 모델이 다시 스케일을 밀어붙이는 흐름입니다. Claude·OpenAI 같은 폐쇄형 모델만 보는 것이 아니라, 로컬·자체 호스팅·비용 최적화 관점에서 오픈 모델의 선택지가 늘어납니다.\n\n오늘 확인할 것\n바로 운영에 넣기보다 라이선스, 실제 벤치마크, 추론 비용, 하드웨어 요구사항을 확인하세요. '오픈소스가 따라왔다'는 메시지는 맞지만, 실사용 난이도는 별도입니다.",
          "source": "https://api-docs.deepseek.com/news/news260424",
          "officialUrl": "https://api-docs.deepseek.com/news/news260424",
          "backupUrls": [
            {
              "label": "Hugging Face",
              "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro"
            },
            {
              "label": "TechCrunch",
              "url": "https://techcrunch.com/2026/04/24/deepseek-previews-new-ai-model-that-closes-the-gap-with-frontier-models/"
            },
            {
              "label": "deepseek.ai",
              "url": "https://deepseek.ai/deepseek-v4"
            },
            {
              "label": "build.nvidia.com",
              "url": "https://build.nvidia.com/models"
            },
            {
              "label": "docs.api.nvidia.com",
              "url": "https://docs.api.nvidia.com/nim/reference/deepseek-ai-deepseek-v4-pro"
            },
            {
              "label": "docs.api.nvidia.com",
              "url": "https://docs.api.nvidia.com/nim/reference/deepseek-ai-deepseek-v4-flash"
            },
            {
              "label": "decodethefuture.org",
              "url": "https://decodethefuture.org/en/nvidia-nim-api-explained/"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "deepseek",
            "nvidia"
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
          "date": "4/24",
          "platform": "X",
          "title": "Google, Anthropic에 최대 $40B 투자 (현금 $10B + 마일스톤 $30B + Cloud 5GW)",
          "summary": "Anthropic 밸류 $350B 기준 즉시 $10B + 성과 달성 시 추가 $30B. 5년간 5GW Google Cloud 컴퓨팅 캡 + Anthropic의 5년 $200B Google Cloud 약정. 투자금이 GCP 매출로 환류되는 구조.",
          "content": "이게 뭐예요?\nAnthropic 밸류 $350B 기준 즉시 $10B + 성과 달성 시 추가 $30B. 5년간 5GW Google Cloud 컴퓨팅 캡 + Anthropic의 5년 $200B Google Cloud 약정. 투자금이 GCP 매출로 환류되는 구조.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 수익화사례 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\nGoogle은 2023년 $3B 투자가 현재 $12B 가치, 2015년 SpaceX $1B 투자가 $107B 가치. '경쟁사 양다리 보험' 전략.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://www.bloomberg.com/news/articles/2026-04-24/google-plans-to-invest-up-to-40-billion-in-anthropic",
          "officialUrl": "https://www.bloomberg.com/news/articles/2026-04-24/google-plans-to-invest-up-to-40-billion-in-anthropic",
          "backupUrls": [
            {
              "label": "TechCrunch",
              "url": "https://techcrunch.com/2026/04/24/google-to-invest-up-to-40b-in-anthropic-in-cash-and-compute/"
            },
            {
              "label": "cnbc.com",
              "url": "https://www.cnbc.com/2026/04/24/google-to-invest-up-to-40-billion-in-anthropic-as-search-giant-spreads-its-ai-bets.html"
            }
          ],
          "tags": [
            "수익화사례",
            "공식",
            "google",
            "anthropic"
          ]
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "4/23",
          "platform": "X",
          "title": "ChatGPT for Clinicians 무료 출시 + HealthBench Professional 벤치마크 공개",
          "summary": "미국 인증 의사·NP·PA·약사에게 무료. Stanford MedHELM·MedMarks 1위, HealthBench Professional 동시 공개로 임상 채팅 평가 표준화 시도.",
          "content": "이게 뭐예요?\nChatGPT for Clinicians 무료 출시와 HealthBench Professional 공개 소식입니다. 의료 현장에서 쓸 수 있는 AI 보조 도구와 그 성능을 평가하는 벤치마크가 함께 나온 흐름입니다.\n\n왜 중요해요?\n의료 AI가 논문이나 데모를 넘어 실제 사용자 입구로 들어오기 시작했습니다. 교육 관점에서는 '전문직 AI'가 금융, 의료처럼 규제가 강한 영역에서도 워크플로우 단위로 들어온다는 점이 중요합니다.\n\n주의할 점\n의료 AI는 진단 책임, 개인정보, 규제 문제가 큽니다. 발표에서는 '의사를 대체'가 아니라 '임상 업무 보조와 평가 체계의 등장'으로 설명하는 것이 안전합니다.",
          "source": "https://openai.com/index/making-chatgpt-better-for-clinicians/",
          "officialUrl": "https://openai.com/index/making-chatgpt-better-for-clinicians/",
          "backupUrls": [
            {
              "label": "fiercehealthcare.com",
              "url": "https://www.fiercehealthcare.com/ai-and-machine-learning/openai-launches-chatgpt-clinicians-free-ai-tool-physicians-nps-and"
            },
            {
              "label": "OpenAI 공식",
              "url": "https://help.openai.com/en/articles/20001202-chatgpt-for-clinicians"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "openai"
          ],
          "featured": true
        }
      ]
    },
    {
      "name": "xAI / Grok",
      "color": "#111827",
      "posts": [
        {
          "date": "4/23",
          "platform": "X",
          "title": "xAI Grok Voice Think Fast 1.0 — τ-voice Bench 67.3% (Gemini/GPT Realtime 추월), Starlink 고객지원 적용",
          "summary": "API 즉시 사용 가능. τ-voice Bench 67.3%(Gemini 3.1 Flash Live 43.8%, GPT Realtime 1.5 35.3% 추월). 백그라운드 reasoning으로 latency 영향 없이 다단계 워크플로우 처리. Starlink +1-888-GO-STARLINK 전화 영업·고객지원 운영, 20% conversion·70% 자율 해결률.",
          "content": "이게 뭐예요?\nAPI 즉시 사용 가능. τ-voice Bench 67.3%(Gemini 3.1 Flash Live 43.8%, GPT Realtime 1.5 35.3% 추월). 백그라운드 reasoning으로 latency 영향 없이 다단계 워크플로우 처리. Starlink +1-888-GO-STARLINK 전화 영업·고객지원 운영, 20% conversion·70% 자율 해결률.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 도구릴리스 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\n$3/시간 단가 언급. 콜센터 대체 시나리오 부각. Retail 78.4, Airlines 61.7, Telecom 73.7 등 도메인별 점수 공개.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://x.ai/news/grok-voice-think-fast-1",
          "officialUrl": "https://x.ai/news/grok-voice-think-fast-1",
          "backupUrls": [
            {
              "label": "marktechpost.com",
              "url": "https://www.marktechpost.com/2026/04/25/xai-launches-grok-voice-think-fast-1-0-topping-%CF%84-voice-bench-at-67-3-outperforming-gemini-gpt-realtime-and-more/"
            },
            {
              "label": "basenor.com",
              "url": "https://www.basenor.com/blogs/news/grok-voice-is-now-running-starlinks-customer-support"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "xai"
          ]
        }
      ]
    },
    {
      "name": "커뮤니티 / 오픈소스",
      "color": "#6B7280",
      "posts": [
        {
          "date": "4/23",
          "platform": "X",
          "title": "Unitree G1 휴머노이드 로봇 — 롤러스케이트·아이스스케이트 시연 / Beijing 하프마라톤 'Lightning' 우승",
          "summary": "Unitree G1: 롤러스케이트/아이스스케이트 + 한 발 회전·앞공중제비. 하프마라톤(Beijing E-Town): Honor 'Lightning'이 50:26으로 인간 세계기록(57:20) 추월. MirrorMe Bolt: 175cm/75kg 휴머노이드 10 m/s(22 mph) 달성.",
          "content": "이게 뭐예요?\nUnitree G1: 롤러스케이트/아이스스케이트 + 한 발 회전·앞공중제비. 하프마라톤(Beijing E-Town): Honor 'Lightning'이 50:26으로 인간 세계기록(57:20) 추월. MirrorMe Bolt: 175cm/75kg 휴머노이드 10 m/s(22 mph) 달성.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 워크플로우 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\nBolt 영상의 '11 m/s'는 YouTube short에서만 등장하는 수치, 공식 발표는 10 m/s. 영상 속 '미러미의 볼트'는 MirrorMe Bolt를 지칭.\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://en.people.cn/n3/2026/0420/c90000-20448138.html",
          "officialUrl": "https://en.people.cn/n3/2026/0420/c90000-20448138.html",
          "backupUrls": [
            {
              "label": "foxnews.com",
              "url": "https://www.foxnews.com/tech/unitree-g1-humanoid-robot-ice-skates-rollerblades"
            },
            {
              "label": "aljazeera.com",
              "url": "https://www.aljazeera.com/sports/2026/4/19/humanoid-robot-breaks-half-marathon-world-record-in-beijing"
            },
            {
              "label": "fortune.com",
              "url": "https://fortune.com/2026/04/19/humanoid-robot-world-record-half-marathon-race-china-honor/"
            },
            {
              "label": "interestingengineering.com",
              "url": "https://interestingengineering.com/ai-robotics/fastest-humanoid-robot-bolt-unveiled"
            }
          ],
          "tags": [
            "워크플로우",
            "공식",
            "community"
          ]
        },
        {
          "date": "4/26",
          "platform": "X",
          "title": "중국 Kinetix AI — KAI 휴머노이드 로봇 공개 (115 DoF, 18,000 촉각 센서)",
          "summary": "심천 Kinetix AI가 'GIFTED' 컨퍼런스에서 KAI 공개 — 전신 115 DoF + 손 36 DoF/한쪽, 0.1N 감지 촉각피부, 빨래 개기·지퍼·박수·바느질 같은 미세 작업 데모. $40,000 미만 양산 목표",
          "content": "이게 뭐예요?\n심천 Kinetix AI가 'GIFTED' 컨퍼런스에서 KAI 공개 — 전신 115 DoF + 손 36 DoF/한쪽, 0.1N 감지 촉각피부, 빨래 개기·지퍼·박수·바느질 같은 미세 작업 데모. $40,000 미만 양산 목표\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 도구릴리스 흐름에 속합니다. 수강생 입장에서는 최신 모델 이름을 외우는 것보다, 이 변화가 내 업무·학습·제작 흐름의 어느 부분을 바꾸는지 보는 것이 중요합니다.\n\n조금 더 풀어보면\nvendors에 'kinetixai/china-startup' 항목 없음 → community로 표기. 영상은 '36DO'라 했지만 실제는 hand 36 DoF / 전신 115 DoF. 1.7kWh 반고체 배터리 3시간. 2026 말 양산\n\n주의·확인 포인트\n공식 항목입니다. 공식 출처 기반 항목입니다. 그래도 가격·지역·접근 권한은 실제 사용 전에 다시 확인하세요.",
          "source": "https://www.humanoidsdaily.com/news/kinetix-ai-unveils-kai-a-115-dof-humanoid-aiming-for-physical-intelligence",
          "officialUrl": "https://www.humanoidsdaily.com/news/kinetix-ai-unveils-kai-a-115-dof-humanoid-aiming-for-physical-intelligence",
          "backupUrls": [
            {
              "label": "interestingengineering.com",
              "url": "https://interestingengineering.com/ai-robotics/chinas-humanoid-robot-with-115-degrees-of-freedom"
            },
            {
              "label": "autonews.gasgoo.com",
              "url": "https://autonews.gasgoo.com/articles/news/kinetix-ai-unveils-115-degrees-of-freedom-full-size-humanoid-robot-kai-2049496172098633729"
            },
            {
              "label": "humanoid.guide",
              "url": "https://humanoid.guide/product/kai/"
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
