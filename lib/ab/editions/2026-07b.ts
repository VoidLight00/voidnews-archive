import type { ABEdition, ABEditorPick } from "../data";
import type { Post } from "../../data";

// 2026-07b — VIP Brief (2026-07-09 ~ 2026-07-22)
// Workspace SSoT: _workspace/ab/2026-07b-collect-20260720/04_ranked_items.json

function post(input: Post): Post {
  return input;
}

const gpt56 = post({
  date: "7/9",
  platform: "X+Threads",
  title: "GPT-5.6 Sol·Terra·Luna, 앱과 API 롤아웃 시작",
  featured: true,
  deck: "한 모델을 고르는 대신 작업의 길이·위험도·비용에 따라 세 티어를 배치하는 운영체계",
  summary: "OpenAI가 GPT-5.6 Sol·Terra·Luna를 ChatGPT·Codex·API와 GitHub Copilot에 단계적으로 제공하기 시작했습니다. 핵심은 최고 성능 한 개보다 작업별 모델 라우팅입니다.",
  content: `**결과물부터 보면**\n결제 모듈을 리팩터링하는 팀이라면 Luna가 테스트 실패와 작은 오류를 분류하고, Terra가 여러 파일을 고치며, Sol이 인증·권한·예외 처리가 얽힌 큰 변경을 마지막에 검토하는 식으로 나눠 쓸 수 있습니다. GPT-5.6의 변화는 단순히 Sol이 더 똑똑해졌다는 것이 아니라, 한 저장소 안에서 위험도와 작업 길이에 따라 모델을 배치하는 운영 방식이 생겼다는 데 있습니다.\n\n**공식적으로 확인된 범위**\n- ==2026년 7월 9일 ChatGPT·Codex·API 및 GitHub Copilot 표면으로 단계적 롤아웃 시작==\n- Sol: 대규모 코드베이스·복잡한 검토·장기 에이전트\n- Terra: 일상 구현·리팩터링·대화형 코딩의 균형\n- Luna: 짧은 수정·분류·반복 처리\n- Copilot Business·Enterprise는 관리자 정책 활성화 필요\n\n**수학 연구 성과와 검증 상태**\nGPT-5.6 Sol Ultra가 ==Cycle Double Cover Conjecture==(모든 다중 그래프의 간선을 특정한 순환 묶음으로 덮을 수 있는지 묻는 문제)에 대한 증명 PDF를 공개하면서 수학계의 큰 관심을 받았습니다. 또 다른 후속 사례에서는 GPT-5.6이 ==convex optimization==(복잡한 조건에서 가장 좋은 해를 찾는 최적화 문제)의 약 30년 된 미해결 간극을 프롬프트와 도구 사용으로 좁혔다는 주장이 나왔습니다. 다만 이를 ‘50년 동안 못 푼 수학 난제를 GPT-5.6이 완전히 해결했다’고 단정할 근거는 현재 카드의 검증 자료에 없습니다. 증명 초안이나 계산 과정이 공개됐다는 사실과, 수학자가 독립적으로 검증해 정식 지식으로 인정했다는 사실은 구분해야 합니다.\n\n**해외·국내 반응**\n해외에서는 장기 에이전트 작업, 기존 결과물 재검토, 연구 보조 가능성에 기대가 컸습니다. 반면 Sol의 오버엔지니어링(필요 이상으로 일을 키우는 현상), 높은 토큰 사용량, 벤치마크와 실제 코딩 체감의 차이, 샌드박스 없는 full-access(파일과 도구에 넓은 권한을 주는 설정) 안전성에는 비판도 있었습니다.\n\n국내 공개 반응은 코딩·에이전트의 지시 이해, 끈기, 재검토 능력에는 긍정적이었고, 창작·감정·캐릭터 유지에서는 Fable이 더 안정적이라는 후기가 함께 나왔습니다. Sol은 복잡한 구현·검토, Terra는 비용과 균형, Luna는 빠른 반복 작업에 배치하는 방식이 현실적인 사용법으로 정리됐습니다.\n\n이번 발표에서 기억할 반응은 숫자가 아니라 이 대비입니다. **성능과 재검토 능력은 호평을 받았지만, 비용·과잉 수정·창작 체감·권한 안전성은 직접 확인이 필요했습니다.**

**벤치마크는 어떻게 읽을까**\n2차 자료에서 Sol은 ==Agents’ Last Exam== (장기 직무 수행 시험) 53.6, ==SWE-Bench Pro== (실전 코드 수정 시험) 약 64.6%, ==Terminal-Bench 2.1== (터미널 장기 작업 시험) 88.8%(Ultra 91.9%)로 보고됐습니다. BrowseComp(웹 탐색 시험) 90.4%, OSWorld 2.0(컴퓨터 사용 시험) 62.6%도 제시됐습니다. 다만 OpenAI 공식 본문은 수집 당시 403으로 직접 재현하지 못했고 평가 하네스(모델이 도구를 쓰는 실행 환경)와 반복 횟수도 일부 불명확합니다. 수치는 방향을 보여주는 참고값이지 절대 순위표가 아닙니다.\n\n**직접 시험할 것**\n같은 저장소의 같은 이슈를 세 티어에 맡겨 수정 정확도, 사람이 되돌린 diff, 걸린 시간과 사용량을 비교하십시오. 에이전트가 명령을 실행한다면 쓰기 승인과 샌드박스는 모델 선택만큼 중요합니다.\n\n**주의**\n이번 발표는 ‘GA 완료’가 아니라 단계적 롤아웃 시작으로 표현합니다.`,
  source: "https://openai.com/index/gpt-5-6/",
  officialUrl: "https://openai.com/index/gpt-5-6/",
  backupUrls: [
    { label: "GitHub Copilot 공식 changelog", url: "https://github.blog/changelog/2026-07-09-openais-gpt-5-6-sol-terra-and-luna-are-now-available-in-github-copilot" },
    { label: "Hacker News 반응 스냅샷", url: "https://news.ycombinator.com/item?id=48849066" },
    { label: "Cycle Double Cover 증명 PDF", url: "https://cdn.openai.com/pdf/04d1d1e4-bc75-476a-97cf-49055cd98d31/cdc_proof.pdf" },
    { label: "수학 성과 해외 토론", url: "https://news.ycombinator.com/item?id=48863490" },
    { label: "볼록 최적화 후속 토론", url: "https://news.ycombinator.com/item?id=48957779" },
  ],
  thumbnail: { src: "/og-cache/gpt-5-6-hero-openai.webp", alt: "GPT-5.6 Sol·Terra·Luna" },
  slug: "gpt-5-6-tiered-agent-routing",
  tags: ["OpenAI", "GPT-5.6", "에이전트", "모델 라우팅"],
});

