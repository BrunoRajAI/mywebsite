"use client";

import { useState, useEffect, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import CustomCursor from "@/components/portfolio/CustomCursor";
import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Skills from "@/components/portfolio/Skills";
import Stats from "@/components/portfolio/Stats";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => setIsLoading(false), []);

  // Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;
    const lenis = new Lenis({ duration: 0.7, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove((time) => lenis.raf(time * 1000)); lenis.destroy(); };
  }, [isLoading]);

  // GSAP scroll animations
  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-line").forEach((el) => {
        gsap.from(el, { scaleX: 0, scrollTrigger: { trigger: el, start: "top 88%" }, duration: 0.9, ease: "power3.out" });
      });
      gsap.utils.toArray<HTMLElement>("section").forEach((sec) => {
        const sweep = sec.querySelector<HTMLElement>(".sweep-line");
        if (sweep) gsap.fromTo(sweep, { scaleX: 0 }, { scaleX: 1, scrollTrigger: { trigger: sec, start: "top 80%" }, duration: 1.4, ease: "power2.inOut" });
      });
    });
    return () => ctx.revert();
  }, [isLoading]);

  return (
    <main className="relative min-h-screen flex flex-col bg-[#090909] noise">
      <CustomCursor />
      <LoadingScreen onComplete={handleLoadComplete} />
      {!isLoading && (
        <>
          <Navigation />
          <div className="flex-1">
            <Hero />
            <div className="sweep-line absolute left-0 right-0 h-px origin-left" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.12), transparent)" }} />
            <About />
            <Experience />
            <Stats />
            <Skills />
            <Education />
            <Contact />
          </div>
          <Footer />
        </>
      )}
    </main>
  );
}