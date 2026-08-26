import type { ABEdition, ABEditorPick } from "../data";
import type { Post } from "../../data";

// 2026-08b — user-selected VIP set. Editorial cutoff: 2026-08-26 21:48 KST.
function post(input: Post): Post { return input; }

const vip1 = post({
  date: "8/17",
  platform: "X+Threads",
  title: "Claude Code, GitLab MR 상태 배지와 사용량 제한 자동 재개 추가",
  featured: true,
  deck: "GitLab remote와 인증된 glab CLI가 있으면 footer/statusline에 MR !N 상태 표시",
  summary: "GitLab remote와 인증된 glab CLI가 있으면 footer/statusline에 MR !N 상태 표시 claude.ai 사용량 제한 초기화 시 세션 자동 계속 Windows NT namespace 경로를 사전승인 파일 접근 경계에서 거부",
  content: "**운영 화면에 상태가 들어왔습니다**\n\nClaude Code 2.1.234는 GitLab remote와 인증된 glab CLI가 있으면 footer와 status line에 merge request 번호와 상태를 표시합니다. 사용량 제한이 초기화되면 세션을 자동으로 이어가며, Windows NT namespace 경로를 사전 승인 파일 접근 경계에서 거부합니다.\n\n**직접 확인할 것**\n\n팀이 GitLab을 사용한다면 상태 표시가 실제 인증과 remote 설정을 읽는지 확인하십시오. 자동 재개는 성공 판정이 아니라 사용량 제한 이후의 실행 재개입니다.",
  source: "https://github.com/anthropics/claude-code/releases/tag/v2.1.234",
  officialUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.234",
  verifiedAt: "2026-08-26",
  backupUrls: [],
  slug: "claude-code-20260817-v2-1-234",
  tags: ["AI", "2026-08b", "Anthropic"],
  en: {
    title: "Claude Code adds GitLab MR status and automatic usage-limit resume",
    deck: "GitLab merge-request state now appears in the footer and status line.",
    summary: "Claude Code 2.1.234 displays authenticated GitLab merge-request status, resumes sessions after claude.ai usage limits reset, and rejects Windows NT namespace paths at the pre-approved file boundary.",
    content: "Claude Code 2.1.234 displays authenticated GitLab merge-request status, resumes sessions after claude.ai usage limits reset, and rejects Windows NT namespace paths at the pre-approved file boundary.",
  },
});

const vip2 = post({
  date: "8/17",
  platform: "X+Threads",
  title: "AI가 공동 작성한 CI 변경, Snowflake Jira 자격 증명 노출 경로 만들었다",
  featured: true,
  deck: "이슈 제목의 직접 셸 보간으로 인증 없는 명령 실행 가능",
  summary: "이슈 제목의 직접 셸 보간으로 인증 없는 명령 실행 가능 러너의 Jira 읽기 자격 증명 접근 가능 Snowflake가 6월 23일 수정하고 6월 24일 토큰 교체 감사 로그에서 제3자 접근 증거 없음 주의: 취약점 사건 발생은 6월이며 8월 17일은 연구 공개일 Copilot이 코드 자체를 생성했는지는 불명확",
  content: "**AI 작성 여부보다 실행 경계가 문제였습니다**\n\nWiz는 Snowflake GitHub Actions 흐름에서 이슈 제목이 셸에 직접 보간돼 인증 없는 명령 실행 경로가 생겼다고 공개했습니다. 러너가 Jira 읽기 자격 증명에 접근할 수 있었고, Snowflake는 6월 23일 수정하고 6월 24일 토큰을 교체했습니다.\n\n연구 공개일은 8월 17일이지만 사건 자체는 6월입니다. Copilot이 취약한 코드를 직접 생성했는지는 확인되지 않았습니다.\n\n**직접 확인할 것**\n\nAI가 공동 작성한 CI 변경도 외부 입력의 셸 보간, 러너 토큰 권한, 감사 로그를 별도 게이트로 검토하십시오.",
  source: "https://www.wiz.io/blog/red-agent-snowflake-copilot-cicd-bug",
  officialUrl: "https://www.wiz.io/blog/red-agent-snowflake-copilot-cicd-bug",
  verifiedAt: "2026-08-26",
  backupUrls: [],
  slug: "wiz-20260817-snowflake-cicd",
  tags: ["AI", "2026-08b", "Wiz"],
  en: {
    title: "A CI change exposed a Snowflake Jira credential path",
    deck: "Issue-title shell interpolation enabled unauthenticated command execution.",
    summary: "Wiz disclosed a Snowflake GitHub Actions flaw where issue titles reached a shell and exposed a path to Jira read credentials. The incident was fixed in June; the research was published August 17.",
    content: "Wiz disclosed a Snowflake GitHub Actions flaw where issue titles reached a shell and exposed a path to Jira read credentials. The incident was fixed in June; the research was published August 17.",
  },
});

