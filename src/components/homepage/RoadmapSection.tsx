"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MILESTONES } from "@/lib/constants";

export function RoadmapSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-4">
            <h2 className="text-heading text-3xl md:text-4xl font-semibold text-text-primary">
              A plan with an exit
            </h2>
            <p className="mt-4 text-body text-text-secondary max-w-md mx-auto">
              Two years, one narrow path, with explicit conditions for walking away.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {MILESTONES.map((phase, i) => (
            <ScrollReveal key={phase.name} delay={(i % 2) * 0.08}>
              <div className="h-full rounded-sm border border-white/[0.06] bg-white/[0.02] p-6 transition-[background-color,border-color] duration-200 hover:bg-white/[0.04] hover:border-white/[0.1]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
                    {phase.window}
                  </span>
                  <span className="rounded-full border border-white/[0.08] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
                    {phase.status}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">
                  {phase.name}
                </h3>
                <ul className="mt-3 space-y-2">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <span
                        className="mt-[7px] w-1 h-1 rounded-full bg-text-tertiary shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="mt-8 text-center">
            <a
              href="/roadmap"
              className="font-mono text-xs text-text-secondary hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-[color] duration-150"
            >
              Full roadmap and kill criteria →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
