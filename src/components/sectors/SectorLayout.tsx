"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { SECTORS, type SectorId } from "@/lib/sectorsContent";
import { SECTOR_PLANES } from "@/lib/sectorsLayout";

type Props = {
  /** Entrance mode: cinematic orbital (first reveal) vs. gentle reform (return). */
  entrance: "orbital" | "reform" | "none";
  /** The sector currently expanded (planes recede); null = full layout. */
  active: SectorId | null;
  onSelect: (id: SectorId, rect: DOMRect) => void;
};

/**
 * Stage 2 — the four flat 16:9 sector planes suspended in a 3D-perspective
 * scene around the central National Motors logo. Depth/rotation/parallax give
 * the spatial feel; the images stay flat and unlit. GSAP owns each plane's
 * transform (settled / entrance / hover / recede) and the plane-inner ambient
 * drift; the scene tilts with the pointer for parallax.
 */
export default function SectorLayout({ entrance, active, onSelect }: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const planeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ambientRef = useRef<gsap.core.Tween[]>([]);
  const parallaxRef = useRef<(() => void) | null>(null);
  const activeRef = useRef<SectorId | null>(active);
  const firstActiveRun = useRef(true);

  // Simplified, tighter spatial arrangement for small screens — reduced depth
  // and rotation, still perspectival (not a flat grid), fits one viewport.
  const MOBILE: Record<SectorId, { x: number; y: number; z: number; ry: number; scale: number }> = {
    automotive: { x: -26, y: -24, z: 0, ry: 6, scale: 1 },
    agriculture: { x: 26, y: -16, z: 0, ry: -6, scale: 1 },
    "real-estate": { x: -26, y: 16, z: 0, ry: 6, scale: 1 },
    csr: { x: 26, y: 24, z: 0, ry: -6, scale: 1 },
  };

  const settled = (id: SectorId) => {
    const mobile = window.innerWidth <= 768;
    if (mobile) {
      const m = MOBILE[id];
      return {
        xPercent: -50,
        yPercent: -50,
        x: (m.x / 100) * window.innerWidth,
        y: (m.y / 100) * window.innerHeight,
        z: m.z,
        rotationX: 0,
        rotationY: m.ry,
        rotationZ: 0,
        scale: m.scale,
        autoAlpha: 1,
      };
    }
    const c = SECTOR_PLANES[id];
    return {
      xPercent: -50,
      yPercent: -50,
      x: (c.x / 100) * window.innerWidth,
      y: (c.y / 100) * window.innerHeight,
      z: c.z,
      rotationX: c.rx,
      rotationY: c.ry,
      rotationZ: c.rz,
      scale: c.scale,
      autoAlpha: 1,
    };
  };

  useIsoLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const reduce = prefersReducedMotion();
    const planes = planeRefs.current.filter(Boolean) as HTMLButtonElement[];

    const ctx = gsap.context(() => {
      const startAmbient = () => {
        if (reduce) return;
        planes.forEach((pl, i) => {
          const inner = pl.querySelector<HTMLElement>(".nm-x__plane-inner");
          if (!inner) return;
          ambientRef.current.push(
            gsap.to(inner, {
              y: "+=7",
              rotationZ: "+=0.6",
              duration: 7 + i * 1.3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            }),
          );
        });
      };

      const setupParallax = () => {
        if (reduce) return;
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!fine) return;
        // Window-level listener — the scene is pointer-events:none (so the far
        // planes stay clickable), so we can't rely on a handler on the scene.
        // Perspective + differing plane translateZ turn one scene tilt into
        // real depth parallax (near planes shift more than far ones).
        const ry = gsap.quickTo(scene, "rotationY", { duration: 0.9, ease: "power3" });
        const rx = gsap.quickTo(scene, "rotationX", { duration: 0.9, ease: "power3" });
        const tx = gsap.quickTo(scene, "x", { duration: 0.9, ease: "power3" });
        const ty = gsap.quickTo(scene, "y", { duration: 0.9, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          if (activeRef.current) return;
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          ry(nx * 10);
          rx(-ny * 7);
          tx(nx * 24);
          ty(ny * 16);
        };
        const reset = () => {
          ry(0);
          rx(0);
          tx(0);
          ty(0);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("blur", reset);
        document.addEventListener("mouseleave", reset);
        parallaxRef.current = () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("blur", reset);
          document.removeEventListener("mouseleave", reset);
        };
      };

      if (reduce || entrance === "none") {
        planes.forEach((pl) => gsap.set(pl, settled(pl.dataset.sector as SectorId)));
        if (!reduce) {
          startAmbient();
          setupParallax();
        }
        return;
      }

      if (entrance === "reform") {
        // Gentle reconstruction (return from a sector) — not the orbital reveal.
        planes.forEach((pl, i) => {
          const id = pl.dataset.sector as SectorId;
          const s = settled(id);
          gsap.set(pl, { ...s, x: s.x * 0.7, y: s.y * 0.7, z: s.z - 60, scale: s.scale * 0.9, autoAlpha: 0 });
          gsap.to(pl, { ...s, duration: 0.85, ease: "power3.out", delay: 0.05 + i * 0.06 });
        });
        gsap.delayedCall(0.9, () => {
          startAmbient();
          setupParallax();
        });
        return;
      }

      // Orbital reveal — planes emerge from behind the logo on curved paths.
      planes.forEach((pl, i) => {
        const id = pl.dataset.sector as SectorId;
        const s = settled(id);
        const midX = s.x * 0.5 - s.y * 0.18;
        const midY = s.y * 0.5 + s.x * 0.18;
        gsap.set(pl, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          z: -40,
          rotationX: 0,
          rotationY: s.rotationY * 2.4,
          rotationZ: 0,
          scale: 0.12,
          autoAlpha: 0,
        });
        gsap.to(pl, {
          keyframes: [
            { autoAlpha: 1, scale: 0.3, duration: 0.35, ease: "power2.out" },
            {
              x: midX,
              y: midY,
              z: s.z * 0.4,
              rotationX: s.rotationX * 1.3,
              rotationY: s.rotationY * 1.5,
              rotationZ: s.rotationZ * 0.5,
              scale: s.scale * 0.72,
              duration: 0.8,
              ease: "power2.out",
            },
            {
              x: s.x,
              y: s.y,
              z: s.z,
              rotationX: s.rotationX,
              rotationY: s.rotationY,
              rotationZ: s.rotationZ,
              scale: s.scale,
              duration: 0.95,
              ease: "power3.inOut",
            },
          ],
          delay: 0.15 + i * 0.14,
        });
      });
      gsap.delayedCall(0.15 + planes.length * 0.14 + 1.9, () => {
        startAmbient();
        setupParallax();
      });

      // Recompute settled positions on resize (only when not expanded).
      const onResize = () => {
        if (activeRef.current) return;
        planes.forEach((pl) => gsap.set(pl, settled(pl.dataset.sector as SectorId)));
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, scene);

    return () => {
      ambientRef.current = [];
      parallaxRef.current?.();
      parallaxRef.current = null;
      ctx.revert();
    };

  }, []);

  // React to expand / return.
  useIsoLayoutEffect(() => {
    activeRef.current = active;
    // Skip the first run when nothing is active — the entrance effect owns the
    // initial reveal. (A deep-loaded sector DOES recede on first run.)
    if (firstActiveRun.current) {
      firstActiveRun.current = false;
      if (!active) return;
    }
    const scene = sceneRef.current;
    if (!scene) return;
    const reduce = prefersReducedMotion();
    const planes = planeRefs.current.filter(Boolean) as HTMLButtonElement[];

    if (active) {
      // Recede: pause ambient/parallax, hide the active plane (the internal
      // pinned image takes over at the same spot), push the others back.
      ambientRef.current.forEach((t) => t.pause());
      // Neutralise the parallax tilt so the scene isn't left skewed.
      if (!reduce) gsap.to(scene, { rotationX: 0, rotationY: 0, x: 0, y: 0, duration: 0.5, ease: "power2.out" });
      planes.forEach((pl) => {
        const id = pl.dataset.sector as SectorId;
        if (id === active) {
          gsap.to(pl, { autoAlpha: 0, duration: 0.35, ease: "power2.out" });
        } else if (!reduce) {
          const s = settled(id);
          gsap.to(pl, {
            autoAlpha: 0.12,
            z: s.z - 120,
            scale: s.scale * 0.82,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(pl, { autoAlpha: 0.12, duration: 0.3 });
        }
      });
    } else {
      // Reform to settled.
      planes.forEach((pl, i) => {
        const id = pl.dataset.sector as SectorId;
        gsap.to(pl, {
          ...settled(id),
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.05,
          overwrite: "auto",
        });
      });
      if (!reduce) ambientRef.current.forEach((t) => t.resume());
    }
     
  }, [active]);

  const hover = (i: number, on: boolean) => {
    if (active || prefersReducedMotion()) return;
    const planes = planeRefs.current.filter(Boolean) as HTMLButtonElement[];
    const target = planeRefs.current[i];
    if (!target) return;
    const id = target.dataset.sector as SectorId;
    const s = settled(id);
    if (on) {
      gsap.to(target, { z: s.z + 110, scale: s.scale * 1.07, rotationY: s.rotationY * 0.4, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      planes.forEach((pl) => pl !== target && gsap.to(pl, { autoAlpha: 0.55, duration: 0.5, overwrite: "auto" }));
    } else {
      planes.forEach((pl) => {
        const pid = pl.dataset.sector as SectorId;
        gsap.to(pl, { ...settled(pid), duration: 0.6, ease: "power3.out", overwrite: "auto" });
      });
    }
  };

  const select = (i: number) => {
    const pl = planeRefs.current[i];
    if (!pl) return;
    const img = pl.querySelector<HTMLElement>(".nm-x__plane-img");
    if (!img) return;
    onSelect(pl.dataset.sector as SectorId, img.getBoundingClientRect());
  };

  return (
    <div
      className="nm-x__scene"
      ref={sceneRef}
      aria-hidden={active ? true : undefined}
    >
      {SECTORS.map((s, i) => (
        <button
          key={s.id}
          type="button"
          className={`nm-x__plane nm-x__plane--${s.id}`}
          data-sector={s.id}
          ref={(el) => {
            planeRefs.current[i] = el;
          }}
          aria-label={`Open ${s.name} — ${s.headline}`}
          data-cursor="VIEW"
          onMouseEnter={() => hover(i, true)}
          onMouseLeave={() => hover(i, false)}
          onFocus={() => hover(i, true)}
          onBlur={() => hover(i, false)}
          onClick={() => select(i)}
        >
          <div className="nm-x__plane-inner">
            <div className="nm-x__plane-img">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(max-width: 768px) 80vw, 34vw"
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            </div>
          </div>
          <span className="nm-x__plane-label">
            <span className="nm-x__plane-n">{s.n}</span>
            {s.name}
          </span>
        </button>
      ))}
    </div>
  );
}
