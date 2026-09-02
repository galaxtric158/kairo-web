"use client";

import { useRef, useEffect, useCallback } from "react";
import { MODEL_SPECS } from "@/lib/constants";

interface Token {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  opacity: number;
  size: number;
}

const TOKEN_CHARS = [
  "0", "1", "⟨", "⟩", "Q", "K", "V", "σ", "∫", "∇",
  "Σ", "λ", "θ", "∞", "≈", "∂", "⊕", "⊗", "α", "β",
];

interface TokenFieldProps {
  className?: string;
  count?: number;
  speed?: number;
}

export function TokenField({
  className = "",
  count = 60,
  speed = 0.3,
}: TokenFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tokensRef = useRef<Token[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  const initTokens = useCallback(
    (width: number, height: number) => {
      const tokens: Token[] = [];
      for (let i = 0; i < count; i++) {
        tokens.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          char: TOKEN_CHARS[Math.floor(Math.random() * TOKEN_CHARS.length)],
          opacity: 0.1 + Math.random() * 0.3,
          size: 10 + Math.random() * 6,
        });
      }
      tokensRef.current = tokens;
    },
    [count, speed]
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

    const { x: mx, y: my } = mouseRef.current;

    for (const token of tokensRef.current) {
      // Cursor repulsion
      const dx = token.x - mx;
      const dy = token.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150;
      if (dist < maxDist && dist > 0) {
        const force = (1 - dist / maxDist) * 2;
        token.vx += (dx / dist) * force;
        token.vy += (dy / dist) * force;
      }

      // Damping
      token.vx *= 0.98;
      token.vy *= 0.98;

      // Base drift
      token.vx += (Math.random() - 0.5) * 0.02;
      token.vy += (Math.random() - 0.5) * 0.02;

      token.x += token.vx;
      token.y += token.vy;

      // Wrap around
      if (token.x < -20) token.x = width + 20;
      if (token.x > width + 20) token.x = -20;
      if (token.y < -20) token.y = height + 20;
      if (token.y > height + 20) token.y = -20;

      // Draw
      const proximity = dist < maxDist ? 1 - dist / maxDist : 0;
      const alpha = token.opacity + proximity * 0.4;

      ctx.font = `${token.size}px var(--font-geist-mono), monospace`;
      ctx.fillStyle = `rgba(212, 168, 83, ${alpha})`;
      ctx.fillText(token.char, token.x, token.y);
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
      initTokens(rect.width, rect.height);
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
  }, [initTokens, draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
