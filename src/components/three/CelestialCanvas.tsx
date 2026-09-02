"use client";

import { useRef, useEffect } from "react";
import { hexToRgb } from "@/lib/utils";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  flashSpeed: number;
  flashPhase: number;
  depth: number;
  cell: number;
}

interface GridCell {
  indices: number[];
}

const CONSTELLATION_DIST = 120;
const CONSTELLATION_DIST_SQ = CONSTELLATION_DIST * CONSTELLATION_DIST;
const CONSTELLATION_LINE_ALPHA = 0.04;
const MAX_PARALLAX_PX = 12;
const FADE_RADIUS = 0.35;
const FADE_SOFTNESS = 0.25;
const CELL_SIZE = CONSTELLATION_DIST;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateStars(w: number, h: number): Star[] {
  const count = Math.round((w * h) / 8000);
  const rand = seededRandom(42);
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const x = rand() * w;
    const y = rand() * h;
    stars.push({
      x,
      y,
      r: 0.4 + rand() * 1.1,
      baseAlpha: 0.12 + rand() * 0.45,
      twinkleSpeed: 0.3 + rand() * 1.2,
      twinklePhase: rand() * Math.PI * 2,
      flashSpeed: 0.1 + rand() * 0.4,
      flashPhase: rand() * Math.PI * 2,
      depth: 0.3 + rand() * 0.7,
      cell: 0,
    });
  }
  return stars;
}

function buildSpatialGrid(stars: Star[], w: number, h: number): GridCell[] {
  const cols = Math.ceil(w / CELL_SIZE);
  const totalCells = cols * Math.ceil(h / CELL_SIZE);
  const grid: GridCell[] = [];
  for (let i = 0; i < totalCells; i++) {
    grid.push({ indices: [] });
  }
  for (let i = 0; i < stars.length; i++) {
    const col = Math.floor(stars[i].x / CELL_SIZE);
    const row = Math.floor(stars[i].y / CELL_SIZE);
    const cellIdx = row * cols + col;
    stars[i].cell = cellIdx;
    if (cellIdx >= 0 && cellIdx < totalCells) {
      grid[cellIdx].indices.push(i);
    }
  }
  return grid;
}

function precomputeLines(stars: Star[], w: number, h: number): [number, number][] {
  const lines: [number, number][] = [];
  const cols = Math.ceil(w / CELL_SIZE);
  const rows = Math.ceil(h / CELL_SIZE);
  const grid = buildSpatialGrid(stars, w, h);
  const checked = new Set<string>();

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    const col = Math.floor(s.x / CELL_SIZE);
    const row = Math.floor(s.y / CELL_SIZE);
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        const cell = grid[nr * cols + nc];
        for (let k = 0; k < cell.indices.length; k++) {
          const j = cell.indices[k];
          if (j <= i) continue;
          const pairKey = i < j ? `${i}:${j}` : `${j}:${i}`;
          if (checked.has(pairKey)) continue;
          checked.add(pairKey);
          const sb = stars[j];
          const dx = s.x - sb.x;
          const dy = s.y - sb.y;
          if (dx * dx + dy * dy < CONSTELLATION_DIST_SQ) {
            lines.push([i, j]);
          }
        }
      }
    }
  }
  return lines;
}

function readAccentRgb(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-primary")
    .trim();
  return hexToRgb(raw) ?? [212, 168, 83];
}

export default function CelestialCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const linesRef = useRef<[number, number][]>([]);
  const rafRef = useRef(0);
  const prefersReducedMotion = useRef(false);
  const accentRgbRef = useRef<[number, number, number]>([212, 168, 83]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;
    const onMql = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mql.addEventListener("change", onMql);

    accentRgbRef.current = readAccentRgb();
    const accentObserver = new MutationObserver(() => {
      accentRgbRef.current = readAccentRgb();
    });
    accentObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      starsRef.current = generateStars(window.innerWidth, window.innerHeight);
      linesRef.current = precomputeLines(
        starsRef.current,
        window.innerWidth,
        window.innerHeight
      );
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    resize();

    const render = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w * 0.5;
      const cy = h * 0.45;
      const maxDist = Math.sqrt(cx * cx + cy * cy);
      ctx.clearRect(0, 0, w, h);

      const t = time * 0.001;
      const stars = starsRef.current;
      const lines = linesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const reduced = prefersReducedMotion.current;
      const [cr, cg, cb] = accentRgbRef.current;

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const parallax = reduced ? 0 : (1 - s.depth) * MAX_PARALLAX_PX;
        const sx = s.x + mx * parallax;
        const sy = s.y + my * parallax;

        const dx = sx - cx;
        const dy = sy - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) / maxDist;
        const fade = Math.min(
          1,
          Math.max(0, (dist - FADE_RADIUS) / FADE_SOFTNESS)
        );

        const twinkle = reduced
          ? 1
          : 0.6 + 0.4 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const flash = reduced
          ? 0
          : Math.pow(
              Math.max(0, Math.sin(t * s.flashSpeed + s.flashPhase)),
              8
            );
        const shineRadius = s.r * (1 + flash * 0.4);
        const alpha = s.baseAlpha * twinkle * (1 + flash * 0.6) * fade;

        if (alpha < 0.005) continue;

        ctx.beginPath();
        ctx.arc(sx, sy, shineRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
        ctx.fill();

        if (flash > 0.3) {
          ctx.beginPath();
          ctx.arc(sx, sy, shineRadius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${flash * 0.08 * fade})`;
          ctx.fill();
        }
      }

      for (let i = 0; i < lines.length; i++) {
        const [a, b] = lines[i];
        const sa = stars[a];
        const sb = stars[b];
        const parallaxA = reduced ? 0 : (1 - sa.depth) * MAX_PARALLAX_PX;
        const parallaxB = reduced ? 0 : (1 - sb.depth) * MAX_PARALLAX_PX;

        const ax = sa.x + mx * parallaxA;
        const ay = sa.y + my * parallaxA;
        const bx = sb.x + mx * parallaxB;
        const by = sb.y + my * parallaxB;

        const adx = ax - cx;
        const ady = ay - cy;
        const aFade = Math.min(
          1,
          Math.max(
            0,
            (Math.sqrt(adx * adx + ady * ady) / maxDist - FADE_RADIUS) /
              FADE_SOFTNESS
          )
        );

        const bdx = bx - cx;
        const bdy = by - cy;
        const bFade = Math.min(
          1,
          Math.max(
            0,
            (Math.sqrt(bdx * bdx + bdy * bdy) / maxDist - FADE_RADIUS) /
              FADE_SOFTNESS
          )
        );

        const lineAlpha = CONSTELLATION_LINE_ALPHA * Math.min(aFade, bFade);
        if (lineAlpha < 0.001) continue;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${lineAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      mql.removeEventListener("change", onMql);
      accentObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
