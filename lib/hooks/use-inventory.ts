/**
 * React Query hooks for inventory data
 * Provides client-side caching on top of server-side caching
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import type { SmartSuiteRecord } from '@/lib/smartsuite';

interface InventoryResponse {
  success: boolean;
  data: SmartSuiteRecord[];
  count: number;
  cached_until: string;
}

interface InventoryItemResponse {
  success: boolean;
  data: SmartSuiteRecord;
  cached_until: string;
}

/**
 * Fetch all inventory items
 * Cached for 5 minutes on client side
 */
export function useInventory() {
  return useQuery<InventoryResponse>({
    queryKey: ['inventory'],
    queryFn: async () => {
      const response = await fetch('/api/inventory');

      if (!response.ok) {
        throw new Error('Failed to fetch inventory');
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // Don't refetch on window focus since data changes infrequently
    refetchOnMount: false, // Don't refetch on mount if data exists
  });
}

/**
 * Fetch a single inventory item by ID
 * Cached for 10 minutes on client side
 */
export function useInventoryItem(id: string | null | undefined) {
  return useQuery<InventoryItemResponse>({
    queryKey: ['inventory', id],
    queryFn: async () => {
      if (!id) throw new Error('No ID provided');

      const response = await fetch(`/api/inventory/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch inventory item');
      }

      return response.json();
    },
    enabled: !!id, // Only run query if ID is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

/**
 * Fetch "In Stock" inventory for homepage
 * Cached for 5 minutes on client side
 */
export function useHomepageInventory() {
  return useQuery<InventoryResponse>({
    queryKey: ['inventory', 'homepage'],
    queryFn: async () => {
      const response = await fetch('/api/inventory/homepage');

      if (!response.ok) {
        throw new Error('Failed to fetch homepage inventory');
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
