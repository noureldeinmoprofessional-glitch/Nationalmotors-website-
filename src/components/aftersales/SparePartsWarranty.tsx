"use client";

import { ArrowRight, Download } from "lucide-react";
import { useReveal } from "@/lib/hooks";
import { SPARE_PARTS_AVAILABILITY as SP, EXTENDED_WARRANTY as EW } from "@/lib/afterSalesData";
import { useAppointment } from "./AppointmentProvider";

// PAGE 33 — Spare-Parts Availability + Extended Warranty Request.
// Both "Request" actions open the existing Book-an-Appointment modal.
export default function SparePartsWarranty() {
  const { open } = useAppointment();
  const ref = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1, start: "top 82%" });

  return (
    <section className="nm-aw" aria-label="Spare parts and extended warranty">
      <div className="nm-shell">
        <div ref={ref} className="nm-aw__grid">
          {/* Spare-Parts Availability */}
          <div className="nm-aw__block" data-reveal>
            <p className="nm-eyebrow nm-eyebrow--gap">{SP.eyebrow}</p>
            <p className="nm-lead nm-aw__body">{SP.body}</p>
            <div className="nm-aw__actions">
              <a
                href={SP.downloadHref}
                download
                className="nm-btn nm-btn--secondary"
                data-cursor="OPEN"
              >
                <span className="nm-btn__text">{SP.downloadLabel}</span>
                <span className="nm-btn__arrow" aria-hidden="true"><Download strokeWidth={1.75} /></span>
              </a>
              <button
                type="button"
                className="nm-btn nm-btn--primary"
                data-cursor="OPEN"
                onClick={() => open(SP.requestLabel)}
              >
                <span className="nm-btn__text">{SP.requestLabel}</span>
                <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
              </button>
            </div>
          </div>

          {/* Extended Warranty Request */}
          <div className="nm-aw__block" data-reveal>
            <p className="nm-eyebrow nm-eyebrow--gap">{EW.eyebrow}</p>
            <h2 className="nm-aw__title">{EW.headline}</h2>
            <p className="nm-lead nm-aw__body">{EW.body}</p>
            <div className="nm-aw__actions">
              <button
                type="button"
                className="nm-btn nm-btn--primary"
                data-cursor="OPEN"
                onClick={() => open(EW.requestLabel)}
              >
                <span className="nm-btn__text">{EW.requestLabel}</span>
                <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
              </button>
            </div>
            <p className="nm-aw__disclaimer">{EW.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
