import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Sora, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onexall.vip"),
  title: "ONEXALL.VIP — Premium Gaming IDs | SKY247 · REDDY247 · TIGEREXCH",
  description:
    "ONEXALL.VIP — India's premium gaming ID provider. Get your SKY247, REDDY247 or TIGEREXCH ID from just ₹300. Instant UPI deposits, 60-second withdrawals, 24/7 support.",
  keywords: ["onexall", "onexall.vip", "sky247 id", "reddy247 id", "tigerexch id", "gaming id", "cricket id"],
  openGraph: {
    siteName: "ONEXALL.VIP",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#020203",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${sora.variable} ${inter.variable}`}>
      <body className="font-body bg-[var(--color-void)] text-white">{children}</body>
    </html>
  );
}
