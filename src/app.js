const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Security
app.set('trust proxy', 1);
app.use(cors({ origin: process.env.FRONTEND_URL === '*' ? '*' : process.env.FRONTEND_URL }));
app.use(express.json());

// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    message: { message: "Too many requests. Please try again later." }
});
app.use('/api/', apiLimiter);

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: "ok" }));

// Error Handling Middleware (Simple)
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Something went wrong on the server." });
});

module.exports = app;