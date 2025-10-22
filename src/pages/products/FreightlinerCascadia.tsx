import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const FreightlinerCascadia = () => {
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
    "DD15 engine with 505 horsepower",
    "Detroit DT12 automatic transmission",
    '300" wheelbase',
    "Inverter for power on the road",
    "Bunk heater for comfort",
    "Air conditioning unit",
    "Fleet owned and maintained",
    "Complete service history",
    "NW4 warranty coverage until 600,000 miles",
    "Warranty can be extended for an additional 250,000 miles",
    "Ready for immediate service",
  ];

  const specs = [
    { label: "Year", value: "2020" },
    { label: "Make", value: "Freightliner" },
    { label: "Model", value: "Cascadia" },
    { label: "Engine", value: "DD15 505hp" },
    { label: "Transmission", value: "DT12 Automatic" },
    { label: "Mileage", value: "555,000 miles" },
    { label: "Wheelbase", value: '300"' },
    { label: "Features", value: "Inverter, Bunk heater, AC unit" },
    { label: "Maintenance", value: "Fleet owned & maintained" },
    { label: "Warranty", value: "NW4 warranty until 600k miles (extendable 250k)" },
    { label: "Price", value: "$72,900.00" },
    { label: "FET Tax", value: "Not applicable" },
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
              <span className="text-foreground">2020 FREIGHTLINER CASCADIA</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <img 
                  src="https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/6786dc5ded4f30fc6258554b_2020-Freightliner-Cascadia-1.webp"
                  alt="2020 FREIGHTLINER CASCADIA"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>

              <div>
                <Badge className="mb-4">Used - Well Maintained</Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  2020 FREIGHTLINER CASCADIA
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Highway Tractor with Extended Warranty Coverage
                </p>
                <div className="text-4xl font-bold text-primary mb-6">$72,900</div>
                <p className="text-muted-foreground mb-6">1 Unit Available • NW4 Warranty</p>
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
                This 2020 Freightliner Cascadia is a reliable highway tractor with excellent maintenance history. Fleet-owned and meticulously maintained, this truck comes with complete service records. The Detroit DD15 engine delivers 505 horsepower, providing excellent pulling power and fuel efficiency. The DT12 automatic transmission is known for its reliability and fuel-saving technology. At 555,000 miles, this Cascadia has plenty of life left - these trucks are known to run well over 1 million miles with proper maintenance. The NW4 warranty coverage extends until 600,000 miles and can be extended for another 250,000 miles, providing peace of mind. Equipped with driver comfort features including an inverter for on-road power, bunk heater, and AC unit. The 300-inch wheelbase provides a smooth ride and excellent stability. Perfect for long-haul trailer operations or regional hauling. This Cascadia represents excellent value for owner-operators or small fleet additions.
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
                    style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px" }}
                    id="inline-9fY8ydtCiOWoUKgu7aXm"
                    data-layout='{"id":"INLINE"}'
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Contact Form"
                    data-height="546"
                    data-layout-iframe-id="inline-9fY8ydtCiOWoUKgu7aXm"
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

export default FreightlinerCascadia;
