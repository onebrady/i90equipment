import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const ReitnourConestoga = () => {
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
    "Shur-Tite Conestoga sliding tarp system",
    "Quad axle configuration for heavy loads",
    "1st and 4th axle lift for flexibility",
    "Steerable rear lift axle for improved maneuverability",
    "Integrated side storage boxes",
    "Fresh DOT inspection completed",
    "Brand new king pins installed",
    "Aluminum construction for weight savings",
    "All-weather cargo protection",
    "Quick tarp deployment (90 seconds)",
    "Flatbed versatility when open",
    "Available for purchase or rental",
  ];

  const specs = [
    { label: "Year", value: "2022" },
    { label: "Manufacturer", value: "REITNOUER" },
    { label: "Model", value: "Big Bubba Conestoga - Quad Axle" },
    { label: "Type", value: "Conestoga / Flatbed Hybrid" },
    { label: "Tarp System", value: "Shur-Tite Conestoga sliding tarp" },
    { label: "Axle Configuration", value: "Quad axle (4 axles)" },
    { label: "Special Features", value: "1st/4th axle lift, Steerable rear lift axle" },
    { label: "Storage", value: "Side boxes included" },
    { label: "Maintenance", value: "Fresh DOT inspection, New King Pins" },
    { label: "Purchase Price", value: "$82,900.00" },
    { label: "Rental Option", value: "$2,900 per month" },
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
              <span className="text-foreground">2022 REITNOUER CONESTOGA BIG BUBBA QUAD</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <img 
                  src="https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/6786d17563d9a5024a6bd370_2022-Reitnouer-Conestoga-Big-Bubba-Quad-4.jpg"
                  alt="2022 REITNOUER CONESTOGA BIG BUBBA QUAD"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>

              <div>
                <Badge className="mb-4">Used - Excellent</Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  2022 REITNOUER CONESTOGA BIG BUBBA QUAD
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Premium Conestoga System - Flatbed Versatility with Weather Protection
                </p>
                <div className="text-4xl font-bold text-primary mb-6">$82,900</div>
                <div className="text-lg text-muted-foreground mb-6">
                  Or rent for <span className="font-bold text-secondary">$2,900/month</span>
                </div>
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
                The 2022 Reitnouer Conestoga Big Bubba Quad represents the ultimate combination of flatbed versatility and enclosed trailer protection. The Conestoga system features a sliding tarp that rides on rails along the sides of the trailer. Unlike traditional tarps, the Conestoga tarp deploys in approximately 90 seconds, provides complete weather protection, allows for side loading/unloading, and eliminates manual tarping risks. The "Big Bubba Quad" designation indicates Reitnouer's heavy-duty model with four-axle configuration, providing increased weight capacity, better load balance, and flexibility with liftable axles. The 1st and 4th axles can be lifted to adjust weight distribution, reduce tire wear on light loads, and improve fuel efficiency. The steerable rear axle improves turning radius and maneuverability. Fresh DOT inspection and new king pins mean this trailer is ready for immediate service.
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

export default ReitnourConestoga;
