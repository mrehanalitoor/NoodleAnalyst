import axios, { AxiosError } from 'axios';
import { LoginCredentials, QueryResult } from '../types';

// Use environment variable for API URL with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const snowflakeApi = {
  connect: async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(`${API_URL}/connect`, credentials);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          throw new Error(error.response.data.message || 'Server error occurred');
        } else if (error.request) {
          throw new Error('No response from server. Please check if the backend is running.');
        }
      }
      throw new Error('Failed to connect to Snowflake. Please try again.');
    }
  },

  executeQuery: async (question: string) => {
    try {
      const response = await axios.post(`${API_URL}/query`, { question });
      return response.data as QueryResult;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || 'Query execution failed');
      }
      throw new Error('Failed to execute query');
    }
  }
};</content></file>

<boltAction type="file" filePath=".env">
PORT=8000
OPENROUTER_API_KEY=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
VITE_API_URL=http://localhost:8000/api</content></file>

<boltAction type="file" filePath=".env.production">
VITE_API_URL=https://your-backend-url.com/api</content></file>

<boltAction type="deploy" provider="netlify">
<build>
<command>npm run build</command>
<output>dist</output>
</build>