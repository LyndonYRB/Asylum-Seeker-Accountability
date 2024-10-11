const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const roomRoutes = require('./routes/roomRoutes');
const asylumSeekerRoutes = require('./routes/asylumSeekerRoutes');
const logRoutes = require('./routes/logRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Content Security Policy setup
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://asylum-seeker-log-backend-af4533a27029.herokuapp.com");
    next();
});

// CORS configuration to allow both local and Heroku frontend URLs
const allowedOrigins = ['http://localhost:3000', 'https://asylum-seeker-log-frontend-af4533a27029.herokuapp.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Middleware for parsing JSON data
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

// Set up API routes
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/asylum-seekers', asylumSeekerRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB connection error:', error));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to serve the frontend's index.html for any routes that are not API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Debug route
app.get('/debug', (req, res) => {
    res.status(200).json({ message: 'Debug route is working!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Logging incoming requests to specific API routes for troubleshooting
app.use('/api/hotels', (req, res, next) => {
    console.log(`Request to /api/hotels: ${req.method} ${req.url}`);
    next();
});
