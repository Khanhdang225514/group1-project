const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');

// Đăng ký
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
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

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
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



const crypto = require('crypto');
const nodemailer = require('nodemailer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Không tìm thấy email' });

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetToken = resetToken;
  await user.save();

  // giả lập gửi mail
  res.json({ message: 'Gửi token reset thành công', token: resetToken });
};

// Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({ resetToken: token });
  if (!user) return res.status(400).json({ message: 'Token không hợp lệ' });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  await user.save();

  res.json({ message: 'Đặt lại mật khẩu thành công' });
};

// Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: result.secure_url });
    res.json({ message: 'Upload thành công', avatar: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

