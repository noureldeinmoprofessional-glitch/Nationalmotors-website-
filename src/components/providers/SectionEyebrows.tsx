"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Shared entrance reveal for large section eyebrows. Each eyebrow (its blue
 * line + label) fades and rises in as its section enters the viewport.
 * Hero eyebrows (.nm-ah / .nm-hero) run their own intro timelines, so they
 * are excluded here. Re-initialises on route change.
 */
export default function SectionEyebrows() {
  const pathname = usePathname();

  useEffect(() => {
    const all = gsap.utils.toArray<HTMLElement>(
      ".nm-eyebrow:not(.nm-eyebrow--sm):not(.nm-eyebrow--static)"
    );
    const els = all.filter((el) => !el.closest(".nm-ah, .nm-hero"));
    if (!els.length) return;

    if (prefersReducedMotion()) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 24 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }),
        });
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
