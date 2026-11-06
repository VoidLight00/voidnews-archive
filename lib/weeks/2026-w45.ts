import type { WeeklyData } from "../data";

// Partial week: 2026-11-07까지 수집한 구간만 담았습니다. 11/8~8은 다음 수집에서 채웁니다. 표시 시각은 한국시간(KST)이며, 발행처가 날짜만 제공한 항목은 날짜만 표시합니다.
export const week45: WeeklyData = {
  "week": 45,
  "year": 2026,
  "slug": "2026-w45",
  "period": "11/2 ~ 11/8",
  "totalPosts": 7,
  "companies": [
    {
      "name": "ElevenLabs",
      "color": "#6B7280",
      "posts": [
        {
          "date": "11/5",
          "platform": "Web",
          "title": "ElevenLabs가 Unity 음성 에이전트 SDK를 공개했어요",
          "deck": "Unity 게임 캐릭터와 음성으로 대화하고, 에이전트가 게임 코드를 실행하도록 연결할 수 있어요.",
          "summary": "ElevenLabs가 Unity 장면을 음성 에이전트에 연결하는 ElevenAgents Unity SDK를 공개했어요. 에디터·데스크톱·WebGL을 지원하며, iOS·Android·XR은 베타로 제공해요.",
          "content": "ElevenLabs가 ElevenAgents Unity SDK를 공개했어요. 플레이어의 마이크로 음성을 듣고 에이전트의 응답을 재생하며, Conversation API로 대화를 관리해요. 기본 음성 출력은 2D이며, 개발자가 지정한 AudioSource로 캐릭터 위치에서 소리가 나도록 설정할 수 있어요.\n\n동적 변수로 캐릭터마다 기분 등의 값을 전달하고, 대화 도중 게임 상황을 에이전트에 알릴 수 있어요. 클라이언트 도구를 연결하면 에이전트가 문 열기 같은 게임 코드를 실행할 수도 있어요.\n\n에디터와 macOS·Windows·Linux 데스크톱, WebGL을 지원하며 iOS·Android·XR은 베타예요. WebGL의 WebRTC 세션은 지정한 OutputAudioSource를 사용하지 않아요. 게임을 출시하기 전에는 인증을 켜고 자체 서버에서 단기 유효 서명 URL을 받아 연결해야 하며, 게임 빌드에 ElevenLabs API 키를 넣으면 안 돼요.",
          "source": "https://elevenlabs.io/blog/unity-sdk-release",
          "officialUrl": "https://elevenlabs.io/blog/unity-sdk-release",
          "verifiedAt": "2026-11-07",
          "autoPublished": true,
          "slug": "elevenlabs-elevenagents-unity-sdk",
          "tags": [
            "AI",
            "2026-w45",
            "ElevenLabs",
            "Developer Tools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261107/8b9ae50d1b1d.jpg",
            "alt": "Tadas Petra"
          },
          "en": {
            "title": "ElevenLabs releases ElevenAgents Unity SDK",
            "deck": "Connect Unity characters to voice conversations and let agents trigger game code.",
            "summary": "ElevenLabs has released the ElevenAgents Unity SDK to connect Unity scenes to voice agents. It supports the Editor, desktop, and WebGL, with iOS, Android, and XR in beta.",
            "content": "ElevenLabs has released the ElevenAgents Unity SDK. It listens through the player's microphone, plays the agent's responses, and manages conversations through the Conversation API. Voice output is 2D by default; developers can supply an AudioSource to make the voice come from a character's position.\n\nDynamic variables let characters pass values such as mood to a shared agent, while contextual updates tell the agent about game events during a conversation. Client tools let the agent trigger game code, such as opening a door.\n\nThe SDK supports the Editor, macOS, Windows, Linux, and WebGL, with iOS, Android, and XR in beta. WebRTC sessions on WebGL ignore OutputAudioSource. Before shipping, developers must enable authentication and use a short-lived signed URL requested by their own server. ElevenLabs API keys must never be included in a game build."
          }
        },
        {
          "date": "11/4",
          "platform": "Web",
          "title": "ElevenLabs, ElevenAgents의 컨택센터 연동을 발표했어요",
          "deck": "기존 전화·통화 배정 시스템을 유지하면서 음성 AI 에이전트를 도입할 수 있어요.",
          "summary": "ElevenLabs가 ElevenAgents의 NiCE CXone, Genesys Cloud, Amazon Connect, Five9 기본 연동을 발표했어요. 기업은 기존 통화 흐름 안에서 반복 문의를 자동 처리하고, 상담원에게 연결할 때 대화 맥락도 전달할 수 있어요.",
          "content": "ElevenLabs가 ElevenAgents를 NiCE CXone, Genesys Cloud, Amazon Connect, Five9과 기본 연동한다고 발표했어요. 기업은 기존 컨택센터 시스템을 교체하지 않고 음성 AI 에이전트를 추가할 수 있어요.\n\n에이전트는 통화 시작 시 전달받은 맥락을 바탕으로 발신자를 확인하고, 예약 변경이나 보험금 청구 접수 같은 업무를 처리한 뒤 고객 관계 관리 시스템에 결과를 기록해요. 발신자가 상담원을 요청하면 기존 통화 배정 경로로 대화 맥락을 함께 넘겨요.\n\nGenesys Cloud는 Audio Connector를 통해 SIP 트렁킹 없이 연동해요. Five9은 별도 부가 기능인 AI Agent Connect를 활성화해야 하며, SIP로 통화를 전달해요. 그 밖에도 SIP 트렁킹을 지원하는 컨택센터나 사설 교환기에 연결할 수 있어요.",
          "source": "https://elevenlabs.io/blog/elevenagents-contact-center-integrations",
          "officialUrl": "https://elevenlabs.io/blog/elevenagents-contact-center-integrations",
          "verifiedAt": "2026-11-06",
          "autoPublished": true,
          "slug": "elevenagents-contact-center-integrations",
          "tags": [
            "AI",
            "2026-w45",
            "ElevenLabs",
            "Agents"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261106/5b290342a5e7.jpg",
            "alt": "Smiling young man with short brown hair and a trimmed beard, wearing a striped shirt."
          },
          "en": {
            "title": "ElevenLabs announces ElevenAgents contact center integrations",
            "deck": "Enterprises can add voice AI agents while retaining their existing telephony and routing systems.",
            "summary": "ElevenLabs announced native ElevenAgents integrations with NiCE CXone, Genesys Cloud, Amazon Connect, and Five9. Enterprises can automate routine requests within existing call flows and pass conversation context to human agents during transfers.",
            "content": "ElevenLabs announced native ElevenAgents integrations with NiCE CXone, Genesys Cloud, Amazon Connect, and Five9. Enterprises can add voice AI agents without replacing their existing contact center systems.\n\nThe agent receives context at the start of a call, verifies the caller, completes tasks such as rescheduling appointments or filing claims, and logs the outcome in the customer relationship management system. If the caller requests a person, it transfers the call through existing routing with the conversation context.\n\nGenesys Cloud connects through Audio Connector without SIP trunking. Five9 requires its AI Agent Connect add-on to be enabled and transfers calls over SIP. ElevenAgents can also connect to other contact centers or private branch exchanges that support SIP trunking."
          }
        }
      ]
    },
    {
      "name": "Google / DeepMind",
      "color": "#4285F4",
      "posts": [
        {
          "date": "11/5",
          "platform": "Web",
          "title": "구글, 15초 영상 지원하는 Omni 1.2 Flash 공개했어요",
          "deck": "최대 영상 길이를 10초에서 15초로 늘리고, 720p 영상 생성 가격을 이전 버전보다 30% 낮췄어요.",
          "summary": "구글 딥마인드가 Gemini Omni 1.2 Flash를 발표했어요. 최대 15초 영상 생성과 대화를 통한 반복 편집을 지원하며, 720p 영상 생성 가격은 Gemini Omni 1.1보다 30% 낮은 초당 0.07달러예요.",
          "content": "구글 딥마인드가 Gemini Omni 1.2 Flash를 발표하고 Gemini API와 Gemini for business에서 정식 제공을 시작했어요. 이전 버전에서 최대 10초였던 영상 길이를 15초로 늘렸으며, 3초부터 15초까지 1초 단위로 길이를 지정할 수 있어요.\n\n같은 영상을 대화로 반복 편집하면서 제품, 배경, 조명이나 화면 비율을 바꿀 수 있어요. 구글은 참조 이미지와 영상의 세부 요소를 더 잘 유지하고, 인물·사물·장면의 일관성과 대사의 자연스러움, 입 모양 동기화를 개선했다고 설명했어요.\n\n720p 영상 생성 가격은 Gemini Omni 1.1보다 30% 낮은 초당 0.07달러예요. 360p 또는 720p로 초안을 만든 뒤 선택한 영상을 1080p나 4K로 확대할 수 있으며, 생성 결과에는 눈에 보이지 않는 SynthID 워터마크가 포함돼요.",
          "source": "https://deepmind.google/blog/gemini-omni-12-flash-fast-and-cost-effective-with-longer-clips",
          "officialUrl": "https://deepmind.google/blog/gemini-omni-12-flash-fast-and-cost-effective-with-longer-clips",
          "verifiedAt": "2026-11-06",
          "autoPublished": true,
          "slug": "google-gemini-omni-1-2-flash-video-update",
          "tags": [
            "AI",
            "2026-w45",
            "Google / DeepMind",
            "Models"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261106/f6f84f55da08.webp",
            "alt": "Text \"Gemini Introducing Gemini Omni 1.2 Flash\" surroudned by images of a beehive, animals in conversation, a squid, and a woman walking down a street"
          },
          "en": {
            "title": "Google announces Gemini Omni 1.2 Flash with 15-second video",
            "deck": "The update extends clips from 10 to 15 seconds and cuts 720p video generation pricing by 30% compared with the previous version.",
            "summary": "Google DeepMind announced Gemini Omni 1.2 Flash with video generation up to 15 seconds and multi-turn conversational editing. Pricing for 720p video is $0.07 per second, 30% lower than Gemini Omni 1.1.",
            "content": "Google DeepMind announced Gemini Omni 1.2 Flash and began making it generally available across the Gemini API and Gemini for business. The model extends the maximum clip length from 10 to 15 seconds, with durations selectable in one-second increments from 3 to 15 seconds.\n\nUsers can refine the same clip through successive conversational edits, changing products, backgrounds, lighting or aspect ratios. Google says the update improves reference adherence, character, object and scene consistency, as well as natural-sounding dialogue and lip-sync.\n\n720p video generation costs $0.07 per second, 30% less than Gemini Omni 1.1. Users can draft at 360p or 720p and upscale selected videos to 1080p or 4K. Generated outputs carry an imperceptible SynthID watermark."
          }
        }
      ]
    },
    {
      "name": "NVIDIA",
      "color": "#76B900",
      "posts": [
        {
          "date": "11/5",
          "platform": "Web",
          "title": "NVIDIA, Cosmos 3 시뮬레이션 모델 4종 공개했어요",
          "deck": "자율주행 센서 데이터 생성부터 양팔 로봇의 행동에 따른 영상 예측까지 지원해요.",
          "summary": "NVIDIA가 Cosmos 3 제품군에 가중치를 공개한 모델 4종을 추가했어요. 자율주행 장면과 센서 데이터 생성, 시뮬레이터 제어에 따른 영상 생성, 로봇 행동에 따른 다음 관측 예측을 지원해요.",
          "content": "NVIDIA가 상호작용형 월드 시뮬레이션을 위한 Cosmos 3 Nano 기반 모델 4종을 공개했어요. 모두 사후 학습한 모델이며, 각각 학습 가능한 매개변수 160억 개를 갖췄어요. OpenMDW1.1 라이선스 조건에 따라 상업적·비상업적 용도로 사용할 수 있어요.\n\nTransfer-Auto는 최대 11개 카메라 시점의 동기화된 주행 영상을 생성하고, RGB 영상과 LiDAR 데이터의 공동 생성도 지원해요. Sim-Auto는 주행 제어 입력과 생성 이력을 바탕으로 카메라 영상과 LiDAR 데이터를 짧은 구간씩 연속 생성해요. 주행 입력을 다음 관측에 반영하는 폐루프 상호작용에는 시뮬레이션 실행 환경과 WSM 렌더러가 별도로 필요해요.\n\nSim-Transfer는 시뮬레이터의 공간 제어 정보와 텍스트를 영상으로 바꾸고, 물리 계산은 시뮬레이터가 담당해요. Sim-Bimanual은 양팔 로봇이나 카메라의 동작에 따른 다음 관측을 직접 생성해요. NVIDIA는 사후 학습 절차도 공개했으며, 정책 학습과 평가를 얼마나 충실하게 지원하는지와 모델의 한계는 추가로 측정해야 한다고 설명했어요.",
          "source": "https://huggingface.co/blog/nvidia/cosmos-interactive-world-simulation",
          "officialUrl": "https://huggingface.co/blog/nvidia/cosmos-interactive-world-simulation",
          "verifiedAt": "2026-11-06",
          "autoPublished": true,
          "slug": "nvidia-cosmos-3-interactive-world-simulation-models",
          "tags": [
            "AI",
            "2026-w45",
            "NVIDIA",
            "Models"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261106/46baa5433921.png",
            "alt": "New NVIDIA Cosmos 3 Open Models for Interactive World Simulation",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "NVIDIA releases four Cosmos 3 world simulation models",
            "deck": "The checkpoints cover driving sensor data, simulator-driven video, and observations generated from robot actions.",
            "summary": "NVIDIA added four open-weight checkpoints to the Cosmos 3 family. They support driving scene and sensor data generation, video generation from simulator controls, and prediction of the next observation from robot actions.",
            "content": "NVIDIA released four post-trained Cosmos 3 Nano checkpoints for interactive world simulation. Each has 16 billion trainable parameters. The models use OpenMDW1.1, which permits commercial and non-commercial use under its terms.\n\nTransfer-Auto generates synchronized driving video across up to 11 camera views and supports joint RGB–LiDAR generation. Sim-Auto streams short chunks of camera video and LiDAR using driving controls and generated history. Closed-loop interaction additionally requires a simulation runtime and a World Scenario Map (WSM) renderer to update controls from driving inputs.\n\nSim-Transfer turns simulator spatial controls and text prompts into video, while the simulator retains responsibility for physics. Sim-Bimanual directly generates the next observation from robot or camera actions. NVIDIA also released post-training recipes and noted that further work is needed to measure how faithfully the models support policy learning and evaluation and to understand their limits."
          }
        }
      ]
    },
    {
      "name": "Higgsfield",
      "color": "#6B7280",
      "posts": [
        {
          "date": "11/6",
          "platform": "Web",
          "title": "Higgsfield, 이야기형 영상 광고 기능 선보였어요",
          "deck": "Ads Studio에 Micro Drama Ads를 추가해 제품이 이야기의 전환점에 등장하는 영상 광고를 만들 수 있어요.",
          "summary": "Higgsfield가 Ads Studio에 이야기형 영상 광고를 만드는 Micro Drama Ads를 선보였어요. 광고 아이디어나 대본을 입력하고 스타일·제품·아바타를 선택하면 채팅 에이전트가 영상을 제작해요.",
          "content": "Higgsfield가 Ads Studio에 Micro Drama Ads를 추가했어요. 등장인물과 갈등이 있는 짧은 이야기 속에서 제품이 문제 해결에 기여하는 영상 광고를 만드는 기능이에요. 기존 정적 이미지 광고 제작도 계속 지원해요.\n\n출시 시점에는 실사와 애니메이션 등을 포함한 영상 스타일 8종과 스토리 카드 44개를 제공해요. 광고 설명이나 대본을 입력하고 스타일·제품·아바타를 선택하면 에이전트가 영상을 만들고, 같은 채팅에서 다른 버전도 요청할 수 있어요. Claude와 ChatGPT에서도 Higgsfield MCP의 /microdrama-ads 명령으로 같은 스토리 카탈로그를 이용할 수 있어요.\n\n영상 생성 비용은 초당 480p 3크레딧, 720p 7크레딧, 1080p 16크레딧이에요. 캐릭터·장소 이미지, 내레이션, 음악에는 추가 비용이 들어요. 웹에서는 Auto 모델을 제외하면 에이전트 요청에도 크레딧이 들지만, Claude와 ChatGPT에서는 생성 작업에만 Higgsfield 크레딧이 사용돼요.",
          "source": "https://higgsfield.ai/blog/micro-drama-ads-higgsfield-ads-studio",
          "officialUrl": "https://higgsfield.ai/blog/micro-drama-ads-higgsfield-ads-studio",
          "verifiedAt": "2026-11-07",
          "autoPublished": true,
          "slug": "higgsfield-ads-studio-micro-drama-ads",
          "tags": [
            "AI",
            "2026-w45",
            "Higgsfield",
            "Products"
          ],
          "en": {
            "title": "Higgsfield Adds Micro Drama Ads to Ads Studio",
            "deck": "Ads Studio can now create story-driven video ads with a product at the turning point.",
            "summary": "Higgsfield introduced Micro Drama Ads in Ads Studio for creating story-driven video advertisements. Users describe an idea or paste a script, select a style, product and avatar, and a chat agent produces the video.",
            "content": "Higgsfield added Micro Drama Ads to Ads Studio. The feature creates video ads with characters and a conflict, placing a product in the story to help resolve the problem. Ads Studio continues to support static image ads.\n\nAt launch, the feature offers eight video styles, including live-action and animated options, and 44 ready-made story cards. Users enter an ad description or script and select a style, product and avatar, then ask the agent to create the video or new versions in the same chat. The same story catalog is available in Claude and ChatGPT through the /microdrama-ads command in Higgsfield MCP.\n\nVideo generation costs 3 credits per second at 480p, 7 at 720p and 16 at 1080p. Character and location images, voiceover and music cost extra. On the web, agent requests also use credits unless the model is set to Auto; in Claude and ChatGPT, only generation tasks use Higgsfield credits."
          }
        },
        {
          "date": "11/4",
          "platform": "Web",
          "title": "Higgsfield, AI 진행자 영상 도구 Shorts Studio 출시",
          "deck": "AI 진행자와 대본으로 15초부터 2분까지 세로 영상을 만들 수 있어요.",
          "summary": "Higgsfield가 AI 진행자가 대본을 말하는 9:16 세로 영상 제작 도구 Shorts Studio를 출시했어요. 캐릭터·제품·의류용 이미지나 영상을 최대 38개까지 넣고, 선택한 참고 영상의 움직임을 적용할 수 있어요.",
          "content": "Higgsfield가 Shorts Studio를 출시했어요. AI 진행자가 제품이나 의류를 소개하는 9:16 세로 영상을 만들고, 같은 진행자를 여러 영상에 다시 사용할 수 있어요. 주제를 입력해 대본을 생성하고, 캐릭터에 맞는 음성을 자동으로 만들 수도 있어요.\n\n영상 길이는 15초·30초·1분·2분 중에서 선택해요. Basic은 생성이 더 빠르고 저렴한 중간 품질 옵션이며, High는 더 높은 품질을 제공하지만 비용과 생성 시간이 늘어나요. 움직임을 옮길 참고 영상은 선택 사항이며, 길이가 10~120초여야 해요. 웹사이트에서 생성하거나 Higgsfield MCP를 통해 Claude에서 이어서 진행할 수 있어요.\n\n15초 영상은 Basic에서 90크레딧, High에서 240크레딧을 사용해요. 1,000크레딧에 49달러인 Plus 요금제를 기준으로 계산한 예상 비용은 각각 4.41달러와 11.76달러예요. 실제 생성에 필요한 크레딧은 영상 길이와 품질에 따라 달라지며, 생성 전에 Generate 버튼에 표시돼요.",
          "source": "https://higgsfield.ai/blog/higgsfield-introduces-shorts-studio",
          "officialUrl": "https://higgsfield.ai/blog/higgsfield-introduces-shorts-studio",
          "verifiedAt": "2026-11-07",
          "autoPublished": true,
          "slug": "higgsfield-launches-shorts-studio",
          "tags": [
            "AI",
            "2026-w45",
            "Higgsfield",
            "Products"
          ],
          "en": {
            "title": "Higgsfield Launches Shorts Studio for AI Presenter Videos",
            "deck": "Create vertical videos lasting 15 seconds to two minutes with an AI presenter and a script.",
            "summary": "Higgsfield has launched Shorts Studio, a tool for creating vertical 9:16 videos featuring an AI presenter speaking a script. It accepts up to 38 images or videos for characters, products, and clothing, with optional motion transfer from a reference video.",
            "content": "Higgsfield has launched Shorts Studio for creating vertical 9:16 videos in which an AI presenter introduces products or clothing. The same presenter can be reused across videos. Users can enter a topic to generate a script and automatically generate a voice matched to their character.\n\nAvailable durations are 15 seconds, 30 seconds, one minute, and two minutes. Basic offers faster, cheaper generation at medium quality, while High offers better quality at a higher cost and with a longer generation time. An optional motion reference video must be 10 to 120 seconds long. Users can generate on the website or continue in Claude through Higgsfield MCP.\n\nA 15-second video uses 90 credits in Basic or 240 credits in High. Based on the Plus plan at $49 for 1,000 credits, the estimated costs are $4.41 and $11.76, respectively. Credit requirements vary with video length and quality and appear on the Generate button before generation."
          }
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "11/5",
          "platform": "Web",
          "title": "OpenAI, 보안 연구 모델 GPT‑6 Cyber를 발표했어요",
          "deck": "취약점 탐지·검증 능력과 연구자가 정한 작업 범위를 지키는 성능을 개선했어요.",
          "summary": "OpenAI가 취약점을 찾고 실제 악용 가능성을 검증하는 GPT‑6 Cyber를 발표했어요. 지정된 취약점을 악용하는 능력을 평가하는 ExploitGym에서 48.5%를 기록해 GPT‑5.6 Cyber의 32.1%보다 높은 성적을 냈어요.",
          "content": "OpenAI가 보안 연구용 모델 GPT‑6 Cyber를 발표했어요. 취약점 탐지와 수정 능력을 높이고, 연구자가 허용한 작업 범위와 제한을 따르도록 훈련했어요.\n\n원격 대상의 지정된 취약점을 악용하는 ExploitGym 평가에서는 48.5%를 기록했어요. GPT‑5.6 Cyber의 32.1%와 비교해 상대적으로 51% 개선된 결과예요. 별도의 ExploitGym Honeypot 평가에서는 배포용 안전 프롬프트 없이도 99.93%의 사례에서 범위 밖 서비스를 공격하지 않았고, 해당 프롬프트를 적용했을 때는 100%였어요.\n\nOpenAI 연구진은 이 모델을 활용해 Linux 권한 상승 공격 코드 948개를 개발하고, Firefox에서 알려지지 않았던 심각도 높은 취약점 81개를 발견했어요. 모델은 수정안 후보 작성도 도왔으며, Mozilla는 해당 Firefox 취약점 중 다수에 대한 수정 사항을 배포했어요.",
          "source": "https://openai.com/index/introducing-gpt-6-cyber",
          "officialUrl": "https://openai.com/index/introducing-gpt-6-cyber",
          "verifiedAt": "2026-11-07",
          "autoPublished": true,
          "slug": "openai-introduces-gpt-six-cyber",
          "tags": [
            "AI",
            "2026-w45",
            "OpenAI",
            "Models"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261107/bcc13824a182.webp",
            "alt": "GPT‑6 Cyber: Advancing the frontier of aligned cybersecurity agents"
          },
          "en": {
            "title": "OpenAI introduces GPT‑6 Cyber for security research",
            "deck": "The model improves vulnerability discovery and validation while more reliably respecting researcher-defined boundaries.",
            "summary": "OpenAI introduced GPT‑6 Cyber, a model for finding vulnerabilities and validating whether they can be exploited. It scored 48.5% on ExploitGym, which evaluates exploitation of specified vulnerabilities, compared with 32.1% for GPT‑5.6 Cyber.",
            "content": "OpenAI introduced GPT‑6 Cyber for security research. The model improves vulnerability discovery and remediation and was trained to follow researchers’ authorized scope and restrictions.\n\nOn ExploitGym, which tests exploitation of a specified vulnerability in a remote target, it scored 48.5%, compared with 32.1% for GPT‑5.6 Cyber, a 51% relative improvement. In the separate ExploitGym Honeypot evaluation, it avoided exploiting out-of-scope services in 99.93% of cases without deployment safety prompts and 100% with those prompts.\n\nOpenAI researchers used the model to develop 948 Linux privilege escalation exploits and discover 81 previously unknown high-severity Firefox vulnerabilities. The model also helped develop candidate patches, and Mozilla has released fixes for many of those Firefox vulnerabilities."
          }
        }
      ]
    }
  ]
};
