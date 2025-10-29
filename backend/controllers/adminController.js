const User = require("../models/User");

// Lấy danh sách tất cả user
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Xóa user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  // Chỉ Admin hoặc tự xóa
  if (req.user.role !== "admin" && req.user._id.toString() !== id) {
    return res.status(403).json({ message: "Không có quyền xóa" });
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

  res.json({ message: "Xóa thành công", userId: id });
};
