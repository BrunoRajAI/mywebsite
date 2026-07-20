"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Lenis smooth scroll — snappy settings
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 0.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, [isLoading]);

  // GSAP scroll-triggered animations
  useEffect(() => {
    if (isLoading) return;

    // Parallax ambient orbs
    gsap.utils.toArray<HTMLElement>(".ambient-orb").forEach((orb) => {
      gsap.to(orb, {
        y: -100,
        scrollTrigger: {
          trigger: orb.closest("section") || orb.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // Section line animations
    gsap.utils.toArray<HTMLElement>(".section-line").forEach((line) => {
      gsap.from(line, {
        scaleX: 0,
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        duration: 0.8,
        ease: "power3.out",
      });
    });

    // Section sweep lines
    gsap.utils.toArray<HTMLElement>(".section-sweep").forEach((sweep) => {
      gsap.fromTo(
        sweep,
        { scaleX: 0 },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: sweep,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          duration: 1.2,
          ease: "power2.inOut",
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
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