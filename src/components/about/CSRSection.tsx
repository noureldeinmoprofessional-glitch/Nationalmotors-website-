"use client";

import { useLineReveal, useReveal } from "@/lib/hooks";
import { CSR } from "@/lib/aboutContent";

export default function CSRSection() {
  const headRef = useLineReveal<HTMLHeadingElement>();
  const bodyRef = useReveal<HTMLDivElement>({ y: 28, stagger: 0.14, start: "top 84%" });

  return (
    <section id="csr" className="nm-csr" aria-labelledby="csr-title">
      <div className="nm-shell">
        <p className="nm-eyebrow" data-accent="sand">{CSR.eyebrow}</p>
        <h2 ref={headRef} id="csr-title" className="nm-csr__title nm-h2 nm-mask-lines">
          <span className="nm-line-mask"><span className="nm-line-inner">{CSR.title}</span></span>
        </h2>
        <div ref={bodyRef} className="nm-csr__body">
          {CSR.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "nm-lead" : ""} data-reveal>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
