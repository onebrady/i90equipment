import { Award, MapPin, DollarSign, Wrench, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: TrendingUp,
    title: "15+ Years Heavy Haul Experience",
    description: "Owner-operated with deep industry knowledge. Former trucking fleet owner understands your needs.",
  },
  {
    icon: Award,
    title: "Premium Manufacturer Partnerships",
    description: "Direct access to XL Specialized, Smithco, Ranco, Dragon, Midland, Choice, Manac. Factory warranties and support.",
  },
  {
    icon: MapPin,
    title: "Montana-Based & Montana-Focused",
    description: "Local expertise for Montana's unique terrain and requirements. Quick delivery across the state. Understanding of Montana DOT regulations.",
  },
  {
    icon: DollarSign,
    title: "Flexible Financing Options",
    description: "Competitive rates starting at 4.99%. Fast approval process. Multiple lenders to find your best option.",
  },
  {
    icon: Users,
    title: "Quality Equipment = Happy Drivers",
    description: "Reliable trailers reduce downtime. Safety features for driver confidence. Modern technology for efficiency.",
  },
  {
    icon: Wrench,
    title: "One-Stop Shop",
    description: "Complete selection of heavy-duty trailers. Expert consultation for your specific needs. Long-term support and service.",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-24 lg:py-32 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose I90 Equipment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Experience, quality, and Montana values you can trust
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 font-sans">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-sans">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