const geminiNotebook = post({
  date: "7/16",
  platform: "X+Threads",
  title: "NotebookLM, Gemini Notebook으로 이름 바꾸고 클라우드 컴퓨터 탑재",
  featured: true,
  deck: "읽고 요약하는 노트에서 출처를 근거로 코드와 데이터까지 실행하는 작업 공간으로",
  summary: "Google이 NotebookLM을 Gemini Notebook으로 확장하고 노트북별 보안 클라우드 컴퓨터, 출처 기반 코드 실행·데이터 분석, Gemini 앱 동기화를 발표했습니다.",
  content: `**무엇이 달라졌나**\nNotebookLM은 자료를 넣고 질문하는 도구에서, 자료를 근거로 계산과 분석을 수행하는 ==Gemini Notebook==으로 확장됩니다. 각 노트북에는 분리된 클라우드 컴퓨터가 붙어 코드 실행과 데이터 분석을 처리합니다.\n\n**왜 중요한가**\n에이전트가 별도 채팅창에 머무르지 않고 실제 지식 작업 공간으로 들어갑니다. 강의자료 여러 개를 비교해 표를 만들고, 조사 문서의 수치를 코드로 검산하고, 결과를 같은 노트 안에 남기는 흐름을 한곳에서 만들 수 있습니다.\n\n**비개발자용 비유**\n자료를 읽어주는 연구 조교에게 계산기와 격리된 실험용 컴퓨터까지 한 대씩 준 것에 가깝습니다.\n\n**직접 시험할 것**\n공개 보고서와 CSV를 한 노트에 넣고, 출처를 표시한 요약과 코드로 계산한 표가 서로 맞는지 확인해 보십시오. 조직 자료를 넣기 전에는 어떤 파일이 클라우드 실행 환경으로 넘어가는지 데이터 경계를 먼저 점검해야 합니다.\n\n**주의**\n명칭 변경과 기능 확장을 모든 사용자의 완전 자율 에이전트 제공으로 확대해 해석하지 않습니다.`,
  source: "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
  officialUrl: "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
  thumbnail: { src: "/og-cache/gemini-notebook-47d0768b.png", alt: "Gemini Notebook cloud computer" },
  slug: "gemini-notebook-cloud-computer",
  tags: ["Google", "Gemini Notebook", "지식 업무", "클라우드 컴퓨터"],
});

const kimiK3 = post({
  date: "7/16",
  platform: "X+Threads",
  title: "Moonshot AI, 2.8T MoE 모델 Kimi K3 공개",
  featured: true,
  deck: "긴 코드 작업과 문서 조사에서 미국 프런티어 모델 외의 선택지를 실제 비교 대상으로 만든 모델",
  summary: "Kimi K3는 2.8T MoE·네이티브 비전·100만 토큰 컨텍스트와 공격적인 가격으로 프런티어 모델 선택지를 넓혔습니다. 다만 전체 가중치와 라이선스는 발표 시점에 완결되지 않았습니다.",
  content: `**결과물부터 보면**\nKimi K3는 저장소 전체 맥락을 오래 들고 가는 코드 작업, 여러 문서를 넘나드는 조사, 도구를 연속 실행하는 에이전트 업무에서 ‘다른 가격대의 프런티어 후보’를 진지하게 비교하게 만들었습니다. 충격은 점수 하나가 아니라 선택지가 생겼다는 데 있습니다.\n\n**공식 사양**\n- ==2.8T total MoE==, 네이티브 비전\n- ==100만 토큰 컨텍스트==\n- API 가격: 캐시 적중 입력 $0.30, 비적중 입력 $3, 출력 $15 / 100만 토큰\n- Kimi.com·Work·Code·API 제공\n- 전체 가중치는 7월 27일까지 공개 예정으로 발표\n\n**벤치마크**\nKimi 공식표는 DeepSWE 67.5, Program Bench 77.8, Terminal-Bench 2.1 88.3, FrontierSWE 81.2, BrowseComp 91.2 등을 제시합니다. 하지만 KimiCode·Claude Code·Codex 등 하네스가 섞였고 일부 비교 모델에는 fallback 조건이 있습니다. 공급자 표를 그대로 ‘1등’ 선언으로 읽지 않는 이유입니다.\n\n**해외·국내 반응**\n해외에서는 긴 작업과 가격 경쟁력에 기대가 컸습니다. 반면 느린 응답, 높은 추론 토큰, 빠른 크레딧 소진, 지시 오류가 함께 지적됐습니다. 국내와 AKwiki 공개 요약에서도 프런트엔드·Git 이력 분석에는 호평이 있었지만, 성능·비용·신뢰성 검증이 함께 진행됐습니다. Kimi·Fable·GPT-5.6·GLM을 작업별로 나눠 쓰는 방향으로 수렴했습니다.\n\n**주의**\n오픈웨이트 공개 예정과 완전한 오픈소스는 다릅니다. 발표 당시 구체 라이선스명이 확인되지 않았으므로 자유로운 상업 이용을 단정하지 않습니다.`,
  source: "https://www.kimi.com/blog/kimi-k3",
  officialUrl: "https://www.kimi.com/blog/kimi-k3",
  backupUrls: [
    { label: "Hacker News 출시 반응", url: "https://news.ycombinator.com/item?id=48935342" },
  ],
  thumbnail: { src: "/og-cache/kimi-k3-editorial.svg", alt: "Kimi K3 2.8T MoE and 1M context" },
  slug: "kimi-k3-frontier-alternative",
  tags: ["Moonshot AI", "Kimi K3", "오픈웨이트", "에이전트"],
});

