# Radar 통합층 구현 기획서 (SOL 실행용)

- 발주: Claude(Fable 5, 컨덕터 pane) 2026-07-18
- 실행: SOL (gpt-5.6-sol) — 이 문서가 유일한 작업 지시 정본(SSoT)
- 작업 루트: `~/projects/voidnews-archive` (브랜치 `feature/radar-layer`)
- 스킬 루트: `~/.claude/skills/voidnews-briefing-pipeline` (기존 파일 수정 전 반드시 `_workspace/radar-20260718/backup/`에 원본 복사)

## 배경

AB 파이프라인(voidnews-briefing-pipeline)의 수집은 큐레이터 17채널 순회인데, 현재 커버리지 게이트는 "채널 방문 여부(17/17)"만 검증한다. 사용자 실측 불만: **놓치는 항목이 많고, 순회가 정확히 도는지 검증이 안 된다.** 또한 카카오 AI방·텔레그램·커뮤니티(HN/Reddit) 신호가 수집에 안 들어온다.

해법: 새 하네스를 만들지 않고 **기존 AB 파이프라인 수집 앞단에 소스 어댑터층 + 전수 커버리지 게이트**를 붙인다. 큐레이션 원칙 불변: 모든 소스는 발견 경로일 뿐(discoveredVia), 카드 승격은 공식 1차 출처 확보 시에만(fail-closed).

## 경계 (위반 = 즉시 중단)

1. `git push` / 배포 / 외부 게시 / 공개 링크 생성 **금지**. 커밋은 `feature/radar-layer` 브랜치 로컬만.
2. 카카오톡 원본 DB·kakao-harness 실행 **금지** (WP-4는 설계 문서만).
3. 옵시디언 볼트 기존 노트 수정 금지. 이번 작업은 볼트에 쓰지 않는다.
4. API 키·토큰·개인정보를 산출물/로그에 남기지 않는다.
5. 스킬 디렉토리 기존 파일 수정 전 backup/ 복사 필수.
6. 좌측 색 세로 스트라이프(border-left accent) 디자인 영구 금지 (HTML 산출물 해당 시).
7. 각 WP 완료 시 `STATUS.md`를 갱신한다 (컨덕터가 mtime으로 감시).

## WP-1 — 전수 커버리지 매트릭스 게이트 (최우선)

"방문했다" 대신 **"창 안에 올라온 영상 전수 각각에 결정 기록이 있는가"**를 종료코드로 강제한다.

### 1a. 레지스트리에 channelId 추가
- 파일: `references/curator-channels.json` (v1.1 → v1.2)
- YouTube 채널 9개에 `channelId`(UC...) 필드 추가. 확보 방법: `yt-dlp --print channel_id <채널URL>` 또는 채널 페이지 HTML의 `"channelId"` / `og:url` 파싱. 실측 확인된 값만 기록(추측 금지).
- RSS URL 규약: `https://www.youtube.com/feeds/videos.xml?channel_id=<UC...>` — 주석 필드로 명시.

### 1b. 수집 계약 v2 (SKILL.md 갱신)
- `01_curator_coverage.json` 스키마 v2: 채널별 `videos[]` — 각 원소 `{videoId, title, published, decision}`, `decision ∈ {promoted, skipped:<사유>}`.
- 창 안 업로드 영상은 **전부** decision이 있어야 한다. SKILL.md의 해당 Phase 서술을 v2 계약으로 갱신(수정 전 backup).

### 1c. 게이트 스크립트 (신규)
- 파일: `references/check_video_coverage.sh` (+ 필요 시 python 헬퍼 같은 폴더)
- 입력: `--start YYYY-MM-DD --end YYYY-MM-DD --coverage <01_curator_coverage.json>`
- 동작: 레지스트리의 YouTube 채널 전체에 대해 RSS를 fetch → 창 내 영상 전수 목록 산출 → coverage 파일의 decision 기록과 대조.
- 판정: 미기록 영상 ≥1 → **exit 2** + 누락 목록(채널/videoId/제목) 출력. RSS fetch 실패도 fail-closed(exit 2, 채널명 명시). 전수 기록 시 exit 0 + `PASS[video-coverage] channels=N videos=M`.
- 주의(전역 fail-open 함정): `grep -c` 파이프라인에서 `|| echo 0` 금지, python subprocess는 bytes+decode("utf-8","replace"), 빈 배열 가드.

