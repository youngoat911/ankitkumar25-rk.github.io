"use client";

import React from "react";

export default function Background() {
  return (
    <section id="background" className="w-full border-b border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        
        {/* Section Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[var(--line)]">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-2">04 / Experience</p>
            <h2 className="display-title">
              Learning &amp; credentials<span className="dot">.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Formal academic foundation and self-taught engineering, kept in proportion to the work itself.
            </p>
          </div>
        </div>

        {/* Primary 3-Card Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--line)] border border-[var(--line)] bg-[var(--card-bg)] mb-10">
          
          <div className="p-8 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--muted)]">
              Education
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--ink)]">
              B.Tech Student
            </h3>
            <p className="text-xs text-[var(--muted)] font-mono">
              Indian Institute of Technology Jodhpur
            </p>
          </div>

          <div className="p-8 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--muted)]">
              Hackathon
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--ink)]">
              2nd Place Winner
            </h3>
            <p className="text-xs text-[var(--muted)] font-mono">
              Boot-Up Hackathon · DevLup Labs, IIT Jodhpur
            </p>
          </div>

          <div className="p-8 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--muted)]">
              Open Source
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--ink)]">
              6 Merged PRs
            </h3>
            <p className="text-xs text-[var(--muted)] font-mono">
              Across four open-source projects
            </p>
          </div>

        </div>

        {/* Secondary Verification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-[var(--line)] border border-[var(--line)] bg-[var(--tab-bg)] text-xs font-mono">
          
          <div className="p-6 space-y-1.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Tools &amp; platforms</span>
            <strong className="text-[var(--ink)] text-sm block">Linux · Docker · GitHub Actions</strong>
            <p className="text-[11px] text-[var(--muted)]">Deploying with Vercel, Render, and GitHub Pages.</p>
          </div>

          <div className="p-6 space-y-1.5 border-t sm:border-t-0">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Product development</span>
            <strong className="text-[var(--ink)] text-sm block">End-to-end delivery</strong>
            <p className="text-[11px] text-[var(--muted)]">Interfaces, APIs, databases, integrations, testing, and deployment.</p>
          </div>

          <div className="p-6 space-y-1.5 border-t sm:border-t-0">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Technical Foundation</span>
            <strong className="text-[var(--ink)] text-sm block">Self-Taught Engineering</strong>
            <p className="text-[11px] text-[var(--muted)]">From first line of code in Rajasthan to production web systems.</p>
          </div>

          <div className="p-6 space-y-1.5 border-t sm:border-t-0">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Focus</span>
            <strong className="text-[var(--ink)] text-sm block">AI · Web · Systems</strong>
            <p className="text-[11px] text-[var(--muted)]">Developer tooling, IoT, observability, and interactive learning.</p>
          </div>
        </div>

        <div className="mt-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
              <div>
                <p className="eyebrow mb-2">Open source</p>
                <h3 className="text-2xl font-black tracking-tight text-[var(--ink)]">
                  Contributions in the wild<span className="text-[var(--accent)]">.</span>
                </h3>
              </div>
              <p className="text-xs text-[var(--muted)] font-mono">
                6 merged pull requests across four external projects
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[var(--line)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--line)] bg-[var(--card-bg)]">
              <div className="p-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">DevLup Labs</span>
                <strong className="block mt-2 text-sm text-[var(--ink)]">CogniOS · 2 merged</strong>
                <p className="mt-1 text-xs text-[var(--muted)]">Frontend integration and BlackBox documentation</p>
                <p className="mt-3 text-[10px] font-mono text-[var(--muted)]">
                  <a className="hover:text-[var(--ink)]" href="https://github.com/devlup-labs/CogniOS/pull/43" target="_blank" rel="noopener noreferrer">PR #43</a>
                  {" · "}
                  <a className="hover:text-[var(--ink)]" href="https://github.com/devlup-labs/CogniOS/pull/11" target="_blank" rel="noopener noreferrer">PR #11</a>
                </p>
              </div>
              <a
                href="https://github.com/sugarlabs/musicblocks/pull/9901"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 hover:bg-[var(--tab-bg)] transition-colors"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">Sugar Labs</span>
                <strong className="block mt-2 text-sm text-[var(--ink)]">Music Blocks · 1 merged</strong>
                <span className="block mt-1 text-xs text-[var(--muted)]">Fixed expanded block label alignment · <span className="font-mono">PR #9901</span></span>
              </a>
              <div className="p-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">Tman</span>
                <strong className="block mt-2 text-sm text-[var(--ink)]">2 merged pull requests</strong>
                <p className="mt-1 text-xs text-[var(--muted)]">Linux workflows, Git tooling, and installer fixes</p>
                <p className="mt-3 text-[10px] font-mono text-[var(--muted)]">
                  <a className="hover:text-[var(--ink)]" href="https://github.com/IamShreshth/Tman/pull/6" target="_blank" rel="noopener noreferrer">PR #6</a>
                  {" · "}
                  <a className="hover:text-[var(--ink)]" href="https://github.com/IamShreshth/Tman/pull/5" target="_blank" rel="noopener noreferrer">PR #5</a>
                </p>
              </div>
              <a
                href="https://github.com/KDE/kdenlive/pulls?q=is%3Apr+author%3Ayoungoat911"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 hover:bg-[var(--tab-bg)] transition-colors"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">KDE · Kdenlive</span>
                <strong className="block mt-2 text-sm text-[var(--ink)]">3 pull requests · 1 merged</strong>
                <span className="block mt-1 text-xs text-[var(--muted)]">One merged today · November 4, 2026</span>
              </a>
            </div>
          </div>

      </div>
    </section>
  );
}
