import type { WeeklyData } from "../data";

// 2026-w28 (7/2 ~ 7/8)
// 자동 생성: AB workspace 검증/랭킹 산출물을 사이트 주간 데이터로 반영.

export const week28: WeeklyData = {
  "week": 28,
  "year": 2026,
  "slug": "2026-w28",
  "period": "7/2 ~ 7/8",
  "totalPosts": 8,
  "companies": [
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "7/8",
          "platform": "X+Threads",
          "title": "OpenAI, GPT-5.6 Sol·Terra·Luna 7월 9일 전체 공개(GA)",
          "featured": true,
          "deck": "6/26 프리뷰(약 20개 조직)→미 정부 검토 통과, 7/9 목요일 일반 공개",
          "summary": "OpenAI가 GPT-5.6 Sol·Terra·Luna 세 모델을 7월 9일(목) 전 사용자에게 공개한다. 6월 26일 프리뷰 당시 미 정부 안전성 검토로 약 20개 신뢰 조직에만 제한 공개됐으나, 상무부 CAISI의 추가 테스트를 통과해 일반 공개가 승인됐다. Sol=복잡 추론·에이전트 플래그십, Terra=GPT-5.5급 성능 절반 비용, Luna=최경량·최저비용.",
          "content": "**이게 뭐예요?**\nOpenAI가 GPT-5.6 Sol·Terra·Luna 세 모델을 7월 9일(목) 전 사용자에게 공개한다.\n\n**무엇이 달라졌나?**\n- 6월 26일 프리뷰 당시 미 정부 안전성 검토로 약 20개 신뢰 조직에만 제한 공개\n- 상무부 CAISI의 추가 테스트를 통과해 일반 공개 승인\n- Sol=복잡 추론·에이전트 플래그십, Terra=GPT-5.5급 성능 절반 비용, Luna=최경량·최저비용\n\n**어떻게 읽을까?**\n최상위 모델이 정부 검토라는 관문을 거쳐 일반 공개로 풀리는 사건이다. 6/26 프리뷰에서 7/9 전체 공개까지의 흐름은 프런티어 모델 출시가 안전성 심사와 엮이는 새 패턴을 보여 준다.\n\n**확인 포인트**\n- 공개일: 7월 9일(목)\n- 라인업: Sol / Terra / Luna\n\n출처: openai.com",
          "source": "https://openai.com/index/previewing-gpt-5-6-sol/",
          "officialUrl": "https://openai.com/index/previewing-gpt-5-6-sol/",
          "slug": "openai-20260708-gpt-5-6-ga-jul9",
          "tags": [
            "OpenAI",
            "프런티어 모델",
            "정책"
          ],
          "backupUrls": [
            {
              "label": "Engadget",
              "url": "https://www.engadget.com/2210308/openai-rolls-out-gpt5-6-july-9/"
            }
          ]
        }
      ]
    },
    {
      "name": "Anthropic",
      "color": "#E87040",
      "posts": [
        {
          "date": "7/2",
          "platform": "X+Threads",
          "title": "Anthropic, Fable 5 사이버 안전장치와 'Cyber Jailbreak Severity' 프레임워크 공개",
          "featured": true,
          "deck": "탈옥 심각도를 등급화한 CJS 프레임워크와 Fable 5 사이버 방어책",
          "summary": "Anthropic이 Fable 5의 사이버 안전장치와 'Cyber Jailbreak Severity(CJS)' 프레임워크를 상세 공개했다. 탈옥 시도의 심각도를 등급화하는 접근으로, 특정 공격 기법은 99% 이상 차단된다고 밝혔다.",
          "content": "**이게 뭐예요?**\nAnthropic이 Fable 5의 사이버 안전장치와 'Cyber Jailbreak Severity(CJS)' 프레임워크를 상세 공개했다.\n\n**무엇이 달라졌나?**\n- 탈옥(jailbreak) 시도의 심각도를 등급화하는 접근\n- 특정 공격 기법은 99% 이상 차단된다고 밝힘\n\n**어떻게 읽을까?**\n수출통제 해제·복원에 이은 후속으로, 최상위 모델을 '안전하게' 되돌리기 위한 방어 프레임워크다. 모델 접근 재개와 안전장치가 한 묶음으로 움직인다.\n\n**확인 포인트**\n- 프레임워크: Cyber Jailbreak Severity(CJS)\n- 방어: 특정 기법 99% 이상 차단(공식)\n\n출처: anthropic.com",
          "source": "https://www.anthropic.com/news/fable-safeguards-jailbreak-framework",
          "officialUrl": "https://www.anthropic.com/news/fable-safeguards-jailbreak-framework",
          "slug": "anthropic-20260702-fable-5-cyber-safeguards-jailbreak-framework",
          "tags": [
            "Anthropic",
            "AI 안전",
            "연구/정책"
          ],
          "backupUrls": [
            {
              "label": "HackerOne 프로그램",
              "url": "https://hackerone.com/anthropic-cyber-jailbreak/"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/anthropic-fable-5-사이버-안전장치와-cyber-jailbr-05a4aa29.png",
            "alt": "Anthropic, Fable 5 사이버 안전장치와 'Cyber Jailbreak Severity' 프레임워크 공개"
          },
        },
        {
          "date": "7/2",
          "platform": "X+Threads",
          "title": "Claude Code 2.1.199 — 스택형 스킬 지원, 서브에이전트 오류 전파 수정",
          "featured": false,
          "deck": "스택형 스킬과 서브에이전트 오류 전파 버그를 잡은 안정화 릴리스",
          "summary": "Claude Code 2.1.199가 공개됐다. 스택형(stacked) 스킬을 지원하고 서브에이전트 오류 전파 관련 버그를 수정한 안정화 릴리스다.",
          "content": "**이게 뭐예요?**\nClaude Code 2.1.199가 공개됐다.\n\n**무엇이 달라졌나?**\n- 스택형(stacked) 스킬 지원\n- 서브에이전트 오류 전파 관련 버그 수정\n\n**어떻게 읽을까?**\n스킬을 겹쳐 쓰는 구성을 지원하고 안정성을 손본 릴리스다.\n\n**확인 포인트**\n- 버전: 2.1.199 (7/2)\n\n출처: github.com",
          "source": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
          "officialUrl": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
          "slug": "claude-code-20260702-2-1-199",
          "tags": [
            "Anthropic",
            "개발도구"
          ],
          "backupUrls": [
            {
              "label": "GitHub raw",
              "url": "https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/claude-code-2-1-193-셸-자동-분류-모드-otel-어시스턴-f6d9c0cc.png",
            "alt": "Claude Code 2.1.199 — 스택형 스킬 지원, 서브에이전트 오류 전파 수정"
          },
        },
        {
          "date": "7/3",
          "platform": "X+Threads",
          "title": "Claude Code 2.1.200 — 기본 권한 모드 Manual 전환, AskUserQuestion 자동진행 해제",
          "featured": false,
          "deck": "권한 기본값 Manual 전환, 질문 다이얼로그 자동진행 off",
          "summary": "Claude Code 2.1.200이 공개됐다. CLI·VS Code·JetBrains 전반에서 'default' 권한 모드를 'Manual'로 바꿨고, AskUserQuestion 다이얼로그가 기본으로 자동 진행하지 않도록 변경했다(/config로 idle timeout opt-in). 백그라운드 세션·에이전트 데몬의 다수 버그(stale daemon.lock·핸드오버·roster 손상 등)도 수정됐다.",
          "content": "**이게 뭐예요?**\nClaude Code 2.1.200이 공개됐다. CLI·VS Code·JetBrains 전반에서 기본 권한 모드를 'Manual'로 바꿨다.\n\n**무엇이 달라졌나?**\n- 'default' 권한 모드 → 'Manual' 전환\n- AskUserQuestion 다이얼로그가 기본으로 자동 진행하지 않음(/config로 idle timeout opt-in)\n- 백그라운드 세션·에이전트 데몬의 다수 버그 수정(stale daemon.lock·핸드오버·roster 손상 등)\n\n**어떻게 읽을까?**\n에이전트가 사람 확인 없이 진행하던 기본값을 보수적으로 되돌린 거버넌스 업데이트다. 권한을 사람이 다시 쥐는 방향이다.\n\n**확인 포인트**\n- 기본값: 권한 모드 Manual\n- 질문 다이얼로그: 자동 진행 off(기본)\n\n출처: github.com",
          "source": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
          "officialUrl": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
          "slug": "claude-code-20260703-2-1-200",
          "tags": [
            "Anthropic",
            "개발도구",
            "거버넌스"
          ],
          "backupUrls": [
            {
              "label": "GitHub raw (2.1.200 verbatim)",
              "url": "https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/claude-code-2-1-193-셸-자동-분류-모드-otel-어시스턴-f6d9c0cc.png",
            "alt": "Claude Code 2.1.200 — 기본 권한 모드 Manual 전환, AskUserQuestion 자동진행 해제"
          },
        },
        {
          "date": "7/3",
          "platform": "X+Threads",
          "title": "Claude Code 2.1.201 — Sonnet 5 세션 하네스 리마인더 system role 제거",
          "featured": false,
          "deck": "Sonnet 5 세션의 하네스 리마인더 system role 제거",
          "summary": "Claude Code 2.1.201이 공개됐다. Claude Sonnet 5 세션이 하네스 리마인더에 더 이상 대화 중간 system role을 쓰지 않도록 수정한 소규모 안정성 패치다.",
          "content": "**이게 뭐예요?**\nClaude Code 2.1.201이 공개됐다.\n\n**무엇이 달라졌나?**\n- Claude Sonnet 5 세션이 하네스 리마인더에 더 이상 대화 중간 system role을 쓰지 않도록 수정\n\n**어떻게 읽을까?**\n소규모 안정성 패치다.\n\n**확인 포인트**\n- 버전: 2.1.201 (7/3)\n\n출처: github.com",
          "source": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
          "officialUrl": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
          "slug": "claude-code-20260703-2-1-201",
          "tags": [
            "Anthropic",
            "개발도구"
          ],
          "backupUrls": [
            {
              "label": "GitHub raw (2.1.201 verbatim)",
              "url": "https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/claude-code-2-1-193-셸-자동-분류-모드-otel-어시스턴-f6d9c0cc.png",
            "alt": "Claude Code 2.1.201 — Sonnet 5 세션 하네스 리마인더 system role 제거"
          },
        }
      ]
    },
    {
      "name": "Google",
      "color": "#4285F4",
      "posts": [
        {
          "date": "7/2",
          "platform": "X+Threads",
          "title": "Google NotebookLM, 틱톡형 숏폼 비디오 생성 기능 추가",
          "featured": false,
          "deck": "NotebookLM이 소스 자료를 틱톡 스타일 숏폼 영상으로 변환",
          "summary": "Google NotebookLM에 틱톡 스타일 숏폼 비디오 생성 기능이 추가된 것으로 보도됐다. 업로드한 소스 자료를 짧은 영상 형식으로 변환한다. 공식 블로그의 정확한 게시 URL은 아직 확정되지 않아 The Decoder 2차 보도가 근거다.",
          "content": "**이게 뭐예요?**\nGoogle NotebookLM에 틱톡 스타일 숏폼 비디오 생성 기능이 추가된 것으로 보도됐다.\n\n**무엇이 달라졌나?**\n- 업로드한 소스 자료를 짧은 영상 형식으로 변환\n\n**어떻게 읽을까?**\n생성형 미디어가 소비 포맷(숏폼)까지 넓어지는 흐름이다. 공식 블로그의 정확한 게시 URL은 아직 확정되지 않아 The Decoder 2차 보도가 근거다.\n\n**확인 포인트**\n- 검증 한계: 공식 1차 URL 미확정, The Decoder 2차 보도 근거\n\n출처: the-decoder.com",
          "source": "https://the-decoder.com/google-brings-tiktok-style-video-shorts-to-notebooklm/",
          "slug": "google-20260702-notebooklm-video-shorts",
          "tags": [
            "Google",
            "NotebookLM",
            "생성형 미디어"
          ],
          "backupUrls": [
            {
              "label": "공식 블로그 (정확 post URL 미확정)",
              "url": "https://blog.google/technology/google-labs/notebooklm/"
            },
            {
              "label": "The Decoder (2차 보도)",
              "url": "https://the-decoder.com/google-brings-tiktok-style-video-shorts-to-notebooklm/"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/google-notebooklm-틱톡형-숏폼-비디오-생성-기능-추가-9cbcb4f8.png",
            "alt": "Google NotebookLM, 틱톡형 숏폼 비디오 생성 기능 추가"
          },
        }
      ]
    },
    {
      "name": "Microsoft / GitHub",
      "color": "#5E5CE6",
      "posts": [
        {
          "date": "7/2",
          "platform": "X+Threads",
          "title": "GitHub Copilot, 에이전트 세션 스트리밍 공개 프리뷰",
          "featured": false,
          "deck": "에이전트 작업 진행 과정을 실시간으로 스트리밍하는 프리뷰",
          "summary": "GitHub Copilot이 에이전트 세션 스트리밍을 공개 프리뷰로 시작했다. 에이전트가 작업하는 과정을 실시간으로 확인할 수 있다.",
          "content": "**이게 뭐예요?**\nGitHub Copilot이 에이전트 세션 스트리밍을 공개 프리뷰로 시작했다.\n\n**무엇이 달라졌나?**\n- 에이전트가 작업하는 과정을 실시간으로 확인\n\n**어떻게 읽을까?**\n에이전트 작업을 '블랙박스'가 아니라 실시간으로 지켜보게 하는 가시화 흐름이다.\n\n**확인 포인트**\n- 상태: 공개 프리뷰\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-07-02-copilot-agent-session-streaming-is-now-in-public-preview",
          "officialUrl": "https://github.blog/changelog/2026-07-02-copilot-agent-session-streaming-is-now-in-public-preview",
          "slug": "github-20260702-copilot-agent-session-streaming-preview",
          "tags": [
            "GitHub",
            "개발도구",
            "에이전트"
          ],
          "thumbnail": {
            "src": "/og-cache/github-copilot-에이전트-세션-스트리밍-공개-프리뷰-eef01e60.jpg",
            "alt": "GitHub Copilot, 에이전트 세션 스트리밍 공개 프리뷰"
          },
        },
        {
          "date": "7/2",
          "platform": "X+Threads",
          "title": "GitHub Copilot, Gemini 2.5 Pro·3 Flash 지원 종료 예고",
          "featured": false,
          "deck": "Copilot에서 Gemini 2.5 Pro·3 Flash 지원이 곧 종료 예정",
          "summary": "GitHub Copilot이 Gemini 2.5 Pro와 Gemini 3 Flash의 지원 종료(deprecation)를 예고했다. 해당 모델 사용자는 마이그레이션을 준비해야 한다.",
          "content": "**이게 뭐예요?**\nGitHub Copilot이 Gemini 2.5 Pro와 Gemini 3 Flash의 지원 종료(deprecation)를 예고했다.\n\n**무엇이 달라졌나?**\n- 해당 모델 사용자는 마이그레이션 준비 필요\n\n**어떻게 읽을까?**\n신모델 롤아웃과 함께 구모델을 정리하는 흐름의 일부다.\n\n**확인 포인트**\n- 대상: Gemini 2.5 Pro, Gemini 3 Flash\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-07-02-upcoming-deprecation-of-gemini-2-5-pro-and-gemini-3-flash",
          "officialUrl": "https://github.blog/changelog/2026-07-02-upcoming-deprecation-of-gemini-2-5-pro-and-gemini-3-flash",
          "slug": "github-20260702-gemini-2-5-pro-3-flash-deprecation-copilot",
          "tags": [
            "GitHub",
            "개발도구",
            "마이그레이션"
          ],
          "thumbnail": {
            "src": "/og-cache/github-copilot-gemini-2-5-pro-3-flash-지원-26bb4c1e.jpg",
            "alt": "GitHub Copilot, Gemini 2.5 Pro·3 Flash 지원 종료 예고"
          },
        }
      ]
    }
  ]
};
