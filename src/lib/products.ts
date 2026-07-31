export interface Product {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  /** official platform site */
  url: string;
  logo: { src: string; width: number; height: number; alt: string };
  /** tailwind size classes for the logo box — tuned per logo shape so all
      three carry the same visual weight on the cards */
  logoBox: string;
  /** brand accent colors, applied via CSS vars on the card */
  accent: string;
  accent2: string;
  features: string[];
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "sky247",
    name: "SKY247",
    tagline: "Where the Sky Is Never the Limit",
    desc: "The flagship sportsbook — 100+ sports, live cricket markets and a full casino floor.",
    url: "https://sky247.io/",
    logo: { src: "/brands/sky247.png", width: 843, height: 419, alt: "SKY247 logo" },
    logoBox: "h-16 w-36 sm:h-20 sm:w-44",
    accent: "#ffd54a",
    accent2: "#00d4ff",
    features: ["100+ sports & live markets", "5,000+ casino games", "5-minute withdrawals"],
    badge: "Most Popular",
  },
  {
    id: "reddy247",
    name: "REDDY247",
    tagline: "Always Ready. Always Reddy.",
    desc: "Built for speed — instant IDs, rapid-fire odds and round-the-clock action.",
    url: "https://reddy247.global/",
    logo: { src: "/brands/reddy247.png", width: 898, height: 202, alt: "REDDY247 logo" },
    logoBox: "h-10 w-44 sm:h-12 sm:w-52",
    accent: "#ff7a18",
    accent2: "#ffd54a",
    features: ["Instant ID activation", "Live cricket & tennis", "UPI deposits in seconds"],
  },
  {
    id: "tigerexch",
    name: "TIGEREXCH",
    tagline: "Unleash the Exchange",
    desc: "A true betting exchange — back & lay with sharp odds and deep liquidity.",
    url: "https://tigerexchange247.co/",
    logo: { src: "/brands/tigerexch.png", width: 1223, height: 196, alt: "TIGEREXCH logo" },
    logoBox: "h-9 w-52 sm:h-11 sm:w-64",
    accent: "#2f7fe0",
    accent2: "#ff7a18",
    features: ["Back & lay exchange", "Sharpest market odds", "Pro-grade live trading"],
  },
];
