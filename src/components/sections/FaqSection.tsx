"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect, useLineReveal, useReveal } from "@/lib/hooks";
import { FAQS } from "@/lib/site";
import CTAButton from "@/components/ui/CTAButton";

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
      gsap.fromTo(
        inner,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", delay: 0.1 }
      );
    } else {
      gsap.to(inner, { opacity: 0, y: 8, duration: 0.25, ease: "power2.in" });
      gsap.to(panel, { height: 0, duration: 0.45, ease: "power3.inOut", delay: 0.05 });
    }
  }, [open]);

  return (
    <div className={`nm-faq__item${open ? " is-open" : ""}`}>
      <h3 className="nm-faq__q">
        <button
          className="nm-faq__trigger"
          aria-expanded={open}
          onClick={onToggle}
          data-cursor={open ? "CLOSE" : "OPEN"}
        >
          <span className="nm-faq__n">{n}</span>
          <span className="nm-faq__qtext">{q}</span>
          <span className="nm-faq__icon" aria-hidden="true">
            <Plus strokeWidth={1.5} />
          </span>
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

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const headRef = useLineReveal<HTMLHeadingElement>();
  const introRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1 });
  const listRef = useReveal<HTMLDivElement>({ y: 30, stagger: 0.08, start: "top 82%" });

  return (
    <section id="faq" className="nm-faq" aria-labelledby="faq-title">
      <div className="nm-shell">
        <div className="nm-faq__head">
          <div>
            <p className="nm-eyebrow">Frequently Asked Questions</p>
            <h2 ref={headRef} id="faq-title" className="nm-faq__title nm-h2">
              <span className="nm-line-mask"><span className="nm-line-inner">Questions about National</span></span>
              <span className="nm-line-mask"><span className="nm-line-inner">Motors? Start here.</span></span>
            </h2>
          </div>
          <div ref={introRef} className="nm-faq__intro">
            <p className="nm-lead" data-reveal>
              Find quick answers about our company, brands, vehicles, after-sales
              services, and business sectors.
            </p>
            <div data-reveal>
              <CTAButton href="/faq" variant="secondary" cursor="VIEW">
                View All FAQs
              </CTAButton>
            </div>
          </div>
        </div>

        <div ref={listRef} className="nm-faq__list">
          {FAQS.map((f, i) => (
            <div key={f.q} data-reveal>
              <FaqItem
                n={`0${i + 1}`}
                q={f.q}
                a={f.a}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
