/**
 * Dynamic Inventory Item Page - Client Component
 * Handles interactivity (lightbox, image selection)
 */

'use client';

import { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChevronRight,
  Phone,
  Tag,
  ZoomIn,
} from 'lucide-react';

// Lazy load Lightbox and its plugins - only loads when user opens lightbox (~45KB saved from initial bundle)
const LightboxComponent = lazy(() => import('yet-another-react-lightbox'));
import 'yet-another-react-lightbox/styles.css';

// Wrapper component for lazy-loaded Lightbox with Zoom plugin
function LightboxWithZoom({
  open,
  close,
  index,
  slides
}: {
  open: boolean;
  close: () => void;
  index: number;
  slides: { src: string }[]
}) {
  const [ZoomPlugin, setZoomPlugin] = useState<any>(null);

  // Load the Zoom plugin when the component mounts
  useState(() => {
    import('yet-another-react-lightbox/plugins/zoom').then(mod => {
      setZoomPlugin(() => mod.default);
    });
  });

  return (
    <LightboxComponent
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={ZoomPlugin ? [ZoomPlugin] : []}
    />
  );
}

export interface InventoryItemData {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  fullDescription: string | null;
  price: string | null;
  condition: string | null;
  equipmentType: string | null;
  year: string | null;
  manufacturer: string | null;
  model: string | null;
  salesStatus: string | null;
  images: string[];
  firstImage: string | null;
}

interface InventoryItemClientProps {
  item: InventoryItemData;
}

export default function InventoryItemClient({ item }: InventoryItemClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const quickStats = [
    { label: 'Status', value: item.salesStatus, icon: Tag },
  ].filter((stat) => stat.value);

  return (
    <>
      {/* Product Hero Section */}
      <div className="bg-gradient-to-b from-muted/40 via-background to-background">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-6xl mx-auto space-y-10">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/inventory" className="hover:text-foreground transition-colors">
                Inventory
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{item.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <button
                  type="button"
                  className="relative w-full rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                  style={{ aspectRatio: '1374 / 920' }}
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`View ${item.title} in fullscreen gallery`}
                >
                  {item.images && item.images.length > 0 ? (
                    <>
                      <Image
                        src={item.images[selectedImageIndex]}
                        alt={item.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                      {/* Zoom Icon Indicator */}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full group-hover:bg-black/80 transition-colors z-10" aria-hidden="true">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No image available</span>
                    </div>
                  )}
                </button>

                {/* Thumbnail Navigation */}
                {item.images && item.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {item.images.map((imageUrl: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${selectedImageIndex === index
                          ? 'border-primary shadow-md'
                          : 'border-transparent hover:border-gray-300'
                          }`}
                      >
                        <Image
                          src={imageUrl}
                          alt={`${item.title} thumbnail ${index + 1}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Product Details */}
              <div className="flex flex-col gap-6">
                {/* Product Title */}
                <h1 className="text-4xl font-bold text-foreground leading-tight">
                  {item.title}
                </h1>

                {/* Product Price */}
                {item.price && (
                  <div className="text-4xl font-bold text-primary">
                    {item.price}
                  </div>
                )}

                {item.description && (
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {item.description}
                  </p>
                )}

                {quickStats.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickStats.map(({ label, value, icon: Icon }) => (
                      <div key={label} className="rounded-2xl border bg-card/80 p-4 shadow-sm">
                        <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                          <Icon className="h-4 w-4 text-primary" />
                          {label}
                        </div>
                        <div className="mt-2 text-lg font-semibold text-foreground">{value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-3 mt-4">
                  <Button asChild size="lg" className="flex-1">
                    <a href="tel:+14069392153" className="flex items-center justify-center gap-2">
                      <Phone className="h-5 w-5" />
                      Call now: (406) 939-2153
                    </a>
                  </Button>
                  <Button variant="secondary" size="lg" className="flex-1" asChild>
                    <a href="#contact-form">Request Info</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-muted/30">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Description */}
            {item.fullDescription && (
              <Card>
                <CardContent className="pt-6">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.fullDescription }}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-muted">
        <div className="container mx-auto py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div id="contact-form">
              <h2 className="text-2xl font-bold mb-6 text-center">Interested in this equipment?</h2>
              <Card>
                <CardContent className="p-0">
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal - dynamically loaded only when opened */}
      {lightboxOpen && item.images && item.images.length > 0 && (
        <Suspense fallback={null}>
          <LightboxWithZoom
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={selectedImageIndex}
            slides={item.images.map((imageUrl: string) => ({ src: imageUrl }))}
          />
        </Suspense>
      )}

      {/* Form Embed Script */}
      <Script
        src="https://links.resultreach.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
