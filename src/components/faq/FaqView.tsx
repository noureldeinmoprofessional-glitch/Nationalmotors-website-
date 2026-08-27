"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect, useLineReveal, useReveal } from "@/lib/hooks";
import { FAQ_INTRO, FAQ_CATEGORIES } from "@/lib/faqData";

function FaqItem({
  n,
  q,
  a,
  open,
  onToggle,
}: {
  n: string;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useIsoLayoutEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    if (first.current) {
      gsap.set(panel, { height: 0 });
      first.current = false;
      if (!open) return;
    }
    if (prefersReducedMotion()) {
      gsap.set(panel, { height: open ? "auto" : 0 });
      gsap.set(inner, { opacity: open ? 1 : 0, y: 0 });
      return;
    }
    if (open) {
      gsap.to(panel, { height: "auto", duration: 0.6, ease: "power3.inOut" });
      gsap.fromTo(inner, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", delay: 0.1 });
    } else {
      gsap.to(inner, { opacity: 0, y: 8, duration: 0.25, ease: "power2.in" });
      gsap.to(panel, { height: 0, duration: 0.45, ease: "power3.inOut", delay: 0.05 });
    }
  }, [open]);

  return (
    <div className={`nm-faq__item${open ? " is-open" : ""}`}>
      <h3 className="nm-faq__q">
        <button className="nm-faq__trigger" aria-expanded={open} onClick={onToggle} data-cursor={open ? "CLOSE" : "OPEN"}>
          <span className="nm-faq__n">{n}</span>
          <span className="nm-faq__qtext">{q}</span>
          <span className="nm-faq__icon" aria-hidden="true"><Plus strokeWidth={1.5} /></span>
        </button>
      </h3>
      <div ref={panelRef} className="nm-faq__panel">
        <div ref={innerRef} className="nm-faq__answer">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

function FaqGroup({ label, items, base }: { label: string; items: { q: string; a: string }[]; base: number }) {
  // Only one open item per category keeps the page calm.
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const headRef = useReveal<HTMLDivElement>({ y: 18, start: "top 90%" });
  const listRef = useReveal<HTMLDivElement>({ y: 28, stagger: 0.07, start: "top 84%" });

  return (
    <div className="nm-faqp__group">
      <div ref={headRef} className="nm-nw-sechead">
        <span className="nm-nw-sechead__label" data-reveal>{label}</span>
      </div>
      <div ref={listRef} className="nm-faq__list">
        {items.map((f, i) => (
          <div key={f.q} data-reveal>
            <FaqItem
              n={`0${base + i + 1}`.slice(-2)}
              q={f.q}
              a={f.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FaqView() {
  const headRef = useLineReveal<HTMLHeadingElement>({ start: "top 92%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 22, stagger: 0.1, start: "top 92%" });

  return (
    <>
      <section className="nm-faqp-hero" aria-label={FAQ_INTRO.eyebrow}>
        <div className="nm-shell nm-faqp-hero__inner">
          <p className="nm-eyebrow nm-eyebrow--gap">{FAQ_INTRO.eyebrow}</p>
          <h1 ref={headRef} className="nm-faqp-hero__title nm-mask-lines">
            <span className="nm-line-mask"><span className="nm-line-inner">{FAQ_INTRO.headline}</span></span>
          </h1>
          <div ref={bodyRef} className="nm-faqp-hero__body">
            <p className="nm-lead" data-reveal>{FAQ_INTRO.body}</p>
          </div>
        </div>
      </section>

      <section className="nm-faqp" aria-label="All frequently asked questions">
        <div className="nm-shell nm-faqp__inner">
          {(() => {
            let running = 0;
            return FAQ_CATEGORIES.map((cat) => {
              const base = running;
              running += cat.items.length;
              return <FaqGroup key={cat.label} label={cat.label} items={cat.items} base={base} />;
            });
          })()}
        </div>
      </section>
    </>
  );
}
