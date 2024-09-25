const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API endpoint for testing
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
