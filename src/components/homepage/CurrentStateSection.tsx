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

export function CurrentStateSection() {
  return (
    <section className="relative">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 md:pt-32">
        <ScrollReveal>
          <div className="mb-8">
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
      </div>

      <ScrollReveal delay={0.1}>
        <NewsletterBookshelf
          items={featureBooks}
          brand="Kairo"
          height={580}
          onSelect={() => {}}
        />
      </ScrollReveal>
    </section>
  );
}
