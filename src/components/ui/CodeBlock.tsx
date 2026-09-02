"use client";

import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "bg-bg-secondary border border-border rounded-sm overflow-x-auto",
        className
      )}
    >
      <div className="p-6 font-mono text-sm leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            {showLineNumbers && (
              <span className="text-text-tertiary w-8 shrink-0 select-none text-right mr-6">
                {i + 1}
              </span>
            )}
            <span className="text-text-primary">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
