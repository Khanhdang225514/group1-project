
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("User", userSchema);

// backend/models/User.js

const mongoose = require('mongoose');

// Định nghĩa Schema (name, email)
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true // Đảm bảo email không trùng lặp
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

