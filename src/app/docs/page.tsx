import { PageWrapper } from "@/components/layout/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs. Kairo-10M.",
  description: "Technical documentation for the Kairo-10M transformer model.",
};

export default function DocsPage() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
            Documentation
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg text-lg">
            Technical documentation for Kairo-10M.
          </p>

          <div className="mt-16 max-w-2xl">
            <p className="text-text-secondary">
              Documentation is currently being written. In the meantime, explore the
              architecture, model specifications, and implementation details through
              the links above.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
