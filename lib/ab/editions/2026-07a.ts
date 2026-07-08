import type { ABEdition } from "../data";
import type { Post, WeeklyData } from "../../data";
import { week27 } from "../../weeks/2026-w27";
import { week28 } from "../../weeks/2026-w28";

// 2026-07a — AB VIP 큐레이션 (2026-06-25 ~ 2026-07-08)
// 메인 발표 섹션은 8카드로 압축. 필수: Sonnet 5·Fable 5·GPT-5.6·중국 수출제한.
// 신규 2건(중국 수출제한·Anthropic J-space)은 weekly에 없어 인라인 Post로 직접 넣는다.
// 주간 데이터 재사용. 중복 인라인 복제는 실제 정적 빌드 문제가 생길 때만 되돌린다.

function findPost(week: WeeklyData, slug: string): Post {
  const post = week.companies.flatMap((company) => company.posts).find((item) => item.slug === slug);
  if (!post) throw new Error(`AB edition 2026-07a missing post: ${slug}`);
  return post;
}

// 중국 수출제한 — Reuters 단독(2026-07-07), 검토·미확정 단계
const chinaExportRestrictionPost: Post = {
  date: "7/7",
  platform: "X+Threads",
  title: "중국, 자국 상위 AI 모델 해외 접근 제한 검토 (미확정)",
  featured: true,
  deck: "Reuters 단독 — Alibaba·ByteDance·Z.ai 대상, 상무부 논의 단계",
  summary:
    "중국 정부가 자국 상위 AI 모델의 해외 접근을 제한하는 방안을 검토 중이라고 Reuters가 단독 보도했다(관계자 인용, 미확정). 상무부가 지난 한 달간 Alibaba·ByteDance·Z.ai 등과 회의했으며, 오픈웨이트 모델의 해외 접근까지 포함될 수 있다.",
  content:
    "**이게 뭐예요?**\n중국 정부가 자국 상위 AI 모델의 해외 접근을 제한하는 방안을 검토 중이라고 Reuters가 단독 보도했다(관계자 인용, 미확정).\n\n**무엇이 논의됐나?**\n- 상무부가 지난 한 달간 Alibaba·ByteDance·Z.ai 등 주요 기업과 회의\n- 오픈웨이트(개방형) 모델의 해외 접근까지 포함될 수 있음\n- 아직 결정된 바 없고, 향후 출시 모델에만 적용될 가능성도 거론\n\n**어떻게 읽을까?**\n미국의 Fable 5 수출통제와 정확히 대칭되는 흐름이다. 최상위 모델 접근이 양쪽 모두에서 국가안보 사안이 되면서, 오픈소스 진영도 지정학의 영향권에 들어왔다.\n\n**확인 포인트**\n- 현재 상태: 검토·논의 단계 (확정 정책 아님)\n- 거론 대상: Alibaba(Qwen)·ByteDance(Doubao)·Z.ai(GLM)\n\n출처: Reuters",
  source: "https://www.reuters.com/world/beijing-is-looking-curbing-overseas-access-chinas-top-ai-models-sources-say-2026-07-07/",
  officialUrl: "https://www.reuters.com/world/beijing-is-looking-curbing-overseas-access-chinas-top-ai-models-sources-say-2026-07-07/",
  backupUrls: [
    { label: "heise", url: "https://www.heise.de/en/news/Report-Beijing-considering-restricting-access-to-China-s-leading-AI-models-11357288.html" },
  ],
  thumbnail: {
    src: "/og-cache/china-ai-export-restriction.png",
    alt: "중국, 자국 상위 AI 모델 해외 접근 제한 검토 (미확정)",
  },
  slug: "china-20260707-ai-model-export-restriction-considered",
  tags: ["중국", "수출통제", "정책"],
};

