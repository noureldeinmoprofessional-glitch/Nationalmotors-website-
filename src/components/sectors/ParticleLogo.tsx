"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Fired once the logo has resolved and particles begin releasing —
   *  the orchestrator fades in the crisp DOM logo and starts the sectors. */
  onResolved: () => void;
  /** Fired when the release finishes and the canvas can be removed. */
  onComplete: () => void;
};

type P = {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  ox: number; // release vector
  oy: number;
  delay: number;
  dur: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;

/**
 * Stage 1 — particles sample the National Motors vertical logo SVG and
 * assemble into its shape, hold briefly, then release as the sector planes
 * emerge. Canvas 2D, deterministic, capped particle count, self-terminating
 * (no loop left running). Reduced-motion is handled by the parent, which
 * skips this component entirely.
 */
export default function ParticleLogo({ onResolved, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resolvedRef = useRef(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;
    let raf = 0;
    let particles: P[] = [];
    let start = 0;
    let retries = 0;

    // Phase timings (seconds)
    const ASSEMBLE = 1.8;
    const HOLD = 0.7;
    const RELEASE = 0.9;

    const setSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const build = (img: HTMLImageElement) => {
      setSize();
      // Guard against a not-yet-laid-out (zero-size) viewport: retry a few
      // frames, then fall through gracefully so the experience never stalls.
      if (W < 2 || H < 2) {
        if (retries++ < 150) {
          raf = requestAnimationFrame(() => build(img));
          return;
        }
        onResolved();
        onComplete();
        return;
      }
      // Rasterise the logo at a centered target size and sample its pixels.
      const logoH = Math.min(H * 0.34, 300);
      const logoW = logoH * (261.39 / 360.89);
      const off = document.createElement("canvas");
      const ow = Math.ceil(logoW);
      const oh = Math.ceil(logoH);
      off.width = ow;
      off.height = oh;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0, ow, oh);
      const data = octx.getImageData(0, 0, ow, oh).data;

      const offsetX = (W - logoW) / 2;
      const offsetY = (H - logoH) / 2;
      const cx = W / 2;
      const cy = H / 2;

      // Adaptive step to keep the particle count elegant, not dense.
      let step = 3;
      const targets: Array<[number, number]> = [];
      const collect = (s: number) => {
        targets.length = 0;
        for (let y = 0; y < oh; y += s) {
          for (let x = 0; x < ow; x += s) {
            if (data[(y * ow + x) * 4 + 3] > 110) {
              targets.push([offsetX + x, offsetY + y]);
            }
          }
        }
      };
      collect(step);
      while (targets.length > 1200) {
        step += 1;
        collect(step);
      }

      particles = targets.map(([tx, ty]) => {
        const ang = Math.random() * Math.PI * 2;
        const rad = 120 + Math.random() * Math.max(W, H) * 0.5;
        const relAng = Math.atan2(ty - cy, tx - cx);
        return {
          sx: cx + Math.cos(ang) * rad,
          sy: cy + Math.sin(ang) * rad,
          tx,
          ty,
          ox: Math.cos(relAng) * (60 + Math.random() * 120),
          oy: Math.sin(relAng) * (60 + Math.random() * 120),
          delay: Math.random() * 0.5,
          dur: 1.0 + Math.random() * 0.3,
        };
      });

      start = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, W, H);

      let globalAlpha = 1;
      let phase: "assemble" | "hold" | "release" = "assemble";
      if (t > ASSEMBLE + HOLD) phase = "release";
      else if (t > ASSEMBLE) phase = "hold";

      if (phase === "assemble") globalAlpha = Math.min(1, t / 0.6);

      let releaseP = 0;
      if (phase === "release") {
        releaseP = Math.min(1, (t - ASSEMBLE - HOLD) / RELEASE);
        globalAlpha = 1 - easeInCubic(releaseP);
        if (!doneRef.current && releaseP === 0) {
          // (guarded below)
        }
      }

      if (phase !== "assemble" && !resolvedRef.current) {
        resolvedRef.current = true;
        onResolved();
      }

      ctx.fillStyle = `rgba(217, 217, 217, ${0.85 * globalAlpha})`;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let x: number;
        let y: number;
        if (phase === "assemble") {
          const local = Math.max(0, Math.min(1, (t - p.delay) / p.dur));
          const e = easeOutCubic(local);
          x = p.sx + (p.tx - p.sx) * e;
          y = p.sy + (p.ty - p.sy) * e;
        } else if (phase === "hold") {
          x = p.tx;
          y = p.ty;
        } else {
          const e = easeInCubic(releaseP);
          x = p.tx + p.ox * e;
          y = p.ty + p.oy * e;
        }
        ctx.fillRect(x, y, 1.4, 1.4);
      }

      if (phase === "release" && releaseP >= 1) {
        if (!doneRef.current) {
          doneRef.current = true;
          onComplete();
        }
        return; // stop the loop
      }
      raf = requestAnimationFrame(frame);
    };

    setSize();
    const img = new Image();
    img.onload = () => build(img);
    img.onerror = () => {
      // Fail-safe: don't trap the experience if the SVG can't rasterise.
      onResolved();
      onComplete();
    };
    img.src = "/logos/nm-logo-white.svg";

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="nm-x__particles" aria-hidden="true" />;
}
