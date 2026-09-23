# VIP 브리핑 검증 기록 · 2026-09-24 회차

**판정: 공개 페이지 `/ab/2026-09b` 게시 전 검증 완료. 메인 6개 · 추가로 보면 좋을 뉴스 2개 · 공개 도구 2개.**

## 산출물

- 공개 편: `lib/ab/editions/2026-09b.ts` (주소 `/ab/2026-09b`, 날짜 주소 `/ab/2026-09-24`)
- 근거 원장: [SOURCES.json](SOURCES.json) — 기사 7건, 도구 2건, 이미지 9장의 원문 주소·해시·크기·선택 종류
- 발표자용 메모: [BRIEFING.md](BRIEFING.md) (비공개)
- Weekly w39: 미국 시간 9/22 발표 2건(Claude Opus 5.5, GPT-6 Sol·Luna) 추가, 기존 13건 변경 없음

## 공식 출처 확인

| 카드 | 확인한 원문 | 날짜 처리 |
|---|---|---|
| Claude Opus 5.5 | anthropic.com 발표 글, Claude 문서(모델·가격), Artificial Analysis | 9/22 · 발행처 표기일 |
| GPT-6 Sol·Luna | openai.com 발표 글(브라우저로 저장), 모델 문서 2건, GitHub Changelog | 9/23 06:00 KST (원문 2026-09-22T21:00Z) |
| GPT-Live-1 | openai.com 발표 글(브라우저로 저장), 모델 문서·개발 가이드 | 9/10 · 발행처 표기일 |
| Jev | typesafe.ai 발표 글, 개발 문서, LangChain 글 2건 | 9/15 · 발행처 표기일 |
| Grok 4.7 | x.ai 발표 글, docs.x.ai 모델 문서, GitHub Changelog, Artificial Analysis | 9/21 · 발행처 표기일 |
| Qwen-Image-2.1 | GitHub README·LICENSE, Hugging Face 모델 카드·데모 | 9/20 · README 표기일 |
| Claude Cowork | claude.com 발표 글, 도움말 문서 | 9/16 · 발행처 표기일 |
| Opus 5.5 시스템 프롬프트 추출본 | 정리 저장소 README, 원본 파일 커밋 기록(gh api), Anthropic 공식 공개본 문서 | 9/23 03:12 KST (원본 커밋 2026-09-22T18:12:04Z) |
| Graft | GitHub README·LICENSE·TELEMETRY, npm 레지스트리 | 0.19.0 배포 2026-09-22 |
| AuK | GitHub README·LICENSE·COOKBOOK, Hugging Face 모델·데모, 인코더 LICENSE | 공개 2026-09-09 |

openai.com은 스크립트 요청을 403으로 막아 브라우저로 연 페이지를 저장해 대조했습니다. 성능 수치는 모두 발표 주체의 수치로 표기했고, 독립 측정(Artificial Analysis, LangChain)은 출처를 밝혀 구분했습니다.

## 주장 경계로 확인한 사항

- Qwen-Image-2.1: README는 "open-source"라고 쓰지만 LICENSE는 비상업 연구용입니다. 제목·부제에 "오픈소스"를 쓰지 않았습니다.
- AuK: 코드·가중치는 MIT이지만 실행에 필요한 인코더 Qwen2.5-Omni-3B는 Qwen Research License(비상업)입니다. 카드 본문에 명시했습니다. 한국어 지원은 공식 문서에 없어서 "적혀 있지 않다"고 썼습니다.
- Grok 4.7: "두 배 빠르고 절반 가격"의 비교 대상(GPT-5.6 Sol, Fable 5.1)과 Grok 4.6과 같은 가격임을 밝혔습니다.
- GPT-6 Sol·Luna: ChatGPT Work와 Codex에서 제공되며 일반 채팅 화면에는 아직 없다는 점을 반영했습니다(정규화 초안의 "ChatGPT에서 사용 가능"을 교정).

## 비공식 자료 표시

