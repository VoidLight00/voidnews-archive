import type { WeeklyData } from "../data";

// Official-date-verified items; boundary backfill verified 2026-09-08. Anthropic date-only sources retain publisher dates with visible timezone disclosures.
export const week35: WeeklyData = {
  week: 35,
  year: 2026,
  slug: "2026-w35",
  period: "8/24 ~ 8/30",
  totalPosts: 24,
  companies: [
    {
      name: "OpenAI Fact Check",
      color: "#6B7280",
      posts: [
        {
          date: "8/27",
          platform: "X+Threads",
          title: "‘GPT-6 학습 중단’ 주장은 아직 공식 원출처에서 확인되지 않았다",
          deck: "OpenAI 공식 발표·공개 Threads·검색 인덱스에서 GPT-6 학습 중단 사건의 근거를 찾지 못함",
          summary: "GPT-6라는 모델명과 학습 중단·일시정지·취소 사건은 OpenAI 공식 발표에서 확인되지 않음 공개 Threads 검색과 Bing RSS 검색에서도 원보도·관계자 원문이 발견되지 않음 현재 OpenAI 공식 홈페이지에서 확인되는 최신 계열은 GPT-5.6 주의: 부재 증거는 사건이 절대 없다는 증명이 아니며, 원출처가 나오기 전까지 미확인 주장으로 보류.",
          content: "**편집 검증 안내**\n\nAB 2026-08b의 동일 사건 항목에는 프런티어 RL 학습 중단을 설명하는 공식 문서 URL이 기록돼 있어, 아래 초기 검색 기록과 확인 범위가 다릅니다. 이번 재검토에서는 해당 문서가 HTTP 403으로 응답해 본문을 다시 확인하지 못했습니다. 초기 검색에서 원문을 찾지 못했다는 기록을 학습 중단 자체가 없었다는 근거로 해석해서는 안 됩니다. 학습 중단 여부와 GPT-6라는 모델명은 별도의 주장으로 검증해야 합니다.\n\n**기존 편집 기록: GPT-6 학습 중단을 사실로 확정할 근거가 없습니다**\n\n8월 27일 기준 OpenAI 공식 홈페이지, 공개 Threads 검색, Bing RSS와 일반 검색에서 `GPT-6`라는 모델의 학습 중단·일시정지·취소를 발표한 원문을 찾지 못했습니다. 검색 결과는 GPT-4·GPT-5·GPT-5.6 일반 정보로 돌아갔고, 해당 사건을 보도한 신뢰 가능한 원기사도 확인되지 않았습니다.\n\n**검증 한계**\n\n공개 자료에서 찾지 못했다는 사실이 내부 학습 실행의 부재를 증명하지는 않습니다. 다만 원출처 없이 ‘GPT-6 학습이 중단됐다’고 카드 제목에 확정적으로 쓰는 것은 오보 위험이 큽니다.\n\n**직접 확인할 것**\n\nOpenAI 공식 발표, 공식 관계자의 식별 가능한 원문, 또는 복수의 신뢰 가능한 보도가 나올 때까지 미확인 주장으로 보류하십시오.",
          source: "https://openai.com/",
          officialUrl: "https://openai.com/",
          verifiedAt: "2026-08-27",
          backupUrls: [{ label: "OpenAI 한국어 공식 홈페이지", url: "https://openai.com/ko-KR/" }],
          tags: ["AI", "2026-08b", "OpenAI", "팩트체크", "미확인"],
          slug: "openai-20260827-gpt6-training-stop-unverified",
          en: {
            title: "The claim that GPT-6 training stopped remains unverified",
            deck: "No official OpenAI source or identifiable original report was found.",
            summary: "As of August 27, no OpenAI announcement or traceable original report confirms a GPT-6 training stop, pause or cancellation. The claim remains unverified pending a primary source.",
            content: "**Editorial verification notice**\n\nThe AB 2026-08b entry for this event records a specific official document URL, unlike the initial search record below. During this review the document returned HTTP 403, so its contents could not be reverified. Failure to find a source in the initial search is not evidence that no training pause occurred. The training-pause claim and the GPT-6 name must be verified separately.\n\n**Earlier editorial record**\n\nAs of August 27, no OpenAI announcement or traceable original report confirms a GPT-6 training stop, pause or cancellation. Failure to find a public source does not prove no internal run exists, but the claim should not be presented as fact without primary evidence.",
          },
        },
      ],
    },
    {
      name: "Physical AI",
      color: "#D97706",
      posts: [
        {
          date: "8/27",
          platform: "Threads",
          title: "Tiangong Omni, 휴머노이드 로봇 게임 400m를 45.66초에 완주",
          deck: "팔을 높이 든 독특한 자세로 World Humanoid Robot Games 400m 우승",
          summary: "Tiangong Omni가 베이징 World Humanoid Robot Games 400m를 45.66초에 완주하고 우승했다는 행사 출처 영상 공개 곡선 구간에서 몸을 앞으로 기울이고 균형을 지속 보정하는 달리기 모습 확인 주의: 원게시물은 제어 방식과 자율 주행 여부를 명시하지 않으며, 자세를 로봇이 스스로 발견했다는 주장은 공식 개발사 근거 미확인.",
          content: "**피지컬 AI의 진전은 달리기 자세보다 완주 조건에서 봐야 합니다**\n\nTiangong Omni가 베이징 World Humanoid Robot Games의 400m 경기에서 45.66초로 우승했다는 영상이 공개됐습니다. 영상에서는 팔을 얼굴 가까이 높이 들고 몸을 앞으로 기울인 채 곡선을 도는 독특한 주법을 확인할 수 있습니다.\n\n**검증 한계**\n\n원게시물은 출처를 World Humanoid Robot Games로 적었지만 원격조종·자율제어·혼합제어 가운데 어떤 방식인지 밝히지 않았습니다. 관련 재게시물의 ‘자세를 자율적으로 발견했다’는 설명은 공식 개발사 원문으로 확인되지 않아 카드에서 제외했습니다.\n\n**직접 확인할 것**\n\n피지컬 AI 데모를 평가할 때 기록뿐 아니라 제어 방식, 넘어짐·재시도, 배터리, 트랙 조건과 동일 하드웨어 여부를 함께 확인하십시오.",
          source: "https://www.threads.com/@uncover.robotics/post/DcgoEiLkvGU",
          officialUrl: "https://www.threads.com/@uncover.robotics/post/DcgoEiLkvGU",
          verifiedAt: "2026-08-27",
          backupUrls: [{ label: "곡선 주행 영상", url: "https://www.threads.com/@techniahqrobot/post/Dcb9Eljjar4" }, { label: "결승선 우승 영상", url: "https://www.threads.com/@lincoln_robotics_space/post/DcYsY-CCa4D" }],
          threadsEmbedUrl: "https://www.threads.net/@uncover.robotics/post/DcgoEiLkvGU/embed",
          tags: ["AI", "2026-08b", "Physical AI", "휴머노이드", "로봇"],
          slug: "physical-ai-20260827-tiangong-omni-400m",
          en: {
            title: "Tiangong Omni completes the humanoid robot 400 m in 45.66 seconds",
            deck: "The unusual running form won the World Humanoid Robot Games race.",
            summary: "A World Humanoid Robot Games-sourced video shows Tiangong Omni winning the 400 m in 45.66 seconds. The source does not specify autonomous, remote or mixed control.",
            content: "A World Humanoid Robot Games-sourced video shows Tiangong Omni winning the 400 m in 45.66 seconds. Its unusual raised-arm posture is visible, but the source does not specify autonomous, remote or mixed control, and an independent official source for the claim that the posture was self-discovered was not found.",
          },
        },
      ],
    },
    {
      name: "Z.ai",
      color: "#2F61D5",
      posts: [
        {
          date: "8/26",
          platform: "X+Threads",
          title: "GLM-5.3-Flash 공개, OpenRouter 익명 모델 Ox Alpha의 정체였다",
          deck: "320B 중 18B만 활성화하고 네이티브 멀티모달·100만 토큰 컨텍스트 제공",
          summary: "Z.ai GLM-5.3-Flash는 320B total·18B active 구조와 이미지·영상 입력, 1,048,576토큰 컨텍스트를 제공 OpenRouter가 stealth model Ox Alpha의 정체가 GLM-5.3-Flash였다고 공식 FAQ에서 확인 현재 할인 가격은 입력 $0.075/M·출력 $0.25/M·캐시 읽기 $0.015/M 주의: 성능 비교와 10분의 1 가격 주장은 Z.ai 자체 보고.",
          content: "**Ox Alpha의 정체가 공개됐습니다**\n\nZ.ai는 GLM-5.3-Flash를 320B total·18B active 네이티브 멀티모달 모델로 공개했습니다. OpenRouter 공식 FAQ는 이전 stealth model Ox Alpha가 GLM-5.3-Flash였다고 확인합니다. OpenRouter 사양은 1,048,576토큰 컨텍스트와 최대 131,072토큰 출력입니다.\n\n**직접 확인할 것**\n\nOx Alpha 사용 기록이 있다면 `z-ai/glm-5.3-flash`에서 동일 프롬프트를 다시 실행해 품질·총 토큰·비용을 비교하십시오. GLM-5.2 및 Claude Opus 4.8 비교는 Z.ai 자체 평가입니다.",
          source: "https://openrouter.ai/z-ai/glm-5.3-flash",
          officialUrl: "https://openrouter.ai/z-ai/glm-5.3-flash",
          verifiedAt: "2026-08-26",
          backupUrls: [{ label: "Z.ai GLM-5 공식 저장소", url: "https://github.com/zai-org/GLM-5" }, { label: "Hugging Face 공식 가중치", url: "https://huggingface.co/zai-org/GLM-5.3-Flash" }],
          tags: ["AI", "2026-08b", "GLM", "OpenRouter"],
          slug: "zai-20260826-glm-5-3-flash-ox-alpha",
          en: { title: "GLM-5.3-Flash launches as the model behind OpenRouter's Ox Alpha", deck: "The native multimodal MoE activates 18B of 320B parameters with a one-million-token context.", summary: "Z.ai released GLM-5.3-Flash on August 26. OpenRouter identifies it as the former stealth model Ox Alpha and lists a 1,048,576-token context at discounted pricing of $0.075/M input and $0.25/M output tokens.", content: "Z.ai released GLM-5.3-Flash on August 26. OpenRouter identifies it as the former stealth model Ox Alpha. Benchmark comparisons remain vendor-reported." },
        }
      ],
    },
    {
      name: "Apple",
      color: "#111111",
      posts: [
        {
          date: "8/25",
          platform: "X+Threads",
          title: "Apple, 첫 2nm M6와 최대 512GB 메모리 M5 Ultra 공개",
          deck: "M6는 Apple 첫 2nm 칩으로 12코어 CPU·12코어 GPU·듀얼 16코어 Neural Engine·최대 32GB 통합 메모리를 제공",
          summary: "M6는 Apple 첫 2nm 칩으로 12코어 CPU·12코어 GPU·듀얼 16코어 Neural Engine·최대 32GB 통합 메모리를 제공 M5 Ultra는 최대 80코어 GPU·32코어 Neural Engine·최대 512GB 통합 메모리·1.2TB/s 대역폭 제공 Apple 자체 테스트로 M6 AI GPU 연산은 M5 대비 약 30%, M5 Ultra는 M3 Ultra 대비 최대 4.5배 향상 주장 새 Mac mini와 Mac Studio에 각각 탑재 주의: 성능 수치는 Apple 자체 테스트; 가격·판매 개시일은 공식 본문에서 미확인.",
          source: "https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/",
          officialUrl: "https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/",
          verifiedAt: "2026-08-26",
          backupUrls: [],
          tags: ["AI", "2026-08b"],
          slug: "apple-20260825-m6-m5-ultra",
          thumbnail: {
            src: "/og-cache/apple-첫-2nm-m6와-최대-512gb-메모리-m5-ultra-공개-9e0dcfcc.jpg",
            alt: "Apple, 첫 2nm M6와 최대 512GB 메모리 M5 Ultra 공개",
          },
          en: { title: "Apple unveils its first 2 nm M6 and an M5 Ultra with up to 512 GB", deck: "Local AI hardware expands in the Mac mini and Mac Studio.", summary: "Apple announced M6 for Mac mini and M5 Ultra for Mac Studio. Vendor specifications include up to 512 GB unified memory and 1.2 TB/s bandwidth on M5 Ultra; performance figures are Apple tests." },
        }
      ],
    },
    {
      name: "Anthropic",
      color: "#E87040",
      posts: [
        {
          date: "8/25",
          platform: "X+Threads",
          title: "Claude Code, glibc 2.44 리눅스 시작 충돌 수정",
          deck: "Arch Linux·CachyOS·Fedora Rawhide처럼 glibc 2.44를 제공하는 리눅스 배포판에서 시작 시 충돌하던 문제 수정",
          summary: "Arch Linux·CachyOS·Fedora Rawhide처럼 glibc 2.44를 제공하는 리눅스 배포판에서 시작 시 충돌하던 문제 수정 주의: 단일 버그 수정 릴리스.",
          source: "https://github.com/anthropics/claude-code/releases/tag/v2.1.245",
          officialUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.245",
          verifiedAt: "2026-08-26",
          backupUrls: [],
          tags: ["AI", "2026-08b"],
          slug: "claude-code-20260825-v2-1-245",
          en: { title: "Claude Code fixes startup crashes on glibc 2.44 Linux", deck: "A focused stability release for current Linux distributions.", summary: "Claude Code 2.1.245 fixes startup crashes on distributions shipping glibc 2.44, including Arch Linux, CachyOS and Fedora Rawhide." },
        },
        {
          date: "8/26",
          platform: "X+Threads",
          title: "Claude Code, Auto mode 규칙 편집과 MCP 중단 오류·자격 증명 전송 경계 수정",
          deck: "/permissions에 Auto mode 분류 규칙 조회·편집 탭 추가",
          summary: "/permissions에 Auto mode 분류 규칙 조회·편집 탭 추가 headless/remote에서 incoming message로 중단된 MCP 호출을 성공이 아니라 interrupted error로 보고 제3자 ANTHROPIC_BASE_URL API 키가 Anthropic telemetry·metrics로 전송되던 문제 수정 malformed Bash 명령의 dangling && 또는 ||는 항상 승인 요구 background session·plugin·fullscreen·memory 관련 다수 안정성 수정 주의: 대규모 유지보수 릴리스이며 모든 수정의 독립 영향은 별도.",
          source: "https://github.com/anthropics/claude-code/releases/tag/v2.1.246",
          officialUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.246",
          verifiedAt: "2026-08-26",
          backupUrls: [],
          tags: ["AI", "2026-08b"],
          slug: "claude-code-20260826-v2-1-246",
          thumbnail: {
            src: "/source-images/04b0260a077913933b99caa7eff544cc8e8458ab83b5f596f589354f480fdb31.png",
            alt: "Release v2.1.246 · anthropics/claude-code — source link share preview",
            provenance: "source-share-preview",
          },
          en: { title: "Claude Code adds Auto mode rule editing and tightens MCP and credential boundaries", deck: "A large maintenance release focuses on agent-operation safety.", summary: "Claude Code 2.1.246 adds an Auto mode rules tab, reports interrupted MCP calls explicitly, prevents third-party gateway credentials reaching Anthropic telemetry, and hardens malformed Bash approvals." },
        },
        {
          "date": "8/28 07:12",
          "platform": "X+Threads",
          "title": "Claude Code, 실행 도구를 줄이는 restricted 모드 추가",
          "deck": "명령·코드 실행 도구를 제거하고 파일 접근을 작업 폴더 안으로 제한",
          "summary": "Claude Code 2.1.248에 `--restricted` 모드가 추가됐습니다. 명령·코드 실행 도구와 기본 WebFetch를 제거하고 파일 도구를 작업 폴더 안으로 제한합니다. `bypassPermissions`를 거부하며 사용자·프로젝트·로컬 설정을 무시합니다.",
          "content": "**더 좁은 실행 표면을 선택할 수 있습니다**\n\n`--restricted` 또는 `CLAUDE_CODE_RESTRICTED=1`을 사용하면 명령·코드 실행 도구가 제거되고, 별도로 허용하지 않은 WebFetch도 빠집니다. 파일 도구는 작업 폴더 안에서만 동작합니다.\n\n**설정과 권한 경계도 함께 고정합니다**\n\nrestricted 모드는 `bypassPermissions`를 거부하고 사용자·프로젝트·로컬 설정 파일을 무시합니다. 같은 릴리스에는 추가 클라우드 제공자 환경의 같은 기기 세션 간 메시지도 포함됐습니다. 내용은 공식 릴리스 노트 기준이며 독립 재실행 검증은 하지 않았습니다.",
          "source": "https://github.com/anthropics/claude-code/releases/tag/v2.1.248",
          "officialUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.248",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "Anthropic"
          ],
          "slug": "anthropic-20260828-claude-code-v2-1-248-restricted",
          "en": {
            "title": "Claude Code adds a restricted execution mode",
            "deck": "Restricted mode removes command and code execution tools and confines file access to the working directory.",
            "summary": "Claude Code 2.1.248 adds `--restricted`, removes command/code execution tools and default WebFetch, confines file tools to the working directory, rejects `bypassPermissions`, and ignores user, project and local settings.",
            "content": "**A narrower execution surface is now available**\n\n`--restricted` or `CLAUDE_CODE_RESTRICTED=1` removes command/code execution tools and WebFetch unless explicitly named. File tools remain inside the working directory.\n\n**Settings and permission boundaries are fixed together**\n\nThe mode rejects `bypassPermissions` and ignores user, project and local settings files. These claims come from release notes and were not independently reproduced."
          }
        },
        {
          "date": "8/29 03:19",
          "platform": "X+Threads",
          "title": "Claude Code, 모델 전환 훅과 캐시·지출 관측 기능 추가",
          "deck": "전환 전후 제어와 세션별 프롬프트 캐시 지표를 제공",
          "summary": "Claude Code 2.1.251은 `PreModelSwitch`·`PostModelSwitch` 훅과 세션별 프롬프트 캐시 지표를 추가했습니다. 승인된 위치 밖으로 심볼릭 링크를 바꿔 파일을 읽거나 쓰던 문제도 수정했습니다. 주의: 수정 효과는 이번 조사에서 재실행 검증하지 않았습니다.",
          "content": "**모델 전환을 자동화 경계로 다룰 수 있습니다**\n\n`PreModelSwitch`와 `PostModelSwitch` 훅은 모델이 바뀌기 전후에 차단·확인·주석 처리를 연결할 수 있습니다. `/cost`에는 세션별 캐시 적중률, 미스, 재캐시 토큰, warm/cold 상태가 표시됩니다. 일부 게이트웨이 사용자는 `/usage`에서 지출 한도도 볼 수 있습니다.\n\n**파일 접근 경계 수정도 포함됐습니다**\n\n권한 검사 뒤 작업 폴더 내부 심볼릭 링크가 바뀌어 승인 위치 밖을 읽거나 쓰는 문제를 수정했습니다. 이 내용은 공식 릴리스 노트에 근거합니다.",
          "source": "https://github.com/anthropics/claude-code/releases/tag/v2.1.251",
          "officialUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.251",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "Anthropic"
          ],
          "slug": "anthropic-20260829-claude-code-v2-1-251-observability",
          "en": {
            "title": "Claude Code adds model-switch hooks and cache/spend visibility",
            "deck": "Before/after model-switch hooks and per-session prompt-cache metrics improve operational visibility.",
            "summary": "Claude Code 2.1.251 adds PreModelSwitch and PostModelSwitch hooks, per-session prompt-cache metrics, and spend-limit visibility for supported gateways. It also fixes file tools following a swapped symlink outside the approved location.",
            "content": "**Model switching becomes an automation boundary**\n\nPreModelSwitch and PostModelSwitch hooks can block, confirm or annotate a switch. `/cost` reports per-session cache hit ratio, misses, recached tokens and warm/cold state; supported gateways also expose spend limits.\n\n**The release tightens file access**\n\nIt fixes file tools following a symlink swapped after permission checks to a location outside the approved root. The fix was not independently retested here."
          }
        },
        {
          "date": "8/27",
          "platform": "Web",
          "title": "Anthropic, AI가 실험 장비를 제어하는 MHS 연구 미리보기 공개",
          "summary": "Anthropic이 실험실 장비와 제조 기기를 공통 드라이버로 연결하는 Model Hardware Standard 연구 미리보기를 시작했습니다. 일부 연구실과 제조사가 참여하며 일반 공개된 완성 제품은 아닙니다.",
          "deck": "현미경·액체 처리기·로봇팔을 같은 제어 방식으로 연결",
          "content": "Anthropic은 일부 과학 연구실과 제조사를 대상으로 Model Hardware Standard 연구 미리보기를 시작했습니다. 프로그래밍 가능한 인터페이스가 있는 장비를 공통 드라이버로 연결하고, 장비 상태를 읽거나 설정값을 쓰는 작업을 표준화합니다.\n\n장비 설명에는 물리적 특성·기능·조절 가능한 값과 안전 제한이 포함됩니다. AI 에이전트는 MCP, 명령줄 도구, 코드 API로 여러 장비를 조율할 수 있습니다. 반복하거나 빠르게 실행해야 하는 절차는 매 단계 모델 판단 없이 실행하는 결정론적 스크립트로 전환할 수 있습니다.\n\n초기 사례에는 Genentech의 단백질 분석 자동화와 HHMI Janelia의 현미경 장비 연결 등이 포함됩니다. 현재 단계는 연구 미리보기이며, 일반 공개된 완성 규격이나 이미 오픈소스로 배포된 제품으로 표현하지 않습니다.\n\n날짜는 발행사가 표시한 2026-08-27 기준입니다. 게시 시각과 시간대가 공개되지 않아 정확한 한국 시각으로 환산하지 않았습니다.",
          "source": "https://www.anthropic.com/news/model-hardware-standard-research-preview",
          "officialUrl": "https://www.anthropic.com/news/model-hardware-standard-research-preview",
          "verifiedAt": "2026-09-08",
          "slug": "anthropic-20260827-model-hardware-standard",
          "en": {
            "title": "Anthropic previews the Model Hardware Standard",
            "summary": "Anthropic launched a research preview of the Model Hardware Standard, connecting laboratory and manufacturing equipment through common drivers. Selected labs and manufacturers are participating; this is not a general release.",
            "deck": "A common control layer for microscopes, liquid handlers and robotic arms",
            "content": "Anthropic launched a research preview of the Model Hardware Standard for selected scientific labs and manufacturers. MHS connects devices that have programmable interfaces through common drivers, standardizing state reads and setting writes.\n\nDevice descriptions include physical characteristics, capabilities, adjustable values and safety limits. Agents can coordinate equipment through MCP, command-line tools and code APIs. Repeated or high-speed procedures can be converted into deterministic scripts rather than requiring model reasoning at every step.\n\nInitial examples include Genentech’s protein-assay automation and HHMI Janelia’s microscopy integration. This is a research preview, not an already open-sourced general release.\n\nDate follows the publisher’s displayed 2026-08-27 calendar date. Publication time and timezone are unspecified; no exact KST conversion is asserted."
          },
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "Anthropic"
          ]
        },
        {
          "date": "8/27",
          "platform": "Web",
          "title": "Anthropic, 과학자에게 1년간 무료·할인 Claude 계정 1만 개 제공",
          "summary": "Anthropic이 과학자용 팀 요금제로 1만 개의 무료·할인 구독 자리를 제공합니다. 표준 계정은 무료이며, 사용량이 5배인 프리미엄 계정은 월 15달러입니다.",
          "deck": "연구 책임자가 인증 후 연구실 구성원을 초대",
          "content": "새 과학자용 팀 요금제는 전 세계 과학자에게 1년간 무료 또는 할인 구독 1만 개를 제공합니다. 학술·비영리 연구기관의 책임 연구자 또는 동등한 역할의 신청자가 인증을 받은 뒤 연구실 구성원을 추가할 수 있습니다.\n\n표준 계정은 무료이고 프리미엄 계정은 표준의 5배 사용량을 월 15달러에 제공합니다. Anthropic은 초기 1만 개 이후 확대도 예상한다고 밝혔습니다.\n\n별도 AI for Science 프로그램은 생물학 밖의 분야로 지원을 넓힙니다. 더 많은 사용량이 필요한 연구는 프로젝트당 최대 5만 달러 크레딧을 신청할 수 있으며, 이 크레딧 프로그램에는 모든 연구자가 신청할 수 있습니다.\n\n날짜는 발행사가 표시한 2026-08-27 기준입니다. 게시 시각과 시간대가 공개되지 않아 정확한 한국 시각으로 환산하지 않았습니다.",
          "source": "https://www.anthropic.com/news/expanding-support-for-scientists",
          "officialUrl": "https://www.anthropic.com/news/expanding-support-for-scientists",
          "verifiedAt": "2026-09-08",
          "slug": "anthropic-20260827-scientist-subscriptions",
          "en": {
            "title": "Anthropic offers 10,000 free or discounted Claude seats for scientists",
            "summary": "Anthropic’s scientist team plan provides 10,000 subscription seats for one year. Standard seats are free; premium seats with five times the usage cost $15 per month.",
            "deck": "Verified lab leaders can add their researchers",
            "content": "The scientist team plan offers 10,000 free or discounted seats worldwide for one year. Principal investigators or equivalent leaders at academic or nonprofit research institutions can apply for verification and then add members of their labs.\n\nStandard seats are free, while premium seats offer five times the usage at $15 per month. Anthropic expects to expand beyond the initial 10,000 seats.\n\nSeparately, AI for Science is broadening beyond biological sciences. Projects needing more usage can apply for up to $50,000 in credits per project; any researcher may apply to that credits program.\n\nDate follows the publisher’s displayed 2026-08-27 calendar date. Publication time and timezone are unspecified; no exact KST conversion is asserted."
          },
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "Anthropic"
          ]
        }
      ],
    },
    {
      name: "Google",
      color: "#4285F4",
      posts: [
        {
          date: "8/25",
          platform: "X+Threads",
          title: "Gemini macOS, 말하면서 고친 내용까지 반영하는 지능형 받아쓰기 공개",
          deck: "macOS 어느 창에서나 자연어 음성을 현재 커서 위치의 정돈된 텍스트로 입력",
          summary: "macOS 어느 창에서나 자연어 음성을 현재 커서 위치의 정돈된 텍스트로 입력 추임새 제거·문장 중간 수정 반영·서식화를 수행 음성으로 작성·편집·요약 가능 주의: 지원 언어·지역·개인정보 처리 방식이 공식 본문에 미명시.",
          source: "https://blog.google/innovation-and-ai/products/gemini-app/enable-intelligent-dictation-macos/",
          officialUrl: "https://blog.google/innovation-and-ai/products/gemini-app/enable-intelligent-dictation-macos/",
          verifiedAt: "2026-08-26",
          backupUrls: [],
          tags: ["AI", "2026-08b"],
          slug: "google-20260825-gemini-macos-dictation",
          en: { title: "Gemini for macOS adds intelligent dictation", deck: "Speech edits itself into formatted text at the current cursor.", summary: "Gemini intelligent dictation removes fillers, applies spoken corrections and formats text in the active macOS window. Supported languages, regions and privacy handling were not specified." },
        },
        {
          date: "8/25",
          platform: "X+Threads",
          title: "Google, 델라웨어 주민에게 AI·직업 교육 무료 제공",
          deck: "Google·델라웨어주 노동부·델라웨어 도서관 협력",
          summary: "Google·델라웨어주 노동부·델라웨어 도서관 협력 주민에게 AI 활용·프롬프트·업무 생산성·바이브 코딩 교육과 Google Career Certificates 무료 라이선스 제공 온라인 자기주도형 과정은 일반적으로 3~6개월 소요 주의: 참여 인원과 총 사업 규모 미공개; 경력 성과 수치는 Google 자체 보고.",
          source: "https://blog.google/company-news/outreach-and-initiatives/grow-with-google/free-ai-training-delaware/",
          officialUrl: "https://blog.google/company-news/outreach-and-initiatives/grow-with-google/free-ai-training-delaware/",
          verifiedAt: "2026-08-26",
          backupUrls: [],
          tags: ["AI", "2026-08b"],
          slug: "google-20260825-delaware-ai-training",
          en: { title: "Google offers free AI and career training across Delaware", deck: "A public-private programme covers prompting, productivity and vibe coding.", summary: "Google, the Delaware Department of Labor and Delaware Libraries offer residents free AI training and Career Certificates. Participant count and total programme size were not disclosed." },
        },
        {
          date: "8/26",
          platform: "X+Threads",
          title: "Gemini CLI 0.57, 용량 오류 자동 재시도와 취소 시 멀티턴 롤백 추가",
          deck: "capacity error에 context-aware silent retry와 availability TTL 적용",
          summary: "capacity error에 context-aware silent retry와 availability TTL 적용 취소·중단 시 전체 multi-turn request rollback git 환경 정규화와 workspace state mismatch 수정 eval failure summary용 tool call formatter 추가 주의: 릴리스 노트에 다수 내부 테스트·문서 수정 포함.",
          source: "https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0",
          officialUrl: "https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0",
          verifiedAt: "2026-08-26",
          backupUrls: [],
          tags: ["AI", "2026-08b"],
          slug: "gemini-cli-20260826-v0-57-0",
          thumbnail: {
            src: "/source-images/26db4a3e17cb30304d147ad8197ff30a910e14e444e7d9e43806e54f6691896f.png",
            alt: "Release Release v0.57.0 · google-gemini/gemini-cli — source link share preview",
            provenance: "source-share-preview",
          },
          en: { title: "Gemini CLI 0.57 adds capacity retries and multi-turn rollback", deck: "Cancellation and workspace consistency become more predictable.", summary: "Gemini CLI 0.57 adds context-aware retries for capacity errors, rolls back an entire multi-turn request on cancellation, and fixes Git and workspace-state mismatches." },
        },
        {
          "date": "8/27 02:00",
          "platform": "X+Threads",
          "title": "Google, 85개 이상 언어용 Gemini 3.5 Transcribe 공개",
          "deck": "실시간·녹음 음성 전사에 언어 감지와 화자 구분 지원",
          "summary": "Google이 Gemini 3.5 Transcribe를 공개 미리보기로 선보였습니다. 85개 이상 언어를 자동 감지하고 녹음 음성에서 최대 3명의 화자를 구분합니다. 주의: 3명을 넘는 화자 구분은 실험 단계입니다.",
          "content": "**실시간과 녹음 전사를 나눠 제공합니다**\n\n실시간 양방향 스트리밍은 Live API의 `gemini-3.5-transcribe-live`를 사용하고, 녹음 파일은 Interactions API의 `gemini-3.5-transcribe`를 사용합니다. 모델은 85개 이상 언어를 자동 감지하며 녹음 음성에 화자별 타임스탬프를 붙입니다.\n\n**제한도 함께 봐야 합니다**\n\n화자 구분은 최대 3명까지 명시돼 있고 3명을 넘는 지원은 실험 단계입니다. 공개 미리보기이므로 실제 도입 전 지원 지역·언어와 데이터 처리 조건을 확인해야 합니다.",
          "source": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5-transcribe/",
          "officialUrl": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5-transcribe/",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "Google"
          ],
          "slug": "google-20260827-gemini-3-5-transcribe",
          "thumbnail": {
            "src": "/source-images/f40908527efdaf60fce431fa1a5f7fac1176f1f1bb77f9a2fa9e419722245153.jpg",
            "alt": "Introducing Gemini 3.5 Transcribe — source link share preview",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Google introduces Gemini 3.5 Transcribe",
            "deck": "The public-preview model handles streaming and recorded audio across more than 85 languages.",
            "summary": "Google introduced Gemini 3.5 Transcribe in public preview with automatic detection of more than 85 languages and speaker labeling for recorded audio. Support beyond three speakers is experimental.",
            "content": "**Streaming and recorded audio use separate paths**\n\nStreaming uses `gemini-3.5-transcribe-live` through the Live API. Recorded audio uses `gemini-3.5-transcribe` through the Interactions API and can include speaker attribution and timestamps.\n\n**Limits matter**\n\nSpeaker identification is specified for up to three speakers; support beyond three is experimental. Verify regional, language and data-handling terms before adoption."
          }
        },
        {
          "date": "8/27 02:00",
          "platform": "X+Threads",
          "title": "Gemini Live, 여러 단계 작업과 Daily Brief 지원 확대",
          "deck": "Spark 작업 실행과 Gmail·Calendar 기반 하루 브리핑 추가",
          "summary": "Gemini Live에 Spark 작업 실행과 Gmail·Calendar 정보를 요약하는 Daily Brief가 추가됩니다. Spark는 Google AI Pro 이상, Daily Brief는 Google AI Plus 이상에서 제공됩니다. 주의: 개인화에 사용할 앱은 Personal Intelligence 설정에서 연결해야 합니다.",
          "content": "**대화에서 실제 작업 실행으로 범위를 넓혔습니다**\n\nSpark는 Gemini Live에서 여러 단계 작업을 위임하는 기능입니다. Daily Brief는 Gmail과 Calendar의 중요한 업데이트를 모아 하루 할 일을 음성으로 요약합니다.\n\n**요금제와 연결 설정이 다릅니다**\n\nSpark는 Google AI Pro 이상이 필요하고 Daily Brief는 Google AI Plus 이상이 필요합니다. Gmail·Calendar 등 개인화에 쓰는 앱은 Personal Intelligence 설정에서 연결해야 합니다.",
          "source": "https://blog.google/innovation-and-ai/products/gemini-app/productivity-features-gemini-live/",
          "officialUrl": "https://blog.google/innovation-and-ai/products/gemini-app/productivity-features-gemini-live/",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "Google"
          ],
          "slug": "google-20260827-gemini-live-productivity",
          "en": {
            "title": "Gemini Live expands multi-step tasks and daily briefings",
            "deck": "Spark delegates multi-step tasks while Daily Brief summarizes Gmail and Calendar updates.",
            "summary": "Gemini Live adds Spark and Daily Brief. Spark requires Google AI Pro or higher; Daily Brief requires Google AI Plus or higher. Connected apps must be enabled through Personal Intelligence settings.",
            "content": "**Gemini Live moves from conversation toward execution**\n\nSpark supports delegated multi-step tasks. Daily Brief combines important Gmail and Calendar updates into a spoken digest of the day.\n\n**Plans and connections differ**\n\nSpark requires Google AI Pro or higher, while Daily Brief requires Google AI Plus or higher. Apps used for personalization must be connected in Personal Intelligence settings."
          }
        },
        {
          "date": "8/28 01:00",
          "platform": "X+Threads",
          "title": "Gemini Omni 1.1 Flash, 영상 연장·참조 입력·4K 업스케일 추가",
          "deck": "10초 단위 장면 연장과 360p 초안으로 영상 제작 API 제어 강화",
          "summary": "Google이 Gemini Omni 1.1 Flash에 영상 장면 연장, 참조 영상, 360p 초안, 최대 4K 업스케일 기능을 추가했습니다. 장면은 10초 단위로 누적 40초까지 연장할 수 있습니다. 주의: 속도와 비용 효율 비교는 Google의 설명입니다.",
          "content": "**생성 영상의 앞뒤 맥락을 더 길게 다룹니다**\n\n기존 영상을 10초 단위로 이어 만들 수 있으며 누적 길이는 최대 40초입니다. 새 장면을 만들 때 최대 3초의 참조 영상을 입력할 수 있고, 시작·종료 프레임 보간도 지원합니다.\n\n**초안과 최종 출력 경로를 나눴습니다**\n\n360p 미리보기로 빠르게 반복한 뒤 최종 결과를 최대 4K로 업스케일할 수 있습니다. 속도와 비용 절감 효과는 Google 자체 설명이므로 실제 워크로드에서 확인해야 합니다.",
          "source": "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/",
          "officialUrl": "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "Google"
          ],
          "slug": "google-20260828-gemini-omni-1-1-flash",
          "thumbnail": {
            "src": "/source-images/71161c684ed9b88cec909e85546617f73eb67a9a0fd54d6bc722a8ebddef9d34.png",
            "alt": "Build with Gemini Omni 1.1 Flash — source link share preview",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Gemini Omni 1.1 Flash adds video extensions and reference controls",
            "deck": "The API adds 10-second extensions, short video references, 360p drafts and upscaling to 4K.",
            "summary": "Google added scene extensions, video references, 360p previews and upscaling to 4K. Extensions add 10-second segments up to 40 seconds cumulatively, and reference clips can be up to three seconds.",
            "content": "**Longer context supports extended scenes**\n\nExisting videos can be extended in 10-second increments up to 40 seconds cumulatively. A new scene can reference up to three seconds of video, alongside first/last-frame interpolation.\n\n**Draft and final-output paths differ**\n\nDevelopers can iterate with 360p previews and upscale final output to 4K. Speed and cost comparisons are Google claims and should be tested on the target workload."
          }
        }
      ],
    },
    {
      name: "GitHub",
      color: "#24292F",
      posts: [
        {
          date: "8/26",
          platform: "X+Threads",
          title: "Copilot CLI, 플러그인 대시보드를 전체 공개하고 작업 중 모델을 자동 전환",
          deck: "플러그인 대시보드를 전체 사용자에게 공개하고 /plugin·/mcp·/skills에서 접근",
          summary: "플러그인 대시보드를 전체 사용자에게 공개하고 /plugin·/mcp·/skills에서 접근 Auto mode가 대화 중 작업 변화에 맞춰 모델 선택을 조정 상류 새 버전이 있는 플러그인과 marketplace를 표시하고 Update 제공 repository plugin extension 활성화 경쟁으로 startup이 무한 Loading/Resuming에 빠지던 문제 수정 주의: 기능과 수정이 한 릴리스에 묶인 벤더 릴리스 노트.",
          source: "https://github.com/github/copilot-cli/releases/tag/v1.0.81-10",
          officialUrl: "https://github.com/github/copilot-cli/releases/tag/v1.0.81-10",
          verifiedAt: "2026-08-26",
          backupUrls: [],
          tags: ["AI", "2026-08b"],
          slug: "github-copilot-cli-20260826-v1-0-81-10",
          thumbnail: {
            src: "/source-images/4d53aa729c6dcd7826e992f44151f4c4c5e881d52d1e2300108831a2177c54f3.png",
            alt: "Release 1.0.81-10 · github/copilot-cli — source link share preview",
            provenance: "source-share-preview",
          },
          en: { title: "Copilot CLI opens its plugin dashboard and adapts models during a task", deck: "Plugins, MCP and skills move into a unified operating surface.", summary: "Copilot CLI 1.0.81-10 makes the plugin dashboard generally available, lets Auto mode adapt model selection as a conversation evolves, and adds update signals for installed plugins." },
        },
        {
          date: "8/26",
          platform: "X+Threads",
          title: "Copilot CLI, 기업 정책으로 막힌 MCP를 pending 대신 blocked로 표시",
          deck: "기업 정책으로 차단된 MCP 서버가 /mcp에서 무한 pending으로 보이던 문제 수정",
          summary: "기업 정책으로 차단된 MCP 서버가 /mcp에서 무한 pending으로 보이던 문제 수정 차단 서버를 blocked 상태로 명시 주의: 단일 운영·가시성 버그 수정.",
          source: "https://github.com/github/copilot-cli/releases/tag/v1.0.81-11",
          officialUrl: "https://github.com/github/copilot-cli/releases/tag/v1.0.81-11",
          verifiedAt: "2026-08-26",
          backupUrls: [],
          tags: ["AI", "2026-08b"],
          slug: "github-copilot-cli-20260826-v1-0-81-11",
          thumbnail: {
            src: "/source-images/48d86fd01e783ca4b0aeb3242b92d31a9aa02df5a678787ee4601c4c945a9484.png",
            alt: "Release 1.0.81-11 · github/copilot-cli — source link share preview",
            provenance: "source-share-preview",
          },
          en: { title: "Copilot CLI shows enterprise-blocked MCP servers as blocked", deck: "Policy enforcement no longer looks like an endless pending state.", summary: "Copilot CLI 1.0.81-11 fixes the MCP dashboard so an enterprise-policy block is displayed as blocked instead of spinning as pending forever." },
        },
        {
          "date": "8/26 05:05",
          "platform": "X+Threads",
          "title": "Copilot 앱, Customize 탭 정식 공개",
          "deck": "MCP 서버·플러그인·스킬·캔버스를 한 화면에서 탐색",
          "summary": "GitHub Copilot 앱의 Customize 탭이 정식 공개됐습니다. 추천 항목과 유형별 탐색으로 MCP 서버·플러그인·스킬·캔버스를 찾을 수 있습니다. 주의: 공식 글은 요금제나 지역별 제한을 명시하지 않았습니다.",
          "content": "**Copilot 확장 요소를 한곳에 모았습니다**\n\nCustomize 탭은 MCP 서버, 플러그인, 스킬, 캔버스를 한 화면에서 보여줍니다. 섹션별 추천 항목에서 시작하거나 유형과 카테고리별로 탐색할 수 있습니다.\n\n**확인할 범위**\n\n이번 발표는 탐색 화면의 정식 공개에 관한 내용입니다. 요금제·지역별 제공 범위는 공식 글에 적혀 있지 않으므로 실제 계정에서 별도로 확인해야 합니다.",
          "source": "https://github.blog/changelog/2026-08-25-github-copilot-app-customize-tab-is-generally-available",
          "officialUrl": "https://github.blog/changelog/2026-08-25-github-copilot-app-customize-tab-is-generally-available",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "GitHub"
          ],
          "slug": "github-20260826-copilot-app-customize-ga",
          "en": {
            "title": "GitHub Copilot app Customize tab becomes generally available",
            "deck": "MCP servers, plugins, skills and canvases move into one discovery surface.",
            "summary": "The Copilot app Customize tab is generally available with featured entries and browsing by customization type. The post does not specify plan or regional limits.",
            "content": "**Copilot customizations now share one surface**\n\nThe Customize tab brings MCP servers, plugins, skills and canvases together. Users can begin with featured entries or browse by type and category.\n\n**Verification boundary**\n\nThe announcement covers general availability of the discovery surface but does not state plan or regional restrictions."
          }
        },
        {
          "date": "8/30 08:39",
          "platform": "X+Threads",
          "title": "Copilot CLI 1.0.82, 작업 폴더 전환과 인증 오류 표시 수정",
          "deck": "전환 준비 중 입력으로 작업이 깨지던 문제를 막고 구체적인 인증 실패 원인을 표시",
          "summary": "Copilot CLI 1.0.82는 /worktree 또는 /move 준비 중 입력한 메시지가 전환을 깨뜨리던 문제를 수정했습니다. 인증 실패도 일반 로그인 안내 대신 401 등 구체적인 원인을 표시합니다. 주의: 기능 확장보다 안정성에 초점을 둔 소규모 릴리스입니다.",
          "content": "**작업 폴더 전환 실패 원인을 줄였습니다**\n\n/worktree 또는 /move가 작업 폴더를 준비하는 동안 메시지를 입력해도 전환이 깨지지 않도록 수정했습니다. 승인 카드에서는 Ctrl+E로 전체 계획을 다시 펼칠 수 있고, 인증 오류는 401 Bad credentials 같은 구체적인 실패 원인을 보여줍니다.\n\n**검증 범위**\n\n내용은 GitHub의 공식 릴리스 노트에 근거하며 이번 조사에서 수정 효과를 재실행하지는 않았습니다.",
          "source": "https://github.com/github/copilot-cli/releases/tag/v1.0.82",
          "officialUrl": "https://github.com/github/copilot-cli/releases/tag/v1.0.82",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "GitHub"
          ],
          "slug": "github-20260830-copilot-cli-v1-0-82",
          "en": {
            "title": "Copilot CLI 1.0.82 fixes worktree switching and authentication errors",
            "deck": "Messages no longer disrupt worktree preparation, and authentication failures become specific.",
            "summary": "Copilot CLI 1.0.82 fixes messages disrupting /worktree or /move preparation, expands approval plans with Ctrl+E, and displays specific authentication failures.",
            "content": "**Worktree switching becomes more predictable**\n\nMessages typed while /worktree or /move prepares a worktree no longer break the switch. Ctrl+E expands the complete approval plan, and authentication errors identify failures such as 401 Bad credentials.\n\n**Verification boundary**\n\nThese claims come from GitHub release notes and were not independently reproduced in this review."
          }
        }
      ],
    },
    {
      "name": "IBM",
      "color": "#0F62FE",
      "posts": [
        {
          "date": "8/26 00:14",
          "platform": "X+Threads",
          "title": "IBM, Granite 4.2 모델 3종의 학습 구조 공개",
          "deck": "3B·8B·30B 밀집 모델의 사전학습과 후처리 과정을 기술 문서로 설명",
          "summary": "IBM Granite 팀이 Granite 4.2의 3B·8B·30B 모델 구조와 학습 과정을 공개했습니다. 세 모델은 Apache 2.0으로 배포됩니다. 주의: 이 날짜는 기술 설명 글의 게시 시각이며 모델 최초 출시 시각으로 확인된 것은 아닙니다.",
          "content": "**학습 과정을 단계별로 공개했습니다**\n\nIBM Granite 팀은 Granite 4.2를 3B·8B·30B 크기의 decoder-only 밀집 Transformer로 설명했습니다. 세 모델은 공통 구조와 학습 파이프라인을 사용하지만, 3B에는 agentic RL이 적용되지 않고 8B·30B에는 소프트웨어 엔지니어링·터미널·웹 검색 에이전트 학습이 추가됩니다. 모든 모델은 Apache 2.0으로 공개됩니다.\n\n**수치를 섞어 읽으면 안 됩니다**\n\n아키텍처 표의 sequence length는 131,072토큰입니다. 별도로 사전학습 마지막 단계에서 컨텍스트를 512K까지 확장했다고 설명하므로, 두 수치를 하나의 배포 한도로 단정하지 않았습니다. 벤치마크는 IBM 팀이 보고한 결과입니다.",
          "source": "https://huggingface.co/blog/ibm-granite/granite-4-2",
          "officialUrl": "https://huggingface.co/blog/ibm-granite/granite-4-2",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "IBM"
          ],
          "slug": "ibm-20260826-granite-4-2-training",
          "en": {
            "title": "IBM details how Granite 4.2 models are built",
            "deck": "A technical explainer covers the 3B, 8B and 30B dense models and their training pipeline.",
            "summary": "The IBM Granite team described Granite 4.2 models in 3B, 8B and 30B sizes under Apache 2.0. This timestamp is for the explainer, not an independently established first release.",
            "content": "**The training pipeline is documented step by step**\n\nIBM describes Granite 4.2 as decoder-only dense Transformers in 3B, 8B and 30B sizes. The 3B model omits agentic RL, while the 8B and 30B models receive additional software-engineering, terminal and web-search agent training. All are released under Apache 2.0.\n\n**Do not collapse different context figures**\n\nThe architecture table lists 131,072 tokens, while the article separately says the final pre-training phase extends context to 512K. These are not presented here as one serving limit. Benchmarks are vendor-reported."
          }
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "8/27 04:37",
          "platform": "X+Threads",
          "title": "Codex 0.150, 작업 간 참조·메시지와 Interrupt 훅 추가",
          "deck": "터미널에서 다른 Codex 작업을 호출하고 중단 시 후처리 실행",
          "summary": "Codex 0.150은 `@` 멘션으로 다른 작업을 참조하고 작업을 읽거나 만들거나 메시지를 보내는 기능을 추가했습니다. 활성 최상위 턴이 중단되면 실행되는 Interrupt 훅도 제공됩니다. 주의: 동작은 공식 릴리스 노트 기준이며 독립 재실행 검증은 하지 않았습니다.",
          "content": "**터미널 작업 사이의 연결이 늘었습니다**\n\n`@` 멘션으로 다른 Codex 작업을 참조하고 에이전트에게 작업 읽기·생성·메시지 전송을 요청할 수 있습니다. Interrupt 훅은 활성 최상위 턴이 중단될 때 명령 또는 MCP 핸들러를 실행합니다.\n\n**신뢰 경계 수정도 포함됐습니다**\n\n신뢰하지 않는 프로젝트에서 프로젝트 수준 `AGENTS.md` 지시를 읽지 않도록 했고, 진단 정보의 자격 증명 가림과 원격 MCP 인증을 개선했습니다.",
          "source": "https://github.com/openai/codex/releases/tag/rust-v0.150.0",
          "officialUrl": "https://github.com/openai/codex/releases/tag/rust-v0.150.0",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "OpenAI"
          ],
          "slug": "openai-20260827-codex-v0-150",
          "en": {
            "title": "Codex 0.150 adds task references, messaging and interrupt hooks",
            "deck": "Terminal users can reference and message other Codex tasks, while Interrupt hooks run on stopped turns.",
            "summary": "Codex 0.150 adds `@` references to other tasks, task reading/creation/messaging, and Interrupt hooks for interrupted top-level turns. It also prevents untrusted projects from supplying project-level AGENTS.md instructions.",
            "content": "**Terminal tasks can now connect**\n\n`@` mentions reference other Codex tasks, and agents can read, create or message tasks. Interrupt hooks run commands or MCP handlers when an active top-level turn is interrupted.\n\n**Trust boundaries also changed**\n\nUntrusted projects no longer supply project-level AGENTS.md instructions. Credential redaction and remote MCP authentication were improved. Claims are based on official release notes."
          }
        },
        {
          "date": "8/29 18:55",
          "platform": "X+Threads",
          "title": "Codex 0.151, MCP 결과 처리 확장과 권한 유지 보강",
          "deck": "확장 기능이 모델 전달 전 MCP 결과를 검사하거나 대체",
          "summary": "Codex 0.151은 확장 기능이 모델에 전달되기 전 MCP 도구 결과를 검사하거나 대체할 수 있게 했습니다. 선택적 MCP 서버 탐색 대기 시간도 설정할 수 있습니다. 주의: 기능과 수정은 공식 릴리스 노트 기준입니다.",
          "content": "**MCP 결과와 서버 시작을 더 세밀하게 다룹니다**\n\n확장 기능은 MCP 도구 결과가 모델에 도달하기 전에 내용을 검사하거나 대체할 수 있습니다. 선택적 MCP 서버에서 도구를 찾을 때 적용할 grace period도 설정할 수 있습니다.\n\n**권한과 예산 계산을 보강했습니다**\n\n작업 폴더를 바꿀 때 sandbox 제한이 약해지지 않도록 수정했고, 하위 에이전트 토큰 사용량을 최상위 작업 예산에 합산합니다.",
          "source": "https://github.com/openai/codex/releases/tag/rust-v0.151.0",
          "officialUrl": "https://github.com/openai/codex/releases/tag/rust-v0.151.0",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "OpenAI"
          ],
          "slug": "openai-20260829-codex-v0-151",
          "en": {
            "title": "Codex 0.151 adds MCP result interception and permission fixes",
            "deck": "Extensions can inspect or replace MCP results before the model sees them.",
            "summary": "Codex 0.151 lets extensions inspect or replace MCP results before model delivery and adds a configurable grace period for optional-server discovery. It also preserves sandbox restrictions across directory changes and counts nested subagent tokens toward root budgets.",
            "content": "**MCP results and startup become more configurable**\n\nExtensions can inspect or replace MCP tool results before they reach the model. Optional MCP server discovery receives a configurable grace period.\n\n**Permissions and budgets are reinforced**\n\nChanging directories no longer weakens sandbox restrictions, and nested subagent token usage counts toward root goal budgets. Claims are based on official release notes."
          }
        }
      ]
    },
    {
      "name": "NVIDIA",
      "color": "#76B900",
      "posts": [
        {
          "date": "8/27 06:05",
          "platform": "X+Threads",
          "title": "NVIDIA, NVLink Fusion용 맞춤형 NVHBM 발표",
          "deck": "첫 협력사 Amazon Annapurna Labs와 Trainium4 지원 계획 공개",
          "summary": "NVIDIA가 XPU용 맞춤형 고대역폭 메모리 NVHBM을 발표하고 첫 협력사로 Amazon Annapurna Labs를 소개했습니다. NVIDIA는 HBM4E 대비 대역폭 최대 30% 증가와 HBM 전력 15% 감소를 주장합니다. 주의: Trainium4 지원 계획이며 현재 일반 판매 발표가 아닙니다.",
          "content": "**메모리 컨트롤러를 HBM 스택에 통합합니다**\n\nNVHBM은 메모리 컨트롤러를 XPU가 아니라 3D HBM 스택에 넣는 구조입니다. NVIDIA는 표준 HBM4E와 비교해 메모리 대역폭을 최대 30% 높이고 HBM 전력을 15% 낮추며 XPU compute die 면적을 최대 25% 확보한다고 설명합니다.\n\n**첫 적용은 미래 계획입니다**\n\nAmazon Annapurna Labs가 첫 협력사이며 Trainium4에서 지원을 시작할 계획입니다. 수치는 NVIDIA의 벤더 주장이고 현재 일반 판매로 해석하지 않았습니다.",
          "source": "https://blogs.nvidia.com/blog/nvlink-fusion-nvhbm-custom-high-bandwidth-memory/",
          "officialUrl": "https://blogs.nvidia.com/blog/nvlink-fusion-nvhbm-custom-high-bandwidth-memory/",
          "verifiedAt": "2026-09-08",
          "backupUrls": [],
          "tags": [
            "AI",
            "2026-w35",
            "NVIDIA"
          ],
          "slug": "nvidia-20260827-nvlink-fusion-nvhbm",
          "en": {
            "title": "NVIDIA expands NVLink Fusion with custom NVHBM memory",
            "deck": "The custom HBM design is planned for Trainium4 with Amazon Annapurna Labs as the first collaborator.",
            "summary": "NVIDIA announced NVHBM for XPUs and named Amazon Annapurna Labs as the first collaborator. NVIDIA claims up to 30% more bandwidth and 15% lower HBM power than standard HBM4E. Support is planned to begin with Trainium4, not current general availability.",
            "content": "**The memory controller moves into the HBM stack**\n\nNVHBM integrates the controller into the 3D HBM stack rather than the XPU. NVIDIA claims up to 30% greater bandwidth, 15% lower HBM power and up to 25% more XPU compute-die area versus standard HBM4E.\n\n**Initial support is forward-looking**\n\nAmazon Annapurna Labs is the first collaborator, with support planned for Trainium4. Figures are vendor claims and this is not described as current general availability."
          }
        }
      ]
    }
  ],
};
