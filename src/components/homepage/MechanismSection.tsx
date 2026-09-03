"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  { label: "Token", dim: "1", accent: false },
  { label: "Embed", dim: "16,384 → 256", accent: true },
  { label: "RoPE", dim: "256", accent: false },
  { label: "Attn", dim: "4 heads", accent: true },
  { label: "Add + Norm", dim: "256", accent: false },
  { label: "SwiGLU", dim: "256→640→256", accent: true },
  { label: "Add + Norm", dim: "256", accent: false },
  { label: "Output", dim: "256 → 16,384", accent: true },
];

export function MechanismSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);
  const [dotLeft, setDotLeft] = useState(0);

  const updateDot = useCallback(() => {
    const pct = progressRef.current * 100;
    setDotLeft(pct);

    const stepIndex = Math.min(
      Math.floor(progressRef.current * steps.length),
      steps.length - 1
    );
    setActiveStep(stepIndex);
  }, []);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !pathRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pathRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
            onUpdate: (self) => {
              progressRef.current = self.progress;
              updateDot();
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced, updateDot]);

  if (prefersReduced) {
    return (
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-heading text-3xl md:text-4xl font-semibold text-text-primary">
            How Kairo processes a token
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-lg">
            Each token passes through embedding, attention, and feed-forward layers
            before projecting back to the vocabulary.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center">
                <div className="rounded-sm bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-center">
                  <div className="text-sm font-medium text-text-primary">{step.label}</div>
                  <div className={`mt-1 font-mono text-xs ${step.accent ? "text-accent" : "text-text-secondary"}`}>
                    {step.dim}
                  </div>
                </div>
                {i < steps.length - 1 && <div className="w-6 h-px bg-border mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-heading text-3xl md:text-4xl font-semibold text-text-primary">
            How Kairo processes a token
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-lg">
            Each token passes through embedding, attention, and feed-forward layers
            before projecting back to the vocabulary.
          </p>
        </ScrollReveal>

        <div className="mt-12 relative">
          {/* Desktop: horizontal pipeline */}
          <div className="hidden md:block">
            <div className="relative py-5">
              {/* Connecting line */}
              <div
                ref={pathRef as React.Ref<HTMLDivElement>}
                className="absolute top-1/2 -translate-y-1/2 left-[3%] right-[3%] h-px bg-border origin-left"
              />
              {/* Traveling dot */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(212,168,83,0.6)]"
                style={{ left: `${dotLeft}%` }}
              />
              {/* Nodes */}
              <div className="relative flex items-center justify-between">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center transition-opacity duration-300 ${
                      activeStep >= i ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 mb-2 transition-all duration-300 ${
                        activeStep >= i
                          ? "border-accent bg-accent shadow-[0_0_8px_rgba(212,168,83,0.4)]"
                          : "border-white/[0.08] bg-white/[0.03]"
                      }`}
                    />
                    <div className="text-xs font-medium text-text-primary text-center whitespace-nowrap">
                      {step.label}
                    </div>
                    <div
                      className={`font-mono text-[10px] text-center whitespace-nowrap ${
                        step.accent ? "text-accent" : "text-text-tertiary"
                      }`}
                    >
                      {step.dim}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical pipeline */}
          <div className="md:hidden space-y-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-sm bg-white/[0.03] border border-white/[0.06] px-4 py-3 transition-all duration-500 ${
                  activeStep >= i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-xs text-text-tertiary font-mono w-6 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{step.label}</div>
                  <div className={`font-mono text-xs ${step.accent ? "text-accent" : "text-text-secondary"}`}>
                    {step.dim}
                  </div>
                </div>
                {activeStep >= i && (
                  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(212,168,83,0.6)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
