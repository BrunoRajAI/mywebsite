"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    pos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("a, button, [data-cursor-hover]") ||
      target.tagName === "A" ||
      target.tagName === "BUTTON"
    ) {
      ringRef.current?.classList.add("hovering");
    }
  }, []);

  const onMouseOut = useCallback(() => {
    ringRef.current?.classList.remove("hovering");
  }, []);

  useEffect(() => {
    // Check if device has fine pointer (not touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const animate = () => {
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.6;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.6;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px)`;
      }
      if (ringRef.current) {
        const ring = ringRef.current;
        const size = ring.classList.contains("hovering") ? 48 : 32;
        ring.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [onMouseMove, onMouseOver, onMouseOut]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}