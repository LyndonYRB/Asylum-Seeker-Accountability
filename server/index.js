const express = require('express');
const connectDB = require('./db'); // Import the database connection file

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Your routes will go here

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
