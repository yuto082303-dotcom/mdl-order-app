 const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 3000;
  const GAS_URL = process.env.GAS_URL || '';

  app.use(express.json({ limit: '5mb' }));
  app.use(express.static('public'));

  app.get('/api/parts', async (req, res) => {
    try {
      const r = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getPartsData' }),
      });
      const data = await r.json();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/order', async (req, res) => {
    try {
      const r = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submitOrder', payload: req.body }),
      });
      const data = await r.json();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.listen(PORT, () => console.log('Server running on port ' + PORT));
