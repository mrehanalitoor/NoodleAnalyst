import axios from 'axios';

const OPENROUTER_API_KEY = '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';

export async function handleQuery(question) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: 'You are a SQL expert. Convert natural language questions into SQL queries for Snowflake data analysis.'
          },
          { role: 'user', content: question }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // For demo purposes, return mock data
    // In a real app, you would execute the SQL query against Snowflake
    return {
      columns: ['Month', 'Credits'],
      data: [
        { Month: 'Jan', Credits: 100 },
        { Month: 'Feb', Credits: 150 },
        { Month: 'Mar', Credits: 120 },
        { Month: 'Apr', Credits: 200 }
      ]
    };
  } catch (error) {
    console.error('OpenRouter API error:', error);
    throw new Error('Failed to process query');
  }
}