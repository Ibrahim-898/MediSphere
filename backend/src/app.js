require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: ['http://localhost:3001', 'http://localhost:3000'] }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Logging & Parsing
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', require('./routes/profile.routes'));

// Placeholder for core APIs
app.use('/api/appointments', (req, res) => res.status(501).json({ message: 'Appointments API coming soon' }));
app.use('/api/prescriptions', (req, res) => res.status(501).json({ message: 'Prescriptions API coming soon' }));
app.use('/api/lab', (req, res) => res.status(501).json({ message: 'Lab API coming soon' })); 

// 404 handler
app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;
