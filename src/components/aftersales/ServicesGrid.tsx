"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { AFTER_SALES_SERVICES } from "@/lib/afterSalesData";
import { useAppointment } from "./AppointmentProvider";

type Service = (typeof AFTER_SALES_SERVICES.items)[number];

function ServiceCard({ s, index }: { s: Service; index: number }) {
  const { open } = useAppointment();
  const rootRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLSpanElement>(null);
  const revealRef = useRef<HTMLSpanElement>(null);
  const scrimRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reduceRef = useRef(false);
  const hoverRef = useRef(false);

  useIsoLayoutEffect(() => {
    const img = imgRef.current;
    const reveal = revealRef.current;
    const scrim = scrimRef.current;
    if (!img || !reveal || !scrim) return;

    hoverRef.current = window.matchMedia("(hover: hover)").matches;
    reduceRef.current = prefersReducedMotion();

    if (!hoverRef.current || reduceRef.current) {
      gsap.set(reveal, { opacity: 1, y: 0 });
      gsap.set(scrim, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const blur = { v: 0 };
      const setBlur = () => { img.style.filter = `blur(${blur.v.toFixed(2)}px)`; };
      gsap.set(reveal, { opacity: 0, y: 14 });
      gsap.set(scrim, { opacity: 0.85 });

      const tl = gsap.timeline({ paused: true });
      tl.to(img, { scale: 1.03, duration: 0.55, ease: "power2.out" }, 0)
        .to(blur, { v: 4, duration: 0.55, ease: "power2.out", onUpdate: setBlur }, 0)
        .to(scrim, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
        .to(reveal, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.08);
      tlRef.current = tl;
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const play = () => hoverRef.current && !reduceRef.current && tlRef.current?.play();
  const reverse = () => hoverRef.current && !reduceRef.current && tlRef.current?.reverse();

  return (
    <button
      ref={rootRef}
      type="button"
      className="nm-svc__card"
      style={{ ["--i" as string]: index }}
      aria-label={`${s.title} — Book an Appointment`}
      onClick={() => open(s.title)}
      onPointerEnter={play}
      onPointerLeave={reverse}
      onFocus={play}
      onBlur={reverse}
    >
      <span ref={imgRef} className="nm-svc__img">
        <Image
          src={s.image}
          alt={s.imageAlt}
          fill
          sizes="(max-width: 720px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "50% 50%" }}
        />
      </span>
      <span ref={scrimRef} className="nm-svc__scrim" aria-hidden="true" />

      <span className="nm-svc__content">
        <span className="nm-svc__name">{s.title}</span>
        <span ref={revealRef} className="nm-svc__reveal">
          <span className="nm-svc__desc">{s.body}</span>
          <span className="nm-svc__cta">
            Book an Appointment
            <ArrowRight strokeWidth={1.7} aria-hidden="true" />
          </span>
        </span>
      </span>
    </button>
  );
}

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-in");
      return;
    }
    const reveal = () => el.classList.add("is-in");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    const fallback = window.setTimeout(reveal, 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section ref={sectionRef} className="nm-svc" aria-label="After-Sales Services">
      <div className="nm-shell">
        <header className="nm-svc__head">
          <p className="nm-eyebrow nm-eyebrow--gap">{AFTER_SALES_SERVICES.eyebrow}</p>
          <p className="nm-lead nm-svc__intro">{AFTER_SALES_SERVICES.intro}</p>
        </header>

        <div className="nm-svc__grid">
          {AFTER_SALES_SERVICES.items.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