const vip3 = post({
  date: "8/20",
  platform: "X+Threads",
  title: "Asana, 5년 예상 마이그레이션을 Codex로 2주에 완료",
  featured: true,
  deck: "Enzyme 제거에 1.5주 엔지니어링 노력",
  summary: "Enzyme 제거에 1.5주 엔지니어링 노력 모델·인프라 비용 약 1만2천 달러 기존 계획은 최소 5년·약 600만 달러 추정 최대 4개 에이전트 병렬, 엔지니어가 하루 2회 진행 확인 및 모든 변경 검토 주의: OpenAI·Asana 자체 사례 주장 공식 게시일 메타 미확정",
  content: "**5년 계획을 2주 안으로 줄였다는 사례입니다**\n\nOpenAI와 Asana의 공식 고객 사례는 Enzyme 제거 작업을 약 1.5주 엔지니어링 노력과 약 1만2천 달러의 모델·인프라 비용으로 처리했다고 설명합니다. 기존 계획은 최소 5년과 약 600만 달러로 추정됐습니다. 최대 네 개 에이전트를 병렬로 돌렸지만 엔지니어가 하루 두 차례 진행을 확인하고 모든 변경을 검토했습니다.\n\n**검증 한계**\n\n이 수치는 OpenAI와 Asana의 자체 사례 주장입니다. 공식 페이지 본문은 확인했지만 게시일 메타데이터는 확인되지 않아, 8월 20일은 백상 날짜별 아카이브에서 공식 링크가 발견된 날짜입니다.\n\n**직접 확인할 것**\n\nROI를 인용할 때 사람의 전수 검토 비용과 기존 코드베이스 조건을 제외하지 마십시오.",
  source: "https://openai.com/index/asana",
  officialUrl: "https://openai.com/index/asana",
  verifiedAt: "2026-08-26",
  backupUrls: [],
  slug: "openai-20260820-asana-codex",
  tags: ["AI", "2026-08b", "OpenAI"],
  en: {
    title: "Asana says Codex compressed a five-year migration into two weeks",
    deck: "Four parallel agents still ran under full human review.",
    summary: "OpenAI and Asana report that an Enzyme migration took roughly one and a half engineering weeks and about $12,000 in model and infrastructure cost, versus a prior estimate of at least five years and about $6 million. The publication date remains unverified.",
    content: "OpenAI and Asana report that an Enzyme migration took roughly one and a half engineering weeks and about $12,000 in model and infrastructure cost, versus a prior estimate of at least five years and about $6 million. The publication date remains unverified.",
  },
});

const vip4 = post({
  date: "8/18",
  platform: "X+Threads",
  title: "OpenAI, 한국 연세대 포함 AI 정책 프로젝트 14개 지원",
  featured: true,
  deck: "독립 조직 14개 프로젝트 선정",
  summary: "독립 조직 14개 프로젝트 선정 총 100만 달러 지원금과 최대 100만 달러 API 크레딧 400개 이상 개인·조직이 제안 한국 연세대의 국회 감독 품질 AI 평가 프로젝트 포함 주의: 선정 효과는 향후 검증 필요 게시일 메타 미확정",
  content: "**한국 프로젝트가 14개 지원 대상에 포함됐습니다**\n\nOpenAI는 독립 조직의 AI 정책 프로젝트 14개를 선정해 현금 100만 달러와 최대 100만 달러의 API 크레딧을 지원한다고 밝혔습니다. 400개가 넘는 제안 가운데 한국 연세대의 국회 감독 품질 AI 평가 프로젝트가 포함됐습니다.\n\n**검증 한계**\n\n공식 본문과 프로젝트 목록은 확인했지만 페이지의 게시일 메타데이터는 확인되지 않았습니다. 8월 18일은 백상 날짜별 아카이브에서 공식 링크가 발견된 날짜입니다. 선정 효과는 향후 결과로 검증해야 합니다.\n\n**직접 확인할 것**\n\n정책 지원 발표와 실제 정책 성과를 구분하고, 한국 프로젝트의 공개 산출물을 후속 추적하십시오.",
  source: "https://openai.com/index/new-policy-ideas-for-the-intelligence-age",
  officialUrl: "https://openai.com/index/new-policy-ideas-for-the-intelligence-age",
  verifiedAt: "2026-08-26",
  backupUrls: [],
  slug: "openai-20260818-policy-grants",
  tags: ["AI", "2026-08b", "OpenAI"],
  en: {
    title: "OpenAI backs 14 policy projects, including Yonsei University",
    deck: "The programme provides cash grants and API credits.",
    summary: "OpenAI selected 14 independent policy projects for $1 million in grants and up to $1 million in API credits, including a Yonsei University project on AI evaluation of parliamentary oversight. The publication date remains unverified.",
    content: "OpenAI selected 14 independent policy projects for $1 million in grants and up to $1 million in API credits, including a Yonsei University project on AI evaluation of parliamentary oversight. The publication date remains unverified.",
  },
});

