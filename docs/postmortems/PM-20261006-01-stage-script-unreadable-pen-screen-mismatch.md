---
type: postmortem
id: PM-20261006-01
project: voidnews-archive
date: 2026-10-06
severity: P2
duration: 4h
status: resolved
---

# PM-20261006-01: 발표 대본이 게이트를 통과하고도 무대에서 읽히지 않고, 펜과 화면이 어긋남

## 1. 요약

2026-09b 발표 파일은 순서·벤치마크 게이트를 모두 통과했지만, 발표 때 글자가 눈에 안 들어왔고 펜이 쓰이지 않았으며 위쪽 화면이 실제와 달랐다.
게이트가 "무대에서 읽히는가"를 검사하지 않은 것이 원인이었다. 새 규칙 S8과 무대용 화면 생성기를 만들었다.
무대 화면을 만드는 중에도 앵커 촬영이 3번, 검증 코드가 2번 틀려 총 4시간쯤 걸렸다.

## 2. 증상

사용자 지적(2026-10-06, 원문 그대로):

```
그때 하이라이트 펜 기능도 작동안하고 대본 자체를 결국 내가 많이 못봤어 실제로 발표할때 글자들이 눈에 안들어와서 시뮬레이션 및 학습을 내가 따로해야 도움이 되는 느낌이였어 실제 화면도 다다르고
```

지난 대본(2026-09b)의 실측: 낭독 문단 95개 중 200자 초과 32개, 중앙값 172자, 화면 안내 68개가 본문 사이에 섞여 있었다.

## 3. 타임라인

(시각은 세션 기록 기준 근사치, KST)

- 13:10 가설: 펜 코드가 고장 났다 → 시도: 이전 발표 화면을 Aside 브라우저(사용자 기본 브라우저)에서 열어 마우스로 끌어 칠함 → 결과: FAIL — 가설 기각, Chrome 153 엔진에서 표시 1개가 정상 생성됨(코드는 동작, 설계와 환경 문제)
- 13:40 가설: 게이트가 가독성을 못 본다 → 시도: 한 줄 길이·핵심어 규칙 S8을 게이트에 추가하고 지난 대본에 실행 → 결과: PASS — 위반 153건 재현(100자 초과 73건, 최대 247자·5문장)
- 15:05 가설: 카드 2 앵커 9개를 못 찾는 것은 제목이 단어마다 span 으로 쪼개져 공백이 없기 때문이다 → 시도: 공백을 모두 지우고 비교 → 결과: FAIL — 여전히 9건 누락
- 15:15 가설: 부드러운 스크롤 사이트라 이동 직후 위치가 틀린다 → 시도: scrollIntoView 를 instant 로 바꾸고 도착 뒤 측정 → 결과: FAIL — 8건 해결, FrontierCode 캡션 1건 남음
- 15:25 가설: 캡션이 숨은 탭 패널 안에 있다 → 시도: 패널을 제어하는 탭을 찾아 클릭한 뒤 재탐색 → 결과: PASS — 앵커 누락 0건(82장)
- 15:40 가설: 펜 시험 코드가 줄 맨 앞 굵은 글씨로 쪼개진 텍스트 노드를 못 다룬다 → 시도: 여러 노드에 걸쳐 글자 위치를 계산하도록 수정 → 결과: FAIL — 모바일 가로 넘침 등 3건이 남음
- 15:50 가설: body 격자 칸이 발표 순서 버튼 줄(1,292px)에 맞춰 늘어난다 → 시도: 칸 너비를 minmax(0,1fr)로 고정, 글자 크기 저장값은 사용자가 바꿨을 때만 적용, WebKit 설치 → 결과: PASS — 검증 10항목 전부 통과

## 4. 근본 원인

