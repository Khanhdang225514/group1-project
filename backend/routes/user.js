const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 📍 [GET] /users → Lấy danh sách người dùng
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📍 [POST] /users → Thêm người dùng mới
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({ message: "Thiếu tên hoặc email" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email đã tồn tại" });

    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📍 [PUT] /users/:id → Cập nhật người dùng
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📍 [DELETE] /users/:id → Xóa người dùng
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json({ message: "Đã xóa người dùng thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
