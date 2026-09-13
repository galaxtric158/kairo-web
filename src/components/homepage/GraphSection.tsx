"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const nodes = [
  { label: "code", detail: "firmware · configs" },
  { label: "pins", detail: "GPIO claims" },
  { label: "parts", detail: "sensors · motors" },
  { label: "libraries", detail: "pinned versions" },
  { label: "telemetry", detail: "serial · scans" },
  { label: "history", detail: "fixes that held" },
];

const moat = [
  "Structured knowledge of the whole system, not one file at a time",
  "Deterministic checks that work with no model at all",
  "Verification runs that prove a fix on hardware",
  "A growing record of failures, evidence, and fixes that held",
];

export function GraphSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-bg-secondary">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <ScrollReveal>
          <h2 className="text-heading text-3xl md:text-4xl font-semibold text-text-primary">
            The model is replaceable. The system is not.
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-md">
            Kairo keeps one structured picture of your project: code, pins,
            parts, libraries, telemetry, history, and reasons over the
            relationships between them. Swap GPT for Claude for Gemini; the
            picture and the proof stay.
          </p>
          <ul className="mt-8 space-y-3">
            {moat.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                <span
                  className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          {/* TODO: ESP32 devkit pin macro photo — pairs with the project-graph diagram */}
          <div
            className="rounded-sm border border-white/[0.08] bg-[#0d0d0d]/80 p-6 sm:p-8"
            role="img"
            aria-label="Diagram of the project graph: one project node connected to code, pins, parts, libraries, telemetry, and history."
          >
            <div className="text-center">
              <span className="inline-block rounded-sm border border-accent/40 bg-accent/[0.08] px-4 py-2 font-mono text-sm text-accent">
                project
              </span>
            </div>
            <div
              className="mx-auto my-4 h-8 w-px bg-white/[0.12]"
              aria-hidden="true"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {nodes.map((node) => (
                <div
                  key={node.label}
                  className="rounded-sm border border-white/[0.06] bg-white/[0.02] px-3 py-3 text-center transition-[background-color,border-color] duration-200 hover:bg-white/[0.04] hover:border-white/[0.1]"
                >
                  <div className="font-mono text-[13px] text-text-primary">
                    {node.label}
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-text-tertiary">
                    {node.detail}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center font-mono text-[11px] text-text-tertiary">
              one picture · every relationship · persistent memory
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
