"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import TractorModal from "@/components/modals/TractorModal";

export default function Hero() {
  const [isTractorModalOpen, setIsTractorModalOpen] = useState(false);

  return (
    <>
      <section className="relative w-full border-b border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] overflow-hidden" id="top">
        
        {/* Top Status & Meta Line */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] text-xs font-mono">
          <p className="text-[var(--muted)]">Software Engineer / IIT Jodhpur · Udaipurwati</p>
          <div className="flex items-center gap-2 text-[var(--ink)] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Open to opportunities</span>
          </div>
        </div>

        {/* Hero Grid: Left Identity & Right Visual */}
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          
          {/* Left Column: Identity & Statement (7 cols) */}
          <div className="lg:col-span-7 px-4 sm:px-8 py-12 lg:py-16 flex flex-col justify-between">
            <div>
              <p className="section-code mb-6">01 / Player profile</p>
              
              {/* Massive 2-Line Editorial Heading */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-black tracking-[-0.08em] leading-[0.88] text-[var(--ink)]">
                <span className="block">Ankit</span>
                <span className="block">
                  Kumar<span className="text-[var(--accent)]">.</span>
                </span>
              </h1>

              {/* Two-Column Copy Under Name */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10 md:mt-14 max-w-3xl">
                <div className="md:col-span-6">
                  <p className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                    I build software the way we farm — with patience, discipline &amp; zero shortcuts.
                  </p>
                </div>
                <div className="md:col-span-6 space-y-4">
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    From rural Rajasthan to IIT Jodhpur, I build high-reliability systems, production e-commerce, and creative web experiences across the full stack.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="#work"
                      className="yogi-button yogi-button-primary text-xs uppercase font-bold"
                    >
                      <span>View projects</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href="#contact"
                      className="yogi-button yogi-button-secondary text-xs uppercase font-bold"
                    >
                      <span>Let&apos;s talk</span>
                    </a>
                  </div>

                  {/* 3D Tractor Interactive Experience Launch Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => setIsTractorModalOpen(true)}
                      className="group flex items-center gap-2 text-xs font-mono font-bold text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                    >
                      <Play className="h-3 w-3 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
                      <span className="underline underline-offset-4">Launch 3D Tractor Engine</span>
                      <span className="text-[10px] text-[var(--muted)] font-normal">· Interactive WebGL</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Portrait with Engineering Signals (5 cols) */}
          <div className="lg:col-span-5 relative border-t lg:border-t-0 lg:border-l border-[var(--line)] bg-[var(--card-bg)] flex flex-col justify-end min-h-[420px] lg:min-h-full overflow-hidden">
            
            {/* Top Label */}
            <p className="absolute top-4 left-6 text-[10px] font-mono font-bold tracking-widest text-[var(--muted)] uppercase z-10">
              ANKIT / SOFTWARE ENGINEER
            </p>

            {/* Corner Markers */}
            <div className="signal-corner" />
            <div className="signal-corner-bl hidden lg:block" />

            {/* Actual Portrait Image */}
            <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] flex items-end justify-center">
              <Image
                src="/profile.jpeg"
                alt="Ankit Kumar - Software Engineer"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain object-bottom select-none pointer-events-none"
                priority
              />
            </div>

            {/* Engineering Focus Signals Grid */}
            <div className="absolute bottom-4 right-4 z-20 bg-[var(--paper)]/95 border border-[var(--line)] backdrop-blur-sm p-3 shadow-lg divide-y divide-[var(--line)] text-xs font-mono min-w-[170px]">
              <div className="py-1 text-[var(--muted)] font-semibold flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">+</span> Product Engineering
              </div>
              <div className="py-1 text-[var(--muted)] font-semibold flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">+</span> System Telemetry
              </div>
              <div className="py-1 text-[var(--muted)] font-semibold flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">+</span> Security &amp; Auth
              </div>
              <div className="py-1 text-[var(--muted)] font-semibold flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">+</span> Creative 3D Web
              </div>
            </div>
          </div>

        </div>

        {/* Proof Rail: 4 Statutory Highlight Columns */}
        <div className="border-t border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto max-w-[1440px] grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x divide-[var(--line)] text-left">
            
            <div className="p-6 sm:p-8">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-bold">
                Experience
              </span>
              <p className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]">
                2+ <span className="text-xs font-mono font-normal text-[var(--muted)]">years coding</span>
              </p>
              <span className="block mt-1 text-xs text-[var(--muted)]">IIT Jodhpur B.Tech</span>
            </div>

            <div className="p-6 sm:p-8">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-bold">
                Delivery
              </span>
              <p className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]">
                2+ <span className="text-xs font-mono font-normal text-[var(--muted)]">live products</span>
              </p>
              <span className="block mt-1 text-xs text-[var(--muted)]">Production PERN &amp; D2C</span>
            </div>

            <div className="p-6 sm:p-8">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-bold">
                Open Source
              </span>
              <p className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]">
                CogniOS <span className="text-xs font-mono font-normal text-[var(--muted)]">daemon</span>
              </p>
              <span className="block mt-1 text-xs text-[var(--muted)]">DevLup Labs Summer of Code</span>
            </div>

            <div className="p-6 sm:p-8">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-bold">
                Telemetry
              </span>
              <p className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]">
                4 <span className="text-xs font-mono font-normal text-[var(--muted)]">metric layers</span>
              </p>
              <span className="block mt-1 text-xs text-[var(--muted)]">SQLite circular BlackBox</span>
            </div>

          </div>
        </div>

      </section>

      {/* Interactive 3D Tractor Dialog */}
      <TractorModal
        isOpen={isTractorModalOpen}
        onClose={() => setIsTractorModalOpen(false)}
      />
    </>
  );
}
