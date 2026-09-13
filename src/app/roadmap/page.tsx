import { PageWrapper } from "@/components/layout/PageWrapper";
import { MILESTONES, KILL_CRITERIA } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap. Kairo.",
  description:
    "The 365-day plan: falsify, inspect, close the loop, understand, plus the kill criteria for walking away.",
};

export default function RoadmapPage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
            Roadmap
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg text-lg">
            Two years, one narrow path. Each phase must earn the next one.
            The exit conditions are written down in advance.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {MILESTONES.map((phase) => (
              <div
                key={phase.name}
                className="rounded-sm border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
                    {phase.window}
                  </span>
                  <span className="rounded-full border border-white/[0.08] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
                    {phase.status}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-text-primary">
                  {phase.name}
                </h2>
                <ul className="mt-3 space-y-2">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <span
                        className="mt-[7px] w-1 h-1 rounded-full bg-text-tertiary shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-3xl rounded-sm border border-accent/25 bg-accent/[0.04] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-text-primary">
              Kill criteria
            </h2>
            <p className="mt-2 text-text-secondary">
              If any of these trigger, the idea gets abandoned or radically
              changed. No sunk-cost negotiations.
            </p>
            <ul className="mt-6 space-y-3">
              {KILL_CRITERIA.map((criterion, i) => (
                <li key={criterion} className="flex items-start gap-4">
                  <span className="font-mono text-[11px] text-accent tabular-nums shrink-0 mt-1">
                    K{i + 1}
                  </span>
                  <span className="text-sm text-text-secondary">{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
