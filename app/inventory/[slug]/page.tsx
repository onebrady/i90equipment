/**
 * Dynamic Inventory Item Page
 * Server Component with SEO metadata and Product schema
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import InventoryItemClient, { InventoryItemData } from './InventoryItemClient';

interface InventoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch inventory item data
async function getInventoryItem(slug: string): Promise<InventoryItemData | null> {
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
        status,
        web_description
      FROM inventory
      WHERE slug = $1
      LIMIT 1
    `;

    const result = await db.query(query, [slug]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    const displayTitle = row.title || `${row.year} ${row.brand} ${row.model}`.trim();

    // Map images to simple array of URLs
    let images: string[] = [];
    if (row.optimized_images && Array.isArray(row.optimized_images)) {
      images = row.optimized_images.map((img: any) => img.fileUrl);
    }

    return {
      id: row.slug,
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
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    return null;
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: InventoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getInventoryItem(slug);

  if (!item) {
    return {
      title: 'Item Not Found | I90 Equipment',
    };
  }

  const title = `${item.title} for Sale | I90 Equipment Montana`;
  const description = item.description
    ? `${item.description} Available at I90 Equipment in Belgrade, MT. Call (406) 939-2153.`
    : `${item.title} available at I90 Equipment in Belgrade, Montana. Quality heavy equipment with financing available. Call (406) 939-2153.`;

  return {
    title,
    description,
    keywords: `${item.title}, ${item.equipmentType || 'trailer'} for sale Montana, ${item.manufacturer || ''} ${item.model || ''}, heavy equipment Belgrade MT`.trim(),
    openGraph: {
      title: `${item.title} for Sale`,
      description,
      type: 'website',
      url: `https://i90equipment.com/inventory/${item.slug}`,
      images: item.firstImage ? [
        {
          url: item.firstImage,
          width: 1374,
          height: 920,
          alt: item.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.title} for Sale`,
      description,
      images: item.firstImage ? [item.firstImage] : undefined,
    },
  };
}

export default async function InventoryItemPage({ params }: InventoryPageProps) {
  const { slug } = await params;
  const item = await getInventoryItem(slug);

  if (!item) {
    notFound();
  }

  // Product schema for rich snippets
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.title,
    description: item.description || item.fullDescription,
    image: item.images,
    brand: item.manufacturer ? {
      '@type': 'Brand',
      name: item.manufacturer,
    } : undefined,
    offers: {
      '@type': 'Offer',
      url: `https://i90equipment.com/inventory/${item.slug}`,
      priceCurrency: 'USD',
      price: item.price ? item.price.replace(/[$,]/g, '') : undefined,
      availability: 'https://schema.org/InStock',
      itemCondition: item.condition === 'New'
        ? 'https://schema.org/NewCondition'
        : 'https://schema.org/UsedCondition',
      seller: {
        '@type': 'LocalBusiness',
        name: 'I90 Equipment',
        telephone: '+1-406-939-2153',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '70 Pipkin Way',
          addressLocality: 'Belgrade',
          addressRegion: 'MT',
          postalCode: '59714',
          addressCountry: 'US',
        },
      },
    },
    category: item.equipmentType,
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://i90equipment.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Inventory',
        item: 'https://i90equipment.com/inventory',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: item.title,
        item: `https://i90equipment.com/inventory/${item.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <InventoryItemClient item={item} />
    </>
  );
}
