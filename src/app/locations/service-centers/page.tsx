import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceCentersView from "@/components/locations/ServiceCentersView";
import { SERVICE_CENTERS } from "@/lib/locationsData";

export const metadata: Metadata = {
  title: "Service Centers",
  description:
    "National Motors service center locations in Egypt — Cairo / Giza, Alexandria and Qena. Find your nearest service center, get directions, and book a service.",
  alternates: { canonical: "/locations/service-centers" },
  openGraph: {
    title: "Service Centers | National Motors",
    description: "Find your nearest National Motors service center.",
    url: "/locations/service-centers",
    images: [{ url: SERVICE_CENTERS.hero.image, width: 1920, height: 1080, alt: "National Motors service centers" }],
  },
};

export default function ServiceCentersPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <ServiceCentersView />
      </main>
      <Footer />
    </>
  );
}
