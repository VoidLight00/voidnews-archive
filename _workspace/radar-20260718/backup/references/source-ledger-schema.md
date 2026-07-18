# Source Ledger Schema

```json
{
  "id": "src-openai-20260501-model-release",
  "date": "2026-05-01",
  "title": "원문 제목",
  "url": "https://...",
  "publisher": "OpenAI",
  "sourceType": "official-blog|official-doc|official-x|official-youtube|github|radar|news|blog|community|user-provided",
  "productNamespace": "Claude Code",
  "officialEventId": "claude-code-2.1.139-goal-agent-view",
  "relatedPattern": "agent-goal-loop",
  "official": true,
  "retrievedAt": "2026-05-07T12:00:00+09:00",
  "summary": "짧은 요약",
  "excerpt": "검증에 필요한 원문 일부",
  "claims": ["핵심 주장 1"],
  "relatedUrls": [],
  "discoveredVia": ["https://www.testingcatalog.com/..."],
  "extractedOfficialUrls": ["https://..."],
  "extractedOfficialXUrls": ["https://x.com/..."],
  "confidence": 0.0,
  "riskFlags": []
}
```

## discovery fields

- `sourceType: "radar"`는 TestingCatalog처럼 공식 링크를 찾아내기 위한 선행 발견 출처에 사용한다.
- `discoveredVia`에는 TestingCatalog 원문 URL처럼 발견 경로를 보존한다.
- `extractedOfficialUrls`에는 TestingCatalog 글에서 추출한 공식 블로그·문서·GitHub·changelog 후보를 둔다.
- `extractedOfficialXUrls`에는 공식 X/Twitter 후보를 둔다.
- verifier 통과 전에는 추출 링크를 `officialUrl`로 확정하지 않는다.

## riskFlags

- `unofficial`
- `rumor`
- `deleted`
- `date-out-of-range`
- `paywalled`
- `conflicting-claims`
- `needs-browser`
