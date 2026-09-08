import type { WeeklyData } from "./data";

export function getWeeklyBrowseItems(data: WeeklyData) {
  return [
    { id: "all", label: "전체 소식", count: data.companies.reduce((sum, company) => sum + company.posts.length, 0) },
    ...data.companies.map((company) => ({
      id: company.name,
      label: company.name.split(" /")[0],
      count: company.posts.length,
    })),
  ];
}
