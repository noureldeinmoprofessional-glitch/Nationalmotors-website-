"use client";

import { Heart, Handshake, Target, Users, Sprout } from "lucide-react";
import { useReveal } from "@/lib/hooks";
import { VALUES } from "@/lib/aboutContent";

// One icon per approved value, in order (presentation only — copy unchanged).
const ICONS = [Heart, Handshake, Target, Users, Sprout];

export default function ValuesSection() {
  const introRef = useReveal<HTMLDivElement>({ y: 24, start: "top 88%" });
  const listRef = useReveal<HTMLDivElement>({ y: 40, stagger: 0.1, start: "top 82%" });

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
          {VALUES.items.map((v, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <article key={v.n} className="nm-values__item" data-reveal>
                <span className="nm-values__icon" aria-hidden="true">
                  <Icon strokeWidth={1.5} />
                </span>
                <h3 className="nm-values__item-title">{v.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
