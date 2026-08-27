import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LocationHero, LocationExplorer, LocationContact } from "@/components/locations/Locations";
import { SHOWROOMS } from "@/lib/locationsData";

export const metadata: Metadata = {
  title: "Showrooms",
  description:
    "National Motors showroom locations across Egypt — Cairo, Giza, Alexandria, Asyut, Qena and Sohag. Find your nearest showroom and get directions.",
  alternates: { canonical: "/locations/showrooms" },
  openGraph: {
    title: "Showrooms | National Motors",
    description: "Explore National Motors showroom locations across Egypt.",
    url: "/locations/showrooms",
    images: [{ url: SHOWROOMS.hero.image, width: 1920, height: 1080, alt: "National Motors showrooms" }],
  },
};

export default function ShowroomsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <LocationHero data={SHOWROOMS.hero} />
        <LocationExplorer
          locations={SHOWROOMS.locations}
          sectionTitle={SHOWROOMS.sectionTitle}
          sectionDescription={SHOWROOMS.sectionDescription}
          idBase="showrooms"
        />
        <LocationContact />
      </main>
      <Footer />
    </>
  );
}
