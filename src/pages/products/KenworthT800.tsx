import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const KenworthT800 = () => {
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
    "Low miles - only 77,000",
    "18-speed transmission with 2200 ft-lbs torque",
    "410 rear end gears for heavy hauling",
    "20,000 lb front axle capacity",
    "20,000 lb pusher/tag lift axle",
    "46,000 lb drive axles",
    '296" wheelbase for stability',
    "Factory wet kit installed",
    "Double frame construction for durability",
    "Purpose-built for heavy haul operations",
    "Excellent condition",
  ];

  const specs = [
    { label: "Year", value: "2024" },
    { label: "Make", value: "Kenworth" },
    { label: "Model", value: "T800" },
    { label: "Miles", value: "77,000" },
    { label: "Engine", value: "18 speed (2200 Torque)" },
    { label: "Gears", value: "410 gears" },
    { label: "Front Axle", value: "20k" },
    { label: "Lift Axle", value: "20k" },
    { label: "Drive Axles", value: "46k Drivers" },
    { label: "Wheelbase", value: '296"' },
    { label: "Features", value: "Wet Kit, Double Frame" },
    { label: "Price", value: "$239,000.00" },
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
              <span className="text-foreground">USED 2024 KENWORTH T800</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <img 
                  src="https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/685ecb6163a1cfc7e79738c2_1000010062.jpg"
                  alt="USED 2024 KENWORTH T800"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>

              <div>
                <Badge className="mb-4">Used - Excellent</Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  USED 2024 KENWORTH T800 HEAVY HAUL TRUCK
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Purpose-Built Heavy Haul Tractor with Low Miles
                </p>
                <div className="text-4xl font-bold text-primary mb-6">$239,000</div>
                <p className="text-muted-foreground mb-6">1 Unit Available • Only 77,000 miles</p>
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
                This 2024 Kenworth T800 is purpose-built for serious heavy haul operations. With only 77,000 miles, this truck is barely broken in and ready to provide years of reliable service. The Kenworth T800 is legendary in the heavy haul industry for its durability, power, and reliability. The 18-speed transmission with 2200 ft-lbs of torque provides the pulling power needed for heavy trailers and oversized loads. The 410 rear-end gears are specifically chosen for heavy haul applications, providing maximum pulling power. The double frame construction and robust axle configuration (20k front, 20k lift, 46k drive) mean this truck can handle the most demanding loads. The factory-installed wet kit powers hydraulic functions on trailers like lowboys and dump trailers. The 296" wheelbase provides excellent stability when pulling heavy loads. This truck pairs perfectly with any of our lowboy or heavy-duty trailers. Complete your heavy haul setup with this exceptional tractor from I90 Equipment.
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
                    id="inline-product-form-5"
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

export default KenworthT800;
