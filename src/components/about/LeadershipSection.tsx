"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect, useReveal } from "@/lib/hooks";
import { LEADERSHIP_HEADER, BOARD, LEADERSHIP } from "@/lib/aboutContent";

type Group = "family" | "exec";

type Person = {
  id: string;
  name: string;
  role: string;
  image: string | null;
  paragraphs: string[];
  group: Group;
  tag: string;
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

const FAMILY: Person[] = [
  {
    id: "emad-abdelnaby",
    name: BOARD.chairman.name,
    role: BOARD.chairman.role,
    image: BOARD.chairman.image,
    paragraphs: BOARD.chairman.paragraphs,
    group: "family",
    tag: "Chairman · The Founding Family",
  },
  ...BOARD.members.map((m, i) => ({
    id: `family-${i}`,
    name: m.name,
    role: m.role,
    image: m.image,
    paragraphs: m.paragraphs,
    group: "family" as const,
    tag: "The Founding Family",
  })),
];

const EXEC: Person[] = LEADERSHIP.people.map((p, i) => ({
  id: `exec-${i}`,
  name: p.name,
  role: p.role,
  image: p.image,
  paragraphs: [p.bio],
  group: "exec" as const,
  tag: "Executive Team",
}));

const ALL = [...FAMILY, ...EXEC];

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const revealRef = useReveal<HTMLDivElement>({ y: 20, stagger: 0.08, start: "top 85%" });

  const [active, setActive] = useState<Person | null>(null);
  const activeId = active?.id ?? null;

  // Cursor-following portrait (fine pointers only).
  useIsoLayoutEffect(() => {
    const cursor = cursorRef.current;
    const section = sectionRef.current;
    if (!cursor || !section) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.55, ease: "power3" });
    // Offset the portrait up-and-right of the pointer so it floats into the
    // gutter rather than covering the name being read.
    const OX = 70;
    const OY = -24;
    let seeded = false;
    const onMove = (e: PointerEvent) => {
      const tx = e.clientX + OX;
      const ty = e.clientY + OY;
      if (!seeded) {
        gsap.set(cursor, { x: tx, y: ty });
        seeded = true;
        return;
      }
      xTo(tx);
      yTo(ty);
    };
    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

  const Row = useCallback(
    (p: Person, n: number) => (
      <li key={p.id} className="nm-ldx__row" data-reveal>
        <button
          type="button"
          className="nm-ldx__rowbtn"
          data-active={activeId === p.id || undefined}
          onPointerEnter={() => setActive(p)}
          onFocus={() => setActive(p)}
          aria-label={`${p.name}, ${p.role}`}
        >
          <span className="nm-ldx__num">{String(n).padStart(2, "0")}</span>
          <span className="nm-ldx__name">{p.name}</span>
          <span className="nm-ldx__role">{p.role}</span>
          <span className="nm-ldx__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </li>
    ),
    [activeId]
  );

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="nm-ldx"
      aria-label="Leadership"
      data-engaged={active ? true : undefined}
      onPointerLeave={() => setActive(null)}
    >
      <div className="nm-shell nm-ldx__wrap">
        {/* Left rail — eyebrow + live detail (crossfades on hover) */}
        <aside className="nm-ldx__rail">
          <p className="nm-eyebrow nm-eyebrow--static">{LEADERSHIP_HEADER.eyebrow}</p>

          <div className="nm-ldx__detail">
            <div className="nm-ldx__detail-intro" aria-hidden={active ? true : undefined}>
              <p className="nm-lead">{LEADERSHIP_HEADER.intro}</p>
            </div>

            {active && (
              <div key={active.id} className="nm-ldx__detail-person" data-accent={active.group === "family" ? "sand" : "blue"}>
                <p className="nm-ldx__detail-tag">{active.tag}</p>
                <h3 className="nm-ldx__detail-name">{active.name}</h3>
                <p className="nm-ldx__detail-role">{active.role}</p>
                <div className="nm-ldx__detail-bio">
                  {active.paragraphs.map((t, i) => (
                    <p key={i} className={i === 0 ? "nm-lead" : ""}>{t}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right — the kinetic name index */}
        <div ref={revealRef} className="nm-ldx__index">
          <div className="nm-ldx__group" data-accent="sand">
            <p className="nm-ldx__group-label" data-reveal>{LEADERSHIP_HEADER.familyLabel}</p>
            <ul className="nm-ldx__list">{FAMILY.map((p, i) => Row(p, i + 1))}</ul>
          </div>

          <div className="nm-ldx__group" data-accent="blue">
            <p className="nm-ldx__group-label" data-reveal>{LEADERSHIP_HEADER.execLabel}</p>
            <ul className="nm-ldx__list">{EXEC.map((p, i) => Row(p, i + 1))}</ul>
          </div>
        </div>
      </div>

      {/* Floating portrait that follows the cursor */}
      <div ref={cursorRef} className="nm-ldx__cursor" aria-hidden="true">
        <div className="nm-ldx__cursor-inner">
          {ALL.map((p) => (
            <div key={p.id} className="nm-ldx__cursor-img" data-active={activeId === p.id || undefined}>
              {p.image ? (
                <Image src={p.image} alt="" width={280} height={350} style={{ objectFit: "cover", objectPosition: "50% 18%" }} />
              ) : (
                <div className="nm-ldx__cursor-mono"><span>{initials(p.name)}</span></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
