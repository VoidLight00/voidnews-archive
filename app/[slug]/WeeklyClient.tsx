"use client";

import {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { Company, Post, WeeklyData } from "@/lib/data";
import { useLocale } from "@/app/LocaleProvider";
import { weekDateLabel, type WeekListItem } from "@/lib/week-label";
import { stripMarkdown } from "@/lib/md";
import {
  BOOKMARKS_STORAGE_KEY, RECENT_SEARCHES_STORAGE_KEY, SORT_ORDER_STORAGE_KEY,
  STATS_ACTION_STORAGE_KEY, VIEW_MODE_STORAGE_KEY,
  buildUrlWithParams, getCompanySectionId, getPostLink, getReadStorageKey,
  highlightText, parsePostDate, renderIntelBar, upsertRecentSearches,
  type ModalNavigation, type SelectedPostState, type SortOrder,
  type StatsActionMode, type ViewDensity,
} from "./weekly/shared";
import { PostModal } from "./weekly/PostModal";
import { CompanySection } from "./weekly/CompanySection";
import { StatsBar } from "./weekly/StatsBar";
import {
  ChronologicalFeed, TopStoriesSection, getPostSortTime,
  type FeedStoryEntry, type TopStoryEntry,
} from "./weekly/feed";
import { WeekDropdown } from "./weekly/WeekDropdown";

// ── 메인 컴포넌트 ────────────────────────────────
export default function WeeklyClient({
  data,
  prevWeek,
  nextWeek,
  latestWeek,
  // 서버에서 계산해 내려주는 주차 목록 — 클라이언트가 lib/data(전체 아카이브)를 번들에 싣지 않게 한다
  weekList,
  // editorial nested route 옵션 — 카드 클릭 시 모달 대신 `${nestedRoutePrefix}/${post.slug}/` 풀 페이지 이동
  nestedRoutePrefix,
}: {
  data: WeeklyData;
  prevWeek?: { slug: string; week: number; period: string };
  nextWeek?: { slug: string; week: number; period: string };
  latestWeek: { slug: string; week: number; period: string };
  weekList: WeekListItem[];
  nestedRoutePrefix?: string;
}) {
  const { t } = useLocale();
  const [selectedPost, setSelectedPost] = useState<SelectedPostState | null>(null);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [bookmarkFilter, setBookmarkFilter] = useState(false);
  const [hideReadFilter, setHideReadFilter] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [readPosts, setReadPosts] = useState<string[]>([]);
  const [collapsedCompanies, setCollapsedCompanies] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [bookmarksCopied, setBookmarksCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [viewDensity, setViewDensity] = useState<ViewDensity>("comfortable");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [statsActionMode, setStatsActionMode] = useState<StatsActionMode>("filter");
  const urlReadyRef = useRef(false);
  const pendingPostFromUrlRef = useRef<string | null>(null);
  const searchBlurTimeoutRef = useRef<number | null>(null);

  const companiesByName = useMemo(() => {
    return new Map(data.companies.map((company) => [company.name, company]));
  }, [data.companies]);

  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks]);
  const readSet = useMemo(() => new Set(readPosts), [readPosts]);
  const collapsedSet = useMemo(() => new Set(collapsedCompanies), [collapsedCompanies]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {}

    try {
      const storedRecentSearches = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
      if (storedRecentSearches) setRecentSearches(JSON.parse(storedRecentSearches));
    } catch {}

    try {
      const storedViewDensity = localStorage.getItem(VIEW_MODE_STORAGE_KEY) as ViewDensity | null;
      if (storedViewDensity === "compact" || storedViewDensity === "comfortable") setViewDensity(storedViewDensity);
    } catch {}

    try {
      const storedSortOrder = localStorage.getItem(SORT_ORDER_STORAGE_KEY) as SortOrder | null;
      if (storedSortOrder === "latest" || storedSortOrder === "oldest" || storedSortOrder === "company") {
        setSortOrder(storedSortOrder);
      }
    } catch {}

    try {
      const storedStatsAction = localStorage.getItem(STATS_ACTION_STORAGE_KEY) as StatsActionMode | null;
      if (storedStatsAction === "filter" || storedStatsAction === "scroll") setStatsActionMode(storedStatsAction);
    } catch {}

    try {
      const storedReadPosts = data.companies.flatMap((company) =>
        company.posts
          .filter((post) => localStorage.getItem(getReadStorageKey(post.title)))
          .map((post) => post.title)
      );
      setReadPosts(storedReadPosts);
    } catch {}

    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") ?? "";
    const initialPost = params.get("post");

    if (initialQuery) setSearch(initialQuery);
    if (initialPost) pendingPostFromUrlRef.current = initialPost;
    urlReadyRef.current = true;
  }, [data.companies]);

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewDensity);
    } catch {}
  }, [viewDensity]);

  useEffect(() => {
    try {
      localStorage.setItem(SORT_ORDER_STORAGE_KEY, sortOrder);
    } catch {}
  }, [sortOrder]);

  useEffect(() => {
    try {
      localStorage.setItem(STATS_ACTION_STORAGE_KEY, statsActionMode);
    } catch {}
  }, [statsActionMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (search.trim().length < 3) return;

    const timeoutId = window.setTimeout(() => {
      setRecentSearches((prev) => {
        const next = upsertRecentSearches(prev, search);
        try {
          localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    return () => {
      if (searchBlurTimeoutRef.current) {
        window.clearTimeout(searchBlurTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const pendingTitle = pendingPostFromUrlRef.current;
    if (!pendingTitle) return;

    for (const company of data.companies) {
      const post = company.posts.find((item) => item.title === pendingTitle);
      if (post) {
        setSelectedPost({ companyName: company.name, title: post.title });
        pendingPostFromUrlRef.current = null;
        return;
      }
    }

    pendingPostFromUrlRef.current = null;
  }, [data.companies]);

  const syncUrlState = useCallback((nextSearch: string, nextSelectedPost: SelectedPostState | null) => {
    if (typeof window === "undefined" || !urlReadyRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const trimmedSearch = nextSearch.trim();

    if (trimmedSearch) {
      params.set("q", trimmedSearch);
    } else {
      params.delete("q");
    }

    if (nextSelectedPost?.title) {
      params.set("post", nextSelectedPost.title);
    } else {
      params.delete("post");
    }

    const nextUrl = buildUrlWithParams(window.location.pathname, params);
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (nextUrl !== currentUrl) {
      window.history.pushState({}, "", nextUrl);
    }
  }, []);

  useEffect(() => {
    syncUrlState(search, selectedPost);
  }, [search, selectedPost, syncUrlState]);

  const markAsRead = useCallback((title: string) => {
    setReadPosts((prev) => {
      if (prev.includes(title)) return prev;
      const next = [...prev, title];
      try {
        localStorage.setItem(getReadStorageKey(title), "1");
      } catch {}
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((title: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title];
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const openPost = useCallback(
    (post: Post, companyName: string) => {
      markAsRead(post.title);
      // nested route 분기 — slug + prefix 있으면 모달 대신 풀 페이지로 이동
      if (nestedRoutePrefix && post.slug && typeof window !== "undefined") {
        window.location.href = `${nestedRoutePrefix.replace(/\/$/, "")}/${post.slug}/`;
        return;
      }
      setSelectedPost({ companyName, title: post.title });
    },
    [markAsRead, nestedRoutePrefix]
  );

  const toggleCompanyCollapsed = useCallback((companyName: string) => {
    setCollapsedCompanies((prev) =>
      prev.includes(companyName) ? prev.filter((item) => item !== companyName) : [...prev, companyName]
    );
  }, []);

  const saveRecentSearch = useCallback((query: string) => {
    if (query.trim().length < 1) return;
    setRecentSearches((prev) => {
      const next = upsertRecentSearches(prev, query);
      try {
        localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const removeRecentSearch = useCallback((query: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((item) => item !== query);
      try {
        localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      const inInput = active?.tagName === "INPUT" || active?.tagName === "TEXTAREA";

      if (e.key === "Escape") {
        setSelectedPost(null);
        return;
      }

      if (e.key === "/" && !inInput) {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
        return;
      }

      if (selectedPost && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        const company = companiesByName.get(selectedPost.companyName);
        const visibleCompany = filteredCompaniesRef.current.find((item) => item.name === selectedPost.companyName);
        const posts = visibleCompany?.posts ?? company?.posts ?? [];
        const currentIndex = posts.findIndex((post) => post.title === selectedPost.title);
        if (currentIndex === -1) return;

        if (e.key === "ArrowLeft" && currentIndex > 0) {
          const prevPost = posts[currentIndex - 1];
          markAsRead(prevPost.title);
          setSelectedPost({ companyName: selectedPost.companyName, title: prevPost.title });
        }

        if (e.key === "ArrowRight" && currentIndex < posts.length - 1) {
          const nextPost = posts[currentIndex + 1];
          markAsRead(nextPost.title);
          setSelectedPost({ companyName: selectedPost.companyName, title: nextPost.title });
        }
        return;
      }

      if (inInput) return;

      if (e.key === "ArrowLeft" && prevWeek) {
        window.location.href = `/${prevWeek.slug}`;
      } else if (e.key === "ArrowRight" && nextWeek) {
        window.location.href = `/${nextWeek.slug}`;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [companiesByName, markAsRead, nextWeek, prevWeek, selectedPost]);

  const filteredCompanies = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    const getCompanySortValue = (company: Company, mode: SortOrder) => {
      const timestamps = company.posts
        .map((post) => parsePostDate(post.date, data.year)?.getTime() ?? null)
        .filter((value): value is number => value !== null);

      if (timestamps.length === 0) return 0;
      return mode === "oldest" ? Math.min(...timestamps) : Math.max(...timestamps);
    };

    return data.companies
      .map((company) => ({
        ...company,
        posts: company.posts.filter((post) => {
          const matchSearch =
            !query ||
            post.title.toLowerCase().includes(query) ||
            (post.summary || "").toLowerCase().includes(query) ||
            (post.content || "").toLowerCase().includes(query) ||
            (post.en?.title || "").toLowerCase().includes(query) ||
            (post.en?.summary || "").toLowerCase().includes(query);
          const matchPlatform =
            platformFilter === "all" || post.platform === platformFilter || post.platform.includes(platformFilter);
          const matchBookmark = !bookmarkFilter || bookmarkSet.has(post.title);
          const matchRead = !hideReadFilter || !readSet.has(post.title);
          return matchSearch && matchPlatform && matchBookmark && matchRead;
        }),
      }))
      .filter((company) => {
        if (companyFilter !== "all" && company.name !== companyFilter) return false;
        return company.posts.length > 0;
      })
      .sort((a, b) => {
        if (sortOrder === "company") {
          return a.name.localeCompare(b.name, "ko");
        }

        const aValue = getCompanySortValue(a, sortOrder);
        const bValue = getCompanySortValue(b, sortOrder);
        const diff = sortOrder === "oldest" ? aValue - bValue : bValue - aValue;
        return diff || a.name.localeCompare(b.name, "ko");
      });
  }, [
    bookmarkFilter,
    bookmarkSet,
    companyFilter,
    data.companies,
    data.year,
    deferredSearch,
    hideReadFilter,
    platformFilter,
    readSet,
    sortOrder,
  ]);

  const filteredCompaniesRef = useRef<Company[]>(filteredCompanies);
  useEffect(() => {
    filteredCompaniesRef.current = filteredCompanies;
  }, [filteredCompanies]);

  const selectedCompany = selectedPost ? companiesByName.get(selectedPost.companyName) ?? null : null;
  const selectedPostData = selectedCompany?.posts.find((post) => post.title === selectedPost?.title) ?? null;
  const isLatestWeek = data.slug === latestWeek.slug;

  const modalNavigation = useMemo<ModalNavigation>(() => {
    if (!selectedPost) {
      return {
        hasPrev: false,
        hasNext: false,
        onPrev: () => {},
        onNext: () => {},
        positionLabel: "",
      };
    }

    const visibleCompany = filteredCompanies.find((company) => company.name === selectedPost.companyName);
    const sourceCompany = visibleCompany ?? companiesByName.get(selectedPost.companyName) ?? null;
    const posts = sourceCompany?.posts ?? [];
    const currentIndex = posts.findIndex((post) => post.title === selectedPost.title);
    const total = posts.length;

    return {
      hasPrev: currentIndex > 0,
      hasNext: currentIndex >= 0 && currentIndex < total - 1,
      onPrev: () => {
        if (currentIndex <= 0) return;
        const prevPost = posts[currentIndex - 1];
        markAsRead(prevPost.title);
        setSelectedPost({ companyName: selectedPost.companyName, title: prevPost.title });
      },
      onNext: () => {
        if (currentIndex === -1 || currentIndex >= total - 1) return;
        const nextPost = posts[currentIndex + 1];
        markAsRead(nextPost.title);
        setSelectedPost({ companyName: selectedPost.companyName, title: nextPost.title });
      },
      positionLabel: currentIndex >= 0 && total > 0 ? `${currentIndex + 1} / ${total}` : "현재 필터 밖 포스팅",
    };
  }, [companiesByName, filteredCompanies, markAsRead, selectedPost]);

  const totalFiltered = filteredCompanies.reduce((sum, company) => sum + company.posts.length, 0);
  const visibleCompanyNames = filteredCompanies.map((company) => company.name);
  const isFiltering =
    search.trim().length > 0 || platformFilter !== "all" || companyFilter !== "all" || bookmarkFilter || hideReadFilter;
  const companyStartIndex = useMemo(() => {
    let running = 1;
    return new Map(
      filteredCompanies.map((company) => {
        const start = running;
        running += company.posts.length;
        return [company.name, start];
      })
    );
  }, [filteredCompanies]);
  const readFilteredCount = filteredCompanies.reduce(
    (sum, company) => sum + company.posts.filter((post) => readSet.has(post.title)).length,
    0
  );
  const readProgressBar = renderIntelBar(readFilteredCount, Math.max(totalFiltered, 1));
  const topStories = useMemo<TopStoryEntry[]>(() => {
    const sourceCompanies = isFiltering ? filteredCompanies : data.companies;
    const entries = sourceCompanies.flatMap((company) =>
      company.posts.map((post) => ({ company, post }))
    );

    return [
      ...entries.filter((entry) => entry.post.featured),
      ...entries.filter((entry) => !entry.post.featured),
    ]
      .slice(0, 3)
      .map((entry, index) => ({
        company: entry.company,
        post: entry.post,
        issueIndex: index + 1,
      }));
  }, [data.companies, filteredCompanies, isFiltering]);
  const feedStories = useMemo<FeedStoryEntry[]>(() => {
    const featuredTitles = new Set(topStories.map((entry) => entry.post.title));
    const entries = filteredCompanies.flatMap((company) =>
      company.posts
        .filter((post) => !featuredTitles.has(post.title))
        .map((post) => ({ company, post }))
    );

    return entries
      .sort((a, b) => {
        if (sortOrder === "company") {
          const companyDiff = a.company.name.localeCompare(b.company.name, "ko");
          if (companyDiff !== 0) return companyDiff;
        }

        const aTime = getPostSortTime(a.post, data.year);
        const bTime = getPostSortTime(b.post, data.year);
        const diff = sortOrder === "oldest" ? aTime - bTime : bTime - aTime;
        return diff || a.post.title.localeCompare(b.post.title, "ko");
      })
      .map((entry, index) => ({
        company: entry.company,
        post: entry.post,
        issueIndex: index + 1,
      }));
  }, [data.year, filteredCompanies, sortOrder, topStories]);

  const exportBookmarks = useCallback(() => {
    const grouped = data.companies
      .map((company) => ({
        company,
        posts: company.posts.filter((post) => bookmarkSet.has(post.title)),
      }))
      .filter((entry) => entry.posts.length > 0);

    if (grouped.length === 0) return;

    const markdown = [
      "# VoidNews 북마크",
      "",
      ...grouped.flatMap(({ company, posts }) => [
        `## ${company.name}`,
        ...posts.flatMap((post) => [
          `- **${post.title}** (${post.date})`,
          `  ${post.summary || post.content?.split("\n")[0] || "요약 없음"}`,
          `  링크: ${post.source || post.xUrl || post.threadsUrl || getPostLink(post.title)}`,
          "",
        ]),
      ]),
    ].join("\n");

    navigator.clipboard.writeText(markdown).then(() => {
      setBookmarksCopied(true);
      window.setTimeout(() => setBookmarksCopied(false), 1600);
    });
  }, [bookmarkSet, data.companies]);

  const scrollToCompany = useCallback((companyName: string) => {
    const section = document.getElementById(getCompanySectionId(companyName));
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {selectedPostData && selectedCompany && (
        <PostModal
          post={selectedPostData}
          defaultYear={data.year}
          companyColor={selectedCompany.color}
          bookmarked={bookmarkSet.has(selectedPostData.title)}
          onToggleBookmark={() => toggleBookmark(selectedPostData.title)}
          onClose={() => setSelectedPost(null)}
          navigation={modalNavigation}
        />
      )}

      <main
        data-card-density={viewDensity}
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "40px clamp(16px, 3vw, 32px) 96px",
        }}
      >
        <section className="tc-issue-strip" aria-label="호 이동">
          <div className="tc-issue-meta mono">
            <span>VoidNews Weekly</span>
            <span aria-hidden>·</span>
            <span>{data.year}년 {weekDateLabel(data.period)}</span>
            <span aria-hidden>·</span>
            <span>{data.period}</span>
            <span aria-hidden>·</span>
            <span>{String(data.totalPosts).padStart(2, "0")} posts</span>
          </div>

          <div className="tc-issue-actions">
            {isLatestWeek ? (
              <span className="tc-current-pill mono">이번 호</span>
            ) : (
              <a href={`/${latestWeek.slug}`} className="tc-current-link mono">
                최신 · {weekDateLabel(latestWeek.period)}
              </a>
            )}
            {prevWeek ? (
              <a href={`/${prevWeek.slug}`} className="tc-week-link mono" title="이전 주차 (←)">
                ← {weekDateLabel(prevWeek.period)}
              </a>
            ) : null}
            <WeekDropdown currentSlug={data.slug} currentWeek={data.week} weekList={weekList} />
            {nextWeek ? (
              <a href={`/${nextWeek.slug}`} className="tc-week-link mono" title="다음 주차 (→)">
                {weekDateLabel(nextWeek.period)} →
              </a>
            ) : null}
          </div>
        </section>

        <TopStoriesSection
          stories={topStories}
          issueSlug={data.slug}
          onOpenStory={openPost}
        />


        <div className="tc-progress-row" aria-label="읽기 진행도">
          <div className="mono">
            <span>읽기 진행도</span>
            <span aria-hidden>//</span>
            <strong>{readFilteredCount} / {totalFiltered}</strong>
          </div>
          <p className="mono">[{readProgressBar}]</p>
        </div>

        <div
          style={{
            position: "sticky",
            top: 64,
            zIndex: 40,
            background: "var(--header-bg)",
            padding: "14px 16px",
            marginBottom: 32,
            border: "1px solid var(--border)",
            borderRadius: 2,
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: "1 1 280px", minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    padding: "10px 12px",
                  }}
                >
                  <span style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: 14, flexShrink: 0 }}>{">"}</span>
                  <input
                    id="search-input"
                    type="text"
                    placeholder={t("common.search")}
                    value={search}
                    onFocus={() => {
                      if (searchBlurTimeoutRef.current) window.clearTimeout(searchBlurTimeoutRef.current);
                      setShowRecentSearches(true);
                    }}
                    onBlur={() => {
                      searchBlurTimeoutRef.current = window.setTimeout(() => setShowRecentSearches(false), 120);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveRecentSearch(search);
                    }}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      startTransition(() => {
                        setSearch(nextValue);
                      });
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--text)",
                      fontSize: 13,
                      outline: "none",
                      width: "100%",
                      fontFamily: "var(--mono)",
                      letterSpacing: "0.04em",
                    }}
                  />
                </div>
                {showRecentSearches && recentSearches.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      right: 0,
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 2,
                      padding: 8,
                      zIndex: 30,
                      boxShadow: "0 16px 40px rgba(0,0,0,0.28)",
                    }}
                  >
                    <p style={{ fontSize: 11, color: "var(--muted)", margin: "2px 6px 8px", fontFamily: "var(--mono)" }}>최근 검색어</p>
                    {[...recentSearches].reverse().slice(0, 3).map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                          borderRadius: 8,
                        }}
                      >
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            if (searchBlurTimeoutRef.current) window.clearTimeout(searchBlurTimeoutRef.current);
                            setSearch(item);
                            setShowRecentSearches(false);
                          }}
                          style={{
                            flex: 1,
                            textAlign: "left",
                            background: "transparent",
                            border: "none",
                            color: "var(--text)",
                            padding: "10px 8px",
                            cursor: "pointer",
                            fontSize: 12,
                            fontFamily: "var(--mono)",
                          }}
                        >
                          {item}
                        </button>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => removeRecentSearch(item)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--muted)",
                            cursor: "pointer",
                            fontSize: 14,
                            padding: "6px 8px",
                            lineHeight: 1,
                          }}
                          title="최근 검색어 삭제"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0, flexWrap: "wrap" }}>
                <button
                  onClick={() => setViewDensity((prev) => (prev === "comfortable" ? "compact" : "comfortable"))}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "10px 12px",
                    borderRadius: 2,
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    color: "var(--text)",
                    cursor: "pointer",
                    minWidth: 82,
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.06em",
                  }}
                  title={viewDensity === "comfortable" ? "작은 카드 보기" : "기본 카드 보기"}
                >
                  {viewDensity === "comfortable" ? "축약" : "기본"}
                </button>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                    padding: "10px 12px",
                    color: "var(--text)",
                    fontSize: 11,
                    fontWeight: 600,
                    outline: "none",
                    cursor: "pointer",
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                  aria-label="정렬"
                >
                  <option value="latest">최신</option>
                  <option value="oldest">오래된</option>
                  <option value="company">회사</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {["all", "X", "Threads"].map((platform) => (
                <button
                  key={platform}
                  onClick={() => setPlatformFilter(platform)}
                  className={`chip${platformFilter === platform ? " chip-active" : ""}`}
                >
                  {platform === "all" ? "All" : platform}
                </button>
              ))}

              <span aria-hidden style={{ color: "var(--dim)", fontSize: 12, fontFamily: "var(--mono)" }}>
                //
              </span>

              <button
                onClick={() => setBookmarkFilter((prev) => !prev)}
                className="chip"
                style={
                  bookmarkFilter
                    ? {
                        borderColor: "var(--gold)",
                        color: "var(--gold)",
                        background: "color-mix(in srgb, var(--gold) 9%, transparent)",
                      }
                    : undefined
                }
              >
                <span aria-hidden style={{ fontSize: 12, lineHeight: 1 }}>★</span>
                Bookmarks
                {bookmarks.length > 0 ? ` · ${bookmarks.length}` : ""}
              </button>
              <button
                onClick={() => setHideReadFilter((prev) => !prev)}
                className="chip"
                style={
                  hideReadFilter
                    ? {
                        borderColor: "var(--red)",
                        color: "var(--red)",
                        background: "color-mix(in srgb, var(--red) 9%, transparent)",
                      }
                    : undefined
                }
              >
                Hide read
                {readPosts.length > 0 ? ` · ${readPosts.length}` : ""}
              </button>
              <button
                onClick={() =>
                  setCollapsedCompanies((prev) =>
                    visibleCompanyNames.every((companyName) => prev.includes(companyName))
                      ? prev.filter((companyName) => !visibleCompanyNames.includes(companyName))
                      : [...new Set([...prev, ...visibleCompanyNames])]
                  )
                }
                className="chip"
              >
                {visibleCompanyNames.every((companyName) => collapsedSet.has(companyName)) ? "모두 펼치기" : "모두 접기"}
              </button>

              {bookmarks.length > 0 && (
                <button
                  onClick={exportBookmarks}
                  className="chip"
                  style={{
                    borderColor: "var(--accent)",
                    color: bookmarksCopied ? "var(--ink)" : "var(--accent)",
                    background: bookmarksCopied ? "var(--accent)" : "transparent",
                  }}
                >
                  {bookmarksCopied ? "복사됨" : "내보내기"}
                  <span aria-hidden>↓</span>
                </button>
              )}
            </div>

            <div className="divider-label" aria-hidden>
              <span>회사별</span>
            </div>

            <div className="scroll-hide" style={{ display: "flex", gap: 8, overflowX: "auto", flexWrap: "nowrap" }}>
              <button
                onClick={() => setCompanyFilter("all")}
                className={`chip${companyFilter === "all" ? " chip-active" : ""}`}
              >
                All companies
              </button>
              {data.companies.map((company) => {
                const active = companyFilter === company.name;
                return (
                  <button
                    key={company.name}
                    onClick={() => setCompanyFilter(active ? "all" : company.name)}
                    className="chip"
                    style={
                      active
                        ? {
                            color: "var(--ink)",
                            background: company.color,
                            borderColor: company.color,
                          }
                        : {
                            color: "var(--muted)",
                          }
                    }
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 999,
                        background: company.color,
                        display: "inline-block",
                      }}
                    />
                    {company.name.split(" /")[0]}
                  </button>
                );
              })}
            </div>

            {isFiltering && (
              <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>
                {String(totalFiltered).padStart(2, "0")} MATCHES
                <button
                  onClick={() => {
                    setSearch("");
                    setPlatformFilter("all");
                    setCompanyFilter("all");
                    setBookmarkFilter(false);
                    setHideReadFilter(false);
                  }}
                  style={{
                    marginLeft: 12,
                    fontSize: 11,
                    color: "var(--accent)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--mono)",
                  }}
                >
                  RESET FILTERS
                </button>
              </p>
            )}
          </div>
        </div>

        <ChronologicalFeed
          stories={feedStories}
          issueSlug={data.slug}
          defaultYear={data.year}
          onOpenStory={openPost}
        />

        <StatsBar
          companies={filteredCompanies}
          actionMode={statsActionMode}
          onCompanyClick={(name) => setCompanyFilter(companyFilter === name ? "all" : name)}
          onCompanyScroll={scrollToCompany}
          onToggleActionMode={() =>
            setStatsActionMode((prev) => (prev === "filter" ? "scroll" : "filter"))
          }
        />

        {filteredCompanies.length > 0 ? (
          <section aria-label="회사 아카이브" style={{ marginBottom: 48 }}>
            <div className="divider-label" style={{ marginBottom: 16 }}>
              <span>회사 아카이브</span>
            </div>
            {filteredCompanies.map((company) => (
              <CompanySection
                key={company.name}
                company={company}
                startIndex={companyStartIndex.get(company.name) ?? 1}
                defaultYear={data.year}
                onPostClick={openPost}
                bookmarks={bookmarkSet}
                onBookmark={toggleBookmark}
                readPosts={readSet}
                searchQuery={search}
                collapsed={collapsedSet.has(company.name)}
                onToggleCollapsed={() => toggleCompanyCollapsed(company.name)}
              />
            ))}
          </section>
        ) : (
          <div style={{ padding: "76px 0", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
            <p className="serif" style={{ fontSize: "clamp(20px, 2.4vw, 26px)", color: "var(--text-strong)", marginBottom: 10, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              조건에 맞는 포스팅이 없다
            </p>
            <p className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              필터를 조정하세요
            </p>
          </div>
        )}

        <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 26, marginBottom: 16 }}>
          <p
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--dim)",
              textAlign: "center",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Shortcuts &nbsp;·&nbsp;
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 6px", fontSize: 10 }}>
              /
            </kbd>{" "}
            Search &nbsp;·&nbsp;
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 6px", fontSize: 10 }}>
              ←
            </kbd>
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 6px", fontSize: 10, marginLeft: 4 }}>
              →
            </kbd>{" "}
            Navigate &nbsp;·&nbsp;
            <kbd style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 2, padding: "1px 6px", fontSize: 10 }}>
              Esc
            </kbd>{" "}
            Close
          </p>
        </div>

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="맨 위로"
            title="맨 위로"
            style={{
              position: "fixed",
              right: 24,
              bottom: 32,
              zIndex: 50,
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid var(--accent)",
              background: "var(--accent)",
              color: "var(--ink)",
              cursor: "pointer",
              boxShadow: "0 14px 28px rgba(0,0,0,0.28)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        )}
      </main>
    </>
  );
}
