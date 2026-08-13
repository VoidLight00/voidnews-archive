# VoidNews 콘텐츠 수집원 인벤토리

> `/AB` 하네스가 날짜 범위별로 확인하는 콘텐츠·커뮤니티·공식 출처 목록.  
> 기준일: 2026-08-12

## 정본과 적용 범위

기계가 읽는 큐레이터 레지스트리의 정본은 다음 파일이다.

```text
~/.claude/skills/voidnews-briefing-pipeline/references/curator-channels.json
```

이 문서는 사람이 검토하기 위한 프로젝트 내 목록이다. 채널 추가·삭제·활성 상태는 JSON 레지스트리를 먼저 수정하고 이 문서를 갱신한다.

현재 활성 레지스트리:

| 플랫폼 | 수 |
|---|---:|
| YouTube | 15 |
| X/Twitter | 37 |
| Web·Threads·커뮤니티·연구·로컬 | 33 |
| **합계** | **85** |

큐레이터·커뮤니티·메신저 링크는 원칙적으로 `discovery-only`다. 발견한 사건은 공식 블로그·문서·changelog·GitHub release·공식 X/YouTube 등 1차 원천으로 승격한 뒤 카드 근거로 사용한다.

---

## 1. YouTube — 15개

### 글로벌 AI 뉴스·해설

1. AI Search — `https://www.youtube.com/@theAIsearch`
2. Matt Wolfe — `https://www.youtube.com/@mreflow`
3. Wes Roth — `https://www.youtube.com/@WesRoth`
4. Matthew Berman — `https://www.youtube.com/@matthew_berman`
5. AI Explained — `https://www.youtube.com/@aiexplained-official`
6. The AI Advantage — `https://www.youtube.com/@aiadvantage`
7. All About AI — `https://www.youtube.com/@AllAboutAI`
8. Skill Leap AI — `https://www.youtube.com/@SkillLeapAI`
9. Two Minute Papers — `https://www.youtube.com/@TwoMinutePapers`

### 추가 글로벌·국내 채널

10. 조코딩 JoCoding — `https://www.youtube.com/@jocoding`
11. Julian Goldie SEO — `https://www.youtube.com/@JulianGoldieSEO`
12. Chase AI — `https://www.youtube.com/@Chase-H-AI`
13. Nate Herk | AI Automation — `https://www.youtube.com/@nateherk`
14. WorldofAI — `https://www.youtube.com/channel/UC2WmuBuFq6gL08QYG-JjXKw`
15. Universe of AI — `https://www.youtube.com/channel/UCYwLV1gDwzGbg7jXQ52bVnQ`

### 순회 계약

날짜 범위 안의 영상은 모두 다음 중 하나로 기록한다.

```text
promoted
skipped:<구체적인 이유>
```

영상 결정 기록이 하나라도 빠지면 커버리지 게이트를 통과하지 못한다.

---

## 2. X/Twitter — 37개

### AI 뉴스 큐레이터·해설자

1. The Rundown AI — `https://x.com/TheRundownAI`
2. Rowan Cheung — `https://x.com/rowancheung`
3. Matt Wolfe — `https://x.com/mreflow`
4. Ben Tossell — `https://x.com/bentossell`
5. AK / Akhaliq — `https://x.com/_akhaliq`
6. AI Highlight — `https://x.com/AIHighlight`
7. Andrej Karpathy — `https://x.com/karpathy`

### 기업·제품 공식 계정

8. OpenAI — `https://x.com/OpenAI`
9. ChatGPT — `https://x.com/ChatGPTapp`
10. OpenAI Developers — `https://x.com/OpenAIDevs`
11. Anthropic — `https://x.com/AnthropicAI`
12. Google DeepMind — `https://x.com/GoogleDeepMind`
13. Google AI — `https://x.com/GoogleAI`
14. Android — `https://x.com/Android`
15. xAI — `https://x.com/xai`
16. Meta AI — `https://x.com/MetaAI`
17. Mistral AI — `https://x.com/MistralAI`
18. Hugging Face — `https://x.com/huggingface`
19. Perplexity — `https://x.com/perplexity_ai`
20. Cursor — `https://x.com/cursor_ai`

