"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Modal from "@/components/ui/Modal";
import TestDriveForm from "./TestDriveForm";

type Props = {
  /** Pre-selects the brand when opened from a specific brand page. */
  brand?: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function TestDriveCTA({
  brand,
  label = "Book your test drive now",
  variant = "primary",
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`nm-btn nm-btn--${variant}${className ? " " + className : ""}`}
        data-cursor="OPEN"
        onClick={() => setOpen(true)}
      >
        <span className="nm-btn__text">{label}</span>
        <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Book your test drive now"
        subtitle="Share a few details and our team will arrange it."
      >
        <TestDriveForm defaultBrand={brand} onDone={() => setOpen(false)} />
      </Modal>
    </>
  );
}
