import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const ManacStepDeck = () => {
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
    '102" wide deck for maximum load capacity',
    'Combo construction (steel & aluminum) for durability and weight savings',
    'Air ride suspension for smooth transport',
    'Sliding rear axle for load distribution flexibility',
    'Aluminum wheels reduce weight and improve fuel efficiency',
    '2 toolboxes for secure equipment storage',
    'Sliding winches for versatile cargo securement',
    'Ramps to upper deck for easy equipment loading',
    'One owner - very little use',
    'Excellent condition',
  ];

  const specs = [
    { label: "Year", value: "2023" },
    { label: "Manufacturer", value: "MANAC" },
    { label: "Type", value: "Step Deck Trailer" },
    { label: "Length", value: "53 feet" },
    { label: "Width", value: "102 inches wide" },
    { label: "Suspension", value: "Air ride with sliding rear axle" },
    { label: "Wheels", value: "Aluminum wheels" },
    { label: "Additional Features", value: "2 toolboxes, sliding winches, ramps" },
    { label: "Ownership", value: "One owner, very little use" },
    { label: "Price", value: "$49,900.00" },
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
              <span className="text-foreground">2023 MANAC 53 FT STEPDECK TRAILER</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <img 
                  src="https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/681246904c0489b7208d6e2b_2023-Manac-53-ft-Stepdeck-Trailer-1.webp"
                  alt="2023 MANAC 53 FT STEPDECK TRAILER"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>

              <div>
                <Badge className="mb-4">Used - Like New</Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  2023 MANAC 53 FT STEPDECK TRAILER
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Premium Step Deck with Low Miles and Excellent Condition
                </p>
                <div className="text-4xl font-bold text-primary mb-6">$49,900</div>
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
                This 2023 MANAC 53 ft Stepdeck Trailer is an exceptional find for contractors and haulers. With only one previous owner and minimal use, this trailer is essentially like new. MANAC (founded in 1966) is one of North America's most respected trailer manufacturers. The step deck design provides approximately 2 feet of additional height clearance compared to standard flatbeds, crucial when transporting tall construction equipment, industrial machinery, and oversized cargo. The 53-foot length provides ample deck space while the 102-inch width maximizes payload capacity. Equipped with sliding winches and ramps to the upper deck, loading and unloading is efficient and safe. Perfect for Montana's diverse hauling needs.
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
                    id="inline-product-form-2"
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

export default ManacStepDeck;