const vip5 = post({
  date: "8/18",
  platform: "X+Threads",
  title: "Pika, 음악·효과음·음성·영상 사운드 모델 4종 동시 공개",
  featured: true,
  deck: "Soundtrack은 영상에서 동기화된 음향 장면 생성",
  summary: "Soundtrack은 영상에서 동기화된 음향 장면 생성 Music은 최대 90초 곡을 평균 6.21초에 생성한다고 주장 SFX는 1~20초 MP3 효과음을 실시간 수준으로 생성 Speech는 5초 참조 음성 복제·최대 5분 생성·RTF 0.02 제시 주의: 성능 수치는 Pika 자체 주장 한국어 지원은 명시되지 않음",
  content: "**영상 서비스가 오디오 전체로 확장됐습니다**\n\nPika는 8월 18일 Soundtrack, Music, SFX, Speech를 함께 공개했습니다. Soundtrack은 영상 장면에 맞춘 음향을 만들고, Music은 최대 90초 곡, SFX는 1초에서 20초 효과음, Speech는 5초 참조 음성으로 최대 5분 음성을 생성한다고 설명합니다.\n\n성능과 속도 수치는 Pika 자체 주장이고 한국어 지원은 명시되지 않았습니다.\n\n**직접 확인할 것**\n\n영상 생성 비용과 별도로 음원 권리, 음성 복제 동의, 후반 편집 가능성을 확인하십시오.",
  source: "https://pika.art/blog/pika-soundtrack",
  officialUrl: "https://pika.art/blog/pika-soundtrack",
  verifiedAt: "2026-08-26",
  backupUrls: [],
  slug: "pika-20260818-audio-suite",
  tags: ["AI", "2026-08b", "Pika"],
  en: {
    title: "Pika launches models for music, effects, speech and video sound",
    deck: "The video platform expands across the full audio layer.",
    summary: "Pika announced Soundtrack, Music, SFX and Speech together on August 18. Performance figures are vendor claims, and Korean-language support was not specified.",
    content: "Pika announced Soundtrack, Music, SFX and Speech together on August 18. Performance figures are vendor claims, and Korean-language support was not specified.",
  },
});

