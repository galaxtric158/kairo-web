import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "border border-border rounded-sm bg-bg-glass backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
