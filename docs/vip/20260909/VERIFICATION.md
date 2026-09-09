# VIP 브리핑 검증 기록 · 2026-09-09

**판정: 로컬 준비본 검증 완료. 뉴스 6개 + 오픈소스 2개. 최종 사이트 선택·게시 승인을 뜻하지 않습니다.**

완료 시각: 2026-09-09T18:50:25+09:00

## 산출물

- [BRIEFING.md](BRIEFING.md): 사실·발표 해석·확인 범위·말로 전하기·대화 질문.
- [evidence.json](evidence.json): 개별 원문 응답 해시, 본문 근거 위치, 날짜, 원장 연결, 중복 검수, 도구 확인, 실행 결과.
- 읽기용 HTML: `/Users/voidlight/projects/voidnews-reports/2026-09-vip-prep/index.html`
- 로컬 미리보기: `http://127.0.0.1:8879/2026-09-vip-prep/` (검증용 서버가 실행 중인 동안).

## 공식 출처 재검증

선택된 6개 뉴스의 공식 본문을 독립적으로 열고 읽었습니다. 공개 GET 대상은 뉴스 6개, Mistral 공식 뉴스 목록 1개, 두 도구의 저장소 API·릴리스 API·README·LICENSE 8개로 총 **15개이며 모두 HTTP 200**입니다. 접근 성공에 그치지 않고 뉴스 본문의 핵심 문구 **22개**와 날짜 근거를 대조했습니다. 주요 수치가 원문과 충돌하는 항목은 발견되지 않았습니다.