const vip6 = post({
  date: "8/25",
  platform: "X+Threads",
  title: "Apple, 첫 2nm M6와 최대 512GB 메모리 M5 Ultra 공개",
  featured: true,
  deck: "M6는 Apple 첫 2nm 칩으로 12코어 CPU·12코어 GPU·듀얼 16코어 Neural Engine·최대 32GB 통합 메모리를 제공",
  summary: "M6는 Apple 첫 2nm 칩으로 12코어 CPU·12코어 GPU·듀얼 16코어 Neural Engine·최대 32GB 통합 메모리를 제공 M5 Ultra는 최대 80코어 GPU·32코어 Neural Engine·최대 512GB 통합 메모리·1.2TB/s 대역폭 제공 Apple 자체 테스트로 M6 AI GPU 연산은 M5 대비 약 30%, M5 Ultra는 M3 Ultra 대비 최대 4.5배 향상 주장 새 Mac mini와 Mac Studio에 각각 탑재 주의: 성능 수치는 Apple 자체 테스트 가격·판매 개시일은 공식 본문에서 미확인",
  content: "**로컬 AI 하드웨어의 메모리 상한이 올라갔습니다**\n\nApple은 8월 25일 첫 2나노미터 M6와 M5 Ultra를 공개했습니다. M6는 12코어 CPU와 12코어 GPU, 듀얼 16코어 Neural Engine, 최대 32GB 통합 메모리를 제공합니다. M5 Ultra는 최대 80코어 GPU, 32코어 Neural Engine, 최대 512GB 통합 메모리와 1.2TB/s 대역폭을 제시합니다.\n\nApple 자체 테스트로 M6의 AI GPU 연산은 M5보다 약 30%, M5 Ultra는 M3 Ultra보다 최대 4.5배 높다고 주장합니다. 가격과 판매 개시일은 공식 본문에서 확인되지 않았습니다.\n\n**직접 확인할 것**\n\n로컬 모델을 고를 때 파라미터 수보다 실제 메모리 점유, 양자화, 대역폭과 전력 예산을 함께 계산하십시오.",
  source: "https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/",
  officialUrl: "https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/",
  verifiedAt: "2026-08-26",
  backupUrls: [],
  slug: "apple-20260825-m6-m5-ultra",
  tags: ["AI", "2026-08b", "Apple"],
  en: {
    title: "Apple unveils its first 2 nm M6 and an M5 Ultra with up to 512 GB",
    deck: "Local AI hardware expands in the Mac mini and Mac Studio.",
    summary: "Apple announced M6 for Mac mini and M5 Ultra for Mac Studio. Vendor specifications include up to 512 GB unified memory and 1.2 TB/s bandwidth; performance comparisons are Apple tests.",
    content: "Apple announced M6 for Mac mini and M5 Ultra for Mac Studio. Vendor specifications include up to 512 GB unified memory and 1.2 TB/s bandwidth; performance comparisons are Apple tests.",
  },
});

const editorsPicks: ABEditorPick[] = [
  {
    title: "fluent-korean — Claude Code의 한국어 문장 품질을 다듬는 output style",
    slug: "fluent-korean",
    deck: "조사·어미 생략과 기계적인 명사 나열을 줄이는 한국어 출력 규칙입니다.",
    category: "한국어 AI 글쓰기",
    sourceUrl: "https://github.com/snflkd/fluent-korean",
    sourceLabel: "GitHub에서 보기 →",
    summary: "Claude Code가 조사와 어미를 생략하거나 명사구를 나열하는 문제를 줄이도록 설계된 한국어 output-style 플러그인입니다. MIT 라이선스이며 8월 21일 v1.0.2가 공개됐습니다.",
    body: "Claude Code의 코딩 지침을 유지하는 버전과 글쓰기 규칙만 제공하는 버전을 함께 제공합니다. `/plugin install fluent-korean@fluent-korean`으로 설치할 수 있고, 규칙 본문을 다른 AI 환경의 글쓰기 지침으로 활용할 수도 있습니다.\n\n실측(2026-08-26): ★905 · MIT · v1.0.2. 별 수는 시점에 따라 변합니다.",
    editorial: "한국어 사용자에게 직접 유용하고 설치가 간단합니다. 문장 품질을 개선하는 규칙이지 사실 정확도나 내용 검증을 대신하는 도구는 아닙니다.",
    tags: ["Claude Code", "한국어", "output style", "MIT"],
    tier: "feature",
  },
  {
    title: "lexicon-harness — 모호한 요청을 검증 가능한 실행 프롬프트로",
    slug: "voidlight-lexicon-harness",
    deck: "정확한 용어를 구속하고 EN–KO 지시문과 fail-closed 게이트로 실행까지 잇습니다.",
    category: "프롬프트 하네스",
    sourceUrl: "https://github.com/VoidLight00/lexicon-harness",
    sourceLabel: "GitHub에서 보기 →",
    guideUrl: "https://voidlight00.github.io/lexicon-harness",
    guideLabel: "12분 학습 가이드 →",
    summary: "사용자님께서 만든 하네스로, 해상도가 낮은 요청에서 정확한 도메인 용어를 선정하고 영어 실행 지시문과 한국어 해석을 작성한 뒤 HARD 게이트를 통과시켜 실제 작업까지 이어갑니다.",
    body: "결정론 엔진은 후보 용어를 순위화하고 브리프 스캐폴드를 만들며, `/lexicon` 스킬은 3~8개의 구속 용어를 채택해 EN–KO 실행 프롬프트를 작성합니다. `verify_lexicon.sh`가 브리프·엔진·비밀정보 검사를 fail-closed로 판정하고 exit 0일 때만 실행 경로가 열립니다.\n\n설치: `git clone https://github.com/VoidLight00/lexicon-harness.git ~/.claude/lexicon` 후 skill 파일을 `~/.claude/skills/lexicon/`에 복사합니다. Claude Code 없이도 `lex.py` CLI와 게이트를 직접 사용할 수 있습니다.\n\n실측(2026-08-26): Python · MIT · 공개 저장소. 별 수 0은 공개 직후 시점의 값이며 품질 지표로 사용하지 않습니다.",
    editorial: "이번 VoidNews 작업에도 실제로 적용한 사용자님 제작 오픈소스입니다. 프롬프트를 문서로 만드는 데서 끝나지 않고, 검증된 프롬프트로 요청 작업을 완료하는 것까지 계약에 포함합니다.",
    tags: ["VoidLight", "Lexicon", "프롬프트 엔지니어링", "fail-closed", "MIT"],
    tier: "feature",
  },
];