### 1d. selftest (fixture)
- `references/fixtures/video-coverage/` 에 가짜 RSS xml + coverage json 2세트: ① 완전 기록 → exit 0 ② 1건 누락 → exit 2 재현. selftest 러너 `check_video_coverage_selftest.sh` 가 두 경로 모두 실증하고 exit 0.
- 실 레지스트리 대상 스모크 1회 실행 결과(종료코드·카운트)를 STATUS.md에 기록.

## WP-2 — 통합 시드 스키마 + 커뮤니티 어댑터 (HN/Reddit)

### 2a. 시드 스키마 확장
- `discoveredVia` 값 추가: `community-hn`, `community-reddit`, `kakao-room`, `telegram-radar` (뒤 2개는 예약만).
- 시드 필수 필드: `{id, title, url, discoveredVia, discoveredAt, score(원 플랫폼 점수), officialCandidateUrl(있으면)}` — 기존 collector 시드와 병합 가능한 형태. 스키마 문서를 `references/seed-schema.md`로 작성.

### 2b. 결정론 수집기 (LLM 불사용)
- 파일: `scripts/collect_community.py` (voidnews-archive 리포 쪽 `scripts/` 아님 — **스킬 루트** `scripts/`에 둔다. gen_ab_report.py와 같은 위치)
- HN: Algolia API `search_by_date` (query = AI 키워드셋, `created_at` 창 필터, points ≥ 50 기본·설정 가능).
- Reddit: 공개 JSON (`https://www.reddit.com/r/<sub>/top.json?t=week`), 서브레딧 기본셋 `LocalLLaMA, MachineLearning, artificial, ClaudeAI, OpenAI` — 설정 파일로 분리.
- 설정: `references/community-sources.json` (서브레딧·키워드·점수 임계치).
- 출력: run 디렉토리 규약에 맞춘 `01c_community_seeds.json`. User-Agent 명시, 요청 간 sleep(레이트리밋 예의), 실패 시 해당 소스 fail-closed 기록(silent skip 금지).
- selftest: 녹화 fixture(json 저장본)로 파서 검증 + 실 API 스모크 1회(카운트만 STATUS.md에).

## WP-3 — baeksang.dev 심층 해부 → 선택형 기능 카탈로그

- 대상: `https://www.baeksang.dev/daily` + `/daily/archive` + 날짜판 3~5개 샘플. robots.txt 확인 후 준수, 과도한 크롤 금지(페이지 수 ≤15).
- 산출: `_workspace/radar-20260718/baeksang-feature-catalog.md`
- 내용: 기능 단위 분해(예: HN 점수 병기, 날짜 URL 체계, 항목별 공식 1차 링크 병기, 아카이브 인덱스, 요약 문체, 갱신 cadence, RSS/구독 …). 각 기능에 ① 무엇인지 ② voidnews 이식 시 형태 ③ 난이도(S/M/L) ④ 기대 효용 1줄 — **체크박스 목록**으로, 사용자가 골라서 발주할 수 있게.
- 픽셀 카피·고유 셀렉터 재현 금지(패턴 분석만).

## WP-4 — 카카오 AI방 knowhow 수집 설계 (설계 문서만)

- 산출: `_workspace/radar-20260718/kakao-knowhow-design.md`
- 내용: 기존 kakao-harness(`~/projects/kakao-harness`, 게이트 24종) sink를 재사용해 AI 정보 방의 공유 링크·툴 팁을 `knowhow` 타입으로 추출 → 옵시디언 방별 노트 + AB 시드(`kakao-room`) 두 갈래로 흘리는 흐름. 필요한 신규 컴포넌트·게이트·승인 지점(원본 DB 접근은 사용자 승인 후) 명시. **코드 작성·DB 접근 금지.**

## 완료 기준 (fail-closed)

- WP-1: selftest exit 0 + 실 스모크 종료코드 기록. WP-2: selftest exit 0 + 스모크 카운트. WP-3/4: 문서 존재 + 목차 완비.
- 전 WP 완료 후 `STATUS.md`에 최종 요약(변경 파일 목록·게이트 종료코드) 작성. 자가보고 금지 — 모든 "됐다"는 종료코드/카운트 동반.
- 커밋: WP 단위로 `feature/radar-layer`에 로컬 커밋(본문에 '왜' 1줄). push 금지.

## 우선순위

WP-1 → WP-2 → WP-3 → WP-4 순서. WP-3은 WP-1 진행 중 서브에이전트 병렬 가능.
