"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import Modal from "@/components/ui/Modal";
import PartnerForm from "./PartnerForm";
import { useLineReveal, useReveal } from "@/lib/hooks";

const HeroImage = dynamic(() => import("./HeroImage"), { ssr: false });
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const HERO_IMAGE = "/images/about-hero/automotive.jpg";

const QUERY = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}

type ActiveModal = null | "network" | "partner";

export default function HeroHome() {
  const [modal, setModal] = useState<ActiveModal>(null);
  const reduced = useReducedMotion();
  const close = () => setModal(null);

  const titleRef = useLineReveal<HTMLHeadingElement>({ start: "top 95%" });
  const metaRef = useReveal<HTMLDivElement>({ y: 22, stagger: 0.1, start: "top 95%" });

  return (
    <section className="nm-hh" aria-label="National Motors — driving the future of mobility in Egypt">
      {!reduced && <ParticleField className="nm-hh__particles" />}

      <div className="nm-shell nm-hh__inner">
        <div className="nm-hh__content" ref={metaRef}>
          <p className="nm-eyebrow nm-eyebrow--sm" data-reveal>
            National Motors — Est. 1978
          </p>

          <h1 ref={titleRef} className="nm-hh__title">
            <span className="nm-line-mask"><span className="nm-line-inner">Driving the Future</span></span>
            <span className="nm-line-mask"><span className="nm-line-inner">of Mobility in Egypt</span></span>
          </h1>

          <div className="nm-hh__actions" data-reveal>
            <Link href="/brands" className="nm-btn nm-btn--primary" data-cursor="VIEW">
              <span className="nm-btn__text">Explore our Brands</span>
              <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
            </Link>
            <button type="button" className="nm-btn nm-btn--secondary" onClick={() => setModal("network")} data-cursor="OPEN">
              <span className="nm-btn__text">Our Automotive Network</span>
              <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
            </button>
            <button type="button" className="nm-btn nm-btn--secondary" onClick={() => setModal("partner")} data-cursor="OPEN">
              <span className="nm-btn__text">Partner with us</span>
              <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
            </button>
          </div>
        </div>

        <div className="nm-hh__visual">
          <div className="nm-hh__frame">
            {reduced ? (
              <Image src={HERO_IMAGE} alt="National Motors — mobility across Egypt" fill sizes="(max-width: 980px) 90vw, 45vw" style={{ objectFit: "cover" }} priority />
            ) : (
              <HeroImage src={HERO_IMAGE} />
            )}
            <span className="nm-hh__frame-label" aria-hidden="true">National Motors · Mobility in Egypt</span>
          </div>
        </div>
      </div>

      <div className="nm-hh__scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <span className="nm-hh__scrollcue-line" />
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
            An interactive map of every National Motors distributor, across all our brands, will live here.
          </p>
          <p className="nm-body">
            This section is built and ready — it&rsquo;s waiting on the distributor list and the final map design.
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
