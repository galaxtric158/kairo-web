"use client";

import { useRef, useEffect, useState } from "react";

interface CursorGlowProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export function CursorGlow({
  className = "",
  size = 400,
  color = "var(--accent)",
  opacity = 0.06,
}: CursorGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -size, y: -size });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) or (pointer: coarse)").matches;
    if (isTouch) return;

    const handleMove = (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="absolute rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          width: size,
          height: size,
          left: pos.x - size / 2,
          top: pos.y - size / 2,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: visible ? opacity : 0,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
