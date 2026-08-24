"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Safety net for scroll reveals. Section headlines and [data-reveal] blocks are
 * hidden via CSS (html.nm-ready) and un-hidden by GSAP ScrollTrigger. When a
 * pinned section sits above them, those triggers can get stale positions and
 * never fire, leaving content permanently hidden (big empty gaps).
 *
 * This polls on a timer (independent of rAF / scroll events / Intersection
 * Observer — all of which can be throttled) and, once an element is in view,
 * force-reveals it if GSAP hasn't already (a successful GSAP reveal clears the
 * transform/opacity within the grace window, so this never double-fires it).
 * Hero elements run their own intro timelines and are excluded.
 */
export default function RevealFallback() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = new Set(
      Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-reveal], .nm-line-inner, .nm-eyebrow:not(.nm-eyebrow--sm)"
        )
      ).filter((el) => !el.closest(".nm-ah, .nm-hero"))
    );
    if (!pending.size) return;

    const revealIfHidden = (el: HTMLElement) => {
      const cs = getComputedStyle(el);
      let ty = 0;
      try {
        ty = new DOMMatrixReadOnly(cs.transform).m42;
      } catch {
        /* none */
      }
      if (Math.abs(ty) <= 4 && parseFloat(cs.opacity) >= 0.15) return; // GSAP already did it
      el.style.setProperty("transition", "transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease");
      el.style.setProperty("transform", "translateY(0px)", "important");
      el.style.setProperty("opacity", "1", "important");
    };

    const check = () => {
      const vh = window.innerHeight;
      for (const el of Array.from(pending)) {
        const r = el.getBoundingClientRect();
        // Once it has entered the viewport (with a little margin), hand it off.
        if (r.top < vh * 0.95 && r.bottom > vh * -0.05) {
          pending.delete(el);
          window.setTimeout(() => revealIfHidden(el), 500); // let GSAP try first
        }
      }
      if (!pending.size) {
        window.clearInterval(interval);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };

    const interval = window.setInterval(check, 250);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  return null;
}
