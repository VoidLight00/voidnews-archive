export interface Post {
  date: string;
  platform: "X" | "Threads" | "X+Threads";
  title: string;
  featured?: boolean;
  summary?: string;      // 한줄 요약 (카드)
  content?: string;      // 전문 / 포스팅 본문
  source?: string;       // 원본 소스 URL (블로그/기사)
  officialUrl?: string;  // 공식 계정 트윗/게시글 URL (이미지·영상 포함)
  threadsUrl?: string;   // 현님 Threads 포스팅
  xUrl?: string;         // 현님 X 포스팅
  tags?: string[];
}

export interface Company {
  name: string;
  color: string;
  posts: Post[];
}

export interface WeeklyData {
  week: number;
  year: number;
  slug: string;
  period: string;
  totalPosts: number;
  companies: Company[];
}

export const weeks: WeeklyData[] = [
  {
    week: 13,
    year: 2026,
    slug: "2026-w13",
    period: "3/20 ~ 3/26",
    totalPosts: 44,
    companies: [
      {
        name: "Anthropic / Claude",
        color: "#E87040",
        posts: [
          {
            date: "3/28", platform: "X+Threads",
            title: "AI 쓰는 사람들끼리 격차가 벌어지고 있다 — Anthropic 경제 지수 3월 리포트",
            officialUrl: "https://www.anthropic.com/research/economic-index-march-2026-report",
            summary: "고숙련 Claude 사용자는 더 높은 가치 작업에서 더 높은 성공률 — 경험 격차는 시간이 갈수록 심화",
            content: "Anthropic이 Claude 사용 패턴을 분석한 경제 지수 3월 리포트를 공개했습니다.\n\n핵심 발견은 하나예요. 경험 많은 사용자일수록 AI를 더 잘 씁니다.\n\n더 높은 가치의 작업을 시도하고, 성공률도 더 높아요. '러닝 커브'가 존재한다는 겁니다. AI를 오래 쓸수록 쓰는 방법을 배우게 되고, 그 격차는 시간이 지날수록 벌어집니다.\n\nClaude.ai 사용 사례도 다양해졌어요. 상위 10개 작업이 전체 사용량에서 차지하는 비중이 줄었습니다. 코딩 작업은 Claude.ai에서 API 자동화 워크플로우로 이동 중이고요.\n\n지금 AI를 잘 못 쓰는 사람이 나중에 따라잡는 게 점점 어려워지는 구조가 만들어지고 있어요.\n\n'누가 AI를 쓰느냐'보다 '어떻게 쓰느냐'의 격차가 핵심입니다.",
            source: "https://www.anthropic.com/research/economic-index-march-2026-report",
          },
          {
            date: "3/26 20:41", platform: "Threads",
            title: "한국은 AI를 가장 잘 쓰면서 패배할 수 있다 — 문제는 실력이 아니다",
            summary: "한국의 AI 활용 역설 — 사용률은 높지만 구조적 패배 가능성을 분석한 아티클",
            content: "한국이 AI를 가장 잘 쓰고도 결국 패배할 수도 있는 이유.\n\n읽으면서 뜨끔한 부분이 많았던 아티클이에요.\n\n흑백개발자 해커톤에서 한국 최고 수준 개발자 80명이 30시간 동안 만든 결과물이 썸네일 편집기와 AI 공포 마케팅 구독 서비스였다는 이야기부터 시작합니다.\n\n실력이 없어서가 아니라, 풀려고 한 문제의 수준이 낮았다는 지적이에요.\n\nethancho12.substack.com/p/ai-d53\n\n아티클에서 흥미로운 분석이 있었어요.\n\n한국은 소비자 입장에서 불편이 거의 없는 나라라서, \"AI로 뭘 만들까\" 하고 앉으면 떠오르는 문제의 수준이 낮을 수밖에 없다는 거예요.\n\n배달은 빠르지만 자영업자 마진은 깎이고, 결제는 편한데 정산 구조는 엉망이고, 병원 예약은 쉬운데 의료 데이터는 병원마다 따로 논다고요.\n\n불편은 넘치는데 소비자 눈에 안 보일 뿐이라는 지적이 날카로웠어요.\n\n가장 뜨끔했던 부분은 이거예요.\n\n토스 공동창업자 이태양이 개발에서 10년 손 떼고 복귀했는데, 본인 실력이 예전보다 오히려 좋아졌다고 말했대요. AI가 실행을 대신 해주기 때문이라고요.\n\n코딩 실력 차이는 AI가 메워주는 시대에, 남는 건 \"무슨 문제를 푸느냐\"라는 이야기입니다.\n\n교육 시스템에 대한 분석도 있었어요.\n\n수능이라는 게 결국 주어진 문제를 정해진 시간 안에 정확하게 푸는 훈련인데, \"이게 왜 문제인가\"를 질문하는 연습은 12년 내내 한 번도 하지 않는다고요.\n\n그래서 세계 최고의 문제 풀이 능력이 나왔는데, 바로 그 구조가 AI 시대에는 가장 큰 약점이 될 수 있다는 분석이에요.\n\n마지막 문장이 인상적이었어요.\n\n\"지금 한국에 필요한 건 더 좋은 AI 툴이 아니라 더 좋은 질문이다.\"\n\n동의하든 반박하든, 한번 읽어볼 만한 글이에요. 링크는 첫 글에 있습니다.",
            source: "https://ethancho12.substack.com/p/ai-d53",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWWKE-Fj-6k",
          },
          {
            date: "3/26 19:56", platform: "Threads",
            title: "Claude Code 고수들의 비밀 5가지 — 당신이 매번 시간 낭비하는 이유",
            summary: "CLAUDE.md 활용법, /resume, 서브에이전트, MCP 핵심 팁 정리",
            officialUrl: "https://x.com/AnthropicAI/status/2036944806317088921",
            content: "Claude Code 쓰는데 매번 같은 실수하고 있을 수 있어요.\n\n컨텍스트 관리 안 하면 중간에 맥락 잃고, CLAUDE.md 안 쓰면 매번 같은 설명 반복하고, /resume 모르면 긴 작업마다 처음부터 다시 시작하게 됩니다.\n\nExplore → Plan → Execute → Commit 프레임워크 하나면 해결돼요.\n\nx.com/AnthropicAI/status/2036944806317088921\n\nCLAUDE.md가 핵심이에요.\n\n프로젝트 루트에 놓으면 Claude가 프롬프트보다 더 엄격하게 따릅니다. 코딩 스타일, 네이밍 규칙, 금지 패턴을 적어두면 매번 설명할 필요가 없어져요.\n\n300줄 이하로 유지하는 게 포인트입니다. 길면 오히려 무시하기 시작해요.\n\n서브에이전트와 훅은 파워 유저 영역이에요.\n\n서브에이전트는 복잡한 작업을 하위 에이전트에게 위임해서 병렬로 처리합니다. 훅은 특정 이벤트(커밋 전, 파일 저장 후 등)에 자동 실행되는 스크립트예요.\n\nMCP 서버를 연결하면 GitHub PR 리뷰, Sentry 에러 체크, Jira 업데이트를 한 세션에서 전부 처리할 수 있어요.\n\n정리하면 이 순서예요.\n\n1단계: CLAUDE.md 만들기 (규칙 300줄 이하)\n2단계: Explore-Plan-Execute-Commit 프레임워크 적용\n3단계: /resume으로 긴 작업 이어가기\n4단계: 서브에이전트 + 훅 + MCP 서버로 확장\n\n원문 22분 가이드 전체는 AI Tinkerers에 있어요.\n\n---",
            source: "https://post-training.aitinkerers.org/p/claude-code-tips-and-tricks",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWWE2Hhj0s2",
          },
          {
            date: "3/26 18:09", platform: "Threads",
            title: "93%가 무조건 Y를 눌렀다 — Anthropic이 자율 모드를 만든 이유",
            summary: "2단계 분류기, 3등급 행동 체계, 승인 피로 해결 메커니즘 완전 분석",
            officialUrl: "https://x.com/AnthropicAI/status/2036944806317088921",
            content: "Claude Code를 쓰면서 \"허가하시겠습니까?\" 화면이 얼마나 자주 뜨는지 아세요?\n\nAnthropic이 데이터를 봤더니 사용자의 93%가 아무 생각 없이 Y를 누르고 있었습니다. 이 승인 피로 문제를 해결하기 위해 Auto Mode를 만들었어요.\n\n2단계 AI 분류기가 작업 위험도를 평가하고, 안전한 작업은 자동 승인, 위험한 작업만 사람에게 묻는 구조입니다. 3등급 행동 체계(허용/확인 필요/금지)로 안전성을 담보합니다.",
            source: "https://x.com/AnthropicAI/status/2036944806317088921",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWV4mTpjwO5",
          },
          {
            date: "3/26 15:25", platform: "Threads",
            title: "Claude Code, 이제 혼자 결정한다 — Auto Mode 공식 출시",
            summary: "AI 분류기 기반 안전한 자동 승인 — 승인 피로 없는 자율 실행 시스템",
            content: "Claude Code auto mode 출시.\n\n- AI 분류기가 각 행동의 위험도를 실시간 판단\n- 안전한 행동은 자동 승인, 위험한 행동만 확인 요청\n- 승인 피로(approval fatigue) 대폭 감소\n- claude --auto 플래그로 활성화",
            source: "https://claude.com/blog/auto-mode",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVma6fj1O1",
          },
          {
            date: "3/26 13:26", platform: "X+Threads",
            title: "Obsidian 노트 안에서 Claude Code를 실행한다 — Claudian 플러그인",
            summary: "Obsidian 노트에 Claude Code를 직접 내장 — 노트 작성 중 AI 코딩 에이전트 실행",
            officialUrl: "https://x.com/tom_doerr/status/2036564539748049212",
            content: "Claudian이 Obsidian을 Claude Code 작업 공간으로 바꿔놓았습니다.\n\n단순한 챗봇 사이드바가 아닙니다. 볼트 자체가 Claude의 작업 디렉토리가 되어 파일 읽기/쓰기, 검색, bash 명령어, 다단계 워크플로우까지 전부 가능합니다.\n\nObsidian + AI의 판도를 바꾸는 플러그인입니다.\n\nx.com/tom_doerr/status/2036564539748049212\n\nClaudian이 다른 AI 플러그인과 다른 점은 이겁니다. 볼트 자체가 컨텍스트예요. 복사 붙여넣기가 필요 없습니다.\n\n@멘션으로 파일 참조, 태그로 제외, 에디터 선택 영역 첨부까지 됩니다. 이미지도 드래그앤드롭으로 바로 분석 가능하고, 인라인 편집은 단어 수준 diff 미리보기를 지원합니다.\n\n오픈소스이고 MIT 라이선스입니다. Obsidian과 Claude를 함께 쓰고 있다면, 이게 그동안 빠져있던 퍼즐 조각이에요.\n\ngithub.com/YishenTu/claudian\n\n이런 워크플로우가 가능해집니다.\n\n1. Obsidian에서 노트 열기\n2. Claude가 볼트 구조를 읽기\n3. \"이 프로젝트 리팩토링해줘\" 한마디\n4. Claude가 파일 수정, 테스트 실행, 커밋까지 전부 처리\n\n터미널 전환 없이 노트와 에이전트만으로 개발하는 시대입니다.\n\n파워 기능도 강력합니다.\n\n슬래시 커맨드로 재사용 가능한 프롬프트 템플릿을 만들 수 있고, Skills 모듈은 컨텍스트에 따라 자동 실행됩니다. Claude Code 포맷과 호환돼요.\n\n커스텀 서브에이전트도 정의할 수 있고, ~/.claude/plugins에서 플러그인을 자동 인식합니다.\n\n---",
            source: "https://x.com/tom_doerr/status/2036564539748049212",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVZ2fYDwOg",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037022613424468120",
          },
          {
            date: "3/25 19:37", platform: "Threads",
            title: "기획자·생성자·평가자 — Anthropic식 AI 팀 구성의 비밀",
            summary: "생성자/평가자/기획자 3인조 멀티에이전트 아키텍처 완전 분석",
            content: "Claude Code로 앱 하나 통째로 만들 수 있다는 거 아시죠? 근데 대부분 실패합니다.\n\n**이유는 두 가지예요.**\n\n1. 대화창이 길어지면 AI가 대충 마무리하려는 현상 (문맥 불안)\n2. 자기가 만든 코드를 자기가 평가하면 항상 \"잘했어요\" (자기 객관화 실패)\n\n**Anthropic이 이 문제를 구조적으로 해결했습니다.**\n\n---\n\nAI 한 명이 다 하는 게 아니라 3명이 역할을 나눕니다:\n\n- **기획자** — 짧은 프롬프트를 상세 기획서로 확장\n- **생성자** — 기획서 기반으로 코드 작성  \n- **평가자** — 브라우저 직접 띄워서 버그 찾고 채점\n\n**GAN에서 영감 받은 구조예요.** 만드는 놈과 평가하는 놈을 분리한 겁니다.",
            source: "https://anthropic.com/engineering/harness-design-for-long-running-application-development",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWTdz_Gj4cA",
          },
          {
            date: "3/25 14:25", platform: "X+Threads",
            title: "승인 없이 스스로 판단하는 Claude — Auto Mode 안전 설계 원리",
            summary: "권한 자동 판단 + AI 세이프가드 — 승인 없이 안전하게 자율 실행",
            content: "Claude Code Auto Mode가 공식 출시됐습니다.\n\n핵심은 AI 분류기 기반 안전 메커니즘입니다. 파일 읽기나 검색처럼 위험도가 낮은 작업은 자동 실행하고, 시스템 파일 수정이나 외부 API 호출처럼 민감한 작업만 사용자에게 확인을 요청합니다.\n\n기존에 매번 Y/n을 누르던 승인 피로 없이 에이전트가 자율적으로 작동하면서도, 중요한 결정만 사람이 내리는 구조입니다.",
            source: "https://claude.com/blog/auto-mode",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWS6YXrj-qq",
          },
          {
            date: "3/25 07:23", platform: "Threads",
            title: "Anthropic이 공개한 에이전트 팀 운영법 — 장기 앱 개발의 새 공식",
            summary: "장기 실행 앱 개발을 위한 멀티에이전트 하네스 설계 공식 블로그",
            officialUrl: "https://x.com/AnthropicAI/status/2036481033621623056",
            content: "Anthropic Engineering Blog — 멀티에이전트 하니스로 장기 앱 개발.\n\nClaude Code/Cowork를 어떻게 만드는가.\n프론트엔드 디자인과 자율 소프트웨어 엔지니어링을 확장하는 아키텍처.\n\n---\n\n하나의 Claude가 여러 역할을 동시에 수행하는 구조예요.\n프론트엔드 디자인 + 장기 자율 개발을 하나의 하니스로 관리합니다.\n\n---\n\n- 공식 블로그: http://anthropic.com/engineering-blog",
            source: "https://x.com/AnthropicAI/status/2036481033621623056",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWSKa44EwJQ",
          },
          {
            date: "3/25 02:00", platform: "X",
            title: "AI가 잠드는 방법 — 렘수면에서 영감 받은 에이전트 메모리 설계",
            summary: "에이전트가 렘수면처럼 기억을 정리·압축하는 메모리 아키텍처 직접 구현",
            content: "직접 개발한 ai-dream 공개 스레드 7개.\n\n컨셉: AI 에이전트의 기억을 인간의 렘수면처럼 정리\n- 단기 기억 → 장기 기억 압축\n- 중요도 기반 필터링\n- 벡터 임베딩으로 의미 보존\n\nGitHub: VoidLight00/ai-dream\nApache 2.0 오픈소스",
            source: "https://github.com/VoidLight00/ai-dream",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2036489042725081337",
          },
          {
            date: "3/24 23:33", platform: "Threads",
            title: "교수처럼 설명, 적수처럼 검증 — Claude로 학습 효율 10배 올리는 법",
            summary: "Claude로 학습 효율을 극대화하는 검증된 프롬프트 10가지 정리",
            content: "Claude를 교수처럼 쓰는 10가지 프롬프트가 화제입니다.\n\n핵심은 하나예요 — Claude한테 답을 받는 게 아니라, **Claude가 나를 코치하게 만드는 것.**\n\n수동으로 읽기만 하면 머릿속에 안 남아요. Claude가 질문하고, 내가 생각하고, 직접 만들게 하는 구조가 진짜 학습이에요.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRUSzND55k",
          },
          {
            date: "3/24 15:51", platform: "X+Threads",
            title: "터미널 밖에서 에이전트를 지휘한다 — Claude Code의 텔레그램·디스코드 연동",
            summary: "Claude Code와 메시징 플랫폼 직접 연동 — 채널에서 코딩 에이전트 제어",
            content: "Claude Code Channels가 발표됐습니다.\n\n텔레그램, 디스코드 등 메시징 플랫폼에서 직접 Claude Code 에이전트를 제어할 수 있게 됩니다. 터미널을 열지 않아도 채팅창에서 코드 작업을 지시하고 결과를 받습니다.\n\n에이전트가 백그라운드에서 실행되는 동안 다른 일을 하다가 완료 알림을 받는 비동기 개발 워크플로우가 가능해집니다.",
          },
          {
            date: "3/24 15:23", platform: "X+Threads",
            title: "Computer Use 다음은 Phone Use — Claude가 스마트폰을 직접 조작한다",
            summary: "Computer Use에 이은 Phone Use — AI가 스마트폰을 직접 제어하는 에이전트",
            officialUrl: "https://x.com/claudeai/status/2036195789601374705",
            content: "Anthropic Phone Use (mobile) 개발 중 — Claude가 모바일 기기에서 전화 걸기 + 작업 실행 가능\n\nComputer Use의 확장판 (데스크탑 → 모바일). 곧 Claude Cowork/Code Research Preview 출시 예정. M1Astra 발견 🪐\n\n지금까지 Computer Use는 macOS 데스크탑에서만 가능했는데, 이제 모바일 기기까지 제어 범위가 확장되는 거죠. Claude Dispatch로 폰에서 명령 → 데스크탑 실행은 가능했지만, 이번엔 폰 자체를 Claude가 직접 제어하는 방향.\n\n음성 통화 자동 실행 + 앱 조작 + 스케줄 관리까지 모바일 AI 에이전트 완성도가 높아질 것 같습니다.\n\nComputer Use가 데스크탑이었다면 Phone Use는 모바일이에요. Claude가 전화 걸고 앱 조작하는 시대가 오고 있습니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWQdAQ7D1zH",
          },
          {
            date: "3/24 09:17", platform: "X+Threads",
            title: "Claude가 내 맥을 직접 클릭한다 — macOS 컴퓨터 제어 첫 데모",
            summary: "Claude가 macOS 화면을 직접 보고 클릭·입력하는 컴퓨터 제어 에이전트",
            officialUrl: "https://x.com/claudeai/status/2036195789601374705",
            content: "Claude가 이제 컴퓨터와 앱을 직접 사용할 수 있습니다.\n\nClaude Cowork 및 Claude Code에서 Finder나 Chrome 같은 앱을 열 때 권한을 요청하고, 사용자 화면의 앱을 직접 제어할 수 있습니다.\n\nmacOS 전용 Research Preview로 공개되었습니다.\n\nFinder, Chrome, 스프레드시트까지 Claude가 직접 조작해요. 코딩뿐 아니라 일반 업무 자동화까지 확장된 게 핵심입니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWPzYNED4y_",
          },
          {
            date: "3/24 07:18", platform: "X+Threads",
            title: "Anthropic이 연구 블로그를 열었다 — 이제 논문도 직접 읽는다",
            summary: "Anthropic의 연구 논문·기술 블로그 공식 채널 오픈",
            content: "Anthropic Science Blog 공식 런칭 소식.\n\n- 연구 논문, 실험 결과, 기술 해설을 정리하는 공식 채널 오픈\n- 제품 발표와 별도로 과학적 배경과 연구 맥락을 설명하는 공간\n- Anthropic의 연구 커뮤니케이션을 더 체계화하려는 움직임",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWQdAQ7D1zH",
          },
          {
            date: "3/22 22:38", platform: "Threads",
            title: "조건을 걸면 스킬이 자동 실행된다 — Claude Code 트리거 자동화",
            summary: "특정 조건에서 자동으로 스킬을 불러오는 트리거 기반 자동화 시스템",
            content: "Claude Code Skills 트리거 시스템이 공개됐습니다.\n\n특정 파일 패턴, 명령어, 상황에서 자동으로 스킬을 불러오는 조건부 자동화입니다. 예를 들어 .py 파일을 수정할 때마다 자동으로 테스트 스킬을 실행하거나, PR을 열 때 코드 리뷰 스킬을 트리거할 수 있습니다.\n\n반복 작업을 Claude Code가 알아서 처리하는 첫 번째 단계입니다.",
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "당신이 몰랐던 Claude Code 고수들의 50가지 사용법",
            summary: "Claude Code 50가지 실전 팁",
            content: "Claude Code 매일 쓰면서 놓치고 있는 팁이 많을 수 있어요.\n\nBuilder.io에서 정리한 50가지 실전 팁 중 당장 적용 가능한 것들만 뽑아봤습니다.\n\nEsc+Esc로 체크포인트 복원, !git으로 인라인 bash 실행, 2번 수정 실패하면 /clear, Plan Mode는 다중 파일 변경 시만.\n\nhttps://builder.io/blog/claude-code-tips-best-practices\n\n컨텍스트 관리가 제일 중요해요.\n\n/clear를 자주 쓰세요. 3시간짜리 오염된 세션보다 깨끗한 5초 프롬프트가 낫습니다.\n\n@파일명으로 직접 참조하면 코드 복붙할 필요가 없어요. /compact 할 때는 \"API 변경사항에 집중해\"처럼 가이드를 주면 압축 품질이 올라갑니다.\n\n가장 중요한 원칙 하나.\n\nCLAUDE.md를 300줄 이하로 유지하세요. Claude는 프롬프트보다 CLAUDE.md를 더 엄격하게 따릅니다. 프로젝트 규칙, 코딩 스타일, 금지 패턴을 여기 적어두면 매번 반복 설명이 사라져요.\n\n도구와 싸우지 마세요. 도구의 결대로 쓰면 됩니다.\n\n서브에이전트와 훅은 자동화의 핵심이에요.\n\n서브에이전트는 큰 작업을 쪼개서 병렬 처리합니다. 훅은 특정 이벤트에 자동 실행되는 스크립트예요. 커밋 전 테스트 자동 실행 같은 거요.\n\nMCP 서버 연결하면 GitHub PR + Sentry 에러 + Jira 티켓을 한 세션에서 전부 다룰 수 있습니다.\n\n단축키 3개만 외우면 체감이 달라져요.\n\nEsc: 즉시 중지 (컨텍스트 유지)\nEsc+Esc: 체크포인트 복원 메뉴 (코드/대화/둘 다)\nCtrl+S: 프롬프트 임시 저장 (빠른 질문 후 원래 프롬프트로 복원)\n\n특히 Esc+Esc는 \"아 아까 코드가 나았는데\" 할 때 필수입니다.\n\n---",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWXVmBhE5t5",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037296518689165702",
            source: "https://www.builder.io/blog/claude-code-tips-best-practices"
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "Claude Code에 외부 도구를 연결하는 법 — MCP 서버 가이드",
            summary: "Claude Code MCP 서버 연결 가이드",
            content: "claude mcp add 명령어 하나로 Claude Code가 외부 도구에 연결됩니다.\n\nGitHub PR 리뷰, Sentry 에러 체크, Jira 티켓 업데이트를 한 세션에서 전부 처리할 수 있어요.\n\nstdio, HTTP, SSE 세 가지 전송 타입을 지원하고 Global/Project 범위로 나눌 수 있습니다.\n\nbuilder.io/blog/claude-code-mcp-servers\n\nMCP가 강력한 이유는 Claude Code의 기본 기능(코드 편집, 검색, Bash)에 외부 도구를 무한히 확장할 수 있기 때문이에요.\n\nDB 쿼리, GitHub 이슈 생성, 브라우저 테스트, Figma 토큰 가져오기까지. 한 번 세팅하면 매번 탭 전환 없이 대화로 전부 처리됩니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWXgh_rD3EK",
            source: "https://builder.io/blog/claude-code-mcp-servers"
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "손 안에서 AI 에이전트를 지휘한다 — Claude Dispatch 모바일 제어",
            summary: "Claude Dispatch — 모바일 Cowork 제어",
            officialUrl: "https://x.com/felixrieseberg/status/2034005731457044577",
            content: "Anthropic이 Claude Dispatch를 공개했습니다.\n\n모바일 폰으로 Claude Cowork(데스크톱 AI 에이전트)를 원격 제어하는 기능이에요.\n\n데스크톱과 모바일이 하나의 persistent thread로 동기화됩니다.\n\nThe New Stack은 이걸 \"OpenClaw 대항마\"라고 불렀어요.\n\n어떻게 작동하나요?\n\nClaude Cowork는 데스크톱에서 돌아가는 AI 에이전트예요. 파일 관리, 이메일, 브라우징, 코딩 작업을 대신 처리합니다.\n\nDispatch는 이 Cowork 세션을 폰에서 시작하고, 중간에 확인하고, 결과를 받을 수 있게 해요.\n\n\"회의 중에 폰으로 작업 시켜두고, 돌아오면 완료돼 있다\"는 시나리오가 핵심입니다.\n\n3월 24일, Anthropic이 Computer use 기능을 Cowork에 추가했어요.\n\nClaude가 사용자 컴퓨터를 직접 제어할 수 있게 됐습니다. 앱 실행, 클릭, 타이핑, 스크린샷까지.\n\nDispatch + Computer use 조합으로, 폰에서 \"Slack에서 이번 주 미팅 요약해줘\" 같은 명령을 내리면 Claude가 데스크톱에서 실행하고 결과를 폰으로 돌려줍니다.\n\n\"Claude가 실수할 수 있고, 위협은 계속 진화한다\"는 게 Anthropic의 경고예요.\n\n안전장치:\n- 새 앱 접근 전 항상 권한 요청\n- 사용자가 명시적으로 승인해야 실행\n- 민감한 작업(금융, 개인정보)은 추가 확인\n\nComputer use는 강력하지만 조심스럽게 풀고 있습니다.\n\nThe New Stack이 직접 비교했어요.\n\nOpenClaw: 오픈소스, 자체 호스팅, 로컬 우선, 커뮤니티 확장\nDispatch: Anthropic 공식, 클라우드 동기화, Cowork 전용\n\nDispatch는 \"모바일 제어\"라는 UX 포인트로 OpenClaw와 정면 경쟁합니다.\n\nAI 에이전트 경쟁이 기능에서 접근성으로 넘어가고 있어요.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWYkjJDD1oU",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037468317368369310",
            source: "https://www.anthropic.com/news/claude-dispatch"
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "코드명 Capybara, 공식명 Mythos — Anthropic의 다음 모델이 유출됐다",
            summary: "Claude Mythos 유출 사건",
            content: "Anthropic의 차세대 모델이 유출됐습니다. 이름은 Claude Mythos. 코드네임은 Capybara.\n\nCMS 설정 실수로 미공개 블로그 초안이 공개 데이터베이스에 그대로 노출됐어요.\n\nFortune이 단독 보도했고, Anthropic이 직접 인정했습니다.\n\n\"우리가 만든 것 중 가장 강력한 모델이다.\"\n\n2026년 가장 큰 AI 유출 사건일 수 있습니다.\n\n뭐가 유출된 건가요?\n\nAnthropic의 콘텐츠 관리 시스템(CMS)에서 미공개 블로그 초안과 관련 자산 약 3,000개가 암호화 없이 공개 검색이 가능한 상태로 방치돼 있었습니다.\n\n캠브리지 대학의 사이버보안 연구자 Alexandre Pauwels와 보안 전문가 Roy Paz가 각각 독립적으로 발견했어요.\n\nFortune이 Anthropic에 알린 후 접근이 차단됐고, Anthropic은 \"CMS 설정의 인적 오류\"라고 인정했습니다. AI 도구 때문은 아니라고 해요.\n\nClaude Mythos가 뭔가요?\n\n유출된 블로그 초안에 따르면, \"Anthropic이 만든 것 중 역대 가장 강력한 AI 모델\"입니다.\n\nCapybara는 이 모델의 제품 티어 이름이에요. 지금까지 Anthropic의 모델 등급은 Haiku(소) → Sonnet(중) → Opus(대)였는데, Capybara는 Opus 위에 올라가는 새로운 최상위 티어입니다. 더 크고, 더 똑똑하고, 더 비쌉니다.\n\nAnthropic 대변인이 Fortune에 직접 말했어요 — \"추론, 코딩, 사이버보안에서 의미 있는 진전을 이룬 범용 모델을 개발 중이다. 역량이 강력한 만큼 출시에 신중을 기하고 있다.\"\n\nOpus 4.6이랑 얼마나 차이가 나나요?\n\n유출된 초안의 표현이에요 — \"우리의 이전 최고 모델인 Claude Opus 4.6과 비교해, Capybara는 소프트웨어 코딩, 학술 추론, 사이버보안 테스트에서 극적으로 높은 점수를 기록한다.\"\n\n특히 사이버보안 능력이 압도적이라고 합니다. \"현존하는 모든 AI 모델 중 사이버 역량에서 가장 앞서 있다.\"\n\n왜 사이버보안이 문제인가요?\n\nAnthropic이 자기 모델을 직접 경고하는 부분이에요.\n\n유출된 초안에 이런 문장이 있습니다 — \"이 모델은 방어자가 따라잡을 수 있는 속도를 훨씬 넘어서 취약점을 공격할 수 있는 모델의 파도가 곧 온다는 것을 예고한다.\"\n\n쉽게 말하면, 해커가 이 모델을 쓰면 보안팀이 막기 전에 취약점을 찾아서 공격할 수 있다는 거예요.\n\nAnthropic은 이 위험을 알고 있어서, 일반 공개가 아니라 사이버 방어 조직한테 먼저 early access를 주는 전략을 잡았습니다. 방어자한테 먼저 준비할 시간을 주겠다는 거죠.\n\n일반 사용자는 언제 쓸 수 있나요?\n\n아직 모릅니다. 유출된 초안에 따르면 운영 비용이 높아서 일반 공개 준비가 안 됐다고 해요. 소수의 early access 고객한테만 테스트 중입니다.\n\n모델 티어가 새로 생긴다는 건, 가격도 새로운 구간이 될 가능성이 높아요. Opus보다 비싸다고 직접 언급돼 있으니까요.\n\n이건 확정된 정보인가요?\n\nFortune이 Anthropic에 직접 확인했고, Anthropic이 모델 존재와 테스트를 인정했습니다.\n\n다만 유출된 건 \"출판을 고려 중이던 초기 초안\"이라는 게 Anthropic의 입장이에요. 최종 제품 사양이나 출시 일정은 바뀔 수 있습니다.\n\n확실한 건 세 가지예요. 모델이 존재한다는 것, Anthropic이 \"step change\"라고 부른다는 것, 그리고 사이버보안 위험 때문에 출시를 신중하게 하고 있다는 것.\n\nAI 모델 경쟁이 \"누가 더 똑똑하냐\"에서 \"누가 더 위험하냐\"로 넘어가고 있습니다.\n\nAnthropic이 자기 모델의 사이버 공격 능력을 직접 경고하면서 방어자한테 먼저 주겠다고 한 건, 이 업계에서 처음 있는 일이에요.\n\n카피바라가 언제 풀리든, 사이버보안의 판이 바뀌는 건 이미 시작됐습니다.\n\n\"아모데이 선생님, 저 토큰 준비됐어요\"\n\nFortune 기사: https://fortune.com/2026/03/27/anthropic-testin",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWYtg_7D-C3",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037482156184981756",
            source: "https://fortune.com/2026/03/27/anthropic-testing-mythos-most-powerful-ai-model-ever-developed/"
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "디자이너가 Claude를 쓰는 방법 — Figma부터 브랜드 가이드까지 5가지",
            summary: "디자이너를 위한 Claude Skills 5가지",
            content: "디자이너를 위한 Claude Skills 5가지가 정리됐어요.\n\n디자인 시스템 감사, 접근성 체크, 컴포넌트 문서화, 디자인 토큰 생성, 핸드오프 자동화까지.\n\n개발자만 쓰는 도구가 아니라 디자이너의 반복 작업을 줄여주는 실전 스킬이에요.\n\n특히 디자인 시스템 감사 스킬이 강력해요. 컬러, 타이포, 스페이싱의 일관성을 자동으로 체크하고 수정 제안까지 해줍니다.\n\n접근성 체크 스킬은 WCAG 기준으로 콘트라스트 비율, 텍스트 크기, 터치 타겟 사이즈를 검사해요.\n\n디자이너도 AI 자동화의 혜택을 받을 수 있어요.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWXm_P7D-Z-",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037332745840652390"
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "콘텐츠 크리에이터의 Claude 활용 프롬프트 50개 완전 정리",
            summary: "크리에이터를 위한 Claude 프롬프트 50개",
            content: "크리에이터를 위한 Claude 프롬프트 50개가 정리됐어요.\n\n개발자가 아니라 콘텐츠 제작자를 위한 프롬프트예요. 글쓰기, 영상 대본, SNS, SEO, 이메일 마케팅, 브랜드 보이스까지.\n\n각 프롬프트가 복사해서 바로 쓸 수 있는 형태입니다.\n\nbuilder.io/blog/claude-prompts\n\n특히 유용한 건 브랜드 보이스 프롬프트예요. \"내 기존 콘텐츠 3개를 분석해서 톤, 어휘, 문장 구조 패턴을 뽑아줘\"처럼 구체적으로 지시하면 일관된 브랜드 톤을 유지할 수 있어요.\n\n개발자 프롬프트는 넘치는데 크리에이터용은 드물어서 가치가 있습니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWXgPQWjwv4",
            source: "https://builder.io/blog/claude-prompts"
          }
        ],
      },
      {
        name: "OpenAI",
        color: "#10A37F",
        posts: [
          {
            date: "3/25 05:22", platform: "X+Threads",
            title: "Sora가 사라졌다 — OpenAI AI 영상의 미래는 어디로",
            summary: "Sora 앱/API/ChatGPT 비디오 기능 전면 종료 — 차세대 모델 'Spud' 훈련 완료",
            source: "https://x.com/soraofficialapp/status/2036532672824922489",
            officialUrl: "https://x.com/soraofficialapp/status/2036532672824922489",
            content: "OpenAI가 Sora 서비스를 전면 종료했습니다.\n\nSora 앱, API, ChatGPT 내 비디오 기능이 모두 사라졌습니다. 공식 이유는 차세대 모델 Spud 훈련 완료로 인한 전환.\n\nSora는 2024년 2월 발표 이후 큰 주목을 받았지만, 실제 서비스에서는 Runway, Kling, Wan 등 경쟁사에 뒤처진다는 평가가 많았습니다. Spud가 그 격차를 메울 수 있을지 주목됩니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWR8staE_tA",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2036538807177322904",
          },
          {
            date: "3/24 13:17", platform: "X+Threads",
            title: "ChatGPT에 갤러리가 생겼다 — AI 이미지 히스토리 관리 탭 추가",
            officialUrl: "https://x.com/OpenAI/status/2036183180219392103",
            summary: "AI 생성 이미지 전용 갤러리 탭 — ChatGPT 내 이미지 히스토리 관리",
            content: "ChatGPT에 Library 탭 추가.\n\n기능:\n- DALL-E로 생성한 이미지 전체 보관\n- 날짜/프롬프트 기반 검색\n- 생성 이미지 재편집 및 변형\n- 갤러리 뷰로 한눈에 확인",
          },
          {
            date: "3/24 03:17", platform: "X+Threads",
            title: "Python 생태계를 인수했다 — OpenAI의 Astral 흡수와 그 의미",
            officialUrl: "https://x.com/OpenAINewsroom/status/2034616934671724639",
            summary: "Python 패키지 관리 도구 Astral 인수 — ChatGPT/Codex와 Python 생태계 통합",
            content: "OpenAI가 Astral(uv, ruff 개발사) 인수 발표.\n\nAstral의 주요 도구:\n- uv: 초고속 Python 패키지 관리자\n- ruff: 초고속 Python 린터\n\nChatGPT/Codex 에이전트가 Python 환경을 자동으로 설정하는 워크플로우 강화 예상.",
          },
          {
            date: "3/23 21:17", platform: "X+Threads",
            title: "작고 빠른 GPT-5.4 mini — 저비용 추론의 새 선택지",
            summary: "경량 고속 모델 GPT-5.4 mini API 공개 — 저비용 추론 특화",
            content: "OpenAI가 GPT-5.4 mini를 API로 공개했습니다.\n\n경량 모델이지만 GPT-5.3 수준의 추론 품질을 유지하면서 비용을 대폭 낮췄습니다. 토큰당 비용은 기존 GPT-5.3 대비 약 70% 저렴.\n\n빠른 응답이 필요한 챗봇, 자동화 파이프라인, 대량 처리 작업에 최적화된 선택지입니다.",
          },
          {
            date: "3/21 02:58", platform: "X",
            title: "학생은 무료로 — OpenAI AI 코딩 에이전트 교육 프로그램",
            summary: "학생 대상 무료 AI 코딩 에이전트 — 교육 목적 Codex 접근권 제공",
            content: "OpenAI Codex for Students 프로그램이 출시됐습니다.\n\n학생 신분으로 교육 이메일(@edu)만 있으면 Codex AI 코딩 에이전트를 무료로 사용할 수 있습니다.\n\nGitHub와 연동해 실제 프로젝트에서 AI 페어 프로그래밍 경험을 쌓을 수 있습니다. 다음 세대 개발자를 초기에 OpenAI 생태계로 끌어들이는 전략적 행보입니다.",
          },
        ],
      },
      {
        name: "Google / DeepMind",
        color: "#4285F4",
        posts: [
          {
            date: "3/28", platform: "X+Threads",
            title: "LLM의 메모리 병목을 뚫는다 — Google TurboQuant 공개",
            officialUrl: "https://x.com/GoogleResearch/status/2036533564158910740",
            summary: "고차원 벡터 극한 압축 알고리즘 — KV 캐시 병목 해결로 AI 추론 비용 절감",
            content: "AI 모델의 가장 큰 병목 중 하나는 KV 캐시예요.\n\n긴 대화나 문서를 처리할 때 AI는 이미 처리한 내용을 치트시트처럼 기억해두는데, 이게 엄청난 메모리를 잡아먹습니다. 모델이 커질수록, 맥락이 길수록 더 심해져요.\n\nGoogle Research가 이 문제를 정면으로 공략하는 알고리즘 TurboQuant를 공개했습니다.\n\n고차원 벡터를 극한까지 압축하는 기법이에요. 벡터 탐색 성능은 유지하면서 메모리 사용량을 대폭 줄입니다.\n\n실질적인 의미는 두 가지예요. 같은 하드웨어로 더 긴 맥락을 처리할 수 있고, AI 추론 비용이 내려갑니다.\n\n100만 토큰 컨텍스트 윈도우 시대에 이런 압축 기술이 필수가 되고 있어요.",
            source: "https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/",
          },
          {
            date: "3/26 10:57", platform: "Threads",
            title: "3분짜리 프로 음악을 AI가 만든다 — Lyria 3 Pro가 바꾸는 창작의 경계",
            summary: "3분 길이 프로 퀄리티 음악 생성 — Lyria 3 Pro로 음악 창작의 한계 돌파",
            content: "Google DeepMind Lyria 3 Pro 출시.\n\n- 최대 3분 길이 고품질 음악 트랙 생성\n- 인트로, 벌스, 코러스, 브리지를 포함한 완전한 곡 구성\n- Google AI Studio API로 개발자 접근 가능\n- Gemini App 통합 (유료 구독자 사용 가능)\n\nAI가 프로 퀄리티 음악을 통째로 만드는 시대가 왔습니다.",
            source: "https://x.com/GoogleDeepMind/status/2036836176233918707",
            officialUrl: "https://x.com/GoogleDeepMind/status/2036836176233918707",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVH56bj902",
          },
          {
            date: "3/25 06:49", platform: "Threads",
            title: "뇌와 몸의 결합 — DeepMind 알고리즘이 로봇 몸통을 얻다",
            summary: "로봇 AI 연구 협업 — DeepMind 알고리즘 + Agile Robots 하드웨어 결합",
            content: "Google DeepMind x Agile Robots 파트너십 발표.\nGemini foundation 모델을 로봇 하드웨어에 통합해 차세대 실용 로봇을 개발합니다.\n\n소프트웨어 AI가 실제 물리 세계로 나오는 첫 단계예요.\nGemini가 로봇 팔을 제어하는 시대가 오고 있습니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWSGgURE3h7",
          },
          {
            date: "3/25 03:01", platform: "Threads",
            title: "더 작고 더 빠른 Gemini — 모바일에서 달리는 Flash-Lite",
            summary: "초경량 고속 Gemini 모델 — 모바일/엣지 환경 특화 추론",
            content: "구글 딥마인드 Gemini 3.1 Flash-Lite — 실시간 웹사이트 생성.\n\n클릭·검색·탐색할 때마다 페이지가 즉시 렌더링됩니다. ⚡\n\n데모: https://goo.gle/4t9In1R\n\n---\n\n프롬프트 한 줄로 웹사이트가 즉시 렌더링되는 게 핵심이에요. 개발 환경 없이 브라우저에서 바로 결과물을 확인할 수 있습니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRsU8Fj_Xc",
          },
          {
            date: "3/23 13:17", platform: "X",
            title: "말로 UI를 만든다 — Google Stitch에 음성 입력이 추가됐다",
            summary: "Text-to-UI 생성 도구 기능 확장 — 음성 입력, 컴포넌트 라이브러리 추가",
            content: "Google Stitch가 업데이트됐습니다.\n\nText-to-UI에서 이제 Voice Canvas까지 — 음성으로 UI를 생성합니다. 이미지를 업로드하면 그 디자인을 그대로 코드로 변환하는 Image-to-UI도 추가됐습니다.\n\nShadcn/UI, Tailwind, Chakra, Material UI 등 주요 컴포넌트 라이브러리와 통합. 디자인 시스템을 그대로 가져와서 AI가 그 위에서 UI를 생성합니다.",
          },
          {
            date: "3/21 00:58", platform: "X",
            title: "Gemini 하나로 풀스택을 짠다 — AI Studio 바이브 코딩 데모",
            summary: "Gemini로 프론트엔드+백엔드 동시 생성 — full-stack 앱 바이브 코딩 시연",
            content: "Google AI Studio에서 vibe coding 방식으로 풀스택 앱을 빠르게 구현하는 데모가 공개됐습니다.\n\nGemini 2.5 Pro로 프론트엔드와 백엔드를 동시에 생성. 특히 \"Generate App\" 기능으로 자연어 설명 하나만으로 완성된 웹앱이 나옵니다.\n\nCode Execution, Google Search 연동까지 내장해 외부 API 없이도 실용적인 앱을 만들 수 있습니다.",
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "디자인에서 배포까지 1시간 — Stitch + Claude Code 풀스택 조합",
            summary: "Google Stitch + Claude Code 풀스택 개발",
            content: "Google Stitch(무료) + Claude Code 조합으로 손그림에서 작동하는 앱까지 만들 수 있어요.\n\nStitch가 디자인 시스템을 생성하고, Claude Code가 Next.js + TypeScript 프로덕션 코드로 변환합니다. 백엔드 API 연동까지 자동이에요.\n\nFigma 구독 없이 1인 풀스택 개발이 가능해졌습니다.\n\n기존에는 아이디어 → Figma(유료) → 프론트엔드 개발자 → 백엔드 → 배포까지 팀이 필요했어요.\n\n지금은 아이디어 → Stitch(무료) → Claude Code(터미널) → 배포. 시간 단위로 가능합니다. MVP 즉시 검증에 최적이에요.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWXgvKDD4pl"
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "논문 읽고 코드 짜기 — NotebookLM과 Claude의 연구 워크플로우",
            summary: "NotebookLM Deep Research + Claude Skill 워크플로우",
            content: "NotebookLM Deep Research + Claude Skill 조합으로 도메인 특화 AI 에이전트를 빠르게 만들 수 있어요.\n\nNotebookLM이 수백 개 웹사이트를 스캔해서 구조화된 지식 기반을 만들고, 이걸 Claude Skill로 변환하면 됩니다.\n\n스킬을 처음부터 쓰는 고통이 사라져요.\n\n워크플로우 4단계예요.\n\n1단계: 주제 선정 (예: B2B 영업 아웃리치)\n2단계: NotebookLM에서 Deep Research 실행\n3단계: 핵심 원칙과 프레임워크 추출 요청\n4단계: Claude Skill 생성기에 넣기\n\n데모에서는 가상 스낵 회사가 14일치 영업 시퀀스를 몇 초 만에 받았어요.\n\n---",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWXjBULDyrz",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037326470583132332"
          }
        ],
      },
      {
        name: "Cursor",
        color: "#8B5CF6",
        posts: [
          {
            date: "3/26 06:54", platform: "Threads",
            title: "외부로 나가지 않는 Cursor — 프라이빗 클라우드 에이전트 완성",
            summary: "코드와 실행이 프라이빗 네트워크 내에서 완결 — 외부 유출 없는 보안 에이전트",
            source: "https://cursor.com",
            content: "Cursor가 자체 인프라 기반 클라우드 에이전트를 지원합니다.\n\n코드와 실행 환경이 프라이빗 네트워크 내에서 완결됩니다. 기존에는 에이전트가 외부 서버를 거쳐야 했는데, 이제 코드가 기업 내부를 벗어나지 않습니다.\n\n보안 규정이 엄격한 금융·의료·방산 기업들이 Cursor를 도입할 수 있는 첫 번째 현실적인 선택지가 됐습니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWUry1Gk0zD",
          },
          {
            date: "3/24 22:45", platform: "Threads",
            title: "코드베이스를 실시간으로 검색한다 — Cursor Instant Grep",
            summary: "코드베이스 실시간 검색 내장 엔진 — grep보다 빠른 의미론적 코드 검색",
            content: "Cursor가 코드베이스 내 실시간 검색 엔진을 내장했습니다.\n\n기존 grep보다 빠른 의미론적 검색으로, 함수명·변수명은 물론 코드의 의도까지 찾아냅니다.\n\n에이전트가 컨텍스트를 수집하는 속도가 체감될 정도로 빨라졌습니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRP2QxD7QI",
          },
          {
            date: "3/20 14:51", platform: "X+Threads",
            title: "파일 수백 개를 한 번에 — Cursor Composer 2 대규모 리팩토링",
            summary: "멀티파일 에이전트 편집 대폭 강화 — 대규모 리팩토링 자동화",
            content: "Cursor Composer 2 메이저 업데이트.\n\n개선사항:\n- 멀티파일 동시 편집 안정성 향상\n- 대규모 리팩토링 자동 계획 수립\n- 의존성 자동 추적 및 업데이트\n- 실행 취소/재실행 히스토리 강화",
          },
        ],
      },
      {
        name: "xAI / Grok",
        color: "#9CA3AF",
        posts: [
          {
            date: "3/24 03:20", platform: "X+Threads",
            title: "Elon이 반도체 공장을 짓는다 — xAI Terafab 두 번째 공개",
            summary: "테라급 AI 제조 인프라 — xAI 자체 반도체 팹 비전 재공유",
            content: "xAI Terafab을 재차 공개했습니다.\n\nNVIDIA 의존도를 줄이고 Grok 전용 칩을 자체 제조하겠다는 비전. 수십억 달러 규모의 반도체 제조 시설을 직접 운영한다는 계획입니다.\n\n단순 데이터센터 구축을 넘어, NVIDIA·AMD와 경쟁하는 독립적인 AI 칩 공급망 구축이 목표입니다.",
          },
          {
            date: "3/22 17:07", platform: "X+Threads",
            title: "AI 반도체를 직접 만들겠다 — xAI Terafab 첫 발표",
            summary: "자체 AI 반도체 제조 시설 계획 공개 — 수십억 달러 규모 팹 건설 비전",
            content: "Elon Musk의 xAI가 Terafab 발표.\n\n비전:\n- 자체 AI 칩 설계 및 제조\n- TSMC 의존도 탈피\n- 2027년 첫 생산 목표\n- Grok 전용 최적화 아키텍처\n\nNVIDIA H100 대비 10배 에너지 효율 목표",
          },
        ],
      },
      {
        name: "Meta",
        color: "#1877F2",
        posts: [
          {
            date: "3/28", platform: "X+Threads",
            title: "AI의 뇌를 먼저 해부한다 — Meta TRIBEv2 해석 가능성 도구 공개",
            officialUrl: "https://aidemos.atmeta.com/tribev2/",
            summary: "AI 모델 내부 표현 직접 분석 — 블랙박스 AI를 투명하게 만드는 해석 가능성 연구 도구",
            content: "AI가 내부적으로 어떻게 생각하는지 알 수 없다는 게 AI 안전성의 핵심 문제예요.\n\nMeta가 AI 모델의 내부 표현을 직접 분석하는 TRIBEv2를 공개했습니다.\n\n모델이 어떤 개념을 어떻게 표현하는지, 어떤 정보를 어디에 저장하는지 들여다볼 수 있는 도구예요. 블랙박스였던 AI의 내부를 해부하는 시도입니다.\n\n모델이 편향을 어디서 학습하는지, 왜 틀린 답을 내는지 추적할 수 있게 돼요. 프로덕션 배포 전에 AI 모델의 뇌 상태를 먼저 확인하는 게 일반화될 수 있는 방향이에요.\n\n인터랙티브 데모로 직접 실험해볼 수 있습니다.",
            source: "https://aidemos.atmeta.com/tribev2/",
          },
          {
            date: "3/26 14:58", platform: "Threads",
            title: "AGI를 위한 칩을 함께 만든다 — Meta와 Arm CPU 협력 전면 해부",
            summary: "AGI 워크로드 전용 CPU 공동 개발 — 기존 대비 2배 성능, AI 추론 특화",
            content: "Meta가 Arm과 협력해 AI 인프라용 맞춤형 CPU를 개발합니다. 첫 세대 Arm AGI CPU는 컴퓨팅과 AI 워크로드에서 2배 이상의 성능을 제공합니다.\n\nx.com/Meta_Engineers/status/2036494803723043156\n\nMeta는 자체 AI 인프라를 강화하기 위해 Arm과의 장기 파트너십을 발표했습니다. 이번 협력으로 여러 세대에 걸친 전용 CPU를 개발하며, AI 컴퓨팅 효율성을 크게 향상시킬 예정입니다.\n\n---\n\n- **파트너십:** Meta × Arm 장기 전략 협력\n- **성능:** AI 워크로드 기준 x86 대비 2배 이상\n- **목적:** Meta 자체 AI 인프라 맞춤형 CPU 설계\n- **향후:** 여러 세대에 걸친 전용 CPU 로드맵",
            source: "https://x.com/Meta_Engineers/status/2036494803723043156",
            officialUrl: "https://x.com/Meta_Engineers/status/2036494803723043156",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVjjxpD2Sz",
          },
          {
            date: "3/25 03:07", platform: "Threads",
            title: "클라우드 AI를 독립시킨다 — Meta의 자체 AI 칩 전략",
            summary: "데이터센터 AI 워크로드 최적화 CPU 협력 — 클라우드 AI 인프라 독립화",
            content: "Meta + Arm CPU 파트너십 발표 — 다세대 AI 인프라용 맞춤형 CPU 공동 개발.\n첫 세대 Arm AGI CPU는 기존 대비 2배 이상 성능 향상.\n\n**NVIDIA GPU 의존에서 벗어나려는 움직임이에요.**\n자체 CPU로 AI 인프라 비용을 장기적으로 낮추는 전략입니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRtqYkj5gi",
          },
        ],
      },
      {
        name: "이미지 / 영상 / 음악",
        color: "#EC4899",
        posts: [
          {
            date: "3/25 22:52", platform: "X+Threads",
            title: "생각하면서 그린다 — Luma Uni-1이 바꾼 이미지 생성의 규칙",
            summary: "추론과 이미지 생성을 단일 패스로 처리하는 새로운 멀티모달 아키텍처",
            content: "Luma Uni-1 출시 — 생각과 픽셀 생성을 동시에 수행하는 새로운 모델.\n\n- 문화적 맥락 인지 (밈/미학/망가)\n- 인간 선호도 Elo 랭킹 1위 (Overall / Style & Editing / Reference-Based Generation)\n- 텍스트-이미지는 2위\n\n실시간 비전 생성의 새로운 기준 제시.",
            officialUrl: "https://x.com/LumaLabsAI/status/2036107826498544110",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWT0x0Lj2wG",
          },
          {
            date: "3/25 18:48", platform: "X+Threads",
            title: "5배 빠르고 2K 해상도 — Midjourney V8이 기준을 다시 썼다",
            officialUrl: "https://x.com/midjourney/status/2034015403542974793",
            summary: "5배 빠른 속도, 2K 네이티브 해상도, SREF 강화 — AI 이미지 생성의 새 기준",
            content: "Midjourney V8 정식 출시.\n\n주요 업그레이드:\n- 생성 속도 5배 향상\n- 2K 네이티브 해상도 지원\n- 텍스트 렌더링 정확도 대폭 향상\n- SREF(Style Reference) 기능 강화\n- 프롬프트 이해도 전반적 개선\n- 인물 일관성(Character Reference) 개선",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWT7NYIj2E3",
          },
          {
            date: "3/20 14:52", platform: "X+Threads",
            title: "AI 음악을 팔 수 있게 됐다 — ElevenLabs 음악 마켓플레이스",
            officialUrl: "https://x.com/elevenlabsio/status/1952754097976721737",
            summary: "AI 생성 음악 거래 플랫폼 — 크리에이터가 AI 음악을 판매하는 마켓플레이스",
            content: "ElevenLabs가 AI 생성 음악 마켓플레이스를 오픈했습니다.\n\n크리에이터가 AI로 만든 음악을 직접 판매하고 구매할 수 있는 플랫폼입니다. 유튜브 배경음악, 팟캐스트 인트로, 광고 음악 등 실용적인 AI 음악 거래가 가능해졌습니다.\n\nAI 음악 창작 → 상업적 유통의 전체 파이프라인이 ElevenLabs 하나로 완결되는 구조입니다.",
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "여러 장면을 한 번에 연결한다 — Runway Multi-Shot App 출시",
            summary: "Runway Multi-Shot App 출시",
            content: "Runway가 Multi-Shot App을 출시했습니다.\n\n프롬프트 하나로 대화, 음향 효과, 의도적인 컷, 페이싱, 시네마틱 프레이밍까지 자동으로 갖춘 씬을 만들어냅니다.\n\n이미지→영상, 텍스트→영상 두 워크플로우 모두 지원. Gen-4.5 기반으로 단순 클립 생성을 넘어 스토리텔링 단위의 영상 제작이 가능해졌습니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWXyUt0jwYK",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037359887987216422"
          }
        ],
      },
      {
        name: "기타",
        color: "#6B7280",
        posts: [
          {
            date: "3/25 16:47", platform: "X+Threads",
            title: "한국판 오픈AI가 온다 — 카카오 Kanana-o API 베타 공개",
            summary: "9.8B 옴니 모델, Agentic AI 특화, Apache 2.0 오픈소스 — 한국형 AI API",
            source: "https://api-omni.kanana.ai/",
            content: "카카오가 Kanana-o API 베타를 공개했습니다.\n\n9.8B 옴니 모델로 Agentic AI에 특화. Apache 2.0 오픈소스로 공개됩니다.\n\n텍스트·이미지·음성을 모두 처리하는 멀티모달 모델이며, 한국어 성능에 최적화됐습니다. 국내 AI 생태계에서 GPT·Claude와 경쟁할 수 있는 첫 번째 진지한 시도입니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWTLA81j3Vo",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2036711028122386634",
          },
          {
            date: "3/24 22:50", platform: "Threads",
            title: "디자인에서 코드로 바로 — Copilot이 Figma 디자인을 직접 읽는다",
            officialUrl: "https://x.com/figma/status/2036434766661296602",
            summary: "Figma 디자인에서 코드로 — MCP 통해 디자인 토큰 직접 읽는 Copilot 에이전트",
            content: "GitHub Copilot과 Figma MCP 통합 소식.\n\n- Copilot 에이전트가 Figma 디자인 토큰과 구조를 직접 읽는 흐름\n- 디자인 산출물을 코드 구현으로 더 짧게 연결하는 방향\n- MCP를 통해 디자인 시스템 맥락을 개발 도구에 전달하는 사례",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRQJZVD0O1",
          },
          {
            date: "3/26 07:17", platform: "X+Threads",
            title: "AGI를 측정하는 새 잣대 — ARC-AGI-3 공개",
            officialUrl: "https://x.com/fchollet/status/2036863769981403497",
            summary: "AGI 측정 새 기준점 — 기존 ARC-AGI보다 어렵고 다양한 추론 평가 체계",
            content: "ARC-AGI-3 벤치마크 공개 요약.\n\n- 기존 ARC-AGI보다 더 어렵고 다양한 추론 과제를 포함\n- 단순 정답률이 아니라 일반화와 문제 해결 능력을 더 엄격하게 측정\n- AGI 수준 추론 평가 기준을 다시 끌어올리려는 시도로 보임\n\n직접 풀어볼 수 있어요 → arcprize.org",
            source: "https://arcprize.org/",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVRfebjz5Q",
          },
          {
            date: "3/20 22:58", platform: "X+Threads",
            title: "Gmail, Docs, Sheets, Meet — Google 전 제품에 Gemini가 들어갔다",
            summary: "Gemini가 Gmail, Docs, Sheets, Meet 전체에 내장 — AI 워크스페이스 완성",
            content: "Google Workspace 전 제품(Gmail, Docs, Sheets, Meet 등)에 Gemini AI가 전면 통합됩니다. 요약, 초안 작성, 데이터 분석이 모든 워크스페이스 도구에서 가능해집니다.",
          },
          {
            date: "3/20 14:49", platform: "X+Threads",
            title: "AI가 증상을 분석한다 — Perplexity Computer의 의료 데이터베이스 연동",
            summary: "의료 데이터베이스와 연결된 AI 에이전트 — 증상 분석 및 의료 정보 검색",
            content: "Perplexity Computer가 헬스케어 서비스와 연동됩니다.\n\n의료 정보 검색, 약물 상호작용 확인, 증상 분석 등을 AI 에이전트가 자율적으로 수행합니다. 의료 데이터베이스에 직접 접근해 전문 의학 정보를 검색하고 정리합니다.\n\nAI가 단순 검색을 넘어 의료 컨텍스트를 이해하고 관련 정보를 종합하는 수준으로 발전했습니다. 의사 보조 도구로서의 가능성이 열리고 있습니다.",
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "AI가 Figma 캔버스에 직접 그린다 — Figma MCP 첫 데모",
            summary: "Figma MCP — AI가 캔버스에 직접 디자인",
            officialUrl: "https://x.com/figma/status/2036434766661296602",

            content: "Figma가 MCP(Model Context Protocol)를 공식 지원합니다.\n\nClaude Code나 Cursor에서 Figma 파일을 직접 읽고 수정할 수 있게 됐습니다. 디자인 토큰, 컴포넌트 속성, 레이아웃 정보를 코드 에이전트가 직접 파싱.\n\n\"이 버튼 색을 #E87040으로 바꿔줘\"라고 말하면 Figma 캔버스에 바로 반영됩니다. 디자인-개발 핸드오프의 개념이 바뀌는 시작점입니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWXl0uODxVT",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037331806505283895"
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "말로 자동화를 만든다 — n8n의 MCP 자연어 워크플로우",
            summary: "n8n MCP 통합 — 자연어로 워크플로우 생성",
            content: "n8n이 MCP를 통합해 자연어로 자동화 워크플로우를 생성합니다.\n\nClaude나 Cursor에서 이메일 수신 시 Slack 알림 전달 같은 자동화를 말로 지시하면 n8n이 직접 워크플로우를 구성합니다.\n\n22개 특화 도구와 10,000개 이상의 검증된 템플릿을 지원합니다. Zapier·Make보다 유연하며 코드 없이 복잡한 자동화를 AI가 대신 만들어주는 no-code + AI 조합입니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWXkoUGjyiS",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037329949452116216",
            source: "https://synta.io/blog/n8n-mcp-integration"
          }
        ],
      },
    ],
  },
  {
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
          { date: "3/19 18:30", platform: "X", title: "Anthropic 81K 직원 조사 발표", summary: "81,000명 대상 AI 사용 패턴 연구 — 생산성 영향 정량 분석", content: "81,000명 대상 AI 사용 패턴 연구 — 생산성 영향 정량 분석" },
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
          { date: "3/17 03:25", platform: "X+Threads", title: "Perplexity Comet + Computer 기능 확장", summary: "브라우저 에이전트 Comet에 Computer Use 기능 통합", content: "브라우저 에이전트 Comet에 Computer Use 기능 통합" },
          { date: "3/17 01:22", platform: "X+Threads", title: "Perplexity Computer 안드로이드 출시", summary: "모바일 에이전트 정식 공개 — 안드로이드 화면 자율 제어", content: "모바일 에이전트 정식 공개 — 안드로이드 화면 자율 제어" },
          { date: "3/22 19:05", platform: "X", title: "Mistral Forge 엔터프라이즈 출시", summary: "기업용 파인튜닝 플랫폼 — 프라이빗 Mistral 모델 구축 서비스", content: "기업용 파인튜닝 플랫폼 — 프라이빗 Mistral 모델 구축 서비스" },
          { date: "3/17 13:00", platform: "X+Threads", title: "Mistral Small 4 (119B, Apache 2.0)", summary: "오픈소스 최강 경량 모델 — Apache 2.0으로 자유롭게 활용 가능", content: "오픈소스 최강 경량 모델 — Apache 2.0으로 자유롭게 활용 가능" },
          { date: "3/17 05:21", platform: "X+Threads", title: "xAI Grok TTS API 5가지 음성 공개", summary: "Grok 기반 텍스트-음성 변환 API — 5가지 음성 스타일 선택 가능", content: "Grok 기반 텍스트-음성 변환 API — 5가지 음성 스타일 선택 가능" },
          { date: "3/19", platform: "X+Threads", title: "LTX-Video 2.3 업데이트", summary: "고품질 AI 비디오 생성 모델 — 해상도 및 일관성 대폭 개선", content: "고품질 AI 비디오 생성 모델 — 해상도 및 일관성 대폭 개선" },
          { date: "3/19", platform: "X+Threads", title: "Visa CLI + AI 에이전트 결제 인프라", summary: "에이전트가 직접 결제하는 시대 — Visa API로 자율 결제 가능", content: "에이전트가 직접 결제하는 시대 — Visa API로 자율 결제 가능" },
          { date: "3/19 18:50", platform: "X+Threads", title: "NVIDIA 오픈 모델 데이터셋 공개", summary: "학습 데이터 오픈소스화 — AI 연구 생태계 기여", content: "학습 데이터 오픈소스화 — AI 연구 생태계 기여" },
          { date: "3/18", platform: "X+Threads", title: "ChatGPT 모델 셀렉터 UI 개선", summary: "더 직관적인 모델 선택 인터페이스 — GPT-4o/4/3.5 전환 간소화", content: "더 직관적인 모델 선택 인터페이스 — GPT-4o/4/3.5 전환 간소화" },
        ],
      },
    ],
  },
];

export function getWeek(slug: string): WeeklyData | undefined {
  return weeks.find((w) => w.slug === slug);
}

export function getLatestSlug(): string {
  return weeks[0].slug;
}

export function getAllSlugs(): string[] {
  return weeks.map((w) => w.slug);
}

export function getWeekList() {
  return weeks.map(w => ({ slug: w.slug, week: w.week, year: w.year })).reverse();
}
