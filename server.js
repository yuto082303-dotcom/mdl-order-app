const express = require('express');
const app = express();

const GAS_URL = 'https://script.google.com/macros/s/AKfycby5U4kMdU8PLde3A_BqVBESczEELqFN2alSHrBdKmTgTcYmVKDsvtX4_A3Wh0BzHcdBvA/exec';

app.get('*', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0}iframe{width:100vw;height:100vh;border:none}</style></head><body><iframe src="${GAS_URL}"></iframe></body></html>`);
});

app.listen(process.env.PORT || 3000);
