"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Optional short line under the title. */
  subtitle?: string;
  /** Widen the panel for map / wide content. */
  size?: "default" | "wide";
  children: React.ReactNode;
};

/**
 * Accessible, theme-aware modal rendered in a portal.
 * Locks background scroll (Lenis-aware), traps focus loosely, closes on
 * Escape and scrim click, and restores focus to the trigger on close.
 */
export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  size = "default",
  children,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement | null;

    // Lock background scroll (Lenis if present, otherwise the document).
    const lenis = window.__lenis;
    if (lenis) lenis.stop();
    else document.documentElement.classList.add("nm-scroll-lock");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "Tab") trapFocus(e);
    };
    const trapFocus = (e: KeyboardEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);

    // Move focus into the panel.
    const raf = requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("[data-autofocus], button, a, input, textarea, select")
        ?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      if (lenis) lenis.start();
      else document.documentElement.classList.remove("nm-scroll-lock");
      lastFocused.current?.focus?.();
    };
  }, [open, close]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="nm-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button className="nm-modal__scrim" aria-label="Close dialog" onClick={close} tabIndex={-1} />
      <div
        ref={panelRef}
        className={`nm-modal__panel${size === "wide" ? " nm-modal__panel--wide" : ""}`}
      >
        <header className="nm-modal__head">
          <div>
            <h2 id={titleId} className="nm-modal__title">
              {title}
            </h2>
            {subtitle && <p className="nm-modal__subtitle">{subtitle}</p>}
          </div>
          <button className="nm-modal__close" onClick={close} aria-label="Close" data-cursor="CLOSE">
            <X strokeWidth={1.6} aria-hidden="true" />
          </button>
        </header>
        <div className="nm-modal__body" data-lenis-prevent>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
