"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";
import {
  NewsletterBookshelf,
  type NewsletterBookshelfItem,
} from "@/components/ui/newsletter-bookshelf";
import { IMPLEMENTED_FEATURES } from "@/lib/constants";

const featureBooks: NewsletterBookshelfItem[] = IMPLEMENTED_FEATURES.map(
  (feature, i) => ({
    id: `feature-${i}`,
    title: feature,
    date: `COMPONENT ${String(i + 1).padStart(2, "0")}`,
    subtitle: `Implemented in the Kairo codebase`,
  })
);

const totalComponents = 30;
const completed = IMPLEMENTED_FEATURES.length;
const progress = (completed / totalComponents) * 100;

export function CurrentStateSection() {
  return (
    <section className="relative">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 md:pt-32">
        <ScrollReveal>
          <div className="mb-8">
            <div className="text-label text-[11px] font-mono uppercase text-text-tertiary mb-4">
              What exists today
            </div>
            <ScrollKineticText
              text="The complete model architecture"
              className="text-heading text-3xl md:text-4xl font-semibold text-text-primary"
              splitBy="words"
              direction="up"
              stagger={0.08}
            />
            <p className="mt-4 text-body text-text-secondary max-w-lg">
              The core model architecture is fully implemented and validated.
              Browse the completed components.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-6 max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-text-tertiary">
                {completed} of {totalComponents} components
              </span>
              <span className="text-xs font-mono text-accent tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.2}>
        <NewsletterBookshelf
          items={featureBooks}
          brand="Kairo"
          height={580}
          onSelect={(item) => console.log("Selected:", item.title)}
        />
      </ScrollReveal>
    </section>
  );
}
