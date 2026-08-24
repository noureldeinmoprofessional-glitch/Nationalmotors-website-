"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, Phone } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { NAV, CONTACT } from "@/lib/site";

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Keep in DOM during exit animation
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (open) {
        document.body.style.overflow = "hidden";
        const items = root.querySelectorAll("[data-mnav-item]");
        gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });
        if (reduce) {
          gsap.set(panelRef.current, { xPercent: 0 });
          gsap.set(items, { opacity: 1, y: 0 });
          return;
        }
        const tl = gsap.timeline();
        tl.fromTo(
          panelRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.7, ease: "power4.inOut" }
        ).fromTo(
          items,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
          "-=0.35"
        );
      } else if (mounted) {
        document.body.style.overflow = "";
        if (reduce) {
          gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
          setMounted(false);
          return;
        }
        gsap.to(panelRef.current, {
          xPercent: 100,
          duration: 0.55,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
            setMounted(false);
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [open, mounted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      className="nm-mnav"
      style={{ visibility: "hidden", opacity: 0 }}
      aria-hidden={!open}
    >
      <button className="nm-mnav__scrim" aria-label="Close menu" onClick={onClose} tabIndex={open ? 0 : -1} />
      <div ref={panelRef} className="nm-mnav__panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="nm-mnav__top">
          <span className="nm-eyebrow nm-eyebrow--sm">Menu</span>
          <button className="nm-mnav__close" aria-label="Close menu" onClick={onClose} tabIndex={open ? 0 : -1}>
            <X strokeWidth={1.6} />
          </button>
        </div>

        <nav className="nm-mnav__nav" aria-label="Mobile">
          <ul>
            {NAV.map((item) => {
              const isOpen = expanded === item.label;
              return (
                <li key={item.label} data-mnav-item className="nm-mnav__row">
                  <div className="nm-mnav__rowhead">
                    <Link href={item.href} className="nm-mnav__link" onClick={onClose} tabIndex={open ? 0 : -1}>
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        className="nm-mnav__toggle"
                        aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        tabIndex={open ? 0 : -1}
                      >
                        {isOpen ? <Minus strokeWidth={1.6} /> : <Plus strokeWidth={1.6} />}
                      </button>
                    )}
                  </div>
                  {item.children && (
                    <div className="nm-mnav__sub" data-open={isOpen || undefined}>
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link href={c.href} onClick={onClose} tabIndex={open && isOpen ? 0 : -1}>
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nm-mnav__foot" data-mnav-item>
          <Link href="/contact" className="nm-btn nm-btn--primary nm-mnav__cta" onClick={onClose} tabIndex={open ? 0 : -1}>
            <span className="nm-btn__text">Contact Us</span>
          </Link>
          <div className="nm-mnav__meta">
            <a href={`tel:${CONTACT.hotline}`} className="nm-mnav__hotline" tabIndex={open ? 0 : -1}>
              <Phone strokeWidth={1.6} /> {CONTACT.hotline}
            </a>
            <div className="nm-mnav__lang">
              <button className="is-active" tabIndex={open ? 0 : -1}>EN</button>
              <span>/</span>
              <button lang="ar" tabIndex={open ? 0 : -1}>AR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
