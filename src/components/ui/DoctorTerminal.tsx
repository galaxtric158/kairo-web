"use client";

import { cn } from "@/lib/utils";

const lines = [
  { text: "$ kairo doctor", tone: "cmd" },
  { text: "PROJECT HEALTH", tone: "head" },
  { text: "✓  environment      PlatformIO 6.1 · esp32dev", tone: "ok" },
  { text: "✓  dependencies     4 libs pinned, no conflicts", tone: "ok" },
  { text: "⚠  gpio              GPIO17 claimed twice", tone: "warn" },
  { text: "✗  sensor/bme280     no data on the bus", tone: "err" },
  { text: "DIAGNOSIS", tone: "head" },
  { text: "Code drives GPIO17; wiring doc says GPIO4.", tone: "dim" },
  { text: "Bus scan answers 0x77; library opens 0x76.", tone: "dim" },
  { text: "Proposed fix: 2-line diff. Awaiting permission.", tone: "accent" },
] as const;

function toneClass(tone: string) {
  switch (tone) {
    case "cmd":
      return "text-text-primary";
    case "head":
      return "text-text-tertiary";
    case "ok":
      return "text-text-secondary";
    case "warn":
      return "text-accent";
    case "err":
      return "text-[#e08080]";
    case "accent":
      return "text-accent";
    default:
      return "text-text-secondary";
  }
}

export function DoctorTerminal({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-sm border border-white/[0.08] bg-[#0d0d0d]/90 overflow-hidden text-left",
        className
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[11px] text-text-tertiary font-mono tracking-wide truncate">
          kairo<span className="hidden sm:inline"> - esp32/sensor-node</span>
        </span>
        <span className="ml-auto shrink-0 whitespace-nowrap rounded-full border border-accent/30 bg-accent/[0.06] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          Concept preview
        </span>
      </div>
      <div className="p-5 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap [word-break:break-word]">
            <span className={toneClass(line.tone)}>{line.text}</span>
          </div>
        ))}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-text-tertiary">$</span>
          <span
            className="inline-block w-[8px] h-[1.1em] bg-accent animate-cursor-blink align-middle"
            aria-hidden="true"
          />
        </div>
      </div>
      <p className="px-5 pb-4 font-mono text-[11px] leading-relaxed text-text-tertiary">
        Illustrated session, not an executed one. The prototype does not exist yet.
      </p>
    </div>
  );
}
