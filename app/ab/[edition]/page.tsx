import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEditionSlugs, getEdition } from "@/lib/ab/data";
import type { ABHighlight, ABEditorPick } from "@/lib/ab/data";

export async function generateStaticParams() {
  return getAllEditionSlugs().map((edition) => ({ edition }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition } = await params;
  const data = getEdition(edition);
  if (!data) return {};
  return {
    title: `VoidNews AB — ${data.title} (${data.slug})`,
    description: `${data.theme} · ${data.highlights.length}개 엄선 · 발표일 ${data.announceDate}`,
  };
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition } = await params;
  const data = getEdition(edition);
  if (!data) notFound();

  const hero = data.highlights.find((h) => h.tier === "hero");
  const features = data.highlights.filter((h) => h.tier === "feature");
  const normals = data.highlights.filter((h) => h.tier === "normal");

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* ───── Header ───── */}
      <header className="border-b border-[var(--border)] px-6 py-10 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mono flex items-center gap-3 text-xs text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--accent)]">
              VOIDNEWS
            </Link>
            <span>/</span>
            <Link href="/ab" className="hover:text-[var(--accent)]">
              AB BRIEFING
            </Link>
            <span>/</span>
            <span className="text-[var(--text)]">{data.slug}</span>
          </div>

          <div className="mono mt-8 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-sm bg-[var(--accent)] px-2 py-0.5 text-[var(--bg)]">
              VOL. {String(data.volume).padStart(2, "0")}
            </span>
            <span className="text-[var(--muted)]">{data.period}</span>
            <span className="text-[var(--dim)]">·</span>
            <span className="text-[var(--muted)]">
              발표일 {data.announceDate}
            </span>
            <span className="text-[var(--dim)]">·</span>
            <span className="text-[var(--muted)]">
              {data.highlights.length} HIGHLIGHTS
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-6xl">
            {data.title}
          </h1>
          <p className="mono mt-3 text-sm text-[var(--muted)] md:text-base">
            {data.theme}
          </p>
        </div>
      </header>

      {/* ───── Intro ───── */}
      <section className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mono text-xs uppercase tracking-widest text-[var(--accent)]">
            ▾ Opening
          </div>
          <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed md:text-lg">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ───── Hero ───── */}
      {hero && (
        <section className="px-6 py-8 md:px-12">
          <div className="mx-auto max-w-5xl">
            <HeroCard item={hero} />
          </div>
        </section>
      )}

      {/* ───── Features (2개) ───── */}
      {features.length > 0 && (
        <section className="px-6 py-8 md:px-12">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {features.map((h) => (
              <FeatureCard key={h.rank} item={h} />
            ))}
          </div>
        </section>
      )}

      {/* ───── Normal (나머지) ───── */}
      {normals.length > 0 && (
        <section className="px-6 py-8 md:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="mono mb-4 text-xs uppercase tracking-widest text-[var(--muted)]">
              ▾ More Highlights
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {normals.map((h) => (
                <NormalCard key={h.rank} item={h} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── Editor's Pick ───── */}
      {data.editorsPicks && data.editorsPicks.length > 0 && (
        <section className="px-6 py-12 md:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 border-t border-[var(--border2)] pt-8">
              <div className="mono text-xs uppercase tracking-widest text-[var(--gold)]">
                🛠 Editor&apos;s Pick
              </div>
              <h2 className="mono mt-2 text-xl font-semibold text-[var(--text)] md:text-2xl">
                VoidLight 엄선 — 직접 써본 도구·자료
              </h2>
              <p className="mono mt-1 text-xs text-[var(--muted)]">
                VIP 트윗 트랙과 별개로, 큐레이터가 직접 검증한 인프라/도구
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {data.editorsPicks.map((pick, i) => (
                <EditorPickCard key={i} item={pick} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── Closing ───── */}
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl border-t border-[var(--border)] pt-12">
          <div className="mono text-xs uppercase tracking-widest text-[var(--accent)]">
            ▾ Closing
          </div>
          <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed md:text-lg">
            {data.closing}
          </p>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t border-[var(--border)] px-6 py-10 md:px-12">
        <div className="mono mx-auto flex max-w-5xl flex-col gap-3 text-xs text-[var(--muted)] md:flex-row md:justify-between">
          <div>
            커버 주차: {data.coveredWeeks.map((w) => (
              <Link key={w} href={`/${w}`} className="mx-1 underline hover:text-[var(--accent)]">
                {w}
              </Link>
            ))}
          </div>
          <div>
            <Link href="/ab" className="hover:text-[var(--accent)]">
              ← AB 발표 목록
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ════════════════════════════════════════════════════════════
   카드 컴포넌트
═══════════════════════════════════════════════════════════════ */

function RankBadge({ rank, tier }: { rank: number; tier: string }) {
  const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
  return (
    <span className="mono inline-flex items-center gap-2 text-xs text-[var(--muted)]">
      {medal && <span className="text-lg">{medal}</span>}
      <span className="rounded-sm border border-[var(--border2)] px-2 py-0.5">
        #{String(rank).padStart(2, "0")}
      </span>
      <span className="uppercase tracking-widest text-[var(--dim)]">{tier}</span>
    </span>
  );
}

function CompanyTag({ name }: { name: string }) {
  return (
    <span className="mono text-xs text-[var(--muted)]">
      {name}
    </span>
  );
}

function HeroCard({ item }: { item: ABHighlight }) {
  return (
    <article className="border-2 border-[var(--accent)] bg-[var(--card)] p-8 md:p-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <RankBadge rank={item.rank} tier={item.tier} />
        <CompanyTag name={item.sourceCompany} />
      </div>

      <h2 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
        {item.post.title}
      </h2>

      {item.keyQuote && (
        <blockquote className="mono mt-6 border-l-4 border-[var(--accent)] pl-4 text-base italic text-[var(--text)] md:text-xl">
          &ldquo;{item.keyQuote}&rdquo;
        </blockquote>
      )}

      <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)] md:text-base">
        {item.post.content}
      </p>

      {item.editorial && (
        <aside className="mt-8 border-t border-[var(--border)] pt-6">
          <div className="mono mb-2 text-xs uppercase tracking-widest text-[var(--accent)]">
            ▾ Editor&apos;s Note
          </div>
          <p className="text-sm leading-relaxed text-[var(--muted)] md:text-base">
            {item.editorial}
          </p>
        </aside>
      )}

      <div className="mono mt-8 flex flex-wrap items-center gap-4 text-xs">
        {item.post.tags?.map((tag) => (
          <span key={tag} className="text-[var(--dim)]">
            #{tag}
          </span>
        ))}
        <a
          href={item.post.officialUrl || item.post.source}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[var(--accent)] hover:underline"
        >
          원문 →
        </a>
      </div>
    </article>
  );
}

function FeatureCard({ item }: { item: ABHighlight }) {
  return (
    <article className="flex flex-col border border-[var(--border)] bg-[var(--card)] p-6 transition hover:border-[var(--accent)]">
      <div className="flex items-center justify-between gap-3">
        <RankBadge rank={item.rank} tier={item.tier} />
        <CompanyTag name={item.sourceCompany} />
      </div>

      <h3 className="mt-4 text-xl font-semibold leading-tight md:text-2xl">
        {item.post.title}
      </h3>

      {item.keyQuote && (
        <blockquote className="mono mt-4 border-l-2 border-[var(--accent)] pl-3 text-sm italic text-[var(--muted)]">
          &ldquo;{item.keyQuote}&rdquo;
        </blockquote>
      )}

      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]">
        {item.post.content}
      </p>

      {item.editorial && (
        <aside className="mt-4 border-t border-[var(--border)] pt-4">
          <p className="text-xs leading-relaxed text-[var(--muted)]">
            {item.editorial}
          </p>
        </aside>
      )}

      <div className="mono mt-auto flex flex-wrap items-center gap-3 pt-4 text-xs">
        {item.post.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[var(--dim)]">
            #{tag}
          </span>
        ))}
        <a
          href={item.post.officialUrl || item.post.source}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[var(--accent)] hover:underline"
        >
          원문 →
        </a>
      </div>
    </article>
  );
}

function EditorPickCard({ item }: { item: ABEditorPick }) {
  return (
    <article className="flex flex-col border-l-4 border-[var(--gold)] border-y border-r border-[var(--border)] bg-[var(--card)] p-6 transition hover:bg-[var(--card-hover)]">
      <div className="mono flex items-center gap-2 text-xs">
        <span className="rounded-sm bg-[var(--gold)] px-2 py-0.5 text-[var(--bg)]">
          🛠 PICK
        </span>
        <span className="text-[var(--muted)]">{item.category}</span>
      </div>

      <h3 className="mt-4 text-xl font-bold leading-tight md:text-2xl">
        {item.title}
      </h3>
      {item.subtitle && (
        <p className="mono mt-1 text-sm text-[var(--muted)]">{item.subtitle}</p>
      )}

      <p className="mono mt-4 border-l-2 border-[var(--gold)] pl-3 text-sm text-[var(--text)]">
        {item.summary}
      </p>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]">
        {item.body}
      </p>

      {item.editorial && (
        <aside className="mt-4 border-t border-[var(--border)] pt-4">
          <div className="mono mb-2 text-xs uppercase tracking-widest text-[var(--gold)]">
            ▾ Editor&apos;s Note
          </div>
          <p className="text-xs leading-relaxed text-[var(--muted)] md:text-sm">
            {item.editorial}
          </p>
        </aside>
      )}

      <div className="mono mt-auto flex flex-wrap items-center gap-3 pt-4 text-xs">
        {item.tags?.slice(0, 5).map((tag) => (
          <span key={tag} className="text-[var(--dim)]">
            #{tag}
          </span>
        ))}
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto rounded-sm bg-[var(--gold)] px-3 py-1 text-[var(--bg)] hover:opacity-90"
        >
          {item.sourceLabel || "시작하기 →"}
        </a>
      </div>
    </article>
  );
}

function NormalCard({ item }: { item: ABHighlight }) {
  return (
    <article className="flex flex-col border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--accent)]">
      <div className="flex items-center justify-between gap-3">
        <RankBadge rank={item.rank} tier={item.tier} />
        <CompanyTag name={item.sourceCompany} />
      </div>

      <h3 className="mt-3 text-base font-semibold leading-snug md:text-lg">
        {item.post.title}
      </h3>

      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[var(--muted)]">
        {item.post.content}
      </p>

      {item.editorial && (
        <aside className="mt-3 border-t border-[var(--border)] pt-3">
          <p className="text-xs leading-relaxed text-[var(--dim)]">
            {item.editorial}
          </p>
        </aside>
      )}

      <div className="mono mt-auto flex flex-wrap items-center gap-2 pt-3 text-xs">
        {item.post.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[var(--dim)]">
            #{tag}
          </span>
        ))}
        <a
          href={item.post.officialUrl || item.post.source}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[var(--accent)] hover:underline"
        >
          원문 →
        </a>
      </div>
    </article>
  );
}
