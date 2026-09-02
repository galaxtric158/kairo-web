"use client";

import { useRef, useState, useEffect } from "react";
import {
  KineticTextReveal,
  type KineticTextRevealRef,
} from "@/components/ui/kinetic-text-reveal";
import type { Transition } from "framer-motion";

interface ScrollKineticTextProps {
  text: string;
  className?: string;
  segmentClassName?: string;
  splitBy?: "words" | "characters" | "lines";
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  stagger?: number;
  staggerFrom?: "start" | "end" | "center" | "edges" | "random" | number;
  transition?: Transition;
  blur?: boolean;
  threshold?: number;
}

export function ScrollKineticText({
  text,
  className,
  segmentClassName,
  splitBy = "words",
  direction = "up",
  distance = 20,
  stagger = 0.075,
  staggerFrom = "start",
  transition,
  blur = true,
  threshold = 0.2,
}: ScrollKineticTextProps) {
  const ref = useRef<KineticTextRevealRef>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasTriggered(true);
          ref.current?.play();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered, threshold]);

  return (
    <span ref={wrapperRef} className="inline-block w-full">
      <KineticTextReveal
        ref={ref}
        text={text}
        className={className}
        segmentClassName={segmentClassName}
        splitBy={splitBy}
        direction={direction}
        distance={distance}
        stagger={stagger}
        staggerFrom={staggerFrom}
        transition={transition}
        blur={blur}
        autoPlay={false}
      />
    </span>
  );
}
