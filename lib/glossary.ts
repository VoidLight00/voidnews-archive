// 비개발자 친화 한국어 AI/CS 용어 사전
// 본문에 등장하는 영문 용어를 자동 매칭해 PostDetail 하단 Glossary 섹션에 박는다.
// AI가 본문을 새로 쓰지 않고 공식 영문 발췌를 그대로 인용하므로 환각 0.

export interface GlossaryEntry {
  term: string;          // 사전 표제어 (영문 또는 약어)
  alias?: string[];      // 동의어/변형 (예: ["LLMs"])
  ko: string;            // 한국어 명칭/풀이
  description: string;   // 비개발자 한 문장 설명
  category:
    | "model"
    | "agent"
    | "infra"
    | "interface"
    | "security"
    | "process"
    | "ml"
    | "web"
    | "developer";
}

const GLOSSARY: GlossaryEntry[] = [
  // ── 모델 / 모델 패밀리 ──────────────────────────────
  { term: "LLM", alias: ["LLMs", "large language model"], ko: "거대 언어 모델", description: "방대한 텍스트로 학습된 AI 모델. ChatGPT·Claude·Gemini 같은 챗봇의 두뇌.", category: "model" },
  { term: "GPT-5.5", ko: "GPT-5.5", description: "OpenAI의 차세대 대형 모델. ChatGPT 기본 응답 모델.", category: "model" },
  { term: "Claude", ko: "Claude", description: "Anthropic이 만든 AI 모델. Sonnet / Opus / Haiku 라인업.", category: "model" },
  { term: "Gemini", ko: "Gemini", description: "Google DeepMind의 멀티모달 AI 모델 패밀리.", category: "model" },
  { term: "Grok", ko: "Grok", description: "xAI(일론 머스크)의 AI 모델. 실시간 X 검색 통합.", category: "model" },
  { term: "Qwen", ko: "Qwen", description: "알리바바의 오픈 LLM 패밀리.", category: "model" },
  { term: "Nemotron", ko: "Nemotron", description: "NVIDIA의 LLM 패밀리 (Nano/Ultra/Omni 등).", category: "model" },
  { term: "Llama", ko: "Llama", description: "Meta의 오픈 LLM 패밀리.", category: "model" },
  { term: "diffusion model", ko: "디퓨전 모델", description: "노이즈에서 점차 이미지/텍스트를 만들어내는 생성 방식.", category: "model" },
  { term: "multimodal", ko: "멀티모달", description: "텍스트·이미지·음성·영상 등 여러 입력을 한 번에 처리하는 모델.", category: "model" },
  { term: "Omni", ko: "Omni 모드", description: "한 모델이 텍스트+이미지+음성+영상을 동시에 다루는 형태.", category: "model" },
  { term: "embedding", alias: ["embeddings"], ko: "임베딩", description: "단어·문장·이미지를 컴퓨터가 비교 가능한 벡터(숫자 묶음)로 바꾼 것.", category: "ml" },
  { term: "reranker", ko: "리랭커", description: "검색 결과 후보를 다시 정렬해 정답에 가장 가까운 것을 위로 올리는 모델.", category: "ml" },

  // ── 에이전트 ──────────────────────────────────────
  { term: "agent", alias: ["agents", "agentic"], ko: "에이전트", description: "사람 대신 목표를 받고 여러 단계를 스스로 수행하는 AI.", category: "agent" },
  { term: "sub-agent", alias: ["subagent", "sub-agents"], ko: "서브 에이전트", description: "큰 작업을 잘게 쪼개 동시 처리하는 작은 에이전트.", category: "agent" },
  { term: "Managed Agents", ko: "매니지드 에이전트", description: "공급사가 보안·실행 환경까지 책임지는 관리형 에이전트 서비스.", category: "agent" },
  { term: "agent skill", alias: ["agent skills"], ko: "에이전트 스킬", description: "에이전트가 호출할 수 있도록 정의된 단위 작업/기능 모음.", category: "agent" },
  { term: "Plan Mode", ko: "플랜 모드", description: "에이전트가 실행 전에 계획을 먼저 제시하고 사용자 승인을 받는 안전 장치.", category: "agent" },
  { term: "Goal mode", alias: ["/goal"], ko: "Goal 모드", description: "완료 조건을 정해두면 에이전트가 그 조건을 만족할 때까지 자율로 반복하는 모드.", category: "agent" },
  { term: "Codex", ko: "Codex", description: "OpenAI의 코딩 에이전트 (CLI · ChatGPT 앱 · IDE 통합).", category: "agent" },
  { term: "Claude Code", ko: "Claude Code", description: "Anthropic의 터미널·IDE 기반 코딩 에이전트.", category: "agent" },
  { term: "Cursor", ko: "Cursor", description: "AI 코드 에디터. Composer/Agent 기능 내장.", category: "agent" },
  { term: "Antigravity", ko: "Antigravity", description: "Google의 코딩 에이전트 플랫폼/CLI.", category: "agent" },
  { term: "Agent View", ko: "Agent View", description: "병렬 에이전트 세션을 한 화면에서 관리하는 대시보드.", category: "agent" },

  // ── 인터페이스 / 도구 ────────────────────────────
  { term: "CLI", ko: "CLI (커맨드라인 도구)", description: "터미널에서 명령어로 사용하는 프로그램.", category: "interface" },
  { term: "TUI", ko: "TUI (터미널 UI)", description: "터미널 안에서 마우스·창·단축키로 조작하는 풀스크린 인터페이스.", category: "interface" },
  { term: "REPL", ko: "REPL", description: "코드를 한 줄씩 입력하고 즉시 결과를 보는 대화형 실행 환경.", category: "interface" },
  { term: "IDE", ko: "IDE (통합 개발 환경)", description: "코드 작성·실행·디버깅을 한곳에서 하는 프로그램 (VS Code, JetBrains 등).", category: "interface" },
  { term: "Vim", alias: ["Vim-like"], ko: "Vim 단축키", description: "텍스트 편집기 Vim 스타일의 키 조작 방식.", category: "interface" },

  // ── 인프라 / 컴퓨트 ────────────────────────────────
  { term: "GPU", ko: "GPU", description: "AI 모델 학습·추론에 사용하는 고성능 그래픽 칩.", category: "infra" },
  { term: "TPU", ko: "TPU", description: "Google이 만든 AI 전용 칩 (Tensor Processing Unit).", category: "infra" },
  { term: "Vera CPU", ko: "Vera CPU", description: "NVIDIA의 에이전트 워크로드용 CPU.", category: "infra" },
  { term: "Blackwell", ko: "Blackwell", description: "NVIDIA의 데이터센터급 GPU 세대.", category: "infra" },
  { term: "AI factory", alias: ["AI factories"], ko: "AI 팩토리", description: "AI 모델 추론을 대규모로 돌리는 데이터센터 단위.", category: "infra" },
  { term: "data center", alias: ["datacenter"], ko: "데이터센터", description: "수많은 서버·GPU가 모여 있는 대형 시설.", category: "infra" },
  { term: "AWS Bedrock", ko: "AWS Bedrock", description: "Amazon이 운영하는 멀티 모델 AI 호스팅 플랫폼.", category: "infra" },
  { term: "KV cache", ko: "KV 캐시", description: "긴 대화에서 이전 토큰들을 빠르게 다시 참조하기 위한 메모리.", category: "infra" },
  { term: "inference", ko: "추론", description: "이미 학습된 모델이 입력을 받아 답을 만드는 단계.", category: "infra" },
  { term: "quantization", ko: "양자화 / 압축", description: "모델 가중치를 더 작은 비트로 줄여 빠르고 가볍게 만드는 기술.", category: "infra" },
  { term: "context window", ko: "컨텍스트 윈도우", description: "모델이 한 번에 기억할 수 있는 텍스트 길이 (토큰 수).", category: "infra" },
  { term: "token", alias: ["tokens"], ko: "토큰", description: "모델이 텍스트를 다룰 때 쓰는 최소 단위 (단어 조각).", category: "infra" },

  // ── 학습 / 파인튜닝 ────────────────────────────────
  { term: "RLHF", ko: "RLHF (사람 피드백 강화학습)", description: "사람이 더 좋다고 평가한 답을 모델이 학습하게 만드는 방법.", category: "ml" },
  { term: "RL", alias: ["reinforcement learning"], ko: "강화학습", description: "보상을 받아가며 행동을 점점 개선하는 학습 방식.", category: "ml" },
  { term: "SFT", ko: "SFT (지도 학습 미세조정)", description: "정답이 정해진 예시로 모델을 추가 학습시키는 방법.", category: "ml" },
  { term: "fine-tuning", alias: ["finetuning"], ko: "파인튜닝", description: "기본 모델을 특정 용도로 추가 학습시키는 작업.", category: "ml" },
  { term: "LoRA", ko: "LoRA", description: "큰 모델을 통째로 다시 학습하지 않고 일부만 가볍게 튜닝하는 기법.", category: "ml" },
  { term: "RAG", ko: "RAG (검색 증강 생성)", description: "외부 문서를 먼저 검색해 그 내용을 바탕으로 답을 생성하는 방식.", category: "ml" },
  { term: "prompt", ko: "프롬프트", description: "AI에게 주는 지시문/질문 입력.", category: "ml" },
  { term: "benchmark", ko: "벤치마크", description: "모델 성능을 객관적으로 비교하기 위한 표준 시험 문제 모음.", category: "ml" },
  { term: "SWE-Bench", ko: "SWE-Bench", description: "실제 GitHub 이슈를 해결하는 능력으로 코딩 AI를 측정하는 벤치마크.", category: "ml" },
  { term: "hallucination", ko: "환각", description: "AI가 사실이 아닌 내용을 그럴듯하게 만들어내는 현상.", category: "ml" },

  // ── 보안 ──────────────────────────────────────────
  { term: "CVD", ko: "CVD (조율된 취약점 공개)", description: "보안 취약점을 발견자와 제조사가 협의해 안전한 시점에 공개하는 절차.", category: "security" },
  { term: "vulnerability", alias: ["vulnerabilities"], ko: "취약점", description: "공격에 악용될 수 있는 소프트웨어의 약점.", category: "security" },
  { term: "Project Glasswing", ko: "Project Glasswing", description: "Anthropic이 운영하는 보안 협력 파트너 네트워크.", category: "security" },
  { term: "HIPAA", ko: "HIPAA", description: "미국 의료 데이터 보호 법규.", category: "security" },
  { term: "SOC 2", ko: "SOC 2", description: "기업 시스템의 보안·가용성을 검증하는 감사 기준.", category: "security" },

  // ── 프로세스 / 운영 ────────────────────────────────
  { term: "GA", alias: ["generally available"], ko: "정식 출시 (GA)", description: "베타가 끝나고 모든 사용자에게 공식 제공되는 상태.", category: "process" },
  { term: "beta", alias: ["early beta", "research preview"], ko: "베타 / 초기 공개", description: "정식 출시 전 일부 사용자에게 먼저 제공해 검증하는 단계.", category: "process" },
  { term: "preview", ko: "프리뷰", description: "정식 발표 전 일부 기능을 미리 보여주는 단계.", category: "process" },
  { term: "deprecated", ko: "단계 폐기 (Deprecated)", description: "곧 지원이 끊길 예정인 기능/모델.", category: "process" },
  { term: "rollout", ko: "롤아웃", description: "기능을 단계적으로 풀어 사용자에게 배포하는 과정.", category: "process" },
  { term: "changelog", alias: ["release notes"], ko: "변경 기록 / 릴리스 노트", description: "버전마다 무엇이 추가·수정됐는지 정리한 공식 문서.", category: "process" },

  // ── 개발자 도구 ────────────────────────────────────
  { term: "SDK", ko: "SDK", description: "특정 서비스를 개발자가 쉽게 쓰도록 모아놓은 라이브러리.", category: "developer" },
  { term: "API", ko: "API", description: "프로그램끼리 정보를 주고받기 위한 약속된 통신 방식.", category: "developer" },
  { term: "MCP", alias: ["Model Context Protocol"], ko: "MCP (모델 컨텍스트 프로토콜)", description: "AI 에이전트가 외부 도구·데이터를 일관되게 연결하기 위한 표준.", category: "developer" },
  { term: "Hooks", ko: "Hooks", description: "특정 이벤트가 발생할 때 자동으로 실행되는 사용자 정의 스크립트.", category: "developer" },
  { term: "Remote SSH", ko: "Remote SSH", description: "원격 서버에 안전하게 접속해 명령을 실행하는 표준 프로토콜.", category: "developer" },
  { term: "monorepo", ko: "모노레포", description: "여러 프로젝트를 하나의 거대한 저장소에서 함께 관리하는 방식.", category: "developer" },
  { term: "refactoring", ko: "리팩토링", description: "동작은 그대로 두고 코드 구조만 깔끔하게 다시 정리하는 작업.", category: "developer" },
  { term: "CI", alias: ["continuous integration"], ko: "CI (지속 통합)", description: "코드 변경마다 자동으로 빌드/테스트를 돌리는 시스템.", category: "developer" },
  { term: "GitHub Actions", ko: "GitHub Actions", description: "GitHub 위에서 자동 빌드·테스트·배포 워크플로우를 돌리는 CI 서비스.", category: "developer" },
  { term: "Stainless", ko: "Stainless", description: "API에서 SDK를 자동 생성해주는 도구 회사 (Anthropic 인수).", category: "developer" },

  // ── 웹 / 인프라 ────────────────────────────────────
  { term: "OG image", alias: ["og:image"], ko: "OG 이미지", description: "링크 공유 시 미리보기로 뜨는 카드 이미지.", category: "web" },
  { term: "SSG", alias: ["static site generation"], ko: "SSG (정적 사이트 생성)", description: "빌드 시점에 모든 페이지를 미리 만들어두는 방식.", category: "web" },
  { term: "SSR", ko: "SSR (서버 렌더링)", description: "요청이 올 때마다 서버에서 페이지를 만들어 보내는 방식.", category: "web" },
  { term: "ISR", ko: "ISR (증분 정적 재생성)", description: "정적 페이지를 일정 주기로 백그라운드 재생성하는 방식.", category: "web" },
  { term: "Vercel", ko: "Vercel", description: "Next.js를 만든 회사의 클라우드 배포 플랫폼.", category: "web" },
];

// 본문에서 등장하는 용어 자동 매칭 (case-insensitive, 단어 경계)
export function extractGlossaryHits(text: string): GlossaryEntry[] {
  if (!text) return [];
  const found = new Set<string>();
  const hits: GlossaryEntry[] = [];
  const haystack = text;
  for (const entry of GLOSSARY) {
    const variants = [entry.term, ...(entry.alias ?? [])];
    let matched = false;
    for (const v of variants) {
      // 한글이 섞이지 않은 영문 용어만 단어 경계 사용, 한글/특수문자는 단순 포함 검사
      const isAscii = /^[\x20-\x7E]+$/.test(v);
      let re: RegExp;
      if (isAscii) {
        const escaped = v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        re = new RegExp(`(?:^|[^A-Za-z0-9_])${escaped}(?:$|[^A-Za-z0-9_])`, "i");
      } else {
        re = new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      }
      if (re.test(haystack)) {
        matched = true;
        break;
      }
    }
    if (matched && !found.has(entry.term)) {
      found.add(entry.term);
      hits.push(entry);
    }
  }
  return hits;
}
