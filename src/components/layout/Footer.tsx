import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <span className="font-mono text-sm font-medium tracking-wider text-text-primary">
              KAIRO
            </span>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-xs">
              A decoder-only transformer implemented completely from scratch
              using PyTorch primitives.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-text-tertiary mb-4">
              Project
            </h3>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-text-tertiary mb-4">
              Connect
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                GitHub
              </a>
              <span className="text-sm text-text-tertiary">
                Playground — Coming soon
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-text-tertiary font-mono">
            Built from first principles
          </span>
          <span className="text-xs text-text-tertiary font-mono">
            ~10.23M parameters
          </span>
        </div>
      </div>
    </footer>
  );
}
