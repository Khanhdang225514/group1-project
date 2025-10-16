// backend/controllers/userController.js

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
  }
};
