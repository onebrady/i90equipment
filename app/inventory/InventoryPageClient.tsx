/**
 * Inventory Listing Page - Client Component
 * Displays all inventory items from PostgreSQL with filtering
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInventory } from '@/lib/hooks/use-inventory';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { FilterSidebar, FilterState } from '@/components/FilterSidebar';

export default function InventoryPageClient() {
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
  const { data, isLoading, error } = useInventory();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    conditions: [],
  });

  // Extract unique categories and conditions from inventory data
  const { availableCategories, availableConditions } = useMemo(() => {
    if (!data?.data) {
      return { availableCategories: [], availableConditions: [] };
    }

    const categories = new Set<string>();
    const conditions = new Set<string>();

    data.data.forEach((item) => {
      if (item.equipmentType) categories.add(item.equipmentType);
      if (item.condition) conditions.add(item.condition);
    });

    return {
      availableCategories: Array.from(categories).sort(),
      availableConditions: Array.from(conditions).sort(),
    };
  }, [data]);

  // Filter inventory items based on selected filters
  const filteredItems = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((item) => {
      const categoryMatch =
        filters.categories.length === 0 ||
        (item.equipmentType && filters.categories.includes(item.equipmentType));

      const conditionMatch =
        filters.conditions.length === 0 ||
        (item.condition && filters.conditions.includes(item.condition));

      return categoryMatch && conditionMatch;
    });
  }, [data, filters]);

  // Calculate item counts for each filter option
  const itemCounts = useMemo(() => {
    if (!data?.data) {
      return { categories: {}, conditions: {} };
    }

    const categoryCounts: Record<string, number> = {};
    const conditionCounts: Record<string, number> = {};

    data.data.forEach((item) => {
      if (item.equipmentType) {
        categoryCounts[item.equipmentType] = (categoryCounts[item.equipmentType] || 0) + 1;
      }
      if (item.condition) {
        conditionCounts[item.condition] = (conditionCounts[item.condition] || 0) + 1;
      }
    });

    return {
      categories: categoryCounts,
      conditions: conditionCounts,
    };
  }, [data]);

  return (
    <>
      {/* Inventory Grid Section */}
      <div className="bg-background">
        <div className="container mx-auto pt-12 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              // Loading state
              <div className="flex gap-6">
                <div className="w-64 flex-shrink-0">
                  <Skeleton className="h-96 w-full" />
                </div>
                <div className="flex-1">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground mb-3">Available Inventory</h1>
                    <Skeleton className="h-5 w-48" />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                </div>
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
              // Success state - show filters and inventory
              <>
                {data.data.length === 0 ? (
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
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                      <div className="sticky top-4">
                        <FilterSidebar
                          filters={filters}
                          onFilterChange={setFilters}
                          availableCategories={availableCategories}
                          availableConditions={availableConditions}
                          itemCounts={itemCounts}
                        />
                      </div>
                    </aside>

                    {/* Inventory Grid */}
                    <div className="flex-1">
                      {filteredItems.length === 0 ? (
                        <div className="text-center py-12">
                          <Alert className="max-w-2xl mx-auto">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>No matching inventory</AlertTitle>
                            <AlertDescription>
                              No items match your selected filters. Try adjusting your filters or reset them to see all inventory.
                            </AlertDescription>
                          </Alert>
                        </div>
                      ) : (
                        <>
                          <div className="mb-6">
                            <h1 className="text-3xl font-bold text-foreground mb-3">Available Inventory</h1>
                            <div className="text-sm text-muted-foreground">
                              Showing <span className="font-semibold text-foreground">{filteredItems.length}</span> of {data.data.length} items
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredItems.map((item) => {
                              return (
                                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                  <CardHeader className="p-0">
                                    <div className="relative w-full bg-muted" style={{ aspectRatio: '1374 / 920' }}>
                                      {item.firstImage ? (
                                        <Image
                                          src={item.firstImage}
                                          alt={`${item.title} - ${item.equipmentType} for sale in Montana`}
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
                                      {item.condition && (
                                        <Badge
                                          className={`absolute top-4 right-4 z-10 ${item.condition === 'New'
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
                        </>
                      )}
                    </div>
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
