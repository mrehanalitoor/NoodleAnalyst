export interface LoginCredentials {
  username: string;
  password: string;
  account: string;
}

export interface QueryResult {
  columns: string[];
  data: any[];
}

export interface SnowflakeConnection {
  isConnected: boolean;
  error?: string;
}