/**
 * API Route: Fetch single inventory item by slug
 */

import { NextResponse } from 'next/server';
import { getSmartSuiteClient } from '@/lib/smartsuite';

// Cache for 1 hour - SmartSuite file URLs are valid for 20 years
export const revalidate = 3600;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const tableId = process.env.SMARTSUITE_INVENTORY_TABLE_ID;

    if (!tableId) {
      return NextResponse.json(
        { error: 'SMARTSUITE_INVENTORY_TABLE_ID not configured' },
        { status: 500 }
      );
    }

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    const client = getSmartSuiteClient(tableId);

    // Filter by slug field (scccefe375)
    const response = await client.listRecords(tableId, {
      hydrated: true,
      filter: {
        operator: 'and',
        fields: [
          {
            field: 'scccefe375',
            comparison: 'is',
            value: slug,
          },
        ],
      },
      limit: 1,
    });

    if (!response.items || response.items.length === 0) {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      );
    }

    const item = response.items[0];

    // Fetch authenticated URLs for images with rate limiting
    const imageField = item.sc577d7e98;
    if (imageField && Array.isArray(imageField) && imageField.length > 0) {
      try {
        // Collect all image handles
        const imageHandles = imageField
          .filter((img: any) => img.handle)
          .map((img: any) => img.handle);

        // Fetch URLs in batches (3 at a time, 500ms delay between batches)
        const urlMap = await client.getFileUrls(imageHandles, 3, 500);

        // Apply URLs to images
        const imagesWithUrls = imageField.map((image: any) => {
          if (image.handle && urlMap.has(image.handle)) {
            return {
              ...image,
              url: urlMap.get(image.handle),
            };
          }
          return image;
        });

        item.sc577d7e98 = imagesWithUrls;
      } catch (error) {
        console.error('Error processing images:', error);
        // Keep original image data if processing fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: item,
        cached_until: new Date(Date.now() + revalidate * 1000).toISOString(),
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate * 2}`,
        },
      }
    );
  } catch (error) {
    console.error('Error fetching inventory item:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch inventory item',
      },
      { status: 500 }
    );
  }
}
