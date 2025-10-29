// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Không có token." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) return res.status(401).json({ message: "Token không hợp lệ." });

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Người dùng không tồn tại." });

    req.user = user; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Xác thực thất bại." });
  }
};

module.exports = authMiddleware; 
