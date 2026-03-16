const express = require('express');
const app = express();

app.get('*', (req, res) => {
  res.redirect('https://script.google.com/macros/s/AKfycby5U4kMdU8PLde3A_BqVBESczEELqFN2alSHrBdKmTgTcYmVKDsvtX4_A3Wh0BzHcdBvA/exec');
});

app.listen(process.env.PORT || 3000);
