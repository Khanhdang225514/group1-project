// backend/routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");

// Cấu hình multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Chỉ chấp nhận file ảnh"));
  },
  limits: { fileSize: 20 * 1024 * 1024 }, // tăng lên 10MB
});


// ------------------- GET profile -------------------
router.get("/", authMiddleware, (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------- UPDATE profile -------------------
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { name, password } = req.body;

    if (name) req.user.name = name;

    if (password) {
      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "Password phải có ít nhất 6 ký tự" });

      const hash = await bcrypt.hash(password, 10);
      req.user.password = hash;
    }

    await req.user.save();
    res.status(200).json({ message: "Profile cập nhật thành công", user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------- UPLOAD avatar -------------------
router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "Chưa chọn ảnh để upload" });

      // Upload lên Cloudinary
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

      res.status(200).json({ message: "Upload avatar thành công", avatar: result.secure_url });
    } catch (err) {
      res.status(500).json({ message: err.message || "Upload thất bại" });
    }
  }
);

module.exports = router;
