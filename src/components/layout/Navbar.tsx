"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { GlassOverlay } from "@/components/ui/GlassMaterial";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-200",
        scrolled
          ? "bg-white/[0.05] backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.06]"
          : "bg-transparent border-b-transparent"
      )}
    >
      <nav className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-sm font-medium tracking-[0.08em] text-text-primary">
            KAIRO
          </span>
          <span className="text-text-tertiary text-[10px] font-mono tracking-widest uppercase">
            10M
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[13px] text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors duration-150 py-3"
              >
                {link.label}
              </Link>
          ))}
          <div className="w-px h-3 bg-white/10 mx-1" />
            <a
              href="https://github.com/Nathanael-Ethan/Kairo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors duration-150 py-3"
            >
              GitHub
            </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform duration-100"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={cn(
              "w-4 h-px bg-text-primary transition-transform duration-200 ease-out",
              mobileOpen && "rotate-45 translate-y-[3.5px]"
            )}
          />
          <span
            className={cn(
              "w-4 h-px bg-text-primary transition-transform duration-200 ease-out",
              mobileOpen && "-rotate-45 -translate-y-[3.5px]"
            )}
          />
        </button>
      </nav>

      {/* Mobile menu — Level 3 glass overlay */}
      <GlassOverlay visible={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="px-6 pt-20 pb-8 flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors duration-150 active:opacity-70 py-4 border-b border-white/[0.04]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/Nathanael-Ethan/Kairo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors duration-150 active:opacity-70 py-4 mt-4"
          >
            GitHub
          </a>
        </div>
      </GlassOverlay>
    </header>
  );
}
