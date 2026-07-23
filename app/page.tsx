import type { Metadata } from "next";
import { getLatestSlug, getWeekList, weekDateLabel } from "@/lib/data";
import { getEditionList } from "@/lib/ab/data";

// "/"는 최신 주간호로 즉시 이동하되, 정적 HTML에도 실제 콘텐츠를 남긴다.
// next/navigation redirect()는 output:export에서 빈 __next_error__ 셸을 만들어
// 크롤러·no-JS 환경이 빈 화면을 받는 SEO/UX 결함이 있었다 (2026-07-04 감사 SEO-02/DU-01).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const latestSlug = getLatestSlug();
  const weeks = getWeekList().slice(0, 8);
  const editions = getEditionList().slice(0, 4);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px" }}>
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace("/${latestSlug}/");`,
        }}
      />
      <h1 style={{ fontSize: "1.6rem", marginBottom: 8 }}>VoidNews Archive</h1>
      <p style={{ color: "var(--text2, inherit)", marginBottom: 24 }}>
        AI 뉴스 주간 포스팅 아카이브. 최신호로 이동 중입니다 —{" "}
        <a href={`/${latestSlug}/`}>바로 가기</a>
      </p>
      <section aria-label="최근 주간호">
        <h2 style={{ fontSize: "1.05rem", margin: "16px 0 8px" }}>최근 주간호</h2>
        <ul>
          {weeks.map((w) => (
            <li key={w.slug}>
              <a href={`/${w.slug}/`}>
                {weekDateLabel(w.period)}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section aria-label="AB 발표">
        <h2 style={{ fontSize: "1.05rem", margin: "16px 0 8px" }}>AB 멤버십 발표</h2>
        <ul>
          {editions.map((e) => (
            <li key={e.href}>
              <a href={`${e.href}/`}>
                VOL.{String(e.volume).padStart(2, "0")} — {e.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
