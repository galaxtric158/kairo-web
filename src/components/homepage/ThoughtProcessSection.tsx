"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";
import { CircuitBoard } from "@/components/ui/circuit-board";
import { MODEL_SPECS } from "@/lib/constants";

export function ThoughtProcessSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-bg-secondary">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <ScrollReveal>
            <ScrollKineticText
              text="Thought as computation"
              className="text-heading text-3xl md:text-4xl font-semibold text-text-primary"
              splitBy="words"
              direction="left"
              distance={30}
              stagger={0.1}
            />
            <p className="mt-6 text-body text-text-secondary max-w-md">
              Every token flows through {MODEL_SPECS.layers} layers of attention
              and feed-forward processing. Data enters, gets transformed, and
              emerges as understanding.
            </p>
            <div className="mt-8 space-y-3 font-mono text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent" />
                <span className="text-text-secondary">
                  {MODEL_SPECS.attentionHeads} attention heads per layer
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent" />
                <span className="text-text-secondary">
                  {MODEL_SPECS.hiddenSize}d hidden representations
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent" />
                <span className="text-text-secondary">
                  Causal masking for autoregressive generation
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex justify-center">
              <CircuitBoard
                nodes={[
                  { id: "input", x: 60, y: 50, label: "Tokens", status: "active", size: "sm" },
                  { id: "embed", x: 60, y: 150, label: "Embed", status: "active", size: "md" },
                  { id: "rope", x: 60, y: 250, label: "RoPE", status: "processing", size: "md" },
                  { id: "attn1", x: 220, y: 100, label: "Head 1", status: "active", size: "sm" },
                  { id: "attn2", x: 220, y: 180, label: "Head 2", status: "active", size: "sm" },
                  { id: "attn3", x: 220, y: 260, label: "Head 3", status: "processing", size: "sm" },
                  { id: "attn4", x: 220, y: 340, label: "Head 4", status: "active", size: "sm" },
                  { id: "merge", x: 380, y: 200, label: "Merge", status: "active", size: "md" },
                  { id: "ffn", x: 380, y: 310, label: "SwiGLU", status: "processing", size: "md" },
                  { id: "norm", x: 520, y: 200, label: "Norm", status: "active", size: "md" },
                  { id: "output", x: 520, y: 320, label: "Output", status: "active", size: "sm" },
                ]}
                connections={[
                  { from: "input", to: "embed", animated: true },
                  { from: "embed", to: "rope", animated: true },
                  { from: "rope", to: "attn1", animated: true },
                  { from: "rope", to: "attn2", animated: true },
                  { from: "rope", to: "attn3", animated: true },
                  { from: "rope", to: "attn4", animated: true },
                  { from: "attn1", to: "merge", animated: true },
                  { from: "attn2", to: "merge", animated: true },
                  { from: "attn3", to: "merge", animated: true },
                  { from: "attn4", to: "merge", animated: true },
                  { from: "merge", to: "norm", animated: true },
                  { from: "merge", to: "ffn", animated: true },
                  { from: "ffn", to: "norm", animated: true },
                  { from: "norm", to: "output", animated: true },
                ]}
                width={580}
                height={380}
                pulseSpeed={2.5}
                traceWidth={1.5}
                variant="dark"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
