const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

// 📍 GET /users → Admin only
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📍 DELETE /users/:id → Admin hoặc tự xóa
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    // Check quyền
    if (req.user.role !== "admin" && req.user._id.toString() !== id) {
      return res.status(403).json({ message: "Không có quyền xóa user này" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    res.json({ message: "Xóa thành công", userId: id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
