import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AfterSalesHero from "@/components/aftersales/AfterSalesHero";
import ServicesGrid from "@/components/aftersales/ServicesGrid";
import SparePartsWarranty from "@/components/aftersales/SparePartsWarranty";
import AppointmentProvider from "@/components/aftersales/AppointmentProvider";
import BrandLocations from "@/components/brands/BrandLocations";
import { SERVICE_CENTERS } from "@/lib/afterSalesData";

export const metadata: Metadata = {
  title: "After-Sales Support",
  description:
    "National Motors after-sales support — body repair & paint, free Joylong parts delivery, DFSK spare parts, and DFSK maintenance. Book an appointment and find your nearest service center.",
  alternates: { canonical: "/after-sales" },
  openGraph: {
    title: "After-Sales Support | National Motors",
    description: "Support That Keeps You Moving.",
    url: "/after-sales",
    images: [{ url: "/images/service/maintenance.png", width: 1920, height: 1080, alt: "National Motors after-sales support" }],
  },
};

export default function AfterSalesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <AppointmentProvider>
          <AfterSalesHero />
          <ServicesGrid />
          <SparePartsWarranty />
          <BrandLocations
            sectionTitle={SERVICE_CENTERS.eyebrow}
            sectionDescription={SERVICE_CENTERS.description}
            entries={SERVICE_CENTERS.entries}
            searchable={false}
          />
        </AppointmentProvider>
      </main>
      <Footer />
    </>
  );
}
