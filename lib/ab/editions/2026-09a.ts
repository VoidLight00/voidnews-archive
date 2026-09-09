import type { ABEdition } from "../data";

export const edition2026_09a: ABEdition = {
  slug: "2026-09a",
  volume: 12,
  title: "Astra·Fable 5.1·Gemini 3.8 — AI로 일하고, 이미지·공간·음악을 만듭니다",
  theme: "주요 모델 3종의 적용법 · Images 2.5 · World Labs Atlas · Lyria 3.5",
  period: "2026-08-27 ~ 2026-09-09",
  coveredWeeks: [
    {
      slug: "2026-w35",
      period: "8/27 ~ 8/30"
    },
    {
      slug: "2026-w36",
      period: "8/31 ~ 9/6"
    },
    {
      slug: "2026-w37",
      period: "9/7 ~ 9/9"
    }
  ],
  announceDate: "2026-09-10",
  nextEditionDate: "2026-09-24",
  intro: "이번 2주는 주요 모델을 직접 업무에 적용하는 방법부터 살펴봅니다. Astra·Fable 5.1·Gemini 3.8 Flash에서 시작 설정과 사용량을 짚고, Images 2.5의 편집, Atlas의 공간 시연, Lyria 3.5의 음악으로 이어갑니다. 각 주제에 공식 원문, 실제 시작 경로, 해볼 과제와 결과 확인 기준을 함께 담았습니다.",
  closing: "한 가지 과제를 골라 입력과 완료 조건을 먼저 정해 보십시오. 공개된 능력, 제안한 실습, 직접 확인한 결과를 구분하면 다음 도구 선택의 기준이 생깁니다. 수록된 새 실습은 제안이며 모델 실행 성능을 재측정한 결과가 아닙니다.",
  coreFlow: [
    "Astra 적용",
    "Fable 긴 작업",
    "Gemini 자료 활용",
    "Images 2.5 편집",
    "Atlas 공간",
    "Lyria 3.5 음악"
  ],
  highlights: [
    {
      rank: 1,
      tier: "hero",
      post: {
        title: "GPT-6 Astra, 답변을 넘어 화면에서 일을 끝내는 AI",
        deck: "초기 사용 후기, 긴 작업의 문맥 설정, Astra의 다섯 가지 행동 특성을 살펴봅니다.",
        summary: "재설명을 줄였다는 초기 경험과 사용량 부담을 함께 살펴봅니다. 문맥 이어가기 설정을 단계별로 안내하고, 질문·지침·문체·작업 분담·검증 범위를 조절하는 요청 예시를 담았습니다.",
        slug: "gpt-6-astra-practical-workflows",
        date: "9/3",
        platform: "Web",
        featured: true,
        content: "**이번 변화가 중요한 이유**\nAstra의 핵심은 질문에 답하는 능력과 실제 화면에서 일하는 능력을 연결했다는 점입니다. OpenAI는 문서·표·발표자료 작성, 브라우저 조사, 화면 오류 확인을 대표 작업으로 제시합니다. 작업 도중 조건을 고쳐도 원래 목표를 이어가는 행동도 강조합니다. 문서에 제시된 능력과 자신의 과제에서 확인한 결과를 구분하는 것이 중요합니다.\n\n**어디서 어떻게 시작하나요**\nCodex·Work 데스크톱의 작업 입력창 아래 모델 선택기에서 Astra와 추론 강도를 확인합니다. Codex CLI에서는 codex -m gpt-6-astra로 시작할 수 있습니다. 처음에는 기본 추론 강도를 쓰고, 어려운 부분이 남을 때 높여 보십시오. Ultra는 하위 에이전트를 활용하는 실행 방식으로, Pro 요금제나 Astra Pro 모델과 구분해야 합니다.\n웹페이지는 데스크톱 앱의 내장 브라우저로 열고 @Browser로 작업을 요청합니다. 내 컴퓨터의 앱을 조작하려면 Plugins > Computer Use에서 설치·활성화 상태를 확인합니다. macOS에서는 화면 기록·손쉬운 사용 권한이 필요하고, Windows에서는 실행 중인 화면과 포인터를 사용합니다.\n\n**세 가지 업무에 적용해 보세요**\n① 보고자료 만들기: 가상의 매출표와 회사 양식을 주고 합계 대조, 오류 표시, 회의자료 세 장 작성을 요청합니다. 마지막에는 숫자가 나온 원본 위치와 실제 파일을 확인합니다.\n② 신청 페이지 고치기: 작은 화면에서 가려지는 버튼을 보여주고 문제 재현, 해당 부분 수정, 같은 크기에서 클릭 확인을 한 번에 맡깁니다. 원하는 모습만 설명하기보다 정상 동작의 조건을 알려줍니다.\n③ 업무 이어받기: 목표·완료한 일·남은 문제·자료 위치를 짧게 정리해 넘깁니다. 아래의 문맥 이어가기 설정과 인계 메모를 함께 참고하십시오.\n\n**먼저 써본 사람들이 짚은 이점**\n카카오위키에 정리된 초기 사용 후기에는 코드 구조를 고칠 때 같은 방향을 다시 설명하는 일이 줄었다는 평가가 있습니다. 화면을 읽고 도구를 쓰는 작업을 좋게 본 경험도 있었습니다. 반면 작업이 빠르게 진행되는 만큼 사용량도 빨리 줄었다는 보고가 함께 나옵니다. 같은 조건에서 성능을 비교한 실험은 아니므로, 모든 업무에서 더 빠르거나 정확하다는 뜻으로 받아들이지는 않습니다.\n\n적용하기 좋은 출발점은 평소 여러 번 설명해야 했던 어려운 과제 하나입니다. 복잡한 오류의 원인 찾기, 구조 개선 계획, 완성본의 마지막 검토부터 맡겨 보십시오. 작업 전후 잔여량, 다시 설명한 횟수, 사람이 재수정한 시간을 기록하면 자신에게 생긴 이익을 판단할 수 있습니다. 이는 공유된 운영 조언을 바탕으로 구성한 실습 제안이며 비용 절감을 실측한 결과는 아닙니다.\n\n**105만 문맥과 오래 이어가는 작업은 어떻게 다른가요**\n컨텍스트는 AI가 현재 작업을 판단할 때 참고하는 대화와 자료의 범위입니다. 공식 API 문서의 Astra 사양은 전체 문맥 105만 토큰, 최대 입력 92만 2천 토큰, 최대 출력 12만 8천 토큰입니다. 105만을 입력으로 한 번에 넣을 수 있다는 뜻은 아닙니다. 이 수치만으로 일반 ChatGPT 대화나 모든 앱·계정의 한도를 같다고 판단할 수도 없습니다.\n\nCodex 설정의 `model_context_window`는 모델이 쓸 문맥 크기이고, `model_auto_compact_token_limit`는 대화 기록을 자동으로 요약하기 시작할 기준입니다. 뒤의 값을 지정하지 않으면 모델 기본값을 사용합니다. 설정 숫자만 크게 쓴다고 실제 모델의 한도가 늘어나지는 않습니다. 특정인의 1M 설정이나 압축 기준을 그대로 복사하기보다 현재 모델·실행 환경의 지원 범위부터 확인합니다.\n\n**ChatGPT 데스크톱·Codex에서 문맥 이어가기 설정**\n지원되는 Codex 클라이언트에는 이전 내용을 노트에 남기고 같은 작업의 앞선 메시지·도구 결과를 찾아보는 실험 기능이 있습니다. 기본값은 꺼짐입니다. 공식 모델 안내는 ChatGPT Plus·Pro 로그인을 명시하며, 설정 참조에는 Pro Lite도 포함합니다. 출시 시점의 Business·Enterprise·API 키 로그인은 대상에서 제외돼 있으므로 자신의 계정과 앱 버전을 확인합니다. 일반 ChatGPT 웹 대화의 메모리 메뉴에서 켜는 설정은 아닙니다.\n\n1. 현재 설정 파일 `~/.codex/config.toml`을 열고 사본을 보관합니다. Codex IDE 확장에서는 톱니바퀴 → Codex Settings → Open config.toml로 열 수 있습니다. 데스크톱 앱·CLI·IDE 확장은 이 사용자 설정 파일을 공유합니다.\n2. 이미 해당 설정이 있으면 그 값만 바꿉니다. 없다면 파일 맨 위, 첫 `[섹션]`보다 앞에 아래 한 줄을 넣습니다. 기존 `[features.context_management]` 섹션이 있다면 그 안의 `experimental_mode` 값만 `true`로 바꾸고 같은 설정을 중복으로 만들지 않습니다.\n\n`features.context_management.experimental_mode = true`\n\n3. 저장한 다음 새 작업을 시작합니다. 기존 작업에도 즉시 적용됐다고 가정하지 않습니다. 프로젝트별 설정과 조직의 필수 정책이 더 우선할 수 있습니다.\n4. 새 작업에 목표·결정·자료 위치를 주고, 이후 그 내용을 정확히 찾아 이어가는지 결과로 확인합니다. 답변이 기억하는 것처럼 보인다는 이유만으로 기능 활성화를 확정하지 않습니다. 문제가 생기면 값을 `false`로 되돌리고 새 작업을 시작합니다.\n\n위 순서는 9월 9일 공식 문서로 확인한 안내입니다. 카카오위키에서 설정 성공 사례를 확인한 것은 아니며, 이 브리핑 작성 중 계정 설정을 변경하거나 긴 작업의 기억 성능을 재현하지 않았습니다.\n\n**설정과 함께 남길 짧은 인계 메모**\n공유된 문맥 관리 조언은 확정한 결정과 자료 위치를 남기는 데 초점을 둡니다. Astra에만 해당하는 방법은 아닙니다. 서로 독립적인 결과물은 작업을 나누고, 같은 오류를 추적 중이면 재현 조건과 확인한 원인을 함께 보존합니다. 아래 양식을 채워 새 작업에 주면 무엇을 이어야 하는지 분명해집니다.\n\n목표: 이번에 끝낼 결과물\n완료: 실제로 확인한 결과와 확인 방법\n남은 일: 아직 해결하지 못한 문제\n결정: 유지할 조건과 변경 가능한 범위\n자료: 파일 위치 또는 근거 링크\n\n요청 예시: “위 메모의 목표와 결정을 유지해 주세요. 필요한 자료를 읽고 남은 일부터 진행해 주세요. 이미 허용된 수정은 이어가고, 추가 승인이 필요한 행동만 구체적으로 알려 주세요. 최종 결과와 확인 내역은 한국어로 보고해 주세요.”\n\n**사용량은 무엇을 보나요**\n5시간 한도는 5시간 연속 작업권이 아닙니다. 읽는 자료, 추론, 도구 호출, 출력량에 따라 달라지고 Work와 Codex는 사용량을 공유합니다. Fast 모드는 크레딧 소비가 커집니다. 한 번의 답변 속도보다 검토까지 끝낸 작업 수와 사람이 다시 고친 시간을 함께 기록하십시오. 작업을 시작하기 전 속도 설정과 잔여량을 확인하면 비교가 쉬워집니다.\n\n**발표용 제안 시연**\n개인정보 없는 연습 페이지에서 버튼이 가려지는 상태를 먼저 보여준 뒤, Astra에 수정과 재확인을 맡깁니다. 도중에 “버튼 문구는 유지해 주세요”를 추가해 앞선 목표와 새 조건을 함께 지키는지 봅니다. 수정 후 같은 화면에서 클릭하고 변경 결과를 대조합니다. 이는 새로 작성한 시연안이며 아직 실행하지 않았습니다. 모델 노출, 권한, 최종 파일·화면은 리허설로 확인해야 합니다.\n\n**요청문에 넣을 다섯 가지**\n목적, 사용할 자료, 원하는 결과 파일, 바꿔도 되는 범위, 끝났다고 판단할 조건을 함께 적습니다. 예를 들어 ‘이번 달 교육 운영표를 점검해 주세요. 첨부한 표만 근거로 삼고 합계가 틀린 셀을 표시한 뒤 회의용 요약 한 장을 만들어 주세요. 원본은 보관하고, 결과 파일을 열어 숫자와 잘림까지 확인해 주세요’처럼 부탁할 수 있습니다. 작업 중에는 새 조건만 짧게 더하고, 마지막에는 결과 파일과 확인 내역을 함께 봅니다.\n\n**Astra가 보이는 특이한 행동과 요청 요령**\nOpenAI의 공식 적용 가이드는 다음 다섯 가지 경향을 짚습니다. 모든 작업에서 나타나는 고정된 성격이 아니라 요청을 조정할 때 참고할 행동 특성입니다.\n\n- 질문이 늘어날 수 있습니다. 선택에 따라 결과가 크게 바뀌면 확인하려는 경향이 있어, 스스로 정해도 되는 범위와 반드시 물어야 할 조건을 함께 적습니다.\n- 지침 파일에 민감합니다. 오래된 스킬이나 `AGENTS.md`에 모호하거나 충돌하는 문장이 있으면 진행에 영향을 줄 수 있습니다. 지침을 무조건 더 붙이기보다 현재 작업과 맞는지 확인합니다.\n- 답변이 길고 형식적인 구성을 반복할 수 있습니다. “한국어로 결과·근거·남은 문제를 각각 한 문단으로 보고해 주세요”처럼 원하는 분량과 형식을 지정합니다.\n- 하위 에이전트에게 예상보다 덜 맡길 수 있습니다. 병렬 처리가 필요하면 “서로 독립적인 두 조사만 나눠 진행하고, 최종 판단은 한곳에서 합쳐 주세요”처럼 분담 범위를 적습니다.\n- 작은 코드 수정에도 검사를 넓게 할 수 있습니다. 변경과 관련된 검사, 프로젝트 필수 검사, 완료 조건을 지정하고 새로운 실패나 우려가 있을 때 검사를 넓히도록 요청합니다.\n\n**승인을 반복해서 물을 때**\n“어떤 지침 파일의 어느 문장 때문에 멈췄는지 알려 주고, 이미 허용한 준비 작업은 끝낸 뒤 확인받을 결과를 보여 주세요”라고 요청해 원인을 확인할 수 있습니다. 앞서 승인한 범위에서 계속할 일과 새 승인이 필요한 행동을 나누는 방법입니다. 위키에서 반복 질문을 직접 재현한 사례는 확인하지 못했으며, 여기서는 공식 가이드의 행동 설명을 근거로 합니다.\n\n**실제 공개 사례: Playco의 게임 시제품**\n게임 제작사 Playco는 단순한 게임 원형을 만든 뒤 같은 규칙을 유지하며 테마 세 가지를 비교했습니다. 시안을 만든 다음 실제로 플레이하고 오류를 확인하는 순서가 핵심입니다. 공식 사례의 화면에서 ‘무엇을 유지하고 무엇을 바꾸었는가’를 짚어 볼 수 있습니다. Playbot과 Unity·Godot 등 도구를 연결한 고객사 사례이므로 일반 계정에서 같은 결과가 즉시 나온다고 해석하지 않습니다.\n\n**참고 영상**\nMatt Wolfe · Astra 목차 11:00\nhttps://www.youtube.com/watch?v=GfPZm9yucQo&t=660s\n영상 설명란의 목차를 기준으로 연결했습니다. 사실 확인은 아래 공식 원문·문서를 따르며, 영상 전체 시청이나 자막 검증을 완료했다는 뜻은 아닙니다.",
        source: "https://openai.com/index/gpt-6-astra/",
        officialUrl: "https://openai.com/index/gpt-6-astra/",
        verifiedAt: "2026-09-09",
        backupUrls: [
          {
            label: "모델 선택",
            url: "https://learn.chatgpt.com/docs/models"
          },
          {
            label: "브라우저 사용법",
            url: "https://learn.chatgpt.com/docs/browser"
          },
          {
            label: "Computer Use 설정",
            url: "https://learn.chatgpt.com/docs/computer-use"
          },
          {
            label: "한도와 크레딧",
            url: "https://learn.chatgpt.com/docs/pricing"
          },
          {
            label: "문맥 설정 항목과 지원 계정",
            url: "https://learn.chatgpt.com/docs/config-file/config-reference"
          },
          {
            label: "Astra 공식 적용 가이드",
            url: "https://developers.openai.com/api/docs/guides/latest-model"
          },
          {
            label: "Playco 게임 제작 공개 사례",
            url: "https://openai.com/index/playco-game-prototyping-with-astra/"
          },
          {
            label: "설정 파일 위치와 적용 순서",
            url: "https://learn.chatgpt.com/docs/config-file/config-basic"
          },
          {
            label: "Astra API 문맥·입출력 사양",
            url: "https://developers.openai.com/api/docs/models/gpt-6-astra"
          }
        ],
        thumbnail: {
          src: "/og-cache/ab-20260910-astra.webp",
          alt: "GPT-5.6 Sol과 GPT-6 Astra가 개인 경력 웹사이트 제작 요청에 답하는 방식을 나란히 비교한 OpenAI 공식 화면",
          caption: "OpenAI 제공 개인 웹사이트 제작 요청 응답 비교 화면입니다."
        },
        tags: [
          "2026-09a",
          "OpenAI",
          "활용 가이드"
        ],
        en: {
          title: "GPT-6 Astra: from answers to verified work",
          deck: "Early user experiences, context continuity setup, and five documented Astra behaviors.",
          summary: "Use Astra for difficult diagnosis and review, while measuring rework and usage. Follow the documented local context-management setup and distinguish reported experiences from official capabilities.",
          content: "Astra strengthens work across code, browsers, and desktop apps. Start with the default reasoning level, define the deliverable and verification steps, and measure completed work rather than response speed. The suggested live demonstration has not been executed.\n\n**What early users found useful**\nProcessed community notes include reports of fewer repeated instructions when restructuring code and positive experiences with screen-based tasks. They also describe rapid usage depletion. These are reported experiences, not controlled comparisons. Try a difficult task that usually needs several corrections and record follow-up instructions, manual rework and the change in remaining usage. Starting with a complex diagnosis, design review or final evaluation is a proposed workflow, not a measured guarantee of savings.\n\n**Capacity and continuity are different**\nThe official Astra API specification lists a 1,050,000-token context window, a maximum input of 922,000 tokens and maximum output of 128,000 tokens. The full context window is not the maximum input allowance, and these figures do not establish the limits of every ChatGPT surface or account. In Codex, `model_context_window` describes available context capacity; `model_auto_compact_token_limit` sets the threshold for summarizing history and uses the model default when unset. Increasing a local number does not expand the actual model limit.\n\n**Enable experimental context management in supported Codex clients**\nThis opt-in feature carries notes across context windows and can retrieve earlier messages and tool results from the same task. It is off by default. The model guide lists ChatGPT Plus and Pro sign-in; the configuration reference also lists Pro Lite. Business, Enterprise and API-key sign-in are excluded at launch. This is a local client setting, not the ordinary ChatGPT web memory menu.\n\n1. Open `~/.codex/config.toml` and keep a backup. The IDE extension provides a gear menu → Codex Settings → Open config.toml. The desktop app, CLI and IDE extension share this user configuration file.\n2. Update the existing setting if present. Otherwise place the following dotted key before the first `[section]`. If a `[features.context_management]` section already exists, update `experimental_mode` within it instead of creating a duplicate.\n\n`features.context_management.experimental_mode = true`\n\n3. Save and start a new task. Project overrides and managed requirements may still take priority.\n4. Provide a goal, decisions and source locations, then check whether the work continues accurately. An apparently remembered answer alone does not prove feature activation. To undo the setting, use `false` and start a new task.\n\nThe procedure was checked against official documentation on September 9. We did not change account settings or reproduce long-task memory performance while preparing this briefing. The processed community notes did not contain a reproduced setup procedure.\n\n**Keep a short handoff**\nRecord the goal, verified results and checks, unresolved work, decisions and allowed changes, and source locations. This is general context-management advice rather than an Astra-exclusive capability. Separate independent deliverables, while preserving reproduction steps and confirmed causes when continuing the same investigation. Example: “Keep the goal and decisions in this handoff. Read the relevant sources, continue the authorized work, and identify only actions requiring new approval. Report results and checks in Korean.”\n\n**Five behaviors highlighted by OpenAI**\n- Astra may pause for clarification when an answer could materially change the result. Define reasonable assumptions and the conditions that require a question.\n- It can be sensitive to skills and `AGENTS.md`. Review stale, ambiguous or conflicting instructions.\n- It may produce long, heavily structured answers. Specify the desired length and format.\n- It may delegate less than expected. Define which independent tasks should be split and how results should be combined.\n- It may run broader tests than a small code change needs. Specify relevant checks, required project checks and completion criteria, then expand testing when a new failure or concern justifies it.\n\nThese are documented tendencies, not guaranteed behavior on every task. Ask the model to identify the exact instruction causing repeated approval requests and to finish already authorized preparation before presenting a concrete result for approval. The reviewed community notes did not establish a firsthand reproduction of repeated approval prompts."
        },
        releaseScope: "Work·Codex / 순차 제공"
      },
      sourceWeek: "2026-w36",
      sourceCompany: "OpenAI",
      editorial: "업무를 맡길 때 모델 선택, 작업 범위, 완성 확인을 한 흐름으로 묶습니다."
    },
    {
      rank: 2,
      tier: "feature",
      post: {
        title: "Claude Fable 5.1, 긴 문서와 여러 단계의 일을 맡기는 법",
        deck: "자료를 연결하는 능력과 추론·수정 범위의 조절을 함께 봅니다.",
        summary: "Fable 5.1은 긴 코딩과 지식 작업을 강화하고 캐시 읽기 비용을 낮췄습니다. 문서 대조·부분 교정·작업 인계를 구체적으로 요청하고 구독 한도와 실제 품질을 함께 확인할 수 있습니다.",
        slug: "claude-fable-5-1-practical-workflows",
        date: "9/1",
        platform: "Web",
        featured: true,
        content: "**이번 변화가 중요한 이유**\nFable 5.1은 여러 자료와 도구를 연결하는 긴 작업을 겨냥합니다. Anthropic은 코딩·지식 업무와 연구 능력의 개선을 강조했고, 이미 읽은 내용을 다시 활용하는 캐시의 읽기 가격을 낮췄습니다. 좋은 초안과 긴 작업의 완주는 서로 다른 기준이므로, 결과물과 사용량을 함께 봐야 합니다.\n\n**어디서 어떻게 시작하나요**\nClaude 웹·모바일·데스크톱에서 모델 선택기를 열어 Fable 5.1을 고릅니다. 파일을 다루는 Cowork는 최신 데스크톱 앱을 확인합니다. Claude Code 이용자는 최신 버전으로 업데이트하고 /model에서 선택하거나 claude --model claude-fable-5-1로 시작할 수 있습니다. 공식 지원 도움말은 2.1.255 이상을 안내하며, 2.1.257 릴리스에는 새 기본 별칭과 추가 설정이 기록돼 있습니다.\nClaude Code의 공식 출발점은 high입니다. 비용이 중요하면 /effort medium으로 낮추고 같은 과제에서 품질을 비교해 보십시오. /effort auto는 저장된 추론 설정을 지웁니다. 모델이 달라지면 같은 강도 이름도 실제 사고량은 같지 않습니다.\n\n**세 가지 업무에 적용해 보세요**\n① 숫자 대조 보고서: 지표표·회의 메모·전주 보고를 주고 서로 다른 수치와 기간을 먼저 표시하게 합니다. 확인된 내용으로만 한 쪽 보고서를 만들고, 자료에 없는 값은 미확인으로 남기게 합니다.\n② 원고 부분 교정: 문체 기준과 바꿀 문단을 지정한 뒤 논리 비약·중복을 고치게 합니다. “사실과 주장 강도는 유지하고 다른 문단은 건드리지 마세요”라고 요청하면 검토 범위가 분명해집니다.\n③ 프로젝트 이어받기: 완료한 일, 남은 문제, 확정한 결정, 관련 자료 위치를 짧게 넘깁니다. 이미 끝난 일을 반복하지 않는지 확인하고, 다른 업무로 넘어갈 때는 필요한 맥락만 새 대화에 전달합니다. 이 순서는 제안하는 작업 방식이며 실제 결과로 확인해야 합니다.\n\n**사용량을 줄일 때 놓치기 쉬운 점**\n캐시 가격 인하는 API 등 토큰 과금 환경의 변화입니다. Max의 포함 사용량이 같은 비율로 늘어나는 약속은 아닙니다. Max에서는 공유 주간 한도의 최대 50%를 Fable에 쓸 수 있고, Pro는 사용 크레딧으로 시작합니다. 작은 수정에서도 파일 전체를 다시 쓰는 경향은 공식 가이드가 지적한 부분이므로 필요한 곳만 고치라고 명시하십시오. low에서는 검색을 덜 할 수 있어 최신 사실은 원문 확인을 함께 요청해야 합니다.\n\n**업무 자료의 보관 조건**\n조직용 계약에서는 자료 보관 조건도 확인해야 합니다. 공식 도움말은 일부 무보관 계약 조직에 30일 보관이 적용되며, 별도 자격 통지를 받은 조직에는 예외가 있다고 안내합니다. 이번 변경을 소비자 Pro·Max 계정에 동일하게 적용되는 규칙으로 해석하면 안 됩니다.\n\n**발표용 제안 시연**\n가상의 지표표와 회의 메모에 숫자 불일치 하나를 넣고, Fable에 근거 대조와 보고서 작성을 맡깁니다. 오류를 찾았는지, 임의로 숫자를 확정하지 않았는지, 정해진 양식을 지켰는지 보여드립니다. 이어 한 문단만 수정해 범위 통제를 확인합니다. 이 시연은 아직 실행하지 않았습니다. 계정의 모델 접근, 사용량 화면, 결과 파일 열기와 실제 숫자 대조는 발표 전 확인이 필요합니다.\n\n**만든 파일의 출처 확인**\nClaude의 공식 파일 확인 도구에서는 지원 이미지·영상·음원에 출처 정보가 붙어 있는지 볼 수 있습니다. 도구 안내에 따르면 파일은 기기를 떠나지 않고 브라우저 안에서 정보를 읽습니다. 첨부된 출처 정보를 확인하는 기능이며 글의 작성자를 판정하는 도구가 아닙니다. 정보가 없다는 이유만으로 사람이 만든 파일이라고 판단해서도 안 됩니다.\n\n**참고 영상**\nMatt Wolfe · Fable 목차 1:30\nhttps://www.youtube.com/watch?v=GfPZm9yucQo&t=90s\n영상 설명란의 목차를 기준으로 연결했습니다. 사실 확인은 아래 공식 원문·문서를 따르며, 영상 전체 시청이나 자막 검증을 완료했다는 뜻은 아닙니다.",
        source: "https://www.anthropic.com/claude-fable-and-mythos-5-1",
        officialUrl: "https://www.anthropic.com/claude-fable-and-mythos-5-1",
        verifiedAt: "2026-09-09",
        backupUrls: [
          {
            label: "모델 명세",
            url: "https://platform.claude.com/docs/en/models/fable-5-1/overview"
          },
          {
            label: "작업 지시 가이드",
            url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1"
          },
          {
            label: "추론·모델 설정",
            url: "https://code.claude.com/docs/en/model-config"
          },
          {
            label: "요금제별 한도",
            url: "https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan"
          },
          {
            label: "Claude Code 2.1.257",
            url: "https://github.com/anthropics/claude-code/releases/tag/v2.1.257"
          },
          {
            label: "모델별 데이터 보관 적용 범위",
            url: "https://support.claude.com/en/articles/15425996-data-retention-practices-for-covered-models"
          },
          {
            label: "Claude 파일 출처 확인 도구",
            url: "https://claude.com/check-files"
          }
        ],
        thumbnail: {
          src: "/og-cache/ab-20260910-fable51.jpg",
          alt: "Claude가 설계한 주황색 단백질 결합체와 회색 표적을 보여 주는 공식 연구 시연 영상의 정지 포스터",
          caption: "Anthropic 제공 연구 시연 포스터. 구조는 ESMFold2 예측이며 성능의 독립 검증 이미지가 아닙니다."
        },
        tags: [
          "2026-09a",
          "Anthropic",
          "활용 가이드"
        ],
        en: {
          title: "Claude Fable 5.1 for long documents and multi-step work",
          deck: "Control reasoning and edit scope while connecting several sources.",
          summary: "Fable 5.1 targets long coding and knowledge-work tasks with lower cache-read pricing. Compare source documents, request targeted edits, and hand off only necessary context. Subscription allowances and API savings are different; the proposed demonstration remains untested.",
          content: "Fable 5.1 targets long coding and knowledge-work tasks with lower cache-read pricing. Compare source documents, request targeted edits, and hand off only necessary context. Subscription allowances and API savings are different; the proposed demonstration remains untested."
        },
        releaseScope: "Claude·Code / API"
      },
      sourceWeek: "2026-w36",
      sourceCompany: "Anthropic",
      editorial: "긴 작업의 결과와 사용량을 함께 보면서 생각의 강도와 수정 범위를 조절합니다."
    },
    {
      rank: 3,
      tier: "feature",
      post: {
        title: "Gemini 3.8 Flash, 자료 탐색과 반복 작업을 맡길 새 후보",
        deck: "입력 자료를 표·질문·분류로 바꾸고, 중요한 결론은 근거와 대조합니다.",
        summary: "Gemini 3.8 Flash는 긴 코딩·다단계 추론을 강화했습니다. Gemini 앱과 AI Studio에서 제공 모델을 확인하고 자료 비교·교육 준비·응답 분류에 적용해 볼 수 있습니다.",
        slug: "gemini-3-8-flash-practical-workflows",
        date: "9/2",
        platform: "Web",
        featured: true,
        content: "**이번 변화가 중요한 이유**\nGemini 3.8 Flash는 빠른 반복 작업에 쓰이던 Flash 계열을 긴 코딩과 다단계 추론 쪽으로 확장했습니다. Google은 복잡한 문제에서 더 많이 생각하고 도구를 반복 사용하도록 개선했다고 설명합니다. 따라서 단가가 낮아도 과제당 사용량은 늘 수 있습니다. 다른 버전의 Gemini 사용 경험을 그대로 3.8 Flash의 성능으로 해석하지 않아야 합니다.\n\n**어디서 어떻게 시작하나요**\n일반 사용자는 Google AI Pro·Ultra 구독의 Gemini 앱에서 선택 가능한 모델을 확인합니다. 공식 발표는 검색 AI Mode와 Google Sheets의 제공도 안내합니다. 제작·개발 흐름은 Google AI Studio 또는 Google Antigravity에서 3.8 Flash를 확인해 시작할 수 있습니다. API의 공식 모델 코드는 gemini-3.8-flash입니다.\n모델 명세상 텍스트·이미지·영상·음성·PDF를 입력하고 텍스트로 답합니다. 사진을 읽는 기능과 새 이미지를 만드는 기능은 다릅니다. 3.8 Flash 자체는 이미지·음성 생성을 지원하지 않습니다. API 사고 단계는 low·medium·high이며 minimal은 오류가 나므로 다른 모델의 설정을 그대로 옮기지 마십시오.\n\n**세 가지 업무에 적용해 보세요**\n① 비교표 만들기: 행사장이나 제품의 공개 소개 자료 세 개를 주고 같은 기준으로 비교합니다. 자료에 없는 가격이나 조건은 추측하지 말고 미확인으로 남기게 합니다. 어느 자료를 근거로 삼았는지도 함께 받습니다.\n② 교육 자료 정리: 사용 권한이 있는 PDF와 짧은 영상을 넣고 공통 개념, 설명이 다른 부분, 확인 질문을 묶어 받습니다. 정답 근거가 있는 페이지·장면을 다시 열어 실제 내용과 맞는지 확인합니다.\n③ 설문 응답 분류: 가상 응답을 불편·제안·칭찬으로 나누고 판단이 애매한 항목은 보류하게 합니다. 분류 기준을 먼저 적고 원래 응답 수와 결과 합계가 맞는지 확인하면 누락을 찾기 쉽습니다. 중요한 의사결정은 이 초안만으로 확정하지 않습니다.\n\n**속도와 한도를 보는 방법**\nGoogle은 3.7 Flash와 같은 도입 가격을 안내하면서 복잡한 작업의 토큰 증가 가능성도 설명합니다. 이 가격은 기간 조건이 있으며 Gemini 앱의 무료 사용량을 뜻하지 않습니다. 낮은 추론 단계에서 품질이 유지되는지 비교하고, 효율이 우선인 기존 업무는 3.7과도 대조할 수 있습니다. 일반 Flash와 보안용 Flash Cyber의 접근 조건·성능 수치는 구분해야 합니다.\n\n**발표용 제안 시연**\n가상의 행사장 자료 세 개를 넣고 50명 교육에 적합한지 비교표를 만들게 합니다. 이어 인원을 80명으로 바꾸어 어떤 조건이 달라지는지 보여드립니다. 없는 정보를 지어내지 않는지, 같은 비교 기준을 유지하는지, 결론이 실제 수용인원과 맞는지가 관찰점입니다. 아직 실행하지 않은 시연안이며 처리 시간·정확도·비용은 측정하지 않았습니다. 한국 계정의 실제 모델 노출과 자료 입력, 근거 위치 확인을 리허설에서 점검해야 합니다.\n\n**참고 영상**\nMatt Wolfe · Gemini 목차 4:04\nhttps://www.youtube.com/watch?v=GfPZm9yucQo&t=244s\n영상 설명란의 목차를 기준으로 연결했습니다. 사실 확인은 아래 공식 원문·문서를 따르며, 영상 전체 시청이나 자막 검증을 완료했다는 뜻은 아닙니다.",
        source: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/",
        officialUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/",
        verifiedAt: "2026-09-09",
        backupUrls: [
          {
            label: "모델과 입력·설정 명세",
            url: "https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash"
          },
          {
            label: "Google AI Studio",
            url: "https://aistudio.google.com/"
          },
          {
            label: "Google Antigravity",
            url: "https://antigravity.google/"
          }
        ],
        thumbnail: {
          src: "/og-cache/ab-20260910-gemini38.webp",
          alt: "Gemini 3.8 Flash와 3.8 Flash Cyber를 함께 소개하는 Google 공식 기사 대표 이미지",
          caption: "Google 공식 본문 상단 이미지"
        },
        tags: [
          "2026-09a",
          "Google",
          "활용 가이드"
        ],
        en: {
          title: "Gemini 3.8 Flash for research and repeatable tasks",
          deck: "Turn source material into comparisons, questions, and classified responses.",
          summary: "Gemini 3.8 Flash strengthens long coding and multi-step reasoning. Confirm the available model in Gemini or AI Studio, keep source references, and validate missing information. Flash Cyber has separate access conditions; the presentation demo is a proposal, not an executed test.",
          content: "Gemini 3.8 Flash strengthens long coding and multi-step reasoning. Confirm the available model in Gemini or AI Studio, keep source references, and validate missing information. Flash Cyber has separate access conditions; the presentation demo is a proposal, not an executed test."
        },
        releaseScope: "앱·API / 일반 Flash"
      },
      sourceWeek: "2026-w36",
      sourceCompany: "Google",
      editorial: "자료 비교와 반복 분류부터 시작해 누락과 근거를 직접 확인합니다."
    },
    {
      rank: 4,
      tier: "feature",
      post: {
        title: "ChatGPT Images 2.5 — 만든 이미지를 이어서 고칩니다",
        deck: "부분 수정·여러 차례 편집·스케치 입력으로 제작 흐름이 바뀝니다",
        summary: "9월 8일 공개된 Images 2.5의 핵심은 참조 인물과 구도를 유지하면서 필요한 부분을 고치는 능력입니다. ChatGPT의 Sketch·이미지 댓글·템플릿과 API의 Flare·Sunburst를 함께 살펴봅니다.",
        slug: "chatgpt-images-2-5-editing-workflows",
        date: "9/8",
        platform: "Web",
        featured: true,
        content: "**완성보다 수정 과정이 중요해졌습니다**\n\nOpenAI는 9월 8일 ChatGPT Images 2.5를 공개했습니다. 참조 사진의 특징을 유지하고, 지정한 부분만 바꾸며, 여러 차례 수정해도 앞서 정한 조건을 더 잘 보존한다고 설명합니다. 광고 시안을 만든 뒤 제품만 교체하거나, 발표 도해의 문구를 바꾸는 작업과 연결됩니다. 이는 공급자 설명이며 이 브리핑에서 편집 성능을 재측정한 결과는 아닙니다.\n\n**ChatGPT에서 시작하는 세 가지 방법**\n\n사진을 첨부하고 바꿀 대상과 유지할 조건을 함께 적습니다. 배치가 말로 잘 전달되지 않으면 @Sketch로 간단한 구도를 그려 시각적 참고로 사용합니다. 이미 만들어진 결과에는 이미지 위에 댓글을 달아 수정할 위치를 지정할 수 있습니다. Poster·Merch 같은 템플릿은 처음부터 구성 요소를 잡는 출발점입니다.\n\n**발표에서 해볼 편집 실습**\n\n직접 촬영한 제품 사진 한 장을 준비합니다. 첫 요청은 ‘제품의 모양과 상표 글자를 유지하고 배경만 흰색 스튜디오로 바꿔 주세요’입니다. 다음에는 ‘제품과 그림자는 유지하고 오른쪽에 한글 가격표를 넣어 주세요’, 마지막에는 ‘가격표의 금액만 바꿔 주세요’라고 요청합니다. 각 단계에서 제품 형태·글자·그림자 중 무엇이 유지되고 무엇이 바뀌었는지 원본과 대조합니다. 이 순서는 권장 실습이며 실제 생성에 성공했다는 기록은 아닙니다.\n\n같은 방식으로 행사 포스터의 날짜 수정, 한 인물이 이어지는 교육 자료, 배경이 투명한 상품 이미지도 시험할 수 있습니다. 만족한 이미지는 사용한 프롬프트와 함께 공유해 다른 사진에 적용하는 기능도 제공합니다.\n\n**Flare와 Sunburst는 어디가 다를까요**\n\nChatGPT 제품 이름은 Images 2.5이고, API 모델은 GPT-Image-2.5 Flare와 Sunburst입니다. OpenAI는 일반적인 제작에 Flare를, 수정 통제를 더 중시하는 작업에 Sunburst를 안내합니다. Sunburst는 생성 시간이 더 걸릴 수 있습니다. API 요금과 ChatGPT 요금제의 사용 한도는 별개이므로 사용 경로에 맞춰 확인해야 합니다.\n\n**결과를 판단하는 기준**\n\n공식 발표는 ChatGPT·Work·Codex의 모든 요금제로 배포한다고 안내합니다. 계정에 해당 기능이 보이는지는 실행 시점에 확인하십시오. 속도 개선은 공급자 비교이며 모든 이미지에서 같은 시간을 보장하지 않습니다. 최종 시안의 한글, 숫자, 인물 특징과 권리 관계는 사람이 확인해야 합니다.\n\n**참고 영상**\nJulian Goldie · Sketch 목차 0:20\nhttps://www.youtube.com/watch?v=xgx_t6WTxYo&t=20s\n영상 설명란의 목차를 기준으로 연결했습니다. 사실 확인은 아래 공식 원문·문서를 따르며, 영상 전체 시청이나 자막 검증을 완료했다는 뜻은 아닙니다.",
        source: "https://openai.com/index/introducing-chatgpt-images-2-5/",
        officialUrl: "https://openai.com/index/introducing-chatgpt-images-2-5/",
        verifiedAt: "2026-09-09",
        backupUrls: [
          {
            label: "API 요금·모델별 비용",
            url: "https://developers.openai.com/api/docs/pricing"
          }
        ],
        thumbnail: {
          src: "/og-cache/ab-20260910-images25.webp",
          alt: "파란 배경의 어린이 인물 사진에서 의상이 아이보리 턱시도와 검은 나비넥타이로 바뀐 ChatGPT Images 2.5 결과 예시",
          caption: "OpenAI 제공 Images 2.5 편집 결과 예시. 원본 인물 사진과 비교하는 제공사 시연 자료입니다."
        },
        tags: [
          "2026-09a",
          "OpenAI",
          "활용 가이드"
        ],
        en: {
          title: "ChatGPT Images 2.5: create, then keep editing",
          deck: "Reference fidelity, focused edits and Sketch support iterative production.",
          summary: "OpenAI released Images 2.5 on September 8 with improved reference fidelity and iterative editing. The briefing explains Sketch, comments and templates, distinguishes the Flare and Sunburst API models, and proposes an unexecuted three-step product-photo exercise.",
          content: "OpenAI released Images 2.5 on September 8 with improved reference fidelity and iterative editing. The briefing explains Sketch, comments and templates, distinguishes the Flare and Sunburst API models, and proposes an unexecuted three-step product-photo exercise."
        },
        galleryImages: [
          {
            src: "/ab-media/20260910/images25-input.jpg",
            alt: "파란 배경에서 빨간 셔츠를 입은 어린이의 인화된 스튜디오 초상 사진, Images 2.5 편집 예시의 입력 사진",
            caption: "OpenAI 제공 입력 사진. ab-20260910-images25 결과와 짝을 이루는 공식 편집 사례입니다."
          },
          {
            src: "/og-cache/ab-20260910-images25.webp",
            alt: "파란 배경의 어린이 인물 사진에서 의상이 아이보리 턱시도와 검은 나비넥타이로 바뀐 ChatGPT Images 2.5 결과 예시",
            caption: "OpenAI 제공 Images 2.5 편집 결과 예시. 원본 인물 사진과 비교하는 제공사 시연 자료입니다."
          }
        ],
        releaseScope: "ChatGPT·API / 순차 제공"
      },
      sourceWeek: "2026-w37",
      sourceCompany: "OpenAI",
      editorial: "제품 사진 한 장을 세 번 수정하며 유지되는 부분과 흔들리는 부분을 직접 비교할 수 있습니다."
    },
    {
      rank: 5,
      tier: "feature",
      post: {
        title: "페이페이 리의 World Labs Atlas — 사진 너머의 공간을 만듭니다",
        deck: "카메라 이동·공간 복원·시간 변화까지 하나의 모델로 다룹니다",
        summary: "9월 1일 발표된 Atlas는 텍스트·이미지·영상·3D를 공통 공간 맥락으로 다루는 월드 모델입니다. 공식 공간 시연을 보고, 현재 사용 가능한 Marble과 아직 조기 접근 중인 Atlas를 구분합니다.",
        slug: "world-labs-atlas-spatial-intelligence",
        date: "9/1",
        platform: "Web",
        featured: true,
        content: "**한 장의 그림에서 움직일 수 있는 공간으로**\n\n페이페이 리가 공동 창업한 World Labs는 9월 1일 Atlas를 발표했습니다. 텍스트·이미지·영상·3D 정보를 하나의 공간 맥락에 담고, 그 안에서 다음 시점의 장면을 생성하는 모델입니다. 사진을 예쁘게 만드는 데서 나아가 카메라가 옆으로 움직였을 때 무엇이 보여야 하는지를 다룹니다.\n\n**공식 시연에서 볼 세 장면**\n\n첫째, 사진 한 장에서 카메라 위치를 바꿉니다. 입력에 없던 뒷면과 주변을 모델이 어떻게 채우는지 볼 수 있습니다. 둘째, 같은 장소의 사진을 한 장씩 추가합니다. 실제 관측이 늘어나면서 상상으로 채운 부분이 어떻게 줄어드는지 비교합니다. 셋째, 여러 카메라로 찍은 동작을 새로운 각도에서 봅니다. 정지한 공간을 넘어 시간과 움직임을 함께 다룬다는 점이 관전 포인트입니다.\n\n공식 페이지는 새 시점의 영상뿐 아니라 점군과 3D Gaussian splats 형태의 공간 결과도 제시합니다. 후자는 수많은 작은 시각 요소로 장면을 표현해 자유로운 시점으로 볼 수 있게 하는 방식입니다. 영상 제작에서는 카메라 동선을 미리 검토하는 데, 공간 디자인에서는 같은 장소의 시점을 비교하는 데, 로봇 연구에서는 관측 영상을 바탕으로 실험 환경을 만드는 데 연결할 수 있습니다. 활용 가능성에 대한 설명이며 현장 성능을 검증한 것은 아닙니다.\n\n**Atlas와 Marble을 혼동하지 마십시오**\n\nAtlas는 일부 파트너를 대상으로 조기 접근 신청을 받는 새 모델입니다. World Labs는 향후 Marble 등에 Atlas를 적용할 계획이라고 밝혔습니다. 따라서 지금 Marble에서 만든 결과를 곧바로 Atlas의 결과라고 소개하면 안 됩니다. 현재 사용할 수 있는 제작 서비스와 앞으로 적용될 모델을 따로 설명해야 합니다.\n\n**바로 해볼 공간 탐색 실습**\n\n우선 아래 공식 Atlas 원문에서 드래그로 시점을 바꾸는 시연을 엽니다. 사진에 실제로 담긴 영역과 모델이 메운 영역을 구분해 보십시오. 이어 Marble의 공개 예시를 열어 같은 공간을 여러 방향에서 살펴봅니다. 직접 제작은 계정의 제공 기능과 크레딧을 확인한 뒤 진행합니다. 자신의 방이나 작업실 사진을 쓸 경우 원본에서 보이는 문·책상·창문 위치를 결과와 대조하는 것이 좋은 시작입니다. 이 브리핑은 제작 실습을 제안하며 유료 생성을 대신 실행하지 않았습니다.\n\n**그럴듯한 공간과 실제 공간의 차이**\n\n보이지 않은 영역은 생성한 추정입니다. 재구성 결과를 실측 도면이나 물리 법칙의 정확한 증명으로 사용할 수는 없습니다. 카메라 제어·복원 성능의 비교 역시 World Labs가 공개한 평가 조건 안에서 읽어야 합니다.\n\n**참고 영상**\n조코딩 · Atlas 목차 22:22\nhttps://www.youtube.com/watch?v=jjLLO7rU6Pk&t=1342s\n영상 설명란의 목차를 기준으로 연결했습니다. 사실 확인은 아래 공식 원문·문서를 따르며, 영상 전체 시청이나 자막 검증을 완료했다는 뜻은 아닙니다.",
        source: "https://www.worldlabs.ai/blog/atlas",
        officialUrl: "https://www.worldlabs.ai/blog/atlas",
        verifiedAt: "2026-09-09",
        backupUrls: [
          {
            label: "현재 Marble 서비스",
            url: "https://marble.worldlabs.ai/"
          },
          {
            label: "현재 Marble 기반 World API 안내",
            url: "https://docs.worldlabs.ai/api"
          },
          {
            label: "World Labs 소개",
            url: "https://www.worldlabs.ai/about"
          }
        ],
        thumbnail: {
          src: "/og-cache/ab-20260910-atlas.webp",
          alt: "Atlas가 생성하고 탐색하는 공간을 소개하는 World Labs 공식 기사 상단 영상의 정지 포스터",
          caption: "World Labs 공식 Atlas 시연 포스터. 영상 파일은 다운로드하지 않았습니다.",
          provenance: "source-share-preview"
        },
        tags: [
          "2026-09a",
          "World Labs",
          "활용 가이드"
        ],
        en: {
          title: "World Labs Atlas: from a photograph to spatial context",
          deck: "Camera control, reconstruction and motion in a single world model.",
          summary: "Atlas was announced on September 1 and remains in early access. This briefing walks through official spatial demonstrations, distinguishes Atlas from the currently available Marble service, and explains why unseen generated regions are estimates rather than measurements.",
          content: "Atlas was announced on September 1 and remains in early access. This briefing walks through official spatial demonstrations, distinguishes Atlas from the currently available Marble service, and explains why unseen generated regions are estimates rather than measurements."
        },
        releaseScope: "일부 파트너 조기 접근",
        galleryImages: [
          {
            src: "/og-cache/ab-20260910-atlas-garden.webp",
            alt: "이끼 낀 판타지 정원을 새로운 시점과 3D 공간으로 확장하는 Atlas 공식 사례의 썸네일",
            caption: "World Labs 제공 Fantasy garden 사례 썸네일. 동영상에서 추출하거나 새로 생성한 이미지가 아닙니다."
          },
          {
            src: "/og-cache/ab-20260910-atlas-robotics.jpg",
            alt: "실제 장면을 로봇 시뮬레이션으로 연결하는 Atlas 공식 시연 영상의 정지 포스터",
            caption: "World Labs 제공 Real-to-Sim 시연 포스터. 실제 로봇 실험의 독립 검증 자료는 아닙니다."
          }
        ]
      },
      sourceWeek: "2026-w36",
      sourceCompany: "World Labs",
      editorial: "사진 한 장과 여러 장을 넣은 공식 예시를 비교하면, 공간 모델이 관측과 생성을 어떻게 섞는지 이해하기 쉽습니다."
    },
    {
      rank: 6,
      tier: "feature",
      post: {
        title: "Lyria 3.5 — Gemini에서 보컬과 편곡을 직접 들어봅니다",
        deck: "장르·보컬·곡 길이를 지정해 영상과 발표에 맞는 음악을 만듭니다",
        summary: "9월 4일 공개된 Lyria 3.5는 보컬과 편곡을 개선하고 짧거나 긴 곡을 선택하게 합니다. Gemini 앱의 시작 방법과 같은 설명으로 다른 편곡을 비교하는 청취 실습을 준비했습니다.",
        slug: "lyria-3-5-gemini-music-workflows",
        date: "9/4",
        platform: "Web",
        featured: true,
        content: "**이미지 다음에는 소리를 비교합니다**\n\nGoogle은 9월 4일 Lyria 3.5를 Gemini 앱과 Gemini API에 제공한다고 발표했습니다. 표현력 있는 보컬과 풍부한 편곡, 장르 선택, 보컬·연주곡 구분, 곡 길이 선택을 강조합니다. 모델 점수를 외우는 대신 같은 장면에 서로 다른 음악을 붙여 보면 변화가 더 잘 들립니다.\n\n**Gemini에서 시작하기**\n\nGemini 웹이나 모바일 앱에서 음악을 만들어 달라고 요청하고, 용도·장르·분위기·악기·보컬 여부를 적습니다. 제공되는 길이 선택과 템플릿을 활용할 수 있습니다. Google은 전 세계 사용자에게 제공한다고 안내하지만 계정의 실제 메뉴와 사용 한도는 확인해야 합니다. 개발자는 Google AI Studio와 Gemini API 문서를 통해 별도 경로로 접근합니다.\n\n**말로 음악을 주문할 때 필요한 정보**\n\n‘신나는 음악’만 적으면 결과의 차이를 설명하기 어렵습니다. 어디에 쓸지부터 정하십시오. 행사 시작 영상이라면 내레이션과 겹치는 보컬을 뺄지, 시작부터 박자를 넣을지, 마지막을 조용히 끝낼지를 정할 수 있습니다. 음악 용어를 몰라도 장면과 감정의 변화를 문장으로 설명하면 됩니다.\n\n**두 곡을 나란히 듣는 실습**\n\n첫 요청은 ‘교육 워크숍 오프닝에 쓸 밝은 연주곡을 만들어 주세요. 피아노와 가벼운 타악기를 중심으로, 앞부분은 차분하게 시작하고 중간부터 활기를 더해 주세요. 목소리는 넣지 마세요’입니다. 두 번째는 같은 설명을 복사해 악기 지시를 어쿠스틱 기타와 손뼉 소리로 바꾸고, 별도 곡을 새로 생성합니다. 기존 곡의 편집이나 멜로디·구성 보존을 뜻하지는 않습니다.\n\n두 결과를 들으며 요청한 악기가 있는지, 분위기 변화가 자연스러운지, 끝부분이 끊긴 듯 들리지 않는지 살펴봅니다. 이어서 보컬을 포함한 별도 곡을 새로 요청하면 가사의 전달력과 악기 사이에서 목소리가 얼마나 잘 들리는지도 비교할 수 있습니다. 이는 발표용 실습 제안이며 여기서 실제 음원을 생성하거나 평가한 것은 아닙니다.\n\n**공식 예시를 듣는 방법**\n\n아래 DeepMind 모델 페이지는 장르·악기·보컬·빠르기 등을 적은 프롬프트와 결과 예시를 함께 제공합니다. 예시 한 편을 먼저 들려주고 설명의 어느 부분이 소리에 반영됐는지 짚어보십시오. 페이지에는 기존 Lyria 설명도 함께 있으므로 ‘Introducing Lyria 3.5’ 구역의 예시를 골라야 합니다.\n\n**사용 전 확인할 것**\n\n음악 생성, 실시간 음악 모델, 다른 사람이 만든 음원의 편집은 같은 기능이 아닙니다. 특정 가수와 동일한 목소리나 기존 곡의 재현을 성능 기준으로 삼지 마십시오. 공개·상업 사용 전에는 사용 서비스의 조건과 가져온 가사·음원 권리를 확인해야 합니다. 정확한 생성 가능 길이와 출력 조건은 앱과 API가 같다고 단정하지 않고 각 화면과 문서에서 확인합니다.\n\n**참고 영상**\n조코딩 · Lyria 3.5 목차 13:49\nhttps://www.youtube.com/watch?v=jjLLO7rU6Pk&t=829s\n영상 설명란의 목차를 기준으로 연결했습니다. 사실 확인은 아래 공식 원문·문서를 따르며, 영상 전체 시청이나 자막 검증을 완료했다는 뜻은 아닙니다.",
        source: "https://blog.google/innovation-and-ai/products/gemini-app/better-tracks-lyria-gemini/",
        officialUrl: "https://blog.google/innovation-and-ai/products/gemini-app/better-tracks-lyria-gemini/",
        verifiedAt: "2026-09-09",
        backupUrls: [
          {
            label: "Lyria 3.5 공식 청취 예시",
            url: "https://deepmind.google/models/lyria/"
          },
          {
            label: "Gemini에서 음악 만들기",
            url: "https://gemini.google.com/"
          },
          {
            label: "Lyria 음악 생성 API 문서",
            url: "https://ai.google.dev/gemini-api/docs/music-generation"
          }
        ],
        thumbnail: {
          src: "/og-cache/ab-20260910-lyria.png",
          alt: "Lyria 3.5를 소개하는 Google 공식 기사 공유용 이미지",
          caption: "Google 공식 기사 공유용 이미지. 본문에 별도 정적 이미지가 없어 사용했습니다.",
          provenance: "source-share-preview"
        },
        tags: [
          "2026-09a",
          "Google DeepMind",
          "활용 가이드"
        ],
        en: {
          title: "Lyria 3.5: hear vocals and arrangements in Gemini",
          deck: "Specify genre, instruments, vocal style and song length.",
          summary: "Google released Lyria 3.5 in Gemini on September 4. This briefing links official listening examples and proposes an unexecuted exercise comparing two instrumental arrangements for the same workshop opening.",
          content: "Google released Lyria 3.5 in Gemini on September 4. This briefing links official listening examples and proposes an unexecuted exercise comparing two instrumental arrangements for the same workshop opening."
        },
        releaseScope: "Gemini 앱 / API"
      },
      sourceWeek: "2026-w36",
      sourceCompany: "Google DeepMind",
      editorial: "같은 장면에 다른 악기와 보컬을 적용해 들어보는 순서로 음악 생성의 변화를 설명합니다."
    }
  ],
  editorsPicks: [
    {
      title: "OpenAI Notion Knowledge Capture — 대화와 결정을 다시 쓰는 위키로",
      slug: "openai-notion-knowledge-capture",
      deck: "Astra 작업 결과를 출처·결정·할 일이 연결된 지식으로 남깁니다.",
      subtitle: "기존 공개 도구의 실전 활용",
      category: "공개 도구 · 지식 정리",
      sourceUrl: "https://github.com/openai/plugins/tree/main/plugins/notion/skills/notion-knowledge-capture",
      sourceLabel: "공식 프로젝트",
      guideUrl: "https://github.com/openai/plugins/blob/main/plugins/notion/skills/notion-knowledge-capture/LICENSE.txt",
      guideLabel: "코드 사용 조건",
      summary: "Astra 또는 Fable 작업 뒤 자료를 다음 수업에서 다시 찾을 수 있게 정리하는 구체적 적용",
      body: "Astra로 긴 자료를 처리한 뒤에는 결과를 다음 작업에서 다시 꺼낼 수 있는 형태로 남기는 일이 중요합니다. OpenAI의 현재 플러그인 예제 저장소에 포함된 Notion Knowledge Capture는 대화와 메모에서 사실·결정·할 일을 뽑고, 출처가 연결된 위키·절차서·자주 묻는 질문으로 정리하는 작업 지침입니다. 수업 내용을 매번 새로 설명하는 강사나 회의 뒤 결정사항을 찾아야 하는 팀에 잘 맞습니다.\n\n첫 적용은 범위를 작게 잡는 편이 좋습니다. 가상의 강의 회고 한 건과 기존 수업 안내 한 장을 준비한 뒤, 누구에게 보여줄 문서인지와 어디에 보관할지를 먼저 정합니다. 이어 “이 대화에서 확정한 운영 규칙, 아직 결정하지 않은 질문, 다음 수업 전에 할 일을 나눠 주세요. 각 판단의 근거가 된 문장도 연결하고 기존 안내와 충돌하는 부분을 표시해 주세요”라고 요청할 수 있습니다. 이는 수업용 제안 과제이며 실제 실행 결과는 별도로 확인해야 합니다.\n\n검토할 때는 보기 좋은 요약보다 구분이 정확한지 살펴봅니다. 제안이 결정으로 바뀌지 않았는지, 담당자가 없는 일을 임의로 배정하지 않았는지, 링크가 실제 근거를 가리키는지 확인합니다. 확인한 결과를 Notion의 지정된 위치에 저장하고 관련 안내 페이지에서 찾아갈 수 있게 연결하면, 다음 회의나 수업 준비에 같은 맥락을 이어 쓸 수 있습니다. 같은 입력으로 일반 요청과 스킬을 적용한 요청의 결과를 비교하는 것도 유용한 실습입니다.\n\n준비물은 Codex의 연결 가능한 Notion 앱, 접근할 페이지 권한, 정리할 자료입니다. 현재 공개 예제는 openai/plugins 안에 있으며, 이전 openai/skills 저장소는 후속 저장소로 이동하라고 안내합니다. 연결 계정과 쓰기 대상을 확인한 뒤 본인 실습 공간에서 시작하면 됩니다. 이 지식정리 스킬의 라이선스는 MIT이며 저작권자는 Notion Labs입니다. 저장소 전체나 외부 서비스의 이용 조건까지 같은 라이선스라고 확대할 수는 없습니다.\n\n사용 권한이 있는 자료와 별도 실습 공간에서 결과를 먼저 확인하십시오. 설치와 서비스 연결은 이 브리핑 작성 중 실행하지 않았습니다.",
      editorial: "Astra 또는 Fable 작업 뒤 자료를 다음 수업에서 다시 찾을 수 있게 정리하는 구체적 적용",
      tags: [
        "공개 도구",
        "MIT",
        "실습 제안"
      ],
      tier: "feature",
      thumbnail: {
        src: "/og-cache/ab-20260910-notion-capture.png",
        alt: "OpenAI plugins 공식 저장소의 GitHub 공유 이미지",
        caption: "Notion 지식 정리 스킬이 포함된 OpenAI 공식 저장소의 공유 이미지입니다.",
        provenance: "source-share-preview"
      }
    },
    {
      title: "Spark — 생성한 공간을 직접 돌아다니는 웹으로",
      slug: "worldlabs-spark",
      deck: "Marble의 공간 자산을 브라우저에서 보여주는 World Labs 공개 도구입니다.",
      subtitle: "기존 공개 도구의 실전 활용",
      category: "공개 도구 · 3D 웹",
      sourceUrl: "https://sparkjs.dev/",
      sourceLabel: "공식 프로젝트",
      guideUrl: "https://github.com/sparkjsdev/spark/blob/main/LICENSE",
      guideLabel: "코드 사용 조건",
      summary: "Atlas를 설명한 뒤 현재 가능한 Marble 자산과 브라우저 공간 표시를 연결",
      body: "World Labs의 공간을 보면서 자연스럽게 생기는 다음 질문은 “이 장면을 내 웹페이지에서도 돌아다닐 수 있을까”입니다. Spark는 World Labs가 만든 공개 웹 렌더러로, 3D 공간 데이터를 브라우저 화면에 표시하고 다른 입체 오브젝트와 함께 배치하는 데 사용합니다. World Labs 공식 문서는 Marble에서 내보낸 공간을 웹으로 연결할 때 Spark를 권장합니다. Atlas 발표를 이해한 뒤 생성된 공간을 어디에 활용할지 이어서 보여주기 좋은 도구입니다.\n\n첫 실습은 이미 준비된 공식 예제를 여는 것으로 충분합니다. 화면을 회전하거나 시점을 옮기며 평면 사진과 어떤 차이가 있는지 살펴봅니다. 그다음 본인에게 이용 권한이 있는 작은 공간 자료를 준비하고, 공식 지원 형식으로 내보낼 수 있는지 확인합니다. Spark는 SPZ·PLY 등 여러 공간 파일 형식을 읽습니다. 파일을 직접 만들어 내는 과정과 준비된 파일을 웹에서 표시하는 과정은 각각 확인하는 편이 이해하기 쉽습니다.\n\n활용 과제로는 가상의 교실·전시 공간·촬영 장소를 잡을 수 있습니다. 공간에 설명 지점을 붙이고, 학습자가 한 지점씩 이동하며 자료를 읽는 작은 체험을 설계합니다. “공간 파일을 불러오고 첫 화면에 사용법과 세 개의 설명 지점을 보여 주세요. 모바일에서는 이동 버튼을 크게 하고 언제든 시작 위치로 돌아가게 해 주세요” 같은 요청으로 코딩 도구와 협업할 수 있습니다. 이 요청은 제작 아이디어이며 Spark가 모든 학습 기능을 기본 제공한다는 뜻은 아닙니다.\n\n완성 판단은 멋진 한 장보다 실제 탐색에 둡니다. 첫 화면이 나타나는 시간, 휴대전화에서 움직일 수 있는지, 잘못된 경로에서 안내가 보이는지, 설명 지점이 장면을 가리지 않는지 확인합니다. 큰 공간은 기기 성능과 데이터 크기의 영향을 받으므로 작은 샘플에서 시작하는 편이 좋습니다. Spark 코드는 MIT 라이선스이고 World Labs가 저작권자로 표기돼 있습니다. 표시할 공간·사진·음악의 사용 권리는 자료별로 확인해야 합니다. 현재 Marble 자료나 Spark 예제를 Atlas로 직접 생성한 결과라고 소개하지 않는 것도 중요합니다.\n\n사용 권한이 있는 자료와 별도 실습 공간에서 결과를 먼저 확인하십시오. 설치와 서비스 연결은 이 브리핑 작성 중 실행하지 않았습니다.",
      editorial: "Atlas를 설명한 뒤 현재 가능한 Marble 자산과 브라우저 공간 표시를 연결",
      tags: [
        "공개 도구",
        "MIT",
        "실습 제안"
      ],
      tier: "feature",
      thumbnail: {
        src: "/og-cache/ab-20260910-spark.png",
        alt: "가까운 곳과 먼 곳의 표현을 달리하는 그래픽 기법을 설명한 Spark 공식 글의 비교 그림",
        caption: "World Labs의 Spark 2.0 기술 설명 글에 실린 세부 수준 비교 그림입니다."
      }
    }
  ],
  modelWatch: [
    {
      title: "Runway GWM Worlds 2 — 행동에 반응하는 영상과 소리",
      slug: "runway-gwm-worlds-2-watch",
      deck: "입력에 따라 이어지는 상호작용 세계의 연구 공개",
      category: "공간·영상 · 연구 프리뷰",
      sourceUrl: "https://runway.com/research/introducing-gwm-worlds-2",
      sourceLabel: "공식 연구 시연",
      summary: "9월 3일 공개된 연구 프리뷰입니다. 카메라와 행동 입력에 따라 영상·음성이 이어지며, 현재 제품 전체 공개로 해석하지 않습니다.",
      body: "**공간을 만들고, 그 안의 행동을 바꿉니다**\n\nRunway는 GWM Worlds 2를 9월 3일 연구 프리뷰로 공개했습니다. 인물과 환경에 보내는 행동 지시, 카메라 이동에 따라 영상과 소리가 이어지는 방식입니다. Atlas의 공간 복원과 나란히 보면, 공간을 표현하는 모델과 입력에 반응하며 다음 장면을 만드는 모델의 차이가 보입니다.\n\n공식 페이지는 세계의 지속되는 설정과 시간별 사건을 나눠 입력하는 WorldPrompt를 소개합니다. 시연에서는 일부 행동을 미리 작성하고 키·마우스에 연결했습니다. 따라서 모든 화면의 사건을 모델이 스스로 계획했다고 소개하면 안 됩니다.\n\n**공개 상태와 한계**\n\nRunway는 빠른 카메라 회전에서 세부·형상이 흐트러지고 장기 기억도 완전하지 않다고 명시합니다. 공식 시연을 감상할 수 있지만 일반 계정에서 같은 모델을 바로 실행할 수 있다고 보장할 단계는 아닙니다. 성능 수치는 회사가 제시한 조건의 결과입니다.\n\n**참고 영상**\nAI Search 설명란의 Worlds 2 목차 33:00\nhttps://www.youtube.com/watch?v=ngyFRCNq0Yc&t=1980s\n설명란에서 주제 연결을 확인했으며 전체 영상·자막을 검증한 결과는 아닙니다.",
      tags: [
        "Runway",
        "월드 모델",
        "연구 공개"
      ],
      tier: "normal",
      thumbnail: {
        src: "/og-cache/ab-20260910-runway.webp",
        alt: "석양의 사막에서 창을 든 인물의 시점으로 보이는 Runway GWM Worlds 2 공식 시연 포스터",
        caption: "Runway가 공개한 GWM Worlds 2 연구 시연의 정지 포스터입니다."
      }
    }
  ]
};
