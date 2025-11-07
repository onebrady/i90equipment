import { Button } from "@/components/ui/button";
import { Phone, FileText, DollarSign } from "lucide-react";

const CTA = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#fff' }}>
            Ready to Upgrade Your Fleet?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Contact I90 Equipment today to discuss your heavy-duty trailer needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild
              size="lg"
              className="bg-secondary hover:bg-secondary-hover text-secondary-foreground text-lg px-8 py-6 h-auto font-semibold"
            >
              <a href="tel:+14069392153">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (406) 939-2153
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 h-auto font-semibold">
              <a href="/contact">
                <FileText className="w-5 h-5 mr-2" />
                Request a Quote
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 h-auto font-semibold">
              <a href="#financing">
                <DollarSign className="w-5 h-5 mr-2" />
                Apply for Financing
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
