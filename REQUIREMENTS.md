# VoidNews 배포 종료 검증

기존 제품 요구사항은 `references/REQUIREMENTS.md`, 리뉴얼 요구사항은
`docs/redesign/REQUIREMENTS.md`에 보존합니다. 이 표는 재개·배포 시의 검증 진입점을 연결합니다.

| ID | 요구사항 | 검증 수단 |
|---|---|---|
| R1 | 주간·AB 데이터, 출처 해시, 중복, 영문판, 기존 개선 기록을 검사합니다. | content_gate.sh |
| R2 | 실제 기사 집계·이미지 근거와 원장 오류 차단 사례 87개를 검증합니다. | archive_gate.sh |
| R3 | TypeScript 오류가 없어야 합니다. | typecheck_gate.sh |
| R4 | 현재 Weekly에서 발견된 이미지는 실제 파일과 연결돼야 하며, 미리보기 미제공 항목은 원문별 조사 근거가 있어야 합니다. 접근 실패를 이미지 부재로 단정하지 않습니다. 새 미조사 누락·끊어진 파일은 차단합니다. | publish_gate.sh, check-weekly-source-images.mjs |
| R5 | 게시 대상 파일에 비밀값·실제 환경 파일이 없어야 합니다. 예제 파일도 비밀값 검사를 받습니다. | secrets_gate.sh |
| R6 | 첫 화면과 기사 이동·언어·필터·이미지 대체를 브라우저에서 확인합니다. | test-browse-ui.mjs, test-image-disclosure.mjs |
| R7 | 직접 제작한 화면에 좌측 색 세로줄이 없어야 합니다. | no_vertical_stripe_gate.sh |
| R8 | 필수 데이터·검증 문서가 존재해야 합니다. | count_gate.sh |
| R9 | 모든 요구사항이 실제 검증 수단에 연결되어야 합니다. | req_coverage_gate.sh |
| R10 | 공식 출처의 문맥·VIP 선정·보도 시점 판단은 원문과 대조합니다. | human |
| R11 | 신규 썸네일은 원문 상단 이미지 다음 공유용 이미지를 고르고, 장식·숨김·위험 URL과 이미지가 아닌 응답을 제외합니다. | content_gate.sh |
| R12 | 9월 VIP는 지정 순서의 본편 6개·공개 도구 2개, 공식 이미지 원본, 실제 제공 범위와 방문자용 실습을 갖춰야 합니다. | check-ab-2026-09a.mjs |
| R13 | Weekly 이미지 검사는 오래된 누락 목록 대신 현재 데이터를 읽고, 파일 바이트·근거 해시·실제 연결·출처 변경을 검사합니다. 회귀 사례로 검사 실패를 확인합니다. | check-weekly-source-images.mjs, test-weekly-source-images.mjs |
| R14 | 신규·교체 썸네일은 기사별 출처 조사 없이는 통과하지 않습니다. 기존 이미지 경로의 바이트 교체도 탐지하고, 조사한 이미지가 실제 첫 썸네일인지 확인합니다. | check-weekly-source-images.mjs, test-weekly-source-images.mjs |
| R15 | 운영 주소에서 본문 이동·언어·필터·모바일·이미지 대체 및 전체 Weekly 이미지 검사를 마쳐야 게시 완료입니다. 실패한 검사는 종료코드와 로그로 남습니다. | verify-site-release.mjs, test-browse-ui.mjs, test-image-disclosure.mjs, test-weekly-images-ui.mjs |
| R16 | 공개 본문에 발표자 준비 지시·리허설·작성 중 상태를 노출하지 않습니다. | check-ab-2026-09a.mjs |
| R17 | 비교 자료에 모델·원문·입력·출력·요청 성격·한영 설명을 갖추고 Images 2.5와 다른 버전을 구분합니다. | check-ab-2026-09a.mjs, test-ab-supplements-ui.mjs |
| R18 | 9월 두 번째 VIP는 본편 6개(같은 날 나온 두 모델은 별도 카드)·추가로 보면 좋을 뉴스 2개·공개 도구 2개를 지정 순서로 갖추고, 원문 이미지 해시와 자체 발표 수치·비상업 라이선스·도구 접근 범위 표기를 지켜야 합니다. | check-ab-2026-09b.mjs |
| R19 | (리뉴얼 R1) 운영자 연결 주소는 lib/site-links.ts 한 곳에만 둡니다. 모든 페이지의 바닥글 외부 링크는 운영자 계정 7개, 헤더 외부 링크는 X·Threads·GitHub와 주소·라벨·순서·새 탭 속성까지 같아야 합니다. | check-owner-links.mjs, run-postbuild-gates.mjs, check-renewal-gates.selftest.mjs, test-renewal-ui.mjs |
| R20 | (리뉴얼 R2) 강조 역할 토큰은 VOIDLIGHT 원색(잉크·종이·데이지 주황)만 참조합니다. 두 테마에서 글자 대비 4.5:1, 컨트롤 경계와 초점 3:1을 넘어야 하며, 이전 강조색 hex 8종이 없어야 합니다. | check-brand-tokens.mjs, check-renewal-gates.selftest.mjs |
| R21 | (리뉴얼 R3) AI가 쓴 카드·모달·기사·발표 하이라이트의 표시 위치 12곳이 '피움 작성 · AI'를 그립니다. 주간 카드마다 라벨 1개, 기사마다 48px 바이라인 1개, 발표 하이라이트 블록마다 라벨 1개가 있어야 하고, '자동 게시' 수는 lib/authorship.ts 규칙 대상 수와 같아야 합니다. | check-ai-author-label.mjs, run-postbuild-gates.mjs, check-renewal-gates.selftest.mjs, test-renewal-dynamic.mjs |
| R22 | (리뉴얼 R4) 구독 안내에는 고지 4항목·광고성 정보 수신 동의·만 14세 안내·위탁과 국외 이전이, 처리방침에는 12항목이 있어야 합니다. checked 속성은 0개여야 하고, 사이트 전체에 이메일 입력칸과 form action이 없어야 하며, 폼 주소가 비면 외부 구독 링크가 0개여야 합니다. 처리방침 11항 외부 서비스 목록은 코드가 직접 부르는 주소와 빌드 HTML·CSS의 외부 호스트를 모두 담아야 합니다. | check-newsletter-consent.mjs, run-postbuild-gates.mjs, check-renewal-gates.selftest.mjs |
| R23 | (리뉴얼 R5) 발견 전용·보도·영상 계층 주소에는 '공식' 출처 문구가 붙지 않습니다. 출처 문구는 lib/source-tier.ts 판정만 거쳐 정합니다. JS 판정과 Python 판정기의 대조는 판정기가 있는 기기에서 sync-source-registry.mjs --check로 확인합니다. | check-official-labels.mjs, run-postbuild-gates.mjs, check-renewal-gates.selftest.mjs, sync-source-registry.mjs |
| R24 | (리뉴얼 R6) 테마 전환은 '라이트'·'다크' 두 버튼(type="button", aria-pressed), 저장값 우선과 prefers-color-scheme 추종, 저장소 try/catch, 첫 화면 전 초기화, CSS 세 겹 선택자를 갖춰야 합니다. 실제 전환 동작은 브라우저 시험(npm run test:renewal)으로 따로 확인합니다. | check-theme-contract.mjs, check-renewal-gates.selftest.mjs, test-renewal-ui.mjs |
| R25 | (리뉴얼 R7) 강조색·회사색으로 카드나 상자의 위아래·왼쪽 테두리 선을 다시 만들지 않고, 색과 관계없이 이중선도 쓰지 않습니다. 가로선 게이트는 굵기와 관계없는 강조색 위아래 테두리, hover 때 테두리 색만 바꾸는 선, ::before·::after의 8px 이하 막대, 여러 줄 삼항식 값, double 테두리를 잡습니다. 세로줄은 CSS·HTML 게이트가 잡습니다. JS 값의 맨 변수 색(color, company.color)도 강조 계열로 봅니다. 함정 6개(r7-source-*)가 매 빌드 exit 1인지 자체시험이 확인합니다. | check-horizontal-accent.mjs, check-renewal-gates.selftest.mjs, no_vertical_stripe_gate.sh |

