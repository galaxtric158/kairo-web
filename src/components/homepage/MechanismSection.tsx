"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";
import { TokenField } from "@/components/ui/TokenField";

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
  const dotRef = useRef<HTMLDivElement>(null);
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
      <TokenField className="z-0 opacity-30" count={40} speed={0.2} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <ScrollKineticText
          text="How Kairo processes a token"
          className="text-heading text-3xl md:text-4xl font-semibold text-text-primary"
          splitBy="words"
          direction="up"
          stagger={0.08}
        />
        <p className="mt-4 text-body text-text-secondary max-w-lg">
          Each token passes through embedding, attention, and feed-forward layers
          before projecting back to the vocabulary.
        </p>

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
                ref={dotRef as React.Ref<HTMLDivElement>}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(212,168,83,0.6)]"
                style={{ left: `${dotLeft}%` }}
              />
              {/* Nodes */}
              <div className="relative flex items-center justify-between">
                {steps.map((step, i) => (
                  <PipelineNode
                    key={i}
                    step={step}
                    index={i}
                    active={activeStep >= i}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical pipeline */}
          <div className="md:hidden space-y-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-sm bg-white/[0.03] border border-white/[0.06] px-4 py-3"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineNode({
  step,
  index,
  active,
}: {
  step: typeof steps[0];
  index: number;
  active: boolean;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    const isTouch = window.matchMedia("(hover: none) or (pointer: coarse)").matches;
    if (isTouch) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(cx * cx + cy * cy);
      const maxDist = 100;
      const intensity = Math.max(0, 1 - dist / maxDist);

      const dot = el.querySelector(".node-dot") as HTMLElement;
      if (dot) {
        dot.style.boxShadow = `0 0 ${intensity * 12}px rgba(212, 168, 83, ${intensity * 0.6})`;
      }
    };

    const handleLeave = () => {
      const dot = el.querySelector(".node-dot") as HTMLElement;
      if (dot) {
        dot.style.boxShadow = "";
      }
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={nodeRef}
      className={`flex flex-col items-center transition-all duration-300 ${
        active ? "opacity-100" : "opacity-40"
      }`}
    >
      <div
        className={`node-dot w-3 h-3 rounded-full border-2 mb-2 transition-all duration-300 ${
          active
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
  );
}
