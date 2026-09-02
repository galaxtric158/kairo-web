"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MODEL_SPECS } from "@/lib/constants";

export function DefinitionSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-7">
            <ScrollReveal>
              <p className="text-2xl md:text-3xl leading-relaxed text-text-primary font-light">
                A decoder-only transformer implemented{" "}
                <span className="text-text-secondary">completely from scratch</span>{" "}
                using PyTorch primitives.
              </p>
            </ScrollReveal>
          </div>

          <div className="md:col-span-5 flex flex-col justify-end">
            <ScrollReveal delay={0.2}>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-text-tertiary">Vocabulary</span>
                  <span className="text-text-primary tabular-nums">
                    {MODEL_SPECS.vocabulary.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-text-tertiary">Context</span>
                  <span className="text-text-primary tabular-nums">
                    {MODEL_SPECS.maxSeqLen.toLocaleString()} tokens
                  </span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-text-tertiary">Hidden</span>
                  <span className="text-text-primary tabular-nums">
                    {MODEL_SPECS.hiddenSize}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-tertiary">Activation</span>
                  <span className="text-text-primary">
                    {MODEL_SPECS.activation}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
