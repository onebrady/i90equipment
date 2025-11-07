# SmartSuite Inventory Integration

This document explains how to integrate and use the SmartSuite API to fetch inventory data with proper caching to respect API rate limits.

## Overview

The integration uses a multi-layer caching strategy:

1. **Next.js Route Handlers** - Server-side caching (5-10 minutes)
2. **React Query** - Client-side caching (5-10 minutes)
3. **CDN/Browser Cache** - Edge caching via Cache-Control headers

This approach minimizes API calls to SmartSuite while keeping data relatively fresh.

## Setup

### 1. Get SmartSuite Credentials

You'll need three values from SmartSuite:

- **API Key**: Found in SmartSuite account settings
- **Account ID**: Your workspace/account ID
- **Table ID**: The ID of your inventory table

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual credentials:

```env
SMARTSUITE_API_KEY=your_actual_api_key
SMARTSUITE_ACCOUNT_ID=your_actual_account_id
SMARTSUITE_INVENTORY_TABLE_ID=your_actual_table_id
```

### 3. Install Dependencies

Dependencies are already included in `package.json`:
- `@tanstack/react-query` - Client-side caching and data fetching

## Architecture

### API Client (`lib/smartsuite/`)

The core SmartSuite client handles all API communication:

```typescript
import { getSmartSuiteClient } from '@/lib/smartsuite';

const client = getSmartSuiteClient(tableId);
const records = await client.listAllRecords(tableId);
```

**Key Features:**
- Automatic pagination for large datasets
- Proper authentication headers
- Type-safe responses
- Error handling

### API Routes (`app/api/inventory/`)

Next.js Route Handlers with built-in caching:

- `GET /api/inventory` - List all inventory items (5min cache)
- `GET /api/inventory/[id]` - Get single item (10min cache)

**Cache Configuration:**
```typescript
export const revalidate = 300; // 5 minutes
```

### React Query Hooks (`lib/hooks/use-inventory.ts`)

Client-side hooks for components:

```typescript
import { useInventory, useInventoryItem } from '@/lib/hooks/use-inventory';

// In your component
const { data, isLoading, error } = useInventory();
const { data: item } = useInventoryItem(id);
```

**Features:**
- Automatic background refetching
- Optimistic updates
- Prevents duplicate requests
- Configurable stale times

## Usage Examples

### Display All Inventory Items

```typescript
'use client';

import { useInventory } from '@/lib/hooks/use-inventory';

export default function InventoryList() {
  const { data, isLoading, error } = useInventory();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

### Display Single Inventory Item

```typescript
'use client';

import { useInventoryItem } from '@/lib/hooks/use-inventory';

export default function InventoryDetail({ id }: { id: string }) {
  const { data, isLoading, error } = useInventoryItem(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.data.title}</div>;
}
```

## Caching Strategy

### Why Multi-Layer Caching?

1. **Reduces API Calls**: Avoids hitting SmartSuite rate limits
2. **Improves Performance**: Faster page loads with cached data
3. **Cost Effective**: Fewer API requests = lower costs
4. **Better UX**: Users see content instantly

### Cache Durations

| Layer | Duration | Purpose |
|-------|----------|---------|
| Next.js Route | 5-10 min | Server-side cache for all users |
| React Query | 5-10 min | Client-side cache per user |
| CDN/Browser | 5-10 min | Edge cache and browser cache |
| Stale-while-revalidate | 10-20 min | Serve stale content while refreshing |

### Adjusting Cache Times

To change cache duration, edit:

**Server-side (Route Handlers):**
```typescript
// app/api/inventory/route.ts
export const revalidate = 300; // seconds
```

**Client-side (React Query):**
```typescript
// lib/hooks/use-inventory.ts
staleTime: 5 * 60 * 1000, // milliseconds
```

## Rate Limits

SmartSuite API rate limits are not publicly documented. Our caching strategy is conservative:

- **Minimum cache**: 5 minutes
- **Maximum requests per hour**: ~24 (with 5min cache)
- **Automatic pagination**: Handles large datasets efficiently

If you encounter rate limit errors:
1. Increase cache durations
2. Reduce concurrent requests
3. Contact SmartSuite support for rate limit details

## Customizing for Your Data

The current implementation uses generic field names (`title`, `description`). Update these to match your SmartSuite table schema:

1. Update types in `lib/smartsuite/types.ts`
2. Modify display logic in `app/inventory/page.tsx`
3. Update detail page in `app/inventory/[id]/page.tsx`

Example for custom fields:

```typescript
interface InventoryItem extends SmartSuiteRecord {
  name: string;
  model: string;
  price: number;
  status: string;
  images: string[];
}
```

## Troubleshooting

### Environment Variables Not Loading

Ensure `.env.local` exists and restart the dev server:

```bash
npm run dev
```

### API Errors

Check the browser console and server logs for detailed error messages. Common issues:

- Invalid API key
- Wrong account ID
- Incorrect table ID
- Network connectivity

### Cache Not Working

Force clear caches:

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
npm run dev
```

## Production Considerations

1. **Environment Variables**: Set in your hosting platform (Vercel, etc.)
2. **CDN Caching**: Ensure Cache-Control headers are respected
3. **Monitoring**: Track API usage and cache hit rates
4. **Fallbacks**: Implement error boundaries for API failures

## Additional Resources

- [SmartSuite API Documentation](https://developers.smartsuite.com/docs/intro)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Next.js Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching)
