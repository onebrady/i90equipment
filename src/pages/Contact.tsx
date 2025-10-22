import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://links.resultreach.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Contact I90 Equipment
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get in touch with us for equipment inquiries, financing questions, or to schedule a visit
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Our Location</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-foreground mb-1">Address</div>
                          <div className="text-muted-foreground">
                            70 Pipkin Way<br />
                            Belgrade, MT 59714
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Phone className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-foreground mb-1">Phone</div>
                          <a 
                            href="tel:+14069392153" 
                            className="text-secondary hover:underline text-lg font-semibold"
                          >
                            (406) 939-2153
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Mail className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-foreground mb-1">Email</div>
                          <a 
                            href="mailto:I90equipment@gmail.com" 
                            className="text-secondary hover:underline"
                          >
                            I90equipment@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Clock className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-foreground mb-1">Business Hours</div>
                          <div className="text-muted-foreground">
                            Monday - Friday: 8:00 AM - 5:00 PM MT<br />
                            Saturday & Sunday: Closed
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Why Choose I90 Equipment?</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">•</span>
                        <span>Over 15 years of heavy haul industry experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">•</span>
                        <span>Quality equipment from trusted manufacturers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">•</span>
                        <span>Flexible financing options starting at 4.99%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">•</span>
                        <span>Serving Montana and surrounding states</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                  <div style={{ width: "100%", minHeight: "546px" }}>
                    <iframe
                      src="https://links.resultreach.com/widget/form/9fY8ydtCiOWoUKgu7aXm"
                      style={{ width: "100%", height: "546px", border: "none", borderRadius: "3px" }}
                      id="inline-contact-form"
                      data-layout='{"id":"INLINE"}'
                      data-trigger-type="alwaysShow"
                      data-trigger-value=""
                      data-activation-type="alwaysActivated"
                      data-activation-value=""
                      data-deactivation-type="neverDeactivate"
                      data-deactivation-value=""
                      data-form-name="Contact Form"
                      data-height="546"
                      data-layout-iframe-id="inline-contact-form"
                      data-form-id="9fY8ydtCiOWoUKgu7aXm"
                      title="Contact Form"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
