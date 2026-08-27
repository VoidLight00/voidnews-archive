"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { RehearsalStep } from "@/lib/ab/rehearsal-2026-08b";

function clock(seconds: number) {
  const value = Math.max(0, seconds);
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function safeRead(key: string, fallback: number) {
  try {
    const value = Number(localStorage.getItem(key));
    return Number.isFinite(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export default function PracticeClient({ steps, editionHref }: { steps: RehearsalStep[]; editionHref: string }) {
  const [index, setIndex] = useState(0);
  const [fontScale, setFontScale] = useState(1);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [wakeStatus, setWakeStatus] = useState("화면 유지 꺼짐");
  const wakeLock = useRef<{ release: () => Promise<void> } | null>(null);

  useEffect(() => {
    setIndex(Math.min(steps.length - 1, safeRead("voidnews-practice-index", 0)));
    setFontScale(Math.min(1.5, Math.max(0.85, safeRead("voidnews-practice-font", 100) / 100)));
  }, [steps.length]);

  useEffect(() => {
    try {
      localStorage.setItem("voidnews-practice-index", String(index));
      localStorage.setItem("voidnews-practice-font", String(Math.round(fontScale * 100)));
    } catch {}
  }, [index, fontScale]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setElapsed((value) => value + 1);
      setTotalElapsed((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    setElapsed(0);
    setRunning(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  const step = steps[index];
  const targetBefore = useMemo(() => steps.slice(0, index).reduce((sum, item) => sum + item.durationSec, 0), [steps, index]);
  const totalTarget = useMemo(() => steps.reduce((sum, item) => sum + item.durationSec, 0), [steps]);
  const progress = ((index + Math.min(1, elapsed / step.durationSec)) / steps.length) * 100;

  async function toggleWakeLock() {
    try {
      if (wakeLock.current) {
        await wakeLock.current.release();
        wakeLock.current = null;
        setWakeStatus("화면 유지 꺼짐");
        return;
      }
      if (!("wakeLock" in navigator)) {
        setWakeStatus("이 브라우저는 미지원");
        return;
      }
      wakeLock.current = await navigator.wakeLock.request("screen");
      setWakeStatus("화면 유지 켜짐");
    } catch {
      setWakeStatus("화면 유지 실패");
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", paddingBottom: 116 }}>
      <header style={{ position: "sticky", top: 0, zIndex: 20, borderBottom: "1px solid var(--border)", background: "color-mix(in srgb, var(--bg) 92%, transparent)", backdropFilter: "blur(14px)" }}>
        <div style={{ height: 4, background: "var(--surface-2)" }}><div style={{ width: `${progress}%`, height: "100%", background: "var(--accent)", transition: "width .25s" }} /></div>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "10px 14px", display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "center" }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--accent)", fontWeight: 800, letterSpacing: ".12em" }}>{step.label} · {index + 1}/{steps.length}</div>
            <div style={{ marginTop: 3, fontSize: 13, fontWeight: 750, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{step.title}</div>
          </div>
          <div className="mono" style={{ textAlign: "right" }}>
            <strong style={{ display: "block", fontSize: 18, color: elapsed > step.durationSec ? "#ef4444" : "var(--text)" }}>{clock(elapsed)}</strong>
            <span style={{ fontSize: 10, color: "var(--muted)" }}>목표 {clock(step.durationSec)}</span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "22px 16px 28px" }}>
        <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          <Link href={editionHref} style={{ color: "var(--muted)", textDecoration: "none", fontSize: 12 }}>← 카드 페이지</Link>
          {step.cardSlug ? <Link href={`${editionHref}/${step.cardSlug}/`} target="_blank" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 12, fontWeight: 750 }}>상세 카드 ↗</Link> : null}
          {step.sourceUrl ? <a href={step.sourceUrl} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 12, fontWeight: 750 }}>공식 출처 ↗</a> : null}
        </nav>

        <section style={{ borderTop: "3px double var(--rule)", paddingTop: 18 }}>
          <p className="mono" style={{ margin: 0, color: "var(--muted)", fontSize: 11 }}>{step.company || "AI&Beyond · 2026-08-27"}</p>
          <h1 className="serif" style={{ margin: "8px 0 0", fontSize: "clamp(28px, 8vw, 46px)", lineHeight: 1.08, letterSpacing: "-.04em" }}>{step.title}</h1>
        </section>

        {step.visual ? (
          <figure style={{ margin: "20px 0 0", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "var(--surface)" }}>
            <img src={step.visual.src} alt={step.visual.alt} loading="eager" style={{ width: "100%", height: "auto", maxHeight: "min(44vh, 340px)", display: "block", aspectRatio: "1200 / 630", objectFit: "contain", background: "var(--surface-2)" }} />
            <figcaption style={{ padding: "11px 13px 13px", borderTop: "1px solid var(--border)", color: "var(--muted)", fontSize: 11, lineHeight: 1.55 }}>
              {step.visual.sourceLabel ? <strong className="mono" style={{ display: "block", marginBottom: 4, color: "var(--accent)", fontSize: 9, letterSpacing: ".1em" }}>{step.visual.sourceLabel}</strong> : null}
              {step.visual.caption}
            </figcaption>
          </figure>
        ) : null}

        {step.embeds?.map((embed) => (
          <details key={embed.url} open={step.id === "tiangong"} style={{ marginTop: 18, border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "var(--surface)" }}>
            <summary style={{ padding: "12px 13px", cursor: "pointer", listStylePosition: "inside", color: "var(--accent)" }}>
              <strong className="mono" style={{ fontSize: 10, letterSpacing: ".1em" }}>{embed.label}</strong>
              <span style={{ display: "block", marginTop: 5, paddingLeft: 18, color: "var(--muted)", fontSize: 11, lineHeight: 1.5 }}>{embed.caveat}</span>
            </summary>
            <iframe src={embed.url} title={embed.title} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" style={{ width: "100%", minHeight: "min(500px, 72vh)", border: 0, borderTop: "1px solid var(--border)", display: "block" }} />
          </details>
        ))}

        {step.embedUrl && !step.embeds?.some((embed) => embed.url === step.embedUrl) ? (
          <section style={{ marginTop: 20, border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "var(--surface)" }}>
            <iframe src={step.embedUrl} title={`${step.title} 영상`} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" style={{ width: "100%", minHeight: 500, border: 0, display: "block" }} />
          </section>
        ) : null}

        {step.cues && step.cues.length > 0 ? (
          <aside style={{ marginTop: 20, borderTop: "1px solid var(--gold)", borderBottom: "1px solid var(--border)", padding: "12px 0", display: "grid", gap: 6 }}>
            <span className="mono" style={{ color: "var(--gold)", fontSize: 10, fontWeight: 800, letterSpacing: ".13em" }}>발표자 메모 · 읽지 않음</span>
            {step.cues.map((cue) => <div key={cue} style={{ color: "var(--text-soft)", fontSize: 13 }}>• {cue}</div>)}
          </aside>
        ) : null}

        <article aria-label="낭독 대본" style={{ marginTop: 26, fontSize: `${fontScale}rem`, lineHeight: 1.95, letterSpacing: "-.012em" }}>
          {step.script.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} style={{ margin: paragraphIndex === 0 ? 0 : "1.15em 0 0", color: "var(--text-strong)" }}>{paragraph}</p>
          ))}
        </article>

        <section className="mono" style={{ marginTop: 32, borderTop: "1px solid var(--border)", paddingTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 11, color: "var(--muted)" }}>
          <div>예상 누적<br /><strong style={{ color: "var(--text)", fontSize: 16 }}>{clock(targetBefore + step.durationSec)}</strong></div>
          <div style={{ textAlign: "right" }}>실제 전체<br /><strong style={{ color: "var(--text)", fontSize: 16 }}>{clock(totalElapsed)}</strong></div>
          <div>전체 목표<br /><strong style={{ color: "var(--text)", fontSize: 16 }}>{clock(totalTarget)}</strong></div>
          <div style={{ textAlign: "right" }}>현재 속도<br /><strong style={{ color: elapsed > step.durationSec ? "#ef4444" : "var(--text)", fontSize: 16 }}>{elapsed > step.durationSec ? `+${clock(elapsed - step.durationSec)}` : `-${clock(step.durationSec - elapsed)}`}</strong></div>
        </section>
      </div>

      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 30, borderTop: "1px solid var(--border)", background: "color-mix(in srgb, var(--bg) 94%, transparent)", backdropFilter: "blur(16px)", padding: "8px max(10px, env(safe-area-inset-right)) calc(8px + env(safe-area-inset-bottom)) max(10px, env(safe-area-inset-left))" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "44px 1fr 56px 44px", gap: 8 }}>
          <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0} aria-label="이전 단계" style={{ minHeight: 48, border: "1px solid var(--border)", borderRadius: 10, background: "var(--surface)", color: "var(--text)", fontSize: 20 }}>‹</button>
          <button type="button" onClick={() => setRunning((value) => !value)} style={{ minHeight: 48, border: 0, borderRadius: 10, background: running ? "var(--gold)" : "var(--accent)", color: "var(--ink)", fontWeight: 900, fontSize: 15 }}>{running ? "일시 정지" : elapsed > 0 ? "계속 연습" : "연습 시작"}</button>
          <button type="button" onClick={() => { setElapsed(0); setTotalElapsed(0); setRunning(false); }} style={{ minHeight: 48, border: "1px solid var(--border)", borderRadius: 10, background: "var(--surface)", color: "var(--text)", fontSize: 11, fontWeight: 800 }}>초기화</button>
          <button type="button" onClick={() => setIndex((value) => Math.min(steps.length - 1, value + 1))} disabled={index === steps.length - 1} aria-label="다음 단계" style={{ minHeight: 48, border: "1px solid var(--border)", borderRadius: 10, background: "var(--surface)", color: "var(--text)", fontSize: 20 }}>›</button>
        </div>
        <div style={{ maxWidth: 760, margin: "6px auto 0", display: "flex", justifyContent: "center", gap: 8 }}>
          <button type="button" onClick={() => setFontScale((value) => Math.max(.85, value - .1))} style={{ border: 0, background: "transparent", color: "var(--muted)", minHeight: 30 }}>글자 −</button>
          <button type="button" onClick={toggleWakeLock} style={{ border: 0, background: "transparent", color: wakeStatus.includes("켜짐") ? "var(--accent)" : "var(--muted)", minHeight: 30 }}>{wakeStatus}</button>
          <button type="button" onClick={() => setFontScale((value) => Math.min(1.5, value + .1))} style={{ border: 0, background: "transparent", color: "var(--muted)", minHeight: 30 }}>글자 +</button>
        </div>
      </div>
    </main>
  );
}
