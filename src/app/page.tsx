import Hero from "@/components/home/Hero";
import MarketplaceLogos from "@/components/home/MarketplaceLogos";
// import SearchPreview from "@/components/home/SearchPreview";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowitWorks";
import HomeListings from "@/components/home/HomeListings";
import CTA from "@/components/home/CTA";



export default function HomePage() {
  return (
    <>
      <Hero />
    
      <MarketplaceLogos />
      {/* <SearchPreview /> */}
      <Features />
      <HowItWorks />
      {/* <HomeListings /> */}
      {/* <CTA /> */}
    </>
  );
}