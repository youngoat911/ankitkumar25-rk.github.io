"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  X, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Copy, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Quote, 
  Terminal,
  ExternalLink
} from "lucide-react";
import { BlogPost, blogPosts } from "@/data/blogData";
import Badge from "@/components/ui/Badge";

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export default function BlogReaderModal({ post, onClose, onSelectPost }: BlogReaderModalProps) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (post) {
      document.body.style.overflow = "hidden";
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [post]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const total = scrollHeight - clientHeight;
    if (total <= 0) {
      setScrollProgress(100);
    } else {
      setScrollProgress(Math.min(Math.round((scrollTop / total) * 100), 100));
    }
  };

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const copyArticleLink = () => {
    if (!post) return;
    const url = `${window.location.origin}${window.location.pathname}#blog?article=${post.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  if (!post) return null;

  // Find next and prev posts for bottom navigation
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl md:rounded-3xl border border-neutral-800/90 bg-neutral-950/95 shadow-2xl overflow-hidden backdrop-blur-xl"
        >
          {/* Scroll progress bar attached to modal top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900 z-30">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-400"
              style={{ width: `${scrollProgress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>

          {/* Modal Header Toolbar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-850/80 bg-neutral-950/80 backdrop-blur-md z-20">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Articles</span>
            </button>

            <div className="flex items-center gap-3">
              {/* Share button */}
              <button
                onClick={copyArticleLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-400 border border-neutral-800 bg-neutral-900/40 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
                title="Copy direct link"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>

              {/* Close icon */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="overflow-y-auto px-5 sm:px-8 md:px-12 py-8 space-y-8 scroll-smooth"
          >
            {/* Meta Category & Stats */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
              <Badge variant={post.badgeVariant}>
                {post.category}
              </Badge>
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <Clock className="h-3.5 w-3.5 text-emerald-400" />
                {post.readTime}
              </span>
              <span className="text-neutral-500 font-mono">• {post.views}</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {post.title}
              </h1>
              <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed border-l-2 border-amber-500/60 pl-4 py-1">
                {post.subtitle}
              </p>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 pt-1 pb-4 border-b border-neutral-900">
              {post.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-neutral-900/80 text-neutral-400 border border-neutral-800"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Article Sections */}
            <div className="space-y-8 text-neutral-300 leading-relaxed text-sm sm:text-base">
              {post.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  {section.heading && (
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-6 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      {section.heading}
                    </h2>
                  )}

                  {/* Paragraph text with preserved line-breaks */}
                  <div className="space-y-3">
                    {section.content.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Optional Quote / Callout */}
                  {section.callout && (
                    <div
                      className={`p-5 rounded-2xl border ${
                        section.callout.type === "quote"
                          ? "bg-amber-950/20 border-amber-500/30 text-amber-200"
                          : section.callout.type === "tip"
                          ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                          : "bg-neutral-900/40 border-neutral-800 text-neutral-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {section.callout.type === "quote" ? (
                          <Quote className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
                        ) : (
                          <Sparkles className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1.5">
                          <p className="italic text-sm sm:text-base leading-snug">
                            &ldquo;{section.callout.text}&rdquo;
                          </p>
                          {section.callout.author && (
                            <p className="text-xs font-semibold tracking-wider uppercase font-mono opacity-80">
                              — {section.callout.author}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Optional Code Snippet Block */}
                  {section.codeBlock && (
                    <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden my-4">
                      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/70 border-b border-neutral-800 text-xs font-mono text-neutral-400">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-3.5 w-3.5 text-amber-400" />
                          <span>{section.codeBlock.caption || section.codeBlock.language}</span>
                        </div>
                        <button
                          onClick={() => copyCode(section.codeBlock!.code, sIdx)}
                          className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedCodeIndex === sIdx ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-400 text-[11px]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span className="text-[11px]">Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono overflow-x-auto text-emerald-300/90 leading-relaxed bg-neutral-950/90">
                        <code>{section.codeBlock.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Author Signature & Bio Card */}
            <div className="mt-12 pt-8 border-t border-neutral-900">
              <div className="p-5 rounded-2xl bg-neutral-900/30 border border-emerald-950/60 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="relative h-16 w-16 shrink-0">
                  <Image
                    src="/profile.png"
                    alt="Ankit Kumar"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full border-2 border-emerald-500/40 object-cover"
                  />
                </div>
                <div className="space-y-1.5 text-center sm:text-left flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 justify-center sm:justify-start">
                    <h3 className="text-base font-bold text-white">Ankit Kumar</h3>
                    <span className="text-xs text-amber-400 font-mono">@ankitkumar25-rk</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Full-stack developer from Udaipurwati, Jhunjhunu · B.Tech at IIT Jodhpur. Building high-performance systems with village roots and zero shortcuts.
                  </p>
                  <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                    <a
                      href="https://github.com/ankitkumar25-rk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" /> GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ankit-kumar-478316378/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" /> LinkedIn
                    </a>
                    <button
                      onClick={() => {
                        onClose();
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-xs font-semibold text-amber-400 hover:underline cursor-pointer ml-2"
                    >
                      Get In Touch →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Next / Prev Article Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-neutral-900">
              {prevPost ? (
                <button
                  onClick={() => onSelectPost(prevPost)}
                  className="p-4 rounded-xl border border-neutral-850 bg-neutral-900/20 hover:border-amber-500/40 text-left transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 group-hover:text-amber-400 transition-colors mb-1 font-mono">
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                    <span>Previous Article</span>
                  </div>
                  <span className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {prevPost.title}
                  </span>
                </button>
              ) : <div />}

              {nextPost ? (
                <button
                  onClick={() => onSelectPost(nextPost)}
                  className="p-4 rounded-xl border border-neutral-850 bg-neutral-900/20 hover:border-emerald-500/40 text-right transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-end gap-1.5 text-xs text-neutral-500 group-hover:text-emerald-400 transition-colors mb-1 font-mono">
                    <span>Next Article</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {nextPost.title}
                  </span>
                </button>
              ) : <div />}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
