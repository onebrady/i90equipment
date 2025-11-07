import Hero from "@/components/Hero";
import About from "@/components/About";
import Inventory from "@/components/Inventory";
import WhyChoose from "@/components/WhyChoose";
import Financing from "@/components/Financing";
import ServiceArea from "@/components/ServiceArea";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Inventory />
      <WhyChoose />
      <Financing />
      <ServiceArea />
      <CTA />
    </div>
  );
}
