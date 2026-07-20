"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Stats from "@/components/portfolio/Stats";
import Skills from "@/components/portfolio/Skills";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);
  const handleLoadComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    if (isLoading) return;
    const lenis = new Lenis({ duration: 0.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove((time) => lenis.raf(time * 1000)); lenis.destroy(); };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-sweep").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" }, duration: 1.2, ease: "power2.inOut" });
      });
      gsap.utils.toArray<HTMLElement>(".section-line").forEach((el) => {
        gsap.from(el, { scaleX: 0, scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }, duration: 0.8, ease: "power3.out" });
      });
    });
    return () => ctx.revert();
  }, [isLoading]);

  return (
    <main className="relative min-h-screen flex flex-col">
      <LoadingScreen onComplete={handleLoadComplete} />
      {!isLoading && (
        <>
          <Navigation />
          <div className="flex-1">
            <Hero />
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