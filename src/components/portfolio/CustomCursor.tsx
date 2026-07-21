"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const isMoving = useRef(false);
  const stopTimer = useRef<ReturnType<typeof setTimeout>>();

  const startLoop = useCallback(() => {
    if (isMoving.current) return;
    isMoving.current = true;

    const animate = () => {
      if (!isMoving.current) return;

      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.5;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.5;
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
  }, []);

  const stopLoop = useCallback(() => {
    clearTimeout(stopTimer.current);
    stopTimer.current = setTimeout(() => {
      isMoving.current = false;
      cancelAnimationFrame(raf.current);
    }, 150);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    pos.current = { x: e.clientX, y: e.clientY };
    startLoop();
    stopLoop();
  }, [startLoop, stopLoop]);

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
    if (!window.matchMedia("(pointer: fine)").matches) return;

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      isMoving.current = false;
      cancelAnimationFrame(raf.current);
      clearTimeout(stopTimer.current);
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