import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 · VoidNews Archive",
  description: "voidnews-archive 사이트 이용약관 및 저작권 정책.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/tos" },
};

export default function TermsOfServicePage() {
  return (
    <main
      className="serif"
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "clamp(32px, 6vw, 64px) clamp(20px, 4vw, 32px)",
        color: "var(--text, #1a1a1a)",
        lineHeight: 1.7,
        fontSize: 16,
      }}
    >
      <h1 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, marginBottom: 8, letterSpacing: "-0.02em" }}>
        이용약관
      </h1>
      <p style={{ color: "var(--text-soft, #666)", marginBottom: 32, fontSize: 14 }}>
        최종 개정일 — 2026년 5월 26일
      </p>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>1. 저작권자</h2>
        <p>
          본 사이트(<code>voidnews-archive.vercel.app</code>) 의 모든 본문, 큐레이션, 코드, 디자인,
          데이터 구조의 저작권은 VoidLight (icthyeon00@gmail.com) 에게 있습니다. © 2026 VoidLight.
          All Rights Reserved.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>2. 금지 행위</h2>
        <p>다음 행위를 명시적으로 금합니다.</p>
        <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
          <li>본 사이트 본문 또는 큐레이션 결과의 무단 복제·전재·배포</li>
          <li>본 사이트 콘텐츠를 AI/ML 모델 학습 데이터셋으로 수집·사용</li>
          <li>자동화 도구(crawler, scraper, headless browser 등)로의 대량 수집</li>
          <li>본 사이트의 디자인·구조를 트레이드드레스 침해 수준으로 모방한 사이트 운영</li>
        </ul>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>3. 인용 정책</h2>
        <p>
          저작권법상 정당한 인용 (출처 명시 + 공정 사용 범위) 은 환영합니다. 인용 시{" "}
          <code>https://voidnews-archive.vercel.app</code> 및 해당 카드 URL 을 명확히 표기해 주세요.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>4. AI 학습 거부</h2>
        <p>
          본 사이트는 <code>robots.txt</code> 와 <code>X-Robots-Tag: noai, noimageai</code> HTTP
          헤더로 AI 학습 봇 (GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot 등) 의 접근을
          거부합니다. 해당 정책을 우회한 학습 데이터셋 수집은 본 약관 위반입니다.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>5. 법적 조치</h2>
        <p>
          본 약관 위반 시 한국 저작권법 제136조 (5년 이하의 징역 또는 5천만 원 이하의 벌금) 및
          DMCA (Digital Millennium Copyright Act) 절차에 따라 조치합니다.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>6. 연락처</h2>
        <p>
          라이선스 문의 · DMCA takedown · 인용 허가 요청 ─{" "}
          <a href="mailto:icthyeon00@gmail.com" style={{ color: "var(--accent, #1B365D)" }}>
            icthyeon00@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