- 시스템 프롬프트 추출본 카드는 `unofficial: true`로 표시해 사실 칸이 '비공식 자료 · 비공식 · github.com'으로 나옵니다. 상세 페이지에서도 원문을 공식 발표가 아닌 참고 링크로 보여 줍니다.
- 썸네일은 쓰지 않았습니다. 정리 저장소 README에는 이미지가 없고, 저장소 공유 이미지에는 작성자 얼굴 사진이 들어 있으며, Anthropic 문서의 공유 이미지는 요청 시 HTTP 404였습니다(접속 실패로 기록, 이미지 부재로 단정하지 않음).

## 이미지

- 9장 모두 해당 기사 또는 저장소의 이미지이며, 원본 바이트를 수정하지 않았습니다.
- openai.com 두 기사는 선택기가 관련 기사 카드를 먼저 고르는 문제가 있어 후보를 직접 대조했습니다(FAILURE_LOG VN-IMAGE-04).
- 1MB를 넘는 원본 2장은 공식 이미지 서버의 WebP 변환본(Sol·Luna), 저장소 공유 이미지(AuK)로 대체했습니다(VN-IMAGE-05).

## 실행한 검사

| 검사 | 결과 |
|---|---|
| `node scripts/check-ab-2026-09b.mjs` | exit 0 · 순서·이미지 해시·주장 경계 |
| `node scripts/check-editorial-tone.mjs 2026-09a 2026-09b` | exit 0 |
| `node scripts/check-weekly-source-images.mjs` | exit 0 |
| `node scripts/check-backfill-integration.mjs` | exit 0 · 09b 재사용 행 2건(GPT-Live-1, AuK) 결속 |
| `node scripts/verify-improvements.mjs` | exit 0 · IMP-0043 합계 120으로 갱신, IMP-0044 추가 |
| `npm run build` | exit 0 · 1,288페이지, 렌더 누수 0 |
| `node scripts/verify-publish-ready.mjs --scope all` | exit 0 |
| `bash gates/verify_voidnews.sh .` | exit 0 |
| `bash ~/.claude/qa-canon/close.sh` | exit 0 · GREEN |
| `npm run verify:site -- --url http://localhost:3917` | exit 0 · 필수 검사 5종 |
| 2026-09b 실제 화면(1440·390px) | 이미지 9/9 로드, 가로 넘침 없음, 콘솔 오류 0 |

## 운영 배포

- 커밋 `f06eb1d` · 브랜치 `feature/runway-renewal-20260908-150208` 푸시
- Vercel 운영 배포 `dpl_3VmhstgrNwua5YzUzBe7819jjC6Y` · READY · `https://voidnews-archive.vercel.app` 연결
- `npm run verify:site -- --url https://voidnews-archive.vercel.app`: exit 0 · 필수 검사 5종(master, browse-and-mobile, image-disclosure-and-failure, ab-reader-and-supplements, all-weekly-images)
- 운영 주소 `/ab/2026-09b`, `/ab/2026-09-24`, 카드 상세 페이지 HTTP 200
- 운영 화면(1440·390px): 이미지 9/9 로드, 가로 넘침 없음, 콘솔 오류 0

## 2차 배포 (시스템 프롬프트 추출본 카드 추가)

- 커밋 `7e1ac4f` 푸시, Vercel 운영 배포 `dpl_AReGHUupn6SatkZK9uXR6c2fUeKj` · READY
- 게시 전: `npm run build`, `check-ab-2026-09b`, `verify-publish-ready`, `verify_voidnews.sh`, `close.sh`(GREEN) 모두 exit 0
- `npm run verify:site -- --url https://voidnews-archive.vercel.app`: exit 0 · 필수 검사 5종
- 운영 화면(1440·390px) 추가 뉴스 섹션: 카드 2장, 새 카드 상태 '비공식 자료', 깨진 이미지 0, 가로 넘침 없음, 상세 페이지 HTTP 200

## 남은 확인 범위

- 운영 중인 w37 GPT-Live-1 카드의 썸네일이 다른 기사 표지입니다. 백필 원장 결속 때문에 이번 게시에서 교체하지 않았습니다.
- w38 Qwen-Image-2.1 카드 본문의 "오픈소스로 공개"는 라이선스 원문과 맞지 않습니다. 게시된 본문이라 승인 후 정비 대상입니다.
- 성능 수치의 독립 재현, 도구 설치·실행은 하지 않았습니다.
