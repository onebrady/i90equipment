import type { Metadata } from "next";
import { Inter, Rosarivo } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rosarivo = Rosarivo({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-rosarivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "I90 Equipment - Montana's Premier Heavy-Duty Construction Trailer Dealer | Billings & Belgrade MT",
  description: "Montana's trusted source for heavy-duty construction trailers. XL Specialized, Smithco, Ranco & more. Lowboys, side dumps, belly dumps, flatbeds. Financing from 4.99%. Serving Billings, Belgrade & all of Montana.",
  keywords: "Montana construction trailers, heavy-duty trailers Montana, lowboy trailers Billings MT, side dump trailers Montana, construction equipment trailers Belgrade MT",
  authors: [{ name: "I90 Equipment" }],
  openGraph: {
    title: "I90 Equipment - Montana's Premier Heavy-Duty Construction Trailer Dealer",
    description: "Montana's trusted source for heavy-duty construction trailers. XL Specialized, Smithco, Ranco & more. Financing from 4.99%.",
    type: "website",
    url: "https://i90equipment.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "I90 Equipment - Montana Construction Trailers",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${rosarivo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "I90 Equipment",
              "description": "Montana's trusted source for heavy-duty construction trailers. XL Specialized, Smithco, Ranco & more.",
              "url": "https://i90equipment.com",
              "telephone": "+1-406-939-2153",
              "email": "I90equipment@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "70 Pipkin Way",
                "addressLocality": "Belgrade",
                "addressRegion": "MT",
                "postalCode": "59714",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "45.7769",
                "longitude": "-111.1769"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "17:00"
              },
              "priceRange": "$$$$",
              "areaServed": {
                "@type": "State",
                "name": "Montana"
              }
            })
          }}
        />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z6RDS42G5S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z6RDS42G5S');
          `}
        </Script>

        <Script src="https://server.fillout.com/embed/v1/" strategy="lazyOnload" />
      </body>
    </html>
  );
}
