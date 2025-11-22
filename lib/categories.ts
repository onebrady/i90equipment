/**
 * Category configuration for dedicated landing pages
 */

export interface CategoryConfig {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  heroImage: string; // Path to image in /public folder
  metaDescription: string;
}

export const categories: Record<string, CategoryConfig> = {
  'bottom-dumps': {
    slug: 'bottom-dumps',
    name: 'Bottom Dumps',
    title: 'Bottom Dump Trailers',
    subtitle: 'Heavy-duty bottom dump trailers built for efficient material hauling and quick unloading in demanding construction environments',
    heroImage: '/categories/bottom-dumps.jpg',
    metaDescription: 'Browse our selection of bottom dump trailers for sale in Montana. Quality construction equipment from trusted manufacturers.',
  },
  'flatbeds': {
    slug: 'flatbeds',
    name: 'Flatbeds',
    title: 'Flatbed Trailers',
    subtitle: 'Versatile flatbed trailers designed for transporting oversized loads, equipment, and materials with maximum flexibility',
    heroImage: '/categories/flatbeds.jpg',
    metaDescription: 'Shop flatbed trailers for sale in Montana. Durable construction trailers for heavy equipment transport.',
  },
  'lowboys': {
    slug: 'lowboys',
    name: 'Lowboys',
    title: 'Lowboy Trailers',
    subtitle: 'Specialized lowboy trailers engineered for hauling tall and heavy equipment with low ground clearance requirements',
    heroImage: '/categories/lowboys.jpg',
    metaDescription: 'Find lowboy trailers for sale in Montana. Heavy haul trailers built for transporting oversized equipment.',
  },
  'side-dumps': {
    slug: 'side-dumps',
    name: 'Side Dumps',
    title: 'Side Dump Trailers',
    subtitle: 'High-capacity side dump trailers featuring hydraulic systems for safe, controlled material unloading on any terrain',
    heroImage: '/categories/side-dumps.jpg',
    metaDescription: 'Explore side dump trailers for sale in Montana. Reliable construction trailers with hydraulic dumping systems.',
  },
  'trucks': {
    slug: 'trucks',
    name: 'Trucks',
    title: 'Heavy Haul Trucks',
    subtitle: 'Powerful heavy-duty trucks built to handle the toughest hauling jobs and extreme working conditions',
    heroImage: '/categories/trucks.jpg',
    metaDescription: 'Browse heavy haul trucks for sale in Montana. Commercial trucks built for construction and heavy equipment transport.',
  },
};

export const getCategoryBySlug = (slug: string): CategoryConfig | undefined => {
  return categories[slug];
};

export const getCategoryByName = (name: string): CategoryConfig | undefined => {
  return Object.values(categories).find(cat => cat.name === name);
};

export const getAllCategories = (): CategoryConfig[] => {
  return Object.values(categories);
};
