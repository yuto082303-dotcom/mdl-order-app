const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const GAS_URL = process.env.GAS_URL || '';

app.use(express.json({ limit: '5mb' }));
app.use(express.static('public'));

console.log('GAS_URL configured:', GAS_URL ? 'YES (' + GAS_URL.substring(0, 50) + '...)' : 'NOT SET');

app.get('/api/parts', async (req, res) => {
  try {
    if (!GAS_URL) return res.status(500).json({ error: 'GAS_URL not set' });
    const r = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'getPartsData' }),
      redirect: 'follow',
    });
    const text = await r.text();
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (e) {
      console.error('GAS response not JSON. Status:', r.status, 'Body:', text.substring(0, 300));
      res.status(502).json({ error: 'GAS returned non-JSON response (status ' + r.status + ')' });
    }
  } catch (e) {
    console.error('Fetch error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/order', async (req, res) => {
  try {
    if (!GAS_URL) return res.status(500).json({ error: 'GAS_URL not set' });
    const r = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'submitOrder', payload: req.body }),
      redirect: 'follow',
    });
    const text = await r.text();
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (e) {
      console.error('GAS order response not JSON:', text.substring(0, 300));
      res.status(502).json({ error: 'GAS returned non-JSON response' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));
