import { PageWrapper } from "@/components/layout/PageWrapper";
import type { Metadata } from "next";
import { MODEL_SPECS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Model. Kairo-10M.",
  description: "Complete model specifications for Kairo-10M.",
};

const allSpecs = [
  { label: "Architecture", value: MODEL_SPECS.architecture },
  { label: "Parameters", value: MODEL_SPECS.parameters },
  { label: "Vocabulary", value: MODEL_SPECS.vocabulary.toLocaleString() },
  { label: "Max Sequence Length", value: `${MODEL_SPECS.maxSeqLen.toLocaleString()} tokens` },
  { label: "Hidden Size", value: String(MODEL_SPECS.hiddenSize) },
  { label: "Layers", value: String(MODEL_SPECS.layers) },
  { label: "Attention Heads", value: String(MODEL_SPECS.attentionHeads) },
  { label: "Head Dimension", value: String(MODEL_SPECS.headDim) },
  { label: "FFN Intermediate", value: String(MODEL_SPECS.ffnIntermediate) },
  { label: "Normalization", value: MODEL_SPECS.normalization },
  { label: "Normalization Eps", value: String(MODEL_SPECS.normalizationEps) },
  { label: "Activation", value: MODEL_SPECS.activation },
  { label: "Positional Encoding", value: MODEL_SPECS.positionalEncoding },
  { label: "Attention Type", value: MODEL_SPECS.attentionType },
  { label: "Attention Bias", value: MODEL_SPECS.attentionBias ? "Yes" : "No" },
  { label: "Weight Tying", value: MODEL_SPECS.weightTying ? "Enabled" : "Disabled" },
];

export default function ModelPage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
            Model Specifications
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg text-lg">
            Complete technical specifications for the Kairo-10M model.
          </p>

          <div className="mt-16 max-w-3xl">
            <div className="space-y-0">
              {allSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between py-4 border-b border-border"
                >
                  <span className="text-sm text-text-secondary">{spec.label}</span>
                  <span className="font-mono text-sm text-text-primary tabular-nums">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
