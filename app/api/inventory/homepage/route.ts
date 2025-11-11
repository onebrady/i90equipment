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

    // Collect all first image handles
    const imageHandles: string[] = [];
    const itemIndexMap = new Map<string, number>();

    response.items.forEach((item: any, index: number) => {
      const imageField = item.sc577d7e98;
      if (imageField && Array.isArray(imageField) && imageField.length > 0) {
        const firstImage = imageField[0];
        if (firstImage.handle) {
          imageHandles.push(firstImage.handle);
          itemIndexMap.set(firstImage.handle, index);
        }
      }
    });

    // Fetch all URLs in rate-limited batches (3 at a time, 500ms delay)
    const urlMap = await client.getFileUrls(imageHandles, 3, 500);

    // Apply URLs to items
    const itemsWithImageUrls = response.items.map((item: any) => {
      const imageField = item.sc577d7e98;
      if (imageField && Array.isArray(imageField) && imageField.length > 0) {
        const firstImage = imageField[0];
        if (firstImage.handle && urlMap.has(firstImage.handle)) {
          return {
            ...item,
            sc577d7e98: [
              {
                ...firstImage,
                url: urlMap.get(firstImage.handle),
              },
              ...imageField.slice(1),
            ],
          };
        }
      }
      return item;
    });

    // Return all items with image URLs
    return NextResponse.json(
      {
        success: true,
        data: itemsWithImageUrls,
        count: itemsWithImageUrls.length,
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
