"use client";

import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import ProjectArchiveModal from "@/components/modals/ProjectArchiveModal";

export default function Projects() {
  const [cogniosTab, setCogniosTab] = useState<"stream" | "buffer">("stream");
  const [photowalaTab, setPhotowalaTab] = useState<"revenue" | "paseto">("revenue");
  const [whatchatTab, setWhatChatTab] = useState<"chat" | "three">("chat");
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <>
      <section id="work" className="w-full border-b border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
          
          {/* Section Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[var(--line)]">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-2">02 / Project log</p>
              <h2 className="display-title">
                Selected projects<span className="dot">.</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Three snapshots across active production e-commerce, open-source system telemetry, and real-time interactive engineering.
              </p>
            </div>
          </div>

          <div className="space-y-16">
            
            {/* ── CASE STUDY 1: CogniOS ── */}
            <article className="grid grid-cols-1 lg:grid-cols-12 border border-[var(--line)] bg-[var(--card-bg)] overflow-hidden">
              {/* Left Column: STAR Facts & Summary */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--line)]">
                <div>
                  <p className="case-number mb-3">01 / Open Source System Telemetry</p>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)] mb-3">
                    CogniOS
                  </h3>
                  <p className="text-base font-semibold text-[var(--ink)] leading-snug mb-8">
                    Open-source system telemetry daemon and anomaly-detection pipeline built for DevLup Labs.
                  </p>

                  {/* STAR Facts Table */}
                  <dl className="space-y-3 border-t border-[var(--line)] pt-5 text-xs">
                    <div className="grid grid-cols-12 gap-2 py-1 border-b border-[var(--line)] pb-2">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Situation</dt>
                      <dd className="col-span-9 text-[var(--muted)]">Edge machines need micro-spike telemetry without heavy APM memory taxation.</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2 py-1 border-b border-[var(--line)] pb-2">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Task</dt>
                      <dd className="col-span-9 text-[var(--muted)]">Build Layers 1–4 metric collectors and a circular buffer daemon for DevLup Labs&apos; Summer of Code.</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2 py-1 border-b border-[var(--line)] pb-2">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Action</dt>
                      <dd className="col-span-9 text-[var(--muted)]">Built psutil collector daemon, SQLite WAL circular buffer (blackbox.db), rolling Z-score triggers, and Isolation Forest.</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2 py-1">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Result</dt>
                      <dd className="col-span-9 text-[var(--ink)] font-semibold">Sub-1% CPU daemon with microsecond crash snapshot dumping and zero metric drop.</dd>
                    </div>
                  </dl>
                </div>

                {/* Project Links */}
                <div className="flex flex-wrap items-center gap-4 pt-8 mt-6 border-t border-[var(--line)] text-xs font-mono font-bold">
                  <a
                    href="https://github.com/devlup-labs/CogniOS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--ink)] hover:text-amber-500 transition-colors"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    <span>View Repository ↗</span>
                  </a>
                  <span className="text-[var(--muted)]">Python · SQLite · psutil</span>
                </div>
              </div>

              {/* Right Column: Media Panel with Tab Switcher */}
              <div className="lg:col-span-7 flex flex-col bg-[var(--code-bg)] text-white">
                {/* Tabs */}
                <div className="flex border-b border-neutral-800 bg-neutral-950 text-xs font-mono">
                  <button
                    onClick={() => setCogniosTab("stream")}
                    className={`flex items-center gap-2 px-6 py-3.5 border-r border-neutral-800 transition-colors cursor-pointer ${
                      cogniosTab === "stream"
                        ? "bg-neutral-900 text-amber-400 font-bold border-b-2 border-b-amber-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>01</span>
                    <span>Live Metric Stream</span>
                  </button>
                  <button
                    onClick={() => setCogniosTab("buffer")}
                    className={`flex items-center gap-2 px-6 py-3.5 border-r border-neutral-800 transition-colors cursor-pointer ${
                      cogniosTab === "buffer"
                        ? "bg-neutral-900 text-amber-400 font-bold border-b-2 border-b-amber-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>02</span>
                    <span>SQLite BlackBox Architecture</span>
                  </button>
                </div>

                {/* Panel View 1: Live Stream */}
                {cogniosTab === "stream" && (
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow font-mono text-xs space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 font-bold">cognios_blackbox_daemon.py</span>
                      </div>
                      <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 border border-neutral-800">
                        SAMPLING RATE: 500ms
                      </span>
                    </div>

                    {/* Metric Histogram */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px] text-neutral-400">
                        <span>CPU CORE MATRIX (0-7)</span>
                        <span className="text-emerald-400">NORMAL (Z-SCORE: 0.32)</span>
                      </div>
                      <div className="flex items-end gap-2 h-28 pt-4">
                        {[42, 65, 38, 88, 55, 72, 45, 91, 62, 78, 49, 82].map((val, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-gradient-to-t from-emerald-600 to-amber-500 rounded-t-xs"
                              style={{ height: `${val}%` }}
                            />
                            <span className="text-[8px] text-neutral-600">c{i}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-300 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">I/O Wait: 0.12ms</span>
                        <span className="text-neutral-500">RSS Mem: 34.2MB</span>
                        <span className="text-emerald-400">STATUS: COLLECTING</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Panel View 2: SQLite Buffer Architecture */}
                {cogniosTab === "buffer" && (
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow font-mono text-xs space-y-4">
                    <div className="text-[11px] text-amber-400 pb-2 border-b border-neutral-800">
                      {"// CogniOS Dual-Tier Sliding Database Schema"}
                    </div>
                    <pre className="text-[11px] leading-relaxed text-neutral-300 bg-neutral-950 p-4 border border-neutral-800 overflow-x-auto">
{`PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;

-- blackbox.db: Rolling 30-minute high-frequency ring buffer
CREATE TABLE IF NOT EXISTS telemetry_ring (
    timestamp REAL PRIMARY KEY,
    layer1_cpu_pct REAL,
    layer2_mem_rss INTEGER,
    layer3_io_wait REAL,
    layer4_sockets INTEGER,
    anomaly_flag INTEGER DEFAULT 0
);

-- Prunes samples older than 1800s in background worker thread
DELETE FROM telemetry_ring WHERE timestamp < (strftime('%s','now') - 1800);`}
                    </pre>
                    <p className="text-[11px] text-neutral-400">
                      High-frequency 500ms snapshots flushed to SQLite WAL without blocking incoming telemetry streams.
                    </p>
                  </div>
                )}
              </div>
            </article>


            {/* ── CASE STUDY 2: PhotowalaGift ── */}
            <article className="grid grid-cols-1 lg:grid-cols-12 border border-[var(--line)] bg-[var(--card-bg)] overflow-hidden">
              {/* Left Column: STAR Facts */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--line)]">
                <div>
                  <p className="case-number mb-3">02 / Live Production E-Commerce</p>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)] mb-3">
                    PhotowalaGift
                  </h3>
                  <p className="text-base font-semibold text-[var(--ink)] leading-snug mb-8">
                    Full-stack personalized gifting platform handling end-to-end checkout, payments, and admin operations.
                  </p>

                  <dl className="space-y-3 border-t border-[var(--line)] pt-5 text-xs">
                    <div className="grid grid-cols-12 gap-2 py-1 border-b border-[var(--line)] pb-2">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Situation</dt>
                      <dd className="col-span-9 text-[var(--muted)]">Custom gifting storefront required rapid photo uploads, instant previews, and trusted checkout.</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2 py-1 border-b border-[var(--line)] pb-2">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Task</dt>
                      <dd className="col-span-9 text-[var(--muted)]">Design, build, and deploy full PERN platform solo, handling legal business registrations (GST, FSSAI) and payments.</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2 py-1 border-b border-[var(--line)] pb-2">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Action</dt>
                      <dd className="col-span-9 text-[var(--muted)]">Built custom storefront, PASETO v4 token security, Razorpay webhooks, and Cloudinary CDN pipeline.</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2 py-1">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Result</dt>
                      <dd className="col-span-9 text-[var(--ink)] font-semibold">Live in production generating ₹84,250+/month with 100% reliable checkout and zero security incidents.</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-8 mt-6 border-t border-[var(--line)] text-xs font-mono font-bold">
                  <a
                    href="https://photowalagift.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--ink)] hover:text-amber-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open Live Storefront ↗</span>
                  </a>
                  <span className="text-[var(--muted)]">React 19 · Node.js · PostgreSQL · PASETO</span>
                </div>
              </div>

              {/* Right Column: Media Panel with Tab Switcher */}
              <div className="lg:col-span-7 flex flex-col bg-[var(--code-bg)] text-white">
                <div className="flex border-b border-neutral-800 bg-neutral-950 text-xs font-mono">
                  <button
                    onClick={() => setPhotowalaTab("revenue")}
                    className={`flex items-center gap-2 px-6 py-3.5 border-r border-neutral-800 transition-colors cursor-pointer ${
                      photowalaTab === "revenue"
                        ? "bg-neutral-900 text-amber-400 font-bold border-b-2 border-b-amber-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>01</span>
                    <span>Admin Revenue Dashboard</span>
                  </button>
                  <button
                    onClick={() => setPhotowalaTab("paseto")}
                    className={`flex items-center gap-2 px-6 py-3.5 border-r border-neutral-800 transition-colors cursor-pointer ${
                      photowalaTab === "paseto"
                        ? "bg-neutral-900 text-amber-400 font-bold border-b-2 border-b-amber-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>02</span>
                    <span>PASETO Auth Architecture</span>
                  </button>
                </div>

                {photowalaTab === "revenue" && (
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow font-mono text-xs space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-white font-bold">photowalagift_admin_metrics</span>
                      </div>
                      <span className="text-[10px] bg-emerald-950/60 text-emerald-400 px-2 py-0.5 border border-emerald-500/20">
                        LIVE IN PRODUCTION
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded bg-neutral-900 border border-neutral-800 space-y-1">
                        <span className="text-neutral-500 text-[10px]">MONTHLY RUN RATE</span>
                        <p className="text-2xl font-bold text-white">₹84,250</p>
                        <span className="text-emerald-400 text-[10px]">+14.2% vs last month</span>
                      </div>
                      <div className="p-4 rounded bg-neutral-900 border border-neutral-800 space-y-1">
                        <span className="text-neutral-500 text-[10px]">CHECKOUT SUCCESS RATE</span>
                        <p className="text-2xl font-bold text-white">99.8%</p>
                        <span className="text-neutral-400 text-[10px]">Razorpay Webhook Synced</span>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-300 flex items-center justify-between">
                      <span>Order Fulfillment: Shiprocket API</span>
                      <span className="text-amber-400 font-bold">PostgreSQL v16</span>
                    </div>
                  </div>
                )}

                {photowalaTab === "paseto" && (
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow font-mono text-xs space-y-4">
                    <div className="text-[11px] text-amber-400 pb-2 border-b border-neutral-800">
                      {"// PASETO v4 Symmetric Session Encryption (XChaCha20-Poly1305)"}
                    </div>
                    <pre className="text-[11px] leading-relaxed text-neutral-300 bg-neutral-950 p-4 border border-neutral-800 overflow-x-auto">
{`// Eliminates JWT "alg": "none" vulnerabilities
const token = await V4.encrypt(
  {
    sub: adminUser.id,
    role: "STORE_OWNER",
    issuedAt: new Date().toISOString(),
    exp: "2h"
  },
  SECRET_SYMMETRIC_KEY
);

// Decrypted and validated without header negotiation hazards`}
                    </pre>
                    <p className="text-[11px] text-neutral-400">
                      Replaced standard JWT with tamper-proof PASETO tokens to protect customer gift photos and payment claims.
                    </p>
                  </div>
                )}
              </div>
            </article>


            {/* ── CASE STUDY 3: WhatChat ── */}
            <article className="grid grid-cols-1 lg:grid-cols-12 border border-[var(--line)] bg-[var(--card-bg)] overflow-hidden">
              {/* Left Column: STAR Facts */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--line)]">
                <div>
                  <p className="case-number mb-3">03 / Real-Time 3D Web Application</p>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)] mb-3">
                    WhatChat
                  </h3>
                  <p className="text-base font-semibold text-[var(--ink)] leading-snug mb-8">
                    Instant socket-based communication with responsive 3D WebGL space backdrops.
                  </p>

                  <dl className="space-y-3 border-t border-[var(--line)] pt-5 text-xs">
                    <div className="grid grid-cols-12 gap-2 py-1 border-b border-[var(--line)] pb-2">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Situation</dt>
                      <dd className="col-span-9 text-[var(--muted)]">Traditional chat clients feel static and visually monotonous.</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2 py-1 border-b border-[var(--line)] pb-2">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Task</dt>
                      <dd className="col-span-9 text-[var(--muted)]">Deliver room-based instant messaging paired with 60FPS 3D animated backdrops.</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2 py-1 border-b border-[var(--line)] pb-2">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Action</dt>
                      <dd className="col-span-9 text-[var(--muted)]">Integrated Socket.io room messaging, Three.js 3D canvas, Framer Motion, and decoupled RAF loop.</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2 py-1">
                      <dt className="col-span-3 font-mono font-bold uppercase text-[var(--ink)]">Result</dt>
                      <dd className="col-span-9 text-[var(--ink)] font-semibold">Sub-50ms message latency with fluid 60FPS animation across both desktop and mobile.</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-8 mt-6 border-t border-[var(--line)] text-xs font-mono font-bold">
                  <a
                    href="https://github.com/ankitkumar25-rk/WhatChat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--ink)] hover:text-amber-500 transition-colors"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    <span>View Repository ↗</span>
                  </a>
                  <span className="text-[var(--muted)]">React 19 · Three.js · Socket.io · GSAP</span>
                </div>
              </div>

              {/* Right Column: Media Panel with Tab Switcher */}
              <div className="lg:col-span-7 flex flex-col bg-[var(--code-bg)] text-white">
                <div className="flex border-b border-neutral-800 bg-neutral-950 text-xs font-mono">
                  <button
                    onClick={() => setWhatChatTab("chat")}
                    className={`flex items-center gap-2 px-6 py-3.5 border-r border-neutral-800 transition-colors cursor-pointer ${
                      whatchatTab === "chat"
                        ? "bg-neutral-900 text-amber-400 font-bold border-b-2 border-b-amber-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>01</span>
                    <span>Real-Time Room Interface</span>
                  </button>
                  <button
                    onClick={() => setWhatChatTab("three")}
                    className={`flex items-center gap-2 px-6 py-3.5 border-r border-neutral-800 transition-colors cursor-pointer ${
                      whatchatTab === "three"
                        ? "bg-neutral-900 text-amber-400 font-bold border-b-2 border-b-amber-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>02</span>
                    <span>3D WebGL Space Canvas</span>
                  </button>
                </div>

                {whatchatTab === "chat" && (
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow font-mono text-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-blue-400 font-bold">room_engineering_space #general</span>
                      </div>
                      <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 border border-neutral-800">
                        WEBSOCKET ESTABLISHED
                      </span>
                    </div>

                    <div className="space-y-3 py-2">
                      <div className="flex items-start gap-2 max-w-[85%]">
                        <span className="px-1.5 py-0.5 bg-neutral-800 text-[10px] text-neutral-400 rounded">U1</span>
                        <div className="bg-neutral-900 border border-neutral-800 p-2 text-neutral-200">
                          Did you check the Three.js RAF decoupled loop?
                        </div>
                      </div>
                      <div className="flex items-start gap-2 max-w-[85%] ml-auto flex-row-reverse">
                        <span className="px-1.5 py-0.5 bg-amber-950 text-amber-400 text-[10px] rounded border border-amber-500/20">Ankit</span>
                        <div className="bg-neutral-900 border border-amber-950/60 p-2 text-neutral-200">
                          Yeah, locks solid at 60 FPS without DOM scroll lag!
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-500 flex justify-between">
                      <span>Type message...</span>
                      <span className="text-amber-500 font-bold">Send ↗</span>
                    </div>
                  </div>
                )}

                {whatchatTab === "three" && (
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow font-mono text-xs space-y-4">
                    <div className="text-[11px] text-amber-400 pb-2 border-b border-neutral-800">
                      {"// Decoupled Three.js Render Loop & Lerp Easing"}
                    </div>
                    <pre className="text-[11px] leading-relaxed text-neutral-300 bg-neutral-950 p-4 border border-neutral-800 overflow-x-auto">
{`function animate() {
  requestAnimationFrame(animate);

  // Smooth lerp: 10% step towards target scroll per tick
  currentScroll += (targetScroll - currentScroll) * 0.1;
  particlesMesh.rotation.y = currentScroll * Math.PI * 0.5;

  renderer.render(scene, camera);
}`}
                    </pre>
                    <p className="text-[11px] text-neutral-400">
                      Prevents window scroll event storming and preserves battery life on portable devices.
                    </p>
                  </div>
                )}
              </div>
            </article>

          </div>

          {/* Project Archive Trigger Button (Yogi's Exact Pattern) */}
          <div className="mt-14">
            <button
              onClick={() => setIsArchiveOpen(true)}
              className="w-full p-6 sm:p-8 border border-[var(--line)] bg-[var(--card-bg)] hover:bg-[var(--tab-bg)] transition-colors flex items-center justify-between text-left cursor-pointer group"
            >
              <div>
                <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
                  Project Archive
                </span>
                <span className="text-base sm:text-xl font-bold text-[var(--ink)] group-hover:text-amber-500 transition-colors">
                  Explore all projects, clients, and open source
                </span>
              </div>
              <span className="text-2xl font-mono text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-1 transition-all">
                ↗
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* Project Archive Modal */}
      <ProjectArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />
    </>
  );
}
