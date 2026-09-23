"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import type { Sector } from "@/lib/sectorsContent";
import { SECTOR_PLANES } from "@/lib/sectorsLayout";
import LogoMark from "./LogoMark";

type Props = {
  sector: Sector;
  /** Viewport rect of the originating layout plane image, for the FLIP travel. */
  sourceRect: DOMRect | null;
  closing: boolean;
  onClose: () => void;
  onExited: () => void;
};

/**
 * Stage 3 — internal sector experience. Two-column editorial: a pinned 16:9
 * image (left) that physically travels in from its Stage-2 plane position, and
 * scrollable verbatim content (right). The image stays flat and unlit; only its
 * perspective flattens toward frontal as it settles. Closing is a dedicated
 * organic release, not a timeline reverse.
 */
export default function SectorContent({ sector, sourceRect, closing, onClose, onExited }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);

  const intro = sector.blocks.find((b) => b.role === "introduction");
  const milestones = sector.blocks.find((b) => b.role === "milestones");
  const bodyBlocks = sector.blocks.filter(
    (b) => b.role !== "introduction" && b.role !== "milestones",
  );

  // --- Enter (FLIP travel of the image) + scroll storytelling ---
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = prefersReducedMotion();
    const scroller = root;
    const cfg = SECTOR_PLANES[sector.id];

    const ctx = gsap.context(() => {
      const frame = root.querySelector<HTMLElement>(".nm-sc__frame");
      const bar = root.querySelector<HTMLElement>(".nm-sc__bar");
      const veil = root.querySelector<HTMLElement>(".nm-sc__veil");
      const reveals = gsap.utils.toArray<HTMLElement>("[data-sc-reveal]");

      reveals.forEach((el) => {
        if (reduce) {
          gsap.set(el, { autoAlpha: 1, y: 0 });
          return;
        }
        gsap.set(el, { autoAlpha: 0, y: 30 });
        ScrollTrigger.create({
          scroller,
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }),
        });
      });

      // Milestone line draw (automotive).
      const line = root.querySelector<HTMLElement>(".nm-sc__tl-line");
      const timeline = root.querySelector<HTMLElement>(".nm-sc__timeline");
      if (line && timeline) {
        if (reduce) gsap.set(line, { scaleY: 1 });
        else
          gsap.fromTo(
            line,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { scroller, trigger: timeline, start: "top 72%", end: "bottom 72%", scrub: true } },
          );
      }

      if (reduce) {
        gsap.set([veil, frame], { autoAlpha: 1 });
        gsap.set(frame, { x: 0, y: 0, scale: 1, rotationX: 0, rotationY: 0 });
        if (bar) gsap.set(bar, { autoAlpha: 1, y: 0 });
        ScrollTrigger.refresh();
        return;
      }

      if (veil) {
        gsap.set(veil, { autoAlpha: 0 });
        gsap.to(veil, { autoAlpha: 1, duration: 0.5, ease: "power2.inOut" });
      }
      if (bar) {
        gsap.set(bar, { autoAlpha: 0, y: -14 });
        gsap.to(bar, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.45 });
      }

      // FLIP: start the frame at the plane's on-screen rect + its plane
      // rotation, then travel to the pinned, frontal position.
      if (frame && sourceRect) {
        const nr = frame.getBoundingClientRect();
        const scale = sourceRect.width / nr.width || 1;
        const x = sourceRect.left + sourceRect.width / 2 - (nr.left + nr.width / 2);
        const y = sourceRect.top + sourceRect.height / 2 - (nr.top + nr.height / 2);
        gsap.set(frame, {
          x,
          y,
          scale,
          rotationX: cfg.rx,
          rotationY: cfg.ry,
          rotationZ: cfg.rz,
          transformPerspective: 1100,
          transformOrigin: "center center",
          autoAlpha: 1,
        });
        gsap.to(frame, {
          x: 0,
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          duration: 0.95,
          ease: "power3.inOut",
          onComplete: () => ScrollTrigger.refresh(),
        });
      } else if (frame) {
        gsap.fromTo(frame, { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" });
      }
    }, root);

    const t = window.setTimeout(() => backRef.current?.focus(), 40);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
     
  }, []);

  // --- Organic close (not a reverse of the entrance) ---
  useEffect(() => {
    if (!closing) return;
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      onExited();
      return;
    }
    root.scrollTop = 0;
    const cfg = SECTOR_PLANES[sector.id];
    const frame = root.querySelector<HTMLElement>(".nm-sc__frame");
    const items = gsap.utils.toArray<HTMLElement>(".nm-sc__content > *, .nm-sc__bar");

    const veil = root.querySelector<HTMLElement>(".nm-sc__veil");
    const tl = gsap.timeline({ onComplete: onExited });
    tl.to(items, { autoAlpha: 0, y: -12, duration: 0.35, stagger: 0.02, ease: "power2.in" }, 0);
    if (veil) tl.to(veil, { autoAlpha: 0, duration: 0.55, ease: "power2.in" }, 0.25);
    if (frame) {
      tl.to(
        frame,
        {
          x: cfg.x * 6,
          y: cfg.y * 6,
          scale: 0.68,
          rotationX: cfg.rx,
          rotationY: cfg.ry,
          rotationZ: cfg.rz,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.in",
        },
        0.05,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <section
      ref={rootRef}
      className="nm-sc"
      data-sector={sector.id}
      aria-label={`${sector.name} sector`}
      data-lenis-prevent
    >
      <div className="nm-sc__veil" aria-hidden="true" />
      <header className="nm-sc__bar">
        <button
          ref={backRef}
          type="button"
          className="nm-sc__back"
          onClick={onClose}
          data-cursor="BACK"
          aria-label="Back to all sectors"
        >
          <ArrowLeft strokeWidth={1.6} aria-hidden="true" />
          <span>All Sectors</span>
        </button>
        <span className="nm-sc__crumb" aria-hidden="true">
          {sector.n} · {sector.name}
        </span>
        <LogoMark className="nm-sc__logo" />
      </header>

      <div className="nm-sc__grid">
        <div className="nm-sc__media">
          <div className="nm-sc__frame">
            <Image src={sector.image} alt={sector.imageAlt} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} priority />
          </div>
        </div>

        <div className="nm-sc__content">
          <p className="nm-sc__num" data-sc-reveal>
            {sector.n}
          </p>
          <h1 className="nm-sc__name" data-sc-reveal>
            {sector.name}
          </h1>
          <p className="nm-sc__headline" data-sc-reveal>
            {sector.headline}
          </p>
          {intro && (
            <p className="nm-sc__intro" data-sc-reveal>
              {intro.text}
            </p>
          )}

          {milestones && milestones.role === "milestones" && (
            <ol className="nm-sc__timeline" data-sc-reveal aria-label="Automotive brand progression">
              <span className="nm-sc__tl-line" aria-hidden="true" />
              {milestones.items.map((m) => (
                <li className="nm-sc__tl-item" key={m.brand}>
                  <span className="nm-sc__tl-dot" aria-hidden="true" />
                  <h2 className="nm-sc__tl-brand">{m.brand}</h2>
                  <p className="nm-sc__tl-text">{m.text}</p>
                </li>
              ))}
            </ol>
          )}

          {bodyBlocks.map((b, i) => {
            const cls =
              b.role === "closing"
                ? "nm-sc__closing"
                : b.role === "emphasis"
                  ? "nm-sc__emphasis"
                  : "nm-sc__para";
            return (
              <p className={cls} data-sc-reveal key={`${b.role}-${i}`}>
                {b.text}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
