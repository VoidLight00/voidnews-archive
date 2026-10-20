import type { ABEdition } from "../data";

export const edition2026_10b: ABEdition = {
  "slug": "2026-10b",
  "volume": 15,
  "title": "도구 추천 네 가지와 10월 7일~19일 AI 소식",
  "theme": "Claude Code v2.1.287 · Anatomy · diagram-design · REA",
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
  "intro": "이번 회차는 10월 7일부터 19일까지 나온 AI 소식을 다룹니다. 본편 카드는 10월 22일 발표에 맞춰 이 페이지에 올라옵니다. 먼저 바로 써 볼 수 있는 도구 네 가지를 소개합니다. 세 가지는 MIT 라이선스로 공개된 오픈소스이고, Claude Code는 Anthropic의 공식 릴리스입니다.",
  "closing": "소개한 도구는 설치하기 전에 저장소의 사용 조건과 접근 범위를 먼저 확인하시길 권합니다. 역공학 도구는 분석할 권한이 있는 대상에만 쓰는 것이 안전합니다.",
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
      "noSourcePreview": true
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
      "body": "**개념을 작동하는 기계로 그려 설명합니다**\nAnatomy는 설명하려는 개념을 실제로 작동하는 물체로 만들어 보여 주는 에이전트 스킬입니다. README에 따르면 개념을 한 줄로 요청하면 Claude가 그 개념과 같은 방식으로 움직이는 물체를 고안합니다. 값이 그대로면 작업을 건너뛰는 캐시 키는 핀이 모두 맞아야 돌아가는 자물쇠가 되는 식입니다. 결과는 음영이 들어간 작은 부품 수십 개로 만든 아이소메트릭 도해이고, 포인터와 키보드에 반응하며, 화면에 나오는 숫자는 부품을 움직이는 같은 모델에서 나옵니다. 기본은 SVG이고, 불꽃이나 물 같은 효과는 WebGL로 더하며, 부품이 깊이 방향으로 도는 3D 모드는 베타입니다.\n\n**설치는 명령 한 줄이고, Node.js 20.10 이상이 필요합니다**\n`npx skills add`에 이 저장소의 경로를 넣고 `-g -a claude-code`를 붙이면 `~/.claude/skills/anatomy`에 설치됩니다. git으로 같은 폴더에 내려받거나 ZIP을 풀어 넣어도 됩니다. 설치 뒤 Claude Code에서 `/anatomy explain how a token bucket rate limiter works, interactive`처럼 요청하면 시작됩니다. README는 API 키가 필요 없고 Node 내장 모듈만 쓰므로 `npm install`도 필요 없다고 밝히며, 요구 사항으로 Node.js 20.10 이상과 점검용 Chrome 또는 Chromium을 듭니다. 또한 설치 CLI가 예제를 포함한 저장소 전체(약 10MB)를 복사하고, 1.7.1 버전은 Node 22.20 이상을 요구한다고 안내합니다.\n\n**접근 범위: 내 스킬 폴더와 프로젝트 파일, 점검용 브라우저입니다**\n스킬은 지시문과 Node 스크립트로 이루어져 있고 API 키를 요구하지 않습니다. 설치 위치는 사용자 스킬 폴더이거나 프로젝트 폴더이며, 만들어진 도해는 직접 소유하는 소스 파일로 남습니다. 스킬은 자체 점검을 위해 헤드리스 Chrome을 시작하는데, 임시 프로필을 쓰고 로컬 포트로 통신한다고 README가 설명합니다. Codex 샌드박스에서는 이 점검이 막힐 수 있어 명령별 승인이 필요할 수 있습니다. 도해를 커뮤니티 갤러리에 게시하는 기능은 사용자가 게시를 요청하면 시작되며, 에이전트가 보낼 내용을 보여 주고 확인을 받은 뒤 풀 리퀘스트를 연다고 합니다. 라이선스는 스킬과 도해 모두 MIT입니다.\n\n**실습: 개념 하나로 첫 도해를 만들고 초안으로 다듬습니다**\n가르치거나 문서로 설명해야 하는 개념 하나를 고르고, 실제 숫자를 넣어 요청합니다. README의 예시는 `/anatomy an isometric SVG explaining how a CDN edge cache works, cache hit vs miss, TTL of 60 s, for a dark landing page. Just the SVG file and a PNG preview.`입니다. README는 그리는 방식이 아니라 개념을 말하고, 실제 숫자를 주고, 결과물이 놓일 곳을 알리라고 권합니다. 사이트는 첫 도해를 초안으로 보고, 어색한 부분을 말해 다시 요청하라고 안내합니다. 화면의 숫자가 요청한 값과 맞는지, 키보드로도 조작되는지, 물체의 움직임이 개념과 대응되는지를 확인합니다. 도해 하나에 긴 작업 시간이 들며, 사이트는 시계 장치가 Claude의 작업 시간으로 1시간 54분 걸렸다고 적습니다. 축과 데이터 계열이 있는 차트에는 맞지 않는다고 README가 밝힙니다.",
      "editorial": "상자와 화살표로 그리던 설명 그림을 작동하는 물체로 바꾸는 접근과, 그 작업에 드는 시간을 함께 봅니다.",
      "tags": [
        "공개 도구",
        "MIT",
        "스킬",
        "실습 제안"
      ],
      "tier": "feature",
      "releaseScope": "MIT 오픈소스 · 에이전트 스킬",
      "noSourcePreview": true
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
    }
  ],
  "highlights": [],
  "modelWatch": []
};
