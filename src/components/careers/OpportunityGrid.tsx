"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/hooks";
import { OPPORTUNITIES, HAS_DEMO, type Opportunity } from "@/lib/opportunitiesData";
import JobOpportunityModal from "./JobOpportunityModal";

function OpportunityCard({ o, index, onView }: { o: Opportunity; index: number; onView: (o: Opportunity, el: HTMLButtonElement) => void }) {
  return (
    <button
      type="button"
      className="nm-op-card"
      data-reveal
      style={{ ["--i" as string]: index }}
      aria-label={`${o.title}, ${o.department} — view job details`}
      onClick={(e) => onView(o, e.currentTarget)}
    >
      <span className="nm-op-card__dept">{o.department}</span>
      <span className="nm-op-card__title">{o.title}</span>
      <span className="nm-op-card__meta">
        <span>{o.location}</span>
        <span aria-hidden="true">·</span>
        <span>{o.employmentType}</span>
      </span>
      <span className="nm-op-card__cta">
        View Job Details
        <ArrowRight strokeWidth={1.7} aria-hidden="true" />
      </span>
    </button>
  );
}

export default function OpportunityGrid() {
  const headRef = useReveal<HTMLDivElement>({ y: 18, start: "top 90%" });
  const gridRef = useReveal<HTMLDivElement>({ y: 40, stagger: 0.1, start: "top 84%", selector: ".nm-op-card" });
  const [active, setActive] = useState<Opportunity | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openModal = (o: Opportunity, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setActive(o);
  };
  const closeModal = () => {
    setActive(null);
    triggerRef.current?.focus();
  };

  return (
    <section className="nm-op" aria-label="Available Opportunities">
      <div className="nm-shell">
        <div ref={headRef} className="nm-op__head">
          <div className="nm-op__head-main" data-reveal>
            <h2 className="nm-op__title">Available Opportunities</h2>
            {HAS_DEMO && <span className="nm-op__demo">Demo Opportunities</span>}
          </div>
        </div>

        <div ref={gridRef} className="nm-op__grid">
          {OPPORTUNITIES.map((o, i) => (
            <OpportunityCard key={o.id} o={o} index={i} onView={openModal} />
          ))}
        </div>
      </div>

      {active && <JobOpportunityModal opportunity={active} onClose={closeModal} />}
    </section>
  );
}
