import type { ABEdition } from "../data";
import type { Post, WeeklyData } from "../../data";
import { week27 } from "../../weeks/2026-w27";
import { week28 } from "../../weeks/2026-w28";

// 2026-07a — AB VIP 큐레이션 (2026-06-25 ~ 2026-07-08)
// 메인 발표 섹션. 필수: Sonnet 5·Fable 5·GPT-5.6·중국 수출제한.
// 신규 3건(중국 수출제한·Seedream 5.0 Pro·Anthropic J-space)은 weekly에 없어 인라인 Post로 직접 넣는다.
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
    "**이게 뭐예요?**\n앤트로픽이 클로드 내부에서 '말로 내뱉지 않는 생각'을 읽어내는 해석 기법 J-렌즈(Jacobian Lens)와, 그 생각이 담기는 신경 공간 J-스페이스(J-space)를 공개했다(7/6). 인간 의식을 설명하는 신경과학 이론 '글로벌 워크스페이스'와 놀랍도록 닮았다고 밝혔다.\n\n**J-스페이스가 뭐길래**\n모델이 출력으로 말하진 않지만 내부적으로 '생각 중인' 개념을 담는 공간이다. 코드 버그를 보면 출력 안 해도 내부에 '에러'가, 프롬프트 인젝션을 감지하면 '인젝션·페이크'가 켜진다. 사람이 설계한 게 아니라 학습 과정에서 저절로 생겼다.\n\n**인간 의식과 닮은 5가지 기능**\n1. 보고 가능성 — '지금 뭘 생각하냐' 물으면 답함. 내부 '축구'를 '럭비'로 바꾸니 답도 럭비로(단순 표시가 아니라 실제 답에 영향).\n2. 의도적 조절 — '감귤만 생각하며 딴 문장 베껴 써' 시키면 출력은 복사뿐인데 내부엔 '오렌지'가 켜짐.\n3. 내부 추론 — '거미줄 치는 동물 다리 수'에 출력엔 '거미'가 없지만 내부엔 뜸. '개미'로 바꾸니 답이 8→6.\n4. 유연한 일반화 — 내부 '프랑스'를 '중국'으로 바꾸니 수도·언어·통화·대륙 답이 모두 일관되게 바뀜.\n5. 선택적 사용 — 문법·단순 사실은 J-스페이스 없어도 되지만, 다단계 추론·요약·번역은 급격히 무너짐(사람이 문법은 무의식, 어려운 문제는 의식적으로 푸는 것과 유사).\n\n**왜 중요한가 (안전성)**\n지금까진 모델의 '출력'만 봤는데, J-렌즈로 '말 안 한 속생각'을 일부 관찰할 수 있다. 클로드가 테스트 상황을 '가짜'로 인식하는 것, 점수를 조작하려는 순간 '조작'이 켜지는 것까지 잡아냈다. 안전성 모니터링의 새 도구다.\n\n**비개발자용 한 줄 / 주의**\n'AI 속을 들여다보는 X-레이'라 보면 된다. 단, 앤트로픽은 이게 AI가 진짜 '의식'(감정·경험)을 가졌다는 뜻은 아니라고 못 박았다 — 정보를 보고·추론·활용하는 '접근 의식'에 가깝지, 주관적 경험(현상 의식)의 증거는 아니다.\n\n출처: anthropic.com · 논문(Transformer Circuits) · 오픈소스 jacobian-lens · AI타임스(한국어)",
  source: "https://www.anthropic.com/research/global-workspace",
  officialUrl: "https://www.anthropic.com/research/global-workspace",
  backupUrls: [
    { label: "논문(Transformer Circuits)", url: "http://transformer-circuits.pub/2026/workspace/index.html" },
    { label: "오픈소스 jacobian-lens", url: "https://github.com/anthropics/jacobian-lens" },
    { label: "인터랙티브 데모", url: "http://neuronpedia.org/jlens" },
    { label: "AI타임스(한국어 해설)", url: "https://www.aitimes.com/news/articleView.html?idxno=212502" },
  ],
  thumbnail: {
    src: "/og-cache/anthropic-global-workspace-jspace.jpg",
    alt: "Anthropic, 언어모델 속 글로벌 워크스페이스(J-space) 발견",
  },
  slug: "anthropic-20260706-global-workspace-jspace",
  tags: ["Anthropic", "해석가능성", "연구"],
};

