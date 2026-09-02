"use client";

import { useRef, useEffect, useCallback } from "react";

interface MathGridProps {
  className?: string;
  cellSize?: number;
  influenceRadius?: number;
  maxBrightness?: number;
}

export function MathGrid({
  className = "",
  cellSize = 48,
  influenceRadius = 120,
  maxBrightness = 0.08,
}: MathGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const isTouchDevice = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    const cols = Math.ceil(w / cellSize) + 1;
    const rows = Math.ceil(h / cellSize) + 1;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let i = 0; i <= cols; i++) {
      const x = i * cellSize;
      const distToMouse = Math.abs(x - mx);
      const brightness = isTouchDevice.current
        ? 0.03
        : Math.min(0.03 + (maxBrightness - 0.03) * Math.max(0, 1 - distToMouse / influenceRadius), maxBrightness);
      ctx.strokeStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let j = 0; j <= rows; j++) {
      const y = j * cellSize;
      const distToMouse = Math.abs(y - my);
      const brightness = isTouchDevice.current
        ? 0.03
        : Math.min(0.03 + (maxBrightness - 0.03) * Math.max(0, 1 - distToMouse / influenceRadius), maxBrightness);
      ctx.strokeStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw intersection dots near cursor
    if (!isTouchDevice.current) {
      const startCol = Math.max(0, Math.floor((mx - influenceRadius) / cellSize));
      const endCol = Math.min(cols, Math.ceil((mx + influenceRadius) / cellSize));
      const startRow = Math.max(0, Math.floor((my - influenceRadius) / cellSize));
      const endRow = Math.min(rows, Math.ceil((my + influenceRadius) / cellSize));

      for (let i = startCol; i <= endCol; i++) {
        for (let j = startRow; j <= endRow; j++) {
          const x = i * cellSize;
          const y = j * cellSize;
          const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
          if (dist < influenceRadius) {
            const alpha = 0.15 * (1 - dist / influenceRadius);
            ctx.fillStyle = `rgba(212, 168, 83, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    animationRef.current = requestAnimationFrame(draw);
  }, [cellSize, influenceRadius, maxBrightness]);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia("(hover: none) or (pointer: coarse)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
