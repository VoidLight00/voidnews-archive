# 카카오 AI방 Knowhow 수집 설계

## 목차

- [목표와 비목표](#목표와-비목표)
- [재사용 경계](#재사용-경계)
- [제안 데이터 흐름](#제안-데이터-흐름)
- [Knowhow 레코드 계약](#knowhow-레코드-계약)
- [신규 컴포넌트](#신규-컴포넌트)
- [승인 지점](#승인-지점)
- [HARD 게이트 설계](#hard-게이트-설계)
- [회복과 재실행](#회복과-재실행)
- [단계별 도입안](#단계별-도입안)

## 목표와 비목표

### 목표

기존 `kakao-harness`의 승인·정규화·sink 경계를 재사용해, 사용자가 지정한 AI 정보 방에서 다음 신호를 `knowhow` 타입으로 추출하는 흐름을 설계합니다.

1. 공유 링크: 도구, 모델, 튜토리얼, 공식 문서, 저장소
2. 툴 팁: 설치법, 프롬프트 사용법, 장애 회피법, 워크플로 요령
3. 동일 정규화 결과에서 두 갈래 산출
   - 방별 비공개 옵시디언 노트 후보
   - VoidNews AB 발견 시드(`discoveredVia: kakao-room`)

### 비목표

- 이번 WP에서는 코드 작성, 카카오 DB 접근, `kakao-harness` 실행, 옵시디언 쓰기를 하지 않습니다.
- 원문 메시지를 공개 사이트나 AB 카드 본문에 직접 노출하지 않습니다.
- 카카오 방 링크를 공식 출처로 취급하지 않습니다. AB에는 발견 경로만 전달하고 공식 1차 출처 검증을 별도 수행합니다.
- 이미지·영상 원격 다운로드를 기본 동작으로 만들지 않습니다.

## 재사용 경계

기준 구현은 `/Users/voidlight/projects/kakao-harness`입니다.

- `REQUIREMENTS.md` R2/R12: source는 synthetic 또는 explicit authorized여야 하며, 원본 DB·복호화·키·세션은 승인 없는 실행 대상이 아닙니다.
- canonical 계약: `src/normalize/index.js`가 conversation/person/message/link/attachment와 수량 회계를 만듭니다.
- 링크 계약: `src/normalize/links.js`가 메시지·preview URL을 canonical link로 정규화합니다.
- sink 계약: canonical artifact만 소비합니다. 새 sink도 raw DB나 raw parser row를 직접 읽지 않습니다.
- room backfill 경계: `backfill`은 plan/diff만 작성하고 실제 대상 쓰기는 approve+apply 뒤에만 가능합니다.
- 승인 결속: requestHash, actions, room, source, target, scope가 일치해야 apply가 가능합니다.
- media: 승인 전 metadata-only이며 네트워크 획득은 exact action 승인 이후에만 가능합니다.

## 제안 데이터 흐름

```text
[사용자 지정 room alias]
  → 승인된 read-only source 선택 (kakao-harness)
  → canonical normalize
  → canonical artifact hash + accounting gate
  → knowhow classifier/extractor (결정론 1차, 선택적 LLM 2차)
  → knowhow-review.json (plan only)
  → 사용자 항목별 승인
      ├─ action: write-private-obsidian-knowhow
      │   → 방별 신규 노트/스냅샷만 생성
      └─ action: emit-ab-kakao-seeds
          → 01d_kakao_seeds.json
          → VoidNews verifier가 공식 1차 URL 확보
          → 공식 URL 확보 항목만 카드 후보 승격
```

### 1. Source와 normalize

- 입력은 room alias/name만 받습니다. raw `chatId`는 화면·로그·산출물에 출력하지 않습니다.
- `kakao-harness`가 room presence, capabilities, capturedAt을 기준으로 verified read-only SQLite를 선택합니다.
- canonical artifact의 `artifactHash`, source SHA-256, room alias, 날짜 범위를 이후 계획과 승인에 결속합니다.
- 본문 추출은 canonical `messages[]`와 `links[]`만 소비합니다. 원본 DB 직접 조회를 새 컴포넌트에서 반복하지 않습니다.

### 2. Knowhow 후보 추출

1차 결정론 규칙으로 후보를 넓게 잡습니다.

- 링크 후보: canonical link 전수
- 텍스트 후보: 설치/설정/프롬프트/사용법/오류/해결/팁/워크플로/자동화 등 명시적 패턴
- 제외: 인사, 단순 감탄, 반복 전달, 개인정보, 링크 없는 근거 불명 주장
- 연결: messageId ↔ linkId를 유지하되 외부 산출물에는 비가역 pseudonym만 노출

선택적 LLM 분류를 도입할 경우에도 canonical 최소 필드만 전달하고, 외부 API 전송은 별도 명시 승인과 비용·개인정보 고지가 필요합니다. 기본 구현은 로컬 결정론 분류입니다.

### 3. 두 갈래 sink

#### A. 비공개 옵시디언 방별 노트

- 대상은 사용자 승인 후 확정합니다.
- 기존 노트 본문을 자동 수정하지 않습니다. 기본은 날짜별 신규 스냅샷 또는 별도 `Knowhow Inbox` 신규 노트입니다.
- 항목은 `제목 / 핵심 팁 / 링크 / 날짜 / 검토 상태`만 포함하고 원문 전문은 기본 제외합니다.
- 같은 canonical URL과 같은 팁 fingerprint는 중복 생성하지 않습니다.

#### B. AB 시드

`01d_kakao_seeds.json`은 Radar seed schema를 따릅니다.

```json
{
  "id": "kakao-room-<pseudonymous-room>-<stable-item-id>",
  "title": "공유된 도구 또는 팁 제목",
  "url": "https://공유된-링크.example",
  "discoveredVia": "kakao-room",
  "discoveredAt": "2026-07-18T03:00:00Z",
  "score": 1,
  "officialCandidateUrl": null,
  "sourceItemRef": "비가역 canonical item ref",
  "needsOfficialVerification": true
}
```

- 카카오에는 플랫폼 점수가 없으므로 `score`는 기본 1입니다. 반복 공유 수를 점수로 쓸 경우 별도 버전 계약이 필요합니다.
- `officialCandidateUrl`은 링크 도메인이 공식 후보로 보일 때만 채우며, 확정은 VoidNews verifier가 합니다.
- 메시지 본문, 방 이름, 작성자 이름, raw ID는 AB 시드에 포함하지 않습니다.

## Knowhow 레코드 계약

내부 `knowhow-review.json`의 제안 스키마입니다.

```json
{
  "schemaVersion": 1,
  "roomAlias": "configured-private-alias",
  "sourceHash": "sha256",
  "canonicalArtifactHash": "sha256",
  "dateRange": {"start": "YYYY-MM-DD", "end": "YYYY-MM-DD"},
  "items": [
    {
      "id": "knowhow-<stable-hash>",
      "kind": "tool-link|tutorial|prompt-tip|troubleshooting|workflow",
      "title": "검토용 제목",
      "summary": "최소 요약",
      "url": "https://...",
      "messageRefs": ["pseudonymous-ref"],
      "confidence": 0.0,
      "decision": "pending|approved-private-note|approved-ab-seed|rejected",
      "riskFlags": []
    }
  ],
  "accounting": {
    "canonicalMessages": 0,
    "canonicalLinks": 0,
    "candidates": 0,
    "emitted": 0,
    "rejected": 0,
    "quarantined": 0
  }
}
```

`canonicalLinks = classified + quarantined`와 `candidates = emitted + rejected + quarantined` 같은 보존식이 성립해야 합니다.

## 신규 컴포넌트

| 컴포넌트 | 위치 제안 | 책임 |
|---|---|---|
| `knowhow/extract.js` | kakao-harness | canonical message/link만 받아 결정론 후보 생성 |
| `knowhow/schema.js` | kakao-harness | knowhow v1 검증, accounting 보존식 검사 |
| `knowhow/plan.js` | kakao-harness | source/artifact/room/date 범위 hash가 결속된 plan 생성 |
| `backfill/adapters/obsidian-knowhow-private.js` | kakao-harness | 승인 전 diff만, 승인 후 신규 노트만 atomic 생성 |
| `sinks/voidnews-kakao-seeds.js` | kakao-harness 또는 별도 로컬 adapter | 개인정보 제거된 `kakao-room` seed 생성 |
| `references/kakao-seed-contract.md` | voidnews skill | seed schema와 공식 출처 승격 금지 경계 문서화 |
| `check_kakao_seed_privacy.sh` | voidnews skill | raw ID/방명/작성자/본문 부재와 필수 필드 강제 |

새 sink가 기존 `src/sinks.js`에 들어갈 경우 canonical artifact만 소비하도록 `sink_contract_gate.sh`에 추가합니다. 옵시디언 sink는 실제 쓰기 경계가 더 강하므로 room backfill의 plan/approve/apply 모델을 재사용합니다.

## 승인 지점

### 승인 A — 원본 DB 접근

사용자가 다음을 확인한 뒤에만 source inspect/normalize를 실행합니다.

- 정확한 room alias/name
- 날짜 범위
- 사용할 read-only source snapshot
- 산출 workspace
- 본문 포함 수준(기본 최소·redacted)

승인 전에는 DB open/query를 하지 않습니다.

### 승인 B — 외부 LLM 전송 (선택 기능)

기본 off입니다. 사용 시 전송 필드, 공급자, 예상 비용, 보존 정책을 보여주고 별도 승인받습니다.

### 승인 C — 옵시디언 쓰기

`write-private-obsidian-knowhow` action과 exact plan hash, 대상 디렉터리, 생성 파일 목록을 묶습니다. 기존 노트 수정은 별도 action으로 분리하며 기본 미지원으로 둡니다.

### 승인 D — AB 시드 방출

`emit-ab-kakao-seeds` action과 exact item ID 목록을 결속합니다. 이 승인은 사이트 카드 승인이 아니며, 공식 1차 출처 검증 단계로 넘기는 것만 허용합니다.

### 승인 E — media 획득

knowhow 링크/텍스트에는 불필요하므로 기본 제외합니다. 첨부 이미지가 꼭 필요할 때만 기존 `download-remote-assets` exact action을 사용합니다.

## HARD 게이트 설계

| 게이트 | exit 2 조건 | PASS 증거 |
|---|---|---|
| `knowhow_source_gate.sh` | explicit authorized source/room/date 결속 없음 | source hash·room alias·range 일치 |
| `knowhow_schema_gate.sh` | 필수 필드·열거값·보존식 오류 | items/accounting count 출력 |
| `knowhow_privacy_gate.sh` | raw chatId/authorId/방명/원문 전문/URL query 유출 | leak count=0 |
| `knowhow_provenance_gate.sh` | message/link ref 또는 canonical hash 없는 항목 | item ref coverage 100% |
| `knowhow_approval_gate.sh` | action, item set, source hash, target hash 불일치/만료 | exact binding 확인 |
| `knowhow_obsidian_gate.sh` | 승인 전 write, 기존 노트 overwrite, 금지 경로 접근 | planned creates와 actual creates 일치 |
| `kakao_seed_gate.sh` | `discoveredVia != kakao-room`, 필수 필드 누락, 본문/개인 식별자 포함 | seeds=N privacy leaks=0 |
| `knowhow_official_boundary_gate.sh` | 카카오 링크를 검증 없이 official/card로 승격 | `needsOfficialVerification=true` 전수 |
| `knowhow_idempotency_gate.sh` | 같은 plan 재적용 시 중복 노트/seed 증가 | second apply delta=0 |
| `verify_kakao.sh` 배선 메타게이트 | 신규 게이트가 마스터에서 누락 | 자동 발견 또는 명시 호출 확인 |

fixture는 synthetic room 1개, 링크/팁/잡음/민감 문자열/중복을 포함해야 합니다. 정상 fixture exit 0, raw ID 누출·승인 hash 변조·기존 노트 overwrite 시나리오는 각각 exit 2를 재현합니다.

## 회복과 재실행

- 모든 plan에는 source SHA-256, canonical artifactHash, config hash, room alias, 날짜 범위, 대상 identity를 기록합니다.
- source가 바뀌거나 날짜 범위가 달라지면 기존 승인은 폐기하고 새 requestHash를 만듭니다.
- 부분 실패 시 atomic temp→rename을 사용하고 ledger에 `success|failed|expired`를 남깁니다.
- resume은 성공 산출물 hash를 재검증하고, 실패 run은 원인을 고친 새 plan 없이는 apply하지 않습니다.
- 옵시디언과 AB seed sink는 독립 action입니다. 한쪽 실패가 다른 쪽 승인으로 암묵 전환되지 않습니다.

## 단계별 도입안

1. **M1 — synthetic fixture와 계약:** knowhow schema, deterministic extractor, privacy/provenance/accounting gate.
2. **M2 — plan only:** 승인된 canonical fixture를 대상으로 review JSON과 두 sink diff 생성. 실제 쓰기 없음.
3. **M3 — AB seed apply:** exact item-set 승인 후 `_workspace`에만 `01d_kakao_seeds.json` 생성, VoidNews seed gate 연결.
4. **M4 — 옵시디언 신규 노트 apply:** 사용자 지정 경로에 신규 파일만 atomic 생성. 기존 노트 수정은 계속 금지.
5. **M5 — 실제 room source:** 사용자 명시 승인 후에만 verified read-only source를 열고 전체 마스터 게이트 exit 0을 요구합니다.
