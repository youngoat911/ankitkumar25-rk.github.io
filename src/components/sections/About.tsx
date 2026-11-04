"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Badge from "@/components/ui/Badge";
import SpotlightCard from "@/components/animations/SpotlightCard";
import { User, ShieldAlert, Cpu, Heart, Landmark, Headphones } from "lucide-react";

// High-performance RAF counter
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const rafRef = useRef<number>(0);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(step);
      }
    };

    rafRef.current = window.requestAnimationFrame(step);

    // Cancel animation if component unmounts mid-animation
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono text-3xl font-extrabold text-amber-400 glow-text-gold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const skillCategories = [
  {
    title: "Engineering Roots",
    icon: <Cpu className="h-5 w-5 text-emerald-400" />,
    skills: [
      { name: "React 19", variant: "indigo" },
      { name: "Next.js", variant: "indigo" },
      { name: "Tailwind CSS", variant: "indigo" },
      { name: "Framer Motion", variant: "indigo" },
    ],
  },
  {
    title: "Heavy-Duty Backend",
    icon: <Landmark className="h-5 w-5 text-amber-400" />,
    skills: [
      { name: "Node.js / Express v5", variant: "violet" },
      { name: "PostgreSQL / Prisma", variant: "violet" },
      { name: "PASETO Auth", variant: "violet" },
      { name: "Python", variant: "violet" },
    ],
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any },
    },
  };

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden bg-neutral-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-3.5 py-1 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4">
            <User className="h-3.5 w-3.5" />
            My Journey
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Plowing Fields, Writing Systems
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
        >
          {/* Left Column: Summary */}
          <motion.div variants={itemVariants} className="md:col-span-6 flex flex-col justify-center min-w-0">
            <h3 className="text-2xl font-bold text-white mb-6">
              From the fields of Rajasthan to the labs at IIT Jodhpur.
            </h3>
            <div className="space-y-6 text-neutral-300 text-sm md:text-base leading-relaxed">
              <p>
                I grew up in rural Rajasthan, in a farming family. No CS background at
                home, no one to tell me what to
                learn first — I picked up coding the same way I picked up most things
                growing up: figuring it out myself, one mistake at a time.
              </p>
              <p>
                I'm currently a B.Tech student at IIT Jodhpur. Coding
                started as a side thing — I placed 2nd at the Boot-Up Hackathon run by
                DevLup Labs at IIT Jodhpur, and that's what pulled me into building for
                real. Since then I've built and shipped PhotowalaGift, a live gifting
                e-commerce platform, and Achaarwaala, a D2C pickle brand I run alongside
                it — handling everything from the checkout flow to FSSAI registration
                myself. I'm currently contributing to CogniOS, an open-source
                system-telemetry project, through DevLup Labs' Summer of Code.
              </p>
              <p>
                I support the ideology of Sidhu Moosewala and Bhagat Singh. Beyond the music and history, what stuck with me is how they stood firm in their roots and never tried to compromise to fit in. That's roughly how I think about building too — do the work well, stay true to where you come from, and don't pretend to be something you're not.
              </p>
            </div>

            {/* Fun Stats Counters Container */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-emerald-950/60">
              <div className="flex flex-col">
                <Counter value={2} />
                <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider mt-1">
                  Live Products Shipped
                </span>
              </div>
              <div className="flex flex-col">
                <Counter value={4} />
                <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider mt-1">
                  Telemetry Layers (CogniOS)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Skills / Badges */}
          <motion.div variants={itemVariants} className="md:col-span-6 flex flex-col gap-6 min-w-0">
            <h3 className="text-xl font-semibold text-white mb-2">Technical Engine Spec</h3>
            
            <div className="flex flex-col gap-6">
              {skillCategories.map((category, idx) => (
                <SpotlightCard
                  key={idx}
                  className="bg-neutral-900/10 border-emerald-950/60 p-5 hover:border-emerald-800/40 transition-all duration-300"
                  spotlightColor="rgba(16, 185, 129, 0.04)"
                  borderColor="rgba(212, 175, 55, 0.15)"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-neutral-950/60 border border-emerald-950/60">
                      {category.icon}
                    </div>
                    <h4 className="font-semibold text-white text-base">
                      {category.title}
                    </h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <Badge
                        key={sIdx}
                        variant={skill.variant as any}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </SpotlightCard>
              ))}

              {/* Compact Music Taste Widget */}
              <SpotlightCard
                className="bg-neutral-900/10 border-emerald-950/60 p-5 hover:border-emerald-800/40 transition-all duration-300"
                spotlightColor="rgba(245, 158, 11, 0.04)"
                borderColor="rgba(212, 175, 55, 0.15)"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-neutral-950/60 border border-emerald-950/60 text-amber-400">
                    <Headphones className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-white text-base">Currently On Repeat</h4>
                </div>
                
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">Sidhu Moosewala</span>
                      <span className="text-[9px] bg-amber-950/60 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono">
                        The GOAT
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">Navaan Sandhu</span>
                      <span className="text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                        Majha Vibes
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">jxggi</span>
                      <span className="text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                        Lyricist
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">Seema Mishra (Rajasthani old song) </span>
                      <span className="text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                        Golden Classic
                      </span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