| 항목 | 재검증 결과 | 날짜 처리 |
|---|---|---|
| [NVIDIA와 Hugging Face](https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/) | 인수 합의와 발표 금액 · 컴퓨팅 선택권과 개방성 유지 방침 확인 | 9월 3일 20:56 KST |
| [삼성 주도 Mistral 투자](https://mistral.ai/news/mistral-makes-sovereign-open-weight-ai-to-frontier/) | 조달 금액·투자 단계·기업가치 · 주도 및 공동 주도 투자자 확인 | 9월 8일 · 발행사 표기일 |
| [AlphaGenome Atlas](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/alphagenome-atlas/) | 변이 수와 데이터 규모 · AVI 점수와 웹 포털 제공 확인 | 9월 8일 23:00 KST |
| [WeatherNext 3](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/) | 매시간 예측과 5·10·25km 해상도 · 제품 및 클라우드 데이터 연결 확인 | 9월 4일 00:00 KST |
| [Enterprise Frontier Safeguards](https://www.anthropic.com/news/enterprise-frontier-safeguards) | 고객 소유 저장소·키·자동 검토 선택권 · 단계적 제공 예고와 고객 비용·대응 책임 확인 | 9월 1일 · 발행사 표기일 |
| [Copilot의 GPT-6 Astra](https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot/) | 대상 요금제와 여러 개발 도구에서의 제공 · 순차 배포·사용량 과금·관리자 정책 확인 | 9월 5일 03:59 KST |

NVIDIA 인수 합의와 Mistral 투자금·기업가치는 발표 주체에 귀속했습니다. 성능 수치, 산업 효과, 예측 정확도, 거래 종결을 독립 검증했다는 표현은 사용하지 않았습니다. 확인 수준은 **Level 2: 공식 발표와 본문 확인**이며 Level 3 교차 검증이나 hero 승격을 주장하지 않습니다.

시각과 시간대가 있는 4개는 live `datePublished`를 사용해 KST로 환산했습니다. `dateModified`나 관련 글 시각을 쓰지 않았습니다. Mistral은 본문에 날짜가 없어 [공식 뉴스 목록](https://mistral.ai/news/)의 해당 기사 카드로 9월 8일을 확인했습니다. Anthropic은 본문 표시일 9월 1일만 사용했습니다. 두 항목의 정확한 KST 날짜·시각은 확정하지 않습니다.

## 오픈소스 2개

| 저장소 | 안정 릴리스 | 공개 및 라이선스 | 설치 문서 |
|---|---|---|
| [openai/codex](https://github.com/openai/codex) | [rust-v0.153.4](https://github.com/openai/codex/releases/tag/rust-v0.153.4) | public, archived=false, Apache-2.0 본문 확인 | README 명령 일치 |
| [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | [v0.59.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0) | public, archived=false, Apache-2.0 본문 확인 | README 명령 일치 |

두 릴리스 모두 GitHub API에서 `draft=false`, `prerelease=false`를 확인했습니다. Codex의 npm·Homebrew 경로와 Gemini의 npx·npm 경로를 README와 대조했습니다. CLI 설치·로그인·모델 호출은 실행하지 않았으므로 실행 성공이나 무료 사용을 보장하지 않습니다. Gemini CLI v0.59.0은 원장 마감 이후의 상태 확인입니다.

## 기존 판본 중복 검사

- `lib/ab/editions/*.ts` 12개를 모두 비교했습니다. 선택 뉴스 6개의 정규화된 공식 URL과 같은 발표가 기존 AB에 없었습니다.
- 현재 `2026-08b.ts` VIP 6개는 Claude Code·Snowflake·GLM-5.3-Flash·Pika·휴머노이드 100m·Apple입니다. 이번 선택과 발표 사건이 겹치지 않습니다.
- 20260824 후보 JSON의 `selectedIds`, `vipSelected`, 현재 최종판이 서로 달랐습니다. 초안의 OpenAI 정책 지원을 기존 최종판으로 취급하던 설명을 고쳤습니다.
- 승인 대기 `2026-09a`의 잠정 선택과도 사건이 다릅니다. 해당 manifest와 기존 판본 파일 해시는 검증 전후 일치했습니다.
- 이번 뉴스 6개가 Weekly 원장에 있는 것은 의도된 재사용입니다. 전체 258건을 이번 작업에서 재수집·재검증했다는 주장은 하지 않습니다.

## 실제 실행한 품질 검사

| 검사 | 결과 |
|---|---|
| 산출물 교차 검사 | 종료코드 0 · 84개 assertion 통과 |
| 브라우저 렌더·동작 검사 | 종료코드 0 · 뉴스 6, OSS 2 |
| 화면 폭 | 1440·960·720·652·390·320px, 수평 넘침·헤딩 잘림 0 |
| 발표 메모 버튼 | 메모 보기 및 전체 보기 왕복, 메모 유지 확인 |
| 목차 링크 | 도구·WeatherNext 구역 실제 스크롤 도달 확인 |
| 근거 파일 다운로드 | 실제 파일 저장 후 JSON 파싱, 6+2 및 출처 해시 일치 |
| 인쇄 스타일 | 인쇄 모드에서 목차 숨김 확인, 실제 프린터 출력은 미실행 |
| 브라우저 오류 | JavaScript 오류 0 · console 오류 0 |
| 색 세로줄 게이트 | 종료코드 0 · 1개 파일에서 위반 0 |

데스크톱 상단·도구 구역, 모바일 상단·WeatherNext 본문을 이미지로 열어 직접 확인했습니다. 한국어 글자, 본문 행 길이, 배경 대비, 소스 링크, 설치 명령을 읽을 수 있었습니다. 검증 중 브라우저 실행 파일 부재는 설치된 Google Chrome으로 해결했고, favicon 404와 모바일 목차 번호 줄바꿈을 수정한 뒤 다시 검증했습니다.

실행 명령:

```bash
python3 /tmp/vip_artifact_gate.py
python3 /tmp/vip_render_qa.py
bash /Users/voidlight/.claude/qa-canon/no_vertical_stripe_gate.sh /Users/voidlight/projects/voidnews-reports/2026-09-vip-prep
```

`/tmp`의 점검 코드와 화면 캡처는 이번 세션의 임시 자료입니다. 지속 보존되는 검증 내용과 응답 해시는 evidence.json에, 읽을 수 있는 결과는 HTML에 담았습니다.

## 남은 확인 범위

- NVIDIA 거래 종결·규제 승인, Anthropic의 실제 제공 완료 여부는 별도 확인 대상입니다.
- 모델·예측·탐지 성능의 독립 재현 시험을 하지 않았습니다.
- 도구 설치·로그인·실사용과 연결 서비스 요금은 검증 범위 밖입니다.
- 이 VIP 작업에서는 커밋·push·배포·외부 게시를 수행하지 않았습니다. 주 작업의 기존 아카이브 배포는 별도입니다.
