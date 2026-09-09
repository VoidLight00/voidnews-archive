import type { WeeklyData } from "../data";

// Official-date-verified items; boundary backfill verified 2026-09-08. Anthropic date-only sources retain publisher dates with visible timezone disclosures.
export const week35: WeeklyData = {
  week: 35,
  year: 2026,
  slug: "2026-w35",
  period: "8/24 ~ 8/30",
  totalPosts: 102,
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
          thumbnail: {"src":"/source-media/weekly-20260909/recent-f101ce7215cb406a.jpg","alt":"Tiangong Omni, 휴머노이드 로봇 게임 400m를 45.66초에 완주 공식 출처 이미지"},
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
          thumbnail: {"src":"/source-media/weekly-20260909/recent-d5562fe28d233b28.png","alt":"GLM-5.3-Flash 공개, OpenRouter 익명 모델 Ox Alpha의 정체였다 공식 출처 이미지","provenance":"source-share-preview"},
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
          thumbnail: {"src":"/source-media/weekly-20260909/recent-d01d94a1b000c188.png","alt":"Claude Code, glibc 2.44 리눅스 시작 충돌 수정 공식 출처 이미지","provenance":"source-share-preview"},
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
          },
          thumbnail: {"src":"/source-media/weekly-20260909/recent-ca3eff0a8509d6f2.png","alt":"Claude Code, 실행 도구를 줄이는 restricted 모드 추가 공식 출처 이미지","provenance":"source-share-preview"},
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
          },
          thumbnail: {"src":"/source-media/weekly-20260909/recent-2180229dc69461fd.png","alt":"Claude Code, 모델 전환 훅과 캐시·지출 관측 기능 추가 공식 출처 이미지","provenance":"source-share-preview"},
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
          ],
          thumbnail: {"src":"/source-media/weekly-20260909/recent-35305757066a6f71.jpg","alt":"Anthropic, AI가 실험 장비를 제어하는 MHS 연구 미리보기 공개 공식 출처 이미지","provenance":"source-share-preview"},
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
          ],
          thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-003-93a83f61d263.svg","alt":" Expanding our support for scientists"},
        },
{
  "date": "8/27 08:06",
  "platform": "Web",
  "title": "Claude Code 2.1.247, 비용 최적화 안내·오류 출력 복구 개선",
  "deck": "Claude Code 2.1.247, 비용 최적화 안내·오류 출력 복구 개선",
  "summary": "Claude Code 2.1.247은 프로젝트의 API 지출을 측정하며 조정하는 /claude-api cost-optimize와 사용자가 검토하는 피드백 초안 도구를 추가했습니다. 훅·백그라운드 작업의 대형 오류 출력이 대화를 막는 문제와, 출력 파일을 쓰지 못할 때 메모리가 계속 늘어나는 문제도 수정했다고 안내했습니다.",
  "content": "Claude Code 2.1.247은 프로젝트의 API 지출을 측정하며 조정하는 /claude-api cost-optimize와 사용자가 검토하는 피드백 초안 도구를 추가했습니다. 훅·백그라운드 작업의 대형 오류 출력이 대화를 막는 문제와, 출력 파일을 쓰지 못할 때 메모리가 계속 늘어나는 문제도 수정했다고 안내했습니다.\n\n표시 시각은 공식 피드 또는 릴리스의 게시 시각을 한국시간으로 환산한 값이며, 실제 기능 활성화 시각과 다를 수 있습니다. 기능·성능·보안 설명은 출처가 발표한 내용이며 독립 실행 검증은 아닙니다.",
  "source": "https://github.com/anthropics/claude-code/releases/tag/v2.1.247",
  "officialUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.247",
  "verifiedAt": "2026-09-08",
  "backupUrls": [],
  "tags": [
    "AI",
    "2026-w35",
    "Anthropic"
  ],
  "slug": "feed-pass2-20260827-b7b96dd0cc",
  "en": {
    "title": "Claude Code 2.1.247 adds API cost optimization guidance and output resilience",
    "deck": "Claude Code 2.1.247 adds API cost optimization guidance and output resilience",
    "summary": "Claude Code 2.1.247 adds /claude-api cost-optimize for measured API-spend improvements and a feedback-drafting tool for user review. It reports fixes for large hook or background-task error output wedging conversations, and for unbounded memory growth when an output file cannot be written.",
    "content": "Claude Code 2.1.247 adds /claude-api cost-optimize for measured API-spend improvements and a feedback-drafting tool for user review. It reports fixes for large hook or background-task error output wedging conversations, and for unbounded memory growth when an output file cannot be written.\n\nThe displayed time converts the official feed or release publication timestamp to Korea time and may differ from actual activation. Feature, performance and security descriptions are source-reported, not independently reproduced."
  },
  thumbnail: {"src":"/source-media/weekly-20260909/recent-b7b96dd0ccd56642.png","alt":"Claude Code 2.1.247, 비용 최적화 안내·오류 출력 복구 개선 공식 출처 이미지","provenance":"source-share-preview"},
},
{
  "date": "8/28",
  "platform": "Web",
  "title": "Anthropic, 정렬 실패 완화를 자동 연구하는 실험 공개",
  "summary": "Anthropic은 Claude가 문헌 조사·방법 제안·학습·평가를 반복하며 10개 정렬 실패 범주를 개선하는 연구를 공개했습니다. 벤치마크 기반 실험 결과이며 실제 서비스 전반의 안전을 보장한다는 뜻은 아닙니다.",
  "content": "Anthropic은 Claude가 문헌 조사·방법 제안·학습·평가를 반복하며 10개 정렬 실패 범주를 개선하는 연구를 공개했습니다. 벤치마크 기반 실험 결과이며 실제 서비스 전반의 안전을 보장한다는 뜻은 아닙니다.\n\n연구진은 일반 능력을 떨어뜨리는 방법은 제외했으며, 보지 못한 평가와 더 큰 모델에서도 방법이 유지되는지 확인했다고 설명했습니다. 사람 연구자 비교는 사람 쪽에 반복 개선 기회가 없었다는 제한이 있어 단순한 우열로 읽기 어렵습니다.\n\n날짜 안내: 2026-08-28는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "Anthropic studies automated mitigation of alignment failures",
    "summary": "Anthropic reports experiments where Claude iterated through literature, methods, training and evaluation across ten alignment-failure categories. These are benchmark-based research findings, not a guarantee of general deployment safety.",
    "content": "Anthropic reports experiments where Claude iterated through literature, methods, training and evaluation across ten alignment-failure categories. These are benchmark-based research findings, not a guarantee of general deployment safety.\n\nThe researchers excluded methods that harmed general capabilities and tested transfer to withheld evaluations and larger models. The human comparison did not allow people to iterate, so the article cautions against treating it as a direct contest.\n\nDate disclosure: 2026-08-28 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://www.anthropic.com/research/automated-researchers-mitigate-alignment-failures",
  "officialUrl": "https://www.anthropic.com/research/automated-researchers-mitigate-alignment-failures",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "Anthropic"
  ],
  "slug": "anthropic-20260828-product-ad85bab5df24",
  thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-007-b3641cfc88a2.svg","alt":"Automated researchers can reliably mitigate alignment failures"},
},
{
  "date": "8/27",
  "platform": "Web",
  "title": "Claude Console, 개인·서비스 계정 API 키 추가",
  "summary": "Anthropic은 Claude Console에서 개인 키와 서비스 계정 키를 만들 수 있다고 밝혔습니다. 연결 계정의 권한으로 작동하며 계정이 조직에서 제거되면 키도 중지됩니다. 기존 워크스페이스 키는 레거시 옵션으로 유지됩니다.",
  "content": "Anthropic은 Claude Console에서 개인 키와 서비스 계정 키를 만들 수 있다고 밝혔습니다. 연결 계정의 권한으로 작동하며 계정이 조직에서 제거되면 키도 중지됩니다. 기존 워크스페이스 키는 레거시 옵션으로 유지됩니다.\n\n날짜 안내: 2026-08-27는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "Claude Console adds personal and service-account keys",
    "summary": "Anthropic says Claude Console now supports personal and service-account API keys. Keys inherit account permissions and stop working when the linked account leaves the organization. Legacy workspace keys remain supported.",
    "content": "Anthropic says Claude Console now supports personal and service-account API keys. Keys inherit account permissions and stop working when the linked account leaves the organization. Legacy workspace keys remain supported.\n\nDate disclosure: 2026-08-27 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://platform.claude.com/docs/en/release-notes/overview#august-27-2026",
  "officialUrl": "https://platform.claude.com/docs/en/release-notes/overview#august-27-2026",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "Anthropic"
  ],
  "slug": "anthropic-20260827-product-5eb793d7c0ff"
},
{
  "date": "8/27",
  "platform": "Web",
  "title": "Claude SDK, Files·Skills 베타 인터페이스 전환",
  "summary": "Anthropic은 지정 SDK 버전부터 client.beta.files와 client.beta.skills가 기존 베타 헤더를 자동으로 보내지 않고 정식 인터페이스와 같은 응답 형태를 사용한다고 안내했습니다. beta.skills.delete는 스킬과 모든 버전을 함께 삭제하므로 기존 연동을 확인해야 합니다.",
  "content": "Anthropic은 지정 SDK 버전부터 client.beta.files와 client.beta.skills가 기존 베타 헤더를 자동으로 보내지 않고 정식 인터페이스와 같은 응답 형태를 사용한다고 안내했습니다. beta.skills.delete는 스킬과 모든 버전을 함께 삭제하므로 기존 연동을 확인해야 합니다.\n\n명시된 버전은 Python 1.2.0, TypeScript 0.122.0, Go 1.68.0, Java 2.59.0, Ruby 1.67.0, C# 12.44.0입니다. 기존 베타 헤더를 직접 보내는 요청은 계속 베타 응답 형태를 받습니다.\n\n날짜 안내: 2026-08-27는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "Claude SDKs transition beta Files and Skills interfaces",
    "summary": "Anthropic says the listed SDK versions stop automatically sending the old Files and Skills beta headers and return GA response shapes. beta.skills.delete now deletes a Skill and all its versions, making migration review important.",
    "content": "Anthropic says the listed SDK versions stop automatically sending the old Files and Skills beta headers and return GA response shapes. beta.skills.delete now deletes a Skill and all its versions, making migration review important.\n\nThe listed versions are Python 1.2.0, TypeScript 0.122.0, Go 1.68.0, Java 2.59.0, Ruby 1.67.0 and C# 12.44.0. Requests that explicitly retain the old beta headers continue receiving beta response shapes.\n\nDate disclosure: 2026-08-27 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://platform.claude.com/docs/en/release-notes/overview#august-27-2026",
  "officialUrl": "https://platform.claude.com/docs/en/release-notes/overview#august-27-2026",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "Anthropic"
  ],
  "slug": "anthropic-20260827-product-cc5701bcfea6"
},
{
  "date": "8/26",
  "platform": "Web",
  "title": "Anthropic, 외부 연구진의 Claude 사용 분석 파일럿 공개",
  "summary": "Anthropic은 외부 연구기관 세 곳이 개인정보 보호 분석 도구 Anthropic Insights를 통해 실제 Claude 사용을 연구한 파일럿을 공개했습니다. 연구진이 연구를 설계하고 Anthropic이 대신 데이터를 수집했으며, 원문 대화 데이터 공개와는 구별됩니다.",
  "content": "Anthropic은 외부 연구기관 세 곳이 개인정보 보호 분석 도구 Anthropic Insights를 통해 실제 Claude 사용을 연구한 파일럿을 공개했습니다. 연구진이 연구를 설계하고 Anthropic이 대신 데이터를 수집했으며, 원문 대화 데이터 공개와는 구별됩니다.\n\n협력 기관은 Stanford SALT Lab, Oxford Human Information Processing Lab, METR입니다. 연구별 집계 데이터도 공개했으며, 향후 참여를 원하는 연구자를 위한 관심 등록 양식을 제공했습니다.\n\n날짜 안내: 2026-08-26는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "Anthropic reports independent Claude-usage research pilot",
    "summary": "Anthropic says three outside research groups designed studies using Anthropic Insights. Anthropic collected data on their behalf and the groups conducted independent analyses; this is not a release of raw conversations.",
    "content": "Anthropic says three outside research groups designed studies using Anthropic Insights. Anthropic collected data on their behalf and the groups conducted independent analyses; this is not a release of raw conversations.\n\nThe partners were Stanford’s SALT Lab, Oxford’s Human Information Processing Lab and METR. Anthropic also released project-level aggregate data and an expression-of-interest form for future research partners.\n\nDate disclosure: 2026-08-26 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://www.anthropic.com/research/enabling-independent-research",
  "officialUrl": "https://www.anthropic.com/research/enabling-independent-research",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "Anthropic"
  ],
  "slug": "anthropic-20260826-product-93cc373aa692",
  thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-011-05f863243c20.svg","alt":"Enabling independent research on how people use Claude"},
},
{
  "date": "8/26",
  "platform": "Web",
  "title": "Claude Admin API, ant CLI와 7개 SDK에 추가",
  "summary": "Anthropic은 ant CLI와 Python·TypeScript·C#·Go·Java·PHP·Ruby SDK에서 Admin API를 사용할 수 있다고 밝혔습니다. 조직·구성원·워크스페이스·API 키 등의 관리가 포함되며, 사용량·비용 보고와 일부 Enterprise API는 여전히 curl 전용입니다.",
  "content": "Anthropic은 ant CLI와 Python·TypeScript·C#·Go·Java·PHP·Ruby SDK에서 Admin API를 사용할 수 있다고 밝혔습니다. 조직·구성원·워크스페이스·API 키 등의 관리가 포함되며, 사용량·비용 보고와 일부 Enterprise API는 여전히 curl 전용입니다.\n\n날짜 안내: 2026-08-26는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "Claude Admin API arrives in ant CLI and seven SDKs",
    "summary": "Anthropic says the Admin API is available in ant CLI and seven SDKs for organization, member, workspace, key and related administration. Usage and cost reports and certain Enterprise endpoints remain curl-only.",
    "content": "Anthropic says the Admin API is available in ant CLI and seven SDKs for organization, member, workspace, key and related administration. Usage and cost reports and certain Enterprise endpoints remain curl-only.\n\nDate disclosure: 2026-08-26 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://platform.claude.com/docs/en/release-notes/overview#august-26-2026",
  "officialUrl": "https://platform.claude.com/docs/en/release-notes/overview#august-26-2026",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "Anthropic"
  ],
  "slug": "anthropic-20260826-product-15c226626dcd"
},
{
  "date": "8/26",
  "platform": "Web",
  "title": "Claude Compliance API, 정식 세션 지원과 분석 대상 확대",
  "summary": "Claude Compliance API, 정식 세션 지원과 분석 대상 확대 내용을 공식 릴리스 노트 기준으로 정리했습니다.",
  "content": "Anthropic은 Cowork와 Claude Code 세션을 조회하는 Compliance API 엔드포인트가 베타를 종료했다고 밝혔습니다.\n\nAnthropic은 Enterprise 조직용 Compliance API가 Claude Science 및 Excel·PowerPoint·Word·Outlook의 Claude 세션 전사를 베타로 반환한다고 밝혔습니다. 기존 Compliance Access Key와 read:compliance_user_data 권한이 필요합니다.\n\n날짜 안내: 2026-08-26는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "Claude Compliance API expands session coverage",
    "summary": "Claude Compliance API expands session coverage. This story groups the same-day official release-note changes.",
    "content": "Anthropic says Compliance API session endpoints for Cowork and Claude Code are now out of beta.\n\nAnthropic says Enterprise organizations can retrieve Claude Science and Claude for Microsoft 365 session transcripts in beta, using an existing Compliance Access Key and read:compliance_user_data scope.\n\nDate disclosure: 2026-08-26 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://platform.claude.com/docs/en/release-notes/overview#august-26-2026",
  "officialUrl": "https://platform.claude.com/docs/en/release-notes/overview#august-26-2026",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "Anthropic"
  ],
  "slug": "anthropic-20260826-product-6be9ccc94033"
},
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
          thumbnail: {"src":"/source-media/weekly-20260909/recent-1ba284820fae0495.jpg","alt":"Gemini macOS, 말하면서 고친 내용까지 반영하는 지능형 받아쓰기 공개 공식 출처 이미지","provenance":"source-share-preview"},
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
          thumbnail: {"src":"/source-media/weekly-20260909/recent-54e712174f332108.webp","alt":"Delaware residents: Learn job-ready skills online at no cost"},
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
          },
          thumbnail: {"src":"/source-media/weekly-20260909/recent-584c12716aade068.webp","alt":"TBD"},
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
        },
{
  "date": "8/28",
  "platform": "Web",
  "title": "Google Drive, Gemini 기반 문서 분류 공개 베타",
  "summary": "Google은 Gemini가 Drive 파일에 데이터 분류 라벨을 적용하는 기능을 공개 베타로 발표했습니다. 조직의 정보 유출 방지·보존·감사 정책을 지원하며 실제 이용 조건과 관리자 설정은 공식 안내를 확인해야 합니다.",
  "content": "Google은 Gemini가 Drive 파일에 데이터 분류 라벨을 적용하는 기능을 공개 베타로 발표했습니다. 조직의 정보 유출 방지·보존·감사 정책을 지원하며 실제 이용 조건과 관리자 설정은 공식 안내를 확인해야 합니다.\n\n관리자는 분류 라벨과 지시문, 적용 대상을 지정합니다. 적절한 권한을 가진 파일 소유자·편집자는 자동 라벨을 수락하거나 수정할 수 있고 변경 내용은 감사 로그에 남습니다. 공개 베타 배포 완료 목표는 9월 30일입니다.\n\n날짜 안내: 2026-08-28는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "Google Drive opens Gemini-based classification beta",
    "summary": "Google announces an open beta for Gemini-based classification labels in Drive, supporting organizational data-loss prevention, retention and audit policies. Availability and configuration depend on the documented admin requirements.",
    "content": "Google announces an open beta for Gemini-based classification labels in Drive, supporting organizational data-loss prevention, retention and audit policies. Availability and configuration depend on the documented admin requirements.\n\nAdministrators choose the label, instructions and audience. File owners and editors with the relevant permissions can accept or modify automatic labels, and audit logs record those actions. Open-beta rollout targets completion by September 30.\n\nDate disclosure: 2026-08-28 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://workspaceupdates.googleblog.com/2026/08/gemini-based-data-classification-in-Google-Drive-is-now-available-in-open-beta.html",
  "officialUrl": "https://workspaceupdates.googleblog.com/2026/08/gemini-based-data-classification-in-Google-Drive-is-now-available-in-open-beta.html",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "Google"
  ],
  "slug": "google-20260828-product-a53997a76a09",
  thumbnail: {"src":"/source-media/weekly-20260909/recent-4cb29aa98543843d.gif","alt":"Google Drive, Gemini 기반 문서 분류 공개 베타 공식 출처 이미지","provenance":"source-share-preview"},
},
{
  "date": "8/27",
  "platform": "Web",
  "title": "Google Cloud, Gemini Omni 1.1 Flash 공개 프리뷰",
  "summary": "Google Cloud는 Gemini Omni 1.1 Flash를 공개 프리뷰로 제공한다고 안내했습니다. 영상·이미지·텍스트 작업과 오디오·영상 편집을 대상으로 하며, Gemini API의 정식 제공 상태와 구분해야 합니다.",
  "content": "Google Cloud는 Gemini Omni 1.1 Flash를 공개 프리뷰로 제공한다고 안내했습니다. 영상·이미지·텍스트 작업과 오디오·영상 편집을 대상으로 하며, Gemini API의 정식 제공 상태와 구분해야 합니다.\n\n날짜 안내: 2026-08-27는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "Google Cloud previews Gemini Omni 1.1 Flash",
    "summary": "Google Cloud announces public preview availability of Gemini Omni 1.1 Flash for video, image and text tasks including audio/video editing. This preview status must not be conflated with GA in the Gemini API.",
    "content": "Google Cloud announces public preview availability of Gemini Omni 1.1 Flash for video, image and text tasks including audio/video editing. This preview status must not be conflated with GA in the Gemini API.\n\nDate disclosure: 2026-08-27 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes#August_27_2026",
  "officialUrl": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes#August_27_2026",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "Google"
  ],
  "slug": "google-20260827-product-aba668aafcb2"
},
{
  "date": "8/27",
  "platform": "Web",
  "title": "CodeMender, Gemini 3.6·3.7 Flash 지원 추가",
  "summary": "Google은 CodeMender가 Gemini 3.6 Flash와 기본 모델인 3.7 Flash를 지원한다고 밝혔습니다. 장기 세션·셸·상대경로 문제를 수정하고 격리 환경의 검증 옵션을 추가했습니다. 제한 해제 옵션을 일반 환경에 적용하라는 권고는 아닙니다.",
  "content": "Google은 CodeMender가 Gemini 3.6 Flash와 기본 모델인 3.7 Flash를 지원한다고 밝혔습니다. 장기 세션·셸·상대경로 문제를 수정하고 격리 환경의 검증 옵션을 추가했습니다. 제한 해제 옵션을 일반 환경에 적용하라는 권고는 아닙니다.\n\n날짜 안내: 2026-08-27는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "CodeMender adds Gemini 3.6 and 3.7 Flash support",
    "summary": "Google adds Gemini 3.6 Flash and default 3.7 Flash support to CodeMender, alongside long-session, shell and path fixes and an isolated-environment verification option. This is not a recommendation to disable safeguards in ordinary environments.",
    "content": "Google adds Gemini 3.6 Flash and default 3.7 Flash support to CodeMender, alongside long-session, shell and path fixes and an isolated-environment verification option. This is not a recommendation to disable safeguards in ordinary environments.\n\nDate disclosure: 2026-08-27 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes#August_27_2026",
  "officialUrl": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes#August_27_2026",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "Google"
  ],
  "slug": "google-20260827-product-f8e6e492b5c3"
},
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
          },
          thumbnail: {"src":"/source-media/weekly-20260909/recent-164744e2ac7b3045.png","alt":"The Customize tab in the GitHub Copilot app, featuring customizations for Figma, Impeccable Design, and Microsoft Foundry."},
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
          },
          thumbnail: {"src":"/source-media/weekly-20260909/recent-c427dc6d74214043.png","alt":"Copilot CLI 1.0.82, 작업 폴더 전환과 인증 오류 표시 수정 공식 출처 이미지","provenance":"source-share-preview"},
        },
{
  "date": "8/27 07:08",
  "platform": "Web",
  "title": "Copilot 글로벌 모델 정책 정식 적용",
  "deck": "Copilot 글로벌 모델 정책 정식 적용",
  "summary": "GitHub은 Copilot Business·Enterprise의 글로벌 모델 정책을 9월 1일까지 순차 적용한다고 안내했습니다. 별도 설정이 없는 기존·신규 정식 모델은 글로벌 정책을 따르며, 관리자는 모델별 예외를 정할 수 있습니다. 오픈웨이트 모델과 데이터 보존이 필요한 모델은 기본 비활성입니다.",
  "content": "GitHub은 Copilot Business·Enterprise의 글로벌 모델 정책을 9월 1일까지 순차 적용한다고 안내했습니다. 별도 설정이 없는 기존·신규 정식 모델은 글로벌 정책을 따르며, 관리자는 모델별 예외를 정할 수 있습니다. 오픈웨이트 모델과 데이터 보존이 필요한 모델은 기본 비활성입니다.\n\n관리자가 명시적으로 켜거나 끈 모델별 선택은 유지됩니다. 기본 정책 위임 상태는 상위 정책이 바뀌면 함께 바뀌므로, 모델 하나를 고정하는 설정과 구별해야 합니다.\n\n표시 시각은 공식 피드 또는 릴리스의 게시 시각을 한국시간으로 환산한 값이며, 기능의 실제 활성화 시각과는 다를 수 있습니다.",
  "source": "https://github.blog/changelog/2026-08-26-global-model-policy-generally-available",
  "officialUrl": "https://github.blog/changelog/2026-08-26-global-model-policy-generally-available",
  "verifiedAt": "2026-09-08",
  "backupUrls": [],
  "tags": [
    "AI",
    "2026-w35",
    "GitHub"
  ],
  "slug": "feed-20260827-686544d231",
  "en": {
    "title": "Copilot global model policy begins generally available rollout",
    "deck": "Copilot global model policy begins generally available rollout",
    "summary": "GitHub announced phased enforcement of the global model policy for Copilot Business and Enterprise through September 1. Unconfigured existing and new generally available models inherit the global policy, while administrators can set model-specific decisions. Open-weight models and models requiring data retention are disabled by default.",
    "content": "GitHub announced phased enforcement of the global model policy for Copilot Business and Enterprise through September 1. Unconfigured existing and new generally available models inherit the global policy, while administrators can set model-specific decisions. Open-weight models and models requiring data retention are disabled by default.\n\nExplicit administrator decisions to enable or disable individual models remain intact. Delegation to the default policy follows later policy changes rather than fixing an individual model decision.\n\nThe displayed time converts the official feed or release publication timestamp to Korea time; it may differ from actual feature activation."
  },
  thumbnail: {"src":"/source-media/weekly-20260909/recent-686544d2311555ba.jpg","alt":"The Configure models setting window that lists the \"Default availability for released models\" setting, with a popup showing \"Enabled\" and \"Disabled\". Multiple models are listed with their corresponding availability settings."},
},
{
  "date": "8/27 10:52",
  "platform": "Web",
  "title": "Copilot 기업 관리 플러그인 마켓 자동 업데이트",
  "deck": "Copilot 기업 관리 플러그인 마켓 자동 업데이트",
  "summary": "GitHub은 기업 관리 설정에서 플러그인 마켓별 자동 업데이트를 지원한다고 발표했습니다. extraKnownMarketplaces 항목에 autoUpdate를 지정하면 지원 클라이언트가 해당 마켓의 설치 플러그인을 갱신합니다. 마켓은 여전히 조직의 허용 목록을 통과해야 합니다.",
  "content": "GitHub은 기업 관리 설정에서 플러그인 마켓별 자동 업데이트를 지원한다고 발표했습니다. extraKnownMarketplaces 항목에 autoUpdate를 지정하면 지원 클라이언트가 해당 마켓의 설치 플러그인을 갱신합니다. 마켓은 여전히 조직의 허용 목록을 통과해야 합니다.\n\nCopilot 앱·CLI·Visual Studio Code에서 제공되며, 자동 갱신을 켜더라도 strictKnownMarketplaces 허용 목록은 그대로 적용됩니다.\n\n표시 시각은 공식 피드 또는 릴리스의 게시 시각을 한국시간으로 환산한 값이며, 기능의 실제 활성화 시각과는 다를 수 있습니다.",
  "source": "https://github.blog/changelog/2026-08-26-enterprise-managed-settings-now-support-autoupdate-for-plugin-marketplaces",
  "officialUrl": "https://github.blog/changelog/2026-08-26-enterprise-managed-settings-now-support-autoupdate-for-plugin-marketplaces",
  "verifiedAt": "2026-09-08",
  "backupUrls": [],
  "tags": [
    "AI",
    "2026-w35",
    "GitHub"
  ],
  "slug": "feed-20260827-dd0077e6a0",
  "en": {
    "title": "Copilot enterprise-managed marketplaces gain automatic updates",
    "deck": "Copilot enterprise-managed marketplaces gain automatic updates",
    "summary": "GitHub announced per-marketplace automatic updates through enterprise-managed settings. Setting autoUpdate on an extraKnownMarketplaces entry lets supported clients update installed plugins from that marketplace. The marketplace must still satisfy the organization's effective allowlist.",
    "content": "GitHub announced per-marketplace automatic updates through enterprise-managed settings. Setting autoUpdate on an extraKnownMarketplaces entry lets supported clients update installed plugins from that marketplace. The marketplace must still satisfy the organization's effective allowlist.\n\nThe capability is available in the Copilot app, CLI and Visual Studio Code. Enabling automatic updates does not bypass the strictKnownMarketplaces allowlist.\n\nThe displayed time converts the official feed or release publication timestamp to Korea time; it may differ from actual feature activation."
  },
  thumbnail: {"src":"/source-media/weekly-20260909/recent-dd0077e6a007fa5f.jpg","alt":"A GitHub file view of managed-settings.json in the .github-private/copilot repository path. The JSON shows an extraKnownMarketplaces block containing an overridable object with an agent-skills marketplace. The marketplace has a github source pointing to OWNER/REPO, and autoUpdate is set to true."},
},
{
  "date": "8/28 07:46",
  "platform": "Web",
  "title": "Copilot 코드 리뷰, 봇 PR·대형 PR과 해결 사유 지원",
  "deck": "Copilot 코드 리뷰, 봇 PR·대형 PR과 해결 사유 지원",
  "summary": "GitHub은 Copilot 코드 리뷰가 봇 작성 PR의 자동 리뷰와 매우 큰 PR을 지원한다고 발표했습니다. 리뷰 댓글을 해결할 때 사유를 제출하는 기능도 추가됐습니다. 봇 PR 리뷰는 조직 정책과 과금 귀속 조건을 확인해야 합니다.",
  "content": "GitHub은 Copilot 코드 리뷰가 봇 작성 PR의 자동 리뷰와 매우 큰 PR을 지원한다고 발표했습니다. 리뷰 댓글을 해결할 때 사유를 제출하는 기능도 추가됐습니다. 봇 PR 리뷰는 조직 정책과 과금 귀속 조건을 확인해야 합니다.\n\n기존 300개 파일·2만 줄 제한은 더 이상 적용되지 않는다고 설명합니다. 댓글 해결 사유는 Addressed·Won’t fix·Incorrect 중에서 고를 수 있습니다.\n\n표시 시각은 공식 피드 또는 릴리스의 게시 시각을 한국시간으로 환산한 값이며, 기능의 실제 활성화 시각과는 다를 수 있습니다.",
  "source": "https://github.blog/changelog/2026-08-27-copilot-code-review-resolution-reasons-and-expanded-capabilities",
  "officialUrl": "https://github.blog/changelog/2026-08-27-copilot-code-review-resolution-reasons-and-expanded-capabilities",
  "verifiedAt": "2026-09-08",
  "backupUrls": [],
  "tags": [
    "AI",
    "2026-w35",
    "GitHub"
  ],
  "slug": "feed-20260828-61c8f9f075",
  "en": {
    "title": "Copilot code review adds bot and large PRs plus resolution reasons",
    "deck": "Copilot code review adds bot and large PRs plus resolution reasons",
    "summary": "GitHub announced Copilot code review support for automatically requested reviews of bot-authored pull requests and very large pull requests. Users can also provide a reason when resolving a review comment. Bot-authored reviews remain subject to organization policies and billing attribution conditions.",
    "content": "GitHub announced Copilot code review support for automatically requested reviews of bot-authored pull requests and very large pull requests. Users can also provide a reason when resolving a review comment. Bot-authored reviews remain subject to organization policies and billing attribution conditions.\n\nGitHub says the previous limit of 300 files or 20,000 lines no longer applies. Resolution reasons include Addressed, Won’t fix and Incorrect.\n\nThe displayed time converts the official feed or release publication timestamp to Korea time; it may differ from actual feature activation."
  },
  thumbnail: {"src":"/source-media/weekly-20260909/recent-61c8f9f0750ba2c9.jpg","alt":"Header image depicting resolution reasons"},
},
{
  "date": "8/28 20:37",
  "platform": "Web",
  "title": "GitHub, Copilot 신규 가입·결제 변경 예고",
  "deck": "GitHub, Copilot 신규 가입·결제 변경 예고",
  "summary": "GitHub은 Copilot 정책·결제 변경을 예고하면서 신용카드·PayPal 결제 고객의 Business·Enterprise 신규 가입을 9월 1일부터 다시 활성화하기 시작한다고 안내했습니다. 계정 심사와 결제 방식도 바뀌므로 관리자는 적용 시점과 결제 조건을 확인해야 합니다. 이는 당시의 변경 예고이며 전 고객 적용 완료를 뜻하지 않습니다.",
  "content": "GitHub은 Copilot 정책·결제 변경을 예고하면서 신용카드·PayPal 결제 고객의 Business·Enterprise 신규 가입을 9월 1일부터 다시 활성화하기 시작한다고 안내했습니다. 계정 심사와 결제 방식도 바뀌므로 관리자는 적용 시점과 결제 조건을 확인해야 합니다. 이는 당시의 변경 예고이며 전 고객 적용 완료를 뜻하지 않습니다.\n\n신규 좌석은 사용 권한을 받기 전에 결제해야 하며, 기존 신용카드·PayPal 고객의 선불 결제 변경은 10월 1일부터 적용할 예정입니다. 공지에는 9월 28일보다 이르지 않은 웹·모바일·클라우드 에이전트 경험 통합과, 9월 28일부터 코드 리뷰 기본 노력을 Balanced로 바꾸는 별도 예고도 담겼습니다.\n\n표시 시각은 공식 피드 또는 릴리스의 게시 시각을 한국시간으로 환산한 값이며, 기능의 실제 활성화 시각과는 다를 수 있습니다.",
  "source": "https://github.blog/changelog/2026-08-28-upcoming-changes-to-github-copilot-policies-and-billing",
  "officialUrl": "https://github.blog/changelog/2026-08-28-upcoming-changes-to-github-copilot-policies-and-billing",
  "verifiedAt": "2026-09-08",
  "backupUrls": [],
  "tags": [
    "AI",
    "2026-w35",
    "GitHub"
  ],
  "slug": "feed-20260828-4a0589cf32",
  "en": {
    "title": "GitHub previews Copilot signup and billing changes",
    "deck": "GitHub previews Copilot signup and billing changes",
    "summary": "GitHub previewed Copilot policy and billing changes, including plans to start reenabling Business and Enterprise signups for credit-card and PayPal customers from September 1. Account vetting and billing experiences are also changing. This is the dated advance notice, not confirmation that the rollout was completed for every customer.",
    "content": "GitHub previewed Copilot policy and billing changes, including plans to start reenabling Business and Enterprise signups for credit-card and PayPal customers from September 1. Account vetting and billing experiences are also changing. This is the dated advance notice, not confirmation that the rollout was completed for every customer.\n\nNew seats require payment before access. Existing credit-card and PayPal customers are scheduled to receive upfront-billing changes starting October 1. The same notice separately previews a unified web, mobile and cloud-agent experience no earlier than September 28, and a Balanced code-review default starting September 28.\n\nThe displayed time converts the official feed or release publication timestamp to Korea time; it may differ from actual feature activation."
  },
  thumbnail: {"src":"/source-media/weekly-20260909/recent-4a0589cf32d672ba.jpg","alt":"GitHub, Copilot 신규 가입·결제 변경 예고 공식 출처 이미지","provenance":"source-share-preview"},
},
{
  "date": "8/29 05:24",
  "platform": "Web",
  "title": "Visual Studio Copilot 8월: 조직 에이전트·추론 제어",
  "deck": "Visual Studio Copilot 8월: 조직 에이전트·추론 제어",
  "summary": "GitHub은 Visual Studio 2026의 Copilot 8월 업데이트를 정리했습니다. 조직·엔터프라이즈가 공유 에이전트를 게시하고 IDE의 선택 화면에서 출처와 설명을 볼 수 있으며, 추론 방식·모델 선택·코드 리뷰 제어 개선도 소개했습니다. VS Code 업데이트와는 별도 제품 소식입니다.",
  "content": "GitHub은 Visual Studio 2026의 Copilot 8월 업데이트를 정리했습니다. 조직·엔터프라이즈가 공유 에이전트를 게시하고 IDE의 선택 화면에서 출처와 설명을 볼 수 있으며, 추론 방식·모델 선택·코드 리뷰 제어 개선도 소개했습니다. VS Code 업데이트와는 별도 제품 소식입니다.\n\n지원 모델은 추론 노력을 Low·Medium·High로 조절할 수 있습니다. Git 에이전트는 PR을 열기 전 미커밋 변경이나 커밋을 검토하고, GitHub·Azure DevOps 저장소에서 결과를 편집기 안에 표시합니다.\n\n표시 시각은 공식 피드 또는 릴리스의 게시 시각을 한국시간으로 환산한 값이며, 기능의 실제 활성화 시각과는 다를 수 있습니다.",
  "source": "https://github.blog/changelog/2026-08-28-github-copilot-in-visual-studio-august-update-2",
  "officialUrl": "https://github.blog/changelog/2026-08-28-github-copilot-in-visual-studio-august-update-2",
  "verifiedAt": "2026-09-08",
  "backupUrls": [],
  "tags": [
    "AI",
    "2026-w35",
    "GitHub"
  ],
  "slug": "feed-20260829-0cc2c96e67",
  "en": {
    "title": "Visual Studio Copilot August update adds shared agents and reasoning controls",
    "deck": "Visual Studio Copilot August update adds shared agents and reasoning controls",
    "summary": "GitHub summarized the August Copilot update for Visual Studio 2026. Organizations and enterprises can publish shared custom agents whose descriptions and organizational source appear in the IDE's agent picker. The update also covers reasoning, model selection, and code-review controls. This is distinct from the VS Code update.",
    "content": "GitHub summarized the August Copilot update for Visual Studio 2026. Organizations and enterprises can publish shared custom agents whose descriptions and organizational source appear in the IDE's agent picker. The update also covers reasoning, model selection, and code-review controls. This is distinct from the VS Code update.\n\nSupported models offer Low, Medium and High thinking effort. The Git agent reviews uncommitted changes or commits before a PR is opened and displays findings inline for GitHub and Azure DevOps repositories.\n\nThe displayed time converts the official feed or release publication timestamp to Korea time; it may differ from actual feature activation."
  }
},
{
  "date": "8/29 05:13",
  "platform": "Web",
  "title": "Copilot 주간 정리, Slack·Teams의 공동 에이전트 세션 소개",
  "deck": "Copilot 주간 정리, Slack·Teams의 공동 에이전트 세션 소개",
  "summary": "GitHub의 8월 24일 주간 업데이트 정리는 Slack·Microsoft Teams에서 @GitHub를 불러 문제 조사·계획·코드 변경을 공동 세션으로 진행하는 기능을 소개했습니다. 다른 팀원이 진행 상황을 보고 방향을 조정할 수 있다고 설명합니다. 날짜는 주간 정리 글 게시일이며 개별 기능의 최초 출시일로 단정하지 않습니다.",
  "content": "GitHub의 8월 24일 주간 업데이트 정리는 Slack·Microsoft Teams에서 @GitHub를 불러 문제 조사·계획·코드 변경을 공동 세션으로 진행하는 기능을 소개했습니다. 다른 팀원이 진행 상황을 보고 방향을 조정할 수 있다고 설명합니다. 날짜는 주간 정리 글 게시일이며 개별 기능의 최초 출시일로 단정하지 않습니다.\n\n표시 시각은 공식 피드 또는 릴리스의 게시 시각을 한국시간으로 환산한 값이며, 실제 기능 활성화 시각과 다를 수 있습니다. 기능·성능·보안 설명은 출처가 발표한 내용이며 독립 실행 검증은 아닙니다.",
  "source": "https://github.blog/changelog/2026-08-28-github-copilot-weekly-releases-august-24",
  "officialUrl": "https://github.blog/changelog/2026-08-28-github-copilot-weekly-releases-august-24",
  "verifiedAt": "2026-09-08",
  "backupUrls": [],
  "tags": [
    "AI",
    "2026-w35",
    "GitHub"
  ],
  "slug": "feed-pass2-20260829-b5e69634f5",
  "en": {
    "title": "Copilot weekly roundup highlights shared agent sessions in Slack and Teams",
    "deck": "Copilot weekly roundup highlights shared agent sessions in Slack and Teams",
    "summary": "GitHub's August 24 weekly roundup describes shared agent sessions in Slack and Microsoft Teams. Teams can mention @GitHub to investigate, plan, and make code changes while colleagues follow and guide the session. The recorded date is the roundup publication date, not a verified first-release date for the individual feature.",
    "content": "GitHub's August 24 weekly roundup describes shared agent sessions in Slack and Microsoft Teams. Teams can mention @GitHub to investigate, plan, and make code changes while colleagues follow and guide the session. The recorded date is the roundup publication date, not a verified first-release date for the individual feature.\n\nThe displayed time converts the official feed or release publication timestamp to Korea time and may differ from actual activation. Feature, performance and security descriptions are source-reported, not independently reproduced."
  },
  thumbnail: {"src":"/source-media/weekly-20260909/recent-b5e69634f504b073.png","alt":"Screenshot of GitHub Copilot in Slack"},
},
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
          },
          thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-020-bd1c1dab5aaa.png","alt":"Granite 4.2 staged RL curriculum"},
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
          },
          thumbnail: {"src":"/source-media/weekly-20260909/recent-9ba6f4189d8fbd6b.png","alt":"Codex 0.150, 작업 간 참조·메시지와 Interrupt 훅 추가 공식 출처 이미지","provenance":"source-share-preview"},
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
          },
          thumbnail: {"src":"/source-media/weekly-20260909/recent-1f2ada50b5710870.png","alt":"Codex 0.151, MCP 결과 처리 확장과 권한 유지 보강 공식 출처 이미지","provenance":"source-share-preview"},
        },
{
  "date": "8/27 10:56",
  "platform": "Web",
  "title": "Codex 0.150.1, 대화 압축 토큰 예산에 보존 이미지 포함",
  "deck": "Codex 0.150.1, 대화 압축 토큰 예산에 보존 이미지 포함",
  "summary": "Codex 0.150.1은 원격 대화 압축 시 보존된 이미지도 기본 토큰 예산에 포함하도록 수정했습니다. 필요하면 오래된 이미지를 줄여 예산에 맞추는 방식이라고 릴리스 노트가 설명합니다.",
  "content": "Codex 0.150.1은 원격 대화 압축 시 보존된 이미지도 기본 토큰 예산에 포함하도록 수정했습니다. 필요하면 오래된 이미지를 줄여 예산에 맞추는 방식이라고 릴리스 노트가 설명합니다.\n\n표시 시각은 공식 피드 또는 릴리스의 게시 시각을 한국시간으로 환산한 값이며, 실제 기능 활성화 시각과 다를 수 있습니다. 기능·성능·보안 설명은 출처가 발표한 내용이며 독립 실행 검증은 아닙니다.",
  "source": "https://github.com/openai/codex/releases/tag/rust-v0.150.1",
  "officialUrl": "https://github.com/openai/codex/releases/tag/rust-v0.150.1",
  "verifiedAt": "2026-09-08",
  "backupUrls": [],
  "tags": [
    "AI",
    "2026-w35",
    "OpenAI"
  ],
  "slug": "feed-pass2-20260827-0577669e18",
  "en": {
    "title": "Codex 0.150.1 counts retained images in remote compaction budgets",
    "deck": "Codex 0.150.1 counts retained images in remote compaction budgets",
    "summary": "Codex 0.150.1 reports that remote compaction now counts retained images toward its token budget by default, trimming older images when needed. The description is limited to the returned release notes.",
    "content": "Codex 0.150.1 reports that remote compaction now counts retained images toward its token budget by default, trimming older images when needed. The description is limited to the returned release notes.\n\nThe displayed time converts the official feed or release publication timestamp to Korea time and may differ from actual activation. Feature, performance and security descriptions are source-reported, not independently reproduced."
  },
  thumbnail: {"src":"/source-media/weekly-20260909/recent-0577669e18ed3998.png","alt":"Codex 0.150.1, 대화 압축 토큰 예산에 보존 이미지 포함 공식 출처 이미지","provenance":"source-share-preview"},
},
{
  "date": "8/29",
  "platform": "Web",
  "title": "OpenAI API, mTLS·X.509 워크로드 인증 정식 제공",
  "summary": "OpenAI는 API용 상호 TLS와 X.509 워크로드 신원 연동이 정식 제공된다고 밝혔습니다. 인증서와 신원 제공자는 플랫폼 콘솔에서 설정하며 조직의 역할·권한으로 접근을 제어합니다.",
  "content": "OpenAI는 API용 상호 TLS와 X.509 워크로드 신원 연동이 정식 제공된다고 밝혔습니다. 인증서와 신원 제공자는 플랫폼 콘솔에서 설정하며 조직의 역할·권한으로 접근을 제어합니다.\n\n날짜 안내: 2026-08-29는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "OpenAI makes mTLS and X.509 workload identity generally available",
    "summary": "OpenAI says mutual TLS and X.509 workload identity federation are generally available for its API. Certificates and identity providers can be configured in the Platform console under organization roles and permissions.",
    "content": "OpenAI says mutual TLS and X.509 workload identity federation are generally available for its API. Certificates and identity providers can be configured in the Platform console under organization roles and permissions.\n\nDate disclosure: 2026-08-29 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://developers.openai.com/api/docs/changelog",
  "officialUrl": "https://developers.openai.com/api/docs/changelog",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "OpenAI"
  ],
  "slug": "openai-20260829-product-d36ec3abc549"
},
{
  "date": "8/26",
  "platform": "Web",
  "title": "OpenAI, 기존 전사 모델 종료 예고·Assistants API 종료",
  "summary": "OpenAI는 Whisper-1 및 명시된 GPT-4o 전사 모델이 2027년 2월 26일 종료될 예정이라고 안내했습니다. 같은 8월 26일 변경 기록에는 Assistants API의 당일 종료와 Responses·Conversations API로의 이전 안내도 포함돼 있습니다.",
  "content": "OpenAI는 Whisper-1 및 명시된 GPT-4o 전사 모델이 2027년 2월 26일 종료될 예정이라고 안내했습니다. 같은 8월 26일 변경 기록에는 Assistants API의 당일 종료와 Responses·Conversations API로의 이전 안내도 포함돼 있습니다.\n\n종료 예고 대상은 whisper-1, gpt-4o-transcribe, gpt-4o-mini-transcribe, gpt-4o-transcribe-diarize입니다. 전사 작업의 이전 대상으로 gpt-live-transcribe 또는 gpt-transcribe를 안내했습니다.\n\n날짜 안내: 2026-08-26는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "OpenAI announces transcription retirements and Assistants shutdown",
    "summary": "OpenAI says Whisper-1 and the listed GPT-4o transcription models will shut down on February 26, 2027. The August 26 changelog also records the Assistants API shutdown that day and directs migration to Responses and Conversations APIs.",
    "content": "OpenAI says Whisper-1 and the listed GPT-4o transcription models will shut down on February 26, 2027. The August 26 changelog also records the Assistants API shutdown that day and directs migration to Responses and Conversations APIs.\n\nThe transcription shutdown covers whisper-1, gpt-4o-transcribe, gpt-4o-mini-transcribe and gpt-4o-transcribe-diarize. OpenAI directs transcription users to gpt-live-transcribe or gpt-transcribe.\n\nDate disclosure: 2026-08-26 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://developers.openai.com/api/docs/changelog",
  "officialUrl": "https://developers.openai.com/api/docs/changelog",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "OpenAI"
  ],
  "slug": "openai-20260826-product-d881fabefb6f"
},
{
  "date": "8/26",
  "platform": "Web",
  "title": "ChatGPT iOS, 작업 검색·추론 강도 조절 추가",
  "summary": "OpenAI는 iOS 1.2026.230에 연결 호스트의 작업 제목·대화 검색, 추론 강도 조절 표시, 긴 프롬프트용 전체 화면 편집기를 추가했다고 밝혔습니다.",
  "content": "OpenAI는 iOS 1.2026.230에 연결 호스트의 작업 제목·대화 검색, 추론 강도 조절 표시, 긴 프롬프트용 전체 화면 편집기를 추가했다고 밝혔습니다.\n\n긴 대화는 이전 기록을 필요할 때 불러오도록 개선했습니다. 홈 화면에는 ChatGPT·Work·Codex Remote 바로가기를 설정할 수 있으며, 응답에 선택한 주석에는 선택적으로 의견을 덧붙일 수 있습니다.\n\n날짜 안내: 2026-08-26는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "ChatGPT iOS adds task search and reasoning-effort controls",
    "summary": "OpenAI says iOS version 1.2026.230 adds search across connected-host task titles and conversations, a reasoning-effort gauge, and a full-screen editor for longer prompts.",
    "content": "OpenAI says iOS version 1.2026.230 adds search across connected-host task titles and conversations, a reasoning-effort gauge, and a full-screen editor for longer prompts.\n\nOlder history now loads as needed in long threads. Users can configure Home Screen shortcuts for ChatGPT, Work and Codex Remote, and optionally add comments to selected response annotations.\n\nDate disclosure: 2026-08-26 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
  },
  "source": "https://learn.chatgpt.com/docs/changelog#codex-2026-08-25-mobile",
  "officialUrl": "https://learn.chatgpt.com/docs/changelog#codex-2026-08-25-mobile",
  "verifiedAt": "2026-09-08",
  "tags": [
    "AI",
    "2026-w35",
    "OpenAI"
  ],
  "slug": "openai-20260826-product-f4a71b3d05f3"
},
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
          },
          thumbnail: {"src":"/source-media/weekly-20260909/recent-a50e18aa16c5d023.jpg","alt":"NVIDIA, NVLink Fusion용 맞춤형 NVHBM 발표 공식 출처 이미지"},
        },
{
  "date": "8/27 22:00",
  "platform": "Web",
  "title": "GeForce NOW, 가을 DLSS 4.5 제어 옵션 확대 예고",
  "deck": "GeForce NOW, 가을 DLSS 4.5 제어 옵션 확대 예고",
  "summary": "NVIDIA는 가을에 GeForce NOW Ultimate 이용자가 DLSS 4.5의 초해상도·동적 프레임 생성·광선 재구성 옵션을 조정할 수 있도록 할 예정이라고 안내했습니다. 스트리밍 화질과 응답성의 균형을 선택하는 기능이며, 발표일에 모든 옵션이 이미 제공됐다는 의미는 아닙니다.",
  "content": "NVIDIA는 가을에 GeForce NOW Ultimate 이용자가 DLSS 4.5의 초해상도·동적 프레임 생성·광선 재구성 옵션을 조정할 수 있도록 할 예정이라고 안내했습니다. 스트리밍 화질과 응답성의 균형을 선택하는 기능이며, 발표일에 모든 옵션이 이미 제공됐다는 의미는 아닙니다.\n\n표시 시각은 공식 피드 또는 릴리스의 게시 시각을 한국시간으로 환산한 값이며, 실제 기능 활성화 시각과 다를 수 있습니다. 기능·성능·보안 설명은 출처가 발표한 내용이며 독립 실행 검증은 아닙니다.",
  "source": "https://blogs.nvidia.com/blog/geforce-now-thursday-gamescom-2026/",
  "officialUrl": "https://blogs.nvidia.com/blog/geforce-now-thursday-gamescom-2026/",
  "verifiedAt": "2026-09-08",
  "backupUrls": [],
  "tags": [
    "AI",
    "2026-w35",
    "NVIDIA"
  ],
  "slug": "feed-pass2-20260827-ca1c781736",
  "en": {
    "title": "GeForce NOW previews expanded DLSS 4.5 controls for fall",
    "deck": "GeForce NOW previews expanded DLSS 4.5 controls for fall",
    "summary": "NVIDIA previewed fall controls for GeForce NOW Ultimate users to tune DLSS 4.5 Super Resolution, Dynamic Frame Generation, and Ray Reconstruction. The announcement concerns choices between streaming quality and responsiveness, not confirmation that every option was already live on publication day.",
    "content": "NVIDIA previewed fall controls for GeForce NOW Ultimate users to tune DLSS 4.5 Super Resolution, Dynamic Frame Generation, and Ray Reconstruction. The announcement concerns choices between streaming quality and responsiveness, not confirmation that every option was already live on publication day.\n\nThe displayed time converts the official feed or release publication timestamp to Korea time and may differ from actual activation. Feature, performance and security descriptions are source-reported, not independently reproduced."
  },
  thumbnail: {"src":"/source-media/weekly-20260909/recent-ca1c781736e147b0.png","alt":"DLSS 4.5 games on GeForce NOW"},
},
{
  "date": "8/26 00:30",
  "platform": "Web",
  "title": "NVIDIA Gamescom, DLSS 4.5 광선 재구성·ACE 게임 적용 소개",
  "deck": "NVIDIA Gamescom, DLSS 4.5 광선 재구성·ACE 게임 적용 소개",
  "summary": "NVIDIA는 Gamescom 업데이트에서 2세대 트랜스포머 모델을 사용하는 DLSS 4.5 Ray Reconstruction을 제공 중이라고 안내했습니다. AI 신경망으로 광선 추적 영상의 노이즈 제거를 대체하며, Aniimo에는 2027년 초 ACE를 적용할 예정이라고 설명했습니다. RTX Spark 게임 파트너 소식과 함께 발표된 AI 그래픽 항목입니다.",
  "content": "NVIDIA는 Gamescom 업데이트에서 2세대 트랜스포머 모델을 사용하는 DLSS 4.5 Ray Reconstruction을 제공 중이라고 안내했습니다. AI 신경망으로 광선 추적 영상의 노이즈 제거를 대체하며, Aniimo에는 2027년 초 ACE를 적용할 예정이라고 설명했습니다. RTX Spark 게임 파트너 소식과 함께 발표된 AI 그래픽 항목입니다.\n\n표시 시각은 공식 피드 또는 릴리스의 게시 시각을 한국시간으로 환산한 값이며, 실제 기능 활성화 시각과 다를 수 있습니다. 기능·성능·보안 설명은 출처가 발표한 내용이며 독립 실행 검증은 아닙니다.",
  "source": "https://blogs.nvidia.com/blog/gamescom-rtx-spark-pc-games-technology/",
  "officialUrl": "https://blogs.nvidia.com/blog/gamescom-rtx-spark-pc-games-technology/",
  "verifiedAt": "2026-09-08",
  "backupUrls": [],
  "tags": [
    "AI",
    "2026-w35",
    "NVIDIA"
  ],
  "slug": "feed-pass2-20260826-cd140ce316",
  "en": {
    "title": "NVIDIA Gamescom update highlights DLSS 4.5 Ray Reconstruction and ACE",
    "deck": "NVIDIA Gamescom update highlights DLSS 4.5 Ray Reconstruction and ACE",
    "summary": "NVIDIA's Gamescom update says DLSS 4.5 Ray Reconstruction is available with a second-generation transformer model, replacing traditional denoisers with an AI network. It also previews ACE integration in Aniimo for early 2027. These are the AI-graphics components of a broader RTX Spark gaming announcement.",
    "content": "NVIDIA's Gamescom update says DLSS 4.5 Ray Reconstruction is available with a second-generation transformer model, replacing traditional denoisers with an AI network. It also previews ACE integration in Aniimo for early 2027. These are the AI-graphics components of a broader RTX Spark gaming announcement.\n\nThe displayed time converts the official feed or release publication timestamp to Korea time and may differ from actual activation. Feature, performance and security descriptions are source-reported, not independently reproduced."
  },
  thumbnail: {"src":"/source-media/weekly-20260909/recent-cd140ce3164a9cce.jpg","alt":"NVIDIA Gamescom, DLSS 4.5 광선 재구성·ACE 게임 적용 소개 공식 출처 이미지"},
},
{
  "date": "8/26",
  "platform": "Web",
  "title": "AWS·NVIDIA, 2027~2028년 GPU 200만 개 추가 배치 계획",
  "summary": "AWS와 NVIDIA는 글로벌 인프라에 GPU 200만 개를 추가 배치하는 협력 확대를 발표했습니다. 2027~2028년 계획으로, 이미 설치된 수량이 아닙니다.",
  "content": "AWS와 NVIDIA는 글로벌 인프라에 GPU 200만 개를 추가 배치하는 협력 확대를 발표했습니다. 2027~2028년 계획으로, 이미 설치된 수량이 아닙니다.\n\n발표일은 공식 원문의 날짜이며, 공개되지 않은 시각은 덧붙이지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
  "en": {
    "title": "AWS and NVIDIA plan 2 million additional GPUs in 2027–2028",
    "summary": "AWS and NVIDIA announced plans to deploy two million additional GPUs across AWS infrastructure in 2027–2028. This is planned capacity, not an already-installed total.",
    "content": "AWS and NVIDIA announced plans to deploy two million additional GPUs across AWS infrastructure in 2027–2028. This is planned capacity, not an already-installed total.\n\nThe date follows the official source; no unpublished time is inferred.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
  },
  "source": "https://nvidianews.nvidia.com/news/aws-and-nvidia-to-deliver-2-million-additional-gpus-and-next-generation-infrastructure-for-agentic-and-physical-ai",
  "officialUrl": "https://nvidianews.nvidia.com/news/aws-and-nvidia-to-deliver-2-million-additional-gpus-and-next-generation-infrastructure-for-agentic-and-physical-ai",
  "verifiedAt": "2026-09-09",
  "backupUrls": [],
  "tags": [
    "AI",
    "NVIDIA",
    "2026-w35"
  ],
  "slug": "discovery-official-b9ec799d769b",
  thumbnail: {"src":"/source-media/weekly-20260909/recent-b9ec799d769b0f4b.jpg","alt":"AWS and NVIDIA to Deliver 2 Million Additional GPUs and Next-Generation Infrastructure for Agentic and Physical AI"},
},
      ]
    },
{
  "name": "Hugging Face",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/26",
      "platform": "Web",
      "title": "Sentence Transformers 6.0 다중벡터 임베딩 학습 안내",
      "deck": "Sentence Transformers 6.0 다중벡터 임베딩 학습 안내",
      "summary": "Hugging Face는 Sentence Transformers 6.0의 MultiVectorEncoder를 활용한 학습 안내를 공개했습니다. ColBERT 방식의 다중벡터 검색 모델을 미세조정하거나 처음부터 학습하는 절차와 데이터·손실함수·평가 구성을 설명합니다. 글의 성능 비교는 작성자 실험 결과입니다.",
      "content": "Hugging Face는 Sentence Transformers 6.0의 MultiVectorEncoder를 활용한 학습 안내를 공개했습니다. ColBERT 방식의 다중벡터 검색 모델을 미세조정하거나 처음부터 학습하는 절차와 데이터·손실함수·평가 구성을 설명합니다. 글의 성능 비교는 작성자 실험 결과입니다.\n\n게시일은 공식 피드 기준입니다. 피드의 자정 표기는 실제 공개 시각을 확인한 근거가 아니므로 시·분을 표시하지 않았습니다.",
      "source": "https://huggingface.co/blog/train-multi-vector-encoder",
      "officialUrl": "https://huggingface.co/blog/train-multi-vector-encoder",
      "verifiedAt": "2026-09-08",
      "backupUrls": [],
      "tags": [
        "AI",
        "2026-w35",
        "Hugging Face"
      ],
      "slug": "feed-20260826-17177c100c",
      "en": {
        "title": "Sentence Transformers 6.0 guide covers multi-vector retrieval training",
        "deck": "Sentence Transformers 6.0 guide covers multi-vector retrieval training",
        "summary": "Hugging Face published a training guide for MultiVectorEncoder in Sentence Transformers 6.0. It covers fine-tuning and training ColBERT-style multi-vector retrieval models, including data, loss functions, and evaluation. Performance comparisons are the author's reported experiments.",
        "content": "Hugging Face published a training guide for MultiVectorEncoder in Sentence Transformers 6.0. It covers fine-tuning and training ColBERT-style multi-vector retrieval models, including data, loss functions, and evaluation. Performance comparisons are the author's reported experiments.\n\nThe publication date follows the official feed. Its midnight timestamp does not independently establish an exact launch time, so hours and minutes are omitted."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-035-a20af575124e.png","alt":"NDCG@10 on MIRIAD versus active parameters: the finetuned mLateOn-medical reaches the top at a fraction of the size of the strongest general-purpose models"},
    },
    {
      "date": "8/28",
      "platform": "Web",
      "title": "Open ASR Leaderboard, 힌디어·인도 영어 평가 확대",
      "deck": "Open ASR Leaderboard, 힌디어·인도 영어 평가 확대",
      "summary": "Voice Arena와 Hugging Face는 Open ASR Leaderboard에 힌디어와 인도 영어 평가를 추가한다고 발표했습니다. 기존 음성 인식 점수만으로 드러나기 어려운 언어·발화자 특성 차이를 평가 범위에 반영하려는 작업입니다.",
      "content": "Voice Arena와 Hugging Face는 Open ASR Leaderboard에 힌디어와 인도 영어 평가를 추가한다고 발표했습니다. 기존 음성 인식 점수만으로 드러나기 어려운 언어·발화자 특성 차이를 평가 범위에 반영하려는 작업입니다.\n\n게시일은 공식 피드 기준입니다. 피드의 자정 표기는 실제 공개 시각을 확인한 근거가 아니므로 시·분을 표시하지 않았습니다.",
      "source": "https://huggingface.co/blog/open-asr-leaderboard-global-south",
      "officialUrl": "https://huggingface.co/blog/open-asr-leaderboard-global-south",
      "verifiedAt": "2026-09-08",
      "backupUrls": [],
      "tags": [
        "AI",
        "2026-w35",
        "Hugging Face"
      ],
      "slug": "feed-20260828-4d3b17a749",
      "en": {
        "title": "Open ASR Leaderboard expands to Hindi and Indian English",
        "deck": "Open ASR Leaderboard expands to Hindi and Indian English",
        "summary": "Voice Arena and Hugging Face announced Hindi and Indian English evaluation for the Open ASR Leaderboard. The expansion addresses language and speaker differences that may be hidden by aggregate speech-recognition scores.",
        "content": "Voice Arena and Hugging Face announced Hindi and Indian English evaluation for the Open ASR Leaderboard. The expansion addresses language and speaker differences that may be hidden by aggregate speech-recognition scores.\n\nThe publication date follows the official feed. Its midnight timestamp does not independently establish an exact launch time, so hours and minutes are omitted."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-034-1a0a02af1a0d.png","alt":"nine axes of variation in the Monsoon collection"},
    }
  ]
},
{
  "name": "Cohere",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/27",
      "platform": "Web",
      "title": "Cohere Parse, 기업 문서를 구조화하는 모델 공개",
      "summary": "Cohere는 표·양식·이미지 등 문서의 시각 요소를 읽고 구조화된 Markdown과 위치 정보를 반환하는 Parse를 공개했습니다. 9개 주요 언어를 지원하며 API 가격은 1천 페이지당 1.50달러라고 안내했습니다. 성능 우위는 업체 자체 평가 주장입니다.",
      "content": "Cohere는 표·양식·이미지 등 문서의 시각 요소를 읽고 구조화된 Markdown과 위치 정보를 반환하는 Parse를 공개했습니다. 9개 주요 언어를 지원하며 API 가격은 1천 페이지당 1.50달러라고 안내했습니다. 성능 우위는 업체 자체 평가 주장입니다.\n\n출력에는 시각 요소의 위치를 나타내는 경계 상자가 포함됩니다. Cohere는 Compass와 Model Vault뿐 아니라 자체 인프라 배포 경로도 안내했으며, 표의 비교 점수는 회사가 구성한 평가 범위에 한정됩니다.\n\n날짜 안내: 2026-08-27는 발행자가 표시한 게시 날짜입니다. 게시 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "en": {
        "title": "Cohere introduces Parse for enterprise documents",
        "summary": "Cohere introduces Parse to convert documents containing tables, forms and images into structured Markdown with spatial information. It states support for nine major languages and API pricing of $1.50 per 1,000 pages; performance comparisons are provider claims.",
        "content": "Cohere introduces Parse to convert documents containing tables, forms and images into structured Markdown with spatial information. It states support for nine major languages and API pricing of $1.50 per 1,000 pages; performance comparisons are provider claims.\n\nOutputs include bounding boxes locating visual elements. Cohere describes Compass, Model Vault and self-hosted deployment options; comparative scores refer to the company’s evaluation scope.\n\nDate disclosure: 2026-08-27 is the publisher-displayed publication date. No publication time or timezone was established, so it has not been converted to Korea time or assigned an invented time."
      },
      "source": "https://cohere.com/blog/parse",
      "officialUrl": "https://cohere.com/blog/parse",
      "verifiedAt": "2026-09-08",
      "tags": [
        "AI",
        "2026-w35",
        "Cohere"
      ],
      "slug": "cohere-20260827-product-337669bcf446",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-7cb2da21c69face5.png","alt":"Cohere Parse, 기업 문서를 구조화하는 모델 공개 공식 출처 이미지"},
    }
  ]
},
{
  "name": "Higgsfield",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/27 04:00",
      "platform": "Web",
      "title": "Higgsfield에 Recraft V4.1·Styles·Utility 추가",
      "summary": "새로운 이미지 구상용 V4.1, 참고 스타일을 맞추는 Styles, 단순하고 통제된 구성용 Utility를 선택할 수 있어요. 이번 소식은 Higgsfield 안에서의 제공 안내이며 Recraft V4 자체의 최초 출시와는 다른 사건이에요.",
      "content": "새로운 이미지 구상용 V4.1, 참고 스타일을 맞추는 Styles, 단순하고 통제된 구성용 Utility를 선택할 수 있어요. 이번 소식은 Higgsfield 안에서의 제공 안내이며 Recraft V4 자체의 최초 출시와는 다른 사건이에요.",
      "en": {
        "title": "Recraft V4.1, Styles and Utility arrive on Higgsfield",
        "summary": "Higgsfield offers separate Recraft models for creative generation, reference-style matching and controlled compositions. This is availability within Higgsfield, distinct from the original Recraft V4 release.",
        "content": "Higgsfield offers separate Recraft models for creative generation, reference-style matching and controlled compositions. This is availability within Higgsfield, distinct from the original Recraft V4 release."
      },
      "source": "https://higgsfield.ai/blog/recraft-v4-higgsfield",
      "officialUrl": "https://higgsfield.ai/blog/recraft-v4-higgsfield",
      "verifiedAt": "2026-09-08",
      "slug": "recraft-v4-higgsfield-db8126e3",
      "tags": [
        "생성형 AI",
        "플랫폼 통합"
      ],
      "readMinutes": 1,
      thumbnail: {"src":"/source-media/weekly-20260909/recent-db8126e3b8ea51a3.png","alt":"Higgsfield에 Recraft V4.1·Styles·Utility 추가 공식 출처 이미지"},
    }
  ]
},
{
  "name": "Cartesia",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/27",
      "platform": "Web",
      "title": "Cartesia Sonic-3.6, 44개 언어의 자연스러운 음성에 초점",
      "summary": "Cartesia가 자연스러움과 다국어 발화를 개선한 Sonic-3.6을 공개했어요. 15개 지역의 블라인드 비교에서 선호도가 최대 93%였다는 수치와 순위는 회사가 공개한 평가 설명이며, 이번 조사에서 독립 재현한 결과는 아니에요.",
      "content": "Cartesia가 자연스러움과 다국어 발화를 개선한 Sonic-3.6을 공개했어요. 15개 지역의 블라인드 비교에서 선호도가 최대 93%였다는 수치와 순위는 회사가 공개한 평가 설명이며, 이번 조사에서 독립 재현한 결과는 아니에요.\n\n표시 날짜는 발행자가 명시한 게시일입니다. 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았어요.",
      "en": {
        "title": "Cartesia releases Sonic-3.6 with a focus on multilingual naturalness",
        "summary": "Sonic-3.6 targets more natural speech across 44 languages. Cartesia reports up to 93% preference in blind comparisons across fifteen locales; these results and leaderboard claims are attributed to the vendor and were not independently reproduced here.",
        "content": "Sonic-3.6 targets more natural speech across 44 languages. Cartesia reports up to 93% preference in blind comparisons across fifteen locales; these results and leaderboard claims are attributed to the vendor and were not independently reproduced here.\n\nThe displayed date is the publisher date. No publication time or timezone was established, so no Korea-time conversion or invented time is applied."
      },
      "source": "https://cartesia.ai/blog/sonic-3.6",
      "officialUrl": "https://cartesia.ai/blog/sonic-3.6",
      "verifiedAt": "2026-09-08",
      "slug": "sonic-36-1d75351e",
      "tags": [
        "생성형 AI",
        "음성 모델 출시"
      ],
      "readMinutes": 1,
      thumbnail: {"src":"/source-media/weekly-20260909/recent-1d75351e3bb07964.webp","alt":"A hand-drawn outlined sheet of paper overlapping a green watercolour speech bubble marked 3.6"},
    }
  ]
},
{
  "name": "Kling",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/27 22:36",
      "platform": "Web",
      "title": "Kling, Claude Code·MCP 기반 영상 일괄 제작 가이드 3종 공개",
      "summary": "8월 27일 공식 가이드 3편은 음식 홍보·패션 상품·연기 장면을 대상으로 참고 자료와 승인된 제작 규칙을 재사용하는 방법을 설명해요. 소수 장면을 먼저 검토한 뒤 변형 영상을 일괄 생성하는 흐름이에요. 가이드 게시일을 Kling MCP 최초 출시일로 간주하지 않았어요.",
      "content": "8월 27일 공식 가이드 3편은 음식 홍보·패션 상품·연기 장면을 대상으로 참고 자료와 승인된 제작 규칙을 재사용하는 방법을 설명해요. 소수 장면을 먼저 검토한 뒤 변형 영상을 일괄 생성하는 흐름이에요. 가이드 게시일을 Kling MCP 최초 출시일로 간주하지 않았어요.",
      "en": {
        "title": "Kling publishes three MCP batch-video workflow guides",
        "summary": "Three August 27 guides cover food promotions, fashion products and cinematic performances using reusable references and approved creative rules. They recommend testing a few concepts before scaling variations. Their publication date is not treated as the original Kling MCP launch date.",
        "content": "Three August 27 guides cover food promotions, fashion products and cinematic performances using reusable references and approved creative rules. They recommend testing a few concepts before scaling variations. Their publication date is not treated as the original Kling MCP launch date."
      },
      "source": "https://kling.ai/blog/claude-code-kling-mcp-food-promo-workflow",
      "officialUrl": "https://kling.ai/blog/claude-code-kling-mcp-food-promo-workflow",
      "verifiedAt": "2026-09-08",
      "slug": "kling-mcp-20260827-workflow-guides-84d346a8",
      "tags": [
        "AI 활용",
        "공식 활용 가이드 3종"
      ],
      "readMinutes": 1,
      "backupUrls": [
        {
          "label": "Kling official complementary workflow guide",
          "url": "https://kling.ai/blog/claude-kling-mcp-fashion-video-workflow"
        },
        {
          "label": "Kling official complementary workflow guide",
          "url": "https://kling.ai/blog/kling-mcp-cinematic-performance-workflow"
        }
      ],
      thumbnail: {"src":"/source-media/weekly-20260909/recent-84d346a88fe70902.png","alt":"Claude Code MCP Support: Batch Create Food Promo Videos with Kling"},
    }
  ]
},
{
  "name": "Midjourney",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/29 09:35",
      "platform": "Web",
      "title": "Midjourney, V8.2 편집 모델의 이미지 품질 개선",
      "summary": "Midjourney가 V8.2 이미지 편집 모델의 품질을 개선했다고 밝혔어요. 이전 24시간 동안 문제가 있었던 이용자에게 다시 시도하고 피드백을 보내 달라고 안내한 후속 업데이트예요.",
      "content": "Midjourney가 V8.2 이미지 편집 모델의 품질을 개선했다고 밝혔어요. 이전 24시간 동안 문제가 있었던 이용자에게 다시 시도하고 피드백을 보내 달라고 안내한 후속 업데이트예요.",
      "en": {
        "title": "Midjourney improves V8.2 edit image quality",
        "summary": "Midjourney reports an image-quality update for the V8.2 edit model and asks users who experienced problems in the preceding 24 hours to retry and provide feedback.",
        "content": "Midjourney reports an image-quality update for the V8.2 edit model and asks users who experienced problems in the preceding 24 hours to retry and provide feedback."
      },
      "source": "https://updates.midjourney.com/edit-image-quality-update",
      "officialUrl": "https://updates.midjourney.com/edit-image-quality-update",
      "verifiedAt": "2026-09-08",
      "slug": "edit-image-quality-update-83901a5e",
      "tags": [
        "생성형 AI",
        "모델 품질 개선"
      ],
      "readMinutes": 1,
      thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-046-f10c90ab6599.jpg","alt":"Midjourney, V8.2 편집 모델의 이미지 품질 개선 공식 출처 이미지"},
    },
    {
      "date": "8/28 08:32",
      "platform": "Web",
      "title": "Midjourney V8.2 이미지 편집 모델, 최대 4장 참고 이미지 지원",
      "summary": "자연어 지시로 이미지를 고치고 최대 4장의 참고 이미지를 함께 사용할 수 있어요. 영역 수정·화면 확장과 개인화도 지원하며, 공식 웹사이트와 알파 사이트에서 커뮤니티 테스트를 시작했어요.",
      "content": "자연어 지시로 이미지를 고치고 최대 4장의 참고 이미지를 함께 사용할 수 있어요. 영역 수정·화면 확장과 개인화도 지원하며, 공식 웹사이트와 알파 사이트에서 커뮤니티 테스트를 시작했어요.",
      "en": {
        "title": "Midjourney opens V8.2 image editing for community testing",
        "summary": "The edit model supports instruction-based changes, up to four image references, inpainting and outpainting, plus personalization. It is being tested on the main and alpha websites, with Discord support through the edit parameter.",
        "content": "The edit model supports instruction-based changes, up to four image references, inpainting and outpainting, plus personalization. It is being tested on the main and alpha websites, with Discord support through the edit parameter."
      },
      "source": "https://updates.midjourney.com/edit-model-for-v8",
      "officialUrl": "https://updates.midjourney.com/edit-model-for-v8",
      "verifiedAt": "2026-09-08",
      "slug": "edit-model-for-v8-928a7aa0",
      "tags": [
        "생성형 AI",
        "편집 모델 테스트"
      ],
      "readMinutes": 1,
      thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-044-79a483495fb6.jpg","alt":"Midjourney V8.2 이미지 편집 모델, 최대 4장 참고 이미지 지원 공식 출처 이미지"},
    }
  ]
},
{
  "name": "SK",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/28 01:00",
      "platform": "Web",
      "title": "SK하이닉스, 미국 인디애나 HBM 생산거점 착공",
      "summary": "SK하이닉스는 미국 인디애나의 AI 메모리 패키징 생산기지 기공식을 발표했습니다. 40억 달러 이상을 투자하고 2029년 하반기 첫 미국 생산 HBM 공급을 계획합니다.",
      "content": "SK하이닉스는 미국 인디애나의 AI 메모리 패키징 생산기지 기공식을 발표했습니다. 40억 달러 이상을 투자하고 2029년 하반기 첫 미국 생산 HBM 공급을 계획합니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "SK hynix breaks ground on Indiana HBM facility",
        "summary": "SK hynix announced groundbreaking for its AI-memory packaging facility in Indiana, with investment exceeding $4 billion and initial US-made HBM production planned for the second half of 2029.",
        "content": "SK hynix announced groundbreaking for its AI-memory packaging facility in Indiana, with investment exceeding $4 billion and initial US-made HBM production planned for the second half of 2029.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://news.skhynix.co.kr/groundbreaking-ceremony-in-indiana/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "SK",
        "2026-w35"
      ],
      "backupUrls": [
        {
          "label": "미국 AI 혁신의 새 거점, SK하이닉스 인디애나 팹 첫 삽 뜨다 | SK hynix Newsroom",
          "url": "https://news.skhynix.co.kr/indiana-groundbreaking-ceremony-sketch/"
        },
        {
          "label": "[VOD] SK하이닉스 미국 인디애나 팹(Indiana Fab) 기공식 | SK hynix Newsroom",
          "url": "https://news.skhynix.co.kr/indiana-fab-groundbreaking/"
        }
      ],
      "officialUrl": "https://news.skhynix.co.kr/groundbreaking-ceremony-in-indiana/",
      "slug": "industry-20260828-d9eba9290e5a",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-c08ffecbfef6e79f.jpg","alt":"01 미국 AI 혁신의 새 거점, SK하이닉스 인디애나 팹 첫 삽 뜨다 기타 이미지 story"},
    },
    {
      "date": "8/26 09:00",
      "platform": "Web",
      "title": "SK하이닉스, DTF 2026에서 AI 메모리 제품군 소개",
      "summary": "SK하이닉스가 서울 델 테크놀로지 포럼에서 PC부터 데이터센터까지 아우르는 AI 메모리 제품군을 소개했습니다. 새 모델 출시가 아니라 전시·협력 소식입니다.",
      "content": "SK하이닉스가 서울 델 테크놀로지 포럼에서 PC부터 데이터센터까지 아우르는 AI 메모리 제품군을 소개했습니다. 새 모델 출시가 아니라 전시·협력 소식입니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "SK hynix showcases AI memory at DTF 2026",
        "summary": "SK hynix described its AI-memory portfolio exhibition at Dell Technologies Forum in Seoul, spanning PCs and data centers. This is an exhibition and partnership update, not a model launch.",
        "content": "SK hynix described its AI-memory portfolio exhibition at Dell Technologies Forum in Seoul, spanning PCs and data centers. This is an exhibition and partnership update, not a model launch.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://news.skhynix.co.kr/dtf-2026/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "SK",
        "2026-w35"
      ],
      "officialUrl": "https://news.skhynix.co.kr/dtf-2026/",
      "slug": "industry-20260826-13e29827c1d0",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-e9ad19a11773e5ac.jpg","alt":"SK하이닉스, ‘DTF 2026’서 AI 인프라에 최적화된 메모리 솔루션 총망라 기타 이미지 TECH&AI 2026"},
    }
  ]
},
{
  "name": "NAVER",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/28",
      "platform": "Web",
      "title": "팀네이버, ECCV 2026에 비전 AI 논문 23편 채택",
      "summary": "팀네이버는 ECCV 2026에 논문 23편이 채택됐다고 발표했습니다. 3D 공간 재구성, 이미지·영상 학습, 로봇 주행 시뮬레이션 등의 연구이며 4건은 스포트라이트로 선정됐습니다. 회사 발표 기준의 연구 성과로, 상용 서비스 출시와는 구분해야 합니다.",
      "content": "팀네이버는 ECCV 2026에 논문 23편이 채택됐다고 발표했습니다. 3D 공간 재구성, 이미지·영상 학습, 로봇 주행 시뮬레이션 등의 연구이며 4건은 스포트라이트로 선정됐습니다. 회사 발표 기준의 연구 성과로, 상용 서비스 출시와는 구분해야 합니다.\n\n날짜 안내: 표시 날짜는 발행자가 명시한 게시일입니다. 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "en": {
        "title": "Team NAVER reports 23 papers accepted at ECCV 2026",
        "summary": "Team NAVER announced that 23 papers were accepted at ECCV 2026, including work on 3D reconstruction, visual learning, and robot-navigation simulation. Four received spotlight selections. These are company-reported research results, not commercial product launches.",
        "content": "Team NAVER announced that 23 papers were accepted at ECCV 2026, including work on 3D reconstruction, visual learning, and robot-navigation simulation. Four received spotlight selections. These are company-reported research results, not commercial product launches.\n\nDate disclosure: the displayed date is the publisher date. No publication time or timezone was established, so no Korea-time conversion or invented time is applied."
      },
      "source": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034616",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "NAVER",
        "2026-w35"
      ],
      "officialUrl": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034616",
      "slug": "industry-20260828-de768d58df8b"
    },
    {
      "date": "8/27",
      "platform": "Web",
      "title": "네이버클라우드·LG CNS, 보안 AI 개발 컨소시엄 참여",
      "summary": "네이버클라우드와 LG CNS는 사이버 보안 특화 AI 모델 개발 사업에 공동 컨소시엄으로 참여한다고 발표했습니다. 9월 3일 최종 선정 발표에 앞선 참가 단계 소식입니다.",
      "content": "네이버클라우드와 LG CNS는 사이버 보안 특화 AI 모델 개발 사업에 공동 컨소시엄으로 참여한다고 발표했습니다. 9월 3일 최종 선정 발표에 앞선 참가 단계 소식입니다.\n\n날짜 안내: 표시 날짜는 발행자가 명시한 게시일입니다. 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "en": {
        "title": "NAVER Cloud and LG CNS form cybersecurity AI consortium",
        "summary": "NAVER Cloud and LG CNS announced consortium participation in a cybersecurity AI foundation-model program. This participation-stage announcement precedes the September 3 selection announcement.",
        "content": "NAVER Cloud and LG CNS announced consortium participation in a cybersecurity AI foundation-model program. This participation-stage announcement precedes the September 3 selection announcement.\n\nDate disclosure: the displayed date is the publisher date. No publication time or timezone was established, so no Korea-time conversion or invented time is applied."
      },
      "source": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034614",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "NAVER",
        "2026-w35"
      ],
      "officialUrl": "https://www.navercorp.com/media/pressReleasesDetail?seq=10034614",
      "slug": "industry-20260827-67f712698ec8"
    }
  ]
},
{
  "name": "AMD",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/28 00:09",
      "platform": "Web",
      "title": "AMD ROCm 10, AI 기반 개발 경험 확대",
      "summary": "AMD는 ROCm 10에서 ROCm.AI의 AI 기반 개발 경험을 AMD 플랫폼으로 확대하는 내용을 소개했습니다. 구체적인 지원 환경은 공식 문서의 조건을 확인해야 합니다.",
      "content": "AMD는 ROCm 10에서 ROCm.AI의 AI 기반 개발 경험을 AMD 플랫폼으로 확대하는 내용을 소개했습니다. 구체적인 지원 환경은 공식 문서의 조건을 확인해야 합니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "AMD ROCm 10 expands AI-native developer experiences",
        "summary": "AMD introduced ROCm 10 and described bringing ROCm.AI’s AI-native developer experiences to AMD platforms. Supported environments remain subject to official documentation.",
        "content": "AMD introduced ROCm 10 and described bringing ROCm.AI’s AI-native developer experiences to AMD platforms. Supported environments remain subject to official documentation.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://newsroom.amd.com/news/rocm-10-software-ai-native-developer-experiences/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "AMD",
        "2026-w35"
      ],
      "officialUrl": "https://newsroom.amd.com/news/rocm-10-software-ai-native-developer-experiences/",
      "slug": "industry-20260827-e7f24bbe3ec5",
      thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-041-60708d2035c5.avif","alt":"ROCm AI AI Driven Development Platform"},
    }
  ]
},
{
  "name": "Notion",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/28",
      "platform": "Web",
      "title": "Notion 에이전트, 문서 직접 수정 대신 변경안 제안",
      "summary": "Notion 에이전트에게 수정을 제안해 달라고 요청하면 문서를 바로 바꾸는 대신 변경안을 검토할 수 있습니다. 사용자는 위에서 아래로 제안을 하나씩 승인할 수 있어 문법 교정처럼 문장 단위 검토가 필요한 작업에 적합합니다.",
      "content": "Notion 에이전트에게 수정을 제안해 달라고 요청하면 문서를 바로 바꾸는 대신 변경안을 검토할 수 있습니다. 사용자는 위에서 아래로 제안을 하나씩 승인할 수 있어 문법 교정처럼 문장 단위 검토가 필요한 작업에 적합합니다.\n\n날짜 안내: 표시 날짜는 발행자가 명시한 게시일입니다. 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "en": {
        "title": "Notion agents can suggest edits for review",
        "summary": "Notion agents can now propose changes instead of applying them directly. Users can review and approve suggestions one by one, supporting line-level workflows such as grammar editing.",
        "content": "Notion agents can now propose changes instead of applying them directly. Users can review and approve suggestions one by one, supporting line-level workflows such as grammar editing.\n\nDate disclosure: the displayed date is the publisher date. No publication time or timezone was established, so no Korea-time conversion or invented time is applied."
      },
      "source": "https://www.notion.com/releases/2026-08-28",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Notion",
        "2026-w35"
      ],
      "officialUrl": "https://www.notion.com/releases/2026-08-28",
      "slug": "industry-20260828-8e632fc71b5b",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-79959ba0f7670a85.png","alt":"Notion 에이전트, 문서 직접 수정 대신 변경안 제안 공식 출처 이미지","provenance":"source-share-preview"},
    }
  ]
},
{
  "name": "Figma",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/29 04:30",
      "platform": "Web",
      "title": "Figma, AI가 디자인에 미치는 영향 측정 논의",
      "summary": "Figma는 디자인 업무에서 AI의 효과를 어떻게 측정할지 다룬 글을 공개했습니다. 제품 출시가 아니라 평가·업무 방식에 관한 분석입니다.",
      "content": "**자료 유형: 기술 구현 안내·분석**\n\nFigma는 디자인 업무에서 AI의 효과를 어떻게 측정할지 다룬 글을 공개했습니다. 제품 출시가 아니라 평가·업무 방식에 관한 분석입니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Figma examines measuring AI’s impact on design",
        "summary": "Figma published a discussion of how to measure AI’s impact on design work. It is an evaluation and workflow analysis, not a product launch.",
        "content": "**Article type: Technical implementation guide / analysis**\n\nFigma published a discussion of how to measure AI’s impact on design work. It is an evaluation and workflow analysis, not a product launch.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.figma.com/blog/measuring-the-impact-of-ai/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Figma",
        "2026-w35"
      ],
      "officialUrl": "https://www.figma.com/blog/measuring-the-impact-of-ai/",
      "slug": "industry-20260828-c7be1dc640d9",
      thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-049-ba589fcc7afd.avif","alt":"Abstract geometric composition with overlapping neon yellow, green, and gray shapes, looping pink and blue lines, and small squares."},
    },
    {
      "date": "8/27 07:00",
      "platform": "Web",
      "title": "Figma, 에이전트로 디자인·코드 오가는 작업 안내",
      "summary": "Figma는 에이전트를 활용해 디자인과 코드를 오가는 작업 과정을 소개했습니다. 실습 안내이며 별도 신모델 출시로 보도하지 않습니다.",
      "content": "**자료 유형: 기술 구현 안내·분석**\n\nFigma는 에이전트를 활용해 디자인과 코드를 오가는 작업 과정을 소개했습니다. 실습 안내이며 별도 신모델 출시로 보도하지 않습니다. 본문은 가상의 STEM 학습 앱 Radicle을 예시로 사용하므로 실제 고객 성과로 읽으면 안 됩니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Figma demonstrates agent-assisted design-to-code workflows",
        "summary": "Figma published a workflow guide on moving between design and code with agents. It is a practical tutorial rather than a new model launch.",
        "content": "**Article type: Technical implementation guide / analysis**\n\nFigma published a workflow guide on moving between design and code with agents. It is a practical tutorial rather than a new model launch. The article uses the fictional STEM app Radicle, so the example is not evidence of a real customer outcome.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.figma.com/blog/workflow-lab-moving-between-design-and-code-with-agents/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Figma",
        "2026-w35"
      ],
      "officialUrl": "https://www.figma.com/blog/workflow-lab-moving-between-design-and-code-with-agents/",
      "slug": "industry-20260826-37c124e9cc34",
      thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-050-f3ff832af125.avif","alt":"Dark-mode conversations inbox showing a toolbar with select all, unread, delete, and sort controls above a list of messages."},
    },
    {
      "date": "8/26",
      "platform": "Web",
      "title": "Figma 데스크톱, 에이전트 채팅을 별도 창으로 분리",
      "summary": "Figma 데스크톱은 macOS·Windows에서 에이전트 채팅을 별도 창으로 열어 다른 도구나 탭을 사용해도 계속 볼 수 있게 했습니다.",
      "content": "Figma 데스크톱은 macOS·Windows에서 에이전트 채팅을 별도 창으로 열어 다른 도구나 탭을 사용해도 계속 볼 수 있게 했습니다.\n\n날짜 안내: 표시 날짜는 발행자가 명시한 게시일입니다. 시각과 시간대가 확인되지 않아 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "en": {
        "title": "Figma desktop opens agent chat in a separate window",
        "summary": "Figma desktop on macOS and Windows can open agent chat in a separate window that stays visible while using other tools or tabs.",
        "content": "Figma desktop on macOS and Windows can open agent chat in a separate window that stays visible while using other tools or tabs.\n\nDate disclosure: the displayed date is the publisher date. No publication time or timezone was established, so no Korea-time conversion or invented time is applied."
      },
      "source": "https://www.figma.com/release-notes/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Figma",
        "2026-w35"
      ],
      "officialUrl": "https://www.figma.com/release-notes/",
      "slug": "industry-20260826-ceaca017e366"
    }
  ]
},
{
  "name": "Atlassian",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/28 10:37",
      "platform": "Web",
      "title": "Atlassian, 반복 엔지니어링 작업 자동화 사례 소개",
      "summary": "Atlassian은 반복적인 보안 수정 등 표준 엔지니어링 작업을 에이전트로 처리하는 사례를 공개했습니다. 제품 신규 출시보다 실제 운영 방식에 초점을 둔 글입니다.",
      "content": "**자료 유형: 기술 구현 안내·분석**\n\nAtlassian은 반복적인 보안 수정 등 표준 엔지니어링 작업을 에이전트로 처리하는 사례를 공개했습니다. 제품 신규 출시보다 실제 운영 방식에 초점을 둔 글입니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Atlassian shares agentic engineering automation practice",
        "summary": "Atlassian published a practical account of automating repeatable engineering work, including security fixes, with agents. It focuses on operating practice rather than a new launch.",
        "content": "**Article type: Technical implementation guide / analysis**\n\nAtlassian published a practical account of automating repeatable engineering work, including security fixes, with agents. It focuses on operating practice rather than a new launch.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.atlassian.com/blog/development/agentic-automation-in-practice-putting-standard-engineering-work-on-autopilot",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Atlassian",
        "2026-w35"
      ],
      "officialUrl": "https://www.atlassian.com/blog/development/agentic-automation-in-practice-putting-standard-engineering-work-on-autopilot",
      "slug": "industry-20260827-0279a9821513",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-9cb4ab2429492fc9.png","alt":"Atlassian, 반복 엔지니어링 작업 자동화 사례 소개 공식 출처 이미지"},
    },
    {
      "date": "8/28 07:00",
      "platform": "Web",
      "title": "Teamwork Graph, Microsoft Teams 대화 맥락 연결",
      "summary": "Atlassian은 Microsoft Teams의 대화·회의 맥락을 Teamwork Graph에 연결하는 커넥터를 소개했습니다. Rovo를 Teams에서 사용하는 반대 방향의 연동과 구분되는 데이터 연결입니다.",
      "content": "Atlassian은 Microsoft Teams의 대화·회의 맥락을 Teamwork Graph에 연결하는 커넥터를 소개했습니다. Rovo를 Teams에서 사용하는 반대 방향의 연동과 구분되는 데이터 연결입니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Teamwork Graph connects Microsoft Teams context",
        "summary": "Atlassian introduced a connector bringing Microsoft Teams conversation and meeting context into Teamwork Graph. This data-ingestion direction is distinct from accessing Rovo within Teams.",
        "content": "Atlassian introduced a connector bringing Microsoft Teams conversation and meeting context into Teamwork Graph. This data-ingestion direction is distinct from accessing Rovo within Teams.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.atlassian.com/blog/ai-at-work/microsoft-teams-teamwork-graph-connector",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Atlassian",
        "2026-w35"
      ],
      "officialUrl": "https://www.atlassian.com/blog/ai-at-work/microsoft-teams-teamwork-graph-connector",
      "slug": "industry-20260827-8daed1119dce",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-9dfaa800cfb7a844.jpg","alt":"Teamwork Graph, Microsoft Teams 대화 맥락 연결 공식 출처 이미지"},
    },
    {
      "date": "8/28 03:40",
      "platform": "Web",
      "title": "Atlassian, 리더의 소통을 돕는 AI 에이전트 사례",
      "summary": "Atlassian은 조직 리더가 AI 에이전트로 소통과 피드백 흐름을 개선한 내부 사례를 공개했습니다. 회사 내부 사용 사례로, 보편적 성과를 입증하는 실험은 아닙니다.",
      "content": "**자료 유형: 구현·활용 사례**\n\nAtlassian은 조직 리더가 AI 에이전트로 소통과 피드백 흐름을 개선한 내부 사례를 공개했습니다. 회사 내부 사용 사례로, 보편적 성과를 입증하는 실험은 아닙니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Atlassian shares an AI-assisted leadership feedback case",
        "summary": "Atlassian shared an internal case of a leader using an AI agent to improve communication and feedback. It is a company case study, not generalizable experimental evidence.",
        "content": "**Article type: Implementation case study**\n\nAtlassian shared an internal case of a leader using an AI agent to improve communication and feedback. It is a company case study, not generalizable experimental evidence.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.atlassian.com/blog/ai-at-work/how-one-leader-rebuilt-his-feedback-loop-with-an-ai-agent",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Atlassian",
        "2026-w35"
      ],
      "officialUrl": "https://www.atlassian.com/blog/ai-at-work/how-one-leader-rebuilt-his-feedback-loop-with-an-ai-agent",
      "slug": "industry-20260827-a4ff6a015967",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-607083d41705ca45.png","alt":"Atlassian, 리더의 소통을 돕는 AI 에이전트 사례 공식 출처 이미지"},
    },
    {
      "date": "8/27 14:45",
      "platform": "Web",
      "title": "Atlassian, Rovo 자율 작업을 위한 실행 구조 공개",
      "summary": "Atlassian이 Rovo가 검색을 넘어 계획·도구 실행·여러 단계의 업무를 처리하도록 만든 실행 구조를 설명했습니다. 기능 구현을 다루는 기술 공개입니다.",
      "content": "**자료 유형: 기술 구현 안내·분석**\n\nAtlassian이 Rovo가 검색을 넘어 계획·도구 실행·여러 단계의 업무를 처리하도록 만든 실행 구조를 설명했습니다. 기능 구현을 다루는 기술 공개입니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Atlassian explains Rovo’s agent harness",
        "summary": "Atlassian explained the execution architecture supporting Rovo’s transition from search to planning, tool use, and multi-step workflows. This is an engineering disclosure.",
        "content": "**Article type: Technical implementation guide / analysis**\n\nAtlassian explained the execution architecture supporting Rovo’s transition from search to planning, tool use, and multi-step workflows. This is an engineering disclosure.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.atlassian.com/blog/rovo/agent-autonomy",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Atlassian",
        "2026-w35"
      ],
      "officialUrl": "https://www.atlassian.com/blog/rovo/agent-autonomy",
      "slug": "industry-20260826-87ca93fac2b1",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-30f5825636daaee3.png","alt":"Atlassian, Rovo 자율 작업을 위한 실행 구조 공개 공식 출처 이미지"},
    },
    {
      "date": "8/27 05:29",
      "platform": "Web",
      "title": "Atlassian, AI로 만든 시제품을 운영 제품으로 바꾼 경험 공개",
      "summary": "Atlassian은 AI로 만든 시제품을 기업용 운영 제품으로 발전시킨 팀의 경험을 공개했습니다. 실패와 사람 중심 검토로의 전환을 함께 다루며 생산성 수치는 해당 팀의 자체 사례입니다.",
      "content": "**자료 유형: 구현·활용 사례**\n\nAtlassian은 AI로 만든 시제품을 기업용 운영 제품으로 발전시킨 팀의 경험을 공개했습니다. 실패와 사람 중심 검토로의 전환을 함께 다루며 생산성 수치는 해당 팀의 자체 사례입니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Atlassian shares lessons taking AI prototypes to production",
        "summary": "Atlassian shared a team’s experience taking AI-built prototypes into enterprise production, including failures and a return to human-first review. Productivity figures are self-reported for that team.",
        "content": "**Article type: Implementation case study**\n\nAtlassian shared a team’s experience taking AI-built prototypes into enterprise production, including failures and a return to human-first review. Productivity figures are self-reported for that team.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.atlassian.com/blog/jira/ai-built-prototype-to-production",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Atlassian",
        "2026-w35"
      ],
      "officialUrl": "https://www.atlassian.com/blog/jira/ai-built-prototype-to-production",
      "slug": "industry-20260826-ae773d942352",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-f6d12ea024243043.png","alt":"Atlassian, AI로 만든 시제품을 운영 제품으로 바꾼 경험 공개 공식 출처 이미지"},
    },
    {
      "date": "8/27 02:00",
      "platform": "Web",
      "title": "Rovo, Microsoft 365 Copilot·Teams에서 Jira 작업 연결",
      "summary": "Atlassian은 Rovo를 Microsoft 365 Copilot과 Teams의 에이전트로 제공한다고 발표했습니다. Teamwork Graph의 업무 맥락을 활용하고, Teams의 Jira Cloud 앱에서 자연어로 작업을 실행하거나 에이전트에 위임하는 흐름을 지원합니다.",
      "content": "Atlassian은 Rovo를 Microsoft 365 Copilot과 Teams의 에이전트로 제공한다고 발표했습니다. Teamwork Graph의 업무 맥락을 활용하고, Teams의 Jira Cloud 앱에서 자연어로 작업을 실행하거나 에이전트에 위임하는 흐름을 지원합니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Rovo connects Microsoft 365 Copilot and Teams to Jira workflows",
        "summary": "Atlassian announced Rovo as an agent in Microsoft 365 Copilot and Teams. The integration brings Teamwork Graph context into those workspaces and adds natural-language Jira workflows and agent delegation through the Jira Cloud app for Teams.",
        "content": "Atlassian announced Rovo as an agent in Microsoft 365 Copilot and Teams. The integration brings Teamwork Graph context into those workspaces and adds natural-language Jira workflows and agent delegation through the Jira Cloud app for Teams.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.atlassian.com/blog/rovo/rovo-jira-microsoft-365",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Atlassian",
        "2026-w35"
      ],
      "officialUrl": "https://www.atlassian.com/blog/rovo/rovo-jira-microsoft-365",
      "slug": "industry-20260826-dcbd6d9a9882",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-89decc7aa0e7373e.png","alt":"Rovo, Microsoft 365 Copilot·Teams에서 Jira 작업 연결 공식 출처 이미지"},
    }
  ]
},
{
  "name": "Salesforce",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/28 00:00",
      "platform": "Web",
      "title": "Salesforce, Employee Agent 1년 운영 사례 공개",
      "summary": "Salesforce는 사내 Employee Agent 운영 1년의 경험을 공개했습니다. 직원의 HR 정보 탐색과 셀프서비스 활용 사례이며 성과 수치는 회사 내부 측정입니다.",
      "content": "**자료 유형: 구현·활용 사례**\n\nSalesforce는 사내 Employee Agent 운영 1년의 경험을 공개했습니다. 직원의 HR 정보 탐색과 셀프서비스 활용 사례이며 성과 수치는 회사 내부 측정입니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Salesforce shares a year of Employee Agent usage",
        "summary": "Salesforce shared a year of internal Employee Agent experience in HR information retrieval and employee self-service. Performance figures are internally measured.",
        "content": "**Article type: Implementation case study**\n\nSalesforce shared a year of internal Employee Agent experience in HR information retrieval and employee self-service. Performance figures are internally measured.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.salesforce.com/news/stories/lessons-from-first-year-of-employee-agent/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Salesforce",
        "2026-w35"
      ],
      "officialUrl": "https://www.salesforce.com/news/stories/lessons-from-first-year-of-employee-agent/",
      "slug": "industry-20260827-b0dd8efce075",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-7ac4c278cd76bba0.png","alt":"What Salesforce Learned After Using Employee Agent for a Year"},
    },
    {
      "date": "8/27 22:00",
      "platform": "Web",
      "title": "Salesforce, 에이전트 도입 기업의 투자회수 조사 공개",
      "summary": "Salesforce는 에이전트 AI 리더 2,025명을 조사한 결과를 공개했습니다. 빠른 출시 자체보다 데이터 품질, 좁은 업무 범위, 사람에게 넘기는 절차의 중요성을 강조합니다. 설문 결과이며 인과관계 실험은 아닙니다.",
      "content": "Salesforce는 에이전트 AI 리더 2,025명을 조사한 결과를 공개했습니다. 빠른 출시 자체보다 데이터 품질, 좁은 업무 범위, 사람에게 넘기는 절차의 중요성을 강조합니다. 설문 결과이며 인과관계 실험은 아닙니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Salesforce publishes agentic AI ROI survey",
        "summary": "Salesforce published a survey of 2,025 agentic AI leaders, emphasizing data quality, narrow scope, and human escalation over being first to launch. This is survey evidence, not a causal experiment.",
        "content": "Salesforce published a survey of 2,025 agentic AI leaders, emphasizing data quality, narrow scope, and human escalation over being first to launch. This is survey evidence, not a causal experiment.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.salesforce.com/news/stories/agentic-ai-leaders-survey-on-roi/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Salesforce",
        "2026-w35"
      ],
      "officialUrl": "https://www.salesforce.com/news/stories/agentic-ai-leaders-survey-on-roi/",
      "slug": "industry-20260827-e4b83c36c092",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-8ae7e40aa3011710.png","alt":"Agentic AI Study: Preparation Beats Speed for ROI"},
    },
    {
      "date": "8/27 05:05",
      "platform": "Web",
      "title": "Salesforce·Anthropic, Claudeforce 협력 발표",
      "summary": "Salesforce와 Anthropic은 Claude에서 Salesforce 데이터와 업무를 활용하는 Claudeforce 협력을 발표했습니다. 초기 구성에는 영업용 사전 제작 스킬 37개를 포함한 플러그인이 소개됩니다.",
      "content": "Salesforce와 Anthropic은 Claude에서 Salesforce 데이터와 업무를 활용하는 Claudeforce 협력을 발표했습니다. 초기 구성에는 영업용 사전 제작 스킬 37개를 포함한 플러그인이 소개됩니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Salesforce and Anthropic announce Claudeforce",
        "summary": "Salesforce and Anthropic announced Claudeforce, connecting Claude to Salesforce data and business workflows. The initial offering includes a plugin with 37 prebuilt sales skills.",
        "content": "Salesforce and Anthropic announced Claudeforce, connecting Claude to Salesforce data and business workflows. The initial offering includes a plugin with 37 prebuilt sales skills.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "Salesforce",
        "2026-w35"
      ],
      "officialUrl": "https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/",
      "slug": "industry-20260826-a854bd9a6958",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-0140ac0a1e23b2d5.png","alt":"Salesforce and Anthropic Announce Claudeforce"},
    }
  ]
},
{
  "name": "AWS",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/29 04:31",
      "platform": "Web",
      "title": "AWS, SageMaker Feature Store 일괄 기록·검색 안내",
      "summary": "AWS가 SageMaker Feature Store 일괄 기록·검색 안내 내용을 공식 블로그에 공개했습니다. 기술 구현 안내·분석이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.",
      "content": "**자료 유형: 기술 구현 안내·분석**\n\nAWS가 SageMaker Feature Store 일괄 기록·검색 안내 내용을 공식 블로그에 공개했습니다. 기술 구현 안내·분석이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Batch write and discover records in Amazon SageMaker Feature Store",
        "summary": "AWS published a technical guide or analysis: Batch write and discover records in Amazon SageMaker Feature Store. This article is not a separate model launch or an independently reproduced benchmark.",
        "content": "**Article type: Technical implementation guide / analysis**\n\nAWS published a technical guide or analysis: Batch write and discover records in Amazon SageMaker Feature Store. This article is not a separate model launch or an independently reproduced benchmark.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://aws.amazon.com/blogs/machine-learning/batch-write-and-discover-records-in-amazon-sagemaker-feature-store/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "AWS",
        "2026-w35"
      ],
      "officialUrl": "https://aws.amazon.com/blogs/machine-learning/batch-write-and-discover-records-in-amazon-sagemaker-feature-store/",
      "slug": "industry-20260828-462587977a0c",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-a3c9722a85987756.png","alt":"AWS, SageMaker Feature Store 일괄 기록·검색 안내 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/29 01:22",
      "platform": "Web",
      "title": "AWS, Decathlon의 Chronos-2 수요 예측 운영 사례",
      "summary": "AWS가 Decathlon의 Chronos-2 수요 예측 운영 사례 내용을 공식 블로그에 공개했습니다. 구현·활용 사례이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.",
      "content": "**자료 유형: 구현·활용 사례**\n\nAWS가 Decathlon의 Chronos-2 수요 예측 운영 사례 내용을 공식 블로그에 공개했습니다. 구현·활용 사례이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "How Decathlon runs demand forecasting at scale with Chronos-2",
        "summary": "AWS published a customer implementation case study: How Decathlon runs demand forecasting at scale with Chronos-2. This article is not a separate model launch or an independently reproduced benchmark.",
        "content": "**Article type: Implementation case study**\n\nAWS published a customer implementation case study: How Decathlon runs demand forecasting at scale with Chronos-2. This article is not a separate model launch or an independently reproduced benchmark.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://aws.amazon.com/blogs/machine-learning/how-decathlon-runs-demand-forecasting-at-scale-with-chronos-2/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "AWS",
        "2026-w35"
      ],
      "officialUrl": "https://aws.amazon.com/blogs/machine-learning/how-decathlon-runs-demand-forecasting-at-scale-with-chronos-2/",
      "slug": "industry-20260828-abf29937c8a3",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-ea803b9ee6deab91.png","alt":"Decathlon’s forecasting pipeline on AWS: data prep, AutoGluon fine-tuning, MLflow model registry, and weekly batch inference"},
    },
    {
      "date": "8/29 01:20",
      "platform": "Web",
      "title": "AWS, Salesforce의 SageMaker 다중 가용영역 추론 구성",
      "summary": "AWS가 Salesforce의 SageMaker 다중 가용영역 추론 구성 내용을 공식 블로그에 공개했습니다. 구현·활용 사례이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.",
      "content": "**자료 유형: 구현·활용 사례**\n\nAWS가 Salesforce의 SageMaker 다중 가용영역 추론 구성 내용을 공식 블로그에 공개했습니다. 구현·활용 사례이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Spreading the load: How Salesforce met Multi-AZ HA with SageMaker Inference Components",
        "summary": "AWS published a customer implementation case study: Spreading the load: How Salesforce met Multi-AZ HA with SageMaker Inference Components. This article is not a separate model launch or an independently reproduced benchmark.",
        "content": "**Article type: Implementation case study**\n\nAWS published a customer implementation case study: Spreading the load: How Salesforce met Multi-AZ HA with SageMaker Inference Components. This article is not a separate model launch or an independently reproduced benchmark.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://aws.amazon.com/blogs/machine-learning/spreading-the-load-how-salesforce-met-multi-az-ha-with-sagemaker-inference-components/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "AWS",
        "2026-w35"
      ],
      "officialUrl": "https://aws.amazon.com/blogs/machine-learning/spreading-the-load-how-salesforce-met-multi-az-ha-with-sagemaker-inference-components/",
      "slug": "industry-20260828-8340f6975f66",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-1484132ab400f439.png","alt":"Default IC placement concentrating model copies in fewer Availability Zones compared to SchedulingConfig placement spreading copies evenly across two Availability Zones"},
    },
    {
      "date": "8/28 08:04",
      "platform": "Web",
      "title": "AWS, Amazon Quick·fal로 에이전트 창작 흐름 구성",
      "summary": "AWS가 Amazon Quick·fal로 에이전트 창작 흐름 구성 내용을 공식 블로그에 공개했습니다. 기술 구현 안내·분석이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.",
      "content": "**자료 유형: 기술 구현 안내·분석**\n\nAWS가 Amazon Quick·fal로 에이전트 창작 흐름 구성 내용을 공식 블로그에 공개했습니다. 기술 구현 안내·분석이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Build agentic creative workflows with Amazon Quick and fal",
        "summary": "AWS published a technical guide or analysis: Build agentic creative workflows with Amazon Quick and fal. This article is not a separate model launch or an independently reproduced benchmark.",
        "content": "**Article type: Technical implementation guide / analysis**\n\nAWS published a technical guide or analysis: Build agentic creative workflows with Amazon Quick and fal. This article is not a separate model launch or an independently reproduced benchmark.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://aws.amazon.com/blogs/machine-learning/build-agentic-creative-workflows-with-amazon-quick-and-fal/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "AWS",
        "2026-w35"
      ],
      "officialUrl": "https://aws.amazon.com/blogs/machine-learning/build-agentic-creative-workflows-with-amazon-quick-and-fal/",
      "slug": "industry-20260827-51b21a22e7ac",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-7b6a04d9ab01084f.png","alt":"Architecture diagram of Amazon Quick as MCP client connecting through MCP to the fal.ai MCP server and generation models"},
    },
    {
      "date": "8/28 03:36",
      "platform": "Web",
      "title": "AWS, 인도 Bedrock에서 OpenAI 모델의 국내 추론 지원",
      "summary": "AWS가 인도 Bedrock에서 OpenAI 모델의 국내 추론 지원 내용을 공식 블로그에 공개했습니다. 제품·지역별 제공 소식이며 실제 사용 조건은 공식 문서에서 확인해야 합니다.",
      "content": "AWS가 인도 Bedrock에서 OpenAI 모델의 국내 추론 지원 내용을 공식 블로그에 공개했습니다. 제품·지역별 제공 소식이며 실제 사용 조건은 공식 문서에서 확인해야 합니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Introducing OpenAI models on Amazon Bedrock for in-country inferencing in India",
        "summary": "AWS published an official article on introducing OpenAI models on Amazon Bedrock for in-country inferencing in India. This is a product or regional availability update; official service conditions apply.",
        "content": "AWS published an official article on introducing OpenAI models on Amazon Bedrock for in-country inferencing in India. This is a product or regional availability update; official service conditions apply.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://aws.amazon.com/blogs/machine-learning/introducing-openai-models-on-amazon-bedrock-for-in-country-inferencing-in-india/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "AWS",
        "2026-w35"
      ],
      "officialUrl": "https://aws.amazon.com/blogs/machine-learning/introducing-openai-models-on-amazon-bedrock-for-in-country-inferencing-in-india/",
      "slug": "industry-20260827-da560584139b",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-b35d4ed4faf2f81c.png","alt":"Selecting the OpenAI GPT-5.6 Terra model from the Amazon Bedrock Playground console"},
    },
    {
      "date": "8/27 01:36",
      "platform": "Web",
      "title": "AWS, Natera의 AgentCore 채혈 방문 예약 사례",
      "summary": "AWS가 Natera의 AgentCore 채혈 방문 예약 사례 내용을 공식 블로그에 공개했습니다. 구현·활용 사례이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.",
      "content": "**자료 유형: 구현·활용 사례**\n\nAWS가 Natera의 AgentCore 채혈 방문 예약 사례 내용을 공식 블로그에 공개했습니다. 구현·활용 사례이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Natera’s intelligent appointment scheduling with Amazon Bedrock AgentCore",
        "summary": "AWS published a customer implementation case study: Natera’s intelligent appointment scheduling with Amazon Bedrock AgentCore. This article is not a separate model launch or an independently reproduced benchmark.",
        "content": "**Article type: Implementation case study**\n\nAWS published a customer implementation case study: Natera’s intelligent appointment scheduling with Amazon Bedrock AgentCore. This article is not a separate model launch or an independently reproduced benchmark.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://aws.amazon.com/blogs/machine-learning/nateras-intelligent-appointment-scheduling-with-amazon-bedrock-agentcore/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "AWS",
        "2026-w35"
      ],
      "officialUrl": "https://aws.amazon.com/blogs/machine-learning/nateras-intelligent-appointment-scheduling-with-amazon-bedrock-agentcore/",
      "slug": "industry-20260826-8a95f0b4c85e",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-713c17492903870f.png","alt":"Natera’s voice scheduling agent architecture showing Twilio, AgentCore runtime, OpenAI Realtime API, AgentCore memory, Knowledge Bases, and an Amazon MSK pipeline"},
    },
    {
      "date": "8/27 01:31",
      "platform": "Web",
      "title": "AWS, SageMaker SDK v3 스크립트 모드로 자체 모델 실행",
      "summary": "AWS가 SageMaker SDK v3 스크립트 모드로 자체 모델 실행 내용을 공식 블로그에 공개했습니다. 기술 구현 안내·분석이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.",
      "content": "**자료 유형: 기술 구현 안내·분석**\n\nAWS가 SageMaker SDK v3 스크립트 모드로 자체 모델 실행 내용을 공식 블로그에 공개했습니다. 기술 구현 안내·분석이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Bring your own model with Amazon SageMaker AI: Script mode in SDK v3",
        "summary": "AWS published a technical guide or analysis: Bring your own model with Amazon SageMaker AI: Script mode in SDK v3. This article is not a separate model launch or an independently reproduced benchmark.",
        "content": "**Article type: Technical implementation guide / analysis**\n\nAWS published a technical guide or analysis: Bring your own model with Amazon SageMaker AI: Script mode in SDK v3. This article is not a separate model launch or an independently reproduced benchmark.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://aws.amazon.com/blogs/machine-learning/bring-your-own-model-with-amazon-sagemaker-ai-script-mode-in-sdk-v3/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "AWS",
        "2026-w35"
      ],
      "officialUrl": "https://aws.amazon.com/blogs/machine-learning/bring-your-own-model-with-amazon-sagemaker-ai-script-mode-in-sdk-v3/",
      "slug": "industry-20260826-103bf835dabf",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-fa7e4d8446ca6d13.png","alt":"AWS, SageMaker SDK v3 스크립트 모드로 자체 모델 실행 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/27 01:24",
      "platform": "Web",
      "title": "AWS, 지도 미세조정용 데이터 준비: 형식·품질",
      "summary": "AWS가 지도 미세조정용 데이터 준비: 형식·품질 내용을 공식 블로그에 공개했습니다. 기술 구현 안내·분석이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.",
      "content": "**자료 유형: 기술 구현 안내·분석**\n\nAWS가 지도 미세조정용 데이터 준비: 형식·품질 내용을 공식 블로그에 공개했습니다. 기술 구현 안내·분석이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Preparing data for supervised fine-tuning Part 1: Formatting and quality",
        "summary": "AWS published a technical guide or analysis: Preparing data for supervised fine-tuning Part 1: Formatting and quality. This article is not a separate model launch or an independently reproduced benchmark.",
        "content": "**Article type: Technical implementation guide / analysis**\n\nAWS published a technical guide or analysis: Preparing data for supervised fine-tuning Part 1: Formatting and quality. This article is not a separate model launch or an independently reproduced benchmark.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://aws.amazon.com/blogs/machine-learning/preparing-data-for-supervised-fine-tuning-part-1-formatting-and-quality/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "AWS",
        "2026-w35"
      ],
      "backupUrls": [
        {
          "label": "Preparing data for supervised fine-tuning Part 2: Advanced data strategies",
          "url": "https://aws.amazon.com/blogs/machine-learning/preparing-data-for-supervised-fine-tuning-part-2-advanced-data-strategies/"
        }
      ],
      "officialUrl": "https://aws.amazon.com/blogs/machine-learning/preparing-data-for-supervised-fine-tuning-part-1-formatting-and-quality/",
      "slug": "industry-20260826-b5beb49fb5fe",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-558e1b2c3f716e6e.png","alt":"AWS, 지도 미세조정용 데이터 준비: 형식·품질 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/27 00:48",
      "platform": "Web",
      "title": "AWS, AgentCore와 다른 AWS 계정의 지식베이스 연결",
      "summary": "AWS가 AgentCore와 다른 AWS 계정의 지식베이스 연결 내용을 공식 블로그에 공개했습니다. 기술 구현 안내·분석이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.",
      "content": "**자료 유형: 기술 구현 안내·분석**\n\nAWS가 AgentCore와 다른 AWS 계정의 지식베이스 연결 내용을 공식 블로그에 공개했습니다. 기술 구현 안내·분석이며, 별도 신모델 출시나 독립 성능 검증으로 해석하면 안 됩니다.\n\n날짜 안내: 공식 게시 시각을 한국시간으로 환산했습니다. 기사 게시 시각이며 실제 기능 활성화 시각과는 다를 수 있습니다.",
      "en": {
        "title": "Connect Amazon Bedrock AgentCore to cross-account knowledge bases",
        "summary": "AWS published a technical guide or analysis: Connect Amazon Bedrock AgentCore to cross-account knowledge bases. This article is not a separate model launch or an independently reproduced benchmark.",
        "content": "**Article type: Technical implementation guide / analysis**\n\nAWS published a technical guide or analysis: Connect Amazon Bedrock AgentCore to cross-account knowledge bases. This article is not a separate model launch or an independently reproduced benchmark.\n\nDate disclosure: the official publication timestamp is converted to Korea time. It records article publication, not necessarily feature activation."
      },
      "source": "https://aws.amazon.com/blogs/machine-learning/connect-amazon-bedrock-agentcore-to-cross-account-knowledge-bases/",
      "verifiedAt": "2026-09-09",
      "tags": [
        "AI",
        "AWS",
        "2026-w35"
      ],
      "officialUrl": "https://aws.amazon.com/blogs/machine-learning/connect-amazon-bedrock-agentcore-to-cross-account-knowledge-bases/",
      "slug": "industry-20260826-74c1b9d6eb3c",
      thumbnail: {"src":"/source-media/weekly-20260909/recent-bdba8e2906c883ba.png","alt":"Two AgentCore orchestration paths share a cross-account Knowledge Base access role: a code-based Strands agent on AgentCore runtime and a declarative AgentCore harness using AgentCore Gateway and AWS Lambda."},
    }
  ]
},
{
  "name": "Cursor",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/27",
      "platform": "Web",
      "title": "Cursor Cloud Agents, 저장소 없이 새 작업 시작",
      "deck": "Cursor가 GitHub 등 외부 코드 저장소를 연결하지 않고도 Cloud Agents 작업을 시작하도록 바꿨습니다.",
      "summary": "Cursor가 GitHub 등 외부 코드 저장소를 연결하지 않고도 Cloud Agents 작업을 시작하도록 바꿨습니다. 요청을 입력하면 백그라운드에서 Origin 저장소를 준비하며, 결과가 마음에 들면 이름과 공개 범위를 지정해 저장할 수 있습니다.",
      "content": "Cursor가 GitHub 등 외부 코드 저장소를 연결하지 않고도 Cloud Agents 작업을 시작하도록 바꿨습니다. 요청을 입력하면 백그라운드에서 Origin 저장소를 준비하며, 결과가 마음에 들면 이름과 공개 범위를 지정해 저장할 수 있습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://cursor.com/changelog/start-from-scratch",
      "officialUrl": "https://cursor.com/changelog/start-from-scratch",
      "verifiedAt": "2026-09-09",
      "slug": "start-from-scratch",
      "tags": [
        "AI",
        "2026-w35",
        "Cursor",
        "개발 도구"
      ],
      "en": {
        "title": "Cursor Cloud Agents can start without a repository",
        "deck": "Cursor Cloud Agents no longer require a connected GitHub or other third-party source-control provider to start.",
        "summary": "Cursor Cloud Agents can start without a connected external source-control provider. Cursor prepares an Origin repository in the background, and users can save the result with a chosen name and visibility.",
        "content": "Cursor Cloud Agents can start without a connected external source-control provider. Cursor prepares an Origin repository in the background, and users can save the result with a chosen name and visibility.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-13d1b5dab0dfabb7.png","alt":"Start from scratch in the repo picker"},
    }
  ]
},
{
  "name": "LM Studio",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/27",
      "platform": "Web",
      "title": "Bionic Auto Review, 명령 분석과 별도 검토자로 실행 승인",
      "deck": "LM Studio가 Bionic의 Auto Review 명령 승인 방식을 공개했습니다.",
      "summary": "LM Studio가 Bionic의 Auto Review 명령 승인 방식을 공개했습니다. Shell Judge가 명령 구조·기능·허용 규칙을 분석하고 확정하지 못한 명령은 별도 Shell Reviewer가 위험도와 사용자 승인을 분류합니다. 판단이 부족하면 사람에게 넘기며 악성 실행 파일이나 설정까지 방어하는 보안 보장은 아닙니다.",
      "content": "LM Studio가 Bionic의 Auto Review 명령 승인 방식을 공개했습니다. Shell Judge가 명령 구조·기능·허용 규칙을 분석하고 확정하지 못한 명령은 별도 Shell Reviewer가 위험도와 사용자 승인을 분류합니다. 판단이 부족하면 사람에게 넘기며 악성 실행 파일이나 설정까지 방어하는 보안 보장은 아닙니다.\n\n원문에 표시된 게시 날짜를 유지했으며 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://lmstudio.ai/blog/how-auto-review-works",
      "officialUrl": "https://lmstudio.ai/blog/how-auto-review-works",
      "verifiedAt": "2026-09-09",
      "slug": "how-auto-review-works",
      "tags": [
        "AI",
        "2026-w35",
        "LM Studio",
        "개발 도구"
      ],
      "en": {
        "title": "Bionic Auto Review combines deterministic analysis with a reviewer",
        "deck": "LM Studio introduced Auto Review for Bionic.",
        "summary": "LM Studio introduced Auto Review for Bionic. Shell Judge analyzes command syntax, capabilities, and allowed rules; unresolved commands go to a separate Shell Reviewer that classifies risk and user authorization. Unresolved approvals fall back to the user. It is not a guarantee against hostile binaries or malicious tool configuration.",
        "content": "LM Studio introduced Auto Review for Bionic. Shell Judge analyzes command syntax, capabilities, and allowed rules; unresolved commands go to a separate Shell Reviewer that classifies risk and user authorization. Unresolved approvals fall back to the user. It is not a guarantee against hostile binaries or malicious tool configuration.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-4ac7e252dc52d087.png","alt":"Auto Review selected in Bionic's command approval menu"},
    }
  ]
},
{
  "name": "Replit",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/27 07:18",
      "platform": "Web",
      "title": "Replit, 작업별 모델 자동 선택…유료 전환은 알림 제공",
      "deck": "Replit이 작업별로 품질·속도·비용을 고려해 모델을 자동 선택하는 Intelligent Model Routing을 전체 사용자에게 제공했습니다.",
      "summary": "Replit이 작업별로 품질·속도·비용을 고려해 모델을 자동 선택하는 Intelligent Model Routing을 전체 사용자에게 제공했습니다. 무료 모드에서 유료 사용이 발생할 수 있는 모드로 올라갈 때 알리고 무료 모드 유지를 선택할 수 있습니다. 기존 Max Mode 대비 같은 품질에서 비용 65% 감소는 Replit 자체 테스트 결과입니다.",
      "content": "Replit이 작업별로 품질·속도·비용을 고려해 모델을 자동 선택하는 Intelligent Model Routing을 전체 사용자에게 제공했습니다. 무료 모드에서 유료 사용이 발생할 수 있는 모드로 올라갈 때 알리고 무료 모드 유지를 선택할 수 있습니다. 기존 Max Mode 대비 같은 품질에서 비용 65% 감소는 Replit 자체 테스트 결과입니다.\n\n원문의 게시 시각을 한국시간으로 변환했습니다.",
      "source": "https://replit.com/blog/intelligent-model-routing",
      "officialUrl": "https://replit.com/blog/intelligent-model-routing",
      "verifiedAt": "2026-09-09",
      "slug": "intelligent-model-routing",
      "tags": [
        "AI",
        "2026-w35",
        "Replit",
        "개발 도구"
      ],
      "en": {
        "title": "Replit introduces task-aware Intelligent Model Routing",
        "deck": "Replit made Intelligent Model Routing available to everyone, matching tasks to models for quality, speed, and cost.",
        "summary": "Replit made Intelligent Model Routing available to everyone, matching tasks to models for quality, speed, and cost. Users are notified before escalation from Free Mode to modes that can incur usage costs and can stay in Free Mode. The claimed 65% cost reduction at the same output quality versus the previous Max Mode comes from Replit testing.",
        "content": "Replit made Intelligent Model Routing available to everyone, matching tasks to models for quality, speed, and cost. Users are notified before escalation from Free Mode to modes that can incur usage costs and can stay in Free Mode. The claimed 65% cost reduction at the same output quality versus the previous Max Mode comes from Replit testing.\n\nPublication time is converted to KST."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-10a9ce61faddc3a7.png","alt":"Intelligent Model Routing on Replit — cover image"},
    }
  ]
},
{
  "name": "Vercel",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/28",
      "platform": "Web",
      "title": "Vercel 대시보드에서 eve 에이전트 생성·배포",
      "deck": "Vercel 대시보드에서 eve 에이전트를 만들면 비공개 Git 저장소와 새 Vercel 프로젝트가 생성됩니다.",
      "summary": "Vercel 대시보드에서 eve 에이전트를 만들면 비공개 Git 저장소와 새 Vercel 프로젝트가 생성됩니다. AI Gateway 모델을 선택하고 웹 채팅·Slack 채널 및 외부 서비스·MCP 도구를 연결할 수 있습니다.",
      "content": "Vercel 대시보드에서 eve 에이전트를 만들면 비공개 Git 저장소와 새 Vercel 프로젝트가 생성됩니다. AI Gateway 모델을 선택하고 웹 채팅·Slack 채널 및 외부 서비스·MCP 도구를 연결할 수 있습니다.\n\n원문에 표시된 게시 날짜를 유지했으며 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/build-and-deploy-eve-agents-from-the-vercel-dashboard",
      "officialUrl": "https://vercel.com/changelog/build-and-deploy-eve-agents-from-the-vercel-dashboard",
      "verifiedAt": "2026-09-09",
      "slug": "build-and-deploy-eve-agents-from-the-vercel-dashboard",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel",
        "개발 도구"
      ],
      "en": {
        "title": "Build and deploy eve agents from the Vercel dashboard",
        "deck": "The Vercel dashboard can scaffold an eve agent into a private Git repository and deploy a new Vercel project.",
        "summary": "The Vercel dashboard can scaffold an eve agent into a private Git repository and deploy a new Vercel project. Users can choose AI Gateway models, add web chat or Slack, and connect external services or MCP tools.",
        "content": "The Vercel dashboard can scaffold an eve agent into a private Git repository and deploy a new Vercel project. Users can choose AI Gateway models, add web chat or Slack, and connect external services or MCP tools.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-cd9db5f6a6685f53.png","alt":"Vercel 대시보드에서 eve 에이전트 생성·배포 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/27 23:47",
      "platform": "Web",
      "title": "Vercel AI SDK, Cursor를 공통 에이전트 인터페이스로 연결",
      "deck": "Vercel이 공식 @ai-sdk/harness-cursor 연결 모듈을 공개했습니다.",
      "summary": "Vercel이 공식 @ai-sdk/harness-cursor 연결 모듈을 공개했습니다. ACP로 Cursor에 연결하고 HarnessAgent를 사용하므로 애플리케이션의 공통 실행 인터페이스를 유지하면서 코딩 에이전트를 바꿀 수 있습니다.",
      "content": "Vercel이 공식 @ai-sdk/harness-cursor 연결 모듈을 공개했습니다. ACP로 Cursor에 연결하고 HarnessAgent를 사용하므로 애플리케이션의 공통 실행 인터페이스를 유지하면서 코딩 에이전트를 바꿀 수 있습니다.\n\n원문의 게시 시각을 한국시간으로 변환했습니다.",
      "source": "https://vercel.com/changelog/cursor-ai-sdk-harness-adapter",
      "officialUrl": "https://vercel.com/changelog/cursor-ai-sdk-harness-adapter",
      "verifiedAt": "2026-09-09",
      "slug": "cursor-ai-sdk-harness-adapter",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel",
        "개발 도구"
      ],
      "en": {
        "title": "Vercel AI SDK adds a Cursor harness adapter",
        "deck": "Vercel introduced the official @ai-sdk/harness-cursor adapter.",
        "summary": "Vercel introduced the official @ai-sdk/harness-cursor adapter. It connects to Cursor over ACP through HarnessAgent, allowing applications to retain a common execution interface when switching coding agents.",
        "content": "Vercel introduced the official @ai-sdk/harness-cursor adapter. It connects to Cursor over ACP through HarnessAgent, allowing applications to retain a common execution interface when switching coding agents.\n\nPublication time is converted to KST."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-c93cc4f914bde20b.jpg","alt":"Vercel AI SDK, Cursor를 공통 에이전트 인터페이스로 연결 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/26",
      "platform": "Web",
      "title": "Vercel Security Dashboard, 전체 요금제에 정식 제공",
      "deck": "Vercel이 모든 요금제에 Security Dashboard를 정식 제공했습니다.",
      "summary": "Vercel이 모든 요금제에 Security Dashboard를 정식 제공했습니다. 2단계 인증 미설정·장기 자격증명·공개 미리보기 등 설정 문제를 모아 보여주고 vercel security check로 같은 검사를 실행할 수 있습니다. 자동 수정 완료나 모든 취약점 탐지를 보장하는 발표는 아닙니다.",
      "content": "Vercel이 모든 요금제에 Security Dashboard를 정식 제공했습니다. 2단계 인증 미설정·장기 자격증명·공개 미리보기 등 설정 문제를 모아 보여주고 vercel security check로 같은 검사를 실행할 수 있습니다. 자동 수정 완료나 모든 취약점 탐지를 보장하는 발표는 아닙니다.\n\n원문에 표시된 게시 날짜를 유지했으며 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/vercel-security-dashboard-is-now-generally-available",
      "officialUrl": "https://vercel.com/changelog/vercel-security-dashboard-is-now-generally-available",
      "verifiedAt": "2026-09-09",
      "slug": "vercel-security-dashboard-is-now-generally-available",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel",
        "개발 도구"
      ],
      "en": {
        "title": "Vercel Security Dashboard becomes generally available on all plans",
        "deck": "Vercel made Security Dashboard generally available on all plans.",
        "summary": "Vercel made Security Dashboard generally available on all plans. It flags configuration issues such as missing 2FA, long-lived credentials, and public previews, with equivalent checks through vercel security check. The announcement does not guarantee automatic remediation or detection of every vulnerability.",
        "content": "Vercel made Security Dashboard generally available on all plans. It flags configuration issues such as missing 2FA, long-lived credentials, and public previews, with equivalent checks through vercel security check. The announcement does not guarantee automatic remediation or detection of every vulnerability.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/reviewed-recent-084-4813af83c77a.avif","alt":"See a complete list of security misconfigurations in your terminal."},
    },
    {
      "date": "8/26",
      "platform": "Web",
      "title": "Vercel Python 앱, 재배포 없이 경로 규칙 변경",
      "deck": "Vercel에서 FastAPI·Django·Flask 앱에 응답 헤더와 경로 재작성 규칙을 설정할 수 있습니다.",
      "summary": "Vercel에서 FastAPI·Django·Flask 앱에 응답 헤더와 경로 재작성 규칙을 설정할 수 있습니다. CDN이 앱보다 먼저 규칙을 처리해 새 배포 없이 적용하며 대시보드·CLI·Python SDK로 관리할 수 있습니다.",
      "content": "Vercel에서 FastAPI·Django·Flask 앱에 응답 헤더와 경로 재작성 규칙을 설정할 수 있습니다. CDN이 앱보다 먼저 규칙을 처리해 새 배포 없이 적용하며 대시보드·CLI·Python SDK로 관리할 수 있습니다.\n\n원문에 표시된 게시 날짜를 유지했으며 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/python-projects-now-support-routing-rules",
      "officialUrl": "https://vercel.com/changelog/python-projects-now-support-routing-rules",
      "verifiedAt": "2026-09-09",
      "slug": "python-projects-now-support-routing-rules",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel",
        "개발 도구"
      ],
      "en": {
        "title": "Vercel Python projects gain deployment-independent routing rules",
        "deck": "Vercel now supports response-header and rewrite rules for FastAPI, Django, and Flask applications.",
        "summary": "Vercel now supports response-header and rewrite rules for FastAPI, Django, and Flask applications. Rules are evaluated at the CDN before the application, apply without a new deployment, and can be managed through the dashboard, CLI, or Python SDK.",
        "content": "Vercel now supports response-header and rewrite rules for FastAPI, Django, and Flask applications. Rules are evaluated at the CDN before the application, apply without a new deployment, and can be managed through the dashboard, CLI, or Python SDK.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-4a02737544ef778d.jpg","alt":"Vercel Python 앱, 재배포 없이 경로 규칙 변경 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/28",
      "platform": "Web",
      "title": "Vercel AI Gateway, Hy4 Preview 제공",
      "deck": "Vercel AI Gateway, Hy4 Preview 제공",
      "summary": "Vercel이 Tencent 모델을 tencent/hy4-preview ID로 호출할 수 있습니다. Vercel은 긴 코딩·문서 분석 작업용 100만 토큰 맥락 모델로 소개하며, 이 글은 Gateway 제공 경로 추가를 다룹니다.",
      "content": "Vercel이 Tencent 모델을 tencent/hy4-preview ID로 호출할 수 있습니다. Vercel은 긴 코딩·문서 분석 작업용 100만 토큰 맥락 모델로 소개하며, 이 글은 Gateway 제공 경로 추가를 다룹니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/hy4-preview-now-available-on-ai-gateway",
      "officialUrl": "https://vercel.com/changelog/hy4-preview-now-available-on-ai-gateway",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-7b1050b0cae2",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel"
      ],
      "en": {
        "title": "Hy4 Preview becomes available through Vercel AI Gateway",
        "deck": "Hy4 Preview becomes available through Vercel AI Gateway",
        "summary": "Vercel announced this model integration. Tencent’s model can be called as tencent/hy4-preview. Vercel describes a one-million-token context model for long coding and document tasks; this article establishes Gateway availability.",
        "content": "Vercel announced this model integration. Tencent’s model can be called as tencent/hy4-preview. Vercel describes a one-million-token context model for long coding and document tasks; this article establishes Gateway availability.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-7b1050b0cae2ec45.png","alt":"Vercel AI Gateway, Hy4 Preview 제공 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/27",
      "platform": "Web",
      "title": "Vercel AI Gateway, Ling 3.0 Flash Fin 제공",
      "deck": "Vercel AI Gateway, Ling 3.0 Flash Fin 제공",
      "summary": "Vercel이 금융 특화 모델을 9월 25일까지 무료 제공합니다. 일반 ID는 이후 과금되며 -free ID는 서비스가 중단되어 무료 기간 이후 비용 발생을 막는 선택지입니다.",
      "content": "Vercel이 금융 특화 모델을 9월 25일까지 무료 제공합니다. 일반 ID는 이후 과금되며 -free ID는 서비스가 중단되어 무료 기간 이후 비용 발생을 막는 선택지입니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/ling-3-0-flash-fin-now-available-on-ai-gateway-for-free",
      "officialUrl": "https://vercel.com/changelog/ling-3-0-flash-fin-now-available-on-ai-gateway-for-free",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-beb7bf914eac",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel"
      ],
      "en": {
        "title": "Ling 3.0 Flash Fin becomes available through Vercel AI Gateway",
        "deck": "Ling 3.0 Flash Fin becomes available through Vercel AI Gateway",
        "summary": "Vercel announced this model integration. The finance-focused model is free through September 25. The standard ID bills afterward, while the -free ID stops serving to prevent post-promotion charges.",
        "content": "Vercel announced this model integration. The finance-focused model is free through September 25. The standard ID bills afterward, while the -free ID stops serving to prevent post-promotion charges.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-beb7bf914eac130f.png","alt":"Vercel AI Gateway, Ling 3.0 Flash Fin 제공 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/26",
      "platform": "Web",
      "title": "Vercel AI Gateway, Muse Image 제공",
      "deck": "Vercel AI Gateway, Muse Image 제공",
      "summary": "Vercel이 meta/muse-image-1.0으로 텍스트 기반 이미지 생성과 기존 이미지 편집을 지원합니다. 이번 글은 Meta의 최초 모델 발표가 아니라 Vercel에서 이용하는 연결 경로 소식입니다.",
      "content": "Vercel이 meta/muse-image-1.0으로 텍스트 기반 이미지 생성과 기존 이미지 편집을 지원합니다. 이번 글은 Meta의 최초 모델 발표가 아니라 Vercel에서 이용하는 연결 경로 소식입니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/muse-image-now-available-on-ai-gateway",
      "officialUrl": "https://vercel.com/changelog/muse-image-now-available-on-ai-gateway",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-19b96229beaa",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel"
      ],
      "en": {
        "title": "Muse Image becomes available through Vercel AI Gateway",
        "deck": "Muse Image becomes available through Vercel AI Gateway",
        "summary": "Vercel announced this model integration. The meta/muse-image-1.0 ID supports text-to-image generation and editing existing images. This is Vercel distribution availability, not Meta’s original model launch.",
        "content": "Vercel announced this model integration. The meta/muse-image-1.0 ID supports text-to-image generation and editing existing images. This is Vercel distribution availability, not Meta’s original model launch.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-19b96229beaa9474.png","alt":"Vercel AI Gateway, Muse Image 제공 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/26",
      "platform": "Web",
      "title": "Vercel AI Gateway, Gemini 3.5 Transcribe 제공",
      "deck": "Vercel AI Gateway, Gemini 3.5 Transcribe 제공",
      "summary": "Vercel이 녹음 파일 전사와 WebSocket 실시간 전사용 모델 ID를 각각 제공합니다. 원문은 85개 이상 언어 자동 감지와 사용자 사전, 녹음 파일의 화자·단어 시각 지원을 설명합니다.",
      "content": "Vercel이 녹음 파일 전사와 WebSocket 실시간 전사용 모델 ID를 각각 제공합니다. 원문은 85개 이상 언어 자동 감지와 사용자 사전, 녹음 파일의 화자·단어 시각 지원을 설명합니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/gemini-3-5-transcribe-now-available-on-ai-gateway",
      "officialUrl": "https://vercel.com/changelog/gemini-3-5-transcribe-now-available-on-ai-gateway",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-86369e6f08c3",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel"
      ],
      "en": {
        "title": "Gemini 3.5 Transcribe becomes available through Vercel AI Gateway",
        "deck": "Gemini 3.5 Transcribe becomes available through Vercel AI Gateway",
        "summary": "Vercel announced this model integration. Separate model IDs support file transcription and live transcription over WebSocket. The article describes automatic detection of over 85 languages, custom vocabulary, and speaker and word timestamps for recordings.",
        "content": "Vercel announced this model integration. Separate model IDs support file transcription and live transcription over WebSocket. The article describes automatic detection of over 85 languages, custom vocabulary, and speaker and word timestamps for recordings.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-86369e6f08c39265.png","alt":"Vercel AI Gateway, Gemini 3.5 Transcribe 제공 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/26",
      "platform": "Web",
      "title": "Vercel AI Gateway, Qwen 3.8 Flash 제공",
      "deck": "Vercel AI Gateway, Qwen 3.8 Flash 제공",
      "summary": "Vercel이 alibaba/qwen3.8-flash ID로 텍스트·이미지 입력과 100만 토큰 맥락 모델을 제공합니다. Alibaba의 모델 출시와 구분되는 Vercel 제공 경로 추가입니다.",
      "content": "Vercel이 alibaba/qwen3.8-flash ID로 텍스트·이미지 입력과 100만 토큰 맥락 모델을 제공합니다. Alibaba의 모델 출시와 구분되는 Vercel 제공 경로 추가입니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/qwen-3-8-flash-now-available-on-ai-gateway",
      "officialUrl": "https://vercel.com/changelog/qwen-3-8-flash-now-available-on-ai-gateway",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-acbf0aed19df",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel"
      ],
      "en": {
        "title": "Qwen 3.8 Flash becomes available through Vercel AI Gateway",
        "deck": "Qwen 3.8 Flash becomes available through Vercel AI Gateway",
        "summary": "Vercel announced this model integration. The alibaba/qwen3.8-flash ID exposes text and image input with a one-million-token context window. This is Vercel distribution availability, distinct from Alibaba’s model launch.",
        "content": "Vercel announced this model integration. The alibaba/qwen3.8-flash ID exposes text and image input with a one-million-token context window. This is Vercel distribution availability, distinct from Alibaba’s model launch.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-acbf0aed19dfbc04.png","alt":"Vercel AI Gateway, Qwen 3.8 Flash 제공 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/26",
      "platform": "Web",
      "title": "Vercel AI Gateway, GLM 5.3 Flash 제공",
      "deck": "Vercel AI Gateway, GLM 5.3 Flash 제공",
      "summary": "Vercel이 zai/glm-5.3-flash ID로 텍스트·이미지 입력을 받는 코딩 모델을 제공합니다. 원문은 함수 호출·구조화 출력·스트리밍과 100만 토큰 맥락을 설명합니다.",
      "content": "Vercel이 zai/glm-5.3-flash ID로 텍스트·이미지 입력을 받는 코딩 모델을 제공합니다. 원문은 함수 호출·구조화 출력·스트리밍과 100만 토큰 맥락을 설명합니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/glm-5-3-flash-now-available-on-ai-gateway",
      "officialUrl": "https://vercel.com/changelog/glm-5-3-flash-now-available-on-ai-gateway",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-e5acb14edc80",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel"
      ],
      "en": {
        "title": "GLM 5.3 Flash becomes available through Vercel AI Gateway",
        "deck": "GLM 5.3 Flash becomes available through Vercel AI Gateway",
        "summary": "Vercel announced this model integration. The zai/glm-5.3-flash ID provides a coding model accepting text and images. Vercel documents function calling, structured output, streaming and a one-million-token context window.",
        "content": "Vercel announced this model integration. The zai/glm-5.3-flash ID provides a coding model accepting text and images. Vercel documents function calling, structured output, streaming and a one-million-token context window.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-e5acb14edc805f6d.png","alt":"Vercel AI Gateway, GLM 5.3 Flash 제공 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/30",
      "platform": "Web",
      "title": "Vercel, MiniMax H3·H3 Max 영상 생성 50% 할인",
      "deck": "Vercel, MiniMax H3·H3 Max 영상 생성 50% 할인",
      "summary": "Vercel이 8월 30일부터 9월 13일까지 AI Gateway로 청구되는 MiniMax H3·H3 Max 요청에 50% 할인을 발표했습니다. 기존 모델 ID를 유지해 코드 변경 없이 적용되는 제공사 프로모션입니다.",
      "content": "Vercel이 8월 30일부터 9월 13일까지 AI Gateway로 청구되는 MiniMax H3·H3 Max 요청에 50% 할인을 발표했습니다. 기존 모델 ID를 유지해 코드 변경 없이 적용되는 제공사 프로모션입니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/minimax-h3-and-h3-max-are-50-off-on-ai-gateway",
      "officialUrl": "https://vercel.com/changelog/minimax-h3-and-h3-max-are-50-off-on-ai-gateway",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-e1fb53c4fc15",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel"
      ],
      "en": {
        "title": "Vercel discounts MiniMax H3 and H3 Max by 50%",
        "deck": "Vercel discounts MiniMax H3 and H3 Max by 50%",
        "summary": "Vercel announced 50% off MiniMax H3 and H3 Max requests billed through AI Gateway from August 30 to September 13. Existing model IDs remain unchanged, so the promotion applies without code changes.",
        "content": "Vercel announced 50% off MiniMax H3 and H3 Max requests billed through AI Gateway from August 30 to September 13. Existing model IDs remain unchanged, so the promotion applies without code changes.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-e1fb53c4fc1578cb.png","alt":"Vercel, MiniMax H3·H3 Max 영상 생성 50% 할인 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/28",
      "platform": "Web",
      "title": "Vercel CLI, DNS·도메인·프로젝트 관리 확장",
      "deck": "Vercel CLI, DNS·도메인·프로젝트 관리 확장",
      "summary": "Vercel CLI 59.6.2 이상에서 DNS 수정, 도메인 갱신, 프로젝트 중지·재개와 멤버 관리 명령을 제공합니다. 구조화 JSON 출력이 가능하며 과금·파괴적 작업에는 명시 확인을 요구한다고 설명했습니다.",
      "content": "Vercel CLI 59.6.2 이상에서 DNS 수정, 도메인 갱신, 프로젝트 중지·재개와 멤버 관리 명령을 제공합니다. 구조화 JSON 출력이 가능하며 과금·파괴적 작업에는 명시 확인을 요구한다고 설명했습니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/vercel-cli-expands-commands-for-dns-domains-and-projects",
      "officialUrl": "https://vercel.com/changelog/vercel-cli-expands-commands-for-dns-domains-and-projects",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-7ef5aa320724",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel"
      ],
      "en": {
        "title": "Vercel CLI expands DNS, domain and project controls",
        "deck": "Vercel CLI expands DNS, domain and project controls",
        "summary": "Vercel CLI 59.6.2 and later adds DNS editing, domain renewal, project pause/resume and membership commands. Structured JSON output is supported; billable and destructive actions require explicit confirmation.",
        "content": "Vercel CLI 59.6.2 and later adds DNS editing, domain renewal, project pause/resume and membership commands. Structured JSON output is supported; billable and destructive actions require explicit confirmation.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-7ef5aa3207243e23.png","alt":"Vercel CLI, DNS·도메인·프로젝트 관리 확장 공식 출처 이미지","provenance":"source-share-preview"},
    },
    {
      "date": "8/28",
      "platform": "Web",
      "title": "Vercel Chat SDK, Claude Managed Agents 연결 지원",
      "deck": "Vercel Chat SDK, Claude Managed Agents 연결 지원",
      "summary": "Vercel이 Chat SDK에서 Claude Managed Agents로 Slack 연구 봇을 만드는 연결을 공개했습니다. 대화 스레드마다 지속 세션을 두고 출처를 포함한 답변과 도구 활동을 스트리밍합니다. Anthropic의 서비스 최초 출시와 구분되는 Chat SDK 통합입니다.",
      "content": "**자료 유형: SDK 연동 구현 안내**\n\nVercel이 Chat SDK에서 Claude Managed Agents로 Slack 연구 봇을 만드는 연결을 공개했습니다. 대화 스레드마다 지속 세션을 두고 출처를 포함한 답변과 도구 활동을 스트리밍합니다. Anthropic의 서비스 최초 출시와 구분되는 Chat SDK 통합입니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/claude-managed-agents-with-chat-sdk",
      "officialUrl": "https://vercel.com/changelog/claude-managed-agents-with-chat-sdk",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-12897e900a36",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel"
      ],
      "en": {
        "title": "Vercel Chat SDK integrates Claude Managed Agents",
        "deck": "Vercel Chat SDK integrates Claude Managed Agents",
        "summary": "Vercel documented a Chat SDK integration for a Slack research bot using Claude Managed Agents. It maintains a persistent session per thread and streams sourced replies and tool activity. This is a Chat SDK integration, not Anthropic’s original service launch.",
        "content": "**Article type: SDK integration guide**\n\nVercel documented a Chat SDK integration for a Slack research bot using Claude Managed Agents. It maintains a persistent session per thread and streams sourced replies and tool activity. This is a Chat SDK integration, not Anthropic’s original service launch.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-12897e900a36c00f.png","alt":"Vercel Chat SDK, Claude Managed Agents 연결 지원 공식 출처 이미지"},
    },
    {
      "date": "8/27",
      "platform": "Web",
      "title": "Vercel 배포 목록, 자연어 필터 검색 추가",
      "deck": "Vercel 배포 목록, 자연어 필터 검색 추가",
      "summary": "Vercel이 Deployments 페이지 필터를 개편했습니다. 추천 조건과 입력 중 검색 외에 찾는 배포를 자연어로 설명하면 해당 필터를 자동 적용합니다.",
      "content": "Vercel이 Deployments 페이지 필터를 개편했습니다. 추천 조건과 입력 중 검색 외에 찾는 배포를 자연어로 설명하면 해당 필터를 자동 적용합니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://vercel.com/changelog/find-deployments-faster-with-redesigned-filters",
      "officialUrl": "https://vercel.com/changelog/find-deployments-faster-with-redesigned-filters",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-7caf9c40d226",
      "tags": [
        "AI",
        "2026-w35",
        "Vercel"
      ],
      "en": {
        "title": "Vercel deployment filters support natural-language queries",
        "deck": "Vercel deployment filters support natural-language queries",
        "summary": "Vercel redesigned the Deployments page filters with suggestions, typeahead search and natural-language descriptions that automatically apply matching filters.",
        "content": "Vercel redesigned the Deployments page filters with suggestions, typeahead search and natural-language descriptions that automatically apply matching filters.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-7caf9c40d2264490.png","alt":"Vercel 배포 목록, 자연어 필터 검색 추가 공식 출처 이미지","provenance":"source-share-preview"},
    }
  ]
},
{
  "name": "Zed",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/26",
      "platform": "Web",
      "title": "Zed 1.17.2, 표 데이터 미리보기와 에이전트 연결 수정",
      "deck": "Zed 1.17.2, 표 데이터 미리보기와 에이전트 연결 수정",
      "summary": "Zed 1.17.2가 CSV 등 표 데이터 미리보기·열 정렬·필터링을 추가했습니다. ChatGPT 구독 연결의 맥락 압축 오류와 작업 트리 취소 후 메모리 누수를 수정했습니다. ask_user 도구는 추가됐지만 기본 비활성 상태라고 명시했습니다.",
      "content": "Zed 1.17.2가 CSV 등 표 데이터 미리보기·열 정렬·필터링을 추가했습니다. ChatGPT 구독 연결의 맥락 압축 오류와 작업 트리 취소 후 메모리 누수를 수정했습니다. ask_user 도구는 추가됐지만 기본 비활성 상태라고 명시했습니다.\n\n원문 게시 날짜를 유지했습니다. 정확한 공개 시각은 확정하지 않았습니다.\n\n표시 날짜는 발행자의 게시일입니다. 시간대가 확정되지 않은 날짜를 한국시간으로 환산하거나 임의의 시각을 넣지 않았습니다.",
      "source": "https://zed.dev/releases#zed-1.17.2",
      "officialUrl": "https://zed.dev/releases#zed-1.17.2",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-1f41085da955",
      "tags": [
        "AI",
        "2026-w35",
        "Zed"
      ],
      "en": {
        "title": "Zed 1.17.2 adds tabular previews and agent fixes",
        "deck": "Zed 1.17.2 adds tabular previews and agent fixes",
        "summary": "Zed 1.17.2 adds tabular previews with column sorting and filtering. It fixes ChatGPT subscription context-compaction errors and a memory leak after canceled worktree creation. The added ask_user tool is explicitly disabled by default.",
        "content": "Zed 1.17.2 adds tabular previews with column sorting and filtering. It fixes ChatGPT subscription context-compaction errors and a memory leak after canceled worktree creation. The added ask_user tool is explicitly disabled by default.\n\nPublisher date retained; exact release time is not established.\n\nThe displayed date is the publisher date. No Korea-time conversion or invented publication time is applied to date-only evidence."
      }
    }
  ]
},
{
  "name": "Microsoft",
  "color": "#6B7280",
  "posts": [
    {
      "date": "8/27 01:00",
      "platform": "Web",
      "title": "Microsoft, 에이전트 요청 비용 최적화 네 가지 관점 제시",
      "deck": "Microsoft, 에이전트 요청 비용 최적화 네 가지 관점 제시",
      "summary": "Microsoft가 모델 선택, 실행 상품, 재사용할 맥락, 프롬프트 구성을 점검하는 비용 최적화 지침을 공개했습니다. 토큰 단가만이 아니라 작업의 성공 결과당 비용을 봐야 한다는 기술 해설로, 새 할인 상품 발표와 구분합니다.",
      "content": "**자료 유형: 기술 구현 안내·분석**\n\nMicrosoft가 모델 선택, 실행 상품, 재사용할 맥락, 프롬프트 구성을 점검하는 비용 최적화 지침을 공개했습니다. 토큰 단가만이 아니라 작업의 성공 결과당 비용을 봐야 한다는 기술 해설로, 새 할인 상품 발표와 구분합니다.\n\n원문의 게시 시각을 한국시간으로 변환했습니다.",
      "source": "https://azure.microsoft.com/en-us/blog/the-economics-of-agent-optimization-four-ways-to-lower-the-cost",
      "officialUrl": "https://azure.microsoft.com/en-us/blog/the-economics-of-agent-optimization-four-ways-to-lower-the-cost",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-b9ed229089b8",
      "tags": [
        "AI",
        "2026-w35",
        "Azure"
      ],
      "en": {
        "title": "Microsoft outlines four levers for agent request costs",
        "deck": "Microsoft outlines four levers for agent request costs",
        "summary": "Microsoft published guidance on model choice, the serving offer, context reuse and prompt design. It argues for measuring cost per successful outcome rather than token price alone; this is technical guidance rather than a new discount announcement.",
        "content": "**Article type: Technical implementation guide / analysis**\n\nMicrosoft published guidance on model choice, the serving offer, context reuse and prompt design. It argues for measuring cost per successful outcome rather than token price alone; this is technical guidance rather than a new discount announcement.\n\nThe publisher timestamp is converted to KST."
      },
      thumbnail: {"src":"/source-media/weekly-20260909/recent-b9ed229089b87aad.jpg","alt":"Person with hand on chin.  Microsoft Foundry. Token rate-limiting and semantic caching. The economics of agent optimization"},
    },
    {
      "date": "8/28 00:00",
      "platform": "Web",
      "title": "Microsoft, PONS 법률 AI의 데이터 분리 설계 사례 공개",
      "deck": "Microsoft, PONS 법률 AI의 데이터 분리 설계 사례 공개",
      "summary": "Microsoft가 PONS 법률 AI 플랫폼의 공개 법률 지식·고객 데이터 분리, 관리형 서비스 활용, 보안·규정 준수 통제 설계를 소개했습니다. EU 호스팅 Azure 환경의 설계 사례이며 법률 자문 정확성이나 규정 인증 완료를 독립 검증한 결과는 아닙니다.",
      "content": "**자료 유형: 활용·설계 사례**\n\nMicrosoft가 PONS 법률 AI 플랫폼의 공개 법률 지식·고객 데이터 분리, 관리형 서비스 활용, 보안·규정 준수 통제 설계를 소개했습니다. EU 호스팅 Azure 환경의 설계 사례이며 법률 자문 정확성이나 규정 인증 완료를 독립 검증한 결과는 아닙니다.\n\n원문의 게시 시각을 한국시간으로 변환했습니다.",
      "source": "https://www.microsoft.com/en-us/startups/blog/three-architecture-decisions-behind-ponss-legal-ai-platform-on-microsoft-azure",
      "officialUrl": "https://www.microsoft.com/en-us/startups/blog/three-architecture-decisions-behind-ponss-legal-ai-platform-on-microsoft-azure",
      "verifiedAt": "2026-09-09",
      "slug": "devtools-953a56c3db74",
      "tags": [
        "AI",
        "2026-w35",
        "Microsoft AI"
      ],
      "en": {
        "title": "Microsoft details PONS’s legal-AI architecture",
        "deck": "Microsoft details PONS’s legal-AI architecture",
        "summary": "Microsoft described PONS’s separation of public legal knowledge and customer data, use of managed services, and security and compliance controls on EU-hosted Azure. This is an architecture case study, not independent validation of legal advice or completed compliance certification.",
        "content": "**Article type: Implementation / architecture case study**\n\nMicrosoft described PONS’s separation of public legal knowledge and customer data, use of managed services, and security and compliance controls on EU-hosted Azure. This is an architecture case study, not independent validation of legal advice or completed compliance certification.\n\nThe publisher timestamp is converted to KST."
      }
    }
  ]
},
  ],
};
