"use client";

import React, { useEffect } from "react";
import { X, Settings } from "lucide-react";
import Tractor3D from "@/components/animations/Tractor3D";

interface TractorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TractorModal({ isOpen, onClose }: TractorModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[88vh] flex flex-col border border-[var(--line-dark)] bg-[var(--paper)] text-[var(--ink)] shadow-2xl overflow-hidden rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)] bg-[var(--paper)] shrink-0">
          <div>
            <p className="section-code">HARDWARE / ROOTS / 3D WEBGL</p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--ink)]">
              5911 Tractor Engine Room<span className="text-[var(--accent)]">.</span>
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

        {/* 3D Canvas Body */}
        <div className="relative flex-grow bg-[#090a09] overflow-hidden flex items-center justify-center">
          <Tractor3D initialScale={1.1} autoRotateSpeed={0.4} interactive={true} />

          {/* Floating Instructions Banner */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none bg-black/80 border border-neutral-800 p-3 max-w-xs text-xs font-mono text-neutral-300 backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
              <Settings className="h-3.5 w-3.5 animate-spin" />
              <span>Interactive 3D Simulation</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Click &amp; drag to rotate 360°. Inspect mechanical suspension, dual rear cleats, and exhaust stroke.
            </p>
          </div>

          {/* Sidhu Moosewala Tribute Pill */}
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none bg-black/80 border border-neutral-800 p-3 max-w-xs text-right backdrop-blur-xs">
            <p className="text-[11px] italic font-serif text-neutral-300 leading-snug">
              &ldquo;Dil da ni maada, tera Sidhu Moose Wala.&rdquo;
            </p>
            <span className="block text-[9px] font-mono text-amber-400 mt-1 uppercase tracking-widest font-bold">
              — Udaipurwati &amp; Punjab Roots
            </span>
          </div>
        </div>

        {/* Technical Footer Spec Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-[var(--line)] divide-x divide-[var(--line)] bg-[var(--paper)] text-xs font-mono shrink-0">
          <div className="p-3">
            <span className="text-[var(--muted)] block text-[10px] uppercase">Engine Platform</span>
            <strong className="text-[var(--ink)]">HMT 5911 Diesel</strong>
          </div>
          <div className="p-3">
            <span className="text-[var(--muted)] block text-[10px] uppercase">Render Core</span>
            <strong className="text-[var(--ink)]">WebGL / Three.js</strong>
          </div>
          <div className="p-3">
            <span className="text-[var(--muted)] block text-[10px] uppercase">Frame Budget</span>
            <strong className="text-[var(--ink)]">60 FPS Locked</strong>
          </div>
          <div className="p-3">
            <span className="text-[var(--muted)] block text-[10px] uppercase">Philosophy</span>
            <strong className="text-[var(--ink)]">Zero Shortcuts</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
