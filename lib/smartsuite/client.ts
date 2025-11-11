/**
 * SmartSuite API Client
 * Handles requests to SmartSuite API with proper authentication
 */

import type {
  SmartSuiteConfig,
  SmartSuiteListParams,
  SmartSuiteListResponse,
  SmartSuiteRecord,
} from './types';

export class SmartSuiteClient {
  private apiKey: string;
  private accountId: string;
  private baseUrl = 'https://app.smartsuite.com/api/v1';

  constructor(config: SmartSuiteConfig) {
    this.apiKey = config.apiKey;
    this.accountId = config.accountId;
  }

  /**
   * Fetch records from a SmartSuite table
   */
  async listRecords(
    tableId: string,
    params?: SmartSuiteListParams
  ): Promise<SmartSuiteListResponse> {
    const url = `${this.baseUrl}/applications/${tableId}/records/list/`;

    const queryParams = new URLSearchParams();
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.all) queryParams.append('all', params.all.toString());

    const fullUrl = queryParams.toString() ? `${url}?${queryParams}` : url;

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.apiKey}`,
        'ACCOUNT-ID': this.accountId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sort: params?.sort,
        filter: params?.filter,
        hydrated: params?.hydrated ?? true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `SmartSuite API error (${response.status}): ${errorText}`
      );
    }

    return response.json();
  }

  /**
   * Fetch all records from a table (handles pagination automatically)
   */
  async listAllRecords(
    tableId: string,
    params?: Omit<SmartSuiteListParams, 'offset' | 'limit'>
  ): Promise<SmartSuiteRecord[]> {
    const allRecords: SmartSuiteRecord[] = [];
    let offset = 0;
    const limit = 1000; // Maximum allowed per request

    while (true) {
      const response = await this.listRecords(tableId, {
        ...params,
        offset,
        limit,
      });

      allRecords.push(...response.items);

      // Check if we've fetched all records
      if (offset + response.items.length >= response.total) {
        break;
      }

      offset += limit;
    }

    return allRecords;
  }

  /**
   * Get a single record by ID
   */
  async getRecord(
    tableId: string,
    recordId: string
  ): Promise<SmartSuiteRecord | null> {
    const response = await this.listRecords(tableId, {
      filter: {
        id: recordId,
      },
      limit: 1,
    });

    return response.items[0] || null;
  }

  /**
   * Get public URL for a file by its handle
   * The URL lifetime is 20 years
   * Includes automatic retry with exponential backoff for rate limiting
   */
  async getFileUrl(fileHandle: string, retryCount = 0): Promise<string | null> {
    const url = `${this.baseUrl}/shared-files/${fileHandle}/url/`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'ACCOUNT-ID': this.accountId,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 429 && retryCount < 3) {
        // Rate limited - wait and retry with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, retryCount), 5000); // Max 5 seconds
        console.log(`Rate limited, retrying in ${delay}ms (attempt ${retryCount + 1}/3)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.getFileUrl(fileHandle, retryCount + 1);
      }

      if (!response.ok) {
        console.error(`Failed to get file URL for handle ${fileHandle}: ${response.status}`);
        return null;
      }

      const data = await response.json();
      return data.url || null;
    } catch (error) {
      console.error(`Error fetching file URL for ${fileHandle}:`, error);
      return null;
    }
  }

  /**
   * Get URLs for multiple files with rate limiting
   * Processes in batches with delays to avoid hitting rate limits
   */
  async getFileUrls(fileHandles: string[], batchSize = 3, delayMs = 500): Promise<Map<string, string>> {
    const urlMap = new Map<string, string>();

    // Process in batches
    for (let i = 0; i < fileHandles.length; i += batchSize) {
      const batch = fileHandles.slice(i, i + batchSize);

      // Fetch batch in parallel
      const results = await Promise.all(
        batch.map(async (handle) => {
          const url = await this.getFileUrl(handle);
          return { handle, url };
        })
      );

      // Store results
      results.forEach(({ handle, url }) => {
        if (url) {
          urlMap.set(handle, url);
        }
      });

      // Delay before next batch (except for last batch)
      if (i + batchSize < fileHandles.length) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    return urlMap;
  }
}

/**
 * Get a configured SmartSuite client instance
 */
export function getSmartSuiteClient(tableId: string): SmartSuiteClient {
  const apiKey = process.env.SMARTSUITE_API_KEY;
  const accountId = process.env.SMARTSUITE_ACCOUNT_ID;

  if (!apiKey || !accountId) {
    throw new Error(
      'SmartSuite credentials not configured. Set SMARTSUITE_API_KEY and SMARTSUITE_ACCOUNT_ID environment variables.'
    );
  }

  return new SmartSuiteClient({
    apiKey,
    accountId,
    tableId,
  });
}
