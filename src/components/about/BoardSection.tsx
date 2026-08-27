"use client";

import Image from "next/image";
import { useReveal, useClipReveal } from "@/lib/hooks";
import { BOARD } from "@/lib/aboutContent";

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Eng\.|Mrs\.|Ms\.|Dr\.)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function BoardSection() {
  const introRef = useReveal<HTMLDivElement>({ y: 26, stagger: 0.1, start: "top 86%" });
  const chairFrameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 100% 0)" });
  const chairBodyRef = useReveal<HTMLDivElement>({ y: 28, stagger: 0.1, start: "top 82%" });
  const membersRef = useReveal<HTMLDivElement>({ y: 40, stagger: 0.14, start: "top 82%" });

  const { chairman } = BOARD;

  return (
    <section id="board" className="nm-board" aria-label="Board Members">
      <div className="nm-shell">
        <header className="nm-board__head">
          <p className="nm-eyebrow nm-eyebrow--gap" data-accent="sand">{BOARD.eyebrow}</p>
          <div ref={introRef} className="nm-board__intro">
            {BOARD.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "nm-lead" : ""} data-reveal>{p}</p>
            ))}
          </div>
        </header>

        {/* Chairman — most prominent */}
        <article className="nm-board__chairman">
          <div ref={chairFrameRef} className="nm-board__chairman-portrait">
            {chairman.image ? (
              <Image
                src={chairman.image}
                alt={`${chairman.name}, ${chairman.role}, National Motors`}
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                style={{ objectFit: "cover", objectPosition: "50% 20%" }}
              />
            ) : (
              <div className="nm-board__monogram" role="img" aria-label={`${chairman.name}, ${chairman.role}`}>
                <span>{initials(chairman.name)}</span>
              </div>
            )}
          </div>
          <div ref={chairBodyRef} className="nm-board__chairman-body">
            <p className="nm-board__role" data-reveal>{chairman.role}</p>
            <h3 className="nm-board__name nm-board__name--lg" data-reveal>{chairman.name}</h3>
            {chairman.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "nm-lead" : ""} data-reveal>{p}</p>
            ))}
          </div>
        </article>

        {/* Board members */}
        <div ref={membersRef} className="nm-board__members">
          {BOARD.members.map((m) => (
            <article key={m.name} className="nm-board__member" data-reveal>
              <div className="nm-board__member-portrait">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={`${m.name}, ${m.role}, National Motors`}
                    fill
                    sizes="(max-width: 900px) 100vw, 30vw"
                    style={{ objectFit: "cover", objectPosition: "50% 18%" }}
                  />
                ) : (
                  <div className="nm-board__monogram" role="img" aria-label={`${m.name}, ${m.role}`}>
                    <span>{initials(m.name)}</span>
                  </div>
                )}
              </div>
              <p className="nm-board__role">{m.role}</p>
              <h3 className="nm-board__name">{m.name}</h3>
              {m.paragraphs.map((p, i) => (
                <p key={i} className="nm-board__member-p">{p}</p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
