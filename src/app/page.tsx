import Navbar from "@/components/layout/Navbar";
import ParticleField from "@/components/hero/ParticleField";
import HeroHome from "@/components/hero/HeroHome";
import SectorsScroll from "@/components/sections/SectorsScroll";
import LegacySection from "@/components/sections/LegacySection";
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
    "An Egyptian automotive and diversified business group founded in 1978, representing Joylong, Farizon and Blu across automotive, agriculture, real estate and CSR.",
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
      <ParticleField className="nm-particles-global" />
      <Navbar />
      <main id="main">
        <HeroHome />
        <SectorsScroll />
        <LegacySection />
      </main>
      <Footer />
    </>
  );
}
