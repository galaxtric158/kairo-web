"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DockNav } from "@/components/layout/Dock";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/homepage/HeroSection";
import { DefinitionSection } from "@/components/homepage/DefinitionSection";
import { ScaleSection } from "@/components/homepage/ScaleSection";
import { ArchitectureSection } from "@/components/homepage/ArchitectureSection";
import { ThoughtProcessSection } from "@/components/homepage/ThoughtProcessSection";
import { MechanismSection } from "@/components/homepage/MechanismSection";
import { ImplementationSection } from "@/components/homepage/ImplementationSection";
import { FeatureShowcaseSection } from "@/components/homepage/FeatureShowcaseSection";
import { CurrentStateSection } from "@/components/homepage/CurrentStateSection";
import { CreatorsSection } from "@/components/homepage/CreatorsSection";
import { RoadmapSection } from "@/components/homepage/RoadmapSection";
import { CTASection } from "@/components/homepage/CTASection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
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
  }, []);

  return (
    <>
      <DockNav activePath="/" />
      <main>
        <HeroSection />
        <DefinitionSection />
        <ScaleSection />
        <ArchitectureSection />
        <ThoughtProcessSection />
        <MechanismSection />
        <ImplementationSection />
        <FeatureShowcaseSection />
        <CurrentStateSection />
        <CreatorsSection />
        <RoadmapSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
