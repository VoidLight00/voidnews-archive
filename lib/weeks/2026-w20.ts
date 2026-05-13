import type { WeeklyData } from "../data";

export const week20: WeeklyData = {
  week: 20,
  year: 2026,
  slug: "2026-w20",
  period: "5/07 ~ 5/14",
  totalPosts: 6,
  companies: [
    {
      name: "Google / Android",
      color: "#4285F4",
      posts: [
        {
          date: "5/12",
          platform: "X",
          title: "Google Gemini Intelligence for Android — 스마트폰 OS가 AI 실행 레이어가 되는 전환",
          summary: "Google이 Android를 operating system에서 intelligence system으로 확장하며 Gemini를 앱, 브라우저, 위젯, 자동완성, 개인 맥락 안에 넣기 시작했습니다. 핵심은 AI 앱을 하나 더 여는 것이 아니라, 매일 쓰는 스마트폰 OS가 여러 앱을 오가며 일을 처리하는 방향으로 이동한다는 점입니다.",
          content: "**이게 뭐예요?**\nGoogle이 Android용 Gemini Intelligence를 발표했습니다. Android를 단순한 operating system이 아니라 intelligence system으로 확장하겠다는 방향입니다. Gemini가 앱 사이를 오가며 여러 단계 작업을 처리하고, Chrome에서 웹 내용을 요약·비교·정리하며, 말로 한 내용을 Rambler가 정돈된 메시지로 바꿔주는 식입니다.\n\n**무엇이 달라졌나?**\n중요한 변화는 AI가 별도 앱으로만 존재하지 않는다는 점입니다. Create My Widget은 자연어로 맞춤 위젯을 만들고, Personal Intelligence 기반 Autofill은 사용자 맥락을 바탕으로 입력을 도와줍니다. 브라우저, 메시지, 위젯, 자동완성처럼 이미 매일 쓰는 표면에 Gemini가 들어갑니다.\n\n**어떻게 읽을까?**\n스마트폰은 이미 가장 자주 쓰는 컴퓨터입니다. 여기에 에이전트형 AI가 들어오면 사용자는 앱을 하나씩 여는 대신, 원하는 일을 말하고 OS가 필요한 앱과 정보를 연결하는 경험을 하게 됩니다. 학생 입장에서는 '내가 매일 쓰는 폰 안에 작업자가 들어온다'로 이해하면 가장 직관적입니다.\n\n**읽을 때 볼 점**\nGoogle은 Samsung Galaxy와 Google Pixel을 중심으로 2026년 여름부터 순차 적용한다고 설명합니다. 실제 사용 가능 여부는 기기, 지역, 언어, 개인정보 설정에 따라 달라질 수 있으므로 발표 내용과 내 기기에서 켜지는 기능을 구분해서 확인하는 편이 좋습니다.",
          source: "https://blog.google/products-and-platforms/platforms/android/gemini-intelligence/",
          officialUrl: "https://blog.google/products-and-platforms/platforms/android/gemini-intelligence/",
          backupUrls: [
            {
              label: "Android Show I/O Edition",
              url: "https://www.android.com/new-features-on-android/io-2026/"
            }
          ],
          tags: ["Google", "Gemini", "Android", "에이전트자동화", "공식"],
          featured: true
        },
        {
          date: "5/12",
          platform: "X",
          title: "Googlebook — Gemini Intelligence를 전제로 설계한 AI 노트북",
          summary: "Googlebook은 Android와 ChromeOS를 Gemini Intelligence 중심으로 결합한 새 노트북 카테고리입니다. Magic Pointer, 자연어 위젯, Gmail·Calendar·웹 검색 연결, Android phone 앱·파일 연동을 통해 노트북 사용 방식 자체를 AI 중심으로 재설계하려는 시도입니다.",
          content: "**이게 뭐예요?**\nGoogle이 Googlebook을 발표했습니다. 기존 Chromebook의 단순 후속이라기보다, Android와 ChromeOS를 Gemini Intelligence 중심으로 결합한 AI 노트북 카테고리에 가깝습니다. Acer, ASUS, Dell, HP, Lenovo가 파트너로 언급됐고, 출시 시점은 2026년 가을로 예고됐습니다.\n\n**무엇이 달라졌나?**\nMagic Pointer는 화면 요소를 가리키면 Gemini가 맥락에 맞는 제안을 해주는 기능입니다. Create your Widget은 Gmail, Calendar, 웹 검색 같은 개인 정보 흐름을 묶어 자연어로 대시보드를 만드는 방향입니다. Android phone의 앱과 파일도 노트북 안에서 자연스럽게 연결됩니다.\n\n**어떻게 읽을까?**\nAI가 앱 안의 버튼 하나가 아니라 하드웨어 사용 방식 자체를 바꾸기 시작했다는 예시입니다. 지금까지 노트북은 사용자가 앱을 열고 창을 옮기며 작업을 조립하는 장치였다면, Googlebook은 Gemini가 그 조립 과정을 더 많이 맡는 장치로 설계됩니다.\n\n**읽을 때 볼 점**\n아직 바로 살 수 있는 제품이라기보다 2026년 가을 출시 예정 카테고리입니다. 실제 성능, 가격, 파트너별 사양, 학교·업무 계정에서의 관리 정책은 출시 시점에 다시 확인해야 합니다.",
          source: "https://blog.google/products-and-platforms/platforms/android/meet-googlebook/",
          officialUrl: "https://blog.google/products-and-platforms/platforms/android/meet-googlebook/",
          backupUrls: [
            {
              label: "Android Show I/O Edition",
              url: "https://www.android.com/new-features-on-android/io-2026/"
            }
          ],
          tags: ["Google", "Googlebook", "Gemini", "노트북", "공식"],
          featured: true
        }
      ]
    },
    {
      name: "OpenAI",
      color: "#10A37F",
      posts: [
        {
          date: "5/08",
          platform: "X",
          title: "OpenAI Running Codex safely — 코딩 에이전트에게 일을 맡길 때 필요한 경계 설계",
          summary: "OpenAI가 Codex를 안전하게 운영하기 위한 내부 원칙을 공개했습니다. 핵심은 에이전트를 open-ended outbound access로 풀어두지 않고, 네트워크 정책, 승인 규칙, 자격증명 저장, 위험 명령 분리, 관측 로그를 함께 설계하는 것입니다.",
          content: "**이게 뭐예요?**\nOpenAI가 Codex를 안전하게 운영하는 방법을 공개했습니다. 코딩 에이전트가 강해질수록 중요한 것은 프롬프트 한 줄보다 어떤 권한 안에서, 어떤 네트워크로, 어떤 명령을 실행하게 할지 정하는 운영 설계입니다.\n\n**무엇이 달라졌나?**\nCodex를 아무 도메인에나 접근 가능한 open-ended outbound access로 돌리지 않고 managed network policy 안에서 운영합니다. 예상 가능한 목적지는 허용하고, 낯선 도메인은 승인을 요구하는 식입니다. CLI와 MCP OAuth 자격증명은 OS keyring에 저장하고, 일반 개발 명령과 위험 명령을 구분합니다.\n\n**어떻게 읽을까?**\n코딩 에이전트 시대의 실력은 'AI에게 빨리 시키기'만이 아닙니다. 목표, 권한, 네트워크, 승인 규칙, 로그를 나눠서 설계해야 합니다. Claude Code, Codex, Cursor 같은 도구를 쓸 때도 이 원칙은 그대로 적용됩니다.\n\n**읽을 때 볼 점**\nOpenTelemetry로 tool approval, execution result, MCP usage, network allow/deny 이벤트를 관측한다는 점이 중요합니다. 에이전트에게 일을 맡겼다면 결과 파일만 볼 것이 아니라, 어떤 권한 요청과 실행 경로를 거쳤는지도 함께 봐야 합니다.",
          source: "https://openai.com/index/running-codex-safely/",
          officialUrl: "https://openai.com/index/running-codex-safely/",
          tags: ["OpenAI", "Codex", "코딩에이전트", "보안운영", "공식"],
          featured: true
        },
        {
          date: "5/08",
          platform: "X",
          title: "OpenAI GPT-5.5-Cyber — 강력한 사이버 모델을 신뢰 기반 접근으로 제한하는 방식",
          summary: "OpenAI가 GPT-5.5-Cyber를 Trusted Access for Cyber 프레임워크 아래 제한적 preview로 제공한다고 밝혔습니다. 핵심은 고성능 모델을 누구에게나 열어두는 것이 아니라, 검증된 방어팀과 중요 인프라 보안 담당자에게 신원·계정 보안·접근 통제를 붙여 제공하는 방식입니다.",
          content: "**이게 뭐예요?**\nOpenAI가 GPT-5.5-Cyber를 Trusted Access for Cyber 프레임워크 아래 제한적 preview로 제공한다고 발표했습니다. 사이버 보안에 특화된 고성능 모델을 일반 공개가 아니라 검증된 방어자 중심으로 제공하는 흐름입니다.\n\n**무엇이 달라졌나?**\n중요한 것은 모델 성능 자체보다 접근 방식입니다. OpenAI는 신원과 신뢰 기반 접근, Advanced Account Security, 접근 통제를 함께 강조합니다. 중요 인프라 보안 담당자와 검증된 방어팀처럼 책임 있는 사용 맥락이 있는 조직을 중심으로 다루는 구조입니다.\n\n**어떻게 읽을까?**\n강력한 AI 모델은 기능 공개만으로 끝나지 않습니다. 누가, 어떤 목적과 책임 아래, 어떤 계정 보안 조건으로 접근할 수 있는지가 함께 중요해집니다. AI 보안은 더 강한 모델을 쓰는 문제가 아니라, 접근권과 사용 맥락을 설계하는 문제로 이동하고 있습니다.\n\n**읽을 때 볼 점**\n이 주제는 방어, 접근 통제, 계정 보안, 책임 있는 사용의 관점에서 읽어야 합니다. 실제 교육이나 업무에서는 공격 절차가 아니라 조직이 고성능 모델을 어떤 승인 체계와 감사 가능성 아래 둘 것인지가 핵심입니다.",
          source: "https://openai.com/index/gpt-5-5-with-trusted-access-for-cyber/",
          officialUrl: "https://openai.com/index/gpt-5-5-with-trusted-access-for-cyber/",
          backupUrls: [
            {
              label: "Trusted Access for Cyber Defense",
              url: "https://openai.com/index/scaling-trusted-access-for-cyber-defense/"
            }
          ],
          tags: ["OpenAI", "GPT-5.5-Cyber", "사이버방어", "접근통제", "공식"],
          featured: true
        }
      ]
    },
    {
      name: "GitHub / Microsoft",
      color: "#24292F",
      posts: [
        {
          date: "4/27",
          platform: "X",
          title: "GitHub Copilot usage-based billing — AI 코딩 도구가 비용 거버넌스 대상이 되는 전환",
          summary: "GitHub Copilot이 2026년 6월 1일부터 usage-based billing 구조로 이동합니다. Copilot Chat, CLI, cloud agent, Spaces, Spark, third-party coding agents 같은 사용이 AI Credits 소비와 연결되며, AI 코딩 도구 선택에도 비용 기준이 더 중요해집니다.",
          content: "**이게 뭐예요?**\nGitHub Copilot이 usage-based billing 구조로 이동합니다. 2026년 6월 1일부터 여러 Copilot 기능이 AI Credits 사용량과 연결됩니다. 코드 자동완성과 next-edit suggestions는 유료 플랜에서 계속 포함되지만, 더 강한 에이전트형 기능은 사용량 관리 대상이 됩니다.\n\n**무엇이 달라졌나?**\nCopilot Chat, CLI, cloud agent, Spaces, Spark, third-party coding agents 같은 기능이 credit 소비와 연결됩니다. AI 코딩 도구가 정액제 느낌의 보조 도구에서, 사용량을 추적하고 예산을 배분해야 하는 운영 자원으로 바뀌는 장면입니다.\n\n**어떻게 읽을까?**\n앞의 Codex safety가 권한과 보안의 문제라면, Copilot billing은 비용의 문제입니다. 좋은 모델을 많이 쓰는 것보다 어떤 작업을 어떤 모델과 에이전트에 맡길지 기준을 세우는 것이 중요해집니다.\n\n**읽을 때 볼 점**\n팀 단위로 쓰는 경우에는 사용량 한도, 예산 알림, 사용자별 소비 추적을 먼저 확인해야 합니다. 코딩 에이전트를 교육이나 업무에 붙일 때도 성능, 보안, 비용을 함께 보는 습관이 필요합니다.",
          source: "https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/",
          officialUrl: "https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/",
          backupUrls: [
            {
              label: "GitHub Docs",
              url: "https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/prepare-for-your-move-to-usage-based-billing"
            },
            {
              label: "Copilot code review billing changelog",
              url: "https://github.blog/changelog/2026-04-27-github-copilot-code-review-will-start-consuming-github-actions-minutes-on-june-1-2026/"
            }
          ],
          tags: ["GitHub", "Copilot", "AI Credits", "비용관리", "공식"],
          featured: true
        }
      ]
    },
    {
      name: "Perplexity",
      color: "#7C3AED",
      posts: [
        {
          date: "5/04",
          platform: "X",
          title: "Perplexity Computer enterprise updates — 기업 데이터와 반복 업무를 연결하는 Computer 흐름",
          summary: "Perplexity Computer가 Snowflake·Databricks 연결, Space skills, Workflows, admin controls를 강화했습니다. Google이 OS와 기기 레벨에서 Gemini를 실행 레이어로 만들고 있다면, Perplexity는 기업 데이터와 반복 업무 레벨에서 Computer를 만들고 있습니다.",
          content: "**이게 뭐예요?**\nPerplexity가 Computer의 enterprise 업데이트를 공개했습니다. Snowflake와 Databricks 연결, Space skills, Workflows, admin controls가 핵심입니다. 기업 안의 데이터와 반복 업무를 Computer가 직접 다루게 하려는 방향입니다.\n\n**무엇이 달라졌나?**\nSpace skills는 팀이 반복해서 쓰는 능력을 패키지처럼 저장하는 방식입니다. Workflows는 market research, sales prep, slide creation, website audits/building처럼 반복 업무를 실행 흐름으로 묶습니다. admin controls는 semantic-layer edits와 권한 관리를 다룹니다.\n\n**어떻게 읽을까?**\n이번 회차의 Google 소식과 비교하면 흐름이 선명합니다. Google은 스마트폰 OS와 노트북이라는 개인 기기 레벨에서 Gemini를 실행 레이어로 만들고 있습니다. Perplexity는 기업 데이터와 반복 업무 레벨에서 Computer를 만들고 있습니다.\n\n**읽을 때 볼 점**\n기업 업무에 AI를 붙일 때는 모델 성능보다 데이터 연결 권한, 관리자의 통제, 반복 작업의 패키징 방식이 중요해집니다. 실제 도입 전에는 Snowflake·Databricks 연결 권한과 팀별 데이터 접근 정책을 먼저 확인해야 합니다.",
          source: "https://www.perplexity.ai/changelog/improved-computer-models-and-enterprise-updates---may-4-2026",
          officialUrl: "https://www.perplexity.ai/changelog/improved-computer-models-and-enterprise-updates---may-4-2026",
          tags: ["Perplexity", "Computer", "Enterprise", "Workflows", "공식"],
          featured: true
        }
      ]
    }
  ]
};
