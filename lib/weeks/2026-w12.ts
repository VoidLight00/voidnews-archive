// Week 12 (3/17 ~ 3/19) — extracted verbatim from lib/data.ts (refactor, no content change)

import type { WeeklyData } from "../data";

export const week12: WeeklyData = {
  week: 12,
  year: 2026,
  slug: "2026-w12",
  period: "3/17 ~ 3/19",
  totalPosts: 14,
  companies: [
    {
      name: "Anthropic / Claude",
      color: "#E87040",
      posts: [
        { date: "3/19 19:00", platform: "X+Threads", title: "Claude Code 데스크탑 프리뷰 공개", summary: "네이티브 앱 형태의 Claude Code — 터미널 없이 데스크탑에서 코딩 에이전트 실행", content: "네이티브 앱 형태의 Claude Code — 터미널 없이 데스크탑에서 코딩 에이전트 실행" },
        { date: "3/19 18:30", platform: "X", title: "Anthropic 81K 직원 조사 발표", officialUrl: "https://x.com/AnthropicAI/status/2034302152945144166", summary: "81,000명 대상 AI 사용 패턴 연구 — 생산성 영향 정량 분석", content: "81,000명 대상 AI 사용 패턴 연구 — 생산성 영향 정량 분석" },
        { date: "3/18 21:09", platform: "X+Threads", title: "Claw-Eval 벤치마크 공개", summary: "Claude 성능 자체 평가 지표 — 실제 코딩 작업 기반 벤치마크", content: "Claude 성능 자체 평가 지표 — 실제 코딩 작업 기반 벤치마크" },
        { date: "3/18", platform: "X", title: "조건을 걸면 스킬이 자동 실행된다 — Claude Code 트리거 자동화", summary: "특정 조건에서 자동으로 스킬을 불러오는 트리거 자동화", content: "특정 조건에서 자동으로 스킬을 불러오는 트리거 자동화" },
        { date: "3/18", platform: "X", title: "Claude Dispatch (Cowork) 원격 제어", summary: "원격에서 Claude 에이전트를 지휘하는 Dispatch 프레임워크", content: "원격에서 Claude 에이전트를 지휘하는 Dispatch 프레임워크" },
      ],
    },
    {
      name: "기타",
      color: "#6B7280",
      posts: [
        {
          date: "3/28", platform: "X+Threads",
          title: "AI가 똑똑해질수록 사람은 생각하기를 포기한다 — 인지 위임의 역설",
          officialUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646",
          summary: "AI 의존이 깊어질수록 비판적 사고 능력이 저하되는 현상 — SSRN 연구",
          content: "AI가 발전할수록 사람들이 더 편리해지는 게 아니라 더 멍청해질 수도 있다는 연구가 나왔습니다.\n\nSSRN에 올라온 이 연구는 AI 의존도가 높아질수록 비판적 사고 능력이 퇴화한다는 현상을 분석했어요.\n\n핵심 메커니즘은 인지 위임입니다. AI가 답을 주면 사람이 직접 생각하는 과정을 건너뛰게 되고, 그 능력 자체가 약해진다는 거예요.\n\n계산기가 나온 뒤 암산 능력이 약해진 것처럼, AI가 나온 뒤 추론 능력이 약해지는 패턴이에요.\n\n역설적이지만, AI를 잘 쓰려면 AI 없이 생각하는 근육을 유지해야 합니다. 도구에 의존할수록 도구 없이는 아무것도 못하게 되는 구조가 만들어지고 있어요.",
          source: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646",
        },
        {
          date: "3/28", platform: "X+Threads",
          title: "논문을 읽고 실험을 복제한다 — 연구용 오픈소스 AI 에이전트 Feynman",
          officialUrl: "https://github.com/getcompanion-ai/feynman",
          summary: "논문 검색·분석·실험 복제·피어 리뷰 자동화 — Claude Code 기반 오픈소스 연구 에이전트",
          content: "Claude Code를 연구자 전용으로 특화한 오픈소스 에이전트 Feynman이 공개됐습니다.\n\n이름은 물리학자 리처드 파인만에서 땄어요. 이해하지 못하면 가르칠 수 없다는 그의 철학을 AI 연구 에이전트에 적용했습니다.\n\n할 수 있는 일이 실용적이에요.\n\n논문 키워드로 검색하면 관련 논문들을 수집하고 인용 관계를 분석합니다. 실험 방법론을 읽고 코드로 복제를 시도하고요. 피어 리뷰 형식으로 논문의 강점과 약점을 분석해요.\n\n'이 스케일링 법칙에 대해 우리가 아는 게 뭐지?'라고 물으면 논문과 웹을 검색해서 인용 포함 리서치 브리핑을 만들어줍니다.\n\nClaude Code가 코딩 에이전트라면, Feynman은 연구 에이전트예요.",
          source: "https://github.com/getcompanion-ai/feynman",
        },
        {
          date: "3/28", platform: "X+Threads",
          title: "경험에서 스킬을 만드는 자가 학습 에이전트 — Hermes Agent",
          officialUrl: "https://x.com/NousResearch/status/2026758996107898954",
          summary: "NousResearch의 자가 개선 AI 에이전트 — 경험으로 스킬 생성, 과거 대화 검색, 사용자 모델 학습",
          content: "Nous Research가 자기 자신을 개선하는 AI 에이전트 Hermes Agent를 오픈소스로 공개했습니다.\n\n일반 AI 에이전트와 다른 점이 하나 있어요. 경험에서 스킬을 만듭니다.\n\n작업을 수행하면서 배운 패턴을 스킬로 저장하고, 다음번에 비슷한 상황이 오면 그 스킬을 꺼내 씁니다. 과거 대화를 검색해서 이전에 어떻게 처리했는지 참고하고요.\n\n사용자 모델도 쌓아가요. 대화가 쌓일수록 당신이 어떤 사람인지, 어떤 방식을 선호하는지를 학습합니다.\n\n$5짜리 VPS에서도 돌아가고, Telegram으로 명령을 보내면 서버에서 작업을 처리하는 구조입니다.\n\nOpenClaw와 비슷한 방향이지만, 자가 학습 루프에 초점을 맞춘 접근이에요.",
          source: "https://github.com/nousresearch/hermes-agent",
        },
        {
          date: "3/28", platform: "X+Threads",
          title: "YC CEO가 직접 공개한 Claude Code 스킬셋 — gstack",
          officialUrl: "https://x.com/garrytan/status/2032014570118922347",
          summary: "Y Combinator CEO 개리 탄의 실전 Claude Code 15개 스킬 — CEO·디자이너·엔지니어링 매니저 역할 분담",
          content: "Y Combinator CEO 개리 탄이 자신이 실제로 쓰는 Claude Code 스킬 셋업을 오픈소스로 공개했습니다.\n\n이름은 gstack. 15개의 스킬로 이루어져 있어요.\n\nCEO, 디자이너, 엔지니어링 매니저, 릴리즈 매니저, 문서 엔지니어, QA 역할을 각각 맡은 스킬들이에요. 혼자서 팀 전체를 시뮬레이션하는 구조입니다.\n\n개리 탄은 리드미에서 이렇게 말해요. 12월부터 코드를 거의 직접 타이핑하지 않았다. Andrej Karpathy와 같은 이야기예요.\n\nPeter Steinberger는 OpenClaw를 거의 혼자 만들었고, GitHub 스타 24만 7천 개를 달성했습니다. 올바른 툴을 갖춘 1인 빌더가 팀 전체보다 빠르게 움직이는 시대예요.\n\ngstack은 그 출발점을 낮춰주는 구체적인 예시입니다.",
          source: "https://github.com/garrytan/gstack",
        },
        {
          date: "3/28",
          platform: "X+Threads",
          title: "SKILL.md를 밤새 자동 개선한다 — autoimprove-cc 공개",
          officialUrl: "https://github.com/VoidLight00/autoimprove-cc",
          source: "https://github.com/VoidLight00/autoimprove-cc",
          summary: "Karpathy autoresearch 루프를 Claude Code SKILL.md에 적용 — /autoimprove 한 줄로 밤새 자동 개선",
          content: "Karpathy의 autoresearch 루프를 SKILL.md에 적용한 Claude Code 네이티브 도구입니다.\n\n/autoimprove 한 줄로 실행하면, Claude Code가 밤새 스스로 스킬을 개선합니다.\n\n작동 원리:\n1. SKILL.md 읽기\n2. eval.json의 binary assertions로 품질 채점\n3. 실패한 assertion을 고치도록 SKILL.md 수정\n4. 재채점 → 점수 올랐으면 git commit, 아니면 git reset\n5. 100% 달성하거나 max_loops까지 반복\n\nKarpathy는 train.py의 수치 메트릭을 씁니다. 이 도구는 binary assertions(참/거짓 테스트)의 패스율을 메트릭으로 씁니다.\n\n스킬 품질도 수치화할 수 있다면 자동 최적화가 가능하다는 게 핵심 아이디어예요.\n\nPython, Node.js 없이 Claude Code만 필요합니다.",
        },
        { date: "3/17 03:25", platform: "X+Threads", title: "Perplexity Comet + Computer 기능 확장", officialUrl: "https://x.com/perplexity_ai/status/2034668608375382346", summary: "브라우저 에이전트 Comet에 Computer Use 기능 통합", content: "브라우저 에이전트 Comet에 Computer Use 기능 통합" },
        { date: "3/17 01:22", platform: "X+Threads", title: "Perplexity Computer 안드로이드 출시", officialUrl: "https://x.com/perplexity_ai/status/2034668608375382346", summary: "모바일 에이전트 정식 공개 — 안드로이드 화면 자율 제어", content: "모바일 에이전트 정식 공개 — 안드로이드 화면 자율 제어" },
        { date: "3/22 19:05", platform: "X", title: "Mistral Forge 엔터프라이즈 출시", officialUrl: "https://techcrunch.com/2026/03/17/mistral-forge-nvidia-gtc-build-your-own-ai-enterprise/", summary: "기업용 파인튜닝 플랫폼 — 프라이빗 Mistral 모델 구축 서비스", content: "기업용 파인튜닝 플랫폼 — 프라이빗 Mistral 모델 구축 서비스" },
        { date: "3/17 13:00", platform: "X+Threads", title: "Mistral Small 4 (119B, Apache 2.0)", officialUrl: "https://x.com/MistralAI/status/2033639897046798413", summary: "오픈소스 최강 경량 모델 — Apache 2.0으로 자유롭게 활용 가능", content: "오픈소스 최강 경량 모델 — Apache 2.0으로 자유롭게 활용 가능" },
        { date: "3/17 05:21", platform: "X+Threads", title: "xAI Grok TTS API 5가지 음성 공개", officialUrl: "https://x.com/xAI/status/2033738421884932231", summary: "Grok 기반 텍스트-음성 변환 API — 5가지 음성 스타일 선택 가능", content: "Grok 기반 텍스트-음성 변환 API — 5가지 음성 스타일 선택 가능" },
        { date: "3/19", platform: "X+Threads", title: "LTX-Video 2.3 업데이트", summary: "고품질 AI 비디오 생성 모델 — 해상도 및 일관성 대폭 개선", content: "고품질 AI 비디오 생성 모델 — 해상도 및 일관성 대폭 개선" },
        { date: "3/19", platform: "X+Threads", title: "Visa CLI + AI 에이전트 결제 인프라", summary: "에이전트가 직접 결제하는 시대 — Visa API로 자율 결제 가능", content: "에이전트가 직접 결제하는 시대 — Visa API로 자율 결제 가능" },
        { date: "3/19 18:50", platform: "X+Threads", title: "NVIDIA 오픈 모델 데이터셋 공개", summary: "학습 데이터 오픈소스화 — AI 연구 생태계 기여", content: "학습 데이터 오픈소스화 — AI 연구 생태계 기여" },
        { date: "3/18", platform: "X+Threads", title: "ChatGPT 모델 셀렉터 UI 개선", officialUrl: "https://x.com/OpenAI/status/2033953592424731072", summary: "더 직관적인 모델 선택 인터페이스 — GPT-4o/4/3.5 전환 간소화", content: "더 직관적인 모델 선택 인터페이스 — GPT-4o/4/3.5 전환 간소화" },
      ],
    },
  ],
};