const gemini36 = post({
  date: "7/21",
  platform: "X+Threads",
  title: "Google, Gemini 3.6 Flash 정식 출시",
  featured: true,
  deck: "최고 지능보다 빠른 대량 실행과 운영비의 균형을 노린 100만 토큰 워크호스",
  summary: "Gemini 3.6 Flash는 텍스트·이미지·영상·음성·PDF 입력과 100만 토큰 컨텍스트를 지원하며, 대량 에이전트 실행의 속도와 비용 경쟁을 전면에 세웠습니다.",
  content: `**어떤 장면에 쓰나**\n문서 수십 개를 비교하고 표를 추출하거나, 고객 문의를 분류하고, 웹 조사 결과를 정리하는 반복 업무처럼 처리량이 중요한 작업에 먼저 맞는 모델입니다. 가장 어려운 문제를 천천히 푸는 전문의보다 많은 기본 검사와 반복 업무를 빠르게 처리하는 종합검진 센터에 가깝습니다.\n\n**공식 사양과 가격**\n- 모델 ID ==gemini-3.6-flash==, Gemini API 상태 ==Stable==\n- 입력: 텍스트·이미지·영상·음성·PDF, 출력: 텍스트\n- ==입력 1,048,576토큰==, 출력 65,536토큰\n- 입력 $1.50, 출력 $7.50 / 100만 토큰\n- AI Studio·Gemini 앱·Android Studio·Enterprise Agent Platform 등 제공\n\n**성능 신호**\nGoogle 발표는 DeepSWE 49%(3.5 Flash 37%), MLE Bench 63.9%, OSWorld-Verified 83.0을 제시했습니다. Artificial Analysis의 7월 22일 스냅샷에서는 Intelligence 50, 출력 속도 280토큰/초로 측정됐지만 첫 토큰 대기시간은 12.32초였습니다. 빠른 출력과 빠른 시작은 같은 뜻이 아닙니다.\n\n**반응**\n해외에서는 가격과 출력 속도에 긍정적이었지만, 복잡한 코딩과 도구 호출은 더 약하다는 체감도 있었습니다. 국내에서는 출시 직후 기사와 짧은 사용 반응이 중심이었습니다.\n\n**중요한 상태 구분**\nGemini API는 Stable이지만 GitHub Copilot은 Preview 정책과 gradual rollout입니다. 캐시 입력 $0.15는 Artificial Analysis 표기이며 이번 조사에서 Google 공식 가격표로 독립 확인하지 못했습니다. 3.6 Pro는 이번 발표에 없습니다.`,
  source: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/",
  officialUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/",
  backupUrls: [
    { label: "Google 공식 한국어 발표", url: "https://blog.google/intl/ko-kr/company-news/technology/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/" },
    { label: "Gemini API 모델 카드", url: "https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash" },
    { label: "GitHub Copilot rollout", url: "https://github.blog/changelog/2026-07-21-gemini-3-6-flash-is-now-available-in-github-copilot/" },
    { label: "Artificial Analysis", url: "https://artificialanalysis.ai/models/gemini-3-6-flash" },
  ],
  thumbnail: { src: "/og-cache/gemini-3-6-flash-2967707c.jpg", alt: "Google Gemini 3.6 Flash" },
  slug: "gemini-3-6-flash-workhorse",
  tags: ["Google", "Gemini 3.6 Flash", "Stable", "고속 추론"],
});

const autofix = post({
  date: "7/10",
  platform: "X+Threads",
  title: "GitHub, 코드 스캔 경고를 고치는 에이전트 공개 프리뷰",
  featured: true,
  deck: "경고 분석부터 수정·재검증·초안 PR까지 이어가되 사람의 최종 검토를 남긴다",
  summary: "Agentic Autofix는 CodeQL과 외부 코드 스캔 경고를 분석하고 수정한 뒤 다시 검사해 draft PR을 만드는 공개 프리뷰입니다.",
  content: `**무엇을 해주나**\n보안 경고를 읽고 관련 코드와 데이터 흐름을 분석한 뒤 수정안을 만들고, 같은 검사를 다시 돌려 문제가 줄었는지 확인합니다. 통과하면 사람이 검토할 draft PR을 만듭니다. GitHub 설명 기준 일반적인 실행 시간은 약 2~4분입니다.\n\n**왜 중요한가**\nAI 코딩 경쟁이 코드를 얼마나 많이 생성하느냐에서, 검증 가능한 변경을 만들고 오래 쌓인 보안 부채를 얼마나 줄이느냐로 이동합니다. 경고 설명만 받는 것과 실제 diff를 검토하는 것은 실무 체감이 다릅니다.\n\n**직접 시험할 것**\n공개 저장소 또는 제한된 내부 저장소에서 한 종류의 CodeQL 경고만 골라 파일럿하십시오. 자동 수정 성공률보다 사람이 검토해야 할 diff가 얼마나 줄었는지, 잘못된 수정이 얼마나 생기는지를 측정하는 편이 중요합니다.\n\n**주의**\npublic preview이며 취약점을 자동으로 해결하거나 바로 병합하는 기능으로 표현하면 안 됩니다. 최종 판단과 merge는 사람의 책임입니다.`,
  source: "https://github.blog/changelog/2026-07-10-agentic-autofix-for-code-scanning-alerts-in-public-preview",
  officialUrl: "https://github.blog/changelog/2026-07-10-agentic-autofix-for-code-scanning-alerts-in-public-preview",
  thumbnail: { src: "/og-cache/github-agentic-autofix-49094e37.jpg", alt: "GitHub Agentic Autofix" },
  slug: "github-agentic-autofix-preview",
  tags: ["GitHub", "Copilot", "CodeQL", "AI 보안"],
});

