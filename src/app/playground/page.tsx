import { PageWrapper } from "@/components/layout/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground. Kairo-10M.",
  description: "Interactive playground for the Kairo-10M transformer model.",
};

export default function PlaygroundPage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
            Playground
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg text-lg mx-auto">
            Interactive inference and chat interface coming soon.
          </p>

          <div className="mt-16 max-w-md mx-auto border border-border rounded-sm bg-bg-glass p-8">
            <div className="font-mono text-sm text-text-tertiary mb-4">
              Status: In Development
            </div>
            <p className="text-sm text-text-secondary">
              The playground will allow you to interact with Kairo-10M directly
              in your browser. Check back for updates.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
