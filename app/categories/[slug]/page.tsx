/**
 * Category Landing Page
 * Displays inventory filtered by category with promotional cards for other categories
 */

import { Metadata } from 'next';
import { getCategoryBySlug, getAllCategories } from '@/lib/categories';
import CategoryPageClient from './CategoryPageClient';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for each category page
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} for Sale in Montana | I90 Equipment`,
    description: category.metaDescription,
    openGraph: {
      title: `${category.title} for Sale in Montana`,
      description: category.metaDescription,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryPageClient slug={params.slug} />;
}
