"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassLevel = 0 | 1 | 2 | 3 | 4;

interface GlassMaterialProps {
  children: ReactNode;
  level?: GlassLevel;
  className?: string;
  pointerResponse?: boolean;
  hoverScale?: boolean;
  as?: "div" | "nav" | "aside" | "section";
}

const GLASS_STYLES: Record<GlassLevel, string> = {
  0: "",
  1: "bg-white/[0.03] border border-white/[0.06]",
  2: "bg-white/[0.05] backdrop-blur-xl backdrop-saturate-150 border border-white/[0.08]",
  3: "bg-white/[0.07] backdrop-blur-2xl backdrop-saturate-[1.8] border border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
  4: "bg-white/[0.09] backdrop-blur-3xl backdrop-saturate-200 border border-white/[0.15] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(255,255,255,0.05)]",
};

const HOVER_STYLES: Record<GlassLevel, string> = {
  0: "",
  1: "hover:bg-white/[0.05] hover:border-white/[0.1]",
  2: "hover:bg-white/[0.07] hover:border-white/[0.12]",
  3: "hover:bg-white/[0.09] hover:border-white/[0.16]",
  4: "",
};

export function GlassMaterial({
  children,
  level = 1,
  className = "",
  pointerResponse = false,
  hoverScale = false,
  as: Tag = "div",
}: GlassMaterialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!pointerResponse || level < 2) return;
    const el = ref.current;
    if (!el) return;

    const isTouch = window.matchMedia("(hover: none) or (pointer: coarse)").matches;
    if (isTouch) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: cy * -4, y: cx * 4 });
    };

    const handleLeave = () => {
      setTilt({ x: 0, y: 0 });
      setIsHovering(false);
    };

    const handleEnter = () => setIsHovering(true);

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    el.addEventListener("pointerenter", handleEnter);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      el.removeEventListener("pointerenter", handleEnter);
    };
  }, [pointerResponse, level]);

  if (level === 0) {
    return (
      <Tag className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={cn(
        "relative rounded-sm transition-colors duration-300",
        GLASS_STYLES[level],
        level > 0 && HOVER_STYLES[level],
        hoverScale && "hover:scale-[1.01] active:scale-[0.99]",
        className
      )}
      style={
        pointerResponse && level >= 2
          ? {
              transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isHovering ? "transform 100ms ease-out" : "transform 400ms ease-out",
            }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

interface GlassOverlayProps {
  children: ReactNode;
  className?: string;
  visible: boolean;
  onClose?: () => void;
}

export function GlassOverlay({
  children,
  className = "",
  visible,
  onClose,
}: GlassOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-all duration-300",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Dimming scrim */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Glass content */}
      <div
        className={cn(
          "relative z-10 h-full",
          "bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-[1.8] border-l border-white/[0.1]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
          "transition-transform duration-300 ease-[var(--ease-drawer)]",
          visible ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
