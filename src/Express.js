const express = require('express');
const app = express();
const port = 3001;

const mockPaymentDB = require('./mockPaymentDB.json'); // Import the mock payment database

app.get('/api/payment/history', (req, res) => {
  res.json(mockPaymentDB);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
