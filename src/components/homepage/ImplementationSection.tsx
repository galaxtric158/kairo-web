"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

export function ImplementationSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-text-tertiary mb-4">
                Implementation
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-text-primary">
                Built from primitives
              </h2>
              <p className="mt-4 text-text-secondary">
                No external model libraries. Every component implemented using
                pure PyTorch operations.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm text-text-secondary">
                  Weight-tied embedding and output
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm text-text-secondary">
                  Causal self-attention
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm text-text-secondary">
                  RoPE positional encoding
                </span>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="bg-bg-secondary border border-border rounded-sm overflow-hidden">
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
          </div>
        </div>
      </div>
    </section>
  );
}
