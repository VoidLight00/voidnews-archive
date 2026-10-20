import type { WeeklyData } from "../data";

// Partial week: 2026-10-19까지 수집한 구간만 담았습니다. 10/20~25은 다음 수집에서 채웁니다. 표시 시각은 한국시간(KST)이며, 발행처가 날짜만 제공한 항목은 날짜만 표시합니다.
export const week43: WeeklyData = {
  "week": 43,
  "year": 2026,
  "slug": "2026-w43",
  "period": "10/19 ~ 10/25",
  "totalPosts": 32,
  "companies": [
    {
      "name": "Google",
      "color": "#4285F4",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "Google, Gemini Notebook 슬라이드·영상 개요에 공동 제작 기능 추가",
          "deck": "결과물을 만들기 전에 계획부터 확인할 수 있어요",
          "summary": "Google이 Gemini Notebook의 Slide Decks와 Video Overviews에 공동 제작 기능을 더했어요. 출처를 바탕으로 주제를 제안하고, 새 Review 토글로 계획을 검토한 뒤 렌더링할 수 있다고 밝혔어요.",
          "content": "Google이 공식 블로그에서 Gemini Notebook의 인기 결과물 두 가지인 Slide Decks와 Video Overviews에서 처음부터 끝까지 더 많은 제작 통제권을 준다고 밝혔어요. 사용자 의견을 바탕으로 한 변경이라고 설명했어요.\n\nGoogle에 따르면 Notebook이 사용자의 출처를 바탕으로 주제를 제안해요. 새로 추가된 Review 토글을 켜면 아무것도 렌더링되기 전에 개요(outline)나 프로듀서 노트(producer notes)를 먼저 검토할 수 있어요.\n\nGoogle은 이 공동 제작 기능이 앞으로 한 주에 걸쳐 전 세계 모든 Gemini Notebook 사용자에게 순차적으로 제공된다고 밝혔어요. 그래서 발표 시점에는 계정에 따라 아직 보이지 않을 수 있어요.",
          "source": "https://blog.google/innovation-and-ai/products/gemini-notebook/co-create-slides-videos/",
          "officialUrl": "https://blog.google/innovation-and-ai/products/gemini-notebook/co-create-slides-videos/",
          "verifiedAt": "2026-10-20",
          "slug": "gemini-notebook-slides-video-co-create",
          "tags": [
            "AI",
            "2026-w43",
            "Google",
            "Media"
          ],
          "backupUrls": [
            {
              "label": "blog.google RSS 피드",
              "url": "https://blog.google/rss/"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/696d4cd75958.webp",
            "alt": "Illustration showing new review slide deck capabilities"
          },
          "en": {
            "title": "Google Adds Co-Creation Features to Gemini Notebook Slides and Video Overviews",
            "deck": "You can check the plan before anything is rendered",
            "summary": "Google added co-creation features to Slide Decks and Video Overviews in Gemini Notebook. It says Notebook suggests topics from your sources and a new Review toggle lets you check the plan before rendering.",
            "content": "In its official blog, Google said Gemini Notebook now offers more creative control from start to finish on two of its popular outputs, Slide Decks and Video Overviews. It described the change as based on user feedback.\n\nAccording to Google, Notebook suggests topics from the user's sources. With the new Review toggle, users can review an outline or producer notes before anything renders.\n\nGoogle said these co-creation capabilities are rolling out globally to all Gemini Notebook users over the upcoming week. So at the time of the announcement, the features may not yet appear for every account."
          }
        }
      ]
    },
    {
      "name": "Anthropic",
      "color": "#E87040",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "Claude Code 2.1.304, auto mode 설정 안내와 리뷰 단계 추가",
          "deck": "Code Review는 Quick, Standard, Deep 세 단계를 고를 수 있어요",
          "summary": "Anthropic이 Claude Code 2.1.304를 내놓았어요. 안내형 /auto-mode-setup 명령과 조직 단위 Quick, Standard, Deep 리뷰 단계가 추가됐고, 오래된 대화를 다시 열 때의 사용 한도 경고와 hook, 플러그인 수정도 담겼어요.",
          "content": "Anthropic이 Claude Code 2.1.304 릴리스 노트를 공개했어요. 릴리스 노트에 적힌 주요 변경은 다음과 같아요.\n\n- /auto-mode-setup이 추가됐어요. 프로젝트와 최근 세션을 읽고 auto mode가 사용자 환경을 이해하도록 안내해 주는 설정이에요.\n- Code Review에 리뷰 단계가 생겼어요. 조직 소유자는 조직 전체에 Quick, Standard(기본값), Deep 중 하나를 고를 수 있고, 저장소마다 별도의 단계를 줄 수도 있어요.\n- Pro와 Max 요금제에서 비활성 대화를 다시 열면 5시간 사용 한도의 상당 부분을 쓰게 될 때 경고가 표시돼요.\n\n이 밖에 hook 관련 추가와 수정도 여러 개 들어 있어요. 플러그인이 mod의 hook을 건너뛰면 transcript에 한 줄이 표시되고, PreToolUse hook이 남긴 거부 사유가 시간 초과 오류로 바뀌던 문제도 고쳐졌어요.\n\n릴리스는 GitHub 릴리스 페이지에 올라왔고, 공식 변경 로그에는 10월 19일 항목으로 정리돼 있어요.",
          "source": "https://github.com/anthropics/claude-code/releases/tag/v2.1.304",
          "officialUrl": "https://github.com/anthropics/claude-code/releases/tag/v2.1.304",
          "verifiedAt": "2026-10-20",
          "slug": "claude-code-2-1-304",
          "tags": [
            "AI",
            "2026-w43",
            "Anthropic",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "Claude Code 공식 변경 로그",
              "url": "https://code.claude.com/docs/en/changelog"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/05a469b97685.png",
            "alt": "Release v2.1.304 · anthropics/claude-code",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Claude Code 2.1.304 Adds Auto Mode Setup and Review Levels",
            "deck": "Code Review can run at Quick, Standard, or Deep level",
            "summary": "Anthropic released Claude Code 2.1.304. It adds a guided /auto-mode-setup command and organization-level Quick, Standard, or Deep review levels for Code Review, plus a usage-limit warning when resuming old conversations and several hook and plugin fixes.",
            "content": "Anthropic published the release notes for Claude Code 2.1.304. The main changes in the notes are as follows.\n\n- /auto-mode-setup is added. It is a guided setup that reads your project and recent sessions to teach auto mode about your environment.\n- Code Review gets review levels. Organization owners choose Quick, Standard (the default), or Deep for the whole organization, and can give individual repositories their own level.\n- On Pro and Max plans, a warning appears when resuming an inactive conversation would use a noticeable share of the 5-hour usage limit.\n\nThe release also includes several hook-related additions and fixes. A line now appears in the transcript when a plugin skips a mod's hooks, and a bug where a PreToolUse hook's deny reason was replaced by a timeout error is fixed.\n\nThe release is posted on the GitHub releases page, and the official changelog lists it under October 19."
          }
        }
      ]
    },
    {
      "name": "Artificial Analysis",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "Artificial Analysis, HealthBench 두 벤치마크 리더보드 공개",
          "deck": "OpenAI가 만든 의료 대화 벤치마크를 AA가 직접 돌렸어요",
          "summary": "벤치마크를 만든 OpenAI가 아니라 Artificial Analysis(AA)가 HealthBench와 HealthBench Professional의 리더보드를 열었어요. AA는 HealthBench Professional에서 GPT-6 Astra(max)가 길이 보정 점수 66.0%로 선두라고 밝혔고, 이 점수는 AA가 직접 측정한 결과예요.",
          "content": "Artificial Analysis(AA)는 HealthBench와 HealthBench Professional 두 벤치마크의 리더보드를 열었다고 밝혔어요. AA는 두 벤치마크를 OpenAI가 만든 것이라고 설명하며, 현실적인 건강 상담 대화에서 AI 모델이 어떻게 답하는지를 의사가 작성한 채점 기준에 따라 평가한다고 소개해요.\n\n구성은 두 가지예요. HealthBench는 대화 5,000건을 쓰고, HealthBench Professional은 임상의와의 대화 525건을 써요.\n\nAA가 밝힌 결과에 따르면 HealthBench Professional에서 GPT-6 Astra(max)가 길이 보정 점수 66.0%를 기록해 리더보드 선두에 올랐어요. 이 점수는 벤치마크를 만든 OpenAI가 아니라 AA가 직접 측정한 결과이고, 채점은 GPT-5.4(low)와 GPT-4.1이 맡았다고 AA는 밝혔어요.\n\n이 글은 새 모델 출시가 아니라 제3자인 AA가 기존 벤치마크의 리더보드를 연 소식이에요. 점수는 AA가 정한 측정 조건에서 나온 값이에요.",
          "source": "https://artificialanalysis.ai/articles/healthbench-professional-health-conversations",
          "officialUrl": "https://artificialanalysis.ai/articles/healthbench-professional-health-conversations",
          "verifiedAt": "2026-10-20",
          "slug": "aa-healthbench-professional-leaderboards",
          "tags": [
            "AI",
            "2026-w43",
            "Artificial Analysis",
            "Research"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/ca64fb533ada.png",
            "alt": "HealthBench and HealthBench Professional: Evaluating models in realistic health conversations"
          },
          "en": {
            "title": "Artificial Analysis Opens Leaderboards for HealthBench and HealthBench Professional",
            "deck": "AA ran OpenAI's health-conversation benchmarks itself",
            "summary": "Artificial Analysis (AA), not OpenAI, opened leaderboards for HealthBench and HealthBench Professional. AA reports GPT-6 Astra (max) leading HealthBench Professional at 66.0% on the length-adjusted score, a result AA measured itself.",
            "content": "Artificial Analysis (AA) said it has opened leaderboards for HealthBench and HealthBench Professional. AA describes both as benchmarks from OpenAI that evaluate how AI models respond in realistic health conversations, graded against physician-written rubrics.\n\nThere are two parts. HealthBench uses 5,000 conversations, and HealthBench Professional uses 525 conversations with clinicians.\n\nAccording to AA, GPT-6 Astra (max) scores 66.0% on the length-adjusted score on HealthBench Professional and leads the leaderboard. AA measured this score itself, not OpenAI, which created the benchmark, and says grading was done by GPT-5.4 (low) and GPT-4.1.\n\nThis article is not a model release. It reports that AA, a third party, opened leaderboards for existing benchmarks. The scores come from the measurement conditions AA set."
          }
        },
        {
          "date": "10/19",
          "platform": "Web",
          "title": "Artificial Analysis, 모델 성격 평가 AA-PersonalityBench 공개",
          "deck": "성격 특성 30개와 소통 특성 21개로 모델의 말투를 비교해요",
          "summary": "Artificial Analysis가 AI 모델의 성격과 소통 방식을 측정하는 평가 AA-PersonalityBench를 공개했어요. LLM 심사단이 성격 특성 30개를 쌍으로 비교하고, 소통 특성 21개는 프로그램으로 측정한다고 밝혔어요.",
          "content": "Artificial Analysis(AA)가 AI 모델의 성격과 소통 방식을 측정하는 새 평가 AA-PersonalityBench를 소개했어요. 모델을 만든 회사가 아니라 모델을 평가하는 업체가 자체 방법론으로 내놓은 평가이고, 새 모델의 출시 소식은 아니에요.\n\nAA는 이 평가가 두 가지 방식으로 이뤄진다고 밝혔어요. 먼저 LLM 심사단이 같은 질문에 대한 모델들의 답변을 쌍으로 비교하며 성격 특성 30개를 판단하고, 이 결과를 8개의 성격 지수로 묶어요. 소통 특성 21개는 심사단이 아니라 프로그램으로 측정한다고 해요.\n\n페이지의 차트에는 38개 모델 중 10개의 결과가 표시돼 있어요. 평가 방법과 측정 결과는 모두 AA 자체 방법론에 따른 것이에요.",
          "source": "https://artificialanalysis.ai/articles/aa-personalitybench",
          "officialUrl": "https://artificialanalysis.ai/articles/aa-personalitybench",
          "verifiedAt": "2026-10-20",
          "slug": "aa-personalitybench-launch",
          "tags": [
            "AI",
            "2026-w43",
            "Artificial Analysis",
            "Research"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/4241897b0c65.jpg",
            "alt": "Announcing AA-PersonalityBench: measuring how AI models communicate",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Artificial Analysis Releases AA-PersonalityBench to Measure Model Personality",
            "deck": "It compares models on 30 judged personality traits and 21 measured communication characteristics",
            "summary": "Artificial Analysis announced AA-PersonalityBench, an evaluation of the personality and communication style of AI models. It says a panel of LLM judges compares answers pairwise on 30 personality traits, and 21 communication characteristics are measured programmatically.",
            "content": "Artificial Analysis (AA) introduced AA-PersonalityBench, a new evaluation that measures the personality and communication style of AI models. It comes from a company that evaluates models rather than one that builds them, it uses AA's own methodology, and it is not the release of a new model.\n\nAA says the evaluation works in two ways. A panel of LLM judges compares answers to the same question pairwise on 30 personality traits, and the results roll up into 8 personality indexes. The 21 communication characteristics are measured programmatically instead of by the judges.\n\nThe chart on the page covers 10 of 38 models. The methodology and the measured results are all AA's own."
          }
        }
      ]
    },
    {
      "name": "AWS",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "Amazon Bedrock, Claude 모델에 구조화 출력 지원",
          "deck": "JSON 스키마에 맞는 응답과 엄격한 도구 호출을 쓸 수 있어요",
          "summary": "AWS는 머신러닝 블로그에서 Amazon Bedrock이 Anthropic Claude 모델의 구조화 출력을 지원한다고 알렸어요. bedrock-runtime과 bedrock-mantle 두 엔드포인트에서, 모델이 제공되는 곳에 한해 JSON 스키마 출력과 엄격한 도구 사용을 쓸 수 있어요.",
          "content": "AWS가 Machine Learning 블로그의 공지 글에서 Amazon Bedrock이 Anthropic Claude 모델 전체에 구조화 출력을 지원한다고 밝혔어요. bedrock-runtime과 bedrock-mantle 두 엔드포인트에서 모두 쓸 수 있고, 조건은 모델이 제공되는 곳이에요. 글에서도 모든 모델이라는 표현에 이 단서를 붙여 두었어요.\n\n방식은 두 가지로 소개돼요.\n\n- JSON 스키마 출력 형식을 지원해요.\n- 엄격한 도구 사용(strict tool use)을 지원해요.\n\nAWS 설명에 따르면 구조화 출력은 제한된 디코딩(constrained decoding)을 사용하고, 배치 추론과 함께 쓸 수 있어요. bedrock-runtime에서는 교차 리전 추론과도 함께 쓸 수 있어요.\n\n이 소식은 Anthropic이 아니라 AWS가 자사 서비스에 대해 알린 내용이에요.",
          "source": "https://aws.amazon.com/blogs/machine-learning/structured-outputs-for-anthropic-claude-models-on-amazon-bedrock/",
          "officialUrl": "https://aws.amazon.com/blogs/machine-learning/structured-outputs-for-anthropic-claude-models-on-amazon-bedrock/",
          "verifiedAt": "2026-10-20",
          "slug": "aws-bedrock-claude-structured-outputs",
          "tags": [
            "AI",
            "2026-w43",
            "AWS",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/5666af1c1131.png",
            "alt": "Structured outputs for Anthropic Claude models on Amazon Bedrock | Amazon Web Services",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Amazon Bedrock Adds Structured Outputs for Claude Models",
            "deck": "Schema-compliant JSON and strict tool use are now available",
            "summary": "AWS announced on its Machine Learning Blog that Amazon Bedrock now supports structured outputs for Anthropic Claude models. On both the bedrock-runtime and bedrock-mantle endpoints, JSON Schema output and strict tool use work where the model is available.",
            "content": "AWS said in an announcement on its Machine Learning Blog that Amazon Bedrock now supports structured outputs for all Anthropic Claude models. They work on both the bedrock-runtime and bedrock-mantle endpoints, with the condition that the model is available there. The post itself attaches this qualifier to the phrase all models.\n\nThe post names two mechanisms.\n\n- A JSON Schema output format.\n- Strict tool use.\n\nAccording to AWS, structured outputs use constrained decoding and work with batch inference. On bedrock-runtime they also work with cross-Region inference.\n\nThis news comes from AWS about its own service, not from Anthropic."
          }
        },
        {
          "date": "10/19",
          "platform": "Web",
          "title": "AWS, GovCloud(US)의 Amazon Bedrock에서 Grok 4.7 지원",
          "deck": "AWS GovCloud(US)에서도 Bedrock으로 Grok 4.7을 쓸 수 있어요",
          "summary": "AWS가 Amazon Bedrock에서 SpaceXAI의 Grok 4.7을 AWS GovCloud(US)에서도 지원한다고 밝혔어요. Bedrock의 기본 출시는 9월 28일이었고, 이번 소식은 GovCloud(US)로 지원 범위를 넓힌 내용이에요.",
          "content": "AWS가 What's New 페이지에서 Amazon Bedrock이 AWS GovCloud(US)에서 SpaceXAI의 Grok 4.7을 지원한다고 알렸어요. AWS는 이 모델을 코딩, 에이전트 작업, 지식 업무를 위해 만든 프런티어 모델이라고 소개했어요.\n\nAWS의 설명에 따르면 Grok 4.7은 Grok 4.6을 바탕으로 혼합 문서 처리, 계획 수립과 오류 복구를 갖춘 저장소 규모의 코딩, 브라우저를 사용하는 에이전트를 개선했어요. 이 설명은 AWS가 쓴 표현이에요. 발표 페이지에는 벤치마크 수치와 지원 리전 목록, 가격이 없고, 자세한 내용은 Bedrock 문서를 안내해요.\n\nGrok 4.7이 Amazon Bedrock에 처음 올라온 것은 9월 28일이에요. What's New 페이지는 그날 올라온 AWS Machine Learning Blog 출시 글을 링크하고 있어요. 이번 소식은 같은 모델을 AWS GovCloud(US)에서도 쓸 수 있게 된 지원 범위 확대예요.",
          "source": "https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-bedrock-grok-4-7-govcloud/",
          "officialUrl": "https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-bedrock-grok-4-7-govcloud/",
          "verifiedAt": "2026-10-20",
          "slug": "aws-bedrock-grok-4-7-govcloud",
          "tags": [
            "AI",
            "2026-w43",
            "AWS",
            "Models"
          ],
          "backupUrls": [
            {
              "label": "AWS Machine Learning Blog, Amazon Bedrock Grok 4.7 출시 글 (9월 28일)",
              "url": "https://aws.amazon.com/blogs/machine-learning/grok-4-7-is-now-available-on-amazon-bedrock/"
            }
          ],
          "en": {
            "title": "AWS Adds Grok 4.7 to Amazon Bedrock in AWS GovCloud (US)",
            "deck": "Bedrock now offers Grok 4.7 in AWS GovCloud (US) as well",
            "summary": "AWS said Amazon Bedrock now supports SpaceXAI's Grok 4.7 in AWS GovCloud (US). The base Bedrock launch was on September 28, so this announcement extends support to GovCloud (US).",
            "content": "AWS announced on its What's New page that Amazon Bedrock now supports SpaceXAI's Grok 4.7 in AWS GovCloud (US). AWS describes the model as a frontier model built for coding, agentic tasks, and knowledge work.\n\nAccording to AWS, Grok 4.7 builds on Grok 4.6 with better mixed-document handling, more dependable repo-scale coding with planning and error recovery, and enhanced browser-use agents. That description is AWS's own wording. The announcement page gives no benchmarks, list of regions, or pricing, and points to the Bedrock documentation.\n\nGrok 4.7 first arrived on Amazon Bedrock on September 28. The What's New page links to the AWS Machine Learning Blog launch post from that day. This announcement is an expansion of support, making the same model available in AWS GovCloud (US)."
          }
        }
      ]
    },
    {
      "name": "ElevenLabs",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "ElevenLabs, Chroma Awards 시즌 2 출품 접수 시작",
          "deck": "영화, 뮤직비디오, 광고, 게임 등 다섯 부문에 낼 수 있어요",
          "summary": "ElevenLabs가 자사가 인큐베이팅한 글로벌 AI 창작 대회 Chroma Awards의 시즌 2 출품을 받기 시작했어요. 다섯 부문에서 출품할 수 있고, ElevenLabs 자체 상금으로 22명에게 총 2만 2,000달러가 마련돼 있다고 밝혔어요.",
          "content": "ElevenLabs는 자사가 인큐베이팅한 글로벌 AI 창작 대회 Chroma Awards의 두 번째 시즌 출품을 오늘부터 받는다고 밝혔어요. 창작자는 Film, Music Videos, Advertising, Games, Behind-The-Scenes 다섯 부문에 작품을 낼 수 있어요.\n\n회사가 밝힌 혜택은 다음과 같아요.\n\n- 무료 체험과 프로모션이 100만 달러 규모로 마련돼 있어요.\n- 현금 상금과 여행 혜택은 45만 달러가 넘어요.\n- ElevenLabs Awards로 22명에게 현금 총 2만 2,000달러가 돌아가요.\n\n수상자는 2027년 2월 11일에 발표된다고 안내돼 있어요.\n\n마감일은 페이지 안에서 서로 달라요. 앞부분에는 2027년 1월 1일까지 출품할 수 있다고 적혀 있고, 뒷부분에는 1월 7일에 마감한다고 적혀 있어요. 두 표기가 달라 마감일은 확정할 수 없어요.",
          "source": "https://elevenlabs.io/blog/chroma-awards-season-two-announcement",
          "officialUrl": "https://elevenlabs.io/blog/chroma-awards-season-two-announcement",
          "verifiedAt": "2026-10-20",
          "slug": "elevenlabs-chroma-awards-season-2",
          "tags": [
            "AI",
            "2026-w43",
            "ElevenLabs",
            "Media"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/3d20cb8a60b1.jpg",
            "alt": "Chroma Awards Season 2 poster featuring AI-generated art and creative industry partners."
          },
          "en": {
            "title": "ElevenLabs Opens Chroma Awards Season 2 Submissions",
            "deck": "Five divisions, from Film to Behind-The-Scenes",
            "summary": "ElevenLabs started accepting submissions for season 2 of the Chroma Awards, the global AI creative competition it incubated. Creators can enter five divisions, and the company says ElevenLabs Awards add $22,000 in cash across 22 winners.",
            "content": "ElevenLabs said it is opening submissions today for the second season of the Chroma Awards, the global AI creative competition incubated by ElevenLabs. Creators can enter work across five divisions: Film, Music Videos, Advertising, Games, and Behind-The-Scenes.\n\nThe company lists these benefits.\n\n- $1M in free trials and promotions.\n- Over $450,000 in cash prizes and travel perks.\n- ElevenLabs Awards of $22,000 in cash across 22 winners.\n\nWinners are to be announced on February 11, 2027.\n\nThe deadline differs within the page. The opening says creators can enter until January 1, 2027, while a later passage says submissions close January 7, 2027. Because the two statements conflict, the deadline cannot be confirmed."
          }
        }
      ]
    },
    {
      "name": "GitHub",
      "color": "#24292F",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "GitHub Copilot CLI 1.0.100, 텔레메트리 끄는 플래그 추가",
          "deck": "검증된 스킬과 플러그인을 GitHub 링크로 설치할 수 있어요",
          "summary": "GitHub Copilot CLI 1.0.100은 클라이언트 텔레메트리 업로드를 끄는 플래그를 추가하고, GitHub 설치 링크로 검증된 스킬과 플러그인을 설치할 수 있게 했어요. 샌드박스 프록시 처리와 MCP 서버가 멈출 때 세션이 길게 멈추던 문제도 고쳤어요.",
          "content": "GitHub가 Copilot CLI 1.0.100 릴리스를 공개했어요. 릴리스 노트에 적힌 변경은 다음과 같아요.\n\n- --disable-client-telemetry 플래그가 추가돼 CLI의 클라이언트 텔레메트리 업로드를 끌 수 있어요.\n- -p 옵션이나 파이프 입력으로 시작하는 일회성 프롬프트 모드 세션에 --trust-folder 플래그를 쓸 수 있어요.\n- GitHub 설치 링크로 검증된 스킬과 플러그인을 설치할 수 있어요. copilot plugin install 명령에 ghapp://air/install 로 시작하는 링크를 넣어 써요.\n- 샌드박스 프록시가 설정되지 않았을 때 샌드박스 호스트 규칙 트래픽이 HTTPS_PROXY와 HTTP_PROXY를 따라요.\n- MCP 서버가 도구를 불러오다 멈춰도 세션이 몇 분씩 멈추지 않아요.\n\n공식 릴리스 페이지에서 Latest로 표시된 버전이에요.",
          "source": "https://github.com/github/copilot-cli/releases/tag/v1.0.100",
          "officialUrl": "https://github.com/github/copilot-cli/releases/tag/v1.0.100",
          "verifiedAt": "2026-10-20",
          "slug": "github-copilot-cli-1-0-100",
          "tags": [
            "AI",
            "2026-w43",
            "GitHub",
            "Devtools"
          ],
          "en": {
            "title": "GitHub Copilot CLI 1.0.100 Adds a Flag to Turn Off Telemetry",
            "deck": "Verified skills and plugins install from GitHub links",
            "summary": "GitHub Copilot CLI 1.0.100 adds a flag to turn off client telemetry uploads and lets users install verified skills and plugins from GitHub install links. It also fixes sandbox proxy handling and long session stalls caused by hung MCP servers.",
            "content": "GitHub published the Copilot CLI 1.0.100 release. The changes listed in the release notes are as follows.\n\n- A --disable-client-telemetry flag is added to turn off client telemetry uploads from the CLI.\n- A --trust-folder flag is available for one-off prompt-mode sessions started with -p or piped stdin.\n- Verified skills and plugins can be installed from GitHub install links. Pass a link starting with ghapp://air/install to the copilot plugin install command.\n- Sandbox host-rule traffic now honors HTTPS_PROXY and HTTP_PROXY when no sandbox proxy is configured.\n- Sessions no longer stall for minutes when an MCP server hangs while loading tools.\n\nThe official release page marks this version as Latest."
          }
        },
        {
          "date": "10/19",
          "platform": "Web",
          "title": "GitHub, Copilot 모델 정책 REST API 정식 제공",
          "deck": "엔터프라이즈부터 조직까지 네 단계의 모델 정책을 API로 다뤄요",
          "summary": "GitHub가 Copilot 모델 정책을 조회하고 수정하는 REST API를 정식 제공(GA)한다고 밝혔어요. 엔터프라이즈, 엔터프라이즈 팀, 엔터프라이즈 앱, 조직의 네 단계에서 쓸 수 있어요.",
          "content": "GitHub가 10월 19일 changelog에서 Copilot 모델 정책을 REST API로 조회하고 수정할 수 있다고 알렸어요. GET과 PATCH 엔드포인트가 정식 제공(GA) 상태이고, 정책 단위는 엔터프라이즈, 엔터프라이즈 팀, 엔터프라이즈 앱, 조직의 네 곳이에요.\n\nGitHub는 엔터프라이즈 수준의 정책이 모델 제어를 조직, 팀, 앱에 위임할 수 있다고 설명했어요.",
          "source": "https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams",
          "officialUrl": "https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams",
          "verifiedAt": "2026-10-20",
          "slug": "github-copilot-model-policy-api",
          "tags": [
            "AI",
            "2026-w43",
            "GitHub",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "GitHub Changelog 피드",
              "url": "https://github.blog/changelog/feed/"
            }
          ],
          "en": {
            "title": "GitHub Makes the Copilot Model Policy REST API Generally Available",
            "deck": "Model policies can be handled through the API at four levels, from enterprise to organization",
            "summary": "GitHub said the REST API for retrieving and updating Copilot model policies is generally available. It works at four levels: enterprises, enterprise teams, enterprise apps, and organizations.",
            "content": "In its October 19 changelog, GitHub said Copilot model policies can now be retrieved and updated through the REST API. The GET and PATCH endpoints are generally available (GA), and policies exist at four levels: enterprises, enterprise teams, enterprise apps, and organizations.\n\nGitHub explained that enterprise-level policies can delegate model control to organizations, teams, or apps."
          }
        },
        {
          "date": "10/19",
          "platform": "Web",
          "title": "GitHub Copilot, 모델 6종을 10월 19일부로 지원 중단",
          "deck": "대체 모델로 Gemini 3.8 Flash와 GPT-6.1 Sol 등을 안내했어요",
          "summary": "GitHub는 Copilot Chat, 인라인 편집, ask와 agent 모드, 코드 완성 등 대부분의 Copilot 경험에서 모델 6종을 2026년 10월 19일부로 지원 중단했다고 밝혔어요. 9월 18일에 예고한 일정이 적용된 것이고, Enterprise 관리자는 대체 모델을 모델 정책에서 켜야 할 수 있어요.",
          "content": "GitHub는 변경 로그에서 2026년 10월 19일부로 대부분의 GitHub Copilot 경험에서 일부 모델을 지원 중단했다고 밝혔어요. 대상 범위에는 Copilot Chat, 인라인 편집, ask 모드와 agent 모드, 코드 완성이 포함돼요.\n\n지원 중단된 모델은 Gemini 3.7 Flash, GPT-5.5, GPT-5.4, GPT-5.4 mini, GPT-5 mini, Grok 4.5 여섯 개예요. GitHub가 안내한 대체 모델은 Gemini 3.8 Flash, GPT-6.1 Sol, GPT-6 Luna, Grok 4.7이에요.\n\n이 지원 중단은 2026년 9월 18일에 이미 공지된 일정이에요. 이번 글은 그 일정이 오늘 적용됐다는 후속 안내예요. Enterprise 관리자는 모델 정책에서 대체 모델을 켜야 할 수 있어요.",
          "source": "https://github.blog/changelog/2026-10-19-github-copilot-models-deprecated-on-october-19-2026",
          "officialUrl": "https://github.blog/changelog/2026-10-19-github-copilot-models-deprecated-on-october-19-2026",
          "verifiedAt": "2026-10-20",
          "slug": "github-copilot-models-deprecated-oct-19",
          "tags": [
            "AI",
            "2026-w43",
            "GitHub",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "GitHub 변경 로그 피드",
              "url": "https://github.blog/changelog/feed/"
            }
          ],
          "en": {
            "title": "GitHub Copilot Retires Six Models as of October 19",
            "deck": "Gemini 3.8 Flash, GPT-6.1 Sol, and others are suggested instead",
            "summary": "GitHub said it deprecated six models across most Copilot experiences, including Copilot Chat, inline edits, ask and agent modes, and code completions, as of October 19, 2026. The schedule was announced on September 18, and Enterprise admins may need to enable the alternatives in their model policies.",
            "content": "GitHub said in its changelog that, as of October 19, 2026, it has deprecated several models across most GitHub Copilot experiences. The scope includes Copilot Chat, inline edits, ask and agent modes, and code completions.\n\nThe six deprecated models are Gemini 3.7 Flash, GPT-5.5, GPT-5.4, GPT-5.4 mini, GPT-5 mini, and Grok 4.5. The alternatives GitHub suggests are Gemini 3.8 Flash, GPT-6.1 Sol, GPT-6 Luna, and Grok 4.7.\n\nThese deprecations were already announced on September 18, 2026. This post is a follow-up saying the schedule took effect today. Enterprise admins may need to enable the alternatives in their model policies."
          }
        }
      ]
    },
    {
      "name": "Hugging Face",
      "color": "#FF9D00",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "Hugging Face, AWS Trainium용 TorchNeuron 백엔드 소개",
          "deck": "10월 20일부터 공개 베타로 제공될 예정이에요",
          "summary": "Hugging Face가 AWS Trainium용 PyTorch 네이티브 백엔드 TorchNeuron을 소개했어요. Transformers, Diffusers, Kernels가 직접 지원하며, 공개 베타는 2026년 10월 20일부터 시작된다고 밝혔어요. 상위 100개 텍스트 생성 아키텍처 중 89%를 바로 쓸 수 있다는 수치도 회사의 주장이에요.",
          "content": "Hugging Face는 블로그에서 TorchNeuron이 AWS Trainium을 위한 PyTorch의 새로운 네이티브 백엔드라고 소개했어요. Transformers, Diffusers, Kernels가 이 백엔드를 기본으로 지원해서, Trainium에서 모델을 돌리고 Hugging Face 허브에 공유하기가 더 쉬워진다고 설명해요.\n\n공개 일정은 글이 올라온 시점에는 시작 전이었어요. 회사는 2026년 10월 20일부터 TorchNeuron을 공개 베타로 제공한다고 밝혔고, 설치는 pip install torch-neuronx 로 한다고 안내했어요.\n\nHugging Face가 제시한 수치도 있어요. 가장 많이 쓰이는 텍스트 생성 모델 아키텍처 상위 100개 중 89%를 TorchNeuron에서 별도 작업 없이 쓸 수 있고, Optimum Neuron v0.4.5에서는 이 비율이 46%라고 해요. 두 수치는 모두 Hugging Face가 직접 밝힌 주장이에요.\n\n회사는 Neuron 사용자에게 Optimum Neuron 대신 Hugging Face 라이브러리를 직접 쓰라고 권하기도 했어요. PyTorch 블로그에도 같은 공개 베타 시작일(10월 20일)이 소개됐어요.",
          "source": "https://huggingface.co/blog/hf-torchneuron",
          "officialUrl": "https://huggingface.co/blog/hf-torchneuron",
          "verifiedAt": "2026-10-20",
          "slug": "hf-torchneuron-aws-trainium",
          "tags": [
            "AI",
            "2026-w43",
            "Hugging Face",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "PyTorch 블로그 Introducing TorchNeuron",
              "url": "https://pytorch.org/blog/introducing-torchneuron-native-pytorch-backend-for-aws-trainium/"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/dab3b6036c9f.png",
            "alt": "TorchNeuron: running HF models on AWS Trainium is easier than ever",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Hugging Face Introduces TorchNeuron for AWS Trainium",
            "deck": "A public beta is set to start on October 20",
            "summary": "Hugging Face introduced TorchNeuron, a native PyTorch backend for AWS Trainium that Transformers, Diffusers, and Kernels support directly. It says a public beta starts on October 20, 2026. The claim that 89% of the top 100 text-generation architectures work out of the box is the company's own.",
            "content": "Hugging Face introduced TorchNeuron on its blog as a new native backend for PyTorch on AWS Trainium. Transformers, Diffusers, and Kernels natively support it, which the company says makes it easier to run models on Trainium and share them on the Hugging Face hub.\n\nAt the time of the post, the release had not started yet. The company said TorchNeuron will be available as a public beta starting October 20, 2026, and gave pip install torch-neuronx as the install command.\n\nHugging Face also gave figures. It says 89% of the top 100 most-used text-generation model architectures are supported out of the box with TorchNeuron, compared to 46% with Optimum Neuron v0.4.5. Both figures are Hugging Face's own claims.\n\nThe company also recommends that Neuron users use the Hugging Face libraries directly instead of Optimum Neuron. The PyTorch blog states the same public beta start date, October 20."
          }
        }
      ]
    },
    {
      "name": "LG CNS",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "LG CNS, IDC 디지털 워크플레이스 평가 '메이저 플레이어' 선정 밝혀",
          "deck": "에이전틱 AI 서비스 a:xink를 근거로 내세웠어요",
          "summary": "LG CNS가 IDC의 2026 글로벌 디지털 워크플레이스 서비스 평가에서 메이저 플레이어로 선정됐다고 밝혔어요. 에이전틱 AI 서비스 a:xink를 근거로 들었고, 생산성 수치는 LG CNS 자체 주장이에요.",
          "content": "LG CNS가 IDC의 'IDC MarketScape: 2026 Worldwide Digital Workplace Services(DWS) Vendor Assessment'에서 '메이저 플레이어(Major Player)'로 선정됐다고 10월 19일 밝혔어요. LG CNS는 국내 기업이 이 평가에 이름을 올린 것은 이번이 처음이며 LG CNS가 유일하다고 설명했고, 평가에는 글로벌 업체 18곳이 포함됐다고 했어요.\n\nLG CNS는 평가 결과의 근거로 에이전틱 AI 서비스 a:xink(에이엑스씽크)를 꼽았어요. 이 서비스를 LG 계열사의 해외 사업장에 적용한 뒤 업무 생산성이 20~40% 높아졌고, 연간 절감 효과는 약 수백억 원으로 추정한다고 주장했어요.\n\nIDC 인용문과 수치는 모두 LG CNS의 설명이에요. IDC 보고서 원문이 아니라 LG CNS 보도자료를 근거로 한 내용이라는 점도 함께 알려 둬요.",
          "source": "https://www.lg.co.kr/media/release/30686",
          "officialUrl": "https://www.lg.co.kr/media/release/30686",
          "verifiedAt": "2026-10-20",
          "slug": "lg-cns-idc-marketscape-digital-workplace",
          "tags": [
            "AI",
            "2026-w43",
            "LG CNS",
            "Korea"
          ],
          "en": {
            "title": "LG CNS Says It Was Named a Major Player in IDC's Digital Workplace Assessment",
            "deck": "It points to its agentic AI service a:xink",
            "summary": "LG CNS said it was named a Major Player in IDC's 2026 worldwide digital workplace services vendor assessment. It credits its agentic AI service a:xink, and the productivity figures are LG CNS's own claims.",
            "content": "LG CNS said on October 19 that it was named a 'Major Player' in IDC MarketScape: 2026 Worldwide Digital Workplace Services (DWS) Vendor Assessment. LG CNS explained that this is the first time a Korean company has appeared in the assessment and that LG CNS is the only one, and it said 18 global vendors were included.\n\nLG CNS cited its agentic AI service a:xink as the basis for the result. It claimed that after rolling the service out at overseas sites of LG affiliates, work productivity rose by 20-40%, and it estimates the annual savings at about several tens of billions of won (수백억 원).\n\nThe IDC quotes and figures are all LG CNS's account. This summary is based on the LG CNS press release, not on the IDC report itself."
          }
        }
      ]
    },
    {
      "name": "LightOn",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "LightOn, 희소 검색 모델 SlideOn·mSlideOn 공개",
          "deck": "영어용 174M, 다국어용 339M 파라미터 검색 모델이에요",
          "summary": "LightOn이 영어용 SlideOn(174M)과 다국어용 mSlideOn(339M) 희소 검색 모델을 공개했다고 밝혔어요. 기존 검색 모델의 지식을 재사용했다고 설명했고, 최고 수준이라는 표현과 점수는 LightOn 자체 주장이에요.",
          "content": "LightOn이 Hugging Face 블로그의 커뮤니티 글에서 희소(sparse) 검색 모델 SlideOn과 mSlideOn을 공개한다고 밝혔어요. SlideOn은 영어, mSlideOn은 다국어 검색용이고 파라미터는 각각 1억 7,400만 개(174M)와 3억 3,900만 개(339M)예요.\n\nLightOn은 두 모델을 기존 DenseOn과 mLateOn을 바탕으로 만들었고, 이 모델들이 갖춘 검색 지식을 재사용했다고 설명했어요. 두 모델을 공개된 최고 수준(state-of-the-art) 희소 검색 모델이라고 소개했는데, 이 표현과 점수는 모두 LightOn의 자체 주장이에요.\n\nLightOn이 밝힌 점수는 다음과 같아요.\n\n- SlideOn은 BEIR-15에서 56.68점을 기록해 DenseOn의 56.20점을 넘었다고 해요.\n- mSlideOn은 다국어 검색(MIRACL)에서 mDenseOn보다 4.76점 높다고 해요.\n\nHugging Face에서는 SlideOn과 mSlideOn 모델 저장소가 공개 상태로 확인돼요. 다만 이 점수를 독립적으로 검증한 결과는 확인되지 않았어요.",
          "source": "https://huggingface.co/blog/lightonai/slideon-mslideon",
          "officialUrl": "https://huggingface.co/blog/lightonai/slideon-mslideon",
          "verifiedAt": "2026-10-20",
          "slug": "lighton-slideon-mslideon-sparse-retrieval",
          "tags": [
            "AI",
            "2026-w43",
            "LightOn",
            "Models"
          ],
          "backupUrls": [
            {
              "label": "SlideOn 모델 저장소 (Hugging Face)",
              "url": "https://huggingface.co/lightonai/SlideOn"
            },
            {
              "label": "mSlideOn 모델 저장소 (Hugging Face)",
              "url": "https://huggingface.co/lightonai/mSlideOn"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/bce743152e32.png",
            "alt": "Sparse encoding pipeline: tokenization, contextual encoding, sparse projection, and max pooling."
          },
          "en": {
            "title": "LightOn Releases Sparse Retrieval Models SlideOn and mSlideOn",
            "deck": "Retrieval models with 174M parameters for English and 339M for multilingual search",
            "summary": "LightOn said it is releasing SlideOn (174M) for English and mSlideOn (339M) for multilingual sparse retrieval. It says the models reuse the retrieval knowledge of its existing models, and the state-of-the-art label and the scores are LightOn's own claims.",
            "content": "In a community article on the Hugging Face blog, LightOn said it is releasing the sparse retrieval models SlideOn and mSlideOn. SlideOn is for English retrieval and mSlideOn is for multilingual retrieval, with 174M and 339M parameters respectively.\n\nLightOn explained that it built the two models from its existing DenseOn and mLateOn, reusing their retrieval knowledge. It describes them as open state-of-the-art sparse retrieval models, but that wording and the scores are all LightOn's own claims.\n\nThe scores LightOn reports are as follows.\n\n- SlideOn reaches 56.68 on BEIR-15, surpassing DenseOn's 56.20.\n- mSlideOn outperforms mDenseOn by 4.76 points on multilingual retrieval (MIRACL).\n\nThe SlideOn and mSlideOn model repositories appear as public on Hugging Face. However, no independent verification of these scores has been confirmed."
          }
        }
      ]
    },
    {
      "name": "MiniMax",
      "color": "#1A56DB",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "MiniMax, M3.1 Flash 업데이트 공개",
          "deck": "추론 속도 약 3배, 에이전트 작업 비용 70% 절감이라고 밝혔어요",
          "summary": "MiniMax가 M3.1 Flash를 정식 업데이트했어요. 회사는 에이전트, 코딩, 컴퓨터 사용, 사이버 보안 능력이 한 세대 올랐고 온라인 추론 속도가 3배 가까이 빨라졌다고 밝혔어요. 에이전트 작업의 종합 사용 비용은 이전 모델보다 70% 낮고, 오픈 가중치는 나중에 공개한다고 해요.",
          "content": "MiniMax는 블로그에서 M3.1 Flash를 오늘 정식으로 업데이트한다고 밝혔어요. 회사는 이 모델이 새로운 세대의 Flash 모델로서 에이전트 작업, 코딩, 컴퓨터 사용(Computer Use), 사이버 보안 능력에서 세대 단위의 향상을 이뤘다고 설명해요. 온라인 추론 속도는 3배 가까이 빨라졌고, 에이전트 작업의 종합 사용 비용은 이전 세대 모델보다 70% 낮아졌다고 해요. 70%라는 수치는 에이전트 작업에 한정한 값이에요.\n\nMiniMax가 직접 발표한 점수는 BankerToolBench 76.2, DeepSWE v1.1 73.7%, OSWorld V2 61.7, Agents' Last Exam 29.6, CyberGym 82%예요.\n\n가격은 100만 토큰당 입력 1위안, 출력 4위안, 캐시 읽기 0.1위안이에요. MiniMax API, MPlan, MiniMax Code에서 쓸 수 있어요.\n\n오픈 가중치는 나중에 공개한다고 적혀 있어 아직 공개된 것이 아니에요. 속도, 비용, 점수는 모두 MiniMax가 직접 발표한 수치예요.",
          "source": "https://www.minimax.cn/blog/minimax-m31f",
          "officialUrl": "https://www.minimax.cn/blog/minimax-m31f",
          "verifiedAt": "2026-10-20",
          "slug": "minimax-m3-1-flash",
          "tags": [
            "AI",
            "2026-w43",
            "MiniMax",
            "Models"
          ],
          "backupUrls": [
            {
              "label": "MiniMax 영문 페이지",
              "url": "https://www.minimax.io/blog/minimax-m31f"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/c590009ce0ef.webp",
            "alt": "MiniMax M3.1 Flash：重新定义 Agent 的性能与成本 - MiniMax Research"
          },
          "en": {
            "title": "MiniMax Releases an Updated M3.1 Flash",
            "deck": "About 3x faster inference and 70% lower agentic cost, the company says",
            "summary": "MiniMax rolled out an updated M3.1 Flash. The company says it improves agentic, coding, computer-use, and cybersecurity ability by a generation, with online inference nearly 3 times faster. It says overall usage cost for agentic tasks is 70% lower than the previous model, and open weights will come later.",
            "content": "MiniMax said on its blog that it is officially updating M3.1 Flash today. The company describes it as a new-generation Flash model with generational improvements in agentic tasks, coding, computer use, and cybersecurity ability. It says online inference is nearly 3 times faster, and that the overall usage cost of agentic tasks is 70% lower than the previous model. The 70% figure applies only to agentic tasks.\n\nThe scores MiniMax published itself are BankerToolBench 76.2, DeepSWE v1.1 73.7%, OSWorld V2 61.7, Agents' Last Exam 29.6, and CyberGym 82%.\n\nPricing is 1 yuan per million input tokens, 4 yuan per million output tokens, and 0.1 yuan per million cache-read tokens. The model is available in the MiniMax API, MPlan, and MiniMax Code.\n\nThe page says open weights will be opened later, so they are not yet released. The speed, cost, and score figures are all numbers MiniMax published itself."
          }
        }
      ]
    },
    {
      "name": "Model Context Protocol",
      "color": "#3B5BDB",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "Model Context Protocol, 참조 서버 v2.0.0 릴리스",
          "deck": "모든 서버를 새 스펙에 맞춰 고치고 이전 클라이언트에도 응답해요",
          "summary": "Model Context Protocol 프로젝트가 참조 서버 v2.0.0을 릴리스했어요. 모든 서버를 새 세대 스펙(modern era)에 맞게 리팩터링하면서 이전 세대 클라이언트에도 계속 응답한다고 밝혔어요.",
          "content": "Model Context Protocol 프로젝트가 참조 서버 저장소(modelcontextprotocol/servers)에서 v2.0.0을 릴리스했어요. 릴리스 노트는 모든 서버를 최신 세대 스펙(modern era spec)을 지원하도록 리팩터링했고, 이전 세대 클라이언트(legacy era clients)에는 기존처럼 계속 응답한다고 밝혔어요.\n\n패키지 표에는 게시(published) 상태의 패키지가 두 묶음으로 나와 있어요.\n\n- npm: @modelcontextprotocol/server-everything, server-filesystem, server-memory, server-sequential-thinking이 2.0.0 버전이에요.\n- PyPI: mcp-server-fetch, mcp-server-git, mcp-server-time이 2026.10.19 버전이에요.\n\n릴리스 노트는 modern era가 무엇인지 따로 풀어 설명하지 않아요. 변경 목록에 modern-era TypeScript servers (2026-07-28 + 2025) 같은 항목이 있다는 점까지만 확인돼요. 자세한 변경 내용은 GitHub 릴리스 페이지에서 볼 수 있어요.",
          "source": "https://github.com/modelcontextprotocol/servers/releases/tag/v2.0.0",
          "officialUrl": "https://github.com/modelcontextprotocol/servers/releases/tag/v2.0.0",
          "verifiedAt": "2026-10-20",
          "slug": "mcp-servers-v2-0-0",
          "tags": [
            "AI",
            "2026-w43",
            "Model Context Protocol",
            "Devtools"
          ],
          "backupUrls": [
            {
              "label": "modelcontextprotocol/servers 릴리스 피드",
              "url": "https://github.com/modelcontextprotocol/servers/releases.atom"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/85e31faaa707.png",
            "alt": "Release v2.0.0 · modelcontextprotocol/servers",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Model Context Protocol Releases Reference Servers v2.0.0",
            "deck": "All servers are refactored for the new spec and still answer legacy clients",
            "summary": "The Model Context Protocol project released v2.0.0 of its reference servers. It says all servers were refactored to support the modern era spec while still answering legacy era clients.",
            "content": "The Model Context Protocol project released v2.0.0 in its reference servers repository (modelcontextprotocol/servers). The release notes say all the servers were refactored to support the modern era spec, while still answering legacy era clients as expected.\n\nThe packages table lists packages marked as published in two groups.\n\n- npm: @modelcontextprotocol/server-everything, server-filesystem, server-memory, and server-sequential-thinking are at version 2.0.0.\n- PyPI: mcp-server-fetch, mcp-server-git, and mcp-server-time are at version 2026.10.19.\n\nThe release notes do not explain what modern era means beyond that. All that can be confirmed is that the changelog has items such as modern-era TypeScript servers (2026-07-28 + 2025). The full list of changes is on the GitHub release page."
          }
        }
      ]
    },
    {
      "name": "NAVER",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "네이버클라우드, 기업용 '보안 자가진단' 사이트 오픈",
          "deck": "7개 영역 21문항에 AI 활용 환경 보안 영역도 있어요",
          "summary": "네이버클라우드가 기업이 보안 현황을 점검하는 무료 '보안 자가진단' 사이트를 19일 열었다고 밝혔어요. 7개 영역 21문항이고, 그중 한 영역은 AI 활용 환경 보안을 다뤄요.",
          "content": "네이버클라우드가 기업이 보안 현황을 쉽고 빠르게 점검할 수 있는 '네이버클라우드 보안 자가진단' 사이트를 19일 열었다고 밝혔어요. 무료이고, 온라인 진단 설문에 응답하는 것만으로 개선을 검토할 보안 영역을 한눈에 확인할 수 있다고 설명했어요.\n\n진단은 7개 영역 21문항으로 구성돼요. 그중 'AI 활용 환경 보안' 영역이 따로 있고, AI 자동화 공격에 대한 대응, 임직원의 AI 활용 시 민감 정보 유출 방지 정책, 사내 AI 시스템의 접근 권한 같은 항목을 다뤄요.\n\n설문을 마치면 업종별 규제, 개선 힌트, 보안 전문가 상담으로 이어지는 링크를 보여 주고, 회사 이름을 입력하지 않아도 돼요. 이 설명은 모두 네이버클라우드가 직접 밝힌 내용이에요.",
          "source": "https://navercorp.com/media/pressReleasesDetail?seq=10034768",
          "officialUrl": "https://navercorp.com/media/pressReleasesDetail?seq=10034768",
          "verifiedAt": "2026-10-20",
          "slug": "naver-cloud-security-self-diagnosis",
          "tags": [
            "AI",
            "2026-w43",
            "네이버",
            "Security"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/efc240cf5126.png",
            "alt": "네이버클라우드, ‘보안 자가진단’ 사이트 오픈… “AI 시대 기업 보안, 진단부터 개선 방향을 한 번에”"
          },
          "en": {
            "title": "Naver Cloud Opens a Security Self-Diagnosis Site for Companies",
            "deck": "21 questions in 7 areas, including an area on AI usage security",
            "summary": "Naver Cloud said it opened a free security self-diagnosis site for companies on the 19th. It has 21 questions in 7 areas, and one area covers the security of AI usage environments.",
            "content": "Naver Cloud said it opened the 'Naver Cloud Security Self-Diagnosis' site on the 19th, where companies can check their security status easily and quickly. The service is free, and Naver Cloud explained that just by answering the online diagnostic survey, a company can see at a glance which security areas to consider improving.\n\nThe diagnosis consists of 21 questions in 7 areas. One of them is a separate area on 'AI usage environment security', which covers responses to AI-automated attacks, policies against sensitive-data leakage when staff use AI, and access rights of internal AI systems.\n\nAfter the survey, the site shows industry-specific regulations, improvement hints, and a link to security-expert consultation, and no company name is needed. All of this is Naver Cloud's own description."
          }
        },
        {
          "date": "10/19",
          "platform": "Web",
          "title": "네이버 파파고, 방한 외국인용 ‘트렌드’ 서비스 선보여",
          "deck": "많이 찾는 상품과 장소를 AI 브리핑으로 안내해요",
          "summary": "네이버가 파파고 앱에 방한 외국인이 가장 많이 찾는 상품과 장소를 보여주는 ‘Trend(트렌드)’를 선보였어요. 상품을 고르면 기기 언어로 AI 브리핑이 나오고, 장소는 네이버 플레이스로 길찾기와 예약까지 이어져요.",
          "content": "네이버는 10월 19일 파파고 앱에 방한 외국인 이용자의 상품과 장소 탐색부터 방문, 예약까지 돕는 ‘Trend(트렌드)’ 서비스를 선보였다고 밝혔어요. 이미지 번역 이용 데이터를 바탕으로 외국인이 가장 많이 찾아보는 상품과 장소를 보여줘요.\n\n상품을 선택하면 기기 언어로 제공되는 AI 브리핑과 함께 블로그, 네이버 쇼핑 리뷰를 볼 수 있어요. 장소는 네이버 플레이스의 영업시간, 리뷰, 길찾기, 예약으로 이어져요.\n\n지원 언어는 영어, 일본어, 중국어 간체와 번체이고, 그 밖의 언어는 영어로 안내돼요. 네이버는 보도자료에서 파파고를 AI 플랫폼이라고 설명했는데, 이는 네이버가 스스로 붙인 표현이에요. 이번 서비스에서 AI는 브리핑 기능을 맡는 한 요소예요.",
          "source": "https://navercorp.com/media/pressReleasesDetail?seq=10034765",
          "officialUrl": "https://navercorp.com/media/pressReleasesDetail?seq=10034765",
          "verifiedAt": "2026-10-20",
          "slug": "naver-papago-trend",
          "tags": [
            "AI",
            "2026-w43",
            "네이버",
            "Korea"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/56c88029c726.png",
            "alt": "“한국에서 뭘 사고, 어디 갈까?”… 네이버 파파고, ‘Trend(트렌드)’로 한국 여행 길잡이 된다"
          },
          "en": {
            "title": "Naver Papago Launches a Trend Service for Visitors to Korea",
            "deck": "An AI briefing guides foreign visitors to popular products and places",
            "summary": "Naver added a Trend service to its Papago app that shows foreign visitors the products and places they search for most. Selecting a product gives an AI briefing in the device language, and places link to Naver Place for directions and reservations.",
            "content": "On October 19, Naver said it introduced a Trend service in the Papago app that helps foreign visitors to Korea from discovering products and places through visiting and booking. Based on image-translation usage data, it shows the products and places foreigners look up most.\n\nSelecting a product gives an AI briefing provided in the device language, plus blogs and Naver Shopping reviews. Places link to Naver Place hours, reviews, directions, and reservations.\n\nThe service supports English, Japanese, and Simplified and Traditional Chinese, with English as the fallback for other languages. The press release also calls Papago an AI platform, which is Naver's own description. In this service, AI is one element that powers the briefing feature."
          }
        }
      ]
    },
    {
      "name": "NVIDIA",
      "color": "#76B900",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "NVIDIA, EBU와 유럽 방송사용 주권형 AI 에이전트 프레임워크 확대",
          "deck": "방송사가 데이터 통제권을 유지하며 에이전트를 배포하는 틀이에요",
          "summary": "NVIDIA가 베를린 행사에서 유럽방송연맹(EBU)과 주권형 프레임워크를 클라우드, 오픈 모델, 통합 파트너로 넓힌다고 밝혔어요. Adobe Frame.io의 NVIDIA 가속 검색 속도 향상 수치는 업체 측 주장이에요.",
          "content": "NVIDIA는 10월 19일 공식 블로그에서 베를린 행사에 맞춰 유럽방송연맹(EBU)이 NVIDIA와 협력해 주권형(sovereign) 프레임워크를 클라우드, 오픈 모델, 통합 파트너로 확장한다고 밝혔어요. 방송사가 데이터, 인프라, 모델, 보안의 통제권을 유지하면서 에이전트를 배포하는 방식을 정의하는 틀이라고 설명했어요.\n\n글에 이름이 오른 파트너는 Microsoft(Sovereign Cloud, Azure Local, Foundry Local), Nebius, NVIDIA Nemotron 오픈 모델, Qvest예요. 제품 출시가 아니라 표준과 프레임워크를 넓히는 이니셔티브를 소개하는 발표예요.\n\n글에는 Adobe 사례도 있어요. NVIDIA 가속을 적용한 Frame.io 검색이 임베딩 생성은 약 5배 빠르고 처리량은 최대 4배 높으며 지연 시간은 최대 5배 낮다고 소개했어요. 독일 제작사 UFA를 위한 영상 검색 시연도 함께 소개됐어요. 이 수치는 업체 측 주장이고, 글에는 독립 테스트가 인용되지 않았어요.",
          "source": "https://blogs.nvidia.com/blog/media-agentic-security-european-public-service-broadcasting-global-content-production/",
          "officialUrl": "https://blogs.nvidia.com/blog/media-agentic-security-european-public-service-broadcasting-global-content-production/",
          "verifiedAt": "2026-10-20",
          "slug": "nvidia-ebu-sovereign-agents-media",
          "tags": [
            "AI",
            "2026-w43",
            "NVIDIA",
            "Media"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/cc71d3d3954a.jpg",
            "alt": "NVIDIA Advances Agentic Security for Media, From European Public Service Broadcasting to Global Content Production"
          },
          "en": {
            "title": "NVIDIA Expands a Sovereign AI Agent Framework for European Broadcasters With the EBU",
            "deck": "A framework for deploying agents while broadcasters keep control of their data",
            "summary": "At an event in Berlin, NVIDIA said it is expanding the European Broadcasting Union (EBU) sovereign framework with cloud, open models, and integration partners. The speedup figures for Adobe Frame.io's NVIDIA-accelerated search are vendor claims.",
            "content": "In an official blog post on October 19, NVIDIA said that at an event in Berlin, the European Broadcasting Union (EBU) is collaborating with NVIDIA to expand its sovereign framework with cloud, open models, and integration partners. NVIDIA described the framework as defining how broadcasters deploy agents while keeping control of their data, infrastructure, models, and security.\n\nThe partners named in the post are Microsoft (Sovereign Cloud, Azure Local, Foundry Local), Nebius, NVIDIA Nemotron open models, and Qvest. The announcement presents an initiative to extend standards and a framework, not a product release.\n\nThe post also includes an Adobe example. It says NVIDIA-accelerated Frame.io search brings about 5x faster embedding generation, up to 4x higher throughput, and up to 5x lower latency, and it mentions a video search showcase for the German producer UFA. These figures are vendor claims, and the post cites no independent test."
          }
        },
        {
          "date": "10/19",
          "platform": "Web",
          "title": "NVIDIA, 독일 총리와 산업 AI 논의하고 스타트업 4곳 투자 계획 발표",
          "deck": "물리 AI 협력 의향 공동선언과 독일 스타트업 투자 계획이에요",
          "summary": "NVIDIA가 베를린에서 메르츠 독일 총리와 젠슨 황 CEO가 독일의 AI 로드맵을 논의했다고 밝혔어요. NVIDIA와 독일 연방 부처 두 곳은 물리 AI 모델 협력 의향 공동선언에 서명했고, 황 CEO는 스타트업 4곳 투자 계획을 발표했어요.",
          "content": "NVIDIA는 10월 19일 공식 블로그에서 베를린의 옛 발전소 Kraftwerk에서 프리드리히 메르츠 독일 총리와 NVIDIA 창업자이자 CEO인 젠슨 황이 독일의 AI 로드맵, 특히 산업 분야 AI 활용을 논의했다고 전했어요.\n\n블로그에 따르면 메르츠 총리, 연방 경제에너지부, 연방 연구기술우주부가 NVIDIA와 공동 의향 선언(Joint Declaration of Intent)에 서명했어요. 물리 AI를 위한 최첨단 AI 모델을 함께 연구하겠다는 의향을 밝힌 선언이에요.\n\n황 CEO는 독일 스타트업 4곳, 즉 Agile Robots, Avelios Medical, Mirelo, Reflex Aerospace에 대한 새 투자를 발표했어요. NVIDIA는 이를 유럽 전체에 걸친 100억 달러에 가까운 투자 약속의 일부라고 설명했고, 글에서는 이 투자를 새로 계획된 투자라고 표현해요. 투자가 이미 마무리됐다는 뜻은 아니에요.\n\n글에는 Siemens 사례도 실렸어요. NVIDIA는 엔지니어링 작업량이 최대 85% 줄고 비용이 최대 20% 절감된다는 수치를 소개했고, JUPITER에서 104큐비트 시뮬레이션을 했다는 내용도 전했어요. 이 수치들은 NVIDIA 글에 나온 업체 측 주장이고, 측정 조건은 여기서 확인하지 못했어요.",
          "source": "https://blogs.nvidia.com/blog/germany-wants-to-lead-the-world-in-industrial-ai-how-nvidia-will-help/",
          "officialUrl": "https://blogs.nvidia.com/blog/germany-wants-to-lead-the-world-in-industrial-ai-how-nvidia-will-help/",
          "verifiedAt": "2026-10-20",
          "slug": "nvidia-germany-industrial-ai",
          "tags": [
            "AI",
            "2026-w43",
            "NVIDIA",
            "Models"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/993d36b78c48.jpg",
            "alt": "Germany Wants to Lead the World in Industrial AI: How NVIDIA Will Help"
          },
          "en": {
            "title": "NVIDIA Discusses Industrial AI With the German Chancellor and Plans Investments in 4 Startups",
            "deck": "A joint declaration of intent on physical AI and planned investments in German startups",
            "summary": "NVIDIA said German Chancellor Friedrich Merz and CEO Jensen Huang discussed Germany's AI roadmap in Berlin. NVIDIA and two German federal ministries signed a joint declaration of intent on physical AI models, and Huang announced planned investments in four German startups.",
            "content": "In an official blog post on October 19, NVIDIA reported that German Chancellor Friedrich Merz and NVIDIA founder and CEO Jensen Huang sat down at Kraftwerk, a former power station in Berlin, to discuss Germany's AI roadmap, and in particular the industrial applications of AI.\n\nAccording to the blog, Chancellor Merz, the Federal Ministry for Economic Affairs and Energy, and the Federal Ministry for Research, Technology and Space signed a Joint Declaration of Intent with NVIDIA. It states an intention to work together on cutting edge AI models for physical AI.\n\nHuang announced new investments in four German startups: Agile Robots, Avelios Medical, Mirelo, and Reflex Aerospace. NVIDIA described them as part of a commitment of nearly $10 billion across Europe, and the post calls them new planned investments. That does not mean the investments have already closed.\n\nThe post also includes Siemens examples. NVIDIA cited figures of up to 85% less engineering effort and up to 20% cost savings, and it reported a 104-qubit simulation on JUPITER. These figures are vendor claims from the NVIDIA post, and the conditions behind them could not be confirmed here."
          }
        },
        {
          "date": "10/19",
          "platform": "Web",
          "title": "NVIDIA, CUDA Tile로 Mamba-2 순전파 커널 최적화",
          "deck": "B300 한 장에서 Triton 커널 대비 1.14배에서 1.82배라고 밝혔어요",
          "summary": "NVIDIA 기술 블로그는 Jane Street의 머신러닝 엔지니어들이 Mamba-2 상태공간 모델의 순전파 커널을 CUDA Tile(cuTile)로 구현해 최적화한 과정을 소개했어요. 커널 단위 속도 향상이 Triton 기준 대비 1.14배에서 1.82배라고 밝혔어요.",
          "content": "NVIDIA는 개발자 블로그에서 Jane Street의 머신러닝 엔지니어들이 Mamba-2 상태공간 모델을 cuTile로 구현하고, NVIDIA와 함께 순전파(forward pass)용 커널 3개를 최적화했다고 소개했어요. 커널은 chunk_cumsum, fwd_pass_state, compute_out이에요. cuTile은 NVIDIA GPU용 Python 기반 DSL이자 병렬 프로그래밍 모델이라고 NVIDIA는 설명해요.\n\nNVIDIA는 최적화한 cuTile 순전파 커널이 오픈소스 Triton Mamba-2 커널(mamba_ssm 2.3.2.post1)보다 NVIDIA B300 SXM6 한 장에서 1.14배에서 1.82배 빨랐다고 밝혔어요. 다만 이는 커널 단위 속도 향상일 뿐이고, 학습 전체 속도는 역전파(backward pass)에도 좌우된다고 글에서 짚었어요.\n\n속도 수치는 NVIDIA와 Jane Street의 결과이고, 독립적으로 재현된 것은 아니에요.",
          "source": "https://developer.nvidia.com/blog/accelerating-mamba-2-with-high-performance-forward-pass-kernels-in-nvidia-cuda-tile/",
          "officialUrl": "https://developer.nvidia.com/blog/accelerating-mamba-2-with-high-performance-forward-pass-kernels-in-nvidia-cuda-tile/",
          "verifiedAt": "2026-10-20",
          "slug": "nvidia-mamba2-cuda-tile-kernels",
          "tags": [
            "AI",
            "2026-w43",
            "NVIDIA",
            "Devtools"
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/319656acc275.webp",
            "alt": "Decorative math image."
          },
          "en": {
            "title": "NVIDIA Optimizes Mamba-2 Forward-Pass Kernels in CUDA Tile",
            "deck": "1.14x to 1.82x versus a Triton kernel on one B300, NVIDIA says",
            "summary": "NVIDIA's technical blog describes how Jane Street machine learning engineers implemented and optimized the forward-pass kernels of the Mamba-2 state-space model in NVIDIA CUDA Tile (cuTile). NVIDIA reports kernel-level speedups of 1.14x to 1.82x over a Triton baseline.",
            "content": "NVIDIA said on its developer blog that machine learning engineers at Jane Street implemented the Mamba-2 state-space model in cuTile and partnered with NVIDIA to optimize three custom kernels for the forward pass. The kernels are chunk_cumsum, fwd_pass_state, and compute_out. NVIDIA describes cuTile as a Python-based DSL and parallel programming model for NVIDIA GPUs.\n\nNVIDIA says the optimized cuTile forward-pass kernels are 1.14x to 1.82x faster than an open-source Triton Mamba-2 kernel (mamba_ssm 2.3.2.post1) on a single NVIDIA B300 SXM6. It notes these are kernel-level speedups only, because end-to-end training speed also depends on the backward pass.\n\nThe speedup figures are results from NVIDIA and Jane Street and were not independently reproduced."
          }
        }
      ]
    },
    {
      "name": "OpenAI",
      "color": "#10A37F",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "OpenAI, 저자원 프로그래밍 언어 코딩 평가 결과 공개",
          "deck": "MultiLangBench와 COBOL 마이그레이션 평가를 함께 발표했어요",
          "summary": "OpenAI가 COBOL, Fortran, Visual Basic 같은 저자원 언어에서의 코딩 능력을 다룬 글을 게시하고 MultiLangBench와 COBOL 마이그레이션 평가를 소개했어요. OpenAI는 GPT-6 Astra가 MultiLangBench에서 87.4%, GPT-6.1 Sol이 COBOL 마이그레이션에서 86.6%라고 밝혔어요.",
          "content": "OpenAI는 COBOL, Fortran, Visual Basic 같은 저자원 프로그래밍 언어에서 모델의 코딩 능력을 다룬 글을 게시했어요. 이를 위해 평가 두 가지를 새로 만들었다고 해요. MultiLangBench는 모델이 SQLite와 호환되는 데이터베이스 엔진을 처음부터 20개 프로그래밍 언어로 만들 수 있는지 시험하고, 나머지 하나는 COBOL 마이그레이션 평가예요.\n\nOpenAI가 밝힌 결과는 다음과 같아요.\n\n- MultiLangBench에서 GPT-6 Astra의 20개 언어 평균 테스트 통과율은 87.4%로, GPT-5.6 Sol의 26.8%보다 높아요.\n- GPT-6 Luna는 추정 API 비용이 약 78% 낮은 조건에서 40.3%에 도달했어요.\n- COBOL 마이그레이션에서 GPT-6.1 Sol은 낮은 추론 강도에서 정확도 86.6%를 기록했고, GPT-5.6 Sol은 5.4%였어요. 비용은 39% 적었고, 더 높은 추론 강도에서는 97.9%에 이르렀어요.\n\n이 수치는 모두 OpenAI가 만든 평가에서 OpenAI가 직접 측정한 결과예요. OpenAI는 MultiLangBench의 설정과 테스트 모음을 GitHub에 공개한다고 밝혔어요.",
          "source": "https://openai.com/index/low-resource-programming-languages",
          "officialUrl": "https://openai.com/index/low-resource-programming-languages",
          "verifiedAt": "2026-10-20",
          "slug": "openai-low-resource-programming-languages",
          "tags": [
            "AI",
            "2026-w43",
            "OpenAI",
            "Research"
          ],
          "backupUrls": [
            {
              "label": "OpenAI 뉴스 RSS",
              "url": "https://openai.com/news/rss.xml"
            },
            {
              "label": "MultiLangBench GitHub 저장소",
              "url": "https://github.com/openai/MultiLangBench"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/cc9b8048ba44.png",
            "alt": "Advancing coding in low‑resource programming languages",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "OpenAI Publishes Results on Coding in Low-Resource Programming Languages",
            "deck": "It introduced MultiLangBench and a COBOL migration evaluation",
            "summary": "OpenAI published an article on its models' coding in low-resource languages such as COBOL, Fortran, and Visual Basic, introducing MultiLangBench and a COBOL migration evaluation. OpenAI reports GPT-6 Astra at 87.4% on MultiLangBench and GPT-6.1 Sol at 86.6% on COBOL migration.",
            "content": "OpenAI published an article on its models' coding ability in low-resource programming languages such as COBOL, Fortran, and Visual Basic. It says it developed two evaluations. MultiLangBench tests whether a model can build a SQLite-compatible database engine from scratch across 20 different programming languages, and the other is a COBOL migration evaluation.\n\nThe results OpenAI reports are as follows.\n\n- On MultiLangBench, GPT-6 Astra achieves an average test pass rate of 87.4% across 20 programming languages, up from 26.8% for GPT-5.6 Sol.\n- GPT-6 Luna reaches 40.3% at approximately 78% lower estimated API cost.\n- On COBOL migration, GPT-6.1 Sol achieves 86.6% accuracy at low reasoning effort, compared with just 5.4% for GPT-5.6 Sol, while costing 39% less. It reaches 97.9% at higher effort.\n\nAll of these figures are OpenAI's own measurements on evaluations OpenAI created. OpenAI says it is releasing the MultiLangBench setup and test suite on GitHub."
          }
        }
      ]
    },
    {
      "name": "Perplexity",
      "color": "#7C3AED",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "Perplexity, Computer Ultrafast 옵션과 Decisions API 추가",
          "deck": "Max 구독자는 GPT-6 Astra와 6.1 Sol을 더 빠르게 쓸 수 있어요",
          "summary": "Perplexity가 웹 Computer에서 GPT-6 Astra와 GPT-6.1 Sol의 속도를 우선하는 Ultrafast 옵션을 Max 구독자에게 열었어요. 같은 변경 로그에서 오픈 가중치 모델 pplx-decider v1.2를 쓰는 Decisions API와 Enterprise 관리자용 커넥터 접근 제어도 소개했어요.",
          "content": "Perplexity는 변경 로그의 한 항목으로 여러 기능을 함께 공개했어요.\n\n- Computer의 Ultrafast 옵션은 웹의 Computer에서 GPT-6 Astra와 GPT-6.1 Sol의 응답 속도를 우선시하는 선택지이고, Max 구독자가 쓸 수 있어요. Ultrafast는 Normal이나 Fast보다 크레딧을 더 많이 써요.\n- Decisions API는 콘텐츠를 분류하고 확률과 함께 점수를 매기는 API예요. 27B 표준 모델과 4B Flash 모델인 pplx-decider v1.2 중에서 API로 고르거나 오픈 가중치를 내려받을 수 있어요. Perplexity는 1.2 버전의 추론이 최대 5배 빠르다고 밝혔고, API 입력 하나에 질문을 최대 128개까지 담을 수 있어요.\n- 영업팀 지원형 Enterprise 요금제의 관리자는 역할 기반으로 커넥터 접근 권한을 정할 수 있어요.\n\n같은 항목에 Projects용 Mac 로컬 폴더(Mac 앱 26.38 이상)와 슬라이드와 문서의 썸네일 레일도 추가됐어요. 5배라는 속도 수치는 Perplexity의 자체 주장이에요.",
          "source": "https://www.perplexity.ai/changelog/ultrafast-computer-models-decisions-api-and-connector-controls",
          "officialUrl": "https://www.perplexity.ai/changelog/ultrafast-computer-models-decisions-api-and-connector-controls",
          "verifiedAt": "2026-10-20",
          "slug": "perplexity-ultrafast-decisions-api",
          "tags": [
            "AI",
            "2026-w43",
            "Perplexity",
            "Agents"
          ],
          "backupUrls": [
            {
              "label": "Perplexity 변경 로그 목록",
              "url": "https://www.perplexity.ai/changelog"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/5173f5effa3d.png",
            "alt": "Computer’s Custom model settings showing GPT-6 Astra, High reasoning, and Ultrafast speed against a light-trail background."
          },
          "en": {
            "title": "Perplexity Adds Ultrafast Option in Computer and a Decisions API",
            "deck": "Max subscribers get faster GPT-6 Astra and GPT-6.1 Sol",
            "summary": "Perplexity opened an Ultrafast option, which prioritizes speed for GPT-6 Astra and GPT-6.1 Sol in Computer on web, to Max subscribers. The same changelog entry introduces a Decisions API with open-weight pplx-decider v1.2 models and connector access controls for Enterprise admins.",
            "content": "Perplexity released several features together in one changelog entry.\n\n- The Ultrafast option in Computer prioritizes response speed for GPT-6 Astra and GPT-6.1 Sol in Computer on web, and is available to Max subscribers. Ultrafast uses more credits than Normal or Fast.\n- The Decisions API classifies and scores content with probabilities. Users can choose the 27B standard or 4B Flash pplx-decider v1.2 model through the API or download the open weights. Perplexity says version 1.2 has up to 5x faster inference, and one API input can hold up to 128 questions.\n- Admins on sales-assisted Enterprise plans can set role-based connector access.\n\nThe same entry also adds a local Mac folder for Projects (Mac app 26.38 or later) and a thumbnail rail for slides and documents. The 5x speed figure is Perplexity's own claim."
          }
        }
      ]
    },
    {
      "name": "SGLang",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "SGLang v0.5.22 릴리스, 새 모델 지원과 DeepSeek-V4.1 처리량 개선",
          "deck": "Apple Silicon Mac 지원과 모델 로딩 속도 개선도 담았어요",
          "summary": "SGLang 프로젝트가 v0.5.22를 릴리스했어요. PR 950개와 기여자 245명이 참여했고 Clef, PPLX-Decider, EmbeddingGemma 2 같은 새 모델을 지원해요. 속도 수치는 프로젝트 자체 주장이에요.",
          "content": "SGLang 프로젝트(sgl-project)가 10월 19일 v0.5.22를 릴리스했어요. 릴리스 노트는 기여자 245명이 보낸 PR 950개가 담겼다고 밝혔어요.\n\n새로 지원하는 모델로는 Clef / Clef Flash, PPLX-Decider v1 / v1.1, EmbeddingGemma 2, LLaDA2.2, Kandinsky 6, Wan-Animate-2, SANA-Video 2.0이 나열돼 있어요.\n\n프로젝트가 밝힌 변화는 다음과 같아요.\n\n- DeepSeek-V4.1은 H200에서 GPU당 처리량이 최대 2.3배 늘어요. AMD MI350X / MI355X에서도 실행되고, DSpark로 처리량이 최대 1.9배까지 늘어난다고 해요.\n- 새 InstantTensor 로더로 모델이 10배 빠르게 로드돼요.\n- 표준 PyTorch 백엔드로 Apple Silicon Mac에서도 실행되며, MLX와 함께 쓸 수 있어요.\n- 업그레이드하려면 이제 Python 3.11 이상이 필요해요.\n\n속도 수치는 모두 SGLang 프로젝트가 직접 밝힌 것이고 독립적으로 측정한 값은 아니에요.",
          "source": "https://github.com/sgl-project/sglang/releases/tag/v0.5.22",
          "officialUrl": "https://github.com/sgl-project/sglang/releases/tag/v0.5.22",
          "verifiedAt": "2026-10-20",
          "slug": "sglang-v0-5-22",
          "tags": [
            "AI",
            "2026-w43",
            "SGLang",
            "Open Source"
          ],
          "backupUrls": [
            {
              "label": "SGLang 릴리스 피드",
              "url": "https://github.com/sgl-project/sglang/releases.atom"
            },
            {
              "label": "GitHub API 릴리스 기록",
              "url": "https://api.github.com/repos/sgl-project/sglang/releases/tags/v0.5.22"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/12fd3bae4842.png",
            "alt": "Release v0.5.22 · sgl-project/sglang",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "SGLang v0.5.22 Adds New Model Support and Higher DeepSeek-V4.1 Throughput",
            "deck": "It also brings Apple Silicon Mac support and faster model loading",
            "summary": "The SGLang project released v0.5.22. It includes 950 PRs from 245 contributors and supports new models such as Clef, PPLX-Decider, and EmbeddingGemma 2. The speed figures are the project's own claims.",
            "content": "The SGLang project (sgl-project) released v0.5.22 on October 19. The release notes say it highlights 950 PRs from 245 contributors.\n\nThe new models listed are Clef / Clef Flash, PPLX-Decider v1 / v1.1, EmbeddingGemma 2, LLaDA2.2, Kandinsky 6, Wan-Animate-2, and SANA-Video 2.0.\n\nThe changes the project describes are as follows.\n\n- DeepSeek-V4.1 gets up to 2.3x more throughput per GPU on H200. It also runs on AMD MI350X / MI355X, with up to 1.9x throughput from DSpark.\n- Models load 10x faster with the new InstantTensor loader.\n- SGLang now runs on Apple Silicon Macs with the standard PyTorch backend, alongside MLX.\n- Upgrading now requires Python 3.11 or newer.\n\nAll speed figures are the SGLang project's own claims and were not independently measured."
          }
        }
      ]
    },
    {
      "name": "Skyfall AI",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "Skyfall AI, 엔지니어링용 월드 모델 SKY-001 공개",
          "deck": "이미지에서 CAD 부품 구조를, 윤곽에서 건물 배치를 만들어요",
          "summary": "Skyfall AI가 복잡한 시스템을 부분으로 나눠 수백에서 수천 단계의 구성 과정에서도 일관성을 유지하는 공간 월드 모델 SKY-001을 소개했어요. 회사는 자체 CAD 벤치마크에서 GPT-6 Astra와 비슷한 79.7% 대 79.1% IoU를 더 짧은 시간과 낮은 비용으로 냈다고 주장해요.",
          "content": "Skyfall AI는 SKY-001을 복잡한 시스템을 관리 가능한 부분으로 나누고, 수백에서 수천 단계에 이르는 구성 과정에서도 일관성을 유지하는 공간 월드 모델이라고 소개했어요. 회사는 이 모델을 엔지니어링용 월드 모델이라고 부르며 최초라고 내세우는데, 이는 Skyfall AI 스스로의 표현이에요.\n\n블로그에는 두 가지 작업이 시연돼요.\n\n- CAD에서는 제품 이미지를 부품과 조립체의 계층 구조로 바꾸고, 각 부품을 만드는 스케치와 작업까지 만들어요.\n- BIM에서는 건물 윤곽을 유닛 배치로, 각 유닛을 방 단위로 나눠요.\n\nSkyfall AI가 직접 실행한 벤치마크 결과도 공개됐어요. 구성 요소 1,000개 CAD 벤치마크에서 SKY-001은 사례당 3.9초, 0.005달러에 IoU 79.7%를 기록했고, GPT-6 Astra는 199초, 0.75달러에 79.1%였어요. 평면도 1,000개 BIM 벤치마크에서는 SKY-001이 1.22초, 0.0024달러에 43.6%였고, GPT-6 Astra는 40.6%였어요.\n\n회사는 SKY-001이 시간과 비용의 일부만으로 프런티어 모델과 같거나 더 나은 성능을 낸다고 주장해요. 다만 최초라는 표현과 모든 수치는 Skyfall AI의 자체 결과이고 독립적으로 재현되지 않았어요.",
          "source": "https://skyfall.ai/blog/introducing-sky-001",
          "officialUrl": "https://skyfall.ai/blog/introducing-sky-001",
          "verifiedAt": "2026-10-20",
          "slug": "skyfall-sky-001-engineering-world-model",
          "tags": [
            "AI",
            "2026-w43",
            "Skyfall AI",
            "Models"
          ],
          "backupUrls": [
            {
              "label": "SKY-001 제품 페이지",
              "url": "https://skyfall.ai/sky-001"
            },
            {
              "label": "Skyfall 사이트맵",
              "url": "https://skyfall.ai/sitemap.xml"
            }
          ],
          "thumbnail": {
            "src": "/source-media/weekly-20261020/5c911dc58acb.jpg",
            "alt": "Introducing SKY-001: The First World Model for Engineering · Skyfall AI",
            "provenance": "source-share-preview"
          },
          "en": {
            "title": "Skyfall AI Introduces SKY-001, a World Model for Engineering",
            "deck": "It builds CAD part hierarchies from an image and BIM layouts from an outline",
            "summary": "Skyfall AI introduced SKY-001, a spatial world model that breaks a complex system into parts and keeps them consistent across hundreds or thousands of construction steps. The company claims 79.7% IoU versus 79.1% for GPT-6 Astra on its own CAD benchmark, in less time and at lower cost.",
            "content": "Skyfall AI describes SKY-001 as a spatial world model that breaks a complex system into manageable parts and keeps them consistent across hundreds or thousands of construction steps. The company calls it a world model for engineering and bills it as the first of its kind, which is Skyfall AI's own wording.\n\nThe blog shows two tasks.\n\n- In CAD, it turns an image of an engineered product into a hierarchy of assemblies and parts, with the sketches and operations that build each part.\n- In BIM, it turns a building outline into a layout of units, and each unit into its rooms.\n\nSkyfall AI also published benchmark results that it ran itself. On a 1,000-component CAD construction benchmark, SKY-001 takes 3.9 s per case at $0.005 and scores 79.7% IoU, against 79.1% for GPT-6 Astra at 199 s and $0.75. On a 1,000-floor-plan BIM benchmark, SKY-001 takes 1.22 s at $0.0024 and scores 43.6% IoU, against 40.6% for GPT-6 Astra.\n\nThe company claims SKY-001 matches or exceeds frontier models in a fraction of the time and cost. However, the first claim and all figures are Skyfall AI's own results and were not independently reproduced."
          }
        }
      ]
    },
    {
      "name": "과학기술정보통신부",
      "color": "#003478",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "과기정통부·세계은행, 서울에서 글로벌 AI·디지털 서밋 개최",
          "deck": "첫날 장관회의가 열려 의장 성명이 나왔어요",
          "summary": "과학기술정보통신부가 세계은행과 함께 10월 19일부터 22일까지 서울에서 글로벌 AI·디지털 서밋(GADS)을 열고 있어요. 첫날 AI·디지털 장관회의에서 의장 성명이 발표됐고, 참석 국가 수는 자료마다 50여 개국과 60여 개국으로 달라요.",
          "content": "과학기술정보통신부는 세계은행과 공동으로 ‘글로벌 AI·디지털 서밋(GADS)’을 2026년 10월 19일부터 22일까지 서울 그랜드 하얏트 서울에서 연다고 밝혔어요. 첫날인 19일 오전 9시부터 오후 1시까지 각국 장·차관급 대표가 참석한 AI·디지털 장관회의가 열렸고, 부총리와 세계은행 부총재가 공동 의장을 맡았어요. 주제는 ‘From Ambition to Action’이고, 회의 뒤에 의장 성명이 발표됐어요.\n\n과기정통부는 이번 서밋을 세계은행이 미국 밖에서 처음 여는 AI·디지털 서밋이라고 소개했어요. 이 ‘처음’이라는 표현은 부처의 주장이에요.\n\n참석 국가 수는 확정되지 않았어요. 보도자료 본문에는 50여 개국, 페이지 메타데이터에는 60여 개국으로 적혀 있고, 별도 매체 보도는 60여 개국이라고 전했어요.\n\n서밋 일정은 10월 22일까지 이어져요.",
          "source": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785665",
          "officialUrl": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785665",
          "verifiedAt": "2026-10-20",
          "slug": "msit-world-bank-global-ai-digital-summit",
          "tags": [
            "AI",
            "2026-w43",
            "과학기술정보통신부",
            "Korea"
          ],
          "backupUrls": [
            {
              "label": "과기정통부 보도자료 페이지",
              "url": "https://www.msit.go.kr/bbs/view.do?sCode=user&mId=307&mPid=208&pageIndex=&bbsSeqNo=94&nttSeqNo=3187874"
            },
            {
              "label": "AI타임스 보도",
              "url": "https://www.aitimes.com/news/articleView.html?idxno=216394"
            }
          ],
          "en": {
            "title": "Korea's Science Ministry and the World Bank Hold the Global AI Digital Summit in Seoul",
            "deck": "The ministerial meeting on day one ended with a chair's statement",
            "summary": "Korea's Ministry of Science and ICT is co-hosting the Global AI·Digital Summit (GADS) with the World Bank in Seoul from October 19 to 22. An AI·digital ministerial meeting on day one ended with a chair's statement, and the number of attending countries differs between sources, 50 or 60.",
            "content": "The Ministry of Science and ICT said it is co-hosting the Global AI·Digital Summit (GADS) with the World Bank at the Grand Hyatt Seoul from October 19 to 22, 2026. On day one, October 19, an AI·digital ministerial meeting with ministerial and vice-ministerial representatives from many countries ran from 9 a.m. to 1 p.m. The Deputy Prime Minister and a World Bank vice president co-chaired it. The theme was From Ambition to Action, and a chair's statement was issued after the meeting.\n\nThe ministry describes the summit as the first AI·digital summit the World Bank holds outside the US. The word first is the ministry's claim.\n\nThe number of attending countries is unresolved. The press release body says more than 50 countries, while the page metadata says more than 60, and a separate media report said more than 60.\n\nThe summit schedule continues through October 22."
          }
        }
      ]
    },
    {
      "name": "기후에너지환경부",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "기후에너지환경부, AI 정수장 국제표준 추진 계획 발표",
          "deck": "수도법 근거 마련과 ISO 표준 제정을 추진한다고 밝혔어요",
          "summary": "기후에너지환경부와 국무조정실 규제합리화위원회가 물산업 규제합리화 방안을 마련했다고 밝혔어요. 이 가운데 AI 정수장은 법제도적 기반과 국제표준(ISO) 제정을 추진한다는 내용이고, AI는 여러 과제 중 하나예요.",
          "content": "기후에너지환경부와 국무조정실 규제합리화위원회는 ‘물산업 분야 경쟁국 수준 규제합리화 방안’을 마련했다고 10월 19일 보도자료로 밝혔어요. 방안에는 AI와 직접 관련 없는 과제가 여럿 함께 담겨 있어요. 하수와 유출지하수 등 다양한 수열원을 쓸 수 있도록 수열에너지 범위를 넓히는 안, 수원지역 수상 태양광, 댐 주변 지역 사업, 하천기금 지원 등이에요.\n\nAI와 관련된 내용은 AI 정수장이에요. 정부는 AI 정수장의 법제도적 기반 마련과 국제표준(ISO) 제정을 추진하겠다고 밝혔어요. 세부 방향으로는 수도법에 관련 조항을 신설하고, AI 인증과 평가 체계를 두고, 설계·시공·운영에 관한 일반 기준을 정하는 안이 제시됐어요.\n\n정부는 정수장 모든 공정에 AI를 도입한 사례가 세계에서 국내가 유일하다고 주장했어요. 이 표현은 정부 보도자료의 주장이에요. 또한 이번 발표는 추진 계획이고, 법 개정이나 표준 제정이 이미 이뤄진 것은 아니에요.",
          "source": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785596",
          "officialUrl": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785596",
          "verifiedAt": "2026-10-20",
          "slug": "mcee-ai-water-plant-standard",
          "tags": [
            "AI",
            "2026-w43",
            "기후에너지환경부",
            "Korea"
          ],
          "en": {
            "title": "Korea's Climate, Energy and Environment Ministry Plans an International Standard for AI Water Plants",
            "deck": "It says it will pursue a legal basis and an ISO standard",
            "summary": "Korea's Ministry of Climate, Energy and Environment and the regulatory reform committee under the Office for Government Policy Coordination said they prepared a water-industry deregulation plan. On AI water plants, it says the government will pursue a legal-institutional basis and an international (ISO) standard. AI is one item among several.",
            "content": "The Ministry of Climate, Energy and Environment and the regulatory reform committee under the Office for Government Policy Coordination said in a press release on October 19 that they prepared a plan to bring water-industry regulation to the level of competing countries. The plan contains several items not directly related to AI: widening the range of heat-source energy to cover sources such as sewage and leaked groundwater, floating solar power in water source zones, dam-area projects, and river-fund support.\n\nThe AI-related item concerns AI water treatment plants. The government said it will pursue a legal-institutional basis and an international (ISO) standard for them. The details presented include a new provision in the Water Supply Act, AI certification and evaluation, and general standards for design, construction, and operation.\n\nThe government claims that Korea is the only country in the world to have introduced AI in every process of a water treatment plant. That is a claim made in the government press release. The announcement is also a plan to pursue these steps, and no law has been amended and no standard has been established yet."
          }
        }
      ]
    },
    {
      "name": "미국 국토안보부",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "DHS, 연방 민간기관의 DeepSeek 제품 배제·제거 명령 고시 공개",
          "deck": "고시는 10월 19일 공개 열람에 올랐고 명령문은 7월 24일자예요",
          "summary": "미국 국토안보부(DHS)가 연방 민간기관 조달과 IT 시스템에서 DeepSeek 제품을 배제하고 제거하는 명령의 고시가 연방관보 공개 열람에 올라왔어요. 첨부된 명령문의 최초 발령일은 7월 24일이에요.",
          "content": "미국 국토안보부(DHS)가 연방 민간 행정기관의 조달과 정보기술 시스템에서 DeepSeek 제품을 배제하고 제거하는 명령을 알리는 고시가 10월 19일 연방관보(Federal Register) 공개 열람(public inspection)에 올라왔어요. 정식 게재일은 10월 20일로 표시돼 있어요.\n\n고시에 따르면 국토안보부 장관의 명령은 두 가지를 담고 있어요.\n\n- 항저우 DeepSeek 인공지능 회사(Hangzhou DeepSeek Artificial Intelligence Co., Ltd)와 계열 기관이 개발한 정보기술 제품과 서비스를 연방 민간기관 조달에서 배제해요.\n- DeepSeek와 계열사의 모든 제품, 그리고 DeepSeek 구현을 사용해 개발한 제3자 제품과 서비스를 민간기관의 정보기술에서 제거해요.\n\n명령은 2018년 연방조달 공급망 보안법(Federal Acquisition Supply Chain Security Act, 41 U.S.C. 1321-1328)을 근거로 해요. 고시 뒤에 붙은 명령문은 배제 및 제거 명령 #2026-01이고, 최초 발령일(Original Release Date)이 2026년 7월 24일로 적혀 있어요. 따라서 10월 19일에 올라온 것은 새 명령이 아니라 7월 24일자 명령을 알리는 고시예요. 명령문에는 예외 요청 기한이 60일로 적혀 있고, 국가안보시스템은 적용 대상에 포함되지 않아요.\n\n연방관보 문서번호는 2026-21447이고, 관리번호(Docket No.)는 DHS-2026-0628이에요.",
          "source": "https://public-inspection.federalregister.gov/2026-21447.pdf",
          "officialUrl": "https://public-inspection.federalregister.gov/2026-21447.pdf",
          "verifiedAt": "2026-10-20",
          "slug": "dhs-deepseek-exclusion-removal-order-notice",
          "tags": [
            "AI",
            "2026-w43",
            "미국 국토안보부",
            "Security"
          ],
          "backupUrls": [
            {
              "label": "연방관보 문서 페이지 (정식 게재일 10월 20일, Docket No. DHS-2026-0628)",
              "url": "https://www.federalregister.gov/documents/2026/10/20/2026-21447/notice-of-order-regarding-exclusion-and-removal-of-deepseek-products-from-federal-civilian-executive"
            },
            {
              "label": "연방관보 공개 열람 API (접수 10월 19일)",
              "url": "https://www.federalregister.gov/api/v1/public-inspection-documents/2026-21447.json"
            },
            {
              "label": "MeriTalk, 10월 19일 보도",
              "url": "https://www.meritalk.com/articles/dhs-orders-civilian-agencies-to-remove-deepseek-ai-products/"
            }
          ],
          "en": {
            "title": "DHS Notice on Removing DeepSeek Products From Federal Civilian Agencies Made Public",
            "deck": "The notice went on public inspection on October 19, and the order itself is dated July 24",
            "summary": "A notice of a U.S. Department of Homeland Security (DHS) order excluding and removing DeepSeek products from federal civilian agency procurement and IT systems was posted on public inspection at the Federal Register. The appended order's original release date is July 24.",
            "content": "A notice of an order by the U.S. Department of Homeland Security (DHS) to exclude DeepSeek products from federal civilian executive branch procurement and to remove them from their information technology systems went on public inspection at the Federal Register on October 19. The official publication date is shown as October 20.\n\nAccording to the notice, the Secretary of Homeland Security's order does two things.\n\n- It excludes information technology products and services developed by Hangzhou DeepSeek Artificial Intelligence Co., Ltd and its affiliated entities from federal civilian agency procurement.\n- It removes all DeepSeek and DeepSeek-affiliate products, along with third-party products and services developed using DeepSeek implementations, from civilian agency information technology.\n\nThe order rests on the Federal Acquisition Supply Chain Security Act of 2018 (41 U.S.C. 1321-1328). The order appended to the notice is Exclusion and Removal Order #2026-01, and its Original Release Date is July 24, 2026. So what appeared on October 19 is a notice of the July 24 order, not a new order. The order states a 60-day window for exception requests, and national security systems are not covered.\n\nThe Federal Register document number is 2026-21447, and the docket number is DHS-2026-0628."
          }
        }
      ]
    },
    {
      "name": "보건복지부",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "보건복지부 제2차관, 네이버 AI 데이터센터 ‘각 세종’ 방문",
          "deck": "AI 기본의료 전략을 위한 GPU와 보안 운영을 점검했어요",
          "summary": "보건복지부 제2차관이 10월 19일 네이버의 데이터센터 ‘각 세종’을 방문해 AI 기본의료 전략에 필요한 GPU와 AI 데이터센터 운영, 보안을 점검했어요. 정부 차원의 데이터센터 조성이 필요하다고 밝혔지만 예산이나 계약 같은 결정은 발표되지 않았어요.",
          "content": "보건복지부는 제2차관이 10월 19일 오후 2시 30분부터 4시 30분까지 세종 집현동의 네이버 데이터센터 ‘각(GAK) 세종’을 방문했다고 밝혔어요. AI 기본의료 전략을 본격 추진하는 데 앞서 인공지능데이터센터(AIDC)의 GPU와 AI 데이터센터 운영, 보안을 점검하기 위한 현장 방문이에요.\n\n제2차관은 ‘보건의료분야 데이터 수요 증가에 대비한 정부 차원의 데이터센터 조성 필요성을 확인했다’고 밝혔어요.\n\n이번 보도자료는 현장 점검 내용을 알리는 글이에요. 예산, 계약, 정책 결정은 발표되지 않았어요.",
          "source": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785687",
          "officialUrl": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785687",
          "verifiedAt": "2026-10-20",
          "slug": "mohw-naver-gak-sejong-medical-ai-visit",
          "tags": [
            "AI",
            "2026-w43",
            "보건복지부",
            "Korea"
          ],
          "en": {
            "title": "Korea's Second Vice Minister of Health Visits Naver's GAK Sejong AI Data Center",
            "deck": "He checked GPU and security operations for the basic medical AI strategy",
            "summary": "Korea's second vice minister of health visited Naver's data center GAK Sejong on October 19 to check GPU and AI data-center operation and security for the AI basic-medical strategy. He said a government-level data center is needed, but no budget, contract, or decision was announced.",
            "content": "The Ministry of Health and Welfare said its second vice minister visited Naver's data center GAK Sejong in Jiphyeon-dong, Sejong, on October 19 from 2:30 p.m. to 4:30 p.m. Ahead of the full-scale push of the AI basic-medical strategy, the visit was a site check of GPU and AI data-center operation and security at the AI data center (AIDC).\n\nThe vice minister said he confirmed the need for a government-level data center to prepare for rising demand for health and medical data.\n\nThis press release reports the site visit. No budget, contract, or policy decision was announced."
          }
        }
      ]
    },
    {
      "name": "식품의약품안전처",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "식약처, 식의약 공공데이터·AI 경진대회 우수작 5건 선정",
          "deck": "최고 수상작은 의약품·화장품 독성을 AI로 예측하는 플랫폼이에요",
          "summary": "식품의약품안전처가 2026년 식의약 공공데이터·AI 분석·활용 경진대회에서 우수작 5건을 선정해 10월 19일 시상했다고 밝혔어요. 응모작 180건 중 SMART-NAMs가 최고상(상금 500만 원)을 받았어요.",
          "content": "식품의약품안전처는 ‘2026년 식의약 공공데이터·AI 분석·활용 경진대회’에서 우수작 5건을 선정해 10월 19일 시상했다고 밝혔어요. 응모는 4월 6일부터 5월 29일까지 받았고 180건이 접수됐어요. 서류 심사를 통과한 11건 가운데 시민 심사단 7명이 수상작을 골랐어요.\n\n수상작은 다음과 같아요.\n\n- 최고상(상금 500만 원)은 SMART-NAMs가 받았어요. 식약처 공공데이터와 생명과학 데이터, AI를 활용해 의약품과 화장품의 독성을 예측하는 플랫폼이에요.\n- 우수상 2건은 약물로 인한 인지 저하와 고령층 복약 안전을 다룬 CODA와 의료기기 소프트웨어의 취약점을 다루는 도구가 받았어요.\n- 장려상은 2건이 선정됐어요.\n\n새 모델이나 제품 출시가 아니라 공모전 수상 소식이에요.",
          "source": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785697",
          "officialUrl": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785697",
          "verifiedAt": "2026-10-20",
          "slug": "mfds-public-data-ai-contest-winners",
          "tags": [
            "AI",
            "2026-w43",
            "식품의약품안전처",
            "Korea"
          ],
          "en": {
            "title": "Korea's MFDS Picks Five Winners in Its Public Data and AI Contest",
            "deck": "The top prize went to an AI platform that predicts drug and cosmetic toxicity",
            "summary": "Korea's Ministry of Food and Drug Safety (MFDS) said it selected five winners in its 2026 public-data and AI analysis contest and held the awards on October 19. SMART-NAMs won the top prize (5 million won) among 180 entries.",
            "content": "The Ministry of Food and Drug Safety (MFDS) said it selected five winners in the 2026 Food and Drug Public Data and AI Analysis and Utilization Contest and held the awards on October 19. Entries were accepted from April 6 to May 29, and 180 were submitted. A citizen panel of seven people chose the winners from 11 entries that passed document screening.\n\nThe winners are as follows.\n\n- SMART-NAMs won the top prize (5 million won). It is a platform that uses MFDS public data, life-science data, and AI to predict the toxicity of drugs and cosmetics.\n- Two excellence awards went to CODA, which addresses drug-induced cognitive decline and medication safety for older adults, and to a tool that addresses vulnerabilities in medical-device software.\n- Two encouragement awards were also chosen.\n\nThis is news of a contest award, not a new model or product launch."
          }
        }
      ]
    },
    {
      "name": "외교부",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "차지훈 주유엔대사, 「2027 AI 거버넌스 글로벌 대화」 공동의장 임명",
          "deck": "2027년 5월 뉴욕 회의에서 정부 간 협의를 이끌어요",
          "summary": "외교부가 차지훈 주유엔대사가 「2027 AI 거버넌스 글로벌 대화」 공동의장으로 임명됐다고 밝혔어요. 대화는 2027년 5월 3일과 4일 뉴욕에서 열릴 예정이에요.",
          "content": "외교부는 10월 19일 보도자료에서 차지훈 주유엔대사가 「2027 AI 거버넌스 글로벌 대화」 공동의장으로 임명됐다고 밝혔어요. 공동의장은 세인트키츠네비스 주유엔 대사인 Mutryce Williams와 함께 맡고, 대화는 2027년 5월 3일과 4일 뉴욕에서 열릴 예정이에요.\n\n외교부 설명에 따르면 이 대화는 2026년에 시작됐어요. 첫 회의는 2026년 7월 6일과 7일 제네바에서 열렸고, 163개국에서 3,000여 명의 대표단이 참여했다고 해요. 공동의장은 유엔총회 의장이 결의 79/325에 따라 임명해요.\n\n외교부는 공동의장이 의장단 요약(Co-Chairs' Summary)을 작성하고, AI 거버넌스 우선 분야에 대한 정부 간 협의를 이끌 것이라고 설명했어요. 이 협의 결과는 글로벌 디지털 컴팩트(Global Digital Compact) 고위급 검토에 반영된다고 해요. 역할에 대한 이 설명은 외교부의 표현이에요. 보도자료는 임명 시점을 구체적으로 밝히지 않았어요.",
          "source": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785678",
          "officialUrl": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785678",
          "verifiedAt": "2026-10-20",
          "slug": "mofa-ai-governance-global-dialogue-cochair",
          "tags": [
            "AI",
            "2026-w43",
            "외교부",
            "Korea"
          ],
          "en": {
            "title": "Korea's UN Ambassador Appointed Co-Chair of the 2027 Global Dialogue on AI Governance",
            "deck": "The co-chair will lead intergovernmental consultations at the May 2027 meeting in New York",
            "summary": "Korea's foreign ministry said its ambassador to the UN was appointed co-chair of the 2027 Global Dialogue on AI Governance. The dialogue is planned for May 3 and 4, 2027, in New York.",
            "content": "In a press release on October 19, Korea's foreign ministry said that Korea's UN ambassador, 차지훈, was appointed co-chair of the 2027 Global Dialogue on AI Governance. The role is shared with Mutryce Williams, the ambassador of St Kitts and Nevis to the UN, and the dialogue is planned for May 3 and 4, 2027, in New York.\n\nAccording to the ministry, the dialogue began in 2026. Its first session was held in Geneva on July 6 and 7, 2026, with a delegation of about 3,000 people from 163 countries. Co-chairs are appointed by the president of the UN General Assembly under resolution 79/325.\n\nThe ministry explained that the co-chair will write a Co-Chairs' Summary and lead intergovernmental consultations on priority areas of AI governance. It said the results of these consultations feed into the high-level review of the Global Digital Compact. This description of the role is the ministry's wording. The press release does not state when the appointment was made."
          }
        }
      ]
    },
    {
      "name": "한국고용정보원",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "한국고용정보원, NIA의 'AI 윤리 준수기관' 확인마크 획득",
          "deck": "AI 고용서비스 가이드라인과 거버넌스도 단계적으로 마련해요",
          "summary": "한국고용정보원이 한국지능정보사회진흥원(NIA)으로부터 인공지능(AI) 윤리 준수기관 확인마크를 받았다고 밝혔어요. 2025년 12월 선포한 윤리원칙을 바탕으로 AI 고용서비스 가이드라인과 거버넌스를 마련할 계획이에요.",
          "content": "한국고용정보원(KEIS)이 한국지능정보사회진흥원(NIA)으로부터 '인공지능(AI) 윤리 준수기관 확인마크'를 부여받았다고 10월 19일 보도자료로 밝혔어요. 이 마크는 AI 윤리원칙을 갖추고 AI 윤리 교육을 이수한 기관에 주어지며, 보도자료에는 NIA 기준으로 직원의 70% 이상이 교육을 이수해야 한다고 적혀 있어요.\n\n한국고용정보원은 2025년 12월 'AI 고용서비스 윤리원칙'을 선포했어요. 핵심 가치 4가지와 원칙 10가지로 이뤄진 윤리원칙이에요. 앞으로 이 원칙을 바탕으로 AI 고용서비스 가이드라인과 거버넌스 체계를 단계적으로 마련하겠다는 계획도 밝혔어요.\n\n이 내용은 모두 기관이 보도자료에서 직접 밝힌 설명이에요.",
          "source": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785627",
          "officialUrl": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785627",
          "verifiedAt": "2026-10-20",
          "slug": "keis-ai-ethics-compliance-mark",
          "tags": [
            "AI",
            "2026-w43",
            "한국고용정보원",
            "Korea"
          ],
          "en": {
            "title": "Korea Employment Information Service Receives NIA's AI Ethics Compliance Mark",
            "deck": "It also plans AI employment-service guidelines and governance step by step",
            "summary": "The Korea Employment Information Service (KEIS) said it received the AI ethics compliance mark from the National Information Society Agency (NIA). It plans to build AI employment-service guidelines and governance based on the ethics principles it proclaimed in December 2025.",
            "content": "The Korea Employment Information Service (KEIS) said in a press release on October 19 that it received the 'AI ethics compliance institution mark' from the National Information Society Agency (NIA). The mark goes to institutions that have adopted AI ethics principles and completed AI ethics education, and the release states that NIA's criteria call for at least 70% of staff to complete the education.\n\nKEIS proclaimed its 'AI Employment Service Ethics Principles' in December 2025. They consist of 4 core values and 10 principles. KEIS also said it will build AI employment-service guidelines and a governance system step by step, based on these principles.\n\nAll of this is the institution's own account in its press release."
          }
        }
      ]
    },
    {
      "name": "행정안전부",
      "color": "#6B7280",
      "posts": [
        {
          "date": "10/19",
          "platform": "Web",
          "title": "행정안전부, 현업 공무원이 바이브 코딩으로 만든 「국정ON」 소개",
          "deck": "국회·국무회의 생중계를 키워드로 모니터링하는 AI 서비스예요",
          "summary": "행정안전부가 현업 공무원이 생성형 AI 대화형 코딩으로 직접 만든 AI 국정 모니터링 서비스 「국정ON」을 사례로 소개했어요. 국회와 국무회의 생중계에서 정해 둔 키워드가 나오면 알려 주는 서비스예요.",
          "content": "행정안전부가 현업 공무원이 생성형 AI 대화형 코딩(바이브 코딩)으로 직접 만든 'AI 기반 국정 모니터링 서비스 「국정ON」'을 10월 19일 사례로 소개했어요. 업무 중 느낀 불편을 공무원이 직접 AI로 해결한 경우라는 것이 행정안전부의 설명이에요.\n\n행정안전부에 따르면 국정ON은 이용자가 정한 키워드가 국회와 국무회의 생중계에서 나오면 카카오톡으로 알려 줘요. 발언을 주제별로 정리해 공식 회의록과 비교하고, 주제별 보고서도 만들어 줘요. 서비스는 kjon.aigov.go.kr에서 운영되고 'AI 정부 실험실'의 지원을 받았다고 해요.\n\n행정안전부는 반복적인 모니터링을 필요한 순간에 확인하는 업무 방식으로 바꾸는 사례라고 소개했어요. 이 보도자료는 부처의 사례 소개이고, 이용자 수나 정확도 수치는 제시하지 않았어요.",
          "source": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785660",
          "officialUrl": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156785660",
          "verifiedAt": "2026-10-20",
          "slug": "mois-gukjeong-on-vibe-coding",
          "tags": [
            "AI",
            "2026-w43",
            "행정안전부",
            "Korea"
          ],
          "backupUrls": [
            {
              "label": "국정ON 서비스 사이트",
              "url": "https://kjon.aigov.go.kr"
            }
          ],
          "en": {
            "title": "Interior Ministry Presents 국정ON, Built by a Civil Servant With Vibe Coding",
            "deck": "An AI service that monitors Assembly and Cabinet broadcasts by keyword",
            "summary": "Korea's interior ministry presented 국정ON, an AI-based government monitoring service that a working civil servant built with generative-AI conversational coding. It alerts users when chosen keywords come up in National Assembly and Cabinet live broadcasts.",
            "content": "Korea's interior ministry (MOIS) presented, as a case study on October 19, 'AI-based government monitoring service 국정ON', which a working civil servant built directly with generative-AI conversational coding (vibe coding). The ministry describes it as a case where a public servant solved an inconvenience from their own work with AI.\n\nAccording to the ministry, 국정ON alerts users through KakaoTalk when keywords they have chosen come up in live broadcasts of the National Assembly and Cabinet. It organizes remarks by topic, compares them with the official minutes, and produces topic reports. The service runs at kjon.aigov.go.kr with support from the 'AI Government Lab'.\n\nThe ministry presented it as a case of changing a repetitive monitoring task into checking only at the moments it is needed. The press release is a ministry case study and gives no user numbers or accuracy figures."
          }
        }
      ]
    }
  ]
};
