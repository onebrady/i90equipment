import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Inventory from "@/components/Inventory";
import WhyChoose from "@/components/WhyChoose";
import Financing from "@/components/Financing";
import ServiceArea from "@/components/ServiceArea";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Inventory />
      <WhyChoose />
      <Financing />
      <ServiceArea />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
