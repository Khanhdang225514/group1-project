const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // ✔ import đúng
const { adminOnly } = require("../middleware/roleMiddleware");
const { getAllUsers, deleteUser } = require("../controllers/adminController");

// GET /admin → admin only
router.get("/", authMiddleware, adminOnly, getAllUsers);

// DELETE /admin/users/:id → admin only
router.delete("/users/:id", authMiddleware, adminOnly, deleteUser);

module.exports = router;
