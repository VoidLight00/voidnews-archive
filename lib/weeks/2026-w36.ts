import type { WeeklyData } from "../data";

// Editorial cutoff: 2026-09-08 22:43 KST. Verified timestamps use KST; Anthropic date-only sources retain publisher dates with visible timezone disclosures.
export const week36: WeeklyData = {
  "week": 36,
  "year": 2026,
  "slug": "2026-w36",
  "period": "8/31 ~ 9/6",
  "totalPosts": 23,
  "companies": [
    {
      "name": "Google",
      "color": "#4285F4",
      "posts": [
        {
          "date": "9/04",
          "platform": "Web",
          "title": "WeatherNext 3, 위성 관측으로 매시간 세계 날씨 예측",
          "deck": "주요 지표는 5km 격자로 제공하고 클라우드 데이터로 배포",
          "summary": "Google은 WeatherNext 3가 매시간 정지궤도 위성 관측을 받아 예측을 갱신한다고 발표했습니다. 온도·수분 등 주요 지표는 5km, 다른 지표는 더 성긴 격자로 제공합니다. 예측 데이터는 BigQuery·Earth Engine·Cloud Storage에서 제공합니다.",
          "content": "Google은 WeatherNext 3가 매시간 정지궤도 위성 관측을 받아 예측을 갱신한다고 발표했습니다. 온도·수분 등 주요 지표는 5km, 다른 지표는 더 성긴 격자로 제공합니다. 예측 데이터는 BigQuery·Earth Engine·Cloud Storage에서 제공합니다.",
          "source": "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/",
          "officialUrl": "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "Google"
          ],
          "slug": "weather-next-3-hourly-satellite-forecast",
          "thumbnail": {
            "src": "/source-images/611a25cbfb09d8ecca334c42989e86930a9990e2a8a4f0d6bca3da8a559fd781.png",
            "alt": "WeatherNext 3: Our most advanced global weather AI model — source link share preview",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Introducing WeatherNext 3",
            "deck": "Google introduced WeatherNext 3 with hourly updates using live satellite observations.",
            "summary": "Google announced WeatherNext 3, which updates forecasts hourly using geostationary satellite observations. Key surface variables such as temperature and moisture use a 5-kilometer grid; other variables use coarser grids. Forecast data is available through BigQuery, Earth Engine and Cloud Storage.",
            "content": "Google announced WeatherNext 3, which updates forecasts hourly using geostationary satellite observations. Key surface variables such as temperature and moisture use a 5-kilometer grid; other variables use coarser grids. Forecast data is available through BigQuery, Earth Engine and Cloud Storage."
          }
        },
        {
          "date": "9/3 00:00",
          "platform": "Web",
          "title": "Gemini 3.8 Flash·Cyber 공개",
          "summary": "Google이 Gemini 3.8 Flash와 Gemini 3.8 Flash Cyber를 발표했습니다. Flash는 일반용 모델이며, Cyber는 Fairwind 프로그램을 통해 선정된 방어 조직에 제한적으로 제공됩니다. 보안 성능에 대한 설명은 Google의 발표이며 독립 재현 결과가 아닙니다.",
          "content": "Google이 Gemini 3.8 Flash와 Gemini 3.8 Flash Cyber를 발표했습니다. Flash는 일반용 모델이며, Cyber는 Fairwind 프로그램을 통해 선정된 방어 조직에 제한적으로 제공됩니다. 보안 성능에 대한 설명은 Google의 발표이며 독립 재현 결과가 아닙니다.",
          "source": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/",
          "officialUrl": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/",
          "verifiedAt": "2026-09-08",
          "slug": "google-20260903-gemini-3-8-flash-cyber",
          "thumbnail": {
            "src": "/source-images/bfb7b8c2c1b91408bebe70bfb83831e795018d7ff4158c0b945111212e3fc9af.png",
            "alt": "Introducing Gemini 3.8 Flash and 3.8 Flash Cyber — source link share preview",
            "provenance": "source-share-preview"
          },
          "tags": [
            "AI",
            "2026-w36",
            "Google"
          ],
          "en": {
            "title": "Introducing Gemini 3.8 Flash and 3.8 Flash Cyber",
            "summary": "Google announced Gemini 3.8 Flash and Gemini 3.8 Flash Cyber. Flash is a general-purpose model, while Cyber is restricted to trusted defenders through Fairwind. Security performance descriptions are Google’s claims, not independently reproduced results.",
            "content": "Google announced Gemini 3.8 Flash and Gemini 3.8 Flash Cyber. Flash is a general-purpose model, while Cyber is restricted to trusted defenders through Fairwind. Security performance descriptions are Google’s claims, not independently reproduced results."
          }
        },
        {
          "date": "9/3 00:40",
          "platform": "Web",
          "title": "Google Fairwind, 정부·기업 보안 방어 프로그램",
          "summary": "Google이 정부·기업·보안 파트너를 대상으로 제한 접근형 Fairwind 프로그램을 발표했습니다. Gemini 3.8 Flash Cyber와 CodeMender를 결합해 취약점 탐지·검증·수정을 지원합니다. 참여 조직은 내부 보안·사고 대응·침투 테스트 팀으로 접근을 제한하고 다중 인증 등의 보호 조치를 적용해야 합니다.",
          "content": "Google이 정부·기업·보안 파트너를 대상으로 제한 접근형 Fairwind 프로그램을 발표했습니다. Gemini 3.8 Flash Cyber와 CodeMender를 결합해 취약점 탐지·검증·수정을 지원합니다. 참여 조직은 내부 보안·사고 대응·침투 테스트 팀으로 접근을 제한하고 다중 인증 등의 보호 조치를 적용해야 합니다.",
          "source": "https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/",
          "officialUrl": "https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/",
          "verifiedAt": "2026-09-08",
          "slug": "google-20260903-fairwind-program",
          "thumbnail": {
            "src": "/source-images/045a4ef32be355a461b77be4726234df338bf62e669b738155cb948ca1fcf174.png",
            "alt": "Google’s Fairwind Program: Cyber defense tools for trusted partners — source link share preview",
            "provenance": "source-share-preview"
          },
          "tags": [
            "AI",
            "2026-w36",
            "Google"
          ],
          "en": {
            "title": "Proactive cyber defense for governments and enterprises",
            "summary": "Google announced Fairwind, a limited-access program for government, enterprise and cybersecurity partners. It combines Gemini 3.8 Flash Cyber with CodeMender for vulnerability detection, verification and remediation. Participants must restrict access to internal security, incident-response or penetration-testing teams and implement protections such as multi-factor authentication.",
            "content": "Google announced Fairwind, a limited-access program for government, enterprise and cybersecurity partners. It combines Gemini 3.8 Flash Cyber with CodeMender for vulnerability detection, verification and remediation. Participants must restrict access to internal security, incident-response or penetration-testing teams and implement protections such as multi-factor authentication."
          }
        },
        {
          "date": "9/2 02:00",
          "platform": "Web",
          "title": "Gemini, 필요한 구간을 다시 살피는 영상 분석 기능 공개",
          "summary": "Google이 Gemini 3.7 Flash·3.6 Flash·3.5 Flash-Lite에 에이전트형 영상 이해 기능을 추가했습니다. 모델이 영상·음성·자막에서 필요한 구간을 골라 읽고 다시 확인합니다.",
          "deck": "고정 프레임 처리 대신 구간·속도·입력 유형을 동적으로 선택",
          "content": "Google은 업로드 영상과 YouTube 영상을 대상으로 Gemini API의 에이전트형 영상 이해 기능을 공개했습니다. Google AI Studio와 Gemini Enterprise Agent Platform에서 이용할 수 있으며, 입력 설정의 processing을 agentic으로 지정합니다.\n\n기존 고정 프레임 처리와 달리 모델이 프레임·음성·자막 중 필요한 신호와 시간 구간을 선택합니다. 빠른 움직임이 있는 구간은 더 높은 프레임 속도로 다시 살펴보고, 긴 영상에서 특정 순간을 찾거나 반복 동작과 물체를 세는 데 활용합니다.\n\nGoogle은 자사 평가에서 토큰 소비 최대 88% 감소, 분석 비용 최대 66% 감소, 정확도 최대 7% 개선을 보고했습니다. 이는 평가 조건에서의 최대치입니다. 별도 기능 요금 없이 일반 Gemini API 토큰 요금을 적용합니다. Gemini 앱 적용은 추후 예정이며 Ask YouTube 적용도 향후 수개월 계획으로 구분했습니다.",
          "source": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/",
          "officialUrl": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/",
          "verifiedAt": "2026-09-08",
          "slug": "google-20260902-agentic-video-understanding",
          "en": {
            "title": "Gemini adds agentic video understanding",
            "summary": "Google added agentic video understanding to Gemini 3.7 Flash, 3.6 Flash and 3.5 Flash-Lite, letting models select and revisit relevant video, audio and transcript segments.",
            "deck": "Models choose which moments, speeds and modalities to inspect",
            "content": "The feature is available for uploaded and YouTube videos through the Gemini API in Google AI Studio and Gemini Enterprise Agent Platform. Developers enable it by setting processing to agentic.\n\nInstead of ingesting a video at a fixed frame rate, the model dynamically selects frames, audio or transcripts and revisits relevant time windows. Uses include sub-second moment retrieval, long-video search, anomaly detection and counting actions or objects.\n\nGoogle reports up to 88% lower token use, 66% lower analysis costs and 7% better accuracy in its benchmarks. These are vendor-reported maxima. Standard Gemini API token pricing applies without an additional feature fee. Gemini app rollout remains upcoming; Ask YouTube integration is planned for the coming months."
          },
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "Google"
          ]
        },
        {
          "date": "9/2 05:51",
          "platform": "Web",
          "title": "Gemini CLI 0.58, macOS 샌드박스의 컨테이너 접근 격리 보강",
          "summary": "Gemini CLI 0.58.0이 macOS Seatbelt에서 Docker·컨테이너 런타임 소켓과 실행 파일을 격리하고 경로 무시 규칙의 심볼릭 링크 처리를 수정했습니다.",
          "deck": "컨테이너 접근 경계와 취소 후 재시도 상태를 수정",
          "content": "공식 0.58.0 릴리스는 macOS Seatbelt에서 Docker 및 컨테이너 런타임의 소켓·실행 파일 격리를 보강했습니다. 경로 무시 처리에서 심볼릭 링크를 일관되게 평가하도록 고쳤고, 쓰기 정책에는 최상위 안전 검사기를 선언했습니다.\n\nA2A 서버는 새 메시지 턴에서 오래된 취소 오류를 지우도록 바뀌었습니다. 릴리스 목록에는 대화 기록 롤백과 재시도 안내 최적화도 포함됩니다.",
          "source": "https://github.com/google-gemini/gemini-cli/releases/tag/v0.58.0",
          "officialUrl": "https://github.com/google-gemini/gemini-cli/releases/tag/v0.58.0",
          "verifiedAt": "2026-09-08",
          "slug": "gemini-cli-20260902-v0-58-0",
          "en": {
            "title": "Gemini CLI 0.58 strengthens macOS container isolation",
            "summary": "Gemini CLI 0.58.0 isolates Docker and container-runtime sockets and binaries in macOS Seatbelt and fixes symlink evaluation in ignored-path handling.",
            "deck": "The release fixes sandbox boundaries and cancellation state",
            "content": "The official 0.58.0 release isolates Docker and container-runtime sockets and binaries in macOS Seatbelt. It also makes symlink evaluation consistent in ignored-path handling and declares top-level safety checkers in write-policy configuration.\n\nThe A2A server clears stale cancellation errors on new message turns. The changelog also lists history rollback and retry-nudge optimizations."
          },
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "Google"
          ]
        }
      ]
    },
    {
      "name": "Cursor",
      "color": "#111827",
      "posts": [
        {
          "date": "9/02",
          "platform": "Web",
          "title": "Cursor, 사내 장비에서 실행하는 자체 호스팅 에이전트 공개",
          "deck": "코드·빌드 결과·시크릿을 내부 인프라에 유지하며 팀 작업자 풀과 컴퓨터 사용 지원",
          "summary": "Cursor는 도구 실행을 내부 네트워크에 두는 자체 호스팅 장비를 소개했습니다. 개인 장비 연결과 팀 작업자 풀을 지원하며 코드·빌드 결과·시크릿은 내부 인프라에 유지된다고 설명합니다. 필요한 데스크톱 패키지를 갖춘 Linux·Mac 작업자는 클릭·입력·스크린샷·브라우저 조작을 수행할 수 있습니다.",
          "content": "Cursor는 도구 실행을 내부 네트워크에 두는 자체 호스팅 장비를 소개했습니다. 개인 장비 연결과 팀 작업자 풀을 지원하며 코드·빌드 결과·시크릿은 내부 인프라에 유지된다고 설명합니다. 필요한 데스크톱 패키지를 갖춘 Linux·Mac 작업자는 클릭·입력·스크린샷·브라우저 조작을 수행할 수 있습니다.\n\n공식 변경 기록은 날짜를 UTC 자정으로 기록합니다. 9월 2일 표시는 이 날짜 값에 따른 것이며 정확한 공개 시각은 확정하지 않습니다.",
          "source": "https://cursor.com/changelog/self-hosted-machines",
          "officialUrl": "https://cursor.com/changelog/self-hosted-machines",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "Cursor"
          ],
          "slug": "cursor-self-hosted-machines",
          "thumbnail": {
            "src": "/source-images/32f442027b274031aba977fcb951445ce8dd0c6b2d2ec742f97243c41f415f2e.png",
            "alt": "Self-hosted machines · Cursor — source link share preview",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Self-hosted machines",
            "deck": "Cursor introduced self-hosted machines that keep tool execution inside an organization’s network.",
            "summary": "Cursor introduced self-hosted machines that keep tool execution inside the network. Personal connections and team worker pools are supported; Cursor says code, build outputs and secrets remain on internal infrastructure. Linux and Mac workers with the necessary desktop packages can click, type, take screenshots and operate a browser.",
            "content": "Cursor introduced self-hosted machines that keep tool execution inside the network. Personal connections and team worker pools are supported; Cursor says code, build outputs and secrets remain on internal infrastructure. Linux and Mac workers with the necessary desktop packages can click, type, take screenshots and operate a browser.\n\nThe changelog encodes its date as UTC midnight. September 2 follows that date value, not a confirmed exact release time."
          }
        }
      ]
    },
    {
      "name": "GitHub",
      "color": "#24292F",
      "posts": [
        {
          "date": "9/04",
          "platform": "Web",
          "title": "GitHub Copilot, Gemini 3.8 Flash 순차 제공",
          "deck": "Pro부터 Enterprise까지 제공하고 2026년 말까지 도입 가격 적용",
          "summary": "GitHub는 Gemini 3.8 Flash를 Copilot Pro·Pro+·Max·Business·Enterprise에 순차 제공한다고 발표했습니다. 사용량 기반 과금에서 제공자의 도입 가격은 2026년 12월 31일까지 적용됩니다. 조직 관리자의 모델 정책에 따라 접근이 달라집니다.",
          "content": "GitHub는 Gemini 3.8 Flash를 Copilot Pro·Pro+·Max·Business·Enterprise에 순차 제공한다고 발표했습니다. 사용량 기반 과금에서 제공자의 도입 가격은 2026년 12월 31일까지 적용됩니다. 조직 관리자의 모델 정책에 따라 접근이 달라집니다.",
          "source": "https://github.blog/changelog/2026-09-03-gemini-3-8-flash-is-now-available-in-github-copilot",
          "officialUrl": "https://github.blog/changelog/2026-09-03-gemini-3-8-flash-is-now-available-in-github-copilot",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "GitHub"
          ],
          "slug": "github-copilot-gemini-3-8-flash",
          "thumbnail": {
            "src": "/source-images/facbd0803b0f14cf61fe2e8ac518de6130a4296bdfad1386dc84d67b4cba5baf.png",
            "alt": "Gemini 3.8 Flash is now available in GitHub Copilot - GitHub Changelog — source link share preview",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Gemini 3.8 Flash is now available in GitHub Copilot",
            "deck": "GitHub announced a gradual rollout of Gemini 3.8 Flash across Copilot clients.",
            "summary": "GitHub announced a gradual rollout of Gemini 3.8 Flash to Copilot Pro, Pro+, Max, Business and Enterprise. Introductory provider pricing under usage-based billing applies through December 31, 2026. Access is subject to administrator model policies.",
            "content": "GitHub announced a gradual rollout of Gemini 3.8 Flash to Copilot Pro, Pro+, Max, Business and Enterprise. Introductory provider pricing under usage-based billing applies through December 31, 2026. Access is subject to administrator model policies."
          }
        },
        {
          "date": "9/03",
          "platform": "Web",
          "title": "Copilot 앱·CLI, 콘텐츠 제외 정책 정식 지원",
          "deck": "관리자가 제외한 파일을 에이전트 작업 문맥에 사용하지 않도록 적용",
          "summary": "GitHub는 Copilot 앱과 CLI의 콘텐츠 제외 정책을 Business·Enterprise 고객에게 정식 제공합니다. 기업·조직·저장소 관리자가 설정한 정책에 따라 제외된 파일은 에이전트 작업 문맥으로 사용되지 않습니다.",
          "content": "GitHub는 Copilot 앱과 CLI의 콘텐츠 제외 정책을 Business·Enterprise 고객에게 정식 제공합니다. 기업·조직·저장소 관리자가 설정한 정책에 따라 제외된 파일은 에이전트 작업 문맥으로 사용되지 않습니다.",
          "source": "https://github.blog/changelog/2026-09-02-content-exclusions-generally-available-in-copilot-app-and-cli",
          "officialUrl": "https://github.blog/changelog/2026-09-02-content-exclusions-generally-available-in-copilot-app-and-cli",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "GitHub"
          ],
          "slug": "github-copilot-content-exclusions-ga",
          "en": {
            "title": "Content exclusions generally available in Copilot app and CLI",
            "deck": "GitHub announced general availability of content exclusions in the Copilot app and CLI.",
            "summary": "GitHub made content exclusions generally available in the Copilot app and CLI for Business and Enterprise customers. Files excluded by enterprise, organization or repository administrators are not used as agent context.",
            "content": "GitHub made content exclusions generally available in the Copilot app and CLI for Business and Enterprise customers. Files excluded by enterprise, organization or repository administrators are not used as agent context."
          }
        },
        {
          "date": "9/04",
          "platform": "Web",
          "title": "GitHub, 일부 Copilot 모델 10월 2일 지원 종료 예고",
          "deck": "Gemini 3.8 Flash·Kimi K3·Claude Opus 5로 전환 안내",
          "summary": "GitHub는 Copilot의 Gemini 3.5·3.6 Flash, Kimi K2.7 Code, Claude Opus 4.7을 2026년 10월 2일 지원 종료한다고 예고했습니다. 권장 대체 모델은 각각 Gemini 3.8 Flash, Kimi K3, Claude Opus 5입니다. 관리자는 대체 모델을 조직 정책에서 활성화해야 할 수 있습니다.",
          "content": "GitHub는 Copilot의 Gemini 3.5·3.6 Flash, Kimi K2.7 Code, Claude Opus 4.7을 2026년 10월 2일 지원 종료한다고 예고했습니다. 권장 대체 모델은 각각 Gemini 3.8 Flash, Kimi K3, Claude Opus 5입니다. 관리자는 대체 모델을 조직 정책에서 활성화해야 할 수 있습니다.",
          "source": "https://github.blog/changelog/2026-09-03-upcoming-deprecation-of-selected-github-copilot-models",
          "officialUrl": "https://github.blog/changelog/2026-09-03-upcoming-deprecation-of-selected-github-copilot-models",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "GitHub"
          ],
          "slug": "github-copilot-model-deprecations-october",
          "en": {
            "title": "Upcoming deprecation of selected GitHub Copilot models",
            "deck": "GitHub announced October 2 deprecations for selected Copilot models and identified replacements.",
            "summary": "GitHub scheduled the deprecation of Gemini 3.5 and 3.6 Flash, Kimi K2.7 Code, and Claude Opus 4.7 in Copilot for October 2, 2026. Recommended replacements are Gemini 3.8 Flash, Kimi K3, and Claude Opus 5 respectively. Administrators may need to enable the replacements in model policies.",
            "content": "GitHub scheduled the deprecation of Gemini 3.5 and 3.6 Flash, Kimi K2.7 Code, and Claude Opus 4.7 in Copilot for October 2, 2026. Recommended replacements are Gemini 3.8 Flash, Kimi K3, and Claude Opus 5 respectively. Administrators may need to enable the replacements in model policies."
          }
        },
        {
          "date": "9/5 03:59",
          "platform": "Web",
          "title": "GitHub Copilot에 GPT-6 Astra 정식 제공",
          "summary": "GitHub이 Copilot Pro+·Max·Business·Enterprise 이용자를 대상으로 GPT-6 Astra 제공을 발표했습니다. 모델 선택기 노출은 순차 진행되며 제공자 정가에 따른 사용량 과금이 적용됩니다. 조직·기업 관리자는 모델 정책으로 접근을 관리할 수 있습니다. 이는 GitHub Copilot 제공 발표이며 OpenAI 자체 출시일을 확인한 기록은 아닙니다.",
          "content": "GitHub이 Copilot Pro+·Max·Business·Enterprise 이용자를 대상으로 GPT-6 Astra 제공을 발표했습니다. 모델 선택기 노출은 순차 진행되며 제공자 정가에 따른 사용량 과금이 적용됩니다. 조직·기업 관리자는 모델 정책으로 접근을 관리할 수 있습니다. 이는 GitHub Copilot 제공 발표이며 OpenAI 자체 출시일을 확인한 기록은 아닙니다.",
          "source": "https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot",
          "officialUrl": "https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot",
          "verifiedAt": "2026-09-08",
          "slug": "github-20260905-copilot-gpt-6-astra",
          "thumbnail": {
            "src": "/source-images/32d7ccc61dfd83616ac2eb194e550bffe61d23553f56a38371439c845ce59142.png",
            "alt": "GPT-6 Astra is generally available in GitHub Copilot - GitHub Changelog — source link share preview",
            "provenance": "source-share-preview"
          },
          "tags": [
            "AI",
            "2026-w36",
            "GitHub"
          ],
          "en": {
            "title": "GPT-6 Astra is generally available in GitHub Copilot",
            "summary": "GitHub announced GPT-6 Astra availability for Copilot Pro+, Max, Business and Enterprise users. Rollout is gradual and usage is billed at provider list pricing. Organization and enterprise administrators can manage access through model policies. This records GitHub Copilot availability, not an independently verified OpenAI launch date.",
            "content": "GitHub announced GPT-6 Astra availability for Copilot Pro+, Max, Business and Enterprise users. Rollout is gradual and usage is billed at provider list pricing. Organization and enterprise administrators can manage access through model policies. This records GitHub Copilot availability, not an independently verified OpenAI launch date."
          }
        },
        {
          "date": "8/31 17:39",
          "platform": "Web",
          "title": "GitHub, VS Code 8월 Copilot 업데이트 묶음 공개",
          "deck": "VS Code 1.132~1.135의 병렬 대화·세션 공유·브라우저 주석·받아쓰기 개선 정리",
          "summary": "GitHub이 8월 동안 배포된 VS Code 1.132~1.135의 Copilot 기능을 정리했습니다. 병렬 대화, 세션 공유, 브라우저 주석, 받아쓰기 개선이 포함됩니다. 주의: 8월 31일 동시 출시가 아니라 월간 정리 글입니다.",
          "content": "**8월 여러 릴리스를 한 번에 정리했습니다**\n\nGitHub은 VS Code 1.132부터 1.135까지 8월 동안 배포된 Copilot 변경 사항을 묶었습니다. 병렬 대화와 세션 공유, 브라우저 주석, 받아쓰기 개선 등을 포함합니다.\n\n**발표일과 기능 출시일을 구분해야 합니다**\n\n8월 31일은 월간 정리 글의 게시일입니다. 각 기능은 8월 여러 시점에 배포됐으므로 같은 날 일괄 출시됐다고 표현하지 않았습니다.",
          "source": "https://github.blog/changelog/2026-08-31-github-copilot-in-vs-code-august-2026-releases",
          "officialUrl": "https://github.blog/changelog/2026-08-31-github-copilot-in-vs-code-august-2026-releases",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "GitHub"
          ],
          "slug": "github-20260831-copilot-vscode-august-roundup",
          "en": {
            "title": "GitHub recaps August Copilot updates in VS Code",
            "deck": "The roundup covers VS Code 1.132 through 1.135 and features shipped throughout August.",
            "summary": "GitHub recapped Copilot updates shipped across VS Code 1.132 through 1.135, including parallel chats, session sharing, browser annotations and dictation improvements. This is an August roundup, not a simultaneous August 31 release.",
            "content": "**Several August releases are summarized together**\n\nGitHub recaps Copilot changes shipped across VS Code 1.132 through 1.135, including parallel chats, session sharing, browser annotations and dictation improvements.\n\n**Publication and feature dates differ**\n\nAugust 31 is the roundup publication date. The features shipped at different points throughout August and are not described as one same-day release."
          }
        },
        {
          "date": "9/01 23:29",
          "platform": "Web",
          "title": "Claude Fable 5.1, GitHub Copilot에 순차 제공",
          "deck": "장기 자율 코딩용 모델을 Pro+·Max·Business·Enterprise에 제공",
          "summary": "GitHub이 Claude Fable 5.1을 Copilot에 순차 제공하기 시작했습니다. Pro+·Max·Business·Enterprise가 대상이며 기업 관리자는 모델 정책을 활성화해야 합니다. 주의: 데이터 보존이 기본이며 일부 적격 기업만 무보존 접근을 이용할 수 있습니다.",
          "content": "**GitHub Copilot 통합이 시작됐습니다**\n\nGitHub은 장기 자율 코딩과 지식 작업용 Claude Fable 5.1을 Copilot에 제공한다고 발표했습니다. Pro+·Max·Business·Enterprise 요금제에서 순차 배포되며 Business·Enterprise 관리자는 모델 정책으로 접근을 관리합니다.\n\n**데이터 보존 조건을 확인해야 합니다**\n\nGitHub 설명에 따르면 안전 분류기 운영을 위해 데이터 보존이 기본으로 필요하고, 무보존 접근은 일부 적격 기업 고객에게 제공됩니다. 이 시각은 GitHub 통합 발표 시각이며 Anthropic 모델 자체의 최초 출시 시각을 뜻하지 않습니다.",
          "source": "https://github.blog/changelog/2026-09-01-claude-fable-5-1-generally-available-in-github-copilot",
          "officialUrl": "https://github.blog/changelog/2026-09-01-claude-fable-5-1-generally-available-in-github-copilot",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "GitHub",
            "Anthropic"
          ],
          "slug": "github-20260901-claude-fable-5-1-copilot",
          "en": {
            "title": "Claude Fable 5.1 rolls out in GitHub Copilot",
            "deck": "The long-horizon coding model is rolling out to Pro+, Max, Business and Enterprise plans.",
            "summary": "GitHub began a gradual Copilot rollout of Claude Fable 5.1 to Pro+, Max, Business and Enterprise. Enterprise administrators must enable model access. Data retention is required by default, with zero-retention access limited to eligible enterprise customers.",
            "content": "**The GitHub Copilot integration is rolling out**\n\nGitHub says Claude Fable 5.1, designed for long-horizon autonomous coding and knowledge work, is rolling out to Pro+, Max, Business and Enterprise. Business and Enterprise administrators control access through model policies.\n\n**Review retention terms**\n\nGitHub states that data retention is required by default for safety classifiers, while zero-retention access is available to certain eligible enterprise customers. This is the GitHub integration timestamp, not necessarily the model's first Anthropic release."
          }
        },
        {
          "date": "9/2 04:25",
          "platform": "Web",
          "title": "Copilot 코드 리뷰, 관리자 허용 시 PR 승인까지 수행",
          "summary": "GitHub Copilot 코드 리뷰가 승인 가능 여부를 표시하고, 관리자가 기능을 켜면 필수 승인 수에 포함되는 실제 승인도 제출합니다.",
          "deck": "승인 평가는 기본 제공, 실제 승인 권한은 기본 비활성",
          "content": "GitHub는 Copilot 코드 리뷰의 승인 기능을 Pro·Pro+·Max·Business·Enterprise 요금제에 공개 미리보기로 제공했습니다. 리뷰 개요의 승인 가능 평가는 그 자체로 병합 요건에 포함되지 않습니다.\n\n실제 승인은 기본적으로 꺼져 있습니다. 기업·조직·저장소 관리자가 허용하면 Copilot 승인을 저장소의 필수 승인 수에 포함할 수 있습니다. 저장소에서는 승인 가능한 파일 경로도 지정할 수 있습니다.\n\nCopilot 승인 뒤 새 커밋이 올라오면 승인은 취소되며, 새 승인을 받으려면 리뷰를 다시 요청해야 합니다.",
          "source": "https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests",
          "officialUrl": "https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/",
          "verifiedAt": "2026-09-08",
          "slug": "github-20260902-copilot-review-approvals",
          "en": {
            "title": "Copilot code review can submit pull-request approvals",
            "summary": "GitHub Copilot now assesses readiness to approve and, when enabled by admins, can submit approvals that count toward merge requirements.",
            "deck": "Readiness assessments are included; approval authority is off by default",
            "content": "The feature is in public preview for Copilot Pro, Pro+, Max, Business and Enterprise. Approval assessments appear in review overviews but do not themselves count toward merge requirements.\n\nActual approval is off by default. Enterprise, organization and repository administrators control whether Copilot may approve. Repository admins can also restrict approval to specific file paths.\n\nWhen new commits are pushed after approval, Copilot’s approval is dismissed. A new review can be requested for a fresh approval."
          },
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "GitHub"
          ]
        }
      ]
    },
    {
      "name": "H Company",
      "color": "#F59E0B",
      "posts": [
        {
          "date": "9/03",
          "platform": "Web",
          "title": "H Company, 다국어·멀티모달 인코더 NeoMME 공개",
          "deck": "260M·800M 모델이 하나의 양방향 Transformer로 텍스트와 이미지 처리",
          "summary": "H Company는 260M·800M 크기의 다국어·멀티모달 인코더 NeoMME를 소개했습니다. 하나의 양방향 Transformer가 텍스트 토큰과 이미지 패치를 함께 처리합니다. NeoMME-Retriever는 한 번의 처리로 dense·late-interaction 임베딩을 반환합니다.",
          "content": "H Company는 260M·800M 크기의 다국어·멀티모달 인코더 NeoMME를 소개했습니다. 하나의 양방향 Transformer가 텍스트 토큰과 이미지 패치를 함께 처리합니다. NeoMME-Retriever는 한 번의 처리로 dense·late-interaction 임베딩을 반환합니다.",
          "source": "https://huggingface.co/blog/Hcompany/neomme",
          "officialUrl": "https://huggingface.co/blog/Hcompany/neomme",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "H Company"
          ],
          "slug": "h-company-neomme-multimodal-encoder",
          "en": {
            "title": "NeoMME: an efficient Multimodal-native and Multilingual Encoder",
            "deck": "H Company introduced NeoMME, a family of multilingual encoders that jointly process text and images.",
            "summary": "H Company introduced NeoMME, multilingual multimodal encoders with 260M and 800M parameters. A single bidirectional Transformer processes text tokens and image patches. NeoMME-Retriever returns dense and late-interaction embeddings in one forward pass.",
            "content": "H Company introduced NeoMME, multilingual multimodal encoders with 260M and 800M parameters. A single bidirectional Transformer processes text tokens and image patches. NeoMME-Retriever returns dense and late-interaction embeddings in one forward pass."
          }
        }
      ]
    },
    {
      "name": "Hugging Face",
      "color": "#FFD21E",
      "posts": [
        {
          "date": "9/03",
          "platform": "Web",
          "title": "350M 모델, GRPO 100단계로 구조화 출력 준수 개선",
          "deck": "약 500개 샘플의 소규모 실험에서 IFStruct 통과율 22.6%→29.7% 보고",
          "summary": "Hugging Face 튜토리얼 저자들은 TRL·GRPO로 LFM2.5-350M을 약 500개 샘플·100단계 학습시킨 실험을 공개했습니다. 로컬 llama.cpp/BF16 조건에서 IFStruct 통과율이 22.6%에서 29.7%로 7.1%포인트 높아졌습니다. 비교 기준선은 IFStruct 릴리스 글의 수치와 다르며 일반 성능 향상으로 확대 해석할 수 없습니다.",
          "content": "Hugging Face 튜토리얼 저자들은 TRL·GRPO로 LFM2.5-350M을 약 500개 샘플·100단계 학습시킨 실험을 공개했습니다. 로컬 llama.cpp/BF16 조건에서 IFStruct 통과율이 22.6%에서 29.7%로 7.1%포인트 높아졌습니다. 비교 기준선은 IFStruct 릴리스 글의 수치와 다르며 일반 성능 향상으로 확대 해석할 수 없습니다.",
          "source": "https://huggingface.co/blog/grpo-with-trl-ifstruct",
          "officialUrl": "https://huggingface.co/blog/grpo-with-trl-ifstruct",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "Hugging Face"
          ],
          "slug": "hugging-face-lfm-grpo-structured-output",
          "thumbnail": {
            "src": "/source-images/13c39d5ad4d20ff8ceac5b1598bdbdf887e90134ffb0c7859e7cf76cb4e9f140.png",
            "alt": "Fine-tuning a 350M Model for Better Structured Outputs in 100 GRPO Steps — source link share preview",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Fine-tuning a 350M Model for Better Structured Outputs in 100 GRPO Steps",
            "deck": "A Hugging Face tutorial reports improved structured-output compliance by fine-tuning LFM2.5-350M with TRL and GRPO.",
            "summary": "The Hugging Face tutorial authors trained LFM2.5-350M with TRL and GRPO using about 500 samples and 100 steps. In their local llama.cpp/BF16 setup, IFStruct pass rate rose from 22.6% to 29.7%, a 7.1-point increase. Their baseline differs from the IFStruct release article; this is not evidence of a general performance gain.",
            "content": "The Hugging Face tutorial authors trained LFM2.5-350M with TRL and GRPO using about 500 samples and 100 steps. In their local llama.cpp/BF16 setup, IFStruct pass rate rose from 22.6% to 29.7%, a 7.1-point increase. Their baseline differs from the IFStruct release article; this is not evidence of a general performance gain."
          }
        },
        {
          "date": "9/03",
          "platform": "Web",
          "title": "Funes, 사용자가 소유하는 코딩 에이전트 기억 계층 공개",
          "deck": "로컬 임베딩·재정렬과 출처가 붙은 원문 회상, 비공개 공유 데이터셋 지원",
          "summary": "Funes 저자는 Claude Code·Codex·pi·Hermes 세션을 기억으로 활용하는 도구를 소개했습니다. 임베딩·재정렬은 로컬에서 실행하고 회상 결과에 원문과 출처를 반환합니다. 선택적으로 공유하는 기억은 사용자 소유 Hugging Face 데이터셋에 저장하며 기본값은 비공개입니다.",
          "content": "Funes 저자는 Claude Code·Codex·pi·Hermes 세션을 기억으로 활용하는 도구를 소개했습니다. 임베딩·재정렬은 로컬에서 실행하고 회상 결과에 원문과 출처를 반환합니다. 선택적으로 공유하는 기억은 사용자 소유 Hugging Face 데이터셋에 저장하며 기본값은 비공개입니다.",
          "source": "https://huggingface.co/blog/funes",
          "officialUrl": "https://huggingface.co/blog/funes",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "Hugging Face"
          ],
          "slug": "hugging-face-funes-agent-memory",
          "thumbnail": {
            "src": "/source-images/35b684c16cbe472de059d9015c80578bcb1b52d90fb9329369428f693ca952bd.jpg",
            "alt": "Give Your Coding Agents a Memory You Own — source link share preview",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Give Your Coding Agents a Memory You Own",
            "deck": "The Funes author describes locally indexed coding-agent sessions with retrieval of original context.",
            "summary": "The Funes author introduced a memory tool for Claude Code, Codex, pi and Hermes sessions. Embedding and reranking run locally, and recall returns original text with provenance. Optional shared memory uses a user-owned Hugging Face dataset that is private by default.",
            "content": "The Funes author introduced a memory tool for Claude Code, Codex, pi and Hermes sessions. Embedding and reranking run locally, and recall returns original text with provenance. Optional shared memory uses a user-owned Hugging Face dataset that is private by default."
          }
        },
        {
          "date": "9/03",
          "platform": "Web",
          "title": "코딩 모델을 수채화 화가로 학습한 TRL·OpenEnv 실험",
          "deck": "유효성·코드 길이·쌍별 비교·HPSv3를 보상으로 결합한 개인 미감 실험",
          "summary": "Sergio Paniego는 TRL·OpenEnv로 코딩 모델의 수채화 생성을 학습하는 실험을 공개했습니다. 보상은 유효성 검사·코드 길이·쌍별 비교·HPSv3를 결합합니다. 참조 그림 178개의 두 등급과 최종 미적 평가는 저자의 개인 취향을 반영합니다. 전체 작업 흐름은 Hugging Face에서 실행했다고 설명합니다.",
          "content": "Sergio Paniego는 TRL·OpenEnv로 코딩 모델의 수채화 생성을 학습하는 실험을 공개했습니다. 보상은 유효성 검사·코드 길이·쌍별 비교·HPSv3를 결합합니다. 참조 그림 178개의 두 등급과 최종 미적 평가는 저자의 개인 취향을 반영합니다. 전체 작업 흐름은 Hugging Face에서 실행했다고 설명합니다.",
          "source": "https://huggingface.co/blog/train-to-paint-with-code",
          "officialUrl": "https://huggingface.co/blog/train-to-paint-with-code",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "Hugging Face"
          ],
          "slug": "hugging-face-trl-openenv-watercolour",
          "thumbnail": {
            "src": "/source-images/b791992da58991c5b4ddae58fe833ed6ab47133504582f38a9e75cf7ceeeba85.png",
            "alt": "Training a coding model to paint watercolours with TRL and OpenEnv — source link share preview",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Training a coding model to paint watercolours with TRL and OpenEnv",
            "deck": "The author presents an experiment using TRL and OpenEnv to train a coding model to produce watercolour paintings.",
            "summary": "Sergio Paniego presented a TRL and OpenEnv experiment that trains a coding model to produce watercolours. The reward combines a validity gate, code length, a pairwise judge and HPSv3. The two preference tiers for 178 reference paintings and the final aesthetic judgment reflect the author’s taste. The author says the entire pipeline runs on Hugging Face.",
            "content": "Sergio Paniego presented a TRL and OpenEnv experiment that trains a coding model to produce watercolours. The reward combines a validity gate, code length, a pairwise judge and HPSv3. The two preference tiers for 178 reference paintings and the final aesthetic judgment reflect the author’s taste. The author says the entire pipeline runs on Hugging Face."
          }
        },
        {
          "date": "9/01",
          "platform": "Web",
          "title": "Hugging Face, 로컬 AI용 WebGPU 커널 207개 공개",
          "deck": "브라우저 GPU에서 실행하는 JavaScript 로더와 Apache 2.0 커널 모음",
          "summary": "Hugging Face가 브라우저 GPU용 WebGPU 커널 207개와 `@huggingface/kernels` JavaScript 패키지를 공개했습니다. 커널은 Apache 2.0이며 preview 채널 설치와 WebGPU 지원 브라우저가 필요합니다. 주의: RSS의 자정 값은 날짜 기반 게시 시스템의 기본 시각일 수 있어 시간은 표시하지 않았습니다.",
          "content": "**브라우저에서 GPU 커널을 불러와 실행합니다**\n\n`@huggingface/kernels` 패키지는 Hugging Face Hub에서 WebGPU 커널을 가져와 실행합니다. 207개 커널은 Apache 2.0으로 배포되며 예제 설치 경로는 `@huggingface/kernels@preview`입니다.\n\n**벤치마크 범위를 일반화하면 안 됩니다**\n\n공식 글은 Apple M4에서 1,756개 사례를 시작해 출력 일치와 신뢰 가능한 타이밍 조건을 통과한 809개 사례를 ORT WebGPU와 비교했습니다. 보고된 속도를 다른 브라우저·OS·GPU·드라이버로 일반화하지 않았습니다.",
          "source": "https://huggingface.co/blog/webgpu-kernels",
          "officialUrl": "https://huggingface.co/blog/webgpu-kernels",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "Hugging Face",
            "WebGPU"
          ],
          "slug": "huggingface-20260901-webgpu-kernels",
          "en": {
            "title": "Hugging Face introduces 207 WebGPU kernels and a JavaScript loader",
            "deck": "The Apache-2.0 kernels run through a preview JavaScript package in WebGPU-capable browsers.",
            "summary": "Hugging Face introduced 207 WebGPU kernels and the `@huggingface/kernels` JavaScript loader. The package uses a preview channel and requires WebGPU browser support. The RSS midnight value may be a date-only publishing default, so no time is shown.",
            "content": "**Browser GPUs can load kernels from the Hub**\n\nThe `@huggingface/kernels` package fetches and executes 207 WebGPU kernels from the Hub. The kernels use Apache 2.0, and the example installs `@huggingface/kernels@preview`.\n\n**Do not generalize the benchmark**\n\nThe article began with 1,756 cases on an Apple M4 and retained 809 cases with matching output and reliable timing for comparison with ORT WebGPU. Reported speed should not be generalized across browsers, operating systems, GPUs or drivers."
          }
        }
      ]
    },
    {
      "name": "IBM Research",
      "color": "#0F62FE",
      "posts": [
        {
          "date": "9/02",
          "platform": "Web",
          "title": "IBM·Confluent, 스트리밍 시계열 AI Early Access",
          "deck": "Flink에서 예측·이상 탐지를 호출하고 기존 스키마·계보·접근 통제 적용",
          "summary": "IBM·Confluent 저자들은 Confluent Cloud에서 상호 보완적인 시계열 모델 네 가지의 Early Access를 발표했습니다. Apache Flink에서 예측·이상 탐지를 호출하며 추론에도 기존 스키마·계보·접근 통제를 적용합니다. Confluent Platform 지원은 현재 제공이 아니라 향후 계획입니다.",
          "content": "IBM·Confluent 저자들은 Confluent Cloud에서 상호 보완적인 시계열 모델 네 가지의 Early Access를 발표했습니다. Apache Flink에서 예측·이상 탐지를 호출하며 추론에도 기존 스키마·계보·접근 통제를 적용합니다. Confluent Platform 지원은 현재 제공이 아니라 향후 계획입니다.",
          "source": "https://huggingface.co/blog/ibm-research/real-time-intelligence",
          "officialUrl": "https://huggingface.co/blog/ibm-research/real-time-intelligence",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "IBM Research"
          ],
          "slug": "ibm-confluent-time-series-early-access",
          "en": {
            "title": "Real-Time Intelligence with IBM Time Series Models on Confluent",
            "deck": "An IBM Research article announces Early Access to time-series models on Confluent Cloud.",
            "summary": "IBM and Confluent authors announced Early Access to four complementary time-series models on Confluent Cloud. Forecasting and anomaly detection run through Apache Flink, with inference following existing schemas, lineage and access controls. Confluent Platform support is a future plan, not current availability.",
            "content": "IBM and Confluent authors announced Early Access to four complementary time-series models on Confluent Cloud. Forecasting and anomaly detection run through Apache Flink, with inference following existing schemas, lineage and access controls. Confluent Platform support is a future plan, not current availability."
          }
        }
      ]
    },
    {
      "name": "NVIDIA",
      "color": "#76B900",
      "posts": [
        {
          "date": "9/3 20:56",
          "platform": "Web",
          "title": "NVIDIA, Hugging Face 인수 합의 발표",
          "summary": "NVIDIA가 Hugging Face를 129억 3,030만 달러에 인수하기로 합의했다고 발표했습니다. 발표에 따르면 Hugging Face는 개방형·멀티클라우드·멀티가속기 운영을 유지하며 NVIDIA 컴퓨팅 사용을 의무화하지 않습니다. 이번 기록은 인수 합의 발표이며 거래 종결이나 규제 승인 완료를 뜻하지 않습니다.",
          "content": "NVIDIA가 Hugging Face를 129억 3,030만 달러에 인수하기로 합의했다고 발표했습니다. 발표에 따르면 Hugging Face는 개방형·멀티클라우드·멀티가속기 운영을 유지하며 NVIDIA 컴퓨팅 사용을 의무화하지 않습니다. 이번 기록은 인수 합의 발표이며 거래 종결이나 규제 승인 완료를 뜻하지 않습니다.",
          "source": "https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/",
          "officialUrl": "https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/",
          "verifiedAt": "2026-09-08",
          "slug": "nvidia-20260903-hugging-face-acquisition-agreement",
          "thumbnail": {
            "src": "/source-images/0eeaedf86ff141dd707987db3fd52e0cfc868600adac9c725beb8ac8d6debcbf.png",
            "alt": "NVIDIA to Acquire Hugging Face | NVIDIA Blog — source link share preview",
            "provenance": "source-share-preview"
          },
          "tags": [
            "AI",
            "2026-w36",
            "NVIDIA"
          ],
          "en": {
            "title": "NVIDIA to Acquire Hugging Face",
            "summary": "NVIDIA announced an agreement to acquire Hugging Face for $12,930,300,000. It says Hugging Face will remain open, multi-cloud and multi-accelerator, without requiring NVIDIA compute. This records an announced agreement, not transaction completion or regulatory clearance.",
            "content": "NVIDIA announced an agreement to acquire Hugging Face for $12,930,300,000. It says Hugging Face will remain open, multi-cloud and multi-accelerator, without requiring NVIDIA compute. This records an announced agreement, not transaction completion or regulatory clearance."
          }
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "9/01 10:58",
          "platform": "Web",
          "title": "Codex 0.152, MCP 도구별 출력 한도와 승인 맥락 보존 개선",
          "deck": "대화 압축 뒤에도 지시·답변·유효한 허가를 승인 검토에 유지",
          "summary": "Codex 0.152는 MCP 도구별 `output_token_limit` 설정을 추가하고 대화 압축 뒤에도 승인 검토에 필요한 지시와 허가를 보존합니다. 주의: planning 도구는 기본 비활성으로 바뀌므로 기존 자동화 설정을 확인해야 합니다.",
          "content": "**도구별 출력 예산을 정할 수 있습니다**\n\n각 MCP 도구에 `output_token_limit`을 설정할 수 있고 세션 재개 뒤에도 일관된 잘림 동작을 적용합니다. 자동 승인 검토는 대화 압축을 거쳐도 사용자 지시, 답변, 유효한 허가를 보존하도록 개선됐습니다.\n\n**보안과 기본값도 바뀌었습니다**\n\n클라우드 작업은 신뢰하지 않는 백엔드 URL을 거부하고 리다이렉트를 비활성화합니다. planning 도구는 기본 비활성으로 변경돼 필요하면 `tools.update_plan.enabled = true`로 켜야 합니다.",
          "source": "https://github.com/openai/codex/releases/tag/rust-v0.152.0",
          "officialUrl": "https://github.com/openai/codex/releases/tag/rust-v0.152.0",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "OpenAI",
            "Codex"
          ],
          "slug": "openai-20260901-codex-v0-152",
          "en": {
            "title": "Codex 0.152 adds per-tool MCP output limits and preserves approval context",
            "deck": "Tool-level token limits and stronger compaction retention improve long-running approvals.",
            "summary": "Codex 0.152 adds an `output_token_limit` setting for individual MCP tools and preserves instructions, answers and valid authorizations across compaction. The planning tool is now disabled by default, so existing automation settings should be reviewed.",
            "content": "**Each MCP tool can have its own output budget**\n\nIndividual MCP tools support `output_token_limit` with consistent truncation across resumed sessions. Automatic approval reviews preserve user instructions, answers and valid authorizations across history compaction.\n\n**Security behavior and defaults also changed**\n\nCloud tasks reject untrusted backend URLs and disable redirects. The planning tool is disabled by default and can be enabled with `tools.update_plan.enabled = true`."
          }
        }
      ]
    },
    {
      "name": "Anthropic",
      "color": "#E87040",
      "posts": [
        {
          "date": "8/31",
          "platform": "Web",
          "title": "Anthropic, 사이버 평가 재개 전 실시간 차단·격리 강화 조치 공개",
          "summary": "Anthropic이 평가 중 외부 시스템 접근 사건 조사와 함께 실시간 분류기, 샌드박스 격리 강화, 외부 평가자 요구사항을 공개했습니다. 내부 사이버 평가는 조치 후 재개했다고 밝혔습니다.",
          "deck": "도구 호출 차단·작업 종료·사람 알림을 평가 환경에 추가",
          "content": "Anthropic은 7월 제3자 평가 환경에서 인터넷 접근이 잘못 허용된 사건과 8월 별도 평가 사건을 조사 중이라고 밝혔습니다. 실제 시스템 접근이 발생한 평가에는 평소의 사이버 보호 장치가 적용되지 않았다고 설명했습니다.\n\n회사는 외부 사이버 평가와 일부 내부 평가를 멈추고, 샌드박스 탈출 시도나 예상 밖 인터넷 접근 등을 감지하는 실시간 분류기를 추가했습니다. 이 분류기는 도구 호출을 막고 작업을 끝내며 사람에게 알립니다. 고위험 내부 평가 환경의 격리도 강화했고, 해당 조치 뒤 내부 사이버 평가를 재개했다고 밝혔습니다.\n\n외부 평가자에게는 기본적으로 인터넷이 차단된 강화 샌드박스, 실행 전 환경 확인, 명시적 허용 대상·행동·네트워크 범위, 지속적인 감시와 위반 시 종료를 요구합니다. 이 요구사항은 사이버 보호를 줄인 출시 전 모델 평가에 관한 것이며, 보호 장치가 있는 일반 고객용 모델의 이용 조건 변경으로 발표된 것은 아닙니다.\n\n날짜는 발행사가 표시한 2026-08-31 기준입니다. 게시 시각과 시간대가 공개되지 않아 정확한 한국 시각으로 환산하지 않았습니다.",
          "source": "https://www.anthropic.com/news/improving-alignment-security-efforts",
          "officialUrl": "https://www.anthropic.com/news/improving-alignment-security-efforts",
          "verifiedAt": "2026-09-08",
          "slug": "anthropic-20260831-alignment-security-evaluations",
          "en": {
            "title": "Anthropic details containment changes before resuming cyber evaluations",
            "summary": "Anthropic outlined incident investigations, real-time intervention, stronger sandbox isolation and requirements for external evaluators. It says internal cyber evaluations resumed after these changes.",
            "deck": "A classifier blocks actions, ends tasks and alerts a person",
            "content": "Anthropic is investigating July incidents involving mistakenly enabled internet access in a third-party evaluation environment, plus a separate August evaluation incident. The affected evaluations ran without normal cyber safeguards.\n\nThe company paused external cyber evaluations and temporarily paused internal ones. It added a real-time classifier for attempted sandbox escapes and unexpected internet access, which blocks tool calls, terminates tasks and alerts a person. High-risk internal environments received stronger isolation; internal cyber evaluations resumed after these measures.\n\nExternal evaluators testing pre-release models with reduced cyber safeguards must normally use hardened offline sandboxes, verify configurations, state allowed targets/actions/network boundaries and monitor continuously with termination on violations. These requirements are not announced as new conditions for ordinary customers using safeguarded models.\n\nDate follows the publisher’s displayed 2026-08-31 calendar date. Publication time and timezone are unspecified; no exact KST conversion is asserted."
          },
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "Anthropic"
          ]
        },
        {
          "date": "9/1",
          "platform": "Web",
          "title": "Anthropic, 고객 저장소에서 동작하는 기업용 안전 감시 EFS 예고",
          "summary": "Enterprise Frontier Safeguards는 고객이 관리하는 저장소·암호화 키와 자동 안전 분석을 결합하는 기업용 제공 방식입니다. 2026년 가을 후반부터 단계적으로 제공할 계획입니다.",
          "deck": "고객 소유 저장소·암호화 키·자동 검토를 각각 선택",
          "content": "Anthropic은 100개 이상 조직과 논의해 Enterprise Frontier Safeguards를 설계했다고 밝혔습니다. 여러 세션·계정에 걸친 심각한 오용 패턴을 자동으로 분석하되, 고객이 활동 데이터를 자체 클라우드 계정에 보관하고 자체 키와 접근 제어를 적용할 수 있도록 합니다.\n\n고객 소유 저장소, 고객 관리 암호화 키, 완전 자동 검토는 각각 선택 사항입니다. 자동 분석이 보낸 신호의 조사와 처리는 고객이 맡습니다. 이 선택 사항은 모델 동작·API 가격·사용 한도를 바꾸지 않습니다.\n\nAnthropic은 EFS 자체에 요금을 부과하지 않지만 자체 클라우드에 저장하는 고객은 저장·읽기·쓰기·전송 비용을 부담합니다. 발표 시점에 전면 출시된 기능은 아니며, 2026년 가을 후반부터 단계적으로 제공할 계획입니다.\n\n날짜는 발행사가 표시한 2026-09-01 기준입니다. 게시 시각과 시간대가 공개되지 않아 정확한 한국 시각으로 환산하지 않았습니다.",
          "source": "https://www.anthropic.com/news/enterprise-frontier-safeguards",
          "officialUrl": "https://www.anthropic.com/news/enterprise-frontier-safeguards",
          "verifiedAt": "2026-09-08",
          "slug": "anthropic-20260901-enterprise-frontier-safeguards",
          "en": {
            "title": "Anthropic previews customer-controlled Enterprise Frontier Safeguards",
            "summary": "Enterprise Frontier Safeguards combines automated safety analysis with customer-controlled storage and encryption keys. Phased rollout is planned for later fall 2026.",
            "deck": "Customer storage, encryption keys and automated review are separate opt-ins",
            "content": "Anthropic says it developed Enterprise Frontier Safeguards with input from more than 100 organizations. It analyzes serious misuse patterns across sessions and accounts while allowing customers to retain activity data in their own cloud accounts using their own keys and access controls.\n\nCustomer-owned storage, customer-managed encryption keys and fully automated review are independent opt-in controls. Customers investigate and respond to signals from automated analysis. The controls do not change model behavior, API pricing or rate limits.\n\nAnthropic does not charge for EFS itself, but customers using their own cloud storage pay their provider’s storage, read, write and transfer charges. EFS was announced as an upcoming offering with phased rollout later in fall 2026, not an already broadly available product.\n\nDate follows the publisher’s displayed 2026-09-01 calendar date. Publication time and timezone are unspecified; no exact KST conversion is asserted."
          },
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w36",
            "Anthropic"
          ]
        }
      ]
    }
  ]
};
