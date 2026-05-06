import type { WeeklyData } from "../data";

export const week18: WeeklyData = {
  "week": 18,
  "year": 2026,
  "slug": "2026-w18",
  "period": "4/27 ~ 5/03",
  "totalPosts": 28,
  "companies": [
    {
      "name": "Alibaba / Qwen",
      "color": "#FF6A00",
      "posts": [
        {
          "date": "4/27",
          "platform": "X",
          "title": "Alibaba HappyHorse 1.0 — 영상 생성 AI 베타 공개 (Artificial Analysis Arena 1위 등극)",
          "summary": "15B 파라미터 단일 스트림 트랜스포머 — text/image/subject-to-video, 1080p 15초, 7개 언어 립싱크 동기 오디오 동시 생성으로 Artificial Analysis 영상 아레나 익명 1위",
          "content": "이게 뭐예요?\nAlibaba HappyHorse 1.0은 영상 생성 AI 베타로, Artificial Analysis Arena에서 높은 순위를 기록했다는 소식입니다. 중국 모델 경쟁이 텍스트와 이미지에서 영상 생성으로 넓어지는 흐름입니다.\n\n왜 중요해요?\n영상은 강의 홍보, 숏폼, 제품 소개에 바로 연결됩니다. 영상 생성 품질 경쟁이 빨라지면 1인 크리에이터와 강사도 제작 비용을 크게 줄일 수 있습니다.\n\n확인 포인트\n데모 영상만 보고 판단하지 말고, 한국어 텍스트 처리, 상업 이용 조건, 워터마크, 편집 가능성을 함께 확인하는 것이 좋습니다.",
          "source": "https://www.alibabacloud.com/blog/alibaba-rolls-out-happyhorse-1-0-in-limited-beta_603068",
          "officialUrl": "https://www.alibabacloud.com/blog/alibaba-rolls-out-happyhorse-1-0-in-limited-beta_603068",
          "backupUrls": [
            {
              "label": "cnbc.com",
              "url": "https://www.cnbc.com/2026/04/10/alibaba-happyhorse-ai-video-model-benchmark-reveal.html"
            },
            {
              "label": "blog.comfy.org",
              "url": "https://blog.comfy.org/p/happyhorse-10-is-now-available"
            },
            {
              "label": "fal.ai",
              "url": "https://fal.ai/happyhorse-1-0"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "alibaba"
          ],
          "featured": true
        }
      ]
    },
    {
      "name": "Anthropic / Claude",
      "color": "#E87040",
      "posts": [
        {
          "date": "4/28",
          "platform": "X",
          "title": "Anthropic Claude — 9개 크리에이티브 도구 공식 커넥터 출시 (Blender·Adobe·Autodesk Fusion·Ableton·SketchUp 등)",
          "summary": "Claude가 Photoshop·Premiere·Blender·Fusion·Ableton·SketchUp·Splice·Affinity·Resolume에 직접 연결 — 전문 툴을 못 다뤄도 자연어로 3D·영상·오디오 제작 가능",
          "content": "이게 뭐예요?\nClaude가 Blender, Adobe, Autodesk Fusion, Ableton, SketchUp 같은 전문 창작 툴에 직접 연결되는 커넥터 9종을 공개한 소식입니다. 텍스트로 지시하면 Claude가 툴 안의 작업 흐름을 이해하고 제작 보조를 할 수 있는 방향입니다.\n\n왜 중요해요?\n지난 회차의 Claude Design이 '디자인 결과물을 만들어주는 제품'이었다면, 이번 발표는 실제 제작 툴 안으로 들어가는 단계입니다. 디자이너·영상 제작자·강사에게는 AI가 결과물 생성뿐 아니라 실무 툴 조작까지 도와주는 전환점입니다.\n\n확인 포인트\n본인이 쓰는 툴이 커넥터 목록에 있는지 확인해야 합니다. Blender나 Adobe 계열을 쓰는 수강생은 예제 파일 하나를 정해 '수정 지시 → 결과 확인' 흐름을 작게 테스트해보면 됩니다.",
          "source": "https://www.anthropic.com/news/claude-for-creative-work",
          "officialUrl": "https://www.anthropic.com/news/claude-for-creative-work",
          "backupUrls": [
            {
              "label": "9to5mac.com",
              "url": "https://9to5mac.com/2026/04/28/anthropic-releases-9-new-claude-connectors-for-creative-tools-including-blender-and-adobe/"
            },
            {
              "label": "blog.adobe.com",
              "url": "https://blog.adobe.com/en/publish/2026/04/28/adobe-for-creativity-connector"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "anthropic"
          ],
          "featured": true
        },
        {
          "date": "4/30",
          "platform": "X",
          "title": "Anthropic Claude Code — git commit에 'OpenClaw'·'HERMES.md' 단어만 있어도 추가 과금 라우팅 (논란→환불)",
          "summary": "OpenRouter에 출처 미상 stealth 모델 'Owl Alpha'가 등장 — 1M 토큰 컨텍스트, 강력한 tool use, agentic 워크로드 최적화, Claude Code/OpenClaw 호환, 무료 제공(프롬프트 로깅 동의). 영상은 Minimax(M2.x) 또는 GLM 신모델 가능성을 추측.",
          "content": "이게 뭐예요?\nOpenRouter에 출처 미상 stealth 모델 'Owl Alpha'가 등장 — 1M 토큰 컨텍스트, 강력한 tool use, agentic 워크로드 최적화, Claude Code/OpenClaw 호환, 무료 제공(프롬프트 로깅 동의). 영상은 Minimax(M2.x) 또는 GLM 신모델 가능성을 추측.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 수익화사례 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nBoris Cherny: 'subscriptions weren't built for the usage patterns of these third-party tools' (4/4 정책). 엔지니어 Tariq가 'third-party harness detection 버그' 공식 인정 | Altman 트윗 ID는 검증 필요(시간상 5/2). OpenClaw GitHub 346k stars, 3.2M users. 가격 정책 차이가 사용자 이주를 가속 | OpenRouter 공식 X 계정이 4/28 'New stealth model: Owl Alpha!'로 공지. 누가 만들었는지 미공개(stealth/cloaked), 컨텍스트 1,048,756 토큰, 출력 262,144 토큰, 무료. 영상의 'Minimax M2.8' 추정은 추측에 불과 — 공식 소속 라벨 없음. cluster는 community(stealth lab) 분류로도 가능하지만 본질은 '미공개 lab의 모델 드롭'이라 tool_drop 유지.\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://github.com/anthropics/claude-code/issues/53262",
          "officialUrl": "https://github.com/anthropics/claude-code/issues/53262",
          "backupUrls": [
            {
              "label": "news.ycombinator.com",
              "url": "https://news.ycombinator.com/item?id=47963204"
            },
            {
              "label": "gigazine.net",
              "url": "https://gigazine.net/gsc_news/en/20260430-hermes-claude-code/"
            },
            {
              "label": "xcancel.com",
              "url": "https://xcancel.com/theo/status/2049645973350363168"
            },
            {
              "label": "X 원문",
              "url": "https://x.com/sama/status/2050355365412253989"
            },
            {
              "label": "thenextweb.com",
              "url": "https://thenextweb.com/news/openai-openclaw-chatgpt-subscription-agent"
            },
            {
              "label": "OpenAI 공식",
              "url": "https://community.openai.com/t/introducing-codex-plugin-for-claude-code/1378186"
            },
            {
              "label": "GitHub",
              "url": "https://github.com/zuharz/ccode-to-codex"
            },
            {
              "label": "X 원문",
              "url": "https://x.com/OpenRouter/status/2049864339570757920"
            }
          ],
          "tags": [
            "수익화사례",
            "공식",
            "anthropic",
            "community",
            "openai"
          ]
        },
        {
          "date": "4/30",
          "platform": "X",
          "title": "Apple Support 앱 v5.13 — CLAUDE.md 2개 파일 실수 노출 (Apple 내부 Juno AI 아키텍처 유출)",
          "summary": "MacRumors의 Aaron Perris가 캡처 — Apple이 Claude Code로 'Juno AI' + Live Agents 듀얼 백엔드를 개발 중임이 공개. Apple-Gemini Siri 협업과 별개로 내부 개발 도구는 Claude를 채택",
          "content": "이게 뭐예요?\nApple Support 앱 v5.13에서 CLAUDE.md 파일 2개가 실수로 노출되며 내부 Juno AI 아키텍처 단서가 공개됐다는 유출입니다. AI 제품 개발 방식과 내부 지침이 밖으로 나온 사례로 볼 수 있습니다.\n\n왜 중요해요?\nApple이 AI를 어떻게 제품 내부에 붙이려 하는지 엿볼 수 있는 카드입니다. 동시에 CLAUDE.md 같은 에이전트 지침 파일이 실제 기업 내부에서도 중요해졌다는 신호이기도 합니다.\n\n확인 포인트\n유출 자료는 맥락이 부족하고 변경될 수 있습니다. 발표에서는 세부 구현을 단정하기보다, '대기업 AI 개발에서도 지침 파일과 에이전트 아키텍처가 핵심 문서가 됐다'는 메시지로 연결하면 좋습니다.",
          "source": "https://xcancel.com/aaronp613/status/2049986504617820551",
          "officialUrl": "https://xcancel.com/aaronp613/status/2049986504617820551",
          "backupUrls": [
            {
              "label": "news.ycombinator.com",
              "url": "https://news.ycombinator.com/item?id=47973378"
            },
            {
              "label": "eu.36kr.com",
              "url": "https://eu.36kr.com/en/p/3791662444911617"
            },
            {
              "label": "finance.biggo.com",
              "url": "https://finance.biggo.com/news/202605020924_Apple_Leaks_Claude.md_in_Support_App"
            }
          ],
          "tags": [
            "워크플로우",
            "유출",
            "anthropic",
            "community"
          ],
          "featured": true
        },
        {
          "date": "4/30",
          "platform": "X",
          "title": "Anthropic 'Claude Jupiter v1-p' red-team probe — possible Sonnet 4.8 / next Sonnet-class drop",
          "summary": "Anthropic이 'claude-jupiter-v1-p' 코드네임 모델을 레드팀에 투입했다는 루머 — 5/6 'Code with Claude' SF 컨퍼런스 직전 타이밍이라 Sonnet 4.8 또는 새 Sonnet급 모델 발표가 임박했다는 시그널.",
          "content": "이게 뭐예요?\nAnthropic 내부 테스트명으로 보이는 'Claude Jupiter v1-p'가 레드팀 환경에서 포착됐다는 소식입니다. 공식 발표는 아니지만, Code with Claude 행사 직전이라는 시점 때문에 다음 Sonnet급 모델 신호로 읽히고 있습니다.\n\n왜 중요해요?\n지난 VOL.02에서는 Opus 4.7과 Claude Design이 중심이었고, 이번에는 그 다음 모델 라인이 움직일 가능성이 보입니다. 수강생 입장에서는 '지금 쓰는 Claude가 곧 다시 바뀔 수 있다'는 일정 감각을 잡는 카드입니다.\n\n확인 포인트\nTestingCatalog 원문을 보고, 루머인지 공식 발표인지 구분해서 받아들이면 됩니다. 모델명·출시일·성능은 아직 확정이 아니므로 발표에서는 '다음 회차 추적 대상'으로 다루는 게 안전합니다.",
          "source": "https://x.com/testingcatalog/status/2049896926997369194",
          "officialUrl": "https://x.com/testingcatalog/status/2049896926997369194",
          "backupUrls": [
            {
              "label": "TestingCatalog",
              "url": "https://www.testingcatalog.com/anthropic-tests-jupiter-v1-p-before-potential-launch-on-may-6/"
            },
            {
              "label": "X 원문",
              "url": "https://x.com/kimmonismus/status/2049892563830571398"
            },
            {
              "label": "Threads 원문",
              "url": "https://www.threads.com/@testingcatalog/post/DXw3H9mDXW-/anthropic-anthropic-started-testing-a-new-claude-jupiter-v-p-model-with-red/"
            }
          ],
          "tags": [
            "도구릴리스",
            "루머",
            "anthropic"
          ],
          "featured": true
        }
      ]
    },
    {
      "name": "Google / DeepMind",
      "color": "#4285F4",
      "posts": [
        {
          "date": "4/27",
          "platform": "X",
          "title": "Demis Hassabis 방한 — 서울 Google AI Campus(해외 첫 사례) MOU 체결",
          "summary": "Google·DeepMind가 영국 본사 외 최초로 세우는 해외 AI 캠퍼스가 서울 — 미국 본사 엔지니어 10명 상주, 한국 스타트업·연구진과 직접 연결되는 R&D 허브",
          "content": "이게 뭐예요?\nGoogle·DeepMind가 영국 본사 외 최초로 세우는 해외 AI 캠퍼스가 서울 — 미국 본사 엔지니어 10명 상주, 한국 스타트업·연구진과 직접 연결되는 R&D 허브\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 수익화사례 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\n이재명 대통령·하사비스 청와대 회동 후 과기정통부와 MOU. 연내 가동 예정.\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://thenextweb.com/news/google-deepmind-ai-campus-seoul",
          "officialUrl": "https://thenextweb.com/news/google-deepmind-ai-campus-seoul",
          "backupUrls": [
            {
              "label": "en.sedaily.com",
              "url": "https://en.sedaily.com/finance/2026/04/27/google-to-open-worlds-first-ai-campus-in-seoul-this-year"
            },
            {
              "label": "koreatimes.co.kr",
              "url": "https://www.koreatimes.co.kr/southkorea/politics/20260427/google-to-open-ai-campus-in-korea"
            }
          ],
          "tags": [
            "수익화사례",
            "공식",
            "google"
          ]
        },
        {
          "date": "4/29",
          "platform": "X",
          "title": "Google Gemini — PDF/Word/Excel/Docs/Sheets/Slides 직접 생성 기능 출시",
          "summary": "프롬프트 한 줄로 견적서·인보이스를 PDF·xlsx·docx로 바로 출력 — Gemini 앱이 '아이디어→완성 파일' 원샷 워크플로우의 진입점이 됨",
          "content": "이게 뭐예요?\n프롬프트 한 줄로 견적서·인보이스를 PDF·xlsx·docx로 바로 출력 — Gemini 앱이 '아이디어→완성 파일' 원샷 워크플로우의 진입점이 됨\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 워크플로우 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\n지원 포맷: PDF, .docx, .xlsx, Google Docs/Sheets/Slides, CSV, LaTeX, TXT, RTF, MD. 전 사용자 무료. PowerPoint 직접 export는 아직 미지원\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://blog.google/innovation-and-ai/products/gemini-app/generate-files-in-gemini/",
          "officialUrl": "https://blog.google/innovation-and-ai/products/gemini-app/generate-files-in-gemini/",
          "backupUrls": [
            {
              "label": "Google 공식",
              "url": "https://9to5google.com/2026/04/29/gemini-app-generate-files/"
            },
            {
              "label": "androidcentral.com",
              "url": "https://www.androidcentral.com/apps-software/gemini-can-now-generate-google-docs-pdf-word"
            }
          ],
          "tags": [
            "워크플로우",
            "공식",
            "google"
          ]
        },
        {
          "date": "4/29",
          "platform": "X",
          "title": "Google Photos Wardrobe — 사진 라이브러리에서 자동 디지털 옷장 + 가상 피팅",
          "summary": "AI가 사용자 사진에서 옷을 자동 추출해 카테고리별 옷장으로 재구성 + 디지털 아바타로 가상 피팅 — 'Clueless 옷장'을 카메라 롤로 구현",
          "content": "이게 뭐예요?\nAI가 사용자 사진에서 옷을 자동 추출해 카테고리별 옷장으로 재구성 + 디지털 아바타로 가상 피팅 — 'Clueless 옷장'을 카메라 롤로 구현\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 도구릴리스 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\n2026 여름 Android→iOS 순차 출시. Google I/O 2026 추가 데모 예상\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://blog.google/products-and-platforms/products/photos/google-photos-wardrobe-feature/",
          "officialUrl": "https://blog.google/products-and-platforms/products/photos/google-photos-wardrobe-feature/",
          "backupUrls": [
            {
              "label": "Google 공식",
              "url": "https://9to5google.com/2026/04/29/google-photos-wardrobe/"
            },
            {
              "label": "TechCrunch",
              "url": "https://techcrunch.com/2026/04/29/google-photos-uses-ai-to-make-the-iconic-closet-from-clueless-a-reality/"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "google"
          ]
        },
        {
          "date": "4/30",
          "platform": "X",
          "title": "Google DeepMind AI Co-Clinician — 멀티모달 라이브 비디오/오디오 진단 AI",
          "summary": "AI가 라이브 비디오·오디오로 환자 걸음걸이·호흡·발진을 보면서 진단 보조 — 140개 평가 차원 중 68개에서 1차 진료의와 동등 이상, 98건 중 97건에서 critical error 0",
          "content": "이게 뭐예요?\nAI가 라이브 비디오·오디오로 환자 걸음걸이·호흡·발진을 보면서 진단 보조 — 140개 평가 차원 중 68개에서 1차 진료의와 동등 이상, 98건 중 97건에서 critical error 0\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 도구릴리스 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nHadvard·Stanford 학술 의사 협업, GPT-5.4와 비교. 'Towards Conversational Medical AI with Eyes, Ears and a Voice' 논문\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://deepmind.google/blog/ai-co-clinician/",
          "officialUrl": "https://deepmind.google/blog/ai-co-clinician/",
          "backupUrls": [
            {
              "label": "arxiv.org",
              "url": "https://arxiv.org/html/2505.04653v1"
            },
            {
              "label": "the-decoder.com",
              "url": "https://the-decoder.com/google-deepminds-ai-co-clinician-beats-gpt-5-4-in-blind-doctor-tests-but-still-trails-experienced-physicians/"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "google"
          ]
        },
        {
          "date": "5/01",
          "platform": "X",
          "title": "Google COSMO — 온디바이스 Gemini Nano 기반 프로액티브 AI 어시스턴트 앱 유출",
          "summary": "Google이 Play Store에 COSMO를 잠깐 올렸다 내림 — 화면 액세스, Voice Match, Recall, 브라우저 에이전트(Mariner), 딥리서치를 1.13GB 로컬 패키지로 통합한 프로액티브 어시스턴트",
          "content": "이게 뭐예요?\nGoogle COSMO는 Play Store에 잠깐 노출됐다 내려간 온디바이스 AI 어시스턴트 앱으로 알려졌습니다. 화면 액세스, Voice Match, Recall, 브라우저 에이전트, 딥리서치 같은 기능을 로컬 Gemini Nano 패키지와 결합하는 형태로 보입니다.\n\n왜 중요해요?\nAI 어시스턴트가 클라우드 챗봇을 넘어 휴대폰 안에서 상황을 읽고 먼저 도와주는 방향입니다. 사용자 경험은 '앱을 열어 질문하는 AI'에서 '내 화면과 맥락을 이해하는 AI'로 넘어가고 있습니다.\n\n확인 포인트\n앱 유출 기반이라 개인정보·권한·배터리·지역 출시 여부가 모두 미정입니다. 기능보다 방향성, 즉 온디바이스 에이전트 흐름을 잡는 카드로 보면 됩니다.",
          "source": "https://x.com/minchoi/status/2050290896382353432",
          "officialUrl": "https://x.com/minchoi/status/2050290896382353432",
          "backupUrls": [
            {
              "label": "nokiapoweruser.com",
              "url": "https://nokiapoweruser.com/google-cosmo-ai-assistant-leak-gemini-nano-mariner/"
            },
            {
              "label": "androidheadlines.com",
              "url": "https://www.androidheadlines.com/2026/05/google-cosmo-ai-assistant-experimental-app.html"
            }
          ],
          "tags": [
            "도구릴리스",
            "유출",
            "google"
          ]
        },
        {
          "date": "5/02",
          "platform": "X",
          "title": "Gemini Omni 비디오 생성 leak — 'Powered by Omni' UI 문구 + 내부 코드네임 Toucan",
          "summary": "Gemini 비디오 생성 탭 UI에 'Start with an idea or try a template. Powered by Omni' 문구가 노출. 내부 코드네임 Toucan과 인접 — 단일 omni-model이 텍스트·이미지·비디오를 통합 생성하는 GPT-4o식 접근 가능성. Google IO 2026(5/19~20) 직전 launch window.",
          "content": "이게 뭐예요?\nGoogle의 영상 생성 UI에서 'Powered by Omni'라는 문구가 노출됐다는 유출입니다. 텍스트·이미지·비디오를 하나의 omni 모델이 통합 생성하는 방향일 수 있다는 해석이 붙었습니다.\n\n왜 중요해요?\n영상 생성은 지금 모델·편집툴·템플릿이 분리되어 있습니다. Omni가 실제로 나오면 Veo 후속 경쟁뿐 아니라, 하나의 모델이 아이디어에서 영상까지 이어주는 워크플로우로 바뀔 수 있습니다.\n\n확인 포인트\n원천은 스크린샷 유출입니다. 공식 제품 페이지가 아니므로 기능·가격·출시 시점은 아직 열어두고 봐야 합니다.",
          "source": "https://x.com/testingcatalog/status/2050705594458292496",
          "officialUrl": "https://x.com/testingcatalog/status/2050705594458292496",
          "backupUrls": [
            {
              "label": "TestingCatalog",
              "url": "https://www.testingcatalog.com/google-is-testing-new-omni-model-for-video-generation-ahead-of-i-o/"
            },
            {
              "label": "wavespeed.ai",
              "url": "https://wavespeed.ai/blog/posts/google-omni-video-model-leak-i-o-2026/"
            },
            {
              "label": "tech360.tv",
              "url": "https://www.tech360.tv/google-ai-video-generator-toucan-discovered-in-app-code-leak"
            }
          ],
          "tags": [
            "도구릴리스",
            "유출",
            "google"
          ],
          "featured": true
        },
        {
          "date": "5/03",
          "platform": "X",
          "title": "Gemini 3.2 Flash A/B 테스트 — Ajax/Hercules/Hector/Orpheus 4개 체크포인트 LM Arena 등장",
          "summary": "Google IO 직전 Gemini 3.2 Flash가 Anti-Gravity Arena·AI Studio·iOS Gemini 앱에서 동시 노출됨. Pro급 추론을 Flash 속도로 — $0.25/$2 per 1M tokens, 2026-01 지식컷오프, 5월 정식 출시 임박.",
          "content": "이게 뭐예요?\nGemini 3.2 Flash로 추정되는 여러 체크포인트가 LM Arena와 앱 코드에서 포착됐다는 소식입니다. Ajax, Hercules, Hector, Orpheus 같은 이름이 함께 언급되며 Google I/O 전후의 모델 업데이트 가능성을 키웁니다.\n\n왜 중요해요?\nFlash 라인은 빠르고 저렴한 모델 계층입니다. Pro급 성능을 더 낮은 비용과 빠른 속도로 쓰게 된다면, 일상 업무 자동화와 교육용 실습 비용이 크게 달라집니다.\n\n확인 포인트\n아직 공식 발표가 아니라 테스트 신호입니다. 발표에서는 '확정 출시'가 아니라 'Google의 다음 업데이트 예고편'으로 설명하는 것이 안전합니다.",
          "source": "https://www.geeky-gadgets.com/google-gemini-flash-leak-lm-arena/",
          "officialUrl": "https://www.geeky-gadgets.com/google-gemini-flash-leak-lm-arena/",
          "backupUrls": [
            {
              "label": "letsdatascience.com",
              "url": "https://letsdatascience.com/news/google-spots-gemini-32-flash-naming-strategy-shifts-84dcf430"
            },
            {
              "label": "TestingCatalog",
              "url": "https://www.testingcatalog.com/google-prepares-new-upgrades-for-gemini-flash-model/"
            },
            {
              "label": "nokiapoweruser.com",
              "url": "https://nokiapoweruser.com/gemini-3-2-flash-ios-app-leak/"
            },
            {
              "label": "Google 공식",
              "url": "https://blog.google/products/gemini/gemini-3-flash/"
            }
          ],
          "tags": [
            "도구릴리스",
            "루머",
            "google"
          ],
          "featured": true
        }
      ]
    },
    {
      "name": "NVIDIA",
      "color": "#76B900",
      "posts": [
        {
          "date": "4/30",
          "platform": "X",
          "title": "NVIDIA Nemotron 3 Nano Omni — 30B-A3B 오픈 멀티모달 모델 (RTX 5090에서 실행)",
          "summary": "30B 총/3B 활성 MoE에 vision·audio 인코더 통합 — 동급 오픈 옴니 대비 9배 처리량, 가중치·데이터셋·레시피 풀 공개. NVFP4로 RTX 5090 1대에서 추론",
          "content": "이게 뭐예요?\nNVIDIA Nemotron 3 Nano Omni는 30B-A3B 규모의 오픈 멀티모달 모델로, RTX 5090 같은 로컬 하드웨어 실행 가능성이 강조된 소식입니다.\n\n왜 중요해요?\n멀티모달 AI가 클라우드 API 전용이 아니라 로컬 PC로 내려오는 흐름입니다. 개인정보가 있는 이미지·문서·영상 분석을 로컬에서 처리하려는 팀에게 의미가 큽니다.\n\n확인 포인트\n내 장비에서 실제로 가능한지 VRAM, 양자화, 실행 프레임워크를 먼저 확인해야 합니다. '로컬에서 된다'는 말은 항상 하드웨어 조건과 함께 봐야 합니다.",
          "source": "https://developer.nvidia.com/blog/nvidia-nemotron-3-nano-omni-powers-multimodal-agent-reasoning-in-a-single-efficient-open-model/",
          "officialUrl": "https://developer.nvidia.com/blog/nvidia-nemotron-3-nano-omni-powers-multimodal-agent-reasoning-in-a-single-efficient-open-model/",
          "backupUrls": [
            {
              "label": "blogs.nvidia.com",
              "url": "https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/"
            },
            {
              "label": "Hugging Face",
              "url": "https://huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16"
            },
            {
              "label": "aws.amazon.com",
              "url": "https://aws.amazon.com/blogs/machine-learning/nvidia-nemotron-3-nano-omni-model-now-available-on-amazon-sagemaker-jumpstart/"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "nvidia"
          ],
          "featured": true
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "4/27",
          "platform": "X",
          "title": "Microsoft·OpenAI 독점 종료 + AGI 조항 폐기 → AWS Bedrock에 OpenAI 모델 도입",
          "summary": "OpenAI는 Azure 외 어디서나 판매 가능, AGI 자동 종료 조항 사라지고 2032년까지 고정 라이선스로 전환 — 4/28 AWS Bedrock에 OpenAI 모델·관리형 에이전트 즉시 런칭",
          "content": "이게 뭐예요?\nOpenAI는 Azure 외 어디서나 판매 가능, AGI 자동 종료 조항 사라지고 2032년까지 고정 라이선스로 전환 — 4/28 AWS Bedrock에 OpenAI 모델·관리형 에이전트 즉시 런칭\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 수익화사례 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nAzure-first 조항은 유지(MS가 거부 시 타 클라우드). MS는 이제 OpenAI 매출 공유금 미지급. AWS $50B OpenAI 투자 발표(2/26) 후속\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://www.cnbc.com/2026/04/28/openai-brings-models-to-aws-after-ending-exclusivity-with-microsoft.html",
          "officialUrl": "https://www.cnbc.com/2026/04/28/openai-brings-models-to-aws-after-ending-exclusivity-with-microsoft.html",
          "backupUrls": [
            {
              "label": "TechCrunch",
              "url": "https://techcrunch.com/2026/04/27/openai-ends-microsoft-legal-peril-over-its-50b-amazon-deal/"
            },
            {
              "label": "axios.com",
              "url": "https://www.axios.com/2026/04/28/openai-microsoft-cloud-amazon"
            }
          ],
          "tags": [
            "수익화사례",
            "공식",
            "openai",
            "community"
          ]
        },
        {
          "date": "4/28",
          "platform": "X",
          "title": "GPT-Image-2 + Seedance 2.0 댄스 안무 스토리보드 워크플로우",
          "summary": "'Redraw the attached image in the most clumsy, scribbly, and utterly pathetic way possible. MS Paint with a mouse' — 모델의 고품질 출력과 의도적 저품질의 대비가 SNS에서 폭발",
          "content": "이게 뭐예요?\n'Redraw the attached image in the most clumsy, scribbly, and utterly pathetic way possible. MS Paint with a mouse' — 모델의 고품질 출력과 의도적 저품질의 대비가 SNS에서 폭발\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 프롬프트디자인 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\n캐릭터 일관성 + 안무 시퀀스 컨트롤 패턴. 농구 슈팅 등 액션 장면도 동일 워크플로우 | 실제 바이럴 진원지는 X 사용자 @CHOI(트윗 ID 2049689793118998717). 동일 프롬프트가 여러 커뮤니티에서 재유행 | 지문 추출 가능성 등 프라이버시 경고 동반. 국내 유료 SaaS화 사례도 등장. GPT-Image-2 정식 출시: 2026-04-21 | Palmistry GPT 스토어 앱들과 경쟁. 한국어 텍스트 깨짐 없는 GPT-Image-2 능력이 결정적\n\n확인 포인트\n커뮤니티 기반 소식은 확산이 빠른 만큼 재현성, 라이선스, 유지보수 상태를 함께 확인해야 합니다.",
          "source": "https://github.com/EvoLinkAI/GPT-Image-2-Seedance2-Workflow",
          "officialUrl": "https://github.com/EvoLinkAI/GPT-Image-2-Seedance2-Workflow",
          "backupUrls": [
            {
              "label": "X 원문",
              "url": "https://x.com/i/status/2049689793118998717"
            },
            {
              "label": "adam.holter.com",
              "url": "https://adam.holter.com/this-gpt-image-2-prompt-for-deliberately-bad-drawings/"
            },
            {
              "label": "GitHub",
              "url": "https://github.com/ZeroLu/awesome-gpt-image"
            },
            {
              "label": "unwire.hk",
              "url": "https://unwire.hk/2026/04/27/gpt-image-2-palm-reading-trend/ai/"
            },
            {
              "label": "linkedin.com",
              "url": "https://www.linkedin.com/posts/soravjain_here-is-the-prompt-to-make-chatgpt-into-activity-7322949752055091202-oE07"
            },
            {
              "label": "techlusive.in",
              "url": "https://www.techlusive.in/features/im-skipping-the-chatgpt-palm-reading-viral-trend-and-you-might-want-to-too-1659773/"
            }
          ],
          "tags": [
            "프롬프트디자인",
            "커뮤니티",
            "openai",
            "bytedance",
            "community"
          ]
        },
        {
          "date": "4/30",
          "platform": "X",
          "title": "OpenAI Codex Auto-Review 모드 추가 — 별도 에이전트가 sandbox 경계 자동 승인",
          "summary": "Default 모드(매번 승인) vs Full Access(승인 없음) 사이에 'Auto-review'가 추가돼, 별도 리뷰 에이전트가 sandbox 경계 액션을 자동 승인. OpenAI 내부 Codex Desktop 토큰 대부분이 Auto-review로 전환 중.",
          "content": "이게 뭐예요?\nDefault 모드(매번 승인) vs Full Access(승인 없음) 사이에 'Auto-review'가 추가돼, 별도 리뷰 에이전트가 sandbox 경계 액션을 자동 승인. OpenAI 내부 Codex Desktop 토큰 대부분이 Auto-review로 전환 중.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 에이전트자동화 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\napprovals_reviewer = 'auto_review'로 설정. 기존 default permission(읽기/지정 경로 쓰기/local cmd)을 유지하면서 인간 개입 빈도를 낮추는 안전 기본값.\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://alignment.openai.com/auto-review",
          "officialUrl": "https://alignment.openai.com/auto-review",
          "backupUrls": [
            {
              "label": "OpenAI 공식",
              "url": "https://developers.openai.com/codex/agent-approvals-security"
            },
            {
              "label": "OpenAI 공식",
              "url": "https://developers.openai.com/codex/changelog"
            }
          ],
          "tags": [
            "에이전트자동화",
            "공식",
            "openai"
          ]
        },
        {
          "date": "4/30",
          "platform": "X",
          "title": "OpenAI Codex CLI — /goal 슬래시 커맨드 (내장형 Ralph Loop, 장기 자율 코딩)",
          "summary": "Codex CLI 0.128.0이 plan→act→test→review→iterate 자가 평가 루프를 first-class 명령으로 내장 — Geoffrey Huntley의 Ralph 루프 패턴이 공식 제품에 흡수됨",
          "content": "이게 뭐예요?\nCodex CLI 0.128.0이 plan→act→test→review→iterate 자가 평가 루프를 first-class 명령으로 내장 — Geoffrey Huntley의 Ralph 루프 패턴이 공식 제품에 흡수됨\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 에이전트자동화 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\n토큰 예산 도달까지 자동 반복. TUI에서 create/pause/resume/clear 가능. Codex 메이커가 '가장 중대한 출시 중 하나'로 자평\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://simonwillison.net/2026/Apr/30/codex-goals/",
          "officialUrl": "https://simonwillison.net/2026/Apr/30/codex-goals/",
          "backupUrls": [
            {
              "label": "OpenAI 공식",
              "url": "https://developers.openai.com/codex/cli/slash-commands"
            },
            {
              "label": "ralphable.com",
              "url": "https://ralphable.com/blog/codex-goal-command-ralph-loop-openai-built-in-autonomous-coding-agent-2026"
            }
          ],
          "tags": [
            "에이전트자동화",
            "공식",
            "openai"
          ]
        }
      ]
    },
    {
      "name": "커뮤니티 / 오픈소스",
      "color": "#6B7280",
      "posts": [
        {
          "date": "4/27",
          "platform": "X",
          "title": "중국, Meta의 Manus 인수($2B) 차단 — 외국인 투자 금지 결정",
          "summary": "Manus가 싱가포르로 본사 이전 + 중국 사무소 폐쇄까지 했음에도 중국 NDRC가 외국인 투자 금지로 차단 — 'Singapore Washing' 만으로는 중국 기술 통제를 피하지 못한다는 신호",
          "content": "이게 뭐예요?\nManus가 싱가포르로 본사 이전 + 중국 사무소 폐쇄까지 했음에도 중국 NDRC가 외국인 투자 금지로 차단 — 'Singapore Washing' 만으로는 중국 기술 통제를 피하지 못한다는 신호\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 수익화사례 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nvendors에 'meta' 항목 스키마에 없어 community로 표기. Manus는 2025년 3월 등장, 5월 Benchmark 주도 $75M 라운드. 미·중 동시 심사\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://www.cnbc.com/2026/04/27/meta-manus-china-blocks-acquisition-ai-startup.html",
          "officialUrl": "https://www.cnbc.com/2026/04/27/meta-manus-china-blocks-acquisition-ai-startup.html",
          "backupUrls": [
            {
              "label": "TechCrunch",
              "url": "https://techcrunch.com/2026/04/27/china-vetoes-metas-2b-manus-deal-after-months-long-probe/"
            },
            {
              "label": "bloomberg.com",
              "url": "https://www.bloomberg.com/news/articles/2026-04-27/china-blocks-meta-s-2-billion-acquisition-of-ai-startup-manus"
            }
          ],
          "tags": [
            "수익화사례",
            "공식",
            "community"
          ]
        },
        {
          "date": "4/28",
          "platform": "X",
          "title": "맥도날드 AI 챗봇(Grimace) — Python 스크립트 작성 사례 바이럴, 진위 미확정",
          "summary": "맥도날드 고객지원 AI 'Grimace'(Claude 기반)에 'order 전에 Python 스크립트 짜줘' 프롬프트로 코드 답변 받아냈다는 스크린샷 바이럴. '구독 없이도 무료 AI'라는 농담.",
          "content": "이게 뭐예요?\n맥도날드 고객지원 AI 'Grimace'(Claude 기반)에 'order 전에 Python 스크립트 짜줘' 프롬프트로 코드 답변 받아냈다는 스크린샷 바이럴. '구독 없이도 무료 AI'라는 농담.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 프롬프트디자인 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nFast Company·NeuralTrust 분석: 미국에는 맥도날드 챗봇이 없고, 프랑스 맥도날드도 AI 헬프 없음. 내부 조사도 exploit 미발견. 영상에서도 'Frontier 항공 비행 chatbot은 막혀있더라'며 prompt injection 사례로 소개. 출처는 Threads/X 바이럴 게시물.\n\n확인 포인트\n아직 공식 발표가 아닌 신호입니다. 기능, 회사명, 출시 시점은 확정된 사실보다 검증이 필요한 가능성으로 읽는 편이 안전합니다.",
          "source": "https://www.threads.com/@chatgptricks/post/DXXhBhSEhTc/why-pay-for-ai-when-mc-donalds-support-bot-is-free",
          "officialUrl": "https://www.threads.com/@chatgptricks/post/DXXhBhSEhTc/why-pay-for-ai-when-mc-donalds-support-bot-is-free",
          "backupUrls": [
            {
              "label": "fastcompany.com",
              "url": "https://www.fastcompany.com/91532091/mcdonalds-ai-bot-didnt-go-rogue"
            },
            {
              "label": "neuraltrust.ai",
              "url": "https://neuraltrust.ai/blog/mcdonald-chatbot"
            },
            {
              "label": "X 원문",
              "url": "https://x.com/i/trending/2045970601953698280"
            }
          ],
          "tags": [
            "프롬프트디자인",
            "루머",
            "community"
          ]
        },
        {
          "date": "4/28",
          "platform": "X",
          "title": "Nulli — Qwen 3 기반 동영상 자막 번역·더빙 서비스",
          "summary": "영상 다국어 자막·번역·더빙을 목표로 한 커뮤니티 서비스. Qwen 3 기반 음성 톤 매칭을 내세우지만 공식 도메인과 1차 게시글 확인이 더 필요한 항목.",
          "content": "이게 뭐예요?\n영상 다국어 자막·번역·더빙을 목표로 한 커뮤니티 서비스입니다. Qwen 3 기반으로 YouTube 기본 더빙보다 자연스러운 음성 톤 매칭을 내세우지만, 공식 도메인과 1차 게시글 확인이 더 필요합니다.\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 수익화사례 흐름에 속합니다. 수강생 입장에서는 AI 영상 번역이 빠르게 개인·소규모 서비스로 내려오는 사례로 보면 됩니다.\n\n조금 더 풀어보면\n공식 도메인/Product Hunt 페이지는 아직 확인되지 않았습니다. Qwen 3 관련 공식 자료는 Alibaba Cloud 원문을 우선 연결해 두고, 서비스 자체는 추가 검증 대상으로 남깁니다.\n\n확인 포인트\n커뮤니티 기반 소식은 확산이 빠른 만큼 재현성, 라이선스, 유지보수 상태를 함께 확인해야 합니다.",
          "source": "https://www.alibabacloud.com/blog/qwen3%E2%80%91livetranslate-real%E2%80%91time-multimodal-interpretation-%E2%80%94-see-it-hear-it-speak-it%EF%BC%81_602585",
          "officialUrl": "https://www.alibabacloud.com/blog/qwen3%E2%80%91livetranslate-real%E2%80%91time-multimodal-interpretation-%E2%80%94-see-it-hear-it-speak-it%EF%BC%81_602585",
          "backupUrls": [
            {
              "label": "alibabacloud.com",
              "url": "https://www.alibabacloud.com/blog/qwen3%E2%80%91livetranslate-real%E2%80%91time-multimodal-interpretation-%E2%80%94-see-it-hear-it-speak-it%EF%BC%81_602585"
            }
          ],
          "tags": [
            "수익화사례",
            "커뮤니티",
            "community",
            "alibaba"
          ]
        },
        {
          "date": "날짜 미확인",
          "platform": "X",
          "title": "휴머노이드 로봇 댄스 영상 — AI 생성 가능성이 큰 바이럴 클립",
          "summary": "SNS에서 휴머노이드 로봇이 춤추는 short가 확산됐지만, 실제 로봇 촬영보다 AI 생성 영상일 가능성이 높습니다. 로봇 모션 경쟁이 대중 콘텐츠처럼 소비되는 흐름과 AI 영상이 기대감을 증폭시키는 방식을 함께 보여주는 참고 사례입니다.",
          "content": "**이게 뭐예요?**\n휴머노이드 로봇이 사람처럼 춤추는 short가 SNS에서 확산된 사례입니다. 다만 영상의 출처와 모델명이 공식적으로 확인되지 않았고, 실제 로봇 촬영보다 AI 생성 영상일 가능성이 높습니다.\n\n**무엇이 달라졌나?**\n중요한 포인트는 이 영상을 실제 로봇 성능으로 단정하는 것이 아니라, 로봇 이미지와 AI 영상이 섞여 대중 콘텐츠처럼 소비되는 속도입니다. 사람들은 로봇의 기술적 스펙보다 춤, 스포츠, 공연처럼 감정적으로 이해되는 장면에 먼저 반응합니다.\n\n**어떻게 읽을까?**\nBoston Dynamics나 특정 회사의 공식 데모로 보기에는 근거가 부족합니다. Unitree, Tesla Optimus, Boston Dynamics 등 실제 로봇 경쟁과 별개로, AI 생성 영상이 로봇 기대감을 증폭시키는 방식까지 함께 봐야 합니다.\n\n**확인 포인트**\nSNS 클립은 공식 채널, 원본 영상, 모델명, 생성 여부를 분리해서 확인해야 합니다. 실제 로봇 성능 뉴스라기보다, AI 영상과 로봇 기대감이 섞이는 현상을 보여주는 참고 사례로 읽는 편이 안전합니다.",
          "source": "https://x.com/pukerrainbrow/status/2051208032873554013",
          "officialUrl": "https://x.com/pukerrainbrow/status/2051208032873554013",
          "tags": [
            "로보틱스",
            "AI영상",
            "휴머노이드",
            "커뮤니티"
          ]
        },
        {
          "date": "4/30",
          "platform": "X",
          "title": "Stripe Link — AI 에이전트 결제용 디지털 지갑 (OAuth + spend request 승인)",
          "summary": "AI 에이전트가 카드 정보 노출 없이 OAuth로 Link 지갑에 권한 받고 spend request → 사용자 알림 승인 후 결제 — 에이전트 쇼핑·구독 관리·청구 추적까지 표준화",
          "content": "이게 뭐예요?\nAI 에이전트가 카드 정보 노출 없이 OAuth로 Link 지갑에 권한 받고 spend request → 사용자 알림 승인 후 결제 — 에이전트 쇼핑·구독 관리·청구 추적까지 표준화\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 에이전트자동화 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nSessions 2026 컨퍼런스에서 288개 런칭 중 핵심. 추후 한도 설정·자동 승인·agentic token·stablecoin 지원 예정\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://stripe.com/newsroom/news/sessions-2026",
          "officialUrl": "https://stripe.com/newsroom/news/sessions-2026",
          "backupUrls": [
            {
              "label": "TechCrunch",
              "url": "https://techcrunch.com/2026/04/30/stripe-link-digital-wallet-ai-agents-shopping/"
            },
            {
              "label": "stripe.com",
              "url": "https://stripe.com/blog/everything-we-announced-at-sessions-2026"
            }
          ],
          "tags": [
            "에이전트자동화",
            "공식",
            "community"
          ]
        },
        {
          "date": "5/01",
          "platform": "X",
          "title": "Meta, ARI(Assured Robot Intelligence) 인수 — 휴머노이드 로봇 풋 모델 사업 확장",
          "summary": "Xiaolong Wang·Lerrel Pinto 등 ARI 20명이 Meta Superintelligence Labs 합류 — 자체 로봇 대신 'Android for humanoids' 라이선스 플랫폼 전략",
          "content": "이게 뭐예요?\nXiaolong Wang·Lerrel Pinto 등 ARI 20명이 Meta Superintelligence Labs 합류 — 자체 로봇 대신 'Android for humanoids' 라이선스 플랫폼 전략\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 수익화사례 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nvendors에 'meta' 항목 스키마에 없어 community로 표기. 인수가 비공개. CTO Andrew Bosworth: '소프트웨어 레이어가 로봇 개발 진짜 병목'\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://techcrunch.com/2026/05/01/meta-buys-robotics-startup-to-bolster-its-humanoid-ai-ambitions/",
          "officialUrl": "https://techcrunch.com/2026/05/01/meta-buys-robotics-startup-to-bolster-its-humanoid-ai-ambitions/",
          "backupUrls": [
            {
              "label": "engadget.com",
              "url": "https://www.engadget.com/2162606/meta-acquires-assured-robot-intelligence-humanoid-ai/"
            },
            {
              "label": "the-decoder.com",
              "url": "https://the-decoder.com/meta-acquires-assured-robot-intelligence-to-accelerate-humanoid-robot-push/"
            }
          ],
          "tags": [
            "수익화사례",
            "공식",
            "community"
          ]
        },
        {
          "date": "5/01",
          "platform": "X",
          "title": "xAI Grok Imagine — Agent Mode (캔버스 기반 단편 영화·이미지·영상 통합 워크스페이스)",
          "summary": "무한 캔버스에서 에이전트가 단편 영화·만화·UGC·브랜드 아이덴티티를 plan→generate→edit→revise — 정적 이미지를 영상으로 자동 변환·페이드·트리밍까지 한 화면에서",
          "content": "이게 뭐예요?\n무한 캔버스에서 에이전트가 단편 영화·만화·UGC·브랜드 아이덴티티를 plan→generate→edit→revise — 정적 이미지를 영상으로 자동 변환·페이드·트리밍까지 한 화면에서\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 에이전트자동화 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nvendors에 'xai' 항목이 스키마에 없어 community로 표기. Elon Musk가 X에서 직접 베타 공지. 유료 계정 필요\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://www.testingcatalog.com/xai-debuts-imagine-agent-in-grok-with-open-canvas-ai-workspace/",
          "officialUrl": "https://www.testingcatalog.com/xai-debuts-imagine-agent-in-grok-with-open-canvas-ai-workspace/",
          "backupUrls": [
            {
              "label": "grok.com",
              "url": "https://grok.com/imagine"
            },
            {
              "label": "the-decoder.com",
              "url": "https://the-decoder.com/xai-drops-grok-4-3-with-steep-price-cuts-and-an-imagine-agent-mode-for-creative-projects/"
            }
          ],
          "tags": [
            "에이전트자동화",
            "공식",
            "community"
          ]
        },
        {
          "date": "5/02",
          "platform": "X",
          "title": "MIT Media Lab Human Operator — 전기근육자극(EMS)으로 AI가 사람 손 제어 (Hard Mode 해커톤 1위)",
          "summary": "VLM(Claude API) + 머리 카메라 + 음성 입력 + Arduino EMS 릴레이 — AI가 사용자 손가락·손목을 직접 움직여 OK 사인, 모르던 피아노 연주, 그림 그리기, 칵테일 제조까지 수행",
          "content": "이게 뭐예요?\nVLM(Claude API) + 머리 카메라 + 음성 입력 + Arduino EMS 릴레이 — AI가 사용자 손가락·손목을 직접 움직여 OK 사인, 모르던 피아노 연주, 그림 그리기, 칵테일 제조까지 수행\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 에이전트자동화 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nPeter He·Ashley Neall·Valdemar Danry·Daniel Kaijzer·Yutong Wu·Sean Lewis 6인 팀. MIT Hard Mode 2026 'Learn Track' 1위. UChicago HCI Lab 선행 연구 인용\n\n확인 포인트\n커뮤니티 기반 소식은 확산이 빠른 만큼 재현성, 라이선스, 유지보수 상태를 함께 확인해야 합니다.",
          "source": "https://humanoperator.org/",
          "officialUrl": "https://humanoperator.org/",
          "backupUrls": [
            {
              "label": "founded.com",
              "url": "https://www.founded.com/human-operator-ai-that-can-control-your-body/"
            },
            {
              "label": "letsdatascience.com",
              "url": "https://letsdatascience.com/news/mit-hackathon-team-builds-wearable-ai-that-moves-limbs-eac3840b"
            },
            {
              "label": "X 원문",
              "url": "https://x.com/Kristennetten/status/2050457565256187946"
            }
          ],
          "tags": [
            "에이전트자동화",
            "커뮤니티",
            "community",
            "anthropic"
          ]
        },
        {
          "date": "5/02",
          "platform": "X",
          "title": "Mistral Medium 3.5 — 128B 댄스 모델 + Le Chat Vibe 원격 코딩 에이전트",
          "summary": "Mistral의 첫 통합 플래그십 — Magistral(추론) + Devstral 2(코딩)가 단일 128B dense로 합쳐지고 SWE-Bench Verified 77.6%, 256k 컨텍스트, GPU 4장으로 셀프 호스트",
          "content": "이게 뭐예요?\nMistral의 첫 통합 플래그십 — Magistral(추론) + Devstral 2(코딩)가 단일 128B dense로 합쳐지고 SWE-Bench Verified 77.6%, 256k 컨텍스트, GPU 4장으로 셀프 호스트\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 도구릴리스 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nvendors에 'mistral' 항목이 스키마에 없어 community로 표기. Modified MIT 오픈 가중치. Vibe 원격 에이전트가 GitHub PR 자동 오픈\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://mistral.ai/news/vibe-remote-agents-mistral-medium-3-5",
          "officialUrl": "https://mistral.ai/news/vibe-remote-agents-mistral-medium-3-5",
          "backupUrls": [
            {
              "label": "Hugging Face",
              "url": "https://huggingface.co/mistralai/Mistral-Medium-3.5-128B"
            },
            {
              "label": "marktechpost.com",
              "url": "https://www.marktechpost.com/2026/05/02/mistral-ai-launches-remote-agents-in-vibe-and-mistral-medium-3-5-with-77-6-swe-bench-verified-score/"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "community"
          ]
        },
        {
          "date": "5/02",
          "platform": "X",
          "title": "xAI Grok API — Voice Cloning 정식 출시 (2분 미만, 80+ 보이스 라이브러리, 28언어)",
          "summary": "1분 음성 녹음으로 본인 음성 모델 2분 내 생성 — Voice Agent API $0.05/분, TTS $4.20/M 글자, 추가 과금 없음. 보이스 검증(STT 매칭+화자 임베딩)으로 도용 방지",
          "content": "이게 뭐예요?\n1분 음성 녹음으로 본인 음성 모델 2분 내 생성 — Voice Agent API $0.05/분, TTS $4.20/M 글자, 추가 과금 없음. 보이스 검증(STT 매칭+화자 임베딩)으로 도용 방지\n\n왜 중요해요?\n이 항목은 이번 VOL.03의 도구릴리스 흐름에 속합니다. 핵심은 최신 모델 이름보다, 이 변화가 업무·학습·제작 흐름의 어느 부분을 바꾸는지입니다.\n\n조금 더 풀어보면\nvendors에 'xai' 항목이 스키마에 없어 community로 표기. Custom Voices 엔드포인트: api.x.ai/v1/custom-voices. 오디오북·게임·에이전트용\n\n확인 포인트\n공식 출처 기반 소식입니다. 실제 활용 전에는 가격, 지역, 접근 권한을 함께 확인해야 합니다.",
          "source": "https://x.ai/news/grok-custom-voices",
          "officialUrl": "https://x.ai/news/grok-custom-voices",
          "backupUrls": [
            {
              "label": "X 원문",
              "url": "https://x.com/xai/status/2050355373052223585"
            },
            {
              "label": "docs.x.ai",
              "url": "https://docs.x.ai/developers/model-capabilities/audio/custom-voices"
            }
          ],
          "tags": [
            "도구릴리스",
            "공식",
            "community"
          ]
        }
      ]
    },
    {
      "name": "한국·커뮤니티",
      "color": "#A855F7",
      "posts": [
        {
          "date": "4/28",
          "platform": "X",
          "title": "Open Design (open claude design) — Claude Design 95% 재현 오픈소스 (Tom Huang, 71+ 디자인 시스템 / 30+ 스킬)",
          "summary": "Claude Design 95%+ 재현한 오픈소스 — 72시간 18,700줄, 30+ 디자인 스킬, 71+ 브랜드 시스템, Claude Code/Codex/Cursor/OpenClaw/Opencode 모든 code agent 호환. 본인 API 키나 구독으로 무료로 Claude Design 수준 결과물 가능.",
          "content": "이게 뭐예요?\nTom Huang이 공개한 Open Design은 Claude Design을 95% 이상 재현했다고 소개된 오픈소스 프로젝트입니다. 71개 이상의 디자인 시스템과 30개 이상의 디자인 스킬을 묶어, Claude Code·Codex·Cursor·OpenClaw 같은 code agent에서 바로 디자인 결과물을 만들게 하는 구조입니다.\n\n왜 중요해요?\n공식 Claude Design을 기다리거나 별도 제품 접근권을 받지 않아도, 내 API 키와 로컬 워크플로우로 비슷한 경험을 실험할 수 있습니다. 특히 한국 lucas 큐레이션을 통해 빠르게 퍼졌고, 수강생이 직접 시연하기 좋은 무료·오픈소스 카드입니다.\n\n확인 포인트\nGitHub 저장소를 열고, 프로젝트 폴더에서 원하는 브랜드 시스템을 하나 고른 뒤 '이 디자인 시스템을 기반으로 랜딩 페이지 컴포넌트를 만들어줘'라고 시도해보세요. 공식 제품과 완전히 같다고 단정하기보다, 오픈소스 구현으로 어디까지 따라왔는지 보는 관점이 좋습니다.",
          "source": "https://github.com/nexu-io/open-d",
          "officialUrl": "https://github.com/nexu-io/open-d",
          "backupUrls": [
            {
              "label": "X 원문",
              "url": "https://x.com/tuturetom/status/2049066330934976610"
            },
            {
              "label": "X 원문",
              "url": "https://x.com/lucas_flatwhite/status/2049319728783728908"
            },
            {
              "label": "Threads 원문",
              "url": "https://www.threads.com/@voidlight00/post/DXs0_Skj1t6"
            }
          ],
          "tags": [
            "도구릴리스",
            "커뮤니티",
            "community",
            "korea"
          ],
          "featured": true
        }
      ]
    }
  ]
};
