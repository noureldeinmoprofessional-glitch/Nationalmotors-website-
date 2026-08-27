/* ============================================================
   NATIONAL MOTORS — Individual brand-page content
   SOURCE OF TRUTH: "National Motors Website Content.pptx"
   Brand copy: slides 22–24, 26, 29, 30. Location datasets: slides
   27–31. All copy and every location entry below is reproduced
   verbatim from the approved PPTX. Do not paraphrase, shorten, or
   invent names, addresses, phones, emails, or websites.
   ============================================================ */

export type LocationEntry = {
  name: string;
  address: string;
  region: string; // governorate/city derived from the address, for filtering only
  phones?: string[];
  email?: string;
  website?: string;
  type?: string;
};

export type BrandPageData = {
  slug: string;
  name: string; // brand name as shown
  hero: {
    tagline?: string; // approved brand tagline (only where the PPTX provides one)
    descriptor: string; // short factual positioning
    image: string;
    imageAlt: string;
    imagePosition: string;
  };
  intro: {
    eyebrow: string;
    headline: string; // approved brand-story headline
    body: string; // approved brands-page description
  };
  externalWebsite: {
    label: string; // exact approved CTA wording
    url: string;
    display: string;
  };
  locations: {
    sectionTitle: string; // exact approved terminology (differs per brand)
    sectionDescription: string;
    entries: LocationEntry[];
  };
};

const NM_SHOWROOMS: LocationEntry[] = [
  {
    name: "National Motors",
    address: "42 El Tayaran St, Nasr City, Cairo, Cairo, 4450131",
    region: "Cairo",
    phones: ["16302"],
    email: "info@nationalmotorsco.com",
    website: "https://www.nationalmotorsco.com/",
    type: "Showroom",
  },
  {
    name: "National Motors",
    address: "35 Gameat Al Dewal Al Arabeya St, Agouza, Giza, Giza, 3752240",
    region: "Giza",
    phones: ["16302"],
    email: "info@nationalmotorsco.com",
    website: "https://www.nationalmotorsco.com/",
    type: "Showroom",
  },
  {
    name: "National Motors",
    address: "4 Mostafa Kamal St, French Buildings, El Seyouf, Alexandria, Alexandria, 5515150",
    region: "Alexandria",
    phones: ["16302"],
    email: "info@nationalmotorsco.com",
    website: "https://www.nationalmotorsco.com/",
    type: "Showroom",
  },
];

export const JOYLONG: BrandPageData = {
  slug: "joylong",
  name: "Joylong",
  hero: {
    descriptor: "Commercial Vehicles",
    image: "/images/brands/joylong.png",
    imageAlt: "A Joylong commercial minibus by National Motors on an Egyptian road",
    imagePosition: "50% 45%",
  },
  intro: {
    eyebrow: "Joylong",
    headline: "A Partnership Beyond Representation",
    body: "Joylong offers a wide range of commercial vehicles, including passenger minibuses, cargo vans, and transport solutions engineered for reliability, efficiency, and everyday performance. Every model is designed to support businesses with practical features, durability, and exceptional value.",
  },
  externalWebsite: {
    label: "Explore Joylong Website",
    url: "https://www.joylongeg.com",
    display: "www.joylongeg.com",
  },
  locations: {
    sectionTitle: "Our Authorized Distributors & Dealers",
    sectionDescription: "Explore Joylong's trusted network of authorized distributors below",
    entries: [
      {
        name: "Modern Auto Trading (El Sheshtawy)",
        address: "Cairo–Alexandria Agricultural Road, After Sandanhour Tunnel, Benha",
        region: "Qalyubia",
      },
      {
        name: "Auto El Shimi",
        address: "6 El Swissry St., Shinzo Abe Axis",
        region: "Cairo",
        phones: ["+20 105 047 0470"],
      },
      {
        name: "El Shimi Auto Showroom",
        address: "Assiut–Sohag Road, Opposite the Lawyers Syndicate, Sohag",
        region: "Sohag",
        phones: ["+20 128 888 4373"],
      },
      {
        name: "El Kafrawy Auto Trading, Import & Export",
        address: "Abdel Aziz Ayad St., Cooperative Housing Area, Zagazig, Sharqia",
        region: "Sharqia",
        phones: ["17326"],
      },
      {
        name: "Egyptian International Auto Trading",
        address: "Saqqara Touristic Road, Shabramant, Opposite Shabramant Central Hospital",
        region: "Giza",
        phones: ["+20 128 888 2769"],
      },
      {
        name: "Auto El Serag",
        address: "In Front of Nile Bridge, Beside Raneen, Beni Suef",
        region: "Beni Suef",
        phones: ["+20 128 111 7948"],
      },
      {
        name: "El Sheikh Auto Trading & Import – Ali Ahmed Ali Afifi",
        address: "Cairo–Alexandria Agricultural Road, Km 30, Toukh, Qalyubia",
        region: "Qalyubia",
        phones: ["+20 100 012 2679"],
      },
      {
        name: "El Sheikh Auto Trading & Import – Ali Ahmed Ali Afifi",
        address: "Ring Road, El Qalaj Exit, El Marg, Cairo",
        region: "Cairo",
        phones: ["+20 100 012 2679"],
      },
      {
        name: "El Sheikh Auto Trading & Import – Ali Ahmed Ali Afifi",
        address: "Hasaballah El Kafrawy Axis, Maadi, Cairo",
        region: "Cairo",
        phones: ["+20 100 012 2679"],
      },
      {
        name: "Auto Body Cars – Amr Mahmoud Mohamed",
        address: "38 El Mariouteya St., Faisal, Giza",
        region: "Giza",
        phones: ["+20 128 125 3023", "+20 128 125 3025"],
      },
      {
        name: "Al Omaraa Auto Trading & Distribution",
        address: "El Labeny St., Beside Hadayek Al Ahram Traffic Unit, Giza",
        region: "Giza",
        phones: ["+20 100 150 6626"],
      },
      {
        name: "Al Omaraa Auto Trading & Distribution",
        address: "El Mariouteya, Haram, Opposite El Magzar Al Aaly Bridge",
        region: "Giza",
        phones: ["+20 100 150 6626"],
      },
      {
        name: "El Saad Auto Trading & Import – Hamdy El Sayed Saad",
        address: "Metboul, Kafr El Sheikh",
        region: "Kafr El Sheikh",
        phones: ["+20 100 798 5888"],
      },
      {
        name: "El Nadeem Tires & Auto Trading",
        address: "Sandafa, Beni Mazar, Minya",
        region: "Minya",
        phones: ["+20 120 055 3300"],
      },
      {
        name: "AS Motors",
        address: "Mohsen Opening, Beside Mandour Pharmacy, El Awayed, Alexandria",
        region: "Alexandria",
        phones: ["+20 120 001 2122", "+20 105 002 8115"],
      },
    ],
  },
};

