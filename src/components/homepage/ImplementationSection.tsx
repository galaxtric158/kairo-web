"use client";

import { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollKineticText } from "@/components/ui/ScrollKineticText";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const codeLines = [
  { tokens: [{ text: "class ", type: "kw" }, { text: "Kairo", type: "cls" }, { text: "(nn.Module):", type: "num" }] },
  { tokens: [{ text: "    def ", type: "kw" }, { text: "__init__", type: "fn" }, { text: "(self, config):", type: "par" }] },
  { tokens: [{ text: "        super", type: "num" }, { text: "().__init__()", type: "par" }] },
  { tokens: [{ text: "        self", type: "par" }, { text: ".embedding = nn.", type: "par" }, { text: "Embedding", type: "cls" }, { text: "(", type: "par" }] },
  { tokens: [{ text: "            config", type: "par" }, { text: ".vocab_size, config", type: "par" }, { text: ".hidden_size", type: "par" }] },
  { tokens: [{ text: "        )", type: "par" }] },
  { tokens: [{ text: "        self", type: "par" }, { text: ".layers = nn.", type: "par" }, { text: "ModuleList", type: "cls" }, { text: "([", type: "par" }] },
  { tokens: [{ text: "            ", type: "par" }, { text: "TransformerBlock", type: "cls" }, { text: "(config)", type: "par" }] },
  { tokens: [{ text: "            for _ in ", type: "kw" }, { text: "range", type: "num" }, { text: "(config", type: "par" }, { text: ".num_layers", type: "par" }] },
  { tokens: [{ text: "        ])", type: "par" }] },
  { tokens: [{ text: "        self", type: "par" }, { text: ".norm = ", type: "par" }, { text: "RMSNorm", type: "cls" }, { text: "(config", type: "par" }, { text: ".hidden_size", type: "par" }, { text: ")", type: "par" }] },
  { tokens: [{ text: "        self", type: "par" }, { text: ".lm_head = nn.", type: "par" }, { text: "Linear", type: "cls" }, { text: "(", type: "par" }] },
  { tokens: [{ text: "            config", type: "par" }, { text: ".hidden_size,", type: "par" }] },
  { tokens: [{ text: "            config", type: "par" }, { text: ".vocab_size,", type: "par" }] },
  { tokens: [{ text: "            bias", type: "par" }, { text: "=", type: "par" }, { text: "False", type: "kw" }] },
  { tokens: [{ text: "        )", type: "par" }] },
  { tokens: [{ text: "        # Weight tying", type: "cmt" }] },
  { tokens: [{ text: "        self", type: "par" }, { text: ".lm_head", type: "par" }, { text: ".weight = self", type: "par" }, { text: ".embedding", type: "par" }, { text: ".weight", type: "par" }] },
];

const highlights = [
  { label: "Weight-tied embedding and output" },
  { label: "Causal self-attention" },
  { label: "RoPE positional encoding" },
];

function SyntaxLine({ tokens }: { tokens: { text: string; type: string }[] }) {
  return (
    <span>
      {tokens.map((t, i) => {
        const cls =
          t.type === "kw"
            ? "text-[#c678dd]"
            : t.type === "cls"
              ? "text-[#e5c07b]"
              : t.type === "fn"
                ? "text-[#61afef]"
                : t.type === "cmt"
                  ? "text-[#5c6370] italic"
                  : t.type === "num"
                    ? "text-[#d19a66]"
                    : "text-[#abb2bf]";
        return (
          <span key={i} className={cls}>
            {t.text}
          </span>
        );
      })}
    </span>
  );
}

export function ImplementationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisibleLines(codeLines.length);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleLines(codeLines.length);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <ScrollKineticText
            text="Built from primitives"
            className="text-heading text-3xl md:text-4xl font-semibold text-text-primary"
            splitBy="words"
            direction="up"
            stagger={0.08}
          />
          <p className="mt-4 text-body text-text-secondary max-w-lg">
            No external model libraries. Every component implemented using
            pure PyTorch operations.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 rounded-sm border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.03]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[11px] text-text-tertiary font-mono tracking-wide">
                kairo/model.py
              </span>
            </div>

            {/* Code block */}
            <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
              <code>
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex"
                    style={
                      reduced
                        ? { opacity: 1, transform: "none" }
                        : visibleLines > i
                          ? {
                              opacity: 1,
                              transform: "translateY(0)",
                              transition: `opacity 0.3s var(--ease-out) ${i * 40}ms, transform 0.3s var(--ease-out) ${i * 40}ms`,
                            }
                          : { opacity: 0, transform: "translateY(6px)" }
                    }
                  >
                    <span className="text-text-tertiary w-8 shrink-0 select-none text-right mr-6 tabular-nums">
                      {i + 1}
                    </span>
                    <SyntaxLine tokens={line.tokens} />
                  </div>
                ))}
                {/* Blinking cursor on last line */}
                {!reduced && visibleLines >= codeLines.length && (
                  <div
                    className="flex"
                    style={{
                      opacity: 1,
                      animation: "code-line-in 0.3s var(--ease-out) both",
                      animationDelay: `${codeLines.length * 40 + 100}ms`,
                    }}
                  >
                    <span className="text-text-tertiary w-8 shrink-0 select-none text-right mr-6 tabular-nums">
                      {codeLines.length + 1}
                    </span>
                    <span className="inline-block w-[2px] h-[1.1em] bg-accent animate-cursor-blink align-middle" />
                  </div>
                )}
              </code>
            </pre>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 flex flex-wrap gap-6">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm text-text-secondary">{h.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
