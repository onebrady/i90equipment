import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Heavy-duty construction trailers in Montana landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Montana's Premier Heavy-Duty Construction Trailer Dealer
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 mb-4 max-w-3xl">
            Over 15 years of heavy haul experience. Quality trailers that keep your business moving.
          </p>
          <p className="text-base sm:text-lg text-primary-foreground/80 mb-8 font-medium">
            XL Specialized • Smithco • Ranco • Dragon • Midland • Choice • Manac
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="default" className="bg-secondary hover:bg-secondary-hover text-secondary-foreground text-lg px-8 py-6 h-auto font-semibold">
              <Link to="/inventory">View Inventory</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 h-auto font-semibold">
              <Link to="/contact">Apply for Financing</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="animate-fade-in">
              <div className="text-2xl font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-2xl font-bold text-primary mb-1">Premium</div>
              <div className="text-sm text-muted-foreground">Brands</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-2xl font-bold text-primary mb-1">4.99%</div>
              <div className="text-sm text-muted-foreground">Financing Available</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-2xl font-bold text-primary mb-1">Montana</div>
              <div className="text-sm text-muted-foreground">Based & Focused</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