### 기업 리더·연구자·개발자

21. Sam Altman — `https://x.com/sama`
22. Greg Brockman — `https://x.com/gdb`
23. Yann LeCun — `https://x.com/ylecun`
24. Logan Kilpatrick — `https://x.com/OfficialLoganK`
25. Demis Hassabis — `https://x.com/demishassabis`
26. Kai-Fu Lee — `https://x.com/kaifulee`
27. John Carmack — `https://x.com/ID_AA_Carmack`
28. Andrew Ng — `https://x.com/AndrewYNg`
29. Peter Steinberger — `https://x.com/steipete`
30. Pedro Duarte — `https://x.com/peduarte`
31. Chris Hayduk — `https://x.com/ChrisHayduk`
32. Matt Shumer — `https://x.com/mattshumer_`

### 추가 레이더·한국 신호

33. Lucas Flatwhite — `https://x.com/lucas_flatwhite`
34. Tom Dörr — `https://x.com/tom_doerr`
35. GeekNews Hada — `https://x.com/GeekNewsHada`
36. AI Leaks and News — `https://x.com/AILeaksAndNews`
37. pwealthydad — `https://x.com/pwealthydad`

### 현재 접근 상태

X 채널은 2026-07-30 차단 상태가 기록돼 있으며 `recheckAfter: 2026-10-30`이다. 매 run마다 동일한 실패 요청을 반복하지 않고 기록을 재사용하되, 재검사일이 지나면 실제 접근 상태를 다시 확인한다.

---

## 3. Threads

### 직접 등록 프로필

1. Choi OpenAI Threads — `https://www.threads.com/@choi.openai`
2. TechFire Threads — `https://www.threads.com/@techfireco`
3. feelfree_ai Threads — `https://www.threads.com/@feelfree_ai`
4. Threads Choi benchmark — `https://www.threads.net/@choi.openai`

### 상시 수집 봇 아카이브

```text
~/threads-automation/data/threads/source_archive.sqlite
~/threads-automation/data/threads/content_archive.json
```

처리 규칙:

- read-only
- 날짜 범위 필터
- `01b_threads_ingest.json` 생성
- `discoveredVia: threads-archive`
- 공식 도메인은 verifier 후보로 전달
- 루머·영상 반응은 공식 사건의 보조 신호로 연결
- chatId·authorId·토큰 등 민감 식별값 출력 금지

2026-08-12 확인 기준으로 봇 원장은 2026-05-30 이후 갱신이 멈춰 `stale-source` 상태였다.

---

## 4. KakaoTalk·국내 공유 신호

### voidwiki 카카오 공유 링크

레지스트리 ID: `kakao-voidwiki`

```text
~/projects/voidwiki/content/links/
```

용도:

- 국내 화제성 신호
- 반복 공유 빈도 집계
- 공식 URL 직접 매칭
- `voidwikiShares` 계산

메시지 내용이나 사람 정보가 아니라 공유 URL과 집계값만 사용한다.

### Choi 카카오 AI방 옵시디언 아카이브

레지스트리 ID: `kakao-choi-room`

```text
~/Documents/암흑물질/200-참고-자료/2026년 AI 정보/AI레이더/Choi/
```

처리 규칙:

- read-only
- 날짜 범위 필터
- 노트 안의 외부 원천 링크만 추출
- 방 이름·닉네임·메시지 원문·개인 식별정보를 산출물에 기록하지 않음
- 공식 원문 발견을 위한 discovery 경로로만 사용

---

## 5. Telegram AI Radar

레지스트리 ID: `telegram-obsidian-ai-radar`

```text
~/Documents/암흑물질/200-참고-자료/2026년 AI 정보/AI레이더/
```

처리 순서:

1. 파일명 날짜 접두사로 기간 필터
2. 노트 안 원천 링크 추출
3. GitHub·공식 블로그·공식 문서로 승격
4. 로컬 노트 경로는 `discoveredVia`로만 보존
5. 노트 자체를 공개 근거로 사용하지 않음

