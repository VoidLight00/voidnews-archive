import type { WeeklyData } from "../data";

// 2026-10-26~11/1 전 구간. 표시 시각은 한국시간(KST)이며, 발행처가 날짜만 제공한 항목은 날짜만 표시합니다.
export const week44: WeeklyData = {
  "week": 44,
  "year": 2026,
  "slug": "2026-w44",
  "period": "10/26 ~ 11/1",
  "totalPosts": 8,
  "companies": [
    {
      "name": "Google / DeepMind",
      "color": "#4285F4",
      "posts": [
        {
          "date": "10/28",
          "platform": "Web",
          "title": "Google DeepMind, Gemini 4 Carbon 발표했어요",
          "deck": "코딩·장기 작업·사이버보안 역량을 강화하고, 일부 사이버보안 방어 담당자부터 제공해요.",
          "summary": "Google DeepMind가 Gemini 4 Carbon을 발표했어요. 코딩과 장기 작업, 사이버보안 방어 역량을 강화한 모델로, 일부 사이버보안 방어 담당자에게 먼저 제공하고 Fairwind Program을 통해 신뢰할 수 있는 파트너로 접근을 점차 확대할 예정이에요.",
          "content": "Google DeepMind가 Gemini 4 Carbon을 발표했어요. Google은 내부 엔지니어링 작업에서 모델이 며칠 동안 작업을 이어가며 대규모 코드의 복잡한 버그를 추적하고 수정하는 모습을 관찰했다고 밝혔어요.\n\nGoogle이 공개한 안전장치를 적용하지 않은 외부 평가에서 취약점 탐지 SEC-bench Pro는 88.2%, 악용 가능성 검증 ExploitGym은 54.8%, 취약점 수정 CWE-bench는 71.0%를 기록했어요. 제공은 일부 사이버보안 방어 담당자부터 시작하며, 개발자·기업·일반 소비자 대상 제공은 추후 예정이에요.\n\n출시 초기 가격은 토큰 100만 개당 입력 2달러, 출력 10달러이며, 캐시된 입력 토큰은 입력 가격에서 95% 할인돼요. 초기 요금 적용 기간이 끝나면 토큰 100만 개당 입력 4달러, 출력 20달러가 적용돼요.",
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
        {
          "date": "10/27",
          "platform": "Web",
          "title": "구글 딥마인드, 소리까지 생성하는 Genie 4 발표",
          "deck": "세계를 실시간으로 조작하고 음악·환경음·대화를 함께 생성하는 월드 모델이에요.",
          "summary": "구글 딥마인드가 실시간 상호작용 시뮬레이션과 오디오 생성을 지원하는 월드 모델 Genie 4를 발표했어요. 신뢰할 수 있는 테스터를 대상으로 연구 프리뷰 제공을 시작했어요.",
          "content": "구글 딥마인드가 새로운 월드 모델 Genie 4를 발표했어요. 시뮬레이션 속 세계와 함께 음악, 환경음, 상호작용형 대화를 생성하며, 물리 현상과 사람의 움직임을 더 사실적으로 표현하도록 개선했어요.\n\n자연어로 날씨를 바꾸거나 카메라를 움직이고, 새로운 사람이나 사물을 장면에 추가할 수 있어요. Gemini Omni는 현실적인 모습과 행동을 구현하는 기반이 되고, 다른 Gemini 모델들은 추론을 통해 시뮬레이션의 일관성과 연속성을 유지하도록 도와줘요.\n\n현재는 신뢰할 수 있는 테스터에게 연구 프리뷰를 제공하며 피드백을 수집하고 있어요. 이후 Project Genie의 Google AI Ultra 구독자와 Gemini API·Google AI Studio의 얼리 액세스 파트너부터 제공할 예정이에요.",
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
        }
      ]
    },
    {
      "name": "IBM",
      "color": "#0F62FE",
      "posts": [
        {
          "date": "10/29",
          "platform": "Web",
          "title": "IBM, Granite Switch 4.1.1을 공개했어요",
          "deck": "기본 모델은 그대로 두고 음성 인식 모델과 Decision 어댑터를 업데이트했어요.",
          "summary": "IBM이 Granite Switch 4.1과 완전히 하위 호환되는 패치 버전 4.1.1을 공개했어요. 10개 언어의 음성을 텍스트로 변환하는 모델과 Decision 어댑터를 개선했으며, 별도 마이그레이션은 필요하지 않아요.",
          "content": "IBM이 Granite Switch 4.1.1을 공개했어요. 기존 4.1과 완전히 하위 호환되는 패치 버전으로, 별도 마이그레이션 없이 업데이트할 수 있어요.\n\n업데이트된 Granite Speech 음성 인식 모델은 10개 언어를 지원하고 문장부호와 대소문자를 반영해요. 따라서 후속 모델에 전달하기 전에 별도로 형식을 정리할 필요가 없어요. granitelib-core의 Decision 어댑터는 Jev Decision Index 테스트 세트에서 전반적인 성능이 개선됐어요.\n\n새 음성 인식 모델과 Decision 어댑터를 학습한 것 외에는 재계산하지 않았으며, 기본 모델도 변경하지 않았어요. 필요한 최신 어댑터를 조합해 배포하는 방식이에요. IBM은 개발자와 외부 제공자가 직접 어댑터를 만들 수 있도록 튜토리얼과 Adapter SDK를 준비하고 있어요.",
          "source": "https://huggingface.co/blog/ibm-granite/granite-switch-4-1-1",
          "officialUrl": "https://huggingface.co/blog/ibm-granite/granite-switch-4-1-1",
          "verifiedAt": "2026-10-31",
          "slug": "ibm-granite-switch-4-1-1",
          "tags": [
            "AI",
            "2026-w44",
            "IBM",
            "Models"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261031/8deb8fd45642.png",
            "alt": "granite_switch_adapter_swap"
          },
          "en": {
            "title": "IBM releases Granite Switch 4.1.1",
            "deck": "The update improves speech recognition and the Decision adapter while leaving the base model unchanged.",
            "summary": "IBM released Granite Switch 4.1.1, a patch fully backwards compatible with 4.1. It updates the speech-to-text model supporting 10 languages and improves the Decision adapter, with no migration required.",
            "content": "IBM released Granite Switch 4.1.1 as a patch fully backwards compatible with 4.1. The update requires no migration.\n\nThe updated Granite Speech ASR model supports speech-to-text across 10 languages with native punctuation and capitalization, removing the need for a separate formatting pass before downstream models. The Decision adapter in granitelib-core delivers improved overall performance on the Jev Decision Index test set.\n\nApart from training the new ASR model and Decision adapter, nothing was recomputed, and the base model remains unchanged. Users can compose the latest adapters they need and deploy. IBM is working on tutorials and an Adapter SDK so developers and third-party providers can build their own adapters."
          }
        }
      ]
    },
    {
      "name": "NVIDIA",
      "color": "#76B900",
      "posts": [
        {
          "date": "10/28",
          "platform": "Web",
          "title": "NVIDIA, 다국어 음성 모델과 Granary v2 공개했어요",
          "deck": "Nemotron 3.5 Transcribe에 전사·화자 구분·번역·음성 질의응답을 통합했어요.",
          "summary": "NVIDIA가 공개 가중치 음성 모델 Nemotron 3.5 Transcribe와 다국어 데이터·처리 파이프라인 Granary v2를 공개했어요. 자연어 지시로 출력 방식을 조절하고, 도메인 어휘와 억양에 맞춰 모델을 추가 학습할 수 있어요.",
          "content": "NVIDIA가 Nemotron 3.5 Transcribe를 Hugging Face와 ModelScope에 공개했어요. 하나의 모델로 40개 언어를 전사하고, 그중 31개 언어와 영어 간 번역 및 13개 언어의 화자 구분을 지원해요. 최대 1시간 길이의 녹음과 최대 8명의 화자를 처리하며, 실시간 스트리밍이 아닌 녹음된 음성용 모델이에요.\n\nHugging Face Open ASR Leaderboard의 영어 평가에서는 API 모델을 제외한 공개 가중치 모델 중 평균 단어 오류율 5.33%로 1위를 기록했어요. 자연어로 전사 형식이나 전문 용어를 지정할 수 있으며, 음성 질의응답은 영어로 학습됐어요.\n\n함께 공개한 Granary v2 데이터는 48개 언어, 463,062시간 분량이에요. 재사용 가능한 데이터 처리 파이프라인과 NeMo Speech 추가 학습 도구로 도메인에 맞게 조정할 수 있어요. 의료 사례에서는 학습에 포함하지 않은 화자를 평가했을 때, 추가 학습으로 최상의 프롬프트 대비 단어 오류율을 상대적으로 45.8% 줄였어요.",
          "source": "https://huggingface.co/blog/nvidia/nemotron-transcribe-granary",
          "officialUrl": "https://huggingface.co/blog/nvidia/nemotron-transcribe-granary",
          "verifiedAt": "2026-10-31",
          "slug": "nvidia-nemotron-3-5-transcribe-granary-v2",
          "tags": [
            "AI",
            "2026-w44",
            "NVIDIA",
            "Models"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261031/31109775e0dd.png",
            "alt": "Hugging Face Open ASR English Open (2) Leaderboard table showing model rankings on the Hugging Face English Open ASR leaderboard, with columns for rank, model, average WER, RTFx, and dataset scores. nvidia/Nemotron-3.5-Transcribe is ranked first among open-weight models with an average Word Error Rate (WER) of 5.33% and an RTFx of 462.09."
          },
          "en": {
            "title": "NVIDIA introduces Nemotron 3.5 Transcribe and Granary v2",
            "deck": "Nemotron 3.5 Transcribe combines transcription, speaker attribution, translation, and audio Q&A.",
            "summary": "NVIDIA released the open-weight Nemotron 3.5 Transcribe speech model alongside Granary v2 multilingual data and its curation pipeline. Developers can guide outputs with natural-language instructions and fine-tune the model for domain vocabulary and accents.",
            "content": "NVIDIA released Nemotron 3.5 Transcribe on Hugging Face and ModelScope. One model supports transcription in 40 languages, translation between English and 31 of those languages, and speaker attribution in 13. It handles recordings up to one hour long and up to eight speakers, and is designed for recorded audio rather than live streaming.\n\nOn the English track of the Hugging Face Open ASR Leaderboard, it ranks first among open-weight models at 5.33% average word error rate, with API models excluded. Natural-language instructions can specify transcript formatting or domain terminology, while audio Q&A is trained in English.\n\nThe accompanying Granary v2 data release covers 463,062 hours across 48 languages. Its reusable curation pipeline and NeMo Speech fine-tuning tools support domain adaptation. In a medical case study evaluated on held-out speakers, fine-tuning reduced word error rate by 45.8% relative to the best prompt."
          }
        }
      ]
    },
    {
      "name": "Google",
      "color": "#4285F4",
      "posts": [
        {
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
        }
      ]
    },
    {
      "name": "Mistral AI",
      "color": "#FA520F",
      "posts": [
        {
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
        }
      ]
    },
    {
      "name": "Suno",
      "color": "#6B7280",
      "posts": [
        {
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
        }
      ]
    },
    {
      "name": "UMI-Live",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/29",
          "platform": "Web",
          "title": "UMI-Live, 현장에서 양손 로봇 학습 데이터를 수집하는 시스템을 제안했습니다",
          "deck": "사람의 양손 시범을 로봇 학습 데이터로 연결합니다",
          "summary": "UMI-Live 연구진은 카메라·LiDAR 관성 센서·연산 장치를 통합해 현장에서 양손 작업 데이터를 수집하는 시스템을 제안했습니다. 논문 초록은 세 과제의 데이터 40시간을 공개했다고 설명합니다. 한 양손 집기·놓기 과제에서 보고한 성공률은 π₀.₅ 10회 중 10회, MolmoAct2 10회 중 8회이며, 모든 작업에서의 성능이나 독립 재현 결과를 뜻하지 않습니다.",
          "content": "UMI-Live 연구진은 10월 29일 제출한 논문에서 현장용 양손 로봇 데이터 수집 시스템을 소개했습니다. 사람의 양손 시범을 기록하고 로봇 정책 학습에 연결하는 데 초점을 둡니다.\n\n카메라와 LiDAR 관성 센서, 연산 장치와 전원을 통합했습니다. 연구진은 수집 환경에 외부 추적 장비를 설치하거나 보정할 필요가 없다고 설명합니다. 녹화 인터페이스와 비동기 처리 과정, 양팔 로봇 원격 조작 및 정책 학습·추론 소프트웨어도 제시했습니다.\n\n논문 초록은 세 과제에 걸친 데이터 40시간과 하드웨어 설계, 소프트웨어, 재현 안내를 공개했다고 밝힙니다. 양손 집기·놓기 한 과제에서 미세 조정한 π₀.₅는 10회 중 10회, MolmoAct2는 10회 중 8회 성공했다고 보고했습니다. 표본이 작은 특정 과제의 결과이므로 일반적인 로봇 성능으로 확대할 수 없습니다.\n\n이 설명은 논문 초록에 근거합니다. 실험 상세 조건과 장기 운영 안정성, 별도 연구진의 재현 결과는 이 요약만으로 판단할 수 없습니다. 실제 도입 전에는 프로젝트 문서의 하드웨어 구성과 배포 라이선스를 별도로 확인해야 합니다.",
          "source": "https://umi-live.github.io/",
          "officialUrl": "https://umi-live.github.io/",
          "backupUrls": [{"label": "연구 논문", "url": "https://arxiv.org/abs/2610.39385"}],
          "thumbnail": {"src": "/source-media/weekly-20261104/6c1b7a00be21.png", "alt": "UMI-Live 휴대형 장치의 카메라·센서·배터리 분해도"},
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
        }
      ]
    }
  ]
};
