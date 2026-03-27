export interface Post {
  date: string;
  platform: "X" | "Threads" | "X+Threads";
  title: string;
  featured?: boolean;
  summary?: string;      // 한줄 요약 (카드)
  content?: string;      // 전문 / 포스팅 본문
  source?: string;       // 원본 소스 URL
  threadsUrl?: string;
  xUrl?: string;
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
            date: "3/26 20:41", platform: "Threads",
            title: "한국은 AI를 가장 잘 쓰면서 패배할 수 있다 — 문제는 실력이 아니다",
            summary: "한국의 AI 활용 역설 — 사용률은 높지만 구조적 패배 가능성을 분석한 아티클",
            content: "한국이 AI를 가장 잘 쓰고도 결국 패배할 수도 있는 이유.\n\n읽으면서 뜨끔한 부분이 많았던 아티클이에요.\n\n흑백개발자 해커톤에서 한국 최고 수준 개발자 80명이 30시간 동안 만든 결과물이 썸네일 편집기와 AI 공포 마케팅 구독 서비스였다는 이야기부터 시작합니다.\n\n실력이 없어서가 아니라, 풀려고 한 문제의 수준이 낮았다는 지적이에요.\n\nethancho12.substack.com/p/ai-d53\n\n아티클에서 흥미로운 분석이 있었어요.\n\n한국은 소비자 입장에서 불편이 거의 없는 나라라서, \"AI로 뭘 만들까\" 하고 앉으면 떠오르는 문제의 수준이 낮을 수밖에 없다는 거예요.\n\n배달은 빠르지만 자영업자 마진은 깎이고, 결제는 편한데 정산 구조는 엉망이고, 병원 예약은 쉬운데 의료 데이터는 병원마다 따로 논다고요.\n\n불편은 넘치는데 소비자 눈에 안 보일 뿐이라는 지적이 날카로웠어요.\n\n가장 뜨끔했던 부분은 이거예요.\n\n토스 공동창업자 이태양이 개발에서 10년 손 떼고 복귀했는데, 본인 실력이 예전보다 오히려 좋아졌다고 말했대요. AI가 실행을 대신 해주기 때문이라고요.\n\n코딩 실력 차이는 AI가 메워주는 시대에, 남는 건 \"무슨 문제를 푸느냐\"라는 이야기입니다.\n\n교육 시스템에 대한 분석도 있었어요.\n\n수능이라는 게 결국 주어진 문제를 정해진 시간 안에 정확하게 푸는 훈련인데, \"이게 왜 문제인가\"를 질문하는 연습은 12년 내내 한 번도 하지 않는다고요.\n\n그래서 세계 최고의 문제 풀이 능력이 나왔는데, 바로 그 구조가 AI 시대에는 가장 큰 약점이 될 수 있다는 분석이에요.\n\n마지막 문장이 인상적이었어요.\n\n\"지금 한국에 필요한 건 더 좋은 AI 툴이 아니라 더 좋은 질문이다.\"\n\n동의하든 반박하든, 한번 읽어볼 만한 글이에요. 링크는 첫 글에 있습니다.\n\n---",
            source: "https://ethancho12.substack.com/p/ai-d53",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWWKE-Fj-6k",
          },
          {
            date: "3/26 19:56", platform: "Threads",
            title: "Claude Code 고수들의 비밀 5가지 — 당신이 매번 시간 낭비하는 이유",
            summary: "CLAUDE.md 활용법, /resume, 서브에이전트, MCP 핵심 팁 정리",
            content: "Claude Code 쓰는데 매번 같은 실수하고 있을 수 있어요.\n\n컨텍스트 관리 안 하면 중간에 맥락 잃고, CLAUDE.md 안 쓰면 매번 같은 설명 반복하고, /resume 모르면 긴 작업마다 처음부터 다시 시작하게 됩니다.\n\nExplore → Plan → Execute → Commit 프레임워크 하나면 해결돼요.\n\nx.com/AnthropicAI/status/2036944806317088921\n\nCLAUDE.md가 핵심이에요.\n\n프로젝트 루트에 놓으면 Claude가 프롬프트보다 더 엄격하게 따릅니다. 코딩 스타일, 네이밍 규칙, 금지 패턴을 적어두면 매번 설명할 필요가 없어져요.\n\n300줄 이하로 유지하는 게 포인트입니다. 길면 오히려 무시하기 시작해요.\n\n서브에이전트와 훅은 파워 유저 영역이에요.\n\n서브에이전트는 복잡한 작업을 하위 에이전트에게 위임해서 병렬로 처리합니다. 훅은 특정 이벤트(커밋 전, 파일 저장 후 등)에 자동 실행되는 스크립트예요.\n\nMCP 서버를 연결하면 GitHub PR 리뷰, Sentry 에러 체크, Jira 업데이트를 한 세션에서 전부 처리할 수 있어요.\n\n정리하면 이 순서예요.\n\n1단계: CLAUDE.md 만들기 (규칙 300줄 이하)\n2단계: Explore-Plan-Execute-Commit 프레임워크 적용\n3단계: /resume으로 긴 작업 이어가기\n4단계: 서브에이전트 + 훅 + MCP 서버로 확장\n\n원문 22분 가이드 전체는 AI Tinkerers에 있어요.\n\n---",
            source: "https://post-training.aitinkerers.org/p/claude-code-tips-and-tricks",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWWE2Hhj0s2",
          },
          {
            date: "3/26 18:09", platform: "Threads",
            title: "93%가 무조건 Y를 눌렀다 — Anthropic이 자율 모드를 만든 이유",
            summary: "2단계 분류기, 3등급 행동 체계, 승인 피로 해결 메커니즘 완전 분석",
            content: "\"허가하시겠습니까?\" [Y/n]\n\nClaude Code 써본 분이라면 이 화면이 익숙할 거예요. 파일 수정할까요? Y. 명령 실행할까요? Y. 패키지 설치할까요? Y.\n\nAnthropic이 데이터를 봤더니, 사용자의 93%가 그냥 Y를 누르고 있었습니다. 안전장치가 너무 자주 울리면 사람들은 경보 자체를 무시하기 시작해요. 이게 바로 승인 피로입니다.\n\nx.com/AnthropicAI/status/2036944806317088921\n\nAnthropic의 답은 Auto Mode예요. 허가를 없애되, 감시는 강화하는 구조입니다.\n\n단순히 모든 허가를 건너뛰는 게 아니에요. 그건 --dangerously-skip-permissions로 이미 가능했거든요. 이름부터 위험하죠.\n\nAuto Mode는 사람 대신 AI가 매 행동을 실시간으로 심사합니다. 두 겹의 방어층이에요.\n\n입력층에서는 서버 측 프롬프트 주입 탐지기가 파일 읽기, 웹 조회, 셸 출력을 검사합니다. 조작 시도가 숨어있으면 경고를 붙여요.\n\n출력층에서는 Sonnet 4.6 기반 분류기가 Claude의 모든 행동을 실행 직전에 판단합니다. 분류기는 2단계 필터링이에요. 1단계에서 빠르게 Yes/No 판단하고, 수상한 것만 2단계 정밀 추론으로 넘깁니다.\n\n재밌는 설계 결정이 있어요.\n\n분류기는 사용자 메시지와 도구 호출만 봅니다. Claude가 스스로 쓴 텍스트는 일부러 제거해요.\n\n이유는 Claude가 \"이건 안전한 작업이에요\"라고 자기 행동을 정당화하면 분류기가 설득당할 수 있기 때문이에요. 자기 변호를 차단하는 거죠.\n\n행동은 위험도에 따라 3등급으로 나뉩니다.\n\nTier 1: 무조건 허용 (파일 읽기 같은 비파괴 작업)\nTier 2: 분류기 없이 허용 (프로젝트 내 파일 수정, git으로 추적 가능)\nTier 3: 분류기 검사 필수 (셸 명령, 외부 웹 요청, MCP 도구 호출)\n\n모든 행동을 같은 무게로 취급하지 않는 게 핵심이에요.\n\n실제 성능 수치입니다. 10,000건 실제 트래픽 테스트 결과:\n\n1단계 필터만으로 거짓 양성률 8.5%\n1단계+2단계 합치면 거짓 양성률 0.4%\n\n하지만 솔직한 부분도 있어요. 실제 과도한 행동 52건 중 거짓 음성률 17%. 10번 중 2번은 놓칩니다.\n\nAnthropic도 인정합니다. \"인간 검토를 대체할 수 없다\"고요.\n\n실제 체감은 확실히 달라요.\n\n12개 파일 리팩토링 기준으로 수동 승인 47분, Auto Mode 11분. 4배 빠르면서 분류기가 위험한 삭제 2건을 잡아냈어요.\n\n더 빠르면서 더 안전한 조합. 드문 케이스입니다.\n\n---",
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
            content: "Claudian이 Obsidian을 Claude Code 작업 공간으로 바꿔놓았습니다.\n\n단순한 챗봇 사이드바가 아닙니다. 볼트 자체가 Claude의 작업 디렉토리가 되어 파일 읽기/쓰기, 검색, bash 명령어, 다단계 워크플로우까지 전부 가능합니다.\n\nObsidian + AI의 판도를 바꾸는 플러그인입니다.\n\nx.com/tom_doerr/status/2036564539748049212\n\nClaudian이 다른 AI 플러그인과 다른 점은 이겁니다. 볼트 자체가 컨텍스트예요. 복사 붙여넣기가 필요 없습니다.\n\n@멘션으로 파일 참조, 태그로 제외, 에디터 선택 영역 첨부까지 됩니다. 이미지도 드래그앤드롭으로 바로 분석 가능하고, 인라인 편집은 단어 수준 diff 미리보기를 지원합니다.\n\n오픈소스이고 MIT 라이선스입니다. Obsidian과 Claude를 함께 쓰고 있다면, 이게 그동안 빠져있던 퍼즐 조각이에요.\n\ngithub.com/YishenTu/claudian\n\n이런 워크플로우가 가능해집니다.\n\n1. Obsidian에서 노트 열기\n2. Claude가 볼트 구조를 읽기\n3. \"이 프로젝트 리팩토링해줘\" 한마디\n4. Claude가 파일 수정, 테스트 실행, 커밋까지 전부 처리\n\n터미널 전환 없이 노트와 에이전트만으로 개발하는 시대입니다.\n\n파워 기능도 강력합니다.\n\n슬래시 커맨드로 재사용 가능한 프롬프트 템플릿을 만들 수 있고, Skills 모듈은 컨텍스트에 따라 자동 실행됩니다. Claude Code 포맷과 호환돼요.\n\n커스텀 서브에이전트도 정의할 수 있고, ~/.claude/plugins에서 플러그인을 자동 인식합니다.\n\n---",
            source: "https://x.com/tom_doerr/status/2036564539748049212",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVZ2fYDwOg",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037022613424468120",
          },
          {
            date: "3/25 19:37", platform: "Threads",
            title: "기획자·생성자·평가자 — Anthropic식 AI 팀 구성의 비밀",
            summary: "생성자/평가자/기획자 3인조 멀티에이전트 아키텍처 완전 분석",
            content: "Anthropic Engineering Blog의 하네스 구조 심층 분석.\n\n3인조 체계:\n- 생성자(Generator): 코드/콘텐츠 생성\n- 평가자(Evaluator): 품질 검증\n- 기획자(Planner): 전략 수립 및 조율\n\n문맥 불안(context anxiety) 해결:\n- 각 에이전트가 독립적 컨텍스트 유지\n- 공유 메모리로 협업\n- 실패 시 자동 재시도 로직",
            source: "https://anthropic.com/engineering/harness-design-for-long-running-application-development",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWTdz_Gj4cA",
          },
          {
            date: "3/25 14:25", platform: "X+Threads",
            title: "승인 없이 스스로 판단하는 Claude — Auto Mode 안전 설계 원리",
            summary: "권한 자동 판단 + AI 세이프가드 — 승인 없이 안전하게 자율 실행",
            content: "Claude Code auto mode 공식 출시 소식 요약.\n\n- 각 행동을 AI 분류기가 실시간으로 분석해 자동 승인 여부를 결정\n- 안전한 작업은 바로 실행하고 위험한 작업만 별도 확인 요청\n- 승인 피로를 줄이면서도 세이프가드를 유지하는 방식\n- 실사용 플래그는 claude --auto",
            source: "https://claude.com/blog/auto-mode",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWS6YXrj-qq",
          },
          {
            date: "3/25 07:23", platform: "Threads",
            title: "Anthropic이 공개한 에이전트 팀 운영법 — 장기 앱 개발의 새 공식",
            summary: "장기 실행 앱 개발을 위한 멀티에이전트 하네스 설계 공식 블로그",
            content: "Anthropic Engineering Blog의 장기 실행 앱 개발용 멀티에이전트 하네스 글 공유.\n\n핵심 포인트:\n- 생성자, 평가자, 기획자 역할을 분리해 긴 작업을 안정적으로 수행\n- 단일 에이전트보다 문맥 혼잡을 줄이고 재시도 구조를 만들기 쉬움\n- 장기 실행 애플리케이션 개발에서 협업형 에이전트 구조가 중요하다는 메시지",
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
            content: "Claude 학습 효율을 크게 높여주는 프롬프트 10종 큐레이션.\n\n- 개념 설명, 퀴즈 생성, 오답 분석, 단계별 튜터링 등 학습 목적별 프롬프트를 정리\n- 단순 요약이 아니라 이해 확인과 반복 학습까지 포함한 구성\n- Claude를 개인 교사처럼 쓰는 실전 활용 예시 모음",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRUSzND55k",
          },
          {
            date: "3/24 15:51", platform: "X+Threads",
            title: "터미널 밖에서 에이전트를 지휘한다 — Claude Code의 텔레그램·디스코드 연동",
            summary: "Claude Code와 메시징 플랫폼 직접 연동 — 채널에서 코딩 에이전트 제어",
            content: "Claude Code와 메시징 플랫폼 직접 연동 — 채널에서 코딩 에이전트 제어",
          },
          {
            date: "3/24 15:23", platform: "X+Threads",
            title: "Computer Use 다음은 Phone Use — Claude가 스마트폰을 직접 조작한다",
            summary: "Computer Use에 이은 Phone Use — AI가 스마트폰을 직접 제어하는 에이전트",
            content: "Anthropic Phone Use (mobile) 개발 중 — Claude가 모바일 기기에서 전화 걸기 + 작업 실행 가능\n\nComputer Use의 확장판 (데스크탑 → 모바일). 곧 Claude Cowork/Code Research Preview 출시 예정. M1Astra 발견 🪐\n\n지금까지 Computer Use는 macOS 데스크탑에서만 가능했는데, 이제 모바일 기기까지 제어 범위가 확장되는 거죠. Claude Dispatch로 폰에서 명령 → 데스크탑 실행은 가능했지만, 이번엔 폰 자체를 Claude가 직접 제어하는 방향.\n\n음성 통화 자동 실행 + 앱 조작 + 스케줄 관리까지 모바일 AI 에이전트 완성도가 높아질 것 같습니다.\n\nComputer Use가 데스크탑이었다면 Phone Use는 모바일이에요. Claude가 전화 걸고 앱 조작하는 시대가 오고 있습니다.",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWQdAQ7D1zH",
          },
          {
            date: "3/24 09:17", platform: "X+Threads",
            title: "Claude가 내 맥을 직접 클릭한다 — macOS 컴퓨터 제어 첫 데모",
            summary: "Claude가 macOS 화면을 직접 보고 클릭·입력하는 컴퓨터 제어 에이전트",
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
            content: "Claude Code에서 특정 조건이 충족될 때 자동으로 스킬을 불러오는 트리거 자동화 시스템입니다.",
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
            content: "Anthropic이 Claude Dispatch를 공개했습니다.\n\n모바일 폰으로 Claude Cowork(데스크톱 AI 에이전트)를 원격 제어하는 기능이에요.\n\n데스크톱과 모바일이 하나의 persistent thread로 동기화됩니다.\n\nThe New Stack은 이걸 \"OpenClaw 대항마\"라고 불렀어요.\n\n어떻게 작동하나요?\n\nClaude Cowork는 데스크톱에서 돌아가는 AI 에이전트예요. 파일 관리, 이메일, 브라우징, 코딩 작업을 대신 처리합니다.\n\nDispatch는 이 Cowork 세션을 폰에서 시작하고, 중간에 확인하고, 결과를 받을 수 있게 해요.\n\n\"회의 중에 폰으로 작업 시켜두고, 돌아오면 완료돼 있다\"는 시나리오가 핵심입니다.\n\n3월 24일, Anthropic이 Computer use 기능을 Cowork에 추가했어요.\n\nClaude가 사용자 컴퓨터를 직접 제어할 수 있게 됐습니다. 앱 실행, 클릭, 타이핑, 스크린샷까지.\n\nDispatch + Computer use 조합으로, 폰에서 \"Slack에서 이번 주 미팅 요약해줘\" 같은 명령을 내리면 Claude가 데스크톱에서 실행하고 결과를 폰으로 돌려줍니다.\n\n\"Claude가 실수할 수 있고, 위협은 계속 진화한다\"는 게 Anthropic의 경고예요.\n\n안전장치:\n- 새 앱 접근 전 항상 권한 요청\n- 사용자가 명시적으로 승인해야 실행\n- 민감한 작업(금융, 개인정보)은 추가 확인\n\nComputer use는 강력하지만 조심스럽게 풀고 있습니다.\n\nThe New Stack이 직접 비교했어요.\n\nOpenClaw: 오픈소스, 자체 호스팅, 로컬 우선, 커뮤니티 확장\nDispatch: Anthropic 공식, 클라우드 동기화, Cowork 전용\n\nDispatch는 \"모바일 제어\"라는 UX 포인트로 OpenClaw와 정면 경쟁합니다.\n\nAI 에이전트 경쟁이 기능에서 접근성으로 넘어가고 있어요.\n\n---",
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
            content: "크리에이터를 위한 Claude 프롬프트 50개가 정리됐어요.\n\n개발자가 아니라 콘텐츠 제작자를 위한 프롬프트예요. 글쓰기, 영상 대본, SNS, SEO, 이메일 마케팅, 브랜드 보이스까지.\n\n각 프롬프트가 복사해서 바로 쓸 수 있는 형태입니다.\n\nbuilder.io/blog/claude-prompts\n\n특히 유용한 건 브랜드 보이스 프롬프트예요. \"내 기존 콘텐츠 3개를 분석해서 톤, 어휘, 문장 구조 패턴을 뽑아줘\"처럼 구체적으로 지시하면 일관된 브랜드 톤을 유지할 수 있어요.\n\n개발자 프롬프트는 넘치는데 크리에이터용은 드물어서 가치가 있습니다.\n\n---",
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
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWR8staE_tA",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2036538807177322904",
          },
          {
            date: "3/24 13:17", platform: "X+Threads",
            title: "ChatGPT에 갤러리가 생겼다 — AI 이미지 히스토리 관리 탭 추가",
            summary: "AI 생성 이미지 전용 갤러리 탭 — ChatGPT 내 이미지 히스토리 관리",
            content: "ChatGPT에 Library 탭 추가.\n\n기능:\n- DALL-E로 생성한 이미지 전체 보관\n- 날짜/프롬프트 기반 검색\n- 생성 이미지 재편집 및 변형\n- 갤러리 뷰로 한눈에 확인",
          },
          {
            date: "3/24 03:17", platform: "X+Threads",
            title: "Python 생태계를 인수했다 — OpenAI의 Astral 흡수와 그 의미",
            summary: "Python 패키지 관리 도구 Astral 인수 — ChatGPT/Codex와 Python 생태계 통합",
            content: "OpenAI가 Astral(uv, ruff 개발사) 인수 발표.\n\nAstral의 주요 도구:\n- uv: 초고속 Python 패키지 관리자\n- ruff: 초고속 Python 린터\n\nChatGPT/Codex 에이전트가 Python 환경을 자동으로 설정하는 워크플로우 강화 예상.",
          },
          {
            date: "3/23 21:17", platform: "X+Threads",
            title: "작고 빠른 GPT-5.4 mini — 저비용 추론의 새 선택지",
            summary: "경량 고속 모델 GPT-5.4 mini API 공개 — 저비용 추론 특화",
            content: "경량 고속 모델 GPT-5.4 mini API 공개 — 저비용 추론 특화",
          },
          {
            date: "3/21 02:58", platform: "X",
            title: "학생은 무료로 — OpenAI AI 코딩 에이전트 교육 프로그램",
            summary: "학생 대상 무료 AI 코딩 에이전트 — 교육 목적 Codex 접근권 제공",
            content: "학생 대상 무료 AI 코딩 에이전트 — 교육 목적 Codex 접근권 제공",
          },
        ],
      },
      {
        name: "Google / DeepMind",
        color: "#4285F4",
        posts: [
          {
            date: "3/26 10:57", platform: "Threads",
            title: "3분짜리 프로 음악을 AI가 만든다 — Lyria 3 Pro가 바꾸는 창작의 경계",
            summary: "3분 길이 프로 퀄리티 음악 생성 — Lyria 3 Pro로 음악 창작의 한계 돌파",
            content: "Google DeepMind x Agile Robots 파트너십 발표\nGemini foundation 모델을 로봇 하드웨어에 통합해 차세대 실용 로봇을 개발합니다.\n\n(Lyria 3 Pro 관련 정보)\n- 최대 3분 길이 고품질 음악 트랙 생성\n- 인트로, 벌스, 코러스, 브리지를 포함한 완전한 곡 구성\n- Google AI Studio API로 개발자 접근 가능\n- Gemini App 통합 (유료 구독자 사용 가능)\n\n---",
            source: "https://x.com/GoogleDeepMind/status/2036836176233918707",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVH56bj902",
          },
          {
            date: "3/25 06:49", platform: "Threads",
            title: "뇌와 몸의 결합 — DeepMind 알고리즘이 로봇 몸통을 얻다",
            summary: "로봇 AI 연구 협업 — DeepMind 알고리즘 + Agile Robots 하드웨어 결합",
            content: "Google DeepMind와 Agile Robots의 협업 발표 요약.\n\n- DeepMind의 로봇 AI 알고리즘과 Agile Robots의 하드웨어 플랫폼을 결합\n- 연구 수준 모델을 실제 산업 로봇 환경으로 옮기려는 시도\n- 지능형 로보틱스 상용화 속도를 높일 협력으로 해석 가능",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWSGgURE3h7",
          },
          {
            date: "3/25 03:01", platform: "Threads",
            title: "더 작고 더 빠른 Gemini — 모바일에서 달리는 Flash-Lite",
            summary: "초경량 고속 Gemini 모델 — 모바일/엣지 환경 특화 추론",
            content: "Gemini 3.1 Flash-Lite 공개.\n\n특징:\n- 기존 Flash 대비 50% 빠른 추론\n- 모바일 온디바이스 실행 최적화\n- 멀티모달 (텍스트+이미지)\n- API 비용 대폭 인하",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRsU8Fj_Xc",
          },
          {
            date: "3/23 13:17", platform: "X",
            title: "말로 UI를 만든다 — Google Stitch에 음성 입력이 추가됐다",
            summary: "Text-to-UI 생성 도구 기능 확장 — 음성 입력, 컴포넌트 라이브러리 추가",
            content: "Google Stitch UI 생성 도구가 업데이트됐습니다. 텍스트-투-UI, 이미지-투-UI 등 새로운 기능이 추가되었습니다.",
          },
          {
            date: "3/21 00:58", platform: "X",
            title: "Gemini 하나로 풀스택을 짠다 — AI Studio 바이브 코딩 데모",
            summary: "Gemini로 프론트엔드+백엔드 동시 생성 — full-stack 앱 바이브 코딩 시연",
            content: "Google AI Studio에서 full-stack 앱을 vibe coding 방식으로 빠르게 구현하는 데모입니다. Gemini를 활용한 코드 생성 및 실행을 보여줍니다.",
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
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWUry1Gk0zD",
          },
          {
            date: "3/24 22:45", platform: "Threads",
            title: "코드베이스를 실시간으로 검색한다 — Cursor Instant Grep",
            summary: "코드베이스 실시간 검색 내장 엔진 — grep보다 빠른 의미론적 코드 검색",
            content: "Cursor에 Instant Grep 기능 통합.\n\n- 코드베이스 전체 실시간 인덱싱\n- 심볼/함수/클래스 즉시 검색\n- 의미론적 검색 (이름 몰라도 기능으로 검색)\n- 검색 결과에서 바로 편집",
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
            content: "Elon Musk의 xAI가 자체 AI 칩 설계·제조 시설 Terafab을 발표했습니다. NVIDIA 의존도 탈피와 Grok 전용 최적화를 목표로 합니다.",
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
            date: "3/26 14:58", platform: "Threads",
            title: "AGI를 위한 칩을 함께 만든다 — Meta와 Arm CPU 협력 전면 해부",
            summary: "AGI 워크로드 전용 CPU 공동 개발 — 기존 대비 2배 성능, AI 추론 특화",
            content: "Meta와 Arm이 AGI 특화 CPU 공동 개발 발표.\n\n주요 스펙:\n- AI 추론 전용 명령어셋 설계\n- 기존 Arm CPU 대비 2배 성능\n- 에너지 효율 40% 향상\n- Meta 데이터센터 우선 적용\n\n2025년 하반기 첫 실리콘 타겟.",
            source: "https://x.com/Meta_Engineers/status/2036494803723043156",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWVjjxpD2Sz",
          },
          {
            date: "3/25 03:07", platform: "Threads",
            title: "클라우드 AI를 독립시킨다 — Meta의 자체 AI 칩 전략",
            summary: "데이터센터 AI 워크로드 최적화 CPU 협력 — 클라우드 AI 인프라 독립화",
            content: "Meta와 Arm의 CPU 파트너십 발표 내용 정리.\n\n- 데이터센터 AI 워크로드에 맞춘 CPU 공동 개발 방향\n- 범용 서버용이 아니라 추론과 대규모 인프라 최적화에 초점\n- 자체 AI 인프라 효율과 독립성을 높이려는 전략으로 볼 수 있음",
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
            content: "Luma AI의 Uni-1 모델 공개.\n\n혁신:\n- Thinking과 Image Generation을 단일 모델에서 동시 처리\n- 추론 과정에서 시각적 표현 생성\n- 텍스트-이미지 일관성 대폭 향상\n- 멀티턴 이미지 편집 지원",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWT0x0Lj2wG",
          },
          {
            date: "3/25 18:48", platform: "X+Threads",
            title: "5배 빠르고 2K 해상도 — Midjourney V8이 기준을 다시 썼다",
            summary: "5배 빠른 속도, 2K 네이티브 해상도, SREF 강화 — AI 이미지 생성의 새 기준",
            content: "Midjourney V8 정식 출시.\n\n주요 업그레이드:\n- 생성 속도 5배 향상\n- 2K 네이티브 해상도 지원\n- 텍스트 렌더링 정확도 대폭 향상\n- SREF(Style Reference) 기능 강화\n- 프롬프트 이해도 전반적 개선\n- 인물 일관성(Character Reference) 개선",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWT7NYIj2E3",
          },
          {
            date: "3/20 14:52", platform: "X+Threads",
            title: "AI 음악을 팔 수 있게 됐다 — ElevenLabs 음악 마켓플레이스",
            summary: "AI 생성 음악 거래 플랫폼 — 크리에이터가 AI 음악을 판매하는 마켓플레이스",
            content: "ElevenLabs가 AI 생성 음악 마켓플레이스를 오픈했습니다. 크리에이터가 AI 음악을 판매하고 구매할 수 있는 플랫폼입니다.",
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "여러 장면을 한 번에 연결한다 — Runway Multi-Shot App 출시",
            summary: "Runway Multi-Shot App 출시",
            content: "Runway Multi-Shot App 출시",
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
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWTLA81j3Vo",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2036711028122386634",
          },
          {
            date: "3/24 22:50", platform: "Threads",
            title: "디자인에서 코드로 바로 — Copilot이 Figma 디자인을 직접 읽는다",
            summary: "Figma 디자인에서 코드로 — MCP 통해 디자인 토큰 직접 읽는 Copilot 에이전트",
            content: "GitHub Copilot과 Figma MCP 통합 소식.\n\n- Copilot 에이전트가 Figma 디자인 토큰과 구조를 직접 읽는 흐름\n- 디자인 산출물을 코드 구현으로 더 짧게 연결하는 방향\n- MCP를 통해 디자인 시스템 맥락을 개발 도구에 전달하는 사례",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWRQJZVD0O1",
          },
          {
            date: "3/26 07:17", platform: "X+Threads",
            title: "AGI를 측정하는 새 잣대 — ARC-AGI-3 공개",
            summary: "AGI 측정 새 기준점 — 기존 ARC-AGI보다 어렵고 다양한 추론 평가 체계",
            content: "ARC-AGI-3 벤치마크 공개 요약.\n\n- 기존 ARC-AGI보다 더 어렵고 다양한 추론 과제를 포함\n- 단순 정답률이 아니라 일반화와 문제 해결 능력을 더 엄격하게 측정\n- AGI 수준 추론 평가 기준을 다시 끌어올리려는 시도로 보임",
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
            content: "Perplexity Computer가 헬스케어 서비스와 연동됩니다. 의료 정보 검색, 약물 상호작용 확인, 증상 분석 등을 자율적으로 수행합니다.",
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "AI가 Figma 캔버스에 직접 그린다 — Figma MCP 첫 데모",
            summary: "Figma MCP — AI가 캔버스에 직접 디자인",
            content: "Figma MCP — AI가 캔버스에 직접 디자인",
            threadsUrl: "https://www.threads.com/@voidlight00/post/DWXl0uODxVT",
            xUrl: "https://x.com/VoidLight_Hyeon/status/2037331806505283895"
          },
          {
            date: "3/27",
            platform: "X+Threads",
            title: "말로 자동화를 만든다 — n8n의 MCP 자연어 워크플로우",
            summary: "n8n MCP 통합 — 자연어로 워크플로우 생성",
            content: "n8n MCP 통합 — 자연어로 워크플로우 생성",
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
