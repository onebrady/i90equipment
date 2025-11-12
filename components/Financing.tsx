"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";

const benefits = [
  "Rates as low as 4.99% APR",
  "Fast approval process - often within 24 hours",
  "Flexible terms up to 72 months",
  "Financing available for new and used equipment",
  "No prepayment penalties",
  "Competitive rates for all credit levels",
];

const Financing = () => {
  return (
    <section id="financing" className="py-20 bg-background">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 px-2 sm:px-0">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Flexible Financing Options
            </h2>
            <p className="text-lg text-muted-foreground">
              Get the equipment you need with competitive rates starting at 4.99%
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-4 sm:p-8">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At I90 Equipment, we understand that investing in quality construction trailers is a significant decision for your business. That's why we've partnered with leading equipment financing companies to offer you competitive rates and flexible terms.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-secondary" />
                      </div>
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted rounded-lg p-6 mb-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Ready to get started? Complete our simple online application:
                </h3>
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold"
                  asChild
                >
                  <a
                    href="https://apfinancing.com/apply/?tfa_768=005Un000001LgwYIAS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Apply for Financing
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              <p className="text-center text-muted-foreground">
                Questions about financing? Call us at{" "}
                <a href="tel:+14069392153" className="text-secondary hover:underline font-semibold">
                  (406) 939-2153
                </a>{" "}
                or email{" "}
                <a href="mailto:I90equipment@gmail.com" className="text-secondary hover:underline font-semibold">
                  I90equipment@gmail.com
                </a>{" "}
                to speak with a financing specialist.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Financing;
