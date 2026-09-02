import { PageWrapper } from "@/components/layout/PageWrapper";
import type { Metadata } from "next";
import { ROADMAP_ITEMS, IMPLEMENTED_FEATURES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Roadmap. Kairo-10M.",
  description: "Project roadmap and future plans for Kairo-10M.",
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
            What has been built and what comes next.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-6">
                Implemented
              </h2>
              <div className="space-y-3">
                {IMPLEMENTED_FEATURES.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-text-secondary"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-text-tertiary mb-6">
                Future
              </h2>
              <div className="space-y-3">
                {ROADMAP_ITEMS.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 text-sm text-text-tertiary"
                  >
                    <div className="w-1.5 h-1.5 rounded-full border border-text-tertiary/40 shrink-0" />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
