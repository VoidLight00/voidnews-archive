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
| R12 | 9월 VIP는 지정 순서의 본편 6개·공개 도구 2개, 공식 이미지 원본, 실제 제공 범위와 제안 시연을 갖춰야 합니다. | check-ab-2026-09a.mjs |
| R13 | Weekly 이미지 검사는 오래된 누락 목록 대신 현재 데이터를 읽고, 파일 바이트·근거 해시·실제 연결·출처 변경을 검사합니다. 회귀 사례로 검사 실패를 확인합니다. | check-weekly-source-images.mjs, test-weekly-source-images.mjs |

마스터: `bash gates/verify_voidnews.sh .`. `npm run build`는 별도로 실제 프로덕션 빌드와 생성 HTML 누수를 검사합니다.
배포는 검증 완료된 `.vercel/output`만 전송하며, 로컬 근거 캐시나 환경 파일은 게시하지 않습니다.
