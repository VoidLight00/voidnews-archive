# Radar Phase 2 기획서 (SOL 실행용)

- 발주: Claude(Fable 5, advisor pane) 2026-07-18
- 실행: SOL (gpt-5.6-sol) — 이 문서가 유일한 작업 지시 정본(SSoT)
- 작업 루트: `~/projects/voidnews-archive` (브랜치 `feature/radar-layer`에서 시작)
- 선행 맥락: Phase 1(WP-1~4)은 완료 — `PLAN.md`, `STATUS.md` 참조. 이 문서는 그 후속.

## 경계 (위반 = 즉시 중단, Phase 1과 동일)

1. `git push` / 배포 / 외부 게시 / 공개 링크 생성 **금지**. 커밋은 로컬만.
2. 카카오톡 원본 DB·kakao-harness 실행 **금지**. WP-4(카카오 knowhow) 구현은 이번 Phase 범위 밖 — 착수하지 않는다.
3. 옵시디언 볼트 쓰기 금지.
4. API 키·토큰·개인정보를 산출물/로그에 남기지 않는다.
5. 스킬 디렉토리(`~/.claude/skills/voidnews-briefing-pipeline`) 기존 파일 수정 전 `_workspace/radar-20260718/backup/` 복사 + `skill-overlay/` 동기화 유지.
6. 좌측 색 세로 스트라이프(border-left accent) 디자인 영구 금지. UI 변경 시 `bash ~/.claude/qa-canon/no_vertical_stripe_gate.sh <대상 dir>` exit 0 증거 필수.
7. 각 WP 완료 시 `_workspace/radar-20260718/STATUS2.md` 갱신 (advisor가 mtime으로 감시). 기존 STATUS.md는 Phase 1 증거이므로 수정 금지.
8. 완료 주장은 전부 종료코드·카운트 동반. 자가보고 금지.

## WP-5 — Reddit 403 대응 (수집기 복원)

Phase 1 실측: `www.reddit.com/r/<sub>/top.json?t=week` 5개 소스 전부 HTTP 403 Blocked.

- 대상: 스킬 루트 `scripts/collect_community.py` + `references/community-sources.json`
- 시도 순서(각각 실측 후 다음으로): ① 서술형 User-Agent(연락처 포함 규약형) ② `api.reddit.com` 엔드포인트 ③ `old.reddit.com` ④ 요청 간 sleep 증가 + 재시도(backoff ≤3회).
- 성공 시: seeds 카운트 실측 기록, selftest fixture 갱신.
- 전부 실패 시: 위장 금지. `community-sources.json`에 `"enabled": false, "disabledReason": "HTTP 403 <날짜>"`로 **명시적** 비활성 처리하고, collector는 disabled 소스를 skip 사유와 함께 출력하되 exit 0이 되도록(명시 비활성은 실패가 아님) 로직 분리. silent skip과 구분되는 증거(disabledReason 출력) 필수.
- 완료 기준: selftest exit 0 + 실 API 스모크 종료코드·카운트 STATUS2.md 기록.

## WP-6 — baeksang 묶음 A 이식 (S난이도 6개, 사이트 반영)

`baeksang-feature-catalog.md`의 추천 묶음 A를 voidnews-archive 사이트에 이식한다. 픽셀 카피·고유 셀렉터 재현 금지 — 패턴만.

1. **날짜 고정 URL** — AB 브리핑 회차가 안정된 날짜 기반 URL로 접근 가능하게.
2. **호수+날짜 동시 표기** — 회차 번호와 날짜 범위를 함께 표시.
3. **출처별 수집 건수 요약** — 해당 회차의 소스별(youtube/x/web/community-hn/community-reddit) 시드 수집 건수를 회차 페이지에 요약 표기. 데이터가 없는 과거 회차는 생략(fail 아님).
4. **공식 1차 링크 우선 라벨** — 카드의 officialUrl에 "공식" 라벨, backupUrls와 시각 구분.
5. **HN/Reddit 원 점수 병기** — community 경유로 발견된 카드에 원 플랫폼 점수 표기(데이터 있는 경우만).
6. **cadence 표시** — 격주 발행 주기와 다음 회차 예정 표기.

- 기존 카드 데이터 스키마를 깨지 않는다(additive만). 기존 회차 데이터 소급 수정 금지 — 신규 필드는 optional.
- 완료 기준: `npm run build`(또는 리포 표준 빌드) exit 0 + 리포 기존 게이트(ledger verify 등 prebuild) exit 0 + 세로 스트라이프 게이트 exit 0. 내부 메모·큐레이션 인터널 노출 0 (grep 증거).

## WP-7 — 로컬 merge

- WP-5/6 커밋 완료 후 `feature/radar-layer` → `main` 로컬 merge (`--no-ff`).
- merge 후 main에서 빌드 + 리포 게이트 재실행 exit 0 확인.
- **push는 하지 않는다.** merge 완료 상태만 STATUS2.md에 기록하고 대기.

## 우선순위와 커밋

- 순서: WP-5 → WP-6 → WP-7. WP 단위 로컬 커밋, 커밋 본문에 '왜' 1줄.
- 전 WP 완료 후 STATUS2.md에 최종 요약(변경 파일·게이트 종료코드·카운트) 작성.
