import type { ABEdition } from "../data";
import type { Post, WeeklyData } from "../../data";
import { week27 } from "../../weeks/2026-w27";
import { week28 } from "../../weeks/2026-w28";

// 2026-07a — AB VIP 큐레이션 (2026-06-25 ~ 2026-07-08)
// 주간 데이터 재사용. 중복 인라인 복제는 실제 정적 빌드 문제가 생길 때만 되돌린다.

function findPost(week: WeeklyData, slug: string): Post {
  const post = week.companies.flatMap((company) => company.posts).find((item) => item.slug === slug);
  if (!post) throw new Error(`AB edition 2026-07a missing post: ${slug}`);
  return post;
}

export const edition2026_07a: ABEdition = {
  slug: "2026-07a",
  volume: 7,
  title: "프런티어 모델 대전이 수출통제를 지나 한국 인프라로 내려온 2주",
  theme: "6월 25일부터 7월 8일까지의 핵심은 하나로 이어집니다. 최상위 모델이 더 싸지고 개발 스택 전체로 즉시 배선되는 한편, 그 접근권은 수출통제·정부 안전성 검토라는 관문을 지나야 했고, 그 아래에는 삼성·SK의 반도체 투자와 '탈엔비디아' 학습 주장 같은 인프라 싸움이 깔려 있습니다.",
  period: "2026-06-25 ~ 2026-07-08",
  coveredWeeks: ["2026-w27", "2026-w28"],
  announceDate: "2026-07-09",
  intro: `안녕하세요, VoidLight입니다. 이번 AB는 6월 25일부터 7월 8일까지 2주를 하나의 흐름으로 묶었습니다.

첫 번째 축은 프런티어 모델 대전입니다. Anthropic이 Claude Sonnet 5를 내놓자 같은 날 Claude Code 기본 모델과 GitHub Copilot이 함께 움직였고, OpenAI는 7월 9일 GPT-5.6 전면 공개로 맞섭니다. 최상위 성능이 '싸지고', 발표가 곧바로 개발 스택 전체로 배선되는 속도가 이번 2주의 온도입니다.

두 번째 축은 통제와 복원입니다. Fable 5·Mythos 5는 수출통제로 막혔다가 6월 30일 해제, 7월 1일 전 세계 복원을 거쳤고, OpenAI GPT-5.6도 미 정부 안전성 검토를 거쳐 공개됩니다. 모델 접근이 국가안보·수출통제의 문제로 완전히 넘어왔습니다.

세 번째 축은 한국 인프라입니다. 삼성·SK가 참여하는 AI·반도체 메가 투자, 그리고 '엔비디아 없이 학습했다'는 메이투안 LongCat-2.0까지 — 반도체와 인프라가 이 모든 흐름의 바닥에 깔려 있고, 그 중심에 한국이 있습니다.`,
  closing: `이번 2주의 메시지는 분명합니다. 모델은 더 좋아지고 더 싸졌지만, 그 접근권은 수출통제·안전성 검토라는 관문을 지나야 하고, 그 아래에는 반도체와 인프라 투자가 깔려 있습니다.

발표에서는 Sonnet 5로 '성능이 싸졌다'를 열고, Fable 5 복원과 GPT-5.6 공개로 '접근은 통제된다'를 지나, 한국 반도체 투자로 '결국 인프라 싸움'이라는 결론으로 청중에게 연결하면 흐름이 가장 선명합니다.`,
  coreFlow: [
    "Claude Sonnet 5·GPT-5.6로 최상위 성능이 저비용화되고, 발표가 곧 개발 스택 전체로 즉시 배선됐습니다.",
    "Fable 5 수출통제 해제·복원과 GPT-5.6의 정부 안전성 검토로, 모델 접근이 국가안보·통제의 문제가 됐습니다.",
    "삼성·SK 메가 투자와 메이투안의 '탈엔비디아' 학습 주장까지, 이 흐름의 바닥에는 반도체·인프라가 있고 그 중심에 한국이 있습니다.",
  ],
  highlights: [
    {
      rank: 1,
      tier: "hero",
      post: findPost(week27, "anthropic-20260630-claude-sonnet-5"),
      sourceWeek: "2026-w27",
      sourceCompany: "Anthropic",
      editorial: "이번 2주의 출발점입니다. 최상위급 성능을 절반 이하 비용으로 쓸 수 있게 되면서, 여러분이 쓰는 Claude 앱과 Claude Code의 기본값 자체가 바뀌었습니다. '좋은 모델을 골라 쓰는' 문제가 '기본 모델이 이미 충분히 좋은' 문제로 넘어간 신호라, 실무 도구 선택 기준을 다시 잡을 시점입니다.",
    },
    {
      rank: 2,
      tier: "hero",
      post: findPost(week27, "anthropic-20260630-redeploying-fable-5"),
      sourceWeek: "2026-w27",
      sourceCompany: "Anthropic",
      editorial: "최상위 모델이 제품이 아니라 수출통제·국가안보의 대상이 됐다는 걸 가장 선명하게 보여 준 사건입니다. 6월 12일 통제, 6월 30일 해제, 7월 1일 글로벌 복원이 몇 주 만에 오갔습니다. Fable 5·Mythos 5는 7월 7일까지는 구독에 포함되고 이후에는 usage credits로 과금되니, 접근 방식이 바뀐 점만 짚어 주시면 됩니다.",
    },
    {
      rank: 3,
      tier: "hero",
      post: findPost(week27, "korea-20260629-samsung-skhynix-ai-investment"),
      sourceWeek: "2026-w27",
      sourceCompany: "삼성·SK / 한국",
      editorial: "한국 청중에게 가장 직접적인 카드입니다. 삼성·SK가 참여하는 AI·반도체 메가 투자로, 우리나라가 이 흐름의 관전자가 아니라 직접 주체로 올라섰습니다. 다만 발표 금액은 출처마다 달라(1조 달러 이상 / 5,760억~1조3,000억 달러 / 4,755조원) 단일 숫자로 말하지 말고 '범위'로 전달하시길 권합니다.",
    },
    {
      rank: 4,
      tier: "feature",
      post: findPost(week27, "google-20260630-nano-banana-2-lite-gemini-omni-flash"),
      sourceWeek: "2026-w27",
      sourceCompany: "Google",
      editorial: "생성형 미디어를 실무에 쓰시는 분께 바로 와닿는 소식입니다. 이미지 1,000장 $0.034, 영상 초당 $0.10까지 단가가 내려가면서, '비싸서 못 돌리던' 대량 생성이 예산 안으로 들어옵니다. 콘텐츠·마케팅 파이프라인의 비용 구조를 다시 계산해 볼 시점입니다.",
    },
    {
      rank: 5,
      tier: "feature",
      post: findPost(week28, "openai-20260708-gpt-5-6-ga-jul9"),
      sourceWeek: "2026-w28",
      sourceCompany: "OpenAI",
      editorial: "발표 다음 날(7월 9일) 전면 공개되는 OpenAI의 대응 카드라 타이밍상 꼭 짚어야 합니다. 6월 26일 약 20개 조직 프리뷰에서 미 정부 안전성 검토를 거쳐 일반 공개로 풀리는 흐름은, 앞의 Fable 5 사이클과 같은 '모델 출시가 안전성 심사와 엮이는' 패턴입니다. Sol·Terra·Luna 세 등급으로 나뉜다는 정도만 기억하시면 됩니다.",
    },
    {
      rank: 6,
      tier: "feature",
      post: findPost(week27, "meituan-longcat-20260630-longcat-2-0"),
      sourceWeek: "2026-w27",
      sourceCompany: "Meituan",
      editorial: "'엔비디아 없이도 프런티어급 모델을 학습했다'는 주장이 핵심입니다. 사실이라면 AI 반도체 공급망의 판이 흔들리고, 이는 3번 한국 반도체 투자 카드와 정면으로 연결됩니다. 1.6T MoE에 MIT 라이선스라 오픈소스 진영에도 큰 자극입니다.",
    },
    {
      rank: 7,
      tier: "feature",
      post: findPost(week28, "anthropic-20260702-fable-5-cyber-safeguards-jailbreak-framework"),
      sourceWeek: "2026-w28",
      sourceCompany: "Anthropic",
      editorial: "2번 카드(수출통제 복원)의 뒷이야기입니다. 최상위 모델을 다시 푸는 대신 어떤 안전장치를 붙였는지를 보여 주는데, 모델 접근 재개와 방어 프레임워크가 늘 한 묶음으로 움직인다는 점을 이해하기 좋은 사례입니다.",
    },
    {
      rank: 8,
      tier: "feature",
      post: findPost(week27, "claude-code-20260701-2-1-198"),
      sourceWeek: "2026-w27",
      sourceCompany: "Anthropic",
      editorial: "Claude Code를 매일 쓰시는 분이 당장 체감할 업데이트라 골랐습니다. Claude in Chrome 정식 출시와 백그라운드 서브에이전트 기본화로, 브라우저 작업과 병렬 작업이 기본 동선에 들어옵니다. 업데이트만 하면 바로 달라지는 변화입니다.",
    },
    {
      rank: 9,
      tier: "feature",
      post: findPost(week27, "meta-20260629-brain2qwerty"),
      sourceWeek: "2026-w27",
      sourceCompany: "Meta",
      editorial: "실무보다는 'AI가 어디까지 왔나'를 보여 주는 화제성 카드입니다. 두개골을 열지 않고(비침습) 뇌 신호를 단어 정확도 61%로 텍스트화했는데, 수술 이식과의 격차를 좁혔다는 점이 의미 있습니다. 아직 연구 단계라는 전제는 분명히 하고 소개해 주세요.",
    },
    {
      rank: 10,
      tier: "feature",
      post: findPost(week27, "deepseek-20260627-dspark-deepspec"),
      sourceWeek: "2026-w27",
      sourceCompany: "DeepSeek",
      editorial: "모델이 아니라 '추론을 더 빠르게 돌리는 방법'을 오픈소스로 푼 카드입니다. 같은 GPU로 더 많은 응답을 뽑는 최적화라 비용에 직결되고, 6번 LongCat과 함께 중국 오픈소스 진영의 실전 경쟁력을 보여 줍니다. 60~85% 속도 향상은 아직 벤더 주장이라는 점만 붙여 주세요.",
    },
  ],
  editorsPicks: [
    {
      title: "teamclaude — 다계정 Claude 프록시로 쿼터 자동 로테이션",
      category: "개발 도구 / Claude 프록시",
      deck: "여러 Claude 계정을 묶어 쿼터를 자동으로 돌려 쓰는 프록시",
      sourceUrl: "https://github.com/jung-wan-kim/teamclaude",
      sourceLabel: "GitHub →",
      summary: "여러 Claude 계정을 하나로 묶어 쿼터 한도에 걸리면 자동으로 다음 계정으로 넘겨 주는 오픈소스 프록시.",
      body: "teamclaude는 여러 Claude 계정을 하나의 프록시 뒤에 묶고, 쿼터(사용 한도)에 도달하면 자동으로 다음 계정으로 돌려(rotation) 요청을 이어 주는 오픈소스 도구입니다. 장시간 에이전트 작업을 돌릴 때 한 계정의 한도에 막혀 멈추는 상황을 줄여 줍니다.\n\nJavaScript로 작성됐고 이번 창 기간에 활발히 업데이트됐습니다(2026-07-04 기준). 라이선스는 별도로 명시돼 있지 않으니 실제 도입 전 확인이 필요합니다.",
      editorial: "Sonnet 5·Fable 5로 모델을 더 많이, 더 오래 돌리게 되는 이번 2주 흐름과 딱 맞는 실전 도구라 골랐습니다. 한도 관리를 자동화하고 싶은 분께 유용합니다.",
      tags: ["Claude", "프록시", "오픈소스"],
      tier: "feature",
      thumbnail: {
        src: "/og-cache/teamclaude-다계정-claude-프록시로-쿼터-자동-로테이션-fd46c60b.png",
        alt: "teamclaude — 다계정 Claude 프록시로 쿼터 자동 로테이션",
      },
    },
    {
      title: "Comfy MCP — 에이전트를 ComfyUI 창작 스택에 연결",
      category: "개발 도구 / 에이전트·MCP",
      deck: "Claude·Cursor를 ComfyUI 생성 워크플로우에 잇는 첫 MCP",
      sourceUrl: "https://blog.comfy.org/p/comfy-mcp-turn-your-agent-into-a",
      sourceLabel: "공식 블로그 →",
      summary: "Claude·Cursor 같은 에이전트를 ComfyUI에 연결해 자연어로 이미지·영상·3D·오디오 생성 워크플로우를 조립·실행하는 MCP.",
      body: "Comfy MCP는 Claude·Cursor 같은 에이전트를 ComfyUI 생성 스택에 연결하는 첫 MCP입니다. 노드를 직접 잇지 않아도 자연어로 이미지·영상·3D·오디오 생성 워크플로우를 만들고 편집·실행할 수 있어, 대화형으로 제품급 창작 파이프라인을 조립하게 됩니다.\n\nComfy Org 공식 블로그로 이번 창 기간에 공개됐습니다(2026-06-29).",
      editorial: "에이전트가 IDE·협업 도구를 넘어 '창작 스택'까지 상주하는 이번 2주 흐름을 가장 잘 보여 주는 도구라 골랐습니다. teamclaude가 실행 인프라라면, 이쪽은 창작 워크플로 접점입니다.",
      tags: ["ComfyUI", "MCP", "에이전트"],
      tier: "feature",
      thumbnail: {
        src: "/og-cache/comfy-org-comfy-mcp-공개-에이전트를-comfyui-생성--5d49e21b.jpg",
        alt: "Comfy MCP — 에이전트를 ComfyUI 창작 스택에 연결",
      },
    },
  ],
};
