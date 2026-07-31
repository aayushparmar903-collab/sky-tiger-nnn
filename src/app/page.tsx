import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Bonuses from "@/components/Bonuses";
import Products from "@/components/Products";
import WhyUs from "@/components/WhyUs";
import Payments from "@/components/Payments";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ParallaxFX from "@/components/ParallaxFX";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative">
      <div className="vignette" />
      <Navbar />
      <Hero />
      <Ticker />
      <Products />
      <Bonuses />
      <WhyUs />
      <Payments />
      <Footer />
      <WhatsAppFloat />
      <Reveal />
      <ParallaxFX />
    </main>
  );
}
