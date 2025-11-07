/**
 * Contact Page
 * Contact information and form for I90 Equipment
 */

import Script from 'next/script';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | I90 Equipment',
  description: 'Get in touch with I90 Equipment for heavy-duty trailer inquiries, financing questions, or to schedule a visit. Located in Belgrade, MT.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-muted/40 via-background to-background">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-6xl mx-auto text-center space-y-4">
            <h1 className="text-5xl font-bold text-foreground">Contact I90 Equipment</h1>
            <p className="text-xl text-muted-foreground mx-auto" style={{ maxWidth: '475px' }}>
              Get in touch with us for equipment inquiries, financing questions, or to schedule a visit
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-background">
        <div className="container mx-auto pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Location & Info */}
              <div className="space-y-8">
                {/* Our Location Card */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-6">Our Location</h2>
                    <div className="space-y-6">
                      {/* Address */}
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground mb-1">Address</div>
                          <div className="text-muted-foreground">
                            70 Pipkin Way<br />
                            Belgrade, MT 59714
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground mb-1">Phone</div>
                          <a
                            href="tel:+14069392153"
                            className="text-secondary hover:text-secondary/80 transition-colors font-medium"
                          >
                            (406) 939-2153
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground mb-1">Email</div>
                          <a
                            href="mailto:i90equipment@gmail.com"
                            className="text-secondary hover:text-secondary/80 transition-colors font-medium"
                          >
                            i90equipment@gmail.com
                          </a>
                        </div>
                      </div>

                      {/* Business Hours */}
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
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

                {/* Why Choose I90 Equipment Card */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-6">Why Choose I90 Equipment?</h2>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Over 15 years of heavy haul industry experience
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Quality equipment from trusted manufacturers
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Flexible financing options starting at 4.99%
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Serving Montana and surrounding states
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Contact Form */}
              <div>
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                    <div className="w-full" style={{ minHeight: '599px' }}>
                      <iframe
                        src="https://links.resultreach.com/widget/form/9fY8ydtCiOWoUKgu7aXm"
                        style={{ width: '100%', height: '599px', border: 'none', borderRadius: '3px' }}
                        id="inline-9fY8ydtCiOWoUKgu7aXm"
                        data-layout="{'id':'INLINE'}"
                        data-trigger-type="alwaysShow"
                        data-trigger-value=""
                        data-activation-type="alwaysActivated"
                        data-activation-value=""
                        data-deactivation-type="neverDeactivate"
                        data-deactivation-value=""
                        data-form-name="Contact Form"
                        data-height="599"
                        data-layout-iframe-id="inline-9fY8ydtCiOWoUKgu7aXm"
                        data-form-id="9fY8ydtCiOWoUKgu7aXm"
                        title="Contact Form"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Embed Script */}
      <Script
        src="https://links.resultreach.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
