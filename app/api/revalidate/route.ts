import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (token !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { slug } = body as { slug?: string };

    // Revalidate all inventory-related paths
    revalidatePath('/api/inventory', 'layout');
    revalidatePath('/api/inventory/homepage', 'layout');
    revalidatePath('/inventory', 'layout');
    revalidatePath('/', 'layout');

    // If a specific slug was provided, revalidate that detail page too
    if (slug) {
      revalidatePath(`/inventory/${slug}`, 'layout');
      revalidatePath(`/api/inventory/${slug}`, 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      slug: slug || 'all',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Revalidation failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
