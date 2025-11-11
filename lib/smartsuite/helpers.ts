/**
 * SmartSuite Field Helpers
 * Utilities to extract and format data from SmartSuite records
 */

import type { SmartSuiteRecord } from './types';

/**
 * Extract text from SmartSuite rich text field
 */
export function getRichText(
  field: any
): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    return field.preview || field.html || '';
  }
  return '';
}

/**
 * Extract label from SmartSuite select/status field
 */
export function getSelectLabel(field: any): string {
  if (!field) return '';
  if (typeof field === 'object' && field.label) {
    return field.label;
  }
  return String(field);
}

/**
 * Extract value from SmartSuite select/status field
 */
export function getSelectValue(field: any): string {
  if (!field) return '';
  if (typeof field === 'object' && field.value) {
    return field.value;
  }
  return String(field);
}

/**
 * Extract first item from SmartSuite linked record field
 */
export function getLinkedRecord(field: any): { id: string; title: string } | null {
  if (!field) return null;
  if (Array.isArray(field) && field.length > 0) {
    return field[0];
  }
  return null;
}

/**
 * Extract all items from SmartSuite linked record field
 */
export function getLinkedRecords(field: any): { id: string; title: string }[] {
  if (!field) return [];
  if (Array.isArray(field)) {
    return field;
  }
  return [];
}

/**
 * Extract file URLs from SmartSuite file field
 */
export function getFiles(field: any): Array<{
  handle: string;
  url: string;
  filename: string;
  mimetype: string;
  size: number;
}> {
  if (!field || !Array.isArray(field)) return [];

  return field
    .filter((file) => file.url) // Only include files with URLs
    .map((file) => ({
      handle: file.handle,
      url: file.url, // URL must be set by API route
      filename: file.metadata?.filename || 'file',
      mimetype: file.metadata?.mimetype || 'application/octet-stream',
      size: file.metadata?.size || 0,
    }));
}

/**
 * Extract first image URL from SmartSuite file field
 */
export function getFirstImage(field: any): string | null {
  const files = getFiles(field);
  const imageFile = files.find((file) =>
    file.mimetype.startsWith('image/')
  );
  return imageFile?.url || null;
}

/**
 * Get all image URLs from SmartSuite file field
 */
export function getImages(field: any): string[] {
  const files = getFiles(field);
  return files
    .filter((file) => file.mimetype.startsWith('image/'))
    .map((file) => file.url);
}

/**
 * Format date from SmartSuite timestamp
 */
export function formatDate(timestamp: any, format: 'short' | 'long' = 'short'): string {
  if (!timestamp) return '';

  let dateString: string;
  if (typeof timestamp === 'object' && timestamp.on) {
    dateString = timestamp.on;
  } else if (typeof timestamp === 'string') {
    dateString = timestamp;
  } else {
    return '';
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  if (format === 'short') {
    return date.toLocaleDateString();
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format price as USD currency (whole numbers only, with commas)
 */
export function formatPrice(price: any): string {
  if (!price && price !== 0) return '';

  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) return '';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}

/**
 * Strip HTML tags and truncate text to a character limit
 */
export function stripHtmlAndTruncate(html: string, maxLength: number = 150): string {
  if (!html) return '';

  // Replace <br> tags with spaces (all variants)
  let text = html.replace(/<br\s*\/?>/gi, ' ');

  // Strip all other HTML tags
  text = text.replace(/<[^>]*>/g, '');

  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");

  // Replace multiple spaces with single space
  text = text.replace(/\s+/g, ' ');

  // Trim whitespace
  text = text.trim();

  // Truncate if needed
  if (text.length > maxLength) {
    // Find the last space before the limit to avoid cutting words
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > 0) {
      text = truncated.substring(0, lastSpace) + '...';
    } else {
      text = truncated + '...';
    }
  }

  return text;
}

/**
 * Example mapping for your inventory fields
 * Customize these field IDs to match your SmartSuite table
 */
export interface InventoryItem extends SmartSuiteRecord {
  // Standard fields
  title: string;
  description: any;
  autonumber: number;

  // Custom field IDs (update these to match your table)
  sc7cd7026e?: string; // Year
  s96205b0ac?: string; // Model
  s01296f69c?: string; // VIN
  sb1892731b?: { label: string; value: string }; // Condition (Used/New)
  s934963a2a?: { label: string; value: string }; // Sales Status
  se69701513?: { label: string; value: string }; // Equipment Type
  s466e534ca?: { label: string; value: string }; // Another Status
  sd7ea2e708?: Array<{ id: string; title: string }>; // Salesperson
  s3aa410cc9?: Array<{ id: string; title: string }>; // Dealer/Location
  s47d53952b?: Array<{ id: string; title: string }>; // Manufacturer
  s5c4a6b7c3?: any[]; // Files/Photos (old field)
  s7fea29195?: any[]; // Images (old field)
  sc577d7e98?: any[]; // Images (primary image field)
  sbbb93f261?: number | string; // Price
  sd70909ac5?: string; // Product Title
  s3de57aeca?: string; // Description (HTML content)
  scccefe375?: string; // Slug
  scc81eb170?: number | string; // Quantity Available
}

/**
 * Helper to extract commonly used fields from an inventory item
 */
export function parseInventoryItem(item: InventoryItem) {
  // Use sc577d7e98 as primary image field, fallback to s7fea29195 or s5c4a6b7c3
  const imageField = item.sc577d7e98 || item.s7fea29195 || item.s5c4a6b7c3;

  // Get description text and strip HTML
  const rawDescription = getRichText(item.description) || '';
  const cleanDescription = stripHtmlAndTruncate(rawDescription, 150);

  return {
    id: item.id,
    slug: item.scccefe375 || '',
    title: item.sd70909ac5 || item.title || '',
    description: cleanDescription,
    fullDescription: item.s3de57aeca || '', // Keep full HTML for detail page
    year: item.sc7cd7026e || '',
    model: item.s96205b0ac || '',
    vin: item.s01296f69c || '',
    condition: getSelectLabel(item.sb1892731b),
    salesStatus: getSelectLabel(item.s934963a2a),
    equipmentType: getSelectLabel(item.se69701513),
    manufacturer: getLinkedRecord(item.s47d53952b)?.title || '',
    location: getLinkedRecord(item.s3aa410cc9)?.title || '',
    salesperson: getLinkedRecord(item.sd7ea2e708)?.title || '',
    price: formatPrice(item.sbbb93f261),
    qty: item.scc81eb170 || '',
    images: getImages(imageField),
    files: getFiles(item.s5c4a6b7c3),
    firstImage: getFirstImage(imageField),
  };
}
