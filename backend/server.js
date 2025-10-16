const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

// Load biến môi trường
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// 1️⃣ KẾT NỐI MONGODB
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

connectDB();

// 2️⃣ IMPORT ROUTER
const userRoutes = require("./routes/userRoutes"); // ✅ đúng file
app.use("/users", userRoutes);

// 3️⃣ KHỞI CHẠY SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
