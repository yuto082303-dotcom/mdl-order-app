const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;
const GAS_URL = process.env.GAS_URL || '';
app.use(express.json({ limit: '5mb' }));
app.use(express.static('public'));

async function callGAS(body) {
  const r = await fetch(GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(body),
    redirect: 'follow',
  });
  return r.json();
}

app.get('/api/parts', async (req, res) => {
  try {
    const data = await callGAS({ action: 'getPartsData' });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.post('/api/order', async (req, res) => {
  try {
    const data = await callGAS({ action: 'submitOrder', payload: req.body });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.post('/api/shipment', async (req, res) => {
  try {
    const data = await callGAS({ action: 'saveShipment', payload: req.body });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.listen(PORT, () => console.log('Server running on port ' + PORT));
