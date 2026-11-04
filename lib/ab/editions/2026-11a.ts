import type { ABEdition } from "../data";

export const edition2026_11a: ABEdition = {
  "slug": "2026-11a",
  "volume": 16,
  "title": "모델에서 현실의 작업으로, AI가 맡는 일이 넓어집니다",
  "theme": "새 모델·상호작용 세계·XR·로봇 데이터·음악 작업의 변화를 살펴보고, 피클에 일을 맡길 때 필요한 승인과 한계를 확인합니다.",
  "period": "2026-10-23 ~ 2026-11-05",
  "coveredWeeks": [
    {
      "slug": "2026-w44",
      "period": "10/26 ~ 11/01"
    }
  ],
  "announceDate": "2026-11-05",
  "nextEditionDate": "2026-11-19",
  "intro": "모델의 작업 수행 능력부터 상호작용 세계, XR 기기, 로봇 학습 데이터와 음악 제작까지 살펴봅니다. 공개 범위와 이용 조건, 공급자가 설명한 결과와 실제 사용 사례를 구분합니다.",
  "closing": "모델과 도구의 공개 범위와 이용 조건을 확인하고, 실제로 맡길 작업에 맞추어 활용 여부를 판단합니다.",
  "coreFlow": [
    "모델의 장기 작업과 접근 조건",
    "세계 모델과 XR 기기",
    "로봇 데이터와 음악 제작",
    "피클과 오픈소스 추천 도구"
  ],
  "invitation": {
    "title": "피클 초대장",
    "url": "https://pickle.com/i/MGK528GT",
    "description": "피클 앱에서 친구가 되면 서로의 피클끼리 이야기할 수 있습니다.",
    "en": {
      "title": "Pickle invitation",
      "description": "Become friends in the Pickle app so your Pickles can talk to each other."
    }
  },
  "editorsPicksDescription": "공식 문서와 공개 사용 사례를 바탕으로 선정했습니다. 직접 실행한 평가와는 구분하며, 서비스형 도구와 오픈소스를 나누어 소개합니다.",
  "editorsPicks": [
    {
      "title": "피클에 생활 업무를 맡길 때는 목표와 승인 범위를 함께 정합니다",
      "slug": "pickle-agent",
      "thumbnail": {
        "src": "/source-media/weekly-20261104/b9bea248b9e0.jpg",
        "alt": "디지털데일리 피클 사용 기사 이미지"
      },
      "deck": "전화·예약·서류 발급 사례에서 성공뿐 아니라 재시도 과정도 살펴봅니다",
      "category": "서비스형 AI 에이전트",
      "sourceUrl": "https://www.pickle.com/help/start/what-is-pickle",
      "sourceLabel": "피클 공식 도움말",
      "guideUrl": "https://www.ddaily.co.kr/page/view/2026110303331226363",
      "guideLabel": "기자의 사용 사례",
      "summary": "피클은 대화로 업무를 맡기는 서비스형 에이전트입니다. 전화·기차 예매·서류 발급은 기자의 사용 사례로 소개하며, 직접 시험한 결과와 구분합니다. 계정 연결과 실제 발신·결제·개인정보 제출은 별개의 결정입니다.",
      "body": "피클은 오픈소스 설치 도구가 아니라 계정을 통해 이용하는 서비스형 AI 에이전트입니다. 연결할 서비스와 권한을 먼저 확인하고, 할 일과 기한, 예산, 실행 전에 확인받을 행동을 구체적으로 적는 방식으로 접근할 수 있습니다.\n\n예약을 맡긴다면 ‘내일 오전 서울에서 부산으로 가는 열차를 찾아 주세요. 도착 시각과 총액을 비교하고, 결제 전에는 제가 고른 편을 다시 확인해 주세요’처럼 검색과 실행을 나누어 요청하는 편이 안전합니다. 전화 요청도 전달할 내용과 발신 시각, 상대에게 공개할 정보를 먼저 정하고 실제 발신 전에 확인하도록 요청할 수 있습니다. 이는 요청문 예시이며, 제품이 모든 상황에서 승인 절차를 강제한다는 뜻은 아닙니다.\n\n2026년 11월 3일 디지털데일리 기자의 사용 기사에는 KTX 예매, 정부24 서류 발급, 전화 대행 사례가 나옵니다. 정부24에서는 과거 주소로 신청하다 오류가 발생해 새 주소를 확인한 뒤 다시 진행했고, PASS 본인 인증은 기자가 직접 수행했습니다. 결제도 카카오페이 승인 요청까지 진행한 뒤 최종 승인은 기자가 직접 했다고 설명합니다.\n\nKTX 사례에서는 조회 기간을 당일까지 잡아 미래 예약을 찾지 못했습니다. 기자가 지적하자 검색 기간을 늘렸고, 좌석 화면 오류가 발생했을 때는 화면을 다시 열어 다른 호차를 확인했습니다. 해당 예매에 약 20분이 걸렸다는 관측은 한 사례이며 모든 예약의 소요 시간을 보장하지 않습니다. 웹에서 예매한 내역을 확인하려면 웹 로그인이 필요했다는 점도 소개합니다.\n\n전화 사례에서는 새벽 발신이 상대에게 불편을 줄 수 있다고 경고한 뒤 기자의 선택에 따라 전화를 걸었습니다. 상대가 항의하자 사과하고 결과를 보고했다고 기사에서 설명합니다. 따라서 전화 기능의 존재만 확인하는 것보다 발신 시간, 전달 내용, 상대방에게 미칠 영향을 함께 확인하는 일이 중요합니다.\n\n연결 범위와 진행 상황 설명에는 한계가 있었습니다. 기사 시험 당시 카카오캘린더와 네이버웍스 메일은 직접 연결하지 못했고, Google을 거치거나 메일을 자동 전달하는 대안을 안내했습니다. 진행 중인 단계와 남은 시간을 충분히 설명하지 못했다는 지적도 있습니다. 쿠팡의 경우 한국 App Store에 게시된 개발자 설명에서 쿠팡·다이소몰 주문과 쿠팡 서비스 연결을 안내합니다. 이는 공식 기능 설명이며, 실제 계정 연결·상품 주문·결제 성공을 시험한 결과는 아닙니다. 연결 가능한 서비스와 필요한 권한은 현재 앱의 연결 화면에서 다시 확인해야 합니다.\n\n공식 도움말의 연결 절차는 ‘나의 피클 → 연결된 앱 및 서비스 → 연결 추가’에서 서비스를 찾고, 해당 서비스에 로그인해 권한을 허용하는 방식입니다. 목록에 없으면 검색어로 연결 요청을 보낼 수 있지만, 요청 전송이 연결 지원이나 성공을 보장하지는 않습니다. 새 계정을 연결하면 피클이 계정 내용을 폭넓게 읽고 일부 내용이 대화·기억·작업 기록에 남을 수 있다고 도움말에서 설명합니다.\n\n공식 도움말은 웹으로 처리하기 어려운 예약 등에 전화 대행을 사용할 수 있고, 통화 기록은 ‘추가 대화’에 남는다고 안내합니다. 비밀번호와 결제 정보는 일반 채팅에 쓰지 않고 제품이 제공하는 보안 입력 화면을 이용하도록 설명합니다. 사용량 한도가 적용되므로 긴 작업을 맡기기 전에 앱에서 남은 사용량과 이용 조건을 확인해야 합니다.\n\n공식 연결 안내: https://www.pickle.com/help/connect/add-connection\n공식 작업 안내: https://www.pickle.com/help/tasks/delegate\n개발자 제품 설명: https://apps.apple.com/kr/app/%ED%94%BC%ED%81%B4-%EB%82%98%EB%A7%8C%EC%9D%98-ai-%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8/id6795790129\n\n계정 연결이 모든 행동에 대한 포괄적 승인은 아닙니다. 검색 결과의 날짜·주소·금액을 확인하고, 발신·구매·개인정보 제출은 실행 전에 별도로 확인하도록 요청하는 것이 좋습니다. 여기서 소개한 성공과 실패는 기자의 관측이며, 이번 자료 작성 과정에서 실제 전화·주문·결제를 시험한 결과는 아닙니다.",
      "editorial": "에이전트를 평가할 때 완료 여부뿐 아니라 잘못된 입력을 알아차리는 과정, 재시도 방식, 사람이 다시 확인해야 하는 지점을 함께 살펴봅니다.",
      "tags": [
        "피클",
        "서비스형 도구",
        "전화",
        "예약"
      ],
      "tier": "normal",
      "releaseScope": "계정 기반 서비스 · 연결 범위와 이용 조건은 앱에서 확인"
    },
    {
      "title": "TokenEconomizer의 코딩 에이전트 비용 제어",
      "slug": "oss-token-economizer",
      "thumbnail": {
        "src": "/source-media/weekly-20261104/df0901de87cb.png",
        "alt": "TokenEconomizer 비용 제어 방식과 평가 결과"
      },
      "category": "오픈소스 도구",
      "sourceUrl": "https://github.com/microsoft/TokenEconomizer",
      "sourceLabel": "공식 저장소",
      "summary": "코딩 에이전트의 비용 제어를 다루는 도구입니다. 적용 효과는 같은 작업의 비용과 결과 품질을 함께 비교해야 판단할 수 있습니다.",
      "body": "TokenEconomizer는 코딩 에이전트의 비용 제어를 다루는 오픈소스 도구입니다. 도입 전에는 현재 사용하는 모델과 작업 환경이 지원 대상인지 저장소 문서에서 확인해야 합니다.\n\n효과를 비교하려면 같은 입력과 완료 기준으로 작업을 수행하고, 비용뿐 아니라 수정에 필요한 시간과 결과 품질도 함께 기록하는 편이 좋습니다. 비용이 줄더라도 재작업이 늘면 전체 부담은 커질 수 있습니다.\n\n여기서는 저장소 문서에 기재된 목적을 소개합니다. 비용 절감률, 품질 유지와 실제 실행 성공은 직접 검증하지 않았습니다.\n\n라이선스는 Apache-2.0입니다. 적용 전 현재 저장소의 라이선스와 실행 조건을 확인해야 합니다.",
      "tags": [
        "Apache-2.0",
        "문서 기반 소개"
      ],
      "tier": "normal"
    },
    {
      "title": "VibeVoice는 음성 인식과 음성 합성 모델을 구분해 제공합니다",
      "slug": "oss-vibevoice",
      "thumbnail": {
        "src": "/source-media/weekly-20261104/7472f1f44110.jpg",
        "alt": "VibeVoice 공식 저장소의 화자 분리 오류율 평가 그래프"
      },
      "category": "오픈소스 도구",
      "sourceUrl": "https://github.com/microsoft/VibeVoice",
      "sourceLabel": "Microsoft 공식 저장소",
      "summary": "녹음을 글로 바꾸는 ASR과 글을 음성으로 만드는 Realtime 모델을 제공합니다. 한국어 인식 평가와 실험용 한국어 합성은 서로 다른 지원 범위입니다.",
      "body": "VibeVoice는 Microsoft가 공개한 음성 AI 모델 계열입니다. ASR은 음성을 텍스트로 바꾸고, Realtime은 텍스트를 음성으로 만듭니다. 하나의 모델이 모든 기능을 제공하는 것은 아닙니다.\n\nVibeVoice-ASR 공식 문서는 최대 60분 오디오를 한 번에 처리하고, 누가 언제 무엇을 말했는지 구조화해 출력한다고 설명합니다. 한국어를 포함한 평가를 공개하며, 전문용어와 이름을 알려 주는 기능도 안내합니다. 회의나 인터뷰의 발언 구간을 찾는 용도로 검토할 수 있지만, 이름과 숫자, 화자 구분은 원본 녹음과 대조해야 합니다. 이번 소개에서는 전사 성능을 직접 시험하지 않았습니다.\n\nVibeVoice-Realtime-0.5B는 텍스트를 구간별로 처리하며 음성을 점진적으로 생성하는 단일 화자 모델입니다. 영어 중심이며 한국어 음성은 실험용으로 안내합니다. 한국어 품질이나 모든 실시간 입력 경로의 동작을 보장하는 설명으로 받아들이면 안 됩니다. 음악이나 효과음을 만드는 모델도 아닙니다.\n\n저장소는 MIT 라이선스입니다. 실제 도입 전에는 사용할 모델의 가중치 이용 조건과 실행 환경을 별도로 확인해야 합니다. 기존 장문 TTS 코드는 오용 우려로 2025년 9월 제거됐으므로 과거의 90분·4화자 소개를 현재 제공 기능으로 혼동하지 않아야 합니다. 타인의 목소리나 녹음을 사용할 때는 동의와 이용 권한을 확인해야 합니다.\n\n공식 ASR 문서: https://github.com/microsoft/VibeVoice/blob/main/docs/vibevoice-asr.md\n공식 Realtime 문서: https://github.com/microsoft/VibeVoice/blob/main/docs/vibevoice-realtime-0.5b.md\n\n이 소개는 공식 문서 기준이며 설치, 모델 실행, 한국어 합성 품질을 직접 검증한 결과가 아닙니다.",
      "tags": [
        "음성 인식",
        "음성 합성",
        "MIT"
      ],
      "tier": "normal"
    },
    {
      "title": "Hindsight의 에이전트 기억과 도입 조건",
      "slug": "oss-hindsight",
      "thumbnail": {
        "src": "/source-media/weekly-20261104/c82753536939.png",
        "alt": "Hindsight 공식 저장소 소개 이미지"
      },
      "category": "오픈소스 도구",
      "sourceUrl": "https://github.com/vectorize-io/hindsight",
      "sourceLabel": "공식 저장소",
      "summary": "이전 경험을 저장하고 필요한 기억을 찾아 활용하도록 에이전트에 기억 기능을 연결하는 도구입니다.",
      "body": "Hindsight는 에이전트가 이전 경험을 저장하고, 필요한 기억을 찾아 다음 작업에 활용하도록 돕는 기억 시스템입니다. 저장소 문서는 단순히 대화 기록을 다시 찾는 것에서 나아가 경험을 학습에 활용하는 것을 목표로 설명합니다.\n\n자체 서버를 운영하거나 기존 에이전트에 연결하는 방식을 제공합니다. 저장소의 빠른 시작 예시는 모델 제공자 연결을 요구하며, 로컬 모델을 사용하는 선택지도 안내합니다. 따라서 오픈소스라는 이유만으로 모든 구성이 외부 전송 없이 동작하거나 비용이 발생하지 않는다고 볼 수는 없습니다.\n\n도입 전에는 기억에 저장할 정보, 저장 위치, 모델에 전달되는 내용, 삭제 절차와 운영 비용을 확인해야 합니다. 기억 성능과 안전성, 실제 설치·운영 성공은 이번 자료 작성 과정에서 직접 검증하지 않았습니다.\n\n라이선스는 MIT입니다. 적용 전 현재 저장소의 라이선스와 실행 조건을 확인해야 합니다.",
      "tags": [
        "MIT",
        "문서 기반 소개"
      ],
      "tier": "normal"
    }
  ],
  "highlights": [
    {
      "rank": 1,
      "tier": "normal",
      "post": {
        "date": "10/28",
        "platform": "Web",
        "title": "Google DeepMind, Gemini 4 Carbon 발표",
        "deck": "코딩·장기 작업·사이버보안 역량을 강화하고, 일부 사이버 방어 담당자부터 제공합니다.",
        "summary": "Google DeepMind가 Gemini 4 Carbon을 발표했습니다. 코딩과 장기 작업, 사이버보안 방어 역량을 강화한 모델로, 일부 사이버 방어 담당자에게 먼저 제공하고 Fairwind Program을 통해 신뢰할 수 있는 파트너로 접근을 점차 확대할 예정입니다.",
        "content": "Google DeepMind가 Gemini 4 Carbon을 발표했습니다. Google은 내부 엔지니어링 작업에서 모델이 며칠 동안 작업을 이어가며 대규모 코드의 복잡한 버그를 추적하고 수정하는 모습을 관찰했다고 밝혔습니다.\n\nGoogle이 공개한 안전장치를 적용하지 않은 외부 평가에서 취약점 탐지 SEC-bench Pro는 88.2%, 악용 가능성 검증 ExploitGym은 54.8%, 취약점 수정 CWE-bench는 71.0%를 기록했습니다. 제공은 일부 사이버 방어 담당자부터 시작하며, 개발자·기업·일반 소비자 대상 제공은 추후 예정입니다.\n\n출시 초기 가격은 토큰 100만 개당 입력 2달러, 출력 10달러이며, 캐시된 입력 토큰은 입력 가격에서 95% 할인됩니다. 초기 요금 적용 기간이 끝나면 토큰 100만 개당 입력 4달러, 출력 20달러가 적용됩니다.",
        "source": "https://deepmind.google/blog/gemini-4-carbon-our-next-frontier-model",
        "officialUrl": "https://deepmind.google/blog/gemini-4-carbon-our-next-frontier-model",
        "verifiedAt": "2026-10-31",
        "slug": "google-deepmind-announces-gemini-4-carbon",
        "tags": [
          "AI",
          "2026-w44",
          "Google / DeepMind",
          "Models"
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261031/f2d5dd603b70.webp",
          "alt": "Faceted iridescent crystal surrounded by floating white number 4s."
        },
        "en": {
          "title": "Google DeepMind announces Gemini 4 Carbon",
          "deck": "The model improves coding, long-horizon tasks, and cybersecurity, with initial access for a subset of cyber defenders.",
          "summary": "Google DeepMind announced Gemini 4 Carbon, a model with improved coding, long-horizon task, and cybersecurity defense capabilities. Access will begin with a subset of cyber defenders and gradually expand to additional trusted partners through the Fairwind Program.",
          "content": "Google DeepMind announced Gemini 4 Carbon. Google reported observing the model work for days on internal engineering tasks, tracing and patching complex bugs across large codebases.\n\nIn external evaluations conducted without guardrails, Google reported scores of 88.2% on SEC-bench Pro for vulnerability detection, 54.8% on ExploitGym for exploitation, and 71.0% on CWE-bench for patching. Access starts with a subset of cyber defenders, with availability for developers, businesses, and consumers planned for later.\n\nIntroductory pricing will be $2 per million input tokens and $10 per million output tokens, with cached input tokens discounted by 95% from the input token price. After the introductory period, pricing will be $4 per million input tokens and $20 per million output tokens."
        }
      },
      "sourceWeek": "2026-w44",
      "sourceCompany": "Google / DeepMind",
      "editorial": "Google은 사이버 방어와 장기 작업 수행을 강조하는 Gemini 4 Carbon을 발표했습니다. 이번 주 일부 사이버 방어 담당자에게 접근을 제공하고 신뢰 파트너로 확대한다는 계획이며, 일반 사용자용 전면 출시가 아닙니다."
    },
    {
      "rank": 2,
      "tier": "normal",
      "post": {
        "date": "10/27",
        "platform": "Web",
        "title": "구글 딥마인드, 소리까지 생성하는 Genie 4 발표",
        "deck": "세계를 실시간으로 조작하고 음악·환경음·대화를 함께 생성하는 세계 모델입니다.",
        "summary": "구글 딥마인드가 실시간 상호작용 시뮬레이션과 오디오 생성을 지원하는 세계 모델 Genie 4를 발표했습니다. 신뢰할 수 있는 테스터를 대상으로 연구 프리뷰 제공을 시작했습니다.",
        "content": "구글 딥마인드가 새로운 세계 모델 Genie 4를 발표했습니다. 시뮬레이션 속 세계와 함께 음악, 환경음, 상호작용형 대화를 생성하며, 물리 현상과 사람의 움직임을 더 사실적으로 표현하도록 개선했습니다.\n\n자연어로 날씨를 바꾸거나 카메라를 움직이고, 새로운 사람이나 사물을 장면에 추가할 수 있습니다. Gemini Omni는 현실적인 모습과 행동을 구현하는 기반이 되고, 다른 Gemini 모델들은 추론을 통해 시뮬레이션의 일관성과 연속성을 유지하도록 돕습니다.\n\n현재는 신뢰할 수 있는 테스터에게 연구 프리뷰를 제공하며 피드백을 수집하고 있습니다. 이후 Project Genie의 Google AI Ultra 구독자와 Gemini API·Google AI Studio의 얼리 액세스 파트너부터 제공할 예정입니다.",
        "source": "https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation",
        "officialUrl": "https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation",
        "verifiedAt": "2026-10-31",
        "slug": "google-deepmind-genie-4-world-simulation",
        "tags": [
          "AI",
          "2026-w44",
          "Google / DeepMind",
          "Models"
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261031/124e933a2189.webp",
          "alt": "Genie 4: A new generation of world simulation"
        },
        "en": {
          "title": "Google DeepMind announces Genie 4 with native audio",
          "deck": "The world model supports real-time interaction while generating music, ambient sounds, and dialogue.",
          "summary": "Google DeepMind announced Genie 4, a world model supporting real-time interactive simulation and native audio generation. A research preview has begun rolling out to trusted testers.",
          "content": "Google DeepMind announced Genie 4, its new world model. It generates music, ambient sounds, and interactive dialogue alongside simulated worlds, with improvements to the realism of physics and human movement.\n\nUsers can use natural language to change the weather, move the camera, or introduce a person or object into a scene. Gemini Omni grounds simulations in real-world appearance and behavior, while other Gemini models provide reasoning to help maintain coherence and continuity.\n\nThe research preview is currently rolling out to trusted testers to gather feedback. Subsequent availability is planned to start with Google AI Ultra subscribers in Project Genie and early access partners of the Gemini API and Google AI Studio."
        }
      },
      "sourceWeek": "2026-w44",
      "sourceCompany": "Google / DeepMind",
      "editorial": "Google DeepMind는 실시간 상호작용과 자체 오디오 생성을 지원하는 세계 모델 Genie 4를 발표했습니다. 신뢰할 수 있는 테스터를 대상으로 한 연구 프리뷰이며, 일반 소비자·개발자 대상의 공개 출시는 아닙니다."
    },
    {
      "rank": 3,
      "tier": "normal",
      "post": {
        "date": "10/29",
        "platform": "Web",
        "title": "Mistral, Large 4 개선 모델 가중치 공개",
        "deck": "개선 모델의 가중치를 공개했으며 별도 이용 조건이 있습니다",
        "summary": "Mistral은 앞서 공개 프리뷰로 제공한 Large 4의 개선된 가중치를 공개했습니다. 자체 호스팅과 수정이 가능하지만 Mistral Ecosystem Open-Weight 라이선스가 적용되며, 모델 서비스 사업자의 상업적 이용에는 별도 라이선스 조건이 있습니다.",
        "content": "Mistral은 앞서 공개 프리뷰로 제공한 Large 4의 개선된 가중치를 공개했습니다. 자체 호스팅과 수정이 가능하지만 Mistral Ecosystem Open-Weight 라이선스가 적용되며, 모델 서비스 사업자의 상업적 이용에는 별도 라이선스 조건이 있습니다.\n\n공식 발표의 내용과 게시일을 확인한 것으로, 성능이나 실제 이용 결과를 독립적으로 검증한 것은 아닙니다.",
        "source": "https://mistral.ai/news/mistral-large-4-oss/",
        "officialUrl": "https://mistral.ai/news/mistral-large-4-oss/",
        "verifiedAt": "2026-11-03",
        "slug": "mistral-large-4-weight-release",
        "tags": [
          "Mistral AI",
          "Mistral Large 4 open-weight release",
          "Model"
        ],
        "backupUrls": [
          {
            "label": "Hugging Face 참고 해설",
            "url": "https://huggingface.co/blog/mistral-large4"
          },
          {
            "label": "TestingCatalog 참고 보도",
            "url": "https://www.testingcatalog.com/mistral-opens-large-4-weights-for-coding-and-security/"
          }
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261104/cf200321cc90.svg",
          "alt": "Le Chonk signal"
        },
        "en": {
          "title": "Mistral releases improved Large 4 weights under a custom license",
          "deck": "Mistral released improved Large 4 weights following an earlier public preview.",
          "summary": "Mistral released improved Large 4 weights following an earlier public preview. Its Mistral Ecosystem Open-Weight license allows self-hosting and modification but requires a separate commercial license for commercial Model-as-a-Service use. This is not unrestricted open source, and vendor benchmark results have not been independently reproduced.",
          "content": "Mistral released improved Large 4 weights following an earlier public preview. Its Mistral Ecosystem Open-Weight license allows self-hosting and modification but requires a separate commercial license for commercial Model-as-a-Service use. This is not unrestricted open source, and vendor benchmark results have not been independently reproduced."
        }
      },
      "sourceWeek": "2026-w44",
      "sourceCompany": "Mistral AI",
      "editorial": "Mistral은 앞서 공개 프리뷰로 제공한 Large 4의 개선된 가중치를 공개했습니다. 자체 호스팅과 수정이 가능하지만 Mistral Ecosystem Open-Weight 라이선스가 적용되며, 모델 서비스 사업자의 상업적 이용에는 별도 라이선스 조건이 있습니다."
    },
    {
      "rank": 4,
      "tier": "normal",
      "post": {
        "date": "10/28",
        "platform": "Web",
        "title": "Google·XREAL, 유선 Android XR 안경 AURA 주문 개시",
        "deck": "유선 Android XR 안경의 한국 주문 개시를 Google이 알렸습니다",
        "summary": "Google은 유선 Android XR 안경 XREAL AURA를 발표하고 미국·캐나다·한국에서 당일 주문을 시작한다고 밝혔습니다. Gemini 지원과 별도의 휴대용 연산 장치를 설명하며, 무선 독립형 안경은 아닙니다. 주문 개시가 실제 배송을 증명하지는 않습니다.",
        "content": "Google은 유선 Android XR 안경 XREAL AURA를 발표하고 미국·캐나다·한국에서 당일 주문을 시작한다고 밝혔습니다. Gemini 지원과 별도의 휴대용 연산 장치를 설명하며, 무선 독립형 안경은 아닙니다. 주문 개시가 실제 배송을 증명하지는 않습니다.\n\n공식 발표의 내용과 게시일을 확인한 것으로, 성능이나 실제 이용 결과를 독립적으로 검증한 것은 아닙니다.",
        "source": "https://blog.google/products-and-platforms/platforms/android/xreal-aura/",
        "officialUrl": "https://blog.google/products-and-platforms/platforms/android/xreal-aura/",
        "verifiedAt": "2026-11-03",
        "slug": "google-xreal-aura-orders",
        "tags": [
          "Google",
          "Android XR / XREAL AURA",
          "Hardware"
        ],
        "backupUrls": [
          {
            "label": "TestingCatalog 참고 보도",
            "url": "https://www.testingcatalog.com/google-and-xreal-launch-aura-android-xr-glasses/"
          }
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261104/d7ff93a5407f.webp",
          "alt": "XREAL AURA"
        },
        "en": {
          "title": "Google and XREAL announce AURA orders in Korea and other markets",
          "deck": "Google announced the wired Android XR glasses XREAL AURA and said orders opened that day in the United States, Canada and Korea.",
          "summary": "Google announced the wired Android XR glasses XREAL AURA and said orders opened that day in the United States, Canada and Korea. It describes Gemini support and a separate portable compute device, not wireless standalone glasses. Order availability does not prove delivery or independently tested performance.",
          "content": "Google announced the wired Android XR glasses XREAL AURA and said orders opened that day in the United States, Canada and Korea. It describes Gemini support and a separate portable compute device, not wireless standalone glasses. Order availability does not prove delivery or independently tested performance."
        }
      },
      "sourceWeek": "2026-w44",
      "sourceCompany": "Google",
      "editorial": "Google은 유선 Android XR 안경 XREAL AURA를 발표하고 미국·캐나다·한국에서 당일 주문을 시작한다고 밝혔습니다. Gemini 지원과 별도의 휴대용 연산 장치를 설명하며, 무선 독립형 안경은 아닙니다. 주문 개시가 실제 배송을 증명하지는 않습니다."
    },
    {
      "rank": 5,
      "tier": "normal",
      "post": {
        "date": "10/29",
        "platform": "Web",
        "title": "UMI-Live, 현장에서 양손 로봇 학습 데이터를 수집하는 시스템을 제안했습니다",
        "deck": "사람의 양손 시범을 로봇 학습 데이터로 연결합니다",
        "summary": "UMI-Live 연구진은 카메라·LiDAR 관성 센서·연산 장치를 통합해 현장에서 양손 작업 데이터를 수집하는 시스템을 제안했습니다. 논문 초록은 세 과제의 데이터 40시간을 공개했다고 설명합니다. 한 양손 집기·놓기 과제에서 보고한 성공률은 π₀.₅ 10회 중 10회, MolmoAct2 10회 중 8회이며, 모든 작업에서의 성능이나 독립 재현 결과를 뜻하지 않습니다.",
        "content": "UMI-Live 연구진은 10월 29일 제출한 논문에서 현장용 양손 로봇 데이터 수집 시스템을 소개했습니다. 사람의 양손 시범을 기록하고 로봇 정책 학습에 연결하는 데 초점을 둡니다.\n\n카메라와 LiDAR 관성 센서, 연산 장치와 전원을 통합했습니다. 연구진은 수집 환경에 외부 추적 장비를 설치하거나 보정할 필요가 없다고 설명합니다. 녹화 인터페이스와 비동기 처리 과정, 양팔 로봇 원격 조작 및 정책 학습·추론 소프트웨어도 제시했습니다.\n\n논문 초록은 세 과제에 걸친 데이터 40시간과 하드웨어 설계, 소프트웨어, 재현 안내를 공개했다고 밝힙니다. 양손 집기·놓기 한 과제에서 미세 조정한 π₀.₅는 10회 중 10회, MolmoAct2는 10회 중 8회 성공했다고 보고했습니다. 표본이 작은 특정 과제의 결과이므로 일반적인 로봇 성능으로 확대할 수 없습니다.\n\n이 설명은 논문 초록에 근거합니다. 실험 상세 조건과 장기 운영 안정성, 별도 연구진의 재현 결과는 이 요약만으로 판단할 수 없습니다. 실제 도입 전에는 프로젝트 문서의 하드웨어 구성과 배포 라이선스를 별도로 확인해야 합니다.",
        "source": "https://umi-live.github.io/",
        "officialUrl": "https://umi-live.github.io/",
        "backupUrls": [
          {
            "label": "연구 논문",
            "url": "https://arxiv.org/abs/2610.39385"
          }
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261104/6c1b7a00be21.png",
          "alt": "UMI-Live 휴대형 장치의 카메라·센서·배터리 분해도"
        },
        "verifiedAt": "2026-11-04",
        "slug": "umi-live-bimanual-data",
        "tags": [
          "Physical AI",
          "UMI-Live",
          "Robotics"
        ],
        "en": {
          "title": "UMI-Live proposes in-the-wild bimanual robotics data collection",
          "deck": "Human demonstrations become data for robot policy training.",
          "summary": "The authors describe an integrated bimanual data collection system and report 40 hours across three tasks. On one bimanual pick-and-place task, fine-tuned π₀.₅ succeeded in 10/10 trials and MolmoAct2 in 8/10. These abstract-reported results are not independent replication or general performance guarantees.",
          "content": "The October 29 paper presents an integrated bimanual data collection system with camera and LiDAR-inertial sensing, onboard computing, and power. Its abstract reports 40 hours across three tasks and 10/10 and 8/10 successes for fine-tuned π₀.₅ and MolmoAct2 on one pick-and-place task. The small, task-specific results are author-reported; detailed experimental conditions, deployment licensing, and independent replication require separate review."
        }
      },
      "sourceWeek": "2026-w44",
      "sourceCompany": "UMI-Live",
      "editorial": "UMI-Live 연구진은 카메라·LiDAR 관성 센서·연산 장치를 통합해 현장에서 양손 작업 데이터를 수집하는 시스템을 제안했습니다. 논문 초록은 세 과제의 데이터 40시간을 공개했다고 설명합니다. 한 양손 집기·놓기 과제에서 보고한 성공률은 π₀.₅ 10회 중 10회, MolmoAct2 10회 중 8회이며, 모든 작업에서의 성능이나 독립 재현 결과를 뜻하지 않습니다."
    },
    {
      "rank": 6,
      "tier": "normal",
      "post": {
        "date": "10/29",
        "platform": "Web",
        "title": "Suno, Studio 작업을 돕는 Chat 어시스턴트 소개 글 게시",
        "deck": "Suno는 Chat의 음원 파트 생성·프로젝트 정리 기능을 소개했습니다",
        "summary": "Suno는 10월 29일 공식 글에서 Studio의 Chat이 개별 음원 파트와 플러그인 생성, 프로젝트 정리, 작업 피드백을 돕는다고 설명했습니다. 글에 따르면 Studio는 Premier 구독에 포함됩니다. 글의 게시일이 Chat의 최초 출시일인지는 확인되지 않았으며, 기능을 독립적으로 시험한 결과는 아닙니다.",
        "content": "Suno는 10월 29일 공식 글에서 Studio의 Chat이 개별 음원 파트와 플러그인 생성, 프로젝트 정리, 작업 피드백을 돕는다고 설명했습니다. 글에 따르면 Studio는 Premier 구독에 포함됩니다. 글의 게시일이 Chat의 최초 출시일인지는 확인되지 않았으며, 기능을 독립적으로 시험한 결과는 아닙니다.",
        "source": "https://suno.com/blog/studio-chat-assistant",
        "officialUrl": "https://suno.com/blog/studio-chat-assistant",
        "verifiedAt": "2026-11-03",
        "slug": "suno-studio-chat-assistant",
        "tags": [
          "Suno",
          "Suno Studio",
          "Chat",
          "Audio"
        ],
        "backupUrls": [
          {
            "label": "Suno official blog index",
            "url": "https://suno.com/blog"
          }
        ],
        "thumbnail": {
          "src": "/source-media/weekly-20261104/1bee73b44a69.jpg",
          "alt": "AI-powered chat in Suno Studio"
        },
        "en": {
          "title": "Suno publishes an introduction to its Studio Chat assistant",
          "deck": "Suno describes Chat assistance with stems and project tidying.",
          "summary": "Suno's October 29 article describes Studio Chat assisting with stems, plugins, project tidying and feedback. The article states that Studio is included with every Premier subscription. Its publication date does not establish Chat's first launch, and the described capabilities have not been independently tested.",
          "content": "Suno's October 29 article describes Studio Chat assisting with stems, plugins, project tidying and feedback. The article states that Studio is included with every Premier subscription. Its publication date does not establish Chat's first launch, and the described capabilities have not been independently tested."
        }
      },
      "sourceWeek": "2026-w44",
      "sourceCompany": "Suno",
      "editorial": "Suno는 10월 29일 공식 글에서 Studio의 Chat이 개별 음원 파트와 플러그인 생성, 프로젝트 정리, 작업 피드백을 돕는다고 설명했습니다. 글에 따르면 Studio는 Premier 구독에 포함됩니다. 글의 게시일이 Chat의 최초 출시일인지는 확인되지 않았으며, 기능을 독립적으로 시험한 결과는 아닙니다."
    }
  ],
  "modelWatch": []
};
