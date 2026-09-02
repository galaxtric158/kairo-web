"use client";

import { useState, useCallback } from "react";
import { MODEL_SPECS } from "@/lib/constants";

const HEADS = Array.from({ length: MODEL_SPECS.attentionHeads }, (_, i) => ({
  id: i,
  label: `Head ${i}`,
  color: ["#d4a853", "#5b9bd5", "#70ad47", "#ed7d31"][i],
  connections: [
    ["Token→Q", "Key→Value", "Output projection"],
    ["Token→K", "Value→Output", "Softmax weights"],
    ["Query→Key", "Attention scores", "Weighted sum"],
    ["Multi-head concat", "Linear projection", "Residual add"],
  ][i],
}));

interface AttentionInteractionProps {
  className?: string;
}

export function AttentionInteraction({ className = "" }: AttentionInteractionProps) {
  const [selectedHead, setSelectedHead] = useState<number | null>(null);

  const toggleHead = useCallback((id: number) => {
    setSelectedHead((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 mb-6">
        {HEADS.map((head) => (
          <button
            key={head.id}
            onClick={() => toggleHead(head.id)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-sm transition-all duration-200 active:scale-[0.97]"
            style={{
              borderColor:
                selectedHead === head.id ? head.color : "rgba(255,255,255,0.06)",
              backgroundColor:
                selectedHead === head.id
                  ? `${head.color}15`
                  : "rgba(255,255,255,0.03)",
              color:
                selectedHead === head.id ? head.color : "var(--text-secondary)",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: head.color,
                opacity: selectedHead === head.id ? 1 : 0.4,
              }}
            />
            {head.label}
          </button>
        ))}
        {selectedHead !== null && (
          <button
            onClick={() => setSelectedHead(null)}
            className="px-3 py-1.5 text-xs font-mono text-text-tertiary hover:text-text-secondary rounded-sm transition-colors bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05]"
          >
            Reset
          </button>
        )}
      </div>

      {/* Connection visualization */}
      <div className="relative rounded-sm bg-white/[0.03] border border-white/[0.06] p-4 overflow-hidden">
        {selectedHead !== null ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: HEADS[selectedHead].color }}
              />
              <span
                className="text-sm font-mono"
                style={{ color: HEADS[selectedHead].color }}
              >
                {HEADS[selectedHead].label}
              </span>
              <span className="text-xs text-text-tertiary">
                · 64 head dimension · softmax(QK<sup>T</sup>/√d) · V
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {HEADS[selectedHead].connections.map((conn, i) => (
                <div
                  key={i}
                  className="rounded-sm px-3 py-2 text-xs font-mono text-text-secondary bg-white/[0.02] border border-white/[0.04]"
                  style={{
                    borderColor: `${HEADS[selectedHead].color}30`,
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {conn}
                </div>
              ))}
            </div>
            <div className="mt-3 text-[10px] font-mono text-text-tertiary">
              head_dim = hidden_size / n_heads = {MODEL_SPECS.hiddenSize} / {MODEL_SPECS.attentionHeads} = {MODEL_SPECS.headDim}
            </div>
          </div>
        ) : (
          <div className="text-sm text-text-tertiary text-center py-4">
            Select an attention head to view its conceptual connections
          </div>
        )}
      </div>
    </div>
  );
}
