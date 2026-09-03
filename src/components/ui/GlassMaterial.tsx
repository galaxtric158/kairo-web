"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

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
          "fixed inset-0 z-[60] transition-[opacity,backdrop-filter] duration-300",
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
