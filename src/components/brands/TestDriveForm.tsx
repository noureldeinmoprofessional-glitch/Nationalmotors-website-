"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

/**
 * TODO(client): confirm where test-drive requests should be delivered.
 * For now this composes an email to the company inbox (a real channel);
 * swap for a real API endpoint when provided, and only show the success
 * state after it resolves.
 */
const DESTINATION = "info@nationalmotorsco.com";

/** Brand → models offered for a test drive. */
export const BRAND_VEHICLES: Record<string, string[]> = {
  Blu: ["Drift", "Tide", "Crest"],
  Joylong: ["ICEs", "EVs", "Cargos"],
  Farizon: ["V6E", "F1E", "H8E", "SV"],
};

const BRANDS = Object.keys(BRAND_VEHICLES);

type Fields = { name: string; phone: string; brand: string; vehicle: string };

export default function TestDriveForm({
  defaultBrand = "",
  onDone,
}: {
  defaultBrand?: string;
  onDone?: () => void;
}) {
  const [form, setForm] = useState<Fields>({
    name: "",
    phone: "",
    brand: BRANDS.includes(defaultBrand) ? defaultBrand : "",
    vehicle: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const vehicles = form.brand ? BRAND_VEHICLES[form.brand] ?? [] : [];

  const setField =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setForm((f) =>
        // Changing the brand clears a now-invalid vehicle selection.
        k === "brand" ? { ...f, brand: value, vehicle: "" } : { ...f, [k]: value }
      );
    };

  const validate = () => {
    const err: Partial<Record<keyof Fields, string>> = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!form.phone.trim()) err.phone = "Please enter a contact number.";
    if (!form.brand) err.brand = "Please choose a brand.";
    if (!form.vehicle) err.vehicle = "Please choose a vehicle.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    const body = [
      "Test drive request",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Brand: ${form.brand}`,
      `Vehicle: ${form.vehicle}`,
    ].join("\n");
    await new Promise((r) => setTimeout(r, 700));
    window.location.href = `mailto:${DESTINATION}?subject=${encodeURIComponent(
      `Test Drive Request — ${form.brand} ${form.vehicle}`
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
          Thanks for your interest. Our representative will contact you soon.
        </p>
        <button
          type="button"
          className="nm-btn nm-btn--secondary"
          onClick={() => onDone?.()}
        >
          <span className="nm-btn__text">Close</span>
        </button>
      </div>
    );
  }

  return (
    <form className="nm-ct-form nm-td-form" onSubmit={onSubmit} noValidate>
      <div className="nm-field">
        <label className="nm-cr-label" htmlFor="td-name">Name</label>
        <input
          id="td-name"
          type="text"
          value={form.name}
          onChange={setField("name")}
          autoComplete="name"
          aria-invalid={!!errors.name}
          data-autofocus
        />
        {errors.name && <span className="nm-field__error" role="alert">{errors.name}</span>}
      </div>

      <div className="nm-field">
        <label className="nm-cr-label" htmlFor="td-phone">Phone</label>
        <input
          id="td-phone"
          type="tel"
          value={form.phone}
          onChange={setField("phone")}
          autoComplete="tel"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <span className="nm-field__error" role="alert">{errors.phone}</span>}
      </div>

      <div className="nm-field">
        <label className="nm-cr-label" htmlFor="td-brand">Brand</label>
        <select
          id="td-brand"
          value={form.brand}
          onChange={setField("brand")}
          aria-invalid={!!errors.brand}
        >
          <option value="" disabled>Select a brand</option>
          {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        {errors.brand && <span className="nm-field__error" role="alert">{errors.brand}</span>}
      </div>

      <div className="nm-field">
        <label className="nm-cr-label" htmlFor="td-vehicle">Vehicle you&rsquo;re interested in</label>
        <select
          id="td-vehicle"
          value={form.vehicle}
          onChange={setField("vehicle")}
          disabled={!form.brand}
          aria-invalid={!!errors.vehicle}
        >
          <option value="" disabled>
            {form.brand ? "Select a vehicle" : "Select a brand first"}
          </option>
          {vehicles.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        {errors.vehicle && <span className="nm-field__error" role="alert">{errors.vehicle}</span>}
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
            <span className="nm-btn__arrow nm-jm__spin" aria-hidden="true"><Loader2 strokeWidth={1.9} /></span>
          </>
        ) : (
          <>
            <span className="nm-btn__text">Book Test Drive</span>
            <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
          </>
        )}
      </button>
    </form>
  );
}
