# Radar Seed Schema

커뮤니티·큐레이터·메신저 어댑터가 collector 앞단에 전달하는 결정론적 발견 레코드 계약이다. 시드는 **발견 경로**이며 카드의 공식 출처가 아니다. verifier가 공식 1차 출처를 확보하기 전에는 승격하지 않는다.

## 필수 필드

```json
{
  "id": "community-hn-123456",
  "title": "원문 제목",
  "url": "https://example.com/item",
  "discoveredVia": "community-hn",
  "discoveredAt": "2026-07-18T12:34:56Z",
  "score": 123,
  "officialCandidateUrl": "https://example.com/official-or-null"
}
```

- `id`: source 안에서 안정적인 고유 ID. 플랫폼 원본 ID를 포함한다.
- `title`: 원문 제목. 빈 문자열 금지.
- `url`: 발견 항목의 canonical URL. HN 외부 링크가 없으면 HN item URL을 쓴다.
- `discoveredVia`: 아래 열거값 중 하나.
- `discoveredAt`: 원 플랫폼 게시 시각을 UTC ISO 8601로 정규화한다.
- `score`: 원 플랫폼 점수의 정수값. HN은 points, Reddit은 score다.
- `officialCandidateUrl`: 원문이 공식 1차 출처로 보일 때만 URL, 아니면 `null`. 이는 후보이며 verifier 확정 전 `officialUrl`이 아니다.

## discoveredVia 열거값

- `community-hn`
- `community-reddit`
- `kakao-room` (예약)
- `telegram-radar` (예약)
- 기존 collector 값(`curator-youtube`, `curator-x`, `curator-web`, `threads-archive`)은 그대로 유지한다.

## 선택 필드

어댑터는 병합과 추적에 필요한 다음 필드를 추가할 수 있다.

```json
{
  "source": "hn",
  "sourceItemUrl": "https://news.ycombinator.com/item?id=123456",
  "community": "LocalLLaMA",
  "author": "platform-user-name",
  "matchedKeywords": ["Claude", "agent"],
  "commentCount": 42
}
```

개인정보나 인증값은 추가하지 않는다. 원 플랫폼의 공개 작성자명은 필요 최소한으로만 보존하며 로그에는 출력하지 않는다.

## 출력 봉투

`01c_community_seeds.json`은 성공·실패를 모두 명시한다. silent skip 금지다.

```json
{
  "schemaVersion": 1,
  "dateRange": {"start": "2026-07-01", "end": "2026-07-18"},
  "generatedAt": "2026-07-18T12:00:00Z",
  "seeds": [],
  "sources": [
    {"id": "hn", "status": "ok", "itemsFetched": 10, "itemsSelected": 3},
    {"id": "reddit:LocalLLaMA", "status": "failed", "error": "HTTP 429"}
  ],
  "failures": [
    {"source": "reddit:LocalLLaMA", "error": "HTTP 429"}
  ]
}
```

어느 설정 소스든 fetch/parse에 실패하면 collector 프로세스는 결과 파일을 기록한 뒤 exit 2를 반환한다. 일부 성공 데이터가 있어도 실패를 숨기지 않는다.
