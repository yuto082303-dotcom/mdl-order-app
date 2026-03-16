const express = require('express');
const axios = require('axios');
const app = express();

const GAS_URL = 'https://script.google.com/macros/s/AKfycby5U4kMdU8PLde3A_BqVBESczEELqFN2alSHrBdKmTgTcYmVKDsvtX4_A3Wh0BzHcdBvA/exec';

app.get('*', async (req, res) => {
  const response = await axios.get(GAS_URL + (req.url === '/' ? '' : req.url), { params: req.query });
  res.send(response.data);
});

app.listen(process.env.PORT || 3000);
