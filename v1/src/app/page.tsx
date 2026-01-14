import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesOverview from "@/components/ServicesOverview";
import WhatWeOffer from "@/components/WhatWeOffer";
import BlogPreview from "@/components/BlogPreview";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesOverview />
        <WhatWeOffer />
        <BlogPreview />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
