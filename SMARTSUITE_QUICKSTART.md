# SmartSuite Integration - Quick Start Guide

## Status: ✅ Working!

Your SmartSuite integration is successfully connected and caching **51 inventory items**.

## What's Working

- ✅ API connection to SmartSuite
- ✅ 3-layer caching (5-10 minute intervals)
- ✅ Automatic pagination for all records
- ✅ Dynamic routes for individual items
- ✅ React Query client-side caching

## Quick Test

Visit these URLs to test:

- **All Inventory**: http://localhost:3001/inventory
- **Single Item**: http://localhost:3001/inventory/68c32fd1d72143898da9f18f
- **API Endpoint**: http://localhost:3001/api/inventory

## Your Inventory Fields

Based on your SmartSuite data, here are the key fields:

| Field | SmartSuite ID | Example Value |
|-------|---------------|---------------|
| Title | `title` | "Used 2023 SmithCo SX5-49-38 Side Dumps #130" |
| Year | `sc7cd7026e` | "2023" |
| Model | `s96205b0ac` | "SX5-49-38" |
| VIN | `s01296f69c` | "1S9SS4953PL476557" |
| Condition | `sb1892731b` | {label: "Used", value: "RtBSD"} |
| Sales Status | `s934963a2a` | {label: "Sold", value: "in_progress"} |
| Equipment Type | `se69701513` | {label: "Side Dumps", value: "Jxbpd"} |
| Manufacturer | `s47d53952b` | [{title: "SmithCo"}] |
| Dealer/Location | `s3aa410cc9` | [{title: "WesternTruck - Salt Lake City"}] |
| Salesperson | `sd7ea2e708` | [{title: "Chad Sundquist"}] |
| Files/Photos | `s5c4a6b7c3` | Array of file objects |

## Using the Helpers

I've created helper functions to parse SmartSuite fields easily:

```typescript
import { parseInventoryItem, type InventoryItem } from '@/lib/smartsuite';

const item = data.data[0] as InventoryItem;
const parsed = parseInventoryItem(item);

// Now you have clean, typed data:
parsed.title          // "Used 2023 SmithCo..."
parsed.year           // "2023"
parsed.model          // "SX5-49-38"
parsed.vin            // "1S9SS4953PL476557"
parsed.condition      // "Used"
parsed.salesStatus    // "Sold"
parsed.equipmentType  // "Side Dumps"
parsed.manufacturer   // "SmithCo"
parsed.location       // "WesternTruck - Salt Lake City"
parsed.salesperson    // "Chad Sundquist"
parsed.firstImage     // URL to first image
parsed.images         // Array of all image URLs
parsed.files          // Array of all files
```

## Available Helper Functions

Located in `lib/smartsuite/helpers.ts`:

- `getRichText(field)` - Extract text from rich text fields
- `getSelectLabel(field)` - Get label from select/status fields
- `getLinkedRecord(field)` - Get first linked record
- `getLinkedRecords(field)` - Get all linked records
- `getFiles(field)` - Get all file attachments
- `getImages(field)` - Get all image URLs
- `getFirstImage(field)` - Get first image URL
- `formatDate(timestamp)` - Format date timestamps
- `parseInventoryItem(item)` - Parse entire inventory item

## Example Implementation

See `app/inventory/example-with-helpers.tsx` for a complete example showing:

- ✅ Loading states with skeletons
- ✅ Error handling
- ✅ Image display
- ✅ Status badges
- ✅ Proper field parsing
- ✅ Responsive grid layout

Copy the code from that file into your actual pages to get a fully-featured inventory display.

## Customizing Display

To customize what fields appear, edit:

1. **Field Mapping**: Update field IDs in `lib/smartsuite/helpers.ts` (InventoryItem interface)
2. **Display Logic**: Modify `app/inventory/page.tsx` to show different fields
3. **Styling**: Update Tailwind classes in the components

## Cache Behavior

The integration caches data at multiple levels:

- **Server Cache**: API routes cache for 5-10 minutes
- **Client Cache**: React Query caches for 5-10 minutes
- **CDN Cache**: Browser/edge cache for additional performance

This means SmartSuite is queried approximately **once every 5 minutes maximum** across all users.

## Rate Limit Protection

Current configuration:
- ✅ Maximum ~12-24 API calls per hour
- ✅ Automatic pagination for large datasets
- ✅ Stale-while-revalidate for seamless updates
- ✅ No duplicate requests from multiple users

## Next Steps

1. **Customize the display** - Update `app/inventory/page.tsx` with fields you want to show
2. **Style the pages** - Add your branding and design
3. **Add filtering** - Implement search/filter by equipment type, condition, etc.
4. **Add detail pages** - Customize `app/inventory/[id]/page.tsx` for individual items
5. **Add images** - Use `parsed.images` to display equipment photos

## Testing Changes

1. Make changes to files
2. Next.js hot reload will update automatically
3. Visit http://localhost:3001/inventory
4. Check browser console for any errors

## Production Deployment

When deploying, ensure you:

1. Set environment variables in your hosting platform
2. Run `npm run build` to verify production build
3. Test caching behavior in production
4. Monitor API usage if SmartSuite provides analytics

## Support

- Full documentation: `SMARTSUITE_INTEGRATION.md`
- SmartSuite API docs: https://developers.smartsuite.com/docs/intro
- React Query docs: https://tanstack.com/query/latest
