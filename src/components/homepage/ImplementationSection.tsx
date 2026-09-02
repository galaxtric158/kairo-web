"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";

const codeSnippet = `class Kairo(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.embedding = nn.Embedding(
            config.vocab_size, config.hidden_size
        )
        self.layers = nn.ModuleList([
            TransformerBlock(config)
            for _ in range(config.num_layers)
        ])
        self.norm = RMSNorm(config.hidden_size)
        self.lm_head = nn.Linear(
            config.hidden_size,
            config.vocab_size,
            bias=False
        )
        # Weight tying
        self.lm_head.weight = self.embedding.weight`;

const highlights = [
  { label: "Weight-tied embedding and output" },
  { label: "Causal self-attention" },
  { label: "RoPE positional encoding" },
];

export function ImplementationSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <ScrollKineticText
            text="Built from primitives"
            className="text-heading text-3xl md:text-4xl font-semibold text-text-primary"
            splitBy="words"
            direction="up"
            stagger={0.08}
          />
          <p className="mt-4 text-body text-text-secondary max-w-lg">
            No external model libraries. Every component implemented using
            pure PyTorch operations.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 bg-bg-secondary border border-border rounded-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="w-2.5 h-2.5 rounded-full bg-text-tertiary/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-text-tertiary/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-text-tertiary/30" />
              <span className="ml-3 text-xs text-text-tertiary font-mono">
                kairo/model.py
              </span>
            </div>
            <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
              <code>
                {codeSnippet.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-text-tertiary w-8 shrink-0 select-none text-right mr-6">
                      {i + 1}
                    </span>
                    <span className="text-text-primary">{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 flex flex-wrap gap-6">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm text-text-secondary">{h.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
