"use client";

import { useRef, useEffect, useCallback } from "react";

interface ParamDot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  brightness: number;
  phase: number;
}

interface ParameterFieldProps {
  className?: string;
  cols?: number;
  rows?: number;
  spacing?: number;
}

export function ParameterField({
  className = "",
  cols = 48,
  rows = 20,
  spacing = 12,
}: ParameterFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<ParamDot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initDots = useCallback(
    (width: number, height: number) => {
      const offsetX = (width - cols * spacing) / 2;
      const offsetY = (height - rows * spacing) / 2;
      const dots: ParamDot[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * spacing;
          const y = offsetY + row * spacing;
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: 1.5,
            brightness: 0.15 + Math.random() * 0.1,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      dotsRef.current = dots;
    },
    [cols, rows, spacing]
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    timeRef.current += 0.01;
    const { x: mx, y: my } = mouseRef.current;

    for (const dot of dotsRef.current) {
      // Cursor influence
      const dx = dot.baseX - mx;
      const dy = dot.baseY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 120;

      let displacement = 0;
      let brightnessBoost = 0;

      if (dist < maxDist && dist > 0) {
        const t = 1 - dist / maxDist;
        displacement = t * 8;
        brightnessBoost = t * 0.6;
        dot.x = dot.baseX + (dx / dist) * displacement;
        dot.y = dot.baseY + (dy / dist) * displacement;
      } else {
        // Subtle breathing
        const breathe = Math.sin(timeRef.current * 0.5 + dot.phase) * 0.5;
        dot.x = dot.baseX + breathe;
        dot.y = dot.baseY + breathe * 0.5;
      }

      const alpha = dot.brightness + brightnessBoost;
      const size = dot.size + brightnessBoost * 2;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
      ctx.fillStyle =
        brightnessBoost > 0.1
          ? `rgba(212, 168, 83, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      initDots(rect.width, rect.height);
    };

    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerleave", handleLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerleave", handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initDots, draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
