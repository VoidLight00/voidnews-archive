import type { ABEdition } from "../data";

export const edition2026_09b: ABEdition = {
  "slug": "2026-09b",
  "volume": 13,
  "title": "Opus 5.5와 GPT-6 Sol·Luna, 같은 날 가격을 낮춘 두 모델과 음성·판정·이미지",
  "theme": "Claude Opus 5.5 · GPT-6 Sol·Luna · GPT-Live-1 · Jev · Grok 4.7 · Qwen-Image-2.1",
  "period": "2026-09-10 ~ 2026-09-23",
  "coveredWeeks": [
    {
      "slug": "2026-w37",
      "period": "9/10 ~ 9/13"
    },
    {
      "slug": "2026-w38",
      "period": "9/14 ~ 9/20"
    },
    {
      "slug": "2026-w39",
      "period": "9/21 ~ 9/23"
    }
  ],
  "announceDate": "2026-09-24",
  "nextEditionDate": "2026-10-08",
  "intro": "미국 시간 9월 22일, Anthropic과 OpenAI가 같은 날 새 모델을 내놓았습니다. Claude Opus 5.5와 GPT-6 Sol·Luna는 모두 상위 모델에 가까운 성능을 더 낮은 가격에 제공한다고 밝혔습니다. 두 모델의 가격과 제공 범위를 먼저 비교하고, 실시간 음성 API GPT-Live-1, 에이전트 결과를 채점하는 Jev, Grok 4.7, 가중치를 공개한 이미지 모델 Qwen-Image-2.1로 이어갑니다. 각 주제에 공식 원문, 시작 경로, 해볼 과제와 결과 확인 기준을 함께 담았습니다.",
  "closing": "모델 가격이 내려가면 같은 예산으로 더 많은 작업을 맡길 수 있고, 그만큼 결과를 확인하는 기준이 중요해집니다. 자신의 업무에서 과제 하나를 골라 두 모델에 같은 입력을 주고 완료 조건·수정 횟수·사용량을 기록해 보십시오. 회사가 발표한 수치와 직접 확인한 결과를 구분해 두면 다음 도구를 고를 때 판단 기준이 됩니다.",
  "coreFlow": [
    "Opus 5.5 가격과 제공 범위",
    "GPT-6 Sol·Luna 가격과 제공 범위",
    "GPT-Live-1 실시간 음성",
    "Jev 결과 판정",
    "Grok 4.7과 Copilot",
    "Qwen-Image-2.1 편집"
  ],
  "modelWatchSection": {
    "kicker": "More to read",
    "title": "추가로 보면 좋을 뉴스",
    "deck": "본편과 함께 읽으면 좋은 소식입니다. 공식 발표에서 제공 범위와 조건을 확인할 수 있습니다.",
    "navLabel": {
      "ko": "추가 뉴스",
      "en": "More news"
    }
  },
  "highlights": [
    {
      "rank": 1,
      "tier": "hero",
      "post": {
        "title": "Claude Opus 5.5, Fable 5.1에 가까운 성능을 더 낮은 가격으로",
        "deck": "토큰 가격은 20%, 캐시 읽기는 60% 내렸고 구독 사용 한도도 늘었습니다.",
        "summary": "Anthropic이 9월 22일 Claude 5.5 계열의 첫 모델 Claude Opus 5.5를 출시했습니다. 입력·출력 100만 토큰당 4달러·20달러로 Opus 5보다 20% 낮고, 대부분의 작업에서 Fable 5.1 수준이라고 밝혔습니다. Claude 앱·Claude Code·API와 AWS·Google Cloud·Azure에서 바로 쓸 수 있습니다.",
        "slug": "claude-opus-5-5-price-and-access",
        "date": "9/22",
        "platform": "Web",
        "featured": true,
        "content": "**Claude 5.5 계열의 첫 모델이 가격을 먼저 낮췄습니다**\nAnthropic은 9월 22일 Claude Opus 5.5를 출시했습니다. 회사는 이 모델이 대부분의 작업에서 Claude Fable 5.1 수준으로 동작하면서, 기본 설정의 일반적인 작업 기준 실행 비용은 Opus 5보다 40% 적다고 설명합니다. 가격은 입력 100만 토큰당 4달러, 출력 20달러로 Opus 5보다 20% 낮습니다. 에이전트와 코딩 작업 비용의 큰 부분을 차지하는 캐시 읽기는 100만 토큰당 0.2달러로 60% 내렸고, 출력 속도는 Opus 5보다 30% 이상 빨라졌다고 밝혔습니다. Sonnet 5.5와 Haiku 5.5는 몇 주 안에 뒤따를 예정입니다.\n\n**구독 사용자는 사용 한도가 늘어난 효과를 먼저 봅니다**\nClaude 앱에서는 Pro·Max·Team과 좌석 기반 Enterprise 요금제의 5시간 사용 한도가 늘었습니다. 구독 사용자에게는 사용 한도 초기화 1회가 제공되며, 원하는 시점에 쓰도록 저장해 둘 수 있습니다. API에서는 모델 이름 claude-opus-5-5로 호출하며, AWS·Google Cloud·Microsoft Azure에서도 같은 날 제공됐습니다. 문서에 표시된 컨텍스트 창은 100만 토큰입니다. Claude Code와 Claude Platform에는 최대 2.5배 빠른 고속 모드가 있으며, 가격은 입력 8달러·출력 40달러로 기본 가격의 두 배입니다.\n\n**성능 비교는 Anthropic이 공개한 수치입니다**\nAnthropic이 공개한 표에서 Opus 5.5는 Terminal-Bench 4.0 66.4%(Fable 5.1 55.8%, Opus 5 52.3%), CursorBench 4.0 57.8%(Fable 5.1 51.8%), OSWorld 2.0 81.8%(Fable 5.1 80.7%)를 기록했습니다. 기본 설정에서는 FrontierCode 점수가 GPT-6 Astra보다 높으면서 과제당 비용은 약 20%였다고 설명합니다. 경쟁 모델 점수는 OpenAI가 보고한 값을 인용한 것입니다. 회사는 이 수준의 모델에서는 벤치마크 격차가 실제 차이를 잘 보여 주지 못하며, 자체 사용에서 느낀 Fable 5.1과의 차이는 점수보다 작다고 덧붙였습니다. 독립 평가 기관 Artificial Analysis는 같은 가격을 확인했고 종합 지능 지수를 58로 표시합니다.\n\n**안전장치는 Fable 5.1과 비슷한 수준으로 적용됩니다**\nOpus 5.5는 외부 평가 기관의 사전 시험을 거쳤습니다. Anthropic은 생물학과 사이버보안 능력이 Claude Mythos 5.1과 비슷한 수준이라 Fable 5.1과 유사한 안전장치를 적용했다고 밝혔습니다. 생물학 연구 목적으로 쓰려는 기관은 Life Sciences Verification Program에 신청할 수 있습니다.\n\n**실습: 같은 작업을 두 모델에 맡기고 비용과 수정 횟수를 기록합니다**\n평소 Opus 5나 Fable 5.1에 맡기던 작업 하나를 골라 입력 자료와 완료 조건을 먼저 적습니다. 같은 입력을 Opus 5.5에도 맡기고 결과물이 완료 조건을 지켰는지, 추가 지시를 몇 번 했는지, 사용량이 얼마였는지를 표로 비교합니다. 구독 사용자는 5시간 한도 안에서 처리한 작업 수를, API 사용자는 청구된 토큰과 캐시 읽기 비율을 확인 기준으로 삼습니다. 회사가 발표한 40% 절감이 자신의 작업에서도 나타나는지 이 기록으로 판단할 수 있습니다.",
        "source": "https://www.anthropic.com/claude-opus-5-5",
        "officialUrl": "https://www.anthropic.com/claude-opus-5-5",
        "verifiedAt": "2026-09-23",
        "backupUrls": [
          {
            "label": "모델 비교와 컨텍스트 창",
            "url": "https://docs.claude.com/en/docs/about-claude/models/overview"
          },
          {
            "label": "API 요금",
            "url": "https://docs.claude.com/en/docs/about-claude/pricing"
          },
          {
            "label": "Artificial Analysis 독립 평가",
            "url": "https://artificialanalysis.ai/models/claude-opus-5-5"
          }
        ],
        "thumbnail": {
          "src": "/og-cache/ab-20260924-opus55.jpg",
          "alt": "지평선 위로 푸른 하늘과 주황빛 노을이 번지는 사진 가운데에 'Claude Opus 5.5'가 쓰여 있고, 양옆에 노란 종이의 스케치와 붉은 암석 질감 사진이 이어 붙은 이미지",
          "caption": "Anthropic이 Claude Opus 5.5 발표 글에 사용한 공식 공유 이미지입니다. 본문 상단에는 별도 대표 이미지가 없어 이 이미지를 사용했습니다.",
          "provenance": "source-share-preview"
        },
        "tags": [
          "2026-09b",
          "Anthropic",
          "활용 가이드"
        ],
        "en": {
          "title": "Claude Opus 5.5: near Fable 5.1 performance at a lower price",
          "deck": "Token prices are 20% lower, cache reads 60% lower, and subscription limits are higher.",
          "summary": "Anthropic released Claude Opus 5.5, the first model in the Claude 5.5 family, on September 22. Input and output cost $4 and $20 per million tokens, 20% below Opus 5, and Anthropic says it performs at the level of Fable 5.1 on most work. It is available in the Claude apps, Claude Code, the API, AWS, Google Cloud and Azure.",
          "content": "Anthropic says Opus 5.5 performs at the level of Claude Fable 5.1 on most work and costs 40% less than Opus 5 to run on typical workloads at default settings. Input and output tokens are $4 and $20 per million (20% lower), cache reads are $0.20 per million (60% lower), and output is more than 30% faster than Opus 5.\n\nOn the Claude apps, five-hour usage limits increased for Pro, Max, Team and seat-based Enterprise plans, and subscribers receive one rate-limit reset they can save for later. Developers call claude-opus-5-5 on the Claude Platform; the model also launched on AWS, Google Cloud and Microsoft Azure. The documented context window is one million tokens. A fast mode with up to 2.5x speed costs $8 and $40 per million input and output tokens.\n\nAnthropic's table lists Opus 5.5 at 66.4% on Terminal-Bench 4.0 (Fable 5.1 55.8%, Opus 5 52.3%), 57.8% on CursorBench 4.0 (Fable 5.1 51.8%) and 81.8% on OSWorld 2.0 (Fable 5.1 80.7%). It says that at default effort Opus 5.5 beats GPT-6 Astra on FrontierCode at about 20% of the cost per task; competitor figures are as reported by OpenAI. It also cautions that benchmark margins are a less reliable guide at this level and that the real-world gap to Fable 5.1 is narrower than the scores suggest. Artificial Analysis independently lists the same pricing.\n\n**Practice:** give one task you normally send to Opus 5 or Fable 5.1 to Opus 5.5 with the same input and completion criteria. Compare whether the criteria were met, how many follow-up instructions you needed and how much usage it consumed."
        },
        "releaseScope": "Claude 앱 · Claude Code · API · 클라우드 3사"
      },
      "sourceWeek": "2026-w39",
      "sourceCompany": "Anthropic",
      "editorial": "같은 날 나온 GPT-6 Sol과 함께, 상위 모델 가격이 내려갈 때 무엇을 비교해야 하는지 봅니다."
    },
    {
      "rank": 2,
      "tier": "hero",
      "post": {
        "title": "GPT-6 Sol·Luna, Astra 아래 두 모델을 절반 가격으로",
        "deck": "Sol은 입력 2달러·출력 10달러, Luna는 0.1달러·0.5달러이며 ChatGPT Work와 Codex에 먼저 들어갔습니다.",
        "summary": "OpenAI가 GPT-6 Astra의 하위 모델인 GPT-6 Sol과 GPT-6 Luna를 공개했습니다. API 가격은 이전 세대보다 50% 낮고 두 모델 모두 컨텍스트 창이 105만 토큰입니다. ChatGPT Work·Codex·API·GitHub Copilot에서 쓸 수 있으며, 일반 채팅 화면에는 아직 들어가지 않았습니다.",
        "slug": "gpt-6-sol-luna-price-and-access",
        "date": "9/23 06:00",
        "platform": "Web",
        "featured": true,
        "content": "**Astra의 성능을 더 싼 두 모델로 나눴습니다**\nOpenAI는 한국시간 9월 23일 오전 6시(미국 시간 9월 22일) GPT-6 Sol과 GPT-6 Luna를 공개했습니다. 가장 어렵고 중요한 작업에는 여전히 GPT-6 Astra가 필요하지만, 일상 업무는 규모와 예산이 다르다는 설명과 함께 비용 효율을 높인 두 모델을 내놓았습니다. Sol은 균형형, Luna는 가장 저렴한 경량형입니다. API에서는 gpt-6-sol과 gpt-6-luna라는 이름으로 호출합니다.\n\n**가격은 이전 세대의 절반입니다**\n100만 토큰당 가격은 GPT-6 Sol이 입력 2달러·출력 10달러로 GPT-5.6 Sol(4달러·20달러)의 절반이고, GPT-6 Luna는 입력 0.1달러·출력 0.5달러로 GPT-5.6 Luna(0.2달러·1.2달러)보다 낮습니다. 두 모델의 컨텍스트 창은 105만 토큰입니다. 반복해서 쓰는 입력을 저장해 두는 캐시 읽기는 90% 할인됩니다. 다만 입력이 27만 2천 토큰을 넘는 요청은 요청 전체에 입력 2배·출력 1.5배 가격이 적용되므로, 긴 문서를 통째로 넣는 작업은 실제 청구액을 따로 확인해야 합니다.\n\n**신뢰도 비교는 OpenAI의 설명입니다**\nOpenAI는 GPT-6 Sol의 실수가 이전 모델의 절반 정도로 줄어 훨씬 낮은 비용으로 Astra에 가까운 신뢰도를 낸다고 밝혔습니다. Luna는 높은 추론 강도에서 GPT-5.6 Sol과 비슷한 성능을 약 100분의 1 비용으로 낸다고 설명합니다. 두 비교 모두 OpenAI 내부 평가의 결과입니다. OpenAI는 사실 정확도를 사용자가 오류를 표시한 실제 대화를 익명화해 만든 내부 평가로 측정한다고 설명합니다.\n\n**제공 범위는 요금제와 화면에 따라 다릅니다**\nPlus·Pro·Business·Enterprise·Edu 사용자는 ChatGPT Work와 Codex에서 두 모델을 쓸 수 있습니다. Free와 Go 사용자는 데스크톱 앱에서 Luna만 쓸 수 있고, 일반 채팅 화면에는 아직 두 모델이 들어가지 않았습니다. GitHub도 같은 날 Copilot에 두 모델을 순차 적용하기 시작했고 사용량 기반으로 청구합니다. 같은 날 공개된 Claude Opus 5.5와 비교할 때는 모델 등급이 다르다는 점을 감안해야 합니다. Opus 5.5는 Anthropic의 상위 모델이고, Sol은 Astra 아래의 중간 모델입니다.\n\n**실습: 같은 작업을 Sol과 Luna에 나눠 맡기고 비용 차이를 확인합니다**\n회의록 요약처럼 단순한 작업과 여러 파일을 고치는 복잡한 작업을 하나씩 정합니다. 두 작업을 Sol과 Luna에 각각 맡기고 결과가 완료 조건을 지켰는지, 다시 지시한 횟수, 사용량을 기록합니다. 단순한 작업에서 Luna의 결과가 충분하다면 그 작업은 가장 싼 모델로 옮길 수 있고, 복잡한 작업에서 차이가 크다면 Sol이나 Astra를 쓰는 기준이 됩니다.",
        "source": "https://openai.com/index/introducing-gpt-6-sol-and-luna/",
        "officialUrl": "https://openai.com/index/introducing-gpt-6-sol-and-luna/",
        "verifiedAt": "2026-09-23",
        "backupUrls": [
          {
            "label": "GPT-6 Sol 모델 문서와 가격",
            "url": "https://developers.openai.com/api/docs/models/gpt-6-sol"
          },
          {
            "label": "GPT-6 Luna 모델 문서와 가격",
            "url": "https://developers.openai.com/api/docs/models/gpt-6-luna"
          },
          {
            "label": "GitHub Copilot 제공 안내",
            "url": "https://github.blog/changelog/2026-09-22-openais-gpt-6-sol-and-gpt-6-luna-now-available/"
          }
        ],
        "thumbnail": {
          "src": "/og-cache/ab-20260924-sol-luna.webp",
          "alt": "별이 흩어진 검은 우주를 배경으로 왼쪽 위에 밝은 태양, 오른쪽 아래에 초승달이 있고 가운데에 'GPT-6 Sol and Luna'가 흰 글씨로 적힌 이미지",
          "caption": "OpenAI가 GPT-6 Sol·Luna 발표 글에 사용한 공식 공유 이미지로, OpenAI 이미지 서버가 제공하는 1600px 변환본입니다. 본문 상단에는 별도 이미지 파일이 없어 이 이미지를 사용했습니다.",
          "provenance": "source-share-preview"
        },
        "tags": [
          "2026-09b",
          "OpenAI",
          "활용 가이드"
        ],
        "en": {
          "title": "GPT-6 Sol and Luna: two models below Astra at half the price",
          "deck": "Sol costs $2/$10 and Luna $0.10/$0.50 per million tokens; both launched first in ChatGPT Work and Codex.",
          "summary": "OpenAI released GPT-6 Sol and GPT-6 Luna, two lower-cost siblings of GPT-6 Astra. API prices are 50% below the previous generation and both have a 1.05M-token context window. They are available in ChatGPT Work, Codex, the API and GitHub Copilot, but not yet in regular chat.",
          "content": "OpenAI published GPT-6 Sol and GPT-6 Luna on September 22 (US time; 06:00 on September 23 in Korea). Astra remains the model for the most demanding work, while Sol is the balanced option and Luna the lowest-cost one. API names are gpt-6-sol and gpt-6-luna.\n\nPer million tokens, GPT-6 Sol costs $2 input and $10 output, half of GPT-5.6 Sol ($4/$20). GPT-6 Luna costs $0.10 and $0.50, down from $0.20 and $1.20. Both have a 1,050,000-token context window, and cached input reads are discounted by 90%. Requests with more than 272K input tokens are billed at 2x input and 1.5x output for the whole request.\n\nOpenAI says Sol makes about half as many mistakes as its predecessor, approaching Astra-level reliability, and that Luna at higher effort matches GPT-5.6 Sol at about a hundredth of the cost. These figures come from OpenAI's internal evaluations; OpenAI says it measures factuality on de-identified real conversations where users flagged mistakes.\n\nPlus, Pro, Business, Enterprise and Edu users can use both models in ChatGPT Work and Codex; Free and Go users get Luna in the desktop app. They are not yet in regular chat. GitHub began rolling both out in Copilot with usage-based billing. Note that Opus 5.5 is Anthropic's top-tier model, while Sol sits below Astra.\n\n**Practice:** give one simple and one complex task to both Sol and Luna, then compare whether the completion criteria were met, follow-up count and usage."
        },
        "releaseScope": "API · ChatGPT Work · Codex · Copilot"
      },
      "sourceWeek": "2026-w39",
      "sourceCompany": "OpenAI",
      "editorial": "Opus 5.5와 같은 날 나왔지만 등급이 다른 모델이라, 가격표를 볼 때 무엇과 무엇을 비교하는지 먼저 짚습니다."
    },
    {
      "rank": 3,
      "tier": "feature",
      "post": {
        "title": "GPT-Live-1, 말하는 도중에 끼어들어도 이어지는 실시간 음성 API",
        "deck": "듣기와 말하기를 한 모델이 동시에 처리하고, 어려운 판단은 뒤쪽의 텍스트 모델에 맡깁니다.",
        "summary": "OpenAI가 9월 10일 ChatGPT에서 먼저 선보인 실시간 음성 모델 GPT-Live-1을 API로 공개했습니다. 상대가 말하는 도중에도 듣고 반응하는 전이중 대화를 지원하고 전화 통화에도 연결할 수 있으며, 음성 계층 가격은 분당 0.05달러입니다.",
        "slug": "gpt-live-1-voice-api",
        "date": "9/10",
        "platform": "Web",
        "featured": true,
        "content": "**듣기와 말하기를 한 모델이 동시에 처리합니다**\n기존 음성 에이전트는 음성을 글로 바꾸는 단계, 답을 만드는 언어 모델, 글을 음성으로 읽는 단계를 이어 붙였습니다. 단계가 바뀔 때마다 지연이 생기고, 사용자가 말을 끊거나 방향을 바꾸면 흐름이 쉽게 어긋났습니다. OpenAI는 9월 10일 공개한 GPT-Live-1이 들어오는 음성과 나가는 음성을 한 모델에서 함께 처리해 이 문제를 줄인다고 설명합니다. 말하는 도중 끼어들기, 짧은 맞장구, 배경 소음과 침묵을 처리하며, 긴 대화에서도 앞의 내용을 유지하도록 개선했다고 밝혔습니다.\n\n**어려운 판단은 뒤쪽 모델에 맡기고 대화는 계속 이어 갑니다**\nGPT-Live-1은 추론과 도구 호출을 GPT-6 Astra 같은 텍스트 모델이나 다른 회사 모델에 위임할 수 있습니다. 뒤에서 작업이 진행되는 동안에도 사용자와의 대화는 끊기지 않습니다. OpenAI는 일정 관리나 주문 확인처럼 요청이 많은 작업에는 Luna 같은 저렴한 모델을, 복잡한 상담에는 Astra 같은 모델을 붙이는 구성을 예로 듭니다. 시스템 프롬프트로 말투와 속도를 조절할 수 있고, 음성 인식 기록과 응답 텍스트가 함께 제공되며, 식당 예약부터 고객 지원까지 전화 통화에 연결할 수 있습니다.\n\n**고객 사례와 성능 수치는 OpenAI가 공개한 내용입니다**\n언어 학습 서비스 Speak는 학습자가 생각하느라 멈춘 사이에 튜터가 끼어드는 경우가 기존 방식보다 약 80% 줄었다고 밝혔습니다. Yelp는 예약·주문 전화 응대에서 통화 처리율이 나아졌다고 전했고, 한 의료 예약 서비스는 기존 연결 방식보다 코드베이스를 80% 줄이고 2만 3천 줄을 걷어 냈다고 소개했습니다. OpenAI는 Full Duplex Bench에서 이전 음성 모델 GPT-Realtime-2.1보다 30%포인트 높았고, GPT-6 Astra와 함께 쓰면 음성 상담 과제 평가 Tau3에서 1위였다고 발표했습니다.\n\n**가격은 음성 계층과 뒤쪽 모델을 나눠 계산합니다**\nGPT-Live-1은 API에서 바로 쓸 수 있고, 가격은 앞단의 음성 계층 기준 분당 0.05달러이며 초 단위로 청구됩니다. 추론을 맡는 뒤쪽 모델의 사용량은 별도로 계산되므로, 전체 비용은 두 가지를 합쳐 봐야 합니다. 선택할 수 있는 목소리가 여러 억양과 언어로 늘었고, OpenAI는 앞으로 몇 달 동안 목소리와 지원 언어를 더 늘릴 계획이라고 밝혔습니다. 맞춤 목소리는 영업팀 문의로 신청합니다.\n\n**실습: 전화 예약 흐름에서 음성 모델이 직접 답할 부분을 나눕니다**\n발표 글에 있는 체험 세션에서 질문하다가 중간에 말을 끊고 조건을 바꿔 보며 끼어들기 처리를 확인합니다. 이어서 자신의 업무에서 전화 한 통의 흐름을 적고, 영업시간 안내처럼 음성 모델이 바로 답할 부분과 예약 변경처럼 뒤쪽 모델이나 사람에게 넘길 부분을 나눕니다. 통화 1건의 평균 길이에 분당 0.05달러를 곱하고 뒤쪽 모델 비용을 더하면, 도입 전에 통화당 비용을 추정하는 확인 기준이 됩니다.",
        "source": "https://openai.com/index/introducing-gpt-live-1-in-the-api/",
        "officialUrl": "https://openai.com/index/introducing-gpt-live-1-in-the-api/",
        "verifiedAt": "2026-09-23",
        "backupUrls": [
          {
            "label": "GPT-Live-1 모델 문서와 가격",
            "url": "https://developers.openai.com/api/docs/models/gpt-live-1"
          },
          {
            "label": "실시간 음성 개발 가이드",
            "url": "https://developers.openai.com/api/docs/guides/live"
          }
        ],
        "thumbnail": {
          "src": "/og-cache/ab-20260924-gpt-live-1.png",
          "alt": "전화 통화 화면을 표현한 두 개의 말풍선으로, 위쪽은 식당이 'Hi, thanks for calling Stella Lago. How can I help you?'라고 응답하고 아래쪽은 손님이 '토요일 저녁 7시에 4명 예약'을 요청하는 장면이며 하단에 Yelp 로고가 있습니다.",
          "caption": "OpenAI가 GPT-Live-1 발표 글 상단에 실은 Yelp 전화 예약 시연 영상의 정지 화면입니다."
        },
        "tags": [
          "2026-09b",
          "OpenAI",
          "활용 가이드"
        ],
        "en": {
          "title": "GPT-Live-1: a realtime voice API that keeps going when you interrupt",
          "deck": "One model listens and speaks at once, delegating harder reasoning to a backend text model.",
          "summary": "On September 10 OpenAI brought GPT-Live-1, first introduced in ChatGPT, to the API. It supports full-duplex conversation that listens while speaking, can be connected to phone calls, and costs $0.05 per minute for the voice layer.",
          "content": "Traditional voice agents chain speech-to-text, a language model and text-to-speech, adding latency at each hand-off and breaking the flow when users interrupt. OpenAI says GPT-Live-1 reasons over incoming and outgoing audio in one model, handling interruptions, backchannels, background noise and silence, and stays stable in long sessions.\n\nGPT-Live-1 can delegate reasoning and tool calls to GPT-6 Astra or third-party models while the conversation continues. OpenAI suggests pairing it with Luna for high-volume tasks such as scheduling and with Astra for complex support. Tone and speaking rate are set via the system prompt, ASR transcripts and response text are included, and telephony deployments cover uses from restaurant reservations to customer support.\n\nCustomer results come from OpenAI's announcement: Speak reports about 80% fewer interruptions while learners pause, Yelp reports better call handling, and one healthcare scheduling company says it simplified its codebase by 80%, removing 23,000 lines. OpenAI reports a 30-point gain over GPT-Realtime-2.1 on Full Duplex Bench and first place on Tau3 when paired with GPT-6 Astra.\n\nThe voice layer costs $0.05 per minute, with backend model usage billed separately. OpenAI expanded voice options and plans more voices and languages in the coming months; custom voices are available through sales.\n\n**Practice:** map one phone call in your work, separate what the voice model can answer directly from what should go to a backend model or a person, and estimate cost per call from average length at $0.05 per minute plus backend usage."
        },
        "releaseScope": "API · 분당 0.05달러"
      },
      "sourceWeek": "2026-w37",
      "sourceCompany": "OpenAI",
      "editorial": "모델 가격이 내려가면 화면 밖의 전화 응대처럼 새 접점이 열립니다. 음성과 판단을 나누는 구조를 봅니다."
    },
    {
      "rank": 4,
      "tier": "feature",
      "post": {
        "title": "Jev, 에이전트가 만든 결과를 빠르게 채점하는 판정 모델",
        "deck": "문장을 쓰지 않고, 정해진 질문에 확률이 붙은 답만 돌려줍니다.",
        "summary": "TypeSafe AI가 9월 15일 공개한 Jev는 긴 답을 쓰는 대신 선택지·점수·예와 아니오 같은 정해진 형식의 답과 확률을 돌려주는 모델입니다. 에이전트 결과를 점검하는 판정 단계에 쓰이며, LangSmith 평가 화면에서 채점자로 지정할 수 있습니다.",
        "slug": "jev-agent-output-judge",
        "date": "9/15",
        "platform": "Web",
        "featured": true,
        "content": "**Jev는 글을 쓰지 않고 판정만 돌려주는 모델입니다**\nTypeSafe AI는 9월 15일 'System One' 모델이라는 새 분류와 함께 첫 공개 모델 Jev를 조기 접근으로 내놓았습니다. 회사는 Jev를 구조화되지 않은 상태를 넣으면 형식이 정해진 확률적 판정이 나오는 함수 호출에 비유합니다. 자유로운 문장은 만들지 않고, 선택지 가운데 하나를 고르거나 점수를 매기거나 예와 아니오로 답하면서 각 답에 확률을 붙입니다. 선택지는 최대 255개까지 지정할 수 있습니다.\n\n**에이전트 결과를 점검하는 단계에 쓰입니다**\n에이전트가 만든 보고서나 코드 수정이 요구사항을 지켰는지 확인할 때는 큰 언어 모델에게 결과를 다시 읽고 평가하게 하는 방식이 많이 쓰였습니다. Jev는 이 판정 단계를 짧은 응답으로 처리하도록 설계됐습니다. TypeSafe AI가 밝힌 응답 시간은 0.07~0.5초이고, 가격은 입력 100만 토큰당 0.042달러이며 출력은 과금하지 않습니다. 홈페이지의 '193.6배 빠르고 444.6배 싸다'는 수치에 대해서는 회사 스스로 실제 이득 가운데 높은 쪽 결과이고 자사 팀이 측정해 편향이 있을 수 있다고 적었습니다.\n\n**LangChain이 별도로 측정한 결과도 공개됐습니다**\nLangChain은 9월 20일 자체 비교에서 Jev를 에이전트 평가의 채점자로 쓰고 GPT-5.6 Luna·Terra, Claude Sonnet 4.6과 비교했습니다. 같은 입력을 반복 채점했을 때 점수 편차가 92~913배 작았고, 호출당 평균 0.44초가 걸렸으며, 전체 비용은 0.34달러로 Claude Sonnet 4.6의 28.17달러보다 낮았다고 보고했습니다. LangChain은 이 결과를 좁은 범위에서 진행한 초기 시험이라고 설명합니다.\n\n**조기 접근 단계라 이용 경로가 제한됩니다**\nJev는 가중치를 공개한 모델이 아니라 TypeSafe AI가 운영하는 API입니다. console.typesafe.ai에서 가입한 뒤 대기 명단을 거쳐 순차적으로 이용할 수 있습니다. 가입 없이 쓰는 공개 체험 화면은 없습니다. 9월 21일부터는 LangSmith의 추적 프로젝트에서 Evaluators 탭을 열어 Jev를 채점자로 지정할 수 있으므로, 이미 LangSmith를 쓰는 팀은 이 경로로 가장 빨리 시작할 수 있습니다.\n\n**실습: 에이전트 결과 세 건을 같은 기준으로 채점합니다**\n에이전트가 작성한 요약문 세 건을 준비하고, '원문에 없는 수치를 넣었는가'와 '요청한 분량을 지켰는가'처럼 예와 아니오로 답할 질문 두 개를 정합니다. 같은 질문을 Jev와 평소 쓰는 대화형 모델에 각각 맡기고 판정·확률·응답 시간을 표로 기록합니다. 두 판정이 엇갈린 항목은 원문과 직접 대조해 어느 쪽이 맞았는지 확인합니다. 이 결과가 판정 모델에 맡길 수 있는 질문의 범위를 정하는 확인 기준이 됩니다.",
        "source": "https://typesafe.ai/blog/introducing-system-one-models-and-jev",
        "officialUrl": "https://typesafe.ai/blog/introducing-system-one-models-and-jev",
        "verifiedAt": "2026-09-23",
        "backupUrls": [
          {
            "label": "TypeSafe AI 개발 문서",
            "url": "https://docs.typesafe.ai/"
          },
          {
            "label": "조기 접근 신청 콘솔",
            "url": "https://console.typesafe.ai/"
          },
          {
            "label": "LangChain · Jev 채점자 비교",
            "url": "https://www.langchain.com/blog/jev-agent-evals-langsmith"
          },
          {
            "label": "LangChain · LangSmith Evals 지원",
            "url": "https://www.langchain.com/blog/jev-is-now-available-in-langsmith-evals"
          }
        ],
        "thumbnail": {
          "src": "/og-cache/ab-20260924-jev.png",
          "alt": "가로축은 워크플로당 비용(로그 눈금), 세로축은 정확도인 산점도입니다. Jev는 가장 왼쪽의 낮은 비용 위치에 정확도 약 68%로 표시되고, OpenAI·Anthropic·Fireworks 모델은 더 높은 비용 쪽에 흩어져 있습니다.",
          "caption": "TypeSafe AI가 발표 글 본문에 실은 네 가지 워크플로 평균 정확도와 비용 비교 차트입니다. 회사가 직접 측정한 결과입니다."
        },
        "tags": [
          "2026-09b",
          "TypeSafe AI",
          "활용 가이드"
        ],
        "en": {
          "title": "Jev: a fast judge model for scoring agent output",
          "deck": "It returns typed answers with probabilities instead of free text.",
          "summary": "TypeSafe AI released Jev on September 15 in early access. Instead of writing prose, it returns a choice, a score or a yes/no answer with a probability, which suits the step where agent output is checked. LangSmith lets you select Jev as an evaluator.",
          "content": "TypeSafe AI introduced a model class it calls System One and released Jev, its first public model, in early access on September 15. Jev does not generate free text; it returns typed answers such as a choice (up to 255 options), a score or yes/no, each with a probability. TypeSafe states response times of 70-500 ms and pricing of $0.042 per million input tokens with free output. The company itself notes that the 193.6x faster and 444.6x cheaper figures on its homepage are at the high end of real-world gains and were measured by its own team.\n\nLangChain ran its own comparison on September 20, using Jev as an agent-eval judge against GPT-5.6 Luna and Terra and Claude Sonnet 4.6. It reported 92-913x lower score variance, 0.44 s average latency and $0.34 total cost versus $28.17 for Claude Sonnet 4.6, describing the result as an early, narrow test. Since September 21, Jev can be selected in the Evaluators tab of any LangSmith tracing project.\n\nJev is a hosted API, not an open-weight model. Access is through console.typesafe.ai with a waitlist, and there is no public no-signup playground.\n\n**Practice:** take three agent-written summaries, define two yes/no questions such as 'Does it add figures not in the source?' and 'Does it respect the requested length?', and ask both Jev and your usual chat model. Record verdicts, probabilities and latency, then check disagreements against the source yourself."
        },
        "releaseScope": "API 조기 접근 · LangSmith"
      },
      "sourceWeek": "2026-w38",
      "sourceCompany": "TypeSafe AI",
      "editorial": "결과물을 다시 쓰지 않고 판정만 받는 모델이 에이전트 점검 단계를 어떻게 바꾸는지 봅니다."
    },
    {
      "rank": 5,
      "tier": "feature",
      "post": {
        "title": "Grok 4.7, 코딩과 지식 작업용 xAI 새 모델과 Copilot 탑재",
        "deck": "가격은 Grok 4.6과 같고, '두 배 빠르고 절반 가격'은 다른 회사 모델과 비교한 주장입니다.",
        "summary": "xAI가 9월 21일 코딩과 지식 작업용 Grok 4.7을 공개했습니다. 입력·출력 100만 토큰당 2달러·6달러로 Grok 4.6과 같은 가격이며, 같은 날 GitHub Copilot 유료 요금제에도 순차 적용이 시작됐습니다.",
        "slug": "grok-4-7-and-copilot",
        "date": "9/21",
        "platform": "Web",
        "featured": true,
        "content": "**Grok 4.7은 가격을 유지하고 작업 방식을 바꿨습니다**\nxAI는 9월 21일 Grok 4.7을 코딩과 지식 작업에 가장 뛰어난 자사 모델로 소개했습니다. 어려운 과제에 더 오래 매달리고 자기 결과를 더 꼼꼼히 확인하도록 개선했다는 설명입니다. 가격은 입력 100만 토큰당 2달러, 출력 6달러로 Grok 4.6과 같습니다. 출력 속도가 두 배인 고속 버전은 가격도 두 배입니다. 개발 문서에 적힌 컨텍스트 창은 50만 토큰이고 학습 데이터 기준 시점은 2026년 5월입니다.\n\n**'두 배 빠르고 절반 가격'은 다른 회사 모델과 비교한 xAI의 설명입니다**\n발표 글의 비교표는 GPT-5.6 Sol(입력 4달러·출력 20달러)과 Fable 5.1(입력 10달러·출력 50달러)을 기준으로 삼습니다. 이 비교에는 9월 22일에 나온 GPT-6 Sol(입력 2달러·출력 10달러)과 Claude Opus 5.5가 들어 있지 않습니다. 독립 평가 기관 Artificial Analysis는 최고 추론 설정의 Grok 4.7에 종합 지능 지수 46을 매겼고, 출력 속도는 초당 약 39토큰으로 느린 편이라고 측정했습니다. xAI가 말한 속도는 과제 단위의 처리 시간이고 Artificial Analysis는 토큰 출력 속도를 쟀기 때문에 두 수치를 같은 기준으로 비교할 수 없습니다. xAI는 새 안전장치로 위험한 사이버 요청 통과율이 3.3%라고 밝혔는데, 이 역시 자사 벤치마크 결과입니다.\n\n**반응은 GitHub Copilot 탑재 쪽에서 더 크게 나왔습니다**\nGitHub는 같은 날 Copilot Pro·Pro+·Max·Business·Enterprise에 Grok 4.7을 순차 적용한다고 발표했습니다. VS Code·Visual Studio·Copilot CLI·JetBrains·Xcode 등의 모델 선택 화면에서 고를 수 있고, 사용량 기반으로 제공사 공시 가격이 청구됩니다. xAI는 Cursor와 Grok Build에서도 바로 쓸 수 있고 Grok API와 여러 클라우드 경로로 제공한다고 밝혔습니다. 해외 개발자 커뮤니티의 반응은 모델 발표 자체보다 Copilot 탑재 소식에 더 많이 모였습니다.\n\n**실습: 이미 쓰는 도구 안에서 같은 과제를 모델만 바꿔 비교합니다**\nCopilot이나 Cursor를 쓰고 있다면 새 도구를 설치할 필요 없이 모델 선택 화면에서 Grok 4.7을 고를 수 있습니다. 작은 버그 수정 하나를 정해 같은 설명을 Grok 4.7과 평소 쓰는 모델에 각각 맡기고, 테스트 통과 여부·수정한 파일 수·걸린 시간·청구된 사용량을 기록합니다. 조직 계정이라면 관리자가 모델 사용을 허용했는지 먼저 확인해야 합니다. 이 기록을 모으면 발표문의 속도·가격 주장이 자신의 작업에서도 맞는지 판단하는 확인 기준이 됩니다.",
        "source": "https://x.ai/news/grok-4-7",
        "officialUrl": "https://x.ai/news/grok-4-7",
        "verifiedAt": "2026-09-23",
        "backupUrls": [
          {
            "label": "Grok 4.7 모델·가격 문서",
            "url": "https://docs.x.ai/docs/models/grok-4-7"
          },
          {
            "label": "GitHub Copilot 제공 안내",
            "url": "https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot"
          },
          {
            "label": "Artificial Analysis 독립 평가",
            "url": "https://artificialanalysis.ai/models/grok-4-7"
          }
        ],
        "thumbnail": {
          "src": "/og-cache/ab-20260924-grok47.webp",
          "alt": "짙은 남색과 회색이 섞인 그러데이션 배경 가운데에 흰 글씨로 'Grok 4.7'이 적힌 이미지",
          "caption": "xAI가 Grok 4.7 발표 글의 공유 이미지로 사용한 공식 이미지입니다. 본문 상단에는 별도 사진이 없어 이 이미지를 사용했습니다.",
          "provenance": "source-share-preview"
        },
        "tags": [
          "2026-09b",
          "xAI",
          "활용 가이드"
        ],
        "en": {
          "title": "Grok 4.7: xAI's new coding and knowledge-work model, now in Copilot",
          "deck": "Priced the same as Grok 4.6; 'twice as fast at half the price' compares it with other vendors' models.",
          "summary": "xAI released Grok 4.7 for coding and knowledge work on September 21. It costs $2 and $6 per million input and output tokens, the same as Grok 4.6, and began rolling out to paid GitHub Copilot plans the same day.",
          "content": "xAI describes Grok 4.7 as its most capable model for coding and knowledge work: it works longer on hard tasks and checks its own work more carefully. It costs $2 per million input tokens and $6 per million output tokens, the same as Grok 4.6; a fast variant with twice the output speed costs twice as much. The documented context window is 500k tokens with a May 2026 knowledge cutoff.\n\nThe 'twice as fast, half the price' headline compares Grok 4.7 with GPT-5.6 Sol ($4/$20) and Fable 5.1 ($10/$50); it predates GPT-6 Sol ($2/$10) and Claude Opus 5.5, both released on September 22. Artificial Analysis gives Grok 4.7 (xhigh) an Intelligence Index of 46 and measures its output at about 39 tokens per second, which it calls notably slow. xAI's speed claim concerns task-level time, so the two figures measure different things. xAI's safety figures, such as a 3.3% pass rate for risky cyber prompts, come from its own benchmarks.\n\nGitHub began a gradual rollout to Copilot Pro, Pro+, Max, Business and Enterprise, billed at provider list pricing under usage-based billing. Grok 4.7 is also available in Cursor, Grok Build and the Grok API.\n\n**Practice:** in Copilot or Cursor, give the same small bug fix to Grok 4.7 and your usual model, then record test results, files changed, time and billed usage."
        },
        "releaseScope": "API · Cursor · Copilot 순차 적용"
      },
      "sourceWeek": "2026-w39",
      "sourceCompany": "xAI",
      "editorial": "발표 문구의 비교 대상이 무엇인지 확인하고, 이미 쓰는 도구 안에서 바로 비교할 수 있는 경로를 봅니다."
    },
    {
      "rank": 6,
      "tier": "feature",
      "post": {
        "title": "Qwen-Image-2.1, 가중치를 내려받아 쓰는 이미지 생성·편집 모델",
        "deck": "투명 배경 출력과 최대 10장 참조 편집을 지원하며, 상업적 이용에는 별도 허가가 필요합니다.",
        "summary": "Alibaba Qwen 팀이 9월 20일 이미지 생성과 편집을 한 모델로 처리하는 Qwen-Image-2.1의 가중치를 공개했습니다. 70억 파라미터 규모로 투명 배경, 최대 10장 참조 편집, 2K 해상도를 지원합니다. 라이선스는 연구·평가 목적의 비상업적 이용만 허용합니다.",
        "slug": "qwen-image-2-1-weights",
        "date": "9/20",
        "platform": "Web",
        "featured": true,
        "content": "**생성과 편집을 한 모델에서 처리합니다**\nAlibaba Qwen 팀은 9월 20일 Qwen-Image-2.1을 공개했습니다. 이미지를 만드는 부분이 70억 파라미터 규모인 모델로, 글로 이미지를 새로 만들고 기존 이미지를 편집하는 작업을 한 모델에서 처리합니다. 배경이 투명한 이미지를 바로 만들 수 있고, 투명 레이어를 편집하거나 사진에서 대상만 떼어 낼 수도 있습니다. 편집할 때는 참조 이미지를 최대 10장까지 넣을 수 있고, 원이나 덧칠, 별도 마스크로 고칠 위치를 지정합니다. 기본 해상도는 2048×2048이며 16:9 등 여러 비율의 2K 크기를 지원합니다.\n\n**'오픈소스'라고 소개했지만 상업적 이용은 제한됩니다**\nQwen은 README에서 이 모델을 오픈소스로 공개한다고 소개합니다. 그러나 함께 공개한 라이선스는 Qwen Research License로, 연구와 평가 목적의 비상업적 이용만 허용합니다. 회사 업무나 판매용 콘텐츠에 쓰려면 Qwen 측에 별도 상업 라이선스를 요청해야 합니다. 이 모델로 다른 AI 모델을 만들어 배포할 때는 'Built with Qwen' 같은 표시도 필요합니다. 가중치를 내려받을 수 있다는 점과 자유롭게 사업에 쓸 수 있다는 점은 서로 다른 조건입니다.\n\n**성능 비교는 Qwen이 공개한 차트입니다**\nREADME 상단의 비교 차트에서 Qwen Image 2.1은 60.28점으로 일곱 번째입니다. 앞선 GPT Image 2.5, Grok Imagine 2.0 등 여섯 모델은 매개변수를 공개하지 않은 비공개 모델이고, 매개변수를 공개한 모델 가운데서는 가장 높은 점수이면서 크기가 가장 작은 편입니다. 평가 기준과 점수는 Qwen이 직접 공개한 값입니다. 지난 회차에서 다룬 ChatGPT Images 2.5와 같은 조건에서 비교한 결과는 아닙니다.\n\n**설치 없이 데모로 먼저 확인할 수 있습니다**\nHugging Face Space의 공식 데모에서 글로 이미지를 만들거나 최대 10장의 사진을 올려 편집해 볼 수 있습니다. 직접 실행하려면 Diffusers와 ComfyUI가 공개 당일부터 지원을 추가했으므로 이 도구에서 불러오면 됩니다. 필요한 GPU 메모리 용량은 공식 문서에 수치로 적혀 있지 않으며, 메모리가 부족하면 일부를 CPU로 옮기는 설정을 쓰도록 안내합니다.\n\n**실습: 제품 사진의 배경을 투명하게 바꾸고 유지된 부분을 확인합니다**\n직접 찍은 제품 사진 한 장을 데모에 올리고 '배경을 투명하게 만들고 제품의 색과 로고는 그대로 둔다'고 요청합니다. 결과 파일을 내려받아 배경이 실제로 투명한지, 제품의 글자와 색이 원본과 같은지 확인합니다. 이어서 다른 사진 두 장을 함께 넣어 '두 사진의 제품을 한 장면에 배치한다'고 요청하고, 각 제품의 형태가 유지됐는지 확인 기준으로 삼습니다. 업무용 결과물로 쓸 계획이라면 라이선스 조건을 먼저 확인해야 합니다.",
        "source": "https://github.com/QwenLM/Qwen-Image-2.1",
        "officialUrl": "https://github.com/QwenLM/Qwen-Image-2.1",
        "verifiedAt": "2026-09-23",
        "backupUrls": [
          {
            "label": "Hugging Face 공식 데모",
            "url": "https://huggingface.co/spaces/Qwen/Qwen-Image-2.1"
          },
          {
            "label": "Hugging Face 모델 카드",
            "url": "https://huggingface.co/Qwen/Qwen-Image-2.1"
          },
          {
            "label": "라이선스 원문(비상업 연구용)",
            "url": "https://github.com/QwenLM/Qwen-Image-2.1/blob/main/LICENSE"
          },
          {
            "label": "ComfyUI용 가중치",
            "url": "https://huggingface.co/Comfy-Org/Qwen-Image-2.1"
          }
        ],
        "thumbnail": {
          "src": "/og-cache/ab-20260924-qwen-image.png",
          "alt": "검은 배경의 막대그래프로, 위쪽은 이미지 생성 모델들의 총점을, 아래쪽은 매개변수 수를 비교합니다. Qwen Image 2.1은 60.28점으로 일곱 번째에 강조되어 있고 매개변수는 7B로 표시됩니다. 앞선 여섯 모델은 매개변수가 공개되지 않았다는 자물쇠 표시가 붙어 있습니다.",
          "caption": "Qwen 팀이 저장소 README 상단에 실은 자체 비교 차트입니다. 평가 기준과 점수는 Qwen이 공개한 값입니다."
        },
        "tags": [
          "2026-09b",
          "Alibaba Qwen",
          "활용 가이드"
        ],
        "en": {
          "title": "Qwen-Image-2.1: downloadable weights for image generation and editing",
          "deck": "Transparent output and up to ten reference images; commercial use needs a separate license.",
          "summary": "Alibaba's Qwen team released weights for Qwen-Image-2.1 on September 20, a single model for image generation and editing. Its 7B visual generator supports transparent backgrounds, editing with up to ten reference images and 2K output. The license permits non-commercial research and evaluation only.",
          "content": "Qwen-Image-2.1 handles text-to-image generation and image editing in one model with a 7B-parameter visual generator. It can output transparent (RGBA) images, edit transparent layers, extract subjects from photos, and edit with up to ten reference images marked by circles, painted annotations or masks. The default size is 2048x2048, with several 2K aspect ratios.\n\nThe README calls the release open source, but the accompanying Qwen Research License allows use for non-commercial research or evaluation purposes only. Commercial use requires a separate license from Qwen, and models built with it must display 'Built with Qwen' or similar.\n\nIn Qwen's own README chart the model scores 60.28 and ranks seventh; the six models ahead of it do not disclose parameter counts. These are Qwen's figures, not a like-for-like comparison with ChatGPT Images 2.5.\n\nThe official Hugging Face Space lets you try generation and editing without installing anything. Diffusers and ComfyUI added support on launch day. No specific GPU memory figure is documented; CPU offloading is suggested for limited memory.\n\n**Practice:** upload a product photo, ask for a transparent background while keeping colours and logo unchanged, then check the downloaded file. Check the license before using results commercially."
        },
        "releaseScope": "가중치 공개 · 비상업 라이선스"
      },
      "sourceWeek": "2026-w38",
      "sourceCompany": "Alibaba Qwen",
      "editorial": "가중치를 내려받을 수 있는 모델과 자유롭게 사업에 쓸 수 있는 모델의 차이를 라이선스 원문으로 확인합니다."
    }
  ],
  "modelWatch": [
    {
      "title": "Claude Cowork가 채팅과 하나로 합쳐졌습니다",
      "slug": "claude-cowork-in-chat",
      "deck": "짧은 질문과 오래 걸리는 위임 작업을 같은 대화에서 처리합니다.",
      "category": "업무 도구 · 제품 통합",
      "sourceUrl": "https://claude.com/blog/cowork-is-now-claude",
      "sourceLabel": "공식 발표",
      "summary": "Anthropic이 9월 16일 별도 제품이던 Cowork를 Claude 채팅에 통합했습니다. Pro·Max 요금제부터 몇 주에 걸쳐 적용되며, 문서와 발표자료를 만드는 Claude Docs·Slides도 함께 베타로 공개됐습니다.",
      "body": "**작업을 어디에 맡길지 고르는 단계가 사라졌습니다**\nAnthropic은 9월 16일 Claude Cowork와 채팅을 하나의 Claude로 합친다고 발표했습니다. 큰 작업은 Cowork, 시각 작업은 Design으로 나뉘어 있었는데, 사용자들이 작업을 어느 쪽에 맡길지 고르는 일과 한쪽에서 시작한 작업이 다른 쪽으로 이어지지 않는 점을 불편하게 여겼다는 설명입니다. 같은 날 문서를 함께 쓰는 Claude Docs와 발표자료 초안을 만드는 Claude Slides가 공개됐고, Design도 대화 안에서 쓸 수 있게 됐습니다. 세 기능은 유료 요금제의 베타입니다.\n\n**기존 Cowork 작업은 그대로 남습니다**\nPro·Max 요금제의 웹·데스크톱·모바일 앱에 몇 주에 걸쳐 적용되며 따로 켤 설정은 없습니다. Team과 Free 요금제는 뒤이어 적용되고, Enterprise 관리자에게는 변경 30일 전까지 안내한다고 밝혔습니다. Cowork에서 만든 대화·프로젝트·아티팩트·커넥터·스킬은 그대로 유지됩니다.\n\n**권한과 확인 방식은 사용자가 정합니다**\n기본 설정에서 Claude는 작업을 실행하기 전에 사용자에게 묻습니다. 필요할 때만 확인을 요청하도록 바꿀 수 있지만 최종 결정은 사용자에게 남습니다. 발표 글은 월요일마다 주간 보고서와 요약 슬라이드 다섯 장을 자동으로 준비하는 예시를 소개합니다. 보고서를 직접 만들던 업무 하나를 골라 완료 조건과 확인 시점을 먼저 정한 뒤 맡기면, 결과물이 조건을 지켰는지 확인할 기준이 생깁니다.",
      "tags": [
        "Anthropic",
        "Claude",
        "업무 위임"
      ],
      "tier": "normal",
      "thumbnail": {
        "src": "/og-cache/ab-20260924-cowork.svg",
        "alt": "크림색 배경에 이젤 위 캔버스를 손그림 선으로 그린 Anthropic 일러스트",
        "caption": "Anthropic이 Cowork 통합 발표 글 상단에 실은 일러스트입니다."
      }
    }
  ],
  "editorsPicks": [
    {
      "title": "Graft, 코딩 에이전트가 저장소 구조를 먼저 알고 시작하게 합니다",
      "slug": "graft-coding-agent-context",
      "deck": "Claude Code·Codex·Cursor·Gemini에 코드베이스 지도를 연결하는 MIT 공개 도구입니다.",
      "subtitle": "공개 도구 · 바로 설치",
      "category": "공개 도구 · 코딩 에이전트",
      "sourceUrl": "https://github.com/trailhq/Graft",
      "sourceLabel": "공식 저장소",
      "guideUrl": "https://github.com/trailhq/Graft/blob/main/LICENSE",
      "guideLabel": "코드 사용 조건",
      "summary": "코딩 에이전트가 매번 파일을 뒤지며 저장소 구조를 다시 파악하는 비용을 줄이는 도구입니다. 한 번 만든 코드 지도를 저장소 안의 마크다운 파일로 두고 에이전트가 필요한 부분만 읽게 합니다.",
      "body": "**저장소 구조를 한 번 정리해 두고 에이전트가 읽게 합니다**\n코딩 에이전트는 새 대화를 시작할 때마다 파일을 검색하고 열어 보며 저장소 구조를 다시 파악합니다. Graft는 이 이해를 한 번 만들어 저장소 안에 서로 연결된 마크다운 파일 묶음으로 저장합니다. 시스템·API·개념마다 파일이 하나씩 생기고, 에이전트는 다른 파일을 읽을 때와 같은 방식으로 이 파일을 열고 따라갑니다. 벡터 검색이나 별도 서버를 쓰지 않습니다. TypeScript·Python·Go·Java 등 23개 언어를 지원하며, 9월 22일 배포된 0.19.0이 현재 버전입니다.\n\n**설치는 두 줄이고, 파일을 쓰기 전에 대상을 고릅니다**\nNode.js 20 이상에서 `npm install -g @nanonets/graft`로 설치하고 저장소 폴더에서 `graft init`을 실행합니다. 전역 설치를 원하지 않으면 `npx @nanonets/graft init`을 씁니다. init은 연결할 에이전트를 고르기 전까지 아무 파일도 쓰지 않으며, `graft init --dry-run`으로 바뀔 파일 목록을 먼저 볼 수 있습니다. 연결 대상은 Claude Code, Codex 같은 AGENTS.md 기반 도구, Cursor, Gemini, Copilot, Grok, Windsurf, Kiro 등입니다. 저장소는 NanoNets의 context-graph-engine에서 trailhq/Graft로 옮겨졌고, npm 패키지 이름에는 이전 이름이 남아 있습니다.\n\n**접근 범위: 기본 기능은 내 컴퓨터 안에서만 동작합니다**\n코드 지도를 만드는 `graft build`와 조회 명령은 로컬 구문 분석만 사용하며 모델을 호출하지 않습니다. 생성된 graft 폴더는 .gitignore에 추가되고, 저장소에 커밋되는 것은 에이전트 설정 파일에 들어가는 연결 부분뿐입니다. 파일 요약을 더하는 `graft build --deep`을 쓸 때만 사용자가 직접 지정한 모델 제공자와 API 키로 코드 요약 요청이 전송됩니다. 익명 사용 통계는 하루 한 번 전송되며 코드·파일 경로·저장소 이름은 포함하지 않는다고 밝히고 있고, `graft telemetry disable` 또는 DO_NOT_TRACK=1로 끌 수 있습니다. Codex를 연결 대상으로 고르면 사용자 폴더의 ~/.codex 설정도 바뀌어 모든 저장소에 적용되므로, 원하지 않으면 `--no-global`을 붙입니다. 권한을 넓히기 전에 dry-run 결과를 확인하는 것이 안전합니다.\n\n**실습: 같은 질문으로 연결 전후의 탐색 횟수를 비교합니다**\n개발사는 최대 4배 저렴하고 3배 빠르다고 소개하고, 자체 SWE-bench Verified 50건 시험에서 해결률이 54%에서 66%로 올랐다고 밝혔습니다. 모두 개발사가 직접 측정한 결과입니다. 자신의 저장소에서 '결제 처리는 어디서 시작되나요?'처럼 구조를 묻는 질문 하나를 정해, Graft 연결 전후로 같은 에이전트에 물어보십시오. 에이전트가 연 파일 수, 도구 호출 횟수, 답변이 실제 코드 위치와 맞는지를 기록하면 효과를 직접 확인할 수 있습니다.",
      "editorial": "모델 가격이 내려간 뒤에도 남는 비용인 '저장소를 다시 읽는 비용'을 줄이는 방법을 봅니다.",
      "tags": [
        "공개 도구",
        "MIT",
        "실습 제안"
      ],
      "tier": "feature",
      "thumbnail": {
        "src": "/og-cache/ab-20260924-graft.png",
        "alt": "터미널에서 npm install -g @nanonets/graft와 graft init을 실행한 뒤 claude를 열면 'Graft is active' 안내와 함께 하단 상태 표시줄에 402 nodes / 977 edges, 79% enriched, synced가 표시되는 화면",
        "caption": "Graft 저장소 README에 실린 설치 후 Claude Code 연결 화면입니다."
      }
    },
    {
      "title": "AuK, 목소리 생성부터 편집·잡음 제거까지 하는 Tencent 음성 모델",
      "slug": "auk-open-speech-model",
      "deck": "코드와 가중치는 MIT로 공개됐고, 공식 데모에서 설치 없이 들어 볼 수 있습니다.",
      "subtitle": "공개 도구 · 데모로 먼저 체험",
      "category": "공개 도구 · 음성 AI",
      "sourceUrl": "https://github.com/Tencent-Hunyuan/AuK",
      "sourceLabel": "공식 저장소",
      "guideUrl": "https://github.com/Tencent-Hunyuan/AuK/blob/main/LICENSE",
      "guideLabel": "코드 사용 조건",
      "summary": "하나의 모델에 글로 지시해 음성 생성, 말한 내용 수정, 잡음 제거, 목소리 분리를 처리합니다. GPT-Live-1 같은 서비스형 음성 API와 달리 가중치를 내려받아 직접 실행할 수 있습니다.",
      "body": "**음성 작업 여러 가지를 한 모델에 글로 지시합니다**\nTencent Hunyuan은 9월 9일 15억 파라미터 규모의 음성 생성·편집 모델 AuK의 코드와 가중치를 공개했습니다. 참고 음성의 목소리로 문장을 읽는 음성 생성, 목소리 설명만으로 새 목소리를 만드는 생성, 이미 녹음된 말의 단어를 바꾸거나 넣고 빼는 편집, 말투와 감정 같은 표현 편집, 잡음 제거와 목소리 분리를 모두 자연어 지시 하나로 처리합니다. 4단계만 계산하는 경량판 AuK-Flash도 함께 공개됐습니다. README의 성능 비교는 Tencent가 직접 측정한 결과입니다.\n\n**설치 없이 공식 데모에서 먼저 확인합니다**\nHugging Face와 ModelScope의 공식 데모 화면에서 바로 들어 볼 수 있습니다. 공식 지시문 예시는 영어와 중국어로만 제공되며, 한국어 지원 여부는 공식 문서에 적혀 있지 않습니다. 한국어로 쓰려면 짧은 문장으로 발음과 억양을 먼저 확인해야 합니다. 직접 실행하려면 Python 3.10 환경에서 저장소를 내려받아 `uv pip install -e .`로 설치하고 `hf download tencent/AuK`로 가중치를 받습니다. Tencent가 측정한 GPU 메모리 최대 사용량은 약 25GiB이고 CPU 오프로딩을 켜면 약 17GiB이며, Apple Silicon용 MLX 실행은 별도 브랜치에서 지원합니다.\n\n**접근 범위와 사용 조건을 먼저 확인해야 합니다**\n기본 음성 처리는 가중치를 내려받은 뒤 내 컴퓨터 안에서 실행되며, 공식 문서에 사용 통계 전송 기능은 없습니다. 자유 형식 지시를 다듬는 Prompt Enhancer와 클라우드 음성 인식을 켜면 지시문과 음성이 사용자가 지정한 외부 API로 전송되므로, 민감한 녹음은 로컬 음성 인식만 쓰는 편이 안전합니다. 라이선스는 AuK의 코드와 가중치에 대해 MIT입니다. 다만 실행할 때 함께 불러오는 인코더 Qwen2.5-Omni-3B는 연구와 평가 목적의 비상업적 이용만 허용하는 Qwen Research License를 따르므로, 업무나 판매용으로 쓰기 전에 두 라이선스를 모두 확인해야 합니다. 다른 사람의 목소리를 참고 음성으로 쓸 때는 본인 동의를 받아야 합니다.\n\n**실습: 내 녹음의 잡음을 지우고 단어 하나만 고쳐 봅니다**\n본인 목소리로 짧은 문장을 녹음해 데모에 올리고, 먼저 배경 잡음 제거를 요청합니다. 이어서 같은 녹음에서 단어 하나만 다른 단어로 바꾸도록 지시하고, 바뀐 부분 앞뒤의 목소리와 억양이 자연스럽게 이어지는지 들어 봅니다. 원본과 결과를 나란히 두고 바꾸지 않은 구간이 그대로인지 확인하면, 음성 편집을 업무에 쓸 수 있는 범위를 판단할 수 있습니다.",
      "editorial": "서비스형 음성 API인 GPT-Live-1과 함께, 내려받아 쓰는 음성 모델의 가능성과 사용 조건을 비교합니다.",
      "tags": [
        "공개 도구",
        "MIT",
        "실습 제안"
      ],
      "tier": "feature",
      "thumbnail": {
        "src": "/og-cache/ab-20260924-auk.png",
        "alt": "흰 배경에 'Tencent-Hunyuan/AuK' 저장소 이름과 'AuK: An Open-Source Foundational Model for Speech Generation and Editing' 설명, 기여자·이슈·별·포크 수, 파란 원형 로고가 표시된 GitHub 저장소 공유 이미지",
        "caption": "GitHub가 AuK 저장소에 제공하는 공유 이미지입니다. README 첫 이미지인 벤치마크 차트는 파일 용량이 커서 이 이미지를 사용했습니다.",
        "provenance": "source-share-preview"
      }
    }
  ]
};
