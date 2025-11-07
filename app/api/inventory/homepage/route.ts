/**
 * API Route: Fetch "In Stock" inventory for homepage
 * Filters for items with status "In Stock" only
 */

import { NextResponse } from 'next/server';
import { getSmartSuiteClient } from '@/lib/smartsuite';

// Cache for 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const tableId = process.env.SMARTSUITE_INVENTORY_TABLE_ID;

    if (!tableId) {
      return NextResponse.json(
        { error: 'SMARTSUITE_INVENTORY_TABLE_ID not configured' },
        { status: 500 }
      );
    }

    const client = getSmartSuiteClient(tableId);

    // Fetch inventory with filters:
    // s934963a2a - status field ("In Stock" = "backlog")
    // scccefe375 - slug field (must not be empty)
    // sc577d7e98 - images field (must have values)
    const response = await client.listRecords(tableId, {
      hydrated: true,
      filter: {
        operator: 'and',
        fields: [
          {
            field: 's934963a2a',
            comparison: 'is',
            value: 'backlog',
          },
          {
            field: 'scccefe375',
            comparison: 'is_not_empty',
            value: null,
          },
          {
            field: 'sc577d7e98',
            comparison: 'is_not_empty',
            value: null,
          },
        ],
      },
      limit: 1000,
    });

    // Only fetch image URLs for the first 6 items (homepage displays 6)
    // This prevents hitting rate limits
    const itemsToDisplay = response.items.slice(0, 6);
    const remainingItems = response.items.slice(6);

    // Fetch the first image URL for each of the 6 displayed items
    // sc577d7e98 is the image field
    const itemsWithImageUrls = await Promise.all(
      itemsToDisplay.map(async (item: any) => {
        // Get the first image handle if it exists
        const imageField = item.sc577d7e98;
        if (imageField && Array.isArray(imageField) && imageField.length > 0) {
          const firstImage = imageField[0];
          if (firstImage.handle) {
            try {
              const imageUrl = await client.getFileUrl(firstImage.handle);
              // Add the imageUrl to the first image object
              return {
                ...item,
                sc577d7e98: [
                  {
                    ...firstImage,
                    url: imageUrl,
                  },
                  ...imageField.slice(1), // Keep remaining images without URLs
                ],
              };
            } catch (error) {
              console.error(`Failed to fetch image URL for ${item.id}:`, error);
            }
          }
        }
        return item;
      })
    );

    // Return only the 6 items with image URLs
    return NextResponse.json(
      {
        success: true,
        data: itemsWithImageUrls,
        count: itemsWithImageUrls.length,
        total: response.items.length, // Total in stock count
        cached_until: new Date(Date.now() + revalidate * 1000).toISOString(),
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate * 2}`,
        },
      }
    );
  } catch (error) {
    console.error('Error fetching homepage inventory:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch inventory',
      },
      { status: 500 }
    );
  }
}
