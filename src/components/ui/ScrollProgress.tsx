"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [legStep, setLegStep] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const pct = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
          setProgress(pct);
          setLegStep(Math.floor(scrollY / 18) % 2 === 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none h-1 bg-[var(--line)]"
      aria-hidden="true"
    >
      {/* Running Progress Bar Line */}
      <div
        className="h-full bg-[var(--ink)] transition-all duration-75 ease-out"
        style={{ width: `${progress * 100}%` }}
      />

      {/* Running Pixel Dino / Tractor Icon */}
      <div
        className="absolute -top-6 text-[var(--ink)] transition-all duration-75 ease-out"
        style={{
          left: `calc(${progress * 100}% - 14px)`,
          transform: "scale(0.85)",
        }}
      >
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7"
          shapeRendering="crispEdges"
          fill="currentColor"
        >
          {/* Dino Head & Torso */}
          <path d="M18 2h10v2h2v9h-4v2h-7v4h-4v3h-4v-2H8v-2H5v-2H2v-3H0v-3h2v2h3v2h3v2h7V7h3zM21 17h3v2h-3z" />
          {/* Eye */}
          <path fill="var(--paper)" d="M25 5h2v2h-2zM25 11h5v2h-5z" />
          {/* Alternate Running Legs */}
          {legStep ? (
            <path d="M11 21h4v6h-2v3H9v-2h2zM19 19h4v7h-2v4h-4v-2h2z" />
          ) : (
            <path d="M11 21h4v7h-2v2H9v-3h2zM19 19h4v6h-2v5h-4v-2h2z" />
          )}
        </svg>
      </div>
    </div>
  );
}

