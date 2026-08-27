/* ============================================================
   NATIONAL MOTORS — Full FAQ content
   SOURCE OF TRUTH: "National Motors Website Content.pptx" slides 40–46.
   Questions and answers reproduced verbatim from the approved English
   content and grouped under the category labels given in the PPTX
   (Automotive and Mobility, After-Sales Services, Other Business Sectors).
   Nothing is fabricated.
   ============================================================ */

export type FaqEntry = { q: string; a: string };
export type FaqCategory = { label: string; items: FaqEntry[] };

export const FAQ_INTRO = {
  eyebrow: "Frequently Asked Questions",
  headline: "Answers, Made Clear",
  body: "Find answers about National Motors — our company, brands, vehicles, after-sales services, and the business sectors we operate in.",
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    label: "About National Motors",
    items: [
      {
        q: "What is National Motors?",
        a: "National Motors is an Egyptian company founded in 1978. The company operates across the automotive sector and several other industries, supported by a growing network of showrooms, service centers, facilities, and strategic partners.",
      },
      {
        q: "What sectors does National Motors operate in?",
        a: "National Motors operates across the automotive, after-market products, agriculture, and real estate sectors. The company also maintains investments in other fields and supports communities through its corporate social responsibility activities.",
      },
      {
        q: "What automotive brands does National Motors represent?",
        a: "The National Motors automotive portfolio includes Farizon, Joylong, and Blu Light Mobility. Each brand serves different passenger transportation, cargo transportation, electric mobility, and light-mobility requirements.",
      },
    ],
  },
  {
    label: "Automotive and Mobility",
    items: [
      {
        q: "What types of vehicles does National Motors offer in Egypt?",
        a: "National Motors offers passenger vans, cargo vans, electric commercial vehicles, golf carts, and light-mobility solutions. Available models and configurations vary according to each brand and intended application.",
      },
      {
        q: "Does National Motors offer electric commercial vehicles in Egypt?",
        a: "Yes. National Motors offers new-energy commercial vehicles through Farizon, Geely's commercial-vehicle brand specializing in new-energy mobility. Available solutions support cargo transportation, passenger transportation, and different business requirements.",
      },
      {
        q: "What is Farizon?",
        a: "Farizon is Geely's new-energy commercial-vehicle brand. National Motors partnered with Geely to introduce Farizon in Egypt and provide businesses with purpose-built electric commercial-mobility solutions.",
      },
      {
        q: "What is Joylong?",
        a: "Joylong is a commercial-vehicle brand offering passenger and cargo vans for businesses, transportation operators, institutions, and other professional applications. National Motors is Joylong's official agent in Egypt.",
      },
      {
        q: "What is Blu Light Mobility?",
        a: "Blu Light Mobility is a golf-cart and light-mobility brand owned by National Motors. Its vehicles are developed under National Motors' technical and managerial direction, manufactured in China, and assembled in Egypt at the National Motors factory.",
      },
      {
        q: "How do I choose the right commercial vehicle for my business?",
        a: "The right commercial vehicle depends on its intended use, passenger or cargo capacity, daily route, expected mileage, operating environment, preferred energy type, and budget. The National Motors sales team can help assess these requirements and recommend a suitable option.",
      },
      {
        q: "Are electric commercial vehicles suitable for business fleets in Egypt?",
        a: "Electric commercial vehicles can be suitable for Egyptian business fleets when daily mileage, routes, payload, charging access, operating schedules, and required uptime are properly assessed. Businesses should evaluate the complete operational use case before selecting an electric fleet solution.",
      },
      {
        q: "How can I book a Farizon V6E test drive?",
        a: "You can book a Farizon V6E test drive by completing the test-drive form on the National Motors website. Select the V6E, provide your contact information, and the responsible team will contact you to arrange the appointment.",
      },
      {
        q: "How can I request a vehicle quotation?",
        a: "Visit the relevant vehicle or brand page and submit the enquiry form with your contact details and preferred model. A National Motors representative will contact you with the available information and next steps.",
      },
    ],
  },
  {
    label: "After-Sales Services",
    items: [
      {
        q: "What after-sales services does National Motors provide?",
        a: "National Motors provides scheduled maintenance, vehicle inspections, technical support, spare-parts support, and other after-sales services through its service capabilities and specialized teams. Service availability may vary by brand and vehicle model.",
      },
      {
        q: "Does National Motors provide maintenance for electric vehicles?",
        a: "National Motors has developed technical capabilities to support electric-vehicle inspection, maintenance, and after-sales requirements. Contact the after-sales team to confirm the services available for your particular brand and model.",
      },
      {
        q: "How can I book a maintenance appointment?",
        a: "Visit the After-Sales section of the website and complete the service-booking form. Include your vehicle brand, model, preferred service center, contact details, and a brief description of the required service.",
      },
      {
        q: "How can I request spare parts or technical support?",
        a: "Contact the National Motors after-sales team and provide the vehicle brand, model, production year, required part or issue, and vehicle identification number when available. This information will help the team process your request more accurately.",
      },
      {
        q: "How can I find the nearest National Motors showroom or service center?",
        a: "Visit the Locations page to view National Motors showrooms and service centers, their addresses, contact information, operating hours, and available services.",
      },
    ],
  },
  {
    label: "Other Business Sectors",
    items: [
      {
        q: "What are National Motors' activities in the agriculture sector?",
        a: "National Motors owns and manages agricultural yards and works in plant trading and export. Further information and business enquiries can be submitted through the company's contact page.",
      },
      {
        q: "What are National Motors' activities in real estate?",
        a: "National Motors owns and manages properties inside and outside Egypt and maintains investments across different areas of the real-estate sector.",
      },
      {
        q: "How does National Motors contribute to corporate social responsibility?",
        a: "National Motors supports communities through its own NGO and other social initiatives designed to assist individuals and families in need and contribute positively to society.",
      },
    ],
  },
];
