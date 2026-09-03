"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";

const featureCards = [
  {
    title: "RMSNorm",
    description:
      "Root Mean Square Normalization, faster than LayerNorm and equally effective. Stabilizes training from the first gradient.",
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
      "Gated linear units with SiLU activation, the modern replacement for ReLU in transformer FFN layers. Better gradient flow.",
    accent: false,
  },
];

export function FeatureShowcaseSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <ScrollReveal>
              <ScrollKineticText
                text="Built from first principles"
                className="text-heading text-3xl md:text-4xl font-semibold text-text-primary"
                splitBy="words"
                direction="up"
                stagger={0.08}
              />
              <p className="mt-4 text-body text-text-secondary">
                Every component chosen for a reason. Every implementation understood
                completely.
              </p>
            </ScrollReveal>
          </div>

          <div className="md:col-span-8">
            <ScrollReveal delay={0.15}>
              <div className="space-y-4">
                {featureCards.map((card) => (
                  <div
                    key={card.title}
                    className="relative rounded-sm border border-white/[0.06] bg-white/[0.03] p-6 transition-[background-color,border-color] duration-300 hover:bg-white/[0.05] hover:border-white/[0.1]"
                  >
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        card.accent ? "text-accent" : "text-text-primary"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
