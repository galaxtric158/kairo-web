"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const MATH_SYMBOLS = "01∑∏∫∂√∞≈≠≤≥αβγδεζηθ".split("");

interface ComputationalRevealProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
}

export function ComputationalReveal({
  text,
  className = "",
  duration = 0.6,
  stagger = 0.08,
}: ComputationalRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chars, setChars] = useState(() => text.split("").map(() => ""));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setChars(text.split(""));
      return;
    }

    const finalChars = text.split("");
    const totalDuration = duration + (finalChars.length - 1) * stagger;

    // Scramble phase: each character cycles through random symbols
    finalChars.forEach((_, i) => {
      const charDelay = i * stagger;
      const scrambleDuration = 0.3;
      const startTime = performance.now() + charDelay * 1000;

      const scramble = () => {
        const now = performance.now();
        const elapsed = (now - startTime) / 1000;

        if (elapsed < 0) {
          requestAnimationFrame(scramble);
          return;
        }

        if (elapsed < scrambleDuration) {
          const randomSymbol =
            MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)];
          setChars((prev) => {
            const next = [...prev];
            next[i] = randomSymbol;
            return next;
          });
          requestAnimationFrame(scramble);
        } else {
          // Settle on final character
          setChars((prev) => {
            const next = [...prev];
            next[i] = finalChars[i];
            return next;
          });
        }
      };

      requestAnimationFrame(scramble);
    });

    // Animate container opacity
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [text, duration, stagger]);

  return (
    <div ref={containerRef} className={className} style={{ opacity: 0 }}>
      {chars.map((char, i) => (
        <span key={i} className="inline-block tabular-nums">
          {char}
        </span>
      ))}
    </div>
  );
}