---

## 6. Hacker News

레지스트리 ID: `community-hacker-news`

결정론 API:

```text
https://hn.algolia.com/api/v1/search_by_date
```

검색 키워드:

- `AI`
- `LLM`
- `Claude`
- `OpenAI`
- `Gemini`
- `agent`

설정:

```text
최소 점수: 50
키워드별 최대 페이지: 3
페이지당 항목: 100
```

HN은 공식 사실 근거가 아니라 해외 화제성·신규 사건 발견·커뮤니티 반응 신호다.

---

## 7. Reddit

### 레지스트리 등록 커뮤니티 — 7개

1. `r/LocalLLaMA`
2. `r/MachineLearning`
3. `r/OpenAI`
4. `r/ClaudeAI`
5. `r/singularity`
6. `r/ClaudeCode`
7. `r/cursor`

### 결정론 API 설정 대상 — 5개

1. `LocalLLaMA`
2. `MachineLearning`
3. `artificial`
4. `ClaudeAI`
5. `OpenAI`

API 패턴:

```text
https://www.reddit.com/r/{subreddit}/top.json?t=week&limit=100&raw_json=1
```

현재 상태:

```text
enabled: false
disabledReason: HTTP 403 2026-07-18
```

접근 실패를 0건처럼 처리하지 않고 disabled/failure evidence를 남긴다. Reddit은 rumor·buzz·reaction 신호이며, 최종 사실은 공식 원천으로 검증한다.

---

## 8. 뉴스레터·AI 뉴스 사이트

1. 백상현 · 매일의 AI — `https://www.baeksang.dev/daily`
   - 날짜별 패턴: `https://www.baeksang.dev/daily/{date}`
2. The Rundown AI — `https://www.therundown.ai/`
3. TLDR AI — `https://tldr.tech/ai`
4. Ben's Bites — `https://www.bensbites.com/`
5. The Batch by DeepLearning.AI — `https://www.deeplearning.ai/the-batch/`
6. Every Vibe Check — `https://every.to/vibe-check`

날짜별 archive pattern이 있는 채널은 인덱스 한 페이지만 보는 것이 아니라 범위 안 도달 가능한 날짜를 전부 확인한다.

---

## 9. 모델·도구 평가·AI 레이더

1. Hugging Face Blog — `https://huggingface.co/blog`
2. Artificial Analysis — `https://artificialanalysis.ai/`
3. LMArena — `https://lmarena.ai/`
4. TestingCatalog AI — `https://www.testingcatalog.com/`
5. Andon Labs Vending-Bench — `https://andonlabs.com/blog/`

역할:

| 소스 | 주 역할 |
|---|---|
| TestingCatalog | 미출시·실험 UI·신규 기능 발견 |
| Artificial Analysis | 모델 성능·가격·속도 비교 |
| LMArena | 블라인드 비교·익명 모델 등장 신호 |
| Hugging Face Blog | 오픈 모델·도구·연구 |
| Vending-Bench | 사업성·에이전트 행동·얼라인먼트 독립 평가 |

익명 Arena 모델이나 TestingCatalog 관측만으로 개발사·제품명·출시 계획을 확정하지 않는다.

---

## 10. 개발자 커뮤니티·OSS 레이더

1. Cursor Community Forum — `https://forum.cursor.com/`
2. GitHub Trending — `https://github.com/trending`
3. Hugging Face Blog — `https://huggingface.co/blog`

공식 저장소 확인 경로:

- GitHub Releases API
- repository release/changelog
- issue
- README·license
- npm/PyPI registry
- star/fork 실측

GitHub Trending과 포럼은 discovery-only이고 최종 근거는 공식 저장소·release를 사용한다.

---

## 11. 연구·논문 레이더

