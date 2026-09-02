"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ROADMAP_ITEMS, IMPLEMENTED_FEATURES } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";

interface TimelinePhase {
  name: string;
  items: string[];
  status: "completed" | "in-progress" | "upcoming";
}

const phases: TimelinePhase[] = [
  {
    name: "Foundation",
    items: IMPLEMENTED_FEATURES.slice(0, 5),
    status: "completed",
  },
  {
    name: "Core Architecture",
    items: IMPLEMENTED_FEATURES.slice(5, 10),
    status: "completed",
  },
  {
    name: "Validation & Tooling",
    items: IMPLEMENTED_FEATURES.slice(10),
    status: "completed",
  },
  {
    name: "Data Pipeline",
    items: ROADMAP_ITEMS.filter((r) =>
      ["Dataset downloader", "Web crawler"].includes(r.name)
    ).map((r) => r.name),
    status: "upcoming",
  },
  {
    name: "Training",
    items: ROADMAP_ITEMS.filter((r) =>
      ["Pretraining", "Distributed training"].includes(r.name)
    ).map((r) => r.name),
    status: "upcoming",
  },
  {
    name: "Alignment",
    items: ROADMAP_ITEMS.filter((r) =>
      ["RLHF", "Instruction tuning"].includes(r.name)
    ).map((r) => r.name),
    status: "upcoming",
  },
  {
    name: "Interface & Deployment",
    items: ROADMAP_ITEMS.filter((r) =>
      ["Chat UI", "API server", "Quantization"].includes(r.name)
    ).map((r) => r.name),
    status: "upcoming",
  },
  {
    name: "Advanced Features",
    items: ROADMAP_ITEMS.filter((r) =>
      [
        "Speculative decoding",
        "MoE",
        "Multimodal inputs",
        "Retrieval augmentation",
        "External model loading",
        "HuggingFace compatibility",
      ].includes(r.name)
    ).map((r) => r.name),
    status: "upcoming",
  },
];

export function RoadmapSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !timelineRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="text-label text-[11px] font-mono uppercase text-text-tertiary mb-4">
              Roadmap
            </div>
            <ScrollKineticText
              text="What comes next"
              className="text-heading text-3xl md:text-4xl font-semibold text-text-primary"
              splitBy="words"
              direction="up"
              stagger={0.08}
            />
          </div>
        </ScrollReveal>

        <div ref={timelineRef} className="relative">
          {/* Central timeline line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-white/[0.06]">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-b from-accent via-accent/60 to-accent/20 origin-top"
            />
          </div>

          {/* Timeline phases */}
          <div className="space-y-0">
            {phases.map((phase, phaseIndex) => {
              const isLeft = phaseIndex % 2 === 0;
              const isCompleted = phase.status === "completed";

              return (
                <div
                  key={phase.name}
                  className="relative flex items-start"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                        isCompleted
                          ? "border-accent bg-accent shadow-[0_0_12px_rgba(212,168,83,0.4)]"
                          : "border-white/20 bg-bg-primary"
                      }`}
                    />
                  </div>

                  {/* Content - alternating sides */}
                  <div
                    className={`w-1/2 ${
                      isLeft ? "pr-12 text-right" : "pl-12 ml-auto"
                    }`}
                  >
                    <ScrollReveal delay={phaseIndex * 0.05}>
                      <div className="pb-12">
                        {/* Phase label */}
                        <div
                          className={`inline-flex items-center gap-2 mb-3 ${
                            isLeft ? "flex-row-reverse" : ""
                          }`}
                        >
                          <span
                            className={`text-[11px] font-mono uppercase tracking-widest ${
                              isCompleted ? "text-accent" : "text-text-tertiary"
                            }`}
                          >
                            Phase {phaseIndex + 1}
                          </span>
                          {isCompleted && (
                            <svg
                              className="w-3.5 h-3.5 text-accent"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          )}
                        </div>

                        {/* Phase name */}
                        <h3
                          className={`text-lg font-semibold mb-3 ${
                            isCompleted ? "text-text-primary" : "text-text-secondary"
                          }`}
                        >
                          {phase.name}
                        </h3>

                        {/* Items */}
                        <div className="space-y-1.5">
                          {phase.items.map((item) => (
                            <div
                              key={item}
                              className={`text-sm ${
                                isCompleted ? "text-text-secondary" : "text-text-tertiary"
                              }`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>

                        {/* Status indicator */}
                        <div
                          className={`mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider ${
                            isCompleted
                              ? "text-accent/70"
                              : phase.status === "in-progress"
                              ? "text-text-secondary"
                              : "text-text-tertiary/50"
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              isCompleted
                                ? "bg-accent/60"
                                : phase.status === "in-progress"
                                ? "bg-text-secondary/60"
                                : "bg-text-tertiary/30"
                            }`}
                          />
                          {isCompleted
                            ? "Done"
                            : phase.status === "in-progress"
                            ? "In progress"
                            : "Upcoming"}
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End cap */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
            <div className="w-3 h-3 rounded-full border-2 border-white/10 bg-bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
