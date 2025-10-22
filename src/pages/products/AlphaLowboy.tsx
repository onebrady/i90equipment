import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const AlphaLowboy = () => {
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
    "80,000 lb (40-ton) payload capacity",
    "Mechanical gooseneck design",
    "Double drop / lowboy configuration",
    "Air-assisted gooseneck support arm",
    '12" crossmember spacing for strength',
    "Two-position neck connector plate",
    "Full-length chain drops for secure loading",
    "Premium Apitong decking",
    "T1 steel construction for maximum strength",
    "Air ride suspension",
    "LED lighting system",
    "Low deck height for oversized loads",
  ];

  const specs = [
    { label: "Year", value: "2023" },
    { label: "Manufacturer", value: "ALPHA HD" },
    { label: "Model", value: "A80MG Lowboy" },
    { label: "Trailer Type", value: "Double Drop / Lowboy" },
    { label: "Length", value: "48 feet" },
    { label: "Construction", value: "T1 Steel" },
    { label: "Capacity", value: "80,000 lbs (40 Ton)" },
    { label: "Axles", value: "Tandem" },
    { label: "Suspension", value: "Air Ride" },
    { label: "Rims", value: "Steel" },
    { label: "Decking", value: "Apitong wood" },
    { label: "Price", value: "$75,900.00" },
    { label: "FET Tax", value: "12% included in price" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-secondary">Home</Link>
              {" > "}
              <Link to="/inventory" className="hover:text-secondary">Inventory</Link>
              {" > "}
              <span className="text-foreground">2023 ALPHA HD A80MG LOWBOY TRAILER</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <img 
                  src="https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/677ea4a0575271521d67582a_2022-Alpha-HD-A80MG-Lowboy-Trailer-2.webp"
                  alt="2023 ALPHA HD A80MG LOWBOY TRAILER"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>

              <div>
                <Badge className="mb-4">Used - Excellent</Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  2023 ALPHA HD A80MG LOWBOY TRAILER
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  80-Ton Capacity Double Drop Lowboy for Heavy Equipment Transport
                </p>
                <div className="text-4xl font-bold text-primary mb-6">$75,900</div>
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

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">Description</h2>
            <div className="prose max-w-none text-muted-foreground leading-relaxed">
              <p>
                The 2023 Alpha HD A80MG Lowboy Trailer represents premium heavy equipment transport technology. Alpha HD combines over 75 years of combined engineering experience to create durable, specialized semi-trailers. The lowboy (double drop) design features two drops in deck height, creating an exceptionally low deck profile - crucial for transporting tall, heavy equipment that would exceed height restrictions on standard flatbeds. Perfect for excavators, bulldozers, cranes, industrial machinery, mining equipment, and construction equipment. The mechanical gooseneck features an air-assisted support arm and two-position neck connector plate. T1 steel construction provides maximum strength, while 12-inch crossmember spacing ensures exceptional load distribution. Premium Apitong wood decking offers incredible hardness and resistance to wear. This 2023 model is in excellent condition with minimal wear.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Interested in This Equipment?</h2>
            <Card>
              <CardContent className="p-8">
                <div style={{ width: "100%", minHeight: "546px" }}>
                  <iframe
                    src="https://links.resultreach.com/widget/form/9fY8ydtCiOWoUKgu7aXm"
                    style={{ width: "100%", height: "546px", border: "none", borderRadius: "3px" }}
                    id="inline-product-form-3"
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

export default AlphaLowboy;
