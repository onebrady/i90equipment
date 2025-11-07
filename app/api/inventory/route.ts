/**
 * API Route: Fetch all inventory records from SmartSuite
 *
 * This route fetches inventory data and leverages Next.js caching
 * to minimize API calls to SmartSuite and respect rate limits.
 */

import { NextResponse } from 'next/server';
import { getSmartSuiteClient } from '@/lib/smartsuite';

// Configure caching - revalidate every 5 minutes (300 seconds)
// This ensures we don't hit rate limits while keeping data relatively fresh
export const revalidate = 300; // 5 minutes

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

    // Fetch all inventory records
    const records = await client.listAllRecords(tableId, {
      hydrated: true, // Get text labels for ID fields
    });

    return NextResponse.json(
      {
        success: true,
        data: records,
        count: records.length,
        cached_until: new Date(Date.now() + revalidate * 1000).toISOString(),
      },
      {
        headers: {
          // Additional cache control headers for CDN/browser caching
          'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate * 2}`,
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