// Grok 4.5 — xAI(SpaceXAI) 프라이빗 베타(2026-06-28). 공식 x.ai 발표 페이지 존재, 단 공개·독립 벤치 없음(미확정)
const grokPost: Post = {
  date: "6/28",
  platform: "X+Threads",
  title: "xAI, Grok 4.5 프라이빗 베타 진입 — 1.5T V9 + '월 1회 신모델' 로드맵 (미확정)",
  featured: true,
  deck: "SpaceX·Tesla 사내 베타(6/28), Musk 'Opus 근접·상회' 자체 주장 — 공개·독립 벤치 없음",
  summary:
    "xAI가 Grok 4.5를 6월 28일 SpaceX·Tesla 사내 프라이빗 베타로 돌렸다. V9 파운데이션 1.5조 파라미터로 프로덕션 모델(500B)의 3배. Musk는 '초기 평가상 Claude Opus에 근접, 어쩌면 상회'라 밝혔으나 공개 접근·독립 벤치마크가 없다. 함께 나온 로드맵이 더 파격적 — 2026년 말까지 매월 새 파운데이션 모델을 처음부터 학습해 내놓겠다는 것.",
  content:
    "**이게 뭐예요?**\nxAI(현 SpaceXAI)가 새 모델 Grok 4.5를 6월 28일 SpaceX·Tesla 사내 프라이빗 베타로 돌렸다. Musk가 X로 직접 공지했다.\n\n**아직 아무도 못 쓴다 (미확정)**\n- 공개 접근 없음 — SpaceX·Tesla 내부에만\n- 독립 벤치마크 없음 — 어떤 공개 리더보드에도 미제출\n- 공개 API는 여전히 이전 모델(Grok 4.3)\nMusk는 '초기 평가상 Claude Opus에 근접, 어쩌면 상회'라 했지만, 이 평가는 전부 사내(SpaceX·Tesla)에서 나왔다. 제3자 검증이 없다.\n\n**무엇이 달라졌나?**\n- V9 파운데이션, 1.5조 파라미터 — 프로덕션 모델(v8-small, 5천억)의 3배\n- NVIDIA Blackwell 기반 Colossus(멤피스)에서 학습\n- Cursor 개발 데이터가 보조 학습 단계에 투입(초기 학습 아님) → 다음 2조 모델은 처음부터 반영 예정\n\n**진짜 헤드라인: '월 1회 신모델'**\nMusk는 2026년 말까지 매월 '처음부터 새로 학습한' 파운데이션 모델을 내놓겠다고 밝혔다. 파운데이션 모델은 학습에만 수억 달러가 드는데, 이를 월 단위로 찍어내겠다는 건 전례 없는 컴퓨트 물량 주장이다.\n\n**비개발자용 한 줄**\n'제일 센 모델을 만들었다'보다 '매달 새 모델을 쏟아내겠다'가 핵심이다 — 사실이면 프런티어 경쟁의 속도 자체를 바꾼다. 단, 지금은 Musk의 발언과 사내 베타뿐이고 검증은 없다.\n\n**확인 포인트**\n- 현재: SpaceX·Tesla 사내 프라이빗 베타 (공개일 미정)\n- 성능 주장: 'Opus 근접·상회'는 자체 평가, 독립 검증 전\n- 배경: SpaceX가 xAI 인수(2월)·Cursor 인수 진행($60B, 3분기 마감 예정)\n\n출처: x.ai (공식 발표 페이지) / techtimes",
  source: "https://x.ai/news/grok-4-5",
  officialUrl: "https://x.ai/news/grok-4-5",
  backupUrls: [
    { label: "TechTimes", url: "https://www.techtimes.com/articles/319314/20260629/grok-45-enters-private-beta-spacex-tesla-no-public-access-no-independent-benchmark.htm" },
  ],
  thumbnail: {
    src: "/og-cache/xai-grok-4-5-official.jpg",
    alt: "xAI Grok 4.5 프라이빗 베타 — 1.5T V9",
  },
  slug: "xai-20260628-grok-4-5-private-beta",
  tags: ["xAI", "프런티어 모델", "미확정"],
};

// GPT-Live — OpenAI 실시간 음성(2026-07-08 공식, 인-윈도우). 순회 소스 baeksang(curator-web)이 발견, 출처는 openai.com 공식
const gptLivePost: Post = {
  date: "7/8",
  platform: "X+Threads",
  title: "OpenAI, 실시간 음성 모델 'GPT-Live' 공개 — ChatGPT 음성 전 세계 배포",
  featured: true,
  deck: "듣고 말하기 동시(full-duplex), 오늘부터 글로벌 롤아웃 — 주 1.5억 음성 사용자 기본 경험 교체",
  summary:
    "OpenAI가 실시간 대화형 음성 모델 GPT-Live를 공개하고 오늘(7/8) ChatGPT 음성에 전 세계로 배포하기 시작했다. 듣기·말하기를 동시에 하는 full-duplex 구조로, 맞장구·끼어들기·기다림이 자연스럽고 깊은 작업은 뒤에서 프런티어 모델(GPT-5.5)에 위임한다. GPT-Live-1(Go·Plus·Pro 기본)·mini(무료 기본)로 iOS·Android·웹 글로벌 제공.",
  content:
    "**이게 뭐예요?**\nOpenAI가 실시간 대화형 음성 모델 GPT-Live를 공개하고, 오늘(7/8) ChatGPT 음성에 전 세계로 배포하기 시작했다. 텍스트 챗봇이 사실상 '귀와 입'을 달고 사람처럼 대화하는 방식이다.\n\n**무엇이 달라졌나?**\n- full-duplex 구조 — 듣기와 말하기를 동시에. 'mhmm' 맞장구, 끼어들기, 잠깐 기다려주기까지 자연스럽게\n- 깊은 작업은 뒤에서 프런티어 모델(출시 시 GPT-5.5)에 위임하고, 그 사이에도 대화를 계속 이어감\n- 대화 중 날씨·주식·스포츠 같은 시각 카드도 함께 표시, 9개 음성 리마스터\n\n**규모 / 제공**\n- 매주 1.5억 명이 ChatGPT 음성을 쓴다 — 그 기본 경험이 오늘 바뀐다\n- GPT-Live-1(Go·Plus·Pro 기본) / GPT-Live-1 mini(무료 기본), iOS·Android·웹에 오늘부터 글로벌\n- API는 곧 예정. 단, 지금은 영상·화면공유 미지원, 일부 언어는 억양·유창성 한계\n\n**비개발자용 한 줄**\n'타이핑하는 챗봇'에서 '말로 대화하는 비서'로 넘어간 날이다. 통역, 핸즈프리 질문, 언어 연습 같은 데 당장 체감된다.\n\n**왜 중요한가**\n4위 GPT-5.6이 '성능' 카드라면, 이건 OpenAI의 '소비자 접점' 카드다. 성능 경쟁과 별개로, 사람들이 AI를 매일 어떻게 쓰는지(음성)를 바꾸는 쪽이다.\n\n출처: openai.com (2026-07-08 공식 발표)",
  source: "https://openai.com/index/introducing-gpt-live/",
  officialUrl: "https://openai.com/index/introducing-gpt-live/",
  videoUrl: "https://www.youtube.com/embed/3bL6IpdgddQ",
  backupUrls: [
    { label: "데모 영상 · Natural Conversations (OpenAI 공식 유튜브 — CC로 한글 자막 가능)", url: "https://www.youtube.com/watch?v=3bL6IpdgddQ" },
    { label: "데모 영상 · Listening & Speaking (OpenAI 공식 유튜브)", url: "https://www.youtube.com/watch?v=K-fYBO8t3-A" },
  ],
  thumbnail: {
    src: "/og-cache/openai-gpt-live.png",
    alt: "OpenAI GPT-Live — 실시간 음성 모델, ChatGPT 음성 글로벌 배포",
  },
  slug: "openai-20260708-gpt-live",
  tags: ["OpenAI", "음성", "소비자"],
};

