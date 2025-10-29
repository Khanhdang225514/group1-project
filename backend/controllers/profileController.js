const User = require("../models/User");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary");

// Lấy thông tin cá nhân
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Lỗi khi lấy profile:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy thông tin." });
  }
};

// Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
  try {
    const { name, password, phone, address } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;

    if (password) {
      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "Password phải có ít nhất 6 ký tự" });
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng để cập nhật!" });
    }

    res.status(200).json({
      message: "Cập nhật thông tin thành công",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Lỗi khi cập nhật profile:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi cập nhật thông tin." });
  }
};

// Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Chưa chọn ảnh để upload" });
    }

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

    res.status(200).json({
      message: "Upload avatar thành công",
      avatar: result.secure_url,
    });
  } catch (err) {
    console.error("Lỗi upload avatar:", err);
    res.status(500).json({ message: err.message || "Upload thất bại" });
  }
};
