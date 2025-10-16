// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🟢 Lấy danh sách user
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách user:", err.message);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách user" });
  }
});

// 🟢 Thêm user mới
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email đã tồn tại" });

    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    console.error("❌ Lỗi khi thêm user:", err.message);
    res.status(500).json({ message: "Lỗi server khi thêm user" });
  }
});

// 🟢 Cập nhật user
router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json(user);
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật user:", err.message);
    res.status(500).json({ message: "Lỗi server khi cập nhật user" });
  }
});

// 🟢 Xóa user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json({ message: "✅ Đã xóa user thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi xóa user:", err.message);
    res.status(500).json({ message: "Lỗi server khi xóa user" });
  }
});

module.exports = router;
