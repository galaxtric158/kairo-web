"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MODEL_SPECS } from "@/lib/constants";
import { ParameterField } from "@/components/ui/ParameterField";
import { LetterCascade } from "@/components/ui/letter-cascade";

const stats = [
  { label: "Layers", value: MODEL_SPECS.layers },
  { label: "Heads", value: MODEL_SPECS.attentionHeads },
  { label: "Hidden", value: MODEL_SPECS.hiddenSize },
  { label: "FFN", value: MODEL_SPECS.ffnIntermediate },
];

const DIGITS = "0123456789".split("");

function ScrambleCounter({
  value,
  duration = 2.5,
  className,
  onComplete,
}: {
  value: number;
  duration?: number;
  className?: string;
  onComplete?: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      el.textContent = value.toLocaleString("en-US");
      onComplete?.();
      return;
    }

    const finalStr = value.toLocaleString("en-US");
    const scrambleDuration = 0.4;
    const countDuration = duration - scrambleDuration;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const startTime = performance.now();

        const animate = () => {
          const now = performance.now();
          const elapsed = (now - startTime) / 1000;

          if (elapsed < scrambleDuration) {
            const scrambled = finalStr
              .split("")
              .map((char) => {
                if (char === ",") return ",";
                return DIGITS[Math.floor(Math.random() * DIGITS.length)];
              })
              .join("");
            el.textContent = scrambled;
            requestAnimationFrame(animate);
          } else if (elapsed < duration) {
            const progress = (elapsed - scrambleDuration) / countDuration;
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(value * eased);
            el.textContent = current.toLocaleString("en-US");
            requestAnimationFrame(animate);
          } else {
            el.textContent = finalStr;
            onComplete?.();
          }
        };

        requestAnimationFrame(animate);
      },
    });

    return () => trigger.kill();
  }, [value, duration, onComplete]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      0
    </span>
  );
}

export function ScaleSection() {
  const [scrambleDone, setScrambleDone] = useState(false);
  const handleComplete = useCallback(() => setScrambleDone(true), []);

  const displayText = MODEL_SPECS.parameterCount.toLocaleString("en-US");

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <ParameterField className="z-0 opacity-20" cols={56} rows={16} spacing={14} />
      <div className="absolute inset-0 coord-lines opacity-50 z-[1]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col items-center">
        <ScrollReveal>
          <div className="overflow-hidden flex flex-col items-center">
            {scrambleDone ? (
              <LetterCascade
                text={displayText}
                staggerFrom="first"
                staggerDuration={0.035}
                stiffness={200}
                damping={14}
                className="text-display text-7xl sm:text-8xl lg:text-9xl font-mono font-semibold text-text-primary"
                letterClassName="tabular-nums"
              />
            ) : (
              <ScrambleCounter
                value={MODEL_SPECS.parameterCount}
                duration={2.5}
                onComplete={handleComplete}
                className="text-display text-7xl sm:text-8xl lg:text-9xl font-mono font-semibold text-text-primary"
              />
            )}
            <div className="mt-4 text-label text-[11px] font-mono text-text-tertiary uppercase">
              parameters
            </div>
            <p className="mt-8 text-body text-text-secondary max-w-md text-center">
              Every parameter placed intentionally. Small enough to understand
              completely, large enough to be meaningful.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-3xl md:text-4xl font-medium text-accent tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-2 text-label text-[11px] font-mono text-text-tertiary uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
