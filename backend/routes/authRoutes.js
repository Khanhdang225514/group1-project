const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

const { forgotPassword, resetPassword } = require("../controllers/authController");


router.post("/forgot-password", forgotPassword);


router.post("/reset-password/:token", resetPassword);

module.exports = router;
