import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[600px] md:min-h-[700px] lg:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-bg.jpg"
          alt="Heavy-duty construction trailers in Montana landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-32 md:pb-40">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4 md:mb-6 leading-tight">
            Montana's Premier Heavy-Duty Construction Trailer Dealer
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-3 md:mb-4 max-w-3xl">
            Over 15 years of heavy haul experience. Quality trailers that keep your business moving.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-6 md:mb-8 font-medium">
            XL Specialized • Smithco • Ranco • Dragon • Midland • Choice • Manac
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button asChild size="lg" variant="default" className="bg-secondary hover:bg-secondary-hover text-secondary-foreground text-base md:text-lg px-6 md:px-8 py-2 h-auto font-semibold">
              <a href="/inventory">View Inventory</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base md:text-lg px-6 md:px-8 py-2 h-auto font-semibold">
              <a href="#financing">Apply for Financing</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-center">
            <div className="animate-fade-in">
              <div className="text-xl md:text-2xl font-bold text-primary mb-1">15+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-xl md:text-2xl font-bold text-primary mb-1">Premium</div>
              <div className="text-xs md:text-sm text-muted-foreground">Brands</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-xl md:text-2xl font-bold text-primary mb-1">4.99%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Financing Available</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-xl md:text-2xl font-bold text-primary mb-1">Montana</div>
              <div className="text-xs md:text-sm text-muted-foreground">Based & Focused</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
