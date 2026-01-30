/**
 * Dynamic XML Sitemap for SEO
 * Generates sitemap.xml with all indexable pages
 */

import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { getAllCategories } from '@/lib/categories';

const BASE_URL = 'https://i90equipment.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/inventory`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Category pages
  const categories = getAllCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic inventory pages from database
  let inventoryPages: MetadataRoute.Sitemap = [];
  try {
    const result = await db.query(
      `SELECT slug FROM inventory WHERE status = 'In Stock'`
    );

    inventoryPages = result.rows.map((row) => ({
      url: `${BASE_URL}/inventory/${row.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching inventory for sitemap:', error);
    // Continue without inventory pages if DB fails
  }

  return [...staticPages, ...categoryPages, ...inventoryPages];
}
