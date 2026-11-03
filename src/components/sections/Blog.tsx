"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, Search, X, PenTool, MessageSquare } from "lucide-react";
import { blogPosts, blogCategories, BlogPost } from "@/data/blogData";
import BlogReaderModal from "@/components/blog/BlogReaderModal";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Deep linking via URL hash (#writing?article=slug)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes("article=")) {
        const slug = hash.split("article=")[1]?.split("&")[0];
        const found = blogPosts.find((p) => p.slug === slug);
        if (found) {
          setActivePost(found);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const openArticle = (post: BlogPost) => {
    setActivePost(post);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#writing?article=${post.slug}`);
    }
  };

  const closeArticle = () => {
    setActivePost(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "#writing");
    }
  };

  const filteredPosts = useMemo(() => {
    if (blogPosts.length === 0) return [];
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    if (filteredPosts.length === 0) return null;
    return filteredPosts.find((p) => p.featured) || filteredPosts[0];
  }, [filteredPosts]);

  const otherPosts = useMemo(() => {
    if (!featuredPost) return [];
    return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
  }, [filteredPosts, featuredPost]);

  const hasPosts = blogPosts.length > 0;

  return (
    <>
      <section id="writing" className="w-full border-b border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
          
          {/* Section Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[var(--line)]">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-2">05 / Field notes</p>
              <h2 className="display-title">
                Notes from the work<span className="dot">.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                Field notes, system architectures, and reflections written from direct engineering practice.
              </p>
              
              {/* Search Box - Only if posts exist */}
              {hasPosts && (
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted)]" />
                  <input
                    type="text"
                    placeholder="Filter articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-8 py-1.5 text-xs font-mono bg-[var(--tab-bg)] border border-[var(--line)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* If articles are present: Category Filter Bar + Article Grid */}
          {hasPosts && (
            <>
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-mono">
                {blogCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-bold"
                        : "bg-[var(--card-bg)] text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {featuredPost && (
                  <div className="lg:col-span-7 border border-[var(--line)] bg-[var(--card-bg)] p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] mb-6">
                        <span className="font-bold text-amber-500 uppercase tracking-widest">
                          [Featured Article]
                        </span>
                        <div className="flex items-center gap-3">
                          <span>{featuredPost.date}</span>
                          <span>• {featuredPost.readTime}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => openArticle(featuredPost)}
                        className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)] hover:text-amber-500 transition-colors cursor-pointer leading-tight mb-4"
                      >
                        {featuredPost.title}
                      </h3>

                      <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                        {featuredPost.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {featuredPost.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-2 py-0.5 border border-[var(--line)] text-[var(--muted)]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-[var(--line)]">
                      <button
                        onClick={() => openArticle(featuredPost)}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)] hover:text-amber-500 transition-colors cursor-pointer"
                      >
                        <span>Read the full article</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {otherPosts.length > 0 && (
                  <div className="lg:col-span-5 flex flex-col divide-y divide-[var(--line)] border border-[var(--line)] bg-[var(--card-bg)]">
                    {otherPosts.map((post) => (
                      <article
                        key={post.slug}
                        onClick={() => openArticle(post)}
                        className="p-6 sm:p-8 hover:bg-[var(--tab-bg)] transition-colors cursor-pointer group flex flex-col justify-between flex-1"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                            <span className="uppercase tracking-wider text-[10px] text-amber-500">
                              {post.category}
                            </span>
                            <span>{post.date}</span>
                          </div>

                          <h4 className="text-base sm:text-lg font-bold text-[var(--ink)] group-hover:text-amber-500 transition-colors leading-snug">
                            {post.title}
                          </h4>

                          <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
                            {post.summary}
                          </p>
                        </div>

                        <div className="pt-4 mt-2 flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                          <span>{post.readTime}</span>
                          <span className="text-[var(--ink)] group-hover:text-amber-500 transition-colors font-bold inline-flex items-center gap-1">
                            Read ↗
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* If no articles yet: Clean, Genuine Editorial State */}
          {!hasPosts && (
            <div className="border border-[var(--line)] bg-[var(--card-bg)] p-8 sm:p-14">
              <div className="max-w-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 border border-[var(--line)] bg-[var(--tab-bg)] text-amber-500">
                    <PenTool className="h-4 w-4" />
                  </div>
                  <span className="section-code">DISPATCHES &amp; ESSAYS / IN PROGRESS</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight leading-snug">
                  Drafting upcoming field notes<span className="text-[var(--accent)]">.</span>
                </h3>

                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Real essays, system telemetry teardowns, and engineering notes are currently being written. Ready to be populated with authentic writings as they publish.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono font-bold">
                  <a
                    href="#contact"
                    className="yogi-button yogi-button-primary text-xs uppercase"
                  >
                    <span>Suggest a topic to cover</span>
                    <MessageSquare className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href="mailto:ankitgia336@gmail.com?subject=Topic%20Suggestion%20for%20Blog"
                    className="yogi-button yogi-button-secondary text-xs uppercase"
                  >
                    <span>Email directly ↗</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Full Reader Modal */}
      <BlogReaderModal
        post={activePost}
        onClose={closeArticle}
        onSelectPost={(p) => openArticle(p)}
      />
    </>
  );
}
