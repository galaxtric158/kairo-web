"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  { label: "Token", dim: "1", accent: false },
  { label: "Embed", dim: "16,384 → 256", accent: true },
  { label: "RoPE", dim: "256", accent: false },
  { label: "Attn", dim: "4 heads", accent: true },
  { label: "Add + Norm", dim: "256", accent: false },
  { label: "SwiGLU", dim: "256→640→256", accent: true },
  { label: "Add + Norm", dim: "256", accent: false },
  { label: "Output", dim: "256 → 16,384", accent: true },
];

export function MechanismSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-text-tertiary mb-4">
            Mechanism
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary">
            How Kairo processes a token
          </h2>
          <p className="mt-4 text-text-secondary max-w-lg">
            Each token passes through embedding, attention, and feed-forward layers
            before projecting back to the vocabulary.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12">
            {/* Desktop: horizontal flow */}
            <div className="hidden md:flex items-center gap-0 overflow-x-auto pb-4">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div className="border border-border rounded-sm bg-bg-glass px-4 py-3 min-w-[90px] text-center hover:border-border-hover transition-colors">
                      <div className="text-sm font-medium text-text-primary">
                        {step.label}
                      </div>
                      <div
                        className={`mt-1 font-mono text-xs ${
                          step.accent ? "text-accent" : "text-text-secondary"
                        }`}
                      >
                        {step.dim}
                      </div>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-8 h-px bg-border mx-1 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: wrapped flow */}
            <div className="md:hidden grid grid-cols-2 gap-3">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="border border-border rounded-sm bg-bg-glass px-4 py-3 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-text-tertiary font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {step.label}
                    </span>
                  </div>
                  <div
                    className={`mt-1 font-mono text-xs ${
                      step.accent ? "text-accent" : "text-text-secondary"
                    }`}
                  >
                    {step.dim}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
