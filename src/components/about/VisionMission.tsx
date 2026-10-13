"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { VISION, MISSION } from "@/lib/aboutContent";

export default function VisionMission() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return; // visible defaults

    const ctx = gsap.context(() => {
      gsap.set(".nm-vm__divider", { scaleX: 0, transformOrigin: "left center" });
      gsap.set([".nm-vm__eyebrow", ".nm-vm__vision > *", ".nm-vm__mission > *", ".nm-vm__est"], {
        autoAlpha: 0,
        y: 26,
      });
      gsap.set(".nm-vm__media", { clipPath: "polygon(12% 0, 12% 0, 0 100%, 0 100%)" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 70%" },
      });

      // Eyebrow + Vision copy
      tl.to(".nm-vm__eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 });
      // Image — clip-path reveal into its angled frame
      tl.to(
        ".nm-vm__media",
        { clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)", duration: 1.15, ease: "power4.inOut" },
        0.1
      );
      tl.to(".nm-vm__vision > *", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.9");
      tl.to(".nm-vm__divider", { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.55");
      // Mission block — staggered from below
      tl.to(".nm-vm__mission > *", { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.12 }, "-=0.4");
      // Heritage detail last
      tl.to(".nm-vm__est", { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.1");

      // Subtle scroll-linked parallax inside the clipped frame
      gsap.fromTo(
        ".nm-vm__media-img",
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="nm-vm" aria-label="Vision and Mission">
      <div className="nm-shell nm-vm__wrap">
        <div className="nm-vm__left">
          <p className="nm-eyebrow nm-eyebrow--static nm-vm__eyebrow">Vision &amp; Mission</p>

          <div className="nm-vm__vision">
            <p className="nm-vm__label">{VISION.eyebrow}</p>
            <h2 className="nm-vm__title">{VISION.headline}</h2>
            <p className="nm-vm__copy">{VISION.body}</p>
          </div>

          <span className="nm-vm__divider" aria-hidden="true" />
        </div>

        <div className="nm-vm__right">
          <div className="nm-vm__media">
            <div className="nm-vm__media-img">
              <Image
                src={VISION.image}
                alt={VISION.imageAlt}
                fill
                sizes="(max-width: 980px) 100vw, 52vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="nm-vm__mission">
            <p className="nm-vm__label nm-vm__label--mission">{MISSION.eyebrow}</p>
            <h3 className="nm-vm__title nm-vm__title--mission">{MISSION.title}</h3>
            <p className="nm-vm__copy">{MISSION.body}</p>
          </div>

          <p className="nm-vm__est">{MISSION.est}</p>
        </div>
      </div>
    </section>
  );
}
