/**
 * Inventory Listing Page
 * Server Component with SEO metadata that wraps client component
 */

import type { Metadata } from 'next';
import InventoryPageClient from './InventoryPageClient';

export const metadata: Metadata = {
  title: 'Heavy Equipment & Trailers for Sale | I90 Equipment Montana',
  description: 'Browse our selection of heavy-duty construction trailers for sale in Montana. Lowboys, side dumps, bottom dumps, flatbeds & trucks. Quality equipment with financing available.',
  keywords: 'trailers for sale Montana, heavy equipment Montana, lowboy trailers, side dump trailers, construction trailers Belgrade MT',
  openGraph: {
    title: 'Heavy Equipment & Trailers for Sale | I90 Equipment',
    description: 'Browse our selection of heavy-duty construction trailers for sale in Montana. Quality equipment with financing available.',
    type: 'website',
    url: 'https://i90equipment.com/inventory',
  },
};

export default function InventoryPage() {
  return <InventoryPageClient />;
}
