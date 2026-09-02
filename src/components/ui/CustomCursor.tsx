"use client";

import { useState, useEffect, useRef } from "react";
import { useCursor } from "@/lib/hooks/useCursor";
import { hexToRgba, useAccentColor } from "@/lib/utils";

const RING_SIZE = 24;
const DOT_SIZE = 4;
const HOVER_SCALE = 1.5;

export default function CustomCursor() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const accentHex = useAccentColor();
  const { subscribe, stateRef } = useCursor();

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);

    const ptrQ = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsFinePointer(ptrQ.matches);
    const onPtr = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    ptrQ.addEventListener("change", onPtr);

    return () => {
      mql.removeEventListener("change", onChange);
      ptrQ.removeEventListener("change", onPtr);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || !isFinePointer) return undefined;

    let hovering = false;
    let visible = false;

    const unsub = subscribe((s) => {
      visible = s.isVisible;
      hovering = s.isHovering;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${s.ringX}px, ${s.ringY}px) translate(-50%, -50%) scale(${hovering ? HOVER_SCALE : 1})`;
        ringRef.current.style.opacity = visible ? "1" : "0";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%)`;
        dotRef.current.style.opacity = visible && !hovering ? "1" : "0";
      }
    });

    return () => unsub();
  }, [reducedMotion, isFinePointer, subscribe]);

  if (reducedMotion || !isFinePointer) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {/* Ring — spring-follows cursor */}
      <div
        ref={ringRef}
        className="absolute rounded-full will-change-[transform,opacity]"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          border: `1px solid ${hexToRgba(accentHex, 0.5)}`,
          boxShadow: `0 0 8px ${hexToRgba(accentHex, 0.15)}`,
          mixBlendMode: "difference",
          transition:
            "transform 200ms cubic-bezier(0.23, 1, 0.32, 1), border-color 200ms ease, opacity 150ms ease",
        }}
      />

      {/* Dot — tracks raw cursor position */}
      <div
        ref={dotRef}
        className="absolute rounded-full will-change-[transform,opacity]"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: hexToRgba(accentHex, 0.9),
          transition: "opacity 150ms ease",
        }}
      />
    </div>
  );
}
