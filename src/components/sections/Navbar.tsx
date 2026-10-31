import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon, ChevronDown, Rocket, ShieldCheck, Paintbrush, Tractor } from "lucide-react";
import Button from "@/components/ui/Button";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects", hasDropdown: true },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "Experience", href: "#experience" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    let rafScheduled = false;

    const handleScroll = () => {
      if (rafScheduled) return;
      rafScheduled = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);

        const sections = ["about", "projects", "tech-stack", "experience", "blog", "contact"];
        const current = sections.find((section) => {
          const el = document.getElementById(section);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        });
        setActiveSection(current || "");
        rafScheduled = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initialTheme = savedTheme || (systemPrefersLight ? "light" : "dark");
    setTheme(initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      document.documentElement.classList.toggle("light", nextTheme === "light");
      return nextTheme;
    });
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 w-full px-4 sm:px-6 md:px-8 flex justify-center pointer-events-none"
      >
        <div
          className={`portfolio-navbar w-full max-w-[95%] lg:max-w-6xl xl:max-w-7xl rounded-full border transition-all duration-300 pointer-events-auto flex items-center justify-between px-6 py-2.5 backdrop-blur-md ${
            scrolled
              ? "bg-neutral-950/75 border-neutral-800/60 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
              : "bg-neutral-950/30 border-neutral-900/20 shadow-sm"
          }`}
        >
          {/* Logo / Profile image */}
          <a
            href="#hero"
            className="relative flex items-center focus:outline-none"
          >
            <div className="relative h-8 w-8">
              <img
                src="/profile.png"
                alt="Ankit Kumar"
                className="h-full w-full rounded-full border border-neutral-800/80 [.light_&]:border-neutral-200/80 object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative py-1"
                onMouseEnter={() => item.hasDropdown && setDropdownOpen(true)}
                onMouseLeave={() => item.hasDropdown && setDropdownOpen(false)}
              >
                <a
                  href={item.href}
                  className={`nav-link flex items-center gap-1 text-sm font-medium transition-colors hover:text-white ${
                    activeSection === item.href.slice(1)
                      ? "active text-white font-semibold"
                      : "text-neutral-400"
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  )}
                </a>

                {activeSection === item.href.slice(1) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Dropdown Menu Inspired by the Reference Image */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="projects-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[460px] bg-neutral-950/95 border border-neutral-800/80 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-6 backdrop-blur-xl z-50 pointer-events-auto"
                      >
                        {/* Left Column: Engineering */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                            <Rocket className="h-3 w-3 text-amber-500" />
                            Core Engineering
                          </h4>
                          <div className="flex flex-col gap-2">
                            <a
                              href="#projects"
                              onClick={() => setDropdownOpen(false)}
                              className="group flex flex-col gap-0.5 p-2 rounded-xl hover:bg-neutral-900/40 transition-colors"
                            >
                              <span className="dropdown-item text-xs font-semibold text-white flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                                CogniOS
                              </span>
                              <span className="dropdown-desc text-[10px] text-neutral-500 leading-snug">
                                Open source system telemetry & anomaly detection pipeline.
                              </span>
                            </a>
                            <a
                              href="#projects"
                              onClick={() => setDropdownOpen(false)}
                              className="group flex flex-col gap-0.5 p-2 rounded-xl hover:bg-neutral-900/40 transition-colors"
                            >
                              <span className="dropdown-item text-xs font-semibold text-white flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                                WhatChat
                              </span>
                              <span className="dropdown-desc text-[10px] text-neutral-500 leading-snug">
                                Real-time chat client with dynamic 3D Space backdrops.
                              </span>
                            </a>
                          </div>
                        </div>

                        {/* Right Column: Creative Web */}
                        <div className="space-y-3 border-l border-neutral-900 pl-5">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                            <Paintbrush className="h-3 w-3 text-emerald-500" />
                            Creative Web
                          </h4>
                          <div className="flex flex-col gap-2">
                            <a
                              href="#projects"
                              onClick={() => setDropdownOpen(false)}
                              className="group flex flex-col gap-0.5 p-2 rounded-xl hover:bg-neutral-900/40 transition-colors"
                            >
                              <span className="dropdown-item text-xs font-semibold text-white flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                                EduMEasy
                              </span>
                              <span className="dropdown-desc text-[10px] text-neutral-500 leading-snug">
                                Premium e-commerce storefront for learning kits.
                              </span>
                            </a>
                            <a
                              href="#projects"
                              onClick={() => setDropdownOpen(false)}
                              className="group flex flex-col gap-0.5 p-2 rounded-xl hover:bg-neutral-900/40 transition-colors"
                            >
                              <span className="dropdown-item text-xs font-semibold text-white flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                                Tractor 3D
                              </span>
                              <span className="dropdown-desc text-[10px] text-neutral-500 leading-snug">
                                WebGL scroll-driven interactive tractor animation.
                              </span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Theme Toggle & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="icon-button p-2 rounded-full border border-neutral-800/80 bg-neutral-900/40 text-neutral-400 hover:text-white transition-all cursor-pointer flex items-center justify-center h-9 w-9 hover:border-neutral-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-violet-500" />
              )}
            </button>

            <button
              onClick={() => {
                const contact = document.getElementById("contact");
                contact?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cta-button px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-neutral-950 hover:bg-neutral-200 transition-all cursor-pointer shadow-sm flex items-center gap-1"
            >
              Let's talk
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="icon-button p-2 rounded-full border border-neutral-850 bg-neutral-900/20 text-neutral-400 hover:text-white transition-all cursor-pointer flex items-center justify-center h-9 w-9 hover:border-neutral-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-violet-500" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="icon-button flex h-9 w-9 items-center justify-center rounded-full border border-neutral-850 bg-neutral-900/20 text-neutral-400 hover:text-white focus:outline-none cursor-pointer hover:border-neutral-700"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-overlay fixed inset-x-4 top-20 z-40 bg-neutral-950/95 border border-neutral-900/80 backdrop-blur-xl px-6 py-6 rounded-3xl md:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-5">
              {navItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`mobile-nav-link text-md font-medium transition-colors hover:text-white ${
                    activeSection === item.href.slice(1)
                      ? "active text-white font-semibold"
                      : "text-neutral-400"
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-4 border-t border-neutral-900"
              >
                <Button
                  variant="neon"
                  className="w-full justify-center rounded-full bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] border-amber-500/20"
                  onClick={() => {
                    setIsOpen(false);
                    const contact = document.getElementById("contact");
                    contact?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get In Touch
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