const inkling = post({
  date: "7/15",
  platform: "X+Threads",
  title: "Thinking Machines, 975B 오픈웨이트 모델 Inkling 공개",
  deck: "975B 전체·41B 활성 MoE와 최대 100만 토큰 컨텍스트를 직접 배포할 수 있는 선택지",
  summary: "Thinking Machines Lab이 Inkling의 전체 가중치를 배포했습니다. 큰 오픈웨이트 선택지라는 의미는 크지만 구체 라이선스명과 실제 운영 비용은 별도로 확인해야 합니다.",
  content: `**무엇이 공개됐나**\nInkling은 975B 전체 파라미터 중 41B를 활성화하는 MoE 구조와 최대 100만 토큰 컨텍스트를 내세웁니다. 전체 가중치와 Hugging Face 배포가 확인됐습니다.\n\n**왜 중요한가**\n폐쇄형 API만 쓰는 대신 조직이 통제 가능한 환경에 큰 모델을 배치하려는 선택지가 늘어납니다. 데이터 주권이나 규제 요구가 있는 조직에는 모델 점수만큼 배포 방식이 중요합니다.\n\n**현실의 벽**\n가중치를 받을 수 있다는 것과 실제로 운영할 수 있다는 것은 다릅니다. 필요한 GPU, 추론 최적화, 보안 패치, 모니터링, 라이선스 검토가 모두 운영팀의 책임이 됩니다.\n\n**주의**\n공식 발표에서 구체 라이선스명을 확인하지 못했습니다. 오픈웨이트를 오픈소스 또는 자유로운 상업 이용과 동일하게 표현하지 않습니다.`,
  source: "https://thinkingmachines.ai/news/introducing-inkling/",
  officialUrl: "https://thinkingmachines.ai/news/introducing-inkling/",
  thumbnail: { src: "/og-cache/thinking-machines-inkling-93bfddc2.png", alt: "Thinking Machines Inkling" },
  slug: "thinking-machines-inkling-open-weights",
  tags: ["Thinking Machines", "Inkling", "오픈웨이트", "MoE"],
});

const bionic = post({
  date: "7/16",
  platform: "X+Threads",
  title: "LM Studio Bionic, 오픈 모델에 코딩·문서 에이전트 연결",
  deck: "로컬 또는 클라우드 모델로 코드와 PDF·문서·슬라이드·스프레드시트를 처리",
  summary: "LM Studio가 오픈 모델을 코드베이스와 지식 업무에 연결하는 Bionic 초기 프리뷰를 공개했습니다. 로컬 우선 실험의 진입 장벽을 낮춥니다.",
  content: `**무엇을 할 수 있나**\nBionic은 코드 수정·디버깅뿐 아니라 PDF, 문서, 슬라이드, 스프레드시트를 읽고 다루는 작업 에이전트입니다. 로컬 모델과 Secure Cloud 모델을 선택할 수 있고 Voxtral 기반 음성 전사는 로컬에서 처리할 수 있습니다.\n\n**누구에게 유용한가**\n민감 문서 때문에 바로 외부 SaaS에 올리기 어려운 교육·의료·중소기업, 그리고 모델을 직접 설치해 보고 싶지만 명령줄은 부담스러운 사용자에게 유용한 진입점입니다.\n\n**직접 시험할 것**\n공개 PDF와 스프레드시트로 요약·표 추출·근거 링크를 시험한 뒤 로컬 모델과 클라우드 모델의 정확도, 속도, 메모리 사용량을 비교하십시오.\n\n**주의**\n초기 프리뷰입니다. 로컬 실행이 정확성이나 보안을 자동 보장하지 않으며, 웹 검색·Secure Cloud 등 외부 기능을 켜면 데이터가 외부로 전송될 수 있습니다.`,
  source: "https://lmstudio.ai/blog/introducing-lm-studio-bionic",
  officialUrl: "https://lmstudio.ai/blog/introducing-lm-studio-bionic",
  thumbnail: { src: "/og-cache/lm-studio-bionic-a1467e2b.jpg", alt: "LM Studio Bionic" },
  slug: "lm-studio-bionic-local-agent",
  tags: ["LM Studio", "Bionic", "로컬 AI", "문서 에이전트"],
});

const muse = post({
  date: "7/9",
  platform: "X+Threads",
  title: "Meta, Muse Spark 1.1과 Model API 공개 프리뷰",
  deck: "100만 토큰·MCP·병렬 서브에이전트와 OpenAI 호환 API로 실행 기반 경쟁에 합류",
  summary: "Meta가 Muse Spark 1.1을 Thinking mode와 Model API 공개 프리뷰로 제공하며 에이전틱 코딩·컴퓨터 사용·멀티모달 추론 시장에 들어왔습니다.",
  content: `**핵심 변화**\nMeta는 Muse Spark 1.1, Meta AI Thinking mode, OpenAI-compatible Model API public preview를 함께 발표했습니다. 100만 토큰 컨텍스트와 MCP, 병렬 서브에이전트 기능을 에이전틱 작업에 연결합니다.\n\n**왜 중요한가**\n경쟁이 모델 점수에서 API 호환성과 실행 기반으로 넓어집니다. 이미 OpenAI 호환 API를 쓰는 애플리케이션이라면 공급자 교체 가능성을 시험할 수 있습니다.\n\n**직접 시험할 것**\n동일한 도구 호출 시나리오를 기존 공급자와 Muse에 각각 연결해 함수 호출 형식, 오류 복구, 지연시간, 결과 일관성을 비교하십시오.\n\n**주의**\n공개 프리뷰이며 API 문법이 비슷하다고 도구 행동과 운영 안전성까지 같다는 뜻은 아닙니다. 공식 본문은 수집 당시 HTTP 400으로 재확인에 제약이 있었습니다.`,
  source: "https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/",
  officialUrl: "https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/",
  thumbnail: { src: "/og-cache/meta-muse-spark-첫-모델-출시-9fdff4e0.jpg", alt: "Meta Muse Spark" },
  slug: "meta-muse-spark-model-api",
  tags: ["Meta AI", "Muse Spark", "MCP", "Model API"],
});

const robotics = post({
  date: "7/9",
  platform: "X+Threads",
  title: "Claude의 로봇 제어, 고수준 계획과 직접 조작 사이의 간극",
  deck: "12개 모델 평가에서 직접 조작의 최고 전체 과업 성공률은 5.5%에 그쳤다",
  summary: "Anthropic 연구는 언어모델이 로봇의 고수준 계획에는 도움을 주지만 직접 토크 제어와 실세계 조작은 여전히 매우 어렵다는 점을 보여줍니다.",
  content: `**무엇을 시험했나**\nAnthropic 연구진은 12개 모델을 여러 로봇 몸체와 제어 인터페이스에서 평가했습니다. 계획을 세우거나 사전학습된 컨트롤러를 고르는 일과, 모터의 힘을 직접 조절해 물체를 다루는 일을 분리해 봤습니다.\n\n**가장 기억할 숫자**\n특정 direct-manipulation 평가에서 최고 전체 과업 성공률은 5.5%였습니다. Go2 로봇의 실제 사무실 순환도 실패했습니다. 반면 사전학습된 컨트롤러를 선택하는 방식은 상대적으로 나았습니다.\n\n**왜 중요한가**\n말로 계획을 잘 세우는 것과 안전하게 몸을 움직이는 것은 다른 문제입니다. 피지컬 AI 제품을 평가할 때 멋진 자연어 데모와 반복 실행 성공률을 분리해야 합니다.\n\n**주의**\n5.5%는 특정 평가와 인터페이스 조건의 수치입니다. Claude 또는 모든 LLM의 일반적인 로봇 성능으로 확대하지 않습니다.`,
  source: "https://www.anthropic.com/research/claude-plays-robotics",
  officialUrl: "https://www.anthropic.com/research/claude-plays-robotics",
  thumbnail: { src: "/og-cache/claude-robotics-0b890857.jpg", alt: "Claude robotics research" },
  slug: "claude-robotics-control-gap",
  tags: ["Anthropic", "Claude", "로보틱스", "피지컬 AI"],
});

