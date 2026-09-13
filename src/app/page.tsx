"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { DockNav } from "@/components/layout/Dock";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/homepage/HeroSection";
import { ProblemSection } from "@/components/homepage/ProblemSection";
import { MechanismSection } from "@/components/homepage/MechanismSection";
import { GraphSection } from "@/components/homepage/GraphSection";
import { EcosystemSection } from "@/components/homepage/EcosystemSection";
import { CurrentStateSection } from "@/components/homepage/CurrentStateSection";
import { CreatorsSection } from "@/components/homepage/CreatorsSection";
import { RoadmapSection } from "@/components/homepage/RoadmapSection";
import { CTASection } from "@/components/homepage/CTASection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [prefersReduced]);

  return (
    <>
      <DockNav activePath="/" />
      <main>
        <HeroSection />
        <ProblemSection />
        <MechanismSection />
        <GraphSection />
        <EcosystemSection />
        <CurrentStateSection />
        <CreatorsSection />
        <RoadmapSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
