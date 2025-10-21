const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../middlewares/multer');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/auth'); // middleware xác thực JWT

// Lấy toàn bộ user
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Thêm user mới
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Cập nhật user
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Xóa user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Đã xóa user' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Upload avatar (cần có token)
router.post('/upload-avatar', verifyToken, upload.single('image'), userController.uploadAvatar);

module.exports = router;