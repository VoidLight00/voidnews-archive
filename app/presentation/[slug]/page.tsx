import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getWeek } from "@/lib/data";
import type { Post } from "@/lib/data";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getWeek(slug);
  if (!data) return {};
  return {
    title: `발표용 하이라이트 — Week ${data.week} (${data.period})`,
    description: `AI & Beyond 격주 발표 큐레이션 ${data.period}`,
  };
}

type FeaturedEntry = { company: string; color: string; post: Post };

function formatTag(tag: string): string {
  return tag;
}

function stripInlineMarkdown(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1");
}

function renderRichText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*\n]+?\*\*)/g);

  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-extrabold text-neutral-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default async function PresentationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getWeek(slug);
  if (!data) notFound();

  const featured: FeaturedEntry[] = [];
  for (const company of data.companies) {
    for (const post of company.posts) {
      if (post.featured) {
        featured.push({ company: company.name, color: company.color, post });
      }
    }
  }

  if (featured.length === 0) {
    return (
      <main className="min-h-dvh bg-neutral-950 text-neutral-100 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">발표용 featured 항목이 없습니다</h1>
          <p className="text-neutral-400">
            lib/weeks/{slug}.ts 의 Post에 <code className="text-amber-300">featured: true</code>를
            추가하세요.
          </p>
          <Link
            href={`/${slug}`}
            className="inline-block mt-4 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700"
          >
            ← 주간 아카이브로
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-neutral-950 text-neutral-100 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-500 mb-3">
            <span>AI &amp; Beyond · Week {data.week}</span>
            <Link
              href={`/${slug}`}
              className="text-neutral-400 hover:text-neutral-200 normal-case tracking-normal"
            >
              전체 아카이브 →
            </Link>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
            목요일 발표 큐레이션
          </h1>
          <p className="mt-2 text-lg text-neutral-400">
            {data.period} · Top {featured.length}개 · 공식 출처 교차검증 완료
          </p>
        </header>

        {/* Featured Cards */}
        <section className="space-y-5">
          {featured.map(({ company, color, post }, idx) => (
            <article
              key={post.title}
              className="group relative rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 lg:p-8 hover:border-neutral-700 transition"
            >
              {/* Accent bar */}
              <div
                className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full"
                style={{ backgroundColor: color }}
                aria-hidden
              />

              <div className="flex items-start justify-between gap-6 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-neutral-900"
                    style={{ backgroundColor: color }}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className="font-medium tracking-tight"
                    style={{ color }}
                  >
                    {company}
                  </span>
                  <span className="text-neutral-600">·</span>
                  <time className="text-neutral-500 font-mono text-xs">{post.date}</time>
                </div>
              </div>

              <h2 className="text-xl lg:text-2xl font-semibold leading-snug mb-3">
                {post.title}
              </h2>

              {post.summary && (
                <p className="text-neutral-300 leading-relaxed mb-5">
                  {stripInlineMarkdown(post.summary)}
                </p>
              )}

              {post.thumbnail && (
                <figure className="mb-5 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
                  <img
                    src={post.thumbnail.src}
                    alt={post.thumbnail.alt}
                    loading="lazy"
                    className="block w-full aspect-video object-cover"
                  />
                  {post.thumbnail.caption && (
                    <figcaption className="border-t border-neutral-800 px-4 py-2 text-xs leading-relaxed text-neutral-400">
                      {stripInlineMarkdown(post.thumbnail.caption)}
                    </figcaption>
                  )}
                </figure>
              )}

              {post.content && (
                <div className="mb-5 rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 text-sm leading-7 text-neutral-300 whitespace-pre-line">
                  {renderRichText(post.content)}
                </div>
              )}

              {post.images && post.images.length > 0 && (
                <div className="mb-5 grid gap-3 md:grid-cols-2">
                  {post.images.map((image) => (
                    <figure key={image.src} className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="block w-full aspect-video object-cover"
                      />
                      {image.caption && (
                        <figcaption className="border-t border-neutral-800 px-3 py-2 text-xs leading-relaxed text-neutral-400">
                          {stripInlineMarkdown(image.caption)}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 mb-3">
                {post.officialUrl && (
                  <a
                    href={post.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-100 text-neutral-900 text-sm font-medium hover:bg-white transition"
                  >
                    공식 링크
                    <span aria-hidden>↗</span>
                  </a>
                )}
                {post.backupUrls?.map(({ label, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 text-neutral-100 text-sm font-medium hover:bg-neutral-700 border border-neutral-700 transition"
                  >
                    {label}
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs text-neutral-400 bg-neutral-900 border border-neutral-800"
                    >
                      {formatTag(tag)}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>

        {/* Footer nav */}
        <footer className="mt-16 pt-8 border-t border-neutral-900 flex items-center justify-between text-sm">
          <Link href={`/${slug}`} className="text-neutral-500 hover:text-neutral-300">
            ← 전체 {data.totalPosts}건 아카이브
          </Link>
          <span className="text-neutral-600 text-xs">
            VoidNews · Thursday Briefing
          </span>
        </footer>
      </div>
    </main>
  );
}
