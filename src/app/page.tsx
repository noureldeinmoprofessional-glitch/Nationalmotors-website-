import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import LegacySection from "@/components/sections/LegacySection";
import AfterSalesSection from "@/components/sections/AfterSalesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import Footer from "@/components/layout/Footer";
import { CONTACT } from "@/lib/site";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "National Motors",
  url: "https://www.nationalmotorsco.com",
  logo: "https://www.nationalmotorsco.com/logos/nm-logo-white.svg",
  foundingDate: "1978",
  email: CONTACT.email,
  telephone: CONTACT.hotline,
  areaServed: "EG",
  description:
    "An Egyptian automotive and diversified business group founded in 1978, representing Joylong, Farizon and Blu Light Mobility across automotive, tyres, agriculture and real estate.",
  sameAs: [
    CONTACT.socials.facebook,
    CONTACT.socials.instagram,
    CONTACT.socials.linkedin,
    CONTACT.socials.tiktok,
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <LegacySection />
        <AfterSalesSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
