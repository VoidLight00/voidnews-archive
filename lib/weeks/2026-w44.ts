import type { WeeklyData } from "../data";

// Partial week: 2026-10-31까지 수집한 구간만 담았습니다. 11/1~1은 다음 수집에서 채웁니다. 표시 시각은 한국시간(KST)이며, 발행처가 날짜만 제공한 항목은 날짜만 표시합니다.
export const week44: WeeklyData = {
  "week": 44,
  "year": 2026,
  "slug": "2026-w44",
  "period": "10/26 ~ 11/1",
  "totalPosts": 4,
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
    }
  ]
};
