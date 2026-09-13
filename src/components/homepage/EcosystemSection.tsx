"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { STARTING_STACK } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function EcosystemSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-heading text-3xl md:text-4xl font-semibold text-text-primary max-w-xl">
            Depth in one stack before breadth in all of them.
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-lg">
            One board family and a handful of sensors, understood completely.
            Everything else follows only after the loop is proven.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STARTING_STACK.map((item, i) => (
            <ScrollReveal key={item.name} delay={(i % 3) * 0.08}>
              <div
                className={cn(
                  "rounded-sm border p-6 transition-[background-color,border-color] duration-200",
                  item.active
                    ? "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.12]"
                    : "border-white/[0.05] bg-transparent opacity-70"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
                    {item.role}
                  </span>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]",
                      item.active
                        ? "border-accent/30 bg-accent/[0.06] text-accent"
                        : "border-white/[0.08] text-text-tertiary"
                    )}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
