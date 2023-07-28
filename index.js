const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/weather', async (req, res) => {
  try {
    // Use dynamic import() to load the node-fetch library
    const fetch = await import('node-fetch');

    const apiKey = 'b6907d289e10d714a6e88b30761fae22';
    const apiUrl = 'https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=' + apiKey;

    const response = await fetch.default(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data.');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});