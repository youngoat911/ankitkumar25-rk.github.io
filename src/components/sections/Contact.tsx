"use client";

import React, { useState } from "react";
import { ArrowUpRight, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all fields before sending.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formspreeId || formspreeId === "YOUR_FORM_ID") {
      // Fallback to mailto link if formspree is not configured
      window.location.href = `mailto:ankitgia336@gmail.com?subject=Contact from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(formData.message + "\n\nEmail: " + formData.email)}`;
      setStatus("success");
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage("Something went wrong. Please email directly at ankitgia336@gmail.com");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network issue. Please email directly at ankitgia336@gmail.com");
    }
  };

  return (
    <section id="contact" className="w-full border-b border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        
        {/* Section Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[var(--line)]">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-2">06 / Start a conversation</p>
            <h2 className="display-title">
              Let&apos;s build something useful<span className="dot">.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Have a product in mind, a system to architect, or want to collaborate? Tell me what you&apos;re working on and where you need a hand.
            </p>
          </div>
        </div>

        {/* Contact Body: Action Grid & Direct Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Quick Actions & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                Direct Channels
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed font-mono">
                Available for software engineering roles, telemetry &amp; backend architecture, and high-impact client products.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:ankitgia336@gmail.com"
                className="yogi-button yogi-button-primary w-full justify-between text-xs uppercase font-bold"
              >
                <span>Email: ankitgia336@gmail.com</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/ankit-kumar-478316378/"
                target="_blank"
                rel="noopener noreferrer"
                className="yogi-button yogi-button-secondary w-full justify-between text-xs uppercase font-bold"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

            </div>

            <div className="p-6 border border-[var(--line)] bg-[var(--tab-bg)] text-xs font-mono space-y-2">
              <span className="text-[10px] uppercase text-[var(--muted)] block font-bold">
                Location &amp; Academic Base
              </span>
              <p className="text-[var(--ink)] font-bold">
                Indian Institute of Technology Jodhpur
              </p>
              <p className="text-[var(--muted)]">
                Based in India
              </p>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 border border-[var(--line)] bg-[var(--card-bg)] p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[var(--muted)] uppercase tracking-wider font-bold">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full p-3 bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[var(--muted)] uppercase tracking-wider font-bold">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full p-3 bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-[var(--muted)] uppercase tracking-wider font-bold">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Ankit, let's talk about..."
                  className="w-full p-3 bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--ink)] resize-y"
                />
              </div>

              {status === "error" && (
                <p className="text-red-500 font-bold">{errorMessage}</p>
              )}

              {status === "success" && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Message delivered! I will reply within 24 hours.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="yogi-button yogi-button-primary w-full text-xs uppercase font-bold"
              >
                {status === "submitting" ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Official Profiles Bar (Yogi's Exact Pattern) */}
        <div className="mt-16 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <span className="font-bold uppercase tracking-wider text-[var(--muted)]">
            Official profiles
          </span>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://github.com/youngoat911"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-500 transition-colors font-bold flex items-center gap-1"
            >
              <span>GitHub</span>
              <span>↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ankit-kumar-478316378/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-500 transition-colors font-bold flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <span>↗</span>
            </a>
            <a
              href="mailto:ankitgia336@gmail.com"
              className="hover:text-amber-500 transition-colors font-bold flex items-center gap-1"
            >
              <span>Email</span>
              <span>↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
