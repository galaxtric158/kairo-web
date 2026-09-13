import { PageWrapper } from "@/components/layout/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture. Kairo.",
  description:
    "The system around the model: project graph, diagnosis engine, device integrations, verification, and memory.",
};

const layers = [
  {
    name: "Project graph",
    text: "One structured picture of the whole system: code, pins, parts, libraries, telemetry, history, and the relationships between them. Everything the agent knows lives here, not scattered across chat turns.",
  },
  {
    name: "Diagnosis engine",
    text: "Deterministic checks first (pin conflicts, bus scans, library faults), then one model call over a structured evidence bundle. Every claim must cite a log line, a scan result, or a config diff.",
  },
  {
    name: "Device integrations",
    text: "Build systems, flashers, serial monitors, and bus scanners the loop can drive itself: PlatformIO runs, I2C scans, and serial captures without copy-paste.",
  },
  {
    name: "Verification",
    text: "The loop closes only on device evidence. Rebuild, reflash, re-observe. A fix that the hardware does not confirm is not a fix.",
  },
  {
    name: "Memory",
    text: "Project history persists across sessions: what broke, what evidence decided it, which fixes held. The dataset this creates is the long-term moat.",
  },
];

export default function ArchitecturePage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
            Architecture
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg text-lg">
            The product is the engineering system, not the underlying model.
            Five layers, each earning its place.
          </p>

          <div className="mt-16 space-y-4 max-w-3xl">
            {layers.map((layer) => (
              <div
                key={layer.name}
                className="rounded-sm border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <h2 className="text-xl font-semibold text-text-primary">
                  {layer.name}
                </h2>
                <p className="mt-2 text-text-secondary max-w-2xl">
                  {layer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