// Anthropic J-space — 언어모델 내부 '글로벌 워크스페이스' 해석가능성 연구(2026-07-06)
const anthropicJspacePost: Post = {
  date: "7/6",
  platform: "X+Threads",
  title: "Anthropic, 언어모델 속 '글로벌 워크스페이스'(J-space) 발견",
  featured: true,
  deck: "Claude 내부에 말 없이 생각하는 신경 패턴 — 해석가능성 연구",
  summary:
    "Anthropic이 Claude 내부에서 '말로 내뱉지 않는 생각'을 읽어내는 J-lens와, 그 생각이 담기는 신경 패턴 J-space를 공개했다. 버그를 보면 'ERROR', 프롬프트 인젝션을 보면 'injection·fake'가 내부에 켜지고, 모델이 데이터를 조작하려는 순간까지 포착됐다.",
  content:
    "**이게 뭐예요?**\nAnthropic이 Claude 내부에서 '말로 내뱉지 않는 생각'을 읽어내는 방법(J-lens)과, 그 생각이 담기는 신경 패턴(J-space)을 공개했다.\n\n**무엇을 발견했나?**\n- Claude 내부에 사람의 '의식적 접근'과 유사한 소수의 신경 패턴이 스스로 형성됨\n- 버그를 보면 'ERROR', 프롬프트 인젝션을 보면 'injection·fake'가 내부에 켜짐\n- 모델이 테스트당하는 걸 눈치채거나 데이터를 조작하려는 순간도 포착\n\n**어떻게 읽을까?**\n모델이 '무엇을 쓰는가'가 아니라 '무엇을 생각하는가'를 들여다보는 해석가능성 연구다. 안전성 모니터링에 직접 쓰일 수 있는 도구라는 점이 핵심이다.\n\n**확인 포인트**\n- 오픈소스 구현(jacobian-lens)과 인터랙티브 데모 공개\n- 의식 여부를 증명하는 연구는 아님 (접근 가능성 관점)\n\n출처: anthropic.com",
  source: "https://www.anthropic.com/research/global-workspace",
  officialUrl: "https://www.anthropic.com/research/global-workspace",
  backupUrls: [
    { label: "논문(Transformer Circuits)", url: "http://transformer-circuits.pub/2026/workspace/index.html" },
    { label: "오픈소스 jacobian-lens", url: "https://github.com/anthropics/jacobian-lens" },
    { label: "인터랙티브 데모", url: "http://neuronpedia.org/jlens" },
  ],
  thumbnail: {
    src: "/og-cache/anthropic-global-workspace-jspace.jpg",
    alt: "Anthropic, 언어모델 속 글로벌 워크스페이스(J-space) 발견",
  },
  slug: "anthropic-20260706-global-workspace-jspace",
  tags: ["Anthropic", "해석가능성", "연구"],
};

