import type { WeeklyData } from "../data";

// 2026-w22 (5/22 ~ 5/28)
// 자동 생성: 4라운드 수집 + 5차 prune 기반 archive
// 주차 기준 목~수 (5/15 목 = 새 주차 시작)

export const week22: WeeklyData = {
  week: 22,
  year: 2026,
  slug: "2026-w22",
  period: "5/22 ~ 5/28",
  totalPosts: 45,
  companies: [
    {
      name: "OpenAI",
      color: "#10A37F",
      posts: [
        {
          date: "5/23",
          platform: "X+Threads",
          title: "OpenAI Codex Goal mode generally available",
          summary: "",
          content: `OpenAI가 2026년 5월 23일 ChatGPT 릴리스 노트를 통해 Codex의 Goal mode를 일반 출시했습니다. 그동안 enterprise 일부 워크스페이스와 베타 채널에만 열려 있던 기능이 ChatGPT Plus / Business / Enterprise 전 사용자에게 동시에 풀린다는 의미입니다.

핵심 사실:

- 출시 날짜: 2026년 5월 23일, ChatGPT 공식 release notes 페이지에 등재
- 적용 범위: Codex web · Codex CLI · ChatGPT 사이드바 Codex 패널 모두 동시
- Goal mode 작동 방식: 사용자가 \"이 저장소의 인증 흐름을 OAuth 2.1로 마이그레이션\" 같은 목표를 던지면 Codex가 스스로 plan → execute → self-review를 반복
- 무료 ChatGPT 사용자: 사용량 제한 안에서 일부 작업 시도 가능

### Goal mode가 기존 Codex와 어떻게 다른가

기존 Codex는 \"파일을 열고 prompt를 던지면 diff를 만든다\"는 단위로 움직였습니다. Goal mode는 그 위에 \"plan node\"를 한 겹 얹습니다. 사용자는 결과물의 목적만 묘사하고, Codex가 어떤 파일을 열고 어떤 PR을 잘라야 할지를 스스로 결정합니다. ChatGPT mobile · Codex desktop app과 짝을 이루는 기능으로, 이번 주 같이 발표된 Skills / Automations과 함께 \"Codex를 ChatGPT의 한 탭이 아니라 독립 워크스페이스로 분리\"하는 전략의 마지막 퍼즐입니다.

### 한국 팀 적용 시나리오

한국 개발팀이 가장 먼저 체감할 영역은 모놀리식 레거시의 점진 분해입니다. 사이즈가 큰 PR을 사람이 잘라야 했던 작업을, Goal mode에 \"이 모듈을 service 단위로 나누고 각 PR은 500줄 이하로\" 같은 조건으로 위임할 수 있습니다. 단, 자체 호스팅한 Bitbucket / GitLab과의 연동은 별도 connector가 필요하므로 GitHub 클라우드 사용 팀이 먼저 효과를 봅니다.

(출처: help.openai.com release notes, 2026.5.23)`,
          officialUrl: "https://help.openai.com/en/articles/6825453-chatgpts-release-notes",
          source: "https://help.openai.com/en/articles/6825453-chatgpts-release-notes",
          tags: ["Codex", "Goal mode", "공식"],
          slug: "openai-codex-goal-mode-generally-availab-62cd0085",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/openai-codex-goal-mode-generally-availab-62cd0085.png",
            alt: "OpenAI Codex Goal mode generally available",
          },
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "OpenAI named a Leader in enterprise coding agents by Gartner",
          summary: "",
          content: `OpenAI가 2026년 5월 22일 자사 index 페이지를 통해 Gartner 2026 Magic Quadrant for AI Code Assistants에서 \"Leader\" 사분면에 배치됐다고 발표했습니다. 같은 사분면에는 GitHub Copilot, Cursor가 함께 들어갔고, Anthropic Claude Code는 \"Visionaries\" 위치로 평가됐습니다.

핵심 사실:

- 보고서 발행: 2026년 5월 (Gartner Magic Quadrant for AI Code Assistants)
- OpenAI 배치: Leaders 사분면, \"Completeness of Vision\" 축에서 GitHub Copilot보다 우상단
- Gartner 평가 사유 (OpenAI 인용): enterprise governance, model breadth, Codex 자체 host 옵션
- 같은 주 Virgin Atlantic / 다른 enterprise case study와 동시 마케팅

### Magic Quadrant 한 줄을 어떻게 읽어야 하나

Gartner Magic Quadrant는 \"공식 순위\"가 아니라 두 축(Ability to Execute / Completeness of Vision) 위에 벤더를 그린 지도입니다. Leader 사분면 안에서도 우상단일수록 더 강하게 평가받고, OpenAI는 이번에 같은 사분면의 GitHub Copilot보다 우상단으로 매겨졌습니다. Microsoft Azure 의존성을 줄이려는 enterprise 구매팀이 \"OpenAI를 직접 채택할 명분\"으로 쓰기 좋은 자료입니다.

### 사분면 밖 신호

이 보고서에서 같은 카테고리에 들어가지 않은 도구들 — Cline, aider, Continue, Sourcegraph Cody — 의 부재가 더 흥미롭습니다. Gartner는 \"enterprise procurement이 가능한 벤더\"만 분석 대상으로 넣기 때문에, 오픈소스 도구는 평가 자체에서 빠집니다. 한국 팀이 이 보고서를 결재 자료로 쓸 때는 \"우리 기술 스택은 어차피 오픈소스 도구도 섞어 쓴다\"는 컨텍스트를 함께 첨부해야 의미가 맞습니다.

(출처: openai.com/index/gartner-2026-agentic-coding-leader, 2026.5.22)`,
          officialUrl: "https://openai.com/index/gartner-2026-agentic-coding-leader",
          source: "https://openai.com/index/gartner-2026-agentic-coding-leader",
          tags: ["Codex", "Enterprise coding agents", "공식"],
          slug: "openai-named-a-leader-in-enterprise-codi-1a8ac248",
          readMinutes: 1,
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "How Virgin Atlantic ships faster with Codex",
          summary: "",
          content: `OpenAI가 2026년 5월 22일 Virgin Atlantic의 Codex 도입 사례를 공식 index에 공개했습니다. 항공사 IT 조직이 \"실험\"이 아니라 \"표준 개발 도구\"로 Codex를 깐 첫 번째 publicly named 케이스입니다.

도입 윤곽:

- 대상 조직: Virgin Atlantic 엔지니어링 팀 (운영·예약·로열티 시스템 담당)
- 도입 채널: Codex CLI + ChatGPT Business workspace
- 측정 지표: PR 머지까지 시간 단축, 자동 테스트 커버리지 증가 (구체 수치는 OpenAI index 본문 참고)
- 워크플로우: 항공사 핵심 시스템 (booking, loyalty) 변경은 사람 review 필수, Codex가 plan/diff 초안만 담당

### 항공사 IT가 코딩 에이전트를 받아들이기 어려운 이유

항공권 예약·운임 계산·마일리지 시스템은 수십 년 누적된 비즈니스 로직 위에 있고, 한 줄을 바꿔도 회계 / 규제 / 운영팀의 검토 cycle이 붙습니다. Virgin Atlantic 케이스가 의미 있는 이유는 \"규제 산업도 sandbox된 영역부터 단계적으로 코딩 에이전트를 받을 수 있다\"는 사례를 publicly 제공했다는 점입니다. 같은 시기에 발표된 Codex app · Goal mode · Gartner Leader 배치가 이런 enterprise 영업 자료로 묶입니다.

### 한국 항공·금융 IT 시사점

한국에서도 대한항공, 아시아나, 주요 카드사가 비슷한 \"규제 + 레거시\" 환경에 있습니다. Virgin Atlantic이 핵심 시스템은 사람 review를 유지하고 Codex는 plan/diff 단계로 한정한 패턴은, 그대로 한국 enterprise PoC 설계로 옮길 수 있습니다. 첫 단계로 권할 만한 영역은 내부 도구·CI 스크립트·테스트 코드처럼 실패 비용이 낮은 곳입니다.

(출처: openai.com/index/virgin-atlantic, 2026.5.22)`,
          officialUrl: "https://openai.com/index/virgin-atlantic",
          source: "https://openai.com/index/virgin-atlantic",
          tags: ["Codex", "enterprise adoption", "공식"],
          slug: "how-virgin-atlantic-ships-faster-with-co-35f64cca",
          readMinutes: 1,
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "Work with Codex from anywhere — Codex in ChatGPT mobile",
          summary: "3차 보고서에는 TechCrunch만 있었는데 OpenAI 공식 index 게시물이 정확히 있음. 공식 URL로 교체.",
          content: `OpenAI가 2026년 5월 22일 \"Work with Codex from anywhere\"를 발표하면서 ChatGPT iOS / Android 앱 안에 Codex를 정식 통합했습니다. 같은 날 공개된 Codex desktop app · Skills · Automations과 함께, Codex를 \"브라우저 안의 한 화면\"에서 \"여러 디바이스에 걸친 작업 흐름\"으로 끌어올린 발표입니다.

핵심 변화:

- Codex가 ChatGPT iOS / Android 앱에서 정식 탭으로 노출
- 모바일에서 시작한 Codex 세션을 데스크톱 앱 · web에서 그대로 이어받음
- 모바일에서 PR 코멘트 응답, 빌드 실패 확인, Goal mode 작업 위임이 가능
- 코드 diff 미리보기 / Apply 기본 UX는 데스크톱에 맞춰져 있고, 모바일은 \"위임 + 모니터링\" 중심

### 모바일은 코딩 화면이 아니라 \"감독석\"

엄지손가락으로 코드를 직접 짜는 시나리오를 노린 발표가 아닙니다. 핵심은 \"내가 자리에 없을 때 Codex가 돌리고 있는 작업을 손에 들고 추적\"하는 것입니다. 빌드가 깨졌을 때 알림이 오고, 그 자리에서 Codex에게 \"새 plan\"을 주문할 수 있습니다. Anthropic Claude Code가 데스크톱 단일 환경에 머무는 사이, OpenAI는 디바이스 사이를 잇는 쪽으로 한 발 먼저 움직였습니다.

### Codex 7-day push 중에서 어디 위치인가

같은 주에 발표된 OpenAI의 Codex 관련 카드는 6개입니다. 이 카드는 데스크톱 앱 발표 직전, AWS Bedrock 등재(5/23) 이전에 자리합니다. 흐름은 \"플랫폼 확장(모바일 → 데스크톱 앱) → enterprise governance(Gartner / Virgin Atlantic / Bedrock) → 기능 확장(Skills / Automations / Goal mode GA)\"으로 읽힙니다.

### 한국 팀에서 바로 적용 가능한 시나리오

출퇴근 지하철에서 PR 코멘트 응답, 미팅 사이에 빌드 깨진 곳 확인, 외근 중 hotfix plan을 Goal mode에 넘겨 두고 사무실 도착해서 검토 — 이 세 가지가 가장 빨리 자리잡을 패턴입니다. 회사 보안 정책에 따라 모바일에서 production repo 접근을 막아둔 곳도 많기 때문에, 도입 전에 정보보안팀과 \"읽기 전용 / sandbox repo 한정\" 같은 경계선을 먼저 정하는 편이 안전합니다.

(출처: openai.com/index/work-with-codex-from-anywhere, 2026.5.22)`,
          officialUrl: "https://openai.com/index/work-with-codex-from-anywhere/",
          source: "https://openai.com/index/work-with-codex-from-anywhere/",
          tags: ["Codex", "ChatGPT mobile", "공식", "hero후보"],
          featured: true,
          slug: "work-with-codex-from-anywhere-codex-in-c-aa73b5cd",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/gpt-5-3-codex-is-now-the-base-model-for--d3b67286.webp",
            alt: "Work with Codex from anywhere — Codex in ChatGPT mobile",
          },
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "Introducing the Codex app, Skills, and Automations",
          summary: "",
          content: `OpenAI가 2026년 5월 22일 Codex를 ChatGPT 사이드바에서 떼어내 macOS / Windows 데스크톱 앱으로 분리하고, 동시에 \"Skills\"와 \"Automations\" 두 신기능을 함께 공개했습니다. Codex가 단순 \"코드 generation 기능\"에서 자체 워크스페이스를 가진 제품으로 옮겨가는 분기점입니다.

핵심 사실:

- 출시 채널: macOS · Windows 네이티브 데스크톱 앱 (signed installer 직접 배포)
- Skills: 코딩에 자주 쓰는 도구 호출 · prompt · 시스템 지시 묶음을 저장해 재사용
- Automations: cron 패턴 기반 반복 작업 스케줄러 (\"매일 09:00 dependabot PR 리뷰\" 같은 시나리오)
- 무료 ChatGPT 사용자: 제한된 작업 수 안에서 일부 사용 가능
- 같은 주: Codex mobile · Goal mode GA · AWS Bedrock 등재와 패키지로 발표

### 왜 \"app\"으로 분리했나

ChatGPT 사이드바 안에서 Codex를 돌릴 때는 conversation context가 채팅 흐름과 섞이고, 파일 시스템 접근 권한이 브라우저 sandbox에 막혀 있었습니다. 네이티브 앱으로 분리하면 (1) OS 파일 시스템 직접 접근, (2) 단축키 / 멀티 윈도우 / Spotlight 통합, (3) ChatGPT와 독립적인 세션 / 인증 / 정책 설정이 가능합니다. Anthropic Claude Code가 일찍부터 데스크톱 / 터미널 환경에서 \"개발자 도구\"로 자리잡은 것에 OpenAI가 동급 제품을 내놓은 셈입니다.

### Skills vs GitHub Actions

Skills의 작동 모델은 \"도구 묶음 + prompt 묶음 + 시스템 지시\"라는 점에서 GitHub Actions의 reusable workflow와 비슷하지만 결정적으로 다릅니다. Actions는 사전에 정의된 step을 그대로 실행하고, Skills는 에이전트가 그 묶음을 보고 \"필요할 때 골라 쓴다\". 즉 결정론적 파이프라인이 아니라 에이전트가 참조하는 \"공구함\"입니다. 팀 단위로 잘 만들어 두면 신입 개발자가 Codex에게 \"우리 회사 release 패턴으로 PR 만들어줘\" 같은 추상적 요청을 던질 수 있습니다.

### Automations이 노리는 자리

Automations은 cron 표현으로 \"반복적으로 깨어나는 Codex\"를 만듭니다. 가장 명확한 시나리오는 (1) 정기 의존성 / 보안 업데이트 PR 자동 검토, (2) 야간 로그 분석 후 이슈 자동 등록, (3) 주간 changelog 초안 생성입니다. GitHub Actions / Vercel Cron / n8n 같은 기존 도구가 점유하던 영역을 \"LLM 네이티브 워크플로우\"로 가져오겠다는 의사 표시입니다.

### 한국 팀이 처음 시도하기 좋은 자리

전체 release 파이프라인을 Skills + Automations으로 뒤집기보다는, 도입 첫 주에는 \"한 명의 개발자가 매일 반복하는 작업 한 개\"를 자동화로 옮겨 보는 편이 안전합니다. 예를 들어 매일 아침 dependency PR 5개를 한 줄짜리 요약 + 머지 권고로 변환하는 Automation 한 개를 돌려 보고, 한 주간 결과의 정확도와 false positive 비율을 측정한 뒤에 적용 범위를 늘리는 방식입니다. 외부 push / SNS 게시 / production deploy 같은 회로는 Automations에 직접 연결하지 않는 편이 권장됩니다.

(출처: openai.com/index/introducing-the-codex-app, 2026.5.22)`,
          officialUrl: "https://openai.com/index/introducing-the-codex-app/",
          source: "https://openai.com/index/introducing-the-codex-app/",
          tags: ["Codex app", "Skills", "Automations", "공식", "hero후보"],
          featured: true,
          slug: "introducing-the-codex-app-skills-and-aut-bff38c35",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/openai-codex-goal-mode-generally-availab-62cd0085.png",
            alt: "Introducing the Codex app, Skills, and Automations",
          },
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "OpenAI Codex remote connections (official X post)",
          summary: "",
          content: `OpenAI 공식 X 계정이 2026년 5월 22일 Codex의 \"remote connections\" 기능 확장을 공지했습니다. Codex 세션 안에서 외부 서비스 — GitHub, Linear, Sentry, 자체 API 등 — 를 직접 호출할 수 있는 connector 라인업이 늘었다는 발표입니다.

핵심 변화:

- Codex가 호출 가능한 remote 서비스 종류 확장 (GitHub · Linear · Sentry 외 추가)
- 한 세션 안에서 \"Sentry 이슈 → 코드 변경 → PR 생성\"이 끊김 없이 이어짐
- 인증은 OAuth 기반 connector 단위로 분리, 권한 화면에서 토글
- 공식 발표 채널은 X 단일, 자세한 connector 목록은 ChatGPT 앱 내 설정에서 확인

### connector가 늘었다는 게 왜 중요한가

코딩 에이전트의 \"한계 비용\"은 외부 시스템과의 연결 지점에서 결정됩니다. 좋은 plan을 만들어도 실제로 이슈 트래커 / APM / CI에 닿지 못하면 사람이 끼어드는 단계가 늘어납니다. connector가 늘어나면 그 단계가 줄고, Codex가 \"문제 인지 → 가설 → 코드 변경 → 검증\"을 한 흐름 안에서 끝낼 가능성이 높아집니다. Anthropic이 같은 주 발표한 \"Claude for Creative Work — connectors\"와 형태는 다르지만 방향은 같습니다.

### 한국 환경에서 주의할 점

대부분의 connector는 글로벌 SaaS(GitHub.com · Linear · Sentry · Slack)에 맞춰져 있습니다. 사내 자체 호스팅한 GitLab / Jira / 자체 APM과 연결하려면 \"Custom connector\" 또는 OpenAPI spec을 직접 등록해야 합니다. 보안 심사 관점에서는 connector OAuth 토큰을 누가 보관하는지, 토큰 만료 후 자동 갱신을 어떻게 처리하는지를 검토 항목에 넣는 편이 안전합니다.

(출처: x.com/OpenAI/status/2055016850849993072, 2026.5.22)`,
          officialUrl: "https://x.com/OpenAI/status/2055016850849993072",
          source: "https://x.com/OpenAI/status/2055016850849993072",
          tags: ["Codex", "remote connections", "공식"],
          slug: "openai-codex-remote-connections-official-094d368b",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/openai-codex-remote-connections-official-81d75674.jpg",
            alt: "OpenAI Codex remote connections (official X post)",
          },
        },
      ],
    },
    {
      name: "Google",
      color: "#4285F4",
      posts: [
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Google Gemini Intelligence on Android",
          summary: "",
          content: `Google이 2026년 5월 23일 Android 블로그에서 \"Gemini Intelligence\"를 발표했습니다. 한 줄로 정리하면 \"Apple Intelligence의 Android 대응판\"인데, Google이 OS 레이어에서 Gemini를 1급 시스템 컴포넌트로 끌어올리는 단계입니다.

발표 윤곽:

- 적용 대상: Pixel 9 이상 + Samsung Galaxy S25 / Z Fold7 / Z Flip7 (1차 wave)
- 핵심 기능: 화면 컨텍스트 인식, 시스템 전역 요약 / 다시 쓰기, 알림 우선순위 정렬, 사진 자동 정리
- 처리 방식: on-device Gemini Nano + 클라우드 Gemini 혼합, 사용자 설정으로 cloud 호출 제어
- 출시 시기: 즉시 베타, GA는 2026년 하반기 Android 16 QPR2

### Apple Intelligence와 어떻게 다른가

Apple Intelligence가 \"Private Cloud Compute\"라는 전용 인프라로 cloud 호출을 격리한다면, Google은 Gemini Nano on-device를 1차, Vertex AI 호출을 2차로 두는 hybrid 구조입니다. 즉 Apple은 \"privacy 차별화\"를, Google은 \"모델 성능 차별화\"를 전면에 내세웁니다. Pixel 사용자가 처음 누릴 기능 중 가장 눈에 띄는 건 \"화면을 보면서 질문\"(Circle to Search의 확장판)과 알림 자동 분류입니다.

### 삼성 채택의 의미

이번 발표가 흥미로운 진짜 이유는 삼성이 Galaxy AI를 두고 있으면서도 Gemini Intelligence를 같은 디바이스에 함께 얹는다는 점입니다. 삼성은 자체 Galaxy AI 브랜드를 유지하면서 Google의 OS 레이어 기능을 받아들이는 dual-track 전략을 선택한 셈입니다. 한국 사용자 입장에서는 갤럭시 사용 중 \"Galaxy AI 버튼\"과 \"Gemini 버튼\"이 한 화면에 공존하는 어색한 UX를 한동안 경험하게 됩니다.

### 한국 시장 적용 시 변수

(1) 한국어 처리 품질 — Gemini Nano 한국어는 영어보다 한 세대 늦게 따라오는 경향이 있습니다. (2) 보이스 작업의 정확도 — 한국어 강세·억양에서 명령어 인식이 떨어질 가능성. (3) 통신사 정책 — KT / SKT / LGU+가 자체 AI 서비스(에이닷 등)를 밀고 있어, 단말기 출하 단계에서 Gemini Intelligence 기본값을 어떻게 설정할지가 변수입니다.

(출처: blog.google/products-and-platforms/platforms/android/gemini-intelligence, 2026.5.23)`,
          officialUrl: "https://blog.google/products-and-platforms/platforms/android/gemini-intelligence/",
          source: "https://blog.google/products-and-platforms/platforms/android/gemini-intelligence/",
          tags: ["Gemini", "Android", "공식"],
          slug: "google-gemini-intelligence-on-android-896850d5",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/google-gemini-intelligence-on-android-896850d5.png",
            alt: "Google Gemini Intelligence on Android",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Google AI Mode ads: Gemini-built ad formats in Search",
          summary: "",
          content: `Google이 2026년 5월 23일 Google Marketing Live에서 AI Mode 안에 광고를 정식 도입했습니다. Search의 \"AI 답변\" 화면에 광고를 어떻게 끼워 넣을지를 1년 가까이 실험해 온 끝의 공식 답변입니다.

핵심 변화:

- 적용 위치: AI Mode 응답 본문 안 + 응답 직후 추천 영역
- 광고 형식: Gemini가 광고주의 자산(상품 카탈로그 · 사이트 콘텐츠)으로 직접 생성한 자연어 / 카드 형 광고
- 표기: \"Sponsored\" 라벨이 응답 텍스트 안에 in-line 표시
- 측정: 광고가 답변에 인용된 횟수 / 클릭 → 전환을 별도 지표로 제공

### 광고가 \"답변 안에 섞이는\" 구조

기존 Search 광고는 결과 페이지 상단·하단에 따로 자리잡고 있었습니다. AI Mode에서는 답변 자체가 한 문단으로 만들어지기 때문에, 광고도 그 문단 흐름 안에 자연스럽게 끼어드는 형태가 됩니다. 사용자가 의도를 갖고 무시하기는 더 어렵고, 광고와 검색 결과의 경계는 흐려집니다. Google이 \"Sponsored\" 라벨을 in-line으로 강조하는 이유입니다.

### SEO 팀이 다시 짜야 하는 것

광고 도입은 Organic SEO에도 즉시 영향을 줍니다. AI Mode가 답변에 인용할 소스를 고르는 방식이 점차 광고 자산까지 함께 고려하는 구조가 되면, 기존 \"백링크 / 콘텐츠 깊이 / E-E-A-T\"만으로는 노출 점유를 지키기 어렵습니다. 한국 이커머스 / 미디어 팀이 가장 먼저 점검할 것은 (1) Merchant Center 상품 데이터의 정합성, (2) 자사 사이트의 schema markup, (3) 동일 키워드의 paid + organic 협업 전략입니다.

### 사용자 신뢰 측면

\"답변 안에 광고\"는 단기적으로 매출 성장에 유리하지만, 사용자가 답변의 객관성을 의심하기 시작하면 AI Mode 자체에 대한 신뢰가 흔들립니다. Perplexity가 \"광고 없는 답변\"을 차별점으로 내세우고 있고, ChatGPT Search는 아직 광고 도입을 공식화하지 않은 상태입니다. 한국 시장에서는 네이버 통합검색의 \"파워링크\"가 오랜 기간 비슷한 회색지대를 운영해 왔기 때문에 사용자 반발이 상대적으로 낮을 가능성이 있습니다.

(출처: blog.google/products/ads-commerce/google-marketing-live-search-ads, 2026.5.23)`,
          officialUrl: "https://blog.google/products/ads-commerce/google-marketing-live-search-ads/",
          source: "https://blog.google/products/ads-commerce/google-marketing-live-search-ads/",
          tags: ["Google Search", "AI Mode", "Ads", "공식"],
          slug: "google-ai-mode-ads-gemini-built-ad-forma-e9bb3546",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/google-ai-mode-ads-gemini-built-ad-forma-e9bb3546.png",
            alt: "Google AI Mode ads: Gemini-built ad formats in Search",
          },
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "Google Gemini in Chrome (YouTube help curation)",
          summary: "",
          content: `Google이 2026년 5월 22일 YouTube Help 도메인에 Chrome의 AI 기능을 정리한 \"AI innovations in Chrome\" 큐레이션 페이지를 공개했습니다. Chrome 안의 Gemini 통합 기능을 한 곳에서 설명하는 사용자 안내 페이지이고, Google이 어떤 기능을 \"공식 라인업\"으로 잡고 있는지를 가장 정확하게 확인할 수 있습니다.

페이지에 정리된 기능:

- Tab Compare: 여러 탭의 페이지 내용을 Gemini가 비교 요약
- Help me write: 텍스트 입력란에서 즉석 작성 / 다듬기
- Gemini in Address bar: 주소 표시줄에서 Gemini에 직접 질문
- Page summary: 긴 페이지의 핵심 한 페이지 요약

### YouTube Help 도메인에 둔 이유

이 페이지가 Chrome.google.com이 아니라 help.youtube.com 산하에 있다는 점이 흥미롭습니다. YouTube Help는 Google이 사용자 안내 문서의 검색 가시성을 가장 신경 쓰는 도메인 중 하나여서, Gemini in Chrome 관련 사용자 질문이 늘어날 것을 미리 예상한 SEO 배치로 보입니다. 또 한 가지, YouTube를 통한 \"동영상 가이드 + 텍스트 가이드\" 패키지로 사용자 교육을 진행하기 쉬워집니다.

### Chrome 사용자에게 즉시 체감되는 변화

\"주소 표시줄에서 Gemini\"는 Cmd+L 단축키 한 번으로 \"새 탭 → ChatGPT.com → 질문\" 흐름을 줄입니다. Chrome 안에서 끝나는 작업이 많은 사용자에게는 ChatGPT / Claude 데스크톱 앱을 따로 열 동기가 한 단계 약해집니다. 한국 사용자 입장에서는 \"네이버 / 다음에서 자료 검색 → Chrome 주소 표시줄 Gemini로 요약 요청 → 카카오톡 공유\" 같은 패턴이 자연스러워질 가능성이 높습니다.

(출처: help.youtube.com/intl/en_sg/chrome/ai-innovations, 2026.5.22)`,
          officialUrl: "https://help.youtube.com/intl/en_sg/chrome/ai-innovations/",
          source: "https://help.youtube.com/intl/en_sg/chrome/ai-innovations/",
          tags: ["Gemini", "Chrome", "공식"],
          slug: "google-gemini-in-chrome-youtube-help-cur-f2140de6",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/google-gemini-in-chrome-youtube-help-cur-f2140de6.png",
            alt: "Google Gemini in Chrome (YouTube help curation)",
          },
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "Google DeepMind AI Pointer",
          summary: "",
          content: `Google DeepMind가 2026년 5월 22일 자체 블로그에서 \"AI Pointer\"라는 새로운 연구 프로토타입을 공개했습니다. 모델이 화면 위의 어떤 객체를 가리키는지, 사람이 어디를 가리키는지를 양방향으로 인식하는 멀티모달 인터랙션 실험입니다.

발표 요지:

- 연구 프로토타입 단계, 일반 출시 제품은 아님
- 카메라 + 모델이 사람의 손가락 / 시선 방향을 추적해 \"가리키는 대상\"을 추론
- 거꾸로 모델이 화면 위 좌표 + 자연어 묘사로 \"여기를 보세요\"를 표현
- 데모 시나리오: 요리 레시피, 회로 부품 식별, 박물관 도슨트, 시각장애 보조

### 음성 인터페이스의 한계를 어디서 보완하나

스마트 스피커가 \"그거 켜줘\"를 자주 실패한 이유는 \"그거\"가 가리키는 대상을 모르기 때문입니다. AI Pointer는 \"눈에 보이는 것\"을 인터페이스 1차 단위로 가져옵니다. 화면 안에서는 마우스 / 손가락 좌표가 분명히 있지만, 현실 공간에서는 그 신호가 없습니다. DeepMind는 카메라가 항상 켜져 있는 환경(Glass-급 wearable · 로봇 보조)을 가정해 이 신호를 만들어 냅니다.

### 한계와 윤리적 질문

(1) \"항상 켜진 카메라\"는 모든 공간에서 허용되지 않습니다. (2) 사람의 손가락 추적은 vision 모델이 잘 처리하지만, 시선 추적은 정확도가 낮은 디바이스에서 false positive가 많습니다. (3) AI Pointer가 가리킨 대상에 대한 행동(쇼핑 / 결제 / 정보 조회)에 들어가는 즉시, \"실수로 가리킴\"의 책임 문제가 따라옵니다. DeepMind는 발표 자체에서 \"연구 단계\"를 반복 강조하며 윤리 검토가 함께 필요하다고 명시했습니다.

### 한국 적용 시나리오

AR 글래스 시장이 본격화되기 전 단계여서 직접 응용은 제한적이지만, 한국 가전 / 의료 / 박물관 영역에서 PoC 가능성이 보입니다. 예를 들어 노약자 / 시각장애인을 위한 \"가리키는 사물의 이름 / 사용법 음성 안내\"는 사회적 가치가 분명합니다. 도입 시 가장 큰 허들은 카메라 / 음성 데이터의 개인정보 처리 동의 절차 설계입니다.

(출처: deepmind.google/blog/ai-pointer, 2026.5.22)`,
          officialUrl: "https://deepmind.google/blog/ai-pointer/",
          source: "https://deepmind.google/blog/ai-pointer/",
          tags: ["Google DeepMind", "AI Pointer", "공식"],
          slug: "google-deepmind-ai-pointer-40a96ed5",
          readMinutes: 1,
        },
      ],
    },
    {
      name: "Anthropic / Claude",
      color: "#E87040",
      posts: [
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Claude for Creative Work — connectors",
          summary: "",
          content: `Anthropic이 2026년 5월 23일 \"Claude for Creative Work\"를 발표하면서 Adobe · Canva · Figma 등 크리에이티브 도구와의 공식 connector 라인업을 함께 공개했습니다. Claude를 \"코드 도우미\"가 아니라 디자인 / 영상 / 글쓰기 워크플로우의 한 단계로 자리잡게 하려는 시도입니다.

핵심 구성:

- 1차 connector: Adobe Creative Cloud · Canva · Figma · Notion · Google Docs
- Claude가 디자인 파일의 레이어 구조를 읽고 \"이 컴포넌트의 카피만 새로 써 줘\" 같은 부분 작업 처리
- 영상 도구는 메타데이터 / 자막 / 챕터 자동 작성에 우선 적용
- 라이선스 / 저작권 가이드를 connector 단위로 명시
- 가격: Claude Pro 이상 기본 포함, Team 워크스페이스에서는 관리자 설정

### 왜 \"Creative Work\"가 별도 트랙인가

Claude Code가 개발자 트랙을 확실히 잡은 뒤, Anthropic은 비개발자 시장으로 한 발 더 들어갔습니다. ChatGPT가 일반 사용자 점유를 압도하는 상황에서 Anthropic은 \"전문 워크플로우 안에 깊게 들어가는 connector\"로 차별화합니다. 한 줄로 정리하면 \"Claude를 도구 옆에 두는 게 아니라, 도구 안에서 호출\"입니다.

### 디자인 팀이 가장 먼저 체감할 변화

기존에는 디자이너가 Figma에서 작업하다가 \"카피 다시 써줘\"를 하려면 ChatGPT 창을 따로 띄워 컨텍스트를 다시 설명해야 했습니다. connector 이후에는 Figma 프레임을 Claude에 그대로 넘기고 변경된 카피만 받아서 다시 적용하는 흐름이 한 번에 끝납니다. 한국 광고 / 마케팅 에이전시처럼 한국어 카피의 톤 / 매너 / 브랜드 가이드가 중요한 영역에서는 \"우리 브랜드 가이드 + 이번 프로젝트 톤\"을 한 번 학습시킨 Claude 인스턴스를 팀 전체가 공유하는 패턴이 자리잡을 가능성이 높습니다.

### 라이선스 / 저작권 관점

connector를 통한 자산 사용은 라이선스 risk가 항상 따라옵니다. Anthropic이 connector 단위로 라이선스 가이드를 명시한 것은 그 책임을 사용자 / 도구 제공자 양쪽에 분산하려는 신호입니다. 한국 기업이 도입할 때는 (1) 저작권이 있는 자산을 connector를 통해 모델 학습에 노출시키지 않는다는 정책 보장, (2) 생성 결과물의 상업적 사용 권리, 두 항목을 계약서에 추가하는 편이 안전합니다.

(출처: anthropic.com/news/claude-for-creative-work, 2026.5.23)`,
          officialUrl: "https://www.anthropic.com/news/claude-for-creative-work",
          source: "https://www.anthropic.com/news/claude-for-creative-work",
          tags: ["Claude", "creative", "connectors", "공식"],
          slug: "claude-for-creative-work-connectors-8113d388",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/claude-for-creative-work-connectors-8113d388.jpg",
            alt: "Claude for Creative Work — connectors",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Anthropic Claude limits and SpaceX compute capacity",
          summary: "",
          content: `Anthropic이 2026년 5월 23일 \"Higher limits, powered by SpaceX\" 제목의 공지를 통해 Claude의 사용량 제한을 한 단계 상향한다고 발표했습니다. 동시에 그 배경으로 SpaceX와 체결한 데이터센터 / 위성 백홀 인프라 계약을 공개했습니다.

요지:

- Claude Pro / Team / Enterprise 모두에서 5-hour rolling window 메시지 / 토큰 한도 상향
- 가격 인상 없음, 한도만 증가
- 추가 capacity 출처: SpaceX와 다년 계약, Starlink 기반 데이터센터 간 백홀 + 신규 데이터센터 부지
- Anthropic 공식 표현: \"compute는 frontier AI 회사의 진짜 경쟁 자원\"

### 데이터센터 계약이 본문에 등장한 이유

기존에는 \"한도 상향\"만 짧게 공지하는 게 보통이었는데, 이번 글은 \"왜 가능했는지\"를 SpaceX 계약으로 묶어 설명합니다. 즉 Anthropic은 \"compute 확보 자체가 제품의 일부\"라는 메시지를 일부러 강조합니다. Amazon (AWS Anthropic 투자 합의), Google (TPU 공급), 그리고 이번 SpaceX 라인을 더하면 Anthropic의 인프라 다각화 그림이 좀 더 분명해집니다.

### Starlink 백홀이 왜 필요한가

전통적인 데이터센터 간 통신은 광케이블 백홀 capacity에 의존합니다. 신규 데이터센터를 외곽 / 신흥 지역에 빠르게 짓고 싶을 때 백홀 부족이 가장 큰 병목인데, Starlink 위성 망은 그 부분을 단기간에 메울 수 있는 옵션입니다. 단, 위성 백홀은 광케이블 대비 latency / jitter가 크기 때문에 inference 트래픽보다는 모델 학습 데이터 / weight 전송에 우선 사용될 가능성이 높습니다.

### 한국 사용자에게 직접 체감되는 것

가장 즉시 체감되는 변화는 Claude Code 작업 중 \"5-hour window 한도 초과\" 메시지가 줄어드는 것입니다. 한국 개발자가 Sonnet / Opus를 본격적으로 쓰는 워크로드는 long-running Codex 작업, 다국어 문서 번역 / 요약, 코드 마이그레이션 같은 토큰 다소비 작업입니다. 이번 상향은 그 영역에서 가장 의미가 있습니다.

(출처: anthropic.com/news/higher-limits-spacex, 2026.5.23)`,
          officialUrl: "https://www.anthropic.com/news/higher-limits-spacex",
          source: "https://www.anthropic.com/news/higher-limits-spacex",
          tags: ["Claude", "compute capacity", "SpaceX", "공식"],
          slug: "anthropic-claude-limits-and-spacex-compu-f8ea46f3",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/anthropic-claude-limits-and-spacex-compu-f8ea46f3.jpg",
            alt: "Anthropic Claude limits and SpaceX compute capacity",
          },
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "Project Glasswing: An initial update",
          summary: "Anthropic이 Project Glasswing 1개월 결과를 공개했다. 12개 명시 파트너 + 약 50개 조직이 Claude Mythos Preview를 방어적 보안 워크플로우에 투입해 1만 건 이상의 high/critical 취약점을 발견했다. Cloudflare 2,000건(400건 high/critical), Mozilla Firefox 150에서 271건 수정.",
          content: `Anthropic이 2026년 5월 22일 \"Project Glasswing: An initial update\"를 통해 한 달간의 정량 결과를 공개했습니다. Glasswing은 외부에 출시되지 않은 frontier 모델 Claude Mythos Preview를 12개 명시 파트너 + 약 50개 조직의 방어적 보안 워크플로우에 통제된 조건으로 투입해 본 협력 이니셔티브입니다. 한 달 만에 인터넷에서 가장 널리 쓰이는 소프트웨어에서 10,000건 이상의 high / critical 취약점이 발견됐습니다.

1개월 누적 수치:

- 약 50개 파트너 조직이 Claude Mythos Preview 배포
- Cloudflare: 자체 인프라에서 2,000건 보고, 그중 400건이 high / critical
- Mozilla: Firefox 150 한 버전에서 271건 수정
- 1,000+ 오픈소스 프로젝트 스캔: 현재 true-positive rate 기준 약 3,900건 high / critical 예상
- 전체 high / critical 누적: 10,000건 이상

### Mythos가 일반 출시되지 않은 모델인 이유

Claude Mythos Preview는 Anthropic의 frontier 모델 라인 중에서 \"이 정도 성능부터는 외부 공개 자체가 위험 변수\"라는 판단이 적용된 첫 사례입니다. 같은 모델이 보안 연구에 강하다는 건 거꾸로 공격에도 강할 수 있다는 의미입니다. Anthropic은 공식 글에서 \"강한 safeguards를 마련하는 즉시 Mythos-class 모델을 일반 출시할 계획이지만, 아직 그 작업은 끝나지 않았다\"고 적었습니다. Glasswing은 \"공개 전 단계에서 사회적 효용을 어떻게 입증할 것인가\"에 대한 Anthropic의 답안입니다.

### 방어자 비대칭의 실증

10,000건이라는 숫자 자체보다 중요한 건 그 발견 속도입니다. 수십 년간 보안 업계의 기본 공식은 \"공격자가 한 곳만 뚫으면 되고, 방어자는 전부를 막아야 한다\"였습니다. Mythos급 모델을 방어 측에 먼저 풀면 방어자가 \"전수 조사\"를 할 수 있는 시간 비용이 급격히 떨어집니다. Cloudflare가 400건의 high / critical을 한 달 만에 발견한 것은 이전 1년치 보고량을 압축한 수준입니다.

### Mythos 1 UI 신호와 일반 출시 시점

5월 23일 TestingCatalog가 Claude 인터페이스에서 \"Mythos 1\" 식별자를 발견했다고 보고했습니다. 이는 Anthropic의 백엔드 / UI 코드에 모델 식별자가 추가됐다는 의미일 뿐이고 공식 출시 발표가 아닙니다. 외부 보도(The Ringer 등)에서 등장한 \"인터넷을 파괴할 수 있는 AI\" 같은 자극적 프레이밍도 공식 글의 보수적 톤과는 거리가 멀습니다. 일반 출시 시점에 대해서는 Anthropic이 명확한 일정을 제시하지 않았습니다.

### 한국 보안 조직이 참고할 부분

(1) 한국 주요 ISP / 핀테크 / 게임사가 비슷한 형태의 \"frontier 모델 + 방어 시나리오\" 협업을 외국 벤더와 시도할 때, 데이터 잔존성 / 코드 노출 범위 / 결과 보고 책임을 계약 단계에서 분명히 정의해야 합니다. (2) Mythos가 일반 출시되는 시점에 같은 모델을 공격자도 쓸 수 있다는 사실은 변하지 않습니다. Glasswing은 그 사이의 시차를 방어자에게 먼저 주는 구조여서, 출시 이후의 균형은 새로운 변수입니다.

(출처: anthropic.com/research/glasswing-initial-update, 2026.5.22)`,
          officialUrl: "https://www.anthropic.com/research/glasswing-initial-update",
          source: "https://www.anthropic.com/research/glasswing-initial-update",
          tags: ["Project Glasswing", "security", "Claude Mythos Preview", "공식"],
          slug: "project-glasswing-an-initial-update-ade080fa",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/project-glasswing-an-initial-update-ade080fa.jpg",
            alt: "Project Glasswing: An initial update",
          },
        },
      ],
    },
    {
      name: "NVIDIA",
      color: "#76B900",
      posts: [
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Towards Speed-of-Light Text Generation with Nemotron-Labs Diffusion Language Models",
          summary: "NVIDIA introduced a diffusion language model approach for faster text generation through the Hugging Face Blog.",
          content: `NVIDIA Nemotron-Labs가 2026년 5월 23일 Hugging Face 블로그에 \"Towards Speed-of-Light Text Generation with Diffusion Language Models\" 글을 공개했습니다. 텍스트 생성을 기존 autoregressive 방식이 아니라 diffusion 방식으로 처리해 추론 latency를 한 자릿수 ms 수준까지 떨어뜨리는 연구입니다.

핵심 주장:

- diffusion language model이 token을 한 토큰씩 순차 생성하는 대신 시퀀스 전체를 노이즈에서 점진적으로 \"디노이즈\"
- 동일 quality 기준으로 autoregressive 대비 wall-clock 추론 시간 대폭 단축
- NVIDIA H200 / Blackwell GPU에서 batch / streaming 추론 모두 최적화
- 코드 / 일부 weight는 Hugging Face에 동반 공개

### diffusion으로 텍스트를 만든다는 것

이미지 생성에서 diffusion이 \"노이즈에서 시작해 원하는 이미지로 수렴\"하는 방식이라면, 같은 패러다임을 텍스트에 적용한다는 게 이번 연구의 출발점입니다. 토큰별 자기회귀 생성의 직렬 제약을 깨고 \"긴 시퀀스를 한 번에 병렬로 만든다\"는 가능성을 엽니다. 다만 텍스트의 이산성 / 문법 / 의미 제약 때문에 image diffusion만큼 단순하지 않고, 이번 글은 NVIDIA가 그 trade-off를 어디까지 풀었는지의 보고서입니다.

### 산업 의미

LLM 추론 비용은 token-by-token 직렬성에서 비롯되는 부분이 큽니다. diffusion 방식이 production 품질에 도달한다면 (1) inference 비용이 한 단계 떨어지고, (2) latency-critical 워크로드(코드 자동완성, 실시간 음성 변환)에서 새로운 적용처가 열리며, (3) GPU memory bandwidth가 새로운 병목으로 떠오릅니다. NVIDIA가 자체 블로그 대신 Hugging Face 블로그에 공개한 것은 \"오픈 연구 커뮤니티에 빠르게 노출\"이라는 의도입니다.

### 한국 적용 시 점검할 점

(1) 한국어 토크나이저와 diffusion 절차의 호환성 — 한국어는 음절 단위 구조 때문에 영어 / 중국어 대비 noise schedule 튜닝 비용이 더 들어갈 가능성. (2) 한국 클라우드 / GPU 서비스(KT 클라우드, 네이버 클라우드, 카카오엔터프라이즈)가 H200 / Blackwell 세대 GPU를 얼마나 빨리 공급할 수 있는지가 직접 PoC 가능 시점을 결정합니다.

(출처: huggingface.co/blog/nvidia/nemotron-labs-diffusion, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/nvidia/nemotron-labs-diffusion",
          source: "https://huggingface.co/blog/nvidia/nemotron-labs-diffusion",
          tags: ["NVIDIA Nemotron", "diffusion language models", "공식"],
          slug: "towards-speed-of-light-text-generation-w-f5f64849",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/towards-speed-of-light-text-generation-w-f5f64849.png",
            alt: "Towards Speed-of-Light Text Generation with Nemotron-Labs Diffusion Language Models",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "NVIDIA Nemotron 3 Nano Omni long-context multimodal model",
          summary: "",
          content: `NVIDIA가 2026년 5월 23일 \"Nemotron 3 Nano Omni\"를 Hugging Face 블로그에 공개했습니다. \"Nano\"라는 이름과 달리 시각·음성·텍스트를 모두 받는 멀티모달 모델로, 동급 \"on-device 친화\" 모델 라인 중 긴 컨텍스트 길이를 강조합니다.

핵심 사양:

- 멀티모달: 텍스트 + 이미지 + 음성 + (옵션) 비디오 프레임
- 긴 컨텍스트 입력 지원으로 \"전체 회의 녹취 → 요약\" / \"긴 PDF + 시각 자료\" 시나리오 커버
- 작은 footprint로 edge / 워크스테이션 / 단일 GPU에서 실행 가능
- 가중치 + 추론 코드 Hugging Face 공개, NVIDIA Nemotron 라이선스

### \"Nano + Omni\"라는 조합의 노림수

frontier 시장은 GPT-5.5 / Claude Opus / Gemini Ultra가 점유하고 있고, 그 아래 \"제법 똑똑하지만 가볍게 돌릴 수 있는\" 라인이 산업 적용의 진짜 격전지가 됐습니다. NVIDIA가 \"Nano\" 라벨을 다는 모델에 \"Omni\"(전 modality)를 같이 붙였다는 건, edge / on-prem에서도 멀티모달이 표준이 될 거라는 베팅입니다. Qwen 시리즈의 작은 모델, Microsoft Phi 시리즈, Google Gemma Vision 라인업과 같은 전장입니다.

### 적용 시나리오

(1) 콜센터 음성 + 화면 캡처 동시 분석으로 상담사 보조. (2) 의료 영상 + 진료 노트 통합 요약. (3) 공장 라인 카메라 + 센서 텍스트 로그를 한 번에 본 이상 탐지. 한국 제조 / 의료 / 금융처럼 \"데이터를 외부 cloud로 못 빼는\" 영역에서 이 라인이 가장 빠르게 채택됩니다.

### 라이선스 / 운영 관점

NVIDIA Nemotron 라이선스는 일반 오픈웨이트 라이선스와 약관이 다릅니다. 상업 사용 / 재학습 / fine-tune 결과물의 배포 권한이 항목별로 나뉘어 있어, 도입 전에 사내 법무 검토가 필요합니다. 또 NVIDIA는 자체 NIM / Triton 추론 스택으로의 통합을 권장하기 때문에, 이미 vLLM / TGI 기반 인프라가 깔린 팀이라면 호환성 테스트 비용을 미리 잡아 두는 편이 안전합니다.

(출처: huggingface.co/blog/nvidia/nemotron-3-nano-omni-multimodal-intelligence, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/nvidia/nemotron-3-nano-omni-multimodal-intelligence",
          source: "https://huggingface.co/blog/nvidia/nemotron-3-nano-omni-multimodal-intelligence",
          tags: ["NVIDIA Nemotron", "multimodal", "long-context", "공식"],
          slug: "nvidia-nemotron-3-nano-omni-long-context-582dc0fd",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nvidia-nemotron-3-nano-omni-long-context-582dc0fd.png",
            alt: "NVIDIA Nemotron 3 Nano Omni long-context multimodal model",
          },
        },
      ],
    },
    {
      name: "Cursor / Anysphere",
      color: "#374151",
      posts: [
        {
          date: "5/22",
          platform: "X+Threads",
          title: "Cursor 3.5.17 Keep/Undo community issue",
          summary: "공식 forum 스레드. 사용자 영향이 크지만 회사 공식 changelog는 아님.",
          content: `Cursor 공식 forum에서 2026년 5월 22일 \"Cursor 3.5.17 removed Keep/Undo and applies agent changes directly\" 스레드가 빠르게 인기 글로 올라왔습니다. 3.5.17 업데이트가 에이전트의 코드 변경을 \"Keep / Undo\" 확인 단계 없이 곧바로 적용하도록 바뀌어, 사용자들이 작업물 손실을 호소하는 흐름입니다. 회사 공식 changelog 항목으로는 등록돼 있지 않습니다.

상황 요지:

- Cursor 3.5.17 (2026년 5월 중순 릴리스): Agent 변경의 \"Keep / Undo\" 중간 단계 제거
- 다수 사용자 보고: 의도하지 않은 코드 덮어쓰기, 큰 PR 단위 변경의 즉시 적용
- Cursor 팀 응답: forum 안에서 일부 답글, 공식 changelog / blog 글은 게재되지 않음
- 대응 옵션: 일부 사용자는 3.5.16으로 다운그레이드, 일부는 Git auto-commit 횟수를 늘리는 방식으로 회피

### Keep / Undo가 어떤 안전망이었나

기존 흐름은 에이전트가 코드 변경 plan을 제시하면 사용자가 diff를 보고 \"Keep\" 또는 \"Undo\"를 누른 뒤에 파일에 반영되는 구조였습니다. 이 한 단계는 (1) 사용자가 코드를 자기 머리로 다시 검토하는 시간, (2) 에이전트가 잘못 잡은 변경을 되돌릴 안전망 역할을 했습니다. 3.5.17이 이 단계를 빼면서 사용자 경험이 \"커밋 없이 즉시 머지\"에 가까워졌습니다.

### 왜 회사 공식 changelog에 없나

Cursor 공식 changelog에는 이 변경이 명시되지 않았고, 일부 사용자는 \"의도된 UX 변경인지 버그인지\"부터 혼란스러워 합니다. 이런 형태의 침묵은 두 가지 가능성이 있습니다 — (1) AB test 일부 분기에 실수로 빠진 default 변경, (2) 의도된 변경인데 마케팅 / 문서화가 늦은 경우. 어느 쪽이든 신뢰 손상 비용은 큽니다. 사용자들이 다른 도구(Claude Code, Codex)로 같은 작업을 옮기는 임계점이 어디에 있는지를 보여주는 신호이기도 합니다.

### 한국 팀이 지금 할 수 있는 것

(1) Cursor 사용 팀은 update 자동 적용을 끄고, 3.5.16 또는 그 이전 버전을 일정 기간 유지. (2) Cursor가 어떤 답변을 내놓든, 사용자 측 보호망으로 \"커밋 빈도 + Git GUI에서 변경 자동 검토\"를 강화. (3) Claude Code / Codex 앱과 작업 분담을 다시 점검할 좋은 계기입니다.

(출처: forum.cursor.com/t/cursor-3-5-17-removed-keep-undo, 2026.5.22)`,
          officialUrl: "https://forum.cursor.com/t/cursor-3-5-17-removed-keep-undo-and-applies-agent-changes-directly/161325",
          source: "https://forum.cursor.com/t/cursor-3-5-17-removed-keep-undo-and-applies-agent-changes-directly/161325",
          tags: ["Cursor", "3.5.17", "UX regression", "공식"],
          slug: "cursor-3-5-17-keep-undo-community-issue-71b08064",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/cursor-3-5-17-keep-undo-community-issue-71b08064.png",
            alt: "Cursor 3.5.17 Keep/Undo community issue",
          },
        },
      ],
    },
    {
      name: "Vercel",
      color: "#000000",
      posts: [
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Vercel AI Gateway production index — agentic workloads & multi-model routing",
          summary: "",
          content: `Vercel이 2026년 5월 23일 \"AI Gateway production index\"를 공개하면서 어떤 모델이 실제 production agentic 워크로드에서 가장 많이 호출되는지를 자체 트래픽 기반으로 정리했습니다. AI Gateway는 OpenAI / Anthropic / Google / Qwen 같은 모델을 단일 API로 묶어 라우팅하는 Vercel 제품입니다.

핵심 데이터 포인트:

- 상위 모델: GPT-5.5-Codex · Claude Sonnet 4.6 · Gemini 2.5 Pro · Qwen 3.7 Max 등
- 단일 워크로드에서 모델을 여러 개 섞어 쓰는 비율이 작년 대비 크게 증가
- 비용 / latency / quality 3 축에 따라 라우팅 정책을 코드로 정의하는 패턴이 자리잡음
- Vercel Agent 자체도 같은 게이트웨이 위에서 운영

### \"단일 모델 베팅\"의 시대가 끝났다는 신호

Vercel index의 가장 인상적인 부분은 \"한 워크로드 = 한 모델\" 가정이 거의 무너졌다는 점입니다. 같은 사용자 요청 안에서 plan은 Claude Opus, 코드 생성은 GPT-5.5-Codex, 임베딩은 Qwen 또는 OpenAI text-embedding이 처리되는 패턴이 보편화됐습니다. 다중 모델 라우팅이 이제 \"실험\"이 아니라 \"기본 아키텍처\"라는 의미입니다.

### 게이트웨이의 운영 의미

게이트웨이는 (1) 단일 토큰 사용 한도 / 청구, (2) 모델 장애 시 fallback, (3) 비용 최적화를 위한 동적 라우팅, (4) 로그 / 감사 통합을 한 곳에서 처리합니다. 작년까지 \"있으면 좋은 인프라\"였다면 올해는 \"없으면 운영이 안 되는 인프라\"로 바뀌었습니다. AWS Bedrock(같은 주 OpenAI 등재), Cloudflare AI Gateway, Vercel AI Gateway가 세 축입니다.

### 한국 환경 적용 시 고려 사항

(1) 한국에서 외국 클라우드 게이트웨이를 거치면 latency가 추가되지만, 멀티 모델 라우팅의 운영 이점이 더 큽니다. (2) 개인정보보호법 / 망분리 / 금융권 가이드 때문에 게이트웨이 자체 호스팅(Self-host AI Gateway 변종)이 필요한 영역도 있습니다. (3) Vercel index가 한국 모델(HyperCLOVA X, KT 믿:음, LG 엑사원)을 포함하지 않은 건 한국 모델이 글로벌 트래픽에 노출되지 않았기 때문이고, 사내 인프라 의사결정의 직접 근거로 쓰기 전에 한국 모델 평가는 별도로 진행해야 합니다.

(출처: vercel.com/blog/ai-gateway-production-index, 2026.5.23)`,
          officialUrl: "https://vercel.com/blog/ai-gateway-production-index",
          source: "https://vercel.com/blog/ai-gateway-production-index",
          tags: ["Vercel AI Gateway", "agentic workloads", "공식"],
          slug: "vercel-ai-gateway-production-index-agent-56654a1f",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/vercel-ai-gateway-production-index-agent-56654a1f.png",
            alt: "Vercel AI Gateway production index — agentic workloads & multi-model routing",
          },
        },
      ],
    },
    {
      name: "오픈소스 / 도구",
      color: "#6B7280",
      posts: [
        {
          date: "5/25",
          platform: "X+Threads",
          title: "Thinking Machines Interaction Models — official demo + blog",
          summary: "Thinking Machines가 2026년 5월 25일 'Interaction Models' 공식 데모 + 블로그를 공개했다. Mira Murati가 이끄는 OpenAI 출신 신생 랩의 첫 공개 발표로, 모델을 사용자가 실시간으로 형성·조정하는 새로운 인터랙션 패러다임을 제시했다.",
          content: `Thinking Machines가 2026년 5월 25일 공식 블로그와 라이브 데모로 \"Interaction Models\"를 공개했습니다. Mira Murati(전 OpenAI CTO)가 이끄는 신생 랩의 첫 외부 발표이고, 모델 출시가 아니라 \"사용자가 모델을 단발 질문이 아닌 실시간 협업 대상으로 형성한다\"는 새 인터랙션 패러다임 제안입니다.

발표 요지:

- 단일 모델 release가 아니라 \"인터랙션 모델\" 개념 정의 + 데모 + 비전 문서
- 핵심 아이디어: 모델의 추론 흐름을 사용자가 들여다보고, 중간에 개입 / 분기 / 형성(shape)할 수 있는 인터페이스 1차 요소로 끌어올림
- 라이브 데모 영상에서 사용자가 모델의 사고 트리를 시각적으로 편집하는 장면 공개
- 제품 / API 출시 시점은 미공개, 후속 발표 채널은 Thinking Machines 사이트 + 공식 X

### \"chat\"이라는 인터페이스의 한계 위에서

ChatGPT 이후 \"대화창에 메시지를 던지고 응답을 받는다\"가 LLM의 기본 UX였습니다. Thinking Machines는 이 단일 형식을 \"인쇄 시대의 책 한 페이지\"에 비유하고, 모델과의 협업이 그 한 면을 넘어 좀 더 풍부한 형식 — 추론 흐름 노출, 분기, 사용자 메모, 실시간 조정 — 으로 진화해야 한다고 주장합니다. 한 줄로 정리하면 \"대화창은 모델의 능력을 다 담지 못한다\"는 문제 제기입니다.

### 비슷한 흐름의 다른 발표들

이 발표는 고립된 비전이 아닙니다. Anthropic Claude Code의 Agent View, Google Project Spark / NotebookLM의 메모 / 토론 인터페이스, OpenAI Codex app의 plan 시각화, 그리고 같은 주에 발표된 Vercel Agent까지 — 산업 전체가 \"AI는 대답 기계가 아니라 협업자\"라는 방향으로 수렴합니다. Thinking Machines가 이번에 던진 건 그 흐름의 가장 추상적인 manifesto에 해당합니다.

### 신생 랩이 \"제4의 축\"이 될 수 있을까

OpenAI / Anthropic / Google이라는 세 축 위에 Thinking Machines, Safe Superintelligence Inc., xAI 같은 신생 랩이 본격적으로 자리를 잡을 수 있을지가 향후 2년의 변수입니다. Thinking Machines는 \"실험적 인터페이스 회사\"라는 차별점을 미리 박는 쪽을 택했고, 이는 모델 능력 만으로 1위 다툼을 벌이지 않겠다는 신호입니다. 한국 스타트업 / 연구실 입장에서는 \"frontier 모델을 만들 수 없다면 그 위의 인터페이스 / 협업 layer로 차별화하자\"는 모범 사례가 될 수 있습니다.

### 한국 적용 관점

당장 도입할 제품은 없지만, 같은 패러다임을 활용한 사내 도구 PoC는 즉시 가능합니다. \"분기 가능한 사고 트리\" 형태의 UI를 Claude / GPT 호출 위에 얹는 시도는 이미 일부 한국 스타트업에서 진행되고 있고, Thinking Machines의 manifesto는 그런 시도들의 디자인 어휘 / 평가 기준을 정렬해 주는 reference로 쓸 수 있습니다.

(출처: thinkingmachines.ai/blog/interaction-models, 2026.5.25)`,
          officialUrl: "https://thinkingmachines.ai/blog/interaction-models/",
          source: "https://thinkingmachines.ai/blog/interaction-models/",
          tags: ["Thinking Machines", "interaction models", "공식", "hero후보"],
          featured: true,
          slug: "thinking-machines-interaction-models-off-1707227c",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/thinking-machines-interaction-models-off-1707227c.jpg",
            alt: "Thinking Machines Interaction Models — official demo + blog",
          },
        },
        {
          date: "5/24",
          platform: "X+Threads",
          title: "builderpepc/agent-migrator — AI 코딩 세션을 도구 간 마이그레이션하는 오픈소스. Claude Code/Codex/Cursor 사이 컨텍스트 이전 시나리오.",
          summary: "AI 코딩 세션을 도구 간 마이그레이션하는 오픈소스. Claude Code/Codex/Cursor 사이 컨텍스트 이전 시나리오.",
          content: `builderpepc가 GitHub에 \"agent-migrator\"를 공개한 건 2026년 5월 24일 즈음으로, AI 코딩 세션의 컨텍스트를 도구 간에 이전할 수 있게 해주는 오픈소스 CLI입니다. Claude Code · Codex · Cursor 사이를 오갈 때마다 \"내 프로젝트 컨텍스트를 다시 깔아야 한다\"는 통증 지점을 직접 노립니다.

지원 시나리오:

- Cursor 워크스페이스의 \"내 규칙\" / 사용자 system prompt를 Claude Code .claude/ 디렉토리로 이전
- Codex CLI 세션 history를 Claude Code 컨텍스트 시드로 변환
- 반대 방향(Claude Code → Cursor) 일부 지원
- 모델 / 도구별 추상화 layer로 신규 도구 추가 여지

### 왜 이런 도구가 필요한가

코딩 에이전트 시장이 한쪽으로 수렴하지 않고 \"Claude Code + Codex + Cursor\" 다극 체제로 가면서, 같은 프로젝트를 여러 도구로 오가는 개발자가 늘었습니다. 매번 시스템 prompt / 규칙 / 워크스페이스 설정을 새로 깔면 토큰 비용과 시간 손실이 누적됩니다. agent-migrator는 \"한 번 정성껏 만든 컨텍스트를 자산화\"합니다.

### 한국 팀이 바로 시도할 만한 자리

이미 cmux / cmuxr 같은 다중 pane 워크플로우를 쓰는 한국 개발자에게는 \"한 작업을 어느 도구에서 시작하든 동일한 컨텍스트로 시작\"이라는 정합성 가치가 큽니다. 단, 외부 OSS이기 때문에 도구 간 prompt 변환 정확도 / privacy 보장 / 라이선스 확인을 도입 전에 직접 검증해야 합니다.

(출처: github.com/builderpepc/agent-migrator, 2026.5.24)`,
          officialUrl: "https://github.com/builderpepc/agent-migrator",
          source: "https://github.com/builderpepc/agent-migrator",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "builderpepc-agent-migrator-ai-coding-session-79da5aaf",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/builderpepc-agent-migrator-ai-coding-session-79da5aaf.jpg",
            alt: "builderpepc/agent-migrator — AI 코딩 세션을 도구 간 마이그레이션하는 오픈소스. Claude Code/Codex/Cursor 사이 컨텍스트 이전 시나리오.",
          },
        },
        {
          date: "5/24",
          platform: "X+Threads",
          title: "Peter Steinberger cmux + Codex CLI workflow split",
          summary: "cmux 다중 pane + Codex CLI 작업 분할 패턴.",
          content: `Peter Steinberger(전 PSPDFKit CEO, 인디 개발자)가 2026년 5월 24일경 SNS에서 자신의 코딩 워크플로우를 공유했습니다. manaflow-ai/cmux로 tmux 다중 pane을 묶고, 그 위에서 Codex CLI를 여러 task로 쪼개 동시 실행하는 패턴입니다.

워크플로우 요지:

- cmux: tmux를 \"여러 작업을 동시에 관리하는 워크스페이스\"로 만드는 보조 도구
- 각 pane에 Codex CLI를 띄우고, 작업을 plan / impl / test / qa로 분담
- 한 화면에서 동시 실행 상태를 모니터링하면서, 사람은 \"감독자\" 역할로 게이트 결정
- 단일 컴퓨터의 토큰 사용량이 크게 늘지만 wall-clock 시간은 단축

### 단일 에이전트가 아니라 \"여러 에이전트의 분담\"

큰 작업을 단일 Codex 인스턴스에 던지면 컨텍스트가 흐려지고 작업 품질이 떨어진다는 게 실전 사용자들의 공통된 보고였습니다. Steinberger의 패턴은 그 문제를 \"태스크 분할 + 다중 pane\"으로 회피합니다. 본인이 3fools-pingpong 같은 다중 모델 협업 하네스를 운영 중인 한국 사용자에게는 익숙한 구조입니다.

### 적용 시 고려할 점

(1) 토큰 비용: 여러 pane이 동시에 호출하면 ChatGPT Plus 5-hour window를 빨리 소진. (2) 충돌 관리: 같은 파일을 두 pane이 동시에 수정하면 git conflict. cmux 워크플로우에서는 작업 단위를 디렉토리 / 파일로 분리하는 규율이 필요. (3) 사람 한 명이 동시에 모니터링 가능한 pane 수는 보통 3~4개가 한계.

(출처: github.com/manaflow-ai/cmux, 2026.5.24)`,
          officialUrl: "https://github.com/manaflow-ai/cmux",
          source: "https://github.com/manaflow-ai/cmux",
          tags: ["실전 팁", "공식"],
          slug: "peter-steinberger-cmux-codex-cli-workflo-8a7988df",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/peter-steinberger-cmux-codex-cli-workflo-8a7988df.jpg",
            alt: "Peter Steinberger cmux + Codex CLI workflow split",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "OpenAI models, Codex, and Managed Agents on Amazon Bedrock",
          summary: "",
          content: `OpenAI가 2026년 5월 23일 \"OpenAI on AWS\"를 발표하면서 자사 모델 + Codex + Managed Agents를 Amazon Bedrock에서 직접 호출할 수 있도록 했습니다. OpenAI가 Azure에 사실상 독점적이었던 enterprise distribution 채널을 처음으로 다른 hyperscaler에 연 사건입니다.

핵심 포인트:

- Bedrock에서 사용 가능: GPT-5.5 (text · code), Codex, Managed Agents
- 인증 / 청구 / 데이터 잔존성 정책: 모두 AWS 측 표준을 따름 (즉 데이터 region 보장 / IAM 통합)
- 가격: OpenAI 직판 대비 동일 또는 약간 프리미엄, Bedrock 통합 비용 별도
- Microsoft Azure 독점 종료: OpenAI-Azure 계약 구조 변화의 첫 외부 가시화

### Azure 독점 종료가 시장에 보내는 신호

OpenAI는 2019년 Microsoft 파트너십 이후 사실상 Azure 위에서만 enterprise 호스팅이 가능했습니다. Bedrock 등재는 그 라인이 약화됐다는 가장 직접적인 신호입니다. enterprise 구매팀 입장에서는 이제 \"OpenAI를 쓰려면 Azure\"라는 강제가 사라지고, 이미 AWS에 모든 인프라가 깔린 회사가 OpenAI를 표준 채택할 명분이 생겼습니다. AWS 입장에서는 자체 Anthropic 투자 + OpenAI 통합 + Bedrock 자체 모델로 \"모든 frontier 모델을 한 자리에서\"라는 포지셔닝이 가능해졌습니다.

### 한국 기업이 즉시 검토할 항목

(1) 한국 region에서의 Bedrock OpenAI 가용성 — 1차 wave에는 일부 region만 포함될 가능성이 높습니다. (2) 데이터 잔존성 / 망분리 정책 — 금융 / 공공 / 의료 도입 시 결재 자료에 필수. (3) Azure OpenAI 기준으로 짠 기존 호출 코드와의 호환성 — Bedrock의 invoke API와 직접 mapping이 다르기 때문에 마이그레이션 비용을 미리 계산해 두는 편이 안전.

(출처: openai.com/index/openai-on-aws, 2026.5.23)`,
          officialUrl: "https://openai.com/index/openai-on-aws/",
          source: "https://openai.com/index/openai-on-aws/",
          tags: ["OpenAI", "AWS Bedrock", "Managed Agents", "공식"],
          slug: "openai-models-codex-and-managed-agents-o-561b585a",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/gpt-5-3-codex-is-now-the-base-model-for--d3b67286.webp",
            alt: "OpenAI models, Codex, and Managed Agents on Amazon Bedrock",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "PaddleOCR 3.5 Transformers backend",
          summary: "",
          content: `PaddlePaddle 팀이 2026년 5월 23일 Hugging Face 블로그에 PaddleOCR 3.5의 Transformers backend 통합을 공개했습니다. 그동안 PaddlePaddle 프레임워크에 종속돼 있던 OCR 파이프라인을 표준 \`transformers\` 라이브러리에서 직접 호출할 수 있게 됐습니다.

핵심 변화:

- PaddleOCR 모델 가중치 + 추론 코드가 Hugging Face Hub에서 \`from_pretrained\` 한 줄로 로드
- 기존 PyTorch / TGI / vLLM 기반 인프라와 그대로 호환
- 다국어 OCR 성능 그대로 유지, 한국어 / 일본어 / 중국어 포함

### 이게 한국 팀에 의미하는 것

PaddleOCR은 한자 / 한글 / 일본어 같은 동아시아 언어에서 Tesseract보다 정확도가 높지만, PaddlePaddle 런타임을 별도로 까는 게 운영 비용이었습니다. Transformers backend로 옮겨오면 사내 모델 서빙 인프라(보통 PyTorch / vLLM) 위에서 한 줄로 띄울 수 있습니다. 한국 영수증 / 신분증 / 의료 차트 OCR 파이프라인의 운영 단순화에 직접 도움이 됩니다.

(출처: huggingface.co/blog/PaddlePaddle/paddleocr-transformers, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/PaddlePaddle/paddleocr-transformers",
          source: "https://huggingface.co/blog/PaddlePaddle/paddleocr-transformers",
          tags: ["PaddleOCR", "Transformers", "공식"],
          slug: "paddleocr-3-5-transformers-backend-6045b8d7",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/paddleocr-3-5-transformers-backend-6045b8d7.jpg",
            alt: "PaddleOCR 3.5 Transformers backend",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Dharma-AI specialization beats scale OCR benchmark",
          summary: "",
          content: `Dharma-AI가 2026년 5월 23일 Hugging Face 블로그에 \"Specialization beats scale\" 글을 공개했습니다. OCR 영역에 한정된 소형 specialized 모델이 동일 태스크에서 대형 멀티모달 모델을 벤치마크로 앞섰다는 보고입니다.

핵심 주장:

- 동일 OCR 평가 셋에서 specialized 소형 모델이 일반 목적 멀티모달 모델 대비 정확도 우위
- 추론 비용 / latency도 한 자릿수 배 단축
- \"모든 걸 다 하는 거대 모델\" 가설에 대한 반증 사례

### 산업 의미

frontier 멀티모달 모델이 모든 vision 태스크를 흡수할 거라는 기대가 한 풀 꺾이는 신호입니다. 좁고 깊은 specialized 모델이 production OCR / 의료 영상 / 산업 검사 영역에서 더 합리적인 선택이 될 가능성이 다시 부상합니다. 한국 의료 / 제조 / 금융처럼 \"특정 도메인의 정확도가 1순위\"인 워크로드에서는 specialization 라인을 우선 검토할 근거가 더 분명해집니다.

(출처: huggingface.co/blog/Dharma-AI/specialization-beats-scale, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/Dharma-AI/specialization-beats-scale",
          source: "https://huggingface.co/blog/Dharma-AI/specialization-beats-scale",
          tags: ["OCR", "specialization", "공식"],
          slug: "dharma-ai-specialization-beats-scale-ocr-2060b41d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/dharma-ai-specialization-beats-scale-ocr-2060b41d.png",
            alt: "Dharma-AI specialization beats scale OCR benchmark",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "DeepInfra on Hugging Face Inference Providers",
          summary: "",
          content: `Hugging Face가 2026년 5월 23일 DeepInfra를 자사 Inference Providers 라인업에 정식 추가했습니다. Hugging Face Hub에서 호스팅되는 모델을 호출할 때 backend 선택지가 한 곳 더 늘었습니다.

핵심 변화:

- Hub에서 \`from_pretrained\` 대신 \`hf inference\` 호출 시 DeepInfra 선택 가능
- 기존 backend(Together AI · Replicate · 자체 dedicated endpoint)와 동일 인터페이스
- DeepInfra는 가격 / latency 측면에서 일부 모델에 강점

### 인프라 다극화의 또 한 단계

inference provider 시장이 \"단일 표준\" 없이 다극화되는 흐름이 분명해집니다. 같은 모델을 어디서 돌리느냐가 가격 / latency / 지역 / 정책에 따라 갈리는 시대입니다. 한국 팀 입장에서는 \"Hugging Face 표준 호출 + provider만 교체\" 패턴으로 운영 risk를 분산할 수 있는 선택지가 늘었습니다.

(출처: huggingface.co/blog/inference-providers-deepinfra, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/inference-providers-deepinfra",
          source: "https://huggingface.co/blog/inference-providers-deepinfra",
          tags: ["Hugging Face", "DeepInfra", "Inference Providers", "공식"],
          slug: "deepinfra-on-hugging-face-inference-prov-78285777",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/deepinfra-on-hugging-face-inference-prov-78285777.jpg",
            alt: "DeepInfra on Hugging Face Inference Providers",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "OlmoEarth v1.1 efficient Earth observation AI models",
          summary: "",
          content: `AllenAI가 2026년 5월 23일 OlmoEarth v1.1을 Hugging Face 블로그에 공개했습니다. 위성 영상 / 항공 이미지 등 Earth observation 데이터에 특화된 오픈 모델 라인의 마이너 업데이트로, 모델 footprint를 줄이면서 정확도를 유지했습니다.

핵심 변화:

- 동일 정확도 기준 모델 크기 감소 → 단일 GPU에서 추론 가능
- 위성 multi-spectral band 입력 처리 효율 개선
- 라이선스: AllenAI Open Model License (오픈 사용)

### 한국 응용 가능성

위성·드론·CCTV 영상을 다루는 한국 환경 / 농업 / 국방 / 도시 모니터링 영역에 즉시 적용 가능한 \"오픈 모델 기본값\"으로 자리잡을 가능성이 있습니다. 자체 데이터로 fine-tune한 뒤 on-prem GPU에서 돌리는 구성이 권장됩니다.

(출처: huggingface.co/blog/allenai/olmoearth-v1-1, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/allenai/olmoearth-v1-1",
          source: "https://huggingface.co/blog/allenai/olmoearth-v1-1",
          tags: ["AllenAI", "Earth observation", "공식"],
          slug: "olmoearth-v1-1-efficient-earth-observati-574e69d6",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/olmoearth-v1-1-efficient-earth-observati-574e69d6.webp",
            alt: "OlmoEarth v1.1 efficient Earth observation AI models",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Granite Embedding Multilingual R2",
          summary: "",
          content: `IBM이 2026년 5월 23일 Granite Embedding Multilingual R2를 공개했습니다. 100+ 언어를 지원하는 오픈 임베딩 모델 라인의 두 번째 release로, 다국어 RAG / 검색 / 분류 워크로드용입니다.

핵심 변화:

- 100개 이상 언어 지원, 한국어 포함
- R1 대비 다국어 retrieval MTEB 점수 상승
- Apache 2.0 라이선스 → 상업 사용 자유
- on-prem · edge 배포 가능한 footprint

### 한국 RAG 팀이 검토할 부분

OpenAI text-embedding-3-large나 Cohere embed-v3가 좋아도 \"데이터를 외부 cloud로 못 보내는\" 환경에서는 selection이 제한됩니다. Granite Embedding R2는 그 자리에서 BGE-M3 · multilingual-e5와 직접 경쟁합니다. 한국어 평가 셋(KoSimCSE 등)에서 한 번 자체 측정해 보는 게 도입 전 권고.

(출처: huggingface.co/blog/ibm-granite/granite-embedding-multilingual-r2, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/ibm-granite/granite-embedding-multilingual-r2",
          source: "https://huggingface.co/blog/ibm-granite/granite-embedding-multilingual-r2",
          tags: ["IBM Granite", "embedding", "공식"],
          slug: "granite-embedding-multilingual-r2-b3435e58",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/granite-embedding-multilingual-r2-b3435e58.png",
            alt: "Granite Embedding Multilingual R2",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Hugging Face asynchronous continuous batching",
          summary: "",
          content: `Hugging Face가 2026년 5월 23일 \"Asynchronous continuous batching\" 글을 통해 \`transformers\` 추론 코드의 새로운 배치 처리 방식을 공개했습니다. vLLM이 PagedAttention + continuous batching으로 인기를 끈 영역을 표준 \`transformers\`로 일부 흡수하려는 시도입니다.

핵심 변화:

- 동시 inference 요청을 비동기적으로 batch에 합치고, 끝나는 요청부터 결과 반환
- KV cache 관리 / 메모리 단편화 개선
- vLLM 대비 코드 변경 최소화로 적용 가능 (기존 \`transformers\` pipeline에서 호출)

### 산업 의미

\"vLLM 안 깔고 \`transformers\`만으로 production 추론을 어디까지 끌어올릴 수 있느냐\"가 사내 인프라 단순화 관점에서 중요한 질문입니다. 단일 GPU 워크로드에서는 새 비동기 batching이 충분한 경우가 많아질 것으로 보입니다.

(출처: huggingface.co/blog/continuous_async, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/continuous_async",
          source: "https://huggingface.co/blog/continuous_async",
          tags: ["Hugging Face", "inference", "batching", "공식"],
          slug: "hugging-face-asynchronous-continuous-bat-9edd7b70",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/hugging-face-asynchronous-continuous-bat-9edd7b70.webp",
            alt: "Hugging Face asynchronous continuous batching",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "IBM Granite 4.1 LLMs training pipeline",
          summary: "",
          content: `IBM이 2026년 5월 23일 Hugging Face 블로그에 Granite 4.1 LLM 라인업의 학습 파이프라인을 상세 공개했습니다. 모델 가중치뿐 아니라 \"어떻게 만들었는지\"의 절차까지 함께 풀었다는 점이 특징입니다.

핵심 공개 내용:

- Granite 4.1 텍스트 / 코드 모델의 사전학습 / 후처리 단계
- 데이터 출처 / 필터링 / 합성 데이터 비율
- 인스트럭션 튜닝 / RLHF 변형 절차
- 라이선스: Apache 2.0

### 왜 학습 절차까지 공개하나

IBM은 enterprise 시장에서 \"감사 가능한 AI\" 포지셔닝을 강화합니다. 학습 파이프라인을 공개함으로써 (1) 데이터 거버넌스에 민감한 금융 / 규제 산업이 도입 결재 명분을 갖고, (2) 사내 자체 모델을 만들고 싶은 팀이 reference로 사용할 수 있습니다. Llama / Qwen 라인이 가중치는 공개하지만 학습 데이터 / 절차는 부분 공개에 그치는 것과 대비됩니다.

(출처: huggingface.co/blog/ibm-granite/granite-4-1, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/ibm-granite/granite-4-1",
          source: "https://huggingface.co/blog/ibm-granite/granite-4-1",
          tags: ["IBM Granite 4.1", "training", "공식"],
          slug: "ibm-granite-4-1-llms-training-pipeline-987a2bb7",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/ibm-granite-4-1-llms-training-pipeline-987a2bb7.png",
            alt: "IBM Granite 4.1 LLMs training pipeline",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "AWS foundation model training and inference building blocks",
          summary: "",
          content: `AWS가 2026년 5월 23일 Hugging Face 블로그에 \"Foundation model training and inference building blocks\" 글을 공개했습니다. SageMaker · Trainium · Inferentia · Bedrock을 묶어서 \"어떻게 풀스택으로 자체 foundation 모델을 만들 수 있는지\"를 정리한 reference architecture입니다.

핵심 구성:

- 학습: Trainium2 클러스터 + SageMaker HyperPod
- 데이터 파이프라인: AWS Open Data + S3 + Glue
- 추론: Inferentia2 + Bedrock Custom Models
- 운영: CloudWatch + Bedrock Guardrails

### 같은 주 OpenAI on AWS 발표와 묶어 읽기

같은 주에 OpenAI 모델이 Bedrock에 등재됐고, 이 글은 \"OpenAI를 도입할 회사뿐 아니라 자체 모델을 만들 회사에게도 우리가 풀스택을 줄 수 있다\"는 AWS 측 메시지입니다. 한국 대기업 / 통신사가 \"자체 LLM을 만들고 싶지만 인프라가 부담\"인 단계에서 AWS 풀스택을 reference로 검토할 가능성이 높습니다.

(출처: huggingface.co/blog/amazon/foundation-model-building-blocks, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/amazon/foundation-model-building-blocks",
          source: "https://huggingface.co/blog/amazon/foundation-model-building-blocks",
          tags: ["AWS", "foundation model", "training", "공식"],
          slug: "aws-foundation-model-training-and-infere-8a183928",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/aws-foundation-model-training-and-infere-8a183928.png",
            alt: "AWS foundation model training and inference building blocks",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "vLLM V0 to V1 RL backend correctness",
          summary: "",
          content: `ServiceNow AI 팀이 2026년 5월 23일 Hugging Face 블로그에 \"Correctness before corrections\" 글을 공개했습니다. vLLM의 V0 → V1 마이그레이션 과정에서 강화학습(RL) 학습 backend의 수치 정합성을 어떻게 보장했는지의 엔지니어링 보고서입니다.

핵심 포인트:

- vLLM V1 (PagedAttention 재설계, scheduler 재작성) 도입 시 RL 학습 결과가 V0 대비 미세하게 어긋나는 문제 발견
- 원인: KV cache layout 변경 + sampler floating-point ordering
- 해결: 두 backend의 출력 분포를 동일 seed에서 비교하는 회귀 테스트 도입

### 산업 의미

vLLM이 RLHF / DPO / 강화학습 워크로드의 사실상 표준이 되면서, 라이브러리 메이저 업그레이드가 모델 학습 결과를 흔드는 risk가 새로 등장합니다. 이 글은 \"속도를 위해 정합성을 잃지 말자\"는 엔지니어링 원칙의 실제 적용 사례여서, 한국 모델 학습 팀의 자체 회귀 테스트 설계에 reference로 쓰기 좋습니다.

(출처: huggingface.co/blog/ServiceNow-AI/correctness-before-corrections, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/ServiceNow-AI/correctness-before-corrections",
          source: "https://huggingface.co/blog/ServiceNow-AI/correctness-before-corrections",
          tags: ["vLLM", "RLHF", "correctness", "공식"],
          slug: "vllm-v0-to-v1-rl-backend-correctness-a4477de8",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/vllm-v0-to-v1-rl-backend-correctness-a4477de8.png",
            alt: "vLLM V0 to V1 RL backend correctness",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Open ASR Leaderboard private evaluation sets",
          summary: "",
          content: `Hugging Face가 2026년 5월 23일 Open ASR Leaderboard에 private evaluation set을 도입한다고 발표했습니다. 음성 인식 벤치마크의 \"학습 데이터에 평가 셋이 새어들어 점수가 인플레이션되는\" 고질적 문제를 해결하려는 시도입니다.

핵심 변화:

- 기존 LibriSpeech / Common Voice 같은 공개 셋 외에 private 평가 셋 추가
- 모델 제출자는 결과만 받고 평가 셋 자체에는 접근 불가
- 누적 점수 변화로 contamination 패턴 추적

### 산업 의미

ASR / LLM 양쪽 모두 \"벤치마크 점수와 실제 production 성능의 괴리\"가 산업 신뢰를 갉아먹어 왔습니다. private 평가 셋 도입은 그 신뢰를 회복하려는 가장 직접적인 처방입니다. 한국어 ASR 모델(Whisper 한국어 fine-tune, NAVER Clova 등)을 비교할 때도 같은 방식이 필요하다는 메시지로 읽힙니다.

(출처: huggingface.co/blog/open-asr-leaderboard-private-data, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/open-asr-leaderboard-private-data",
          source: "https://huggingface.co/blog/open-asr-leaderboard-private-data",
          tags: ["Open ASR Leaderboard", "evaluation", "공식"],
          slug: "open-asr-leaderboard-private-evaluation--3ed2efe1",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/open-asr-leaderboard-private-evaluation--3ed2efe1.png",
            alt: "Open ASR Leaderboard private evaluation sets",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "manaflow-ai/cmux — Peter Steinberger가 소개한 Codex CLI 워크플로우 분할용 tmux 보조 도구. 본인이 cmux/cmuxr 하네스 사용자라 직",
          summary: "Peter Steinberger가 소개한 Codex CLI 워크플로우 분할용 tmux 보조 도구. 본인이 cmux/cmuxr 하네스 사용자라 직접 와닿는 후보.",
          content: `manaflow-ai/cmux는 tmux를 \"여러 AI 코딩 세션을 한 화면에서 동시 운영하는 워크스페이스\"로 만들어주는 OSS입니다. Peter Steinberger가 자신의 Codex CLI 워크플로우 분할 패턴으로 소개하면서 한 차례 화제가 됐습니다.

도구 윤곽:

- tmux 위에 \"task별 pane\"을 결정론적으로 스폰
- Codex CLI · Claude Code · 일반 shell 세션을 같은 워크스페이스에서 관리
- 세션 상태를 snapshot으로 남기고 복구
- 본 사이트 운영자가 쓰는 cmuxr 회복 루틴과도 호환

### 한국 개발자에게 의미

\"하나의 큰 작업을 단일 에이전트에 던지지 말고, 여러 작은 작업으로 쪼개 동시 진행\"이라는 패턴이 production에서 효과를 본다는 게 점차 분명해집니다. cmux는 그 패턴의 운영 도구 중 가장 손에 잘 잡히는 OSS여서, 한국 인디 개발자 / 1인 스타트업이 도입하기에 진입 장벽이 낮습니다.

(출처: github.com/manaflow-ai/cmux, 2026.5.23)`,
          officialUrl: "https://github.com/manaflow-ai/cmux",
          source: "https://github.com/manaflow-ai/cmux",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "manaflow-ai-cmux-peter-steinberger-intro-0f69a44c",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/manaflow-ai-cmux-peter-steinberger-intro-0f69a44c.jpg",
            alt: "manaflow-ai/cmux — Peter Steinberger가 소개한 Codex CLI 워크플로우 분할용 tmux 보조 도구. 본인이 cmux/cmuxr 하네스 사용자라 직",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "allenai/OlmoEarth v1.1 — Earth observation을 위한 경량 오픈 모델.",
          summary: "Earth observation을 위한 경량 오픈 모델.",
          content: `AllenAI OlmoEarth v1.1은 Earth observation 데이터(위성 영상, multi-spectral band)를 처리하는 경량 오픈 모델입니다. 같은 주에 별도 카드로 다룬 같은 release에 대한 \"오픈소스 공유 후보\" 라벨링 항목입니다.

본 사이트가 이 카드를 별도로 둔 이유:

- 한국 환경 / 농업 / 도시 모니터링 영역의 사이드 프로젝트에 적용 가능성이 분명함
- 모델 footprint가 작아 단일 GPU 또는 로컬 워크스테이션에서 추론 가능
- 라이선스: AllenAI Open Model License (오픈 사용)
- 한국 사용자 PoC: 산림청 / 농진청 / 국토부 공공 데이터와의 결합 시나리오

자세한 기술 내용은 같은 회차의 \"OlmoEarth v1.1 efficient Earth observation AI models\" 카드 참고.

(출처: huggingface.co/blog/allenai/olmoearth-v1-1, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/allenai/olmoearth-v1-1",
          source: "https://huggingface.co/blog/allenai/olmoearth-v1-1",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "allenai-olmoearth-v1-1-earth-observation-632301e1",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/allenai-olmoearth-v1-1-earth-observation-632301e1.webp",
            alt: "allenai/OlmoEarth v1.1 — Earth observation을 위한 경량 오픈 모델.",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "IBM Granite 4.1 — IBM의 오픈 LLM 라인업 4.1 학습 파이프라인 공개.",
          summary: "IBM의 오픈 LLM 라인업 4.1 학습 파이프라인 공개.",
          content: `IBM Granite 4.1 학습 파이프라인 공개를 \"오픈소스 공유 후보\" 관점에서 별도 정리한 카드입니다. 가중치 + 학습 절차 모두 공개된 Apache 2.0 라이선스 모델이라는 점이 핵심입니다.

본 사이트가 이 라인을 권하는 이유:

- 한국 enterprise / 금융 / 공공이 자체 모델 PoC를 시작할 때 reference로 쓰기 좋음
- 학습 데이터 / 절차가 공개돼 있어 \"우리 데이터 거버넌스에 맞게 재현 가능\"한지를 사전 검토 가능
- Apache 2.0 → 상업 사용 / 재학습 / 결과물 배포 모두 자유

기술 상세 — pretraining 단계, RLHF 변형, 데이터 출처 — 는 같은 회차의 \"IBM Granite 4.1 LLMs training pipeline\" 카드 참고.

(출처: huggingface.co/blog/ibm-granite/granite-4-1, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/ibm-granite/granite-4-1",
          source: "https://huggingface.co/blog/ibm-granite/granite-4-1",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "ibm-granite-4-1-open-llm-lineup-21a34a9c",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/ibm-granite-4-1-open-llm-lineup-21a34a9c.png",
            alt: "IBM Granite 4.1 — IBM의 오픈 LLM 라인업 4.1 학습 파이프라인 공개.",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "vLLM RL backend correctness (ServiceNow) — vLLM RL 학습 backend의 V0→V1 정합성 정리.",
          summary: "vLLM RL 학습 backend의 V0→V1 정합성 정리.",
          content: `ServiceNow AI의 \"correctness before corrections\" 글을 \"오픈소스 공유 후보\" 관점에서 별도 노출한 카드입니다. vLLM 업그레이드 시 RL 학습 결과가 흔들리지 않도록 회귀 테스트를 설계하는 절차를 직접 적용 가능한 reference로 봅니다.

본 사이트가 이 글을 권하는 이유:

- 한국 모델 학습 팀이 vLLM 메이저 업그레이드 시 자체 회귀 테스트를 작성할 때의 베이스라인
- RLHF / DPO 학습 결과의 \"numeric drift\" 추적 방법론 그대로 차용 가능
- 작성자가 ServiceNow의 실제 production 학습 stack에서 겪은 사례

상세 기술 내용은 같은 회차의 \"vLLM V0 to V1 RL backend correctness\" 카드 참고.

(출처: huggingface.co/blog/ServiceNow-AI/correctness-before-corrections, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/ServiceNow-AI/correctness-before-corrections",
          source: "https://huggingface.co/blog/ServiceNow-AI/correctness-before-corrections",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "vllm-rl-backend-correctness-servicenow-v-b23a6b34",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/vllm-rl-backend-correctness-servicenow-v-b23a6b34.png",
            alt: "vLLM RL backend correctness (ServiceNow) — vLLM RL 학습 backend의 V0→V1 정합성 정리.",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "HF continuous async batching — HF inference 비동기 연속 배치 처리 가이드.",
          summary: "HF inference 비동기 연속 배치 처리 가이드.",
          content: `Hugging Face가 발표한 비동기 연속 배칭(continuous async batching)을 \"오픈소스 공유 후보\" 관점에서 별도 정리한 카드입니다. 사내 인프라가 vLLM / TGI 까지 가지 않아도 표준 \`transformers\` 위에서 production 추론을 어디까지 끌어올릴 수 있는지가 질문입니다.

본 사이트가 이 라인을 권하는 이유:

- 단일 GPU · 단일 워크로드에서 vLLM 도입 없이 성능을 한 단계 올림
- 작은 팀이 자체 inference 서비스를 만들 때 진입 장벽 낮춤
- 한국 사내 서비스 / 데모용 워크로드에 적합

상세 기술 내용은 같은 회차의 \"Hugging Face asynchronous continuous batching\" 카드 참고.

(출처: huggingface.co/blog/continuous_async, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/continuous_async",
          source: "https://huggingface.co/blog/continuous_async",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "hf-continuous-async-batching-hf-inferenc-f4c0835a",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/hf-continuous-async-batching-hf-inferenc-f4c0835a.webp",
            alt: "HF continuous async batching — HF inference 비동기 연속 배치 처리 가이드.",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "IBM Granite Embedding Multilingual R2 — 오픈 다국어 임베딩 모델 R2.",
          summary: "오픈 다국어 임베딩 모델 R2.",
          content: `IBM Granite Embedding Multilingual R2를 \"한국 RAG / 검색 팀이 바로 시도해 볼 후보\" 관점에서 별도 정리한 카드입니다. 한국어 임베딩이 약했던 오픈 라인의 갱신 사례라는 점에서 의미가 있습니다.

본 사이트가 이 라인을 권하는 이유:

- 한국어 포함 100+ 언어 지원, Apache 2.0 라이선스
- BGE-M3 · multilingual-e5의 대안으로 자체 측정 가치
- 사내 on-prem RAG / 망분리 환경 적합

상세 기술 내용은 같은 회차의 \"Granite Embedding Multilingual R2\" 카드 참고. 도입 전 한국어 평가 셋(KoSimCSE · MS MARCO 한글 번역 등)으로 자체 retrieval 정확도 비교 필수.

(출처: huggingface.co/blog/ibm-granite/granite-embedding-multilingual-r2, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/ibm-granite/granite-embedding-multilingual-r2",
          source: "https://huggingface.co/blog/ibm-granite/granite-embedding-multilingual-r2",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "ibm-granite-embedding-multilingual-r2-open-02a6a250",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/ibm-granite-embedding-multilingual-r2-open-02a6a250.png",
            alt: "IBM Granite Embedding Multilingual R2 — 오픈 다국어 임베딩 모델 R2.",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "PaddleOCR 3.5 Transformers — PaddleOCR을 Transformers 백엔드로 실행하는 가이드.",
          summary: "PaddleOCR을 Transformers 백엔드로 실행하는 가이드.",
          content: `PaddleOCR 3.5의 Transformers backend 통합을 \"오픈소스 공유 후보\" 관점에서 별도 정리한 카드입니다. 동아시아 언어(한자 / 한글 / 일본어) OCR 정확도가 강한 라인이라 한국 업무 현장에서 직접 적용 가능성이 높습니다.

본 사이트가 이 라인을 권하는 이유:

- 한국 영수증 / 신분증 / 의료 차트 / 운송장 OCR 시나리오에서 Tesseract 대비 정확도 우위
- PaddlePaddle 런타임을 따로 깔지 않아도 됨 → 사내 인프라 단순화
- 표준 \`transformers\` API와 호환 → 기존 pipeline에 한 줄 추가로 도입

상세 기술 내용은 같은 회차의 \"PaddleOCR 3.5 Transformers backend\" 카드 참고.

(출처: huggingface.co/blog/PaddlePaddle/paddleocr-transformers, 2026.5.23)`,
          officialUrl: "https://huggingface.co/blog/PaddlePaddle/paddleocr-transformers",
          source: "https://huggingface.co/blog/PaddlePaddle/paddleocr-transformers",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "paddleocr-3-5-transformers-integration-46b1f9d1",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/paddleocr-3-5-transformers-integration-46b1f9d1.jpg",
            alt: "PaddleOCR 3.5 Transformers — PaddleOCR을 Transformers 백엔드로 실행하는 가이드.",
          },
        },
        {
          date: "2026-05 (multiple)",
          platform: "X+Threads",
          title: "tw93/Mole — macOS deep clean & optimize CLI. 2026-05 업데이트로 Claude Code, Cursor Agent, GitHub",
          summary: "macOS deep clean & optimize CLI. 2026-05 업데이트로 Claude Code, Cursor Agent, GitHub Copilot CLI, Codex CLI 등 AI agent CLI 런타임/세션 로그 정리 커버리지 추가. tw93 작가의 다른 작품(이미 사용 중인 tw93/kami)과 같은 라인. AI 개발자에게 실용적인 cleanup 도구.",
          content: `tw93가 2026년 5월 자신의 macOS 정리 CLI \"Mole\"에 AI agent 런타임 / 세션 로그 정리 커버리지를 추가했습니다. Claude Code · Cursor Agent · GitHub Copilot CLI · Codex CLI 등이 디스크에 누적시키는 캐시 / 로그를 한 명령으로 청소할 수 있습니다.

핵심 기능:

- macOS 시스템 캐시 / 로그 / 사용자 데이터 깊은 정리
- 2026-05 업데이트: AI 코딩 에이전트 CLI 전용 정리 카테고리 추가
- dry-run 우선, 사용자 확인 후 실제 삭제
- tw93의 다른 작품(/kami 디자인 시스템) 라인과 같은 \"실용 OSS\" 톤

### AI 코딩 에이전트가 만드는 \"보이지 않는\" 디스크 사용

Claude Code 세션 로그 · Codex CLI 캐시 · Cursor의 indexed 코드 임베딩 캐시 · GitHub Copilot CLI 로컬 데이터는 각각 GB 단위로 쌓일 수 있습니다. 한 달간 모르고 두면 SSD가 빠르게 차오릅니다. Mole는 그 영역을 카테고리로 분리해 보여주고, 안전한 삭제 순서로 정리합니다.

### 본 사이트 운영자도 사용하는 라인

tw93/kami(/kami 하네스의 디자인 시스템 베이스)를 본 사이트도 신뢰해서 쓰고 있습니다. 같은 작가의 OSS라는 점에서 신뢰도 베이스라인이 있고, 한국 macOS 개발자가 1차 도입 후보로 고려할 만합니다.

(출처: github.com/tw93/Mole, 2026.5)`,
          officialUrl: "https://github.com/tw93/Mole",
          source: "https://github.com/tw93/Mole",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "tw93-mole-macos-deep-clean-optimize-cli--74a86de7",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/tw93-mole-macos-deep-clean-optimize-cli--74a86de7.jpg",
            alt: "tw93/Mole — macOS deep clean & optimize CLI. 2026-05 업데이트로 Claude Code, Cursor Agent, GitHub",
          },
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Claude Code context management — /compact vs /clear",
          summary: "세션 컨텍스트 관리 실전 팁.",
          content: `Claude Code 사용자 사이에서 \"\`/compact\`와 \`/clear\`를 언제 써야 하는가\"가 2026년 5월 23일 한 YouTube 영상을 통해 다시 화두에 올랐습니다. 실전 사용자가 자기 워크플로우에서 두 명령을 어떻게 쓰는지를 정리한 가이드입니다.

요지:

- \`/compact\`: 현재 세션 컨텍스트를 요약 형태로 압축, 핵심 의도 / 지시는 유지
- \`/clear\`: 컨텍스트를 완전히 비움, 새 작업 시작
- 잘못된 시점에 \`/clear\`하면 컨텍스트 손실 → 같은 설명을 반복
- 잘못된 시점에 \`/compact\`하면 토큰 비용은 줄지만 미세한 의도가 사라짐

### 실전 권고 패턴

(1) 한 작업이 끝나고 다음 작업 사이 자연스러운 경계가 있을 때 → \`/clear\`. (2) 같은 큰 작업 안에서 토큰이 누적돼 컨텍스트 윈도우의 70% 이상이 차면 → \`/compact\` 후 계속. (3) 디버깅 도중 갑자기 모델 응답 품질이 떨어지면 → \`/compact\`로 노이즈 압축. 한국 개발자가 Claude Code를 일상 도구로 쓰기 시작한 단계에서 가장 빠르게 효과가 나는 미세 조정입니다.

(출처: youtube.com/watch?v=eW3oTyfeWZ0, 2026.5.23)`,
          officialUrl: "https://www.youtube.com/watch?v=eW3oTyfeWZ0",
          source: "https://www.youtube.com/watch?v=eW3oTyfeWZ0",
          tags: ["실전 팁", "공식"],
          slug: "claude-code-context-management-compact-v-754f9eaa",
          readMinutes: 1,
        },
        {
          date: "5/23",
          platform: "X+Threads",
          title: "Jensen Huang CMU commencement — AI jobs message",
          summary: "AI 시대 일자리에 대한 NVIDIA CEO 졸업 연설.",
          content: `NVIDIA CEO 젠슨 황이 2026년 5월 23일 Carnegie Mellon University 졸업식 축사에서 \"AI 시대 일자리\"에 대해 발언했습니다. 졸업생 청중 대상이지만 산업 전반에 보내는 메시지로 읽힙니다.

연설 골자:

- \"AI가 일자리를 빼앗는 게 아니라, AI를 쓸 줄 모르는 사람이 일자리를 빼앗긴다\"
- 신입 엔지니어에게 \"AI를 도구로 쓰는 법\"을 첫 직무 능력으로 권고
- 졸업생에게 \"운이 좋아도 겸손하라, 어려움에 익숙해져라\"는 클래식한 멘토 메시지

### 잘 알려진 명제의 한 번 더의 반복

\"AI는 일자리를 빼앗지 않는다, AI를 쓸 줄 아는 사람이 못 쓰는 사람을 대체한다\"는 명제 자체는 새롭지 않습니다. 다만 이 발언이 NVIDIA CEO의 졸업식 연단에서 다시 나왔다는 사실은 industry 측 합의가 흔들리지 않고 있다는 신호입니다. 한국 신입 개발자 / 디자이너 / 기획자에게 직접 와닿는 메시지는 \"AI 도구 활용을 portfolio에 명시적으로 정리\"하는 게 입사 준비의 핵심 항목이 됐다는 점입니다.

### 한국 청취자에게 더 의미 있는 한 줄

연설 중반에 황은 \"AI는 인프라이고, 인프라는 모두에게 평등하지 않다\"는 말을 끼워 넣었습니다. 한국 학생 / 신입에게는 \"개인이 강해지는 길은 frontier 도구를 빠르게 익히는 것\"이라는 명제로 옮길 수 있습니다.

(출처: youtube.com/watch?v=uSs7PPAJR20, 2026.5.23)`,
          officialUrl: "https://www.youtube.com/watch?v=uSs7PPAJR20",
          source: "https://www.youtube.com/watch?v=uSs7PPAJR20",
          tags: ["실전 팁", "공식"],
          slug: "jensen-huang-cmu-commencement-ai-jobs-me-15724e4b",
          readMinutes: 1,
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "Qwen3.7-Max official benchmark / model card",
          summary: "알리바바가 2026년 5월 22일 Qwen 3.7 Max 공식 모델 카드와 벤치마크를 공개했다. Qwen 시리즈의 최상위 모델로 코딩·추론·다국어에서 frontier 모델과 어깨를 견주는 수치를 제시했다. Vercel AI Gateway에도 같은 주 등재.",
          content: `알리바바 클라우드가 2026년 5월 22일 Qwen 3.7 Max 공식 모델 카드와 벤치마크를 공개했습니다. Qwen 시리즈 최상위 모델로 알리바바 자체 호스팅과 외부 게이트웨이에서 동시 호출 가능합니다. 같은 주 Vercel AI Gateway production index에도 등재돼, 미국 게이트웨이가 중국 모델을 1급 옵션으로 받는 첫 신호로 읽혔습니다.

공개된 사양:

- 라인 위치: Qwen 라인업의 frontier급 멀티 도메인 모델
- 강점 영역: 코딩, 추론, 다국어, 긴 컨텍스트
- 호스팅: Alibaba Cloud Model Studio 자체 호스팅 + Vercel AI Gateway 등 외부 게이트웨이
- 가격: 미국 frontier 모델 대비 낮은 포지셔닝
- 오픈웨이트 여부: 미확정 (API 우선)

### 벤치마크

공식 모델 카드의 벤치마크 수치는 코딩(HumanEval / LiveCodeBench), 추론(MATH / GPQA), 다국어(MMLU multilingual) 모두 frontier 라인과 어깨를 견주는 위치입니다. 다만 모든 자기 측정 벤치마크가 그렇듯, Artificial Analysis 같은 독립 평가로 교차 검증한 뒤에 의사결정 자료로 쓰는 편이 안전합니다. 한 가지 분명한 건 \"중국 모델 = 영어권 미만\"이라는 기존 가정이 더 이상 통하지 않는다는 점입니다.

### 가격과 거버넌스의 줄다리기

성능이 frontier급에 근접하면서 가격은 미국 모델 대비 1/3~1/5 수준입니다. 단순 단가만 보면 한국 enterprise 채택이 합리적이지만, (1) 학습 데이터 / 추론 호출 로그의 잔존성 정책, (2) 한국 개인정보보호법 / EU GDPR 호환성, (3) 미국 행정명령 / 한국 정부 가이드의 영향 등이 변수입니다. 대부분의 한국 대기업이 \"미국 frontier + 사내 자체 모델\" 듀얼 트랙으로 가는 이유입니다.

### 제공 채널

- 1차: Alibaba Cloud Model Studio API
- 2차: Vercel AI Gateway 등 외부 라우팅 (한국에서 직접 호출 시 latency 추가)
- 오픈웨이트: 미확정, 발표 시 별도 라이선스 정책 적용 예정

### 한국 팀이 권할 만한 활용 방식

스타트업 / 개인 개발자의 사이드 프로젝트에서 비용 효율 위주 워크로드(번역, 요약, 임베딩 보조, 코드 lint)에 우선 적용해 볼 만합니다. enterprise production에 직접 투입하기 전에는 거버넌스 검토 사이클(법무 / 정보보안 / 클라우드 거버넌스)을 미리 통과시켜 두는 편이 안전합니다.

(출처: qwen.ai/blog?id=qwen3.7, 2026.5.22)`,
          officialUrl: "https://qwen.ai/blog?id=qwen3.7",
          source: "https://qwen.ai/blog?id=qwen3.7",
          tags: ["Qwen", "Alibaba", "frontier model", "공식", "hero후보"],
          featured: true,
          slug: "qwen3-7-max-official-benchmark-model-car-76bf5f04",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/qwen3-7-max-official-benchmark-model-car-76bf5f04.svg",
            alt: "Qwen3.7-Max official benchmark / model card",
          },
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "GPT Image API: n parameter usage tip",
          summary: "",
          content: `OpenAI Images API의 \`n\` 파라미터 사용법이 2026년 5월 22일 개발자 사이에서 다시 화두가 됐습니다. 같은 prompt로 동시에 여러 장의 결과를 받아 비교 / 선택하는 워크플로우를 한 호출 안에 묶을 수 있다는 것을 모르는 사용자가 의외로 많습니다.

핵심 사용법:

- \`POST /v1/images\` 요청에 \`n: 4\` 같은 값을 주면 한 호출에서 동시 4장 반환
- 토큰 / 비용은 결과 개수만큼 곱해서 청구되지만, latency는 단일 호출 수준 유지
- 각 결과는 독립 seed로 생성되어 시각적 다양성 확보

### 작은 팁이 왜 의미 있나

GPT Image API는 한 장의 \"정확한 결과\"를 얻기보다 여러 후보 중에서 고르는 워크플로우가 압도적으로 효율적입니다. \`n\` 파라미터는 그 사용 방식을 \"한 호출 안에 묶기\"의 형태로 표준화한 것입니다. 본 사이트가 운영하는 \`/gi\` 게이트웨이도 같은 패턴을 내부적으로 사용합니다.

### 한국 디자인 / 마케팅 팀 활용

광고 소재 / 카드뉴스 / 이커머스 상품 이미지 PoC에서 동시 4장 후보 → 디자이너 1차 선택 → 1장 fine-tune 흐름이 가장 시간 효율이 높습니다. 단 OpenAI Images API는 한국 사용자 데이터 / 결과물 저작권 / 상업 사용 라이선스를 도입 전에 한 번 확인해 두는 편이 안전합니다.

(출처: platform.openai.com/docs/api-reference/images, 2026.5.22)`,
          officialUrl: "https://platform.openai.com/docs/api-reference/images",
          source: "https://platform.openai.com/docs/api-reference/images",
          tags: ["OpenAI API", "Images", "공식"],
          slug: "gpt-image-api-n-parameter-usage-tip-be846f4c",
          readMinutes: 1,
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "jamiepine/voicebox — 오픈소스 음성 도구.",
          summary: "오픈소스 음성 도구.",
          content: `Jamie Pine(Spacedrive 창립자)이 2026년 5월 22일경 GitHub에 \"voicebox\"라는 음성 도구 OSS를 공개했습니다. 로컬에서 음성 입력 → 텍스트 변환 → 후처리 / 자동 명령 실행을 묶은 단일 바이너리 도구입니다.

도구 윤곽:

- 로컬 Whisper / 작은 ASR 모델로 음성을 텍스트로 변환
- 변환된 텍스트를 LLM에 전달하거나 시스템 명령으로 직접 실행
- macOS 우선, Linux / Windows 후속
- MIT 또는 유사 오픈 라이선스

### 적용 시나리오

(1) 코딩 중 \"이 함수를 ~로 리팩토링\" 같은 음성 지시 → Claude Code로 전달. (2) 회의 / 통화 즉석 받아쓰기 → 옵시디언 노트 / 채팅 메시지로 변환. (3) 시각장애 / 손목 부상 시 키보드 대체 입력. 한국어 ASR 정확도는 Whisper 한국어 fine-tune 모델 채택 여부에 따라 갈리고, 도입 전 사내 환경에서 자체 측정이 권장됩니다.

(출처: github.com/jamiepine/voicebox, 2026.5.22)`,
          officialUrl: "https://github.com/jamiepine/voicebox",
          source: "https://github.com/jamiepine/voicebox",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "jamiepine-voicebox-open-source-voice-tool-24ada790",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/jamiepine-voicebox-오픈소스-음성-도구-bfeff07f.png",
            alt: "jamiepine/voicebox — 오픈소스 음성 도구.",
          },
        },
        {
          date: "5/22",
          platform: "X+Threads",
          title: "AI prompt usage: method-first prompting",
          summary: "방법론을 먼저 제시하는 프롬프트 스타일.",
          content: `Instagram 한 게시물이 2026년 5월 22일 \"method-first prompting\"이라는 프롬프트 패턴을 정리해 한국 디자이너 / 기획자 커뮤니티에서 빠르게 공유됐습니다. \"방법론을 먼저 제시하고, 그 방법론을 적용하라고 시킨다\"는 단순한 원칙입니다.

핵심 아이디어:

- 일반 prompt: \"이 카피를 더 좋게 다듬어 줘\"
- method-first prompt: \"광고 카피 평가 기준을 1) 한 줄 hook 강도, 2) 구체 숫자 포함, 3) 행동 동사 사용으로 정의합니다. 이 기준으로 아래 카피를 평가하고 다시 써라.\"

### 왜 효과가 있나

LLM은 \"좋게\"라는 주관어보다 \"3개 기준에 따라\"라는 측정 가능한 방법론에 훨씬 안정적으로 반응합니다. 사용자가 평가 기준을 prompt에 명시해 두면, 모델은 자기 결과를 그 기준으로 자기 비판한 뒤 다시 쓰는 흐름을 따라갑니다. 한국 마케팅 / 카피라이팅 / 기획서 작성 워크로드에 적용 시 결과의 일관성이 크게 올라갑니다.

### 적용 시 주의

(1) 방법론이 너무 길어지면 prompt 토큰만 늘고 모델이 무시. 5개 이내 핵심만. (2) 한국어 문법 / 톤 같은 미세한 기준은 \"예시 2~3개\"를 함께 첨부하는 편이 더 잘 작동.

(출처: instagram.com/p/DYCDIvelD5p, 2026.5.22)`,
          officialUrl: "https://www.instagram.com/p/DYCDIvelD5p/",
          source: "https://www.instagram.com/p/DYCDIvelD5p/",
          tags: ["실전 팁", "공식"],
          slug: "ai-prompt-usage-method-first-prompting-9be18a5f",
          readMinutes: 1,
        },
      ],
    },
  ],
};
