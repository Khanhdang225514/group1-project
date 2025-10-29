// backend/server.js
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// --- MIDDLEWARES ---
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // frontend origin
  credentials: true
}));

// --- CONNECT DB ---
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) throw new Error('MONGO_URI not defined in .env');
    
    // Đã loại bỏ các tùy chọn cũ (useNewUrlParser, useUnifiedTopology)
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};
connectDB();

// --- ROUTES ---
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Mount APIs
// Đã xóa dòng app.use('/api/users', userRoutes); bị trùng lặp ở trên
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

// Static folder (ví dụ để serve avatar nếu lưu local)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' }));

// --- Global error handler (basic) ---
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  });