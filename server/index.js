import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleQuery } from './openrouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Store connection state
let snowflakeConnection = null;

app.post('/api/connect', async (req, res) => {
  try {
    const { username, password, account } = req.body;
    
    // Validate credentials
    if (!username || !password || !account) {
      return res.status(400).json({ message: 'Missing required credentials' });
    }

    // Store connection info (in a real app, you'd establish actual Snowflake connection)
    snowflakeConnection = { username, account };
    
    res.json({ message: 'Connected successfully' });
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).json({ message: error.message || 'Failed to connect' });
  }
});

app.post('/api/query', async (req, res) => {
  try {
    if (!snowflakeConnection) {
      return res.status(401).json({ message: 'Not connected to Snowflake' });
    }

    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const result = await handleQuery(question);
    res.json(result);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ message: error.message || 'Query execution failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});