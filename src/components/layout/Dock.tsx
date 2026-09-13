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
import {
  House,
  SquaresFour,
  Cube,
  Code,
  GitFork,
  BookOpen,
  GithubLogo,
} from "@phosphor-icons/react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/* ── Icons (Phosphor, regular weight, 18px throughout) ──────────── */

const DOCK_ICON_PROPS = { size: 18, weight: "regular" } as const;

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
    <span className="relative inline-flex flex-col items-center">
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
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
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
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-1.5 left-1/2 h-1 w-1 rounded-full bg-accent"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.5,
          x: "-50%",
        }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      />
    </span>
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
  { href: "/", label: "Home", icon: <House {...DOCK_ICON_PROPS} /> },
  { href: "/architecture", label: "Architecture", icon: <SquaresFour {...DOCK_ICON_PROPS} /> },
  { href: "/engine", label: "Engine", icon: <Cube {...DOCK_ICON_PROPS} /> },
  { href: "/prototype", label: "Prototype", icon: <Code {...DOCK_ICON_PROPS} /> },
  { href: "/roadmap", label: "Roadmap", icon: <GitFork {...DOCK_ICON_PROPS} /> },
  { href: "/docs", label: "Docs", icon: <BookOpen {...DOCK_ICON_PROPS} /> },
];

export function DockNav({ activePath }: { activePath?: string }) {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(Infinity);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const spring = useMemo(
    () => reduced
      ? { mass: 0.1, stiffness: 260, damping: 30 }
      : { mass: 0.1, stiffness: 180, damping: 24 },
    [reduced]
  );

  const baseItemSize = 40;
  const magnification = !canHover ? baseItemSize : reduced ? 44 : 48;
  const distance = 180;

  const dockItems = useMemo(
    () => [
      ...NAV_ITEMS,
      { href: "https://github.com/Nathanael-Ethan/Kairo", label: "GitHub", icon: <GithubLogo {...DOCK_ICON_PROPS} /> },
    ],
    []
  );

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
      onMouseMove={canHover ? ({ pageX }) => mouseX.set(pageX) : undefined}
      onMouseLeave={canHover ? () => mouseX.set(Infinity) : undefined}
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
