"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { SECTORS, type SectorId } from "@/lib/sectorsContent";
import IsoLevelWarp from "@/components/ui/isometric-wave-grid-background";
import LogoMark from "./LogoMark";
import ParticleLogo from "./ParticleLogo";
import SectorLayout from "./SectorLayout";
import SectorContent from "./SectorContent";

type Stage = "intro" | "layout" | "sector";

/**
 * Sectors — one cinematic, three-stage experience:
 *   INTRO (particles → NM logo) → LAYOUT (4 orbiting 16:9 planes) → SECTOR
 *   (pinned image + scrolling content).
 *
 * The orchestrator owns stage state, the persistent central logo (the anchor
 * across every stage), routing (history.replaceState + catch-all route) and
 * reduced-motion. Each stage's own choreography lives in its component with
 * isolated, cleaned-up GSAP contexts.
 */
export default function SectorsExperience({
  initialSector = null,
}: {
  initialSector?: SectorId | null;
}) {
  const reduce = typeof window !== "undefined" && prefersReducedMotion();

  const [stage, setStage] = useState<Stage>(() => {
    if (initialSector) return "sector";
    return reduce ? "layout" : "intro";
  });
  const [active, setActive] = useState<SectorId | null>(initialSector);
  const [closing, setClosing] = useState(false);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
  const layoutEntrance: "orbital" | "none" = initialSector || reduce ? "none" : "orbital";

  const rootRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activeSector = active ? SECTORS.find((s) => s.id === active) ?? null : null;

  // Lock page scroll while a sector overlay is open (its own content scrolls).
  useEffect(() => {
    if (stage !== "sector") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [stage]);

  const syncUrl = (id: SectorId | null) => {
    if (typeof window === "undefined") return;
    try {
      window.history.replaceState(null, "", id ? `/sectors/${id}` : "/sectors");
    } catch {
      /* ignore */
    }
  };

  // --- Central logo: intro resolve, recede on open, reform on return ---
  useIsoLayoutEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;
    gsap.set(logo, { xPercent: -50, yPercent: -50 });
    if (reduce) {
      gsap.set(logo, { autoAlpha: active ? 0.35 : 1, scale: active ? 0.86 : 1 });
      return;
    }
    if (stage === "intro") {
      gsap.set(logo, { autoAlpha: 0, scale: 1.05 });
    } else {
      gsap.set(logo, { autoAlpha: active ? 0.35 : 1, scale: active ? 0.86 : 1 });
      // Very subtle idle sway — near-static anchor.
      const sway = gsap.to(logo, { y: "+=5", duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1 });
      return () => {
        sway.kill();
      };
    }
     
  }, [stage]);

  useIsoLayoutEffect(() => {
    const logo = logoRef.current;
    if (!logo || stage === "intro" || reduce) return;
    gsap.to(logo, {
      autoAlpha: active ? 0.35 : 1,
      scale: active ? 0.86 : 1,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
     
  }, [active]);

  // --- Intro handlers ---
  const onLogoResolved = () => {
    const logo = logoRef.current;
    if (logo && !reduce) gsap.to(logo, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out" });
  };
  const onIntroComplete = () => setStage("layout");

  // --- Open / close ---
  const open = (id: SectorId, rect: DOMRect) => {
    if (active) return;
    setSourceRect(rect);
    triggerRef.current = document.querySelector<HTMLButtonElement>(`.nm-x__plane--${id}`);
    setActive(id);
    setStage("sector");
    syncUrl(id);
  };
  const requestClose = () => setClosing(true);
  const finishExit = () => {
    const id = active;
    setActive(null);
    setStage("layout");
    setClosing(false);
    setSourceRect(null);
    syncUrl(null);
    window.scrollTo(0, 0);
    window.setTimeout(() => {
      const el = triggerRef.current ?? rootRef.current?.querySelector<HTMLButtonElement>(`.nm-x__plane--${id}`);
      el?.focus();
    }, 40);
  };

  return (
    <>
    <section ref={rootRef} className="nm-x" aria-label="Our Sectors" data-stage={stage}>
      <IsoLevelWarp className="nm-x__backdrop" color="217, 217, 217" density={48} speed={1} aria-hidden="true" />

      <p className="nm-eyebrow nm-eyebrow--sm nm-x__eyebrow" data-stage-hide={stage === "sector" ? "" : undefined}>
        Our Sectors
      </p>

      {/* Persistent central logo — the anchor across every stage. */}
      <div className="nm-x__logo" ref={logoRef} aria-hidden={stage === "sector" ? true : undefined}>
        <LogoMark className="nm-x__logo-mark" />
      </div>

      {stage === "intro" && !reduce && (
        <ParticleLogo onResolved={onLogoResolved} onComplete={onIntroComplete} />
      )}

      {stage !== "intro" && (
        <SectorLayout entrance={layoutEntrance} active={active} onSelect={open} />
      )}
    </section>

    {stage === "sector" && activeSector && (
      <SectorContent
        sector={activeSector}
        sourceRect={sourceRect}
        closing={closing}
        onClose={requestClose}
        onExited={finishExit}
      />
    )}
    </>
  );
}
