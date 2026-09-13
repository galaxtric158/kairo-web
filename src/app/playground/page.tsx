import { PageWrapper } from "@/components/layout/PageWrapper";
import { DoctorTerminal } from "@/components/ui/DoctorTerminal";
import { COMMON_FAULTS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prototype preview. Kairo.",
  description:
    "What a Kairo diagnosis session will look like: three example faults, one illustrated terminal run.",
};

export default function PlaygroundPage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
              Prototype preview
            </h1>
            <span className="rounded-full border border-white/[0.1] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
              Concept
            </span>
          </div>
          <p className="mt-4 text-text-secondary max-w-lg text-lg">
            No live product yet. Below is what a diagnosis session is designed
            to look like: three real fault shapes, one illustrated run.
          </p>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <DoctorTerminal />
            <div className="space-y-4">
              {COMMON_FAULTS.map((fault) => (
                <div
                  key={fault.title}
                  className="rounded-sm border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <h2 className="text-base font-semibold text-text-primary">
                    {fault.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {fault.description}
                  </p>
                  <div className="mt-3 font-mono text-[11px] text-accent">
                    {fault.signal}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 font-mono text-xs text-text-tertiary max-w-lg">
            The interactive CLI arrives with the 30-90 day milestone. Until
            then, the plan is the product: read the docs or the roadmap.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href="/docs"
              className="font-mono text-xs text-text-secondary hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-[color] duration-150"
            >
              Read the docs →
            </a>
            <a
              href="/roadmap"
              className="font-mono text-xs text-text-secondary hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-[color] duration-150"
            >
              See the plan →
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
