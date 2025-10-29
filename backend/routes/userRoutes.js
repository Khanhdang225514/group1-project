// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");

const User = require("../models/User");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const cloudinary = require("../utils/cloudinary");

// --- Cấu hình multer để upload ảnh lên memoryStorage ---
const upload = multer({ storage: multer.memoryStorage() });

// ======= CRUD cơ bản (cần admin nếu muốn phân quyền) =======
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Chỉ admin mới xem được danh sách user
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập" });
    }
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    // User chỉ update chính mình hoặc admin
    if (req.user._id.toString() !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Không có quyền cập nhật" });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // User chỉ xóa chính mình hoặc admin xóa tất cả
    if (req.user._id.toString() !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Không có quyền xóa" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======= Auth routes =======
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

// ======= Upload Avatar =======
router.post(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "Chưa chọn ảnh" });

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "avatars" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      req.user.avatar = result.secure_url;
      await req.user.save();

      res.json({ message: "Upload thành công", avatar: result.secure_url });
    } catch (err) {
      res.status(500).json({ message: err.message || "Upload thất bại" });
    }
  }
);

module.exports = router;
