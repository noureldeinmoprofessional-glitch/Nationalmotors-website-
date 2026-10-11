"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import Modal from "@/components/ui/Modal";
import PartnerForm from "./PartnerForm";

// WebGL canvas is client-only (no SSR). Allowed here because HeroHome
// is itself a Client Component.
const LogoCanvas = dynamic(() => import("./LogoCanvas"), {
  ssr: false,
  loading: () => <div className="nm-h3d__fallback" aria-hidden="true" />,
});

type ActiveModal = null | "network" | "partner";

export default function HeroHome() {
  const [modal, setModal] = useState<ActiveModal>(null);
  const close = () => setModal(null);

  return (
    <section
      className="nm-h3d"
      aria-label="National Motors — driving the future of mobility in Egypt"
    >
      <div className="nm-h3d__glow" aria-hidden="true" />

      <div className="nm-shell nm-h3d__inner">
        <p className="nm-eyebrow nm-eyebrow--sm nm-h3d__kicker">National Motors — Est. 1978</p>

        <div className="nm-h3d__stage">
          <LogoCanvas />
        </div>

        <h1 className="nm-h3d__title">Driving the Future of Mobility in Egypt</h1>

        <div className="nm-h3d__actions">
          <Link href="/brands" className="nm-btn nm-btn--primary" data-cursor="VIEW">
            <span className="nm-btn__text">Explore our Brands</span>
            <span className="nm-btn__arrow" aria-hidden="true">
              <ArrowRight strokeWidth={1.75} />
            </span>
          </Link>

          <button
            type="button"
            className="nm-btn nm-btn--secondary"
            onClick={() => setModal("network")}
            data-cursor="OPEN"
          >
            <span className="nm-btn__text">Our Automotive Network</span>
            <span className="nm-btn__arrow" aria-hidden="true">
              <ArrowRight strokeWidth={1.75} />
            </span>
          </button>

          <button
            type="button"
            className="nm-btn nm-btn--secondary"
            onClick={() => setModal("partner")}
            data-cursor="OPEN"
          >
            <span className="nm-btn__text">Partner with us</span>
            <span className="nm-btn__arrow" aria-hidden="true">
              <ArrowRight strokeWidth={1.75} />
            </span>
          </button>
        </div>
      </div>

      <div className="nm-h3d__scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <span className="nm-h3d__scrollcue-line" />
      </div>

      <Modal
        open={modal === "network"}
        onClose={close}
        title="Our Automotive Network"
        subtitle="Distributors across Egypt — for every brand we represent."
        size="wide"
      >
        <div className="nm-netmap-placeholder">
          <p className="nm-lead">
            An interactive map of every National Motors distributor, across all our brands, will
            live here.
          </p>
          <p className="nm-body">
            This section is built and ready — it&rsquo;s waiting on the distributor list and the
            final map design.
          </p>
        </div>
      </Modal>

      <Modal
        open={modal === "partner"}
        onClose={close}
        title="Partner with us"
        subtitle="Tell us about you and our team will reach out."
      >
        <PartnerForm onDone={close} />
      </Modal>
    </section>
  );
}
