"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DockNav } from "@/components/layout/Dock";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-[100dvh]">
      <div className="pt-16">{children}</div>

      <footer className="border-t border-border bg-bg-secondary">
        <div className="max-w-[1200px] mx-auto px-6 py-8 flex items-center justify-between">
          <Link href="/" className="text-xs text-text-tertiary font-mono hover:text-text-secondary transition-colors">
            KAIRO
          </Link>
          <span className="text-xs text-text-tertiary font-mono">
            ~10.23M parameters
          </span>
        </div>
      </footer>

      <DockNav activePath={pathname} />
    </div>
  );
}
