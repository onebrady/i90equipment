/**
 * API Route: Fetch all inventory records from PostgreSQL
 *
 * This route fetches inventory data and leverages Next.js caching
 * to minimize DB load.
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Configure caching - revalidate every 5 minutes (300 seconds)
export const revalidate = 300; // 5 minutes

export async function GET() {
  try {
    const query = `
      SELECT 
        slug,
        year,
        brand,
        model,
        condition,
        advertised_price,
        optimized_images,
        category,
        description,
        title,
        status
      FROM inventory
      WHERE status = 'In Stock'
    `;

    const result = await db.query(query);

    const items = result.rows.map((row) => {
      const displayTitle = row.title || `${row.year} ${row.brand} ${row.model}`.trim();

      let firstImage = null;
      if (row.optimized_images && Array.isArray(row.optimized_images) && row.optimized_images.length > 0) {
        firstImage = row.optimized_images[0].fileUrl;
      }

      return {
        // Keep raw data just in case, but flattened
        ...row,
        id: row.slug, // Use slug as ID
        slug: row.slug,
        title: displayTitle,
        equipmentType: row.category,
        year: row.year,
        manufacturer: row.brand,
        model: row.model,
        price: row.advertised_price ? `$${Number(row.advertised_price).toLocaleString()}` : null,
        condition: row.condition,
        description: row.description,
        firstImage: firstImage,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: items,
        count: items.length,
        cached_until: new Date(Date.now() + revalidate * 1000).toISOString(),
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=60`,
        },
      }
    );
  } catch (error) {
    console.error('Error fetching inventory:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch inventory',
      },
      { status: 500 }
    );
  }
}
