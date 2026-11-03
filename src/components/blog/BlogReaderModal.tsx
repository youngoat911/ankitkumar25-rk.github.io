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
  Quote, 
  Terminal,
  ExternalLink
} from "lucide-react";
import { BlogPost, blogPosts } from "@/data/blogData";

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
    const url = `${window.location.origin}${window.location.pathname}#writing?article=${post.slug}`;
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
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col border border-[var(--line-dark)] bg-[var(--paper)] text-[var(--ink)] shadow-2xl overflow-hidden rounded-sm"
        >
          {/* Scroll progress bar attached to modal top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--line)] z-30">
            <motion.div
              className="h-full bg-[var(--ink)]"
              style={{ width: `${scrollProgress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>

          {/* Modal Header Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)] bg-[var(--paper)] z-20">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Field Notes</span>
            </button>

            <div className="flex items-center gap-3">
              {/* Share button */}
              <button
                onClick={copyArticleLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] border border-[var(--line)] bg-[var(--tab-bg)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
                title="Copy direct link"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
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
                className="p-1.5 border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
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
            className="overflow-y-auto px-6 sm:px-12 md:px-16 py-10 space-y-8 scroll-smooth"
          >
            {/* Meta Category & Stats */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--muted)]">
              <span className="px-2 py-0.5 border border-[var(--line)] bg-[var(--tab-bg)] text-amber-500 font-bold uppercase tracking-wider text-[10px]">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <span>• {post.views}</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--ink)] tracking-tight leading-tight">
                {post.title}
              </h1>
              <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed border-l-2 border-amber-500 pl-4 py-1">
                {post.subtitle}
              </p>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 pt-1 pb-4 border-b border-[var(--line)]">
              {post.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 text-[11px] font-mono bg-[var(--tab-bg)] text-[var(--muted)] border border-[var(--line)]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Article Sections */}
            <div className="space-y-8 text-[var(--ink)] leading-relaxed text-sm sm:text-base">
              {post.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  {section.heading && (
                    <h2 className="text-xl sm:text-2xl font-black text-[var(--ink)] tracking-tight mt-6 flex items-center gap-2">
                      <span className="h-2 w-2 bg-amber-500 shrink-0" />
                      {section.heading}
                    </h2>
                  )}

                  {/* Paragraph text */}
                  <div className="space-y-3">
                    {section.content.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Optional Quote / Callout */}
                  {section.callout && (
                    <div className="p-6 border border-[var(--line)] bg-[var(--tab-bg)] text-[var(--ink)] my-4">
                      <div className="flex items-start gap-3">
                        <Quote className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <p className="italic text-sm sm:text-base leading-snug">
                            &ldquo;{section.callout.text}&rdquo;
                          </p>
                          {section.callout.author && (
                            <p className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--muted)]">
                              — {section.callout.author}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Optional Diagram / Infographic Image */}
                  {section.image && (
                    <figure className="my-6 border border-[var(--line)] bg-[var(--card-bg)] overflow-hidden">
                      <div className="relative w-full bg-[var(--tab-bg)] flex items-center justify-center p-2 sm:p-4">
                        <Image
                          src={section.image.src}
                          alt={section.image.alt}
                          width={1000}
                          height={600}
                          className="max-h-[460px] w-auto max-w-full object-contain mx-auto border border-[var(--line)]"
                        />
                      </div>
                      {section.image.caption && (
                        <figcaption className="p-3 text-center text-xs font-mono text-[var(--muted)] border-t border-[var(--line)] bg-[var(--tab-bg)]">
                          {section.image.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {/* Optional Code Snippet Block */}
                  {section.codeBlock && (
                    <div className="border border-neutral-800 bg-[#0c0d0c] text-white overflow-hidden my-4">
                      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-xs font-mono text-neutral-400">
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
                      <pre className="p-4 text-xs font-mono overflow-x-auto text-emerald-300 leading-relaxed bg-[#0c0d0c]">
                        <code>{section.codeBlock.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Author Signature & Bio Card */}
            <div className="mt-12 pt-8 border-t border-[var(--line)]">
              <div className="p-6 border border-[var(--line)] bg-[var(--card-bg)] flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative h-16 w-16 shrink-0">
                  <Image
                    src="/profile.png"
                    alt="Ankit Kumar"
                    width={64}
                    height={64}
                    className="h-16 w-16 border border-[var(--line)] object-cover"
                  />
                </div>
                <div className="space-y-1.5 text-center sm:text-left flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 justify-center sm:justify-start">
                    <h3 className="text-base font-black text-[var(--ink)]">Ankit Kumar</h3>
                    <span className="text-xs text-amber-500 font-mono">@ankitkumar25-rk</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Full-stack developer from Udaipurwati, Jhunjhunu · B.Tech at IIT Jodhpur. Building high-performance systems with village roots and zero shortcuts.
                  </p>
                  <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs font-mono font-bold">
                    <a
                      href="https://github.com/ankitkumar25-rk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" /> GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ankit-kumar-478316378/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" /> LinkedIn
                    </a>
                    <button
                      onClick={() => {
                        onClose();
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-amber-500 hover:underline cursor-pointer"
                    >
                      Get In Touch →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Next / Prev Article Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--line)]">
              {prevPost ? (
                <button
                  onClick={() => onSelectPost(prevPost)}
                  className="p-5 border border-[var(--line)] bg-[var(--card-bg)] hover:bg-[var(--tab-bg)] text-left transition-colors cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] group-hover:text-amber-500 transition-colors mb-1 font-mono">
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                    <span>Previous Article</span>
                  </div>
                  <span className="text-sm font-bold text-[var(--ink)] group-hover:text-amber-500 transition-colors line-clamp-2">
                    {prevPost.title}
                  </span>
                </button>
              ) : <div />}

              {nextPost ? (
                <button
                  onClick={() => onSelectPost(nextPost)}
                  className="p-5 border border-[var(--line)] bg-[var(--card-bg)] hover:bg-[var(--tab-bg)] text-right transition-colors cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-end gap-1.5 text-xs text-[var(--muted)] group-hover:text-amber-500 transition-colors mb-1 font-mono">
                    <span>Next Article</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <span className="text-sm font-bold text-[var(--ink)] group-hover:text-amber-500 transition-colors line-clamp-2">
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
