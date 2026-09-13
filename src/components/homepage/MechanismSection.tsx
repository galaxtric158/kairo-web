"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";
import { DIAGNOSIS_LOOP } from "@/lib/constants";

const steps = [
  { label: "Inspect", dim: "repo · board", accent: false },
  { label: "Understand", dim: "pins · parts", accent: true },
  { label: "Observe", dim: "serial · scan", accent: false },
  { label: "Diagnose", dim: "evidence", accent: true },
  { label: "Fix", dim: "diff", accent: false },
  { label: "Verify", dim: "flash", accent: true },
];

const facts = [
  "Every claim cites a log line",
  "Nothing changes without permission",
  "Unverified fixes do not count",
];

export function MechanismSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const stepRef = useRef(-1);
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);

  const updateDot = useCallback(() => {
    const pct = progressRef.current * 100;
    if (dotRef.current) dotRef.current.style.left = `${pct}%`;

    const stepIndex = Math.min(
      Math.floor(progressRef.current * steps.length),
      steps.length - 1
    );
    if (stepIndex !== stepRef.current) {
      stepRef.current = stepIndex;
      setActiveStep(stepIndex);
    }
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
            A loop, not a guess
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-lg">
            Each pass moves from evidence to fix to proof. The device has the
            last word. If it still fails, the loop runs again.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIAGNOSIS_LOOP.map((stage) => (
              <div
                key={stage.label}
                className="rounded-sm bg-white/[0.03] border border-white/[0.06] px-4 py-4"
              >
                <div className="text-sm font-medium text-text-primary">
                  {stage.label}
                </div>
                <div className="mt-1 font-mono text-xs text-accent">
                  {stage.dim}
                </div>
                <p className="mt-2 text-sm text-text-secondary">{stage.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-3 font-mono text-sm">
            {facts.map((fact) => (
              <div key={fact} className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent" />
                <span className="text-text-secondary">{fact}</span>
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
          <ScrollKineticText
            text="A loop, not a guess"
            as="h2"
            className="text-heading text-3xl md:text-4xl font-semibold text-text-primary"
            splitBy="words"
            direction="left"
            distance={30}
            stagger={0.1}
            blur={true}
          />
          <p className="mt-4 text-body text-text-secondary max-w-lg">
            Each pass moves from evidence to fix to proof. The device has the
            last word. If it still fails, the loop runs again.
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
                ref={dotRef}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(212,168,83,0.6)]"
                style={{ left: "0%" }}
              />
              {/* Nodes */}
              <div className="relative flex items-center justify-between">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center transition-opacity duration-200 ${
                      activeStep >= i ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 mb-2 transition-[border-color,background-color] duration-200 ${
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
            {DIAGNOSIS_LOOP.map((stage, i) => (
              <div
                key={stage.label}
                className={`rounded-sm bg-white/[0.03] border border-white/[0.06] px-4 py-3 transition-[opacity,transform] duration-300 ${
                  activeStep >= i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xs text-text-tertiary font-mono w-6 text-right shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">
                      {stage.label}
                    </div>
                    <div className="font-mono text-[11px] text-accent">
                      {stage.dim}
                    </div>
                    <p className="mt-1 text-[13px] text-text-secondary">
                      {stage.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: stage detail cards */}
        <div className="mt-10 hidden md:grid grid-cols-3 gap-4">
          {DIAGNOSIS_LOOP.map((stage) => (
            <div
              key={stage.label}
              className="rounded-sm border border-white/[0.06] bg-white/[0.02] p-5 transition-[background-color,border-color] duration-200 hover:bg-white/[0.04] hover:border-white/[0.1]"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-base font-semibold text-text-primary">
                  {stage.label}
                </h3>
                <span className="font-mono text-[11px] text-accent">
                  {stage.dim}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {stage.text}
              </p>
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="mt-10 space-y-3 font-mono text-sm">
            {facts.map((fact) => (
              <div key={fact} className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent" />
                <span className="text-text-secondary">{fact}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
