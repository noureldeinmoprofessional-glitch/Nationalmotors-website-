"use client";

import Image from "next/image";
import { useLineReveal, useReveal } from "@/lib/hooks";
import { LEADERSHIP } from "@/lib/aboutContent";

export default function LeadershipSection() {
  const headRef = useLineReveal<HTMLHeadingElement>();
  const introRef = useReveal<HTMLDivElement>({ y: 24, start: "top 88%" });
  const gridRef = useReveal<HTMLDivElement>({ y: 44, stagger: 0.12, start: "top 82%" });

  return (
    <section id="leadership" className="nm-lead-sec" aria-labelledby="leadership-title">
      <div className="nm-shell">
        <header className="nm-lead-sec__head">
          <p className="nm-eyebrow">{LEADERSHIP.eyebrow}</p>
          <h2 ref={headRef} id="leadership-title" className="nm-lead-sec__title nm-h2 nm-mask-lines">
            <span className="nm-line-mask"><span className="nm-line-inner">The Executive Team</span></span>
            <span className="nm-line-mask"><span className="nm-line-inner">Turning Strategy into Progress</span></span>
          </h2>
          <div ref={introRef} className="nm-lead-sec__intro">
            <p className="nm-lead" data-reveal>{LEADERSHIP.intro}</p>
          </div>
        </header>

        <div ref={gridRef} className="nm-lead-sec__grid">
          {LEADERSHIP.people.map((p) => (
            <article key={p.name} className="nm-profile" data-reveal>
              <div className="nm-profile__portrait">
                <Image
                  src={p.image}
                  alt={`${p.name}, ${p.role}, National Motors`}
                  fill
                  sizes="(max-width: 900px) 100vw, 24vw"
                  style={{ objectFit: "cover", objectPosition: "50% 20%" }}
                />
              </div>
              <div className="nm-profile__meta">
                <h3 className="nm-profile__name">{p.name}</h3>
                <p className="nm-profile__role">{p.role}</p>
              </div>
              <p className="nm-profile__bio">{p.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
