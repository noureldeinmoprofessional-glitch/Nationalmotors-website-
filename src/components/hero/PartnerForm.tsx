"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

/**
 * TODO(client): confirm where "Partner with us" submissions should go.
 * For now this mirrors the existing contact form and opens a prefilled
 * email to the company inbox. Swap for a real API endpoint when provided,
 * and only show the success state after it resolves.
 */
const PARTNER_DESTINATION = "info@nationalmotorsco.com";

type Fields = { name: string; phone: string; email: string; message: string };

const EMPTY: Fields = { name: "", phone: "", email: "", message: "" };

export default function PartnerForm({ onDone }: { onDone?: () => void }) {
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const err: Partial<Record<keyof Fields, string>> = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!form.phone.trim()) err.phone = "Please enter a contact number.";
    if (!form.email.trim()) err.email = "Please enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Please enter a valid email address.";
    if (!form.message.trim()) err.message = "Please add a short message.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    const body = [
      `Name: ${form.name}`,
      `Contact number: ${form.phone}`,
      `Work email: ${form.email}`,
      "",
      "Message:",
      form.message,
    ].join("\n");
    await new Promise((r) => setTimeout(r, 700));
    window.location.href = `mailto:${PARTNER_DESTINATION}?subject=${encodeURIComponent(
      "Partnership inquiry — National Motors"
    )}&body=${encodeURIComponent(body)}`;
    setSubmitting(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="nm-ct-success" role="status">
        <span className="nm-ct-success__check" aria-hidden="true">
          <Check strokeWidth={2} />
        </span>
        <h3 className="nm-ct-success__title">Thank you</h3>
        <p className="nm-lead">
          We&rsquo;ve received your details and our partnerships team will be in touch shortly.
        </p>
        <button
          type="button"
          className="nm-btn nm-btn--secondary"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
            onDone?.();
          }}
        >
          <span className="nm-btn__text">Close</span>
        </button>
      </div>
    );
  }

  return (
    <form className="nm-ct-form nm-partner-form" onSubmit={onSubmit} noValidate>
      <div className="nm-field">
        <label className="nm-cr-label" htmlFor="pf-name">
          Name
        </label>
        <input
          id="pf-name"
          type="text"
          value={form.name}
          onChange={set("name")}
          autoComplete="name"
          aria-invalid={!!errors.name}
          data-autofocus
        />
        {errors.name && (
          <span className="nm-field__error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="nm-field">
        <label className="nm-cr-label" htmlFor="pf-phone">
          Contact number
        </label>
        <input
          id="pf-phone"
          type="tel"
          value={form.phone}
          onChange={set("phone")}
          autoComplete="tel"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <span className="nm-field__error" role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      <div className="nm-field">
        <label className="nm-cr-label" htmlFor="pf-email">
          Work email
        </label>
        <input
          id="pf-email"
          type="email"
          value={form.email}
          onChange={set("email")}
          autoComplete="email"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="nm-field__error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="nm-field">
        <label className="nm-cr-label" htmlFor="pf-message">
          Message
        </label>
        <textarea
          id="pf-message"
          rows={5}
          value={form.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span className="nm-field__error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="nm-btn nm-btn--primary nm-ct-submit"
        data-cursor="OPEN"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <span className="nm-btn__text">Sending</span>
            <span className="nm-btn__arrow nm-jm__spin" aria-hidden="true">
              <Loader2 strokeWidth={1.9} />
            </span>
          </>
        ) : (
          <>
            <span className="nm-btn__text">Submit</span>
            <span className="nm-btn__arrow" aria-hidden="true">
              <ArrowRight strokeWidth={1.75} />
            </span>
          </>
        )}
      </button>
    </form>
  );
}
