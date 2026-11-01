import type { Metadata } from "next";
import styles from "../components/legal-page.module.css";
import { PRIVACY_PATH, RSS_PATH, resolveNewsletterFormUrl } from "@/lib/site-links";

// 뉴스레터 구독 안내(리뉴얼 계획 R4, 문구는 계획 4.4절 초안).
// 정적 페이지입니다. 이메일 주소는 이 사이트가 직접 받지 않고, 스티비 호스팅 구독 폼이 받습니다.
// 폼 주소(lib/site-links.ts NEWSLETTER_FORM_URL)가 비어 있으면 외부 구독 링크를 하나도 그리지 않습니다.

export const metadata: Metadata = {
  title: "뉴스레터 구독 · VoidNews Archive",
  description: "VoidNews 뉴스레터의 구독 방법과 개인정보 수집·이용 내용을 안내합니다.",
  alternates: {
    canonical: "/newsletter/",
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default function NewsletterPage() {
  const formUrl = resolveNewsletterFormUrl();

  return (
    <main id="main-content" lang="ko" className={styles.page}>
      <h1 className={styles.title}>VoidNews 뉴스레터</h1>
      {/* 구독 폼을 열기 전과 후의 소개 문장이 다릅니다. 폼을 열 때 발송 주기를 이 문장에 함께 적습니다. */}
      <p className={styles.lede}>
        {formUrl
          ? "VoidNews가 공식 발표를 중심으로 정리한 AI 소식을 이메일로 보내 드립니다."
          : "VoidNews가 공식 발표를 중심으로 정리한 AI 소식을 이메일로 보내 드릴 예정입니다. 데일리 호와 주간 호를 준비하고 있으며, 발송 주기는 첫 호를 보낼 때 이곳에 안내합니다."}
      </p>

      <section className={styles.section} aria-labelledby="newsletter-notice" data-consent-notice="">
        <h2 id="newsletter-notice" className={styles.sectionTitle}>
          개인정보 수집·이용 안내
        </h2>
        <table className={styles.table} aria-labelledby="newsletter-notice">
          <tbody>
            <tr data-consent-item="purpose">
              <th scope="row">수집·이용 목적</th>
              <td>
                <strong>뉴스레터(광고성 정보 포함) 발송, 구독 확인과 수신 동의 기록 관리</strong>
              </td>
            </tr>
            <tr data-consent-item="items">
              <th scope="row">수집 항목</th>
              <td>이메일 주소</td>
            </tr>
            <tr data-consent-item="retention">
              <th scope="row">보유·이용 기간</th>
              <td>
                <strong>구독을 해지할 때까지 보유하며, 해지하면 지체 없이 파기합니다.</strong>
              </td>
            </tr>
            <tr data-consent-item="refusal">
              <th scope="row">동의를 거부할 권리와 불이익</th>
              <td>동의를 거부하실 수 있습니다. 거부하시면 뉴스레터를 받으실 수 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section} aria-labelledby="newsletter-ads" data-consent-ads="">
        <h2 id="newsletter-ads" className={styles.sectionTitle}>
          광고성 정보 수신 동의
        </h2>
        <p>
          <strong>
            VoidNews 뉴스레터에는 VOIDLIGHT의 강의·서비스 안내 같은 광고성 정보가 포함될 수 있습니다.
          </strong>{" "}
          그래서 구독할 때 광고성 정보(이메일) 수신 동의를 따로 받습니다. 동의는 메일 하단의 수신거부 링크로
          언제든지 철회하실 수 있습니다.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="newsletter-age" data-consent-age="">
        <h2 id="newsletter-age" className={styles.sectionTitle}>
          구독 연령
        </h2>
        <p>만 14세 미만은 구독하실 수 없습니다.</p>
      </section>

      <section className={styles.section} aria-labelledby="newsletter-transfer" data-consent-transfer="">
        <h2 id="newsletter-transfer" className={styles.sectionTitle}>
          처리 위탁과 국외 이전
        </h2>
        <p>
          구독 신청 접수와 메일 발송은 스티비 주식회사가 대행합니다. 스티비는 미국에 있는
          Amazon Web Services, Inc. 서버에 이메일 주소를 보관합니다. 자세한 내용은{" "}
          <a href={PRIVACY_PATH}>개인정보 처리방침</a>에서 확인하실 수 있습니다.
        </p>
      </section>

      <section
        className={styles.section}
        aria-labelledby="newsletter-subscribe"
        data-newsletter-state={formUrl ? "open" : "closed"}
      >
        <h2 id="newsletter-subscribe" className={styles.sectionTitle}>
          구독 신청
        </h2>
        {formUrl ? (
          <>
            <p>구독 신청은 스티비 구독 화면에서 받습니다. 이 사이트는 이메일 주소를 직접 받지 않습니다.</p>
            <div className={styles.actions}>
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="스티비에서 구독 신청하기, 새 탭"
                className={styles.primaryButton}
                data-newsletter-subscribe=""
              >
                스티비에서 구독 신청하기
              </a>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            {/* 그림만 쓰는 자리라 대체 텍스트를 붙입니다(계획 3.3절 6항). 원형으로 자르지 않습니다. */}
            <img src="/brand/pium.svg" alt="피움(AI 작성 캐릭터)" width={96} height={96} />
            <p>메일 구독은 아직 열지 않았습니다.</p>
            <a href={RSS_PATH} className={styles.secondaryButton}>
              RSS 피드 열기
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
