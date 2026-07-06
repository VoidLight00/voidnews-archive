import type { WeeklyData } from "../data";

// 2026-w21 (5/15 ~ 5/21)
// 자동 생성: 4라운드 수집 + 5차 prune 기반 archive
// 주차 기준 목~수 (5/15 목 = 새 주차 시작)

export const week21: WeeklyData = {
  week: 21,
  year: 2026,
  slug: "2026-w21",
  period: "5/15 ~ 5/21",
  totalPosts: 64,
  companies: [
    {
      name: "OpenAI",
      color: "#10A37F",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "AdventHealth, OpenAI 와 전인적 치료 모델 적용 — 9개 주 50여 개 병원에 ChatGPT for Healthcare 도입",
          summary: "",
          content: `미국 9개 주에서 50여 개 병원을 운영하는 비영리 의료법인 AdventHealth가 2026년 5월 21일 OpenAI와의 협업을 공식 사례로 공개했습니다. 임상·운영·환자 경험 세 갈래에 ChatGPT for Healthcare를 도입해 "whole-person care(신체·심리·영적 건강을 함께 보는 진료 모델)"를 확장한다는 발표.

- 도입 범위: 의사·간호사용 임상 보조, 운영 자동화, 환자 응대
- 컴플라이언스: ChatGPT Enterprise의 HIPAA-compliant 워크스페이스 위에서 작동
- 같은 주차에 OpenAI는 Codex의 HIPAA 트랙도 같이 GA 처리

### 한국 헬스케어 관점

같은 주 OpenAI가 모바일 Codex와 함께 HIPAA-compliant Codex 워크스페이스를 푼 흐름의 임상 쇼케이스입니다. 국내 대형 병원의 EMR 연동 PoC는 여전히 KISA 망분리·HIRA 데이터 가이드 위에서 별도 검토가 필요하지만, "AI 도입의 첫 단추는 임상 보조가 아니라 운영·환자 응대"라는 도입 순서는 그대로 가져올 수 있습니다.`,
          officialUrl: "https://openai.com/index/adventhealth",
          source: "https://openai.com/index/adventhealth",
          tags: ["ChatGPT for Healthcare", "공식"],
          slug: "adventhealth-advances-whole-person-care--54bdd59c",
          readMinutes: 1,
        },
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Codex Rust CLI v0.133.0 — Goals 신규 작업 단위 도입",
          summary: "",
          content: `OpenAI Codex의 Rust CLI 0.133.0이 2026년 5월 21일 GitHub에 태그됐습니다. 같은 주에 풀린 모바일·Hooks GA·Remote SSH 흐름의 마지막 조각으로, CLI 단에서도 "Goals"라는 새 작업 단위가 처음 등장했습니다.

- 신규 단위: Goal — 단일 명령이 아니라 여러 step·승인·도구 호출이 묶인 장기 실행 작업
- planner / exec 분리: planner가 step을 쪼개고, exec가 sandbox에서 실제 실행
- Hooks GA와 묶임: Goal 실행 중 이벤트마다 사용자 hook script 트리거 가능
- 호환: 같은 주 발표된 macOS Codex 데스크톱 앱·모바일 컨트롤과 동일 세션 모델

### CLI · 모바일 · 데스크톱이 한 세션으로

Goal은 한 가지 흐름을 가정하고 설계됐습니다. CLI에서 시작한 작업이 데스크톱 앱의 시각화 패널로 이어지고, 출장이나 회의 중에는 모바일에서 승인만 받는 식입니다. Anthropic의 Claude Code Agent View가 같은 방향의 다른 구현이고, Cursor·Codex·Claude Code 모두 "장기 실행 에이전트 + 다중 표면 승인"으로 수렴 중입니다.

Rust CLI를 굳이 모바일/데스크톱과 같은 세션 모델로 묶은 건 CI·터미널 우선 개발자를 끝까지 잡겠다는 신호입니다. 한국 팀 입장에서는 Codex를 도입할 때 IDE GUI 한 가지가 아니라 CLI 자동화 라인까지 같이 검토해야 동급 기능을 다 쓰게 됩니다.`,
          officialUrl: "https://github.com/openai/codex/releases/tag/rust-v0.133.0",
          source: "https://github.com/openai/codex/releases/tag/rust-v0.133.0",
          tags: ["Codex CLI", "Goals", "공식", "hero후보"],
          featured: true,
          slug: "codex-rust-v0-133-0-184c8422",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/codex-rust-v0-133-0-0230f963.png",
            alt: "Codex rust-v0.133.0",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "OpenAI 모델, 이산 기하의 중심 추측을 반례로 무너뜨림",
          summary: "",
          content: `OpenAI 연구팀이 2026년 5월 20일 자체 모델이 이산 기하(discrete geometry)의 중심 추측 하나를 반례로 무너뜨렸다고 발표했습니다. 인간 수학자들이 수십 년 검증을 시도해 온 명제에 대해 모델이 직접 반례 구조를 제안·검증했다는 내용.

- 도메인: discrete geometry — 점, 다면체, 볼록 도형의 조합론적 구조
- 결과물: 추측을 깨는 구체적 반례 구조 + 검증 과정
- 검증 방식: 컴퓨터 검증(formal proof) 라인까지 통과
- 모델 명세는 비공개

### 왜 이 발표를 흘려보내면 안 되나

GPT-5.x 라인이 IMO 수준의 수능형 문제를 푸는 데서 한 발 더 나아가, 인간 수학자가 아직 모르던 명제의 진위를 결정한 첫 공식 사례에 가깝습니다. Google DeepMind의 AlphaProof, AlphaGeometry 흐름과 같은 트랙이지만, OpenAI 라인에서는 처음입니다.

연구·교수직군 입장에서는 두 가지 시사가 있습니다. 하나는 "AI가 발견한 반례를 사람이 다시 증명·확장하는" 협업 패턴이 정상 출판 루프에 들어오기 시작했다는 점, 다른 하나는 한국 수학·CS 학과가 보조정리 자동 탐색 도구를 무시할 수 없는 시점에 진입했다는 점입니다.`,
          officialUrl: "https://openai.com/index/model-disproves-discrete-geometry-conjecture",
          source: "https://openai.com/index/model-disproves-discrete-geometry-conjecture",
          tags: ["OpenAI Research", "Math", "공식"],
          slug: "an-openai-model-has-disproved-a-central--73dee1f9",
          readMinutes: 1,
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "OpenAI Education for Countries 다음 단계 — 국가 단위 ChatGPT EDU 라이선스 확장",
          summary: "",
          content: `OpenAI가 2026년 5월 20일 "Education for Countries" 이니셔티브의 차기 단계를 발표했습니다. 단일 학교가 아니라 국가 단위로 ChatGPT 교육 라이선스·교사 연수·커리큘럼 통합을 묶어 제공하는 정부 협업 트랙입니다.

- 대상: 국가 교육부, 공립 학교 시스템
- 묶음: ChatGPT EDU 라이선스 + 교사 연수 + 안전·평가 도구
- 같은 주차 발표 OpenAI for Singapore, OpenAI Malta ChatGPT Plus와 한 라인
- 이전 단계는 학교·대학 개별 협업이었고, 이번 단계는 국가 차원으로 확장

### 한국 교육 정책 관점

같은 흐름의 Anthropic Claude for Education, Google for Education이 모두 "교육과정에 AI를 직접 박는" 트랙으로 가는 중입니다. 한국은 디지털 교과서·AI 디지털 교사 사업이 별도 진행 중이라 OpenAI가 직접 참여할 여지는 제한적이지만, 사교육·대학원·기업 교육 라인은 이 모델을 그대로 차용할 수 있습니다.

발표의 의미는 "교육이 AI 도입의 다음 정책 전장"이라는 신호 자체에 있습니다.`,
          officialUrl: "https://openai.com/index/the-next-phase-of-education-for-countries",
          source: "https://openai.com/index/the-next-phase-of-education-for-countries",
          tags: ["Education for Countries", "Global Affairs", "공식"],
          slug: "the-next-phase-of-openai-s-education-for-b2b66ea4",
          readMinutes: 1,
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Ramp 엔지니어들이 Codex 로 코드 리뷰를 가속하는 방식",
          summary: "",
          content: `핀테크 회사 Ramp가 2026년 5월 20일 OpenAI Codex와 GPT-5.5를 사내 코드 리뷰 파이프라인에 결합한 사례를 공식 케이스 스터디로 공개했습니다. PR 리뷰의 1차 패스를 Codex가 처리하고, 사람 리뷰어는 비즈니스 로직과 보안 검토에 집중하는 구조.

- 적용 단계: PR 생성 직후 자동 트리거 → diff 요약 + 잠재 회귀 + 테스트 누락 지적
- 사용자: Ramp 엔지니어 (수백 명 규모)
- 모델 라인: Codex (대규모 리팩토링·테스트) + GPT-5.5 (요약·체크리스트)
- 결과: 사람 리뷰 1순회 시간 단축, 머지 전 사고 사전 차단

### 다른 기업 사례와 한 라인

같은 주차 발표된 OpenAI-Dell 파트너십(하이브리드·온프레미스 Codex), KPMG-Anthropic 전사 도입(27만 명)과 함께 보면 "엔터프라이즈가 PR 리뷰부터 코드 작성까지 단계적으로 AI를 박는" 흐름이 정착 중입니다. 차이는 도입 깊이뿐입니다.

한국에서 PR 리뷰 자동화를 시도하는 팀이 가장 자주 막히는 지점은 "리뷰 정책을 어디까지 모델이 결정하게 두느냐"다. Ramp 사례의 핵심은 모델에게 결정권을 주지 않고, 체크리스트와 잠재 이슈만 제시한 뒤 사람이 최종 머지를 한다는 운영 룰에 있습니다.`,
          officialUrl: "https://openai.com/index/ramp",
          source: "https://openai.com/index/ramp",
          tags: ["Codex", "GPT-5.5", "enterprise adoption", "공식"],
          slug: "how-ramp-engineers-accelerate-code-revie-dfe54bb2",
          readMinutes: 1,
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "OpenAI Cookbook 신규 챕터 — Macro evals cookbook 머지",
          summary: "",
          content: `OpenAI Cookbook 저장소에 2026년 5월 20일 "Macro evals cookbook" 신규 챕터가 머지됐습니다. 단일 프롬프트 단위 평가가 아니라, 에이전트가 여러 step·도구·외부 시스템을 거치는 워크플로우 전체를 평가하는 패턴 모음입니다.

- 다루는 범위: 다단계 에이전트, 도구 호출 시퀀스, 외부 API 회귀, 비결정성 처리
- 비교: 기존 prompt eval(단일 turn) vs macro eval(전체 workflow)
- 동봉: trace 캡처, golden set 구성, regression bisect 방법

### 왜 지금 이 패턴이 필요한가

같은 주차 Google Managed Agents, Anthropic Stainless 인수, NVIDIA NeMo Agent Toolkit 같은 발표가 모두 "에이전트 런타임"을 추상화하는 방향이라, 평가 레이어도 한 단계 위로 끌어올려야 합니다. 단일 LLM 호출의 정확도가 아니라, 에이전트 한 사이클이 통째로 성공하는 비율을 봐야 한다는 합의가 빅3 모두에서 동시에 잡히는 중입니다.

한국 팀에서는 사내 LLM 도입 PoC가 보통 prompt eval에서 멈춰 있는데, 운영에 올리는 순간 macro eval 라인을 별도로 만들어야 회귀를 잡을 수 있습니다. Cookbook 챕터를 그대로 골든셋 템플릿으로 써도 무방합니다.`,
          officialUrl: "https://github.com/openai/openai-cookbook/commit/0075904c509819f8d746794001a7a27066258956",
          source: "https://github.com/openai/openai-cookbook/commit/0075904c509819f8d746794001a7a27066258956",
          tags: ["OpenAI Cookbook", "evals", "공식"],
          slug: "openai-cookbook-commit-macro-evals-cookb-d9bf2d74",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/openai-cookbook-신규-챕터-macro-evals-cookbo-2f00d277.png",
            alt: "OpenAI Cookbook 신규 챕터 — Macro evals cookbook 머지",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "OpenAI for Singapore 공개 — 싱가포르 정부와 국가 단위 전략 파트너십",
          summary: "",
          content: `OpenAI가 2026년 5월 19일 싱가포르 정부와의 전략 파트너십 "OpenAI for Singapore"를 발표했습니다. 데이터센터·산업 도입·교육·정부 디지털화 네 갈래를 한 묶음으로 설계한 국가 단위 계약입니다.

- 인프라: 싱가포르 내 데이터센터·컴퓨트 확보 (사업자 미공개)
- 산업: 정부 산하 통계·복지·세무 시스템에 ChatGPT Enterprise 도입
- 교육: 같은 주차 "Education for Countries" 차기 단계와 연계
- 외교: 싱가포르를 동남아 AI 허브로 포지셔닝

### 같은 주 묶음과 비교

같은 주에 OpenAI는 Malta(전 국민 ChatGPT Plus), Singapore(전략 파트너십), Education for Countries 차기 단계를 동시에 발표했습니다. 패턴은 동일하다 — 작은 국가를 일종의 베타 사이트로 잡고, 한 국가의 모든 정부 부처에 동시에 깔리는 모델을 검증합니다.

한국에는 정부 차원의 OpenAI 단일 계약 가능성은 낮지만, 대기업·금융권의 "전사 ChatGPT Enterprise" 도입은 같은 모델을 따라갑니다. 싱가포르 케이스에서 봐야 할 건 도입 범위가 아니라 거버넌스 — 데이터 leakage, 모델 업데이트 통제, 감사 로그를 정부 단위로 어떻게 풀었는지가 핵심입니다.`,
          officialUrl: "https://openai.com/index/introducing-openai-for-singapore",
          source: "https://openai.com/index/introducing-openai-for-singapore",
          tags: ["OpenAI for Singapore", "Global Affairs", "공식"],
          slug: "introducing-openai-for-singapore-39fd4877",
          readMinutes: 1,
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "OpenAI 콘텐츠 출처(Content Provenance) 정책 강화 — C2PA 메타데이터 강제 부착",
          summary: "",
          content: `OpenAI가 2026년 5월 19일 콘텐츠 출처(content provenance) 정책을 한 단계 강화한다고 발표했습니다. 자사 이미지·영상·오디오 출력에 C2PA Content Credentials 메타데이터를 강제 부착하고, 외부 검증 도구와의 호환 라인을 늘립니다.

- 표준: C2PA(Coalition for Content Provenance and Authenticity)
- 적용: DALL·E, Sora, Voice 출력 전반에 메타데이터 자동 삽입
- 사용자 옵션: 메타데이터 제거 불가 (모델 사용 시 강제)
- 검증: 공개 검증 사이트 및 외부 플랫폼(Adobe·Microsoft·Meta) 호환

### Google SynthID와의 역할 분담

같은 주차 Google I/O 2026에서 Gemini Omni가 SynthID 비가시 워터마크 + C2PA를 동시에 강제했습니다. 두 표준의 역할 분담이 시장에서 자리잡는 흐름 — SynthID는 변조에 강한 비가시 신호, C2PA는 사람이 검증 가능한 메타데이터.

한국에서 AI 생성물 라벨링 의무화 논의가 진행 중인 상황에서, OpenAI·Google·Meta가 동일 표준을 강제하면 사실상 법제화 이전에 산업 표준이 정립됩니다. 미디어·플랫폼 업계는 C2PA 검증 라이브러리를 사전 검토해 두는 게 안전합니다.`,
          officialUrl: "https://openai.com/index/advancing-content-provenance",
          source: "https://openai.com/index/advancing-content-provenance",
          tags: ["Safety", "Content provenance", "공식"],
          slug: "advancing-content-provenance-for-a-safer-7ce118d8",
          readMinutes: 1,
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Codex Rust CLI v0.132.0 — Python SDK 인증을 ChatGPT 계정으로 통합",
          summary: "",
          content: `Codex Rust CLI 0.132.0이 2026년 5월 19일 GitHub에 태그됐습니다. 0.133.0의 Goals 도입 이전 단계로, 가장 큰 변화는 Python SDK 인증 라인을 ChatGPT 계정과 통합한 부분입니다.

- Python SDK auth: ChatGPT 계정 토큰으로 OpenAI Python SDK 인증 가능
- CLI ↔ SDK 라인 통일: 같은 토큰이 양쪽에서 작동
- 0.133.0의 Goals를 위한 사전 작업 (planner / exec 분리 시작)

### 도입 팀이 챙길 포인트

API 키 별도 발급·관리 부담이 사라지는 효과가 가장 큽니다. CI에 OpenAI를 박을 때 API 키 만료·rotation을 매번 신경 써야 했는데, ChatGPT 계정 토큰으로 통일되면 사내 SSO와 한 라인에서 관리할 수 있습니다.

다만 ChatGPT 계정 = 개인이라는 모델은 그대로라서, 팀 단위 사용은 Business·Enterprise 워크스페이스 단에서 별도 관리해야 합니다. 0.133.0과 묶어 한 번에 도입 정책을 정리하는 게 효율적입니다.`,
          officialUrl: "https://github.com/openai/codex/releases/tag/rust-v0.132.0",
          source: "https://github.com/openai/codex/releases/tag/rust-v0.132.0",
          tags: ["Codex CLI", "Python SDK auth", "공식"],
          slug: "codex-rust-v0-132-0-7e22537d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/codex-rust-v0-132-0-7e22537d.jpg",
            alt: "Codex rust-v0.132.0",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "OpenAI · Dell 파트너십 — Codex 를 하이브리드·온프레미스 엔터프라이즈 환경에 배포",
          summary: "",
          content: `OpenAI와 Dell이 2026년 5월 18일 Dell Technologies World에서 Codex를 하이브리드·온프레미스 엔터프라이즈 환경에 배포하는 파트너십을 공식화했습니다. 같은 키노트에서 NVIDIA Jensen Huang이 "demand is going parabolic"이라고 표현한 AI factory 흐름의 소프트웨어 짝입니다.

- 배포 옵션: 클라우드 / 하이브리드 / 온프레미스 (Dell 하드웨어 위)
- 인프라: Dell AI Factory with NVIDIA(같은 주차 확장 발표)
- 컴플라이언스: 규제 산업·금융·정부용 데이터 격리 환경
- 채널: Dell 영업 라인을 통해 직접 판매·구축

### 한국 SI·금융권에 갖는 의미

망분리·온프레미스 요구가 있는 한국 금융권·공공 기관은 OpenAI를 직접 도입하기 어려운 구조였습니다. Dell 채널로 온프레미스 Codex를 깔 수 있게 되면, KB·신한·우리 같은 금융지주와 KISA 가이드를 따라야 하는 공기업도 도입 검토를 시작할 수 있습니다.

다만 모델 가중치가 실제로 내려오는지, Azure 라인을 그대로 쓰는지는 발표에 명시되지 않았습니다. 도입 검토 시 가장 먼저 확인해야 할 항목입니다.`,
          officialUrl: "https://openai.com/index/dell-codex-enterprise-partnership",
          source: "https://openai.com/index/dell-codex-enterprise-partnership",
          tags: ["Codex", "Dell", "enterprise deployment", "공식"],
          slug: "openai-and-dell-partner-to-bring-codex-t-9d5c4fff",
          readMinutes: 1,
        },
        {
          date: "5/16",
          platform: "X+Threads",
          title: "OpenAI · Malta 파트너십 — 몰타 전 시민에게 ChatGPT Plus 제공",
          summary: "",
          content: `OpenAI가 2026년 5월 16일 몰타 정부와 협약을 맺어 모든 몰타 시민에게 ChatGPT Plus를 제공한다고 발표했습니다. 사실상 한 국가 전체를 ChatGPT Plus 사용자 베이스로 흡수하는 첫 사례.

- 대상: 몰타 시민 약 50만 명 전원
- 비용: 정부 지원 (개인 부담 없음)
- 채널: 공공 ID 시스템과 연동된 인증
- 같은 주차 OpenAI for Singapore, Education for Countries와 한 라인

### "작은 국가 = 베타 사이트" 패턴

몰타는 인구가 작아서 정책 실험에 적합하고, EU 회원국이라 EU AI Act와의 호환을 테스트하기 좋습니다. OpenAI는 이걸 활용해서 "국가 단위 ChatGPT 보급"의 운영·법적 모델을 한 번에 검증합니다.

한국에서 정부가 전 국민 ChatGPT 라이선스를 사 줄 가능성은 낮지만, 통신 3사·금융지주·대기업 그룹 단위로 임직원 전원 ChatGPT 보급은 충분히 가능한 시나리오입니다. 몰타 케이스의 핵심은 가격이 아니라 인증·SSO·데이터 거버넌스 라인이 어떻게 풀렸는지에 있습니다.`,
          officialUrl: "https://openai.com/index/malta-chatgpt-plus-partnership",
          source: "https://openai.com/index/malta-chatgpt-plus-partnership",
          tags: ["ChatGPT Plus", "Malta", "Global Affairs", "공식"],
          slug: "openai-and-malta-partner-to-bring-chatgp-e74cfa1e",
          readMinutes: 1,
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "ChatGPT 새 개인 재무 경험 공개 — 예산·부채·투자 다단계 플로우",
          summary: "",
          content: `OpenAI가 2026년 5월 15일 ChatGPT의 개인 재무 경험을 새로 풀었습니다. 단순 챗봇 응답이 아니라 사용자의 자산·지출·목표를 컨텍스트로 둔 채 예산, 부채, 투자 계획을 다단계로 다루는 전용 흐름입니다.

- 입력: 사용자가 직접 등록한 자산·지출·목표 (외부 계좌 연결은 미공개)
- 산출: 예산 시나리오, 부채 우선순위, 목표 기반 저축 계획
- 컨텍스트 유지: 같은 주차 강화된 Memory 기능과 연동
- 한계: 정식 재무 자문이 아니라는 면책 고정

### 한국 사용자 적용 시 주의

핀테크(토스·뱅크샐러드·카카오뱅크)가 이미 자동 카테고라이징과 재무 어드바이스를 제공하는 국내 시장에서, ChatGPT가 직접 차별화할 영역은 좁습니다. 다만 외화·해외 주식·세무·세대별 재무 계획처럼 한국 핀테크가 약한 영역에서는 ChatGPT 쪽이 더 풍부한 시뮬레이션을 돌릴 수 있습니다.

가장 큰 리스크는 사용자가 면책을 무시하고 그대로 결정을 내리는 케이스입니다. 기관·법무 라인은 면책 + 출처 인용을 함께 강조하는 콘텐츠 가이드를 사전에 준비해 두는 게 안전합니다.`,
          officialUrl: "https://openai.com/index/personal-finance-chatgpt",
          source: "https://openai.com/index/personal-finance-chatgpt",
          tags: ["ChatGPT", "Personal finance", "공식"],
          slug: "a-new-personal-finance-experience-in-cha-4f6e31bb",
          readMinutes: 1,
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "Databricks, GPT-5.5 를 엔터프라이즈 에이전트 워크플로우에 통합",
          summary: "",
          content: `Databricks가 2026년 5월 15일 OpenAI GPT-5.5를 자사 엔터프라이즈 에이전트 워크플로우에 통합한다고 발표했습니다. Mosaic AI Agent Framework, Genie BI 어시스턴트, Unity Catalog 권한 라인이 GPT-5.5와 직접 연결됩니다.

- 통합 지점: Mosaic AI Agent Framework, Genie (자연어 BI), Unity Catalog 권한
- 데이터 경계: 모델 호출이 Databricks 워크스페이스 안에서 일어남 (데이터 외부 유출 차단)
- 라이선스: Databricks 고객사가 OpenAI 별도 계약 없이 GPT-5.5 사용 가능
- 같은 주차 OpenAI-Dell, OpenAI-Ramp 발표와 같이 "엔터프라이즈 채널 확장" 라인

### 데이터 거버넌스 관점

엔터프라이즈에서 GPT-5.5를 막던 가장 큰 사유는 "데이터가 OpenAI로 흘러나가는가"였습니다. Databricks 통합은 이 질문을 "Databricks 워크스페이스 경계 안에서 끝낸다"로 답했습니다. 한국 대기업이 Databricks를 표준 데이터 플랫폼으로 깐 경우(SK·롯데·삼성 일부 계열), 별도 OpenAI 계약 없이 GPT-5.5를 사용할 수 있는 경로가 새로 열립니다.

도입 시 가장 먼저 확인할 항목은 모델 호출 로그가 Unity Catalog 감사 라인에 그대로 남는지, 그리고 사용량 과금이 Databricks 청구서에 통합되는지 두 가지입니다.`,
          officialUrl: "https://openai.com/index/databricks",
          source: "https://openai.com/index/databricks",
          tags: ["GPT-5.5", "Databricks", "agents", "공식"],
          slug: "databricks-brings-gpt-5-5-to-enterprise--6719cd72",
          readMinutes: 1,
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "영업팀이 Codex 를 쓰는 방식",
          summary: "",
          content: `OpenAI Academy의 "Codex for Work" 트랙에 2026년 5월 15일 영업팀용 가이드가 추가됐습니다. 엔지니어가 아닌 영업 직군이 Codex를 도구로 쓰는 실제 워크플로우를 정리한 자료.

- 대상: B2B 영업, RevOps, Sales Engineering
- 사용 시나리오: 고객사 데모 환경 빠른 구축, RFP 응답 자동화, CRM 데이터 정합성 점검
- 권장 워크플로우: Codex가 코드를 쓰고, 영업 담당자가 의도 검증
- 같은 시기 동시 공개: business operations, data science 트랙

### 한국 영업 조직 적용

엔터프라이즈 영업이 매번 막히는 지점은 "고객사 환경에 맞춘 데모를 누가 만드느냐"다. Sales Engineering이 따로 있는 회사는 그쪽이 처리하지만, 중소·중견 SaaS는 영업이 직접 데모 환경을 손봐야 합니다. Codex로 영업 직군이 직접 데모 코드를 수정·재배포할 수 있다면 SE 부담을 30~50% 줄일 수 있다는 게 가이드의 가정.

도입 시 가장 큰 위험은 코드 권한입니다. 영업이 prod에 접근하지 않도록 sandbox·staging 한정 권한 라인을 사전에 설계해야 합니다.`,
          officialUrl: "https://openai.com/academy/codex-for-work/how-sales-teams-use-codex",
          source: "https://openai.com/academy/codex-for-work/how-sales-teams-use-codex",
          tags: ["Codex for Work", "Sales", "공식"],
          slug: "how-sales-teams-use-codex-43467e2c",
          readMinutes: 1,
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "기업 운영팀(BizOps)이 Codex 를 쓰는 방식",
          summary: "",
          content: `OpenAI Academy "Codex for Work" 트랙의 비즈니스 운영팀(BizOps) 가이드. 2026년 5월 15일 sales·data science 가이드와 함께 공개됐습니다.

- 사용 시나리오: 사내 도구 자동화, 부서간 데이터 통합 스크립트, 반복 보고서 자동 생성
- 표준 패턴: 작은 Python·Node 스크립트 + Notion·Slack·Sheets API 호출
- 권장 진입점: 매주 반복하는 수동 작업 한 가지를 Codex에 위임
- 동시 발표 Hooks GA와 묶어서, 이벤트 기반 자동화까지 한 사이클로 묶을 수 있음

### BizOps의 실제 도입 한계

엔지니어링 조직과 다르게 BizOps는 코드 리뷰·테스트·롤백 절차가 없는 경우가 많습니다. Codex가 만든 스크립트가 prod 데이터에 직접 영향을 주는 순간 사고 위험이 커집니다. 가이드는 이걸 인지하고 "처음 90일은 read-only 작업만"이라는 게이트를 권장합니다.

한국 회사에서 BizOps가 별도 조직이 아닌 경우가 많아 — 보통 경영지원·재무·인사가 분담 — 도입 단위가 부서가 아니라 사람 단위가 됩니다. 사내 도구 자동화 전담 인력을 한 명만 지정해도 충분히 시작할 수 있는 게 장점이자 함정입니다.`,
          officialUrl: "https://openai.com/academy/codex-for-work/how-business-operations-teams-use-codex",
          source: "https://openai.com/academy/codex-for-work/how-business-operations-teams-use-codex",
          tags: ["Codex for Work", "Business operations", "공식"],
          slug: "how-business-operations-teams-use-codex-14e2778d",
          readMinutes: 1,
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "데이터 사이언스 팀이 Codex 를 쓰는 방식",
          summary: "",
          content: `OpenAI Academy의 데이터 사이언스팀용 Codex 가이드. 2026년 5월 15일 공개된 "Codex for Work" 트랙 3종 중 하나.

- 사용 시나리오: notebook 코드 정리, 데이터 검증 스크립트, 실험 결과 자동 요약
- 권장 패턴: notebook → Codex가 production-ready script 변환 → CI에 등록
- 모델: Codex(Rust CLI) + GPT-5.5 (요약·문서화)
- 같은 주차 Databricks-GPT-5.5 통합과 직접 연결

### Notebook → Production 변환의 진짜 어려움

데이터 사이언스에서 가장 골치 아픈 게 "탐색용 notebook이 production 라인에 그대로 올라가서 깨지는" 케이스입니다. Codex가 잘하는 영역이 바로 이 변환 — 함수 분리, 의존성 정리, 테스트 추가, 환경 분기 등.

한국 데이터 조직은 분석가와 ML 엔지니어 사이의 경계가 모호한 경우가 많아, 한 사람이 탐색·실험·배포를 다 맡곤 합니다. Codex 같은 자동화가 들어오면 분석가가 production 직전 단계까지 혼자 끌고 갈 수 있어 ML 엔지니어 의존도가 줄어듭니다. 반대로 코드 품질·테스트 표준은 더 엄격하게 정해 둬야 합니다.`,
          officialUrl: "https://openai.com/academy/codex-for-work/how-data-science-teams-use-codex",
          source: "https://openai.com/academy/codex-for-work/how-data-science-teams-use-codex",
          tags: ["Codex for Work", "Data science", "공식"],
          slug: "how-data-science-teams-use-codex-f9d62a00",
          readMinutes: 1,
        },
        {
          date: "5/14",
          platform: "X+Threads",
          title: "ChatGPT 모바일 앱(iOS·Android)에 Codex 통합 — 폰이 에이전트 리모컨이 되다",
          summary: "OpenAI가 ChatGPT 모바일 앱(iOS/Android)에 Codex 원격 제어를 추가했습니다. 폰이 코드 편집기가 되는 게 아니라, Mac·devbox·원격 환경에서 돌아가는 Codex 세션을 원격으로 보고 승인·지시하는 컨트롤 표면이 됩니다. 같은 주에 Hooks GA, Programmatic access tokens, HIPAA-compliant Codex, Remote SSH GA도 같이 풀렸습니다.",
          content: `OpenAI가 2026년 5월 14일 ChatGPT 모바일 앱(iOS·Android)에 Codex를 통합했습니다. 폰을 새 코드 편집기로 만든 게 아니라, Mac·devbox·원격 환경에서 이미 돌아가는 Codex 세션을 폰에서 보고 승인하는 컨트롤 표면으로 붙였습니다.

- 연결: Mac의 Codex 데스크톱 앱에서 QR을 띄우고, 폰 ChatGPT 앱으로 스캔해서 세션을 페어링
- 폰에서 보이는 것: 터미널 출력, 스크린샷, diff, 테스트 결과, 권한 승인 요청
- 보안 경계: 파일·자격증명·repo는 Codex가 도는 PC에만 남고, 모바일은 명령과 승인만 왕복
- 플랜: 모든 ChatGPT 사용자가 프리뷰로 사용 (Free 포함)
- 1차 제약: macOS Codex 앱만 페어링 대상, Windows는 후속 일정 미공개

### 같은 주에 같이 풀린 묶음

"Codex가 어디서나 돌아간다"는 메시지를 완성하려고 OpenAI는 같은 주에 모바일 외 네 가지를 함께 GA로 올렸입니다.

- Hooks GA — 파일 변경·테스트 실패 같은 이벤트에 자동 트리거
- Programmatic access tokens — Business·Enterprise CI 파이프라인에서 Codex 호출 가능
- HIPAA-compliant Codex — ChatGPT Enterprise 의료 워크스페이스에서 PHI 처리 허용
- Remote SSH GA — 사내 원격 개발 머신에 Codex가 직접 접속

같은 주차에 Accenture·Capgemini·PwC와의 Codex Labs 파트너십도 발표돼서, 컨설팅 회사가 고객사 도입을 대행하는 채널까지 같이 깔렸습니다.

### 한국 팀이 실제로 잡을 포인트

Codex의 주간 활성 사용자는 400만을 넘긴 상태이고, OpenAI가 공식 사례로 인용한 Virgin Atlantic·Cisco·Notion·Rakuten은 모두 "코드 검토와 빌드 승인을 폰으로 처리한다"는 새 워크플로우를 전제로 합니다. 한국 팀에 직접 영향이 큰 부분은 두 가지입니다. 하나는 Windows 미지원 — 사내 표준이 Windows인 SI·금융권은 도입 시점이 자연히 늦어집니다. 다른 하나는 HIPAA 트랙이 ChatGPT Enterprise 단에서 따로 GA된 점으로, 의료·헬스케어 도메인은 일반 Codex가 아니라 Enterprise 의료 워크스페이스 라인을 별도 검토해야 합니다.

모바일은 새 IDE가 아니라 "이미 돌고 있는 에이전트의 리모컨"입니다. 그 관점에서 봐야 같은 주차 다른 발표(Hooks·SSH·tokens)와 한 그림으로 묶인입니다.`,
          officialUrl: "https://openai.com/index/",
          source: "https://openai.com/index/",
          tags: ["Codex", "ChatGPT mobile", "Codex Mac app", "Hooks", "Remote SSH", "공식", "hero후보"],
          featured: true,
          slug: "codex-in-the-chatgpt-mobile-app-ios-andr-13026e4d",
          readMinutes: 5,
        },
      ],
    },
    {
      name: "Hyundai × Boston Dynamics",
      color: "#002C5F",
      posts: [
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Atlas가 23kg 냉장고를 들어 옮겼다 — Boston Dynamics 전신 제어(Whole-body control) 시연 영상 공개, 현대는 연 3만대 양산 발표",
          summary: "Boston Dynamics가 2026년 5월 18일 Atlas 휴머노이드가 23kg 냉장고를 무릎으로 받쳐 들고 옮기는 전신 제어 시연 영상 2편 + 기술 블로그를 공개했습니다. 현대차그룹은 같은 시기 CES 2026 발표를 통해 2028년까지 연 3만대 Atlas 양산 체계 + HMGMA(미국 메타플랜트)에 단계적 투입 계획을 확정했습니다. 한국 청자에게 가장 직접적인 산업 임팩트.",
          content: `Boston Dynamics가 2026년 5월 18일 Atlas 휴머노이드의 전신 제어(Whole-body Control) 시연 영상 두 편과 기술 블로그를 한 번에 공개했습니다. Atlas가 23kg 소형 냉장고를 무릎을 굽혀 받쳐 들고, 몸통으로 균형을 잡으며 책상까지 옮깁니다. 시뮬레이션 학습 기반으로 최대 45kg(약 100파운드)까지 처리 가능하다는 발표가 동봉됐습니다. 이 시연은 단독 데모가 아니라 현대차그룹의 2028년 연 3만대 양산 체계와 한 묶음이라, 한국 청자에게는 이번 주차 가장 직접적인 산업 임팩트입니다.

- 전신 제어: 다리·몸통·팔이 단일 시스템으로 협응 — 무거운 물건을 들 때 다리가 균형, 몸통이 무게 분산, 팔이 그립 담당
- Zero-shot sim-to-real transfer: 시뮬레이션에서 수백만 시간 학습 후 실제 하드웨어에 추가 튜닝 없이 그대로 배포
- Domain randomization: 무게·바닥 마찰·그립 조건을 수천 가지로 바꿔 학습 → 실제 산업 환경에 강건
- 하드웨어: 56 자유도(DoF), 2.3m 도달, 가반 50kg, 4시간 배터리, 셀프 배터리 교체

### 현대차 로드맵과 어떻게 연결되나

현대차그룹이 CES 2026에서 처음 공개하고 이번 5월 양산형 영상으로 본격화한 로드맵은 단계가 명확합니다. 2028년까지 연 3만대 생산 체계를 미국 HMGMA(메타플랜트) 기준으로 깔고, 첫 투입 공정은 부품 분류·서열 작업입니다. 2030년에는 부품 조립까지 범위를 넓힌입니다. 그룹사 안에서의 역할 분담도 정리됐다 — 현대모비스가 액추에이터를 공급하고, 현대글로비스가 물류 자동화를 받고, Boston Dynamics가 본체 양산을 담당합니다. 사업 모델은 Robots-as-a-Service(RaaS), 즉 구독·사용료 기반이라 도입 측은 초기 capex 부담을 낮출 수 있습니다.

기술 파트너십 라인도 같이 잡혔습니다. Google DeepMind와 Robot Foundation Model(RFM)을 공동 개발해서 Gemini 기반으로 Atlas가 환경을 스스로 인지·판단하게 만들고, 학습·시뮬레이션에는 NVIDIA GPU + Omniverse를 씁니다. 5월 7일 기사 기준 Boston Dynamics는 다음 달 나스닥 상장 결정을 앞두고 있고, 상장 자금이 양산 공장에 직접 투입됩니다.

### 그래도 따라가 봐야 할 한계

같은 시기 중국 휴머노이드는 이미 일부 양산 단계에 들어갔고, 미국 Figure AI의 BotQ는 향후 10만대 설비를 잡고 있습니다. 3만대는 follow-up 규모이지 leadership은 아닙니다. 2030년 이전에는 노무비 절감 효과가 제한적이고, 이 기간은 생산성 검증·공정 적용 확대 단계로 봐야 합니다. 영상이 보여주는 것도 "단일 작업"이라, 산업 현장의 다종 작업 일반화에는 별도 시간이 필요합니다. 1차 학습 데이터 확보와 sim-to-real gap은 여전히 RAI Institute(마크 레이버트 주도) 같은 곳에서 풀어 가는 연구 주제입니다.

발표를 정리할 때 봐야 할 한 줄은 "현대차가 휴머노이드를 본업의 도구로 만들기 시작한 분기점"입니다. 이번 카드는 그 분기점을 처음 영상으로 못 박은 사건입니다.`,
          officialUrl: "https://bostondynamics.com/blog/",
          source: "https://www.techtimes.com/articles/316854/20260519/boston-dynamics-reveals-how-atlas-learned-lift-100-pound-loads-hyundai-plans-30000-per-year.htm",
          backupUrls: [
            { label: "Boston Dynamics 공식 — Atlas Tests Limits (5/18 영상)", url: "https://www.youtube.com/watch?v=h-pNWy7v_qc" },
            { label: "Boston Dynamics 공식 — How AI Is Changing Whole Body Manipulation", url: "https://www.youtube.com/shorts/AdGFmYQx0lg" },
            { label: "TechTimes — Atlas 100-pound + Hyundai 3만대", url: "https://www.techtimes.com/articles/316854/20260519/boston-dynamics-reveals-how-atlas-learned-lift-100-pound-loads-hyundai-plans-30000-per-year.htm" },
            { label: "TechRadar — limited by our imagination", url: "https://www.techradar.com/ai-platforms-assistants/we-have-not-seen-the-limits-of-what-atlas-can-do-boston-dynamics-shows-off-atlas-robots-impressive-fridge-lifting-and-drink-delivery-capabilities-its-only-limited-by-our-imagination" },
            { label: "디일렉 — 현대차 로봇 3만대 양산", url: "https://www.thelec.kr/news/articleView.html?idxno=50572" },
            { label: "파이낸셜뉴스 — 현대차 공장에 로봇 2.5만대 + BD 전략", url: "https://www.fnnews.com/news/202605200942369627" },
            { label: "Asia Business Daily — 23kg 냉장고", url: "https://www.asiae.co.kr/en/article/automobile/2026051908572445829" },
            { label: "Robotics & Automation News — 5/20 보도", url: "https://roboticsandautomationnews.com/2026/05/20/boston-dynamics-trains-atlas-humanoid-robot-to-pick-up-and-place-washing-machine/101759/" },
            { label: "큐레이터 스레드 (@choi.openai)", url: "https://www.threads.com/@choi.openai/post/DYuVvqtj8Av" },
          ],
          tags: ["Boston Dynamics", "Hyundai", "Atlas", "humanoid", "whole-body control", "sim-to-real", "robotics", "한국", "공식", "hero"],
          featured: true,
          slug: "hyundai-boston-dynamics-atlas-whole-body-control-20260518",
          readMinutes: 6,
          thumbnail: {
            src: "https://i.ytimg.com/vi/h-pNWy7v_qc/maxresdefault.jpg",
            alt: "Boston Dynamics Atlas — 전신 제어 23kg 냉장고 시연",
          },
          videoUrl: "https://www.youtube.com/embed/h-pNWy7v_qc",
          galleryImages: [
            {
              src: "https://i.ytimg.com/vi/AdGFmYQx0lg/maxresdefault.jpg",
              alt: "Whole Body Manipulation short",
              caption: "Boston Dynamics 공식 — How AI Is Changing Whole Body Manipulation (Shorts)",
            },
          ],
        },
      ],
    },
    {
      name: "Google",
      color: "#4285F4",
      posts: [
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Gemini Omni — 텍스트·이미지·오디오·영상을 입력으로 받는 영상 생성·편집 통합 모델",
          summary: "Google이 I/O 2026에서 Gemini Omni를 공개했습니다. 영상을 단순 생성하는 모델이 아니라 \"추론하는 영상 모델\"로, 시네마틱 줌·배경 교체·등장인물 일관성 유지를 대화형으로 처리합니다. 첫 모델 Gemini Omni Flash는 5/19부터 전 세계 Google AI Plus·Pro·Ultra 구독자, Google Flow, YouTube Shorts(무료)에서 즉시 사용 가능.",
          content: `Google이 2026년 5월 19일 I/O 2026에서 새 영상 모델 패밀리 Gemini Omni를 공개하고 첫 모델 Gemini Omni Flash를 즉시 출시했습니다. DeepMind CEO Demis Hassabis는 이걸 "어떤 입력에서든 무엇이든 만들 수 있는 새 모델"이라고 소개했고, 기존 Veo 라인은 핵심 Gemini 시스템 안으로 통합됐습니다.

- 입력: 텍스트 + 이미지 + 오디오 + 영상 (네 종류 멀티모달 입력)
- 출력: 약 10초 영상 클립 + 동기화 오디오
- 핵심 표현: "영상을 만드는 모델"이 아니라 "영상을 만드는 추론 모델" — 맥락·물리·의도를 이해한 채 다중 턴 편집 시 처음부터 다시 생성하지 않고 유지
- 일관성: 등장인물·배경·움직임을 편집 후에도 유지 (기존 AI 영상 모델의 만성 약점)
- 아키텍처: Gemini 추론 엔진 + Veo 렌더링 + DeepMind Genie 월드 시뮬레이션 + Nano Banana 이미지 편집 레이어 결합

### 내부 구조 — 왜 "추론하는 영상"인가

기존 영상 모델은 프롬프트 한 줄을 받아 한 번에 클립을 뽑는 단발 생성기에 가까웠습니다. Omni는 같은 클립을 여러 턴에 걸쳐 부분 수정해도 처음부터 다시 만들지 않고, 등장 인물의 옷·머리 색·카메라 앵글을 유지한 채 차분만 적용합니다. 이게 가능한 이유는 모델이 단순 픽셀 생성이 아니라 장면을 시뮬레이션으로 다루기 때문이다 — Genie의 월드 시뮬레이션 레이어가 이 부분을 담당합니다.

### 가격과 접근 채널

별도 제품으로 분리하지 않고 이미 깔린 표면에 다 넣는다는 게 Google의 진짜 노림수입니다.

- YouTube Shorts / YouTube Create: 무료
- Google AI Plus: 월 $7.99
- AI Pro: 월 $19.99
- AI Ultra: 월 $99.99 / $199.99
- 개발자·기업 API: "수주 안에" 공개 예정

### Seedance 2.0과의 역할 분담이 한국 제작자에 더 실용적

공개 직후 한국 큐레이터 다수가 "Omni는 Seedance 2.0보다 생성 자체는 밀립니다. 굳이 갈아탈 이유가 없다"는 평을 냈습니다. 새 모델이 나올 때마다 반복되는 구도입니다. Nano Banana가 처음 나왔을 때도 생성보다 합성·수정이 압도적이라 "만들어 둔 이미지를 다듬는 역할"을 떠맡았던 패턴과 같습니다.

그래서 권장 워크플로우는 "둘 중 하나"가 아니라 역할 분담입니다. Seedance 2.0으로 본 영상을 0→1 생성하고, Omni로는 깨진 한글 자막, 한국어 발음 오류, 부분 프레임 합성, 등장인물 일관성 유지 같은 "기존 영상 수정"을 맡깁니다. 한국어 자막·한글 텍스트가 깨지는 문제는 글로벌 영상 모델의 만성 약점이라, Omni의 멀티모달 입력(영상 + 텍스트 지시)을 활용한 부분 수정 파이프라인이 즉시 실용적입니다.

### 안전 장치

Flash 클립 10초 제한은 모델 한계가 아니라 컴퓨트 수요 분산을 위한 배포 결정이라고 Google DeepMind 제품 책임자 Nicole Brichtova가 명시했습니다. 모든 영상에는 SynthID 비가시 워터마크와 C2PA Content Credentials가 강제로 들어가고, API 플래그로도 제거할 수 없습니다. 음성·대사 "교체" 편집은 Google이 "가장 위험한 기능"으로 정의해서 의도적으로 막아 뒀습니다. 같은 키노트에서 발표된 Gemini 3.5 Flash와 Gemini Spark 에이전트와 묶어 보면, 영상 생성도 결국 agentic Gemini 흐름의 한 부품으로 흡수되는 그림입니다.`,
          officialUrl: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
          source: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
          backupUrls: [
            { label: "Google I/O 2026 — agentic Gemini era keynote", url: "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/" },
            { label: "Google AI Studio — Gemini Omni 사용", url: "https://aistudio.google.com" },
            { label: "Decrypt — 'Simulate the World' 분석", url: "https://decrypt.co/368393/google-unveils-gemini-omni-next-gen-ai-video-builder-simulate-world" },
            { label: "TechTimes — 가장 위험한 기능을 막아둔 이유", url: "https://www.techtimes.com/articles/316859/20260519/google-launches-gemini-omni-video-model-holds-back-its-riskiest-feature.htm" },
            { label: "Crypto Briefing — 멀티모달 입력 정리", url: "https://cryptobriefing.com/google-gemini-omni-ai-video-generation/" },
            { label: "큐레이터 스레드 (@choi.openai)", url: "https://www.threads.com/@choi.openai/post/DYuVvqtj8Av" },
          ],
          tags: ["Google DeepMind", "Gemini Omni", "video generation", "multimodal", "Veo", "Genie", "Nano Banana", "Seedance 2.0", "workflow", "공식", "hero"],
          featured: true,
          slug: "gemini-omni-google-io-2026-video-model",
          readMinutes: 5,
          thumbnail: {
            src: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Geminiapp_Bento_hero.width-1600.format-webp.webp",
            alt: "Gemini Omni 공식 hero",
            caption: "Google AI / Gemini app",
          },
          videoUrl: "https://www.youtube.com/embed/moxr8bz0ykU",
          videoPoster: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Geminiapp_Bento_hero.width-1600.format-webp.webp",
          threadsEmbedUrl: "https://www.threads.com/embed/@choi.openai/post/DYuVvqtj8Av/",
          galleryImages: [
            {
              src: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/IOCollection_social.width-2000.format-webp.webp",
              alt: "Google I/O 2026 컬렉션",
              caption: "Google I/O 2026 — Gemini Omni가 공개된 키노트 컬렉션",
            },
            {
              src: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_Spark_Partners.width-2000.format-webp.webp",
              alt: "Gemini Spark 파트너",
              caption: "함께 발표된 Gemini Spark 에이전트 파트너 (Omni와 같은 agentic 흐름)",
            },
          ],
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Google Beam 그룹 미팅 실험 공개 — HP Dimension 입체 디스플레이 + 공간 오디오",
          summary: "Google이 HP Dimension 몰입형 디스플레이와 공간 오디오를 활용해 하이브리드 그룹 미팅을 더 자연스럽게 만드는 Google Beam 실험을 공개했습니다.",
          content: `Google Research가 2026년 5월 20일 Google Beam의 그룹 미팅 실험을 공개했습니다. 1:1 화상 미팅에서 자연스러웠던 3D 입체감을 다인원 회의로 확장하는 시도로, HP Dimension 몰입형 디스플레이와 공간 오디오를 결합했습니다.

- 하드웨어: HP Dimension 입체 디스플레이 (Light Field 기반)
- 오디오: 공간 오디오 — 화자 위치에 따라 소리 방향이 바뀜
- 시나리오: 원격 + 사무실 인원이 한 테이블에 둘러앉은 듯한 배치
- 출시 상태: 실험 (Google Workspace 정식 기능 아님)

### 왜 그룹 회의가 어려운가

화상 회의의 본질적 약점은 "누가 누구에게 말하는지가 안 보인다"는 점입니다. 1:1에서는 무관하지만 4~6명만 넘어가도 발언권 충돌이 잦아집니다. Beam의 입체+공간 오디오는 이 문제를 하드웨어 단에서 풉니다. 다만 HP Dimension 디스플레이가 일반 기업에 깔리려면 시간이 필요하고, 실험 단계라 정식 도입 시점은 미정입니다.

한국 기업의 하이브리드 근무 회의에서 이 라인이 의미를 가지려면 디스플레이 가격과 워크스페이스 호환이 정리돼야 합니다. 지금은 "Google이 미래 회의실 폼팩터를 직접 만든다"는 신호 정도로 받아들이는 게 적절합니다.`,
          officialUrl: "https://blog.google/innovation-and-ai/models-and-research/google-research/google-beam-group-meetings/",
          source: "https://blog.google/innovation-and-ai/models-and-research/google-research/google-beam-group-meetings/",
          tags: ["Google Beam", "Google Research", "공식"],
          slug: "a-new-experiment-brings-better-group-mee-01decd7a",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/a-new-experiment-brings-better-group-mee-01decd7a.png",
            alt: "A new experiment brings better group meetings to Google Beam",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Google I/O 2026 — agentic Gemini 시대 선언, Sundar Pichai 개요",
          summary: "Sundar Pichai가 직접 정리한 Google I/O 2026 개요. Gemini 3.5 Flash, Gemini Spark, agentic Search, TPU 8세대, Gemini Omni, SynthID 확장이 한 자리에서 발표됐습니다.",
          content: `Google CEO Sundar Pichai가 2026년 5월 19일 I/O 2026 키노트에서 AI 스택 전체를 한 번에 재정의했습니다. 단일 제품 발표가 아니라 "Gemini를 운영체제로 만든다"는 방향성 선언에 가깝습니다.

- 모델: Gemini 3.5 Flash 출시 (속도·비용 최적 라인)
- 앱: Gemini app이 "24시간 능동적인 도우미"로 재정의
- 에이전트: Gemini Spark (장기 실행 개인 에이전트), Daily Brief
- 영상: Gemini Omni (텍스트·이미지·오디오·영상 통합 영상 모델)
- 검색: agentic Search — 검색이 결과 페이지가 아니라 작업 실행 인터페이스로
- 인프라: TPU 8세대 발표
- 안전: SynthID 워터마크가 비디오·음성까지 확장
- 개발자: Managed Agents in Gemini API, Antigravity 2.0, Google AI Studio 모바일 빌드

### 카테고리 재정의로 봐야 하는 이유

이번 I/O는 "기능 추가"가 아니라 "제품 카테고리 재정의"다. 검색은 더 이상 링크 목록이 아니고, 챗봇은 더 이상 단발 응답기가 아니고, 영상 모델은 별도 도구가 아니라 Gemini 안에 통합됩니다. 같은 흐름이 OpenAI Codex의 모바일·Skills 확장, Anthropic Claude Code Agent View에서도 보인입니다. 빅3 모두 "AI가 작업 환경 전체를 운영한다"는 패러다임으로 수렴 중이고, 이번 I/O는 그 방향의 가장 큰 단일 묶음입니다.

### 실제 도입 일정과의 거리

I/O 발표는 데모와 실제 일반 제공(GA) 시점이 다릅니다. Gemini Omni Flash만 5/19 즉시 풀렸고, 나머지 일부는 "수주 안에"로 표기됐습니다. Antigravity 2.0은 별도 카드로 분리된 "개발자 키노트" 결과물이라 별도 추적이 필요합니다. SynthID 확장은 의무 + 비가시 워터마크라 사용자가 끌 수 없으니, 광고·미디어 라인은 이걸 전제로 콘텐츠 워크플로우를 다시 짜는 게 안전합니다.

한국에서 가장 빠르게 체감되는 부분은 검색입니다. Gemini가 검색에 직접 박히는 순간 SEO 라인이 새로 정의되고, 광고·콘텐츠 산업 전체의 트래픽 분포가 바뀐입니다. 이건 모델 성능과 무관하게 따라가야 할 변화입니다.`,
          officialUrl: "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/",
          source: "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/",
          tags: ["Gemini", "Search", "Workspace", "Cloud", "Android", "TPU", "공식", "hero후보"],
          featured: true,
          slug: "i-o-2026-welcome-to-the-agentic-gemini-e-4283a2bd",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/i-o-2026-welcome-to-the-agentic-gemini-e-4283a2bd.png",
            alt: "I/O 2026: Welcome to the agentic Gemini era",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Gemini 앱, 24시간 능동 도우미로 재정의 — Daily Brief·Spark·Omni 통합",
          summary: "Google이 Gemini 앱의 능동적 경험, Daily Brief, Omni 영상 생성, Spark 에이전트 기능, macOS 개선 사항을 한 번에 발표했습니다.",
          content: `Google이 2026년 5월 19일 Gemini app을 "24시간 능동적인 도우미"로 재정의했습니다. 사용자가 질문을 던질 때만 답하는 챗봇이 아니라, 일정·메일·알림을 미리 정리하고 액션을 제안하는 personal agent 라인으로 이동합니다.

- Daily Brief: 매일 아침 일정·뉴스·태스크 자동 요약
- Gemini Spark: 장기 실행 개인 에이전트 (여러 날 걸친 작업 추적)
- Gemini Omni 통합: 앱 안에서 영상 생성·편집 가능
- Gemini 3.5 Flash 기본 라인 적용
- macOS 데스크톱 앱 개선

### "능동적"의 진짜 의미

24/7 능동 도우미는 마케팅 표현 이상의 함의가 있습니다. 사용자가 명시적으로 호출하지 않아도 에이전트가 백그라운드에서 메일·캘린더·문서를 읽고 제안을 푸시한다는 뜻입니다. 같은 흐름의 OpenAI ChatGPT Tasks, Anthropic Claude Memory와 비교하면 Google이 캘린더·Gmail·Drive 통합에서 가장 깊습니다.

한국 사용자에게 의미가 큰 변화는 macOS 앱 개선과 Daily Brief다. 한국 직장인의 평균 워크 환경이 Windows·Mac 혼재 + Google Workspace + Slack 조합이라, Gemini app이 데스크톱에서 Daily Brief를 자동 띄워 주면 별도 도구 없이 하루 시작 루틴을 흡수합니다. 토스·당근·카카오 일부 임직원이 이미 Google Workspace 기반으로 일하기 때문에 직접 영향권 안에 있습니다.`,
          officialUrl: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
          source: "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
          tags: ["Gemini app", "Gemini 3.5 Flash", "Omni", "Daily Brief", "Spark", "공식"],
          slug: "the-gemini-app-becomes-more-agentic-deli-8bec6d8c",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/the-gemini-app-becomes-more-agentic-deli-8bec6d8c.jpg",
            alt: "The Gemini app becomes more agentic, delivering proactive, 24/7 help",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Gemini API 에 Managed Agents 공개(프리뷰) — 에이전트 런타임 통째로 호스팅",
          summary: "Google이 Gemini API에 Managed Agents(프리뷰)를 공개했습니다. 개발자가 직접 에이전트 런타임을 운영하지 않고도, Antigravity 기반 에이전트를 보안 클라우드 Linux 샌드박스에서 실행할 수 있습니다. 도구 호출·다단계 실행·실패 복구·관측이 API 한 번으로 처리됩니다.",
          content: `Google이 2026년 5월 19일 I/O 2026에서 Managed Agents in the Gemini API를 프리뷰로 공개했습니다. 개발자가 에이전트 인프라를 직접 운영하지 않고 Gemini API 한 번으로 "진짜 에이전트"를 실행하는 서비스입니다.

- 런타임: Antigravity 2.0 기반의 보안 클라우드 Linux 샌드박스
- 추상화되는 영역: 도구 호출, 다단계 실행, 실패 복구, 로깅·관측, 격리
- 개발자가 정의하는 영역: 작업 목표, 사용 가능한 도구, 권한 정책
- 호출 채널: AI Studio, Vertex AI

### AWS Lambda 비유가 정확한 이유

에이전트를 만드는 회사들이 가장 많이 막히는 단계는 "모델 호출"이 아니라 "안전한 실행 환경 구축"입니다. tool call이 임의 코드를 실행하는 순간 격리·자원 한도·롤백·로깅을 다 직접 만들어야 합니다. Managed Agents는 이걸 통째로 위로 끌어올립니다. AWS Lambda가 서버 운영을 추상화했듯 에이전트 런타임을 추상화합니다.

같은 흐름이 Anthropic Managed Agents, OpenAI Codex Skills·Automations에서도 보인입니다. 빅3 모두 "에이전트 = 호스팅 서비스"로 수렴 중이라, 이제 시장 경쟁축은 모델 성능보다 런타임 안전성·관측·통합 폭으로 이동합니다.

### 도입 검토 시 챙길 항목

샌드박스가 "Linux"라는 사실은 의도적입니다. 임의 shell·파일시스템 접근을 허용한다는 의미로, 보안 모델을 도입 전에 별도로 검토해야 합니다. 프리뷰 단계라 SLA·가격·동시성 한도는 GA에서 다시 확인 필요. I/O 2026 "Developer highlights"의 한 축이고, Antigravity 2.0·AI Studio 모바일 빌드와 한 묶음으로 봐야 그림이 잡힙니다.

한국 팀에서 사내 에이전트 PoC를 막 시작한 단계라면 Managed Agents 위에 올리는 게 직접 인프라 구축보다 빠릅니다. 다만 데이터·코드가 Google Cloud Linux 샌드박스 안에서 돈다는 점이 컴플라이언스에 걸리지 않는지가 첫 게이트입니다.`,
          officialUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/managed-agents-gemini-api/",
          source: "https://blog.google/innovation-and-ai/technology/developers-tools/managed-agents-gemini-api/",
          tags: ["Gemini API", "Managed Agents", "Antigravity", "공식", "hero후보"],
          featured: true,
          slug: "introducing-managed-agents-in-the-gemini-ac0ae172",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/introducing-managed-agents-in-the-gemini-ac0ae172.png",
            alt: "Introducing Managed Agents in the Gemini API",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Google AI Studio @ I/O 2026 — Workspace·Android·모바일·Antigravity·무료 배포 5종 통합",
          summary: "Google이 AI Studio 업데이트를 발표했습니다. Workspace 통합, Android 앱 빌드, 모바일 사전 등록, Antigravity export, 무료 배포 5종 묶음입니다.",
          content: `Google이 2026년 5월 19일 I/O 2026에서 AI Studio의 다섯 가지 업데이트를 한꺼번에 풀었습니다. AI Studio는 더 이상 모델 플레이그라운드가 아니라 Workspace·Android·모바일·Antigravity·무료 배포까지 한 곳에서 처리하는 빌드 환경으로 재정의됐습니다.

- Workspace 통합: Docs·Sheets·Slides 데이터를 AI Studio 안에서 직접 호출
- Android 앱 빌드: AI Studio 안에서 Android 앱 생성·테스트
- 모바일 pre-registration: 모바일용 AI Studio 사전 등록
- Antigravity export: AI Studio에서 만든 앱을 Antigravity로 즉시 배포
- 무료 배포: 일정 한도까지 Google Cloud에 무료 호스팅

### "빌드 - 배포가 한 흐름"이 의미하는 것

기존 AI Studio는 프롬프트 실험에 집중했고, 실제 앱 배포는 별도 인프라를 잡아야 했습니다. 이번 업데이트로 아이디어부터 실 배포까지 같은 표면에서 처리할 수 있게 됐습니다. v0·Replit·Cursor가 이 방향을 먼저 잡았고, Google이 자체 모델 + 자체 Cloud를 묶어 따라간 모양새입니다.

한국 인디 개발자·스타트업 입장에서는 진입 장벽이 한 단계 더 낮아집니다. 모델 호출, 백엔드, 호스팅을 별도 학습 없이 한 환경에서 다룰 수 있습니다. 다만 Workspace·Google Cloud 락인이 그만큼 강해진다는 점은 사전 계산이 필요합니다.`,
          officialUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-studio-io-2026/",
          source: "https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-studio-io-2026/",
          tags: ["Google AI Studio", "Android", "Workspace", "Antigravity", "공식"],
          slug: "bring-any-idea-to-life-google-ai-studio--66d64068",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/bring-any-idea-to-life-google-ai-studio--66d64068.png",
            alt: "Bring any idea to life: Google AI Studio at I/O 2026",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "I/O 2026 개발자 트랙 정리 — Antigravity 2.0·Managed Agents·AI Studio·XPRIZE 해커톤",
          summary: "Google이 I/O 2026 개발자 발표를 Antigravity 2.0, Gemini API Managed Agents, AI Studio 통합, Build with Gemini XPRIZE 해커톤 중심으로 정리했습니다.",
          content: `Google이 2026년 5월 19일 I/O 2026의 개발자 트랙을 한 페이지로 정리해 공개했습니다. 사용자 대상 발표(Gemini Omni, agentic Search, Gemini app)와 별개로, 개발자 도구 라인을 다섯 줄로 묶어 보여주는 인덱스입니다.

- Antigravity 2.0: 에이전트 런타임·실행 인프라의 차세대 버전
- Gemini API Managed Agents: 호스팅형 에이전트 서비스
- AI Studio 통합: Workspace·Android·모바일·Antigravity export·무료 배포
- Build with Gemini XPRIZE Hackathon: 글로벌 해커톤 라인 신설
- Gemini 3.5 Flash: 기본 API 라인

### 같은 주차 OpenAI·Anthropic 발표와 비교

OpenAI는 Codex 모바일·Hooks·HIPAA·SSH로 "코딩 에이전트를 어디서나 돌게" 했고, Anthropic은 Claude Code Agent View·Stainless 인수로 SDK·CLI 라인을 강화했습니다. Google은 모델 + 런타임 + 빌드 환경 + 해커톤까지 한 번에 묶어 가장 폭이 넓은 발표를 했습니다. 단일 기능 우위가 아니라 "개발자 생태계 전체"를 잡으려는 패턴입니다.

한국 개발자에게 가장 즉시 적용 가능한 라인은 AI Studio 무료 배포와 Managed Agents 프리뷰입니다. 사내 정책이 Google Cloud를 허용한다면 인프라 학습 없이 에이전트 PoC를 시작할 수 있습니다.`,
          officialUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/",
          source: "https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/",
          tags: ["Antigravity 2.0", "Gemini API", "Managed Agents", "Google AI Studio", "공식"],
          slug: "building-the-agentic-future-developer-hi-c8b5b49d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/building-the-agentic-future-developer-hi-c8b5b49d.png",
            alt: "Building the agentic future: Developer highlights from I/O 2026",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "NVIDIA · Google Cloud 협업 — Gemma·Nemotron 통합 + AI 빌더 커뮤니티 지원",
          summary: "",
          content: `NVIDIA가 2026년 5월 19일 Google Cloud Developer Community와의 협업을 발표했습니다. Gemma 모델 라인과 Nemotron이 NVIDIA AI platform 위에서 더 매끄럽게 돌고, Google Cloud 위 NVIDIA GPU 인스턴스에 최적화된 빌드 체인이 제공됩니다.

- Gemma: Google의 오픈 모델 라인이 NVIDIA NeMo·TensorRT-LLM에 1급으로 통합
- Nemotron: NVIDIA의 자체 LLM 패밀리가 Google Cloud Vertex AI에서 호출 가능
- 빌더 지원: 자격증·해커톤·크레딧·문서 라인을 Google Cloud Developer Community 단에 풀음
- 기간: I/O 2026과 같은 주차 발표

### "AI 모델 = 클라우드 + GPU 조합" 시장의 정리

모델 회사가 어디 GPU 위에서 도느냐는 시장 점유율 자체에 영향을 준입니다. Gemma가 NVIDIA 스택 1급 시민이 되면 OSS 사용자 입장에서 Gemma가 Llama·Qwen·Mistral과 동급 후보로 오른입니다. 반대로 Nemotron이 Google Cloud Vertex AI에 들어가면 NVIDIA가 자체 모델로 SaaS 시장에 진입하는 셈입니다.

한국 빌더에게는 두 가지가 의미 있습니다. Google Cloud Korea가 운영하는 빌더 커뮤니티가 NVIDIA 크레딧·문서를 받게 되고, Gemma + NeMo 조합이 한국 LLM 파인튜닝 라인에서 표준 후보로 추가됩니다.`,
          officialUrl: "https://blogs.nvidia.com/blog/google-cloud-developer-community-ai-builders/",
          source: "https://blogs.nvidia.com/blog/google-cloud-developer-community-ai-builders/",
          tags: ["NVIDIA AI platform", "Google Cloud", "Gemma", "Nemotron", "공식"],
          slug: "nvidia-and-google-cloud-empower-the-next-639e55a0",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nvidia-and-google-cloud-empower-the-next-639e55a0.jpg",
            alt: "NVIDIA and Google Cloud Empower the Next Wave of AI Builders",
          },
        },
      ],
    },
    {
      name: "Anthropic / Claude",
      color: "#E87040",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Anthropic, Claude for Small Business 출시 — 소상공인 대상 요금제",
          summary: "",
          content: `Anthropic이 2026년 5월 21일 Claude for Small Business 라인을 공식 출시했습니다. 엔터프라이즈 ChatGPT·Claude Team 사이에 비어 있던 중소·소상공인 세그먼트를 직접 겨냥한 패키지입니다.

- 대상: 직원 100명 이하 사업장
- 묶음: Claude 모델 사용 + Projects + 팀 공유 메모리 + 관리자 콘솔
- 가격: 사용자당 월 단위 정액 (구체 금액은 지역별)
- 차별점: 엔터프라이즈 컴플라이언스 라인을 단순화한 빠른 도입 옵션

### 같은 주 KPMG 발표와 짝을 이루는 이유

이번 주차 Anthropic은 KPMG 전사 도입(직원 27만 명)과 Small Business 라인을 같이 발표했습니다. 위·아래 양 끝을 동시에 잡는 GTM(go-to-market) 패턴입니다. 그동안 Claude는 엔터프라이즈 라인과 개인 Pro 라인이 명확했지만, "전 직원 4~50명짜리 한국 스타트업"이 도입하기엔 어중간한 구간이었습니다. 이번 패키지는 그 구간을 직접 메웁니다.

한국 스타트업 입장에서 의미는 단가보다 관리자 콘솔에 있습니다. 사용자 추가·권한·로그를 한 콘솔에서 관리할 수 있어, 별도 IT 담당자 없이도 컴플라이언스 라인을 잡을 수 있습니다. ChatGPT Team과 1:1 비교 검토 대상입니다.`,
          officialUrl: "https://www.anthropic.com/news/claude-for-small-business",
          source: "https://www.anthropic.com/news/claude-for-small-business",
          tags: ["Claude", "SMB", "go-to-market", "공식"],
          slug: "anthropic-claude-for-small-business-3b7ab7f2",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/anthropic-claude-for-small-business-3b7ab7f2.jpg",
            alt: "Anthropic Claude for Small Business",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Anthropic, Frontier AI 거버넌스 논의를 인문학 라인까지 확장",
          summary: "Anthropic이 종교·철학·문화·시민사회 전문가까지 포함하는 Frontier AI 거버넌스 논의 확장 작업을 공개했습니다.",
          content: `Anthropic이 2026년 5월 19일 frontier AI 거버넌스 논의를 종교·철학·문화·시민사회 전문가까지 넓힌다고 발표했습니다. 기존에는 정책·산업 전문가 중심이었던 자문 패널을 인문학 라인으로 확장.

- 신규 자문 영역: 종교계, 철학자, 문화 비평가, 시민사회 단체
- 운영 방식: 정기 라운드테이블 + Claude values 업데이트 반영
- 목적: 모델 가치관·정책 라인이 기술·법 중심의 좁은 합의로 굳어지지 않도록 견제
- 같은 흐름: Anthropic Responsible Scaling Policy, Claude values 문서

### 왜 인문학 패널이 필요한가

Frontier 모델이 사용자 응답에서 다루는 주제는 결혼·종교·낙태·안락사·전쟁처럼 인문학적 합의가 필요한 영역까지 이미 들어와 있습니다. 엔지니어·법무가 정한 정책이 다양한 문화권에서 어떻게 받아들여지는지는 별도 검토가 필요합니다.

한국에서 직접 영향은 적지만, "AI 가치관"이 산업적 결정 사항이라는 사실이 굳어진다는 점은 의미가 있습니다. 정부 AI 윤리 가이드, 시민단체 검토 라인을 모델 회사가 적극적으로 받아들이기 시작했다는 신호입니다.`,
          officialUrl: "https://www.anthropic.com/news/widening-conversation-ai",
          source: "https://www.anthropic.com/news/widening-conversation-ai",
          tags: ["AI safety", "governance", "Claude values", "공식"],
          slug: "widening-the-conversation-on-frontier-ai-e122375d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/widening-the-conversation-on-frontier-ai-e122375d.jpg",
            alt: "Widening the conversation on frontier AI",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "KPMG, 전 사업부와 27만 6,000명 임직원에 Claude 통합 — Anthropic 과 전략적 동맹",
          summary: "KPMG가 Anthropic과 전략적 동맹을 맺고 핵심 사업부와 27만 6,000명 이상의 임직원에 Claude를 통합한다고 발표했습니다.",
          content: `KPMG가 2026년 5월 19일 Anthropic과 전략적 동맹을 맺고 Claude를 전 사업부와 27만 6,000명 임직원에 통합한다고 발표했습니다. Big 4 회계법인 중 가장 큰 단일 AI 도입 계약 중 하나로, KPMG의 감사·세무·자문·딜 어드바이저리 라인 모두에 Claude가 박힙니다.

- 인원: 27만 6,000명 이상 (KPMG 전 글로벌 멤버펌)
- 적용 영역: 감사, 세무, 자문, 딜 어드바이저리
- 도구: Claude + Claude Code + Managed Agents
- 거버넌스: KPMG 자체 컴플라이언스 라인 위에서 운영
- 같은 주차 Claude for Small Business와 짝을 이루는 GTM

### 회계·컨설팅 산업에 의미

회계·컨설팅 시장에서 인력 단가는 늘 큰 변수입니다. 27만 명 단위 도입은 단순 productivity 향상을 넘어, "junior analyst가 처리하던 작업을 AI가 받고, 사람은 검증·합의·고객 응대에 집중하는" 직무 재정의로 이어집니다. 같은 흐름이 Deloitte·EY·PwC에서도 이미 진행 중이고, 이번 KPMG 발표는 Anthropic이 그 경쟁에서 한 발 앞섰다는 신호입니다.

한국 KPMG 삼정회계법인은 자체 가이드라인을 따로 두고 있어 도입 속도는 별도 검토가 필요합니다. 다만 글로벌 KPMG 라인을 따라가는 패턴이라, 국내 컨설팅·회계 인력 시장에도 1~2년 안에 가시적 영향이 나타날 가능성이 높습니다.`,
          officialUrl: "https://www.anthropic.com/news/anthropic-kpmg",
          source: "https://www.anthropic.com/news/anthropic-kpmg",
          tags: ["Claude", "Enterprise AI", "Managed Agents", "Claude Code", "공식"],
          slug: "kpmg-integrates-claude-across-its-core-b-e02f19cc",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/kpmg-integrates-claude-across-its-core-b-e02f19cc.jpg",
            alt: "KPMG integrates Claude across its core business and workforce of more than 276,000 in strategic alliance",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Anthropic, Stainless 인수 — Claude SDK·CLI·MCP 도구 라인 일관성 확보",
          summary: "Anthropic이 Stainless를 인수해 Claude 개발자 경험, SDK 자동 생성, CLI, MCP 연동 도구 라인을 강화했습니다.",
          content: `Anthropic이 2026년 5월 18일 SDK 자동 생성 회사 Stainless를 인수했다고 발표했습니다. Stainless는 OpenAPI 스펙에서 다국어 SDK(TypeScript·Python·Go·Java 등)를 자동 생성하는 빌더로, OpenAI·Anthropic·Cloudflare·LinkedIn 등이 이미 고객이었습니다.

- 인수 대상: Stainless (SDK 자동 생성 플랫폼)
- 통합 목적: Claude SDK·CLI·MCP 도구 라인의 일관성 강화
- 기존 고객: OpenAI 등 경쟁사도 이전부터 Stainless를 사용
- 인수 후 운영: Stainless는 독립 제품으로 유지 (Anthropic이 기술 라인 흡수)

### 왜 SDK 자동 생성 회사를 사는가

LLM API 회사의 진짜 락인은 모델 성능보다 SDK·도구 라인의 폭과 안정성입니다. OpenAI는 자체 SDK + Cookbook + Agents SDK로 가장 넓은 라인을 깔았고, Anthropic은 그 격차를 빠르게 좁히려고 합니다. Stainless를 인수하면 Claude SDK가 OpenAI SDK와 동급 이상으로 자동 갱신되고, MCP·tool use 같은 신규 기능이 모든 언어에 동시에 풀립니다.

한국 개발자 입장에서 직접 효과는 두 가지입니다. Claude SDK의 TypeScript·Python 외 언어(Go·Java·Kotlin) 라인이 빠르게 채워지고, MCP 표준 도구를 직접 만들기 쉬워집니다. 사내 Java·Kotlin 백엔드에 Claude를 박는 게 지금보다 한 단계 매끄러워질 것으로 예상됩니다.`,
          officialUrl: "https://www.anthropic.com/news/anthropic-acquires-stainless",
          source: "https://www.anthropic.com/news/anthropic-acquires-stainless",
          tags: ["Claude Platform", "Stainless", "SDK", "MCP", "공식"],
          slug: "anthropic-acquires-stainless-c7a48d62",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/anthropic-acquires-stainless-c7a48d62.jpg",
            alt: "Anthropic acquires Stainless",
          },
        },
        {
          date: "5/11",
          platform: "X+Threads",
          title: "Claude Code Agent View — 병렬 에이전트 관제 화면 Research Preview",
          summary: "Anthropic이 Claude Code 2.1.139부터 모든 병렬 세션을 한 화면에서 관리하는 Agent View를 Research Preview로 공개했습니다. 이후 claude agents --cwd 옵션과 pinned background sessions 같은 후속 업데이트가 같은 주에 추가되며 5월 15일 이후에도 영향이 이어졌습니다.",
          content: `Anthropic이 2026년 5월 11일 Claude Code 2.1.139부터 Agent View를 Research Preview로 공개했고, 이번 w21 주차에 \`claude agents --cwd <path>\`와 pinned background sessions 후속 업데이트가 같이 풀렸습니다. 여러 병렬 에이전트 세션을 한 화면에서 관리하는 단일 콘트롤 인터페이스가 핵심입니다.

- Agent View: 모든 활성 세션을 한 패널에서 시각화 (작업, 상태, 토큰, 마지막 출력)
- \`claude agents --cwd <path>\`: 특정 디렉토리 기준으로 세션을 그룹화
- Pinned background sessions: 자주 쓰는 세션을 고정해 두고 빠르게 복귀
- Research Preview: 정식 GA 전 단계

### Codex Mobile·Cursor Agents Window와의 비교

같은 주차에 OpenAI Codex Mobile, Cursor Agents Window가 모두 비슷한 방향을 잡았습니다. 세 회사 모두 "장기 실행 에이전트 여러 개를 동시에 돌리는 게 표준"이라는 가정을 깔고, 그걸 관리할 UI 표면을 별도 제품으로 분리합니다.

차이는 표면 — Anthropic은 CLI 안에 한 패널로 통합하고, OpenAI는 데스크톱 앱 + 모바일을 분리하고, Cursor는 IDE의 별도 창으로 분리합니다. 한국 개발자가 셋 다 평행 사용 중이라면 같은 작업 모델이지만 키맵·표면이 달라서 멘탈 모델을 따로 잡아야 합니다.

### 실전 권장

매일 5개 이상 에이전트를 띄우는 사용자라면 Agent View는 단순 편의가 아니라 필수입니다. 세션이 어디서 어떤 컨텍스트로 도는지 추적 못 하면 컨텍스트 leak, 권한 충돌, 토큰 폭증이 잦아집니다. Pinned background sessions를 활용해서 "장기 실행 리팩토링 1개 + 짧은 디버깅 N개"의 구분을 명확히 두는 게 안전합니다.`,
          officialUrl: "https://www.anthropic.com/news",
          source: "https://www.anthropic.com/news",
          tags: ["Claude Code", "Agent View", "multi-agent CLI", "공식"],
          slug: "claude-code-agent-view-research-preview-1cd2fb14",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/claude-code-agent-view-research-preview-1cd2fb14.jpg",
            alt: "Claude Code Agent View (Research Preview)",
          },
        },
      ],
    },
    {
      name: "NVIDIA",
      color: "#76B900",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "NVIDIA GTC Taipei @ COMPUTEX — 차세대 AI 인프라 라인업 라이브 업데이트",
          summary: "",
          content: `NVIDIA가 2026년 5월 21일 COMPUTEX 기간 중 열린 GTC Taipei에서 차세대 AI 인프라 라인업을 한 번에 공개했습니다. Jetson Thor, AI factory 파트너 확장, 대만 OEM과의 신규 보드 라인이 핵심.

- Jetson Thor: 엣지·로보틱스용 차세대 SoC (Vera Rubin과 같은 세대 아키텍처)
- AI Factory 파트너: 대만 OEM(Wiwynn, Inventec, Pegatron 등)과 표준 보드 채택
- 라이브 시연: 휴머노이드·자율주행·산업 비전 데모
- 같은 주차 Vera CPU 첫 출하 + Q1 FY27 실적 + Dell 키노트와 한 묶음

### 왜 대만에서 동시 발표인가

NVIDIA의 공급망은 TSMC + 대만 OEM 라인이 뼈대입니다. GTC Taipei를 별도로 운영하는 이유는 발표가 끝나자마자 양산 라인이 같이 움직이도록 신호를 주기 위해서입니다. 같은 주차에 Vera CPU가 Anthropic·OpenAI·SpaceXAI·Oracle에 첫 출하됐고, Q1 매출이 분기 최고치를 갈아치웠다는 사실까지 묶어 보면 NVIDIA가 한 주에 "수요 + 공급 + 차세대"를 동시에 못 박았다는 그림이 잡힙니다.

한국 기업에서 직접 영향은 Jetson Thor 라인입니다. 자동차·로보틱스·산업 비전 라인의 엣지 디바이스 사양이 새로 잡히고, 삼성·LG 가전과 현대모비스의 차세대 ECU 라인업이 Thor 기준으로 다시 설계될 가능성이 높습니다.`,
          officialUrl: "https://blogs.nvidia.com/blog/nvidia-gtc-taipei-computex-2026-news/",
          source: "https://blogs.nvidia.com/blog/nvidia-gtc-taipei-computex-2026-news/",
          tags: ["NVIDIA AI", "GTC Taipei", "COMPUTEX", "Jetson Thor", "공식"],
          slug: "nvidia-gtc-taipei-at-computex-live-updat-03bdec81",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nvidia-gtc-taipei-at-computex-live-updat-03bdec81.jpg",
            alt: "NVIDIA GTC Taipei at COMPUTEX: Live Updates on What's Next in AI",
          },
        },
        {
          date: "5/21",
          platform: "X+Threads",
          title: "통신사 AI Factory 위에 토큰 단위 과금 AI 서비스 구축 가이드 — NVIDIA NIM+NeMo 표준 패턴",
          summary: "",
          content: `NVIDIA Developer Blog가 2026년 5월 21일 통신사가 자체 AI Factory 위에서 token-metered AI 서비스를 운영하는 표준 패턴을 정리해 공개했습니다. NIM 마이크로서비스 + NeMo 라인을 묶어 통신사가 직접 LLM API 사업자가 되는 모델.

- 패턴: 통신사 데이터센터 = AI Factory, 가입자에게 토큰 단위 과금 API 제공
- 구성: NIM(모델 서빙) + NeMo(파인튜닝·평가) + Spectrum-X(네트워크)
- 측정: token in / token out 정밀 미터링 + SLA 보장
- 비교 모델: OpenAI·Anthropic의 토큰 과금을 통신사 인프라에 그대로 이식

### 한국 통신사 적용

KT·SK텔레콤·LG U+ 모두 자체 AI 데이터센터를 확장 중이고, 토큰 단위 과금 API 사업은 이미 PoC를 시작했습니다. NVIDIA의 패턴 문서는 운영 표준의 결정타가 될 수 있다 — 자체 모델로 갈지, Llama·Gemma·Qwen 같은 오픈 모델을 NIM 위에 올릴지, 미터링·SLA를 어떻게 설계할지에 대한 레퍼런스가 제공됩니다.

장기적으로 통신사가 "한국형 sovereign LLM"이라는 명분으로 자체 추론 클라우드를 제공하면, 국내 스타트업의 모델 호출 대안이 OpenAI·Anthropic 외에 통신 3사로 늘어나는 그림입니다.`,
          officialUrl: "https://developer.nvidia.com/blog/building-token-metered-ai-services-on-telco-ai-factories/",
          source: "https://developer.nvidia.com/blog/building-token-metered-ai-services-on-telco-ai-factories/",
          tags: ["NVIDIA Telco AI", "AI Factory", "NIM", "NeMo", "공식"],
          slug: "building-token-metered-ai-services-on-te-434cbec0",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/building-token-metered-ai-services-on-te-434cbec0.webp",
            alt: "Building Token-Metered AI Services on Telco AI Factories",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "NVIDIA FY27 Q1 실적 발표 — 매출 816억 달러(+85%), Data Center 752억 달러(+92%) 분기 최고",
          summary: "NVIDIA가 2026년 회계연도 Q1(FY27 Q1) 실적을 발표했습니다. 매출 816억 달러(전년 대비 +85%), Data Center 매출 752억 달러(+92%) — 모두 분기 최고치 경신. 'AI factory 수요'라는 narrative의 첫 정량 증거.",
          content: `NVIDIA가 2026년 5월 20일 회계 분기 Q1 FY27 실적을 공식 발표했습니다. 총 매출 816억 달러(전년 대비 +85%), Data Center 매출 752억 달러(+92%) — 모두 분기 사상 최고. "AI factory 수요"라는 narrative의 첫 정량 증거입니다.

- 총 매출 816억 달러 — 전년 동기 대비 +85%, 분기 사상 최고
- Data Center 매출 752억 달러 — 전년 동기 대비 +92%, 분기 사상 최고
- 전체 매출 중 데이터센터 비중 약 92%
- Blackwell 출하가 본격 매출에 반영된 첫 분기
- 같은 주차 Vera CPU 첫 출하 + GTC Taipei + Dell AI Factory 확장과 한 묶음

### Parabolic이라는 표현이 가리키는 것

시장은 한동안 "AI 인프라 투자가 거품인가"를 물었지만, 이번 분기는 "수요가 공급을 추월한다"의 실증입니다. Jensen Huang은 Dell Technologies World 키노트에서 "Demand is going parabolic — utterly parabolic"이라고 표현했고, 같은 흐름의 정량 근거가 OpenAI·Anthropic의 컴퓨트 장기 계약과 맞물려 산업 전체 capex 사이클을 정당화합니다.

### 그래도 봐야 할 회의론

분기 가이던스, 마진, 중국 매출 비중 등은 별도 IR 자료에서 확인 필요합니다. AI 거품론은 매출이 아니라 "이익 지속성"으로 옮겨가는 중이다 — 전력·공급망·HBM이 다음 병목입니다. "AI factory" 표현은 NVIDIA 마케팅 프레임이라 모든 데이터센터가 AI factory는 아닙니다.

한국 산업 관점에서 직접 영향은 두 가지입니다. SK하이닉스·삼성전자의 HBM3E·HBM4 라인이 NVIDIA Blackwell 양산과 직결되고, 국내 데이터센터 운영사(KT·NHN·네이버)의 GPU 조달 우선순위가 다시 재편됩니다. 한국이 이 분기 실적의 공급 측 절반을 책임지는 위치라는 사실이 이 발표의 한국적 의미입니다.`,
          officialUrl: "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-first-quarter-fiscal-2027",
          source: "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-first-quarter-fiscal-2027",
          tags: ["NVIDIA Data Center", "AI factories", "Blackwell", "공식", "hero후보"],
          featured: true,
          slug: "nvidia-announces-financial-results-for-f-b2ddd86c",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/nvidia-announces-financial-results-for-f-b2ddd86c.jpg",
            alt: "NVIDIA Announces Financial Results for First Quarter Fiscal 2027",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "NVIDIA Mastering Agentic Techniques — AI 에이전트 커스터마이징 편",
          summary: "",
          content: `NVIDIA Developer Blog가 2026년 5월 20일 "Mastering Agentic Techniques" 시리즈 중 에이전트 커스터마이징 편을 공개했습니다. NeMo + Nemotron 라인 위에서 에이전트의 역할·도구·정책을 도메인별로 조정하는 단계별 가이드.

- 다루는 단계: 프롬프트 → 도구 등록 → 정책 정의 → 평가
- 기반 모델: Nemotron 패밀리 (소형·중형·대형)
- 인프라: NeMo Agent Toolkit
- 같은 시리즈: AI Agent Evaluation, Deep Research Skill 편

### 같은 주차 발표와 한 그림

NVIDIA가 한 주에 Mastering Agentic Techniques 3편(Customization·Evaluation·Deep Research), Verified Agent Skills, Vera CPU 출하를 동시에 풀었습니다. 흐름은 명확하다 — NVIDIA가 GPU 회사가 아니라 "에이전트 풀스택" 회사로 포지셔닝을 옮기는 중입니다. OpenAI·Anthropic·Google이 SaaS 위에서 에이전트를 파는 사이, NVIDIA는 인프라 + 도구 + 정책 가이드까지 묶어 엔터프라이즈 자체 구축을 노립니다.

한국에서 자체 에이전트 라인을 구축하려는 통신사·금융권 입장에서, NeMo Agent Toolkit + Nemotron은 OpenAI·Anthropic 의존을 줄이는 가장 현실적인 대안입니다.`,
          officialUrl: "https://developer.nvidia.com/blog/mastering-agentic-techniques-ai-agent-customization/",
          source: "https://developer.nvidia.com/blog/mastering-agentic-techniques-ai-agent-customization/",
          tags: ["NVIDIA NeMo", "Agentic AI", "Nemotron", "공식"],
          slug: "mastering-agentic-techniques-ai-agent-cu-18dc78b2",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/mastering-agentic-techniques-ai-agent-cu-18dc78b2.webp",
            alt: "Mastering Agentic Techniques: AI Agent Customization",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "NVIDIA NeMo Agent Toolkit + AI-Q 에 Deep Research 스킬 추가 가이드 — 폐쇄망 대응",
          summary: "",
          content: `NVIDIA가 2026년 5월 20일 NeMo Agent Toolkit + AI-Q 위에 Deep Research 스킬을 박는 방법을 공식 가이드로 풀었습니다. OpenAI Deep Research·Gemini Deep Research·Claude Computer Use가 이미 만든 시장에 NVIDIA가 인프라 라인으로 진입.

- 구성: Nemotron 모델 + 외부 검색 + 출처 추적 + 다단계 합성
- 데이터: 사내 문서·로그·DB까지 직접 연결 가능
- 출력: 사람이 검증할 수 있는 source chain + 결론
- 차별점: 폐쇄망·온프레미스에서 동작 가능

### 폐쇄망 Deep Research의 의미

OpenAI Deep Research·Gemini Deep Research는 클라우드 SaaS다. 한국 금융·국방·의료처럼 외부 호출이 막힌 도메인은 도입이 어려웠습니다. NVIDIA 스택은 폐쇄망 안에서 같은 패턴을 돌릴 수 있어, 그동안 "Deep Research가 부럽지만 못 쓰던" 조직에 직접 진입 경로를 연입니다.

도입 시 가장 큰 변수는 모델 선택입니다. Nemotron의 한국어 품질이 GPT-5.5·Claude·Gemini와 동급이 아니라, 사내 문서 RAG + 외부 도구 호출로 격차를 메우는 설계가 필요합니다.`,
          officialUrl: "https://developer.nvidia.com/blog/add-a-specialized-deep-research-skill-to-agent-harnesses/",
          source: "https://developer.nvidia.com/blog/add-a-specialized-deep-research-skill-to-agent-harnesses/",
          tags: ["NVIDIA AI-Q", "NeMo Agent Toolkit", "agent harness", "공식"],
          slug: "add-a-specialized-deep-research-skill-to-4d486b31",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/add-a-specialized-deep-research-skill-to-4d486b31.webp",
            alt: "Add a Specialized Deep Research Skill to Agent Harnesses",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "NVIDIA-Verified Agent Skills 공개 — AI 에이전트용 검증 라벨·거버넌스 제도",
          summary: "",
          content: `NVIDIA가 2026년 5월 19일 NVIDIA-Verified Agent Skills 프로그램을 공개했습니다. 외부 개발자가 만든 에이전트 스킬에 NVIDIA가 직접 호환·안전·성능 검증을 거쳐 "verified" 라벨을 부여하는 제도.

- 검증 항목: NeMo Agent Toolkit 호환, 권한 정책 준수, 회귀 평가 통과
- 라벨 사용: NIM·NeMo 카탈로그에 verified 표식
- 거버넌스: 사내 에이전트 도입 시 verified 스킬만 허용하는 정책 운영 가능
- 같은 시리즈: Mastering Agentic Techniques 가이드, Deep Research 스킬

### 왜 "verified" 모델이 필요한가

에이전트 스킬·도구가 외부 마켓에서 자유롭게 풀리면, 사내 보안·정책 라인은 이걸 통과시키기 어렵습니다. NVIDIA가 검증을 표준화하면 엔터프라이즈 도입 결정이 빨라지고, 외부 개발자에게는 검증된 스킬이 곧 신뢰 마크가 됩니다. 같은 모델이 Anthropic MCP, OpenAI Apps에서도 진행 중이지만, NVIDIA는 인프라 스택과 묶어서 들어온다는 게 차이.

한국 SI·금융권 입장에서는 "검증된 스킬만 허용"이라는 보안 정책을 깔기 쉬워집니다. 자체 검증 부담을 외주화할 수 있어 도입 속도가 빨라지지만, NVIDIA 생태계 락인이 그만큼 깊어진다는 양면성이 있습니다.`,
          officialUrl: "https://developer.nvidia.com/blog/nvidia-verified-agent-skills-provide-capability-governance-for-ai-agents/",
          source: "https://developer.nvidia.com/blog/nvidia-verified-agent-skills-provide-capability-governance-for-ai-agents/",
          tags: ["NVIDIA Agent Skills", "agent governance", "공식"],
          slug: "nvidia-verified-agent-skills-provide-cap-e84a94b7",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nvidia-verified-agent-skills-provide-cap-e84a94b7.webp",
            alt: "NVIDIA-Verified Agent Skills Provide Capability Governance for AI Agents",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "NVIDIA Mastering Agentic Techniques — AI 에이전트 평가(Evaluation) 편",
          summary: "",
          content: `NVIDIA가 2026년 5월 19일 NeMo Agent Toolkit 위에서 에이전트를 평가하는 표준 패턴을 정리해 공개했습니다. 같은 주차 OpenAI Cookbook "Macro evals"와 짝을 이루는 평가 가이드.

- 평가 범위: 단일 step 정확도가 아니라 multi-step workflow 성공률
- 도구: NeMo Agent Toolkit + Nemotron 평가 데이터셋
- 패턴: golden set 구성, regression bisect, trace 캡처
- 같은 시리즈: Customization, Deep Research 편

### 한국 도입 팀의 실전 적용

사내 LLM PoC가 prod 진입 직전에 가장 자주 막히는 지점이 평가입니다. 단일 프롬프트 정확도만 보면 통과하지만, 실제 워크플로우에서 도구 호출·외부 시스템 회귀가 발생합니다. NVIDIA 가이드의 핵심은 "step별이 아니라 한 사이클 통째로 성공률을 본다"는 macro eval 패턴입니다.

OpenAI Cookbook의 같은 시기 발표와 합쳐 보면, 빅3 모두 평가 레이어를 한 단계 위로 끌어올리는 데 합의했습니다. 한국 팀이 prod 진입 게이트를 만들 때 이 두 자료를 표준 레퍼런스로 두면 시행착오를 줄일 수 있습니다.`,
          officialUrl: "https://developer.nvidia.com/blog/mastering-agentic-techniques-ai-agent-evaluation/",
          source: "https://developer.nvidia.com/blog/mastering-agentic-techniques-ai-agent-evaluation/",
          tags: ["NVIDIA NeMo Agent Toolkit", "agent evaluation", "공식"],
          slug: "mastering-agentic-techniques-ai-agent-ev-8987f06f",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/mastering-agentic-techniques-ai-agent-ev-8987f06f.webp",
            alt: "Mastering Agentic Techniques: AI Agent Evaluation",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Jensen Huang @ Dell Technologies World — \"Demand Is Going Parabolic\" 수요 비선형 가속 진단",
          summary: "",
          content: `Jensen Huang이 2026년 5월 18일 Dell Technologies World 키노트에서 "Demand is going parabolic — utterly parabolic"이라고 단언했습니다. Dell AI Factory with NVIDIA 확장과 Vera Rubin NVL72 시스템의 첫 출하, OpenAI-Dell Codex 파트너십이 같은 키노트에서 함께 발표됐습니다.

- 키워드 "parabolic": AI factory 수요가 비선형으로 가속한다는 진단
- Dell AI Factory with NVIDIA: 하드웨어 + 소프트웨어 + 서비스 일괄 패키지
- Vera Rubin NVL72 출하: 같은 주차 Anthropic·OpenAI·SpaceXAI·Oracle 첫 수령
- OpenAI-Dell 파트너십: Codex의 하이브리드·온프레미스 배포

### 같은 주 Q1 실적과의 연계

Q1 FY27 매출 816억 달러, Data Center 752억 달러라는 수치 + "parabolic" 표현이 한 주 안에 같이 나왔다는 게 핵심입니다. 시장의 거품론을 한 번에 정리하려는 패턴 — 마케팅 표현과 IR 수치를 같은 시점에 정렬시키면 메시지 강도가 두 배가 됩니다.

한국 산업 관점에서 봐야 할 건 Dell 파트너십이 한국 SI·금융권의 온프레미스 도입 경로를 직접 연다는 점입니다. 동시에 Vera Rubin 첫 출하는 차세대 HBM4 수요를 SK하이닉스·삼성에 직접 연결합니다.`,
          officialUrl: "https://blogs.nvidia.com/blog/dell-technologies-agent-enterprise-ai/",
          source: "https://blogs.nvidia.com/blog/dell-technologies-agent-enterprise-ai/",
          tags: ["Dell AI Factory with NVIDIA", "Vera Rubin", "enterprise agentic AI", "공식"],
          slug: "nvidia-ceo-jensen-huang-at-dell-technolo-e58f42c0",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nvidia-ceo-jensen-huang-at-dell-technolo-e58f42c0.jpg",
            alt: "NVIDIA CEO Jensen Huang at Dell Technologies World: Demand Is Going Parabolic, Utterly Parabolic",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "NVIDIA Vera CPU 첫 출하 — 에이전트 전용 CPU 가 Anthropic·OpenAI·SpaceXAI·Oracle 에 도착",
          summary: "NVIDIA의 첫 에이전트 전용 CPU 'Vera'가 첫 출하됐습니다. Anthropic, OpenAI, SpaceXAI, Oracle Cloud Infrastructure가 첫 수령자. Vera는 Vera Rubin NVL72 시스템의 CPU 절반으로, GPU가 추론을 돌리는 동안 도구 호출·오케스트레이션·샌드박싱·분석·장기 컨텍스트 상태 관리 같은 CPU-heavy 에이전트 작업을 전담합니다.",
          content: `NVIDIA가 2026년 5월 18일 첫 에이전트 워크로드 전용 CPU "Vera"의 첫 출하를 발표했습니다. Anthropic, OpenAI, SpaceXAI, Oracle Cloud Infrastructure가 첫 수령자입니다. Vera는 단독 칩이 아니라 Vera Rubin NVL72 시스템의 CPU 절반으로, GPU가 추론을 도는 동안 CPU-heavy 에이전트 작업을 전담합니다.

- 시스템 구성: Rubin GPU(추론) + Vera CPU(에이전트 오케스트레이션) + BlueField-4 + Spectrum-X + MGX 폼팩터
- Vera가 담당하는 작업: tool calling, orchestration, sandboxing, analytics, long-context state management
- 첫 수령자: Anthropic, OpenAI, SpaceXAI, Oracle Cloud Infrastructure
- 공급 수량·구체 사양·가격은 미공개

### 왜 자체 CPU를 다시 설계했나

지금까지 "AI 인프라 = GPU"였습니다. NVIDIA의 새 주장은 "에이전트 시대에는 GPU만으로는 부족하다 — CPU도 에이전트 전용으로 다시 설계해야 한다"는 것입니다. GPU는 행렬 곱이 강하지만 tool call, 권한 검사, 긴 컨텍스트 상태 유지 같은 작업은 CPU 특성에 더 맞습니다. 두 작업을 한 시스템 안에서 동시에 돌리려면 GPU·CPU·네트워크 패브릭이 같은 세대 아키텍처로 설계돼야 합니다.

### Frontier 랩이 줄 서서 받았다는 신호

첫 수령자가 Anthropic·OpenAI·SpaceXAI·Oracle이라는 사실 자체가 메시지입니다. 같은 주차 NVIDIA Q1 FY27 매출 816억 달러, Jensen Huang의 "parabolic" 발언과 묶어 보면 흐름이 일관합니다. 공급이 어느 정도 한정된 상태에서 frontier 랩 다섯 곳이 줄을 섰다는 사실이 시장 신호입니다.

한국 산업 관점에서는 Vera Rubin이 HBM4 + 차세대 인터커넥트 수요를 직접 만든다는 점이 핵심입니다. SK하이닉스·삼성전자의 차세대 메모리 라인업이 이 시스템 기준으로 다시 설계되고, 국내 데이터센터 운영사가 차세대 시스템을 받는 우선순위도 이 흐름에 영향을 받습니다.`,
          officialUrl: "https://blogs.nvidia.com/blog/vera-cpu-delivery/",
          source: "https://blogs.nvidia.com/blog/vera-cpu-delivery/",
          tags: ["NVIDIA Vera CPU", "Vera Rubin NVL72", "agentic AI infrastructure", "공식", "hero후보"],
          featured: true,
          slug: "vera-arrives-nvidia-s-first-cpu-built-fo-2dd68315",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/vera-arrives-nvidia-s-first-cpu-built-fo-2dd68315.jpg",
            alt: "Vera Arrives: NVIDIA's First CPU Built for Agents Lands at Top AI Labs",
          },
        },
      ],
    },
    {
      name: "GitHub",
      color: "#181717",
      posts: [
        {
          date: "5/20",
          platform: "X+Threads",
          title: "GitHub Copilot 자동 모델 선택 — VS Code 작업 유형 기반 라우팅",
          summary: "GitHub Copilot이 VS Code에서 자동 모델 선택을 통해 작업 유형 기반으로 모델 라우팅을 시작했습니다.",
          content: `GitHub가 2026년 5월 20일 VS Code의 Copilot 자동 모델 선택을 작업 유형 기반 라우팅으로 바꿨입니다. 사용자가 모델을 직접 고르지 않아도 코드 작성·리뷰·디버깅·문서화 작업별로 적합한 모델이 자동 매칭됩니다.

- 라우팅 기준: 작업 유형 (코드 완성, 채팅, agent, edit, review)
- 후보 모델: GPT-5.5·GPT-5.3-Codex·Claude·Gemini·Grok 등 Copilot이 지원하는 라인
- UX: 사용자가 명시적으로 고를 수도 있고, "auto"로 두면 시스템이 결정
- 같은 주차 Gemini 3.5 Flash GA + Copilot Business의 GPT-5.3-Codex 기본화와 한 묶음

### 모델 선택을 추상화하는 흐름

같은 흐름이 Anthropic Claude Code, Cursor, Vercel AI Gateway에서도 보인입니다. 사용자가 모델을 직접 고르는 건 점점 사라지고, 작업에 따라 시스템이 라우팅합니다. 가격·지연시간·품질 트레이드오프를 사용자가 매번 계산하지 않아도 되는 구조입니다.

한국 개발자 입장에서 효과는 명확하다 — 모델 선택 결정 부담이 사라집니다. 다만 "왜 이 작업에 이 모델이 선택됐는가"가 불투명해질 수 있어, 사내 표준을 정할 때는 라우팅 로그가 어디까지 노출되는지 확인이 필요합니다.`,
          officialUrl: "https://github.blog/changelog/2026-05-20-auto-model-selection-now-routes-based-on-your-task-in-vs-code",
          source: "https://github.blog/changelog/2026-05-20-auto-model-selection-now-routes-based-on-your-task-in-vs-code",
          tags: ["GitHub Copilot", "VS Code", "model routing", "공식"],
          slug: "auto-model-selection-now-routes-based-on-cd41cce4",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/auto-model-selection-now-routes-based-on-cd41cce4.webp",
            alt: "Auto model selection now routes based on your task in VS Code",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Copilot Cloud Agent, 리뷰 코멘트를 직접 코드 패치로 변환",
          summary: "GitHub가 Copilot Cloud Agent를 개선해 코드 리뷰 피드백을 직접 적용할 수 있게 했습니다.",
          content: `GitHub가 2026년 5월 19일 Copilot Cloud Agent로 리뷰 코멘트를 직접 코드 수정으로 변환하는 기능을 풀었습니다. 리뷰어가 남긴 텍스트 코멘트를 Cloud Agent가 패치 + 커밋 + PR 업데이트로 처리합니다.

- 입력: PR에 달린 리뷰 코멘트
- 처리: Cloud Agent가 변경안 작성 → 새 커밋 → 같은 PR에 푸시
- 사용자: 리뷰어 또는 PR 작성자 한 명만 트리거하면 됨
- 같은 주차 One-click fixes for failing Actions와 같은 라인

### "리뷰 코멘트를 직접 패치로"가 의미하는 것

대규모 코드베이스의 PR 리뷰는 보통 "리뷰어가 지적 → 작성자가 수정 → 다시 리뷰 → 머지"로 3~5회 핑퐁이 일어납니다. Cloud Agent가 리뷰 코멘트를 직접 패치로 만들면 핑퐁 횟수가 줄고, 작성자는 검토·승인에만 집중하면 됩니다.

OpenAI Ramp 사례와 같은 결의 자동화입니다. 차이는 GitHub가 워크플로우 표면(PR UI)에 직접 박아 둔다는 점. 한국 팀이 Copilot Business 라이선스를 이미 깐 상태라면 별도 설정 없이 바로 사용 가능합니다. 코드 품질·보안 정책에서 어디까지 Cloud Agent에 위임할지가 운영 규칙으로 정리돼야 합니다.`,
          officialUrl: "https://github.blog/changelog/2026-05-19-easily-apply-copilot-code-review-feedback-with-copilot-cloud-agent",
          source: "https://github.blog/changelog/2026-05-19-easily-apply-copilot-code-review-feedback-with-copilot-cloud-agent",
          tags: ["GitHub Copilot cloud agent", "code review", "공식", "hero후보"],
          featured: true,
          slug: "easily-apply-copilot-code-review-feedbac-4683c903",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/easily-apply-copilot-code-review-feedbac-4683c903.jpg",
            alt: "Easily apply Copilot code review feedback with Copilot cloud agent",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Gemini 3.5 Flash, GitHub Copilot 에서 GA — I/O 2026 발표 당일 즉시 적용",
          summary: "Gemini 3.5 Flash가 GitHub Copilot에서 일반 출시(GA)됐습니다.",
          content: `Gemini 3.5 Flash가 2026년 5월 19일 GitHub Copilot에서 GA로 풀렸습니다. Google I/O 2026 발표 당일에 즉시 GA 처리됐다는 점이 인상적입니다.

- 모델 라인: Gemini 3.5 Flash (속도·비용 최적)
- 사용 범위: Copilot Chat, Edit, Agent (Copilot Pro·Business·Enterprise)
- 같은 주차 Copilot 자동 모델 선택과 결합
- I/O 2026에서 공개 → GitHub에서 동일 주차 GA

### 모델 출시 - 도구 통합의 시간차가 없어지는 흐름

예전에는 모델 발표와 GitHub Copilot 통합 사이에 수 주~수 개월 시차가 있었습니다. 이번 사례처럼 발표 당일 GA가 가능해진 건 GitHub·Google 양사 모두 통합 라인을 사전 준비해 둔다는 뜻입니다.

한국 개발자에게 직접 효과는 두 가지입니다. 한국어 코드 주석·문서 작성에서 Gemini 라인이 GPT-5.5·Claude와 동등하게 후보로 오르고, 속도·비용 우선 작업에서 Flash 라인을 명시 선택할 수 있습니다. 모델 라우팅을 사용자가 직접 잡는 운영자라면 작업별 매핑 테이블에 Gemini 3.5 Flash를 추가하는 게 다음 단계입니다.`,
          officialUrl: "https://github.blog/changelog/2026-05-19-gemini-3-5-flash-is-generally-available-for-github-copilot",
          source: "https://github.blog/changelog/2026-05-19-gemini-3-5-flash-is-generally-available-for-github-copilot",
          tags: ["GitHub Copilot", "models", "공식"],
          slug: "gemini-3-5-flash-is-generally-available--4d91d7f1",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/gemini-3-5-flash-is-generally-available--4d91d7f1.webp",
            alt: "Gemini 3.5 Flash is generally available for GitHub Copilot",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "GitHub Actions 실패를 Copilot Cloud Agent 가 원클릭으로 자동 수정",
          summary: "GitHub가 실패한 GitHub Actions 워크플로우를 Copilot Cloud Agent가 원클릭으로 수정하는 기능을 추가했습니다.",
          content: `GitHub가 2026년 5월 18일 실패한 Actions 워크플로우를 Copilot Cloud Agent가 자동으로 분석·수정하는 기능을 풀었습니다. CI 실패 로그를 사람이 읽고 수정하던 흐름을 한 클릭으로 단축.

- 트리거: Actions 실패 화면의 "Fix with Copilot" 버튼
- 처리: Cloud Agent가 로그 분석 → 패치 생성 → 새 PR 또는 같은 PR에 커밋
- 같은 주차 Code review feedback 적용 기능과 같은 라인
- 대상: Copilot Business·Enterprise 라이선스

### CI 실패 1차 대응의 자동화

CI 실패는 대부분 의존성 버전 mismatch, 환경 변수 누락, 테스트 timeout 같은 정형 패턴입니다. 1차 대응을 자동화하면 엔지니어가 진짜 버그에만 집중할 수 있습니다. 작은 회사에서는 효과가 더 크다 — 별도 DevOps 인력 없이도 CI 안정성이 올라갑니다.

한국 팀에서 CI/CD를 GitHub Actions로 표준화한 곳이라면 즉시 도입 가능. 다만 Cloud Agent가 만든 패치가 prod 배포 라인을 직접 건드리지 않도록 권한 게이트를 사전에 설계해야 합니다. 보안 정책상 머지 전 사람 승인이 필수인 조직에서는 PR 생성까지만 자동화하고 승인은 사람이 잡는 구조가 안전합니다.`,
          officialUrl: "https://github.blog/changelog/2026-05-18-one-click-fixes-for-failing-actions-with-copilot-cloud-agent",
          source: "https://github.blog/changelog/2026-05-18-one-click-fixes-for-failing-actions-with-copilot-cloud-agent",
          tags: ["GitHub Actions", "Copilot cloud agent", "공식", "hero후보"],
          featured: true,
          slug: "one-click-fixes-for-failing-actions-with-e02c868a",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/one-click-fixes-for-failing-actions-with-e02c868a.png",
            alt: "One-click fixes for failing Actions with Copilot cloud agent",
          },
        },
        {
          date: "5/17",
          platform: "X+Threads",
          title: "GitHub Copilot Business·Enterprise 기본 모델, GPT-5.3-Codex 로 교체",
          summary: "GitHub가 Copilot Business와 Enterprise의 기본 모델을 GPT-5.3-Codex로 교체했습니다.",
          content: `GitHub가 2026년 5월 17일 Copilot Business와 Enterprise의 기본 모델을 GPT-5.3-Codex로 교체했습니다. 사용자가 별도 설정을 바꾸지 않아도 모든 코드 작성·완성 요청이 새 모델로 라우팅됩니다.

- 모델 변경: 기존 GPT-5.x → GPT-5.3-Codex
- 대상 플랜: Copilot Business, Copilot Enterprise
- 변경 방식: 서버 측 기본값 변경 (사용자 작업 불필요)
- 같은 주차 자동 모델 라우팅 + Gemini 3.5 Flash GA + Cloud Agent 기능과 한 라인

### Codex 라인이 기본값이 된 의미

GPT-5.3-Codex는 OpenAI가 코드 생성·리팩토링 작업에 특화 튜닝한 라인입니다. 범용 GPT-5.x보다 코드 품질·테스트·diff 일관성이 높습니다. 엔터프라이즈가 기본값으로 받는다는 건 GitHub가 "범용 챗 모델보다 코드 전용 라인이 PR·CI 환경에 더 맞다"는 결론을 내렸다는 신호입니다.

한국 기업에서 Copilot Business·Enterprise를 이미 운영 중이라면 즉각 효과를 체감합니다. PR 리뷰 1차 패스, 테스트 자동 작성, 리팩토링 제안 품질이 한 단계 올라갑니다. 다만 사내 코드 라이브러리·도메인 지식이 깊을수록 base model 교체로 얻는 효과보다 사내 RAG·custom instruction 라인 정비가 더 큰 차이를 만듭니다.`,
          officialUrl: "https://github.blog/changelog/2026-05-17-gpt-5-3-codex-is-now-the-base-model-for-copilot-business-and-enterprise",
          source: "https://github.blog/changelog/2026-05-17-gpt-5-3-codex-is-now-the-base-model-for-copilot-business-and-enterprise",
          tags: ["GitHub Copilot Business", "GitHub Copilot Enterprise", "공식"],
          slug: "gpt-5-3-codex-is-now-the-base-model-for--d3b67286",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/gpt-5-3-codex-is-now-the-base-model-for--d3b67286.webp",
            alt: "GPT-5.3-Codex is now the base model for Copilot Business and Enterprise",
          },
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "GitHub Copilot Memory, Pro·Pro+ 사용자 선호도 저장 기능 추가",
          summary: "GitHub가 Pro·Pro+ 사용자를 위한 Copilot Memory 사용자 선호도 저장 기능을 추가했습니다.",
          content: `GitHub가 2026년 5월 15일 Copilot Memory에 사용자 선호도 저장 기능을 추가했습니다. Pro·Pro+ 사용자는 자주 쓰는 언어·프레임워크·코딩 스타일·테스트 패턴을 한 번 저장하고 모든 세션에 자동 적용 가능.

- 대상: Copilot Pro, Pro+
- 저장 항목: 선호 언어·프레임워크·스타일·테스트 패턴
- 적용 범위: VS Code, JetBrains, web chat 등 모든 Copilot 표면
- 같은 흐름: OpenAI ChatGPT Memory, Anthropic Claude Memory

### "도구가 나를 기억한다"의 표준화

LLM 도구가 사용자 컨텍스트를 세션마다 다시 학습하던 시대가 끝나갑니다. OpenAI·Anthropic·Google·GitHub 모두 같은 시기 메모리 기능을 풀었고, 사용자는 한 번만 가르치면 됩니다.

한국 개발자 입장에서 단점은 메모리에 저장된 정보가 어디서 사용되고 어디로 동기화되는지 투명성입니다. 사내 보안·개인정보 정책에 따라서는 메모리 사용 자체를 꺼두는 게 안전할 수 있습니다. 도입 전에 GitHub 데이터 처리 약관과 사내 정책 호환 여부 확인이 필요합니다.`,
          officialUrl: "https://github.blog/changelog/2026-05-15-copilot-memory-supports-user-preferences-for-pro-pro-users",
          source: "https://github.blog/changelog/2026-05-15-copilot-memory-supports-user-preferences-for-pro-pro-users",
          tags: ["GitHub Copilot Memory", "공식"],
          slug: "copilot-memory-supports-user-preferences-785b4e51",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/copilot-memory-supports-user-preferences-785b4e51.png",
            alt: "Copilot Memory supports user preferences for Pro, Pro+ users",
          },
        },
      ],
    },
    {
      name: "Cursor / Anysphere",
      color: "#374151",
      posts: [
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Cursor Automations 강화 — Agents Window 통합 + 멀티 repo·no-repo 템플릿 추가",
          summary: "Cursor가 Agents Window에 Automations를 통합하고 멀티 리포지토리·리포지토리 미연결 자동화 템플릿을 도입했습니다.",
          content: `Cursor가 2026년 5월 20일 Automations 라인을 강화했습니다. Agents Window 안에서 Automations를 직접 다룰 수 있게 통합했고, 멀티 리포지토리·리포지토리 미연결 자동화 템플릿을 추가했습니다.

- Agents Window 통합: 자동화 실행 상태·실패 로그를 같은 패널에서 추적
- 멀티 repo 자동화: 여러 저장소에 동시에 영향을 주는 작업 템플릿
- 노 repo 자동화: 저장소 없이도 돌릴 수 있는 일반 작업 (스크래핑, 알림, 빌드 트리거)
- 같은 주차 Composer 2.5 + Jira 통합과 한 라인

### Cursor가 "에이전트 IDE"로 굳어지는 중

Cursor는 단순 코드 편집기에서 점점 에이전트 운영 콘솔로 이동 중입니다. 같은 주차에 Composer 2.5, Jira 통합, Automations 강화가 한꺼번에 나왔습니다. 흐름은 OpenAI Codex·Anthropic Claude Code와 같은 방향 — "장기 실행 에이전트 여러 개 + 외부 시스템 통합 + 별도 콘솔 UI"의 표준화.

한국 개발팀이 Cursor를 표준 IDE로 깔았다면, Automations를 사내 반복 작업(스테이징 배포, 코드 포맷 점검, 의존성 업데이트)에 우선 적용해 보는 게 빠른 가치 검증 경로입니다.`,
          officialUrl: "https://cursor.com/changelog/05-20-26",
          source: "https://cursor.com/changelog/05-20-26",
          tags: ["Cursor Automations", "Agents Window", "공식"],
          slug: "improvements-to-cursor-automations-4b9e0ee2",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/improvements-to-cursor-automations-4b9e0ee2.png",
            alt: "Improvements to Cursor Automations",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Cursor, Jira 통합 — 이슈에서 @Cursor 멘션으로 코드 작업 직접 호출",
          summary: "Cursor가 Jira 통합을 추가했습니다. 사용자가 @Cursor를 멘션하거나 이슈를 할당하면 Cloud Agent가 작업을 처리하고 PR 링크를 돌려줍니다.",
          content: `Cursor가 2026년 5월 19일 Jira 통합을 공식 풀었습니다. Jira 이슈에서 @Cursor를 멘션하거나 이슈를 Cursor에 직접 할당하면, Cloud Agent가 해당 이슈를 처리하고 PR 링크를 댓글로 돌려준입니다.

- 트리거: Jira 이슈에 @Cursor 멘션 또는 담당자 할당
- 처리: Cursor Cloud Agent가 백그라운드에서 코드 작성 → PR 생성
- 결과: Jira 이슈에 PR 링크 자동 댓글
- 사용자 경험: 개발자가 Cursor를 열지 않아도 됨

### 이슈 트래커가 에이전트 트리거가 되는 흐름

같은 패턴이 Linear·GitHub Issues·Notion에서도 보인입니다. 이슈가 새 task의 시작점이라면, 이슈 자체가 에이전트 호출 인터페이스가 됩니다. 사용자 입장에서 Cursor·Claude Code·Codex 같은 도구를 직접 열 필요가 없어집니다.

한국 팀에서 Jira를 표준 이슈 트래커로 쓰는 경우(SI, 금융, 게임사 다수) 이 통합은 즉시 가치가 있습니다. PM·기획자가 직접 이슈를 작성하면서 @Cursor를 멘션해 "이걸 코드로 풀어 봐"라고 던질 수 있습니다. 다만 권한 라인이 중요하다 — PM·기획자가 작성한 prompt가 어디까지 실제 코드 변경으로 이어지는지 사전 게이트가 필요합니다.`,
          officialUrl: "https://cursor.com/changelog/05-19-26",
          source: "https://cursor.com/changelog/05-19-26",
          tags: ["Cursor cloud agent", "Jira", "공식"],
          slug: "cursor-in-jira-57aa0e15",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/cursor-in-jira-57aa0e15.png",
            alt: "Cursor in Jira",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Cursor Composer 2.5 출시 — 장기 실행·지시 준수·협업 3축 동시 개선",
          summary: "Cursor Composer 2.5가 장기 실행 작업, 지시 준수, 협업을 개선했습니다.",
          content: `Cursor가 2026년 5월 18일 Composer 2.5를 공개했습니다. 장기 실행 작업, 지시 준수, 협업 세 축을 한 번에 개선한 메이저 업데이트.

- 장기 실행 작업: 수십 분~수 시간 단위 작업이 중간 실패해도 컨텍스트 유지
- 지시 준수: 사용자 prompt와 코드 가이드라인을 더 엄격하게 따름
- 협업: 여러 개발자가 같은 Composer 세션을 공유 가능
- 같은 주차 Jira 통합 + Automations 강화와 한 라인

### 장기 실행이 진짜 변수

Cursor·Codex·Claude Code 모두 "Agent 시대" 마케팅을 하지만, 실제로 30분 넘게 일관되게 한 작업을 끌고 가는 모델은 아직 적습니다. 컨텍스트 leak, 의도 표류, 부분 실패가 잦입니다. Composer 2.5의 가장 큰 차별점은 이 부분을 정면으로 개선한다는 것.

한국 팀에서 효과를 가장 크게 보는 영역은 대규모 리팩토링·마이그레이션입니다. Next.js·React·Java 버전 업그레이드처럼 수백 파일에 걸친 작업이 한 세션으로 끝나면, 사람 개발자가 잡아야 할 부분은 도메인 로직 검증뿐입니다. 다만 prod 코드에 장기 실행 에이전트를 풀어 두기 전에 sandbox·preview 환경에서 충분히 검증하는 게 안전합니다.`,
          officialUrl: "https://cursor.com/changelog/composer-2-5",
          source: "https://cursor.com/changelog/composer-2-5",
          tags: ["Cursor Composer", "공식"],
          slug: "composer-2-5-3507df22",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/composer-2-5-3507df22.png",
            alt: "Composer 2.5",
          },
        },
      ],
    },
    {
      name: "Microsoft",
      color: "#00BCF2",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Microsoft Visual Studio 에 Plan Agent 공개 — 코드 작성 전에 구현 계획부터",
          summary: "Microsoft가 코드를 작성하기 전에 구현 계획을 만들고 편집·공유하는 Visual Studio Plan 에이전트를 공개했습니다.",
          content: `Microsoft가 2026년 5월 21일 Visual Studio에 Plan Agent를 공개했습니다. 코드를 바로 쓰지 않고 구현 계획을 먼저 만들어 편집·공유하는 단계를 IDE 안에 정식 박은 첫 사례.

- 흐름: 요구사항 입력 → Plan Agent가 단계별 계획 생성 → 사용자 편집 → 실행 단계로 위임
- 공유: 계획 문서를 팀과 공유, 리뷰 후 실행
- 통합 모델: Plan ≠ 실행 — 모델이 직접 코드 작성 전에 사람이 계획을 검토
- 같은 흐름: xAI Grok Build의 Plan Mode, OpenAI Codex Goals

### 왜 IDE가 "계획"을 직접 다루나

장기 실행 에이전트가 실패하는 가장 큰 원인이 "계획 누락"입니다. 사용자가 요구사항을 한 줄 던지면 에이전트가 자기 해석으로 작업을 시작하고, 중간에 의도와 어긋납니다. Plan Agent는 이 사이에 사람 검토 게이트를 박습니다.

Grok Build의 Plan Mode, Codex 0.133의 Goals와 같은 결의 결정입니다. 빅3 + Microsoft + xAI 모두 "에이전트 = 계획 + 실행 분리"로 수렴 중입니다.

한국 SI·금융권에서 Visual Studio가 표준 IDE인 .NET·C# 라인이라면 이 기능이 즉시 가치를 만듭니다. 요건이 명확하지 않은 상태에서 코드부터 쓰는 사고를 줄이고, 계획 단계에서 잘못된 가정을 조기에 잡을 수 있습니다.`,
          officialUrl: "https://devblogs.microsoft.com/visualstudio/plan-before-you-build-introducing-the-plan-agent-in-visual-studio/",
          source: "https://devblogs.microsoft.com/visualstudio/plan-before-you-build-introducing-the-plan-agent-in-visual-studio/",
          tags: ["Visual Studio", "Copilot", "Plan agent", "공식"],
          slug: "plan-before-you-build-introducing-the-pl-6e7d2f7a",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/plan-before-you-build-introducing-the-pl-6e7d2f7a.webp",
            alt: "Plan Before You Build: Introducing the Plan agent in Visual Studio",
          },
        },
      ],
    },
    {
      name: "xAI / Grok",
      color: "#1D1D1F",
      posts: [
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Grok Build — xAI의 터미널 기반 parallel coding agent (early beta)",
          summary: "xAI가 5/14 공개한 Grok Build CLI/TUI는 풀스크린 터미널 UI, 최대 8개 parallel sub-agent, Plan Mode, 131K~2M 컨텍스트를 지원합니다. SuperGrok Heavy 구독자(월 $300, 프로모션 $99) 전용 early beta.",
          content: `xAI가 2026년 5월 14일 터미널 기반 AI 코딩 에이전트 Grok Build를 early beta로 공개했고, 5월 19일 xAI 공식 release notes에 Grok Build 0.1로 박혔습니다. CLI와 TUI 양쪽으로 동작하며 자연어 명령 한 줄로 계획·검색·코드 작성·실행·테스트를 묶어 처리합니다.

- 설치: \`curl -fsSL https://x.ai/cli/install.sh | bash\` 한 줄
- TUI: 풀스크린 + 마우스 지원, Vim-like 단축키, 실시간 diff, 멀티 창
- Plan Mode: 작업 계획을 먼저 제시 → 개발자가 수정·승인 후 실행
- Parallel Sub-agent: 최대 8개 에이전트 동시 독립 작업
- 컨텍스트: 131K~2M 토큰 범위 (자료별 편차)
- 기능: Git 통합, 멀티 파일 편집, Shell 실행, X 실시간 검색

### 접근성과 가격

현재 SuperGrok Heavy 구독자 전용 early beta다. 월 $300, 6개월 프로모션 시 $99. 일반·무료 Grok 사용자는 사용 불가. xAI 팀이 매일 패치·기능을 추가하는 단계입니다.

### Claude Code · Codex CLI와의 실전 비교

해외 리뷰(eigent.ai, rejoicehub.com 2026.5)와 day-one beta 후기를 종합하면 다음과 같습니다.

| 항목 | Grok Build | Claude Code | Codex CLI |
|---|---|---|---|
| 인터페이스 | Terminal-first TUI (최고 평가) | Terminal + IDE | Terminal shell |
| 병렬 에이전트 | 최대 8개 (강점) | 1~2개 | 제한적 |
| Plan Mode | 그래프 + 직접 편집 | 선형 텍스트 | 기본 |
| 실행 속도 | 가장 빠름 | 계획 단계 상대적 느림 | 중간 |
| Reasoning / 코드 품질 | 빠른 실행 중심 | 가장 우수 (deep reasoning) | 중간~좋음 |
| 대형 코드베이스 | 모듈러 프로젝트 강함 | monorepo·legacy 최고 | 중간 |
| SWE-Bench (참고) | ~51% | ~57% | ~54% |
| Best For | 빠른 prototyping, 대형 리팩토링 | 복잡한 refactoring, 코드 품질 | OpenAI 생태계, 가성비 |

### 한국 개발자가 고려할 포인트

긍정 평가는 "지금까지 본 AI CLI 중 가장 잘 다듬어진 TUI", "parallel agent로 대형 작업 속도가 압도적"으로 모이고 있습니다. 한계는 early beta 단계라 일부 reasoning depth에서 Claude Code에 뒤처진다는 의견과 가격 진입 장벽 두 가지.

권장 시나리오는 명확합니다. Claude Code·Codex CLI를 이미 도입한 팀이라면, Grok Build는 "병렬 작업·빠른 prototyping이 잦은 라인"에만 한정해서 추가 도입을 검토하는 게 합리적입니다. SuperGrok Heavy 구독을 별도 잡아야 해서 비용 대비 효과를 명확히 측정해야 합니다. 같은 주차 Vercel AI Gateway가 Grok Build 0.1을 추가했으니, Cloud Gateway 호출 모델로도 점차 접근성이 넓어질 전망입니다.`,
          officialUrl: "https://x.ai/news/grok-build-cli",
          source: "https://docs.x.ai/developers/release-notes",
          backupUrls: [
            { label: "xAI 공식 — Grok Build CLI 발표", url: "https://x.ai/news/grok-build-cli" },
            { label: "xAI 공식 — x.ai/cli (설치 / 다운로드)", url: "https://x.ai/cli" },
            { label: "xAI Release Notes (Grok Build 0.1 entry)", url: "https://docs.x.ai/developers/release-notes" },
            { label: "Grok Build 0.1 model docs", url: "https://docs.x.ai/developers/models/grok-build-0.1" },
            { label: "eigent.ai — Grok Build vs Claude Code vs Codex CLI", url: "https://eigent.ai/blog/grok-build-cli" },
            { label: "rejoicehub — Grok Build vs Claude Code vs Codex CLI", url: "https://rejoicehub.com/blogs/grok-build-vs-claude-code-vs-codex-cli" },
            { label: "Vercel AI Gateway — Grok Build 0.1 추가", url: "https://vercel.com/changelog/grok-build-0-1-now-available-on-vercel-ai-gateway" },
          ],
          tags: ["xAI", "Grok Build", "CLI", "TUI", "parallel agent", "Plan Mode", "공식", "hero후보"],
          featured: true,
          slug: "grok-build-0-1-added-to-xai-release-note-1de20131",
          readMinutes: 4,
          thumbnail: {
            src: "/og-cache/grok-build-0-1-added-to-xai-release-note-1de20131.jpg",
            alt: "Grok Build 0.1 added to xAI release notes",
          },
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "Grok 구형 모델 일괄 은퇴 — 2026년 5월 15일 API 폐기",
          summary: "",
          content: `xAI가 2026년 5월 15일자로 다수의 구형 Grok 모델을 API에서 일괄 폐기했습니다. xAI API를 직접 호출하던 개발자·기업은 마이그레이션 가이드를 따라 신규 라인으로 옮겨야 합니다.

- 폐기 일자: 2026년 5월 15일
- 대상: 구형 Grok 모델 다수 (마이그레이션 페이지에 명세)
- 대체 라인: 최신 Grok 모델 패밀리
- 영향: API 직접 호출 라인 (chat UI 사용자는 영향 없음)

### 모델 폐기 라이프사이클이 짧아지는 흐름

xAI·OpenAI·Anthropic 모두 모델 폐기 주기가 점점 짧아집니다. 발표 → GA → 신모델 출시 → 구모델 deprecation까지 6~12개월 주기로 돕니다. 사내 시스템에 모델명을 하드코딩한 경우 매번 마이그레이션 작업이 필요합니다.

한국 팀에서 xAI API를 직접 사용하는 경우는 많지 않지만, "모델명 하드코딩 금지" 같은 운영 규칙은 모든 LLM 도입에 공통입니다. 모델명을 환경변수·설정 파일로 분리하고, deprecation 알림 채널(공식 docs + dev mailing list)을 사전 구독해 두는 게 안전합니다.`,
          officialUrl: "https://docs.x.ai/developers/migration/may-15-retirement",
          source: "https://docs.x.ai/developers/migration/may-15-retirement",
          tags: ["xAI API", "Grok Models", "공식"],
          slug: "grok-model-retirement-on-may-15-2026-9ba2517f",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/grok-model-retirement-on-may-15-2026-9ba2517f.jpg",
            alt: "Grok Model Retirement on May 15, 2026",
          },
        },
      ],
    },
    {
      name: "Vercel",
      color: "#000000",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Vercel AI Gateway 에 Qwen 3.7 Max 추가",
          summary: "Vercel이 AI Gateway에 Qwen 3.7 Max를 추가했습니다.",
          content: `Vercel이 2026년 5월 21일 AI Gateway에 Alibaba Qwen 3.7 Max를 추가했습니다. 단일 엔드포인트로 호출할 수 있는 모델 라인에 중국 상위 라인이 한 칸 더 추가됐습니다.

- 모델: Qwen 3.7 Max
- 사용 채널: Vercel AI Gateway (단일 endpoint, 단일 인증)
- 같은 주차 Grok Build 0.1 추가, Chat SDK with tools 발표

### Vercel AI Gateway가 모델 라우터로 굳어지는 흐름

Vercel AI Gateway는 OpenAI·Anthropic·Google·xAI·Alibaba 모델을 한 endpoint로 다 묶는 라우터 전략을 잡고 있습니다. 사용자는 모델별 SDK·키·과금을 각각 관리하지 않아도 됩니다.

한국 개발자 입장에서 Qwen 추가는 두 가지 의미입니다. 첫째, 한국어·중국어 작업에서 Qwen 라인이 GPT·Claude·Gemini와 동급 후보로 오른입니다. 둘째, 자체 LLM 라인을 가지지 못한 기업이 다양한 모델을 빠르게 비교 테스트할 수 있는 환경이 한 단계 더 풍부해집니다. Cloudflare AI Gateway·OpenRouter와 함께 "다중 LLM 라우터" 시장이 본격화되는 흐름입니다.`,
          officialUrl: "https://vercel.com/changelog/qwen-3-7-max-now-available-on-vercel-ai-gateway",
          source: "https://vercel.com/changelog/qwen-3-7-max-now-available-on-vercel-ai-gateway",
          tags: ["Vercel AI Gateway", "Qwen", "공식"],
          slug: "qwen-3-7-max-now-available-on-vercel-ai--ea436015",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/qwen-3-7-max-now-available-on-vercel-ai--ea436015.webp",
            alt: "Qwen 3.7 Max now available on Vercel AI Gateway",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Vercel Chat SDK 에 AI SDK Tools 통합 — 채팅 UI 와 에이전트 도구 표준 연결",
          summary: "Vercel이 AI 에이전트와 SDK 액션을 더 쉽게 연결할 수 있도록 chat/ai와 createChatTools(chat)을 추가했습니다.",
          content: `Vercel이 2026년 5월 20일 Chat SDK에 AI SDK tools 통합을 추가했습니다. \`chat/ai\` 헬퍼와 \`createChatTools(chat)\`로 채팅 UI와 에이전트 도구를 한 라인에서 연결할 수 있습니다.

- 신규 헬퍼: \`chat/ai\`, \`createChatTools(chat)\`
- 효과: 채팅 메시지에서 도구 호출·결과 표시·승인까지 표준 패턴화
- 호환: Vercel AI SDK + Next.js + Chat UI 표준
- 같은 주차 Grok Build 0.1, Qwen 3.7 Max 추가와 한 라인

### 에이전트 UI의 표준화

채팅 UI에 tool call·결과 카드·승인 버튼을 직접 만드는 건 보통 수백 줄 작업입니다. AI SDK tools가 표준 패턴을 제공하면 새 에이전트를 만들 때 UI 코드를 그대로 재사용할 수 있습니다.

한국 스타트업이 Next.js + Vercel 스택으로 에이전트 제품을 만든다면 즉시 가치가 있습니다. 도구 호출의 결과를 사용자가 시각적으로 확인하고 승인하는 UX는 신뢰성 있는 에이전트 제품의 기본 요건입니다. Vercel이 표준 패턴을 깔면 작은 팀도 큰 회사 수준의 UX를 빠르게 구현할 수 있습니다.`,
          officialUrl: "https://vercel.com/changelog/chat-sdk-now-includes-ai-sdk-tools",
          source: "https://vercel.com/changelog/chat-sdk-now-includes-ai-sdk-tools",
          tags: ["Vercel Chat SDK", "AI SDK", "공식"],
          slug: "chat-sdk-now-includes-ai-sdk-tools-fbff1453",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/chat-sdk-now-includes-ai-sdk-tools-fbff1453.png",
            alt: "Chat SDK now includes AI SDK tools",
          },
        },
        {
          date: "5/20",
          platform: "X+Threads",
          title: "Vercel AI Gateway 에 Grok Build 0.1 추가 — SuperGrok Heavy 구독 없이 호출 가능",
          summary: "Vercel이 xAI의 agentic 코딩 모델 Grok Build 0.1을 AI Gateway에 추가했습니다.",
          content: `Vercel이 2026년 5월 20일 AI Gateway에 xAI의 agentic 코딩 모델 Grok Build 0.1을 추가했습니다. SuperGrok Heavy 구독 없이도 Vercel 계정으로 Grok Build를 호출할 수 있는 경로가 열렸습니다.

- 모델: Grok Build 0.1 (agentic 코딩 라인)
- 채널: Vercel AI Gateway (단일 endpoint)
- 의미: SuperGrok Heavy ($300/월) 진입 장벽 없이 호출 가능
- 같은 주차 Qwen 3.7 Max 추가, Chat SDK with tools와 한 라인

### Vercel이 모델 사용성을 평준화하는 흐름

xAI Grok Build의 1차 진입 장벽은 SuperGrok Heavy 구독이었습니다. Vercel AI Gateway에 들어오면 토큰 단위 종량 과금이 가능해집니다. OpenAI·Anthropic·Google·Qwen과 같은 라인에 올라가는 효과로, Grok Build의 실제 사용자 풀이 한 단계 넓어집니다.

한국 개발자 입장에서 의미는 명확합니다. Grok Build의 병렬 sub-agent 강점을 직접 체험해 보기 위해 $300 구독을 결제하지 않아도 됩니다. Vercel AI Gateway 계정으로 적은 토큰부터 시작해서 Claude Code·Codex CLI와 직접 비교해 볼 수 있는 라인이 깔렸습니다.`,
          officialUrl: "https://vercel.com/changelog/grok-build-0-1-now-available-on-vercel-ai-gateway",
          source: "https://vercel.com/changelog/grok-build-0-1-now-available-on-vercel-ai-gateway",
          tags: ["Vercel AI Gateway", "xAI", "agentic coding", "공식"],
          slug: "grok-build-0-1-now-available-on-vercel-a-b7c5d45d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/grok-build-0-1-now-available-on-vercel-a-b7c5d45d.webp",
            alt: "Grok Build 0.1 now available on Vercel AI Gateway",
          },
        },
      ],
    },
    {
      name: "Krea",
      color: "#FF3B82",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Krea 2 LoRA Training 공개 — 소수 이미지로 스타일·캐릭터·오브젝트 학습",
          summary: "소수 이미지에서 스타일/캐릭터/오브젝트를 학습하는 LoRA를 Krea 2에 직접 학습·강도 조절·다중 LoRA 스택까지 지원.",
          content: `Krea가 2026년 5월 21일 Krea 2 본 모델 위에 LoRA training 기능을 풀었습니다. 소수 이미지(5~20장)에서 스타일·캐릭터·오브젝트를 학습한 뒤, 학습된 LoRA를 강도 조절 및 다중 스택까지 적용할 수 있습니다.

- 학습 입력: 5~20장 정도의 이미지
- 학습 대상: 스타일, 캐릭터, 오브젝트
- 적용 방식: 강도 슬라이더 + 여러 LoRA 동시 스택
- 사용 채널: Krea 2 웹·앱 안에서 직접

### 5/15~5/21 Krea 한 주의 마지막 조각

K2 Pro 우선 공개(5/15) → Cannes 데모(5/15) → 전체 공개(5/18) → deep dive 가이드(5/19) → LoRA training(5/21)으로 한 주 안에 다섯 단계가 다 풀렸습니다. LoRA가 마지막에 온 게 자연스럽다 — 본 모델이 충분히 안정화돼야 LoRA가 의미 있게 작동합니다.

한국 일러스트레이터·디자이너 입장에서 의미는 명확합니다. Midjourney·SD에서 LoRA를 따로 깔던 흐름이 Krea 한 곳에서 통합됩니다. 같은 스타일을 여러 작품에 일관되게 적용하거나, 자기 그림체를 학습시킨 뒤 다양한 컴포지션에 활용하는 작업이 한 도구 안에서 끝납니다.`,
          officialUrl: "https://www.krea.ai/release-notes/krea-2-lora-training-is-here",
          source: "https://www.krea.ai/release-notes/krea-2-lora-training-is-here",
          tags: ["Krea 2", "LoRA training", "multi-LoRA stacking", "공식"],
          slug: "krea-2-lora-training-is-here-17d6e9dc",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/krea-2-lora-training-is-here-17d6e9dc.webp",
            alt: "Krea 2 LoRA training is here",
          },
        },
        {
          date: "5/19",
          platform: "X+Threads",
          title: "Krea 2 Deep Dive 가이드 공개 — 스타일 레퍼런스·무드보드·프롬프트 사용법",
          summary: "Krea 2 스타일 레퍼런스·무드보드·프롬프트 사용법을 정리한 공식 가이드.",
          content: `Krea가 2026년 5월 19일 Krea 2 deep dive 가이드를 공개했습니다. 5/18 전체 공개 다음 날에 바로 사용 가이드를 풀어, 사용자가 모델의 차별점을 빠르게 체감하도록 설계했습니다.

- 다루는 내용: 스타일 레퍼런스, 무드보드, 프롬프트 사용법
- 핵심 메시지: "무엇(what)을 그릴지가 아니라 어떻게(how) 보일지를 통제"
- 동봉 예시: 일러스트·애니메이션·포토리얼 사이의 톤 전환
- 같은 주 흐름: K2 Pro(5/15) → Cannes 데모(5/15) → 전체 공개(5/18) → deep dive(5/19) → LoRA(5/21)

### 가이드 자체가 차별화 포인트

Midjourney·SD·FLUX 모두 모델 자체는 강하지만 "스타일 컨트롤" 가이드는 사용자가 직접 시행착오로 익히는 영역이었습니다. Krea가 가이드를 공식 풀어 둔 건 모델만큼 사용법이 차별화 자산이라는 판단입니다.

한국 디자이너 입장에서 deep dive를 먼저 본 다음 5~10번 실습하는 게 빠른 학습 경로입니다. 무드보드 입력은 기존 도구와 사고방식이 다르기 때문에 초반에 작은 프로젝트로 감을 잡고 본 작업에 적용하는 게 안전합니다.`,
          officialUrl: "https://www.krea.ai/release-notes/krea-2-deep-dive",
          source: "https://www.krea.ai/release-notes/krea-2-deep-dive",
          tags: ["Krea 2", "style references", "moodboard", "공식"],
          slug: "krea-2-deep-dive-91a631fa",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/krea-2-deep-dive-91a631fa.webp",
            alt: "Krea 2 deep dive",
          },
        },
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Krea 2, 전 사용자 공개 — 스타일 통제 중심 이미지 파운데이션 모델 + 한 주 무제한 프로모션",
          summary: "Krea가 2026년 5월 18일 Krea 2를 전체 사용자에게 공개했습니다. 5/15 K2 Pro 우선 공개 → 5/18 전체 공개 → 5/19 deep dive → 5/21 LoRA training까지 일주일 안에 풀린 스타일 제어 중심 이미지 파운데이션 모델. 한 주 동안 모든 가입자에게 무제한 Krea 2 생성을 제공.",
          content: `Krea가 2026년 5월 18일 자체 파운데이션 이미지 모델 Krea 2를 모든 사용자에게 공개했습니다. Krea가 처음부터 직접 학습한 첫 자체 모델로, 한 주간 무제한 생성 프로모션과 함께 풀렸습니다.

- 5/15: K2 Pro 우선 공개 (Pro 구독자)
- 5/15: Cannes Film Festival 미국관에서 실시간 데모
- 5/18: 전체 사용자 공개 + 한 주간 무제한 생성
- 5/19: deep dive 가이드 (스타일 레퍼런스·무드보드·프롬프트)
- 5/21: LoRA training 출시 — 소수 이미지에서 스타일·캐릭터·오브젝트 학습

### "how" 중심 모델이라는 차별화

Krea의 자체 표현이 핵심을 잡는다 — 대부분 이미지 모델은 무엇(what)을 그릴지 잘 알지만, Krea 2는 어떻게(how) 보일지에 집중합니다. 일러스트·애니메이션·포토리얼 사이의 톤 전환을 한 모델에서 처리하고, LoRA로 다시 사용자 스타일을 덧입힐 수 있습니다. Midjourney·SD·FLUX가 주도하던 시장에 "스타일 일관성"이라는 좁고 깊은 축으로 정면 진입한 그림입니다.

### 도구 시장의 전환과 한국 적용

같은 주차 Gemini Omni가 영상 분야에서 "0→1 생성보다 편집·일관성·통제"로 무게 중심을 옮겼습니다. 이미지·영상 양쪽에서 생성보다 통제·일관성이 차별화 축이 되는 흐름이 같이 잡힙니다.

한국 디자이너 입장에서 5/15~5/21 한 주는 Krea 2를 무료로 충분히 테스트할 수 있는 유일한 창이었습니다. 무제한 프로모션이 끝나면 평소 구독 라인으로 돌아가니, 한 주 안에 자기 스타일 LoRA 학습 + 본 작업 호환성 검증을 한 번에 마치는 게 합리적 사용 패턴입니다.

오픈소스 풍문(5/21 Reddit·X)은 Krea 공식 release notes에 없으니 풍문 단계로만 취급. LoRA training UX는 사용자 학습 곡선이 있어서 deep dive 가이드를 먼저 본 다음 시작하는 게 시행착오를 줄입니다.`,
          officialUrl: "https://www.krea.ai/release-notes/krea-2-is-live-for-everyone",
          source: "https://www.krea.ai/release-notes/krea-2-is-live-for-everyone",
          tags: ["Krea 2", "공식"],
          slug: "krea-2-is-live-for-everyone-b5dfeabe",
          readMinutes: 5,
          thumbnail: {
            src: "/og-cache/krea-2-is-live-for-everyone-b5dfeabe.webp",
            alt: "Krea 2 is live for everyone",
          },
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "Krea 2(K2), Pro 구독자에게 우선 공개",
          summary: "Krea 2가 Pro 가입자에게 공개됐습니다. 일러스트, 애니메이션, 포토리얼 사이의 스타일 통제가 핵심.",
          content: `Krea가 2026년 5월 15일 Krea 2(K2)를 Pro 구독자에게 우선 공개했습니다. 같은 날 Cannes Film Festival에서 실시간 데모도 진행됐습니다. 한 주 뒤 5/18 전체 공개의 첫 단계입니다.

- 우선 공개 대상: Krea Pro 구독자
- 핵심 차별점: 일러스트·애니메이션·포토리얼 사이 스타일 통제
- 이전 라인과의 관계: Krea가 직접 학습한 첫 자체 파운데이션 이미지 모델
- 후속 일정: 5/18 전체 공개 + 무제한 프로모션, 5/19 deep dive, 5/21 LoRA

### Pro 우선 공개의 의미

Pro 사용자에게 먼저 푸는 건 두 가지 신호입니다. 첫째, 모델이 일정 수준 안정화됐다는 자신감. 둘째, 헤비 사용자의 피드백으로 일반 공개 전에 사용성을 다듬는 마지막 단계.

한국 Pro 사용자는 한 주 동안 다른 사용자보다 먼저 모델을 만져 볼 수 있었던 셈입니다. 이미 Pro 구독을 잡은 디자이너라면 일반 공개·LoRA 출시 전 사이클을 한 번 다 돌려 본 상태로 5/21 LoRA를 받았을 가능성이 높습니다.`,
          officialUrl: "https://www.krea.ai/release-notes/k2-is-now-available-for-pro",
          source: "https://www.krea.ai/release-notes/k2-is-now-available-for-pro",
          tags: ["Krea 2", "image foundation model", "공식"],
          slug: "k2-is-now-available-for-pro-4a1a33b6",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/k2-is-now-available-for-pro-4a1a33b6.png",
            alt: "K2 is now available for Pro",
          },
        },
        {
          date: "5/15",
          platform: "X+Threads",
          title: "Krea, Cannes Film Festival 미국관에서 실시간 비주얼 생성 시연",
          summary: "Krea 공동창업자 Diego Rodriguez가 미국관에서 작곡가 Roahn Hylton과 함께 실시간 비주얼 생성 시연.",
          content: `Krea 공동창업자 Diego Rodriguez가 2026년 5월 15일 칸 영화제 미국관에서 작곡가 Roahn Hylton과 함께 Krea 2 실시간 비주얼 생성을 시연했습니다. 같은 날 K2 Pro 우선 공개와 같은 타이밍.

- 장소: Cannes Film Festival 미국관 (American Pavilion)
- 형식: 라이브 음악 + 실시간 이미지 생성 협업
- 참여자: Diego Rodriguez (Krea 공동창업자), Roahn Hylton (작곡가)
- 의미: 영화·음악 산업 대상 마케팅 + 실시간 생성 라이브 검증

### 영화제를 마케팅 채널로 쓰는 이유

이미지·영상 모델이 영화·음악 산업에 진입할 때, 데모 무대를 작품계 현장에 직접 박는 게 마케팅상 효율적입니다. Adobe·Runway·Midjourney 모두 영화제·음악 페스티벌에서 라이브 데모를 깔아 왔습니다. Krea가 같은 패턴을 따라간 셈.

한국 시장 직접 영향은 작지만, "이미지 모델 = 일러스트레이터 도구"가 아니라 "이미지 모델 = 영상·음악 콘텐츠 인프라"로 포지셔닝이 확장된다는 신호입니다. 국내 영상·게임 스튜디오의 컨셉 아트·스토리보드 라인이 영향을 받을 영역입니다.`,
          officialUrl: "https://www.krea.ai/release-notes/krea-at-cannes-film-festival",
          source: "https://www.krea.ai/release-notes/krea-at-cannes-film-festival",
          tags: ["Krea 2", "real-time generation", "film", "공식"],
          slug: "krea-at-cannes-film-festival-d09a5965",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/krea-at-cannes-film-festival-d09a5965.png",
            alt: "Krea at Cannes Film Festival",
          },
        },
      ],
    },
    {
      name: "Meta",
      color: "#0866FF",
      posts: [
        {
          date: "5/18",
          platform: "X+Threads",
          title: "Meta, AI 안경(Ray-Ban·Oakley)이 장애인 사용자에게 미치는 영향 정리 — 접근성 사례 모음",
          summary: "",
          content: `Meta가 2026년 5월 18일 AI 안경(Ray-Ban Meta·Oakley Meta) 라인이 시각·청각 장애인 사용자에게 미치는 영향을 정리해 발표했습니다. 단순 마케팅이 아니라 실제 사용자 인터뷰와 도입 시나리오를 묶은 사례 모음.

- 시각 장애: 안경이 주변 환경을 음성으로 설명, 텍스트 읽어주기, 사물 식별
- 청각 장애: 라이브 자막, 화자 위치 표시
- 사용 흐름: 사용자가 명시적 명령 없이도 백그라운드에서 동작
- 같은 흐름: Google Beam(그룹 회의), Apple AirPods 라이브 번역

### "접근성"이 wearable의 진짜 시장

AI 안경 시장은 일반 소비자보다 접근성 사용자에게 먼저 자리 잡는 패턴이 굳어집니다. 일반 소비자에겐 "있으면 좋은" 기능이 장애인 사용자에겐 "필수 보조 도구"가 되기 때문에, 가격·하드웨어 무게의 진입 장벽을 넘어선입니다.

한국에서는 보조 공학 보험·정부 지원 라인과 연결되는지가 도입 속도의 가장 큰 변수입니다. 한국은행·복지부의 보조기기 지원 품목에 AI 안경이 포함되면 시장 자체가 한 번에 확대됩니다. 메타가 다음 단계로 풀 정책 라인을 따라가 봐야 할 영역입니다.`,
          officialUrl: "https://about.fb.com/news/2026/05/meta-ai-wearables-changing-the-game-for-disabled-people/",
          source: "https://about.fb.com/news/2026/05/meta-ai-wearables-changing-the-game-for-disabled-people/",
          tags: ["Meta AI wearables", "AI glasses", "accessibility", "공식"],
          slug: "our-ai-wearables-are-changing-the-game-f-e1466393",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/our-ai-wearables-are-changing-the-game-f-e1466393.jpg",
            alt: "Our AI Wearables Are Changing the Game for Disabled People",
          },
        },
      ],
    },
    {
      name: "Hugging Face / 모델",
      color: "#FFD21E",
      posts: [
        {
          date: "5/18",
          platform: "X+Threads",
          title: "IBM Research, Open Agent Leaderboard 공개 — Hugging Face 기반 에이전트 표준 평가",
          summary: "IBM Research가 Hugging Face 블로그에서 에이전트 평가용 Open Agent Leaderboard를 공개했습니다.",
          content: `IBM Research가 2026년 5월 18일 Hugging Face 블로그에 Open Agent Leaderboard를 공개했습니다. 다양한 LLM 에이전트를 표준 태스크에서 비교 평가하는 공개 리더보드.

- 평가 단위: 에이전트 (단일 LLM이 아닌 도구 호출·다단계 작업)
- 운영: IBM Research + Hugging Face
- 공개 정책: 누구나 모델·에이전트를 등록·평가 가능
- 같은 주차 NVIDIA Mastering Agentic Evaluation, OpenAI Cookbook macro evals와 같은 결

### 에이전트 평가의 표준화 흐름

LLM 자체는 MMLU·HumanEval 같은 표준 벤치마크가 있지만, 에이전트는 표준이 없습니다. tool call, 다단계 실행, 외부 시스템 호환을 어떻게 점수화하느냐는 회사마다 달랐입니다. Open Agent Leaderboard가 첫 공개 라인으로 자리 잡으면, 에이전트 마케팅 주장(SWE-Bench X%)을 같은 잣대로 비교할 수 있습니다.

한국 모델 개발팀(KAIST·서울대·LG AI Research·Upstage 등)에게 의미는 두 가지입니다. 자체 에이전트를 공개 리더보드에 등록해서 시장에 검증된 점수를 확보할 수 있고, 평가 데이터셋 자체를 표준 학습 자원으로 활용할 수 있습니다.`,
          officialUrl: "https://huggingface.co/blog/ibm-research/open-agent-leaderboard",
          source: "https://huggingface.co/blog/ibm-research/open-agent-leaderboard",
          tags: ["agent evaluation", "leaderboard", "공식"],
          slug: "the-open-agent-leaderboard-4aacdb26",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/the-open-agent-leaderboard-4aacdb26.webp",
            alt: "The Open Agent Leaderboard",
          },
        },
      ],
    },
    {
      name: "오픈소스 / 도구",
      color: "#6B7280",
      posts: [
        {
          date: "5/21",
          platform: "X+Threads",
          title: "Nutlope/hallmark — anti-AI-slop 디자인 가이드를 코드 스킬로 패키지화한 오픈소스. 사용자가 찾던 '오픈소스 공유할 만한' 후보.",
          summary: "anti-AI-slop 디자인 가이드를 코드 스킬로 패키지화한 오픈소스. 사용자가 찾던 '오픈소스 공유할 만한' 후보.",
          content: `Hassan El Mghari(Nutlope)가 2026년 5월 21일 anti-AI-slop 디자인 가이드를 Claude Code skill로 패키지화한 오픈소스 hallmark을 공개했습니다. Together AI 후원, MIT 라이선스. 25개 anti-pattern + 65-gate slop-test + 구조 다양성 룰을 명세화한 27개 reference 파일을 포함.

- 라이선스: MIT (자유 사용·수정·재배포)
- 형식: Claude Code Skill — \`/hallmark\`로 호출
- 동작 모드 4종: 새 UI 생성, audit(점수화), redesign(시각만 교체), study(URL/스크린샷에서 design.md 추출)
- 거절 기본값: generic SaaS hero → 3-feature → CTA → footer 같은 LLM 학습된 on-distribution 디자인 거절

### 왜 지금 anti-slop 룰셋이 필요한가

ChatGPT·Claude·Cursor가 만들어 내는 UI가 점점 비슷해지는 게 업계의 공통 진단입니다. 모델이 학습 데이터의 평균값을 따라가니, 결과물이 다 비슷한 그라데이션·glassmorphism·SaaS 템플릿으로 수렴합니다. hallmark은 이 평균값을 강제로 깨는 65개 게이트를 통과시켜야 결과를 emit합니다.

### 한국 디자이너·개발자의 적용

별도 Together AI 가입 없이 Claude Code 사용자라면 즉시 \`~/.claude/skills/hallmark/\`로 클론해서 쓸 수 있습니다. 사내 디자인 가이드와 결합하면 더 효과적이다 — DESIGN.md 라이브러리(getdesign.md 73개 브랜드)와 같이 사용하면 hallmark 룰 + 브랜드 톤이 같이 적용됩니다. 풀스택 인디 개발자·1인 디자이너에게 즉시 가치를 주는 첫 오픈소스 스킬입니다.`,
          officialUrl: "https://github.com/Nutlope/hallmark",
          source: "https://github.com/Nutlope/hallmark",
          tags: ["오픈소스 공유 후보", "공식"],
          slug: "nutlope-hallmark-anti-ai-slop-design-guide-4fabea9d",
          readMinutes: 1,
          thumbnail: {
            src: "/og-cache/nutlope-hallmark-anti-ai-slop-design-guide-4fabea9d.jpg",
            alt: "Nutlope/hallmark — anti-AI-slop 디자인 가이드를 코드 스킬로 패키지화한 오픈소스. 사용자가 찾던 '오픈소스 공유할 만한' 후보.",
          },
        },
        {
          date: "5/21",
          platform: "X+Threads",
          title: "YC Diana Hu — AI-native company 구성 방식",
          summary: "YC 파트너 관점에서 AI-native 회사가 갖춰야 할 구조.",
          content: `Y Combinator 파트너 Diana Hu가 2026년 5월 21일 자체 YouTube 채널에 AI-native 회사가 갖춰야 할 조직·제품·데이터 구조에 대한 영상을 공개했습니다. YC가 그동안 투자한 AI 스타트업 수백 개에서 추출한 패턴을 정리.

- 채널: YC 공식
- 길이: 단편 강의 (수십 분 단위)
- 다루는 주제: AI-native 회사의 조직 구조, 제품 사이클, 데이터 자산, 평가·관측 라인
- 같은 흐름: a16z·Sequoia·Bessemer의 AI investor 가이드

### YC 시각이 한국 스타트업에 의미를 가지는 이유

YC는 SaaS 시대(2010~2020년대) "5인 + AWS + Stripe" 표준을 만든 곳입니다. AI-native 시대의 표준 조직 구조는 YC가 다시 정의할 가능성이 높습니다. 기존 SaaS와의 결정적 차이는 "엔지니어 인력 비중"이 아니라 "데이터 자산 + 평가 라인 + 비결정성 관리"가 회사의 1차 자산이라는 점.

한국 시드·시리즈 A 라운드 회사에 적용할 첫 단계는 두 가지입니다. 첫째, 인사 구조에서 ML 엔지니어와 product engineer의 경계를 모호하게 둘 것. 둘째, eval·observability를 day 1부터 박을 것. Diana Hu 영상이 둘 다 강조하는 핵심 메시지입니다.`,
          officialUrl: "https://www.youtube.com/watch?v=EN7frwQIbKc",
          source: "https://www.youtube.com/watch?v=EN7frwQIbKc",
          tags: ["실전 팁", "공식"],
          slug: "yc-diana-hu-ai-native-company-structure-85b5079d",
          readMinutes: 1,
        },
      ],
    },
  ],
};
