const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import path module

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (use the correct URL for your MongoDB Atlas)
mongoose.connect('your-mongo-db-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON
app.use(express.json());

// Example route (you can add your routes here)
app.get('/api/test', (req, res) => {
  res.send('API is working!');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
