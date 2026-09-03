"use client";

import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";
import { MODEL_SPECS } from "@/lib/constants";
import { AttentionInteraction } from "@/components/ui/AttentionInteraction";

const ArchitectureViz = dynamic(
  () =>
    import("@/components/three/ArchitectureViz").then(
      (mod) => mod.ArchitectureViz
    ),
  { ssr: false }
);

const specs = [
  { label: "Attention heads", value: MODEL_SPECS.attentionHeads },
  { label: "Hidden dimensions", value: MODEL_SPECS.hiddenSize },
  { label: "FFN intermediate", value: MODEL_SPECS.ffnIntermediate },
  { label: "Activation", value: MODEL_SPECS.activation },
];

export function ArchitectureSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <ScrollReveal>
              <ScrollKineticText
                text="8 layers of computation"
                className="text-3xl md:text-4xl font-semibold text-text-primary"
                splitBy="words"
                direction="up"
                stagger={0.08}
              />
              <p className="mt-4 text-text-secondary">
                Each layer transforms the representation through attention and
                feed-forward processing, building understanding from raw tokens.
              </p>
              <div className="mt-8 space-y-4 font-mono text-sm">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-center gap-3">
                    <div className="w-8 h-px bg-accent" />
                    <span className="text-text-secondary">
                      {spec.value} {spec.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-7">
            <ScrollReveal delay={0.2}>
              <ArchitectureViz />
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-16">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Attention heads
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Each head learns different relationships. Select one to explore its connections.
            </p>
            <AttentionInteraction />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
