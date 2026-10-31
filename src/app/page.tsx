"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TractorScene from "@/components/sections/TractorScene";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Loader from "@/components/ui/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Theme is handled by the blocking inline script in layout.tsx — no useEffect needed here.

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col min-h-screen"
        >
          <Navbar />

          <main className="flex-grow">
            {/* 1. Intro + profile photo */}
            <Hero />

            {/* 2. 3D Tractor scroll animation section */}
            <TractorScene />

            {/* 3. About — personal story */}
            <About />

            {/* 5. Projects */}
            <Projects />

            {/* Tech Stack */}
            <TechStack />

            {/* 6. Experience timeline */}
            <Experience />

            {/* 7. Blog / Engineering Field Notes */}
            <Blog />

            {/* 8. Contact */}
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}
