import type { Metadata } from "next";
import styles from "../components/legal-page.module.css";
import { NEWSLETTER_PATH, getChannel } from "@/lib/site-links";

// 개인정보 처리방침(리뉴얼 계획 R4, 항목은 계획 4.4절 '개인정보 처리방침' 1~12항).
// 정적 페이지입니다. 외부 서비스 목록은 현재 코드에서 브라우저가 실제로 부르는 주소와 맞춥니다.

/** 시행일. 공개(배포) 날짜가 정해지면 이 값을 그 날짜로 맞춥니다. */
const EFFECTIVE_DATE = "2026년 11월 1일";

export const metadata: Metadata = {
  title: "개인정보 처리방침 · VoidNews Archive",
  description:
    "VoidNews 뉴스레터 구독자의 개인정보 처리 목적, 항목, 보유 기간, 처리 위탁과 국외 이전, 정보주체의 권리를 안내합니다.",
  alternates: {
    canonical: "/privacy/",
    types: { "application/rss+xml": "/rss.xml" },
  },
};

const ENTRUSTMENT: ReadonlyArray<readonly [string, string]> = [
  ["수탁자", "스티비 주식회사"],
  ["위탁 업무", "구독 신청 접수, 구독 확인 메일 발송, 뉴스레터 발송, 수신거부 처리"],
];

const OVERSEAS_TRANSFER: ReadonlyArray<readonly [string, string]> = [
  ["이전 항목", "이메일 주소, 수신 동의 기록"],
  ["이전 국가", "미국"],
  ["이전 시기와 방법", "구독 신청과 뉴스레터 발송 때 네트워크로 전송합니다."],
  ["이전받는 자", "스티비의 수탁사인 Amazon Web Services, Inc."],
  ["이용 목적과 보유 기간", "메일 발송 시스템 운영에 쓰며, 구독을 해지할 때까지 보유합니다."],
  ["거부 방법과 효과", "구독하지 않으시면 이전되지 않습니다. 구독을 해지하시면 보관된 정보를 파기합니다."],
];

// 호스트 이름 바로 뒤에 조사나 여는 괄호를 붙이지 않습니다. WebKit은 그런 어절을 점이나 괄호 뒤에서 끊습니다.
const EXTERNAL_SERVICES: ReadonlyArray<readonly [string, string]> = [
  ["모든 화면의 Pretendard 글꼴", "cdn.jsdelivr.net"],
  ["X 게시물 표시", "platform.twitter.com, publish.twitter.com, X가 게시물 표시에 쓰는 twimg.com 주소"],
  ["Threads 게시물 표시", "www.threads.com, www.threads.net"],
  ["YouTube 영상 표시", "www.youtube.com, i.ytimg.com, YouTube가 영상 재생에 쓰는 주소"],
  ["링크 미리보기", "api.microlink.io"],
  ["기사 원문 이미지", "기사 원문 사이트와 그 사이트가 쓰는 이미지 서버, 예를 들면 storage.googleapis.com, storage.ghost.io"],
];

// WebKit은 한국어(keep-all) 문단 속 호스트 이름을 점에서 끊습니다. 호스트 이름만 영문 줄바꿈 규칙을 따르게 감쌉니다.
const HOST_NAME = /([a-z0-9-]+(?:\.[a-z0-9-]+)+)/gi;

