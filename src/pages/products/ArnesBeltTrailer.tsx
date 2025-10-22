import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const ArnesBeltTrailer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement('script');
    script.src = 'https://links.resultreach.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const features = [
    "Belt conveyor system for continuous material transport",
    "Hydraulic system for smooth operation",
    "Heavy-duty construction for durability",
    "Ideal for aggregate and construction material hauling",
    "Low maintenance requirements",
    "Excellent condition with minimal wear",
  ];

  const specs = [
    { label: "Year", value: "2021" },
    { label: "Manufacturer", value: "ARNES" },
    { label: "Model", value: "Trout River Belt Trailer" },
    { label: "Type", value: "Belt Conveyor Trailer" },
    { label: "Condition", value: "Used - Excellent" },
    { label: "Price", value: "$59,900.00" },
    { label: "FET Tax", value: "12% included in price" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-secondary">Home</Link>
              {" > "}
              <Link to="/inventory" className="hover:text-secondary">Inventory</Link>
              {" > "}
              <span className="text-foreground">USED 2021 ARNES TROUT RIVER BELT TRAILER</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <img 
                  src="https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/685ed8abe452d81d030ad42b_494577123_705101529147592_4232795056119674189_n.jpg"
                  alt="USED 2021 ARNES TROUT RIVER BELT TRAILER"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>

              <div>
                <Badge className="mb-4">Used - Excellent</Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  USED 2021 ARNES TROUT RIVER BELT TRAILER
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Specialized Belt Conveyor System for Efficient Material Transport
                </p>
                <div className="text-4xl font-bold text-primary mb-6">$59,900</div>
                <p className="text-muted-foreground mb-6">1 Unit Available</p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                    <a href="tel:+14069392153">Call Now: (406) 939-2153</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">Request Info</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Specifications</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {specs.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b border-border pb-3">
                      <span className="font-semibold text-foreground">{spec.label}:</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">Description</h2>
            <div className="prose max-w-none text-muted-foreground leading-relaxed">
              <p>
                The 2021 ARNES Trout River Belt Trailer represents specialized technology in material transport. This belt conveyor trailer is designed for efficient, continuous movement of aggregates, construction materials, and bulk goods. The Trout River system features a robust belt conveyor mechanism that allows for quick loading and unloading without manual labor. Perfect for contractors, aggregate suppliers, and construction companies handling sand, gravel, crushed stone, and other bulk materials. At I90 Equipment, we understand that reliable equipment keeps your business moving forward.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Interested in This Equipment?</h2>
            <Card>
              <CardContent className="p-8">
                <div style={{ width: "100%", minHeight: "546px" }}>
                  <iframe
                    src="https://links.resultreach.com/widget/form/9fY8ydtCiOWoUKgu7aXm"
                    style={{ width: "100%", height: "546px", border: "none", borderRadius: "3px" }}
                    id="inline-product-form-1"
                    data-layout='{"id":"INLINE"}'
                    data-trigger-type="alwaysShow"
                    data-form-name="Contact Form"
                    data-height="546"
                    data-form-id="9fY8ydtCiOWoUKgu7aXm"
                    title="Contact Form"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArnesBeltTrailer;
