/**
 * Inventory Listing Page
 * Displays all inventory items from SmartSuite
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useHomepageInventory } from '@/lib/hooks/use-inventory';
import { parseInventoryItem, type InventoryItem } from '@/lib/smartsuite/helpers';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

export default function InventoryPage() {
  const { data, isLoading, error } = useHomepageInventory();

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-muted/40 via-background to-background">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-6xl mx-auto text-center space-y-4">
            <h1 className="text-5xl font-bold text-foreground">Available Inventory</h1>
            <p className="text-xl text-muted-foreground mx-auto" style={{ maxWidth: '475px' }}>
              Quality construction trailers and heavy haul trucks from the industry's most trusted manufacturers
            </p>
          </div>
        </div>
      </div>

      {/* Inventory Grid Section */}
      <div className="bg-background">
        <div className="container mx-auto pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              // Loading state
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-64 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-24 mb-2" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-20 w-full mb-4" />
                      <Skeleton className="h-8 w-32" />
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Skeleton className="h-10 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : error || !data?.success ? (
              // Error state
              <div className="text-center py-12">
                <Alert variant="destructive" className="max-w-2xl mx-auto">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {error instanceof Error ? error.message : 'Unable to load inventory at this time. Please contact us directly.'}
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              // Success state - show all inventory
              <>
                {(data.data as InventoryItem[]).length === 0 ? (
                  <div className="text-center py-12">
                    <Alert className="max-w-2xl mx-auto">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>No inventory items</AlertTitle>
                      <AlertDescription>
                        There are currently no inventory items available. Please check back soon or contact us for upcoming inventory.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(data.data as InventoryItem[]).map((item) => {
                      const parsed = parseInventoryItem(item);

                      return (
                        <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                          <CardHeader className="p-0">
                            <div className="relative w-full bg-muted" style={{ aspectRatio: '1374 / 920' }}>
                              {parsed.firstImage ? (
                                <Image
                                  src={parsed.firstImage}
                                  alt={`${parsed.title} - ${parsed.equipmentType} for sale in Montana`}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="object-cover hover:scale-105 transition-transform duration-300"
                                  placeholder="blur"
                                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                  No Image
                                </div>
                              )}
                              {parsed.condition && (
                                <Badge
                                  className={`absolute top-4 right-4 z-10 ${
                                    parsed.condition === 'New'
                                      ? 'bg-green-600 text-white hover:bg-green-700'
                                      : 'bg-blue-600 text-white hover:bg-blue-700'
                                  }`}
                                >
                                  {parsed.condition}
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="p-6">
                            {parsed.equipmentType && (
                              <div className="mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {parsed.equipmentType}
                                </Badge>
                              </div>
                            )}
                            <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                              {parsed.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                              {parsed.description || `${parsed.year} ${parsed.manufacturer} ${parsed.model}`.trim() || 'Contact us for details'}
                            </p>
                          </CardContent>
                          <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                            {parsed.price && (
                              <div className="text-3xl font-bold text-primary text-left">
                                {parsed.price}
                              </div>
                            )}
                            <Button asChild className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                              <Link href={`/inventory/${parsed.slug}`}>
                                View Details
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