1. Hugging Face Daily Papers — `https://huggingface.co/papers`
2. arXiv cs.AI new submissions — `https://arxiv.org/list/cs.AI/new`
3. arXiv cs.CL new submissions — `https://arxiv.org/list/cs.CL/new`
4. OpenAI Research — `https://openai.com/research/`
5. Anthropic Research — `https://www.anthropic.com/research`
6. Google DeepMind Research — `https://deepmind.google/research/`

과학·벤치마크·안전 주장은 공식 연구 소개와 강한 결론을 분리해 Phase 2.5 선택 주장 검증 대상으로 보낸다.

---

## 12. 필수 공식 기업 출처 매트릭스

### OpenAI

- OpenAI News
- OpenAI Research
- Developers/API docs
- Codex docs/changelog
- 공식 X/YouTube
- RSS·sitemap·모델 문서

### Anthropic / Claude

- Anthropic News
- Anthropic Research
- Claude Platform release notes
- Claude Code changelog/GitHub/docs
- Claude 앱·Help Center release notes
- 공식 X/YouTube
- AWS Bedrock·Foundry·billing 관련 공식 자료

네임스페이스를 분리한다.

```text
Claude Code
Claude Platform/API
Claude 앱/제품
Anthropic Research
Infra/Commercial
```

### Google / DeepMind

- Google Blog
- DeepMind models/research
- Gemini docs/changelog
- Google AI Developers
- Android
- AI Studio
- NotebookLM 공식 채널

### GitHub / Microsoft

- GitHub Blog
- GitHub Changelog
- Copilot docs
- Microsoft AI Blog
- GitHub Releases

### xAI

- xAI News
- xAI API docs/release notes/models docs
- 공식 X

### Perplexity

- changelog
- Hub/blog
- enterprise/use-case docs
- 공식 X

### 추가 publisher

- Meta AI
- Mistral AI
- DeepSeek
- Hugging Face
- Qwen/Alibaba
- SK텔레콤
- 네이버
- LG
- 삼성
- 카카오

---

## 13. 사용자 제공 자료

다음 자료는 최우선 seed로 보존한다.

- URL
- 텍스트
- 이미지·스크린샷
- 소셜 게시물
- 파일

```text
sourceType: user-provided
```

사용자 제공 자료만으로 사실을 확정하지 않고 검증 가능한 공개 원천에 연결한다.

---

## 전체 수집 흐름

```text
실시간·화제 발견
├─ X 37
├─ YouTube 15
├─ Threads
├─ Hacker News
├─ Reddit
├─ Kakao 공유 링크
└─ Telegram AI Radar

뉴스·해설 발견
├─ TestingCatalog
├─ 백상현 매일의 AI
├─ The Rundown
├─ TLDR AI
├─ Ben's Bites
├─ The Batch
└─ Every Vibe Check

모델·도구·OSS 신호
├─ Artificial Analysis
├─ LMArena
├─ Vending-Bench
├─ GitHub Trending
├─ Cursor Forum
└─ Hugging Face Blog

연구
├─ Hugging Face Papers
├─ arXiv cs.AI
├─ arXiv cs.CL
├─ OpenAI Research
├─ Anthropic Research
└─ DeepMind Research

공식 원천 승격
├─ 공식 블로그·문서
├─ changelog/release notes
├─ GitHub releases
├─ 공식 X/YouTube
├─ RSS·sitemap·공개 API
└─ 논문·모델 카드

검증
├─ source verifier: 공식성·날짜·claim↔evidence
├─ Crawl4AI: 허용된 JS 본문 retrieval만
└─ Insane Research validator: VIP·hero·고위험 claim만
```

## 운영 상태 요약

- 활성 강제 레지스트리: 85개
- YouTube: 15개
- X/Twitter: 37개
- Web·local·community·research: 33개
- Reddit JSON 자동수집: HTTP 403으로 비활성
- X 계정군: 2026-10-30 재검사 예정
- Threads 봇 아카이브: 2026-08-12 확인 시 stale
- Kakao·Telegram 로컬 어댑터: 활성, 매 run 강제
- 큐레이터·커뮤니티: discovery-only
- 최종 카드 근거: 공식 1차 출처 우선
