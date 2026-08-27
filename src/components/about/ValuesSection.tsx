"use client";

import { useReveal } from "@/lib/hooks";
import { VALUES } from "@/lib/aboutContent";

export default function ValuesSection() {
  const introRef = useReveal<HTMLDivElement>({ y: 24, start: "top 88%" });
  const listRef = useReveal<HTMLDivElement>({ y: 40, stagger: 0.12, start: "top 80%" });

  return (
    <section id="values" className="nm-values" aria-label="Our Values">
      <div className="nm-shell">
        <header className="nm-values__head">
          <p className="nm-eyebrow nm-eyebrow--gap">{VALUES.eyebrow}</p>
          <div ref={introRef} className="nm-values__intro">
            <p className="nm-lead" data-reveal>{VALUES.intro}</p>
          </div>
        </header>

        <div ref={listRef} className="nm-values__list">
          {VALUES.items.map((v) => (
            <article key={v.n} className="nm-values__item" data-reveal>
              <span className="nm-values__n">{v.n}</span>
              <h3 className="nm-values__item-title">{v.title}</h3>
              <p className="nm-values__item-body">{v.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
