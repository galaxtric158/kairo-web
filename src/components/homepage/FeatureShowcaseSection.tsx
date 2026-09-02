"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";

const featureCards = [
  {
    title: "RMSNorm",
    description:
      "Root Mean Square Normalization — faster than LayerNorm, equally effective. Stabilizes training from the first gradient.",
    accent: false,
  },
  {
    title: "RoPE",
    description:
      "Rotary Position Embeddings encode sequence position directly into attention scores. No learned positional parameters.",
    accent: true,
  },
  {
    title: "SwiGLU",
    description:
      "Gated linear units with SiLU activation — the modern replacement for ReLU in transformer FFN layers. Better gradient flow.",
    accent: false,
  },
];

export function FeatureShowcaseSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="text-label text-[11px] font-mono uppercase text-text-tertiary mb-4">
              Core Components
            </div>
            <ScrollKineticText
              text="Built from first principles"
              className="text-heading text-3xl md:text-4xl font-semibold text-text-primary"
              splitBy="words"
              direction="up"
              stagger={0.08}
            />
            <p className="mt-4 text-body text-text-secondary max-w-lg mx-auto">
              Every component chosen for a reason. Every implementation understood
              completely.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featureCards.map((card, i) => (
              <div
                key={card.title}
                className="group relative rounded-sm border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.1]"
              >
                <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.04),transparent_70%)]" />
                <h3
                  className={`relative z-10 text-lg font-semibold mb-3 ${
                    card.accent ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {card.title}
                </h3>
                <p className="relative z-10 text-sm text-text-secondary leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
