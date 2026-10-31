"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  X, 
  Terminal,
  Shield,
  Layers,
  Heart
} from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { blogPosts, blogCategories, BlogPost } from "@/data/blogData";
import BlogReaderModal from "@/components/blog/BlogReaderModal";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Check URL hash for deep linking on mount (e.g. #blog?article=slug)
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
      window.history.replaceState(null, "", `#blog?article=${post.slug}`);
    }
  };

  const closeArticle = () => {
    setActivePost(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "#blog");
    }
  };

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
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

  // Featured post logic: if "All" and no search query, highlight the first featured post separately
  const featuredPost = useMemo(() => {
    if (selectedCategory === "All" && searchQuery.trim() === "") {
      return blogPosts.find((p) => p.featured) || blogPosts[0];
    }
    return null;
  }, [selectedCategory, searchQuery]);

  const regularPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Philosophy & Roots":
        return <Heart className="h-3.5 w-3.5 text-amber-400" />;
      case "Systems & Python":
        return <Layers className="h-3.5 w-3.5 text-emerald-400" />;
      case "Security & Backend":
        return <Shield className="h-3.5 w-3.5 text-violet-400" />;
      case "Creative Web":
        return <Terminal className="h-3.5 w-3.5 text-indigo-400" />;
      default:
        return <BookOpen className="h-3.5 w-3.5" />;
    }
  };

  return (
    <section id="blog" className="relative py-24 md:py-32 overflow-hidden bg-neutral-950/40">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 -z-10 h-80 w-80 rounded-full bg-amber-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-3.5 py-1 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            Field Notes & Insights
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Engineering Thought Logs
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-xl">
            Articles on building telemetry pipelines, production auth architectures, WebGL performance, and life lessons from rural Rajasthan.
          </p>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full" />
        </motion.div>

        {/* Filters & Search Toolbar */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
            {blogCategories.map((cat) => {
              const count = cat === "All" 
                ? blogPosts.length 
                : blogPosts.filter((p) => p.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? "bg-emerald-500/30 text-emerald-200" : "bg-neutral-800 text-neutral-400"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by topic or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 rounded-full text-xs bg-neutral-950/60 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* FEATURED POST BANNER (Only on "All" view with empty search) */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <SpotlightCard
              onClick={() => openArticle(featuredPost)}
              className="p-6 sm:p-8 border-amber-500/30 bg-gradient-to-br from-neutral-950/80 via-neutral-950/40 to-neutral-900/40 hover:border-amber-500/50 transition-all cursor-pointer group"
              spotlightColor="rgba(245, 158, 11, 0.1)"
              borderColor="rgba(245, 158, 11, 0.4)"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      <Sparkles className="h-3 w-3" /> Featured Story
                    </span>
                    <Badge variant={featuredPost.badgeVariant}>
                      {featuredPost.category}
                    </Badge>
                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-emerald-400" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {featuredPost.title}
                  </h3>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredPost.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {featuredPost.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-neutral-850 pt-4 lg:pt-0 lg:pl-6">
                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-amber-400" />
                      {featuredPost.date}
                    </span>
                    <span>• {featuredPost.views}</span>
                  </div>

                  <Button
                    variant="neon"
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-xs py-2 px-5 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      openArticle(featuredPost);
                    }}
                  >
                    Read Full Story
                    <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        )}

        {/* REGULAR ARTICLES GRID */}
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {regularPosts.map((post) => (
              <motion.div
                key={post.slug}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex h-full"
              >
                <SpotlightCard
                  onClick={() => openArticle(post)}
                  className="flex flex-col justify-between h-full p-6 border-emerald-950/40 bg-neutral-950/40 hover:border-emerald-800/40 transition-all duration-300 cursor-pointer group"
                  spotlightColor={post.spotlightColor}
                  borderColor={post.borderColor}
                >
                  <div className="space-y-4">
                    {/* Header: Badge & Date */}
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant={post.badgeVariant}>
                        {post.category}
                      </Badge>
                      <span className="text-[11px] font-mono text-neutral-500">
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-850 text-neutral-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-5 mt-5 border-t border-emerald-950/30 text-xs">
                    <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-amber-400" />
                      {post.date}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:text-amber-400 transition-colors">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty Search State */
          <div className="p-12 text-center rounded-2xl border border-neutral-900 bg-neutral-950/30 space-y-3">
            <Search className="h-8 w-8 text-neutral-500 mx-auto opacity-50" />
            <h4 className="text-base font-semibold text-white">No articles found</h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try searching another keyword or reset the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-2 text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Reader Modal */}
      <BlogReaderModal
        post={activePost}
        onClose={closeArticle}
        onSelectPost={(p) => openArticle(p)}
      />
    </section>
  );
}
