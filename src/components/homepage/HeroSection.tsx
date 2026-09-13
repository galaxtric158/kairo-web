"use client";

import dynamic from "next/dynamic";
import { MathGrid } from "@/components/ui/MathGrid";
import { DoctorTerminal } from "@/components/ui/DoctorTerminal";

const CelestialCanvas = dynamic(
  () => import("@/components/three/CelestialCanvas"),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 animate-canvas-in">
        <CelestialCanvas />
      </div>
      <MathGrid className="z-[2] opacity-60" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-28 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="flex items-center gap-3 font-mono text-ui text-[11px] uppercase tracking-[0.2em] animate-hero-subtitle">
            <span
              aria-hidden="true"
              className="grid size-7 shrink-0 place-items-center border border-accent/40 bg-accent/[0.06] text-[13px] font-semibold tracking-normal text-accent"
            >
              K
            </span>
            <span className="text-text-primary">Kairo</span>
            <span className="text-text-tertiary" aria-hidden="true">
              ·
            </span>
            <span className="text-accent">Hardware Doctor</span>
          </p>
          <h1 className="mt-5 font-semibold text-display text-5xl sm:text-6xl md:text-7xl text-text-primary leading-[1.02] animate-hero-title">
            Why doesn&rsquo;t my hardware project work?
          </h1>
          <p
            className="mt-6 text-body text-lg text-text-secondary max-w-md animate-hero-subtitle"
            style={{ animationDelay: "0.1s" }}
          >
            Kairo inspects your hardware project, reads the device, finds the
            fault, and proves the fix.
          </p>
          <div
            className="mt-8 flex flex-wrap items-center gap-4 animate-hero-subtitle"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href="/docs"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-md text-ui text-[13px] text-text-primary hover:border-accent/40 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-[color,border-color,background-color] duration-150 active:scale-[0.97]"
            >
              Read the docs
            </a>
            <a
              href="/roadmap"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-ui text-[13px] text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-[color] duration-150 active:opacity-70"
            >
              See the 365-day plan
            </a>
          </div>
        </div>

        <div
          className="animate-hero-subtitle"
          style={{ animationDelay: "0.25s" }}
        >
          {/* TODO: hero workbench photo, 1600x1200 — dark bench, ESP32 with sensor wiring, landscape */}
          <DoctorTerminal className="shadow-[0_24px_64px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
    </section>
  );
}
