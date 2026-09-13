"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const pains = [
  {
    title: "The code looks right. The device disagrees.",
    description:
      "It compiles. The logic reads clean. The sensor stays silent, the motor never turns, and nothing tells you which layer lied.",
  },
  {
    title: "Chatbots can't see your bench.",
    description:
      "Paste code into a general assistant and it guesses. It never saw your platformio.ini, your pin map, your bus scan, or your serial log.",
  },
  {
    title: "Debugging eats the project.",
    description:
      "Weekends lost to swapped SDA/SCL, wrong I2C addresses, brownout resets, and one GPIO claimed by two components at once.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-heading text-3xl md:text-4xl font-semibold text-text-primary max-w-xl">
            Software answers. Hardware asks harder questions.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScrollReveal className="md:row-span-2">
            <div className="h-full rounded-sm border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 transition-[background-color,border-color] duration-200 hover:bg-white/[0.04] hover:border-white/[0.1]">
              <div
                className="w-1.5 h-1.5 rounded-full border border-accent/50"
                aria-hidden="true"
              />
              <h3 className="mt-4 text-2xl font-semibold text-text-primary leading-snug">
                {pains[0]!.title}
              </h3>
              <p className="mt-3 text-body text-text-secondary leading-relaxed">
                {pains[0]!.description}
              </p>
            </div>
          </ScrollReveal>
          {pains.slice(1).map((pain, i) => (
            <ScrollReveal key={pain.title} delay={(i + 1) * 0.08}>
              <div className="rounded-sm border border-white/[0.06] bg-white/[0.02] p-6 transition-[background-color,border-color] duration-200 hover:bg-white/[0.04] hover:border-white/[0.1]">
                <div
                  className="w-1.5 h-1.5 rounded-full border border-accent/50"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-semibold text-text-primary leading-snug">
                  {pain.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {pain.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
