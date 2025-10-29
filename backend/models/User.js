const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // <-- THÊM DÒNG NÀY

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
    default: "",
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  }
}, { timestamps: true });

// --- TỰ ĐỘNG MÃ HÓA MẬT KHẨU (BẮT BUỘC) ---
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// --- HÀM SO SÁNH MẬT KHẨU (BẮT BUỘC) ---
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hide sensitive fields when converting to JSON (Phần này bạn làm tốt)
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpire;
    return ret;
  }
});


module.exports = mongoose.model('User', userSchema);