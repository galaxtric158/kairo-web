"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useReducedMotion } from "framer-motion";
import {
  type CSSProperties,
  type FocusEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface OrbitStackItem {
  name: string;
  role: string;
  description: string;
  accent?: string;
  initials?: string;
  stat?: string;
}

interface OrbitCardStackProps {
  items?: OrbitStackItem[];
  className?: string;
  cardClassName?: string;
  defaultActiveIndex?: number;
  spread?: number;
  lift?: number;
  onActiveChange?: (item: OrbitStackItem, index: number) => void;
}

const defaultItems: OrbitStackItem[] = [
  {
    name: "Edmund Kusnadi",
    role: "Founder",
    description:
      "Fueling the creative fire behind Kairo. Helping shape its direction and purposes.",
    accent: "#d4a853",
    initials: "EK",
    stat: "galaxtric158",
  },
  {
    name: "Nathanael Ethan",
    role: "Founder",
    description:
      "Working on the minds behind Kairo. Shaping the intellectual drive behind Kairo's capabilities; creating the tokenizer and its PyTorch primitives from scratch.",
    accent: "#888888",
    initials: "NE",
    stat: "Nathanael-Ethan",
  },
];

function inRange(index: number, length: number) {
  return Math.min(Math.max(0, index), Math.max(0, length - 1));
}

function initialsFor(item: OrbitStackItem) {
  return (
    item.initials ??
    item.name
      .split(/\s+/)
      .map((part) => part.at(0))
      .join("")
      .slice(0, 2)
      .toUpperCase()
  );
}

function Portrait({ item }: { item: OrbitStackItem }) {
  return (
    <div className="relative flex aspect-[1.36] w-full overflow-hidden rounded-[0.9rem] border border-white/[0.08] bg-white/[0.02]">
      <div className="coord-lines absolute inset-0 opacity-60" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="absolute left-2 top-2 h-2 w-2 border-l border-t border-white/20"
      />
      <span
        aria-hidden="true"
        className="absolute right-2 top-2 h-2 w-2 border-r border-t border-white/20"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-white/20"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-white/20"
      />
      <span className="m-auto font-mono text-5xl font-semibold tracking-tight text-text-primary">
        {initialsFor(item)}
      </span>
      <span
        className="absolute bottom-3 right-3 rounded-full border border-white/[0.08] bg-black/40 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] backdrop-blur-sm"
        style={{ color: item.accent ?? "#e8e8e8" }}
      >
        {initialsFor(item)}
      </span>
    </div>
  );
}

export function OrbitCardStack({
  items = defaultItems,
  className,
  cardClassName,
  defaultActiveIndex = 0,
  spread = 200,
  lift = 36,
  onActiveChange,
}: OrbitCardStackProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const isNarrow = useMediaQuery("(max-width: 640px)");
  // Clamp fan width so cards never clip the viewport on phones.
  const effectiveSpread = isNarrow ? Math.min(spread, 84) : spread;
  const cards = items.length ? items : defaultItems;
  const restingIndex = inRange(defaultActiveIndex, cards.length);
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(reduceMotion);
  const stageRef = useRef<HTMLDivElement>(null);
  const midpoint = (cards.length - 1) / 2;

  useEffect(() => {
    if (reduceMotion) {
      setEntered(true);
      return;
    }
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  const layouts = useMemo(
    () =>
      cards.map((_, index) => {
        const orbit = index - midpoint;
        const stack = index - restingIndex;
        return {
          open: {
            x: orbit * effectiveSpread,
            y: Math.abs(orbit) * 30 + Math.max(0, Math.abs(orbit) - 1) * 10,
            rotation: orbit * 8.5,
          },
          closed: {
            x: stack * 10,
            y: Math.abs(stack) * 5,
            rotation: stack * 2.8,
          },
        };
      }),
    [cards, midpoint, restingIndex, effectiveSpread]
  );

  const activate = (index: number) => {
    const next = inRange(index, cards.length);
    setOpen(true);
    setActiveIndex(next);
    onActiveChange?.(cards[next]!, next);
  };
  const close = () => {
    setOpen(false);
    setActiveIndex(restingIndex);
  };
  const leaveFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  };

  return (
    <div
      className={cn(
        "relative flex min-h-full w-full items-center justify-center overflow-hidden p-8",
        className
      )}
    >
      <div
        ref={stageRef}
        className="relative h-[470px] w-full max-w-[860px]"
        onMouseLeave={close}
        onBlur={leaveFocus}
        role="list"
        aria-label="Founders"
      >
        {cards.map((item, index) => {
          const position = open ? layouts[index]!.open : layouts[index]!.closed;
          const active = index === activeIndex;
          const style: CSSProperties = {
            zIndex: active ? 80 : 50 - Math.abs(index - activeIndex),
            opacity: entered ? 1 : 0,
            transform: entered
              ? `translate(calc(-50% + ${position.x}px), calc(-50% + ${
                  position.y - (open && active ? lift : 0)
                }px)) rotate(${position.rotation}deg) scale(${open ? 0.985 : 0.97})`
              : `translate(-50%, calc(-50% + 24px)) rotate(0deg) scale(0.97)`,
            transitionDuration: reduceMotion ? "0ms" : "360ms",
            transitionDelay: entered ? "0ms" : `${index * 60}ms`,
          };

          return (
            <article
              key={`${item.name}-${index}`}
              role="listitem"
              tabIndex={0}
              aria-current={active ? "true" : undefined}
              className={cn(
                "absolute left-1/2 top-1/2 w-[min(78vw,21rem)] origin-bottom cursor-pointer rounded-[1.1rem] border bg-[#111111] p-4 text-[#e8e8e8] outline-none",
                active ? "border-accent/40" : "border-white/[0.08]",
                "transition-[transform,opacity,background-color,border-color] ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                cardClassName
              )}
              style={style}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={() => activate(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  const next = (index + 1) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const next = (index - 1 + cards.length) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "Escape") {
                  event.currentTarget.blur();
                  close();
                }
              }}
            >
              <div className="relative">
                <Portrait item={item} />
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-white/[0.08] bg-black/40 text-text-secondary backdrop-blur-sm">
                  <ArrowUpRight size={16} aria-hidden />
                </span>
              </div>
              <div className="px-2 pb-2 pt-5">
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-text-tertiary">
                  {item.role}
                </p>
                <h3 className="mt-2 text-[1.7rem] font-semibold leading-none tracking-[-0.02em] text-text-primary">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-[17rem] text-[0.9rem] leading-[1.5] text-text-secondary">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-text-tertiary">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: item.accent ?? "#e8e8e8" }}
                  />
                  {item.stat ?? "Profile"}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
