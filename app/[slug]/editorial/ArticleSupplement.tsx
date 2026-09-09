import type { ArticleSupplementData, MediaImage } from "@/lib/data";
import styles from "./supplement.module.css";

interface ArticleSupplementProps {
  data: ArticleSupplementData;
  locale: "ko" | "en";
}

const labels = {
  ko: {
    model: "자료의 모델 표기",
    sourceKind: "사례 출처",
    official: "공식 공개 사례",
    community: "커뮤니티 공개 사례",
    input: "입력 이미지",
    output: "결과 이미지",
    original: "원본 크게 보기",
    newTab: "새 탭에서 열기",
    source: "출처",
    sourceSummary: "원문 요청 요약",
    suggested: "직접 해볼 요청 예시",
    suggestedNote: "아래 요청은 직접 적용해 볼 예시입니다. 위 결과를 만든 원문 요청과 구분해 참고하십시오.",
    focus: "비교할 점",
    limit: "제공 범위와 한계",
    scroll: "표를 좌우로 움직여 나머지 열을 확인할 수 있습니다.",
  },
  en: {
    model: "Model label in source",
    sourceKind: "Case source",
    official: "Official published example",
    community: "Community published example",
    input: "Input image",
    output: "Output image",
    original: "View full-size original",
    newTab: "Opens in a new tab",
    source: "Source",
    sourceSummary: "Summary of the source request",
    suggested: "Suggested request to try",
    suggestedNote: "This request is an example to try yourself. It is separate from the source request that produced the result above.",
    focus: "What to compare",
    limit: "Scope and limitations",
    scroll: "Scroll horizontally to view the remaining columns.",
  },
} as const;

function ComparisonImage({
  image,
  role,
  title,
  locale,
}: {
  image: MediaImage;
  role: "input" | "output";
  title: string;
  locale: ArticleSupplementProps["locale"];
}) {
  const copy = labels[locale];
  const hasKorean = (value: string) => /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/.test(value);
  const alt = image.alt && (locale === "ko" || !hasKorean(image.alt))
    ? image.alt
    : `${title} — ${copy[role]}`;
  const caption = image.caption && (locale === "ko" || !hasKorean(image.caption))
    ? image.caption
    : undefined;

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.imageCaption}>
        <strong>{copy[role]}</strong>
        {caption ? <span className={styles.captionDetail}>{caption}</span> : null}
      </figcaption>
      <a
        className={styles.imageLink}
        href={image.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} — ${copy[role]}: ${copy.original} (${copy.newTab})`}
      >
        <img src={image.src} alt={alt} loading="lazy" decoding="async" />
        <span className={styles.imageAction}>{copy.original} ↗</span>
      </a>
    </figure>
  );
}

export default function ArticleSupplement({ data, locale }: ArticleSupplementProps) {
  const copy = labels[locale];
  const prefix = `supplement-${encodeURIComponent(data.id)}`;

  return (
    <section
      id={data.id}
      className={styles.supplement}
      aria-labelledby={`${prefix}-title`}
      lang={locale}
      data-article-supplement={data.id}
    >
      <header className={styles.header}>
        <h2 id={`${prefix}-title`} className={styles.title}>{data.title[locale]}</h2>
        <p className={styles.intro}>{data.intro[locale]}</p>
      </header>

      {data.tables?.map((table) => {
        const tableId = `${prefix}-table-${encodeURIComponent(table.id)}`;
        return (
          <section key={table.id} className={styles.tableBlock} aria-labelledby={`${tableId}-title`}>
            <h3 id={`${tableId}-title`} className={styles.sectionTitle}>{table.title[locale]}</h3>
            <p id={`${tableId}-scroll`} className={styles.scrollHint}>{copy.scroll}</p>
            <div
              className={styles.tableScroll}
              role="region"
              aria-labelledby={`${tableId}-title`}
              aria-describedby={`${tableId}-scroll`}
              tabIndex={0}
            >
              <table className={styles.table}>
                <caption className={styles.visuallyHidden}>{table.title[locale]}</caption>
                <thead>
                  <tr>{table.columns.map((column, index) => <th key={index} scope="col">{column[locale]}</th>)}</tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>{row.map((cell, columnIndex) => <td key={columnIndex}>{cell[locale]}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            {table.note ? <p className={styles.note}>{table.note[locale]}</p> : null}
            <p className={styles.sourceLine}>
              {copy.source}: {" "}
              <a href={table.sourceUrl} target="_blank" rel="noopener noreferrer">
                {table.sourceLabel[locale]}<span aria-hidden="true"> ↗</span>
                <span className={styles.visuallyHidden}> ({copy.newTab})</span>
              </a>
            </p>
          </section>
        );
      })}

      {data.cases?.map((item) => {
        const caseId = `${prefix}-case-${encodeURIComponent(item.id)}`;
        return (
          <section key={item.id} className={styles.case} aria-labelledby={`${caseId}-title`}>
            <h3 id={`${caseId}-title`} className={styles.sectionTitle}>{item.title[locale]}</h3>
            <dl className={styles.caseMeta}>
              <div><dt>{copy.model}</dt><dd>{item.model}</dd></div>
              <div><dt>{copy.sourceKind}</dt><dd>{copy[item.kind]}</dd></div>
            </dl>
            <div className={styles.imagePair}>
              <ComparisonImage image={item.input} role="input" title={item.title[locale]} locale={locale} />
              <ComparisonImage image={item.output} role="output" title={item.title[locale]} locale={locale} />
            </div>
            <dl className={styles.details}>
              <div>
                <dt>{item.promptKind === "source-summary" ? copy.sourceSummary : copy.suggested}</dt>
                <dd>
                  <p className={styles.prompt}>{item.prompt[locale]}</p>
                  {item.promptKind === "suggested" ? <p className={styles.note}>{copy.suggestedNote}</p> : null}
                </dd>
              </div>
              <div><dt>{copy.focus}</dt><dd>{item.focus[locale]}</dd></div>
              <div><dt>{copy.limit}</dt><dd>{item.limit[locale]}</dd></div>
            </dl>
            <p className={styles.sourceLine}>
              {copy.source}: {" "}
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                {item.sourceLabel[locale]}<span aria-hidden="true"> ↗</span>
                <span className={styles.visuallyHidden}> ({copy.newTab})</span>
              </a>
            </p>
          </section>
        );
      })}
    </section>
  );
}
