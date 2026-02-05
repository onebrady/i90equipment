/**
 * API Route: Fetch single inventory item by slug from PostgreSQL
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Cache for 1 hour
export const revalidate = 3600;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

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
        status,
        web_description
      FROM inventory
      WHERE slug = $1
      LIMIT 1
    `;

    const result = await db.query(query, [slug]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      );
    }

    const row = result.rows[0];
    const displayTitle = row.title || `${row.year} ${row.brand} ${row.model}`.trim();

    // Map images to simple array of URLs for the frontend
    let images: string[] = [];
    if (row.optimized_images && Array.isArray(row.optimized_images)) {
      images = row.optimized_images.map((img: any) => img.fileUrl);
    }

    const item = {
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
      description: row.description ? (row.description.length > 150 ? row.description.substring(0, 150) + '...' : row.description) : null,
      fullDescription: row.web_description || row.description,
      images: images,
      firstImage: images.length > 0 ? images[0] : null,
      salesStatus: row.status
    };

    return NextResponse.json(
      {
        success: true,
        data: item,
        cached_until: new Date(Date.now() + revalidate * 1000).toISOString(),
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=60`,
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
