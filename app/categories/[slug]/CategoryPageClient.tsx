'use client';

import { useMemo } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useInventory } from '@/lib/hooks/use-inventory';
import { getCategoryBySlug, getAllCategories } from '@/lib/categories';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface CategoryPageClientProps {
  slug: string;
}

export default function CategoryPageClient({ slug }: CategoryPageClientProps) {
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

  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const { data, isLoading, error } = useInventory();

  // Filter inventory items for this category
  const categoryItems = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((item) => item.equipmentType === category.name);
  }, [data, category.name]);

  // Get other categories for promotion section
  const otherCategories = useMemo(() => {
    return getAllCategories().filter((cat) => cat.slug !== category.slug);
  }, [category.slug]);

  return (
    <>
      {/* Header Section */}
      <div className="bg-background">
        <div className="container mx-auto pt-12 pb-6 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">{category.title}</h1>
            <p className="text-base text-muted-foreground max-w-[525px]">
              {category.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Inventory Grid Section */}
      <div className="bg-background">
        <div className="container mx-auto pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              // Loading state
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
            ) : error || !data?.success ? (
              // Error state
              <div className="text-center py-12">
                <Alert variant="destructive" className="max-w-2xl mx-auto">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {error instanceof Error
                      ? error.message
                      : 'Unable to load inventory at this time. Please contact us directly.'}
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <>
                {categoryItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Alert className="max-w-2xl mx-auto">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>No inventory available</AlertTitle>
                      <AlertDescription>
                        We don&apos;t currently have any {category.name.toLowerCase()} in stock. Please
                        check back soon or{' '}
                        <Link href="/contact" className="underline font-medium">
                          contact us
                        </Link>{' '}
                        about upcoming inventory.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <p className="text-sm text-muted-foreground">
                        Showing {categoryItems.length}{' '}
                        {categoryItems.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryItems.map((item) => (
                        <Card
                          key={item.id}
                          className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                          <CardHeader className="p-0">
                            <div
                              className="relative w-full bg-muted"
                              style={{ aspectRatio: '1374 / 920' }}
                            >
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
                                  className={`absolute top-4 right-4 z-10 ${
                                    item.condition === 'New'
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
                              <Link href={`/inventory/${item.slug}`}>View Details</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Other Categories Promotion Section */}
      <div className="bg-muted/30 border-t">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Explore Other Categories
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse our full range of heavy-duty construction equipment and trailers
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherCategories.map((cat) => (
                <Link key={cat.slug} href={`/categories/${cat.slug}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full group">
                    <div className="relative w-full bg-muted" style={{ aspectRatio: '16 / 9' }}>
                      <Image
                        src={cat.heroImage}
                        alt={cat.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                        {cat.name}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground group-hover:text-secondary transition-colors">
                        View inventory
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
