"use client";

import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[var(--paper)] text-[var(--ink)] py-12 border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono">
        <div>
          <strong className="text-sm font-black text-[var(--ink)]">
            Ankit Kumar<span className="text-[var(--accent)]">.</span>
          </strong>
          <p className="text-[var(--muted)] mt-0.5">
            Full-Stack Developer · IIT Jodhpur · India
          </p>
        </div>

        <p className="text-[var(--muted)] max-w-md">
          &copy; {new Date().getFullYear()}{" "}Ankit Kumar. Handcrafted with Next.js &amp; Tailwind CSS. Built with patience, discipline &amp; zero shortcuts.
        </p>

        <button
          onClick={scrollToTop}
          className="text-[var(--ink)] hover:text-amber-500 font-bold transition-colors cursor-pointer"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
