"use client";

import React, { useState, useCallback, useSyncExternalStore } from "react";
import { Sun, Moon, ArrowUpRight, Menu, X } from "lucide-react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): "dark" | "light" {
  return typeof document !== "undefined" && document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

function getServerSnapshot(): "dark" | "light" {
  return "dark";
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const isLight = document.documentElement.classList.contains("light");
    const nextTheme = isLight ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Expertise", href: "#expertise" },
    { name: "Background", href: "#background" },
    { name: "Writing", href: "#writing" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-8">
        
        {/* Left: Brand Monogram & Sub-title */}
        <div className="flex items-center gap-6">
          <a
            href="#top"
            className="flex items-center text-lg font-black tracking-tighter hover:opacity-80 transition-opacity"
            aria-label="Ankit Kumar - Back to top"
          >
            <span>AK</span>
            <span className="text-[var(--accent)] px-0.5">/</span>
            <span>K</span>
          </a>

          <span className="hidden md:inline-block text-xs font-mono font-medium text-[var(--muted)] tracking-wider uppercase border-l border-[var(--line)] pl-6">
            Full-Stack Developer · IIT Jodhpur
          </span>
        </div>

        {/* Desktop Navigation Links - Swiss Border Grid Style */}
        <nav className="hidden lg:flex items-stretch h-[72px]" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="inline-flex items-center justify-center px-6 text-xs font-bold uppercase tracking-wider text-[var(--muted)] border-l border-[var(--line)] hover:bg-[var(--line)] hover:text-[var(--ink)] transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center px-5 border-l border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--line)] transition-colors cursor-pointer"
            aria-label="Toggle light/dark theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-[var(--ink)]" />
            )}
          </button>

          {/* Contact Inverted Action Button */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-7 text-xs font-bold uppercase tracking-wider bg-[var(--action)] text-[var(--action-text)] hover:bg-[var(--action-hover)] border-l border-[var(--line)] transition-colors"
          >
            <span>Contact</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 border border-[var(--line)] rounded text-[var(--muted)] hover:text-[var(--ink)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-3 py-2 border border-[var(--line)] text-xs font-bold tracking-wider uppercase"
            aria-expanded={isOpen}
          >
            <span>Menu</span>
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-[var(--line)] bg-[var(--paper)] px-6 py-6 space-y-4">
          <div className="flex flex-col divide-y divide-[var(--line)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-sm font-bold tracking-wider uppercase text-[var(--ink)] flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[var(--muted)]">↗</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="py-4 mt-2 text-center text-xs font-bold uppercase tracking-wider bg-[var(--action)] text-[var(--action-text)] block"
            >
              Get In Touch ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
