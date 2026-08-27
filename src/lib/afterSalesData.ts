/* ============================================================
   NATIONAL MOTORS — After-Sales page content
   SOURCE OF TRUTH: "National Motors Website Content.pptx"
   Hero: slide 9. Services + descriptions: slide 32. Service names:
   slide 34. Booking fields: slide 44. Service centers: slide 36.
   All copy reproduced verbatim from the approved PPTX.
   ============================================================ */

import type { LocationEntry } from "./brandsData";

export const AFTER_SALES_HERO = {
  eyebrow: "After-Sales Support",
  headline: "Support That Keeps You Moving",
  body: "From scheduled maintenance to spare parts and technical support, National Motors is committed to keeping your vehicle performing at its best.",
  cta: { label: "Book a Service", href: "#book" },
  image: "/images/service/maintenance.png",
  imageAlt: "A National Motors after-sales service and maintenance environment",
};

export const AFTER_SALES_SERVICES = {
  eyebrow: "After-Sales Services",
  headline: "Support Designed to Keep You Moving",
  intro:
    "National Motors provides specialized maintenance, repair, and spare-parts support designed around the vehicles and customers we serve.",
  items: [
    {
      id: "body-repair",
      title: "Body Repair & Paint",
      body: "Restore your vehicle's body and exterior finish through professional dent repair, bodywork preparation, painting, and refinishing services.",
      image: "/images/service/body-repair-paint.png",
      imageAlt: "National Motors body repair and vehicle painting service in Egypt",
    },
    {
      id: "parts-delivery",
      title: "Free Joylong Parts Delivery",
      body: "Order available Joylong spare parts and receive them across Egypt without delivery charges, subject to stock availability and applicable delivery coverage.",
      image: "/images/service/parts-delivery.png",
      imageAlt: "Free delivery of available Joylong spare parts across Egypt",
    },
    {
      id: "dfsk-parts",
      title: "DFSK Spare Parts",
      body: "Find available spare parts for supported DFSK vehicles from model year 2022 and earlier through National Motors' after-sales network.",
      image: "/images/sectors/tyres.png",
      imageAlt: "Spare parts for DFSK 2022 and earlier models in Egypt",
    },
    {
      id: "dfsk-maintenance",
      title: "DFSK Maintenance",
      body: "Access maintenance and technical inspection services for supported DFSK vehicles from model year 2022 and earlier.",
      image: "/images/service/maintenance.png",
      imageAlt: "Maintenance for DFSK 2022 and earlier models at National Motors",
    },
  ],
};

// Booking — the approved "Book an appointment Form" (PPTX slide 56). Heading,
// supporting copy, field labels, and the short-notice disclaimer are reproduced
// verbatim; the form is directed to info@nationalmotorsco.com.
export const BOOKING = {
  heading: "Book an Appointment",
  supporting:
    "Schedule your visit to one of our service centers for professional maintenance and repair. Complete the form below, and our service team will contact you to confirm your appointment.",
  fields: {
    name: "Name",
    contact: "Contact number",
    carType: "Car type",
    carModel: "Car model",
    carBrand: "Car brand",
    requestedService: "Requested service",
    dates: "Preferred range of dates",
  },
  services: [
    "Body Repair & Paint",
    "Free Joylong Parts Delivery",
    "DFSK Spare Parts",
    "DFSK Maintenance",
  ],
  shortNotice:
    "National Motors will use your contact and vehicle information, chassis number, requested service, and preferred appointment details to arrange and prepare for your service visit. Submitting this form does not confirm an appointment; the appointment becomes confirmed only after National Motors or an authorized service centre contacts you.",
  recipient: "info@nationalmotorsco.com",
};

export const SERVICE_CENTERS = {
  eyebrow: "Our Service Center Locations",
  description: "Find your nearest National Motors service center below.",
  entries: [
    {
      name: "Cairo / Giza",
      address: "6th of October, Third Industrial Zone, Service Axis, First Plot No. 50",
      region: "Cairo / Giza",
      type: "Service Center",
    },
    {
      name: "Alexandria",
      address: "4 Mostafa Kamel Street",
      region: "Alexandria",
      type: "Service Center",
    },
    {
      name: "Qena",
      address: "Qena Entrance, Cairo-Aswan Road",
      region: "Qena",
      type: "Service Center",
    },
  ] as LocationEntry[],
};
