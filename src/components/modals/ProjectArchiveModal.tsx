"use client";

import React, { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";

interface ProjectArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const archiveProjects = [
  {
    year: "2026",
    title: "CogniOS (DevLup Labs)",
    category: "Open Source / Systems",
    tech: ["Python", "SQLite", "psutil", "Isolation Forest"],
    link: "https://github.com/devlup-labs/CogniOS",
    description: "4-layer system telemetry daemon and rolling SQLite circular buffer anomaly detection pipeline.",
  },
  {
    year: "2025",
    title: "PhotowalaGift",
    category: "Production E-Commerce",
    tech: ["React 19", "Node.js", "PostgreSQL", "Prisma", "Razorpay", "PASETO"],
    link: "https://photowalagift.online",
    description: "Live commercial personalized gifting platform with secure admin dashboard and Razorpay checkout.",
  },
  {
    year: "2025",
    title: "WhatChat",
    category: "Full-Stack / 3D Web",
    tech: ["React 19", "Three.js", "Socket.io", "Tailwind CSS", "GSAP"],
    link: "https://github.com/ankitkumar25-rk/WhatChat",
    description: "Real-time room chat application with dynamic Three.js canvas animations and fluid transitions.",
  },
  {
    year: "2025",
    title: "YT-Clone Backend",
    category: "Backend / Infrastructure",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "Cloudinary", "Multer"],
    link: "https://github.com/ankitkumar25-rk/yt-clone",
    description: "Video sharing platform backend with MongoDB aggregation pipelines, authentication, and Cloudinary storage.",
  },
  {
    year: "2025",
    title: "EduMEasy",
    category: "Client Work / E-Commerce",
    tech: ["MERN Stack", "Tailwind CSS", "Payment API"],
    link: "#",
    description: "Modernized educational learning kit storefront migrated from legacy WordPress to full React/Node architecture.",
  },
  {
    year: "2025",
    title: "Achaarwaala D2C",
    category: "Entrepreneurship / D2C",
    tech: ["Next.js", "FSSAI Compliance", "Logistics Integration"],
    link: "#",
    description: "Direct-to-consumer artisanal pickle brand, handling legal trademarks, FSSAI registration, and logistics.",
  },
  {
    year: "2024",
    title: "Boot-Up Hackathon",
    category: "Competition / 2nd Place",
    tech: ["Full-Stack", "Rapid Prototyping"],
    link: "#",
    description: "Placed 2nd at the DevLup Labs 36-hour hackathon at IIT Jodhpur, sparking full-stack engineering focus.",
  },
];

export default function ProjectArchiveModal({ isOpen, onClose }: ProjectArchiveModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[88vh] flex flex-col border border-[var(--line-dark)] bg-[var(--paper)] text-[var(--ink)] shadow-2xl overflow-hidden rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--line)] bg-[var(--paper)] shrink-0">
          <div>
            <p className="section-code">PROJECT ARCHIVE / CATALOG</p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--ink)]">
              All Projects &amp; Open Source<span className="text-[var(--accent)]">.</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-[var(--line)] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[var(--line)] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Close</span>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable List */}
        <div className="overflow-y-auto px-6 py-6 divide-y divide-[var(--line)]">
          {archiveProjects.map((project, idx) => (
            <div
              key={idx}
              className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[var(--tab-bg)] px-3 -mx-3 transition-colors"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[var(--muted)]">
                    {project.year}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--line)] text-[var(--muted)]">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--ink)]">
                  {project.title}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-[var(--muted)] bg-[var(--line)] px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yogi-button yogi-button-secondary text-xs h-9 px-4 shrink-0 self-start md:self-auto"
                >
                  <span>View Repository / Live</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
