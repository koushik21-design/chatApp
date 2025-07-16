// server.js (Node.js with Express)
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = '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';

app.post('/api/chat', async (req, res) => {
  const userInput = req.body.input;
  if (!userInput) return res.status(400).json({ error: 'Input required' });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemma-3-12b-it:free',
        messages: [{ role: 'user', content: userInput }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
