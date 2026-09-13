"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const status = [
  {
    label: "Thesis",
    state: "Decided",
    tone: "done" as const,
    text: "An AI engineering environment for physical computing. The model is replaceable; verification is the product.",
  },
  {
    label: "Starting stack",
    state: "Decided",
    tone: "done" as const,
    text: "ESP32, PlatformIO, and the Arduino framework. One ecosystem until the loop works.",
  },
  {
    label: "Falsification plan",
    state: "Decided",
    tone: "done" as const,
    text: "Thirty days of intentionally broken builds to test whether structured context beats pasted logs.",
  },
  {
    label: "CLI prototype",
    state: "Planned",
    tone: "todo" as const,
    text: "Inspect a PlatformIO project, read serial output, run five deterministic checks, propose one fix.",
  },
  {
    label: "Closed loop",
    state: "Planned",
    tone: "todo" as const,
    text: "Modify, compile, flash, observe, retry, with the device confirming every fix.",
  },
  {
    label: "Users · revenue",
    state: "None yet",
    tone: "todo" as const,
    text: "No prototype, no users, no benchmarks, no revenue. That is the honest starting line.",
  },
];

export function CurrentStateSection() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-heading text-3xl md:text-4xl font-semibold text-text-primary">
              Where this actually stands
            </h2>
            <p className="mt-4 text-body text-text-secondary max-w-lg">
              No inflated claims. Decided, planned, and missing, labeled as such.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {status.map((item, i) => (
            <ScrollReveal key={item.label} delay={(i % 3) * 0.08}>
              <div className="rounded-sm border border-white/[0.06] bg-white/[0.02] p-6 transition-[background-color,border-color] duration-200 hover:bg-white/[0.04] hover:border-white/[0.1]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]",
                      item.tone === "done"
                        ? "border-accent/30 bg-accent/[0.06] text-accent"
                        : "border-white/[0.08] text-text-tertiary"
                    )}
                  >
                    {item.state}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
