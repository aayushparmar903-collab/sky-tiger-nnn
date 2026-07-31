"use client";

import { useEffect } from "react";

/**
 * Scroll parallax + pointer tilt, one rAF loop for the whole page.
 *
 * - Add class "parallax-layer" and data-speed="0.08" to any element:
 *   it drifts vertically as the page scrolls (negative = opposite direction).
 * - Add class "tilt" to any card: it tilts in 3D toward the pointer
 *   (pointer:fine devices only, skipped on touch).
 * All effects are disabled under prefers-reduced-motion.
 */
export default function ParallaxFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(document.querySelectorAll<HTMLElement>(".parallax-layer"));
    let ticking = false;

    function updateParallax() {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of layers) {
        const speed = parseFloat(el.dataset.speed ?? "0.08");
        const r = el.getBoundingClientRect();
        const centerOffset = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-centerOffset * speed).toFixed(1)}px, 0)`;
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    }

    // ---- 3D tilt (fine pointers only) ----
    const fine = window.matchMedia("(pointer: fine)").matches;
    const tilts = fine ? Array.from(document.querySelectorAll<HTMLElement>(".tilt")) : [];
    const cleanups: Array<() => void> = [];

    for (const el of tilts) {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-8px)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    }

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
