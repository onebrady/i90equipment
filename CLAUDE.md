# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for I90 Equipment, a Montana-based heavy-duty construction trailer dealer. The site features:

- Server-side rendered pages with Next.js App Router
- SmartSuite CMS integration for dynamic inventory management
- Multi-layer caching strategy (server, client, CDN)
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS styling with custom brand colors
- Fillout.com form embeds for lead capture

**Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, React Query, SmartSuite API

## Essential Commands

```bash
# Development
pnpm dev             # Start dev server (default port 3000)
pnpm build           # Production build
pnpm start           # Start production server
pnpm lint            # Run ESLint

# Environment setup
cp .env.example .env.local    # Create local env file

# Install dependencies
pnpm install         # Install all dependencies
```

## Project Architecture

### Directory Structure

```
app/                    # Next.js App Router pages
  api/inventory/        # API routes for SmartSuite data
    route.ts           # GET /api/inventory (5min cache)
    [slug]/route.ts    # GET /api/inventory/[slug] (10min cache)
    homepage/route.ts  # GET /api/inventory/homepage (5min cache)
  inventory/           # Inventory listing and detail pages
  layout.tsx           # Root layout with Header/Footer
  page.tsx             # Homepage
components/            # React components
  ui/                  # Shadcn/ui components (generated, avoid editing)
  Header.tsx           # Site header with navigation
  Footer.tsx           # Site footer
  providers.tsx        # React Query provider wrapper
lib/                   # Utility libraries
  smartsuite/          # SmartSuite API client
    client.ts          # API client with auto-pagination
    types.ts           # TypeScript types
    helpers.ts         # Field parsing utilities
    index.ts           # Public exports
  hooks/               # React hooks
    use-inventory.ts   # React Query hooks for inventory
  utils.ts             # General utilities (cn, etc.)
```

### SmartSuite Integration Architecture

**Three-Layer Caching Strategy:**

1. **API Routes (Server)**: Next.js Route Handlers cache SmartSuite responses for 5-10 minutes using `export const revalidate`
2. **React Query (Client)**: Client-side cache prevents duplicate requests and enables optimistic updates
3. **CDN/Browser**: Cache-Control headers enable edge and browser caching

**Data Flow:**
```
Component → useInventory() hook → /api/inventory → SmartSuite API
                ↓                        ↓                ↓
          React Query Cache    Next.js Cache      External API
          (5-10min client)     (5-10min server)   (50+ records)
```

**Why This Architecture:**
- Minimizes SmartSuite API calls (max ~12-24/hour)
- Fast page loads with cached data
- Automatic background refresh
- Handles 50+ inventory items with pagination

### Component Pattern

Components follow this structure:

```typescript
'use client'; // Required for hooks/interactivity

import { useInventory } from '@/lib/hooks/use-inventory';
import { parseInventoryItem } from '@/lib/smartsuite';

export default function Component() {
  const { data, isLoading, error } = useInventory();

  if (isLoading) return <Skeleton />;
  if (error) return <Error />;

  return data?.data.map(item => {
    const parsed = parseInventoryItem(item);
    return <Card>{parsed.title}</Card>;
  });
}
```

### SmartSuite Field Mapping

The `parseInventoryItem()` helper in `lib/smartsuite/helpers.ts` maps SmartSuite field IDs to clean property names:

```typescript
// SmartSuite field IDs → Clean properties
sc7cd7026e → year
s96205b0ac → model
sb1892731b → condition (select field)
se69701513 → equipmentType (select field)
s47d53952b → manufacturer (linked record)
sc577d7e98 → images (file field)
sbbb93f261 → price
scccefe375 → slug
```

**Helper Functions:**
- `getRichText()` - Extract text from rich text fields
- `getSelectLabel()` - Get label from select/status fields
- `getLinkedRecord()` - Get first linked record title
- `getImages()` - Get all image URLs from file field
- `formatPrice()` - Format numbers as USD currency
- `stripHtmlAndTruncate()` - Clean HTML and truncate

## Key Concepts

### Path Aliases

Use `@/` for imports from project root:

```typescript
import { Button } from '@/components/ui/button';
import { parseInventoryItem } from '@/lib/smartsuite';
```

