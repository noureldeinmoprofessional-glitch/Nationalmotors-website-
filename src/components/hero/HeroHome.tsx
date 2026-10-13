"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Modal from "@/components/ui/Modal";
import PartnerForm from "./PartnerForm";
import AutomotiveNetwork from "@/components/network/AutomotiveNetwork";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const VIDEO_SRC = "/videos/hero.mp4";
const VIDEO_POSTER = "/videos/hero-poster.jpg";

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

  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hero behaviour:
  //  • Text + buttons blur-reveal in ON LOAD (independent of scroll) so the
  //    hero feels alive the moment the page settles.
  //  • On desktop with motion allowed, the video is additionally pinned and
  //    scroll-scrubbed; the text reveal no longer depends on that timeline.
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const reducedMotion = prefersReducedMotion();
    const smallOrReduced = reducedMotion || window.innerWidth <= 768;

    // Reduced-motion / small screens → autoplay muted loop, no pin/scrub.
    if (smallOrReduced) {
      video.loop = true;
      video.muted = true;
      video.play?.().catch(() => {});
    }

    const ctx = gsap.context(() => {
      // ---- On-load entrance (not scroll-driven) ----
      if (!reducedMotion) {
        // Hide before paint to avoid a flash, then play immediately on mount.
        gsap.set(".nm-vh__reveal", { autoAlpha: 0, "--b": 18, y: 28 });
        gsap.to(".nm-vh__reveal", {
          autoAlpha: 1,
          "--b": 0,
          y: 0,
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.25,
        });
      }

      // ---- Desktop scroll-scrubbed video (motion allowed only) ----
      if (!smallOrReduced) {
        video.pause();
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => "+=" + Math.round(window.innerHeight * 1.8),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const addVideoScrub = () => {
          const d = video.duration;
          if (!d || !isFinite(d)) return;
          tl.fromTo(video, { currentTime: 0 }, { currentTime: d - 0.05, duration: 1 }, 0);
          ScrollTrigger.refresh();
        };
        if (video.readyState >= 1 && video.duration) addVideoScrub();
        else video.addEventListener("loadedmetadata", addVideoScrub, { once: true });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="nm-vh" aria-label="National Motors — driving the future of mobility in Egypt">
      <div className="nm-vh__media" aria-hidden="true">
        <video
          ref={videoRef}
          className="nm-vh__video"
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          muted
          playsInline
          preload="auto"
          {...(reduced ? { autoPlay: true, loop: true } : {})}
        />
        <div className="nm-vh__scrim" />
      </div>

      <div className="nm-shell nm-vh__inner">
        <div className="nm-vh__content">
          <p className="nm-eyebrow nm-eyebrow--sm nm-vh__reveal">National Motors — Est. 1978</p>
          <h1 className="nm-vh__title nm-vh__reveal">Driving the Future of Mobility in Egypt</h1>

          <div className="nm-vh__actions nm-vh__reveal">
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
      </div>

      <div className="nm-vh__scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <span className="nm-vh__scrollcue-line" />
      </div>

      <Modal
        open={modal === "network"}
        onClose={close}
        title="Our Automotive Network"
        subtitle="Distributors across Egypt — for every brand we represent."
        size="wide"
      >
        <AutomotiveNetwork />
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
