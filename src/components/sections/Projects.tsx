"use client";

import React, { useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import ProjectArchiveModal from "@/components/modals/ProjectArchiveModal";

const projects = [
  {
    name: "Inventory",
    category: "Gymkhana Equipment Management",
    description: "Full-stack inventory platform for managing equipment, borrowers, transfers, audits, maintenance, and operational alerts.",
    highlights: ["PASETO auth, Argon2 hashing, and scoped roles", "Immutable audit logs and asset workflows", "PostgreSQL, Docker, Vitest, and Supertest"],
    tech: "Node.js · Express · React · Vite · PostgreSQL",
    repo: "https://github.com/youngoat911/Inventory",
    live: "https://inventory-dmqk.onrender.com/",
  },
  {
    name: "Texter",
    category: "PDF-to-Text VS Code Extension",
    description: "Converts PDFs into structured text and Markdown using native text extraction with OCR fallback and merged results.",
    highlights: ["PDF.js and Tesseract.js extraction pipeline", "Workspace and multi-file conversion workflows", "Visual preview, worker pool, and collision handling"],
    tech: "TypeScript · VS Code API · PDF.js · Tesseract.js",
    repo: "https://github.com/youngoat911/Texter",
  },
  {
    name: "BrinX",
    category: "IIT Jodhpur Task Exchange",
    description: "Peer-to-peer campus platform where students post requests, complete tasks, submit proof, and earn reputation.",
    highlights: ["Google OAuth and IITJ identity validation", "Task bidding, teams, urgent tasks, and proof review", "Reputation, notifications, and user preferences"],
    tech: "JavaScript · Node.js · Express · MongoDB",
    repo: "https://github.com/youngoat911/BrinX-new",
  },
  {
    name: "FreshScan",
    category: "AI & IoT Produce Freshness",
    description: "Combines environmental sensors, computer vision, and AI analysis to estimate produce freshness, ripeness, and shelf life.",
    highlights: ["Gemini Vision image analysis and freshness scoring", "Arduino telemetry streamed over Socket.IO", "Scan history, OAuth, and protected user data"],
    tech: "React · Vite · Node.js · MongoDB · Socket.IO · Gemini",
    repo: "https://github.com/youngoat911/freshscan",
    live: "https://freshscan-eosin.vercel.app",
  },
  {
    name: "EduMEasy",
    category: "Educational Commerce",
    description: "E-commerce and content platform for Math Labs and Math Kits sold to schools across India.",
    highlights: ["Product catalog, checkout, and order workflows", "Payment support and cloud media management", "Validation, rate limiting, and security headers"],
    tech: "React · Vite · Node.js · PostgreSQL · Prisma · PASETO",
    repo: "https://github.com/youngoat911/edumeasy_site",
    live: "https://edumeasy-site.vercel.app/",
  },
  {
    name: "WhatChat",
    category: "Real-Time Chat",
    description: "Room-based messaging application with instant communication and an animated interface.",
    highlights: ["Live messaging with Socket.IO", "Room and username joining flow", "React client with Node.js backend"],
    tech: "React · Node.js · Express · Socket.IO · Tailwind CSS",
    repo: "https://github.com/youngoat911/WhatChat",
    live: "https://what-chat-chi.vercel.app",
  },
  {
    name: "Virtual Lab",
    category: "Interactive Educational Laboratory",
    description: "School experiment learning platform with chapters, simulations, diagrams, practice activities, and experiment results.",
    highlights: ["Class-specific content and experiment workflows", "English and Hindi internationalization", "3D viewer support and structured experiment data"],
    tech: "TypeScript · React · Vite · Node.js · SQL · Three.js",
    repo: "https://github.com/youngoat911/virtual_lab",
    live: "https://virtual-lab-g6lj.vercel.app",
  },
  {
    name: "Portfolio",
    category: "Personal Website",
    description: "Developer portfolio with interactive 3D experiences, responsive project showcases, and a blog reader.",
    highlights: ["Interactive Three.js tractor experience", "Theme support, animations, and responsive layouts", "Formspree contact and GitHub Pages deployment"],
    tech: "Next.js · React · TypeScript · Three.js · Tailwind CSS",
    repo: "https://github.com/youngoat911/ankitkumar25-rk.github.io",
    live: "https://youngoat.dev",
  },
];

export default function Projects() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <>
      <section id="work" className="w-full border-b border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 pb-8 border-b border-[var(--line)]">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-2">02 / Project log</p>
              <h2 className="display-title">
                Selected projects<span className="dot">.</span>
              </h2>
            </div>
            <p className="lg:col-span-4 text-sm text-[var(--muted)] leading-relaxed">
              Products and tools across campus operations, developer workflows, AI and IoT, education, and real-time communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--line)] bg-[var(--card-bg)]">
            {projects.map((project, index) => (
              <article
                key={project.name}
                className={`flex flex-col p-6 sm:p-8 ${index % 2 === 0 ? "md:border-r" : ""} border-[var(--line)] ${index >= 2 ? "border-t" : ""}`}
              >
                <p className="case-number mb-3">
                  {String(index + 1).padStart(2, "0")} / {project.category}
                </p>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                  {project.description}
                </p>
                <ul className="mt-5 space-y-2 text-xs text-[var(--muted)]">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span className="text-[var(--accent)]" aria-hidden="true">+</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 pt-4 border-t border-[var(--line)] text-[10px] font-mono text-[var(--muted)]">
                  {project.tech}
                </p>
                <div className="flex flex-wrap gap-4 mt-5 text-xs font-mono font-bold">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--ink)] hover:text-amber-500 transition-colors"
                  >
                    Repository <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--ink)] hover:text-amber-500 transition-colors"
                    >
                      Live demo <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setIsArchiveOpen(true)}
              className="yogi-button yogi-button-secondary text-xs uppercase font-bold"
            >
              <span>More projects</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      <ProjectArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />
    </>
  );
}