const aiRan = post({
  date: "7/14",
  platform: "X+Threads",
  title: "SKT, 피지컬 AI용 AI-RAN 선도망 실증",
  deck: "인천·판교·평택에서 순찰로봇·자율물류·휴머노이드 서비스를 2년간 시험",
  summary: "SKT가 삼성전자·에릭슨·노키아 등과 AI-RAN 선도망을 구축해 피지컬 AI 서비스와 네트워크·엣지 인프라를 함께 실증합니다.",
  content: `**무엇을 하나**\nSKT는 2년 동안 인천·판교·평택에서 AI-RAN 선도망을 구축하고 순찰로봇, 자율물류, 휴머노이드 서비스 세 가지를 시험합니다. 삼성전자·에릭슨·노키아 등과 협력하고 O-RAN·3GPP·AI-RAN Alliance 표준 활동과 연결합니다.\n\n**왜 중요한가**\n물리 세계의 AI는 모델만 좋아서는 작동하지 않습니다. 지연시간, 연결 끊김, 현장 데이터 처리, 엣지 연산이 로봇의 안전과 생산성을 좌우합니다. 한국이 모델 소비자가 아니라 통신·제조 현장의 실증 주체로 들어간 사례입니다.\n\n**직접 확인할 지표**\n반복 과업 성공률, 네트워크 지연, 연결 장애 시 안전 정지, 현장 데이터의 외부 전송 범위, 사람 개입 횟수를 봐야 상용화 가능성을 판단할 수 있습니다.\n\n**주의**\n선도망 구축과 실증 단계입니다. 전국 상용망이나 생산성 향상 성과가 이미 입증된 것으로 표현하지 않습니다.`,
  source: "https://news.sktelecom.com/227797",
  officialUrl: "https://news.sktelecom.com/227797",
  thumbnail: { src: "/og-cache/skt-ai-ran-fe6b0a4f.png", alt: "SKT AI-RAN physical AI pilot" },
  slug: "skt-ai-ran-physical-ai-pilot",
  tags: ["SK텔레콤", "AI-RAN", "피지컬 AI", "한국 AI"],
});