마스터: `bash gates/verify_voidnews.sh .`. `npm run build`는 별도로 실제 프로덕션 빌드와 생성 HTML 누수를 검사합니다.
리뉴얼 게이트(R19~R24)의 원본 검사와 함정 자체시험은 prebuild(`scripts/run-all-gates.mjs`)에서, 빌드 HTML 검사는 postbuild(`scripts/run-postbuild-gates.mjs`)에서 돕니다.
배포는 검증 완료된 `.vercel/output`만 전송하며, 로컬 근거 캐시나 환경 파일은 게시하지 않습니다.
### 방문자 중심 본문과 비교 자료 (2026-09-09)

- 공개 본문에서 발표자 준비 지시와 작성자 내부 상태를 제거하고, 방문자용 실습과 조건으로 설명한다.
- Astra·Fable의 네 과제 비교는 원 제작자의 사례 평가로 표시하고, 개인 사용 경험과 모델 공식 사양을 구분한다.
- 이미지 추가 자료는 입력·결과·실제 모델 분류·요청문 성격·출처를 한 묶음으로 보여 준다. GPT Image 2와 버전 미상의 사례를 Images 2.5 결과로 표시하지 않는다.
- 비교 표와 이미지 쌍은 모바일 및 영어 화면에서 읽을 수 있어야 하며, 원본 이미지 링크와 파일 해시가 일치해야 한다.
