import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const serviceAreas = [
  "Billings, MT",
  "Belgrade, MT",
  "Bozeman, MT",
  "Great Falls, MT",
  "Missoula, MT",
  "Butte, MT",
  "Helena, MT",
  "All of Montana and surrounding states",
];

const ServiceArea = () => {
  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Proudly Serving Montana
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based in Belgrade, Montana, I90 Equipment serves contractors, haulers, and construction companies throughout the entire state and beyond.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Service Areas */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-secondary" />
                Primary Service Areas
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {serviceAreas.map((area, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Our strategic location along I-90 provides easy access for customers across Montana and neighboring states.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Address</div>
                    <div className="text-muted-foreground">
                      70 Pipkin Way<br />
                      Belgrade, MT 59714
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Phone</div>
                    <a 
                      href="tel:+14069392153" 
                      className="text-secondary hover:underline"
                    >
                      (406) 939-2153
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <a 
                      href="mailto:I90equipment@gmail.com" 
                      className="text-secondary hover:underline"
                    >
                      I90equipment@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Hours</div>
                    <div className="text-muted-foreground">
                      Monday-Friday: 8:00 AM - 5:00 PM MT
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
