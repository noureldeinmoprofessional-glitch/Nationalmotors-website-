"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { X, ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { BOOKING } from "@/lib/afterSalesData";

type Ctx = { open: (service?: string) => void };
const AppointmentCtx = createContext<Ctx>({ open: () => {} });
export const useAppointment = () => useContext(AppointmentCtx);

const EMPTY = { name: "", contact: "", carType: "", carModel: "", carBrand: "", requestedService: "", dates: "" };

export default function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false); // in the DOM (through exit anim)
  const [service, setService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);

  const open = useCallback((svc?: string) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setService(svc ?? null);
    setForm({ ...EMPTY, requestedService: svc ?? "" });
    setSubmitted(false);
    closingRef.current = false;
    setMounted(true);
  }, []);

  const finishClose = useCallback(() => {
    setMounted(false);
    const t = triggerRef.current;
    if (t && typeof t.focus === "function") t.focus();
  }, []);

  const close = useCallback(() => {
    if (closingRef.current) return;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (prefersReducedMotion() || !panel || !backdrop) {
      finishClose();
      return;
    }
    closingRef.current = true;
    gsap.to(panel, { opacity: 0, scale: 0.97, y: 10, duration: 0.35, ease: "power2.in" });
    gsap.to(backdrop, { opacity: 0, duration: 0.35, ease: "power2.in" });
    // Unmount on a timer (independent of the rAF-driven tween) so close is reliable.
    window.setTimeout(finishClose, 360);
  }, [finishClose]);

  // Enter animation + focus management while mounted.
  useIsoLayoutEffect(() => {
    if (!mounted) return;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    document.documentElement.style.overflow = "hidden";

    if (!prefersReducedMotion() && panel && backdrop) {
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { opacity: 0, scale: 0.97, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
    }
    // focus first field / close button
    const focusable = panel?.querySelector<HTMLElement>(
      "input, select, textarea, button, [href], [tabindex]:not([tabindex='-1'])"
    );
    focusable?.focus();

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mounted]);

  // Escape + focus trap
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(
          "input, select, textarea, button, [href], [tabindex]:not([tabindex='-1'])"
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mounted, close]);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `${BOOKING.fields.requestedService}: ${form.requestedService}`,
      `${BOOKING.fields.name}: ${form.name}`,
      `${BOOKING.fields.contact}: ${form.contact}`,
      `${BOOKING.fields.carType}: ${form.carType}`,
      `${BOOKING.fields.carModel}: ${form.carModel}`,
      `${BOOKING.fields.carBrand}: ${form.carBrand}`,
      `${BOOKING.fields.dates}: ${form.dates}`,
    ];
    const subject = encodeURIComponent(`Appointment Request — ${form.requestedService || "Service"}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${BOOKING.recipient}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <AppointmentCtx.Provider value={{ open }}>
      {children}

      {mounted && (
        <div className="nm-modal" role="dialog" aria-modal="true" aria-labelledby="apt-title">
          <div ref={backdropRef} className="nm-modal__backdrop" onClick={close} aria-hidden="true" />
          <div ref={panelRef} className="nm-modal__panel">
            <button type="button" className="nm-modal__close" onClick={close} aria-label="Close">
              <X strokeWidth={1.7} aria-hidden="true" />
            </button>

            {submitted ? (
              <div className="nm-modal__success">
                <p className="nm-eyebrow nm-eyebrow--static nm-eyebrow--gap">Thank You</p>
                <p className="nm-lead">{BOOKING.shortNotice}</p>
                <button type="button" className="nm-btn nm-btn--secondary nm-modal__done" onClick={close}>
                  <span className="nm-btn__text">Done</span>
                </button>
              </div>
            ) : (
              <>
                <header className="nm-modal__head">
                  <p className="nm-eyebrow nm-eyebrow--static nm-eyebrow--gap">{BOOKING.heading}</p>
                  {service && <p id="apt-title" className="nm-modal__service">{service}</p>}
                  {!service && <span id="apt-title" className="nm-sr-only">{BOOKING.heading}</span>}
                  <p className="nm-modal__supporting">{BOOKING.supporting}</p>
                </header>

                <form className="nm-modal__form" onSubmit={onSubmit}>
                  <div className="nm-field nm-field--full">
                    <label htmlFor="apt-service">{BOOKING.fields.requestedService}</label>
                    {service ? (
                      <input id="apt-service" type="text" value={service} readOnly aria-readonly="true" className="nm-field--readonly" />
                    ) : (
                      <select id="apt-service" required value={form.requestedService} onChange={set("requestedService")}>
                        <option value="" disabled>Select a service</option>
                        {BOOKING.services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="nm-field">
                    <label htmlFor="apt-name">{BOOKING.fields.name}</label>
                    <input id="apt-name" type="text" required value={form.name} onChange={set("name")} autoComplete="name" />
                  </div>
                  <div className="nm-field">
                    <label htmlFor="apt-contact">{BOOKING.fields.contact}</label>
                    <input id="apt-contact" type="tel" required value={form.contact} onChange={set("contact")} autoComplete="tel" />
                  </div>
                  <div className="nm-field">
                    <label htmlFor="apt-brand">{BOOKING.fields.carBrand}</label>
                    <input id="apt-brand" type="text" required value={form.carBrand} onChange={set("carBrand")} />
                  </div>
                  <div className="nm-field">
                    <label htmlFor="apt-model">{BOOKING.fields.carModel}</label>
                    <input id="apt-model" type="text" required value={form.carModel} onChange={set("carModel")} />
                  </div>
                  <div className="nm-field">
                    <label htmlFor="apt-type">{BOOKING.fields.carType}</label>
                    <input id="apt-type" type="text" value={form.carType} onChange={set("carType")} />
                  </div>
                  <div className="nm-field">
                    <label htmlFor="apt-dates">{BOOKING.fields.dates}</label>
                    <input id="apt-dates" type="text" required value={form.dates} onChange={set("dates")} placeholder="e.g. 15–20 March" />
                  </div>

                  <p className="nm-modal__notice">{BOOKING.shortNotice}</p>

                  <div className="nm-field--full">
                    <button type="submit" className="nm-btn nm-btn--primary nm-modal__submit" data-cursor="OPEN">
                      <span className="nm-btn__text">Submit Request</span>
                      <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </AppointmentCtx.Provider>
  );
}
