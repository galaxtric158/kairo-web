"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/* ── Icons (inline SVG, no deps) ──────────────────────────────── */

function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconArchitecture() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function IconModel() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconImplementation() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconRoadmap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function IconDocs() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ── DockItem ─────────────────────────────────────────────────── */

function DockItem({
  icon,
  label,
  href,
  active,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  spring: { mass: number; stiffness: number; damping: number };
  distance: number;
  magnification: number;
  baseItemSize: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (v) => setShowLabel(v === 1));
    return () => unsubscribe();
  }, [isHovered]);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
    }
  };

  const inner = (
    <>
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md border border-white/[0.08] bg-[#111111] px-2.5 py-1 text-[11px] font-mono tracking-wide text-text-primary shadow-lg pointer-events-none"
            style={{ x: "-50%" }}
            role="tooltip"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        onHoverStart={() => isHovered.set(1)}
        onHoverEnd={() => isHovered.set(0)}
        onFocus={() => isHovered.set(1)}
        onBlur={() => isHovered.set(0)}
        onClick={undefined}
        onKeyDown={handleKeyDown}
        className={`relative inline-flex items-center justify-center rounded-full border shadow-md transition-[color,border-color,background-color] duration-200 ${
          active
            ? "border-accent/40 bg-accent/[0.08] text-accent"
            : "border-white/[0.08] bg-white/[0.04] text-text-secondary hover:text-accent hover:border-accent/30 hover:bg-accent/[0.06]"
        }`}
        tabIndex={0}
        role="button"
        aria-label={label}
      >
        {icon}
      </motion.div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="outline-none" aria-current={active ? "page" : undefined}>
        {inner}
      </Link>
    );
  }

  return inner;
}

/* ── Main Dock ────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: <IconHome /> },
  { href: "/architecture", label: "Architecture", icon: <IconArchitecture /> },
  { href: "/model", label: "Model", icon: <IconModel /> },
  { href: "/implementation", label: "Implementation", icon: <IconImplementation /> },
  { href: "/roadmap", label: "Roadmap", icon: <IconRoadmap /> },
  { href: "/docs", label: "Docs", icon: <IconDocs /> },
];

export function DockNav({ activePath }: { activePath?: string }) {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(Infinity);

  const spring = useMemo(
    () => reduced
      ? { mass: 0.1, stiffness: 200, damping: 30 }
      : { mass: 0.1, stiffness: 120, damping: 20 },
    [reduced]
  );

  const baseItemSize = 40;
  const magnification = reduced ? 44 : 56;
  const distance = 180;

  const dockItems = useMemo(
    () => [
      ...NAV_ITEMS,
      { href: "https://github.com/Nathanael-Ethan/Kairo", label: "GitHub", icon: <IconGitHub /> },
    ],
    []
  );

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
      onMouseMove={({ pageX }) => mouseX.set(pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div
        className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#111111]/80 backdrop-blur-xl backdrop-saturate-150 py-2.5 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        role="toolbar"
        aria-label="Navigation dock"
      >
        {dockItems.map((item) => (
          <DockItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={activePath ? activePath === item.href : undefined}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          />
        ))}
      </div>
    </div>
  );
}
