"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { IMPLEMENTED_FEATURES } from "@/lib/constants";

export function CurrentStateSection() {
  return (
    <section className="py-20 md:py-28 bg-bg-secondary">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-text-tertiary mb-4">
            Current State
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary">
            What exists
          </h2>
          <p className="mt-4 text-text-secondary max-w-lg">
            The core model architecture is fully implemented and validated.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IMPLEMENTED_FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 px-4 py-3 border border-border rounded-sm bg-bg-glass hover:border-border-hover transition-colors"
              >
                <svg
                  className="w-4 h-4 text-accent shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-sm text-text-primary">{feature}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
