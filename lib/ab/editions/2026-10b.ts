import type { ABEdition } from "../data";

export const edition2026_10b: ABEdition = {
  "slug": "2026-10b",
  "volume": 15,
  "title": "에이전트를 고쳐 쓰고, 도해를 그리고, 목소리를 만드는 도구 여섯 가지",
  "theme": "함께 볼 AI 소식 6가지 · Claude Code v2.1.287 Mods · Anatomy · diagram-design · REA · Harness² · VoiceStudio",
  "period": "2026-10-07 ~ 2026-10-19",
  "coveredWeeks": [
    {
      "slug": "2026-w41",
      "period": "10/7 ~ 10/11"
    },
    {
      "slug": "2026-w42",
      "period": "10/12 ~ 10/18"
    },
    {
      "slug": "2026-w43",
      "period": "10/19"
    }
  ],
  "announceDate": "2026-10-22",
  "nextEditionDate": "2026-11-05",
  "intro": "이번 회차는 10월 7일부터 19일까지 나온 AI 소식 여섯 가지로 시작합니다. GPT-6의 무료 요금제 배포부터 검색 API Exa 3.0, 행정안전부의 「국정ON」까지 짧게 정리했습니다. 이어서 바로 써 볼 수 있는 도구 여섯 가지를 자세히 소개합니다. Claude Code v2.1.287에 들어간 Mods, 개념을 움직이는 기계 그림으로 그려 주는 Anatomy, 브랜드에 맞춰 도해를 그리는 diagram-design, 앱과 바이너리 동작을 에이전트로 분석하는 REA, 모델을 바꾸지 않고 에이전트의 작업 환경을 고치는 Harness², 음성 복제와 더빙을 내 컴퓨터에서 하는 VoiceStudio입니다. 다섯 가지는 MIT·Apache-2.0·AGPL-3.0 라이선스로 공개된 오픈소스이고, Claude Code는 Anthropic의 공식 릴리스입니다.",
  "closing": "소개한 도구는 설치하기 전에 저장소의 사용 조건과 접근 범위를 먼저 확인하시길 권합니다. Mod는 내 권한으로 실행되는 코드이고, 역공학 도구는 분석할 권한이 있는 대상에만, 음성 복제는 허락받은 목소리에만 쓰는 것이 안전합니다. 소식 카드의 성능과 가격은 대부분 각 회사가 밝힌 값이므로, 실제로 맡길 작업으로 먼저 시험해 보시길 권합니다.",
  "editorsPicks": [
    {
      "title": "Claude Code v2.1.287, 플러그인이 동작을 바꾸는 Mods 추가",
      "slug": "claude-code-v2-1-287-mods",
      "deck": "10월 1일(협정 세계시) 공개된 공식 릴리스로, 플러그인이 Claude Code의 동작을 바꾸는 Mods가 추가됐습니다.",
      "subtitle": "공식 릴리스 · 업데이트 후 확인",
      "category": "공식 릴리스 · 코딩 에이전트",
      "sourceUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.287",
      "sourceLabel": "공식 릴리스 노트",
      "guideUrl": "https://code.claude.com/docs/en/plugins/mods/overview",
      "guideLabel": "공식 문서 · Mods 개요",
      "summary": "Anthropic이 공개한 Claude Code v2.1.287은 플러그인이 도구 호출과 화면 같은 Claude Code의 동작을 바꿀 수 있게 하는 Mods를 추가했습니다. 대화를 따로 읽어 놓친 점을 알려 주는 내장 Mod와 권한 확인 관련 수정도 함께 들어 있습니다.",
      "body": "**Mods가 추가되어 플러그인이 Claude Code의 동작을 바꿉니다**\nAnthropic의 v2.1.287 릴리스 노트는 첫 항목으로 Claude Mods 추가를 꼽으며, 플러그인이 더 깊은 동작을 바꿀 수 있게 됐다고 적었습니다. 공식 문서는 Mod를 Claude Code가 도구 호출, 프롬프트 제출, 화면 그리기 같은 이벤트마다 호출하는 JavaScript 또는 TypeScript 핸들러로 이루어진 플러그인이라고 설명합니다. 핸들러는 이벤트를 지켜보거나 바꾸거나 직접 처리할 수 있어서, 컨텍스트 사용량을 보여 주는 창이나 직접 만든 명령을 Claude Code 안에 넣을 수 있습니다. 같은 릴리스에는 내장 Mod인 You should know도 들어 있습니다. 보조 에이전트가 대화를 다시 읽고 놓쳤을 수 있는 점을 프롬프트 위에 짧은 메모로 보여 주는 기능입니다. 이 밖에 홈 디렉터리 같은 곳을 지우는 위험한 `rm` 명령이 `~`나 와일드카드 경로로 출력을 돌리면 항상 확인을 받는 보호 장치를 잃던 문제를 고친 항목 등 많은 수정이 포함됩니다.\n\n**업데이트 후 버전부터 확인합니다**\n네이티브 설치는 백그라운드에서 자동으로 업데이트되며, 바로 적용하려면 `claude update`를 실행합니다. 새로 설치하려면 macOS·Linux·WSL에서 `curl -fsSL https://claude.ai/install.sh | bash`를 실행하고 `claude --version`으로 확인합니다. Homebrew와 WinGet 설치는 자동 업데이트되지 않으므로 `brew upgrade claude-code`(설치한 cask에 따라 `claude-code@latest`) 또는 `winget upgrade Anthropic.ClaudeCode`를 직접 실행해야 합니다. 공식 문서는 Mods가 기본으로 켜져 있고, 터미널에서는 v2.1.287 이상이 필요하며, 데스크톱 앱은 자체 사본을 포함해 v2.1.286부터 동작한다고 안내합니다. Mods는 터미널, 데스크톱 앱의 Code 탭, VS Code 확장에서 쓸 수 있습니다. Claude Code를 쓰려면 Pro, Max, Team, Enterprise 또는 Console 계정이 필요합니다.\n\n**접근 범위: Mod는 내 권한으로 실행되는 코드입니다**\n공식 문서는 Mod를 내 권한으로 실행되는 코드라고 경고하며, 신뢰하는 작성자와 마켓플레이스에서만 설치하라고 안내합니다. 로드된 Mod는 사용자 계정이 접근할 수 있는 파일을 읽고 쓰고, 프로그램을 시작하고, 네트워크 요청을 보낼 수 있습니다. 환경 변수와 설정 파일에 둔 API 키도 읽을 수 있고, 모든 프롬프트와 도구 호출을 볼 수 있으며, 묻기 전에 도구 호출을 승인할 수도 있습니다. Mod는 샌드박스 안에서 실행되지 않고, Mod가 시작한 프로세스는 샌드박스 밖에서 돌아갑니다. 설치 전에는 `claude plugin validate ./some-mod`로 해당 Mod가 처리하는 이벤트와 요청하는 작업을 실행 없이 목록으로 볼 수 있습니다. 내장 Mod인 You should know는 기본으로 꺼져 있으며, 켜면 보조 에이전트가 도구 없이 같은 모델에 별도 요청을 보냅니다. 이 확인 요청은 지금까지의 대화와 도구 결과를 읽으므로 요금제 사용량이나 API 비용에 포함됩니다. 이 저장소의 LICENSE.md는 Anthropic PBC의 모든 권리 보유와 Anthropic 상업 약관 적용을 밝히고 있으므로, 코드를 자유롭게 가져다 쓸 수 있는 조건은 아닙니다.\n\n**실습: 내장 Mod를 켜고 메모의 쓸모와 비용을 기록합니다**\n먼저 `claude --version`으로 2.1.287 이상인지 확인하고, 세션에서 `/plugin`의 Installed 탭에 내장 Mod 목록이 보이는지 봅니다. LLM 게이트웨이나 `apiKeyHelper`로 연결했거나 `DISABLE_TELEMETRY`를 설정한 세션에서는 You should know가 목록에 나타나지 않을 수 있습니다. 목록에 있다면 연습용 저장소에서 여러 단계가 필요한 작업을 맡기고 `/plugin enable cc-plugin-you-should-know@builtin`을 실행합니다. 메모가 몇 번 나왔는지, 실제로 놓친 점을 짚었는지, 사용량이 얼마나 늘었는지를 기록한 뒤 `/plugin disable cc-plugin-you-should-know@builtin`으로 끄고 유지할지 판단합니다. 설치 전 점검을 연습하려면 Anthropic이 공유하는 샘플 Mod를 내려받아 `claude plugin validate`가 출력하는 `hooks:`와 `calls:` 줄을 읽어 보면 됩니다. 공식 문서는 이 샘플이 지원 없이 있는 그대로 공유된다고 밝힙니다.",
      "editorial": "플러그인이 도구 호출과 화면까지 바꿀 수 있게 된 만큼, 설치 전에 무엇을 확인해야 하는지를 함께 봅니다.",
      "tags": [
        "공식 릴리스",
        "확장 기능",
        "실습 제안"
      ],
      "tier": "feature",
      "releaseScope": "Claude Code 사용자 · 공식 릴리스",
      "thumbnail": {
        "src": "/og-cache/ab-20261022-claude-code-v2-1-287-mods-page.png",
        "alt": "GitHub의 Claude Code v2.1.287 릴리스 페이지 What's changed 목록. 첫 줄에 Added Claude Mods 항목이 보입니다.",
        "caption": "Claude Code 공식 릴리스 페이지 화면입니다(2026-10-21 촬영)."
      }
    },
    {
      "title": "Anatomy, 개념을 움직이는 기계로 그려 주는 오픈소스 스킬",
      "slug": "anatomy-isometric-figure-skill",
      "deck": "Claude Code·Codex 등에서 쓰는 MIT 공개 스킬로, 개념을 부품이 움직이는 도해로 만들어 줍니다.",
      "subtitle": "공개 도구 · 명령 한 줄로 설치",
      "category": "공개 도구 · 설명 도해",
      "sourceUrl": "https://github.com/wheresryan22/anatomy",
      "sourceLabel": "공식 저장소",
      "guideUrl": "https://github.com/wheresryan22/anatomy/blob/main/LICENSE",
      "guideLabel": "코드 사용 조건",
      "summary": "설명하려는 개념을 한 줄로 요청하면 그 개념처럼 작동하는 물체를 고안해 포인터와 키보드에 반응하는 도해로 만듭니다. 상자와 화살표 대신 작은 부품 수십 개로 이루어진 기계를 그려서, 읽는 사람이 움직임으로 원리를 이해하게 하는 방식입니다.",
      "body": "**개념을 작동하는 기계로 그려 설명합니다**\nAnatomy는 설명하려는 개념을 실제로 작동하는 물체로 만들어 보여 주는 에이전트 스킬입니다. README에 따르면 개념을 한 줄로 요청하면 Claude가 그 개념과 같은 방식으로 움직이는 물체를 고안합니다. 값이 그대로면 작업을 건너뛰는 캐시 키는 핀이 모두 맞아야 돌아가는 자물쇠가 되는 식입니다. 결과는 음영이 들어간 작은 부품 수십 개로 만든 아이소메트릭 도해이고, 포인터와 키보드에 반응하며, 화면에 나오는 숫자는 부품을 움직이는 같은 모델에서 나옵니다. 기본은 SVG이고, 불꽃이나 물 같은 효과는 WebGL로 더하며, 부품이 깊이 방향으로 도는 3D 모드는 베타입니다.\n\n**설치는 명령 한 줄이고, Node.js 20.10 이상이 필요합니다**\n`npx skills add`에 이 저장소의 경로를 넣고 `-g -a claude-code`를 붙이면 `~/.claude/skills/anatomy`에 설치됩니다. git으로 같은 폴더에 내려받거나 ZIP을 풀어 넣어도 됩니다. 설치 뒤 Claude Code에서 `/anatomy explain how a token bucket rate limiter works, interactive`처럼 요청하면 시작됩니다. README는 API 키가 필요 없고 Node 내장 모듈만 쓰므로 `npm install`도 필요 없다고 밝히며, 요구 사항으로 Node.js 20.10 이상과 점검용 Chrome 또는 Chromium을 듭니다. 또한 설치 CLI가 예제를 포함한 저장소 전체(약 10MB)를 복사하고, 1.7.1 버전은 Node 22.20 이상을 요구한다고 안내합니다.\n\n**접근 범위: 내 스킬 폴더와 프로젝트 파일, 점검용 브라우저입니다**\n스킬은 지시문과 Node 스크립트로 이루어져 있고 API 키를 요구하지 않습니다. 설치 위치는 사용자 스킬 폴더이거나 프로젝트 폴더이며, 만들어진 도해는 직접 소유하는 소스 파일로 남습니다. 스킬은 자체 점검을 위해 헤드리스 Chrome을 시작하는데, 임시 프로필을 쓰고 로컬 포트로 통신한다고 README가 설명합니다. Codex 샌드박스에서는 이 점검이 막힐 수 있어 명령별 승인이 필요할 수 있습니다. 도해를 커뮤니티 갤러리에 게시하는 기능은 사용자가 게시를 요청하면 시작되며, 에이전트가 보낼 내용을 보여 주고 확인을 받은 뒤 풀 리퀘스트를 연다고 합니다. 스킬 저장소는 MIT 라이선스로 공개돼 있습니다.\n\n**실습: 개념 하나로 첫 도해를 만들고 초안으로 다듬습니다**\n가르치거나 문서로 설명해야 하는 개념 하나를 고르고, 실제 숫자를 넣어 요청합니다. README의 예시는 `/anatomy an isometric SVG explaining how a CDN edge cache works, cache hit vs miss, TTL of 60 s, for a dark landing page. Just the SVG file and a PNG preview.`입니다. README는 그리는 방식이 아니라 개념을 말하고, 실제 숫자를 주고, 결과물이 놓일 곳을 알리라고 권합니다. 사이트는 첫 도해를 초안으로 보고, 어색한 부분을 말해 다시 요청하라고 안내합니다. 화면의 숫자가 요청한 값과 맞는지, 키보드로도 조작되는지, 물체의 움직임이 개념과 대응되는지를 확인합니다. 도해 하나에 긴 작업 시간이 들며, 사이트는 시계 장치가 Claude의 작업 시간으로 1시간 54분 걸렸다고 적습니다. 축과 데이터 계열이 있는 차트에는 맞지 않는다고 README가 밝힙니다.",
      "editorial": "상자와 화살표로 그리던 설명 그림을 작동하는 물체로 바꾸는 접근과, 그 작업에 드는 시간을 함께 봅니다.",
      "tags": [
        "공개 도구",
        "MIT",
        "스킬",
        "실습 제안"
      ],
      "tier": "feature",
      "releaseScope": "MIT 오픈소스 · 에이전트 스킬",
      "thumbnail": {
        "src": "/og-cache/ab-20261022-anatomy-isometric-figure-skill-page.png",
        "alt": "Anatomy 저장소 README 첫 부분. 스킬 소개 문장과 배지, 로켓 엔진을 등각 투상으로 그린 예시 도해가 보입니다.",
        "caption": "Anatomy 저장소 README 화면입니다(2026-10-21 촬영)."
      }
    },
    {
      "title": "diagram-design, 브랜드에 맞춰 도해를 그리는 오픈소스 스킬",
      "slug": "diagram-design-editorial-diagrams",
      "deck": "Claude Code·Codex·Cursor 등에서 쓰는 MIT 공개 스킬로, 도해를 HTML 한 파일로 만들어 줍니다.",
      "subtitle": "공개 도구 · 바로 설치",
      "category": "공개 도구 · 다이어그램",
      "sourceUrl": "https://github.com/cathrynlavery/diagram-design",
      "sourceLabel": "공식 저장소",
      "guideUrl": "https://github.com/cathrynlavery/diagram-design/blob/main/LICENSE",
      "guideLabel": "코드 사용 조건",
      "summary": "에이전트에게 말로 요청하면 도해 유형을 고르고 계획을 밝힌 뒤, 더블클릭으로 열 수 있는 HTML 파일 하나를 만듭니다. 사이트 주소를 알려 주면 색과 글꼴을 가져와 이후 모든 도해에 적용합니다.",
      "body": "**말로 요청하면 유형을 골라 HTML 한 파일로 그립니다**\ndiagram-design은 도해를 인라인 SVG가 든 HTML 파일 하나로 그리는 에이전트 스킬입니다. README는 아키텍처, 시퀀스, ER, 간트, 워들리 맵 등 수십 가지 유형을 지원하고, 유형마다 밝은 최소형, 어두운 최소형, 요약 카드가 붙는 편집형의 세 가지 정적 변형이 있다고 소개합니다. 이 정적 변형에는 빌드 단계, 자바스크립트, 외부 이미지 의존성이 없다고 합니다. 디자인 규칙은 강조색 하나, 1px 헤어라인, 그림자 없음, 모든 좌표 4px 격자입니다. 기존 draw.io, Mermaid, Excalidraw 파일을 같은 디자인으로 다시 그리는 가져오기와 SVG·PNG 내보내기도 제공합니다.\n\n**설치는 명령 한 줄이고, Claude Code는 플러그인으로도 설치합니다**\nCursor, Claude Code, Codex 등 Agent Skills를 읽는 도구에서는 `npx skills add`에 이 저장소의 경로를 넣어 설치합니다. Claude Code에서는 `/plugin marketplace add`에 같은 경로를 넣고 `/plugin install diagram-design@diagram-design`을 실행하면 업데이트와 슬래시 명령을 받을 수 있습니다. README는 공식 빌드가 이 저장소에서만 나오고 다른 이름의 목록은 비공식 복사본이라고 밝힙니다. 설치 뒤에는 '앱의 프런트엔드, 백엔드, 데이터베이스, Redis 캐시로 아키텍처 도해를 만들어 줘'처럼 평소 말로 요청하면 됩니다. 에이전트가 유형과 계획을 밝힌 뒤 더블클릭으로 열 수 있는 `.html` 파일 하나를 씁니다.\n\n**접근 범위: 기본 네트워크 요청은 글꼴 하나뿐입니다**\n개인정보 처리방침은 이 스킬에 서버, 계정, 분석, 원격 측정이 없고 제작사가 데이터를 받지 않는다고 밝힙니다. 프롬프트와 파일은 사용 중인 에이전트의 제공사가 자체 정책에 따라 처리합니다. 생성된 도해 파일은 기본으로 Google Fonts에서 글꼴을 불러오며 이것이 유일한 네트워크 요청이고, 시스템 글꼴을 요청하면 네트워크 요청이 없습니다. 브랜드 온보딩을 요청하면 에이전트가 지정한 사이트의 페이지 몇 개를 가져오고, 색과 글꼴을 `references/style-guide.md`에 쓰기 전에 변경 내용을 보여 줍니다. 저장한 프로필은 `~/.diagram-design/profiles/`에 남습니다. PNG 내보내기에는 Playwright와 Chromium 설치가 따로 필요합니다. 라이선스는 MIT입니다.\n\n**실습: 내 사이트 색으로 도해 하나를 만들어 확인합니다**\n'diagram-design을 이 사이트에 온보딩해 줘'라는 요청과 함께 본인이 운영하는 사이트 주소를 알려 주고, 에이전트가 제안하는 색과 글꼴 변경 내용을 확인한 뒤 적용합니다. 이어서 지금 쓰는 문서 속 구조 설명 하나를 도해로 요청합니다. 만들어진 파일이 더블클릭으로 열리는지, 사이트의 색이 반영됐는지, 네트워크 요청이 글꼴뿐인지를 확인합니다. README는 Git에서 매 스프린트 바뀌는 문서에는 Mermaid가 더 맞고 이 스킬은 공개할 도해에 맞는다고 스스로 밝히므로, 자신의 문서가 어느 쪽인지도 이때 판단합니다. 같은 프롬프트라도 결과 배치가 달라질 수 있다는 점도 README에 적혀 있습니다.",
      "editorial": "도해의 취향을 규칙으로 적어 에이전트에게 넘기는 방식이 실제 문서 작업에 맞는지 봅니다.",
      "tags": [
        "공개 도구",
        "MIT",
        "스킬",
        "실습 제안"
      ],
      "tier": "feature",
      "thumbnail": {
        "src": "/og-cache/ab-20261022-diagram-design-editorial-diagrams.webp",
        "alt": "어두운 바탕에 'Same content. Redrawn.' 제목 아래, 왼쪽에는 스킬 없이 만든 흐름도(FIG. 02A · FIRST PASS · NO SKILL), 오른쪽에는 같은 내용을 스킬로 다시 그린 도해(FIG. 02B · REDRAWN WITH THE SKILL)가 놓인 비교 화면",
        "caption": "diagram-design 저장소 README 맨 위 시연 이미지의 전후 비교 장면입니다."
      },
      "releaseScope": "MIT 오픈소스 · 에이전트 스킬"
    },
    {
      "title": "REA, 앱과 바이너리 동작을 에이전트로 분석하는 오픈소스 도구",
      "slug": "rea-reverse-engineer-agents",
      "deck": "바이너리·JavaScript 앱·웹사이트 분석을 에이전트에 연결하는 MIT 공개 MCP 도구입니다.",
      "subtitle": "공개 도구 · 승인 후 설치",
      "category": "공개 도구 · 코드 분석",
      "sourceUrl": "https://github.com/morluto/rea",
      "sourceLabel": "공식 저장소",
      "guideUrl": "https://github.com/morluto/rea/blob/main/LICENSE",
      "guideLabel": "코드 사용 조건",
      "summary": "분석할 앱이나 바이너리를 에이전트에 맡기면 어느 코드가 동작을 만드는지 근거와 함께 돌려주는 MCP 도구입니다. 분석은 내 컴퓨터에서 실행되며, 결과에는 각 결론의 근거와 한계가 함께 담깁니다.",
      "body": "**앱의 동작을 근거와 함께 추적합니다**\nREA는 에이전트가 MCP로 호출하는 분석 도구 모음입니다. README는 네이티브 바이너리, JavaScript·Electron 앱, .NET 어셈블리, 웹사이트를 살펴볼 수 있고 같은 도구를 터미널에서도 쓸 수 있다고 소개합니다. 네이티브 분석은 이미 설치된 Hopper, Ghidra, IDA를 사용할 수 있고 설정 과정에서 승인 후 Hopper를 설치할 수도 있습니다. 정적 JavaScript 분석에는 별도 분석 엔진이 필요 없습니다. 에이전트는 REA가 돌려준 의사코드, 어셈블리, 모듈 관계 같은 결과를 바탕으로 동작을 설명하거나 구현을 작성하고 시험합니다. 사례로는 Electron 앱의 클립보드 연동을 렌더러에서 메인 프로세스까지 따라간 분석이 소개돼 있습니다.\n\n**설치는 승인 단계를 거치고, Node.js가 필요합니다**\n`npx rea-agents setup`을 실행하면 연결할 에이전트를 고르고, 바뀔 경로와 내용을 검토한 뒤 승인하는 순서로 진행됩니다. Claude Code, Codex, Cursor, Gemini CLI 등을 지원하며 설정 뒤에는 에이전트를 다시 시작합니다. 요구 사항은 Node.js 22.x(22.19 이상), 24.x(24.11 이상) 또는 26 이상과 npm입니다. 터미널에서 쓰려면 `npm install --global rea-agents`로 설치한 뒤 `rea --help`를 실행하고, 최신으로 올릴 때는 `rea update`를 씁니다. README는 공식 배포처를 GitHub 저장소, rea.tools, npm 패키지 rea-agents로 안내하며, 비슷한 이름의 저장소나 복사한 README는 공식임을 보증하지 않는다고 경고합니다.\n\n**접근 범위: 에이전트 설정, 분석 대상, 실행 권한을 확인합니다**\nREADME는 REA가 합법적인 연구, 교육, 상호 운용성, 소프트웨어 보존, 그리고 본인이 소유했거나 분석할 권한이 있는 소프트웨어의 분석을 위한 도구라고 밝힙니다. 설정은 Claude Code의 경우 `~/.claude.json`에 `mcpServers.rea`를 쓰고 `~/.claude/skills`에 REA 스킬을 설치하므로, Claude Code가 여는 모든 프로젝트에서 REA를 호출할 수 있게 됩니다. 기존 설정은 보존하고 백업을 만들며, 적용 전에 승인을 요청하고 어느 단계에서든 취소할 수 있습니다. Hopper 설치는 별도 승인입니다. 분석은 로컬에서 이루어지고 에이전트가 도구 결과를 받으며, 그 모델 제공사의 데이터 정책이 따로 적용됩니다. 정적 JavaScript·.NET 검사는 대상을 실행하지 않고 파일을 읽지만, 런타임 캡처는 선택한 대상을 사용자 권한으로 실행하거나 상호작용합니다. 별도의 책임 있는 사용 문서는 대상을 살펴볼 권한이 실행, 가로채기, 기기 변경의 권한까지 반드시 포함하지는 않는다고 설명합니다. IDA Pro, Hopper, JEB 같은 상용 도구는 사용자가 합법적으로 입수해야 하며 REA는 라이선스나 키를 제공하지 않습니다.\n\n**실습: 내가 만든 앱 하나로 근거가 붙는 분석을 확인합니다**\n분석 권한이 분명한 대상, 예를 들어 직접 만든 Electron 앱 폴더를 정합니다. 압축을 푼 앱 폴더에 `npx -y rea-agents@latest analyze-javascript-application /앱/절대/경로 --json`을 실행하면 모듈, 임포트, Electron 경계와 그 근거가 나온다고 README가 설명합니다. 이어서 에이전트에게 '검색이 어떻게 동작하는지 근거와 함께 설명해 줘'라고 묻고, 답변의 각 주장에 파일과 위치 근거가 붙어 있는지, 알 수 없는 부분이 따로 표시되는지 확인합니다. 분석 결과는 불완전하거나 틀릴 수 있다고 별도 문서가 밝히므로, 중요한 결론은 근거를 직접 열어 확인합니다.",
      "editorial": "에이전트가 소스 없이 앱의 동작을 설명할 때 근거를 어디까지 붙여 주는지, 분석 권한의 경계와 함께 봅니다.",
      "tags": [
        "공개 도구",
        "MIT",
        "분석 권한",
        "실습 제안"
      ],
      "tier": "feature",
      "thumbnail": {
        "src": "/og-cache/ab-20261022-rea-reverse-engineer-agents.png",
        "alt": "왼쪽에 REA 로고와 'Reverse Engineer Anything', 'One CLI + MCP server for agents', 'From binaries to websites' 문구가 있고, 오른쪽에 rea analyze 명령의 디스어셈블 결과, check_auth 함수 디컴파일 결과, 16진수 덤프, 에이전트 작업 흐름 도식이 배치된 소개 이미지",
        "caption": "REA 저장소에 등록된 소개 이미지입니다."
      },
      "releaseScope": "MIT 오픈소스 · MCP 도구"
    },
    {
      "title": "Harness², 모델을 바꾸지 않고 에이전트 작업 환경을 고치는 오픈소스",
      "slug": "harness2-self-improving-agent-harness",
      "deck": "에이전트를 둘러싼 프롬프트·도구·메모리·스킬을 과제마다 고치는 Apache-2.0 연구용 프레임워크입니다.",
      "subtitle": "공개 도구 · 연구용 프레임워크",
      "category": "공개 도구 · 에이전트 연구",
      "sourceUrl": "https://github.com/google-research/harness2",
      "sourceLabel": "공식 저장소",
      "guideUrl": "https://github.com/google-research/harness2/blob/main/LICENSE",
      "guideLabel": "코드 사용 조건",
      "summary": "모델 가중치는 그대로 두고, 에이전트를 둘러싼 프롬프트·도구·메모리·스킬 같은 하네스를 과제마다 고친 뒤 그 경험을 다음 과제로 넘기는 연구용 오픈소스입니다. 로컬 데모는 모델 인증 정보 없이 실행되며, 벤치마크 향상 폭은 저자들이 직접 잰 결과입니다. Google의 공식 지원 제품은 아닙니다.",
      "body": "**모델 가중치는 그대로 두고, 에이전트의 하네스를 과제마다 다듬습니다**\nREADME는 하네스를 모델이 에이전트로 일하게 해 주는 주변 시스템으로 정의합니다. 프롬프트, 도구, 메모리, 스킬, 오케스트레이션 등이 여기에 들어가며, 이 시스템을 최적화하는 일을 하네싱이라고 부릅니다. Harness²는 하네스를 설계할 때 보지 못한 과제를 만나는 환경을 겨냥하고, 모델 가중치를 바꾸지 않은 채 두 단계의 재귀를 연결합니다. 과제 단계 재귀는 수정안을 제안하고 같은 과제에서 실행해 효과를 시험한 뒤, 실행 사이의 행동 차이를 근거로 하네스를 다시 조합합니다. README는 이 과정에 정답 피드백이 필요 없다고 설명합니다. 하네싱 단계 재귀는 과제마다 채택한 하네스와 근거가 있는 교훈을 개선용 하네스에 쌓아 다음 과제의 개선에 씁니다. 고칠 수 있는 구성 요소는 시스템 프롬프트, 가드레일, 메모리, 도구 안내, 서브에이전트, 스킬, 스크립트, 플러그인의 여덟 가지이고, 실행기는 기본값인 OpenCode와 선택 항목인 Codex를 지원합니다. README는 세 가지 전문 업무 벤치마크와 네 가지 모델·하네스 조합에서 개선 단계 한 번으로 GLM-5와 Gemini 3.5 Flash가 기본 하네스보다 나아졌다고 밝힙니다. 향상 폭은 WorkBuddy-Bench 최대 11.5점, JobBench 최대 4.5점, LAB 부분 통과율 최대 11.8퍼센트포인트입니다. 이 수치는 저자들이 직접 잰 결과입니다. README가 연결한 논문(arXiv 2610.14224, 2026년 10월 9일 제출)에 적힌 저자 소속은 Google Cloud AI Research와 Northwestern University입니다.\n\n**로컬 데모는 모델 없이 돌고, 벤치마크 실행에는 Google Cloud 설정이 필요합니다**\nREADME는 Linux, Python 3.12, uv를 요구합니다. 설정 문서에 따르면 파이썬 패키지는 3.13도 지원합니다. 저장소 루트에서 `uv venv --python 3.12 .venv`로 가상 환경을 만들고 `source .venv/bin/activate`로 활성화한 뒤, `uv pip install -e '.[render]'`로 설치하고 `harness2-demo --output runs/demo --k 2`를 실행합니다. 이 로컬 데모는 정해진 규칙으로 움직이는 편집기와 실제 파이썬 실행으로 두 재귀 방식을 모두 돌리며, 모델 인증 정보가 필요 없습니다. 실제 모델로 벤치마크를 돌리려면 Node.js 20 이상, Google Cloud CLI, 벤치마크별 의존성이 더 필요합니다. LAB은 Pandoc과 Poppler, WorkBuddy-Bench는 Docker를 씁니다. 설정 예시는 `.env`에 Vertex AI 프로젝트와 모델 ID를 적고 `gcloud auth application-default login`으로 인증하는 방식입니다. 설정 문서는 기본 구성이 Vertex의 Gemini를 실행·채점 모델로 쓰며, 계정이 설정한 각 모델에 접근할 수 있어야 한다고 밝힙니다. 모델을 쓰는 실행에는 API 비용이 들고, README는 작은 과제 선택부터 시작하라고 안내합니다. `harness2`에 `--dry-run`을 붙이면 모델을 호출하지 않고 선택될 과제만 미리 볼 수 있고, `harness2-check`는 모델 호출 없이 의존성, 인증, 설정을 확인합니다. 실험 문서에 따르면 LAB 전체는 1,143개 과제이며, `--max-tasks`는 실행 전체가 아니라 도메인별 상한입니다.\n\n**접근 범위: 실행기는 네트워크 제한 없이 돌고, Codex는 샌드박스를 끈 채 실행됩니다**\nREADME는 실행기의 네트워크 접근이 제한되지 않고 Codex가 샌드박스를 끈 채 실행된다고 밝힙니다. 공개 벤치마크의 채점 기준이 온라인에 있을 수 있으므로, 평가 전에 네트워크 제한을 설정하라고 안내합니다. 실험 문서는 이번 공개본을 검증하던 중 JobBench 과제에서 Codex 실행이 지시 없이 해당 과제의 채점 기준표를 내려받은 사례가 있었다고 적습니다. 그래서 설치를 마친 뒤 실행기에서 huggingface.co, hf.co, *.hf.co, github.com, raw.githubusercontent.com을 차단하고, 도구 설정이 아니라 송신 방화벽이나 DNS 정책처럼 네트워크 단에서 제한하라고 설명합니다. 설치 단계 자체는 의존성과 데이터를 내려받는 데 이 호스트들이 필요하므로, 제한은 설치 뒤에 적용합니다. 설치 단계는 GitHub, npm 레지스트리, Hugging Face, Docker 레지스트리 등에서 의존성과 데이터를 내려받습니다. WorkBuddy-Bench에서 Codex 실행기용 브리지를 `--host 0.0.0.0`으로 열면 모든 네트워크 인터페이스에서 요청을 받게 되므로, 접근할 클라이언트를 제한해야 한다고 설정 문서는 안내합니다. 결과는 `runs/` 아래에 과제 요약, 산출물, 채택된 하네스, 회고 기록, 평가 결과로 저장되며, 같은 명령을 다시 실행하면 이어서 진행합니다. 코드는 Apache 2.0 라이선스이고, `third_party/`의 코드와 벤치마크, 데이터셋은 각자의 원래 라이선스를 따릅니다. 벤치마크 문서는 WorkBuddy-Bench의 원 라이선스에 지역 제한이 있으니 내려받기 전에 확인하라고 안내합니다. README는 이 프로젝트가 Google의 공식 지원 제품이 아니며, Google 오픈소스 소프트웨어 취약점 보상 프로그램의 대상도 아니라고 밝힙니다.\n\n**실습: 로컬 데모로 두 재귀 방식이 남기는 기록을 확인합니다**\nLinux 환경에서 저장소를 내려받고, Install 절의 명령으로 가상 환경과 패키지를 설치한 뒤 `harness2-demo --output runs/demo --k 2`를 실행합니다. 모델 인증 정보 없이 두 재귀 방식이 실제로 돌아갑니다. 실행이 끝나면 터미널에 완료한 과제 수, 실패한 과제 수, 보고 파일 경로가 표시되므로 이 세 가지를 기록합니다. 이어서 `runs/demo/demo.json`과 `runs/demo/library/k2` 폴더를 열어, 과제가 끝날 때마다 어떤 하네스와 교훈이 다음 과제를 위해 남는지 확인합니다. `--k` 값을 바꿔 다시 실행할 때는 출력 폴더를 따로 두면 결과를 비교하기 쉽습니다. 모델을 쓰는 벤치마크는 설치를 마친 뒤 실행기의 네트워크 제한을 설정하고, `--dry-run`으로 과제 선택을 확인한 뒤 과제 하나로 시작합니다.",
      "releaseScope": "Apache-2.0 · Google 공식 지원 제품 아님",
      "tags": [
        "공개 도구",
        "Apache-2.0",
        "에이전트 하네스",
        "실습 제안"
      ],
      "tier": "feature",
      "thumbnail": {
        "src": "/og-cache/ab-20261022-harness2-self-improving-agent-harness-page.png",
        "alt": "Harness² 저장소 README 첫 부분. Recursive Agent Harnessing for an Open World 부제와 하네스의 정의, 두 단계 재귀 설명이 보입니다.",
        "caption": "Harness² 저장소 README 화면입니다(2026-10-21 촬영)."
      }
    },
    {
      "title": "VoiceStudio, 음성 복제와 더빙을 내 컴퓨터에서 하는 오픈소스",
      "slug": "voicestudio-local-voice-studio",
      "deck": "음성 복제부터 영상 더빙과 받아쓰기까지 내 컴퓨터에서 실행하는 AGPL-3.0 공개 데스크톱 앱입니다.",
      "subtitle": "공개 도구 · 동의한 목소리만",
      "category": "공개 도구 · 음성 생성",
      "sourceUrl": "https://github.com/debpalash/VoiceStudio",
      "sourceLabel": "공식 저장소",
      "guideUrl": "https://github.com/debpalash/VoiceStudio/blob/main/LICENSE",
      "guideLabel": "코드 사용 조건",
      "summary": "음성 복제, 음성 디자인, 영상 더빙, 받아쓰기를 내 컴퓨터에서 실행하는 데스크톱 앱입니다. 앱 코드는 AGPL-3.0이지만 모델 가중치와 목소리의 조건은 별개이며, README는 허락을 받은 목소리만 복제하라고 밝힙니다.",
      "body": "**음성 작업을 내 컴퓨터에서 처리합니다**\nVoiceStudio는 음성 복제, 음성 디자인, 영상 더빙, 받아쓰기, 음성 전사, 오디오북 제작을 한곳에서 다루는 데스크톱 앱입니다. 저장소 소개는 VoiceStudio를 완전히 로컬에서 동작하는 ElevenLabs 대안이라고 부르고 646개 언어를 지원한다고 밝히지만, 두 가지 모두 프로젝트 자체의 주장입니다. README는 로컬 작업이 사용자의 하드웨어에서 실행되고 원격 서비스는 선택 사항이며, 사용 통계는 동의가 있어야 수집한다고 설명합니다. 기본 엔진은 k2-fsa/OmniVoice 기반이고 다른 엔진을 고를 수 있습니다. 기능 표는 시간에 맞춘 영상 더빙, 오디오북과 일괄 작업, 에이전트용 로컬 API와 MCP, 다시 쓸 수 있는 작업 레시피와 감시 폴더를 함께 소개합니다.\n\n**설치는 명령 한 줄이나 설치 파일로 하고, 사양을 먼저 확인합니다**\nmacOS와 Linux는 README의 설치 명령 `curl -fsSL https://voicestudio.sh/install | sh`로, Windows는 PowerShell에서 `irm https://voicestudio.sh/install | iex`로 설치합니다. 명령 대신 Releases에서 macOS .dmg, Windows .exe, Linux .AppImage 또는 .deb 파일을 받아도 됩니다. README에 따르면 설치 명령은 기존 설정, 프로젝트, 모델을 보존합니다. 설치 문서에 따르면 macOS·Linux용 셸 설치 스크립트는 내려받은 패키지를 해당 릴리스의 SHA256SUMS.txt와 대조해, 일치하지 않으면 설치를 멈춥니다. 하드웨어 표에 따르면 NVIDIA GPU(Windows·Linux)는 CUDA, Apple Silicon은 Metal(MPS) 가속을 씁니다. 전용 GPU가 없는 컴퓨터도 CPU로 쓸 수 있지만 느리며, README는 이때 설정 과정이 작은 CPU용 PyTorch를 설치하고 약 5GB의 여유 공간이 필요하다고 적습니다. Windows on ARM은 검증 전 실험 단계이고, Intel Mac은 앱 화면만 쓰며 다른 컴퓨터의 백엔드에 연결해야 합니다. macOS 설치 문서는 Apple Silicon에서 macOS 13.3 이상과 약 10GB의 여유 공간을 요구합니다. Claude Code나 Codex 같은 코딩 에이전트에 README의 요청문을 붙여 넣어 설치를 맡길 수도 있으며, 에이전트용 안내서는 모델을 내려받기 전에 크기와 라이선스를 알리고 동의를 받도록 정합니다.\n\n**접근 범위: 라이선스, 모델 조건, 목소리 동의, 네트워크를 따로 확인합니다**\nREADME는 AGPL-3.0이 앱에 적용되며 그 조건 안에서 상업적 사용도 포함한다고 밝힙니다. AGPL-3.0에서는 프로그램을 고쳐 네트워크 서비스로 제공하면, 그 서비스 사용자에게 고친 버전의 소스 코드를 제공해야 합니다. 모델 가중치, 토크나이저, 목소리, 생성 결과물의 조건은 앱 라이선스와 별개이며, 유료 앱 라이선스도 그 권리를 주지 않는다고 README는 설명합니다. 라이선스 안내 문서(LICENSE-NOTICE.md)는 기본 OmniVoice 모델 카드가 사전 학습 가중치를 CC-BY-NC로 표시한다고 적고 있으므로, 상업적으로 쓰기 전에 모델 조건을 따로 확인해야 합니다. README의 책임 있는 사용 문장은 'Clone voices only with permission', 즉 허락을 받은 목소리만 복제하라는 것입니다. 이 카드는 본인 목소리나 주인이 동의한 목소리만 복제하는 것을 기준으로 삼습니다. LICENSE-NOTICE.md는 선택형 검토 기능도 목소리 동의를 확인하지 않는다고 밝힙니다. 모델 관리자의 선택형 검토 기능도 상업적 사용 허가를 보증하지 않는다고 README는 밝힙니다. MCP 서버는 실행 중인 백엔드의 `http://localhost:3900/mcp/`에 열리며, MCP 문서는 MCP 연결 자체에 인증이 없으므로 공개 인터넷에 노출하지 말고 신뢰할 수 있는 네트워크나 TLS 뒤에서만 쓰라고 안내합니다. 개인정보 설정에는 AudioSeal을 쓸 수 있을 때 생성 음성에 보이지 않는 워터마크를 넣는 항목이 나타나지만, 워터마크 모델을 불러오지 못하면 워터마크 없이 생성이 계속된다고 개인정보 문서는 밝힙니다. macOS 설치 스크립트는 앱의 격리 표시(com.apple.quarantine)를 지우고, 서명 검사에 실패하면 임시(ad hoc) 서명을 다시 적용하며 유효하거나 공증된 서명은 건드리지 않는다고 설치 문서는 설명합니다.\n\n**실습: 데모 목소리와 내 목소리로 같은 문장을 생성합니다**\n먼저 앱에 함께 들어 있는 데모 목소리로 짧은 문장 하나를 생성해 설치가 정상인지 확인합니다. 이어서 Voice cloning을 열고 조용한 곳에서 본인 목소리를 깨끗하게 녹음해 참고 녹음으로 넣은 뒤, 같은 문장을 생성합니다. 필요한 모델은 안내가 뜰 때 설치하고, 내려받기 전에 모델 관리자에 표시되는 출처 안내를 확인합니다. 성능 문서는 설정의 Performance 화면에서 실제 연산 장치(cuda·mps·cpu)를 확인할 수 있고, 재시작 뒤 첫 생성은 항상 가장 느리므로 두 번째 생성부터 속도를 판단하라고 안내합니다. 실제 연산 장치, 두 번째 생성에 걸린 시간, 결과 음성이 원래 목소리와 얼마나 비슷한지를 적어 둡니다.",
      "editorial": "로컬 음성 생성이 내 컴퓨터 사양에서 어느 속도로 동작하는지, 목소리 동의와 모델 조건의 경계와 함께 봅니다.",
      "releaseScope": "AGPL-3.0 · 모델 가중치는 별도 조건",
      "tags": [
        "공개 도구",
        "AGPL-3.0",
        "음성 복제 동의",
        "실습 제안"
      ],
      "tier": "feature",
      "thumbnail": {
        "src": "/og-cache/ab-20261022-voicestudio-local-voice-studio.png",
        "alt": "VoiceStudio 앱 첫 화면. 'Make voices that sound like you.' 제목 아래 Voice Clone, Voice Design, Video Dubbing, Stories, Audiobook, Voice Gallery, Transcripts 기능 카드가 배치되어 있습니다.",
        "caption": "VoiceStudio 저장소에 등록된 공유 이미지입니다."
      }
    }
  ],
  "demoCards": [
    {
      "title": "TermWeave, 에이전트 터미널을 한 화면에서 나눠 쓰는 오픈소스",
      "slug": "termweave-terminal-workspace",
      "deck": "herdr가 실행하는 셸과 에이전트를 작업 공간별 분할 화면으로 보여 주는 MIT 공개 웹·맥 클라이언트입니다.",
      "subtitle": "발표자가 직접 만든 도구 · MIT",
      "category": "직접 만든 도구 · 에이전트 터미널",
      "url": "https://github.com/VoidLight00/termweave",
      "label": "GitHub 저장소 열기",
      "summary": "여러 코딩 에이전트의 터미널을 작업 공간마다 나눠 띄우고, 번호와 에이전트 아이콘으로 구분하며, 입력을 기다리는 터미널을 한 목록에서 찾게 해 주는 웹·맥 클라이언트입니다. 터미널은 별도로 설치한 herdr가 실행하고, TermWeave는 그 화면을 기본 설정에서는 이 PC 안의 브라우저나 맥 앱에 그립니다.",
      "body": "**작업 공간마다 터미널을 나눠 보는 클라이언트입니다**\nTermWeave는 herdr를 위한 cmux 스타일 웹·맥 클라이언트입니다. 모든 셸과 에이전트는 herdr가 실행하고, TermWeave는 herdr의 소켓을 읽어 브라우저 탭이나 맥 앱에 그립니다. 그래서 브라우저를 닫거나 TermWeave를 다시 시작해도 터미널은 계속 실행됩니다. 작업 공간마다 분할 배치를 따로 기억하며 나누기, 끌어 옮기기, 크기 조절, 확대를 지원합니다. 모든 터미널에는 P3 같은 전역 번호와 실행 중인 에이전트 아이콘이 붙습니다. 입력을 기다리는 터미널은 Needs you 목록에 모이고, 데스크톱이나 휴대폰에서 터미널 또는 채팅으로 답할 수 있습니다. WebKit에서는 macOS 한국어 입력기가 음절을 제자리에서 고쳐 쓰기 때문에 xterm만으로는 글자가 빠집니다. TermWeave는 입력 변화를 하나씩 다시 보내 한글과 띄어쓰기가 그대로 들어가게 합니다. README는 실제 macOS 한국어 입력기로 키 간격 60·25·12ms에서 입력한 9개 문장이 모두 셸에 정확히 들어갔다고 기록하며, 이는 프로젝트 자체 검증입니다.\n\n**설치 전에 herdr를 따로 준비합니다**\n요구 사항은 macOS 또는 Linux, Bun 1.4.2, Node 18 이상, 그리고 별도로 설치한 herdr입니다. TermWeave는 herdr를 함께 설치하거나 업데이트하지 않습니다. 검증은 macOS의 herdr 0.9.1로 진행했고, Linux와 Windows는 아직 검증하지 않았습니다. README의 빠른 시작은 일반 셸에서 세 단계로 진행합니다. `sh install.sh --check`로 빠진 준비물을 점검하고, 설치 명령으로 로컬 소스를 빌드한 뒤, 설치된 서버 스크립트를 `bun`으로 시작합니다. 서버가 출력하는 이 PC 안의 주소를 브라우저로 엽니다. README 표기는 0.3.0이며, 2026년 10월 21일 기준 최신 릴리스는 v0.3.22입니다.\n\n**접근 범위: 기본은 이 PC 안에서만 열립니다**\n로컬 Bun 서버가 herdr 소켓과 통신하며 터미널 화면을 전달합니다. 이 PC 안의 접속은 신뢰하고, 토큰을 설정하면 모든 접속에 토큰을 요구합니다. 원격 접속은 직접 설정하기 전까지 꺼져 있으며, README는 원격 접속을 켜기 전에 SECURITY.md를 먼저 읽도록 안내합니다. 원격 접속, 안드로이드 동반 앱, OpenRig 팀 패널은 선택 기능이고 기본으로 꺼져 있습니다. herdr-web-ui(MIT)에서 출발한 독립 프로젝트이며 herdr, cmux, Anthropic, OpenAI, Google과 제휴 관계가 없습니다. 에이전트 아이콘은 어느 프로그램이 실행 중인지 표시할 뿐입니다. 실제 휴대폰 입력기, iOS Safari, 보조 기술은 아직 사람이 직접 확인해야 합니다. 외부 CI 배지는 아직 없습니다. 타입 검사와 단위 테스트는 내보내기 전에 로컬에서 실행하고, GitHub Actions에서도 Ubuntu와 macOS로 실행합니다.\n\n**실습: 에이전트 두 개를 한 작업 공간에 띄워 봅니다**\nherdr를 설치한 뒤, README의 사용 예시처럼 Claude Code와 Codex, 테스트 실행 창을 한 작업 공간에 둡니다. PC 옆의 +로 폴더를 먼저 골라 폴더 세션을 만들고, 터미널을 나란히 나눕니다. 에이전트 아이콘과 P 번호로 각 터미널을 구분할 수 있는지, 입력을 기다리는 터미널이 Needs you 목록에 언제 올라오는지 확인합니다. 화면을 공유하거나 녹화할 때 TERMWEAVE_MACHINE_NAME을 설정하면 사이드바에 중립적인 PC 이름이 표시됩니다. 어느 터미널이 언제 입력을 기다렸는지 기록해 두면, 이 도구가 내 작업에 필요한지 판단하기 쉽습니다.",
      "tags": [
        "직접 만든 도구",
        "MIT",
        "에이전트 터미널",
        "한글 입력"
      ],
      "thumbnail": {
        "src": "/og-cache/ab-20261022-termweave-terminal-workspace.png",
        "alt": "TermWeave 앱 화면. 왼쪽에 작업 공간과 번호가 붙은 터미널 목록, 오른쪽에 Claude·Codex 터미널 세 개가 나뉘어 열려 있습니다. 예시 프로젝트로 만든 데모 세션입니다.",
        "caption": "TermWeave 저장소 README의 첫 이미지입니다."
      }
    }
  ],
  "demoSection": {
    "kicker": "Made by the speaker",
    "title": "발표자가 직접 만든 도구",
    "navLabel": {
      "ko": "발표자 도구",
      "en": "Speaker's tool"
    }
  },
  "highlights": [
    {
      "rank": 1,
      "tier": "hero",
      "post": {
        "date": "10/7",
        "platform": "Web",
        "title": "OpenAI, ChatGPT에 GPT-6 모델과 Intelligent UI 배포",
        "deck": "무료와 유료 요금제 모두 대상이고 답이 차트와 버튼으로 나와요",
        "summary": "OpenAI가 10월 7일 GPT-6 모델을 ChatGPT에 전 세계 대상으로 배포하기 시작했어요. 새 Intelligent UI는 답변을 차트와 버튼 같은 상호작용 요소로 보여줘요. 시스템 카드에 따르면 10월 업데이트의 GPT-6 Sol과 GPT-6 Luna가 ChatGPT에서 GPT-5.6 Sol과 Luna를 대체해요.",
        "content": "OpenAI는 10월 7일 'GPT-6 and Intelligent UI for everyone'이라는 제목의 글을 냈어요. OpenAI 뉴스 피드의 설명에 따르면 GPT-6 모델이 Intelligent UI와 함께 ChatGPT에서 전 세계로 배포되고 있고, 시각 자료와 직접 탐색하며 쓸 수 있는 인터랙티브 경험을 곁들여 더 빠르게 응답해요.\n\nOpenAI Deployment Safety Hub에 올라온 시스템 카드(GPT-6 Sol and GPT-6 Luna: October 2026 update)는 GPT-6를 무료와 유료 요금제 모두의 ChatGPT 사용자에게 전 세계에 출시한다고 적고 있어요. 이 모델들은 ChatGPT에서 GPT-5.6 Sol과 GPT-5.6 Luna를 대체해요. 시스템 카드는 이 모델들을 사이버 보안과 생물학·화학 영역에서 High 역량으로 다룬다고 밝혔어요.\n\nThe Decoder에 따르면 유료 요금제는 GPT-6 Sol을, 무료 사용자는 GPT-6 Luna를 받아요. Plus, Pro, Business, Enterprise 사용자에게 먼저 제공되고 Free와 Go 사용자는 하루 뒤에 따라온다고 해요. 이 내용은 OpenAI의 설명을 The Decoder가 전한 것이에요.\n\nIntelligent UI는 텍스트 위주의 답변 대신 차트, 버튼 같은 상호작용 요소로 답을 보여주는 방식이에요. The Decoder와 The Verge도 같은 날 이 소식을 보도했어요.",
        "source": "https://openai.com/index/gpt-6-for-everyone",
        "officialUrl": "https://openai.com/index/gpt-6-for-everyone",
        "verifiedAt": "2026-10-18",
        "slug": "openai-gpt-6-intelligent-ui-chatgpt",
        "tags": [
          "AI",
          "2026-w41",
          "OpenAI",
          "Models"
        ],
        "backupUrls": [
          {
            "label": "OpenAI Deployment Safety Hub: GPT-6 Sol and GPT-6 Luna October 2026 update (system card)",
            "url": "https://deploymentsafety.openai.com/gpt-6-october"
          },
          {
            "label": "OpenAI News RSS (title, description, pubDate)",
            "url": "https://openai.com/news/rss.xml"
          },
          {
            "label": "Same page, de-DE locale URL",
            "url": "https://openai.com/de-DE/index/gpt-6-for-everyone/"
          },
          {
            "label": "The Decoder, Oct 7 2026",
            "url": "https://the-decoder.com/chatgpt-with-gpt-6-ditches-mostly-text-output-for-interactive-ui-with-charts-buttons-and-mini-apps/"
          },
          {
            "label": "The Verge, Oct 7 2026",
            "url": "https://www.theverge.com/ai-artificial-intelligence/1007276/openai-chatgpt-intelligent-ui-gpt-6"
          }
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261019/f90fe07cd74e.png",
          "alt": "GPT-6 and Intelligent UI for everyone",
          "provenance": "source-share-preview"
        },
        "en": {
          "title": "OpenAI rolls out GPT-6 models and Intelligent UI in ChatGPT",
          "deck": "Free and paid plans are covered, and answers use charts and buttons",
          "summary": "OpenAI began rolling out GPT-6 models to ChatGPT users worldwide on October 7. The new Intelligent UI shows answers with charts, buttons and other interactive elements. According to the system card, the October GPT-6 Sol and GPT-6 Luna models replace GPT-5.6 Sol and Luna in ChatGPT.",
          "content": "On October 7, OpenAI published a post titled 'GPT-6 and Intelligent UI for everyone'. According to the description in OpenAI's news feed, GPT-6 models are rolling out globally in ChatGPT with Intelligent UI, delivering faster responses with visuals and interactive experiences you can explore and use directly.\n\nThe system card on the OpenAI Deployment Safety Hub (GPT-6 Sol and GPT-6 Luna: October 2026 update) says OpenAI is launching GPT-6 to everyone in ChatGPT, across free and paid plans globally. These models replace GPT-5.6 Sol and GPT-5.6 Luna in ChatGPT. The system card says the models are treated as High capability in cybersecurity and in biological and chemical domains.\n\nAccording to The Decoder, paid plans get GPT-6 Sol and free users get GPT-6 Luna. Plus, Pro, Business and Enterprise users get access first, and Free and Go users follow one day later. This is OpenAI's account as relayed by The Decoder.\n\nIntelligent UI shows answers with interactive elements such as charts and buttons instead of mostly text. The Decoder and The Verge also reported the news the same day."
        },
        "releaseScope": "ChatGPT 무료·유료 요금제 · 전 세계"
      },
      "sourceWeek": "2026-w41",
      "sourceCompany": "OpenAI",
      "editorial": "무료 요금제까지 대상인 배포입니다. 답변이 차트와 버튼으로 나오는 Intelligent UI와, 요금제마다 받는 모델이 무엇인지 함께 확인합니다."
    },
    {
      "rank": 2,
      "tier": "hero",
      "post": {
        "date": "10/13",
        "platform": "Web",
        "title": "Google, Gemini 4 Argon을 API와 Gemini 앱에 동시 공개",
        "deck": "입력 100만 토큰당 2달러 도입 가격은 11월 30일까지예요",
        "summary": "Google이 최신 프런티어 모델 Gemini 4 Argon을 공개했어요. 개발자와 기업은 API로, 구독자는 Antigravity와 Gemini 앱, 검색 AI 모드에서 쓸 수 있고 API 도입 가격은 100만 토큰당 입력 2달러, 출력 10달러예요.",
        "content": "Google이 Gemini 4 Argon을 가장 어려운 문제를 풀기 위해 만든 모델이라고 소개하며, 발표 당일부터 전 세계에서 이용할 수 있다고 밝혔어요. Google은 이 모델을 최신 프런티어 모델로 내놓았어요.\n\n이용 경로는 대상에 따라 나뉘어요.\n\n- 개발자와 기업: AI Studio와 Gemini 플랫폼의 API\n- Google AI Ultra 구독자: Google Antigravity\n- Google AI Ultra와 Pro 구독자: Gemini 앱과 검색의 AI 모드\n\nAPI는 도입 가격으로 시작해요. Google이 밝힌 가격은 100만 토큰당 입력 2달러, 출력 10달러예요. 이 가격은 2026년 11월 30일까지 적용되고, 이후에는 입력 4달러, 출력 20달러로 올라요.\n\n성능과 관련해 Google은 Vals Index에서 1위에 올랐다고 주장했어요. 이 결과는 Google이 직접 밝힌 벤치마크 주장이에요.\n\n같은 날 Google은 Gemini 앱 적용, 로보틱스 활용, 안전성 보고서도 각각 따로 공개했어요. 개발자용 제공 안내와 Gemini API 문서는 아래 링크에서 볼 수 있어요.",
        "source": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/",
        "officialUrl": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/",
        "verifiedAt": "2026-10-18",
        "slug": "google-gemini-4-argon-launch",
        "tags": [
          "AI",
          "2026-w42",
          "Google",
          "Models"
        ],
        "backupUrls": [
          {
            "label": "Google 개발자용 제공 안내",
            "url": "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-argon/"
          },
          {
            "label": "Gemini API 모델 페이지",
            "url": "https://ai.google.dev/gemini-api/docs/models/gemini-4-argon"
          },
          {
            "label": "Gemini API 변경 내역",
            "url": "https://ai.google.dev/gemini-api/docs/changelog"
          },
          {
            "label": "Gemini 앱 적용 안내",
            "url": "https://blog.google/innovation-and-ai/products/gemini-app/gemini-4-argon-availability/"
          },
          {
            "label": "Gemini 4 Argon 로보틱스 활용",
            "url": "https://developers.googleblog.com/gemini-4-argon-for-robotics/"
          },
          {
            "label": "Gemini 4 Argon 안전성 설명",
            "url": "https://blog.google/innovation-and-ai/technology/safety-security/gemini-4-model-safety-security/"
          },
          {
            "label": "The Decoder 보도",
            "url": "https://the-decoder.com/gemini-4-argon-is-now-available-worldwide-as-googles-most-capable-frontier-model/"
          },
          {
            "label": "Ars Technica 보도",
            "url": "https://arstechnica.com/ai/2026/10/gemini-4-argon-begins-rolling-out-in-gemini-app-and-antigravity-but-only-if-you-pay/"
          }
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261020/23646e4eaecc.png",
          "alt": "Gemini 4 Argon: Built to solve your hardest problems",
          "provenance": "source-share-preview"
        },
        "en": {
          "title": "Google releases Gemini 4 Argon across the API and the Gemini app at once",
          "deck": "The $2 per million input tokens introductory price runs until November 30",
          "summary": "Google released Gemini 4 Argon, its latest frontier model. Developers and enterprises can use it through the API, and subscribers can use it in Antigravity, the Gemini app, and AI Mode in Search. The introductory API price is $2 per million input tokens and $10 per million output tokens.",
          "content": "Google introduced Gemini 4 Argon as a model built to solve your hardest problems and said it is globally available from the day of the announcement. Google presents it as its latest frontier model.\n\nAccess depends on who you are.\n\n- Developers and enterprises: the API in AI Studio and the Gemini platform\n- Google AI Ultra subscribers: Google Antigravity\n- Google AI Ultra and Pro subscribers: the Gemini app and AI Mode in Search\n\nThe API starts at an introductory price. Google lists $2 per million input tokens and $10 per million output tokens. That price applies until November 30, 2026, and rises to $4 for input and $20 for output afterward.\n\nOn performance, Google claims the model ranks first on the Vals Index. This is a benchmark claim made by Google itself.\n\nOn the same day, Google also published separate posts on the Gemini app rollout, robotics use, and the safety report. The developer availability post and the Gemini API documentation are linked below."
        },
        "releaseScope": "API · Gemini 앱 · 검색 AI 모드"
      },
      "sourceWeek": "2026-w42",
      "sourceCompany": "Google",
      "editorial": "API와 Gemini 앱, 검색 AI 모드에 같은 날 열린 모델입니다. 입력 100만 토큰당 2달러는 11월 30일까지 적용되는 도입 가격이라는 점을 함께 봅니다."
    },
    {
      "rank": 3,
      "tier": "feature",
      "post": {
        "date": "10/7",
        "platform": "Web",
        "title": "Anthropic, 소형 모델 Claude Haiku 5.5 출시",
        "deck": "Haiku 4.5보다 실행 비용이 약 75% 낮다고 밝혔어요",
        "summary": "Anthropic이 10월 7일 소형 모델 Claude Haiku 5.5(모델 ID claude-haiku-5-5)를 공개했어요. 회사는 평균 실행 비용이 Haiku 4.5보다 약 75% 낮다고 밝혔고, AWS, Google Cloud, Microsoft Azure를 포함한 모든 플랫폼에서 쓸 수 있다고 설명했어요.",
        "content": "Anthropic이 10월 7일 소형 모델 Claude Haiku 5.5를 공개했어요. 모델 ID는 claude-haiku-5-5이고, 회사는 발표문에서 지금까지 출시한 소형 모델 가운데 가장 저렴하고, 가장 빠르고, 성능이 가장 높은 모델이라고 소개했어요.\n\n비용에 대해서는 평균적으로 실행 비용이 Haiku 4.5보다 약 75% 낮아졌다고 밝혔어요. 각주에 따르면 10만 토큰 이하 요청은 Haiku 4.5보다 가격이 90%, 그보다 긴 요청은 50% 낮아요. Haiku 4.5 요청의 90%가 앞 구간이었고, 새 토크나이저로 작업당 토큰이 조금 늘어나는 점도 75% 계산에 반영했다고 적었어요. 가격표에서 100만 토큰당 입력 가격은 프롬프트가 10만 토큰 이하일 때 0.10달러, 넘을 때 0.50달러이고, 출력 가격은 각각 0.50달러와 2.50달러예요.\n\n컨텍스트 창은 100만 토큰, 최대 출력은 12만 8천 토큰이에요. 이 두 수치는 발표 페이지가 아니라 Anthropic의 Claude Platform 릴리스 노트에 실린 내용이에요.\n\n제공 범위로는 Anthropic이 AWS, Google Cloud, Microsoft Azure를 포함한 모든 플랫폼에서 지금 쓸 수 있다고 밝혔어요. 같은 날 Claude Code v2.1.293이 Haiku 5.5를 추가했고, AWS와 GitHub Copilot도 각각 제공 소식을 공지했어요.\n\n발표문에는 벤치마크 점수표가 실려 있지만 Anthropic이 직접 만든 표예요. 성능 수치는 외부에서 재현한 결과가 아니라 회사가 밝힌 값으로 봐야 해요.",
        "source": "https://www.anthropic.com/claude-haiku-5-5",
        "officialUrl": "https://www.anthropic.com/claude-haiku-5-5",
        "verifiedAt": "2026-10-18",
        "slug": "claude-haiku-5-5-launch",
        "tags": [
          "AI",
          "2026-w41",
          "Anthropic",
          "Models"
        ],
        "backupUrls": [
          {
            "label": "발표 페이지 주소 별칭 (공식 페이지로 연결되는 주소)",
            "url": "https://www.anthropic.com/news/claude-haiku-5-5"
          },
          {
            "label": "Claude Help Center 릴리스 노트, 10월 7일 항목",
            "url": "https://support.claude.com/en/articles/12138966-release-notes"
          },
          {
            "label": "AWS 제공 공지",
            "url": "https://aws.amazon.com/about-aws/whats-new/2026/10/claude-haiku-5-5-aws/"
          },
          {
            "label": "GitHub Copilot 제공 공지",
            "url": "https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot/"
          },
          {
            "label": "Claude Code v2.1.293 릴리스 노트",
            "url": "https://github.com/anthropics/claude-code/releases/tag/v2.1.293"
          }
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261019/046cc1cdbe59.jpg",
          "alt": "Introducing Claude Haiku 5.5",
          "provenance": "source-share-preview"
        },
        "en": {
          "title": "Anthropic Releases Claude Haiku 5.5, a Small Model",
          "deck": "Anthropic says it costs about 75% less to run than Haiku 4.5",
          "summary": "Anthropic released its small model Claude Haiku 5.5 (model ID claude-haiku-5-5) on October 7. The company says it costs around 75% less to run than Haiku 4.5 on average, and says it is available on all platforms, including AWS, Google Cloud, and Microsoft Azure.",
          "content": "Anthropic released its small model Claude Haiku 5.5 on October 7. The model ID is claude-haiku-5-5, and in its announcement the company described it as the cheapest, fastest, and most capable small model it has released so far.\n\nOn cost, Anthropic says the model now costs around 75% less to run than Haiku 4.5 on average. A footnote gives the basis for that figure: requests up to 100,000 tokens are priced 90% lower than on Haiku 4.5, and longer requests 50% lower. On Haiku 4.5, 90% of requests fell into the first group, and the figure also accounts for the new tokenizer, which uses slightly more tokens per task. In the pricing table, input costs $0.10 per million tokens for prompts up to 100,000 tokens and $0.50 above that, and output costs $0.50 and $2.50 respectively.\n\nThe context window is 1 million tokens and the maximum output is 128,000 tokens. These two figures come from Anthropic's Claude Platform release notes, not from the announcement page.\n\nOn availability, Anthropic says the model is available now on all platforms, including Amazon Web Services, Google Cloud, and Microsoft Azure. The same day, Claude Code v2.1.293 added Haiku 5.5, and AWS and GitHub Copilot each published their own availability notices.\n\nThe announcement includes a benchmark table, but it is Anthropic's own table. Treat the performance figures as numbers reported by the company, not as results reproduced by outside parties."
        },
        "releaseScope": "API · 클라우드 3사 · Claude Code"
      },
      "sourceWeek": "2026-w41",
      "sourceCompany": "Anthropic",
      "editorial": "Haiku 4.5보다 약 75% 싸다는 회사 발표를, 자주 맡기는 작업의 비용으로 다시 계산해 봅니다. 프롬프트가 10만 토큰을 넘으면 가격이 달라진다는 점도 확인합니다."
    },
    {
      "rank": 4,
      "tier": "feature",
      "post": {
        "date": "10/12",
        "platform": "Web",
        "title": "Meta, 에이전트용 모델 Muse Wonder와 Muse Wonder Full 공개",
        "deck": "Meta Model API와 Muse Code에서 바로 쓸 수 있는 모델이에요",
        "summary": "Meta가 개인용과 업무용 에이전트 작업에 맞춘 Muse Wonder와 Muse Wonder Full을 소개했어요. Muse Wonder는 Meta Model API와 Muse Code에서 이용할 수 있고, Muse Wonder Full은 Muse Code 구독자에게 제공돼요.",
        "content": "Meta가 Muse Wonder 시리즈로 Muse Wonder와 Muse Wonder Full 두 모델을 소개했어요. Meta는 두 모델을 자사에서 가장 뛰어난 모델이라고 부르며, 개인용과 업무용 에이전트 작업에서 최고 수준의 성능을 낸다고 밝혔어요.\n\n제공 범위는 모델마다 달라요. Meta의 발표 내용은 다음과 같아요.\n\n- Muse Wonder: 발표 당일부터 Meta Model API와 Muse Code에서 이용할 수 있어요.\n- Muse Wonder Full: 같은 날부터 Muse Code 구독자에게 제공돼요.\n\nMeta는 Muse Wonder가 곧 Muse를 구동하게 되고, 적용은 구독자부터 순서대로 시작한다고 설명했어요. 아직 시작되지 않은 계획이므로, 지금 Muse에서 Muse Wonder를 쓸 수 있다는 뜻은 아니에요.\n\n성능과 관련해 Meta는 에이전트, 기억, 코딩 벤치마크에서 최고 수준의 결과를 냈다고 주장했어요. 이 내용은 Meta가 직접 발표한 것이며 독립 기관의 평가는 아니에요. 자세한 내용은 Meta의 공식 글을 참고해 주세요.\n\nTechCrunch도 같은 날 이 출시를 별도로 보도했어요.",
        "source": "https://research.meta.ai/blog/muse-wonder",
        "officialUrl": "https://research.meta.ai/blog/muse-wonder",
        "verifiedAt": "2026-10-18",
        "slug": "meta-muse-wonder-models",
        "tags": [
          "AI",
          "2026-w42",
          "Meta",
          "Models"
        ],
        "backupUrls": [
          {
            "label": "Meta 뉴스룸 발표",
            "url": "https://about.fb.com/news/2026/10/introducing-muse-wonder-models/"
          },
          {
            "label": "TechCrunch 보도",
            "url": "https://techcrunch.com/2026/10/12/meta-releases-its-first-frontier-model-muse-wonder/"
          },
          {
            "label": "The New York Times 보도",
            "url": "https://www.nytimes.com/2026/10/12/technology/meta-muse-wonder-full-models.html"
          }
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261019/a2489627e98b.jpg",
          "alt": "Muse Wonder: A Frontier Model For Personal & Professional AI Agents"
        },
        "en": {
          "title": "Meta introduces Muse Wonder and Muse Wonder Full, models for personal and professional agents",
          "deck": "Available now through the Meta Model API and Muse Code",
          "summary": "Meta introduced Muse Wonder and Muse Wonder Full, built for personal and professional agent tasks. Muse Wonder is available through the Meta Model API and Muse Code, and Muse Wonder Full is available to Muse Code subscribers.",
          "content": "Meta introduced two models in the Muse Wonder series: Muse Wonder and Muse Wonder Full. Meta calls them its most capable models and says they deliver state-of-the-art performance on personal and professional agentic tasks.\n\nAvailability differs by model. According to Meta:\n\n- Muse Wonder: available from the day of the announcement through the Meta Model API and Muse Code.\n- Muse Wonder Full: available from the same day to Muse Code subscribers.\n\nMeta said Muse Wonder will soon power Muse, rolling out to subscribers first. That plan has not started yet, so it does not mean Muse Wonder is already available in Muse.\n\nOn performance, Meta claims state-of-the-art results on agent, memory, and coding benchmarks. This comes from Meta itself and is not an independent evaluation. See Meta's official post for details.\n\nTechCrunch also reported the release separately on the same day."
        },
        "releaseScope": "Meta Model API · Muse Code"
      },
      "sourceWeek": "2026-w42",
      "sourceCompany": "Meta",
      "editorial": "Meta가 에이전트 작업용으로 내놓은 모델입니다. Muse Wonder와 Muse Wonder Full을 각각 어디에서 쓸 수 있는지부터 구분합니다."
    },
    {
      "rank": 5,
      "tier": "feature",
      "post": {
        "date": "10/19",
        "platform": "Web",
        "title": "Exa, Exa 3.0 공개하고 저가형 검색 유형 Exa Lite 추가",
        "deck": "API로 바로 쓸 수 있으며, 요청 1,000건당 Lite는 4달러, Auto는 7달러입니다",
        "summary": "Exa가 검색 품질을 지금까지 가장 크게 개선했다고 밝힌 Exa 3.0과 새 검색 유형 Exa Lite를 공개했습니다. Exa는 BrowseComp 91.8%, DSQA 88.2% 등 시험한 모든 벤치마크에서 1위라고 밝혔지만, 이는 Exa가 직접 발표한 수치입니다. API로 제공되며 요청 1,000건당 Lite는 4달러, Auto는 7달러입니다.",
        "content": "Exa는 10월 19일 공식 블로그에서 Exa 3.0을 공개하고, 지금까지 내놓은 것 가운데 검색 품질을 가장 크게 개선한 버전이라고 설명했습니다.\n\nExa는 시험한 모든 벤치마크에서 Exa 3.0이 1위를 차지했다고 밝혔습니다. 글의 벤치마크 그림에 실린 점수는 BrowseComp 91.8%, DSQA 88.2%, WideSearch 56.1%, ATLAS 42.0%, WebCode 75.5%, FinSearchComp 68.0%, Company FindAll 15.4, People FindAll 7.6입니다. 그림 주석에 따르면 이 점수는 Exa 3.0 Auto의 결과이며, Perplexity, Brave, Parallel을 포함한 모든 업체를 GPT-6 Luna 에이전트를 쓰는 동일한 검색 환경에서 실행했습니다. 모두 Exa가 직접 발표한 수치이며, 글에는 독립적인 외부 평가 기관이 언급되어 있지 않습니다.\n\nExa는 더 큰 임베딩 모델 학습, Dynamic Highlights 정식 출시, 상품·지역 업체·항공편·날씨 등 문서 수십억 건의 색인 추가를 개선 요인으로 들었습니다. Dynamic Highlights는 추가 요금 없이 제공되며, Exa는 이 기능이 페이지 전체 텍스트보다 토큰을 95% 적게 쓴다고 밝혔습니다. 이 수치 역시 Exa의 자체 주장입니다.\n\n새 검색 유형 Exa Lite는 Exa Auto와 같은 색인을 쓰며, 비용에 민감한 애플리케이션을 위해 더 낮은 가격에 제공됩니다. Exa 3.0은 발표 당일부터 API로 제공되며, 요청 1,000건당 Exa Lite는 4달러, Exa Auto는 7달러입니다.",
        "source": "https://exa.ai/blog/exa-3",
        "officialUrl": "https://exa.ai/blog/exa-3",
        "verifiedAt": "2026-10-22",
        "slug": "exa-3-0-search-launch",
        "tags": [
          "AI",
          "2026-w43",
          "Exa",
          "Devtools"
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261022/69d9b18c6f7b.png",
          "alt": "Exa 3.0 leads Perplexity, Brave, and Parallel on all eight benchmarks. Exa scores 91.8% on BrowseComp, 88.2% on DSQA, 56.1% on WideSearch, 42.0% on ATLAS, 75.5% on WebCode, 68.0% on FinSearchComp, 15.4 on Company FindAll, and 7.6 on People FindAll."
        },
        "en": {
          "title": "Exa releases Exa 3.0 and adds Exa Lite, a lower-cost search type",
          "deck": "Available through the API at $4 per 1,000 requests for Lite and $7 for Auto",
          "summary": "Exa released Exa 3.0, which it calls its largest improvement to search quality yet, along with a new search type, Exa Lite. Exa says it ranks first on every benchmark it tested, including 91.8% on BrowseComp and 88.2% on DSQA, but these are Exa's own figures. It is available through the API at $4 per 1,000 requests for Lite and $7 for Auto.",
          "content": "Exa released Exa 3.0 on its official blog on October 19 and described it as the largest improvement to search quality it has ever released.\n\nExa says Exa 3.0 ranks first on every benchmark it tested. The scores in the post's benchmark chart are BrowseComp 91.8%, DSQA 88.2%, WideSearch 56.1%, ATLAS 42.0%, WebCode 75.5%, FinSearchComp 68.0%, Company FindAll 15.4 and People FindAll 7.6. According to the chart's footnote, these are results for Exa 3.0 Auto, and all providers, including Perplexity, Brave and Parallel, ran in the same agentic search harness with a GPT-6 Luna agent. All of these numbers are Exa's own results, and the post does not name an independent evaluator.\n\nExa credits a larger embedding model, the general availability of Dynamic Highlights, and billions of documents added to its index across data such as products, local businesses, flights and weather. Dynamic Highlights comes at no additional charge, and Exa says it uses 95% fewer tokens than full page text. This figure is also Exa's own claim.\n\nThe new Exa Lite search type runs on the same index as Exa Auto and is offered at a lower price for cost-sensitive applications. Exa 3.0 is available through the API from the day of the announcement, at $4 per 1,000 requests for Exa Lite and $7 per 1,000 requests for Exa Auto."
        },
        "releaseScope": "Exa API (Exa Lite · Exa Auto)"
      },
      "sourceWeek": "2026-w43",
      "sourceCompany": "Exa",
      "editorial": "검색 API를 만드는 Exa가 검색 품질을 가장 크게 올린 버전이라고 소개한 Exa 3.0입니다. 벤치마크 수치는 Exa가 직접 잰 값이므로, 함께 나온 Exa Lite와 Exa Auto의 가격 차이를 실제 질문으로 비교해 보는 데서 시작합니다."
    },
    {
      "rank": 6,
      "tier": "feature",
      "post": {
        "date": "10/19",
        "platform": "Web",
        "title": "행정안전부, 현업 공무원이 바이브 코딩으로 만든 「국정ON」 소개",
        "deck": "국회·국무회의 생중계를 키워드로 모니터링하는 AI 서비스예요",
        "summary": "행정안전부가 현업 공무원이 생성형 AI 대화형 코딩으로 직접 만든 AI 국정 모니터링 서비스 「국정ON」을 사례로 소개했어요. 국회와 국무회의 생중계에서 정해 둔 키워드가 나오면 알려 주는 서비스예요.",
        "content": "행정안전부가 현업 공무원이 생성형 AI 대화형 코딩(바이브 코딩)으로 직접 만든 'AI 기반 국정 모니터링 서비스 「국정ON」'을 10월 19일 사례로 소개했어요. 업무 중 느낀 불편을 공무원이 직접 AI로 해결한 경우라는 것이 행정안전부의 설명이에요.\n\n행정안전부에 따르면 국정ON은 이용자가 정한 키워드가 국회와 국무회의 생중계에서 나오면 카카오톡으로 알려 줘요. 발언을 주제별로 정리해 공식 회의록과 비교하고, 주제별 보고서도 만들어 줘요. 서비스는 kjon.aigov.go.kr에서 운영되고 'AI 정부 실험실'의 지원을 받았다고 해요.\n\n행정안전부는 반복적인 모니터링을 필요한 순간에 확인하는 업무 방식으로 바꾸는 사례라고 소개했어요. 이 보도자료는 부처의 사례 소개이고, 이용자 수나 정확도 수치는 제시하지 않았어요.",
        "source": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785660",
        "officialUrl": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785660",
        "verifiedAt": "2026-10-20",
        "slug": "mois-gukjeong-on-vibe-coding",
        "tags": [
          "AI",
          "2026-w43",
          "행정안전부",
          "Korea"
        ],
        "backupUrls": [
          {
            "label": "국정ON 서비스 사이트",
            "url": "https://kjon.aigov.go.kr"
          }
        ],
        "en": {
          "title": "Interior Ministry Presents 국정ON, Built by a Civil Servant With Vibe Coding",
          "deck": "An AI service that monitors Assembly and Cabinet broadcasts by keyword",
          "summary": "Korea's interior ministry presented 국정ON, an AI-based government monitoring service that a working civil servant built with generative-AI conversational coding. It alerts users when chosen keywords come up in National Assembly and Cabinet live broadcasts.",
          "content": "Korea's interior ministry (MOIS) presented, as a case study on October 19, 'AI-based government monitoring service 국정ON', which a working civil servant built directly with generative-AI conversational coding (vibe coding). The ministry describes it as a case where a public servant solved an inconvenience from their own work with AI.\n\nAccording to the ministry, 국정ON alerts users through KakaoTalk when keywords they have chosen come up in live broadcasts of the National Assembly and Cabinet. It organizes remarks by topic, compares them with the official minutes, and produces topic reports. The service runs at kjon.aigov.go.kr with support from the 'AI Government Lab'.\n\nThe ministry presented it as a case of changing a repetitive monitoring task into checking only at the moments it is needed. The press release is a ministry case study and gives no user numbers or accuracy figures."
        },
        "releaseScope": "행정안전부 사례 소개 · 이용 수치 미공개",
        "thumbnail": {
          "src": "/og-cache/ab-20261022-mois-gukjeong-on-vibe-coding-page.png",
          "alt": "정책브리핑 보도자료 페이지 첫 화면. 「국정ON」 보도자료 제목과 2026.10.19 행정안전부 표기, 첨부파일 목록이 보입니다.",
          "caption": "정책브리핑 보도자료 원문 화면입니다(2026-10-21 촬영)."
        }
      },
      "sourceWeek": "2026-w43",
      "sourceCompany": "행정안전부",
      "editorial": "현업 공무원이 바이브 코딩으로 직접 만든 서비스입니다. 이용자 수나 정확도 수치는 아직 공개되지 않았다는 점을 기억하고 봅니다."
    }
  ],
  "modelWatch": []
};
