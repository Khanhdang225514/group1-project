const User = require('../models/User');
const bcrypt = require('bcrypt'); // Dùng trong hàm login, resetPassword
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const crypto = require('crypto');

// Đăng ký
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại' });

    // === SỬA LỖI MÃ HÓA KÉP ===
    // Xóa dòng bcrypt.hash ở đây.
    // Gửi mật khẩu thuần, để Model (User.js) tự mã hóa.
    const newUser = await User.create({ name, email, password, role });

    // Remove sensitive fields (schema toJSON cũng đã tự động ẩn password)
     const userObj = newUser.toObject();

    res.status(201).json({ message: 'Đăng ký thành công', user: userObj });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

    // Dùng hàm .comparePassword() từ Model (nếu bạn đã thêm)
    // Hoặc dùng bcrypt.compare() trực tiếp như vầy cũng TỐT
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

    const secret = process.env.JWT_SECRET || 'secret_key';
    const token = jwt.sign({ id: user._id, role: user.role }, secret, {
      expiresIn: '1d',
    });

    res.json({ message: 'Đăng nhập thành công', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng xuất (client sẽ tự xóa token)
exports.logout = (req, res) => {
  res.json({ message: 'Đăng xuất thành công (client xóa token)' });
  };
  
// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email bắt buộc' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Không tìm thấy email' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    // expiry 1 hour
    user.resetTokenExpires = Date.now() + 3600000;
    await user.save();

    // TODO: gửi mail thật bằng nodemailer/đổi thành service email
    res.json({ message: 'Gửi token reset thành công (giả lập)', token: resetToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: 'Thiếu token hoặc mật khẩu mới' });

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });

    // Mã hóa mật khẩu mới (Hàm pre-save trong model sẽ tự chạy)
    user.password = newPassword; 
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Đặt lại mật khẩu thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Không có file được tải lên' });

    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'avatars' });

    // remove temp file
    try { fs.unlinkSync(req.file.path); } catch (e) { /* ignore */ }

    const user = await User.findByIdAndUpdate(
      req.user && req.user.id ? req.user.id : req.user,
      { avatar: result.secure_url },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'Không tìm thấy user để cập nhật avatar' });

    res.json({ message: 'Upload thành công', avatar: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};