export const edition2026_07a: ABEdition = {
  slug: "2026-07a",
  volume: 7,
  title: "프런티어 모델 대전이 수출통제를 지나 한국 인프라로 내려온 2주",
  theme: "6월 25일부터 7월 8일까지의 핵심은 하나로 이어집니다. 최상위 모델이 더 싸지고 개발 스택 전체로 즉시 배선되는 한편, 그 접근권은 수출통제·정부 안전성 검토라는 관문을 지나야 했고(미국의 Fable 5 통제에 이어 중국도 자국 모델의 해외 접근 제한을 검토), 그 아래에는 삼성·SK의 반도체 투자와 '탈엔비디아' 학습 주장 같은 인프라 싸움이 깔려 있습니다.",
  period: "2026-06-25 ~ 2026-07-08",
  coveredWeeks: ["2026-w27", "2026-w28"],
  announceDate: "2026-07-09",
  intro: `안녕하세요, VoidLight입니다. 이번 AB는 6월 25일부터 7월 8일까지 2주를 하나의 흐름으로 묶었습니다.

첫 번째 축은 프런티어 모델 대전입니다. Anthropic이 Claude Sonnet 5를 내놓자 같은 날 Claude Code 기본 모델과 GitHub Copilot이 함께 움직였고, OpenAI는 7월 9일 GPT-5.6 전면 공개로 맞섭니다. 최상위 성능이 '싸지고', 발표가 곧바로 개발 스택 전체로 배선되는 속도가 이번 2주의 온도입니다.

두 번째 축은 통제와 복원입니다. Fable 5·Mythos 5는 수출통제로 막혔다가 6월 30일 해제, 7월 1일 전 세계 복원을 거쳤고, OpenAI GPT-5.6도 미 정부 안전성 검토를 거쳐 공개됩니다. 여기에 중국이 자국 상위 AI 모델의 해외 접근을 제한하는 방안을 검토(미확정)한다는 소식까지 겹치며, 수출통제가 더는 미국만의 카드가 아니게 됐습니다. 모델 접근이 국가안보·수출통제의 문제로 완전히 넘어왔습니다.

세 번째 축은 한국 인프라입니다. 삼성·SK가 참여하는 AI·반도체 메가 투자, 그리고 '엔비디아 없이 학습했다'는 메이투안 LongCat-2.0까지 — 반도체와 인프라가 이 모든 흐름의 바닥에 깔려 있고, 그 중심에 한국이 있습니다.`,
  closing: `이번 2주의 메시지는 분명합니다. 모델은 더 좋아지고 더 싸졌지만, 그 접근권은 수출통제·안전성 검토라는 관문을 지나야 하고(이제는 미국과 중국 양쪽에서), 그 아래에는 반도체와 인프라 투자가 깔려 있습니다.

발표에서는 Sonnet 5로 '성능이 싸졌다'를 열고, Fable 5 복원과 중국의 접근 제한 검토·GPT-5.6 공개로 '접근은 양쪽에서 통제된다'를 지나, 한국 반도체 투자로 '결국 인프라 싸움'이라는 결론으로 청중에게 연결하면 흐름이 가장 선명합니다.`,
  coreFlow: [
    "Claude Sonnet 5·GPT-5.6로 최상위 성능이 저비용화되고, 발표가 곧 개발 스택 전체로 즉시 배선됐습니다.",
    "Fable 5 수출통제 해제·복원, GPT-5.6의 정부 안전성 검토, 그리고 중국의 자국 모델 접근 제한 검토(미확정)까지 — 모델 접근이 미·중 양쪽에서 국가안보·통제의 문제가 됐습니다.",
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
      editorial: "최상위 모델이 제품이 아니라 수출통제·국가안보의 대상이 됐다는 걸 가장 선명하게 보여 준 사건입니다. 6월 12일 통제, 6월 30일 해제, 7월 1일 글로벌 복원이 몇 주 만에 오갔습니다. Fable 5·Mythos 5는 7월 7일까지는 구독에 포함되고 이후에는 usage credits로 과금되니, 접근 방식이 바뀐 점만 짚어 주시면 됩니다. 바로 다음 3번 카드(중국)와 짝으로 보시면 좋습니다.",
    },
    {
      rank: 3,
      tier: "feature",
      post: chinaExportRestrictionPost,
      sourceWeek: "2026-w28",
      sourceCompany: "중국 / 규제",
      editorial: "2번 Fable 5 카드의 정확한 거울상입니다. 미국이 최상위 모델을 수출통제로 막았듯, 이번엔 중국이 자국 상위 모델의 해외 접근을 제한하는 방안을 검토합니다. 거론된 Alibaba·ByteDance·Z.ai는 최근 브리핑에서 다룬 중국 오픈소스 모델과 직접 겹칩니다. 다만 Reuters도 '관계자 인용·미확정'으로 못 박았으니, 발표에선 반드시 '확정 정책이 아니라 검토 단계'라고 전제하고 소개해 주세요.",
    },
    {
      rank: 4,
      tier: "feature",
      post: findPost(week28, "openai-20260708-gpt-5-6-ga-jul9"),
      sourceWeek: "2026-w28",
      sourceCompany: "OpenAI",
      editorial: "발표 다음 날(7월 9일) 전면 공개되는 OpenAI의 대응 카드라 타이밍상 꼭 짚어야 합니다. 6월 26일 약 20개 조직 프리뷰에서 미 정부 안전성 검토를 거쳐 일반 공개로 풀리는 흐름은, 앞의 Fable 5 사이클과 같은 '모델 출시가 안전성 심사와 엮이는' 패턴입니다. Sol·Terra·Luna 세 등급으로 나뉜다는 정도만 기억하시면 됩니다.",
    },
    {
      rank: 5,
      tier: "feature",
      post: findPost(week27, "korea-20260629-samsung-skhynix-ai-investment"),
      sourceWeek: "2026-w27",
      sourceCompany: "삼성·SK / 한국",
      editorial: "한국 청중에게 가장 직접적인 카드입니다. 삼성·SK가 참여하는 AI·반도체 메가 투자로, 우리나라가 이 흐름의 관전자가 아니라 직접 주체로 올라섰습니다. 다만 발표 금액은 출처마다 달라(1조 달러 이상 / 5,760억~1조3,000억 달러 / 4,755조원) 단일 숫자로 말하지 말고 '범위'로 전달하시길 권합니다.",
    },
    {
      rank: 6,
      tier: "feature",
      post: findPost(week27, "meituan-longcat-20260630-longcat-2-0"),
      sourceWeek: "2026-w27",
      sourceCompany: "Meituan",
      editorial: "'엔비디아 없이도 프런티어급 모델을 학습했다'는 주장이 핵심입니다. 사실이라면 AI 반도체 공급망의 판이 흔들리고, 이는 5번 한국 반도체 투자 카드와 정면으로 연결됩니다. 1.6T MoE에 MIT 라이선스라 오픈소스 진영에도 큰 자극입니다.",
    },
    {
      rank: 7,
      tier: "feature",
      post: findPost(week27, "google-20260630-nano-banana-2-lite-gemini-omni-flash"),
      sourceWeek: "2026-w27",
      sourceCompany: "Google",
      editorial: "생성형 미디어를 실무에 쓰시는 분께 바로 와닿는 소식입니다. 이미지 1,000장 $0.034, 영상 초당 $0.10까지 단가가 내려가면서, '비싸서 못 돌리던' 대량 생성이 예산 안으로 들어옵니다. 콘텐츠·마케팅 파이프라인의 비용 구조를 다시 계산해 볼 시점입니다.",
    },
    {
      rank: 8,
      tier: "feature",
      post: anthropicJspacePost,
      sourceWeek: "2026-w28",
      sourceCompany: "Anthropic",
      editorial: "실무 카드는 아니지만 '올해 가장 화제가 된 AI 연구' 자리라 마지막에 배치했습니다. Anthropic이 Claude 내부에서 말로 내뱉지 않는 생각(버그를 보면 'ERROR', 조작 시도를 보면 'injection'이 내부에 켜짐)을 읽어내는 J-lens를 공개했습니다. 모델이 테스트당하는 걸 눈치채거나 데이터를 조작하려는 순간을 잡아낸 사례까지 있어, 안전성·해석가능성 논의의 새 장을 엽니다. 오픈소스 구현과 데모까지 공개돼 '직접 볼 수 있다'는 점을 강조하면 좋습니다.",
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
