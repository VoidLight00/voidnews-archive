"use client";

import { useLayoutEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import type { TrendingRow, TrendingStatus } from "@/lib/trending";
import styles from "./trending.module.css";

// GitHub 트렌딩 목록(REQUIREMENTS R31). full = /trending/ 전체 화면, compact = 주간 화면 옆 상위 5개 위젯.
// 서버 HTML 에는 최종 숫자가 들어간다. 화면을 그리기 직전에 '오늘 늘기 전 값'으로 바꾸고 다음 프레임에 최종 값으로 굴린다.
// 움직임 줄이기 설정이면 바꾸지 않는다. 숫자는 스냅숏의 실제 값만 쓴다.

type Phase = "ssr" | "start" | "live";
type Order = "rank" | "today";

const STATUS_TEXT: Record<TrendingStatus, (m: number) => [string, string]> = {
  none: () => ["", ""],
  new: () => ["NEW", "최근 7일 순위에 처음 들어왔습니다"],
  back: () => ["재진입", "전날에는 없다가 다시 들어왔습니다"],
  up: (m) => [`▲ ${m}`, `전날보다 ${m}계단 올랐습니다`],
  down: (m) => [`▼ ${-m}`, `전날보다 ${-m}계단 내려갔습니다`],
  same: () => ["–", "전날과 같은 순위입니다"],
};
const TONE: Record<TrendingStatus, string> = { none: "", new: "up", back: "up", up: "up", down: "down", same: "" };
const fmt = (n: number) => n.toLocaleString("en-US");

function Spark({ values, compact }: { values: number[]; compact: boolean }) {
  if (values.length < 2) return <span className={styles.sparkEmpty} aria-hidden="true" />;
  const [w, h] = compact ? [56, 18] : [72, 22];
  const min = Math.min(...values);
  const span = Math.max(...values) - min || 1;
  const points = values.map((v, i) => `${((i / (values.length - 1)) * (w - 2) + 1).toFixed(1)},${(h - 1 - ((v - min) / span) * (h - 2)).toFixed(1)}`);
  return (
    <>
      <svg className={styles.spark} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
        <polyline points={points.join(" ")} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className={styles.srOnly}>최근 {values.length}일 기록에서 별이 {fmt(values[0])}개에서 {fmt(values[values.length - 1])}개가 되었습니다.</span>
    </>
  );
}

function Row({ row, phase, compact, position }: { row: TrendingRow; phase: Phase; compact: boolean; position: number }) {
  const [badge, badgeSr] = STATUS_TEXT[row.status](row.move);
  const start = phase === "start";
  const owner = row.repo.split("/")[0];
  const name = row.repo.slice(owner.length + 1);
  return (
    <li className={styles.row} data-trending-row={row.repo} data-flash={phase === "live" ? TONE[row.status] || undefined : undefined}>
      <span className={styles.rank} aria-hidden="true">{String(position).padStart(2, "0")}</span>
      <div className={styles.main}>
        <div className={styles.nameLine}>
          <a className={styles.name} href={row.url} target="_blank" rel="noopener noreferrer">
            <span className={styles.owner}>{owner} /</span> {name}
            <span className={styles.srOnly}> (GitHub, 새 탭)</span>
          </a>
          {badge ? (
            <span className={styles.badge} data-tone={TONE[row.status] || "flat"} data-status={row.status}>
              <span aria-hidden="true">{badge}</span>
              <span className={styles.srOnly}>{badgeSr}</span>
            </span>
          ) : null}
        </div>
        {!compact && row.description ? <p className={styles.desc} lang="en">{row.description}</p> : null}
        {!compact ? (
          <p className={styles.meta}>
            {row.language ? <span lang="en">{row.language}</span> : null}
            <span>포크 {fmt(row.forks)}</span>
          </p>
        ) : null}
      </div>
      <div className={styles.numbers}>
        <span className={styles.today}>
          <span aria-hidden="true">
            <NumberFlow value={start ? 0 : row.starsToday} prefix="+" locales="en-US" animated={phase === "live"} />
          </span>
          <span className={styles.srOnly}>오늘 별 {fmt(row.starsToday)}개 증가</span>
          <span className={styles.unit} aria-hidden="true">오늘</span>
        </span>
        <span className={styles.total}>
          <span aria-hidden="true">
            ★ <NumberFlow value={start ? row.stars - row.starsToday : row.stars} locales="en-US" animated={phase === "live"} />
          </span>
          <span className={styles.srOnly}>전체 별 {fmt(row.stars)}개</span>
        </span>
      </div>
      <Spark values={row.history} compact={compact} />
    </li>
  );
}

export default function TrendingBoard({ rows, variant, label }: { rows: TrendingRow[]; variant: "full" | "compact"; label: string }) {
  const compact = variant === "compact";
  const [phase, setPhase] = useState<Phase>("ssr");
  const [order, setOrder] = useState<Order>(compact ? "today" : "rank");

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("start");
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setPhase("live"));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const sorted = order === "today" ? [...rows].sort((a, b) => b.starsToday - a.starsToday || a.rank - b.rank) : rows;
  const shown = compact ? sorted.slice(0, 5) : sorted;

  return (
    <div className={styles.board} data-trending-board={variant}>
      {!compact ? (
        <div className={styles.toggle} role="group" aria-label="정렬">
          {(["rank", "today"] as const).map((o) => (
            <button key={o} type="button" aria-pressed={order === o} onClick={() => setOrder(o)}>
              {o === "rank" ? "GitHub 순위" : "오늘 별 증가순"}
            </button>
          ))}
        </div>
      ) : null}
      <ol className={styles.list} aria-label={label}>
        {shown.map((row, i) => (
          <Row key={row.repo} row={row} phase={phase} compact={compact} position={order === "rank" ? row.rank : i + 1} />
        ))}
      </ol>
    </div>
  );
}
