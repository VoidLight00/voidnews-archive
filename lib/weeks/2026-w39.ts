import type { WeeklyData } from "../data";

// Partial week: 2026-09-22까지 수집한 구간만 담았습니다. 9/23~27은 다음 수집에서 채웁니다. 표시 시각은 한국시간(KST)입니다.
export const week39: WeeklyData = {
  "week": 39,
  "year": 2026,
  "slug": "2026-w39",
  "period": "9/21 ~ 9/27",
  "totalPosts": 13,
  "companies": [
    {
      "name": "Google",
      "color": "#4285F4",
      "posts": [
        {
          "date": "9/21",
          "platform": "Web",
          "title": "Google, 에이전트 하네스 자기개선 논문 RRSI 공개",
          "deck": "자기개선 과정의 과적합을 줄이고 정책 토큰도 30% 아꼈습니다",
          "summary": "구글 연구진이 에이전트 하네스의 자기개선 과정에서 과적합을 줄이는 방법 RRSI를 제안했습니다. 8개 벤치마크 실험에서 성능 향상과 함께 정책 토큰 사용량을 30% 줄인 결과를 보고했습니다.",
          "content": "구글 연구진이 에이전트 하네스가 스스로를 개선하는 과정에서 특정 과제에만 맞춰지는 문제를 줄이는 방법인 RRSI(Regularized Recursive Self-Improvement)를 제안했습니다. 에이전트 하네스란 모델이 도구를 쓰고 계획을 세우는 실행 구조를 뜻하며, 이를 자동으로 고쳐 나가는 과정을 규제 조건으로 통제하는 방식입니다.\n\n논문은 코딩, 에이전트형 작업 환경, 엔지니어링 설계 과제를 포함한 8개 벤치마크에서 실험한 결과를 보고합니다. 훈련에 쓴 벤치마크에서는 최대 14.1점, 훈련에 쓰지 않은 5개 벤치마크에서는 최대 4.7점의 성능 향상을 확인했다고 밝혔습니다. 동시에 규제 없이 자기개선한 버전보다 정책 토큰을 30% 적게 쓰는 더 효율적인 하네스가 나왔다고 설명했습니다.\n\n코드는 google-research GitHub 조직을 통해 공개됐으며, 논문은 2026년 9월 21일 arXiv에 처음 올라왔습니다.",
          "source": "https://arxiv.org/abs/2609.24972",
          "officialUrl": "https://arxiv.org/abs/2609.24972",
          "verifiedAt": "2026-09-22",
          "slug": "rrsi-regularized-recursive-self-improvement",
          "tags": [
            "AI",
            "2026-w39",
            "Google",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face 데일리 페이퍼 목록",
              "url": "https://huggingface.co/papers/2609.24972"
            }
          ],
          "en": {
            "title": "Google publishes RRSI, a regularized self-improvement method for agent harnesses",
            "deck": "Curbs overfitting when an agent harness edits itself, and cuts token use 30%",
            "summary": "Google researchers proposed RRSI, a method that reduces overfitting when an agent harness improves itself. Across eight benchmarks, it reports performance gains alongside a 30% reduction in policy token usage.",
            "content": "Google researchers proposed RRSI (Regularized Recursive Self-Improvement), a method that curbs overfitting when an agent harness — the execution structure a model uses to call tools and plan — automatically edits itself over time. RRSI applies regularization to constrain that self-editing process.\n\nThe paper reports results across eight benchmarks spanning coding, agentic workspace, and engineering-design tasks. It says RRSI gains up to 14.1 points on the benchmark split the harness evolves against, and up to 4.7 points on five out-of-distribution benchmarks it was not trained on. It also reports the resulting harness runs on 30% fewer policy tokens than the unregularized version.\n\nThe code is released under the google-research GitHub organization, and the paper first appeared on arXiv on September 21, 2026."
          }
        }
      ]
    },
    {
      "name": "Comfy Org",
      "color": "#7C3AED",
      "posts": [
        {
          "date": "9/21 16:35",
          "platform": "Web",
          "title": "ComfyUI 0.37.0, GPT Image 2 투명배경 지원 추가",
          "deck": "투명 배경 GPT Image 2 노드와 MoGe 3, YuE2 CFG 조절이 추가됐습니다",
          "summary": "Comfy Org가 노드 기반 생성 도구 ComfyUI 0.37.0을 냈습니다. OpenAI GPT Image 2 파트너 노드에 투명 배경 생성 기능을 더하고, 3D 형상 추정 모델 MoGe 3 지원과 음악 생성 노드 YuE2의 CFG 조절 옵션을 새로 넣었습니다.",
          "content": "Comfy Org가 노드 기반 이미지·영상 생성 도구 ComfyUI의 0.37.0 버전을 냈습니다. 이번 업데이트의 핵심은 OpenAI GPT Image 2 파트너 노드에 투명 배경 생성 기능을 추가한 것입니다. 이제 배경이 없는 이미지를 바로 만들어 합성 작업에 붙여 쓸 수 있습니다.\n\n3차원 형상을 추정하는 MoGe 3 모델 지원도 새로 들어갔습니다. 음악 생성 노드인 YuE2에는 CFG(분류자유 가이던스) 강도를 조절하는 옵션이 붙어 생성 결과를 더 세밀하게 다듬을 수 있게 됐습니다.\n\n이 밖에 디스크 속도가 빠른 환경에서 자동으로 --fast-disk 옵션을 켜는 개선도 포함됐습니다. ComfyUI는 GPL-3.0 라이선스로 배포되는 오픈소스 프로젝트이며, GitHub 스타 수는 13만 4000개를 넘었습니다.\n\nGitHub 릴리스 시각은 UTC 기준 오전 7시 35분이며, 한국시간으로 환산하면 오후 4시 35분입니다.",
          "source": "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.37.0",
          "officialUrl": "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.37.0",
          "verifiedAt": "2026-09-22",
          "slug": "comfyui-0-37-0-gpt-image-2-transparent-background",
          "tags": [
            "AI",
            "2026-w39",
            "Comfy Org",
            "Open Source"
          ],
          "backupUrls": [
            {
              "label": "ComfyUI repo homepage",
              "url": "https://github.com/Comfy-Org/ComfyUI"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/006c94cfd9bc.png",
            "alt": "Release v0.37.0 · Comfy-Org/ComfyUI",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "ComfyUI 0.37.0 adds transparent-background support for GPT Image 2",
            "deck": "Adds transparent-background GPT Image 2 support, MoGe 3, and YuE2 CFG control",
            "summary": "Comfy Org released ComfyUI 0.37.0, adding transparent-background generation to the OpenAI GPT Image 2 partner node, support for the MoGe 3 depth-estimation model, and a CFG strength control for the YuE2 music-generation node.",
            "content": "Comfy Org released ComfyUI 0.37.0. The headline addition is transparent-background support for the OpenAI GPT Image 2 partner node, letting users generate backgroundless images directly for compositing work.\n\nThe update also adds support for the MoGe 3 depth-estimation model. The YuE2 music-generation node gained a CFG (classifier-free guidance) strength control, giving finer control over generated output.\n\nThe release also auto-enables a --fast-disk option on fast storage. ComfyUI is distributed under the GPL-3.0 license and has passed 134,000 stars on GitHub.\n\nThe GitHub release timestamp is 07:35 UTC, which converts to 16:35 KST."
          }
        }
      ]
    },
    {
      "name": "GitHub",
      "color": "#24292F",
      "posts": [
        {
          "date": "9/21 23:54",
          "platform": "Web",
          "title": "GitHub Copilot에 xAI Grok 4.7 모델 추가",
          "deck": "Pro/Pro+/Max/Business/Enterprise 요금제에 순차 적용됩니다",
          "summary": "GitHub가 코딩 어시스턴트 Copilot에 xAI의 Grok 4.7 모델을 추가했습니다. Copilot Pro, Pro+, Max, Business, Enterprise 요금제에 순차 적용되며, 모델 선택 화면에서 고를 수 있습니다.",
          "content": "GitHub가 코딩 어시스턴트 GitHub Copilot에 xAI의 최신 추론 모델 Grok 4.7을 추가했습니다. Copilot Pro, Pro+, Max, Business, Enterprise 요금제에 순차적으로 적용되며, 사용자는 Copilot의 모델 선택 화면에서 Grok 4.7을 고를 수 있습니다.\n\nGrok 4.7은 이전 모델인 Grok 4.6을 기반으로 하며, 에이전트형 코딩과 여러 단계를 거치는 복잡한 작업 흐름을 처리하도록 설계됐습니다. 기업 관리자는 조직 내 접근 정책을 통해 이 모델의 사용 범위를 제어할 수 있습니다.\n\n이번 추가로 Copilot 사용자는 기존 모델 외에 xAI 모델까지 같은 화면에서 골라 쓸 수 있게 됐습니다. 배포는 단계적으로 진행되며 모든 사용자에게 한 번에 열리지는 않습니다.\n\n같은 날 xAI도 자체 채널을 통해 Grok 4.7을 별도로 공개했습니다. 두 발표는 같은 모델을 다루지만 이 카드는 GitHub Copilot 통합에 초점을 맞춥니다.\n\n게시 시각은 태평양 기준 오전 7시 54분(UTC 기준 오후 2시 54분)이며, 한국시간으로 환산하면 밤 11시 54분입니다.",
          "source": "https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot",
          "officialUrl": "https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot",
          "verifiedAt": "2026-09-22",
          "slug": "grok-4-7-github-copilot",
          "tags": [
            "AI",
            "2026-w39",
            "GitHub",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "xAI 공식 Grok 4.7 발표 (동일 모델, 별도 카드)",
              "url": "https://x.ai/news/grok-4-7"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/6995ec089069.png",
            "alt": "The Copilot model picker showing Grok 4.7"
          },
          "en": {
            "title": "GitHub Copilot adds xAI's Grok 4.7 model",
            "deck": "Rolling out gradually across Copilot Pro, Pro+, Max, Business, and Enterprise plans",
            "summary": "GitHub added xAI's Grok 4.7 to GitHub Copilot, rolling out to Pro, Pro+, Max, Business, and Enterprise plans, selectable from Copilot's model picker.",
            "content": "GitHub added xAI's latest reasoning model, Grok 4.7, to GitHub Copilot. It is rolling out to Copilot Pro, Pro+, Max, Business, and Enterprise plans, selectable from Copilot's model picker.\n\nGrok 4.7 builds on the earlier Grok 4.6 and is designed for agentic coding and complex, multistep workflows. Administrators can control access to the model through organization-level policies.\n\nWith this addition, Copilot users can now choose an xAI model alongside existing model options in the same picker. The rollout is gradual and is not available to every user immediately.\n\nOn the same day, xAI separately announced Grok 4.7 through its own channels. Both posts cover the same model, but this card focuses on the GitHub Copilot integration.\n\nThe post's timestamp is 07:54 PDT (14:54 UTC), which converts to 23:54 KST."
          }
        }
      ]
    },
    {
      "name": "LangChain",
      "color": "#6B7280",
      "posts": [
        {
          "date": "9/21",
          "platform": "Web",
          "title": "LangChain, LangSmith Evals에 Jev 모델 통합",
          "deck": "하네스 튜토리얼과 저지 활용에 이은 평가 파이프라인 통합 단계입니다",
          "summary": "LangChain이 자사 Jev 모델을 평가 플랫폼 LangSmith Evals에서 쓸 수 있도록 했습니다. 앞서 올린 하네스 활용 글, Jev-as-a-Judge 글에 이어지는 통합 단계입니다.",
          "content": "LangChain이 자사가 개발한 Jev 모델을 평가 플랫폼 LangSmith Evals에서 쓸 수 있도록 공개했습니다. LangSmith Evals는 에이전트나 LLM 애플리케이션이 낸 출력을 자동으로 채점하고 여러 버전을 비교하는 LangChain의 평가 도구로, LangSmith 플랫폼의 한 축을 이룹니다.\n\n이번 발표는 LangChain이 앞서 올린 두 편의 글을 잇는 단계입니다. 첫 글에서는 Jev를 활용해 에이전트 하네스를 구성하는 방법을 다뤘고, 두 번째 글에서는 Jev를 평가자로 쓰는 'Jev-as-a-Judge' 방식을 소개했습니다. 이번 글로 이어진 세 편의 시리즈는 Jev를 소개하고, 평가자로 쓰는 방법을 보여준 뒤, 마지막으로 LangSmith Evals 안에서 직접 선택해 쓸 수 있는 단계까지 이어졌습니다.\n\n지금은 개발자가 LangSmith Evals에서 평가 모델 목록 중 하나로 Jev를 선택해 평가 파이프라인을 구성할 수 있는 상태입니다.",
          "source": "https://www.langchain.com/blog/jev-is-now-available-in-langsmith-evals",
          "officialUrl": "https://www.langchain.com/blog/jev-is-now-available-in-langsmith-evals",
          "verifiedAt": "2026-09-22",
          "slug": "jev-langsmith-evals-integration",
          "tags": [
            "AI",
            "2026-w39",
            "LangChain",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/37353467973a.png",
            "alt": "Jev is now available in LangSmith Evals"
          },
          "en": {
            "title": "LangChain integrates Jev into LangSmith Evals",
            "deck": "Completes a three-part series: harness tutorial, judge use, now evals integration",
            "summary": "LangChain made its Jev model available inside LangSmith Evals, completing the integration path started with earlier posts on using Jev in an agent harness and as a judge.",
            "content": "LangChain published its own Jev model as an option inside LangSmith Evals, its evaluation tool for automatically scoring and comparing outputs from agents and LLM applications within the LangSmith platform.\n\nThe announcement follows two earlier LangChain posts. The first covered building an agent harness that uses Jev, and the second introduced 'Jev-as-a-Judge,' using Jev as an evaluator. Together, the three posts move from introducing Jev, to using it as a judge, to making it directly selectable inside LangSmith Evals.\n\nDevelopers can now pick Jev from the list of evaluation models in LangSmith Evals to build an evaluation pipeline."
          }
        }
      ]
    },
    {
      "name": "Meshy",
      "color": "#0D9488",
      "posts": [
        {
          "date": "9/21",
          "platform": "Web",
          "title": "Meshy, UV 언랩을 흐름 매칭으로 푸는 SeamFlow 연구 공개",
          "deck": "에너지 최소화나 순차 생성 대신 연속 생성으로 이음선을 찾습니다",
          "summary": "Meshy가 홍콩시립대, Bambu Lab, 난양이공대와 함께 진행한 SeamFlow 연구를 공개했습니다. UV 언랩핑의 이음선 배치 문제를 엣지 확률에 대한 흐름 매칭으로 다시 정의했으며, SIGGRAPH Asia 2026에 채택됐습니다.",
          "content": "Meshy가 홍콩시립대학교, Bambu Lab, 난양이공대학교와 함께 진행한 연구 SeamFlow를 공개했습니다. 3D 모델의 표면을 평면 텍스처로 펼치는 UV 언랩핑 작업에서 이음선(심)을 찾는 방식을 새로 제안한 연구로, SIGGRAPH Asia 2026에 채택됐습니다.\n\n기존 방식은 이음선 배치를 에너지 최소화 문제로 풀거나, 문장을 쓰듯 이음선을 하나씩 순서대로 만들어내는 자기회귀 방식을 썼습니다. 연구진은 이런 방식이 투영 오차, 순서에 따른 편향, 느린 디코딩 속도 같은 한계를 가진다고 짚었습니다.\n\nSeamFlow는 이음선 배치 문제 전체를 엣지 확률에 대한 흐름 매칭으로 다시 정의해, 연속적인 생성 과정으로 이음선을 한 번에 만들어냅니다. 연구진은 논문에서 '최소 에너지 컷을 최적화하거나 문장을 쓰듯 이음선을 하나씩 내보내는 대신, 문제 전체를 연속 생성으로 다시 세운다'고 설명했습니다.",
          "source": "https://www.meshy.ai/blog/seamflow-flow-matching-uv-unwrapping",
          "officialUrl": "https://www.meshy.ai/blog/seamflow-flow-matching-uv-unwrapping",
          "verifiedAt": "2026-09-22",
          "slug": "meshy-seamflow-uv-unwrapping",
          "tags": [
            "AI",
            "2026-w39",
            "Meshy",
            "Research"
          ],
          "en": {
            "title": "Meshy publishes SeamFlow, a flow-matching approach to UV unwrapping",
            "deck": "Reframes UV seam placement as one continuous flow-matching generation step",
            "summary": "Meshy published SeamFlow, research with City University of Hong Kong, Bambu Lab, and Nanyang Technological University that reframes UV-seam placement as flow matching over edge probabilities. It was accepted to SIGGRAPH Asia 2026.",
            "content": "Meshy published SeamFlow, research conducted with City University of Hong Kong, Bambu Lab, and Nanyang Technological University. The work proposes a new way to place seams during UV unwrapping — the process of flattening a 3D model's surface into a 2D texture — and has been accepted to SIGGRAPH Asia 2026.\n\nPrior methods either treated seam placement as an energy-minimization problem or generated seams one at a time autoregressively, as if writing a sentence. The researchers note this approach suffers from projection error, ordering bias, and slow decoding.\n\nSeamFlow reframes the entire seam-placement problem as flow matching over edge probabilities, generating seams through a single continuous process instead. As the paper puts it: 'Rather than continuing down the path of optimizing for a minimum-energy cut, or emitting seams one at a time as though writing a sentence, we restate the whole problem as continuous generation.'"
          }
        }
      ]
    },
    {
      "name": "Meta",
      "color": "#0866FF",
      "posts": [
        {
          "date": "9/21 21:00",
          "platform": "Web",
          "title": "Meta, 페타비트급 대서양 해저케이블 'Petal' 공개",
          "deck": "프랑스와 미국을 약 7000km, 2029년 완공 목표로 잇습니다",
          "summary": "Meta가 새 해저 케이블 프로젝트 'Petal'을 공개했습니다. 프랑스와 미국을 약 7000km 구간으로 잇는 이 케이블은 대서양 횡단 구간에서 초당 1페타비트 용량을 내는 첫 해저 케이블을 목표로 하며, 완공 목표는 2029년 무렵입니다.",
          "content": "Meta가 새로운 해저 케이블 프로젝트 'Petal'을 공개했습니다. 프랑스와 미국을 약 7000km 구간으로 잇는 이 케이블은 대서양을 건너는 구간에서 페타비트급, 즉 초당 1페타비트(1000Tbps) 용량을 내는 첫 해저 케이블을 목표로 합니다.\n\nMeta는 앞서 진행해 온 해저 케이블 프로그램의 다음 단계로 Petal을 소개하며, 완공 목표 시점을 2029년 무렵으로 제시했습니다. 회사는 이 케이블이 늘어나는 데이터센터 간 트래픽과 AI 인프라 수요를 뒷받침할 것이라고 설명했습니다.\n\nMeta는 이미 여러 해저 케이블 프로젝트를 진행해 온 상태이며, Petal은 그중 대서양 횡단 구간에서 용량을 한 단계 끌어올리는 프로젝트로 자리매김합니다.\n\n게시 시각은 UTC 기준 낮 12시이며, 한국시간으로 환산하면 밤 9시입니다.",
          "source": "https://engineering.fb.com/2026/09/21/connectivity/petal-petabit-transoceanic-subsea-cable/",
          "officialUrl": "https://engineering.fb.com/2026/09/21/connectivity/petal-petabit-transoceanic-subsea-cable/",
          "verifiedAt": "2026-09-22",
          "slug": "meta-petal-subsea-cable",
          "tags": [
            "AI",
            "2026-w39",
            "Meta",
            "Research"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/2eb2f60b2248.jpg",
            "alt": "Inside Petal: Building the World’s First Petabit-Class Transoceanic Subsea Cable"
          },
          "en": {
            "title": "Meta unveils Petal, a petabit-class transatlantic subsea cable",
            "deck": "Targets 2029 completion for a ~7,000km France-US transatlantic link",
            "summary": "Meta unveiled Petal, a new subsea cable spanning roughly 7,000km between France and the US, aiming to be the first transoceanic cable delivering petabit-class (1 petabit/sec) capacity, targeted for completion around 2029.",
            "content": "Meta unveiled a new subsea cable project called Petal. Spanning roughly 7,000 kilometers between France and the United States, it aims to become the first subsea cable to deliver petabit-class capacity — 1 petabit (1,000 Tbps) per second — across a transoceanic route.\n\nMeta describes Petal as the next step in its ongoing subsea cable program, with a targeted completion around 2029. The company says the cable is meant to support growing data-center-to-data-center traffic and AI infrastructure demand.\n\nMeta already operates several subsea cable projects, and Petal is positioned to raise transatlantic capacity by another step.\n\nThe post's timestamp is 12:00 UTC, which converts to 21:00 KST."
          }
        }
      ]
    },
    {
      "name": "Multiverse Computing",
      "color": "#334155",
      "posts": [
        {
          "date": "9/21 22:44",
          "platform": "Web",
          "title": "Multiverse Computing, 물리학 기법으로 LLM 프루닝 연구",
          "deck": "블록 제거를 이징 모델 최적화 문제로 바꿔 압축 후보를 고릅니다",
          "summary": "Multiverse Computing 연구진이 LLM 프루닝을 이징(Ising) 모델 최적화 문제로 다시 세운 연구를 공개했습니다. Hugging Face 블로그에 실렸지만 작성 주체는 Hugging Face가 아닌 Multiverse Computing 연구자입니다.",
          "content": "Multiverse Computing 연구진이 대규모 언어모델을 가볍게 만드는 프루닝(가지치기) 기법을 물리학의 이징(Ising) 모델 최적화 문제로 다시 세운 연구를 공개했습니다. 이 글은 Hugging Face 블로그 플랫폼에 올라왔지만, 작성 주체는 Hugging Face가 아니라 Multiverse Computing 연구자 안토니오 티에네와 알리 하셰미입니다.\n\n연구는 모델에서 통째로 들어낼 블록(층 단위 구성 요소)을 고르는 문제를 이징 모델의 에너지 최소화 문제로 바꿔 풀었습니다. 어떤 블록들을 함께 남기고 어떤 블록들을 함께 지울지 상호작용 항으로 표현해, 블록을 하나씩 따로 평가할 때보다 더 나은 조합을 찾는 접근입니다.\n\n이 글은 2026년 9월 21일에 게시됐으며, 공식 제품 발표가 아니라 Hugging Face의 커뮤니티 블로그 프로그램을 통해 나온 기술 연구 게시물입니다.\n\n게시 시각은 UTC 기준 오후 1시 44분이며, 한국시간으로 환산하면 밤 10시 44분입니다.",
          "source": "https://huggingface.co/blog/MultiverseComputingCAI/pruning-llms-like-a-physicist-block-removal-as-an",
          "officialUrl": "https://huggingface.co/blog/MultiverseComputingCAI/pruning-llms-like-a-physicist-block-removal-as-an",
          "verifiedAt": "2026-09-22",
          "slug": "multiverse-computing-llm-pruning-ising",
          "tags": [
            "AI",
            "2026-w39",
            "Multiverse Computing",
            "Research"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/f94455df4221.png",
            "alt": "Sketch of the method: block removal is cast as a constrained binary optimization / Ising problem whose low-energy states correspond to high-performing pruned models."
          },
          "en": {
            "title": "Multiverse Computing reframes LLM pruning as a physics optimization problem",
            "deck": "Recasts LLM block pruning as an Ising-model energy-minimization problem",
            "summary": "Researchers at Multiverse Computing published a post recasting LLM pruning as an Ising-model optimization problem. It is hosted on Hugging Face's blog platform but authored by Multiverse Computing researchers, not Hugging Face staff.",
            "content": "Researchers at Multiverse Computing published a post reframing LLM pruning — the process of removing blocks to make large language models smaller — as an Ising-model optimization problem from physics. The post is hosted on Hugging Face's blog platform, but its authors are Multiverse Computing researchers Antonio Tiene and Ali Hashemi, not Hugging Face staff.\n\nThe work casts the problem of choosing which blocks (layer-level components) to remove as an energy-minimization problem drawn from the Ising model, representing which blocks should be kept or removed together as interaction terms. This is meant to find better combinations than evaluating each block in isolation.\n\nThe post was published on September 21, 2026. It is a technical research post distributed through Hugging Face's community blog program, not an official Hugging Face product announcement.\n\nThe post's timestamp is 13:44 UTC, which converts to 22:44 KST."
          }
        }
      ]
    },
    {
      "name": "NVIDIA",
      "color": "#76B900",
      "posts": [
        {
          "date": "9/21",
          "platform": "Web",
          "title": "NVIDIA, Dynamo-Triton에 TensorRT 멀티 GPU 서빙 통합",
          "deck": "GPU 한 장을 넘는 모델을 여러 장에 나눠 서빙하기 쉬워집니다",
          "summary": "NVIDIA가 여러 GPU에 걸쳐 모델을 서빙하는 작업을 단순화하는 TensorRT 멀티 디바이스 통합 기능을 NVIDIA Dynamo-Triton에 추가했습니다. 단일 GPU 용량을 넘는 모델을 다루는 팀을 대상으로 합니다.",
          "content": "NVIDIA가 여러 GPU에 걸쳐 모델을 서빙하는 작업을 단순화하는 TensorRT 멀티 디바이스 통합 기능을 NVIDIA Dynamo-Triton에 추가했다고 밝혔습니다. 생성형 AI 컴퓨팅 수요가 커지면서 한 장의 GPU가 감당하는 메모리나 연산 능력을 넘어서는 모델이 늘고 있는데, 이런 모델을 여러 GPU에 나눠 서빙하는 과정을 다루는 기능입니다.\n\nNVIDIA Dynamo-Triton은 추론 서버 프레임워크로, 이번 통합을 통해 TensorRT 엔진을 여러 GPU 장치에 걸쳐 실행하는 설정을 지원합니다. NVIDIA는 이를 통해 단일 GPU 용량을 넘는 모델의 서빙 구성을 더 쉽게 만드는 것이 목표라고 설명했습니다.\n\n이 발표는 NVIDIA 개발자 블로그에 2026년 9월 21일 게시됐습니다.",
          "source": "https://developer.nvidia.com/blog/simplifying-model-serving-across-multiple-gpus-with-nvidia-tensorrt-multi-device-integration-in-nvidia-dynamo-triton/",
          "officialUrl": "https://developer.nvidia.com/blog/simplifying-model-serving-across-multiple-gpus-with-nvidia-tensorrt-multi-device-integration-in-nvidia-dynamo-triton/",
          "verifiedAt": "2026-09-22",
          "slug": "nvidia-tensorrt-multi-device-dynamo-triton",
          "tags": [
            "AI",
            "2026-w39",
            "NVIDIA",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/e258363310ea.webp",
            "alt": "Simplifying Model Serving Across Multiple GPUs with NVIDIA TensorRT Multi-Device Integration in NVIDIA Dynamo-Triton | NVIDIA Technical Blog"
          },
          "en": {
            "title": "NVIDIA integrates TensorRT multi-device serving into Dynamo-Triton",
            "deck": "Makes serving models that exceed one GPU's capacity easier across multiple GPUs",
            "summary": "NVIDIA added TensorRT multi-device inference integration to NVIDIA Dynamo-Triton, simplifying serving for models that exceed a single GPU's memory or compute capacity.",
            "content": "NVIDIA said it added TensorRT multi-device inference integration to NVIDIA Dynamo-Triton, simplifying the work of serving models across multiple GPUs. As generative AI compute demand grows, more models exceed what a single GPU can hold in memory or compute, and this integration addresses splitting such models across multiple GPUs.\n\nNVIDIA Dynamo-Triton is an inference-serving framework, and this integration lets it run TensorRT engines across multiple GPU devices. NVIDIA said the goal is to make serving configurations easier for models that exceed single-GPU capacity.\n\nThe announcement was published on NVIDIA's developer blog on September 21, 2026."
          }
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "9/22 13:26",
          "platform": "Web",
          "title": "OpenAI Codex Rust 0.157.0-alpha.5 출시",
          "deck": "러스트로 다시 쓰는 Codex의 알파 5번째 빌드입니다",
          "summary": "OpenAI가 커맨드라인 코딩 에이전트 Codex의 러스트 구현체 버전 0.157.0-alpha.5를 냈습니다. 러스트로 다시 짜는 작업 중 나온 알파 단계 빌드입니다.",
          "content": "OpenAI가 커맨드라인 코딩 에이전트 Codex의 러스트(Rust) 구현체에서 버전 0.157.0-alpha.5를 냈습니다. Codex는 기존 구현을 러스트로 다시 짜는 작업을 진행 중이며, 이번 릴리스는 그 과정에서 나온 알파 단계 빌드 중 하나입니다.\n\nGitHub 릴리스 페이지에는 이번 버전만을 위한 별도의 변경 내역 설명이 붙어 있지 않고, 태그명과 배포 시각만 확인할 수 있습니다. alpha 버전 번호가 빠르게 올라가는 점에서 개발팀이 짧은 주기로 빌드를 내보내며 다듬어 가는 단계임을 짐작할 수 있습니다.\n\n알파 릴리스는 정식 서비스 환경보다는 최신 변경 사항을 미리 확인하려는 개발자를 위한 빌드입니다.\n\nGitHub 배포 시각은 UTC 기준 오전 4시 26분이며, 한국시간으로 환산하면 오후 1시 26분입니다.",
          "source": "https://github.com/openai/codex/releases/tag/rust-v0.157.0-alpha.5",
          "officialUrl": "https://github.com/openai/codex/releases/tag/rust-v0.157.0-alpha.5",
          "verifiedAt": "2026-09-22",
          "slug": "openai-codex-rust-0-157-0-alpha-5",
          "tags": [
            "AI",
            "2026-w39",
            "OpenAI",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/22acbba9f8ad.png",
            "alt": "Release 0.157.0-alpha.5 · openai/codex",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "OpenAI ships Codex Rust v0.157.0-alpha.5",
            "deck": "An alpha build from OpenAI's ongoing Rust rewrite of Codex",
            "summary": "OpenAI shipped v0.157.0-alpha.5 of Codex's Rust implementation, an alpha-stage build from its ongoing rewrite of the command-line coding agent.",
            "content": "OpenAI shipped v0.157.0-alpha.5 of Codex's Rust implementation. Codex is OpenAI's command-line coding agent, currently being rewritten in Rust, and this release is one of the alpha-stage builds from that ongoing rewrite.\n\nThe GitHub release page does not include a dedicated changelog for this specific version — only the tag name and publish timestamp are confirmed. The rapidly incrementing alpha version number suggests the team is shipping builds on a short cycle as it refines the rewrite.\n\nAlpha releases like this one are aimed at developers who want to try the latest changes early, rather than at production use.\n\nThe GitHub publish timestamp is 04:26 UTC, which converts to 13:26 KST."
          }
        },
        {
          "date": "9/22 11:36",
          "platform": "Web",
          "title": "OpenAI Python SDK 3.17.0, 안전 케이스·웹훅 기능 추가",
          "deck": "외부 저장소 설정, 세이프티 케이스 조회, 웹훅 이벤트가 새로 생겼습니다",
          "summary": "OpenAI가 파이썬 SDK 버전 3.17.0을 냈습니다. 외부 저장소 설정 관리, 세이프티 케이스 조회 기능과 함께 안전 경고·비활성화 웹훅, 세션 환경 초기화 이벤트, SIP 미디어 보안 처리가 추가됐습니다.",
          "content": "OpenAI가 파이썬 SDK 버전 3.17.0을 냈습니다. 이번 업데이트에는 외부 저장소 설정을 관리하는 기능, 세이프티 케이스(안전 사례) 조회 기능이 새로 들어갔습니다.\n\n웹훅 이벤트도 늘었습니다. 안전 경고와 비활성화를 알리는 웹훅 이벤트, 세션 환경이 초기화될 때 발생하는 이벤트가 추가됐고, 수신 전화 이벤트에는 SIP 미디어 보안 관련 처리가 붙었습니다.\n\n이 밖에 환경 변수로 볼트(vault) 자격 증명을 지정하는 방식도 지원하기 시작했습니다.\n\nGitHub 배포 시각은 UTC 기준 오전 2시 36분이며, 한국시간으로 환산하면 오전 11시 36분입니다.",
          "source": "https://github.com/openai/openai-python/releases/tag/v3.17.0",
          "officialUrl": "https://github.com/openai/openai-python/releases/tag/v3.17.0",
          "verifiedAt": "2026-09-22",
          "slug": "openai-python-sdk-3-17-0",
          "tags": [
            "AI",
            "2026-w39",
            "OpenAI",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/da5edeefe80b.png",
            "alt": "Release v3.17.0 · openai/openai-python",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "OpenAI Python SDK 3.17.0 adds safety case and webhook features",
            "deck": "Adds external storage config, safety case retrieval, and new webhook events",
            "summary": "OpenAI released Python SDK v3.17.0, adding external storage configuration management, safety case retrieval, and new webhook events for safety warnings, session resets, and SIP media security.",
            "content": "OpenAI released Python SDK v3.17.0. The update adds external storage configuration management and the ability to retrieve safety cases.\n\nWebhook coverage also expanded: new webhook events cover safety warnings and deactivations, plus session environment reset events, while incoming call events gained SIP media security handling.\n\nThe release also adds support for specifying vault credentials through environment variables.\n\nThe GitHub publish timestamp is 02:36 UTC, which converts to 11:36 KST."
          }
        }
      ]
    },
    {
      "name": "SK텔레콤",
      "color": "#EA002C",
      "posts": [
        {
          "date": "9/21 08:52",
          "platform": "Web",
          "title": "SK텔레콤, 공공기관 AI 세미나 '그랜데이터 데이' 개최",
          "deck": "지자체·공공기관 250여 명에게 AI 에이전트 활용 사례를 소개했습니다",
          "summary": "SK텔레콤이 공공기관 대상 AI·빅데이터 세미나 '그랜데이터 퍼블릭 데이 2026'을 열었습니다. 9월 18일 열린 행사에는 지자체·공공기관 관계자 약 250명이 참석해 A.Dot과 그랜데이터를 결합한 공공 행정 사례를 살펴봤습니다.",
          "content": "SK텔레콤이 공공기관을 대상으로 AI·빅데이터 활용 사례를 소개하는 세미나 '그랜데이터 퍼블릭 데이 2026'을 열었다고 밝혔습니다. 9월 18일 열린 이 행사에는 지자체와 공공기관 관계자 약 250명이 참석했습니다.\n\n행사에서는 SK텔레콤의 AI 에이전트 A.Dot과 비식별 데이터 플랫폼 그랜데이터(GranData)를 결합해 공공 행정 현장에 적용한 사례가 소개됐습니다. 문화행사 방문객 분석, AI 기반 토지 개발 분석 등 실제 공공기관 업무에 적용한 사례가 다뤄졌습니다.\n\nSK텔레콤은 이번 행사가 AI 에이전트와 빅데이터 기술을 공공 행정에 적용하는 구체적인 사례를 보여주는 자리였다고 설명했습니다.\n\n이 소식을 전한 기사는 2026년 9월 21일 오전 8시 52분 한국시간에 게시됐습니다. 원문 타임스탬프가 이미 한국시간(UTC+9)으로 기록돼 있어 별도 환산은 필요하지 않았습니다.",
          "source": "https://news.sktelecom.com/231105",
          "officialUrl": "https://news.sktelecom.com/231105",
          "verifiedAt": "2026-09-22",
          "slug": "skt-grandata-public-day-2026",
          "tags": [
            "AI",
            "2026-w39",
            "SK텔레콤",
            "Korea"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/da3238441bf9.jpg",
            "alt": "SKT, 공공 AI·빅데이터 혁신 세미나 ‘그랜데이터 퍼블릭 데이 2026’ 성료 - SK텔레콤 뉴스룸SK텔레콤 뉴스룸"
          },
          "en": {
            "title": "SK Telecom holds 'GranData Public Day' AI seminar for public institutions",
            "deck": "Showcased AI-agent case studies to about 250 public-sector officials",
            "summary": "SK Telecom held 'GranData Public Day 2026,' an AI and big-data seminar for public institutions. About 250 officials attended the September 18 event, which covered public-administration cases combining A.Dot and GranData.",
            "content": "SK Telecom said it held 'GranData Public Day 2026,' a seminar introducing AI and big-data use cases for public-sector organizations. The event, held on September 18, drew about 250 officials from local governments and public institutions.\n\nThe seminar presented cases combining SK Telecom's AI agent A.Dot with its de-identified data platform GranData, applied to public administration. Examples included visitor analytics for cultural events and AI-based land-development analysis used in actual public-institution work.\n\nSK Telecom said the event was meant to show concrete cases of applying AI agents and big-data technology to public administration.\n\nThe recap article was published at 08:52 KST on September 21, 2026. The original timestamp was already recorded in KST (UTC+9), so no conversion was needed."
          }
        }
      ]
    },
    {
      "name": "xAI",
      "color": "#111111",
      "posts": [
        {
          "date": "9/21",
          "platform": "Web",
          "title": "xAI, 코딩·지식 작업용 신형 모델 Grok 4.7 공개",
          "deck": "이전 모델보다 두 배 빠르고 절반 가격, 방어 체계도 새로 짰습니다",
          "summary": "xAI가 코딩과 지식 작업에 초점을 맞춘 새 모델 Grok 4.7을 공개했습니다. 비슷한 성능의 다른 모델보다 두 배 빠르고 가격은 절반이며, 새 안전장치 체계와 전문 지식 벤치마크 개선을 함께 발표했습니다.",
          "content": "xAI가 코딩과 지식 작업에 초점을 맞춘 새 모델 Grok 4.7을 공개했습니다. 회사는 이 모델이 비슷한 성능의 다른 모델과 비교해 두 배 빠르면서 가격은 절반 수준이라고 설명했습니다.\n\nGrok 4.7에는 새로 짠 안전장치 체계가 적용됐으며, xAI는 거절 처리와 탈옥(jailbreak) 시도 방어 측면에서 지금까지 낸 모델 중 가장 강하다고 밝혔습니다. 성능 면에서는 코딩 평가인 CursorBench 4.0과 GDPval, AA Briefcase 같은 전문 지식 작업 벤치마크에서 개선된 결과를 보고했습니다.\n\n가격은 입력 토큰 100만 개당 2달러, 출력 토큰 100만 개당 6달러부터 시작하며, 더 빠른 버전은 이보다 두 배 비싼 가격으로 제공됩니다.\n\n같은 날 GitHub도 Copilot에 Grok 4.7을 통합했다고 별도로 발표했습니다. 이 카드는 xAI의 자체 모델 공개 발표에 초점을 맞춥니다.",
          "source": "https://x.ai/news/grok-4-7",
          "officialUrl": "https://x.ai/news/grok-4-7",
          "verifiedAt": "2026-09-22",
          "slug": "xai-grok-4-7-launch",
          "tags": [
            "AI",
            "2026-w39",
            "xAI",
            "Models"
          ],
          "backupUrls": [
            {
              "label": "Artificial Analysis 벤치마크",
              "url": "https://artificialanalysis.ai/"
            },
            {
              "label": "TestingCatalog 보도",
              "url": "https://www.testingcatalog.com/spacexai-releases-grok-4-7-for-coding-and-knowledge-work/"
            },
            {
              "label": "GitHub Copilot 통합 발표 (동일 모델, 별도 카드)",
              "url": "https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20260922/2b03cd279088.webp",
            "alt": "Introducing Grok 4.7",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "xAI unveils Grok 4.7 for coding and knowledge work",
            "deck": "Twice as fast at half the price, with a new safeguard stack for refusals",
            "summary": "xAI unveiled Grok 4.7, a new model focused on coding and knowledge work, describing it as twice as fast and half the price of comparable models, with a new safeguard stack and benchmark improvements.",
            "content": "xAI unveiled Grok 4.7, a new model focused on coding and knowledge work. The company describes it as twice as fast and half the price of comparable models.\n\nGrok 4.7 ships with a newly built safeguard stack, which xAI says is its strongest yet on refusal handling and jailbreak resistance. On performance, xAI reported improved results on the CursorBench 4.0 coding evaluation and on professional-knowledge benchmarks including GDPval and AA Briefcase.\n\nPricing starts at $2 per million input tokens and $6 per million output tokens, with a faster variant available at twice that price.\n\nOn the same day, GitHub separately announced that Grok 4.7 is integrated into GitHub Copilot. This card focuses on xAI's own model launch announcement."
          }
        }
      ]
    },
    {
      "name": "Xiaomi",
      "color": "#FF6900",
      "posts": [
        {
          "date": "9/21",
          "platform": "Web",
          "title": "Xiaomi, MiMo-V2.6 모델·학습 코드 오픈소스 공개",
          "deck": "기술보고서·학습 환경·RL 코드까지 모델과 함께 공개했습니다",
          "summary": "Xiaomi가 언어모델 MiMo-V2.6의 Pro·Flash 버전을 오픈소스로 공개했습니다. 모델 가중치와 함께 기술보고서, 학습 환경, 강화학습(RL) 코드까지 함께 내놓았습니다.",
          "content": "Xiaomi가 자체 개발한 언어모델 MiMo-V2.6의 Pro·Flash 두 버전을 오픈소스로 공개했습니다. 모델 가중치뿐 아니라 기술보고서, 강화학습에 쓴 학습 환경, RL 코드까지 함께 내놓았습니다.\n\nPro는 더 큰 성능을 노린 버전, Flash는 더 가볍고 빠른 버전으로 구분됩니다. 두 모델 모두 Hugging Face에 XiaomiMiMo 조직 이름으로 올라왔으며, 모델 카드에는 강화학습(RL) 단계를 거쳤다는 'RL' 표기가 붙어 있습니다.\n\nXiaomi가 학습 환경과 RL 코드까지 함께 공개한 것은 다른 연구자나 개발자가 같은 절차로 모델을 재현하거나 이어서 개선할 수 있게 하는 조치입니다.",
          "source": "https://mimo.xiaomi.com/mimo-v2-6",
          "officialUrl": "https://mimo.xiaomi.com/mimo-v2-6",
          "verifiedAt": "2026-09-22",
          "slug": "xiaomi-mimo-v2-6-open-weights",
          "tags": [
            "AI",
            "2026-w39",
            "Xiaomi",
            "Models"
          ],
          "backupUrls": [
            {
              "label": "Hugging Face 모델 카드 (MiMo-V2.6-Pro-RL)",
              "url": "https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL"
            },
            {
              "label": "Artificial Analysis 벤치마크",
              "url": "https://artificialanalysis.ai/"
            },
            {
              "label": "TestingCatalog 보도",
              "url": "https://www.testingcatalog.com/xiaomi-open-sources-mimo-v2-6-pro-and-flash-models/"
            }
          ],
          "en": {
            "title": "Xiaomi open-sources MiMo-V2.6 model and training code",
            "deck": "Released Pro and Flash weights alongside the technical report, training environments, and RL code",
            "summary": "Xiaomi open-sourced the Pro and Flash versions of its MiMo-V2.6 language model, releasing weights alongside the technical report, training environments, and reinforcement-learning code.",
            "content": "Xiaomi open-sourced the Pro and Flash versions of its self-developed MiMo-V2.6 language model. Alongside the model weights, it released the technical report, the training environments used for reinforcement learning, and the RL code itself.\n\nPro is aimed at higher performance, while Flash is a lighter, faster variant. Both models are hosted on Hugging Face under the XiaomiMiMo organization, and their model cards carry an 'RL' designation indicating they went through a reinforcement-learning stage.\n\nBy releasing the training environments and RL code alongside the models, Xiaomi has made it possible for other researchers and developers to reproduce or build on the models using the same procedure."
          }
        }
      ]
    }
  ]
};