function withHostNames(text: string) {
  return text.split(HOST_NAME).map((part, index) =>
    index % 2 ? (
      <span key={index} lang="en" className={styles.latin}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function TermList({ rows }: { rows: ReadonlyArray<readonly [string, string]> }) {
  return (
    <dl className={styles.termList}>
      {rows.map(([term, detail]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{withHostNames(detail)}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function PrivacyPage() {
  const contactAddress = getChannel("email").href.replace(/^mailto:/, "");

  return (
    <main id="main-content" lang="ko" className={styles.page}>
      <h1 className={styles.title}>개인정보 처리방침</h1>
      <p className={styles.meta}>시행일 {EFFECTIVE_DATE}</p>
      <p className={styles.lede}>
        VoidNews는 뉴스레터 구독자의 개인정보를 아래와 같이 처리합니다. 이 사이트는 이메일 주소를 직접 받지
        않으며, 구독 신청은 스티비 주식회사가 운영하는 구독 화면에서 받습니다. 구독 안내는{" "}
        <a href={NEWSLETTER_PATH}>뉴스레터 구독</a> 페이지에서 확인하실 수 있습니다.
      </p>

      <section className={styles.section} aria-labelledby="privacy-purpose" data-privacy-item="purpose">
        <h2 id="privacy-purpose" className={styles.sectionTitle}>
          1. 처리 목적
        </h2>
        <p>
          <strong>뉴스레터(광고성 정보 포함) 발송, 구독 확인과 수신 동의 기록 관리</strong>에만 개인정보를
          처리합니다.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="privacy-items" data-privacy-item="items">
        <h2 id="privacy-items" className={styles.sectionTitle}>
          2. 처리 항목
        </h2>
        <p>
          구독에 필요한 이메일 주소만 수집합니다. 구독을 신청하시면 수신 동의 기록이 함께 남습니다.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="privacy-retention" data-privacy-item="retention">
        <h2 id="privacy-retention" className={styles.sectionTitle}>
          3. 보유·이용 기간
        </h2>
        <p>
          <strong>구독을 해지할 때까지 보유하며, 해지하면 지체 없이 파기합니다.</strong>
        </p>
      </section>

      <section className={styles.section} aria-labelledby="privacy-destruction" data-privacy-item="destruction">
        <h2 id="privacy-destruction" className={styles.sectionTitle}>
          4. 파기 절차와 방법
        </h2>
        <p>구독을 해지하시면 스티비 주소록에서 해당 이메일 주소와 수신 동의 기록을 삭제합니다.</p>
      </section>

      <section className={styles.section} aria-labelledby="privacy-entrustment" data-privacy-item="entrustment">
        <h2 id="privacy-entrustment" className={styles.sectionTitle}>
          5. 처리 위탁
        </h2>
        <p>뉴스레터 운영에 필요한 업무를 아래와 같이 위탁합니다.</p>
        <TermList rows={ENTRUSTMENT} />
      </section>

      <section className={styles.section} aria-labelledby="privacy-transfer" data-privacy-item="transfer">
        <h2 id="privacy-transfer" className={styles.sectionTitle}>
          6. 국외 이전
        </h2>
        <p>스티비는 구독자 정보를 미국에 있는 서버에 보관합니다. 이전 내용은 다음과 같습니다.</p>
        <TermList rows={OVERSEAS_TRANSFER} />
      </section>

      <section className={styles.section} aria-labelledby="privacy-rights" data-privacy-item="rights">
        <h2 id="privacy-rights" className={styles.sectionTitle}>
          7. 정보주체의 권리와 행사 방법
        </h2>
        <p>
          구독자는 언제든지 자신의 개인정보 열람, 정정, 삭제, 처리정지를 요구하실 수 있습니다. 메일 하단의
          수신거부 링크를 누르시면 바로 구독이 해지됩니다. 그 밖의 요구는 아래 개인정보 보호책임자에게
          이메일로 보내 주시면 지체 없이 처리합니다.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="privacy-officer" data-privacy-item="officer">
        <h2 id="privacy-officer" className={styles.sectionTitle}>
          8. 개인정보 보호책임자
        </h2>
        <dl className={styles.termList}>
          <div>
            <dt>책임자</dt>
            <dd>VoidLight(운영자)</dd>
          </div>
          <div>
            <dt>이메일</dt>
            <dd>
              <a href={`mailto:${contactAddress}`}>{contactAddress}</a>
            </dd>
          </div>
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="privacy-children" data-privacy-item="children">
        <h2 id="privacy-children" className={styles.sectionTitle}>
          9. 만 14세 미만 아동
        </h2>
        <p>만 14세 미만 아동의 개인정보는 받지 않습니다. 만 14세 미만은 뉴스레터를 구독하실 수 없습니다.</p>
      </section>

      <section className={styles.section} aria-labelledby="privacy-storage" data-privacy-item="browser-storage">
        <h2 id="privacy-storage" className={styles.sectionTitle}>
          10. 브라우저에 저장하는 정보
        </h2>
        <p>
          화면 테마, 언어, 북마크, 읽음 표시, 최근 검색어, 밀도·정렬 같은 보기 설정, 링크 미리보기 결과는
          방문자의 브라우저 저장소에만 저장합니다. 이 값은 서버로 보내지 않으며, 브라우저에서 이 사이트의
          데이터를 지우면 함께 삭제됩니다.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="privacy-external" data-privacy-item="external-services">
        <h2 id="privacy-external" className={styles.sectionTitle}>
          11. 외부 서비스 호출
        </h2>
        <p>
          방문자의 브라우저는 모든 화면에서 글꼴을 내려받기 위해 {withHostNames("cdn.jsdelivr.net")} 서버에
          접속합니다. 그 밖에 X·Threads 게시물, YouTube 영상, 링크 미리보기, 기사 원문 이미지를 보여 주는
          화면에서는 아래 외부 서비스에 직접 접속합니다. 이때 해당 서비스에 IP 주소 같은 접속 정보가 전달됩니다.
        </p>
        <TermList rows={EXTERNAL_SERVICES} />
      </section>

      <section className={styles.section} aria-labelledby="privacy-effective" data-privacy-item="effective-date">
        <h2 id="privacy-effective" className={styles.sectionTitle}>
          12. 시행일과 변경 고지
        </h2>
        <p>
          이 방침은 {EFFECTIVE_DATE}부터 시행합니다. 내용을 바꾸면 시행 전에 이 페이지에 바뀐 내용과 시행일을
          알립니다.
        </p>
      </section>
    </main>
  );
}
