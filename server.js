const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

const mockPaymentDB = require('./mockPaymentDB.json');

// Route to get payment history
app.get('/api/payment/history', (req, res) => {
  res.json(mockPaymentDB);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