export const edition2026_08b: ABEdition = {
  slug: "2026-08b",
  volume: 11,
  title: "AI&Beyond — 에이전트 운영에서 로컬 AI 하드웨어까지",
  theme: "운영 · 보안 · AX · 정책 · 생성형 미디어 · 로컬 AI",
  period: "2026-08-17 ~ 2026-08-26",
  coveredWeeks: [{ slug: "2026-w34", period: "8/17 ~ 8/23" }, { slug: "2026-w35", period: "8/24 ~ 8/30" }],
  announceDate: "2026-08-27",
  nextEditionDate: "2026-09-10",
  sourceCounts: { youtube: 96, x: 0, web: 54, "community-hn": 129, "community-reddit": 0 },
  intro: "8월 하반기에는 에이전트의 기능보다 운영 경계가 더 선명해졌습니다. 세션과 MR 상태를 이어 보고, AI가 공동 작성한 CI를 다시 검증하며, 사람의 전수 검토를 전제로 ROI를 계산해야 합니다. 생성형 미디어는 음향 제작으로 넓어졌고, 로컬 AI 하드웨어는 512GB 통합 메모리까지 올라갔습니다.",
  closing: "도입 전에 세 가지를 확인하십시오. 공식 날짜와 사건 정체성, 에이전트 권한과 사람 검토 경계, 그리고 벤더 자체 수치와 독립 검증의 차이입니다.",
  coreFlow: ["에이전트 운영", "CI 보안", "AX ROI", "한국 AI 정책", "생성형 미디어", "로컬 AI 하드웨어"],
  highlights: [
    { rank: 1, tier: "hero", post: vip1, sourceWeek: "2026-w34", sourceCompany: "Anthropic", editorial: "사용자님께서 2026-08-26 직접 선택한 VIP 카드입니다." },
    { rank: 2, tier: "feature", post: vip2, sourceWeek: "2026-w34", sourceCompany: "Wiz", editorial: "사용자님께서 2026-08-26 직접 선택한 VIP 카드입니다." },
    { rank: 3, tier: "feature", post: vip3, sourceWeek: "2026-w34", sourceCompany: "OpenAI", editorial: "사용자 선택 VIP. ROI 수치는 자체 사례이고 공식 게시일 메타가 확인되지 않았으므로 발견일 귀속으로 표시합니다." },
    { rank: 4, tier: "feature", post: vip4, sourceWeek: "2026-w34", sourceCompany: "OpenAI", editorial: "사용자 선택 VIP. 한국 직접 주제이지만 공식 게시일 메타가 확인되지 않아 발견일 귀속으로 표시합니다." },
    { rank: 5, tier: "feature", post: vip5, sourceWeek: "2026-w34", sourceCompany: "Pika", editorial: "사용자님께서 2026-08-26 직접 선택한 VIP 카드입니다." },
    { rank: 6, tier: "feature", post: vip6, sourceWeek: "2026-w35", sourceCompany: "Apple", editorial: "사용자님께서 2026-08-26 직접 선택한 VIP 카드입니다." }
  ],
  editorsPicks,
};
