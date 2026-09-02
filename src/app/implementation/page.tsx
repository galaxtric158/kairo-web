import { PageWrapper } from "@/components/layout/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementation. Kairo-10M.",
  description: "How Kairo-10M is implemented from PyTorch primitives.",
};

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

export default function ImplementationPage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
            Implementation
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg text-lg">
            How Kairo is built from PyTorch primitives with no external model libraries.
          </p>

          <div className="mt-16 space-y-16">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                Design Principles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-border rounded-sm bg-bg-glass p-6">
                  <h3 className="font-mono text-sm text-accent mb-2">Transparency</h3>
                  <p className="text-sm text-text-secondary">
                    Every component is visible and understandable. No black boxes.
                  </p>
                </div>
                <div className="border border-border rounded-sm bg-bg-glass p-6">
                  <h3 className="font-mono text-sm text-accent mb-2">Simplicity</h3>
                  <p className="text-sm text-text-secondary">
                    Built from the simplest possible PyTorch operations.
                  </p>
                </div>
                <div className="border border-border rounded-sm bg-bg-glass p-6">
                  <h3 className="font-mono text-sm text-accent mb-2">Correctness</h3>
                  <p className="text-sm text-text-secondary">
                    Validated against known transformer behaviors.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                Model Class
              </h2>
              <div className="bg-bg-secondary border border-border rounded-sm overflow-hidden max-w-2xl">
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
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
