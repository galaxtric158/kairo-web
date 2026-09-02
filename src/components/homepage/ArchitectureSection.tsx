"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MODEL_SPECS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const layers = Array.from({ length: MODEL_SPECS.layers }, (_, i) => i + 1);

export function ArchitectureSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-text-tertiary mb-4">
                Architecture
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-text-primary">
                8 layers of computation
              </h2>
              <p className="mt-4 text-text-secondary">
                Each layer transforms the representation through attention and
                feed-forward processing, building understanding from raw tokens.
              </p>
              <div className="mt-8 space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-text-secondary">
                    {MODEL_SPECS.attentionHeads} attention heads
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-text-secondary">
                    {MODEL_SPECS.hiddenSize} hidden dimensions
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-text-secondary">
                    {MODEL_SPECS.ffnIntermediate} FFN intermediate
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-text-secondary">
                    {MODEL_SPECS.activation} activation
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="relative">
                {/* Vertical connecting line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

                <div className="space-y-2">
                  {layers.map((layer) => (
                    <div
                      key={layer}
                      className={cn(
                        "relative pl-14 border border-border rounded-sm",
                        "bg-bg-glass backdrop-blur-sm",
                        "flex items-center justify-between px-6 py-3",
                        "hover:border-border-hover hover:bg-bg-tertiary/50 transition-all duration-200",
                        "group cursor-default"
                      )}
                    >
                      {/* Layer number on the line */}
                      <div className="absolute left-3 w-6 h-6 rounded-full border border-border bg-bg-primary flex items-center justify-center">
                        <span className="font-mono text-[10px] text-text-tertiary">
                          {layer}
                        </span>
                      </div>

                      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                        Transformer Block
                      </span>

                      <div className="flex items-center gap-4 font-mono text-xs text-text-tertiary">
                        <span className="hidden sm:inline">
                          {MODEL_SPECS.attentionHeads} heads
                        </span>
                        <span className="hidden sm:inline">
                          {MODEL_SPECS.ffnIntermediate} FFN
                        </span>
                        <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                          {MODEL_SPECS.hiddenSize}d
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
