// 주차 라벨 유틸 — lib/data.ts 에서 분리 (2026-07-02 번들 다이어트).
// 클라이언트 컴포넌트는 반드시 이 모듈에서 import 할 것: lib/data.ts 를 값으로 import 하면
// weeks 전체 아카이브(전 주차 본문)가 클라이언트 번들에 딸려 들어간다.

export interface WeekListItem {
  slug: string;
  week: number;
  year: number;
  period: string;
}

// 사용자 화면에는 내부 주차 코드나 월내 서수를 노출하지 않고 실제 수집 날짜 범위만 표시한다.
export function weekDateLabel(period: string): string {
  return period.trim();
}
