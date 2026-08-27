"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2, Languages } from "lucide-react";
import { useLineReveal, useReveal } from "@/lib/hooks";
import { CONTACT, type ContactLang } from "@/lib/contactData";

export default function ContactView() {
  const [lang, setLang] = useState<ContactLang>("en");
  const t = CONTACT[lang];
  const rtl = lang === "ar";

  const headRef = useLineReveal<HTMLHeadingElement>({ start: "top 94%" });
  const heroBodyRef = useReveal<HTMLDivElement>({ y: 22, stagger: 0.1, start: "top 94%" });
  const introRef = useReveal<HTMLDivElement>({ y: 22, stagger: 0.1, start: "top 86%" });
  const formRef = useReveal<HTMLFormElement>({ y: 26, stagger: 0.07, start: "top 84%" });
  const noticeRef = useReveal<HTMLDivElement>({ y: 20, start: "top 90%" });

  const [form, setForm] = useState({ name: "", phone: "", brand: "", inquiry: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = t.errors.name;
    if (!form.phone.trim()) err.phone = t.errors.phone;
    if (!form.brand) err.brand = t.errors.brand;
    if (!form.inquiry.trim()) err.inquiry = t.errors.inquiry;
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    // No backend: this composes an email to the PPTX destination
    // (info@nationalmotorsco.com) — a real delivery channel — then shows the
    // approved confirmation. Replace with a real API/email service when
    // available; success should render only after it resolves.
    const lines = [
      `${CONTACT.en.labels.name}: ${form.name}`,
      `${CONTACT.en.labels.phone}: ${form.phone}`,
      `${CONTACT.en.labels.brand}: ${form.brand}`,
      `${CONTACT.en.labels.inquiry}: ${form.inquiry}`,
    ];
    await new Promise((res) => setTimeout(res, 800));
    window.location.href = `mailto:${CONTACT.destination}?subject=${encodeURIComponent("Website Inquiry")}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSubmitting(false);
    setSent(true);
  };

  const reset = () => { setForm({ name: "", phone: "", brand: "", inquiry: "" }); setErrors({}); setSent(false); };

  return (
    <div className="nm-ct" dir={rtl ? "rtl" : "ltr"} lang={lang}>
      {/* Hero */}
      <section className="nm-ct-hero" aria-label={t.eyebrow}>
        <div className="nm-shell nm-ct-hero__inner">
          <div className="nm-ct-hero__top">
            <p className="nm-eyebrow nm-eyebrow--gap">{t.eyebrow}</p>
            <button type="button" className="nm-ct-lang" onClick={() => setLang(rtl ? "en" : "ar")} aria-label={`Switch language to ${t.langLabel}`}>
              <Languages strokeWidth={1.6} aria-hidden="true" />
              <span>{t.langLabel}</span>
            </button>
          </div>
          <h1 ref={headRef} className="nm-ct-hero__title nm-mask-lines">
            <span className="nm-line-mask"><span className="nm-line-inner">{t.title}</span></span>
          </h1>
          <div ref={heroBodyRef} className="nm-ct-hero__body">
            <p className="nm-lead" data-reveal>{t.heroBody}</p>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="nm-ct-form-sec" aria-label={t.formHeading}>
        <div className="nm-shell nm-ct-grid">
          <div ref={introRef} className="nm-ct-intro">
            <h2 className="nm-ct-intro__title" data-reveal>{t.formHeading}</h2>
            <p className="nm-lead" data-reveal>{t.formIntro}</p>
          </div>

          <div className="nm-ct-formwrap">
            {sent ? (
              <div className="nm-ct-success" role="status">
                <span className="nm-ct-success__check" aria-hidden="true"><Check strokeWidth={2} /></span>
                <h2 className="nm-ct-success__title">{t.successTitle}</h2>
                <p className="nm-lead">{t.success}</p>
                <button type="button" className="nm-btn nm-btn--secondary" onClick={reset}><span className="nm-btn__text">{t.close}</span></button>
              </div>
            ) : (
              <form ref={formRef} className="nm-ct-form" onSubmit={onSubmit} noValidate>
                <div className="nm-field" data-reveal>
                  <label className="nm-cr-label" htmlFor="ct-name">{t.labels.name}</label>
                  <input id="ct-name" type="text" value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />
                  {errors.name && <span className="nm-field__error" role="alert">{errors.name}</span>}
                </div>
                <div className="nm-field" data-reveal>
                  <label className="nm-cr-label" htmlFor="ct-phone">{t.labels.phone}</label>
                  <input id="ct-phone" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" aria-invalid={!!errors.phone} />
                  {errors.phone && <span className="nm-field__error" role="alert">{errors.phone}</span>}
                </div>
                <div className="nm-field" data-reveal>
                  <label className="nm-cr-label" htmlFor="ct-brand">{t.labels.brand}</label>
                  <select id="ct-brand" value={form.brand} onChange={set("brand")} aria-invalid={!!errors.brand}>
                    <option value="" disabled>{t.brandPlaceholder}</option>
                    {CONTACT.brands.map((b) => <option key={b} value={b}>{b}</option>)}
                    <option value={t.generalOption}>{t.generalOption}</option>
                  </select>
                  {errors.brand && <span className="nm-field__error" role="alert">{errors.brand}</span>}
                </div>
                <div className="nm-field" data-reveal>
                  <label className="nm-cr-label" htmlFor="ct-inquiry">{t.labels.inquiry}</label>
                  <textarea id="ct-inquiry" rows={6} value={form.inquiry} onChange={set("inquiry")} aria-invalid={!!errors.inquiry} />
                  {errors.inquiry && <span className="nm-field__error" role="alert">{errors.inquiry}</span>}
                </div>
                <div data-reveal>
                  <button type="submit" className="nm-btn nm-btn--primary nm-ct-submit" data-cursor="OPEN" disabled={submitting}>
                    {submitting ? (
                      <><span className="nm-btn__text">{t.submitting}</span><span className="nm-btn__arrow nm-jm__spin" aria-hidden="true"><Loader2 strokeWidth={1.9} /></span></>
                    ) : (
                      <><span className="nm-btn__text">{t.submit}</span><span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Short notice */}
      <section className="nm-ct-notice-sec" aria-label={t.noticeLabel}>
        <div className="nm-shell">
          <div ref={noticeRef} className="nm-ct-notice">
            <span className="nm-ct-notice__label" data-reveal>{t.noticeLabel}</span>
            <p className="nm-ct-notice__body" data-reveal>{t.notice}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
