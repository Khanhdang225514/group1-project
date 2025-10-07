const express = require("express");
const mongoose = require("mongoose"); // 👈 Cần có Mongoose
const dotenv = require("dotenv");    // 👈 Cần có dotenv
const app = express();

// Load biến môi trường từ file .env
dotenv.config();

// Middleware đọc dữ liệu JSON
app.use(express.json());

// 1. THIẾT LẬP KẾT NỐI MONGODB
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; // Lấy từ file .env
        if (!mongoURI) {
             throw new Error("MONGO_URI is not defined in .env file");
        }
        // Sử dụng chuỗi kết nối từ .env để kết nối
        await mongoose.connect(mongoURI); 
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        // Thoát ứng dụng nếu kết nối lỗi
        process.exit(1);
    }
};

// Gọi hàm kết nối database trước khi server chạy
connectDB();

// Import route user
const userRoutes = require("./routes/user");
app.use("/users", userRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));