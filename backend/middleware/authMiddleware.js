const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Truy cập bị từ chối: Không có token.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 1. Chỉ tìm ID để đảm bảo người dùng có tồn tại
        const user = await User.findById(decoded.id).select('_id'); // Chỉ cần tìm ID
        
        // 2. ✅ CHẶN NẾU USER BỊ XÓA
        if (!user) {
            return res.status(403).json({ message: 'Tài khoản không còn tồn tại.' });
        }

        // 3. ✅ SỬA: CHỈ GÁN ID VÀO req.user
        // Controller sẽ truy cập ID qua req.user
        req.user = user._id; 
        
        next();
    } catch (err) {
        // Xử lý lỗi giải mã JWT
        res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
    };