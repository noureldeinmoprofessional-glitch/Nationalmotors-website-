"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Modal from "@/components/ui/Modal";
import PartnerForm from "./PartnerForm";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

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

  // Scroll-scrubbed video: pin the hero and drive video.currentTime from the
  // scroll, with eased catch-up (scrub). Hero text blur-reveals in, then
  // blurs out as the clip finishes, releasing the pin to the next section.
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    // Fallback: reduced-motion or small screens → autoplay muted loop, no pin.
    if (prefersReducedMotion() || window.innerWidth <= 768) {
      video.loop = true;
      video.muted = true;
      video.play?.().catch(() => {});
      return;
    }

    video.pause();
    const ctx = gsap.context(() => {
      // hide/blur reveal targets up front (before paint) to avoid a flash
      gsap.set(".nm-vh__reveal", { autoAlpha: 0, "--b": 18 });

      let built = false;
      // If the video can't load (e.g. codec/network), don't trap the text
      // hidden: show it statically over the poster and skip the scrub.
      const revealStatic = () => {
        if (built) return;
        gsap.to(".nm-vh__reveal", { autoAlpha: 1, "--b": 0, y: 0, duration: 0.5, stagger: 0.06 });
      };

      const build = () => {
        if (built) return;
        built = true;
        const duration = video.duration || 6;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => "+=" + Math.round(window.innerHeight * 2.2),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(video, { currentTime: 0 }, { currentTime: duration - 0.05, duration: 1 }, 0);
        tl.fromTo(
          ".nm-vh__reveal",
          { autoAlpha: 0, "--b": 18, y: 26 },
          { autoAlpha: 1, "--b": 0, y: 0, duration: 0.18, stagger: 0.035 },
          0.03
        );
        tl.to(
          ".nm-vh__reveal",
          { autoAlpha: 0, "--b": 12, y: -18, duration: 0.16, stagger: 0.025 },
          0.82
        );
      };

      if (video.readyState >= 1 && video.duration) build();
      else {
        video.addEventListener("loadedmetadata", build, { once: true });
        video.addEventListener("error", revealStatic, { once: true });
        // safety net: never leave the text hidden if nothing fires
        gsap.delayedCall(2.5, revealStatic);
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
