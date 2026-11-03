"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Expertise() {
  const capabilities = [
    {
      num: "01",
      title: "Product engineering",
      description: "Full-stack web applications shaped around practical workflows, fast response times, and resilient client architecture.",
      proofText: "Proof / PhotowalaGift",
      proofHref: "#work",
    },
    {
      num: "02",
      title: "System telemetry & daemons",
      description: "Low-overhead Linux telemetry collection, circular WAL buffers, and real-time anomaly detection pipelines.",
      proofText: "Proof / CogniOS",
      proofHref: "#work",
    },
    {
      num: "03",
      title: "Backend & auth security",
      description: "PASETO v4 token security, PostgreSQL schemas, payment gateway integrations, and reliable REST endpoints.",
      proofText: "Proof / PhotowalaGift & YT-Clone",
      proofHref: "#work",
    },
    {
      num: "04",
      title: "Creative 3D & WebGL",
      description: "Interactive Three.js visualizers, RAF-decoupled scroll physics, and buttery 60FPS fluid canvas performance.",
      proofText: "Proof / WhatChat & 5911 Tractor",
      proofHref: "#top",
    },
  ];

  return (
    <section id="expertise" className="w-full border-b border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        
        {/* Section Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[var(--line)]">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-2">03 / Skill set</p>
            <h2 className="display-title">
              How I can help<span className="dot">.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Product thinking, systems engineering, and reliable operations connected into software that remains useful over time.
            </p>
          </div>
        </div>

        {/* 4 Numbered Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[var(--line)] border border-[var(--line)] bg-[var(--card-bg)]">
          {capabilities.map((cap) => (
            <div key={cap.num} className="p-8 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-2xl font-black font-mono text-[var(--muted)] block mb-6">
                  {cap.num}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-[var(--ink)] mb-3">
                  {cap.title}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--line)] mt-6">
                <a
                  href={cap.proofHref}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--ink)] hover:text-amber-500 transition-colors"
                >
                  <span>{cap.proofText}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Working Set Stack Line (Yogi's Exact Style) */}
        <div className="mt-8 p-6 border border-[var(--line)] bg-[var(--tab-bg)] text-xs font-mono">
          <span className="font-bold uppercase tracking-wider text-[var(--ink)] mr-3">
            Working set:
          </span>
          <span className="text-[var(--muted)]">
            TypeScript / JavaScript / Python / React 19 / Next.js / Node.js / Express / PostgreSQL / SQLite / Three.js / Tailwind CSS / Docker / Linux
          </span>
        </div>

      </div>
    </section>
  );
}

