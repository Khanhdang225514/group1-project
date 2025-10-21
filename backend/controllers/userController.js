const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

<<<<<<< HEAD
const User = require("../models/User"); // Import model

// 🟢 [GET] /users → Lấy danh sách người dùng
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách người dùng:", error.message);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách người dùng" });
  }
};

// 🟢 [POST] /users → Thêm người dùng mới
exports.addUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    // Kiểm tra email đã tồn tại chưa
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email đã tồn tại" });
    }

    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Lỗi khi thêm người dùng:", error.message);
    res.status(500).json({ message: "Lỗi server khi thêm người dùng" });
  }
};

// 🟢 [PUT] /users/:id → Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật người dùng:", error.message);
    res.status(500).json({ message: "Lỗi server khi cập nhật người dùng" });
  }
};

// 🟢 [DELETE] /users/:id → Xóa người dùng
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json({ message: "✅ Đã xóa người dùng thành công" });
  } catch (error) {
    console.error("❌ Lỗi khi xóa người dùng:", error.message);
    res.status(500).json({ message: "Lỗi server khi xóa người dùng" });
=======
// ====== Đăng ký tài khoản ======
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã được đăng ký!' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====== Đăng nhập ======
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra user tồn tại
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Không tìm thấy tài khoản!' });

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu!' });

    // Tạo token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Đăng nhập thành công', token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====== Quên mật khẩu (giả lập) ======
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'Email không tồn tại!' });

    // Giả lập gửi email (chưa tích hợp thật)
    res.json({ message: `Email đặt lại mật khẩu đã được gửi đến ${email}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====== Đặt lại mật khẩu (giả lập) ======
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng!' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Đặt lại mật khẩu thành công!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====== Upload Avatar lên Cloudinary ======
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Không có file được tải lên!' });

    // Upload lên Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
    });

    // Xóa file tạm
    fs.unlinkSync(req.file.path);

    // Cập nhật link avatar cho user
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { avatar: result.secure_url },
      { new: true }
    );

    res.json({ message: 'Tải ảnh lên thành công!', avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: err.message });
>>>>>>> backend-feature
  }
};
