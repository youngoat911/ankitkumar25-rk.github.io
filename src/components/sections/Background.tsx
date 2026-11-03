"use client";

import React from "react";

export default function Background() {
  return (
    <section id="background" className="w-full border-b border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        
        {/* Section Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[var(--line)]">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-2">04 / Background</p>
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
              Summer of Code
            </h3>
            <p className="text-xs text-[var(--muted)] font-mono">
              DevLup Labs Contributor (CogniOS Telemetry)
            </p>
          </div>

        </div>

        {/* Secondary Verification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-[var(--line)] border border-[var(--line)] bg-[var(--tab-bg)] text-xs font-mono">
          
          <div className="p-6 space-y-1.5">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Production Deployments</span>
            <strong className="text-[var(--ink)] text-sm block">VPS / Nginx / PM2</strong>
            <p className="text-[11px] text-[var(--muted)]">PostgreSQL &amp; Cloudinary pipelines configured from scratch.</p>
          </div>

          <div className="p-6 space-y-1.5 border-t sm:border-t-0">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Entrepreneurship</span>
            <strong className="text-[var(--ink)] text-sm block">FSSAI Registered</strong>
            <p className="text-[11px] text-[var(--muted)]">Achaarwaala &amp; PhotowalaGift solo business compliance.</p>
          </div>

          <div className="p-6 space-y-1.5 border-t sm:border-t-0">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Technical Foundation</span>
            <strong className="text-[var(--ink)] text-sm block">Self-Taught Engineering</strong>
            <p className="text-[11px] text-[var(--muted)]">From first line of code in Rajasthan to production web systems.</p>
          </div>

          <div className="p-6 space-y-1.5 border-t sm:border-t-0">
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Cultural Roots</span>
            <strong className="text-[var(--ink)] text-sm block">Udaipurwati Heritage</strong>
            <p className="text-[11px] text-[var(--muted)]">Inspired by Sidhu Moosewala &amp; Bhagat Singh — stand firm in your roots.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
