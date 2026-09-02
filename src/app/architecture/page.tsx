import { PageWrapper } from "@/components/layout/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture. Kairo-10M.",
  description: "Interactive architecture deep-dive for the Kairo-10M transformer model.",
};

export default function ArchitecturePage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
            Architecture
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg text-lg">
            A deep-dive into the Kairo-10M transformer architecture.
          </p>

          <div className="mt-16 space-y-16">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                Decoder-Only Transformer
              </h2>
              <p className="text-text-secondary max-w-2xl">
                Kairo uses a decoder-only architecture, the same family as GPT.
                Each token attends to all previous tokens through causal self-attention,
                building contextual representations layer by layer.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                Layer Structure
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-border rounded-sm bg-bg-glass p-6">
                  <h3 className="font-mono text-sm text-accent mb-2">Multi-Head Attention</h3>
                  <p className="text-sm text-text-secondary">
                    4 attention heads with 64-dimensional heads. Each head learns different
                    relational patterns between tokens.
                  </p>
                </div>
                <div className="border border-border rounded-sm bg-bg-glass p-6">
                  <h3 className="font-mono text-sm text-accent mb-2">SwiGLU Feed-Forward</h3>
                  <p className="text-sm text-text-secondary">
                    Gated feed-forward network expanding from 256 to 640 dimensions,
                    using the SwiGLU activation for better gradient flow.
                  </p>
                </div>
                <div className="border border-border rounded-sm bg-bg-glass p-6">
                  <h3 className="font-mono text-sm text-accent mb-2">RoPE</h3>
                  <p className="text-sm text-text-secondary">
                    Rotary Positional Embeddings encode position information through
                    rotation matrices, enabling length generalization.
                  </p>
                </div>
                <div className="border border-border rounded-sm bg-bg-glass p-6">
                  <h3 className="font-mono text-sm text-accent mb-2">RMSNorm</h3>
                  <p className="text-sm text-text-secondary">
                    Root Mean Square Normalization stabilizes training by normalizing
                    activations without mean centering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
