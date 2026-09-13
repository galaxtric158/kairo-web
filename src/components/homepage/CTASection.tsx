"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* TODO: maker-bench strip photo above the CTA — oscilloscope or multimeter detail */}
      <div className="absolute inset-0 coord-lines opacity-30" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="text-heading text-3xl md:text-4xl font-semibold text-text-primary">
            Stuck on a sensor right now?
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-md mx-auto">
            Kairo is still a thesis becoming a prototype. Read how it will
            work, or hold it accountable to the plan.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
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
        </ScrollReveal>
      </div>
    </section>
  );
}
