"use client";

import { useEffect, useRef } from "react";

/**
 * Adds .is-visible to any .reveal element when it enters the viewport.
 * One observer for the whole page; honors --reveal-delay per element.
 */
export default function Reveal() {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.current?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, []);

  return null;
}
