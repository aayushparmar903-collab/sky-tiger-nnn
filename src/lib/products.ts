export interface Product {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  /** official platform site */
  url: string;
  logo: { src: string; width: number; height: number; alt: string };
  /** tailwind size classes for the logo box — tuned per logo shape so all
      logos carry the same visual weight on the cards */
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
    url: "https://skyexch247.io/",
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
  {
    id: "1xbetfair",
    name: "1XBETFAIR",
    tagline: "Winning Starts Here",
    desc: "Global exchange & sportsbook in one — deep markets, sharp odds and nonstop live action.",
    url: "https://1xbetfair.me/",
    logo: { src: "/brands/1xbetfair.png", width: 1200, height: 382, alt: "1XBETFAIR logo" },
    logoBox: "h-12 w-40 sm:h-14 sm:w-48",
    accent: "#26a9e0",
    accent2: "#7cc4ff",
    features: ["Exchange + sportsbook in one", "Live cricket & football markets", "Instant UPI deposits"],
  },
  {
    id: "laser247",
    name: "LASER247",
    tagline: "Speed Wins. Every Time.",
    desc: "Lightning-fast IDs and rapid-fire odds across cricket, tennis and the full casino floor.",
    url: "https://laser247.global/",
    logo: { src: "/brands/laser247.png", width: 654, height: 190, alt: "LASER247 logo" },
    logoBox: "h-11 w-40 sm:h-13 sm:w-48",
    accent: "#ff3b47",
    accent2: "#ffb03a",
    features: ["Instant ID activation", "Live in-play markets", "5-minute withdrawals"],
  },
  {
    id: "radheexch",
    name: "RADHEEXCH",
    tagline: "The Exchange You Trust",
    desc: "A smooth exchange experience — back & lay, round-the-clock live markets and quick payouts.",
    url: "https://radheexch.online/",
    logo: { src: "/brands/radheexch.png", width: 262, height: 85, alt: "RADHEEXCH logo" },
    logoBox: "h-12 w-40 sm:h-14 sm:w-48",
    accent: "#2dd4bf",
    accent2: "#38bdf8",
    features: ["Back & lay exchange", "24×7 live markets", "Fast, secure payouts"],
  },
];
