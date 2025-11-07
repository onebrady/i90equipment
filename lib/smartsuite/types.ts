/**
 * SmartSuite API Types
 */

export interface SmartSuiteRecord {
  id: string;
  [key: string]: any; // Records contain dynamic fields based on your table structure
}

export interface SmartSuiteListResponse {
  total: number;
  offset: number;
  limit: number;
  items: SmartSuiteRecord[];
}

export interface SmartSuiteListParams {
  offset?: number;
  limit?: number;
  all?: boolean;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  filter?: Record<string, any>;
  hydrated?: boolean;
}

export interface SmartSuiteConfig {
  apiKey: string;
  accountId: string;
  tableId: string;
}