export const FARIZON: BrandPageData = {
  slug: "farizon",
  name: "Farizon",
  hero: {
    tagline: "Driving the future of electric mobility.",
    descriptor: "Electric Commercial Vehicles",
    image: "/images/brands/farizon-v6e.jpg",
    imageAlt: "The Farizon V6E born-electric commercial van in a modern city",
    imagePosition: "50% 55%",
  },
  intro: {
    eyebrow: "Farizon",
    headline: "From Entering a Market to Creating a Category",
    body: "Farizon delivers intelligent electric commercial vehicles that combine sustainability with advanced technology. Designed for modern logistics and urban transportation, Farizon helps businesses reduce operating costs while supporting a cleaner future.",
  },
  externalWebsite: {
    label: "Discover Farizon Website",
    url: "https://www.global.geelycv.com",
    display: "www.global.geelycv.com",
  },
  locations: {
    sectionTitle: "Our Showrooms",
    sectionDescription: "Explore Farizon's showrooms below",
    entries: NM_SHOWROOMS,
  },
};

export const BLU: BrandPageData = {
  slug: "blu-light-mobility",
  name: "Blu Light Mobility",
  hero: {
    tagline: "Smart mobility for every journey.",
    descriptor: "Electric Light Mobility",
    image: "/images/brands/blu-light-mobility.png",
    imageAlt: "A Blu Light Mobility electric golf cart at a resort at golden hour",
    imagePosition: "50% 42%",
  },
  intro: {
    eyebrow: "Blu Light Mobility",
    headline: "A Product Built by Listening",
    body: "Blu offers a premium range of innovative electric golf carts, engineered to deliver efficient, comfortable, and sustainable mobility. Designed for resorts, hotels, gated communities, universities, and recreational destinations, Blu vehicles combine modern technology, exceptional reliability, and refined performance to ensure a seamless transportation experience for every journey.",
  },
  externalWebsite: {
    label: "Explore Blu Website",
    url: "https://www.blulightmobility.com",
    display: "www.blulightmobility.com",
  },
  locations: {
    sectionTitle: "Our Authorized Distributors & Dealers",
    sectionDescription: "Explore BLU's trusted network of authorized distributors below",
    entries: [
      ...NM_SHOWROOMS,
      {
        name: "AL Mohandes Automotive",
        address: "Arkan Mall, Cairo, Sheikh Zayed, 5043",
        region: "Giza",
        phones: ["01222170606"],
        email: "info@almohandes-automotive.com",
        website: "http://almohandes-automotive.com/",
        type: "Distributor",
      },
      {
        name: "Boozer Cruiser",
        address: "Mobile Golden Square, Mountain View, New Cairo, Cairo, Fifth Settlement, 4743027",
        region: "Cairo",
        phones: ["01000672279"],
        email: "amboozer2023@gmail.com",
        website: "https://agilestorelocator.com/",
        type: "Distributor",
      },
      {
        name: "MCS",
        address: "Gamal Abd El-Nasir, First 6th of October, Cairo, Sheikh Zayed, 5043",
        region: "Giza",
        phones: ["01064949494"],
        email: "info@mcsmotorcycles.com",
        website: "https://www.mcsmotorcycles.com/lander",
        type: "Distributor",
      },
      {
        name: "Trendy Wheels",
        address: "360 Mall, Palm Hills, 6th of October City",
        region: "Giza",
        phones: ["01599999577"],
        email: "info@trendywheelseg.com",
        website: "https://trendywheelseg.com/en",
        type: "Distributor",
      },
    ],
  },
};

export const BRAND_PAGES: Record<string, BrandPageData> = {
  joylong: JOYLONG,
  farizon: FARIZON,
  "blu-light-mobility": BLU,
};
