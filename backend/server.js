const express = require("express");
<<<<<<< HEAD
const mongoose = require("mongoose"); // 👈 Cần có Mongoose
const dotenv = require("dotenv");    // 👈 Cần có dotenv
const app = express();

// Load biến môi trường từ file .env
dotenv.config();
=======
const cors = require("cors");
const app = express();

// Cho phép frontend gọi API backend
app.use(cors());
>>>>>>> 335b60617caba4e4217f9a546e6d6bbb79c6c38c

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

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));