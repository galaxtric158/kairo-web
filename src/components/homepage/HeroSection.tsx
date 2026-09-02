"use client";

import dynamic from "next/dynamic";
import { MODEL_SPECS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const ParticleField = dynamic(
  () =>
    import("@/components/three/ParticleField").then((mod) => mod.ParticleField),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <ScrollReveal delay={0.2} y={30}>
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-text-tertiary mb-8">
            Decoder-Only Transformer
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4} y={40}>
          <h1 className="font-mono text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] text-text-primary leading-none">
            KAIRO
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.6} y={20}>
          <div className="mt-8 flex items-center justify-center gap-6 font-mono text-sm text-text-secondary">
            <span className="tabular-nums">
              {MODEL_SPECS.parameterCount.toLocaleString()} parameters
            </span>
            <span className="text-text-tertiary">·</span>
            <span>{MODEL_SPECS.layers} layers</span>
            <span className="text-text-tertiary">·</span>
            <span>{MODEL_SPECS.attentionHeads} heads</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.8} y={15}>
          <p className="mt-6 text-text-secondary max-w-lg mx-auto leading-relaxed">
            Built from scratch using PyTorch primitives.
            <br />
            No external model libraries.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1.0} y={10}>
          <div className="mt-12 flex items-center justify-center gap-1 text-text-tertiary">
            <span className="text-xs font-mono tracking-wider">Scroll</span>
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent z-10" />
    </section>
  );
}