### TypeScript Configuration

- `strict: false` - TypeScript is relaxed for faster development
- `baseUrl: "."` - Enable absolute imports
- Excludes old Vite source files (`src-vite-old/`)

### Styling with Tailwind

Custom brand colors defined in `tailwind.config.ts`:
- `primary` - Navy blue (#1e3a5f)
- `secondary` - Orange (#ff6b35)
- `charcoal` - Dark gray text
- `light-gray` - Background color

Use CSS variables for consistency:
```tsx
<div className="bg-primary text-primary-foreground">
```

### Environment Variables

Required for SmartSuite integration (set in `.env.local`):

```env
SMARTSUITE_API_KEY=...
SMARTSUITE_ACCOUNT_ID=...
SMARTSUITE_INVENTORY_TABLE_ID=...
```

Access in code: `process.env.SMARTSUITE_API_KEY`

### Form Embeds

Uses Fillout.com forms via `@fillout/react`:

```typescript
import { FilloutStandardEmbed } from '@fillout/react';

<FilloutStandardEmbed filloutId="form_id" />
```

Script loaded in `layout.tsx` via Next.js `<Script>` tag.

## Common Tasks

### Adding a New Page

1. Create file in `app/` directory: `app/my-page/page.tsx`
2. Export default component
3. Add navigation link in `components/Header.tsx`
4. Update metadata if needed

### Fetching Inventory Data

**List all items:**
```typescript
import { useInventory } from '@/lib/hooks/use-inventory';

const { data, isLoading } = useInventory();
const items = data?.data || [];
```

**Single item by slug:**
```typescript
import { useInventoryItem } from '@/lib/hooks/use-inventory';

const { data } = useInventoryItem(slug);
const item = data?.data;
```

### Parsing SmartSuite Fields

Always use helper functions to extract data:

```typescript
import { parseInventoryItem } from '@/lib/smartsuite';

const parsed = parseInventoryItem(rawItem);
// Access: parsed.title, parsed.price, parsed.images, etc.
```

### Adding New SmartSuite Fields

1. Update `InventoryItem` interface in `lib/smartsuite/helpers.ts`
2. Add field ID and type annotation
3. Update `parseInventoryItem()` to map the field
4. Use helper functions (`getSelectLabel`, `getLinkedRecord`, etc.)

### Modifying Cache Duration

**Server cache (API routes):**
```typescript
// app/api/inventory/route.ts
export const revalidate = 300; // seconds (5 min)
```

**Client cache (React Query):**
```typescript
// lib/hooks/use-inventory.ts
staleTime: 5 * 60 * 1000, // milliseconds
```

### Working with shadcn/ui Components

Components in `components/ui/` are generated by shadcn. To add new components:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Don't manually edit these files - they may be regenerated.

### Debugging SmartSuite Integration

1. Check API route directly: `http://localhost:3000/api/inventory`
2. Inspect browser console for React Query errors
3. Check server logs for SmartSuite API errors
4. Verify env variables are loaded: `console.log(process.env.SMARTSUITE_API_KEY)`
5. Test field parsing with `console.log(parseInventoryItem(item))`

## Important Files

- `SMARTSUITE_INTEGRATION.md` - Comprehensive SmartSuite setup guide
- `SMARTSUITE_QUICKSTART.md` - Quick reference for SmartSuite integration
- `app/layout.tsx` - Root layout with SEO metadata and structured data
- `lib/smartsuite/helpers.ts` - All SmartSuite field parsing logic
- `lib/hooks/use-inventory.ts` - React Query hooks for data fetching
- `tailwind.config.ts` - Brand colors and design tokens
- `next.config.ts` - Next.js configuration (minimal)

## Migration Notes

This project was migrated from Vite to Next.js. Old Vite files remain in deleted state:
- `src/` directory (old Vite app)
- `vite.config.ts`, `index.html`
- Old tsconfig files

New Next.js structure uses `app/` directory and Next.js conventions.

## SEO and Analytics

- Structured data (JSON-LD) for local business in `app/layout.tsx`
- Open Graph tags configured in metadata
- Phone: (406) 939-2153
- Location: Belgrade, MT
- Service area: Montana
