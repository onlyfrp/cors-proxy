const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('CORS Proxy Server is running...');
});

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Missing ?url= parameter');
  }

  request({ url: targetUrl }, (error, response, body) => {
    if (error) return res.status(500).send('Error fetching URL');
    res.set('Content-Type', response.headers['content-type']);
    res.send(body);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
