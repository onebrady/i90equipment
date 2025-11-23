import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[600px] md:min-h-[700px] lg:h-[90vh] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/hero-bg.jpg"
          alt="Heavy-duty construction trailers in Montana landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-5xl animate-fade-in">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 tracking-tight"
            style={{ lineHeight: 1.15 }}
          >
            Professional<br /> Trucks & Trailers<br /> for Serious Hauling
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl font-medium leading-relaxed">
            Over 15 years of heavy haul experience.<br /> Quality trailers that keep your business moving.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="default" className="bg-secondary hover:bg-secondary-hover text-secondary-foreground text-lg px-8 py-2 h-auto font-bold shadow-lg transition-all hover:scale-105">
              <a href="/inventory">View Inventory</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-2 h-auto font-bold backdrop-blur-sm transition-all hover:scale-105">
              <a href="#financing">Apply for Financing</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Features Floating Bar */}
      <div className="absolute -bottom-12 left-0 right-0 z-20 flex justify-center px-4">
        <div className="bg-[#0f172a] text-white rounded-lg shadow-xl py-6 px-4 md:px-12 max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 animate-fade-in-up">

          {/* Item 1 */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3 md:border-r md:border-white/20">
            <div className="text-2xl md:text-3xl font-bold mb-1">Premium</div>
            <div className="text-sm md:text-base text-gray-300 uppercase tracking-wide">Brands</div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3 md:border-r md:border-white/20">
            <div className="text-2xl md:text-3xl font-bold mb-1">4.99%</div>
            <div className="text-sm md:text-base text-gray-300 uppercase tracking-wide">Financing Available</div>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3">
            <div className="text-2xl md:text-3xl font-bold mb-1">Montana</div>
            <div className="text-sm md:text-base text-gray-300 uppercase tracking-wide">Based & Focused</div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
