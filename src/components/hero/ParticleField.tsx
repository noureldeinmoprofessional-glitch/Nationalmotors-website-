"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };
type Ripple = { x: number; y: number; t: number };

/**
 * Lightweight 2D particle field for dark backgrounds.
 * - slow drift + connecting lines between near neighbours
 * - gentle cursor attraction
 * - expanding ripple on click/tap that pushes particles outward
 * Pauses when offscreen; renders nothing under prefers-reduced-motion.
 */
export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement!;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    const ripples: Ripple[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let running = true;

    const build = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.round((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].t += 1;
        if (ripples[i].t > 60) ripples.splice(i, 1);
      }

      for (const p of particles) {
        // drift
        p.x += p.vx;
        p.y += p.vy;

        // cursor attraction
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0.1) {
            const f = (1 - dist / 160) * 0.35;
            p.vx += (dx / dist) * f * 0.05;
            p.vy += (dy / dist) * f * 0.05;
          }
        }

        // ripple push
        for (const rp of ripples) {
          const dx = p.x - rp.x;
          const dy = p.y - rp.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const radius = rp.t * 9;
          if (Math.abs(dist - radius) < 40) {
            const f = (1 - rp.t / 60) * 0.9;
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
          }
        }

        // friction + wrap
        p.vx *= 0.96;
        p.vy *= 0.96;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const alpha = (1 - dist / LINK) * 0.16;
            ctx.strokeStyle = `rgba(150, 176, 220, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200, 212, 232, 0.55)";
        ctx.fill();
      }

      // ripple rings
      for (const rp of ripples) {
        const radius = rp.t * 9;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(111, 145, 199, ${(1 - rp.t / 60) * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => (pointer.active = false);
    const onDown = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, t: 0 });
    };

    build();
    draw();

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    // pause when offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
