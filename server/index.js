const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const uploadRoute = require('./routes/upload');
const metroRoutes = require('./routes/metro');
const placesRoutes = require('./routes/places');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_2,
  'https://go-ticket123.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

// Ensure uploads directory exists
const uploadDir = path.join(process.env.VERCEL ? '/tmp' : __dirname, 'uploads');
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (err) {
  console.warn('Could not create uploads directory:', err.message);
}

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (no origin header) and same-origin server calls.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/upload', uploadRoute);
app.use('/api/metro', metroRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/location', placesRoutes);

app.get('/', (req, res) => {
  res.send('Go Tickets API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
