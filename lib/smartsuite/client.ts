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
   */
  async getFileUrl(fileHandle: string): Promise<string | null> {
    const url = `${this.baseUrl}/shared-files/${fileHandle}/url/`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.apiKey}`,
        'ACCOUNT-ID': this.accountId,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to get file URL for handle ${fileHandle}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.url || null;
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
