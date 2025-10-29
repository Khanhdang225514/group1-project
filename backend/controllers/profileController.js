const User = require('../models/User');
const bcrypt = require('bcrypt');

// ✅ Lấy thông tin cá nhân
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
  try {
    const { name, password, phone, address } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updated = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true }
    ).select('-password'); // loại bỏ password trong phản hồi

    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    }

    res.json({
      message: 'Cập nhật thành công',
      updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
