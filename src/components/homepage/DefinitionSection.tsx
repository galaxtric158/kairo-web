"use client";

import { MODEL_SPECS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const specs = [
  { label: "Vocabulary", value: MODEL_SPECS.vocabulary.toLocaleString(), accent: false },
  { label: "Context", value: `${MODEL_SPECS.maxSeqLen.toLocaleString()} tokens`, accent: false },
  { label: "Hidden", value: String(MODEL_SPECS.hiddenSize), accent: true },
  { label: "Activation", value: MODEL_SPECS.activation, accent: false },
  { label: "Normalization", value: MODEL_SPECS.normalization, accent: false },
  { label: "Positional", value: MODEL_SPECS.positionalEncoding, accent: true },
  { label: "Attention", value: MODEL_SPECS.attentionType, accent: false },
  { label: "Weight Tying", value: MODEL_SPECS.weightTying ? "Enabled" : "Disabled", accent: false },
];

export function DefinitionSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <ScrollReveal>
            <div className="rounded-sm border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.03]">
                <span className="w-2 h-2 rounded-full bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-white/10" />
                <span className="ml-2 text-[10px] font-mono text-text-tertiary uppercase tracking-widest">
                  kairo
                </span>
              </div>
              <p className="p-6 text-heading text-2xl md:text-3xl lg:text-4xl leading-snug text-text-primary font-light">
                A decoder-only transformer{" "}
                <span className="text-accent">
                  built from scratch
                  <span className="inline-block w-[2px] h-[1em] ml-0.5 bg-accent align-middle animate-cursor-blink" />
                </span>{" "}
                with no external model libraries.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="relative rounded-sm bg-white/[0.03] border border-white/[0.06] p-4 transition-colors duration-200 hover:bg-white/[0.05] hover:border-white/[0.1]"
                >
                  <div className="text-label text-[11px] font-mono text-text-tertiary uppercase mb-1">
                    {spec.label}
                  </div>
                  <div
                    className={`font-mono text-sm tabular-nums ${
                      spec.accent ? "text-accent" : "text-text-primary"
                    }`}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