1. 왜 대본이 무대에서 읽히지 않았나: 낭독 문단이 길고(최대 247자) 화면 안내가 본문에 섞였다.
2. 왜 그렇게 써도 통과했나: 게이트는 카드 순서·원문 앵커 순서·벤치마크 설명만 검사했다.
3. 왜 가독성 검사가 없었나: 지난번 지적(PM-20260923-01)을 "내용 순서"로만 해석해 게이트화했고, 발표자가 무대에서 읽는 경험은 검증 대상에 없었다.
4. 왜 펜이 쓰이지 않았나: 모드 켜기, 선택, 버튼의 다단계와 브라우저 기본 텍스트 선택에 의존했고, Playwright Chrome 하나로만 시험했다.
5. 최종: "발표자가 실제로 쓰는 환경에서 실제로 쓰이는가"를 코드로 재는 단계가 없었다. 화면도 원문 전체 캡처(최대 24,000px)를 스크롤하는 방식이라 실제 창 크기와 어긋났다.

## 5. 관점 분석

- 기술: 사이트마다 DOM이 달라서(단어별 span, 부드러운 스크롤, 숨은 탭 패널, 폭 없는 글자, 쪼개진 article) 앵커 탐색이 반복해서 틀렸다. 앵커를 못 찾으면 촬영이 exit 1 로 멈추게 해 둔 덕에 조용한 불일치는 없었다.
- 프로세스: 게이트 통과가 곧 "쓸 수 있다"는 뜻이 아니었다. 사용자가 쓰는 기본 브라우저(Aside)와 입력 방식(터치)을 시험 환경에 넣지 않았다.
- AI협업: Claude가 "대본"을 순서·사실의 문제로만 읽었고 발표자의 읽기 경험을 요구사항으로 올리지 않았다. 이번에는 작성 에이전트와 별도의 검증 에이전트 3명이 줄 단위로 대조해 범위 과장 14건을 잡았다.

## 6. 해결

최종 통과한 방법: 게이트 S8(한 줄 ≤100자·≤2문장·핵심어·화면당 ≤7줄), 한 화면씩 큰 글자로 보여 주는 `stage_view.py`, 포인터로 글자 위치를 직접 계산하는 펜, 실제 페이지에서 Cmd+F로 찾는 "찾을 글자", 앵커 지점의 실제 화면 1장, 별도 검증 에이전트의 줄 단위 대조.

```
$ python3 verify_speaker_script.py --run . ; echo $?
PASS[verify_speaker_script] 카드 순서·원문 앵커 순서·벤치마크 설명 규칙 통과
0
$ python3 stage_view.py verify --run .
PASS anchors-live 67/67 앵커를 실제 페이지에서 찾음 []
PASS stage-desktop 글자 34px(≥28) 대비 16.7(≥7.0) 가로넘침 False 오류 0 끝까지 이동 74/74
PASS stage-mobile 글자 26px(≥20) 대비 16.7(≥7.0) 가로넘침 False 오류 0 끝까지 이동 74/74
PASS pen-chrome / PASS pen-touch / PASS pen-storage-blocked / PASS pen-webkit
{"status": "PASS", "fails": []}
$ aside repl (Aside, Chrome 153): RESULT {"afterDrag":1,"afterUndo":0,"afterDouble":1,"save":"저장됨 · 표시 0개"}
$ verify_speaker_script.py --run 20260923-speaker-script  (지난 대본)
FAIL[...:S8] 카드 1: 한 줄 247자 > 100자 ... verify_speaker_script: 153 위반 → 차단 (exit 1)
```

## 7. 재발 방지

- `~/.claude/skills/voidnews-briefing-pipeline/gates/verify_speaker_script.py` (S8, `--selftest`에 긴 줄·핵심어 누락 함정 포함)
- `~/.claude/skills/voidnews-briefing-pipeline/scripts/stage_view.py` (capture 는 앵커를 못 찾으면 exit 1, verify, 당일 점검 check)
- `~/.claude/skills/voidnews-briefing-pipeline/scripts/stage/stage.js`
- `~/.claude/skills/voidnews-briefing-pipeline/references/speaker-script-rules.md` (무대용 규칙 절)
- `~/.claude/skills/voidnews-briefing-pipeline/FAILURE_LOG.md` (VN-SCRIPT-03, VN-SCRIPT-04)

## 8. 다음 세션 룰 후보

발표·시연 산출물은 게이트 통과가 아니라 사용자의 실제 기본 브라우저와 입력 방식에서 한 번 실측해야 완료로 본다.
