import type { ABEdition } from "../data";

export const edition2026_05a: ABEdition = {
  slug: "2026-05a",
  volume: 3,
  title: "3주 동안 가장 바이럴했던 AI 정보 10 — 모델, 에이전트, 음성, 영상, 작업 시스템",
  theme: "w18~w20에서 가장 퍼질 만한 AI 흐름만 다시 고른 통합 큐레이션",
  period: "2026-04-27 ~ 2026-05-14",
  coveredWeeks: ["2026-w18", "2026-w19", "2026-w20"],
  announceDate: "2026-05-14",
  intro: `이번 페이지는 기존 VOL.03과 VOL.04를 합쳐 다시 만든 통합 큐레이션입니다. 3주 동안 모인 AI 정보 중에서 발표용으로 가장 바이럴하게 전달될 만한 10개만 남겼습니다.

기준은 세 가지입니다. 첫째, 일반 사용자가 바로 체감할 변화인가. 둘째, 개발자와 크리에이터의 작업 방식이 실제로 바뀌는가. 셋째, 단순 모델 성능 뉴스가 아니라 앞으로의 사용 습관을 설명해 주는가.

그래서 이번 10개는 GPT-5.5, Googlebook, Claude Code Agent View, OpenAI Codex, 실시간 음성, xAI 보이스 클로닝, AI가 사람 손을 움직이는 Human Operator, Nano Banana 2, HappyHorse 영상 생성, Karpathy식 에이전트 위임 흐름으로 묶었습니다. 마지막에는 직접 써본 도구와 직접 만든 도구도 따로 붙였습니다.`,
  closing: `이번 3주 큐레이션을 한 줄로 묶으면, AI는 더 이상 채팅창 안의 답변기가 아니라 작업 환경 전체를 움직이는 운영 레이어가 되고 있습니다.

GPT-5.5는 기본 모델 경험을 다시 재게 만들고, Googlebook은 AI가 하드웨어 사용 방식으로 들어오는 장면을 보여줍니다. Claude Code와 Codex는 목표, 병렬 세션, 브라우저, 원격 환경으로 확장되며 코딩 도구를 에이전트 운영 콘솔에 가깝게 바꾸고 있습니다. Realtime Voice와 xAI Voice Cloning은 화면 중심의 AI를 목소리 인터페이스로 넓히고, Human Operator는 AI가 디지털 화면을 넘어 사람의 신체 동작까지 안내할 수 있다는 극단적인 사례를 보여줍니다.

영상과 이미지 쪽에서는 HappyHorse와 Nano Banana 2가 제작 워크플로우를 바꾸고, Karpathy의 메시지는 이 모든 변화를 사용하는 사람의 역할 변화로 정리합니다. 앞으로 중요한 능력은 프롬프트 한 줄보다, 목표·권한·검증·비용·메모리·출처를 갖춘 작업 시스템을 설계하는 능력입니다.

— VoidLight`,
  highlights: [
    {
      rank: 1,
      tier: "hero",
      post: {
        date: "5/05",
        platform: "X",
        title: "GPT-5.5 Instant — ChatGPT 기본값이 바뀌고, 모델 선택 기준도 다시 바뀜",
        summary: "OpenAI의 GPT-5.5 Instant 롤아웃과 56개 실제 코딩 태스크 벤치마크를 함께 보면, 단순한 새 모델 출시가 아니라 일상 작업의 기본값과 코딩 에이전트 선택 기준이 동시에 바뀌는 흐름으로 읽힙니다.",
        content: `**이게 뭐예요?**
GPT-5.5 Instant는 ChatGPT의 새 기본 모델로 롤아웃된 소식입니다. 별도 설정을 누르지 않아도 매일 쓰는 ChatGPT의 답변 품질, 개인화, 코딩 성향이 바뀔 수 있다는 뜻입니다.

**무엇이 달라졌나?**
AISI 평가와 초기 사용자 반응에서는 GPT-5.5가 더 강한 추론과 낮아진 환각, 더 개인화된 응답을 보여준다는 신호가 나왔습니다. 동시에 Reddit의 56개 실제 코딩 태스크 비교에서는 GPT-5.5, GPT-5.4, Opus 4.7의 성공률·비용·패치 성향이 서로 다르게 나타났습니다.

**왜 바이럴한가?**
사람들이 매일 쓰는 기본 모델이 바뀌면, 프롬프트 템플릿, 자동화, 코드 리뷰, 수업 자료, 업무 루틴이 한꺼번에 영향을 받습니다. 새 모델 이름 자체보다 중요한 것은 내가 자주 쓰는 작업에서 실제로 더 안정적인지 다시 확인해야 한다는 점입니다.

**읽을 때 볼 점**
GPT-5.5가 무조건 모든 상황에서 정답이라는 뜻은 아닙니다. 성공률, 비용, 코드 품질, 리뷰 통과 가능성, UI 코드 성향을 작업별로 나눠 보는 것이 더 현실적입니다.`,
        source: "https://openai.com/index/gpt-5-5-instant/",
        officialUrl: "https://openai.com/index/gpt-5-5-instant/",
        backupUrls: [
          {
            label: "AISI 평가",
            url: "https://www.aisi.gov.uk/blog/our-evaluation-of-openais-gpt-5-5-cyber-capabilities"
          },
          {
            label: "56개 코딩 태스크 벤치마크",
            url: "https://www.reddit.com/r/codex/comments/1t0xt5m/gpt55_vs_gpt54_vs_opus_47_on_56_real_coding_tasks/"
          },
          {
            label: "TechCrunch",
            url: "https://techcrunch.com/2026/05/05/openai-releases-gpt-5-5-instant-a-new-default-model-for-chatgpt/"
          }
        ],
        thumbnail: {
          src: "/ab/2026-04c/benchmarks/gpt55-user-benchmark-01.jpg",
          alt: "GPT-5.5, GPT-5.4, Opus 4.7 전체 결과 요약 벤치마크",
          caption: "GPT-5.5는 기본 모델 뉴스이면서 동시에 코딩 에이전트 선택 기준을 다시 묻게 만든다"
        },
        images: [
          {
            src: "/ab/2026-04c/benchmarks/gpt55-user-benchmark-01.jpg",
            alt: "GPT-5.5, GPT-5.4, Opus 4.7 전체 결과 요약",
            caption: "성공률과 비용이 서로 다른 모델 선택 기준을 만든다"
          },
          {
            src: "/ab/2026-04c/benchmarks/gpt55-user-benchmark-02.jpg",
            alt: "GPT-5.5, GPT-5.4, Opus 4.7 작업 카테고리별 성공률 비교",
            caption: "작업 카테고리별로 강한 모델이 다르게 보일 수 있다"
          },
          {
            src: "/ab/2026-04c/benchmarks/gpt55-user-benchmark-03.jpg",
            alt: "GPT-5.5, GPT-5.4, Opus 4.7 효율성 및 비용 분석",
            caption: "최고 성능, 예산 최적화, 균형 선택지가 나뉜다"
          },
          {
            src: "/ab/2026-04c/benchmarks/gpt55-user-benchmark-04.jpg",
            alt: "GPT-5.5, GPT-5.4, Opus 4.7 종합 성능 비교",
            caption: "성공률, 코드 품질, 비용, 토큰 사용량, 리뷰 통과 가능성을 함께 본다"
          }
        ],
        tags: ["OpenAI", "GPT-5.5", "ChatGPT", "코딩에이전트", "벤치마크"],
        featured: true
      },
      sourceWeek: "2026-w19",
      sourceCompany: "OpenAI",
      keyQuote: "기본 모델이 바뀌면 프롬프트와 자동화도 다시 재야 한다",
      editorial: "가장 앞에 둘 카드입니다. 모델 출시 자체보다, 매일 쓰는 ChatGPT와 코딩 에이전트의 기본 판단 기준이 바뀐다는 메시지가 강합니다."
    },
    {
      rank: 2,
      tier: "hero",
      post: {
        date: "5/12",
        platform: "X",
        title: "Googlebook — Gemini Intelligence를 전제로 설계한 AI 노트북",
        summary: "Googlebook은 Android와 ChromeOS를 Gemini Intelligence 중심으로 결합한 새 노트북 카테고리입니다. AI가 앱 안의 기능을 넘어 기기 사용 방식 자체를 바꾸기 시작했다는 점에서 발표용 임팩트가 큽니다.",
        content: `**이게 뭐예요?**
Googlebook은 Google이 Gemini Intelligence를 전제로 제시한 AI 노트북 카테고리입니다. 기존 Chromebook의 단순 후속이라기보다, Android와 ChromeOS를 Gemini 중심으로 묶은 작업 장치에 가깝습니다.

**무엇이 달라졌나?**
Magic Pointer는 화면 요소를 가리키면 Gemini가 맥락에 맞는 제안을 해주는 방향이고, 자연어 위젯은 Gmail, Calendar, 웹 검색 같은 개인 정보 흐름을 대시보드처럼 묶습니다. Android phone의 앱과 파일도 노트북과 더 자연스럽게 연결됩니다.

**왜 바이럴한가?**
노트북은 모두가 이해하는 장치입니다. 여기에 AI가 들어간다고 하면, 단순한 앱 기능보다 훨씬 직관적으로 전달됩니다. 사용자가 창을 열고 앱을 조립하는 대신, AI가 맥락을 읽고 작업을 이어주는 장면을 상상하게 만듭니다.

**읽을 때 볼 점**
아직 출시 전 제품 카테고리입니다. 가격, 실제 성능, 학교·업무 계정 관리 정책, 파트너별 사양은 출시 시점에 다시 확인해야 합니다.`,
        source: "https://blog.google/products-and-platforms/platforms/android/meet-googlebook/",
        officialUrl: "https://blog.google/products-and-platforms/platforms/android/meet-googlebook/",
        backupUrls: [
          {
            label: "Android Show I/O Edition",
            url: "https://www.android.com/new-features-on-android/io-2026/"
          },
          {
            label: "Gemini Intelligence for Android",
            url: "https://blog.google/products-and-platforms/platforms/android/gemini-intelligence/"
          }
        ],
        tags: ["Google", "Googlebook", "Gemini", "노트북", "공식"],
        featured: true
      },
      sourceWeek: "2026-w20",
      sourceCompany: "Google / Android",
      keyQuote: "AI가 앱이 아니라 기기 사용 방식으로 들어오기 시작한다",
      editorial: "Googlebook은 설명하기 쉽고 이미지가 강한 카드입니다. AI 노트북이라는 소재가 대중적으로 이해되기 쉬워서 바이럴성이 큽니다."
    },
    {
      rank: 3,
      tier: "feature",
      post: {
        date: "5/11",
        platform: "X",
        title: "Claude Code Agent View + /goal — 코딩 도구가 에이전트 운영 콘솔이 되는 순간",
        summary: "Claude Code 2.1.139에서 Agent View와 /goal이 공식 changelog에 추가됐습니다. 여러 세션을 한 화면에서 보고, 완료 조건을 기준으로 장기 작업을 굴리는 구조입니다.",
        content: `**이게 뭐예요?**
Agent View는 여러 Claude Code 세션을 한 화면에서 보는 기능이고, /goal은 완료 조건을 정해 Claude가 여러 턴에 걸쳐 그 조건을 만족할 때까지 작업하게 하는 명령입니다.

**무엇이 달라졌나?**
코딩 AI를 한 번 질문하고 답변받는 도구로 보는 단계에서 벗어납니다. 실행 중, 대기 중, 완료, 실패한 세션을 관리하고, 장기 작업에는 목표와 완료 기준을 붙입니다. Claude Code가 채팅형 도구보다 에이전트 운영 레이어에 가까워지는 장면입니다.

**왜 바이럴한가?**
개발자에게 가장 큰 병목은 이제 코드 타이핑보다 병렬 에이전트 관리입니다. 여러 작업을 백그라운드로 돌리고, 어디서 막혔는지 보고, 목표를 기준으로 다시 이어가는 화면은 바로 체감되는 변화입니다.

**읽을 때 볼 점**
OpenAI Codex의 /goal과 같은 이름처럼 보여도 제품과 출처가 다릅니다. 둘은 합칠 항목이 아니라, 서로 다른 코딩 에이전트가 같은 방향으로 진화하고 있다는 교차 신호로 봐야 합니다.`,
        source: "https://code.claude.com/docs/en/changelog",
        officialUrl: "https://code.claude.com/docs/en/changelog",
        backupUrls: [
          {
            label: "Agent View 공식 문서",
            url: "https://code.claude.com/docs/en/agent-view"
          },
          {
            label: "/goal 공식 문서",
            url: "https://code.claude.com/docs/en/goal"
          },
          {
            label: "TestingCatalog 레이더",
            url: "https://www.testingcatalog.com/anthropic-adds-agent-view-for-claude-code-for-parralel-work/"
          },
          {
            label: "GitHub Changelog",
            url: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
          }
        ],
        tags: ["ClaudeCode", "AgentView", "Goal", "코딩에이전트", "공식"],
        featured: true
      },
      sourceWeek: "2026-w20",
      sourceCompany: "Anthropic / Claude Code",
      keyQuote: "코딩 AI는 채팅창에서 에이전트 운영 콘솔로 이동한다",
      editorial: "사용자가 추가로 준 TestingCatalog Agent View 항목을 공식 changelog와 함께 연결했습니다. 이 카드는 Claude Code 사용자에게 바로 체감되는 변화입니다."
    },
    {
      rank: 4,
      tier: "feature",
      post: {
        date: "5/07",
        platform: "X",
        title: "OpenAI Codex /goal + Chrome extension — 코딩 에이전트가 브라우저와 원격 환경으로 확장",
        summary: "OpenAI Codex는 /goal로 완료 기준을 다루고, Chrome extension으로 로그인된 웹앱 작업까지 확장됩니다. TestingCatalog가 전한 Remote Control 신호는 공식 확인 범위와 분리해 레이더로 볼 만합니다.",
        content: `**이게 뭐예요?**
OpenAI Codex 쪽에서도 /goal, Chrome extension, in-app browser, computer use가 이어지며 코딩 에이전트의 표면이 넓어지고 있습니다. IDE 안 코드만 다루는 도구가 아니라, 브라우저와 앱, 장기 목표까지 다루는 방향입니다.

**무엇이 달라졌나?**
Codex for Chrome은 로그인된 Chrome 상태를 이용해 웹앱을 다루게 해 줍니다. Salesforce, Gmail, LinkedIn처럼 로그인 상태가 필요한 업무 표면을 에이전트가 볼 수 있게 되는 구조입니다. 공식 changelog는 Chrome extension과 remote connections alpha를 확인할 수 있는 범위로 보여줍니다.

**Remote Control은 어떻게 읽을까?**
TestingCatalog는 SSH 기반 Remote Control 테스트 신호도 전했습니다. 다만 공개 공식 문서에서 같은 표현이 완전히 확인되는 단계는 아니므로, 이 부분은 확정 카드가 아니라 레이더 신호로 두는 편이 안전합니다.

**읽을 때 볼 점**
브라우저와 원격 환경으로 확장될수록 권한 관리가 더 중요해집니다. 어떤 사이트를 허용할지, 로그인 컨텍스트가 어디까지 저장되는지, 조직 계정에서 허용해도 되는지가 핵심입니다.`,
        source: "https://developers.openai.com/codex/changelog",
        officialUrl: "https://developers.openai.com/codex/changelog",
        backupUrls: [
          {
            label: "Codex slash commands",
            url: "https://developers.openai.com/codex/cli/slash-commands"
          },
          {
            label: "Codex Chrome extension",
            url: "https://developers.openai.com/codex/app/chrome-extension"
          },
          {
            label: "TestingCatalog 레이더",
            url: "https://www.testingcatalog.com/openai-adds-chrome-plugin-and-tests-remote-control-for-codex/"
          },
          {
            label: "Simon Willison / Codex goals",
            url: "https://simonwillison.net/2026/Apr/30/codex-goals/"
          }
        ],
        tags: ["OpenAI", "Codex", "Chrome", "Goal", "브라우저에이전트"],
        featured: true
      },
      sourceWeek: "2026-w20",
      sourceCompany: "OpenAI / Codex",
      keyQuote: "Codex는 목표, 브라우저, 원격 환경까지 에이전트 표면을 넓히고 있다",
      editorial: "사용자가 추가로 준 Codex Chrome·Remote Control 항목을 반영했습니다. 공식 확인 범위와 TestingCatalog 레이더 신호를 분리해 과장 없이 넣는 것이 핵심입니다."
    },
    {
      rank: 5,
      tier: "feature",
      post: {
        date: "5/07",
        platform: "X",
        title: "OpenAI Realtime Voice Models — 음성 에이전트용 실시간 모델 3종 공개",
        summary: "OpenAI가 GPT-Realtime-2, GPT-Realtime-Translate, GPT-Realtime-Whisper를 공개하며 음성 대화, 실시간 번역, 스트리밍 음성 인식을 API 제품군으로 나눴습니다.",
        content: `**이게 뭐예요?**
OpenAI가 실시간 음성 앱을 위한 API 모델 3종을 공개했습니다. GPT-Realtime-2는 음성 대화와 추론, GPT-Realtime-Translate는 실시간 음성 번역, GPT-Realtime-Whisper는 스트리밍 음성 인식을 담당합니다.

**무엇이 달라졌나?**
음성 AI가 STT와 TTS를 억지로 붙이는 방식에서, 실시간 대화·번역·인식을 나눠 제공하는 API 제품군으로 정리되고 있습니다. 음성 상담, 회의 통역, 실시간 코치, 콜센터 에이전트를 만들기 쉬워지는 흐름입니다.

**왜 바이럴한가?**
텍스트 챗봇보다 음성 에이전트는 훨씬 직관적입니다. 사람들이 실제로 말하고 듣는 순간 AI가 더 사람 같은 제품 경험으로 느껴집니다.

**읽을 때 볼 점**
음성 모델은 지연 시간과 비용이 경험을 결정합니다. 모델 이름보다 분당 과금, 캐시 입력, 지원 언어, 녹취 보관 정책을 함께 확인해야 합니다.`,
        source: "https://openai.com/index/advancing-voice-intelligence-with-new-models-in-the-api/",
        officialUrl: "https://openai.com/index/advancing-voice-intelligence-with-new-models-in-the-api/",
        tags: ["OpenAI", "Realtime", "Voice", "API", "공식"],
        featured: true
      },
      sourceWeek: "2026-w20",
      sourceCompany: "OpenAI",
      keyQuote: "음성 AI는 텍스트 챗봇보다 더 바로 체감되는 인터페이스다",
      editorial: "음성 에이전트는 발표 현장에서 이해가 빠릅니다. 실시간 통역, 전화 상담, 학습 코치로 바로 연결할 수 있습니다."
    },
    {
      rank: 6,
      tier: "feature",
      post: {
        date: "5/06",
        platform: "X",
        title: "xAI Grok API Voice Cloning — 목소리도 에이전트 제품의 기본 부품이 됨",
        summary: "xAI가 Grok API에 Voice Cloning과 Custom Voices를 추가했습니다. 음성 에이전트, 오디오북, 게임 캐릭터처럼 말투와 목소리가 제품 경험의 일부가 되는 흐름입니다.",
        content: `**이게 뭐예요?**
xAI가 Grok API에 Voice Cloning과 Custom Voices를 정식으로 추가했습니다. 짧은 자연 발화로 커스텀 보이스를 만들고, 여러 언어와 보이스 라이브러리를 제품에 붙일 수 있는 방향입니다.

**무엇이 달라졌나?**
기존 TTS가 정해진 목소리로 텍스트를 읽는 기능이었다면, 이제는 브랜드, 개인, 캐릭터의 목소리 정체성을 API로 붙이는 단계로 이동합니다.

**왜 바이럴한가?**
사람들은 모델 벤치마크보다 목소리 복제 데모를 훨씬 빠르게 이해합니다. 내 목소리, 캐릭터 목소리, 브랜드 상담원 목소리가 AI 제품에 들어간다는 메시지가 강합니다.

**읽을 때 볼 점**
음성권, 동의, 본인 확인, 도용 방지 정책이 핵심입니다. 목소리 복제는 편리함과 위험이 같이 커지는 영역입니다.`,
        source: "https://x.ai/news/grok-custom-voices",
        officialUrl: "https://x.ai/news/grok-custom-voices",
        backupUrls: [
          {
            label: "xAI API",
            url: "https://x.ai/api"
          },
          {
            label: "xAI X 원문",
            url: "https://x.com/xai/status/2050355373052223585"
          },
          {
            label: "xAI docs",
            url: "https://docs.x.ai/developers/model-capabilities/audio/custom-voices"
          }
        ],
        tags: ["xAI", "Grok", "VoiceCloning", "음성AI", "공식"],
        featured: true
      },
      sourceWeek: "2026-w19",
      sourceCompany: "xAI / Grok",
      keyQuote: "AI 제품의 인터페이스가 화면에서 목소리로 넓어진다",
      editorial: "OpenAI Realtime Voice와 묶으면 음성 AI 흐름이 선명해집니다. 하나는 실시간 대화 인프라, 다른 하나는 목소리 정체성입니다."
    },
    {
      rank: 7,
      tier: "normal",
      post: {
        date: "5/02",
        platform: "X",
        title: "MIT Media Lab Human Operator — 전기근육자극으로 AI가 사람 손을 움직이는 실험",
        summary: "Human Operator는 VLM, 머리 카메라, 음성 입력, Arduino EMS 릴레이를 묶어 AI가 사용자 손가락과 손목 움직임을 안내하는 실험입니다. 디지털 에이전트가 물리 세계로 넘어오는 장면입니다.",
        content: `**이게 뭐예요?**
Human Operator는 AI가 사람의 손동작을 전기근육자극으로 안내하는 실험입니다. 머리 카메라와 음성 입력, VLM, Arduino EMS 릴레이를 묶어 손가락과 손목 움직임을 유도합니다.

**무엇이 달라졌나?**
AI가 화면 안에서 텍스트와 코드를 만드는 수준을 넘어, 사람의 신체 동작을 보조하거나 안내하는 형태로 확장될 수 있음을 보여줍니다. 피아노 연주, 그림 그리기, 간단한 제조 동작처럼 물리 작업을 AI가 돕는 장면이 상상됩니다.

**왜 바이럴한가?**
충격적인 데모성이 큽니다. AI가 사람 손을 움직인다는 표현 자체가 강하고, 에이전트가 디지털 업무를 넘어 물리 행동으로 확장될 수 있다는 메시지를 직관적으로 전달합니다.

**읽을 때 볼 점**
이 항목은 상용 제품이라기보다 실험과 해커톤 맥락에 가깝습니다. 안전성, 동의, 착용 편의성, 재현 가능성을 반드시 분리해서 봐야 합니다.`,
        source: "https://humanoperator.org/",
        officialUrl: "https://humanoperator.org/",
        backupUrls: [
          {
            label: "founded.com",
            url: "https://www.founded.com/human-operator-ai-that-can-control-your-body/"
          },
          {
            label: "X 원문",
            url: "https://x.com/Kristennetten/status/2050457565256187946"
          }
        ],
        tags: ["HumanOperator", "EMS", "PhysicalAI", "ClaudeAPI", "실험"],
        featured: true
      },
      sourceWeek: "2026-w18",
      sourceCompany: "MIT Media Lab / Human Operator",
      keyQuote: "AI 에이전트가 화면을 넘어 사람의 물리 동작까지 안내하는 장면",
      editorial: "바이럴성은 매우 높지만, 안전과 검증 맥락을 함께 말해야 하는 카드입니다. 상용 추천이 아니라 물리 AI의 방향성을 보여주는 사례로 두는 것이 맞습니다."
    },
    {
      rank: 8,
      tier: "normal",
      post: {
        date: "5/05",
        platform: "X",
        title: "Google AI Studio Nano Banana 2 — 이미지 제작이 앱 빌드 워크플로우로 들어옴",
        summary: "Nano Banana 2는 Gemini 3.1 Flash Image 기반 이미지 생성·편집 흐름을 AI Studio와 Gemini API에 연결합니다. 이미지 생성이 별도 장난감이 아니라 개발·제작 워크플로우 안으로 들어오는 변화입니다.",
        content: `**이게 뭐예요?**
Google AI Studio에서 Nano Banana 2, 즉 Gemini 3.1 Flash Image 기반 이미지 생성·편집 흐름이 강화됐습니다. 개발자는 AI Studio와 Gemini API에서 이미지 생성, 텍스트 렌더링, 빠른 시안 반복, 편집 작업을 더 자연스럽게 붙일 수 있습니다.

**무엇이 달라졌나?**
다국어 텍스트 렌더링, 다양한 종횡비, 512px 빠른 반복 옵션, 향상된 편집 성능이 들어갑니다. 이미지 모델이 별도 웹사이트에서 끝나는 것이 아니라 앱 빌드와 프로토타입 제작 안으로 들어갑니다.

**왜 바이럴한가?**
이미지 생성은 결과가 바로 보이기 때문에 공유성이 큽니다. 특히 AI Studio 안에서 앱과 이미지 제작을 연결하면 기획자와 개발자가 같은 작업 흐름에서 시안을 만들 수 있습니다.

**읽을 때 볼 점**
이미지 안 텍스트가 좋아졌다고 해도 숫자, 브랜드 문구, 법적 문구는 최종 검수가 필요합니다. 실제 사용 전에는 모델 이름, 비용, 지역 조건도 확인해야 합니다.`,
        source: "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-nano-banana-2/",
        officialUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-nano-banana-2/",
        backupUrls: [
          {
            label: "Nano Banana 2 공식",
            url: "https://blog.google/innovation-and-ai/technology/ai/nano-banana-2/"
          },
          {
            label: "DeepMind Gemini Image",
            url: "https://deepmind.google/models/gemini-image/"
          },
          {
            label: "Google AI Studio X",
            url: "https://x.com/GoogleAIStudio/status/2051679127824998762"
          }
        ],
        tags: ["Google", "AIStudio", "NanoBanana", "이미지생성", "공식"],
        featured: true
      },
      sourceWeek: "2026-w19",
      sourceCompany: "Google / AI Studio",
      keyQuote: "이미지 생성이 별도 툴에서 앱 제작 워크플로우로 들어온다",
      editorial: "시각 결과물이 있어 전달력이 좋은 카드입니다. GPT-5.5가 텍스트와 코딩이라면, Nano Banana 2는 제작 워크플로우 쪽 체감 카드입니다."
    },
    {
      rank: 9,
      tier: "normal",
      post: {
        date: "4/27",
        platform: "X",
        title: "Alibaba HappyHorse 1.0 — 영상 생성 경쟁이 오디오·립싱크·API 생태계로 확장",
        summary: "HappyHorse 1.0은 영상 생성 AI 베타로, text/image/subject-to-video와 오디오·립싱크를 한 모델 경험으로 묶는 방향을 보여줍니다. 영상 생성 경쟁이 빠르게 넓어지고 있습니다.",
        content: `**이게 뭐예요?**
HappyHorse 1.0은 Alibaba 계열에서 공개한 영상 생성 AI 베타입니다. 텍스트·이미지·주제 기반 영상 생성, 1080p 출력, 동기 오디오와 립싱크 흐름을 함께 강조합니다.

**무엇이 달라졌나?**
영상 생성 경쟁이 단순히 예쁜 장면을 만드는 단계를 넘어 오디오, 립싱크, API 접근, 벤치마크 순위까지 함께 다투는 생태계로 바뀌고 있습니다.

**왜 바이럴한가?**
영상은 공유성이 강합니다. 강의 홍보, 숏폼, 제품 소개, 캐릭터 콘텐츠처럼 일반 사용자도 바로 활용 장면을 떠올릴 수 있습니다.

**읽을 때 볼 점**
데모 품질과 실제 사용 가능성은 다릅니다. 상업 이용 조건, 워터마크, 한국어 텍스트 처리, 편집 가능성, 지역 제한을 확인해야 합니다.`,
        source: "https://www.alibabacloud.com/blog/alibaba-rolls-out-happyhorse-1-0-in-limited-beta_603068",
        officialUrl: "https://www.alibabacloud.com/blog/alibaba-rolls-out-happyhorse-1-0-in-limited-beta_603068",
        backupUrls: [
          {
            label: "fal.ai",
            url: "https://fal.ai/happyhorse-1-0"
          },
          {
            label: "CNBC",
            url: "https://www.cnbc.com/2026/04/10/alibaba-happyhorse-ai-video-model-benchmark-reveal.html"
          }
        ],
        tags: ["Alibaba", "HappyHorse", "영상생성", "오디오", "공식"],
        featured: true
      },
      sourceWeek: "2026-w18",
      sourceCompany: "Alibaba / HappyHorse",
      keyQuote: "영상 생성은 이미지처럼 빠르게 API와 벤치마크 생태계로 들어간다",
      editorial: "영상 생성 카드는 대중성이 높습니다. 다만 공식 접근 조건과 실제 상용 가능성은 보수적으로 설명하는 편이 좋습니다."
    },
    {
      rank: 10,
      tier: "normal",
      post: {
        date: "5/06",
        platform: "X",
        title: "Andrej Karpathy + CLAUDE.md — 코딩은 타이핑에서 에이전트 위임으로 이동",
        summary: "Karpathy 브리핑과 CLAUDE.md 작업 원칙은 이번 3주 흐름을 사람의 작업 방식 변화로 정리합니다. 앞으로의 실력은 에이전트에게 일을 맡기고 검증 루프를 설계하는 능력에 가까워집니다.",
        content: `**이게 뭐예요?**
Karpathy가 말하는 핵심은 소프트웨어 개발의 병목이 직접 코딩에서 에이전트 위임, 메모리 설계, 토큰 처리량 운영으로 이동했다는 점입니다.

**무엇이 달라졌나?**
개발자는 한 줄씩 코드를 입력하는 사람보다, 에이전트에게 기능 단위 작업을 맡기고 결과를 검토하는 운영자에 가까워집니다. CLAUDE.md 같은 작업 지시서는 이 운영 방식을 코드화하는 문서가 됩니다.

**왜 바이럴한가?**
많은 사람이 이미 Claude Code, Codex, Cursor를 쓰면서 같은 문제를 겪고 있습니다. 모델이 똑똑해져도 지시가 흐리면 엉뚱한 파일을 건드리고, 검증 루프가 없으면 결과를 믿기 어렵습니다.

**읽을 때 볼 점**
좋은 사용자는 프롬프트 한 줄을 잘 쓰는 사람이 아니라, 목표·제약·테스트·완료 조건을 문서화해 에이전트가 오래 굴러가도 망가지지 않게 만드는 사람입니다.`,
        source: "https://youtu.be/kwSVtQ7dziU?si=-838led0Q315gHC6",
        officialUrl: "https://youtu.be/kwSVtQ7dziU?si=-838led0Q315gHC6",
        backupUrls: [
          {
            label: "Karpathy 원문",
            url: "https://x.com/karpathy/status/2015883857489522876"
          },
          {
            label: "Andrej Karpathy Skills",
            url: "https://github.com/forrestchang/andrej-karpathy-skills"
          }
        ],
        thumbnail: {
          src: "/ab/2026-04c/karpathy/karpathy-01-delegation.png",
          alt: "AI 에이전트에게 코딩 작업을 위임하는 개발자 워크플로우",
          caption: "코딩에서 위임으로 — 개발자의 병목이 타이핑에서 에이전트 운영으로 이동"
        },
        images: [
          {
            src: "/ab/2026-04c/karpathy/karpathy-01-delegation.png",
            alt: "AI 에이전트에게 코딩 작업을 위임하는 개발자 워크플로우",
            caption: "사람이 직접 타이핑하는 대신 에이전트에게 기능 단위 작업을 맡기는 흐름"
          },
          {
            src: "/ab/2026-04c/karpathy/karpathy-02-token-throughput.png",
            alt: "여러 AI 에이전트의 토큰 처리량을 감독하는 사람",
            caption: "실력은 구독 중인 에이전트의 token throughput을 오래 정확히 굴리는 능력"
          },
          {
            src: "/ab/2026-04c/karpathy/karpathy-04-program-md.png",
            alt: "Program MD 문서와 AI 에이전트 노드가 연결된 운영 매뉴얼",
            caption: "조직의 일하는 방식을 문서·메모리·검증 규칙으로 코드화"
          }
        ],
        tags: ["Karpathy", "CLAUDE.md", "Delegation", "AIAgents", "작업시스템"],
        featured: true
      },
      sourceWeek: "2026-w19",
      sourceCompany: "커뮤니티 / 오픈소스",
      keyQuote: "앞으로의 코딩 실력은 에이전트가 오래 굴러가도 망가지지 않게 만드는 능력이다",
      editorial: "마지막 하이라이트는 전체 흐름을 사람의 역할 변화로 닫아줍니다. 모델·도구·음성·영상 뉴스가 결국 작업 시스템 설계로 모입니다."
    }
  ],
  editorsPicks: [
    {
      title: "RTK — LLM 토큰 사용량을 60~90% 줄이는 Rust CLI proxy",
      subtitle: "에이전트 운영 비용을 줄이는 CLI 도구",
      category: "직접 써본 툴 추천 / 토큰 최적화",
      sourceUrl: "https://github.com/rtk-ai/rtk",
      sourceLabel: "GitHub 보기 →",
      summary: "개발 명령을 rtk proxy로 감싸 반복 출력과 불필요한 로그를 줄이고, Claude Code 세션의 토큰 소모를 크게 낮추는 오픈소스 Rust 단일 바이너리.",
      body: `왜 같이 봐야 하나

RTK는 화려한 생성형 AI 도구가 아니라, Claude Code를 오래 돌릴 때 바로 체감되는 비용 절감 도구입니다. hook으로 명령을 rtk <cmd> 형태로 감싸면 테스트, 빌드, git 상태 확인처럼 반복되는 CLI 출력에서 불필요한 토큰 낭비를 줄일 수 있습니다.

볼 포인트는 세 가지입니다. 첫째, AI 코딩 비용은 모델 가격만이 아니라 터미널 출력량에서도 새어 나갑니다. 둘째, 좋은 자동화는 새 기능을 만드는 것뿐 아니라 작업 환경의 마찰과 비용을 줄이는 데서도 나옵니다. 셋째, rtk gain, rtk gain --history, rtk discover 같은 명령으로 실제 절감량과 미사용 기회를 확인할 수 있습니다.

빌드 로그가 길거나 에이전트가 여러 번 검증 루프를 돌리는 프로젝트일수록 효과가 큽니다. 이번 큐레이션의 에이전트를 오래 굴리는 능력이라는 흐름을 비용과 운영 측면에서 보완하는 도구입니다.`,
      editorial: "사용자가 요청한 대로 기존 RTK 카드는 유지했습니다. 에이전트 운영을 오래 할수록 비용과 로그 관리가 실전 문제가 됩니다.",
      tags: ["RTK", "TokenOptimization", "ClaudeCode", "Rust", "오픈소스"],
      tier: "feature"
    },
    {
      title: "Harness — 도메인별 에이전트 팀과 스킬을 설계하는 meta-skill",
      subtitle: "직접 써본 툴 추천",
      category: "직접 써본 툴 추천 / 하네스 설계",
      sourceUrl: "https://github.com/revfactory/harness/tree/main",
      sourceLabel: "GitHub 보기 →",
      guideUrl: "https://revfactory.github.io/harness/",
      guideLabel: "문서 보기 →",
      summary: "도메인에 맞는 에이전트 팀을 설계하고, 각 에이전트가 사용할 스킬과 실행 규칙을 만드는 Claude Code용 하네스 설계 도구.",
      body: `왜 같이 봐야 하나

Harness는 단일 프롬프트를 잘 쓰는 도구라기보다, 반복되는 일을 에이전트 팀과 스킬 구조로 바꾸는 쪽에 가깝습니다. 뉴스 수집, 검증, 정규화, QA처럼 단계가 많은 작업을 한 사람의 기억에 의존하지 않고 재사용 가능한 작업 시스템으로 묶는 관점입니다.

이 큐레이션의 핵심이 에이전트 운영이라면, Harness는 그 운영 방식을 설계하는 도구입니다. 어떤 에이전트가 수집을 맡고, 누가 검증하고, 어떤 산출물을 파일로 넘기며, 어디서 사용자 승인을 받을지 정리할 수 있습니다.

볼 포인트는 meta-skill이라는 점입니다. 결과물을 바로 만들어 주는 도구라기보다, 결과물을 반복 생산하는 팀 구조와 규칙을 만드는 도구로 보면 이해가 쉽습니다.`,
      editorial: "사용자가 추가한 직접 사용 툴 추천입니다. VoidNews AB 하네스 자체도 이런 방식의 에이전트 팀 설계 흐름과 맞닿아 있습니다.",
      tags: ["Harness", "ClaudeCode", "AgentTeam", "Skills", "오픈소스"],
      tier: "feature"
    },
    {
      title: "Scenic — AI 영상 프롬프트 갤러리와 Seedance 2.0 기반 예시 탐색",
      subtitle: "영상 생성 프롬프트를 빠르게 훑는 참고 사이트",
      category: "직접 써본 툴 추천 / 영상 프롬프트",
      sourceUrl: "https://www.scenic.sh/",
      sourceLabel: "Scenic 보기 →",
      summary: "Seedance 2.0 기반 AI 영상 생성 프롬프트 갤러리. 장르, 스타일, 카메라 움직임별 예시를 보며 영상 프롬프트 감각을 빠르게 잡을 수 있습니다.",
      body: `왜 같이 봐야 하나

HappyHorse처럼 영상 생성 모델이 빠르게 올라오면, 다음 문제는 어떤 장면을 어떻게 지시할 것인가입니다. Scenic은 액션, 로맨스, 호러, SF, 판타지 같은 장르와 cinematic, realistic, anime, clay animation 같은 스타일별 예시를 둘러보는 프롬프트 갤러리입니다.

영상 생성은 텍스트 모델보다 결과의 감각 차이가 큽니다. 같은 모델이라도 카메라 움직임, 조명, 장르, 샷 구성을 어떻게 쓰느냐에 따라 결과가 크게 달라집니다. Scenic은 직접 만들기 전에 좋은 예시를 빠르게 훑는 용도로 적합합니다.

볼 포인트는 프롬프트 자체보다 구조입니다. 어떤 장면 설명이 들어가고, 어떤 카메라 동작이 붙고, 어떤 스타일 단어가 결과를 바꾸는지 관찰하면 자기 영상 프롬프트를 더 빨리 다듬을 수 있습니다.`,
      editorial: "사용자가 추가 요청한 Scenic을 영상 생성 흐름의 실전 참고 자료로 넣었습니다. HappyHorse 카드와 자연스럽게 이어집니다.",
      tags: ["Scenic", "VideoGeneration", "PromptGallery", "Seedance", "영상프롬프트"],
      tier: "normal"
    },
    {
      title: "Claude for Legal — Anthropic이 직접 공개한 법률 실무용 Claude 플러그인",
      subtitle: "도메인별 Claude 워크플로우 사례",
      category: "Threads Choi 추가 후보 / 도메인 특화 MCP",
      sourceUrl: "https://github.com/anthropics/claude-for-legal",
      sourceLabel: "GitHub 보기 →",
      summary: "Anthropic 공식 GitHub org의 법률 실무용 Claude 플러그인 모음. CLAUDE.md practice profile, cold-start interview, MCP 커넥터를 묶어 법무팀·로펌 워크플로우를 Claude 안에 넣는 사례입니다.",
      body: `왜 같이 봐야 하나

Threads의 Choi 채널에서 새로 잡힌 공식 출처 후보 중 하나입니다. Claude for Legal은 Anthropic 공식 GitHub 저장소에 올라온 법률 실무용 플러그인 모음입니다. 상업계약, M&A, 고용, 개인정보보호, 제품, 규제, 지식재산권, 소송, AI 거버넌스 같은 영역별로 Claude를 쓰는 방식을 나눕니다.

핵심은 법률 지식을 모델에게 막연히 묻는 것이 아니라, 각 팀의 playbook, escalation rule, house style을 CLAUDE.md practice profile로 고정한다는 점입니다. cold-start interview로 프로필을 만들고, 이후 스킬과 플러그인이 그 프로필을 참조합니다.

또 하나의 포인트는 MCP입니다. Ironclad, DocuSign, iManage, Everlaw, CourtListener, Google Drive, Slack 같은 업무 시스템과 연결되는 구조를 전제로 합니다. 즉, Claude가 일반 답변기가 아니라 도메인별 업무 환경에 들어가는 사례입니다.

다만 법률 도메인은 위험도가 높습니다. 저장소도 모든 산출물을 변호사 검토용 초안으로 보고, 관할권과 출처 확인, 전문적 책임은 사람이 가져야 한다는 점을 전제로 둡니다. 이 카드는 법률 조언 소개가 아니라, 도메인 특화 에이전트 워크플로우 설계 사례로 보는 것이 안전합니다.`,
      editorial: "Threads Choi 프로필에서 추가로 확인된 공식 출처 기반 후보입니다. Karpathy CLAUDE.md와 Harness 카드 사이에 놓으면 도메인별 작업 시스템 설계 흐름이 더 선명해집니다.",
      tags: ["Anthropic", "Claude", "Legal", "MCP", "CLAUDE.md"],
      tier: "feature"
    },
    {
      title: "Claude Code NotebookLM — Claude Code 안에서 NotebookLM을 다루는 /notebooklm 스킬 패키지",
      subtitle: "내가 직접 깎은 툴",
      category: "내가 직접 깎은 툴 / NotebookLM 자동화",
      sourceUrl: "https://github.com/VoidLight00/claude-code-notebooklm",
      sourceLabel: "GitHub 보기 →",
      summary: "Claude Code 대화 안에서 NotebookLM 생성, 소스 추가, Q&A, 오디오·비디오·슬라이드·리포트 산출물 생성을 다루기 위한 스킬 패키지.",
      body: `왜 마지막에 따로 넣나

이 저장소는 직접 깎은 Claude Code용 NotebookLM 자동화 패키지입니다. Claude Code 안에서 /notebooklm 명령으로 노트북 생성, 소스 관리, Q&A, 산출물 생성 흐름을 다루는 방향입니다.

핵심 가치는 도구 전환을 줄이는 것입니다. 자료를 모으고, NotebookLM에 넣고, 질문하고, 오디오 개요나 슬라이드·리포트 같은 산출물을 만드는 흐름을 Claude Code 대화 안으로 끌어옵니다. 개발자뿐 아니라 자료 정리와 강의 준비를 많이 하는 사용자에게도 의미가 있습니다.

볼 포인트는 소스 형식과 산출물입니다. URL, PDF, YouTube, 오디오, 비디오, 이미지 같은 다양한 입력을 NotebookLM 워크플로우에 넣고, Q&A와 인용, 오디오 개요, 비디오, 슬라이드, 리포트, 퀴즈, 플래시카드, 데이터 테이블, 마인드맵 같은 산출물로 이어가는 구조입니다.

보안 측면에서는 Google 계정 인증 파일을 로컬에 두는 흐름이므로, auth 파일 공유 금지와 로컬 자격증명 관리가 중요합니다.`,
      editorial: "사용자가 마지막 소개 카드 섹션으로 요청한 직접 제작 도구입니다. 이번 큐레이션의 결론인 작업 시스템 설계를 실제 개인 워크플로우로 옮기는 카드입니다.",
      tags: ["NotebookLM", "ClaudeCode", "Skill", "VoidLight", "작업자동화"],
      tier: "hero"
    }
  ]
};
