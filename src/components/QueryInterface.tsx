import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { QueryResult } from '../types';

interface QueryInterfaceProps {
  onExecuteQuery: (question: string) => Promise<void>;
  queryResult?: QueryResult;
  isLoading: boolean;
}

export default function QueryInterface({ onExecuteQuery, queryResult, isLoading }: QueryInterfaceProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecuteQuery(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Snowflake Query Interface</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ask questions about your Snowflake data in natural language
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ask your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Execute'}
            </button>
          </div>
        </form>

        {queryResult && (
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Results</h2>
              
              {/* Data Visualization */}
              {queryResult.data.length > 0 && (
                <div className="h-96 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={queryResult.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={queryResult.columns[0]} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey={queryResult.columns[1]} fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Data Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {queryResult.columns.map((column) => (
                        <th
                          key={column}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {queryResult.data.map((row, i) => (
                      <tr key={i}>
                        {queryResult.columns.map((column) => (
                          <td
                            key={column}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {row[column]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}