// 주차 라벨 유틸 — lib/data.ts 에서 분리 (2026-07-02 번들 다이어트).
// 클라이언트 컴포넌트는 반드시 이 모듈에서 import 할 것: lib/data.ts 를 값으로 import 하면
// weeks 전체 아카이브(전 주차 본문)가 클라이언트 번들에 딸려 들어간다.

export interface WeekListItem {
  slug: string;
  week: number;
  year: number;
  period: string;
}

// 주차 슬러그(2026-wNN) 대신 노출할 한국어 날짜 라벨 — period 종료일 기준 "M월 N째주"
export function weekDateLabel(period: string): string {
  const end = (period.split("~").pop() || "").trim(); // "6/4"
  const [m, d] = end.split("/").map((x) => parseInt(x, 10));
  if (!m || !d) return period;
  const nth = Math.ceil(d / 7);
  const ord = ["첫째", "둘째", "셋째", "넷째", "다섯째", "여섯째"][nth - 1] || String(nth);
  return `${m}월 ${ord}주`;
}
