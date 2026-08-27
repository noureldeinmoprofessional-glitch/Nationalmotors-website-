"use client";

import { useEffect, useRef, useState } from "react";
import { X, ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import CVUpload, { validateCv } from "./CVUpload";
import type { Opportunity } from "@/lib/opportunitiesData";

type Step = "details" | "application" | "success";
const EMPTY = { name: "", email: "", phone: "", qualifications: "", professional: "" };

export default function JobOpportunityModal({ opportunity, onClose }: { opportunity: Opportunity; onClose: () => void }) {
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState({ ...EMPTY });
  const [cv, setCv] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const hasData = () => Object.values(form).some((v) => v.trim()) || !!cv;

  const finishClose = () => onClose();
  const animateClose = () => {
    if (closingRef.current) return;
    const p = panelRef.current, b = backdropRef.current;
    if (prefersReducedMotion() || !p || !b) return finishClose();
    closingRef.current = true;
    gsap.to(p, { opacity: 0, scale: 0.98, y: 12, duration: 0.32, ease: "power2.in" });
    gsap.to(b, { opacity: 0, duration: 0.32, ease: "power2.in" });
    window.setTimeout(finishClose, 340);
  };
  const requestClose = () => {
    if (step === "application" && hasData()) { setConfirmDiscard(true); return; }
    animateClose();
  };

  // Enter animation + scroll lock
  useIsoLayoutEffect(() => {
    const p = panelRef.current, b = backdropRef.current;
    document.documentElement.style.overflow = "hidden";
    if (!prefersReducedMotion() && p && b) {
      gsap.fromTo(b, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(p, { opacity: 0, scale: 0.98, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" });
    }
    panelRef.current?.querySelector<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")?.focus();
    return () => { document.documentElement.style.overflow = ""; };
  }, []);

  // Content fade on step change
  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !contentRef.current) return;
    gsap.fromTo(contentRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    panelRef.current?.scrollTo({ top: 0 });
  }, [step]);

  // Escape + focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); confirmDiscard ? setConfirmDiscard(false) : requestClose(); return; }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"))
        .filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, confirmDiscard, form, cv]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Please enter a valid email address.";
    if (!form.phone.trim()) err.phone = "Please enter your contact number.";
    const cvErr = validateCv(cv);
    if (cvErr) err.cv = cvErr;
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    // DEMO submission — there is no backend. This awaits a placeholder handler
    // so the loading → success UX can be reviewed. Replace `submitApplication`
    // with a real HR endpoint; success must only render after it resolves.
    await new Promise((res) => setTimeout(res, 1400));
    setSubmitting(false);
    setStep("success");
  };

  const meta = `${opportunity.location} · ${opportunity.employmentType}`;

  return (
    <div className="nm-modal" role="dialog" aria-modal="true" aria-labelledby="jm-title">
      <div ref={backdropRef} className="nm-modal__backdrop" onClick={requestClose} aria-hidden="true" />
      <div ref={panelRef} className="nm-jm">
        <div className="nm-jm__bar">
          {step === "application" ? (
            <button type="button" className="nm-jm__back" onClick={() => setStep("details")}>
              <ArrowLeft strokeWidth={1.7} aria-hidden="true" /> <span>Back to Job Details</span>
            </button>
          ) : <span />}
          <button type="button" className="nm-modal__close" onClick={requestClose} aria-label="Close"><X strokeWidth={1.7} aria-hidden="true" /></button>
        </div>

        <div ref={contentRef} className="nm-jm__content">
          {step === "details" && (
            <>
              {opportunity.isDemo && <span className="nm-jm__demo">Demo Opportunity</span>}
              <p className="nm-jm__dept">{opportunity.department}</p>
              <h2 id="jm-title" className="nm-jm__title">{opportunity.title}</h2>
              <p className="nm-jm__meta">{meta}</p>
              <hr className="nm-jm__rule" />
              <h3 className="nm-jm__h">About the Role</h3>
              <p className="nm-jm__body">{opportunity.description}</p>
              <h3 className="nm-jm__h">Requirements</h3>
              <ul className="nm-jm__reqs">
                {opportunity.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              <hr className="nm-jm__rule" />
              <button type="button" className="nm-btn nm-btn--primary nm-jm__apply" onClick={() => setStep("application")} data-cursor="OPEN">
                <span className="nm-btn__text">Apply Now</span>
                <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
              </button>
            </>
          )}

          {step === "application" && (
            <>
              <span className="nm-jm__applying">Applying for</span>
              <h2 id="jm-title" className="nm-jm__title nm-jm__title--sm">{opportunity.title}</h2>
              <p className="nm-jm__meta">{meta}</p>
              <hr className="nm-jm__rule" />
              <form className="nm-jm__form" onSubmit={submit} noValidate>
                <div className="nm-field">
                  <label className="nm-cr-label" htmlFor="jm-name">Full Name</label>
                  <input id="jm-name" type="text" value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />
                  {errors.name && <span className="nm-field__error" role="alert">{errors.name}</span>}
                </div>
                <div className="nm-field">
                  <label className="nm-cr-label" htmlFor="jm-email">Email</label>
                  <input id="jm-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} />
                  {errors.email && <span className="nm-field__error" role="alert">{errors.email}</span>}
                </div>
                <div className="nm-field">
                  <label className="nm-cr-label" htmlFor="jm-phone">Phone</label>
                  <input id="jm-phone" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" aria-invalid={!!errors.phone} />
                  {errors.phone && <span className="nm-field__error" role="alert">{errors.phone}</span>}
                </div>
                <div className="nm-field">
                  <label className="nm-cr-label" htmlFor="jm-qual">Qualifications</label>
                  <input id="jm-qual" type="text" value={form.qualifications} onChange={set("qualifications")} />
                </div>
                <div className="nm-field nm-field--full">
                  <label className="nm-cr-label" htmlFor="jm-prof">Professional Information</label>
                  <textarea id="jm-prof" rows={3} value={form.professional} onChange={set("professional")} />
                </div>
                <CVUpload file={cv} setFile={(f) => { setCv(f); setErrors((e) => ({ ...e, cv: "" })); }} error={errors.cv} idPrefix="jm-cv" />
                <div className="nm-field--full">
                  <button type="submit" className="nm-btn nm-btn--primary nm-jm__submit" data-cursor="OPEN" disabled={submitting}>
                    {submitting ? (
                      <><span className="nm-btn__text">Submitting…</span><span className="nm-btn__arrow nm-jm__spin" aria-hidden="true"><Loader2 strokeWidth={1.9} /></span></>
                    ) : (
                      <><span className="nm-btn__text">Submit Application</span><span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span></>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {step === "success" && (
            <div className="nm-jm__success" role="status">
              <span className="nm-jm__check" aria-hidden="true"><Check strokeWidth={2} /></span>
              <h2 id="jm-title" className="nm-jm__success-title">Application Submitted</h2>
              <p className="nm-jm__success-body">Thank you for applying to National Motors.</p>
              <p className="nm-jm__success-body">Your resume has been submitted successfully.</p>
              <button type="button" className="nm-btn nm-btn--secondary nm-jm__close-btn" onClick={animateClose}>
                <span className="nm-btn__text">Close</span>
              </button>
            </div>
          )}
        </div>

        {confirmDiscard && (
          <div className="nm-jm__confirm" role="alertdialog" aria-label="Discard application">
            <div className="nm-jm__confirm-box">
              <p className="nm-jm__confirm-title">Discard this application?</p>
              <p className="nm-jm__confirm-body">Your entered information will be lost.</p>
              <div className="nm-jm__confirm-actions">
                <button type="button" className="nm-btn nm-btn--secondary" onClick={() => setConfirmDiscard(false)}><span className="nm-btn__text">Cancel</span></button>
                <button type="button" className="nm-btn nm-btn--primary" onClick={() => { setConfirmDiscard(false); animateClose(); }}><span className="nm-btn__text">Discard</span></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
