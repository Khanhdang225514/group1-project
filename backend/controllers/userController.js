const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const fs = require('fs').promises;

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate cơ bản
    if (!email || !password) {
      return res.status(400).json({ message: 'Đăng ký thất bại: Email và mật khẩu bắt buộc' });
    }
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ message: 'Đăng ký thất bại: Mật khẩu phải tối thiểu 6 ký tự' });
    }

    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Đăng ký thất bại: Email đã được đăng ký' });
    }

    // Mã hóa mật khẩu
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo user mới
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const safeUser = newUser.toObject();
    delete safeUser.password;
    return res.status(201).json({ message: 'Đăng ký thành công', user: safeUser });
  } catch (err) {
    // Duplicate key (race condition)
    if (err && err.code === 11000) {
      return res.status(400).json({ message: 'Đăng ký thất bại: Email đã được đăng ký' });
    }

    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Đăng ký thất bại: lỗi máy chủ' });
  }
};

// ====== Đăng nhập ======
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email và mật khẩu bắt buộc' });

    // Kiểm tra user tồn tại
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Không tìm thấy tài khoản!' });

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Sai mật khẩu!' });

    // Kiểm tra JWT secret
    if (!process.env.JWT_SECRET) {
      console.error('Missing JWT_SECRET environment variable');
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    // Tạo token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const safeUser = user.toObject();
    delete safeUser.password;
    res.json({ message: 'Đăng nhập thành công', token, user: safeUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====== Quên mật khẩu (giả lập) ======
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email bắt buộc' });

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
    if (!email || !newPassword) return res.status(400).json({ message: 'Email và mật khẩu mới bắt buộc' });
    if (typeof newPassword !== 'string' || newPassword.length < 6) return res.status(400).json({ message: 'Mật khẩu mới phải tối thiểu 6 ký tự' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng!' });

    user.password = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS || '10', 10));
    await user.save();

    res.json({ message: 'Đặt lại mật khẩu thành công!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====== Upload Avatar lên Cloudinary ======
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) return res.status(401).json({ message: 'Unauthorized' });
    if (!req.file) return res.status(400).json({ message: 'Không có file được tải lên!' });

    // (Lưu ý: kiểm tra file type và size nên làm trong Multer fileFilter/limits)
    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'avatars' });

    // Xóa file tạm an toàn
    try {
      await fs.unlink(req.file.path);
    } catch (e) {
      console.error('Failed to delete temp file', e);
    }

    // Cập nhật link avatar cho user, loại password khi trả về
    const user = await User.findByIdAndUpdate(req.user.userId, { avatar: result.secure_url }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });

    res.json({ message: 'Tải ảnh lên thành công!', avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};