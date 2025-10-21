const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, password } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updated = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
    res.json({ message: 'Cập nhật thành công', updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
