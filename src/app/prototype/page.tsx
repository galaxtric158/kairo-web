import { PageWrapper } from "@/components/layout/PageWrapper";
import { COMMON_FAULTS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prototype. Kairo.",
  description:
    "The planned Hardware Doctor CLI: inspect a project, read the device, diagnose the fault. Concept stage.",
};

const commands = [
  {
    cmd: "kairo init",
    text: "Detects project files, board, Python/C++ environment, GPIO usage, dependencies, and serial devices.",
  },
  {
    cmd: "kairo doctor",
    text: "Produces a project health report, a cited diagnosis and, with permission, a fix it then verifies on hardware.",
  },
];

export default function PrototypePage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
              Prototype
            </h1>
            <span className="rounded-full border border-white/[0.1] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
              Concept
            </span>
          </div>
          <p className="mt-4 text-text-secondary max-w-lg text-lg">
            The smallest thing that could prove the thesis: a CLI that tells
            you why your hardware project does not work. Designed, not built.
          </p>

          <div className="mt-16 max-w-3xl space-y-4">
            {commands.map((item) => (
              <div
                key={item.cmd}
                className="rounded-sm border border-white/[0.06] bg-[#0d0d0d]/80 p-6"
              >
                <div className="font-mono text-sm text-accent">{item.cmd}</div>
                <p className="mt-2 text-text-secondary">{item.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold text-text-primary">
            The first five faults
          </h2>
          <p className="mt-2 text-text-secondary max-w-lg">
            The prototype earns its existence on these before anything harder.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMMON_FAULTS.map((fault) => (
              <div
                key={fault.title}
                className="rounded-sm border border-white/[0.06] bg-white/[0.02] p-6 transition-[background-color,border-color] duration-200 hover:bg-white/[0.04] hover:border-white/[0.1]"
              >
                <h3 className="text-base font-semibold text-text-primary">
                  {fault.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {fault.description}
                </p>
                <div className="mt-4 font-mono text-[11px] text-accent">
                  {fault.signal}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
