import type { WeeklyData } from "../data";

// Partial week: 2026-11-06까지 수집한 구간만 담았습니다. 11/7~8은 다음 수집에서 채웁니다. 표시 시각은 한국시간(KST)이며, 발행처가 날짜만 제공한 항목은 날짜만 표시합니다.
export const week45: WeeklyData = {
  "week": 45,
  "year": 2026,
  "slug": "2026-w45",
  "period": "11/2 ~ 11/8",
  "totalPosts": 3,
  "companies": [
    {
      "name": "ElevenLabs",
      "color": "#6B7280",
      "posts": [
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
    }
  ]
};