const modelWatch: ABEditorPick[] = [
  {
    title: "Laguna S 2.1 — 일부 코딩 평가에서 1.6T급 모델을 앞선 118B MoE",
    slug: "laguna-s-2-1-local-coding-model",
    category: "추가 모델 / 에이전트 코딩",
    deck: "총 118B·활성 8B, 1M 컨텍스트와 공개 가중치 — 단, ‘로컬’의 현실 기준은 128GB급 장비",
    sourceUrl: "https://poolside.ai/blog/introducing-laguna-s-2-1",
    sourceLabel: "Poolside 공식 발표 →",
    guideUrl: "https://huggingface.co/poolside/Laguna-S-2.1",
    guideLabel: "공식 모델 카드 →",
    summary: "Poolside가 장기 실행형 소프트웨어 엔지니어링을 겨냥한 공개 가중치 모델 Laguna S 2.1을 내놨습니다. 특정 코딩 평가에서 훨씬 큰 모델을 앞섰지만 평가 하네스 차이를 함께 봐야 합니다.",
    body: `**확인된 사양**\nLaguna S 2.1은 총 118B 파라미터 중 토큰마다 약 8B를 활성화하는 ==MoE 모델==입니다. 네이티브 최대 컨텍스트는 ==1,048,576토큰==이며 BF16·FP8·INT4·NVFP4·GGUF 가중치를 공개했습니다. OpenMDW-1.1 라이선스는 상업·비상업 사용과 수정을 허용합니다.\n\n**Poolside 공개 평가**\nTerminal-Bench 2.1 70.2, SWE-bench Multilingual 78.5, SWE-Bench Pro 59.4, DeepSWE 40.4, SWE Atlas 46.2, Toolathlon Verified 49.7을 보고했습니다. 같은 표의 DeepSeek-V4-Pro Max보다 앞선 항목이 다섯 개지만, Toolathlon에서는 49.7 대 55.9로 뒤집니다. 따라서 ‘1.6T 모델을 전반적으로 이겼다’고 요약하면 부정확합니다.\n\n**비교할 때의 주의**\nLaguna 점수는 Poolside 자체 agent harness에서 측정됐고 비교 모델 일부는 공식 리더보드나 제3자 평가의 최고 보고값입니다. 특히 DeepSWE는 서로 다른 하네스를 사용해 Poolside도 완전한 직접 비교가 어렵다고 명시합니다. 공개된 실행 궤적은 검토에 도움이 되지만 독립적인 동조건 재평가를 대신하지 않습니다.\n\n**로컬 실행의 실제 기준**\nQ4 GGUF만 약 75GB이며 공식 안내의 현실적 최저선은 128GB unified memory급 DGX Spark 또는 Apple Silicon Mac Studio입니다. 일반 16~64GB 노트북에 가볍게 올리는 모델이 아닙니다. 네이티브 최대치는 1M이지만 공식 로컬 예시는 256K를 권장하며, 1M으로 늘리면 품질 저하 가능성을 감수해야 합니다.`,
    editorial: "Choi AI 글의 ‘118B로 1.6조를 이기고 책상 위에서 돈다’는 훅을 공식 자료로 교정했습니다. 일부 코딩 평가는 강하지만 전면 승리가 아니며, 책상 위 장비도 128GB급을 뜻합니다.",
    thumbnail: { src: "/og-cache/poolside-laguna-s-2-1-banner.svg", alt: "Poolside Laguna S 2.1 공식 배너" },
    images: [{ src: "/og-cache/poolside-laguna-s-2-1-chart.svg", alt: "Laguna S 2.1 공식 코딩 벤치마크 비교 차트", caption: "Poolside 공개 평가. 모델별 하네스와 수치 출처가 완전히 같지 않아 동조건 직접 비교로 보지 않습니다." }],
    tags: ["Poolside", "Laguna S 2.1", "MoE", "에이전트 코딩", "오픈웨이트"],
    tier: "hero",
  },
  {
    title: "Solar Open 2 — 오피스·온프레미스를 겨냥한 250B-A15B 국산 모델",
    slug: "solar-open-2-sovereign-office-model",
    category: "추가 모델 / 한국 소버린 AI",
    deck: "1M 컨텍스트와 공개 가중치, Ko-GDPval 86.8 — 회사 자체 평가와 라이선스 조건까지 함께 보기",
    sourceUrl: "https://www.upstage.ai/blog/en/solar-open-2",
    sourceLabel: "Upstage 공식 발표 →",
    guideUrl: "https://huggingface.co/upstage/Solar-Open2-250B",
    guideLabel: "공식 모델 카드 →",
    summary: "업스테이지가 한국어 오피스 업무와 자체 서버 운용에 초점을 둔 Solar Open 2를 공개했습니다. 총 250B이지만 토큰당 약 15B만 활성화하는 공개 가중치 MoE입니다.",
    body: `**확인된 사양**\nSolar Open 2는 총 250B, 토큰당 약 15B가 활성화되는 ==48층 Hybrid-Attention MoE==입니다. Softmax attention 한 층과 linear attention 세 층을 반복하고, routed expert 320개 중 top-8과 shared expert 하나를 사용합니다. 최대 ==1M토큰 컨텍스트==이며 한국어·영어·일본어를 지원합니다.\n\n**Upstage 공개 평가**\n회사는 MMLU-Pro 86.2, LiveCodeBench v6 92.4, Ko-GDPval 86.8, 한국어 9개 지표 평균 85.4를 보고했습니다. 반면 GPQA-Diamond, SWE-Bench Verified, Terminal Bench Hard 등에서는 비교표의 다른 모델이 더 높았습니다. 모든 수치는 Upstage 자체 평가 하네스 결과로 봐야 합니다.\n\n**Ko-GDPval은 무엇인가**\n변호사·회계사 등 58개 직업, 11개 산업, 170개 한국어 업무 시나리오의 산출물을 평가하는 Upstage 사내 벤치마크입니다. 실제 직무를 겨냥한다는 장점이 있지만 공개 표준의 독립 평가가 아니므로 86.8을 한국어 업무 전반의 절대 점수로 확대하면 안 됩니다.\n\n**실행 비용과 라이선스**\nBF16 운용은 공식 모델 카드 기준 최소 4×H200, 권장 8×H200입니다. Nota AI의 INT4·pruned·NVFP4 파트너 버전은 메모리를 줄이지만 별도 패치나 Blackwell 하드웨어 조건이 붙습니다. Upstage Solar License는 상업 사용·수정·셀프호스팅을 허용하지만 파생 모델 배포 시 Solar 명명, ‘Built with Solar’ 표기와 라이선스 고지를 요구합니다. 제약 없는 Apache·MIT 오픈소스로 표현하지 않습니다.`,
    editorial: "7월 22일 마감일에 공개된 국산 모델 보강 카드입니다. Choi AI 글은 발견 경로로만 쓰고, 사양·점수·이미지는 Upstage 공식 발표와 모델 카드로 다시 확인했습니다.",
    thumbnail: { src: "/og-cache/solar-open-2-highlights-kr.webp", alt: "Upstage Solar Open 2 공식 한국어 하이라이트" },
    images: [{ src: "/og-cache/solar-open-2-kogdpval.webp", alt: "Solar Open 2 Ko-GDPval 공식 비교 차트", caption: "Upstage 자체 평가. Ko-GDPval은 58개 직업과 11개 산업을 다룬 사내 한국어 오피스워크 벤치마크입니다." }],
    tags: ["Upstage", "Solar Open 2", "한국 AI", "MoE", "온프레미스", "오픈웨이트"],
    tier: "hero",
  },
];

