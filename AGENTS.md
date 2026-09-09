## 이 사이트의 필수 완료 조건

사용자 고정 요청(2026-09-09): 이 사이트에서 수행하는 모든 작업은 아래 확인을 반드시 포함합니다. 특히 썸네일 확인은 선택 사항이 아닙니다. 문서나 이전 작업의 통과 보고만으로 완료를 선언하지 않습니다.

1. 현재 체크아웃의 데이터·코드·실행 화면을 직접 확인합니다. 본문, 공식 출처 링크, 발표·수집 기준일, 이미 공개된 회차와의 중복, 승인된 발표 구성, 한글·영문 표시를 유지합니다. 수정 범위 밖의 본문을 임의로 바꾸지 않습니다.
2. **신규·교체 썸네일은 해당 기사 원문을 직접 확인합니다.** 기사 상단의 첫 의미 있는 이미지 → 동일 기사의 공유 이미지 순서로 선택합니다. 작성자 사진, 로고, 메뉴, 다른 기사 그림, 임의의 업체 대표 그림으로 채우지 않습니다. 원본 바이트를 보존하며, 이미지 생성·재제작은 별도 사용자 요청이 있을 때만 수행합니다.
3. 기사·출처 URL·선택 근거·원본 이미지 URL·게시 경로·파일 해시를 `references/weekly-source-image-audit.json`에 결속합니다. 파일명만 있거나 이미지가 200으로 응답하는 것은 출처 확인의 대체가 아닙니다. `existingImageBaseline`은 기존 선택 보존용이며, 새 기사나 교체 이미지를 우회 등록하기 위해 늘리거나 다시 만들지 않습니다.
4. 원문에 이미지가 없는지, 출처가 미확정인지, 접속·수집·표시가 실패했는지를 구분합니다. 접속·수집 실패를 ‘출처 이미지 없음’으로 표시하거나 보고하지 않습니다. 미제공 항목은 이유와 근거를 남기고 완료 보고에도 한계를 밝힙니다.
5. **실제 화면에서 확인합니다.** 전체 Weekly 회차의 카드 수·이미지 로드·해당 기사와 이미지의 일치, 대표 이미지의 가시성, 모바일 줄바꿈·넘침, 기사 이동·필터·언어 전환, 이미지 실패 표시를 검사합니다. 파일 존재·로컬 성공만으로 배포 성공을 선언하지 않습니다.
6. 게시 전 `npm run build`, `bash ~/.claude/qa-canon/close.sh "$PWD"`, 브라우저 검사를 통과해야 합니다. 승인된 배포가 Ready가 되면 **운영 주소에서 `npm run verify:site -- --url https://voidnews-archive.vercel.app`를 실행**합니다. 실패하면 원인 수정→관련 검사→재배포→운영 재검사 순서를 반복합니다. 운영 검사가 미실행·실패인 상태는 완료가 아닙니다.
7. 검사는 `REQUIREMENTS.md`, `references/source-image-policy.json`, 기존 데이터·UI 검사를 함께 따릅니다. 게이트 실패를 피하려고 기준값을 느슨하게 하거나, 검사를 제외하거나, 오래된 결과를 최신 결과로 재사용하지 않습니다. 외부 게시 승인은 기존 사용자 지시 범위에서 판단합니다.

단일 확인 명령: `npm run verify:site -- --url <확인할 사이트 주소>`. 결과와 각 검사 로그는 `_workspace/release/`에 저장됩니다. 로컬 확인은 해당 주소에서 최신 빌드가 실행 중이어야 합니다.

## 공개 본문은 방문자 중심

사용자 고정 요청(2026-09-09): 공개 사이트의 본문·카드·추가 자료는 접속자가 읽고 활용하는 콘텐츠입니다. 발표자에게 주는 준비 지시, 리허설 안내, 작성 중 상태, 내부 조사·승인 메모를 넣지 않습니다. 실습은 방문자가 따라 할 입력·절차·결과 확인 기준으로 씁니다. 근거의 한계는 사례의 제공 조건으로 설명하고, 확인되지 않은 성능을 성공으로 표현하지 않습니다. 발표 대본·운영 기록은 별도 비공개 산출물에 둡니다. `scripts/check-ab-2026-09a.mjs`의 공개 문구 검사와 렌더 화면을 모두 확인합니다.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Source image selection

For new or refreshed thumbnails, apply `references/source-image-policy.json` through `scripts/lib/source-image.mjs`: use the first meaningful image at the top of the official article, then its OG share image when the article image is unavailable. Exclude navigation, logos, avatars, hidden/tracking images and unrelated article cards. Keep image identity and record source URL and selection kind in the cache manifest. Preserve existing thumbnail choices unless replacement is requested. Run `node scripts/check-source-image-policy.mjs` before publishing.

## 참고 영상은 공식 채널만 (2026-09-10)

카드 본문의 참고 영상은 발표 주체의 공식 채널에서 공개한 영상만 첨부합니다. 큐레이터·리뷰어·개인 유튜브 채널의 해설 영상은 목차에 해당 주제가 표시되어 있더라도 본문에 넣지 않습니다. 공식 영상이 없으면 참고 영상 항목 자체를 넣지 않고 공식 원문 링크만 남깁니다.

공식 채널 명단은 `references/official-video-channels.json`이 정본이며, 게이트가 이 파일만 근거로 판정합니다. 새 채널을 인정하려면 회사 공식 사이트에서 그 채널을 자사 채널로 안내하는 위치를 확인한 뒤 파일에 추가합니다.

## 한국어 본문은 fluent-korean을 따릅니다 (2026-09-10)

공개 본문의 한국어는 사용자 전역 지침 fluent-korean을 기본으로 적용합니다.

- 엠대시(—)는 2026-04a 회차부터 제목과 본문에 이어진 이 사이트의 기존 관례입니다. 신규 회차에서 새로 늘리지는 않되, 게이트는 이 항목을 판정하지 않습니다. 정비한다면 전 회차를 한 번에 다뤄야 표기가 갈리지 않습니다.
- 소제목은 "이번 변화가 중요한 이유", "어디서 어떻게 시작하나요" 같은 정형 라벨이나 질문형 대신, 내용을 그대로 말하는 완결된 서술문으로 씁니다. 2026-08b 이전 회차의 소제목이 기준입니다.
- ①②③, 첫째·둘째·셋째로 항목을 나열하지 않습니다. 문단으로 잇거나 실제 목록 구조를 사용합니다.
- 일반 어휘를 비유로 대체하지 않습니다. "관전 포인트", "~의 흐름" 같은 표현은 그 자리에서 실제로 가리키는 대상을 씁니다.
- 조사와 어미를 생략하지 않고 서술어로 문장을 끝맺습니다.

게이트는 `scripts/check-editorial-tone.mjs`이며 종료코드로 판정합니다.
