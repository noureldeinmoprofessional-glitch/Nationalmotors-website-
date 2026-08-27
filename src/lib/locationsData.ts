/* ============================================================
   NATIONAL MOTORS — Locations content
   SOURCE OF TRUTH: "National Motors Website Content.pptx"
   Showrooms: slide 6. Service centers: slide 36. Names and addresses
   are reproduced verbatim; no phones/hours/services are added because
   the source does not supply them per location. Map positions (mx/my)
   are APPROXIMATE city placements on a stylized Egypt map — not exact
   coordinates — used only as a visual/architectural marker.
   ============================================================ */

export type NMLocation = {
  name: string;
  address?: string;
  mx: number; // approximate map x (%), stylized Egypt map
  my: number; // approximate map y (%)
  comingSoon?: boolean;
};

export const SHOWROOMS: {
  hero: { eyebrow: string; headlineLines: string[]; body: string; image: string; imageAlt: string };
  sectionTitle: string;
  sectionDescription: string;
  locations: NMLocation[];
} = {
  hero: {
    eyebrow: "Showrooms",
    headlineLines: ["Our", "Showrooms"],
    body: "Explore National Motors showroom locations across Egypt and find the one nearest you.",
    image: "/images/hero/joylong-a4-high-roof.png",
    imageAlt: "A National Motors commercial vehicle at a contemporary showroom entrance",
  },
  sectionTitle: "Showroom Locations",
  sectionDescription: "Select a location to view it on the map and get directions.",
  locations: [
    { name: "Cairo", address: "42 El Tayaran St., Nasr City", mx: 55.7, my: 18.7 },
    { name: "Giza", address: "35 Gama'at Al Dowal St.", mx: 54.4, my: 20.4 },
    { name: "Alexandria", address: "4 Mostafa Kamel Street", mx: 45, my: 8.2 },
    { name: "Asyut", address: "4 El Thawra St., Nile Corniche", mx: 55.4, my: 45.9 },
    { name: "Qena", address: "Qena Entrance, Cairo-Aswan Road", mx: 66.9, my: 55.6 },
    { name: "Sohag", address: "Al Tahrir Tower 4, 320 Ring Road, Akhmeem", mx: 59, my: 51.9 },
    { name: "New Cairo", comingSoon: true, mx: 57.5, my: 19.6 },
  ],
};

export const SERVICE_CENTERS: {
  hero: { eyebrow: string; headlineLines: string[]; body: string; image: string; imageAlt: string };
  sectionTitle: string;
  sectionDescription: string;
  locations: NMLocation[];
} = {
  hero: {
    eyebrow: "Service Centers",
    headlineLines: ["Our Service", "Centers"],
    body: "Find your nearest National Motors service center and book professional maintenance and repair.",
    image: "/images/service/body-repair-paint.png",
    imageAlt: "A National Motors service and repair environment",
  },
  sectionTitle: "Service Center Locations",
  sectionDescription: "Select a location to view it on the map and get directions.",
  locations: [
    { name: "Cairo / Giza", address: "6th of October, Third Industrial Zone, Service Axis, First Plot No. 50", mx: 52.5, my: 20.5 },
    { name: "Alexandria", address: "4 Mostafa Kamel Street", mx: 45, my: 8.2 },
    { name: "Qena", address: "Qena Entrance, Cairo-Aswan Road", mx: 66.9, my: 55.6 },
  ],
};
