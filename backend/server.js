// /backend/server.js
const express = require('express');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const connectDB = require('./config/db'); // Giả sử bạn có file kết nối DB
const cors = require('cors');
//dotenv.config(); // Load biến môi trường từ file .env
console.log('JWT Secret from .env:', process.env.JWT_SECRET); 
const cookieParser = require('cookie-parser');
connectDB(); // Kết nối tới MongoDB

const app = express();

// --- Sửa đoạn CORS của bạn như sau ---

// Tạo một "whitelist" (danh sách cho phép)
// Nó bao gồm máy local (để bạn test) và URL production (lấy từ biến môi trường)
const whitelist = [
  'http://localhost:3000', // Sửa thành port frontend local của bạn (3000 hay 3001?)
  'http://localhost:3001',
  process.env.FRONTEND_URL  // Đây là 'https://group1-project-x1.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Kiểm tra xem origin (nơi gửi request) có trong whitelist không
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // Cho phép nếu nó nằm trong whitelist
      // (hoặc !origin - cho phép các công cụ như Postman)
      callback(null, true);
    } else {
      // Từ chối nếu không nằm trong whitelist
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Giữ nguyên dòng này
};

// Dùng corsOptions đã cấu hình
app.use(cors(corsOptions));

// ------------------------------------
// Middleware để đọc req.body dạng JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser()); 

// Định nghĩa route chính
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Sử dụng user routes
// Mọi request tới /api/users/... sẽ được xử lý bởi userRoutes
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));