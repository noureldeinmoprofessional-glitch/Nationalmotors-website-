"use client";

import Image from "next/image";
import { useReveal, useClipReveal } from "@/lib/hooks";
import { LEADERSHIP_HEADER, BOARD, LEADERSHIP } from "@/lib/aboutContent";

type Accent = "sand" | "blue";

type Person = {
  name: string;
  role: string;
  image: string | null;
  paragraphs: string[];
};

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Eng\.|Mrs\.|Ms\.|Dr\.)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Portrait card: name first, role beneath, bio revealed on hover/focus. */
function ProfileCard({ p, accent }: { p: Person; accent: Accent }) {
  return (
    <article
      className="nm-ld__card"
      data-accent={accent}
      tabIndex={0}
      aria-label={`${p.name}, ${p.role}`}
      data-reveal
    >
      <div className="nm-ld__card-media">
        {p.image ? (
          <Image
            src={p.image}
            alt={`${p.name}, ${p.role}, National Motors`}
            fill
            sizes="(max-width: 900px) 100vw, 26vw"
            style={{ objectFit: "cover", objectPosition: "50% 18%" }}
          />
        ) : (
          <div className="nm-ld__mono" aria-hidden="true">
            <span>{initials(p.name)}</span>
          </div>
        )}
        <span className="nm-ld__card-scrim" aria-hidden="true" />
      </div>

      <div className="nm-ld__card-caption">
        <h3 className="nm-ld__card-name">{p.name}</h3>
        <p className="nm-ld__card-role">{p.role}</p>
        <div className="nm-ld__card-bioclip">
          <div className="nm-ld__card-bio">
            <div className="nm-ld__card-bio-in">
              {p.paragraphs.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function LeadershipSection() {
  const introRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1, start: "top 88%" });
  const chairPortraitRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 100% 0)" });
  const chairBodyRef = useReveal<HTMLDivElement>({ y: 26, stagger: 0.1, start: "top 82%" });
  const familyRef = useReveal<HTMLDivElement>({ y: 42, stagger: 0.12, start: "top 84%" });
  const execRef = useReveal<HTMLDivElement>({ y: 42, stagger: 0.12, start: "top 85%" });

  const { chairman } = BOARD;

  return (
    <section id="leadership" className="nm-ld" aria-label="Leadership">
      <div className="nm-shell">
        <header className="nm-ld__head">
          <p className="nm-eyebrow nm-eyebrow--gap">{LEADERSHIP_HEADER.eyebrow}</p>
          <div ref={introRef} className="nm-ld__intro">
            <p className="nm-lead" data-reveal>{LEADERSHIP_HEADER.intro}</p>
          </div>
        </header>

        {/* Tier 1 — The founding family (warm / distinguished) */}
        <div className="nm-ld__tier" data-accent="sand">
          <div className="nm-ld__tier-head">
            <p className="nm-ld__tier-label">{LEADERSHIP_HEADER.familyLabel}</p>
            <p className="nm-ld__tier-note">{LEADERSHIP_HEADER.familyNote}</p>
          </div>

          {/* Chairman — his own larger feature block */}
          <article className="nm-ld__chair">
            <div ref={chairPortraitRef} className="nm-ld__chair-portrait">
              {chairman.image ? (
                <Image
                  src={chairman.image}
                  alt={`${chairman.name}, ${chairman.role}, National Motors`}
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: "cover", objectPosition: "50% 20%" }}
                />
              ) : (
                <div className="nm-ld__mono nm-ld__mono--lg" aria-hidden="true">
                  <span>{initials(chairman.name)}</span>
                </div>
              )}
            </div>
            <div ref={chairBodyRef} className="nm-ld__chair-body">
              <h3 className="nm-ld__chair-name" data-reveal>{chairman.name}</h3>
              <p className="nm-ld__chair-role" data-reveal>{chairman.role}</p>
              <div className="nm-ld__chair-bio">
                {chairman.paragraphs.map((t, i) => (
                  <p key={i} className={i === 0 ? "nm-lead" : ""} data-reveal>{t}</p>
                ))}
              </div>
            </div>
          </article>

          {/* Family members */}
          <div ref={familyRef} className="nm-ld__grid nm-ld__grid--family">
            {BOARD.members.map((m) => (
              <ProfileCard key={m.name} p={m} accent="sand" />
            ))}
          </div>
        </div>

        {/* Tier 2 — The executive team (cool / operational) */}
        <div className="nm-ld__tier" data-accent="blue">
          <div className="nm-ld__tier-head">
            <p className="nm-ld__tier-label">{LEADERSHIP_HEADER.execLabel}</p>
            <p className="nm-ld__tier-note">{LEADERSHIP_HEADER.execNote}</p>
          </div>

          <div ref={execRef} className="nm-ld__grid nm-ld__grid--exec">
            {LEADERSHIP.people.map((person) => (
              <ProfileCard
                key={person.name}
                p={{ ...person, paragraphs: [person.bio] }}
                accent="blue"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
