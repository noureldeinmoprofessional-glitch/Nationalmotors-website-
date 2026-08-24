"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Reveal A — fade + translate upward for a batch of [data-reveal] children,
 * or the element itself. Runs once when the element scrolls into view.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  selector?: string;
}) {
  const ref = useRef<T>(null);
  const {
    y = 34,
    stagger = 0.09,
    duration = 0.9,
    start = "top 82%",
    selector = "[data-reveal]",
  } = options ?? {};

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(selector);
      const items = targets.length ? targets : [el];

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      gsap.set(items, { opacity: 0, y });
      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () =>
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: "power3.out",
          }),
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Reveal C — masked line reveal. Wrap each line in .nm-line-mask > .nm-line-inner.
 * Animates .nm-line-inner from translateY(110%) to 0.
 */
export function useLineReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  start?: string;
  stagger?: number;
  duration?: number;
}) {
  const ref = useRef<T>(null);
  const { start = "top 85%", stagger = 0.12, duration = 1 } = options ?? {};

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>(".nm-line-inner");
      if (!lines.length) return;

      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0 });
        return;
      }
      gsap.set(lines, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () =>
          gsap.to(lines, {
            yPercent: 0,
            duration,
            stagger,
            ease: "power4.out",
          }),
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Reveal E — subtle parallax on a child image [data-parallax] as the
 * container scrolls through the viewport.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(options?: {
  amount?: number; // percentage of movement
  selector?: string;
}) {
  const ref = useRef<T>(null);
  const { amount = 8, selector = "[data-parallax]" } = options ?? {};

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const img = el.querySelector<HTMLElement>(selector);
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Reveal B — clip-path reveal for an image container. The element itself is
 * clipped from inset(0 100% 0 0) to inset(0 0% 0 0), with a gentle inner scale.
 */
export function useClipReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  start?: string;
  duration?: number;
  from?: string;
  innerSelector?: string;
}) {
  const ref = useRef<T>(null);
  const {
    start = "top 80%",
    duration = 1.2,
    from = "inset(0 0 100% 0)",
    innerSelector = "[data-clip-inner]",
  } = options ?? {};

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const inner = el.querySelector<HTMLElement>(innerSelector);
      if (prefersReducedMotion()) {
        gsap.set(el, { clipPath: "inset(0 0 0 0)" });
        return;
      }
      gsap.set(el, { clipPath: from });
      if (inner) gsap.set(inner, { scale: 1.18 });
      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          gsap.to(el, {
            clipPath: "inset(0 0 0% 0)",
            duration,
            ease: "power4.inOut",
          });
          if (inner)
            gsap.to(inner, { scale: 1, duration: duration + 0.3, ease: "power3.out" });
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return ref;
}