const tools: ABEditorPick[] = [
  {
    title: "NightGuardian — Claude Code 장기 세션을 보수적으로 다시 잇는 감시 도구",
    slug: "nightguardian-safe-session-resume",
    category: "오픈소스 / 세션 안전",
    deck: "사용량 제한으로 멈춘 tmux 세션이 정확한 창과 프로세스인지 확인한 뒤에만 재개",
    sourceUrl: "https://github.com/VoidLight00/nightguardian",
    sourceLabel: "GitHub · MIT →",
    summary: "장시간 Claude Code 작업이 한도에 걸렸을 때 잘못된 창에 입력하지 않도록 fail-closed 검증 후 재개하는 watchdog입니다.",
    body: `NightGuardian은 Claude Code를 tmux 안에서 오래 돌리는 사용자를 위한 감시 도구입니다. 사용량 제한이나 hard limit으로 작업이 멈추면 대상 세션·window·pane·프로세스가 처음 등록한 것과 정확히 일치하는지 확인하고, 안전할 때만 재개 입력을 보냅니다.\n\n**대상 사용자**\n- tmux에서 Claude Code를 장시간 실행하는 사용자\n- 원격 Mac mini나 Linux 서버에서 작업하는 사용자\n- 자동 재개보다 잘못된 입력 방지를 우선하는 사용자\n\n**요구사항**\nmacOS 또는 Linux, Bash 3.2+, Python 3.9+, tmux 3.x, tmux 내부 Claude Code가 필요합니다. 설치 전 make test와 make verify를 실행하고 허용 명령 정규식과 세션 설정을 확인해야 합니다.\n\n**주의**\n사용량 제한을 우회하는 도구가 아닙니다. tmux 밖의 세션은 감시하지 못하며, 허용 명령 범위를 넓히면 자동 입력 대상도 늘어납니다.`,
    editorial: "이번 회차의 핵심이 모델을 오래 실행하는 운영 방식인 만큼, 성능보다 세션 안전을 먼저 챙기는 도구를 첫 번째로 골랐습니다.",
    thumbnail: { src: "/og-cache/nightguardian-46a47193.png", alt: "NightGuardian Claude Code watchdog" },
    images: [{ src: "/og-cache/nightguardian-auto-session-resume.png", alt: "NightGuardian 자동 세션 감지와 안전한 작업 재개 사례" }],
    tags: ["NightGuardian", "Claude Code", "tmux", "MIT"],
    tier: "hero",
  },
  {
    title: "Postmortem Skill — 삽질을 재발 방지 문서로 바꾸는 Claude Code 스킬",
    slug: "postmortem-claude-skill",
    category: "오픈소스 / 디버깅 기록",
    deck: "실패 시도·근본 원인·측정 증거·재발 방지 배선을 고정 형식으로 남기는 MIT 플러그인",
    sourceUrl: "https://github.com/VoidLight00/postmortem-claude-skill",
    sourceLabel: "GitHub · MIT →",
    summary: "디버깅 사건 한 건을 증상·타임라인·근본 원인·측정 증거·예방 규칙으로 남기고, 불완전한 문서는 shell gate로 차단합니다.",
    body: `Postmortem Skill은 긴 세션 전체를 요약하는 도구가 아니라, 비용이 컸던 디버깅 사건 한 건을 다음 세션의 재발 방지 규칙으로 바꾸는 Claude Code 플러그인입니다.\n\n**무엇을 남기나**\n요약, 증상, FAIL·PASS 타임라인, 근본 원인, 기술·프로세스·AI 협업 분석, 측정 증거, 예방 배선, 다음 세션 규칙 후보의 8개 섹션을 고정합니다. 측정 증거가 없거나 필수 섹션이 빠지면 shell gate가 완료 처리를 거부합니다.\n\n**설치와 사용**\n/plugin marketplace add VoidLight00/postmortem-claude-skill 명령으로 마켓을 추가한 뒤 /plugin install postmortem@postmortem-claude-skill로 설치합니다. 이후 /postmortem 또는 /postmortem 로그인 리다이렉트 루프처럼 사건을 지정해 실행합니다. 저장소의 self-test는 7개 fixture를 검사합니다.\n\n**주의**\n현재 생성 문서와 템플릿은 한국어 우선입니다. 기존 FAILURE_LOG 연결과 경로 한정 Git commit·push 동작이 있으므로 설치 전에 SKILL.md의 Git 동작을 확인해야 합니다. 시크릿 패턴 검사는 흔한 토큰 노출을 막는 보조 장치이며 모든 민감정보 탐지를 보장하지 않습니다.`,
    editorial: "에이전트를 오래 돌릴수록 성공 사례보다 실패 원인을 재사용 가능한 규칙으로 남기는 일이 중요해집니다. NightGuardian이 세션을 안전하게 잇는다면 Postmortem Skill은 실패를 다음 실행의 안전장치로 바꿉니다.",
    thumbnail: { src: "/og-cache/postmortem-claude-skill-og.png", alt: "Postmortem Skill for Claude Code" },
    images: [{ src: "/og-cache/postmortem-claude-skill-architecture.webp", alt: "Postmortem Skill의 사건 기록과 품질 게이트 흐름", caption: "사건 단위 포스트모템 생성부터 측정 증거·시크릿 검사·품질 게이트까지의 공식 구조도" }],
    tags: ["Postmortem", "Claude Code", "디버깅", "품질 게이트", "MIT"],
    tier: "feature",
  },
  {
    title: "Solgate — GPT-5.6 티어 라우팅 로컬 게이트웨이",
    slug: "solgate-gpt-5-6-routing-gateway",
    category: "로컬 인프라 / 공개 프로젝트",
    deck: "Sol·Terra·Luna 연결, 긴 대화 요약, 사용량 fallback을 관리하는 고급 사용자용 관제소",
    sourceUrl: "https://github.com/VoidLight00/solgate",
    sourceLabel: "GitHub · MIT →",
    summary: "GPT-5.6 세 티어를 작업별로 연결하고 컨텍스트 압축과 fallback을 관리하는 macOS 로컬 게이트웨이입니다. 공개 저장소에서 README와 설치 구성을 확인할 수 있습니다.",
    body: `Solgate는 GPT-5.6 Sol·Terra·Luna를 Claude Code에 연결하고, 작업 종류와 일시적 모델 오류에 따라 라우팅하는 macOS 로컬 게이트웨이입니다. 긴 대화는 롤링 요약으로 압축하고, 특정 모델이 cooldown 상태일 때 다른 티어를 시도합니다.\n\n**현재 공개 상태**\n저장소가 ==공개==되어 README, 설치 구성, 동작 원리와 MIT 라이선스를 확인할 수 있습니다. 다만 공개 저장소라는 사실이 모든 환경에서 즉시 안정적인 운영을 보장한다는 뜻은 아니므로, 설치 전 요구사항과 본인 OAuth 범위를 확인해야 합니다.\n\n**주의**\n가상 100만 컨텍스트는 롤링 요약이며 무손실이 아닙니다. 모델의 실제 컨텍스트 창을 늘리지 않습니다. fallback은 쿼터 우회가 아니라 소진 순서를 관리하는 기능이며, 공유 플랜 한도가 모두 소진되면 실패합니다. 본인 구독과 본인 OAuth 범위에서만 사용해야 합니다.`,
    editorial: "GPT-5.6 카드에서 설명한 티어별 운영을 실제로 구현한 공개 macOS 로컬 게이트웨이입니다. 공개 저장소의 README와 MIT 라이선스를 확인한 뒤 설치 구성을 점검할 수 있습니다.",
    thumbnail: { src: "/og-cache/solgate-private-editorial.svg", alt: "Solgate public local model gateway" },
    tags: ["Solgate", "GPT-5.6", "모델 라우팅", "MIT", "공개 프로젝트"],
    tier: "feature",
  },
];

