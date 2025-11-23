'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHomepageInventory } from "@/lib/hooks/use-inventory";


const Inventory = () => {
  const { data, isLoading, error } = useHomepageInventory();

  const formatDescription = (desc: string) => {
    if (!desc) return "";
    // Decode basic entities and clean up formatting
    return desc
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\*/g, " • ");
  };

  return (
    <section id="inventory" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Premium Heavy-Haul Inventory
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quality equipment from the industry's most trusted manufacturers
          </p>
        </div>

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
          // Error state - show message
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Unable to load inventory at this time. Please contact us directly.
            </p>
          </div>
        ) : (
          // Success state - show inventory
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.data.slice(0, 6).map((item) => {
              return (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    <div className="relative w-full bg-muted" style={{ aspectRatio: '1374 / 920' }}>
                      {item.firstImage ? (
                        <img
                          src={item.firstImage}
                          alt={`${item.title} - ${item.equipmentType} for sale in Montana`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}
                      {item.condition && (
                        <Badge
                          className={`absolute top-4 right-4 ${item.condition === 'New'
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                          {item.condition}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {item.equipmentType && (
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs font-sans">
                          {item.equipmentType}
                        </Badge>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 font-sans">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 font-sans">
                      {formatDescription(item.description) || 'Contact us for details'}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                    {item.price && (
                      <div className="text-2xl font-bold text-primary text-left font-sans">
                        {item.price}
                      </div>
                    )}
                    <Button asChild className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-sans">
                      <Link href={`/inventory/${item.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/inventory">View Our Inventory</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Inventory;
