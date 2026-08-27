"use client";

import { useReveal } from "@/lib/hooks";
import { CSR } from "@/lib/aboutContent";

export default function CSRSection() {
  const bodyRef = useReveal<HTMLDivElement>({ y: 28, stagger: 0.14, start: "top 84%" });

  return (
    <section id="csr" className="nm-csr" aria-label="Corporate Social Responsibility">
      <div className="nm-shell">
        <p className="nm-eyebrow nm-eyebrow--gap" data-accent="sand">{CSR.eyebrow}</p>
        <div ref={bodyRef} className="nm-csr__body">
          {CSR.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "nm-lead" : ""} data-reveal>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
