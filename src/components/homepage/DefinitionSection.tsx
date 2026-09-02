"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MODEL_SPECS } from "@/lib/constants";

const specs = [
  { label: "Vocabulary", value: MODEL_SPECS.vocabulary.toLocaleString(), accent: false },
  { label: "Context", value: `${MODEL_SPECS.maxSeqLen.toLocaleString()} tokens`, accent: false },
  { label: "Hidden", value: String(MODEL_SPECS.hiddenSize), accent: true },
  { label: "Activation", value: MODEL_SPECS.activation, accent: false },
  { label: "Normalization", value: MODEL_SPECS.normalization, accent: false },
  { label: "Positional", value: MODEL_SPECS.positionalEncoding, accent: true },
  { label: "Attention", value: MODEL_SPECS.attentionType, accent: false },
  { label: "Weight Tying", value: MODEL_SPECS.weightTying ? "Enabled" : "Disabled", accent: false },
];

interface DirectionalRevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "scale";
  delay?: number;
  className?: string;
}

function DirectionalReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: DirectionalRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const from = {
      opacity: 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
      y: direction === "up" ? 20 : 0,
      scale: direction === "scale" ? 0.95 : 1,
    };

    gsap.set(el, from);

    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.88;

    if (alreadyInView) {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        delay,
        ease: "power3.out",
      });
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => trigger.kill();
  }, [direction, delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

function SpecCard({ spec, index }: { spec: typeof specs[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const isTouch = window.matchMedia("(hover: none) or (pointer: coarse)").matches;
    if (isTouch) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(cx * cx + cy * cy);
      const maxDist = 150;
      const intensity = Math.max(0, 1 - dist / maxDist);

      el.style.borderColor = `rgba(255, 255, 255, ${0.06 + intensity * 0.15})`;
      el.style.backgroundColor = `rgba(255, 255, 255, ${0.03 + intensity * 0.05})`;
      el.style.boxShadow = `0 0 ${intensity * 24}px rgba(212, 168, 83, ${intensity * 0.12}), inset 0 1px 0 rgba(255,255,255,${intensity * 0.06})`;
    };

    const handleLeave = () => {
      el.style.borderColor = "";
      el.style.backgroundColor = "";
      el.style.boxShadow = "";
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
      ref={cardRef}
      className="relative rounded-sm bg-white/[0.03] border border-white/[0.06] p-4 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.1]"
    >
      <div className="text-label text-[11px] font-mono text-text-tertiary uppercase mb-1">
        {spec.label}
      </div>
      <div
        className={`font-mono text-sm tabular-nums ${
          spec.accent ? "text-accent" : "text-text-primary"
        }`}
      >
        {spec.value}
      </div>
    </div>
  );
}

export function DefinitionSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <DirectionalReveal direction="left">
          <p className="text-heading text-2xl md:text-3xl lg:text-4xl leading-snug text-text-primary font-light">
            A decoder-only transformer implemented{" "}
            <span className="text-text-secondary">completely from scratch</span>{" "}
            using PyTorch primitives.
          </p>
        </DirectionalReveal>

        <DirectionalReveal delay={0.2} direction="up">
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {specs.map((spec, i) => (
              <SpecCard key={spec.label} spec={spec} index={i} />
            ))}
          </div>
        </DirectionalReveal>
      </div>
    </section>
  );
}
