"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MODEL_SPECS } from "@/lib/constants";

export function ScaleSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 coord-lines opacity-50" />

      <div className="relative max-w-[1200px] mx-auto px-6 text-center">
        <ScrollReveal>
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-text-tertiary mb-8">
            Parameters
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <AnimatedCounter
            value={MODEL_SPECS.parameterCount}
            duration={2.5}
            className="text-7xl sm:text-8xl md:text-9xl font-mono font-semibold text-text-primary tracking-tight"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-8 text-text-secondary max-w-md mx-auto">
            Every parameter placed intentionally. Small enough to understand
            completely, large enough to be meaningful.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { label: "Layers", value: MODEL_SPECS.layers },
              { label: "Heads", value: MODEL_SPECS.attentionHeads },
              { label: "Hidden", value: MODEL_SPECS.hiddenSize },
              { label: "FFN", value: MODEL_SPECS.ffnIntermediate },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-3xl md:text-4xl font-medium text-accent tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-mono text-text-tertiary uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
