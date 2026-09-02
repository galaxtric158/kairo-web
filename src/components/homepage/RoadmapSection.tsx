"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ROADMAP_ITEMS, IMPLEMENTED_FEATURES } from "@/lib/constants";

export function RoadmapSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-text-tertiary mb-4">
            Roadmap
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary">
            What comes next
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Implemented */}
          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-6">
                Implemented
              </h3>
              <div className="space-y-3">
                {IMPLEMENTED_FEATURES.slice(0, 8).map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-text-secondary"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    {item}
                  </div>
                ))}
                <div className="text-xs text-text-tertiary font-mono mt-2">
                  +{IMPLEMENTED_FEATURES.length - 8} more
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Future */}
          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-text-tertiary mb-6">
                Future
              </h3>
              <div className="space-y-3">
                {ROADMAP_ITEMS.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 text-sm text-text-tertiary"
                  >
                    <div className="w-1.5 h-1.5 rounded-full border border-text-tertiary/40" />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
