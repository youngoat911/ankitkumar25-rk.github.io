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
    title: "CogniOS",
    category: "Open Source Contribution",
    tech: ["Streamlit", "PySide6", "Groq", "Linux"],
    link: "https://github.com/devlup-labs/CogniOS",
    description: "Contributed the unified frontend and platform experience, including dashboard views, AI-assisted diagnostics, Linux controls, and BlackBox module documentation.",
  },
  {
    year: "2026",
    title: "Netra",
    category: "Productivity / AI",
    tech: ["React", "Node.js", "Express", "MongoDB", "Google APIs", "Gemini"],
    link: "https://github.com/youngoat911/Netra",
    description: "Productivity application integrating Gmail data, timetable information, notifications, OAuth, and Gemini-powered services.",
  },
  {
    year: "2026",
    title: "Von Neumann Architecture",
    category: "Interactive Visualization",
    tech: ["TypeScript", "React"],
    link: "https://github.com/youngoat911/von-neumaan_arch",
    description: "Interactive web visualization exploring the Von Neumann computer architecture.",
  },
  {
    year: "2025",
    title: "YT Clone",
    category: "Backend Learning Project",
    tech: ["Node.js", "Express.js", "JavaScript"],
    link: "https://github.com/youngoat911/yt-clone",
    description: "Backend-focused project for practicing Node.js and Express.js application development.",
  },
  {
    year: "2025",
    title: "Database, Node.js, C & NumPy",
    category: "Learning Repositories",
    tech: ["SQL", "Node.js", "C", "NumPy"],
    link: "https://github.com/youngoat911",
    description: "Small repositories documenting ongoing practice with databases, Node.js, C programming, and numerical computing.",
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
