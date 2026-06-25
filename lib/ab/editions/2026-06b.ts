import type { ABEdition } from "../data";
import type { Post, WeeklyData } from "../../data";
import { week25 } from "../../weeks/2026-w25";
import { week26 } from "../../weeks/2026-w26";

// 2026-06b — AB VIP 큐레이션 (2026-06-11 ~ 2026-06-24)
// ponytail: 주간 데이터 재사용. 중복 인라인 복제는 실제 정적 빌드 문제가 생길 때만 되돌린다.

function findPost(week: WeeklyData, slug: string): Post {
  const post = week.companies.flatMap((company) => company.posts).find((item) => item.slug === slug);
  if (!post) throw new Error(`AB edition 2026-06b missing post: ${slug}`);
  return post;
}

export const edition2026_06b: ABEdition = {
  slug: "2026-06b",
  volume: 6,
  title: "프런티어 모델은 막히고, 에이전트는 팀원과 인프라가 된 2주",
  theme: "6월 11일부터 24일까지의 핵심은 하나입니다. 최상위 모델 접근은 국가안보와 수출통제의 문제로 바뀌었고, 동시에 에이전트는 IDE·Slack·로봇·보안 운영 안으로 들어가 실제 팀원과 인프라처럼 배치되기 시작했습니다.",
  period: "2026-06-11 ~ 2026-06-24",
  coveredWeeks: ["2026-w25", "2026-w26"],
  announceDate: "2026-06-24",
  intro: `안녕하세요, VoidLight입니다. 이번 AB는 6월 11일부터 24일까지의 흐름을 두 축으로 묶었습니다.

첫 번째 축은 통제입니다. Anthropic Fable 5·Mythos 5 접근 차단은 최상위 AI 모델이 단순한 제품이 아니라 국가안보·수출통제 대상이 됐다는 신호입니다.

두 번째 축은 배치입니다. Claude Tag, GitHub Copilot의 agent provider, OpenAI Codex Record & Replay, xAI Grok Build /goal처럼 에이전트는 이제 별도 도구가 아니라 팀 협업·IDE·보안·로봇 워크플로 안에 놓이고 있습니다.

한국 관점에서는 삼성의 전사 ChatGPT Enterprise·Codex 도입과 SK하이닉스 HBM4E 흐름이 중요합니다. 소프트웨어 사용과 물리 인프라 양쪽에서 한국 기업이 직접 연결됐습니다.`,
  closing: `이번 2주의 메시지는 단순합니다. 좋은 모델을 쓰는 시대에서, 모델 접근권·운영 방식·조직 배치·인프라 병목을 함께 설계해야 하는 시대로 넘어가고 있습니다.

발표에서는 Fable 5 접근 차단을 시작점으로 잡고, Claude Tag와 Codex Record & Replay를 거쳐, 삼성과 SK하이닉스 사례로 한국 청중에게 연결하면 흐름이 가장 선명합니다.`,
  coreFlow: [
    "Fable 5·Mythos 5 접근 차단으로 프런티어 모델이 지정학과 수출통제의 대상이 됐습니다.",
    "Claude Tag·GitHub agent provider·Codex Record & Replay·Grok /goal로 에이전트가 도구에서 팀원·워크플로 인프라로 이동했습니다.",
    "삼성의 전사 AI 도입과 SK하이닉스 HBM4E는 한국 기업이 소프트웨어 활용과 물리 인프라 양쪽에서 이 흐름에 들어왔음을 보여 줍니다.",
  ],
  highlights: [
    {
      rank: 1,
      tier: "hero",
      post: findPost(week25, "anthropic-fable-5-mythos-5-96ce470e"),
      sourceWeek: "2026-w25",
      sourceCompany: "Anthropic",
      editorial: "프런티어 모델 접근이 국가안보·수출통제 문제로 넘어간 사건입니다.",
    },
    {
      rank: 2,
      tier: "feature",
      post: findPost(week26, "chatgpt-enterprise-codex-openai-13e45af8"),
      sourceWeek: "2026-w26",
      sourceCompany: "OpenAI",
      editorial: "한국 대기업 단위로 ChatGPT Enterprise와 Codex가 전사 배포되는 직접 사례입니다.",
    },
    {
      rank: 3,
      tier: "hero",
      post: findPost(week25, "zai-glm-5-2-cb54c1db"),
      sourceWeek: "2026-w25",
      sourceCompany: "Z.ai (Zhipu)",
      editorial: "최상위 모델 접근이 막히는 흐름의 반대편에서, MIT 오픈웨이트 중국 프런티어 모델은 직접 받아 자체 인프라에 올릴 수 있는 대안 신호입니다.",
    },
    {
      rank: 4,
      tier: "hero",
      post: findPost(week26, "anthropic-claude-tag-slack-claude-857dbf41"),
      sourceWeek: "2026-w26",
      sourceCompany: "Anthropic",
      editorial: "에이전트가 CLI를 넘어 협업 도구 안의 팀원처럼 배치됩니다.",
    },
    {
      rank: 5,
      tier: "feature",
      post: findPost(week26, "sk-hbm4e-12-7-hbm-311c2396"),
      sourceWeek: "2026-w26",
      sourceCompany: "SK hynix",
      editorial: "한국 반도체가 AI 인프라 경쟁의 물리 병목으로 다시 부각된 카드입니다.",
    },
    {
      rank: 6,
      tier: "feature",
      post: findPost(week26, "openai-codex-record-replay-d91b48e9"),
      sourceWeek: "2026-w26",
      sourceCompany: "OpenAI",
      editorial: "사람이 한 번 보여준 작업을 재사용 가능한 스킬로 바꾸는 실전 자동화입니다.",
    },
    {
      rank: 7,
      tier: "feature",
      post: findPost(week26, "sakana-ai-fugu-57e543cc"),
      sourceWeek: "2026-w26",
      sourceCompany: "Sakana AI",
      editorial: "Fable 5급 성능이라는 벤더 주장으로 화제가 됐지만 독립 사용 보고는 실사용 지연을 지적합니다. 성능 주장은 벤더 주장·논란으로 봐야 합니다.",
    },
    {
      rank: 8,
      tier: "feature",
      post: findPost(week25, "moonshot-kimi-k2-7-code-0d1b8e50"),
      sourceWeek: "2026-w25",
      sourceCompany: "Moonshot AI",
      editorial: "1T급 오픈웨이트 코딩 모델로, 중국발 오픈 코딩 경쟁이 가열되는 신호입니다.",
    },
    {
      rank: 9,
      tier: "feature",
      post: findPost(week26, "mistral-ocr-4-170-sota-6814b559"),
      sourceWeek: "2026-w26",
      sourceCompany: "Mistral AI",
      editorial: "다국어 문서 인식을 단일 컨테이너로 셀프호스팅할 수 있어, 보안 민감한 국내 문서 파이프라인에 바로 올릴 수 있습니다.",
    },
    {
      rank: 10,
      tier: "normal",
      post: findPost(week26, "claude-code-v2-1-187-sandbox-631eafed"),
      sourceWeek: "2026-w26",
      sourceCompany: "Anthropic",
      editorial: "한국어·CJK 붙여넣기 깨짐이 실제로 고쳐져, 업데이트 즉시 체감되는 가장 가까운 변화입니다.",
    },
  ],
  editorsPicks: [],
};
