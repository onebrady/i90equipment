/**
 * Example: Inventory Listing Page with Field Helpers
 *
 * This is an example showing how to use the SmartSuite helpers
 * to display inventory data with proper field parsing.
 *
 * Copy the parts you need into your actual inventory/page.tsx
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useInventory } from '@/lib/hooks/use-inventory';
import { parseInventoryItem, type InventoryItem } from '@/lib/smartsuite';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function InventoryPageExample() {
  const { data, isLoading, error } = useInventory();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Inventory</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Inventory</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load inventory'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const items = data.data as InventoryItem[];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">
          Showing {items.length} item{items.length !== 1 ? 's' : ''}
        </p>
      </div>

      {items.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No inventory items</AlertTitle>
          <AlertDescription>
            There are currently no inventory items available.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const parsed = parseInventoryItem(item);

            return (
              <Link key={item.id} href={`/inventory/${parsed.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full overflow-hidden">
                  {/* Image */}
                  {parsed.firstImage && (
                    <div className="relative h-48 w-full bg-muted">
                      <Image
                        src={parsed.firstImage}
                        alt={parsed.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="line-clamp-2">{parsed.title}</CardTitle>
                      {parsed.condition && (
                        <Badge variant="secondary" className="shrink-0">
                          {parsed.condition}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {parsed.year && <span>{parsed.year} • </span>}
                      {parsed.manufacturer}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    {parsed.model && (
                      <p className="text-sm">
                        <span className="font-medium">Model:</span> {parsed.model}
                      </p>
                    )}
                    {parsed.equipmentType && (
                      <p className="text-sm">
                        <span className="font-medium">Type:</span> {parsed.equipmentType}
                      </p>
                    )}
                    {parsed.salesStatus && (
                      <Badge
                        variant={
                          parsed.salesStatus.toLowerCase().includes('available')
                            ? 'default'
                            : parsed.salesStatus.toLowerCase().includes('sold')
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {parsed.salesStatus}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
