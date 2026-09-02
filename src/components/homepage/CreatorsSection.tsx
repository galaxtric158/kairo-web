"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";
import {
  OrbitCardStack,
  type OrbitStackItem,
} from "@/components/ui/orbit-card-stack";

const creators: OrbitStackItem[] = [
  {
    name: "Edmund",
    role: "Creator",
    description:
      "Architect of Kairo — built the entire transformer from scratch, layer by layer, with PyTorch primitives.",
    initials: "EM",
    accent: "#d4a853",
    stat: "galaxtric158",
  },
  {
    name: "Nathanael Ethan",
    role: "Collaborator",
    description:
      "Contributed to the development and evolution of Kairo, helping shape its direction and capabilities.",
    initials: "NE",
    accent: "#888888",
    stat: "Nathanael-Ethan",
  },
];

export function CreatorsSection() {
  const [activeMember, setActiveMember] = useState(creators[0]!);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="text-label text-[11px] font-mono uppercase text-text-tertiary mb-4">
              Built by
            </div>
            <ScrollKineticText
              text="The minds behind Kairo"
              className="text-heading text-3xl md:text-4xl font-semibold text-text-primary"
              splitBy="words"
              direction="up"
              stagger={0.08}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="h-[620px] w-full">
            <OrbitCardStack
              items={creators}
              defaultActiveIndex={0}
              spread={200}
              lift={40}
              onActiveChange={(item) => setActiveMember(item)}
              cardClassName="!bg-[#1a1814] !border-white/10 !text-[#e8e8e8]"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 text-center">
            <p className="text-body text-text-secondary text-sm">
              Currently viewing:{" "}
              <span className="text-accent font-medium">{activeMember.name}</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
