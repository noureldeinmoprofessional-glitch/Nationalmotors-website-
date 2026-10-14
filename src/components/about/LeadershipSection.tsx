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

/** Portrait card: photo (grayscale→colour), name + role below, bio on hover/focus. */
function PersonCard({ p, n, accent }: { p: Person; n: number; accent: Accent }) {
  return (
    <article className="nm-ldr__card" data-accent={accent} tabIndex={0} aria-label={`${p.name}, ${p.role}`} data-reveal>
      <div className="nm-ldr__card-photo">
        {p.image && (
          <Image
            src={p.image}
            alt={`${p.name}, ${p.role}, National Motors`}
            fill
            sizes="(max-width: 900px) 100vw, 24vw"
            style={{ objectFit: "cover", objectPosition: "50% 18%" }}
          />
        )}
        <div className="nm-ldr__card-bio" aria-hidden="true">
          <div className="nm-ldr__card-bio-in">
            {p.paragraphs.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="nm-ldr__card-meta">
        <span className="nm-ldr__card-num">{String(n).padStart(2, "0")}</span>
        <div>
          <h4 className="nm-ldr__card-name">{p.name}</h4>
          <p className="nm-ldr__card-role">{p.role}</p>
        </div>
      </div>
    </article>
  );
}

export default function LeadershipSection() {
  const introRef = useReveal<HTMLDivElement>({ y: 22, stagger: 0.1, start: "top 88%" });
  const heroPhotoRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 100% 0)" });
  const heroBodyRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1, start: "top 82%" });
  const familyRef = useReveal<HTMLDivElement>({ y: 40, stagger: 0.12, start: "top 85%" });
  const execRef = useReveal<HTMLDivElement>({ y: 40, stagger: 0.12, start: "top 86%" });

  const { chairman } = BOARD;

  return (
    <section id="leadership" className="nm-ldr" aria-label="Leadership">
      <div className="nm-shell">
        <header className="nm-ldr__head">
          <p className="nm-eyebrow nm-eyebrow--gap">{LEADERSHIP_HEADER.eyebrow}</p>
          <div ref={introRef} className="nm-ldr__intro">
            <p className="nm-ldr__copy" data-reveal>{LEADERSHIP_HEADER.intro}</p>
          </div>
        </header>

        {/* Chairman — cinematic feature */}
        <article className="nm-ldr__hero" data-accent="sand">
          <div ref={heroPhotoRef} className="nm-ldr__hero-photo">
            {chairman.image && (
              <Image
                src={chairman.image}
                alt={`${chairman.name}, ${chairman.role}, National Motors`}
                fill
                sizes="(max-width: 900px) 100vw, 44vw"
                style={{ objectFit: "cover", objectPosition: "50% 16%" }}
                priority
              />
            )}
          </div>
          <div ref={heroBodyRef} className="nm-ldr__hero-body">
            <h3 className="nm-ldr__hero-name" data-reveal>{chairman.name}</h3>
            <p className="nm-ldr__hero-role" data-reveal>{chairman.role}</p>
            <div className="nm-ldr__hero-bio">
              {chairman.paragraphs.map((t, i) => (
                <p key={i} className={i === 0 ? "nm-ldr__copy" : ""} data-reveal>{t}</p>
              ))}
            </div>
          </div>
        </article>

        {/* The founding family */}
        <section className="nm-ldr__tier" data-accent="sand" aria-label={LEADERSHIP_HEADER.familyLabel}>
          <div ref={familyRef} className="nm-ldr__grid nm-ldr__grid--3">
            {BOARD.members.map((m, i) => (
              <PersonCard key={m.name} p={m} n={i + 1} accent="sand" />
            ))}
          </div>
        </section>

        {/* Executive team */}
        <section className="nm-ldr__tier" data-accent="blue" aria-label={LEADERSHIP_HEADER.execLabel}>
          <div ref={execRef} className="nm-ldr__grid nm-ldr__grid--4">
            {LEADERSHIP.people.map((person, i) => (
              <PersonCard key={person.name} p={{ ...person, paragraphs: [person.bio] }} n={i + 1} accent="blue" />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
