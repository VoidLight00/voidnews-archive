import Link from "next/link";
import { getEditionList } from "@/lib/ab/data";

export const metadata = {
  title: "VoidNews — AB 멤버십 발표",
  description: "격주 AB 멤버십 발표 섹션. VIP 큐레이션에서 엄선한 핵심 브리핑.",
};

export default function ABIndexPage() {
  const list = getEditionList();

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--border)] px-6 py-10 md:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mono text-xs text-[var(--muted)] hover:text-[var(--accent)]"
          >
            ← VOIDNEWS
          </Link>
          <h1 className="mono mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            AB <span className="text-[var(--accent)]">BRIEFING</span>
          </h1>
          <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
            격주 멤버십 발표 섹션 · VIP 큐레이션에서 엄선한 한 페이지 브리핑
          </p>
        </div>
      </header>

      <section className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-5xl">
          {list.length === 0 ? (
            <p className="mono text-[var(--muted)]">발표 회차가 아직 없습니다.</p>
          ) : (
            <ul className="space-y-4">
              {list.map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/ab/${e.slug}`}
                    className="block border border-[var(--border)] bg-[var(--card)] p-6 transition hover:border-[var(--accent)] hover:bg-[var(--card-hover)]"
                  >
                    <div className="mono flex items-center gap-3 text-xs text-[var(--muted)]">
                      <span className="rounded-sm bg-[var(--accent)] px-2 py-0.5 text-[var(--bg)]">
                        VOL. {String(e.volume).padStart(2, "0")}
                      </span>
                      <span>{e.slug}</span>
                      <span>·</span>
                      <span>{e.period}</span>
                      <span>·</span>
                      <span>{e.highlightCount} HIGHLIGHTS</span>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold md:text-2xl">
                      {e.title}
                    </h2>
                    <p className="mono mt-2 text-xs text-[var(--dim)]">
                      발표일 · {e.announceDate}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
