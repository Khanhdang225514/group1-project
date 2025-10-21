
const mongoose = require('mongoose');
module.exports = mongoose.model("User", userSchema);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email không được trùng
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', // Mặc định tài khoản mới là 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);