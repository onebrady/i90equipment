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

    // Fetch authenticated URLs for all images with robust error handling
    const imageField = item.sc577d7e98;
    if (imageField && Array.isArray(imageField) && imageField.length > 0) {
      const imagesWithUrls = [];
      let successCount = 0;
      let failCount = 0;

      // Fetch URLs sequentially with delays to avoid rate limiting
      for (let i = 0; i < imageField.length; i++) {
        const image = imageField[i];
        if (image.handle) {
          try {
            const imageUrl = await client.getFileUrl(image.handle);
            if (imageUrl) {
              imagesWithUrls.push({
                ...image,
                url: imageUrl,
              });
              successCount++;
            } else {
              // If getFileUrl returns null, try again with longer delay
              console.warn(`First attempt failed for ${image.handle}, retrying...`);
              await new Promise(resolve => setTimeout(resolve, 500));
              const retryUrl = await client.getFileUrl(image.handle);
              imagesWithUrls.push({
                ...image,
                url: retryUrl || `https://cdn.filestackcontent.com/${image.handle}`,
              });
              if (retryUrl) successCount++;
              else failCount++;
            }
            // Progressive delay - increase delay as we process more images
            const delay = 200 + (i * 50); // Start at 200ms, increase by 50ms per image
            await new Promise(resolve => setTimeout(resolve, delay));
          } catch (err) {
            console.error(`Failed to fetch URL for ${image.handle}:`, err);
            failCount++;
            // Use fallback CDN URL as last resort
            imagesWithUrls.push({
              ...image,
              url: `https://cdn.filestackcontent.com/${image.handle}`,
            });
          }
        } else {
          imagesWithUrls.push(image);
        }
      }

      console.log(`Image URL fetch: ${successCount} succeeded, ${failCount} failed/fallback`);
      item.sc577d7e98 = imagesWithUrls;
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
