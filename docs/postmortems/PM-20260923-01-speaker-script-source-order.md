---
type: postmortem
id: PM-20260923-01
project: voidnews-archive
date: 2026-09-23
severity: P2
duration: 1h40m
status: resolved
---

# PM-20260923-01: 발표 대본이 공식 원문 순서와 벤치마크 설명 없이 작성돼 매 회차 실제 발표와 어긋남

## 1. 요약

AB/VIP 발표 대본이 사이트 카드 순서만 지키고, 카드 안에서는 발표자가 여는 공식 원문의 순서와 달라 매 회차 "대본과 실제 발표가 너무 다르다"는 문제가 반복됐다.
벤치마크도 이름과 숫자만 나열해 청중에게 무엇을 봐야 하는지 설명하지 못했다.
공식 원문 순서 추출기, 벤치마크 사전, HARD 게이트를 만들어 2026-09b 대본을 다시 쓰고 게이트로 통과시켰다.

## 2. 증상

사용자 지적(2026-09-23, 원문 그대로):

```
순서 중요시 해야하는거 알지 특히 발표할때 볼 공식 원문 에 순서대로 매칭해서 가야해 벤치마크 나오면 벤치마크 별로 사람들에게 눈여겨봐야할점 위주로 설명하거나 쉽고 이해하기 쉽게 그런게 중요해 매번 대본 작성할때마다 내가 직접 발표할때랑 대본이 알려주는 거랑 너무 달랐어
```

당시 1차 대본은 기존 검증 스크립트를 50/50 통과한 상태였다. 기존 검증은 카드 순서, 분량, 링크, PDF만 봤고 카드 안의 원문 순서와 벤치마크 설명은 보지 않았다.

## 3. 타임라인

(시각은 세션 기록 기준 근사치, KST)

- 14:50 가설: 카드 순서·분량·출처 링크만 맞으면 발표에 쓸 수 있다 → 시도: 9/9 회차 빌드·검증 스크립트를 복사해 1차 대본 작성, verify 50/50 통과 → 결과: FAIL — 사용자가 원문 순서 불일치와 벤치마크 설명 부재를 지적(기존 검증이 이 결함을 볼 수 없었음)
- 15:20 가설: 원문 순서를 데이터로 만들면 대본 앵커를 기계적으로 대조할 수 있다 → 시도: scripts/source_walk.py로 공식 원문 9개의 제목·표·캡션 순서를 추출하고 gates/verify_speaker_script.py 작성, 1차 대본에 실행 → 결과: FAIL — S3 원문 앵커 0개 등 10건 위반으로 차단(게이트가 사용자 지적을 재현)
- 15:40 가설: README 목차 줄과 줄바꿈 없는 하이픈(U+2011) 때문에 앵커가 잘못 걸리거나 안 걸린다 → 시도: 목차 링크 줄 건너뛰기, 문자 정규화 추가 후 대본을 원문 순서대로 재작성(화면 ①②③ + `<!-- bench: -->` 설명) → 결과: PASS — verify_speaker_script exit 0
- 16:25 가설: 공용 빌드·검증 도구로 옮기면 회차별 복사가 필요 없다 → 시도: scripts/speaker_script.py build/verify 로 실행 → 결과: FAIL — source-matches 9건(이미지 설명의 출처 링크까지 세어 '정확히 1개' 조건 위반), pdf-images-embedded 8/9(SVG는 PDF 이미지 객체가 아님)
- 16:30 가설: 검사 기준이 의도보다 엄격하다 → 시도: 첫 화면 메모의 출처 링크만 확인, 비트맵 이미지만 계수 → 결과: PASS — 53/53, PDF 23쪽

## 4. 근본 원인

1. 왜 대본이 발표와 달랐나: 카드 안의 서술 순서를 공식 원문이 아니라 사이트 카드 본문(요약 순서)에 맞춰 썼다.
2. 왜 카드 본문 순서로 썼나: 대본 작성 전에 공식 원문의 구성 순서를 확인하는 단계가 파이프라인에 없었다.
3. 왜 단계가 없었나: Phase 6은 "발표 대본을 만든다"는 산문 지시뿐이었고, 검증 스크립트는 회차마다 복사해 회차별 문구만 검사했다.
4. 왜 검증이 순서를 못 봤나: 대조할 기준 데이터(원문 순서)가 존재하지 않았고, 벤치마크 설명 기준도 문서·사전·게이트 어디에도 없었다.
5. 최종: "발표자가 보는 화면"을 정본으로 삼는 기준 데이터와 그것을 강제하는 종료코드 게이트가 없었다.

## 5. 관점 분석

- 기술: 원문 순서 추출 도구가 없었고, README 목차·특수 하이픈 같은 원문 형식 차이를 다룰 정규화가 없었다.
- 프로세스: 대본 검증이 회차별 복사본이라 누적되지 않았고, 사용자 요구(원문 순서·벤치마크 설명)가 게이트로 승격되지 않은 채 산문으로만 남았다.
- AI협업: Claude가 "대본"을 사이트 카드 요약의 구어체 변환으로 해석했고, 발표자가 실제로 여는 화면을 확인하지 않았다. 이전 회차에서 같은 불만이 있었다는 맥락도 대본 작성 전에 조회하지 않았다.

## 6. 해결

공식 원문 순서를 JSON으로 추출하고, 대본의 화면 앵커가 그 순서를 거슬러 올라가거나 벤치마크를 설명 없이 언급하면 차단하는 게이트를 만들었다. 대본을 원문 순서대로 다시 쓰고, 빌드·검증을 설정 파일 하나로 쓰는 공용 도구로 옮겼다.

```
$ python3 ~/.claude/skills/voidnews-briefing-pipeline/gates/verify_speaker_script.py --selftest
PASS[verify_speaker_script:selftest] reversed anchors, unexplained and half-explained benchmarks are caught
$ python3 .../gates/verify_speaker_script.py --run _workspace/ab/20260923-speaker-script   (1차 대본)
verify_speaker_script: 10 위반 → 차단   EXIT=1
$ python3 .../gates/verify_speaker_script.py --run _workspace/ab/20260923-speaker-script   (재작성 후)
PASS[verify_speaker_script] 카드 순서·원문 앵커 순서·벤치마크 설명 규칙 통과   EXIT=0
$ python3 .../scripts/speaker_script.py verify --run _workspace/ab/20260923-speaker-script
{"status": "PASS", "passed": 53, "count": 53, "pdfPages": 23}   EXIT=0
```

## 7. 재발 방지

- ~/.claude/skills/voidnews-briefing-pipeline/gates/verify_speaker_script.py (HARD, S1~S7 + --selftest)
- ~/.claude/skills/voidnews-briefing-pipeline/scripts/source_walk.py (공식 원문 순서 추출)
- ~/.claude/skills/voidnews-briefing-pipeline/scripts/speaker_script.py (공용 build/verify, 회차별 복사 금지)
- ~/.claude/skills/voidnews-briefing-pipeline/references/benchmark-glossary.json (무엇을 재나·눈여겨볼 점)
- ~/.claude/skills/voidnews-briefing-pipeline/references/speaker-script-rules.md (규칙 정본), SKILL.md Phase 6 연결, 스킬 FAILURE_LOG.md VN-SCRIPT-01

## 8. 다음 세션 룰 후보

발표 대본은 source_walk.md를 먼저 만들고 verify_speaker_script exit 0 전에는 완료로 보고하지 않는다.
