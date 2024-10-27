import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import QueryInterface from './components/QueryInterface';
import { snowflakeApi } from './api/snowflake';
import { LoginCredentials, QueryResult, SnowflakeConnection } from './types';

function App() {
  const [connection, setConnection] = useState<SnowflakeConnection>({ isConnected: false });
  const [queryResult, setQueryResult] = useState<QueryResult>();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      console.log('Attempting to connect to Snowflake...');
      await snowflakeApi.connect(credentials);
      console.log('Successfully connected to Snowflake');
      setConnection({ isConnected: true });
    } catch (error) {
      console.error('Connection error:', error);
      setConnection({ 
        isConnected: false, 
        error: error instanceof Error ? error.message : 'Failed to connect' 
      });
      throw error; // Re-throw to let LoginForm handle the loading state
    }
  };

  const handleExecuteQuery = async (question: string) => {
    setIsLoading(true);
    try {
      const result = await snowflakeApi.executeQuery(question);
      setQueryResult(result);
    } catch (error) {
      console.error('Query execution failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!connection.isConnected ? (
        <LoginForm onLogin={handleLogin} error={connection.error} />
      ) : (
        <QueryInterface
          onExecuteQuery={handleExecuteQuery}
          queryResult={queryResult}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;