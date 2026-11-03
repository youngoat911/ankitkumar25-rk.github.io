"use client";

import React from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Expertise from "@/components/sections/Expertise";
import Background from "@/components/sections/Background";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--paper)] text-[var(--ink)] transition-colors duration-150">
      <ScrollProgress />
      <Navbar />

      <main className="flex-grow">
        {/* 01 / Player profile */}
        <Hero />

        {/* 02 / Project log */}
        <Projects />

        {/* 03 / Skill set */}
        <Expertise />

        {/* 04 / Background */}
        <Background />

        {/* 05 / Field notes */}
        <Blog />

        {/* 06 / Start a conversation */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
