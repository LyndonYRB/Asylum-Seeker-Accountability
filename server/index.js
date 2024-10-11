const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const roomRoutes = require('./routes/roomRoutes');
const asylumSeekerRoutes = require('./routes/asylumSeekerRoutes');
const logRoutes = require('./routes/logRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware for parsing JSON data
app.use(express.json());
app.use(helmet());

// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(`https://${req.hostname}${req.url}`);
        }
        next();
    });
}

// CORS configuration to allow both local and Heroku frontend URLs
const allowedOrigins = [
    'http://localhost:3000', 
    'https://asylum-seeker-log-frontend-6c149a585f62.herokuapp.com',
    'https://asylum-seeker-log-backend-af4533a27029.herokuapp.com'
];

app.use(cors({
    origin: '*', // Allow all origins temporarily
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow common HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Content Security Policy setup
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://asylum-seeker-log-backend-af4533a27029.herokuapp.com");
    next();
});

// Logging incoming requests for troubleshooting
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

// Specific logging for /api/hotels route
app.use('/api/hotels', (req, res, next) => {
    console.log(`Request to /api/hotels: ${req.method} ${req.url}`);
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