export const edition2026_07b: ABEdition = {
  slug: "2026-07b",
  volume: 8,
  title: "빠른 모델은 일하고, 강한 모델은 검토한다",
  theme: "GPT-5.6은 모델을 작업별로 배치하는 운영 방식을, Kimi K3는 프런티어 선택지를, Gemini 3.6 Flash는 빠른 대량 실행의 경제성을 바꿨습니다. 동시에 AI는 노트북·보안 PR·로컬 문서 앱·로봇과 통신망으로 내려왔습니다.",
  period: "2026-07-09 ~ 2026-07-22",
  coveredWeeks: [
    { slug: "2026-w29", period: "7/9 ~ 7/15" },
    { slug: "2026-w30", period: "7/16 ~ 7/22" },
  ],
  announceDate: "2026-07-23",
  nextEditionDate: "2026-08-06",
  intro: `안녕하세요, VoidLight입니다. 이번 VIP Brief는 7월 9일부터 22일까지의 최신 AI 흐름을 열 장으로 압축했습니다.

첫 번째 축은 세 개의 모델입니다. GPT-5.6은 Sol·Terra·Luna를 작업별로 나누는 운영 방식을 만들었고, Kimi K3는 미국 프런티어 모델 외의 선택지를 실제 비교 대상으로 끌어올렸습니다. 마지막에 들어온 Gemini 3.6 Flash는 최고 점수보다 속도·처리량·운영비가 중요한 시장을 보여줍니다.

두 번째 축은 실행 환경과 통제입니다. Gemini Notebook은 자료를 읽는 노트에 클라우드 컴퓨터를 붙였고, GitHub Agentic Autofix는 보안 경고를 수정·재검증·draft PR까지 연결합니다. LM Studio Bionic과 Meta Muse Spark는 로컬 모델과 API 호환성 쪽에서 같은 흐름을 넓힙니다.

마지막 축은 현실 검증입니다. Claude 로봇 연구의 5.5% 성공률은 자연어 계획과 직접 조작 사이의 간극을 보여주고, SKT AI-RAN은 피지컬 AI가 결국 네트워크와 현장 인프라의 문제라는 점을 한국 실증으로 연결합니다.`,
  closing: `이번 2주의 결론은 ‘가장 좋은 모델 하나’를 고르는 일이 점점 덜 중요해진다는 것입니다. 강한 모델은 계획과 검토를 맡고, 빠른 모델은 검색과 반복 실행을 맡으며, 로컬 모델은 민감한 자료를 처리합니다. 그 위에 권한 승인, 보안 스캔, 네트워크와 반복 성공률 같은 운영 기준이 올라갑니다.

이번 주에 바로 할 일은 단순합니다. 같은 실제 업무 하나를 모델 두세 개에 맡겨 결과 품질뿐 아니라 되돌린 수정량, 걸린 시간, 사용량과 사람 검토 시간을 함께 기록해 보십시오. 모델의 이름보다 우리 업무에서의 총비용과 통제 가능성이 더 중요한 기준이 되고 있습니다.`,
  coreFlow: [
    "GPT-5.6·Kimi K3·Gemini 3.6 Flash가 최고 지능, 오픈웨이트 선택지, 고속 워크호스의 세 축을 만들었습니다.",
    "Gemini Notebook·LM Studio Bionic·Muse Spark는 모델을 실제 지식 작업과 실행 환경에 연결합니다.",
    "GitHub Agentic Autofix는 생성보다 검증된 변경과 사람의 최종 승인을 중심에 둡니다.",
    "Claude Robotics와 SKT AI-RAN은 피지컬 AI의 성패가 직접 제어·네트워크·현장 실증에 달렸음을 보여줍니다.",
  ],
  highlights: [
    { rank: 1, tier: "hero", post: gpt56, sourceWeek: "2026-w29", sourceCompany: "OpenAI", editorial: "이번 회차의 기준 카드입니다. 성능 숫자보다 같은 팀이 Luna·Terra·Sol을 어떻게 나눠 쓰는지와 권한·샌드박스를 함께 설명합니다." },
    { rank: 2, tier: "hero", post: geminiNotebook, sourceWeek: "2026-w29", sourceCompany: "Google", editorial: "출처 기반 AI가 읽기 도구를 넘어 실행 공간이 되는 전환입니다. 조직 자료를 넣기 전에 데이터 경계를 먼저 묻는 카드입니다." },
    { rank: 3, tier: "hero", post: kimiK3, sourceWeek: "2026-w29", sourceCompany: "Moonshot AI", editorial: "점수 1등 선언이 아니라 프런티어 선택지가 하나 더 생겼다는 사건으로 읽습니다. 가격·하네스·라이선스 caveat를 함께 봅니다." },
    { rank: 4, tier: "hero", post: gemini36, sourceWeek: "2026-w30", sourceCompany: "Google", editorial: "7월 21일 breaking news입니다. API Stable과 Copilot Preview를 분리하고, 빠른 출력과 운영비라는 별도 축으로 소개합니다." },
    { rank: 5, tier: "hero", post: autofix, sourceWeek: "2026-w29", sourceCompany: "GitHub", editorial: "AI 코딩의 다음 경쟁이 생성량이 아니라 검증된 보안 diff라는 점을 보여주는 실전 카드입니다." },
    { rank: 6, tier: "feature", post: inkling, sourceWeek: "2026-w29", sourceCompany: "Thinking Machines", editorial: "오픈웨이트 선택지는 커졌지만, 라이선스와 운영 인프라가 별도 문제라는 점까지 전달합니다." },
    { rank: 7, tier: "feature", post: bionic, sourceWeek: "2026-w29", sourceCompany: "LM Studio", editorial: "로컬 모델을 비개발자의 문서 업무까지 연결하는 가장 직접적인 도구 카드입니다." },
    { rank: 8, tier: "feature", post: muse, sourceWeek: "2026-w29", sourceCompany: "Meta AI", editorial: "OpenAI 호환 API와 MCP가 공급자 교체를 쉽게 보이게 하지만 행동 호환성은 별도 검증해야 합니다." },
    { rank: 9, tier: "feature", post: robotics, sourceWeek: "2026-w29", sourceCompany: "Anthropic", editorial: "화려한 로봇 데모를 반복 성공률과 직접 조작 수치로 교정하는 반대 증거입니다." },
    { rank: 10, tier: "feature", post: aiRan, sourceWeek: "2026-w29", sourceCompany: "SK텔레콤", editorial: "한국 직접 사례를 모델 홍보가 아니라 네트워크·현장 실증의 기준으로 남겼습니다." },
  ],
  modelWatch,
  editorsPicks: tools,
};
