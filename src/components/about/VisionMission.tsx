"use client";

import { useReveal } from "@/lib/hooks";
import { VISION, MISSION } from "@/lib/aboutContent";
import VisionGradient from "./VisionGradient";

export default function VisionMission() {
  const visionBodyRef = useReveal<HTMLDivElement>({ y: 28, stagger: 0.1 });
  const missionBodyRef = useReveal<HTMLDivElement>({ y: 28, stagger: 0.1 });

  return (
    <section id="philosophy" className="nm-vm" aria-label="The way we think">
      <VisionGradient />
      <div className="nm-vm__vision">
        <div className="nm-shell">
          <p className="nm-eyebrow">{VISION.eyebrow}</p>
          <h2 className="nm-vm__vision-title">{VISION.headline}</h2>
          <div ref={visionBodyRef} className="nm-vm__body">
            <p className="nm-lead" data-reveal>{VISION.body}</p>
          </div>
        </div>
      </div>

      <div className="nm-vm__mission">
        <div className="nm-shell">
          <div className="nm-vm__mission-inner">
            <p className="nm-eyebrow">{MISSION.eyebrow}</p>
            <div ref={missionBodyRef} className="nm-vm__body">
              <p className="nm-lead" data-reveal>{MISSION.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
