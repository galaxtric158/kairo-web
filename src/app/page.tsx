"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
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
      <Navbar />
      <main>
        <HeroSection />
        <div className="section-divider" />
        <DefinitionSection />
        <div className="section-divider" />
        <ScaleSection />
        <div className="section-divider" />
        <ArchitectureSection />
        <div className="section-divider" />
        <ThoughtProcessSection />
        <div className="section-divider" />
        <MechanismSection />
        <div className="section-divider" />
        <ImplementationSection />
        <div className="section-divider" />
        <FeatureShowcaseSection />
        <CurrentStateSection />
        <div className="section-divider" />
        <CreatorsSection />
        <div className="section-divider" />
        <RoadmapSection />
        <div className="section-divider" />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
