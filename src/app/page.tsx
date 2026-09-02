"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/homepage/HeroSection";
import { DefinitionSection } from "@/components/homepage/DefinitionSection";
import { ScaleSection } from "@/components/homepage/ScaleSection";
import { ArchitectureSection } from "@/components/homepage/ArchitectureSection";
import { MechanismSection } from "@/components/homepage/MechanismSection";
import { ImplementationSection } from "@/components/homepage/ImplementationSection";
import { CurrentStateSection } from "@/components/homepage/CurrentStateSection";
import { RoadmapSection } from "@/components/homepage/RoadmapSection";
import { CTASection } from "@/components/homepage/CTASection";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
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
        <MechanismSection />
        <div className="section-divider" />
        <ImplementationSection />
        <CurrentStateSection />
        <div className="section-divider" />
        <RoadmapSection />
        <div className="section-divider" />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
