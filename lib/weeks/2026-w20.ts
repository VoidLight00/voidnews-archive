import type { WeeklyData } from "../data";

export const week20: WeeklyData = {
  week: 20,
  year: 2026,
  slug: "2026-w20",
  period: "5/07 ~ 5/14",
  totalPosts: 8,
  companies: [
    {
      name: "Anthropic / Claude",
      color: "#E87040",
      posts: [
        {
          date: "5/07",
          platform: "X",
          title: "Anthropic Natural Language Autoencoders — Claude의 내부 추론을 자연어로 읽는 연구",
          summary: "Anthropic이 Natural Language Autoencoders 연구를 공개했습니다. 모델 내부 activation을 사람이 읽을 수 있는 자연어 설명으로 바꿔, Claude가 평가 상황을 어떻게 인식하는지와 숨은 동기를 더 잘 감사할 수 있게 하려는 interpretability 흐름입니다.",
          content: "**이게 뭐예요?**\nAnthropic이 Natural Language Autoencoders 연구를 공개했습니다. 모델 내부 activation을 자연어 설명으로 바꿔, Claude가 어떤 단서와 동기를 바탕으로 답을 만드는지 더 읽기 쉽게 보려는 interpretability 연구입니다.\n\n**무엇이 달라졌나?**\n기존 interpretability가 뉴런·feature·activation 같은 기술 단서를 사람이 해석해야 했다면, 이번 접근은 모델 내부 상태를 자연어 설명으로 압축합니다. Anthropic은 이 방식으로 안전성 평가에서 모델이 평가받는 상황을 인식하거나, 겉으로 말하지 않은 동기를 드러내는 사례를 더 잘 찾을 수 있었다고 설명합니다.\n\n**어떻게 읽을까?**\nAI 안전은 결과 답변만 검수하는 문제에서 내부 추론과 숨은 동기까지 감사하는 방향으로 확장되고 있습니다. 강한 모델을 제품에 넣을수록, 답이 맞는지뿐 아니라 왜 그렇게 답했는지 추적하는 기술이 함께 필요해집니다.\n\n**읽을 때 볼 점**\nNatural Language Autoencoders는 감사 도구이지 완전한 마음 읽기가 아닙니다. Anthropic도 hallucination과 계산 비용 한계를 함께 언급하므로, 이 연구는 모델 내부를 더 잘 보는 한 방법으로 읽는 편이 안전합니다.",
          source: "https://www.anthropic.com/research/natural-language-autoencoders",
          officialUrl: "https://www.anthropic.com/research/natural-language-autoencoders",
          backupUrls: [
            {
              label: "Full paper",
              url: "https://transformer-circuits.pub/2026/nla/index.html"
            },
            {
              label: "GitHub",
              url: "https://github.com/kitft/natural_language_autoencoders"
            },
            {
              label: "공식 YouTube",
              url: "https://www.youtube.com/watch?v=j2knrqAzYVY"
            },
            {
              label: "공식 X",
              url: "https://x.com/AnthropicAI/status/2052435436157452769"
            }
          ],
          tags: ["Anthropic", "Claude", "Interpretability", "AI안전", "공식"],
          featured: true
        },
        {
          date: "5/11",
          platform: "X",
          title: "Claude Code Agent View + /goal — 코딩 에이전트가 완료 조건을 따라 움직이는 구조",
          summary: "Claude Code 2.1.139에서 Agent View research preview와 /goal 명령이 공식 changelog에 추가됐습니다. 실행 중·차단됨·완료된 세션을 한 화면에서 보고, 목표 완료 조건을 정해 Claude가 여러 턴에 걸쳐 계속 작업하는 흐름입니다.",
          content: "**이게 뭐예요?**\nClaude Code 2.1.139에서 Agent View와 /goal 명령이 공식 changelog에 올라왔습니다. Agent View는 실행 중, 사용자 입력 대기, 완료된 Claude Code 세션을 한 목록에서 보는 기능이고, /goal은 완료 조건을 정해 Claude가 여러 턴에 걸쳐 그 조건을 만족할 때까지 작업하게 하는 명령입니다.\n\n**무엇이 달라졌나?**\n/goal은 interactive, -p, Remote Control 모드에서 동작하고 elapsed time, turns, tokens를 overlay로 보여줍니다. 같은 주의 changelog에는 hook args 배열, PostToolUse continueOnBlock, MCP stdio의 CLAUDE_PROJECT_DIR, subagent 식별자 추적, subagent_type 매칭 개선도 함께 들어갔습니다.\n\n**어떻게 읽을까?**\n이 항목은 OpenAI Codex의 /goal 카드와 합치면 안 됩니다. 둘 다 '완료 조건을 에이전트 루프에 넣는다'는 같은 패턴을 보여주지만, 제품과 공식 출처가 다릅니다. 아카이브에서는 Claude Code 구현과 Codex 구현을 나란히 두고, 중복이 아니라 교차 트렌드로 읽는 것이 맞습니다.\n\n**읽을 때 볼 점**\n좋은 /goal은 단순 지시가 아니라 관측 가능한 완료 기준입니다. 예를 들어 수정 완료, 관련 테스트 통과, 회귀 없음, 문서 반영처럼 확인 가능한 조건을 넣어야 장기 작업에서 목표가 흐려지지 않습니다.",
          source: "https://code.claude.com/docs/en/changelog",
          officialUrl: "https://code.claude.com/docs/en/changelog",
          backupUrls: [
            {
              label: "Agent View 공식 문서",
              url: "https://code.claude.com/docs/en/agent-view"
            },
            {
              label: "GitHub Changelog",
              url: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
            },
            {
              label: "OpenAI Codex /goal 비교 카드",
              url: "/2026-w18/?post=OpenAI+Codex+CLI+%E2%80%94+%2Fgoal+%EC%8A%AC%EB%9E%98%EC%8B%9C+%EC%BB%A4%EB%A7%A8%EB%93%9C+%28%EB%82%B4%EC%9E%A5%ED%98%95+Ralph+Loop%2C+%EC%9E%A5%EA%B8%B0+%EC%9E%90%EC%9C%A8+%EC%BD%94%EB%94%A9%29"
            }
          ],
          tags: ["ClaudeCode", "Goal", "AgentView", "코딩에이전트", "공식"],
          featured: true
        },
        {
          date: "5/11",
          platform: "X",
          title: "Claude Platform on AWS — Anthropic-managed Claude API를 AWS 결제·IAM으로 쓰는 경로",
          summary: "Anthropic이 Claude Platform on AWS를 공개했습니다. AWS 계정의 결제와 IAM 인증을 쓰면서 Messages API, Files API, Message Batches, Managed Agents, Agent Skills, code execution, tool use를 Anthropic-managed infrastructure로 접근하는 구조입니다.",
          content: "**이게 뭐예요?**\nClaude Platform on AWS는 AWS 계정 안에서 Claude API와 플랫폼 기능을 쓰는 새 경로입니다. Amazon Bedrock처럼 AWS가 inference stack을 운영하는 방식이 아니라, Anthropic-managed infrastructure에 AWS 결제와 IAM 인증을 붙이는 구조입니다.\n\n**무엇이 달라졌나?**\nMessages API, Files API, Message Batches API, Claude Managed Agents, Agent Skills, code execution, tool use 같은 Claude Platform 기능을 AWS 경로로 접근할 수 있습니다. 기업 입장에서는 기존 AWS 조달, 결제, 권한 관리 흐름 안에서 Claude 기능을 붙이기 쉬워집니다.\n\n**어떻게 읽을까?**\nAI 도입은 모델 성능만으로 결정되지 않습니다. 결제, IAM, 데이터 처리 조건, 기존 클라우드 계약이 실제 도입 속도를 좌우합니다. Claude Platform on AWS는 Anthropic이 엔터프라이즈 배포와 구매 경로를 더 넓히는 움직임입니다.\n\n**읽을 때 볼 점**\n이 기능은 Amazon Bedrock과 다릅니다. 문서에 따르면 데이터가 항상 AWS 안에 머무르는 구조는 아니며, inference_geo나 Zero Data Retention 같은 조건은 별도로 확인해야 합니다.",
          source: "https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws",
          officialUrl: "https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws",
          backupUrls: [
            {
              label: "Claude Platform release notes",
              url: "https://platform.claude.com/docs/en/release-notes/overview"
            },
            {
              label: "Claude in Amazon Bedrock",
              url: "https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock"
            }
          ],
          tags: ["Anthropic", "ClaudePlatform", "AWS", "Enterprise", "공식"],
          featured: true
        },
        {
          date: "5/12",
          platform: "X",
          title: "Claude Opus 4.7 Fast mode — 같은 모델을 더 빠른 출력 속도로 쓰는 연구 preview",
          summary: "Anthropic이 Fast mode research preview를 Claude Opus 4.7까지 확장했습니다. fast-mode-2026-02-01 beta header와 speed: \"fast\"를 쓰면 같은 Opus 모델을 더 높은 output tokens per second로 호출할 수 있지만, premium pricing과 별도 rate limit이 붙습니다.",
          content: "**이게 뭐예요?**\nClaude Opus 4.7이 Fast mode research preview를 지원하게 됐습니다. API 요청에 fast-mode-2026-02-01 beta header와 speed: \"fast\"를 넣으면 같은 Claude Opus 4.7 모델을 더 빠른 출력 속도로 사용할 수 있습니다.\n\n**무엇이 달라졌나?**\nFast mode는 다른 작은 모델로 바꾸는 기능이 아니라 같은 모델의 더 빠른 inference configuration입니다. Anthropic은 output tokens per second가 최대 2.5배 빨라질 수 있다고 설명합니다. 대신 표준 Opus보다 높은 가격, 별도 rate limit, waitlist 기반 접근 조건이 붙습니다.\n\n**어떻게 읽을까?**\n에이전트형 코딩이나 긴 문서 생성에서는 모델 지능만큼 지연 시간도 중요합니다. Fast mode는 고성능 모델을 그대로 쓰면서 대기 시간을 줄이려는 방향입니다. 비용과 속도를 함께 설계해야 하는 엔터프라이즈 운영 이슈로 읽을 수 있습니다.\n\n**읽을 때 볼 점**\nFast mode는 Batch API나 Priority Tier와 함께 쓰지 못하고, Claude Platform on AWS에서도 사용할 수 없다고 문서가 밝힙니다. 빠르다는 장점만 보지 말고 가격, rate limit, 배포 경로 제약을 함께 확인해야 합니다.",
          source: "https://platform.claude.com/docs/en/build-with-claude/fast-mode",
          officialUrl: "https://platform.claude.com/docs/en/build-with-claude/fast-mode",
          backupUrls: [
            {
              label: "Claude Platform release notes",
              url: "https://platform.claude.com/docs/en/release-notes/overview"
            },
            {
              label: "Fast mode waitlist",
              url: "https://claude.com/fast-mode"
            }
          ],
          tags: ["Anthropic", "ClaudeOpus4.7", "FastMode", "API", "공식"],
          featured: true
        }
      ]
    },
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
  ]
};
