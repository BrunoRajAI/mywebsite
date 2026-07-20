"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Skills from "@/components/portfolio/Skills";
import Stats from "@/components/portfolio/Stats";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
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