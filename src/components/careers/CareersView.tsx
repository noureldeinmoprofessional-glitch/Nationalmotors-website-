"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { useLineReveal, useReveal, useClipReveal, useParallax } from "@/lib/hooks";
import { CAREERS } from "@/lib/careersData";
import CVUpload, { validateCv } from "./CVUpload";
import OpportunityGrid from "./OpportunityGrid";

const HERO_IMAGE = "/images/about-hero/real-estate.jpg";
const APP_IMAGE = "/images/hero/joylong-a4-high-roof.png";

// ---------- Hero ----------
function CareersHero() {
  const headRef = useLineReveal<HTMLHeadingElement>({ start: "top 94%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1, start: "top 94%" });
  const frameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 0 100%)", start: "top 95%" });
  const parallaxRef = useParallax<HTMLDivElement>({ amount: 5 });

  return (
    <section className="nm-cr-hero" aria-label="Careers">
      <div className="nm-cr-hero__media" aria-hidden="true">
        <div ref={frameRef} className="nm-cr-hero__frame">
          <div ref={parallaxRef} className="nm-parallax-wrap">
            <div data-parallax className="nm-parallax-img">
              <Image src={HERO_IMAGE} alt="" fill priority sizes="(max-width: 900px) 100vw, 48vw" quality={85} style={{ objectFit: "cover", objectPosition: "50% 45%" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="nm-shell nm-cr-hero__inner">
        <p className="nm-eyebrow nm-eyebrow--gap">{CAREERS.eyebrow}</p>
        <h1 ref={headRef} className="nm-cr-hero__title nm-mask-lines">
          <span className="nm-line-mask"><span className="nm-line-inner">{CAREERS.title}</span></span>
        </h1>
        <div ref={bodyRef} className="nm-cr-hero__body">
          <p className="nm-lead" data-reveal>{CAREERS.heroBody}</p>
        </div>
        <div className="nm-cr-hero__cue" aria-hidden="true"><span>Scroll</span><span className="nm-cr-hero__cue-line" /></div>
      </div>
    </section>
  );
}

// ---------- Job application (general) ----------
function JobApplication() {
  const headRef = useLineReveal<HTMLHeadingElement>();
  const frameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 100% 0)", start: "top 82%" });
  const formRef = useReveal<HTMLFormElement>({ y: 24, stagger: 0.06, start: "top 82%" });

  const [form, setForm] = useState({ name: "", email: "", phone: "", qualifications: "", professional: "" });
  const [cv, setCv] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [noticeAr, setNoticeAr] = useState(false);

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Qualifications: ${form.qualifications}`,
      `Professional information: ${form.professional}`,
      "",
      `CV: ${cv?.name ?? ""} — please attach this file to the email before sending.`,
    ];
    const subject = encodeURIComponent(`Job Application — ${form.name}`);
    const body = encodeURIComponent(lines.join("\n"));
    // No backend: open a prefilled email to HR. We do NOT claim a successful
    // submission — the applicant completes it by attaching the CV and sending.
    window.location.href = `mailto:${CAREERS.hrEmail}?subject=${subject}&body=${body}`;
    setReady(true);
  };

  return (
    <section id="apply" className="nm-cr-apply" aria-label="Job Application">
      <div className="nm-shell">
        <div className="nm-nw-sechead">
          <span className="nm-nw-sechead__label">{CAREERS.applicationTitle}</span>
        </div>
        <div className="nm-cr-apply__grid">
          <div className="nm-cr-apply__media">
            <div ref={frameRef} className="nm-cr-apply__frame">
              <Image src={APP_IMAGE} alt="A National Motors business environment" fill loading="lazy" sizes="(max-width: 1024px) 100vw, 44vw" style={{ objectFit: "cover", objectPosition: "50% 55%" }} />
              <span className="nm-cr-apply__tint" aria-hidden="true" />
            </div>
          </div>

          {ready ? (
            <div className="nm-cr-ready" role="status">
              <Mail strokeWidth={1.4} aria-hidden="true" />
              <h2 ref={headRef} className="nm-cr-ready__title">Almost there</h2>
              <p className="nm-lead">
                Your application email has opened in your mail app. Please <strong>attach your CV{cv ? ` (${cv.name})` : ""}</strong> and send it to{" "}
                <a href={`mailto:${CAREERS.hrEmail}`}>{CAREERS.hrEmail}</a> to complete your application.
              </p>
              <button type="button" className="nm-btn nm-btn--secondary" onClick={() => setReady(false)}>
                <span className="nm-btn__text">Back to form</span>
              </button>
            </div>
          ) : (
            <form ref={formRef} className="nm-cr-form" onSubmit={onSubmit} noValidate>
              <div className="nm-field" data-reveal>
                <label className="nm-cr-label" htmlFor="cr-name">Full Name</label>
                <input id="cr-name" type="text" value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />
                {errors.name && <span className="nm-field__error" role="alert">{errors.name}</span>}
              </div>
              <div className="nm-field" data-reveal>
                <label className="nm-cr-label" htmlFor="cr-email">Email</label>
                <input id="cr-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} />
                {errors.email && <span className="nm-field__error" role="alert">{errors.email}</span>}
              </div>
              <div className="nm-field" data-reveal>
                <label className="nm-cr-label" htmlFor="cr-phone">Contact Number</label>
                <input id="cr-phone" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" aria-invalid={!!errors.phone} />
                {errors.phone && <span className="nm-field__error" role="alert">{errors.phone}</span>}
              </div>
              <div className="nm-field" data-reveal>
                <label className="nm-cr-label" htmlFor="cr-qual">Qualifications</label>
                <input id="cr-qual" type="text" value={form.qualifications} onChange={set("qualifications")} />
              </div>
              <div className="nm-field nm-field--full" data-reveal>
                <label className="nm-cr-label" htmlFor="cr-prof">Professional Information</label>
                <textarea id="cr-prof" rows={4} value={form.professional} onChange={set("professional")} />
              </div>
              <div data-reveal><CVUpload file={cv} setFile={(f) => { setCv(f); setErrors((e) => ({ ...e, cv: "" })); }} error={errors.cv} idPrefix="cr-cv" /></div>
              <div className="nm-field--full" data-reveal>
                <button type="submit" className="nm-btn nm-btn--primary nm-cr-submit" data-cursor="OPEN">
                  <span className="nm-btn__text">Apply</span>
                  <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
                </button>
                <div className="nm-cr-form__notice" data-reveal dir={noticeAr ? "rtl" : "ltr"}>
                  <span className="nm-cr-form__notice-head">
                    <span className="nm-cr-form__notice-label">{noticeAr ? CAREERS.noticeTitleAr : CAREERS.noticeTitle}</span>
                    <span className="nm-cr-form__notice-lang" role="group" aria-label="Notice language">
                      <button type="button" className={!noticeAr ? "is-active" : ""} aria-pressed={!noticeAr} onClick={() => setNoticeAr(false)}>EN</button>
                      <span aria-hidden="true">/</span>
                      <button type="button" className={noticeAr ? "is-active" : ""} aria-pressed={noticeAr} lang="ar" onClick={() => setNoticeAr(true)}>ع</button>
                    </span>
                  </span>
                  <p className="nm-cr-form__notice-body" lang={noticeAr ? "ar" : "en"}>
                    {noticeAr ? CAREERS.recruitmentNoticeAr : CAREERS.recruitmentNotice}
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function CareersView() {
  return (
    <>
      <CareersHero />
      <OpportunityGrid />
      <JobApplication />
    </>
  );
}
