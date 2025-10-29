const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

// SỬA Ở ĐÂY: Đổi '/profile' thành '/'
// URL cuối cùng sẽ là: /api/profile + / = /api/profile
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);

    module.exports = router;