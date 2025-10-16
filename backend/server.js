const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // 👈 Thêm dòng này
const app = express();

// Load biến môi trường từ file .env
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors()); // 👈 Thêm dòng này để cho phép React truy cập API

// 1. THIẾT LẬP KẾT NỐI MONGODB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// Gọi hàm kết nối database
connectDB();

// Import route user
const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
