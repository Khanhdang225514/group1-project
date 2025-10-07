// backend/controllers/userController.js

const User = require('../models/User'); // 👈 Import Model User của Sinh viên 3

// GET /users - Lấy danh sách người dùng từ MongoDB
exports.getUsers = async (req, res) => {
    try {
        // Lấy tất cả user từ collection 'users'
        const users = await User.find();
        res.json(users);
    } catch (error) {
        // Xử lý lỗi server
        res.status(500).json({ message: error.message });
    }
};

// POST /users - Thêm người dùng mới vào MongoDB
exports.addUser = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    try {
        // Tạo và lưu người dùng mới vào MongoDB
        const newUser = await User.create({ name, email }); 
        res.status(201).json(newUser); 
    } catch (error) {
        // Xử lý lỗi validation hoặc email đã tồn tại (unique)
        res.status(400).json({ message: error.message });
    }
};