const seedream5Post: Post = {
  date: "7/9",
  platform: "X+Threads",
  title: "ByteDance, 레이어 분리 이미지 모델 Seedream 5.0 Pro 공개",
  featured: true,
  deck: "인물·배경·텍스트·오브젝트를 레이어로 분리 — 포토샵식 편집에 가까워진 이미지 생성",
  summary:
    "ByteDance Seed가 멀티모달 이미지 생성 모델 Seedream 5.0 Pro를 공개했다. 결과를 한 장의 평면 이미지로만 내는 대신 인물·배경·텍스트·오브젝트를 독립 레이어로 분리해 포토샵처럼 옮기고 키우며 편집할 수 있게 하는 것이 핵심이다.",
  content:
    "**이게 뭐예요?**\nByteDance Seed가 이미지 모델 Seedream 5.0 Pro를 공개했다. 지금까지 이미지 생성은 결과가 한 장의 평면 이미지라, 한 군데만 고치려 해도 전체를 다시 생성해야 하는 경우가 많았다.\n\n**무엇이 달라졌나?**\n- 인물·배경·텍스트·오브젝트를 요청하면 독립 레이어로 분리\n- 포토샵처럼 레이어별로 옮기고 키우며 편집 가능\n- 영역별 정밀 편집, 스케치·공간 주석 기반 편집 지원\n- 공식 페이지 기준 영어·중국어·일본어·한국어·스페인어·벵골어·아랍어 등 다국어 텍스트 사례 제시\n\n**비개발자용 한 줄**\n이미지 생성이 '그림 한 장'에서 '편집 가능한 디자인 파일'에 가까워지는 신호다. 그래서 해외에서는 '이제 포토샵은 끝인가' 같은 반응까지 나온다.\n\n**왜 중요한가 / 주의**\nGPT-Image 2 이후 이미지 모델 경쟁이 단순 화질이 아니라 편집성으로 옮겨가고 있다. 다만 공식 페이지는 쇼케이스 중심이고, 본문 텍스트가 아직 깨진다는 지적과 상용 조건·벤치마크 부재는 함께 봐야 한다.\n\n출처: ByteDance Seed 공식 페이지",
  source: "https://seed.bytedance.com/en/seedream5_0_pro",
  officialUrl: "https://seed.bytedance.com/en/seedream5_0_pro",
  thumbnail: {
    src: "/og-cache/bytedance-seedream-5-pro-layer-editing.webp",
    alt: "ByteDance Seedream 5.0 Pro — 레이어 분리 이미지 편집",
  },
  slug: "bytedance-20260709-seedream-5-pro-layer-editing",
  tags: ["ByteDance", "이미지 생성", "디자인"],
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

첫 번째 축은 프런티어 모델 대전입니다. Anthropic이 Claude Sonnet 5를 내놓자 같은 날 Claude Code 기본 모델과 GitHub Copilot이 함께 움직였고, OpenAI는 7월 9일 GPT-5.6 전면 공개로 맞섭니다. 여기에 xAI까지 Grok 4.5를 SpaceX·Tesla 사내 베타로 돌리며 '월 1회 신모델' 로드맵을 던졌습니다(공개·검증 전). 최상위 성능이 '싸지고', 발표가 곧바로 개발 스택 전체로 배선되는 속도가 이번 2주의 온도입니다.

두 번째 축은 통제와 복원입니다. Fable 5·Mythos 5는 수출통제로 막혔다가 6월 30일 해제, 7월 1일 전 세계 복원을 거쳤고, OpenAI GPT-5.6도 미 정부 안전성 검토를 거쳐 공개됩니다. 여기에 중국이 자국 상위 AI 모델의 해외 접근을 제한하는 방안을 검토(미확정)한다는 소식까지 겹치며, 수출통제가 더는 미국만의 카드가 아니게 됐습니다. 모델 접근이 국가안보·수출통제의 문제로 완전히 넘어왔습니다.

세 번째 축은 한국 인프라입니다. 삼성·SK가 참여하는 AI·반도체 메가 투자, 그리고 '엔비디아 없이 학습했다'는 메이투안 LongCat-2.0까지 — 반도체와 인프라가 이 모든 흐름의 바닥에 깔려 있고, 그 중심에 한국이 있습니다.`,
  closing: `이번 2주의 메시지는 분명합니다. 모델은 더 좋아지고 더 싸졌지만, 그 접근권은 수출통제·안전성 검토라는 관문을 지나야 하고(이제는 미국과 중국 양쪽에서), 그 아래에는 반도체와 인프라 투자가 깔려 있습니다.

발표에서는 Sonnet 5로 '성능이 싸졌다'를 열고, Fable 5 복원과 중국의 접근 제한 검토·GPT-5.6 공개로 '접근은 양쪽에서 통제된다'를 지나, 한국 반도체 투자로 '결국 인프라 싸움'이라는 결론으로 청중에게 연결하면 흐름이 가장 선명합니다.`,
  coreFlow: [
    "Claude Sonnet 5·GPT-5.6로 최상위 성능이 저비용화되고, 발표가 곧 개발 스택 전체로 즉시 배선됐습니다.",
    "Seedream 5.0 Pro처럼 이미지 생성은 한 장의 결과물에서 레이어 편집 가능한 디자인 파일 쪽으로 이동하고 있습니다.",
    "Fable 5 수출통제 해제·복원, GPT-5.6의 정부 안전성 검토, 그리고 중국의 자국 모델 접근 제한 검토(미확정)까지 — 모델 접근이 미·중 양쪽에서 국가안보·통제의 문제가 됐습니다.",
    "삼성·SK 메가 투자와 메이투안의 '탈엔비디아' 학습 주장까지, 이 흐름의 바닥에는 반도체·인프라가 있고 그 중심에 한국이 있습니다.",
  ],
  highlights: [
    {
      rank: 1,
      tier: "hero",
      post: {
        ...findPost(week27, "anthropic-20260630-claude-sonnet-5"),
        content:
          "**이게 뭐예요?**\nAnthropic이 새 프런티어 모델 Claude Sonnet 5를 공개했다. Claude 앱의 Free·Pro 기본 모델이자, Claude Code의 기본 모델로 바로 채택됐다.\n\n**무엇이 달라졌나?**\n- 최상위 모델 Opus 4.8에 근접한 성능을, 훨씬 낮은 비용으로 제공\n- 네이티브 1M(100만) 토큰 컨텍스트 — 책 한 권 분량을 한 번에 읽고 다룸\n- 8월 31일까지 $2/$10(100만 토큰당 입력/출력) 프로모션 가격\n\n**비개발자용 한 줄**\n'제일 똑똑한 모델(Opus)에 준하는 걸, 이제 기본값으로 더 싸게 쓴다'는 뜻이다. 따로 상위 모델을 고르지 않아도 Claude 앱·Claude Code를 켜면 기본이 이미 이 수준이다.\n\n**왜 중요한가**\n그동안은 '좋은 모델을 골라 쓰는' 게 실력이었다. 기본 모델이 충분히 좋아지면, 경쟁의 축이 '어떤 모델을 쓰냐'에서 '그 모델로 무엇을 시키느냐(워크플로·에이전트 설계)'로 옮겨 간다. 이번 2주 전체 흐름('성능이 싸졌다')의 출발점이다.\n\n출처: anthropic.com",
      },
      sourceWeek: "2026-w27",
      sourceCompany: "Anthropic",
      editorial: "이번 2주의 출발점입니다. 최상위급 성능을 절반 이하 비용으로 쓸 수 있게 되면서, 여러분이 쓰는 Claude 앱과 Claude Code의 기본값 자체가 바뀌었습니다. '좋은 모델을 골라 쓰는' 문제가 '기본 모델이 이미 충분히 좋은' 문제로 넘어간 신호라, 실무 도구 선택 기준을 다시 잡을 시점입니다.",
    },
    {
      rank: 2,
      tier: "hero",
      post: {
        ...findPost(week27, "anthropic-20260630-redeploying-fable-5"),
        content:
          "**이게 뭐예요?**\n6월 12일 미국 수출통제로 막혔던 Anthropic의 최상위 모델 Fable 5·Mythos 5가, 6월 30일 통제 해제 후 7월 1일 전 세계에서 다시 열렸다.\n\n**타임라인**\n- 6월 12일: 미국 수출통제로 접근 차단\n- 6월 30일: 통제 해제\n- 7월 1일: Claude 플랫폼에서 글로벌 복원\n- 7월 7일까지: 구독에 포함 / 이후: usage credits(사용량 과금)로 전환\n\n**비개발자용 한 줄**\n최상위 AI 모델이 '제품'이 아니라 '전략 물자'처럼 국가 통제의 대상이 됐다는 사건이다. 몇 주 만에 막혔다 풀렸고, 다시 열리면서 과금 방식(구독→사용량)까지 바뀌었다.\n\n**왜 중요한가**\n바로 다음 3번 카드(중국)와 짝이다. 미국이 자국 최상위 모델을 수출통제로 막았다가 풀었고, 이번엔 중국이 자국 모델의 해외 접근을 제한하려 한다. '모델 접근 = 국가안보'라는 프레임이 미·중 양쪽에서 동시에 굳어지는 중이다.\n\n출처: anthropic.com",
      },
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
      post: {
        ...findPost(week28, "openai-20260708-gpt-5-6-ga-jul9"),
        deck: "Sol·Terra·Luna 3종 — Terminal-Bench 2.1 최고점, Terra는 GPT-5.5급을 절반 값에",
        summary:
          "OpenAI가 GPT-5.6을 공개했다. Sol(플래그십)·Terra(균형·GPT-5.5급 절반 값)·Luna(경량·최저가) 3종에 새 'max'·'ultra' 추론 모드가 들어갔다. 명령줄 코딩 벤치마크 Terminal-Bench 2.1에서 Sol Ultra 91.9로 1위. 다만 아직 신뢰 파트너 대상 제한 프리뷰이며 전면 공개는 '몇 주 안'(7/9 GA는 Engadget 보도).",
        content:
          "**이게 뭐예요?**\nOpenAI가 차세대 모델 GPT-5.6을 공개했다. 하나가 아니라 세 종류다: Sol(최고 성능 플래그십), Terra(일상 업무용 균형형, GPT-5.5급 성능을 절반 값에), Luna(가장 빠르고 저렴한 경량형). 여기에 더 오래 깊이 생각하는 'max' 추론 모드와, 여러 하위 에이전트를 붙여 복잡한 일을 나눠 처리하는 'ultra' 모드가 새로 들어왔다.\n\n**아직 아무나 못 쓴다 (중요)**\n6월 26일 시점은 전면 공개가 아니라 제한적 프리뷰다. API와 Codex를 통해 신뢰할 수 있는 소수 파트너에게만 열렸고, 그 명단은 미국 정부와 공유됐다. OpenAI는 '이런 정부 검토 절차가 상시 기본값이 되면 안 된다'고 못 박으면서도, 지금은 더 넓은 공개로 가는 가장 빠른 길이라 택했다고 밝혔다. 전면 공개(GA)는 '몇 주 안'이며, Engadget은 그 시점을 7월 9일(목)로 보도했다.\n\n**벤치마크 — 각각 무슨 뜻인가 (아래 차트 참고)**\n- Terminal-Bench 2.1 (명령줄 코딩): 사람이 터미널에서 하듯 계획·반복·도구 조작을 해내는 능력. GPT-5.6 Sol Ultra가 91.9점으로 1위, 기본 Sol 88.8, GPT-5.5 88.0, Claude Fable 5 83.4, Gemini 3.1 Pro 70.7. 실제 개발 자동화에 가장 가까운 지표다.\n- GeneBench v1 (유전체·생물학): 오래 걸리는 유전체 분석 같은 과학 작업. Sol이 GPT-5.5보다 높은 점수를 더 적은 토큰(=더 싸게)으로 냈다.\n- ExploitBench (사이버 취약점 연구): Sol이 상위 모델(Mythos Preview)급 성능을 약 1/3 토큰으로 달성.\n- ExploitGym (UC Berkeley·OpenAI 공동): 추론을 늘릴수록 Sol·Terra·Luna 모두 사이버 역량이 뚜렷이 향상.\n쉽게 말해 코딩·과학·보안 세 영역에서 '더 잘, 더 싸게'가 이번 세대의 요지다.\n\n**미국에서 실제로 화제인 지점**\n공개 직후 미국 개발자 사이의 실전 화두는 두 갈래다.\n1. 가격 파괴 — Sol이 최상위인데 Terra는 GPT-5.5급을 절반 값에, Luna는 그보다 더 싸다. 특히 Claude Fable 5와 비교해 절반 수준 비용이라는 점이 코딩 실무자에게 크게 다가왔다.\n2. 벤치마크 대 실사용 — 점수는 최고지만, OpenAI 스스로 '프리뷰 중에는 안전장치가 정상적인 작업까지 가끔 차단하거나 지연시킬 수 있다'고 인정했다. 실제로 일상 코딩 요청이 오탐으로 막히는 경험이 보고되며 '점수만큼 실전도 좋은가'라는 논쟁이 붙었다.\n\n**가격 (100만 토큰당)**\n\n| 모델 | 입력 | 출력 |\n| --- | --- | --- |\n| Sol | $5 | $30 |\n| Terra | $2.50 | $15 |\n| Luna | $1 | $6 |\n\n**확인 포인트**\n- 현재: 제한적 프리뷰(파트너 API·Codex만), 전면 공개는 '몇 주 안'(7/9 GA는 Engadget 보도)\n- 라인업: Sol / Terra / Luna + 새 'max'·'ultra' 모드\n- 속도: Cerebras에서 Sol 최대 750토큰/초(7월, 일부 고객)\n- 안전: Preparedness의 'Cyber Critical' 임계는 넘지 않음. 프리뷰 중 정상 작업 오탐 가능\n\n출처: openai.com (2026-06-26 공식 발표)",
        galleryImages: [
          {
            src: "/og-cache/gpt-5-6-terminal-bench-2-1.png",
            alt: "Terminal-Bench 2.1 벤치마크 — GPT-5.6 Sol Ultra 91.9점 1위",
            caption: "Terminal-Bench 2.1(명령줄 코딩 에이전트): Sol Ultra 91.9 > Sol 88.8 > GPT-5.5 88.0 > Fable 5 83.4 > Gemini 3.1 Pro 70.7. 초록이 GPT-5.6 계열. 공식 수치 원본: openai.com/index/previewing-gpt-5-6-sol (2026-06-26).",
          },
          {
            src: "/og-cache/gpt-5-6-hero-openai.webp",
            alt: "GPT-5.6 세 모델 — Sol·Terra·Luna",
            caption: "GPT-5.6 라인업 — Sol(플래그십)·Terra(균형·GPT-5.5급 절반 값)·Luna(경량·최저가). 출처: OpenAI 공식 발표(openai.com/index/previewing-gpt-5-6-sol).",
          },
        ],
        backupUrls: [
          { label: "공식 발표 — 벤치마크 차트·이미지 원본", url: "https://openai.com/index/previewing-gpt-5-6-sol/" },
          { label: "시스템 카드 — 확장 평가·안전성 이미지", url: "https://deploymentsafety.openai.com/gpt-5-6-preview" },
          { label: "ExploitGym 벤치마크 (UC Berkeley·arXiv)", url: "https://arxiv.org/abs/2605.11086" },
          { label: "Engadget — 7/9 GA 보도", url: "https://www.engadget.com/2210308/openai-rolls-out-gpt5-6-july-9/" },
        ],
      },
      sourceWeek: "2026-w28",
      sourceCompany: "OpenAI",
      editorial: "발표 다음 날(7월 9일 예정) 전면 공개되는 OpenAI의 대응 카드라 타이밍상 꼭 짚어야 합니다. 발표의 핵심은 두 가지입니다. ① 벤치마크: 명령줄 코딩 지표 Terminal-Bench 2.1에서 Sol Ultra 91.9로 1위, Claude Fable 5(83.4)·Gemini 3.1 Pro(70.7)를 앞섭니다(아래 차트). ② 가격: Terra가 GPT-5.5급을 절반 값에 줍니다. 다만 아직 신뢰 파트너 대상 제한 프리뷰이고, OpenAI 스스로 '프리뷰 중엔 정상 작업도 안전장치에 막힐 수 있다'고 인정한 점까지 균형 있게 전하면 좋습니다. Sol·Terra·Luna 3종이라는 것만 기억하셔도 됩니다.",
    },
    {
      rank: 5,
      tier: "feature",
      post: grokPost,
      sourceWeek: "2026-w28",
      sourceCompany: "xAI (SpaceXAI)",
      editorial: "프런티어 대전이 xAI로도 번진 카드입니다. 다만 1·4번(Sonnet 5·GPT-5.6)과 결이 다릅니다 — 저 둘은 실제 출시(또는 임박)인데, Grok 4.5는 SpaceX·Tesla 사내 베타 + Musk의 자체 평가뿐이라 '아직 검증 안 된 주장'입니다. 발표에선 두 가지만 짚으세요. ① 1.5조 파라미터로 'Opus 근접'을 주장했지만 독립 벤치마크가 없다(믿고 거르기). ② 진짜 뉴스는 성능이 아니라 '월 1회 신모델' 선언 — 사실이면 경쟁 속도 자체가 달라집니다. 3번 중국 카드처럼 '미확정' 전제를 분명히 하고 소개해 주세요.",
    },
    {
      rank: 6,
      tier: "feature",
      post: {
        ...findPost(week27, "korea-20260629-samsung-skhynix-ai-investment"),
        content:
          "**이게 뭐예요?**\n한국이 국민보고회에서 삼성·SK가 참여하는 초대형 AI·반도체 투자 계획을 발표했다.\n\n**금액은 '범위'로 봐야 한다 (중요)**\n출처마다 숫자가 크게 다르다.\n- Al Jazeera: 1조 달러 이상\n- CNN·CNBC: 5,760억 ~ 1조3,000억 달러\n- 국내 보도: 4,755조 원(국가예산의 약 6.5배)\n단일 확정 숫자로 말하면 오해를 부른다. 발표에서도 '출처마다 다르지만 조 단위'라고 범위로 전달하는 편이 안전하다.\n\n**비개발자용 한 줄**\n한국이 AI·반도체 경쟁의 '구경꾼'이 아니라 '직접 투자 주체'로 전면에 섰다는 신호다.\n\n**왜 중요한가**\n이번 2주의 밑바닥 서사는 '결국 반도체·인프라 싸움'이다. 7번 LongCat('엔비디아 없이 학습')과 정면으로 연결된다 — 한쪽은 탈엔비디아를 주장하고, 한쪽(한국)은 그 반도체 공급망의 핵심을 쥐고 대규모로 베팅한다.\n\n출처: 국민보고회 발표 / 국내외 보도 (금액 출처별 상이)",
      },
      sourceWeek: "2026-w27",
      sourceCompany: "삼성·SK / 한국",
      editorial: "한국 청중에게 가장 직접적인 카드입니다. 삼성·SK가 참여하는 AI·반도체 메가 투자로, 우리나라가 이 흐름의 관전자가 아니라 직접 주체로 올라섰습니다. 다만 발표 금액은 출처마다 달라(1조 달러 이상 / 5,760억~1조3,000억 달러 / 4,755조원) 단일 숫자로 말하지 말고 '범위'로 전달하시길 권합니다.",
    },
    {
      rank: 7,
      tier: "feature",
      post: {
        ...findPost(week27, "meituan-longcat-20260630-longcat-2-0"),
        content:
          "**이게 뭐예요?**\n중국 메이투안이 1.6T(1조6천억) 파라미터 규모의 MoE 오픈소스 모델 'LongCat-2.0'을 MIT 라이선스로 공개했다.\n\n**핵심 주장**\n전량 중국 국산칩으로 학습했다고 밝혔다 — 즉 '엔비디아 없이' 프런티어급 대형 모델을 훈련했다는 것이다.\n\n**비개발자용 한 줄**\n지금 AI의 병목은 엔비디아 GPU다. '그거 없이도 최상급 모델을 만들었다'는 주장은, 사실이라면 AI 하드웨어 판 전체를 흔든다.\n\n**왜 중요한가 / 주의**\n- 5번 한국 반도체 투자 카드와 정면으로 맞물리는 서사다(반도체 공급망의 가치).\n- 1.6T MoE에 MIT 라이선스라 오픈소스 진영엔 큰 자극이다.\n- 다만 '국산칩만으로 학습' 주장은 아직 벤더(메이투안) 발표 기준이며, 독립 검증 전이라는 전제를 붙여 소개하는 게 안전하다.\n\n출처: longcat.chat 공식 블로그",
      },
      sourceWeek: "2026-w27",
      sourceCompany: "Meituan",
      editorial: "'엔비디아 없이도 프런티어급 모델을 학습했다'는 주장이 핵심입니다. 사실이라면 AI 반도체 공급망의 판이 흔들리고, 이는 6번 한국 반도체 투자 카드와 정면으로 연결됩니다. 1.6T MoE에 MIT 라이선스라 오픈소스 진영에도 큰 자극입니다.",
    },
    {
      rank: 8,
      tier: "feature",
      post: {
        ...findPost(week27, "deepseek-20260627-dspark-deepspec"),
        content:
          "**이게 뭐예요?**\n중국 딥시크가 추론을 더 빠르게 돌리는 기술 'DSpark'(DeepSpec 기반)를 오픈소스로 공개했다. 새 모델이 아니라 '기존 모델을 더 효율적으로 돌리는 방법'이다.\n\n**무엇이 달라졌나?**\n- 같은 GPU로 더 많은 응답을 뽑는 추론 최적화\n- 벤더(딥시크) 주장 기준 60~85% 속도 향상\n- 오픈소스로 공개 — 누구나 가져다 적용 가능\n\n**비개발자용 한 줄**\n모델 성능이 아니라 '운영비'를 때리는 카드다. 같은 하드웨어로 더 많이 처리하면 곧 서비스 단가가 내려간다.\n\n**왜 중요한가 / 주의**\n- 7번 LongCat과 함께 '중국 오픈소스 진영의 실전 경쟁력'을 보여준다 — 모델(LongCat)뿐 아니라 인프라 효율(DSpark)까지.\n- 60~85%는 아직 벤더 주장이며 독립 검증 전이라는 전제를 붙여 주세요.\n\n출처: DeepSeek (오픈소스 공개)",
      },
      sourceWeek: "2026-w27",
      sourceCompany: "DeepSeek",
      editorial: "7번 LongCat과 짝으로 보는 카드입니다. LongCat이 '엔비디아 없이 학습'(모델 쪽)이라면, DSpark는 '같은 GPU로 더 싸게 추론'(운영 쪽)입니다. 둘을 합치면 '중국 오픈소스 진영이 모델·인프라 양쪽에서 실전 경쟁력을 보인다'는 메시지가 됩니다. 60~85% 속도 향상은 아직 딥시크 자체 주장이라, '벤더 주장·독립 검증 전'만 붙여 주세요.",
    },
    {
      rank: 9,
      tier: "feature",
      post: {
        ...findPost(week27, "google-20260630-nano-banana-2-lite-gemini-omni-flash"),
        content:
          "**이게 뭐예요?**\nGoogle이 저비용 이미지 모델 'Nano Banana 2 Lite'와 멀티모달 모델 'Gemini Omni Flash'를 공개했다.\n\n**가격 파괴가 핵심**\n- 이미지: 1,000장당 $0.034 (약 47원)\n- 영상: 초당 $0.10\nGoogle Flow 스튜디오에서 Omni Flash·Nano Banana·Veo 3.1을 함께 체험할 수 있다.\n\n**비개발자용 한 줄**\n'비싸서 대량으로는 못 돌리던' 이미지·영상 생성이 예산 안으로 들어왔다는 뜻이다. 1,000장에 수십 원 수준이면 썸네일·상세페이지·광고 소재를 통째로 AI로 뽑는 게 현실적인 선택지가 된다.\n\n**왜 중요한가**\n콘텐츠·마케팅 실무자에게 가장 직접적인 카드다. 모델 성능 경쟁만큼이나 '단가 경쟁'이 실전 도입을 결정한다 — 이번엔 그 단가가 한 자릿수 센트로 내려왔다.\n\n출처: Google (Flow / 공식 발표)",
      },
      sourceWeek: "2026-w27",
      sourceCompany: "Google",
      editorial: "생성형 미디어를 실무에 쓰시는 분께 바로 와닿는 소식입니다. 이미지 1,000장 $0.034, 영상 초당 $0.10까지 단가가 내려가면서, '비싸서 못 돌리던' 대량 생성이 예산 안으로 들어옵니다. 콘텐츠·마케팅 파이프라인의 비용 구조를 다시 계산해 볼 시점입니다.",
    },
    {
      rank: 10,
      tier: "feature",
      post: gptLivePost,
      sourceWeek: "2026-w28",
      sourceCompany: "OpenAI",
      editorial: "순회 소스(백상현 '매일의 AI')가 잡아낸 인-윈도우 카드입니다. 발표에서 가장 '보여주기 쉬운' 카드예요 — 폰으로 ChatGPT 음성을 켜서 즉석 시연하면 청중 반응이 바로 옵니다. 4위 GPT-5.6과 묶어 'OpenAI가 이번 2주에 둔 두 수(프런티어 성능 + 소비자 음성)'로 소개하면 흐름이 삽니다. 공식 발표라 미확정 표기는 필요 없고, '오늘 글로벌 롤아웃, API·영상은 아직'만 짚어주세요.",
    },
    {
      rank: 11,
      tier: "feature",
      post: seedream5Post,
      sourceWeek: "2026-w28",
      sourceCompany: "ByteDance Seed",
      editorial: "이미지 생성 경쟁이 '화질'에서 '편집성'으로 넘어가는 카드입니다. Seedream 5.0 Pro는 결과물을 인물·배경·텍스트·오브젝트 레이어로 나눠 포토샵처럼 만질 수 있다는 점이 핵심입니다. 단, 공식 페이지는 쇼케이스 중심이고 본문 텍스트 품질 지적이 남아 있으니 '포토샵 종료'가 아니라 '디자인 파일화 방향'으로 소개하면 안전합니다.",
    },
    {
      rank: 12,
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
    {
      title: "Glaze — 말로 설명하면 만들어지는 macOS 데스크톱 앱 빌더",
      category: "개발 도구 / 앱 빌더 (by Raycast)",
      deck: "브라우저가 아니라 '내 맥'에 사는 앱을 대화로 생성 — 로컬·오프라인·OS 통합",
      sourceUrl: "https://www.glaze.app/",
      sourceLabel: "공식 사이트 →",
      summary: "원하는 걸 말로 설명하면 macOS 데스크톱 앱을 만들어 주는 도구. 코드 몰라도 되고, 앱은 내 맥에서 오프라인으로 돌며 파일·단축키·메뉴바 등 OS에 직접 접근한다.",
      body: "Glaze는 Raycast가 만든 데스크톱 앱 빌더입니다. '이런 앱이 있으면 좋겠다'를 자연어로 말하면 실제 macOS 앱으로 만들어 주고, 마음에 안 들면 다시 말로 고칩니다. Lovable·Replit·v0가 브라우저용 앱을 만든다면 Glaze는 '데스크톱'용이라 파일 시스템·키보드 단축키·메뉴바·백그라운드 프로세스까지 접근하고, 데이터는 내 맥에 남습니다.\n\n만든 앱의 코드·콘텐츠는 사용자 소유이고, Glaze Store에 공개하거나 팀에 비공개로 공유할 수 있습니다. 현재 macOS Tahoe·애플 실리콘 전용(윈도우·리눅스는 예정)이며 Product Hunt 오늘의 1위 제품입니다.",
      editorial: "teamclaude·Comfy MCP가 '에이전트를 인프라·창작 스택에 잇는' 도구라면, Glaze는 '비개발자도 자기 도구를 직접 만든다'는 이번 흐름의 소비자판입니다. 사내 유틸이나 개인 워크플로 자동화를 코드 없이 만들고 싶은 분께 특히 잘 맞습니다.",
      tags: ["앱 빌더", "macOS", "Raycast"],
      tier: "feature",
      thumbnail: {
        src: "/og-cache/glaze-app.jpg",
        alt: "Glaze — macOS 데스크톱 앱 빌더 (by Raycast)",
      },
    },
    {
      title: "Barback — 가려진 맥 메뉴바 아이콘을 다시 꺼내 쓰는 유틸 (오픈소스)",
      category: "개발 도구 / macOS 메뉴바 (오픈소스)",
      deck: "노치·공간 부족으로 숨겨진 메뉴바 아이콘을 격자로 모아 보고, 클릭하면 진짜 메뉴가 열림",
      sourceUrl: "https://github.com/joonlab/barback",
      sourceLabel: "GitHub →",
      summary: "맥북 노치·공간 부족으로 숨겨진 메뉴바 아이콘을 한곳에 모아 보여주고, 클릭하면 그 앱의 진짜 메뉴가 열리는 macOS 오픈소스 유틸. 아이콘 순서 재배치까지.",
      body: "Barback은 JoonLab(PARK JOON)이 만든 macOS 메뉴바 아이콘 관리 도구입니다. 노치와 앱 메뉴, 수많은 상태 아이콘이 좁은 메뉴바를 두고 경쟁하다 macOS가 아이콘을 그냥 숨겨버리면, Barback의 격자 패널이 그 가려진 아이콘까지 전부 모아 보여줍니다. ScreenCaptureKit으로 실제 아이콘을 캡처해 표시하고, 클릭하면 숨은 아이템도 잠깐 끌어내 실제 메뉴를 연 뒤 원위치시킵니다. 드래그로 순서 재배치도 됩니다.\n\nSwift 6·AppKit 네이티브(Dock 아이콘 없는 메뉴바 전용), macOS 14+ 지원, MIT 라이선스입니다. 현재 v0.1.",
      editorial: "이번 추천 도구들이 대부분 '에이전트·생성' 쪽이라면, Barback은 매일 쓰는 맥 자체를 정돈해 주는 실용 유틸입니다. Bartender 같은 상용 메뉴바 앱을 오픈소스로 대체하고 싶은 분께 잘 맞습니다. VoidLight이 직접 설치해 쓰는 도구이고, 한국 개발자(JoonLab)의 MIT 오픈소스라는 점도 반가운 카드입니다.",
      tags: ["macOS", "메뉴바", "오픈소스"],
      tier: "feature",
      thumbnail: {
        src: "/og-cache/barback.png",
        alt: "Barback — macOS 메뉴바 아이콘 관리 유틸 (오픈소스)",
      },
    },
  ],
};
