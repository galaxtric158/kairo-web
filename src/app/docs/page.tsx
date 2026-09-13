import { PageWrapper } from "@/components/layout/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs. Kairo.",
  description:
    "How Kairo will work: the diagnosis loop, the starting stack, and honest answers.",
};

const faqs = [
  {
    q: "Are you training your own model?",
    a: "No. The model is a replaceable component: whatever frontier model reasons best that month. The product is the system around it: project representation, deterministic checks, device integrations, and verification.",
  },
  {
    q: "Which hardware does it start with?",
    a: "ESP32 boards, PlatformIO projects, and the Arduino framework. One ecosystem, understood completely, before anything else. Raspberry Pi, MicroPython, and ESP-IDF follow only after the loop is proven.",
  },
  {
    q: "Who is it for?",
    a: "Serious hobbyists, students, and beginner-to-intermediate makers who can build projects but get stuck where hardware meets software. Not complete beginners, not enterprise teams.",
  },
  {
    q: "What does it cost?",
    a: "Nothing exists to charge for yet. The plan is freemium: free diagnostics with limits, paid tiers for heavier use. But pricing is unvalidated and undecided until users get value first.",
  },
  {
    q: "Can software really diagnose hardware?",
    a: "Only the software-visible half: configuration conflicts, wrong addresses, library faults, brownout patterns in logs. Loose wires and dead sensors need eyes and hands. Kairo says so explicitly instead of guessing.",
  },
  {
    q: "What happens if a big lab builds this?",
    a: "Then the verification layer, the failure dataset, and the workflow integrations are what survive. That is why the system, not the model, is the product from day one.",
  },
];

export default function DocsPage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
            Documentation
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg text-lg">
            How Kairo will work, written down before it exists, so the build
            can be held to it.
          </p>

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">
              Questions, answered honestly
            </h2>
            <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-6">
                  <h3 className="text-base font-semibold text-text-primary">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary max-w-2xl">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 font-mono text-xs text-text-tertiary">
              Status: concept documentation. It will be rewritten the day the
              prototype contradicts it.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
