"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import CTAButton from "@/components/ui/CTAButton";
import { BRAND_STORIES } from "@/lib/aboutContent";

type Chapter = (typeof BRAND_STORIES.chapters)[number];

const BODY_CAP = 340; // px — content taller than this scrolls inside the card

function BrandCard({
  c,
  index,
  active,
  someActive,
  onActivate,
  onDeactivate,
  onToggle,
}: {
  c: Chapter;
  index: number;
  active: boolean;
  someActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onToggle: () => void;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLSpanElement>(null);
  const dimRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reduceRef = useRef(false);
  const hoverRef = useRef(false);

  // Build the reversible hover/focus interaction timeline (rebuilt on resize).
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const img = imgRef.current;
    const scrim = scrimRef.current;
    const body = bodyRef.current;
    if (!root || !img || !scrim || !body) return;

    hoverRef.current = window.matchMedia("(hover: hover)").matches;
    reduceRef.current = prefersReducedMotion();

    if (reduceRef.current) {
      gsap.set(body, { maxHeight: "none", opacity: 1, y: 0 });
      gsap.set(scrim, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const blur = { v: 0 };
      const setBlur = () => { img.style.filter = `blur(${blur.v.toFixed(2)}px)`; };

      const build = () => {
        tlRef.current?.kill();
        gsap.set(img, { scale: 1, clearProps: "filter" });
        blur.v = 0; setBlur();
        gsap.set(scrim, { opacity: 0.9 });
        gsap.set(body, { maxHeight: 0, opacity: 0, y: 14 });

        const target = Math.min(body.scrollHeight, BODY_CAP);
        const tl = gsap.timeline({ paused: true });
        tl.to(img, { scale: 1.03, duration: 0.6, ease: "power2.out" }, 0)
          .to(blur, { v: 4, duration: 0.6, ease: "power2.out", onUpdate: setBlur }, 0)
          .to(scrim, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
          // Body grows from the bottom-anchored content, lifting the name upward.
          .to(body, { maxHeight: target, duration: 0.6, ease: "power2.out" }, 0)
          .to(body, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.08);
        tl.progress(active ? 1 : 0);
        tlRef.current = tl;
      };

      build();

      let raf = 0;
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(build);
      });
      ro.observe(body);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        tlRef.current?.kill();
      };
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play / reverse on active change; dim the other cards.
  useIsoLayoutEffect(() => {
    if (reduceRef.current) return;
    const tl = tlRef.current;
    const dim = dimRef.current;
    if (tl) active ? tl.play() : tl.reverse();
    if (dim) {
      gsap.to(dim, {
        opacity: someActive && !active ? 0.32 : 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [active, someActive]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      if (e.currentTarget.contains(e.relatedTarget as Node)) return;
      onDeactivate();
    },
    [onDeactivate]
  );

  return (
    <article
      ref={rootRef}
      className="nm-brandcard"
      style={{ ["--i" as string]: index }}
      data-accent={c.accent}
      data-active={active || undefined}
      tabIndex={0}
      aria-label={`${c.name} — ${c.title}`}
      onPointerEnter={() => hoverRef.current && onActivate()}
      onPointerLeave={() => hoverRef.current && onDeactivate()}
      onFocus={onActivate}
      onBlur={handleBlur}
      onClick={() => !hoverRef.current && onToggle()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div ref={imgRef} className="nm-brandcard__img">
        <Image
          src={c.image}
          alt={c.imageAlt}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: c.imagePosition }}
        />
      </div>
      <span ref={scrimRef} className="nm-brandcard__scrim" aria-hidden="true" />
      <span ref={dimRef} className="nm-brandcard__dim" aria-hidden="true" />

      <div className="nm-brandcard__content">
        <h3 className="nm-brandcard__name">{c.name}</h3>
        <div ref={bodyRef} className="nm-brandcard__body">
          <div className="nm-brandcard__body-inner">
            {c.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "nm-brandcard__lead" : ""}>{p}</p>
            ))}
            <CTAButton href={c.cta.href} variant="secondary" cursor="EXPLORE">
              {c.cta.label}
            </CTAButton>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BrandStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Robust entrance reveal: visible by default, revealed via IntersectionObserver,
  // with a timeout fallback so the section can never be stranded hidden.
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
    <section ref={sectionRef} id="brands" className="nm-brands" aria-label="Our Brand Stories">
      <div className="nm-shell">
        <header className="nm-brands__head">
          <p className="nm-eyebrow nm-eyebrow--static nm-eyebrow--gap">{BRAND_STORIES.eyebrow}</p>
          <div className="nm-brands__intro">
            <p className="nm-lead">{BRAND_STORIES.intro}</p>
          </div>
        </header>

        <div className="nm-brands__grid">
          {BRAND_STORIES.chapters.map((c, i) => (
            <BrandCard
              key={c.id}
              c={c}
              index={i}
              active={activeId === c.id}
              someActive={activeId !== null}
              onActivate={() => setActiveId(c.id)}
              onDeactivate={() => setActiveId((cur) => (cur === c.id ? null : cur))}
              onToggle={() => setActiveId((cur) => (cur === c.id ? null : c.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
