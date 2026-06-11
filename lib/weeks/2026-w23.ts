import type { WeeklyData } from "../data";

// 2026-w23 (5/26 ~ 6/4)
// 자동 생성: verified.json(44 items, all live, date>=2026-05-26) 회사별 그룹.

export const week23: WeeklyData = {
  "week": 23,
  "year": 2026,
  "slug": "2026-w23",
  "period": "5/26 ~ 6/4",
  "totalPosts": 44,
  "companies": [
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "6/2",
          "platform": "X+Threads",
          "title": "OpenAI, 청소년 AI 안전 국제 표준·전담 기구 제안",
          "summary": "OpenAI가 G7 정상회의를 앞두고 청소년 AI 안전을 위한 국제 표준과 전담 기구 설립을 제안했다. 미성년자 식별, 연령 적정 보호, 독립 감사 등 기업이 따라야 할 원칙을 함께 제시했다.",
          "content": "OpenAI가 G7 정상회의를 앞두고 청소년 AI 안전을 위한 국제 표준과 전담 기구 설립을 제안했다. 미성년자 식별, 연령 적정 보호, 독립 감사 등 기업이 따라야 할 원칙을 함께 제시했다.\n\n핵심 사실:\n\n- 정부·연구자·시민사회·산업이 증거와 실무 지침을 공유하는 국제 기구 설립을 제안\n- 연령이 불확실할 때 더 강한 보호로 기본 설정하는 프라이버시 보존형 연령 추정 도입을 원칙으로 제시\n- 보호뿐 아니라 AI 리터러시·기회 확대, 공통 표준 기반 독립 감사 같은 책무 장치를 강조\n- 프랑스 에비앙 G7 정상회의와 파리 OpenAI Forum에서 논의를 이어간다고 밝힘\n- ChatGPT에 18세 미만 강화 보호·부모 통제·연령 예측 시스템으로 이미 반영됐다고 설명\n\n출처: openai.com",
          "source": "https://openai.com/index/advancing-youth-safety-and-opportunity-through-global-leadership/",
          "officialUrl": "https://openai.com/index/advancing-youth-safety-and-opportunity-through-global-leadership/",
          "slug": "advancing-youth-safety-and-opportunity-through-g-058b37ec",
          "tags": [
            "OpenAI",
            "Policy / Safety"
          ]
        },
        {
          "date": "5/29",
          "platform": "X+Threads",
          "title": "OpenAI, Rosalind Biodefense 프로그램 공개",
          "summary": "OpenAI가 게이트형 생명과학 모델 GPT-Rosalind 접근권을 후원해 팬데믹 대비·바이오보안 도구를 짓게 하는 Rosalind Biodefense를 공개했다. 개발자 트랙과 정부 트랙 두 갈래로 방어적 가속을 표방한다.",
          "content": "OpenAI가 게이트형 생명과학 모델 GPT-Rosalind 접근권을 후원해 팬데믹 대비·바이오보안 도구를 짓게 하는 Rosalind Biodefense를 공개했다. 개발자 트랙과 정부 트랙 두 갈래로 방어적 가속을 표방한다.\n\n핵심 사실:\n\n- 검증된 외부 개발자에게 GPT-Rosalind 접근 비용을 OpenAI가 부담하는 개발자 트랙을 운영\n- 정부 트랙은 조기경보·발병 대응·진단·의료대응책 개발 워크플로에 동일 접근을 확장\n- Johns Hopkins APL, CEPI, Lawrence Livermore National Lab 등이 초기 협력기관으로 참여\n- 공개 전 백악관과 연방기관에 접근 방식을 브리핑했고 전 세계 지원자에게 개방\n- GPT-Rosalind는 4월 공개된 생명과학용 추론 모델로 단백질·유전체·질병 생물학 추론에 특화\n\n출처: openai.com",
          "source": "https://openai.com/index/strengthening-societal-resilience-with-rosalind-biodefense/",
          "officialUrl": "https://openai.com/index/strengthening-societal-resilience-with-rosalind-biodefense/",
          "slug": "strengthening-societal-resilience-with-rosalind--c6520442",
          "tags": [
            "OpenAI",
            "Rosalind / Biosecurity"
          ]
        },
        {
          "date": "6/1",
          "platform": "X+Threads",
          "title": "OpenAI 프런티어 모델·Codex, AWS에서 정식 제공",
          "summary": "OpenAI의 GPT-5.5·GPT-5.4와 Codex가 Amazon Bedrock에서 정식(GA) 제공되어, AWS 기업이 기존 보안·거버넌스 환경 안에서 OpenAI를 바로 쓸 수 있게 됐다. 4월 제한 프리뷰 한 달 만의 정식 전환이다.",
          "content": "OpenAI의 GPT-5.5·GPT-5.4와 Codex가 Amazon Bedrock에서 정식(GA) 제공되어, AWS 기업이 기존 보안·거버넌스 환경 안에서 OpenAI를 바로 쓸 수 있게 됐다. 4월 제한 프리뷰 한 달 만의 정식 전환이다.\n\n핵심 사실:\n\n- GPT-5.5·GPT-5.4와 Codex가 Amazon Bedrock에서 일반 가용(GA)으로 전환\n- Codex App·CLI·VS Code/JetBrains/Xcode IDE 연동을 Bedrock 위에서 사용 가능\n- 가격은 OpenAI 1차 API와 동일하며 사용량이 AWS 약정에 합산(GPT-5.5 입력 $5/출력 $30 per 1M)\n- 추론은 Bedrock의 Responses API 경유로, IAM·VPC 격리·암호화 등 AWS 보안 통제 적용\n- 사이버 방어 제품군 Daybreak(Codex Security 포함)도 향후 AWS 제공 예고\n\n출처: openai.com",
          "source": "https://openai.com/index/openai-frontier-models-and-codex-are-now-available-on-aws/",
          "officialUrl": "https://openai.com/index/openai-frontier-models-and-codex-are-now-available-on-aws/",
          "slug": "openai-frontier-models-and-codex-are-now-availab-8f1cbb17",
          "tags": [
            "OpenAI",
            "Enterprise / Cloud"
          ]
        },
        {
          "date": "5/29",
          "platform": "X+Threads",
          "title": "OpenAI Codex, Windows에 Computer Use 도입 (v26.527)",
          "summary": "맥 전용이던 Codex의 화면 제어(Computer Use)가 Windows로 확대되어 에이전트가 데스크톱 앱을 직접 보고 클릭하고 입력한다. ChatGPT 모바일에서 Windows 작업을 원격으로 시작·확인·조정하는 기능도 함께 열렸다.",
          "content": "맥 전용이던 Codex의 화면 제어(Computer Use)가 Windows로 확대되어 에이전트가 데스크톱 앱을 직접 보고 클릭하고 입력한다. ChatGPT 모바일에서 Windows 작업을 원격으로 시작·확인·조정하는 기능도 함께 열렸다.\n\n핵심 사실:\n\n- Codex 앱 v26.527에서 Windows Computer Use가 추가되어 그래픽 앱을 사람처럼 조작\n- Windows에서는 포그라운드 전용으로, 작업 중 활성 데스크톱 세션을 점유(맥의 백그라운드 병렬 실행과 차이)\n- @computer로 전체 데스크톱 접근, @Paint처럼 특정 앱으로 범위를 제한 가능\n- iOS·Android ChatGPT 또는 맥 Codex에서 Windows 작업을 원격으로 시작·조정 가능\n- 출시 시점 EEA·영국·스위스는 Computer Use 제외, Profile 사용량·토큰 통계 화면 추가\n- 같은 날 Codex CLI 0.135.0에서 진단·Vim 편집·권한 프로필 작업 흐름도 정비\n\n출처: developers.openai.com",
          "source": "https://developers.openai.com/codex/app/computer-use",
          "officialUrl": "https://developers.openai.com/codex/app/computer-use",
          "slug": "computer-use-a8e8e5ca",
          "tags": [
            "OpenAI",
            "Codex / Agent"
          ]
        },
        {
          "date": "5/28",
          "platform": "X+Threads",
          "title": "GPT-5.5 Instant 응답 스타일 업데이트와 Canvas의 쓰기·코드 블록 전환",
          "summary": "OpenAI가 GPT-5.5 Instant의 응답을 더 읽기 쉽고 자연스럽게 다듬으며, GPT-5.5 Instant·Thinking에서 Canvas를 제거하고 쓰기 블록·코드 블록을 채팅 응답 안으로 통합했다. 사용성 변경이라 별도 블로그 없이 릴리스 노트로만 고지됐다.",
          "content": "OpenAI가 GPT-5.5 Instant의 응답을 더 읽기 쉽고 자연스럽게 다듬으며, GPT-5.5 Instant·Thinking에서 Canvas를 제거하고 쓰기 블록·코드 블록을 채팅 응답 안으로 통합했다. 사용성 변경이라 별도 블로그 없이 릴리스 노트로만 고지됐다.\n\n핵심 사실:\n\n- GPT-5.5 Instant가 과도한 불릿·장문을 줄이고 더 자연스러운 톤으로 개편\n- GPT-5.5 Instant·Thinking에서 Canvas가 빠지고 쓰기·코드 작업이 채팅 내 writing/code 블록으로 대체\n- 유료 사용자는 일정 기간 레거시 모델을 통해 Canvas를 계속 사용 가능\n- 리서치 리드 Michelle Pokras는 sycophancy·factuality·다국어 성능 개선을 사유로 제시\n- 함께 o3는 2026-08-26, GPT-4.5는 2026-06-27 ChatGPT에서 은퇴 예고\n\n출처: help.openai.com",
          "source": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
          "officialUrl": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
          "slug": "6825453-chatgpt-release-notes-2572fe34",
          "tags": [
            "OpenAI",
            "ChatGPT / Model"
          ]
        },
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "OpenAI 추론 모델, 80년 묵은 에르되시 단위거리 추측 반례 제시",
          "summary": "OpenAI가 5월 20일, 내부 추론 모델이 80년 가까이 열려 있던 Erdős의 평면 단위거리 추측을 반례로 깼다고 공개했다. 검색으로 답을 찾은 것이 아니라 기존에 알려지지 않은 연결고리를 찾아 새 증명 방향을 제시한 사례다. AI가 문제 풀이를 넘어 새 발견 영역으로 진입하는 장면이다.",
          "content": "OpenAI가 5월 20일, 내부 추론 모델이 80년 가까이 열려 있던 Erdős의 평면 단위거리 추측을 반례로 깼다고 공개했다. 검색으로 답을 찾은 것이 아니라 기존에 알려지지 않은 연결고리를 찾아 새 증명 방향을 제시한 사례다. AI가 문제 풀이를 넘어 새 발견 영역으로 진입하는 장면이다.\n\n핵심 사실:\n\n- OpenAI 내부 추론 모델이 80년 가까이 미해결이던 Erdős 평면 단위거리 추측의 반례를 제시\n- 검색이 아니라 알려지지 않은 연결고리를 찾아 새 증명 방향을 제시한 발견형 사례\n- Google DeepMind AlphaProof Nexus의 에르되시 형식증명과는 별개의 OpenAI 독립 성과\n\n출처: openai.com",
          "source": "https://openai.com/index/model-disproves-discrete-geometry-conjecture/",
          "officialUrl": "https://openai.com/index/model-disproves-discrete-geometry-conjecture/",
          "slug": "model-disproves-discrete-geometry-conjecture-8a538933",
          "tags": [
            "OpenAI",
            "AI 연구"
          ]
        },
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "LLM-as-a-judge 평가 편향: 점수는 객관적이지 않다",
          "summary": "LLM-as-a-judge 평가에서 점수가 객관적이라는 전제가 가장 위험하다. 최근 논문들을 보면 평가자는 답변의 진실성만 보는 것이 아니라 문체, 길이, 제시 순서, 이미지/텍스트 단서까지 영향을 받는다. 이제 질문은 몇 점인지가 아니라 그 점수가 어떤 편향을 통과했는지다.",
          "content": "LLM-as-a-judge 평가에서 점수가 객관적이라는 전제가 가장 위험하다. 최근 논문들을 보면 평가자는 답변의 진실성만 보는 것이 아니라 문체, 길이, 제시 순서, 이미지/텍스트 단서까지 영향을 받는다. 이제 질문은 몇 점인지가 아니라 그 점수가 어떤 편향을 통과했는지다.\n\n핵심 사실:\n\n- LLM 평가자는 답변 진실성뿐 아니라 문체·길이·제시 순서·멀티모달 단서에 영향을 받음\n- 핵심 질문은 점수의 절댓값이 아니라 그 점수가 어떤 편향을 통과했는지\n\n출처: developers.openai.com",
          "source": "https://developers.openai.com/api/docs/guides/evaluation-best-practices",
          "officialUrl": "https://developers.openai.com/api/docs/guides/evaluation-best-practices",
          "slug": "evaluation-best-practices-fc216fbe",
          "tags": [
            "OpenAI",
            "AI 평가"
          ]
        }
      ]
    },
    {
      "name": "Anthropic",
      "color": "#E87040",
      "posts": [
        {
          "date": "6/3",
          "platform": "X+Threads",
          "title": "Anthropic, 1년치 AI 활용 사이버 위협 MITRE ATT&CK 매핑 보고서 공개",
          "summary": "Anthropic이 2025년 3월부터 2026년 3월까지 차단된 악성 사이버 활동 계정 832건을 MITRE ATT&CK에 매핑한 분석을 공개했다. 공격자들이 AI를 공격의 후반·고난도 단계에 점점 더 활용하고 있다고 결론지었다.",
          "content": "Anthropic이 2025년 3월부터 2026년 3월까지 차단된 악성 사이버 활동 계정 832건을 MITRE ATT&CK에 매핑한 분석을 공개했다. 공격자들이 AI를 공격의 후반·고난도 단계에 점점 더 활용하고 있다고 결론지었다.\n\n핵심 사실:\n\n- 차단 계정 832건 분석, Verizon 2026 DBIR에 일부 결과 게재\n- 67.3%(560건)가 멀웨어 작성 등 공격 준비에 AI 사용\n- medium 이상 위험 비중이 상반기 33%에서 하반기 56%로 약 1.7배 증가\n- 공격자 숙련도와 사용 기법 수의 상관관계가 약화, AI 적용 단계가 위험도 식별 신호로 부상\n\n출처: anthropic.com",
          "source": "https://www.anthropic.com/news/AI-enabled-cyber-threats-mitre-attack",
          "officialUrl": "https://www.anthropic.com/news/AI-enabled-cyber-threats-mitre-attack",
          "slug": "ai-enabled-cyber-threats-mitre-attack-a3c4fbd2",
          "tags": [
            "Anthropic",
            "위협 인텔리전스"
          ]
        },
        {
          "date": "6/2",
          "platform": "X+Threads",
          "title": "Anthropic, Project Glasswing 약 150개 조직으로 확대",
          "summary": "Anthropic이 핵심 소프트웨어 보안 이니셔티브 Project Glasswing을 약 150개 신규 조직으로 확대했다. Claude Mythos Preview를 활용해 취약점을 탐지하며 전력·수도·의료·통신 등 핵심 인프라 분야를 포괄한다.",
          "content": "Anthropic이 핵심 소프트웨어 보안 이니셔티브 Project Glasswing을 약 150개 신규 조직으로 확대했다. Claude Mythos Preview를 활용해 취약점을 탐지하며 전력·수도·의료·통신 등 핵심 인프라 분야를 포괄한다.\n\n핵심 사실:\n\n- 15개국 이상에 분포한 약 150개 신규 파트너 조직 추가, 초기 코호트는 약 50개 조직\n- 초기 파트너들에서 high·critical 등급 취약점 1만 건 이상 발견\n- 취약점 탐지는 Claude Mythos Preview, Claude Security 제품은 Opus 4.8 등 공개 모델 사용\n- 향후 6~12개월 내 다른 AI 기업들도 Mythos급 모델을 보유할 것으로 전망\n\n출처: anthropic.com",
          "source": "https://www.anthropic.com/news/expanding-project-glasswing",
          "officialUrl": "https://www.anthropic.com/news/expanding-project-glasswing",
          "slug": "expanding-project-glasswing-93c7a011",
          "tags": [
            "Anthropic",
            "보안 이니셔티브"
          ]
        },
        {
          "date": "6/1",
          "platform": "X+Threads",
          "title": "Anthropic, SEC에 S-1 초안 비공개 제출",
          "summary": "Anthropic PBC가 보통주 기업공개를 위한 Form S-1 등록 초안을 미국 SEC에 비공개로 제출했다. SEC 심사 완료 후 상장 여부는 시장 상황에 따라 결정된다고 밝혔다.",
          "content": "Anthropic PBC가 보통주 기업공개를 위한 Form S-1 등록 초안을 미국 SEC에 비공개로 제출했다. SEC 심사 완료 후 상장 여부는 시장 상황에 따라 결정된다고 밝혔다.\n\n핵심 사실:\n\n- 발행 주식 수와 공모가는 아직 미정, 1933년 증권법 Rule 135에 따른 공시\n- 이번 발표는 증권 매도 청약이나 매수 권유가 아니라고 명시\n- 런레이트 매출이 2025년 말 약 90억 달러에서 300억 달러를 돌파했다고 언급\n\n출처: anthropic.com",
          "source": "https://www.anthropic.com/news/confidential-draft-s1-sec",
          "officialUrl": "https://www.anthropic.com/news/confidential-draft-s1-sec",
          "slug": "confidential-draft-s1-sec-782a21da",
          "tags": [
            "Anthropic",
            "기업 동향"
          ]
        },
        {
          "date": "5/29",
          "platform": "X+Threads",
          "title": "Anthropic, Mythos-class 모델 몇 주 내 확대 공식 예고",
          "summary": "Anthropic이 Opus 4.8 발표 말미에서 Project Glasswing의 Claude Mythos Preview를 언급하며 Mythos-class 모델을 모든 고객에게 몇 주 내(coming weeks) 가져올 수 있을 것으로 기대한다고 밝혔다. Mythos 1이라는 제품명이 확정된 것은 아니며, 현재 공식 확인된 것은 Mythos-class·Claude Mythos Preview·몇 주 내 확대 기대다. 별도로 Opus 4.8/Sonnet 4.8/Mythos 1 모델명 루머가 함께 돌았으나 4.8 외 명칭은 미확정이다.",
          "content": "Anthropic이 Opus 4.8 발표 말미에서 Project Glasswing의 Claude Mythos Preview를 언급하며 Mythos-class 모델을 모든 고객에게 몇 주 내(coming weeks) 가져올 수 있을 것으로 기대한다고 밝혔다. Mythos 1이라는 제품명이 확정된 것은 아니며, 현재 공식 확인된 것은 Mythos-class·Claude Mythos Preview·몇 주 내 확대 기대다. 별도로 Opus 4.8/Sonnet 4.8/Mythos 1 모델명 루머가 함께 돌았으나 4.8 외 명칭은 미확정이다.\n\n핵심 사실:\n\n- Opus 4.8 발표 본문에서 Mythos-class 모델의 coming weeks 확대 기대를 공식 언급\n- Mythos 1 제품명 확정 아님, 공식 확인된 것은 Mythos-class·Claude Mythos Preview\n- Claude가 일상 작업·코딩·고난도 추론·보안 분석용 모델 라인업으로 분화하는 흐름\n- Sonnet 4.8·Mythos 1 등 추가 모델명은 루머 단계로 공식 발표되지 않음\n\n이 항목은 공식 확정 발표가 아니라 예고·정황 단계의 정보다. 확정 시 갱신한다.\n\n출처: anthropic.com",
          "source": "https://www.anthropic.com/news/claude-opus-4-8",
          "officialUrl": "https://www.anthropic.com/news/claude-opus-4-8",
          "slug": "claude-opus-4-8-080bf9db",
          "tags": [
            "Anthropic",
            "AI 모델"
          ]
        },
        {
          "date": "5/28",
          "platform": "X+Threads",
          "title": "Anthropic, Claude Opus 4.8 공식 공개",
          "summary": "Anthropic이 가장 강력한 일반 공개 모델 Claude Opus 4.8을 발표했다. 가격은 Opus 4.7과 동일하게 유지하면서 코딩·에이전트·지식 작업 전반에서 프런티어 성능을 기록했다. Claude Code에 dynamic workflows가 붙어 대규모 작업을 더 잘 다룬다.",
          "content": "Anthropic이 가장 강력한 일반 공개 모델 Claude Opus 4.8을 발표했다. 가격은 Opus 4.7과 동일하게 유지하면서 코딩·에이전트·지식 작업 전반에서 프런티어 성능을 기록했다. Claude Code에 dynamic workflows가 붙어 대규모 작업을 더 잘 다룬다.\n\n핵심 사실:\n\n- 가격은 입력 100만 토큰당 5달러, 출력 100만 토큰당 25달러로 Opus 4.7과 동일\n- Claude API·Amazon Bedrock·Vertex AI에서 기본 1M 토큰 컨텍스트 지원, 최대 출력 128k 토큰\n- effort 파라미터가 전 표면에서 기본값 high로 설정되고 prompt caching 최소 캐시 길이는 1,024토큰\n- Super-Agent 벤치마크에서 유일하게 전 케이스를 끝까지 완료, Online-Mind2Web 84%로 GPT-5.5 상회\n- Legal Agent Benchmark 최고 점수 기록, all-pass 기준 10%를 처음 돌파\n- fast mode는 2.5배 속도에 기존 대비 3배 저렴, API 모델명은 claude-opus-4-8\n- Claude Code에 dynamic workflows가 추가되어 대규모 작업 처리 개선\n\n출처: anthropic.com",
          "source": "https://www.anthropic.com/news/claude-opus-4-8",
          "officialUrl": "https://www.anthropic.com/news/claude-opus-4-8",
          "slug": "claude-opus-4-8-7ba63351",
          "tags": [
            "Anthropic",
            "모델 출시"
          ]
        },
        {
          "date": "5/28",
          "platform": "X+Threads",
          "title": "Claude Opus 4.8, mid-conversation system messages·prompt caching 등 플랫폼 기능 추가",
          "summary": "Opus 4.8 출시와 함께 대화 도중 role:\"system\" 메시지를 보낼 수 있는 mid-conversation system messages가 정식 도입됐다. 긴 대화 중간에 system 지시를 추가해도 앞서 쌓아둔 prompt cache 적중을 계속 유지한다.",
          "content": "Opus 4.8 출시와 함께 대화 도중 role:\"system\" 메시지를 보낼 수 있는 mid-conversation system messages가 정식 도입됐다. 긴 대화 중간에 system 지시를 추가해도 앞서 쌓아둔 prompt cache 적중을 계속 유지한다.\n\n핵심 사실:\n\n- user 턴 이후 system 메시지 전송 가능, 별도 beta 헤더 불필요\n- 긴 대화 중간 system 지시 추가 시에도 prompt cache 유지로 비용·지연 시간 절감\n- 거부 응답의 stop_details에 category(cyber·bio·null)와 설명 필드 공개 문서화\n- adaptive thinking으로 필요한 턴에서만 추론을 발동해 낭비 토큰 절감\n- Claude Code에 Workflows가 research preview로 추가되어 다단계 에이전트 계획 실행\n\n출처: platform.claude.com",
          "source": "https://platform.claude.com/docs/en/release-notes/overview",
          "officialUrl": "https://platform.claude.com/docs/en/release-notes/overview",
          "slug": "overview-55e88204",
          "tags": [
            "Anthropic",
            "플랫폼 업데이트"
          ]
        }
      ]
    },
    {
      "name": "Google",
      "color": "#4285F4",
      "posts": [
        {
          "date": "6/2",
          "platform": "X+Threads",
          "title": "Workspace Studio, 리스트 반복(Repeat for each) 플로우 도입",
          "summary": "Google가 Workspace Studio 플로우에서 리스트 항목을 반복 처리하는 Repeat for each 단계를 도입했다. 회의록 액션 아이템별 작업 생성, 영업 리드별 이메일 초안 같은 자동화를 지원한다.",
          "content": "Google가 Workspace Studio 플로우에서 리스트 항목을 반복 처리하는 Repeat for each 단계를 도입했다. 회의록 액션 아이템별 작업 생성, 영업 리드별 이메일 초안 같은 자동화를 지원한다.\n\n핵심 사실:\n\n- Ask Gemini 단계에 텍스트/리스트 출력을 고르는 Response format 옵션 추가\n- 리스트 출력 시 Repeat for each 단계로 항목을 순회하며 하위 단계를 반복 실행\n- Google Sheet 데이터를 행 단위로 순회하는 자동화도 지원\n- Rapid/Scheduled Release 도메인에 6월 2일부터 전면 배포 시작\n\n출처: workspaceupdates.googleblog.com",
          "source": "https://workspaceupdates.googleblog.com/2026/06/introducing-ability-to-loop-over-list-of-items-in-Workspace-Studio.html",
          "officialUrl": "https://workspaceupdates.googleblog.com/2026/06/introducing-ability-to-loop-over-list-of-items-in-Workspace-Studio.html",
          "slug": "introducing-ability-to-loop-over-list-of-items-i-6ff09d11",
          "tags": [
            "Google",
            "생산성/워크플로우"
          ]
        },
        {
          "date": "5/28",
          "platform": "X+Threads",
          "title": "Gemini 네이티브 이미지 모델 정식 출시 및 영상→이미지 생성 추가",
          "summary": "Google가 네이티브 이미지 생성 모델 gemini-3.1-flash-image와 gemini-3-pro-image를 정식 출시했다. 영상을 멀티모달 컨텍스트로 받아 썸네일·포스터 이미지를 만드는 기능도 추가됐다.",
          "content": "Google가 네이티브 이미지 생성 모델 gemini-3.1-flash-image와 gemini-3-pro-image를 정식 출시했다. 영상을 멀티모달 컨텍스트로 받아 썸네일·포스터 이미지를 만드는 기능도 추가됐다.\n\n핵심 사실:\n\n- gemini-3.1-flash-image, gemini-3-pro-image 두 네이티브 이미지 모델 GA 전환\n- 직접 업로드 또는 YouTube URL 영상을 입력으로 받아 이미지를 생성하는 영상→이미지 기능 도입\n- 영상→이미지 생성은 gemini-3.1-flash-image 전용으로 제공\n- 기간 내(5월 28일) 공식 API 변경 로그에 기재된 실질 역량 추가\n\n출처: ai.google.dev",
          "source": "https://ai.google.dev/gemini-api/docs/changelog",
          "officialUrl": "https://ai.google.dev/gemini-api/docs/changelog",
          "slug": "changelog-d6674770",
          "tags": [
            "Google",
            "AI 모델/API"
          ]
        }
      ]
    },
    {
      "name": "NVIDIA",
      "color": "#76B900",
      "posts": [
        {
          "date": "5/31",
          "platform": "X+Threads",
          "title": "NVIDIA·Microsoft, 개인 AI 에이전트용 윈도우 PC 'RTX Spark' 공개",
          "summary": "NVIDIA와 Microsoft가 GTC Taipei at COMPUTEX 2026에서 개인 AI 에이전트를 온디바이스로 구동하는 새 슈퍼칩 RTX Spark를 발표했다. 윈도우 노트북과 소형 데스크톱을 에이전트가 직접 작업을 수행하는 컴퓨터로 재정의한다.",
          "content": "NVIDIA와 Microsoft가 GTC Taipei at COMPUTEX 2026에서 개인 AI 에이전트를 온디바이스로 구동하는 새 슈퍼칩 RTX Spark를 발표했다. 윈도우 노트북과 소형 데스크톱을 에이전트가 직접 작업을 수행하는 컴퓨터로 재정의한다.\n\n핵심 사실:\n\n- Blackwell RTX GPU(6,144 CUDA 코어, 5세대 FP4 Tensor Core)와 20코어 Grace CPU 결합, AI 연산 1 페타플롭\n- 최대 128GB 통합 메모리로 120B 파라미터 모델과 100만 토큰 컨텍스트를 로컬 실행\n- 에이전트를 안전하게 격리하는 OpenShell 런타임과 윈도우 보안 프리미티브 적용\n- ASUS·Dell·HP·Lenovo·Microsoft Surface·MSI 등에서 2026년 가을 출시\n\n출처: nvidianews.nvidia.com",
          "source": "https://nvidianews.nvidia.com/news/nvidia-microsoft-windows-pcs-agents-rtx-spark",
          "officialUrl": "https://nvidianews.nvidia.com/news/nvidia-microsoft-windows-pcs-agents-rtx-spark",
          "slug": "nvidia-microsoft-windows-pcs-agents-rtx-spark-8cabcc4a",
          "tags": [
            "NVIDIA",
            "agentic-infra"
          ]
        },
        {
          "date": "5/31",
          "platform": "X+Threads",
          "title": "NVIDIA Vera Rubin 풀 프로덕션 진입, 에이전틱 AI 팩토리 본격 가동",
          "summary": "NVIDIA가 차세대 랙스케일 플랫폼 Vera Rubin을 전면 양산 단계로 전환한다고 발표했다. 추론·검색·도구 사용 중심의 에이전틱 AI 워크로드를 위한 AI 팩토리 엔진으로 포지셔닝했다.",
          "content": "NVIDIA가 차세대 랙스케일 플랫폼 Vera Rubin을 전면 양산 단계로 전환한다고 발표했다. 추론·검색·도구 사용 중심의 에이전틱 AI 워크로드를 위한 AI 팩토리 엔진으로 포지셔닝했다.\n\n핵심 사실:\n\n- Vera Rubin NVL72(36 Vera CPU + 72 Rubin GPU)를 포함해 다섯 종 목적형 랙을 단일 슈퍼컴퓨터로 통합\n- 이전 세대 Grace Blackwell 대비 스케일 환경에서 에이전트 처리량 10배 향상\n- 150곳 이상 생태계 파트너가 30개국 350여 공장에서 양산 준비 중\n- Vera Rubin 양산 출하는 2026년 가을 시작 예정\n\n출처: nvidianews.nvidia.com",
          "source": "https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory",
          "officialUrl": "https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory",
          "slug": "vera-rubin-full-production-agentic-ai-factory-7b40734c",
          "tags": [
            "NVIDIA",
            "datacenter"
          ]
        },
        {
          "date": "5/31",
          "platform": "X+Threads",
          "title": "NVIDIA, 윈도우용 DGX Station 발표… 책상 위 1조 파라미터 AI 슈퍼컴퓨터",
          "summary": "NVIDIA가 GB300 Grace Blackwell Ultra 슈퍼칩 기반의 데스크사이드 AI 슈퍼컴퓨터 DGX Station for Windows를 공개했다. 윈도우 환경에서 최대 1조 파라미터 모델을 로컬 실행하도록 설계됐다.",
          "content": "NVIDIA가 GB300 Grace Blackwell Ultra 슈퍼칩 기반의 데스크사이드 AI 슈퍼컴퓨터 DGX Station for Windows를 공개했다. 윈도우 환경에서 최대 1조 파라미터 모델을 로컬 실행하도록 설계됐다.\n\n핵심 사실:\n\n- GB300 Grace Blackwell Ultra 슈퍼칩, 748GB 코히어런트 메모리, FP4 20 페타플롭\n- ConnectX-8 SuperNIC로 최대 800Gb/s 네트워킹, 여러 DGX Station 연결 지원\n- 에이전트를 샌드박스로 격리하는 오픈소스 OpenShell 런타임 탑재\n- ASUS·Dell·GIGABYTE·HP·MSI·Supermicro에서 2026년 4분기 출시 예정\n\n출처: nvidianews.nvidia.com",
          "source": "https://nvidianews.nvidia.com/news/nvidia-dgx-station-for-windows-puts-a-trillion-parameter-ai-supercomputer-on-every-enterprise-desk",
          "officialUrl": "https://nvidianews.nvidia.com/news/nvidia-dgx-station-for-windows-puts-a-trillion-parameter-ai-supercomputer-on-every-enterprise-desk",
          "slug": "nvidia-dgx-station-for-windows-puts-a-trillion-p-05bc56b4",
          "tags": [
            "NVIDIA",
            "datacenter"
          ]
        },
        {
          "date": "5/28",
          "platform": "X+Threads",
          "title": "NVIDIA SOL-ExecBench, AI 생성 GPU 커널을 '광속 한계' 대비로 평가",
          "summary": "NVIDIA가 AI가 생성한 CUDA 커널을 소프트웨어 베이스라인이 아니라 하드웨어 이론 한계(Speed-of-Light)와 비교 평가하는 SOL-ExecBench를 공개·확산했다. 에이전트가 보상 해킹으로 점수만 올리는 문제를 차단하려는 설계다.",
          "content": "NVIDIA가 AI가 생성한 CUDA 커널을 소프트웨어 베이스라인이 아니라 하드웨어 이론 한계(Speed-of-Light)와 비교 평가하는 SOL-ExecBench를 공개·확산했다. 에이전트가 보상 해킹으로 점수만 올리는 문제를 차단하려는 설계다.\n\n핵심 사실:\n\n- 124개 모델에서 추출한 235개 CUDA 커널 최적화 문제로 Blackwell(B200) 환경을 겨냥\n- 가변 소프트웨어 베이스라인 대신 SOLAR가 산출한 하드웨어 SOL 한계까지의 격차를 점수화(SOL-Score)\n- FP32·BF16·FP16·FP8·NVFP4를 포함하고 GEMM·컨볼루션·attention·MoE·norm 등 forward/backward 워크로드를 다룸\n- GPU 클럭 고정·L2 캐시 클리어·격리 서브프로세스·정적 분석으로 보상 해킹을 막는 샌드박스 하네스 제공\n- PyTorch·Triton·CUTLASS·cuDNN·CuTe DSL·cuTile·CUDA C++ 커널 언어를 지원하며 B200 실측 리더보드 운영\n\n출처: research.nvidia.com",
          "source": "https://research.nvidia.com/benchmarks/sol-execbench",
          "officialUrl": "https://research.nvidia.com/benchmarks/sol-execbench",
          "slug": "sol-execbench-b81b4ccf",
          "tags": [
            "NVIDIA",
            "Benchmark / GPU Kernel"
          ]
        }
      ]
    },
    {
      "name": "Microsoft",
      "color": "#0078D4",
      "posts": [
        {
          "date": "5/29",
          "platform": "X+Threads",
          "title": "Microsoft, Copilot Health 프리뷰 출시: 건강 기록·웨어러블 통합 AI",
          "summary": "마이크로소프트가 개인 건강 정보를 통합·해석해 주는 Copilot Health를 프리뷰로 공개했다. Apple Health 등 웨어러블·건강 앱과 5만여 미국 의료기관 정보를 연결해 검사 결과 해석과 진료 준비를 돕는다.",
          "content": "마이크로소프트가 개인 건강 정보를 통합·해석해 주는 Copilot Health를 프리뷰로 공개했다. Apple Health 등 웨어러블·건강 앱과 5만여 미국 의료기관 정보를 연결해 검사 결과 해석과 진료 준비를 돕는다.\n\n핵심 사실:\n\n- 미국 18세 이상, Microsoft 365 Personal·Family·Premium 구독자 대상(업무 계정 제외)\n- Copilot.microsoft.com/health에서 즉시 사용 가능\n- 5만여 미국 의료기관 정보 연동, 신뢰 가능한 건강 소스 기반 개인화 인사이트 제공\n- 건강 대화는 일반 Copilot과 분리·암호화되며 AI 학습에 사용하지 않음\n\n출처: microsoft.com",
          "source": "https://www.microsoft.com/en-us/microsoft-copilot/blog/2026/05/29/copilot-health-now-in-preview/",
          "officialUrl": "https://www.microsoft.com/en-us/microsoft-copilot/blog/2026/05/29/copilot-health-now-in-preview/",
          "slug": "copilot-health-now-in-preview-d5b08e92",
          "tags": [
            "Microsoft",
            "신규 제품(프리뷰)"
          ]
        },
        {
          "date": "5/28",
          "platform": "X+Threads",
          "title": "Microsoft 365 Copilot 새 디자인 공개: 프롬프트 입력창을 작업 인지형 워크스페이스로 전환",
          "summary": "마이크로소프트가 Microsoft 365 Copilot 앱과 Word/Excel/PowerPoint/Outlook 전반의 Copilot 진입점을 재설계해 정적 프롬프트 입력창을 작업 인지형 워크스페이스로 바꿨다. 개별 기능 나열에서 연결된 경험으로의 전환을 표방한다.",
          "content": "마이크로소프트가 Microsoft 365 Copilot 앱과 Word/Excel/PowerPoint/Outlook 전반의 Copilot 진입점을 재설계해 정적 프롬프트 입력창을 작업 인지형 워크스페이스로 바꿨다. 개별 기능 나열에서 연결된 경험으로의 전환을 표방한다.\n\n핵심 사실:\n\n- 프롬프트 입력 영역을 확장형 작업 워크스페이스로 재구성하고 좌측 내비게이션으로 에이전트·대화 이력을 정리\n- 로딩 속도 50% 이상 단축, 복잡한 프롬프트 응답 시간 약 10% 개선\n- 이메일·파일·채팅·회의에서 끌어오는 Work IQ 지능 레이어를 결합\n- Word·Excel·PowerPoint·Outlook에 일관된 단일 Copilot 진입점 제공\n\n출처: microsoft.com",
          "source": "https://www.microsoft.com/en-us/microsoft-365/blog/2026/05/28/introducing-a-new-design-for-microsoft-365-copilot/",
          "officialUrl": "https://www.microsoft.com/en-us/microsoft-365/blog/2026/05/28/introducing-a-new-design-for-microsoft-365-copilot/",
          "slug": "introducing-a-new-design-for-microsoft-365-copil-19d5a13f",
          "tags": [
            "Microsoft",
            "제품/UX 개편"
          ]
        },
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "Copilot Studio 5월 업데이트: 컴퓨터 사용 에이전트 정식 출시·워크플로 재설계·실시간 음성",
          "summary": "마이크로소프트가 Copilot Studio의 컴퓨터 사용 에이전트를 정식 출시하고, 통합 캔버스 기반 워크플로 디자이너와 실시간 음성 에이전트를 추가했다. 에이전트가 웹사이트·데스크톱 앱의 UI를 직접 조작해 작업을 자동화한다.",
          "content": "마이크로소프트가 Copilot Studio의 컴퓨터 사용 에이전트를 정식 출시하고, 통합 캔버스 기반 워크플로 디자이너와 실시간 음성 에이전트를 추가했다. 에이전트가 웹사이트·데스크톱 앱의 UI를 직접 조작해 작업을 자동화한다.\n\n핵심 사실:\n\n- 컴퓨터 사용 에이전트(Computer-Using Agents) 정식 출시(GA)\n- 다단계 자동화를 한 캔버스에서 설계하는 워크플로 디자이너 재설계\n- Dynamics 365 Contact Center 기반 실시간 음성 에이전트 북미 정식 출시\n- 신규 오케스트레이션 레이어로 실행 정확도 약 20% 향상, 토큰 소비 50% 감소\n\n출처: microsoft.com",
          "source": "https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/new-and-improved-computer-using-agents-a-new-workflows-experience-and-real-time-voice-experiences/",
          "officialUrl": "https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/new-and-improved-computer-using-agents-a-new-workflows-experience-and-real-time-voice-experiences/",
          "slug": "new-and-improved-computer-using-agents-a-new-wor-c2d48350",
          "tags": [
            "Microsoft",
            "에이전트 플랫폼 업데이트"
          ]
        },
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "Microsoft Agent Governance Toolkit: 위험 행동을 실행 단계에서 차단",
          "summary": "에이전트가 실제 업무를 시작하면 문제는 모델 성능만이 아니라 권한이다. Microsoft가 Agent Governance Toolkit을 공개했다. 핵심은 에이전트에게 조심하라고 말하는 대신 위험한 행동을 실행 단계에서 차단하는 것이다.",
          "content": "에이전트가 실제 업무를 시작하면 문제는 모델 성능만이 아니라 권한이다. Microsoft가 Agent Governance Toolkit을 공개했다. 핵심은 에이전트에게 조심하라고 말하는 대신 위험한 행동을 실행 단계에서 차단하는 것이다.\n\n핵심 사실:\n\n- Microsoft가 에이전트 거버넌스용 오픈소스 툴킷을 공개\n- 조심하라는 지시 대신 위험 행동을 실행 단계에서 직접 차단하는 접근\n\n출처: github.com",
          "source": "https://github.com/microsoft/agent-governance-toolkit",
          "officialUrl": "https://github.com/microsoft/agent-governance-toolkit",
          "slug": "agent-governance-toolkit-2a7ec4eb",
          "tags": [
            "Microsoft",
            "AI 거버넌스"
          ]
        }
      ]
    },
    {
      "name": "xAI",
      "color": "#111111",
      "posts": [
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "xAI Grok V9-Medium(1.5조 파라미터) 메인 학습 완료, 6월 중순 공개 예고",
          "summary": "일론 머스크가 5월 25일 Grok 차세대 파운데이션 모델 V9-Medium의 메인 학습이 끝났고 평가 결과가 긍정적이라고 X에서 밝혔다. 현 프로덕션 모델의 3배인 1.5조 파라미터 규모이며 약 2~3주 뒤(6월 중순) 공개를 예고했다. 공식 블로그 게시물이 아닌 X 발언 기반이라 루머 단계로 분류한다.",
          "content": "일론 머스크가 5월 25일 Grok 차세대 파운데이션 모델 V9-Medium의 메인 학습이 끝났고 평가 결과가 긍정적이라고 X에서 밝혔다. 현 프로덕션 모델의 3배인 1.5조 파라미터 규모이며 약 2~3주 뒤(6월 중순) 공개를 예고했다. 공식 블로그 게시물이 아닌 X 발언 기반이라 루머 단계로 분류한다.\n\n핵심 사실:\n\n- V9-Medium은 1.5조 파라미터로 현 v8 프로덕션 모델 대비 약 3배 규모\n- Cursor 개발 워크플로 데이터로 학습해 복잡한 코딩 과제 강화를 표방\n- 발표 시점 기준 지도 미세조정(SFT) 진행 중, RL 학습 임박\n- 공개 시점은 발표 후 2~3주(6월 중순) 목표로 미확정\n- X 발언 기반 비공식 정보로 검증 한계 있음\n\n이 항목은 공식 확정 발표가 아니라 예고·정황 단계의 정보다. 확정 시 갱신한다.\n\n출처: x.ai",
          "source": "https://x.ai/news",
          "officialUrl": "https://x.ai/news",
          "slug": "news-ba8e1bac",
          "tags": [
            "xAI",
            "차세대 모델(예고)"
          ]
        }
      ]
    },
    {
      "name": "AMD",
      "color": "#ED1C24",
      "posts": [
        {
          "date": "5/31",
          "platform": "X+Threads",
          "title": "AMD, COMPUTEX 2026서 AM4 10주년·AM5 2029년 지원·RDNA 4 게이밍 확대 발표",
          "summary": "AMD가 COMPUTEX 2026에서 AM4 플랫폼 10주년 기념 CPU와 AM5 신규 CPU, 플랫폼 장기 지원 로드맵을 공개했다. 데이터센터 가속기가 아닌 게이밍·플랫폼 지속성에 초점을 맞췄다.",
          "content": "AMD가 COMPUTEX 2026에서 AM4 플랫폼 10주년 기념 CPU와 AM5 신규 CPU, 플랫폼 장기 지원 로드맵을 공개했다. 데이터센터 가속기가 아닌 게이밍·플랫폼 지속성에 초점을 맞췄다.\n\n핵심 사실:\n\n- 3D V-Cache 기반 Ryzen 7 5800X3D 10주년 에디션, 6월 25일 349달러 출시\n- 8코어·104MB 캐시·최대 4.5GHz의 신규 AM5 CPU Ryzen 7 7700X3D 발표\n- Socket AM5 플랫폼 지원을 2029년까지 연장 확정\n- RDNA 4 기반 Radeon RX 9070 GRE 글로벌 출시\n\n출처: amd.com",
          "source": "https://www.amd.com/en/blogs/2026/amd-computex-2026-10-years-of-am4-am5-support-through.html",
          "officialUrl": "https://www.amd.com/en/blogs/2026/amd-computex-2026-10-years-of-am4-am5-support-through.html",
          "slug": "amd-computex-2026-10-years-of-am4-am5-support-th-be96a2d8",
          "tags": [
            "AMD",
            "chips"
          ]
        }
      ]
    },
    {
      "name": "Mistral",
      "color": "#FA5310",
      "posts": [
        {
          "date": "5/28",
          "platform": "X+Threads",
          "title": "Mistral Medium 3.5, Copilot Studio 모델 라인업 합류: EU 인리전 데이터 처리 지원",
          "summary": "마이크로소프트가 Copilot Studio 외부 모델 라인업에 Mistral Medium 3.5를 추가했다. 에이전트 구축·오케스트레이션용이며, EU 조직은 데이터 처리를 역내(in-region)로 유지할 수 있는 점이 핵심으로 평가된다.",
          "content": "마이크로소프트가 Copilot Studio 외부 모델 라인업에 Mistral Medium 3.5를 추가했다. 에이전트 구축·오케스트레이션용이며, EU 조직은 데이터 처리를 역내(in-region)로 유지할 수 있는 점이 핵심으로 평가된다.\n\n핵심 사실:\n\n- Copilot Studio 얼리 릴리스 환경에서 전 세계 실험(Experimental) 기능으로 제공\n- EU 고객은 데이터 처리를 역내에서 유지 가능\n- 관리자 옵트인 필수이며 외부 모델은 기본 비활성화\n- Mistral이 호스팅하는 외부 모델로 데이터는 Microsoft 관리 환경 밖에서 처리됨\n\n출처: microsoft.com",
          "source": "https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/mistral-joins-copilot-studios-growing-lineup-of-model-providers/",
          "officialUrl": "https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/mistral-joins-copilot-studios-growing-lineup-of-model-providers/",
          "slug": "mistral-joins-copilot-studios-growing-lineup-of--114bc282",
          "tags": [
            "Mistral",
            "모델 제휴/배포"
          ]
        }
      ]
    },
    {
      "name": "Perplexity",
      "color": "#20808D",
      "posts": [
        {
          "date": "5/29",
          "platform": "X+Threads",
          "title": "Perplexity Computer, Microsoft 365 앱 안에서 사용 가능",
          "summary": "퍼플렉시티가 자사 에이전트 Computer를 Word·Excel·PowerPoint·Outlook·Teams 등 Microsoft 365 앱 안에서 쓸 수 있게 했다. Computer 스레드에서 맥락과 출처 확인이 쉬워졌고 개인·팀 단위 사용 분석이 추가됐다.",
          "content": "퍼플렉시티가 자사 에이전트 Computer를 Word·Excel·PowerPoint·Outlook·Teams 등 Microsoft 365 앱 안에서 쓸 수 있게 했다. Computer 스레드에서 맥락과 출처 확인이 쉬워졌고 개인·팀 단위 사용 분석이 추가됐다.\n\n핵심 사실:\n\n- Computer가 Word·Excel·PowerPoint·Outlook·Teams 내에서 동작\n- Computer 스레드의 맥락·출처 확인 가시성 개선\n- 개인 및 팀 단위 사용 분석(usage analytics) 제공\n- 공식 changelog 2026-05-29자 항목\n\n출처: perplexity.ai",
          "source": "https://www.perplexity.ai/changelog",
          "officialUrl": "https://www.perplexity.ai/changelog",
          "slug": "changelog-03e05de8",
          "tags": [
            "Perplexity",
            "제품 통합"
          ]
        }
      ]
    },
    {
      "name": "MiniMax",
      "color": "#1A56DB",
      "posts": [
        {
          "date": "6/1",
          "platform": "X+Threads",
          "title": "MiniMax, 오픈웨이트 프런티어 코딩 모델 M3 공개… SWE-Bench Pro 59.0%",
          "summary": "MiniMax가 프런티어급 코딩·100만 토큰 컨텍스트·네이티브 멀티모달을 한 모델에 결합한 오픈웨이트 M3를 공개했다. 자체 측정 SWE-Bench Pro 59.0%로 GPT-5.5·Gemini 3.1 Pro를 앞선다고 밝혔으나 벤치마크는 자가 보고다.",
          "content": "MiniMax가 프런티어급 코딩·100만 토큰 컨텍스트·네이티브 멀티모달을 한 모델에 결합한 오픈웨이트 M3를 공개했다. 자체 측정 SWE-Bench Pro 59.0%로 GPT-5.5·Gemini 3.1 Pro를 앞선다고 밝혔으나 벤치마크는 자가 보고다.\n\n핵심 사실:\n\n- 6월 1일 공개, MiniMax Sparse Attention(MSA)로 100만 토큰 컨텍스트에서 디코딩 15배·프리필 9배 가속을 주장\n- 자체 측정 SWE-Bench Pro 59.0%(GPT-5.5 58.6%·Gemini 3.1 Pro 54.2%), Terminal-Bench 2.1 66.0%, OSWorld-Verified 70.0% 제시\n- API는 즉시 제공되나 가중치와 기술 보고서는 공개 후 약 10일 내 Hugging Face·GitHub 배포로 예고\n- 벤치마크는 Claude Code 등 자체 스캐폴딩·자가 인프라로 측정됐고, 비교 기준이 신형 Opus 4.8이 아닌 4.7이라 독립 검증 전까지 해석에 주의\n- 가격은 입력 0.6·출력 2.40달러(첫 주 50% 할인)로 미국 프런티어 모델의 8~20% 수준\n\n출처: minimax.io",
          "source": "https://www.minimax.io/blog/minimax-m3",
          "officialUrl": "https://www.minimax.io/blog/minimax-m3",
          "backupUrls": [
            {
              "label": "threads.com",
              "url": "https://www.threads.com/@dailyaionly/post/DZTKKq7DIG-"
            }
          ],
          "slug": "minimax-m3-ee38031e",
          "tags": [
            "MiniMax",
            "Open Weight Model / Benchmark"
          ]
        }
      ]
    },
    {
      "name": "IBM",
      "color": "#0F62FE",
      "posts": [
        {
          "date": "5/27",
          "platform": "X+Threads",
          "title": "IBM·Artificial Analysis, 기업 IT 에이전트 벤치마크 ITBench-AA 공개… 프런티어 모델 전원 50% 미만",
          "summary": "IBM과 Artificial Analysis가 기업 IT 운영(SRE)에 특화된 첫 에이전트 벤치마크 ITBench-AA를 공개했다. 쿠버네티스 장애를 로그·의존성·근본 원인까지 진단하는 과제에서 모든 프런티어 모델이 50%를 넘지 못했다.",
          "content": "IBM과 Artificial Analysis가 기업 IT 운영(SRE)에 특화된 첫 에이전트 벤치마크 ITBench-AA를 공개했다. 쿠버네티스 장애를 로그·의존성·근본 원인까지 진단하는 과제에서 모든 프런티어 모델이 50%를 넘지 못했다.\n\n핵심 사실:\n\n- 5월 27일 Hugging Face 블로그로 공개, SRE 과제 59개(공개 40·비공개 19)로 구성\n- Claude Opus 4.7가 47%로 1위, GPT-5.5 46%, Qwen3.7 Max 42%, 오픈웨이트 1위는 GLM-5.1 40%\n- 턴 수가 많다고 정답률이 오르지 않음: GPT-5.5는 평균 31턴 46%인 반면 Gemini 3.1 Pro는 83턴에 30%\n- 오픈웨이트 Gemma 4 31B는 과제당 0.14달러로 37% 기록, 과제당 최대 5.38달러 모델 대비 비용 효율 두드러짐\n- 단일 모델로 기업 IT 에이전트 전 영역을 커버하기 어렵다는 점이 드러나, 사고 유형·중요도별 라우팅이 아키텍처 1차 결정 요소로 부상\n\n출처: huggingface.co",
          "source": "https://huggingface.co/blog/ibm-research/itbench-aa",
          "officialUrl": "https://huggingface.co/blog/ibm-research/itbench-aa",
          "slug": "itbench-aa-1a616017",
          "tags": [
            "IBM Software Innovation Lab / Artificial Analysis",
            "Benchmark / Agent"
          ]
        }
      ]
    },
    {
      "name": "Hugging Face",
      "color": "#FF9D00",
      "posts": [
        {
          "date": "5/27",
          "platform": "X+Threads",
          "title": "Reachy Mini, 서버 없이 완전 로컬 음성 대화 모드 지원",
          "summary": "Hugging Face가 오픈소스 로봇 Reachy Mini의 대화 앱을 외부 서버 없이 완전 로컬로 구동하는 방법을 공개했다. VAD→STT→LLM→TTS 캐스케이드 파이프라인으로 온디바이스 음성-음성 대화를 구현한다. 대화·표정·행동을 앱처럼 교체하는 로봇 생태계도 함께 강조됐다.",
          "content": "Hugging Face가 오픈소스 로봇 Reachy Mini의 대화 앱을 외부 서버 없이 완전 로컬로 구동하는 방법을 공개했다. VAD→STT→LLM→TTS 캐스케이드 파이프라인으로 온디바이스 음성-음성 대화를 구현한다. 대화·표정·행동을 앱처럼 교체하는 로봇 생태계도 함께 강조됐다.\n\n핵심 사실:\n\n- Realtime API 호환 /v1/realtime WebSocket을 노출하는 캐스케이드 음성-음성 스택\n- 권장 구성: llama.cpp + Gemma 4, Silero VAD, Parakeet-TDT 0.6B v3 STT, Qwen3-TTS\n- OpenRouter·Together·Fireworks·OpenAI 등 프로토콜 호환 프로바이더로 자유 교체\n- Mac에서는 MLX와 Qwen3-4B-Instruct-2507 조합으로 저지연 로컬 실행 권장\n- 대화·표정·시각·행동을 소프트웨어처럼 교체하는 앱 생태계 구조\n\n출처: huggingface.co",
          "source": "https://huggingface.co/blog/local-reachy-mini-conversation",
          "officialUrl": "https://huggingface.co/blog/local-reachy-mini-conversation",
          "slug": "local-reachy-mini-conversation-fc9a2700",
          "tags": [
            "Hugging Face / Pollen Robotics",
            "robotics"
          ]
        },
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "Hugging Face 에이전트 용어집: 모델, 스캐폴드, 하네스 구분",
          "summary": "Hugging Face가 에이전트를 모델(답을 만드는 뇌), 스캐폴드(지시문·도구 설명·기억 구조), 하네스(도구를 실제로 실행하고 멈추는 운전석)로 구분해 정리했다. 이 구분을 모르면 Claude Code, Codex, Cursor의 차이를 계속 모델 성능으로만 보게 된다.",
          "content": "Hugging Face가 에이전트를 모델(답을 만드는 뇌), 스캐폴드(지시문·도구 설명·기억 구조), 하네스(도구를 실제로 실행하고 멈추는 운전석)로 구분해 정리했다. 이 구분을 모르면 Claude Code, Codex, Cursor의 차이를 계속 모델 성능으로만 보게 된다.\n\n핵심 사실:\n\n- 에이전트를 모델·스캐폴드·하네스 세 층으로 구분해 정의\n- 이 구분이 없으면 Claude Code·Codex·Cursor의 차이를 모델 성능 차이로만 오해하게 됨\n\n출처: huggingface.co",
          "source": "https://huggingface.co/blog/agent-glossary",
          "officialUrl": "https://huggingface.co/blog/agent-glossary",
          "slug": "agent-glossary-a416b41a",
          "tags": [
            "Hugging Face",
            "AI 에이전트"
          ]
        }
      ]
    },
    {
      "name": "Figure",
      "color": "#111111",
      "posts": [
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "Figure, Catalyst Brands와 휴머노이드 물류 배치 계약 체결",
          "summary": "Figure가 JCPenney·Aéropostale·Brooks Brothers를 운영하는 Catalyst Brands와 휴머노이드 로봇을 물류망에 배치하는 상업 계약을 체결했다. 네바다 리노 물류센터에서 시작해 분배·물류의 고강도 반복 작업을 자동화한다.",
          "content": "Figure가 JCPenney·Aéropostale·Brooks Brothers를 운영하는 Catalyst Brands와 휴머노이드 로봇을 물류망에 배치하는 상업 계약을 체결했다. 네바다 리노 물류센터에서 시작해 분배·물류의 고강도 반복 작업을 자동화한다.\n\n핵심 사실:\n\n- Catalyst Brands의 네바다주 리노 물류센터를 첫 배치 거점으로 선정\n- 다브랜드 포트폴리오 전반에 유연하게 투입 가능한 차세대 Figure 로봇 활용\n- Brookfield가 양사 모두에 투자한 첫 상업적 연결 사례\n- 반복 작업은 로봇이 맡고 인력은 고부가 업무로 전환하는 구조\n\n출처: figure.ai",
          "source": "https://www.figure.ai/news/figure-signs-agreement-with-catalyst-brands",
          "officialUrl": "https://www.figure.ai/news/figure-signs-agreement-with-catalyst-brands",
          "slug": "figure-signs-agreement-with-catalyst-brands-64cc23b2",
          "tags": [
            "Figure",
            "robotics"
          ]
        }
      ]
    },
    {
      "name": "오픈소스 · 커뮤니티",
      "color": "#6B7280",
      "posts": [
        {
          "date": "5/30",
          "platform": "X+Threads",
          "title": "avai: 호스트 텔레메트리를 LLM이 분류하는 오픈소스 보안 도구",
          "summary": "avai는 macOS/Linux의 프로세스, USB, 브라우저 확장, 네트워크 흐름 같은 흔적을 모으고 LLM이 위험 신호를 분류하는 오픈소스다. 보안팀이 없는 1인 개발자나 소규모 팀에 유용하다.",
          "content": "avai는 macOS/Linux의 프로세스, USB, 브라우저 확장, 네트워크 흐름 같은 흔적을 모으고 LLM이 위험 신호를 분류하는 오픈소스다. 보안팀이 없는 1인 개발자나 소규모 팀에 유용하다.\n\n핵심 사실:\n\n- macOS/Linux의 프로세스·USB·브라우저 확장·네트워크 흐름을 수집해 LLM이 위험 신호를 분류\n- 보안팀이 없는 1인 개발자·소규모 팀을 겨냥한 오픈소스\n\n출처: github.com",
          "source": "https://github.com/iklobato/avai",
          "officialUrl": "https://github.com/iklobato/avai",
          "slug": "avai-0dff2414",
          "tags": [
            "iklobato",
            "AI 보안"
          ]
        },
        {
          "date": "5/30",
          "platform": "X+Threads",
          "title": "PingCAP mem9: 에이전트 메모리는 저장소가 아니라 판단 시스템",
          "summary": "AI 에이전트를 오래 쓸 때 가장 답답한 부분은 기억이다. 매번 같은 맥락을 다시 설명해야 하고 중요한 정보는 잊고 불필요한 것은 다시 끌고 온다. PingCAP이 mem9을 만들며 정리한 핵심은 에이전트 메모리가 저장소가 아니라 판단 시스템이라는 점이다.",
          "content": "AI 에이전트를 오래 쓸 때 가장 답답한 부분은 기억이다. 매번 같은 맥락을 다시 설명해야 하고 중요한 정보는 잊고 불필요한 것은 다시 끌고 온다. PingCAP이 mem9을 만들며 정리한 핵심은 에이전트 메모리가 저장소가 아니라 판단 시스템이라는 점이다.\n\n핵심 사실:\n\n- PingCAP이 에이전트 메모리 제품 mem9 구축 경험을 공식 블로그에 공개\n- 에이전트 메모리는 단순 저장소가 아니라 무엇을 기억·회수할지 판단하는 시스템이라는 결론\n\n출처: pingcap.com",
          "source": "https://www.pingcap.com/blog/how-we-built-mem9-agent-memory-product/",
          "officialUrl": "https://www.pingcap.com/blog/how-we-built-mem9-agent-memory-product/",
          "slug": "how-we-built-mem9-agent-memory-product-918f943c",
          "tags": [
            "PingCAP",
            "AI 에이전트"
          ]
        },
        {
          "date": "5/28",
          "platform": "X+Threads",
          "title": "UI Design Direction 2026–2027: 유행어보다 스큐어모피즘의 맥락",
          "summary": "Michal Malewicz가 Medium에 UI Design Direction 2026–2027 글을 올렸다. Spotify 20주년 디스코볼 로고를 두고 disco-morphism 같은 표현이 나왔지만 핵심은 새 유행어보다 맥락이다. 스큐어모피즘(현실의 질감·입체감·물성을 디지털 UI에 가져오는 방식)을 제품답게 쓰는 방법이 더 중요해지고 있다.",
          "content": "Michal Malewicz가 Medium에 UI Design Direction 2026–2027 글을 올렸다. Spotify 20주년 디스코볼 로고를 두고 disco-morphism 같은 표현이 나왔지만 핵심은 새 유행어보다 맥락이다. 스큐어모피즘(현실의 질감·입체감·물성을 디지털 UI에 가져오는 방식)을 제품답게 쓰는 방법이 더 중요해지고 있다.\n\n핵심 사실:\n\n- Spotify 20주년 디스코볼 로고를 계기로 disco-morphism 같은 표현이 등장\n- 핵심은 새 유행어가 아니라 스큐어모피즘을 제품 맥락에 맞게 쓰는 방법\n\n출처: michalmalewicz.medium.com",
          "source": "https://michalmalewicz.medium.com/ui-design-direction-2026-2027-2b4b6eb88336",
          "officialUrl": "https://michalmalewicz.medium.com/ui-design-direction-2026-2027-2b4b6eb88336",
          "slug": "ui-design-direction-2026-2027-2b4b6eb88336-2e9d8ce7",
          "tags": [
            "Michal Malewicz",
            "UI/UX 디자인"
          ]
        },
        {
          "date": "5/27",
          "platform": "X+Threads",
          "title": "PrismML Bonsai Image 4B: 브라우저 WebGPU에서 도는 ternary 이미지 모델",
          "summary": "이미지 AI가 클라우드 앱에서 사용자 기기 쪽으로 내려오고 있다. PrismML이 Bonsai Image 4B 계열을 공개했는데, 1-bit/ternary로 가중치를 극단적으로 줄여 이미지 생성 모델을 가볍게 만들고 WebGPU에서도 구동하는 방향이다.",
          "content": "이미지 AI가 클라우드 앱에서 사용자 기기 쪽으로 내려오고 있다. PrismML이 Bonsai Image 4B 계열을 공개했는데, 1-bit/ternary로 가중치를 극단적으로 줄여 이미지 생성 모델을 가볍게 만들고 WebGPU에서도 구동하는 방향이다.\n\n핵심 사실:\n\n- 1-bit/ternary로 가중치를 극단적으로 줄여 이미지 생성 모델을 경량화\n- 브라우저 WebGPU에서도 구동하는 온디바이스 이미지 생성 방향\n\n출처: prismml.com",
          "source": "https://prismml.com/",
          "officialUrl": "https://prismml.com/",
          "slug": "prismml-ef4c4b30",
          "tags": [
            "PrismML",
            "이미지 생성"
          ]
        },
        {
          "date": "5/27",
          "platform": "X+Threads",
          "title": "YouTube MCP: 에이전트가 영상·자막을 연구 소스로 호출하는 오픈소스",
          "summary": "AI 에이전트가 YouTube도 연구 자료로 다루기 시작했다. Show HN에 올라온 YouTube MCP는 에이전트가 영상 검색·자막·채널 최신 업로드를 도구처럼 호출하게 해주는 오픈소스다. MCP(모델 컨텍스트 프로토콜)는 AI에 외부 도구를 연결하는 표준 방식이다.",
          "content": "AI 에이전트가 YouTube도 연구 자료로 다루기 시작했다. Show HN에 올라온 YouTube MCP는 에이전트가 영상 검색·자막·채널 최신 업로드를 도구처럼 호출하게 해주는 오픈소스다. MCP(모델 컨텍스트 프로토콜)는 AI에 외부 도구를 연결하는 표준 방식이다.\n\n핵심 사실:\n\n- 에이전트가 영상 검색·자막·채널 최신 업로드를 도구처럼 호출하는 오픈소스 MCP 서버\n- MCP(모델 컨텍스트 프로토콜)는 AI에 외부 도구를 연결하는 표준 방식\n\n출처: github.com",
          "source": "https://github.com/ZeroPointRepo/youtube-mcp",
          "officialUrl": "https://github.com/ZeroPointRepo/youtube-mcp",
          "slug": "youtube-mcp-cd3abb38",
          "tags": [
            "ZeroPointRepo",
            "AI 에이전트"
          ]
        },
        {
          "date": "5/27",
          "platform": "X+Threads",
          "title": "agent-workspace-linux: AI 에이전트 전용 격리 Linux 데스크톱",
          "summary": "AI에게 실제 화면을 맡기는 것이 불안하다면 전용 컴퓨터를 따로 주는 방식이 대안이다. agent-workspace-linux는 AI 에이전트가 별도의 숨겨진 Linux 데스크톱을 조작하게 해주는 오픈소스다. MCP로 연결되며 사용자의 마우스·키보드·브라우저 세션은 건드리지 않는 구조다.",
          "content": "AI에게 실제 화면을 맡기는 것이 불안하다면 전용 컴퓨터를 따로 주는 방식이 대안이다. agent-workspace-linux는 AI 에이전트가 별도의 숨겨진 Linux 데스크톱을 조작하게 해주는 오픈소스다. MCP로 연결되며 사용자의 마우스·키보드·브라우저 세션은 건드리지 않는 구조다.\n\n핵심 사실:\n\n- AI 에이전트가 별도 숨겨진 Linux 데스크톱을 조작하게 해주는 오픈소스\n- MCP로 연결되며 사용자 마우스·키보드·브라우저 세션은 건드리지 않는 격리 구조\n\n출처: github.com",
          "source": "https://github.com/agent-sh/agent-workspace-linux",
          "officialUrl": "https://github.com/agent-sh/agent-workspace-linux",
          "slug": "agent-workspace-linux-30b4793d",
          "tags": [
            "agent-sh",
            "AI 에이전트"
          ]
        },
        {
          "date": "5/27",
          "platform": "X+Threads",
          "title": "Gentle-Coding: 압박 대신 멈출 여지를 줘 AI 루프·환각을 줄이는 PoC",
          "summary": "AI에게 무조건 맞히라고 압박하면 오히려 헛소리가 늘어나는지 확인하는 Gentle-Coding이라는 PoC(개념 검증) 실험이 공유됐다. 핵심은 고압적인 프롬프트 대신 막히면 멈추고 모른다고 말해도 되는 여지를 주는 방식이다.",
          "content": "AI에게 무조건 맞히라고 압박하면 오히려 헛소리가 늘어나는지 확인하는 Gentle-Coding이라는 PoC(개념 검증) 실험이 공유됐다. 핵심은 고압적인 프롬프트 대신 막히면 멈추고 모른다고 말해도 되는 여지를 주는 방식이다.\n\n핵심 사실:\n\n- 무조건 맞히라는 고압 프롬프트가 오히려 환각을 늘리는지 확인하는 PoC 실험\n- 막히면 멈추고 모른다고 말할 여지를 주는 방식으로 AI 루프·환각 감소 시도\n\n출처: github.com",
          "source": "https://github.com/OttoRenner/Gentle-Coding",
          "officialUrl": "https://github.com/OttoRenner/Gentle-Coding",
          "slug": "gentle-coding-440a8aee",
          "tags": [
            "OttoRenner",
            "AI 코딩"
          ]
        },
        {
          "date": "5/27",
          "platform": "X+Threads",
          "title": "MetaLens: Metabase 대시보드를 점검하는 AI 에이전트",
          "summary": "AI 에이전트가 코딩만 하는 단계는 빠르게 지나가고 있다. MetaLens는 Metabase 대시보드를 AI 에이전트가 점검해 깨진 쿼리, 오래된 차트, 중복 지표를 찾아주는 서비스다. 데이터 대시보드 청소 로봇에 가깝다.",
          "content": "AI 에이전트가 코딩만 하는 단계는 빠르게 지나가고 있다. MetaLens는 Metabase 대시보드를 AI 에이전트가 점검해 깨진 쿼리, 오래된 차트, 중복 지표를 찾아주는 서비스다. 데이터 대시보드 청소 로봇에 가깝다.\n\n핵심 사실:\n\n- Metabase 대시보드를 AI 에이전트가 점검해 깨진 쿼리·오래된 차트·중복 지표를 탐지\n- 데이터 대시보드 정리·청소에 특화된 에이전트 서비스\n\n출처: metalens.it",
          "source": "https://metalens.it/",
          "officialUrl": "https://metalens.it/",
          "slug": "metalens-47cb5183",
          "tags": [
            "MetaLens",
            "AI 에이전트"
          ]
        },
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "ClickHouse, 1년간 C++ 운영에 코딩 에이전트 쓴 기록 공개",
          "summary": "ClickHouse CTO Alexey Milovidov가 2026년 4월 1일 공식 블로그에 1년 가까이 코딩 에이전트를 실제 C++/CI/오픈소스 운영에 써 본 기록을 길게 공개했다. 핵심은 에이전트가 대신 생각하는 개발자가 아니라 검증 가능한 일을 빠르게 밀어붙이는 운영 장치에 가깝다는 점이다.",
          "content": "ClickHouse CTO Alexey Milovidov가 2026년 4월 1일 공식 블로그에 1년 가까이 코딩 에이전트를 실제 C++/CI/오픈소스 운영에 써 본 기록을 길게 공개했다. 핵심은 에이전트가 대신 생각하는 개발자가 아니라 검증 가능한 일을 빠르게 밀어붙이는 운영 장치에 가깝다는 점이다.\n\n핵심 사실:\n\n- ClickHouse CTO Alexey Milovidov가 1년 가까운 실제 C++/CI/오픈소스 운영 경험을 공식 블로그에 공개\n- 에이전트는 대신 생각하는 개발자가 아니라 검증 가능한 작업을 빠르게 처리하는 운영 장치에 가깝다는 결론\n\n출처: clickhouse.com",
          "source": "https://clickhouse.com/blog/agentic-coding",
          "officialUrl": "https://clickhouse.com/blog/agentic-coding",
          "slug": "agentic-coding-e3294625",
          "tags": [
            "ClickHouse",
            "AI 코딩"
          ]
        },
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "AI 활용은 프롬프트가 아니라 시스템: Eugene Yan 정리",
          "summary": "Eugene Yan이 정리한 핵심은 AI 활용이 잘 물어보기보다 AI가 매번 더 잘 일하게 되는 환경을 만드는 쪽에 가깝다는 것이다. AI를 자주 쓰는데도 실력이 쌓이지 않는다면 문제는 프롬프트가 아닐 수 있다.",
          "content": "Eugene Yan이 정리한 핵심은 AI 활용이 잘 물어보기보다 AI가 매번 더 잘 일하게 되는 환경을 만드는 쪽에 가깝다는 것이다. AI를 자주 쓰는데도 실력이 쌓이지 않는다면 문제는 프롬프트가 아닐 수 있다.\n\n핵심 사실:\n\n- AI 활용의 핵심은 잘 묻는 프롬프트보다 AI가 매번 더 잘 일하게 되는 시스템·환경 설계\n- 자주 쓰는데도 실력이 쌓이지 않는다면 원인은 프롬프트가 아닐 수 있다는 진단\n\n출처: eugeneyan.com",
          "source": "https://eugeneyan.com/writing/working-with-ai/",
          "officialUrl": "https://eugeneyan.com/writing/working-with-ai/",
          "slug": "working-with-ai-459b0410",
          "tags": [
            "Eugene Yan",
            "AI 활용/워크플로우"
          ]
        },
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "Spice: 에이전트 실행 위에 의사결정 층을 분리한 오픈소스 런타임",
          "summary": "AI 에이전트 자동화에서 자주 빠지는 조각은 실행보다 먼저 무엇을 왜 해야 하는지 정하는 의사결정 층이다. Spice는 그 층을 따로 떼어낸 오픈소스 런타임이다.",
          "content": "AI 에이전트 자동화에서 자주 빠지는 조각은 실행보다 먼저 무엇을 왜 해야 하는지 정하는 의사결정 층이다. Spice는 그 층을 따로 떼어낸 오픈소스 런타임이다.\n\n핵심 사실:\n\n- 에이전트 자동화에서 실행보다 먼저 무엇을 왜 할지 정하는 의사결정 층을 분리\n- 그 의사결정 층을 별도 오픈소스 런타임으로 구현한 프로젝트\n\n출처: github.com",
          "source": "https://github.com/Dyalwayshappy/Spice",
          "officialUrl": "https://github.com/Dyalwayshappy/Spice",
          "slug": "spice-4e7d1002",
          "tags": [
            "Spice",
            "AI 에이전트"
          ]
        },
        {
          "date": "5/26",
          "platform": "X+Threads",
          "title": "AI 코딩 에이전트용 로컬 Techdocs: 문서를 SQLite 지식 지도로",
          "summary": "AI 코딩 에이전트가 헛도는 팀은 프롬프트보다 로컬 문서 DB를 먼저 점검할 필요가 있다. Philip Heltweg가 정리한 방식은 문서를 수집한 뒤 분류하고 임베딩하고 링크 그래프로 묶어 SQLite에 넣는 것이다. 에이전트에게 인터넷 전체가 아니라 프로젝트 문서 지도를 제공하는 접근이다.",
          "content": "AI 코딩 에이전트가 헛도는 팀은 프롬프트보다 로컬 문서 DB를 먼저 점검할 필요가 있다. Philip Heltweg가 정리한 방식은 문서를 수집한 뒤 분류하고 임베딩하고 링크 그래프로 묶어 SQLite에 넣는 것이다. 에이전트에게 인터넷 전체가 아니라 프로젝트 문서 지도를 제공하는 접근이다.\n\n핵심 사실:\n\n- 문서를 수집·분류·임베딩한 뒤 링크 그래프로 묶어 SQLite에 저장하는 로컬 techdocs 방식\n- 에이전트에게 인터넷 전체가 아니라 프로젝트 문서 지도를 제공하는 접근\n\n출처: heltweg.org",
          "source": "https://www.heltweg.org/posts/improving-local-techdocs-for-your-ai-coding-agent/",
          "officialUrl": "https://www.heltweg.org/posts/improving-local-techdocs-for-your-ai-coding-agent/",
          "slug": "improving-local-techdocs-for-your-ai-coding-agen-bad0d4a0",
          "tags": [
            "Philip Heltweg",
            "AI 코딩"
          ]
        }
      ]
    }
  ]
};
