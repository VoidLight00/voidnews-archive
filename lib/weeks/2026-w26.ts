import type { WeeklyData } from "../data";

// 2026-w26 (6/18 ~ 6/24)
// 자동 생성: AB workspace 검증/랭킹 산출물을 사이트 주간 데이터로 반영.

export const week26: WeeklyData = {
  "week": 26,
  "year": 2026,
  "slug": "2026-w26",
  "period": "6/18 ~ 6/24",
  "totalPosts": 34,
  "companies": [
    {
      "name": "Anthropic",
      "color": "#E87040",
      "posts": [
        {
          "date": "6/23",
          "platform": "X+Threads",
          "title": "Anthropic, 'Claude Tag' 공개 — Slack 팀원처럼 @Claude로 호출하는 협업 에이전트",
          "featured": true,
          "deck": "Slack에서 @Claude로 부르면 팀원처럼 일하는, Claude Code의 협업형 진화",
          "summary": "Anthropic이 Claude를 Slack 팀원처럼 호출하는 'Claude Tag'를 공개했다. 채널에서 @Claude를 멘션하면 맥락을 읽고 작업을 수행하며, 회사는 이를 Claude Code의 진화로 설명했다.",
          "content": "**이게 뭐예요?**\nAnthropic이 Claude를 Slack 안의 팀원처럼 다루는 'Claude Tag'를 공개했다. 채널에서 @Claude로 멘션하면 대화 맥락을 읽고 작업을 수행한다.\n\n**무엇이 달라졌나?**\n- Slack 채널에서 @Claude 태그로 호출하는 팀원형 인터페이스\n- 채널 맥락을 읽고 작업을 이어받아 수행\n- Anthropic은 이를 Claude Code의 진화(evolution)로 명시\n\n**어떻게 읽을까?**\n코딩 에이전트가 IDE/CLI를 벗어나 팀 협업 도구 안으로 들어오는 흐름이다. 같은 주에 GitHub Copilot JetBrains가 Claude를 에이전트 제공자로 프리뷰한 것과 함께 보면, 에이전트가 '도구'에서 '동료'로 배치되는 변화가 보인다.\n\n**확인 포인트**\n- 호출 방식: 채널 멘션 @Claude\n- 위치: Claude Code 계열 제품군의 확장\n\n출처: anthropic.com",
          "source": "https://www.anthropic.com/news/introducing-claude-tag",
          "officialUrl": "https://www.anthropic.com/news/introducing-claude-tag",
          "slug": "anthropic-claude-tag-slack-claude-857dbf41",
          "tags": [
            "Anthropic",
            "Agent"
          ],
          "thumbnail": {
            "src": "/og-cache/anthropic-claude-tag-공개-slack-팀원처럼-claud-4efb5feb.jpg",
            "alt": "Anthropic, 'Claude Tag' 공개 — Slack 팀원처럼 @Claude로 호출하는 협업 에이전트"
          },
        },
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "Anthropic 'Project Fetch' 2단계 — Claude Opus 4.7, 로봇개 제어 과제서 인간 최고팀보다 20배 빨라",
          "featured": true,
          "deck": "사람 도움 없이 로봇개를 제어한 Opus 4.7, 인간 최고팀의 약 20배 속도",
          "summary": "Anthropic이 로봇개 제어 연구 'Project Fetch'의 2단계 결과를 공개했다. 사람 도움 없이 작동한 Claude Opus 4.7이 가장 빠른 인간팀보다 약 20배 빨랐다고 밝혔으며, 연구진은 Michael Ilie·C. Daniel Freeman·Kevin K. Troy다.",
          "content": "**이게 뭐예요?**\nAnthropic이 로봇개(robodog) 제어 연구 'Project Fetch'의 2단계 결과를 공개했다. 1차 실험에 이은 후속 연구다.\n\n**무엇이 달라졌나?**\n- 사람 도움 없이(without human assistance) 작동한 Claude Opus 4.7이 가장 빠른 인간팀보다 약 20배 빨랐다고 보고\n- 연구진: Michael Ilie, C. Daniel Freeman, Kevin K. Troy\n- 1차 실험에 이은 2단계(Phase two)\n\n**어떻게 읽을까?**\n언어 모델이 물리 세계의 로봇을 직접 제어하는 임바디드(embodied) 자율성 연구다. '속도 20배'는 Anthropic이 발표한 연구 수치이며, 특정 제어 과제에 한정된 결과로 읽는 것이 맞다.\n\n**확인 포인트**\n- 모델: Claude Opus 4.7\n- 조건: 인간 보조 없는 자율 작동\n\n출처: anthropic.com",
          "source": "https://www.anthropic.com/research/project-fetch-phase-two",
          "officialUrl": "https://www.anthropic.com/research/project-fetch-phase-two",
          "slug": "anthropic-project-fetch-2-claude-opus-e86c6e08",
          "tags": [
            "Anthropic",
            "연구/정책"
          ],
          "backupUrls": [
            {
              "label": "공식 블로그 (1차 실험)",
              "url": "https://www.anthropic.com/research/project-fetch"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/anthropic-project-fetch-2단계-claude-opus--31c5ca12.png",
            "alt": "Anthropic 'Project Fetch' 2단계 — Claude Opus 4.7, 로봇개 제어 과제서 인간 최고팀보다 20배 빨라"
          },
        },
        {
          "date": "6/22",
          "platform": "X+Threads",
          "title": "GitHub Copilot, JetBrains IDE에서 Claude를 에이전트 제공자로 프리뷰",
          "featured": true,
          "deck": "JetBrains Copilot에 Claude가 에이전트 제공자로 들어왔다",
          "summary": "GitHub이 JetBrains IDE에서 Claude를 에이전트 제공자(agent provider)로 공개 프리뷰한다. Claude Code CLI 경유로 동작하며, 조직/엔터프라이즈 에이전트·CLI 큐잉·클라우드 에이전트 GA도 함께 공개됐다.",
          "content": "**이게 뭐예요?**\nGitHub Copilot이 JetBrains IDE에서 Claude를 에이전트 제공자로 쓰는 공개 프리뷰를 시작했다.\n\n**무엇이 달라졌나?**\n- JetBrains IDE에서 Claude를 에이전트 제공자로 선택(공개 프리뷰), Claude Code CLI 경유\n- 조직/엔터프라이즈 에이전트 지원\n- CLI 큐잉(queuing), 클라우드 에이전트 GA\n\n**어떻게 읽을까?**\nAnthropic의 Claude가 경쟁사 Microsoft/GitHub의 도구 안에 모델 제공자로 들어왔다. 단일 벤더 종속이 아니라 멀티 모델 제공자 구도가 자리 잡는 신호다.\n\n**확인 포인트**\n- 경유: Claude Code CLI\n- 상태: 공개 프리뷰\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-22-new-features-and-claude-as-agent-provider-preview-in-jetbrains-ides/",
          "officialUrl": "https://github.blog/changelog/2026-06-22-new-features-and-claude-as-agent-provider-preview-in-jetbrains-ides/",
          "slug": "github-copilot-jetbrains-ide-claude-769d3293",
          "tags": [
            "GitHub",
            "Anthropic",
            "개발도구"
          ],
          "thumbnail": {
            "src": "/og-cache/github-copilot-jetbrains-ide에서-claude를-에-af6501ea.jpg",
            "alt": "GitHub Copilot, JetBrains IDE에서 Claude를 에이전트 제공자로 프리뷰"
          },
        },
        {
          "date": "6/23",
          "platform": "X+Threads",
          "title": "Claude Code v2.1.187 — sandbox.credentials 추가, 한국어·CJK 붙여넣기 깨짐(mojibake) 수정",
          "featured": true,
          "deck": "한국어/CJK 붙여넣기 깨짐 수정, sandbox.credentials 추가",
          "summary": "Claude Code v2.1.187 changelog가 공개됐다. sandbox.credentials 설정이 추가되고, 한국어·CJK 텍스트 붙여넣기에서 발생하던 깨짐(mojibake)이 수정됐다.",
          "content": "**이게 뭐예요?**\nClaude Code 커맨드라인 도구의 v2.1.187 변경 사항이 공식 changelog에 올라왔다.\n\n**무엇이 달라졌나?**\n- sandbox.credentials 설정 추가\n- 한국어·CJK 텍스트 붙여넣기 시 발생하던 글자 깨짐(mojibake) 수정\n\n**어떻게 읽을까?**\n한국어 사용자가 직접 체감하는 변경이다. 터미널에 한글을 붙여넣을 때 깨지던 문제가 해결됐다.\n\n**확인 포인트**\n- 버전: 2.1.187 (6/23)\n- 한국어 관련: CJK paste 깨짐 수정\n\n출처: code.claude.com",
          "source": "https://code.claude.com/docs/en/changelog",
          "officialUrl": "https://code.claude.com/docs/en/changelog",
          "slug": "claude-code-v2-1-187-sandbox-631eafed",
          "tags": [
            "Anthropic",
            "개발도구"
          ],
          "backupUrls": [
            {
              "label": "GitHub",
              "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
            }
          ]
        },
        {
          "date": "6/19",
          "platform": "X+Threads",
          "title": "Claude Code v2.1.183 — auto 모드에서 파괴적 git·인프라 destroy 명령 차단",
          "featured": true,
          "deck": "auto 모드가 reset --hard·terraform destroy 위험 명령을 차단",
          "summary": "Claude Code v2.1.183 changelog가 공개됐다. auto 모드에서 git reset --hard·checkout·clean·stash drop 같은 파괴적 git 명령과 terraform/pulumi/cdk destroy를 차단하도록 안전장치를 추가했다.",
          "content": "**이게 뭐예요?**\nClaude Code v2.1.183이 auto 모드의 위험 명령 차단을 추가했다.\n\n**무엇이 달라졌나?**\n- auto 모드에서 파괴적 git 명령 차단: reset --hard, checkout, clean, stash drop\n- 인프라 파괴 명령 차단: terraform / pulumi / cdk destroy\n\n**어떻게 읽을까?**\n에이전트가 사람 승인 없이 코드·인프라를 되돌릴 수 없게 막는 안전장치다. 자율 실행 범위가 넓어질수록 이런 가드레일이 함께 들어온다.\n\n**확인 포인트**\n- 버전: 2.1.183 (6/19)\n- 차단 대상: 파괴적 git + 인프라 destroy\n\n출처: code.claude.com",
          "source": "https://code.claude.com/docs/en/changelog",
          "officialUrl": "https://code.claude.com/docs/en/changelog",
          "slug": "claude-code-v2-1-183-auto-ef7f6399",
          "tags": [
            "Anthropic",
            "개발도구"
          ],
          "backupUrls": [
            {
              "label": "GitHub",
              "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
            }
          ]
        },
        {
          "date": "6/22",
          "platform": "X+Threads",
          "title": "Claude Code v2.1.186 — claude mcp login/logout, SSH용 --no-browser 인증 지원",
          "featured": true,
          "deck": "MCP 서버 로그인/로그아웃과 SSH 환경용 --no-browser 인증을 더한 업데이트",
          "summary": "Claude Code v2.1.186 changelog가 공개됐다. 'claude mcp login/logout' 명령과 브라우저 없이 인증하는 --no-browser 옵션(SSH 환경 지원)이 추가됐다.",
          "content": "**이게 뭐예요?**\nClaude Code v2.1.186 변경 사항이 공식 changelog에 공개됐다.\n\n**무엇이 달라졌나?**\n- claude mcp login / logout 명령 추가\n- --no-browser 인증 옵션으로 SSH 원격 환경 지원\n\n**어떻게 읽을까?**\nMCP 서버 인증과 원격 SSH 작업 흐름을 정리한 업데이트다. 브라우저를 띄울 수 없는 서버 환경에서 바로 쓸 수 있다.\n\n**확인 포인트**\n- 버전: 2.1.186 (6/22)\n- 신규 명령: claude mcp login/logout, --no-browser\n\n출처: code.claude.com",
          "source": "https://code.claude.com/docs/en/changelog",
          "officialUrl": "https://code.claude.com/docs/en/changelog",
          "slug": "claude-code-v2-1-186-claude-83e1b971",
          "tags": [
            "Anthropic",
            "개발도구"
          ],
          "backupUrls": [
            {
              "label": "GitHub",
              "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
            }
          ]
        },
        {
          "date": "6/20",
          "platform": "X+Threads",
          "title": "Claude Code v2.1.185 — 스트림 멈춤 안내 문구 개선, 임계 10초→20초",
          "featured": false,
          "deck": "스트림 정체 안내 문구를 다듬고 표시 임계를 10초에서 20초로 늘린 소규모 패치",
          "summary": "Claude Code v2.1.185 changelog가 공개됐다. 스트림이 멈출 때 보여주는 안내 문구를 다듬고, 안내 표시 임계를 10초에서 20초로 조정한 소규모 UX 패치다.",
          "content": "**이게 뭐예요?**\nClaude Code v2.1.185의 소규모 변경 사항이다.\n\n**무엇이 달라졌나?**\n- 스트림 정체(stream-stall) 안내 문구 개선\n- 안내 표시 임계 10초 → 20초로 조정\n\n**어떻게 읽을까?**\n응답이 잠시 멈출 때 사용자가 받는 메시지를 다듬은 UX 정리 수준의 업데이트다.\n\n**확인 포인트**\n- 버전: 2.1.185 (6/20)\n- 변경 성격: UX 마이너 패치\n\n출처: code.claude.com",
          "source": "https://code.claude.com/docs/en/changelog",
          "officialUrl": "https://code.claude.com/docs/en/changelog",
          "slug": "claude-code-v2-1-185-10-1d813a7e",
          "tags": [
            "Anthropic",
            "개발도구"
          ],
          "backupUrls": [
            {
              "label": "GitHub",
              "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
            }
          ]
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "6/21",
          "platform": "X+Threads",
          "title": "삼성전자, ChatGPT Enterprise·Codex 전 직원 도입 — OpenAI 공식 발표",
          "featured": true,
          "deck": "삼성전자 한국 전 직원·글로벌 DX에 ChatGPT·Codex 배포",
          "summary": "OpenAI가 삼성전자의 ChatGPT Enterprise·Codex 도입을 공식 발표했다. 한국 전 직원과 글로벌 DX(Device eXperience) 부문 대상으로 배포된다. 공식 본문은 봇 차단으로 직접 확인되지 않았고, 날짜·내용은 복수 2차 매체로 교차 확인했다.",
          "content": "**이게 뭐예요?**\nOpenAI가 삼성전자에 ChatGPT Enterprise와 Codex를 도입한다고 공식 발표했다.\n\n**무엇이 달라졌나?**\n- 삼성전자 한국 전 직원 대상 ChatGPT Enterprise 배포\n- 글로벌 DX(Device eXperience) 부문에 Codex 배포\n\n**어떻게 읽을까?**\n한국 청자에게 가장 직접적인 소식이다. 국내 최대 제조사가 전사 단위로 생성형 AI와 코딩 에이전트를 표준 업무 도구로 채택한 사례다.\n\n**확인 포인트**\n- 대상: 삼성전자 한국 전 직원 + 글로벌 DX 부문\n- 검증 한계: openai.com 본문 봇 차단(403), 날짜·내용은 The Decoder·Sammy Fans 등 2차 교차 확인\n\n출처: openai.com",
          "source": "https://openai.com/index/samsung-electronics-chatgpt-codex-deployment/",
          "officialUrl": "https://openai.com/index/samsung-electronics-chatgpt-codex-deployment/",
          "slug": "chatgpt-enterprise-codex-openai-13e45af8",
          "tags": [
            "OpenAI",
            "삼성전자",
            "엔터프라이즈"
          ],
          "backupUrls": [
            {
              "label": "The Decoder",
              "url": "https://the-decoder.com/samsung-rolls-out-chatgpt-enterprise-and-codex-to-employees-in-south-korea/"
            }
          ]
        },
        {
          "date": "6/19",
          "platform": "X+Threads",
          "title": "OpenAI Codex 'Record & Replay' 공개 — 작업을 한 번 시연하면 재사용 가능한 스킬로",
          "featured": true,
          "deck": "한 번 시연하면 재사용 스킬이 되는 Codex 신기능",
          "summary": "OpenAI가 Codex의 'Record & Replay'를 공개했다. 비즈니스 사용자가 워크플로를 한 번 시연하면 재사용 가능한 스킬로 저장된다. macOS와 Computer Use가 필요하며, 초기 제공은 EEA·UK·스위스를 제외한다.",
          "content": "**이게 뭐예요?**\nOpenAI Codex에 'Record & Replay' 기능이 추가됐다. 작업을 한 번 시연(record)하면 재사용 가능한 스킬(replay)로 저장된다.\n\n**무엇이 달라졌나?**\n- 비즈니스 사용자가 워크플로를 한 번 보여주면 재사용 스킬로 변환\n- macOS + Computer Use 환경 필요\n- 초기 제공 범위에서 EEA·UK·스위스 제외\n\n**어떻게 읽을까?**\n에이전트에게 '코드'가 아니라 '시연'으로 일을 가르치는 방향이다. 반복 업무를 한 번 보여주고 자동화하는 패턴이다.\n\n**확인 포인트**\n- 요구 환경: macOS + Computer Use\n- 초기 제외 지역: EEA·UK·스위스(한국은 제외 목록에 없으나 한국 제공은 명시 확인 안 됨)\n\n출처: developers.openai.com",
          "source": "https://developers.openai.com/codex/record-and-replay",
          "officialUrl": "https://developers.openai.com/codex/record-and-replay",
          "slug": "openai-codex-record-replay-d91b48e9",
          "tags": [
            "OpenAI",
            "개발도구",
            "Agent"
          ],
          "backupUrls": [
            {
              "label": "공식 문서 (changelog)",
              "url": "https://developers.openai.com/codex/changelog"
            },
            {
              "label": "OpenAI 커뮤니티",
              "url": "https://community.openai.com/t/introducing-record-replay/1384088"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/openai-codex-record-replay-공개-작업을-한-번-시연-d36516ed.png",
            "alt": "OpenAI Codex 'Record & Replay' 공개 — 작업을 한 번 시연하면 재사용 가능한 스킬로"
          },
        },
        {
          "date": "6/22",
          "platform": "X+Threads",
          "title": "OpenAI 'Daybreak' 확장 — 조직 보안 도구 묶음, GPT-5.5-Cyber·Codex Security 포함",
          "featured": true,
          "deck": "GPT-5.5-Cyber·Codex Security를 묶은 조직 사이버 방어 패키지",
          "summary": "OpenAI가 모든 조직의 사이버 방어를 돕는 'Daybreak' 확장을 발표했다. GPT-5.5-Cyber, Codex Security, Patch the Planet 이니셔티브를 한 패키지로 묶었다. 공식 본문은 봇 차단으로 직접 확인되지 않았고 2차 매체로 교차 확인했다.",
          "content": "**이게 뭐예요?**\nOpenAI가 조직 보안을 위한 도구 묶음 'Daybreak' 확장을 발표했다.\n\n**무엇이 달라졌나?**\n- GPT-5.5-Cyber 정식 공개(Daybreak 패키지 내)\n- Codex Security 포함\n- 오픈소스 유지보수자를 지원하는 Patch the Planet 이니셔티브 동반\n\n**어떻게 읽을까?**\nAI를 공격이 아니라 방어 쪽에 배치하는 흐름이다. 모델·코드 보안·오픈소스 생태계 지원을 한 묶음으로 제시했다.\n\n**확인 포인트**\n- 구성: GPT-5.5-Cyber + Codex Security + Patch the Planet\n- 검증 한계: openai.com 본문 봇 차단(403), 날짜·구성은 Infosecurity Magazine 등 2차 교차 확인\n\n출처: openai.com",
          "source": "https://openai.com/index/daybreak-securing-the-world/",
          "officialUrl": "https://openai.com/index/daybreak-securing-the-world/",
          "slug": "openai-daybreak-gpt-5-5-cyber-9c0e5c4b",
          "tags": [
            "OpenAI",
            "보안"
          ],
          "backupUrls": [
            {
              "label": "Infosecurity Magazine",
              "url": "https://www.infosecurity-magazine.com/news/openai-daybreak-gpt-5-5-cyber/"
            }
          ]
        },
        {
          "date": "6/22",
          "platform": "X+Threads",
          "title": "OpenAI 'Patch the Planet' — 오픈소스 유지보수자 보안 지원 이니셔티브 (Trail of Bits 협업)",
          "featured": false,
          "deck": "Daybreak 산하 오픈소스 보안, Trail of Bits가 19개 OSS 지원",
          "summary": "OpenAI가 오픈소스 유지보수자를 지원하는 'Patch the Planet' 이니셔티브를 Daybreak의 일부로 공개했다. 협업사 Trail of Bits는 19개 오픈소스 프로젝트에서 수백 개 이슈와 수십 개 패치를 처리했다고 밝혔다(파트너 발표 수치).",
          "content": "**이게 뭐예요?**\nOpenAI의 보안 패키지 Daybreak 안에서, 오픈소스 유지보수자를 지원하는 'Patch the Planet' 이니셔티브가 공개됐다.\n\n**무엇이 달라졌나?**\n- 오픈소스 프로젝트의 취약점 발굴·패치 지원\n- 협업사 Trail of Bits: 19개 OSS 프로젝트, 수백 개 이슈, 수십 개 패치 처리(파트너 측 발표)\n\n**어떻게 읽을까?**\nAI 보안 도구를 공급망 하단의 오픈소스 생태계까지 확장하는 시도다. 처리 규모 수치는 Trail of Bits의 발표값으로, 독립 검증 수치가 아니다.\n\n**확인 포인트**\n- 협업사: Trail of Bits\n- 수치 출처: 파트너 발표(독립 검증 아님)\n\n출처: openai.com, Trail of Bits",
          "source": "https://openai.com/index/patch-the-planet/",
          "officialUrl": "https://openai.com/index/patch-the-planet/",
          "slug": "openai-patch-the-planet-trail-of-a9e7b677",
          "tags": [
            "OpenAI",
            "보안",
            "오픈소스"
          ],
          "backupUrls": [
            {
              "label": "Trail of Bits 블로그",
              "url": "https://blog.trailofbits.com/2026/06/22/introducing-patch-the-planet/"
            }
          ]
        },
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "Noam Shazeer, Google DeepMind 떠나 OpenAI 합류 — Architecture Research 리드 (CNBC 보도)",
          "featured": false,
          "deck": "Transformer 공동 창안자 Noam Shazeer가 OpenAI 합류(보도)",
          "summary": "Transformer 공동 창안자이자 Gemini 공동 리드인 Noam Shazeer가 Google DeepMind를 떠나 OpenAI에 Lead for Architecture Research로 합류한다고 CNBC가 보도했다. OpenAI·Shazeer 본인의 공식 1차 확인은 없어 뉴스 보도가 1차 출처다.",
          "content": "**이게 뭐예요?**\nTransformer 공동 창안자이자 Gemini 공동 리드인 Noam Shazeer가 Google DeepMind를 떠나 OpenAI에 합류한다고 CNBC가 보도했다.\n\n**무엇이 달라졌나?**\n- OpenAI Lead for Architecture Research로 합류(보도)\n- Character.AI(2024, 약 27억 달러 관련) 이력 함께 언급\n\n**어떻게 읽을까?**\n프런티어 연구소 간 핵심 인력 이동(talent war) 흐름이다. 다만 OpenAI나 Shazeer 본인의 공식 1차 발표는 확인되지 않아, 현재 1차 출처는 뉴스 보도다.\n\n**확인 포인트**\n- 보도 출처: CNBC(공식 1차 발표 아님)\n- 역할: Architecture Research 리드(보도)\n\n출처: CNBC",
          "source": "https://www.cnbc.com/2026/06/18/google-gemini-co-lead-noam-shazeer-leaves-for-openai.html",
          "officialUrl": "https://www.cnbc.com/2026/06/18/google-gemini-co-lead-noam-shazeer-leaves-for-openai.html",
          "slug": "noam-shazeer-google-deepmind-openai-architecture-931162dc",
          "tags": [
            "OpenAI",
            "Google",
            "인사"
          ],
          "backupUrls": [
            {
              "label": "Axios",
              "url": "https://www.axios.com/2026/06/18/noam-shazeer-google-openai-characterai"
            },
            {
              "label": "Fast Company",
              "url": "https://www.fastcompany.com/91562193/google-ai-leader-noam-shazeer-leaves-company-for-openai"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/noam-shazeer-google-deepmind-떠나-openai-합-88125a06.jpg",
            "alt": "Noam Shazeer, Google DeepMind 떠나 OpenAI 합류 — Architecture Research 리드 (CNBC 보도)"
          },
        }
      ]
    },
    {
      "name": "Google",
      "color": "#4285F4",
      "posts": [
        {
          "date": "6/22",
          "platform": "X+Threads",
          "title": "Google DeepMind × A24, AI 영화 제작 연구 파트너십 발표 (업계 첫 사례)",
          "featured": true,
          "deck": "DeepMind와 A24가 AI 영화 제작 도구를 함께 연구하는 첫 파트너십",
          "summary": "Google DeepMind와 영화사 A24가 AI 영화 제작 도구를 함께 연구하는 'first-of-its-kind' 파트너십을 발표했다. 공식 블로그는 파트너십 사실을 확인하지만 금액은 명시하지 않으며, '약 7,500만 달러' 투자 수치는 2차 매체 보도값이다.",
          "content": "**이게 뭐예요?**\nGoogle DeepMind와 영화사 A24가 AI 영화 제작 도구를 함께 연구하는 파트너십을 발표했다.\n\n**무엇이 달라졌나?**\n- 업계 첫(first-of-its-kind) AI 영화 제작 연구 파트너십\n- 공식 블로그는 파트너십 사실을 확인\n\n**어떻게 읽을까?**\n프런티어 AI 연구소가 창작 산업과 직접 협업하는 신호다. 투자 금액 '약 7,500만 달러'는 Variety·Deadline 등 2차 매체가 보도한 수치이며, Google 공식 본문에는 금액이 없다.\n\n**확인 포인트**\n- 협업: Google DeepMind × A24\n- 수치 주의: $75M은 매체 보도값, Google 공식 발표 수치 아님\n\n출처: blog.google",
          "source": "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/deepmind-a24-research-partnership/",
          "officialUrl": "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/deepmind-a24-research-partnership/",
          "slug": "google-deepmind-a24-ai-3a9df93e",
          "tags": [
            "Google",
            "미디어",
            "파트너십"
          ],
          "backupUrls": [
            {
              "label": "Variety",
              "url": "https://variety.com/2026/film/news/google-a24-ai-filmmaking-tools-1236787297/"
            },
            {
              "label": "Deadline",
              "url": "https://deadline.com/2026/06/google-a24-partnership-ai-filmmaking-tools-1236963944/"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/google-deepmind-a24-ai-영화-제작-연구-파트너십-발표--f85d3c23.jpg",
            "alt": "Google DeepMind × A24, AI 영화 제작 연구 파트너십 발표 (업계 첫 사례)"
          },
        }
      ]
    },
    {
      "name": "Microsoft / GitHub",
      "color": "#5E5CE6",
      "posts": [
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "GitHub Copilot, Microsoft MAI-Code-1-Flash를 8개 표면으로 확대",
          "featured": true,
          "deck": "Microsoft 소형 코딩 모델이 Copilot 8개 표면에 들어왔다",
          "summary": "GitHub이 Microsoft의 소형 코딩 모델 MAI-Code-1-Flash를 8개 Copilot 표면(CLI·앱·Chat·VS·Mobile·JetBrains·Eclipse·Xcode)으로 확대했다.",
          "content": "**이게 뭐예요?**\nGitHub Copilot이 Microsoft의 소형 코딩 모델 MAI-Code-1-Flash를 더 많은 표면에서 제공한다.\n\n**무엇이 달라졌나?**\n- 8개 Copilot 표면 지원: CLI, 앱, Chat, Visual Studio, Mobile, JetBrains, Eclipse, Xcode\n\n**어떻게 읽을까?**\nMicrosoft 자체 모델(MAI 계열)이 Copilot 전반으로 확산되는 흐름이다. 경량 모델을 여러 IDE에 일관되게 까는 전략이다.\n\n**확인 포인트**\n- 모델: MAI-Code-1-Flash (Microsoft)\n- 표면: 8개\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-18-mai-code-1-flash-available-on-more-copilot-surfaces/",
          "officialUrl": "https://github.blog/changelog/2026-06-18-mai-code-1-flash-available-on-more-copilot-surfaces/",
          "slug": "github-copilot-microsoft-mai-code-1-6ecff5cb",
          "tags": [
            "GitHub",
            "Microsoft",
            "개발도구"
          ],
          "thumbnail": {
            "src": "/og-cache/github-copilot-microsoft-mai-code-1-flas-b8da04fe.png",
            "alt": "GitHub Copilot, Microsoft MAI-Code-1-Flash를 8개 표면으로 확대"
          },
        },
        {
          "date": "6/23",
          "platform": "X+Threads",
          "title": "GitHub Copilot CLI, 새 터미널 인터페이스 정식 출시(GA) — 탭 내비·접근성 개선",
          "featured": true,
          "deck": "새 터미널 인터페이스 정식 출시, 탭 내비·접근성 강화",
          "summary": "GitHub Copilot CLI의 새 터미널 인터페이스가 정식 출시(GA)됐다. Build 2026에서 미리 보였던 인터페이스로, 탭 내비게이션과 접근성을 개선했다.",
          "content": "**이게 뭐예요?**\nGitHub Copilot CLI의 새 터미널 인터페이스가 정식 출시(GA)됐다.\n\n**무엇이 달라졌나?**\n- Build 2026에서 미리 공개한 인터페이스의 정식 출시\n- 탭 내비게이션 추가\n- 접근성(accessibility) 개선\n\n**어떻게 읽을까?**\nCLI 기반 코딩 에이전트의 사용 경험을 다듬는 흐름이다. 터미널에서 여러 작업을 탭으로 오가는 방식이 표준화되고 있다.\n\n**확인 포인트**\n- 상태: GA(정식 출시)\n- 개선: 탭 내비, 접근성\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-23-copilot-cli-new-terminal-interface-is-generally-available/",
          "officialUrl": "https://github.blog/changelog/2026-06-23-copilot-cli-new-terminal-interface-is-generally-available/",
          "slug": "github-copilot-cli-ga-3c00a8e7",
          "tags": [
            "GitHub",
            "개발도구"
          ],
          "thumbnail": {
            "src": "/og-cache/github-copilot-cli-새-터미널-인터페이스-정식-출시-ga--a7ec6619.png",
            "alt": "GitHub Copilot CLI, 새 터미널 인터페이스 정식 출시(GA) — 탭 내비·접근성 개선"
          },
        },
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "GitHub Copilot 코드 리뷰, AGENTS.md 지원·UI 개선 추가",
          "featured": false,
          "deck": "리포 루트의 AGENTS.md로 코드 리뷰 피드백을 조정하게 한 Copilot 업데이트",
          "summary": "GitHub Copilot 코드 리뷰가 리포 루트의 AGENTS.md를 읽어 리뷰 피드백을 조정하도록 업데이트됐다. 초안 PR용 Request 버튼과 접힌 타임라인 UI도 추가됐다.",
          "content": "**이게 뭐예요?**\nGitHub Copilot의 코드 리뷰가 AGENTS.md 지시 파일을 지원한다.\n\n**무엇이 달라졌나?**\n- 리포 루트의 AGENTS.md로 코드 리뷰 피드백 방향 조정\n- 초안(draft) PR용 Request 버튼\n- 접힌 타임라인(collapsed timeline) UI\n\n**어떻게 읽을까?**\nAGENTS.md 같은 지시 파일이 에이전트 동작의 표준 설정 지점으로 굳어지는 흐름이다.\n\n**확인 포인트**\n- 지시 파일: AGENTS.md(리포 루트)\n- UI: draft PR Request 버튼, 접힌 타임라인\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-18-copilot-code-review-agents-md-support-and-ui-improvements/",
          "officialUrl": "https://github.blog/changelog/2026-06-18-copilot-code-review-agents-md-support-and-ui-improvements/",
          "slug": "github-copilot-agents-md-ui-f099b226",
          "tags": [
            "GitHub",
            "개발도구"
          ],
          "thumbnail": {
            "src": "/og-cache/github-copilot-코드-리뷰-agents-md-지원-ui-개선--4ea88867.png",
            "alt": "GitHub Copilot 코드 리뷰, AGENTS.md 지원·UI 개선 추가"
          },
        },
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "GitHub, 자동 생성 릴리스 노트에 Copilot PR 기여 표기 추가",
          "featured": false,
          "deck": "릴리스 노트가 'by @user with @copilot'로 기여 표기",
          "summary": "GitHub이 자동 생성 릴리스 노트에서 Copilot 풀 리퀘스트 기여를 'by @user with @copilot' 형태로 함께 표기하도록 했다.",
          "content": "**이게 뭐예요?**\nGitHub의 자동 생성 릴리스 노트가 Copilot의 PR 기여를 함께 표기한다.\n\n**무엇이 달라졌나?**\n- 릴리스 노트에 'by @user with @copilot' 공동 기여 표기\n\n**어떻게 읽을까?**\n에이전트가 만든 변경을 기록에 명시하는 귀속(attribution) 흐름이다. 사람과 에이전트의 공동 작업을 추적 가능하게 만든다.\n\n**확인 포인트**\n- 표기 형식: by @user with @copilot\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-18-generated-release-notes-credit-you-for-copilot-pull-requests/",
          "officialUrl": "https://github.blog/changelog/2026-06-18-generated-release-notes-credit-you-for-copilot-pull-requests/",
          "slug": "github-copilot-pr-a745959b",
          "tags": [
            "GitHub",
            "개발도구"
          ],
          "thumbnail": {
            "src": "/og-cache/github-자동-생성-릴리스-노트에-copilot-pr-기여-표기-추가-75cf891d.jpg",
            "alt": "GitHub, 자동 생성 릴리스 노트에 Copilot PR 기여 표기 추가"
          },
        },
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "GitHub, Copilot이 작성한 PR을 작성자 검색에 포함",
          "featured": false,
          "deck": "Copilot이 만든 풀 리퀘스트가 이제 작성자(author) 검색 결과에 잡힌다",
          "summary": "GitHub이 Copilot이 작성한 풀 리퀘스트를 작성자(author) 검색 결과에 포함하도록 변경했다.",
          "content": "**이게 뭐예요?**\nGitHub에서 Copilot이 작성한 PR이 작성자 검색에 포함된다.\n\n**무엇이 달라졌나?**\n- Copilot-authored PR이 author 검색 결과에 노출\n\n**어떻게 읽을까?**\n에이전트가 만든 작업물을 사람 작성물과 같은 검색 흐름에서 찾을 수 있게 된 변화다. 에이전트 기여의 가시화다.\n\n**확인 포인트**\n- 변경: Copilot PR이 author 검색에 포함\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-18-copilot-authored-pull-requests-now-included-in-author-searches/",
          "officialUrl": "https://github.blog/changelog/2026-06-18-copilot-authored-pull-requests-now-included-in-author-searches/",
          "slug": "github-copilot-pr-68d069b2",
          "tags": [
            "GitHub",
            "개발도구"
          ],
          "thumbnail": {
            "src": "/og-cache/github-copilot이-작성한-pr을-작성자-검색에-포함-df458940.jpg",
            "alt": "GitHub, Copilot이 작성한 PR을 작성자 검색에 포함"
          },
        },
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "GitHub Actions, pull_request_target 체크아웃 기본값을 더 안전하게 변경",
          "featured": false,
          "deck": "공급망 위험 줄이게 pull_request_target 기본값 안전화",
          "summary": "GitHub이 Actions의 pull_request_target 워크플로 체크아웃 기본값을 더 안전한 쪽으로 변경했다. CI 공급망 공격 위험을 줄이기 위한 조치다.",
          "content": "**이게 뭐예요?**\nGitHub Actions의 pull_request_target 체크아웃 기본값이 더 안전하게 바뀌었다.\n\n**무엇이 달라졌나?**\n- pull_request_target 워크플로의 안전한 체크아웃 기본값 적용\n\n**어떻게 읽을까?**\nCI 공급망(supply-chain) 보안을 기본값 수준에서 강화하는 흐름이다. 외부 PR이 권한을 악용하는 고전적 공격 표면을 줄인다.\n\n**확인 포인트**\n- 대상: pull_request_target 체크아웃 기본값\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-18-safer-pull_request_target-defaults-for-github-actions-checkout/",
          "officialUrl": "https://github.blog/changelog/2026-06-18-safer-pull_request_target-defaults-for-github-actions-checkout/",
          "slug": "github-actions-pull-request-target-24996825",
          "tags": [
            "GitHub",
            "보안",
            "개발도구"
          ],
          "thumbnail": {
            "src": "/og-cache/github-actions-pull-request-target-체크아웃--e13ac1af.jpg",
            "alt": "GitHub Actions, pull_request_target 체크아웃 기본값을 더 안전하게 변경"
          },
        },
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "GitHub Actions, 워크플로 트리거 주체·조건 제어 기능 추가",
          "featured": false,
          "deck": "누가·무엇이 Actions 워크플로를 실행하는지 제어하는 보안 설정 추가",
          "summary": "GitHub이 Actions에서 누가·무엇이 워크플로를 트리거하는지 제어하는 기능을 추가했다. CI 공급망 보안 강화의 일환이다.",
          "content": "**이게 뭐예요?**\nGitHub Actions에서 워크플로를 누가·무엇이 실행할 수 있는지 제어할 수 있게 됐다.\n\n**무엇이 달라졌나?**\n- 워크플로 트리거 주체·조건 제어 설정 추가\n\n**어떻게 읽을까?**\n외부 입력이 CI를 임의로 실행하지 못하게 막는 공급망 보안 흐름이다. 안전한 체크아웃 기본값 변경과 같은 날 발표됐다.\n\n**확인 포인트**\n- 대상: Actions 워크플로 트리거 제어\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-18-control-who-and-what-triggers-github-actions-workflows/",
          "officialUrl": "https://github.blog/changelog/2026-06-18-control-who-and-what-triggers-github-actions-workflows/",
          "slug": "github-actions-d3772155",
          "tags": [
            "GitHub",
            "보안",
            "개발도구"
          ],
          "thumbnail": {
            "src": "/og-cache/github-actions-워크플로-트리거-주체-조건-제어-기능-추가-ee6a1f65.png",
            "alt": "GitHub Actions, 워크플로 트리거 주체·조건 제어 기능 추가"
          },
        },
        {
          "date": "6/23",
          "platform": "X+Threads",
          "title": "GitHub Secret Scanning, Replicate 시크릿용 확장 메타데이터 추가",
          "featured": false,
          "deck": "유출 탐지 시 Replicate 시크릿에 대해 더 풍부한 메타데이터를 제공",
          "summary": "GitHub Advanced Security의 시크릿 스캐닝이 Replicate 시크릿에 대해 확장 메타데이터를 제공하도록 업데이트됐다.",
          "content": "**이게 뭐예요?**\nGitHub의 시크릿 스캐닝이 Replicate 시크릿 탐지에 확장 메타데이터를 추가했다.\n\n**무엇이 달라졌나?**\n- Replicate 시크릿에 대한 확장 메타데이터(extended metadata) 제공\n\n**어떻게 읽을까?**\n유출된 키를 더 정확히 식별하도록 탐지 정보를 강화하는 흐름이다. AI 서비스(Replicate) 키도 스캔 대상에 포함된다.\n\n**확인 포인트**\n- 대상: Replicate 시크릿\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-23-secret-scanning-adds-extended-metadata-for-replicate-secrets/",
          "officialUrl": "https://github.blog/changelog/2026-06-23-secret-scanning-adds-extended-metadata-for-replicate-secrets/",
          "slug": "github-secret-scanning-replicate-3e418610",
          "tags": [
            "GitHub",
            "보안"
          ],
          "thumbnail": {
            "src": "/og-cache/github-secret-scanning-replicate-시크릿용-확장-08c2f711.jpg",
            "alt": "GitHub Secret Scanning, Replicate 시크릿용 확장 메타데이터 추가"
          },
        },
        {
          "date": "6/23",
          "platform": "X+Threads",
          "title": "GitHub, Code Quality 결과를 REST API로 조회 가능",
          "featured": false,
          "deck": "코드 품질 진단 결과를 REST API로 가져올 수 있게 한 DevSecOps 업데이트",
          "summary": "GitHub Advanced Security가 Code Quality 진단 결과를 REST API로 조회할 수 있도록 했다.",
          "content": "**이게 뭐예요?**\nGitHub의 Code Quality 진단 결과를 REST API로 가져올 수 있게 됐다.\n\n**무엇이 달라졌나?**\n- Code Quality findings를 REST API로 조회\n\n**어떻게 읽을까?**\n품질 진단 데이터를 파이프라인·대시보드에 자동 연동할 수 있게 만드는 DevSecOps API 흐름이다.\n\n**확인 포인트**\n- 대상: Code Quality findings REST API\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-23-fetch-code-quality-findings-via-rest-api/",
          "officialUrl": "https://github.blog/changelog/2026-06-23-fetch-code-quality-findings-via-rest-api/",
          "slug": "github-code-quality-rest-api-233d554e",
          "tags": [
            "GitHub",
            "개발도구"
          ],
          "thumbnail": {
            "src": "/og-cache/github-code-quality-결과를-rest-api로-조회-가능-f901502b.jpg",
            "alt": "GitHub, Code Quality 결과를 REST API로 조회 가능"
          },
        },
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "GitHub Actions, 커스텀 이미지에서 커스텀 이미지 빌드 지원",
          "featured": false,
          "deck": "기존 커스텀 러너 이미지를 베이스로 또 다른 커스텀 이미지를 만들 수 있게 됐다",
          "summary": "GitHub Actions가 커스텀 이미지를 베이스로 또 다른 커스텀 러너 이미지를 빌드(chaining)할 수 있도록 지원한다.",
          "content": "**이게 뭐예요?**\nGitHub Actions에서 커스텀 이미지를 베이스로 또 다른 커스텀 이미지를 만들 수 있다.\n\n**무엇이 달라졌나?**\n- 커스텀 러너 이미지 체이닝(custom image from custom image) 지원\n\n**어떻게 읽을까?**\n공통 베이스 이미지를 재사용해 CI 러너 이미지를 계층적으로 관리할 수 있게 하는 흐름이다.\n\n**확인 포인트**\n- 대상: 커스텀 러너 이미지 체이닝\n\n출처: github.blog",
          "source": "https://github.blog/changelog/2026-06-18-actions-build-custom-images-from-custom-images/",
          "officialUrl": "https://github.blog/changelog/2026-06-18-actions-build-custom-images-from-custom-images/",
          "slug": "github-actions-1ddc11b1",
          "tags": [
            "GitHub",
            "개발도구"
          ],
          "thumbnail": {
            "src": "/og-cache/github-actions-커스텀-이미지에서-커스텀-이미지-빌드-지원-ba9913d7.jpg",
            "alt": "GitHub Actions, 커스텀 이미지에서 커스텀 이미지 빌드 지원"
          },
        }
      ]
    },
    {
      "name": "NVIDIA",
      "color": "#76B900",
      "posts": [
        {
          "date": "6/22",
          "platform": "X+Threads",
          "title": "NVIDIA Vera Rubin, 과학 연구용 슈퍼컴퓨터 공개 (ISC 2026) — AI 7엑사플롭스 이상",
          "featured": true,
          "deck": "AI 7엑사플롭스 이상·FP64 5페타플롭스의 과학용 Vera Rubin",
          "summary": "NVIDIA가 ISC High Performance 2026에서 Vera Rubin 기반 과학 연구용 슈퍼컴퓨터를 공개했다. AI 연산 7엑사플롭스 이상, 네이티브 FP64 5페타플롭스, 랙당 최대 144 GPU를 지원하며 Bull·Dell·GIGABYTE·HPE·Supermicro가 참여한다.",
          "content": "**이게 뭐예요?**\nNVIDIA가 ISC High Performance 2026에서 Vera Rubin 기반 과학용 슈퍼컴퓨터를 공개했다.\n\n**무엇이 달라졌나?**\n- AI 연산 7엑사플롭스(exaflops) 이상\n- 네이티브 FP64 5페타플롭스\n- 랙당 최대 144 GPU\n- 참여사: Bull, Dell, GIGABYTE, HPE, Supermicro\n\n**어떻게 읽을까?**\nAI 가속 인프라가 과학 연구(AI-for-science) HPC로 확장되는 흐름이다. AI 연산과 정밀 과학 계산(FP64)을 같은 플랫폼에 묶었다.\n\n**확인 포인트**\n- 플랫폼: Vera Rubin\n- 발표 행사: ISC High Performance 2026\n\n출처: nvidianews.nvidia.com",
          "source": "https://nvidianews.nvidia.com/news/nvidia-vera-rubin-delivers-world-class-supercomputers-for-science",
          "officialUrl": "https://nvidianews.nvidia.com/news/nvidia-vera-rubin-delivers-world-class-supercomputers-for-science",
          "slug": "nvidia-vera-rubin-isc-2026-ai-4df88a13",
          "tags": [
            "NVIDIA",
            "인프라"
          ],
          "backupUrls": [
            {
              "label": "공식 (IR)",
              "url": "https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Vera-Rubin-Delivers-World-Class-Supercomputers-for-Science/default.aspx"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/nvidia-vera-rubin-과학-연구용-슈퍼컴퓨터-공개-isc-20-1994c010.png",
            "alt": "NVIDIA Vera Rubin, 과학 연구용 슈퍼컴퓨터 공개 (ISC 2026) — AI 7엑사플롭스 이상"
          },
        },
        {
          "date": "6/22",
          "platform": "X+Threads",
          "title": "유럽, NVIDIA AI 슈퍼컴퓨터 35대 신규 공개 (역대 최다) — 23개국 300만+ 연구자",
          "featured": false,
          "deck": "23개국에 걸친 35대 신규 NVIDIA AI 슈퍼컴퓨터, 300만 명 이상 연구자 대상",
          "summary": "유럽이 23개국에 걸쳐 역대 최다인 35대의 신규 NVIDIA AI 슈퍼컴퓨터를 공개했다. 300만 명 이상의 연구자가 사용 대상이다. ISC 2026 같은 날 발표로 Vera Rubin 과학용 카드와 연결되는 지역 인프라 소식이다.",
          "content": "**이게 뭐예요?**\n유럽이 23개국에 걸쳐 35대의 신규 NVIDIA AI 슈퍼컴퓨터를 공개했다.\n\n**무엇이 달라졌나?**\n- 역대 최다 35대 신규 AI 슈퍼컴퓨터\n- 23개 유럽 국가에 걸친 배치\n- 300만 명 이상 연구자 사용 대상\n\n**어떻게 읽을까?**\nAI 인프라가 국가·지역 단위 연구 기반으로 확산되는 흐름이다. Vera Rubin 과학용 플랫폼 발표와 같은 날의 지역 배치 소식이다.\n\n**확인 포인트**\n- 규모: 35대 / 23개국\n- 대상: 300만+ 연구자\n\n출처: NVIDIA (GlobeNewswire wire)",
          "source": "https://www.globenewswire.com/news-release/2026/06/22/3315319/0/en/Europe-Unveils-a-Record-35-New-NVIDIA-AI-Supercomputers.html",
          "officialUrl": "https://www.globenewswire.com/news-release/2026/06/22/3315319/0/en/Europe-Unveils-a-Record-35-New-NVIDIA-AI-Supercomputers.html",
          "slug": "nvidia-ai-35-23-300-66cf559c",
          "tags": [
            "NVIDIA",
            "인프라"
          ],
          "backupUrls": [
            {
              "label": "공식 블로그 (관련)",
              "url": "https://nvidianews.nvidia.com/news/nvidia-vera-rubin-delivers-world-class-supercomputers-for-science"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/유럽-nvidia-ai-슈퍼컴퓨터-35대-신규-공개-역대-최다-23개국--8b89b8b0.jpg",
            "alt": "유럽, NVIDIA AI 슈퍼컴퓨터 35대 신규 공개 (역대 최다) — 23개국 300만+ 연구자"
          },
        }
      ]
    },
    {
      "name": "SK hynix",
      "color": "#EA002C",
      "posts": [
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "SK하이닉스, HBM4E 12단 샘플 고객사 공급 개시 — 7세대 HBM 전쟁 본격화",
          "featured": true,
          "deck": "한국 직접 주체. 삼성 세계최초 HBM4E 개발 발표에 이어 SK 12단 샘플 공급. 삼성·SK·마이크론 차세대 HBM…",
          "summary": "한국 직접 주체. 삼성 세계최초 HBM4E 개발 발표에 이어 SK 12단 샘플 공급. 삼성·SK·마이크론 차세대 HBM 주도권 경쟁. (KR direct→승격)",
          "content": "### 이게 뭐예요?\n한국 직접 주체. 삼성 세계최초 HBM4E 개발 발표에 이어 SK 12단 샘플 공급. 삼성·SK·마이크론 차세대 HBM 주도권 경쟁. (KR direct→승격)\n\n### 왜 중요해요?\n한국 직접 주체. 삼성 세계최초 HBM4E 개발 발표에 이어 SK 12단 샘플 공급. 삼성·SK·마이크론 차세대 HBM 주도권 경쟁. (KR direct→승격)\n\n### 확인 포인트\n- 날짜: 2026-06-18\n- 출처: 조선일보 (기사) / SK하이닉스 뉴스룸 (1차 보도자료)\n\n출처: https://news.skhynix.co.kr/12-layer-hbm4e-sample/",
          "source": "https://news.skhynix.co.kr/12-layer-hbm4e-sample/",
          "officialUrl": "https://news.skhynix.co.kr/12-layer-hbm4e-sample/",
          "slug": "sk-hbm4e-12-7-hbm-311c2396",
          "tags": [
            "SK hynix",
            "반도체/메모리"
          ],
          "thumbnail": {
            "src": "/og-cache/sk하이닉스-hbm4e-12단-샘플-고객사-공급-개시-7세대-hbm-전쟁-52f90af6.jpg",
            "alt": "SK하이닉스, HBM4E 12단 샘플 고객사 공급 개시 — 7세대 HBM 전쟁 본격화"
          },
        }
      ]
    },
    {
      "name": "xAI",
      "color": "#111111",
      "posts": [
        {
          "date": "6/22",
          "platform": "X+Threads",
          "title": "xAI, Grok Build에 '/goal' 도입 — 검증 내장 장시간 자율 실행 (multi-step 코딩)",
          "featured": true,
          "deck": "계획·구현·검증을 자동으로 도는, Grok Build의 장시간 자율 실행 명령 /goal",
          "summary": "xAI가 Grok Build에 '/goal'을 도입했다. 장시간 자율 실행과 내장 검증으로 multi-step 코딩 작업을 처리한다. 본문은 Cloudflare 차단으로 직접 확인되지 않았고, slug·내용은 MarkTechPost로 교차 확인했다.",
          "content": "**이게 뭐예요?**\nxAI가 Grok Build에 자율 실행 명령 '/goal'을 도입했다.\n\n**무엇이 달라졌나?**\n- 장시간 자율 실행(long-running autonomous execution)\n- 내장 검증(built-in verification)으로 multi-step 코딩 작업 처리\n- 계획·구현·검증을 자동으로 순환\n\n**어떻게 읽을까?**\n같은 '/goal' 이름이 xAI Grok Build, Claude Code, OpenAI Codex에서 각각 별도로 등장했다. 셋은 중복이 아니라 '에이전트 목표 루프'라는 같은 흐름의 서로 다른 구현이다.\n\n**확인 포인트**\n- 제품: Grok Build (xAI)\n- 검증 한계: x.ai 본문 Cloudflare 차단(403), 내용은 MarkTechPost 교차 확인\n\n출처: x.ai",
          "source": "https://x.ai/news/introducing-goal",
          "officialUrl": "https://x.ai/news/introducing-goal",
          "slug": "xai-grok-build-goal-multi-step-59f9fc58",
          "tags": [
            "xAI",
            "Agent",
            "개발도구"
          ],
          "backupUrls": [
            {
              "label": "MarkTechPost",
              "url": "https://www.marktechpost.com/2026/06/22/xai-launches-goal-in-grok-build-adding-long-running-autonomous-execution-with-built-in-verification-for-multi-step-coding-tasks/"
            }
          ]
        },
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "xAI Grok, Databricks Agent Bricks에 네이티브 제공 (Data+AI Summit)",
          "featured": true,
          "deck": "6/18 Data+AI Summit 라이브 발표. Grok이 Databricks Agent Bricks에서 네이티브 제공.…",
          "summary": "6/18 Data+AI Summit 라이브 발표. Grok이 Databricks Agent Bricks에서 네이티브 제공. (2차 블로그 출처, 보수적)",
          "content": "### 이게 뭐예요?\n6/18 Data+AI Summit 라이브 발표. Grok이 Databricks Agent Bricks에서 네이티브 제공. (2차 블로그 출처, 보수적)\n\n### 왜 중요해요?\n6/18 Data+AI Summit 라이브 발표. Grok이 Databricks Agent Bricks에서 네이티브 제공. (2차 블로그 출처, 보수적)\n\n### 확인 포인트\n- 날짜: 2026-06-18\n- 출처: Basenor (블로그, 비공식)\n\n출처: https://x.ai/news/grok-databricks",
          "source": "https://x.ai/news/grok-databricks",
          "officialUrl": "https://x.ai/news/grok-databricks",
          "slug": "xai-grok-databricks-agent-bricks-data-2725ca1c",
          "tags": [
            "xAI",
            "Databricks",
            "Agent"
          ]
        }
      ]
    },
    {
      "name": "Mistral AI",
      "color": "#FF7000",
      "posts": [
        {
          "date": "6/23",
          "platform": "X+Threads",
          "title": "Mistral OCR 4 공개 — 170개 언어 문서 인식 SOTA, 단일 컨테이너 셀프호스팅",
          "featured": true,
          "deck": "170개 언어를 처리하고 단일 컨테이너로 셀프호스팅되는 문서 OCR SOTA 모델",
          "summary": "Mistral AI가 문서 인텔리전스용 OCR 4를 공개했다. 170개 언어(10개 언어군)를 처리하고 OlmOCRBench 85.20·OmniDocBench 93.07을 기록했으며 단일 컨테이너 셀프호스팅을 지원한다. API $4 / batch $2 / Document AI $5(1,000페이지당) 가격이다.",
          "content": "**이게 뭐예요?**\nMistral AI가 문서 인식·이해용 OCR 4 모델을 공개했다.\n\n**무엇이 달라졌나?**\n- 170개 언어(10개 언어군) 처리\n- OlmOCRBench 85.20, OmniDocBench 93.07 기록(벤더 측 벤치마크)\n- 단일 컨테이너 셀프호스팅 지원\n- 가격: API $4 / batch $2 / Document AI $5 (각 1,000페이지당)\n\n**어떻게 읽을까?**\n다국어 문서 처리와 자체 인프라 운용(셀프호스팅)을 동시에 노린 모델이다. 벤치마크 수치는 Mistral이 발표한 값이다.\n\n**확인 포인트**\n- 언어: 170개\n- 셀프호스팅: 단일 컨테이너\n- 벤치마크: 벤더 측 수치\n\n출처: mistral.ai",
          "source": "https://mistral.ai/news/ocr-4/",
          "officialUrl": "https://mistral.ai/news/ocr-4/",
          "slug": "mistral-ocr-4-170-sota-6814b559",
          "tags": [
            "Mistral",
            "모델/제품",
            "문서AI"
          ],
          "backupUrls": [
            {
              "label": "공식 문서 (Studio)",
              "url": "https://mistral.ai/products/studio/"
            },
            {
              "label": "MarkTechPost",
              "url": "https://www.marktechpost.com/2026/06/23/mistral-ocr-4/"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/mistral-ocr-4-공개-170개-언어-문서-인식-sota-단일-컨-5bf2bc3d.png",
            "alt": "Mistral OCR 4 공개 — 170개 언어 문서 인식 SOTA, 단일 컨테이너 셀프호스팅"
          },
        }
      ]
    },
    {
      "name": "Perplexity",
      "color": "#20B2AA",
      "posts": [
        {
          "date": "6/18",
          "platform": "X+Threads",
          "title": "Perplexity, 에이전트용 자가개선 메모리 'Brain' 공개 (Perplexity Computer)",
          "featured": true,
          "deck": "Perplexity Computer가 작업하며 스스로 기억을 다듬는 메모리",
          "summary": "Perplexity가 Perplexity Computer용 자가개선 메모리 시스템 'Brain'을 공개했다. 컨텍스트 그래프 기반으로 사용할수록 기억을 다듬는다. 정확도 +25%·재현 +16%·비용 -13% 수치는 벤더 발표값이며 본문은 봇 차단으로 직접 확인되지 않았다.",
          "content": "**이게 뭐예요?**\nPerplexity가 Perplexity Computer를 위한 자가개선 메모리 시스템 'Brain'을 공개했다.\n\n**무엇이 달라졌나?**\n- 컨텍스트 그래프(context-graph) 기반 메모리\n- 사용할수록 스스로 기억을 다듬는 자가개선 방식\n- 성능: 정확도 +25%, 재현 +16%, 비용 -13%(벤더 발표값)\n\n**어떻게 읽을까?**\n에이전트가 세션을 넘어 맥락을 축적·정리하는 메모리 경쟁의 한 사례다. 성능 수치는 Perplexity가 발표한 값으로, 독립 검증 수치가 아니다.\n\n**확인 포인트**\n- 대상 제품: Perplexity Computer\n- 수치 출처: 벤더 발표(독립 검증 아님), 본문 봇 차단으로 직접 미확인\n\n출처: perplexity.ai",
          "source": "https://www.perplexity.ai/hub/blog/self-improving-memory-for-agents",
          "officialUrl": "https://www.perplexity.ai/hub/blog/self-improving-memory-for-agents",
          "slug": "perplexity-brain-perplexity-computer-bee9494a",
          "tags": [
            "Perplexity",
            "Agent",
            "모델/제품"
          ],
          "backupUrls": [
            {
              "label": "MarkTechPost",
              "url": "https://www.marktechpost.com/2026/06/18/perplexity-launches-brain/"
            }
          ]
        }
      ]
    },
    {
      "name": "Sakana AI",
      "color": "#3B82F6",
      "posts": [
        {
          "date": "6/22",
          "platform": "X+Threads",
          "title": "Sakana AI 'Fugu' 공개 — 멀티 에이전트 오케스트레이션을 하나의 모델로",
          "featured": true,
          "deck": "단일 API로 멀티 에이전트를 지휘하는 Fugu, 주장과 실사용 갈려",
          "summary": "Sakana AI가 멀티 에이전트 오케스트레이션을 단일 OpenAI 호환 API로 다루는 'Fugu'(및 Fugu Ultra)를 공개했다. 벤더는 Gemini 3.1 Pro·Opus 4.8·GPT-5.5를 능가하고 Fable 5와 동급이라 주장하나, 독립 사용 보고(TechTimes)는 실사용에서 약 30분 대기를 지적했다. Vending-Bench에는 미수록이다.",
          "content": "**이게 뭐예요?**\nSakana AI가 멀티 에이전트를 하나의 모델처럼 다루는 'Fugu'(와 상위판 Fugu Ultra)를 공개했다. 단일 OpenAI 호환 API로 여러 에이전트를 지휘한다.\n\n**무엇이 달라졌나?**\n- 단일 API 멀티 에이전트 오케스트레이션(Fugu / Fugu Ultra)\n- ICLR 2026 논문 TRINITY(arXiv:2512.04695)·Conductor(arXiv:2512.04388) 기반\n\n**어떻게 읽을까?**\n벤더 주장과 독립 보고를 나눠서 봐야 한다. Sakana 자체 벤치마크는 Gemini 3.1 Pro·Opus 4.8·GPT-5.5를 능가하고 Fable 5와 동급이라 주장한다. 반면 독립 사용 보고(TechTimes, 6/24)는 실사용에서 약 30분 대기를 지적했다. Andon Labs Vending-Bench에는 Fugu 항목이 없다.\n\n**확인 포인트**\n- 구성: Fugu / Fugu Ultra (단일 API)\n- 성능: 벤더 자체 벤치마크(독립 검증 아님)\n- 독립 보고: TechTimes 실사용 약 30분 대기\n- 독립 평가: Vending-Bench 미수록\n\n출처: sakana.ai",
          "source": "https://sakana.ai/fugu-release/",
          "officialUrl": "https://sakana.ai/fugu-release/",
          "slug": "sakana-ai-fugu-57e543cc",
          "tags": [
            "Sakana",
            "모델/제품",
            "Agent"
          ],
          "backupUrls": [
            {
              "label": "공식 (제품)",
              "url": "https://sakana.ai/fugu/"
            },
            {
              "label": "TechTimes (독립 사용 보고)",
              "url": "https://www.techtimes.com/articles/318968/20260624/ai-orchestrator-sakana-fugu-claims-fable-5-parity-real-world-tests-reveal-30-minute-waits.htm"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/sakana-ai-fugu-공개-멀티-에이전트-오케스트레이션을-하나의-모-2b9f8daa.png",
            "alt": "Sakana AI 'Fugu' 공개 — 멀티 에이전트 오케스트레이션을 하나의 모델로"
          },
        }
      ]
    },
    {
      "name": "AI Industry",
      "color": "#6B7280",
      "posts": [
        {
          "date": "6/23",
          "platform": "X+Threads",
          "title": "Latitude V2 공개 — 오픈소스 AI 에이전트 모니터링 플랫폼 (MIT)",
          "featured": false,
          "deck": "OpenTelemetry로 에이전트를 관측·평가하는 MIT 오픈소스",
          "summary": "Latitude가 오픈소스 AI 에이전트 모니터링 플랫폼 V2를 공개했다. MIT 라이선스, OpenTelemetry 연동, 평가·드리프트 추적을 제공한다. 버전 전용 공식 발표 URL은 확인되지 않아 홈페이지·GitHub를 기준 링크로 둔다.",
          "content": "**이게 뭐예요?**\nLatitude가 오픈소스 AI 에이전트 모니터링 플랫폼 V2를 공개했다.\n\n**무엇이 달라졌나?**\n- MIT 라이선스 오픈소스\n- OpenTelemetry 연동\n- 평가(eval)·드리프트(drift) 추적\n\n**어떻게 읽을까?**\n에이전트를 운영에서 관측·평가하는 오픈소스 옵저버빌리티 흐름이다. 버전 전용 공식 발표 페이지가 없어 홈페이지·GitHub를 기준으로 둔다.\n\n**확인 포인트**\n- 라이선스: MIT\n- 기준 링크: 홈페이지·GitHub(버전 전용 permalink 미확인)\n\n출처: latitude.so, GitHub",
          "source": "https://latitude.so/",
          "officialUrl": "https://latitude.so/",
          "slug": "latitude-v2-ai-mit-612cf9a4",
          "tags": [
            "Latitude",
            "개발도구",
            "오픈소스"
          ],
          "backupUrls": [
            {
              "label": "GitHub",
              "url": "https://github.com/latitude-dev/latitude-llm"
            },
            {
              "label": "Product Hunt",
              "url": "https://www.producthunt.com/products/latitude-4"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/latitude-v2-공개-오픈소스-ai-에이전트-모니터링-플랫폼-mit-77835bf8.png",
            "alt": "Latitude V2 공개 — 오픈소스 AI 에이전트 모니터링 플랫폼 (MIT)"
          },
        }
      ]
    },
    {
      "name": "ByteDance",
      "color": "#325AB4",
      "posts": [
        {
          "date": "6/23",
          "platform": "X+Threads",
          "title": "ByteDance, Doubao-Seed-2.1 Pro 정식 공개 — 코딩·에이전트 특화 (Volcano Engine FORCE)",
          "featured": false,
          "deck": "Volcano Engine Ark에 상장된 차세대 플래그십, 코딩·에이전트 시나리오 특화",
          "summary": "ByteDance가 베이징 Volcano Engine FORCE 컨퍼런스에서 Doubao-Seed-2.1 Pro(및 Turbo)를 정식 공개했다. '코딩·에이전트 시대용 차세대 대모델'로 포지셔닝했으며, Volcano Engine(Ark) 공식 사이트에 modelId doubao-seed-2-1-pro-260628로 상장됐다. 입력 6위안·출력 30위안 per M token, Coding/Agent 시나리오 종합비용은 1.96위안/M으로 책정했다.",
          "content": "**이게 뭐예요?**\nByteDance가 2026-06-23 베이징 Volcano Engine FORCE 컨퍼런스에서 Doubao-Seed-2.1 Pro(및 Turbo)를 정식 공개했다. '코딩·에이전트 시대용 차세대 대모델'로 포지셔닝했다.\n\n**무엇이 달라졌나?**\n- Volcano Engine(Ark) 공식 사이트에 modelId doubao-seed-2-1-pro-260628로 상장\n- 코딩 엔지니어링 딜리버리·에이전트 장기 체인·멀티모달 이해 3축 업그레이드\n- 가격: 입력 6위안/M, 출력 30위안/M, Coding·Agent 종합비용 1.96위안/M, 캐시히트 1.2위안\n- Doubao 일일 토큰 호출량 약 180조 도달(벤더 발표)\n\n**어떻게 읽을까?**\n새 publisher(ByteDance/Doubao)의 코딩·에이전트 플래그십이 공식 플랫폼에 상장된 사건이다. 가격과 호출 규모 신호가 함께 나왔다.\n\n**확인 포인트**\n- Volcano Engine Ark 상장은 확인됐으나 영문 1차 공식 블로그 본문은 미확정으로, 매체 보도를 보조 링크로 둔다.\n- GPT-5.5·Claude Opus 4.7·Gemini 3.1 Pro 대비 경쟁 가능 및 Claude Opus 4.6 상회 주장은 벤더 자체 주장으로, 독립 검증은 없다.\n\n출처: https://www.volcengine.com/experience/ark?mode=chat&modelId=doubao-seed-2-1-pro-260628",
          "source": "https://www.volcengine.com/experience/ark?mode=chat&modelId=doubao-seed-2-1-pro-260628",
          "officialUrl": "https://www.volcengine.com/experience/ark?mode=chat&modelId=doubao-seed-2-1-pro-260628",
          "slug": "bytedance-doubao-seed-2-1-pro-eda2ccee",
          "tags": [
            "ByteDance",
            "Doubao",
            "코딩 모델",
            "에이전트",
            "중국 모델"
          ],
          "backupUrls": [
            {
              "label": "Volcano Engine 공식",
              "url": "https://www.volcengine.com/"
            },
            {
              "label": "Pandaily (매체 보도)",
              "url": "https://pandaily.com/bytedance-doubao-2-1-seedance-2-5-jun2026"
            },
            {
              "label": "PANews (매체 보도)",
              "url": "https://www.panewslab.com/en/articles/019ef254-a455-74c8-8c8c-4d412be69a5f"
            },
            {
              "label": "ChainCatcher (매체 보도)",
              "url": "https://www.chaincatcher.com/en/article/2273020"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/bytedance-omnishow-human-object-interact-9e8425bf.png",
            "alt": "ByteDance, Doubao-Seed-2.1 Pro 정식 공개 — 코딩·에이전트 특화 (Volcano Engine FORCE)"
          },
        },
        {
          "date": "6/23",
          "platform": "X+Threads",
          "title": "ByteDance, Seedance 2.5·Seedream 5.0 Pro·Seed-Audio 1.0 공개 — 단일 패스 네이티브 30초 영상",
          "featured": false,
          "deck": "영상·이미지·오디오 생성 모델 동시 프리뷰, 정식 출시는 2026년 7월 초 목표",
          "summary": "같은 Volcano Engine FORCE에서 ByteDance가 영상 생성 모델 Seedance 2.5, 이미지 모델 Seedream 5.0 Pro, 오디오 모델 Seed-Audio 1.0을 공개했다. Seedance 2.5는 단일 패스로 네이티브 30초 영상을 만들고 멀티모달 레퍼런스를 최대 50개까지 동시 입력받는다고 한다. 현재 글로벌 기업 베타 단계이며 정식 출시는 2026년 7월 초가 목표다.",
          "content": "**이게 뭐예요?**\n2026-06-23 Volcano Engine FORCE에서 ByteDance가 생성 미디어 모델 3종을 공개했다.\n\n**무엇이 달라졌나?**\n- Seedance 2.5(영상): 단일 패스로 네이티브 30초 영상 생성, 멀티모달 레퍼런스 최대 50개 동시 입력(벤더 주장)\n- Seedream 5.0 Pro(이미지), Seed-Audio 1.0(오디오) 동시 공개\n- Seedance 2.5는 글로벌 기업 베타 단계, 공개 출시 2026년 7월 초 목표\n- Seedance 2.0도 동시 4K 출력 업데이트\n\n**어떻게 읽을까?**\n같은 FORCE 행사에서 나온 생성 미디어 3종(영상·이미지·오디오) 프리뷰다. Doubao-Seed-2.1 Pro(LLM)와 같은 행사지만 제품군이 다르다. 단일 패스 30초 영상은 영상 생성 경쟁의 신호다.\n\n**확인 포인트**\n- 정식 출시 전 프리뷰/베타 단계로 GA가 아니다. 사용 가능 시점·실제 출력 품질은 정식 출시 후 확인이 필요하다.\n- 30초 영상·레퍼런스 50개 등은 ByteDance 자체 주장으로, 독립 벤치마크는 부재하다.\n\n출처: https://seed.bytedance.com/",
          "source": "https://seed.bytedance.com/",
          "officialUrl": "https://seed.bytedance.com/",
          "slug": "bytedance-seedance-2-5-seedream-5-0-8b22e4ea",
          "tags": [
            "ByteDance",
            "Seedance",
            "Seedream",
            "영상 생성",
            "중국 모델"
          ],
          "backupUrls": [
            {
              "label": "Volcano Engine 공식",
              "url": "https://www.volcengine.com/"
            },
            {
              "label": "Pandaily (매체 보도)",
              "url": "https://pandaily.com/bytedance-doubao-2-1-seedance-2-5-jun2026"
            },
            {
              "label": "TechTimes (매체 보도)",
              "url": "https://www.techtimes.com/articles/318975/20260624/bytedance-seedance-25-native-30-second-ai-video-no-stitching-required.htm"
            },
            {
              "label": "aibase (매체 보도)",
              "url": "https://news.aibase.com/news/29094"
            }
          ],
          "thumbnail": {
            "src": "/og-cache/bytedance-seedance-2-0-replicate-fal-정식--f52c21c8.png",
            "alt": "ByteDance, Seedance 2.5·Seedream 5.0 Pro·Seed-Audio 1.0 공개 — 단일 패스 네이티브 30초 영상"
          },
        }
      ]
    }
  ]
};
