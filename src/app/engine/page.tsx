import { PageWrapper } from "@/components/layout/PageWrapper";
import { DIAGNOSIS_LOOP } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engine. Kairo.",
  description:
    "How Kairo diagnoses a hardware project: inspect, understand, observe, diagnose, fix, verify, with the device confirming every fix.",
};

export default function EnginePage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
            Engine
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg text-lg">
            A diagnosis loop that ends in proof. The model inside it is
            replaceable. GPT, Claude, Gemini, whatever is best that month.
            What you are looking at is everything around it.
          </p>

          <div className="mt-16 space-y-4 max-w-3xl">
            {DIAGNOSIS_LOOP.map((stage) => (
              <div
                key={stage.label}
                className="rounded-sm border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-xl font-semibold text-text-primary">
                    {stage.label}
                  </h2>
                  <span className="font-mono text-[11px] text-accent shrink-0">
                    {stage.dim}
                  </span>
                </div>
                <p className="mt-2 text-text-secondary max-w-2xl">
                  {stage.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-3xl rounded-sm border border-accent/25 bg-accent/[0.04] p-6">
            <h2 className="font-mono text-sm text-accent">
              The verification rule
            </h2>
            <p className="mt-2 text-text-secondary">
              A fix counts only when the device confirms it. Rebuild, reflash,
              re-observe. Otherwise the loop runs again. This single rule is
              what separates an engineering environment from a chatbot with a
              serial cable.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
