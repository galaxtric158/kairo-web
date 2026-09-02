"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-[100dvh]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border">
        <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-mono text-sm font-medium tracking-wider text-text-primary">
              KAIRO
            </span>
            <span className="text-text-tertiary text-xs font-mono hidden sm:inline">
              10M
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors duration-200",
                  pathname === link.href
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-16">{children}</main>

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
    </div>
  );
}
