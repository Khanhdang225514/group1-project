const User = require('../models/User');
const bcrypt = require('bcrypt');

// ✅ Lấy thông tin cá nhân
exports.getProfile = async (req, res) => {
  try {
    // Lấy ID người dùng từ Middleware (req.user hiện chỉ là ID)
    const userId = req.user; 
    
    // Tìm kiếm người dùng bằng ID
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      // Trường hợp hiếm: Middleware đã kiểm tra nhưng vẫn không tìm thấy
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    }
    
    // Trả về thông tin người dùng
    res.json(user);
  } catch (err) {
    console.error('Lỗi khi lấy Profile:', err);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ khi lấy thông tin.' });
  }
};

// ✅ Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
  try {
    // Lấy ID người dùng từ Middleware
    const userId = req.user;
    
    const { name, password, phone, address } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    
    // Mã hóa mật khẩu nếu có cập nhật
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true } // new: trả về tài liệu mới, runValidators: đảm bảo dữ liệu hợp lệ
    ).select('-password'); // loại bỏ password trong phản hồi

    if (!updated) {
      // Lỗi này hiếm khi xảy ra nếu Middleware hoạt động đúng
      return res.status(404).json({ message: 'Không tìm thấy người dùng để cập nhật!' });
    }

    res.json({
      message: 'Cập nhật thông tin thành công',
      updated,
    });
  } catch (err) {
    console.error('Lỗi khi cập nhật Profile:', err);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ khi cập nhật thông tin.' });
  }
  };