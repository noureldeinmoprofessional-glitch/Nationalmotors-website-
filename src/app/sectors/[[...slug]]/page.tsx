import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectorsExperience from "@/components/sectors/SectorsExperience";
import { SECTORS, type SectorId } from "@/lib/sectorsContent";

const IDS = SECTORS.map((s) => s.id) as SectorId[];

/** Pre-render the overview and each sector's deep link. */
export function generateStaticParams() {
  return [{ slug: undefined }, ...IDS.map((id) => ({ slug: [id] }))];
}

function resolveSector(slug?: string[]): SectorId | null {
  if (!slug || slug.length === 0) return null;
  if (slug.length > 1) return "invalid" as SectorId; // too deep → 404
  return (IDS.includes(slug[0] as SectorId) ? slug[0] : "invalid") as SectorId;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const id = resolveSector(slug);
  const sector = SECTORS.find((s) => s.id === id);

  if (sector) {
    return {
      title: `${sector.name} — Sectors`,
      description: sector.headline,
      alternates: { canonical: `/sectors/${sector.id}` },
      openGraph: {
        title: `${sector.name} | National Motors`,
        description: sector.headline,
        url: `/sectors/${sector.id}`,
      },
    };
  }

  return {
    title: "Our Sectors",
    description:
      "National Motors across four sectors — Automotive, Agriculture, Real Estate and CSR — as one connected experience.",
    alternates: { canonical: "/sectors" },
    openGraph: {
      title: "Our Sectors | National Motors",
      url: "/sectors",
      images: [{ url: "/images/hero/joylong-a4-high-roof.png", width: 1920, height: 1080, alt: "National Motors" }],
    },
  };
}

export default async function SectorsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const id = resolveSector(slug);
  if (slug && slug.length > 0 && !IDS.includes(id as SectorId)) notFound();

  return (
    <>
      <Navbar />
      <main id="main">
        <SectorsExperience initialSector={id} />
      </main>
      <Footer />
    </>
  );
}
