const mongoose = require('mongoose');

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
  ,
  avatar: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpires: {
    type: Date,
  }
}, { timestamps: true });

// Hide sensitive fields when converting to JSON
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.resetToken;
    delete ret.resetTokenExpires;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);