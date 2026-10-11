/* ============================================================
   NATIONAL MOTORS — Collective automotive-network dataset
   Combines the authorized distributors, dealers, and showrooms of
   every brand (Joylong, Farizon, Blu) into ONE deduplicated list.
   Each physical location is tagged with the brands it carries and
   given an APPROXIMATE position on the stylized Egypt map (not exact
   coordinates) so all brands can be shown on a single collective map.
   Source data lives in brandsData.ts (reproduced from the approved PPTX).
   ============================================================ */

import { JOYLONG, FARIZON, BLU, type LocationEntry } from "./brandsData";

export type NetworkBrand = "Joylong" | "Farizon" | "Blu";

export type NetworkLocation = {
  name: string;
  address: string;
  region: string;
  phones?: string[];
  website?: string;
  brands: NetworkBrand[];
  mx: number; // approximate map x (%), stylized Egypt map
  my: number; // approximate map y (%)
};

export const NETWORK_BRANDS: NetworkBrand[] = ["Joylong", "Farizon", "Blu"];

// Approximate governorate anchor points on the stylized Egypt map
// (viewBox 0..100), kept consistent with the showrooms-map reference
// points. Purely visual placement — directions use the real address.
const GOV_POS: Record<string, { mx: number; my: number }> = {
  Alexandria: { mx: 45, my: 8.2 },
  "Kafr El Sheikh": { mx: 50, my: 9.5 },
  Qalyubia: { mx: 56.8, my: 15.3 },
  Sharqia: { mx: 61.5, my: 13.8 },
  Cairo: { mx: 55.7, my: 18.7 },
  Giza: { mx: 53.8, my: 20.8 },
  "Beni Suef": { mx: 55, my: 29 },
  Minya: { mx: 56, my: 37 },
  Asyut: { mx: 55.4, my: 45.9 },
  Sohag: { mx: 59, my: 51.9 },
  Qena: { mx: 66.9, my: 55.6 },
};
const FALLBACK = { mx: 55, my: 31 };

const SOURCES: { brand: NetworkBrand; entries: LocationEntry[] }[] = [
  { brand: "Joylong", entries: JOYLONG.locations.entries },
  { brand: "Farizon", entries: FARIZON.locations.entries },
  { brand: "Blu", entries: BLU.locations.entries },
];

const keyOf = (e: LocationEntry) =>
  `${e.name}|${e.address}`.toLowerCase().replace(/\s+/g, " ").trim();

function build(): NetworkLocation[] {
  // 1. Merge entries into one list, keyed by physical location.
  const map = new Map<string, NetworkLocation>();
  for (const { brand, entries } of SOURCES) {
    for (const e of entries) {
      const existing = map.get(keyOf(e));
      if (existing) {
        if (!existing.brands.includes(brand)) existing.brands.push(brand);
        continue;
      }
      map.set(keyOf(e), {
        name: e.name,
        address: e.address,
        region: e.region,
        phones: e.phones,
        website: e.website,
        brands: [brand],
        mx: 0,
        my: 0,
      });
    }
  }

  const list = [...map.values()];

  // 2. Spread locations that share a governorate so markers don't overlap.
  const byRegion = new Map<string, NetworkLocation[]>();
  for (const loc of list) {
    const arr = byRegion.get(loc.region) ?? [];
    arr.push(loc);
    byRegion.set(loc.region, arr);
  }
  for (const arr of byRegion.values()) {
    const base = GOV_POS[arr[0].region] ?? FALLBACK;
    if (arr.length === 1) {
      arr[0].mx = base.mx;
      arr[0].my = base.my;
      continue;
    }
    arr.forEach((loc, i) => {
      const angle = (i / arr.length) * Math.PI * 2;
      const radius = 2.1 + (i % 2) * 1.2;
      loc.mx = +(base.mx + Math.cos(angle) * radius).toFixed(2);
      loc.my = +(base.my + Math.sin(angle) * radius * 0.9).toFixed(2);
    });
  }

  return list;
}

export const NETWORK_LOCATIONS: NetworkLocation[] = build();

export const NETWORK_COUNT = NETWORK_LOCATIONS.length;
