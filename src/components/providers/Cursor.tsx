"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Premium custom cursor. A small dot that expands over interactive elements
 * and can display a contextual label (VIEW / PLAY / OPEN / DRAG) via the
 * `data-cursor` attribute on any element. Native cursor on touch devices.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const dot = dotRef.current!;
    const label = labelRef.current!;
    document.documentElement.classList.add("nm-cursor-on");

    const xTo = gsap.quickTo(dot, "x", { duration: 0.32, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.32, ease: "power3" });

    let visible = false;
    const move = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to(dot, { autoAlpha: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);

      const interactive = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select, [role='button']"
      );
      const text = interactive?.getAttribute("data-cursor");

      if (interactive) {
        dot.dataset.active = "true";
        if (text) {
          dot.dataset.label = "true";
          label.textContent = text;
        } else {
          delete dot.dataset.label;
          label.textContent = "";
        }
      } else {
        delete dot.dataset.active;
        delete dot.dataset.label;
        label.textContent = "";
      }
    };

    const leave = () => {
      visible = false;
      gsap.to(dot, { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      document.documentElement.classList.remove("nm-cursor-on");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={dotRef} className="nm-cursor" aria-hidden="true">
      <span ref={labelRef} className="nm-cursor__label" />
    </div>
  );
}
