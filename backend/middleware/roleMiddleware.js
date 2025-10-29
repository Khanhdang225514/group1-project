const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Không xác thực" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Chỉ Admin mới thực hiện được" });
  next();
};

module.exports = { adminOnly };
